---
title: "Deep Dive: OMS Internals"
description: Walkthrough plus reference for the Order Management System at an Indian stockbroker — order capture paths (web / mobile / dealer / API / FIX), the pre-trade RMS hot path, OMS / RMS / back-office responsibility split, FIX gateway specifics, CTCL approval, order-type matrix, latency budgets, and the failure surfaces at each stage.
---

import { Aside } from '@astrojs/starlight/components';

> **Why this page is structured this way:** The OMS is the broker's single most performance-critical system — it sits in the millisecond-scale hot path between the customer and the exchange. The page first walks through the architecture and component split, then drills into the pre-trade pipeline in fine grain, then provides reference tables for FIX message types, order types, CTCL approval, and latency budgets, and closes with failure modes and the operator's debugging playbook.

## TL;DR

- The OMS receives orders from five entry paths (web, mobile, dealer terminal, REST/WebSocket API, FIX) and unifies them onto a single internal order schema before handing off to a pre-trade RMS pipeline.
- The pre-trade RMS pipeline is a strictly sequential six-stage chain — **segment / margin / MWPL / order-type / surveillance / release** — with a combined budget of single-digit milliseconds per order at P99 (see [Integration DAG: Trading hours](/broking-kyc/operations/integration-dag/trading-hours/)).
- Three systems share responsibility for a trading day: the **OMS** routes and persists orders, the **RMS** validates margin and risk gates, the **back-office** books trades and produces contract notes plus regulatory files. Misallocating any one responsibility is a recurring source of operational defects.
- The exchange edge runs on **FIX 4.4 (with NSE / BSE / MCX dialect extensions)** for institutional flow or **CTCL** (NEAT-IXS / IML / BOLT-IML / MCX-TWS) for retail trading-software paths. Each requires segment-level **CTCL approval** before any production order can be routed.
- Order-type matrix is segment-specific: cash supports NRML / MIS / CO / BO / AMO / GTT; derivatives add carry-forward and bracket limits; commodities have their own intraday vs delivery distinctions. Each order type has a distinct risk profile and time-cut.
- Latency budgets are tighter than they look: the entire chain from order-receive to FIX-out must fit in roughly 5 ms at P95 for a credible retail OMS, and well below 1 ms at the exchange edge for an institutional one.
- The failure surfaces are well-known and worth memorising: scanrange-not-loaded, FIX-session-disconnect, RMS-stale-parameter, CTCL-approval-revoked, AMO-overnight-margin-shift, and the dealer-terminal-trust-boundary class of bugs.

## Conceptual overview

The OMS — Order Management System — is the broker's traffic controller. Whatever a client types on their phone or dictates to a dealer or fires from an algorithmic Python script eventually arrives at the OMS as an order object. The OMS is responsible for: persisting the order with an internal ID, running it through the pre-trade RMS gates, releasing it to the exchange via the appropriate technical channel, persisting the exchange acknowledgement, persisting the trade confirmation if it matches, and reflecting all of this back to the originating client surface. Every step writes to the persistent store; every step is observable from operations dashboards; every step has a P99 latency budget that traders feel in their guts within hours if it slips.

Around the OMS sit two siblings with sharply separated responsibilities. The **RMS** (Risk Management System) is consulted by the OMS at every gate — segment activation, margin availability, MWPL headroom, order-type rules, surveillance filters. The RMS owns the per-client risk picture: SPAN scanrange, ELM ratios, exposure margins, position limits, surveillance flags. The OMS holds the order; the RMS holds the risk. Together they make the release decision in single-digit milliseconds.

The **back-office** comes in once trades happen. Where the OMS-RMS pair runs in milliseconds, the back-office runs in seconds-to-minutes — booking trades against the contract files received from each exchange, computing brokerage / STT / GST / stamp duty / SEBI turnover fee, producing the day's contract notes, generating the [DMF](/broking-kyc/operations/compliance-blueprint/#margin-compliance-30-entries), feeding the [surveillance](/broking-kyc/operations/compliance-blueprint/#surveillance-30-entries) and settlement pipelines. The clean split — OMS for orders, RMS for risk, back-office for books — is one of the most important architectural lines in a broking stack, and the one most often blurred by accident in smaller deployments.

## 1. Order capture paths

A broker typically supports five order-capture paths. Each delivers an order onto a common internal schema before the pre-trade RMS pipeline begins. The schema diverges modestly per segment (cash, F&O, currency, commodity) but is uniform across capture paths within a segment.

### 1.1 Web

The web trading platform — typically a React or Angular SPA backed by a REST/WebSocket gateway — is the simplest path from a latency point of view: HTTPS over the public internet, a session token bound to the logged-in user, a JSON order payload submitted via POST. The OMS's web gateway terminates TLS, validates the session, normalises the payload, and hands off to the pre-trade pipeline. Total wall-clock from button-press to exchange ack is typically 200–800 ms dominated by network RTT plus any CAPTCHA / 2FA gate; the OMS's actual contribution is well under 50 ms even at P95.

The web path is also the most exposed surface to client-side bugs. Most operational incidents on web are not OMS bugs but stale browser sessions, half-submitted forms, double-click order duplicates, or the user backing the browser with the order half-flushed.

### 1.2 Mobile

The mobile path is structurally similar to web — REST/WebSocket over TLS, session-bound — but layered with the additional security expectations of CSCRF's mobile-app testing requirements (see [Compliance blueprint: cyber security](/broking-kyc/operations/compliance-blueprint/#cyber-security-27-entries) row CYBER-023 on OWASP MASVS L1/L2 assessment). Most brokers run the same backend gateway for mobile and web, distinguishing only at the User-Agent / token-issuance layer.

Two operational wrinkles are mobile-specific. First, push-notification ack of order placement is part of the user experience contract — the OMS must publish to the broker's push provider within a tight budget so the buzz on the user's phone correlates with the user's mental model of "the order went through". Second, mobile networks are noisier than home wifi; the OMS sees more partially-failed posts and TLS resets from mobile than from web, and must idempotently handle retries.

### 1.3 Dealer terminal

The dealer terminal is the path for the broker's own dealers — call-and-trade desks, branch dealers, relationship-manager floors. Operationally this is the most-trusted entry path: orders come from authenticated employees on the broker's internal network, typically through a thick-client Windows or web-based application that talks to the OMS over the LAN or a private VPN.

Dealer terminals carry their own compliance burden — the dealer must be **NISM-certified** (Series VIII or relevant series), the broker must maintain a dealer roster with NISM certificate IDs, and dealer-placed orders must carry a dealer ID in the audit trail per SEBI's institutional-mechanism circular ([SEBI/HO/MIRSD/MIRSD-PoD-1/P/CIR/2024/96](/broking-kyc/reference/circulars/sebi-mirsd/#sebi-ho-mirsd-mirsd-pod-1-p-cir-2024-96)). Orders placed by a dealer on a client's behalf are simultaneously the broker's most-frequent fraud surface — front-running, unauthorised trading, and impersonation are all dealer-terminal-risk patterns that the surveillance system (see [surveillance deep-dive](/broking-kyc/deep-dives/trading-day/surveillance-norms-gsm-asm/)) must catch.

### 1.4 API (REST / WebSocket)

Programmatic order entry — typically REST for non-time-critical operations and WebSocket for streaming market data plus order placement — is the path most heavily used by algo traders, prop desks, and platform integrators. Each broker publishes its own API spec; common operations are *placeOrder*, *modifyOrder*, *cancelOrder*, *getOrderBook*, *getPositions*, *getMargin*.

The API path is structurally the same as web but with two operational differences. First, **API rate limits**: SEBI's retail-algo framework ([SEBI/HO/MIRSD/MIRSD-PoD/P/CIR/2025/0000013](/broking-kyc/reference/circulars/sebi-mirsd/#sebi-ho-mirsd-mirsd-pod-p-cir-2025-0000013), [NSE/INVG/66524](/broking-kyc/reference/circulars/nse/#nse-invg-66524) → [NSE/INVG/67858](/broking-kyc/reference/circulars/nse/#nse-invg-67858) → [NSE/INVG/69255](/broking-kyc/reference/circulars/nse/#nse-invg-69255)) caps retail API access at 10 orders per second; above that, the order flow is treated as algo and must be registered and tagged with an algo-ID. Second, **static-IP whitelisting**: API access for retail clients must be from a registered IP per the same framework, ostensibly to anchor accountability for misuse. See the [retail algo deep dive](/broking-kyc/deep-dives/trading-day/retail-algo-framework/) for the full set of API control obligations.

### 1.5 FIX gateway

For institutional flow — buy-side asset managers, custodian-cleared trades, large-prop arms, foreign portfolio investors — the standard order-entry path is **FIX** (Financial Information eXchange protocol). NSE, BSE, and MCX each operate FIX gateways with their dialect of FIX 4.4 (older flows may still use 4.2 but new connectivity is on 4.4 or its FIXT 1.1 session layer). The broker's institutional clients connect to the broker's FIX gateway; the broker's FIX gateway in turn fans orders out to the relevant exchange FIX endpoint.

FIX session management is its own discipline. A FIX session is a long-lived TCP connection with sequence-numbered messages, periodic heartbeats, and a strict logon / logout choreography. Sequence-number gaps trigger resend requests; resends that fail trigger session restarts; session restarts at the wrong time can suspend the broker's institutional flow for minutes. The FIX engine — usually a vendor product (QuickFIX, Onixs, or a commercial engine) — handles this; the broker's operators must understand it. See section 4 below for the FIX message-type detail.

## 2. The pre-trade RMS hot path

Whatever entry path delivered the order, the OMS hands it to the pre-trade RMS as a normalised order object. The RMS runs six gates in strict sequence. Failure at any gate produces a typed reject reason that flows back to the originating channel and surfaces to the customer.

### 2.1 Segment activation check

The OMS holds, per client per segment, an activation flag: CM (cash), F&O (equity derivatives), CD (currency derivatives), COM (commodity), SLB (securities lending). The check is a local lookup against the in-memory client-master cache — single-digit microseconds. Failure mode: the client elected only CM at onboarding but their app form-renders a F&O order entry by mistake; the RMS catches it and returns "segment not active". Cumulative segment-activation hit rate is in the high 99-percent range; most rejects here are client-app bugs rather than client confusion.

### 2.2 Margin lock

The OMS computes the **required margin** for the proposed order and **reserves it against the client's available margin** before any further validation. The computation differs by segment:

- **CM buy:** required margin = VaR + ELM (per [SEBI/HO/MRD2/DCAP/CIR/P/2020/127](/broking-kyc/reference/circulars/sebi-other/#sebi-ho-mrd2-dcap-cir-p-2020-127)). The 20% alternative — a flat 20% upfront margin in place of VaR+ELM — is acceptable per [NSE/INSP/45534](/broking-kyc/reference/circulars/nse/#nse-insp-45565) and is a common simplification at retail brokers.
- **CM sell of holding:** margin requirement is partly waived against the holding; the RMS validates that the holding is unencumbered (not under a pledge, not in a CSMFA / MTF lock).
- **F&O / CD:** SPAN + ELM, with the client's margin recomputed from the SPAN scanrange and ELM ratios loaded at BOD (see [SPAN methodology deep-dive](/broking-kyc/deep-dives/trading-day/rms-span-methodology/)).
- **Commodity:** SPAN + ELM via MCXCCL's commodity SPAN, plus any additional / event-driven margins.

The margin lock writes a reservation row to the client's margin ledger so that subsequent orders don't double-spend the same headroom. Reservations are released on order rejection (anywhere downstream), on order cancellation, on partial fill (released proportional to unfilled), or on full fill (converted from reservation to consumed). The lock-and-release flow is the most defect-rich part of the RMS: stale reservations from order-not-cancelled-properly events accumulate over the day and look exactly like a margin shortage to the customer.

<Aside type="caution">
**Margin lock must happen before exchange release, not after.** The pre-trade rule under SEBI / NSE / clearing-corp frameworks is unambiguous: the broker cannot release any order to the exchange without confirming client margin. A common architectural mistake — present in lower-quality OMS deployments — is to release the order optimistically and reconcile margin after the exchange ack arrives. This is a clear violation and surfaces in inspection findings as a money-laundering / client-funds segregation risk, because for the brief window between release and ack, the broker is effectively funding the client. The fix is not subtle: the margin lock is part of the synchronous pre-trade chain, not async.
</Aside>

### 2.3 MWPL check (derivatives)

For F&O and CD orders, the order must not cause a breach of the **Market-Wide Position Limit** at the contract level (or, for cross-margin offset positions, at the netted level). The OMS holds a real-time MWPL counter per contract, fed by the exchange's MWPL feed (NSE's NEAT-Plus broadcast or equivalent). The check is fast — single-digit microseconds — but the failure case is consequential: an order that would breach MWPL is hard-rejected, and a stream of such rejections can flag the client to surveillance.

MWPL approach (typically 80% or 90% of the limit) usually triggers an exchange advisory; the broker's surveillance layer mirrors this and may issue its own client warning before the hard reject. See the [surveillance deep dive](/broking-kyc/deep-dives/trading-day/surveillance-norms-gsm-asm/).

### 2.4 Order-type validation

Each order type has its own rules around price, quantity, time-cut, and product (intraday vs delivery). The RMS validates the order against the relevant rule set for the client's segment. The matrix appears in section 5 below; common rejects here include MIS orders placed past the auto-square-off time (15:20 for equities, segment-specific for others), CO orders with a stop-loss that's invalid relative to the limit price, and BO orders that would breach the broker's bracket-order configuration limits.

### 2.5 Surveillance check

The order is screened against the day's surveillance lists:

- **GSM** (Graded Surveillance Measure) stages I–IV per [NSE/SURV/74008](/broking-kyc/reference/circulars/nse/#nse-surv-74008). Stage III restricts to 100% upfront margin; stage IV restricts to periodic call auction only.
- **ASM** (Additional Surveillance Measure) Short-term and Long-term lists. ASM positions typically require 100% upfront margin in higher stages.
- **T2T** (Trade-to-Trade) — securities in T2T must settle gross (no intraday netting). The OMS must restrict order-type to NRML and reject any MIS / intraday variant.
- **ESM** (Enhanced Surveillance Measure) for SME / micro-cap segments per [NSE/SURV/61848](/broking-kyc/reference/circulars/nse/#nse-surv-61848).
- **Broker-internal restricted lists** — securities the broker has flagged for its own reasons (employee designated person list per PIT, MOU-based restrictions, client-segregation rules).

Any surveillance flag on the order returns a typed reject ("surveillance: GSM stage III, 100% margin required") that the client UI translates to a customer-friendly explanation.

### 2.6 Release

After all five gates pass, the OMS releases the order to the exchange. The release path depends on the segment-specific routing rule:

- **Retail equity / F&O / CD via CTCL:** routed through the broker's NEAT-IXS / IML / BOLT-IML / etc. trading-software stack to the exchange's CTCL gateway. The exchange returns an order ID via the same channel.
- **Institutional via FIX:** routed through the broker's FIX engine to the exchange's FIX endpoint. The exchange returns an `ExecutionReport` (35=8) with an order ID.
- **MCX:** the equivalent MCX-TWS / IML path, with MCX-specific message formats.

The release writes the exchange order ID back to the OMS's order row, transitioning the order to state `OPEN_AT_EXCHANGE`. Subsequent fills or modifications operate on this exchange order ID.

## 3. OMS / RMS / back-office split — who owns what

A consistent source of confusion in broking architecture is the boundary between OMS, RMS, and back-office. The boundaries below describe what most large brokers actually implement (smaller brokers sometimes collapse two of these into one product; the responsibilities still apply).

| Responsibility | OMS | RMS | Back-office |
|---|---|---|---|
| Order capture and normalisation | yes | no | no |
| Pre-trade segment / margin / MWPL / order-type / surveillance gates | invokes | computes | no |
| SPAN / ELM parameter loading at BOD | consumes | owns | no |
| Per-client margin envelope (available, blocked, free) | consumes | owns | reads (for ledger) |
| Order release to exchange (FIX / CTCL) | yes | no | no |
| Exchange ack and trade confirmation | yes | no | reads (after EOD) |
| Trade booking against exchange contract file | no | no | yes |
| Brokerage / STT / GST / stamp duty computation | no | no | yes |
| Contract note generation and dispatch (ECN) | no | no | yes |
| Intraday peak-margin snapshot capture | no | yes | reads (for DMF aggregation) |
| Daily Margin File (DMF) generation | no | partial | yes (aggregation) |
| Position file generation per segment | no | partial | yes (aggregation) |
| Surveillance OTR / pattern computation (intraday) | feeds | partial | reads (EOD) |
| Client ledger update (trade entries, MTM realized) | feeds | no | yes |
| KRA / CKYC / UCC / DLT integrations | no | no | yes |
| Auction obligation, short-delivery remediation | no | no | yes |
| Bank reconciliation, client funds upstreaming | no | no | yes |

The three lessons that follow from this table:

1. **The pre-trade gates are RMS computations consumed by the OMS** — not OMS logic. Trying to keep the gates inside the OMS makes the OMS bloated and entangles risk policy with order routing.
2. **The back-office is where trades become numbers**. Anything that touches money — brokerage, taxes, ledgers, contract notes — sits in the back-office, not in the OMS or RMS.
3. **Snapshots are RMS, aggregations are back-office**. The peak-margin snapshot at 11:30 / 12:30 / 13:30 / 14:30 is captured by the RMS (it's a margin state at a clock time); the consolidated DMF row aggregating across snapshots is built by the back-office.

<Aside type="note">
**Smaller brokers often collapse OMS + RMS into one product.** Several Indian back-office vendors offer a combined OMS-RMS that runs the pre-trade gates inside the order-routing process. This works for sub-500-orders-per-second flows; above that, the cost of synchronously consulting margin state inside the routing fast path forces a split. The split is also forced when an institutional FIX flow runs alongside retail OMS — the FIX engine cannot share heap with a retail OMS without degrading latency for both.
</Aside>

## 4. FIX gateway specifics

The FIX (Financial Information eXchange) protocol is the institutional-edge standard for broker-to-exchange and buy-side-to-broker order flow. India's exchanges support FIX 4.4 (and an increasing FIXT 1.1 session-layer presence); NSE, BSE, MCX each publish their own FIX specification with dialect-level field extensions.

### 4.1 Session management

A FIX session is established by a **Logon** (35=A) exchange between the two parties (typically the broker's FIX engine logging on to the exchange's FIX endpoint). Both sides initialise their sequence-number registers; subsequent messages must arrive in strict sequence. If a gap is detected, the receiver issues a **Resend Request** (35=2) for the missing range; the sender responds with the missing messages or, if they're already gapped past, with a **Sequence Reset** (35=4) to skip them.

Heartbeats (35=0) flow at the negotiated interval (typically 30 s) to confirm liveness. A missed heartbeat triggers a **Test Request** (35=1); a missed Test Request response terminates the session.

Sessions are torn down with a **Logout** (35=5) at end-of-day. The next morning's Logon resumes the sequence numbers (with optional `ResetSeqNumFlag` to reset to 1). Holding a session open through the BOD parameter reload (the SPAN scanrange and ELM ratios refresh on the exchange side) is an operational consideration — most brokers actually log out at EOD and log on after BOD to avoid the stale-parameter window.

### 4.2 FIX messages relevant to broker-exchange flow

| Message | MsgType | Direction | Purpose |
|---|---|---|---|
| Logon | A | broker ↔ exchange | Session establishment |
| Logout | 5 | broker ↔ exchange | Session teardown |
| Heartbeat | 0 | broker ↔ exchange | Liveness |
| Test Request | 1 | broker ↔ exchange | Liveness check on suspected loss |
| Resend Request | 2 | broker ↔ exchange | Request missing sequence range |
| Sequence Reset | 4 | broker ↔ exchange | Reset / GapFill sequence |
| Reject | 3 | broker ↔ exchange | Session-level reject of malformed message |
| New Order — Single | D | broker → exchange | Submit a new order |
| Order Cancel Request | F | broker → exchange | Cancel an existing order |
| Order Cancel / Replace Request | G | broker → exchange | Modify an existing order |
| Order Status Request | H | broker → exchange | Query order status |
| Execution Report | 8 | exchange → broker | Order ack, fill, cancel, reject, expire |
| Order Cancel Reject | 9 | exchange → broker | Reject of Cancel or Cancel/Replace |
| Business Message Reject | j | broker ↔ exchange | Application-level reject |
| Quote Request | R | (institutional flow) | Request for quote |
| Mass Cancel Request | q | broker → exchange | Cancel all orders for a session |
| Mass Cancel Report | r | exchange → broker | Result of mass cancel |
| Trade Capture Report | AE | exchange → broker | Trade booking for off-book / give-up |
| Trade Capture Report Ack | AR | broker → exchange | Acknowledge a TCR |

The **Execution Report (35=8)** is the workhorse — every order state transition (new, partial fill, full fill, cancel, reject) is reported as an ExecReport with the appropriate `ExecType` (150) tag. The OMS must persistently consume ExecReports to keep its order book in sync with the exchange.

### 4.3 Drop-copy and post-trade feeds

In addition to the order-flow FIX session, brokers typically subscribe to **drop-copy** feeds — a one-way FIX session from the exchange that mirrors all of the broker's trades / orders, used for compliance reconciliation, surveillance, and back-office hand-off. Drop-copy is especially important for FIX flows because the order-flow session is high-throughput and noisy; the drop-copy provides a clean canonical record.

Post-trade feeds — end-of-day trade files in delimited or fixed-width format (NSE's STT / margin / position files, BSE's BEFS-issued files) — arrive at EOD and feed the back-office. These are not FIX but flat files via SFTP; FIX is the intraday surface, flat files are the EOD surface.

### 4.4 Latency and FIX

FIX latency at the broker edge — the time from `D` (New Order) submission to `8` (ExecReport ack) round-trip — is typically in the low single-digit milliseconds for institutional connectivity (co-located or NSE-IBT) and tens of milliseconds for non-colocated brokers. Algo-trading and HFT shops push this further down with kernel-bypass NICs, hand-rolled FIX engines, and direct-market-access ladder routing; retail flows have no such pressure.

## 5. CTCL approval

**CTCL** — Computer-to-Computer Link — is the historical NSE term for any non-NEAT-terminal trading-software access to the exchange. The retail OMS is by definition a CTCL implementation. SEBI / NSE require **CTCL approval** before any production order can route through such software.

### 5.1 What CTCL approval involves

For each piece of trading software the broker uses (or develops), at each segment (CM, F&O, CD), the broker must submit an application to the exchange's IT/Inspection department:

- Description of the software, its vendor (if a vendor product like ODIN, NEST, RTRMS-Trade) or in-house build,
- Version number,
- System architecture (modules, gateway endpoints, network topology),
- Security controls (auth, audit-logging, access management),
- Operational change-management process,
- Disaster recovery posture,
- Mandatory pre-trade controls implementation evidence,
- For algo-capable software: algo-specific approval per Type-III system audit framework.

The exchange's IT team reviews, possibly conducts an on-site or remote inspection, and issues a CTCL approval ID. Production orders carry this ID on every message; orders without a valid approval ID can be rejected at the exchange edge.

### 5.2 CTCL at each exchange

| Exchange | Equivalent term | Approval body | Primary spec |
|---|---|---|---|
| NSE | CTCL | NSE Inspection | [NSE/MSD/61825](/broking-kyc/reference/circulars/nse/) (master scheme), [NSE/MSD/65933](/broking-kyc/reference/circulars/nse/) consolidated NEAT / IBT / DMA / Algo |
| BSE | BOLT-IML approval | BSE Compliance / Inspection | BSE master member scheme |
| MCX | MCX-TWS / IML approval | MCX Inspection | MCX member scheme |

For algo-capable software, additional half-yearly system audit applies (see [NSE/INSP/64438](/broking-kyc/reference/circulars/nse/) / [NSE/INSP/70900](/broking-kyc/reference/circulars/nse/)). The audit is a CERT-In-empanelled auditor producing a report covering architecture, controls, and any drift from the approved configuration.

### 5.3 CTCL revocation triggers

CTCL approval can be revoked. The common triggers:

- Unapproved change to the trading software in production (a hot-patch went out without re-submission and re-approval),
- Audit finding of a missing pre-trade control,
- Repeated technical-glitch incidents traceable to the software,
- Network architecture change (move to a different colo, new firewall, segment topology change) without re-submission,
- Surveillance flag traceable to the software (e.g., systematic OTR breach indicates the order-rate limiter is broken).

Revocation is operationally serious — the broker cannot trade in the affected segment until re-approval, and clients see error messages instead of trade confirmations. Most brokers maintain a change-management discipline where every production change against CTCL-affected components requires a compliance review and a re-approval submission.

<Aside type="caution">
**Algo CTCL is a higher bar than retail CTCL.** A retail-only CTCL submission needs to demonstrate pre-trade controls; an algo CTCL submission additionally needs the algo categorisation, the algo-ID registration, the algo-specific audit trail (5-year retention per [NSE/INVG/67858](/broking-kyc/reference/circulars/nse/#nse-invg-67858)), and the OPS-threshold compliance evidence. Brokers contemplating an algo-capable trading platform should plan for double the review cycle that a retail CTCL takes.
</Aside>

## 6. Order-type matrix

Order types vary by segment, product, and exchange. The matrix below covers the most common types in India's equity, derivatives, currency, and commodity markets.

### 6.1 Cash segment (CM)

| Order type | Description | Time-cut | Margin profile | Notes |
|---|---|---|---|---|
| NRML | Normal carry-forward order; settles T+1 (or T+0 if eligible) | None within trading hours; AMO 15:45–08:59 | VaR + ELM upfront on buy; against holding on sell | Default product type |
| MIS | Margin Intraday Square-off; auto-closed by RMS before market close | Auto-square-off typically 15:20 IST | Leverage permitted intraday (per broker RMS policy) | Position must square off; otherwise RMS auto-squares with charges |
| CO | Cover Order; entry order with mandatory stop-loss | Same as MIS | Reduced margin owing to capped loss via SL | SEBI restrictions on leverage apply |
| BO | Bracket Order; entry with stop-loss and target | Same as MIS | Reduced margin owing to capped both sides | Heavily used by retail; bracket of three orders per "bracket" |
| AMO | After-Market Order; queued for next day's pre-open | Captured 15:45 evening → 08:59 next morning; released at pre-open | Margin lock at capture; re-validated at release | Margin position may change overnight; re-validation can reject |
| GTT | Good-Till-Triggered (broker-side; not exchange-side) | Trigger price / quantity — broker holds until trigger fires | Margin computed on trigger; reservation may or may not pre-block | Broker-internal product; not all brokers offer; surveillance flags possible |

### 6.2 F&O / CD

| Order type | Description | Time-cut | Margin profile | Notes |
|---|---|---|---|---|
| NRML | Carry-forward derivative position | None within trading hours; AMO window same as CM | Full SPAN + ELM upfront | Default for delivery / carry |
| MIS | Intraday derivative position; auto-square-off | Auto-square-off typically 15:25 (equity F&O), CD-specific | Reduced margin (broker RMS policy, typically intraday) | SEBI rules on minimum margin still apply |
| CO | Cover order on derivatives | Same as MIS | Reduced margin | Less common in derivatives |
| BO | Bracket order on derivatives | Same as MIS | Reduced margin | Common in option-buy positions |
| AMO | After-market derivative order | Same window as CM AMO | Lock at capture, re-validate at release | Higher rejection rate than CM AMO (overnight MTM and scanrange refresh) |

### 6.3 Commodity (COM, on MCX)

| Order type | Description | Time-cut | Margin profile | Notes |
|---|---|---|---|---|
| NRML | Carry-forward commodity | MCX session timing (segment-specific; agri / non-agri / international) | SPAN + ELM (MCX) + delivery / tender margins where applicable | Physical-delivery margin kicks in near tender |
| MIS | Intraday commodity | Auto-square-off typically 23:25 for international metal segments; segment-specific | Reduced margin (broker policy) | Tighter MCX RMS than equity |
| CO / BO | Cover / bracket commodity | Same as MIS | Reduced margin | Less common |

### 6.4 Special variants

- **Limit / Market / Stop-loss-Market / Stop-loss-Limit** are price types, orthogonal to the product types above. Every product type can be combined with any price type subject to exchange rules.
- **IOC** (Immediate-or-Cancel) — execute the available quantity immediately; cancel the rest. Available across segments.
- **GTD** (Good-Till-Date) — historically supported on some segments; largely retired in favour of GTT.
- **Disclosed quantity** — partial-display orders for large-quantity flows; available on cash segment with minimum-display rules.
- **Iceberg** — auto-slicing of a large order into smaller display slices. Supported on derivatives on NSE.

<Aside type="tip">
**The single most consequential MIS-related risk in retail OMS is the auto-square-off window.** A retail client with a leveraged MIS position around 15:20 (equity) faces an automatic RMS-driven exit — at whatever price the market offers. Strong RMS implementations begin tagging positions as "near-square-off" by 15:00 and surface a client warning; weaker ones simply auto-exit at 15:20. The cost of being on the receiving end of an auto-square-off in a thin or fast-moving market is real — and is one of the most common retail-grievance categories. Several brokers have moved to giving the client a final warning at 15:15 with a one-click "convert to delivery" option requiring additional margin.
</Aside>

## 7. Latency budgets

Latency budgets at each stage of the order pipeline. These are P95 targets at a credible retail OMS; institutional or co-located shops will see better numbers.

| Stage | Budget P95 | Notes |
|---|---|---|
| Client UI → broker gateway TLS termination | 50–200 ms | Dominated by network RTT; mobile is worse than web |
| Broker gateway → OMS persistence | < 2 ms | In-memory cache plus async write to durable store |
| OMS → RMS segment check | < 0.5 ms | Local cache lookup |
| OMS → RMS margin lock | < 2 ms | Reservation write to margin store; SPAN computation if not cached |
| OMS → RMS MWPL check | < 0.5 ms | Local counter |
| OMS → RMS order-type check | < 0.5 ms | Local rules |
| OMS → RMS surveillance check | < 1 ms | Local list lookups; async pattern compute |
| OMS → FIX engine | < 1 ms | In-process or local-socket hop |
| FIX engine → exchange | 1–20 ms | Network RTT to exchange; colocation pulls this to sub-ms |
| Exchange match → ExecReport back to broker | event-driven; typically < 5 ms after match | Exchange side |
| OMS persist ExecReport → client UI update | 5–50 ms | Async fan-out via WebSocket or push notification |

The cumulative pre-trade RMS budget — segment + margin + MWPL + order-type + surveillance — is the most tightly watched: most brokers target P99 < 5 ms for this entire chain. Slipping above 10 ms starts showing as visible order-placement latency that algo clients react to. Most brokers maintain per-node P99 dashboards with alerts at 3× baseline.

## 8. What fails and where

A taxonomy of common operational failures with the layer where they surface.

| Failure | Surface | Root cause |
|---|---|---|
| Order rejected with "segment not active" on a known-active client | OMS segment-check | Stale client-master cache; reload from authoritative source |
| Order rejected with "insufficient margin" on a client with apparent free balance | RMS margin lock | Stale or duplicated reservation rows; reservation-cleanup batch hasn't run |
| Order release succeeds but no ExecReport arrives | OMS / FIX session | FIX gap; check sequence numbers and trigger Resend Request |
| OMS shows "OPEN_AT_EXCHANGE" but exchange portal shows order is closed | Reconciliation | Drop-copy feed lagging; resync from exchange end-of-day file |
| Mass order rejects starting at a specific time | RMS parameter | Scanrange / ELM ratio not refreshed at BOD; reload SPAN parameter file |
| AMO releases at pre-open but fails margin | AMO re-validation | Overnight MTM ate into margin; client must transfer funds |
| CTCL approval revoked notification | Exchange Inspection | Unapproved software change in production |
| MIS auto-square-off failed; position carries overnight | RMS auto-square-off | Square-off logic bug or client's order modify race condition |
| FIX session disconnect at exchange end | FIX engine | Exchange-side maintenance; logon after their grace window |
| GSM / ASM list rebuild missing for the day | Surveillance ingestion | BOD list-download failed; manual reload from exchange portal |
| Pre-open AMO batch fails | OMS AMO holder | Batch script error; pre-open release window is 09:00 — re-run manually within window |

## 9. The operator's debugging checklist

When an OMS issue surfaces, run through this checklist before diving into code:

1. **Time-bound it.** When did it start? Trace to a specific deploy, exchange-side maintenance window, BOD parameter refresh, or scheduled batch.
2. **Affected scope.** Is it a single client, a segment, an exchange, all flow? Scope rules out the obvious classes of root cause.
3. **Check the BOD checklist.** Did SPAN load? Did ELM ratios load? Did GSM / ASM lists refresh? Did contract files arrive? Any one of these missing manifests as a different OMS symptom.
4. **Check FIX session health.** Are all expected sessions logged on? Heartbeats current? Sequence numbers in step?
5. **Check the RMS margin store.** Stale reservations from previous days? Reservation count exceeding orders open?
6. **Check the OMS-RMS bridge.** Latency P99 within budget? Error rate within baseline?
7. **Check the exchange status page.** Exchange-side issues surface there before they surface in the broker's monitoring.
8. **Check the latest deploy.** Most defects come from the most recent change; revert is cheaper than debug.
9. **If algo-related, check the algo-ID and OPS-threshold counters.** Algo flow has its own surveillance triggers per [NSE/INVG/67858](/broking-kyc/reference/circulars/nse/#nse-invg-67858) / [NSE/INVG/69255](/broking-kyc/reference/circulars/nse/#nse-invg-69255).
10. **If CTCL-related, confirm the approval is current and the deployed version matches what was approved.**

## Sub-cases / edge cases

- **Co-located OMS** — institutional shops that colocate at NSE / BSE / MCX colo (Mahape, Bandra-Kurla, etc.) run their order-routing inside the exchange's data centre. The CTCL approval still applies; latency drops from low single-digit ms to sub-millisecond. Operationally, the BOD / EOD batch flows are network-isolated and need their own connectivity plan.
- **Multi-exchange smart-order-routing** — when a stock is dual-listed (e.g., on both NSE and BSE), the OMS may include an SOR module that splits an order across exchanges based on best-price liquidity. SOR has its own CTCL approval requirement (NSE / BSE each); the back-office must reconcile across both exchanges' trade files.
- **Custodian-cleared institutional flow** — the trade is executed by the broker but cleared by the institutional client's custodian (e.g., HDFC Custody Services). The OMS captures the trade with the custodian's clearing-member code; the broker's clearing flow is split between the broker's own positions and the custodian-flagged ones.
- **API access for AP / sub-broker chains** — the broker exposes a constrained API to its authorised persons (APs) for their own client flow. The AP's orders pass through the same pre-trade pipeline but with additional `AP-ID` tagging in the audit trail.
- **NRI flow post Sep 2025 CP-code removal** — NRI orders no longer route via CP code; direct broker-side handling replaces it ([SEBI/HO/MIRSD/MIRSD-PoD/P/CIR/2025/109](/broking-kyc/reference/circulars/sebi-mirsd/#sebi-ho-mirsd-mirsd-pod-p-cir-2025-109)). The OMS must validate the NRI client's PIS letter, NRE / NRO bank tagging, and segment restrictions on every order.
- **Algo orders from in-house algos vs vendor-empanelled algos** — see the [retail algo framework deep dive](/broking-kyc/deep-dives/trading-day/retail-algo-framework/).
- **Cross-margin orders** — orders that benefit from spread-margin offsets (correlated index / constituent pairs, calendar spreads). The RMS margin computation must apply the cross-margin rule from [NCL/CMPT/62978](/broking-kyc/reference/circulars/clearing-corps/) (same-expiry 25–30%, different-expiry 35–40% spread margins). Misapplied cross-margin is a frequent source of audit findings.

## Practical notes

- **[industry practice]** The OMS-RMS split is enforced by a low-latency message bus (commonly an in-process Disruptor pattern or a Solace / Tibco bus); the back-office connects via a slower path (Kafka / RabbitMQ / file drop) because end-of-day reconciliation can tolerate seconds, not milliseconds.
- **[gotcha]** The dealer terminal is the most-trusted entry path but also the highest fraud surface. Front-running, unauthorised trading, and impersonation patterns all begin at dealer terminals. Brokers must run dealer-specific surveillance — designated person lists, trading-window controls per PIT, branch-level position monitoring — and the dealer ID must be on every order's audit trail.
- **[cost optimization]** Vendor OMS-RMS-back-office products (the dominant Indian-broker stack) trade cost against control. Building in-house is justified above roughly 5,000–10,000 orders per second sustained throughput; below that, vendor stacks are usually cheaper than the engineering investment.
- **[risk trade-off]** Optimistic pre-trade margin (release-first, lock-second) reduces P50 latency by tens of microseconds but is a violation of SEBI pre-trade-margin rules. Synchronous lock-then-release is the only compliant pattern.
- **[gotcha]** AMOs are the silent killer of margin discipline. Orders captured at 16:00 the previous day, validated against that evening's margin, can fail at the next morning's pre-open if overnight MTM has eaten into the client's balance. The OMS must re-validate at release; clients must be educated that AMO is "subject to morning margin".
- **[industry practice]** Sequence numbers in FIX are the single most operationally-fraught aspect of the institutional edge. A sequence reset done wrong during a session disconnect can cause hours of reconciliation work the next morning. Most FIX engines log full sequence-state at every session boundary specifically for this reason.
- **[cost optimization]** Most retail brokers use the FIX engine only for institutional flow and route retail through CTCL — FIX library licences, dedicated engines, and the operational headcount to support institutional FIX are non-trivial overhead for a primarily retail book.
- **[risk trade-off]** GTT (Good-Till-Triggered) is a broker-side construct, not an exchange-side primitive. The broker holds the order; if the broker's GTT engine fails (or the OMS restarts) at the moment of trigger, the order may not actually fire — and the client believes their stop or take-profit is "in the market". Clear customer-facing disclosure plus robust monitoring of the GTT engine is essential.

## Cross-references

- [Integration DAG: Trading hours](/broking-kyc/operations/integration-dag/trading-hours/) — the per-order pre-trade pipeline DAG and node-level detail this page expands on.
- [Integration DAG: Onboarding](/broking-kyc/operations/integration-dag/onboarding/) — the upstream pipeline that sets the segment-activation, KRA, and UCC state the OMS later consumes.
- [Broker Process Narrative](/broking-kyc/broker-process/narrative/) — Section 2 walks the trading day chronologically; this page is the systems-architecture lens on the same window.
- [Compliance Blueprint — Margin compliance domain](/broking-kyc/operations/compliance-blueprint/#margin-compliance-30-entries) — the regulatory grid for every margin obligation the RMS enforces.
- [Compliance Blueprint — Surveillance domain](/broking-kyc/operations/compliance-blueprint/#surveillance-30-entries) — surveillance rules consumed by the OMS pre-trade gate.
- [Deep Dive: SPAN methodology](/broking-kyc/deep-dives/trading-day/rms-span-methodology/) — sibling page on the margin computation behind the margin-lock gate.
- [Deep Dive: Surveillance, GSM, ASM](/broking-kyc/deep-dives/trading-day/surveillance-norms-gsm-asm/) — sibling page on the surveillance gate's rule library.
- [Deep Dive: Retail algo framework](/broking-kyc/deep-dives/trading-day/retail-algo-framework/) — sibling page on the API and algo-specific OMS controls.
- [Deep Dive: Block / bulk deals](/broking-kyc/deep-dives/trading-day/block-bulk-deals/) — sibling page on the dedicated-window order flow.
- [Deep Dive: Short-delivery auction](/broking-kyc/deep-dives/trading-day/short-delivery-auction/) — sibling page on the T+2 morning auction the OMS may need to source liquidity from.
- [Vendor Atlas — OMS / EMS / Trading Platforms](/broking-kyc/vendors/atlas/#oms-ems-trading-platforms-15-products) — concrete vendor products in this category.
- [Vendor Atlas — Risk Management Systems](/broking-kyc/vendors/atlas/#risk-management-systems-15-products) — concrete RMS vendor products.
- [NSE circulars](/broking-kyc/reference/circulars/nse/) — CTCL, NEAT, IBT, DMA, algo circulars referenced through the page.
- [Clearing-corp circulars](/broking-kyc/reference/circulars/clearing-corps/) — SPAN scanrange, ELM, peak-margin spec circulars.

## Verified through

2026-05-14

---

*AI-generated and not legal, financial, or compliance advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*

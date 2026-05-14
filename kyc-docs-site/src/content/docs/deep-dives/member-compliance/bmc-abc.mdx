---
title: "Deep Dive: BMC / ABC — Base Minimum Capital and Additional Base Capital"
description: Exhaustive reference for the Base Minimum Capital (BMC) and Additional Base Capital (ABC) framework that governs a stockbroker's deposit at the clearing corporation — segment-specific thresholds, composition rules, replenishment timeline, breach consequences, and how it differs from the broker's continuous networth obligation.
---

import { Aside } from '@astrojs/starlight/components';

> **Why this page is structured this way:** BMC and ABC are two of the most commonly conflated capital requirements in Indian broking. Operators repeatedly mistake one for the other, treat them as exchange-side when both ultimately sit with the clearing corporation, or compute them against the wrong base. This page separates them, places each next to networth (the broker-level continuous requirement they sit beside but do not subsume), and walks through threshold tables, composition rules, the breach cycle, and the operational mechanics that produce a deposit call.

## TL;DR

- **BMC** (Base Minimum Capital) is a fixed, segment-specific cash-and-collateral deposit that every trading member must keep on continuous deposit with the clearing corporation as a default-risk cushion. Thresholds are set by exchange byelaws under the umbrella of [SEBI (Stock Brokers) Regulations 2026 (SEBI/LAD-NRO/GN/2026/291)](/broking-kyc/reference/circulars/sebi-other/#sebilad-nrogn2026291) and typically range from **Rs.10 lakh to Rs.50 lakh** per segment depending on whether the member trades proprietary, client, or both.
- **ABC** (Additional Base Capital) is variable, top-up capital deposited *above* BMC to support the member's intraday exposure. ABC is consumed continuously by margin obligations — SPAN + ELM + exposure + delivery + MTM-driven add-ons. When ABC erodes below the required level, the clearing corp issues a "deposit call" and trading is restricted until the member replenishes.
- **Composition rules:** both BMC and ABC may be deposited in **cash, fixed deposit receipts (FDR), bank guarantees (BG), and approved securities** (G-Secs, T-Bills, SGBs, approved equities, ETF, MF units) with haircuts. The SEBI / CC framework requires at least **50% in cash or cash-equivalent**, with the balance permissible in non-cash collateral.
- **Networth is different and additional.** The Rs.3 crore networth floor under [SEBI/LAD-NRO/GN/2026/291](/broking-kyc/reference/circulars/sebi-other/#sebilad-nrogn2026291) is a **broker-level continuous balance-sheet test** evidenced by a half-yearly statutory auditor certificate; BMC / ABC are **clearing-corp-level deposits** evidenced by a CC ledger. A broker can simultaneously have ample networth but a BMC / ABC shortfall, or vice versa, and each must be cured on its own track.
- **Breach consequences scale.** A short BMC immediately reduces the member's exposure allowance and may trigger trading suspension if not honoured within prescribed windows. A short ABC blocks fresh exposure on the affected segment until cured. Repeated breaches feed into the [NSE inspection penalty grid (NSE/INSP/53530)](/broking-kyc/reference/circulars/nse/#nseinsp53530) and clearing-corp disciplinary action.
- AI-generated synthesis. **Verify any specific threshold or composition rule against the linked circulars and exchange byelaws before acting.**

## Conceptual overview

The Indian clearing layer assumes the credit risk of every settled trade. When a broker-member places an order with a counterparty, it is the clearing corporation — National Securities Clearing Corporation Ltd (NSCCL / NCL) for NSE, Indian Clearing Corporation Ltd (ICCL) for BSE, and Multi Commodity Exchange Clearing Corporation Ltd (MCXCCL) for MCX — that interposes itself as the central counterparty. If the broker defaults, the clearing corp pays the receiving side first and recovers from the broker afterwards. The capital structure that makes this risk-warehousing possible has four concentric rings:

1. **Networth** — the broker's continuous balance-sheet adequacy, evidenced at the broker level. Filed half-yearly via statutory auditor certificate on the [ENIT-NEW-COMPLIANCE module](/broking-kyc/reference/circulars/nse/#nsecomp64293). The Rs.3 crore base floor sits in [SEBI (Stock Brokers) Regulations 2026 (SEBI/LAD-NRO/GN/2026/291)](/broking-kyc/reference/circulars/sebi-other/#sebilad-nrogn2026291), with a higher **variable** component tied to volume of client funds handled and MTF exposure.
2. **BMC** — a fixed deposit at the clearing corp, segment-by-segment. Acts as the first layer of cushion against an intraday default before the broker's deposit gets re-evaluated.
3. **ABC** — the variable top-up sitting on BMC. Computed daily based on the broker's open exposure, it is the layer that grows and shrinks intraday.
4. **Core Settlement Guarantee Fund (Core SGF)** — the clearing-corp-wide mutualised pool that absorbs default losses after the defaulting member's deposits are exhausted. The broker's contribution to Core SGF is itself a quarterly cycle (see [SETTLEMENT-008 in the Compliance Blueprint](/broking-kyc/operations/compliance-blueprint/)).

BMC and ABC are operationally inseparable but conceptually distinct. BMC is the *floor*; ABC is the *headroom above the floor that scales with what the member trades today*. The clearing corp's margin engine reduces ABC throughout the trading day as margin obligations accrue; if ABC nears zero the broker's exposure permission shrinks; if BMC itself is impaired (because ABC ran out and BMC absorbed the shortfall), the broker is restricted from fresh trades until BMC is restored.

<Aside type="note">
**Why the deposit sits with the clearing corp, not the exchange.** The exchange (NSE / BSE / MCX) runs the matching engine and the surveillance feed; it does not stand in the middle of settlement. The clearing corporation (NCL / ICCL / MCXCCL) is the central counterparty that takes the credit risk. Because the deposit is a default-risk cushion, it logically lives where the credit risk lives — at the clearing layer. The exchange's role in BMC / ABC is to *validate at admission* that the new member has deposited what the byelaw requires; the ongoing custody and monitoring of the deposit is the clearing corp's. The same logic is why [SPAN scanrange](/broking-kyc/broker-process/narrative/) is published by the clearing corp, not the exchange — both are credit-side artefacts.
</Aside>

## BMC — Base Minimum Capital

### Threshold framework

BMC thresholds are set per exchange byelaws under [SEBI (Stock Brokers) Regulations 2026 (SEBI/LAD-NRO/GN/2026/291)](/broking-kyc/reference/circulars/sebi-other/#sebilad-nrogn2026291), which replaced the SEBI (Stock Brokers and Sub-Brokers) Regulations 1992 effective 7 January 2026. The 2026 Regulations preserve the segment-and-membership-type slab structure that pre-existed under the 1992 regime while consolidating it into a single source of truth. The thresholds reflect the maximum exposure category the member is permitted, and brokers operating in multiple segments deposit the cumulative requirement across segments.

| Segment / membership type | Indicative BMC threshold | Notes |
|---|---|---|
| Cash Market (CM) — trades only own account (proprietary) | Rs.10 lakh | Lowest band; covers prop-only members |
| Cash Market (CM) — trades for clients only | Rs.15 lakh | Client-facing escalates the cushion |
| Cash Market (CM) — trades for both own and clients | Rs.25 lakh | Most retail brokers fall in this band |
| Cash Market (CM) — trades for self, clients, and provides clearing services | Rs.50 lakh | Self-clearing or TM-cum-CM |
| F&O (Equity Derivatives) | Rs.50 lakh | Derivatives-segment cushion is higher reflecting daily MTM volatility |
| Currency Derivatives (CD) | Rs.50 lakh | Joint RBI / SEBI segment; same indicative band |
| Commodity Derivatives (COM, MCX) | Rs.50 lakh | MCX byelaws under [MCX/MEM/105/2026](/broking-kyc/reference/circulars/mcx/#mcxmem1052026) carry the segment-specific specification |
| Interest Rate Derivatives (IRD) | Rs.50 lakh | Typically institutional-only |
| Debt segment | Rs.10 lakh | Lower because of the segment's institutional client base |
| Clearing Member (additional) | Variable per CC | Clearing-membership adds an own deposit at NCL / ICCL / MCXCCL on top of TM BMC |

> The thresholds above are **indicative** and should be read against the current exchange byelaw — NSE Capital Markets Rules, BSE Membership Rules and Bye-Laws, MCX Business Rules under [MCX/MEM/105/2026](/broking-kyc/reference/circulars/mcx/#mcxmem1052026). Exchanges periodically revisit segment-specific BMC in line with overall risk-management posture; compliance officers should not rely on a once-set number without periodic confirmation.

### Composition — what counts as BMC

BMC may be deposited in any combination of the following, subject to the **at-least-50%-cash-equivalent rule**:

- **Cash** — INR deposit at the clearing corp's settlement bank. Fully counted at face value with zero haircut. This is the most flexible form because it can immediately absorb any settlement obligation.
- **Fixed Deposit Receipt (FDR)** — INR FDRs from approved banks (clearing-corp publishes the approved bank list quarterly — most recent at NSCCL is updated through [MCX/MCXCCL/094/2026](/broking-kyc/reference/circulars/clearing-corps/#mcxmcxccl0942026) for MCXCCL and the equivalent NSCCL / ICCL quarterly approved-securities circular). FDRs must be issued in the broker's name, lien-marked in favour of the clearing corp, and carry a minimum tenure (typically 7 days physical-FDR minimum). Margin benefit on G-Sec / T-Bill / SGB is withdrawn two days before maturity to avoid roll-over risk.
- **Bank Guarantee (BG)** — irrevocable BG issued by an approved bank in the clearing corp's favour for a specified amount and tenure. BGs typically carry a small haircut (1–2%) reflecting bank credit and operational delay risk.
- **Approved securities** — Government securities (G-Sec), T-Bills, Sovereign Gold Bonds (SGB) at face value with no haircut; ETF and equity collateral subject to VAR-rate haircut and a 25% per-security cap of total collateral, as specified in the approved-collateral list. Equity collaterals are accepted only where the security is on the clearing corp's approved list.
- **Mutual Fund units** — Cash MF units (overnight / liquid schemes) for cash-collateral purposes; non-cash MF units for non-cash component.

The **cash / non-cash split rule** applies across BMC and ABC together: the member's deposit base at the clearing corp must include at least 50% cash or cash-equivalent (cash + FDR + BG + G-Sec / T-Bill / SGB). This rule is laid out in [SEBI/HO/MIRSD/POD-1/P/CIR/2025/94](/broking-kyc/reference/circulars/sebi-mirsd/#sebihomirsdpod-1pcir202594) (the SEBI Stock Broker Master Circular) and operationalized in the clearing-corp consolidated circulars [NCL/CMPT/61800](/broking-kyc/reference/circulars/clearing-corps/#nclcmpt61800) (CM segment) and [NCL/CMPT/61801](/broking-kyc/reference/circulars/clearing-corps/#nclcmpt61801) (F&O segment).

### BMC at admission and continuing

A new member-broker deposits the prescribed BMC as part of the [exchange-admission process](/broking-kyc/operations/compliance-blueprint/#exchange--depository-registration-30-entries) — without the deposit, the SEBI registration order does not translate to trading rights at the exchange. The MCX framework under [MCX/MEM/105/2026](/broking-kyc/reference/circulars/mcx/#mcxmem1052026) (effective 2 March 2026) introduced a **six-month grace period** for newly admitted commodity members to put BMC and operational infrastructure in place, with a Rs.10,000 / month late-fee regime (capped at Rs.1,20,000 over 12 months) on overruns — but absent an analogous grace at NSE / BSE, members at those exchanges remain on the stricter admission-date model.

BMC is a continuous requirement: it sits with the clearing corp as long as the broker is an active member. If the broker uses BMC to settle a default (the clearing corp draws on BMC after ABC is exhausted), the member must **replenish within prescribed days** — typically 7 days — or face progressive suspension of trading rights. The replenishment timeline is part of each clearing corp's bye-laws and is not a SEBI-side rule.

<Aside type="caution">
**A drawn BMC is a serious surveillance signal.** When a clearing corp's risk function draws on BMC to honour an obligation the broker could not settle, the event itself is recorded against the broker's risk profile. Repeat draws within a year trigger inspection visits and potentially adverse fit-and-proper findings under [SEBI (Stock Brokers) Regulations 2026 (SEBI/LAD-NRO/GN/2026/291)](/broking-kyc/reference/circulars/sebi-other/#sebilad-nrogn2026291). The penalty cost is recoverable; the reputational and surveillance cost is not.
</Aside>

## ABC — Additional Base Capital

### Computation methodology

ABC sits on top of BMC. Where BMC is fixed, ABC is **member-by-member and intraday-variable** — it grows when the member needs more exposure headroom (typically posting more cash / non-cash to the clearing corp ahead of the trading day) and shrinks as margin obligations accrue against open positions. The clearing corp's margin engine computes the member's total margin requirement at any moment as:

```
Total margin obligation
  = SPAN initial margin
  + ELM (Extreme Loss Margin)
  + Exposure margin (for FNO segments)
  + Delivery margin (for delivery positions in CM)
  + Additional margin (any surveillance / ASM / GSM overlay)
  + MTM debits (loss on outstanding positions, marked daily)
```

The clearing corp then computes:

```
Free / available margin (member level)
  = Total deposit at CC (BMC + ABC + own cash / FDR / BG / collateral)
  - Total margin obligation (across all clients and segments)
```

If the free / available margin is positive, the member can take on more exposure. If it is negative, the member is in **margin shortfall** — a peak-margin-snapshot shortfall in the four intraday windows (11:30, 12:30, 13:30, 14:30) attracts the per-snapshot penalty under [NSE/INSP/53525](/broking-kyc/reference/circulars/nse/#nseinsp53525) (penalties for margin reporting / shortfall in Cash and Derivative Segments) and [NSE/INSP/64315](/broking-kyc/reference/circulars/nse/#nseinsp64315) (guidelines on margin collection and reporting), and member cannot enter additional risk-creating positions.

### ABC as a member-side operational construct

ABC is operationally what the member *pre-positions* with the clearing corp ahead of the day's trading. A retail broker expecting Rs.500 crore in client buy obligations and Rs.300 crore in client F&O exposure must ensure its deposit at the clearing corp covers the expected margin requirement; the deposit beyond BMC is the ABC. The broker's funds team and RMS team coordinate end-of-day to estimate next-day's exposure and to upstream the corresponding ABC.

The **cash / non-cash 50:50 rule** still applies on the combined BMC + ABC base. A broker depositing Rs.10 crore as ABC must compose it such that at least 50% (Rs.5 crore) is cash or cash-equivalent, even if non-cash collateral is operationally easier (e.g., pledging client securities under the [pledge framework — SEBI/HO/MIRSD/DOP/CIR/P/2020/28](/broking-kyc/reference/circulars/sebi-mirsd/#sebihomirsddopcirp202028)).

### MTM-driven ABC top-up

In FNO, the daily MTM swing can erode ABC during the trading day. The clearing corp's risk engine recomputes MTM at the four peak-margin snapshots and triggers an **intraday margin call** if MTM losses on outstanding positions consume enough of the member's free margin to bring the member into shortfall. The member must then deposit additional cash / collateral within the prescribed window — typically by EOD of the same day — or face the peak-margin shortfall penalty.

This is one of the operationally heaviest items in any broker's daily clock. Post the EOD of a high-volatility day, the funds team typically receives the clearing-corp deposit call by email and within member portal alerts; deposit must be processed and acknowledged before the next BOD. Failure to honour the deposit by next BOD risks the morning's trading window being restricted.

### Replenishment timeline

Per clearing-corp byelaws, the replenishment timeline depends on the source of the shortfall:

- **Intraday MTM-driven shortfall** — replenish by EOD same day; otherwise next BOD trading is restricted and peak-margin penalty under [NSE/INSP/53525](/broking-kyc/reference/circulars/nse/#nseinsp53525) applies.
- **Settlement-driven BMC erosion** — replenish within 7 days; otherwise trading suspension cascades.
- **MTM consumption that goes below the 50% cash threshold** — bring the cash component back to ≥ 50% by next deposit cycle; the 50% rule is checked at the daily deposit-allocation step (10:00 PM IST under the revised [NCL/CMPT/72025](/broking-kyc/reference/circulars/clearing-corps/#nclcmpt72025) cut-offs).
- **Approved-securities collateral that goes ineligible** — when a security falls off the approved list (typically a quarterly revision per the approved-securities circular), the member must replace it with eligible collateral within the time prescribed in that circular (typically the same business day).

<Aside type="note">
**Approved-securities collateral is dynamic.** The clearing corps publish a quarterly revision of the approved-securities and approved-banks list — for MCXCCL, the most recent is [MCX/MCXCCL/094/2026](/broking-kyc/reference/circulars/clearing-corps/#mcxmcxccl0942026) (effective 2 March 2026, with subsequent supersession by MCX/MCXCCL/240/2026). NSCCL and ICCL publish parallel quarterly lists. A member that has posted a security that subsequently falls off the list must replace it; the clearing-corp risk system auto-flags such items. Group / associate-entity issued collateral is permanently excluded — a broker cannot pledge its own promoter group's equity as collateral.
</Aside>

## Networth vs BMC vs ABC — the cleanest mental model

The single most common operator confusion is between these three. The cleanest mental model is to think of them as living on different axes:

| Axis | Networth | BMC | ABC |
|---|---|---|---|
| **Where it lives** | Broker's balance sheet | Clearing corp deposit ledger | Clearing corp deposit ledger |
| **What it measures** | Solvency and capital adequacy of the broker as an entity | Floor cushion at CC for default risk | Variable cushion above BMC for current exposure |
| **Who verifies** | Statutory auditor (CA firm) | Clearing corp risk function | Clearing corp risk function |
| **Cadence** | Continuous, half-yearly certificate | Continuous, deposit ledger | Daily, intraday-variable |
| **Evidence** | Statutory-auditor-signed networth certificate uploaded via [ENIT-NEW-COMPLIANCE](/broking-kyc/reference/circulars/nse/#nsecomp64293) | CC deposit confirmation; capital-adequacy report | CC daily margin / collateral report |
| **Minimum** | Rs.3 crore base + variable per [SEBI/LAD-NRO/GN/2026/291](/broking-kyc/reference/circulars/sebi-other/#sebilad-nrogn2026291) | Rs.10–50 lakh per segment per exchange byelaw | Whatever the day's exposure requires |
| **Composition** | Net of liabilities, intangibles, related-party loans, etc. per the SEBI gazette computation | Cash + FDR + BG + securities ≥ 50% cash | Cash + FDR + BG + securities ≥ 50% cash combined with BMC |
| **Filing** | Half-yearly; MTF members by 31 Oct, others by 30 Nov for Sep-end | None — sits on CC ledger | None — sits on CC ledger |
| **Penalty on shortfall** | Trading restrictions, suspension under [NSE/INSP/53530](/broking-kyc/reference/circulars/nse/#nseinsp53530) | Trading suspension; auto squareoff limits | Margin shortfall penalty per [NSE/INSP/53525](/broking-kyc/reference/circulars/nse/#nseinsp53525); fresh-exposure block |

The corollary: a broker may legitimately be fully compliant on networth but in BMC or ABC shortfall. The half-yearly networth certificate is a *point-in-time photograph* of the balance sheet; BMC is a *continuous deposit ledger entry* at the clearing corp; ABC is *intraday-variable*. Each track has its own monitoring, its own evidence trail, and its own remediation cycle. Treating them as a single requirement leads operators to wrong root-cause analyses when a deposit call is received.

## Sub-cases / edge cases

### Multiple-segment members

A broker active in CM, F&O, CD, and COM cumulates BMC across segments — total BMC obligation might be Rs.10 + Rs.50 + Rs.50 + Rs.50 = Rs.160 lakh, plus the clearing-member additional deposit if the broker is also a CM. The clearing corps maintain segment-wise sub-ledgers within the consolidated deposit so a draw against F&O default does not impair the CM segment, but the *member-level* monitoring is on the aggregate.

### Self-clearing vs trade-only members

A self-clearing trading member (TM-cum-CM) faces both the TM deposit obligation and the CM deposit obligation at NSCCL / ICCL / MCXCCL. The cumulative requirement is higher; the operational complication is that the deposit pools must be managed separately because of the [TM CUSPA / CM CUSPA / TM CSMFA account structure](/broking-kyc/operations/compliance-blueprint/) introduced under [NCL/CMPT/63669](/broking-kyc/reference/circulars/clearing-corps/#nclcmpt63669) for direct-payout-to-demat. Professional clearing members (CM-only, not trading) carry CM CUSPA only.

### Clearing-corp draws on the deposit

When a clearing corp draws on BMC to honour a defaulted obligation (i.e., the member could not pay-in funds or securities and the CC settled the receiving side), the draw is recorded as a debit on the member's deposit ledger. The member must replenish within the prescribed window; failure progresses through escalating consequences:

1. **Day 1–2** — clearing corp issues a deposit call with explicit replenishment deadline.
2. **Day 3–7** — member is restricted from increasing exposure in the affected segment.
3. **Day 7+** — clearing rights suspended; trading rights at the exchange affected by extension.
4. **Day 30+** — member faces disciplinary action including possible cancellation under [NSE/INSP/53530](/broking-kyc/reference/circulars/nse/#nseinsp53530) penalty matrix and exchange disciplinary bye-laws.
5. **In parallel** — the Core SGF is drawn against if BMC + ABC + own collateral are exhausted; this is the worst-case scenario and triggers a [member-default cascade](/broking-kyc/deep-dives/foundational/member-default-recovery/).

### Substitution and roll-over of deposit forms

A member may substitute one deposit form for another (e.g., release FDR and replace with cash) — the clearing corp's deposit-substitution procedure permits this through the daily collateral-allocation cycle. The substitution is processed through the clearing corp's risk system with a free-collateral availability check; release is typically same-day if the substitute is in place. The cut-offs are revised periodically — [NCL/CMPT/72025](/broking-kyc/reference/circulars/clearing-corps/#nclcmpt72025) (effective 2 January 2026) revised the upstreaming / downstreaming cut-offs to 08:00 PM and the collateral allocation window to 10:00 PM.

### Bank-CM exemption

Bank-CMs (clearing members that are themselves scheduled commercial banks) face a different upstreaming framework — the bank's regulatory capital is computed under RBI norms and the SEBI / CC framework recognises a partial exemption from the upstreaming mandate (see [SEBI/HO/MIRSD/MIRSD-PoD-1/P/CIR/2023/71](/broking-kyc/reference/circulars/sebi-mirsd/#sebihomirsdmirsd-pod-1pcir202371) on client-funds upstreaming and [NCL/CMPT/57223](/broking-kyc/reference/circulars/clearing-corps/#nclcmpt57223) on the operational details). Most retail brokers are not bank-CMs and the exemption does not apply.

### Approved-collateral haircuts and concentration limits

Equity collateral pledged to support BMC / ABC is subject to:

- **VAR-rate haircut** as per the daily price-volatility computation; the haircut varies daily and the clearing corp's risk system applies it automatically.
- **25% per-security concentration cap** — no single security may exceed 25% of the member's total collateral. This is to prevent a member from over-relying on a single illiquid stock.
- **Approved-list dependency** — the security must be on the clearing corp's approved-securities list; falling off the list triggers a forced substitution within prescribed days.
- **Group / associate-entity exclusion** — the member cannot pledge collateral issued by its own promoter group or associates. This rule is fundamental to the integrity of the default cushion.

### Late-fee regime at MCX

MCX's [MCX/MEM/105/2026](/broking-kyc/reference/circulars/mcx/#mcxmem1052026) framework (effective 2 March 2026) introduced a six-month grace period for newly admitted commodity trading members to put deposit and operational infrastructure in place. Beyond the grace period, late fees accrue at Rs.10,000 per month (capped at Rs.1,20,000 over 12 months) until the deposit is in order; persistent default risks cancellation of the membership application. NSE and BSE have not announced a parallel grace; new equity-segment members deposit on the admission date.

## Practical notes

- **[industry practice]** Most large brokers maintain a daily "deposit-vs-obligation" dashboard at the funds-ops desk that shows BMC level, ABC level, total deposit, total margin obligation, free margin, and 50% cash threshold compliance. The dashboard is the front-line tool for spotting an approaching deposit call before the clearing corp issues one.
- **[gotcha]** The 50% cash / cash-equivalent rule applies on the **aggregate** of BMC + ABC, not on each individually. A broker that has BMC fully in cash but ABC fully in non-cash may technically be below 50% aggregate cash if BMC is small relative to ABC. The daily check must look at total cash vs total deposit.
- **[risk trade-off]** Posting cash to BMC is operationally simple but loses optionality — the cash is sterile at the CC. Posting equity collateral gets the broker some operational efficiency but introduces VAR-haircut risk (a market downdraft can erode collateral value by EOD of the same day, triggering a same-day deposit call). Most brokers maintain a target mix: 60% cash + cash-equivalent (above the 50% floor for safety margin), 40% in approved securities.
- **[gotcha]** Newly added securities to the approved-collateral list become eligible immediately on the circular's effective date, but a security being **removed** triggers a forced substitution typically by the next business day. Maintaining a watch on the quarterly approved-securities circular (most recent for MCXCCL: [MCX/MCXCCL/094/2026](/broking-kyc/reference/circulars/clearing-corps/#mcxmcxccl0942026)) is part of the funds-ops weekly checklist.
- **[cost optimization]** FDRs at the clearing corp earn interest at the issuing bank (lien-marked but interest-bearing). Choosing the right bank and tenure can earn the broker a small but consistent interest income that partially offsets the opportunity cost of the deposit. The constraint is that the bank must be on the clearing corp's approved-bank list, which is also revised quarterly.
- **[industry practice]** Clearing corps publish member-level capital-adequacy and deposit reports daily via the member portal. Funds Ops reconciles the CC ledger against the broker's own deposit register every BOD; any discrepancy triggers an immediate review with the clearing-corp risk desk.
- **[industry practice]** The half-yearly networth certificate is filed with extra haste by MTF-availing members (deadline 31 October for September-end certificate) compared with others (30 November). MTF requires the broker to fund client purchases against pledged collateral, which is itself a higher capital-adequacy concern — hence the earlier filing window. See [NSE/COMP/64293](/broking-kyc/reference/circulars/nse/#nsecomp64293) for the exact reminder language.

## Cross-references

- [Compliance Blueprint — Client funds (21 entries)](/broking-kyc/operations/compliance-blueprint/) — BMC and ABC compliance line-items (CLIENT-FUNDS-008, CLIENT-FUNDS-009) with the full evidence and citation columns.
- [Compliance Blueprint — Member compliance (23 entries)](/broking-kyc/operations/compliance-blueprint/) — Networth obligations (MEMBER-COMP-001, MEMBER-COMP-002), BMC (MEMBER-COMP-003), ABC (MEMBER-COMP-004) with regulator / owner / frequency.
- [Compliance Blueprint — Settlement (22 entries)](/broking-kyc/operations/compliance-blueprint/) — Core SGF contribution (SETTLEMENT-008) and the broader pay-in / pay-out framework that sits on the BMC / ABC capital base.
- [SEBI (Stock Brokers) Regulations 2026 — SEBI/LAD-NRO/GN/2026/291](/broking-kyc/reference/circulars/sebi-other/#sebilad-nrogn2026291) — the primary Regulation effective 7 January 2026 that consolidates networth / capital adequacy obligations.
- [SEBI Stock Broker Master Circular — SEBI/HO/MIRSD/POD-1/P/CIR/2025/94](/broking-kyc/reference/circulars/sebi-mirsd/#sebihomirsdpod-1pcir202594) — operational layer that converts the regulation into procedure (collateral composition, segregation, reporting).
- [NSCCL Cash Segment Consolidated Circular — NCL/CMPT/61800](/broking-kyc/reference/circulars/clearing-corps/#nclcmpt61800) — the canonical operational circular for BMC / ABC at NSCCL for the cash segment.
- [NSCCL F&O Consolidated Circular — NCL/CMPT/61801](/broking-kyc/reference/circulars/clearing-corps/#nclcmpt61801) — derivatives counterpart covering SPAN / ELM / exposure / delivery margin computations that feed ABC.
- [NCL/CMPT/72025 — Revised EPI / collateral allocation timings](/broking-kyc/reference/circulars/clearing-corps/#nclcmpt72025) — current cut-offs for upstreaming, downstreaming, and collateral allocation that affect daily ABC management.
- [MCX/MEM/105/2026 — MCX membership framework and grace period](/broking-kyc/reference/circulars/mcx/#mcxmem1052026) — MCX-specific BMC admission and late-fee regime effective 2 March 2026.
- [NSE compliance — half-yearly networth submission — NSE/COMP/64293](/broking-kyc/reference/circulars/nse/#nsecomp64293) — operational reminder for the half-yearly networth certificate and the ENIT-NEW-COMPLIANCE module path.
- [NSE inspection penalty grid — NSE/INSP/53530](/broking-kyc/reference/circulars/nse/#nseinsp53530) — penalty matrix for late / short submissions, applicable to networth and adjacent capital filings.
- [Margin reporting penalties — NSE/INSP/53525](/broking-kyc/reference/circulars/nse/#nseinsp53525) — peak-margin shortfall penalty regime that surfaces ABC consumption.
- [Direct-payout-to-demat — NCL/CMPT/63669](/broking-kyc/reference/circulars/clearing-corps/#nclcmpt63669) — explains the TM CUSPA / CM CUSPA / TM CSMFA structure that interacts with deposit ledgers.
- [Trading-day narrative — Section 2 BOD / EOD](/broking-kyc/broker-process/narrative/#2-a-trading-day--operators-view) — operational context for when BMC / ABC monitoring happens during the day.
- [Member-default recovery deep dive](/broking-kyc/deep-dives/foundational/member-default-recovery/) — what happens when BMC + ABC + Core SGF are insufficient.
- [Membership renewal deep dive](/broking-kyc/deep-dives/member-compliance/membership-renewal/) — annual renewal cycle that re-confirms BMC compliance.

## Verified through

2026-05-14

---

*AI-generated and not legal, financial, or compliance advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*

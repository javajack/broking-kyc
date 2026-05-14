---
title: "Deep Dive: Retail Algo Framework"
description: Walkthrough of SEBI's safer-retail-algo framework (Feb 2025) and the operational chain via NSE/INVG/66524 → NSE/INVG/67858 → NSE/INVG/69255 — broker algo approval at NSE / BSE / MCX, the tagged-order flow (algo-tagged vs non-algo), pre-trade controls, client classification (low / medium / high frequency), vendor-empanelled vs in-house algos, broker's responsibilities under the principal-agent model, and the audit-trail and OPS-threshold requirements.
---

import { Aside } from '@astrojs/starlight/components';

> **Why this page is structured this way:** The retail-algo framework is the most recent and most operationally consequential set of broker-side surveillance / control circulars. The page walks the SEBI Feb 2025 framework first, then the NSE operational chain (INVG/66524 → INVG/67858 → INVG/69255 → FAOP/69296), then the broker's approval flows at each exchange, then the algo classification (white-box vs black-box, OPS thresholds), then the tagged-order flow and audit-trail, then the principal-agent model and responsibilities, and finally the predecessor institutional algo framework for context.

## TL;DR

- SEBI's **Safer Participation of Retail Investors in Algorithmic Trading** framework was issued on **4 Feb 2025** ([SEBI/HO/MIRSD/MIRSD-PoD/P/CIR/2025/0000013](/broking-kyc/reference/circulars/sebi-mirsd/#sebihomirsdmirsd-podpcir20250000013)), originally effective **1 Aug 2025**, subsequently extended via SEBI Jul 2025 timeline extension circular.
- Implementation forwarded by NSE in a chain: **[NSE/INVG/66524](/broking-kyc/reference/circulars/nse/#nseinvg66524)** (Feb 5, 2025) → **[NSE/INVG/67858](/broking-kyc/reference/circulars/nse/#nseinvg67858)** (May 5, 2025) → **[NSE/INVG/69255](/broking-kyc/reference/circulars/nse/#nseinvg69255)** (Jul 22, 2025), with parallel pre-trade-controls hardening via **[NSE/FAOP/69296](/broking-kyc/reference/circulars/nse/#nsefaop69296)** (Aug 2025).
- **Principal-agent model:** Broker acts as **principal**, algo providers / fintechs act as **agents**. Broker is accountable for any algo-misuse via its APIs (per [NSE/INVG/67858](/broking-kyc/reference/circulars/nse/#nseinvg67858)).
- **Algo categorisation:** **white-box** (execution algos, deterministic logic) vs **black-box** (predictive / AI-driven, where logic is not fully transparent).
- **OPS threshold:** retail API access ≤ **10 orders per second**. Above this, the order flow is treated as algorithmic and must be registered with a unique algo-ID tagged to every order.
- **Pre-trade controls under [NSE/FAOP/69296](/broking-kyc/reference/circulars/nse/#nsefaop69296):** Algo Market Order pre-emptive cancellation introduced to prevent runaway market orders; NNF Terminal ID to Algo ID validation enforced.
- **Audit trail retention:** **5 years** per [NSE/INVG/67858](/broking-kyc/reference/circulars/nse/#nseinvg67858) — broker traces every algo-tagged order to its registered algo-ID and the API vendor.
- **Approval chain:** Algo providers register with their broker; brokers register their empanelled algo / vendor with NSE / BSE / MCX (per exchange); each segment / each algo / each broker requires its own approval.
- **Vendor-empanelled vs in-house algos:** Both paths exist; empanelled-vendor algos must be in the broker's registered list; in-house algos require broker-level Type-III system audit per [NSE/INSP/64438](/broking-kyc/reference/circulars/nse/) / [NSE/INSP/70900](/broking-kyc/reference/circulars/nse/).
- **Predecessor frameworks:** 2022–2024 institutional-algo framework provided the foundation (CTCL approval, NNF terminal IDs, Type-III audit cadence); 2025 retail framework is the extension to retail-API access.

## Conceptual overview

Until 2025, algorithmic trading in India was largely an institutional and prop-desk activity governed by NSE's CTCL approval framework, the Type-III system audit cadence for algo-capable members, and the [NSE/MSD/65933](/broking-kyc/reference/circulars/nse/) consolidated NNF circular. Retail clients accessed broker APIs for various legitimate purposes — portfolio tracking, basket order entry, occasional one-off trades — but the line between "retail using an API" and "retail running an algo" was fuzzy in practice. Some retail clients ran systematic strategies through broker APIs; some vendors offered subscription-based algo strategies to retail clients via broker integration; the resulting traffic was algorithmic in nature but had no specific oversight.

SEBI's Feb 2025 framework changed this. The principle: if a retail client's trade pattern is meaningfully algorithmic — measured by Order-Per-Second rate, by the presence of a third-party algo provider, or by other indicators — that pattern is governed by a registered algo-ID, a static-IP attribution, broker accountability, and a 5-year audit trail. The framework explicitly recognises that algos can be beneficial (better execution, systematic risk management, market-making) and explicitly seeks to avoid blanket prohibition. The framing — "safer participation" — captures the regulatory intent.

For brokers, the framework introduces several new operational obligations: a broker-side algo registry, algo-tagged order routing, pre-trade controls that catch runaway algo behaviour, an audit trail spanning broker, vendor, and client, and an accountability model that puts the broker first in line for any algo-related issue.

This page covers all of it. For the broader OMS architecture that hosts the algo flow, see [OMS internals deep-dive](/broking-kyc/deep-dives/trading-day/oms-internals/); for the surveillance overlay, see [Surveillance deep-dive](/broking-kyc/deep-dives/trading-day/surveillance-norms-gsm-asm/).

## 1. The SEBI Feb 2025 framework

### 1.1 Circular reference

[SEBI/HO/MIRSD/MIRSD-PoD/P/CIR/2025/0000013](/broking-kyc/reference/circulars/sebi-mirsd/#sebihomirsdmirsd-podpcir20250000013), issued **4 Feb 2025**, titled "Safer participation of retail investors in Algorithmic trading". Originally effective **1 Aug 2025**; extended via SEBI's July 2025 extension circular (effective implementation moved to later date per the extension; check the latest circular for current effective date).

### 1.2 Core constructs

| Construct | Description |
|---|---|
| Principal-agent model | Broker = principal; algo providers / fintechs = agents. Broker accountable for misuse via its APIs |
| Algo categorisation | Execution / white-box vs Black-box. White-box has fully transparent logic; black-box uses predictive / AI models |
| Static IP whitelisting | API access only from registered IP addresses |
| OPS (Orders-per-second) threshold | Default cap **10 orders/sec** for retail API access; above triggers algo classification |
| Algo-ID | Mandatory unique identifier for each algo strategy; tagged to every order originated from the algo |
| Exchange-approved server hosting | Algo servers must be hosted with exchange-approved hosting partners (typically the colo facility or specified data centres) |
| Audit trail | 5-year retention of every algo-tagged order with broker-vendor-client mapping |
| Broker due diligence | Broker must perform due diligence on every algo provider it empanels; document the diligence |

### 1.3 Why principal-agent

The principal-agent construct is significant. Earlier frameworks treated the algo provider as a separate regulated entity (e.g., an investment advisor or research analyst). The Feb 2025 framework explicitly positions the broker as principal — the broker is the responsible party for any misconduct involving its API, regardless of whether the misconduct was originated by the algo provider, the algo provider's coding error, or the retail client's misuse.

This concentration of responsibility on the broker is intentional: SEBI's enforcement reach is over registered brokers (clearer than over third-party algo providers, many of which may not be SEBI-registered intermediaries themselves). By making the broker accountable, SEBI ensures that someone in the chain has clear regulatory liability for algo-related events.

## 2. The NSE operational chain

NSE has issued a sequence of operational circulars implementing the SEBI framework.

### 2.1 [NSE/INVG/66524](/broking-kyc/reference/circulars/nse/#nseinvg66524) (Feb 5, 2025)

Forwards the SEBI Feb 4, 2025 circular to NSE members. Establishes the implementation date (originally 1 Aug 2025) and frames the obligations:

- Static IP for API access,
- OPS threshold of 10 orders per second,
- Mandatory algo-ID registration,
- Broker-API-vendor traceability for 5 years,
- Exchange-approved server hosting.

### 2.2 [NSE/INVG/67858](/broking-kyc/reference/circulars/nse/#nseinvg67858) (May 5, 2025)

Issues detailed implementation standards under para 7(a) of the SEBI circular. The annexure covers:

- **API Access Standards:** static IP whitelisting; OPS threshold; registration process,
- **Algo ID tagging:** every algo-originated order must carry the unique algo-ID; the OMS must reject orders without a valid algo-ID where one is required,
- **Broker due-diligence:** what the broker must check before empanelling a vendor or accepting an algo,
- **Audit trail:** format, retention period (5 years), what events to log, how to make the log accessible to inspection,
- **Exchange-approved server hosting:** which hosting providers are approved; how to register the broker's algo server with the exchange.

This circular is the operational backbone for the broker's compliance team.

### 2.3 [NSE/INVG/69255](/broking-kyc/reference/circulars/nse/#nseinvg69255) (Jul 22, 2025)

Detailed operational modalities for safer retail algorithmic trading following the prior two circulars. Specifies:

- **Algo categorisation:** white-box (execution algos with deterministic / disclosed logic) vs black-box (predictive / AI-driven where the logic is opaque to the broker / client). White-box has lighter approval; black-box requires deeper diligence.
- **OPS thresholds:** the 10 OPS default; provisions for higher thresholds where the algo is approved and the broker has additional controls.
- **Client-onboarding-with-algo questionnaire:** when a client signs up for an algo strategy, the broker must capture a specific disclosure questionnaire — client's understanding of the algo, risk tolerance, segment activations.
- **Audit-trail format:** specific column / event schema for the 5-year retention log.
- **Broker accountability framework:** the principal model is operationalised.
- **API-traceability rules:** every API endpoint must trace back to broker → API vendor → client through a documented chain.

### 2.4 [NSE/FAOP/69296](/broking-kyc/reference/circulars/nse/#nsefaop69296) (Aug 2025)

Strengthens pre-trade risk controls for algorithmic orders. Two key controls:

1. **Algo Market Order pre-emptive cancellation:** Introduced to prevent runaway market orders. The OMS / RMS must implement pre-trade controls to detect and cancel algorithmic market orders that match runaway patterns (high frequency, large notional, deep order book penetration).
2. **NNF Terminal ID to Algo ID validation:** Every order from an NNF terminal that is algo-flagged must have a valid Algo ID; the validation is enforced at the exchange edge.

Builds on the foundational consolidated NNF circular [NSE/FAOP/21794](/broking-kyc/reference/circulars/nse/) (Sep 28, 2012) on Decision Support Tools and Algorithms. Operates alongside [NSE/INVG/67858](/broking-kyc/reference/circulars/nse/#nseinvg67858).

## 3. Broker algo approval

The broker must obtain approval for each algo and each segment from each exchange before any algo orders can be routed.

### 3.1 At NSE

| Step | Description |
|---|---|
| Empanel the algo provider | Vendor due diligence (security review, financial soundness, prior incident record, technology architecture review). Vendor's algos are catalogued in the broker's algo registry |
| For each algo, register algo-ID with NSE | NSE assigns / approves the unique algo-ID; broker maintains an internal mapping (algo-ID → vendor → strategy description → broker contact owner) |
| Register the algo server | The broker (or the vendor, depending on the architecture) registers the physical server / hosting location with NSE — must be at an exchange-approved facility |
| Submit broker-level system audit | If the broker is Type-III (algo-capable), the broker submits the half-yearly system audit (per [NSE/INSP/64438](/broking-kyc/reference/circulars/nse/) and successors) |
| Submit broker-level cyber audit | Half-yearly cyber audit for Type-III brokers per the CSCRF and earlier framework circulars |
| Maintain audit trail | 5-year retention, accessible to NSE inspection on request |

### 3.2 At BSE

BSE has parallel approval processes via BEFS and the BSE Compliance / Inspection function. The approval scope mirrors NSE — vendor empanelment, algo-ID registration, server hosting, audit submissions. Specifics are in BSE's master member-scheme documents and the BSE Notices feed.

### 3.3 At MCX

MCX has a similar approval flow for the commodity segment via the MCX member portal and Inspection function. Commodity algos are typically a smaller scope than equity / F&O algos, but the approval framework is parallel.

### 3.4 Approval per segment

A vendor providing algos for both equity F&O and commodity must register separately at each exchange. A broker may empanel a single vendor for multiple segments but each segment-vendor-algo combination registers separately.

## 4. Algo categorisation

The Jul 2025 [NSE/INVG/69255](/broking-kyc/reference/circulars/nse/#nseinvg69255) introduces the operational categorisation.

### 4.1 White-box (execution algos)

White-box algos have **deterministic, transparent logic**. Examples:

- TWAP (Time-Weighted Average Price) — executes a parent order in time-sliced child orders,
- VWAP (Volume-Weighted Average Price) — executes proportional to historical volume profile,
- Iceberg / disclosed-quantity slicing,
- Smart order routing (SOR) that picks the best price across NSE / BSE,
- Mean-reversion strategies with documented entry / exit rules,
- Basket-trade execution with rebalance logic.

For white-box algos, the broker's due diligence is comparatively lighter — verify the logic, test in a paper-trading or test environment, register with the exchange, monitor for drift.

### 4.2 Black-box

Black-box algos use **predictive / AI-driven models** where the order-decision logic is not fully transparent. Examples:

- ML-driven momentum strategies,
- Deep-learning models predicting short-term price moves,
- Reinforcement learning agents adjusting strategy on market state,
- Any model where the broker cannot enumerate the decision rules.

For black-box algos, the broker's due diligence must be deeper:
- Backtest results across multiple market conditions,
- Stress-test results,
- Vendor's risk-management controls,
- Model-monitoring / drift-detection mechanisms,
- Documented governance over model updates.

Black-box algos may have lower OPS thresholds and tighter monitoring requirements at the broker level.

### 4.3 OPS thresholds

| Algo type | OPS threshold (default) | Notes |
|---|---|---|
| Retail API (no algo registered) | 10 orders / sec | Above this, the API access is treated as algo and must be registered |
| White-box approved algo | Configurable up to higher limits with approval | Subject to vendor + broker approval |
| Black-box approved algo | Typically lower than white-box default | Tighter controls due to opacity |

Above the OPS threshold, the order flow must carry algo-ID; orders without algo-ID are rejected at the broker / exchange edge.

## 5. Tagged-order flow

The framework introduces a **tagged-order flow** for algo orders. Every algo-originated order carries a set of tags that travel through the OMS / RMS / exchange edge:

| Tag | Description |
|---|---|
| Algo-ID | The unique exchange-registered algo-ID |
| API vendor ID | The empanelled vendor that generated the order (where applicable) |
| Broker terminal / NNF ID | The terminal / endpoint used |
| Client UCC | The client on whose behalf the algo is trading |
| Strategy ID (internal) | Vendor-side strategy identifier for the algo logic variant |
| Timestamp with microsecond precision | For audit-trail and reconstruction |

The tagging is enforced at the OMS edge — orders without the required tags are rejected. The audit-trail retention preserves these tags for 5 years.

### 5.1 Non-algo retail API orders

Retail clients placing orders via API at OPS < 10/sec are not algo orders by definition. These orders flow through the OMS without algo-ID tagging but carry the API-vendor / endpoint identifiers.

A retail client whose API usage drifts above 10 OPS is detected by the OPS counter; the broker must either:
- Throttle the client back below 10 OPS,
- Register the client's flow as algo (with algo-ID),
- Suspend the client's API access pending review.

### 5.2 Algo orders from dealer terminal

Dealer terminals (internal broker employees placing orders for clients via the broker's internal trading software) are not typically running algos. If a dealer is operating an algo (e.g., a SOR for institutional flow), the algo must be registered separately and the orders carry algo-ID even from the dealer terminal.

## 6. Client classification

The framework recognises different client engagement levels with algos. The broker should classify clients accordingly:

| Class | Description | Broker obligations |
|---|---|---|
| Low frequency | Clients placing occasional algo-flagged orders; OPS rare | Standard monitoring; standard risk controls |
| Medium frequency | Regular algo usage; multiple strategies | Enhanced surveillance; client-disclosure questionnaire on file |
| High frequency | Sustained high-OPS algo activity; multiple algos | Dedicated risk-management; tighter monitoring; possible separate margin treatment |

`[industry typical]` — the specific frequency thresholds are not in regulatory circulars; brokers self-define based on their risk appetite. The classification informs which clients get additional friction (more detailed disclosure questionnaires, periodic strategy reviews) and which get streamlined onboarding.

## 7. Broker's responsibilities under the principal model

A consolidated list of broker responsibilities under the principal model:

| Responsibility | Description |
|---|---|
| Empanel algo providers | Due diligence, security review, financial soundness, ongoing performance review |
| Register each algo with exchanges | One registration per algo per segment per exchange |
| Tag every algo-originated order | Algo-ID, vendor ID, terminal ID, timestamp |
| Enforce OPS thresholds | Pre-trade rate limiting, alerting, escalation |
| Maintain static IP whitelisting | Per-vendor / per-client IP records; reject unwhitelisted access |
| Conduct broker-level pre-trade controls | Algo Market Order pre-emptive cancellation, NNF-to-Algo ID validation |
| Maintain audit trail | 5-year retention of all tagged orders |
| Operate algo-aware surveillance | Detect runaway algos, ASM-for-spoofing patterns from algo-originated activity |
| Submit half-yearly Type-III system audit | If the broker is algo-capable |
| Comply with NSE / BSE / MCX algo circulars | Stay current as the framework evolves |
| Notify exchanges of any incident | Algo-misuse, security breach, vendor issue — within prescribed window |
| Train staff | Internal training on algo monitoring and incident response |
| Insurance / capital cushion | Higher exposure from algo-misuse; some brokers maintain higher capital buffer or specific algo-related insurance |

The accountability is real — penalty schedules per [NSE/INSP/53530](/broking-kyc/reference/circulars/nse/) apply to algo-related defaults, and serious algo incidents can trigger SEBI Section 11B action against the broker.

## 8. Vendor-empanelled algos vs in-house algos

### 8.1 Vendor-empanelled algos

The broker integrates third-party algo providers via API. Examples of operational flow:

1. The vendor approaches the broker with an algo strategy and the necessary technology to integrate.
2. The broker's compliance team conducts due diligence (vendor financials, security, prior incidents, technology architecture review).
3. The broker's technology team integrates the vendor's API into the broker's OMS through a defined integration spec.
4. The broker registers the algo-ID with the exchange.
5. The broker offers the algo to its clients (typically as a subscription or pay-per-use product).
6. Client orders generated by the vendor's algo flow through the broker's API into the broker's OMS with algo-ID tagging.
7. The broker conducts ongoing monitoring — performance, drift, incidents.

The vendor-empanelled path is the most common because retail brokers don't usually have the in-house expertise to build sophisticated algo strategies.

### 8.2 In-house algos

The broker builds and operates its own algos. This is typically for:

- Smart order routing (SOR) — choosing the best execution venue,
- VWAP / TWAP execution for institutional orders,
- Internal arbitrage between segments,
- Market-making on illiquid instruments.

For in-house algos, the broker is the algo provider — there's no separate empanelment, but the broker still must register each algo, undergo the Type-III system audit (per [NSE/INSP/64438](/broking-kyc/reference/circulars/nse/) / [NSE/INSP/70900](/broking-kyc/reference/circulars/nse/)), and maintain the audit trail.

### 8.3 Hybrid

Many brokers operate a hybrid: in-house SOR / execution algos, plus empanelled third-party strategies. The two paths share the same algo-ID registration and audit-trail framework but have different operational origins.

<Aside type="tip">
**Vendor empanelment is a compliance gate, not just a commercial deal.** Brokers approach empanelment from a sales / partnership lens — "this vendor's algos will attract more clients". The compliance perspective is different — "we are accountable for whatever this vendor does via our APIs". The diligence required is closer to onboarding a new business partner than signing a vendor contract: technology review, security audit, financial assessment, prior incident history, references. Brokers that skip this discipline find themselves on the regulatory hook when the vendor has an outage or a strategy-drift incident.
</Aside>

## 9. Audit trail

Per [NSE/INVG/67858](/broking-kyc/reference/circulars/nse/#nseinvg67858), the audit trail must capture every algo-tagged order with:

- Order origination timestamp (microsecond),
- Algo-ID,
- API vendor ID,
- Client UCC,
- Broker NNF / terminal / endpoint,
- Order parameters (price, quantity, side, type),
- Pre-trade-check outcomes,
- Order release timestamp,
- Exchange acknowledgement timestamp,
- Trade match / fill timestamp,
- Any modifications / cancellations with timestamps,
- Final state.

Retention: **5 years** minimum from the order date. Format: must be readable / processable for inspection access — typically a structured log file plus a database-backed query interface.

### 9.1 Accessing the audit trail in an inspection

NSE Inspection or SEBI may request audit-trail extracts for specific algos, clients, or time windows. The broker must produce the requested data in the format and within the timeframe specified. Failure to produce a clean audit trail triggers an inspection finding and possible disciplinary action.

### 9.2 Tamper-resistance

The audit trail must be tamper-resistant in spirit — change-control on the underlying storage, hash-chained log entries, periodic backups to off-site / immutable storage. The specific technical requirements are not prescribed; brokers implement to industry best practice (write-once storage, signed log streams, separated access privileges).

## 10. Predecessor frameworks (institutional algo, 2022–2024)

The retail algo framework builds on a longer institutional algo framework.

### 10.1 CTCL approval for trading software

NSE's CTCL framework (Computer-to-Computer Link) — see [OMS internals deep-dive section 5](/broking-kyc/deep-dives/trading-day/oms-internals/) — has long required approval for any non-NEAT trading software, with additional requirements for algo-capable software. Master consolidated reference: [NSE/MSD/65933](/broking-kyc/reference/circulars/nse/) (53 pages covering NNF, CTCL, IBT / STWT, DMA, Smart Order Routing, Algorithmic Trading, NNF surrender, etc.).

### 10.2 Type-III system audit

Algo-capable trading members are classified as Type-III for system audit purposes. Type-III members undergo half-yearly audits (rather than annual for Type-I / II). Empanelment per [NSE/INSP/69631](/broking-kyc/reference/circulars/nse/) (Aug 2025); current cycle [NSE/INSP/64438](/broking-kyc/reference/circulars/nse/) / [NSE/INSP/70900](/broking-kyc/reference/circulars/nse/).

The Type-III audit covers:
- Algo architecture review,
- Pre-trade controls implementation,
- Risk-management framework,
- Disaster recovery,
- Change management for algo software,
- Drift / approved-config validation.

### 10.3 OTR framework (Jun 2020)

[NSE/SURV/45016](/broking-kyc/reference/circulars/nse/#nsesurv45016) operationalised SEBI's OTR framework for algo orders. OTR ≥ 2000 on three occasions in rolling 30 days triggers 15-minute cooling-off the next day. This applies to algo orders' contribution to member-level OTR.

### 10.4 NNF Terminal IDs

NNF (Neat Now Final) is NSE's family of trading software variants. Each terminal is registered with an NNF ID. Algo orders must originate from an NNF-registered terminal, with the terminal-to-algo-ID mapping validated at the exchange edge per [NSE/FAOP/69296](/broking-kyc/reference/circulars/nse/#nsefaop69296).

### 10.5 Surveillance dashboard for algos

[NSE/SURV/44477](/broking-kyc/reference/circulars/nse/) introduced the member surveillance dashboard for tracking algo behaviour (spoofing patterns, order-book noise, OBSM-PNC). Quarterly TM reporting per [NSE/SURV/48818](/broking-kyc/reference/circulars/nse/) is the cadence.

The retail algo framework layered onto this foundation; the OPS threshold, algo-ID tagging, principal-agent model, and 5-year audit trail are the retail-specific additions.

## 11. Implementation timeline and extensions

| Date | Event |
|---|---|
| 4 Feb 2025 | SEBI issues [SEBI/HO/MIRSD/MIRSD-PoD/P/CIR/2025/0000013](/broking-kyc/reference/circulars/sebi-mirsd/#sebihomirsdmirsd-podpcir20250000013) (original effective 1 Aug 2025) |
| 5 Feb 2025 | NSE forwards via [NSE/INVG/66524](/broking-kyc/reference/circulars/nse/#nseinvg66524) |
| 5 May 2025 | NSE issues implementation standards [NSE/INVG/67858](/broking-kyc/reference/circulars/nse/#nseinvg67858) |
| Jul 2025 | SEBI extends effective date via SEBI/HO/MIRSD/.../2025/108 (extension circular) |
| 22 Jul 2025 | NSE issues operational modalities [NSE/INVG/69255](/broking-kyc/reference/circulars/nse/#nseinvg69255) |
| Aug 2025 | NSE issues pre-trade-controls hardening [NSE/FAOP/69296](/broking-kyc/reference/circulars/nse/#nsefaop69296) |
| Ongoing | Periodic clarifications and updates expected |

Brokers should monitor the SEBI / NSE feeds for ongoing implementation updates.

## 12. The retail-client onboarding-with-algo questionnaire

Per [NSE/INVG/69255](/broking-kyc/reference/circulars/nse/#nseinvg69255), a specific client questionnaire must be captured when a retail client subscribes to or activates an algo strategy:

- Disclosure of the algo strategy in plain language,
- Risk profile of the algo (volatility expectations, drawdown history if available),
- Client's understanding of the algo's logic (white-box) or limitations (black-box),
- Client's segment activations (the algo must be permitted only in segments the client is activated for),
- Client acknowledgement of the algo's risk and the client's right to disengage at any time,
- Client's agreement on data-sharing with the algo vendor,
- Specific risks of black-box algos (where applicable).

The questionnaire is signed (typically e-Signed) and retained as part of the client master.

## 13. Surveillance overlay on algo flow

The broker's institutional-mechanism surveillance (per Chapter IVA, [SEBI/HO/MIRSD/MIRSD-PoD-1/P/CIR/2024/96](/broking-kyc/reference/circulars/sebi-mirsd/#sebihomirsdmirsd-pod-1pcir202496)) extends to algo-originated flow:

- **Spoofing / layering** detection at the algo level — most algos don't intentionally spoof, but a poorly-coded execution algo can mimic spoofing patterns,
- **OBSM-PNC** monitoring — algos generating high order-modification rates contribute to OBSM-PNC,
- **OTR breach** monitoring — algo orders can drive a member's OTR above 2000,
- **Runaway algo detection** — pre-trade controls + post-trade surveillance for orders with unusual scale or rapidity,
- **Drift detection** — comparing live algo behaviour against approved / backtested behaviour; deviation triggers vendor review.

The surveillance team typically has a dedicated algo-monitoring desk for high-OPS clients.

<Aside type="caution">
**The principal-agent model concentrates accountability on the broker for issues outside the broker's direct technical control.** If a vendor's algo malfunctions and produces 10,000 mispriced orders in a minute, the broker is accountable to the exchange and SEBI — even if the broker didn't write the algo. The framework expects the broker to detect and mitigate (via OPS limits, market-order pre-emptive cancellation, runaway-algo surveillance) and to provide a clean audit trail. Brokers offering algo flow without robust real-time monitoring and clear vendor agreements may find themselves bearing material regulatory cost when an incident occurs.
</Aside>

## Sub-cases / edge cases

- **Approved-but-superseded algos.** When a vendor updates an approved algo (new version, new logic), the broker must re-register; the prior version's algo-ID may continue for the audit-trail of historical trades but new orders must use the updated version.
- **Algos placing block-deal orders.** Algo flow can place block-deal orders within the dedicated windows (per [block / bulk deals deep dive](/broking-kyc/deep-dives/trading-day/block-bulk-deals/)). The algo-ID and tag still apply; surveillance for block-deal-adjacent front-running applies.
- **Algos placing AMOs.** Algo orders captured as AMOs (after-market) follow the standard AMO release flow at pre-open. Algo-ID and tag carry through.
- **Cross-exchange algo flow.** A single algo strategy can place orders simultaneously on NSE and BSE. Each exchange requires its own algo-ID registration; the broker manages the cross-exchange flow.
- **Algos in T+0 segment.** T+0 expansion (top 500 scrips per [SEBI/HO/MRD/POD-3/P/CIR/2024/172](/broking-kyc/reference/circulars/sebi-other/#sebihomrdpod-3pcir2024172)) is a separate session; algo orders for T+0 must be tagged for T+0 settlement.
- **Algos and MTF.** MTF positions (broker-funded purchases) can be exited via algo orders if the broker permits; the algo flow respects the MTF settlement rules.
- **Algos handling NRI flow.** Post Sep 2025 CP-code removal ([SEBI/HO/MIRSD/MIRSD-PoD/P/CIR/2025/109](/broking-kyc/reference/circulars/sebi-mirsd/#sebihomirsdmirsd-podpcir2025109)), NRI algo flow routes direct broker-side without CP-code intermediation. NRI segment / PIS restrictions still apply.
- **Algos on commodity segment.** MCX commodity algos have their own registration path via MCX Inspection; the SEBI framework applies but MCX operational paths differ from NSE.
- **Algos on SLB segment.** SLB transactions can be algorithm-driven; SLBS framework (per [NCL/CMPT/61810](/broking-kyc/reference/circulars/clearing-corps/) / [NCL/CMPT/67763](/broking-kyc/reference/circulars/clearing-corps/)) interacts with the algo framework.
- **Algos and pension / mutual-fund clients.** Institutional algo flow (mutual funds executing baskets via VWAP) is governed by the broader institutional algo framework rather than the retail framework; the algo-ID tagging and approval still apply.
- **Algo-related grievances.** Client grievances about algo strategy performance flow through the broker's grievance mechanism (SCORES, broker-internal). The broker may be required to demonstrate the algo behaved within approved parameters.

## Practical notes

- **[gotcha]** The 10 OPS threshold is a *member-level* default but can be *client-level* tightened. A broker may set 5 OPS for retail API to reduce algo classification noise — clients trading higher must register their algo formally. This is a soft control above the regulatory minimum.
- **[industry practice]** Most retail brokers offering algo flow distinguish "algo subscription" (vendor-provided strategy, broker hosts integration) from "API trading" (client builds their own algo using broker's API). The former is more vendor-managed; the latter requires the client to register their own algo-ID with the broker. Both flows must follow the same audit-trail and tagging requirements.
- **[cost optimization]** Building an in-house algo registry, tagging system, and audit trail is non-trivial — 6-12 months of engineering work for a credible production system. Brokers that don't want this overhead can offer non-algo API access (capped at 10 OPS, no algo-ID required) and route algo demand to vendor-managed platforms.
- **[risk trade-off]** Black-box algos generate more regulatory scrutiny but may offer better client outcomes (if the model is good). White-box algos are easier to approve and monitor but limited by the explicit strategies the broker can articulate. The mix at a broker reflects the broker's risk appetite and technology depth.
- **[industry practice]** The 5-year audit trail retention is a *floor*; many brokers retain 7–10 years to align with broader regulatory retention norms (SEBI 10-year retention for records under [AML domain](/broking-kyc/operations/compliance-blueprint/#aml--pmla--sanctions-25-entries) row AML-014).
- **[gotcha]** Static-IP whitelisting can be operationally fragile — IP addresses change (vendor migrates to a new cloud region, ISP renumbers, etc.). The broker's onboarding workflow must include an IP-update mechanism that's faster than the original empanelment process.
- **[industry practice]** Real-time monitoring of algo behaviour — per-algo P&L, drawdown, OPS, order-modification rate — should be visible to both the broker's surveillance team and the algo vendor. This shared visibility helps detect drift or anomaly quickly. Many brokers offer a vendor portal for this.
- **[cost optimization]** OPS thresholds and rate limits should be implemented at multiple layers — at the API gateway (early reject), at the OMS (margin-and-control), and at the FIX engine (final cap). Multi-layer enforcement is robust against single-point failures.
- **[risk trade-off]** Allowing black-box algos at lower OPS thresholds reduces the throughput at which a malfunction can cause damage but limits the strategy's effectiveness. Brokers tune the balance per their risk appetite and the specific algo's profile.

## Cross-references

- [Integration DAG: Trading hours](/broking-kyc/operations/integration-dag/trading-hours/) — algo-tagged order pre-trade pipeline.
- [Broker Process Narrative](/broking-kyc/broker-process/narrative/) — Section 2 mentions algo flow briefly in narrative.
- [Compliance Blueprint — Surveillance domain](/broking-kyc/operations/compliance-blueprint/) — algo-related rows including SURVEILLANCE-024 (algo static-IP and algo-ID controls).
- [Compliance Blueprint — Cyber security domain](/broking-kyc/operations/compliance-blueprint/) — CYBER-024 broker APIs with OAuth/JWT, rate limiting and WAF.
- [Deep Dive: OMS internals](/broking-kyc/deep-dives/trading-day/oms-internals/) — sibling page on the OMS architecture that hosts algo flow.
- [Deep Dive: SPAN methodology](/broking-kyc/deep-dives/trading-day/rms-span-methodology/) — sibling page on margin computation for algo positions.
- [Deep Dive: Surveillance, GSM, ASM](/broking-kyc/deep-dives/trading-day/surveillance-norms-gsm-asm/) — sibling page on the surveillance overlay including OTR, OBSM-PNC.
- [Deep Dive: Block / bulk deals](/broking-kyc/deep-dives/trading-day/block-bulk-deals/) — sibling page on the block-deal window's interaction with algo flow.
- [Deep Dive: Short-delivery auction](/broking-kyc/deep-dives/trading-day/short-delivery-auction/) — sibling page on settlement consequences.
- [SEBI MIRSD circulars](/broking-kyc/reference/circulars/sebi-mirsd/) — including [SEBI/HO/MIRSD/MIRSD-PoD/P/CIR/2025/0000013](/broking-kyc/reference/circulars/sebi-mirsd/#sebihomirsdmirsd-podpcir20250000013).
- [NSE circulars — INVG and FAOP families](/broking-kyc/reference/circulars/nse/) — including [NSE/INVG/66524](/broking-kyc/reference/circulars/nse/#nseinvg66524), [NSE/INVG/67858](/broking-kyc/reference/circulars/nse/#nseinvg67858), [NSE/INVG/69255](/broking-kyc/reference/circulars/nse/#nseinvg69255), [NSE/FAOP/69296](/broking-kyc/reference/circulars/nse/#nsefaop69296).
- [Vendor Atlas — Algo Trading and Strategy Marketplaces](/broking-kyc/vendors/atlas/) — vendor landscape for algo providers (subject to ongoing registration evolution).

## Verified through

2026-05-14

---

*AI-generated and not legal, financial, or compliance advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*

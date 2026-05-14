---
title: "Deep Dive: RMS SPAN Methodology and Peak Margin"
description: Reference-heavy walkthrough of the SPAN (Standard Portfolio ANalysis of Risk) margin methodology used by NSCCL, ICCL, and MCXCCL — the 16 scenario grid, scanrange components, ELM, exposure margin, additional margin, MTM, cross-margin offsets, peak-margin snapshots, DMF row generation, and the shortfall-penalty grids per clearing-corp circulars.
---

import { Aside } from '@astrojs/starlight/components';

> **Why this page is structured this way:** SPAN is the operational backbone of derivatives risk management in India. To work with it day-to-day, an operator must hold three things in head: the *components* of the margin (SPAN + ELM + exposure + additional + delivery), the *mechanism* (the 16-scenario grid that produces SPAN), and the *evidence trail* (MG-12 / MG-13 / MG-18 files plus the four peak-margin snapshots that build the DMF). The page is structured component-first, then scenario-mechanism, then the daily file flow, then worked examples per segment.

## TL;DR

- **SPAN** (Standard Portfolio ANalysis of Risk) is a scenario-based VaR margin computed by the **clearing corporation** (NSCCL / ICCL / MCXCCL), not the exchange. The broker consumes the daily SPAN parameter file and uses it to compute per-client and per-portfolio margin in real time.
- The SPAN scenario grid generates **16 scenarios** by combining 8 futures-price moves with 2 volatility moves. The worst-case loss across the 16 scenarios is the **scanrange-driven SPAN margin** before short-option / inter-month / inter-commodity adjustments.
- Total upfront margin in derivatives = **SPAN + ELM (Extreme Loss Margin)**, with additional margin layers (delivery, tender, special, surveillance, event-driven) added contextually. CM-segment upfront margin = **VaR + ELM** (per [SEBI/HO/MRD2/DCAP/CIR/P/2020/127](/broking-kyc/reference/circulars/sebi-other/#sebi-ho-mrd2-dcap-cir-p-2020-127)).
- The clearing corp captures **four random intraday peak-margin snapshots** during 11:00–11:30, 12:30–13:00, 13:30–14:00, 14:30–15:00 (per [NCL/CMPT/45516](/broking-kyc/reference/circulars/clearing-corps/#ncl-cmpt-45516), [NCL/CMPL/44977](/broking-kyc/reference/circulars/clearing-corps/#ncl-cmpl-44977)). The **peak-margin requirement** for the day = max of the four snapshots; the DMF rows reflect this.
- Margin shortfall penalty grid (per [NSE/INSP/64315](/broking-kyc/reference/circulars/nse/#nse-insp-64315)): **0.5% for shortfall < ₹1 lakh AND < 10% of applicable margin; 1.0% otherwise**, with a max-of-four reconciliation (CM-level, Client-level, Intra-day, EOD).
- Cross-margin offsets reduce required margin on correlated positions: **25% same-expiry / 35% different-expiry** for index-constituent pairs; **30% same-expiry / 40% different-expiry** for correlated-index pairs (per [NCL/CMPT/62978](/broking-kyc/reference/circulars/clearing-corps/) effective Jul 29, 2024).
- Worked examples below cover **equity** (Reliance buy with VaR+ELM), **F&O** (Nifty futures + Nifty option spread with SPAN scenario grid), **CD** (USDINR futures), and **COM** (Crude Oil futures with MCXCCL VSR and ELM 1.25%).

## Conceptual overview

Margin in Indian derivatives is built in layers. The base layer is **SPAN initial margin** — the clearing corp's computed worst-case one-day loss on the client's portfolio, derived by running each position through a grid of price-and-volatility scenarios and picking the most adverse outcome. On top of SPAN sits **ELM (Extreme Loss Margin)** — a buffer for tail events the scenario grid doesn't capture, typically a flat percentage of the contract value. On top of that, segment-specific and event-driven additional margins: delivery and tender margins on physical-settled contracts approaching expiry; special margins during high-volatility regimes; surveillance margins (ASM-for-spoofing, additional margin on flagged members); and the cash segment's exposure margin where applicable. The sum, computed continuously and snapshotted at four random intraday windows, is the broker's daily margin obligation against the clearing corp.

The framework is SEBI's, the methodology is SPAN (originally developed by the Chicago Mercantile Exchange in 1988 and licensed to clearing corps worldwide), and the operational implementation is the clearing corps'. The broker consumes the parameter file daily, runs SPAN locally to validate orders pre-trade, and reconciles its computation against the clearing corp's authoritative computation through the daily margin files MG-12 (client margin), MG-13 (segment margin), and MG-18 (client collateral).

This page covers the margin computation in detail. For the broader operational flow (when files arrive, when snapshots happen, what penalty applies for shortfall), see also the [trading-hours integration DAG](/broking-kyc/operations/integration-dag/trading-hours/) and the [Margin compliance section of the Compliance Blueprint](/broking-kyc/operations/compliance-blueprint/#margin-compliance-30-entries).

## 1. SPAN — the 16-scenario grid

SPAN computes margin by simulating the portfolio's value under a grid of stress scenarios. The Indian implementation uses **16 scenarios**, generated from the cross of two factors:

- **Futures price scan range** — 8 discrete price moves: 0, ±1/3, ±2/3, ±1 of the futures scan range (FSR). For options, +2 additional scenarios at ±2 × FSR with a weighted impact (35% weight) capture extreme-tail behaviour.
- **Volatility scan range** — 2 discrete volatility moves: +VSR and -VSR (applied to options only; futures are not volatility-sensitive in the scenario grid).

Combining the 8 price moves with the 2 vol moves, with weighting, generates the 16 scenarios. For each scenario, SPAN re-prices every position in the portfolio (futures linearly, options via the option model with the moved underlying and moved vol) and sums to a portfolio value. The **scenario loss** for each scenario is `current portfolio value - scenario portfolio value`.

The **scanrange-driven SPAN initial margin** is the **maximum scenario loss** across the 16 scenarios.

### 1.1 The scenario grid in detail

| Scenario | Underlying move | Volatility move | Weight |
|---|---|---|---|
| 1 | 0 | +VSR | 100% |
| 2 | 0 | -VSR | 100% |
| 3 | +FSR/3 | +VSR | 100% |
| 4 | +FSR/3 | -VSR | 100% |
| 5 | -FSR/3 | +VSR | 100% |
| 6 | -FSR/3 | -VSR | 100% |
| 7 | +2×FSR/3 | +VSR | 100% |
| 8 | +2×FSR/3 | -VSR | 100% |
| 9 | -2×FSR/3 | +VSR | 100% |
| 10 | -2×FSR/3 | -VSR | 100% |
| 11 | +FSR | +VSR | 100% |
| 12 | +FSR | -VSR | 100% |
| 13 | -FSR | +VSR | 100% |
| 14 | -FSR | -VSR | 100% |
| 15 | +2×FSR | 0 (no vol move) | 35% |
| 16 | -2×FSR | 0 (no vol move) | 35% |

The **2×FSR scenarios (15 and 16)** carry 35% weight because they represent extreme tail-end moves where vol-shift is dominated by directional move; weighting them at 100% would over-margin most portfolios.

### 1.2 Scanrange parameters

| Parameter | Notation | Source | Typical magnitude |
|---|---|---|---|
| Futures price scan range | FSR or PSR | Clearing-corp risk-parameter file (daily, BOD; periodically intraday) | 3–6% of underlying for liquid indices; up to 10–15% for individual stock futures with higher VaR |
| Volatility scan range | VSR | Clearing-corp risk-parameter file (daily); reviewed periodically | Typically 4–6% for liquid index options; segment / commodity-specific |
| Short option minimum charge | SOMC | Risk-parameter file | Floor for deep-out-of-the-money short option positions; per-lot value |
| Inter-month spread charge | IMSC | Risk-parameter file | Charge for offsetting positions in different expiries |
| Inter-commodity spread credit | ICSC | Risk-parameter file | Margin credit for offsetting positions across correlated commodities |

Scan ranges are reviewed periodically by the clearing corps. MCXCCL publishes commodity VSR revisions via circulars like [MCXCCL/RISK/184/2025](/broking-kyc/reference/circulars/clearing-corps/#mcxccl-risk-184-2025); current values are: Copper 5, Crude Oil 33, Gold 4, Natural Gas 6, Silver 6, Zinc 6, with Volatility Options VSR 20% on Crude Oil.

The futures price scan range (FSR) is typically expressed as a multiple of one-day VaR over the **Margin Period of Risk (MPOR)** — usually two days for liquid contracts. NSCCL's SPAN parameter file naming `nsccl.<YYYYMMDD>.s.spn.gz` carries the day's scan ranges and the full scenario grid spec ([NCL/CMPT/44391](/broking-kyc/reference/circulars/clearing-corps/#ncl-cmpt-44391) introduced the May–June 2020 revised framework parallel-file structure).

### 1.3 Short option minimum

For deep-out-of-the-money short option positions, the scenario grid may under-estimate risk (because at far-OTM prices, the scenario moves don't push the option into the money). To correct this, SPAN imposes a **short option minimum charge** — a floor margin per short option lot. The applicable charge is `max(scenario-loss, SOMC × number of short option lots)`.

### 1.4 Inter-month and inter-commodity offsets

SPAN allows the broker to net offsetting positions:

- **Inter-month** — long futures in one expiry against short futures in another expiry of the same underlying. The spread is less risky than two independent positions; SPAN charges only an **inter-month spread charge (IMSC)** for the net spread quantity.
- **Inter-commodity** — long futures in one commodity against short futures in a correlated commodity (e.g., Brent crude long against WTI crude short). SPAN credits part of the offsetting position via an **inter-commodity spread credit (ICSC)**.

Both adjustments are made to the scanrange-driven scenario loss after the worst-case scenario is identified.

### 1.5 The final SPAN initial margin

The final SPAN margin formula:

```
SPAN_IM = max(scenario_loss_i across 16 scenarios)
         + max(0, SOMC × short_option_lots - scenario_loss)
         + IMSC × spread_quantity
         - ICSC × inter_commodity_credit
```

A simplified statement: **SPAN initial margin = the worst-case scenario loss, floored by the short-option minimum, plus inter-month spread charges, less inter-commodity credits.**

## 2. ELM — Extreme Loss Margin

**ELM** is a flat-percentage buffer on top of SPAN, calibrated to capture tail risks that the scenario grid doesn't cover (extreme moves beyond ±2×FSR; non-Gaussian return distributions; structural breaks). ELM is segment- and instrument-specific.

| Segment | ELM range (indicative) | Spec source |
|---|---|---|
| NSE F&O — index futures and options | 2–3% of contract value | [NCL/CMPT/61801](/broking-kyc/reference/circulars/clearing-corps/#ncl-cmpt-61801) F&O master; ELM file `ael_<DDMMYYYY>.csv` |
| NSE F&O — stock futures | 3–5% of contract value | Same source |
| NSE F&O — stock options | 3–5% of contract value | Same source |
| Currency derivatives (NSE / BSE) | ~1% | NSCCL / ICCL CD-specific |
| MCX commodity — base metals | 1–1.25% of contract value | MCXCCL master |
| MCX commodity — bullion | 1–1.25% | Same |
| MCX commodity — Crude Oil short | 1.25% (per [MCXCCL/RISK/184/2025](/broking-kyc/reference/circulars/clearing-corps/#mcxccl-risk-184-2025)) | MCXCCL risk circulars |
| Cash segment | Part of VaR + ELM upfront margin per [SEBI/HO/MRD2/DCAP/CIR/P/2020/127](/broking-kyc/reference/circulars/sebi-other/#sebi-ho-mrd2-dcap-cir-p-2020-127) | Daily ELM ratio file |

ELM is computed as **ELM_value = ELM_ratio × contract_value**. The daily ELM ratio file is published by the clearing corp at BOD and applied for the entire day.

For the cash segment specifically, **VaR + ELM** (per the 20 Jul 2020 SEBI margin circular) is the upfront margin requirement, with the 20% flat alternative permitted under [NSE/INSP/45565](/broking-kyc/reference/circulars/nse/#nse-insp-45565). The clearing corp continues to collect margin on a VaR+ELM basis from the trading member; the broker can collect 20% upfront from the client to simplify.

## 3. Exposure margin (CM only, pre-revised framework)

Exposure margin was a separate margin layer on top of VaR in the cash segment, reflecting concentrated-position risk and category-of-stock risk. With the **SEBI Sep-2020 / Mar-2020 revised margin framework** ([SEBI/HO/MRD2/DCAP/CIR/P/2020/127](/broking-kyc/reference/circulars/sebi-other/#sebi-ho-mrd2-dcap-cir-p-2020-127)), exposure margin was largely subsumed into the SPAN+ELM construct for derivatives and the VaR+ELM construct for cash. Some legacy references to "exposure margin" persist in member files and CC obligations, but conceptually it has been folded into the upfront-margin layer for current operations.

## 4. Additional / event-driven margins

Beyond SPAN+ELM, the clearing corp may impose additional margin layers for specific events or surveillance triggers:

| Margin layer | Trigger | Magnitude | Spec |
|---|---|---|---|
| Delivery margin | F&O contract enters delivery period (last 3 days for physical-settled stock derivatives) | Higher of 3% + 5-day 99% VaR of spot, or 25% — capped | [NCL/CMPT/61801](/broking-kyc/reference/circulars/clearing-corps/#ncl-cmpt-61801) |
| Tender-period margin | Commodity contract enters tender window | 5% additional on outstanding positions (compulsory-delivery contracts) | MCXCCL/C&S/058/2025 |
| Special margin | High-volatility regime, structural event | CC-imposed percentage (event-driven) | Circular-by-circular |
| Surveillance margin (ASM-for-spoofing) | Member flagged for order-spoofing | 5% Additional Surveillance Margin on all open positions | [NSE/SURV/41107](/broking-kyc/reference/circulars/nse/#nse-surv-41107), [NSE/SURV/57315](/broking-kyc/reference/circulars/nse/#nse-surv-57315) |
| Order-spoofing additional margin (SEBI Aug 2025) | Surveillance pattern-detection identifies spoofing | 5% on flagged-segment open positions | [NSE/SURV/74008](/broking-kyc/reference/circulars/nse/#nse-surv-74008) |
| Concentration margin | Member exposure exceeds CC threshold | CC-defined uplift | [NCL/CMPT/61800](/broking-kyc/reference/circulars/clearing-corps/#ncl-cmpt-61800) |
| Concentration on collateral | Single-security non-cash collateral > 25% of total non-cash | Higher haircut | ICCL 20240710-11 |

These margins are layered on top of SPAN+ELM and contribute to the per-client margin requirement reported in MG-12 / MG-13.

## 5. MTM — Mark-to-Market

**MTM** is the daily revaluation of open positions against the day's closing price. For each derivative contract held overnight, the MTM is the change in mark-to-market value from the prior settlement price to the current settlement price.

- **F&O MTM** — settled in cash the next morning's pay-in (T+1). The MTM amount is debited from / credited to the client's ledger and the broker's clearing settlement; positions are marked at the new settlement price for the next day's risk computation.
- **CD MTM** — same as F&O.
- **Commodity MTM** — settled per MCXCCL/MCX timelines; daily MTM is computed against the contract's settlement price.

MTM forms part of the daily obligation report exported by the clearing corp to members ([NCL/CMPT/61800](/broking-kyc/reference/circulars/clearing-corps/#ncl-cmpt-61800), [NCL/CMPT/61801](/broking-kyc/reference/circulars/clearing-corps/#ncl-cmpt-61801)). MTM losses unmet by next-morning pay-in are a default event; the clearing corp may invoke collateral to cover the shortfall.

The **Crystallised Margin Obligation** — the day's crystallised gain or loss across open positions — is reported in the MG-12 file under the `CnsltdCrstllsdOblgtnMrg` column, introduced via [NCL/CMPT/56502](/broking-kyc/reference/circulars/clearing-corps/#ncl-cmpt-56502) in April 2023.

## 6. Portfolio margin, hedge benefit, cross-margin

SPAN's portfolio approach allows offsetting positions to consume less than the sum of independent margins. Three layers of offsetting:

### 6.1 Within an underlying (inter-month spreads)

Long October Nifty future + Short November Nifty future is an inter-month spread. SPAN charges the **IMSC** rather than the full margin for each leg.

### 6.2 Across correlated underlyings (inter-commodity / inter-index)

Eligible cross-margin pairs are listed in the clearing-corp framework. Per [NCL/CMPT/62978](/broking-kyc/reference/circulars/clearing-corps/) (effective Jul 29, 2024), eligibility requires:
- Correlation > 0.90 over a 6-month rolling window,
- 80% constituent overlap weighted by free-float (for index-constituent pairs).

Cross-margin spread percentages:

| Pair type | Same-expiry spread margin | Different-expiry spread margin |
|---|---|---|
| Index – Constituent | 25% | 35% |
| Correlated Index pair | 30% | 40% |

Institutional positions in the CM segment are considered for cross-margin only after **T+1 custodian confirmation**.

### 6.3 Hedge benefit on options

A long-and-short option pair on the same underlying / same expiry (a spread) consumes less margin than the sum of independent margins because the scenario-grid loss on one leg is partially offset by the gain on the other. SPAN's scenario-by-scenario portfolio re-pricing captures this benefit automatically.

A common worked example: a Bull Call Spread (long ATM call + short OTM call, same expiry) has near-zero margin in the SPAN computation because the long leg's loss in any scenario is offset by the short leg's gain in the same scenario. The SOMC may dominate; the floor is the short-option-minimum on the short leg.

## 7. Intraday peak-margin snapshots and the DMF

The clearing corp captures **four random intraday peak-margin snapshots** during pre-defined windows:

| Snapshot | Window | Operationally typical clock |
|---|---|---|
| Snap 1 | 11:00–11:30 | ~11:30 |
| Snap 2 | 12:30–13:00 | ~12:30 |
| Snap 3 | 13:30–14:00 | ~13:30 |
| Snap 4 | 14:30–15:00 | ~14:30 |

Per [NCL/CMPT/45516](/broking-kyc/reference/circulars/clearing-corps/#ncl-cmpt-45516) and [NCL/CMPL/44977](/broking-kyc/reference/circulars/clearing-corps/#ncl-cmpl-44977), the snapshot time within each window is random (the broker doesn't know exactly when within the window it will fire), forcing the broker's RMS to keep client margin position stable across the full window rather than gaming a known clock.

At each snapshot, the broker's RMS produces a per-client margin state — required margin, available collateral, shortfall (if any). This becomes a **DMF row** for that snapshot. At EOD, the broker aggregates the snapshot rows plus the EOD state into the **Daily Margin File** (MG-12 client-level, MG-13 segment-level, MG-18 client-collateral) and submits via SFTP to the clearing corp.

The clearing corp issues a **peak-margin response file** the same evening, indicating whether the broker's submission reconciles to the clearing corp's own computation. Mismatches are flagged. Shortfalls at any snapshot, EOD-CM-level, or EOD-Client-level trigger penalty per the grid in section 9 below.

### 7.1 Files involved

| File | Source | Frequency | Content |
|---|---|---|---|
| `nsccl.<YYYYMMDD>.s.spn.gz` | NSCCL | Daily BOD (and parallel during framework transitions) | SPAN parameter file with scan ranges and scenario grid |
| `ael_<DDMMYYYY>.csv` | NSCCL | Daily BOD | ELM ratios per instrument |
| `NSE_FO_MG12_<member>_DDMMYYYY.csv.gz` | NSCCL | Daily EOD | Client-margin (MG-12) file |
| `NSE_FO_MG13_<member>_DDMMYYYY.csv.gz` | NSCCL | Daily EOD | Segment-margin (MG-13) file |
| `NSE_FO_MG18_<member>_DDMMYYYY.csv.gz` | NSCCL | Daily EOD | Client-collateral (MG-18) file |
| `NCL_FO_AMGCM_<memcode>_DDMMYYYY.csv.gz` | NSCCL | Daily EOD | Client-wise EOD-parameter margin (CM-level), added Apr 2023 per [NCL/CMPT/56502](/broking-kyc/reference/circulars/clearing-corps/#ncl-cmpt-56502) |
| `NCL_FO_AMGTM_<memcode>_DDMMYYYY.csv.gz` | NSCCL | Daily EOD | TM-level equivalent of AMGCM |
| `SA01–SA06` files | NSCCL | Daily, snapshot-tied | Short-allocation reports at peak-margin snapshots and EOD |
| `INTRASAR` file | NSCCL | Daily | Intraday short-allocation report with reason codes |
| ICCL/MCXCCL equivalents | ICCL / MCXCCL | Daily | Same structure with file-format naming differences |

### 7.2 MG-12 fields (key columns)

The MG-12 client-margin file is the most operationally important. Key columns (from [NCL/CMPT/56502](/broking-kyc/reference/circulars/clearing-corps/#ncl-cmpt-56502) field-tag spec):

| Column / tag | Meaning |
|---|---|
| `SPANMrgn` | SPAN initial margin component |
| `LossMrgn` | ELM component |
| `DlvryMrgn` | Delivery margin (where applicable) |
| `CnsltdCrstllsdOblgtnMrg` | Consolidated crystallised obligation margin |
| `EndOfDayRqrmnt` | Total EOD margin requirement |
| `ClntCode` | Client code (UCC) |
| `CCSegCd` | Clearing-corp segment code |
| `MbrCode` | Member code |
| Various date / time fields | Snapshot timestamp |

The AMGCM / AMGTM files (added Apr 2023) carry the same field structure but with EOD parameters applied to EOD positions, distinct from the BOD-parameter-applied EOD-position MG-12 (the dual-file structure is the operational trace of the SEBI Feb 2023 EOD margin computation change per [SEBI/HO/MRD/MRD-PoD-2/P/CIR/2023/016](/broking-kyc/reference/circulars/sebi-other/)).

## 8. Pre-trade margin computation at the broker

The broker's RMS consumes the SPAN parameter file and ELM ratios at BOD and computes margin in real time for each client position. The pre-trade margin lock (see [OMS internals deep dive](/broking-kyc/deep-dives/trading-day/oms-internals/)) consults this real-time computation to validate every order.

The broker's local SPAN implementation:

1. Loads the SPAN parameter file (scan ranges, ELM ratios, SOMC, IMSC, ICSC).
2. For each client portfolio, runs the 16-scenario grid, applying inter-month and inter-commodity offsets.
3. Adds ELM, additional margins (delivery, tender, special, surveillance), and crystallised obligations.
4. Holds the result in an in-memory cache, refreshed on every trade and on each snapshot window.

Pre-trade margin lock validates the **proposed order's incremental margin requirement** against the client's available margin (free balance + collateral less reservations less consumed margin). The incremental computation requires re-running SPAN with the proposed position added — typically a sub-millisecond compute for a small portfolio, scaling with position count.

## 9. Margin shortfall penalty grid

When the clearing corp finds a margin shortfall at any of the four intraday snapshots or at EOD, a penalty applies. The grid per [NSE/INSP/64315](/broking-kyc/reference/circulars/nse/#nse-insp-64315), [NCL/CMPT/45516](/broking-kyc/reference/circulars/clearing-corps/#ncl-cmpt-45516), and reiterated in [NCL/CMPL/44977](/broking-kyc/reference/circulars/clearing-corps/#ncl-cmpl-44977):

| Shortfall condition | Penalty |
|---|---|
| Shortfall < ₹1 lakh AND < 10% of applicable margin | **0.5%** of the shortfall |
| Shortfall ≥ ₹1 lakh OR ≥ 10% of applicable margin | **1.0%** of the shortfall |

The penalty is computed using the **max-of-four method**: across the four snapshots plus EOD, the highest single shortfall determines the penalty rather than summing across snapshots. This was clarified via [NCL/CMPT/45516](/broking-kyc/reference/circulars/clearing-corps/#ncl-cmpt-45516).

Additionally, the **client-level vs CM-level** penalty grid runs in parallel — a member with a CM-level shortfall and a separate client-level shortfall on a different client faces the higher of the two penalties.

Repeated shortfalls in a month escalate the penalty rate. Sustained pattern (typically 3+ months of repeated shortfalls) triggers SEBI / exchange inspection and possible suspension.

### 9.1 Permitted reason codes for short-allocation

Per [NCL/CMPT/55381](/broking-kyc/reference/circulars/clearing-corps/#ncl-cmpt-55381) (effective Feb 13, 2023), five reason codes permit a member to flag a short-allocation as non-penalty-attracting:

1. Excess collateral at another CC,
2. Early Pay-in of securities,
3. Wrong-client trades (subsequently corrected),
4. NRI trades (subsequently allocated),
5. Late allocation acceptance.

False reporting under these codes attracts the same penalty as the underlying short-collection plus inspection action.

### 9.2 Penalty pass-through prohibition

Per [NSE/INSP/64315](/broking-kyc/reference/circulars/nse/#nse-insp-64315), **margin shortfall penalty cannot be passed on to clients** save for specific client-attributable exceptions. Members must refund any prior pass-through to clients. This rule is one of the most-inspected items in SEBI broker audits.

<Aside type="caution">
**Peak-margin snapshot timing is at the clearing-corp side, not the broker side.** The broker doesn't know exactly when within the 11:00–11:30 window snap 1 fires. RMS implementations that game a "known clock" assumption — e.g., releasing pre-staged reservations at 11:31 — break when the actual snap fires at 11:05. Industry practice is to keep margin position stable across the entire window, with a 5-minute pre-snapshot freeze on margin-releasing operations.
</Aside>

## 10. Worked examples

### 10.1 Equity (CM) — buy of Reliance (RELIANCE)

**Setup:** Client wants to buy 100 shares of RELIANCE at ₹2,800 LTP.

**Margin under VaR + ELM (revised framework):**
- VaR (daily 99% over 2-day MPOR, typical 12–15% for a liquid largecap): say 12% of contract value.
- ELM (revised-framework component): ~5% of contract value (instrument-specific).

```
Contract value = 100 × 2,800 = 2,80,000
Required margin = (12% + 5%) × 2,80,000 = 17% × 2,80,000 = 47,600
```

**Alternative — 20% flat upfront (per [NSE/INSP/45565](/broking-kyc/reference/circulars/nse/#nse-insp-45565)):**

```
Required margin = 20% × 2,80,000 = 56,000
```

The broker may collect the flat 20% to avoid the per-instrument VaR look-up. The clearing corp continues to collect VaR+ELM from the member.

**Sell of existing holding:** if the client already owns the 100 shares, the sell-side margin can be reduced (the holding itself collateralises the trade up to a permitted threshold).

### 10.2 F&O — Nifty futures with calendar-spread offset

**Setup:** Client is long 1 lot Oct Nifty future + short 1 lot Nov Nifty future. Nifty spot ~22,500; Oct futures ~22,520; Nov futures ~22,580. Lot size = 50.

**Scenario grid (16 scenarios) on each leg:**

For the long Oct leg, the scenarios produce P&L impacts based on Oct future movement (positive on price-up scenarios, negative on price-down scenarios, near-zero on volatility-only moves because futures don't carry option-style vol sensitivity).

For the short Nov leg, the impacts are opposite-sign — long Oct gains when futures rise; short Nov loses by similar magnitude.

The **portfolio-level worst-scenario loss** is much smaller than the sum of independent worst losses because the two legs move together. SPAN identifies the calendar-spread structure and applies the **inter-month spread charge (IMSC)** rather than full standalone margins.

**Indicative numbers:**

```
Standalone margin on Oct leg (SPAN+ELM, ~10% of contract): 
   10% × 22,520 × 50 = 1,12,600
Standalone margin on Nov leg:
   10% × 22,580 × 50 = 1,12,900
Sum of standalone: 2,25,500

Calendar spread under SPAN with IMSC (illustrative; IMSC typically 1–2%):
   IMSC × spread quantity = 1% × ~22,550 × 50 = ~11,275
   + ELM on net basis: small

Effective margin for the spread: ~25,000–35,000 — roughly 80–85% reduction
versus the standalone sum.
```

(IMSC values change daily per the scanrange file; the worked example uses illustrative magnitudes.)

### 10.3 F&O — Bull Call Spread (option hedge benefit)

**Setup:** Long 1 lot Nifty 22500 CE Oct + Short 1 lot Nifty 22700 CE Oct. Premium received-net is, say, ₹50 per lot.

**Scenario grid:**

For each of the 16 scenarios (8 price moves × 2 vol moves), SPAN re-prices both option legs and sums.
- In up-scenarios: long 22500 CE gains, short 22700 CE loses; partial offset.
- In down-scenarios: long 22500 CE loses, short 22700 CE gains; partial offset.
- In vol-up scenarios: both legs gain vega-wise, but the short leg's vega is positive (long vol position is the long leg only).

The **maximum-loss scenario** for a Bull Call Spread is bounded by the spread width minus the net premium. SPAN's scenario grid captures this naturally — the worst-case is bounded.

**Indicative computation:**

```
Spread width = 22700 - 22500 = 200 (Nifty points)
Lot size = 50
Max loss = (200 - 50) × 50 = 7,500 per lot (= 7,500 if net premium ~50)

Floor: short option minimum on the short 22700 CE leg.
If SOMC = 25 per lot × 50 = 1,250 — well below the spread max-loss.

SPAN initial margin ≈ 7,500 (the scenario floor)
ELM on net: small
Total margin: ~7,500–8,000 per lot
```

A plain short Nifty 22700 CE without the long hedge would attract margin of `SPAN scenario-loss + ELM` of the order of ₹40,000–60,000 per lot. The spread reduces this to ~₹7,500 — a 5–8× reduction, capturing the hedge benefit.

### 10.4 Currency derivatives — USDINR

**Setup:** Long 1 lot USDINR Oct future at 83.50; lot size = $1000 (= ₹83,500 contract value).

**Scanrange (CD):** Typically 2% FSR for USDINR; ELM ~1%.

```
Contract value = 1,000 × 83.50 = 83,500
SPAN ≈ 2% scenario-loss = 1,670
ELM ≈ 1% = 835
Total margin ≈ 2,505 per lot
```

CD margins are conspicuously smaller than equity F&O margins because USDINR price volatility is small relative to a stock or index.

### 10.5 Commodity — Crude Oil with MCXCCL VSR

**Setup:** Short 1 lot Crude Oil Oct future. Lot size = 100 barrels; price = ₹6,500/bbl; contract value = ₹6,50,000.

**MCXCCL parameters:** VSR Crude Oil = 33 (per [MCXCCL/RISK/184/2025](/broking-kyc/reference/circulars/clearing-corps/#mcxccl-risk-184-2025)); ELM on Crude Oil short = 1.25%.

```
Contract value = 100 × 6,500 = 6,50,000
SPAN VaR-driven scenario loss (with VSR 33): approximately 13% = 84,500
ELM short = 1.25% × 6,50,000 = 8,125
Additional margins on short side (if any per MCXCCL/RISK schedule): event-driven
Total margin per lot ≈ 92,500–95,000
```

The MCXCCL framework also imposes **Margin Shortfall Block Amount (MSBA)** if prior day's MTM loss is unpaid by next morning — blocking the member's available CM limits until the MTM is cleared.

## 11. CM-segment SPAN-equivalent

SPAN is the methodology for derivatives. For the **cash segment (CM)**, the methodology is **VaR + ELM** (per [SEBI/HO/MRD2/DCAP/CIR/P/2020/127](/broking-kyc/reference/circulars/sebi-other/#sebi-ho-mrd2-dcap-cir-p-2020-127)), with the **20% flat alternative** permitted under [NSE/INSP/45565](/broking-kyc/reference/circulars/nse/#nse-insp-45565).

VaR computation for CM:
- 99% 2-day historical VaR (typically) per instrument,
- Scaled by the trade quantity to get the value-at-risk for the proposed trade,
- ELM added on top.

The cash segment's daily VaR file is consumed by the broker's RMS at BOD. Pre-trade margin in CM is computed identically in spirit to SPAN in F&O — value-at-risk + extreme-loss buffer — though without the 16-scenario grid (the VaR is a single number per instrument rather than a portfolio-recompute).

## 12. Reconciliation and dispute

If the broker's locally-computed margin differs from the clearing corp's MG-12 / MG-13 figures, the broker may file a reconciliation with the clearing corp's operations desk. Typical causes:

- Stale SPAN parameter file (broker missed BOD reload),
- Incorrectly-applied cross-margin offset,
- Wrong-client trades not yet reallocated,
- Missing or late EPI,
- Missing or late short-allocation reporting (INTRASAR).

The clearing corp's reconciliation team responds within the operational window; resolved cases avoid the penalty. Unresolved disputes go to penalty and may be appealed via the disciplinary action mechanism.

<Aside type="note">
**The shift to EOD-parameter computation in 2023 changed the reconciliation surface.** Until Feb 2023, the EOD margin computation used EOD positions with **BOD margin parameters** — a quirk because the BOD parameters were "stale" by EOD. SEBI's Feb 2023 circular [SEBI/HO/MRD/MRD-PoD-2/P/CIR/2023/016](/broking-kyc/reference/circulars/sebi-other/) changed this: MG12/13/18 and MGCM/MGTM use EOD positions with **BOD parameters** (preserving back-compatibility for legacy reports), while a new AMGCM / AMGTM family applies **EOD parameters** to EOD positions. Brokers must reconcile against the right family — using AMGCM where the question is "what's the EOD-parameter-applied margin" and MG-12 where the question is the legacy reconciliation.
</Aside>

## Sub-cases / edge cases

- **Cross-CC collateral** — a client may have collateral at multiple clearing corps (e.g., one at NSCCL for NSE F&O, another at MCXCCL for commodity). Permitted reason code 1 (excess collateral at another CC) applies when the broker can demonstrate cross-CC collateral availability.
- **Custodian-cleared institutional clients** — the broker executes but the custodian clears. Margin is the custodian's obligation; the broker still reports the trade in MG-12 with the custodian's flag. Institutional positions in cross-margin offsets are counted only after T+1 custodian confirmation.
- **MTF (Margin Trading Facility)** — funded purchases on MTF carry their own margin and collateral pattern; the funded position itself is pledged via the **CSMFA** account ([NCL/CMPT/63669](/broking-kyc/reference/circulars/clearing-corps/) on direct-payout / CSMFA). See [client funds compliance row CLIENT-FUNDS-005](/broking-kyc/operations/compliance-blueprint/#client-funds-21-entries).
- **SLB (Securities Lending and Borrowing)** — SLB positions carry their own margin per [NCL/CMPT/61810](/broking-kyc/reference/circulars/clearing-corps/) / [NCL/CMPT/67763](/broking-kyc/reference/circulars/clearing-corps/) SLBS master.
- **Early Pay-in (EPI) of securities** — securities pre-delivered to the clearing corp earn margin exemption per [NCL/CMPT/61800](/broking-kyc/reference/circulars/clearing-corps/#ncl-cmpt-61800) item 10.18; the EPI flow reduces the broker's margin requirement.
- **G-Sec / T-Bill / SGB collateral with approaching maturity** — margin benefit withdrawn 2 business days prior to maturity per [NCL/CMPT/72224](/broking-kyc/reference/circulars/clearing-corps/) (and equivalent at other CCs).
- **Non-cash collateral haircut phase-in (2024)** — un-approved-collateral haircut moved to 100% phased Aug–Nov 2024 (40 / 60 / 80 / 100) per ICCL 20240710-11 and [NCL/CMPT/65498](/broking-kyc/reference/circulars/clearing-corps/). Brokers running collateral pools with un-approved securities had to migrate during this window.
- **50% cash-equivalent rule** — at least 50% of total margin must be cash or cash-equivalent (FDR, MFOS) per [NCL/CMPT/61800](/broking-kyc/reference/circulars/clearing-corps/#ncl-cmpt-61800) framework; non-cash above this share is excluded from available margin.

## Practical notes

- **[industry practice]** Real-time SPAN computation at the broker is typically pre-cached at the portfolio level per client; on each new order, the broker computes the **incremental** SPAN — the difference between SPAN with the new position and SPAN without — rather than re-running the full grid. This pre-cache plus incremental compute is what keeps pre-trade RMS latency under 2 ms.
- **[gotcha]** Peak-margin penalty grids look small (0.5–1.0%) but compound rapidly with frequency. A broker carrying a daily ₹5 crore shortfall through 200 trading days at 1% is ₹1 crore in penalty annually — and that's before the inspection-trigger threshold. Tight RMS discipline is much cheaper than the penalty.
- **[risk trade-off]** Aggressive cross-margin claims reduce client margin requirements but expose the broker to wrong-pair offsetting. The eligibility test (correlation > 0.90, 80% overlap) must be re-validated quarterly; pair-list drift is a common audit finding.
- **[industry practice]** The four-snapshot model means the **client-level margin profile must be stable across the entire snapshot window**, not just at the snapshot instant. Settlement-driven balance swings during the window — a payout receipt at 11:25 followed by a margin-utilising trade at 11:32 — appear as a shortfall if the snapshot fires at 11:30 catching the pre-payout state. RMS implementations typically freeze settlement-driven balance changes for 5 minutes around each snapshot window.
- **[gotcha]** ELM is a *flat* percentage but the broker's per-client ELM exposure changes intraday as positions change. Brokers tracking ELM only at BOD miss intraday accretion; the EOD ELM may exceed the BOD by a wide margin on a high-activity day.
- **[cost optimization]** Building an in-house SPAN engine is straightforward (the scenario grid is well-documented); the maintenance is the ongoing cost — keeping pace with scanrange revisions, cross-margin framework updates, file-format changes (Apr 2023 AMGCM/AMGTM was a substantial change requiring back-office reconciliation logic updates). Many brokers run a vendor SPAN engine (CME-licensed SPAN library, or a clearing-corp-provided reference implementation) rather than build.
- **[risk trade-off]** Pre-trade margin computation conservatism: brokers can choose to apply the *maximum* possible margin (worst-case parameter set across the scenario grid) or the *expected* margin (mean parameter set). The former is conservative — fewer orders pass — but reduces shortfall risk. Most retail brokers use the conservative path; institutional shops use the expected path with tighter post-trade reconciliation.
- **[industry practice]** Margin response files from clearing corps arrive in a tight evening window. Most brokers automate the reconciliation pipeline — load MG-12 / MG-13, compare with local computation, flag exceptions, route to compliance — completing it before the next BOD. Manual reconciliation past midnight is a tell of an under-invested back-office.

## Cross-references

- [Integration DAG: Trading hours](/broking-kyc/operations/integration-dag/trading-hours/) — the four intraday peak-margin snapshot nodes and the DMF aggregation flow.
- [Broker Process Narrative](/broking-kyc/broker-process/narrative/) — Section 4 covers DMF generation and peak-margin reporting at narrative level.
- [Compliance Blueprint — Margin compliance domain](/broking-kyc/operations/compliance-blueprint/#margin-compliance-30-entries) — 30 entries covering every margin obligation including upfront margin, peak-margin snapshots, DMF, cross-margin, MTF margin, MFOS / FDR pledge.
- [Compliance Blueprint — Client funds domain](/broking-kyc/operations/compliance-blueprint/#client-funds-21-entries) — upstreaming, segregation, networth, BMC / ABC.
- [Compliance Blueprint — Settlement domain](/broking-kyc/operations/compliance-blueprint/#settlement-22-entries) — short-delivery auction, T+1 settlement, T+0 beta, MTF settlement.
- [Deep Dive: OMS internals](/broking-kyc/deep-dives/trading-day/oms-internals/) — sibling page; the OMS pre-trade margin-lock gate consumes the SPAN computation.
- [Deep Dive: Surveillance, GSM, ASM](/broking-kyc/deep-dives/trading-day/surveillance-norms-gsm-asm/) — sibling page on surveillance-margin layers (ASM-for-spoofing).
- [Deep Dive: Short-delivery auction](/broking-kyc/deep-dives/trading-day/short-delivery-auction/) — sibling page; auction mechanism is the downstream cousin of margin shortfall.
- [Deep Dive: Retail algo framework](/broking-kyc/deep-dives/trading-day/retail-algo-framework/) — sibling page; algo OPS thresholds interact with margin computation.
- [Clearing-corp circulars](/broking-kyc/reference/circulars/clearing-corps/) — full text of NSCCL / ICCL / MCXCCL circulars cited.
- [SEBI MIRSD circulars](/broking-kyc/reference/circulars/sebi-mirsd/) — broker-side margin and reporting circulars.
- [SEBI other circulars](/broking-kyc/reference/circulars/sebi-other/) — MRD margin-framework circulars including SEBI/HO/MRD2/DCAP/CIR/P/2020/127.
- [NSE inspection circulars](/broking-kyc/reference/circulars/nse/) — INSP-prefixed circulars defining penalty grids.
- [Vendor Atlas — Risk Management Systems](/broking-kyc/vendors/atlas/#risk-management-systems-15-products) — vendor SPAN engine products.

## Verified through

2026-05-14

---

*AI-generated and not legal, financial, or compliance advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*

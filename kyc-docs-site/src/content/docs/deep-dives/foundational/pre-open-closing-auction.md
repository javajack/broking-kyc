---
title: "Deep Dive: Pre-open and closing auction mechanics"
description: Pre-open session (09:00-09:15 IST) order-entry / matching / buffer windows, opening-price discovery via call auction, eligible securities, AMO release. Closing session (15:30-15:40 IST) call-auction closing, settlement-price discovery, eligible scrips, broker routing.
---

import { Aside } from '@astrojs/starlight/components';

> **Why this page is structured this way:** The auction windows at the start and end of the equity cash trading day are *call-auction* sessions — fundamentally different from the continuous limit-order-book trading that occupies the bulk of the day. The page therefore separates: (1) the pre-open session — opening-price discovery, order-entry / matching / buffer phases, AMO release, surveillance considerations; (2) the closing session — settlement-price discovery, closing call-auction, eligibility. Each section walks through the mechanics chronologically with the broker's routing and OMS-level considerations called out.

## TL;DR

- Indian equity cash market trading day on NSE / BSE runs **09:00 IST to 15:40 IST**, split into: pre-open auction (09:00-09:15) → continuous trading (09:15-15:30) → closing session (15:30-15:40).
- **Pre-open session (09:00-09:15)** is a *call auction*: orders accumulate during the order-entry window; an opening price is discovered by matching demand and supply at maximum tradable volume; trades execute at the discovered opening price; the continuous session opens with the discovered price as the reference.
- Pre-open phases (NSE / BSE): **09:00-09:08 order entry** → **09:08-09:12 order matching and trade confirmation** → **09:12-09:15 buffer** (transition to continuous trading at 09:15).
- **Eligible securities for pre-open**: as of 2026-05-14, pre-open call-auction applies across the equity universe with specific rules for IPO / SME-IPO / relisted scrips per **NSE/CMTR/63594** dated 2024-09-17 (and supersession trail). For IPOs and relisted scrips, NSE modified call-auction duration and added transparency disclosure of indicative quantity and indicative price (per SEBI Circular SEBI/HO/MRD/MRD-PoD-3/P/CIR/2024/85 dated 2024-06-20).
- **AMO (After Market Orders)** placed between previous close and 08:59 IST are released into the pre-open at 09:00 — entering the order-entry queue at 09:00.
- **Closing session (15:30-15:40)** uses the last 30 minutes of continuous trading (15:00-15:30) to compute a **VWAP** that becomes the closing price for most securities; for eligible securities, a separate **closing call auction** between 15:40-15:50 may be applicable (BSE / NSE specific rules apply; not all securities qualify for call-auction closing).
- **Settlement-price reference**: cash market closing price (VWAP / call-auction price) is referenced for (a) corporate-action ex-date computations, (b) F&O settlement reference on expiry day, (c) MTM end-of-day for client positions, (d) MTF margin computations, (e) fund NAV computation.
- **Broker routing**: orders intended for pre-open or closing-auction must be sent with the correct session-type tag in the exchange-bound order message; the broker's OMS routes by session tag.
- **No pre-open / closing auction on T+0 settlement series**: per **20240321-3** (BSE March 21, 2024) and **NSE/CMTR/61813** (NSE April 29, 2024) introducing T+0 beta, T+0 scrips do not participate in pre-open / block / auction sessions.

## Conceptual overview

The Indian equity market starts the trading day with an *uncertainty band* — overnight global news, corporate disclosures after previous close, futures-market signals — that would, in a pure continuous market, produce a chaotic gap-open with thin top-of-book pricing and material spread between marginal buyers and sellers. The pre-open call auction solves this by **aggregating overnight order interest, matching it at a single market-clearing price, and producing an *information-rich* opening price** that becomes the reference for the continuous session.

The closing session performs a structurally analogous function — concentrating end-of-day liquidity into a tight window and producing a closing price that:
- Resists late-session manipulation through closing-price-marking strategies.
- Aggregates broad demand-supply rather than reflecting a single thin-trade tick.
- Provides a robust reference for derivative settlement, fund NAV, corporate-action computations.

Both auctions are *call auctions* (also known as *batch auctions* or *single-price auctions*) — distinct from *continuous double-sided auction* trading. In a call auction, orders accumulate during a defined window, the auction-matching algorithm computes the *uncrossing price* that maximises tradable volume, and all matched trades execute at that single price.

<Aside type="tip">
**Call-auction theory.** The uncrossing price in a call auction is the price at which the cumulative demand curve (descending in price) crosses the cumulative supply curve (ascending in price). Where multiple prices produce the same maximum tradable volume, the standard tie-breaking is: maximum match volume → minimum imbalance → market-order-price reference → previous-close reference. NSE's pre-open price-discovery algorithm follows this standard four-step tie-breaking sequence published in NSE pre-open methodology circulars.
</Aside>

## The trading day — at a glance

| Phase | NSE / BSE timing (IST) | Type | Comment |
|---|---|---|---|
| AMO acceptance | Previous close to 08:59 | Order entry only | AMOs queued for pre-open release |
| Pre-open: order entry | 09:00-09:08 | Call-auction order entry | Orders accepted, modified, cancelled |
| Pre-open: matching | 09:08-09:12 | Call-auction matching | No further order entry; matching algorithm runs |
| Pre-open: buffer | 09:12-09:15 | Transition | Trades confirmed; pre-open results disseminated |
| Continuous trading | 09:15-15:00 | Continuous limit-order-book | Standard trading |
| Closing-price input window | 15:00-15:30 | Continuous trading | Last 30-min VWAP used for closing price |
| Closing session / pre-close | 15:30-15:40 | Continuous trading (limited mods) | Final 10 minutes of standard session |
| Post-close session | 15:40-16:00 | Closing call auction (eligible scrips) | Optional closing-auction session at NSE for eligible scrips |
| Post-close AMO | 16:00 to next-day 08:59 | Order entry only | AMOs for next day's pre-open |

(The above is the standard equity-cash structure. Currency derivatives, commodity derivatives, debt, T+0 settlement series, and IPO listing days have variations covered in [Segment rules comparison](./segment-rules-comparison/).)

## Pre-open session — detailed mechanics

### Phase 1: Order entry (09:00-09:08)

**Window**: 8 minutes.

**Activity**:
- Orders can be entered (new orders), modified, or cancelled.
- Order types accepted: **limit orders** (specified price), **market orders** (transact at the discovered opening price), **at-the-open** orders.
- AMO orders (placed between previous close and 08:59) are released into this queue at 09:00.
- Order book is *visible* to the market in a regulated form — exchanges publish **indicative opening price** and **indicative tradable quantity** at regular intervals during the order entry window (typically every 60 seconds) so participants can observe price discovery and adjust their orders.

**Indicative price disclosure**:
- Per **NSE/CMTR/63594** dated 2024-09-17, NSE modified call-auction duration for IPO and relisted scrips and added **transparency disclosure of number and quantity in pre-open call** — implementing SEBI Circular **SEBI/HO/MRD/MRD-PoD-3/P/CIR/2024/85** dated 2024-06-20.
- The indicative-price disclosure helps participants converge on a fair opening price by exposing the current cross-clearing computation.

**Broker OMS routing**:
- Order session-type tag: "pre-open" in the FIX / proprietary exchange-bound message.
- Order validation: price within day's circuit limit; quantity within client position limit; margin sufficient (pre-trade RMS).
- Order modification / cancellation accepted any time within this 8-minute window.

### Phase 2: Order matching (09:08-09:12)

**Window**: 4 minutes.

**Activity**:
- Order entry, modification, cancellation **closed** at 09:08.
- The exchange's matching engine runs the call-auction algorithm:
  1. Aggregate all buy orders by price (descending).
  2. Aggregate all sell orders by price (ascending).
  3. Compute the uncrossing price (price at which cumulative demand and supply intersect, maximising tradable volume).
  4. Apply tie-breaking rules if multiple uncrossing prices yield same volume.
  5. Confirm trades at the uncrossing price; partial fills allocated per time-priority.
- Result: opening price for the security; trades for matched orders at this opening price.

**Tie-breaking sequence** (per NSE pre-open methodology):
1. **Maximum tradable volume** — primary objective.
2. **Minimum imbalance** (smallest difference between buy and sell quantities at the uncrossing price).
3. **Market-pressure rule** — reference to whether the imbalance is on buy or sell side.
4. **Previous-close-anchor** — opening price closest to previous close where the above tie persists.

**Unmatched orders**: orders that did not execute in the pre-open auction are *carried forward* into the continuous-session order book at 09:15 with their original prices and time-priorities (subject to rules — some order types may be cancelled if they cannot transition).

### Phase 3: Buffer (09:12-09:15)

**Window**: 3 minutes.

**Activity**:
- No further order activity in the pre-open queue.
- The exchange disseminates pre-open results: opening price, opened volume, list of executed orders.
- Brokers' OMS receives execution confirmations; client account positions are updated.
- The continuous-session order book is being prepared for opening at 09:15.

**Broker-side activity**:
- Reconciliation of pre-open executions against orders placed.
- Position update for clients whose pre-open orders executed.
- MTM start: opening price becomes the reference for intraday MTM until first continuous-session trade.

### Continuous trading (09:15-15:30)

Standard continuous limit-order-book trading with double-sided matching. Out of scope for this page.

## Pre-open: special handling for IPO / relisted scrips

Per **NSE/CMTR/61813** dated 2024-04-29 (consolidated CM-segment circular for FY 2024-25) and subsequent **NSE/CMTR/63594** dated 2024-09-17 modifying Section 1.2 of NSE/CMTR/61813:

- **IPO listing day**: the IPO scrip lists in a special call-auction window with extended duration (per the modified rule). The auction provides robust price discovery for the first time the scrip trades publicly. After the call-auction, the IPO transitions to continuous trading at the discovered price.
- **SME-IPO**: equivalent special call-auction with SME-specific parameters.
- **Relisted scrips** (post-suspension): special call auction reintroduces the scrip to the market; transparency disclosures (indicative price, indicative quantity) ensure participants can converge on a fair price.
- The transparency disclosure of **number and quantity** in pre-open call (per NSE/CMTR/63594) is specifically aimed at these special-event calls.

The underlying SEBI authority is **SEBI/HO/MRD/MRD-PoD-3/P/CIR/2024/85** dated 2024-06-20 on pre-open call-auction duration for IPO / SME-IPO / relisted scrips.

## AMO release into pre-open

**AMO (After Market Orders)**:
- Placed between previous close and 08:59 IST.
- Visible only to the placing broker / client during the AMO window; not visible to the market.
- Released into the pre-open queue at 09:00 IST when the order-entry phase opens.

**Validation at release**:
- Day's circuit limits applied (AMO order price must be within day's circuit limit — typically 5%, 10%, 20% based on scrip's GSM / ASM / surveillance category).
- Client margin sufficiency re-validated at release.
- Quantity within client position limit.

**Rejection scenarios**:
- AMO order price outside day's circuit limit → rejected at release.
- Client margin insufficient at 09:00 → rejected.
- Client UCC suspended or frozen → rejected.

**Broker OMS handling**:
- AMOs are queued in the broker's pending-order book overnight.
- At 09:00, the broker's OMS releases all qualifying AMOs to the exchange in a controlled rate (to avoid order-rate limit breaches at the exchange gateway).
- Released AMOs receive standard pre-open order acknowledgment.

## Eligible securities for pre-open

As of 2026-05-14, the pre-open call-auction applies broadly across the equity-cash universe, with these specific carve-outs and inclusions:

- **All actively-traded equity scrips** in the NSE / BSE main board participate in pre-open.
- **Special call-auction** for IPO / SME-IPO / relisted scrips per the NSE/CMTR/63594 framework.
- **Periodic call auction** for low-liquidity scrips (per the NSE master surveillance circular NSE/SURV/61970) — these scrips trade only via periodic call auctions through the day rather than continuous trading.
- **GSM / ESM / ASM** surveillance-tagged scrips may have additional restrictions (e.g., trade-for-trade settlement, reduced trading frequency) that affect pre-open eligibility for some stages.
- **T+0 settlement series** scrips — per **NSE/CMTR/61813** and BSE's equivalent T+0 introduction circular (BSE 20240321-3 dated 2024-03-21), **T+0 scrips do not have pre-open / block / auction sessions**. T+0 trading window is 09:15-13:30 with price band of ±1% and recalibration after ±0.5%. T+0 and T+1 trade in parallel for the same scrip; the T+0 series is identified by "#" suffix (e.g., HINDMOTORS#).
- **Suspended scrips** — no pre-open until suspension lifted.
- **Pre-listing scrips** — out of scope until listing day.

## Closing session — detailed mechanics

### Closing-price input window (15:00-15:30)

**Window**: 30 minutes, but this is *continuous trading*, not a separate auction phase.

**Activity**:
- Standard continuous trading continues.
- All trades executed in this window are *included in the VWAP computation* for the day's closing price.
- The VWAP is the **volume-weighted average price** of trades in the last 30 minutes:
  `VWAP = Σ(Price × Quantity) / Σ(Quantity)` over all trades in 15:00-15:30 for the scrip.
- Where there are no trades in the last 30 minutes (illiquid scrip), the closing price is the last traded price of the day; if no trades at all, it is the previous close.

**Why a 30-minute VWAP**: a single tick at 15:30 would be vulnerable to closing-price marking (see [Market manipulation typologies](./market-manipulation-typologies/) — marking-the-close). Averaging over 30 minutes makes manipulation expensive (requires sustained pressure over 30 minutes rather than a single coordinated trade), aggregates broad market participation, and reduces the influence of any single trade.

### Closing session (15:30-15:40)

**Window**: 10 minutes.

**Activity**:
- Continuous trading continues but with modified rules in some exchanges (e.g., order-modification restrictions, brake on price-band changes).
- The last trade in the 15:30-15:40 window is the *last traded price (LTP)* of the day; but it does **not** override the VWAP-based closing price for most reference uses.
- Order acceptance for this window: limit orders, market orders, IOC, etc. — standard.

### Post-close call auction (15:40-15:50, NSE)

For eligible scrips, NSE operates a **post-close call-auction session** between 15:40 and 15:50:
- Order entry: 15:40-15:48 (or per NSE-specific timing).
- Matching: 15:48-15:50.
- Trades execute at the discovered closing call-auction price.

**Eligibility**: typically top-100 to top-200 liquid scrips, with the list periodically reviewed by NSE. The 2024 changes to closing call-auction frameworks (cross-referenced through NSE/CMTR circulars and SEBI's market-structure circulars) refined the eligibility criteria.

**Effect**:
- The closing call-auction price (where applicable) replaces the VWAP as the official closing price for the scrip.
- This is the price used for:
  - F&O settlement reference on expiry day.
  - Corporate-action ex-date computations.
  - End-of-day MTM and MTF margining.
  - Fund NAV computation (for funds that reference closing prices).

**Broker OMS routing**:
- Orders for closing call-auction must be tagged with the "post-close" session type in the exchange-bound message.
- Order types: limit, market, at-the-close.
- The OMS handles the brief pause between continuous and closing-auction sessions (15:30-15:40 continuous, 15:40-15:50 closing call).

### Post-close (after 15:50)

- Trade confirmations, EOD files, settlement reports.
- AMO acceptance window opens at 16:00 (per NSE / BSE).
- Margin reports, MTM reports, settlement-cycle reports flow downstream (see [BOD/EOD processing](/broking-kyc/operations/batch-pipeline/)).

## Eligible securities for closing call-auction

The closing call-auction is an *eligible-scrip-only* facility. Scrips currently in the closing call-auction window are listed by the exchange in a published list, typically:
- Top liquid scrips by average daily traded volume.
- Scrips in major indices (Nifty 50, Bank Nifty, BSE Sensex constituents and select large-caps).
- Specifically *excluded*: T+0 settlement-series scrips, surveillance-tagged scrips at higher stages, suspended scrips, GSM Stage III/IV scrips.

The eligibility list is periodically refreshed by the exchange.

## Settlement-price discovery — what gets the "official close"

Different reference uses pull from different points in the closing sequence:

| Reference use | Source of "close" |
|---|---|
| Cash-market closing price (display, news, indices) | Closing call-auction price where applicable; else last 30-min VWAP |
| F&O settlement reference on expiry day | Closing call-auction price where applicable; else last 30-min VWAP of underlying |
| Index closing value | Computed from constituents' closing prices |
| Corporate-action ex-date reference price | Closing price (call-auction or VWAP) on the day before ex-date |
| MTM at end of day for client positions | Closing price |
| MTF margin computation | Closing price |
| Fund NAV | Closing price (for funds that mark-to-market end of day) |
| Block-deal reference price band | Closing price for the next-day window |
| Surveillance — GSM / ASM circuit recalibration | Closing price |

A consistent *single* closing price per scrip per day is therefore important — it propagates into many downstream computations. The exchange publishes the official close in its EOD market data feed.

## Broker order routing — practical considerations

A broker OMS handling pre-open, continuous, and closing-auction trading must:

### Session-type tagging

- Order session-type tag on every order message — "pre-open", "continuous", "post-close" — per the exchange's order-API specification.
- Orders submitted with the wrong session-type are rejected by the exchange OMS.

### Phase-aware UI

- Client-facing UI must show the *current session phase* and accept only orders valid for that phase.
- Pre-open phase: show order-entry window timer (e.g., "Pre-open closes in 4:23"), allow limit / market orders; show indicative opening price if disseminated by the exchange.
- Continuous phase: standard limit-order-book UI.
- Closing-auction phase: show closing-auction window timer; allow eligible order types; show indicative closing-auction price if disseminated.

### AMO release

- AMO orders queued in the broker's pending-order book between 16:00 (post-close) and 08:59 (next-day pre-open open).
- At 09:00, batch-release AMOs to the exchange in a controlled rate.
- Pre-release validation: client margin re-check, client UCC status re-check, circuit limit re-check at next-day prices (when published).

### Surveillance interface

- Closing-window concentration alerts — flag clients whose closing-window participation exceeds threshold (see [Market manipulation typologies](./market-manipulation-typologies/) — marking-the-close).
- High OTR alerts in pre-open (per NSE/SURV/61970).
- Order-modification / cancellation pattern alerts in pre-open buffer phase.

### Reconciliation

- Pre-open executions reconciled to client orders at 09:12-09:15.
- Closing call-auction executions reconciled at 15:50.
- MTM end-of-day computation uses the official close (typically published in the exchange's EOD file by 18:00-19:00 IST).

## Variations across segments

The above is for **NSE / BSE equity cash market**. Other segments have variations:

### F&O (NSE / BSE)

- F&O session timing: 09:15-15:30 IST (no separate pre-open call-auction for derivatives; they open with the cash market opening as reference).
- F&O closing-price: last 30-min VWAP of futures / option contract; for option settlement on expiry, the underlying's closing price (per cash market) is referenced.
- Expiry day: cash market last 30-min VWAP / closing call-auction price is the settlement reference for options and index futures; for stock futures, the cash market closing.

### Currency Derivatives (CD)

- CD session timing: 09:00-17:00 IST (extended hours).
- No pre-open call-auction analogous to cash market.
- Closing price: last-trade price / VWAP per exchange specifications.

### Commodity Derivatives (MCX)

- MCX session timing: 09:00-23:30 / 23:55 IST (extended for international commodity reference, with morning session and evening session split).
- No pre-open call-auction.
- Closing price: per MCX's settlement-price methodology — typically based on weighted-average of the last 30 minutes of the morning session (Daily Settlement Price methodology varies by contract type; see MCX contract specifications).
- Tender period / delivery procedure: separate from continuous trading and not auction-based.

### Debt / G-Sec

- NDS-OM (G-Sec) timing differs from equity; trading is mostly RFQ / direct-deal-based and call-auction frameworks differ.
- Out of scope for this page; cross-reference to [Segment rules comparison](./segment-rules-comparison/).

### Mutual Fund (BSE StAR MF, NSE NMF II)

- No pre-open / closing call auction — MF subscriptions / redemptions follow NAV-cutoff times rather than auction-based price discovery.

## Sub-cases and edge cases

### IPO listing day

- IPO scrip lists with a special pre-open call-auction (extended duration per NSE/CMTR/63594).
- Transparency disclosure (indicative price, indicative quantity) is published during the auction window.
- After the special call-auction, continuous trading begins with the discovered opening price as reference.
- For high-profile IPOs, the indicative-price-discovery period sometimes shows volatile swings — the auction is designed to *resolve* these into a single fair-price-discovery output.

### Special call-auction days (relisting, post-suspension)

- Equivalent special call-auction with extended duration.
- Used when a scrip returns to trading after a suspension period.

### Pre-open suspension

- If the exchange suspends pre-open auction for a scrip (e.g., due to corporate-action discrepancy, regulatory action), trading begins from 09:15 directly into continuous mode with the previous-close as reference.
- Such suspensions are notified by exchange circular at the start of day.

### Order rejected due to circuit limit

- AMOs whose price falls outside the day's circuit limit are rejected at 09:00 release.
- Same for pre-open orders submitted during 09:00-09:08 whose price exceeds the day's circuit.
- The broker's OMS must apply circuit-limit validation at order-entry; the exchange's OMS applies the same as a second check.

### Partial fill in pre-open

- Where buy and sell quantities at the opening price are unequal, the lower side is fully matched and the larger side is partially matched per time-priority of orders.
- Unmatched portions of orders carry forward to the continuous session with original prices.
- Unmatched market orders may be cancelled (since they had no specified price) or converted to limit orders at the discovered opening price, per exchange rules.

### Closing call-auction failed match

- If the closing call-auction produces no match (no overlapping buy / sell orders at any price), the closing price defaults to the last 30-minute VWAP or the last traded price of the continuous session.
- This is rare for liquid scrips but possible for thinly-traded eligible scrips.

### Expiry day closing

- F&O expiry days have heightened surveillance on the cash market closing window (see [Market manipulation typologies](./market-manipulation-typologies/) — marking-the-close).
- The cash-market closing call-auction price (or VWAP) is the F&O settlement reference for index options, stock options, index futures.
- SEBI's October 2024 measures (SEBI/HO/MRD/MRD-PoD-2/P/CIR/2024/137) on equity-index-derivatives include expiry-day tail-risk margin increase and other structural disincentives to expiry-day manipulation.

### T+0 settlement series

- T+0 scrips (with "#" suffix) trade 09:15-13:30 only.
- No pre-open, no block, no auction sessions for T+0.
- T+0 prices excluded from index calculations.
- Per **BSE 20240321-3** (2024-03-21) and **NSE/CMTR/61813** (2024-04-29) introducing T+0 beta, and the subsequent SEBI expansion **SEBI/HO/MRD/MRD-PoD-3/P/CIR/2024/85** dated 2024-06-20 expanding T+0 to top 500 scrips and allowing custodian-settled clients.

### Holiday and special-day handling

- Pre-open / closing-auction not held on settlement holidays or trading holidays.
- Special trading days (Diwali Muhurat trading, special trading sessions per regulator notification) have their own session timing.
- Mock trading days (e.g., NSE/INSP/71214 referencing a Special CM-Segment mock trading on Saturday, December 13, 2025 exercising Pre-Open, Block-Deal window, Normal Market and Auction Market sessions end-to-end from Primary Site) follow the production session structure to test broker / exchange readiness.

### Auction-market session (T+2 short-delivery auction)

- A *separate* auction-market session operates during the trading day for **T+2 short-delivery auctions** — when a seller fails to deliver securities on T+1 settlement, the CC conducts an auction on T+2 to source the securities, with the buyer's payout linked to the auction outcome.
- This is **distinct from the pre-open / closing call auction** and is operated separately. See [Short-delivery auction](/broking-kyc/deep-dives/trading-day/short-delivery-auction/) for the full T+2 auction mechanics.
- The NCL/CMPT/71045 (Oct 30, 2025) and NCL/CMPT/71441 (Nov 24, 2025) FAQ circulars detail the internal-shortage auction mechanics.

<Aside type="tip">
**Three different "auctions" — don't confuse them.** The Indian market has (a) the *pre-open call auction* (09:00-09:15) — price discovery at the start of day; (b) the *closing call auction* (15:40-15:50 NSE) — closing-price discovery; (c) the *short-delivery / internal-shortage auction* (T+2) — settlement-default remedy. All three are called "auction" but operate under fundamentally different rules and at different times. Operationally, ensure your OMS, surveillance, and reconciliation systems clearly distinguish them.
</Aside>

## Practical notes

- **[industry practice]** Most large brokers route pre-open orders with extra validation overhead — the indicative-price disclosure period (09:00-09:08) is when clients are most likely to chase the indicative opening price, leading to rapid order modification cycles that can trip OTR thresholds. Tighter brokers throttle modification-rate during pre-open to keep clients below PNC thresholds; looser brokers allow free modification and absorb the OTR risk.
- **[gotcha]** New ops engineers sometimes assume the pre-open order book is visible to the market in the same way as the continuous order book. It is not — only the *indicative opening price* and *indicative tradable quantity* are disseminated (per NSE/CMTR/63594 transparency rules for IPO / relisted scrips, and per general NSE pre-open methodology for other scrips). Individual orders are not displayed.
- **[risk trade-off]** The 30-min VWAP closing-price methodology is robust against single-trade manipulation but cannot fully prevent sustained-pressure manipulation in the closing window. The closing call-auction (for eligible scrips) provides additional robustness by aggregating end-of-day liquidity into a single matching event; non-eligible scrips remain on the 30-min VWAP and need additional surveillance attention.
- **[cost optimization]** AMO release at 09:00 is a brief but high-volume window. Brokers with a large AMO book benefit from gateway-throttled release (e.g., 200 orders per second to the exchange) to avoid exchange-side rate-limit breaches that delay client orders.
- **[regulatory direction]** The transparency-disclosure additions per NSE/CMTR/63594 and the underlying SEBI/HO/MRD/MRD-PoD-3/P/CIR/2024/85 reflect a broader regulator focus on making pre-open price-discovery more transparent, particularly for IPO / relisted scrips. Expect further transparency enhancements over coming circulars.

## Cross-references

- [Deep Dive: Segment rules comparison](./segment-rules-comparison/) — pre-open / closing rules across segments.
- [Deep Dive: Market manipulation typologies](./market-manipulation-typologies/) — marking-the-close manipulation and surveillance.
- [Deep Dive: Short-delivery auction (T+2)](/broking-kyc/deep-dives/trading-day/short-delivery-auction/) — the separate auction mechanism for settlement defaults.
- [Deep Dive: OMS internals](/broking-kyc/deep-dives/trading-day/oms-internals/) — order-capture and session-tagging at the broker OMS.
- [Deep Dive: Surveillance — NORMS / GSM / ASM / OTR](/broking-kyc/deep-dives/trading-day/surveillance-norms-gsm-asm/) — exchange surveillance touchpoints in pre-open / closing.
- [Deep Dive: T+0 / T+1 settlement nuances](/broking-kyc/deep-dives/settlement/t0-t1-settlement/) — T+0 session structure (no pre-open / closing).
- [Deep Dive: Block & bulk deals](/broking-kyc/deep-dives/trading-day/block-bulk-deals/) — block deal window timing relative to pre-open / continuous / closing.
- [Operations: Batch pipeline](/broking-kyc/operations/batch-pipeline/) — EOD processing using the closing price.
- [Circulars — NSE](/broking-kyc/reference/circulars/nse/) — NSE/CMTR/61813 (consolidated CM segment FY 2024-25), NSE/CMTR/63594 (pre-open IPO / relisted modification), NSE/SURV/61970 (master surveillance), NSE/INSP/71214 (Dec 2025 mock).
- [Circulars — BSE](/broking-kyc/reference/circulars/bse/) — BSE 20240321-3 (T+0 introduction) and equivalent circulars.
- [Circulars — SEBI Other](/broking-kyc/reference/circulars/sebi-other/) — SEBI/HO/MRD/MRD-PoD-3/P/CIR/2024/85 (pre-open IPO transparency), SEBI/HO/MRD/MRD-PoD-2/P/CIR/2024/137 (equity-index-derivatives framework).

## Verified through

2026-05-14

---

*AI-generated and not legal, financial, or compliance advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*

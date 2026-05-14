---
title: "Deep Dive: Block and Bulk Deals"
description: Walkthrough plus reference for the block-deal and bulk-deal frameworks — the morning (08:45–09:00) and afternoon (14:35–15:05) block-deal windows, minimum quantity / value thresholds, price-band rules (±1% of reference price), bulk-deal disclosure thresholds (0.5% of issued shares per client per day), post-trade disclosure obligations, reporting formats, exchange-side surveillance of block deals, broker's reporting obligations, ETF block-deal extension, and the common compliance gotchas.
---

import { Aside } from '@astrojs/starlight/components';

> **Why this page is structured this way:** Block deals and bulk deals are structurally distinct — block deals run in dedicated windows with a price band; bulk deals are continuous-session trades by a single client crossing the 0.5%-of-issued-shares disclosure threshold. The page handles them in two parallel halves with their respective rules, then concludes with the common surveillance / reporting issues that touch both.

## TL;DR

- **Block deals** trade in two dedicated daily windows: **morning 08:45–09:00 IST** and **afternoon 14:35–15:05 IST**. Each block deal must clear within the window.
- Minimum block-deal threshold: **₹10 crore** per trade (the parameter most recently re-iterated via [SEBI/HO/IMD/DOF2/P/CIR/2022/69](/broking-kyc/reference/circulars/sebi-other/#sebi-ho-imd-dof2-p-cir-2022-69)).
- Price band for block deals: **±1% of the reference price** (LTP at window open or VWAP across a short reference window). ETFs added to block-deal eligibility per [NSE/CMTR/60813](/broking-kyc/reference/circulars/nse/#nse-cmtr-60813) (Feb 2024).
- **Bulk deals** are continuous-session trades where **a single client buys or sells more than 0.5% of the issued shares of a company in one day**. Bulk deals must be disclosed by the broker post-trade.
- Post-trade disclosure: **block deals on the same evening**, **bulk deals by 17:00 the same trading day** (per SEBI Master Circular for stock exchanges and clearing corps).
- Both flows have specific reporting formats — broker submits prescribed CSV / XML files via the exchange member portal.
- Exchange-side surveillance monitors block-deal pricing against reference, bulk-deal accumulation patterns, and any post-trade impact concerns.
- Common compliance gotchas: bulk-deal threshold computed against issued shares (not free float), broker's responsibility to disclose even for client-driven trades, off-window trades cannot be retro-classified as block deals, and ETF eligibility post-Feb 2024.

## Conceptual overview

Block deals and bulk deals are SEBI's two structurally-different mechanisms for handling large-quantity trades that, if executed through the regular order book, would create market impact disproportionate to the genuine economic intent. **Block deals** solve the problem ahead of time: parties pre-negotiate a price (or simultaneously place matching orders within a tight band) inside a dedicated window where the order book is segregated from continuous trading, ensuring the deal doesn't move the market mid-session. **Bulk deals** solve the problem after the fact: trades happen in the normal order book but, when a single client's net position in a day crosses 0.5% of issued shares, post-trade disclosure provides transparency to other market participants who may want to react.

The two frameworks have different audiences. Block-deal participants are typically institutional — funds rotating between portfolios, promoters offloading or acquiring stakes, large strategic transactions. Bulk-deal participants can be institutional or HNI / retail (rare but possible for low-issued-share companies). The broker's responsibilities differ — block deals require active window-management and order entry within the band; bulk deals require post-trade reporting after the threshold-crossing detection.

This page covers both flows. For block deals, the operational focus is on the windows, minimum-value thresholds, and the price band; for bulk deals, the focus is on threshold detection and the disclosure cadence. Surveillance overlays both.

## 1. Block deals — operational framework

### 1.1 The two dedicated windows

| Window | Timing | Trading characteristics |
|---|---|---|
| Morning | **08:45 – 09:00 IST** | Before continuous trading begins (which starts at 09:15 after the 09:00–09:15 pre-open call auction) |
| Afternoon | **14:35 – 15:05 IST** | Concurrent with continuous trading; segregated order book for block-deal flow |

Each window operates as a distinct order book — orders entered in the block-deal window are matched against other block-deal orders, not against the regular continuous-trading order book. The matching mechanism is order-driven; both parties (buyer and seller) typically pre-coordinate and place matching orders simultaneously.

### 1.2 Minimum value threshold

Per [SEBI/HO/IMD/DOF2/P/CIR/2022/69](/broking-kyc/reference/circulars/sebi-other/#sebi-ho-imd-dof2-p-cir-2022-69) and prior SEBI block-deal circulars, the minimum threshold is **₹10 crore per trade**. The minimum applies to the total trade value (quantity × price). A trade below ₹10 crore cannot use the block-deal window — it must go through the regular continuous-trading book.

The threshold has been stable since the framework's evolution; historical changes were upward (from earlier ₹5 crore equivalent threshold to ₹10 crore) in recognition of larger institutional ticket sizes.

### 1.3 Price band

Block-deal orders must be placed within a **price band of ±1% of the reference price**. The reference price is typically defined as one of:

- The previous day's closing price (morning window),
- The current trading day's VWAP through some short window prior to 14:35 (afternoon window),
- The latest traded price (LTP) at window open (combination of above per CC operational guidance).

Orders outside the ±1% band are rejected at the exchange edge. The 1% bound is tight; large strategic block deals at significantly off-market prices cannot use the block-deal window and must use the off-market transfer mechanism via depository or use a Qualified Institutional Placement (QIP) / preferential allotment process instead.

### 1.4 Order flow within the window

Within the block-deal window:

1. Both parties (typically institutional) coordinate ahead of the window — agree on price, quantity, and the timing of order entry.
2. At the window open, both parties' brokers enter matching limit orders (one buy, one sell) at the agreed price.
3. The exchange's block-deal order book matches the orders; trade confirmation is generated.
4. Trade is captured separately for post-trade disclosure.
5. Outside the window, the trade is settled through normal T+1 cash-market settlement.

The deal is a "block deal" by virtue of being routed through the dedicated window with the bona-fide ≥ ₹10 crore size; the post-trade settlement is identical to any other cash-segment trade.

### 1.5 ETF block-deal extension (Feb 2024)

Per [NSE/CMTR/60813](/broking-kyc/reference/circulars/nse/#nse-cmtr-60813) (Feb 2024), ETFs were added to the block-deal-eligible instrument set per [SEBI/HO/IMD/DOF2/P/CIR/2022/69](/broking-kyc/reference/circulars/sebi-other/#sebi-ho-imd-dof2-p-cir-2022-69). Same minimum ₹10 crore threshold, same ±1% price band, same windows. ETFs ≥ ₹25 crore can alternatively use direct redemption / subscription with the AMC.

### 1.6 T+0 block deals

Per [SEBI/HO/MRD/POD-3/P/CIR/2024/172](/broking-kyc/reference/circulars/sebi-other/#sebi-ho-mrd-pod-3-p-cir-2024-172) (Dec 2024), the T+0 expansion (top 500 scrips, effective Jan 31, 2025) includes an **optional block deal window** for T+0. Operational details — exact timing, settlement same evening — are managed per the T+0 framework. Most institutional flows still default to T+1 unless specifically opting into T+0.

## 2. Block-deal post-trade reporting

### 2.1 Disclosure cadence

Block deals must be reported to the exchange and disclosed publicly on the **same evening of the trade**. The exchange's website publishes the day's block-deal list with:

- Buyer / seller identity (or PAN-masked variant per regulatory norm),
- Quantity,
- Price,
- Trade value.

The disclosure timeline is tight — typically by 18:00 IST or end of the trading day. The exchange's block-deal disclosure page becomes a public dataset used by market participants and the financial press.

### 2.2 Broker's reporting obligation

The broker submits a block-deal report via the exchange member portal in the prescribed format. Key fields:

- Trade reference number,
- Client UCC,
- Buy / sell flag,
- Symbol / ISIN,
- Quantity,
- Price,
- Trade value,
- Counterparty (if available),
- Block-deal window identifier (morning / afternoon).

Both buyer's and seller's brokers submit. The exchange reconciles the two submissions; mismatches trigger follow-up by exchange operations.

### 2.3 Settlement linkage

The block-deal trade flows into the T+1 settlement cycle alongside other cash-segment trades. The clearing corp's settlement files include block-deal trades in the standard pay-in / pay-out flows. No special clearing operations are required.

## 3. Block-deal pre-trade controls (broker side)

The broker's OMS / RMS implements specific pre-trade controls for block-deal orders:

| Control | Description |
|---|---|
| Window-restricted entry | Block-deal orders accepted only during the two daily windows |
| Minimum-value check | Reject orders below ₹10 crore unless the broker has a flag override (rare; only for special cases) |
| Price-band validation | Compute reference price; reject orders outside ±1% band |
| UCC and segment validation | Block-deal-flagged client; segment activated; standard pre-trade gates (margin, MWPL, surveillance) |
| Audit-trail tagging | Mark order as block-deal flow; preserve for post-trade reporting |

Block deals do not bypass the standard pre-trade gates — they still pass through segment / margin / MWPL / order-type / surveillance gates per the standard pre-trade RMS pipeline (see [OMS internals deep dive](/broking-kyc/deep-dives/trading-day/oms-internals/)).

<Aside type="note">
**Block-deal margin is full upfront margin like any other CM trade.** The block-deal window doesn't reduce margin requirements; the client must have full SPAN+ELM (or 20% flat alternative per [NSE/INSP/45565](/broking-kyc/reference/circulars/nse/#nse-insp-45565)) margin available at order entry. For ₹100-crore-plus block-deals, this typically translates to ₹15-20 crore margin reservation — institutional clients carry sufficient margin headroom; retail clients almost never participate in block deals.
</Aside>

## 4. Bulk deals — operational framework

### 4.1 The 0.5% threshold

A bulk deal is defined as: **a single client's net purchase or net sale of more than 0.5% of the number of issued shares of a listed company in a single trading day across all market segments**. The threshold is computed:

- Per **client** (UCC),
- Per **company** (symbol),
- Per **trading day** (intraday net position),
- Across **all exchanges** where the security trades (NSE, BSE).

The threshold is **0.5% of issued shares**, not of free float. For companies with large promoter holdings, the bulk-deal threshold can be triggered at much lower absolute share quantities than the free float would suggest.

### 4.2 Bulk-deal disclosure cadence

The broker must disclose bulk deals to the exchange **by 17:00 IST the same trading day**. The exchange publishes the day's bulk-deal list publicly the same evening.

### 4.3 Computation

The 0.5% computation operates on net position, not gross trades. A client buying 1% and selling 0.4% net 0.6% — exceeds threshold. A client buying 1% and selling 0.6% net 0.4% — does not exceed threshold. The broker's back-office computes this at EOD across all the day's trades for each client.

### 4.4 Bulk-deal disclosure content

The disclosure includes:

- Client identity (PAN-disclosed at exchange level; press release typically uses name),
- Buy / sell direction,
- Quantity,
- Average price,
- Symbol / ISIN.

The exchange's bulk-deal page is a public dataset reflecting all bulk deals by all members for the day.

### 4.5 Sub-cases — bulk on bulk

A single client may have multiple bulk-deal-qualifying positions in a single day across multiple symbols. Each is disclosed separately.

A single trade can be both a block-deal and contribute to a bulk-deal threshold: a single ₹50-crore institutional trade on a small-cap stock crosses both the block-deal minimum and possibly the 0.5% bulk-deal threshold. The block-deal disclosure and bulk-deal disclosure are both required.

## 5. Comparative reference

| Feature | Block deal | Bulk deal |
|---|---|---|
| Where it trades | Dedicated 08:45–09:00 / 14:35–15:05 window | Continuous trading session |
| Order book | Segregated block-deal book | Regular order book |
| Minimum size | ₹10 crore per trade | 0.5% of issued shares per client per day |
| Price band | ±1% of reference price | Regular price band of the security |
| Pre-coordination | Typically yes (institutional pairs) | Not required |
| Post-trade disclosure | Same evening | Same day by 17:00 |
| Disclosure level | Buyer and seller, per trade | Per client, per company, per day |
| Settlement | T+1 (or T+0 if eligible) | T+1 (or T+0 if eligible) |
| Margin profile | Full upfront (SPAN+ELM or 20% flat) | Full upfront |
| Typical participants | Institutional pairs | HNI / institutional |

## 6. Surveillance of block and bulk deals

### 6.1 Block-deal surveillance

The exchange's surveillance system monitors block deals for:

- **Price-band integrity** — orders outside ±1% rejected at entry; surveillance flags any abnormal pattern of just-inside-band trades on a recurring basis.
- **Pre-trade information leakage** — coordination patterns that may indicate non-public information sharing; cross-exchange / cross-platform monitoring.
- **Concentration** — large promoter-stake transfers may flag for SEBI Substantial Acquisition / Insider Trading review under PIT regulations.
- **Off-window block-equivalent trades** — large trades in the continuous-trading session that are economically block-deal-like but routed through regular book to avoid disclosure. These may trigger investigation.

### 6.2 Bulk-deal surveillance

The exchange's surveillance system monitors bulk deals for:

- **Concentration patterns** — repeated bulk-deal flagging on the same client across multiple securities,
- **Coordinated bulk deals** — multiple clients with related identities (e.g., HUFs, related parties) producing bulk deals together,
- **Bulk deal preceding corporate-action announcements** — possible insider trading; PIT enforcement review,
- **Bulk-deal absence where expected** — if a known large-position transfer occurred via off-market path bypassing bulk-deal disclosure, surveillance investigates.

### 6.3 Manipulation patterns near block / bulk deals

A documented manipulation pattern is **front-running or piggy-backing on block deals** — a third party with advance knowledge of the block-deal price / timing trades in the regular continuous session to profit from the inevitable market impact. The exchange's surveillance monitors for this; the broker's institutional-mechanism surveillance (per Chapter IVA) must also detect any internal pattern of employee / authorised-person trades preceding the broker's block-deal clients' trades.

<Aside type="caution">
**Block-deal-adjacent front-running is one of the most regulator-attention-attracting patterns in surveillance.** The pattern is: an employee or authorised-person learns of an institutional client's pending block deal (informally or via system access) and trades in the regular session to profit from the post-block-deal price move. Detection requires correlating employee / AP trades against client block deals with sub-day time-lags. Brokers must maintain a strict designated-person list, pre-clearance for personal trading, and trading-window-closure mechanisms per the [PIT framework](/broking-kyc/operations/compliance-blueprint/#surveillance-30-entries) row SURVEILLANCE-010.
</Aside>

## 7. Broker's reporting obligations — consolidated

The broker's reporting obligations across block and bulk deals:

| Item | Frequency | Cut-off | Channel |
|---|---|---|---|
| Block-deal trade report | Per block-deal trade | Same evening | Exchange member portal |
| Bulk-deal disclosure | Per client crossing 0.5% in a day | By 17:00 same day | Exchange member portal |
| Block-deal client surveillance | Continuous | Real-time | Internal surveillance dashboard; broker-institutional-mechanism log |
| Bulk-deal client surveillance | Continuous | EOD review | Internal surveillance dashboard; SOR (Surveillance Obligation Report) |
| Post-trade reconciliation | Daily | EOD | Internal back-office |

The reporting formats are prescribed by the exchanges and updated periodically. Brokers must subscribe to the exchange's Notices & Circulars feed to catch format updates.

## 8. Common compliance gotchas

### 8.1 Bulk-deal threshold uses issued shares, not free float

A frequent error: computing the 0.5% threshold against free float rather than total issued shares. For a company with 60% promoter holding and 40% free float, the 0.5%-of-issued-shares threshold is 1.25% of free float. A client crossing 1% of free float may not trigger bulk-deal disclosure if it's only 0.4% of issued shares; conversely, a client at 0.6% of issued shares crosses the threshold even though it's only 1.5% of free float.

The broker's back-office must store the issued-share count per security and use that as the denominator. The issued-share count changes on corporate actions (bonus, split, rights, buyback); the back-office must refresh the figure on each CA effective date.

### 8.2 Bulk deal disclosure is the broker's responsibility, not the client's

Even if the client is unaware that their trades cross the 0.5% threshold (typical for HNI clients managing multiple positions), the broker has the disclosure obligation. The broker's back-office must compute the threshold at EOD and flag any client positions that need disclosure, then file by the 17:00 cutoff.

### 8.3 Off-window trades cannot be retro-classified as block deals

A trade that happens in the regular continuous session — even if it has the value and pre-coordination of a block deal — cannot be reclassified after-the-fact as a block deal. The block-deal disclosure has specific procedural requirements (window, dedicated book, ±1% band) that cannot be retrofitted.

### 8.4 Cross-exchange aggregation

The 0.5% bulk-deal threshold is computed across all exchanges where the security trades. A client buying 0.4% on NSE and 0.3% on BSE — net 0.7% — crosses the threshold. The broker's back-office must aggregate across NSE and BSE trades for the same UCC.

### 8.5 PIS NRI clients and block / bulk deals

NRI clients via PIS route have additional restrictions (delivery-only, no intraday, separate position limits). Their participation in block deals is permitted but carries the PIS limit / sectoral cap considerations. Post the Sep 2025 CP-code removal ([SEBI/HO/MIRSD/MIRSD-PoD/P/CIR/2025/109](/broking-kyc/reference/circulars/sebi-mirsd/#sebi-ho-mirsd-mirsd-pod-p-cir-2025-109)), NRI block-deal handling is direct broker-side.

### 8.6 ETF block deals and direct subscription with AMC

ETFs ≥ ₹25 crore can use direct subscription / redemption with the AMC instead of the block-deal window per [NSE/CMTR/60813](/broking-kyc/reference/circulars/nse/#nse-cmtr-60813). The two routes have different operational paths — direct-subscription bypasses the secondary market entirely; block-deal window is on the secondary market.

### 8.7 T+0 block deals are a separate flow

The T+0 optional block-deal window per [SEBI/HO/MRD/POD-3/P/CIR/2024/172](/broking-kyc/reference/circulars/sebi-other/#sebi-ho-mrd-pod-3-p-cir-2024-172) operates on the T+0 expansion (top 500 scrips). Brokers must distinctly flag T+0 block-deal orders in the OMS and route them through the T+0 settlement cycle.

### 8.8 Block deals on suspended / GSM-IV / ASM securities

Block deals are not exempt from surveillance restrictions. A security in GSM Stage IV (periodic call auction only) cannot have block deals (no continuous-trading mechanism). A security in ASM Stage II with 100% upfront margin still requires that margin for block-deal orders.

## 9. Back-office accounting for block and bulk deals

### 9.1 Block deal

Block-deal entries are standard cash-segment trade entries:

- Debit / credit the trading client's funds ledger,
- Debit / credit the trading client's securities ledger,
- Compute brokerage at the agreed rate (often discounted for block-deal flows because they're institutional),
- Compute STT, exchange transaction charges, GST, stamp duty,
- Contract note generated per standard ECN flow.

The brokerage on block deals is typically negotiable — institutional clients receive lower-bps rates than retail. The broker tracks block-deal revenue separately for internal MIS.

### 9.2 Bulk deal

Bulk deals are individual trades aggregated to the 0.5% threshold. Each underlying trade is booked normally; the bulk-deal status is a *reporting* event, not a separate accounting event. The post-trade aggregation produces the disclosure but doesn't change the ledger entries.

### 9.3 Block-deal trade vs bulk-deal trade — same trade, two disclosures

A single block-deal trade that also crosses the 0.5% bulk-deal threshold needs both disclosures (block on the same evening, bulk by 17:00 same day). Each disclosure has its own format and submission channel; the broker must produce both files.

## 10. The block-deal window as a separate OMS lane

For high-volume retail brokers, the block-deal window (08:45–09:00, 14:35–15:05) sees concentrated institutional activity that can crowd the retail OMS pipeline. Operationally, some brokers route block-deal orders through a separate OMS lane or a dedicated FIX session to insulate retail order flow from any latency impact during the window.

This is `[industry typical]` operational architecture, not a regulatory requirement. The motivation is product-experience — retail clients should not see a slowdown during 14:35–15:05 because of block-deal traffic.

<Aside type="tip">
**Block deals are an outsized revenue line on a per-trade basis.** A ₹100-crore block deal at 1 bps brokerage is ₹1 lakh in revenue — equivalent to a few thousand retail trades. Brokers with strong institutional sales arms allocate dedicated front-office and back-office resources to block-deal flows. The economics justify a dedicated institutional desk with experienced dealers, FIX-engine infrastructure, and surveillance integration.
</Aside>

## Sub-cases / edge cases

- **Pre-IPO listing-day block deals.** IPOs typically have pre-determined anchor-investor allocations that, post-listing, may need to rotate through block-deal windows. The first 3 days of trading post-listing typically have specific surveillance treatment under [NSE/CMTR/63915](/broking-kyc/reference/circulars/nse/) / [SEBI/HO/MRD/MRD-PoD-3/P/CIR/2024/85](/broking-kyc/reference/circulars/sebi-other/) — extended pre-open call auction, no upper price band relaxation. Block deals on listing day are subject to these conditions.
- **Buy-back tender block deals.** Companies running buy-back via the tender route may not need a block deal — the tender itself is a separate settlement calendar (per [NCL/CMPT/63561](/broking-kyc/reference/circulars/clearing-corps/)). For open-market buy-backs, individual large trades may flag as bulk deals.
- **Corporate action ex-date block deals.** A block deal preceding an ex-date for a dividend, bonus, or split must be priced relative to the cum-dividend (or pre-action) reference; the broker / exchange handles the price-band adjustment. Some surveillance flags trigger for block deals that appear timed to extract corporate-action benefit.
- **Cross-exchange block deals.** A single client may simultaneously execute block deals on NSE and BSE for the same security (e.g., to spread liquidity). Both are separately disclosable.
- **Anchor-investor lock-in expiry.** The expiry of anchor-investor lock-ins post-IPO often produces clustering of block deals on a specific date. Brokers managing the unwinds typically coordinate block-deal entries across multiple windows.
- **Promoter sale via OFS.** Offer for Sale (OFS) is a separate mechanism from block deal — promoter sells via the OFS window with its own price-discovery and timing rules. OFS is more flexible than block deals for large promoter stake adjustments.
- **Block deal across segments?** Block deals are primarily a cash-segment construct. ETF block deals (post Feb 2024 per [NSE/CMTR/60813](/broking-kyc/reference/circulars/nse/#nse-cmtr-60813)) extend the framework to ETFs. F&O has its own large-trade frameworks (negotiated trades) but not a "block-deal" window in the same sense.
- **SLB block deals?** SLB transactions are not block deals; SLB is a separate framework on the SLBS segment.
- **MTF block deals?** MTF flows are not block deals by definition (MTF is a margin-funded purchase by the broker on the client's behalf). MTF buy-side trades typically use the regular continuous session.

## Practical notes

- **[gotcha]** The bulk-deal threshold of 0.5% applies to *issued* shares, not *free float*. This trips up new compliance analysts who default to free float (because that's what most analyst databases publish). The broker's back-office must use the issued-share count and refresh on each corporate action affecting share capital.
- **[industry practice]** Most large brokers maintain a daily "block-deal calendar" that institutional sales coordinates with the buy-side and the broker's settlement team — pre-window confirmations of pricing and timing, post-trade reconciliation, and revenue tracking. The calendar is a soft control but a high-leverage one for institutional revenue management.
- **[cost optimization]** Block-deal disclosure CSVs are small; submitting them manually each evening is feasible. The work doesn't justify the investment in heavy automation unless the broker is doing tens of block deals per day. Bulk-deal threshold computation, by contrast, must be automated because the 0.5% computation across hundreds of clients and dozens of symbols at EOD is not a manual task.
- **[risk trade-off]** Tight pre-trade enforcement of the ±1% price band reduces the chance of out-of-band rejections during the block-deal window but requires accurate reference-price computation. Brokers using a stale or delayed LTP feed may reject legitimate block-deal orders. The fix is to subscribe to the exchange's live LTP feed and recompute the band at order entry, not at order submission.
- **[gotcha]** When a block deal trade is part of a chain of unwinds (e.g., a fund liquidating multiple holdings on the same day via multiple block deals), each block-deal trade is separately disclosable but the surveillance system may flag the aggregated pattern. The broker's institutional desk should pre-brief surveillance about expected high-block-deal-volume days.
- **[industry practice]** Brokers with strong institutional desks often offer block-deal coordination as a value-added service — finding buyers / sellers, negotiating the price, coordinating the window-timing. This is institutional sales work, not OMS work, but the broker's reputation in the block-deal market becomes a competitive differentiator.
- **[cost optimization]** Block-deal-specific surveillance rules can ride on the broker's standard surveillance system — the rule library extension is incremental rather than rebuild. Most surveillance vendors include block-deal-specific rule packs out-of-box.
- **[risk trade-off]** A broker handling a large institutional block-deal client carries concentrated revenue risk — losing the client (which can happen if a competitor offers tighter execution or better post-trade service) materially impacts the broker's quarterly revenue. Most large brokers diversify the institutional block-deal client base actively.

## Cross-references

- [Integration DAG: Trading hours](/broking-kyc/operations/integration-dag/trading-hours/) — block-deal window detection node (TH-BD-WINDOW) and reporting node (TH-BD-REPORT).
- [Broker Process Narrative](/broking-kyc/broker-process/narrative/) — Section 2 mentions block-deal windows in narrative.
- [Compliance Blueprint — Surveillance domain](/broking-kyc/operations/compliance-blueprint/#surveillance-30-entries) — block-deal-window compliance row SURVEILLANCE-019.
- [Compliance Blueprint — Settlement domain](/broking-kyc/operations/compliance-blueprint/#settlement-22-entries) — block-deal settlement row SETTLEMENT-012.
- [Deep Dive: OMS internals](/broking-kyc/deep-dives/trading-day/oms-internals/) — block-deal pre-trade controls in the OMS.
- [Deep Dive: SPAN methodology](/broking-kyc/deep-dives/trading-day/rms-span-methodology/) — block-deal margin requirements (full upfront margin).
- [Deep Dive: Surveillance, GSM, ASM](/broking-kyc/deep-dives/trading-day/surveillance-norms-gsm-asm/) — surveillance of block / bulk deals and the PIT framework.
- [Deep Dive: Short-delivery auction](/broking-kyc/deep-dives/trading-day/short-delivery-auction/) — short-delivery handling applies to block-deal settlement.
- [Deep Dive: Retail algo framework](/broking-kyc/deep-dives/trading-day/retail-algo-framework/) — algo participation in block-deal windows.
- [SEBI other circulars — block deal framework](/broking-kyc/reference/circulars/sebi-other/#sebi-ho-imd-dof2-p-cir-2022-69) — [SEBI/HO/IMD/DOF2/P/CIR/2022/69](/broking-kyc/reference/circulars/sebi-other/#sebi-ho-imd-dof2-p-cir-2022-69).
- [NSE circulars — ETF block-deal extension](/broking-kyc/reference/circulars/nse/#nse-cmtr-60813) — [NSE/CMTR/60813](/broking-kyc/reference/circulars/nse/#nse-cmtr-60813).
- [SEBI other circulars — T+0 expansion with optional block-deal window](/broking-kyc/reference/circulars/sebi-other/#sebi-ho-mrd-pod-3-p-cir-2024-172) — [SEBI/HO/MRD/POD-3/P/CIR/2024/172](/broking-kyc/reference/circulars/sebi-other/#sebi-ho-mrd-pod-3-p-cir-2024-172).
- [Vendor Atlas — OMS / Trading Platforms](/broking-kyc/vendors/atlas/#oms-ems-trading-platforms-15-products) — vendor support for institutional block-deal flow.

## Verified through

2026-05-14

---

*AI-generated and not legal, financial, or compliance advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*

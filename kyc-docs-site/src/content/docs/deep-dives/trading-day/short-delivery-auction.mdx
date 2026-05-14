---
title: "Deep Dive: Short Delivery and the T+2 Auction"
description: Walkthrough of the short-delivery auction mechanism — when triggered, T+2 morning auction mechanics, auction price discovery, close-out pricing under SEBI's Dec 2024 master circular, the penalty cascade per NCL / ICCL / MCXCCL circulars, broker remediation paths (cover in open market vs accept auction), reporting to the client, and the back-office accounting entries.
---

import { Aside } from '@astrojs/starlight/components';

> **Why this page is structured this way:** Short delivery is one of the visible failure modes in cash-market settlement — when a selling broker can't deliver shares on pay-in, the buyer's settlement obligation must be honoured anyway, so the clearing corp acquires the shortfall through an auction. The page is structured chronologically across the failure: detection at pay-in (T+1), auction call on T+2, price discovery and settlement, broker remediation, client communication, and back-office accounting. Two reference sections cover the penalty grids and the edge cases (CC vs internal shortage, G-Secs, corporate actions).

## TL;DR

- When a seller's broker fails to deliver securities at pay-in on **T+1**, the clearing corp conducts a **T+2 morning auction** to acquire the shortfall and complete the buyer's settlement.
- Auction is conducted by the clearing corp for **both CC shortages and internal shortages** (per [NCL/CMPT/71045](/broking-kyc/reference/circulars/clearing-corps/#nclcmpt71045) / [NCL/CMPT/71441](/broking-kyc/reference/circulars/clearing-corps/#nclcmpt71441), referring back to CMPT66688 dated Feb 14, 2025).
- **Close-out price** for unsuccessful auctions = **higher of (a) the highest scrip price in the settlement-to-auction-date window OR (b) 20% above the latest closing on the auction-call day** per SEBI's master circular [SEBI/HO/MRD-PoD2/CIR/P/2024/00181](/broking-kyc/reference/circulars/sebi-other/#sebihomrd-pod2cirp202400181) (Dec 30, 2024).
- The failing broker pays the **auction difference** (auction price − settlement price), plus the **20% close-out markup** if auction fails, plus per-CC penalty / interest charges.
- **Direct-payout-to-demat** (effective Nov 2024 phased Jan–Feb 2025 per [NCL/CMPT/63669](/broking-kyc/reference/circulars/clearing-corps/) and [NCL/CMPT/66779](/broking-kyc/reference/circulars/clearing-corps/)) means internal-shortage valuation is at settlement price + 20% mark by noon on settlement day for the member to clear.
- Broker remediation options: **cover in open market** before auction call to avoid penalty; **accept auction outcome** if no open-market liquidity. Most brokers prefer cover-in-open-market for known shorts.
- **Repeated short-delivery patterns are a surveillance flag** and possible cause for suspension under [NSE/INSP/53530](/broking-kyc/reference/circulars/nse/) penalty grid.
- Back-office entries: debit short-delivering client (auction cost + close-out + penalty), credit the auction-buying party, account for the broker's own pay-in to the CC.

## Conceptual overview

T+1 settlement (default since Jan 27, 2023, per [SEBI/HO/MRD2/DCAP/CIR/2021/0598](/broking-kyc/reference/circulars/sebi-other/)) means every trade executed today produces a settlement obligation tomorrow morning — funds out from buyers, securities out from sellers. The clearing corp nets across all members and runs the pay-in / pay-out cycle. If, on pay-in, a member fails to deliver securities (or funds) for a netted-short position, the clearing corp's commitment to the buyer must still be honoured. The mechanism: **auction**. The clearing corp puts the shortfall to auction on T+2 morning, offering the securities to other members who can deliver. Successful auctions complete the buyer's settlement at the auction price; unsuccessful auctions are closed out at a defined formula.

The failing broker pays for all of this. The economics are designed to make short-delivery unattractive: the broker pays the auction price (typically higher than settlement price for an illiquid security), pays a 20% mark-up on the close-out price if auction fails, may face additional penalty / interest charges, and accumulates a surveillance flag that escalates with frequency.

A chronic auction pattern at a broker is both a financial cost (auction premia compound quickly) and a regulatory concern (inspection trigger, possible suspension). Most retail brokers run a strict pre-pay-in reconciliation — knowing each evening what positions need delivery the next morning — and cover any anticipated shorts in the open market before the auction call wherever feasible.

## 1. When auction is triggered

### 1.1 Member-level shortfall ("CC shortage")

The simplest case: a member is net-short across all its clients in a particular security on a particular settlement day. The member fails to deliver the netted-short quantity at pay-in. The clearing corp's books show a shortfall against the netted-buy members; auction is conducted for the shortfall quantity.

### 1.2 Internal shortage

A more common case at retail brokers: at the member level, the member is net-flat in a security (some clients are net-buy, others are net-sell, the netted quantity is zero), but **internally**, the clients' positions don't line up. Specifically, a selling client's securities aren't in the broker's pool to deliver — perhaps the client sold a security they never had (a regulatory issue) or the security is locked in a pledge / MTF pool, or the broker's internal settlement misreconciled.

In the pre-direct-payout regime, internal shortage didn't always trigger CC-level auction because the broker could net internally. Post the SEBI Jun 5, 2024 direct-payout-to-demat circular ([SEBI/HO/MIRSD/MIRSD-PoD1/P/CIR/2024/75](/broking-kyc/reference/circulars/sebi-mirsd/#sebihomirsdmirsd-pod1pcir202475)) and the implementing [NCL/CMPT/63669](/broking-kyc/reference/circulars/clearing-corps/), **internal shortage is now also auction-eligible** — the CC conducts the auction even when the member is net-flat (per [NCL/CMPT/71045](/broking-kyc/reference/circulars/clearing-corps/#nclcmpt71045) and FAQ [NCL/CMPT/71441](/broking-kyc/reference/circulars/clearing-corps/#nclcmpt71441) referring back to CMPT66688 of Feb 14, 2025).

This is a structural change: direct-payout-to-demat eliminated the broker's internal netting, exposing internal shortages to the same auction mechanism that previously only applied to CC shortages. The broker's responsibility increases — every selling client must have the securities physically available in the broker's pool / CUSPA at pay-in.

### 1.3 G-Sec and corporate-action scenarios

Per clause 7.13(iv) of [NCL/CMPT/67751](/broking-kyc/reference/circulars/clearing-corps/) (Apr 29, 2025), close-out for internal shortage where the valuation debit is unpaid by the member, and close-out for G-Secs and corporate-action scenarios, are handled by the member directly rather than through auction. The mechanics are similar (the close-out price formula applies), but the procedural path differs.

## 2. The T+2 auction mechanics

### 2.1 Timeline

| Day | Time (typical) | Event |
|---|---|---|
| T (trade day) | 09:15–15:30 | Trade executed; settlement obligation accrues |
| T+1 | 10:00–11:30 | Pay-in window; securities and funds settle |
| T+1 | 11:30 | Pay-in cut-off; shortfalls identified |
| T+1 | Evening | Shortage notice published by CC; member intimated |
| T+2 | 08:00–10:00 | Auction conducted (specific timings vary by CC and segment) |
| T+2 | 10:00–10:30 | Auction settlement: pay-in / pay-out among auction participants |
| T+2 | Same day | Close-out for unsuccessful auction (where applicable) |
| T+2 | Day-end | Failing broker debited the auction cost; affected clients notified |

Specific timings can shift on holiday-impacted weeks. Example: [NCL/CMPT/72224](/broking-kyc/reference/circulars/clearing-corps/#nclcmpt72224) (Dec 2025) revised the T+1 schedule for the Jan 15, 2026 Maharashtra municipal-corporation election settlement holiday — auction (settlement type A 2026009) pay-in 08:00 / pay-out 10:00 on Jan 16, 2026 (the next working day).

### 2.2 Auction price discovery

The auction is a **call auction** mechanism. Members willing to deliver the auctioned security submit offer prices and quantities during the auction window. The CC matches offers against the buy-side obligation, accepting the lowest offers first up to the required quantity.

Key features:
- **Price range** — the auction has a wide price range (typically a multiple of normal price band) to allow members to set realistic offer prices for illiquid stocks. The band is set by the CC for each auction.
- **Open auction** — typically open-outcry style with offer prices visible to all participants during the auction window.
- **Settlement at auction price** — successful auctions complete the buyer's settlement at the auction-cleared price. The auction price replaces the original settlement price for the buyer's purposes.
- **Auction difference** — the CC charges the failing broker the **auction price − original settlement price** as auction difference. The auction-supplying member receives this difference (or part of it; structure varies by CC).

### 2.3 Auction file flow

Per [NCL/CMPT/71441](/broking-kyc/reference/circulars/clearing-corps/#nclcmpt71441), the auction settlement is captured in:
- **Auction Delivery P_0000** — unsuccessful internal auction close-outs,
- **F_0000** — CC shortage close-out, CA close-out, non-actionable BL / G-Sec close-out, auction pay-in shortage close-out,
- **EquityT1 Delivery F_0000** — for trade-for-trade securities.

These files arrive in the broker's clearing-corp SFTP folder at the auction-settlement window; the back-office consumes them for ledger entries.

## 3. Close-out price formula

Per SEBI's master circular [SEBI/HO/MRD-PoD2/CIR/P/2024/00181](/broking-kyc/reference/circulars/sebi-other/#sebihomrd-pod2cirp202400181) (Dec 30, 2024), the close-out price for an unsuccessful auction (where no member offered to deliver the security at any price) is:

```
Close-out price = higher of:
   (a) highest scrip price in the window from settlement date 
       (T+1) to auction-call date (T+2)
   (b) 20% above the latest closing price on the auction-call day (T+2)
```

The 20% mark-up on close-out is the structural penalty for the failing broker — it ensures the buying party is compensated at a meaningful premium for the settlement delay and the price uncertainty.

Note: For T+0 settlements (top 500 scrips per [SEBI/HO/MRD/POD-3/P/CIR/2024/172](/broking-kyc/reference/circulars/sebi-other/#sebihomrdpod-3pcir2024172) and [SEBI/HO/MRD/MRD-PoD-3/P/CIR/2024/20](/broking-kyc/reference/circulars/sebi-other/#sebihomrdmrd-pod-3pcir202420)), the close-out flow has a separate timeline because settlement must complete same day.

### 3.1 Worked example

**Setup:** A broker is short 1,000 shares of XYZ at settlement. Original trade settlement price was ₹100. Pay-in fails; auction is called on T+2.

- Auction window opens; no offers received (illiquid stock).
- Auction fails — no member wanted to deliver.
- Auction closes at no match.
- Close-out computation:
  - Highest scrip price in T+1 to T+2 window: ₹108
  - 20% above T+2 closing (T+2 closing = ₹105 → ₹105 × 1.2 = ₹126)
  - Close-out price = max(108, 126) = ₹126

**Failing broker pays:** (₹126 − ₹100) × 1,000 = ₹26,000 close-out charge.

Plus any per-CC penalty charges (typically a percentage of the close-out value or an absolute amount per occurrence).

### 3.2 Auction-settled (not close-out) example

**Setup:** Same broker short 1,000 shares of ABC at settlement price ₹100. Pay-in fails. Auction called on T+2.

- Two members offer to deliver at ₹103 and ₹104 respectively.
- CC matches the ₹103 offer for the full 1,000 quantity.
- Auction successful.

**Failing broker pays:** (₹103 − ₹100) × 1,000 = ₹3,000 auction difference.

The buying side completes settlement at ₹100; the difference between ₹103 and ₹100 is the auction premium paid by the failing broker (received by the auction-supplying member).

## 4. Penalty cascade per clearing-corp circulars

### 4.1 NCL / NSCCL

[NCL/CMPT/61800](/broking-kyc/reference/circulars/clearing-corps/#nclcmpt61800) (CM master) and successor [NCL/CMPT/67751](/broking-kyc/reference/circulars/clearing-corps/) define the cash-segment penalty flows. Key items:

| Item | Description |
|---|---|
| Auction difference | Failing broker pays auction price − settlement price |
| Close-out markup | 20% above latest close on auction-call day (or highest in window, higher of) |
| Penalty / interest charges | Per-occurrence charges; CC may impose additional charges for repeated shortfall |
| Surveillance flag | Repeated short-delivery triggers NSE Inspection / SEBI review |

The penalty cascade is enforced by direct debit to the failing broker's settlement account at the CC.

### 4.2 ICCL

ICCL operates equivalent mechanics. The Feb 2025 pilot of direct-payout-to-demat at ICCL (per ICCL 20250214-69) extended auction-eligibility to internal shortages on ICCL similarly to NCL.

### 4.3 MCXCCL

MCX cash-equivalent flows are smaller-volume but operationally similar; MCX/MCXCCL/805/2020 covers the framework with subsequent updates.

### 4.4 NSE Inspection grid

Repeated short-delivery instances flow into the [NSE/INSP/53530](/broking-kyc/reference/circulars/nse/) penalty grid — typically starting at Rs 5,000–10,000 per default with escalating slabs.

## 5. Broker remediation paths

When the broker realises (typically during T+1 pre-pay-in reconciliation) that a short-delivery is about to happen, two paths exist:

### 5.1 Cover in open market

The broker buys the shortfall quantity in the open market on T+1 (or in the pre-open of T+2 if discovered late) and uses the bought shares for the pay-in. Cost: market price plus brokerage + STT + statutory charges. Compared to auction outcome:

- If the open-market price is below the projected auction price → cover-in-market saves cost.
- If the open-market price is above the projected auction price → auction is cheaper (rare).
- If the security is illiquid → cover-in-market may not be feasible.

Most large brokers prefer cover-in-market for known shorts because:
- Auction outcome is uncertain (close-out at 20% markup is a worst-case),
- Surveillance flag is avoided,
- Client communication is cleaner (the trade settles normally).

### 5.2 Accept auction outcome

If the broker cannot cover (illiquid security, market closed, operational error discovered too late), the broker accepts the auction. The broker debits the failing client(s) the auction cost plus close-out markup; cleared through the back-office.

### 5.3 Self-auction (delivery via self-auction)

In some scenarios, the broker can deliver via a self-auction route — the broker's own arbitrage or prop desk supplies the shortage via the auction mechanism. This is a specialised flow; not all brokers have the capability or willingness.

### 5.4 Pre-pay-in operational discipline

The best remediation is prevention. Broker back-office runs an evening reconciliation pulling:
- Each client's net position by security,
- Each client's available holdings in the demat / CUSPA pool,
- Pledged / locked positions that can't be delivered,
- MTF-funded positions where pledge release is needed.

A reconciliation gap = an anticipated short. The compliance / settlement team has the evening to remediate (notify client, request inventory, pre-fund a pledge release, or initiate cover-in-market) before the next-day pay-in cut-off.

<Aside type="tip">
**Pre-pay-in reconciliation is the single highest-leverage operational discipline in the settlement function.** The cost of a clean reconciliation is two-to-three hours of evening compute and analyst review; the cost of missing a short is the auction difference plus close-out markup, which on a moderate-illiquidity security can be 25–30% of trade value. Brokers that build robust evening reconciliation pipelines see their auction frequency drop dramatically — from multiple per week at start to a handful per quarter at maturity.
</Aside>

## 6. Reporting to the client

When a client is the cause of a short-delivery (the client sold securities they don't actually hold, or a pledge release didn't process in time), the broker debits the client for the auction-related costs and reports the event:

- **Contract note adjustment** — the original trade contract note shows the original price; an auction adjustment is reflected as a separate ledger entry / contract note addendum.
- **SMS / email notification** — DLT-template-aligned notification informing the client of the short-delivery, the auction outcome, and the client's debit.
- **Statement of account** — quarterly statement reflects the adjusted ledger.
- **Investor charter** — repeated auction-debits trigger client-grievance escalation; client may complain via SCORES.

For ambiguous cases (broker-side operational error vs client-side responsibility), the broker may absorb the cost rather than debit the client — a customer-experience cost the broker accepts to avoid grievance escalation.

### 6.1 Direct-payout-to-demat and client clarity

The direct-payout-to-demat regime means clients see their settled securities arrive directly in their demat. If short-delivery causes the buying client not to receive their securities on the expected day, the client sees an obvious gap. The broker must communicate proactively — most retail brokers add a status note explaining the auction outcome and expected updated settlement timeline.

## 7. Back-office accounting

The back-office entries for a short-delivery event:

### 7.1 At trade booking (T)

Standard trade booking; no special entries.

### 7.2 At pay-in (T+1)

Pre-pay-in reconciliation may flag the anticipated short. If covered via open-market purchase:
- Debit: broker's pool account, Credit: client (purchase entry),
- Debit: client (cost of cover), Credit: client's funds ledger.

If not covered:
- Pay-in obligation goes unmet; the CC's auction process initiates.

### 7.3 At auction (T+2)

Per the auction settlement file:
- Debit: broker's settlement account at the CC (auction cost),
- Credit: clearing-bank account,
- Debit: client (auction cost + close-out + penalty),
- Credit: broker's recovery account (if client doesn't pay).

If the auction price is **lower** than the original settlement price (rare; usually a market-driven dip), the CC may credit the difference back; the broker passes this through or retains per its policy.

### 7.4 Penalty and interest

- Debit: broker's penalty expense account,
- Credit: clearing-bank account.

Penalty cannot be passed on to clients per [NSE/INSP/64315](/broking-kyc/reference/circulars/nse/#nseinsp64315) (the broker absorbs the penalty), but the underlying auction cost can be passed to the responsible client.

### 7.5 Reporting outputs

- Auction-cost MIS — broker tracks auction frequency, cost, root cause per month,
- Compliance MIS — repeated auction patterns flag the surveillance team,
- Statement-of-account — adjusted ledger to the client.

## 8. Edge cases

### 8.1 Illiquid security auctions

For very illiquid securities — penny stocks, GSM-stage-IV stocks, ESM-stage-II stocks — the auction may receive no offers at any price. Close-out then applies the formula (max of highest-in-window or 20% above close), and the failing broker pays this directly. The buying party receives funds equivalent to the close-out price rather than the securities themselves; the trade is effectively reversed at the close-out value.

### 8.2 Large-position short-delivery

When a single short-delivery is materially large (e.g., 1% of the market-wide outstanding free float), the auction may move the price during the auction window. SEBI/NSE may suspend the auction if it determines the auction itself is creating market impact, and route the close-out through an alternative mechanism. This is rare but documented.

### 8.3 Corporate-action close-out

Trades that fail to settle around an ex-date (dividend, bonus, split) have additional complexity. The close-out must adjust for the corporate-action impact — a 100-share short on a stock that's just had a 1:1 bonus is now economically 200 shares' worth. Per [NCL/CMPT/63561](/broking-kyc/reference/circulars/clearing-corps/) (buy-back settlement calendar) and [NCL/CMPT/71441](/broking-kyc/reference/circulars/clearing-corps/#nclcmpt71441), CA close-out follows the F_0000 file with appropriate adjustments.

### 8.4 G-Sec and SDL close-out

G-Sec and SDL trades have their own close-out path because the auction mechanism is less developed for these instruments. Per clause 7.13(iv) of [NCL/CMPT/67751](/broking-kyc/reference/circulars/clearing-corps/), the member handles G-Sec close-out directly with the counterparty.

### 8.5 Trade-for-Trade (T2T) auctions

T2T-segment trades, which settle gross with no intraday netting, have a higher likelihood of short-delivery because the segment is explicitly designed for high-surveillance stocks. The auction mechanism applies; EquityT1 Delivery F_0000 file captures the close-out per [NCL/CMPT/71441](/broking-kyc/reference/circulars/clearing-corps/#nclcmpt71441).

### 8.6 SLB short

A client borrowing securities via SLB (Securities Lending and Borrowing) to short-sell, and then failing to deliver, triggers both an SLB-side default and a settlement-side short. Per [NCL/CMPT/61810](/broking-kyc/reference/circulars/clearing-corps/) / [NCL/CMPT/67763](/broking-kyc/reference/circulars/clearing-corps/) SLBS master, the SLB framework has its own remediation mechanism (return-leg auction type Q) that interacts with the cash-segment auction.

### 8.7 Cross-CC scenarios

When a broker is a member of multiple clearing corps (NSCCL for NSE, ICCL for BSE, MCXCCL for MCX), shortage at one CC doesn't automatically draw on collateral at another CC. The broker must explicitly transfer cash / collateral between CCs to remediate cross-CC scenarios.

### 8.8 NRI shorts

NRI client short-deliveries are rarer but follow the standard auction path. Post the Sep 2025 CP-code mechanism removal for NRI ([SEBI/HO/MIRSD/MIRSD-PoD/P/CIR/2025/109](/broking-kyc/reference/circulars/sebi-mirsd/#sebihomirsdmirsd-podpcir2025109)), the broker handles the NRI short directly without CP-code intermediation.

### 8.9 MTF auction

For MTF-funded positions where the broker has funded the buy and the client hasn't paid, the broker can't deliver securities (they're in the broker's MTF pool / CSMFA). If the broker has further pledged these securities or there's an inventory mismatch, an MTF-related short-delivery is possible. Per [NCL/CMPT/72224](/broking-kyc/reference/circulars/clearing-corps/#nclcmpt72224), the UNPAIDMTF file upload windows are 15:30–22:00 on T-1/T and 06:30–13:00 on T pay-in day — the broker must reconcile MTF inventory through these windows.

<Aside type="caution">
**The Feb 2025 direct-payout-to-demat phase 2 (ICCL pilot) materially expanded auction scope.** Pre-Feb 2025, internal shortages at retail brokers were often resolved through internal netting and didn't reach CC auction. Post Feb 25, 2025 (ICCL phase 2) and broader rollout, internal shortages also auction-eligible — the broker can no longer hide an internal misallocation. Brokers must run client-securities reconciliation continuously and ensure each selling client has the securities physically in the broker's pool at pay-in. Auction-frequency metrics jumped at many retail brokers during this transition, requiring tighter pre-pay-in reconciliation.
</Aside>

## 9. Why short-delivery happens — root causes

A taxonomy of the typical root causes:

| Root cause | Description | Remediation |
|---|---|---|
| Mis-mapped client securities | Securities exist in the broker's pool but mapped to a different client; the selling client's holding is empty in the broker's view | Continuous client-securities reconciliation; daily holdings statement validation |
| Pledge release failure | Securities pledged to broker / lender / MTF haven't been released on time | Pledge release runbook with timing; pre-pay-in pledge inventory check |
| Short selling without inventory | Client sold securities they don't own (uncovered short on cash segment, generally not permitted but can happen via fat-finger or system bypass) | Stricter pre-trade holding-check; SLB-route the short if intentional |
| Inventory in CSMFA / MTF pool | MTF-funded positions are pledged in CSMFA; can't be delivered without unpledge | Pre-pay-in CSMFA reconciliation; staff awareness |
| Corporate-action timing | Ex-date adjustment changes the deliverable quantity (bonus, split) | CA-aware reconciliation; book the adjustment before pay-in |
| Cross-DP transfer in flight | Securities being transmitted from one BO to another, transit window catches pay-in | Pre-pay-in DP-status check; manual remediation if needed |
| Demat freeze | Securities in a frozen BO can't be delivered | KYC remediation; secondary path through unpledge-and-redeem |
| Operational error | Settlement file mis-mapped, manual processing error | Process review; root-cause analysis post-event |
| System failure | OMS / RMS / back-office did not flag the anticipated short | Reliability engineering; redundant reconciliation paths |

The taxonomy informs root-cause analysis: each event must be tagged with a root cause so the broker can track trends and invest in the highest-frequency remediation.

## Sub-cases / edge cases (additional)

- **Pay-in default cascade.** If a broker's overall pay-in fails (not just a single security short but a broad failure), the [Core Settlement Guarantee Fund (Core SGF)](/broking-kyc/reference/circulars/clearing-corps/) covers the obligation to the market; the broker faces immediate consequences — position closure, member suspension or cancellation, and recovery action by the CC against the broker's deposits and own funds. This is the worst-case scenario.
- **G-Sec close-out via NDS-RST.** G-Sec settlements run on the NDS-RST platform with its own settlement procedure (ICCL 20200201-13). Close-out for G-Sec follows a different file naming.
- **MCX commodity short-delivery (physical contracts).** Tender-period and delivery-period margins (per MCXCCL/C&S/058/2025) are higher precisely to discourage short-delivery; the auction-equivalent mechanism for compulsory-delivery contracts has its own timeline.
- **SGB (Sovereign Gold Bond) shortage.** SGB tranche settlement (ICCL 20200706-1) has segment-specific cut-offs; short-delivery is rare because SGBs are typically institutional with confirmed inventories.
- **Holiday-shifted auction.** Per [NCL/CMPT/72224](/broking-kyc/reference/circulars/clearing-corps/#nclcmpt72224), holiday-shifted T+1 schedules shift auction windows correspondingly. The Jan 15, 2026 example: auction settlement 2026009 falls on Jan 16, 2026 with pay-in 08:00 / pay-out 10:00.
- **Internal-shortage reporting field updates.** Per [NCL/CMPT/49502](/broking-kyc/reference/circulars/clearing-corps/) (referenced in narrative around 2022), members must report Field 8 — quantities delivered via auctions (incl. self-auctions); Field 9 — quantities cleared via close-out; Field 11 — purchases in member or client accounts. Submission cut-off is S+5 working days.

## Practical notes

- **[gotcha]** The most common short-delivery root cause at retail brokers is the **mis-mapped client securities** category — a client's sale flows through but their securities aren't physically where the back-office thinks they are. Direct-payout-to-demat reduced this by routing pay-out directly to client demat (less internal mapping confusion), but the mapping problem now shifts to the *selling* leg: the broker must know precisely which client's demat has the securities at pay-in.
- **[industry practice]** Tightening the evening reconciliation runbook to flag any net-short position by 18:00 is the single biggest leverage point. Most large brokers report sub-1% short-delivery rates by trade count; small brokers can run 3–5% rates and feel the auction cost meaningfully.
- **[cost optimization]** Cover-in-market is almost always cheaper than auction when liquidity exists. The decision algorithm is simple — projected auction price + close-out markup if uncertain vs current bid-ask spread plus brokerage; the latter wins for liquid stocks.
- **[risk trade-off]** Allowing intraday short-sell with the expectation of buying back the same day (a common retail behaviour) without robust pre-trade holding-checks creates structural short-delivery risk. SEBI rules forbid uncovered short-sell on cash segment; the broker's RMS must enforce.
- **[gotcha]** The 20% close-out markup is **on top of** the auction difference, not in lieu. A broker that thinks "if auction fails, I just pay 20% above close" is under-estimating the cost — the auction difference (if any partial offer was received) is still charged, and the 20% markup is on the close-out portion. The full economic cost is the higher of the two scenarios.
- **[industry practice]** Brokers running an in-house arbitrage / prop desk sometimes maintain a "self-auction" capability — supplying their own pool inventory to the auction at a competitive offer price, capturing the auction premium internally rather than paying it out. This requires regulatory positioning (the prop desk must be a distinct member entity) and operational complexity not all brokers maintain.
- **[risk trade-off]** Direct-payout-to-demat has improved client experience but raised the bar on broker operational discipline. The broker no longer has the safety net of internal netting; every selling client must be physically settled. The systemic cost is operational, not regulatory — the regulator (SEBI) was confident the framework would force better discipline.
- **[gotcha]** Auction notice is published in the evening of T+1; the broker has roughly 12 hours to act before the T+2 auction call. Brokers without a 24x7 operations team for settlement issues may miss the cover-in-market window for late-evening discovered shorts.

## Cross-references

- [Integration DAG: Trading hours](/broking-kyc/operations/integration-dag/trading-hours/) — pre-trade pipeline that should catch uncovered short-sells.
- [Broker Process Narrative](/broking-kyc/broker-process/narrative/) — Section 3 covers settlement and the auction mechanism at narrative level.
- [Compliance Blueprint — Settlement domain](/broking-kyc/operations/compliance-blueprint/) — 22 entries covering settlement including auction, close-out, MTF settlement, direct-payout.
- [Compliance Blueprint — Margin compliance domain](/broking-kyc/operations/compliance-blueprint/) — margin shortfall, peak-margin, DMF.
- [Deep Dive: OMS internals](/broking-kyc/deep-dives/trading-day/oms-internals/) — pre-trade gates that should prevent short-delivery.
- [Deep Dive: SPAN methodology](/broking-kyc/deep-dives/trading-day/rms-span-methodology/) — margin computation; uncovered shorts attract higher margin.
- [Deep Dive: Surveillance, GSM, ASM](/broking-kyc/deep-dives/trading-day/surveillance-norms-gsm-asm/) — repeated short-delivery is a surveillance flag.
- [Deep Dive: Block / bulk deals](/broking-kyc/deep-dives/trading-day/block-bulk-deals/) — block-deal settlement also flows through this auction mechanism.
- [Clearing-corp circulars](/broking-kyc/reference/circulars/clearing-corps/) — full text of NCL / ICCL / MCXCCL circulars cited: [NCL/CMPT/71045](/broking-kyc/reference/circulars/clearing-corps/#nclcmpt71045), [NCL/CMPT/71441](/broking-kyc/reference/circulars/clearing-corps/#nclcmpt71441), [NCL/CMPT/61800](/broking-kyc/reference/circulars/clearing-corps/#nclcmpt61800), [NCL/CMPT/63669](/broking-kyc/reference/circulars/clearing-corps/), [NCL/CMPT/66779](/broking-kyc/reference/circulars/clearing-corps/), [NCL/CMPT/72224](/broking-kyc/reference/circulars/clearing-corps/#nclcmpt72224).
- [SEBI other circulars](/broking-kyc/reference/circulars/sebi-other/) — including [SEBI/HO/MRD-PoD2/CIR/P/2024/00181](/broking-kyc/reference/circulars/sebi-other/#sebihomrd-pod2cirp202400181) master circular.
- [SEBI MIRSD circulars](/broking-kyc/reference/circulars/sebi-mirsd/) — including direct-payout-to-demat circular [SEBI/HO/MIRSD/MIRSD-PoD1/P/CIR/2024/75](/broking-kyc/reference/circulars/sebi-mirsd/#sebihomirsdmirsd-pod1pcir202475).
- [NSE inspection circulars](/broking-kyc/reference/circulars/nse/) — penalty grids including [NSE/INSP/64315](/broking-kyc/reference/circulars/nse/#nseinsp64315) and [NSE/INSP/53530](/broking-kyc/reference/circulars/nse/).

## Verified through

2026-05-14

---

*AI-generated and not legal, financial, or compliance advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*

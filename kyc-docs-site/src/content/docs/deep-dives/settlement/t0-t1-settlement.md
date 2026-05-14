---
title: "Deep Dive: T+0 / T+1 Settlement"
description: T+1 default settlement mechanics since January 2023, T+0 beta launch (Mar 2024 top 25 → Dec 2024 top 500), parallel-session architecture, opt-in flow, broker readiness, settlement-window cut-offs, and pay-in / pay-out timing.
---

import { Aside } from '@astrojs/starlight/components';

> **Why this page is structured this way:** T+0 is not a faster T+1 — it is a separate session running in parallel with its own trading window, its own obligation file, its own block deal window, and its own opt-in plumbing. The page is structured around that distinction: legacy comparison first, then T+1 in detail, then T+0 as a distinct cycle, then operational implications for the broker.

## TL;DR

- **T+1 has been default for all listed scrips since 27 January 2023.** The migration from T+2 was phased starting 25 February 2022 under SEBI/HO/MRD2/DCAP/CIR/2021/0598 and SEBI's September 2021 optional-cycle circular SEBI/HO/MRD-1/DSAP/P/CIR/2021/628 (SEBI/HO/MRD2/PoD-2/CIR/P/2023/171 consolidated the framework into the Stock Exchanges & Clearing Corporations Master Circular).
- **T+0 went live on 28 March 2024** as an optional rolling-settlement cycle covering the top 25 scrips under SEBI/HO/MRD/MRD-PoD-3/P/CIR/2024/20 and NCL/CMPT/61301; it was expanded to the top 500 scrips by market capitalisation in a phased manner under SEBI/HO/MRD/POD-3/P/CIR/2024/172 (10 December 2024, effective 31 January 2025).
- **T+0 runs as a parallel session, not as an acceleration of T+1.** A scrip eligible for T+0 trades in *both* sessions on the same day; the broker tags which order belongs to which session, and the two settle through independent obligation files.
- **Differential brokerage is permitted for T+0 trades** (SEBI/HO/MRD/POD-3/P/CIR/2024/172) but must be disclosed in the client kit and on the contract note — SETTLEMENT-018 in the [Settlement domain](/broking-kyc/operations/compliance-blueprint/).
- **Pay-in cut-offs differ materially.** T+1 funds and securities pay-in is typically 10:30 / 11:30 IST next morning (final settlement 1 by ~10:00 / 15:30 IST; final settlement 2 by ~17:00 / 21:00 IST per NCL/CMPT/72224 January 2026 calendar). T+0 funds pay-in is 16:00 IST same-day; securities pay-in is 15:30 IST same-day; settlement complete by 16:30.
- **Custodial participants** can settle in T+0 since 31 July 2024 (NCL/CMPT/63165), with the Family Account CP-code mechanism (FAMILYAC suffix, PAN FAMIL999999Y) activated 10 February 2025 (NCL/CMPT/66135).
- Auction for short delivery in T+1 runs on T+2; auction close-out rate per SEBI Master Circular SEBI/HO/MRDPoD2/CIR/P/2024/00181 and FAQ NCL/CMPT/71441 = higher of (a) highest scrip price in the settlement-to-auction window or (b) latest closing + 20%.

## Conceptual overview

India's cash-market settlement clock has shortened twice in three years. The country moved from T+2 to T+1 in a single phased rollout from February 2022 to January 2023, then opened a separate T+0 session for the most-liquid scrips starting March 2024. The two changes are different in kind: T+1 was a one-way cutover (today the entire cash segment settles T+1 by default), while T+0 is an optional second session that runs *alongside* T+1 for the same trading day.

For an operator, this means two things. First, the BOD / EOD plumbing for T+1 is now the normal case — there is no T+2 fallback for cash trades. Second, T+0 added a parallel set of files, obligations, peak-margin treatment, and contract-note disclosures that must coexist with the T+1 stream. Most retail brokers default clients to T+1 and require explicit opt-in to T+0; the broker's OMS, RMS, and back-office must support the differential cycle independently.

The single most-frequent mental model error newcomers make is to treat T+0 as a faster T+1. It is not. T+0 is a distinct session with its own trading window (09:15 – 13:30 currently), its own block deal window, its own settlement obligation file, its own price-band (typically ±100 bps from the T+1 reference price), and its own scrip-eligibility list (top 500 by market cap, phased). A scrip can trade in T+0 in the morning, in T+1 the rest of the day, and a client can hold a T+0-flagged position simultaneously with a T+1-flagged position in the same scrip — they settle through different files on different timelines.

## 1. Settlement cycles compared — T+2 legacy, T+1 default, T+0 beta

The table below summarises the three cycles at the level of detail an operator needs to keep the right mental model.

| Aspect | T+2 (legacy, retired) | T+1 (default since 27 Jan 2023) | T+0 (optional since 28 Mar 2024) |
| --- | --- | --- | --- |
| Status | Withdrawn for cash segment | Default for all listed scrips | Optional; broker + client opt-in; top 500 phased |
| SEBI authority | SEBI Master Circulars prior to Sept 2021 | [SEBI/HO/MRD2/DCAP/CIR/2021/0598](/broking-kyc/reference/circulars/sebi-other/) (Sept 2021 + phased), consolidated in [SEBI/HO/MRD2/PoD-2/CIR/P/2023/171](/broking-kyc/reference/circulars/sebi-other/#sebihomrd2pod-2cirp2023171) (Master Oct 2023) and [Dec 2024 SE&CC Master](/broking-kyc/reference/circulars/sebi-other/) | [SEBI/HO/MRD/MRD-PoD-3/P/CIR/2024/20](/broking-kyc/reference/circulars/sebi-other/#sebihomrdmrd-pod-3pcir202420) (Mar 2024, beta), [SEBI/HO/MRD/POD-3/P/CIR/2024/172](/broking-kyc/reference/circulars/sebi-other/#sebihomrdpod-3pcir2024172) (Dec 2024, top 500) |
| Clearing-corp operational | Earlier consolidated circulars | [NCL/CMPT/67751](/broking-kyc/reference/circulars/clearing-corps/#nclcmpt67751) (FY 2024-25 master) | [NCL/CMPT/61301](/broking-kyc/reference/circulars/clearing-corps/#nclcmpt61301) (operational guidelines, 22 Mar 2024); [NCL/CMPT/63165](/broking-kyc/reference/circulars/clearing-corps/#nclcmpt63165) (custodial CPs, Jul 2024); [NCL/CMPT/66135](/broking-kyc/reference/circulars/clearing-corps/#nclcmpt66135) (Family Account CP, Feb 2025) |
| Trade window | Standard trading hours 09:15 – 15:30 | Standard trading hours 09:15 – 15:30 | 09:15 – 13:30 (separate session, parallel to T+1) |
| Pay-in window | T+2 morning | T+1 morning (typically 10:30 / 11:30 funds / securities; final settlement 2 by ~16:30 – 21:00) | Same day: securities pay-in 15:30 IST, funds pay-in 16:00 IST, settlement complete 16:30 IST |
| Price band | Standard scrip price band | Standard scrip price band | T+1 reference price ± 100 bps |
| Block deal window | Two windows in T+1 trading day | 08:45 – 09:00 + 14:35 – 15:05 | Optional separate block deal window for T+0 (SEBI Dec 2024) |
| Auction for short delivery | T+3 auction | T+2 auction; close-out per SEBI/HO/MRDPoD2/CIR/P/2024/00181 | Auction same-day if applicable; close-out per same rule |
| Custodial participants | Eligible | Eligible | Eligible since Jul 2024 ([NCL/CMPT/63165](/broking-kyc/reference/circulars/clearing-corps/#nclcmpt63165)); Family Account CP active Feb 2025 ([NCL/CMPT/66135](/broking-kyc/reference/circulars/clearing-corps/#nclcmpt66135)) |
| Differential brokerage | Single brokerage | Single brokerage | Permitted, must be disclosed (SEBI Dec 2024) |
| Eligible scrips | All listed (cash) | All listed (cash, default) | Top 500 by market cap, phased (Dec 2024); was top 25 at beta (Mar 2024) |

<Aside type="note">
**Why the T+2 → T+1 migration was phased.** SEBI's Sep 2021 circular permitted exchanges to migrate any scrip to T+1 with one month's advance notice and a six-month minimum hold. The migration ran in batches by market-cap deciles starting 25 February 2022 and completed on 27 January 2023 — every listed cash-segment scrip was on T+1 by then. The phasing existed to let custodians, broker back-offices, and FPIs adjust pay-in / pay-out and settlement banking flows scrip-by-scrip rather than overnight.
</Aside>

## 2. T+1 mechanics — the default cycle

### 2.1 Trade-day timeline

For every cash-segment trade executed today, two obligations crystallise tomorrow morning at the [clearing corporation](/broking-kyc/reference/circulars/clearing-corps/): deliver the funds for net-buy positions and deliver the securities for net-sell positions. The clearing corp nets across all members and produces an obligation file in the EOD window of trade day. The broker's back-office picks up that obligation file via SFTP and stages pay-in instructions for execution next morning.

A T+1 trade-day timeline (post-direct-payout regime):

1. **09:15 – 15:30 IST.** Trading. Orders capture pre-trade margin; clearing corp captures four peak-margin snapshots at random windows in 11:00–11:30, 12:30–13:00, 13:30–14:00, 14:30–15:00 (per [NCL/CMPT/56502](/broking-kyc/reference/circulars/clearing-corps/#nclcmpt56502) and the [MARGIN compliance domain](/broking-kyc/operations/compliance-blueprint/)).
2. **15:30 – 15:40.** Closing auction. Settlement price discovered.
3. **15:40 – 19:00.** EOD reconciliation per the [EOD & settlement DAG](/broking-kyc/operations/integration-dag/eod-settlement/). The clearing corp publishes the trade file and the obligation file; broker's back-office books trades, computes charges, generates ECNs, computes T+1 pay-in / pay-out per UCC.
4. **19:00 – 21:00.** Early Pay-in (EPI) windows. Funds EPI cut-off 19:00 IST, Securities EPI cut-off 19:00 IST (UPI-Block clients 18:00 IST on quarterly running-account-settlement dates per [NCL/CMPT/72025](/broking-kyc/reference/circulars/clearing-corps/#nclcmpt72025)). Margin-report download 21:00 IST. Cash / FDR / BG immediate release accepted until 19:00. Collateral-allocation window open until 22:00 IST.
5. **T+1 morning.** Funds and securities pay-in execution; clearing corp settles; pay-out runs in parallel. Final settlement times for a typical T+1 day per NCL January 2026 calendar (NCL/CMPT/72224 reference): final settlement 1 (M, Z, B segments) — pay-in 10:30 / pay-out 15:30; final settlement 2 — pay-in 16:30 / pay-out 21:00.
6. **T+1 afternoon.** Auction settlement for short delivery (settlement type A): pay-in 08:00 IST T+2, pay-out 10:00 IST T+2. UNPAIDMTF upload windows 15:30 – 22:00 (T-1 / T) and 06:30 – 13:00 (T pay-in day).

### 2.2 Pay-in / pay-out flow under direct-payout-to-demat

Pre-June 2024, securities being paid out by the clearing corp landed in the broker's pool account first, then the broker pushed them to the client's demat. Post the June 2024 SEBI [direct-payout-to-demat](./direct-payout-to-demat/) mandate (SEBI/HO/MIRSD/MIRSD-PoD1/P/CIR/2024/75, operational via [NCL/CMPT/63669](/broking-kyc/reference/circulars/clearing-corps/#nclcmpt63669), [NCL/CMPT/66779](/broking-kyc/reference/circulars/clearing-corps/#nclcmpt66779), ICCL 20250214-69 and ICCL 20250214-69 phase 2), securities flow directly from the clearing pool to the client's demat without the broker's intermediate custody. Funds still settle to the broker's client-funds bank account.

This changes the pay-in side as well: the broker must do gross pay-in to the clearing corp under the direct-payout regime (per [NCL/CMPT/66779](/broking-kyc/reference/circulars/clearing-corps/#nclcmpt66779) Phase 2 from settlement 2425828 / 25 Feb 2025). Internal-shortage valuation is settlement price + 20%, payable by noon on settlement day. Custodian-cleared clients are still excluded.

### 2.3 Peak-margin snapshots in T+1

The four intraday peak-margin snapshots are taken in the standard trading window and feed the Daily Margin File (MG-12 / MG-13). T+1 doesn't change snapshot timing or methodology; what it changes is the margin-release cycle — securities sold today and settling tomorrow free the corresponding margin position the next day rather than the day after, accelerating capital efficiency for cash-segment delivery traders.

<Aside type="tip">
**T+1 made buying back covered calls or shorts cheaper.** Pre-T+1, a delivery-sell freed margin on T+2 evening. With T+1, the margin frees on T+1 evening, which means an active intraday trader can effectively re-deploy capital one business day faster. Brokers offering MTF or carry-forward positions saw measurable improvement in capital turnover post the January 2023 cutover.
</Aside>

## 3. T+0 mechanics — the parallel session

### 3.1 What T+0 actually is

T+0 is an optional same-day rolling settlement session running alongside (not instead of) the T+1 session. A trade matched in the T+0 session settles by 16:30 IST on the same trading day; a trade matched in the T+1 session in the same scrip on the same day settles on T+1 morning as usual.

The two sessions are operationally independent:

- **Different order books.** The exchange treats T+0 as a separate market type with its own order book. An order tagged T+0 cannot match against an order tagged T+1.
- **Different obligation files.** The clearing corp generates separate obligation files for T+0 and T+1. The broker's back-office must process both.
- **Different settlement files.** T+0 settles same-day via a distinct settlement number; T+1 settles next-day via its own settlement number.
- **Different contract-note flow.** Both T+0 and T+1 trades produce contract notes, but the T+0 brokerage may differ (SEBI permits differential brokerage) and the contract note must reflect the actual cycle and brokerage rate.

### 3.2 Trade timing and price band

| Item | T+0 detail |
| --- | --- |
| Trading window | 09:15 – 13:30 IST |
| Price band | T+1 reference price ± 100 bps |
| Securities EPI cut-off | 13:45 IST |
| Custodian trade-confirmation cut-off | 14:45 IST (per NCL/CMPT/66135 Annexure 1) |
| Securities pay-in | 15:30 IST |
| Funds pay-in | 16:00 IST |
| Settlement complete | 16:30 IST |

(Timings per NCL/CMPT/66135 Annexure 1, which formalised T+0 timings for custodial participants effective 10 February 2025.)

### 3.3 T+0 eligibility — scrips and members

**Scrips.** T+0 began with the top 25 scrips by market capitalisation on 28 March 2024 (NCL/CMPT/61301). SEBI/HO/MRD/POD-3/P/CIR/2024/172 (Dec 2024) expanded the eligible list to the top 500 scrips by market capitalisation in a phased manner. The exchange publishes the current eligible-scrip list; the OMS validates orders against this list at the time of order entry.

**Members.** The Mar 2024 beta limited T+0 to a defined list of brokers; the Dec 2024 expansion (effective 31 Jan 2025) opens T+0 to all stockbrokers subject to their internal readiness. Custodian-settled clients are allowed since NCL/CMPT/63165 (Jul 2024), with the Family Account CP-code mechanism (PAN FAMIL999999Y, name suffix FAMILYAC, custodian-maintained audit trail) operational from 10 February 2025.

**Clients.** Retail clients can trade T+0; the broker is required to disclose the differential brokerage (if applicable) and the price-band rules in the account kit. Most brokers default clients to T+1 and treat T+0 as opt-in (UCC-level or per-order tagging).

### 3.4 Opt-in flow (industry-typical implementation)

There is no SEBI-prescribed opt-in form for T+0. Most brokers implement one of three patterns:

1. **UCC-level opt-in.** Client signs (or eSigns) a T+0 acknowledgement once; their UCC is tagged T+0-enabled in the broker's back-office. All orders for eligible scrips may then optionally be placed in T+0 via an order-entry flag.
2. **Per-order tagging.** No UCC tagging; the client selects T+0 at order placement. The OMS pre-trade check validates that the scrip is T+0-eligible.
3. **Default-T+1, manual escalation.** The client trades in T+1 by default; T+0 is offered only on explicit request through a dealer terminal or specific app flow.

[industry typical] Most retail brokers have implemented pattern 2 with a disclosure pop-up at first T+0 use; institutional flow runs through pattern 1 or pattern 3 depending on the custodian setup.

### 3.5 Broker readiness checklist for T+0

For a broker to participate in T+0, the following must be in place:

| Layer | Item | Reference |
| --- | --- | --- |
| OMS | T+0 market-type support; ability to tag orders T+0 vs T+1 | NCL/CMPT/61301 |
| OMS | T+0-eligible-scrip validation at order entry | NCL/CMPT/61301 |
| OMS | T+0 price-band (±100 bps from T+1 reference) check | SEBI Mar 2024 |
| RMS | T+0-specific margin treatment; T+0 trades settling same-day must not be netted against T+1 obligations | NCL/CMPT/61301 |
| Back-office | T+0 trade-file ingestion separate from T+1 | NCL/CMPT/61301 |
| Back-office | T+0 obligation-file processing; gross pay-in to CC | NCL/CMPT/63669 (direct-payout regime) |
| Back-office | T+0 contract-note generation reflecting T+0 cycle and applicable brokerage | SETTLEMENT-018 |
| Custody | TM CUSPA, CM CUSPA, TM CSMFA accounts as applicable | [NCL/CMPT/63669](/broking-kyc/reference/circulars/clearing-corps/#nclcmpt63669) — see the [direct-payout deep dive](./direct-payout-to-demat/) |
| Custody | NSDL primary demat for proprietary UCC distinct from CM pool DP-ID-Client-ID | [NCL/CMPT/69455](/broking-kyc/reference/circulars/clearing-corps/#nclcmpt69455) |
| Settlement bank | Same-day funds pay-in capability (typically end-of-day NEFT / RTGS settlement window) | clearing-bank SOP |
| Settlement bank | Same-day funds pay-out to client-funds bank account | clearing-bank SOP |
| Reporting | T+0 margin reporting in MG-12 / MG-13 files reflecting same-day settlement | [NCL/CMPT/56502](/broking-kyc/reference/circulars/clearing-corps/#nclcmpt56502) |
| Client disclosure | Differential-brokerage and price-band disclosure in account kit and on T+0 contract notes | SEBI Dec 2024 |

### 3.6 T+0 custodian-cleared flow — Family Account CP

For custodial participants (FPIs / mutual funds / portfolio-managed accounts), NCL/CMPT/66135 (15 Jan 2025) operationalised the Family Account CP code mechanism. Key elements:

- A CP code suffixed "FAMILYAC", with placeholder PAN "FAMIL999999Y" and placeholder SEBI registration "FAMIL999999Y", is opened at the family level.
- All CP codes participating in the family are tagged to the FAMILYAC parent.
- Only non-marginable CP codes can be linked.
- Custodian maintains a complete audit trail of underlying-investor allocations.
- Trade confirmations are at the Family-Account CP level; the obligation is computed at the individual CP level after custodian allocation.
- Custodians settle to the end-investor within the day.
- EPI / pay-in via the block mechanism is required by the deadline for non-custodian UPI / non-UPI clients.
- NCL uploads auto-DO for net deliverable obligations of custodians per opt-in; incremental obligations on rejection get a separate auto-DO.

This mechanism activated 10 February 2025 (per NCL/CMPT/66135 effective date).

## 4. Parallel-session architecture — the architectural model

The right mental model for T+0 is "second session, same day," not "faster T+1." Internally at the clearing corp, T+0 runs as a distinct settlement number with its own settlement type code (per NCL/CMPT/72224 January 2026 example, T+0 settlement 2026511 was independently designated). The exchange treats T+0 as a separate market type for the order-matching engine.

```
Trade Day D
  │
  ├──────────────────────────────────────────────────────────┐
  │                                                          │
  ▼                                                          ▼
T+0 session (09:15 – 13:30 IST)                  T+1 session (09:15 – 15:30 IST)
  │  · Top 500 scrips eligible                     │  · All listed scrips
  │  · ±100 bps price band                         │  · Standard price band
  │  · Separate order book                         │  · Standard order book
  │                                                │
  ▼                                                ▼
T+0 trade file from exchange                      T+1 trade file from exchange
  │  (separate settlement number)                  │  (settlement number M / Z / B)
  ▼                                                ▼
T+0 obligation file from CC                       T+1 obligation file from CC
  │                                                │
  ▼                                                ▼
T+0 securities EPI 13:45 IST                      T+1 EOD cycle (EPI by 19:00 IST)
T+0 securities pay-in 15:30 IST                   T+1 pay-in next morning
T+0 funds pay-in 16:00 IST                        T+1 settlement next-day 10:30 / 15:30 / 16:30 / 21:00
T+0 settlement complete 16:30 IST same day        Pay-out into client demat (direct-payout regime)
```

This parallel architecture is why the broker can't simply "switch on" T+0 — every layer of the stack (OMS, RMS, back-office, contract notes, banking) needs to handle a second concurrent settlement flow with same-day timing rather than next-day timing.

<Aside type="caution">
**Same-day funds pay-out can hit settlement-bank cut-offs.** T+0 funds settle by 16:30 IST. Brokers running their client-funds banking through a single bank with a 17:00 IST NEFT cut-off effectively have 30 minutes between clearing-corp pay-out and client-bank credit. RTGS may be used for higher-value transfers but adds operational complexity. Brokers planning meaningful T+0 volume should size their settlement-bank capacity and consider 24/7 IMPS for retail pay-outs.
</Aside>

## 5. Sub-cases / edge cases

### 5.1 Settlement-holiday handling

Settlement holidays (state elections, RBI declarations under the Negotiable Instruments Act, etc.) generate revised T+1 and T+0 settlement calendars. The 15 January 2026 Maharashtra municipal-corporation elections holiday, formalised in [NCL/CMPT/72224](/broking-kyc/reference/circulars/clearing-corps/#nclcmpt72224), illustrates the pattern: T+0 settlement 2026511 was suspended for the day; T+1 schedule for the next business day was published with auction pay-in 08:00 / pay-out 10:00 (settlement A), normal pay-in 10:30 / pay-out 15:30 (settlement 1), and a late-cycle pay-in 16:30 / pay-out 21:00 (settlement 2).

UNPAIDMTF upload windows on holiday-affected days are typically widened: 15:30 – 22:00 on T-1 / T and 06:30 – 13:00 on the next pay-in day per the same circular. EPI of securities is allowed until 21:00 on the post-holiday settlement-eve.

### 5.2 T+0 trade vs. T+1 trade in the same scrip same day

A client can do both: a buy in T+0 (settled same evening) and a sell in T+1 (settled next day) in the same scrip. From the back-office's view, these are two independent positions until settlement; from the depository's view, the T+0 buy adds to the client's demat balance the same evening, then the T+1 sell settles against that balance the next morning. There is no internal netting between the two cycles.

### 5.3 Auction for short delivery

If a member fails to deliver securities on T+1, the auction runs on T+2 morning. The auction-offer price for successful auctions and the close-out price for unsuccessful auctions are used to charge the failing member. The close-out rate per SEBI Master Circular SEBI/HO/MRDPoD2/CIR/P/2024/00181 (Dec 2024) and FAQ [NCL/CMPT/71441](/broking-kyc/reference/circulars/clearing-corps/#nclcmpt71441) (Nov 2025) = higher of:

- the highest scrip price during the period from settlement day to auction day, or
- 20% above the latest closing price on the auction-call day.

This applies to both CC shortages and internal shortages per the Feb 2025 update [NCL/CMPT/66779](/broking-kyc/reference/circulars/clearing-corps/#nclcmpt66779). Auction files: P_0000 for unsuccessful internal-shortage auctions; F_0000 for CC shortage close-out, CA close-out, non-actionable BL / G-Sec close-out, and auction pay-in shortage close-out. See the [Short-delivery auction deep dive](/broking-kyc/deep-dives/trading-day/short-delivery-auction/) for the full close-out and recovery walkthrough.

### 5.4 Settlement-driven margin swings

The four peak-margin snapshots are taken during 11:00 – 15:00 IST. If a T+0 pay-out is received intraday (uncommon — T+0 settles after the snapshot window), it would not reduce margin available at the snapshot. If a T+1 pay-out from the previous trading day was received earlier this morning, it does reduce margin available at the 11:00 snapshot — RMS must track this carefully to avoid double-counting.

### 5.5 Corporate-action handling under direct-payout

When a security is in the ex-date window, the clearing corp issues representative early-pay-in circulars (e.g., [NCL/CMPT/65498](/broking-kyc/reference/circulars/clearing-corps/#nclcmpt65498) for a 5→2 face-value split). EPI is allowed in the old ISIN for the pre-ex settlement and in the new ISIN for the post-ex settlement. Direct payout to the client demat must reflect the correct ISIN per the corporate-action effective date.

### 5.6 What T+0 isn't (clarifying)

T+0 is not the same as "Direct Market Access" same-day settlement of OTC trades, nor a derivative same-day settlement, nor a same-day mutual-fund subscription / redemption. The MF same-day settlement on BSE StAR MF (per [ICCL 20240613-52](/broking-kyc/reference/circulars/clearing-corps/) and monthly settlement-programme circulars) is a separate cycle. T+0 in this page means equity cash-segment T+0 only.

## Practical notes

- **[industry typical]** Most retail brokers default new clients to T+1 only and gate T+0 behind an explicit risk-acknowledgement pop-up. Discount brokers that did open T+0 by default in March 2024 reverted to opt-in within months as clients reported confusion about which cycle their orders went into.
- **[gotcha]** The T+0 settlement number is independent of the T+1 settlement number on the same day. Back-office systems that key reconciliation off settlement-date-only will double-count obligations. Key off the explicit settlement number from the clearing-corp obligation file.
- **[risk trade-off]** Differential T+0 brokerage is permitted (SEBI Dec 2024) but most brokers chose to keep T+0 brokerage equal to or lower than T+1 to encourage adoption; charging higher T+0 brokerage tested poorly in market response and is rarely seen.
- **[industry typical]** Settlement-bank readiness is the single most common reason a smaller broker delays T+0 onboarding. Same-day funds pay-out (broker → client bank) at the 16:30 settlement-completion window requires either an IMPS-capable retail flow or an RTGS / NEFT settlement-bank account with cut-offs that comfortably absorb the 16:30 spike.
- **[gotcha]** Custodian-cleared clients must use the Family Account CP code (FAMILYAC suffix) for T+0 since 10 February 2025 per [NCL/CMPT/66135](/broking-kyc/reference/circulars/clearing-corps/#nclcmpt66135). Brokers running custodian flows without the FAMILYAC code mechanism encountered allocation rejections in the first weeks post effective date.
- **[cost optimization]** Peak-margin and DMF treatment of T+0 trades did not change with the introduction of the parallel session — the snapshot windows still capture the T+0 portion of intraday positions. Brokers that pre-flagged T+0 trades in their internal margin-block ledger had cleaner DMF reconciliation than those that processed T+0 separately at EOD.
- **[industry typical]** UPI Block (ASBA) clients have an earlier securities EPI cut-off on quarterly running-account settlement dates: 18:00 IST instead of 19:00 (per [NCL/CMPT/72025](/broking-kyc/reference/circulars/clearing-corps/#nclcmpt72025) Dec 2025 for the 2 January 2026 settlement). Backend systems need to honour this per-client-type difference, not rely on a single cut-off.

## Cross-references

- [Broker Process Narrative — Section 3 (Settlement Cycle)](/broking-kyc/broker-process/narrative/) — chronological narrative
- [Integration DAG — EOD & settlement](/broking-kyc/operations/integration-dag/eod-settlement/) — node-level dependencies
- [Compliance Blueprint — Settlement domain](/broking-kyc/operations/compliance-blueprint/) — obligations 001 – 022
- [Direct payout to demat deep dive](./direct-payout-to-demat/) — sibling page on the related rollout
- [Payin default + Core SGF deep dive](./payin-default-core-sgf/) — what happens when T+1 pay-in fails
- [Client funds upstreaming deep dive](./client-funds-upstreaming/) — funds layer behind the settlement
- [SLBM deep dive](./slbm/) — borrowing securities to cover short deliveries
- [MTF operational deep dive](./mtf-operational/) — MTF settlement nuances
- [Short-delivery auction deep dive](/broking-kyc/deep-dives/trading-day/short-delivery-auction/) — auction and close-out mechanics
- [Circulars — SEBI other](/broking-kyc/reference/circulars/sebi-other/) — T+0 and T+1 SEBI authorities
- [Circulars — Clearing corps](/broking-kyc/reference/circulars/clearing-corps/) — NSCCL / ICCL / MCXCCL operational circulars

## Verified through

2026-05-14

---

*AI-generated and not legal, financial, or compliance advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*

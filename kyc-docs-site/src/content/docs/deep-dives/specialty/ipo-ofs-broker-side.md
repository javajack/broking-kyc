---
title: "Deep Dive: IPO / OFS Broker-Side Flow"
description: End-to-end broker-side walkthrough of primary-market issuances — ASBA-UPI block IPO subscription window T-day to T+3 listing, bid capture and exchange submission, allocation mechanics (lottery vs proportionate), refund and mandate-release on non-allotment, OFS sessions, NCD subscriptions, and the retail / HNI / institutional category split.
---

import { Aside } from '@astrojs/starlight/components';

> **Why this page is structured this way:** Brokers participate in the primary market as one of two roles — Self-Certified Syndicate Bank (SCSB) is a bank role, but a typical equity broker is a **Syndicate / Sub-Syndicate Member** or a **Stock Exchange platform participant** routing client bids to the exchange's electronic bidding platform (NSE IFM, BSE iBBS). The walkthrough below traces a single retail IPO application from the client's tap on "Apply" through to listing on T+3, with sub-sections for OFS, NCD subscriptions, and the institutional / HNI / retail category mechanics that determine allocation. It mirrors the operator-perspective tone of the [lifecycle/](/broking-kyc/lifecycle/) pages.

## TL;DR

- **Broker's role**: capture client bid → push to exchange bidding platform → orchestrate UPI Block mandate via sponsor bank → reconcile allotment file from RTA → release mandate / book security credit. The broker never holds client funds for IPO; funds stay blocked in the client's bank under the UPI / ASBA mechanism.
- **Window**: standard book-built IPO opens for **3 working days** (T to T+2), revised application / withdrawal possible during the window, allotment finalised by RTA on T+2 evening, listing on T+3 ([SEBI/HO/CFD/TPD1/CIR/P/2023/140](/broking-kyc/reference/circulars/sebi-other/#sebihocfdtpd1cirp2023140), mandatory T+3 from 1 December 2023).
- **UPI Block** is the default rail for retail bids up to **Rs.5 lakh** ([SEBI/HO/CFD/DIL2/CIR/P/2022/45](/broking-kyc/reference/circulars/sebi-other/#sebihocfddil2cirp202245)). Larger bids route via SCSB ASBA (paper / portal mandate).
- **Allocation method** depends on category: retail (Rs ≤ 2 lakh per bid) gets a **lottery** if oversubscribed, with each successful retail allottee receiving the minimum lot; HNI / NII (Rs > 2 lakh) gets **proportionate** allocation; QIB gets discretionary / proportionate per merchant-banker book-build.
- **OFS** (Offer for Sale by promoters) is a one- or two-day exchange-window mechanism distinct from IPO — orders are placed during a 09:15–15:30 trading-day window via a separate OFS UI, and allocation is price-priority at a floor price.
- **NCDs** (Non-Convertible Debentures) follow the public-issue rail with their own mandate flow — first-come-first-served allotment within tenor / category buckets.
- AI-generated synthesis. **Verify any specific provision against the linked circulars before acting.**

## Conceptual overview

The Indian primary market has consolidated around the **ASBA / UPI Block** mechanism. Pre-2016, retail IPO applications used physical cheques or NEFT-pull blocks at SCSBs, which were cumbersome and produced substantial settlement lag. SEBI's progressive 2016–2022 reforms moved the bulk of retail applications to a UPI-mandate plumbing: the client's application instructs the client's bank, via a UPI app or via the broker's syndicate route, to **block** an amount equal to the bid value in the client's own account. The funds never leave the client's account until allocation is confirmed — at which point the issuer's collection bank debits only the allocated amount and **releases** the block on the unallotted portion the same evening.

The broker plays a thinner role here than in secondary-market trading. The broker is a **bid aggregator and reconciliation operator**, not a custodian of client funds. The exchange (NSE / BSE) runs the bidding platform; the RTA (Link Intime, KFintech, MUFG Intime/Bigshare) consolidates allotment; the sponsor bank (one of ~14 banks empanelled by NPCI) issues the UPI mandate; the issuer's collection bank settles the post-allocation funds. The broker's value in this chain is (a) UX — making the bid easy for the retail client, (b) eligibility check — confirming the client has a valid demat / PAN / KYC before pushing the bid, and (c) grievance routing — sitting between the client and the RTA / sponsor bank for refund and credit-related complaints.

The post-2023 trend has been an aggressive compression of the timeline. SEBI's August 2023 circular ([SEBI/HO/CFD/TPD1/CIR/P/2023/140](/broking-kyc/reference/circulars/sebi-other/#sebihocfdtpd1cirp2023140)) reduced public-issue listing from **T+6 to T+3** in two stages — voluntary from 1 September 2023, mandatory from 1 December 2023. The broker's reconciliation cadence has had to compress to match. SEBI's March 2025 rights-issue circular ([SEBI/HO/CFD/CFD-PoD-1/P/CIR/2025/31](/broking-kyc/reference/circulars/sebi-other/#sebihocfdcfd-pod-1pcir202531)) followed with a parallel compression for rights issues to **23 working days** end-to-end.

## 1. The pre-IPO operational setup

Before an IPO opens for bidding, several broker-side configurations have to be in place. Most of this happens within the four-week window between RHP filing and issue opening.

### Issue-master setup

The exchange publishes an **issue-master** record for each upcoming IPO — issue code, issue name, price band, bid lot, tick size, opening date, closing date, RTA, sponsor bank list, category-wise reservation (retail / HNI / QIB / employee), and any green-shoe option. The broker's primary-market system ingests this file. For most brokers, the integration is one of two patterns:

- **NSE IFM (Integrated Front-end Manager)** or **BSE iBBS (Internet Based Book Building System)** — the broker's order-management system has a separate IPO module that connects to the exchange's bidding API. The broker's terminal user (or the client via the broker's app) places bids that flow through this module.
- **Stock Exchange Platform (SEP) integration** — a leaner integration where the broker's app surfaces the issue and pushes the bid directly to the exchange's IBBS API.

The issue master is refreshed daily through the bidding window; revisions (price-band changes, time extensions) propagate via the same channel. Brokers that miss a refresh end up displaying stale data to clients and may push out-of-band bids that get rejected at the exchange.

### Bidding-window calendar

A typical book-built IPO opens for **3 working days** (T, T+1, T+2). Some issues have a 5-day window for QIB / anchor portions. The anchor allocation runs the day before T (T-1) and is finalised by 5:00 PM the same day — only QIB anchor allottees participate. From the broker's perspective, anchor is a non-event because retail brokers don't typically have anchor clients; large institutional brokers route anchor demand through their institutional desk.

### Sponsor-bank empanelment & UPI Block configuration

For the broker to route retail UPI bids, the sponsor bank designated for the issue must be in the broker's roster. NPCI maintains the list of sponsor banks empanelled to accept primary-market UPI mandates — historically a small group (HDFC Bank, ICICI Bank, Yes Bank, SBI, Axis Bank, Kotak, IndusInd, Standard Chartered, Bank of Baroda, Punjab National Bank, Federal Bank, IDBI, IDFC FIRST, RBL). The mandate is processed via the sponsor bank's BHIM / PSP gateway against the client's UPI ID; the underlying NPCI rail is the **Single Block Multiple Debits (SBMD)** mandate type ([NPCI/UPI/OC No. 200/2024-25](/broking-kyc/reference/circulars/npci/), enabled 30 November 2024 for secondary market — primary-market UPI block had been live since the original 2018–2019 ASBA-UPI roll-out).

The broker's app shows the client a dropdown of supported PSP handles (@okhdfcbank, @ybl, @ibl, @paytm, @upi etc.). The handle is matched against the sponsor-bank roster to confirm acceptance. A mismatch (e.g., client's UPI ID is at a PSP not enabled for primary-market mandates) is shown to the client at bid time, not after submission.

### KYC and demat eligibility gates

The broker must confirm before bid submission:

- Client's **PAN is active** and KRA-validated (any client on "KYC on hold" cannot bid).
- Client has an **active demat account** with the same PAN — the bid is rejected if the PAN-BO ID linkage doesn't validate.
- Client's bank account in the UPI handle matches the bank account on file (penny-drop name-match is the typical safeguard, though for UPI bids the PSP gateway handles part of this).
- Client is not on **GSM Stage 4 / ASM-T** restriction (these typically block IPO bidding for the specific category, though this is rare).
- Client has not exceeded **5 applications per PAN** in the same issue (SEBI's 2018 multiple-application rule; bids beyond 5 are rejected by the RTA at allocation).

## 2. The retail UPI Block IPO flow — step by step

The bid flow is most easily described as a single retail client placing a single UPI bid through the broker's app.

### Step 1 — Bid capture

The client opens the broker's app, navigates to the "IPO" or "Primary Market" section, selects the issue, enters bid quantity (in multiples of the bid lot) and bid price (cut-off price by default; price-band selection for HNI bids). The app validates against the issue master — price within band, quantity in multiples of lot, total bid value within category limit (Rs ≤ 2 lakh for retail; up to Rs 5 lakh for "S-HNI" category; > Rs 5 lakh for "B-HNI").

### Step 2 — UPI handle entry

The client enters their UPI ID (e.g., `client@okhdfcbank`). The broker's app routes the bid to the exchange's IBBS API with the UPI ID embedded. The exchange's bidding system, in turn, hands the mandate creation to the sponsor bank's PSP gateway.

### Step 3 — Mandate notification to client

Within seconds, the client receives a UPI **collect** notification on their UPI app — "Block Rs X for [Issue Name] IPO". The client authorises via UPI PIN. The mandate is now created in the client's bank — a **block** is placed on the bid amount, but no debit happens.

### Step 4 — Mandate confirmation back to exchange

The sponsor bank confirms mandate creation back to the exchange via RC-100 status. Only bids with RC-100 (mandate successfully blocked) are displayed in the exchange's bid book. Bids with RC-other (rejected, pending, mandate failed) sit in a parked state. The broker's app shows the client a real-time "Application Status" updating from "Bid submitted" → "Mandate authorised" → "Successful (RC-100)".

<Aside type="caution">
**The 5:00 PM closing-day cut-off is hard.** Per [BSE 20220803-40](/broking-kyc/reference/circulars/bse/#20220803-40), UPI mandate acceptance expires at 5:00 PM on the IPO closing day. The exchange's bid book only counts RC-100 bids submitted by 5:00 PM. A bid submitted to the exchange at 4:58 PM but where the client hasn't authorised the UPI mandate by 5:00 PM is **dropped** from the book. Brokers typically stop accepting new bids at 4:30 PM and send escalating reminders for pending authorisations between 4:30 and 4:55. The exchange platforms themselves stop ingesting bids at 5:00 PM.
</Aside>

### Step 5 — Bid modification / withdrawal

Through the bidding window, the client can modify (revise quantity / price) or withdraw the bid. Each modification triggers a fresh UPI mandate authorisation. A withdrawal releases the existing block immediately. Note that modifications after T+1 used to be allowed on a separate "modification window" — per [BSE 20220803-40](/broking-kyc/reference/circulars/bse/#20220803-40), the separate bid-modification window on T+1 was eliminated for UPI and non-UPI bids from September 2022; all modifications must happen within the bidding window itself.

### Step 6 — Bid-day closure

At 5:00 PM on the closing day (T+2), the exchange freezes the bid book. The exchange publishes consolidated subscription numbers — category-wise (Retail / S-HNI / B-HNI / QIB / Employee), price-wise (subscription at each bid price within the band), and overall. These numbers are publicly visible on NSE / BSE bid status pages.

### Step 7 — Allocation by RTA

The RTA pulls the bid book from the exchange on T+2 evening. The RTA runs the allocation algorithm:

- **Retail category** — if oversubscribed, **lottery** based on a randomised draw. Each successful retail bidder receives **one bid lot** (the minimum). The remaining retail demand goes unallotted.
- **HNI categories** — **proportionate** allocation. If 10x oversubscribed in S-HNI, each successful bidder receives 10% of bid quantity, rounded down to the nearest lot.
- **QIB category** — **discretionary** within the merchant banker's book, subject to SEBI's mutual-fund / FPI / banks-NBFCs sub-category reservation rules.

By 12 midnight on T+2, the RTA publishes the **basis of allotment** to the exchanges and to the issuer's collection bank.

### Step 8 — Mandate debit / unblock

On the morning of T+3, the issuer's collection bank initiates debit only for the **allocated amount** of each successful allottee. The unallocated portion of the block is **released** the same day. For unsuccessful bidders, the entire block is released.

The release shows up in the client's bank as "block released" or "amount available again" — no money has moved out of the client's account other than the small amount actually allocated.

### Step 9 — Security credit & listing

The issuer's RTA submits the corporate-action file to NSDL / CDSL on T+2 evening. The depository credits the allotted shares to each successful allottee's BO ID on T+3 morning. The shares appear in the client's demat by mid-day T+3.

Listing on the exchanges happens on **T+3** itself (mandatory listing day per [SEBI/HO/CFD/TPD1/CIR/P/2023/140](/broking-kyc/reference/circulars/sebi-other/#sebihocfdtpd1cirp2023140)). The stock is available for trading from market open on T+3.

### Step 10 — Broker reconciliation

The broker reconciles, by EOD T+3:

- Bids submitted (from broker's terminal logs).
- Bids accepted by exchange (RC-100 file from exchange).
- Allotments confirmed (basis-of-allotment file from RTA).
- Refunds released (mandate-release confirmations from sponsor bank).
- Shares credited (BO credit file from depository).

Any mismatch — a client whose bid was RC-100 but isn't on the allotment file, a client allotted but not credited — triggers a manual reconciliation entry and a grievance ticket. The grievance flow is typically routed to the RTA in the first instance, escalating to the exchange's IGRC if unresolved.

<Aside type="note">
**Why the broker isn't on the funds path.** In the ASBA-UPI mechanism, the broker is a **mandate originator** but not a **fund handler**. The client's funds move directly from the client's bank to the issuer's collection bank (escrow). This is intentional — it removes the broker from the trust path, which historically caused investor losses when brokers used IPO float for proprietary purposes. The broker's compensation in the primary market is therefore not float-based but is a per-application fee (typically Rs 5–20 per UPI-mandate creation) plus exchange-paid syndicate brokerage on allocated value (typically 0.35–0.50% on retail allotment).
</Aside>

## 3. Bid categories and allocation mechanics

### Retail Individual Investor (RII)

Bid value **Rs ≤ 2 lakh** at cut-off. Allocation method: **lottery** if oversubscribed. Each successful bidder receives the **minimum bid lot only**, regardless of bid quantity. Reservation: typically **35% of net offer** (excluding anchor) in mainboard IPOs.

The lottery is run by the RTA on T+2 evening using a SEBI-prescribed randomisation algorithm. The seed and the participants are auditable; SEBI / exchange has periodically conducted spot checks. The number of successful retail allottees = (retail-reserved-shares / minimum-lot-shares). All other retail bidders get zero allocation.

This design favours small retail bidders — bidding for 1 lot has the same probability of allotment as bidding for 13 lots (the maximum retail bid). Bidders sometimes use multiple PAN-distinct family applications to increase their lottery chances, though per the multiple-application rule, applications from the same PAN beyond 5 are rejected.

### Non-Institutional Investor (NII) — sub-categorised since April 2022

Bid value **Rs > 2 lakh**. NII is now split into:

- **Small-HNI (S-HNI)** — bid value Rs 2 lakh < x ≤ Rs 10 lakh. Reservation: one-third of the NII portion (typically 5% of net offer).
- **Big-HNI (B-HNI)** — bid value > Rs 10 lakh. Reservation: two-thirds of the NII portion (typically 10% of net offer).

Both sub-categories: **proportionate** allocation. If S-HNI is oversubscribed 10x, each bidder gets 10% of bid (rounded down to the lot). If 100x, each bidder gets 1% of bid. There is no lottery in NII; proportionality is preserved through to the smallest bid that crosses one full lot. Below one full lot, draw of lots happens at the lot boundary.

The S-HNI / B-HNI split was introduced by SEBI in April 2022 to address the funded-bidding pattern where HNIs took large NBFC-funded loans (often 80–90% LTV against the IPO bid itself) to oversubscribe massively and capture the listing gains. The 1/3 : 2/3 split discourages this by reducing the marginal benefit of very large NBFC-funded bids and aligns with smaller bids.

### Qualified Institutional Buyer (QIB)

Bid value: no maximum. Reservation: typically **50% of net offer** (excluding anchor). The QIB book is further sub-allocated by sub-category — mutual funds get a minimum 5% of QIB, with the rest distributed across insurance, banks-NBFCs, FPIs, AIFs, pension funds, and others.

The QIB allocation method is **discretionary within proportionate** — the merchant banker, in consultation with the issuer, finalises the allocation per QIB bidder. SEBI's rules require disclosure of the basis (proportional vs discretionary), and most issues are now near-proportional with discretionary only in the over-subscribed sub-categories. QIBs typically place their bids on the closing day, often in the last hour, with the broker (or directly through their own custodian).

### Anchor Investor

Anchor is a subset of QIB allocated **one day before T (anchor day T-1)** at a price within the price band. Anchors must commit to a 30-day lock-in for at least 50% of allotted shares. Reservation: up to **60% of QIB** can be carved out for anchors. The anchor day allows the issuer to "anchor" the book with marquee names whose participation signals quality to retail bidders.

### Employee Reservation

Issuers may reserve up to 5% of net offer for employees. Allocation runs separately, with its own lottery for retail-sized bids and proportionate for larger bids. Employee category typically receives a small discount to the public issue price (often Rs 10–50 per share off the issue price).

### Shareholder Reservation

For listed parent-company IPOs (e.g., a subsidiary going public), the parent's shareholders can be given a reservation of up to 35% of net offer. Same allocation rules as retail / HNI as applicable to the bid size.

## 4. OFS — Offer For Sale (variations)

Offer For Sale is a fundamentally different mechanism — a **promoter / large-shareholder exit** rather than a fresh issuance. The shares already exist; the seller is offering them to the market via an exchange-operated window.

### Mechanics

OFS runs as a **separate trading-day session**, typically a single day, with a price-priority allocation. The seller publishes a **floor price** (the minimum acceptable price); bidders enter quantity and price during the OFS window (typically 09:15–15:30 on the OFS day, sometimes 09:15–12:30 for retail-only sessions).

Two categories:

- **Non-retail** — typically institutional bidders with a 75% reservation. Allocation: price-priority at or above floor.
- **Retail** — 25% reservation, with allocation via a separate retail-only window the next day or as a separate slot in the same day. Retail bids can be at "cut-off" price; allocation is proportionate within retail reservation, with a discount (typically 5%) on the cut-off price as a retail benefit.

### Broker-side flow

OFS bids route through the same OMS as cash-segment orders, but tagged with an OFS-eligible flag. The exchange returns acknowledgement and final allocation at end of day. Settlement happens on **T+1** in the same cycle as the cash segment — funds debit / securities credit follow the standard cash-settlement mechanism, not the UPI Block mandate path.

OFS is **delivery-based only** — no intraday, no margin trading on the OFS day itself. The buyer must have full funds (cash segment) at the time of bid placement. Brokers verify funds upfront against the available margin and reject bids that would breach margin.

Because OFS settles on T+1 like a regular cash trade, the broker's role is heavier here than in an IPO — the broker is on the funds-and-securities path, not just a mandate originator. Pre-trade margin checks, RMS validation, and post-trade contract notes all apply.

### Retail discount

OFS retail bids typically receive a 5% discount on the clearing price. The discount is funded by the seller (the promoter) and reflected in the contract note as a separate line item. The 5% discount applies only if the retail bid is at "cut-off" — bidding at a specific price forfeits the discount.

## 5. NCDs and other public-issue variations

### NCDs (Non-Convertible Debentures)

Public NCD issues follow a similar broad rail to IPOs but with substantial mechanical differences:

- **First-Come-First-Served (FCFS) allocation** within each category — not lottery, not proportionate. The basis-of-allotment file is sorted by bid timestamp, and allocation runs top-down until the category cap is hit.
- **Tenor categories** — many NCD issues offer 3-year, 5-year, 7-year, 10-year tenor options. Bidders specify their preferred tenor; allocation runs per-tenor with separate caps. Tenors that fill up first may close intra-day while others remain open.
- **Investor categories** — Category I (institutional), Category II (HNI), Category III (retail < Rs 10 lakh), Category IV (retail < Rs 2 lakh / individual). Each has its own reservation.
- **No demat allocation** for some retail bids — NCDs can be allotted in **physical form** if the bidder explicitly opts; demat is the default.

The funds flow for NCDs is identical to IPO — UPI Block for retail, ASBA for HNI. The post-allocation tranche is the same. The differences are entirely at the **allocation algorithm and category buckets** layer.

### Rights issues

A rights issue offers existing shareholders the right to subscribe to additional shares at a discount, proportional to their holding on a **record date**. The broker's role is to:

- Surface the rights entitlement (R-E) to the client (the depository auto-credits the R-E to the client's demat on ex-date).
- Allow the client to apply for, renounce (sell R-E in the market), or let lapse the entitlement.
- Route the application via ASBA / UPI Block to the issuer's collection bank.

[SEBI/HO/CFD/CFD-PoD-1/P/CIR/2025/31](/home/rakesh/work/broking-kyc/kyc-docs-site/src/content/docs/reference/circulars/sebi-other.md) (March 2025) reduced the rights-issue timeline to **23 working days** from board approval. The R-E itself trades in a separate window on the exchanges from ex-date to rights-issue-close (typically T-3 to T+5 of the issue period). Brokers must explicitly enable the R-E market session in their OMS; many smaller brokers leave it off by default.

### Buybacks and tender offers

Tender-route buybacks operate similarly to OFS in reverse — the company is buying back, retail and other shareholders submit shares at the tender price during a defined window. The broker's role is identical to OFS in mechanics but with the funds flow inverted (the seller receives funds; the buyer is the issuer, not a market participant).

### Delisting

A voluntary delisting via reverse book building has the broker capturing exit-price bids from the public shareholders, routed to the exchange's delisting window. The discovered price is the highest price at which the requisite 90%+ public-holding-acquired threshold is reached. Mechanics resemble OFS but with a defined floor price that's typically above the prevailing market.

## 6. Edge cases and sub-cases

### Oversubscription handling

For a heavily oversubscribed retail issue (5x, 10x, 100x), the lottery produces many more unsuccessful than successful bidders. The broker's grievance load can spike post-allotment — unsuccessful bidders sometimes file SCORES complaints alleging unfair allocation. The defence is the **audit trail**: RTA's lottery seed, bid book, and the random-draw output should be reproducible. SEBI inspects this periodically; the RTA preserves the artefacts for at least 8 years.

### Withdrawal during the window

A retail bidder can withdraw their bid at any time during the bidding window. The withdrawal triggers an immediate UPI mandate revocation; the block on the client's bank account is released same-day. The exchange's bid book removes the withdrawn bid; the bidder is treated as if they had not bid.

After the window closes, withdrawal is **not permitted** for retail (the bid is now firm). HNI bidders, in some issues, have a 1-day post-close withdrawal option but this is structured into the specific issue's prospectus.

### Mandate technical glitches

If the sponsor bank's PSP gateway is down during the bidding window, mandates may fail to authorise even with the client correctly entering their UPI PIN. Failed mandates do not produce RC-100 — the bid sits in a pending state. The exchange has a **3-attempt retry window** within the bid day; brokers escalate to the sponsor bank's helpdesk if the third attempt fails.

If a glitch on the bid day persists, SEBI's [grievance redressal mechanism](/broking-kyc/reference/circulars/sebi-other/#sebihocfddil2cirp202124801m) for IPO-UPI applications applies — bidders affected by a documented gateway outage may be granted relaxation through the post-day window, but only if the outage is recognised by SEBI / NPCI. Brokers maintain incident logs for each bid day to support such relaxation claims.

### Multiple applications by same PAN

SEBI's 2018 rule limits a PAN to **5 applications** per public issue. The RTA at allotment de-duplicates by PAN and rejects applications 6, 7, 8 etc. The first 5 (by bid timestamp) are processed. This typically affects families using the same PAN across multiple demat accounts (rare but seen) or fraud patterns where the same PAN is used across multiple syndicate members. The broker's UPI-mandate path itself doesn't enforce this — it's an RTA-side rejection.

### Anchor exit

Anchor allottees have a 30-day lock-in (recently extended in some issues to 30+90 day staggered lock-in for 50% + 50% of anchor allocation). Brokers servicing anchor clients track the lock-in expiry dates; the depository's lock-in flag on the BO holding releases automatically on the lock-in expiry.

### IPO listing-day surveillance

T+3 listing day has unique surveillance considerations. The price discovery for a newly-listed IPO is via a **special pre-open** session at 09:00–09:45 (longer than the regular 09:00–09:15 pre-open). The OMS must accept IPO orders from clients who hold the security but the symbol shows up only on T+3 morning. Many surveillance systems trigger spurious "abnormal price" alerts on listing day because the IPO has no historical price reference; brokers configure listing-day filters to suppress these.

### Withdrawal of the issue by the issuer

Rarely, an issuer may withdraw an IPO before allotment is finalised (typically due to undersubscription, regulatory action, or market crash). The RTA returns all blocked amounts to bidders via mandate release within the prescribed window (typically T+4 for full release). The broker reconciles the release event and notifies clients.

### Technical glitch at the exchange's bidding platform

If NSE IFM or BSE iBBS itself goes down during bidding hours, the exchange typically extends the bidding window by the duration of the outage. The broker monitors via the exchange's announcement channels and surfaces extension notifications to its bidding clients. Such extensions can affect the listing date — a 1-day extension typically shifts listing from T+3 to T+4.

## Practical notes

- **[industry practice]** Most brokers display a **GMP (Grey Market Premium)** indicator alongside the IPO listing — an unofficial indication of expected listing-day price, sourced from informal off-market trading. SEBI hasn't endorsed GMP, but its display is widespread. Brokers should ensure GMP is labeled as "unofficial" and "for information only" with appropriate disclaimers.
- **[gotcha]** UPI Block IPOs require the client's UPI app to support the specific issue's sponsor bank. If a client uses an app that doesn't support the sponsor bank (e.g., a niche regional app), the mandate creation fails. The broker should pre-warn at bid-time, not after.
- **[risk trade-off]** Allowing bid modification close to 5:00 PM closing-day cut-off maximises client flexibility but exposes the broker to bid-rejection grievances when mandate authorisations don't complete in time. Most brokers freeze new bids at 4:30 PM and require client confirmation by 4:45 PM.
- **[cost optimization]** A broker servicing high IPO volume can integrate directly with the exchange's bidding API (NSE IFM / BSE iBBS) rather than via a syndicate aggregator. Per-application costs drop substantially at volumes above ~50,000 applications per issue.
- **[industry practice]** Allocation files from RTAs are typically published in CSV / fixed-width formats specific to each RTA. Broker reconciliation systems normalise these into a common schema. The RTA's name (Link Intime, KFintech, MUFG Intime/Bigshare, Cameo, Maashitla, Skyline) determines the file format and submission timing.
- **[gotcha]** A retail bid above Rs 2 lakh is **automatically reclassified** to S-HNI at the exchange; the bidder loses the lottery benefit and is moved to proportionate allocation. Brokers should warn clients when the bid value crosses Rs 2 lakh.
- **[industry practice]** For OFS, large brokers run a separate trading-desk team for the day because OFS price dynamics (especially in retail discount sessions) can produce sharp volume spikes. Smaller brokers route OFS through the same desk as the regular trading session, accepting higher latency for occasional issuance.
- **[gotcha]** NCD allocations can close intra-day for filled tenor buckets. The broker's app should show real-time bucket-fill status to avoid bid rejections at the exchange.

## Cross-references

- [Broker Process Narrative](/broking-kyc/broker-process/narrative/) — Section 4 covers daily reporting touchpoints including primary-market reconciliation.
- [Compliance Blueprint — Investor servicing domain](/broking-kyc/operations/compliance-blueprint/) — investor-charter, complaint, contract-note obligations that also apply to IPO grievances.
- [NPCI Circulars](/broking-kyc/reference/circulars/npci/) — UPI Block / AutoPay / SBMD circulars (OC No. 200, OC No. 185A, OC No. 76A).
- [SEBI MRD / CFD Circulars](/broking-kyc/reference/circulars/sebi-other/) — IPO ASBA-UPI streamlining, T+3 listing, rights issue 23-day timeline.
- [BSE Circulars](/broking-kyc/reference/circulars/bse/) — UCC structure for primary issues, ASBA UPI 5:00 PM cut-off.
- [NSE Circulars](/broking-kyc/reference/circulars/nse/) — NSE IFM (Integrated Front-end Manager) bidding-window operating procedures.
- [Vendor Atlas](/broking-kyc/vendors/atlas/) — payment / mandate / UPI vendor category for sponsor-bank integration partners.

## Verified through

2026-05-14

---

*AI-generated and not legal, financial, or compliance advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*

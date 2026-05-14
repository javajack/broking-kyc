---
title: "Deep Dive: Investor Protection Fund (IPF)"
description: Investor Protection Fund procedure — claim eligibility on broker default, claim windows, per-investor cap, fund vs Core SGF distinction, exchange-administered IPFs (NSE / BSE / MCX), claim documentation, payout mechanics, historical pattern of payouts.
---

import { Aside } from '@astrojs/starlight/components';

> **Why this page is structured this way:** The IPF is *investor-facing* and procedural. A claimant doesn't care about Core-SGF stress tests; they care about (a) am I eligible, (b) what documents do I need, (c) what is the cap, (d) how long does it take. The page therefore opens with claim eligibility (the gating question), walks through the claim procedure step by step, then covers the operational sub-cases (custodian-cleared, NRI, joint accounts, deceased investor). Exchange-specific IPF differences (NSE / BSE / MCX) are pulled into a dedicated comparison section at the end.

## TL;DR

- The **Investor Protection Fund (IPF)** is an exchange-administered fund that compensates *investors* (clients) for losses arising from a **broker default** — when a SEBI-registered stock broker (or its associated authorised person) is declared a defaulter / expelled by the exchange and is unable to honour client obligations.
- IPF is distinct from the clearing corporation's Core SGF (see [SGF / Core SGF](./sgf-core-sgf/)). Core SGF guarantees inter-member settlement; IPF compensates *retail / non-institutional investors* directly.
- **Eligibility gating**: claim must arise from a *qualifying loss* — funds and/or securities deposited with the defaulting broker for trading purposes, not received back. Speculative loss, market-loss, and consequential damages are excluded.
- **Claim window**: typically **3 years from the date of broker default declaration / expulsion** notified by the exchange (some exchanges allow extension by IGRC). Late claims may be entertained at the exchange's discretion within a further outer window (often 5 years total).
- **Per-investor cap**: each exchange publishes a maximum compensation per investor per broker default. **NSE: up to Rs 35 lakh** per investor; **BSE: up to Rs 35 lakh** per investor; **MCX: up to Rs 10 lakh** per investor (per MCX Master Circular — Investor Protection Fund / Investor Service Fund, including corrigendum MCX/IPF/109/2026). Caps revised periodically by exchange in consultation with SEBI.
- **Administration**: managed by an IPF Trust at each exchange, governed by an IPF Committee with SEBI-nominee representation. Each exchange publishes a Master Circular on IPF/ISF (e.g., MCX IPF/ISF master, NSE Investor Services Department circulars, BSE Investor Services circulars) consolidating the framework.
- **Payout mechanism**: claim → IGRC scrutiny → IPF Committee approval → payment via bank credit to the claimant's verified bank account. Standard timeline 4–8 months from claim filing to payout for clean claims; longer for disputed claims that go through arbitration or ODR.
- **What is excluded**: any post-default trading activity by the client through any other broker; market-movement losses; opportunity-cost losses; tax liability arising from the default; losses through unauthorised trading (which has its own dispute resolution path — IGRC, arbitration, Smart ODR).

## Conceptual overview

When a SEBI-registered stock broker fails — runs out of capital, misappropriates client funds, makes operational errors that cause client loss, or is expelled by the exchange for regulatory violation — the *individual retail investor* finds themselves with funds or securities they thought were safely held in the broker's care, now potentially irrecoverable. The IPF is the regulator-mandated safety net for this scenario.

The IPF is funded by:
- A share of the exchange's listing fees, transaction charges, penalties, and unclaimed dividends / unclaimed funds.
- Penalties recovered from members (e.g., margin-shortage penalties, abnormal-trade penalties, surveillance-margin penalties — all routed to IPF after exchange retention).
- Interest accrued on IPF corpus invested in approved instruments (typically G-Sec, T-Bills, approved bank deposits).
- Voluntary contributions.

The fund is held in trust under an IPF Trust Deed (each exchange has its own) registered with SEBI; the IPF Committee (with SEBI-nominee participation) governs payouts.

The framework is built on three principles:

1. **Make the investor whole, not the speculator** — the IPF pays for the specific *unrecovered investment* with the defaulting broker, not for market losses or opportunity costs.
2. **First, exhaust the broker's own estate** — the exchange / CC apply the defaulter's BMC, ABC, exchange deposits, and any segregated client funds to the claim *before* invoking IPF; the IPF compensates the *residual gap*.
3. **Cap to protect the corpus** — the per-investor cap ensures the fund can compensate the many small investors who depend on it, rather than a small number of large institutional investors who have other risk-mitigation tools (custodian segregation, insurance, deeper diligence).

<Aside type="caution">
**IPF is a backstop, not a primary recovery channel.** A claimant must first attempt direct recovery from the defaulting broker (often impossible), then through the broker's segregated client-funds bank account (the SEBI client-funds-upstreaming framework provides direct visibility of these balances at the CC), then the broker's BMC/ABC at the exchange, before the IPF gap-fills the residual loss. The IPF "claim form" filing at the exchange triggers all of these checks in parallel.
</Aside>

## Claim eligibility — the gating questions

For an IPF claim to be entertained, the following gating conditions must be met:

### 1. Defaulting member is exchange-registered and declared a defaulter

The broker must be a current or past member of the exchange whose IPF is being claimed against, and must have been:
- **Declared a defaulter** by the exchange under its bye-laws (typically following payin failure, capital-deficiency, expulsion, or surrender of membership under regulatory action), or
- **Expelled** from membership.

If the broker is "in financial difficulty" but not yet declared a defaulter, no IPF claim is admissible — the claim must wait until the exchange formally declares the default.

### 2. Claimant is a *qualifying* investor

The claimant must be:
- A retail / individual investor — including joint-account holders, HUFs, NRIs (subject to FEMA-route considerations).
- An entity below a certain size threshold (specific thresholds per exchange's IPF rules).

**Excluded**: institutional investors (banks, insurance companies, mutual funds, FPIs, pension funds, and other clearing members) generally have separate recourse and are not within the IPF's protected class. Some exchanges allow small non-individual entities (small partnerships, small companies) within scope subject to net-worth cap.

### 3. Loss is a *qualifying* loss

The claim must relate to:
- **Cash balance** deposited with the defaulting broker that was not paid back upon demand or upon the broker's default declaration.
- **Securities** delivered to the defaulting broker or held in the broker's pool / segregated demat that were not returned to the client's BO upon demand or upon the broker's default declaration.
- **Sale proceeds** from a sale executed on the exchange where the broker failed to credit the proceeds to the client.
- **Unclaimed dividends / corporate-action benefits** in the broker's account on the client's behalf.

**Excluded losses**:
- Market loss (price movement against the client's position).
- Speculation loss (margin call invoked, position squared off).
- Opportunity-cost loss.
- Tax liability or interest exposure arising as a consequence.
- Losses from unauthorised trading where the broker traded without authority — this is a separate dispute pathway via IGRC, arbitration, and Smart ODR rather than IPF.
- Losses from off-market dealings unrelated to exchange-traded business (private off-market lending, fixed-deposit-like instruments offered by the broker outside exchange-traded products).
- Losses incurred *after* the broker's default-declaration date (e.g., trades on another broker post-event).

### 4. Claim filed within the prescribed window

- **Standard window**: 3 years from the date of declaration of the broker as a defaulter.
- **Extended window** (in exchange-IPF discretion): up to 5 years for late claims with cause shown.
- Claims beyond the outer window are generally barred.

### 5. Compensation within the per-investor cap

Compensation is capped at the per-investor limit per broker default. The cap applies *per claimant per defaulting broker* — a claimant with claims against two different defaulting brokers is eligible for the cap from each respective broker's IPF, but a claim spanning multiple defaulting brokers cannot exceed the cap per broker.

## The claim procedure — walkthrough

### Step 1 — Default declaration and exchange notification

The exchange declares the broker a defaulter under its bye-laws and publishes the declaration:
- On the exchange's website (defaulter / expelled members section).
- By circular to all members (e.g., NSE Investor Services Department circulars / NSE Inspection circulars; BSE Notices; MCX IPF/ISF master-circular update).
- By press notification.
- By intimation to SEBI, other exchanges (NSE / BSE / MCX cross-MII intimation), CCs, depositories.
- By direct intimation to known clients of the defaulter through their registered contact channels (where available).

The declaration triggers:
- The 3-year claim window starts.
- All UCC / clearing-member positions of the broker are frozen.
- The CC begins applying the funded waterfall (see [Member default recovery](./member-default-recovery/)).
- The exchange takes control of the broker's office, books, and records for forensic review.

### Step 2 — Public notice and claim invitation

The exchange publishes a public notice in:
- The exchange's website (a dedicated "default and IPF claims" section).
- National newspapers (Hindi and English) where the defaulting broker had clients.
- Direct mail / email to known clients of the defaulter.

The notice specifies:
- Default declaration date.
- Claim window (typically 3 years).
- Claim form URL / address for collection.
- Required documentation.
- Contact: the exchange's IGRC / Investor Services Department.

### Step 3 — Claimant collects documentation

The claimant assembles:

**Identity and bank**:
- KYC documents — PAN copy, address proof, photograph.
- Bank account proof — cancelled cheque, latest statement; bank account in claimant's name.

**Relationship with the defaulting broker**:
- Client agreement / account-opening forms with the defaulting broker.
- Account statement / contract notes for the disputed period.
- Demat account statements (CDSL CAS / NSDL Consolidated Account Statement) showing securities held with the broker.
- Bank statements showing payments to the broker and any refunds attempted.
- UCC details — the exchange's records will already reflect this but the claimant's copy strengthens the claim.

**The specific claim**:
- Computation of the claim amount — written narrative explaining what funds / securities were with the broker, what was promised by the broker, what was returned (if any), and the unrecovered balance.
- Any correspondence with the broker — emails, letters, complaints — showing the demand and the failure to deliver.
- IGRC / SCORES complaint reference, if any prior complaint was filed with the exchange before the default declaration.

**Other**:
- Affidavit / undertaking that the claim does not include market loss / speculative loss / consequential damages.
- Indemnity in favour of the exchange against future claims on the same facts (claimant agrees not to double-claim).
- For deceased investor: legal heir / succession certificate; for minor: guardian KYC.

### Step 4 — Claim form filing

Claimant submits the claim form (per exchange's prescribed format) with all supporting documentation:
- **NSE**: through NSE's Investor Services Department, online claim filing portal where available, or physical submission at NSE office.
- **BSE**: through BSE Investor Services Department, physical or online submission per BSE's published procedure.
- **MCX**: through MCX Investor Services Department per MCX/ISD Master Circular (Default) Version 3 dated 2025-04-29 (the consolidated circular for investor-default claims on MCX).

The exchange acknowledges receipt with a claim reference number and assigns the claim for scrutiny.

### Step 5 — Exchange / IGRC scrutiny

The exchange's Investor Services / IGRC team verifies:
- The defaulting broker's books and records — does the broker's ledger reflect the claimant's relationship and the disputed amount?
- The exchange's own records — UCC registration, trade history, settlement records.
- CC records — settlement payin / payout history for the claimant's UCC.
- Depository records — securities holdings, pledge records, payout history.
- The CC's segregation framework records — was the claimant's money / securities segregated as expected? If yes, those segregated assets are returned to the claimant *outside* IPF (see Step 7 below).

The scrutiny is intended to:
- Validate the claim — is the amount real, documented, and qualifying?
- Exclude non-qualifying components — market loss, speculative loss, ineligible items.
- Compute the *qualifying loss* — the amount the claimant is owed that has not been recovered from any other source.

If documentation is insufficient, the exchange may issue a deficiency notice with a 30-day cure window.

### Step 6 — IGRC determination and IPF Committee approval

For claims under a threshold (typically Rs 25 lakh, exchange-specific), the IGRC determines the qualifying loss and recommends the IPF Committee. The IPF Committee approves the recommended payout.

For claims above the threshold, the matter goes through additional review (often including arbitration before the IPF Committee finalises) before approval.

The IPF Committee's approval determines:
- Approved claim amount (subject to per-investor cap).
- Payment timing.
- Any conditions (e.g., assignment of claimant's residual rights to the exchange so the exchange can pursue the defaulter for recovery).

### Step 7 — Pre-IPF recoveries from defaulter's estate

In parallel with IPF processing, the exchange / CC apply available recoveries from the defaulter's estate to reduce the IPF liability:
- **Segregated client funds**: the SEBI client-funds-upstreaming and segregation framework ensures the broker maintains a segregated client-funds bank account; balances there at the time of default are claimable by clients *outside* IPF (these are *the client's money* held in trust, not the broker's money).
- **Segregated client securities**: per SEBI's pledge / repledge framework, client securities held in the broker's CUSPA / CSMFA / pool accounts are identifiable to specific client BOs; the depository can return these directly to the client.
- **BMC / ABC** at the exchange — applied first to settlement-side obligations (CC's waterfall), residual to client claims.

The *gap* between what the claimant is owed and what is recovered from these sources is what the IPF compensates, up to the per-investor cap.

### Step 8 — Payment

The exchange's IPF Trust effects payment to the claimant's verified bank account (penny-drop verified). Payment is by NEFT / RTGS / IMPS.

Concurrent intimation:
- Payment advice to the claimant.
- TDS as applicable — IPF compensation is typically not taxable as it is the return of the claimant's own capital, not income, but interest or excess components may attract TDS; the exchange advises on applicable tax handling.
- KYC / FATCA / CRS as required.

### Step 9 — Post-payment follow-up

- Claimant signs receipt / discharge in favour of the exchange.
- The exchange records the payment in the IPF accounts.
- The exchange may pursue civil recovery against the defaulting broker's estate; recoveries are credited back to the IPF.
- The claim file is closed.

## Claim documentation checklist

For practical use, a claim file should include:

| Category | Documents |
|---|---|
| Identity | PAN, address proof, photograph, KYC acknowledgment / KRA reference |
| Bank | Cancelled cheque or front page of bank passbook; bank account in claimant's name |
| Demat | CDSL CAS / NSDL CAS for the relevant period; DP-ID and Client-ID details |
| Trading account | Client master at defaulting broker (if available), client agreement, contract notes for relevant period |
| Claim computation | Spreadsheet / narrative computing the claimed amount with supporting trade-by-trade or balance-by-balance breakdown |
| Correspondence | All emails / letters / SCORES references between claimant and defaulting broker |
| Affidavit | Declaration of qualifying loss; no double claim; no inclusion of speculative / market losses |
| Indemnity | Indemnity to the exchange against future claims on same facts |
| Legal heir / minor papers (where applicable) | Succession certificate, legal heir certificate, guardian documents |
| Power of attorney (where applicable) | Notarised POA if claim is being filed through a representative |

## Payout mechanics and timing

- **Median claim processing**: 4–8 months for clean claims with full documentation.
- **Complex / disputed claims**: 12–24 months where the IGRC or arbitration needs to determine quantum.
- **Payment mode**: NEFT / RTGS / IMPS to verified bank account.
- **Currency**: INR.
- **Tax treatment**: IPF payment is generally the return of capital and not income; specific tax treatment depends on the claimant's circumstances and should be confirmed with a tax advisor.
- **No partial-then-final**: the exchange typically makes a single payment per claim — no instalment payouts (excepting very large claims at IPF Committee discretion).

<Aside type="tip">
**Penny-drop verification.** Before payout, the exchange's IPF processing team performs penny-drop on the claimant's bank account to confirm the account is alive and in the claimant's name. A claimant whose registered bank account at the broker has since closed must update the IPF claim file with the new bank account and a fresh penny-drop attempt, which adds time.
</Aside>

## Exchange-administered IPFs — comparison

### NSE IPF

- **Administrator**: NSE Investor Services Department; IPF Trust governed by IPF Committee with SEBI nominee.
- **Per-investor cap**: up to Rs 35 lakh per investor per broker default (subject to SEBI-approved revisions).
- **Master circular / framework**: NSE Investor Services Department circulars (regularly issued, referenced in the [NSE circulars index](/broking-kyc/reference/circulars/nse/)).
- **Claim filing**: through NSE Investor Services Department; physical and online submission per published procedure.

### BSE IPF

- **Administrator**: BSE Investor Services Department; IPF Trust governed by IPF Committee with SEBI nominee.
- **Per-investor cap**: up to Rs 35 lakh per investor per broker default (subject to SEBI-approved revisions).
- **Master circular / framework**: BSE Investor Services Department circulars.
- **Claim filing**: through BSE Investor Services Department.

### MCX IPF

- **Administrator**: MCX Investor Services Department; IPF / Investor Service Fund (ISF) Trust per the MCX framework.
- **Per-investor cap**: up to Rs 10 lakh per investor per broker default (per MCX Master Circular — Investor Protection Fund / Investor Service Fund; cap variations reflect MCX's commodity-derivatives focus where retail exposures historically smaller).
- **Master circular**: **MCX/IPF/109/2026** dated 2026-03-05 (corrigendum to Master Circular — Investor Protection Fund / Investor Service Fund), which rescinded earlier MCX/IPF/369/2024 dated 2024-05-31. The master circular covers Exchange circulars / communications issued up to March 31, 2025 and consolidates the operational framework for member-default handling at MCX.
- **Also relevant**: **MCX Master Circular — Investor Services Department (Default) Version 3** dated 2025-04-29, which consolidates SEBI and exchange directives on member default — covering information sharing on defaulter declaration, show-cause notices, website disclosures, investor-claim filing, IPF disbursement, defaulter-asset recovery, and client-debit-balance treatment. Replaces Chapter 14 of MCX Business Rules.
- **Claim filing**: through MCX Investor Services Department per the master circular procedure.

### Inter-exchange handling

A claimant whose defaulting broker was a member of multiple exchanges has the option to file claims at each exchange's IPF subject to:
- Claims at each exchange are evaluated separately.
- A single underlying loss cannot be claimed twice (claimant declares any other-exchange IPF claim in each filing).
- Each exchange's per-investor cap applies independently.

A clearing member's default at the CC level triggers IPF claim invitations from *each exchange where the defaulter was registered*; the exchange and the CC share information per the cross-MII intimation framework.

## Historical and structural notes

- **Pre-2014 framework**: SEBI's regulatory framework for IPF / ISF predated the 2014 Core SGF framework. IPF was operationalised in the early 2000s and refined through periodic SEBI circulars; the framework gained renewed attention after several broker-default events in the post-2018 period (e.g., Karvy Stock Broking Limited, NSEL-linked broker exposures, and others).
- **Karvy event (November 2019)**: NSE / BSE declared Karvy Stock Broking a defaulter; large volume of IPF claims processed thereafter, sharpening the claim documentation, KYC verification, and segregation-recovery interplay. The event is a frequent reference point in IPF training material and SEBI circulars on segregation post-2019.
- **Post-segregation framework**: SEBI's strengthened client-funds segregation and direct-payout-to-demat (NCL/CMPT/66779 dated 2025-02-21 onwards; ICCL 20250214-69 pilot; subsequent NCL/CMPT/67947 and NCL/CMPT/69455) reduces the dependence on IPF by ensuring client securities and funds are *protected at the depository and CC level* and recoverable directly upon default, with IPF as the residual backstop.
- **The Investor Education and Protection Fund (IEPF)**: distinct from the exchange IPF. IEPF is administered by MCA (Ministry of Corporate Affairs) for *unclaimed corporate dividends and unclaimed company funds*, not for broker default. A claimant should not confuse the two — broker-default claims go to the exchange IPF; unclaimed corporate dividends go to IEPF.

## Sub-cases and edge cases

### Custodian-cleared client

A custodian-cleared client (institutional, FPI, or certain HNI clients with a separate custodian arrangement) has the custodian as the clearing party for their trades. If their *broker* defaults but the *custodian* is solvent, the client's settlement obligations are still met by the custodian; the IPF claim relates only to any residual broker-balances (e.g., unsettled trade margin held with the broker rather than the custodian). The institutional client typically has direct recourse and rarely files IPF claims.

### NRI claimant

NRI claimants are eligible subject to FEMA-route validation. Funds in NRE / NRO account refunded through IPF must respect the underlying account's repatriability rules. Documentation must include PIS letter (where applicable), NRE / NRO bank proof, and FATCA / CRS declarations. See [NRI conversion](/broking-kyc/lifecycle/nri-conversion/) for NRI-specific considerations.

### Joint account

Joint account claims are filed under the first-holder's name with co-applicant joint signatures. Payment is to the first-holder's account (or as nominated). All joint holders sign the discharge.

### Deceased investor

Where the underlying client has deceased between the default and the claim, the legal heir / nominee files the claim per the exchange's procedure for deceased-investor claims. Succession certificate / legal heir certificate is required. See [Transmission](/broking-kyc/lifecycle/transmission/) for the broader procedure on deceased-investor handling at the broker / depository level — IPF claims piggyback on the same documentation.

### Minor investor

Minor's claim filed by guardian; payment to guardian's account or to the minor's account on attaining majority, depending on the exchange's policy and the IPF Committee's directions.

### Authorised person (AP) / sub-broker default vs broker default

The IPF compensates losses arising from a *defaulting member (broker)*. If the loss arose from an *Authorised Person* (AP) of a non-defaulting broker (e.g., AP misappropriated client funds), the broker remains liable to the client under the AP framework; this is *not* an IPF claim. The dispute pathway is IGRC / arbitration / Smart ODR against the broker. The IPF only engages if the *broker itself* is declared a defaulter. See [Authorized Person framework](/broking-kyc/deep-dives/compliance-audit/ap-framework/) for AP-vs-broker liability allocation.

### Claim through SCORES → IGRC → IPF

Many IPF claims start life as SCORES complaints. When a client files a SCORES complaint against a broker and the broker is subsequently declared a defaulter, the SCORES complaint becomes a strong supporting document for the IPF claim. The SCORES complaint reference, IGRC determination (if obtained), and any arbitration award all feed into the IPF claim file.

### Disputed claims and arbitration

A claim disputed by the exchange (e.g., on quantum, on qualification of loss, on inclusion of market loss) goes to arbitration under the exchange's arbitration framework. Awards are binding; appeals lie to the SAT and onwards. Disputed-claim timelines stretch to 12-24 months or more.

### Late-filed claims (beyond 3 years)

The 3-year window is the standard. Some exchanges accept claims filed up to 5 years from default declaration at the IPF Committee's discretion, on a sufficient-cause showing (e.g., NRI claimant who learned of default belatedly; mentally incapable claimant). Beyond 5 years, claims are generally barred.

## Practical notes

- **[industry practice]** Most large brokers run an internal "client-asset-segregation" treasury function that reconciles end-of-day client funds segregated balances with the CC's view (via NCL / ICCL margin reports) and the depository's view (via CUSPA / CSMFA holdings). The goal is to ensure that *if* the broker were declared a defaulter tomorrow, the client-asset recovery from the segregation framework would maximise — leaving IPF as a small backstop.
- **[gotcha]** Clients often assume *all* their losses with a defaulting broker are IPF-claimable. Market losses and speculative losses are not. The most surprising rejection in IPF claims is market loss disguised as "investment loss" — claimants need clear documentation that the unrecovered amount was a *deposit* with the broker, not a *speculative position* that moved against them.
- **[risk trade-off]** A higher per-investor cap protects more individual investors but consumes the corpus faster in a large default; a lower cap is sustainable across more defaults but leaves wealthier individual investors un-fully-compensated. The current Rs 35 lakh / Rs 10 lakh range reflects a calibration to median retail exposures with periodic SEBI review.
- **[cost optimization]** The exchange's IPF processing cost is dominated by documentation-collection and reconciliation; standardised claim forms, online filing, and digital documentation reduce this substantially. NSE / BSE have moved to online claim portals for most categories.
- **[timeline pressure]** The 3-year claim window appears generous but is often missed by claimants who only learn of the default through indirect channels months later. Active monitoring of "defaulter / expelled members" notifications on exchange websites is the only reliable way for an investor to know promptly.

## Cross-references

- [Deep Dive: SGF / Core SGF framework](./sgf-core-sgf/) — the CC-side counterpart fund, distinct from the IPF.
- [Deep Dive: Member default recovery](./member-default-recovery/) — the procedural side of a default that activates the IPF claim window.
- [Deep Dive: Client funds upstreaming](/broking-kyc/deep-dives/settlement/client-funds-upstreaming/) — the segregation framework that *reduces* dependence on IPF by protecting client balances at the CC level.
- [Deep Dive: Direct payout to demat](/broking-kyc/deep-dives/settlement/direct-payout-to-demat/) — the SEBI framework ensuring client securities flow directly to client BO, reducing broker-pool exposure.
- [Deep Dive: Authorized Person framework](/broking-kyc/deep-dives/compliance-audit/ap-framework/) — distinguishing AP liability from broker liability for IPF purposes.
- [Deep Dive: SCORES procedure](/broking-kyc/deep-dives/compliance-audit/scores-procedure/) and [IGRC](/broking-kyc/deep-dives/compliance-audit/igrc/) — upstream investor-complaint paths.
- [Deep Dive: ODR](/broking-kyc/deep-dives/compliance-audit/odr/) — Smart ODR resolution as an alternative path for non-IPF qualifying disputes.
- [Lifecycle: Transmission](/broking-kyc/lifecycle/transmission/) — deceased-investor handling that informs IPF claim filing in death scenarios.
- [Circulars — MCX](/broking-kyc/reference/circulars/mcx/) — MCX/IPF/109/2026 corrigendum and the MCX Master Circular — Investor Services Department (Default) Version 3 dated 2025-04-29.
- [Circulars — NSE](/broking-kyc/reference/circulars/nse/) and [BSE](/broking-kyc/reference/circulars/bse/) — exchange-specific IPF / Investor Services circulars.

## Verified through

2026-05-14

---

*AI-generated and not legal, financial, or compliance advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*

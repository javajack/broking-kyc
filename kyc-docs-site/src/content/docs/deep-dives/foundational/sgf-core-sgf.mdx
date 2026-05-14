---
title: "Deep Dive: SGF and Core SGF framework"
description: Settlement Guarantee Fund and Core SGF — segment-specific contribution rates, the defaulter's-deposit-to-Core-SGF draw sequence, replenishment obligations, member liability mechanics, inter-clearing-corp arrangements, and transparency disclosures across NSCCL, ICCL, MCXCCL.
---

import { Aside } from '@astrojs/starlight/components';

> **Why this page is structured this way:** The Settlement Guarantee Fund is best understood as a *funded financial waterfall* — a multi-layer stack of capital that a clearing corporation can pull from when a member fails to honour a settlement obligation. The page therefore opens with the conceptual stack, then drills into the contribution side (who pays in, how much, in what form), the draw side (the strict sequence in which capital is consumed during a default), the replenishment side (what happens after a draw), and finally cross-segment and cross-clearing-corp variations. A 2014 SEBI circular reframed the entire framework around a "Core SGF" minimum corpus; the page reflects that as the organising principle and traces variations by segment from there.

## TL;DR

- The **Settlement Guarantee Fund (SGF)** is the funded financial waterfall a clearing corporation (CC) uses when a clearing member (CM) fails to meet a settlement obligation. The SGF guarantees settlement to non-defaulting members and to the market as a whole.
- Since 2014, the SEBI framework distinguishes a minimum mandatory **Core SGF** corpus (sized by stress-test methodology, contributed by CC, exchange and members) from any non-core SGF or member-margins layer above it.
- **Draw sequence is mandatory and ordered**: (1) defaulter's own resources at the CC — margins (initial, MTM, special, additional, exposure), pay-in shortfall recoveries, plus the **defaulter's contribution to the SGF / Core SGF**; (2) defaulter's deposits at the exchange — **Base Minimum Capital (BMC)** plus any **Additional Base Capital (ABC)** deposited with the exchange or held as CC collateral; (3) insurance proceeds where applicable; (4) **CC's "skin-in-the-game" Core SGF contribution** (minimum 25% of the Core SGF corpus required by SEBI); (5) remaining **non-defaulter member SGF contributions** including non-defaulter Core SGF on a pro-rata basis; (6) **CC's residual capital / loss-allocation tools** under its waterfall, which may include cash calls on non-defaulting members ("further capital contribution"), pro-rata variation-margin haircuts, partial tear-up, and ultimately invocation of the CC's recovery / resolution mechanism.
- **Core SGF corpus** is dimensioned by SEBI's stress-test methodology and reviewed monthly — a CC must be capitalised to withstand the simultaneous default of the two largest clearing members at the segment level under stress scenarios ("Cover 2").
- **Segment-specific SGFs**: each CC maintains a separate SGF per segment — Capital Market (CM), Futures & Options (F&O), Currency Derivatives (CD), Commodity Derivatives, Tri-party Repo and others. A draw in one segment does not consume the SGF of another segment.
- **Replenishment** of any drawn-down member contribution is mandatory within a SEBI-prescribed window (typically T+3 working days); failure to replenish triggers member-default consequences in its own right.
- **CCs in scope**: NSE Clearing (NCL / NSCCL), Indian Clearing Corporation (ICCL — BSE group), Multi Commodity Exchange Clearing Corporation (MCXCCL), Metropolitan Clearing Corporation of India (MCCIL — limited segments), NSE IFSC Clearing Corporation (NICCL — GIFT IFSC).
- **Disclosure and transparency**: Core SGF corpus, monthly stress-test results, and broad waterfall description are published periodically — quarterly disclosures by NSCCL/ICCL/MCXCCL on Core SGF size, MPOR assumptions, and stress test outcomes.

## Conceptual overview

When a broker (in clearing-member capacity) fails to meet a payin obligation — whether of funds (in cash market) or of securities (in cash market delivery), or variation margin (in F&O / commodities), or final settlement (in physical-delivery commodity contracts) — the clearing corporation has guaranteed settlement to the *other* side of the trade. The buyer expects securities; the seller expects funds. The CC honours those obligations *first*, then reaches into a stack of pre-funded resources to recover the loss. The SGF and Core SGF are the central two layers of that stack.

The framework rests on three philosophical pillars:

1. **The defaulter pays first.** Before any common pool is touched, *every paisa of the defaulter's own collateral and contributions* must be exhausted. This is non-negotiable and is the first principle of every CC's default-management procedure.
2. **The CC has skin in the game.** A CC may not push 100% of losses to non-defaulting members. SEBI requires CCs to maintain a "skin-in-the-game" contribution to the Core SGF — currently a minimum of 25% of the required Core SGF corpus, exclusive of penalty interest accruals — and this is consumed *before* non-defaulter member contributions.
3. **Mutualisation has limits.** Beyond the Core SGF, the CC's default-management framework includes loss-allocation tools (assessment, haircut, tear-up) that are mutualised across surviving members — but each tool has caps and rules to prevent unbounded liability on any one member.

The framework was substantially reformed by SEBI circular **CIR/MRD/DRMNP/25/2014 dated August 27, 2014** ("Core Settlement Guarantee Fund, Default Waterfall and Stress Test"), which introduced the Core SGF concept, mandated the stress-test sizing methodology, defined the standard waterfall, and prescribed contribution shares. This page tracks the framework as in force as of 2026-05-14, with subsequent amendments tracked through SEBI master circulars on stock-exchanges / clearing-corps and clearing-corp-specific circulars (NCL/CMPT, ICCL, MCXCCL/RISK).

<Aside type="caution">
**Read primary sources before acting.** SEBI's 2014 Core SGF framework has been amended multiple times in subsequent SEBI master circulars (including the master circular for stock exchanges and clearing corporations periodically reissued) and through individual clearing-corp circulars (e.g., MCXCCL/RISK series, NCL/CMPT series). The summary below reflects the framework's structure; specific percentages and limits may have been calibrated since the page was verified. Always cross-check the current SEBI Master Circular for Stock Exchanges and Clearing Corporations and the specific CC's risk-management circular.
</Aside>

## The funded waterfall: what sits inside the SGF/Core SGF stack

A clearing corporation's default waterfall comprises *funded* and *unfunded* layers. The SGF/Core SGF is the funded portion; loss-allocation tools beyond it are unfunded.

### Funded layers (in draw order)

1. **Defaulting member's resources at the CC**
   - Initial Margin (IM), Variation / MTM Margin, Special / Additional Margins, Extreme Loss Margin (ELM), Premium Margin (options), Tender / Delivery-period margins (commodities, physical-delivery scrips).
   - Premium pledged collaterals — cash, FDR, BG, government securities, approved equity, ETFs, MF units — held at the CC for the defaulting member's account.
   - Defaulter's mandatory contribution to the Core SGF (member share).
   - Defaulter's non-core SGF contribution and any voluntary deposits.
   - Defaulter's BMC / ABC if maintained at the CC as collateral (vs at the exchange — see split below).

2. **Defaulting member's resources at the exchange**
   - Base Minimum Capital (BMC) at the exchange — the mandatory minimum capital prescribed by SEBI (currently Rs 50 lakh for trading-cum-self-clearing members in capital market and Rs 75 lakh / Rs 1 crore tiers based on category in derivatives, with variations in the commodities space).
   - Additional Base Capital (ABC) — voluntary additional capital deposited at the exchange beyond BMC, typically to support higher exposure limits.
   - Other exchange deposits — admission fees, exchange security deposit, segment-specific deposits.
   - These exchange-level deposits are transferred to the CC for application against the default loss per the inter-MII agreement.

3. **Insurance proceeds**
   - Where the CC maintains an insurance policy against catastrophic clearing losses, proceeds payable on a default loss flow into the waterfall before mutualised member SGF is consumed.
   - Coverage is typically narrow (cyber / operational / professional indemnity) and not always triggerable in plain member-default scenarios; presence varies by CC.

4. **CC's "skin-in-the-game" Core SGF contribution**
   - Per SEBI's 2014 framework, the CC must contribute a minimum **25%** of the required Core SGF corpus from its own capital. This contribution sits at the same "post-defaulter" position as the next layer but is consumed *before* non-defaulter member contributions.
   - The CC's skin-in-the-game contribution is replenished from CC's own resources (not from member assessments) when drawn.

5. **Non-defaulter member contributions to the Core SGF**
   - Per the 2014 framework, member contribution to Core SGF was capped at **25%** of the total corpus (with exchange contributing 25% and CC contributing balance to make 100%; this composition has been recalibrated in subsequent SEBI circulars — current member contribution may be near zero or a small residual depending on the stress test outcome).
   - Drawn pro-rata across non-defaulting members on the basis of margin or turnover (per CC's published methodology).
   - **Replenishment obligation**: drawn-down non-defaulter contributions must be replenished by the contributing members within typically **T+3 working days** of the draw event; non-replenishment can itself trigger member default.

6. **Non-defaulter member contributions to non-core SGF / additional CC-held collateral**
   - Some CCs maintain a non-core SGF layer between Core SGF exhaustion and the mutualisation tools.

### Unfunded loss-allocation tools (beyond the SGF stack)

Once the funded waterfall is exhausted, the CC's recovery and resolution framework permits — subject to caps, governance approval, and regulator intimation — additional measures:

7. **Cash call on non-defaulting members** ("Further Capital Contribution" or assessment power) — surviving clearing members called upon to deposit additional capital, capped at a multiple (typically 1x or 2x) of their then-existing Core SGF contribution. Used during extreme stress; rarely invoked.

8. **Variation-margin haircut (VMGH)** — instead of paying out the full variation margin profit on the day of default to *winning* members, the CC applies a haircut, reducing the payout pro-rata to share the residual loss. This is a market-wide tool that mutualises losses across all members long the defaulter's position.

9. **Partial tear-up / contract termination** — the CC unilaterally tears up the defaulter's open contracts (or a subset thereof), realising losses at then-prevailing prices. Used as a tool of last resort to stop ongoing variation-margin bleed.

10. **CC residual capital and resolution mechanism** — beyond all of the above, the CC's own residual reserves and ultimately its resolution under the FSDC Sub-Committee / SEBI resolution framework. This is the failure case the entire Core SGF framework is calibrated to prevent.

<Aside type="tip">
**Cover 2 = the design constraint.** The Core SGF corpus is *sized* so that the funded waterfall — defaulter's collateral plus CC skin-in-the-game plus non-defaulter Core SGF — can absorb the **simultaneous default of the two clearing members with the largest stress-loss exposure to that CC under defined stress scenarios**, computed monthly. The "Cover 2" standard derives from the CPMI-IOSCO Principles for Financial Market Infrastructures (PFMIs) and is mandatory under SEBI's stress-test framework for clearing corporations.
</Aside>

## The contribution side: who pays in, how much, in what form

The Core SGF corpus has three contributing parties: **clearing corporation, stock exchange, and clearing members** (the defaulter's own contribution to the SGF being part of the member-contribution layer). SEBI's 2014 framework set baseline composition ratios; the *required corpus* for each segment is determined dynamically by monthly stress tests.

### Required corpus determination

- Each CC runs a **monthly stress test** per the SEBI-prescribed methodology (multiple historical scenarios + hypothetical scenarios + reverse stress test) to estimate the **uncovered loss** in the default of the two largest exposures in each segment.
- The required Core SGF corpus equals at least the highest of these stress-test outcomes (subject to regulatory floors).
- Results of the monthly stress test are published quarterly by each CC on its website (per SEBI circular on transparency of CC stress tests).

### Composition ratios (post 2014 framework)

The original 2014 circular split the Core SGF as:
- **CC** contribution: balance to make 100% (in practice often the largest single contributor).
- **Exchange** contribution: typically up to 25%, drawn from the exchange's annual profit (initially defined as a slice of the exchange's profit for the relevant year, transferred to the CC for SGF maintenance).
- **Clearing members** contribution: up to 25%, drawn from members proportionate to risk (margin / turnover share).

Subsequent SEBI calibrations have allowed the CC and exchange to absorb the entire required Core SGF, reducing or eliminating member contributions where the CC + exchange capital is sufficient to cover the stress requirement. Each CC's specific contribution structure is published; **for current contribution shares, the reader must consult the CC's current annual risk-management framework circular** (e.g., NCL/CMPT consolidated cash-segment circular, MCXCCL/RISK master circular, ICCL annual risk-management circular).

### Form of contribution

Acceptable forms include:
- **Cash** (rupee deposit at the CC's settlement bank).
- **Fixed deposits** with approved banks, pledged to the CC.
- **Bank guarantees** from approved banks, in the CC's favour.
- **Government securities** (G-Sec / T-Bills / SDLs / Sovereign Gold Bonds) with VaR-rate haircut.
- For the *defaulter's contribution* layer specifically, the defaulter's pledged equity / ETF / mutual fund collateral may also count subject to per-security and per-issuer concentration caps (see clearing-corp approved collateral lists, e.g., MCX/MCXCCL/094/2026 and successor lists).

A given CC's risk-management circular specifies the acceptable forms and haircuts.

### Segment-specific SGFs

Each CC maintains a **separate SGF per segment**. A draw in one segment does not consume the SGF of another segment; replenishment obligations are segment-specific. Approximate segment landscape (as of 2026-05-14):

| Clearing corp | Segments with separate SGF / Core SGF |
|---|---|
| NSE Clearing (NCL / NSCCL) | Capital Market (CM), Futures & Options (F&O), Currency Derivatives (CD), Commodity Derivatives (CDS — limited), Tri-Party Repo (TREPS), Securities Lending and Borrowing (SLBM uses CM SGF) |
| Indian Clearing Corporation (ICCL — BSE) | Capital Market (CM), Equity Derivatives (EQD), Currency Derivatives (CD), Commodity Derivatives, Mutual Funds (BSE StAR MF), Tri-Party Repo |
| MCX Clearing Corporation (MCXCCL) | Commodity Derivatives (CD — primary), Bullion, Energy, Base Metals, Agri (these are within the single commodity-derivatives Core SGF but with sub-stress-tests by category) |
| Metropolitan Clearing Corporation (MCCIL) | Capital Market, Currency Derivatives (limited) |
| NSE IFSC Clearing Corporation (NICCL) | International derivatives at GIFT IFSC (separate framework under IFSCA) |

### NSE CM segment (NSCCL) — illustrative

NSCCL's consolidated annual master circular for the Capital Market segment (NCL/CMPT/67751 dated April 29, 2025, "Consolidated Circular for Cash Segment of NCL (FY 2024-25)") consolidates the FY's circulars and includes the segment's SGF / Core SGF framework, contribution methodology and draw waterfall as Chapters within the document. Sister consolidated circulars for the SLBS segment (NCL/CMPT/67763 dated April 30, 2025) and equivalent for F&O and CD segments form the operational baseline.

### MCX CDS segment (MCXCCL) — illustrative

MCXCCL's annual master circular for the commodity-derivatives segment (referenced by MCXCCL/RISK/045/2025 dated March 5, 2025 and successor MCXCCL/RISK/184/2025 dated September 4, 2025 on margin framework, both implementing SEBI Master Circular SEBI/HO/MRD/MRD-PoD-1/P/CIR/2023/136 (Aug 4, 2023) for commodity derivatives), describes the segment-specific Core SGF, member margin / SOMM (Self-Originated Member Margin) collection, and the commodity-category-specific (agri / base metals / bullion / energy) volatility-scan-range calibration that feeds the stress test.

## The draw side: the mandatory sequence during a member default

When a clearing member fails to meet a settlement obligation, the CC declares the member in default (per the segment's default procedure — see [Member default recovery](./member-default-recovery/) for the procedure detail) and applies the funded waterfall in strict sequence.

### Step 1 — Defaulter's own resources at the CC

The CC liquidates / appropriates:
- All collaterals pledged for the defaulting member's account (cash, FDR, BG, securities, etc.).
- All margins held: IM, MTM/Variation, ELM, Special/Additional, Premium, Tender/Delivery-period.
- The defaulter's mandatory Core SGF contribution (member share).
- The defaulter's non-core SGF contribution and any voluntary deposit.
- For the defaulter, all of the above is appropriated *before* applying losses to any other layer.

### Step 2 — Defaulter's resources at the exchange

The CC asks the exchange to transfer the defaulter's:
- BMC (Base Minimum Capital deposit).
- ABC (Additional Base Capital deposit).
- Other deposits — admission fees, security deposit, deposits in non-default segments to the extent permitted by inter-segment netting rules.

The exchange transfers these per the bilateral exchange-CC agreement. Inter-segment netting is **typically permitted within the same CC** for the defaulter's surplus deposits — e.g., excess deposits in F&O may be applied against a CM default at NSCCL — but **not across CCs** (e.g., a default at NSCCL cannot consume the member's ICCL deposits without separate procedures involving both CCs).

### Step 3 — Insurance proceeds

Where applicable, the CC files an insurance claim and applies the recovery to the unsettled loss. In practice, insurance coverage is narrow and not always triggerable in plain default; this layer is rarely consumed.

### Step 4 — CC's skin-in-the-game Core SGF contribution

The CC's own 25%-minimum contribution to the Core SGF is consumed before any non-defaulter member contribution. This is the "skin-in-the-game" principle: the CC's commercial interest in robust risk management is reinforced by direct first-loss exposure to clearing losses beyond the defaulter's own resources.

### Step 5 — Non-defaulter member Core SGF contributions

Pro-rata across non-defaulter members per the published apportionment formula (typically margin-share or turnover-share within the segment). The CC sends draw notices to each member with the drawn amount, and the member's Core SGF balance is debited.

Replenishment is mandatory within **T+3 working days** (typical SEBI prescription; the exact window is per the CC's risk-management circular and may be tighter for specific segments).

### Step 6 — Non-defaulter member non-core SGF and additional CC resources

If a non-core SGF layer is maintained, it is consumed next. Beyond this, the CC's residual capital begins to be at risk, marking the boundary between the funded and unfunded portions of the waterfall.

### Beyond Step 6 — Unfunded tools

The CC moves to its unfunded loss-allocation tools (cash call, VMGH, partial tear-up) per the recovery and resolution framework. These require governance approval at the CC's Risk Management Committee and regulator (SEBI) intimation, often in near real time.

<Aside type="caution">
**The defaulter's Core SGF contribution is exhausted in Step 1, not Step 5.** A common confusion is to think of "Core SGF" as a single pool consumed at Step 5. In fact, the *defaulter's own* contribution to the Core SGF is part of the defaulter's own-resources layer at Step 1; only the *non-defaulter* members' Core SGF contributions are drawn at Step 5. This distinction matters for replenishment accounting and for stress-test sizing.
</Aside>

## Replenishment obligations and timelines

After any draw against non-defaulter member contributions, the CC must:
1. Notify the affected members of the drawn amount.
2. Specify the replenishment deadline — typically **T+3 working days** from the date of draw notice.
3. Specify the form of replenishment (cash, FDR, BG, G-Sec — same forms as initial contribution).

Failure to replenish has cascading consequences:
- The non-replenishing member is itself in violation of the CC's bye-laws / regulations and risk-management framework.
- Sustained non-replenishment can trigger suspension, expulsion, or its own default declaration.
- Regulatory consequence: SEBI is intimated of any material non-replenishment by the CC.

The CC similarly replenishes its own skin-in-the-game contribution from its own resources (not from member assessments) and the exchange replenishes its contribution from its own resources, both within the same window.

The **defaulter's** Core SGF contribution, if consumed, is replenished only if the defaulter is rehabilitated and re-admitted (rare) or upon a successor member taking over the defaulter's segment registration. More typically, the defaulter's slot in the SGF is closed and the CC's stress-test sizing recalibrates to account for one fewer member.

## Member liability and caps

The mutualisation feature of the SGF / Core SGF means surviving members are exposed to one another's defaults. The framework limits this exposure through:

- **Cap on member contribution per segment** — the Core SGF member contribution per segment is a deterministic share of the corpus; a member cannot be forced to contribute beyond that share (excepting an assessment / cash call under Step 7 above).
- **Cap on cash-call assessment** — the further-capital-contribution (assessment) right is capped at typically 1x or 2x the member's then-existing Core SGF contribution per the CC's default rules.
- **No double recovery** — losses applied at a higher layer cannot be re-applied at a lower layer; consumed amounts at the defaulter level reduce the loss to be applied to mutualised pools.
- **Pro-rata fairness** — non-defaulter member contributions are drawn pro-rata per published formula, not at the CC's discretion, removing arbitrariness.
- **Recovery participation rights** — when the CC recovers assets from the defaulter post-event (e.g., from civil suit recoveries, sale of assets, insurance under a separate policy), the recovery is applied to refund consumed SGF contributions in reverse waterfall order (replenishment of non-defaulter member contributions first, then CC skin-in-the-game, etc.).

## Segment-specific variations

### Capital Market (CM) SGFs

- **NSCCL CM Core SGF**: sized for two-largest-default stress in cash market settlement, considering T+1 default cycle (and T+0 optional cycle post 2024 expansion). Settlement is largely DVP / DVP3 with funds and securities netted within the cycle; SGF dimension reflects fund-side and securities-side payin shortfalls.
- **ICCL CM Core SGF**: equivalent for BSE cash market.
- Cash-segment SGFs do not include derivative-style margin-shortfall scenarios but include early-pay-in failures, internal-shortage auction losses, and direct-payout-to-demat operational failures.

### F&O SGFs

- **NSCCL F&O Core SGF**: dimensioned for the much larger gross exposures in equity index derivatives and stock derivatives. SEBI's measures to strengthen equity-index-derivatives framework (SEBI/HO/MRD/MRD-PoD-2/P/CIR/2024/137 dated 2024-10-01) — including upfront option-premium collection, intraday position-limit monitoring, expiry-day calendar-spread removal — directly tighten stress-test inputs and may increase F&O Core SGF requirements.
- **ICCL EQD Core SGF**: equivalent for BSE equity derivatives.

### Currency Derivatives (CD) SGFs

- Separate SGF per CC for CD (USD/INR, EUR/INR, GBP/INR, JPY/INR, cross-currency pairs).
- Stress test calibrated for currency-pair volatility; lower notional vs equity derivatives but specific stress scenarios (e.g., FX-policy-shift days, sovereign rating actions).
- Reference: NSE/CDS mock and member-readiness circulars (e.g., NSE/CD mock-cycle circulars from December 2021 onwards) demonstrate the segment's operational structure.

### Commodity Derivatives SGFs

- **MCXCCL Core SGF**: primary commodity-derivatives SGF. Calibration covers agri, base metals, bullion, energy with category-specific volatility-scan-range (VSR) parameters (per MCXCCL/RISK/187/2025 dated September 5, 2025 — "Revision in Volatility Scan Range (VSR) Parameters for various Commodities").
- Physical-delivery contracts (gold, silver, base metals, agri) introduce additional stress factors — delivery default, warehouse-receipt failure, quality-discrepancy reconciliation — that affect SGF sizing.
- **NCL/ICCL commodity-derivatives Core SGF**: separate, smaller corpus for commodity derivatives at NSE / BSE.

### Tri-Party Repo (TREPS) Core SGF

- Separate from the other segments; sized for repo-default scenarios in the government-securities triparty repo settlement window operated by CCs.

### MCXCCL specifics

The MCXCCL Master Circular for FY 2023-24 (referenced in the project's circular index as the annual master circular consolidating all circulars in force as of June 30, 2023) consolidates the segment-specific Core SGF framework, contribution methodology, stress-test methodology, and member-margining (including SPAN, SOMM, MSBA) into a single operational baseline.

## Inter-clearing-corp arrangements

Inter-CC arrangements exist primarily for cross-segment and cross-CC operational scenarios:

- **Inter-CC margin pledge / cross-margin benefits**: where SEBI permits cross-margining (e.g., index futures vs underlying stocks at the same CC), the benefit is internal to the CC. Cross-margining *across* CCs is not standard and would require bilateral CC agreements.
- **Common members**: a clearing member registered across multiple CCs (e.g., the same broker as a clearing member at NSCCL and ICCL) maintains separate SGF contributions at each CC. Default at one CC does not, by default, consume deposits at another CC; however, the defaulter's *trading* (non-clearing) deposits across segments may be transferred to support the defaulting CC's loss-recovery via inter-MII coordination — this is non-trivial and requires regulator approval.
- **MII coordination during member default**: SEBI's master circulars on default management require all the MIIs (exchanges, CCs, depositories) at which the defaulting member is registered to coordinate disclosure (member-default declaration shared across MIIs), claim filing (Investor Protection Fund claims at each relevant exchange — see [IPF](./ipf/)), and asset preservation.

## Transparency and disclosures

SEBI requires CCs to disclose:

- **Core SGF corpus** for each segment, including CC, exchange and member shares — published periodically (monthly / quarterly per the CC) on the CC's website.
- **Stress-test results** — quarterly publication of stress-test outcomes; the disclosure is intended to demonstrate Cover-2 sufficiency to market participants and the public.
- **Margin framework** — the CC publishes its margin-computation methodology, accepted collaterals, haircuts, and concentration limits via its annual master / consolidated risk-management circular (e.g., MCXCCL/RISK/045/2025, NCL/CMPT/67751).
- **Default management procedure** — per SEBI Master Circular for Stock Exchanges and Clearing Corporations (issued periodically; the master circular consolidates the 2014 Core SGF framework, the recovery and resolution framework, and subsequent updates).
- **Approved collateral lists** — the periodic list of approved securities, ETFs, MFs, banks for collateral (e.g., MCX/MCXCCL/094/2026 dated 2026-02-26 superseded by MCX/MCXCCL/240/2026; equivalent NCL and ICCL approved-collateral circulars).

## Sub-cases and edge cases

### Member with multiple segment defaults

A clearing member that defaults in one segment is typically declared a defaulter for *all* segments at the CC (and across all CCs / exchanges where it is registered, by MII-wide intimation). Consequence: every segment's SGF stack is potentially activated; the CC liquidates all of the defaulter's collateral and applies it pro-rata to losses across the segments.

### Default close to month-end stress-test refresh

If a default occurs immediately before the monthly stress-test refresh, the corpus calibration applicable to that day is the *previous* month's value. Some CCs run intraday stress monitoring with more frequent recalibration if exposures spike materially — but the formal monthly cycle governs the published corpus.

### Catastrophic two-default scenario

If two clearing members default on the same day (the Cover-2 design case), the framework is sized to absorb the loss within the funded waterfall. Beyond Cover 2 (three or more simultaneous defaults, or a single default that exceeds the two-largest assumption), the CC moves rapidly to the unfunded tools (cash call, VMGH, partial tear-up).

### Default by a clearing-member that is also a custodian

Custodian-member defaults are operationally complex because client positions are segregated at the custodian. Per SEBI's segregation framework (covered in [Member default recovery](./member-default-recovery/) and the [Direct payout to demat](/broking-kyc/deep-dives/settlement/direct-payout-to-demat/) deep-dive), client securities are protected from the defaulter's general estate. The SGF draw applies to proprietary obligations of the defaulting clearing member, not to client-segregated assets.

### Default partly attributable to operational error

If the default is partly attributable to operational error at the CC itself (e.g., an erroneous margin call not communicated), the CC may absorb the operational-error portion from its own operational risk reserve before invoking SGF. This is a CC-specific governance decision and is reported to SEBI.

### Pre-funded vs post-funded loss recovery

A nuance: the SGF / Core SGF is *pre-funded* — contributions are paid in *before* any default occurs. Other layers (insurance proceeds, post-default recoveries from the defaulter's civil estate, regulatory remedies) are *post-funded* — recovered after the event and applied to refund consumed pre-funded layers.

## Practical notes

- **[industry practice]** Most clearing members run an internal "SGF replenishment monitoring" function on their treasury team — daily reconciliation of any debits to the firm's Core SGF balance against draw notices from the CC, with a hard 24-hour SLA on internal escalation if a draw notice arrives. The T+3 replenishment window is comfortable in normal markets but tight if multiple consecutive draws occur during a stressed week.
- **[gotcha]** Members occasionally over-pledge collateral against margin obligations and assume the "extra" pledged collateral is available for SGF use; it is not. SGF contribution is a *specific separate contribution*, not a residual of margin collateral. Confusion here surfaces during ops audits and at admission renewal.
- **[risk trade-off]** A larger member contribution to Core SGF would mutualise risk more broadly and reduce CC capital strain, but it would impose direct opportunity-cost capital on members and create perceived unfairness (small members paying for large members' exposures). The current calibration weights heavily toward CC + exchange capital, with member contribution as a small residual; SEBI may recalibrate this if a major default occurs.
- **[cost optimization]** Members maintaining contributions in cash earn zero or low return; pledging G-Sec / SDL / approved-bond instruments preserves the contribution status while earning the underlying coupon. Treasury teams routinely substitute cash for G-Sec subject to the CC's accepted-collateral list and haircuts.
- **[transparency]** The quarterly Core SGF disclosure on each CC's website is the most direct public window into the segment-level risk capital available; sophisticated counterparties (foreign portfolio investors, institutional desks) monitor these to size counterparty exposures.

## Cross-references

- [Deep Dive: Member default recovery](./member-default-recovery/) — the procedural side of how the funded waterfall is *applied* during a default declaration.
- [Deep Dive: Payin default + Core SGF draw](/broking-kyc/deep-dives/settlement/payin-default-core-sgf/) — the specific scenario where a settlement payin failure invokes the Core SGF draw.
- [Deep Dive: Investor Protection Fund (IPF)](./ipf/) — the *investor-facing* protection (separate from the CC's SGF), administered by the exchange.
- [Deep Dive: BMC / ABC](/broking-kyc/deep-dives/member-compliance/bmc-abc/) — the member-deposit layer below the SGF in the draw waterfall.
- [Deep Dive: RMS / SPAN methodology](/broking-kyc/deep-dives/trading-day/rms-span-methodology/) — the margin framework that sets the SGF baseline.
- [Compliance Blueprint — Settlement domain](/broking-kyc/operations/compliance-blueprint/) — the broader compliance obligation map within which SGF sits.
- [Circulars — Clearing Corporations](/broking-kyc/reference/circulars/clearing-corps/) — primary source circulars (NCL/CMPT, ICCL, MCXCCL).
- [Circulars — SEBI Other](/broking-kyc/reference/circulars/sebi-other/) — the SEBI master circulars on stock exchanges / clearing corporations and the original 2014 Core SGF framework (CIR/MRD/DRMNP/25/2014).

## Verified through

2026-05-14

---

*AI-generated and not legal, financial, or compliance advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*

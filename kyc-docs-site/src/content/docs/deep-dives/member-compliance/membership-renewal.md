---
title: "Deep Dive: Annual membership renewal at NSE / BSE / MCX"
description: Walkthrough of the annual membership renewal procedure at NSE / BSE / MCX including SEBI registration cycle, renewal fees, attestations required (fit-and-proper, networth, BMC, KMP current, NISM current, advertisement approvals, compliance certificate), prerequisite cycles, renewal-cycle timing, late renewal consequences, and clearing-corp membership renewal as a separate track.
---

import { Aside } from '@astrojs/starlight/components';

> **Why this page is structured this way:** Annual membership renewal is the most "vertical" of all compliance events — it consolidates every continuing-compliance track (networth, BMC / ABC, fit-and-proper, KMP, NISM, advertisement, AP framework, compliance certificate, internal audit) into a single annual filing window. The renewal is therefore the canonical "everything must be current" event. This page walks through the procedure exactly so a compliance officer can produce an audit-defensible renewal pack from the prerequisite cycles upstream.

## TL;DR

- **SEBI registration** for a stockbroker is structured as a **5-year block fee cycle** under the SEBI fee regime since 1 April 2007, consolidated under the SEBI Stock Broker Master Circular ([SEBI/HO/MIRSD/POD-1/P/CIR/2025/94](/broking-kyc/reference/circulars/sebi-mirsd/#sebihomirsdpod-1pcir202594)) and confirmed under SEBI (Stock Brokers) Regulations 2026 ([SEBI/LAD-NRO/GN/2026/291](/broking-kyc/reference/circulars/sebi-other/#sebilad-nrogn2026291)).
- **Exchange membership** at NSE / BSE / MCX is renewed annually through exchange-specific fee cycles, evidenced via the exchange's online filing modules (ENIT for NSE, BEFS for BSE, MCX Member Portal for MCX).
- **Clearing-corporation membership** (NSCCL / ICCL / MCXCCL) is a separate track from exchange membership; clearing rights must be renewed independently per CC byelaws.
- **Renewal attestations** consolidate confirmations from upstream compliance tracks: half-yearly networth certificate, BMC compliance, fit-and-proper declarations, KMP roster, NISM-certificate validity, advertisement-approval register, compliance certificate, internal audit report.
- **Prerequisite cycles** that must be completed before renewal can be filed cleanly: the most recent **half-yearly compliance certificate** (typically September-end), the most recent **internal audit report** (half-yearly), and the most recent **statutory audit** (annual). Any deficiencies in these create flags during renewal review.
- **Renewal-cycle timing:** typically aligns with the **financial year** — most brokers complete renewal in **Q4 of the FY (January–March)** to be in good standing for the next FY start (1 April). For September-half-year-cert-based renewals, the window opens after the September certificate is filed.
- **Late renewal consequences scale:** late fee surcharges, then trading restrictions, then suspension, then registration cancellation. The escalation is per-exchange and per-CC, but the SEBI registration itself is permanent (post 1 April 2007 regime) with only the periodic fee being the operative cycle. The 5-year block fee cycle and the broker's continuing compliance keep the registration alive.
- AI-generated synthesis. **Verify any specific fee, threshold, or timeline against the linked circulars and current exchange byelaws before acting.**

## Conceptual overview

A SEBI-registered stockbroker is, since 1 April 2007, registered with a **permanent registration** subject to **periodic fee cycles** (5-year blocks). This replaced the earlier renewal-each-year SEBI-side regime; the broker no longer files a SEBI "renewal" application annually. Instead the SEBI registration continues so long as the periodic fee is paid and the broker satisfies continuing obligations under the Stock Brokers Regulations.

Where annual "renewal" still occurs is at the **exchange** and the **clearing corporation** levels — and operationally, it is the exchange renewal that compliance officers refer to when they say "annual membership renewal". The exchange has its own annual subscription fee structure, parallel KMP / fit-and-proper / networth / BMC attestations, and an annual filing module that consolidates the previous year's compliance into a single renewal record.

The four cycles intersect at renewal time:

1. **SEBI 5-year block fee cycle** — periodic fee paid to SEBI; receipt evidences continuing registration.
2. **Exchange annual subscription** — paid to each exchange where the broker is a member; covers infrastructure, surveillance, regulatory oversight at that exchange.
3. **Clearing-corp annual subscription** — paid to each clearing corp where the broker is a clearing member or self-clears; covers clearing-and-settlement infrastructure.
4. **Authorised Person (AP) annual fee** — Rs.5,000 per AP per year under [NSE/COMP/63628](/broking-kyc/reference/circulars/nse/#nsecomp63628) (the joint-exchange AP framework, with FY 2024-25 fee rate set in NSE/COMP/60859); paid by the broker on behalf of each registered AP.

This page covers all four cycles, the attestations that go with them, the prerequisite cycles that must close before renewal can be filed, and the consequences of late or missing renewal.

<Aside type="note">
**Why SEBI moved from annual renewal to 5-year block fee in 2007.** Pre-2007, brokers filed SEBI renewals each year — a high-friction process that consumed regulatory bandwidth without proportionate value. The 2007 reform introduced permanent registration with periodic fees, allowing SEBI to focus regulatory effort on continuing supervision (inspections, investigations, surveillance) rather than annual paperwork. The broker side has fewer SEBI filings per year now but more continuous-compliance evidence to maintain. The exchange-side annual renewal remained as the operational checkpoint that bundles the continuing compliance into a single artefact.
</Aside>

## SEBI registration — the 5-year block fee cycle

### Mechanics

Per the SEBI Stock Broker Master Circular ([SEBI/HO/MIRSD/POD-1/P/CIR/2025/94](/broking-kyc/reference/circulars/sebi-mirsd/#sebihomirsdpod-1pcir202594)) and the SEBI (Stock Brokers) Regulations 2026 ([SEBI/LAD-NRO/GN/2026/291](/broking-kyc/reference/circulars/sebi-other/#sebilad-nrogn2026291)), brokers registered with SEBI hold permanent registration subject to periodic fee payment in 5-year blocks. The broker pays the prescribed fee at the start of each block; receipt issued by SEBI evidences continuing registration.

The fee schedule is set by SEBI from time to time, segment-wise (Cash, F&O, CD, COM, IRD, Debt), and varies by membership category. The fee is calibrated to the broker's turnover and exposure pattern, with floor-and-cap bands.

### Evidence

- SEBI registration certificate (segment-wise endorsement).
- SEBI fee receipt for the current block.
- 2026 Regulations registration confirmation (for entities registered post 7 January 2026).

### Continuing-compliance link

Receipt of the fee does not, on its own, keep the registration alive. The broker must also satisfy continuing obligations:

- Fit-and-proper of broker, directors, KMPs, senior management — see [fit-and-proper deep dive](/broking-kyc/deep-dives/member-compliance/fit-and-proper/).
- Minimum networth — Rs.3 crore base + variable per [SEBI/LAD-NRO/GN/2026/291](/broking-kyc/reference/circulars/sebi-other/#sebilad-nrogn2026291).
- BMC at the clearing corp — see [BMC / ABC deep dive](/broking-kyc/deep-dives/member-compliance/bmc-abc/).
- Half-yearly compliance certificate to SEBI — see [CYC-HY-COMPLIANCE_CERT](/broking-kyc/operations/integration-dag/recurring-cycles/).
- Half-yearly internal audit report — see [audit cycles in Compliance Blueprint](/broking-kyc/operations/compliance-blueprint/).

A serious shortfall in any of these — even without missing the 5-year fee — can trigger SEBI enforcement action, including registration suspension or cancellation. The fee receipt is necessary but not sufficient.

### 2026 Regulations specifics

The 2026 Regulations changed two facets of the registration framework that affect renewal:

- **Two-year securities-trading experience** for *fresh* applications under Regulation 7 — does not apply to continuing brokers but is a screen if the broker re-applies after a cancellation.
- **Resident designated director** under the broker-specific overlay — at least one director resident in India 182+ days per FY. This is a continuing requirement and is re-affirmed in each renewal attestation.

## NSE annual membership renewal

### Mechanics

NSE membership is held in the trading-member or clearing-member category (or both for self-clearing TMs). Renewal is annual, with the operational filing on the ENIT-NEW-COMPLIANCE module under the relevant NSE byelaws. Fee structure depends on segment activations:

- Cash Market (CM)
- Equity Derivatives (F&O)
- Currency Derivatives (CD)
- Debt
- Securities Lending and Borrowing Mechanism (SLBM)

Each active segment carries a separate annual fee component. The cumulative fee is paid in a single transaction; the NSE acknowledgement closes the renewal.

### Attestations bundled into NSE renewal

NSE renewal consolidates the following attestations into a single annual filing:

1. **Networth certificate** — most recent half-yearly statutory-auditor-signed networth certificate. Per [NSE/COMP/64293](/broking-kyc/reference/circulars/nse/#nsecomp64293), filed via ENIT-NEW-COMPLIANCE (Oct 31 for MTF members, Nov 30 for others for September-end half-year).
2. **BMC compliance** — most recent BMC deposit confirmation from NSCCL (and ICCL if BSE membership; MCXCCL if MCX; etc.).
3. **Fit-and-proper declarations** — current annual fit-and-proper attestations from broker, directors, KMPs, senior management ([CYC-AN-FIT_PROPER](/broking-kyc/operations/integration-dag/recurring-cycles/)).
4. **KMP roster current** — current Compliance Officer, Principal Officer, Designated Director, MD / CEO, Whole-time Director, CFO, CS, with their NISM certifications attached. Confirmation per [NSE/COMP/56766](/broking-kyc/reference/circulars/nse/#nsecomp56766).
5. **NISM-certified roles current** — Compliance Officer NISM Series III-A; Principal Officer NISM Series I / VII; Authorised Persons and Dealers NISM Series VIII. See [MEMBER-COMP-006 / 007 / 008 / 010](/broking-kyc/operations/compliance-blueprint/).
6. **Authorised Person register** — current AP roster with NISM certificate copies and AP annual fee evidence (Rs.5,000 per AP per year per [NSE/COMP/60859](/broking-kyc/reference/circulars/nse/#nsecomp60859) for FY 2024-25 rate). See AP framework deep dive at [/broking-kyc/deep-dives/compliance-audit/ap-framework/](/broking-kyc/deep-dives/compliance-audit/ap-framework/).
7. **Advertisement approval register** — current list of approved advertisements; this aligns with [MEMBER-COMP-015](/broking-kyc/operations/compliance-blueprint/) and the NSE advertisement-approval framework under [NSE/INSP/66284](/broking-kyc/reference/circulars/nse/#nseinsp66284) and [NSE/INSP/63425](/broking-kyc/reference/circulars/nse/#nseinsp63425).
8. **Half-yearly compliance certificate** — most recent compliance certificate signed by the Compliance Officer attesting to SEBI / exchange / depository compliance.
9. **Half-yearly internal audit report** — most recent internal audit report (signed by the appointed CA firm).
10. **Annual statutory audit report** — most recent annual audit by an independent CA firm.
11. **CSCRF cyber audit confirmation** — most recent cyber audit per the broker's CSCRF category under [SEBI/HO/MIRSD/CIR/PoD-1/P/CIR/2024/113](/broking-kyc/reference/circulars/sebi-mirsd/) (annual or biennial depending on category).
12. **System audit confirmation** — most recent system audit (every 2 years).
13. **KRA audit confirmation** — most recent annual KRA process audit.
14. **DP audit confirmation** — most recent annual DP audit (if applicable).
15. **No-action declaration** — confirmation that no SEBI / exchange / depository action is pending against the broker or directors that would impair fit-and-proper.
16. **Branch / AP location master** — current branch / AP location roster per [MEMBER-COMP-022](/broking-kyc/operations/compliance-blueprint/).
17. **Office infrastructure** — confirmation of premises and supervisory presence per [MEMBER-COMP-023](/broking-kyc/operations/compliance-blueprint/).

The attestations are the operational evidence that the *continuing* obligations have been met during the year. Renewal is therefore the consolidation of upstream cycles.

### Fee structure (typical)

| Component | Indicative fee | Notes |
|---|---|---|
| Subscription fee | Variable by segment | Set annually by NSE in member circulars |
| Authorised Person AMC | Rs.5,000 per AP per year | Per [NSE/COMP/60859](/broking-kyc/reference/circulars/nse/#nsecomp60859) FY 2024-25; subject to revision |
| Late-renewal fee | Per [NSE/INSP/53530](/broking-kyc/reference/circulars/nse/#nseinsp53530) penalty matrix | Daily penalty + escalation |

Members operating in multiple segments cumulate the per-segment subscription fees. The Investor Protection Fund (IPF) contribution and the Core SGF contribution are separate cycles ([CLIENT-FUNDS-019](/broking-kyc/operations/compliance-blueprint/) and [SETTLEMENT-008](/broking-kyc/operations/compliance-blueprint/)).

### Timing

Renewal-cycle timing typically aligns with the financial year: most brokers file in Q4 FY (January–March) for renewal effective from the next 1 April. The half-yearly compliance certificate filed for September-end and the internal audit report for the same half-year are the typical prerequisites that gate renewal.

## BSE annual membership renewal

### Mechanics

BSE membership is held in similar segment categories — CM, F&O, CD, Debt, SME. Renewal is annual through the BEFS (BSE Filing System) compliance module. The structure mirrors NSE renewal but with BSE-specific fee schedules.

### Attestations

The attestation pack for BSE renewal mirrors the NSE list (1–17 above) but with BSE-specific filings. BSE-specific items include:

- BSE-side UCC reconciliation status (per the master UCC circular).
- BSE membership card update if any change in branch / signatory.
- BSE-specific compliance certificate.

### Coordinated renewal

For brokers who are members of both NSE and BSE (the majority of retail brokers), the renewal preparation typically runs once and the same attestation pack is filed at both exchanges with exchange-specific cover sheets. Coordinating the preparation reduces duplication.

## MCX annual membership renewal

### Mechanics

MCX membership covers commodity derivatives (COM). Trading and clearing rights are governed by MCX Bye-Laws and Business Rules, most recently amended via [MCX/MEM/105/2026](/broking-kyc/reference/circulars/mcx/#mcxmem1052026) (effective 2 March 2026). Renewal is annual via the MCX Member Portal.

### Attestations

MCX-specific items include:

- MCX TM / TCM admission documentation.
- MCXCCL clearing-member admission (if self-clearing or full TCM).
- Commodity-segment specific BMC / ABC.
- Commodity-segment NISM certifications (NISM Series VI for Commodity Derivatives where applicable).

### Six-month grace period for new admissions

Under [MCX/MEM/105/2026](/broking-kyc/reference/circulars/mcx/#mcxmem1052026), newly admitted MCX members have a **six-month grace period** to put deposit and operational infrastructure in place. Beyond the grace period, a late fee of Rs.10,000 per month accrues (capped at Rs.1,20,000 over 12 months); persistent default risks cancellation of the membership application. This grace period operates within the renewal framework for new members only; existing members are on the standard annual renewal cycle.

### Reporting Portal / Annual Returns

MCXCCL operates a separate Annual Returns submission via the Member Reporting Portal (memberreporting.mcxccl.com); see [MCXCCL/MEM/282/2025](/broking-kyc/reference/circulars/clearing-corps/) for the FY 2024-25 annual returns reminder cycle. The clearing-corp Annual Returns are a separate filing from the exchange membership renewal.

## Clearing-corporation membership renewal

Clearing-corp membership at NSCCL / ICCL / MCXCCL is **separate** from exchange membership. A broker may be:

- **Trading Member (TM) only** — trades via a Professional Clearing Member who clears trades. TM does not have CC membership.
- **Trading Member cum Clearing Member (TM-cum-CM)** — self-clears. TM and CM rights at the same broker.
- **Professional Clearing Member (CM-only)** — provides clearing services to other TMs but does not trade. CM only.

Clearing-corp membership has its own:

- **Capital requirements** — TM CUSPA, CM CUSPA, TM CSMFA accounts under [NCL/CMPT/63669](/broking-kyc/reference/circulars/clearing-corps/#nclcmpt63669) for direct-payout framework.
- **BMC at CC** — clearing-side base minimum capital, parallel to but separate from the trading-side BMC at the exchange.
- **Core SGF contribution** — quarterly contribution per [NCL/CMPT/61800](/broking-kyc/reference/circulars/clearing-corps/#nclcmpt61800) and [NCL/CMPT/61801](/broking-kyc/reference/circulars/clearing-corps/#nclcmpt61801).
- **Annual subscription fee** — paid to the CC.

The CC renewal cycle typically aligns with the exchange cycle but is filed separately on the CC member portal. Failure to renew CC membership while exchange membership continues results in the broker being trading-active but clearing-inactive — the broker cannot self-settle and must use a PCM, which is operationally significant.

## The renewal-cycle calendar

Most large brokers operate a renewal-cycle calendar that links upstream cycles to the renewal date. A canonical view:

| Month | Cycle / event | Output |
|---|---|---|
| October | Half-yearly networth certificate (for MTF members; due 31 Oct) | Networth certificate filed via ENIT-NEW-COMPLIANCE |
| November | Half-yearly networth certificate (for non-MTF members; due 30 Nov) | Networth certificate filed |
| November | Half-yearly compliance certificate to SEBI (September half-year) | Compliance certificate signed and filed |
| November | Half-yearly internal audit report (September half-year) | Audit report signed and filed |
| December–January | Statutory audit prep | Books, ledgers, evidence packs prepared |
| January–February | Annual statutory audit | Audit report signed |
| January–March | System audit (biennial; alternate year) | System audit report |
| March | Cyber audit (CSCRF) | Cyber audit report |
| January–March | Annual fit-and-proper self-certification | Annual declarations on file |
| March (week 1–2) | NISM re-certification (rolling, but annual visibility) | Updated certificates |
| March (week 2–3) | Advertisement approval refresh | Current approval register |
| March (week 3–4) | NSE / BSE / MCX renewal filing | Renewal acknowledgements |
| 31 March / 1 April | Renewal effective; new FY begins | Renewal complete |

This calendar is an operational scaffold — actual dates shift with circular updates and exchange-specific cycle revisions. The compliance officer should maintain the calendar with explicit cross-links to the prerequisite cycles and the renewal filing.

<Aside type="caution">
**Renewal is the most-frequently-deficient compliance event in SEBI / exchange inspections.** Inspectors specifically test whether (a) prerequisite cycles closed cleanly, (b) all attestations are current at renewal date, (c) NISM certifications have not lapsed, (d) fit-and-proper declarations are recent. Deficiencies surface as inspection findings under [NSE/INSP/53530](/broking-kyc/reference/circulars/nse/#nseinsp53530); penalties scale with the severity and recurrence of the deficiency.
</Aside>

## Late renewal consequences

### Stage 1 — Late fee

A renewal filed beyond the prescribed window attracts a late fee per the exchange's penalty matrix. For NSE, the matrix is [NSE/INSP/53530](/broking-kyc/reference/circulars/nse/#nseinsp53530); BSE and MCX have parallel matrices. Late fees are typically a daily accrual capped at a maximum.

### Stage 2 — Trading restrictions

Sustained late renewal triggers automatic trading restrictions. The exchange may:

- Disable fresh-position-creating orders.
- Restrict order types (only square-off allowed).
- Limit segment activations (e.g., disable F&O while CM continues).

### Stage 3 — Trading suspension

If the renewal is not completed within the further prescribed window, trading is suspended. Suspended members can manage existing positions but cannot enter new ones.

### Stage 4 — Clearing-rights cascade

If clearing-corp membership renewal is also missed, clearing rights are suspended. The broker's existing positions must be managed through a PCM (Professional Clearing Member) or unwound; new positions cannot be cleared self-clearing.

### Stage 5 — Registration cancellation

If renewal default persists, SEBI action toward registration suspension or cancellation may follow. Cancellation is the worst case; the broker must wind down operations, return client funds, settle outstanding obligations, and (if it wishes to resume) re-apply as a fresh registration under the 2026 Regulations.

The cascade is real but most brokers do not reach Stage 4 / 5 — late renewals are resolved at Stage 1 / 2 by paying the late fee and filing the renewal. Stage 4 / 5 typically follow from deeper underlying issues (financial distress, fit-and-proper failures, sustained regulatory action).

## Sub-cases / edge cases

### Multi-exchange member with one exchange membership lapse

A broker member of NSE / BSE / MCX who fails to renew at one of them faces segment-specific restrictions at that exchange while continuing at others. Operationally, the broker's OMS must hard-block orders to the affected exchange while passing through to the others.

### Mid-year segment activation

If a broker activates a new segment mid-year (e.g., enables F&O activation in November), the segment-specific obligations attach immediately, but the renewal cycle integrates the new segment at the next annual renewal. The interim period has the broker compliant on a per-segment basis with the exchange's standing.

### Change-in-control during renewal window

A change-in-control event (M&A, scheme of arrangement, promoter buyout) during the renewal window must be navigated carefully — SEBI's change-in-control framework requires prior approval. The renewal and change-in-control filings often run in parallel; compliance officers coordinate the timing.

### Adverse SEBI / exchange action during renewal

An adverse action that surfaces during the renewal window (e.g., SEBI initiates inquiry on a director's fit-and-proper) may be a renewal blocker if the action concerns continuing eligibility. The broker should disclose the action in the renewal pack and seek guidance from the exchange / SEBI on how to proceed.

### MTF-specific renewal flags

Members offering Margin Trading Facility (MTF) have an earlier networth-certificate deadline (Oct 31 instead of Nov 30 for September half-year per [NSE/COMP/64293](/broking-kyc/reference/circulars/nse/#nsecomp64293)) and additional capital-adequacy attestations. The MTF endorsement is reconfirmed at each renewal.

### Authorised Person renewal failure cascade

Each AP carries its own annual renewal (Rs.5,000 AMC per [NSE/COMP/63628](/broking-kyc/reference/circulars/nse/#nsecomp63628) — joint-exchange AP supervisory framework). Failure to renew an AP results in that AP's deactivation, not the broker's. However, persistent AP-renewal failures are a member-supervisory finding under the AP framework.

### Bank-CM and Non-Bank-CM differences

Bank-CMs (banks acting as clearing members) face a different fee structure at the CC and additional RBI-side regulatory overlay. The membership renewal framework is broadly the same but with bank-specific evidence (RBI authorization, banking regulation compliance).

### Inactive segments

A broker that has activated a segment but has zero trading activity for an extended period may face exchange-side enquiry on whether the activation is genuine. The renewal allows the broker to either continue the inactive segment (paying the subscription) or formally surrender that segment to reduce fees.

### Self-clearing TM that becomes pure TM (or vice versa)

A change in the clearing model affects the CC renewal track. A self-clearing TM transitioning to using a PCM gives up CC membership at the CC, which is itself a filing event. The reverse (TM becoming self-clearing) requires fresh CC membership.

### Suspension during the renewal period

A broker that is under suspension at the renewal date faces a complex renewal — the suspension affects fit-and-proper, ongoing compliance attestations, and the exchange's willingness to process the renewal. The broker should consult the exchange and SEBI before filing.

<Aside type="tip">
**Build a renewal evidence "warehouse" through the year.** Most large brokers maintain a folder structure that mirrors the renewal attestation list: each upstream cycle's output is filed in the relevant folder as it is produced (networth certificate in October, compliance certificate in November, statutory audit in February, etc.). When renewal time arrives, the warehouse already has all attestations ready; the renewal filing becomes a confirmation step rather than a scramble.
</Aside>

## Practical notes

- **[industry practice]** Most large brokers run a "renewal-readiness review" in Q3 (Oct–Dec) that checks each prerequisite cycle is on track. Any deficiency identified in the review (e.g., a NISM certificate expiring just before renewal) is cured before the formal renewal window opens.
- **[gotcha]** SEBI's permanent registration since 2007 means there is no SEBI-side renewal application; brokers sometimes mistakenly file a SEBI renewal expecting an acknowledgement that does not arrive because SEBI does not process annual renewals at the entity level. The 5-year fee receipt is the relevant artefact for SEBI.
- **[risk trade-off]** Filing renewal in the first week of Q4 (October) is cleaner but requires preparing in Q2. Filing in late March is more cost-efficient on data-currency but compresses the prerequisite cycle close-out into 2–3 weeks. Most large brokers split the difference and file in February.
- **[gotcha]** The Authorised Person AMC (Rs.5,000 per AP per year) is paid by the broker as part of renewal but does not directly renew the broker's exchange membership; it renews each AP. Compliance officers should not bundle the two in the broker's books.
- **[industry practice]** A "membership renewal checklist" maintained by the compliance officer typically runs 50–80 line items covering all attestations. Items are signed off by the responsible owner (Funds Ops for BMC; compliance for fit-and-proper; HR for NISM certificates; Marketing for ad approval register; etc.). The Compliance Officer reviews the consolidated checklist before filing.
- **[cost optimization]** AP AMC bulk payment in one transaction at NSE saves multiple-transaction overhead; same for BSE / MCX. Coordinate AP renewals to occur in the same window as member renewal.
- **[gotcha]** Late renewal at one exchange does not automatically late-renew at others. A broker that renewed at NSE but missed BSE faces BSE-side restrictions independently of NSE-side continuing operations.
- **[industry practice]** Where the broker is multi-exchange, file at each exchange in sequence (NSE first, then BSE, then MCX) so that the latest attestation pack is consistent across filings. Coordinated filing also helps in inspections where inspectors may request the same attestations across exchanges and inconsistency would be flagged.
- **[cost optimization]** Keep the next FY's renewal fee in the broker's budget separate from operating expenses. The renewal-fee cash outflow is predictable and can be funded ahead of the cycle.

## Cross-references

- [Compliance Blueprint — Member compliance (23 entries)](/broking-kyc/operations/compliance-blueprint/) — MEMBER-COMP-020 (SEBI / exchange registration renewal), MEMBER-COMP-021 (AP renewal), MEMBER-COMP-001 / 002 (networth), MEMBER-COMP-005 (continuing fit-and-proper).
- [Compliance Blueprint — Client funds (21 entries)](/broking-kyc/operations/compliance-blueprint/) — CLIENT-FUNDS-007 / 008 / 009 (networth, BMC, ABC) as prerequisites.
- [Compliance Blueprint — Reporting cadences (40 entries)](/broking-kyc/operations/compliance-blueprint/) — REPORTING-023 (networth disclosure), REPORTING-033 (KMP roster).
- [Compliance Blueprint — Settlement (22 entries)](/broking-kyc/operations/compliance-blueprint/) — SETTLEMENT-008 (Core SGF contribution).
- [BMC / ABC deep dive](/broking-kyc/deep-dives/member-compliance/bmc-abc/) — prerequisite for the BMC attestation in renewal.
- [Fit-and-proper deep dive](/broking-kyc/deep-dives/member-compliance/fit-and-proper/) — prerequisite for fit-and-proper attestation.
- [KMP changes deep dive](/broking-kyc/deep-dives/member-compliance/kmp-changes/) — current-KMP roster as renewal input.
- [ECN and investor servicing deep dive](/broking-kyc/deep-dives/member-compliance/ecn-investor-servicing/) — investor-servicing attestations bundled into renewal.
- [Authorised Person framework deep dive](/broking-kyc/deep-dives/compliance-audit/ap-framework/) — AP renewal track.
- [Recurring cycles — CYC-AN-MEMBERSHIP](/broking-kyc/operations/integration-dag/recurring-cycles/) — node in the cadence DAG; depends on networth + fit-and-proper, blocks nothing (terminal node).
- [Broker process narrative — Section 5 Annual cycles](/broking-kyc/broker-process/narrative/) — narrative context.
- [SEBI (Stock Brokers) Regulations 2026 — SEBI/LAD-NRO/GN/2026/291](/broking-kyc/reference/circulars/sebi-other/#sebilad-nrogn2026291) — primary Regulation effective 7 January 2026.
- [SEBI Stock Broker Master Circular — SEBI/HO/MIRSD/POD-1/P/CIR/2025/94](/broking-kyc/reference/circulars/sebi-mirsd/#sebihomirsdpod-1pcir202594) — operational compliance master.
- [NSE half-yearly networth — NSE/COMP/64293](/broking-kyc/reference/circulars/nse/#nsecomp64293) — networth attestation timing and channel.
- [NSE KMP intimation — NSE/COMP/56766](/broking-kyc/reference/circulars/nse/#nsecomp56766) — KMP roster maintenance.
- [NSE AP framework — NSE/COMP/63628](/broking-kyc/reference/circulars/nse/#nsecomp63628) — joint-exchange AP supervisory framework with annual AMC.
- [NSE AP AMC FY 2024-25 — NSE/COMP/60859](/broking-kyc/reference/circulars/nse/#nsecomp60859) — Rs.5,000 per AP per year fee rate.
- [NSE inspection penalty grid — NSE/INSP/53530](/broking-kyc/reference/circulars/nse/#nseinsp53530) — late-renewal penalty matrix.
- [MCX framework — MCX/MEM/105/2026](/broking-kyc/reference/circulars/mcx/#mcxmem1052026) — MCX membership rules with grace-period and late-fee regime.
- [NSCCL Cash Segment Consolidated Circular — NCL/CMPT/61800](/broking-kyc/reference/circulars/clearing-corps/#nclcmpt61800) — clearing-corp framework underlying CC renewal.
- [NSCCL F&O Consolidated Circular — NCL/CMPT/61801](/broking-kyc/reference/circulars/clearing-corps/#nclcmpt61801) — F&O CC framework.

## Verified through

2026-05-14

---

*AI-generated and not legal, financial, or compliance advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*

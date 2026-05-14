---
title: "Deep Dive: Investor Grievance Redressal Committee (IGRC)"
description: Walkthrough of Investor Grievance Redressal Committees at NSE / BSE / MCX — composition, escalation path from SCORES, fee-resolution authority, hearing procedure, IGRC vs ODR routing, member representation, IGRC orders and post-order compliance.
---

import { Aside } from '@astrojs/starlight/components';

> **Why this page is structured this way:** IGRCs operate in the gap between (a) SCORES first-level resolution by the broker and (b) full ODR arbitration. They handle fee-amount disputes within an exchange's quasi-judicial framework. The page explains the chain — who sits on the committee, how a matter reaches it, what they decide, and how a broker contests or complies.

## TL;DR

- The IGRC is a stock-exchange / depository statutory committee under the SEBI (Stock Exchanges and Clearing Corporations) Regulations 2018 and the SEBI Master Circular for Stock Exchanges & Clearing Corporations `SEBI/HO/MRD-PoD2/CIR/P/2024/00181`.
- IGRCs operate at NSE, BSE, MCX (for commodity derivatives), NSE Clearing, ICCL, MCXCCL, plus CDSL and NSDL on the depository side. Most broker-related disputes flow through NSE / BSE IGRC; depository-side issues through CDSL / NSDL IGRC.
- IGRCs hear monetary disputes between an investor and a stock-exchange member (broker / clearing member) where (a) the broker's first-level resolution failed and (b) the dispute amount is within IGRC's monetary authority — currently up to **Rs 25 lakh** per the Master Circular's IGRC chapter (industry-typical interpretation; check the exchange's own IGRC bye-laws for current ceiling).
- IGRC composition: at least one **Public Interest Director (PID)** of the exchange (chair), one independent expert (usually retired judicial / regulatory / industry expert), and one investor representative. Quorum requirements vary by exchange.
- Workflow: SCORES first-level resolution → broker ATR → Investor First Review → Designated Body (here, the exchange) routes monetary disputes to IGRC → IGRC hearing → IGRC order → broker compliance OR escalation to arbitration (ODR).
- IGRC orders are binding on the member unless overturned at arbitration; non-compliance triggers exchange disciplinary action including suspension.
- Members must be represented at IGRC hearings (in-person or video). Compliance Officer typically appears, with documentary evidence pre-submitted in the case file.

## Conceptual overview

The IGRC mechanism predates SCORES 2.0 and SMART ODR. It originated from SEBI's framework for stock-exchange-administered investor grievance redressal — the modern codification of which is in the SEBI Master Circular for Stock Exchanges & Clearing Corporations `SEBI/HO/MRD-PoD2/CIR/P/2024/00181` (chapter on Investor Service & Grievance Redressal). Earlier framework circulars include `SEBI/HO/OIAE/IGRD/CIR/P/2020/152` (August 2020) handling SCORES-IGRC linkage and earlier exchange bye-laws.

The committee performs three functions:

1. **Quasi-judicial review** of investor-vs-member disputes that the member hasn't resolved at first level
2. **Monetary award authority** within the prescribed cap (typically Rs 25 lakh; verify on the exchange's IGRC page)
3. **Referral to arbitration / ODR** for matters beyond IGRC's monetary or substantive authority

Post the SMART ODR rollout (`SEBI/HO/OIAE/OIAE_IAD-1/P/CIR/2023/131` July 2023, and Master `SEBI/HO/OIAE/OIAE_IAD-3/P/CIR/2023/195` December 2023), the IGRC role has been somewhat narrowed — many investor-vs-member monetary disputes can now be routed directly to ODR. But IGRCs continue to operate as the exchange's own first-tier judicial-style review for matters that haven't moved to ODR.

<Aside type="caution">
**IGRC is not the only exchange-level investor service body.** Each exchange also operates an **Investor Service Cell (ISC)** that handles administrative complaint intake, claim verification, and IPF claims (under `SEBI/HO/MRD-PoD2/CIR/P/2024/00181` IPF chapter). ISC is staff-administered. IGRC is committee-administered (committee of PIDs + experts + investor reps). For most operational purposes, the ISC is the broker's day-to-day interface; IGRC enters the picture only on substantive disputes.
</Aside>

## 1. Composition

The Master Circular and exchange bye-laws prescribe minimum composition. Each exchange operates its own IGRC; structures harmonise but differ in detail.

**Mandatory members (per SEBI Master Circular for SE & CC `SEBI/HO/MRD-PoD2/CIR/P/2024/00181`):**

- **Chairperson** — must be a Public Interest Director (PID) of the exchange. PIDs are appointed by SEBI under the SECC Regulations 2018 from a pool of retired judges, retired regulators, retired civil servants, and industry experts of high standing.
- **Independent member** — typically a senior member of the legal, accounting, or financial services community. Not affiliated with the exchange or any of its members.
- **Investor representative** — typically a person nominated by an investor association recognised by SEBI (e.g. CII, FICCI investor wing, individual retail-investor representatives).

Additional members may include:

- **Member-from-investor-protection-fund-committee** in larger exchanges
- **Junior expert / observer** for capacity building

**Quorum:** Typically two-thirds of total membership (industry-typical at large exchanges); chair + at least one other.

**Term:** PIDs serve fixed exchange terms (3-year reappointable); independent members typically 2–3 years; investor representatives 2 years. Term limits prevent capture; rotation is mandated under the Master Circular.

**Exchange-specific variations:**

- NSE — IGRC at Mumbai, with regional sub-committees (Delhi, Kolkata, Chennai, Ahmedabad)
- BSE — IGRC at Mumbai, with regional flexibility
- MCX — IGRC at Mumbai for commodities-derivatives disputes
- CDSL / NSDL — depository-level IGRC for DP-investor disputes

<Aside type="note">
**SEBI's Statutory Committees circular (`SEBI/HO/MRD/MRD-PoD-3/P/CIR/2024/162`, 22 November 2024)** prescribes detailed composition, functioning, and review obligations for statutory committees at Market Infrastructure Institutions including IGRCs (under "Member Committee" and related committee structures). Independent External Professionals (IEPs) constraints and multi-committee caps for PIDs are enforced.
</Aside>

## 2. Reaching IGRC — escalation path

### 2.1 Trigger conditions

A complaint reaches IGRC under one of these paths:

- **Path A (SCORES First Review)** — Investor files complaint on SCORES; broker submits ATR; investor files First Review; SEBI Designated Body (the exchange) reviews; if it's a monetary dispute and amounts are within IGRC cap, the matter is routed to IGRC.
- **Path B (Direct ISC complaint)** — Investor directly files at the exchange's Investor Service Cell (email / web form / physical letter); ISC routes to IGRC if it meets the criteria.
- **Path C (Phone helpline / regional office)** — Some exchanges have regional investor service offices; complaints there route to IGRC after preliminary screening.

### 2.2 Pre-IGRC ISC screening

The exchange ISC screens before listing for IGRC:

- Verify the investor is a client of the named broker (UCC check)
- Verify the dispute amount is within IGRC monetary authority
- Verify the dispute is not sub-judice (not pending in consumer court, civil court, arbitration)
- Verify the cause of action is within the limitation window (typically 3 years for civil; some IGRC bye-laws say 6 months from cause of action for grievance escalation)
- Verify the broker's first-level response was given (or rejected)

Once cleared, the matter is placed on the IGRC docket with a hearing date.

### 2.3 IGRC docketing

The matter gets a unique IGRC case number — format varies by exchange (e.g. NSE: `IGRC/NSE/2026/XXXX`). Case file is built:

- Complaint with all attachments
- Broker's ATR (from SCORES, or directly submitted)
- Trade extracts, contract notes, KYC artefacts (pulled by ISC from broker via formal request)
- Investor's reply / supplementary submissions
- Member's reply / additional documents
- Designated Body's First Review note (if SCORES-routed)

The case is then listed for IGRC hearing.

## 3. Hearing procedure

### 3.1 Notice of hearing

Members get **at least 15 working days notice** (industry-typical at large exchanges). Notice includes:

- Hearing date and time
- Hearing mode (in-person at exchange / hybrid / virtual)
- IGRC case file ID
- List of allegations
- Documents the member should bring / pre-submit

Investor gets similar notice.

### 3.2 Member's pre-hearing preparation

The broker's compliance team prepares:

- **Member's reply** — typically a structured response covering each allegation, with evidence references
- **Documentary pack** — KYC artefacts, contract notes, trade logs, communications, AP records, surveillance evidence
- **Authorised representative letter** — designating who will appear (usually Compliance Officer; can be advocate / consultant for material disputes)
- **Settlement proposal** (optional) — if the broker wishes to offer a settlement before hearing, this is submitted in writing for IGRC consideration

### 3.3 The hearing

Hearings are conducted in inquisitorial-judicial style (not adversarial). Typical sequence:

1. **Roll call** — Chair confirms presence of investor (or representative) and member's authorised representative
2. **Reading of allegations** — Chair summarises the dispute and the relief sought
3. **Investor submissions** — Investor (or representative) presents grievance, references documents
4. **Member submissions** — Authorised representative responds, presents evidence
5. **IGRC questions** — Committee asks clarificatory questions of both sides
6. **Cross-references** — IGRC may consult exchange records, surveillance data, prior orders
7. **Closure of evidence** — Both sides confirm no additional submissions
8. **Adjournment for deliberation** — IGRC deliberates in private; order is later issued (typically within 15 working days)

Hearings are not stenographically recorded but typed minutes are maintained.

<Aside type="tip">
**Settlement at IGRC hearing.** Many disputes settle at or just before the IGRC hearing. The broker can offer a settlement — partial or full — that the investor may accept. If accepted, IGRC records the settlement as a consent order. This avoids a contested order and is often quicker. Settlement offers should be pre-cleared with the broker's senior management (Designated Director for amounts above Rs 1 lakh per industry practice).
</Aside>

### 3.4 IGRC order

IGRC issues a written order. Standard structure:

- Case facts
- Investor's claim
- Member's response
- Evidence summary
- Findings of fact
- Findings on legal / regulatory compliance
- Order — monetary award (if any), corrective action directive, dismissal of complaint, or referral to arbitration

Orders are signed by the Chair and circulated to investor, member, exchange Member Compliance team, and SEBI OIAE (if SCORES-routed).

### 3.5 Order timelines

- Hearing to order: typically **15 working days** (industry-typical at large exchanges; verify in each exchange's bye-laws)
- Notice to hearing: typically **15–30 working days**
- Total cycle from IGRC docketing: **typically 45–60 working days**, can be longer for complex matters or if adjournments occur

## 4. Member compliance with IGRC order

### 4.1 Monetary order

If IGRC awards a monetary amount to the investor:

- Broker must pay within the period specified in the order (typically 15–30 days)
- Payment proof submitted to ISC / Member Compliance
- Failure to pay triggers escalation — exchange may freeze the broker's settlement / trading account for the amount, or initiate disciplinary action

### 4.2 Corrective-action order

If IGRC directs corrective action (e.g. update KYC, modify contract note, reverse a charge):

- Broker must execute within the specified time
- Action proof submitted (system screenshots, before-and-after extracts)
- Verification by ISC

### 4.3 Dismissal

If IGRC dismisses the complaint (finds in favour of the broker):

- No action required from broker
- Investor may file ODR arbitration appeal within the ODR limitation window (typically 30 days from the IGRC order)

## 5. IGRC vs ODR — routing decision

Both IGRC and ODR can adjudicate investor-vs-member disputes. The routing decision depends on:

| Factor | IGRC | ODR (Smart ODR) |
| --- | --- | --- |
| Monetary cap | Typically up to Rs 25 lakh (industry-typical; verify exchange bye-laws) | Up to broker's value-at-risk; effectively unlimited for arbitration phase |
| Initiation | Via SCORES First Review or direct ISC | Via SCORES escalation or direct ODR portal filing |
| Forum | Exchange-administered committee | SEBI-empanelled ODR institution; conciliators / arbitrators |
| Conciliation phase | No formal conciliation; hearing-based | 30-day conciliation phase mandatory |
| Arbitration phase | Not technically arbitration — quasi-judicial; aggrieved party can appeal to ODR arbitration | 60-day arbitration phase after failed conciliation |
| Fee | Free for investor; minimal for broker | Tiered; broker pays empanelled-institution fee |
| Order finality | Binding subject to ODR arbitration appeal | Conciliation outcome is consent-based; arbitration is binding subject to civil court challenge |

In practice:

- Small / standard disputes (KYC delay, brokerage dispute) → IGRC
- Mid-sized fee disputes (margin penalty pass-through, settlement-failure loss) → IGRC, with ODR appeal possible
- Large disputes involving substantive interpretation of regulations → ODR
- Disputes that require expert witnesses, lengthy hearings, complex evidence → ODR arbitration

<Aside type="note">
**The IGRC-ODR sequencing post-Smart-ODR.** Before December 2023, the IGRC was the only practical first stop; investors aggrieved by IGRC order went to exchange arbitration (now subsumed under ODR). After December 2023, ODR can be the first stop for monetary disputes — but IGRC still operates and many complaints route to it. Many brokers find IGRC outcomes more predictable (exchange staff understand broker operations) and the cost lower (no ODR-institution fees). Industry-typical: investors prefer SCORES → IGRC for small-mid disputes, SCORES → ODR for larger or technically complex ones.
</Aside>

## 6. Member representation at IGRC

### 6.1 Who represents

- **Default** — Compliance Officer of the broker
- **For substantive disputes** — Compliance Officer + Senior compliance staff + occasionally Designated Director
- **For high-value or legally complex disputes** — External legal counsel / consultant, with authorised representative letter

The broker's representative must have authority to:

- Make submissions and answer IGRC questions
- Concede facts (within their authority)
- Offer settlement (within pre-authorised limits)
- Bind the broker to corrective action

### 6.2 Preparation timeline

- 10–15 working days before hearing — gather facts, identify witnesses
- 5–10 working days before — draft Member's Reply
- 3 working days before — submit reply and documents
- Day of hearing — appear

### 6.3 Evidence pack

- Account opening file (KYC artefacts, KRA / CKYC trail)
- Contract notes for disputed trades
- Audio recordings of relevant calls (transcribed if practicable)
- Email correspondence
- Internal investigation file (if previously prepared for SCORES ATR)
- Surveillance alerts (if relevant)
- Regulatory citations (any SEBI / exchange circulars relevant to the disputed activity)

## 7. Common dispute categories at IGRC

From exchange Annual Reports (NSE, BSE, MCX) and inspection consolidated circulars:

- **Brokerage dispute** — charges above contractually agreed rate, undisclosed charges, slab-tier discrepancies
- **Unauthorised trading** — broker / RM placed trades without client authorisation; client claims loss
- **Margin / peak-margin** — broker passed on penalty improperly; client claims wrongful debit
- **Settlement / pay-out delay** — pay-out not credited on time; client claims interest / consequential loss
- **Demat / depository charges** — DP charges in excess of disclosed; reactivation fee disputes
- **Running-account settlement** — broker did not settle within required cycle; client claims interest
- **AP / branch misrepresentation** — AP gave misleading advice; client claims based on AP's actions (broker is principal)
- **Contract-note discrepancy** — settled price differs from contracted; brokerage line wrong
- **KYC / onboarding delay** — broker delayed activation; client missed market move; claim for opportunity loss (rarely awarded)
- **MTF / margin trading dispute** — interest charges, liquidation timing, collateral valuation

## 8. Edge cases

### 8.1 Multiple investors against same broker (consolidated hearing)

If a pattern of similar complaints emerges (e.g. systemic over-charging, an AP-fraud pattern), IGRC may consolidate hearings. Member faces consolidated submissions.

### 8.2 Member in financial distress

If a broker is under financial stress (capital adequacy below threshold, near-suspension), IGRC may expedite hearings to preserve investor's claim against potential broker default. Recovery may also route through IPF if broker is suspended.

### 8.3 Cross-exchange dispute

A client trades at NSE via Broker X but the dispute relates to MCX commodity executed by Broker X under MCX membership. Each exchange's IGRC handles its own jurisdiction; consolidation is rare.

### 8.4 Member relocation / closure

If the broker closed during the IGRC pendency, the matter moves to ISC for IPF compensation (subject to IPF cap and substantive merit). See [IPF deep dive](/broking-kyc/deep-dives/foundational/ipf/).

### 8.5 Foreign investor / NRI

NRI complaints follow normal IGRC pathway. Communication is by email/video. FEMA-compliance issues are tagged for RBI co-ordination.

### 8.6 Deceased investor / estate dispute

If the investor died during IGRC pendency, legal heir / executor must substitute. Estate-administration proof (probate / succession certificate / letters of administration) required. See [Lifecycle: Transmission](/broking-kyc/lifecycle/transmission/).

### 8.7 Sub-judice / arbitration pending

If the matter is concurrently in consumer court or arbitration, IGRC defers / dismisses for sub-judice reasons. Investor may not double-pursue.

## 9. Post-IGRC enforcement

- **Compliance reporting** — Broker reports compliance to ISC with proof
- **Audit trail** — IGRC orders kept in compliance file (industry-typical 10-year retention)
- **Inspection** — Exchange inspection (`NSE/INSP/67804` for FY26 inspection cycle) reviews IGRC outcomes — were orders complied with? Patterns of recurring complaints?
- **SCORES Score** — IGRC outcomes feed into broker's compliance score
- **ODR appeal** — Either side can appeal to ODR arbitration within the limitation window (typically 30 days from IGRC order)

<Aside type="caution">
**Non-compliance with IGRC order = inspection finding.** Failure to comply with IGRC order is a routine inspection finding under the Consolidated Inspection Circular framework. Designated Director and Compliance Officer face personal liability under SEBI Stock Brokers Regulations. Industry-typical defence: pre-emptive compliance + reasoned written acceptance / proof of payment. If appealing to ODR, file appeal within window and inform ISC concurrently — do not just stop complying.
</Aside>

## 10. Depository IGRCs (CDSL / NSDL)

CDSL and NSDL operate their own IGRCs for depository-related disputes:

- DP-investor disputes (charges, holding-statement, transmission delays)
- DP-broker disputes (operational disputes)

Composition mirrors exchange IGRCs — PID of depository as chair, independent member, investor representative.

Common categories:

- Transmission delay
- Off-market transfer disputes
- AMC / DP charges
- KYC / nominee modification issues
- BO master corrections

Procedure mirrors exchange IGRC; orders are binding on DP / broker. CDSL communiques (e.g. `CDSL/OPS/DP/POLCY/...`) document specific IGRC bye-laws.

## 11. Reporting and disclosure

- IGRC orders are typically not publicly published (privacy of parties)
- Exchanges publish anonymised statistics in annual reports — complaints received, resolved, IGRC outcomes, average resolution time
- SEBI receives IGRC summary via Designated Body reports
- Broker's website may disclose IGRC-related statistics under Investor Charter monthly disclosure

## 12. Practical notes

- **[gotcha]** A broker that misses two consecutive IGRC hearings (no representative present) may have ex-parte orders passed. Industry-typical: never miss; if conflict arises, request adjournment in writing with reason.

- **[industry practice]** Most large brokers maintain an "IGRC docket" — a list of pending IGRC matters with hearing dates, status, exposure amount, responsible team member. The docket is reviewed in weekly compliance meetings.

- **[risk trade-off]** Settling at IGRC stage is cheaper than fighting and losing — broker pays settlement amount + saves reputational cost + avoids ODR escalation. Industry-typical: settle if liability is clear and dispute is below ~Rs 5 lakh; contest if liability is disputable or > Rs 5 lakh.

- **[cost optimization]** Pre-IGRC settlement (via direct negotiation with investor while case is pending) saves IGRC time and resources. Many brokers attempt settlement once IGRC docket arrives.

- **[gotcha]** IGRC orders carry interest if monetary payment is delayed — typically 12% per annum (industry-typical at exchanges; verify in current bye-laws). Don't sit on a payable order.

- **[gotcha]** Authorised representative letter must be on broker letterhead with proper signature; some IGRCs reject hearings where representation letter is missing or improperly signed.

- **[industry practice]** Mid-size brokers (50k–500k UCC) typically appear themselves; very large brokers (QSBs / 500k+ UCC) often have external counsel for material disputes.

## Cross-references

- [Deep Dive — SCORES Procedure](/broking-kyc/deep-dives/compliance-audit/scores-procedure/)
- [Deep Dive — ODR](/broking-kyc/deep-dives/compliance-audit/odr/)
- [Deep Dive — Inspection Types](/broking-kyc/deep-dives/compliance-audit/inspection-types/)
- [Deep Dive — IPF (Investor Protection Fund)](/broking-kyc/deep-dives/foundational/ipf/)
- [Deep Dive — AP Framework](/broking-kyc/deep-dives/compliance-audit/ap-framework/)
- [Compliance Blueprint](/broking-kyc/operations/compliance-blueprint/)
- [Circulars — SEBI Other (OIAE)](/broking-kyc/reference/circulars/sebi-other/)
- [Circulars — SEBI MIRSD](/broking-kyc/reference/circulars/sebi-mirsd/)
- [Circulars — NSE](/broking-kyc/reference/circulars/nse/)
- [Lifecycle — Transmission](/broking-kyc/lifecycle/transmission/)

## Verified through

2026-05-14

---

*AI-generated and not legal, financial, or compliance advice. See the project [README](https://github.com/javajack/broking-kyc) for the full disclaimer.*

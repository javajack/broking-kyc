---
title: "Deep Dive: SCORES Procedure"
description: End-to-end walkthrough of the SEBI Complaint Redress System (SCORES) — registration, complaint workflow, 21-day disposal SLA, escalation chain, monthly MIS submission, common rejection codes, and the broker's internal grievance pipeline that feeds SCORES.
---

import { Aside } from '@astrojs/starlight/components';

> **Why this page is structured this way:** SCORES is one investor-facing portal but four operational lifecycles for a broker — registration, daily intake & ATR submission, monthly MIS, and escalation handling. Each has different inputs, deadlines, and disciplinary triggers. The walkthrough follows what a broker's grievance team actually does, day-by-day, with the regulatory clock running in the background.

## TL;DR

- SCORES is SEBI's investor-grievance portal (https://scores.sebi.gov.in). The current operating regime is **SCORES 2.0**, set by `SEBI/HO/OIAE/IGRD/CIR/P/2023/156` dated 20 September 2023 (in force from 4 December 2023), and reinforced by `SEBI/HO/OIAE/IGRD/CIR/P/2023/183` dated 1 December 2023 which adds the non-compliance consequence matrix.
- A complaint travels from investor → SCORES portal → broker (auto-routed) → Designated Body (exchange / depository / AMFI) → SEBI → SMART ODR (if still unresolved).
- The first-level resolution clock is **21 calendar days** from complaint receipt — down from 30 days in SCORES 1.0. Two review stages: First Review by Designated Body (within 15 days of investor's first review request), Second Review by SEBI (within 15 days of investor's second review request).
- Every broker must (i) register on SCORES and FINnet 2.0, (ii) appoint a designated grievance officer with PAN/contact, (iii) submit Action Taken Report (ATR) within the 21-day clock, (iv) file the **Monthly Complaints MIS** to exchanges/SEBI by the 7th of the succeeding month, (v) publish complaint statistics on the broker's own website.
- Non-compliance with SCORES timelines triggers (a) financial disincentive (per-day fine), (b) warning letter, (c) Designated Body adjudication, (d) regulatory action — including freezing of business activities for repeat defaulters.
- Categories with highest broker complaint volume: unauthorised trades, demat-account modification delays, brokerage / payout disputes, KYC processing, dormancy reactivation, off-market transfer issues. Common rejection grounds: investor not a client of the broker, dispute relates to pre-2018 transactions, sub-judice matters, anonymous complaints, repeat complaints already adjudicated.

## Conceptual overview

SCORES sits at the centre of SEBI's investor protection architecture. Before SCORES, investor complaints traversed loose paper trails between exchanges, broker compliance officers, and the SEBI Office of Investor Assistance and Education (OIAE). SCORES 1.0, launched 2011, gave investors a single web portal but the workflow was paper-emulating — complaints emailed to entities, follow-ups manual. **SCORES 2.0 (December 2023)** rebuilt the workflow around three principles: auto-routing of complaints to the correct entity based on PAN/UCC mapping; auto-escalation when timelines lapse; integration with the SMART ODR portal for unresolved disputes that escalate beyond the regulatory layer to adjudicatory or arbitral resolution.

For a broker, SCORES generates three workflow loads simultaneously: (a) reactive — every new complaint received, the 21-day clock starts; (b) periodic — monthly MIS, annual investor-charter compliance, periodic complaint-statistics web disclosure; (c) systemic — every broker is rated by SEBI on a Compliance Score that factors in SCORES-pendency, repeat-complaints, and average resolution time. The compliance score feeds into the QSB (Qualified Stock Broker) classification per `SEBI/HO/MIRSD/MIRSD-PoD-1/P/CIR/2024/14` (March 2024).

<Aside type="caution">
**SCORES is not the only investor-grievance touchpoint.** It runs parallel to (i) the broker's own grievance redressal mechanism (mandatory under SEBI Master Circular for Stock Brokers), (ii) Investor Grievance Redressal Committees (IGRC) at NSE / BSE / MCX, (iii) the SMART ODR portal for monetary/arbitral disputes, (iv) the exchanges' Investor Service Cell, (v) consumer courts, and (vi) civil litigation. SCORES is the regulator-administered first-tier escalation. Engineers building grievance pipelines must wire all five touchpoints, not just SCORES.
</Aside>

## 1. Broker registration on SCORES

Every SEBI-registered intermediary must register on SCORES as a "Regulated Entity" before commencing business. The path is documented in the SCORES 2.0 Master Circular `SEBI/HO/OIAE/IGRD/CIR/P/2023/156` and the migration guidance bundled with SEBI/HO/DDHS/DDHS-POD1/CIR/P/2023/67 (the FINnet 2.0 migration circular, which carries cross-references to SCORES login mapping).

**Inputs to registration:**

- SEBI registration number (e.g. `INZ000XXXXXX` for a stock broker)
- Designated Grievance Officer (DGO) name, PAN, mobile, email
- Compliance Officer name, PAN, mobile, email (often the same person at small brokers; must be distinct at QSBs per Chapter IVA Brokers' Institutional Mechanism)
- Branch addresses (registered office + corporate office + branches where applicable)
- Exchange memberships and segment codes
- Depository participant code (CDSL / NSDL) if applicable

**Output:** SCORES login credentials (issued to DGO and Compliance Officer); DGO appointment is reflected on the broker's website mandatorily under SEBI Investor Charter `SEBI/HO/MIRSD/MIRSD-PoD-1/P/CIR/2024/124` (Updated Investor Charter for stock brokers).

**Operational requirement at activation:**

- Designated grievance email displayed on broker website, contract notes, and client communications.
- Escalation matrix table (Customer Service → Compliance Officer → Designated Director) published on broker website with timelines.
- 60-day complaint statistics disclosure: monthly count of complaints received / resolved / pending, with average resolution time, published on broker website (Investor Charter section).

<Aside type="tip">
**Single source for designated officer details.** The DGO record on SCORES must match (i) the contract-note footer, (ii) the broker website's Investor Charter page, (iii) the ENIT-NEW-COMPLIANCE record at NSE / BSE / MCX. Mismatches commonly surface during exchange inspections (NSE Inspection Department circular `NSE/INSP/53530`) and attract financial disincentives. Recommended industry practice — single source of truth in compliance MIS, with a quarterly verification batch job that pushes updates downstream to all four registers.
</Aside>

## 2. Complaint workflow — investor → broker

### 2.1 Investor files complaint

Investor accesses https://scores.sebi.gov.in and submits a complaint. SCORES requires:

- PAN (mandatory)
- Mobile / email (mandatory, OTP-verified)
- Entity against which the complaint is raised (search by name / SEBI registration number)
- Complaint category (drop-down — see section 4 below)
- Free-text complaint description (typically up to 1500 characters)
- Supporting documents (PDF up to 5 MB)

SCORES generates a unique **Complaint Registration Number (CRN)** — format `SEBIE/AB/2026/000XXXX` — communicated to the investor by SMS and email. The CRN is the universal reference number throughout the lifecycle.

### 2.2 Auto-routing to broker

SCORES 2.0 (`SEBI/HO/OIAE/IGRD/CIR/P/2023/156`, clauses 2.3 — 2.6) introduced **auto-routing**. The complaint is routed to the entity whose name / SEBI registration number was selected by the investor. Earlier, OIAE staff did the routing manually; lag could be 5-10 days. Now the routing is instant — the broker sees the complaint in their SCORES inbox within minutes.

Auto-routing implies the broker's 21-day clock starts on the **SCORES receipt date**, not on the date OIAE reviewed and forwarded. This shaves several days off practical response windows and is the single biggest operational change brokers had to absorb in the 2.0 transition.

### 2.3 Broker acknowledgement (Day 1)

Within 1 working day the broker must acknowledge the complaint via SCORES (system auto-prompts on login). Acknowledgement is a confirmation of receipt — not a resolution. The DGO assigns the complaint to internal owner (e.g. KYC team, RMS, settlement team, branch).

### 2.4 Investigation and resolution (Days 1 — 21)

The broker investigates and prepares an **Action Taken Report (ATR)**. The ATR must contain:

- Acknowledgement of facts as alleged
- Internal investigation findings (trade logs, KYC artefacts, voice recordings, audit-trail extracts)
- Resolution proposed / executed (refund / contract rectification / re-statement / non-monetary action)
- Supporting evidence (system screenshots, ledger extracts, email correspondence)
- Officer signature with name and designation

ATR is uploaded to SCORES with status options — Resolved / Partially Resolved / Not Resolved (with explanation). Pure investor-side issues (e.g. PMS-related complaint forwarded to a broker that only has trading access for the client) are marked Not Pertaining To This Entity with explanation.

### 2.5 Investor review (post Day 21)

Upon broker's ATR submission, the complaint moves to "Resolved" status. The investor receives an SMS/email with a link to view the ATR. The investor has the option to:

- Accept the resolution → complaint closed
- File First Review request within 15 days → escalates to **Designated Body**
- Take no action within 15 days → auto-closes as Resolved

<Aside type="note">
**Why the 15-day investor window matters.** If the investor files a First Review beyond 15 days from ATR upload, SCORES auto-rejects the review request — but the SMART ODR escalation path (per `SEBI/HO/OIAE/OIAE_IAD-1/P/CIR/2023/0182`) remains open up to 30 days from "cause of action". Brokers therefore cannot treat closure-without-review as final; an investor can still proceed to ODR for monetary disputes within the ODR limitation window.
</Aside>

## 3. Escalation chain

### 3.1 Designated Bodies (First Review)

If the investor files a First Review, the complaint moves to a **Designated Body** — the entity formally tasked with reviewing the broker's ATR. For stock brokers:

- NSE / BSE / MCX (depending on the exchange where the dispute arises)
- CDSL / NSDL (for demat-related complaints if filed against DP)

The Designated Body has **15 calendar days** to review and either uphold the broker's ATR (rejecting the investor's review) or remand the matter back to the broker for further action. NSE administers First Review via its Investor Service Cell; BSE via Investors' Services Cell at Mumbai; MCX via Member Compliance Department.

The Designated Body reviews:

- Compliance with the 21-day timeline
- Substantive merits of the ATR
- Whether the resolution is consistent with SEBI / exchange regulations
- Investor-charter alignment

Common Designated Body actions:

- Confirm broker's resolution → complaint closed
- Direct broker to take additional remedial action within a fresh deadline (typically 10 days)
- Refer to Investor Grievance Redressal Committee (IGRC) for fee-amount disputes (see [IGRC deep dive](/broking-kyc/deep-dives/compliance-audit/igrc/))
- Forward to ODR for arbitral resolution

### 3.2 SEBI Second Review

If the investor is dissatisfied with the First Review outcome, they may file a Second Review within 15 days. SEBI's Office of Investor Assistance and Education (OIAE) handles this — **15 calendar days** to dispose. SEBI may:

- Confirm First Review outcome
- Direct broker to revise resolution
- Initiate enforcement action under SEBI Act Section 11 / 11B (for substantive violations beyond mere grievance)
- Refer to ODR for arbitration

### 3.3 SMART ODR escalation

If the complaint involves a monetary dispute that remains unresolved after the SCORES path, the investor can escalate to the **SMART ODR portal** (https://smartodr.in). SMART ODR was set up by `SEBI/HO/OIAE/OIAE_IAD-1/P/CIR/2023/131` (31 July 2023) and consolidated in `SEBI/HO/OIAE/OIAE_IAD-3/P/CIR/2023/195` dated 28 December 2023 — see [ODR deep dive](/broking-kyc/deep-dives/compliance-audit/odr/). The SCORES-ODR linkage was operationalised in the same SCORES 2.0 circular (`SEBI/HO/OIAE/IGRD/CIR/P/2023/156`, clauses 6.1 — 6.3).

The ODR cycle is conciliation (30 days) → arbitration (60 days) if conciliation fails. ODR institutions empanelled by SEBI manage panels.

<Aside type="caution">
**Investors who skip SCORES and go directly to ODR.** The SMART ODR portal explicitly allows direct lodging without first exhausting SCORES — but brokers' ATR obligation is still triggered. Operationally, brokers must check both inboxes (SCORES + ODR) daily; missing a direct ODR filing because the team only monitored SCORES has happened during the 2024 rollout. The two portals do not automatically sync new filings between themselves; integration is on the ODR side (ODR pulls from SCORES if a SCORES CRN is referenced).
</Aside>

## 4. Complaint categories

SCORES uses a structured categorisation tree. Broker-relevant top-level categories (from the SCORES portal taxonomy and `SEBI/HO/MIRSD/MIRSD-PoD-1/P/CIR/2024/124` Investor Charter listing):

| Category | Common sub-categories | Median time-to-resolve |
| --- | --- | --- |
| Trading / Settlement | Unauthorised trades, brokerage dispute, contract-note discrepancy, payout delay, short delivery | 10–15 days |
| Demat / Depository | Modification delay, off-market transfer issue, charges levied, holding-statement discrepancy | 7–14 days |
| KYC / Onboarding | Account opening delay, KRA validation rejection, re-KYC dispute, KYC modification refusal | 7–10 days |
| Margin / Funds | Margin reporting dispute, peak-margin penalty pass-through, fund segregation, upstreaming dispute | 15–20 days |
| Client funds / Running account | Running-account settlement delay, balance discrepancy, payout-credit dispute, FDR pledge issue | 14–21 days |
| Algorithmic / Technical | Algo trade dispute, API order tagging, technical glitch loss, exchange outage compensation | 18–21 days (often closer to cap due to evidentiary load) |
| AP / Branch issues | Unauthorised activity at AP, AP misrepresentation, AP termination disputes | 15–21 days |
| Misleading communication / Mis-selling | Mis-selling, unsolicited advisory, social-media tip-driven trades | 18–21 days |
| Account closure / Dormancy | Closure delay, dormant-account reactivation refusal, balance return on closure | 14–18 days |

These are operational medians from exchange inspection findings (referenced in `NSE/INSP/57394` Consolidated Inspection Circular) and industry-typical at large brokers. Smaller / newer brokers see significantly longer median times.

## 5. Monthly MIS submission

`SEBI/HO/OIAE/IGRD/CIR/P/2023/156` clauses 7.1 — 7.4 require every broker to submit a **monthly grievance MIS** to the exchange(s) and to publish complaint statistics on the broker's own website. The cadence:

- Frequency: monthly
- Due date: 7th of the succeeding month
- Channel: ENIT-NEW-COMPLIANCE at NSE; BSE Member Portal; MCX MEMNET — and complaint statistics on broker website
- Content: opening pending, received during month, resolved during month, closing pending, ageing buckets (0–7 days / 8–14 days / 15–21 days / 22–30 days / 30+ days)

The MIS is granular: broken down by category (the same taxonomy used in SCORES), by complaint source (SCORES / direct email / exchange-forwarded / branch-walk-in / phone), and by resolution mode (resolved / referred to IGRC / referred to ODR / withdrawn).

<Aside type="tip">
**Why the website-disclosure obligation is tighter than the exchange-MIS obligation.** SEBI's Investor Charter (`SEBI/HO/MIRSD/MIRSD-PoD-1/P/CIR/2024/124`) requires monthly publication of complaint statistics on the broker's website. Most brokers publish a PDF; sophisticated brokers maintain a structured-data CSV / API for SEBI inspection teams. Failure to publish for 3+ consecutive months attracts enhanced supervision and Designated Body inquiry. Industry-typical retention: 24 months of monthly disclosure PDFs on the website.
</Aside>

## 6. Common rejection codes

SCORES auto-rejects complaints in specific scenarios (clauses 4.6 — 4.10 of the SCORES 2.0 circular). Common rejection grounds, in descending frequency:

- **Not pertaining to securities market** — complaint relates to bank account, NBFC loan, insurance, or non-SEBI-regulated subject matter
- **Not pertaining to this entity** — investor has selected wrong broker; complaint actually relates to another intermediary
- **Sub-judice / arbitration** — same matter is pending before consumer court, civil court, or already adjudicated by IGRC / arbitration tribunal
- **Anonymous / incomplete** — PAN missing, mobile not verified, complaint description below threshold
- **Pre-2018 transactions** — SCORES limits look-back to transactions on or after 1 April 2018 (industry-typical interpretation; SEBI has not codified a strict cut-off but practical screening uses this)
- **Repeat complaint** — same investor, same issue, already adjudicated
- **Mutual fund / NPS specific** — should be routed to AMFI / PFRDA; not a broker matter
- **Investment advisory / RA** — routed to SEBI IAD or BSE Administration & Supervision of Investment Advisers (BASA)

Brokers cannot themselves trigger rejection; rejection is a SCORES system / OIAE action. But brokers can flag in the ATR that the complaint should be re-categorised — the OIAE team may then re-route or reject.

## 7. Broker's internal grievance process feeding SCORES

The internal pipeline that produces ATRs has formal structure per Master Circular for Stock Brokers (`SEBI/HO/MIRSD/POD-1/P/CIR/2025/94`):

### 7.1 Intake channels

- Broker website grievance form (mandatory under Investor Charter)
- Designated grievance email (e.g. `grievance@broker.com`)
- Call centre / phone (recorded with 5-year retention per industry practice; SEBI does not mandate a specific retention but 5 years aligns with PMLA / Stock Brokers Regulations)
- Branch walk-in (must have a complaint register)
- Direct email / letter to compliance officer

All five must reconcile into a **single internal complaint ID** before the SCORES CRN arrives. The internal ID lets the broker correlate the SCORES complaint with prior-channel complaints from the same investor.

### 7.2 Triage and ownership

The DGO triages on receipt. Three-tier internal ownership:

- **Tier 1** (Customer Service) — first response, factual investigation, simple resolutions (refund, reissue of contract note, modification)
- **Tier 2** (Compliance Officer) — investor escalation or matters with regulatory exposure
- **Tier 3** (Designated Director / Senior Management) — complex disputes, monetary thresholds (typically > Rs 1 lakh in dispute), AP-related, fraud-related

Industry-typical SLAs: Tier 1 — 5 days; Tier 2 — 10 days; Tier 3 — 15 days. All within the 21-day external clock.

### 7.3 Investigation toolkit

- **Trade logs** — order entry timestamps, IP, terminal ID, modification trail, parent-child order linkage
- **Audio recordings** — call-centre voice (mandatory record-keeping per industry practice; QSB requirement to record all client communications)
- **Email trails** — through compliance email archive (5–10 year retention)
- **KYC artefacts** — KRA / CKYC fetch, IPV / VIPV video, e-Sign trail
- **Contract notes** — generated artefact with broker DSC; digital signature verification on-demand
- **Settlement trail** — pay-in / pay-out files, demat debit / credit, RMS event log
- **Surveillance alerts** — if the underlying trade was flagged for review by surveillance dashboard
- **AP records** — if the trade was executed via an AP-terminal, AP-supervision artefacts

### 7.4 Resolution authorisation

For monetary refunds / write-downs, internal authorisation matrix:

- Up to Rs 10,000 — Tier 1 desk approval
- Rs 10,000 — Rs 1 lakh — Compliance Officer
- Rs 1 lakh — Rs 10 lakh — Designated Director
- Above Rs 10 lakh — Board approval (typically via Audit Committee for QSBs)

These thresholds are industry-typical; SEBI does not mandate a specific authorisation matrix but Master Circular Chapter on Internal Controls expects a documented matrix subject to inspection.

### 7.5 ATR drafting and SCORES submission

The DGO drafts the ATR. Required fields:

- Complaint summary (broker's interpretation)
- Investigation timeline (dates, actions taken)
- Findings (factual + control adequacy)
- Resolution proposed (with monetary amount if any)
- Supporting documents attached
- Officer signature (DGO or Compliance Officer)

Submitted to SCORES via DGO login. Once submitted, no edits; if material new facts emerge post-submission, a supplementary ATR can be uploaded (rare but supported).

## 8. Penalty regime for non-compliance

`SEBI/HO/OIAE/IGRD/CIR/P/2023/183` (1 December 2023) introduced a graded consequence matrix for SCORES non-compliance.

| Trigger | Consequence |
| --- | --- |
| ATR not submitted within 21 days | First reminder + 15-day extension; financial disincentive of Rs 1,000 per complaint per day beyond 30 days [industry-typical interpretation; SEBI penalty schedules use this calibration] |
| Pendency > 30 days at month-end | Designated Body inquiry; broker placed on enhanced supervision |
| Pendency > 60 days at month-end | SEBI warning letter; reference to inspection / examination |
| Pendency > 90 days at month-end | SEBI 11B action; possible suspension of registration |
| Repeated non-resolution (3+ complaints) | Designated Director / Compliance Officer personal liability under SEBI Stock Brokers Regulations |

Brokers also face Compliance Score impact — a low SCORES disposal score affects QSB classification (`SEBI/HO/MIRSD/MIRSD-PoD-1/P/CIR/2024/14` Mar 2024 expansion) and inspection prioritisation (`NSE/INSP/53530`).

<Aside type="caution">
**The compliance score is now public.** Per the QSB expansion circular, SEBI annually publishes broker-wise compliance scores incorporating SCORES disposal performance, inspection findings, and grievance trends. The score is visible to clients on broker websites (Investor Charter publishes the score), so SCORES disposal becomes a brand-reputation issue, not merely a regulatory one.
</Aside>

## 9. Edge cases

### 9.1 Complaint against deregistered / suspended broker

If a broker's SEBI registration is suspended / cancelled, SCORES routes complaints to SEBI directly (no broker login active). Investor compensation in such cases routes through the exchange Investor Protection Fund (IPF) under SEBI Stock Exchanges and Clearing Corporations Regulations 2018 and Master Circular for Stock Exchanges `SEBI/HO/MRD-PoD2/CIR/P/2024/00181`. See [IPF deep dive](/broking-kyc/deep-dives/foundational/ipf/).

### 9.2 Complaint against deceased broker (proprietor / partnership)

For proprietorship / unregistered partnerships where the principal has died, the complaint resolution follows the partnership-deed succession / legal-heir liability. Exchange IPF still available as last-mile compensation up to IPF cap.

### 9.3 Complaint against Authorised Person

AP-related complaints are routed to the principal broker — the broker is responsible for AP supervision under NSE/COMP/48536, /56947, /58438, /63628 chain. See [AP framework deep dive](/broking-kyc/deep-dives/compliance-audit/ap-framework/). The broker cannot deflect to "we'll route to the AP"; the regulatory obligation is broker-level.

### 9.4 Cross-broker complaint (one client, multiple brokers)

If an investor has accounts at Broker A and Broker B and the complaint involves co-ordinated activity (e.g. dabba-style off-market arrangements), SCORES routes to both. Each broker submits independent ATRs; OIAE may consolidate.

### 9.5 Investor abroad / NRI

NRI complaints flow through SCORES identically. Some complaint categories (PIS account, NRO/NRE compliance, FEMA position-limit) require RBI MoU coordination — SEBI internally co-ordinates with RBI; broker submits ATR with FEMA-compliance evidence.

### 9.6 Anonymous / whistleblower complaint

SCORES requires PAN — so true anonymity isn't available. Whistleblower complaints (e.g. about insider trading, market manipulation) flow through SEBI's dedicated whistleblower portal under `SEBI/LAD-NRO/GN/2024/216` (Whistleblower Reform), not SCORES.

## 10. Practical notes

- **[gotcha]** The DGO designation must match across SCORES + exchange + website. A common audit finding (`NSE/INSP/57394` consolidated inspection circular references) is mismatch — broker updates SCORES but forgets ENIT, or updates the website but forgets SCORES. A weekly cron-style reconciliation is sensible.

- **[industry practice]** Most large brokers (>50k UCC) operate a dedicated grievance team of 5–20 staff. Smaller brokers operate it within the compliance team. The institutional mechanism circular (`SEBI/HO/MIRSD/MIRSD-PoD-1/P/CIR/2024/96`) effectively makes a dedicated grievance team mandatory for QSBs and brokers with >50,000 UCC.

- **[risk trade-off]** Aggressive marketing of "no-issue resolution" creates expectations the broker may not meet. Most large brokers under-promise (say "we'll respond within 7 days") and over-deliver (resolve within 3) to keep the SCORES-resolution-time metric strong.

- **[cost optimization]** SCORES auto-routing and ATR upload happen via web UI; large brokers use APIs (SEBI offers limited API endpoints to large entities) and queue management systems to manage 100+ active complaints. Smaller brokers manage via spreadsheet. Both work; the API approach scales better past ~50 complaints/month.

- **[gotcha]** ATR upload caps at 5 MB. For complex disputes with extensive evidence (e.g. algo-trade dispute requiring tick-data exports), the broker must zip-compress or split into multiple uploads. Evidence missing from the SCORES submission cannot be cited in the First Review unless explicitly referenced.

- **[gotcha]** Investor-charter complaint statistics must include **both** SCORES complaints and direct complaints. Brokers that only publish SCORES counts (ignoring branch / phone / email) under-report and attract inspection findings.

- **[gotcha]** Resolution time clock runs on calendar days, not working days. Festival closures, year-end blackouts, and inspection weeks do not extend the 21-day window. Plan capacity accordingly.

- **[industry practice]** The grievance-officer role is increasingly bifurcated at QSBs into "Grievance Officer" (handles SCORES intake and ATR) and "Compliance Officer" (handles regulatory escalations and inspection). The Master Circular language treats them as the same role but operational separation reduces single-point-of-failure risk.

## 11. SCORES interaction with adjacent regimes

- **PMLA / STR linkage** — A SCORES complaint may surface facts that trigger a Suspicious Transaction Report (STR) to FIU-IND. The broker's PMLA team must be looped in early; STR filings have a 7-working-day clock from forming the suspicion, separate from the 21-day SCORES ATR clock.

- **AML CDD trigger** — Sometimes a grievance reveals a CDD gap (e.g. PEP not flagged, suspicious wire pattern). Broker must update the client's risk profile and trigger EDD.

- **Investor charter monthly disclosure** — Per `SEBI/HO/MIRSD/MIRSD-PoD-1/P/CIR/2024/124`, the broker's website must show monthly complaint statistics. The SCORES MIS is the natural source.

- **Annual Compliance Report (ACR)** — Brokers submit ACR annually to SEBI/exchanges with SCORES summary. ACR is consolidated under the Stock Brokers Master Circular reporting matrix.

- **System audit & cyber audit** — System auditor (per CSCRF, `SEBI/HO/ITD-1/ITD_CSC_EXT/P/CIR/2024/113`) tests SCORES interface, ATR submission audit trail, and grievance-team access control as part of the audit scope. See [System Audit deep dive](/broking-kyc/deep-dives/compliance-audit/system-audit/).

- **Inspection** — Exchange inspection (`NSE/INSP/67804` for 2025-26 cycle) routinely reviews SCORES disposal stats, ageing analysis, and ATR quality. See [Inspection Types deep dive](/broking-kyc/deep-dives/compliance-audit/inspection-types/).

## Cross-references

- [Deep Dive — IGRC](/broking-kyc/deep-dives/compliance-audit/igrc/)
- [Deep Dive — ODR](/broking-kyc/deep-dives/compliance-audit/odr/)
- [Deep Dive — Inspection Types](/broking-kyc/deep-dives/compliance-audit/inspection-types/)
- [Deep Dive — AP Framework](/broking-kyc/deep-dives/compliance-audit/ap-framework/)
- [Deep Dive — System Audit](/broking-kyc/deep-dives/compliance-audit/system-audit/)
- [Compliance Blueprint](/broking-kyc/operations/compliance-blueprint/)
- [Operations — Audit & Compliance](/broking-kyc/operations/audit-compliance/)
- [Circulars — SEBI Other (OIAE / MRD / IMD / CFD)](/broking-kyc/reference/circulars/sebi-other/)
- [Circulars — SEBI MIRSD](/broking-kyc/reference/circulars/sebi-mirsd/)
- [Circulars — NSE](/broking-kyc/reference/circulars/nse/)

## Verified through

2026-05-14

---

*AI-generated and not legal, financial, or compliance advice. See the project [README](https://github.com/javajack/broking-kyc) for the full disclaimer.*

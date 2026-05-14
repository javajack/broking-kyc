---
title: "Deep Dive: Online Dispute Resolution (SMART ODR)"
description: Walkthrough and reference for SEBI's SMART ODR portal — conciliation and arbitration phases, market-participant onboarding, ODR Institution panels, fees, 30-day conciliation / 60-day arbitration timelines, and client experience.
---

import { Aside } from '@astrojs/starlight/components';

> **Why this page is structured this way:** ODR replaced multiple legacy exchange-arbitration silos with a single SEBI-administered portal. The page first explains the framework chronology (Jul 2023 launch → Dec 2023 master circular → operational refinements 2024–25), then walks the broker's view: how to onboard, how a case proceeds, what the broker pays, and what the client experiences.

## TL;DR

- **SMART ODR** (https://smartodr.in) is SEBI's consolidated online dispute resolution portal launched in August 2023 (`SEBI/HO/OIAE/OIAE_IAD-1/P/CIR/2023/131` dated 31 July 2023), consolidated in the **ODR Master Circular** `SEBI/HO/OIAE/OIAE_IAD-3/P/CIR/2023/195` dated 28 December 2023, amended via `SEBI/HO/OIAE/OIAE_IAD-3/P/CIR/2023/191` dated 20 December 2023.
- Two-phase process: **Conciliation (30 days)** → if unsuccessful → **Arbitration (60 days)**.
- Mandatory onboarding for stock brokers, depository participants, exchanges, clearing corporations, mutual funds, AIFs, portfolio managers, investment advisers, research analysts — and all other SEBI-regulated intermediaries.
- Empanelled ODR Institutions appoint conciliators and arbitrators from SEBI-vetted panels. Conciliators are typically retired regulators / industry experts; arbitrators are typically lawyers / retired judges with securities-law experience.
- Fee structure: tiered by dispute amount; investor pays minimal fee at conciliation, broker pays both at conciliation and arbitration. Specific fee structure published per ODR Institution.
- ODR awards are binding on the broker, enforceable as arbitral awards under the Arbitration and Conciliation Act 1996.
- Client experience: investor logs in to SMART ODR portal, files complaint with documents and dispute-amount, conciliation begins; if conciliation fails, arbitration is automatic.

## Conceptual overview

Before SMART ODR, investor-broker disputes flowed through fragmented arbitration channels:

- NSE Arbitration (with regional panels)
- BSE Arbitration
- MCX Arbitration (commodities)
- CDSL / NSDL Arbitration (depository disputes)
- Consumer court (parallel civil pathway)

Each had separate rules, separate fee structures, separate timelines, and varying outcomes. The SEBI Master Circular for SE & CC `SEBI/HO/MRD-PoD2/CIR/P/2024/00181` and the predecessor exchange-arbitration provisions framed each separately.

The 2023 SMART ODR rollout consolidated this. The August 2023 launch (`SEBI/HO/OIAE/OIAE_IAD-1/P/CIR/2023/131`) established the framework. The December 2023 Master Circular (`SEBI/HO/OIAE/OIAE_IAD-3/P/CIR/2023/195`) consolidated procedures, fees, and timelines into a single operating document. The MIRSD-side version (`SEBI/HO/OIAE/OIAE_IAD-1/P/CIR/2023/0182` dated 20 December 2023) addresses intermediaries directly. SCORES 2.0 (`SEBI/HO/OIAE/IGRD/CIR/P/2023/156`) wired SCORES → ODR escalation linkage.

For the broker, ODR is now a major operational obligation:

- One-time onboarding (PAN/registration mapped to portal)
- Per-dispute case management (intake → response → conciliation participation → arbitration response → award compliance)
- Annual fee structure participation
- Disclosure on broker website (ODR Institution details, fee structures, etc.)

<Aside type="caution">
**ODR is not optional for SEBI intermediaries.** The Master Circular makes onboarding mandatory. A broker that hasn't onboarded cannot receive ODR-routed complaints — which means SEBI deems them in default. Onboarding requires (i) registration on the SMART ODR portal, (ii) appointment of an ODR Nodal Officer, (iii) website disclosure with ODR Institution panel, fees, and routing details, (iv) payment of the broker's annual ODR onboarding fee (verify current rate on the ODR portal).
</Aside>

## 1. SMART ODR portal architecture

### 1.1 Roles on the portal

- **Investor / Complainant** — files dispute, uploads supporting documents, accepts / contests resolutions
- **Market Participant / Respondent** — broker / DP / MF / IA / RA who is the subject of the dispute
- **ODR Institution** — empanelled SEBI institution that administers the dispute (assigns conciliator, arbitrator, manages workflow)
- **Conciliator** — facilitates conciliation between parties
- **Arbitrator** — adjudicates if conciliation fails

### 1.2 ODR Institutions empanelment

SEBI has empanelled ODR Institutions to operate the portal. The Master Circular `SEBI/HO/OIAE/OIAE_IAD-3/P/CIR/2023/195` lists empanelment criteria. As of 2026, empanelled institutions include exchange-affiliated ODRs (NSE-affiliated, BSE-affiliated), depository-affiliated ODRs (NSDL-affiliated, CDSL-affiliated), and SEBI-recognised independent ODR institutions.

Each ODR Institution maintains panels of:

- **Conciliators** — typically retired regulators, retired SEBI officers, experienced industry practitioners, retired judges. Minimum experience criteria: 10–15 years in securities / financial sector or judicial / regulatory practice.
- **Arbitrators** — typically practising lawyers, retired judges, retired regulators with securities-law specialisation. Minimum 10 years experience; arbitrators undergo periodic SEBI training.

Panel members serve 2–3 year terms (industry-typical at empanelled institutions; verify on each institution's panel page); rotation prevents capture and conflict.

### 1.3 Portal access

- **Public-facing** — https://smartodr.in — investors can browse, file disputes, track status
- **Market participant login** — for registered intermediaries to receive notifications, respond to disputes, upload evidence
- **ODR institution login** — for empanelled institutions to administer cases

## 2. Onboarding for market participants

### 2.1 Pre-requisites

- SEBI registration number (active)
- Designated officer (ODR Nodal Officer) with PAN, mobile, email
- Bank account for fee remittance and award disbursement
- Authorised signatory list (Compliance Officer + Designated Director typically)
- DSC for authenticating digital submissions

### 2.2 Registration steps

1. Access portal, create account using SEBI registration number
2. Upload organisation details — registered office, branches, segments, products
3. Designate ODR Nodal Officer — primary contact for all ODR matters
4. Sign ODR Master Agreement — terms of engagement with ODR Institutions
5. Pay annual onboarding fee (verify current rate)
6. Activate — receive login credentials

### 2.3 Website disclosure

Once onboarded, brokers must disclose on their website (typically under Investor Charter / Grievance section):

- ODR Institution(s) with which the broker is enrolled
- Link to SMART ODR portal
- Fee structure summary
- Process timeline summary
- ODR Nodal Officer contact

<Aside type="tip">
**ODR onboarding fee is annual.** The annual fee is paid by each market participant. Industry-typical fee structures (verify on the ODR portal): tiered by broker size (number of UCCs / AUM); QSBs may pay enhanced fees; smaller brokers pay a flat lower rate. Non-payment of annual fee triggers SEBI's regulatory follow-up.
</Aside>

## 3. Conciliation phase (30 days)

### 3.1 Trigger

Conciliation begins when a dispute is filed. The clock starts on the date the ODR Institution acknowledges the dispute (typically within 1 working day of filing).

### 3.2 Conciliator appointment

Within 5 working days of acknowledgement, the ODR Institution appoints a conciliator from its panel. Appointment criteria:

- Subject-matter expertise (e.g. a trading dispute conciliator should have securities-trading experience)
- No conflict of interest with either party
- Availability for the 30-day window

Either party can object to the conciliator within 3 working days of appointment; the ODR Institution rules on the objection and may appoint a replacement.

### 3.3 Conciliation sessions

- **Session 1** — joint conciliation meeting (online / video). Both parties present, conciliator facilitates discussion of the dispute.
- **Sessions 2–4** — typically 1–2 separate sessions for each party (caucus-style), followed by joint or further negotiations
- **Settlement attempt** — conciliator works toward consent settlement

### 3.4 Settlement outcomes

- **Full settlement** — both parties agree on resolution; conciliator records consent terms; matter closed. Settlement is binding under the Arbitration and Conciliation Act 1996.
- **Partial settlement** — agreement on some heads but not others; the rest goes to arbitration
- **No settlement** — conciliation fails; matter automatically moves to arbitration

The 30-day window from dispute filing is firm. If conciliation extends, the conciliator must file extension request with the ODR Institution justifying the extension.

### 3.5 Broker's responsibilities

- Acknowledge dispute within 5 working days of receipt
- File written submission within 10 working days
- Attend all conciliation sessions (in-person or video) — failure to attend triggers ex-parte proceedings
- Participate in good faith — conciliators report obstruction / non-cooperation to ODR Institution
- Honour settlement (within 15 days of consent terms recording)

## 4. Arbitration phase (60 days)

### 4.1 Trigger

If conciliation fails, the matter transitions to arbitration automatically. No separate filing required.

### 4.2 Arbitrator appointment

Within 7 working days of conciliation closure, the ODR Institution appoints an arbitrator. Either party can request an arbitral tribunal (3 arbitrators) for high-value or complex disputes — typically above Rs 50 lakh disputes get 3-member tribunals (industry-typical at empanelled institutions; verify in ODR Master Circular).

### 4.3 Arbitration procedure

- **Notice of hearing** — within 10 working days of arbitrator appointment, notice with hearing date issued
- **Written submissions** — both parties file Statement of Claim (investor) and Statement of Defence (broker), with documents
- **Hearings** — typically 1–3 hearings over 30–45 days. Hearings are virtual / hybrid by default; in-person possible by mutual agreement
- **Cross-examination** — at hearings, witnesses can be examined / cross-examined
- **Closing arguments** — typically written closing submissions
- **Award reservation** — arbitrator reserves award and issues within 15–20 working days

The full 60-day cycle from arbitration commencement to award is firm; extension requires arbitrator's reasoned application to ODR Institution.

### 4.4 Award

- Written reasoned order
- Monetary award (if any) with interest from date of dispute
- Costs (each party typically bears own, but exceptional cases may shift)
- Enforceability — awards are enforceable as arbitral awards under the Arbitration and Conciliation Act 1996. Either party can challenge in High Court under Section 34 of the Act within 90 days

### 4.5 Award compliance

The broker must:

- Comply with the award within the timeline specified (typically 30 days)
- Submit proof of compliance to ODR Institution
- Failure to comply triggers — (a) civil court enforcement by investor under Section 36 of the Act, (b) exchange disciplinary action, (c) SEBI 11B action

<Aside type="caution">
**ODR award challenge.** A broker who believes the award is fundamentally flawed (procedural irregularity, beyond jurisdiction, against public policy) can challenge in High Court under Section 34 of the Arbitration and Conciliation Act 1996. The Section 34 window is **90 days from award**. Filing a challenge does not automatically stay enforcement — broker must move for stay separately. Operational reality: most awards are complied with rather than challenged, since costs of challenge often exceed the disputed amount.
</Aside>

## 5. Fee structure

Industry-typical fee tiers (verify current rates on SMART ODR portal and individual ODR Institution sites):

| Dispute amount | Investor fee (conciliation) | Investor fee (arbitration) | Broker fee (conciliation) | Broker fee (arbitration) |
| --- | --- | --- | --- | --- |
| Up to Rs 1 lakh | Rs 200–500 | Rs 1,000–2,000 | Rs 1,500–3,000 | Rs 5,000–10,000 |
| Rs 1–10 lakh | Rs 500–1,000 | Rs 2,000–5,000 | Rs 5,000–15,000 | Rs 25,000–50,000 |
| Rs 10–50 lakh | Rs 1,000–2,500 | Rs 5,000–15,000 | Rs 25,000–75,000 | Rs 75,000–2,00,000 |
| Above Rs 50 lakh | Rs 2,500–5,000 | Rs 15,000+ | Rs 75,000+ | Rs 2,00,000+ |

Notes on these tiers — actual fees vary by ODR Institution. SEBI sets the framework; institutions publish their fee schedules. The Master Circular `SEBI/HO/OIAE/OIAE_IAD-3/P/CIR/2023/195` requires fees to be reasonable, transparent, and uniform across institutions.

**Annual fee:** Each market participant pays an annual subscription fee to remain enrolled — covers portal access, dispute administration, panel maintenance.

**Additional charges:** Some institutions charge for adjournments at investor's / broker's request; some bill for additional expert witnesses or special panel reservation.

## 6. Routing decisions — ODR vs SCORES vs IGRC

| Dispute type | Recommended route |
| --- | --- |
| Pure grievance, non-monetary or small monetary (< Rs 50,000) | SCORES → broker ATR |
| Monetary fee / refund dispute (Rs 50,000 — Rs 5 lakh) | SCORES first; if unresolved, IGRC; or directly ODR |
| Mid-large monetary dispute (Rs 5 lakh — Rs 25 lakh) | SCORES, IGRC, or ODR |
| Large monetary dispute (Rs 25 lakh+) | ODR (IGRC monetary cap typically exceeded) |
| Substantive interpretation of regulations (e.g. unauthorised trading allegation) | ODR (full arbitral framework) |
| Recoveries from suspended broker | IPF + ODR / civil court for residual |

See [SCORES Procedure](/broking-kyc/deep-dives/compliance-audit/scores-procedure/) and [IGRC](/broking-kyc/deep-dives/compliance-audit/igrc/) for the alternative routes.

## 7. Client experience

### 7.1 Investor's view

1. **Discovery** — investor visits https://smartodr.in; system shows market participants searchable by name / registration
2. **Filing** — selects broker; enters PAN; describes dispute; uploads supporting documents; pays investor fee online
3. **Acknowledgement** — receives CRN; SMS / email confirmation
4. **Conciliation tracking** — receives session schedules; attends sessions virtually
5. **Conciliation outcome** — either consent settlement or moves to arbitration
6. **Arbitration tracking** — attends hearings; receives award
7. **Award acceptance / challenge** — either accepts award or challenges in court

### 7.2 Broker's view

1. **Notification** — broker receives dispute notification via portal + email
2. **Acknowledgement** — within 5 working days
3. **Submission** — within 10 working days, submits Statement of Defence with documents
4. **Conciliation** — Compliance Officer / authorised counsel attends sessions
5. **Conciliation outcome** — either consent or moves to arbitration
6. **Arbitration** — attends hearings; submits written closing
7. **Award compliance** — pays monetary award if any, executes corrective action

## 8. Disclosure obligations

Per `SEBI/HO/OIAE/OIAE_IAD-3/P/CIR/2023/195` clauses on transparency:

- Broker website must display:
  - ODR Institution(s) enrolled with
  - ODR Nodal Officer contact
  - Fee structure summary (per institution)
  - Timeline summary (30/60-day phases)
  - Link to SMART ODR portal
- Annual disclosure of ODR cases on broker website (industry-typical):
  - Number of conciliation cases received
  - Number of conciliation cases settled
  - Number of arbitration awards
  - Aggregate monetary outflow under ODR
- Internal reporting to compliance and board on ODR pendency and outcomes (industry-typical at QSBs)

## 9. Edge cases

### 9.1 Class action (multi-investor) dispute

If multiple investors file similar complaints (systemic over-charging, AP-fraud pattern), ODR Institution may consolidate. Consolidated awards apply uniformly.

### 9.2 Broker bankruptcy / suspension during ODR pendency

If broker is suspended / under resolution, ODR pauses pending substitution of broker representative (Resolution Professional under IBC, if applicable). Investors get parallel recourse to IPF for compensation up to IPF cap.

### 9.3 Investor death during ODR pendency

Legal heir substitutes. Estate-administration proof required.

### 9.4 Cross-border investor

NRI / foreign investor disputes flow through ODR identically. ODR hearings are virtual; jurisdictional issues addressed through PIS / FEMA compliance evidence.

### 9.5 Disputes between intermediaries

ODR is structured for investor-vs-intermediary disputes. Intermediary-vs-intermediary disputes (e.g. broker vs depository over off-market transfer reversal) typically go through exchange / depository internal mechanisms, not ODR.

### 9.6 Dispute on past period

Cut-off for ODR-eligible disputes: from the date of the dispute / cause of action. Industry-typical limitation period: 3 years from cause of action (per the Limitation Act 1963, as applied to arbitration). Older disputes may be time-barred.

### 9.7 Crystallised IGRC order

If IGRC has already issued an order and the period for appeal has lapsed, ODR may decline to re-adjudicate (res judicata).

## 10. Reporting and oversight

- ODR Institutions report case statistics to SEBI quarterly
- SEBI publishes consolidated ODR statistics in its Annual Report
- Pendency, average disposal time, satisfaction surveys
- Periodic audit of ODR Institution functioning by SEBI

## 11. Practical notes

- **[gotcha]** Conciliation participation is mandatory in good faith. A broker that submits boilerplate denial and skips conciliation sessions may face adverse inferences at arbitration. Compliance Officer should attend personally for material disputes.

- **[industry practice]** Most large brokers maintain an "ODR docket" tracking pending conciliations and arbitrations, with hearing dates, exposure amount, settlement-authority limits.

- **[risk trade-off]** Settling at conciliation is typically cheaper than fighting through arbitration. Broker fees at arbitration are 3–5x conciliation fees. Plus exposure to monetary award + 90-day Section 34 challenge cost. Settle if liability is clear.

- **[cost optimization]** Pre-conciliation negotiation directly with investor (informal call between Compliance Officer and investor) often resolves disputes before formal conciliation triggers. ODR Institution can record such early settlements without proceeding to formal conciliation hearings.

- **[gotcha]** Document everything. ODR awards turn heavily on documentary evidence — KYC trail, contract notes, audio recordings, surveillance alerts. Brokers who haven't kept proper records lose disputes they would otherwise win.

- **[gotcha]** Section 34 challenge to ODR award has 90-day window; filing in High Court costs significant legal fees (Rs 5–20 lakh for material disputes). Most brokers don't challenge unless the dispute is large (above Rs 50 lakh) or contains substantive jurisdictional error.

- **[industry practice]** Mid-large brokers retain panel counsel for ODR matters — typically a senior advocate plus 1–2 instructing solicitors. Smaller brokers handle in-house Compliance Officer + occasional external counsel.

- **[gotcha]** ODR award includes interest from date of dispute; if dispute is two years old by the time of award, interest can be material. Negotiate settlement amounts to include interest exposure.

- **[industry practice]** SEBI publishes ODR Institution performance — average time-to-resolve, settlement rates. Brokers can choose which institution to enrol with (within SEBI-approved panel). Industry-typical: brokers enrol with institutions that have lower delay and higher settlement rates.

- **[gotcha]** ODR Nodal Officer change must be promptly updated on the portal; missing a notification because the previous Nodal Officer left and the inbox isn't monitored has happened.

## 12. Adjacent regimes

- **PMLA / STR** — ODR proceedings may surface suspicious-transaction facts triggering an STR to FIU-IND. Compliance Officer must coordinate.
- **Income-tax** — Settlement amounts may have TDS implications under Section 194 / 195. Tax-team review of settlements > Rs 1 lakh is industry-typical.
- **Stamp duty** — Settlement agreements may attract stamp duty under State Stamp Acts. Some states exempt SEBI-ODR settlements; verify with State Stamp Office.
- **GST** — Brokerage refunds may attract GST adjustment under CGST Section 34 (credit note). Tax compliance team coordinates.
- **Civil court** — Investor (or broker) can challenge ODR award in High Court under Section 34. ODR award is otherwise enforceable as a decree under Section 36 of the Arbitration Act.

## Cross-references

- [Deep Dive — SCORES Procedure](/broking-kyc/deep-dives/compliance-audit/scores-procedure/)
- [Deep Dive — IGRC](/broking-kyc/deep-dives/compliance-audit/igrc/)
- [Deep Dive — Inspection Types](/broking-kyc/deep-dives/compliance-audit/inspection-types/)
- [Deep Dive — IPF](/broking-kyc/deep-dives/foundational/ipf/)
- [Deep Dive — AP Framework](/broking-kyc/deep-dives/compliance-audit/ap-framework/)
- [Compliance Blueprint](/broking-kyc/operations/compliance-blueprint/)
- [Circulars — SEBI Other (OIAE)](/broking-kyc/reference/circulars/sebi-other/)
- [Circulars — SEBI MIRSD](/broking-kyc/reference/circulars/sebi-mirsd/)
- [Circulars — NSE](/broking-kyc/reference/circulars/nse/)

## Verified through

2026-05-14

---

*AI-generated and not legal, financial, or compliance advice. See the project [README](https://github.com/javajack/broking-kyc) for the full disclaimer.*

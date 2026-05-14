---
title: "Deep Dive: CSCRF (Cyber Security and Cyber Resilience Framework)"
description: Walkthrough and reference for SEBI's August 2024 CSCRF — categorisation tiers (Qualified RE / Mid-size / Small / Self-Cert), VAPT cadence, CERT-In incident reporting (6-hour rule), Type-I/II/III audit cycles, evidence retention, vendor due diligence, and the 2024-2025 clarification trail.
---

import { Aside } from '@astrojs/starlight/components';

> **Why this page is structured this way:** CSCRF is the single most-cited cyber framework for Indian SEBI-regulated entities. The page first explains the framework chronology (Aug 2024 launch → multiple clarification circulars), then maps the categorisation logic (which broker falls in which tier), then the operational obligations domain-by-domain (governance, identification, protection, detection, response, recovery), and finally the practical aspects — VAPT cadence, incident reporting, audit cycle, vendor due diligence.

## TL;DR

- **Foundational circular:** `SEBI/HO/ITD-1/ITD_CSC_EXT/P/CIR/2024/113` (20 August 2024) — Cybersecurity and Cyber Resilience Framework (CSCRF). Replaces earlier sectoral cyber circulars; applies to all SEBI-regulated entities (REs).
- **Clarifications chain:**
  - `SEBI/HO/ITD-1/ITD_CSC_EXT/P/CIR/2024/184` (31 Dec 2024) — Initial clarifications (cloud, SOC, audit timeline extensions)
  - `SEBI/HO/ITD-1/ITD_CSC_EXT/P/CIR/2025/...` (28 Mar 2025) — Further clarifications
  - `SEBI/HO/ITD-1/ITD_CSC_EXT/P/CIR/2025/...` (30 Apr 2025) — Further clarifications
  - **FAQ dated 11 June 2025**
  - `SEBI/HO/ITD-1/ITD_CSC_EXT/P/CIR/2025/119` (28 Aug 2025) — Latest clarifications
- **Five-goal framework:** Anticipate, Withstand, Contain, Recover, Evolve
- **Categorisation:** **MII** (Market Infrastructure Institution) → **Qualified RE** → **Mid-size RE** → **Small RE** → **Self-Certification RE**. Categorisation is computed annually using clauses 2.1.1 and 2.1.2 — for stock brokers based on total registered clients (clause 2.1.1) and trade value handled (clause 2.1.2).
- **VAPT** quarterly cadence for critical systems; annual for others; submission to exchange (per `NSE/INSP/70471` FY26 VAPT operationalisation).
- **CERT-In incident reporting** — 6-hour rule for any cyber incident from CERT-In Directions dated 28 April 2022 (Sec 70B of Information Technology Act 2000). SEBI cyber audit also requires same-day intimation to SEBI / exchange.
- **Audit cycles:** Type-I (annual cyber audit per CSCRF clause 4.4 — 100% critical + 25% non-critical), Type-II (VAPT — quarterly critical / annual others), Type-III (special / event-triggered).
- **Evidence retention:** Minimum **180 days** for security logs (some categories longer — trade-related 5+ years); some categories longer per RBI / PMLA cross-reference.
- **Vendor due diligence** — supply-chain security with formal vendor risk assessment, contractual safeguards, SOC reports from vendors.

## Conceptual overview

Before CSCRF, SEBI's cybersecurity regulation was a patchwork:

- 2018 Cyber Security & Cyber Resilience framework for brokers / DPs
- 2019 ditto for MIIs
- 2022 MII modifications (`SEBI/HO/MRD1/MRD1_DTCS/P/CIR/2022/68`)
- 2022 modifications for stock brokers / DPs (Jun 2022, Sep 2022)
- VAPT-specific circulars across years
- Cyber audit format unification (`NSE/INSP/56216`)

CSCRF (Aug 2024) consolidates everything into one framework with risk-categorised obligations. Different RE categories have different intensities — MII is highest, Self-Certification REs (small brokers, IAs, RAs) have the lightest framework but still must self-certify compliance.

The framework is structured around the **five-goal cyber-resilience model**:

1. **Anticipate** — Risk identification, threat intelligence, security strategy, board oversight
2. **Withstand** — Preventive controls, identity & access management, encryption, secure configurations
3. **Contain** — Detection, monitoring, security operations centre (SOC), incident triage
4. **Recover** — Response, restoration, post-incident review, BCP/DR
5. **Evolve** — Continuous improvement, training, audit, regulatory reporting

<Aside type="caution">
**CSCRF is mandatory for all SEBI REs.** The exemption is narrow — only Self-Certification REs have lighter obligations (still substantive). Mid-size and Small REs got phased compliance timelines per the December 2024 clarification (`SEBI/HO/ITD-1/ITD_CSC_EXT/P/CIR/2024/184`) and subsequent extensions. The compliance pathway is unambiguous: every broker must categorise itself, meet that tier's obligations, and submit periodic reports / audit results.
</Aside>

## 1. Regulatory chain and timeline

### 1.1 Pre-CSCRF cybersecurity framework

- 2018: Cyber Security & Cyber Resilience for stock brokers / DPs (foundational)
- 2019: Equivalent for MIIs (exchanges, clearing corps, depositories)
- Jun 2022: `Sep 2022 / Jun 2022 MIRSD circulars` — modifications for brokers / DPs; 6-hour incident reporting reaffirmed; quarterly cyber-attack reports
- May 2022: `SEBI/HO/MRD1/MRD1_DTCS/P/CIR/2022/68` — modification for MIIs; half-yearly comprehensive cyber audits with MD/CEO declaration

### 1.2 CSCRF era

- **20 Aug 2024** — `SEBI/HO/ITD-1/ITD_CSC_EXT/P/CIR/2024/113` — CSCRF launched; applies to all REs
- **20 Aug 2024** — `NSE/INSP/63502` — NSE forwarding to brokers; compliance deadline 1 Jan 2025 (existing REs) / 1 Apr 2025 (newly regulated)
- **31 Dec 2024** — `SEBI/HO/ITD-1/ITD_CSC_EXT/P/CIR/2024/184` — Clarifications; Mid-size / Small / Self-Cert REs given extended timelines
- **28 Mar 2025** — Further clarifications
- **30 Apr 2025** — Further clarifications
- **11 Jun 2025** — FAQ
- **1 Jul 2025** — `NSE/INSP/68856` — NSE forwarding of extension for Mid-size / Small REs
- **28 Aug 2025** — `SEBI/HO/ITD-1/ITD_CSC_EXT/P/CIR/2025/119` — Latest clarifications
- **29 Aug 2025** — `NSE/INSP/69906` — NSE forwarding
- **1 Sep 2025** — `NSE/INSP/69939` — NSE clarifications on clause 2.1.1 categorisation computation
- **17 Oct 2025** — `NSE/INSP/70900` — Type-III system audit FY26 H1 operationalisation
- **10 Nov 2025** — `NSE/INSP/71214` — Cyber Audit framework FY26 continuation
- **1 Jan 2026** — `NSE/INSP/72118` — Quarterly Cyber Incident report for Q4 CY25
- **22 Apr 2026** — `NSE/INSP/73849` — Cyber Audit framework for FY26-27

This rapid clarification trail reflects the complexity of operationalising CSCRF — many REs had implementation questions, and SEBI responded with iterative clarifications.

## 2. Categorisation (clauses 2.1.1 / 2.1.2)

CSCRF categorises REs into tiers based on size and risk. For stock brokers, the relevant categorisation criteria (clauses 2.1.1 and 2.1.2 per the CSCRF framework, clarified in `NSE/INSP/69939`):

### 2.1 Categorisation criteria

For stock brokers:

| Tier | Threshold (computed annually) |
| --- | --- |
| MII | Stock exchange, clearing corp, depository (not applicable to brokers) |
| Qualified RE | Brokers meeting QSB criteria per `SEBI/HO/MIRSD/MIRSD-PoD-1/P/CIR/2023/24` and `2024/14` (size of operations, active clients > X, trade volume > Y, client funds handled > Z) |
| Mid-size RE | Brokers with significant but sub-QSB scale — typically 10k–500k registered clients (industry-typical interpretation) |
| Small RE | Brokers with smaller scale — 1k–10k registered clients (industry-typical) |
| Self-Cert RE | Smallest brokers — < 1k registered clients (industry-typical) |

Exact thresholds in clauses 2.1.1 and 2.1.2 — verify in the current CSCRF text on the SEBI portal. NSE's clarification in `NSE/INSP/69939` computes total number of registered clients per clause 2.1.1.

### 2.2 Annual re-categorisation

- Brokers re-categorise annually based on year-end metrics
- Self-Cert moves up to Small if growth crosses threshold
- Compliance obligations adjust upward; downward movement is rare but possible after sustained decline

### 2.3 Obligation density by tier

| Obligation | MII | Qualified RE | Mid-size RE | Small RE | Self-Cert |
| --- | --- | --- | --- | --- | --- |
| Board cyber committee | Required | Required | Recommended | — | — |
| Dedicated CISO | Required | Required | Required (or shared) | Recommended | — |
| ISO 27001 certification | Required | Required | Required | Recommended | — |
| SOC (Security Operations Centre) | 24x7 in-house | 24x7 in-house or external | External / managed | Periodic monitoring | — |
| VAPT cadence (critical) | Quarterly | Quarterly | Quarterly | Annual | Annual |
| Cyber audit | Half-yearly | Annual | Annual | Annual | Self-cert |
| Data localisation | Required | Required | Required | Required | Required |
| Tabletop exercises | Quarterly | Half-yearly | Annual | Annual | Annual |
| Threat intelligence subscription | Required | Required | Recommended | — | — |
| Privileged Access Management | Required | Required | Required | Recommended | — |

These are illustrative based on the CSCRF text and clarification circulars — actual obligation density per tier should be cross-referenced with the current framework PDF and FAQ.

<Aside type="tip">
**Mid-size and Small RE timeline relief.** The Dec 2024 clarifications (`SEBI/HO/ITD-1/ITD_CSC_EXT/P/CIR/2024/184`) and subsequent Jul 2025 extension (`NSE/INSP/68856`) gave Mid-size, Small, and Self-Cert REs additional time to meet specific CSCRF clauses. Brokers should plan for staggered implementation — meet immediate baseline (incident reporting, basic VAPT, governance) first; build out advanced controls (SOC, threat intel, tabletop exercises) over the deferred timeline.
</Aside>

## 3. The five-goal framework

### 3.1 Anticipate

- **Cyber risk register** — maintained at organisation level; updated quarterly
- **Threat intelligence subscription** — typically from a SEBI-approved threat intel provider
- **Strategy and policy** — Board-approved cybersecurity strategy; cybersecurity policy reviewed annually
- **Board oversight** — Board Cybersecurity Committee (for QSB and above); CIO / CISO reports to Board quarterly
- **Risk assessment** — annual cyber risk assessment by independent assessor (industry-typical)

### 3.2 Withstand

- **Identity & access management** — RBAC / PBAC; privileged user management (PAM); Multi-Factor Authentication (MFA) for privileged access
- **Encryption** — at rest (AES-256+) and in transit (TLS 1.2+)
- **Secure configurations** — golden image / baseline; configuration drift detection
- **Network segmentation** — DMZ for external-facing; production-internal separation
- **Endpoint security** — EDR / antivirus; mobile device management
- **Data localisation** — primary data centres in India; cloud-services per clarification circular (Dec 2024)

### 3.3 Contain

- **Security Operations Centre (SOC)** — 24x7 for MIIs / QSBs; external SOC option for Mid-size / Small REs; periodic monitoring for Self-Cert
- **SIEM (Security Information and Event Management)** — log aggregation; correlation rules; alert workflow
- **Intrusion detection / prevention** — IDS/IPS at perimeter
- **Vulnerability management** — patch management lifecycle; SLA: 30 days for critical patches
- **Threat hunting** — proactive search for indicators of compromise

### 3.4 Recover

- **Incident response plan** — board-approved; tested annually
- **BCP / DR** — primary site, DR site, RTO < 4 hours, RPO < 4 hours per industry typical (verify Master Circular for current); see [BCP / DR Drill](/broking-kyc/deep-dives/specialty/bcp-dr-drill/)
- **Backup strategy** — daily / weekly / monthly tiers; offsite + offline copies
- **Forensic capability** — incident-investigation playbook; preservation of evidence
- **Communication plan** — to clients, regulator, exchanges, CERT-In

### 3.5 Evolve

- **Training** — annual cybersecurity training for all employees; specialised training for IT / Security teams; phishing simulations
- **Tabletop exercises** — frequency per tier
- **Cyber audit** — frequency per tier
- **Post-incident review** — for each material incident
- **Continuous improvement** — risk register updates; control effectiveness review

## 4. VAPT — Vulnerability Assessment and Penetration Testing

### 4.1 Cadence

Per CSCRF clause 4.3:

- **Critical systems** — quarterly VAPT
- **Non-critical systems** — annual VAPT
- **Web applications and mobile apps** — at every major release; quarterly for client-facing portals
- **APIs** — at every major release; quarterly for client APIs

### 4.2 Scope

- **External VAPT** — internet-facing assets (websites, APIs, mobile apps, perimeter network)
- **Internal VAPT** — internal network from a compromised-employee or compromised-endpoint perspective
- **Application VAPT** — web app / mobile app pentest (OWASP Top 10 + business logic)
- **Database VAPT** — privileged-account misuse, injection vectors
- **Cloud VAPT** — cloud configuration assessment (CIS benchmarks)

### 4.3 Approved testers

- CERT-In empanelled testers preferred
- Industry certifications — CEH / OSCP / GPEN / GWAPT / GCIH (industry-typical)
- Conflict of interest screening

### 4.4 Reporting

- VAPT report submitted to exchange per `NSE/INSP/70471` (Sep 2025 — FY26 VAPT report submission)
- Findings categorised by CVSS score (Critical / High / Medium / Low / Informational)
- Remediation SLA — 30 days for Critical; 60 days for High; 90 days for Medium

### 4.5 Re-testing

- Critical findings must be re-tested post-remediation; findings remain "Open" until verified closed
- VAPT report includes status of previous-cycle findings

## 5. CERT-In incident reporting (6-hour rule)

### 5.1 Foundational CERT-In Directions

- **CERT-In Directions dated 28 April 2022** (Section 70B of Information Technology Act 2000) — mandates **6-hour incident reporting** by service providers, intermediaries, body corporates for specified cyber incidents
- Reporting categories include: targeted scanning / probing, data breaches, unauthorised access, identity theft, phishing attacks, ransomware, malicious mobile apps, etc.

### 5.2 SEBI cross-reference

- SEBI cyber circulars (pre-CSCRF) had 6-hour reporting to exchange / depository / SEBI
- CSCRF reaffirms this and adds quarterly cyber-incident reports
- `NSE/INSP/72118` (1 Jan 2026) — Quarterly Cyber Incident report due 15 Jan 2026 for Q4 CY25

### 5.3 Reporting matrix

| Recipient | Window | Channel |
| --- | --- | --- |
| CERT-In | 6 hours | CERT-In Incident Reporting Form via https://www.cert-in.org.in |
| SEBI | Same day (6 hours) | Email / SEBI Cyber Incident Reporting Portal |
| Exchange / Depository | Same day (6 hours) | ENIT-NEW-COMPLIANCE (NSE), equivalent at BSE / MCX, CDSL / NSDL communique channel |
| NCIIPC (where applicable) | As per NCIIPC Directions | If critical information infrastructure |

### 5.4 Quarterly reporting

- Quarterly cyber incident report covering all incidents in the quarter
- Even nil-incident reporting (industry-typical at smaller brokers) — file nil report
- Per `NSE/INSP/72118` Q4 CY25 due 15 Jan 2026 → similar quarterly cadence going forward
- Format covers: incident category, scope, impact, response actions, lessons learned, current status

### 5.5 Incident categories (industry-typical taxonomy)

- Unauthorised access
- Data exfiltration
- Denial of service
- Ransomware
- Phishing campaign targeting clients
- Malicious code on broker systems
- Compromise of vendor / supply chain
- Credential leak / dump
- Insider threat / privileged user misuse
- Trade-system breach

<Aside type="caution">
**The 6-hour clock is calendar hours, not business hours.** An incident detected at 11 PM on a Sunday must be reported by 5 AM Monday. SOC teams need 24x7 escalation paths to Compliance Officer and to CERT-In / SEBI. Industry-typical: SOC has pre-authorised template emails and pre-positioned authentication tokens for emergency reporting.
</Aside>

## 6. Audit cycles

### 6.1 Cyber Audit (per CSCRF clause 4.4)

- **Scope:** 100% critical systems + 25% non-critical (sample basis with documented rationale)
- **Cadence:** Annual for QSBs / Mid-size REs; half-yearly for MIIs
- **Auditor:** CERT-In empanelled IS auditing organisation
- **Reporting:** Audit report to Board + exchange + SEBI
- **Follow-on:** Closing audit verifies remediation
- Per `NSE/INSP/67637` (FY25-26), `NSE/INSP/71214` (clarifications), `NSE/INSP/73849` (FY26-27)

### 6.2 System Audit (per `CIR/MRD/DMS/34/2013` + `SEBI/HO/MIRSD/TPD/CIR/2025/10`)

- Type-I / II / III categorisation (see [System Audit deep dive](/broking-kyc/deep-dives/compliance-audit/system-audit/))
- Overlap with cyber audit; coordinated coverage required

### 6.3 Tabletop exercises

- Simulated incident scenarios — ransomware, exchange outage, DR failover, third-party breach
- Frequency: Quarterly (MII), Half-yearly (QSB), Annual (others)
- Outputs: After-action review; gap remediation

### 6.4 Red team / threat simulation

- Adversarial simulation by independent red team
- Recommended for MIIs and QSBs (industry-typical; CSCRF doesn't make this strictly mandatory but framework expectation)
- Frequency: Annual

## 7. Evidence retention

### 7.1 Minimum retention per CSCRF

- **Security logs:** Minimum **180 days** (clause referenced in CSCRF)
- **Audit logs (system / application):** 1 year minimum
- **Trade-related logs:** 5 years (per SEBI Stock Brokers Master Circular)
- **Client communication logs:** 5–8 years (per SEBI broker regulation overlap)
- **KYC artefacts:** 10 years post relationship termination (per SEBI AML Master + PMLA)
- **Incident response logs:** 3 years (industry-typical)
- **VAPT reports:** 3 years (industry-typical)

### 7.2 Format and integrity

- Append-only logs preferred
- Cryptographic integrity protection (HMAC / hash chain)
- Time-synchronised (NTP from authoritative source)
- Encrypted in storage; transmitted securely

### 7.3 Access controls

- Logs accessible only to authorised investigators / auditors
- Privileged access logged
- Tamper-detection alerting

## 8. Vendor due diligence

### 8.1 Scope

CSCRF includes supply-chain security obligations. Vendors with system access or holding RE data are in scope:

- Cloud-services providers
- Software-as-a-Service vendors (CRM, OMS, RMS, surveillance, compliance tools)
- Outsourced operations (back-office, KYC processing, customer support)
- Hardware / network vendors
- Managed-security-service providers (SOC, VAPT, threat intelligence)

### 8.2 Pre-engagement

- Vendor risk assessment questionnaire
- SOC report review (SOC 2 Type II preferred; ISO 27001 certification)
- Site visit / virtual inspection for critical vendors
- Contractual safeguards (data localisation, breach notification, audit rights)

### 8.3 Ongoing monitoring

- Annual vendor risk re-assessment
- VAPT of vendor-provided systems (where applicable)
- Incident-notification clauses tested
- Quarterly governance review of top vendors

### 8.4 Termination / offboarding

- Data return / certified destruction
- Access revocation
- Final review and sign-off

### 8.5 Sub-contractors

- Vendor's sub-contractors must meet equivalent controls
- Flow-down obligations in master agreements

## 9. Cloud-services scope (Dec 2024 clarification)

Per `SEBI/HO/ITD-1/ITD_CSC_EXT/P/CIR/2024/184`:

- **Cloud-services in scope** — IaaS / PaaS / SaaS used to host RE operations
- **Shared responsibility model** — RE retains regulatory responsibility for security configuration of cloud workloads
- **Data localisation** — RE data must be hosted in India (with carve-outs for certain types per RBI / SEBI cross-references)
- **Cloud-provider SOC reports** — RE must obtain and review
- **Encryption keys** — RE-managed where possible (KMS / HSM)
- **Configuration assessment** — cloud-specific VAPT
- **Logging** — cloud logs aggregated into RE's SIEM

## 10. Penalties for non-compliance

- Financial disincentive per CSCRF non-compliance (per `NSE/INSP/53530` and exchange enforcement chains)
- SEBI 11B action for material breaches
- Enhanced supervision
- Public disclosure of non-compliance (broker website Investor Charter)
- Suspension of operations in extreme cases

## 11. Edge cases

### 11.1 New broker entrant

- CSCRF compliance from registration
- Initial cyber audit within 12 months
- Risk register and policies in place pre-launch

### 11.2 Broker acquiring another broker

- Inherited cyber controls of acquired entity
- Transition cyber audit
- Migration plan with cyber risk mitigation

### 11.3 Broker offering services through a sub-brand / app

- Sub-brand is in CSCRF scope (broker is principal)
- Same governance, audit, incident reporting

### 11.4 Cross-border operations

- Foreign branch / subsidiary may have host-country cybersecurity obligations
- Group-wide policy (per AML Master Circular cross-reference) ensures consistency
- Data flows cross-border per RBI / SEBI cross-references

### 11.5 Outsourced SOC

- Mid-size / Small REs typically outsource SOC
- Outsourcing agreement must address all CSCRF SOC obligations
- RE retains ultimate responsibility

### 11.6 Self-Cert RE

- Annual self-certification of CSCRF compliance
- Lighter obligations but still substantive (basic controls, annual VAPT, incident reporting, training)
- Independent verification not mandatory but recommended

### 11.7 New technology adoption (e.g. AI / ML in trading)

- Adoption triggers fresh risk assessment
- VAPT scope expanded
- Audit scope expanded
- Board approval at QSBs

## 12. Practical notes

- **[gotcha]** Categorisation under clauses 2.1.1 / 2.1.2 is computed annually. A broker that grows past the next tier threshold during the year must comply with the higher tier from the start of the next FY. Plan for "next-tier" obligations in advance.

- **[industry practice]** Most QSBs and large Mid-size REs run a Cyber Governance Council that meets monthly, attended by CIO, CISO, Compliance Officer, Designated Director. The Council reviews risk register, incidents, audit findings.

- **[risk trade-off]** Outsourced SOC is cheaper but slower; in-house SOC is expensive but faster. QSBs typically run hybrid — in-house for trade systems, outsourced for office / back-office.

- **[cost optimization]** CSCRF compliance cost scales with broker size. Industry-typical: Rs 1–5 crore per annum for QSBs (in-house SOC, dedicated CISO, threat intel subscription, cyber audit, VAPT, training, tools). Mid-size brokers: Rs 25 lakh–1 crore. Small / Self-Cert: under Rs 25 lakh.

- **[gotcha]** Vendor due diligence often skipped for "non-critical" vendors. CSCRF makes this risky — a low-risk vendor with access to client PII can become the breach vector.

- **[industry practice]** Most QSBs are ISO 27001 certified, with the certification scope covering broker operations end-to-end. Mid-size REs typically certify the most critical scope (trading + client data).

- **[gotcha]** CSCRF VAPT submission per `NSE/INSP/70471` includes scope evidence and remediation status. Incomplete submissions attract follow-up + penalty.

- **[industry practice]** Most Mid-size and Small REs use Managed Detection and Response (MDR) services rather than building in-house. MDR providers offer SOC + threat intel + incident response in one package.

- **[gotcha]** Tabletop exercises often skipped or done cursorily. SEBI inspection looks for evidence of meaningful exercises — scenarios documented, gaps identified, remediation tracked.

- **[gotcha]** Cyber incident logs and CERT-In acknowledgements must be retained for inspection. Brokers that file incidents but lose the acknowledgement evidence face awkward inspection follow-ups.

- **[industry practice]** CISO (Chief Information Security Officer) role is increasingly mandatory at QSBs and Mid-size REs. The role separates from CIO (technology) and Compliance Officer (regulatory) but reports into both.

- **[risk trade-off]** Aggressive compliance documentation (every control mapped to every CSCRF clause) creates a paper trail but also creates audit-trail liability. Mature REs document at the level needed for audit defensibility without over-documenting trivial controls.

- **[gotcha]** Quarterly cyber incident report is due 15th of the month after quarter-end (per `NSE/INSP/72118` pattern). Calendar this — missing it triggers reminder + financial disincentive.

- **[gotcha]** The CSCRF FAQ (11 June 2025) is the most operationally useful clarification document. Read it cover-to-cover; it answers many sub-clause questions that the main circular leaves open.

## 13. Adjacent regimes

- **System Audit** — per [System Audit deep dive](/broking-kyc/deep-dives/compliance-audit/system-audit/); substantial overlap with CSCRF cyber audit
- **Concurrent Audit** — per [Concurrent Audit deep dive](/broking-kyc/deep-dives/compliance-audit/concurrent-audit/); IT-controls fall within scope
- **Inspection** — exchange / SEBI / depository inspection (per [Inspection Types deep dive](/broking-kyc/deep-dives/compliance-audit/inspection-types/)) reviews CSCRF compliance
- **CERT-In** — incident reporting, advisory subscription, audit
- **NCIIPC** (National Critical Information Infrastructure Protection Centre) — for entities designated as critical information infrastructure
- **DPDP Act** — Digital Personal Data Protection Act 2023 cross-references; CSCRF privacy controls support DPDP compliance
- **RBI cyber framework** — for broker-bank hybrid groups, harmonisation needed
- **PMLA / AML** — incident may surface STR-triggering facts; coordination with PMLA team

## Cross-references

- [Deep Dive — System Audit](/broking-kyc/deep-dives/compliance-audit/system-audit/)
- [Deep Dive — Concurrent Audit](/broking-kyc/deep-dives/compliance-audit/concurrent-audit/)
- [Deep Dive — Inspection Types](/broking-kyc/deep-dives/compliance-audit/inspection-types/)
- [Deep Dive — BCP / DR Drill](/broking-kyc/deep-dives/specialty/bcp-dr-drill/)
- [Deep Dive — Retail Algo Framework](/broking-kyc/deep-dives/trading-day/retail-algo-framework/)
- [Deep Dive — OMS Internals](/broking-kyc/deep-dives/trading-day/oms-internals/)
- [Compliance Blueprint](/broking-kyc/operations/compliance-blueprint/)
- [Operations — Audit & Compliance](/broking-kyc/operations/audit-compliance/)
- [Circulars — SEBI MIRSD](/broking-kyc/reference/circulars/sebi-mirsd/)
- [Circulars — NSE](/broking-kyc/reference/circulars/nse/)
- [Circulars — SEBI Other](/broking-kyc/reference/circulars/sebi-other/)
- [Circulars — MeitY (CERT-In)](/broking-kyc/reference/circulars/meity/)

## Verified through

2026-05-14

---

*AI-generated and not legal, financial, or compliance advice. See the project [README](https://github.com/javajack/broking-kyc) for the full disclaimer.*

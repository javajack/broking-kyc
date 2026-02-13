---
title: Audit & Compliance
description: What to keep, how long, and who audits it — data retention requirements, audit trail specifications, and compliance reporting obligations.
---

Building a KYC (Know Your Customer) system is not just about onboarding customers quickly — it is equally about proving, years later, that every step was done correctly. Regulators, auditors, and law enforcement agencies all have the right to examine your records, and the consequences of not having them can range from penalties to license revocation. Think of audit and compliance as the "memory" of your system: every document collected, every verification performed, every approval given, and every modification made must be recorded, retained, and retrievable for years. This page covers data retention requirements under SEBI (Securities and Exchange Board of India) and PMLA (Prevention of Money Laundering Act, 2002), annual audit obligations, cybersecurity frameworks, and suspicious activity reporting timelines.

:::note[Why This Matters for Engineers]
Even if you are building the front-end or the API (Application Programming Interface) layer, understanding retention and audit requirements affects your database design, storage architecture, and logging strategy. For example, knowing that VIPV (Video In-Person Verification) recordings must be retained for 7 years in tamper-proof storage directly impacts your media storage choices and costs.
:::

Let us start with how long different types of records must be kept.

## Data Retention Requirements

Data retention is not optional — it is legally mandated, and the retention periods vary depending on the type of record and the regulation that governs it. The longest retention periods (10 years) apply to KYC documents and transaction records under the PMLA, while SEBI-specific records have shorter but still substantial retention periods.

| Record Type | Min Retention | Regulation |
|-------------|---------------|-----------|
| KYC documents & customer identification records | **10 years** after business relationship ends | PMLA, 2002 |
| Transaction records | **10 years** | PMLA, 2002 |
| Complex/unusual transaction records | **10 years** | PMLA, 2002 |
| Mandatory communications & acknowledgments | **8 years** | SEBI Circular Aug 2016 |
| VIPV/Video KYC recordings | **7 years** (tamper-proof) | SEBI VIPV circular |
| Books of accounts & records | **5 years** | SEBI (Stock Brokers) Regulations |
| Communication logs | **5-8 years** (varies by type) | SEBI circulars |

In plain English: when in doubt, keep it for 10 years. The most conservative interpretation — retaining all KYC-related records for 10 years after the business relationship ends — is the safest approach and eliminates the risk of accidentally purging records that a regulator might ask for.

:::caution[10 Years After Relationship Ends, Not After Record Creation]
The PMLA retention clock starts when the business relationship ends — meaning when the customer closes their account — not when the record was created. A customer who opens an account in 2026 and closes it in 2036 requires records to be retained until 2046. Plan your storage architecture accordingly.
:::

With retention requirements defined, the next question is: who checks that you are actually following these rules?

## Annual System Audit Report (SAR)

Every trading member (broker) that uses approved trading software must undergo an annual system audit. The SAR (System Audit Report) is conducted by an independent auditor who examines your technology infrastructure, trading systems, risk management controls, and data security practices. The auditor must hold specific certifications, and there are strict rules about auditor rotation to prevent conflicts of interest.

| Requirement | Details |
|-------------|---------|
| Who must audit? | All trading members with approved trading software |
| Auditor certification | CISA (ISACA) \| DISA (ICAI) \| CISM (ISACA) \| CISSP (ISC2) \| GSNA (GIAC) |
| Auditor rotation | Max **3 consecutive years** per trading member, then **2-year cooling-off** |
| Independence | Must be independent of empanelled vendors and trading member partners |
| 2025 Change | SEBI/HO/MIRSD/TPD/CIR/2025/10 (Jan 2025): New technology-based monitoring framework |

:::note[Auditor Rotation Matters]
The 3-year limit followed by a 2-year cooling-off period means you cannot use the same auditor indefinitely. Start identifying your next auditor in year 2 so you are not scrambling when the rotation deadline arrives. Maintain a shortlist of at least two qualified auditing firms.
:::

In plain English: once a year, an independent, certified auditor examines your systems and produces a report. This auditor cannot be someone you have a business relationship with, and they must rotate out after three years.

Beyond the annual system audit, depository participants (DPs) have their own set of audit requirements that cover different aspects of operations.

## Depository Audit Requirements

If your broking firm is also a depository participant — meaning you offer demat accounts through CDSL (Central Depository Services Limited) or NSDL (National Securities Depository Limited) — you face additional audit obligations. These audits specifically examine how you handle demat account operations: opening accounts, processing instructions, maintaining KYC compliance, and reconciling holdings.

| Audit Type | Scope | Auditor Requirement |
|-----------|-------|---------------------|
| **Internal Audit** | Account opening, instruction processing, KYC compliance, reconciliation | CA with certificate of practice + NISM Series-VI DOCE |
| **Concurrent Audit** | Risk-prone areas: account opening, instruction slips, KYC, reconciliation | NISM DOCE certified |
| **Cyber Audit** | VAPT (Vulnerability Assessment and Penetration Testing), ISO 27001, risk management | CERT-In empanelled IS auditing organization |

In plain English: there are three layers of auditing for depository participants — an internal audit (by your own qualified staff), a concurrent audit (running alongside operations in real-time), and a cyber audit (focused on security). Each requires different certifications, and the cyber audit must be performed by an organization specifically empanelled by CERT-In (Indian Computer Emergency Response Team).

The cybersecurity audit requirements are now governed by a unified framework that SEBI introduced in 2024.

## CSCRF (Cybersecurity & Cyber Resilience Framework)

:::note[SEBI CSCRF Is the New Standard]
**SEBI CSCRF (Aug 20, 2024):** Single consolidated cybersecurity framework for all SEBI-regulated entities. Mandates: risk management, regular VAPT, ISO 27001 (larger entities), periodic cyber audits by CERT-In empanelled auditors. **Compliance deadline:** Stock Brokers — Jan 1, 2025. KRAs (KYC Registration Agencies) and DPs — extended to Apr 1, 2025.
:::

The CSCRF replaces the earlier patchwork of cybersecurity circulars with a single, consolidated framework. For engineers, the most relevant requirements are: regular vulnerability assessments, penetration testing, and maintaining ISO 27001 certification (for larger entities). Every cyber incident must be reported to CERT-In within 6 hours of detection, and the audit trail of your response must be preserved.

:::tip[ISO 27001 as a Competitive Advantage]
While ISO 27001 certification is only mandatory for larger entities under the CSCRF, obtaining it early signals to regulators and customers that your security practices are mature. It also simplifies future audits, since many of the CSCRF requirements overlap with ISO 27001 controls.
:::

Every change to a customer's KYC data — whether initiated by the customer, by operations, or by a system process — must leave a complete audit trail.

## KYC Modification Audit Trail

All changes to KYC data must be logged with: **timestamp**, **previous value**, **new value**, **user/system that made the change**, and **reason for change**. Both CDSL BO Modify and NSDL DPM (Depository Participant Module) maintain audit trails. Modification of Name/DOB at BSE (Bombay Stock Exchange) requires Unfreeze request + Protean re-verification.

:::caution[Never Overwrite — Always Append]
Your database schema for KYC data should never update fields in place. Instead, use an append-only audit log where every change creates a new record with the previous value, the new value, who made the change, and why. This pattern ensures that even if someone accidentally modifies data, the original value is always recoverable and the full history is preserved for auditors.
:::

In plain English: if a customer changes their address, your system must record what the old address was, what the new address is, who approved the change, when the change was made, and why. This applies to every single field in the KYC record.

The most time-sensitive compliance obligation is suspicious activity reporting, which has strict deadlines measured in hours.

## Suspicious Activity Reporting

When your system or your operations team identifies suspicious activity — unusual trading patterns, identity inconsistencies, or transactions that do not match the customer's declared profile — there are strict timelines for reporting it to the relevant authorities. Missing these deadlines can result in significant regulatory penalties.

| Obligation | Timeline | Regulation |
|-----------|----------|-----------|
| Suspicious activity report to exchange | Within **48 hours** of detection | SEBI (Stock Brokers) Amendment 2024 |
| Semi-annual summary report | Every 6 months | Regulation 18G(1) |
| STR (Suspicious Transaction Report) to FIU-IND (Financial Intelligence Unit - India) | Within 7 working days | PMLA, 2002 |

In plain English: if you detect something suspicious, you have 48 hours to report it to the exchange and 7 working days to file a formal STR with the FIU. The semi-annual summary report is a broader, periodic obligation that covers all suspicious activity detected during the six-month window.

:::tip[Build Automated Alerts]
Do not rely on manual detection for suspicious activity. Build automated rules that flag unusual patterns — such as a customer who declares Rs.1-5 lakh income but attempts to trade in high-value F&O (Futures and Options) contracts, or a customer whose KYC data changes significantly shortly after account activation. These automated alerts give your compliance team early warning and ensure you meet the 48-hour reporting deadline.
:::

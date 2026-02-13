---
title: Audit & Compliance
description: What to keep, how long, and who audits it — data retention requirements, audit trail specifications, and compliance reporting obligations.
---

What to keep, how long, and who audits it — data retention requirements (5-10 years depending on type), audit trail specifications, and compliance reporting obligations under SEBI, PMLA, and DPDP Act 2023.

## Data Retention Requirements

| Record Type | Min Retention | Regulation |
|-------------|---------------|-----------|
| KYC documents & customer identification records | **10 years** after business relationship ends | PMLA, 2002 |
| Transaction records | **10 years** | PMLA, 2002 |
| Complex/unusual transaction records | **10 years** | PMLA, 2002 |
| Mandatory communications & acknowledgments | **8 years** | SEBI Circular Aug 2016 |
| VIPV/Video KYC recordings | **7 years** (tamper-proof) | SEBI VIPV circular |
| Books of accounts & records | **5 years** | SEBI (Stock Brokers) Regulations |
| Communication logs | **5-8 years** (varies by type) | SEBI circulars |

## Annual System Audit Report (SAR)

| Requirement | Details |
|-------------|---------|
| Who must audit? | All trading members with approved trading software |
| Auditor certification | CISA (ISACA) \| DISA (ICAI) \| CISM (ISACA) \| CISSP (ISC2) \| GSNA (GIAC) |
| Auditor rotation | Max **3 consecutive years** per trading member, then **2-year cooling-off** |
| Independence | Must be independent of empanelled vendors and trading member partners |
| 2025 Change | SEBI/HO/MIRSD/TPD/CIR/2025/10 (Jan 2025): New technology-based monitoring framework |

## Depository Audit Requirements

| Audit Type | Scope | Auditor Requirement |
|-----------|-------|---------------------|
| **Internal Audit** | Account opening, instruction processing, KYC compliance, reconciliation | CA with certificate of practice + NISM Series-VI DOCE |
| **Concurrent Audit** | Risk-prone areas: account opening, instruction slips, KYC, reconciliation | NISM DOCE certified |
| **Cyber Audit** | VAPT, ISO 27001, risk management | CERT-In empanelled IS auditing organization |

## CSCRF (Cybersecurity & Cyber Resilience Framework)

:::note
**SEBI CSCRF (Aug 20, 2024):** Single consolidated cybersecurity framework for all SEBI-regulated entities. Mandates: risk management, regular VAPT, ISO 27001 (larger entities), periodic cyber audits by CERT-In empanelled auditors. **Compliance deadline:** Stock Brokers — Jan 1, 2025. KRAs and DPs — extended to Apr 1, 2025.
:::

## KYC Modification Audit Trail

All changes to KYC data must be logged with: **timestamp**, **previous value**, **new value**, **user/system that made the change**, and **reason for change**. Both CDSL BO Modify and NSDL DPM maintain audit trails. Modification of Name/DOB at BSE requires Unfreeze request + Protean re-verification.

## Suspicious Activity Reporting

| Obligation | Timeline | Regulation |
|-----------|----------|-----------|
| Suspicious activity report to exchange | Within **48 hours** of detection | SEBI (Stock Brokers) Amendment 2024 |
| Semi-annual summary report | Every 6 months | Regulation 18G(1) |
| STR to FIU-IND | Within 7 working days | PMLA, 2002 |

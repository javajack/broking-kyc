---
title: "Section AA: DPDP Act 2023 Consent Management — Data Flow"
description: "Where each field in Section AA: DPDP Act 2023 Consent Management flows downstream — destinations, formats, frequencies, transformations, quirks."
---

> **Why this page is structured this way:** This is the field-first view for Section <abbr title="Account Aggregator (RBI-licensed NBFC-AA)">AA</abbr>: <abbr title="Digital Personal Data Protection Act 2023 (and Rules 2025)">DPDP</abbr> Act 2023 Consent Management. Each row is one field-destination relationship. To see the same data from the destination's perspective, jump from the [atlas overview](/broking-kyc/reference/field-atlas/).

## TL;DR

- **9 unique fields** in this section.
- **13 field-destination relationships** total.
- Source-of-truth field definitions: [Master Dataset](/broking-kyc/reference/master-dataset/).

## Data flow table

Sorted by `field_id`, then `destination`.

| field_id | field_name | destination | destination_field_name | destination_format | frequency | transformation | quirks_notes | spec_source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| AA-data_retention_end_date | Data Retention End Date | back-office | data_retention_end | DATE YYYYMMDD | on-modify | derived from Y | 8 yrs per <abbr title="Securities and Exchange Board of India">SEBI</abbr> Stock Brokers Regulations; auto-purge after | SEBI Stock Brokers Regulations 2026 |
| AA-data_retention_end_date | Data Retention End Date | regulatory-reports | RetentionEndDate | DATE YYYYMMDD | on-modify | derived from Y | 8-year horizon per SEBI Stock Brokers Regulations; aligned to <abbr title="Electronic Contract Note.">ECN</abbr> archive retention | SEBI/<abbr title="Head Office (SEBI circular ID prefix)">HO</abbr>/<abbr title="Markets Intermediaries Regulation and Supervision Department (SEBI)">MIRSD</abbr>/POD-1/P/CIR/2025/94 |
| AA-dpdp_analytics_consent | DPDP Analytics Consent | back-office | dpdp_analytics_consent | CHAR(1) | on-modify | [direct] | gates analytics-event capture | DPDP Act 2023 |
| AA-dpdp_consent_date | DPDP Consent Date | back-office | dpdp_consent_dt | DATE YYYYMMDD | one-time | formatted | consent capture date | DPDP Act 2023 |
| AA-dpdp_consent_obtained | DPDP Consent Obtained | back-office | dpdp_consent_flg | CHAR(1) | one-time | [direct] | DPDP Act 2023 mandatory; appears on AOF eSign metadata | DPDP Act 2023 |
| AA-dpdp_consent_version | DPDP Consent Version | back-office | dpdp_consent_ver | VARCHAR(10) | one-time | [direct] | version of consent text; supports re-prompting on T&C update | DPDP Act 2023 |
| AA-dpdp_consent_withdrawal_date | DPDP Withdrawal Date | aml-fiu | DPDP_OVERRIDE_FLAG | DATE YYYYMMDD | on-event | [direct] | <abbr title="Prevention of Money Laundering Act 2002">PMLA</abbr> obligations override DPDP withdrawal; <abbr title="Suspicious Transaction Report">STR</abbr>/<abbr title="Cash Transaction Report">CTR</abbr> continue even after consent withdrawn | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/78 |
| AA-dpdp_consent_withdrawal_date | Consent Withdrawal Date | back-office | dpdp_with_dt | DATE YYYYMMDD | on-event | formatted | withdrawal triggers downstream data-deletion workflow | DPDP Act 2023 |
| AA-dpdp_cross_border_consent | DPDP Cross-Border Consent | back-office | dpdp_xb_consent | CHAR(1) | on-modify | [direct] | data-localisation override; rarely Y for India-only clients | DPDP Act 2023 |
| AA-dpdp_marketing_consent | DPDP Marketing Consent | back-office | dpdp_mktg_consent | CHAR(1) | on-modify | [direct] | separate granular consent; gates marketing comms | DPDP Act 2023 |
| AA-dpdp_marketing_consent | DPDP Marketing Consent | dlt-comms | PROMO_OPTIN_FLAG | CHAR(1) | on-event | [direct] | gates promotional category templates only; transactional/service templates exempt; DPDP requires granular separation | [industry typical] |
| AA-dpdp_third_party_sharing_consent | DPDP 3P Sharing Consent | back-office | dpdp_3p_consent | CHAR(1) | on-modify | [direct] | third-party sharing flag; controls API-export to partners | DPDP Act 2023 |
| AA-dpdp_third_party_sharing_consent | DPDP Third-Party Sharing Consent | regulatory-reports | none | none | on-modify | [direct] | gates whether broker can share <abbr title="Unique Client Code">UCC</abbr>-keyed margin file rows with vendor risk-platforms; consent withdrawal stops downstream flows | [industry typical] |

## Verified through

2026-05-14

---

*AI-generated and not legal advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*

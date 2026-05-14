---
title: "Section Z: Audit Trail — Data Flow"
description: "Where each field in Section Z: Audit Trail flows downstream — destinations, formats, frequencies, transformations, quirks."
---

> **Why this page is structured this way:** This is the field-first view for Section Z: Audit Trail. Each row is one field-destination relationship. To see the same data from the destination's perspective, jump from the [atlas overview](/broking-kyc/reference/field-atlas/).

## TL;DR

- **15 unique fields** in this section.
- **19 field-destination relationships** total.
- Source-of-truth field definitions: [Master Dataset](/broking-kyc/reference/master-dataset/).

## Data flow table

Sorted by `field_id`, then `destination`.

| field_id | field_name | destination | destination_field_name | destination_format | frequency | transformation | quirks_notes | spec_source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Z-approval_status | Approval Status | back-office | appr_status_cd | VARCHAR(2) | on-event | [direct] | PE/<abbr title="Authorized Person">AP</abbr>/RJ; pending blocks downstream propagation | [industry typical] |
| Z-checker_id | <abbr title="Suspicious Transaction Report">STR</abbr> Checker ID | aml-fiu | STR_CHECKER_USER | VARCHAR(50) | on-event | [direct] | Principal Officer or Designated Director who signs STR/<abbr title="Cash Transaction Report">CTR</abbr> before FINnet upload | <abbr title="Financial Intelligence Unit — India">FIU-IND</abbr>-FINGATE-USERMANUAL-REPORTS |
| Z-checker_id | Checker ID | back-office | checker_id | VARCHAR(50) | on-event | [direct] | checker user-ID; segregation-of-duties enforced | [industry typical] |
| Z-field_name | Field Name Modified | back-office | field_changed | VARCHAR(50) | on-modify | [direct] | which field was changed | [industry typical] |
| Z-investigation_status | Investigation Status | aml-fiu | INVESTIGATION_STATE | CHAR(2) | on-event | [direct] | OP/CL; retained for 5+ years post-closure; <abbr title="Financial Intelligence Unit">FIU</abbr> may re-open with follow-up request | <abbr title="Securities and Exchange Board of India">SEBI</abbr>/<abbr title="Head Office (SEBI circular ID prefix)">HO</abbr>/<abbr title="Markets Intermediaries Regulation and Supervision Department (SEBI)">MIRSD</abbr>/SECFATF/P/CIR/2024/78 |
| Z-maker_id | STR Maker ID | aml-fiu | STR_MAKER_USER | VARCHAR(50) | on-event | [direct] | user who flagged transaction; FINnet 2.0 e-sign trail captures | FIU-IND-FINGATE-USERMANUAL-REPORTS |
| Z-maker_id | Maker ID | back-office | maker_id | VARCHAR(50) | on-modify | [direct] | maker-checker mandatory; cannot be same as checker | [industry typical] |
| Z-modification_date | Modification Date | back-office | mod_ts | TIMESTAMP | on-modify | formatted | ISO 8601; chronological audit | [industry typical] |
| Z-modification_id | Modification ID | back-office | mod_id | VARCHAR(20) | on-modify | [direct] | unique key per change; maker-checker primary key | [industry typical] |
| Z-modification_source | Modification Source | back-office | mod_source_cd | VARCHAR(2) | on-modify | [direct] | CR/CO/KR/SY; <abbr title="KYC Registration Agency">KRA</abbr>-updates flagged differently from CR | [industry typical] |
| Z-modified_by_user | Modified By User | back-office | mod_user_id | VARCHAR(50) | on-modify | [direct] | maker user-ID; access-trail input | [industry typical] |
| Z-new_value | New Value | back-office | new_value | VARCHAR(500) | on-modify | [direct] | new value; appears on modification report | [industry typical] |
| Z-old_value | Old Value | back-office | old_value | VARCHAR(500) | on-modify | [direct] | previous value; retained for 8 yrs | [industry typical] |
| Z-sar_filed | STR Filed Flag | aml-fiu | STR_FILED_FLAG | CHAR(1) | on-event | [direct] | set to Y on FINnet 2.0 acknowledgement; SAR is legacy name for STR in master-dataset | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/78 |
| Z-sar_filed | SAR Filed | back-office | sar_filed_flg | CHAR(1) | on-event | [direct] | STR filed with FIU-IND; cross-reference to aml-fiu destination | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/78 |
| Z-sar_filing_date | STR Filing Date | aml-fiu | STR_FILING_DATE | DATE YYYYMMDD | on-event | formatted | STR must be filed within 7 working days of suspicion confirmation per <abbr title="Prevention of Money Laundering Act 2002">PMLA</abbr> | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/78 |
| Z-suspicious_activity_flagged | Suspicious Activity Flagged | aml-fiu | STR_TRIGGER_FLAG | CHAR(1) | on-event | [direct] | internal flag triggering STR workflow; alert-indicator engine sets Y on capital-market typologies | FIU-IND-CAPITAL-MARKET-ALERTS-2022-23 |
| Z-suspicious_activity_flagged | Suspicious Activity Flagged | back-office | sus_act_flg | CHAR(1) | on-event | [direct] | Y triggers <abbr title="Anti-Money Laundering">AML</abbr> case-file creation | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/78 |
| Z-suspicious_activity_type | Suspicious Activity Type | aml-fiu | STR_TYPE_CODE | VARCHAR(50) | on-event | lookup against R | typology code (synchronized trade / off-market transfer / mis-utilisation of client funds); per FIU alert indicators | FIU-IND-CAPITAL-MARKET-ALERTS-2022-23 |

## Verified through

2026-05-14

---

*AI-generated and not legal advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*

---
title: "Section S: KRA Submission Data — Data Flow"
description: "Where each field in Section S: KRA Submission Data flows downstream — destinations, formats, frequencies, transformations, quirks."
---

> **Why this page is structured this way:** This is the field-first view for Section S: KRA Submission Data. Each row is one field-destination relationship. To see the same data from the destination's perspective, jump from the [atlas overview](/broking-kyc/reference/field-atlas/).

## TL;DR

- **14 unique fields** in this section.
- **16 field-destination relationships** total.
- Source-of-truth field definitions: [Master Dataset](/broking-kyc/reference/master-dataset/).

## Data flow table

Sorted by `field_id`, then `destination`.

| field_id | field_name | destination | destination_field_name | destination_format | frequency | transformation | quirks_notes | spec_source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| S-kra_app_number | KRA Application Number | kra | APP_NO | VARCHAR(30) | one-time | [direct] | Unique application reference; shared across 5 KRAs via interoperability | SEBI/HO/MIRSD/SECFATF/P/CIR/2023/169 |
| S-kra_app_type | KRA Application Type | kra | APP_TYPE | CHAR(2) | one-time | [direct] | IN=Individual | [industry typical] |
| S-kra_kyc_date | KRA KYC Date | kra | KYC_DATE | DATE DD/MM/YYYY | one-time | formatted | Date of original KYC capture | SEBI/HO/MIRSD/SECFATF/P/CIR/2023/169 |
| S-kra_pos_code | KRA POS Code | fatca-crs | FATCA_POS_CODE | VARCHAR(20) | on-event | [direct] | intermediary POS code stamped on FATCA upload to KRA; allows traceback to RFI per Feb 2024 circular | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| S-kra_pos_code | KRA POS Code | kra | POS_CODE | VARCHAR(20) | one-time | [direct] | Intermediary Point of Service code assigned by KRA | [industry typical] |
| S-kra_rejection_reason | KRA Rejection Reason | kra | REJECTION_REASON | VARCHAR(200) | on-event | formatted | Free text from KRA if rejected; common: name mismatch, image quality | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/41 |
| S-kra_submission_date | KRA Submission Date | kra | SUBMISSION_DATE | DATETIME ISO 8601 | one-time | formatted | Upload within 3 working days of KYC completion | SEBI/HO/MIRSD/SECFATF/P/CIR/2023/169 |
| S-kra_submission_response | KRA Submission Response | kra | RESPONSE_JSON | JSON | on-event | [direct] | Full payload from KRA API; stored for audit | [industry typical] |
| S-kra_submission_status | KRA Submission Status | kra | SUBMISSION_STATUS | CHAR(2) | on-event | [direct] | SU/AC/RJ; KRA validates within 2 working days | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/41 |
| S-kra_validation_date | KRA Validation Date | kra | VALIDATION_DATE | DATETIME ISO 8601 | on-event | formatted | Date when KRA completed validation | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/41 |
| S-kra_validation_status | KRA Validation Status | kra | VALIDATION_STATUS | VARCHAR(20) | on-event | lookup against R | Status codes per Appendix A4: KYC Registered, On Hold, Rejected, etc | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/41 |
| S-kra_verification_date | KRA Verification Date | kra | VERIFICATION_DATE | DATE DD/MM/YYYY | one-time | formatted | Date of intermediary verification of documents | SEBI/HO/MIRSD/SECFATF/P/CIR/2023/169 |
| S-kra_verifier_designation | KRA Verifier Designation | kra | VERIFIER_DESIG | VARCHAR(50) | one-time | formatted | Designation of authorized person | SEBI/HO/MIRSD/SECFATF/P/CIR/2023/169 |
| S-kra_verifier_name | Compliance Verifier Name | aml-fiu | STR_REPORTER_NAME | VARCHAR(100) | on-event | [direct] | Principal Officer name on STR; PO must meet FIU minimum qualifications (Feb 2025 guidance) | FIU-IND-PO-GUIDANCE-25022025 |
| S-kra_verifier_name | KRA Verifier Name | kra | VERIFIER_NAME | VARCHAR(100) | one-time | formatted | Person who verified KYC at intermediary | SEBI/HO/MIRSD/SECFATF/P/CIR/2023/169 |
| S-kra_verifier_organization | KRA Verifier Organization | kra | VERIFIER_ORG | VARCHAR(100) | one-time | formatted | Intermediary name | SEBI/HO/MIRSD/SECFATF/P/CIR/2023/169 |

## Verified through

2026-05-14

---

*AI-generated and not legal advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*

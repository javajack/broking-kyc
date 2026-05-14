---
title: "Section T: CKYC Submission Data — Data Flow"
description: "Where each field in Section T: CKYC Submission Data flows downstream — destinations, formats, frequencies, transformations, quirks."
---

> **Why this page is structured this way:** This is the field-first view for Section T: CKYC Submission Data. Each row is one field-destination relationship. To see the same data from the destination's perspective, jump from the [atlas overview](/broking-kyc/reference/field-atlas/).

## TL;DR

- **12 unique fields** in this section.
- **12 field-destination relationships** total.
- Source-of-truth field definitions: [Master Dataset](/broking-kyc/reference/master-dataset/).

## Data flow table

Sorted by `field_id`, then `destination`.

| field_id | field_name | destination | destination_field_name | destination_format | frequency | transformation | quirks_notes | spec_source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| T-ckyc_branch_code | CKYC Branch Code | ckyc | BRANCH_CODE | VARCHAR(20) | one-time | [direct] | RE branch identifier | CKYC/2025/16 |
| T-ckyc_document_submission_type | CKYC Document Submission Type | ckyc | DOCUMENT_SUBMISSION_TYPE | VARCHAR(30) | one-time | [direct] | CERTIFIED_COPIES/EKYC/OFFLINE_VERIFICATION/DIGITAL_KYC/E_DOCUMENT/VKYC | CKYC/2025/16 |
| T-ckyc_fi_code | CKYC FI Code | ckyc | FI_CODE | VARCHAR(20) | one-time | [direct] | Financial institution code assigned by CERSAI; identifies RE | CKYC/2025/16 |
| T-ckyc_kin_generated | CKYC KIN Generated | ckyc | KIN | CHAR(14) | on-event | [direct] | 14-digit KIN if successful; masked with 'X' prefix in search responses post 20-Jan-2025 | CKYC/2024/04 |
| T-ckyc_reference_id | CKYC Reference ID | ckyc | REFERENCE_ID | CHAR(14) | one-time | [direct] | Unique document reference; returned in confirmed-match response (replaces KIN since 20-Jan-2025) | CKYC/2024/04 |
| T-ckyc_rejection_reason | CKYC Rejection Reason | ckyc | REJECTION_REASON | VARCHAR(200) | on-event | formatted | Common: PAN structure, image DPI/size, master-list mismatch | CKYC/2025/16 |
| T-ckyc_submission_date | CKYC Submission Date | ckyc | UPLOAD_DATE | DATETIME ISO 8601 | one-time | formatted | Date uploaded to CKYCRR; mandatory since 01-Aug-2024 via dual-upload mandate | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/79 |
| T-ckyc_submission_response | CKYC Submission Response | ckyc | RESPONSE_PAYLOAD | JSON | on-event | [direct] | Full CKYCRR API response | CKYC/2025/16 |
| T-ckyc_submission_status | CKYC Submission Status | ckyc | UPLOAD_STATUS | CHAR(2) | on-event | [direct] | SU/AC/RJ; CKYCRR returns confirmed-match or fresh-upload result | CKYC/2025/16 |
| T-ckyc_verifier_designation | CKYC Verifier Designation | ckyc | VERIFIER_DESIGNATION | VARCHAR(50) | one-time | formatted | Authorized official designation | CKYC/2025/16 |
| T-ckyc_verifier_employee_code | CKYC Verifier Employee Code | ckyc | VERIFIER_EMPLOYEE_CODE | VARCHAR(20) | one-time | [direct] | RE employee code; mandatory | CKYC/2025/16 |
| T-ckyc_verifier_name | CKYC Verifier Name | ckyc | VERIFIER_NAME | VARCHAR(100) | one-time | formatted | Person who verified KYC at RE | CKYC/2025/16 |

## Verified through

2026-05-14

---

*AI-generated and not legal advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*

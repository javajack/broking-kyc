---
title: "Section E: Address Documents (POA) — Data Flow"
description: "Where each field in Section E: Address Documents (POA) flows downstream — destinations, formats, frequencies, transformations, quirks."
---

> **Why this page is structured this way:** This is the field-first view for Section E: Address Documents (POA). Each row is one field-destination relationship. To see the same data from the destination's perspective, jump from the [atlas overview](/broking-kyc/reference/field-atlas/).

## TL;DR

- **7 unique fields** in this section.
- **20 field-destination relationships** total.
- Source-of-truth field definitions: [Master Dataset](/broking-kyc/reference/master-dataset/).

## Data flow table

Sorted by `field_id`, then `destination`.

| field_id | field_name | destination | destination_field_name | destination_format | frequency | transformation | quirks_notes | spec_source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| E-poa_address_same_as_corr | POA Address Same as Correspondence | ckyc | [same] | CHAR(1) | one-time | [direct] | CKYC industry-typical mapping | [industry typical] |
| E-poa_address_same_as_corr | POA Address Same as Correspondence | kra | POA_ADDR_SAME | CHAR(1) | on-modify | [direct] | If N, KRA records discrepancy reason | [industry typical] |
| E-poa_document_image | POA Document Image | ckyc | ADDRESS_PROOF_IMAGE | BLOB | one-time | [direct] | 150-200 DPI; max 350kb (individual) | CKYC/2025/16 |
| E-poa_document_image | POA Document Image | kra | POA_IMAGE | BLOB | on-modify | [direct] | JPEG/PNG/PDF max 2MB | [industry typical] |
| E-poa_document_number | POA Document Number | back-office | poa_doc_no | VARCHAR(30) | one-time | [direct] | 8-yr retention | [industry typical] |
| E-poa_document_number | POA Document Number | ckyc | ADDRESS_PROOF_NO | VARCHAR(30) | one-time | uppercase | CKYC validates structure per POA type | CKYC/2025/16 |
| E-poa_document_number | POA Document Number | kra | POA_DOC_NO | VARCHAR(30) | on-modify | uppercase | Format depends on POA type | [industry typical] |
| E-poa_expiry_date | POA Expiry Date | back-office | poa_exp_dt | DATE YYYYMMDD | on-modify | formatted | for Passport/DL | [industry typical] |
| E-poa_expiry_date | POA Expiry Date | ckyc | ADDRESS_PROOF_EXPIRY | DATE DD-MM-YYYY | one-time | formatted | Utility bill: <2 months old; Bank stmt: <3 months | CKYC/2025/16 |
| E-poa_expiry_date | POA Expiry Date | kra | POA_EXPIRY_DATE | DATE DD/MM/YYYY | on-modify | formatted | Conditional for Passport, DL | [industry typical] |
| E-poa_issue_date | POA Issue Date | ckyc | ADDRESS_PROOF_ISSUE_DATE | DATE DD-MM-YYYY | one-time | formatted | CKYC checks validity-window for time-bounded POAs | CKYC/2025/16 |
| E-poa_issue_date | POA Issue Date | kra | POA_ISSUE_DATE | DATE DD/MM/YYYY | on-modify | formatted | Optional | [industry typical] |
| E-poa_type | POA Type | back-office | poa_type_cd | VARCHAR(2) | one-time | [direct] | POA code-table | [industry typical] |
| E-poa_type | POA Document Type Code | bse-ucc | POA_TYPE | CHAR(2) | one-time | [direct] | POA code; required in onboarding upload | BSE/20240223-42 |
| E-poa_type | POA Type | ckyc | ADDRESS_PROOF_TYPE | CHAR(2) | one-time | lookup against R | CERSAI POA codes; revised list for foreign nationals | CKYC/2025/03_Revised |
| E-poa_type | POA Type | kra | POA_TYPE | CHAR(2) | on-modify | lookup against R | POA code table A-Z per Appendix A3 | [industry typical] |
| E-poa_type | POA Document Type Code | mcx-ucc | POA_TYPE | CHAR(2) | one-time | [direct] | POA code; required in BO file upload | MCX/TECH/394/2023 |
| E-poa_type | POA Document Type Code | nse-ucc | POA_TYPE | CHAR(2) | one-time | [direct] | POA code; transmitted with KYC bundle | NSE/ISC/61817 |
| E-poa_verified_from_issuer | POA Verified Flag | ckyc | ADDRESS_VERIFIED | CHAR(1) | one-time | [direct] | CKYC mandatory | CKYC/2025/16 |
| E-poa_verified_from_issuer | POA Verified Flag | kra | POA_VERIFIED | CHAR(1) | on-modify | [direct] | Y/N; mandatory | SEBI/HO/MIRSD/SECFATF/P/CIR/2023/169 |

## Verified through

2026-05-14

---

*AI-generated and not legal advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*

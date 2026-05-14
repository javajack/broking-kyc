---
title: "Section D: Identity Documents (POI) — Data Flow"
description: "Where each field in Section D: Identity Documents (POI) flows downstream — destinations, formats, frequencies, transformations, quirks."
---

> **Why this page is structured this way:** This is the field-first view for Section D: Identity Documents (POI). Each row is one field-destination relationship. To see the same data from the destination's perspective, jump from the [atlas overview](/broking-kyc/reference/field-atlas/).

## TL;DR

- **7 unique fields** in this section.
- **21 field-destination relationships** total.
- Source-of-truth field definitions: [Master Dataset](/broking-kyc/reference/master-dataset/).

## Data flow table

Sorted by `field_id`, then `destination`.

| field_id | field_name | destination | destination_field_name | destination_format | frequency | transformation | quirks_notes | spec_source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| D-poi_document_image | POI Document Image | ckyc | IDENTITY_PROOF_IMAGE | BLOB | one-time | [direct] | <abbr title="Central KYC (records registry)">CKYC</abbr>: 150-200 DPI, max 350kb individual; .tif/.tiff/.pdf/.jpeg/.jpg | CKYC/2025/16 |
| D-poi_document_image | POI Document Image | kra | POI_IMAGE | BLOB | on-modify | [direct] | <abbr title="KYC Registration Agency">KRA</abbr> stores scanned doc; JPEG/PNG/PDF max 2MB | [industry typical] |
| D-poi_document_number | POI Document Number | back-office | poi_doc_no | VARCHAR(30) | one-time | [direct] | retained per <abbr title="Securities and Exchange Board of India">SEBI</abbr> 8-yr rule | [industry typical] |
| D-poi_document_number | POI Document Number | ckyc | IDENTITY_PROOF_NO | VARCHAR(30) | one-time | uppercase | Aadhaar last-4 only when poi_type=E per UIDAI masking | CKYC/2025/16 |
| D-poi_document_number | POI Document Number | kra | POI_DOC_NO | VARCHAR(30) | on-modify | uppercase | Format depends on poi_type; <abbr title="Permanent Account Number">PAN</abbr> \[A-Z\]{5}\d{4}\[A-Z\] | [industry typical] |
| D-poi_expiry_date | POI Expiry Date | back-office | poi_exp_dt | DATE YYYYMMDD | on-modify | formatted | for Passport/DL; triggers ovd-re-fetch reminder | [industry typical] |
| D-poi_expiry_date | POI Expiry Date | ckyc | IDENTITY_PROOF_EXPIRY | DATE DD-MM-YYYY | one-time | formatted | CKYC validates expiry for time-bounded OVDs | CKYC/2025/16 |
| D-poi_expiry_date | POI Expiry Date | kra | POI_EXPIRY_DATE | DATE DD/MM/YYYY | on-modify | formatted | Conditional for Passport, DL | [industry typical] |
| D-poi_issue_date | POI Issue Date | ckyc | IDENTITY_PROOF_ISSUE_DATE | DATE DD-MM-YYYY | one-time | formatted | CKYC optional | CKYC/2020/04 |
| D-poi_issue_date | POI Issue Date | kra | POI_ISSUE_DATE | DATE DD/MM/YYYY | on-modify | formatted | Optional | [industry typical] |
| D-poi_issuing_authority | POI Issuing Authority | ckyc | IDENTITY_ISSUING_AUTHORITY | VARCHAR(50) | one-time | formatted | CKYC field for non-Indian govt docs and foreign national OVDs | CKYC/2025/03_Revised |
| D-poi_issuing_authority | POI Issuing Authority | kra | POI_ISSUE_AUTH | VARCHAR(50) | on-modify | formatted | Optional | [industry typical] |
| D-poi_type | POI Type | back-office | poi_type_cd | VARCHAR(2) | one-time | [direct] | POI code-table; appears on AOF retention | [industry typical] |
| D-poi_type | POI Document Type Code | bse-ucc | POI_TYPE | CHAR(2) | one-time | [direct] | POI code transmitted in revised <abbr title="Unique Client Code">UCC</abbr> | <abbr title="BSE Limited (formerly Bombay Stock Exchange)">BSE</abbr>/20240223-42 |
| D-poi_type | POI Type | ckyc | IDENTITY_PROOF_TYPE | CHAR(2) | one-time | lookup against R | <abbr title="Central Registry of Securitisation Asset Reconstruction and Security Interest of India">CERSAI</abbr> POI code list; permitted OVDs per CKYC/2025/16 data hygiene | CKYC/2025/16 |
| D-poi_type | POI Type | kra | POI_TYPE | CHAR(2) | on-modify | lookup against R | POI code table A-Z per Appendix A2 | [industry typical] |
| D-poi_type | POI Document Type Code | mcx-ucc | POI_TYPE | CHAR(2) | one-time | [direct] | POI code; mandatory in pipe-delimited record | <abbr title="Multi Commodity Exchange of India">MCX</abbr>/TECH/394/2023 |
| D-poi_type | POI Document Type Code | nse-ucc | POI_TYPE | CHAR(2) | one-time | [direct] | Aadhaar(E)/PAN(D)/Passport(A)/Voter(B) etc.; transmitted with <abbr title="Know Your Customer (process).">KYC</abbr> bundle | <abbr title="National Stock Exchange of India">NSE</abbr>/<abbr title="Investor Service Centre.">ISC</abbr>/61817 |
| D-poi_verified_from_issuer | POI Verified from Issuer | back-office | poi_ver_flg | CHAR(1) | one-time | [direct] | audit trail; required for KRA submission | [industry typical] |
| D-poi_verified_from_issuer | POI Verified Flag | ckyc | IDENTITY_VERIFIED | CHAR(1) | one-time | [direct] | CKYC mandatory; captured at upload | CKYC/2025/16 |
| D-poi_verified_from_issuer | POI Verified Flag | kra | POI_VERIFIED | CHAR(1) | on-modify | [direct] | Y/N; KRA cross-references with verification source | SEBI/<abbr title="Head Office (SEBI circular ID prefix)">HO</abbr>/<abbr title="Markets Intermediaries Regulation and Supervision Department (SEBI)">MIRSD</abbr>/SECFATF/P/CIR/2023/169 |

## Verified through

2026-05-14

---

*AI-generated and not legal advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*

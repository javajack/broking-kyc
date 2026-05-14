---
title: "Section P: Consent & Declarations — Data Flow"
description: "Where each field in Section P: Consent & Declarations flows downstream — destinations, formats, frequencies, transformations, quirks."
---

> **Why this page is structured this way:** This is the field-first view for Section P: Consent & Declarations. Each row is one field-destination relationship. To see the same data from the destination's perspective, jump from the [atlas overview](/broking-kyc/reference/field-atlas/).

## TL;DR

- **17 unique fields** in this section.
- **24 field-destination relationships** total.
- Source-of-truth field definitions: [Master Dataset](/broking-kyc/reference/master-dataset/).

## Data flow table

Sorted by `field_id`, then `destination`.

| field_id | field_name | destination | destination_field_name | destination_format | frequency | transformation | quirks_notes | spec_source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| P-consent_electronic_communication | Consent Electronic Communication | back-office | e_comm_consent | CHAR(1) | on-modify | [direct] | Y required for ECN dispatch; SMS/email mandatory per Dec 2024 | SEBI Dec 3, 2024 SMS/Email mandate |
| P-consent_electronic_communication | Electronic Communication Consent | dlt-comms | ECN_CONSENT | CHAR(1) | on-event | [direct] | required for e-contract notes and e-statements over email; if N, only physical mode permitted | SEBI/HO/MIRSD/POD-1/P/CIR/2025/94 |
| P-consent_email_mobile_validation | KRA Validation SMS/Email Consent | dlt-comms | KRA_VALIDATION_CONSENT | CHAR(1) | on-event | [direct] | KRA fires SMS/email to validate registered mobile/email; without consent, KRA cannot validate; blocks KYC | SEBI/HO/MIRSD/POD-1/P/CIR/2025/94 |
| P-consent_kyc_data_sharing | Consent KYC Data Sharing | back-office | kyc_share_consent | CHAR(1) | one-time | [direct] | Y required to upload to KRA/CKYC; rejection blocks ACTIVE flip | [industry typical] |
| P-declaration_date | Declaration Date | back-office | decl_date | DATE YYYYMMDD | one-time | formatted | appears on AOF Page 1; retained | [industry typical] |
| P-declaration_place | Declaration Place | back-office | decl_place | VARCHAR(50) | one-time | [direct] | city of declaration; required on AOF | [industry typical] |
| P-esign_certificate_serial | E-Sign Certificate Serial | contract-notes | BrokerDSCSerial | VARCHAR(50) | on-trade | [direct] | DSC class-3 serial of broker's authorised signatory; embedded in PDF signature dictionary | NSE/INSP/61999 |
| P-esign_document_hash | eSign Document Hash | back-office | esign_doc_hash | CHAR(64) | one-time | [direct] | SHA-256 of signed AOF; tamper-evidence | [industry typical] |
| P-esign_document_hash | Signed Document Hash | contract-notes | ECNDocHash | CHAR(64) | on-trade | [direct] | SHA-256 hash of ECN PDF body included in DSC signature; preserved-channel proof requires hash retention | NSE/INSP/52604 |
| P-esign_mode | eSign Mode | back-office | esign_mode_cd | VARCHAR(2) | one-time | [direct] | AO/BI/WS; audit trail | [industry typical] |
| P-esign_mode | E-Sign Mode | contract-notes | SignerMode | CHAR(2) | on-trade | [direct] | AO=Aadhaar OTP / BI=Biometric / WS=Wet; relates to onboarding e-sign not per-trade DSC | [industry typical] |
| P-esign_signed_document_url | Signed Document URL | contract-notes | ECNArchiveURL | VARCHAR(500) | on-trade | [direct] | secure archive URL with 5+ year retention; tamper-proof object store | NSE/INSP/61999 |
| P-esign_timestamp | eSign Timestamp | back-office | esign_ts | TIMESTAMP | one-time | formatted | ISO 8601; appears on signed AOF metadata | [industry typical] |
| P-esign_timestamp | E-Sign Timestamp | contract-notes | DSCSignTimestamp | TIMESTAMP ISO 8601 | on-trade | formatted | RFC3161 timestamp from TSA; ECN dispatch SLA 24h from trade execution | NSE/INSP/61999 |
| P-esign_transaction_id | eSign Transaction ID | back-office | esign_txn_id | VARCHAR(50) | one-time | [direct] | AOF eSign txn ID; retained for 8-yr audit | [industry typical] |
| P-rdd_commodity_acknowledged | Commodity Risk Disclosure Acknowledgement | contract-notes | RDDCOMRef | VARCHAR(50) | on-trade | [direct] | reference number/timestamp prints on commodity ECN; mandatory if L04=Y | MCXCCL/RISK/184/2025 |
| P-rdd_fno_acknowledged | F&O Risk Disclosure Acknowledgement | contract-notes | RDDFNORef | VARCHAR(50) | on-trade | [direct] | reference number/timestamp of F&O RDD prints on F&O ECN; mandatory if L02=Y | NSE/INSP/61999 |
| P-running_account_authorization | Running Account Authorization | back-office | ras_auth_flg | CHAR(1) | on-modify | [direct] | Y allows broker to retain funds within RAS framework | SEBI/HO/MIRSD/POD-1/P/CIR/2023/193 |
| P-running_account_authorization | Running Account Authorization | contract-notes | RAAuthFlag | CHAR(1) | on-trade | [direct] | signed running-account authorization is precondition for retaining client funds beyond settlement date | SEBI/HO/MIRSD/MIRSD-PoD1/P/CIR/2023/197 |
| P-running_account_settlement_freq | Running Account Settlement Frequency | back-office | ras_freq_cd | VARCHAR(2) | on-modify | [direct] | Q1/Q2/M; drives quarterly or monthly RAS sweep schedule | SEBI/HO/MIRSD/POD-1/P/CIR/2023/193 |
| P-running_account_settlement_freq | Running A/c Settlement Freq | dlt-comms | RAS_FREQ_VAR | CHAR(2) | on-event | [direct] | 30-day inactive trigger SMS per SEBI Jan 2025; settlement-completion SMS uses this code for narrative | SEBI/HO/MIRSD/MIRSD-PoD1/P/CIR/2025/1 |
| P-tariff_sheet_acknowledged | Tariff Sheet Acknowledged | back-office | tariff_ack_flg | CHAR(1) | one-time | [direct] | brokerage and charges schedule; appears on contract-note disclosure | [industry typical] |
| P-tariff_sheet_acknowledged | Tariff Sheet Acknowledgement | contract-notes | none | none | on-trade | [direct] | brokerage rate-card reference; drives derived brokerage on each trade; mismatch attracts SCORES | NSE/INSP/61999 |
| P-terms_conditions_accepted | T&C Accepted | back-office | tc_accepted_flg | CHAR(1) | one-time | [direct] | MITC and broker T&C accepted; eSigned copy retained 8yrs | [industry typical] |

## Verified through

2026-05-14

---

*AI-generated and not legal advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*

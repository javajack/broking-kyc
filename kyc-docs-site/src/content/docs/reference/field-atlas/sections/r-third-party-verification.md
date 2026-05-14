---
title: "Section R: Third-Party Verification Results — Data Flow"
description: "Where each field in Section R: Third-Party Verification Results flows downstream — destinations, formats, frequencies, transformations, quirks."
---

> **Why this page is structured this way:** This is the field-first view for Section R: Third-Party Verification Results. Each row is one field-destination relationship. To see the same data from the destination's perspective, jump from the [atlas overview](/broking-kyc/reference/field-atlas/).

## TL;DR

- **2 unique fields** in this section.
- **2 field-destination relationships** total.
- Source-of-truth field definitions: [Master Dataset](/broking-kyc/reference/master-dataset/).

## Data flow table

Sorted by `field_id`, then `destination`.

| field_id | field_name | destination | destination_field_name | destination_format | frequency | transformation | quirks_notes | spec_source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| R-kra_email_validated | KRA Email Validated | dlt-comms | KRA_EMAIL_VALID_FLAG | CHAR(1) | on-event | [direct] | flag set after KRA-issued email link/OTP validated | SEBI/HO/MIRSD/POD-1/P/CIR/2025/94 |
| R-kra_mobile_validated | KRA Mobile Validated | dlt-comms | KRA_MOBILE_VALID_FLAG | CHAR(1) | on-event | [direct] | flag set after KRA-issued OTP SMS validated by client; KRA blocks validation if mobile/email unvalidated | SEBI/HO/MIRSD/POD-1/P/CIR/2025/94 |

## Verified through

2026-05-14

---

*AI-generated and not legal advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*

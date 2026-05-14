---
title: "Computed / Derived — surveillance — Data Flow"
description: "Where each field in Computed / Derived — surveillance flows downstream — destinations, formats, frequencies, transformations, quirks."
---

> **Why this page is structured this way:** This is the field-first view for the computed/derived `[surveillance]` pseudo-section. These fields don't exist at KYC onboarding time; they're produced by operations (trade execution, margin computation, settlement files, etc.). To see the same data from the destination's perspective, jump from the [atlas overview](/broking-kyc/reference/field-atlas/).

## TL;DR

- **2 unique fields** in this section.
- **2 field-destination relationships** total.

## Data flow table

Sorted by `field_id`, then `destination`.

| field_id | field_name | destination | destination_field_name | destination_format | frequency | transformation | quirks_notes | spec_source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| surv-gsm_esm_asm_flag | GSM/ESM/ASM Stage Flag | regulatory-reports | SurvFlag | CHAR(4) | daily | lookup against R | drives penny-stock audit triggers; reported in surveillance file; client-level monitoring | NSE/SURV/67801 |
| surv-position_limit_utilisation | Position Limit Utilisation | regulatory-reports | PositionLimitPct | NUMBER(5,2) | daily | derived from Y | client-level MWPL utilisation; risk-reduction-mode at 90% TM/CM level | NCL/CMPT/61801 |

## Verified through

2026-05-14

---

*AI-generated and not legal advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*

---
title: "Computed / Derived — surveillance — Data Flow"
description: "Where each field in Computed / Derived — surveillance flows downstream — destinations, formats, frequencies, transformations, quirks."
---

> **Why this page is structured this way:** This is the field-first view for the computed/derived `[surveillance]` pseudo-section. These fields don't exist at <abbr title="Know Your Customer (process).">KYC</abbr> onboarding time; they're produced by operations (trade execution, margin computation, settlement files, etc.). To see the same data from the destination's perspective, jump from the [atlas overview](/broking-kyc/reference/field-atlas/).

## TL;DR

- **2 unique fields** in this section.
- **2 field-destination relationships** total.

## Data flow table

Sorted by `field_id`, then `destination`.

| field_id | field_name | destination | destination_field_name | destination_format | frequency | transformation | quirks_notes | spec_source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| surv-gsm_esm_asm_flag | <abbr title="Graded Surveillance Measure">GSM</abbr>/<abbr title="Enhanced Surveillance Measure">ESM</abbr>/<abbr title="Additional Surveillance Measure">ASM</abbr> Stage Flag | regulatory-reports | SurvFlag | CHAR(4) | daily | lookup against R | drives penny-stock audit triggers; reported in surveillance file; client-level monitoring | <abbr title="National Stock Exchange of India">NSE</abbr>/SURV/67801 |
| surv-position_limit_utilisation | Position Limit Utilisation | regulatory-reports | PositionLimitPct | NUMBER(5,2) | daily | derived from Y | client-level <abbr title="Market Wide Position Limit">MWPL</abbr> utilisation; risk-reduction-mode at 90% <abbr title="Trading Member">TM</abbr>/<abbr title="Clearing Member">CM</abbr> level | <abbr title="NSE Clearing Limited (formerly National Securities Clearing Corporation Limited)">NCL</abbr>/CMPT/61801 |

## Verified through

2026-05-14

---

*AI-generated and not legal advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*

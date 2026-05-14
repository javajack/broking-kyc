---
title: "Section W: Minor / Joint / POA Accounts — Data Flow"
description: "Where each field in Section W: Minor / Joint / POA Accounts flows downstream — destinations, formats, frequencies, transformations, quirks."
---

> **Why this page is structured this way:** This is the field-first view for Section W: Minor / Joint / <abbr title="Power of Attorney">POA</abbr> Accounts. Each row is one field-destination relationship. To see the same data from the destination's perspective, jump from the [atlas overview](/broking-kyc/reference/field-atlas/).

## TL;DR

- **8 unique fields** in this section.
- **12 field-destination relationships** total.
- Source-of-truth field definitions: [Master Dataset](/broking-kyc/reference/master-dataset/).

## Data flow table

Sorted by `field_id`, then `destination`.

| field_id | field_name | destination | destination_field_name | destination_format | frequency | transformation | quirks_notes | spec_source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| W-conversion_to_major_done | Conversion to Major Done | back-office | conv_major_flg | CHAR(1) | on-event | [direct] | if N past majority date, freeze account per 30-day rule | [industry typical] |
| W-conversion_to_major_done | Conversion Done | rms | majority_done_flg | CHAR(1) | on-event | [direct] | N past majority freezes order entry at pre-trade | [industry typical] |
| W-date_of_majority | Date of Majority | back-office | majority_date | DATE YYYYMMDD | on-modify | derived from Y | DOB+18yr; drives 30-day conversion-to-major workflow trigger | [industry typical] |
| W-guardian_name | Guardian Name (Minor) | back-office | guardian_minor_nm | VARCHAR(100) | on-modify | [direct] | appears on minor account statement | [industry typical] |
| W-guardian_pan | Guardian <abbr title="Permanent Account Number">PAN</abbr> | back-office | guardian_minor_pan | CHAR(10) | on-modify | uppercase | required for minor ledger | [industry typical] |
| W-guardian_relationship | Guardian Relationship | back-office | guardian_rel_cd | VARCHAR(2) | on-modify | [direct] | FA/MO/CG; CG requires court-order doc | [industry typical] |
| W-holding_type | Holding Type | back-office | holding_type_cd | VARCHAR(2) | on-modify | [direct] | SI/J2/J3; J2/J3 trigger 2nd/3rd holder ledger logic | [industry typical] |
| W-holding_type | Holding Type | contract-notes | HoldingPattern | CHAR(2) | on-trade | [direct] | SI/J2/J3 prints on <abbr title="Electronic Contract Note.">ECN</abbr> header; joint ECN routed to all holders | [industry typical] |
| W-is_minor_account | Minor Account Flag | back-office | minor_flg | CHAR(1) | on-modify | derived from Y | derived from DOB<18; restricts to delivery-only | [industry typical] |
| W-is_minor_account | Minor Account Flag | contract-notes | MinorFlag | CHAR(1) | on-trade | [direct] | minor restricted to delivery only; F&O/intraday trades rejected upstream | [industry typical] |
| W-is_minor_account | Minor Account Flag | rms | minor_block_flg | CHAR(1) | on-modify | derived from Y | minor flag blocks F&O/intraday at pre-trade pipeline | [industry typical] |
| W-operation_mode | Operation Mode | back-office | op_mode_cd | VARCHAR(2) | on-modify | [direct] | ES/AS/JO; drives signature-verification rule | [industry typical] |

## Verified through

2026-05-14

---

*AI-generated and not legal advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*

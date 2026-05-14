---
title: "Computed / Derived — reporting — Data Flow"
description: "Where each field in Computed / Derived — reporting flows downstream — destinations, formats, frequencies, transformations, quirks."
---

> **Why this page is structured this way:** This is the field-first view for the computed/derived `[reporting]` pseudo-section. These fields don't exist at <abbr title="Know Your Customer (process).">KYC</abbr> onboarding time; they're produced by operations (trade execution, margin computation, settlement files, etc.). To see the same data from the destination's perspective, jump from the [atlas overview](/broking-kyc/reference/field-atlas/).

## TL;DR

- **4 unique fields** in this section.
- **4 field-destination relationships** total.

## Data flow table

Sorted by `field_id`, then `destination`.

| field_id | field_name | destination | destination_field_name | destination_format | frequency | transformation | quirks_notes | spec_source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| rep-gst_monthly_return | GST Monthly Return | regulatory-reports | GSTR3B | NUMBER(18,2) | on-event | derived from Y | monthly cadence; GSTR-1 + GSTR-3B; brokers register GSTIN per state of supply | <abbr title="Securities and Exchange Board of India">SEBI</abbr>/<abbr title="Head Office (SEBI circular ID prefix)">HO</abbr>/<abbr title="Markets Intermediaries Regulation and Supervision Department (SEBI)">MIRSD</abbr>/POD-1/P/CIR/2025/94 |
| rep-sebi_turnover_fee_halfyear | SEBI Turnover Fee Half-Yearly | regulatory-reports | SEBIHYFee | NUMBER(18,2) | on-event | derived from Y | half-yearly cadence; half-year ending 30 Sep / 31 Mar; Schedule <abbr title="—">III</abbr> SEBI Stock Brokers Regs | SEBI/HO/MIRSD/POD-1/P/CIR/2025/94 |
| rep-stamp_duty_monthly | Stamp Duty Monthly Remittance | regulatory-reports | StampDutyRemittance | NUMBER(18,2) | on-event | derived from Y | monthly cadence per state; <abbr title="Clearing Corporation (NCL, ICCL, MCXCCL — context-dependent).">CC</abbr> centralised collection since Jul-2020 under amended Indian Stamp Rules | <abbr title="National Stock Exchange of India">NSE</abbr>/INSP/61999 |
| rep-stt_monthly_remittance | STT Monthly Remittance | regulatory-reports | STTRemittance | NUMBER(18,2) | on-event | derived from Y | monthly cadence; collected daily, deposited monthly per IT Act Section 104 | NSE/INSP/61999 |

## Verified through

2026-05-14

---

*AI-generated and not legal advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*

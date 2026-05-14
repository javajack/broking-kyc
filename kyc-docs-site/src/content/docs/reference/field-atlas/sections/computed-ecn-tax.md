---
title: "Computed / Derived — ecn-tax — Data Flow"
description: "Where each field in Computed / Derived — ecn-tax flows downstream — destinations, formats, frequencies, transformations, quirks."
---

> **Why this page is structured this way:** This is the field-first view for the computed/derived `[ecn-tax]` pseudo-section. These fields don't exist at <abbr title="Know Your Customer (process).">KYC</abbr> onboarding time; they're produced by operations (trade execution, margin computation, settlement files, etc.). To see the same data from the destination's perspective, jump from the [atlas overview](/broking-kyc/reference/field-atlas/).

## TL;DR

- **5 unique fields** in this section.
- **5 field-destination relationships** total.

## Data flow table

Sorted by `field_id`, then `destination`.

| field_id | field_name | destination | destination_field_name | destination_format | frequency | transformation | quirks_notes | spec_source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| tax-stt_buy_intraday | STT Buy Intraday | contract-notes | STT_Buy_Intra | NUMBER(15,2) | on-trade | derived from Y | 0.025% on sell-side intraday delivery / 0.1% on delivery; rate per Finance Act, computed by <abbr title="Clearing Corporation (NCL, ICCL, MCXCCL — context-dependent).">CC</abbr> | <abbr title="National Stock Exchange of India">NSE</abbr>/INSP/61999 |
| tax-stt_ctt | Commodity Transaction Tax | contract-notes | CTT | NUMBER(15,2) | on-trade | derived from Y | <abbr title="Multi Commodity Exchange of India">MCX</abbr> non-agri commodities sell-side; rate per Finance Act | NSE/INSP/61999 |
| tax-stt_delivery | STT Delivery | contract-notes | STT_Delivery | NUMBER(15,2) | on-trade | derived from Y | both buy and sell side delivery; rate per Finance Act | NSE/INSP/61999 |
| tax-stt_fno_futures | STT F&O Futures | contract-notes | STT_Futures | NUMBER(15,2) | on-trade | derived from Y | sell-side futures STT; rate per Finance Act | NSE/INSP/61999 |
| tax-stt_fno_options | STT F&O Options | contract-notes | STT_Options | NUMBER(15,2) | on-trade | derived from Y | sell-side options STT on premium; exercise STT on intrinsic value; rate per Finance Act | NSE/INSP/61999 |

## Verified through

2026-05-14

---

*AI-generated and not legal advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*

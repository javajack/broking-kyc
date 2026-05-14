---
title: "Computed / Derived — dmf — Data Flow"
description: "Where each field in Computed / Derived — dmf flows downstream — destinations, formats, frequencies, transformations, quirks."
---

> **Why this page is structured this way:** This is the field-first view for the computed/derived `[dmf]` pseudo-section. These fields don't exist at <abbr title="Know Your Customer (process).">KYC</abbr> onboarding time; they're produced by operations (trade execution, margin computation, settlement files, etc.). To see the same data from the destination's perspective, jump from the [atlas overview](/broking-kyc/reference/field-atlas/).

## TL;DR

- **8 unique fields** in this section.
- **8 field-destination relationships** total.

## Data flow table

Sorted by `field_id`, then `destination`.

| field_id | field_name | destination | destination_field_name | destination_format | frequency | transformation | quirks_notes | spec_source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| dmf-amg18_collateral_release_reason | Collateral Release Reason Code | regulatory-reports | ReleaseReasonCode | VARCHAR(50) | daily | lookup against R | <abbr title="Trading Member">TM</abbr>-wise reason codes per Section G of <abbr title="Multi Commodity Exchange Clearing Corporation Limited">MCXCCL</abbr>/RISK master: unpaid securities/<abbr title="Margin Trading Facility">MTF</abbr>, statutory levies, brokerage, <abbr title="Depository Participant">DP</abbr> charges | MCXCCL/MEM/216/2023 |
| dmf-cash_collateral | Cash Collateral | regulatory-reports | CashCollateral | NUMBER(15,2) | daily | [direct] | client cash deposited with <abbr title="Clearing Corporation (NCL, ICCL, MCXCCL — context-dependent).">CC</abbr> via TM upstream; column in MG-18 client-collateral file | <abbr title="NSE Clearing Limited (formerly National Securities Clearing Corporation Limited)">NCL</abbr>/CMPT/67751 |
| dmf-clearing_member_code | Clearing Member Code | regulatory-reports | CMCode | VARCHAR(10) | daily | [direct] | <abbr title="Clearing Member">CM</abbr>-level identifier in MGCM/AMGCM file naming | NCL/CMPT/56502 |
| dmf-file_name | MG-12 File Name | regulatory-reports | MG12FileName | VARCHAR(80) | daily | formatted | NSE_FO_MG12_<member>_DDMMYYYY.csv.gz per CC nomenclature; CM segment uses NCL_CM_MG12 | NCL/CMPT/56502 |
| dmf-non_cash_collateral | Non-Cash Collateral | regulatory-reports | NonCashCollateral | NUMBER(15,2) | daily | derived from Y | FDR + BG funded + MFOS + securities-pledged; 50% cash-equivalent rule at CM level | NCL/CMPT/67751 |
| dmf-report_date | Margin Report Date | regulatory-reports | ReportDate | DATE DDMMYYYY | daily | formatted | trade date for which margins computed; appears in file name suffix DDMMYYYY | NCL/CMPT/56502 |
| dmf-segment_code | Segment Code | regulatory-reports | SegmentCode | CHAR(3) | daily | [direct] | CM/FO/CD/COM; MG-13 aggregates at segment level; MG-12 at client level | NCL/CMPL/44977 |
| dmf-trading_member_code | Trading Member Code | regulatory-reports | TMCode | VARCHAR(10) | daily | [direct] | TM-level identifier in MGTM/AMGTM file naming | NCL/CMPT/56502 |

## Verified through

2026-05-14

---

*AI-generated and not legal advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*

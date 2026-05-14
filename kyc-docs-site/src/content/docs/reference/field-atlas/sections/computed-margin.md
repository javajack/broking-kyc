---
title: "Computed / Derived — margin — Data Flow"
description: "Where each field in Computed / Derived — margin flows downstream — destinations, formats, frequencies, transformations, quirks."
---

> **Why this page is structured this way:** This is the field-first view for the computed/derived `[margin]` pseudo-section. These fields don't exist at KYC onboarding time; they're produced by operations (trade execution, margin computation, settlement files, etc.). To see the same data from the destination's perspective, jump from the [atlas overview](/broking-kyc/reference/field-atlas/).

## TL;DR

- **10 unique fields** in this section.
- **10 field-destination relationships** total.

## Data flow table

Sorted by `field_id`, then `destination`.

| field_id | field_name | destination | destination_field_name | destination_format | frequency | transformation | quirks_notes | spec_source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| margin-consolidated_crystallised_obligation | Consolidated Crystallised Obligation Margin | regulatory-reports | CnsltdCrstllsdOblgtnMrg | NUMBER(15,2) | daily | derived from Y | introduced via NCL/CMPT/56502 Apr-2023; T+2 collection window per NCL/CMPL/44977 Annexure A | NCL/CMPT/56502 |
| margin-delivery_margin | Delivery Margin | regulatory-reports | DlvryMrgn | NUMBER(15,2) | daily | derived from Y | F&O delivery margin column in MG-12; commodity tender-period margin separate | NCL/CMPT/61801 |
| margin-elm | Extreme Loss Margin | regulatory-reports | LossMrgn | NUMBER(15,2) | daily | derived from Y | ELM rate from CC ELM file (ael_DDMMYYYY.csv); F&O segment | NCL/CMPT/56502 |
| margin-end_of_day_requirement | End of Day Margin Requirement | regulatory-reports | EndOfDayRqrmnt | NUMBER(15,2) | daily | derived from Y | ISO-tagged field in AMGCM/AMGTM; EOD positions + BOD margin parameters | NCL/CMPT/56502 |
| margin-shortfall_amount | Margin Shortfall Amount | regulatory-reports | Shortfall | NUMBER(15,2) | daily | derived from Y | required - collected; shortfall < 1L AND < 10% attracts 0.5% penalty; else 1.0% | NSE/INSP/64315 |
| margin-shortfall_flag | Margin Shortfall Flag | regulatory-reports | ShortfallFlag | CHAR(1) | daily | derived from Y | Y if shortfall > 0 at snapshot or EOD; combined with SA01-06 for highest-of-four penalty | NCL/CMPT/55381 |
| margin-span_margin | SPAN Margin | regulatory-reports | SPANMrgn | NUMBER(15,2) | daily | derived from Y | computed by CC SPAN engine from EOD risk parameters; reflected in AMG18 / MGCM ISO-tag | NCL/CMPT/56502 |
| margin-total_margin_collected | Total Margin Collected | regulatory-reports | MarginCollected | NUMBER(15,2) | daily | [direct] | client ledger cash + securities-pledged-with-haircut + FDR + BG funded portion | NCL/CMPT/67751 |
| margin-total_margin_required | Total Margin Required | regulatory-reports | TotalMarginRequired | NUMBER(15,2) | daily | derived from Y | MG-12 client-level total margin; per-client across CM/F&O/CD/Commodity | NCL/CMPL/44977 |
| margin-var_margin | VaR Margin | regulatory-reports | VaRMargin | NUMBER(15,2) | daily | derived from Y | CM segment; 20% upfront acceptable in lieu per NSE/INSP/45534; CC continues VaR+ELM basis | NSE/INSP/64315 |

## Verified through

2026-05-14

---

*AI-generated and not legal advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*

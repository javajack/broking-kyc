---
title: "Computed / Derived — cfr — Data Flow"
description: "Where each field in Computed / Derived — cfr flows downstream — destinations, formats, frequencies, transformations, quirks."
---

> **Why this page is structured this way:** This is the field-first view for the computed/derived `[cfr]` pseudo-section. These fields don't exist at <abbr title="Know Your Customer (process).">KYC</abbr> onboarding time; they're produced by operations (trade execution, margin computation, settlement files, etc.). To see the same data from the destination's perspective, jump from the [atlas overview](/broking-kyc/reference/field-atlas/).

## TL;DR

- **7 unique fields** in this section.
- **7 field-destination relationships** total.

## Data flow table

Sorted by `field_id`, then `destination`.

| field_id | field_name | destination | destination_field_name | destination_format | frequency | transformation | quirks_notes | spec_source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| cfr-bank_balance | Client Bank Balance | regulatory-reports | BankBalance | NUMBER(15,2) | on-event | [direct] | weekly cadence; bank-balance API; funded portion of BG only counted as cash-equivalent | <abbr title="National Stock Exchange of India">NSE</abbr>/INSP/52724 |
| cfr-cash_balance | Client Cash Balance | regulatory-reports | CashBalance | NUMBER(15,2) | on-event | [direct] | weekly cadence (Friday or first working day); migrated to daily <abbr title="Trade-date Plus N settlement">T+1</abbr> API submission Jan-2023 | NSE/INSP/55039 |
| cfr-fdr_lien_value | FDR Lien Value | regulatory-reports | FDRLienValue | NUMBER(15,2) | on-event | [direct] | weekly cadence; tenure <= 1 year, pre-terminable on demand, principal protected, no funded/non-funded facility against | <abbr title="Multi Commodity Exchange Clearing Corporation Limited">MCXCCL</abbr>/MEM/216/2023 |
| cfr-holding_value | Client Holding Statement Value | regulatory-reports | HoldingValue | NUMBER(15,2) | on-event | derived from Y | weekly cadence; aggregated client-by-client funding position; valuation per <abbr title="Clearing Corporation (NCL, ICCL, MCXCCL — context-dependent).">CC</abbr> approved-securities haircut | NSE/INSP/55039 |
| cfr-margin_funded_amount | <abbr title="Margin Trading Facility">MTF</abbr> Funded Amount | regulatory-reports | MTFAmount | NUMBER(15,2) | on-event | [direct] | weekly cadence; CSMFA pledge against client primary demat; reported per <abbr title="Unique Client Code">UCC</abbr> | <abbr title="NSE Clearing Limited (formerly National Securities Clearing Corporation Limited)">NCL</abbr>/CMPT/63669 |
| cfr-mf_pledged | Mutual Fund Pledge Value | regulatory-reports | MFOSPledge | NUMBER(15,2) | on-event | derived from Y | weekly cadence; Overnight MFOS haircut 5% effective Aug-2024; other schemes VaR with 9% min | <abbr title="Indian Clearing Corporation Limited">ICCL</abbr> 20240710-11 |
| cfr-submission_date | <abbr title="Client Funding Report.">CFR</abbr> Submission Date | regulatory-reports | SubmissionDate | DATE YYYYMMDD | on-event | formatted | weekly cadence; previously Friday; now daily T+1 API submission via ENIT-NEW-COMPLIANCE | NSE/INSP/55039 |

## Verified through

2026-05-14

---

*AI-generated and not legal advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*

---
title: "Section X: Margin Pledge & Collateral — Data Flow"
description: "Where each field in Section X: Margin Pledge & Collateral flows downstream — destinations, formats, frequencies, transformations, quirks."
---

> **Why this page is structured this way:** This is the field-first view for Section X: Margin Pledge & Collateral. Each row is one field-destination relationship. To see the same data from the destination's perspective, jump from the [atlas overview](/broking-kyc/reference/field-atlas/).

## TL;DR

- **9 unique fields** in this section.
- **20 field-destination relationships** total.
- Source-of-truth field definitions: [Master Dataset](/broking-kyc/reference/master-dataset/).

## Data flow table

Sorted by `field_id`, then `destination`.

| field_id | field_name | destination | destination_field_name | destination_format | frequency | transformation | quirks_notes | spec_source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| X-collateral_type_preference | Collateral Type Preference | back-office | coll_type_pref | VARCHAR(2) | on-modify | [direct] | CA/SE/FD/ET; drives 50%-cash-equivalent rule check | <abbr title="NSE Clearing Limited (formerly National Securities Clearing Corporation Limited)">NCL</abbr>/CMPT/65498 |
| X-collateral_type_preference | Collateral Type Preference | regulatory-reports | CollateralType | CHAR(2) | daily | [direct] | CA/SE/FD/ET drives column in MG-18 client-collateral file; 50% cash equivalent rule at <abbr title="Clearing Member">CM</abbr> level | NCL/CMPT/67751 |
| X-collateral_type_preference | Collateral Type | rms | coll_mix | VARCHAR(2) | on-modify | [direct] | 50% cash-equivalent rule applied at margin computation | NCL/CMPT/65498 |
| X-collateral_type_preference | Collateral Type Preference | rms | margin_50pct_cash_check | CHAR(1) | on-trade | derived from Y | Y/N flag; 50% cash-equivalent rule applied at order entry | NCL/CMPT/61800 |
| X-daily_margin_report_status | Daily Margin Report Status | back-office | dmr_status_cd | VARCHAR(2) | <abbr title="End Of Day">EOD</abbr> | [direct] | CO/NC; flagged if peak-margin snapshot showed shortfall | <abbr title="Securities and Exchange Board of India">SEBI</abbr>/<abbr title="Head Office (SEBI circular ID prefix)">HO</abbr>/MRD2/DCAP/CIR/P/2020/127 |
| X-daily_margin_report_status | DMR Status | rms | dmr_status | VARCHAR(2) | EOD | [direct] | NC triggers next-day pre-trade margin freeze for that client | SEBI/HO/MRD2/DCAP/CIR/P/2020/127 |
| X-mtf_agreement_date | <abbr title="Margin Trading Facility">MTF</abbr> Agreement Date | back-office | mtf_agree_dt | DATE YYYYMMDD | one-time | formatted | audit field | [industry typical] |
| X-mtf_enabled | MTF Enabled | back-office | mtf_flg | CHAR(1) | on-modify | [direct] | Y activates CSMFA pledge account routing | NCL/CMPT/63669 |
| X-mtf_enabled | MTF Enabled Flag | contract-notes | MTFFlag | CHAR(1) | on-trade | [direct] | MTF line-item handling per revised Annexure A/B; CSMFA pledge reference printed | <abbr title="National Stock Exchange of India">NSE</abbr>/INSP/61999 |
| X-mtf_enabled | MTF Enabled | rms | mtf_active | CHAR(1) | on-modify | [direct] | MTF-active client routes to CSMFA pledge envelope | NCL/CMPT/63669 |
| X-mtf_interest_rate | MTF Interest Rate | back-office | mtf_int_rate | NUMBER(5,2) | on-modify | [direct] | %pa; appears on contract-note charges breakdown | [industry typical] |
| X-mtf_limit_sanctioned | MTF Limit Sanctioned | back-office | mtf_limit | NUMBER(15,2) | on-modify | [direct] | INR; sanctioned MTF facility cap | [industry typical] |
| X-mtf_limit_sanctioned | MTF Limit Sanctioned | regulatory-reports | MTFFundedAmount | NUMBER(15,2) | daily | [direct] | funded MTF amount reported in <abbr title="Client Funding Report.">CFR</abbr>; CSMFA-pledge against client demat keyed by primary <abbr title="Beneficial Owner">BO</abbr> ID | NCL/CMPT/63669 |
| X-mtf_limit_sanctioned | MTF Limit Sanctioned | rms | mtf_cap | NUMBER(15,2) | on-modify | [direct] | hard cap on MTF exposure at order entry | [industry typical] |
| X-online_pledge_activated | Online Pledge Activated | back-office | online_pledge_flg | CHAR(1) | on-modify | [direct] | Y enables broker-portal pledge initiation | SEBI/HO/<abbr title="Markets Intermediaries Regulation and Supervision Department (SEBI)">MIRSD</abbr>/DOP/CIR/P/2020/28 |
| X-pledge_consent_obtained | Pledge Consent Obtained | back-office | pledge_consent_flg | CHAR(1) | on-modify | [direct] | Y allows margin-pledge file generation; <abbr title="One-Time Password">OTP</abbr>-confirmed | SEBI/HO/MIRSD/DOP/CIR/P/2020/28 |
| X-total_pledged_value | Total Pledged Value | back-office | pledged_value_inr | NUMBER(15,2) | EOD | derived from Y | current total with haircut applied; recomputed nightly | NCL/CMPT/65498 |
| X-total_pledged_value | Total Pledged Collateral Value | regulatory-reports | PledgedValue | NUMBER(15,2) | daily | derived from Y | net of prudential haircut per <abbr title="Clearing Corporation (NCL, ICCL, MCXCCL — context-dependent).">CC</abbr> approved-securities Annexure; haircut 40-100% phased on un-approved | <abbr title="Indian Clearing Corporation Limited">ICCL</abbr> 20240710-11 |
| X-total_pledged_value | Total Pledged Value (post-haircut) | rms | pledged_post_haircut | NUMBER(15,2) | EOD | derived from Y | post-haircut value feeds available-margin calc; recomputed at EOD parameter reload | NCL/CMPT/65498 |
| X-total_pledged_value | Total Pledged Value | rms | margin_collected_collateral | NUMBER(15,2) | daily | derived from Y | post-haircut collateral value at <abbr title="Beginning Of Day">BOD</abbr> parameter reload | NCL/CMPT/65498 |

## Verified through

2026-05-14

---

*AI-generated and not legal advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*

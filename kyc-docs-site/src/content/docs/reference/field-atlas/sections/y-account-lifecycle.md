---
title: "Section Y: Account Lifecycle & Dormancy — Data Flow"
description: "Where each field in Section Y: Account Lifecycle & Dormancy flows downstream — destinations, formats, frequencies, transformations, quirks."
---

> **Why this page is structured this way:** This is the field-first view for Section Y: Account Lifecycle & Dormancy. Each row is one field-destination relationship. To see the same data from the destination's perspective, jump from the [atlas overview](/broking-kyc/reference/field-atlas/).

## TL;DR

- **17 unique fields** in this section.
- **25 field-destination relationships** total.
- Source-of-truth field definitions: [Master Dataset](/broking-kyc/reference/master-dataset/).

## Data flow table

Sorted by `field_id`, then `destination`.

| field_id | field_name | destination | destination_field_name | destination_format | frequency | transformation | quirks_notes | spec_source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Y-account_status | Account Status | aml-fiu | ACCOUNT_STATE | CHAR(2) | on-event | [direct] | frozen/suspended accounts on UNSC match send "freeze report" to MHA via <abbr title="Financial Intelligence Unit">FIU</abbr> | <abbr title="Securities and Exchange Board of India">SEBI</abbr>/<abbr title="Head Office (SEBI circular ID prefix)">HO</abbr>/<abbr title="Markets Intermediaries Regulation and Supervision Department (SEBI)">MIRSD</abbr>/SECFATF/P/CIR/2024/78 |
| Y-account_status | Account Status | back-office | acct_status_cd | VARCHAR(2) | on-event | [direct] | AC/IN/DO/SU/CL; drives ledger eligibility for new trades | SEBI framework for automated deactivation Jul 2022 |
| Y-account_status | Account Status (Active/Inactive) | bse-ucc | UCC_STATUS_FLAG | CHAR(2) | on-event | [direct] | Uniform inactive treatment across MIIs; demat accounts freeze if <abbr title="KYC Registration Agency">KRA</abbr> flags <abbr title="Know Your Customer (process).">KYC</abbr> invalid | <abbr title="BSE Limited (formerly Bombay Stock Exchange)">BSE</abbr>/20241202-5 |
| Y-account_status | Account Status | dlt-comms | STATUS_VAR | CHAR(2) | on-event | lookup against R | populates status-change <abbr title="Short Message Service.">SMS</abbr> body ("Your a/c is now Active/Dormant/Suspended"); auto-fired on Y01 change | SEBI/HO/MIRSD/POD-1/P/CIR/2025/94 |
| Y-account_status | Account Status (Active/Inactive) | mcx-ucc | UCC_STATUS_FLAG | CHAR(2) | on-event | [direct] | Inactive = no trades 24 months on <abbr title="Multi Commodity Exchange of India">MCX</abbr> (not 12); pre-flag notification mandatory; messaging restrictions on reactivation | MCX/INSP/716/2024 |
| Y-account_status | Account Status (Active/Inactive) | nse-ucc | UCC_STATUS_FLAG | CHAR(2) | on-event | [direct] | No trades 12 months = 'Inactive'; reactivation requires fresh due diligence and <abbr title="In-Person Verification">IPV</abbr> | <abbr title="National Stock Exchange of India">NSE</abbr>/INSP/43488 |
| Y-account_status | Account Status | rms | client_status | VARCHAR(2) | on-event | [direct] | IN/DO/SU/CL blocks all new orders at pre-trade | SEBI framework for automated deactivation Jul 2022 |
| Y-account_status_date | Account Status Date | back-office | acct_status_dt | DATE YYYYMMDD | on-event | formatted | last status-change date; audit | [industry typical] |
| Y-account_status_reason | Account Status Reason | back-office | acct_status_reason | VARCHAR(100) | on-event | [direct] | free-text; preserves dormancy/suspension cause | [industry typical] |
| Y-auto_deactivation_date | Auto Deactivation Date | back-office | auto_deactiv_dt | DATE YYYYMMDD | on-event | formatted | SEBI framework for inadequate KYC | SEBI framework for automated deactivation Jul 2022 |
| Y-closure_funds_settled | Closure Funds Settled | back-office | closure_funds_flg | CHAR(1) | on-event | [direct] | must be Y before final closure | SEBI/HO/MIRSD/POD-1/P/CIR/2025/94 |
| Y-closure_request_date | Closure Request Date | back-office | closure_req_dt | DATE YYYYMMDD | on-event | formatted | client closure intimation; starts settlement-of-dues workflow | SEBI/HO/MIRSD/POD-1/P/CIR/2025/94 |
| Y-closure_request_date | Closure Request Date | back-office | closure_workflow_state | VARCHAR(2) | on-event | derived from Y | PE=Pending obligations, FS=Funds-settled, SS=Sec-settled, CL=Closed | SEBI/HO/MIRSD/POD-1/P/CIR/2025/94 |
| Y-closure_securities_settled | Closure Securities Settled | back-office | closure_secs_flg | CHAR(1) | on-event | [direct] | must be Y before final closure | SEBI/HO/MIRSD/POD-1/P/CIR/2025/94 |
| Y-days_inactive | Days Inactive | back-office | days_inactive | NUMBER(5) | <abbr title="End Of Day">EOD</abbr> | derived from Y | auto-calc; >365 typically flags dormancy | SEBI framework for automated deactivation Jul 2022 |
| Y-dormancy_declaration_date | Dormancy Declaration Date | back-office | dormancy_dt | DATE YYYYMMDD | on-event | formatted | set when inactive>12mo per broker policy | SEBI framework for automated deactivation Jul 2022 |
| Y-final_closure_date | Final Closure Date | back-office | final_close_dt | DATE YYYYMMDD | on-event | formatted | audit-retained per 8-yr SEBI rule | [industry typical] |
| Y-kyc_validity_end | KYC Validity End | aml-fiu | KYC_EXPIRY | DATE YYYYMMDD | on-event | formatted | 5-year cycle; stale KYC accounts on suspect activity trigger automatic <abbr title="Suspicious Transaction Report">STR</abbr> review | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/78 |
| Y-kyc_validity_end | KYC Validity End | back-office | kyc_valid_end | DATE YYYYMMDD | on-modify | formatted | 5-yr or risk-based; triggers re-KYC workflow at expiry | [industry typical] |
| Y-kyc_validity_start | KYC Validity Start | back-office | kyc_valid_start | DATE YYYYMMDD | on-modify | formatted | start of re-KYC cycle | [industry typical] |
| Y-last_trade_date | Last Trade Date | back-office | last_trade_dt | DATE YYYYMMDD | EOD | derived from Y | rolled forward by nightly batch; drives dormancy timer | SEBI framework for automated deactivation Jul 2022 |
| Y-next_kyc_review_date | Next KYC Review Date | back-office | next_kyc_rev_dt | DATE YYYYMMDD | on-modify | derived from Y | computed from risk-tier (2/8/10 yrs) | [industry typical] |
| Y-ovd_expiry_date | <abbr title="Officially Valid Document">OVD</abbr> Expiry Date | back-office | ovd_expiry_dt | DATE YYYYMMDD | on-modify | formatted | if Passport/DL; triggers ovd-re-fetch reminder | [industry typical] |
| Y-reactivation_fresh_kyc | Reactivation Fresh KYC | back-office | react_fresh_kyc_flg | CHAR(1) | on-event | [direct] | Y if dormant>12mo; mandates re-KYC before order entry | SEBI framework for automated deactivation Jul 2022 |
| Y-reactivation_request_date | Reactivation Request Date | back-office | react_req_dt | DATE YYYYMMDD | on-event | formatted | client-initiated reactivation trigger | SEBI framework for automated deactivation Jul 2022 |

## Verified through

2026-05-14

---

*AI-generated and not legal advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*

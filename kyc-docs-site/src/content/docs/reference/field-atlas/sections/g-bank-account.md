---
title: "Section G: Bank Account Details — Data Flow"
description: "Where each field in Section G: Bank Account Details flows downstream — destinations, formats, frequencies, transformations, quirks."
---

> **Why this page is structured this way:** This is the field-first view for Section G: Bank Account Details. Each row is one field-destination relationship. To see the same data from the destination's perspective, jump from the [atlas overview](/broking-kyc/reference/field-atlas/).

## TL;DR

- **15 unique fields** in this section.
- **83 field-destination relationships** total.
- Source-of-truth field definitions: [Master Dataset](/broking-kyc/reference/master-dataset/).

## Data flow table

Sorted by `field_id`, then `destination`.

| field_id | field_name | destination | destination_field_name | destination_format | frequency | transformation | quirks_notes | spec_source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| G-account_holder_name | Account Holder Name | back-office | acct_holder_nm | VARCHAR(100) | on-modify | [direct] | must match <abbr title="Permanent Account Number">PAN</abbr> above name-match threshold; mis-match blocks first payout | [industry typical] |
| G-account_holder_name | Bank Account Holder Name | cdsl-bo | BANK_HOLDER_NAME | CHAR(100) | on-modify | uppercase | Right-padded; must match first-holder name; mismatch flagged for compliance review | <abbr title="Central Depository Services (India) Limited">CDSL</abbr>/OPS/<abbr title="Depository Participant">DP</abbr>/SYSTM/2023/119 |
| G-account_holder_name | Account Holder Name | ckyc | ACCOUNT_HOLDER_NAME | VARCHAR(100) | one-time | formatted | <abbr title="Central KYC (records registry)">CKYC</abbr> ensures consistency with applicant name | CKYC/2025/16 |
| G-account_holder_name | Account Holder Name | kra | BANK_ACCT_HOLDER | VARCHAR(100) | on-modify | formatted | Must match PAN name; verified via penny drop | <abbr title="Securities and Exchange Board of India">SEBI</abbr>/<abbr title="Head Office (SEBI circular ID prefix)">HO</abbr>/<abbr title="Markets Intermediaries Regulation and Supervision Department (SEBI)">MIRSD</abbr>/SECFATF/P/CIR/2024/41 |
| G-account_holder_name | Bank Account Holder Name | nsdl-bo | BkAcctHldrNm | VARCHAR(100) UDiFF | on-modify | uppercase | ISO-tagged element; penny-drop verified at broker; CAS uses this for fund settlement | <abbr title="National Securities Depository Limited">NSDL</abbr>/POLICY/2024/0041 |
| G-account_number | Bank Account Number | aml-fiu | BANK_ACCOUNT_NO | VARCHAR(18) | on-event | [direct] | full account number in <abbr title="Suspicious Transaction Report">STR</abbr>/CBWTR/<abbr title="Cash Transaction Report">CTR</abbr> (<abbr title="Financial Intelligence Unit">FIU</abbr> is law-enforcement; masking not applied) | <abbr title="Financial Intelligence Unit — India">FIU-IND</abbr>-REPORTING-FORMAT-V114 |
| G-account_number | Bank Account Number | back-office | bank_acct_no | VARCHAR(18) | on-modify | [direct] | primary payout destination; <abbr title="Trade-date Plus N settlement">T+1</abbr> funds-payout target | SEBI/HO/MIRSD/POD-1/P/CIR/2025/94 |
| G-account_number | Bank Account Number | back-office | form_c_bank_book_entry | VARCHAR(50) | on-event | [direct] | Form C bank book entry per client transaction; SEBI Stock Brokers Regs | <abbr title="National Stock Exchange of India">NSE</abbr>/INSP/57394 |
| G-account_number | Bank Account Number | back-office | suspe1234n_route_flag | CHAR(1) | on-event | derived from Y | unidentified credit routed to SUSPE1234N <abbr title="Unique Client Code">UCC</abbr> on member PAN | NSE/INSP/64053 |
| G-account_number | Bank Account Number | back-office | bank_reconciliation_status | VARCHAR(2) | daily | [direct] | BA1/BA2/BA3 daily reconciliation status; T+1 holding+balance API | NSE/INSP/55039 |
| G-account_number | Bank Account Number | bse-ucc | BANK_AC_NO | VARCHAR(18) | one-time | [direct] | Up to 5 bank accounts per client (one primary); excludes <abbr title="Non-Resident External (Rupee) account">NRE</abbr>; name/PAN match against bank mandatory for <abbr title="Unified Payments Interface">UPI</abbr>-block validation | <abbr title="BSE Limited (formerly Bombay Stock Exchange)">BSE</abbr>/20231018-39 |
| G-account_number | Bank Account Number | cdsl-bo | BANK_ACCT_NO | CHAR(18) | on-modify | [direct] | Line 05 mandatory; alphanumeric; right-padded with spaces; used by issuer/RTA for direct credit per DP2026-316 | CDSL/OPS/DP/POLCY/2026/316 |
| G-account_number | Bank Account Number | ckyc | BANK_ACCOUNT_NUMBER | VARCHAR(18) | one-time | [direct] | CKYC stores in plain (encrypted in DB); per data hygiene | CKYC/2025/16 |
| G-account_number | Primary Bank Account Number | contract-notes | none | none | on-trade | [direct] | appears on running-account settlement statement, not on per-trade <abbr title="Electronic Contract Note.">ECN</abbr> body | [industry typical] |
| G-account_number | Bank Account Number | dlt-comms | ACCOUNT_LAST4 | VARCHAR(4) | on-event | truncate to N | <abbr title="Short Message Service.">SMS</abbr> shows only last 4 digits (e.g. "A/c XX1234"); <abbr title="Reserve Bank of India">RBI</abbr> masking guideline; full number never sent | [industry typical] |
| G-account_number | Bank Account Number | kra | BANK_ACCT_NO | VARCHAR(18) | on-modify | [direct] | Alphanumeric; <abbr title="KYC Registration Agency">KRA</abbr> stores masked except last 4 | [industry typical] |
| G-account_number | Bank Account Number | mcx-ucc | BANK_AC_NO | VARCHAR(18) | one-time | [direct] | Primary settlement bank account; required for fund settlement | <abbr title="Multi Commodity Exchange of India">MCX</abbr>/TECH/394/2023 |
| G-account_number | Bank Account Number | nsdl-bo | AcctNb | VARCHAR(18) UDiFF | on-modify | [direct] | ISO 20022 AcctNb element; mandatory; SPICE settlement linkage | NSDL/POLICY/2024/0131 |
| G-account_number | Bank Account Number | nse-ucc | BANK_AC_NO | VARCHAR(18) | one-time | [direct] | Primary bank account; flows to UCC for direct-payout regime per NSE/INSP/64509 (UCC-demat mapping) | NSE/INSP/64509 |
| G-account_number | Primary Bank Account Number | regulatory-reports | BankAccountNo | VARCHAR(18) | daily | [direct] | appears in bank-balance API submission and <abbr title="Client Funding Report.">CFR</abbr> holding-statement; T+1 daily push | NSE/INSP/55039 |
| G-account_number | Bank Account Number (Primary) | rms | client_bank_no | VARCHAR(18) | on-modify | [direct] | primary bank for collected-margin reconciliation; UPI-Block destination | SEBI/HO/MIRSD/POD-1/P/CIR/2024/118 |
| G-account_number | Bank Account Number | rms | margin_available | NUMBER(15,2) | on-trade | derived from Y | available margin = collected - utilized; recomputed each order | SEBI/HO/MRD2/DCAP/CIR/P/2020/127 |
| G-account_number | Bank Account Number | rms | margin_collected_cash | NUMBER(15,2) | daily | derived from Y | cash margin collected from client funds bank; <abbr title="Beginning Of Day">BOD</abbr> reload value | SEBI/HO/MIRSD/MIRSD-PoD-1/P/CIR/2023/71 |
| G-account_number | Bank Account Number | rms | cfr_funds_collected | NUMBER(15,2) | daily | derived from Y | client funds collected; T+1 holding+balance API submission (replaces weekly) | NSE/INSP/55039 |
| G-account_number | Bank Account Number | rms | cfr_funds_deployed | NUMBER(15,2) | daily | derived from Y | client funds deployed against margin | NSE/INSP/55039 |
| G-account_number | Bank Account Number | rms | cfr_funds_free | NUMBER(15,2) | daily | derived from Y | client funds free; CFR weekly aggregate uses daily values | NSE/INSP/55039 |
| G-account_number | Bank Account Number | rms | upi_block_amount | NUMBER(15,2) | on-trade | derived from Y | <abbr title="Applications Supported by Blocked Amount">ASBA</abbr>-like UPI Block amount in client bank (not pool); <abbr title="Qualified Stock Broker">QSB</abbr> mandatory Feb 2025 | SEBI/HO/MIRSD/POD-1/P/CIR/2024/118 |
| G-account_number | Bank Account Number | rms | upi_block_utilised | NUMBER(15,2) | on-trade | derived from Y | executed amount debited from block; residual auto-releases | SEBI/HO/MIRSD/POD-1/P/CIR/2024/118 |
| G-account_type | Account Type | aml-fiu | ACCOUNT_TYPE | CHAR(2) | on-event | [direct] | SB/CA/NRE/<abbr title="Non-Resident Ordinary (Rupee) account">NRO</abbr>; NRE/NRO accounts elevate scrutiny under <abbr title="Portfolio Investment Scheme (RBI / NRI)">PIS</abbr> framework | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/78 |
| G-account_type | Bank Account Type | back-office | bank_acct_type | VARCHAR(2) | on-modify | [direct] | SB/CA/NRE/NRO; NRE/NRO triggers <abbr title="Non-Resident Indian">NRI</abbr>-route fund flag | [industry typical] |
| G-account_type | Bank Account Type | bse-ucc | BANK_AC_TYPE | CHAR(2) | one-time | [direct] | NRE accounts excluded from UPI-block facility per BSE batch UCC spec | BSE/20231018-39 |
| G-account_type | Bank Account Type | cdsl-bo | BANK_ACCT_TYPE | CHAR(2) | on-modify | lookup against R | Code SB/CA/NRE/NRO; line 05; NRE/NRO triggers NRI sub-status validation | CDSL/OPS/DP/SYSTM/2023/119 |
| G-account_type | Bank Account Type | ckyc | BANK_ACCOUNT_TYPE | CHAR(2) | one-time | [direct] | CKYC code: SB/CA/NRE/NRO/OD | CKYC/2025/16 |
| G-account_type | Bank Account Type | kra | BANK_ACCT_TYPE | CHAR(2) | on-modify | [direct] | SB/CA/NRE/NRO | [industry typical] |
| G-account_type | Bank Account Type | mcx-ucc | BANK_AC_TYPE | CHAR(2) | one-time | [direct] | SB/CA for settlement | MCX/TECH/394/2023 |
| G-account_type | Bank Account Type | nsdl-bo | AcctTp | CHAR(2) UDiFF | on-modify | lookup against R | ISO 20022-style code element; NRE/NRO links to PIS account check | NSDL/POLICY/2025/0056 |
| G-account_type | Bank Account Type | nse-ucc | BANK_AC_TYPE | CHAR(2) | one-time | [direct] | SB/CA/NRE/NRO; NRE accounts excluded from UPI-block facility | NSE/<abbr title="Investor Service Centre.">ISC</abbr>/61817 |
| G-bank_account_seq | Bank Account Sequence | back-office | bank_seq | NUMBER(1) | on-modify | [direct] | 1-5; sequence number for multi-account clients | [industry typical] |
| G-bank_account_seq | Bank Account Sequence | cdsl-bo | BANK_SEQ | CHAR(1) | on-modify | [direct] | 1-5 sequence number; primary marked separately | CDSL/OPS/DP/SYSTM/2023/119 |
| G-bank_account_seq | Bank Account Sequence | nsdl-bo | BkAcctSeqNb | CHAR(1) UDiFF | on-modify | [direct] | Sequence element 1-5 | NSDL/POLICY/2025/0056 |
| G-bank_name | Bank Name | aml-fiu | BANK_NAME | VARCHAR(100) | on-event | [direct] | FINnet schema BankName element; required for CTR/CBWTR | FIU-IND-REPORTING-FORMAT-V114 |
| G-bank_name | Bank Name | back-office | bank_name | VARCHAR(100) | on-modify | [direct] | appears on payout <abbr title="National Electronic Funds Transfer">NEFT</abbr>/<abbr title="Real Time Gross Settlement">RTGS</abbr> narration | [industry typical] |
| G-bank_name | Bank Name (Payout) | cdsl-bo | BANK_NAME | CHAR(100) | on-modify | uppercase | Line 05 fixed-length; right-pad with spaces; used for dividend/interest/redemption payouts directly to <abbr title="Beneficial Owner">BO</abbr> | CDSL/OPS/DP/SYSTM/2023/119 |
| G-bank_name | Bank Name | ckyc | BANK_NAME | VARCHAR(100) | one-time | formatted | CKYC captures primary bank for identification | CKYC/2020/04 |
| G-bank_name | Bank Name | kra | BANK_NAME | VARCHAR(100) | on-modify | formatted | KRA primary bank only; multi-bank stored locally only | [industry typical] |
| G-bank_name | Bank Name (Payout) | nsdl-bo | BkNm | VARCHAR(100) UDiFF | on-modify | uppercase | ISO 20022 element; payout bank linked at BO level for corporate-action payouts | NSDL/POLICY/2024/0041 |
| G-bank_proof_type | Cash Receipt Mode (CTR) | aml-fiu | CASH_RECEIPT_MODE | CHAR(2) | on-event | [direct] | CTR threshold Rs 10L aggregate calendar-month; broker rarely accepts cash but CTR template required if so | FIU-IND-CTR-BANKING-FORMAT |
| G-bank_proof_type | Bank Proof Type | back-office | bank_proof_type | VARCHAR(2) | one-time | [direct] | <abbr title="Clearing Corporation (NCL, ICCL, MCXCCL — context-dependent).">CC</abbr>=Cancelled Cheque or BS=Bank Statement | [industry typical] |
| G-bank_proof_type | Bank Proof Type | cdsl-bo | BANK_PROOF_TYPE | CHAR(2) | one-time | lookup against R | Code CC=Cancelled Cheque, BS=Bank Statement; mandatory | CDSL/OPS/DP/SYSTM/2023/119 |
| G-bank_proof_type | Bank Proof Type | nsdl-bo | BkPrfTp | CHAR(2) UDiFF | one-time | lookup against R | Mandatory element in BO Upload | NSDL/POLICY/2025/0056 |
| G-branch_name | Branch Name | back-office | branch_name | VARCHAR(100) | on-modify | [direct] | retained for audit; not on payout narration | [industry typical] |
| G-branch_name | Bank Branch Name | cdsl-bo | BRANCH_NAME | CHAR(100) | on-modify | uppercase | Line 05; right-padded | CDSL/OPS/DP/SYSTM/2023/119 |
| G-branch_name | Branch Name | ckyc | BANK_BRANCH | VARCHAR(100) | one-time | formatted | CKYC field captures branch with primary bank | [industry typical] |
| G-branch_name | Branch Name | kra | BANK_BRANCH | VARCHAR(100) | on-modify | formatted | Optional | [industry typical] |
| G-branch_name | Bank Branch Name | nsdl-bo | BrnchNm | VARCHAR(100) UDiFF | on-modify | uppercase | ISO-tagged element | NSDL/POLICY/2024/0041 |
| G-ifsc_code | <abbr title="Indian Financial System Code.">IFSC</abbr> Code | aml-fiu | IFSC | CHAR(11) | on-event | [direct] | routing identifier; CBWTR uses IFSC for IN-leg; foreign leg uses SWIFT | FIU-IND-CBWT-FAQ |
| G-ifsc_code | IFSC Code | back-office | ifsc | CHAR(11) | on-modify | uppercase | validated regex; needed for NEFT/RTGS routing | [industry typical] |
| G-ifsc_code | IFSC Code | bse-ucc | IFSC | CHAR(11) | one-time | uppercase | Mandatory per revised UCC batch | BSE/20231018-39 |
| G-ifsc_code | IFSC Code | cdsl-bo | IFSC_CODE | CHAR(11) | on-modify | uppercase | Pattern [A-Z]{4}0[A-Z0-9]{6}; mandatory line 05; rejection on invalid IFSC | CDSL/OPS/DP/SYSTM/2023/119 |
| G-ifsc_code | IFSC Code | ckyc | IFSC_CODE | CHAR(11) | one-time | uppercase | CKYC validates against RBI IFSC master | CKYC/2025/16 |
| G-ifsc_code | IFSC Code | kra | IFSC | CHAR(11) | on-modify | uppercase | Format \[A-Z\]{4}0\[A-Z0-9\]{6} | [industry typical] |
| G-ifsc_code | IFSC Code | mcx-ucc | IFSC | CHAR(11) | one-time | uppercase | Mandatory | MCX/TECH/394/2023 |
| G-ifsc_code | IFSC Code | nsdl-bo | IFSC | CHAR(11) UDiFF | on-modify | uppercase | ISO-tagged element; validated against RBI IFSC master | NSDL/POLICY/2024/0041 |
| G-ifsc_code | IFSC Code | nse-ucc | IFSC | CHAR(11) | one-time | uppercase | 11-char IFSC; mandatory for primary bank in UCC | NSE/ISC/61817 |
| G-ifsc_code | Bank IFSC Code | regulatory-reports | IFSC | CHAR(11) | daily | uppercase | component of bank-balance API row; format [A-Z]{4}0[A-Z0-9]{6} | NSE/INSP/55039 |
| G-is_primary | Is Primary Bank Account | back-office | is_primary_flg | CHAR(1) | on-modify | [direct] | exactly one primary; primary drives default payout and 30-day refund | SEBI/HO/MIRSD/MIRSD-PoD/P/CIR/2025/04 |
| G-is_primary | Primary Bank Account Flag | bse-ucc | BANK_PRIMARY_FLAG | CHAR(1) | one-time | [direct] | Designation of one primary mandatory in revised UCC | BSE/20231018-39 |
| G-is_primary | Primary Bank Flag | cdsl-bo | PRIMARY_BANK_FLAG | CHAR(1) | on-modify | [direct] | Y/N; exactly one Y per BO; line 05; payouts default to primary | CDSL/OPS/DP/SYSTM/2023/119 |
| G-is_primary | Primary Bank Account Flag | mcx-ucc | BANK_PRIMARY_FLAG | CHAR(1) | one-time | [direct] | Primary settlement bank | MCX/TECH/394/2023 |
| G-is_primary | Primary Bank Flag | nsdl-bo | PrmryBkFlg | CHAR(1) UDiFF | on-modify | [direct] | Exactly-one-Y constraint; SPICE settlement uses primary bank | NSDL/POLICY/2024/0131 |
| G-is_primary | Primary Bank Account Flag | nse-ucc | BANK_PRIMARY_FLAG | CHAR(1) | one-time | [direct] | Exactly one Y across up to 5 accounts | NSE/ISC/61817 |
| G-is_primary | Is Primary Flag | rms | primary_bank_flg | CHAR(1) | on-modify | [direct] | only primary considered for fund-balance calculation | [industry typical] |
| G-micr_code | MICR Code | back-office | micr | CHAR(9) | on-modify | [direct] | legacy; some BOs still print on cheque-leaflet | [industry typical] |
| G-micr_code | MICR Code | cdsl-bo | MICR_CODE | CHAR(9) | on-modify | [direct] | 9-digit numeric; optional line 05; left-padded with zeros | CDSL/OPS/DP/SYSTM/2023/119 |
| G-micr_code | MICR Code | ckyc | MICR_CODE | VARCHAR(9) | one-time | [direct] | CKYC optional | CKYC/2020/04 |
| G-micr_code | MICR Code | kra | MICR | VARCHAR(9) | on-modify | [direct] | 9 digits; optional | [industry typical] |
| G-micr_code | MICR Code | nsdl-bo | MICR | CHAR(9) UDiFF | on-modify | [direct] | Optional 9-digit element | NSDL/POLICY/2024/0041 |
| G-penny_drop_date | Penny Drop Date | back-office | pd_date | DATE YYYYMMDD | on-modify | formatted | audit retention 8 yrs | [industry typical] |
| G-penny_drop_name_match_score | Penny Drop Name Match Score | back-office | pd_match_score | NUMBER(3) | on-modify | [direct] | 0-100; below threshold triggers manual review | [industry typical] |
| G-penny_drop_name_returned | Penny Drop Name Returned | back-office | pd_name_returned | VARCHAR(100) | on-modify | [direct] | preserved for <abbr title="Anti-Money Laundering">AML</abbr> re-screen workflow | [industry typical] |
| G-penny_drop_ref | Bank Reference (CCR/CTR) | aml-fiu | CCR_TRANSACTION_REF | VARCHAR(30) | on-event | [direct] | where broker receives counterfeit cash at branch; CCR filed regardless of amount per PMLR Rule 3(1)(B) | FIU-IND-PMLR-AMEND-2023-03-07 |
| G-penny_drop_ref | Penny Drop UTR | back-office | pd_utr | VARCHAR(30) | on-modify | [direct] | audit-trail UTR for first-payout dispute resolution | [industry typical] |
| G-penny_drop_status | Penny Drop Status | back-office | pd_status | VARCHAR(2) | on-modify | [direct] | S/F/P; only S allows payout activation | [industry typical] |

## Verified through

2026-05-14

---

*AI-generated and not legal advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*

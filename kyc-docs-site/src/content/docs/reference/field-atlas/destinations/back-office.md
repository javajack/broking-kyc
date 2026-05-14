---
title: "Back-office (vendor-neutral) — Fields consumed"
description: "Every field consumed by Back-office (vendor-neutral), with source section, destination format, update frequency, transformation rule, and quirks. Use this when building an integration with this destination."
---

> **Why this page is structured this way:** This is the destination-first view for Back-office (vendor-neutral). Engineers building an integration with this destination get the complete field list on one page. To see where each field originated in onboarding, follow the per-section links via the [atlas overview](/broking-kyc/reference/field-atlas/).

## TL;DR

- **237 unique fields** consumed by Back-office (vendor-neutral).
- Source spans sections: A, B, C, D, E, F, G, H, I, K, L, M, N, O, P, U, V, W, X, Y, Z, AA, AB, AC.
- **87 rows cite a public spec source**; **173** are `[industry typical]`.

## Field-destination rows

Sorted by `source_section`, then `field_id`.

| source_section | field_id | field_name | destination_field_name | destination_format | frequency | transformation | quirks_notes | spec_source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| A | A-aadhaar_number | Aadhaar Number (Masked) | aadhaar_masked | VARCHAR(12) | one-time | truncate to N | stored masked XXXX-XXXX-1234; never store full in BO ledger | [industry typical] |
| A | A-ckyc_number | CKYC Number (KIN) | ckyc_kin | CHAR(14) | one-time | [direct] | 14-digit KIN; cross-reference field for re-KYC | [industry typical] |
| A | A-ckyc_number | CKYC Number (KIN) | ckyc_xref_status | VARCHAR(2) | on-event | [direct] | CKYC submission status; 7-day window from KYC change | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/79 |
| A | A-country_of_birth | Country of Birth | country_of_birth | CHAR(2) | one-time | [direct] | needed for FATCA US-person determination | [industry typical] |
| A | A-date_of_birth | Date of Birth | dob | DATE YYYYMMDD | one-time | formatted | Age>=18 enforced at ledger creation; drives age-group risk profile | [industry typical] |
| A | A-disability_type | Disability Type | disability_type | VARCHAR(2) | one-time | [direct] | lookup against code table; conditional only | [industry typical] |
| A | A-father_spouse_flag | Father/Spouse Flag | f_or_s_flag | CHAR(1) | one-time | [direct] | F or S; required on KYC AOF header in back-office | [industry typical] |
| A | A-father_spouse_name | Father/Spouse Name | father_spouse_nm | VARCHAR(70) | one-time | [direct] | printed on AOF copy retained 8 yrs per SEBI Stock Brokers Regulations | [industry typical] |
| A | A-first_name | First Name | first_name | VARCHAR(70) | on-modify | [direct] | must match PAN; mismatch blocks ledger creation | [industry typical] |
| A | A-full_name | Full Name | client_name | VARCHAR(200) | on-modify | concat with X | concatenation of first+middle+last; used on signed ECN | [industry typical] |
| A | A-gender | Gender | gender | CHAR(1) | one-time | [direct] | M/F/T; needed for ITR Form 16A and FATCA refresh | [industry typical] |
| A | A-is_differently_abled | Differently Abled Flag | diff_abled_flg | CHAR(1) | one-time | [direct] | drives accessibility-mode contract-note dispatch | [industry typical] |
| A | A-last_name | Last Name | last_name | VARCHAR(70) | on-modify | [direct] | PAN-match strict; downstream to ITR Form 16A dispatch | [industry typical] |
| A | A-maiden_first_name | Maiden First Name | maiden_name | VARCHAR(70) | on-modify | [direct] | BSE Unfreeze process references maiden name on name-change | [industry typical] |
| A | A-marital_status | Marital Status | marital_status | CHAR(1) | on-modify | [direct] | drives name-change workflow on marriage | [industry typical] |
| A | A-middle_name | Middle Name | middle_name | VARCHAR(70) | on-modify | [direct] | null-allowed; rendered on contract note Annexure A header | [industry typical] |
| A | A-mother_name | Mother Name | mother_name | VARCHAR(70) | one-time | [direct] | transmission docs lookup uses mother name | [industry typical] |
| A | A-nationality | Nationality | nationality_code | CHAR(2) | on-modify | [direct] | ISO code; if non-IN flags FATCA reporting workflow | [industry typical] |
| A | A-pan_exempt | PAN Exempt Flag | pan_exempt_flag | CHAR(1) | one-time | [direct] | Y/N; sets PAN-exempt code in income/charges module | [industry typical] |
| A | A-pan_exempt_category | PAN Exempt Category | pan_exempt_cat | VARCHAR(2) | one-time | [direct] | lookup against govt-category code table; rare | [industry typical] |
| A | A-pan_number | PAN Number | pan_no | CHAR(10) | on-modify | uppercase | primary key in client master; drives ledger, contract notes, statements | SEBI/HO/MIRSD/POD-1/P/CIR/2025/94 |
| A | A-place_of_birth | Place of Birth | place_of_birth | VARCHAR(50) | one-time | [direct] | FATCA self-cert audit trail | [industry typical] |
| A | A-prefix | Salutation | salutation | VARCHAR(5) | on-modify | [direct] | appears on contract-note header and welcome kit | [industry typical] |
| A | A-residential_status | Residential Status | resi_status | VARCHAR(3) | on-modify | [direct] | RI/NRI/FN/PIO; NRI flag activates PIS-route ledger flags | [industry typical] |
| A | A-residential_status | Residential Status | tds_on_payout_rate | NUMBER(5,2) | on-event | lookup against R | TDS on NRI fund-payout per IT Act sec 195; resident no TDS at broker level | Income Tax Act sec 195 |
| A | A-udid_number | UDID Number | udid_no | VARCHAR(18) | one-time | [direct] | Unique Disability ID; conditional | [industry typical] |
| AA | AA-data_retention_end_date | Data Retention End Date | data_retention_end | DATE YYYYMMDD | on-modify | derived from Y | 8 yrs per SEBI Stock Brokers Regulations; auto-purge after | SEBI Stock Brokers Regulations 2026 |
| AA | AA-dpdp_analytics_consent | DPDP Analytics Consent | dpdp_analytics_consent | CHAR(1) | on-modify | [direct] | gates analytics-event capture | DPDP Act 2023 |
| AA | AA-dpdp_consent_date | DPDP Consent Date | dpdp_consent_dt | DATE YYYYMMDD | one-time | formatted | consent capture date | DPDP Act 2023 |
| AA | AA-dpdp_consent_obtained | DPDP Consent Obtained | dpdp_consent_flg | CHAR(1) | one-time | [direct] | DPDP Act 2023 mandatory; appears on AOF eSign metadata | DPDP Act 2023 |
| AA | AA-dpdp_consent_version | DPDP Consent Version | dpdp_consent_ver | VARCHAR(10) | one-time | [direct] | version of consent text; supports re-prompting on T&C update | DPDP Act 2023 |
| AA | AA-dpdp_consent_withdrawal_date | Consent Withdrawal Date | dpdp_with_dt | DATE YYYYMMDD | on-event | formatted | withdrawal triggers downstream data-deletion workflow | DPDP Act 2023 |
| AA | AA-dpdp_cross_border_consent | DPDP Cross-Border Consent | dpdp_xb_consent | CHAR(1) | on-modify | [direct] | data-localisation override; rarely Y for India-only clients | DPDP Act 2023 |
| AA | AA-dpdp_marketing_consent | DPDP Marketing Consent | dpdp_mktg_consent | CHAR(1) | on-modify | [direct] | separate granular consent; gates marketing comms | DPDP Act 2023 |
| AA | AA-dpdp_third_party_sharing_consent | DPDP 3P Sharing Consent | dpdp_3p_consent | CHAR(1) | on-modify | [direct] | third-party sharing flag; controls API-export to partners | DPDP Act 2023 |
| AB | AB-dnd_registered | DND Registered | dnd_flg | CHAR(1) | on-modify | [direct] | TRAI DND; promotional SMS suppressed if Y | [industry typical] |
| AB | AB-pref_contract_note_mode | Contract Note Mode | cn_mode_cd | VARCHAR(2) | on-modify | [direct] | EM/PH; PH triggers physical-dispatch workflow | [industry typical] |
| AB | AB-pref_email_notifications | Email Notifications Pref | email_notif_flg | CHAR(1) | on-modify | [direct] | cannot be N per SEBI Dec 2024 mandate; default Y | SEBI Dec 3, 2024 SMS/Email mandate |
| AB | AB-pref_language | Language Preference | lang_pref_cd | VARCHAR(2) | on-modify | [direct] | EN/HI/etc; drives DLT-template language selection | [industry typical] |
| AB | AB-pref_sms_notifications | SMS Notifications Pref | sms_notif_flg | CHAR(1) | on-modify | [direct] | cannot be N per SEBI Dec 2024 mandate; default Y | SEBI Dec 3, 2024 SMS/Email mandate |
| AB | AB-pref_statement_frequency | Statement Frequency | stmt_freq_cd | VARCHAR(2) | on-modify | [direct] | DA/WK/MN; drives statement-generation cron | [industry typical] |
| AB | AB-pref_whatsapp_notifications | WhatsApp Notifications Pref | wa_notif_flg | CHAR(1) | on-modify | [direct] | optional; opt-in required separately | [industry typical] |
| AB | AB-whatsapp_optin_date | WhatsApp Opt-In Date | wa_optin_dt | DATE YYYYMMDD | on-event | formatted | audit trail for WhatsApp opt-in | [industry typical] |
| AC | AC-ras_authorized | RAS Authorized | ras_auth | CHAR(1) | on-modify | [direct] | client authorization for running-account retention | SEBI/HO/MIRSD/POD-1/P/CIR/2023/193 |
| AC | AC-ras_auto_settlement_trigger_days | RAS Auto-Settlement Trigger Days | ras_trigger_days | NUMBER(3) | on-modify | [direct] | default 30 days inactive; overrides cycle for non-traded clients | SEBI/HO/MIRSD/MIRSD-PoD/P/CIR/2025/04 |
| AC | AC-ras_last_settlement_date | RAS Last Settlement Date | ras_last_dt | DATE YYYYMMDD | on-event | formatted | most recent sweep date | SEBI/HO/MIRSD/POD-1/P/CIR/2023/193 |
| AC | AC-ras_last_transaction_date | RAS Last Transaction Date | ras_last_txn_dt | DATE YYYYMMDD | EOD | derived from Y | last trade/charge date; resets 30-day timer | SEBI/HO/MIRSD/MIRSD-PoD/P/CIR/2025/04 |
| AC | AC-ras_next_settlement_date | RAS Next Settlement Date | ras_next_dt | DATE YYYYMMDD | EOD | derived from Y | auto-calc next sweep date based on chosen cycle | SEBI/HO/MIRSD/POD-1/P/CIR/2023/193 |
| AC | AC-ras_optin_date | RAS Opt-In Date | ras_optin_dt | DATE YYYYMMDD | one-time | formatted | audit for client-driven cycle choice | SEBI/HO/MIRSD/POD-1/P/CIR/2023/193 |
| AC | AC-ras_settlement_bank_account | RAS Settlement Bank Account | ras_bank_acct | VARCHAR(18) | on-modify | [direct] | primary bank account for fund return; matches G-account_number where is_primary=Y | SEBI/HO/MIRSD/POD-1/P/CIR/2023/193 |
| AC | AC-ras_settlement_frequency | RAS Settlement Frequency | ras_freq | VARCHAR(2) | on-modify | [direct] | MN/QR; drives sweep-out schedule | SEBI/HO/MIRSD/POD-1/P/CIR/2023/193 |
| B | B-corr_address_line1 | Correspondence Address Line 1 | corr_addr1 | VARCHAR(100) | on-modify | [direct] | appears on physical contract-note dispatch envelope; statement-of-account header | [industry typical] |
| B | B-corr_address_line2 | Correspondence Address Line 2 | corr_addr2 | VARCHAR(100) | on-modify | [direct] | null-if-Z when not provided; rendered on AOF retention copy | [industry typical] |
| B | B-corr_address_line3 | Correspondence Address Line 3 | corr_addr3 | VARCHAR(100) | on-modify | [direct] | optional landmark; appears on ITR Form 16A | [industry typical] |
| B | B-corr_address_proof_type | Correspondence Address Proof Type | corr_addr_pf_type | VARCHAR(2) | one-time | [direct] | POA code table; needed for retention audit | [industry typical] |
| B | B-corr_city | Correspondence City | corr_city | VARCHAR(50) | on-modify | [direct] | feeds stamp-duty state lookup if state derived from city | [industry typical] |
| B | B-corr_country | Correspondence Country | corr_country | VARCHAR(30) | on-modify | [direct] | default India; non-IN triggers FATCA/CRS workflow | [industry typical] |
| B | B-corr_pincode | Correspondence PIN Code | corr_pin | CHAR(6) | on-modify | [direct] | physical dispatch routing | [industry typical] |
| B | B-corr_state | Correspondence State Code | corr_state_code | VARCHAR(2) | on-modify | lookup against R | drives stamp-duty rate per state for contract-note charges | [industry typical] |
| B | B-corr_state | Correspondence State Code | stamp_duty_rate_pct | NUMBER(5,4) | on-trade | lookup against R | state code drives stamp-duty rate lookup; computed per trade; Maharashtra 0.005%, Delhi 0.005%, etc | Indian Stamp Act + Maharashtra Stamp Act |
| B | B-perm_address_line1 | Permanent Address Line 1 | perm_addr1 | VARCHAR(100) | on-modify | [direct] | ITR Form 16A printout uses perm address | [industry typical] |
| B | B-perm_city | Permanent City | perm_city | VARCHAR(50) | on-modify | [direct] | used in CKYC submission record retained in BO | [industry typical] |
| B | B-perm_country | Permanent Country | perm_country | VARCHAR(30) | on-modify | [direct] | default India | [industry typical] |
| B | B-perm_pincode | Permanent PIN Code | perm_pin | CHAR(6) | on-modify | [direct] | needed for transmission documents | [industry typical] |
| B | B-perm_same_as_corr | Permanent Same as Correspondence | perm_same_flag | CHAR(1) | on-modify | [direct] | if Y, perm_* fields copy-on-modify of corr_* | [industry typical] |
| B | B-perm_state | Permanent State Code | perm_state_code | VARCHAR(2) | on-modify | lookup against R | state-code lookup; only differs from corr in <20% of cases | [industry typical] |
| C | C-alternate_email | Alternate Email | alt_email_id | VARCHAR(100) | on-modify | lowercase | secondary delivery if primary bounces | [industry typical] |
| C | C-alternate_mobile | Alternate Mobile | alt_mobile_no | VARCHAR(15) | on-modify | [direct] | fallback for transmission/closure intimation | [industry typical] |
| C | C-email | Email | email_id | VARCHAR(100) | on-modify | lowercase | contract-note ECN dispatch; quarterly statement; ITR Form 16A | SEBI/HO/MIRSD/POD-1/P/CIR/2025/94 |
| C | C-mobile_isd_code | Mobile ISD Code | mob_isd | VARCHAR(5) | on-modify | [direct] | default +91; used as prefix in DLT SMS template variable | [industry typical] |
| C | C-mobile_number | Mobile Number | mobile_no | VARCHAR(15) | on-modify | [direct] | 10-digit India; trade alerts and DLT-approved SMS routed via DLT-comms | SEBI Dec 3, 2024 SMS/Email mandate |
| C | C-phone_number | Landline Number | phone_no | VARCHAR(15) | on-modify | [direct] | tape-recording cross-reference for dealer trades | [industry typical] |
| C | C-phone_std_code | Landline STD | phone_std | VARCHAR(5) | on-modify | [direct] | rarely used; preserved for retention copy | [industry typical] |
| D | D-poi_document_number | POI Document Number | poi_doc_no | VARCHAR(30) | one-time | [direct] | retained per SEBI 8-yr rule | [industry typical] |
| D | D-poi_expiry_date | POI Expiry Date | poi_exp_dt | DATE YYYYMMDD | on-modify | formatted | for Passport/DL; triggers ovd-re-fetch reminder | [industry typical] |
| D | D-poi_type | POI Type | poi_type_cd | VARCHAR(2) | one-time | [direct] | POI code-table; appears on AOF retention | [industry typical] |
| D | D-poi_verified_from_issuer | POI Verified from Issuer | poi_ver_flg | CHAR(1) | one-time | [direct] | audit trail; required for KRA submission | [industry typical] |
| E | E-poa_document_number | POA Document Number | poa_doc_no | VARCHAR(30) | one-time | [direct] | 8-yr retention | [industry typical] |
| E | E-poa_expiry_date | POA Expiry Date | poa_exp_dt | DATE YYYYMMDD | on-modify | formatted | for Passport/DL | [industry typical] |
| E | E-poa_type | POA Type | poa_type_cd | VARCHAR(2) | one-time | [direct] | POA code-table | [industry typical] |
| F | F-declared_annual_income | Declared Annual Income | decl_ann_income | NUMBER(15,2) | on-modify | [direct] | INR; appears on AML risk-score input | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/78 |
| F | F-gross_annual_income_range | Gross Annual Income Range | income_range_cd | VARCHAR(2) | on-modify | lookup against R | income-range code; downstream to charges-differential (some brokers tier brokerage by income) | [industry typical] |
| F | F-income_proof_financial_year | Income Proof Financial Year | inc_proof_fy | VARCHAR(9) | on-modify | [direct] | YYYY-YYYY format | [industry typical] |
| F | F-income_proof_type | Income Proof Type | inc_proof_type | VARCHAR(2) | on-modify | [direct] | conditional; required for F&O/COM segment fee charging | [industry typical] |
| F | F-net_worth | Net Worth | net_worth_inr | NUMBER(15,2) | on-modify | [direct] | INR Lakhs; gate for F&O/COM activation | [industry typical] |
| F | F-net_worth_date | Net Worth Date | net_worth_date | DATE YYYYMMDD | on-modify | formatted | must be <1yr old; auto-re-prompt on staleness | [industry typical] |
| F | F-occupation | Occupation Code | occupation_cd | VARCHAR(2) | on-modify | lookup against R | occupation code-table; flag for high-risk occupation buckets in AML risk-tier | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/78 |
| F | F-source_of_wealth | Source of Wealth | source_of_wealth | VARCHAR(100) | on-modify | [direct] | Salary/Business/Inheritance; AML enhanced due-diligence input | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/78 |
| G | G-account_holder_name | Account Holder Name | acct_holder_nm | VARCHAR(100) | on-modify | [direct] | must match PAN above name-match threshold; mis-match blocks first payout | [industry typical] |
| G | G-account_number | Bank Account Number | bank_acct_no | VARCHAR(18) | on-modify | [direct] | primary payout destination; T+1 funds-payout target | SEBI/HO/MIRSD/POD-1/P/CIR/2025/94 |
| G | G-account_number | Bank Account Number | form_c_bank_book_entry | VARCHAR(50) | on-event | [direct] | Form C bank book entry per client transaction; SEBI Stock Brokers Regs | NSE/INSP/57394 |
| G | G-account_number | Bank Account Number | suspe1234n_route_flag | CHAR(1) | on-event | derived from Y | unidentified credit routed to SUSPE1234N UCC on member PAN | NSE/INSP/64053 |
| G | G-account_number | Bank Account Number | bank_reconciliation_status | VARCHAR(2) | daily | [direct] | BA1/BA2/BA3 daily reconciliation status; T+1 holding+balance API | NSE/INSP/55039 |
| G | G-account_type | Bank Account Type | bank_acct_type | VARCHAR(2) | on-modify | [direct] | SB/CA/NRE/NRO; NRE/NRO triggers NRI-route fund flag | [industry typical] |
| G | G-bank_account_seq | Bank Account Sequence | bank_seq | NUMBER(1) | on-modify | [direct] | 1-5; sequence number for multi-account clients | [industry typical] |
| G | G-bank_name | Bank Name | bank_name | VARCHAR(100) | on-modify | [direct] | appears on payout NEFT/RTGS narration | [industry typical] |
| G | G-bank_proof_type | Bank Proof Type | bank_proof_type | VARCHAR(2) | one-time | [direct] | CC=Cancelled Cheque or BS=Bank Statement | [industry typical] |
| G | G-branch_name | Branch Name | branch_name | VARCHAR(100) | on-modify | [direct] | retained for audit; not on payout narration | [industry typical] |
| G | G-ifsc_code | IFSC Code | ifsc | CHAR(11) | on-modify | uppercase | validated regex; needed for NEFT/RTGS routing | [industry typical] |
| G | G-is_primary | Is Primary Bank Account | is_primary_flg | CHAR(1) | on-modify | [direct] | exactly one primary; primary drives default payout and 30-day refund | SEBI/HO/MIRSD/MIRSD-PoD/P/CIR/2025/04 |
| G | G-micr_code | MICR Code | micr | CHAR(9) | on-modify | [direct] | legacy; some BOs still print on cheque-leaflet | [industry typical] |
| G | G-penny_drop_date | Penny Drop Date | pd_date | DATE YYYYMMDD | on-modify | formatted | audit retention 8 yrs | [industry typical] |
| G | G-penny_drop_name_match_score | Penny Drop Name Match Score | pd_match_score | NUMBER(3) | on-modify | [direct] | 0-100; below threshold triggers manual review | [industry typical] |
| G | G-penny_drop_name_returned | Penny Drop Name Returned | pd_name_returned | VARCHAR(100) | on-modify | [direct] | preserved for AML re-screen workflow | [industry typical] |
| G | G-penny_drop_ref | Penny Drop UTR | pd_utr | VARCHAR(30) | on-modify | [direct] | audit-trail UTR for first-payout dispute resolution | [industry typical] |
| G | G-penny_drop_status | Penny Drop Status | pd_status | VARCHAR(2) | on-modify | [direct] | S/F/P; only S allows payout activation | [industry typical] |
| H | H-account_status | Demat Account Status | demat_acct_status | VARCHAR(2) | on-modify | [direct] | AC/FR/CL; FR blocks new buys at OMS via RMS rule | [industry typical] |
| H | H-account_type | Demat Account Type | demat_acct_type | VARCHAR(2) | on-modify | [direct] | IN/JO/MN; JO triggers joint-holder ledger logic | [industry typical] |
| H | H-bo_id | BO ID | bo_id | VARCHAR(16) | one-time | concat with X | concat of DP ID + Client ID; key for holding-statement dispatch and direct-payout | SEBI/HO/MIRSD/MIRSD-PoD1/P/CIR/2024/75 |
| H | H-bo_id | BO ID | direct_payout_demat_target | VARCHAR(16) | on-trade | [direct] | BO ID becomes direct-payout destination per SEBI Nov 2024 mandate | SEBI/HO/MIRSD/MIRSD-PoD1/P/CIR/2024/75 |
| H | H-bsda_flag | BSDA Flag | bsda_flg | CHAR(1) | on-modify | [direct] | Basic Services Demat flag; reduces AMC charge in BO billing | [industry typical] |
| H | H-client_id | Client ID | client_id_demat | VARCHAR(8) | one-time | [direct] | 8-digit; concatenated with DP ID for BO ID | [industry typical] |
| H | H-depository | Depository | depository_cd | VARCHAR(4) | one-time | [direct] | CDSL/NSDL; drives direct-payout routing and CUSPA mapping | SEBI/HO/MIRSD/MIRSD-PoD1/P/CIR/2024/75 |
| H | H-depository | Depository | cuspa_account_route_cd | VARCHAR(8) | on-trade | lookup against R | TM CUSPA / CM CUSPA mapping depending on depository and clearing arrangement | NCL/CMPT/63669 |
| H | H-dp_id | DP ID | dp_id | VARCHAR(8) | one-time | [direct] | CDSL 8-digit, NSDL IN+6; key for ledger demat-link | [industry typical] |
| H | H-dp_name | DP Name | dp_name | VARCHAR(100) | one-time | [direct] | appears on demat holding statement header | [industry typical] |
| H | H-opening_date | Demat Opening Date | demat_open_dt | DATE YYYYMMDD | one-time | formatted | needed for KYC audit trail | [industry typical] |
| I | I-guardian_name | Guardian Name | guardian_nm | VARCHAR(100) | on-modify | [direct] | conditional on minor nominee; transmission custodian | [industry typical] |
| I | I-guardian_pan | Guardian PAN | guardian_pan | CHAR(10) | on-modify | uppercase | conditional; mandatory KYC of guardian | [industry typical] |
| I | I-nomination_opted | Nomination Opted | nom_opted_flg | CHAR(1) | on-modify | [direct] | Y/N; N requires video opt-out per Jan 2025 revamp | SEBI circular Jan 10, 2025 |
| I | I-nominee_address | Nominee Address | nom_addr | VARCHAR(255) | on-modify | [direct] | transmission documents lookup | [industry typical] |
| I | I-nominee_city | Nominee City | nom_city | VARCHAR(50) | on-modify | [direct] | intimation routing on holder death event | [industry typical] |
| I | I-nominee_dob | Nominee DOB | nom_dob | DATE YYYYMMDD | on-modify | formatted | derives nominee_is_minor flag for guardian workflow | [industry typical] |
| I | I-nominee_is_minor | Nominee Is Minor | nom_is_minor | CHAR(1) | on-modify | derived from Y | derived from nominee_dob; triggers guardian-section requirement | [industry typical] |
| I | I-nominee_mobile | Nominee Mobile | nom_mobile | VARCHAR(15) | on-modify | [direct] | transmission intimation route | [industry typical] |
| I | I-nominee_name | Nominee Name | nom_name | VARCHAR(100) | on-modify | [direct] | per-nominee row; transmission lookup key | [industry typical] |
| I | I-nominee_pan | Nominee PAN | nom_pan | CHAR(10) | on-modify | uppercase | conditional; one unique ID per nominee mandatory | [industry typical] |
| I | I-nominee_percentage | Nominee Percentage | nom_pct | NUMBER(5,2) | on-modify | [direct] | must sum to 100 across nominees; validated at BO ingestion | SEBI circular Jan 10, 2025 |
| I | I-nominee_pincode | Nominee Pincode | nom_pin | CHAR(6) | on-modify | [direct] | physical dispatch on transmission | [industry typical] |
| I | I-nominee_relationship | Nominee Relationship | nom_rel_cd | VARCHAR(2) | on-modify | lookup against R | FA/MO/SP/SO/DA etc per code table | [industry typical] |
| I | I-nominee_state | Nominee State | nom_state | VARCHAR(30) | on-modify | [direct] | state for transmission stamp-duty determination | [industry typical] |
| I | I-number_of_nominees | Number of Nominees | num_nominees | NUMBER(2) | on-modify | [direct] | 1-10; expanded from 3 in Jan 2025 | SEBI circular Jan 10, 2025 |
| I | I-opt_out_declaration | Opt-Out Declaration | opt_out_decl | CHAR(1) | on-modify | [direct] | requires 30-day video declaration window; pending status persists in BO | SEBI circular Jan 10, 2025 |
| K | K-beneficial_owner_declaration | BO Declaration | bo_decl_flg | CHAR(1) | on-modify | [direct] | N triggers full BO-details capture in AML case file | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/78 |
| K | K-is_pep | Is PEP | pep_flg | CHAR(1) | on-modify | [direct] | Y triggers EDD; AML risk-tier = High immediately | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/78 |
| K | K-is_pep_related | Is PEP-Related | pep_related_flg | CHAR(1) | on-modify | [direct] | Y triggers EDD; flagged in BO audit trail | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/78 |
| K | K-pep_details | PEP Details | pep_details | VARCHAR(200) | on-modify | [direct] | free-text; appears in AML case file | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/78 |
| K | K-source_of_funds | Source of Funds | src_of_funds | VARCHAR(100) | on-modify | [direct] | AML risk-score input; UCC re-screen quarterly | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/78 |
| L | L-exchange_bse | Exchange BSE Flag | bse_flag | CHAR(1) | on-modify | [direct] | BSE charges schedule (different transaction-charge per scrip group) | [industry typical] |
| L | L-exchange_mcx | Exchange MCX Flag | mcx_flag | CHAR(1) | on-modify | [direct] | MCX commodity flag; activates MCX UCC link in BO | [industry typical] |
| L | L-exchange_nse | Exchange NSE Flag | nse_flag | CHAR(1) | on-modify | [direct] | routing flag for NSE-bound order; NSE charges schedule applied | [industry typical] |
| L | L-segment_commodity | Segment Commodity | seg_com_flag | CHAR(1) | on-modify | [direct] | Y requires MCX registration and income proof | [industry typical] |
| L | L-segment_currency | Segment Currency Derivatives | seg_cd_flag | CHAR(1) | on-modify | [direct] | drives CD brokerage and exchange-transaction-charge schedule | [industry typical] |
| L | L-segment_equity_cash | Segment Equity Cash | seg_cm_flag | CHAR(1) | on-modify | [direct] | default Y; drives CM brokerage and STT computation columns | [industry typical] |
| L | L-segment_equity_cash | Segment Equity Cash | stt_rate_cm | NUMBER(7,4) | on-trade | lookup against R | STT rate lookup by segment+side; CM delivery 0.1% both sides, CM intraday 0.025% sell side | Finance Act / STT Act |
| L | L-segment_equity_cash | Segment Equity Cash | exch_txn_charge_rate | NUMBER(7,5) | on-trade | lookup against R | exchange transaction charge per segment; NSE CM 0.00297%, BSE CM 0.00375% (per scrip group) | [industry typical] |
| L | L-segment_equity_cash | Segment Equity Cash | sebi_turnover_fee_rate | NUMBER(7,5) | on-trade | lookup against R | SEBI turnover fee Rs 10 per crore (0.0001%) | SEBI Turnover Fee Notification |
| L | L-segment_equity_cash | Segment Equity Cash | brokerage_amount | NUMBER(15,2) | on-trade | derived from Y | computed from tariff sheet per segment+volume; rendered on ECN Annexure A | [industry typical] |
| L | L-segment_equity_cash | Segment Equity Cash | gst_on_brokerage_amount | NUMBER(15,2) | on-trade | derived from Y | 18% GST on (brokerage + exchange transaction charge + SEBI fee) | CGST/SGST Act |
| L | L-segment_equity_fno | Segment F&O | seg_fno_flag | CHAR(1) | on-modify | [direct] | Y requires income proof; drives F&O brokerage and STT (sell side STT 0.0125% premium) | [industry typical] |
| L | L-segment_equity_fno | Segment F&O | stt_rate_fno | NUMBER(7,4) | on-trade | lookup against R | STT for F&O: futures sell 0.02%, options sell 0.1% premium (revised Oct 2024) | Finance Act 2024 |
| L | L-settlement_type | Settlement Type | settle_type | VARCHAR(2) | on-modify | [direct] | T+1 default; T+0 opt-in tracked in BO for differential brokerage | SEBI/HO/MRD/POD-3/P/CIR/2024/172 |
| L | L-trading_experience_commodity_years | Trading Experience COM (Years) | tr_exp_com | NUMBER(2) | on-modify | [direct] | conditional; COM activation log | [industry typical] |
| L | L-trading_experience_equity_years | Trading Experience Equity (Years) | tr_exp_eq | NUMBER(2) | on-modify | [direct] | client suitability disclosure; retained for audit | [industry typical] |
| L | L-trading_experience_fno_years | Trading Experience F&O (Years) | tr_exp_fno | NUMBER(2) | on-modify | [direct] | conditional; F&O risk-acknowledgement record | [industry typical] |
| L | L-trading_preference | Trading Preference | trade_pref | VARCHAR(5) | on-modify | [direct] | Delivery/Intraday/Both; drives default product-tag in OMS | [industry typical] |
| M | M-age_group | Age Group | age_bucket | VARCHAR(2) | on-modify | derived from Y | derived from DOB; appears on suitability assessment record | [industry typical] |
| M | M-investment_horizon | Investment Horizon | inv_horizon_cd | CHAR(1) | on-modify | [direct] | S/M/L; client suitability matrix input | [industry typical] |
| M | M-investment_objective | Investment Objective | inv_obj_cd | VARCHAR(2) | on-modify | [direct] | CA/IN/WP/SP; suitability disclosure record | [industry typical] |
| M | M-risk_appetite | Risk Appetite | risk_appetite_cd | CHAR(1) | on-modify | [direct] | L/M/H; gate for high-risk-product offerings | [industry typical] |
| M | M-risk_category | Risk Category | risk_cat | VARCHAR(2) | on-modify | derived from Y | Conservative/Moderate/Aggressive; appears on contract-note Annexure | [industry typical] |
| M | M-risk_profile_score | Risk Profile Score | risk_score | NUMBER(3) | on-modify | derived from Y | 0-100; derived from M01-M04 + F01+F03 | [industry typical] |
| N | N-ipv_date | IPV Date | ipv_date | DATE YYYYMMDD | one-time | formatted | audit | [industry typical] |
| N | N-ipv_mode | IPV Mode | ipv_mode_cd | VARCHAR(2) | one-time | [direct] | PH/VI/AE | [industry typical] |
| N | N-ipv_required | IPV Required | ipv_req_flg | CHAR(1) | one-time | [direct] | N if Aadhaar e-KYC or DigiLocker used; retained for audit | [industry typical] |
| N | N-ipv_status | IPV Status | ipv_status_cd | VARCHAR(2) | on-event | [direct] | CO/PE/FA; CO required before ACTIVE flip | [industry typical] |
| N | N-vipv_session_id | VIPV Session ID | vipv_sess_id | VARCHAR(50) | one-time | [direct] | unique session identifier; retained for retrieval | [industry typical] |
| N | N-vipv_video_hash | VIPV Video Hash | vipv_vid_hash | CHAR(64) | one-time | [direct] | SHA-256 integrity hash | [industry typical] |
| N | N-vipv_video_url | VIPV Video URL | vipv_vid_url | VARCHAR(500) | one-time | [direct] | tamper-proof storage URL; 8-yr retention | [industry typical] |
| O | O-ddpi_bo_id | DDPI BO ID | ddpi_bo_id | VARCHAR(16) | on-modify | [direct] | BO ID for which DDPI applies | SEBI/HO/MIRSD/DoP/P/CIR/2022/44 |
| O | O-ddpi_for_mutual_fund | DDPI for MF | ddpi_mf_flg | CHAR(1) | on-modify | [direct] | MF transactions enabled | SEBI/HO/MIRSD/DoP/P/CIR/2022/44 |
| O | O-ddpi_for_pledge | DDPI for Pledge | ddpi_pledge_flg | CHAR(1) | on-modify | [direct] | pledge/re-pledge for margins enabled | SEBI/HO/MIRSD/DoP/P/CIR/2022/44 |
| O | O-ddpi_for_settlement | DDPI for Settlement | ddpi_settle_flg | CHAR(1) | on-modify | [direct] | transfer securities for settlement enabled | SEBI/HO/MIRSD/DoP/P/CIR/2022/44 |
| O | O-ddpi_for_tendering | DDPI for Tendering | ddpi_tender_flg | CHAR(1) | on-modify | [direct] | tendering shares in open offers/buybacks enabled | SEBI/HO/MIRSD/DoP/P/CIR/2022/44 |
| O | O-ddpi_opted | DDPI Opted | ddpi_opted_flg | CHAR(1) | on-modify | [direct] | Y/N; cannot be denied service if N (regulatory) | SEBI/HO/MIRSD/DoP/P/CIR/2022/44 |
| O | O-ddpi_scope | DDPI Scope | ddpi_scope_cd | VARCHAR(2) | on-modify | [direct] | AL/SP; drives auto-debit eligibility flag | SEBI/HO/MIRSD/DoP/P/CIR/2022/44 |
| P | P-consent_electronic_communication | Consent Electronic Communication | e_comm_consent | CHAR(1) | on-modify | [direct] | Y required for ECN dispatch; SMS/email mandatory per Dec 2024 | SEBI Dec 3, 2024 SMS/Email mandate |
| P | P-consent_kyc_data_sharing | Consent KYC Data Sharing | kyc_share_consent | CHAR(1) | one-time | [direct] | Y required to upload to KRA/CKYC; rejection blocks ACTIVE flip | [industry typical] |
| P | P-declaration_date | Declaration Date | decl_date | DATE YYYYMMDD | one-time | formatted | appears on AOF Page 1; retained | [industry typical] |
| P | P-declaration_place | Declaration Place | decl_place | VARCHAR(50) | one-time | [direct] | city of declaration; required on AOF | [industry typical] |
| P | P-esign_document_hash | eSign Document Hash | esign_doc_hash | CHAR(64) | one-time | [direct] | SHA-256 of signed AOF; tamper-evidence | [industry typical] |
| P | P-esign_mode | eSign Mode | esign_mode_cd | VARCHAR(2) | one-time | [direct] | AO/BI/WS; audit trail | [industry typical] |
| P | P-esign_timestamp | eSign Timestamp | esign_ts | TIMESTAMP | one-time | formatted | ISO 8601; appears on signed AOF metadata | [industry typical] |
| P | P-esign_transaction_id | eSign Transaction ID | esign_txn_id | VARCHAR(50) | one-time | [direct] | AOF eSign txn ID; retained for 8-yr audit | [industry typical] |
| P | P-running_account_authorization | Running Account Authorization | ras_auth_flg | CHAR(1) | on-modify | [direct] | Y allows broker to retain funds within RAS framework | SEBI/HO/MIRSD/POD-1/P/CIR/2023/193 |
| P | P-running_account_settlement_freq | Running Account Settlement Frequency | ras_freq_cd | VARCHAR(2) | on-modify | [direct] | Q1/Q2/M; drives quarterly or monthly RAS sweep schedule | SEBI/HO/MIRSD/POD-1/P/CIR/2023/193 |
| P | P-tariff_sheet_acknowledged | Tariff Sheet Acknowledged | tariff_ack_flg | CHAR(1) | one-time | [direct] | brokerage and charges schedule; appears on contract-note disclosure | [industry typical] |
| P | P-terms_conditions_accepted | T&C Accepted | tc_accepted_flg | CHAR(1) | one-time | [direct] | MITC and broker T&C accepted; eSigned copy retained 8yrs | [industry typical] |
| U | U-bse_ucc_status | BSE UCC Status | bse_ucc_status | VARCHAR(2) | on-event | [direct] | AP unlocks BSE order routing | [industry typical] |
| U | U-mcx_client_category | MCX Client Category | mcx_client_cat | VARCHAR(2) | on-modify | [direct] | HE/SP/AR; impacts commodity position limits | [industry typical] |
| U | U-mcx_ucc_status | MCX UCC Status | mcx_ucc_status | VARCHAR(2) | on-event | [direct] | AP unlocks MCX order routing | [industry typical] |
| U | U-nse_ucc_status | NSE UCC Status | nse_ucc_status | VARCHAR(2) | on-event | [direct] | AP/RJ/PE; AP unlocks NSE order routing | [industry typical] |
| U | U-ucc_client_type | UCC Client Type | ucc_type_cd | VARCHAR(2) | on-modify | [direct] | IN/HU/NR/CO; drives charges schedule and AML segmentation | [industry typical] |
| U | U-ucc_code | UCC Code | ucc_code | VARCHAR(10) | one-time | uppercase | primary ledger key alongside PAN; appears on every trade record and contract note | [industry typical] |
| U | U-ucc_code | UCC Code | client_ledger_debit | NUMBER(15,2) | on-trade | derived from Y | per-trade ledger debit; aggregated nightly batch updates client ledger | SEBI/HO/MIRSD/POD-1/P/CIR/2025/94 |
| U | U-ucc_code | UCC Code | client_ledger_credit | NUMBER(15,2) | on-trade | derived from Y | per-trade ledger credit on payout receipt | SEBI/HO/MIRSD/POD-1/P/CIR/2025/94 |
| U | U-ucc_code | UCC Code | ledger_running_balance | NUMBER(15,2) | EOD | derived from Y | running ledger balance; basis for RAS sweep eligibility | SEBI/HO/MIRSD/POD-1/P/CIR/2023/193 |
| U | U-ucc_code | UCC Code | contract_note_id | VARCHAR(30) | on-trade | derived from Y | ECN ID per client per day per exchange; SHA-256 hash of trade-set signed with DSC | NSE/INSP/53115 |
| U | U-ucc_code | UCC Code | contract_note_format | VARCHAR(2) | on-trade | [direct] | Annexure A (CN-cum-tax-invoice) or Annexure B (separate); member's choice | NSE/INSP/53115 |
| U | U-ucc_code | UCC Code | contract_note_dispatch_status | VARCHAR(2) | on-event | [direct] | DI=Dispatched, FA=Failed, PE=Pending; T+24h SLA per SEBI | NSE/INSP/53115 |
| U | U-ucc_code | UCC Code | quarterly_stmt_dispatch_dt | DATE YYYYMMDD | on-event | derived from Y | quarterly statement dispatch date; mandatory via email per investor-servicing framework | SEBI/HO/MIRSD/POD-1/P/CIR/2025/94 |
| U | U-ucc_code | UCC Code | ucc_modification_log_id | VARCHAR(20) | on-modify | [direct] | modification log row per UCC change; submitted to exchange via ENIT/BEFS | [industry typical] |
| U | U-ucc_registration_date | UCC Registration Date | ucc_reg_date | DATE YYYYMMDD | one-time | formatted | audit field | [industry typical] |
| V | V-nre_nro_account_type | NRE/NRO Account Type | nre_nro_type | VARCHAR(3) | on-modify | [direct] | NRE/NRO; settlement routing rule in BO | [industry typical] |
| V | V-nre_nro_bank_account | NRE/NRO Bank Account | nre_nro_acct | VARCHAR(18) | on-modify | [direct] | settlement account for NRI funds payout | [industry typical] |
| V | V-nre_nro_ifsc | NRE/NRO IFSC | nre_nro_ifsc | CHAR(11) | on-modify | uppercase | NEFT/RTGS routing for NRI payout | [industry typical] |
| V | V-nri_trading_route | NRI Trading Route | nri_route_cd | VARCHAR(2) | on-modify | [direct] | PI/NP; PI restricts to delivery-only (no intraday) | [industry typical] |
| V | V-overseas_address_line1 | Overseas Address Line 1 | ovs_addr1 | VARCHAR(100) | on-modify | [direct] | NRI mandatory; FATCA correspondence address | [industry typical] |
| V | V-overseas_country | Overseas Country | ovs_country | CHAR(2) | on-modify | [direct] | ISO code; FATCA jurisdiction lookup | [industry typical] |
| V | V-pis_account_number | PIS Account Number | pis_acct_no | VARCHAR(20) | on-modify | [direct] | designated AD-bank PIS account; settlement route | [industry typical] |
| V | V-pis_bank_name | PIS Bank Name | pis_bank | VARCHAR(100) | on-modify | [direct] | displayed on NRI account-statement header | [industry typical] |
| V | V-pis_permission_status | PIS Permission Status | pis_status_flg | CHAR(1) | on-modify | [direct] | NRI mandatory; needed to enable NRI ledger flag | [industry typical] |
| V | V-repatriation_status | Repatriation Status | repat_status | VARCHAR(2) | on-modify | [direct] | RP/NR; impacts ledger account-bucket | [industry typical] |
| W | W-conversion_to_major_done | Conversion to Major Done | conv_major_flg | CHAR(1) | on-event | [direct] | if N past majority date, freeze account per 30-day rule | [industry typical] |
| W | W-date_of_majority | Date of Majority | majority_date | DATE YYYYMMDD | on-modify | derived from Y | DOB+18yr; drives 30-day conversion-to-major workflow trigger | [industry typical] |
| W | W-guardian_name | Guardian Name (Minor) | guardian_minor_nm | VARCHAR(100) | on-modify | [direct] | appears on minor account statement | [industry typical] |
| W | W-guardian_pan | Guardian PAN | guardian_minor_pan | CHAR(10) | on-modify | uppercase | required for minor ledger | [industry typical] |
| W | W-guardian_relationship | Guardian Relationship | guardian_rel_cd | VARCHAR(2) | on-modify | [direct] | FA/MO/CG; CG requires court-order doc | [industry typical] |
| W | W-holding_type | Holding Type | holding_type_cd | VARCHAR(2) | on-modify | [direct] | SI/J2/J3; J2/J3 trigger 2nd/3rd holder ledger logic | [industry typical] |
| W | W-is_minor_account | Minor Account Flag | minor_flg | CHAR(1) | on-modify | derived from Y | derived from DOB<18; restricts to delivery-only | [industry typical] |
| W | W-operation_mode | Operation Mode | op_mode_cd | VARCHAR(2) | on-modify | [direct] | ES/AS/JO; drives signature-verification rule | [industry typical] |
| X | X-collateral_type_preference | Collateral Type Preference | coll_type_pref | VARCHAR(2) | on-modify | [direct] | CA/SE/FD/ET; drives 50%-cash-equivalent rule check | NCL/CMPT/65498 |
| X | X-daily_margin_report_status | Daily Margin Report Status | dmr_status_cd | VARCHAR(2) | EOD | [direct] | CO/NC; flagged if peak-margin snapshot showed shortfall | SEBI/HO/MRD2/DCAP/CIR/P/2020/127 |
| X | X-mtf_agreement_date | MTF Agreement Date | mtf_agree_dt | DATE YYYYMMDD | one-time | formatted | audit field | [industry typical] |
| X | X-mtf_enabled | MTF Enabled | mtf_flg | CHAR(1) | on-modify | [direct] | Y activates CSMFA pledge account routing | NCL/CMPT/63669 |
| X | X-mtf_interest_rate | MTF Interest Rate | mtf_int_rate | NUMBER(5,2) | on-modify | [direct] | %pa; appears on contract-note charges breakdown | [industry typical] |
| X | X-mtf_limit_sanctioned | MTF Limit Sanctioned | mtf_limit | NUMBER(15,2) | on-modify | [direct] | INR; sanctioned MTF facility cap | [industry typical] |
| X | X-online_pledge_activated | Online Pledge Activated | online_pledge_flg | CHAR(1) | on-modify | [direct] | Y enables broker-portal pledge initiation | SEBI/HO/MIRSD/DOP/CIR/P/2020/28 |
| X | X-pledge_consent_obtained | Pledge Consent Obtained | pledge_consent_flg | CHAR(1) | on-modify | [direct] | Y allows margin-pledge file generation; OTP-confirmed | SEBI/HO/MIRSD/DOP/CIR/P/2020/28 |
| X | X-total_pledged_value | Total Pledged Value | pledged_value_inr | NUMBER(15,2) | EOD | derived from Y | current total with haircut applied; recomputed nightly | NCL/CMPT/65498 |
| Y | Y-account_status | Account Status | acct_status_cd | VARCHAR(2) | on-event | [direct] | AC/IN/DO/SU/CL; drives ledger eligibility for new trades | SEBI framework for automated deactivation Jul 2022 |
| Y | Y-account_status_date | Account Status Date | acct_status_dt | DATE YYYYMMDD | on-event | formatted | last status-change date; audit | [industry typical] |
| Y | Y-account_status_reason | Account Status Reason | acct_status_reason | VARCHAR(100) | on-event | [direct] | free-text; preserves dormancy/suspension cause | [industry typical] |
| Y | Y-auto_deactivation_date | Auto Deactivation Date | auto_deactiv_dt | DATE YYYYMMDD | on-event | formatted | SEBI framework for inadequate KYC | SEBI framework for automated deactivation Jul 2022 |
| Y | Y-closure_funds_settled | Closure Funds Settled | closure_funds_flg | CHAR(1) | on-event | [direct] | must be Y before final closure | SEBI/HO/MIRSD/POD-1/P/CIR/2025/94 |
| Y | Y-closure_request_date | Closure Request Date | closure_req_dt | DATE YYYYMMDD | on-event | formatted | client closure intimation; starts settlement-of-dues workflow | SEBI/HO/MIRSD/POD-1/P/CIR/2025/94 |
| Y | Y-closure_request_date | Closure Request Date | closure_workflow_state | VARCHAR(2) | on-event | derived from Y | PE=Pending obligations, FS=Funds-settled, SS=Sec-settled, CL=Closed | SEBI/HO/MIRSD/POD-1/P/CIR/2025/94 |
| Y | Y-closure_securities_settled | Closure Securities Settled | closure_secs_flg | CHAR(1) | on-event | [direct] | must be Y before final closure | SEBI/HO/MIRSD/POD-1/P/CIR/2025/94 |
| Y | Y-days_inactive | Days Inactive | days_inactive | NUMBER(5) | EOD | derived from Y | auto-calc; >365 typically flags dormancy | SEBI framework for automated deactivation Jul 2022 |
| Y | Y-dormancy_declaration_date | Dormancy Declaration Date | dormancy_dt | DATE YYYYMMDD | on-event | formatted | set when inactive>12mo per broker policy | SEBI framework for automated deactivation Jul 2022 |
| Y | Y-final_closure_date | Final Closure Date | final_close_dt | DATE YYYYMMDD | on-event | formatted | audit-retained per 8-yr SEBI rule | [industry typical] |
| Y | Y-kyc_validity_end | KYC Validity End | kyc_valid_end | DATE YYYYMMDD | on-modify | formatted | 5-yr or risk-based; triggers re-KYC workflow at expiry | [industry typical] |
| Y | Y-kyc_validity_start | KYC Validity Start | kyc_valid_start | DATE YYYYMMDD | on-modify | formatted | start of re-KYC cycle | [industry typical] |
| Y | Y-last_trade_date | Last Trade Date | last_trade_dt | DATE YYYYMMDD | EOD | derived from Y | rolled forward by nightly batch; drives dormancy timer | SEBI framework for automated deactivation Jul 2022 |
| Y | Y-next_kyc_review_date | Next KYC Review Date | next_kyc_rev_dt | DATE YYYYMMDD | on-modify | derived from Y | computed from risk-tier (2/8/10 yrs) | [industry typical] |
| Y | Y-ovd_expiry_date | OVD Expiry Date | ovd_expiry_dt | DATE YYYYMMDD | on-modify | formatted | if Passport/DL; triggers ovd-re-fetch reminder | [industry typical] |
| Y | Y-reactivation_fresh_kyc | Reactivation Fresh KYC | react_fresh_kyc_flg | CHAR(1) | on-event | [direct] | Y if dormant>12mo; mandates re-KYC before order entry | SEBI framework for automated deactivation Jul 2022 |
| Y | Y-reactivation_request_date | Reactivation Request Date | react_req_dt | DATE YYYYMMDD | on-event | formatted | client-initiated reactivation trigger | SEBI framework for automated deactivation Jul 2022 |
| Z | Z-approval_status | Approval Status | appr_status_cd | VARCHAR(2) | on-event | [direct] | PE/AP/RJ; pending blocks downstream propagation | [industry typical] |
| Z | Z-checker_id | Checker ID | checker_id | VARCHAR(50) | on-event | [direct] | checker user-ID; segregation-of-duties enforced | [industry typical] |
| Z | Z-field_name | Field Name Modified | field_changed | VARCHAR(50) | on-modify | [direct] | which field was changed | [industry typical] |
| Z | Z-maker_id | Maker ID | maker_id | VARCHAR(50) | on-modify | [direct] | maker-checker mandatory; cannot be same as checker | [industry typical] |
| Z | Z-modification_date | Modification Date | mod_ts | TIMESTAMP | on-modify | formatted | ISO 8601; chronological audit | [industry typical] |
| Z | Z-modification_id | Modification ID | mod_id | VARCHAR(20) | on-modify | [direct] | unique key per change; maker-checker primary key | [industry typical] |
| Z | Z-modification_source | Modification Source | mod_source_cd | VARCHAR(2) | on-modify | [direct] | CR/CO/KR/SY; KRA-updates flagged differently from CR | [industry typical] |
| Z | Z-modified_by_user | Modified By User | mod_user_id | VARCHAR(50) | on-modify | [direct] | maker user-ID; access-trail input | [industry typical] |
| Z | Z-new_value | New Value | new_value | VARCHAR(500) | on-modify | [direct] | new value; appears on modification report | [industry typical] |
| Z | Z-old_value | Old Value | old_value | VARCHAR(500) | on-modify | [direct] | previous value; retained for 8 yrs | [industry typical] |
| Z | Z-sar_filed | SAR Filed | sar_filed_flg | CHAR(1) | on-event | [direct] | STR filed with FIU-IND; cross-reference to aml-fiu destination | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/78 |
| Z | Z-suspicious_activity_flagged | Suspicious Activity Flagged | sus_act_flg | CHAR(1) | on-event | [direct] | Y triggers AML case-file creation | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/78 |

## Verified through

2026-05-14

---

*AI-generated and not legal advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*

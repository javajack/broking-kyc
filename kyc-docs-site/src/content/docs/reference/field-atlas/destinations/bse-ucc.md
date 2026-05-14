---
title: "BSE UCC — Fields consumed"
description: "Every field consumed by BSE UCC, with source section, destination format, update frequency, transformation rule, and quirks. Use this when building an integration with this destination."
---

> **Why this page is structured this way:** This is the destination-first view for BSE UCC. Engineers building an integration with this destination get the complete field list on one page. To see where each field originated in onboarding, follow the per-section links via the [atlas overview](/broking-kyc/reference/field-atlas/).

## TL;DR

- **86 unique fields** consumed by BSE UCC.
- Source spans sections: A, B, C, D, E, F, G, H, J, K, L, U, Y.
- **85 rows cite a public spec source**; **1** are `[industry typical]`.

## Field-destination rows

Sorted by `source_section`, then `field_id`.

| source_section | field_id | field_name | destination_field_name | destination_format | frequency | transformation | quirks_notes | spec_source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| A | A-aadhaar_number | Aadhaar Number | UID | CHAR(12) | one-time | truncate to N | Masked storage; KYC validated via UIDAI (not direct UCC upload) | BSE/20230819-6 |
| A | A-ckyc_number | CKYC Identification Number (KIN) | CKYC_KIN | CHAR(14) | one-time | [direct] | Optional; KRA-validated KYC takes precedence | BSE/20240223-42 |
| A | A-date_of_birth | Date of Birth | DOB | DATE DD/MM/YYYY | one-time | formatted | Mandatory; PAN+Name+DOB must match Protean; post-registration changes require Unfreeze request with re-verification | BSE/20240223-42 |
| A | A-father_spouse_flag | Father/Spouse Indicator | FATHER_SPOUSE_FLAG | CHAR(1) | one-time | [direct] | F or S indicator | BSE/20240223-42 |
| A | A-father_spouse_name | Father/Spouse Name | FATHER_SPOUSE_NAME | VARCHAR(70) | one-time | uppercase | Required in BEFS UCC profile | BSE/20240223-42 |
| A | A-first_name | First Name | FIRST_NAME | VARCHAR(85) | one-time | uppercase | Separate First/Middle/Last mandatory for individuals; Client Name limit 85 chars (revised Feb 2024) | BSE/20240223-42 |
| A | A-full_name | Full Name (Description) | CLIENT_NAME_DESC | VARCHAR(150) | one-time | concat with X | Optional 150-char description field; supplementary to First/Middle/Last | BSE/20240223-42 |
| A | A-gender | Gender | GENDER | CHAR(1) | one-time | [direct] | M/F/T per CERSAI template | BSE/20240223-42 |
| A | A-last_name | Last Name | LAST_NAME | VARCHAR(85) | one-time | uppercase | Mandatory; must match Protean record; reduced 85-char limit | BSE/20240223-42 |
| A | A-marital_status | Marital Status | MARITAL_STATUS | CHAR(1) | one-time | [direct] | S/M/O | BSE/20240223-42 |
| A | A-middle_name | Middle Name | MIDDLE_NAME | VARCHAR(85) | one-time | uppercase | Separate Middle name field in revised UCC (post Mar 28 2024) | BSE/20240223-42 |
| A | A-nationality | Nationality | NATIONALITY | CHAR(2) | one-time | lookup against R | ISO code; required field | BSE/20240223-42 |
| A | A-pan_number | PAN Number | PAN | CHAR(10) | one-time | uppercase | Validated against Protean eGov; PAN+Name+DOB must all match; mandatory field in revised UCC | BSE/20240223-42 |
| A | A-prefix | Name Prefix / Salutation | SALUTATION | VARCHAR(5) | one-time | [direct] | Optional in BEFS UCC submission | BSE/20240223-42 |
| A | A-residential_status | Residential Status | RES_STATUS | CHAR(2) | one-time | [direct] | RI/NRI/FN/PIO determines UCC category (e.g., FDI/DR split per BSE Jan 2025) | BSE/20250110-47 |
| B | B-corr_address_line1 | Correspondence Address Line 1 | CORR_ADDR1 | VARCHAR(100) | on-modify | [direct] | Mandatory in revised BEFS UCC submission | BSE/20240223-42 |
| B | B-corr_address_line2 | Correspondence Address Line 2 | CORR_ADDR2 | VARCHAR(100) | on-modify | [direct] | Optional | BSE/20240223-42 |
| B | B-corr_address_line3 | Correspondence Address Line 3 | CORR_ADDR3 | VARCHAR(100) | on-modify | [direct] | Optional | BSE/20240223-42 |
| B | B-corr_address_proof_type | Correspondence Address Proof Type | ADDR_PROOF_TYPE | CHAR(2) | one-time | [direct] | POA code (Aadhaar/Passport/Utility/etc.) | BSE/20240223-42 |
| B | B-corr_city | Correspondence City | CORR_CITY | VARCHAR(50) | on-modify | lookup against R | Mandatory; validated against BSE city master | BSE/20240223-42 |
| B | B-corr_country | Correspondence Country | CORR_COUNTRY | VARCHAR(30) | on-modify | [direct] | Default India | BSE/20240223-42 |
| B | B-corr_pincode | Correspondence PIN Code | CORR_PIN | CHAR(6) | on-modify | [direct] | Mandatory; 6 digits | BSE/20240223-42 |
| B | B-corr_state | Correspondence State | CORR_STATE | VARCHAR(30) | on-modify | lookup against R | State code; mandatory | BSE/20240223-42 |
| B | B-perm_address_line1 | Permanent Address Line 1 | PERM_ADDR1 | VARCHAR(100) | on-modify | null-if-Z | Null if perm_same_as_corr=Y | BSE/20240223-42 |
| B | B-perm_city | Permanent City | PERM_CITY | VARCHAR(50) | on-modify | lookup against R | Conditional | BSE/20240223-42 |
| B | B-perm_country | Permanent Country | PERM_COUNTRY | VARCHAR(30) | on-modify | null-if-Z | Default India | BSE/20240223-42 |
| B | B-perm_pincode | Permanent PIN Code | PERM_PIN | CHAR(6) | on-modify | null-if-Z | Conditional | BSE/20240223-42 |
| B | B-perm_same_as_corr | Permanent Same As Correspondence | PERM_SAME_FLAG | CHAR(1) | one-time | [direct] | Y/N flag | BSE/20240223-42 |
| B | B-perm_state | Permanent State | PERM_STATE | VARCHAR(30) | on-modify | lookup against R | Conditional | BSE/20240223-42 |
| C | C-alternate_email | Alternate Email | ALT_EMAIL | VARCHAR(100) | on-modify | lowercase | Optional | BSE/20240223-42 |
| C | C-alternate_mobile | Alternate Mobile | ALT_MOBILE | VARCHAR(15) | on-modify | [direct] | Optional | BSE/20240223-42 |
| C | C-email | Email Address | EMAIL_ID | VARCHAR(100) | on-modify | lowercase | Mandatory; OTP-validated; client accounts with unverified email marked ON HOLD | BSE/20230819-6 |
| C | C-email_authorised_person | Authorised/Contact Person Name (for Email) | EMAIL_AUTH_NAME | VARCHAR(100) | one-time | [direct] | Dependent field | BSE/20240223-42 |
| C | C-email_relationship | Relationship with Client (for Email) | EMAIL_REL | VARCHAR(20) | one-time | [direct] | Dependent field when email is not self's | BSE/20240223-42 |
| C | C-mobile_isd_code | Mobile ISD Code | ISD_CODE | VARCHAR(5) | on-modify | [direct] | Default +91 | BSE/20240223-42 |
| C | C-mobile_number | Mobile Number | MOBILE_NO | VARCHAR(15) | on-modify | [direct] | Mandatory; OTP-validated via UIDAI/SEBI KYC validation framework | BSE/20230819-6 |
| C | C-phone_number | Landline Number | PHONE_NO | VARCHAR(15) | one-time | [direct] | Optional | BSE/20240223-42 |
| C | C-phone_std_code | Landline STD Code | PHONE_STD | VARCHAR(5) | one-time | [direct] | Optional | BSE/20240223-42 |
| D | D-poi_type | POI Document Type Code | POI_TYPE | CHAR(2) | one-time | [direct] | POI code transmitted in revised UCC | BSE/20240223-42 |
| E | E-poa_type | POA Document Type Code | POA_TYPE | CHAR(2) | one-time | [direct] | POA code; required in onboarding upload | BSE/20240223-42 |
| F | F-declared_annual_income | Declared Annual Income | DECL_INCOME | NUMBER(15,2) | on-modify | [direct] | Optional; supplements income range | BSE/20240223-42 |
| F | F-gross_annual_income_range | Gross Annual Income Range | INCOME_RANGE | CHAR(2) | on-modify | lookup against R | Mandatory in revised UCC; codes 01-06 | BSE/20240223-42 |
| F | F-income_proof_document | Income Proof Document | INC_PROOF_DOC | BLOB ref | one-time | [direct] | Document URI/hash; required for F&O/Commodity | BSE/20240223-42 |
| F | F-income_proof_financial_year | Income Proof Financial Year | INC_PROOF_FY | VARCHAR(9) | one-time | formatted | Format YYYY-YYYY | BSE/20240223-42 |
| F | F-income_proof_type | Income Proof Type | INC_PROOF_TYPE | CHAR(2) | one-time | [direct] | Required for F&O / Commodity segment activation only | BSE/20240223-42 |
| F | F-net_worth | Net Worth | NET_WORTH | NUMBER(15,2) | on-modify | [direct] | Required for F&O segment activation | BSE/20240223-42 |
| F | F-net_worth_date | Net Worth Date | NW_DATE | DATE DD/MM/YYYY | on-modify | formatted | Must be < 1 year old | BSE/20240223-42 |
| F | F-occupation | Occupation | OCCUPATION | CHAR(2) | on-modify | lookup against R | Occupation code table; mandatory | BSE/20240223-42 |
| G | G-account_number | Bank Account Number | BANK_AC_NO | VARCHAR(18) | one-time | [direct] | Up to 5 bank accounts per client (one primary); excludes NRE; name/PAN match against bank mandatory for UPI-block validation | BSE/20231018-39 |
| G | G-account_type | Bank Account Type | BANK_AC_TYPE | CHAR(2) | one-time | [direct] | NRE accounts excluded from UPI-block facility per BSE batch UCC spec | BSE/20231018-39 |
| G | G-ifsc_code | IFSC Code | IFSC | CHAR(11) | one-time | uppercase | Mandatory per revised UCC batch | BSE/20231018-39 |
| G | G-is_primary | Primary Bank Account Flag | BANK_PRIMARY_FLAG | CHAR(1) | one-time | [direct] | Designation of one primary mandatory in revised UCC | BSE/20231018-39 |
| H | H-bo_id | BO ID (Demat) | BO_ID | VARCHAR(16) | one-time | derived from Y | Demat freeze rule applies if KRA flags KYC invalid (BSE 20241202-5) | BSE/20241202-5 |
| H | H-client_id | Demat Client ID | DEMAT_CLIENT_ID | CHAR(8) | one-time | [direct] | Mandatory in UCC batch upload (along with name/PAN match) | BSE/20231018-39 |
| H | H-dp_id | DP ID | DP_ID | CHAR(8) | one-time | [direct] | Up to 5 demat accounts; required for direct-payout-to-demat regime | BSE/20250110-47 |
| J | J-is_tax_resident_of_india_only | India Tax Resident Only | FATCA_IN_ONLY | CHAR(1) | one-time | [direct] | FATCA-CRS impact area on UCC master circulars | BSE/20240223-42 |
| K | K-is_pep | PEP Flag | PEP_FLAG | CHAR(1) | on-modify | [direct] | Y/N declaration for AML/EDD surveillance | BSE/20240223-42 |
| K | K-source_of_funds | Source of Funds | SOURCE_OF_FUNDS | VARCHAR(100) | one-time | [direct] | AML-relevant field; carried into UCC for surveillance | BSE/20240223-42 |
| L | L-exchange_bse | BSE Trading Enabled | EXCH_BSE | CHAR(1) | one-time | [direct] | Triggers UCC registration on BSE | BSE/20240223-42 |
| L | L-exchange_mcx | MCX Trading Enabled | _NA_ | none | one-time | null-if-Z | Not relevant to BSE UCC | BSE/20240223-42 |
| L | L-exchange_nse | NSE Trading Enabled | _NA_ | none | one-time | null-if-Z | Not relevant to BSE UCC; informational only | BSE/20240223-42 |
| L | L-segment_commodity | Commodity Segment | BSE_COM_FLAG | CHAR(1) | one-time | [direct] | BSE commodity segment activation | BSE/20240223-42 |
| L | L-segment_currency | Currency Derivatives Segment | BSE_CD_FLAG | CHAR(1) | one-time | [direct] | Y activates CDS on BSE | BSE/20240223-42 |
| L | L-segment_equity_cash | Equity Cash Segment | BSE_CM_FLAG | CHAR(1) | one-time | [direct] | Y activates Equity Cash on BSE | BSE/20240223-42 |
| L | L-segment_equity_fno | Equity F&O Segment | BSE_FNO_FLAG | CHAR(1) | one-time | [direct] | Y activates F&O on BSE; income-proof tagged | BSE/20240223-42 |
| L | L-trading_experience_commodity_years | Commodity Trading Experience (Years) | COM_EXP_YRS | NUMBER(2) | one-time | [direct] | Required if BSE-COM opted | BSE/20240223-42 |
| L | L-trading_experience_fno_years | F&O Trading Experience (Years) | FNO_EXP_YRS | NUMBER(2) | one-time | [direct] | Required if F&O segment opted | BSE/20240223-42 |
| L | L-upi_block_opted | UPI-Block Facility Opt-in | UPI_FLAG | CHAR(1) | on-modify | [direct] | 'Opt for UPI' field in revised batch UCC; only validated PAN/bank/demat by 4 PM eligible | BSE/20231018-39 |
| U | U-bse_cd_activated | BSE CD Activation Flag | BSE_CD_ACTIVATED | CHAR(1) | on-event | [direct] | Y on approval for BSE Currency Derivatives | BSE/20240223-42 |
| U | U-bse_cm_activated | BSE CM Activation Flag | BSE_CM_ACTIVATED | CHAR(1) | on-event | [direct] | Y on approval for BSE Cash Market | BSE/20240223-42 |
| U | U-bse_fno_activated | BSE F&O Activation Flag | BSE_FNO_ACTIVATED | CHAR(1) | on-event | [direct] | Y on approval for BSE Equity Derivatives | BSE/20240223-42 |
| U | U-bse_ucc_status | BSE UCC Status | BSE_UCC_STATUS | CHAR(2) | on-event | [direct] | Approved/Rejected/On-Hold; post-registration name/DOB modification requires Unfreeze request with re-verification against Protean | BSE/20240223-42 |
| U | U-mcx_client_category | MCX Client Category | _NA_ | none | one-time | null-if-Z | MCX-specific | BSE/20240223-42 |
| U | U-mcx_com_activated | MCX COM Activation Flag | _NA_ | none | on-event | null-if-Z | MCX-specific | BSE/20240223-42 |
| U | U-mcx_error_account | MCX ERROR Account UCC | _NA_ | none | one-time | null-if-Z | MCX-specific | BSE/20240223-42 |
| U | U-mcx_ucc_status | MCX UCC Status | _NA_ | none | on-event | null-if-Z | MCX-specific | BSE/20240223-42 |
| U | U-nse_cd_activated | NSE CD Activation Flag | _NA_ | none | on-event | null-if-Z | NSE-specific | BSE/20240223-42 |
| U | U-nse_cm_activated | NSE CM Activation Flag | _NA_ | none | on-event | null-if-Z | NSE-specific; not on BSE UCC | BSE/20240223-42 |
| U | U-nse_com_activated | NSE COM Activation Flag | _NA_ | none | on-event | null-if-Z | NSE-specific | BSE/20240223-42 |
| U | U-nse_fno_activated | NSE F&O Activation Flag | _NA_ | none | on-event | null-if-Z | NSE-specific | BSE/20240223-42 |
| U | U-nse_ucc_status | NSE UCC Status | _NA_ | none | on-event | null-if-Z | NSE-specific status field | BSE/20240223-42 |
| U | U-suspense_account | Suspense UCC (SUSPE1234N) | SUSPE_UCC | VARCHAR(10) | one-time | [direct] | Cross-exchange industry requirement; back-office only | [industry typical] |
| U | U-ucc_client_type | UCC Client Category | CLIENT_CATEGORY | CHAR(2) | one-time | [direct] | FDI and DR categories split effective Jan 11 2025; existing FDI/DR accounts must be reclassified | BSE/20250110-47 |
| U | U-ucc_code | UCC Code | UCC | VARCHAR(10) | one-time | [direct] | Broker-assigned; primary key in BEFS UCC submission | BSE/20240223-42 |
| U | U-ucc_registration_date | UCC Registration Date | UCC_REG_DT | DATE DD/MM/YYYY | one-time | formatted | BEFS registration date | BSE/20240223-42 |
| Y | Y-account_status | Account Status (Active/Inactive) | UCC_STATUS_FLAG | CHAR(2) | on-event | [direct] | Uniform inactive treatment across MIIs; demat accounts freeze if KRA flags KYC invalid | BSE/20241202-5 |

## Verified through

2026-05-14

---

*AI-generated and not legal advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*

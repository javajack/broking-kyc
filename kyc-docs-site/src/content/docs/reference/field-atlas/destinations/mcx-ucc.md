---
title: "MCX UCC — Fields consumed"
description: "Every field consumed by MCX UCC, with source section, destination format, update frequency, transformation rule, and quirks. Use this when building an integration with this destination."
---

> **Why this page is structured this way:** This is the destination-first view for <abbr title="Multi Commodity Exchange of India">MCX</abbr> <abbr title="Unique Client Code">UCC</abbr>. Engineers building an integration with this destination get the complete field list on one page. To see where each field originated in onboarding, follow the per-section links via the [atlas overview](/broking-kyc/reference/field-atlas/).

## TL;DR

- **86 unique fields** consumed by MCX UCC.
- Source spans sections: A, B, C, D, E, F, G, H, J, K, L, U, Y.
- **86 rows cite a public spec source**; **0** are `[industry typical]`.

## Field-destination rows

Sorted by `source_section`, then `field_id`.

| source_section | field_id | field_name | destination_field_name | destination_format | frequency | transformation | quirks_notes | spec_source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| A | A-aadhaar_number | Aadhaar Number | UID | CHAR(12) | one-time | truncate to N | Masked; not part of canonical MCX UCC fields (<abbr title="Know Your Customer (process).">KYC</abbr>-side only) | MCX/TECH/394/2023 |
| A | A-ckyc_number | <abbr title="Central KYC (records registry)">CKYC</abbr> Identification Number (<abbr title="KYC Identification Number">KIN</abbr>) | CKYC_KIN | CHAR(14) | one-time | [direct] | Optional pass-through field | MCX/TECH/394/2023 |
| A | A-date_of_birth | Date of Birth | DOB | DATE DDMMYYYY | one-time | formatted | Mandatory; included in pipe-delimited record's financial/personal line | MCX/TECH/394/2023 |
| A | A-father_spouse_flag | Father/Spouse Indicator | FATHER_SPOUSE_FLAG | CHAR(1) | one-time | [direct] | F=Father, S=Spouse; flows to <abbr title="Beneficial Owner">BO</abbr> file | MCX/TECH/394/2023 |
| A | A-father_spouse_name | Father/Spouse Name | FATHER_SPOUSE_NAME | VARCHAR(70) | one-time | uppercase | Captured in pipe-delimited record | MCX/TECH/394/2023 |
| A | A-first_name | First Name | FIRST_NAME | VARCHAR(70) | one-time | uppercase | Captured in pipe-delimited 2-row-per-client BO file format | MCX/TECH/394/2023 |
| A | A-full_name | Full Name (Description) | CLIENT_NAME | VARCHAR(200) | one-time | concat with X | Captured as concatenated value in pipe-delimited record | MCX/TECH/394/2023 |
| A | A-gender | Gender | GENDER | CHAR(1) | one-time | [direct] | M/F/T flows in UCC pipe-delimited record | MCX/TECH/394/2023 |
| A | A-last_name | Last Name | LAST_NAME | VARCHAR(70) | one-time | uppercase | Mandatory in UCC record | MCX/TECH/394/2023 |
| A | A-marital_status | Marital Status | MARITAL_STATUS | CHAR(1) | one-time | [direct] | S/M/O | MCX/TECH/394/2023 |
| A | A-middle_name | Middle Name | MIDDLE_NAME | VARCHAR(70) | one-time | uppercase | Optional in pipe-delimited UCC record | MCX/TECH/394/2023 |
| A | A-nationality | Nationality | NATIONALITY | CHAR(2) | one-time | lookup against R | ISO code; required for Foreign category clients | MCX/TECH/394/2023 |
| A | A-pan_number | <abbr title="Permanent Account Number">PAN</abbr> Number | PAN | CHAR(10) | one-time | uppercase | Mandatory in UCC database; also required on ERROR account (must match member's PAN per IT records) | MCX/S&I/644/2024 |
| A | A-prefix | Name Prefix / Salutation | SALUTATION | VARCHAR(5) | one-time | [direct] | Captured in pipe-delimited 2-row record (header line) | MCX/TECH/394/2023 |
| A | A-residential_status | Residential Status | RES_STATUS | CHAR(2) | one-time | [direct] | Drives client category (Foreign category in HE/SP/AR/Farmer/VCP/DFI/Foreign/Other) | MCX/TECH/394/2023 |
| B | B-corr_address_line1 | Correspondence Address Line 1 | CORR_ADDR1 | VARCHAR(100) | on-modify | [direct] | Mandatory in UCC pipe-delimited record; state/city looked up against State-City Master | MCX/S&I/507/2024 |
| B | B-corr_address_line2 | Correspondence Address Line 2 | CORR_ADDR2 | VARCHAR(100) | on-modify | [direct] | Optional in UCC record | MCX/TECH/394/2023 |
| B | B-corr_address_line3 | Correspondence Address Line 3 | CORR_ADDR3 | VARCHAR(100) | on-modify | [direct] | Optional | MCX/TECH/394/2023 |
| B | B-corr_address_proof_type | Correspondence Address Proof Type | ADDR_PROOF_TYPE | CHAR(2) | one-time | [direct] | <abbr title="Power of Attorney">POA</abbr> code; mandatory in onboarding upload | MCX/TECH/394/2023 |
| B | B-corr_city | Correspondence City | CORR_CITY | VARCHAR(50) | on-modify | lookup against R | Validated against State-City Code Master (additions per MCX/S&I/507/2024) | MCX/S&I/507/2024 |
| B | B-corr_country | Correspondence Country | CORR_COUNTRY | VARCHAR(30) | on-modify | [direct] | Default IN; Foreign category triggers separate handling | MCX/TECH/394/2023 |
| B | B-corr_pincode | Correspondence PIN Code | CORR_PIN | CHAR(6) | on-modify | [direct] | 6 digits mandatory in pipe-delimited record | MCX/TECH/394/2023 |
| B | B-corr_state | Correspondence State | CORR_STATE | VARCHAR(30) | on-modify | lookup against R | State-City master code; mandatory | MCX/S&I/507/2024 |
| B | B-perm_address_line1 | Permanent Address Line 1 | PERM_ADDR1 | VARCHAR(100) | on-modify | null-if-Z | Null if perm_same_as_corr=Y | MCX/TECH/394/2023 |
| B | B-perm_city | Permanent City | PERM_CITY | VARCHAR(50) | on-modify | lookup against R | City master lookup | MCX/S&I/507/2024 |
| B | B-perm_country | Permanent Country | PERM_COUNTRY | VARCHAR(30) | on-modify | null-if-Z | Default India | MCX/TECH/394/2023 |
| B | B-perm_pincode | Permanent PIN Code | PERM_PIN | CHAR(6) | on-modify | null-if-Z | Conditional 6-digit | MCX/TECH/394/2023 |
| B | B-perm_same_as_corr | Permanent Same As Correspondence | PERM_SAME_FLAG | CHAR(1) | one-time | [direct] | Y/N flag | MCX/TECH/394/2023 |
| B | B-perm_state | Permanent State | PERM_STATE | VARCHAR(30) | on-modify | lookup against R | State-City master | MCX/S&I/507/2024 |
| C | C-alternate_email | Alternate Email | ALT_EMAIL | VARCHAR(100) | on-modify | lowercase | Optional; relationship code required if non-self | MCX/S&I/663/2024 |
| C | C-alternate_mobile | Alternate Mobile | ALT_MOBILE | VARCHAR(15) | on-modify | [direct] | Optional; relationship code required if non-self | MCX/S&I/663/2024 |
| C | C-email | Email Address | EMAIL_ID | VARCHAR(100) | on-modify | lowercase | Mandatory effective 21 Oct 2024 across all UCC categories; <abbr title="Authorized Person">AP</abbr>/employee personal email triggers Rs.15000 penalty | MCX/S&I/663/2024 |
| C | C-email_authorised_person | Authorised/Contact Person Name (for Email) | EMAIL_AUTH_NAME | VARCHAR(100) | one-time | [direct] | Mandatory dependent on Client Email ID (per MCX/S&I/663/2024) | MCX/S&I/663/2024 |
| C | C-email_relationship | Relationship with Client (for Email) | EMAIL_REL | VARCHAR(20) | one-time | [direct] | Mandatory dependent field of email per MCX/S&I/663/2024 | MCX/S&I/663/2024 |
| C | C-mobile_isd_code | Mobile ISD Code | ISD_CODE | VARCHAR(5) | on-modify | [direct] | Default +91 | MCX/TECH/394/2023 |
| C | C-mobile_number | Mobile Number | MOBILE_NO | VARCHAR(15) | on-modify | [direct] | Mandatory; Rs.15000/client penalty if member/AP personal mobile used | MCX/INSP/270/2025 |
| C | C-phone_number | Landline Number | PHONE_NO | VARCHAR(15) | one-time | [direct] | Optional | MCX/TECH/394/2023 |
| C | C-phone_std_code | Landline STD Code | PHONE_STD | VARCHAR(5) | one-time | [direct] | Optional | MCX/TECH/394/2023 |
| D | D-poi_type | POI Document Type Code | POI_TYPE | CHAR(2) | one-time | [direct] | POI code; mandatory in pipe-delimited record | MCX/TECH/394/2023 |
| E | E-poa_type | POA Document Type Code | POA_TYPE | CHAR(2) | one-time | [direct] | POA code; required in BO file upload | MCX/TECH/394/2023 |
| F | F-declared_annual_income | Declared Annual Income | DECL_INCOME | NUMBER(15,2) | on-modify | [direct] | Optional supplement to income range | MCX/TECH/394/2023 |
| F | F-gross_annual_income_range | Gross Annual Income Range | INCOME_RANGE | CHAR(2) | on-modify | lookup against R | Mandatory; drives income-proof tagging; required for ALL MCX clients (not just F&O) per MCX/S&I/663/2024 | MCX/S&I/663/2024 |
| F | F-income_proof_document | Income Proof Document | INC_PROOF_DOC | BLOB ref | one-time | [direct] | Mandatory for ALL clients; document must be uploaded with UCC submission | MCX/S&I/663/2024 |
| F | F-income_proof_financial_year | Income Proof Financial Year | INC_PROOF_FY | VARCHAR(9) | one-time | formatted | Format YYYY-YYYY; refresh annually for commodity segment | MCX/TECH/394/2023 |
| F | F-income_proof_type | Income Proof Type | INC_PROOF_TYPE | CHAR(2) | one-time | [direct] | MANDATORY for ALL MCX clients (not just derivatives); codes BS/SS/IT/F16/NW/DH/FD | MCX/S&I/663/2024 |
| F | F-net_worth | Net Worth | NET_WORTH | NUMBER(15,2) | on-modify | [direct] | Required (with date) for all commodity segment clients | MCX/TECH/394/2023 |
| F | F-net_worth_date | Net Worth Date | NW_DATE | DATE DDMMYYYY | on-modify | formatted | Must be < 1 year old | MCX/TECH/394/2023 |
| F | F-occupation | Occupation | OCCUPATION | CHAR(2) | on-modify | lookup against R | Required; commodity-segment client risk profiling input | MCX/TECH/394/2023 |
| G | G-account_number | Bank Account Number | BANK_AC_NO | VARCHAR(18) | one-time | [direct] | Primary settlement bank account; required for fund settlement | MCX/TECH/394/2023 |
| G | G-account_type | Bank Account Type | BANK_AC_TYPE | CHAR(2) | one-time | [direct] | SB/CA for settlement | MCX/TECH/394/2023 |
| G | G-ifsc_code | <abbr title="Indian Financial System Code.">IFSC</abbr> Code | IFSC | CHAR(11) | one-time | uppercase | Mandatory | MCX/TECH/394/2023 |
| G | G-is_primary | Primary Bank Account Flag | BANK_PRIMARY_FLAG | CHAR(1) | one-time | [direct] | Primary settlement bank | MCX/TECH/394/2023 |
| H | H-bo_id | BO ID (Demat) | _NA_ | none | one-time | null-if-Z | Not applicable; MCX has no demat dependency for trading account | MCX/TECH/394/2023 |
| H | H-client_id | Demat Client ID | _NA_ | none | one-time | null-if-Z | Not part of MCX UCC; commodity delivery uses Warehouse Receipts (eWHR) | MCX/TECH/394/2023 |
| H | H-dp_id | <abbr title="Depository Participant">DP</abbr> ID | _NA_ | none | one-time | null-if-Z | Demat not required for MCX (cash-settled / warehouse-receipts via ComRIS for delivery) | MCX/TECH/394/2023 |
| J | J-is_tax_resident_of_india_only | India Tax Resident Only | FATCA_IN_ONLY | CHAR(1) | one-time | [direct] | <abbr title="Foreign Account Tax Compliance Act (US)">FATCA</abbr>-<abbr title="Common Reporting Standard">CRS</abbr> tagged in UCC submission per onboarding flow | MCX/TECH/394/2023 |
| K | K-is_pep | <abbr title="Politically Exposed Person">PEP</abbr> Flag | PEP_FLAG | CHAR(1) | on-modify | [direct] | Y/N; <abbr title="Anti-Money Laundering">AML</abbr> metadata into <abbr title="Financial Intelligence Unit — India">FIU-IND</abbr> reporting | MCX/MEM/707/2022 |
| K | K-source_of_funds | Source of Funds | SOURCE_OF_FUNDS | VARCHAR(100) | one-time | [direct] | AML-relevant; <abbr title="Financial Intelligence Unit">FIU</abbr>-IND FINNET 2.0 LOB metadata | MCX/MEM/411/2024 |
| L | L-exchange_bse | <abbr title="BSE Limited (formerly Bombay Stock Exchange)">BSE</abbr> Trading Enabled | _NA_ | none | one-time | null-if-Z | Not relevant to MCX UCC | MCX/TECH/394/2023 |
| L | L-exchange_mcx | MCX Trading Enabled | EXCH_MCX | CHAR(1) | one-time | [direct] | Y triggers MCX UCC registration; required for commodity segment | MCX/TECH/394/2023 |
| L | L-exchange_nse | <abbr title="National Stock Exchange of India">NSE</abbr> Trading Enabled | _NA_ | none | one-time | null-if-Z | Not relevant to MCX UCC | MCX/TECH/394/2023 |
| L | L-segment_commodity | Commodity Segment | MCX_COM_FLAG | CHAR(1) | one-time | [direct] | Y activates trading on MCX; required UCC registration on MCX | MCX/TECH/394/2023 |
| L | L-segment_currency | Currency Derivatives Segment | _NA_ | none | one-time | null-if-Z | Not on MCX | MCX/TECH/394/2023 |
| L | L-segment_equity_cash | Equity Cash Segment | _NA_ | none | one-time | null-if-Z | MCX does not support Equity Cash; field NULL/skipped on MCX UCC | MCX/TECH/394/2023 |
| L | L-segment_equity_fno | Equity F&O Segment | _NA_ | none | one-time | null-if-Z | Not applicable to MCX (commodity-only exchange) | MCX/TECH/394/2023 |
| L | L-trading_experience_commodity_years | Commodity Trading Experience (Years) | COM_EXP_YRS | NUMBER(2) | one-time | [direct] | Mandatory; commodity experience years drives risk profile | MCX/TECH/394/2023 |
| L | L-trading_experience_fno_years | F&O Trading Experience (Years) | _NA_ | none | one-time | null-if-Z | Not applicable to MCX | MCX/TECH/394/2023 |
| L | L-upi_block_opted | <abbr title="Unified Payments Interface">UPI</abbr>-Block Facility Opt-in | _NA_ | none | on-modify | null-if-Z | Not applicable to MCX (commodity segment) | MCX/TECH/394/2023 |
| U | U-bse_cd_activated | BSE CD Activation Flag | _NA_ | none | on-event | null-if-Z | BSE-specific | MCX/TECH/394/2023 |
| U | U-bse_cm_activated | BSE <abbr title="Clearing Member">CM</abbr> Activation Flag | _NA_ | none | on-event | null-if-Z | BSE-specific | MCX/TECH/394/2023 |
| U | U-bse_fno_activated | BSE F&O Activation Flag | _NA_ | none | on-event | null-if-Z | BSE-specific | MCX/TECH/394/2023 |
| U | U-bse_ucc_status | BSE UCC Status | _NA_ | none | on-event | null-if-Z | BSE-specific | MCX/TECH/394/2023 |
| U | U-mcx_client_category | MCX Client Category | CLIENT_CATEGORY_COM | CHAR(2) | one-time | [direct] | Mandatory: HE=Hedger, SP=Speculator, AR=Arbitrageur, Farmer, VCP=Value Chain Participant, DFI, Foreign, Other; bulk disclosure required for COM segment | MCX/TECH/394/2023 |
| U | U-mcx_com_activated | MCX COM Activation Flag | MCX_COM_ACTIVATED | CHAR(1) | on-event | [direct] | Y after MCX UCC approval; commodity-trade-only exchange | MCX/TECH/394/2023 |
| U | U-mcx_error_account | MCX ERROR Account UCC | ERROR_UCC | VARCHAR(10) | one-time | [direct] | Designated 'ERROR' UCC on member's PAN required; only square-off trades allowed; Rs.10000/day penalty for fresh trades | MCX/S&I/644/2024 |
| U | U-mcx_ucc_status | MCX UCC Status | MCX_UCC_STATUS | CHAR(2) | on-event | [direct] | Approved/Rejected/Pending; ERROR account (member PAN as client code 'ERROR') required before placing orders; penalty Rs.10000/month for missing ERROR account | MCX/S&I/644/2024 |
| U | U-nse_cd_activated | NSE CD Activation Flag | _NA_ | none | on-event | null-if-Z | NSE-specific | MCX/TECH/394/2023 |
| U | U-nse_cm_activated | NSE CM Activation Flag | _NA_ | none | on-event | null-if-Z | NSE-specific | MCX/TECH/394/2023 |
| U | U-nse_com_activated | NSE COM Activation Flag | _NA_ | none | on-event | null-if-Z | NSE-specific (MCX has its own COM activation) | MCX/TECH/394/2023 |
| U | U-nse_fno_activated | NSE F&O Activation Flag | _NA_ | none | on-event | null-if-Z | NSE-specific | MCX/TECH/394/2023 |
| U | U-nse_ucc_status | NSE UCC Status | _NA_ | none | on-event | null-if-Z | NSE-specific status field | MCX/TECH/394/2023 |
| U | U-suspense_account | Suspense UCC (SUSPE1234N) | SUSPE_UCC | VARCHAR(10) | one-time | [direct] | Per <abbr title="Multi Commodity Exchange Clearing Corporation Limited">MCXCCL</abbr>/INSP/248/2024: SUSPE1234N for unidentified client funds; must not be created in MCX UCC db; upstream funds by deadline | MCXCCL/INSP/248/2024 |
| U | U-ucc_client_type | UCC Client Category | CLIENT_CATEGORY | CHAR(2) | one-time | [direct] | MCX category set: HE/SP/AR/Farmer/VCP/DFI/Foreign/Other (commodity-specific) | MCX/TECH/394/2023 |
| U | U-ucc_code | UCC Code | UCC | VARCHAR(10) | one-time | [direct] | Broker-assigned; up to 5000 records per file upload (per MCX/S&I/742/2024) | MCX/S&I/742/2024 |
| U | U-ucc_registration_date | UCC Registration Date | UCC_REG_DT | DATE DDMMYYYY | one-time | formatted | Registration date in MCX UCC database | MCX/TECH/394/2023 |
| Y | Y-account_status | Account Status (Active/Inactive) | UCC_STATUS_FLAG | CHAR(2) | on-event | [direct] | Inactive = no trades 24 months on MCX (not 12); pre-flag notification mandatory; messaging restrictions on reactivation | MCX/INSP/716/2024 |

## Verified through

2026-05-14

---

*AI-generated and not legal advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*

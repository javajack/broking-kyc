---
title: "NSE UCC — Fields consumed"
description: "Every field consumed by NSE UCC, with source section, destination format, update frequency, transformation rule, and quirks. Use this when building an integration with this destination."
---

> **Why this page is structured this way:** This is the destination-first view for <abbr title="National Stock Exchange of India">NSE</abbr> <abbr title="Unique Client Code">UCC</abbr>. Engineers building an integration with this destination get the complete field list on one page. To see where each field originated in onboarding, follow the per-section links via the [atlas overview](/broking-kyc/reference/field-atlas/).

## TL;DR

- **86 unique fields** consumed by NSE UCC.
- Source spans sections: A, B, C, D, E, F, G, H, J, K, L, U, Y.
- **86 rows cite a public spec source**; **0** are `[industry typical]`.

## Field-destination rows

Sorted by `source_section`, then `field_id`.

| source_section | field_id | field_name | destination_field_name | destination_format | frequency | transformation | quirks_notes | spec_source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| A | A-aadhaar_number | Aadhaar Number | UID | CHAR(12) | one-time | truncate to N | Masked storage XXXX-XXXX-1234; full Aadhaar never transmitted to exchange UCC | NSE/<abbr title="Investor Service Centre.">ISC</abbr>/61817 |
| A | A-ckyc_number | <abbr title="Central KYC (records registry)">CKYC</abbr> Identification Number (<abbr title="KYC Identification Number">KIN</abbr>) | CKYC_KIN | CHAR(14) | one-time | [direct] | 14-digit KIN; passed for record cross-reference | NSE/ISC/61817 |
| A | A-date_of_birth | Date of Birth | DOB | DATE DDMMYYYY | one-time | formatted | Mandatory for individuals (DOI for non-individuals); part of 3-param Protean check; mismatch = X rejection | NSE/ISC/61817 |
| A | A-father_spouse_flag | Father/Spouse Indicator | FATHER_SPOUSE_FLAG | CHAR(1) | one-time | [direct] | F=Father, S=Spouse | NSE/ISC/61817 |
| A | A-father_spouse_name | Father/Spouse Name | FATHER_SPOUSE_NAME | VARCHAR(70) | one-time | uppercase | Mandatory for <abbr title="Know Your Customer (process).">KYC</abbr>; appears in UCC profile | NSE/ISC/61817 |
| A | A-first_name | First Name | FIRST_NAME | VARCHAR(70) | one-time | uppercase | Mandatory; must match <abbr title="Permanent Account Number">PAN</abbr> card; revised format separates First/Middle/Last | NSE/ISC/61817 |
| A | A-full_name | Full Name (Description) | CLIENT_NAME | VARCHAR(80) | one-time | concat with X | Concat of First+Middle+Last; legacy field still emitted in UCC report; '6666666666'/'notprovided' disallowed | NSE/ISC/47869 |
| A | A-gender | Gender | GENDER | CHAR(1) | one-time | [direct] | M=Male, F=Female, T=Transgender | NSE/ISC/61817 |
| A | A-last_name | Last Name | LAST_NAME | VARCHAR(70) | one-time | uppercase | Mandatory; must match PAN; part of Name in 3-param Protean check | NSE/ISC/61817 |
| A | A-marital_status | Marital Status | MARITAL_STATUS | CHAR(1) | one-time | [direct] | S=Single, M=Married, O=Others | NSE/ISC/61817 |
| A | A-middle_name | Middle Name | MIDDLE_NAME | VARCHAR(70) | one-time | uppercase | Optional; concatenated for legacy fullname callers | NSE/ISC/61817 |
| A | A-nationality | Nationality | NATIONALITY | CHAR(2) | one-time | lookup against R | ISO country code; default IN | NSE/ISC/61817 |
| A | A-pan_number | PAN Number | PAN | CHAR(10) | one-time | uppercase | 3-param check (PAN+Name+DOB) against Protean; rejection: A=approved, X=mismatch; mandatory per NSE/ISC/47869 | NSE/ISC/47869 |
| A | A-prefix | Name Prefix / Salutation | SALUTATION | VARCHAR(5) | one-time | [direct] | Mr/Mrs/Ms/Dr; optional but commonly populated | NSE/ISC/61817 |
| A | A-residential_status | Residential Status | RES_STATUS | CHAR(2) | one-time | [direct] | RI=Resident Indian, <abbr title="Non-Resident Indian">NRI</abbr>, FN=Foreign National, PIO; drives client_type | NSE/ISC/61817 |
| B | B-corr_address_line1 | Correspondence Address Line 1 | CORR_ADDR1 | VARCHAR(100) | on-modify | [direct] | Part of 'Complete Address' mandatory bundle per NSE/ISC/47869 | NSE/ISC/47869 |
| B | B-corr_address_line2 | Correspondence Address Line 2 | CORR_ADDR2 | VARCHAR(100) | on-modify | [direct] | Optional continuation | NSE/ISC/61817 |
| B | B-corr_address_line3 | Correspondence Address Line 3 | CORR_ADDR3 | VARCHAR(100) | on-modify | [direct] | Optional | NSE/ISC/61817 |
| B | B-corr_address_proof_type | Correspondence Address Proof Type | ADDR_PROOF_TYPE | CHAR(2) | one-time | [direct] | <abbr title="Power of Attorney">POA</abbr> code table; submitted with KYC bundle | NSE/ISC/61817 |
| B | B-corr_city | Correspondence City | CORR_CITY | VARCHAR(50) | on-modify | lookup against R | Validated against city code master | NSE/ISC/61817 |
| B | B-corr_country | Correspondence Country | CORR_COUNTRY | VARCHAR(30) | on-modify | [direct] | Default India; ISO code for Foreign clients | NSE/ISC/61817 |
| B | B-corr_pincode | Correspondence PIN Code | CORR_PIN | CHAR(6) | on-modify | [direct] | 6 digits; mandatory bundled with address per NSE/ISC/47869 | NSE/ISC/47869 |
| B | B-corr_state | Correspondence State | CORR_STATE | VARCHAR(30) | on-modify | lookup against R | State code lookup; required field | NSE/ISC/61817 |
| B | B-perm_address_line1 | Permanent Address Line 1 | PERM_ADDR1 | VARCHAR(100) | on-modify | null-if-Z | Required if perm_same_as_corr=N | NSE/ISC/61817 |
| B | B-perm_city | Permanent City | PERM_CITY | VARCHAR(50) | on-modify | lookup against R | Required when permanent address differs | NSE/ISC/61817 |
| B | B-perm_country | Permanent Country | PERM_COUNTRY | VARCHAR(30) | on-modify | null-if-Z | Default India if domestic | NSE/ISC/61817 |
| B | B-perm_pincode | Permanent PIN Code | PERM_PIN | CHAR(6) | on-modify | null-if-Z | 6 digits if perm differs | NSE/ISC/61817 |
| B | B-perm_same_as_corr | Permanent Same As Correspondence | PERM_SAME_FLAG | CHAR(1) | one-time | [direct] | Y/N; drives auto-copy of permanent address fields | NSE/ISC/61817 |
| B | B-perm_state | Permanent State | PERM_STATE | VARCHAR(30) | on-modify | lookup against R | Conditional state code | NSE/ISC/61817 |
| C | C-alternate_email | Alternate Email | ALT_EMAIL | VARCHAR(100) | on-modify | lowercase | Optional; with relationship if non-self | NSE/ISC/61817 |
| C | C-alternate_mobile | Alternate Mobile | ALT_MOBILE | VARCHAR(15) | on-modify | [direct] | Optional; family member with relationship code if used | NSE/ISC/61817 |
| C | C-email | Email Address | EMAIL_ID | VARCHAR(100) | on-modify | lowercase | Mandatory; 'notprovided@notprovided.com' disallowed; clients without valid email by deadline flagged Closed | NSE/ISC/47869 |
| C | C-email_authorised_person | Authorised/Contact Person Name (for Email) | EMAIL_AUTH_NAME | VARCHAR(100) | one-time | [direct] | Mandatory if email is not own; identifies email-receiving authorised person | NSE/ISC/61817 |
| C | C-email_relationship | Relationship with Client (for Email) | EMAIL_REL | VARCHAR(20) | one-time | [direct] | If email is not own; relationship code (Self/Spouse/Parent/Child/Sibling/etc.) | NSE/ISC/61817 |
| C | C-mobile_isd_code | Mobile ISD Code | ISD_CODE | VARCHAR(5) | on-modify | [direct] | Default +91 for Indian residents | NSE/ISC/61817 |
| C | C-mobile_number | Mobile Number | MOBILE_NO | VARCHAR(15) | on-modify | [direct] | Mandatory; '6666666666' explicitly disallowed; member <abbr title="Authorized Person">AP</abbr>/employee personal mobile disallowed | NSE/ISC/47869 |
| C | C-phone_number | Landline Number | PHONE_NO | VARCHAR(15) | one-time | [direct] | Optional landline | NSE/ISC/61817 |
| C | C-phone_std_code | Landline STD Code | PHONE_STD | VARCHAR(5) | one-time | [direct] | Optional landline STD | NSE/ISC/61817 |
| D | D-poi_type | POI Document Type Code | POI_TYPE | CHAR(2) | one-time | [direct] | Aadhaar(E)/PAN(D)/Passport(A)/Voter(B) etc.; transmitted with KYC bundle | NSE/ISC/61817 |
| E | E-poa_type | POA Document Type Code | POA_TYPE | CHAR(2) | one-time | [direct] | POA code; transmitted with KYC bundle | NSE/ISC/61817 |
| F | F-declared_annual_income | Declared Annual Income | DECL_INCOME | NUMBER(15,2) | on-modify | [direct] | INR exact; optional but recommended | NSE/ISC/61817 |
| F | F-gross_annual_income_range | Gross Annual Income Range | INCOME_RANGE | CHAR(2) | on-modify | lookup against R | Mandatory per NSE/ISC/47869; codes 01-06; <abbr title="Securities and Exchange Board of India">SEBI</abbr> Jan 2026 proposes revised ranges | NSE/ISC/47869 |
| F | F-income_proof_document | Income Proof Document | INC_PROOF_DOC | BLOB ref | one-time | [direct] | Document URI/hash; required for F&O/Commodity | NSE/ISC/61817 |
| F | F-income_proof_financial_year | Income Proof Financial Year | INC_PROOF_FY | VARCHAR(9) | one-time | formatted | Format YYYY-YYYY; refresh annually for F&O clients | NSE/ISC/61817 |
| F | F-income_proof_type | Income Proof Type | INC_PROOF_TYPE | CHAR(2) | one-time | [direct] | Required for F&O / Commodity segment activation only | NSE/ISC/61817 |
| F | F-net_worth | Net Worth | NET_WORTH | NUMBER(15,2) | on-modify | [direct] | Required for F&O segment activation; INR Lakhs | NSE/ISC/61817 |
| F | F-net_worth_date | Net Worth Date | NW_DATE | DATE DDMMYYYY | on-modify | formatted | Must be < 1 year old at submission | NSE/ISC/61817 |
| F | F-occupation | Occupation | OCCUPATION | CHAR(2) | on-modify | lookup against R | Occupation code table (01-11, 99); flows to UCC profile | NSE/ISC/61817 |
| G | G-account_number | Bank Account Number | BANK_AC_NO | VARCHAR(18) | one-time | [direct] | Primary bank account; flows to UCC for direct-payout regime per NSE/INSP/64509 (UCC-demat mapping) | NSE/INSP/64509 |
| G | G-account_type | Bank Account Type | BANK_AC_TYPE | CHAR(2) | one-time | [direct] | SB/CA/<abbr title="Non-Resident External (Rupee) account">NRE</abbr>/<abbr title="Non-Resident Ordinary (Rupee) account">NRO</abbr>; NRE accounts excluded from <abbr title="Unified Payments Interface">UPI</abbr>-block facility | NSE/ISC/61817 |
| G | G-ifsc_code | <abbr title="Indian Financial System Code.">IFSC</abbr> Code | IFSC | CHAR(11) | one-time | uppercase | 11-char IFSC; mandatory for primary bank in UCC | NSE/ISC/61817 |
| G | G-is_primary | Primary Bank Account Flag | BANK_PRIMARY_FLAG | CHAR(1) | one-time | [direct] | Exactly one Y across up to 5 accounts | NSE/ISC/61817 |
| H | H-bo_id | <abbr title="Beneficial Owner">BO</abbr> ID (Demat) | BO_ID | VARCHAR(16) | one-time | derived from Y | Derived dp_id+client_id; required for UCC-demat validation by depositories | NSE/ISC/64984 |
| H | H-client_id | Demat Client ID | DEMAT_CLIENT_ID | CHAR(8) | one-time | [direct] | Part of UCC-demat mapping bundle | NSE/ISC/64984 |
| H | H-dp_id | <abbr title="Depository Participant">DP</abbr> ID | DP_ID | CHAR(8) | one-time | [direct] | Required for UCC-demat mapping per direct-payout regime (NSE/ISC/64984) | NSE/ISC/64984 |
| J | J-is_tax_resident_of_india_only | India Tax Resident Only | FATCA_IN_ONLY | CHAR(1) | one-time | [direct] | Y simplifies UCC; N triggers <abbr title="Foreign Account Tax Compliance Act (US)">FATCA</abbr> tax-country annex | NSE/ISC/61817 |
| K | K-is_pep | <abbr title="Politically Exposed Person">PEP</abbr> Flag | PEP_FLAG | CHAR(1) | on-modify | [direct] | Y/N; triggers EDD; surveillance reference | NSE/ISC/61817 |
| K | K-source_of_funds | Source of Funds | SOURCE_OF_FUNDS | VARCHAR(100) | one-time | [direct] | Salary/Business/Investments/Inheritance; <abbr title="KYC Registration Agency">KRA</abbr>/<abbr title="Anti-Money Laundering">AML</abbr> tagging | NSE/ISC/61817 |
| L | L-exchange_bse | <abbr title="BSE Limited (formerly Bombay Stock Exchange)">BSE</abbr> Trading Enabled | _NA_ | none | one-time | null-if-Z | Not relevant to NSE UCC | NSE/ISC/61817 |
| L | L-exchange_mcx | <abbr title="Multi Commodity Exchange of India">MCX</abbr> Trading Enabled | _NA_ | none | one-time | null-if-Z | Not relevant to NSE UCC | NSE/ISC/61817 |
| L | L-exchange_nse | NSE Trading Enabled | EXCH_NSE | CHAR(1) | one-time | [direct] | Triggers UCC registration on NSE | NSE/ISC/61817 |
| L | L-segment_commodity | Commodity Segment | NSE_COM_FLAG | CHAR(1) | one-time | [direct] | Y activates COM (commodity) segment on NSE; income proof required | NSE/ISC/61817 |
| L | L-segment_currency | Currency Derivatives Segment | NSE_CD_FLAG | CHAR(1) | one-time | [direct] | Y activates Currency Derivatives on NSE | NSE/ISC/61817 |
| L | L-segment_equity_cash | Equity Cash Segment | NSE_CM_FLAG | CHAR(1) | one-time | [direct] | Y activates Cash Market (<abbr title="Clearing Member">CM</abbr>) segment on NSE UCC | NSE/ISC/61817 |
| L | L-segment_equity_fno | Equity F&O Segment | NSE_FNO_FLAG | CHAR(1) | one-time | [direct] | Y activates F&O on NSE; requires income proof at UCC level | NSE/ISC/61817 |
| L | L-trading_experience_commodity_years | Commodity Trading Experience (Years) | COM_EXP_YRS | NUMBER(2) | one-time | [direct] | Required if NSE-COM opted; 0-50 | NSE/ISC/61817 |
| L | L-trading_experience_fno_years | F&O Trading Experience (Years) | FNO_EXP_YRS | NUMBER(2) | one-time | [direct] | Required if F&O segment opted; 0-50 | NSE/ISC/61817 |
| L | L-upi_block_opted | UPI-Block Facility Opt-in | UPI_BLOCK_FLAG | CHAR(1) | on-modify | [direct] | <abbr title="Applications Supported by Blocked Amount">ASBA</abbr>-like Trading Supported by Blocked Amount; deregistration T-day effective T-day | <abbr title="NSE Clearing Limited (formerly National Securities Clearing Corporation Limited)">NCL</abbr>/CMPT/63735 |
| U | U-bse_cd_activated | BSE CD Activation Flag | _NA_ | none | on-event | null-if-Z | BSE-specific | NSE/ISC/61817 |
| U | U-bse_cm_activated | BSE CM Activation Flag | _NA_ | none | on-event | null-if-Z | BSE-specific | NSE/ISC/61817 |
| U | U-bse_fno_activated | BSE F&O Activation Flag | _NA_ | none | on-event | null-if-Z | BSE-specific | NSE/ISC/61817 |
| U | U-bse_ucc_status | BSE UCC Status | _NA_ | none | on-event | null-if-Z | BSE-specific status | NSE/ISC/61817 |
| U | U-mcx_client_category | MCX Client Category | _NA_ | none | one-time | null-if-Z | MCX-specific | NSE/ISC/61817 |
| U | U-mcx_com_activated | MCX COM Activation Flag | _NA_ | none | on-event | null-if-Z | MCX-specific | NSE/ISC/61817 |
| U | U-mcx_error_account | MCX ERROR Account UCC | _NA_ | none | one-time | null-if-Z | MCX-specific operational requirement | NSE/ISC/61817 |
| U | U-mcx_ucc_status | MCX UCC Status | _NA_ | none | on-event | null-if-Z | MCX-specific | NSE/ISC/61817 |
| U | U-nse_cd_activated | NSE CD Activation Flag | NSE_CD_ACTIVATED | CHAR(1) | on-event | [direct] | Y on approval for Currency Derivatives segment | NSE/ISC/61817 |
| U | U-nse_cm_activated | NSE CM Activation Flag | NSE_CM_ACTIVATED | CHAR(1) | on-event | [direct] | Y on UCC approval for CM segment | NSE/ISC/61817 |
| U | U-nse_com_activated | NSE COM Activation Flag | NSE_COM_ACTIVATED | CHAR(1) | on-event | [direct] | Y on approval for NSE Commodity segment (bulk category-disclosure required per master) | NSE/ISC/61817 |
| U | U-nse_fno_activated | NSE F&O Activation Flag | NSE_FNO_ACTIVATED | CHAR(1) | on-event | [direct] | Y on UCC approval for F&O; income-proof check | NSE/ISC/61817 |
| U | U-nse_ucc_status | NSE UCC Status | NSE_UCC_STATUS | CHAR(2) | on-event | [direct] | A=Approved, X=Mismatch/Rejected (3-param Protean failure), Active/Inactive/Closed status; 'Closed' for incomplete data clients | NSE/ISC/47869 |
| U | U-suspense_account | Suspense UCC (SUSPE1234N) | SUSPE_UCC | VARCHAR(10) | one-time | [direct] | Designated 'SUSPE1234N' on member PAN for unidentified credits; not created in Exchange UCC db (no orders allowed); deadline Dec 19 2024 | NSE/INSP/68566 |
| U | U-ucc_client_type | UCC Client Category | CLIENT_CATEGORY | CHAR(2) | one-time | [direct] | IN=Individual, HU=<abbr title="Hindu Undivided Family">HUF</abbr>, NR=NRI, CO=Corporate; FDI/DR split applies | NSE/ISC/61817 |
| U | U-ucc_code | UCC Code | UCC | VARCHAR(10) | one-time | [direct] | Broker-assigned alphanumeric code; primary key for client on NSE UCI Online | NSE/ISC/61817 |
| U | U-ucc_registration_date | UCC Registration Date | UCC_REG_DT | DATE DDMMYYYY | one-time | formatted | Date of initial upload to UCI Online | NSE/ISC/61817 |
| Y | Y-account_status | Account Status (Active/Inactive) | UCC_STATUS_FLAG | CHAR(2) | on-event | [direct] | No trades 12 months = 'Inactive'; reactivation requires fresh due diligence and <abbr title="In-Person Verification">IPV</abbr> | NSE/INSP/43488 |

## Verified through

2026-05-14

---

*AI-generated and not legal advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*

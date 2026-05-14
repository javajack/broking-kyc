---
title: "CDSL BO Opening — Fields consumed"
description: "Every field consumed by CDSL BO Opening, with source section, destination format, update frequency, transformation rule, and quirks. Use this when building an integration with this destination."
---

> **Why this page is structured this way:** This is the destination-first view for <abbr title="Central Depository Services (India) Limited">CDSL</abbr> <abbr title="Beneficial Owner">BO</abbr> Opening. Engineers building an integration with this destination get the complete field list on one page. To see where each field originated in onboarding, follow the per-section links via the [atlas overview](/broking-kyc/reference/field-atlas/).

## TL;DR

- **107 unique fields** consumed by CDSL BO Opening.
- Source spans sections: A, B, C, G, H, I, O.
- **108 rows cite a public spec source**; **0** are `[industry typical]`.

## Field-destination rows

Sorted by `source_section`, then `field_id`.

| source_section | field_id | field_name | destination_field_name | destination_format | frequency | transformation | quirks_notes | spec_source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| A | A-aadhaar_number | Aadhaar (Masked) | AADHAAR_MASKED | CHAR(12) | one-time | formatted | First 8 digits replaced with 'X', last 4 visible per CDSL/OPS/<abbr title="Depository Participant">DP</abbr>/SYSTM/2024/628; line 01 reserved position; full Aadhaar never stored | CDSL/OPS/DP/SYSTM/2024/628 |
| A | A-ckyc_number | <abbr title="Central KYC (records registry)">CKYC</abbr> Number | CKYC_KIN | CHAR(14) | one-time | [direct] | 14-digit <abbr title="KYC Identification Number">KIN</abbr> captured at BO opening from CKYCRR fetch; right-aligned with leading zeros | CDSL/OPS/DP/POLCY/2024/312 |
| A | A-country_of_birth | Country of Birth | COUNTRY_OF_BIRTH | CHAR(2) | one-time | lookup against R | ISO 3166-1 alpha-2; required for <abbr title="Foreign Account Tax Compliance Act (US)">FATCA</abbr> flag captured at <abbr title="KYC Registration Agency">KRA</abbr> but echoed in BO | CDSL/OPS/DP/POLCY/2024/107 |
| A | A-date_of_birth | Date of Birth | DOB | CHAR(8) | one-time | formatted | Reformat DD/MM/YYYY to YYYYMMDD in line 01; right-aligned positional; must match <abbr title="Permanent Account Number">PAN</abbr> record DOB | CDSL/OPS/DP/SYSTM/2023/119 |
| A | A-din | Director Identification Number | DIN_NUMBER | CHAR(8) | one-time | [direct] | 8-digit DIN; optional; right-padded | CDSL/OPS/DP/POLCY/2024/208 |
| A | A-father_spouse_flag | Father/Spouse Flag | FATHER_SPOUSE_FLAG | CHAR(1) | one-time | [direct] | Single position in line 01: 'F' or 'S'; mandatory | CDSL/OPS/DP/SYSTM/2023/119 |
| A | A-father_spouse_name | Father/Spouse Name | FATHER_OR_SPOUSE_NAME | CHAR(70) | one-time | uppercase | Right-padded; mandatory per CDSL operating instructions; line 01 positional field | CDSL/OPS/DP/SYSTM/2023/119 |
| A | A-first_name | First Name | FIRST_HOLDER_FIRST_NAME | CHAR(40) | one-time | uppercase | Right-padded with spaces in fixed-length record line 01; must match PAN exactly (4th-char tolerance only); rejects mismatch >2 chars | CDSL/OPS/DP/SYSTM/2023/119 |
| A | A-full_name | Full Name | FIRST_HOLDER_FULL_NAME | CHAR(120) | one-time | concat with X | Concatenation of First+Middle+Last with single-space separator; right-padded; max 120 char window in line 01 | CDSL/OPS/DP/SYSTM/2023/119 |
| A | A-gender | Gender | GENDER | CHAR(1) | one-time | [direct] | Single char position M/F/T; mandatory in line 01 | CDSL/OPS/DP/SYSTM/2023/119 |
| A | A-last_name | Last Name | FIRST_HOLDER_LAST_NAME | CHAR(40) | one-time | uppercase | Right-padded with spaces; mandatory; rejection code 'NAME MISMATCH' if differs from PAN record returned by Protean | CDSL/OPS/DP/SYSTM/2023/119 |
| A | A-marital_status | Marital Status | MARITAL_STATUS | CHAR(1) | one-time | [direct] | Optional code S/M/O in line 01 reserved position | CDSL/OPS/DP/POLCY/2024/208 |
| A | A-middle_name | Middle Name | FIRST_HOLDER_MIDDLE_NAME | CHAR(40) | one-time | uppercase | Right-padded with spaces; optional field but positions in line 01 are reserved; blank fill if absent | CDSL/OPS/DP/SYSTM/2023/119 |
| A | A-mother_name | Mother's Name | MOTHER_NAME | CHAR(70) | one-time | uppercase | Optional position in line 01; blank-pad with spaces if absent | CDSL/OPS/DP/POLCY/2024/208 |
| A | A-nationality | Nationality | NATIONALITY | CHAR(2) | one-time | lookup against R | ISO 3166-1 alpha-2 country code mapped from CDSL nationality code table; IN for Indian; line 02 position | CDSL/OPS/DP/SYSTM/2023/119 |
| A | A-pan_aadhaar_seeding_status | PAN-Aadhaar Linkage Status | PAN_AADHAAR_LINK | CHAR(1) | on-event | [direct] | Y/N; freeze reason code 39 if N (CDSL POLCY/2023/643); resolved per <abbr title="Securities and Exchange Board of India">SEBI</abbr> May 14, 2024 simplification | CDSL/OPS/DP/POLCY/2023/643 |
| A | A-pan_exempt | PAN Exempt Flag | PAN_EXEMPT_FLAG | CHAR(1) | one-time | [direct] | Y/N flag for specific govt categories; if Y, PAN field may be blank-padded | CDSL/OPS/DP/POLCY/2024/208 |
| A | A-pan_number | PAN Number | FIRST_HOLDER_PAN | CHAR(10) | one-time | uppercase | Line 01 of BO opening fixed-length record; 4th char must be 'P' for Individual; right-padded with spaces; PAN-flag finalization 5-7 days post-opening before trading enabled | CDSL/OPS/DP/SYSTM/2023/119 |
| A | A-pan_verify_status | PAN Flag Status | PAN_FLAG_STATUS | CHAR(1) | on-event | [direct] | Final gate before trading: PAN flag finalization 5-7 days after BO opening once Income Tax Department validates; values P=Pending, V=Valid, X=Invalid; account remains in suspended state until V | CDSL/OPS/DP/POLCY/2026/234 |
| A | A-place_of_birth | Place of Birth | PLACE_OF_BIRTH | CHAR(50) | one-time | [direct] | Optional; right-padded with spaces | CDSL/OPS/DP/POLCY/2024/208 |
| A | A-prefix | Name Prefix | FIRST_HOLDER_PREFIX | CHAR(5) | one-time | [direct] | Salutation Mr/Mrs/Ms/Dr; right-padded; line 01 | CDSL/OPS/DP/POLCY/2024/208 |
| A | A-residential_status | Residential Status | RES_STATUS | CHAR(2) | one-time | lookup against R | Code table RI/NR/FN/PI; affects BO sub-status code in line 02; <abbr title="Non-Resident Indian">NRI</abbr> sub-type triggers separate flow | CDSL/OPS/DP/SYSTM/2023/119 |
| A | A-residential_status | NRI Sub-Status Code | BO_SUB_STATUS | CHAR(2) | one-time | lookup against R | 2-char BO sub-status code; e.g. NRI Repatriable=22, NRI Non-Repatriable=23; line 02 | CDSL/OPS/DP/SYSTM/2023/119 |
| B | B-corr_address_line1 | Correspondence Address Line 1 | CORR_ADDR_LINE_1 | CHAR(40) | on-modify | truncate to N | Line 02 of fixed-length file; truncate to 40 chars; right-pad with spaces; rejection if Line1 blank | CDSL/OPS/DP/SYSTM/2023/119 |
| B | B-corr_address_line2 | Correspondence Address Line 2 | CORR_ADDR_LINE_2 | CHAR(40) | on-modify | truncate to N | Line 02 positional; optional; right-pad with spaces if absent | CDSL/OPS/DP/SYSTM/2023/119 |
| B | B-corr_address_line3 | Correspondence Address Line 3 | CORR_ADDR_LINE_3 | CHAR(40) | on-modify | truncate to N | Line 02 positional; optional | CDSL/OPS/DP/SYSTM/2023/119 |
| B | B-corr_address_proof_type | Correspondence Address Proof Type | ADDR_PROOF_TYPE | CHAR(2) | one-time | lookup against R | <abbr title="Power of Attorney">POA</abbr> code table (A=Passport, B=Voter, etc.); mandatory in line 02 | CDSL/OPS/DP/SYSTM/2023/119 |
| B | B-corr_city | Correspondence City | CORR_CITY | CHAR(35) | on-modify | truncate to N | Right-pad with spaces; mandatory in line 02 | CDSL/OPS/DP/SYSTM/2023/119 |
| B | B-corr_country | Correspondence Country | CORR_COUNTRY | CHAR(2) | on-modify | lookup against R | ISO 3166-1 alpha-2; default IN; line 02 | CDSL/OPS/DP/SYSTM/2023/119 |
| B | B-corr_pincode | Correspondence Pincode | CORR_PINCODE | CHAR(6) | on-modify | [direct] | 6-digit numeric; mandatory; right-padded with leading zeros if needed | CDSL/OPS/DP/SYSTM/2023/119 |
| B | B-corr_state | Correspondence State | CORR_STATE | CHAR(2) | on-modify | lookup against R | CDSL state code table (2 chars); mandatory; rejection if invalid code | CDSL/OPS/DP/SYSTM/2023/119 |
| B | B-perm_address_line1 | Permanent Address Line 1 | PERM_ADDR_LINE_1 | CHAR(40) | on-modify | truncate to N | Line 03 of fixed-length; truncate to 40; right-pad with spaces; mandatory if perm_same_as_corr=N | CDSL/OPS/DP/SYSTM/2023/119 |
| B | B-perm_city | Permanent City | PERM_CITY | CHAR(35) | on-modify | truncate to N | Line 03 positional; conditional on perm_same_as_corr=N | CDSL/OPS/DP/SYSTM/2023/119 |
| B | B-perm_country | Permanent Country | PERM_COUNTRY | CHAR(2) | on-modify | lookup against R | ISO 3166-1 alpha-2 | CDSL/OPS/DP/SYSTM/2023/119 |
| B | B-perm_pincode | Permanent Pincode | PERM_PINCODE | CHAR(6) | on-modify | [direct] | 6-digit numeric | CDSL/OPS/DP/SYSTM/2023/119 |
| B | B-perm_same_as_corr | Permanent Same as Correspondence | PERM_SAME_FLAG | CHAR(1) | one-time | [direct] | Y/N; if Y then permanent address fields blank-padded; line 03 position | CDSL/OPS/DP/SYSTM/2023/119 |
| B | B-perm_state | Permanent State | PERM_STATE | CHAR(2) | on-modify | lookup against R | CDSL state code; line 03 | CDSL/OPS/DP/SYSTM/2023/119 |
| B | B-poa_address_same_as_corr | POA Same as Correspondence | POA_SAME_FLAG | CHAR(1) | one-time | [direct] | Y/N flag; POA document address same as corr address | CDSL/OPS/DP/SYSTM/2023/119 |
| C | C-alternate_email | Alternate Email | ALT_EMAIL | CHAR(100) | on-modify | lowercase | Optional | CDSL/OPS/DP/POLCY/2024/208 |
| C | C-alternate_mobile | Alternate Mobile | ALT_MOBILE | CHAR(15) | on-modify | [direct] | Line 04 optional position; right-padded | CDSL/OPS/DP/POLCY/2024/208 |
| C | C-email | Email | EMAIL_ID | CHAR(100) | on-modify | lowercase | Line 04 fixed-length; mandatory per CDSL POLCY/2021/152; right-padded with spaces; RFC 5322 validation; e-CAS sent to this address | CDSL/OPS/DP/POLCY/2021/152 |
| C | C-email_validated | Email Validated | EMAIL_OTP_VALIDATED | CHAR(1) | one-time | [direct] | Y/N; email <abbr title="One-Time Password">OTP</abbr>/link validation | CDSL/OPS/DP/POLCY/2021/152 |
| C | C-mobile_isd_code | Mobile ISD Code | MOBILE_ISD | CHAR(5) | on-modify | [direct] | Line 04 fixed-length position; default +91 for India; right-padded | CDSL/OPS/DP/SYSTM/2023/119 |
| C | C-mobile_number | Mobile Number | MOBILE_NUMBER | CHAR(15) | on-modify | [direct] | Line 04; mandatory per CDSL POLCY/2021/152 (six mandatory <abbr title="Know Your Customer (process).">KYC</abbr> attributes); 10 digit India must start 6/7/8/9; rejection on invalid pattern | CDSL/OPS/DP/POLCY/2021/152 |
| C | C-mobile_validated | Mobile Validated | MOBILE_OTP_VALIDATED | CHAR(1) | one-time | [direct] | Y/N; OTP validation flag; mandatory under SEBI six attributes | CDSL/OPS/DP/POLCY/2021/152 |
| C | C-phone_number | Landline Number | PHONE_NUMBER | CHAR(15) | one-time | [direct] | Optional line 04 position | CDSL/OPS/DP/SYSTM/2023/119 |
| C | C-phone_std_code | Landline STD Code | PHONE_STD | CHAR(5) | one-time | [direct] | Optional line 04 position; right-padded | CDSL/OPS/DP/SYSTM/2023/119 |
| G | G-account_holder_name | Bank Account Holder Name | BANK_HOLDER_NAME | CHAR(100) | on-modify | uppercase | Right-padded; must match first-holder name; mismatch flagged for compliance review | CDSL/OPS/DP/SYSTM/2023/119 |
| G | G-account_number | Bank Account Number | BANK_ACCT_NO | CHAR(18) | on-modify | [direct] | Line 05 mandatory; alphanumeric; right-padded with spaces; used by issuer/RTA for direct credit per DP2026-316 | CDSL/OPS/DP/POLCY/2026/316 |
| G | G-account_type | Bank Account Type | BANK_ACCT_TYPE | CHAR(2) | on-modify | lookup against R | Code SB/CA/<abbr title="Non-Resident External (Rupee) account">NRE</abbr>/<abbr title="Non-Resident Ordinary (Rupee) account">NRO</abbr>; line 05; NRE/NRO triggers NRI sub-status validation | CDSL/OPS/DP/SYSTM/2023/119 |
| G | G-bank_account_seq | Bank Account Sequence | BANK_SEQ | CHAR(1) | on-modify | [direct] | 1-5 sequence number; primary marked separately | CDSL/OPS/DP/SYSTM/2023/119 |
| G | G-bank_name | Bank Name (Payout) | BANK_NAME | CHAR(100) | on-modify | uppercase | Line 05 fixed-length; right-pad with spaces; used for dividend/interest/redemption payouts directly to BO | CDSL/OPS/DP/SYSTM/2023/119 |
| G | G-bank_proof_type | Bank Proof Type | BANK_PROOF_TYPE | CHAR(2) | one-time | lookup against R | Code <abbr title="Clearing Corporation (NCL, ICCL, MCXCCL — context-dependent).">CC</abbr>=Cancelled Cheque, BS=Bank Statement; mandatory | CDSL/OPS/DP/SYSTM/2023/119 |
| G | G-branch_name | Bank Branch Name | BRANCH_NAME | CHAR(100) | on-modify | uppercase | Line 05; right-padded | CDSL/OPS/DP/SYSTM/2023/119 |
| G | G-ifsc_code | <abbr title="Indian Financial System Code.">IFSC</abbr> Code | IFSC_CODE | CHAR(11) | on-modify | uppercase | Pattern [A-Z]{4}0[A-Z0-9]{6}; mandatory line 05; rejection on invalid IFSC | CDSL/OPS/DP/SYSTM/2023/119 |
| G | G-is_primary | Primary Bank Flag | PRIMARY_BANK_FLAG | CHAR(1) | on-modify | [direct] | Y/N; exactly one Y per BO; line 05; payouts default to primary | CDSL/OPS/DP/SYSTM/2023/119 |
| G | G-micr_code | MICR Code | MICR_CODE | CHAR(9) | on-modify | [direct] | 9-digit numeric; optional line 05; left-padded with zeros | CDSL/OPS/DP/SYSTM/2023/119 |
| H | H-account_status | BO Account Status | ACCT_STATUS | CHAR(2) | on-event | lookup against R | Code AC=Active, FR=Frozen, CL=Closed, SU=Suspended; auto-updated on KRA validation failure (CDSL/OPS/DP/POLCY/2026/234) | CDSL/OPS/DP/POLCY/2026/234 |
| H | H-account_type | BO Account Type | ACCT_TYPE | CHAR(2) | one-time | lookup against R | Code IN=Individual, JO=Joint, MN=Minor, HU=<abbr title="Hindu Undivided Family">HUF</abbr>; line 06 | CDSL/OPS/DP/POLCY/2022/115 |
| H | H-bo_id | BO ID | BO_ID | CHAR(16) | one-time | concat with X | Concatenation DP_ID (8 digit) + CLIENT_ID (8 digit) = 16-digit numeric; line 06; primary key | CDSL/OPS/DP/SYSTM/2023/119 |
| H | H-bo_status_code | BO Status Code | BO_STATUS_CODE | CHAR(2) | one-time | lookup against R | 2-char primary status code (Resident, NRI, FN, etc.) different from sub-status; line 02 | CDSL/OPS/DP/SYSTM/2023/119 |
| H | H-bsda_flag | BSDA Flag | BSDA_FLAG | CHAR(1) | one-time | [direct] | Y/N; line 06; default Y at opening per CDSL practice; opt-out by email consent | CDSL/OPS/DP/POLCY/2024/208 |
| H | H-bsda_optout_consent_date | BSDA Opt-Out Consent Date | BSDA_OPTOUT_DATE | CHAR(8) | one-time | formatted | YYYYMMDD if BSDA opt-out; required by V2.0.0.0; CDSL aligns to <abbr title="National Securities Depository Limited">NSDL</abbr> convention | CDSL/OPS/DP/POLCY/2024/208 |
| H | H-client_id | Client ID | CLIENT_ID | CHAR(8) | one-time | [direct] | 8-digit numeric assigned by DP within their range; line 06 positional | CDSL/OPS/DP/SYSTM/2023/119 |
| H | H-cusps_account_flag | <abbr title="Client Unpaid Securities Pledgee Account.">CUSPA</abbr> Indicator | CUSPA_FLAG | CHAR(1) | one-time | [direct] | Y/N for Client Unpaid Securities Pledgee Account | CDSL/OPS/DP/SYSTM/2023/119 |
| H | H-depository | Depository | DEPOSITORY | CHAR(4) | one-time | [direct] | Hardcoded 'CDSL' in line 06 header | CDSL/OPS/DP/SYSTM/2023/119 |
| H | H-dp_id | DP ID | DP_ID | CHAR(8) | one-time | [direct] | 8-digit numeric assigned by CDSL; first segment of BO ID; line 06 | CDSL/OPS/DP/SYSTM/2023/119 |
| H | H-holding_type | Holding Pattern | HOLDING_PATTERN | CHAR(2) | one-time | lookup against R | SI=Single, J2=Joint(2), J3=Joint(3); line 06; second/third holder triggers replication of line 01-02 | CDSL/OPS/DP/SYSTM/2023/119 |
| H | H-ifsc_branch | First Holder IFSC | FIRST_HOLDER_IFSC | CHAR(11) | on-modify | uppercase | Bank IFSC linked at BO level for payouts; same as G-ifsc_code | CDSL/OPS/DP/SYSTM/2023/119 |
| H | H-income_range | Income Range | INCOME_RANGE | CHAR(2) | one-time | lookup against R | Income range code 01-06; mandatory per CDSL POLCY/2021/152 | CDSL/OPS/DP/POLCY/2021/152 |
| H | H-lei_number | Legal Entity Identifier | LEI_NUMBER | CHAR(20) | on-modify | uppercase | 20-char LEI for non-individual; freeze reason 30 on expiry per CDSL/OPS/DP/POLCY/2024/51 | CDSL/OPS/DP/POLCY/2024/51 |
| H | H-occupation | Occupation | OCCUPATION_CODE | CHAR(2) | one-time | lookup against R | Occupation code 01-11/99; mandatory line 06; harmonized with KRA | CDSL/OPS/DP/POLCY/2021/152 |
| H | H-opening_date | BO Account Opening Date | OPENING_DATE | CHAR(8) | one-time | formatted | YYYYMMDD format in line 06; right-aligned | CDSL/OPS/DP/SYSTM/2023/119 |
| H | H-operation_mode | Operation Mode | OPERATION_MODE | CHAR(2) | one-time | lookup against R | Code ES=Either or Survivor, AS=Anyone or Survivor, JO=Jointly; mandatory for joint | CDSL/OPS/DP/SYSTM/2023/119 |
| H | H-pms_manager_flag | <abbr title="Portfolio Management Services">PMS</abbr> Manager Indicator | PMS_MGR_FLAG | CHAR(1) | one-time | [direct] | Purpose code 23 in BO setup if PMS sub-type per CDSL/OPS/DP/SYSTM/2023/280 | CDSL/OPS/DP/SYSTM/2023/280 |
| H | H-purpose_code | BO Purpose Code | BO_PURPOSE_CODE | CHAR(2) | one-time | lookup against R | CDSL purpose code; 23 for PMS, others per CDSL/OPS/DP/SYSTM/2023/280 | CDSL/OPS/DP/SYSTM/2023/280 |
| H | H-ucc_code | <abbr title="Unique Client Code">UCC</abbr> Mapping | UCC_CODE | CHAR(10) | on-modify | [direct] | UCC mapped at BO level per CDSL/OPS/DP/POLCY/2020/141; line 06 | CDSL/OPS/DP/POLCY/2020/141 |
| I | I-guardian_address | Guardian Address | GUARDIAN_ADDRESS | CHAR(255) | on-modify | truncate to N | Mandatory if minor nominee; right-padded | CDSL/OPS/DP/POLCY/2025/289 |
| I | I-guardian_name | Guardian Name (Minor Nominee) | GUARDIAN_NAME | CHAR(100) | on-modify | uppercase | Conditional in line 07; mandatory if nominee_is_minor=Y | CDSL/OPS/DP/POLCY/2025/289 |
| I | I-guardian_pan | Guardian PAN | GUARDIAN_PAN | CHAR(10) | on-modify | uppercase | Conditional on nominee_is_minor=Y | CDSL/OPS/DP/POLCY/2025/289 |
| I | I-guardian_relationship | Guardian Relationship | GUARDIAN_RELATION | CHAR(2) | on-modify | lookup against R | Relationship code FA/MO/CG; conditional on nominee_is_minor=Y | CDSL/OPS/DP/POLCY/2025/289 |
| I | I-nomination_opted | Nomination Opted | NOMINATION_OPTED | CHAR(1) | one-time | [direct] | Y/N; line 07 mandatory; per SEBI Jun 10, 2024 simplification 3 fields minimum at opt-in | CDSL/OPS/DP/POLCY/2024/317 |
| I | I-nominee_aadhaar | Nominee Aadhaar (Last 4) | NOMINEE_AADHAAR_L4 | CHAR(4) | on-modify | formatted | Last 4 digits only; first 8 must be 'X' if full Aadhaar captured per CDSL/OPS/DP/SYSTM/2024/628 | CDSL/OPS/DP/SYSTM/2024/628 |
| I | I-nominee_address | Nominee Address | NOMINEE_ADDRESS | CHAR(255) | on-modify | truncate to N | Mandatory at opening per SEBI revamp; line 07 nominee block; truncated to 255 | CDSL/OPS/DP/POLCY/2025/289 |
| I | I-nominee_city | Nominee City | NOMINEE_CITY | CHAR(35) | on-modify | truncate to N | Right-pad with spaces | CDSL/OPS/DP/POLCY/2025/289 |
| I | I-nominee_dob | Nominee Date of Birth | NOMINEE_DOB | CHAR(8) | on-modify | formatted | YYYYMMDD format; mandatory; used to derive minor flag | CDSL/OPS/DP/SYSTM/2024/628 |
| I | I-nominee_email | Nominee Email | NOMINEE_EMAIL | CHAR(100) | on-modify | lowercase | Mandatory per CDSL/OPS/DP/POLCY/2025/289 (was optional pre-revamp) | CDSL/OPS/DP/POLCY/2025/289 |
| I | I-nominee_is_minor | Nominee is Minor | NOMINEE_MINOR_FLG | CHAR(1) | on-modify | derived from Y | Derived from nominee_dob; Y if age < 18; triggers guardian block in line 07 | CDSL/OPS/DP/POLCY/2025/289 |
| I | I-nominee_mobile | Nominee Mobile | NOMINEE_MOBILE | CHAR(15) | on-modify | [direct] | Mandatory per CDSL/OPS/DP/POLCY/2025/289; 10-digit India | CDSL/OPS/DP/POLCY/2025/289 |
| I | I-nominee_name | Nominee Name | NOMINEE_NAME | CHAR(100) | on-modify | uppercase | Repeats per nominee in line 07 block; mandatory; right-padded; per CDSL/OPS/DP/POLCY/2025/289 | CDSL/OPS/DP/POLCY/2025/289 |
| I | I-nominee_pan | Nominee PAN | NOMINEE_PAN | CHAR(10) | on-modify | uppercase | One of PAN/last-4-Aadhaar/DL/Passport mandatory per SEBI Jun 10, 2024 simplification; right-padded | CDSL/OPS/DP/POLCY/2024/317 |
| I | I-nominee_passport | Nominee Passport | NOMINEE_PASSPORT | CHAR(8) | on-modify | uppercase | Passport for NRI nominee; one of the unique IDs per SEBI Jun 2024 simplification | CDSL/OPS/DP/POLCY/2024/317 |
| I | I-nominee_percentage | Nominee Percentage | NOMINEE_PCT | CHAR(6) | on-modify | formatted | Format 999.99 zero-padded; sum across nominees must equal 100.00; rejection if mismatch | CDSL/OPS/DP/POLCY/2025/32 |
| I | I-nominee_pincode | Nominee Pincode | NOMINEE_PIN | CHAR(6) | on-modify | [direct] | 6-digit numeric | CDSL/OPS/DP/POLCY/2025/289 |
| I | I-nominee_relationship | Nominee Relationship | NOMINEE_RELATION | CHAR(2) | on-modify | lookup against R | Relationship code FA/MO/SP/SO/DA/BR/SI/GF/GM/OT; mandatory | CDSL/OPS/DP/POLCY/2025/32 |
| I | I-nominee_seq | Nominee Sequence Number | NOMINEE_SEQ | CHAR(2) | on-modify | [direct] | 01-10; line 07 repeating block sequence; rejection if duplicates | CDSL/OPS/DP/POLCY/2025/289 |
| I | I-number_of_nominees | Number of Nominees | NUM_NOMINEES | CHAR(2) | on-modify | [direct] | 01-10 per SEBI Jan 10, 2025 revamp; line 07 | CDSL/OPS/DP/POLCY/2025/32 |
| I | I-opt_out_declaration | Opt-Out Declaration | OPT_OUT_FLAG | CHAR(1) | one-time | [direct] | Y if nominator opts out; needs video verification per SEBI; line 07 | CDSL/OPS/DP/POLCY/2025/145 |
| O | O-ddpi_authorization_date | <abbr title="Demat Debit and Pledge Instruction">DDPI</abbr> Authorization Date | DDPI_AUTH_DATE | CHAR(8) | on-event | formatted | YYYYMMDD; CDSL captures DDPI registration date per UDiFF-aligned format per CDSL/OPS/DP/SYSTM/2023/43 | CDSL/OPS/DP/SYSTM/2023/43 |
| O | O-ddpi_bo_id | DDPI BO ID | DDPI_BOID | CHAR(16) | on-event | [direct] | Same as H-bo_id; rebooted to DDPI Master table; CDSL Daiwa Active System (CDAS) linkage | CDSL/OPS/DP/SYSTM/2023/43 |
| O | O-ddpi_deregistration_date | DDPI Deregistration Date | DDPI_DEREG_DATE | CHAR(8) | on-event | formatted | YYYYMMDD; populated on de-registration; NULL means active | CDSL/OPS/DP/SYSTM/2023/43 |
| O | O-ddpi_dp_id | DDPI DP ID | DDPI_DPID | CHAR(8) | on-event | [direct] | 8-digit DP ID; same as H-dp_id | CDSL/OPS/DP/SYSTM/2023/43 |
| O | O-ddpi_for_mutual_fund | DDPI for Mutual Fund | DDPI_PURPOSE_MF | CHAR(1) | on-event | [direct] | Y/N; MF transaction authorization | CDSL/OPS/DP/POLCY/2022/194 |
| O | O-ddpi_for_pledge | DDPI for Pledge | DDPI_PURPOSE_PLEDGE | CHAR(1) | on-event | [direct] | Y/N; pledging/re-pledging for margins | CDSL/OPS/DP/POLCY/2022/194 |
| O | O-ddpi_for_settlement | DDPI for Settlement | DDPI_PURPOSE_SETTLE | CHAR(1) | on-event | [direct] | Y/N; first of 4 purpose flags per SEBI DDPI circular SEBI/<abbr title="Head Office (SEBI circular ID prefix)">HO</abbr>/<abbr title="Markets Intermediaries Regulation and Supervision Department (SEBI)">MIRSD</abbr>/DoP/P/CIR/2022/44 | CDSL/OPS/DP/POLCY/2022/194 |
| O | O-ddpi_for_tendering | DDPI for Tendering | DDPI_PURPOSE_TENDER | CHAR(1) | on-event | [direct] | Y/N; tendering in open offers/buybacks | CDSL/OPS/DP/POLCY/2022/194 |
| O | O-ddpi_opted | DDPI Opted | DDPI_FLAG | CHAR(1) | on-event | [direct] | Y/N flag; CDSL DDPI activation 24-hour SLA post-DP receiving signed DDPI form per CDSL/OPS/DP/SYSTM/2022/332; optional - cannot refuse service | CDSL/OPS/DP/SYSTM/2022/332 |
| O | O-ddpi_scope | DDPI Scope | DDPI_SCOPE | CHAR(2) | on-event | [direct] | AL=All transactions, SP=Specific; line in DDPI Master file | CDSL/OPS/DP/SYSTM/2023/43 |

## Verified through

2026-05-14

---

*AI-generated and not legal advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*

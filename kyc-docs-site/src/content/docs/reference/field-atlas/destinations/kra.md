---
title: "KRA (Identity Registry) — Fields consumed"
description: "Every field consumed by KRA (Identity Registry), with source section, destination format, update frequency, transformation rule, and quirks. Use this when building an integration with this destination."
---

> **Why this page is structured this way:** This is the destination-first view for KRA (Identity Registry). Engineers building an integration with this destination get the complete field list on one page. To see where each field originated in onboarding, follow the per-section links via the [atlas overview](/broking-kyc/reference/field-atlas/).

## TL;DR

- **124 unique fields** consumed by KRA (Identity Registry).
- Source spans sections: A, B, C, D, E, F, G, J, K, S.
- **50 rows cite a public spec source**; **74** are `[industry typical]`.

## Field-destination rows

Sorted by `source_section`, then `field_id`.

| source_section | field_id | field_name | destination_field_name | destination_format | frequency | transformation | quirks_notes | spec_source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| A | A-aadhaar_number | Aadhaar Number | AADHAAR_REF | VARCHAR(28) | on-modify | derived from Y | KRA does not store full Aadhaar; only masked reference or VID | SEBI/HO/MIRSD/SECFATF/P/CIR/2023/169 |
| A | A-aadhaar_reference_number | Aadhaar Reference (VID) | AADHAAR_VID | VARCHAR(28) | on-modify | [direct] | Virtual ID or DigiLocker reference; used in lieu of Aadhaar | [industry typical] |
| A | A-ckyc_number | CKYC Identification Number | CKYC_NO | CHAR(14) | on-modify | [direct] | KRA stores KIN as reference; masked in API responses post Jan 2025 | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/79 |
| A | A-country_of_birth | Country of Birth | CTRY_OF_BIRTH | CHAR(2) | on-modify | lookup against R | ISO 3166-1 alpha-2; FATCA-mandatory field centralized at KRA since 01-Jul-2024 | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| A | A-date_of_birth | Date of Birth | DOB | DATE DD/MM/YYYY | on-modify | formatted | Must match PAN ITD record; KRA rejects on mismatch via 3-param validation | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/41 |
| A | A-din | Director Identification Number | DIN | CHAR(8) | on-modify | [direct] | Optional; applicable only if customer is a director | [industry typical] |
| A | A-disability_percentage | Disability Percentage | DISABILITY_PCT | NUMBER(3) | on-modify | [direct] | 0-100; conditional | [industry typical] |
| A | A-disability_type | Disability Type | DISABILITY_TYPE | CHAR(2) | on-modify | lookup against R | Conditional on is_differently_abled=Y | [industry typical] |
| A | A-father_spouse_flag | Father/Spouse Indicator | FATHER_SPOUSE_FLAG | CHAR(1) | on-modify | [direct] | F=Father, S=Spouse; controls which name is captured | [industry typical] |
| A | A-father_spouse_name | Father/Spouse Name | FATHER_SPOUSE_NAME | VARCHAR(140) | on-modify | formatted | KRA stores as single concatenated string; uppercase preferred | [industry typical] |
| A | A-father_spouse_prefix | Father/Spouse Prefix | FATH_SPOUSE_PREFIX | VARCHAR(5) | on-modify | [direct] | Mr/Mrs/Ms based on relationship | [industry typical] |
| A | A-first_name | First Name | FIRST_NAME | VARCHAR(70) | on-modify | formatted | Must match PAN-card name exactly; KRA rejects on character-level mismatch | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/41 |
| A | A-full_name | Full Name | FULL_NAME | VARCHAR(200) | on-modify | derived from Y | Derived from prefix+first+middle+last; some KRAs reject if mismatch with PAN ITD name | SEBI/HO/MIRSD/SECFATF/P/CIR/2023/169 |
| A | A-gender | Gender | GENDER | CHAR(1) | on-modify | [direct] | M=Male, F=Female, T=Transgender | [industry typical] |
| A | A-is_differently_abled | Differently Abled Status | DIFF_ABLED_FLAG | CHAR(1) | on-modify | [direct] | Y/N; KRA template typically follows CKYC field | [industry typical] |
| A | A-last_name | Last Name | LAST_NAME | VARCHAR(70) | on-modify | formatted | Must match PAN; rejection codes include name-mismatch class | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/41 |
| A | A-maiden_first_name | Maiden First Name | MAIDEN_FIRST_NAME | VARCHAR(70) | on-modify | formatted | Optional in KRA template; populated for name-change cases | [industry typical] |
| A | A-maiden_last_name | Maiden Last Name | [same] | VARCHAR(70) | on-modify | formatted | Optional | [industry typical] |
| A | A-maiden_middle_name | Maiden Middle Name | [same] | VARCHAR(70) | on-modify | formatted | Optional | [industry typical] |
| A | A-maiden_prefix | Maiden Prefix | [same] | VARCHAR(5) | on-modify | [direct] | Optional; only if name changed after marriage | [industry typical] |
| A | A-marital_status | Marital Status | MARITAL_STATUS | CHAR(1) | on-modify | [direct] | S=Single, M=Married, O=Others | [industry typical] |
| A | A-middle_name | Middle Name | MIDDLE_NAME | VARCHAR(70) | on-modify | formatted | Optional; if present must match PAN | [industry typical] |
| A | A-mother_name | Mother Name | MOTHER_NAME | VARCHAR(70) | on-modify | formatted | Optional | [industry typical] |
| A | A-mother_prefix | Mother Prefix | MOTHER_PREFIX | VARCHAR(5) | on-modify | [direct] | Optional in KRA | [industry typical] |
| A | A-nationality | Nationality | NATIONALITY | CHAR(2) | on-modify | lookup against R | ISO 3166-1 alpha-2; IN=Indian default | [industry typical] |
| A | A-pan_exempt | PAN Exempt Flag | PAN_EXEMPT | CHAR(1) | on-modify | [direct] | Y/N flag for specific govt categories; rare in broking | [industry typical] |
| A | A-pan_exempt_category | PAN Exempt Category | PAN_EXEMPT_CATG | CHAR(2) | on-modify | lookup against R | Required if pan_exempt=Y; code table maintained by intermediary | [industry typical] |
| A | A-pan_number | PAN Number | PAN_NO | CHAR(10) | on-modify | uppercase | Validated 3-param (PAN+Name+DOB) against Protean; alphanumeric, 4th char P=Individual; rejection if mismatch | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/41 |
| A | A-photograph | Customer Photograph | PHOTO | BLOB | on-modify | [direct] | Passport-size, recent, colour, max 1MB | [industry typical] |
| A | A-place_of_birth | Place of Birth | PLACE_OF_BIRTH | VARCHAR(50) | on-modify | formatted | Optional in KRA; required for FATCA cross-check | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| A | A-prefix | Name Prefix | PREFIX | VARCHAR(5) | on-modify | [direct] | Mr/Mrs/Ms/Dr; KRA template accepts as separate token | [industry typical] |
| A | A-residential_status | Residential Status | RESI_STATUS | CHAR(2) | on-modify | [direct] | RI/NRI/FN/PIO; KRA accepts via 2024 master KYC circular | SEBI/HO/MIRSD/SECFATF/P/CIR/2023/169 |
| A | A-signature | Customer Signature | SIGNATURE | BLOB | on-modify | [direct] | White background; JPEG/PNG max 500KB | [industry typical] |
| A | A-udid_number | UDID Number | UDID | VARCHAR(18) | on-modify | uppercase | Format \[A-Z\]{2}\d{16} | [industry typical] |
| B | B-corr_address_line1 | Correspondence Address Line 1 | CORR_ADDR_L1 | VARCHAR(100) | on-modify | [direct] | Mandatory; KRA validates against POA document | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/41 |
| B | B-corr_address_line2 | Correspondence Address Line 2 | CORR_ADDR_L2 | VARCHAR(100) | on-modify | [direct] | Optional | [industry typical] |
| B | B-corr_address_line3 | Correspondence Address Line 3 | CORR_ADDR_L3 | VARCHAR(100) | on-modify | [direct] | Optional | [industry typical] |
| B | B-corr_address_proof_type | Correspondence Address Proof Type | CORR_POA_TYPE | CHAR(2) | on-modify | lookup against R | POA code table A-Z; KRA validates document validity | SEBI/HO/MIRSD/SECFATF/P/CIR/2023/169 |
| B | B-corr_city | Correspondence City | CORR_CITY | VARCHAR(50) | on-modify | formatted | Mandatory | [industry typical] |
| B | B-corr_country | Correspondence Country | CORR_COUNTRY | CHAR(2) | on-modify | lookup against R | ISO alpha-2; default IN | [industry typical] |
| B | B-corr_district | Correspondence District | CORR_DISTRICT | VARCHAR(50) | on-modify | formatted | Optional in KRA | [industry typical] |
| B | B-corr_pincode | Correspondence Pincode | CORR_PINCODE | CHAR(6) | on-modify | [direct] | 6 digits for India | [industry typical] |
| B | B-corr_state | Correspondence State | CORR_STATE | CHAR(2) | on-modify | lookup against R | 2-letter state code per Appendix A | [industry typical] |
| B | B-perm_address_line1 | Permanent Address Line 1 | PERM_ADDR_L1 | VARCHAR(100) | on-modify | [direct] | Conditional; required if perm_same_as_corr=N | [industry typical] |
| B | B-perm_address_line2 | Permanent Address Line 2 | PERM_ADDR_L2 | VARCHAR(100) | on-modify | [direct] | Conditional | [industry typical] |
| B | B-perm_address_line3 | Permanent Address Line 3 | PERM_ADDR_L3 | VARCHAR(100) | on-modify | [direct] | Conditional | [industry typical] |
| B | B-perm_address_proof_type | Permanent Address Proof Type | PERM_POA_TYPE | CHAR(2) | on-modify | lookup against R | Conditional; POA code | [industry typical] |
| B | B-perm_city | Permanent City | PERM_CITY | VARCHAR(50) | on-modify | formatted | Conditional | [industry typical] |
| B | B-perm_country | Permanent Country | PERM_COUNTRY | CHAR(2) | on-modify | lookup against R | Conditional; ISO alpha-2 | [industry typical] |
| B | B-perm_district | Permanent District | PERM_DISTRICT | VARCHAR(50) | on-modify | formatted | Optional | [industry typical] |
| B | B-perm_pincode | Permanent Pincode | PERM_PINCODE | CHAR(6) | on-modify | [direct] | Conditional | [industry typical] |
| B | B-perm_same_as_corr | Permanent Same as Correspondence | PERM_SAME_FLAG | CHAR(1) | on-modify | [direct] | If Y, KRA omits permanent section | [industry typical] |
| B | B-perm_state | Permanent State | PERM_STATE | CHAR(2) | on-modify | lookup against R | Conditional | [industry typical] |
| C | C-alternate_email | Alternate Email | ALT_EMAIL | VARCHAR(100) | on-modify | lowercase | Optional | [industry typical] |
| C | C-alternate_mobile | Alternate Mobile | ALT_MOBILE | VARCHAR(15) | on-modify | [direct] | Optional; not validated | [industry typical] |
| C | C-email | Email Address | EMAIL | VARCHAR(100) | on-modify | lowercase | KRA validates via email link; kra_email_validated flag set | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/41 |
| C | C-fax_number | Fax Number | FAX_NO | VARCHAR(15) | on-modify | [direct] | Rarely populated | [industry typical] |
| C | C-fax_std_code | Fax STD Code | FAX_STD | VARCHAR(5) | on-modify | [direct] | Rarely populated | [industry typical] |
| C | C-mobile_isd_code | Mobile ISD Code | MOB_ISD | VARCHAR(5) | on-modify | [direct] | Default +91; KRA stores ISD separately for mobile and phone | [industry typical] |
| C | C-mobile_number | Mobile Number | MOBILE_NO | VARCHAR(15) | on-modify | [direct] | KRA validates mobile via OTP; flag kra_mobile_validated set on success | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/41 |
| C | C-phone_number | Phone Number | PHONE_NO | VARCHAR(15) | on-modify | [direct] | Landline; optional | [industry typical] |
| C | C-phone_std_code | Phone STD Code | PHONE_STD | VARCHAR(5) | on-modify | [direct] | Landline STD; optional | [industry typical] |
| D | D-poi_document_image | POI Document Image | POI_IMAGE | BLOB | on-modify | [direct] | KRA stores scanned doc; JPEG/PNG/PDF max 2MB | [industry typical] |
| D | D-poi_document_number | POI Document Number | POI_DOC_NO | VARCHAR(30) | on-modify | uppercase | Format depends on poi_type; PAN \[A-Z\]{5}\d{4}\[A-Z\] | [industry typical] |
| D | D-poi_expiry_date | POI Expiry Date | POI_EXPIRY_DATE | DATE DD/MM/YYYY | on-modify | formatted | Conditional for Passport, DL | [industry typical] |
| D | D-poi_issue_date | POI Issue Date | POI_ISSUE_DATE | DATE DD/MM/YYYY | on-modify | formatted | Optional | [industry typical] |
| D | D-poi_issuing_authority | POI Issuing Authority | POI_ISSUE_AUTH | VARCHAR(50) | on-modify | formatted | Optional | [industry typical] |
| D | D-poi_type | POI Type | POI_TYPE | CHAR(2) | on-modify | lookup against R | POI code table A-Z per Appendix A2 | [industry typical] |
| D | D-poi_verified_from_issuer | POI Verified Flag | POI_VERIFIED | CHAR(1) | on-modify | [direct] | Y/N; KRA cross-references with verification source | SEBI/HO/MIRSD/SECFATF/P/CIR/2023/169 |
| E | E-poa_address_same_as_corr | POA Address Same as Correspondence | POA_ADDR_SAME | CHAR(1) | on-modify | [direct] | If N, KRA records discrepancy reason | [industry typical] |
| E | E-poa_document_image | POA Document Image | POA_IMAGE | BLOB | on-modify | [direct] | JPEG/PNG/PDF max 2MB | [industry typical] |
| E | E-poa_document_number | POA Document Number | POA_DOC_NO | VARCHAR(30) | on-modify | uppercase | Format depends on POA type | [industry typical] |
| E | E-poa_expiry_date | POA Expiry Date | POA_EXPIRY_DATE | DATE DD/MM/YYYY | on-modify | formatted | Conditional for Passport, DL | [industry typical] |
| E | E-poa_issue_date | POA Issue Date | POA_ISSUE_DATE | DATE DD/MM/YYYY | on-modify | formatted | Optional | [industry typical] |
| E | E-poa_type | POA Type | POA_TYPE | CHAR(2) | on-modify | lookup against R | POA code table A-Z per Appendix A3 | [industry typical] |
| E | E-poa_verified_from_issuer | POA Verified Flag | POA_VERIFIED | CHAR(1) | on-modify | [direct] | Y/N; mandatory | SEBI/HO/MIRSD/SECFATF/P/CIR/2023/169 |
| F | F-declared_annual_income | Declared Annual Income | ANN_INCOME_AMT | NUMBER(15,2) | on-modify | [direct] | Optional; INR exact | [industry typical] |
| F | F-gross_annual_income_range | Gross Annual Income Range | INCOME_SLAB | CHAR(2) | on-modify | lookup against R | Income range code 01-06; SEBI proposed revised slabs Jan 2026 | [industry typical] |
| F | F-net_worth | Net Worth | NET_WORTH | NUMBER(15,2) | on-modify | [direct] | INR Lakhs; KRA optional | [industry typical] |
| F | F-net_worth_date | Net Worth Date | NET_WORTH_DATE | DATE DD/MM/YYYY | on-modify | formatted | Conditional; must be <1 year old | [industry typical] |
| F | F-occupation | Occupation | OCCUPATION | CHAR(2) | on-modify | lookup against R | KRA/CKYC shared occupation code table (01-11, 99) | SEBI/HO/MIRSD/SECFATF/P/CIR/2023/169 |
| F | F-occupation_others | Occupation Others | OCCUPATION_OTHERS | VARCHAR(50) | on-modify | formatted | Conditional if F01=99 | [industry typical] |
| F | F-source_of_wealth | Source of Wealth | SRC_OF_WEALTH | VARCHAR(100) | on-modify | formatted | Optional in KRA; required for high-net-worth EDD | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/78 |
| G | G-account_holder_name | Account Holder Name | BANK_ACCT_HOLDER | VARCHAR(100) | on-modify | formatted | Must match PAN name; verified via penny drop | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/41 |
| G | G-account_number | Bank Account Number | BANK_ACCT_NO | VARCHAR(18) | on-modify | [direct] | Alphanumeric; KRA stores masked except last 4 | [industry typical] |
| G | G-account_type | Bank Account Type | BANK_ACCT_TYPE | CHAR(2) | on-modify | [direct] | SB/CA/NRE/NRO | [industry typical] |
| G | G-bank_name | Bank Name | BANK_NAME | VARCHAR(100) | on-modify | formatted | KRA primary bank only; multi-bank stored locally only | [industry typical] |
| G | G-branch_name | Branch Name | BANK_BRANCH | VARCHAR(100) | on-modify | formatted | Optional | [industry typical] |
| G | G-ifsc_code | IFSC Code | IFSC | CHAR(11) | on-modify | uppercase | Format \[A-Z\]{4}0\[A-Z0-9\]{6} | [industry typical] |
| G | G-micr_code | MICR Code | MICR | VARCHAR(9) | on-modify | [direct] | 9 digits; optional | [industry typical] |
| J | J-citizenship_country | Citizenship Country | CITIZENSHIP | CHAR(2) | on-modify | lookup against R | ISO alpha-2; supports multiple per repeat group | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| J | J-country_of_birth | Country of Birth (FATCA) | FATCA_CTRY_BIRTH | CHAR(2) | on-modify | lookup against R | ISO alpha-2; FATCA-mandated | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| J | J-fatca_declaration_date | FATCA Declaration Date | FATCA_DECL_DATE | DATE DD/MM/YYYY | on-modify | formatted | Mandatory; date of self-certification | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| J | J-fatca_declaration_place | FATCA Declaration Place | FATCA_DECL_PLACE | VARCHAR(50) | on-modify | formatted | City of declaration | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| J | J-fatca_signature | FATCA Signature | FATCA_SIGN | BLOB | on-modify | [direct] | Digital or scanned; centralized at KRA | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| J | J-is_tax_resident_of_india_only | Tax Resident India Only | TAX_RES_INDIA_ONLY | CHAR(1) | on-modify | [direct] | Y/N; centralized at KRA since 01-Jul-2024; KRA stores FATCA self-cert | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| J | J-is_us_person | US Person Flag | US_PERSON_FLAG | CHAR(1) | on-modify | [direct] | Y/N; triggers FATCA reporting if Y | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| J | J-place_of_birth_city | Place of Birth City | FATCA_POB_CITY | VARCHAR(50) | on-modify | formatted | FATCA mandatory | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| J | J-tax_country | Tax Residency Country | TAX_COUNTRY | CHAR(2) | on-modify | lookup against R | Repeats up to 5 countries; KRA centralization since 01-Jul-2024 | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| J | J-tax_id_number | Tax ID Number | TAX_TIN | VARCHAR(30) | on-modify | [direct] | TIN for each tax country | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| J | J-tax_id_type | Tax ID Type | TIN_TYPE | CHAR(2) | on-modify | [direct] | TIN/SSN/EIN etc | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| J | J-tin_not_available_reason | TIN Not Available Reason | TIN_NA_REASON | CHAR(1) | on-modify | [direct] | A=Country doesn't issue, B=Unable, C=Not required | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| J | J-us_green_card_holder | US Green Card Holder | US_GREEN_CARD | CHAR(1) | on-modify | [direct] | Conditional; affects FATCA reporting class | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| J | J-us_tin_ssn | US TIN/SSN | US_TIN | VARCHAR(11) | on-modify | [direct] | Conditional if is_us_person=Y | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| K | K-beneficial_owner_declaration | Beneficial Owner Declaration | BO_DECLARATION | CHAR(1) | on-modify | [direct] | Y if acting for self; PMLA Rule 9 lowered BO threshold per 2023 amendment | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/78 |
| K | K-beneficial_owner_details | Beneficial Owner Details | BO_DETAILS | VARCHAR(500) | on-modify | formatted | Conditional if BO declaration=N; details of actual BO | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/78 |
| K | K-is_pep | PEP Flag | PEP_FLAG | CHAR(1) | on-modify | [direct] | Y/N; triggers EDD; KRA-stored per AML master circular | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/78 |
| K | K-is_pep_related | PEP-Related Flag | PEP_RELATED | CHAR(1) | on-modify | [direct] | Related to a PEP; same EDD trigger | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/78 |
| K | K-pep_details | PEP Details | PEP_DETAILS | VARCHAR(200) | on-modify | formatted | Conditional; name, designation, relationship | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/78 |
| K | K-source_of_funds | Source of Funds | SRC_OF_FUNDS | VARCHAR(100) | on-modify | formatted | Salary/Business/Investments/Inheritance/Gift/Others | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/78 |
| S | S-kra_app_number | KRA Application Number | APP_NO | VARCHAR(30) | one-time | [direct] | Unique application reference; shared across 5 KRAs via interoperability | SEBI/HO/MIRSD/SECFATF/P/CIR/2023/169 |
| S | S-kra_app_type | KRA Application Type | APP_TYPE | CHAR(2) | one-time | [direct] | IN=Individual | [industry typical] |
| S | S-kra_kyc_date | KRA KYC Date | KYC_DATE | DATE DD/MM/YYYY | one-time | formatted | Date of original KYC capture | SEBI/HO/MIRSD/SECFATF/P/CIR/2023/169 |
| S | S-kra_pos_code | KRA POS Code | POS_CODE | VARCHAR(20) | one-time | [direct] | Intermediary Point of Service code assigned by KRA | [industry typical] |
| S | S-kra_rejection_reason | KRA Rejection Reason | REJECTION_REASON | VARCHAR(200) | on-event | formatted | Free text from KRA if rejected; common: name mismatch, image quality | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/41 |
| S | S-kra_submission_date | KRA Submission Date | SUBMISSION_DATE | DATETIME ISO 8601 | one-time | formatted | Upload within 3 working days of KYC completion | SEBI/HO/MIRSD/SECFATF/P/CIR/2023/169 |
| S | S-kra_submission_response | KRA Submission Response | RESPONSE_JSON | JSON | on-event | [direct] | Full payload from KRA API; stored for audit | [industry typical] |
| S | S-kra_submission_status | KRA Submission Status | SUBMISSION_STATUS | CHAR(2) | on-event | [direct] | SU/AC/RJ; KRA validates within 2 working days | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/41 |
| S | S-kra_validation_date | KRA Validation Date | VALIDATION_DATE | DATETIME ISO 8601 | on-event | formatted | Date when KRA completed validation | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/41 |
| S | S-kra_validation_status | KRA Validation Status | VALIDATION_STATUS | VARCHAR(20) | on-event | lookup against R | Status codes per Appendix A4: KYC Registered, On Hold, Rejected, etc | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/41 |
| S | S-kra_verification_date | KRA Verification Date | VERIFICATION_DATE | DATE DD/MM/YYYY | one-time | formatted | Date of intermediary verification of documents | SEBI/HO/MIRSD/SECFATF/P/CIR/2023/169 |
| S | S-kra_verifier_designation | KRA Verifier Designation | VERIFIER_DESIG | VARCHAR(50) | one-time | formatted | Designation of authorized person | SEBI/HO/MIRSD/SECFATF/P/CIR/2023/169 |
| S | S-kra_verifier_name | KRA Verifier Name | VERIFIER_NAME | VARCHAR(100) | one-time | formatted | Person who verified KYC at intermediary | SEBI/HO/MIRSD/SECFATF/P/CIR/2023/169 |
| S | S-kra_verifier_organization | KRA Verifier Organization | VERIFIER_ORG | VARCHAR(100) | one-time | formatted | Intermediary name | SEBI/HO/MIRSD/SECFATF/P/CIR/2023/169 |

## Verified through

2026-05-14

---

*AI-generated and not legal advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*

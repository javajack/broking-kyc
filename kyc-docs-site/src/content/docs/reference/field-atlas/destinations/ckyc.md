---
title: "CKYC (Central KYC Registry) — Fields consumed"
description: "Every field consumed by CKYC (Central KYC Registry), with source section, destination format, update frequency, transformation rule, and quirks. Use this when building an integration with this destination."
---

> **Why this page is structured this way:** This is the destination-first view for CKYC (Central KYC Registry). Engineers building an integration with this destination get the complete field list on one page. To see where each field originated in onboarding, follow the per-section links via the [atlas overview](/broking-kyc/reference/field-atlas/).

## TL;DR

- **122 unique fields** consumed by CKYC (Central KYC Registry).
- Source spans sections: A, B, C, D, E, F, G, J, K, T.
- **109 rows cite a public spec source**; **13** are `[industry typical]`.

## Field-destination rows

Sorted by `source_section`, then `field_id`.

| source_section | field_id | field_name | destination_field_name | destination_format | frequency | transformation | quirks_notes | spec_source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| A | A-aadhaar_number | Aadhaar Number | AADHAAR_LAST4 | VARCHAR(4) | one-time | truncate to N | CKYC stores only last-4 digits of Aadhaar; full Aadhaar prohibited per UIDAI | CKYC/2025/16 |
| A | A-aadhaar_reference_number | Aadhaar Reference (VID) | AADHAAR_REFERENCE_NUMBER | VARCHAR(28) | one-time | [direct] | Used when offline Aadhaar XML or eKYC reference applies | CKYC/2025/16 |
| A | A-ckyc_number | CKYC Identification Number | KYC_IDENTIFIER | CHAR(14) | one-time | [direct] | Masked-KIN search returns 'X'-prefixed identifier post 20-Jan-2025; full KIN only on authenticated download | CKYC/2024/04 |
| A | A-country_of_birth | Country of Birth | COUNTRY_OF_BIRTH | CHAR(3) | one-time | lookup against R | CKYC uses ISO 3166 alpha-3; required for FATCA reasonableness | CKYC/2025/16 |
| A | A-date_of_birth | Date of Birth | DOB | DATE DD-MM-YYYY | one-time | formatted | CKYC uses DD-MM-YYYY in upload XML; mandatory | CKYC/2025/16 |
| A | A-din | Director Identification Number | DIN | CHAR(8) | one-time | [direct] | Optional in CKYC T1 | CKYC/2020/04 |
| A | A-disability_percentage | Disability Percentage | PERCENTAGE_OF_IMPAIRMENT | NUMBER(3) | one-time | [direct] | Mandatory if differently_abled=Y per CKYC/2025/11 | CKYC/2025/11 |
| A | A-disability_type | Disability Type | TYPE_OF_IMPAIRMENT | CHAR(2) | one-time | lookup against R | CKYC code table per CKYC/2025/11 Communique | CKYC/2025/11 |
| A | A-father_spouse_flag | Father/Spouse Indicator | FATHER_SPOUSE_FLAG | CHAR(1) | one-time | [direct] | CKYC field; mandatory in template T1 | CKYC/2025/16 |
| A | A-father_spouse_name | Father/Spouse Name | FATHER_SPOUSE_NAME | VARCHAR(140) | one-time | formatted | CKYC validates against OVD where present; mandatory | CKYC/2025/16 |
| A | A-father_spouse_prefix | Father/Spouse Prefix | FATHER_SPOUSE_PREFIX | VARCHAR(5) | one-time | [direct] | CKYC T1 mandatory | CKYC/2020/04 |
| A | A-first_name | First Name | FIRST_NAME | VARCHAR(70) | one-time | formatted | CKYC validates against name on OVD; alpha+spaces only | CKYC/2025/16 |
| A | A-full_name | Full Name | FULL_NAME | VARCHAR(200) | one-time | derived from Y | CKYCRR computes Name field internally; uploaded as concat | CKYC/2020/04 |
| A | A-gender | Gender | GENDER | CHAR(1) | one-time | [direct] | M/F/T per CERSAI template; mandatory | CKYC/2025/16 |
| A | A-is_differently_abled | Differently Abled Status | DIFFERENTLY_ABLED_STATUS | CHAR(1) | one-time | [direct] | New field added per Supreme Court order; bulk file v1.3; effective 30-Sep-2025 | CKYC/2025/11 |
| A | A-last_name | Last Name | LAST_NAME | VARCHAR(70) | one-time | formatted | Mandatory; concatenated for FULL_NAME on output | CKYC/2025/16 |
| A | A-maiden_first_name | Maiden First Name | MAIDEN_FIRST_NAME | VARCHAR(70) | one-time | formatted | CKYC T1 maiden section; helps legacy-record matching per CKYC/2026/08 | CKYC/2026/08 |
| A | A-maiden_last_name | Maiden Last Name | MAIDEN_LAST_NAME | VARCHAR(70) | one-time | formatted | CKYC maiden subsection | CKYC/2020/04 |
| A | A-maiden_middle_name | Maiden Middle Name | MAIDEN_MIDDLE_NAME | VARCHAR(70) | one-time | formatted | CKYC maiden subsection | CKYC/2020/04 |
| A | A-maiden_prefix | Maiden Prefix | MAIDEN_PREFIX | VARCHAR(5) | one-time | [direct] | CKYC T1 captures pre-marriage prefix | CKYC/2020/04 |
| A | A-marital_status | Marital Status | MARITAL_STATUS | CHAR(1) | one-time | [direct] | CKYC optional in T1 | CKYC/2020/04 |
| A | A-middle_name | Middle Name | MIDDLE_NAME | VARCHAR(70) | one-time | formatted | CKYC T1 field; optional | CKYC/2020/04 |
| A | A-mother_name | Mother Name | MOTHER_NAME | VARCHAR(70) | one-time | formatted | Mandatory after PMLA Maintenance of Records 2nd Amendment Rules 2023 | SEBI/HO/MIRSD/SEC-FATF/P/CIR/2023/0170 |
| A | A-mother_prefix | Mother Prefix | MOTHER_PREFIX | VARCHAR(5) | one-time | [direct] | CKYC T1 mother-section | CKYC/2020/04 |
| A | A-nationality | Nationality | NATIONALITY | CHAR(3) | one-time | lookup against R | CERSAI uses ISO 3166 alpha-3 codes in master country list | CKYC/2025/16 |
| A | A-pan_exempt | PAN Exempt Flag | PAN_EXEMPTED | CHAR(1) | one-time | [direct] | CKYC accepts Form 60 in lieu of PAN for exempt categories | CKYC/2025/16 |
| A | A-pan_exempt_category | PAN Exempt Category | PAN_EXEMPT_CATEGORY | CHAR(2) | one-time | lookup against R | CERSAI publishes exempt category codes; align with PML Rules Rule 9 | CKYC/2025/16 |
| A | A-pan_number | PAN Number | PAN | CHAR(10) | one-time | uppercase | Format \[A-Z\]{5}\[0-9\]{4}\[A-Z\] validated by CKYCRR; mandatory at upload | CKYC/2025/16 |
| A | A-photograph | Customer Photograph | PHOTOGRAPH | BLOB | one-time | [direct] | CKYC: 200x230 pixels, max 100kb, passport size colour | CERSAI/2023-24 |
| A | A-place_of_birth | Place of Birth | PLACE_OF_BIRTH | VARCHAR(50) | one-time | formatted | CKYC T1 mandatory after revised template 2.0 | CKYC/2020/04 |
| A | A-prefix | Name Prefix | PREFIX | VARCHAR(5) | one-time | [direct] | CKYC T1 Individual template field; salutation only | CKYC/2020/04 |
| A | A-residential_status | Residential Status | RESIDENTIAL_STATUS | CHAR(2) | one-time | [direct] | New field added to CKYC template via CKYC/2025/03 Revised; effective 30-May-2025 | CKYC/2025/03_Revised |
| A | A-signature | Customer Signature | SIGNATURE | BLOB | one-time | [direct] | CKYC signature image stored with photograph and OVDs | CERSAI/2023-24 |
| A | A-udid_number | UDID Number | UDID_NUMBER | VARCHAR(18) | one-time | uppercase | UDID introduced via CKYC/2025/11; CKYC API v1.3 download supports field | CKYC/2025/11 |
| B | B-corr_address_line1 | Correspondence Address Line 1 | LOCAL_ADDRESS_LINE1 | VARCHAR(55) | one-time | truncate to N | CKYC line length is 55; longer KRA values must be split or truncated | CKYC/2025/16 |
| B | B-corr_address_line2 | Correspondence Address Line 2 | LOCAL_ADDRESS_LINE2 | VARCHAR(55) | one-time | truncate to N | CKYC restricts to 55 chars per line | CKYC/2025/16 |
| B | B-corr_address_line3 | Correspondence Address Line 3 | LOCAL_ADDRESS_LINE3 | VARCHAR(55) | one-time | truncate to N | CKYC has three line fields plus city/district/state/pin | CKYC/2025/16 |
| B | B-corr_address_proof_type | Correspondence Address Proof Type | LOCAL_ADDRESS_PROOF | CHAR(2) | one-time | lookup against R | CERSAI POA code list; revised for Foreign Nationals per CKYC/2025/03 | CKYC/2025/03_Revised |
| B | B-corr_city | Correspondence City | LOCAL_CITY | VARCHAR(50) | one-time | lookup against R | CKYC validates against master Pin Code-District-City list | CKYC/2025/16 |
| B | B-corr_country | Correspondence Country | LOCAL_COUNTRY | CHAR(3) | one-time | lookup against R | CKYC uses ISO 3166 alpha-3 | CKYC/2025/16 |
| B | B-corr_district | Correspondence District | LOCAL_DISTRICT | VARCHAR(50) | one-time | lookup against R | CKYC master district list; required for India addresses | CKYC/2025/16 |
| B | B-corr_pincode | Correspondence Pincode | LOCAL_PIN_CODE | VARCHAR(10) | one-time | [direct] | CKYC supports international postcode for foreign addresses | CKYC/2025/03_Revised |
| B | B-corr_state | Correspondence State | LOCAL_STATE | CHAR(2) | one-time | lookup against R | CKYC master state list; INTL for non-Indian | CKYC/2025/16 |
| B | B-perm_address_line1 | Permanent Address Line 1 | PERM_ADDRESS_LINE1 | VARCHAR(55) | one-time | truncate to N | CKYC permanent block; truncate to 55 chars | CKYC/2025/16 |
| B | B-perm_address_line2 | Permanent Address Line 2 | PERM_ADDRESS_LINE2 | VARCHAR(55) | one-time | truncate to N | CKYC permanent block | CKYC/2025/16 |
| B | B-perm_address_line3 | Permanent Address Line 3 | PERM_ADDRESS_LINE3 | VARCHAR(55) | one-time | truncate to N | CKYC permanent block | CKYC/2025/16 |
| B | B-perm_address_proof_type | Permanent Address Proof Type | PERM_ADDRESS_PROOF | CHAR(2) | one-time | lookup against R | CERSAI POA code; same as local POA code list | CKYC/2025/03_Revised |
| B | B-perm_city | Permanent City | PERM_CITY | VARCHAR(50) | one-time | lookup against R | CKYC master city list | CKYC/2025/16 |
| B | B-perm_country | Permanent Country | PERM_COUNTRY | CHAR(3) | one-time | lookup against R | CKYC ISO alpha-3 | CKYC/2025/16 |
| B | B-perm_district | Permanent District | PERM_DISTRICT | VARCHAR(50) | one-time | lookup against R | CKYC master district list | CKYC/2025/16 |
| B | B-perm_pincode | Permanent Pincode | PERM_PIN_CODE | VARCHAR(10) | one-time | [direct] | CKYC supports intl postcode | CKYC/2025/03_Revised |
| B | B-perm_same_as_corr | Permanent Same as Correspondence | PERMANENT_SAME_FLAG | CHAR(1) | one-time | [direct] | CKYC omits permanent block if Y | CKYC/2020/04 |
| B | B-perm_state | Permanent State | PERM_STATE | CHAR(2) | one-time | lookup against R | CKYC master state list | CKYC/2025/16 |
| C | C-alternate_email | Alternate Email | ALTERNATE_EMAIL | VARCHAR(100) | one-time | lowercase | CKYC optional | CKYC/2020/04 |
| C | C-alternate_mobile | Alternate Mobile | ALTERNATE_MOBILE | VARCHAR(15) | one-time | [direct] | CKYC optional | CKYC/2020/04 |
| C | C-email | Email Address | EMAIL_ID | VARCHAR(100) | one-time | lowercase | CKYC stores in lowercase; used in download notifications | CKYC/2025/16 |
| C | C-fax_number | Fax Number | FAX_NUMBER | VARCHAR(15) | one-time | [direct] | CKYC field retained for legacy | CKYC/2020/04 |
| C | C-fax_std_code | Fax STD Code | FAX_STD | VARCHAR(5) | one-time | [direct] | CKYC field retained for legacy | CKYC/2020/04 |
| C | C-mobile_isd_code | Mobile ISD Code | MOBILE_ISD_CODE | VARCHAR(5) | one-time | [direct] | CKYC stores ISD without leading + sign | CKYC/2025/16 |
| C | C-mobile_number | Mobile Number | MOBILE_NUMBER | VARCHAR(15) | one-time | [direct] | Used to trigger OTP for download consent post May-2025 | CKYC/2025/02 |
| C | C-phone_number | Phone Number | TELEPHONE | VARCHAR(15) | one-time | [direct] | CKYC residence/office phone | CKYC/2020/04 |
| C | C-phone_std_code | Phone STD Code | TELEPHONE_STD | VARCHAR(5) | one-time | [direct] | CKYC residence/office phone STD | CKYC/2020/04 |
| D | D-poi_document_image | POI Document Image | IDENTITY_PROOF_IMAGE | BLOB | one-time | [direct] | CKYC: 150-200 DPI, max 350kb individual; .tif/.tiff/.pdf/.jpeg/.jpg | CKYC/2025/16 |
| D | D-poi_document_number | POI Document Number | IDENTITY_PROOF_NO | VARCHAR(30) | one-time | uppercase | Aadhaar last-4 only when poi_type=E per UIDAI masking | CKYC/2025/16 |
| D | D-poi_expiry_date | POI Expiry Date | IDENTITY_PROOF_EXPIRY | DATE DD-MM-YYYY | one-time | formatted | CKYC validates expiry for time-bounded OVDs | CKYC/2025/16 |
| D | D-poi_issue_date | POI Issue Date | IDENTITY_PROOF_ISSUE_DATE | DATE DD-MM-YYYY | one-time | formatted | CKYC optional | CKYC/2020/04 |
| D | D-poi_issuing_authority | POI Issuing Authority | IDENTITY_ISSUING_AUTHORITY | VARCHAR(50) | one-time | formatted | CKYC field for non-Indian govt docs and foreign national OVDs | CKYC/2025/03_Revised |
| D | D-poi_type | POI Type | IDENTITY_PROOF_TYPE | CHAR(2) | one-time | lookup against R | CERSAI POI code list; permitted OVDs per CKYC/2025/16 data hygiene | CKYC/2025/16 |
| D | D-poi_verified_from_issuer | POI Verified Flag | IDENTITY_VERIFIED | CHAR(1) | one-time | [direct] | CKYC mandatory; captured at upload | CKYC/2025/16 |
| E | E-poa_address_same_as_corr | POA Address Same as Correspondence | [same] | CHAR(1) | one-time | [direct] | CKYC industry-typical mapping | [industry typical] |
| E | E-poa_document_image | POA Document Image | ADDRESS_PROOF_IMAGE | BLOB | one-time | [direct] | 150-200 DPI; max 350kb (individual) | CKYC/2025/16 |
| E | E-poa_document_number | POA Document Number | ADDRESS_PROOF_NO | VARCHAR(30) | one-time | uppercase | CKYC validates structure per POA type | CKYC/2025/16 |
| E | E-poa_expiry_date | POA Expiry Date | ADDRESS_PROOF_EXPIRY | DATE DD-MM-YYYY | one-time | formatted | Utility bill: <2 months old; Bank stmt: <3 months | CKYC/2025/16 |
| E | E-poa_issue_date | POA Issue Date | ADDRESS_PROOF_ISSUE_DATE | DATE DD-MM-YYYY | one-time | formatted | CKYC checks validity-window for time-bounded POAs | CKYC/2025/16 |
| E | E-poa_type | POA Type | ADDRESS_PROOF_TYPE | CHAR(2) | one-time | lookup against R | CERSAI POA codes; revised list for foreign nationals | CKYC/2025/03_Revised |
| E | E-poa_verified_from_issuer | POA Verified Flag | ADDRESS_VERIFIED | CHAR(1) | one-time | [direct] | CKYC mandatory | CKYC/2025/16 |
| F | F-declared_annual_income | Declared Annual Income | ANNUAL_INCOME_AMT | NUMBER(15,2) | one-time | [direct] | CKYC optional | CKYC/2020/04 |
| F | F-gross_annual_income_range | Gross Annual Income Range | GROSS_ANNUAL_INCOME | CHAR(2) | one-time | lookup against R | CKYC same code table; mandatory | CKYC/2025/16 |
| F | F-net_worth | Net Worth | NETWORTH | NUMBER(15,2) | one-time | [direct] | CKYC optional field | CKYC/2020/04 |
| F | F-net_worth_date | Net Worth Date | NETWORTH_DATE | DATE DD-MM-YYYY | one-time | formatted | CKYC optional | CKYC/2020/04 |
| F | F-occupation | Occupation | OCCUPATION_TYPE | CHAR(2) | one-time | lookup against R | CERSAI occupation codes; same table as KRA per Appendix A1 | CKYC/2025/16 |
| F | F-occupation_others | Occupation Others | OCCUPATION_OTHERS | VARCHAR(50) | one-time | formatted | CKYC free-text | CKYC/2020/04 |
| F | F-source_of_wealth | Source of Wealth | SOURCE_OF_WEALTH | VARCHAR(100) | one-time | formatted | CKYC optional but recommended per PMLA | CKYC/2025/16 |
| G | G-account_holder_name | Account Holder Name | ACCOUNT_HOLDER_NAME | VARCHAR(100) | one-time | formatted | CKYC ensures consistency with applicant name | CKYC/2025/16 |
| G | G-account_number | Bank Account Number | BANK_ACCOUNT_NUMBER | VARCHAR(18) | one-time | [direct] | CKYC stores in plain (encrypted in DB); per data hygiene | CKYC/2025/16 |
| G | G-account_type | Bank Account Type | BANK_ACCOUNT_TYPE | CHAR(2) | one-time | [direct] | CKYC code: SB/CA/NRE/NRO/OD | CKYC/2025/16 |
| G | G-bank_name | Bank Name | BANK_NAME | VARCHAR(100) | one-time | formatted | CKYC captures primary bank for identification | CKYC/2020/04 |
| G | G-branch_name | Branch Name | BANK_BRANCH | VARCHAR(100) | one-time | formatted | CKYC field captures branch with primary bank | [industry typical] |
| G | G-ifsc_code | IFSC Code | IFSC_CODE | CHAR(11) | one-time | uppercase | CKYC validates against RBI IFSC master | CKYC/2025/16 |
| G | G-micr_code | MICR Code | MICR_CODE | VARCHAR(9) | one-time | [direct] | CKYC optional | CKYC/2020/04 |
| J | J-citizenship_country | Citizenship Country | CITIZENSHIP | CHAR(3) | one-time | lookup against R | CKYC supports up to 3 citizenship countries | CKYC/2025/16 |
| J | J-country_of_birth | Country of Birth (FATCA) | COUNTRY_OF_BIRTH | CHAR(3) | one-time | lookup against R | Same as A-country_of_birth; CKYC alpha-3 | CKYC/2025/16 |
| J | J-fatca_declaration_date | FATCA Declaration Date | [same] | DATE DD-MM-YYYY | one-time | formatted | CKYC may store via document submission | [industry typical] |
| J | J-fatca_declaration_place | FATCA Declaration Place | [same] | VARCHAR(50) | one-time | formatted | Industry-typical | [industry typical] |
| J | J-fatca_signature | FATCA Signature | [same] | BLOB | one-time | [direct] | CKYC stores via document image if applicable | [industry typical] |
| J | J-is_tax_resident_of_india_only | Tax Resident India Only | TAX_RESIDENT_INDIA_ONLY | CHAR(1) | one-time | [direct] | CKYC optional; FATCA primarily handled at KRA | [industry typical] |
| J | J-is_us_person | US Person Flag | US_PERSON_FLAG | CHAR(1) | one-time | [direct] | CKYC captures for cross-sector consistency | [industry typical] |
| J | J-place_of_birth_city | Place of Birth City | PLACE_OF_BIRTH | VARCHAR(50) | one-time | formatted | CKYC same as A-place_of_birth | CKYC/2025/16 |
| J | J-tax_country | Tax Residency Country | [same] | CHAR(3) | one-time | lookup against R | CKYC may capture for non-US tax-residency | [industry typical] |
| J | J-tax_id_number | Tax ID Number | [same] | VARCHAR(30) | one-time | [direct] | Industry-typical mapping; CKYC optional | [industry typical] |
| J | J-tax_id_type | Tax ID Type | [same] | CHAR(2) | one-time | [direct] | CKYC industry-typical | [industry typical] |
| J | J-tin_not_available_reason | TIN Not Available Reason | [same] | CHAR(1) | one-time | [direct] | Industry-typical | [industry typical] |
| J | J-us_green_card_holder | US Green Card Holder | [same] | CHAR(1) | one-time | [direct] | CKYC may not capture; industry-typical extension | [industry typical] |
| J | J-us_tin_ssn | US TIN/SSN | [same] | VARCHAR(11) | one-time | [direct] | CKYC captures TIN when applicable | [industry typical] |
| K | K-beneficial_owner_declaration | Beneficial Owner Declaration | BENEFICIAL_OWNER_DECL | CHAR(1) | one-time | [direct] | CKYC mandatory at upload | CKYC/2025/16 |
| K | K-beneficial_owner_details | Beneficial Owner Details | BENEFICIAL_OWNER_DETAILS | VARCHAR(500) | one-time | formatted | CKYC captures related-persons block | CKYC/2025/16 |
| K | K-is_pep | PEP Flag | PEP_FLAG | CHAR(1) | one-time | [direct] | CKYC PEP indicator; mandatory | CKYC/2025/16 |
| K | K-is_pep_related | PEP-Related Flag | PEP_RELATED | CHAR(1) | one-time | [direct] | CKYC field for related-PEP classification | CKYC/2025/16 |
| K | K-pep_details | PEP Details | PEP_DESCRIPTION | VARCHAR(200) | one-time | formatted | CKYC free text | CKYC/2020/04 |
| K | K-source_of_funds | Source of Funds | SOURCE_OF_FUNDS | VARCHAR(100) | one-time | formatted | CKYC code list; mandatory | CKYC/2025/16 |
| T | T-ckyc_branch_code | CKYC Branch Code | BRANCH_CODE | VARCHAR(20) | one-time | [direct] | RE branch identifier | CKYC/2025/16 |
| T | T-ckyc_document_submission_type | CKYC Document Submission Type | DOCUMENT_SUBMISSION_TYPE | VARCHAR(30) | one-time | [direct] | CERTIFIED_COPIES/EKYC/OFFLINE_VERIFICATION/DIGITAL_KYC/E_DOCUMENT/VKYC | CKYC/2025/16 |
| T | T-ckyc_fi_code | CKYC FI Code | FI_CODE | VARCHAR(20) | one-time | [direct] | Financial institution code assigned by CERSAI; identifies RE | CKYC/2025/16 |
| T | T-ckyc_kin_generated | CKYC KIN Generated | KIN | CHAR(14) | on-event | [direct] | 14-digit KIN if successful; masked with 'X' prefix in search responses post 20-Jan-2025 | CKYC/2024/04 |
| T | T-ckyc_reference_id | CKYC Reference ID | REFERENCE_ID | CHAR(14) | one-time | [direct] | Unique document reference; returned in confirmed-match response (replaces KIN since 20-Jan-2025) | CKYC/2024/04 |
| T | T-ckyc_rejection_reason | CKYC Rejection Reason | REJECTION_REASON | VARCHAR(200) | on-event | formatted | Common: PAN structure, image DPI/size, master-list mismatch | CKYC/2025/16 |
| T | T-ckyc_submission_date | CKYC Submission Date | UPLOAD_DATE | DATETIME ISO 8601 | one-time | formatted | Date uploaded to CKYCRR; mandatory since 01-Aug-2024 via dual-upload mandate | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/79 |
| T | T-ckyc_submission_response | CKYC Submission Response | RESPONSE_PAYLOAD | JSON | on-event | [direct] | Full CKYCRR API response | CKYC/2025/16 |
| T | T-ckyc_submission_status | CKYC Submission Status | UPLOAD_STATUS | CHAR(2) | on-event | [direct] | SU/AC/RJ; CKYCRR returns confirmed-match or fresh-upload result | CKYC/2025/16 |
| T | T-ckyc_verifier_designation | CKYC Verifier Designation | VERIFIER_DESIGNATION | VARCHAR(50) | one-time | formatted | Authorized official designation | CKYC/2025/16 |
| T | T-ckyc_verifier_employee_code | CKYC Verifier Employee Code | VERIFIER_EMPLOYEE_CODE | VARCHAR(20) | one-time | [direct] | RE employee code; mandatory | CKYC/2025/16 |
| T | T-ckyc_verifier_name | CKYC Verifier Name | VERIFIER_NAME | VARCHAR(100) | one-time | formatted | Person who verified KYC at RE | CKYC/2025/16 |

## Verified through

2026-05-14

---

*AI-generated and not legal advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*

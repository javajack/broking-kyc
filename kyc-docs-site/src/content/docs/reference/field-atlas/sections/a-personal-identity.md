---
title: "Section A: Personal Identity — Data Flow"
description: "Where each field in Section A: Personal Identity flows downstream — destinations, formats, frequencies, transformations, quirks."
---

> **Why this page is structured this way:** This is the field-first view for Section A: Personal Identity. Each row is one field-destination relationship. To see the same data from the destination's perspective, jump from the [atlas overview](/broking-kyc/reference/field-atlas/).

## TL;DR

- **36 unique fields** in this section.
- **219 field-destination relationships** total.
- Source-of-truth field definitions: [Master Dataset](/broking-kyc/reference/master-dataset/).

## Data flow table

Sorted by `field_id`, then `destination`.

| field_id | field_name | destination | destination_field_name | destination_format | frequency | transformation | quirks_notes | spec_source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| A-aadhaar_number | Aadhaar Number | aml-fiu | AADHAAR_MASKED | CHAR(12) | on-event | truncate to N | only last-4 transmitted to <abbr title="Financial Intelligence Unit">FIU</abbr> per UIDAI guidelines; full Aadhaar prohibited in <abbr title="Suspicious Transaction Report">STR</abbr>/<abbr title="Cash Transaction Report">CTR</abbr> narrative | <abbr title="Securities and Exchange Board of India">SEBI</abbr>/<abbr title="Head Office (SEBI circular ID prefix)">HO</abbr>/<abbr title="Markets Intermediaries Regulation and Supervision Department (SEBI)">MIRSD</abbr>/SECFATF/P/CIR/2024/78 |
| A-aadhaar_number | Aadhaar Number (Masked) | back-office | aadhaar_masked | VARCHAR(12) | one-time | truncate to N | stored masked XXXX-XXXX-1234; never store full in <abbr title="Beneficial Owner">BO</abbr> ledger | [industry typical] |
| A-aadhaar_number | Aadhaar Number | bse-ucc | UID | CHAR(12) | one-time | truncate to N | Masked storage; <abbr title="Know Your Customer (process).">KYC</abbr> validated via UIDAI (not direct <abbr title="Unique Client Code">UCC</abbr> upload) | <abbr title="BSE Limited (formerly Bombay Stock Exchange)">BSE</abbr>/20230819-6 |
| A-aadhaar_number | Aadhaar (Masked) | cdsl-bo | AADHAAR_MASKED | CHAR(12) | one-time | formatted | First 8 digits replaced with 'X', last 4 visible per <abbr title="Central Depository Services (India) Limited">CDSL</abbr>/OPS/<abbr title="Depository Participant">DP</abbr>/SYSTM/2024/628; line 01 reserved position; full Aadhaar never stored | CDSL/OPS/DP/SYSTM/2024/628 |
| A-aadhaar_number | Aadhaar Number | ckyc | AADHAAR_LAST4 | VARCHAR(4) | one-time | truncate to N | <abbr title="Central KYC (records registry)">CKYC</abbr> stores only last-4 digits of Aadhaar; full Aadhaar prohibited per UIDAI | CKYC/2025/16 |
| A-aadhaar_number | Aadhaar Number | kra | AADHAAR_REF | VARCHAR(28) | on-modify | derived from Y | <abbr title="KYC Registration Agency">KRA</abbr> does not store full Aadhaar; only masked reference or VID | SEBI/HO/MIRSD/SECFATF/P/CIR/2023/169 |
| A-aadhaar_number | Aadhaar Number | mcx-ucc | UID | CHAR(12) | one-time | truncate to N | Masked; not part of canonical <abbr title="Multi Commodity Exchange of India">MCX</abbr> UCC fields (KYC-side only) | MCX/TECH/394/2023 |
| A-aadhaar_number | Aadhaar (Masked) | nsdl-bo | AdhaarMskdNb | CHAR(12) UDiFF | one-time | formatted | Masked Aadhaar (first 8 X, last 4 visible) in ISO-tagged element; full Aadhaar prohibited by <abbr title="Digital Personal Data Protection Act 2023 (and Rules 2025)">DPDP</abbr> | <abbr title="National Securities Depository Limited">NSDL</abbr>/POLICY/2025/0056 |
| A-aadhaar_number | Aadhaar Number | nse-ucc | UID | CHAR(12) | one-time | truncate to N | Masked storage XXXX-XXXX-1234; full Aadhaar never transmitted to exchange UCC | <abbr title="National Stock Exchange of India">NSE</abbr>/<abbr title="Investor Service Centre.">ISC</abbr>/61817 |
| A-aadhaar_reference_number | Aadhaar Reference (VID) | ckyc | AADHAAR_REFERENCE_NUMBER | VARCHAR(28) | one-time | [direct] | Used when offline Aadhaar XML or eKYC reference applies | CKYC/2025/16 |
| A-aadhaar_reference_number | Aadhaar Reference (VID) | kra | AADHAAR_VID | VARCHAR(28) | on-modify | [direct] | Virtual ID or DigiLocker reference; used in lieu of Aadhaar | [industry typical] |
| A-ckyc_number | CKYC Number | aml-fiu | CKYC_KIN | CHAR(14) | on-event | [direct] | CKYC <abbr title="KYC Identification Number">KIN</abbr> included where available; helps FIU dedupe across REs | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/78 |
| A-ckyc_number | CKYC Number (KIN) | back-office | ckyc_kin | CHAR(14) | one-time | [direct] | 14-digit KIN; cross-reference field for re-KYC | [industry typical] |
| A-ckyc_number | CKYC Number (KIN) | back-office | ckyc_xref_status | VARCHAR(2) | on-event | [direct] | CKYC submission status; 7-day window from KYC change | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/79 |
| A-ckyc_number | CKYC Identification Number (KIN) | bse-ucc | CKYC_KIN | CHAR(14) | one-time | [direct] | Optional; KRA-validated KYC takes precedence | BSE/20240223-42 |
| A-ckyc_number | CKYC Number | cdsl-bo | CKYC_KIN | CHAR(14) | one-time | [direct] | 14-digit KIN captured at BO opening from CKYCRR fetch; right-aligned with leading zeros | CDSL/OPS/DP/POLCY/2024/312 |
| A-ckyc_number | CKYC Identification Number | ckyc | KYC_IDENTIFIER | CHAR(14) | one-time | [direct] | Masked-KIN search returns 'X'-prefixed identifier post 20-Jan-2025; full KIN only on authenticated download | CKYC/2024/04 |
| A-ckyc_number | CKYC Number | fatca-crs | CKYC_KIN | CHAR(14) | on-event | [direct] | annual cadence; CKYC KIN linked to <abbr title="Foreign Account Tax Compliance Act (US)">FATCA</abbr> record at KRA; helps dedupe across intermediaries | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| A-ckyc_number | CKYC Identification Number | kra | CKYC_NO | CHAR(14) | on-modify | [direct] | KRA stores KIN as reference; masked in API responses post Jan 2025 | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/79 |
| A-ckyc_number | CKYC Identification Number (KIN) | mcx-ucc | CKYC_KIN | CHAR(14) | one-time | [direct] | Optional pass-through field | MCX/TECH/394/2023 |
| A-ckyc_number | CKYC Number | nsdl-bo | CKYCNb | CHAR(14) UDiFF | one-time | [direct] | ISO-tagged element; mandatory pipeline DP-KRA-CKYCRR per SEBI June 6, 2024 circular | NSDL/POLICY/2024/0086 |
| A-ckyc_number | CKYC Identification Number (KIN) | nse-ucc | CKYC_KIN | CHAR(14) | one-time | [direct] | 14-digit KIN; passed for record cross-reference | NSE/ISC/61817 |
| A-country_of_birth | Country of Birth | back-office | country_of_birth | CHAR(2) | one-time | [direct] | needed for FATCA US-person determination | [industry typical] |
| A-country_of_birth | Country of Birth | cdsl-bo | COUNTRY_OF_BIRTH | CHAR(2) | one-time | lookup against R | ISO 3166-1 alpha-2; required for FATCA flag captured at KRA but echoed in BO | CDSL/OPS/DP/POLCY/2024/107 |
| A-country_of_birth | Country of Birth | ckyc | COUNTRY_OF_BIRTH | CHAR(3) | one-time | lookup against R | CKYC uses ISO 3166 alpha-3; required for FATCA reasonableness | CKYC/2025/16 |
| A-country_of_birth | Country of Birth (Section A duplicate) | fatca-crs | COB_ALT | CHAR(2) | on-event | [direct] | same as J05; broker captures in both places; ISO-3166 alpha-2; reconciled at upload | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| A-country_of_birth | Country of Birth | kra | CTRY_OF_BIRTH | CHAR(2) | on-modify | lookup against R | ISO 3166-1 alpha-2; FATCA-mandatory field centralized at KRA since 01-Jul-2024 | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| A-country_of_birth | Country of Birth | nsdl-bo | CtryOfBirth | CHAR(2) UDiFF | one-time | lookup against R | ISO 3166-1 alpha-2 | NSDL/POLICY/2025/0056 |
| A-date_of_birth | Date of Birth | aml-fiu | DOB | DATE YYYYMMDD | on-event | formatted | required customer-attribute field in STR/CTR/CBWTR; passed as YYYY-MM-DD per FINnet schema | <abbr title="Financial Intelligence Unit — India">FIU-IND</abbr>-REPORTING-FORMAT-V114 |
| A-date_of_birth | Date of Birth | back-office | dob | DATE YYYYMMDD | one-time | formatted | Age>=18 enforced at ledger creation; drives age-group risk profile | [industry typical] |
| A-date_of_birth | Date of Birth | bse-ucc | DOB | DATE DD/MM/YYYY | one-time | formatted | Mandatory; <abbr title="Permanent Account Number">PAN</abbr>+Name+DOB must match Protean; post-registration changes require Unfreeze request with re-verification | BSE/20240223-42 |
| A-date_of_birth | Date of Birth | cdsl-bo | DOB | CHAR(8) | one-time | formatted | Reformat DD/MM/YYYY to YYYYMMDD in line 01; right-aligned positional; must match PAN record DOB | CDSL/OPS/DP/SYSTM/2023/119 |
| A-date_of_birth | Date of Birth | ckyc | DOB | DATE DD-MM-YYYY | one-time | formatted | CKYC uses DD-MM-YYYY in upload XML; mandatory | CKYC/2025/16 |
| A-date_of_birth | Date of Birth | contract-notes | none | none | on-trade | [direct] | not on <abbr title="Electronic Contract Note.">ECN</abbr> body; printed only on summary statements; retained in archive for STR cross-ref | [industry typical] |
| A-date_of_birth | Date of Birth | fatca-crs | DOB | DATE YYYYMMDD | on-event | formatted | converted to YYYY-MM-DD per <abbr title="Common Reporting Standard">CRS</abbr> XML schema; passed in OECD ReportableAccount block | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| A-date_of_birth | Date of Birth | kra | DOB | DATE DD/MM/YYYY | on-modify | formatted | Must match PAN <abbr title="Information Technology Department (within SEBI)">ITD</abbr> record; KRA rejects on mismatch via 3-param validation | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/41 |
| A-date_of_birth | Date of Birth | mcx-ucc | DOB | DATE DDMMYYYY | one-time | formatted | Mandatory; included in pipe-delimited record's financial/personal line | MCX/TECH/394/2023 |
| A-date_of_birth | Date of Birth | nsdl-bo | BirthDt | ISODate (YYYY-MM-DD) | one-time | formatted | ISO 8601 date element in UDiFF XML; must match Income Tax Department DOB returned in PAN-flag check | NSDL/POLICY/2024/0041 |
| A-date_of_birth | Date of Birth | nse-ucc | DOB | DATE DDMMYYYY | one-time | formatted | Mandatory for individuals (DOI for non-individuals); part of 3-param Protean check; mismatch = X rejection | NSE/ISC/61817 |
| A-date_of_birth | Date of Birth | rms | client_dob | DATE YYYYMMDD | one-time | formatted | age-group derives client category for <abbr title="Risk Management System">RMS</abbr> exposure limits | [industry typical] |
| A-din | Director Identification Number | cdsl-bo | DIN_NUMBER | CHAR(8) | one-time | [direct] | 8-digit DIN; optional; right-padded | CDSL/OPS/DP/POLCY/2024/208 |
| A-din | Director Identification Number | ckyc | DIN | CHAR(8) | one-time | [direct] | Optional in CKYC T1 | CKYC/2020/04 |
| A-din | Director Identification Number | kra | DIN | CHAR(8) | on-modify | [direct] | Optional; applicable only if customer is a director | [industry typical] |
| A-din | Director Identification Number | nsdl-bo | DIN | CHAR(8) UDiFF | one-time | [direct] | Optional 8-digit element | NSDL/POLICY/2025/0056 |
| A-disability_percentage | Disability Percentage | ckyc | PERCENTAGE_OF_IMPAIRMENT | NUMBER(3) | one-time | [direct] | Mandatory if differently_abled=Y per CKYC/2025/11 | CKYC/2025/11 |
| A-disability_percentage | Disability Percentage | kra | DISABILITY_PCT | NUMBER(3) | on-modify | [direct] | 0-100; conditional | [industry typical] |
| A-disability_type | Disability Type | back-office | disability_type | VARCHAR(2) | one-time | [direct] | lookup against code table; conditional only | [industry typical] |
| A-disability_type | Disability Type | ckyc | TYPE_OF_IMPAIRMENT | CHAR(2) | one-time | lookup against R | CKYC code table per CKYC/2025/11 Communique | CKYC/2025/11 |
| A-disability_type | Disability Type | kra | DISABILITY_TYPE | CHAR(2) | on-modify | lookup against R | Conditional on is_differently_abled=Y | [industry typical] |
| A-father_spouse_flag | Father/Spouse Flag | back-office | f_or_s_flag | CHAR(1) | one-time | [direct] | F or S; required on KYC AOF header in back-office | [industry typical] |
| A-father_spouse_flag | Father/Spouse Indicator | bse-ucc | FATHER_SPOUSE_FLAG | CHAR(1) | one-time | [direct] | F or S indicator | BSE/20240223-42 |
| A-father_spouse_flag | Father/Spouse Flag | cdsl-bo | FATHER_SPOUSE_FLAG | CHAR(1) | one-time | [direct] | Single position in line 01: 'F' or 'S'; mandatory | CDSL/OPS/DP/SYSTM/2023/119 |
| A-father_spouse_flag | Father/Spouse Indicator | ckyc | FATHER_SPOUSE_FLAG | CHAR(1) | one-time | [direct] | CKYC field; mandatory in template T1 | CKYC/2025/16 |
| A-father_spouse_flag | Father/Spouse Indicator | kra | FATHER_SPOUSE_FLAG | CHAR(1) | on-modify | [direct] | F=Father, S=Spouse; controls which name is captured | [industry typical] |
| A-father_spouse_flag | Father/Spouse Indicator | mcx-ucc | FATHER_SPOUSE_FLAG | CHAR(1) | one-time | [direct] | F=Father, S=Spouse; flows to BO file | MCX/TECH/394/2023 |
| A-father_spouse_flag | Father/Spouse Flag | nsdl-bo | FthrSpsFlg | CHAR(1) UDiFF | one-time | [direct] | ISO-tagged XML attribute; F=Father, S=Spouse | NSDL/POLICY/2025/0056 |
| A-father_spouse_flag | Father/Spouse Indicator | nse-ucc | FATHER_SPOUSE_FLAG | CHAR(1) | one-time | [direct] | F=Father, S=Spouse | NSE/ISC/61817 |
| A-father_spouse_name | Father/Spouse Name | back-office | father_spouse_nm | VARCHAR(70) | one-time | [direct] | printed on AOF copy retained 8 yrs per SEBI Stock Brokers Regulations | [industry typical] |
| A-father_spouse_name | Father/Spouse Name | bse-ucc | FATHER_SPOUSE_NAME | VARCHAR(70) | one-time | uppercase | Required in BEFS UCC profile | BSE/20240223-42 |
| A-father_spouse_name | Father/Spouse Name | cdsl-bo | FATHER_OR_SPOUSE_NAME | CHAR(70) | one-time | uppercase | Right-padded; mandatory per CDSL operating instructions; line 01 positional field | CDSL/OPS/DP/SYSTM/2023/119 |
| A-father_spouse_name | Father/Spouse Name | ckyc | FATHER_SPOUSE_NAME | VARCHAR(140) | one-time | formatted | CKYC validates against <abbr title="Officially Valid Document">OVD</abbr> where present; mandatory | CKYC/2025/16 |
| A-father_spouse_name | Father/Spouse Name | kra | FATHER_SPOUSE_NAME | VARCHAR(140) | on-modify | formatted | KRA stores as single concatenated string; uppercase preferred | [industry typical] |
| A-father_spouse_name | Father/Spouse Name | mcx-ucc | FATHER_SPOUSE_NAME | VARCHAR(70) | one-time | uppercase | Captured in pipe-delimited record | MCX/TECH/394/2023 |
| A-father_spouse_name | Father/Spouse Name | nsdl-bo | FthrSpsNm | VARCHAR(70) UDiFF | one-time | uppercase | Mandatory ISO-tagged element in BO Upload format | NSDL/POLICY/2025/0056 |
| A-father_spouse_name | Father/Spouse Name | nse-ucc | FATHER_SPOUSE_NAME | VARCHAR(70) | one-time | uppercase | Mandatory for KYC; appears in UCC profile | NSE/ISC/61817 |
| A-father_spouse_prefix | Father/Spouse Prefix | ckyc | FATHER_SPOUSE_PREFIX | VARCHAR(5) | one-time | [direct] | CKYC T1 mandatory | CKYC/2020/04 |
| A-father_spouse_prefix | Father/Spouse Prefix | kra | FATH_SPOUSE_PREFIX | VARCHAR(5) | on-modify | [direct] | Mr/Mrs/Ms based on relationship | [industry typical] |
| A-first_name | First Name | aml-fiu | FIRST_NAME | VARCHAR(70) | on-event | [direct] | split-name fields in FINnet 2.0 schema (XML elements FirstName/MiddleName/LastName) | FIU-IND-REPORTING-FORMAT-V114 |
| A-first_name | First Name | back-office | first_name | VARCHAR(70) | on-modify | [direct] | must match PAN; mismatch blocks ledger creation | [industry typical] |
| A-first_name | First Name | bse-ucc | FIRST_NAME | VARCHAR(85) | one-time | uppercase | Separate First/Middle/Last mandatory for individuals; Client Name limit 85 chars (revised Feb 2024) | BSE/20240223-42 |
| A-first_name | First Name | cdsl-bo | FIRST_HOLDER_FIRST_NAME | CHAR(40) | one-time | uppercase | Right-padded with spaces in fixed-length record line 01; must match PAN exactly (4th-char tolerance only); rejects mismatch >2 chars | CDSL/OPS/DP/SYSTM/2023/119 |
| A-first_name | First Name | ckyc | FIRST_NAME | VARCHAR(70) | one-time | formatted | CKYC validates against name on OVD; alpha+spaces only | CKYC/2025/16 |
| A-first_name | First Name | dlt-comms | FIRST_NAME_VAR | VARCHAR(20) | on-event | [direct] | used for salutation in transactional templates; capitalised on render | [industry typical] |
| A-first_name | First Name | kra | FIRST_NAME | VARCHAR(70) | on-modify | formatted | Must match PAN-card name exactly; KRA rejects on character-level mismatch | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/41 |
| A-first_name | First Name | mcx-ucc | FIRST_NAME | VARCHAR(70) | one-time | uppercase | Captured in pipe-delimited 2-row-per-client BO file format | MCX/TECH/394/2023 |
| A-first_name | First Name | nsdl-bo | FrstNm | VARCHAR(70) UDiFF | one-time | uppercase | ISO 20022-style element; UTF-8 in XML; must exactly match Income Tax Department record returned in PAN-flag check | NSDL/POLICY/2024/0041 |
| A-first_name | First Name | nse-ucc | FIRST_NAME | VARCHAR(70) | one-time | uppercase | Mandatory; must match PAN card; revised format separates First/Middle/Last | NSE/ISC/61817 |
| A-full_name | Full Name | aml-fiu | CUSTOMER_NAME | VARCHAR(200) | on-event | [direct] | STR/CTR header field; must match PAN-name; STR narrative also refers to name | FIU-IND-REPORTING-FORMAT-V114 |
| A-full_name | Full Name (Sanction Screening) | aml-fiu | SANCTION_SCREEN_NAME | VARCHAR(200) | on-event | uppercase | screened against UNSC 1267/1989 + MHA list per UAPA Sec 51A; positive match -> immediate freeze + STR | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/78 |
| A-full_name | Full Name | back-office | client_name | VARCHAR(200) | on-modify | concat with X | concatenation of first+middle+last; used on signed ECN | [industry typical] |
| A-full_name | Full Name (Description) | bse-ucc | CLIENT_NAME_DESC | VARCHAR(150) | one-time | concat with X | Optional 150-char description field; supplementary to First/Middle/Last | BSE/20240223-42 |
| A-full_name | Full Name | cdsl-bo | FIRST_HOLDER_FULL_NAME | CHAR(120) | one-time | concat with X | Concatenation of First+Middle+Last with single-space separator; right-padded; max 120 char window in line 01 | CDSL/OPS/DP/SYSTM/2023/119 |
| A-full_name | Full Name | ckyc | FULL_NAME | VARCHAR(200) | one-time | derived from Y | CKYCRR computes Name field internally; uploaded as concat | CKYC/2020/04 |
| A-full_name | Client Full Name | contract-notes | ClientName | VARCHAR(200) | on-trade | [direct] | prints on ECN exactly as in client master; mismatch with PAN-ITD triggers <abbr title="SEBI Complaints Redress System">SCORES</abbr> exposure | NSE/INSP/61999 |
| A-full_name | Full Name | dlt-comms | CLIENT_NAME_VAR | VARCHAR(30) | on-event | truncate to N | <abbr title="Short Message Service.">SMS</abbr> body limit 160 <abbr title="Graded Surveillance Measure">GSM</abbr>-7 chars; long names truncated to ~30 chars or rendered "Dear <First Name>" | [industry typical] |
| A-full_name | Full Name | fatca-crs | ACCOUNT_HOLDER_NAME | VARCHAR(200) | on-event | [direct] | must match PAN-name; CRS XML requires "ResCountryCode + <abbr title="Taxpayer Identification Number (in FATCA / CRS context)">TIN</abbr> + Name" key | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| A-full_name | Full Name | kra | FULL_NAME | VARCHAR(200) | on-modify | derived from Y | Derived from prefix+first+middle+last; some KRAs reject if mismatch with PAN ITD name | SEBI/HO/MIRSD/SECFATF/P/CIR/2023/169 |
| A-full_name | Full Name (Description) | mcx-ucc | CLIENT_NAME | VARCHAR(200) | one-time | concat with X | Captured as concatenated value in pipe-delimited record | MCX/TECH/394/2023 |
| A-full_name | Full Name | nsdl-bo | FullNm | VARCHAR(200) UDiFF | one-time | derived from Y | Derived from FrstNm+MddlNm+LastNm at submission; ISO-tagged element | NSDL/POLICY/2025/0056 |
| A-full_name | Full Name (Description) | nse-ucc | CLIENT_NAME | VARCHAR(80) | one-time | concat with X | Concat of First+Middle+Last; legacy field still emitted in UCC report; '6666666666'/'notprovided' disallowed | NSE/ISC/47869 |
| A-full_name | Client Full Name | regulatory-reports | ClientName | VARCHAR(200) | daily | [direct] | appears in <abbr title="Client Funding Report.">CFR</abbr> holding-statement API submission; not in margin files (UCC keyed) | NSE/INSP/55039 |
| A-gender | Gender | aml-fiu | GENDER | CHAR(1) | on-event | [direct] | M/F/T; XML element Gender; required in CTR per CTR banking format | FIU-IND-CTR-BANKING-FORMAT |
| A-gender | Gender | back-office | gender | CHAR(1) | one-time | [direct] | M/F/T; needed for ITR Form 16A and FATCA refresh | [industry typical] |
| A-gender | Gender | bse-ucc | GENDER | CHAR(1) | one-time | [direct] | M/F/T per <abbr title="Central Registry of Securitisation Asset Reconstruction and Security Interest of India">CERSAI</abbr> template | BSE/20240223-42 |
| A-gender | Gender | cdsl-bo | GENDER | CHAR(1) | one-time | [direct] | Single char position M/F/T; mandatory in line 01 | CDSL/OPS/DP/SYSTM/2023/119 |
| A-gender | Gender | ckyc | GENDER | CHAR(1) | one-time | [direct] | M/F/T per CERSAI template; mandatory | CKYC/2025/16 |
| A-gender | Gender | kra | GENDER | CHAR(1) | on-modify | [direct] | M=Male, F=Female, T=Transgender | [industry typical] |
| A-gender | Gender | mcx-ucc | GENDER | CHAR(1) | one-time | [direct] | M/F/T flows in UCC pipe-delimited record | MCX/TECH/394/2023 |
| A-gender | Gender | nsdl-bo | Gndr | CHAR(1) UDiFF | one-time | [direct] | ISO 5218 mapped (M/F/T); mandatory element | NSDL/POLICY/2025/0056 |
| A-gender | Gender | nse-ucc | GENDER | CHAR(1) | one-time | [direct] | M=Male, F=Female, T=Transgender | NSE/ISC/61817 |
| A-is_differently_abled | Differently Abled Flag | back-office | diff_abled_flg | CHAR(1) | one-time | [direct] | drives accessibility-mode contract-note dispatch | [industry typical] |
| A-is_differently_abled | Differently Abled Status | ckyc | DIFFERENTLY_ABLED_STATUS | CHAR(1) | one-time | [direct] | New field added per Supreme Court order; bulk file v1.3; effective 30-Sep-2025 | CKYC/2025/11 |
| A-is_differently_abled | Differently Abled Status | kra | DIFF_ABLED_FLAG | CHAR(1) | on-modify | [direct] | Y/N; KRA template typically follows CKYC field | [industry typical] |
| A-last_name | Last Name | aml-fiu | LAST_NAME | VARCHAR(70) | on-event | [direct] | required XML element LastName | FIU-IND-REPORTING-FORMAT-V114 |
| A-last_name | Last Name | back-office | last_name | VARCHAR(70) | on-modify | [direct] | PAN-match strict; downstream to ITR Form 16A dispatch | [industry typical] |
| A-last_name | Last Name | bse-ucc | LAST_NAME | VARCHAR(85) | one-time | uppercase | Mandatory; must match Protean record; reduced 85-char limit | BSE/20240223-42 |
| A-last_name | Last Name | cdsl-bo | FIRST_HOLDER_LAST_NAME | CHAR(40) | one-time | uppercase | Right-padded with spaces; mandatory; rejection code 'NAME MISMATCH' if differs from PAN record returned by Protean | CDSL/OPS/DP/SYSTM/2023/119 |
| A-last_name | Last Name | ckyc | LAST_NAME | VARCHAR(70) | one-time | formatted | Mandatory; concatenated for FULL_NAME on output | CKYC/2025/16 |
| A-last_name | Last Name | kra | LAST_NAME | VARCHAR(70) | on-modify | formatted | Must match PAN; rejection codes include name-mismatch class | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/41 |
| A-last_name | Last Name | mcx-ucc | LAST_NAME | VARCHAR(70) | one-time | uppercase | Mandatory in UCC record | MCX/TECH/394/2023 |
| A-last_name | Last Name | nsdl-bo | LastNm | VARCHAR(70) UDiFF | one-time | uppercase | Mandatory in ISO-tagged XML; concatenated FrstNm+MddlNm+LastNm must equal Income Tax record name | NSDL/POLICY/2024/0041 |
| A-last_name | Last Name | nse-ucc | LAST_NAME | VARCHAR(70) | one-time | uppercase | Mandatory; must match PAN; part of Name in 3-param Protean check | NSE/ISC/61817 |
| A-maiden_first_name | Maiden First Name | back-office | maiden_name | VARCHAR(70) | on-modify | [direct] | BSE Unfreeze process references maiden name on name-change | [industry typical] |
| A-maiden_first_name | Maiden First Name | ckyc | MAIDEN_FIRST_NAME | VARCHAR(70) | one-time | formatted | CKYC T1 maiden section; helps legacy-record matching per CKYC/2026/08 | CKYC/2026/08 |
| A-maiden_first_name | Maiden First Name | kra | MAIDEN_FIRST_NAME | VARCHAR(70) | on-modify | formatted | Optional in KRA template; populated for name-change cases | [industry typical] |
| A-maiden_last_name | Maiden Last Name | ckyc | MAIDEN_LAST_NAME | VARCHAR(70) | one-time | formatted | CKYC maiden subsection | CKYC/2020/04 |
| A-maiden_last_name | Maiden Last Name | kra | [same] | VARCHAR(70) | on-modify | formatted | Optional | [industry typical] |
| A-maiden_middle_name | Maiden Middle Name | ckyc | MAIDEN_MIDDLE_NAME | VARCHAR(70) | one-time | formatted | CKYC maiden subsection | CKYC/2020/04 |
| A-maiden_middle_name | Maiden Middle Name | kra | [same] | VARCHAR(70) | on-modify | formatted | Optional | [industry typical] |
| A-maiden_prefix | Maiden Prefix | ckyc | MAIDEN_PREFIX | VARCHAR(5) | one-time | [direct] | CKYC T1 captures pre-marriage prefix | CKYC/2020/04 |
| A-maiden_prefix | Maiden Prefix | kra | [same] | VARCHAR(5) | on-modify | [direct] | Optional; only if name changed after marriage | [industry typical] |
| A-marital_status | Marital Status | back-office | marital_status | CHAR(1) | on-modify | [direct] | drives name-change workflow on marriage | [industry typical] |
| A-marital_status | Marital Status | bse-ucc | MARITAL_STATUS | CHAR(1) | one-time | [direct] | S/M/O | BSE/20240223-42 |
| A-marital_status | Marital Status | cdsl-bo | MARITAL_STATUS | CHAR(1) | one-time | [direct] | Optional code S/M/O in line 01 reserved position | CDSL/OPS/DP/POLCY/2024/208 |
| A-marital_status | Marital Status | ckyc | MARITAL_STATUS | CHAR(1) | one-time | [direct] | CKYC optional in T1 | CKYC/2020/04 |
| A-marital_status | Marital Status | kra | MARITAL_STATUS | CHAR(1) | on-modify | [direct] | S=Single, M=Married, O=Others | [industry typical] |
| A-marital_status | Marital Status | mcx-ucc | MARITAL_STATUS | CHAR(1) | one-time | [direct] | S/M/O | MCX/TECH/394/2023 |
| A-marital_status | Marital Status | nsdl-bo | MrtlSts | CHAR(1) UDiFF | one-time | [direct] | Optional ISO-tagged element | NSDL/POLICY/2025/0056 |
| A-marital_status | Marital Status | nse-ucc | MARITAL_STATUS | CHAR(1) | one-time | [direct] | S=Single, M=Married, O=Others | NSE/ISC/61817 |
| A-middle_name | Middle Name | aml-fiu | MIDDLE_NAME | VARCHAR(70) | on-event | [direct] | optional XML element MiddleName | FIU-IND-REPORTING-FORMAT-V114 |
| A-middle_name | Middle Name | back-office | middle_name | VARCHAR(70) | on-modify | [direct] | null-allowed; rendered on contract note Annexure A header | [industry typical] |
| A-middle_name | Middle Name | bse-ucc | MIDDLE_NAME | VARCHAR(85) | one-time | uppercase | Separate Middle name field in revised UCC (post Mar 28 2024) | BSE/20240223-42 |
| A-middle_name | Middle Name | cdsl-bo | FIRST_HOLDER_MIDDLE_NAME | CHAR(40) | one-time | uppercase | Right-padded with spaces; optional field but positions in line 01 are reserved; blank fill if absent | CDSL/OPS/DP/SYSTM/2023/119 |
| A-middle_name | Middle Name | ckyc | MIDDLE_NAME | VARCHAR(70) | one-time | formatted | CKYC T1 field; optional | CKYC/2020/04 |
| A-middle_name | Middle Name | kra | MIDDLE_NAME | VARCHAR(70) | on-modify | formatted | Optional; if present must match PAN | [industry typical] |
| A-middle_name | Middle Name | mcx-ucc | MIDDLE_NAME | VARCHAR(70) | one-time | uppercase | Optional in pipe-delimited UCC record | MCX/TECH/394/2023 |
| A-middle_name | Middle Name | nsdl-bo | MddlNm | VARCHAR(70) UDiFF | one-time | uppercase | Optional XML element; omit tag or empty value if not provided | NSDL/POLICY/2024/0041 |
| A-middle_name | Middle Name | nse-ucc | MIDDLE_NAME | VARCHAR(70) | one-time | uppercase | Optional; concatenated for legacy fullname callers | NSE/ISC/61817 |
| A-mother_name | Mother Name | back-office | mother_name | VARCHAR(70) | one-time | [direct] | transmission docs lookup uses mother name | [industry typical] |
| A-mother_name | Mother's Name | cdsl-bo | MOTHER_NAME | CHAR(70) | one-time | uppercase | Optional position in line 01; blank-pad with spaces if absent | CDSL/OPS/DP/POLCY/2024/208 |
| A-mother_name | Mother Name | ckyc | MOTHER_NAME | VARCHAR(70) | one-time | formatted | Mandatory after <abbr title="Prevention of Money Laundering Act 2002">PMLA</abbr> Maintenance of Records 2nd Amendment Rules 2023 | SEBI/HO/MIRSD/<abbr title="Securities — Financial Action Task Force (SEBI internal cell)">SEC-FATF</abbr>/P/CIR/2023/0170 |
| A-mother_name | Mother Name | kra | MOTHER_NAME | VARCHAR(70) | on-modify | formatted | Optional | [industry typical] |
| A-mother_name | Mother's Name | nsdl-bo | MthrNm | VARCHAR(70) UDiFF | one-time | uppercase | Optional element; included for transmission-to-legal-heir scenarios under TLH framework | NSDL/POLICY/2025/0126 |
| A-mother_prefix | Mother Prefix | ckyc | MOTHER_PREFIX | VARCHAR(5) | one-time | [direct] | CKYC T1 mother-section | CKYC/2020/04 |
| A-mother_prefix | Mother Prefix | kra | MOTHER_PREFIX | VARCHAR(5) | on-modify | [direct] | Optional in KRA | [industry typical] |
| A-nationality | Nationality | aml-fiu | NATIONALITY | CHAR(2) | on-event | [direct] | ISO-3166 alpha-2; STR risk-classification uses nationality + residential status | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/78 |
| A-nationality | Nationality | back-office | nationality_code | CHAR(2) | on-modify | [direct] | ISO code; if non-IN flags FATCA reporting workflow | [industry typical] |
| A-nationality | Nationality | bse-ucc | NATIONALITY | CHAR(2) | one-time | lookup against R | ISO code; required field | BSE/20240223-42 |
| A-nationality | Nationality | cdsl-bo | NATIONALITY | CHAR(2) | one-time | lookup against R | ISO 3166-1 alpha-2 country code mapped from CDSL nationality code table; IN for Indian; line 02 position | CDSL/OPS/DP/SYSTM/2023/119 |
| A-nationality | Nationality | ckyc | NATIONALITY | CHAR(3) | one-time | lookup against R | CERSAI uses ISO 3166 alpha-3 codes in master country list | CKYC/2025/16 |
| A-nationality | Nationality | fatca-crs | NATIONALITY_ISO | CHAR(2) | on-event | [direct] | ISO-3166 alpha-2; not the same as tax residence in FATCA/CRS; separate field on KRA template | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| A-nationality | Nationality | kra | NATIONALITY | CHAR(2) | on-modify | lookup against R | ISO 3166-1 alpha-2; IN=Indian default | [industry typical] |
| A-nationality | Nationality | mcx-ucc | NATIONALITY | CHAR(2) | one-time | lookup against R | ISO code; required for Foreign category clients | MCX/TECH/394/2023 |
| A-nationality | Nationality | nsdl-bo | Ctry | CHAR(2) UDiFF | one-time | lookup against R | ISO 3166-1 alpha-2 element; default IN; UDiFF V2.0.0.0 catalogue | NSDL/POLICY/2025/0042 |
| A-nationality | Nationality | nse-ucc | NATIONALITY | CHAR(2) | one-time | lookup against R | ISO country code; default IN | NSE/ISC/61817 |
| A-pan_aadhaar_seeding_status | PAN-Aadhaar Linkage Status | cdsl-bo | PAN_AADHAAR_LINK | CHAR(1) | on-event | [direct] | Y/N; freeze reason code 39 if N (CDSL POLCY/2023/643); resolved per SEBI May 14, 2024 simplification | CDSL/OPS/DP/POLCY/2023/643 |
| A-pan_aadhaar_seeding_status | PAN-Aadhaar Linkage Status | nsdl-bo | PANAdhaarLnkSts | CHAR(1) UDiFF | on-event | [direct] | Reason code 39 historical; resolved per NSDL/POLICY/2024/0074 | NSDL/POLICY/2024/0071 |
| A-pan_exempt | PAN Exempt Flag | back-office | pan_exempt_flag | CHAR(1) | one-time | [direct] | Y/N; sets PAN-exempt code in income/charges module | [industry typical] |
| A-pan_exempt | PAN Exempt Flag | cdsl-bo | PAN_EXEMPT_FLAG | CHAR(1) | one-time | [direct] | Y/N flag for specific govt categories; if Y, PAN field may be blank-padded | CDSL/OPS/DP/POLCY/2024/208 |
| A-pan_exempt | PAN Exempt Flag | ckyc | PAN_EXEMPTED | CHAR(1) | one-time | [direct] | CKYC accepts Form 60 in lieu of PAN for exempt categories | CKYC/2025/16 |
| A-pan_exempt | PAN Exempt Flag | kra | PAN_EXEMPT | CHAR(1) | on-modify | [direct] | Y/N flag for specific govt categories; rare in broking | [industry typical] |
| A-pan_exempt | PAN Exempt Flag | nsdl-bo | PANExmptFlg | CHAR(1) UDiFF | one-time | [direct] | Y/N ISO-tagged element; rare exemption category | NSDL/POLICY/2025/0056 |
| A-pan_exempt_category | PAN Exempt Category | back-office | pan_exempt_cat | VARCHAR(2) | one-time | [direct] | lookup against govt-category code table; rare | [industry typical] |
| A-pan_exempt_category | PAN Exempt Category | ckyc | PAN_EXEMPT_CATEGORY | CHAR(2) | one-time | lookup against R | CERSAI publishes exempt category codes; align with PML Rules Rule 9 | CKYC/2025/16 |
| A-pan_exempt_category | PAN Exempt Category | kra | PAN_EXEMPT_CATG | CHAR(2) | on-modify | lookup against R | Required if pan_exempt=Y; code table maintained by intermediary | [industry typical] |
| A-pan_number | PAN Number | aml-fiu | CUSTOMER_PAN | CHAR(10) | on-event | uppercase | primary client identifier in all FIU reports; STR/CTR rejected by FINnet if PAN missing/invalid format | FIU-IND-REPORTING-FORMAT-V114 |
| A-pan_number | PAN (UAPA Screening) | aml-fiu | UAPA_SCREEN_KEY | CHAR(10) | on-event | uppercase | PAN re-screened on every UNSC list refresh; positive match -> freeze + MHA report via FIU-IND | FIU-IND-UAPA-UNSC-UPDATE-21022025 |
| A-pan_number | PAN Number | back-office | pan_no | CHAR(10) | on-modify | uppercase | primary key in client master; drives ledger, contract notes, statements | SEBI/HO/MIRSD/POD-1/P/CIR/2025/94 |
| A-pan_number | PAN Number | bse-ucc | PAN | CHAR(10) | one-time | uppercase | Validated against Protean eGov; PAN+Name+DOB must all match; mandatory field in revised UCC | BSE/20240223-42 |
| A-pan_number | PAN Number | cdsl-bo | FIRST_HOLDER_PAN | CHAR(10) | one-time | uppercase | Line 01 of BO opening fixed-length record; 4th char must be 'P' for Individual; right-padded with spaces; PAN-flag finalization 5-7 days post-opening before trading enabled | CDSL/OPS/DP/SYSTM/2023/119 |
| A-pan_number | PAN Number | ckyc | PAN | CHAR(10) | one-time | uppercase | Format \[A-Z\]{5}\[0-9\]{4}\[A-Z\] validated by CKYCRR; mandatory at upload | CKYC/2025/16 |
| A-pan_number | PAN Number | contract-notes | ClientPAN | CHAR(10) | on-trade | uppercase | printed verbatim on ECN; 4th char identifies entity type; mandatory header field per revised Annexure A/B | NSE/INSP/61999 |
| A-pan_number | PAN Number for Tax Invoice | contract-notes | GSTIN_Customer | VARCHAR(15) | on-trade | derived from Y | GSTIN derived from PAN + state-code for B2B customers (15 char); blank for B2C | NSE/INSP/61999 |
| A-pan_number | PAN Number | fatca-crs | INDIA_TIN_PAN | CHAR(10) | on-event | uppercase | PAN serves as India TIN for FATCA/CRS; uploaded as primary tax-identifier with country=IN | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| A-pan_number | PAN Number | kra | PAN_NO | CHAR(10) | on-modify | uppercase | Validated 3-param (PAN+Name+DOB) against Protean; alphanumeric, 4th char P=Individual; rejection if mismatch | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/41 |
| A-pan_number | PAN Number | mcx-ucc | PAN | CHAR(10) | one-time | uppercase | Mandatory in UCC database; also required on ERROR account (must match member's PAN per IT records) | MCX/S&I/644/2024 |
| A-pan_number | PAN Number | nsdl-bo | FirstHldrPANNb | CHAR(10) UDiFF | one-time | uppercase | ISO-tagged XML element FirstHldrPANNb; conditionally required per V2.0.0.0; pattern \[A-Z\]{5}\[0-9\]{4}\[A-Z\]; PAN/Aadhaar linkage validated post-opening | NSDL/POLICY/2025/0042 |
| A-pan_number | PAN Number | nse-ucc | PAN | CHAR(10) | one-time | uppercase | 3-param check (PAN+Name+DOB) against Protean; rejection: A=approved, X=mismatch; mandatory per NSE/ISC/47869 | NSE/ISC/47869 |
| A-pan_number | PAN Number | regulatory-reports | ClientPAN | CHAR(10) | daily | uppercase | primary client key in MG-12 / SA01-06 / AMGTM client-margin files | <abbr title="NSE Clearing Limited (formerly National Securities Clearing Corporation Limited)">NCL</abbr>/CMPL/44977 |
| A-pan_number | PAN Number | regulatory-reports | TM_PAN | CHAR(10) | daily | uppercase | trading member PAN included in CFR header; not client PAN | NSE/INSP/55039 |
| A-pan_number | PAN Number | rms | client_pan | CHAR(10) | on-modify | uppercase | PAN is the primary client key for margin envelope keyed by UCC->PAN | [industry typical] |
| A-pan_verify_status | PAN Flag Status | cdsl-bo | PAN_FLAG_STATUS | CHAR(1) | on-event | [direct] | Final gate before trading: PAN flag finalization 5-7 days after BO opening once Income Tax Department validates; values P=Pending, V=Valid, X=Invalid; account remains in suspended state until V | CDSL/OPS/DP/POLCY/2026/234 |
| A-pan_verify_status | PAN Flag Status | nsdl-bo | PANFlgSts | CHAR(1) UDiFF | on-event | [direct] | PAN-flag finalization is the final gate 5-7 days post-opening; until then account is restricted; updated via Client Maintenance API | NSDL/POLICY/2024/0071 |
| A-photograph | Customer Photograph | ckyc | PHOTOGRAPH | BLOB | one-time | [direct] | CKYC: 200x230 pixels, max 100kb, passport size colour | CERSAI/2023-24 |
| A-photograph | Customer Photograph | kra | PHOTO | BLOB | on-modify | [direct] | Passport-size, recent, colour, max 1MB | [industry typical] |
| A-place_of_birth | Place of Birth | back-office | place_of_birth | VARCHAR(50) | one-time | [direct] | FATCA self-cert audit trail | [industry typical] |
| A-place_of_birth | Place of Birth | cdsl-bo | PLACE_OF_BIRTH | CHAR(50) | one-time | [direct] | Optional; right-padded with spaces | CDSL/OPS/DP/POLCY/2024/208 |
| A-place_of_birth | Place of Birth | ckyc | PLACE_OF_BIRTH | VARCHAR(50) | one-time | formatted | CKYC T1 mandatory after revised template 2.0 | CKYC/2020/04 |
| A-place_of_birth | Place of Birth (Section A) | fatca-crs | POB_ALT | VARCHAR(50) | on-event | [direct] | same as J06; FATCA template uses Section J entry; Section A entry used for KRA | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| A-place_of_birth | Place of Birth | kra | PLACE_OF_BIRTH | VARCHAR(50) | on-modify | formatted | Optional in KRA; required for FATCA cross-check | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| A-place_of_birth | Place of Birth | nsdl-bo | BirthPlc | VARCHAR(50) UDiFF | one-time | [direct] | Optional ISO-tagged element | NSDL/POLICY/2025/0056 |
| A-prefix | Salutation | back-office | salutation | VARCHAR(5) | on-modify | [direct] | appears on contract-note header and welcome kit | [industry typical] |
| A-prefix | Name Prefix / Salutation | bse-ucc | SALUTATION | VARCHAR(5) | one-time | [direct] | Optional in BEFS UCC submission | BSE/20240223-42 |
| A-prefix | Name Prefix | cdsl-bo | FIRST_HOLDER_PREFIX | CHAR(5) | one-time | [direct] | Salutation Mr/Mrs/Ms/Dr; right-padded; line 01 | CDSL/OPS/DP/POLCY/2024/208 |
| A-prefix | Name Prefix | ckyc | PREFIX | VARCHAR(5) | one-time | [direct] | CKYC T1 Individual template field; salutation only | CKYC/2020/04 |
| A-prefix | Name Prefix | kra | PREFIX | VARCHAR(5) | on-modify | [direct] | Mr/Mrs/Ms/Dr; KRA template accepts as separate token | [industry typical] |
| A-prefix | Name Prefix / Salutation | mcx-ucc | SALUTATION | VARCHAR(5) | one-time | [direct] | Captured in pipe-delimited 2-row record (header line) | MCX/TECH/394/2023 |
| A-prefix | Name Prefix | nsdl-bo | Prfx | VARCHAR(5) UDiFF | one-time | [direct] | Optional prefix element | NSDL/POLICY/2025/0056 |
| A-prefix | Name Prefix / Salutation | nse-ucc | SALUTATION | VARCHAR(5) | one-time | [direct] | Mr/Mrs/Ms/Dr; optional but commonly populated | NSE/ISC/61817 |
| A-residential_status | Residential Status | aml-fiu | RES_STATUS | CHAR(2) | on-event | lookup against R | RI/<abbr title="Non-Resident Indian">NRI</abbr>/FN/PIO; NRI cross-border txns trigger CBWTR; FN flagged for EDD | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/78 |
| A-residential_status | Residential Status | back-office | resi_status | VARCHAR(3) | on-modify | [direct] | RI/NRI/FN/PIO; NRI flag activates <abbr title="Portfolio Investment Scheme (RBI / NRI)">PIS</abbr>-route ledger flags | [industry typical] |
| A-residential_status | Residential Status | back-office | tds_on_payout_rate | NUMBER(5,2) | on-event | lookup against R | TDS on NRI fund-payout per IT Act sec 195; resident no TDS at broker level | Income Tax Act sec 195 |
| A-residential_status | Residential Status | bse-ucc | RES_STATUS | CHAR(2) | one-time | [direct] | RI/NRI/FN/PIO determines UCC category (e.g., FDI/DR split per BSE Jan 2025) | BSE/20250110-47 |
| A-residential_status | Residential Status | cdsl-bo | RES_STATUS | CHAR(2) | one-time | lookup against R | Code table RI/NR/FN/PI; affects BO sub-status code in line 02; NRI sub-type triggers separate flow | CDSL/OPS/DP/SYSTM/2023/119 |
| A-residential_status | NRI Sub-Status Code | cdsl-bo | BO_SUB_STATUS | CHAR(2) | one-time | lookup against R | 2-char BO sub-status code; e.g. NRI Repatriable=22, NRI Non-Repatriable=23; line 02 | CDSL/OPS/DP/SYSTM/2023/119 |
| A-residential_status | Residential Status | ckyc | RESIDENTIAL_STATUS | CHAR(2) | one-time | [direct] | New field added to CKYC template via CKYC/2025/03 Revised; effective 30-May-2025 | CKYC/2025/03_Revised |
| A-residential_status | Residential Status | fatca-crs | RES_STATUS_CODE | CHAR(2) | on-event | lookup against R | RI/NRI/FN/PIO drives whether self-certification mandatory and which template variant | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| A-residential_status | Residential Status | kra | RESI_STATUS | CHAR(2) | on-modify | [direct] | RI/NRI/FN/PIO; KRA accepts via 2024 master KYC circular | SEBI/HO/MIRSD/SECFATF/P/CIR/2023/169 |
| A-residential_status | Residential Status | mcx-ucc | RES_STATUS | CHAR(2) | one-time | [direct] | Drives client category (Foreign category in HE/SP/AR/Farmer/VCP/DFI/Foreign/Other) | MCX/TECH/394/2023 |
| A-residential_status | Residential Status | nsdl-bo | ResdtlSts | CHAR(2) UDiFF | one-time | lookup against R | Maps to BO client-type code in BO Upload; NRI triggers PIS account validation | NSDL/POLICY/2025/0056 |
| A-residential_status | NRI Sub-Status Code | nsdl-bo | BOSubSts | CHAR(2) UDiFF | one-time | lookup against R | Sub-status code element; NRI/PIO/OCI codes differ | NSDL/POLICY/2025/0056 |
| A-residential_status | Residential Status | nse-ucc | RES_STATUS | CHAR(2) | one-time | [direct] | RI=Resident Indian, NRI, FN=Foreign National, PIO; drives client_type | NSE/ISC/61817 |
| A-residential_status | Residential Status | regulatory-reports | ClientCategory | CHAR(2) | daily | lookup against R | drives NRI flag in MG-12 client-category column; restricts intraday route | NSE/ISC/61817 |
| A-residential_status | Residential Status | rms | resi_category | VARCHAR(3) | on-modify | [direct] | NRI flag triggers PIS-route segment block in pre-trade pipeline | [industry typical] |
| A-signature | Customer Signature | ckyc | SIGNATURE | BLOB | one-time | [direct] | CKYC signature image stored with photograph and OVDs | CERSAI/2023-24 |
| A-signature | Customer Signature | kra | SIGNATURE | BLOB | on-modify | [direct] | White background; JPEG/PNG max 500KB | [industry typical] |
| A-udid_number | UDID Number | back-office | udid_no | VARCHAR(18) | one-time | [direct] | Unique Disability ID; conditional | [industry typical] |
| A-udid_number | UDID Number | ckyc | UDID_NUMBER | VARCHAR(18) | one-time | uppercase | UDID introduced via CKYC/2025/11; CKYC API v1.3 download supports field | CKYC/2025/11 |
| A-udid_number | UDID Number | kra | UDID | VARCHAR(18) | on-modify | uppercase | Format \[A-Z\]{2}\d{16} | [industry typical] |

## Verified through

2026-05-14

---

*AI-generated and not legal advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*

---
title: "NSDL BO Opening — Fields consumed"
description: "Every field consumed by NSDL BO Opening, with source section, destination format, update frequency, transformation rule, and quirks. Use this when building an integration with this destination."
---

> **Why this page is structured this way:** This is the destination-first view for <abbr title="National Securities Depository Limited">NSDL</abbr> <abbr title="Beneficial Owner">BO</abbr> Opening. Engineers building an integration with this destination get the complete field list on one page. To see where each field originated in onboarding, follow the per-section links via the [atlas overview](/broking-kyc/reference/field-atlas/).

## TL;DR

- **107 unique fields** consumed by NSDL BO Opening.
- Source spans sections: A, B, C, G, H, I, O.
- **108 rows cite a public spec source**; **0** are `[industry typical]`.

## Field-destination rows

Sorted by `source_section`, then `field_id`.

| source_section | field_id | field_name | destination_field_name | destination_format | frequency | transformation | quirks_notes | spec_source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| A | A-aadhaar_number | Aadhaar (Masked) | AdhaarMskdNb | CHAR(12) UDiFF | one-time | formatted | Masked Aadhaar (first 8 X, last 4 visible) in ISO-tagged element; full Aadhaar prohibited by <abbr title="Digital Personal Data Protection Act 2023 (and Rules 2025)">DPDP</abbr> | NSDL/POLICY/2025/0056 |
| A | A-ckyc_number | <abbr title="Central KYC (records registry)">CKYC</abbr> Number | CKYCNb | CHAR(14) UDiFF | one-time | [direct] | ISO-tagged element; mandatory pipeline <abbr title="Depository Participant">DP</abbr>-<abbr title="KYC Registration Agency">KRA</abbr>-CKYCRR per <abbr title="Securities and Exchange Board of India">SEBI</abbr> June 6, 2024 circular | NSDL/POLICY/2024/0086 |
| A | A-country_of_birth | Country of Birth | CtryOfBirth | CHAR(2) UDiFF | one-time | lookup against R | ISO 3166-1 alpha-2 | NSDL/POLICY/2025/0056 |
| A | A-date_of_birth | Date of Birth | BirthDt | ISODate (YYYY-MM-DD) | one-time | formatted | ISO 8601 date element in UDiFF XML; must match Income Tax Department DOB returned in <abbr title="Permanent Account Number">PAN</abbr>-flag check | NSDL/POLICY/2024/0041 |
| A | A-din | Director Identification Number | DIN | CHAR(8) UDiFF | one-time | [direct] | Optional 8-digit element | NSDL/POLICY/2025/0056 |
| A | A-father_spouse_flag | Father/Spouse Flag | FthrSpsFlg | CHAR(1) UDiFF | one-time | [direct] | ISO-tagged XML attribute; F=Father, S=Spouse | NSDL/POLICY/2025/0056 |
| A | A-father_spouse_name | Father/Spouse Name | FthrSpsNm | VARCHAR(70) UDiFF | one-time | uppercase | Mandatory ISO-tagged element in BO Upload format | NSDL/POLICY/2025/0056 |
| A | A-first_name | First Name | FrstNm | VARCHAR(70) UDiFF | one-time | uppercase | ISO 20022-style element; UTF-8 in XML; must exactly match Income Tax Department record returned in PAN-flag check | NSDL/POLICY/2024/0041 |
| A | A-full_name | Full Name | FullNm | VARCHAR(200) UDiFF | one-time | derived from Y | Derived from FrstNm+MddlNm+LastNm at submission; ISO-tagged element | NSDL/POLICY/2025/0056 |
| A | A-gender | Gender | Gndr | CHAR(1) UDiFF | one-time | [direct] | ISO 5218 mapped (M/F/T); mandatory element | NSDL/POLICY/2025/0056 |
| A | A-last_name | Last Name | LastNm | VARCHAR(70) UDiFF | one-time | uppercase | Mandatory in ISO-tagged XML; concatenated FrstNm+MddlNm+LastNm must equal Income Tax record name | NSDL/POLICY/2024/0041 |
| A | A-marital_status | Marital Status | MrtlSts | CHAR(1) UDiFF | one-time | [direct] | Optional ISO-tagged element | NSDL/POLICY/2025/0056 |
| A | A-middle_name | Middle Name | MddlNm | VARCHAR(70) UDiFF | one-time | uppercase | Optional XML element; omit tag or empty value if not provided | NSDL/POLICY/2024/0041 |
| A | A-mother_name | Mother's Name | MthrNm | VARCHAR(70) UDiFF | one-time | uppercase | Optional element; included for transmission-to-legal-heir scenarios under TLH framework | NSDL/POLICY/2025/0126 |
| A | A-nationality | Nationality | Ctry | CHAR(2) UDiFF | one-time | lookup against R | ISO 3166-1 alpha-2 element; default IN; UDiFF V2.0.0.0 catalogue | NSDL/POLICY/2025/0042 |
| A | A-pan_aadhaar_seeding_status | PAN-Aadhaar Linkage Status | PANAdhaarLnkSts | CHAR(1) UDiFF | on-event | [direct] | Reason code 39 historical; resolved per NSDL/POLICY/2024/0074 | NSDL/POLICY/2024/0071 |
| A | A-pan_exempt | PAN Exempt Flag | PANExmptFlg | CHAR(1) UDiFF | one-time | [direct] | Y/N ISO-tagged element; rare exemption category | NSDL/POLICY/2025/0056 |
| A | A-pan_number | PAN Number | FirstHldrPANNb | CHAR(10) UDiFF | one-time | uppercase | ISO-tagged XML element FirstHldrPANNb; conditionally required per V2.0.0.0; pattern \[A-Z\]{5}\[0-9\]{4}\[A-Z\]; PAN/Aadhaar linkage validated post-opening | NSDL/POLICY/2025/0042 |
| A | A-pan_verify_status | PAN Flag Status | PANFlgSts | CHAR(1) UDiFF | on-event | [direct] | PAN-flag finalization is the final gate 5-7 days post-opening; until then account is restricted; updated via Client Maintenance API | NSDL/POLICY/2024/0071 |
| A | A-place_of_birth | Place of Birth | BirthPlc | VARCHAR(50) UDiFF | one-time | [direct] | Optional ISO-tagged element | NSDL/POLICY/2025/0056 |
| A | A-prefix | Name Prefix | Prfx | VARCHAR(5) UDiFF | one-time | [direct] | Optional prefix element | NSDL/POLICY/2025/0056 |
| A | A-residential_status | Residential Status | ResdtlSts | CHAR(2) UDiFF | one-time | lookup against R | Maps to BO client-type code in BO Upload; <abbr title="Non-Resident Indian">NRI</abbr> triggers <abbr title="Portfolio Investment Scheme (RBI / NRI)">PIS</abbr> account validation | NSDL/POLICY/2025/0056 |
| A | A-residential_status | NRI Sub-Status Code | BOSubSts | CHAR(2) UDiFF | one-time | lookup against R | Sub-status code element; NRI/PIO/OCI codes differ | NSDL/POLICY/2025/0056 |
| B | B-corr_address_line1 | Correspondence Address Line 1 | AdrLine1 | VARCHAR(100) UDiFF | on-modify | [direct] | ISO 20022-style address element; UDiFF AdrLine1 within PstlAdr block | NSDL/POLICY/2025/0042 |
| B | B-corr_address_line2 | Correspondence Address Line 2 | AdrLine2 | VARCHAR(100) UDiFF | on-modify | [direct] | Optional ISO-tagged element | NSDL/POLICY/2024/0041 |
| B | B-corr_address_line3 | Correspondence Address Line 3 | AdrLine3 | VARCHAR(100) UDiFF | on-modify | [direct] | Optional | NSDL/POLICY/2024/0041 |
| B | B-corr_address_proof_type | Correspondence Address Proof Type | AdrPrfTp | CHAR(2) UDiFF | one-time | lookup against R | <abbr title="Power of Attorney">POA</abbr> type code element; mandatory | NSDL/POLICY/2025/0056 |
| B | B-corr_city | Correspondence City | TwnNm | VARCHAR(50) UDiFF | on-modify | [direct] | ISO 20022 TwnNm element; mandatory | NSDL/POLICY/2024/0041 |
| B | B-corr_country | Correspondence Country | Ctry | CHAR(2) UDiFF | on-modify | lookup against R | ISO 3166-1 alpha-2 country code in PstlAdr block | NSDL/POLICY/2024/0041 |
| B | B-corr_pincode | Correspondence Pincode | PstCd | CHAR(6) UDiFF | on-modify | [direct] | ISO 20022 PstCd element; numeric validation | NSDL/POLICY/2024/0041 |
| B | B-corr_state | Correspondence State | CtrySubDvsn | CHAR(2) UDiFF | on-modify | lookup against R | ISO 3166-2 subdivision (e.g. IN-MH); mandatory; per V2.0.0.0 catalogue | NSDL/POLICY/2025/0042 |
| B | B-perm_address_line1 | Permanent Address Line 1 | PrmnntAdrLine1 | VARCHAR(100) UDiFF | on-modify | [direct] | ISO-tagged element in PrmnntPstlAdr block | NSDL/POLICY/2024/0041 |
| B | B-perm_city | Permanent City | PrmnntTwnNm | VARCHAR(50) UDiFF | on-modify | [direct] | Conditional element | NSDL/POLICY/2024/0041 |
| B | B-perm_country | Permanent Country | PrmnntCtry | CHAR(2) UDiFF | on-modify | lookup against R | ISO 3166-1 alpha-2 | NSDL/POLICY/2024/0041 |
| B | B-perm_pincode | Permanent Pincode | PrmnntPstCd | CHAR(6) UDiFF | on-modify | [direct] | Numeric pincode | NSDL/POLICY/2024/0041 |
| B | B-perm_same_as_corr | Permanent Same as Correspondence | PrmnntSameFlg | CHAR(1) UDiFF | one-time | [direct] | Y/N element; if Y, permanent address block omitted in XML | NSDL/POLICY/2025/0056 |
| B | B-perm_state | Permanent State | PrmnntCtrySubDvsn | CHAR(2) UDiFF | on-modify | lookup against R | ISO 3166-2 subdivision code | NSDL/POLICY/2025/0042 |
| B | B-poa_address_same_as_corr | POA Same as Correspondence | POASameFlg | CHAR(1) UDiFF | one-time | [direct] | Y/N element | NSDL/POLICY/2025/0056 |
| C | C-alternate_email | Alternate Email | AltEmailAdr | VARCHAR(100) UDiFF | on-modify | lowercase | Optional element | NSDL/POLICY/2025/0056 |
| C | C-alternate_mobile | Alternate Mobile | AltMblNb | VARCHAR(15) UDiFF | on-modify | [direct] | Optional ISO-tagged element | NSDL/POLICY/2025/0056 |
| C | C-email | Email | EmailAdr | VARCHAR(100) UDiFF | on-modify | lowercase | ISO-tagged element; mandatory; e-CAS by 12th of month sent here | NSDL/POLICY/2025/0022 |
| C | C-email_validated | Email Validated | EmailValdtdFlg | CHAR(1) UDiFF | one-time | [direct] | Email validation flag | NSDL/POLICY/2025/0056 |
| C | C-mobile_isd_code | Mobile ISD Code | MblISDCd | CHAR(5) UDiFF | on-modify | [direct] | ISD code element in MblPhneNb block | NSDL/POLICY/2025/0056 |
| C | C-mobile_number | Mobile Number | MblNb | VARCHAR(15) UDiFF | on-modify | [direct] | ISO 20022 PhneNb pattern; mandatory; <abbr title="One-Time Password">OTP</abbr>-validated via <abbr title="SEBI Complaints Redress System">SCORES</abbr> 2.0 alerts | NSDL/POLICY/2025/0056 |
| C | C-mobile_validated | Mobile Validated | MblValdtdFlg | CHAR(1) UDiFF | one-time | [direct] | OTP validation flag | NSDL/POLICY/2025/0056 |
| C | C-phone_number | Landline Number | PhneNb | VARCHAR(15) UDiFF | one-time | [direct] | Optional ISO-tagged | NSDL/POLICY/2024/0041 |
| C | C-phone_std_code | Landline STD Code | PhneSTDCd | CHAR(5) UDiFF | one-time | [direct] | Optional | NSDL/POLICY/2024/0041 |
| G | G-account_holder_name | Bank Account Holder Name | BkAcctHldrNm | VARCHAR(100) UDiFF | on-modify | uppercase | ISO-tagged element; penny-drop verified at broker; CAS uses this for fund settlement | NSDL/POLICY/2024/0041 |
| G | G-account_number | Bank Account Number | AcctNb | VARCHAR(18) UDiFF | on-modify | [direct] | ISO 20022 AcctNb element; mandatory; SPICE settlement linkage | NSDL/POLICY/2024/0131 |
| G | G-account_type | Bank Account Type | AcctTp | CHAR(2) UDiFF | on-modify | lookup against R | ISO 20022-style code element; <abbr title="Non-Resident External (Rupee) account">NRE</abbr>/<abbr title="Non-Resident Ordinary (Rupee) account">NRO</abbr> links to PIS account check | NSDL/POLICY/2025/0056 |
| G | G-bank_account_seq | Bank Account Sequence | BkAcctSeqNb | CHAR(1) UDiFF | on-modify | [direct] | Sequence element 1-5 | NSDL/POLICY/2025/0056 |
| G | G-bank_name | Bank Name (Payout) | BkNm | VARCHAR(100) UDiFF | on-modify | uppercase | ISO 20022 element; payout bank linked at BO level for corporate-action payouts | NSDL/POLICY/2024/0041 |
| G | G-bank_proof_type | Bank Proof Type | BkPrfTp | CHAR(2) UDiFF | one-time | lookup against R | Mandatory element in BO Upload | NSDL/POLICY/2025/0056 |
| G | G-branch_name | Bank Branch Name | BrnchNm | VARCHAR(100) UDiFF | on-modify | uppercase | ISO-tagged element | NSDL/POLICY/2024/0041 |
| G | G-ifsc_code | <abbr title="Indian Financial System Code.">IFSC</abbr> Code | IFSC | CHAR(11) UDiFF | on-modify | uppercase | ISO-tagged element; validated against <abbr title="Reserve Bank of India">RBI</abbr> IFSC master | NSDL/POLICY/2024/0041 |
| G | G-is_primary | Primary Bank Flag | PrmryBkFlg | CHAR(1) UDiFF | on-modify | [direct] | Exactly-one-Y constraint; SPICE settlement uses primary bank | NSDL/POLICY/2024/0131 |
| G | G-micr_code | MICR Code | MICR | CHAR(9) UDiFF | on-modify | [direct] | Optional 9-digit element | NSDL/POLICY/2024/0041 |
| H | H-account_status | BO Account Status | AcctSts | CHAR(2) UDiFF | on-event | lookup against R | Status code element; updated via Client Maintenance API | NSDL/POLICY/2024/0012 |
| H | H-account_type | BO Account Type | BOAcctTp | CHAR(2) UDiFF | one-time | lookup against R | ISO-tagged element; sub-type classifications added in 2022 (NSDL/POLICY/2022/126) | NSDL/POLICY/2025/0056 |
| H | H-bo_id | BO ID | BOID | CHAR(16) UDiFF | one-time | concat with X | Format IN + 14 alphanumeric (DP ID 8 chars + Client ID 8 chars including 'IN' prefix); primary key | NSDL/POLICY/2025/0056 |
| H | H-bo_status_code | BO Status Code | BOStsCd | CHAR(2) UDiFF | one-time | lookup against R | Primary BO status code element | NSDL/POLICY/2025/0056 |
| H | H-bsda_flag | BSDA Flag | BSDAFlg | CHAR(1) UDiFF | one-time | [direct] | Default Y; opt-out requires email-consent date capture per V2.0.0.0 | NSDL/POLICY/2024/0122 |
| H | H-bsda_optout_consent_date | BSDA Opt-Out Consent Date | BSDAOptOutCnsntDt | ISODate (YYYY-MM-DD) | one-time | formatted | Date of email consent for BSDA Opt-out; required per V2.0.0.0 (Apr 4, 2025) | NSDL/POLICY/2025/0042 |
| H | H-client_id | Client ID | ClntId | CHAR(8) UDiFF | one-time | [direct] | 8-digit alphanumeric within NSDL DP range | NSDL/POLICY/2025/0056 |
| H | H-cusps_account_flag | <abbr title="Client Unpaid Securities Pledgee Account.">CUSPA</abbr> Indicator | CUSPAFlg | CHAR(1) UDiFF | one-time | [direct] | CUSPA flag element | NSDL/POLICY/2023/0113 |
| H | H-depository | Depository | DpstryNm | CHAR(4) UDiFF | one-time | [direct] | Hardcoded 'NSDL' element; UDiFF V2.0.0.0 | NSDL/POLICY/2025/0042 |
| H | H-dp_id | DP ID | DPID | CHAR(8) UDiFF | one-time | formatted | NSDL format 'IN' + 6 digits (e.g. IN300123); ISO-tagged | NSDL/POLICY/2025/0056 |
| H | H-holding_type | Holding Pattern | HldgPttrn | CHAR(2) UDiFF | one-time | lookup against R | Holding pattern code; joint accounts use HldrInf repeating block | NSDL/POLICY/2025/0056 |
| H | H-ifsc_branch | First Holder IFSC | FrstHldrIFSC | CHAR(11) UDiFF | on-modify | uppercase | Linked IFSC element | NSDL/POLICY/2024/0041 |
| H | H-income_range | Income Range | GrssIncmRng | CHAR(2) UDiFF | one-time | lookup against R | Income range code element; mandatory | NSDL/POLICY/2025/0056 |
| H | H-lei_number | Legal Entity Identifier | LEI | CHAR(20) UDiFF | on-modify | uppercase | LEI element for non-individual entities; ISO 17442 format | NSDL/POLICY/2025/0056 |
| H | H-occupation | Occupation | OccptnCd | CHAR(2) UDiFF | one-time | lookup against R | Occupation code element | NSDL/POLICY/2025/0056 |
| H | H-opening_date | BO Account Opening Date | OpngDt | ISODate (YYYY-MM-DD) | one-time | formatted | ISO 8601 date element | NSDL/POLICY/2024/0041 |
| H | H-operation_mode | Operation Mode | OprtnMd | CHAR(2) UDiFF | one-time | lookup against R | Operation mode element | NSDL/POLICY/2025/0056 |
| H | H-pms_manager_flag | <abbr title="Portfolio Management Services">PMS</abbr> Manager Indicator | PMSMgrFlg | CHAR(1) UDiFF | one-time | [direct] | PMS manager element in sub-type block | NSDL/POLICY/2025/0056 |
| H | H-purpose_code | BO Purpose Code | BOPrpCd | CHAR(2) UDiFF | one-time | lookup against R | Purpose code element | NSDL/POLICY/2025/0056 |
| H | H-ucc_code | <abbr title="Unique Client Code">UCC</abbr> Mapping | UCCMpng | VARCHAR(10) UDiFF | on-modify | [direct] | Exchange-provided UCC mapped via Client Maintenance API | NSDL/POLICY/2024/0012 |
| I | I-guardian_address | Guardian Address | GdnAdr | VARCHAR(255) UDiFF | on-modify | truncate to N | ISO 20022 address structure | NSDL/POLICY/2025/0030 |
| I | I-guardian_name | Guardian Name (Minor Nominee) | GdnNm | VARCHAR(100) UDiFF | on-modify | uppercase | Conditional ISO-tagged element | NSDL/POLICY/2025/0030 |
| I | I-guardian_pan | Guardian PAN | GdnPANNb | CHAR(10) UDiFF | on-modify | uppercase | Conditional element | NSDL/POLICY/2025/0030 |
| I | I-guardian_relationship | Guardian Relationship | GdnRltnshp | CHAR(2) UDiFF | on-modify | lookup against R | Conditional element | NSDL/POLICY/2025/0030 |
| I | I-nomination_opted | Nomination Opted | NomFlg | CHAR(1) UDiFF | one-time | [direct] | Y/N element; ISO-tagged; can be changed any number of times per SEBI Jan 10, 2025 | NSDL/POLICY/2025/0006 |
| I | I-nominee_aadhaar | Nominee Aadhaar (Last 4) | NomAdhaarL4 | CHAR(4) UDiFF | on-modify | formatted | Last 4 digits only; masked per DPDP | NSDL/POLICY/2025/0030 |
| I | I-nominee_address | Nominee Address | NomAdr | VARCHAR(255) UDiFF | on-modify | truncate to N | ISO 20022 address structure; address/state made optional from V2.0.0.0 (Apr 4, 2025) | NSDL/POLICY/2025/0042 |
| I | I-nominee_city | Nominee City | NomTwnNm | VARCHAR(50) UDiFF | on-modify | truncate to N | Conditional after V2.0.0.0 | NSDL/POLICY/2025/0042 |
| I | I-nominee_dob | Nominee Date of Birth | NomBirthDt | ISODate (YYYY-MM-DD) | on-modify | formatted | ISO 8601 date; mandatory per Oct 21, 2024 nominee mandatory fields | NSDL/POLICY/2025/0030 |
| I | I-nominee_email | Nominee Email | NomEmailAdr | VARCHAR(100) UDiFF | on-modify | lowercase | Email element | NSDL/POLICY/2025/0030 |
| I | I-nominee_is_minor | Nominee is Minor | NomMnrFlg | CHAR(1) UDiFF | on-modify | derived from Y | Derived element; triggers Gdn block in XML | NSDL/POLICY/2025/0030 |
| I | I-nominee_mobile | Nominee Mobile | NomMblNb | VARCHAR(15) UDiFF | on-modify | [direct] | ISO 20022 PhneNb pattern | NSDL/POLICY/2025/0030 |
| I | I-nominee_name | Nominee Name | NomNm | VARCHAR(100) UDiFF | on-modify | uppercase | ISO-tagged repeating element; mandatory | NSDL/POLICY/2025/0030 |
| I | I-nominee_pan | Nominee PAN | NomPANNb | CHAR(10) UDiFF | on-modify | uppercase | At least one identifier (PAN/Aadhaar-last4/DL/Passport) mandatory | NSDL/POLICY/2025/0030 |
| I | I-nominee_passport | Nominee Passport | NomPsprtNb | CHAR(8) UDiFF | on-modify | uppercase | Passport identifier element | NSDL/POLICY/2025/0030 |
| I | I-nominee_percentage | Nominee Percentage | NomShrPctg | Decimal(5,2) UDiFF | on-modify | formatted | Percentage element; sum=100 validated; if not specified, distributed equally per SEBI Jan 2025 | NSDL/POLICY/2025/0006 |
| I | I-nominee_pincode | Nominee Pincode | NomPstCd | CHAR(6) UDiFF | on-modify | [direct] | 6-digit numeric element | NSDL/POLICY/2024/0041 |
| I | I-nominee_relationship | Nominee Relationship | NomRltnshp | CHAR(2) UDiFF | on-modify | lookup against R | Relationship code element; mandatory | NSDL/POLICY/2025/0006 |
| I | I-nominee_seq | Nominee Sequence Number | NomSeqNb | VARCHAR(2) UDiFF | on-modify | [direct] | Sequence element 01-10; ordering element in XML | NSDL/POLICY/2025/0006 |
| I | I-number_of_nominees | Number of Nominees | NbOfNomins | VARCHAR(2) UDiFF | on-modify | [direct] | Up to 10 nominees per BO; per SEBI Jan 10, 2025 revamp | NSDL/POLICY/2025/0006 |
| I | I-opt_out_declaration | Opt-Out Declaration | OptOutDcln | CHAR(1) UDiFF | one-time | [direct] | Opt-out flag; recorded via separate declaration block | NSDL/POLICY/2025/0030 |
| O | O-ddpi_authorization_date | <abbr title="Demat Debit and Pledge Instruction">DDPI</abbr> Authorization Date | DDPIRegnDt | ISODate (YYYY-MM-DD) | on-event | formatted | ISO 8601; NSDL capture in UDiFF format only since Sep 27, 2024 deadline | NSDL/POLICY/2024/0086 |
| O | O-ddpi_bo_id | DDPI BO ID | DDPIBOID | CHAR(16) UDiFF | on-event | [direct] | Same as H-bo_id (IN+14 alphanumeric); SPEED-e linkage | NSDL/POLICY/2024/0086 |
| O | O-ddpi_deregistration_date | DDPI Deregistration Date | DDPIDeRegnDt | ISODate (YYYY-MM-DD) | on-event | formatted | ISO 8601; UDiFF only since Sep 27, 2024 | NSDL/POLICY/2024/0086 |
| O | O-ddpi_dp_id | DDPI DP ID | DDPIDPID | CHAR(8) UDiFF | on-event | [direct] | IN+6 digits | NSDL/POLICY/2024/0086 |
| O | O-ddpi_for_mutual_fund | DDPI for Mutual Fund | DDPIMFFlg | CHAR(1) UDiFF | on-event | [direct] | Y/N flag | NSDL/POLICY/2022/0052 |
| O | O-ddpi_for_pledge | DDPI for Pledge | DDPIPldgFlg | CHAR(1) UDiFF | on-event | [direct] | Y/N; pledge/re-pledge flag | NSDL/POLICY/2022/0052 |
| O | O-ddpi_for_settlement | DDPI for Settlement | DDPISettleFlg | CHAR(1) UDiFF | on-event | [direct] | Y/N; transfer for stock-exchange deliveries/settlement | NSDL/POLICY/2022/0052 |
| O | O-ddpi_for_tendering | DDPI for Tendering | DDPITndrFlg | CHAR(1) UDiFF | on-event | [direct] | Y/N flag | NSDL/POLICY/2022/0052 |
| O | O-ddpi_opted | DDPI Opted | DDPIFlg | CHAR(1) UDiFF | on-event | [direct] | Y/N flag; NSDL DDPI registration offline-paper-based with 2-3 day activation; UDiFF format only since Sep 27, 2024 | NSDL/POLICY/2024/0086 |
| O | O-ddpi_scope | DDPI Scope | DDPIScp | CHAR(2) UDiFF | on-event | [direct] | Scope code element | NSDL/POLICY/2024/0086 |

## Verified through

2026-05-14

---

*AI-generated and not legal advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*

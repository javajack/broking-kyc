---
title: "Section B: Address Details — Data Flow"
description: "Where each field in Section B: Address Details flows downstream — destinations, formats, frequencies, transformations, quirks."
---

> **Why this page is structured this way:** This is the field-first view for Section B: Address Details. Each row is one field-destination relationship. To see the same data from the destination's perspective, jump from the [atlas overview](/broking-kyc/reference/field-atlas/).

## TL;DR

- **20 unique fields** in this section.
- **138 field-destination relationships** total.
- Source-of-truth field definitions: [Master Dataset](/broking-kyc/reference/master-dataset/).

## Data flow table

Sorted by `field_id`, then `destination`.

| field_id | field_name | destination | destination_field_name | destination_format | frequency | transformation | quirks_notes | spec_source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| B-corr_address_line1 | Correspondence Address Line1 | aml-fiu | ADDRESS_L1 | VARCHAR(100) | on-event | [direct] | FINnet AddressLine1 element; required customer attribute | <abbr title="Financial Intelligence Unit — India">FIU-IND</abbr>-REPORTING-FORMAT-V114 |
| B-corr_address_line1 | Correspondence Address Line 1 | back-office | corr_addr1 | VARCHAR(100) | on-modify | [direct] | appears on physical contract-note dispatch envelope; statement-of-account header | [industry typical] |
| B-corr_address_line1 | Correspondence Address Line 1 | bse-ucc | CORR_ADDR1 | VARCHAR(100) | on-modify | [direct] | Mandatory in revised BEFS <abbr title="Unique Client Code">UCC</abbr> submission | <abbr title="BSE Limited (formerly Bombay Stock Exchange)">BSE</abbr>/20240223-42 |
| B-corr_address_line1 | Correspondence Address Line 1 | cdsl-bo | CORR_ADDR_LINE_1 | CHAR(40) | on-modify | truncate to N | Line 02 of fixed-length file; truncate to 40 chars; right-pad with spaces; rejection if Line1 blank | <abbr title="Central Depository Services (India) Limited">CDSL</abbr>/OPS/<abbr title="Depository Participant">DP</abbr>/SYSTM/2023/119 |
| B-corr_address_line1 | Correspondence Address Line 1 | ckyc | LOCAL_ADDRESS_LINE1 | VARCHAR(55) | one-time | truncate to N | <abbr title="Central KYC (records registry)">CKYC</abbr> line length is 55; longer <abbr title="KYC Registration Agency">KRA</abbr> values must be split or truncated | CKYC/2025/16 |
| B-corr_address_line1 | Correspondence Address Line 1 | contract-notes | ClientAddress | VARCHAR(100) | on-trade | concat with X | concatenated with line2 + line3 + city + state + pincode for <abbr title="Electronic Contract Note.">ECN</abbr> client-address block | <abbr title="National Stock Exchange of India">NSE</abbr>/INSP/61999 |
| B-corr_address_line1 | Correspondence Address Line1 | fatca-crs | RES_ADDR_L1 | VARCHAR(100) | on-event | [direct] | captured in <abbr title="Common Reporting Standard">CRS</abbr> XML AddressFix.Street; required for ReportableAccount block | <abbr title="Securities and Exchange Board of India">SEBI</abbr>/<abbr title="Head Office (SEBI circular ID prefix)">HO</abbr>/<abbr title="Markets Intermediaries Regulation and Supervision Department (SEBI)">MIRSD</abbr>/SECFATF/P/CIR/2024/12 |
| B-corr_address_line1 | Correspondence Address Line 1 | kra | CORR_ADDR_L1 | VARCHAR(100) | on-modify | [direct] | Mandatory; KRA validates against <abbr title="Power of Attorney">POA</abbr> document | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/41 |
| B-corr_address_line1 | Correspondence Address Line 1 | mcx-ucc | CORR_ADDR1 | VARCHAR(100) | on-modify | [direct] | Mandatory in UCC pipe-delimited record; state/city looked up against State-City Master | <abbr title="Multi Commodity Exchange of India">MCX</abbr>/S&I/507/2024 |
| B-corr_address_line1 | Correspondence Address Line 1 | nsdl-bo | AdrLine1 | VARCHAR(100) UDiFF | on-modify | [direct] | ISO 20022-style address element; UDiFF AdrLine1 within PstlAdr block | <abbr title="National Securities Depository Limited">NSDL</abbr>/POLICY/2025/0042 |
| B-corr_address_line1 | Correspondence Address Line 1 | nse-ucc | CORR_ADDR1 | VARCHAR(100) | on-modify | [direct] | Part of 'Complete Address' mandatory bundle per NSE/<abbr title="Investor Service Centre.">ISC</abbr>/47869 | NSE/ISC/47869 |
| B-corr_address_line2 | Correspondence Address Line 2 | back-office | corr_addr2 | VARCHAR(100) | on-modify | [direct] | null-if-Z when not provided; rendered on AOF retention copy | [industry typical] |
| B-corr_address_line2 | Correspondence Address Line 2 | bse-ucc | CORR_ADDR2 | VARCHAR(100) | on-modify | [direct] | Optional | BSE/20240223-42 |
| B-corr_address_line2 | Correspondence Address Line 2 | cdsl-bo | CORR_ADDR_LINE_2 | CHAR(40) | on-modify | truncate to N | Line 02 positional; optional; right-pad with spaces if absent | CDSL/OPS/DP/SYSTM/2023/119 |
| B-corr_address_line2 | Correspondence Address Line 2 | ckyc | LOCAL_ADDRESS_LINE2 | VARCHAR(55) | one-time | truncate to N | CKYC restricts to 55 chars per line | CKYC/2025/16 |
| B-corr_address_line2 | Correspondence Address Line 2 | kra | CORR_ADDR_L2 | VARCHAR(100) | on-modify | [direct] | Optional | [industry typical] |
| B-corr_address_line2 | Correspondence Address Line 2 | mcx-ucc | CORR_ADDR2 | VARCHAR(100) | on-modify | [direct] | Optional in UCC record | MCX/TECH/394/2023 |
| B-corr_address_line2 | Correspondence Address Line 2 | nsdl-bo | AdrLine2 | VARCHAR(100) UDiFF | on-modify | [direct] | Optional ISO-tagged element | NSDL/POLICY/2024/0041 |
| B-corr_address_line2 | Correspondence Address Line 2 | nse-ucc | CORR_ADDR2 | VARCHAR(100) | on-modify | [direct] | Optional continuation | NSE/ISC/61817 |
| B-corr_address_line3 | Correspondence Address Line 3 | back-office | corr_addr3 | VARCHAR(100) | on-modify | [direct] | optional landmark; appears on ITR Form 16A | [industry typical] |
| B-corr_address_line3 | Correspondence Address Line 3 | bse-ucc | CORR_ADDR3 | VARCHAR(100) | on-modify | [direct] | Optional | BSE/20240223-42 |
| B-corr_address_line3 | Correspondence Address Line 3 | cdsl-bo | CORR_ADDR_LINE_3 | CHAR(40) | on-modify | truncate to N | Line 02 positional; optional | CDSL/OPS/DP/SYSTM/2023/119 |
| B-corr_address_line3 | Correspondence Address Line 3 | ckyc | LOCAL_ADDRESS_LINE3 | VARCHAR(55) | one-time | truncate to N | CKYC has three line fields plus city/district/state/pin | CKYC/2025/16 |
| B-corr_address_line3 | Correspondence Address Line 3 | kra | CORR_ADDR_L3 | VARCHAR(100) | on-modify | [direct] | Optional | [industry typical] |
| B-corr_address_line3 | Correspondence Address Line 3 | mcx-ucc | CORR_ADDR3 | VARCHAR(100) | on-modify | [direct] | Optional | MCX/TECH/394/2023 |
| B-corr_address_line3 | Correspondence Address Line 3 | nsdl-bo | AdrLine3 | VARCHAR(100) UDiFF | on-modify | [direct] | Optional | NSDL/POLICY/2024/0041 |
| B-corr_address_line3 | Correspondence Address Line 3 | nse-ucc | CORR_ADDR3 | VARCHAR(100) | on-modify | [direct] | Optional | NSE/ISC/61817 |
| B-corr_address_proof_type | Correspondence Address Proof Type | back-office | corr_addr_pf_type | VARCHAR(2) | one-time | [direct] | POA code table; needed for retention audit | [industry typical] |
| B-corr_address_proof_type | Correspondence Address Proof Type | bse-ucc | ADDR_PROOF_TYPE | CHAR(2) | one-time | [direct] | POA code (Aadhaar/Passport/Utility/etc.) | BSE/20240223-42 |
| B-corr_address_proof_type | Correspondence Address Proof Type | cdsl-bo | ADDR_PROOF_TYPE | CHAR(2) | one-time | lookup against R | POA code table (A=Passport, B=Voter, etc.); mandatory in line 02 | CDSL/OPS/DP/SYSTM/2023/119 |
| B-corr_address_proof_type | Correspondence Address Proof Type | ckyc | LOCAL_ADDRESS_PROOF | CHAR(2) | one-time | lookup against R | <abbr title="Central Registry of Securitisation Asset Reconstruction and Security Interest of India">CERSAI</abbr> POA code list; revised for Foreign Nationals per CKYC/2025/03 | CKYC/2025/03_Revised |
| B-corr_address_proof_type | Correspondence Address Proof Type | kra | CORR_POA_TYPE | CHAR(2) | on-modify | lookup against R | POA code table A-Z; KRA validates document validity | SEBI/HO/MIRSD/SECFATF/P/CIR/2023/169 |
| B-corr_address_proof_type | Correspondence Address Proof Type | mcx-ucc | ADDR_PROOF_TYPE | CHAR(2) | one-time | [direct] | POA code; mandatory in onboarding upload | MCX/TECH/394/2023 |
| B-corr_address_proof_type | Correspondence Address Proof Type | nsdl-bo | AdrPrfTp | CHAR(2) UDiFF | one-time | lookup against R | POA type code element; mandatory | NSDL/POLICY/2025/0056 |
| B-corr_address_proof_type | Correspondence Address Proof Type | nse-ucc | ADDR_PROOF_TYPE | CHAR(2) | one-time | [direct] | POA code table; submitted with <abbr title="Know Your Customer (process).">KYC</abbr> bundle | NSE/ISC/61817 |
| B-corr_city | Correspondence City | aml-fiu | CITY | VARCHAR(50) | on-event | [direct] | <abbr title="Suspicious Transaction Report">STR</abbr>/<abbr title="Cash Transaction Report">CTR</abbr> geography; <abbr title="Financial Intelligence Unit">FIU</abbr> uses city-level analysis for typology detection | FIU-IND-REPORTING-FORMAT-V114 |
| B-corr_city | Correspondence City | back-office | corr_city | VARCHAR(50) | on-modify | [direct] | feeds stamp-duty state lookup if state derived from city | [industry typical] |
| B-corr_city | Correspondence City | bse-ucc | CORR_CITY | VARCHAR(50) | on-modify | lookup against R | Mandatory; validated against BSE city master | BSE/20240223-42 |
| B-corr_city | Correspondence City | cdsl-bo | CORR_CITY | CHAR(35) | on-modify | truncate to N | Right-pad with spaces; mandatory in line 02 | CDSL/OPS/DP/SYSTM/2023/119 |
| B-corr_city | Correspondence City | ckyc | LOCAL_CITY | VARCHAR(50) | one-time | lookup against R | CKYC validates against master Pin Code-District-City list | CKYC/2025/16 |
| B-corr_city | Correspondence City | fatca-crs | RES_CITY | VARCHAR(50) | on-event | [direct] | CRS City field | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| B-corr_city | Correspondence City | kra | CORR_CITY | VARCHAR(50) | on-modify | formatted | Mandatory | [industry typical] |
| B-corr_city | Correspondence City | mcx-ucc | CORR_CITY | VARCHAR(50) | on-modify | lookup against R | Validated against State-City Code Master (additions per MCX/S&I/507/2024) | MCX/S&I/507/2024 |
| B-corr_city | Correspondence City | nsdl-bo | TwnNm | VARCHAR(50) UDiFF | on-modify | [direct] | ISO 20022 TwnNm element; mandatory | NSDL/POLICY/2024/0041 |
| B-corr_city | Correspondence City | nse-ucc | CORR_CITY | VARCHAR(50) | on-modify | lookup against R | Validated against city code master | NSE/ISC/61817 |
| B-corr_country | Correspondence Country | aml-fiu | COUNTRY | CHAR(2) | on-event | lookup against R | non-IN country in CBWTR triggers enhanced reporting; <abbr title="Financial Action Task Force">FATF</abbr>-grey-list countries flagged for STR | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/78 |
| B-corr_country | Correspondence Country | back-office | corr_country | VARCHAR(30) | on-modify | [direct] | default India; non-IN triggers <abbr title="Foreign Account Tax Compliance Act (US)">FATCA</abbr>/CRS workflow | [industry typical] |
| B-corr_country | Correspondence Country | bse-ucc | CORR_COUNTRY | VARCHAR(30) | on-modify | [direct] | Default India | BSE/20240223-42 |
| B-corr_country | Correspondence Country | cdsl-bo | CORR_COUNTRY | CHAR(2) | on-modify | lookup against R | ISO 3166-1 alpha-2; default IN; line 02 | CDSL/OPS/DP/SYSTM/2023/119 |
| B-corr_country | Correspondence Country | ckyc | LOCAL_COUNTRY | CHAR(3) | one-time | lookup against R | CKYC uses ISO 3166 alpha-3 | CKYC/2025/16 |
| B-corr_country | Correspondence Country | fatca-crs | RES_ADDRESS_COUNTRY | CHAR(2) | on-event | lookup against R | address country used as indicia under CRS; non-IN addr triggers self-cert review even if J01=Y | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| B-corr_country | Correspondence Country | kra | CORR_COUNTRY | CHAR(2) | on-modify | lookup against R | ISO alpha-2; default IN | [industry typical] |
| B-corr_country | Correspondence Country | mcx-ucc | CORR_COUNTRY | VARCHAR(30) | on-modify | [direct] | Default IN; Foreign category triggers separate handling | MCX/TECH/394/2023 |
| B-corr_country | Correspondence Country | nsdl-bo | Ctry | CHAR(2) UDiFF | on-modify | lookup against R | ISO 3166-1 alpha-2 country code in PstlAdr block | NSDL/POLICY/2024/0041 |
| B-corr_country | Correspondence Country | nse-ucc | CORR_COUNTRY | VARCHAR(30) | on-modify | [direct] | Default India; ISO code for Foreign clients | NSE/ISC/61817 |
| B-corr_district | Correspondence District | ckyc | LOCAL_DISTRICT | VARCHAR(50) | one-time | lookup against R | CKYC master district list; required for India addresses | CKYC/2025/16 |
| B-corr_district | Correspondence District | kra | CORR_DISTRICT | VARCHAR(50) | on-modify | formatted | Optional in KRA | [industry typical] |
| B-corr_pincode | Correspondence Pincode | aml-fiu | PINCODE | VARCHAR(6) | on-event | [direct] | 6-digit IN pin; foreign address blocked at this field; use V-block for overseas | FIU-IND-REPORTING-FORMAT-V114 |
| B-corr_pincode | Correspondence PIN Code | back-office | corr_pin | CHAR(6) | on-modify | [direct] | physical dispatch routing | [industry typical] |
| B-corr_pincode | Correspondence PIN Code | bse-ucc | CORR_PIN | CHAR(6) | on-modify | [direct] | Mandatory; 6 digits | BSE/20240223-42 |
| B-corr_pincode | Correspondence Pincode | cdsl-bo | CORR_PINCODE | CHAR(6) | on-modify | [direct] | 6-digit numeric; mandatory; right-padded with leading zeros if needed | CDSL/OPS/DP/SYSTM/2023/119 |
| B-corr_pincode | Correspondence Pincode | ckyc | LOCAL_PIN_CODE | VARCHAR(10) | one-time | [direct] | CKYC supports international postcode for foreign addresses | CKYC/2025/03_Revised |
| B-corr_pincode | Correspondence Pincode | contract-notes | ClientPincode | CHAR(6) | on-trade | [direct] | six-digit numeric; used with state for GST place-of-supply determination | [industry typical] |
| B-corr_pincode | Correspondence Pincode | fatca-crs | RES_POSTCODE | VARCHAR(10) | on-event | [direct] | CRS PostCode field; 6 digits for IN; varies for foreign addresses | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| B-corr_pincode | Correspondence Pincode | kra | CORR_PINCODE | CHAR(6) | on-modify | [direct] | 6 digits for India | [industry typical] |
| B-corr_pincode | Correspondence PIN Code | mcx-ucc | CORR_PIN | CHAR(6) | on-modify | [direct] | 6 digits mandatory in pipe-delimited record | MCX/TECH/394/2023 |
| B-corr_pincode | Correspondence Pincode | nsdl-bo | PstCd | CHAR(6) UDiFF | on-modify | [direct] | ISO 20022 PstCd element; numeric validation | NSDL/POLICY/2024/0041 |
| B-corr_pincode | Correspondence PIN Code | nse-ucc | CORR_PIN | CHAR(6) | on-modify | [direct] | 6 digits; mandatory bundled with address per NSE/ISC/47869 | NSE/ISC/47869 |
| B-corr_state | Correspondence State | aml-fiu | STATE | VARCHAR(30) | on-event | lookup against R | state-code lookup; FINnet uses standard state list | FIU-IND-REPORTING-FORMAT-V114 |
| B-corr_state | Correspondence State Code | back-office | corr_state_code | VARCHAR(2) | on-modify | lookup against R | drives stamp-duty rate per state for contract-note charges | [industry typical] |
| B-corr_state | Correspondence State Code | back-office | stamp_duty_rate_pct | NUMBER(5,4) | on-trade | lookup against R | state code drives stamp-duty rate lookup; computed per trade; Maharashtra 0.005%, Delhi 0.005%, etc | Indian Stamp Act + Maharashtra Stamp Act |
| B-corr_state | Correspondence State | bse-ucc | CORR_STATE | VARCHAR(30) | on-modify | lookup against R | State code; mandatory | BSE/20240223-42 |
| B-corr_state | Correspondence State | cdsl-bo | CORR_STATE | CHAR(2) | on-modify | lookup against R | CDSL state code table (2 chars); mandatory; rejection if invalid code | CDSL/OPS/DP/SYSTM/2023/119 |
| B-corr_state | Correspondence State | ckyc | LOCAL_STATE | CHAR(2) | one-time | lookup against R | CKYC master state list; INTL for non-Indian | CKYC/2025/16 |
| B-corr_state | Correspondence State | contract-notes | StateForStampDuty | CHAR(2) | on-trade | lookup against R | drives state-code for stamp-duty levy on the contract; <abbr title="Clearing Corporation (NCL, ICCL, MCXCCL — context-dependent).">CC</abbr> withholds settlement on mismatch | NSE/INSP/61999 |
| B-corr_state | Correspondence State | kra | CORR_STATE | CHAR(2) | on-modify | lookup against R | 2-letter state code per Appendix A | [industry typical] |
| B-corr_state | Correspondence State | mcx-ucc | CORR_STATE | VARCHAR(30) | on-modify | lookup against R | State-City master code; mandatory | MCX/S&I/507/2024 |
| B-corr_state | Correspondence State | nsdl-bo | CtrySubDvsn | CHAR(2) UDiFF | on-modify | lookup against R | ISO 3166-2 subdivision (e.g. IN-MH); mandatory; per V2.0.0.0 catalogue | NSDL/POLICY/2025/0042 |
| B-corr_state | Correspondence State | nse-ucc | CORR_STATE | VARCHAR(30) | on-modify | lookup against R | State code lookup; required field | NSE/ISC/61817 |
| B-corr_state | Correspondence State | regulatory-reports | StampDutyState | CHAR(2) | daily | lookup against R | state-wise stamp-duty reconciliation file from CC; Indian Stamp Act 1899 (Jul-2020 amendment) | NSE/INSP/61999 |
| B-perm_address_line1 | Permanent Address Line 1 | back-office | perm_addr1 | VARCHAR(100) | on-modify | [direct] | ITR Form 16A printout uses perm address | [industry typical] |
| B-perm_address_line1 | Permanent Address Line 1 | bse-ucc | PERM_ADDR1 | VARCHAR(100) | on-modify | null-if-Z | Null if perm_same_as_corr=Y | BSE/20240223-42 |
| B-perm_address_line1 | Permanent Address Line 1 | cdsl-bo | PERM_ADDR_LINE_1 | CHAR(40) | on-modify | truncate to N | Line 03 of fixed-length; truncate to 40; right-pad with spaces; mandatory if perm_same_as_corr=N | CDSL/OPS/DP/SYSTM/2023/119 |
| B-perm_address_line1 | Permanent Address Line 1 | ckyc | PERM_ADDRESS_LINE1 | VARCHAR(55) | one-time | truncate to N | CKYC permanent block; truncate to 55 chars | CKYC/2025/16 |
| B-perm_address_line1 | Permanent Address Line 1 | kra | PERM_ADDR_L1 | VARCHAR(100) | on-modify | [direct] | Conditional; required if perm_same_as_corr=N | [industry typical] |
| B-perm_address_line1 | Permanent Address Line 1 | mcx-ucc | PERM_ADDR1 | VARCHAR(100) | on-modify | null-if-Z | Null if perm_same_as_corr=Y | MCX/TECH/394/2023 |
| B-perm_address_line1 | Permanent Address Line 1 | nsdl-bo | PrmnntAdrLine1 | VARCHAR(100) UDiFF | on-modify | [direct] | ISO-tagged element in PrmnntPstlAdr block | NSDL/POLICY/2024/0041 |
| B-perm_address_line1 | Permanent Address Line 1 | nse-ucc | PERM_ADDR1 | VARCHAR(100) | on-modify | null-if-Z | Required if perm_same_as_corr=N | NSE/ISC/61817 |
| B-perm_address_line2 | Permanent Address Line 2 | ckyc | PERM_ADDRESS_LINE2 | VARCHAR(55) | one-time | truncate to N | CKYC permanent block | CKYC/2025/16 |
| B-perm_address_line2 | Permanent Address Line 2 | kra | PERM_ADDR_L2 | VARCHAR(100) | on-modify | [direct] | Conditional | [industry typical] |
| B-perm_address_line3 | Permanent Address Line 3 | ckyc | PERM_ADDRESS_LINE3 | VARCHAR(55) | one-time | truncate to N | CKYC permanent block | CKYC/2025/16 |
| B-perm_address_line3 | Permanent Address Line 3 | kra | PERM_ADDR_L3 | VARCHAR(100) | on-modify | [direct] | Conditional | [industry typical] |
| B-perm_address_proof_type | Permanent Address Proof Type | ckyc | PERM_ADDRESS_PROOF | CHAR(2) | one-time | lookup against R | CERSAI POA code; same as local POA code list | CKYC/2025/03_Revised |
| B-perm_address_proof_type | Permanent Address Proof Type | kra | PERM_POA_TYPE | CHAR(2) | on-modify | lookup against R | Conditional; POA code | [industry typical] |
| B-perm_city | Permanent City | back-office | perm_city | VARCHAR(50) | on-modify | [direct] | used in CKYC submission record retained in <abbr title="Beneficial Owner">BO</abbr> | [industry typical] |
| B-perm_city | Permanent City | bse-ucc | PERM_CITY | VARCHAR(50) | on-modify | lookup against R | Conditional | BSE/20240223-42 |
| B-perm_city | Permanent City | cdsl-bo | PERM_CITY | CHAR(35) | on-modify | truncate to N | Line 03 positional; conditional on perm_same_as_corr=N | CDSL/OPS/DP/SYSTM/2023/119 |
| B-perm_city | Permanent City | ckyc | PERM_CITY | VARCHAR(50) | one-time | lookup against R | CKYC master city list | CKYC/2025/16 |
| B-perm_city | Permanent City | kra | PERM_CITY | VARCHAR(50) | on-modify | formatted | Conditional | [industry typical] |
| B-perm_city | Permanent City | mcx-ucc | PERM_CITY | VARCHAR(50) | on-modify | lookup against R | City master lookup | MCX/S&I/507/2024 |
| B-perm_city | Permanent City | nsdl-bo | PrmnntTwnNm | VARCHAR(50) UDiFF | on-modify | [direct] | Conditional element | NSDL/POLICY/2024/0041 |
| B-perm_city | Permanent City | nse-ucc | PERM_CITY | VARCHAR(50) | on-modify | lookup against R | Required when permanent address differs | NSE/ISC/61817 |
| B-perm_country | Permanent Country | back-office | perm_country | VARCHAR(30) | on-modify | [direct] | default India | [industry typical] |
| B-perm_country | Permanent Country | bse-ucc | PERM_COUNTRY | VARCHAR(30) | on-modify | null-if-Z | Default India | BSE/20240223-42 |
| B-perm_country | Permanent Country | cdsl-bo | PERM_COUNTRY | CHAR(2) | on-modify | lookup against R | ISO 3166-1 alpha-2 | CDSL/OPS/DP/SYSTM/2023/119 |
| B-perm_country | Permanent Country | ckyc | PERM_COUNTRY | CHAR(3) | one-time | lookup against R | CKYC ISO alpha-3 | CKYC/2025/16 |
| B-perm_country | Permanent Country | kra | PERM_COUNTRY | CHAR(2) | on-modify | lookup against R | Conditional; ISO alpha-2 | [industry typical] |
| B-perm_country | Permanent Country | mcx-ucc | PERM_COUNTRY | VARCHAR(30) | on-modify | null-if-Z | Default India | MCX/TECH/394/2023 |
| B-perm_country | Permanent Country | nsdl-bo | PrmnntCtry | CHAR(2) UDiFF | on-modify | lookup against R | ISO 3166-1 alpha-2 | NSDL/POLICY/2024/0041 |
| B-perm_country | Permanent Country | nse-ucc | PERM_COUNTRY | VARCHAR(30) | on-modify | null-if-Z | Default India if domestic | NSE/ISC/61817 |
| B-perm_district | Permanent District | ckyc | PERM_DISTRICT | VARCHAR(50) | one-time | lookup against R | CKYC master district list | CKYC/2025/16 |
| B-perm_district | Permanent District | kra | PERM_DISTRICT | VARCHAR(50) | on-modify | formatted | Optional | [industry typical] |
| B-perm_pincode | Permanent PIN Code | back-office | perm_pin | CHAR(6) | on-modify | [direct] | needed for transmission documents | [industry typical] |
| B-perm_pincode | Permanent PIN Code | bse-ucc | PERM_PIN | CHAR(6) | on-modify | null-if-Z | Conditional | BSE/20240223-42 |
| B-perm_pincode | Permanent Pincode | cdsl-bo | PERM_PINCODE | CHAR(6) | on-modify | [direct] | 6-digit numeric | CDSL/OPS/DP/SYSTM/2023/119 |
| B-perm_pincode | Permanent Pincode | ckyc | PERM_PIN_CODE | VARCHAR(10) | one-time | [direct] | CKYC supports intl postcode | CKYC/2025/03_Revised |
| B-perm_pincode | Permanent Pincode | kra | PERM_PINCODE | CHAR(6) | on-modify | [direct] | Conditional | [industry typical] |
| B-perm_pincode | Permanent PIN Code | mcx-ucc | PERM_PIN | CHAR(6) | on-modify | null-if-Z | Conditional 6-digit | MCX/TECH/394/2023 |
| B-perm_pincode | Permanent Pincode | nsdl-bo | PrmnntPstCd | CHAR(6) UDiFF | on-modify | [direct] | Numeric pincode | NSDL/POLICY/2024/0041 |
| B-perm_pincode | Permanent PIN Code | nse-ucc | PERM_PIN | CHAR(6) | on-modify | null-if-Z | 6 digits if perm differs | NSE/ISC/61817 |
| B-perm_same_as_corr | Permanent Same as Correspondence | back-office | perm_same_flag | CHAR(1) | on-modify | [direct] | if Y, perm_* fields copy-on-modify of corr_* | [industry typical] |
| B-perm_same_as_corr | Permanent Same As Correspondence | bse-ucc | PERM_SAME_FLAG | CHAR(1) | one-time | [direct] | Y/N flag | BSE/20240223-42 |
| B-perm_same_as_corr | Permanent Same as Correspondence | cdsl-bo | PERM_SAME_FLAG | CHAR(1) | one-time | [direct] | Y/N; if Y then permanent address fields blank-padded; line 03 position | CDSL/OPS/DP/SYSTM/2023/119 |
| B-perm_same_as_corr | Permanent Same as Correspondence | ckyc | PERMANENT_SAME_FLAG | CHAR(1) | one-time | [direct] | CKYC omits permanent block if Y | CKYC/2020/04 |
| B-perm_same_as_corr | Permanent Same as Correspondence | kra | PERM_SAME_FLAG | CHAR(1) | on-modify | [direct] | If Y, KRA omits permanent section | [industry typical] |
| B-perm_same_as_corr | Permanent Same As Correspondence | mcx-ucc | PERM_SAME_FLAG | CHAR(1) | one-time | [direct] | Y/N flag | MCX/TECH/394/2023 |
| B-perm_same_as_corr | Permanent Same as Correspondence | nsdl-bo | PrmnntSameFlg | CHAR(1) UDiFF | one-time | [direct] | Y/N element; if Y, permanent address block omitted in XML | NSDL/POLICY/2025/0056 |
| B-perm_same_as_corr | Permanent Same As Correspondence | nse-ucc | PERM_SAME_FLAG | CHAR(1) | one-time | [direct] | Y/N; drives auto-copy of permanent address fields | NSE/ISC/61817 |
| B-perm_state | Permanent State Code | back-office | perm_state_code | VARCHAR(2) | on-modify | lookup against R | state-code lookup; only differs from corr in <20% of cases | [industry typical] |
| B-perm_state | Permanent State | bse-ucc | PERM_STATE | VARCHAR(30) | on-modify | lookup against R | Conditional | BSE/20240223-42 |
| B-perm_state | Permanent State | cdsl-bo | PERM_STATE | CHAR(2) | on-modify | lookup against R | CDSL state code; line 03 | CDSL/OPS/DP/SYSTM/2023/119 |
| B-perm_state | Permanent State | ckyc | PERM_STATE | CHAR(2) | one-time | lookup against R | CKYC master state list | CKYC/2025/16 |
| B-perm_state | Permanent State | kra | PERM_STATE | CHAR(2) | on-modify | lookup against R | Conditional | [industry typical] |
| B-perm_state | Permanent State | mcx-ucc | PERM_STATE | VARCHAR(30) | on-modify | lookup against R | State-City master | MCX/S&I/507/2024 |
| B-perm_state | Permanent State | nsdl-bo | PrmnntCtrySubDvsn | CHAR(2) UDiFF | on-modify | lookup against R | ISO 3166-2 subdivision code | NSDL/POLICY/2025/0042 |
| B-perm_state | Permanent State | nse-ucc | PERM_STATE | VARCHAR(30) | on-modify | lookup against R | Conditional state code | NSE/ISC/61817 |
| B-poa_address_same_as_corr | POA Same as Correspondence | cdsl-bo | POA_SAME_FLAG | CHAR(1) | one-time | [direct] | Y/N flag; POA document address same as corr address | CDSL/OPS/DP/SYSTM/2023/119 |
| B-poa_address_same_as_corr | POA Same as Correspondence | nsdl-bo | POASameFlg | CHAR(1) UDiFF | one-time | [direct] | Y/N element | NSDL/POLICY/2025/0056 |

## Verified through

2026-05-14

---

*AI-generated and not legal advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*

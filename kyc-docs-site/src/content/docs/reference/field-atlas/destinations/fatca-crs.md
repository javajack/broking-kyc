---
title: "FATCA / CRS Reports — Fields consumed"
description: "Every field consumed by FATCA / CRS Reports, with source section, destination format, update frequency, transformation rule, and quirks. Use this when building an integration with this destination."
---

> **Why this page is structured this way:** This is the destination-first view for <abbr title="Foreign Account Tax Compliance Act (US)">FATCA</abbr> / <abbr title="Common Reporting Standard">CRS</abbr> Reports. Engineers building an integration with this destination get the complete field list on one page. To see where each field originated in onboarding, follow the per-section links via the [atlas overview](/broking-kyc/reference/field-atlas/).

## TL;DR

- **33 unique fields** consumed by FATCA / CRS Reports.
- Source spans sections: A, B, C, J, S, V.
- **33 rows cite a public spec source**; **0** are `[industry typical]`.

## Field-destination rows

Sorted by `source_section`, then `field_id`.

| source_section | field_id | field_name | destination_field_name | destination_format | frequency | transformation | quirks_notes | spec_source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| A | A-ckyc_number | <abbr title="Central KYC (records registry)">CKYC</abbr> Number | CKYC_KIN | CHAR(14) | on-event | [direct] | annual cadence; CKYC <abbr title="KYC Identification Number">KIN</abbr> linked to FATCA record at <abbr title="KYC Registration Agency">KRA</abbr>; helps dedupe across intermediaries | <abbr title="Securities and Exchange Board of India">SEBI</abbr>/<abbr title="Head Office (SEBI circular ID prefix)">HO</abbr>/<abbr title="Markets Intermediaries Regulation and Supervision Department (SEBI)">MIRSD</abbr>/SECFATF/P/CIR/2024/12 |
| A | A-country_of_birth | Country of Birth (Section A duplicate) | COB_ALT | CHAR(2) | on-event | [direct] | same as J05; broker captures in both places; ISO-3166 alpha-2; reconciled at upload | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| A | A-date_of_birth | Date of Birth | DOB | DATE YYYYMMDD | on-event | formatted | converted to YYYY-MM-DD per CRS XML schema; passed in OECD ReportableAccount block | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| A | A-full_name | Full Name | ACCOUNT_HOLDER_NAME | VARCHAR(200) | on-event | [direct] | must match <abbr title="Permanent Account Number">PAN</abbr>-name; CRS XML requires "ResCountryCode + <abbr title="Taxpayer Identification Number (in FATCA / CRS context)">TIN</abbr> + Name" key | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| A | A-nationality | Nationality | NATIONALITY_ISO | CHAR(2) | on-event | [direct] | ISO-3166 alpha-2; not the same as tax residence in FATCA/CRS; separate field on KRA template | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| A | A-pan_number | PAN Number | INDIA_TIN_PAN | CHAR(10) | on-event | uppercase | PAN serves as India TIN for FATCA/CRS; uploaded as primary tax-identifier with country=IN | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| A | A-place_of_birth | Place of Birth (Section A) | POB_ALT | VARCHAR(50) | on-event | [direct] | same as J06; FATCA template uses Section J entry; Section A entry used for KRA | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| A | A-residential_status | Residential Status | RES_STATUS_CODE | CHAR(2) | on-event | lookup against R | RI/<abbr title="Non-Resident Indian">NRI</abbr>/FN/PIO drives whether self-certification mandatory and which template variant | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| B | B-corr_address_line1 | Correspondence Address Line1 | RES_ADDR_L1 | VARCHAR(100) | on-event | [direct] | captured in CRS XML AddressFix.Street; required for ReportableAccount block | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| B | B-corr_city | Correspondence City | RES_CITY | VARCHAR(50) | on-event | [direct] | CRS City field | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| B | B-corr_country | Correspondence Country | RES_ADDRESS_COUNTRY | CHAR(2) | on-event | lookup against R | address country used as indicia under CRS; non-IN addr triggers self-cert review even if J01=Y | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| B | B-corr_pincode | Correspondence Pincode | RES_POSTCODE | VARCHAR(10) | on-event | [direct] | CRS PostCode field; 6 digits for IN; varies for foreign addresses | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| C | C-email | Email | CONTACT_EMAIL | VARCHAR(100) | on-event | lowercase | contact channel; not itself indicia; used for self-cert refresh reminders | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| C | C-mobile_number | Mobile Number | CONTACT_MOBILE | VARCHAR(15) | on-event | [direct] | contact channel for FATCA discrepancy queries; foreign mobile triggers indicia review | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| J | J-citizenship_country | Citizenship Country | CITIZENSHIP | CHAR(2) | on-event | [direct] | annual cadence; multi-valued (dual citizens); each citizenship potentially triggers separate CRS reporting | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| J | J-country_of_birth | Country of Birth | COUNTRY_OF_BIRTH | CHAR(2) | on-event | [direct] | annual cadence; ISO-3166 alpha-2; US birth -> US-person rebuttable presumption requiring renunciation evidence | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| J | J-fatca_declaration_date | FATCA Declaration Date | DECLARATION_DATE | DATE YYYYMMDD | on-event | formatted | annual cadence; must be within last 12 months; KRA validates < 1y for re-upload eligibility | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| J | J-fatca_declaration_place | FATCA Declaration Place | DECLARATION_PLACE | VARCHAR(50) | on-event | [direct] | annual cadence; declaration city/town; free-text | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| J | J-fatca_signature | FATCA Signature | SIGNATURE_BLOB | BLOB | on-event | [direct] | annual cadence; digital (e-Sign hash) or scanned wet signature; uploaded as image/PDF attachment to KRA | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| J | J-is_tax_resident_of_india_only | India-only Tax Residency Flag | IND_TAX_RES_ONLY | CHAR(1) | on-event | [direct] | annual cadence (FATCA Form re-affirmed yearly); if Y, J08-J12 left blank; central upload to KRA effective Jul 1, 2024 | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| J | J-is_us_person | US Person Status | US_PERSON_FLAG | CHAR(1) | on-event | [direct] | annual cadence; triggers FATCA W-9 equivalent; if Y, US TIN/SSN mandatory and J04 (green card) asked | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| J | J-place_of_birth_city | Place of Birth City | POB_CITY | VARCHAR(50) | on-event | [direct] | annual cadence; free-text city/town; cross-validated with passport place-of-birth where available | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| J | J-tax_country | Tax Residence Country | TAX_RES_COUNTRY | CHAR(2) | on-event | [direct] | annual cadence; ISO-3166 alpha-2; one row per country of tax residence (max 5) | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| J | J-tax_country_seq | Tax Country Sequence | TAX_RES_SEQ | NUMBER(1) | on-event | [direct] | annual cadence; 1-5; if J01=N, repeat block per non-IN tax residence | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| J | J-tax_id_number | Foreign Tax ID Number (TIN) | FOREIGN_TIN | VARCHAR(30) | on-event | [direct] | annual cadence; TIN format varies by country; OECD TIN-online portal used for format check; uploaded to KRA per Feb 2024 circular | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| J | J-tax_id_type | Tax ID Type | TIN_TYPE | CHAR(2) | on-event | [direct] | annual cadence; TIN/SSN/EIN; required to disambiguate identifier when country issues multiple types | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| J | J-tin_not_available_reason | TIN Not Available Reason | TIN_ABSENT_RSN | CHAR(2) | on-event | [direct] | annual cadence; A/B/C codes per OECD CRS schema; reason B (unable to obtain) requires explanation | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| J | J-us_green_card_holder | US Green Card Holder | GREEN_CARD_FLAG | CHAR(1) | on-event | [direct] | annual cadence; required if J02=Y; green-card holders are US tax persons even if Indian-resident | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| J | J-us_tin_ssn | US TIN / SSN | US_TIN | CHAR(11) | on-event | [direct] | annual cadence; 9-digit SSN or US TIN; mandatory if J02=Y; format US-XXX-XX-XXXX accepted | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| S | S-kra_pos_code | KRA POS Code | FATCA_POS_CODE | VARCHAR(20) | on-event | [direct] | intermediary POS code stamped on FATCA upload to KRA; allows traceback to RFI per Feb 2024 circular | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| V | V-overseas_address_line1 | Overseas Address Line1 | OVERSEAS_ADDR_L1 | VARCHAR(100) | on-event | [direct] | NRI overseas residential address; CRS account-holder address | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| V | V-overseas_country | Overseas Country | OVERSEAS_COUNTRY | CHAR(2) | on-event | [direct] | NRI overseas address country; mandatory CRS indicia for non-resident accounts | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| V | V-tax_residency_certificate | Tax Residency Certificate | TRC_DOCUMENT | BLOB | on-event | [direct] | NRI-only; supporting document for foreign-tax-residence claim; uploaded if claiming DTAA treaty benefits | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |

## Verified through

2026-05-14

---

*AI-generated and not legal advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*

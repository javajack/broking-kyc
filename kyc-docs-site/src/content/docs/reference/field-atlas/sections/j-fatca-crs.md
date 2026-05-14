---
title: "Section J: FATCA/CRS Declaration — Data Flow"
description: "Where each field in Section J: FATCA/CRS Declaration flows downstream — destinations, formats, frequencies, transformations, quirks."
---

> **Why this page is structured this way:** This is the field-first view for Section J: <abbr title="Foreign Account Tax Compliance Act (US)">FATCA</abbr>/<abbr title="Common Reporting Standard">CRS</abbr> Declaration. Each row is one field-destination relationship. To see the same data from the destination's perspective, jump from the [atlas overview](/broking-kyc/reference/field-atlas/).

## TL;DR

- **15 unique fields** in this section.
- **46 field-destination relationships** total.
- Source-of-truth field definitions: [Master Dataset](/broking-kyc/reference/master-dataset/).

## Data flow table

Sorted by `field_id`, then `destination`.

| field_id | field_name | destination | destination_field_name | destination_format | frequency | transformation | quirks_notes | spec_source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| J-citizenship_country | Citizenship Country | ckyc | CITIZENSHIP | CHAR(3) | one-time | lookup against R | <abbr title="Central KYC (records registry)">CKYC</abbr> supports up to 3 citizenship countries | CKYC/2025/16 |
| J-citizenship_country | Citizenship Country | fatca-crs | CITIZENSHIP | CHAR(2) | on-event | [direct] | annual cadence; multi-valued (dual citizens); each citizenship potentially triggers separate CRS reporting | <abbr title="Securities and Exchange Board of India">SEBI</abbr>/<abbr title="Head Office (SEBI circular ID prefix)">HO</abbr>/<abbr title="Markets Intermediaries Regulation and Supervision Department (SEBI)">MIRSD</abbr>/SECFATF/P/CIR/2024/12 |
| J-citizenship_country | Citizenship Country | kra | CITIZENSHIP | CHAR(2) | on-modify | lookup against R | ISO alpha-2; supports multiple per repeat group | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| J-country_of_birth | Country of Birth (FATCA) | ckyc | COUNTRY_OF_BIRTH | CHAR(3) | one-time | lookup against R | Same as A-country_of_birth; CKYC alpha-3 | CKYC/2025/16 |
| J-country_of_birth | Country of Birth | fatca-crs | COUNTRY_OF_BIRTH | CHAR(2) | on-event | [direct] | annual cadence; ISO-3166 alpha-2; US birth -> US-person rebuttable presumption requiring renunciation evidence | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| J-country_of_birth | Country of Birth (FATCA) | kra | FATCA_CTRY_BIRTH | CHAR(2) | on-modify | lookup against R | ISO alpha-2; FATCA-mandated | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| J-fatca_declaration_date | FATCA Declaration Date | ckyc | [same] | DATE DD-MM-YYYY | one-time | formatted | CKYC may store via document submission | [industry typical] |
| J-fatca_declaration_date | FATCA Declaration Date | fatca-crs | DECLARATION_DATE | DATE YYYYMMDD | on-event | formatted | annual cadence; must be within last 12 months; <abbr title="KYC Registration Agency">KRA</abbr> validates < 1y for re-upload eligibility | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| J-fatca_declaration_date | FATCA Declaration Date | kra | FATCA_DECL_DATE | DATE DD/MM/YYYY | on-modify | formatted | Mandatory; date of self-certification | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| J-fatca_declaration_place | FATCA Declaration Place | ckyc | [same] | VARCHAR(50) | one-time | formatted | Industry-typical | [industry typical] |
| J-fatca_declaration_place | FATCA Declaration Place | fatca-crs | DECLARATION_PLACE | VARCHAR(50) | on-event | [direct] | annual cadence; declaration city/town; free-text | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| J-fatca_declaration_place | FATCA Declaration Place | kra | FATCA_DECL_PLACE | VARCHAR(50) | on-modify | formatted | City of declaration | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| J-fatca_signature | FATCA Signature | ckyc | [same] | BLOB | one-time | [direct] | CKYC stores via document image if applicable | [industry typical] |
| J-fatca_signature | FATCA Signature | fatca-crs | SIGNATURE_BLOB | BLOB | on-event | [direct] | annual cadence; digital (e-Sign hash) or scanned wet signature; uploaded as image/PDF attachment to KRA | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| J-fatca_signature | FATCA Signature | kra | FATCA_SIGN | BLOB | on-modify | [direct] | Digital or scanned; centralized at KRA | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| J-is_tax_resident_of_india_only | India Tax Resident Only | bse-ucc | FATCA_IN_ONLY | CHAR(1) | one-time | [direct] | FATCA-CRS impact area on <abbr title="Unique Client Code">UCC</abbr> master circulars | <abbr title="BSE Limited (formerly Bombay Stock Exchange)">BSE</abbr>/20240223-42 |
| J-is_tax_resident_of_india_only | Tax Resident India Only | ckyc | TAX_RESIDENT_INDIA_ONLY | CHAR(1) | one-time | [direct] | CKYC optional; FATCA primarily handled at KRA | [industry typical] |
| J-is_tax_resident_of_india_only | India-only Tax Residency Flag | fatca-crs | IND_TAX_RES_ONLY | CHAR(1) | on-event | [direct] | annual cadence (FATCA Form re-affirmed yearly); if Y, J08-J12 left blank; central upload to KRA effective Jul 1, 2024 | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| J-is_tax_resident_of_india_only | Tax Resident India Only | kra | TAX_RES_INDIA_ONLY | CHAR(1) | on-modify | [direct] | Y/N; centralized at KRA since 01-Jul-2024; KRA stores FATCA self-cert | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| J-is_tax_resident_of_india_only | India Tax Resident Only | mcx-ucc | FATCA_IN_ONLY | CHAR(1) | one-time | [direct] | FATCA-CRS tagged in UCC submission per onboarding flow | <abbr title="Multi Commodity Exchange of India">MCX</abbr>/TECH/394/2023 |
| J-is_tax_resident_of_india_only | India Tax Resident Only | nse-ucc | FATCA_IN_ONLY | CHAR(1) | one-time | [direct] | Y simplifies UCC; N triggers FATCA tax-country annex | <abbr title="National Stock Exchange of India">NSE</abbr>/<abbr title="Investor Service Centre.">ISC</abbr>/61817 |
| J-is_us_person | US Person Flag | ckyc | US_PERSON_FLAG | CHAR(1) | one-time | [direct] | CKYC captures for cross-sector consistency | [industry typical] |
| J-is_us_person | US Person Status | fatca-crs | US_PERSON_FLAG | CHAR(1) | on-event | [direct] | annual cadence; triggers FATCA W-9 equivalent; if Y, US <abbr title="Taxpayer Identification Number (in FATCA / CRS context)">TIN</abbr>/SSN mandatory and J04 (green card) asked | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| J-is_us_person | US Person Flag | kra | US_PERSON_FLAG | CHAR(1) | on-modify | [direct] | Y/N; triggers FATCA reporting if Y | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| J-place_of_birth_city | Place of Birth City | ckyc | PLACE_OF_BIRTH | VARCHAR(50) | one-time | formatted | CKYC same as A-place_of_birth | CKYC/2025/16 |
| J-place_of_birth_city | Place of Birth City | fatca-crs | POB_CITY | VARCHAR(50) | on-event | [direct] | annual cadence; free-text city/town; cross-validated with passport place-of-birth where available | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| J-place_of_birth_city | Place of Birth City | kra | FATCA_POB_CITY | VARCHAR(50) | on-modify | formatted | FATCA mandatory | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| J-tax_country | Tax Residency Country | ckyc | [same] | CHAR(3) | one-time | lookup against R | CKYC may capture for non-US tax-residency | [industry typical] |
| J-tax_country | Tax Residence Country | fatca-crs | TAX_RES_COUNTRY | CHAR(2) | on-event | [direct] | annual cadence; ISO-3166 alpha-2; one row per country of tax residence (max 5) | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| J-tax_country | Tax Residency Country | kra | TAX_COUNTRY | CHAR(2) | on-modify | lookup against R | Repeats up to 5 countries; KRA centralization since 01-Jul-2024 | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| J-tax_country_seq | Tax Country Sequence | fatca-crs | TAX_RES_SEQ | NUMBER(1) | on-event | [direct] | annual cadence; 1-5; if J01=N, repeat block per non-IN tax residence | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| J-tax_id_number | Tax ID Number | ckyc | [same] | VARCHAR(30) | one-time | [direct] | Industry-typical mapping; CKYC optional | [industry typical] |
| J-tax_id_number | Foreign Tax ID Number (TIN) | fatca-crs | FOREIGN_TIN | VARCHAR(30) | on-event | [direct] | annual cadence; TIN format varies by country; OECD TIN-online portal used for format check; uploaded to KRA per Feb 2024 circular | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| J-tax_id_number | Tax ID Number | kra | TAX_TIN | VARCHAR(30) | on-modify | [direct] | TIN for each tax country | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| J-tax_id_type | Tax ID Type | ckyc | [same] | CHAR(2) | one-time | [direct] | CKYC industry-typical | [industry typical] |
| J-tax_id_type | Tax ID Type | fatca-crs | TIN_TYPE | CHAR(2) | on-event | [direct] | annual cadence; TIN/SSN/EIN; required to disambiguate identifier when country issues multiple types | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| J-tax_id_type | Tax ID Type | kra | TIN_TYPE | CHAR(2) | on-modify | [direct] | TIN/SSN/EIN etc | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| J-tin_not_available_reason | TIN Not Available Reason | ckyc | [same] | CHAR(1) | one-time | [direct] | Industry-typical | [industry typical] |
| J-tin_not_available_reason | TIN Not Available Reason | fatca-crs | TIN_ABSENT_RSN | CHAR(2) | on-event | [direct] | annual cadence; A/B/C codes per OECD CRS schema; reason B (unable to obtain) requires explanation | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| J-tin_not_available_reason | TIN Not Available Reason | kra | TIN_NA_REASON | CHAR(1) | on-modify | [direct] | A=Country doesn't issue, B=Unable, C=Not required | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| J-us_green_card_holder | US Green Card Holder | ckyc | [same] | CHAR(1) | one-time | [direct] | CKYC may not capture; industry-typical extension | [industry typical] |
| J-us_green_card_holder | US Green Card Holder | fatca-crs | GREEN_CARD_FLAG | CHAR(1) | on-event | [direct] | annual cadence; required if J02=Y; green-card holders are US tax persons even if Indian-resident | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| J-us_green_card_holder | US Green Card Holder | kra | US_GREEN_CARD | CHAR(1) | on-modify | [direct] | Conditional; affects FATCA reporting class | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| J-us_tin_ssn | US TIN/SSN | ckyc | [same] | VARCHAR(11) | one-time | [direct] | CKYC captures TIN when applicable | [industry typical] |
| J-us_tin_ssn | US TIN / SSN | fatca-crs | US_TIN | CHAR(11) | on-event | [direct] | annual cadence; 9-digit SSN or US TIN; mandatory if J02=Y; format US-XXX-XX-XXXX accepted | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| J-us_tin_ssn | US TIN/SSN | kra | US_TIN | VARCHAR(11) | on-modify | [direct] | Conditional if is_us_person=Y | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |

## Verified through

2026-05-14

---

*AI-generated and not legal advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*

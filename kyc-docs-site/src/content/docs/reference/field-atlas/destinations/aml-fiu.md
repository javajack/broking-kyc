---
title: "AML Reports to FIU-IND — Fields consumed"
description: "Every field consumed by AML Reports to FIU-IND, with source section, destination format, update frequency, transformation rule, and quirks. Use this when building an integration with this destination."
---

> **Why this page is structured this way:** This is the destination-first view for <abbr title="Anti-Money Laundering">AML</abbr> Reports to <abbr title="Financial Intelligence Unit — India">FIU-IND</abbr>. Engineers building an integration with this destination get the complete field list on one page. To see where each field originated in onboarding, follow the per-section links via the [atlas overview](/broking-kyc/reference/field-atlas/).

## TL;DR

- **52 unique fields** consumed by AML Reports to <abbr title="Financial Intelligence Unit">FIU</abbr>-IND.
- Source spans sections: A, B, C, F, G, H, K, S, U, V, Y, Z, <abbr title="Account Aggregator (RBI-licensed NBFC-AA)">AA</abbr>.
- **55 rows cite a public spec source**; **0** are `[industry typical]`.

## Field-destination rows

Sorted by `source_section`, then `field_id`.

| source_section | field_id | field_name | destination_field_name | destination_format | frequency | transformation | quirks_notes | spec_source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| A | A-aadhaar_number | Aadhaar Number | AADHAAR_MASKED | CHAR(12) | on-event | truncate to N | only last-4 transmitted to FIU per UIDAI guidelines; full Aadhaar prohibited in <abbr title="Suspicious Transaction Report">STR</abbr>/<abbr title="Cash Transaction Report">CTR</abbr> narrative | <abbr title="Securities and Exchange Board of India">SEBI</abbr>/<abbr title="Head Office (SEBI circular ID prefix)">HO</abbr>/<abbr title="Markets Intermediaries Regulation and Supervision Department (SEBI)">MIRSD</abbr>/SECFATF/P/CIR/2024/78 |
| A | A-ckyc_number | <abbr title="Central KYC (records registry)">CKYC</abbr> Number | CKYC_KIN | CHAR(14) | on-event | [direct] | CKYC <abbr title="KYC Identification Number">KIN</abbr> included where available; helps FIU dedupe across REs | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/78 |
| A | A-date_of_birth | Date of Birth | DOB | DATE YYYYMMDD | on-event | formatted | required customer-attribute field in STR/CTR/CBWTR; passed as YYYY-MM-DD per FINnet schema | FIU-IND-REPORTING-FORMAT-V114 |
| A | A-first_name | First Name | FIRST_NAME | VARCHAR(70) | on-event | [direct] | split-name fields in FINnet 2.0 schema (XML elements FirstName/MiddleName/LastName) | FIU-IND-REPORTING-FORMAT-V114 |
| A | A-full_name | Full Name | CUSTOMER_NAME | VARCHAR(200) | on-event | [direct] | STR/CTR header field; must match <abbr title="Permanent Account Number">PAN</abbr>-name; STR narrative also refers to name | FIU-IND-REPORTING-FORMAT-V114 |
| A | A-full_name | Full Name (Sanction Screening) | SANCTION_SCREEN_NAME | VARCHAR(200) | on-event | uppercase | screened against UNSC 1267/1989 + MHA list per UAPA Sec 51A; positive match -> immediate freeze + STR | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/78 |
| A | A-gender | Gender | GENDER | CHAR(1) | on-event | [direct] | M/F/T; XML element Gender; required in CTR per CTR banking format | FIU-IND-CTR-BANKING-FORMAT |
| A | A-last_name | Last Name | LAST_NAME | VARCHAR(70) | on-event | [direct] | required XML element LastName | FIU-IND-REPORTING-FORMAT-V114 |
| A | A-middle_name | Middle Name | MIDDLE_NAME | VARCHAR(70) | on-event | [direct] | optional XML element MiddleName | FIU-IND-REPORTING-FORMAT-V114 |
| A | A-nationality | Nationality | NATIONALITY | CHAR(2) | on-event | [direct] | ISO-3166 alpha-2; STR risk-classification uses nationality + residential status | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/78 |
| A | A-pan_number | PAN Number | CUSTOMER_PAN | CHAR(10) | on-event | uppercase | primary client identifier in all FIU reports; STR/CTR rejected by FINnet if PAN missing/invalid format | FIU-IND-REPORTING-FORMAT-V114 |
| A | A-pan_number | PAN (UAPA Screening) | UAPA_SCREEN_KEY | CHAR(10) | on-event | uppercase | PAN re-screened on every UNSC list refresh; positive match -> freeze + MHA report via FIU-IND | FIU-IND-UAPA-UNSC-UPDATE-21022025 |
| A | A-residential_status | Residential Status | RES_STATUS | CHAR(2) | on-event | lookup against R | RI/<abbr title="Non-Resident Indian">NRI</abbr>/FN/PIO; NRI cross-border txns trigger CBWTR; FN flagged for EDD | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/78 |
| AA | AA-dpdp_consent_withdrawal_date | <abbr title="Digital Personal Data Protection Act 2023 (and Rules 2025)">DPDP</abbr> Withdrawal Date | DPDP_OVERRIDE_FLAG | DATE YYYYMMDD | on-event | [direct] | <abbr title="Prevention of Money Laundering Act 2002">PMLA</abbr> obligations override DPDP withdrawal; STR/CTR continue even after consent withdrawn | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/78 |
| B | B-corr_address_line1 | Correspondence Address Line1 | ADDRESS_L1 | VARCHAR(100) | on-event | [direct] | FINnet AddressLine1 element; required customer attribute | FIU-IND-REPORTING-FORMAT-V114 |
| B | B-corr_city | Correspondence City | CITY | VARCHAR(50) | on-event | [direct] | STR/CTR geography; FIU uses city-level analysis for typology detection | FIU-IND-REPORTING-FORMAT-V114 |
| B | B-corr_country | Correspondence Country | COUNTRY | CHAR(2) | on-event | lookup against R | non-IN country in CBWTR triggers enhanced reporting; <abbr title="Financial Action Task Force">FATF</abbr>-grey-list countries flagged for STR | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/78 |
| B | B-corr_pincode | Correspondence Pincode | PINCODE | VARCHAR(6) | on-event | [direct] | 6-digit IN pin; foreign address blocked at this field; use V-block for overseas | FIU-IND-REPORTING-FORMAT-V114 |
| B | B-corr_state | Correspondence State | STATE | VARCHAR(30) | on-event | lookup against R | state-code lookup; FINnet uses standard state list | FIU-IND-REPORTING-FORMAT-V114 |
| C | C-email | Email | EMAIL | VARCHAR(100) | on-event | lowercase | customer-attribute field; FIU cross-references against other RE filings | FIU-IND-REPORTING-FORMAT-V114 |
| C | C-mobile_number | Mobile Number | MOBILE | VARCHAR(15) | on-event | [direct] | customer-attribute field in STR/CTR; used by FIU to link transactions across REs | FIU-IND-REPORTING-FORMAT-V114 |
| F | F-declared_annual_income | Declared Annual Income | DECLARED_INCOME | NUMBER(15,2) | on-event | [direct] | optional exact figure if captured; used in EDD-required STR cases | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/78 |
| F | F-gross_annual_income_range | Gross Annual Income Range | INCOME_RANGE | CHAR(2) | on-event | [direct] | income-range code; STR narrative uses to substantiate "inconsistent with declared income" suspicion | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/78 |
| F | F-net_worth | Net Worth | NET_WORTH | NUMBER(15,2) | on-event | [direct] | captured at onboarding; cited in STR narrative where transactions exceed net worth | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/78 |
| F | F-occupation | Occupation | OCCUPATION | CHAR(2) | on-event | lookup against R | customer-profile field; STR narrative cites occupation when transactions are inconsistent with profile | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/78 |
| F | F-source_of_wealth | Source of Wealth | SOURCE_OF_WEALTH | VARCHAR(100) | on-event | [direct] | free-text; STR narrative quotes verbatim when funds source is inconsistent | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/78 |
| G | G-account_number | Bank Account Number | BANK_ACCOUNT_NO | VARCHAR(18) | on-event | [direct] | full account number in STR/CBWTR/CTR (FIU is law-enforcement; masking not applied) | FIU-IND-REPORTING-FORMAT-V114 |
| G | G-account_type | Account Type | ACCOUNT_TYPE | CHAR(2) | on-event | [direct] | SB/CA/<abbr title="Non-Resident External (Rupee) account">NRE</abbr>/<abbr title="Non-Resident Ordinary (Rupee) account">NRO</abbr>; NRE/NRO accounts elevate scrutiny under <abbr title="Portfolio Investment Scheme (RBI / NRI)">PIS</abbr> framework | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/78 |
| G | G-bank_name | Bank Name | BANK_NAME | VARCHAR(100) | on-event | [direct] | FINnet schema BankName element; required for CTR/CBWTR | FIU-IND-REPORTING-FORMAT-V114 |
| G | G-bank_proof_type | Cash Receipt Mode (CTR) | CASH_RECEIPT_MODE | CHAR(2) | on-event | [direct] | CTR threshold Rs 10L aggregate calendar-month; broker rarely accepts cash but CTR template required if so | FIU-IND-CTR-BANKING-FORMAT |
| G | G-ifsc_code | <abbr title="Indian Financial System Code.">IFSC</abbr> Code | IFSC | CHAR(11) | on-event | [direct] | routing identifier; CBWTR uses IFSC for IN-leg; foreign leg uses SWIFT | FIU-IND-CBWT-FAQ |
| G | G-penny_drop_ref | Bank Reference (CCR/CTR) | CCR_TRANSACTION_REF | VARCHAR(30) | on-event | [direct] | where broker receives counterfeit cash at branch; CCR filed regardless of amount per PMLR Rule 3(1)(B) | FIU-IND-PMLR-AMEND-2023-03-07 |
| H | H-bo_id | <abbr title="Beneficial Owner">BO</abbr> ID | DEMAT_ACCOUNT_ID | CHAR(16) | on-event | [direct] | depository STR mandatory for off-market transfer suspicions; <abbr title="Central Depository Services (India) Limited">CDSL</abbr> 16-digit / <abbr title="National Securities Depository Limited">NSDL</abbr> IN+14 | FIU-IND-REPORTING-FORMAT-V114 |
| K | K-beneficial_owner_declaration | Beneficial Owner Self-Decl | BO_SELF_FLAG | CHAR(1) | on-event | [direct] | Y means client is BO of own account; N triggers BO-details capture per PMLR 2023 (10% threshold) | FIU-IND-PMLR-AMEND-2023-03-07 |
| K | K-beneficial_owner_details | Beneficial Owner Details | BO_DETAILS | VARCHAR(500) | on-event | [manual] | full BO disclosure narrative; mandatory if K05=N; FIU may demand on STR follow-up | FIU-IND-PMLR-AMEND-2023-03-07 |
| K | K-beneficial_owner_details | BO Details (PMLR threshold) | BO_THRESHOLD_DETAILS | VARCHAR(500) | on-event | [manual] | non-individual BO at >=10% ownership/control per PMLR 7-Mar-2023; partnership threshold 10% | FIU-IND-PMLR-AMEND-2023-03-07 |
| K | K-is_pep | <abbr title="Politically Exposed Person">PEP</abbr> Status | PEP_FLAG | CHAR(1) | on-event | [direct] | PEP-flagged accounts get EDD; STR triggered on any threshold breach when PEP=Y | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/78 |
| K | K-is_pep_related | PEP-Related Status | PEP_RELATED_FLAG | CHAR(1) | on-event | [direct] | immediate family / close associate; same EDD treatment as direct PEP per PMLR 2023 amend | FIU-IND-PMLR-AMEND-2023-03-07 |
| K | K-pep_details | PEP Details | PEP_NARRATIVE | VARCHAR(200) | on-event | [manual] | free-text name/designation/relationship; included verbatim in STR Part-D narrative | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/78 |
| K | K-source_of_funds | Source of Funds | SOURCE_OF_FUNDS | VARCHAR(100) | on-event | [direct] | STR mandatory narrative field; PMLR amend 2023 reinforces source-of-funds capture | FIU-IND-PMLR-AMEND-2023-03-07 |
| S | S-kra_verifier_name | Compliance Verifier Name | STR_REPORTER_NAME | VARCHAR(100) | on-event | [direct] | Principal Officer name on STR; PO must meet FIU minimum qualifications (Feb 2025 guidance) | FIU-IND-PO-GUIDANCE-25022025 |
| U | U-ucc_client_type | <abbr title="Unique Client Code">UCC</abbr> Client Type | CLIENT_TYPE | CHAR(2) | on-event | [direct] | IN/HU/NR/CO; STR uses to distinguish corporate vs individual typologies | FIU-IND-REPORTING-FORMAT-V114 |
| U | U-ucc_code | UCC Code | CLIENT_CODE | VARCHAR(10) | on-event | [direct] | TS7 brokerage STR mandatory field; intermediary-assigned client code used as transaction-side identifier | FIU-IND-REPORTING-FORMAT-V114 |
| V | V-nre_nro_swift_code | SWIFT Code | COUNTERPARTY_SWIFT | CHAR(11) | on-event | [direct] | CBWTR mandatory for foreign-leg bank ID; required when wire >Rs 5L per Rule 3(1)(D) PMLR | FIU-IND-CBWT-FAQ |
| V | V-overseas_address_line1 | Overseas Address Line1 | COUNTERPARTY_ADDRESS | VARCHAR(100) | on-event | [direct] | CBWTR counterparty address; required for international wire reporting | FIU-IND-CBWT-FAQ |
| V | V-overseas_country | Overseas Country | BENEFICIARY_COUNTRY | CHAR(2) | on-event | [direct] | CBWTR direction field "P" sender / "R" receiver; reports filed separately | FIU-IND-CBWT-FAQ |
| Y | Y-account_status | Account Status | ACCOUNT_STATE | CHAR(2) | on-event | [direct] | frozen/suspended accounts on UNSC match send "freeze report" to MHA via FIU | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/78 |
| Y | Y-kyc_validity_end | <abbr title="Know Your Customer (process).">KYC</abbr> Validity End | KYC_EXPIRY | DATE YYYYMMDD | on-event | formatted | 5-year cycle; stale KYC accounts on suspect activity trigger automatic STR review | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/78 |
| Z | Z-checker_id | STR Checker ID | STR_CHECKER_USER | VARCHAR(50) | on-event | [direct] | Principal Officer or Designated Director who signs STR/CTR before FINnet upload | FIU-IND-FINGATE-USERMANUAL-REPORTS |
| Z | Z-investigation_status | Investigation Status | INVESTIGATION_STATE | CHAR(2) | on-event | [direct] | OP/CL; retained for 5+ years post-closure; FIU may re-open with follow-up request | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/78 |
| Z | Z-maker_id | STR Maker ID | STR_MAKER_USER | VARCHAR(50) | on-event | [direct] | user who flagged transaction; FINnet 2.0 e-sign trail captures | FIU-IND-FINGATE-USERMANUAL-REPORTS |
| Z | Z-sar_filed | STR Filed Flag | STR_FILED_FLAG | CHAR(1) | on-event | [direct] | set to Y on FINnet 2.0 acknowledgement; SAR is legacy name for STR in master-dataset | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/78 |
| Z | Z-sar_filing_date | STR Filing Date | STR_FILING_DATE | DATE YYYYMMDD | on-event | formatted | STR must be filed within 7 working days of suspicion confirmation per PMLA | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/78 |
| Z | Z-suspicious_activity_flagged | Suspicious Activity Flagged | STR_TRIGGER_FLAG | CHAR(1) | on-event | [direct] | internal flag triggering STR workflow; alert-indicator engine sets Y on capital-market typologies | FIU-IND-CAPITAL-MARKET-ALERTS-2022-23 |
| Z | Z-suspicious_activity_type | Suspicious Activity Type | STR_TYPE_CODE | VARCHAR(50) | on-event | lookup against R | typology code (synchronized trade / off-market transfer / mis-utilisation of client funds); per FIU alert indicators | FIU-IND-CAPITAL-MARKET-ALERTS-2022-23 |

## Verified through

2026-05-14

---

*AI-generated and not legal advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*

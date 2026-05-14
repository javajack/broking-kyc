---
title: "Section F: Financial Profile — Data Flow"
description: "Where each field in Section F: Financial Profile flows downstream — destinations, formats, frequencies, transformations, quirks."
---

> **Why this page is structured this way:** This is the field-first view for Section F: Financial Profile. Each row is one field-destination relationship. To see the same data from the destination's perspective, jump from the [atlas overview](/broking-kyc/reference/field-atlas/).

## TL;DR

- **10 unique fields** in this section.
- **56 field-destination relationships** total.
- Source-of-truth field definitions: [Master Dataset](/broking-kyc/reference/master-dataset/).

## Data flow table

Sorted by `field_id`, then `destination`.

| field_id | field_name | destination | destination_field_name | destination_format | frequency | transformation | quirks_notes | spec_source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| F-declared_annual_income | Declared Annual Income | aml-fiu | DECLARED_INCOME | NUMBER(15,2) | on-event | [direct] | optional exact figure if captured; used in EDD-required STR cases | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/78 |
| F-declared_annual_income | Declared Annual Income | back-office | decl_ann_income | NUMBER(15,2) | on-modify | [direct] | INR; appears on AML risk-score input | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/78 |
| F-declared_annual_income | Declared Annual Income | bse-ucc | DECL_INCOME | NUMBER(15,2) | on-modify | [direct] | Optional; supplements income range | BSE/20240223-42 |
| F-declared_annual_income | Declared Annual Income | ckyc | ANNUAL_INCOME_AMT | NUMBER(15,2) | one-time | [direct] | CKYC optional | CKYC/2020/04 |
| F-declared_annual_income | Declared Annual Income | kra | ANN_INCOME_AMT | NUMBER(15,2) | on-modify | [direct] | Optional; INR exact | [industry typical] |
| F-declared_annual_income | Declared Annual Income | mcx-ucc | DECL_INCOME | NUMBER(15,2) | on-modify | [direct] | Optional supplement to income range | MCX/TECH/394/2023 |
| F-declared_annual_income | Declared Annual Income | nse-ucc | DECL_INCOME | NUMBER(15,2) | on-modify | [direct] | INR exact; optional but recommended | NSE/ISC/61817 |
| F-gross_annual_income_range | Gross Annual Income Range | aml-fiu | INCOME_RANGE | CHAR(2) | on-event | [direct] | income-range code; STR narrative uses to substantiate "inconsistent with declared income" suspicion | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/78 |
| F-gross_annual_income_range | Gross Annual Income Range | back-office | income_range_cd | VARCHAR(2) | on-modify | lookup against R | income-range code; downstream to charges-differential (some brokers tier brokerage by income) | [industry typical] |
| F-gross_annual_income_range | Gross Annual Income Range | bse-ucc | INCOME_RANGE | CHAR(2) | on-modify | lookup against R | Mandatory in revised UCC; codes 01-06 | BSE/20240223-42 |
| F-gross_annual_income_range | Gross Annual Income Range | ckyc | GROSS_ANNUAL_INCOME | CHAR(2) | one-time | lookup against R | CKYC same code table; mandatory | CKYC/2025/16 |
| F-gross_annual_income_range | Gross Annual Income Range | kra | INCOME_SLAB | CHAR(2) | on-modify | lookup against R | Income range code 01-06; SEBI proposed revised slabs Jan 2026 | [industry typical] |
| F-gross_annual_income_range | Gross Annual Income Range | mcx-ucc | INCOME_RANGE | CHAR(2) | on-modify | lookup against R | Mandatory; drives income-proof tagging; required for ALL MCX clients (not just F&O) per MCX/S&I/663/2024 | MCX/S&I/663/2024 |
| F-gross_annual_income_range | Gross Annual Income Range | nse-ucc | INCOME_RANGE | CHAR(2) | on-modify | lookup against R | Mandatory per NSE/ISC/47869; codes 01-06; SEBI Jan 2026 proposes revised ranges | NSE/ISC/47869 |
| F-gross_annual_income_range | Annual Income Range Code | regulatory-reports | IncomeRange | CHAR(2) | daily | lookup against R | 01-06 code; drives F&O eligibility check and AML high-value-trade alerts; SEBI Jan-2026 revision pending | SEBI/HO/MIRSD/POD-1/P/CIR/2025/94 |
| F-gross_annual_income_range | Gross Annual Income Range | rms | income_tier | VARCHAR(2) | on-modify | lookup against R | income-tier feeds maximum-allowed exposure multiplier | [industry typical] |
| F-income_proof_document | Income Proof Document | bse-ucc | INC_PROOF_DOC | BLOB ref | one-time | [direct] | Document URI/hash; required for F&O/Commodity | BSE/20240223-42 |
| F-income_proof_document | Income Proof Document | mcx-ucc | INC_PROOF_DOC | BLOB ref | one-time | [direct] | Mandatory for ALL clients; document must be uploaded with UCC submission | MCX/S&I/663/2024 |
| F-income_proof_document | Income Proof Document | nse-ucc | INC_PROOF_DOC | BLOB ref | one-time | [direct] | Document URI/hash; required for F&O/Commodity | NSE/ISC/61817 |
| F-income_proof_financial_year | Income Proof Financial Year | back-office | inc_proof_fy | VARCHAR(9) | on-modify | [direct] | YYYY-YYYY format | [industry typical] |
| F-income_proof_financial_year | Income Proof Financial Year | bse-ucc | INC_PROOF_FY | VARCHAR(9) | one-time | formatted | Format YYYY-YYYY | BSE/20240223-42 |
| F-income_proof_financial_year | Income Proof Financial Year | mcx-ucc | INC_PROOF_FY | VARCHAR(9) | one-time | formatted | Format YYYY-YYYY; refresh annually for commodity segment | MCX/TECH/394/2023 |
| F-income_proof_financial_year | Income Proof Financial Year | nse-ucc | INC_PROOF_FY | VARCHAR(9) | one-time | formatted | Format YYYY-YYYY; refresh annually for F&O clients | NSE/ISC/61817 |
| F-income_proof_type | Income Proof Type | back-office | inc_proof_type | VARCHAR(2) | on-modify | [direct] | conditional; required for F&O/COM segment fee charging | [industry typical] |
| F-income_proof_type | Income Proof Type | bse-ucc | INC_PROOF_TYPE | CHAR(2) | one-time | [direct] | Required for F&O / Commodity segment activation only | BSE/20240223-42 |
| F-income_proof_type | Income Proof Type | mcx-ucc | INC_PROOF_TYPE | CHAR(2) | one-time | [direct] | MANDATORY for ALL MCX clients (not just derivatives); codes BS/SS/IT/F16/NW/DH/FD | MCX/S&I/663/2024 |
| F-income_proof_type | Income Proof Type | nse-ucc | INC_PROOF_TYPE | CHAR(2) | one-time | [direct] | Required for F&O / Commodity segment activation only | NSE/ISC/61817 |
| F-net_worth | Net Worth | aml-fiu | NET_WORTH | NUMBER(15,2) | on-event | [direct] | captured at onboarding; cited in STR narrative where transactions exceed net worth | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/78 |
| F-net_worth | Net Worth | back-office | net_worth_inr | NUMBER(15,2) | on-modify | [direct] | INR Lakhs; gate for F&O/COM activation | [industry typical] |
| F-net_worth | Net Worth | bse-ucc | NET_WORTH | NUMBER(15,2) | on-modify | [direct] | Required for F&O segment activation | BSE/20240223-42 |
| F-net_worth | Net Worth | ckyc | NETWORTH | NUMBER(15,2) | one-time | [direct] | CKYC optional field | CKYC/2020/04 |
| F-net_worth | Net Worth | kra | NET_WORTH | NUMBER(15,2) | on-modify | [direct] | INR Lakhs; KRA optional | [industry typical] |
| F-net_worth | Net Worth | mcx-ucc | NET_WORTH | NUMBER(15,2) | on-modify | [direct] | Required (with date) for all commodity segment clients | MCX/TECH/394/2023 |
| F-net_worth | Net Worth | nse-ucc | NET_WORTH | NUMBER(15,2) | on-modify | [direct] | Required for F&O segment activation; INR Lakhs | NSE/ISC/61817 |
| F-net_worth | Net Worth | regulatory-reports | NetWorth | NUMBER(15,2) | on-modify | [direct] | reported in CFR for high-net-worth clients; must be < 1-yr old per master-dataset F06 | [industry typical] |
| F-net_worth | Net Worth | rms | client_net_worth | NUMBER(15,2) | on-modify | [direct] | net-worth threshold gates F&O segment limit | [industry typical] |
| F-net_worth_date | Net Worth Date | back-office | net_worth_date | DATE YYYYMMDD | on-modify | formatted | must be <1yr old; auto-re-prompt on staleness | [industry typical] |
| F-net_worth_date | Net Worth Date | bse-ucc | NW_DATE | DATE DD/MM/YYYY | on-modify | formatted | Must be < 1 year old | BSE/20240223-42 |
| F-net_worth_date | Net Worth Date | ckyc | NETWORTH_DATE | DATE DD-MM-YYYY | one-time | formatted | CKYC optional | CKYC/2020/04 |
| F-net_worth_date | Net Worth Date | kra | NET_WORTH_DATE | DATE DD/MM/YYYY | on-modify | formatted | Conditional; must be <1 year old | [industry typical] |
| F-net_worth_date | Net Worth Date | mcx-ucc | NW_DATE | DATE DDMMYYYY | on-modify | formatted | Must be < 1 year old | MCX/TECH/394/2023 |
| F-net_worth_date | Net Worth Date | nse-ucc | NW_DATE | DATE DDMMYYYY | on-modify | formatted | Must be < 1 year old at submission | NSE/ISC/61817 |
| F-occupation | Occupation | aml-fiu | OCCUPATION | CHAR(2) | on-event | lookup against R | customer-profile field; STR narrative cites occupation when transactions are inconsistent with profile | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/78 |
| F-occupation | Occupation Code | back-office | occupation_cd | VARCHAR(2) | on-modify | lookup against R | occupation code-table; flag for high-risk occupation buckets in AML risk-tier | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/78 |
| F-occupation | Occupation | bse-ucc | OCCUPATION | CHAR(2) | on-modify | lookup against R | Occupation code table; mandatory | BSE/20240223-42 |
| F-occupation | Occupation | ckyc | OCCUPATION_TYPE | CHAR(2) | one-time | lookup against R | CERSAI occupation codes; same table as KRA per Appendix A1 | CKYC/2025/16 |
| F-occupation | Occupation | kra | OCCUPATION | CHAR(2) | on-modify | lookup against R | KRA/CKYC shared occupation code table (01-11, 99) | SEBI/HO/MIRSD/SECFATF/P/CIR/2023/169 |
| F-occupation | Occupation | mcx-ucc | OCCUPATION | CHAR(2) | on-modify | lookup against R | Required; commodity-segment client risk profiling input | MCX/TECH/394/2023 |
| F-occupation | Occupation | nse-ucc | OCCUPATION | CHAR(2) | on-modify | lookup against R | Occupation code table (01-11, 99); flows to UCC profile | NSE/ISC/61817 |
| F-occupation | Occupation Code | regulatory-reports | OccupationCode | CHAR(2) | daily | lookup against R | appears in CFR client-profile section and AML risk-bucket inputs | NSE/INSP/55039 |
| F-occupation_others | Occupation Others | ckyc | OCCUPATION_OTHERS | VARCHAR(50) | one-time | formatted | CKYC free-text | CKYC/2020/04 |
| F-occupation_others | Occupation Others | kra | OCCUPATION_OTHERS | VARCHAR(50) | on-modify | formatted | Conditional if F01=99 | [industry typical] |
| F-source_of_wealth | Source of Wealth | aml-fiu | SOURCE_OF_WEALTH | VARCHAR(100) | on-event | [direct] | free-text; STR narrative quotes verbatim when funds source is inconsistent | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/78 |
| F-source_of_wealth | Source of Wealth | back-office | source_of_wealth | VARCHAR(100) | on-modify | [direct] | Salary/Business/Inheritance; AML enhanced due-diligence input | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/78 |
| F-source_of_wealth | Source of Wealth | ckyc | SOURCE_OF_WEALTH | VARCHAR(100) | one-time | formatted | CKYC optional but recommended per PMLA | CKYC/2025/16 |
| F-source_of_wealth | Source of Wealth | kra | SRC_OF_WEALTH | VARCHAR(100) | on-modify | formatted | Optional in KRA; required for high-net-worth EDD | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/78 |

## Verified through

2026-05-14

---

*AI-generated and not legal advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*

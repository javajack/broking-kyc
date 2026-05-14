---
title: "Section K: PEP & AML Declaration — Data Flow"
description: "Where each field in Section K: PEP & AML Declaration flows downstream — destinations, formats, frequencies, transformations, quirks."
---

> **Why this page is structured this way:** This is the field-first view for Section K: PEP & AML Declaration. Each row is one field-destination relationship. To see the same data from the destination's perspective, jump from the [atlas overview](/broking-kyc/reference/field-atlas/).

## TL;DR

- **6 unique fields** in this section.
- **32 field-destination relationships** total.
- Source-of-truth field definitions: [Master Dataset](/broking-kyc/reference/master-dataset/).

## Data flow table

Sorted by `field_id`, then `destination`.

| field_id | field_name | destination | destination_field_name | destination_format | frequency | transformation | quirks_notes | spec_source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| K-beneficial_owner_declaration | Beneficial Owner Self-Decl | aml-fiu | BO_SELF_FLAG | CHAR(1) | on-event | [direct] | Y means client is BO of own account; N triggers BO-details capture per PMLR 2023 (10% threshold) | FIU-IND-PMLR-AMEND-2023-03-07 |
| K-beneficial_owner_declaration | BO Declaration | back-office | bo_decl_flg | CHAR(1) | on-modify | [direct] | N triggers full BO-details capture in AML case file | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/78 |
| K-beneficial_owner_declaration | Beneficial Owner Declaration | ckyc | BENEFICIAL_OWNER_DECL | CHAR(1) | one-time | [direct] | CKYC mandatory at upload | CKYC/2025/16 |
| K-beneficial_owner_declaration | Beneficial Owner Declaration | kra | BO_DECLARATION | CHAR(1) | on-modify | [direct] | Y if acting for self; PMLA Rule 9 lowered BO threshold per 2023 amendment | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/78 |
| K-beneficial_owner_details | Beneficial Owner Details | aml-fiu | BO_DETAILS | VARCHAR(500) | on-event | [manual] | full BO disclosure narrative; mandatory if K05=N; FIU may demand on STR follow-up | FIU-IND-PMLR-AMEND-2023-03-07 |
| K-beneficial_owner_details | BO Details (PMLR threshold) | aml-fiu | BO_THRESHOLD_DETAILS | VARCHAR(500) | on-event | [manual] | non-individual BO at >=10% ownership/control per PMLR 7-Mar-2023; partnership threshold 10% | FIU-IND-PMLR-AMEND-2023-03-07 |
| K-beneficial_owner_details | Beneficial Owner Details | ckyc | BENEFICIAL_OWNER_DETAILS | VARCHAR(500) | one-time | formatted | CKYC captures related-persons block | CKYC/2025/16 |
| K-beneficial_owner_details | Beneficial Owner Details | kra | BO_DETAILS | VARCHAR(500) | on-modify | formatted | Conditional if BO declaration=N; details of actual BO | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/78 |
| K-is_pep | PEP Status | aml-fiu | PEP_FLAG | CHAR(1) | on-event | [direct] | PEP-flagged accounts get EDD; STR triggered on any threshold breach when PEP=Y | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/78 |
| K-is_pep | Is PEP | back-office | pep_flg | CHAR(1) | on-modify | [direct] | Y triggers EDD; AML risk-tier = High immediately | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/78 |
| K-is_pep | PEP Flag | bse-ucc | PEP_FLAG | CHAR(1) | on-modify | [direct] | Y/N declaration for AML/EDD surveillance | BSE/20240223-42 |
| K-is_pep | PEP Flag | ckyc | PEP_FLAG | CHAR(1) | one-time | [direct] | CKYC PEP indicator; mandatory | CKYC/2025/16 |
| K-is_pep | PEP Flag | kra | PEP_FLAG | CHAR(1) | on-modify | [direct] | Y/N; triggers EDD; KRA-stored per AML master circular | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/78 |
| K-is_pep | PEP Flag | mcx-ucc | PEP_FLAG | CHAR(1) | on-modify | [direct] | Y/N; AML metadata into FIU-IND reporting | MCX/MEM/707/2022 |
| K-is_pep | PEP Flag | nse-ucc | PEP_FLAG | CHAR(1) | on-modify | [direct] | Y/N; triggers EDD; surveillance reference | NSE/ISC/61817 |
| K-is_pep | Is PEP | rms | pep_risk_flg | CHAR(1) | on-modify | [direct] | Y forces conservative exposure limits and additional surveillance margin | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/78 |
| K-is_pep | Is PEP | rms | rms_aml_risk_tier | VARCHAR(2) | daily | derived from Y | AML risk tier (Low/Med/High); High forces conservative exposure | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/78 |
| K-is_pep_related | PEP-Related Status | aml-fiu | PEP_RELATED_FLAG | CHAR(1) | on-event | [direct] | immediate family / close associate; same EDD treatment as direct PEP per PMLR 2023 amend | FIU-IND-PMLR-AMEND-2023-03-07 |
| K-is_pep_related | Is PEP-Related | back-office | pep_related_flg | CHAR(1) | on-modify | [direct] | Y triggers EDD; flagged in BO audit trail | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/78 |
| K-is_pep_related | PEP-Related Flag | ckyc | PEP_RELATED | CHAR(1) | one-time | [direct] | CKYC field for related-PEP classification | CKYC/2025/16 |
| K-is_pep_related | PEP-Related Flag | kra | PEP_RELATED | CHAR(1) | on-modify | [direct] | Related to a PEP; same EDD trigger | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/78 |
| K-pep_details | PEP Details | aml-fiu | PEP_NARRATIVE | VARCHAR(200) | on-event | [manual] | free-text name/designation/relationship; included verbatim in STR Part-D narrative | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/78 |
| K-pep_details | PEP Details | back-office | pep_details | VARCHAR(200) | on-modify | [direct] | free-text; appears in AML case file | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/78 |
| K-pep_details | PEP Details | ckyc | PEP_DESCRIPTION | VARCHAR(200) | one-time | formatted | CKYC free text | CKYC/2020/04 |
| K-pep_details | PEP Details | kra | PEP_DETAILS | VARCHAR(200) | on-modify | formatted | Conditional; name, designation, relationship | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/78 |
| K-source_of_funds | Source of Funds | aml-fiu | SOURCE_OF_FUNDS | VARCHAR(100) | on-event | [direct] | STR mandatory narrative field; PMLR amend 2023 reinforces source-of-funds capture | FIU-IND-PMLR-AMEND-2023-03-07 |
| K-source_of_funds | Source of Funds | back-office | src_of_funds | VARCHAR(100) | on-modify | [direct] | AML risk-score input; UCC re-screen quarterly | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/78 |
| K-source_of_funds | Source of Funds | bse-ucc | SOURCE_OF_FUNDS | VARCHAR(100) | one-time | [direct] | AML-relevant field; carried into UCC for surveillance | BSE/20240223-42 |
| K-source_of_funds | Source of Funds | ckyc | SOURCE_OF_FUNDS | VARCHAR(100) | one-time | formatted | CKYC code list; mandatory | CKYC/2025/16 |
| K-source_of_funds | Source of Funds | kra | SRC_OF_FUNDS | VARCHAR(100) | on-modify | formatted | Salary/Business/Investments/Inheritance/Gift/Others | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/78 |
| K-source_of_funds | Source of Funds | mcx-ucc | SOURCE_OF_FUNDS | VARCHAR(100) | one-time | [direct] | AML-relevant; FIU-IND FINNET 2.0 LOB metadata | MCX/MEM/411/2024 |
| K-source_of_funds | Source of Funds | nse-ucc | SOURCE_OF_FUNDS | VARCHAR(100) | one-time | [direct] | Salary/Business/Investments/Inheritance; KRA/AML tagging | NSE/ISC/61817 |

## Verified through

2026-05-14

---

*AI-generated and not legal advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*

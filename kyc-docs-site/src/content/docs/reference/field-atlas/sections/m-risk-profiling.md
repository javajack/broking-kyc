---
title: "Section M: Risk Profiling — Data Flow"
description: "Where each field in Section M: Risk Profiling flows downstream — destinations, formats, frequencies, transformations, quirks."
---

> **Why this page is structured this way:** This is the field-first view for Section M: Risk Profiling. Each row is one field-destination relationship. To see the same data from the destination's perspective, jump from the [atlas overview](/broking-kyc/reference/field-atlas/).

## TL;DR

- **6 unique fields** in this section.
- **10 field-destination relationships** total.
- Source-of-truth field definitions: [Master Dataset](/broking-kyc/reference/master-dataset/).

## Data flow table

Sorted by `field_id`, then `destination`.

| field_id | field_name | destination | destination_field_name | destination_format | frequency | transformation | quirks_notes | spec_source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| M-age_group | Age Group | back-office | age_bucket | VARCHAR(2) | on-modify | derived from Y | derived from DOB; appears on suitability assessment record | [industry typical] |
| M-investment_horizon | Investment Horizon | back-office | inv_horizon_cd | CHAR(1) | on-modify | [direct] | S/M/L; client suitability matrix input | [industry typical] |
| M-investment_objective | Investment Objective | back-office | inv_obj_cd | VARCHAR(2) | on-modify | [direct] | CA/IN/WP/SP; suitability disclosure record | [industry typical] |
| M-risk_appetite | Risk Appetite | back-office | risk_appetite_cd | CHAR(1) | on-modify | [direct] | L/M/H; gate for high-risk-product offerings | [industry typical] |
| M-risk_appetite | Risk Appetite | rms | rms_risk_tier | CHAR(1) | on-modify | [direct] | L tier may cap MTF and F&O exposure multiplier | [industry typical] |
| M-risk_category | Risk Category | back-office | risk_cat | VARCHAR(2) | on-modify | derived from Y | Conservative/Moderate/Aggressive; appears on contract-note Annexure | [industry typical] |
| M-risk_category | Risk Category | regulatory-reports | RiskCategory | CHAR(2) | on-modify | [direct] | Conservative/Moderate/Aggressive feeds AML risk-bucket; drives transaction-monitoring threshold | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/78 |
| M-risk_category | Risk Category | rms | rms_client_cat | VARCHAR(2) | on-modify | [direct] | feeds exposure-limit lookup | [industry typical] |
| M-risk_category | Risk Category | rms | rms_client_risk_cat | VARCHAR(2) | on-modify | [direct] | Conservative/Moderate/Aggressive; caps for MTF and F&O | [industry typical] |
| M-risk_profile_score | Risk Profile Score | back-office | risk_score | NUMBER(3) | on-modify | derived from Y | 0-100; derived from M01-M04 + F01+F03 | [industry typical] |

## Verified through

2026-05-14

---

*AI-generated and not legal advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*

---
title: "Section V: NRI-Specific — Data Flow"
description: "Where each field in Section V: NRI-Specific flows downstream — destinations, formats, frequencies, transformations, quirks."
---

> **Why this page is structured this way:** This is the field-first view for Section V: <abbr title="Non-Resident Indian">NRI</abbr>-Specific. Each row is one field-destination relationship. To see the same data from the destination's perspective, jump from the [atlas overview](/broking-kyc/reference/field-atlas/).

## TL;DR

- **12 unique fields** in this section.
- **20 field-destination relationships** total.
- Source-of-truth field definitions: [Master Dataset](/broking-kyc/reference/master-dataset/).

## Data flow table

Sorted by `field_id`, then `destination`.

| field_id | field_name | destination | destination_field_name | destination_format | frequency | transformation | quirks_notes | spec_source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| V-nre_nro_account_type | <abbr title="Non-Resident External (Rupee) account">NRE</abbr>/<abbr title="Non-Resident Ordinary (Rupee) account">NRO</abbr> Account Type | back-office | nre_nro_type | VARCHAR(3) | on-modify | [direct] | NRE/NRO; settlement routing rule in <abbr title="Beneficial Owner">BO</abbr> | [industry typical] |
| V-nre_nro_bank_account | NRE/NRO Bank Account | back-office | nre_nro_acct | VARCHAR(18) | on-modify | [direct] | settlement account for NRI funds payout | [industry typical] |
| V-nre_nro_ifsc | NRE/NRO <abbr title="Indian Financial System Code.">IFSC</abbr> | back-office | nre_nro_ifsc | CHAR(11) | on-modify | uppercase | <abbr title="National Electronic Funds Transfer">NEFT</abbr>/<abbr title="Real Time Gross Settlement">RTGS</abbr> routing for NRI payout | [industry typical] |
| V-nre_nro_swift_code | SWIFT Code | aml-fiu | COUNTERPARTY_SWIFT | CHAR(11) | on-event | [direct] | CBWTR mandatory for foreign-leg bank ID; required when wire >Rs 5L per Rule 3(1)(D) PMLR | <abbr title="Financial Intelligence Unit — India">FIU-IND</abbr>-CBWT-FAQ |
| V-nri_trading_route | NRI Trading Route | back-office | nri_route_cd | VARCHAR(2) | on-modify | [direct] | PI/NP; PI restricts to delivery-only (no intraday) | [industry typical] |
| V-nri_trading_route | NRI Trading Route | regulatory-reports | NRIRouteFlag | CHAR(2) | daily | [direct] | PI=<abbr title="Portfolio Investment Scheme (RBI / NRI)">PIS</abbr> / NP=Non-PIS; permitted reason-code in SA01-06 short-allocation files (NRI trades = permitted reason) | <abbr title="NSE Clearing Limited (formerly National Securities Clearing Corporation Limited)">NCL</abbr>/CMPT/55381 |
| V-nri_trading_route | NRI Trading Route | rms | nri_route | VARCHAR(2) | on-modify | [direct] | PI route hard-blocks intraday/F&O orders at pre-trade | [industry typical] |
| V-overseas_address_line1 | Overseas Address Line1 | aml-fiu | COUNTERPARTY_ADDRESS | VARCHAR(100) | on-event | [direct] | CBWTR counterparty address; required for international wire reporting | <abbr title="Financial Intelligence Unit">FIU</abbr>-IND-CBWT-FAQ |
| V-overseas_address_line1 | Overseas Address Line 1 | back-office | ovs_addr1 | VARCHAR(100) | on-modify | [direct] | NRI mandatory; <abbr title="Foreign Account Tax Compliance Act (US)">FATCA</abbr> correspondence address | [industry typical] |
| V-overseas_address_line1 | Overseas Address Line1 | fatca-crs | OVERSEAS_ADDR_L1 | VARCHAR(100) | on-event | [direct] | NRI overseas residential address; <abbr title="Common Reporting Standard">CRS</abbr> account-holder address | <abbr title="Securities and Exchange Board of India">SEBI</abbr>/<abbr title="Head Office (SEBI circular ID prefix)">HO</abbr>/<abbr title="Markets Intermediaries Regulation and Supervision Department (SEBI)">MIRSD</abbr>/SECFATF/P/CIR/2024/12 |
| V-overseas_country | Overseas Country | aml-fiu | BENEFICIARY_COUNTRY | CHAR(2) | on-event | [direct] | CBWTR direction field "P" sender / "R" receiver; reports filed separately | FIU-IND-CBWT-FAQ |
| V-overseas_country | Overseas Country | back-office | ovs_country | CHAR(2) | on-modify | [direct] | ISO code; FATCA jurisdiction lookup | [industry typical] |
| V-overseas_country | Overseas Country | fatca-crs | OVERSEAS_COUNTRY | CHAR(2) | on-event | [direct] | NRI overseas address country; mandatory CRS indicia for non-resident accounts | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| V-pis_account_number | PIS Account Number | back-office | pis_acct_no | VARCHAR(20) | on-modify | [direct] | designated AD-bank PIS account; settlement route | [industry typical] |
| V-pis_account_number | PIS Bank Account Number | contract-notes | none | none | on-trade | [direct] | NRI <abbr title="Electronic Contract Note.">ECN</abbr> routes settlements to PIS bank account; reflected in running-account ledger not on per-trade ECN | [industry typical] |
| V-pis_bank_name | PIS Bank Name | back-office | pis_bank | VARCHAR(100) | on-modify | [direct] | displayed on NRI account-statement header | [industry typical] |
| V-pis_permission_status | PIS Permission Status | back-office | pis_status_flg | CHAR(1) | on-modify | [direct] | NRI mandatory; needed to enable NRI ledger flag | [industry typical] |
| V-repatriation_status | Repatriation Status | back-office | repat_status | VARCHAR(2) | on-modify | [direct] | RP/NR; impacts ledger account-bucket | [industry typical] |
| V-repatriation_status | Repatriation Status | rms | repat_flag | VARCHAR(2) | on-modify | [direct] | drives separate margin envelope (NRE vs NRO funds) | [industry typical] |
| V-tax_residency_certificate | Tax Residency Certificate | fatca-crs | TRC_DOCUMENT | BLOB | on-event | [direct] | NRI-only; supporting document for foreign-tax-residence claim; uploaded if claiming DTAA treaty benefits | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |

## Verified through

2026-05-14

---

*AI-generated and not legal advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*

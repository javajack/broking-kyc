---
title: "Section U: Exchange Registration (UCC) — Data Flow"
description: "Where each field in Section U: Exchange Registration (UCC) flows downstream — destinations, formats, frequencies, transformations, quirks."
---

> **Why this page is structured this way:** This is the field-first view for Section U: Exchange Registration (UCC). Each row is one field-destination relationship. To see the same data from the destination's perspective, jump from the [atlas overview](/broking-kyc/reference/field-atlas/).

## TL;DR

- **17 unique fields** in this section.
- **90 field-destination relationships** total.
- Source-of-truth field definitions: [Master Dataset](/broking-kyc/reference/master-dataset/).

## Data flow table

Sorted by `field_id`, then `destination`.

| field_id | field_name | destination | destination_field_name | destination_format | frequency | transformation | quirks_notes | spec_source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| U-bse_cd_activated | BSE CD Activation Flag | bse-ucc | BSE_CD_ACTIVATED | CHAR(1) | on-event | [direct] | Y on approval for BSE Currency Derivatives | BSE/20240223-42 |
| U-bse_cd_activated | BSE CD Activation Flag | mcx-ucc | _NA_ | none | on-event | null-if-Z | BSE-specific | MCX/TECH/394/2023 |
| U-bse_cd_activated | BSE CD Activation Flag | nse-ucc | _NA_ | none | on-event | null-if-Z | BSE-specific | NSE/ISC/61817 |
| U-bse_cm_activated | BSE CM Activation Flag | bse-ucc | BSE_CM_ACTIVATED | CHAR(1) | on-event | [direct] | Y on approval for BSE Cash Market | BSE/20240223-42 |
| U-bse_cm_activated | BSE CM Activation Flag | mcx-ucc | _NA_ | none | on-event | null-if-Z | BSE-specific | MCX/TECH/394/2023 |
| U-bse_cm_activated | BSE CM Activation Flag | nse-ucc | _NA_ | none | on-event | null-if-Z | BSE-specific | NSE/ISC/61817 |
| U-bse_fno_activated | BSE F&O Activation Flag | bse-ucc | BSE_FNO_ACTIVATED | CHAR(1) | on-event | [direct] | Y on approval for BSE Equity Derivatives | BSE/20240223-42 |
| U-bse_fno_activated | BSE F&O Activation Flag | mcx-ucc | _NA_ | none | on-event | null-if-Z | BSE-specific | MCX/TECH/394/2023 |
| U-bse_fno_activated | BSE F&O Activation Flag | nse-ucc | _NA_ | none | on-event | null-if-Z | BSE-specific | NSE/ISC/61817 |
| U-bse_ucc_status | BSE UCC Status | back-office | bse_ucc_status | VARCHAR(2) | on-event | [direct] | AP unlocks BSE order routing | [industry typical] |
| U-bse_ucc_status | BSE UCC Status | bse-ucc | BSE_UCC_STATUS | CHAR(2) | on-event | [direct] | Approved/Rejected/On-Hold; post-registration name/DOB modification requires Unfreeze request with re-verification against Protean | BSE/20240223-42 |
| U-bse_ucc_status | BSE UCC Status | mcx-ucc | _NA_ | none | on-event | null-if-Z | BSE-specific | MCX/TECH/394/2023 |
| U-bse_ucc_status | BSE UCC Status | nse-ucc | _NA_ | none | on-event | null-if-Z | BSE-specific status | NSE/ISC/61817 |
| U-mcx_client_category | MCX Client Category | back-office | mcx_client_cat | VARCHAR(2) | on-modify | [direct] | HE/SP/AR; impacts commodity position limits | [industry typical] |
| U-mcx_client_category | MCX Client Category | bse-ucc | _NA_ | none | one-time | null-if-Z | MCX-specific | BSE/20240223-42 |
| U-mcx_client_category | MCX Client Category | contract-notes | ClientCategory | CHAR(2) | on-trade | [direct] | HE=Hedger / SP=Speculator / AR=Arbitrageur; appears on MCX commodity contract notes | MCXCCL/RISK/184/2025 |
| U-mcx_client_category | MCX Client Category | mcx-ucc | CLIENT_CATEGORY_COM | CHAR(2) | one-time | [direct] | Mandatory: HE=Hedger, SP=Speculator, AR=Arbitrageur, Farmer, VCP=Value Chain Participant, DFI, Foreign, Other; bulk disclosure required for COM segment | MCX/TECH/394/2023 |
| U-mcx_client_category | MCX Client Category | nse-ucc | _NA_ | none | one-time | null-if-Z | MCX-specific | NSE/ISC/61817 |
| U-mcx_client_category | MCX Client Category | regulatory-reports | ClientCategory | CHAR(2) | daily | [direct] | bulk category-disclosure file (COM segment) per UCC Master Circular Annexure | NSE/ISC/61817 |
| U-mcx_client_category | MCX Client Category | rms | mcx_category | VARCHAR(2) | on-modify | [direct] | Hedger gets higher position limits than Speculator | [industry typical] |
| U-mcx_com_activated | MCX COM Activation Flag | bse-ucc | _NA_ | none | on-event | null-if-Z | MCX-specific | BSE/20240223-42 |
| U-mcx_com_activated | MCX COM Activation Flag | mcx-ucc | MCX_COM_ACTIVATED | CHAR(1) | on-event | [direct] | Y after MCX UCC approval; commodity-trade-only exchange | MCX/TECH/394/2023 |
| U-mcx_com_activated | MCX COM Activation Flag | nse-ucc | _NA_ | none | on-event | null-if-Z | MCX-specific | NSE/ISC/61817 |
| U-mcx_error_account | MCX ERROR Account UCC | bse-ucc | _NA_ | none | one-time | null-if-Z | MCX-specific | BSE/20240223-42 |
| U-mcx_error_account | MCX ERROR Account UCC | mcx-ucc | ERROR_UCC | VARCHAR(10) | one-time | [direct] | Designated 'ERROR' UCC on member's PAN required; only square-off trades allowed; Rs.10000/day penalty for fresh trades | MCX/S&I/644/2024 |
| U-mcx_error_account | MCX ERROR Account UCC | nse-ucc | _NA_ | none | one-time | null-if-Z | MCX-specific operational requirement | NSE/ISC/61817 |
| U-mcx_ucc_status | MCX UCC Status | back-office | mcx_ucc_status | VARCHAR(2) | on-event | [direct] | AP unlocks MCX order routing | [industry typical] |
| U-mcx_ucc_status | MCX UCC Status | bse-ucc | _NA_ | none | on-event | null-if-Z | MCX-specific | BSE/20240223-42 |
| U-mcx_ucc_status | MCX UCC Status | mcx-ucc | MCX_UCC_STATUS | CHAR(2) | on-event | [direct] | Approved/Rejected/Pending; ERROR account (member PAN as client code 'ERROR') required before placing orders; penalty Rs.10000/month for missing ERROR account | MCX/S&I/644/2024 |
| U-mcx_ucc_status | MCX UCC Status | nse-ucc | _NA_ | none | on-event | null-if-Z | MCX-specific | NSE/ISC/61817 |
| U-nse_cd_activated | NSE CD Activation Flag | bse-ucc | _NA_ | none | on-event | null-if-Z | NSE-specific | BSE/20240223-42 |
| U-nse_cd_activated | NSE CD Activation Flag | mcx-ucc | _NA_ | none | on-event | null-if-Z | NSE-specific | MCX/TECH/394/2023 |
| U-nse_cd_activated | NSE CD Activation Flag | nse-ucc | NSE_CD_ACTIVATED | CHAR(1) | on-event | [direct] | Y on approval for Currency Derivatives segment | NSE/ISC/61817 |
| U-nse_cm_activated | NSE CM Activation Flag | bse-ucc | _NA_ | none | on-event | null-if-Z | NSE-specific; not on BSE UCC | BSE/20240223-42 |
| U-nse_cm_activated | NSE CM Activation Flag | mcx-ucc | _NA_ | none | on-event | null-if-Z | NSE-specific | MCX/TECH/394/2023 |
| U-nse_cm_activated | NSE CM Activation Flag | nse-ucc | NSE_CM_ACTIVATED | CHAR(1) | on-event | [direct] | Y on UCC approval for CM segment | NSE/ISC/61817 |
| U-nse_com_activated | NSE COM Activation Flag | bse-ucc | _NA_ | none | on-event | null-if-Z | NSE-specific | BSE/20240223-42 |
| U-nse_com_activated | NSE COM Activation Flag | mcx-ucc | _NA_ | none | on-event | null-if-Z | NSE-specific (MCX has its own COM activation) | MCX/TECH/394/2023 |
| U-nse_com_activated | NSE COM Activation Flag | nse-ucc | NSE_COM_ACTIVATED | CHAR(1) | on-event | [direct] | Y on approval for NSE Commodity segment (bulk category-disclosure required per master) | NSE/ISC/61817 |
| U-nse_fno_activated | NSE F&O Activation Flag | bse-ucc | _NA_ | none | on-event | null-if-Z | NSE-specific | BSE/20240223-42 |
| U-nse_fno_activated | NSE F&O Activation Flag | mcx-ucc | _NA_ | none | on-event | null-if-Z | NSE-specific | MCX/TECH/394/2023 |
| U-nse_fno_activated | NSE F&O Activation Flag | nse-ucc | NSE_FNO_ACTIVATED | CHAR(1) | on-event | [direct] | Y on UCC approval for F&O; income-proof check | NSE/ISC/61817 |
| U-nse_ucc_status | NSE UCC Status | back-office | nse_ucc_status | VARCHAR(2) | on-event | [direct] | AP/RJ/PE; AP unlocks NSE order routing | [industry typical] |
| U-nse_ucc_status | NSE UCC Status | bse-ucc | _NA_ | none | on-event | null-if-Z | NSE-specific status field | BSE/20240223-42 |
| U-nse_ucc_status | NSE UCC Status | contract-notes | none | none | on-trade | null-if-Z | trade rejected upstream if UCC not AP=Approved; not printed on ECN | NSE/ISC/61817 |
| U-nse_ucc_status | NSE UCC Status | mcx-ucc | _NA_ | none | on-event | null-if-Z | NSE-specific status field | MCX/TECH/394/2023 |
| U-nse_ucc_status | NSE UCC Status | nse-ucc | NSE_UCC_STATUS | CHAR(2) | on-event | [direct] | A=Approved, X=Mismatch/Rejected (3-param Protean failure), Active/Inactive/Closed status; 'Closed' for incomplete data clients | NSE/ISC/47869 |
| U-nse_ucc_status | NSE UCC Status | rms | nse_status | VARCHAR(2) | on-event | [direct] | non-AP blocks NSE order entry at pre-trade | [industry typical] |
| U-suspense_account | Suspense UCC (SUSPE1234N) | bse-ucc | SUSPE_UCC | VARCHAR(10) | one-time | [direct] | Cross-exchange industry requirement; back-office only | [industry typical] |
| U-suspense_account | Suspense UCC (SUSPE1234N) | mcx-ucc | SUSPE_UCC | VARCHAR(10) | one-time | [direct] | Per MCXCCL/INSP/248/2024: SUSPE1234N for unidentified client funds; must not be created in MCX UCC db; upstream funds by deadline | MCXCCL/INSP/248/2024 |
| U-suspense_account | Suspense UCC (SUSPE1234N) | nse-ucc | SUSPE_UCC | VARCHAR(10) | one-time | [direct] | Designated 'SUSPE1234N' on member PAN for unidentified credits; not created in Exchange UCC db (no orders allowed); deadline Dec 19 2024 | NSE/INSP/68566 |
| U-ucc_client_type | UCC Client Type | aml-fiu | CLIENT_TYPE | CHAR(2) | on-event | [direct] | IN/HU/NR/CO; STR uses to distinguish corporate vs individual typologies | FIU-IND-REPORTING-FORMAT-V114 |
| U-ucc_client_type | UCC Client Type | back-office | ucc_type_cd | VARCHAR(2) | on-modify | [direct] | IN/HU/NR/CO; drives charges schedule and AML segmentation | [industry typical] |
| U-ucc_client_type | UCC Client Category | bse-ucc | CLIENT_CATEGORY | CHAR(2) | one-time | [direct] | FDI and DR categories split effective Jan 11 2025; existing FDI/DR accounts must be reclassified | BSE/20250110-47 |
| U-ucc_client_type | UCC Client Category | mcx-ucc | CLIENT_CATEGORY | CHAR(2) | one-time | [direct] | MCX category set: HE/SP/AR/Farmer/VCP/DFI/Foreign/Other (commodity-specific) | MCX/TECH/394/2023 |
| U-ucc_client_type | UCC Client Category | nse-ucc | CLIENT_CATEGORY | CHAR(2) | one-time | [direct] | IN=Individual, HU=HUF, NR=NRI, CO=Corporate; FDI/DR split applies | NSE/ISC/61817 |
| U-ucc_client_type | UCC Client Type | regulatory-reports | ClientType | CHAR(2) | daily | lookup against R | IN/HU/NR/CO drives margin computation and segregation bucket in MG-12 | NSE/ISC/61817 |
| U-ucc_client_type | UCC Client Type | rms | client_type | VARCHAR(2) | on-modify | [direct] | drives institutional vs retail exposure logic | [industry typical] |
| U-ucc_code | UCC Code | aml-fiu | CLIENT_CODE | VARCHAR(10) | on-event | [direct] | TS7 brokerage STR mandatory field; intermediary-assigned client code used as transaction-side identifier | FIU-IND-REPORTING-FORMAT-V114 |
| U-ucc_code | UCC Code | back-office | ucc_code | VARCHAR(10) | one-time | uppercase | primary ledger key alongside PAN; appears on every trade record and contract note | [industry typical] |
| U-ucc_code | UCC Code | back-office | client_ledger_debit | NUMBER(15,2) | on-trade | derived from Y | per-trade ledger debit; aggregated nightly batch updates client ledger | SEBI/HO/MIRSD/POD-1/P/CIR/2025/94 |
| U-ucc_code | UCC Code | back-office | client_ledger_credit | NUMBER(15,2) | on-trade | derived from Y | per-trade ledger credit on payout receipt | SEBI/HO/MIRSD/POD-1/P/CIR/2025/94 |
| U-ucc_code | UCC Code | back-office | ledger_running_balance | NUMBER(15,2) | EOD | derived from Y | running ledger balance; basis for RAS sweep eligibility | SEBI/HO/MIRSD/POD-1/P/CIR/2023/193 |
| U-ucc_code | UCC Code | back-office | contract_note_id | VARCHAR(30) | on-trade | derived from Y | ECN ID per client per day per exchange; SHA-256 hash of trade-set signed with DSC | NSE/INSP/53115 |
| U-ucc_code | UCC Code | back-office | contract_note_format | VARCHAR(2) | on-trade | [direct] | Annexure A (CN-cum-tax-invoice) or Annexure B (separate); member's choice | NSE/INSP/53115 |
| U-ucc_code | UCC Code | back-office | contract_note_dispatch_status | VARCHAR(2) | on-event | [direct] | DI=Dispatched, FA=Failed, PE=Pending; T+24h SLA per SEBI | NSE/INSP/53115 |
| U-ucc_code | UCC Code | back-office | quarterly_stmt_dispatch_dt | DATE YYYYMMDD | on-event | derived from Y | quarterly statement dispatch date; mandatory via email per investor-servicing framework | SEBI/HO/MIRSD/POD-1/P/CIR/2025/94 |
| U-ucc_code | UCC Code | back-office | ucc_modification_log_id | VARCHAR(20) | on-modify | [direct] | modification log row per UCC change; submitted to exchange via ENIT/BEFS | [industry typical] |
| U-ucc_code | UCC Code | bse-ucc | UCC | VARCHAR(10) | one-time | [direct] | Broker-assigned; primary key in BEFS UCC submission | BSE/20240223-42 |
| U-ucc_code | Unique Client Code | contract-notes | UCC | VARCHAR(10) | on-trade | uppercase | exchange-issued client identifier; mandatory on ECN line item per exchange | NSE/ISC/61817 |
| U-ucc_code | UCC Code | dlt-comms | CLIENT_CODE_VAR | VARCHAR(10) | on-event | [direct] | printed in trade-confirm SMS to identify account; mandatory per SEBI Dec 2024 alert circular | SEBI/HO/MIRSD/POD-1/P/CIR/2025/94 |
| U-ucc_code | UCC Code | mcx-ucc | UCC | VARCHAR(10) | one-time | [direct] | Broker-assigned; up to 5000 records per file upload (per MCX/S&I/742/2024) | MCX/S&I/742/2024 |
| U-ucc_code | UCC Code | nse-ucc | UCC | VARCHAR(10) | one-time | [direct] | Broker-assigned alphanumeric code; primary key for client on NSE UCI Online | NSE/ISC/61817 |
| U-ucc_code | Unique Client Code | regulatory-reports | UCC | VARCHAR(10) | daily | uppercase | primary key in MG-12 / MG-13 / MG-18 client-margin files; designated SUSPE1234N for unidentified funds | NCL/CMPL/64088 |
| U-ucc_code | UCC for SLBM | regulatory-reports | UCC_SLBM | VARCHAR(10) | daily | uppercase | SLBS settlement-calendar circulars use UCC + member-code keying; first-leg Type L + reverse-leg Type P | NCL/CMPT/67763 |
| U-ucc_code | UCC Code | rms | ucc | VARCHAR(10) | one-time | uppercase | primary key for per-client margin envelope; SEG file uses UCC | NCL/CMPT/55381 |
| U-ucc_code | UCC Code | rms | ucc_position_key | VARCHAR(10) | on-trade | uppercase | UCC is the key for client-level position aggregation; SEG file primary key | NCL/CMPT/55381 |
| U-ucc_code | UCC Code | rms | peak_margin_1130 | NUMBER(15,2) | on-trade | derived from Y | 11:30 IST snapshot; preserves margin position for DMF reconciliation | SEBI/HO/MRD2/DCAP/CIR/P/2020/127 |
| U-ucc_code | UCC Code | rms | peak_margin_1230 | NUMBER(15,2) | on-trade | derived from Y | 12:30 IST snapshot; one of four daily peak captures | SEBI/HO/MRD2/DCAP/CIR/P/2020/127 |
| U-ucc_code | UCC Code | rms | peak_margin_1330 | NUMBER(15,2) | on-trade | derived from Y | 13:30 IST snapshot; one of four daily peak captures | SEBI/HO/MRD2/DCAP/CIR/P/2020/127 |
| U-ucc_code | UCC Code | rms | peak_margin_1430 | NUMBER(15,2) | on-trade | derived from Y | 14:30 IST snapshot; final peak of day; clearing-corp picks one at random per CC | SEBI/HO/MRD2/DCAP/CIR/P/2020/127 |
| U-ucc_code | UCC Code | rms | surveillance_otr_flag | CHAR(1) | on-trade | derived from Y | OTR breach cooling-off flag; 15-min order cooling-off next day | NSE/SURV/45016 |
| U-ucc_code | UCC Code | rms | surveillance_gsm_block_flag | CHAR(1) | on-trade | lookup against R | GSM-list scrip flag on the order; stage III/IV imposes 100% margin | NSE/SURV/74008 |
| U-ucc_code | UCC Code | rms | surveillance_asm_margin_uplift | NUMBER(5,2) | on-trade | lookup against R | ASM stage margin uplift %; applied to scrip-level orders | NSE/SURV/74008 |
| U-ucc_code | UCC Code | rms | seg_file_allocation | NUMBER(15,2) | EOD | derived from Y | SEG file (SEGCM/SEGTM) client-level allocation; SA01-SA06 reason codes on short-allocation | NCL/CMPT/55381 |
| U-ucc_code | UCC Code | rms | mg12_client_margin | NUMBER(15,2) | EOD | derived from Y | MG-12 client-level margin file row; submitted to clearing corp | NCL/CMPT/45516 |
| U-ucc_registration_date | UCC Registration Date | back-office | ucc_reg_date | DATE YYYYMMDD | one-time | formatted | audit field | [industry typical] |
| U-ucc_registration_date | UCC Registration Date | bse-ucc | UCC_REG_DT | DATE DD/MM/YYYY | one-time | formatted | BEFS registration date | BSE/20240223-42 |
| U-ucc_registration_date | UCC Registration Date | mcx-ucc | UCC_REG_DT | DATE DDMMYYYY | one-time | formatted | Registration date in MCX UCC database | MCX/TECH/394/2023 |
| U-ucc_registration_date | UCC Registration Date | nse-ucc | UCC_REG_DT | DATE DDMMYYYY | one-time | formatted | Date of initial upload to UCI Online | NSE/ISC/61817 |

## Verified through

2026-05-14

---

*AI-generated and not legal advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*

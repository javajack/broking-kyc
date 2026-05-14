---
title: "Section H: Demat Account Details — Data Flow"
description: "Where each field in Section H: Demat Account Details flows downstream — destinations, formats, frequencies, transformations, quirks."
---

> **Why this page is structured this way:** This is the field-first view for Section H: Demat Account Details. Each row is one field-destination relationship. To see the same data from the destination's perspective, jump from the [atlas overview](/broking-kyc/reference/field-atlas/).

## TL;DR

- **21 unique fields** in this section.
- **69 field-destination relationships** total.
- Source-of-truth field definitions: [Master Dataset](/broking-kyc/reference/master-dataset/).

## Data flow table

Sorted by `field_id`, then `destination`.

| field_id | field_name | destination | destination_field_name | destination_format | frequency | transformation | quirks_notes | spec_source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| H-account_status | Demat Account Status | back-office | demat_acct_status | VARCHAR(2) | on-modify | [direct] | AC/FR/CL; FR blocks new buys at OMS via RMS rule | [industry typical] |
| H-account_status | BO Account Status | cdsl-bo | ACCT_STATUS | CHAR(2) | on-event | lookup against R | Code AC=Active, FR=Frozen, CL=Closed, SU=Suspended; auto-updated on KRA validation failure (CDSL/OPS/DP/POLCY/2026/234) | CDSL/OPS/DP/POLCY/2026/234 |
| H-account_status | BO Account Status | nsdl-bo | AcctSts | CHAR(2) UDiFF | on-event | lookup against R | Status code element; updated via Client Maintenance API | NSDL/POLICY/2024/0012 |
| H-account_status | Demat Status | rms | demat_status_flag | VARCHAR(2) | on-modify | [direct] | FR/CL blocks all new buy orders in pre-trade pipeline | [industry typical] |
| H-account_type | Demat Account Type | back-office | demat_acct_type | VARCHAR(2) | on-modify | [direct] | IN/JO/MN; JO triggers joint-holder ledger logic | [industry typical] |
| H-account_type | BO Account Type | cdsl-bo | ACCT_TYPE | CHAR(2) | one-time | lookup against R | Code IN=Individual, JO=Joint, MN=Minor, HU=HUF; line 06 | CDSL/OPS/DP/POLCY/2022/115 |
| H-account_type | BO Account Type | nsdl-bo | BOAcctTp | CHAR(2) UDiFF | one-time | lookup against R | ISO-tagged element; sub-type classifications added in 2022 (NSDL/POLICY/2022/126) | NSDL/POLICY/2025/0056 |
| H-bo_id | BO ID | aml-fiu | DEMAT_ACCOUNT_ID | CHAR(16) | on-event | [direct] | depository STR mandatory for off-market transfer suspicions; CDSL 16-digit / NSDL IN+14 | FIU-IND-REPORTING-FORMAT-V114 |
| H-bo_id | BO ID | back-office | bo_id | VARCHAR(16) | one-time | concat with X | concat of DP ID + Client ID; key for holding-statement dispatch and direct-payout | SEBI/HO/MIRSD/MIRSD-PoD1/P/CIR/2024/75 |
| H-bo_id | BO ID | back-office | direct_payout_demat_target | VARCHAR(16) | on-trade | [direct] | BO ID becomes direct-payout destination per SEBI Nov 2024 mandate | SEBI/HO/MIRSD/MIRSD-PoD1/P/CIR/2024/75 |
| H-bo_id | BO ID (Demat) | bse-ucc | BO_ID | VARCHAR(16) | one-time | derived from Y | Demat freeze rule applies if KRA flags KYC invalid (BSE 20241202-5) | BSE/20241202-5 |
| H-bo_id | BO ID | cdsl-bo | BO_ID | CHAR(16) | one-time | concat with X | Concatenation DP_ID (8 digit) + CLIENT_ID (8 digit) = 16-digit numeric; line 06; primary key | CDSL/OPS/DP/SYSTM/2023/119 |
| H-bo_id | Beneficiary Owner ID | contract-notes | ClientBOID | VARCHAR(16) | on-trade | [direct] | CDSL: 16-digit numeric; NSDL: IN-prefixed 14-alphanumeric; printed on ECN for delivery trades | NSE/INSP/61999 |
| H-bo_id | BO ID | dlt-comms | BO_ID_VAR | CHAR(16) | on-event | [direct] | printed in depository SMS (off-market transfer alert, pledge alert); CDSL/NSDL prescribed templates | [industry typical] |
| H-bo_id | BO ID (Demat) | mcx-ucc | _NA_ | none | one-time | null-if-Z | Not applicable; MCX has no demat dependency for trading account | MCX/TECH/394/2023 |
| H-bo_id | BO ID | nsdl-bo | BOID | CHAR(16) UDiFF | one-time | concat with X | Format IN + 14 alphanumeric (DP ID 8 chars + Client ID 8 chars including 'IN' prefix); primary key | NSDL/POLICY/2025/0056 |
| H-bo_id | BO ID (Demat) | nse-ucc | BO_ID | VARCHAR(16) | one-time | derived from Y | Derived dp_id+client_id; required for UCC-demat validation by depositories | NSE/ISC/64984 |
| H-bo_id | Beneficiary Owner ID | regulatory-reports | BOID | VARCHAR(16) | daily | [direct] | appears in direct-payout obligation file and pledge/MTF margin reports; CM-pool keying changed by NCL Aug-2025 | NCL/CMPT/69455 |
| H-bo_id | BO ID | rms | client_bo_id | VARCHAR(16) | one-time | [direct] | primary key for pledged-collateral lookup; CSMFA/CUSPA mapping | NCL/CMPT/63669 |
| H-bo_status_code | BO Status Code | cdsl-bo | BO_STATUS_CODE | CHAR(2) | one-time | lookup against R | 2-char primary status code (Resident, NRI, FN, etc.) different from sub-status; line 02 | CDSL/OPS/DP/SYSTM/2023/119 |
| H-bo_status_code | BO Status Code | nsdl-bo | BOStsCd | CHAR(2) UDiFF | one-time | lookup against R | Primary BO status code element | NSDL/POLICY/2025/0056 |
| H-bsda_flag | BSDA Flag | back-office | bsda_flg | CHAR(1) | on-modify | [direct] | Basic Services Demat flag; reduces AMC charge in BO billing | [industry typical] |
| H-bsda_flag | BSDA Flag | cdsl-bo | BSDA_FLAG | CHAR(1) | one-time | [direct] | Y/N; line 06; default Y at opening per CDSL practice; opt-out by email consent | CDSL/OPS/DP/POLCY/2024/208 |
| H-bsda_flag | BSDA Flag | nsdl-bo | BSDAFlg | CHAR(1) UDiFF | one-time | [direct] | Default Y; opt-out requires email-consent date capture per V2.0.0.0 | NSDL/POLICY/2024/0122 |
| H-bsda_optout_consent_date | BSDA Opt-Out Consent Date | cdsl-bo | BSDA_OPTOUT_DATE | CHAR(8) | one-time | formatted | YYYYMMDD if BSDA opt-out; required by V2.0.0.0; CDSL aligns to NSDL convention | CDSL/OPS/DP/POLCY/2024/208 |
| H-bsda_optout_consent_date | BSDA Opt-Out Consent Date | nsdl-bo | BSDAOptOutCnsntDt | ISODate (YYYY-MM-DD) | one-time | formatted | Date of email consent for BSDA Opt-out; required per V2.0.0.0 (Apr 4, 2025) | NSDL/POLICY/2025/0042 |
| H-client_id | Client ID | back-office | client_id_demat | VARCHAR(8) | one-time | [direct] | 8-digit; concatenated with DP ID for BO ID | [industry typical] |
| H-client_id | Demat Client ID | bse-ucc | DEMAT_CLIENT_ID | CHAR(8) | one-time | [direct] | Mandatory in UCC batch upload (along with name/PAN match) | BSE/20231018-39 |
| H-client_id | Client ID | cdsl-bo | CLIENT_ID | CHAR(8) | one-time | [direct] | 8-digit numeric assigned by DP within their range; line 06 positional | CDSL/OPS/DP/SYSTM/2023/119 |
| H-client_id | Demat Client ID | mcx-ucc | _NA_ | none | one-time | null-if-Z | Not part of MCX UCC; commodity delivery uses Warehouse Receipts (eWHR) | MCX/TECH/394/2023 |
| H-client_id | Client ID | nsdl-bo | ClntId | CHAR(8) UDiFF | one-time | [direct] | 8-digit alphanumeric within NSDL DP range | NSDL/POLICY/2025/0056 |
| H-client_id | Demat Client ID | nse-ucc | DEMAT_CLIENT_ID | CHAR(8) | one-time | [direct] | Part of UCC-demat mapping bundle | NSE/ISC/64984 |
| H-cusps_account_flag | CUSPA Indicator | cdsl-bo | CUSPA_FLAG | CHAR(1) | one-time | [direct] | Y/N for Client Unpaid Securities Pledgee Account | CDSL/OPS/DP/SYSTM/2023/119 |
| H-cusps_account_flag | CUSPA Indicator | nsdl-bo | CUSPAFlg | CHAR(1) UDiFF | one-time | [direct] | CUSPA flag element | NSDL/POLICY/2023/0113 |
| H-depository | Depository | back-office | depository_cd | VARCHAR(4) | one-time | [direct] | CDSL/NSDL; drives direct-payout routing and CUSPA mapping | SEBI/HO/MIRSD/MIRSD-PoD1/P/CIR/2024/75 |
| H-depository | Depository | back-office | cuspa_account_route_cd | VARCHAR(8) | on-trade | lookup against R | TM CUSPA / CM CUSPA mapping depending on depository and clearing arrangement | NCL/CMPT/63669 |
| H-depository | Depository | cdsl-bo | DEPOSITORY | CHAR(4) | one-time | [direct] | Hardcoded 'CDSL' in line 06 header | CDSL/OPS/DP/SYSTM/2023/119 |
| H-depository | Depository | nsdl-bo | DpstryNm | CHAR(4) UDiFF | one-time | [direct] | Hardcoded 'NSDL' element; UDiFF V2.0.0.0 | NSDL/POLICY/2025/0042 |
| H-depository | Depository | rms | depository_for_pledge | VARCHAR(4) | one-time | [direct] | drives margin-pledge file format (CDSL vs NSDL) | [industry typical] |
| H-dp_id | DP ID | back-office | dp_id | VARCHAR(8) | one-time | [direct] | CDSL 8-digit, NSDL IN+6; key for ledger demat-link | [industry typical] |
| H-dp_id | DP ID | bse-ucc | DP_ID | CHAR(8) | one-time | [direct] | Up to 5 demat accounts; required for direct-payout-to-demat regime | BSE/20250110-47 |
| H-dp_id | DP ID | cdsl-bo | DP_ID | CHAR(8) | one-time | [direct] | 8-digit numeric assigned by CDSL; first segment of BO ID; line 06 | CDSL/OPS/DP/SYSTM/2023/119 |
| H-dp_id | DP ID | dlt-comms | DP_ID_VAR | CHAR(8) | on-event | [direct] | printed in depository transactional templates to locate DP | [industry typical] |
| H-dp_id | DP ID | mcx-ucc | _NA_ | none | one-time | null-if-Z | Demat not required for MCX (cash-settled / warehouse-receipts via ComRIS for delivery) | MCX/TECH/394/2023 |
| H-dp_id | DP ID | nsdl-bo | DPID | CHAR(8) UDiFF | one-time | formatted | NSDL format 'IN' + 6 digits (e.g. IN300123); ISO-tagged | NSDL/POLICY/2025/0056 |
| H-dp_id | DP ID | nse-ucc | DP_ID | CHAR(8) | one-time | [direct] | Required for UCC-demat mapping per direct-payout regime (NSE/ISC/64984) | NSE/ISC/64984 |
| H-dp_id | Depository Participant ID | regulatory-reports | DPID | CHAR(8) | daily | [direct] | CDSL: 8 digits; NSDL: IN+6 digits; required for direct payout to client demat (Phase-2 from settlement 2425828) | NCL/CMPT/66779 |
| H-dp_name | DP Name | back-office | dp_name | VARCHAR(100) | one-time | [direct] | appears on demat holding statement header | [industry typical] |
| H-holding_type | Holding Pattern | cdsl-bo | HOLDING_PATTERN | CHAR(2) | one-time | lookup against R | SI=Single, J2=Joint(2), J3=Joint(3); line 06; second/third holder triggers replication of line 01-02 | CDSL/OPS/DP/SYSTM/2023/119 |
| H-holding_type | Holding Pattern | nsdl-bo | HldgPttrn | CHAR(2) UDiFF | one-time | lookup against R | Holding pattern code; joint accounts use HldrInf repeating block | NSDL/POLICY/2025/0056 |
| H-ifsc_branch | First Holder IFSC | cdsl-bo | FIRST_HOLDER_IFSC | CHAR(11) | on-modify | uppercase | Bank IFSC linked at BO level for payouts; same as G-ifsc_code | CDSL/OPS/DP/SYSTM/2023/119 |
| H-ifsc_branch | First Holder IFSC | nsdl-bo | FrstHldrIFSC | CHAR(11) UDiFF | on-modify | uppercase | Linked IFSC element | NSDL/POLICY/2024/0041 |
| H-income_range | Income Range | cdsl-bo | INCOME_RANGE | CHAR(2) | one-time | lookup against R | Income range code 01-06; mandatory per CDSL POLCY/2021/152 | CDSL/OPS/DP/POLCY/2021/152 |
| H-income_range | Income Range | nsdl-bo | GrssIncmRng | CHAR(2) UDiFF | one-time | lookup against R | Income range code element; mandatory | NSDL/POLICY/2025/0056 |
| H-lei_number | Legal Entity Identifier | cdsl-bo | LEI_NUMBER | CHAR(20) | on-modify | uppercase | 20-char LEI for non-individual; freeze reason 30 on expiry per CDSL/OPS/DP/POLCY/2024/51 | CDSL/OPS/DP/POLCY/2024/51 |
| H-lei_number | Legal Entity Identifier | nsdl-bo | LEI | CHAR(20) UDiFF | on-modify | uppercase | LEI element for non-individual entities; ISO 17442 format | NSDL/POLICY/2025/0056 |
| H-occupation | Occupation | cdsl-bo | OCCUPATION_CODE | CHAR(2) | one-time | lookup against R | Occupation code 01-11/99; mandatory line 06; harmonized with KRA | CDSL/OPS/DP/POLCY/2021/152 |
| H-occupation | Occupation | nsdl-bo | OccptnCd | CHAR(2) UDiFF | one-time | lookup against R | Occupation code element | NSDL/POLICY/2025/0056 |
| H-opening_date | Demat Opening Date | back-office | demat_open_dt | DATE YYYYMMDD | one-time | formatted | needed for KYC audit trail | [industry typical] |
| H-opening_date | BO Account Opening Date | cdsl-bo | OPENING_DATE | CHAR(8) | one-time | formatted | YYYYMMDD format in line 06; right-aligned | CDSL/OPS/DP/SYSTM/2023/119 |
| H-opening_date | BO Account Opening Date | nsdl-bo | OpngDt | ISODate (YYYY-MM-DD) | one-time | formatted | ISO 8601 date element | NSDL/POLICY/2024/0041 |
| H-operation_mode | Operation Mode | cdsl-bo | OPERATION_MODE | CHAR(2) | one-time | lookup against R | Code ES=Either or Survivor, AS=Anyone or Survivor, JO=Jointly; mandatory for joint | CDSL/OPS/DP/SYSTM/2023/119 |
| H-operation_mode | Operation Mode | nsdl-bo | OprtnMd | CHAR(2) UDiFF | one-time | lookup against R | Operation mode element | NSDL/POLICY/2025/0056 |
| H-pms_manager_flag | PMS Manager Indicator | cdsl-bo | PMS_MGR_FLAG | CHAR(1) | one-time | [direct] | Purpose code 23 in BO setup if PMS sub-type per CDSL/OPS/DP/SYSTM/2023/280 | CDSL/OPS/DP/SYSTM/2023/280 |
| H-pms_manager_flag | PMS Manager Indicator | nsdl-bo | PMSMgrFlg | CHAR(1) UDiFF | one-time | [direct] | PMS manager element in sub-type block | NSDL/POLICY/2025/0056 |
| H-purpose_code | BO Purpose Code | cdsl-bo | BO_PURPOSE_CODE | CHAR(2) | one-time | lookup against R | CDSL purpose code; 23 for PMS, others per CDSL/OPS/DP/SYSTM/2023/280 | CDSL/OPS/DP/SYSTM/2023/280 |
| H-purpose_code | BO Purpose Code | nsdl-bo | BOPrpCd | CHAR(2) UDiFF | one-time | lookup against R | Purpose code element | NSDL/POLICY/2025/0056 |
| H-ucc_code | UCC Mapping | cdsl-bo | UCC_CODE | CHAR(10) | on-modify | [direct] | UCC mapped at BO level per CDSL/OPS/DP/POLCY/2020/141; line 06 | CDSL/OPS/DP/POLCY/2020/141 |
| H-ucc_code | UCC Mapping | nsdl-bo | UCCMpng | VARCHAR(10) UDiFF | on-modify | [direct] | Exchange-provided UCC mapped via Client Maintenance API | NSDL/POLICY/2024/0012 |

## Verified through

2026-05-14

---

*AI-generated and not legal advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*

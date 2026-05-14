---
title: "Section O: DDPI Authorization — Data Flow"
description: "Where each field in Section O: DDPI Authorization flows downstream — destinations, formats, frequencies, transformations, quirks."
---

> **Why this page is structured this way:** This is the field-first view for Section O: <abbr title="Demat Debit and Pledge Instruction">DDPI</abbr> Authorization. Each row is one field-destination relationship. To see the same data from the destination's perspective, jump from the [atlas overview](/broking-kyc/reference/field-atlas/).

## TL;DR

- **10 unique fields** in this section.
- **30 field-destination relationships** total.
- Source-of-truth field definitions: [Master Dataset](/broking-kyc/reference/master-dataset/).

## Data flow table

Sorted by `field_id`, then `destination`.

| field_id | field_name | destination | destination_field_name | destination_format | frequency | transformation | quirks_notes | spec_source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| O-ddpi_authorization_date | DDPI Authorization Date | cdsl-bo | DDPI_AUTH_DATE | CHAR(8) | on-event | formatted | YYYYMMDD; <abbr title="Central Depository Services (India) Limited">CDSL</abbr> captures DDPI registration date per UDiFF-aligned format per CDSL/OPS/<abbr title="Depository Participant">DP</abbr>/SYSTM/2023/43 | CDSL/OPS/DP/SYSTM/2023/43 |
| O-ddpi_authorization_date | DDPI Authorization Date | nsdl-bo | DDPIRegnDt | ISODate (YYYY-MM-DD) | on-event | formatted | ISO 8601; <abbr title="National Securities Depository Limited">NSDL</abbr> capture in UDiFF format only since Sep 27, 2024 deadline | NSDL/POLICY/2024/0086 |
| O-ddpi_bo_id | DDPI <abbr title="Beneficial Owner">BO</abbr> ID | back-office | ddpi_bo_id | VARCHAR(16) | on-modify | [direct] | BO ID for which DDPI applies | <abbr title="Securities and Exchange Board of India">SEBI</abbr>/<abbr title="Head Office (SEBI circular ID prefix)">HO</abbr>/<abbr title="Markets Intermediaries Regulation and Supervision Department (SEBI)">MIRSD</abbr>/DoP/P/CIR/2022/44 |
| O-ddpi_bo_id | DDPI BO ID | cdsl-bo | DDPI_BOID | CHAR(16) | on-event | [direct] | Same as H-bo_id; rebooted to DDPI Master table; CDSL Daiwa Active System (CDAS) linkage | CDSL/OPS/DP/SYSTM/2023/43 |
| O-ddpi_bo_id | DDPI BO ID | nsdl-bo | DDPIBOID | CHAR(16) UDiFF | on-event | [direct] | Same as H-bo_id (IN+14 alphanumeric); SPEED-e linkage | NSDL/POLICY/2024/0086 |
| O-ddpi_deregistration_date | DDPI Deregistration Date | cdsl-bo | DDPI_DEREG_DATE | CHAR(8) | on-event | formatted | YYYYMMDD; populated on de-registration; NULL means active | CDSL/OPS/DP/SYSTM/2023/43 |
| O-ddpi_deregistration_date | DDPI Deregistration Date | nsdl-bo | DDPIDeRegnDt | ISODate (YYYY-MM-DD) | on-event | formatted | ISO 8601; UDiFF only since Sep 27, 2024 | NSDL/POLICY/2024/0086 |
| O-ddpi_dp_id | DDPI DP ID | cdsl-bo | DDPI_DPID | CHAR(8) | on-event | [direct] | 8-digit DP ID; same as H-dp_id | CDSL/OPS/DP/SYSTM/2023/43 |
| O-ddpi_dp_id | DDPI DP ID | nsdl-bo | DDPIDPID | CHAR(8) UDiFF | on-event | [direct] | IN+6 digits | NSDL/POLICY/2024/0086 |
| O-ddpi_for_mutual_fund | DDPI for MF | back-office | ddpi_mf_flg | CHAR(1) | on-modify | [direct] | MF transactions enabled | SEBI/HO/MIRSD/DoP/P/CIR/2022/44 |
| O-ddpi_for_mutual_fund | DDPI for Mutual Fund | cdsl-bo | DDPI_PURPOSE_MF | CHAR(1) | on-event | [direct] | Y/N; MF transaction authorization | CDSL/OPS/DP/POLCY/2022/194 |
| O-ddpi_for_mutual_fund | DDPI for Mutual Fund | nsdl-bo | DDPIMFFlg | CHAR(1) UDiFF | on-event | [direct] | Y/N flag | NSDL/POLICY/2022/0052 |
| O-ddpi_for_pledge | DDPI for Pledge | back-office | ddpi_pledge_flg | CHAR(1) | on-modify | [direct] | pledge/re-pledge for margins enabled | SEBI/HO/MIRSD/DoP/P/CIR/2022/44 |
| O-ddpi_for_pledge | DDPI for Pledge | cdsl-bo | DDPI_PURPOSE_PLEDGE | CHAR(1) | on-event | [direct] | Y/N; pledging/re-pledging for margins | CDSL/OPS/DP/POLCY/2022/194 |
| O-ddpi_for_pledge | DDPI for Pledge | nsdl-bo | DDPIPldgFlg | CHAR(1) UDiFF | on-event | [direct] | Y/N; pledge/re-pledge flag | NSDL/POLICY/2022/0052 |
| O-ddpi_for_pledge | DDPI Pledge Authorization | regulatory-reports | PledgeAuthFlag | CHAR(1) | daily | [direct] | drives whether margin pledge can be auto-executed; reported in MG-18 / AMG18 client-collateral file | <abbr title="NSE Clearing Limited (formerly National Securities Clearing Corporation Limited)">NCL</abbr>/CMPT/56502 |
| O-ddpi_for_settlement | DDPI for Settlement | back-office | ddpi_settle_flg | CHAR(1) | on-modify | [direct] | transfer securities for settlement enabled | SEBI/HO/MIRSD/DoP/P/CIR/2022/44 |
| O-ddpi_for_settlement | DDPI for Settlement | cdsl-bo | DDPI_PURPOSE_SETTLE | CHAR(1) | on-event | [direct] | Y/N; first of 4 purpose flags per SEBI DDPI circular SEBI/HO/MIRSD/DoP/P/CIR/2022/44 | CDSL/OPS/DP/POLCY/2022/194 |
| O-ddpi_for_settlement | DDPI for Settlement | nsdl-bo | DDPISettleFlg | CHAR(1) UDiFF | on-event | [direct] | Y/N; transfer for stock-exchange deliveries/settlement | NSDL/POLICY/2022/0052 |
| O-ddpi_for_tendering | DDPI for Tendering | back-office | ddpi_tender_flg | CHAR(1) | on-modify | [direct] | tendering shares in open offers/buybacks enabled | SEBI/HO/MIRSD/DoP/P/CIR/2022/44 |
| O-ddpi_for_tendering | DDPI for Tendering | cdsl-bo | DDPI_PURPOSE_TENDER | CHAR(1) | on-event | [direct] | Y/N; tendering in open offers/buybacks | CDSL/OPS/DP/POLCY/2022/194 |
| O-ddpi_for_tendering | DDPI for Tendering | nsdl-bo | DDPITndrFlg | CHAR(1) UDiFF | on-event | [direct] | Y/N flag | NSDL/POLICY/2022/0052 |
| O-ddpi_opted | DDPI Opted | back-office | ddpi_opted_flg | CHAR(1) | on-modify | [direct] | Y/N; cannot be denied service if N (regulatory) | SEBI/HO/MIRSD/DoP/P/CIR/2022/44 |
| O-ddpi_opted | DDPI Opted | cdsl-bo | DDPI_FLAG | CHAR(1) | on-event | [direct] | Y/N flag; CDSL DDPI activation 24-hour SLA post-DP receiving signed DDPI form per CDSL/OPS/DP/SYSTM/2022/332; optional - cannot refuse service | CDSL/OPS/DP/SYSTM/2022/332 |
| O-ddpi_opted | DDPI Opted Flag | contract-notes | DDPIRef | CHAR(1) | on-trade | [direct] | DDPI status indicator on <abbr title="Electronic Contract Note.">ECN</abbr>; if N, client must authorise each debit via depository TPIN | SEBI/HO/MIRSD/DoP/P/CIR/2022/44 |
| O-ddpi_opted | DDPI Opted | dlt-comms | DDPI_FLAG | CHAR(1) | on-event | [direct] | if Y, depository fires "debit authorized via DDPI" <abbr title="Short Message Service.">SMS</abbr> on each pay-in; if N, manual CDAS/SPEED-e SMS issued | SEBI/HO/MIRSD/POD-1/P/CIR/2025/94 |
| O-ddpi_opted | DDPI Opted | nsdl-bo | DDPIFlg | CHAR(1) UDiFF | on-event | [direct] | Y/N flag; NSDL DDPI registration offline-paper-based with 2-3 day activation; UDiFF format only since Sep 27, 2024 | NSDL/POLICY/2024/0086 |
| O-ddpi_scope | DDPI Scope | back-office | ddpi_scope_cd | VARCHAR(2) | on-modify | [direct] | AL/SP; drives auto-debit eligibility flag | SEBI/HO/MIRSD/DoP/P/CIR/2022/44 |
| O-ddpi_scope | DDPI Scope | cdsl-bo | DDPI_SCOPE | CHAR(2) | on-event | [direct] | AL=All transactions, SP=Specific; line in DDPI Master file | CDSL/OPS/DP/SYSTM/2023/43 |
| O-ddpi_scope | DDPI Scope | nsdl-bo | DDPIScp | CHAR(2) UDiFF | on-event | [direct] | Scope code element | NSDL/POLICY/2024/0086 |

## Verified through

2026-05-14

---

*AI-generated and not legal advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*

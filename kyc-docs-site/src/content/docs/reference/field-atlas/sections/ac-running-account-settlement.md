---
title: "Section AC: Running Account Settlement — Data Flow"
description: "Where each field in Section AC: Running Account Settlement flows downstream — destinations, formats, frequencies, transformations, quirks."
---

> **Why this page is structured this way:** This is the field-first view for Section AC: Running Account Settlement. Each row is one field-destination relationship. To see the same data from the destination's perspective, jump from the [atlas overview](/broking-kyc/reference/field-atlas/).

## TL;DR

- **8 unique fields** in this section.
- **11 field-destination relationships** total.
- Source-of-truth field definitions: [Master Dataset](/broking-kyc/reference/master-dataset/).

## Data flow table

Sorted by `field_id`, then `destination`.

| field_id | field_name | destination | destination_field_name | destination_format | frequency | transformation | quirks_notes | spec_source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| AC-ras_authorized | RAS Authorized | back-office | ras_auth | CHAR(1) | on-modify | [direct] | client authorization for running-account retention | SEBI/HO/MIRSD/POD-1/P/CIR/2023/193 |
| AC-ras_auto_settlement_trigger_days | RAS Auto-Settlement Trigger Days | back-office | ras_trigger_days | NUMBER(3) | on-modify | [direct] | default 30 days inactive; overrides cycle for non-traded clients | SEBI/HO/MIRSD/MIRSD-PoD/P/CIR/2025/04 |
| AC-ras_last_settlement_date | RAS Last Settlement Date | back-office | ras_last_dt | DATE YYYYMMDD | on-event | formatted | most recent sweep date | SEBI/HO/MIRSD/POD-1/P/CIR/2023/193 |
| AC-ras_last_transaction_date | RAS Last Transaction Date | back-office | ras_last_txn_dt | DATE YYYYMMDD | EOD | derived from Y | last trade/charge date; resets 30-day timer | SEBI/HO/MIRSD/MIRSD-PoD/P/CIR/2025/04 |
| AC-ras_last_transaction_date | Last Transaction Date | regulatory-reports | LastTradeDate | DATE YYYYMMDD | daily | [direct] | drives 30-day-inactive auto-settlement trigger per Jan-2025 SEBI circular | SEBI/HO/MIRSD/MIRSD-PoD1/P/CIR/2025/1 |
| AC-ras_next_settlement_date | RAS Next Settlement Date | back-office | ras_next_dt | DATE YYYYMMDD | EOD | derived from Y | auto-calc next sweep date based on chosen cycle | SEBI/HO/MIRSD/POD-1/P/CIR/2023/193 |
| AC-ras_optin_date | RAS Opt-In Date | back-office | ras_optin_dt | DATE YYYYMMDD | one-time | formatted | audit for client-driven cycle choice | SEBI/HO/MIRSD/POD-1/P/CIR/2023/193 |
| AC-ras_settlement_bank_account | RAS Settlement Bank Account | back-office | ras_bank_acct | VARCHAR(18) | on-modify | [direct] | primary bank account for fund return; matches G-account_number where is_primary=Y | SEBI/HO/MIRSD/POD-1/P/CIR/2023/193 |
| AC-ras_settlement_bank_account | Running Account Settlement Bank | regulatory-reports | RABankAccount | VARCHAR(18) | on-event | [direct] | fund-return target on running-account settlement run; weekly cadence | SEBI/HO/MIRSD/MIRSD-PoD1/P/CIR/2025/1 |
| AC-ras_settlement_frequency | RAS Settlement Frequency | back-office | ras_freq | VARCHAR(2) | on-modify | [direct] | MN/QR; drives sweep-out schedule | SEBI/HO/MIRSD/POD-1/P/CIR/2023/193 |
| AC-ras_settlement_frequency | Running Account Settlement Frequency | contract-notes | RAFrequency | CHAR(2) | on-trade | [direct] | MN=Monthly / QR=Quarterly; printed in ECN footer block; aligned to exchange-stipulated Friday/Saturday dates | SEBI/HO/MIRSD/MIRSD-PoD1/P/CIR/2023/197 |

## Verified through

2026-05-14

---

*AI-generated and not legal advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*

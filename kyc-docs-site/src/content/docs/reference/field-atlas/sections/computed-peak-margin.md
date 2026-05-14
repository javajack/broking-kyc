---
title: "Computed / Derived — peak-margin — Data Flow"
description: "Where each field in Computed / Derived — peak-margin flows downstream — destinations, formats, frequencies, transformations, quirks."
---

> **Why this page is structured this way:** This is the field-first view for the computed/derived `[peak-margin]` pseudo-section. These fields don't exist at KYC onboarding time; they're produced by operations (trade execution, margin computation, settlement files, etc.). To see the same data from the destination's perspective, jump from the [atlas overview](/broking-kyc/reference/field-atlas/).

## TL;DR

- **6 unique fields** in this section.
- **6 field-destination relationships** total.

## Data flow table

Sorted by `field_id`, then `destination`.

| field_id | field_name | destination | destination_field_name | destination_format | frequency | transformation | quirks_notes | spec_source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| pm-collateral_value | Collateral Value at Snapshot | regulatory-reports | CollateralValue | NUMBER(15,2) | daily | derived from Y | allocated + re-pledged after prudential haircut excluding 50:50 rule; checked across NCL segments + other CCs | NCL/CMPT/55381 |
| pm-peak_margin_requirement | Peak Margin Requirement | regulatory-reports | PeakMarginReq | NUMBER(15,2) | daily | derived from Y | max of 4 intraday snapshots per client; included in client-margin reporting file to TM/CM | MCXCCL/RISK/184/2025 |
| pm-short_allocation_amount | Short Allocation Amount | regulatory-reports | ShortAllocation | NUMBER(15,2) | daily | derived from Y | min upfront margin less collateral value; penalty if not justified by permitted reason code | NCL/CMPT/55381 |
| pm-short_allocation_reason_code | Short Allocation Reason Code | regulatory-reports | ReasonCode | CHAR(2) | daily | [direct] | 5 permitted codes: excess at other CC, EPI of securities, wrong-client trades, NRI trades, late allocation acceptance | NCL/CMPT/55381 |
| pm-snapshot_seq | Snapshot Sequence | regulatory-reports | SnapshotSeq | CHAR(4) | daily | [direct] | SA01/02/03 = intraday at snapshot; SA04/05/06 = EOD/max; nomenclature per NCL/CMPT/55381 | NCL/CMPT/55381 |
| pm-snapshot_time | Snapshot Timestamp | regulatory-reports | SnapshotTime | TIMESTAMP HHMMSS | daily | formatted | CC takes 4 random snapshots in 11:00-11:30 / 12:30-13:00 / 13:30-14:00 / 14:30-15:00 windows | MCXCCL/RISK/184/2025 |

## Verified through

2026-05-14

---

*AI-generated and not legal advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*

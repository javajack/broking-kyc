---
title: "Computed / Derived — settlement — Data Flow"
description: "Where each field in Computed / Derived — settlement flows downstream — destinations, formats, frequencies, transformations, quirks."
---

> **Why this page is structured this way:** This is the field-first view for the computed/derived `[settlement]` pseudo-section. These fields don't exist at KYC onboarding time; they're produced by operations (trade execution, margin computation, settlement files, etc.). To see the same data from the destination's perspective, jump from the [atlas overview](/broking-kyc/reference/field-atlas/).

## TL;DR

- **4 unique fields** in this section.
- **4 field-destination relationships** total.

## Data flow table

Sorted by `field_id`, then `destination`.

| field_id | field_name | destination | destination_field_name | destination_format | frequency | transformation | quirks_notes | spec_source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| sett-auction_difference | Auction Difference | regulatory-reports | AuctionDiff | NUMBER(15,2) | on-event | derived from Y | collected from short-delivering member when auction rate exceeds settlement price; auction T+2 | NCL/CMPT/71441 |
| sett-internal_shortage_valuation | Internal Shortage Valuation | regulatory-reports | InternalShortageVal | NUMBER(15,2) | on-event | derived from Y | valuation at settlement price + 20% mark; payment due by noon on settlement day | NCL/CMPT/66779 |
| sett-pay_in_obligation | Pay-in Obligation | regulatory-reports | PayInObligation | NUMBER(15,2) | daily | derived from Y | client-level pay-in obligation in CC obligation file; gross pay-in to CC required for direct payout | NCL/CMPT/66779 |
| sett-pay_out_amount | Pay-out Amount | regulatory-reports | PayoutAmount | NUMBER(15,2) | daily | derived from Y | securities direct-credited to client demat by CC (CDSL) or earmarked (NSDL); not via broker pool | NCL/CMPT/63669 |

## Verified through

2026-05-14

---

*AI-generated and not legal advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*

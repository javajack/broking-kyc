---
title: Field-level Data Flow Atlas
description: "Bidirectional mapping of every KYC field to its downstream destinations — KRA, CKYC, exchange UCC, depository BO, back-office, RMS, contract notes, regulatory reports, DLT comms, FATCA/CRS, AML/FIU. Browse by section (field-first view) or by destination (system-first view). Includes downloadable master CSV."
---

> **Why this page is structured this way:** Two views on the same dataset. Engineers building an integration with a specific destination land here, scan the destination sub-pages, and pull the master CSV for programmatic use. Product / compliance readers scan the per-section sub-pages to see where each onboarded field ends up.

## TL;DR

- **1314 field-destination relationships** mapped across 38 sections and 14 destination systems.
- **999 rows (76.0%)** cite a public regulatory or vendor specification source.
- **315** rows are tagged `[industry typical]` where no public spec was reachable — verify with vendor before acting.
- **Downloadable CSV:** [field-atlas-master.csv](/broking-kyc/field-atlas-master.csv) (all rows, all columns, quoted-CSV).
- AI-generated synthesis; verify each row against the cited circular or vendor doc before implementation.

## Conceptual overview

Every field captured during onboarding (or generated during operations) ends up in multiple downstream systems with potentially different field names, formats, lengths, and update frequencies. This atlas maps those flows explicitly. The per-section view (below) groups by where the field is captured; the per-destination view groups by where it is consumed. The [Master Dataset](/broking-kyc/reference/master-dataset/) is the canonical source for field definitions; this atlas adds the downstream picture.

Some rows use **bracket pseudo-sections** like `[trade]`, `[margin]`, `[dmf]` for fields that are computed or generated at operations time (not captured during onboarding) and therefore have no home in the KYC-oriented master-dataset's A–AC sections.

## Browse by section (field-first)

Sections A through AC follow the [Master Dataset](/broking-kyc/reference/master-dataset/) order. Bracket pseudo-sections (`[trade]`, `[margin]`, etc.) for computed/derived fields appear after the lettered sections.

| Section | Field-destination rows | Page |
| --- | --- | --- |
| A | 219 | [A](./field-atlas/sections/a-personal-identity/) |
| B | 138 | [B](./field-atlas/sections/b-address-details/) |
| C | 81 | [C](./field-atlas/sections/c-contact-details/) |
| D | 21 | [D](./field-atlas/sections/d-identity-documents/) |
| E | 20 | [E](./field-atlas/sections/e-address-documents/) |
| F | 56 | [F](./field-atlas/sections/f-financial-profile/) |
| G | 83 | [G](./field-atlas/sections/g-bank-account/) |
| H | 69 | [H](./field-atlas/sections/h-demat-account/) |
| I | 58 | [I](./field-atlas/sections/i-nomination/) |
| J | 46 | [J](./field-atlas/sections/j-fatca-crs/) |
| K | 32 | [K](./field-atlas/sections/k-pep-aml/) |
| L | 76 | [L](./field-atlas/sections/l-trading-preferences/) |
| M | 10 | [M](./field-atlas/sections/m-risk-profiling/) |
| N | 7 | [N](./field-atlas/sections/n-ipv-vipv/) |
| O | 30 | [O](./field-atlas/sections/o-ddpi/) |
| P | 24 | [P](./field-atlas/sections/p-consent-declarations/) |
| R | 2 | [R](./field-atlas/sections/r-third-party-verification/) |
| S | 16 | [S](./field-atlas/sections/s-kra-submission/) |
| T | 12 | [T](./field-atlas/sections/t-ckyc-submission/) |
| U | 90 | [U](./field-atlas/sections/u-exchange-registration/) |
| V | 20 | [V](./field-atlas/sections/v-nri-specific/) |
| W | 12 | [W](./field-atlas/sections/w-minor-joint/) |
| X | 20 | [X](./field-atlas/sections/x-margin-pledge/) |
| Y | 25 | [Y](./field-atlas/sections/y-account-lifecycle/) |
| Z | 19 | [Z](./field-atlas/sections/z-audit-trail/) |
| AA | 13 | [AA](./field-atlas/sections/aa-dpdp-consent/) |
| AB | 17 | [AB](./field-atlas/sections/ab-communication-preferences/) |
| AC | 11 | [AC](./field-atlas/sections/ac-running-account-settlement/) |
| [cfr] | 7 | [[cfr]](./field-atlas/sections/computed-cfr/) |
| [dmf] | 8 | [[dmf]](./field-atlas/sections/computed-dmf/) |
| [ecn-meta] | 14 | [[ecn-meta]](./field-atlas/sections/computed-ecn-meta/) |
| [ecn-tax] | 5 | [[ecn-tax]](./field-atlas/sections/computed-ecn-tax/) |
| [margin] | 10 | [[margin]](./field-atlas/sections/computed-margin/) |
| [peak-margin] | 6 | [[peak-margin]](./field-atlas/sections/computed-peak-margin/) |
| [reporting] | 4 | [[reporting]](./field-atlas/sections/computed-reporting/) |
| [settlement] | 4 | [[settlement]](./field-atlas/sections/computed-settlement/) |
| [surveillance] | 2 | [[surveillance]](./field-atlas/sections/computed-surveillance/) |
| [trade] | 27 | [[trade]](./field-atlas/sections/computed-trade/) |

## Browse by destination (system-first)

Each destination's page shows the fields it consumes with format / frequency / quirks per row.

| Destination | Field-destination rows | Page |
| --- | --- | --- |
| Back-office (vendor-neutral) | 260 | [back-office](./field-atlas/destinations/back-office/) |
| KRA (Identity Registry) | 124 | [kra](./field-atlas/destinations/kra/) |
| CKYC (Central KYC Registry) | 122 | [ckyc](./field-atlas/destinations/ckyc/) |
| CDSL BO Opening | 108 | [cdsl-bo](./field-atlas/destinations/cdsl-bo/) |
| NSDL BO Opening | 108 | [nsdl-bo](./field-atlas/destinations/nsdl-bo/) |
| BSE UCC | 86 | [bse-ucc](./field-atlas/destinations/bse-ucc/) |
| MCX UCC | 86 | [mcx-ucc](./field-atlas/destinations/mcx-ucc/) |
| NSE UCC | 86 | [nse-ucc](./field-atlas/destinations/nse-ucc/) |
| Contract Notes / ECN | 81 | [contract-notes](./field-atlas/destinations/contract-notes/) |
| RMS (Risk Management System) | 72 | [rms](./field-atlas/destinations/rms/) |
| Regulatory Reports (DMF / CFR / Peak Margin) | 67 | [regulatory-reports](./field-atlas/destinations/regulatory-reports/) |
| AML Reports to FIU-IND | 55 | [aml-fiu](./field-atlas/destinations/aml-fiu/) |
| FATCA / CRS Reports | 33 | [fatca-crs](./field-atlas/destinations/fatca-crs/) |
| DLT Comms (SMS / Email) | 26 | [dlt-comms](./field-atlas/destinations/dlt-comms/) |

## Practical notes

- **[industry practice]** For any integration build, start at the destination sub-page — it lists every field the destination needs, its format, and its quirks. Then map back to the master-dataset to confirm source fields exist.
- **[gotcha]** Same field can have different names at different destinations (`PAN` at KRA, `PAN_NO` at NSE UCC, `pan_number` in back-office). The `destination_field_name` column is the destination's literal name; the `field_id` is the source canonical ID.
- **[cost optimization]** Use the master CSV programmatically for impact analysis: `grep -E '"A-pan_number"' field-atlas-master.csv` lists every destination that consumes PAN.
- **[risk trade-off]** Rows tagged `[industry typical]` are best-guess descriptions of vendor-specific behavior; they're useful for design but require vendor confirmation before production use.
- **[industry practice]** Bracket pseudo-sections (`[trade]`, `[margin]`, `[dmf]`, etc.) cover computed or operations-generated fields that don't exist at KYC onboarding time. The Field Atlas covers them; the master-dataset doesn't.

## Verified through

2026-05-14

---

*AI-generated and not legal advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*

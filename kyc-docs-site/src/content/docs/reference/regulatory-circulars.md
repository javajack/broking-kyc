---
title: Regulatory Circulars
description: "Verified index of SEBI / RBI / NPCI / CERSAI / MeitY / FIU-IND / exchange / depository / clearing-corp circulars affecting Indian stock broking, 2020-01-01 to 2026-05-14."
---

> **Who reads this section?** Compliance officers tracking regulatory change. Auditors verifying citations. Engineers checking what's in force. Anyone writing an observation that needs a circular ID. New to the site? Try [Choose Your Role](/broking-kyc/personas/) first.

Each issuer is dense enough to deserve its own sub-page, so this master page is navigation + highlights + coverage notes. Operators looking for a specific issuer drill into the relevant sub-page; reviewers scanning impact start with the highlight panel; KB users follow the per-issuer counts to gauge coverage.

## TL;DR

- **884 circulars** indexed across 13 issuer groupings.
- Window: **2020-01-01 → 2026-05-14**. Verified 2026-05-14.
- **222 circulars** issued in 2025 or later.
- **103** entries flagged `[unknown — verify]` in at least one field (primary URL not re-fetchable or date ambiguous in source).
- Coverage spans **regulatory** norms AND **operational / file-format** circulars (BOD/EOD files, settlement specs, margin frameworks).
- AI-generated; summaries are paraphrased. **Read the linked PDF before acting on any provision.**

## Most-impactful 12 circulars (curated)

Hand-picked from the full set. Selection criteria: each row materially changes broker / depository / exchange behaviour AND is widely cited in current industry practice.

| Date | Issuer | ID | Title | Impact |
| --- | --- | --- | --- | --- |
| 2020-04-24 | SEBI-MIRSD | [SEBI/HO/MIRSD/DOP/CIR/P/2020/73](./circulars/sebi-mirsd/#sebi-ho-mirsd-dop-cir-p-2020-73) | Clarification on Know Your Client (KYC) Process and Use of Technology for KYC | onboarding, esign, digi-locker, aml |
| 2024-06-06 | SEBI-MIRSD | [SEBI/HO/MIRSD/SECFATF/P/CIR/2024/79](./circulars/sebi-mirsd/#sebi-ho-mirsd-secfatf-p-cir-2024-79) | Uploading of KYC information by KYC Registration Agencies (KRAs) to Central KYC  | onboarding, re-KYC, file-format, reporting |
| 2024-02-20 | SEBI-MIRSD | [SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12](./circulars/sebi-mirsd/#sebi-ho-mirsd-secfatf-p-cir-2024-12) | Centralization of certifications under Foreign Account Tax Compliance Act (FATCA | fatca-crs, onboarding, re-KYC, file-format |
| 2024-06-06 | SEBI-MIRSD | [SEBI/HO/MIRSD/SECFATF/P/CIR/2024/78](./circulars/sebi-mirsd/#sebi-ho-mirsd-secfatf-p-cir-2024-78) | Master Circular - Guidelines on Anti-Money Laundering (AML) Standards and Combat | aml, onboarding, reporting, surveillance |
| 2024-03-21 | SEBI-MRD | [SEBI/HO/MRD/MRD-PoD-3/P/CIR/2024/20](./circulars/sebi-other/#sebi-ho-mrd-mrd-pod-3-p-cir-2024-20) | Introduction of Beta version of T+0 rolling settlement cycle on optional basis i | settlement, t0-t1, rms |
| 2025-03-19 | SEBI-OIAE | [SEBI/HO/OIAE/OIAE_IAD-3/P/CIR/2025/32](./circulars/sebi-other/#sebi-ho-oiae-oiae-iad-3-p-cir-2025-32) | Harnessing DigiLocker as a Digital Public Infrastructure for reducing Unclaimed  | digi-locker, transmission, nominee, dormant |
| 2026-01-07 | SEBI-LAD-NRO | [SEBI/LAD-NRO/GN/2026/291](./circulars/sebi-other/#sebi-lad-nro-gn-2026-291) | Securities and Exchange Board of India (Stock Brokers) Regulations, 2026 | onboarding, surveillance, reporting, other |

## Browse by issuer

All entries live on per-issuer sub-pages, sorted descending by date.

| Issuer | Entries | Page |
| --- | --- | --- |
| NSE | 156 | [nse](./circulars/nse/) |
| NSDL | 112 | [nsdl](./circulars/nsdl/) |
| CDSL | 108 | [cdsl](./circulars/cdsl/) |
| Clearing Corporations (NSCCL / ICCL / MCXCCL) | 107 | [clearing-corps](./circulars/clearing-corps/) |
| MCX | 84 | [mcx](./circulars/mcx/) |
| SEBI-MIRSD | 56 | [sebi-mirsd](./circulars/sebi-mirsd/) |
| SEBI (MRD / IMD / OIAE / LAD-NRO / CFD) | 50 | [sebi-other](./circulars/sebi-other/) |
| NPCI | 50 | [npci](./circulars/npci/) |
| RBI | 47 | [rbi](./circulars/rbi/) |
| BSE | 45 | [bse](./circulars/bse/) |
| MeitY / CCA | 29 | [meity](./circulars/meity/) |
| CERSAI / CKYC | 20 | [cersai](./circulars/cersai/) |
| FIU-IND | 20 | [fiu-ind](./circulars/fiu-ind/) |

## Coverage notes

- **FIU-IND URLs are flagged as unverified.** The fiuindia.gov.in domain was not reachable from the research environment; FIU entries are sourced from cross-citations on SEBI mirrors, PIB press releases, and authoritative third-party legal trackers. Treat FIU URLs as leads, not citations.
- **Truncated working files**: six issuer sweeps (BSE, NSDL, NSE-initial, RBI, SEBI-MIRSD, SEBI-other) hit the user-account rate limit before reaching their closing review pass. Entries above the cut-off are individually formed per the schema; coverage in the final ~10–15% of the research window may be incomplete for those issuers. See per-issuer `OPEN_QUESTIONS` sections in the working dataset.
- **NSE was supplemented** with a follow-up sweep that produced 124 additional non-overlapping entries (combined coverage: 156 NSE circulars).
- **Supersession chains** are recorded per-entry via the `superseded_by` field. The chain check passes for entries whose superseded target falls in-window; chains pointing to pre-2020 targets are noted in the entry summary.

## Practical notes

- **[industry practice]** Ops teams typically subscribe to each issuer's email distribution list rather than scraping their site — leads to more reliable real-time tracking than periodic web fetches.
- **[gotcha]** SEBI re-numbered some master circulars in 2025; the `superseded_by` chain on each entry is the only safe way to track the current-in-force version.
- **[gotcha]** NPCI 'OC' (Operating Circular) numbers cycle per financial year (e.g., OC 151/2023-24 vs OC 151A/2024-25 are different documents). Always include the FY suffix.
- **[cost optimization]** Direct issuer subscriptions cost nothing; the third-party legal aggregators (TaxGuru, Complinity, TeamLease RegTech, etc.) provide additional context and supersession tracking for paid tiers.
- **[risk trade-off]** Operational circulars from exchanges supersede informally via 'notices' rather than full circulars — member compliance teams should track BOTH channels.

## Changelog

See the [circulars changelog](./circulars-changelog/) for the diff against the prior 37-entry hand-curated list.

## Verified through

2026-05-14

---

*AI-generated and not legal advice. See the project [README](https://github.com/javajack/broking-kyc) for the full disclaimer.*

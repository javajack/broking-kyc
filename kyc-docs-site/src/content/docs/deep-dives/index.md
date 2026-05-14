---
title: Operations Deep Dives
description: Focused per-topic deep dives across the Indian broking operational landscape — trading-day mechanics (OMS, RMS/SPAN, surveillance, auction, block deals, retail algo), settlement (T+0/T+1, direct-payout-to-demat, upstreaming, SLBM, MTF), compliance & audit (SCORES, IGRC, ODR, CSCRF, inspection, AP framework), specialty operations (IPO/OFS, MF platforms, DLT, BCP/DR), member compliance (BMC/ABC, fit-and-proper, KMP, renewal, ECN), and foundational topics (SGF/IPF, market manipulation, pre-open/closing auction, segment rules, member default).
---

> **Who reads this section?** Engineers and operators going deep on a specific topic — OMS internals, SPAN methodology, CSCRF cyber framework, AP supervision, market manipulation typologies, segment rules, member default recovery. Compliance officers and auditors writing observations needing verifiable citations. New here generally? Try [Choose Your Role](/broking-kyc/personas/) first.

This is the depth layer. Where the [Compliance Blueprint](/broking-kyc/operations/compliance-blueprint/) inventories *what must be done*, the [Integration DAG](/broking-kyc/operations/integration-dag/) maps *what runs before what*, the [Broker Process Narrative](/broking-kyc/broker-process/narrative/) tells the chronological story, and the [Field Atlas](/broking-kyc/reference/field-atlas/) maps *where each field flows* — deep dives go narrowly into one topic at the level of detail an operator or engineer needs to actually implement or audit it.

## TL;DR

- 30+ focused per-topic deep-dive pages organized into 6 thematic groups.
- Each page: TL;DR → conceptual overview → walkthrough or technical reference (per topic shape) → sub-cases / edge cases → practical notes → cross-references.
- Aim: a **verifiable, exhaustive compendium** that doesn't exist elsewhere on the internet — the authoritative reference for Indian broking operations.
- Every claim is traceable to a circular ID, regulator publication, exchange / clearing-corp file specification, or named industry practice.
- AI-generated synthesis; verify each provision against the linked source before relying on it in production.

## The 6 thematic groups

### Trading-day operations

How a trading day actually runs at the integration layer — order capture, pre-trade RMS pipeline, margin computation, real-time surveillance, exceptional events like short-delivery auctions and block-deal windows, the retail algo framework (post Aug 2025 SEBI).

| Topic | Page |
|---|---|
| OMS internals — order capture paths, pre-trade RMS hot path, FIX gateway | [oms-internals](./trading-day/oms-internals/) |
| RMS / SPAN methodology — margin computation walkthrough | [rms-span-methodology](./trading-day/rms-span-methodology/) |
| Surveillance — NORMS / GSM / ASM / OTR / social-media | [surveillance-norms-gsm-asm](./trading-day/surveillance-norms-gsm-asm/) |
| Short-delivery auction — T+2 mechanics + penalty cascade | [short-delivery-auction](./trading-day/short-delivery-auction/) |
| Block & bulk deals — windows, threshold, reporting | [block-bulk-deals](./trading-day/block-bulk-deals/) |
| Retail algo framework — SEBI Aug 2025 mandate | [retail-algo-framework](./trading-day/retail-algo-framework/) |

### Settlement operations

The settlement layer — how T+1 default and T+0 beta actually run, the direct-payout-to-demat phased rollout, daily client funds upstreaming, payin default mechanics, securities lending and borrowing, and the MTF operational walkthrough.

| Topic | Page |
|---|---|
| T+0 / T+1 settlement nuances | [t0-t1-settlement](./settlement/t0-t1-settlement/) |
| Direct payout to demat (TM CUSPA / CM CUSPA / TM CSMFA) | [direct-payout-to-demat](./settlement/direct-payout-to-demat/) |
| Client funds upstreaming (MFOS / FDR / cash) | [client-funds-upstreaming](./settlement/client-funds-upstreaming/) |
| Payin default + Core SGF draw | [payin-default-core-sgf](./settlement/payin-default-core-sgf/) |
| SLBM (Securities Lending & Borrowing Mechanism) | [slbm](./settlement/slbm/) |
| MTF operational walkthrough | [mtf-operational](./settlement/mtf-operational/) |

### Compliance & audit

The compliance machinery — investor grievance redressal (SCORES, IGRC, ODR), audit cycles (concurrent, system, cyber), inspections, CSCRF deep-dive, and the Authorized Person framework.

| Topic | Page |
|---|---|
| SCORES procedure | [scores-procedure](./compliance-audit/scores-procedure/) |
| IGRC (Investor Grievance Redressal Committee) | [igrc](./compliance-audit/igrc/) |
| ODR (Smart ODR — Aug 2023) | [odr](./compliance-audit/odr/) |
| Concurrent audit | [concurrent-audit](./compliance-audit/concurrent-audit/) |
| System audit (every 2 years) | [system-audit](./compliance-audit/system-audit/) |
| CSCRF deep-dive | [cscrf-deep-dive](./compliance-audit/cscrf-deep-dive/) |
| Inspection types (exchange / SEBI / depository) | [inspection-types](./compliance-audit/inspection-types/) |
| Authorized Person framework | [ap-framework](./compliance-audit/ap-framework/) |

### Specialty operations

Specialized broker activities — IPO/OFS broker-side, mutual fund platform integrations, DLT comms framework, and BCP/DR drill procedure.

| Topic | Page |
|---|---|
| IPO / OFS broker-side flow | [ipo-ofs-broker-side](./specialty/ipo-ofs-broker-side/) |
| Mutual Fund platforms (BSE StAR MF, NSE NMF II) | [mutual-fund-platforms](./specialty/mutual-fund-platforms/) |
| DLT framework (TRAI) | [dlt-framework](./specialty/dlt-framework/) |
| BCP / DR drill procedure | [bcp-dr-drill](./specialty/bcp-dr-drill/) |

### Member compliance

Broker-as-member obligations — capital adequacy, fit-and-proper, KMP intimations, membership renewal, ECN and investor servicing format details.

| Topic | Page |
|---|---|
| BMC / ABC (Base Minimum + Additional Base Capital) | [bmc-abc](./member-compliance/bmc-abc/) |
| Fit-and-proper criteria | [fit-and-proper](./member-compliance/fit-and-proper/) |
| KMP changes intimation | [kmp-changes](./member-compliance/kmp-changes/) |
| Annual membership renewal | [membership-renewal](./member-compliance/membership-renewal/) |
| ECN & investor servicing artefacts | [ecn-investor-servicing](./member-compliance/ecn-investor-servicing/) |

### Foundational (previously absent)

Topics central to broking operations that the site had only mentioned in passing — settlement guarantee fund, investor protection fund, market manipulation typologies, pre-open and closing auction mechanics, segment rules comparison, and member default recovery.

| Topic | Page |
|---|---|
| SGF / Core SGF framework | [sgf-core-sgf](./foundational/sgf-core-sgf/) |
| Investor Protection Fund (IPF) | [ipf](./foundational/ipf/) |
| Market manipulation typologies | [market-manipulation-typologies](./foundational/market-manipulation-typologies/) |
| Pre-open / closing auction mechanics | [pre-open-closing-auction](./foundational/pre-open-closing-auction/) |
| Segment rules comparison (CD / equity / index / single-stock / commodity) | [segment-rules-comparison](./foundational/segment-rules-comparison/) |
| Member default recovery | [member-default-recovery](./foundational/member-default-recovery/) |

## How to use this section

- **Operator looking for a procedural walkthrough** — start at the relevant per-topic page; each has step-by-step procedures with field-level callouts, sub-cases, and practical notes.
- **Engineer building an integration** — start at the relevant topic, then cross-link out to the [Integration DAG](/broking-kyc/operations/integration-dag/) for the dependency structure and the [Field Atlas](/broking-kyc/reference/field-atlas/) for the data flow.
- **Compliance officer building a runbook** — start at the relevant topic, cross-link to the [Compliance Blueprint](/broking-kyc/operations/compliance-blueprint/) for obligation context and to [Circulars](/broking-kyc/reference/regulatory-circulars/) for the regulatory citation.
- **Auditor / inspector** — pages are written with verifiability in mind. Every claim cites a circular or vendor doc; gaps where public source isn't available are tagged `[industry typical — verify]`.

## Practical notes

- **[industry practice]** Most broking operations knowledge in India is internal to brokers / clearing corps / exchanges, transmitted through closed channels (member training, internal SOPs, vendor docs). This section consolidates what is public and verifiable.
- **[risk trade-off]** Comprehensive coverage of a fast-moving domain has staleness risk — regulatory framework changes monthly. Each page has a "Verified through" stamp; re-run validation periodically.
- **[cost optimization]** A new compliance officer / ops engineer can use the cross-link graph (this section → blueprint → DAG → atlas → circulars) to navigate to the depth they need without re-reading material at multiple levels.

## Verified through

2026-05-14

---

*AI-generated and not legal, financial, or compliance advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*

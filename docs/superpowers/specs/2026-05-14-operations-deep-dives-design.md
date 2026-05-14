# Operations Deep-Dives — Design

**Date:** 2026-05-14
**Sub-project:** #8 of the broking-ops expansion (post-arc extension)
**Status:** Design — pending user review

## Context

Seven sub-projects shipped. The site now has breadth-first reference (circulars, vendor atlas, compliance blueprint, field atlas), continuous narrative (broker-process), dependency structure (integration DAG), and operator walkthroughs for the major client-lifecycle scenarios.

Coverage audit identified topics that are referenced repeatedly across the site (compliance blueprint rows, DAG nodes, narrative paragraphs) but lack dedicated deep-dive pages. Plus topics categorically absent today: SGF, IPF, market-manipulation typologies, pre-open / closing-auction details, CD vs equity rules, member-default recovery.

## Goal

Ship ~30 focused per-topic deep-dive pages under a new top-level `deep-dives/` section, organized into 5 thematic groups + a category for previously-absent topics. Each page is a focused operator + technical reference for one topic, ~1,500–3,000 words.

## Output

### Top-level section: `kyc-docs-site/src/content/docs/deep-dives/`

#### Overview

- `deep-dives/index.md` — landing page with thematic navigation, conceptual overview of how deep-dives complement the rest of the site.

#### Theme A — Trading-day operations (6 pages)

- `deep-dives/oms-internals.md` — order-capture paths, pre-trade RMS hot path, FIX gateway specifics, OMS-RMS-back-office split of responsibilities.
- `deep-dives/rms-span-methodology.md` — margin computation walkthrough (SPAN, ELM, exposure, additional, MTM), formulas, snapshot mechanics.
- `deep-dives/surveillance-norms-gsm-asm.md` — NORMS architecture, GSM stages, ASM thresholds, OTR computation, social-media surveillance (Apr 2024 SEBI framework).
- `deep-dives/short-delivery-auction.md` — T+2 morning auction mechanics, price discovery, penalty cascade, broker remediation.
- `deep-dives/block-bulk-deals.md` — morning + afternoon block windows, bulk deal threshold, reporting format, post-trade disclosure.
- `deep-dives/retail-algo-framework.md` — SEBI Aug 2025 retail algo framework, broker algo approval, tagged-order flow, pre-trade controls.

#### Theme B — Settlement operations (6 pages)

- `deep-dives/t0-t1-settlement.md` — T+1 default mechanics, T+0 beta scope (top 25 → top 500), opt-in flow, broker readiness, parallel-session architecture.
- `deep-dives/direct-payout-to-demat.md` — SEBI Jun 2024 direct-payout phased rollout, TM CUSPA / CM CUSPA / TM CSMFA pool-account restructure.
- `deep-dives/client-funds-upstreaming.md` — Jun 2023 SEBI mandate, MFOS / FDR / cash collateral upstreaming, daily reconciliation, allocation/deallocation.
- `deep-dives/payin-default-core-sgf.md` — broker payin failure mechanics, Core SGF draw, member-default recovery, suspension procedure.
- `deep-dives/slbm.md` — Securities Lending & Borrowing Mechanism, lending / borrowing flow, settlement, fees, taxation.
- `deep-dives/mtf-operational.md` — Margin Trading Facility operational walkthrough — funding, pledge, unpaid MTF file workflow, automated invocation (IV-EP / IV-RD), settlement.

#### Theme C — Compliance & audit (8 pages)

- `deep-dives/scores-procedure.md` — SCORES registration, complaint workflow, 21-day SLA, escalation matrix.
- `deep-dives/igrc.md` — Investor Grievance Redressal Committee composition, escalation path, fee resolution.
- `deep-dives/odr.md` — Smart ODR (Aug 2023) framework, conciliation, arbitration, market-participant onboarding.
- `deep-dives/concurrent-audit.md` — scope, frequency, broker funds + securities, observation cycle, remediation.
- `deep-dives/system-audit.md` — every 2 years per SEBI, scope, auditor empanelment (CERT-In), report submission.
- `deep-dives/cscrf-deep-dive.md` — Aug 2024 framework + clarifications (Dec 2024 / Mar 2025 / Apr 2025 / Aug 2025), categorization (Qualified / Mid / Small RE), VAPT, incident reporting workflow.
- `deep-dives/inspection-types.md` — exchange inspection, SEBI inspection, depository inspection — frequency, scope, response procedure.
- `deep-dives/ap-framework.md` — Authorized Person registration, supervision (NSE/COMP chain 2021-2024), turnover reporting, penalty schedule.

#### Theme D — Specialty operations (4 pages)

- `deep-dives/ipo-ofs-broker-side.md` — ASBA-UPI flow, allocation, refund, broker's role in IPO subscription, OFS mechanics.
- `deep-dives/mutual-fund-platforms.md` — BSE StAR MF, NSE NMF II, MF Utility, payment cycle, redemption, broker-AMC settlement.
- `deep-dives/dlt-framework.md` — TRAI DLT framework, entity / header / template registration, scrubbing, error codes, principal entity vs registered telemarketer.
- `deep-dives/bcp-dr-drill.md` — quarterly drill procedure, scope, tabletop exercises, RTO/RPO targets, near-site / far-site separation, post-drill reporting.

#### Theme E — Member compliance (5 pages)

- `deep-dives/bmc-abc.md` — Base Minimum Capital and Additional Base Capital framework, segment-specific thresholds, computation, replenishment.
- `deep-dives/fit-and-proper.md` — criteria, ongoing compliance, declarations, regulatory action handling, director / KMP coverage.
- `deep-dives/kmp-changes.md` — Compliance Officer / Principal Officer / Designated Director / KMP change intimation, regulatory windows, fit-and-proper re-verification.
- `deep-dives/membership-renewal.md` — annual renewal procedure for NSE / BSE / MCX membership, fees, attestations, prerequisite cycles.
- `deep-dives/ecn-investor-servicing.md` — ECN format (ICAI-prescribed columns), quarterly statement of accounts, annual statement, holding statement, investor charter.

#### Categorically absent topics (6 pages)

- `deep-dives/sgf-core-sgf.md` — Settlement Guarantee Fund / Core SGF framework, contribution, draw rules.
- `deep-dives/ipf.md` — Investor Protection Fund procedure, claim, scope.
- `deep-dives/market-manipulation-typologies.md` — wash trade, front running, layering, spoofing, pump-and-dump detection patterns.
- `deep-dives/pre-open-closing-auction.md` — pre-open call auction (09:00-09:15), closing window (15:30-15:40), price discovery mechanics.
- `deep-dives/segment-rules-comparison.md` — CD vs equity rules, index vs single-stock derivatives, commodity-specific rules.
- `deep-dives/member-default-recovery.md` — clearing-corp default management, asset liquidation sequence, client-fund protection in default.

### Sidebar update

New top-level **"Deep Dives"** sidebar group between Lifecycle and Broker Process (so the reader's mental flow is: Journey → Lifecycle → Deep Dives → Broker Process → Operations → Reference). Organized into 6 collapsed sub-groups (Trading-day / Settlement / Compliance & Audit / Specialty / Member Compliance / Foundational).

### Per-page structure (mixed walkthrough / technical reference per topic)

Walkthrough-shape pages (procedural topics — SCORES, IGRC, ODR, audit procedures, IPO, MF, AP framework, drill procedure, transmission-like scenarios):
1. Frontmatter + why-this-order + TL;DR + conceptual overview.
2. Step-by-step procedure with field-level callouts.
3. Sub-cases / branches.
4. Practical notes + cross-references + verified-through stamp.

Technical-reference-shape pages (schema-heavy topics — SPAN methodology, file format details, BMC/ABC framework, market-manipulation typologies, segment rules comparison, CSCRF categorization):
1. Frontmatter + why-this-order + TL;DR + conceptual overview.
2. Structured tables / reference content (formulas, thresholds, definitions, matrices).
3. Worked examples.
4. Edge cases & gotchas.
5. Practical notes + cross-references + verified-through stamp.

The page-shape decision is per-topic and reflected in the writing.

## Workflow

**Inline synthesis** — no research agents. Same shape as #4, #5, #6. Material exists in compliance blueprint + integration DAG + broker-process narrative + field atlas + circulars + vendor atlas.

## Documentation conventions

Project-wide conventions: source traceability, reasoned structure, HL→LL progression, alternatives surfaced, practical notes section, field-level baseline, vendor-naming neutrality.

## Risks

- **Page count** — ~30 new pages. Sidebar grows but stays navigable via collapsed sub-groups. Astro Starlight handles this fine.
- **Overlap with existing** — many topics are touched in blueprint / DAG / narrative. Mitigation: deep-dives are *focused per-topic* shape; cross-link to existing pages without duplicating prose.
- **Length variance** — technical-reference pages run shorter (~1,200 words); operator-walkthrough pages run longer (~2,500). Acceptable variance.
- **Voice drift** — long writing session across 30 pages. Mitigation: page template is consistent; voice follows existing lifecycle/ shape.

## Out of scope

- Per-vendor deep-dives beyond the existing vendor atlas (e.g., specific Greeksoft RMS configuration — not in scope; vendor-specific operational detail belongs in vendor-RFP material, not this site).
- Implementation code or actual config artefacts.
- HUF / Partnership / Corporate lifecycle specifics — covered in existing `appendix/non-individual-entities.md`.

## Success criteria

- 1 overview + ~30 per-topic pages.
- Each page ≥ 1,200 words, ≥ 3 cross-links, ≥ 1 Aside.
- Total ≥ 35,000 words new content across deep-dives.
- Sidebar updated with collapsed sub-groups.
- Astro build clean (~172 pages total).
- Memory entry created.

## Workflow summary

1. Commit this spec.
2. Invoke writing-plans for the implementation plan.
3. Execute inline — scaffold + overview, then one commit per page across 6 thematic groups, then sidebar + memory.

## Next step

After user approval: invoke writing-plans.

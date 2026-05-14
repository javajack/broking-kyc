# Operations Deep-Dives Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship ~30 focused per-topic deep-dive pages under `deep-dives/` covering trading-day operations, settlement, compliance & audit, specialty operations, member compliance, and previously-absent foundational topics (SGF, IPF, market manipulation, pre-open/closing auction, segment-rules, member default).

**Architecture:** Two execution-mode options. **(Recommended) Subagent-driven**: 6 parallel cluster agents, one per theme, each drafting that theme's pages from project context. **(Alternative) Inline**: I draft all pages directly in this session. Sidebar + memory + README done by me regardless of mode.

**Tech Stack:** Astro Starlight (no build changes), `.md` / `.mdx` (Starlight `Aside` components used inline), Pagefind (auto-rebuilt).

**Note on TDD adaptation:** Content/writing plan. Verification per page: ≥ 1,200 words, ≥ 3 cross-links, ≥ 1 Aside, build clean.

---

## File Structure

**Files to create** (~30 new pages):

```
kyc-docs-site/src/content/docs/deep-dives/
├── index.md                              # Overview
├── trading-day/
│   ├── oms-internals.md
│   ├── rms-span-methodology.md
│   ├── surveillance-norms-gsm-asm.md
│   ├── short-delivery-auction.md
│   ├── block-bulk-deals.md
│   └── retail-algo-framework.md
├── settlement/
│   ├── t0-t1-settlement.md
│   ├── direct-payout-to-demat.md
│   ├── client-funds-upstreaming.md
│   ├── payin-default-core-sgf.md
│   ├── slbm.md
│   └── mtf-operational.md
├── compliance-audit/
│   ├── scores-procedure.md
│   ├── igrc.md
│   ├── odr.md
│   ├── concurrent-audit.md
│   ├── system-audit.md
│   ├── cscrf-deep-dive.md
│   ├── inspection-types.md
│   └── ap-framework.md
├── specialty/
│   ├── ipo-ofs-broker-side.md
│   ├── mutual-fund-platforms.md
│   ├── dlt-framework.md
│   └── bcp-dr-drill.md
├── member-compliance/
│   ├── bmc-abc.md
│   ├── fit-and-proper.md
│   ├── kmp-changes.md
│   ├── membership-renewal.md
│   └── ecn-investor-servicing.md
└── foundational/
    ├── sgf-core-sgf.md
    ├── ipf.md
    ├── market-manipulation-typologies.md
    ├── pre-open-closing-auction.md
    ├── segment-rules-comparison.md
    └── member-default-recovery.md
```

**Files to modify:**
- `kyc-docs-site/astro.config.mjs` — add "Deep Dives" sidebar group with 6 collapsed sub-groups.
- `README.md` — append Deep Dives bullet.

**Memory:**
- Create `/home/rakesh/.claude/projects/-home-rakesh-work-broking-kyc/memory/operations_deep_dives.md`.

---

## Phase 1 — Scaffold + overview (Task 1)

### Task 1: Create directories + overview

**Files:**
- Create: `deep-dives/` and 6 sub-directories.
- Create: `deep-dives/index.md`.

- [ ] **Step 1: Create directory tree**

```bash
mkdir -p /home/rakesh/work/broking-kyc/kyc-docs-site/src/content/docs/deep-dives/{trading-day,settlement,compliance-audit,specialty,member-compliance,foundational}
ls /home/rakesh/work/broking-kyc/kyc-docs-site/src/content/docs/deep-dives/
```

Expected: 6 sub-directories listed.

- [ ] **Step 2: Write overview page**

Write `deep-dives/index.md` with TL;DR + conceptual overview + 6-theme navigation table + cross-section reference (how deep-dives complement narrative / DAG / blueprint / atlas) + practical notes + verified-through.

- [ ] **Step 3: Build verify**

```bash
cd /home/rakesh/work/broking-kyc/kyc-docs-site && npm run build 2>&1 | grep -E '(deep-dives|error|Error|Complete)' | tail -5
```

- [ ] **Step 4: Commit**

```bash
cd /home/rakesh/work/broking-kyc
git add kyc-docs-site/src/content/docs/deep-dives/
git commit -m "Scaffold deep-dives section overview

Overview with thematic navigation, conceptual overview of how deep-
dives complement the rest of the site, cross-section reference, and
practical notes. Per-theme pages drafted in subsequent commits.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Phase 2 — Draft 30 theme pages (Tasks 2–7)

Six tasks, one per theme. Each task drafts that theme's 4–8 pages (one commit per page).

Per-page template (consistent across themes; mixed walkthrough/reference per topic):

```markdown
---
title: "Deep Dive: <topic>"
description: <1-2 sentence summary>
---

import { Aside } from '@astrojs/starlight/components';

> **Why this page is structured this way:** <1-sentence>

## TL;DR
- 4-6 bullets

## Conceptual overview
1-2 paragraphs

## <Procedure or Reference section, per topic shape>
- Walkthrough: numbered steps with field-level callouts.
- Reference: structured tables / formulas / matrices.

## Sub-cases / edge cases
Specific branches.

## Practical notes
- [industry practice] / [gotcha] / [cost optimization] / [risk trade-off] entries.

## Cross-references
Links to blueprint / DAG / atlas / circulars / journey / narrative.

## Verified through
2026-05-14

---

*AI-generated and not legal, financial, or compliance advice...*
```

Per-page minimums: ≥ 1,200 words, ≥ 3 cross-links, ≥ 1 Aside, build clean.

### Task 2: Theme A — Trading-day (6 pages)

**Files to create:**
- `deep-dives/trading-day/oms-internals.md`
- `deep-dives/trading-day/rms-span-methodology.md`
- `deep-dives/trading-day/surveillance-norms-gsm-asm.md`
- `deep-dives/trading-day/short-delivery-auction.md`
- `deep-dives/trading-day/block-bulk-deals.md`
- `deep-dives/trading-day/retail-algo-framework.md`

For each page:
- [ ] **Draft per content scope below.**
- [ ] **Build verify.**
- [ ] **Commit with per-page message.**

**Content scope per page:**

- **`oms-internals.md`** (walkthrough + reference): order capture paths (web / mobile / dealer / API / FIX), pre-trade RMS hot path (segment / margin / MWPL / order-type / surveillance gates), OMS-RMS-back-office split of responsibilities, FIX gateway specifics, CTCL approval process, order-type matrix (NRML / MIS / CO / BO / GTT). Cross-link: integration DAG trading-hours, vendor atlas OMS category, RMS deep-dive sibling.
- **`rms-span-methodology.md`** (reference-heavy): margin computation walkthrough (SPAN scenario method, ELM, exposure margin, additional margin, MTM), per-snapshot mechanics, formulas with worked examples, peak margin shortfall penalty grids (clearing-corp circulars). Cross-link: clearing corps circulars, integration DAG trading-hours.
- **`surveillance-norms-gsm-asm.md`** (walkthrough + reference): NORMS architecture, GSM stages (1-4) with corresponding actions, ASM thresholds (Long-term / Short-term), Trade-to-Trade (T2T) segment, OTR (Order-to-Trade Ratio) computation, social-media surveillance (Apr 2024 SEBI mandate). Cross-link: compliance blueprint surveillance domain.
- **`short-delivery-auction.md`** (walkthrough): T+2 morning auction mechanics, price discovery, penalty cascade (auction price + percent penalty), broker remediation (cover-in-open-market), exception cases. Cross-link: settlement DAG nodes, clearing corps circulars.
- **`block-bulk-deals.md`** (walkthrough + reference): morning window (08:45-09:00), afternoon window (14:35-15:05), bulk-deal threshold (0.5% of issued shares), reporting format, post-trade disclosure, exchange-side surveillance. Cross-link: NSE/BSE circulars.
- **`retail-algo-framework.md`** (walkthrough): SEBI Aug 2025 retail algo framework, broker algo approval process, tagged-order flow, pre-trade controls (NSE/INVG/66524 chain), client classification (low / medium / high frequency), broker responsibilities. Cross-link: NSE INVG circulars, surveillance domain.

After all 6 pages: build verify; cumulative count ≥ 6 × 1,200 words = 7,200.

### Task 3: Theme B — Settlement (6 pages)

**Files to create:**
- `deep-dives/settlement/t0-t1-settlement.md`
- `deep-dives/settlement/direct-payout-to-demat.md`
- `deep-dives/settlement/client-funds-upstreaming.md`
- `deep-dives/settlement/payin-default-core-sgf.md`
- `deep-dives/settlement/slbm.md`
- `deep-dives/settlement/mtf-operational.md`

**Content scope per page:**

- **`t0-t1-settlement.md`** (walkthrough + reference): T+1 default mechanics, T+0 beta scope (Mar 2024 top 25 → Dec 2024 top 500), opt-in flow, broker readiness checklist, parallel-session architecture, settlement-window cut-offs. Cross-link: SEBI MRD circulars, integration DAG EOD-settlement.
- **`direct-payout-to-demat.md`** (walkthrough): SEBI Jun 2024 mandate, phased rollout (Nov 2024 phase 1, Jan-Feb 2025 phase 2), TM CUSPA / CM CUSPA / TM CSMFA pool-account distinctions, chart-of-accounts update guidance, reconciliation patterns. Cross-link: SEBI MIRSD / MRD circulars.
- **`client-funds-upstreaming.md`** (walkthrough): Jun 2023 SEBI mandate, daily upstreaming flow, MFOS / FDR / cash / asset-class collateral, allocation / deallocation, bank-cutoff timing, reconciliation. Cross-link: clearing corps + SEBI MIRSD circulars.
- **`payin-default-core-sgf.md`** (walkthrough + reference): broker payin failure mechanics, Core SGF draw rules, member-default recovery, asset liquidation sequence, suspension procedure, client-fund protection. Cross-link: clearing corps circulars, member-default-recovery foundational page.
- **`slbm.md`** (walkthrough + reference): SLB Mechanism, lending leg (auto-borrow), borrowing leg, settlement, fees (lending + borrowing + tax), CDSL/NSDL SLBM accounts, eligible securities. Cross-link: CDSL/NSDL circulars.
- **`mtf-operational.md`** (walkthrough): MTF activation, funding model, mandatory pledge of bought securities, unpaid-MTF file workflow, automated invocation (IV-EP / IV-RD post Oct 2025), settlement, interest charges, client liability. Cross-link: existing vendors/depositories/cdsl-mtf-pledge.md, CDSL circulars.

### Task 4: Theme C — Compliance & audit (8 pages)

**Files to create:**
- `deep-dives/compliance-audit/scores-procedure.md`
- `deep-dives/compliance-audit/igrc.md`
- `deep-dives/compliance-audit/odr.md`
- `deep-dives/compliance-audit/concurrent-audit.md`
- `deep-dives/compliance-audit/system-audit.md`
- `deep-dives/compliance-audit/cscrf-deep-dive.md`
- `deep-dives/compliance-audit/inspection-types.md`
- `deep-dives/compliance-audit/ap-framework.md`

**Content scope per page:**

- **`scores-procedure.md`** (walkthrough): SCORES registration, complaint workflow, 21-day disposal SLA, escalation matrix, monthly MIS, broker's portal interactions. Cross-link: compliance blueprint grievance domain, SEBI OIAE circulars.
- **`igrc.md`** (walkthrough): Investor Grievance Redressal Committee composition (exchange-level), escalation path from SCORES, fee resolution authority, hearing procedure. Cross-link: SEBI OIAE circulars, broker process narrative.
- **`odr.md`** (walkthrough): Smart ODR (Aug 2023) framework, conciliation, arbitration, market-participant onboarding to ODR portal, ODR conciliator panel, timeline. Cross-link: SEBI/HO/OIAE circulars.
- **`concurrent-audit.md`** (walkthrough + reference): scope (broker funds + securities), continuous frequency, observation cycle, auditor empanelment, remediation procedure. Cross-link: compliance blueprint audit domain.
- **`system-audit.md`** (walkthrough): every 2 years per SEBI, scope (RMS / OMS / back-office / surveillance / cyber), auditor empanelment (CERT-In), report submission timeline. Cross-link: compliance blueprint audit + cyber domains.
- **`cscrf-deep-dive.md`** (walkthrough + reference): Aug 2024 framework + clarifications (Dec 2024 / Mar 2025 / Apr 2025 / Aug 2025), categorization (Qualified RE / Mid-size RE / Small RE), VAPT quarterly, CERT-In incident reporting (6-hour rule), Type I/II/III audit cycles, evidence retention. Cross-link: SEBI MIRSD CSCRF circulars, cyber domain.
- **`inspection-types.md`** (walkthrough): exchange inspection (annual rolling), SEBI inspection (event-triggered), depository inspection (CDSL/NSDL annual), inspection-report response procedure, common observation categories. Cross-link: NSE/BSE/MCX inspection circulars.
- **`ap-framework.md`** (walkthrough): Authorized Person registration, supervision (NSE/COMP chain 2021-2024), turnover reporting, penalty schedule, AP-broker relationship structure, AP onboarding flow. Cross-link: NSE COMP circulars, compliance blueprint member-comp domain.

### Task 5: Theme D — Specialty operations (4 pages)

**Files to create:**
- `deep-dives/specialty/ipo-ofs-broker-side.md`
- `deep-dives/specialty/mutual-fund-platforms.md`
- `deep-dives/specialty/dlt-framework.md`
- `deep-dives/specialty/bcp-dr-drill.md`

**Content scope per page:**

- **`ipo-ofs-broker-side.md`** (walkthrough): ASBA-UPI flow, broker's role in IPO subscription, allocation mechanics, refund / mandate-release, OFS (Offer for Sale) variations. Cross-link: NSE/BSE IPO circulars, NPCI UPI Block.
- **`mutual-fund-platforms.md`** (walkthrough + reference): BSE StAR MF, NSE NMF II, MF Utility comparison, payment cycle, redemption, broker-AMC settlement. Cross-link: BSE/NSE MF circulars.
- **`dlt-framework.md`** (reference-heavy): TRAI DLT framework, entity / header / template registration, scrubbing engine, error codes, principal entity vs registered telemarketer, template-approval timeline. Cross-link: comms-related blueprint rows, vendor atlas DLT category.
- **`bcp-dr-drill.md`** (walkthrough): quarterly drill scope, tabletop exercises, full-failover drill, RTO/RPO targets, near-site/far-site separation, post-drill reporting. Cross-link: BCP/DR blueprint domain, BOD DAG.

### Task 6: Theme E — Member compliance (5 pages)

**Files to create:**
- `deep-dives/member-compliance/bmc-abc.md`
- `deep-dives/member-compliance/fit-and-proper.md`
- `deep-dives/member-compliance/kmp-changes.md`
- `deep-dives/member-compliance/membership-renewal.md`
- `deep-dives/member-compliance/ecn-investor-servicing.md`

**Content scope per page:**

- **`bmc-abc.md`** (reference): Base Minimum Capital + Additional Base Capital framework, segment-specific thresholds, computation, replenishment, breach consequences. Cross-link: SEBI MIRSD networth circulars.
- **`fit-and-proper.md`** (walkthrough + reference): criteria, ongoing compliance, declarations, regulatory action handling, director / KMP coverage, refresh cycle. Cross-link: SEBI intermediary regulations.
- **`kmp-changes.md`** (walkthrough): Compliance Officer / Principal Officer / Designated Director / KMP change intimation, regulatory windows, fit-and-proper re-verification trigger. Cross-link: SEBI MIRSD member-compliance circulars.
- **`membership-renewal.md`** (walkthrough): annual renewal procedure for NSE / BSE / MCX, fees, attestations (fit-and-proper / networth / BMC / KMP-current), prerequisite cycles. Cross-link: exchange member circulars.
- **`ecn-investor-servicing.md`** (reference): ECN format (ICAI-prescribed columns), quarterly statement of accounts, annual statement, holding statement, investor charter publication, dispatch via DLT comms. Cross-link: investor-servicing blueprint domain.

### Task 7: Theme F — Foundational (6 pages)

**Files to create:**
- `deep-dives/foundational/sgf-core-sgf.md`
- `deep-dives/foundational/ipf.md`
- `deep-dives/foundational/market-manipulation-typologies.md`
- `deep-dives/foundational/pre-open-closing-auction.md`
- `deep-dives/foundational/segment-rules-comparison.md`
- `deep-dives/foundational/member-default-recovery.md`

**Content scope per page:**

- **`sgf-core-sgf.md`** (reference): Settlement Guarantee Fund / Core SGF framework, contribution rates by segment, draw rules, replenishment, member liability. Cross-link: clearing corps circulars.
- **`ipf.md`** (walkthrough): Investor Protection Fund procedure, claim eligibility, claim window, scope (broker default), payout mechanism. Cross-link: SEBI IPF circulars.
- **`market-manipulation-typologies.md`** (reference): wash trade, front running, layering, spoofing, pump-and-dump, marking-the-close — detection patterns, surveillance flags, regulatory action precedents. Cross-link: NSE NORMS, SEBI MRD surveillance circulars.
- **`pre-open-closing-auction.md`** (reference): pre-open call auction (09:00-09:15) detailed mechanics, closing window (15:30-15:40) auction + settlement-price discovery, eligible securities (top stocks only), broker order routing in these windows. Cross-link: NSE/BSE closing-auction circulars.
- **`segment-rules-comparison.md`** (reference): CD vs equity rules (currency derivatives), index derivatives vs single-stock, commodity-specific rules (MCX), debt segment, IRD — side-by-side comparison table. Cross-link: NSE/BSE/MCX segment circulars.
- **`member-default-recovery.md`** (walkthrough): clearing-corp default management, asset liquidation sequence, client-fund protection in default, member-suspension procedure, default-fund cascade. Cross-link: payin-default-core-sgf sibling, clearing corps circulars.

---

## Phase 3 — Sidebar + memory + README (Tasks 8–9)

### Task 8: Update Astro sidebar

**Files:**
- Modify: `kyc-docs-site/astro.config.mjs`

Add new top-level **"Deep Dives"** group between Lifecycle and Broker Process. Group has 6 collapsed sub-groups (Trading-day, Settlement, Compliance & Audit, Specialty, Member Compliance, Foundational), each listing its theme's pages.

Build verify after adding (~172 pages total expected).

Commit: "Expose Deep Dives in sidebar"

### Task 9: Memory + README + final verify

- Create `/home/rakesh/.claude/projects/-home-rakesh-work-broking-kyc/memory/operations_deep_dives.md` describing this sub-project.
- Update `MEMORY.md` index.
- Update `project_overview.md` final sentence to reflect all 8 sub-projects complete.
- Add Deep Dives bullet to `README.md` Compliance & Vendor Coverage section.
- Final `npm run build` sanity check.
- Final commit: "Close out operations deep-dives; sub-project #8 complete"

---

## Self-review

**Spec coverage** — every spec section maps to a task:
- "1 overview + 6 thematic groups, ~30 pages" → Task 1 (overview) + Tasks 2-7 (themes).
- "Mixed walkthrough/reference per topic" → per-page content scope specifies shape.
- "Sidebar with 6 collapsed sub-groups" → Task 8.
- "Categorically absent topics included" → Task 7 (Foundational theme).
- "Memory + README update" → Task 9.

**Placeholder scan** — no TBDs. Each per-page content scope specifies what the page must cover.

**Type consistency** — page-path conventions consistent (`deep-dives/<theme>/<topic>.md`); commit message format consistent.

---

## Risks & contingencies

- **Length variance** — technical-reference pages may run shorter than walkthrough pages. Acceptable per spec (≥ 1,200 words minimum). If a topic genuinely fits in <1,200 words, that's a hint the topic isn't deep enough for a dedicated page; merge into a sibling.
- **Voice drift across 30 pages** — long writing session. Mitigation: page template enforces consistent structure; re-read previous page's TL;DR before drafting next.
- **Sidebar density** — 6 collapsed sub-groups under one new top-level. Manageable; tested pattern from previous sub-projects.
- **Execution time** — 30 pages × ~2 minutes per page = ~60 minutes wall-clock inline. Subagent-driven mode would parallelize but adds coordination overhead.

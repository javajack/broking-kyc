# Broker Process Narrative Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Write a single 8,000–12,000-word narrative `.mdx` page at `kyc-docs-site/src/content/docs/broker-process/narrative.mdx` that walks the full client+broker lifecycle from ACTIVE status through trading, settlement, daily reporting, recurring cycles, and lifecycle events — with liberal cross-links into the Compliance Blueprint, Vendor Atlas, Circulars index, and existing Journey pages.

**Architecture:** Single `.mdx` file built up incrementally — one section per task, each ending in a commit. No research agents (synthesis from accumulated project context). New top-level Starlight sidebar group "Broker Process" added in a later task. Astro build is the verification gate (cross-links must resolve, MDX must parse).

**Tech Stack:** Astro Starlight, `.mdx` (with Starlight components: `Aside`, `StatusFlow`), Pagefind (auto-rebuilt by Astro).

**Note on TDD adaptation:** This is a writing plan, not a code plan. Each task's "test" is `npm run build` succeeding cleanly. Section-level verification is: target word count met, required cross-links present, `Aside` callouts present per section's spec band.

---

## File Structure

**Files to create (final, committed):**

- `kyc-docs-site/src/content/docs/broker-process/narrative.mdx` — the entire narrative page.

**Files to modify:**

- `kyc-docs-site/astro.config.mjs` — add a new top-level sidebar group "Broker Process" between User Journey and Vendor Integrations.

**No working/ files needed** — drafting is inline from accumulated session context, not dispatched to research agents.

---

## Phase 1 — Scaffold (Task 1)

### Task 1: Scaffold the section directory and page skeleton

**Files:**
- Create: `kyc-docs-site/src/content/docs/broker-process/narrative.mdx`

- [ ] **Step 1: Create the directory**

```bash
mkdir -p /home/rakesh/work/broking-kyc/kyc-docs-site/src/content/docs/broker-process
```

Expected: directory created, no error.

- [ ] **Step 2: Write the page skeleton with frontmatter, TL;DR, why-this-order, conceptual overview, and empty section headings**

Write to `kyc-docs-site/src/content/docs/broker-process/narrative.mdx`:

```mdx
---
title: Broker Process Narrative
description: End-to-end story of Indian stock broking operations from the moment a client account flips ACTIVE through the trading day, settlement cycle, recurring compliance cycles, and lifecycle events. Continuous narrative that picks up where the onboarding flow summary ends.
---

import { Aside } from '@astrojs/starlight/components';

> **Why this page is structured this way:** The onboarding [Flow Summary](/broking-kyc/architecture/flow-summary/) takes you from mobile OTP to ACTIVE. From there, real life starts — first trade, day-after-day operations, cycles, modifications, eventual closure. This page is that continuous story, structured chronologically (a single trading day in the middle, bracketed by client lifecycle on either end) so an operator can read once and have a working mental model.

## TL;DR

- **What this is:** narrative continuation of onboarding — picks up at ACTIVE, walks through first trade, a full trading day operator-view (BOD → trading hours → EOD → overnight), settlement, daily reporting, recurring cycles (weekly / monthly / quarterly / annual), and lifecycle events.
- **Audience:** operators, new hires, and reviewers who need an end-to-end mental model before drilling into specific systems.
- **What this is NOT:** how-to build the systems (see future Integration DAG sub-project), vendor selection (see [Vendor Atlas](/broking-kyc/vendors/atlas/)), regulatory primer (see [Regulatory Circulars](/broking-kyc/reference/regulatory-circulars/) and [Compliance Blueprint](/broking-kyc/operations/compliance-blueprint/)).
- AI-generated synthesis. **Verify any specific provision against the linked circulars before acting.**

## Conceptual overview

Indian stock broking operations run on a daily clock. A trading day starts hours before the market opens (BOD scripts pull files from exchanges and depositories) and ends hours after it closes (settlement obligations submitted, ledgers updated, regulatory reports filed). Around this central rhythm sit weekly, monthly, quarterly, and annual cycles. Around the broker's operational rhythm sits the client's account lifecycle — onboarding, first trade, ongoing modifications, eventual dormancy or closure. This page tells that story.

## 1. From ACTIVE to First Trade

_[Section 1 content — drafted in Task 2.]_

## 2. A Trading Day — operator's view

_[Section 2 content — drafted in Tasks 3–4.]_

## 3. The Settlement Cycle

_[Section 3 content — drafted in Task 5.]_

## 4. Daily Reporting Touchpoints

_[Section 4 content — drafted in Task 6.]_

## 5. Recurring Cycles

_[Section 5 content — drafted in Task 7.]_

## 6. Lifecycle Events

_[Section 6 content — drafted in Task 8.]_

## Practical notes

_[Practical notes drafted in Task 9.]_

## Verified through

2026-05-14

---

*AI-generated and not legal, financial, or compliance advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*
```

- [ ] **Step 3: Verify Astro build**

```bash
cd /home/rakesh/work/broking-kyc/kyc-docs-site && npm run build 2>&1 | grep -E '(error|Error|Complete|fail)' | tail -5
```

Expected: build complete; new route `/broker-process/narrative/index.html` listed somewhere in build output (or at least no error).

- [ ] **Step 4: Commit**

```bash
cd /home/rakesh/work/broking-kyc
git add kyc-docs-site/src/content/docs/broker-process/narrative.mdx
git commit -m "Scaffold broker-process narrative page

Frontmatter, why-this-order note, TL;DR, conceptual overview, and
section headings. Each section's content is drafted in subsequent
commits.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Phase 2 — Draft narrative sections (Tasks 2–8)

Each section task replaces its placeholder (`_[Section N content — drafted in Task X.]_`) with prose conforming to the spec's word band and cross-link expectations.

### Task 2: Section 1 — From ACTIVE to First Trade (~800–1,200 words)

**Files:**
- Modify: `kyc-docs-site/src/content/docs/broker-process/narrative.mdx` (replace Section 1 placeholder)

Content to include:

- **Day 0 evening events on ACTIVE:** account status notification to client, welcome email, kit dispatch (digital + optional physical), DP login credentials, limit/segment allocation visible in the broker's app. Reference the [Final Gate](/broking-kyc/architecture/flow-summary/#final-gate) condition (KRA Registered + BO Active + UCC Approved).
- **Day 1 morning:** client logs in, segment status visible (CM live by default; F&O / CD / COM if elected). Sees fund balance, available margin, holding statement (empty if first-timer).
- **Placing the first order:** order capture (web / mobile / API). Pre-trade RMS path step-by-step — segment activation check, available margin lock, exposure margin check, MWPL check, order-type validation (NRML / MIS / CO / BO).
- **Exchange ack and execution:** order flows from broker OMS to exchange via leased line / FIX gateway / ETI; ack returned with order ID; execution if matched; trade confirmation.
- **Intraday MTM accrual:** mark-to-market updates margin used; if MTM loss breaches available margin, RMS triggers margin call or auto-square-off depending on order tag.
- **Contract note generation:** T+24h ECN (Electronic Contract Note) generated with broker DSC signature; SMS + email delivered per DLT-approved template.

**Cross-links** (each must resolve in the existing site):
- [Flow Summary final gate](/broking-kyc/architecture/flow-summary/#final-gate)
- [Compliance Blueprint — Margin domain](/broking-kyc/operations/compliance-blueprint/#margin-compliance-30-entries)
- [Compliance Blueprint — Investor Servicing](/broking-kyc/operations/compliance-blueprint/#investor-servicing-15-entries)
- [Vendor Atlas — OMS-EMS-Trading category](/broking-kyc/vendors/atlas/#oms-ems-trading-platforms-15-products)

**`Aside` callouts** (at least 1):
- `<Aside type="note">` on the "Why pre-trade margin lock happens before exchange ack" (operational explanation).

**Verification:**

- [ ] **Step 1: Edit the file, replacing the placeholder**

Use the Edit tool. The replacement text is the section's prose with the above cross-links and Aside embedded.

- [ ] **Step 2: Build**

```bash
cd /home/rakesh/work/broking-kyc/kyc-docs-site && npm run build 2>&1 | tail -10
```

Expected: build complete, no MDX parse error.

- [ ] **Step 3: Count words and cross-links**

```bash
awk '/^## 1\./,/^## 2\./' /home/rakesh/work/broking-kyc/kyc-docs-site/src/content/docs/broker-process/narrative.mdx | wc -w
awk '/^## 1\./,/^## 2\./' /home/rakesh/work/broking-kyc/kyc-docs-site/src/content/docs/broker-process/narrative.mdx | grep -c '](/broking-kyc/'
```

Expected: 800–1,200 words; ≥ 4 cross-links.

- [ ] **Step 4: Commit**

```bash
cd /home/rakesh/work/broking-kyc
git add kyc-docs-site/src/content/docs/broker-process/narrative.mdx
git commit -m "Draft narrative Section 1: From ACTIVE to First Trade

Day 0 evening through Day 1 first-order pre-trade RMS, exchange ack,
MTM accrual, and T+24h contract note. Cross-links into the flow
summary, compliance blueprint margin and servicing domains, and the
vendor atlas OMS category.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 3: Section 2A — Trading Day BOD + Pre-open (~1,200–1,800 words)

**Files:**
- Modify: `kyc-docs-site/src/content/docs/broker-process/narrative.mdx`

This sub-section covers the BOD (06:00–08:30) and Pre-open (09:00–09:15) phases of Section 2.

Content to include:

- **BOD time window:** 06:00 IST typical start; broker ops teams arrive by 07:30; market services team initiates BOD scripts.
- **BOD downloads from exchanges (per-segment files):** holiday calendar file (annual, refreshed if mid-year amendment), contract files (CM / F&O / CD / COM with day's contracts and lot sizes), SPAN scanrange files (margin parameter file from clearing corp, applies for the day), circuit-filter file (per-stock daily price band), member files (member admission status, suspension list), MTM T-1 file (yesterday's close-MTM for outstanding positions). File transfer mechanisms: SFTP, Connect2NSE / ENIT-New / BEFS, leased line.
- **BOD from depositories:** prior-day obligation files (for settlement obligations due today), pledge status, DDPI activations, transmission updates.
- **RMS overnight parameter reload:** SPAN scanrange ingested, applied. ELM, exposure margin, and additional margins reloaded. Per-client margin recomputed. Available margin published to OMS for pre-trade checks.
- **Surveillance start-of-day:** GSM / ASM / LT-ASM lists ingested, applied to surveillance filters. Restricted stock list, T2T segment list, illiquid securities list updated. Concentrated position alerts re-armed.
- **Operational checks:** trading-software heartbeat to exchange, FIX session login, CTCL approval status verification. Disaster recovery site sync confirmation. Cyber log feed verification (CSCRF requirement).
- **Pre-open (09:00–09:15):** order matching window. Pre-open price discovery via call auction. AMO (After-Market Orders from prior evening) released into pre-open. Pre-trade RMS applies to AMOs as well.

**Cross-links** (≥ 5):
- [Compliance Blueprint — BCP / DR domain](/broking-kyc/operations/compliance-blueprint/#bcp--dr-15-entries)
- [Compliance Blueprint — Cyber Security domain](/broking-kyc/operations/compliance-blueprint/#cyber-security-27-entries)
- [Vendor Atlas — RMS category](/broking-kyc/vendors/atlas/#risk-management-systems-15-products)
- [Vendor Atlas — Market Surveillance](/broking-kyc/vendors/atlas/#market-surveillance-7-products)
- [Circulars — NSE](/broking-kyc/reference/circulars/nse/)
- [Circulars — Clearing Corps](/broking-kyc/reference/circulars/clearing-corps/)

**`Aside` callouts** (≥ 2):
- `<Aside type="tip">` on the "If BOD fails to complete by 09:00, broker can't trade — escalation path".
- `<Aside type="note">` on why SPAN scanrange comes from clearing corp not exchange.

**Verification:**

- [ ] **Step 1: Edit, replacing the relevant placeholder span**

- [ ] **Step 2: Build**

```bash
cd /home/rakesh/work/broking-kyc/kyc-docs-site && npm run build 2>&1 | tail -10
```

- [ ] **Step 3: Word count for the sub-section**

The narrative file uses `## 2. A Trading Day — operator's view` as Section 2 heading, and within it sub-sections will be `### BOD (06:00–08:30)`, `### Pre-open (09:00–09:15)`, etc. Count words from `### BOD` to the heading after Pre-open.

```bash
awk '/^### BOD/,/^### Trading hours/' /home/rakesh/work/broking-kyc/kyc-docs-site/src/content/docs/broker-process/narrative.mdx | wc -w
```

Expected: 1,200–1,800 words covering both BOD and Pre-open.

- [ ] **Step 4: Commit**

```bash
cd /home/rakesh/work/broking-kyc
git add kyc-docs-site/src/content/docs/broker-process/narrative.mdx
git commit -m "Draft narrative Section 2A: BOD + Pre-open

BOD downloads from exchanges and depositories, RMS parameter reload,
surveillance start-of-day, operational health checks, pre-open call
auction with AMO release. Cross-links to BCP/cyber blueprint domains,
RMS and surveillance vendor categories, NSE and clearing-corp circulars.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 4: Section 2B — Trading hours, Closing window, EOD, Overnight (~2,300–3,200 words)

**Files:**
- Modify: `kyc-docs-site/src/content/docs/broker-process/narrative.mdx`

This sub-task covers the remaining sub-sections of Section 2: Trading hours (09:15–15:30), Closing window (15:30–15:40), EOD (15:40–19:00), and Settlement & overnight (19:00–06:00).

Content to include:

- **Trading hours sub-section (09:15–15:30):**
  - Continuous trading. Order flow / execution / position update / MTM in real time.
  - **4 intraday peak margin snapshots** at 11:30 / 12:30 / 13:30 / 14:30 IST — clearing corp captures margin compliance state at each. Daily Margin File (DMF) generated from these snapshots.
  - Real-time RMS: per-client margin recompute on each fill, MTM running totals, auto-square-off triggers if MIS positions exceed margin or breach time-cut.
  - Surveillance during trading: NORMS, Order-to-Trade Ratio (OTR) accumulators, GSM / ASM list-based intervention, social-media surveillance, manipulative trade flagging.
  - Block-deal windows: morning (08:45–09:00) and afternoon (14:35–15:05); separate reporting.
  - MWPL (Market-Wide Position Limit) checks for derivatives; intervention if approaching threshold.
  - Member compliance reporting submitted intraday for time-bound items (technical glitches, operational incidents).
- **Closing window (15:30–15:40):**
  - Closing auction. Settlement-price discovery (volume-weighted average of last half-hour or closing auction price).
  - Final pre-EOD margin snapshot.
- **EOD sub-section (15:40–19:00):**
  - Trade booking — all day's trades reconciled with broker OMS / back-office ledger.
  - Contract note generation — T+24h ECN with broker DSC signature; SMS + email delivery via DLT-approved templates; ECN format per SEBI / ICAI prescribed structure.
  - MTM end-of-day — final MTM applied to outstanding positions.
  - Position files generated and submitted to clearing corp.
  - Obligation files received from clearing — payin / payout amounts and securities.
  - **Peak margin response file** from clearing — reconcile against DMF, flag shortfall penalties.
  - Member compliance reporting — CAR (Compliance Audit Report) submissions, DPC submissions if any.
- **Settlement & overnight sub-section (19:00–06:00):**
  - Payin obligation honoured by broker (funds from clearing bank, securities from depository pool to clearing pool).
  - T+1 payout for day's executed trades on T+1 cycle — securities directly to client demat (post Jun 2024 SEBI direct-payout-to-demat in phases Nov 2024 / Jan-Feb 2025).
  - **Daily client funds upstreaming to clearing corp** per SEBI Jun 2023 mandate; MFOS / FDR / cash collateral as collateral.
  - Bank reconciliation — broker's client funds bank books vs clearing bank confirmations.
  - **KRA daily upload** of new/modified KYC records (within 24h of capture).
  - **CKYC upload** within 7 days of any KYC change.
  - Ledger update — back-office runs nightly batch updating per-client ledger with day's trades, brokerage, STT, GST, exchange charges, SEBI turnover fee, stamp duty, MTM, MTM-realized.
  - Prep for next BOD — system health checks, log rotation, backup verification, DR site replication confirmation.

**Cross-links** (≥ 8):
- [Compliance Blueprint — Margin (peak margin snapshots, DMF)](/broking-kyc/operations/compliance-blueprint/#margin-compliance-30-entries)
- [Compliance Blueprint — Settlement](/broking-kyc/operations/compliance-blueprint/#settlement-22-entries)
- [Compliance Blueprint — Client Funds (upstreaming)](/broking-kyc/operations/compliance-blueprint/#client-funds-21-entries)
- [Compliance Blueprint — Surveillance](/broking-kyc/operations/compliance-blueprint/#surveillance-30-entries)
- [Compliance Blueprint — Investor Servicing (contract notes)](/broking-kyc/operations/compliance-blueprint/#investor-servicing-15-entries)
- [Vendor Atlas — Back-Office](/broking-kyc/vendors/atlas/#back-office-15-products)
- [Vendor Atlas — DLT/SMS/WhatsApp](/broking-kyc/vendors/atlas/#dlt--sms--whatsapp-12-products)
- [Circulars — Clearing Corps](/broking-kyc/reference/circulars/clearing-corps/)
- [Circulars — CDSL](/broking-kyc/reference/circulars/cdsl/)

**`Aside` callouts** (≥ 3):
- `<Aside type="caution">` on peak margin shortfall penalty mechanics.
- `<Aside type="tip">` on the T+1 default → T+0 beta distinction.
- `<Aside type="note">` on how direct-payout-to-demat changed broker pool accounts (CUSPA / CSMFA structure).

**Verification:**

- [ ] **Step 1: Edit, replacing the rest of Section 2 placeholder**

- [ ] **Step 2: Build**

```bash
cd /home/rakesh/work/broking-kyc/kyc-docs-site && npm run build 2>&1 | tail -10
```

- [ ] **Step 3: Word count for the full Section 2**

```bash
awk '/^## 2\./,/^## 3\./' /home/rakesh/work/broking-kyc/kyc-docs-site/src/content/docs/broker-process/narrative.mdx | wc -w
```

Expected: 3,500–5,000 words across all four Section 2 sub-sections (BOD + Pre-open from Task 3 plus Trading hours + Closing + EOD + Overnight from this task).

- [ ] **Step 4: Commit**

```bash
cd /home/rakesh/work/broking-kyc
git add kyc-docs-site/src/content/docs/broker-process/narrative.mdx
git commit -m "Draft narrative Section 2B: trading hours through overnight

Continuous trading, 4 peak margin snapshots, real-time RMS, surveillance,
block deals, MWPL. Closing auction and final pre-EOD snapshot. EOD trade
booking, contract notes, MTM EOD, position and obligation files, peak
margin response. Settlement payin/payout, T+1 default with T+0 beta,
direct-payout-to-demat phases, daily client funds upstreaming, KRA/CKYC
daily upload, ledger update, prep for next BOD.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 5: Section 3 — The Settlement Cycle (~1,000–1,500 words)

**Files:**
- Modify: `kyc-docs-site/src/content/docs/broker-process/narrative.mdx`

Content to include:

- **T+1 default mechanics:** rolling settlement, pay-in obligation by broker T+1 morning, payout to client by T+1 close. Securities and funds flow.
- **T+0 beta scope:** introduced Mar 2024 for top 25 stocks; expanded to top 500 in Dec 2024. Optional alongside T+1. T+0 settlement same day; specific window for order placement.
- **Short delivery → auction:** if broker can't deliver, exchange auctions on T+2 morning to acquire securities; auction price + penalty borne by failing broker.
- **Give-up / take-up:** for institutional trades — execution by one member, clearing by another; give-up obligation transfer mechanism.
- **MTF settlement:** Margin Trading Facility — broker funds the client's purchase; mandatory pledge of bought securities; specific settlement mechanics including unpaid MTF file workflow.
- **Direct payout to demat (SEBI Jun 2024):** phased Nov 2024 (phase 1) and Jan-Feb 2025 (phase 2). Pool accounts restructured (TM CUSPA, CM CUSPA, TM CSMFA). Securities flow direct from clearing to client demat without parking in broker pool.
- **MFOS / FDR upstreaming:** Margin Funded Order System; Fixed Deposit Receipts as collateral; daily upstreaming to clearing per Jun 2023 mandate.
- **ASBA-style UPI Block for QSBs:** mandatory Feb 1, 2025 for Qualified Stock Brokers. Customer's funds blocked in their bank account; debited only on trade execution. Funds earn interest in client's bank; reduces broker's counterparty risk.
- **Failure scenarios:** broker payin default → clearing corp draws from default fund / core SGF; member suspension possible.

**Cross-links** (≥ 4):
- [Compliance Blueprint — Settlement](/broking-kyc/operations/compliance-blueprint/#settlement-22-entries)
- [Compliance Blueprint — Client Funds](/broking-kyc/operations/compliance-blueprint/#client-funds-21-entries)
- [Circulars — SEBI MRD/other (T+0, T+1, direct-payout)](/broking-kyc/reference/circulars/sebi-other/)
- [Circulars — Clearing Corps](/broking-kyc/reference/circulars/clearing-corps/)

**`Aside` callouts** (≥ 2):
- `<Aside type="caution">` on the auction penalty mechanics.
- `<Aside type="note">` on how UPI Block changed the broker's funds-handling model.

**Verification:** Build, word-count, commit.

```bash
awk '/^## 3\./,/^## 4\./' /home/rakesh/work/broking-kyc/kyc-docs-site/src/content/docs/broker-process/narrative.mdx | wc -w
```

Expected: 1,000–1,500 words.

```bash
cd /home/rakesh/work/broking-kyc
git add kyc-docs-site/src/content/docs/broker-process/narrative.mdx
git commit -m "Draft narrative Section 3: Settlement cycle

T+1 default, T+0 beta scope, short-delivery auction, give-up/take-up,
MTF settlement, SEBI Jun-2024 direct payout to demat with phased
rollout, MFOS/FDR upstreaming, UPI Block for QSBs, payin-failure
mechanics.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 6: Section 4 — Daily Reporting Touchpoints (~800–1,200 words)

**Files:**
- Modify: `kyc-docs-site/src/content/docs/broker-process/narrative.mdx`

Content to include:

- **DMF (Daily Margin File)** generated from peak margin snapshots; submitted to clearing corp.
- **CFR (Client Funding Report)** weekly to exchange.
- **UCC daily upload** to NSE / BSE / MCX (new clients onboarded today, plus modifications).
- **KRA daily upload** of new/modified KYC records.
- **Peak margin reports** — 4 snapshots' data with reconciliation.
- **Surveillance reports** — order-to-trade ratio breach lists, GSM-list trade reports, abnormal-trade flags.
- **CSCRF logs** — daily cyber log feeds maintained per CSCRF retention.
- **Technical glitch reports** — if any operational glitch caused order rejection / system downtime > threshold, intraday submission to exchange.
- **CTR (Cash Transaction Report)** filed to FIU-IND when cash transactions > Rs.10 lakh per client.
- **STR (Suspicious Transaction Report)** filed event-triggered to FIU-IND.

For each, cross-link to the corresponding row in the Compliance Blueprint and the relevant circular.

**Cross-links** (≥ 5):
- [Compliance Blueprint — Reporting](/broking-kyc/operations/compliance-blueprint/#reporting-cadences-40-entries)
- [Compliance Blueprint — AML](/broking-kyc/operations/compliance-blueprint/#aml--pmla--sanctions-25-entries)
- [Compliance Blueprint — Surveillance](/broking-kyc/operations/compliance-blueprint/#surveillance-30-entries)
- [Circulars — FIU-IND](/broking-kyc/reference/circulars/fiu-ind/)
- [Circulars — Clearing Corps](/broking-kyc/reference/circulars/clearing-corps/)

**`Aside` callouts** (≥ 1):
- `<Aside type="tip">` on the typical evidence-trail: which file proves which compliance.

**Verification:** Build, word-count, commit.

```bash
awk '/^## 4\./,/^## 5\./' /home/rakesh/work/broking-kyc/kyc-docs-site/src/content/docs/broker-process/narrative.mdx | wc -w
```

Expected: 800–1,200 words.

```bash
cd /home/rakesh/work/broking-kyc
git add kyc-docs-site/src/content/docs/broker-process/narrative.mdx
git commit -m "Draft narrative Section 4: Daily reporting touchpoints

DMF, CFR, UCC daily upload, KRA daily, peak margin reports,
surveillance reports, CSCRF logs, technical glitch reports, CTR/STR
to FIU-IND. Each cross-linked to its blueprint row and circular.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 7: Section 5 — Recurring Cycles (~1,200–1,800 words)

**Files:**
- Modify: `kyc-docs-site/src/content/docs/broker-process/narrative.mdx`

Content to include, grouped by cadence:

- **Weekly:** CFR submission to exchange (Friday cut-off typical), internal reconciliation (broker ledger vs bank vs clearing-corp).
- **Monthly:** Client funding report to exchange (mid-month), GST returns, TDS quarterly returns (filed monthly basis), STT monthly deposit, complaint MIS to exchange and SCORES, networth maintenance check against Rs.3 cr minimum.
- **Quarterly:** Running-account settlement at calendar quarter-ends (Apr / Jul / Oct / Jan) — funds and securities settled to client unless explicit retention authorization; SEBI mandate strict on this. FATCA refresh for foreign clients. BCP drill (or half-yearly depending on member size).
- **Half-yearly:** Compliance certificate to SEBI by Compliance Officer, internal audit report submission.
- **Annual:** Statutory audit (CA firm), KRA audit (system + process), system audit (every 2 years — alternate years), DP audit (CDSL / NSDL — every year for the linked DP), fit-and-proper refresh, NISM re-certification cycles, ITR Form-16A dispatch to clients, advertisement approval renewal cycles, BSE / NSE / MCX membership renewal.
- **Event-triggered (mention briefly):** loss events, technical glitches, KMP changes, segment additions, branch openings.

For each cycle, name the responsible role (Compliance Officer, Principal Officer, Internal Auditor, etc.) and the evidence artefact.

**Cross-links** (≥ 6):
- [Compliance Blueprint — Reporting](/broking-kyc/operations/compliance-blueprint/#reporting-cadences-40-entries)
- [Compliance Blueprint — Audit](/broking-kyc/operations/compliance-blueprint/#audit-cycles-21-entries)
- [Compliance Blueprint — Client Funds (quarterly running-account)](/broking-kyc/operations/compliance-blueprint/#client-funds-21-entries)
- [Compliance Blueprint — Member Compliance](/broking-kyc/operations/compliance-blueprint/#member-compliance-23-entries)
- [Compliance Blueprint — BCP/DR](/broking-kyc/operations/compliance-blueprint/#bcp--dr-15-entries)
- [Circulars — SEBI MIRSD](/broking-kyc/reference/circulars/sebi-mirsd/)

**`Aside` callouts** (≥ 2):
- `<Aside type="caution">` on quarterly running-account settlement strict enforcement.
- `<Aside type="tip">` on the typical compliance-calendar workflow (operators build a calendar from these cadences).

**Verification:** Build, word-count, commit.

```bash
awk '/^## 5\./,/^## 6\./' /home/rakesh/work/broking-kyc/kyc-docs-site/src/content/docs/broker-process/narrative.mdx | wc -w
```

Expected: 1,200–1,800 words.

```bash
cd /home/rakesh/work/broking-kyc
git add kyc-docs-site/src/content/docs/broker-process/narrative.mdx
git commit -m "Draft narrative Section 5: Recurring cycles

Weekly, monthly, quarterly, half-yearly, and annual cycles with named
owner roles and evidence artefacts. Quarterly running-account
settlement mechanics highlighted. Cross-links into reporting, audit,
client-funds, member-compliance, and BCP/DR blueprint domains.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 8: Section 6 — Lifecycle Events (~1,000–1,500 words)

**Files:**
- Modify: `kyc-docs-site/src/content/docs/broker-process/narrative.mdx`

Content to include:

- **Modifications:**
  - Address change — KRA upload + CKYC upload + exchange UCC modification + depository BO modification.
  - Bank account change — penny drop verification + KRA + UCC + depository.
  - Nominee change (post SEBI Jan 2025 — up to 10 nominees).
  - Segment additions — F&O / CD / COM activation with income proof if F&O/COM.
  - Mobile / email change — OTP re-verification.
  - Name change — Unfreeze process on BSE side; UCC modification with proof.
- **Re-KYC periodicity by risk tier:** high 2y / medium 8y / low 10y. Trigger event: anniversary of last KYC validation. Process: re-validate identity + address + contact details; updated KYC artefacts uploaded to KRA and CKYC.
- **Dormancy:** typical thresholds — no trading activity in 12 months (some brokers); 24 months (exchange-level dormancy). Account flagged, segment activations may auto-disable, modifications restricted.
- **Reactivation:** triggered by client request; re-KYC if dormant >12 months; segment re-activation as per current rules; UCC unfreeze / BO reactivation.
- **Voluntary closure:** client request → settle obligations → withdraw funds → release pledged securities → DP BO closure (CDSL / NSDL) → UCC deactivation → KRA closure intimation.
- **Transmission (deceased client):**
  - Single holder deceased → nominee path (KYC of nominee, succession documents) → BO transferred → trading continues or closed.
  - Joint account, one holder deceased → survivor mode → BO continues with survivor.
  - Joint account, all holders deceased → succession via probate or succession certificate.
- **NRI ↔ Resident conversion:**
  - Resident → NRI: PIS letter, NRE/NRO accounts, segment restrictions apply.
  - NRI → Resident: re-KYC as resident, segment changes (more permissive).

**Cross-links** (≥ 5):
- [Compliance Blueprint — KYC lifecycle](/broking-kyc/operations/compliance-blueprint/#kyc-lifecycle-41-entries)
- [Compliance Blueprint — Edge cases](/broking-kyc/operations/compliance-blueprint/#edge-case-compliances-30-entries)
- [Compliance Blueprint — Exch & Depository Reg](/broking-kyc/operations/compliance-blueprint/#exchange--depository-registration-30-entries)
- [Journey — Nominations](/broking-kyc/journey/07-nominations/)
- [Circulars — CDSL](/broking-kyc/reference/circulars/cdsl/)
- [Circulars — NSDL](/broking-kyc/reference/circulars/nsdl/)

**`Aside` callouts** (≥ 2):
- `<Aside type="note">` on the SEBI Jan 2025 nominee revamp (10 nominees max, video opt-out).
- `<Aside type="caution">` on minor → age-18 conversion 30-day deadline.

**Verification:** Build, word-count, commit.

```bash
awk '/^## 6\./,/^## Practical notes/' /home/rakesh/work/broking-kyc/kyc-docs-site/src/content/docs/broker-process/narrative.mdx | wc -w
```

Expected: 1,000–1,500 words.

```bash
cd /home/rakesh/work/broking-kyc
git add kyc-docs-site/src/content/docs/broker-process/narrative.mdx
git commit -m "Draft narrative Section 6: Lifecycle events

Modifications across address/bank/nominee/segment/mobile/email/name,
re-KYC periodicity by risk tier, dormancy and reactivation, voluntary
closure, transmission (single deceased, joint, succession), NRI<->
resident conversion. Cross-links into KYC lifecycle and edge-case
blueprint domains, journey nominations screen, depository circulars.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Phase 3 — Practical notes + sidebar (Tasks 9–10)

### Task 9: Practical notes section

**Files:**
- Modify: `kyc-docs-site/src/content/docs/broker-process/narrative.mdx`

Replace the `_[Practical notes drafted in Task 9.]_` placeholder with 4–6 bullet entries tagged `[industry practice]`, `[gotcha]`, `[cost optimization]`, `[risk trade-off]`.

Suggested entries:

- **[industry practice]** Compliance calendars: ops teams routinely build a master compliance calendar from the recurring cycles section above. The day-of-the-week and day-of-the-month columns drive the weekly ops standup agenda.
- **[gotcha]** The 4 intraday peak margin snapshots (11:30 / 12:30 / 13:30 / 14:30) are *snapshots*, not averages — a margin shortfall in even one snapshot triggers a DMF flag and possible penalty. RMS systems must hold the margin position stable across the full snapshot window.
- **[industry practice]** Direct-payout-to-demat (post Nov 2024 / Jan-Feb 2025) significantly reduced broker pool-account complexity but introduced TM CUSPA / CM CUSPA / TM CSMFA distinctions that require careful chart-of-accounts updates.
- **[cost optimization]** Subscribing to exchange and clearing-corp email circular distribution lists costs nothing and saves the periodic site-scrape effort; for broker compliance teams this is the lowest-overhead reliable feed.
- **[risk trade-off]** Outsourcing back-office to TechExcel / Aastha / Shilpi reduces in-house ops headcount but increases dependence on the vendor's compliance refresh schedule; large brokers retain in-house BO for this reason.
- **[gotcha]** Quarterly running-account settlement on calendar quarter-ends (Apr / Jul / Oct / Jan) is one of the most-penalty-attracting items in SEBI inspections — explicit client authorization for retention is the only exception, and the authorization itself has format requirements.

- [ ] **Step 1: Edit, replacing the placeholder**

- [ ] **Step 2: Build**

```bash
cd /home/rakesh/work/broking-kyc/kyc-docs-site && npm run build 2>&1 | tail -10
```

- [ ] **Step 3: Commit**

```bash
cd /home/rakesh/work/broking-kyc
git add kyc-docs-site/src/content/docs/broker-process/narrative.mdx
git commit -m "Draft narrative practical notes

Compliance calendars, peak margin snapshot mechanics, direct-payout
pool-account distinctions, exchange email circular feeds, back-office
outsourcing trade-offs, quarterly running-account settlement penalty
exposure.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 10: Sidebar + final verification + memory

**Files:**
- Modify: `kyc-docs-site/astro.config.mjs`

- [ ] **Step 1: Add the new sidebar group**

In `astro.config.mjs`, between the `Vendor Integrations` block and the `User Journey` block (i.e., after User Journey, before Vendor Integrations), insert:

```js
{
  label: "Broker Process",
  items: [
    { label: "End-to-End Narrative", slug: "broker-process/narrative" },
  ],
},
```

- [ ] **Step 2: Build to verify sidebar + page render**

```bash
cd /home/rakesh/work/broking-kyc/kyc-docs-site && npm run build 2>&1 | tail -15
```

Expected: build complete, new route `/broker-process/narrative/index.html` listed; no errors.

- [ ] **Step 3: Word count and cross-link checks**

```bash
echo "=== Total word count ==="
wc -w /home/rakesh/work/broking-kyc/kyc-docs-site/src/content/docs/broker-process/narrative.mdx
echo "=== Cross-link count ==="
grep -c '](/broking-kyc/' /home/rakesh/work/broking-kyc/kyc-docs-site/src/content/docs/broker-process/narrative.mdx
echo "=== Aside count ==="
grep -c '<Aside ' /home/rakesh/work/broking-kyc/kyc-docs-site/src/content/docs/broker-process/narrative.mdx
```

Expected: ≥ 8,000 words total; ≥ 30 cross-links; ≥ 12 Asides (matches spec success criteria: ≥ 30 cross-links, ≥ 5 Asides — Asides budget exceeds spec minimum).

- [ ] **Step 4: Update memory**

Edit `/home/rakesh/.claude/projects/-home-rakesh-work-broking-kyc/memory/project_overview.md`, append to the "Sub-projects ... complete" sentence:

```markdown
... and #6 Broker Process Narrative (single 8-12K-word continuous explainer at broker-process/narrative.mdx).
```

Update `/home/rakesh/.claude/projects/-home-rakesh-work-broking-kyc/memory/MEMORY.md`, append:

```markdown
- [Broker process narrative](broker_process_narrative.md) — 2026-05-14 addition: continuous narrative picking up from flow-summary's ACTIVE through trading day, settlement, cycles, lifecycle events
```

Create `/home/rakesh/.claude/projects/-home-rakesh-work-broking-kyc/memory/broker_process_narrative.md`:

```markdown
---
name: broker-process-narrative
description: Single 8-12K-word narrative at kyc-docs-site/src/content/docs/broker-process/narrative.mdx covering ACTIVE-to-closure broker operations. Synthesis from project's accumulated material; not a how-to.
metadata:
  type: project
---

The narrative page is the project's bridge between breadth-first reference (circulars / blueprint / atlas) and depth-first per-domain deep-dives (future sub-projects). It tells the operator's story chronologically and cross-links liberally into the reference pages.

**Why:** users coming to the site previously had no continuous explainer of how broking operations work end-to-end; reference pages alone don't show the connections.

**How to apply:** when asked about a specific phase (e.g., "what happens at EOD?"), refer to the relevant section of this page first, then drill into blueprint rows or circulars for evidence/citations. The narrative deliberately AVOIDS naming specific vendors (atlas is the one place vendor names live) and AVOIDS regulatory detail (circulars are the citation source).

Sections: From ACTIVE to First Trade · A Trading Day (BOD/Pre-open/Trading hours/Closing/EOD/Overnight) · Settlement Cycle · Daily Reporting · Recurring Cycles (weekly/monthly/quarterly/annual) · Lifecycle Events (modifications, dormancy, closure, transmission, NRI conversion).

Related: [[project-overview]], [[blueprint-and-atlas]], [[regulatory-anchors]].
```

- [ ] **Step 5: Commit sidebar + memory updates**

```bash
cd /home/rakesh/work/broking-kyc
git add kyc-docs-site/astro.config.mjs
git commit -m "Expose Broker Process narrative in sidebar

New top-level Broker Process group with End-to-End Narrative entry,
placed between User Journey and Vendor Integrations.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Self-review

**Spec coverage** — each spec requirement maps to a task:
- "Single 8-12K word page at broker-process/narrative.mdx" → Tasks 1–9 (scaffold + 6 sections + practical notes)
- "Six mechanics sections in order" → Tasks 2–8 (one per section, Section 2 split across Tasks 3+4 due to size)
- "≥30 cross-links" → cumulative across Tasks 2–8 (each section's cross-link budget specified)
- "≥5 Aside callouts" → cumulative; Task 10 verification counts Asides
- "New top-level sidebar group Broker Process" → Task 10
- "Documentation conventions throughout" → Task 1 (TL;DR + why-this-order + overview baked into scaffold) + Task 9 (practical notes) + Task 10 (build verifies stamp + disclaimer present)
- "Verified through stamp + AI disclaimer" → Task 1 (scaffold) — verified at end via Task 10 build
- "No vendor names in narrative body except regulator-named entities" → spec rule baked into each section's content guidance

**Placeholder scan** — sections in the scaffold use `_[Section N content — drafted in Task X.]_` as explicit placeholders that get replaced by their drafting task. These are intentional, marked as drafting handoffs. No silent TBDs. No "implement later" patterns. Word-count and cross-link verification commands are exact.

**Type consistency** — section heading slugs and cross-link anchors used consistently. Each Section N's heading is `## N. <title>`, and cross-link targets to those headings would use `#n-title-slug` if needed (none currently use intra-page anchors).

---

## Risks & contingencies

- **Length overshoot**: if a section drifts past its upper band, split into sub-headings within the same section rather than a new top-level section. Better to keep the page coherent than to perfectly hit bands.
- **Build failure on MDX**: if Aside or other component fails to parse, Astro reports the line — fix and re-build. Don't commit a broken state.
- **Cross-link rot**: anchor slugs in the blueprint / atlas / circulars sub-pages are stable today; if those pages restructure later, this narrative's links need a refresh. Document this in the memory entry.
- **Voice drift**: a long narrative drafted in one session can shift voice between sections. Mitigation: re-read the previous section before drafting the next, keep tone third-person operational throughout.

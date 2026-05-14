# Integration Choreography DAG Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship 7 new markdown pages — 1 overview + 6 per-phase pages under `operations/integration-dag/` — mapping the integration call dependency graph across onboarding, BOD, trading hours, EOD & settlement, recurring cycles, and lifecycle events. ASCII DAGs in fenced code blocks; per-node detail tables with idempotency / retry / rollback / SLA / failure surface / spec source.

**Architecture:** Inline synthesis from accumulated session context (broker-process narrative + compliance blueprint + flow summary + field atlas + circulars index). No research agents. One commit per page. New "Integration DAG" collapsed group added to the Operations sidebar at the end.

**Tech Stack:** Astro Starlight (no build changes — ASCII diagrams in fenced code blocks), `.md` / `.mdx` (with Starlight `Aside` components), Pagefind (auto-rebuilt).

**Note on TDD adaptation:** Content/writing plan. Verification: Astro `npm run build` succeeds, page word count and DAG/table counts meet per-page targets, all cross-links resolve.

---

## File Structure

**Files to create (final, committed):**

- `kyc-docs-site/src/content/docs/operations/integration-dag.md` — overview page.
- `kyc-docs-site/src/content/docs/operations/integration-dag/onboarding.md`
- `kyc-docs-site/src/content/docs/operations/integration-dag/bod.md`
- `kyc-docs-site/src/content/docs/operations/integration-dag/trading-hours.md`
- `kyc-docs-site/src/content/docs/operations/integration-dag/eod-settlement.md`
- `kyc-docs-site/src/content/docs/operations/integration-dag/recurring-cycles.md`
- `kyc-docs-site/src/content/docs/operations/integration-dag/lifecycle-events.md`

**Files to modify:**

- `kyc-docs-site/astro.config.mjs` — add new "Integration DAG" collapsed group under Operations.

**Files to create (memory side, after all pages):**

- `/home/rakesh/.claude/projects/-home-rakesh-work-broking-kyc/memory/integration_dag.md` — memory entry.

---

## Phase 1 — Scaffold (Task 1)

### Task 1: Scaffold directory and overview page skeleton

**Files:**
- Create: `kyc-docs-site/src/content/docs/operations/integration-dag/` directory.
- Create: `kyc-docs-site/src/content/docs/operations/integration-dag.md` (overview placeholder).

- [ ] **Step 1: Create the directory**

```bash
mkdir -p /home/rakesh/work/broking-kyc/kyc-docs-site/src/content/docs/operations/integration-dag
ls /home/rakesh/work/broking-kyc/kyc-docs-site/src/content/docs/operations/integration-dag/
```

Expected: empty directory created.

- [ ] **Step 2: Write the overview page**

Write to `kyc-docs-site/src/content/docs/operations/integration-dag.md`:

```markdown
---
title: Integration Choreography DAG
description: Dependency graph for every significant integration call across the six phases of broker operations — onboarding, BOD, trading hours, EOD & settlement, recurring cycles, lifecycle events. ASCII DAGs with per-node detail (idempotency, retry, rollback, SLA, failure surface, spec source).
---

> **Why this page is structured this way:** The [Broker Process Narrative](/broking-kyc/broker-process/narrative/) tells the operational story chronologically. The [Compliance Blueprint](/broking-kyc/operations/compliance-blueprint/) inventories what must be done. The [Field-level Data Flow Atlas](/broking-kyc/reference/field-atlas/) maps where each field flows. This page tells **what must run before what** — the orchestration / dependency layer. Each phase has its own page with ASCII DAGs and per-node detail.

## TL;DR

- Six phases, six per-phase pages, ASCII DAGs in fenced code blocks (no new tooling).
- Every node has: `node_id`, `operation`, `depends_on`, `blocks`, `parallel_eligible`, `idempotent`, `retry_policy`, `rollback`, `sla`, `failure_surface`, `spec_source`.
- ≥ 80 unique nodes across the six phases.
- ≥ 60% of nodes cite a public spec source; the rest tagged `[industry typical]` (orchestration patterns are vendor-specific).
- AI-generated synthesis. **Verify retry / SLA / rollback patterns against your own systems before relying on these in production.**

## Conceptual overview

A broker's day is a graph, not a list. Some calls fan out in parallel (the 4 async calls on PAN-DOB submit); some calls fan in to a gate (the 8 batch pipelines all need to complete before ACTIVE flips); some calls are time-locked (peak-margin snapshots at fixed clock times); some are event-triggered (transmission flow triggers on death-certificate submission). This section makes the structure explicit.

### Cross-cutting principles

- **Idempotency** — most integration calls are idempotent by reference_id; retry-on-failure is safe. Non-idempotent calls (e.g., money movement) require explicit deduplication.
- **Retry policy** — typical: 3× exponential backoff for transient errors (HTTP 5xx, timeout); manual queue for persistent errors (4xx, validation failure). Specific calls override.
- **Rollback** — most failed downstream steps don't rollback upstream (KRA upload doesn't un-do because exchange-UCC upload failed); the application retries the failing step. Money movement is the exception: failed settlements may trigger compensating transactions.
- **Parallel-vs-sequential principles** — calls are parallel by default unless they share state (margin computation) or depend on each other's output (PAN-Aadhaar link check needs PAN status). Onboarding parallelism is well-documented in the [Flow Summary](/broking-kyc/architecture/flow-summary/).

## Phases

| Phase | Page | What it covers |
| --- | --- | --- |
| Onboarding | [onboarding](./integration-dag/onboarding/) | 9-screen client flow + 4-parallel async on Screen 2 + maker-checker + 8 batch pipelines |
| BOD | [bod](./integration-dag/bod/) | File ingestion + RMS reload + surveillance start-of-day + health checks |
| Trading hours | [trading-hours](./integration-dag/trading-hours/) | Pre-trade RMS + execution + intraday MTM + 4 peak-margin snapshots + surveillance |
| EOD & settlement | [eod-settlement](./integration-dag/eod-settlement/) | Trade booking + contract notes + position files + obligation files + payin/payout + upstreaming |
| Recurring cycles | [recurring-cycles](./integration-dag/recurring-cycles/) | Weekly / monthly / quarterly / annual cadences |
| Lifecycle events | [lifecycle-events](./integration-dag/lifecycle-events/) | Modification + transmission + dormancy + closure DAGs |

## Practical notes

- **[industry practice]** Most brokers build the orchestration layer in-house even when they buy the OMS / RMS / back-office from vendors — orchestration is where the broker's specific operational philosophy lives (retry aggressiveness, manual-queue thresholds, escalation paths).
- **[gotcha]** Operations new to the domain often assume KRA / CKYC / exchange UCC must run in strict order. In practice they run in parallel for new clients (no inter-dependency) but in strict order for modifications (KRA update → then exchange UCC update — exchange validates against KRA's state).
- **[risk trade-off]** Tighter retry policies reduce manual queue burden but increase false-positive call volume to regulators (KRA, clearing corp); looser policies reduce noise but increase ops headcount.
- **[cost optimization]** The 4 peak-margin snapshots are the highest-cost RMS event of the day. Pre-computing snapshot-relevant state at 11:25 / 12:25 / 13:25 / 14:25 (5 minutes before the snapshot) is a common operational optimization to avoid last-second computation pressure.

## Verified through

2026-05-14

---

*AI-generated and not legal, financial, or compliance advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*
```

- [ ] **Step 3: Build verify**

```bash
cd /home/rakesh/work/broking-kyc/kyc-docs-site && npm run build 2>&1 | grep -E '(error|Error|Complete|integration-dag)' | tail -5
```

Expected: build complete, `/operations/integration-dag/index.html` listed.

- [ ] **Step 4: Commit scaffold**

```bash
cd /home/rakesh/work/broking-kyc
git add kyc-docs-site/src/content/docs/operations/integration-dag.md
git commit -m "Scaffold integration DAG overview page

Frontmatter, why-this-order note, TL;DR, conceptual overview with
cross-cutting principles (idempotency, retry, rollback, parallel-vs-
sequential), phase index, practical notes. Per-phase pages drafted in
subsequent commits.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Phase 2 — Draft per-phase pages (Tasks 2–7)

Each per-phase page follows the same structure: TL;DR → why-this-order → conceptual overview → ASCII DAG(s) → dependency table → per-node detail → practical notes → verified-through → AI disclaimer.

### Task 2: Onboarding DAG

**Files:**
- Create: `kyc-docs-site/src/content/docs/operations/integration-dag/onboarding.md`

Content must cover:

- **DAG 1**: Screen 1 → Screen 2 entry → 4 parallel async calls (PAN verify, KRA lookup, CKYC search, AML screen) → DigiLocker redirect → Screen 4 convergence.
- **DAG 2**: Screen 5 bank → penny drop async → Screen 6 → income verification (if F&O/COM) → Screen 7 → Screen 8 blocking gate (all async results must converge) → Screen 9 eSign.
- **DAG 3**: Post-eSign → maker review → checker approval → fan-out to 8 parallel batch pipelines (KRA, CKYC, NSE UCC, BSE UCC, MCX UCC, CDSL BO, NSDL BO, Income) → final gate (KRA Registered + BO Active + UCC Approved) → ACTIVE.

Each ASCII DAG uses standard arrow notation:

```
A ──> B ──> C
│           │
└──> D ─────┘ (joins)
```

Per-node detail table covers ~25–35 nodes across the 3 sub-DAGs.

- [ ] **Step 1: Draft the page**

Write to `kyc-docs-site/src/content/docs/operations/integration-dag/onboarding.md` with:
- Frontmatter + why-this-order + TL;DR + conceptual overview.
- 3 ASCII DAGs in fenced code blocks (Screen 1-4 convergence, Screen 5-9 with blocking gate, post-eSign batch pipelines).
- One dependency table summarizing the 3 DAGs.
- One per-node detail table with all 11 columns from the spec for each of the ~25-35 nodes.
- Practical notes section (≥3 entries tagged `[industry practice]` / `[gotcha]` / `[risk trade-off]` / `[cost optimization]`).
- Verified-through + AI disclaimer.

Cross-links to: flow-summary, blueprint margin/onboarding domains, atlas KRA/CKYC/UCC/BO destinations, circulars (SEBI MIRSD, NSE, BSE, MCX, CDSL, NSDL).

- [ ] **Step 2: Build verify**

```bash
cd /home/rakesh/work/broking-kyc/kyc-docs-site && npm run build 2>&1 | grep -E '(error|Error|Complete|onboarding)' | tail -5
```

Expected: build complete; `/operations/integration-dag/onboarding/index.html` listed.

- [ ] **Step 3: Verify counts**

```bash
echo "=== Node count ==="
grep -cE '^\| ONB-' /home/rakesh/work/broking-kyc/kyc-docs-site/src/content/docs/operations/integration-dag/onboarding.md
echo "=== Cross-links ==="
grep -c '](/broking-kyc/' /home/rakesh/work/broking-kyc/kyc-docs-site/src/content/docs/operations/integration-dag/onboarding.md
echo "=== ASCII DAG fenced blocks ==="
grep -cE '^```' /home/rakesh/work/broking-kyc/kyc-docs-site/src/content/docs/operations/integration-dag/onboarding.md
```

Expected: ≥ 25 nodes, ≥ 6 cross-links, ≥ 6 fence delimiters (3 DAGs × 2 fences each).

- [ ] **Step 4: Commit**

```bash
cd /home/rakesh/work/broking-kyc
git add kyc-docs-site/src/content/docs/operations/integration-dag/onboarding.md
git commit -m "Draft integration DAG: Onboarding phase

9-screen client flow with 4-parallel async on Screen 2, Screen 8
blocking gate, post-eSign maker-checker, 8 batch pipelines fan-out,
final ACTIVE gate. ASCII DAGs + per-node detail with idempotency,
retry, rollback, SLA, failure surface, spec source.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 3: BOD DAG

**Files:**
- Create: `kyc-docs-site/src/content/docs/operations/integration-dag/bod.md`

Content must cover (per the broker-process narrative Section 2A):
- Holiday calendar download (entry node).
- Parallel fan-out: contract files (CM, F&O, CD), SPAN scanrange, circuit-filter, member files, MTM T-1.
- From depositories: prior-day obligation files, pledge status, DDPI activations, transmission updates.
- RMS parameter reload (depends on SPAN scanrange + MTM T-1).
- Surveillance start-of-day (depends on GSM/ASM lists download).
- Operational health checks (FIX login, CTCL status, DR replication, CSCRF logs) — parallel with the above.
- Final readiness gate: RMS ready + surveillance ready + health-check pass → market open at 09:00.

Targets: ~20–25 nodes, ≥ 4 cross-links, ≥ 2 ASCII DAGs (main file-ingestion graph + health-check subgraph).

- [ ] **Step 1: Draft the page**

Same structure as Task 2. Use `BOD-*` node ID prefix.

- [ ] **Step 2: Build verify**

```bash
cd /home/rakesh/work/broking-kyc/kyc-docs-site && npm run build 2>&1 | tail -5
```

- [ ] **Step 3: Verify counts**

```bash
grep -cE '^\| BOD-' /home/rakesh/work/broking-kyc/kyc-docs-site/src/content/docs/operations/integration-dag/bod.md
grep -c '](/broking-kyc/' /home/rakesh/work/broking-kyc/kyc-docs-site/src/content/docs/operations/integration-dag/bod.md
```

Expected: ≥ 20 nodes, ≥ 4 cross-links.

- [ ] **Step 4: Commit**

```bash
cd /home/rakesh/work/broking-kyc
git add kyc-docs-site/src/content/docs/operations/integration-dag/bod.md
git commit -m "Draft integration DAG: BOD phase

File ingestion (holiday cal, contracts, SPAN, circuit-filter, MTM T-1,
member files), depository pre-fetch (obligation files, DDPI status,
transmission), RMS parameter reload, surveillance start-of-day,
operational health checks, market-open readiness gate. ASCII DAGs +
per-node detail.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 4: Trading-hours DAG

**Files:**
- Create: `kyc-docs-site/src/content/docs/operations/integration-dag/trading-hours.md`

Content must cover:
- Pre-trade RMS pipeline (segment / margin / MWPL / order-type / surveillance — sequential within an order).
- Order release to exchange via FIX / Connect2NSE / BEFS / CTCL.
- Execution event → trade booking → MTM update → margin recompute (loop).
- 4 peak-margin snapshots at fixed clock times (11:30, 12:30, 13:30, 14:30) — each is a time-locked event that fans out to per-client margin compute.
- DMF row generation (post each snapshot).
- Intraday surveillance loops (NORMS, OTR accumulator, GSM/ASM intervention).
- Block-deal windows (morning 08:45–09:00, afternoon 14:35–15:05) — separate parallel path.
- Closing window (15:30–15:40) → settlement price discovery.

Targets: ~25–30 nodes, ≥ 5 cross-links, ≥ 3 ASCII DAGs (pre-trade pipeline + intraday loop with peak-margin snapshots + closing window).

- [ ] **Step 1: Draft the page**

Same structure. `TH-*` node ID prefix.

- [ ] **Step 2-4: Build + verify + commit** with similar checks as Task 3, commit message:

```
Draft integration DAG: Trading hours phase

Pre-trade RMS pipeline (segment/margin/MWPL/order-type/surveillance),
order release, execution → trade-booking → MTM → margin recompute
loop, 4 peak-margin snapshots at 11:30/12:30/13:30/14:30 with DMF row
generation, intraday surveillance (NORMS/OTR/GSM/ASM), block-deal
windows, closing-window settlement price discovery.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
```

---

### Task 5: EOD & settlement DAG

**Files:**
- Create: `kyc-docs-site/src/content/docs/operations/integration-dag/eod-settlement.md`

Content must cover:
- EOD trigger at 15:40 → trade booking reconciliation (parallel: CM, F&O, CD, COM).
- Contract note generation (per-client batch, DSC sign, SMS/email dispatch).
- MTM end-of-day computation.
- Position file generation → clearing corp upload.
- Obligation file ingestion from clearing → broker pay-in / pay-out instructions.
- Peak-margin response file ingestion → DMF reconciliation.
- Member compliance reporting (CAR, DPC).
- Payin obligation (T+1 morning): funds bank transfer to clearing bank + securities pledge release.
- Payout: clearing corp → broker's client funds bank account (funds); clearing corp → client demat direct (securities, post-Jun-2024).
- Daily client funds upstreaming to clearing corp.
- Bank reconciliation.
- KRA daily upload, CKYC daily upload, ledger nightly batch.
- BOD prep (log rotation, backup verify, DR replication confirm).

Targets: ~30–40 nodes, ≥ 6 cross-links, ≥ 4 ASCII DAGs.

- [ ] **Step 1-4: Draft / build / verify / commit** with `EOD-*` prefix; commit message:

```
Draft integration DAG: EOD & settlement phase

EOD trade booking, contract note generation (DSC + DLT dispatch),
MTM EOD, position/obligation file exchange with clearing, peak-margin
response reconciliation, member compliance reports, T+1 payin/payout
with direct-payout-to-demat, daily client-funds upstreaming, bank
reconciliation, KRA/CKYC daily uploads, ledger nightly batch, BOD prep.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
```

---

### Task 6: Recurring cycles

**Files:**
- Create: `kyc-docs-site/src/content/docs/operations/integration-dag/recurring-cycles.md`

This page is less DAG-heavy and more temporal-dependency-table-heavy since cycles are time-locked rather than call-chained. Content:
- Weekly: CFR submission Friday cut-off → exchange ack.
- Monthly: client funding, GST, TDS, STT, complaint MIS, networth check — these run in parallel as independent monthly tracks.
- Quarterly: running-account settlement (calendar quarter-end strict trigger) → per-client sweep → confirmation artefact.
- Half-yearly: compliance certificate, internal audit submission.
- Annual: statutory audit → KRA audit → DP audit → system audit (alternate years) → fit-and-proper refresh.

Use one DAG showing the cycle dependencies (e.g., monthly networth check feeds quarterly running-account settlement which feeds half-yearly compliance certificate which feeds annual statutory audit). Plus one per-cycle table.

Targets: ~15–20 nodes, ≥ 4 cross-links, ≥ 1 ASCII DAG plus per-cycle dependency tables.

- [ ] **Step 1-4: Draft / build / verify / commit** with `CYC-*` prefix; commit message:

```
Draft integration DAG: Recurring cycles phase

Weekly CFR, monthly (client funding/GST/TDS/STT/MIS/networth),
quarterly (running-account settlement, FATCA refresh, BCP drill),
half-yearly (compliance certificate, internal audit), annual (statutory
/ KRA / DP / system audits, fit-and-proper, NISM, Form-16A,
membership renewal). DAG of cycle dependencies + per-cycle tables.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
```

---

### Task 7: Lifecycle events

**Files:**
- Create: `kyc-docs-site/src/content/docs/operations/integration-dag/lifecycle-events.md`

Content must cover several event-triggered DAGs:
- **Modification DAG**: client request → validation (penny drop for bank / OTP for mobile/email / proof upload for address-name-DOB) → KRA upload → CKYC upload → exchange UCC update → depository BO update. Sequential because exchange/depository validate against KRA's new state.
- **Transmission DAG (single deceased)**: death certificate submission → nominee KYC verification → claim form processing → DP transfer → trading-account transfer/closure decision → optional re-onboard for nominee.
- **Transmission DAG (joint deceased)**: survivor-mode → death certificate → BO record update → continued trading.
- **Dormancy → reactivation DAG**: 12-month no-trade detection → flag → segment auto-disable → reactivation request → re-KYC (if >24m dormant) → segment re-activate → BO + UCC unfreeze.
- **Closure DAG**: client request → outstanding settlement check → fund withdrawal → pledge release → DP BO closure → UCC deactivation → KRA closure intimation.

Targets: ~20–30 nodes across the multiple DAGs, ≥ 5 cross-links, ≥ 4 ASCII DAGs.

- [ ] **Step 1-4: Draft / build / verify / commit** with `LC-*` prefix; commit message:

```
Draft integration DAG: Lifecycle events phase

Modification (address/bank/nominee/segment/mobile/email/name) sequential
through KRA → CKYC → exchange UCC → depository BO. Transmission
(single deceased nominee path, joint survivor path, succession path).
Dormancy → reactivation. Voluntary closure 6-step procedure.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
```

---

## Phase 3 — Sidebar + memory + final verify (Tasks 8–9)

### Task 8: Update Astro sidebar

**Files:**
- Modify: `kyc-docs-site/astro.config.mjs`

- [ ] **Step 1: Add Integration DAG collapsed group under Operations**

In `astro.config.mjs`, find the Operations sidebar group. Add a new collapsed sub-group **after** the existing `"Status Machine"` entry (or wherever fits the flow — Operations group has Batch Pipeline, Exchange Registration, 6-Attribute Matching, Admin Workflow, Status Machine, Error Handling, Audit & Compliance, Compliance Blueprint already):

```js
{
  label: "Integration DAG",
  collapsed: true,
  items: [
    { label: "Overview", slug: "operations/integration-dag" },
    { label: "Onboarding", slug: "operations/integration-dag/onboarding" },
    { label: "BOD", slug: "operations/integration-dag/bod" },
    { label: "Trading Hours", slug: "operations/integration-dag/trading-hours" },
    { label: "EOD & Settlement", slug: "operations/integration-dag/eod-settlement" },
    { label: "Recurring Cycles", slug: "operations/integration-dag/recurring-cycles" },
    { label: "Lifecycle Events", slug: "operations/integration-dag/lifecycle-events" },
  ],
},
```

- [ ] **Step 2: Build verify**

```bash
cd /home/rakesh/work/broking-kyc/kyc-docs-site && npm run build 2>&1 | grep -E '(error|Error|Complete|page\(s\))' | tail -3
```

Expected: build complete; ~135 pages total now.

- [ ] **Step 3: Commit sidebar**

```bash
cd /home/rakesh/work/broking-kyc
git add kyc-docs-site/astro.config.mjs
git commit -m "Expose Integration DAG in sidebar

New Integration DAG collapsed group under Operations with Overview +
6 per-phase entries (Onboarding, BOD, Trading Hours, EOD & Settlement,
Recurring Cycles, Lifecycle Events).

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 9: Memory + README + final verify

**Files:**
- Create: `/home/rakesh/.claude/projects/-home-rakesh-work-broking-kyc/memory/integration_dag.md`
- Modify: `/home/rakesh/.claude/projects/-home-rakesh-work-broking-kyc/memory/MEMORY.md`
- Modify: `/home/rakesh/.claude/projects/-home-rakesh-work-broking-kyc/memory/project_overview.md`
- Modify: `README.md` — add Integration DAG to Compliance & Vendor Coverage section.

- [ ] **Step 1: Create memory entry**

Write `/home/rakesh/.claude/projects/-home-rakesh-work-broking-kyc/memory/integration_dag.md`:

```markdown
---
name: integration-dag
description: Sub-project #4 deliverable (2026-05-14). Integration Choreography DAG at operations/integration-dag/ with 1 overview + 6 per-phase pages mapping execution-order dependencies. ASCII DAGs + per-node detail (idempotency, retry, rollback, SLA, failure surface, spec source).
metadata:
  type: project
---

The DAG complements the chronological broker-process narrative by making the **dependency structure** explicit. Each phase has its own page with ASCII DAGs in fenced code blocks and per-node detail tables.

**Phases:** Onboarding (9-screen + 4-parallel async + 8 batch pipelines) · BOD (file ingestion + RMS reload) · Trading hours (pre-trade RMS, 4 peak-margin snapshots, surveillance loops) · EOD & settlement (trade booking, contract notes, payin/payout, upstreaming) · Recurring cycles (weekly/monthly/quarterly/annual cadences) · Lifecycle events (modification, transmission, dormancy, closure).

**Why:** broker-process narrative tells the story chronologically; this DAG tells what must run before what. Critical for orchestration design, failure-recovery planning, and parallelism opportunities.

**How to apply:**
- Designing an orchestrator (Airflow / Temporal / custom): start at the relevant phase's DAG page; lift node IDs and dependencies directly.
- Failure analysis: when an integration call fails, the per-node detail table tells you what depended on it (blocks column), what to retry (retry_policy), and what to rollback (rollback column).
- Parallelism review: per-node `parallel_eligible` column shows what can run concurrently. Most onboarding async calls are mutually parallel; modification calls are strictly sequential.

**Synthesis source:** broker-process narrative + compliance blueprint + flow summary + field atlas + circulars. No new research agents.

Related: [[project-overview]], [[broker-process-narrative]], [[blueprint-and-atlas]], [[field-atlas]], [[regulatory-anchors]].
```

- [ ] **Step 2: Update MEMORY.md index**

Append to `/home/rakesh/.claude/projects/-home-rakesh-work-broking-kyc/memory/MEMORY.md`:

```markdown
- [Integration DAG](integration_dag.md) — 2026-05-14: dependency-graph view at operations/integration-dag/; 1 overview + 6 per-phase pages; complements broker-process narrative (chronological) with execution-order structure
```

- [ ] **Step 3: Update project_overview.md**

Change the "Sub-projects complete" sentence to:

```markdown
Sub-projects #1, #2, #3, #4, #6, #7 complete; #5 KYC Lifecycle beyond onboarding remains queued.
```

- [ ] **Step 4: README update**

In `README.md`, find the `## Compliance & Vendor Coverage` section. Append a fourth bullet after the Field Atlas bullet:

```markdown
- **[Integration DAG](https://javajack.github.io/broking-kyc/operations/integration-dag/)** — dependency graph of every significant integration call across six phases (onboarding, BOD, trading hours, EOD & settlement, recurring cycles, lifecycle events). ASCII DAGs + per-node detail (idempotency, retry, rollback, SLA, failure surface, spec source).
```

- [ ] **Step 5: Final build sanity**

```bash
cd /home/rakesh/work/broking-kyc/kyc-docs-site && npm run build 2>&1 | grep -E '(error|Error|Complete|page\(s\) built)' | tail -3
```

Expected: build complete; no errors.

- [ ] **Step 6: Commit memory + README**

```bash
cd /home/rakesh/work/broking-kyc
git add README.md
git commit -m "Link Integration DAG from README

New Integration DAG bullet in Compliance & Vendor Coverage section
pointing to the operations/integration-dag/ overview.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

- [ ] **Step 7: Final git state check**

```bash
git -C /home/rakesh/work/broking-kyc log --oneline origin/main..HEAD | head -15
git -C /home/rakesh/work/broking-kyc log --oneline origin/main..HEAD | wc -l
```

Expected: commit count increased by ~10 (1 scaffold + 6 per-phase + 1 sidebar + 1 README + this).

---

## Self-review

**Spec coverage** — each spec section maps to a task:
- "1 overview + 6 per-phase pages" → Task 1 (overview) + Tasks 2–7 (per-phase).
- "ASCII DAGs in fenced code blocks" → each per-phase task requires fenced DAGs.
- "Per-node detail with all 11 columns" → each per-phase task requires the table.
- "≥80 nodes total" → Tasks 2–7 cumulative target: 25 + 20 + 25 + 30 + 15 + 20 = 135 nodes minimum.
- "≥60% spec-cited" → each per-phase task draws from circulars index for citations.
- "Sidebar under Operations" → Task 8.
- "Cross-link to narrative / blueprint / atlas / circulars" → each per-phase task requires ≥4 cross-links.
- "Memory update" → Task 9.

**Placeholder scan** — no "TBD", "TODO", "implement later", or "Similar to Task N". Each task has explicit content requirements with measurable verification commands.

**Type consistency** — node ID prefixes `ONB-` / `BOD-` / `TH-` / `EOD-` / `CYC-` / `LC-` used consistently across tasks and the per-node-detail table schema.

---

## Risks & contingencies

- **Length drift on trading-hours** — 4 peak-margin snapshots × multiple segments × intraday surveillance loops. Mitigation: use multiple smaller subgraphs per page rather than one mega-DAG.
- **Cross-page node ID collisions** — different phases share concepts (e.g., "submit to clearing"). Mitigation: phase-prefix every node ID (`ONB-`, `BOD-`, etc.).
- **ASCII DAG readability for >10 nodes** — gets cluttered fast. Mitigation: break into ≤8-node subgraphs; the dependency table is the source of truth, ASCII is the illustration.
- **Voice drift across 6 per-phase pages** — long drafting session. Mitigation: re-read each page's TL;DR after drafting the next page; aim for consistent voice.

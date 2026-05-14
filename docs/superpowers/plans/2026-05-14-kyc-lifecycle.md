# KYC Lifecycle (beyond onboarding) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship 7 new markdown pages — 1 overview + 6 per-scenario operator-walkthrough pages — under `lifecycle/` covering re-KYC, modifications, dormancy-reactivation, voluntary closure, transmission, and NRI conversion. Each page follows the existing `journey/` template (steps + fields + Asides + cross-links).

**Architecture:** Inline synthesis from accumulated session context (compliance blueprint + integration DAG + broker-process narrative + field-atlas + circulars). No research agents. One commit per page. New top-level "Lifecycle" sidebar group between User Journey and Broker Process. Astro build is the verification gate.

**Tech Stack:** Astro Starlight (no build changes), `.mdx` or `.md` (Starlight `Aside` components used inline), Pagefind (auto-rebuilt).

**Note on TDD adaptation:** Content/writing plan. Verification: `npm run build` succeeds, per-page word count and cross-link counts meet spec targets.

---

## File Structure

**Files to create (final, committed):**

- `kyc-docs-site/src/content/docs/lifecycle/index.md` — overview landing page.
- `kyc-docs-site/src/content/docs/lifecycle/re-kyc.md`
- `kyc-docs-site/src/content/docs/lifecycle/modifications.md`
- `kyc-docs-site/src/content/docs/lifecycle/dormancy-reactivation.md`
- `kyc-docs-site/src/content/docs/lifecycle/closure.md`
- `kyc-docs-site/src/content/docs/lifecycle/transmission.md`
- `kyc-docs-site/src/content/docs/lifecycle/nri-conversion.md`

**Files to modify:**

- `kyc-docs-site/astro.config.mjs` — add new top-level "Lifecycle" sidebar group.
- `README.md` — link Lifecycle from Compliance & Vendor Coverage section.

**Files to create (memory side):**

- `/home/rakesh/.claude/projects/-home-rakesh-work-broking-kyc/memory/kyc_lifecycle.md`

---

## Phase 1 — Scaffold + overview (Task 1)

### Task 1: Create directory + overview page

**Files:**
- Create: `kyc-docs-site/src/content/docs/lifecycle/` directory.
- Create: `kyc-docs-site/src/content/docs/lifecycle/index.md`

- [ ] **Step 1: Create directory**

```bash
mkdir -p /home/rakesh/work/broking-kyc/kyc-docs-site/src/content/docs/lifecycle
ls /home/rakesh/work/broking-kyc/kyc-docs-site/src/content/docs/lifecycle/
```

Expected: empty directory.

- [ ] **Step 2: Write overview page**

Write to `kyc-docs-site/src/content/docs/lifecycle/index.md`:

```markdown
---
title: Lifecycle (post-onboarding)
description: Operator-friendly step-by-step walkthroughs for every post-onboarding KYC lifecycle event — re-KYC, modifications, dormancy & reactivation, voluntary closure, transmission (deceased), NRI ↔ resident conversion.
---

> **Why this page is structured this way:** Onboarding has 9 well-known screens, documented under [User Journey](/broking-kyc/journey/). Post-onboarding events are less standardized — each scenario has its own trigger, its own field set, its own propagation path through KRA / CKYC / UCC / BO. This section is the operator walkthrough for each scenario, parallel in shape to the onboarding journey.

## TL;DR

- 6 scenario pages plus this overview.
- Each scenario page: step-by-step walkthrough, field-level callouts, regulatory citations, sub-cases, practical notes.
- Complementary to the [Compliance Blueprint](/broking-kyc/operations/compliance-blueprint/) (what must be done), the [Integration DAG](/broking-kyc/operations/integration-dag/) (dependency structure), the [Broker Process Narrative](/broking-kyc/broker-process/narrative/) (chronological story), and the [Field-level Data Flow Atlas](/broking-kyc/reference/field-atlas/) (where each field flows).
- AI-generated synthesis. **Verify each scenario's procedural details against current circulars and your back-office configuration before relying on them in production.**

## Scenarios

| Scenario | Typical timeline | Page |
|---|---|---|
| Re-KYC (risk-tier-based refresh) | 2y / 8y / 10y per risk tier | [re-kyc](./re-kyc/) |
| Modifications (address / bank / nominee / segment / mobile / email / name) | 1–3 days per modification | [modifications](./modifications/) |
| Dormancy → Reactivation | 12-month detection; reactivation 1–3 days | [dormancy-reactivation](./dormancy-reactivation/) |
| Voluntary closure | 5–7 business days end-to-end | [closure](./closure/) |
| Transmission (deceased client) | weeks (nominee path) to months (succession) | [transmission](./transmission/) |
| NRI ↔ Resident conversion | 1–4 weeks both directions | [nri-conversion](./nri-conversion/) |

## How the lifecycle pages relate to other site sections

- **What must happen** — the [Compliance Blueprint KYC-lifecycle domain](/broking-kyc/operations/compliance-blueprint/#kyc-lifecycle-41-entries) lists every verifiable obligation per scenario.
- **What runs before what** — the [Integration DAG lifecycle-events page](/broking-kyc/operations/integration-dag/lifecycle-events/) maps the dependency graph for each scenario.
- **Where the data flows** — the [Field-level Data Flow Atlas](/broking-kyc/reference/field-atlas/) shows which destinations receive each modified field.
- **How it fits the operational day** — the [Broker Process Narrative Section 6](/broking-kyc/broker-process/narrative/#6-lifecycle-events) puts these scenarios in narrative context.
- **This section** — operator walkthroughs you can hand to a new ops engineer learning the scenarios.

## Practical notes

- **[industry practice]** Most brokers maintain a "lifecycle queue" distinct from the onboarding queue. The ops teams running the two queues have different rhythms: onboarding is high-volume / standardised; lifecycle is lower-volume / higher per-case variation.
- **[gotcha]** The single most common mistake across all lifecycle scenarios: firing KRA / CKYC / exchange UCC / depository BO updates concurrently for a modification. They must serialize — KRA first, the rest validate against the new KRA state. See the [Integration DAG modification path](/broking-kyc/operations/integration-dag/lifecycle-events/#dag-1-modification-address--bank--nominee--segment--mobile--email--name).
- **[risk trade-off]** Tighter dormancy detection (e.g., 6 months instead of 12) reduces stale-account risk but increases friction for occasional traders. Industry default is 12 months; tighter settings are a deliberate broker-policy choice with measurable customer-experience cost.
- **[cost optimization]** Lifecycle events generate disproportionate operational cost relative to their volume because they don't fit standard onboarding pipelines. Brokers that invest in specific lifecycle-scenario runbooks for ops staff see ~40% faster average resolution time on these events.

## Verified through

2026-05-14

---

*AI-generated and not legal, financial, or compliance advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*
```

- [ ] **Step 3: Build verify**

```bash
cd /home/rakesh/work/broking-kyc/kyc-docs-site && npm run build 2>&1 | grep -E '(lifecycle|error|Error|Complete)' | tail -5
```

Expected: build complete; `/lifecycle/index.html` listed.

- [ ] **Step 4: Commit**

```bash
cd /home/rakesh/work/broking-kyc
git add kyc-docs-site/src/content/docs/lifecycle/index.md
git commit -m "Scaffold lifecycle section overview page

Overview with scenario index linking to per-scenario walkthroughs (re-
KYC, modifications, dormancy-reactivation, closure, transmission, NRI
conversion) and cross-section navigation to blueprint / DAG / narrative
/ field-atlas. Per-scenario pages drafted in subsequent commits.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Phase 2 — Per-scenario pages (Tasks 2–7)

Each per-scenario task drafts a `.md` page following the same template:
1. Frontmatter (title + description).
2. Why-this-order note (1 sentence).
3. TL;DR (4–6 bullets).
4. Conceptual overview (1–2 paragraphs).
5. Step-by-step walkthrough (numbered).
6. Sub-cases / branches.
7. Field-level callouts (cross-link to field-atlas).
8. Practical notes (4–6 entries tagged).
9. Cross-references to blueprint / DAG / circulars / journey.
10. Verified-through stamp + AI disclaimer.

Each page targets **1,200–2,500 words**, **≥ 4 cross-links**, **≥ 2 Asides**.

### Task 2: Re-KYC page

**Files:**
- Create: `kyc-docs-site/src/content/docs/lifecycle/re-kyc.md`

Content scope:
- Risk-tier-based periodicity (high 2y / medium 8y / low 10y) per SEBI's risk-based KYC framework.
- Trigger detection — anniversary of last KYC validation, risk-tier change events, regulatory events (PEP discovery, sanctions hit).
- Refresh process — re-validate identity (PAN + Aadhaar/DigiLocker re-fetch), re-validate address, update contact details (OTP re-verify), capture any segment / declaration changes.
- KRA + CKYC upload of refreshed record.
- Segment treatment during re-KYC (some segments may pause pending refresh; broker policy varies).
- Sub-cases: PEP escalation re-KYC, sanctions-hit forced re-KYC, FATCA tax-residency change.
- Practical notes including the 90-day pre-expiry alert pattern.

Cross-links: blueprint KYC-lifecycle domain, DAG lifecycle-events modification path (re-KYC is a special modification), SEBI MIRSD KYC master, journey screens 2-4 (since refresh re-runs much of the original flow).

- [ ] **Step 1: Draft the page** — write to `kyc-docs-site/src/content/docs/lifecycle/re-kyc.md` per the page template above.
- [ ] **Step 2: Verify counts**

```bash
wc -w /home/rakesh/work/broking-kyc/kyc-docs-site/src/content/docs/lifecycle/re-kyc.md
grep -c '](/broking-kyc/' /home/rakesh/work/broking-kyc/kyc-docs-site/src/content/docs/lifecycle/re-kyc.md
grep -c '<Aside ' /home/rakesh/work/broking-kyc/kyc-docs-site/src/content/docs/lifecycle/re-kyc.md
```

Expected: ≥ 1,200 words, ≥ 4 cross-links, ≥ 2 Asides.

- [ ] **Step 3: Build verify**

```bash
cd /home/rakesh/work/broking-kyc/kyc-docs-site && npm run build 2>&1 | grep -E '(error|Error|Complete)' | tail -2
```

- [ ] **Step 4: Commit**

```bash
cd /home/rakesh/work/broking-kyc
git add kyc-docs-site/src/content/docs/lifecycle/re-kyc.md
git commit -m "Draft lifecycle page: Re-KYC

Risk-tier-based periodicity (high 2y / medium 8y / low 10y), trigger
detection, refresh process, KRA + CKYC upload, segment treatment
during refresh. Sub-cases for PEP escalation, sanctions hit, FATCA
tax-residency change. Cross-links to blueprint, DAG, circulars,
journey screens.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 3: Modifications page

**Files:**
- Create: `kyc-docs-site/src/content/docs/lifecycle/modifications.md`

Content scope (sub-sections per modification type):
- **Address change** — proof requirement, KRA upload, CKYC upload, exchange UCC update, depository BO update. Order is sequential.
- **Bank account change** — penny-drop verification on new account, propagation to KRA / UCC / depository for direct-payout routing.
- **Nominee change** — SEBI Jan 2025 nominee revamp (up to 10 nominees, percentage allocation, video opt-out for no-nominee).
- **Segment add / drop** — F&O / CD / COM activation with income proof if F&O or COM, exchange UCC update.
- **Mobile / email change** — OTP re-verification, KRA / UCC / depository update.
- **Name / DOB change** — legal proof, BSE Unfreeze process, Protean 3-param re-check.
- Common rejection-cascade patterns and how to recover.

Cross-links: DAG modification path, blueprint edge-case rows, field-atlas Section A/B/C/G/I sub-pages, SEBI Jan 2025 nominee circular, BSE Unfreeze circular.

- [ ] **Step 1-4: Draft / count-check / build / commit** with target counts and commit message:

```
Draft lifecycle page: Modifications

Sub-sections per modification type: address, bank, nominee (SEBI Jan
2025 10-nominee revamp), segment add/drop, mobile/email (OTP re-
verify), name/DOB (BSE Unfreeze + Protean 3-param). Sequential KRA →
CKYC → UCC → BO propagation rule with rejection-cascade recovery
patterns.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
```

---

### Task 4: Dormancy → Reactivation page

**Files:**
- Create: `kyc-docs-site/src/content/docs/lifecycle/dormancy-reactivation.md`

Content scope:
- Dormancy detection — typical 12-month no-trade trigger; exchange-level dormancy often 24 months.
- Flagging — segment auto-disable for F&O / COM; modifications restricted; account included in dormant-MIS report.
- Reactivation request — client-initiated, written / digital.
- Re-KYC trigger if dormant > 12 months.
- UCC unfreeze at NSE / BSE / MCX.
- BO reactivate at CDSL / NSDL.
- Segment re-activation (income proof re-check for F&O / COM per current rules).
- Communication path to client during dormancy and post-reactivation.

Cross-links: DAG dormancy-reactivation path, blueprint dormancy entries (Y section + edge-case), field-atlas Y section.

- [ ] **Step 1-4: Draft / count-check / build / commit** with commit message:

```
Draft lifecycle page: Dormancy → Reactivation

12-month / 24-month detection, segment auto-disable, dormant-MIS
reporting, reactivation request, re-KYC if >12m dormant, UCC unfreeze,
BO reactivate, segment re-activation with income-proof re-check.
Communication path during dormancy and post-reactivation.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
```

---

### Task 5: Voluntary closure page

**Files:**
- Create: `kyc-docs-site/src/content/docs/lifecycle/closure.md`

Content scope:
- Client request — written / digital, formal closure form.
- Pending-obligations check — outstanding trades, MTF positions, unsettled payouts.
- Fund withdrawal — refund client funds bank balance.
- Pledge release — margin pledge + MTF pledge release on depository.
- DP BO closure — CDSL / NSDL closure intimation.
- UCC deactivation — NSE / BSE / MCX.
- KRA closure intimation — record marked "closed" (CKYC retained as identity reference).
- Sub-case: closure-with-securities-transfer (transfer to another broker without sale).
- Sub-case: failed closure with pending litigation / freeze orders.

Cross-links: DAG closure path, blueprint closure entries, journey ending point.

- [ ] **Step 1-4: Draft / count-check / build / commit** with commit message:

```
Draft lifecycle page: Voluntary closure

6-step procedure: pending obligations check → fund withdrawal → pledge
release → DP BO closure → UCC deactivation → KRA closure. Sub-case for
closure-with-securities-transfer (avoid STT). Sub-case for failed
closure on litigation / freeze. CDSL / NSDL closure procedure
variants.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
```

---

### Task 6: Transmission page

**Files:**
- Create: `kyc-docs-site/src/content/docs/lifecycle/transmission.md`

Content scope:
- **Single-holder deceased, nominee registered** — death certificate, nominee KYC, claim form, BO transfer, decision to close or continue.
- **Single-holder deceased, no nominee** — succession path: probate, succession certificate, letters of administration; months typical.
- **Joint account, one holder deceased** — survivor mode, BO record update.
- **Joint account, all holders deceased** — succession path.
- Document requirements per case.
- CDSL vs NSDL procedural variants (each publishes detailed transmission procedure guides).
- Communication path with claimants.

Cross-links: DAG transmission paths, blueprint transmission rows, CDSL / NSDL transmission circulars.

- [ ] **Step 1-4: Draft / count-check / build / commit** with commit message:

```
Draft lifecycle page: Transmission

4 sub-cases: single-deceased nominee path, single-deceased succession
path, joint-deceased survivor mode, joint-deceased succession.
Document requirements per case, CDSL vs NSDL procedural variants,
communication path with claimants.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
```

---

### Task 7: NRI conversion page

**Files:**
- Create: `kyc-docs-site/src/content/docs/lifecycle/nri-conversion.md`

Content scope:
- **Resident → NRI** — trigger (acquiring NRI status abroad), passport + visa / residency proof, NRE / NRO bank account setup, PIS letter from AD-Category-I bank, conversion at exchange UCC level (NRI client type), depository BO re-mapping, segment restrictions (PIS = delivery-only; Non-PIS = intraday + F&O; commodities prohibited).
- **NRI → Resident** — return to India, full re-KYC as resident, removal of PIS account linkage, address + contact re-validation, segment unlock, commodity / intraday re-enable.
- Edge case: CP-code removal post-July 2025.
- Tax treatment differences (TDS at source for NRI flows).

Cross-links: appendix/nri-deep-dive (existing detailed reference), blueprint NRI edge-case rows, field-atlas Section V.

- [ ] **Step 1-4: Draft / count-check / build / commit** with commit message:

```
Draft lifecycle page: NRI conversion

Bidirectional: Resident → NRI (PIS letter, NRE/NRO setup, segment
restrictions: PIS delivery-only, commodities prohibited) and NRI →
Resident (re-KYC as resident, PIS unlinking, segment unlock). Edge
case for CP-code removal post-July 2025. Tax treatment differences
(NRI TDS at source).

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
```

---

## Phase 3 — Sidebar + memory + README (Tasks 8–9)

### Task 8: Update Astro sidebar

**Files:**
- Modify: `kyc-docs-site/astro.config.mjs`

- [ ] **Step 1: Add Lifecycle top-level group between User Journey and Broker Process**

Find the `User Journey` block. After it, **before** the `Broker Process` block, insert:

```js
{
  label: "Lifecycle",
  items: [
    { label: "Overview", slug: "lifecycle" },
    { label: "Re-KYC", slug: "lifecycle/re-kyc" },
    { label: "Modifications", slug: "lifecycle/modifications" },
    { label: "Dormancy & Reactivation", slug: "lifecycle/dormancy-reactivation" },
    { label: "Voluntary Closure", slug: "lifecycle/closure" },
    { label: "Transmission", slug: "lifecycle/transmission" },
    { label: "NRI Conversion", slug: "lifecycle/nri-conversion" },
  ],
},
```

- [ ] **Step 2: Build verify**

```bash
cd /home/rakesh/work/broking-kyc/kyc-docs-site && npm run build 2>&1 | grep -E '(error|Error|Complete|page\(s\))' | tail -3
```

Expected: ~142 pages total now.

- [ ] **Step 3: Commit**

```bash
cd /home/rakesh/work/broking-kyc
git add kyc-docs-site/astro.config.mjs
git commit -m "Expose Lifecycle in sidebar

New top-level Lifecycle group between User Journey and Broker Process,
with Overview + 6 scenario entries (Re-KYC, Modifications, Dormancy &
Reactivation, Voluntary Closure, Transmission, NRI Conversion).

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 9: Memory + README + final verify

**Files:**
- Create: `/home/rakesh/.claude/projects/-home-rakesh-work-broking-kyc/memory/kyc_lifecycle.md`
- Modify: `/home/rakesh/.claude/projects/-home-rakesh-work-broking-kyc/memory/MEMORY.md`
- Modify: `/home/rakesh/.claude/projects/-home-rakesh-work-broking-kyc/memory/project_overview.md`
- Modify: `README.md`

- [ ] **Step 1: Create memory entry**

Write `/home/rakesh/.claude/projects/-home-rakesh-work-broking-kyc/memory/kyc_lifecycle.md`:

```markdown
---
name: kyc-lifecycle
description: Sub-project #5 deliverable (2026-05-14). Operator-walkthrough deep-dives for 6 post-onboarding lifecycle scenarios at lifecycle/ (re-KYC, modifications, dormancy-reactivation, closure, transmission, NRI conversion). 1 overview + 6 scenario pages. Final sub-project of the broking-ops expansion.
metadata:
  type: project
---

Lifecycle pages are operator-walkthrough shape (steps + fields + Asides + cross-links) — complementing the breadth-first reference (blueprint, atlas, circulars), the chronological narrative (broker-process), and the dependency structure (integration DAG) with the missing piece: per-scenario how-to-do-it-cleanly walkthroughs.

**Scenarios:** Re-KYC (risk-tier 2y/8y/10y) · Modifications (address/bank/nominee/segment/mobile/email/name with sequential KRA→CKYC→UCC→BO propagation) · Dormancy & reactivation (12m/24m detection) · Voluntary closure (6-step procedure) · Transmission (single-deceased nominee + succession, joint-deceased survivor + succession) · NRI ↔ Resident conversion.

**Why:** before this sub-project, lifecycle events were described in three different shapes (narrative chronology, dependency DAG, compliance inventory) but nowhere did an operator find "how do I actually walk a customer through scenario X". This section is that.

**How to apply:**
- When asked about a specific lifecycle scenario: refer to the relevant `lifecycle/<scenario>.md` page.
- When asked about cross-cutting concerns (every scenario triggers KRA→CKYC→UCC→BO): refer to the modification-ordering note in the lifecycle index plus the [Integration DAG lifecycle-events page](/broking-kyc/operations/integration-dag/lifecycle-events/).
- When asked about regulatory citations: each scenario page links to relevant circulars from the [Circulars sub-pages](/broking-kyc/reference/regulatory-circulars/).

**Synthesis source:** compliance blueprint (KYC-lifecycle + edge-case domains) + integration DAG (lifecycle-events page) + broker-process narrative (Section 6) + field-atlas (Sections A/B/C/G/H/I/V/Y/Z) + circulars (SEBI MIRSD KYC, Jan 2025 nominee revamp, CDSL/NSDL transmission, FATCA centralization).

Related: [[project-overview]], [[broker-process-narrative]], [[integration-dag]], [[blueprint-and-atlas]], [[field-atlas]], [[regulatory-anchors]].
```

- [ ] **Step 2: Update MEMORY.md**

Append to `/home/rakesh/.claude/projects/-home-rakesh-work-broking-kyc/memory/MEMORY.md`:

```markdown
- [KYC lifecycle](kyc_lifecycle.md) — 2026-05-14: 6 per-scenario operator walkthroughs at lifecycle/ (re-KYC, modifications, dormancy-reactivation, closure, transmission, NRI conversion); final sub-project of the broking-ops expansion
```

- [ ] **Step 3: Update project_overview.md**

Change the "Sub-projects complete" sentence to:

```markdown
All six sub-projects of the broking-ops expansion (#1–#7, no #5-original-renumbered) complete: Circulars Refresh, Vendor Atlas, Field-level Atlas, Integration DAG, Broker Process Narrative, Compliance Blueprint, KYC Lifecycle. The broking-kyc site has evolved from a KYC-onboarding capability demo into a layered (operator playbook + capability demo + personal KB) knowledge base covering the full Indian broking operational landscape.
```

- [ ] **Step 4: README update**

In `README.md`, find the `## Compliance & Vendor Coverage` section. Append a fifth bullet after the Integration DAG bullet:

```markdown
- **[Lifecycle (post-onboarding)](https://javajack.github.io/broking-kyc/lifecycle/)** — operator-walkthrough deep-dives for six post-onboarding scenarios: re-KYC, modifications, dormancy & reactivation, voluntary closure, transmission, NRI conversion. Step-by-step with field-level callouts, sub-cases, and cross-links to blueprint / DAG / circulars.
```

- [ ] **Step 5: Final build sanity**

```bash
cd /home/rakesh/work/broking-kyc/kyc-docs-site && npm run build 2>&1 | grep -E '(error|Error|Complete|page\(s\))' | tail -3
```

Expected: build complete; no errors.

- [ ] **Step 6: Commit memory + README**

```bash
cd /home/rakesh/work/broking-kyc
git add README.md
git commit -m "Link Lifecycle from README; close out broking-ops expansion

New Lifecycle bullet in Compliance & Vendor Coverage section pointing
to the lifecycle/ overview. With this commit, all seven sub-projects
of the broking-ops expansion are complete: Circulars, Vendor Atlas,
Field-level Atlas, Integration DAG, Broker Process Narrative,
Compliance Blueprint, KYC Lifecycle.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

- [ ] **Step 7: Final state check**

```bash
git -C /home/rakesh/work/broking-kyc log --oneline origin/main..HEAD | wc -l
ls /home/rakesh/work/broking-kyc/kyc-docs-site/src/content/docs/lifecycle/
```

Expected: total commit count increased by ~10 (1 spec + 1 plan + 7 page commits + 1 sidebar + 1 README). All 7 lifecycle pages listed.

---

## Self-review

**Spec coverage** — each spec requirement maps to a task:
- "1 overview + 6 per-scenario pages" → Task 1 (overview) + Tasks 2–7 (per scenario).
- "Each page ≥ 1,200 words, ≥ 4 cross-links, ≥ 2 Asides" → each per-scenario task verifies these.
- "Per-page structure (TL;DR / overview / steps / sub-cases / practical notes / cross-references / stamp)" → enforced by per-task content scope.
- "Sidebar updated" → Task 8.
- "Memory + README" → Task 9.

**Placeholder scan** — no "TBD", "TODO", or "Similar to Task N" patterns. Each task has explicit content scope, target counts, and exact commit messages.

**Type consistency** — page slug formats consistent (`lifecycle/<scenario>`). Cross-link targets match the build output (verified by per-task build step).

---

## Risks & contingencies

- **Overlap with existing journey/ and broker-process pages** — lifecycle pages are deliberately operator-walkthrough shape (not narrative, not DAG, not inventory). Mitigation: each page leads with a "how this differs from related pages" note in the conceptual overview.
- **Word count drift** — 1,200 is the minimum; some scenarios may run longer (e.g., transmission with 4 sub-cases). Acceptable up to ~3,000 per page; beyond that, break into sub-pages.
- **Cross-link rot** — anchors on blueprint / DAG / atlas / circulars pages are stable today. If those pages restructure later, the lifecycle pages' links would need refresh. Noted in memory entry.

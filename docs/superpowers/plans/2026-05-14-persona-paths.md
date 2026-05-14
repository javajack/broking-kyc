# Persona Paths + Tone Pass Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a persona layer — 13 new landing pages under `personas/` + tone pass on 12 existing section landing pages + homepage rewrite + new top-level "Choose Your Role" sidebar group. No new regulatory content; presentation layer over the existing 178-page corpus.

**Architecture:** Inline writing in this session. Each persona page is 600–1,200 words with second-person voice, suggested reading path, common questions. Tone pass on 12 existing landing pages preserves content; replaces structural opener with conversational hook + persona callout.

**Tech Stack:** Astro Starlight (no build changes), `.md` / `.mdx`. Astro components: `<Aside>`, `<CardGrid>`, `<LinkCard>` for persona index.

**Note on TDD adaptation:** Per page verification: build clean, ≥3 cross-links, second-person voice present. Final: cross-link validator passes (0 broken).

---

## File Structure

**New files:**
```
kyc-docs-site/src/content/docs/personas/
├── index.md                     # Choose your role
├── product-manager.md
├── backend-engineer.md
├── frontend-ux-engineer.md
├── operations-lead.md
├── oms-rms-head.md
├── compliance-officer.md
├── finance-cfo.md
├── internal-auditor.md
├── statutory-auditor.md
├── trainee.md
├── regulator-inspector.md
└── vendor-partner.md
```

**Files to modify (tone pass — preserve content, friendlier opener):**
- `kyc-docs-site/src/content/docs/index.mdx` — homepage rewrite (full)
- `kyc-docs-site/src/content/docs/journey/index.md`
- `kyc-docs-site/src/content/docs/operations/integration-dag.md`
- `kyc-docs-site/src/content/docs/operations/compliance-blueprint.md` (light: opening only)
- `kyc-docs-site/src/content/docs/operations/audit-compliance.md`
- `kyc-docs-site/src/content/docs/lifecycle/index.md`
- `kyc-docs-site/src/content/docs/deep-dives/index.md`
- `kyc-docs-site/src/content/docs/vendors/index.md`
- `kyc-docs-site/src/content/docs/vendors/atlas.md` (light: opening only)
- `kyc-docs-site/src/content/docs/reference/regulatory-circulars.md` (light)
- `kyc-docs-site/src/content/docs/reference/field-atlas.md` (light)
- `kyc-docs-site/src/content/docs/broker-process/narrative.mdx` (minimal — already has voice)

**Sidebar:**
- `kyc-docs-site/astro.config.mjs` — add "Choose Your Role" group at top.

**Memory:**
- Create `/home/rakesh/.claude/projects/-home-rakesh-work-broking-kyc/memory/persona_paths.md`.

---

## Phase 1 — Scaffold + persona index (Task 1)

### Task 1: Create directory + persona index

- [ ] **Step 1:** Create `kyc-docs-site/src/content/docs/personas/`.
- [ ] **Step 2:** Write `personas/index.md` — "Choose your role" with 12 persona cards (use Starlight `CardGrid` + `LinkCard`). Each card: 1-line role descriptor + link to persona page.
- [ ] **Step 3:** Build verify.
- [ ] **Step 4:** Commit: "Scaffold personas section with role-selector index".

---

## Phase 2 — Draft 12 persona pages (Tasks 2–13)

Each persona page follows the same template (per spec):
- Frontmatter + 1-line description.
- Opening hook (2–3 sentences in second person, role-specific scenario).
- "What you'll find useful here" (1 paragraph).
- "Suggested reading path" (5–10 ordered steps with rationale).
- "Common questions in your role" (Q&A with links).
- "What to skip and why."
- Verified through + AI disclaimer.

Target: 600–1,200 words per page, ≥4 cross-links to existing content, ≥1 `<Aside>` callout, second-person voice throughout.

**Per-persona content scope:**

- **Task 2 — Product Manager** (`product-manager.md`): Reads Journey, Vendor Atlas, Broker Process Narrative, Lifecycle, cost analysis from reference. Cares about end-to-end flow, vendor tradeoffs, lifecycle complexity. Hook: "You're scoping a re-platform. You need to know whether to build or buy each piece, what regulatory cycles will pace the project, and which trade-offs will appear in your roadmap."

- **Task 3 — Backend Engineer** (`backend-engineer.md`): Reads Integration DAG, Field Atlas, Deep Dives (technical), Vendor Atlas (APIs). Cares about implementation. Hook: "You're integrating with KRA, exchange UCC, and the depository. You need the dependency graph, the field-level data flow, the retry policies, and the file formats."

- **Task 4 — Frontend / UX Engineer** (`frontend-ux-engineer.md`): Reads Journey screens, validation rules, master-dataset, error-handling. Hook: "You're building the screens. You need to know what fields, what validations, what error states, and what happens after submit that the user shouldn't see."

- **Task 5 — Operations Lead** (`operations-lead.md`): Reads Broker Process Narrative, Compliance Blueprint, Integration DAG, Lifecycle, Deep Dives (operational). Hook: "Your day is BOD scripts, intraday surveillance, EOD reconciliation, and the cycle items that pile up by month-end."

- **Task 6 — Head of OMS/RMS** (`oms-rms-head.md`): Reads Deep Dives (trading-day theme), Integration DAG (trading-hours), Compliance Blueprint (margin/surveillance). Hook: "Your team owns the layer between order-entry and exchange. The pre-trade RMS pipeline, the 4 peak-margin snapshots, the surveillance flags — those are your KPIs."

- **Task 7 — Compliance Officer / CCO** (`compliance-officer.md`): Reads Compliance Blueprint, Audit deep-dives, Circulars, Lifecycle. Hook: "You're signing the half-yearly compliance certificate. You need every obligation, every evidence artefact, and every circular that drives them."

- **Task 8 — Finance / CFO** (`finance-cfo.md`): Reads BMC/ABC, Client Funds Upstreaming, MTF Operational, Payment Mandates, IPF. Hook: "You hold the capital, you manage settlement, you sign off on funds upstreaming. You need the capital framework, the brokerage economics, and the protection mechanisms."

- **Task 9 — Internal Auditor** (`internal-auditor.md`): Reads Concurrent / System / Cyber Audit deep-dives, Compliance Blueprint, Circulars. Hook: "You're scoping the half-yearly internal audit. You need a defensible checklist, the regulatory citations behind each line, and the sample tests that pass SEBI's expectations."

- **Task 10 — Statutory Auditor (CA firm)** (`statutory-auditor.md`): Reads Audit deep-dives, Field Atlas, Compliance Blueprint, BMC/ABC, ECN. Hook: "You're the CA firm doing the annual statutory audit. You need to know what to ask the broker for, what the regulator expects, and where the documentation lives."

- **Task 11 — Trainee** (`trainee.md`): Reads Architecture, Broker Process Narrative, Journey, Lifecycle (in that order). Hook: "You started this week. You don't yet know what an SPN is, why peak margin matters, or what BOD stands for. By the end of this reading list you will."

- **Task 12 — Regulator / Inspector** (`regulator-inspector.md`): Reads Compliance Blueprint (all domains), Audit deep-dives, Circulars, Member Compliance deep-dives. Hook: "You're prepping for an inspection. You want to see how a broker maps obligations to evidence, which deep-dives go beyond surface compliance, and which circulars they've cited."

- **Task 13 — Vendor / Integration Partner** (`vendor-partner.md`): Reads Vendor Atlas, Field Atlas (their fields), Integration DAG (where they fit), Deep Dives (DLT, AA, eSign). Hook: "You're talking to a broker about integration. You need to know where you fit in the dependency graph, which fields you produce or consume, and what SLA matters at your touchpoint."

For each task:
- [ ] **Step 1:** Draft the page per template.
- [ ] **Step 2:** Build verify.
- [ ] **Step 3:** Commit: "Draft persona page: <Role>".

---

## Phase 3 — Tone pass on landing pages (Tasks 14–18)

Group existing landing pages into batches of related pages; each batch is one task.

### Task 14: Homepage rewrite (`index.mdx`)

- [ ] Rewrite to: hook paragraph → "Who reads this?" with persona cards (LinkCards to `/personas/`) → 3-column scan of major sections → AI disclaimer → author block. Preserve all `<head>` SEO/analytics. Commit.

### Task 15: Operations + Reference landing pages (5 pages)

- [ ] Light tone pass on each: `operations/integration-dag.md`, `operations/compliance-blueprint.md`, `operations/audit-compliance.md`, `reference/regulatory-circulars.md`, `reference/field-atlas.md`. Replace `> Why this page is structured this way:` opener with conversational hook + "Who reads this section?" line. Preserve all content. Commit.

### Task 16: Journey + Lifecycle + Broker Process landing pages (3 pages)

- [ ] Light tone pass on `journey/index.md`, `lifecycle/index.md`, `broker-process/narrative.mdx` (very light — already has voice). Commit.

### Task 17: Vendors + Deep-dives landing pages (3 pages)

- [ ] Light tone pass on `vendors/index.md`, `vendors/atlas.md`, `deep-dives/index.md`. Commit.

### Task 18: Sidebar update + memory + final validation

- [ ] Add "Choose Your Role" top-level group to `astro.config.mjs` (above Getting Started) with persona-index + 12 persona pages.
- [ ] Create memory entry at `~/.claude/projects/-home-rakesh-work-broking-kyc/memory/persona_paths.md`.
- [ ] Update `MEMORY.md` and `project_overview.md`.
- [ ] Append Persona Paths bullet to README's Compliance & Vendor Coverage section.
- [ ] Run cross-link validator (`python3 working/validate_links.py`) — expect 0 broken page + 0 broken anchor.
- [ ] Final Astro build (~191 pages expected).
- [ ] Commit: "Sub-project #9 complete: persona paths + tone pass".

---

## Self-review

**Spec coverage:**
- 13 persona pages → Phase 1 (index) + Phase 2 (12 personas).
- Tone pass on 12 landing pages → Phase 3 (homepage + 4 grouped tasks).
- Sidebar + memory + validation → Phase 4.
- Voice baseline + content preservation → enforced in per-task content scope.

**Placeholder scan:** no TBDs. Each persona page has specific content scope (role + hook + cross-link expectations).

**Type consistency:** persona page slugs consistent (`personas/<role>.md`); commit message format consistent across tasks.

---

## Risks & contingencies

- **Voice drift across 13 persona pages** — page template + re-read previous page before drafting next.
- **Persona overlap** — explicit "what to skip" section sharpens each persona's distinct scope.
- **Tone-pass scope creep** — explicit list of 12 landing pages only.
- **Cross-link breakage from tone pass** — run validator at end as a hard gate.

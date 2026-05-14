# Integration Choreography DAG — Design

**Date:** 2026-05-14
**Sub-project:** #4 of the broking-ops expansion
**Status:** Design — pending user review

## Context

Five sub-projects have shipped this session: #1 Circulars Refresh, #2 Vendor Atlas, #3 Field-level Data Flow Atlas, #6 Broker Process Narrative, #7 Compliance Blueprint.

The site has the chronological story (broker-process narrative), the regulatory baseline (circulars), the inventory of obligations (blueprint), the field-flow mapping (field atlas), and the vendor stack (atlas). What's missing: the **dependency structure** — for each integration call, what must complete before it can fire? What can run in parallel? What's the rollback path if a downstream step fails after an upstream succeeded?

Sub-project #4 fills that gap.

## Goal

A multi-page Integration Choreography DAG at `kyc-docs-site/src/content/docs/operations/integration-dag/` that maps the execution graph of every significant integration call across six phases of broker operations, with per-node detail covering idempotency, retry policy, rollback path, SLA, and failure surfaces.

## Output

### Pages

- `operations/integration-dag.md` — overview landing (phase index, cross-cutting concepts, navigation hub).
- `operations/integration-dag/onboarding.md` — 9-screen client flow + 4-parallel async calls + maker-checker + 8 post-checker batch pipelines.
- `operations/integration-dag/bod.md` — file ingestion from exchanges & clearing corps + RMS reload + surveillance start-of-day + health checks.
- `operations/integration-dag/trading-hours.md` — pre-trade RMS pipeline + execution + intraday MTM + 4 peak margin snapshots + intraday surveillance / NORMS / GSM-ASM.
- `operations/integration-dag/eod-settlement.md` — trade booking + contract notes + position files + obligation files + payin/payout + direct-payout-to-demat + funds upstreaming.
- `operations/integration-dag/recurring-cycles.md` — weekly CFR, monthly client funding, quarterly running-account settlement, half-yearly compliance certificate, annual audits.
- `operations/integration-dag/lifecycle-events.md` — modification (address/bank/nominee/segment), transmission, dormancy → reactivation, closure paths.

7 pages total.

### Representation

**ASCII DAGs** in fenced code blocks. No new build tooling required. The site already has 4 hand-authored SVG diagrams; SVG upgrade for the DAGs can be a follow-up.

Each page may have multiple smaller subgraphs rather than one mega-DAG, where complexity warrants.

### Per-node detail schema

Every node in each DAG appears in a per-page table with the following columns:

| Column | Description |
| --- | --- |
| `node_id` | Phase-prefixed identifier (e.g., `ONB-S2-PAN_VERIFY`, `BOD-RMS-SPAN_RELOAD`) |
| `operation` | What the node does (API call, file fetch, computation, human checkpoint) |
| `depends_on` | Upstream node IDs (or `[entry]` for graph roots) |
| `blocks` | Downstream node IDs (or `[exit]` for graph leaves) |
| `parallel_eligible` | Sibling node IDs that can run concurrently (or `[none]`) |
| `idempotent` | yes / no / conditional |
| `retry_policy` | e.g., "3x exponential backoff, then manual queue" |
| `rollback` | What to undo if a downstream step fails (`[none]` if best-effort / fire-and-forget) |
| `sla` | Typical wall-clock latency (e.g., "<3s P95", "1–2h", "2–3 days") |
| `failure_surface` | Where the error appears: client UI / ops queue / clearing-corp reject file / KRA-validation flag / etc. |
| `spec_source` | Linked circular ID, vendor doc URL, or `[industry typical]` |

## Workflow

**Inline synthesis** — no research agents. Same shape as sub-project #6 (Broker Process Narrative). I draft directly from accumulated session context:
- Broker-process narrative for chronology and node identification.
- Compliance blueprint for owner/frequency/penalty context.
- Flow-summary for the onboarding-specific async-convergence patterns.
- Field-atlas for the destination-side data flows that constrain ordering.
- Circulars for spec citations on retry / SLA / failure-handling rules.

## Documentation conventions

Each page follows project conventions: TL;DR → why-this-order → conceptual overview → ASCII DAGs (with brief callouts above each subgraph explaining what it covers) → dependency tables → per-node detail tables → practical notes → verified-through stamp → AI disclaimer.

## Sidebar update

Add a new collapsed group **"Integration DAG"** under the existing **Operations** sidebar group (between **Status Machine** and **Error Handling**), containing:
- Overview
- Onboarding
- BOD
- Trading hours
- EOD & settlement
- Recurring cycles
- Lifecycle events

## Risks

- **DAG complexity in ASCII** — trading-hours has lots of concurrent paths (4 snapshots, multiple segments). Mitigation: split into smaller subgraphs per page.
- **Overlap with broker-process narrative** — narrative is chronological story; DAG is dependency structure. Mitigation: cross-link liberally, don't duplicate prose; the DAG page focuses on the structure, narrative focuses on the day-in-the-life.
- **`[industry typical]` saturation** — retry / timeout / rollback patterns are often broker-specific operational choices, not publicly mandated. Expected ~30–40% `[industry typical]`; acceptable since this is an orchestration design reference, not a regulatory citation.
- **DAG diagrams getting stale** — circular IDs and spec citations are stable from sub-project #1, but if exchange / clearing-corp file formats change, the DAG retry/SLA rows may shift. Mitigation: noted in maintenance section of each page.

## Out of scope

- New hand-authored SVG diagrams (ASCII only this sub-project; SVG upgrade is a follow-up if desired).
- Implementation code or actual orchestrator config (e.g., Airflow / Temporal DAGs) — this describes the orchestration; doesn't ship it.
- Real-time monitoring / observability hooks (separate operational concern).
- Per-vendor orchestration quirks (e.g., specific timeout values used by Greeksoft RMS) — vendor-specific, deferred.

## Success criteria

- 1 overview + 6 per-phase pages.
- Every page has at least one ASCII DAG + dependency table + per-node detail.
- ≥ 80 unique integration nodes documented total across the 6 phases.
- ≥ 60% of nodes cite a spec source.
- Sidebar updated with new "Integration DAG" collapsed group under Operations.
- Astro build clean.

## Workflow summary

1. Commit this spec.
2. Invoke writing-plans for the implementation plan.
3. Execute inline — scaffold + overview, then one page per phase per commit, then sidebar + memory.

## Next step

After user approval: invoke writing-plans.

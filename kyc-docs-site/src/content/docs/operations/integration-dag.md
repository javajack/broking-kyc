---
title: Integration Choreography DAG
description: Dependency graph for every significant integration call across the six phases of broker operations — onboarding, BOD, trading hours, EOD & settlement, recurring cycles, lifecycle events. ASCII DAGs with per-node detail (idempotency, retry, rollback, SLA, failure surface, spec source).
---

> **Why this page is structured this way:** The [Broker Process Narrative](/broking-kyc/broker-process/narrative/) tells the operational story chronologically. The [Compliance Blueprint](/broking-kyc/operations/compliance-blueprint/) inventories what must be done. The [Field-level Data Flow Atlas](/broking-kyc/reference/field-atlas/) maps where each field flows. This page tells **what must run before what** — the orchestration / dependency layer. Each phase has its own page with ASCII DAGs and per-node detail.

## TL;DR

- Six phases, six per-phase pages, ASCII DAGs in fenced code blocks (no new tooling).
- Every node carries: `node_id`, `operation`, `depends_on`, `blocks`, `parallel_eligible`, `idempotent`, `retry_policy`, `rollback`, `sla`, `failure_surface`, `spec_source`.
- AI-generated synthesis. **Verify retry / SLA / rollback patterns against your own systems before relying on these in production.**

## Conceptual overview

A broker's day is a graph, not a list. Some calls fan out in parallel (the 4 async calls on PAN-DOB submit during onboarding); some calls fan in to a gate (the 8 batch pipelines all need to complete before ACTIVE flips); some calls are time-locked (peak-margin snapshots at fixed clock times); some are event-triggered (transmission flow triggers on death-certificate submission). This section makes that structure explicit so an orchestrator-design conversation has something concrete to point at.

### Cross-cutting principles

- **Idempotency.** Most integration calls are idempotent by `reference_id` — retry-on-failure is safe. Non-idempotent calls (money movement, settlement instructions, irrevocable eSigns) require explicit deduplication at the orchestrator layer; their per-node row flags `idempotent: no` or `conditional`.
- **Retry policy.** Typical: 3× exponential backoff for transient errors (HTTP 5xx, timeout, 429); manual queue for persistent errors (4xx validation failure, business-rule rejection). Specific calls override — KRA upload retries 24h then ops alert; CDSL BO retries 3× then manual queue; FIX gateway timeouts retry immediately on reconnect.
- **Rollback.** Most failed downstream steps don't trigger rollback of upstream successes (KRA upload doesn't un-do because exchange-UCC upload failed afterward — the application retries the failing step). Money movement is the exception: failed settlements may trigger compensating transactions through the clearing corp's auction or default-fund mechanism.
- **Parallel-vs-sequential.** Calls run in parallel by default unless they share state (margin computation must serialize per client) or depend on each other's output (PAN-Aadhaar link check needs PAN status code first). Onboarding's parallelism is canonical — see Screen 2's 4 concurrent async calls. Modification flows are notably *sequential* because exchange/depository validate against the new KRA state.

## Phases

| # | Phase | Page | What it covers |
| --- | --- | --- | --- |
| 1 | Onboarding | [Onboarding](./integration-dag/onboarding/) | 9-screen client flow + 4-parallel async on Screen 2 + Screen 8 blocking gate + maker-checker + 8 batch pipelines fan-out + final ACTIVE gate |
| 2 | BOD | [BOD](./integration-dag/bod/) | File ingestion from exchanges & clearing corps + RMS parameter reload + surveillance start-of-day + operational health checks + market-open readiness gate |
| 3 | Trading hours | [Trading hours](./integration-dag/trading-hours/) | Pre-trade RMS pipeline + order release + execution / MTM / margin-recompute loop + 4 peak-margin snapshots + intraday surveillance + closing-window auction |
| 4 | EOD & settlement | [EOD & settlement](./integration-dag/eod-settlement/) | Trade booking + contract notes + position files + obligation files + payin/payout + direct-payout-to-demat + daily client funds upstreaming + KRA/CKYC daily upload + ledger nightly batch |
| 5 | Recurring cycles | [Recurring cycles](./integration-dag/recurring-cycles/) | Weekly CFR + monthly client funding/GST/TDS/STT/MIS + quarterly running-account settlement + half-yearly compliance certificate + annual audit cycles |
| 6 | Lifecycle events | [Lifecycle events](./integration-dag/lifecycle-events/) | Modification (address/bank/nominee/segment/mobile/email/name) + transmission + dormancy → reactivation + voluntary closure |

## Practical notes

- **[industry practice]** Most brokers build the orchestration layer in-house even when they buy the OMS / RMS / back-office from vendors — orchestration is where the broker's specific operational philosophy lives (retry aggressiveness, manual-queue thresholds, escalation paths). Choosing Airflow / Temporal / Apache Camel / custom is usually less impactful than how the broker tunes the policy knobs.
- **[gotcha]** Operations new to the domain often assume KRA / CKYC / exchange UCC must run in strict order. In practice they run in parallel for **new** clients (no inter-dependency) but in strict order for **modifications** (KRA update first; exchange UCC then validates against KRA's new state). This is one of the two-failures-per-quarter type bugs that catches every new ops engineer eventually.
- **[risk trade-off]** Tighter retry policies reduce manual queue burden but increase false-positive call volume to regulators (KRA, clearing corp); looser policies reduce noise but increase ops headcount. Most brokers tune by month-end reconciliation: too many manual items → tighten; too many regulator-reject codes → loosen.
- **[cost optimization]** The 4 peak-margin snapshots are the highest-cost RMS event of the day in compute terms. Pre-computing snapshot-relevant state at 11:25 / 12:25 / 13:25 / 14:25 (5 minutes before each snapshot) is a common operational optimization to avoid last-second computation pressure.

## Verified through

2026-05-14

---

*AI-generated and not legal, financial, or compliance advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*

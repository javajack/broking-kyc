---
title: "Integration DAG: BOD"
description: Dependency graph for Begin-of-Day file ingestion, RMS parameter reload, surveillance start-of-day setup, and operational health checks that gate market open at 09:00 IST.
---

> **Why this page is structured this way:** BOD is the most-paralleled phase of the day after the post-eSign batch zone. The fan-out is shallow but wide — dozens of file fetches and parameter loads run concurrently because they're independent. The fan-in is to a single readiness gate that has to be green by 09:00 or the broker cannot trade.

## TL;DR

- 2 ASCII DAGs: main file-ingestion graph + parallel operational-health-check subgraph.
- 22 unique integration nodes; most are file fetches with independent retry policies.
- Final fan-in is **market-open readiness** — AND of RMS-ready + surveillance-ready + health-pass.
- BOD failure (incomplete by 09:00) is a hard incident; runbooks escalate immediately to clearing-corp helpdesk + DR-site failover.

## Conceptual overview

The broker doesn't *do* anything during BOD that's strictly required by the exchange — exchanges open at 09:00 regardless. BOD is the broker's prep: pulling the day's files (so the OMS knows valid contracts, valid prices, the day's margin parameters), reloading the RMS so client positions are correctly marked, arming the surveillance system, and running a battery of health checks (FIX login, DR replication, CSCRF log feeds). If any of this fails by 09:00, the broker has a choice — trade with a degraded system (a regulatory-fine-eligible offense) or refuse trades (a customer-experience-fine-eligible offense). Most brokers refuse.

## DAG 1 — File ingestion + RMS reload + surveillance setup

```
BOD-START                          (06:00 IST, ops on call)
   │
   ├──► BOD-EX-HOLIDAY_CAL         (NSE/BSE/MCX — annual + amendments)
   │
   ├──► BOD-EX-CONTRACT_CM         (CM symbols, lot, tick)
   ├──► BOD-EX-CONTRACT_FO         (F&O contracts + expiry)
   ├──► BOD-EX-CONTRACT_CD         (CD contracts)
   │
   ├──► BOD-CC-SPAN_SCANRANGE      (clearing corp — NSCCL/ICCL/MCXCCL)
   ├──► BOD-CC-MTM_T1              (yesterday's close MTM)
   ├──► BOD-EX-CIRCUIT_FILTER      (per-stock daily price band)
   ├──► BOD-EX-MEMBER_FILES        (member status, suspensions)
   │
   ├──► BOD-DP-OBLIGATION_T1       (yesterday's pending settlements)
   ├──► BOD-DP-PLEDGE_STATUS       (overnight pledge updates)
   ├──► BOD-DP-DDPI_STATUS         (DDPI activations finalized overnight)
   ├──► BOD-DP-TRANSMISSION        (overnight transmission updates)
   │
   ├──► BOD-SURV-GSM_LIST          (Graded Surveillance Measure list)
   ├──► BOD-SURV-ASM_LIST          (Additional + LT-ASM)
   ├──► BOD-SURV-T2T_LIST          (Trade-to-Trade segment)
   │
   ▼
BOD-RMS-RELOAD       (consumes SPAN scanrange + MTM T-1 + DP pledge + obligation)
   │
   ▼
BOD-SURV-ARM         (consumes GSM + ASM + T2T)
   │
   ▼
BOD-READY-DATA       (AND of: contracts loaded, RMS reloaded, surveillance armed)
   │
   └──► (parallel with health-check DAG 2)
   │
   ▼
BOD-MARKET_OPEN_GATE  (09:00; readiness gate fired)
```

## DAG 2 — Operational health checks (runs in parallel with DAG 1)

```
BOD-START
   │
   ├──► BOD-HC-FIX_LOGIN           (exchange FIX session up)
   ├──► BOD-HC-CTCL_STATUS         (CTCL approval valid)
   ├──► BOD-HC-DR_REPLICATION      (primary↔DR sync confirmed)
   ├──► BOD-HC-CSCRF_LOG_FEED      (cyber log retention verified)
   ├──► BOD-HC-BCP_HEARTBEAT       (BCP plan currency)
   │
   ▼
BOD-READY-HEALTH      (AND of all health checks)
   │
   └──► joins BOD-MARKET_OPEN_GATE
```

## Per-node detail

| node_id | operation | depends_on | blocks | parallel_eligible | idempotent | retry_policy | rollback | sla | failure_surface | spec_source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| BOD-START | 06:00 IST orchestrator trigger | [entry] | all BOD-* nodes | [none] | yes (date-keyed) | none | [none] | scheduled | ops console | [industry typical] |
| BOD-EX-HOLIDAY_CAL | Fetch trading-day calendar | BOD-START | BOD-READY-DATA | all BOD-EX-* / BOD-CC-* / BOD-DP-* | yes | 3× then alternate FTP endpoint | [none] | < 1m | ops alert | NSE/BSE/MCX circulars |
| BOD-EX-CONTRACT_CM | CM contract file | BOD-START | BOD-READY-DATA | parallel-with siblings | yes | 3× then alternate endpoint; ops alert if all fail | [none] | < 5m | ops alert / market-open delay | [NSE circulars](/broking-kyc/reference/circulars/nse/) |
| BOD-EX-CONTRACT_FO | F&O contracts + expiry | BOD-START | BOD-READY-DATA | parallel | yes | 3× then alternate | [none] | < 5m | ops alert | [NSE circulars](/broking-kyc/reference/circulars/nse/) |
| BOD-EX-CONTRACT_CD | CD (currency derivatives) contracts | BOD-START | BOD-READY-DATA | parallel | yes | 3× then alternate | [none] | < 5m | ops alert | [NSE circulars](/broking-kyc/reference/circulars/nse/) |
| BOD-CC-SPAN_SCANRANGE | SPAN margin parameters from clearing | BOD-START | BOD-RMS-RELOAD | parallel-with other CC + EX fetches | yes | 3× exp backoff; ops alert + clearing-corp helpdesk if persistent | [none] | < 5m | ops alert (critical) | [Clearing-corp file specs](/broking-kyc/reference/circulars/clearing-corps/) |
| BOD-CC-MTM_T1 | Yesterday close MTM file | BOD-START | BOD-RMS-RELOAD | parallel | yes | 3× then alternate; ops alert | [none] | < 5m | ops alert | [Clearing-corp file specs](/broking-kyc/reference/circulars/clearing-corps/) |
| BOD-EX-CIRCUIT_FILTER | Per-stock daily price band | BOD-START | BOD-READY-DATA | parallel | yes | 3× | [none] | < 2m | ops alert / OMS rejects on opening | NSE circulars |
| BOD-EX-MEMBER_FILES | Active members + suspensions | BOD-START | BOD-READY-DATA | parallel | yes | 3× | [none] | < 2m | ops alert | NSE/BSE/MCX circulars |
| BOD-DP-OBLIGATION_T1 | Yesterday pending settlements | BOD-START | BOD-RMS-RELOAD | parallel | yes (date+broker keyed) | 3× then ops alert | [none] | < 5m | ops alert | [CDSL/NSDL circulars](/broking-kyc/reference/circulars/cdsl/) |
| BOD-DP-PLEDGE_STATUS | Overnight pledge updates | BOD-START | BOD-RMS-RELOAD | parallel | yes | 3× | [none] | < 5m | ops queue | [CDSL/NSDL circulars](/broking-kyc/reference/circulars/cdsl/) |
| BOD-DP-DDPI_STATUS | DDPI activations finalized | BOD-START | BOD-READY-DATA | parallel | yes | 3× | [none] | < 5m | ops queue | [CDSL DDPI](/broking-kyc/reference/circulars/cdsl/) |
| BOD-DP-TRANSMISSION | Overnight transmission updates | BOD-START | BOD-READY-DATA | parallel | yes | 3× | [none] | < 5m | ops queue | [NSDL/CDSL circulars](/broking-kyc/reference/circulars/nsdl/) |
| BOD-SURV-GSM_LIST | GSM list ingestion | BOD-START | BOD-SURV-ARM | parallel-with ASM/T2T | yes | 3× then yesterday's list (stale flag) | [none] | < 2m | ops alert | NSE NORMS |
| BOD-SURV-ASM_LIST | ASM + LT-ASM list | BOD-START | BOD-SURV-ARM | parallel-with GSM/T2T | yes | 3× then stale-list fallback | [none] | < 2m | ops alert | NSE NORMS |
| BOD-SURV-T2T_LIST | Trade-to-Trade segment list | BOD-START | BOD-SURV-ARM | parallel | yes | 3× then stale-list | [none] | < 2m | ops alert | NSE NORMS |
| BOD-RMS-RELOAD | Recompute per-client margin envelope | BOD-CC-SPAN_SCANRANGE, BOD-CC-MTM_T1, BOD-DP-OBLIGATION_T1, BOD-DP-PLEDGE_STATUS | BOD-READY-DATA | [none] | yes (date-keyed) | retry on dependency-receipt; ops alert if dependency fails | [none] | < 10m typical | ops console / OMS-margin layer | [industry typical] |
| BOD-SURV-ARM | Load filters + accumulators | BOD-SURV-GSM_LIST, BOD-SURV-ASM_LIST, BOD-SURV-T2T_LIST | BOD-READY-DATA | [none] | yes | retry on dependency-receipt | [none] | < 1m | ops console | [industry typical] |
| BOD-HC-FIX_LOGIN | FIX session up to each exchange | BOD-START | BOD-READY-HEALTH | parallel-with other HC | yes | infinite reconnect with backoff | [none] | < 2m | ops alert | [industry typical] |
| BOD-HC-CTCL_STATUS | CTCL approval valid | BOD-START | BOD-READY-HEALTH | parallel | yes | 3× then exchange-portal check | [none] | < 1m | ops alert | NSE/BSE/MCX CTCL circulars |
| BOD-HC-DR_REPLICATION | Primary↔DR sync confirm | BOD-START | BOD-READY-HEALTH | parallel | yes | 3× then CISO alert | [none] | < 2m | CISO alert (critical) | [BCP/DR blueprint domain](/broking-kyc/operations/compliance-blueprint/#bcp--dr-15-entries) |
| BOD-HC-CSCRF_LOG_FEED | Cyber log retention verify | BOD-START | BOD-READY-HEALTH | parallel | yes | 3× then CISO alert | [none] | < 1m | CISO alert | [Cyber security domain](/broking-kyc/operations/compliance-blueprint/#cyber-security-27-entries) |
| BOD-HC-BCP_HEARTBEAT | BCP plan currency check | BOD-START | BOD-READY-HEALTH | parallel | yes | 1× then ops alert | [none] | < 30s | ops alert | [BCP/DR blueprint domain](/broking-kyc/operations/compliance-blueprint/#bcp--dr-15-entries) |
| BOD-READY-DATA | AND of EX + CC + DP + SURV-ARM | (see depends_on above) | BOD-MARKET_OPEN_GATE | [none] | yes (local) | retry on dep-receipt | [none] | < 100ms | ops console | [industry typical] |
| BOD-READY-HEALTH | AND of all health checks | all BOD-HC-* | BOD-MARKET_OPEN_GATE | [none] | yes (local) | retry on dep-receipt | [none] | < 100ms | ops console | [industry typical] |
| BOD-MARKET_OPEN_GATE | Market-open readiness | BOD-READY-DATA, BOD-READY-HEALTH | TH-* (trading hours phase) | [none] | yes | escalation runbook if not GREEN by 09:00 | [none] | by 09:00 IST | ops bridge / CISO escalation | [industry typical] |

## Practical notes

- **[gotcha]** SPAN scanrange comes from the **clearing corp** (NSCCL / ICCL / MCXCCL), not the exchange. Ops engineers new to the domain often look for it on the exchange FTP and assume their fetch is broken when it's not there.
- **[industry practice]** Most brokers run two FTP endpoints per source (primary + backup); if primary fails, the orchestrator auto-tries the backup before manual-queueing. This single change cuts ~80% of BOD-related pages.
- **[risk trade-off]** Stale-list fallback (use yesterday's GSM/ASM if today's fetch fails) is a deliberate trade — better to trade with a slightly outdated surveillance list than refuse trades entirely. Most brokers tag stale-list trades for end-of-day review.
- **[cost optimization]** Pre-warm DR-site replication starting 23:00 the night before — most BOD failures around DR-replication are caused by the broker's overnight ledger batch contending with replication bandwidth. Staggering the two roughly eliminates that class of failure.

## Verified through

2026-05-14

---

*AI-generated and not legal, financial, or compliance advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*

---
title: "Integration DAG: Trading hours"
description: Dependency graph for the continuous trading window (09:15–15:30) — pre-trade RMS pipeline, order release, execution/MTM/margin loop, four peak-margin snapshots, intraday surveillance, block-deal windows, and the closing-window auction.
---

> **Why this page is structured this way:** Trading hours is the highest-throughput phase. Per-order, the pre-trade RMS pipeline is a tight sequential chain that runs in milliseconds. Aggregated, the system runs millions of those chains per day plus an outer loop (trade-booking → MTM → margin-recompute) plus four time-locked peak-margin snapshots. Three DAGs cover these layers separately.

## TL;DR

- 3 ASCII DAGs: per-order pre-trade pipeline, intraday execution-and-snapshot loop, closing window.
- 28 unique integration nodes.
- **Peak-margin snapshots** at 11:30 / 12:30 / 13:30 / 14:30 are the most consequential time-locked events; missing one or having a shortfall during one triggers DMF penalty.
- Per-trade pipeline runs in single-digit milliseconds; orchestration overhead must stay below ~5ms or order latency degrades.

## Conceptual overview

Once the market opens at 09:15, the broker's tech stack settles into an OMS/RMS loop that repeats per order: validate, release, execute, book, update margin, repeat. Surveillance runs in parallel at the exchange level (NORMS), with the broker's mirror surveillance system catching exchange-side flags and adding broker-specific rules (intraday OTR caps, GSM/ASM intervention). Four times during the session — at 11:30, 12:30, 13:30, 14:30 — the clearing corp captures a margin snapshot; the broker must have sufficient client-collected margin in each.

## DAG 1 — Per-order pre-trade pipeline (millisecond-scale)

```
TH-ORDER-RECV   (web / mobile / dealer / API / FIX inbound)
        │
        ▼
TH-PT-SEGMENT_CHECK     (segment active for client?)
        │ fail → reject
        ▼ pass
TH-PT-MARGIN_LOCK       (compute required margin; reserve against available)
        │ fail → reject
        ▼ pass
TH-PT-MWPL_CHECK        (derivatives only)
        │ fail → reject
        ▼ pass
TH-PT-ORDER_TYPE        (NRML / MIS / CO / BO validation)
        │ fail → reject
        ▼ pass
TH-PT-SURV_CHECK        (GSM / ASM / restricted-stock / illiquid)
        │ fail → reject
        ▼ pass
TH-PT-RELEASE           (OMS submits to exchange via FIX / CTCL / API)
        │
        ▼
TH-EX-ACK               (exchange order ID returned)
        │
        ▼
TH-EX-MATCH             (if matched, trade confirmation returned)
```

## DAG 2 — Intraday execution loop + peak-margin snapshots

```
TH-EX-MATCH (from DAG 1)
        │
        ▼
TH-TRADE-BOOK           (broker OMS records the trade)
        │
        ├──► TH-MTM-UPDATE          (running MTM on open positions)
        ├──► TH-MARGIN-RECOMPUTE    (per-client margin re-snapshot)
        ├──► TH-SURV-OTR_INCR       (OTR accumulator tick)
        ├──► TH-SURV-PATTERN        (manipulative-trade flagging — async)
        │
        ▼ loops back to next order

                  ╔═══════════════════════════════════════╗
                  ║  Time-locked at 11:30/12:30/13:30/14:30 ║
                  ║                                         ║
                  ║  TH-SNAP-PEAK_MARGIN                    ║
                  ║       │                                 ║
                  ║       ▼                                 ║
                  ║  TH-SNAP-DMF_ROW   (one per snapshot)   ║
                  ║       │                                 ║
                  ║       └──► aggregated post-EOD          ║
                  ╚═══════════════════════════════════════╝
                  (runs in parallel with execution loop)

TH-BD-WINDOW                (block-deal: 08:45-09:00 morning, 14:35-15:05 afternoon)
        │
        ▼
TH-BD-REPORT                (separate reporting flow)

TH-TG-DETECT                (technical glitch — event-triggered)
        │
        ▼
TH-TG-REPORT                (intraday submission to SEBI within prescribed minutes)
```

## DAG 3 — Closing window (15:30–15:40)

```
TH-CW-START         (15:30; continuous trading ends)
        │
        ▼
TH-CW-AUCTION       (call-auction window for closing price)
        │
        ▼
TH-CW-PRICE_DISC    (settlement-price discovery)
        │
        ▼
TH-CW-FINAL_MARGIN  (post-closing margin snapshot for record)
        │
        ▼
(hands off to EOD phase)
```

## Per-node detail

| node_id | operation | depends_on | blocks | parallel_eligible | idempotent | retry_policy | rollback | sla | failure_surface | spec_source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TH-ORDER-RECV | Order capture (web / mobile / dealer / API / FIX) | [entry] | TH-PT-SEGMENT_CHECK | [none] | no (user-keyed) | none | [none] | < 100ms | client UI | [industry typical] |
| TH-PT-SEGMENT_CHECK | Is segment active for this client? | TH-ORDER-RECV | TH-PT-MARGIN_LOCK | [none] | yes (local lookup) | none | reject order | < 1ms | OMS reject code | [industry typical] |
| TH-PT-MARGIN_LOCK | Compute SPAN+ELM+exposure; reserve against available | TH-PT-SEGMENT_CHECK | TH-PT-MWPL_CHECK | [none] | yes (order-keyed) | none | release margin reservation | < 2ms | OMS reject | [Margin compliance domain](/broking-kyc/operations/compliance-blueprint/#margin-compliance-30-entries) |
| TH-PT-MWPL_CHECK | Market-Wide Position Limit (derivatives) | TH-PT-MARGIN_LOCK | TH-PT-ORDER_TYPE | [none] | yes | none | release margin | < 1ms | OMS reject | NSE F&O MWPL circulars |
| TH-PT-ORDER_TYPE | NRML / MIS / CO / BO validation | TH-PT-MWPL_CHECK | TH-PT-SURV_CHECK | [none] | yes | none | release margin | < 1ms | OMS reject | [industry typical] |
| TH-PT-SURV_CHECK | GSM / ASM / restricted / illiquid | TH-PT-ORDER_TYPE | TH-PT-RELEASE | [none] | yes | none | release margin | < 1ms | OMS reject | [Surveillance domain](/broking-kyc/operations/compliance-blueprint/#surveillance-30-entries) |
| TH-PT-RELEASE | OMS sends order to exchange | TH-PT-SURV_CHECK | TH-EX-ACK | [none] | conditional (order-id-keyed) | 1× on FIX disconnect; manual on persistent | release margin if final fail | < 2ms | OMS reject / FIX session error | NSE/BSE/MCX FIX specs |
| TH-EX-ACK | Exchange returns order ID | TH-PT-RELEASE | TH-EX-MATCH or [exit-after-day] | [none] | n/a | n/a | release margin if order rejected | < 5ms typical | OMS / FIX session | [industry typical] |
| TH-EX-MATCH | Exchange matches order, returns trade conf | TH-EX-ACK | TH-TRADE-BOOK | [none] | n/a | n/a | [none] | event-driven | OMS | [industry typical] |
| TH-TRADE-BOOK | OMS records the trade | TH-EX-MATCH | TH-MTM-UPDATE, TH-MARGIN-RECOMPUTE, TH-SURV-OTR_INCR, TH-SURV-PATTERN | [none] | yes (trade-id keyed) | 3× then critical alert | [none] | < 10ms | OMS / back-office | [industry typical] |
| TH-MTM-UPDATE | MTM on open positions | TH-TRADE-BOOK | next pre-trade margin compute | parallel-with margin-recompute / OTR / pattern | yes | 3× | [none] | < 5ms | RMS | [industry typical] |
| TH-MARGIN-RECOMPUTE | Per-client margin envelope refresh | TH-TRADE-BOOK | next TH-PT-MARGIN_LOCK | parallel | yes | 3× | [none] | < 5ms | RMS | [Margin compliance domain](/broking-kyc/operations/compliance-blueprint/#margin-compliance-30-entries) |
| TH-SURV-OTR_INCR | OTR accumulator tick | TH-TRADE-BOOK | TH-SURV-OTR_BREACH (event) | parallel | yes | 3× | [none] | < 1ms | surveillance console | NSE NORMS |
| TH-SURV-PATTERN | Manipulative-trade pattern flag (async) | TH-TRADE-BOOK | TH-SURV-FLAG (downstream review) | parallel | yes | async best-effort | [none] | < 100ms | surveillance queue | NSE NORMS + social-media surveillance |
| TH-SNAP-PEAK_MARGIN | Capture client margin state at fixed clock | [time-trigger 11:30/12:30/13:30/14:30] | TH-SNAP-DMF_ROW | [none] | yes (snapshot-id keyed) | retry next-cycle if missed (DMF row) | [none] | < 30s after trigger | clearing corp DMF reject | [Margin compliance domain](/broking-kyc/operations/compliance-blueprint/#margin-compliance-30-entries) |
| TH-SNAP-DMF_ROW | Generate DMF row from snapshot | TH-SNAP-PEAK_MARGIN | EOD-DMF-AGGREGATE | parallel-with continued execution | yes | 3× | [none] | < 1s | ops queue / DMF reconciliation | [Clearing-corp DMF specs](/broking-kyc/reference/circulars/clearing-corps/) |
| TH-BD-WINDOW | Block-deal window detection (08:45-09:00, 14:35-15:05) | [time-trigger] | TH-BD-REPORT | parallel-with execution | yes | n/a | [none] | window-bound | n/a | [BSE/NSE block-deal circulars](/broking-kyc/reference/circulars/bse/) |
| TH-BD-REPORT | Block-deal reporting flow | TH-BD-WINDOW | [exit] | [none] | yes | 3× | [none] | < 5m post-window | ops queue | exchange block-deal circulars |
| TH-TG-DETECT | Technical glitch event detection | [event-trigger] | TH-TG-REPORT | parallel | yes (incident-id) | none (event-triggered) | [none] | event-driven | ops console | [Cyber security / technical glitch SEBI Aug-2023 circular](/broking-kyc/operations/compliance-blueprint/#cyber-security-27-entries) |
| TH-TG-REPORT | SEBI intraday glitch report | TH-TG-DETECT | [exit] | [none] | yes | 1× then escalation | [none] | within prescribed mins | SEBI portal | SEBI Aug 2023 technical-glitch circular |
| TH-CW-START | 15:30 closing-window trigger | [time-trigger] | TH-CW-AUCTION | [none] | yes (date-keyed) | none (time) | [none] | scheduled | n/a | [industry typical] |
| TH-CW-AUCTION | Call-auction for closing price | TH-CW-START | TH-CW-PRICE_DISC | [none] | n/a (exchange-side) | n/a | [none] | < 10m | exchange | NSE/BSE closing-auction circulars |
| TH-CW-PRICE_DISC | Settlement-price discovery | TH-CW-AUCTION | TH-CW-FINAL_MARGIN | [none] | n/a | n/a | [none] | < 1m | exchange | NSE/BSE closing-auction circulars |
| TH-CW-FINAL_MARGIN | Post-closing margin record | TH-CW-PRICE_DISC | EOD-* (hand-off) | [none] | yes | 3× | [none] | < 1m | RMS | [industry typical] |

## Practical notes

- **[gotcha]** Per-order pre-trade RMS budget is single-digit milliseconds. Anything slower starts showing as order-rejection latency that traders notice within hours. Most brokers measure each pre-trade node's P99 latency continuously, with alerts at >3× baseline.
- **[industry practice]** The 4 peak-margin snapshots (11:30 / 12:30 / 13:30 / 14:30) are time-locked at the **clearing corp side**, not the broker side. The broker's job is to ensure margin position is stable at those exact clock times — pre-computing margin at 11:25 / 12:25 / 13:25 / 14:25 (the "settled state" five minutes before snapshot) is a common optimization.
- **[risk trade-off]** Async surveillance (TH-SURV-PATTERN) doesn't block order execution. If real-time detection were stricter, brokers would catch more market manipulation but introduce latency that the trading-experience product team would push back on. Most brokers tune the balance toward async + post-EOD review.
- **[cost optimization]** The block-deal window (TH-BD-WINDOW) sees concentrated activity; some brokers route block-deal orders through a separate OMS lane to avoid degrading the main retail-order pipeline during the window.

## Verified through

2026-05-14

---

*AI-generated and not legal, financial, or compliance advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*

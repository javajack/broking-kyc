---
title: "Integration DAG: EOD & settlement"
description: Dependency graph for end-of-day reconciliation, contract note generation, position and obligation file exchange, peak-margin reconciliation, member compliance reporting, T+1 payin/payout, direct-payout-to-demat, daily client funds upstreaming, KRA/CKYC daily uploads, and ledger nightly batch.
---

> **Why this page is structured this way:** <abbr title="End Of Day">EOD</abbr> is two phases stitched together — the broker-side reconciliation/reporting (15:40–19:00) and the settlement-side actions (19:00 through next-morning payin). Two DAGs cover each block. Settlement has the most external dependencies (clearing corp, depository, banks); EOD has the most internal dependencies (back-office → contract notes → ledger).

## TL;DR

- 2 ASCII DAGs covering EOD reconciliation block and overnight settlement block.
- 32 unique integration nodes; the most-dependent phase.
- <abbr title="Trade-date Plus N settlement">T+1</abbr> payin obligation is the single hardest cutoff: failure to honour by 11:00 next morning triggers default-fund draw and broker suspension procedure.
- Daily client-funds upstreaming (Jun 2023 <abbr title="Securities and Exchange Board of India">SEBI</abbr> mandate) runs overnight; broker can't carry client funds on balance sheet beyond cutoff.

## Conceptual overview

By 15:40 the day's trading is done, but ~14 hours of work remain: reconcile every trade, compute every charge, generate every contract note, send every file to the clearing corp, receive every obligation file back, fund the payin obligation, accept the payout, upstream the funds, reconcile every bank account, push <abbr title="KYC Registration Agency">KRA</abbr> / <abbr title="Central KYC (records registry)">CKYC</abbr> modifications, run the ledger batch. By 06:00 the next morning, <abbr title="Beginning Of Day">BOD</abbr> scripts fire again. The orchestrator's job is to keep this 14-hour graph executing reliably; the same orchestrator that managed millisecond-scale pre-trade pipelines now manages multi-minute batch jobs.

## DAG 1 — EOD reconciliation (15:40–19:00)

```
EOD-START   (15:40 IST, closing-window completed)
   │
   ├──► EOD-TB-CM            (trade booking from exchange CM trade file)
   ├──► EOD-TB-FO            (F&O trade file)
   ├──► EOD-TB-CD            (CD trade file)
   ├──► EOD-TB-COM           (commodities trade file — MCX)
   │
   ▼
EOD-RECON         (reconcile broker OMS records vs exchange trade files)
   │
   ├──► EOD-CHARGE-COMPUTE   (brokerage + STT + GST + exchange + SEBI + stamp)
   │       │
   │       ▼
   │  EOD-CN-GENERATE        (per-client ECN PDFs with DSC signature)
   │       │
   │       ▼
   │  EOD-CN-DISPATCH        (DLT SMS + email per template)
   │
   ├──► EOD-MTM-EOD          (final MTM on outstanding positions)
   │
   ├──► EOD-POS-FILE         (position file generation)
   │       │
   │       ▼
   │  EOD-POS-UPLOAD         (upload to clearing corp)
   │
   ├──► EOD-OBLIG-FETCH      (obligation file from clearing corp)
   │       │
   │       ▼
   │  EOD-OBLIG-PROCESS      (compute payin/payout amounts)
   │
   ├──► EOD-PMR-FETCH        (peak-margin response file from clearing)
   │       │
   │       ▼
   │  EOD-DMF-RECONCILE      (DMF rows vs PMR; flag shortfall)
   │
   └──► EOD-COMP-REPORT      (CAR / DPC / member compliance submissions)
                              │
                              ▼
                        EOD-READY  (all EOD reconciliation done)
```

## DAG 2 — Overnight settlement (19:00 onwards)

```
EOD-READY  (from DAG 1)
   │
   ├──► SET-PAYIN-PREP       (stage T+1 payin instructions to clearing bank)
   ├──► SET-PAYOUT-PREP      (receive payout instructions from clearing)
   │
   ▼ (T+1 morning, but staged tonight)
SET-PAYIN-EXECUTE     (funds out: broker client-funds bank → clearing bank)
                      (securities out: depository pool → clearing pool)
                      (post-Jun-2024 direct payout: from clearing pool → client demat)
   │
   ▼
SET-PAYOUT-RECV       (funds in: clearing bank → broker client-funds bank)
                      (securities in: directly to client demat via direct-payout)
   │
   ▼
SET-UPSTREAM          (daily client funds upstreaming to clearing per Jun 2023 mandate)
   │
   ├──► funds        (bank-balance based)
   ├──► FDRs         (pledged collateral)
   ├──► MFOS         (margin funded order system instruments)
   │
   ▼
BANK-RECON            (reconcile broker books vs bank confirmations vs clearing acks)
   │
   ▼
                     (parallel batch operations starting 19:00)
   ├──► KRA-DAILY     (daily upload to KRA for new + modified KYC)
   ├──► CKYC-DAILY    (CKYC upload within 7-day window)
   ├──► LEDGER-NIGHT  (per-client ledger batch with day's trades + charges + MTM)
   │
   ▼
PREP-NEXT-BOD         (log rotation, backup verify, DR replication sync)
   │
   ▼
[hands off to BOD-START at 06:00]
```

## Per-node detail

| node_id | operation | depends_on | blocks | parallel_eligible | idempotent | retry_policy | rollback | sla | failure_surface | spec_source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| EOD-START | 15:40 EOD trigger | TH-CW-FINAL_MARGIN | EOD-TB-* | [none] | yes (date-keyed) | none | [none] | scheduled | ops console | [industry typical] |
| EOD-TB-<abbr title="Clearing Member">CM</abbr> | CM trade file from <abbr title="National Stock Exchange of India">NSE</abbr>/<abbr title="BSE Limited (formerly Bombay Stock Exchange)">BSE</abbr> | EOD-START | EOD-RECON | parallel-with FO/CD/COM | yes | 3× then alternate FTP | [none] | < 10m | ops alert | [NSE/BSE circulars](/broking-kyc/reference/circulars/nse/) |
| EOD-TB-FO | F&O trade file | EOD-START | EOD-RECON | parallel | yes | 3× | [none] | < 10m | ops alert | NSE/BSE F&O |
| EOD-TB-CD | CD trade file | EOD-START | EOD-RECON | parallel | yes | 3× | [none] | < 10m | ops alert | NSE/BSE CD |
| EOD-TB-COM | <abbr title="Multi Commodity Exchange of India">MCX</abbr> trade file | EOD-START | EOD-RECON | parallel | yes | 3× | [none] | < 10m | ops alert | [MCX circulars](/broking-kyc/reference/circulars/mcx/) |
| EOD-RECON | Reconcile broker <abbr title="Order Management System">OMS</abbr> vs exchange trade files | EOD-TB-CM, EOD-TB-FO, EOD-TB-CD, EOD-TB-COM | EOD-CHARGE-COMPUTE, EOD-<abbr title="Mark-to-Market">MTM</abbr>-EOD, EOD-POS-FILE, EOD-OBLIG-FETCH, EOD-PMR-FETCH, EOD-COMP-REPORT | [none] | yes (date-keyed) | 1× then manual | [none] | < 30m | ops queue / back-office console | [industry typical] |
| EOD-CHARGE-COMPUTE | Brokerage / STT / GST / exchange / SEBI / stamp duty | EOD-RECON | EOD-CN-GENERATE | parallel-with POS / OBLIG / PMR / COMP | yes (per-trade) | 3× then manual | reverse ledger entry if reconciled wrong | < 30m | back-office | [industry typical] |
| EOD-CN-GENERATE | <abbr title="Electronic Contract Note.">ECN</abbr> PDF generation with <abbr title="Digital Signature Certificate (CCA-licensed; aka Class 2/3 DSC).">DSC</abbr> sign | EOD-CHARGE-COMPUTE | EOD-CN-DISPATCH | [none] | yes (trade-id keyed) | 3× then manual | regenerate on detected error | < 60m | back-office / DSC service | [Investor servicing domain](/broking-kyc/operations/compliance-blueprint/) |
| EOD-CN-DISPATCH | DLT <abbr title="Short Message Service.">SMS</abbr> + email per template | EOD-CN-GENERATE | [exit] | parallel-with other EOD streams | yes (msg-id keyed) | 3× then DLT retry | [none] | < 24h cumulative | ops queue / DLT reject | [DLT comms compliance](/broking-kyc/operations/compliance-blueprint/) |
| EOD-MTM-EOD | Final MTM on outstanding positions | EOD-RECON | EOD-POS-FILE | parallel | yes | 3× then manual | [none] | < 15m | <abbr title="Risk Management System">RMS</abbr> | [industry typical] |
| EOD-POS-FILE | Position file generation per segment | EOD-MTM-EOD, EOD-RECON | EOD-POS-UPLOAD | parallel-with charges/CN | yes | 3× then manual | [none] | < 30m | back-office | [Clearing-corp file specs](/broking-kyc/reference/circulars/clearing-corps/) |
| EOD-POS-UPLOAD | Upload position file to clearing corp | EOD-POS-FILE | EOD-READY | [none] | yes (file-id keyed) | 3× then ops alert | [none] | < 30m | clearing-corp reject file | [Clearing-corp file specs](/broking-kyc/reference/circulars/clearing-corps/) |
| EOD-OBLIG-FETCH | Obligation file from clearing | EOD-RECON | EOD-OBLIG-PROCESS | parallel-with POS/PMR/COMP | yes | 3× then alternate FTP | [none] | clearing-side timing | ops alert | [Clearing-corp file specs](/broking-kyc/reference/circulars/clearing-corps/) |
| EOD-OBLIG-PROCESS | Compute payin/payout amounts | EOD-OBLIG-FETCH | SET-PAYIN-PREP, SET-PAYOUT-PREP | [none] | yes | 3× then manual | recompute on detected error | < 30m | back-office | [industry typical] |
| EOD-PMR-FETCH | Peak-margin response file | EOD-RECON | EOD-DMF-RECONCILE | parallel | yes | 3× | [none] | clearing-side | ops alert | [Clearing-corp file specs](/broking-kyc/reference/circulars/clearing-corps/) |
| EOD-DMF-RECONCILE | DMF rows vs peak-margin response | EOD-PMR-FETCH, TH-SNAP-DMF_ROW (all 4) | EOD-READY | [none] | yes | 1× then manual queue | [none] | < 30m | ops queue / compliance | [Margin compliance domain](/broking-kyc/operations/compliance-blueprint/) |
| EOD-COMP-REPORT | CAR / DPC / member compliance reports | EOD-RECON | EOD-READY | parallel | yes | 3× then manual queue | [none] | by midnight | ops queue | [Reporting domain](/broking-kyc/operations/compliance-blueprint/) |
| EOD-READY | EOD-block complete; settlement block starts | EOD-CN-DISPATCH, EOD-POS-UPLOAD, EOD-OBLIG-PROCESS, EOD-DMF-RECONCILE, EOD-COMP-REPORT | SET-PAYIN-PREP, SET-PAYOUT-PREP | [none] | yes (local) | none | [none] | < 100ms | ops console | [industry typical] |
| SET-PAYIN-PREP | Stage T+1 payin instructions | EOD-OBLIG-PROCESS, EOD-READY | SET-PAYIN-EXECUTE | parallel-with PAYOUT-PREP | yes (settlement-id) | 3× then critical alert | release reservation on cancellation | < 30m | back-office | [Settlement domain](/broking-kyc/operations/compliance-blueprint/) |
| SET-PAYOUT-PREP | Receive payout instructions | EOD-OBLIG-PROCESS, EOD-READY | SET-PAYOUT-RECV | parallel | yes | 3× | [none] | < 30m | back-office | [Settlement domain](/broking-kyc/operations/compliance-blueprint/) |
| SET-PAYIN-EXECUTE | T+1 payin: funds + securities out | SET-PAYIN-PREP | SET-PAYOUT-RECV | [none] | no (money movement) | 1× then critical | compensating transaction via clearing default fund | by 11:00 next-day | clearing-corp + bank | [Settlement + client-funds domains](/broking-kyc/operations/compliance-blueprint/) |
| SET-PAYOUT-RECV | Payout in: funds to client-funds bank, securities direct-to-demat | SET-PAYIN-EXECUTE | SET-UPSTREAM | [none] | no (money movement) | 1× then ops alert | [none] | < 1h after payin window | clearing-corp + bank | [Direct-payout circular](/broking-kyc/reference/circulars/sebi-other/) |
| SET-UPSTREAM | Daily client funds upstream to clearing corp | SET-PAYOUT-RECV | BANK-RECON | parallel-with KRA/CKYC/ledger | no (money movement) | 1× then critical | n/a (next-day reconciliation) | overnight | clearing-corp + bank | [SEBI/<abbr title="Head Office (SEBI circular ID prefix)">HO</abbr>/<abbr title="Markets Intermediaries Regulation and Supervision Department (SEBI)">MIRSD</abbr>/MIRSD-PoD-1/P/CIR/2023/84](/broking-kyc/reference/circulars/sebi-mirsd/) |
| BANK-RECON | Reconcile broker book vs bank + clearing | SET-UPSTREAM | PREP-NEXT-BOD | parallel | yes (date-keyed) | 1× then manual | [none] | < 1h | ops queue | [Client funds domain](/broking-kyc/operations/compliance-blueprint/) |
| KRA-DAILY | Daily upload of new + modified <abbr title="Know Your Customer (process).">KYC</abbr> to KRA | EOD-READY | PREP-NEXT-BOD | parallel | yes (<abbr title="Permanent Account Number">PAN</abbr>+ref-id keyed) | 3× then 24h queue | [none] | overnight | KRA reject file | [SEBI/HO/MIRSD/SECFATF/P/CIR/2024/79](/broking-kyc/reference/circulars/sebi-mirsd/) |
| CKYC-DAILY | CKYC upload within 7-day window | EOD-READY | PREP-NEXT-BOD | parallel | yes (PAN-keyed) | 3× then 7d window | [none] | within 7 days | <abbr title="Central Registry of Securitisation Asset Reconstruction and Security Interest of India">CERSAI</abbr> reject | [CKYC dual-upload circular](/broking-kyc/reference/circulars/cersai/) |
| LEDGER-NIGHT | Per-client ledger batch | EOD-READY, EOD-CHARGE-COMPUTE | PREP-NEXT-BOD | parallel | yes (date+client keyed) | 3× then manual | re-run on detected error | overnight (~3h typical) | back-office console | [industry typical] |
| PREP-NEXT-BOD | Log rotation, backup verify, DR sync | BANK-RECON, KRA-DAILY, LEDGER-NIGHT | [hands off to BOD-START 06:00] | [none] | yes | 3× then CISO alert | [none] | by 05:30 next-day | ops console | [BCP/DR + Cyber domains](/broking-kyc/operations/compliance-blueprint/#bcp--dr-15-entries) |

## Practical notes

- **[risk trade-off]** SET-PAYIN-EXECUTE is the highest-stakes node of the day. Failure triggers clearing-corp default fund draw and member-suspension review. Most brokers maintain a 1.5× buffer of liquid funds at the client-funds bank against the highest historical payin obligation to absorb worst-case days.
- **[gotcha]** Direct-payout-to-demat (post Jun 2024 SEBI circular, phased Nov-2024 / Jan-Feb-2025) changed the SET-PAYOUT-RECV node: securities flow direct from clearing pool to client demat without parking in broker pool. This required restructuring the back-office chart of accounts; brokers that handled the rollout late had reconciliation issues for weeks.
- **[industry practice]** EOD-DMF-RECONCILE is where compliance teams find peak-margin shortfalls; the response file from clearing is the authoritative record. Discrepancies between the broker's TH-SNAP-DMF_ROW outputs and the clearing-corp response are the first warning of an RMS issue.
- **[cost optimization]** LEDGER-NIGHT and SET-UPSTREAM are the two longest-running nightly batches. Running them sequentially (ledger first, then upstreaming after ledger committed) is cleaner but slower; running them in parallel with read-only ledger pre-snapshots typically saves 1–2 hours of overnight wall-clock at large brokers.

## Verified through

2026-05-14

---

*AI-generated and not legal, financial, or compliance advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*

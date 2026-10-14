---
title: "Back office: overview"
description: The record plane on SecMark — architecture and the daily pipeline, trade import and three-way reconciliation, contract notes, the ledger of record, settlement obligations, the 2026 CUSPA regime for unpaid securities, corporate actions, statements and retention, regulatory reporting, and the configuration reference.
---

> **Why this plane is ordered this way:** The back office is a pipeline with a deadline at the end of it, and each stage blocks the next. Trades must be imported and reconciled before contract notes can be generated; contract notes and obligations drive the ledger; the ledger drives statements, reporting and the money plane. So the pages follow the pipeline in order, and each one states what it blocks if it fails — because the single most useful piece of knowledge in back-office operations is which downstream deadline a given failure puts at risk.

## TL;DR

- **The exchange trade file is authoritative, not the order management system's real-time feed.** The two are reconciled, and a difference blocks contract notes — which is correct, because a contract note is a legal confirmation of what traded.
- **The deadlines do not move.** Contract notes are dispatched within **24 hours** of trade execution, digitally signed under the Information Technology Act, 2000. Settlement pay-in deadlines are same-day and bank cut-offs are earlier than exchange ones.
- **The ledger of record is the single owner of client balances.** Intraday risk views are working numbers; the ledger is what a client, an auditor and an arbitrator are shown.
- **CUSPA changed unpaid-securities handling in 2026**, with auto-pledge at pay-out, daily recomputation, a five-trading-day payment window, a 6 PM extension request on day five, and depository auto-release on day six. It is new enough to be missing from most internal documentation.
- **Reconciliation is the control, and exception ageing is its metric.** Trades, obligations, holdings, pledges, bank and gateway all reconcile daily; a stable exception backlog is an accumulating liability, not a steady state.
- **Record retention has a statutory floor of eight years** under regulation 16 of the 2026 regulations, and it covers configuration history, communications and audit logs, not just contract notes.
- **SecMark covers broking and depository-participant records in one platform**, which is efficient — but the records must stay separable, because a depository inspection asks for depository records.

## The pipeline

| Stage | Blocks if it fails | Page |
|---|---|---|
| Trade file import | Everything downstream | [Trade import and reconciliation](/broking-kyc/finix-broking-setup/backoffice/02-trade-import-reconciliation/) |
| Trade reconciliation | Contract notes | [Trade import and reconciliation](/broking-kyc/finix-broking-setup/backoffice/02-trade-import-reconciliation/) |
| Contract note generation and dispatch | A regulatory deadline | [Contract notes](/broking-kyc/finix-broking-setup/backoffice/03-contract-notes/) |
| Ledger posting | Statements, reporting, pay-out authorisation | [Ledger and accounting](/broking-kyc/finix-broking-setup/backoffice/04-ledger-accounting/) |
| Obligation processing | Settlement | [Settlement obligations](/broking-kyc/finix-broking-setup/backoffice/05-settlement-obligations/) |
| Unpaid-securities handling | A statutory clock | [CUSPA](/broking-kyc/finix-broking-setup/backoffice/06-cuspa-unpaid-securities/) |
| Corporate actions | Entitlements and valuations | [Corporate actions](/broking-kyc/finix-broking-setup/backoffice/07-corporate-actions/) |
| Statements | Client servicing obligations | [Statements and retention](/broking-kyc/finix-broking-setup/backoffice/08-statements-retention/) |
| Regulatory filings | Penalties and findings | [Regulatory reporting](/broking-kyc/finix-broking-setup/backoffice/09-regulatory-reporting/) |

Architecture and the daily sequence are at [back office architecture](/broking-kyc/finix-broking-setup/backoffice/01-backoffice-architecture/); every tunable is at the [configuration reference](/broking-kyc/finix-broking-setup/backoffice/10-backoffice-config-reference/).

## Where this connects

- [RMS](/broking-kyc/finix-broking-setup/rms/) — which consumes the collateral and balance this plane produces
- [Money movement](/broking-kyc/finix-broking-setup/money/) — pay-in, pay-out and bank reconciliation
- [EOD runbook](/broking-kyc/finix-broking-setup/daily-ops/05-eod-runbook/) — the sequence this plane runs in
- [ECN and investor servicing](/broking-kyc/deep-dives/member-compliance/ecn-investor-servicing/) — artefact formats in depth
- [Back office and RMS](/broking-kyc/appendix/back-office-rms/) — the vendor-neutral treatment

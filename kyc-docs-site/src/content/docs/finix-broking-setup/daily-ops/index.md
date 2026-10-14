---
title: "Daily operations: overview"
description: The operated day — begin-of-day gates, pre-open, the continuous session, close and post-close, end-of-day, settlement day, the midday incident playbooks, expiry operations, and the periodic calendar of weekly, monthly, quarterly and annual obligations.
---

> **Why this plane is the one operators live in:** Everything else in this manual explains why a step exists. This plane is the step itself — ordered, timed, assigned to an owner, with an explicit abort condition. The runbooks are the contract between the operation and the rest of the stack: if a runbook says stop, the operation stops, and the explanation lives on the page the step links to. Runbooks that explain as they go get skimmed; runbooks that instruct get followed.

## TL;DR

- **Begin-of-day is a set of gates, not a checklist.** A stale instrument master or a collateral load whose as-of timestamp is not today's aborts the open entirely. A missed risk-parameter publication blocks new derivatives orders in that segment only. Fail closed, scoped as narrowly as the missing fact allows.
- **The real operators must be able to run the runbook unaided.** The most informative pre-go-live test is to have the people who will do it execute it with the project team watching and not helping.
- **Two operating modes run concurrently for several hours.** The equity end-of-day pipeline runs while <abbr title="Multi Commodity Exchange of India">MCX</abbr> is still trading to 23:30, and the commodity close is a separate, later process.
- **The deadlines that matter are internal.** The bank's cut-off minus maker-checker minus a buffer is the number that belongs in the runbook, not the exchange's published deadline.
- **Exception ageing is the operating metric** across every reconciliation. A stable backlog is an accumulating liability, not a steady state.
- **Incidents are rehearsed, not improvised.** The playbooks exist because the decisions are better made in advance, by people who are not under pressure.
- **The periodic calendar is a control.** An obligation without an owner is the failure the calendar exists to prevent.

## The pages

| # | Page | When |
|---|---|---|
| 1 | [<abbr title="Beginning Of Day">BOD</abbr> runbook](/broking-kyc/finix-broking-setup/daily-ops/01-bod-runbook/) | From about 07:30 to the open |
| 2 | [Pre-open operations](/broking-kyc/finix-broking-setup/daily-ops/02-pre-open-ops/) | 09:00 to 09:15 |
| 3 | [Continuous session operations](/broking-kyc/finix-broking-setup/daily-ops/03-continuous-session-ops/) | 09:15 to 15:30, and to 23:30 in commodities |
| 4 | [Close and post-close](/broking-kyc/finix-broking-setup/daily-ops/04-close-post-close-ops/) | 15:30 onwards |
| 5 | [<abbr title="End Of Day">EOD</abbr> runbook](/broking-kyc/finix-broking-setup/daily-ops/05-eod-runbook/) | Post-session to overnight |
| 6 | [Settlement day operations](/broking-kyc/finix-broking-setup/daily-ops/06-settlement-day-ops/) | Per settlement |
| 7 | [Incident playbooks](/broking-kyc/finix-broking-setup/daily-ops/07-incident-playbooks/) | When something breaks |
| 8 | [Expiry operations](/broking-kyc/finix-broking-setup/daily-ops/08-expiry-ops/) | Expiry week and expiry day |
| 9 | [Periodic calendar](/broking-kyc/finix-broking-setup/daily-ops/09-periodic-calendar/) | Weekly to annual |

## Where this connects

- [Exchange file formats and downloads](/broking-kyc/finix-broking-setup/exchanges/08-file-formats-downloads/) — the inventory the runbooks assert
- [Back office architecture](/broking-kyc/finix-broking-setup/backoffice/01-backoffice-architecture/) — the pipeline the EOD runbook operates
- [<abbr title="Risk Management System">RMS</abbr> architecture](/broking-kyc/finix-broking-setup/rms/01-rms-architecture/) — the input gates
- [People, certification and organisation](/broking-kyc/finix-broking-setup/setup/07-people-certification-org/) — the shifts that staff these
- [Compliance configuration baseline](/broking-kyc/finix-broking-setup/compliance/01-compliance-config-baseline/) — the obligations behind the periodic calendar
- [Integration <abbr title="Directed Acyclic Graph.">DAG</abbr>](/broking-kyc/operations/integration-dag/) — the vendor-neutral dependency view

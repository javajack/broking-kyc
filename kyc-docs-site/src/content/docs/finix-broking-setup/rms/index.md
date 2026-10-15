---
title: "RMS: overview"
description: The risk plane on Saral MoneyMaker RMS — architecture and inputs, the margin engine that consumes clearing-corporation parameter files, the full pre-trade check ladder, the limit framework, collateral and pledge, the square-off engine, intraday surveillance, margin reporting and penalties, and the configuration reference.
---

> **Why this plane is ordered this way:** A risk system is only as good as its inputs and only as defensible as its decisions. So the plane starts with where the numbers come from — architecture and the input contracts — then the engine that turns those inputs into a margin requirement, then the ladder that turns a requirement into a release or a rejection, then the limits that bound it. Collateral comes next because it determines what capacity exists at all. Square-off follows because it is what happens when the capacity runs out, and it is the most litigated thing a broker does. Surveillance and reporting close the plane because they are the obligations that attach to everything above.

## TL;DR

- **The firm does not compute the authoritative margin — the clearing corporation does.** Saral consumes the clearing corporation's risk parameter files and computes per-client margin in real time from them. The firm's obligation is to ingest correctly, compute consistently, collect enough, and report accurately.
- **Upfront means before the trade.** Trading and clearing members must mandatorily collect upfront value-at-risk margin plus extreme loss margin from clients in the cash segment, as in derivatives.
- **Verification is by four random intraday snapshots**, and the **higher** of the end-of-day shortfall and the peak-snapshot shortfall is penalised, not the sum.
- **The penalty grid is 0.5 percent or 1 percent of the shortfall**, escalating to 5 percent per day beyond the third consecutive day and beyond the fifth instance in a month. Non-reporting is treated as 100 percent short reporting.
- **Collecting a minimum 20 percent upfront in lieu of value-at-risk and extreme loss margin removes the short-collection penalty**, which is a real design option with a real capital cost.
- **Saral's published behaviour matches the required shape**: limits controllable at identifier, client and scrip level; available exposure updated daily at the server; value-at-risk and extreme loss margin computed on order entry; the order released within the available exposure limit.
- **Square-off is the most disputed action a broker takes.** It needs a disclosed policy, a reproducible decision record, a defined behaviour when the market will not let you exit, and a client communication that precedes the action wherever possible.

## The pages

| # | Page | What it settles |
|---|---|---|
| 1 | [<abbr title="Risk Management System">RMS</abbr> architecture](/broking-kyc/finix-broking-setup/rms/01-rms-architecture/) | Components, inputs and their contracts, the decision record, failure behaviour |
| 2 | [Margin engine](/broking-kyc/finix-broking-setup/rms/02-margin-engine/) | What is computed, from which file, how often, and how it is proved correct |
| 3 | [Pre-trade check ladder](/broking-kyc/finix-broking-setup/rms/03-pretrade-check-ladder/) | Every check in order, with the regulatory, exchange and discretionary split |
| 4 | [Limit framework](/broking-kyc/finix-broking-setup/rms/04-limit-framework/) | The hierarchy, resolution, authority, and intraday change rules |
| 5 | [Collateral and pledge](/broking-kyc/finix-broking-setup/rms/05-collateral-pledge/) | What creates capacity, haircuts, the pledge chain, client-level allocation |
| 6 | [Square-off engine](/broking-kyc/finix-broking-setup/rms/06-squareoff-engine/) | Triggers, sequence, communication, and what happens when exit is blocked |
| 7 | [Intraday surveillance](/broking-kyc/finix-broking-setup/rms/07-intraday-surveillance/) | Alerting, the Chapter IV detection obligation, and disposition |
| 8 | [Margin reporting and penalties](/broking-kyc/finix-broking-setup/rms/08-margin-reporting-penalties/) | Files, deadlines, the penalty grid, allocation and dispute |
| 9 | [RMS configuration reference](/broking-kyc/finix-broking-setup/rms/09-rms-config-reference/) | Every tunable, default, class and failure mode |
| 10 | [Limit impact matrix](/broking-kyc/finix-broking-setup/rms/10-limit-impact-matrix/) | Ninety-seven events and what each one does to a client's available capacity, in which direction and on what clock |
| 11 | [Operations catalogue](/broking-kyc/finix-broking-setup/rms/11-operations-catalogue/) | Every risk intervention, routine and rare, with its precondition, its authoriser and its downstream effect |

## Where this connects

- [<abbr title="Order Management System">OMS</abbr>](/broking-kyc/finix-broking-setup/oms/) — the path this plane gates
- [RMS <abbr title="Standard Portfolio Analysis of Risk">SPAN</abbr> methodology](/broking-kyc/deep-dives/trading-day/rms-span-methodology/) — the computation in depth
- [Margin shortfall and peak margin](/broking-kyc/trading-risk/margin-shortfall-peak-margin/) — the member's collection and reporting obligation
- [Collateral and cross-margin](/broking-kyc/trading-risk/collateral-cross-margin/) — eligibility, haircuts and offsets
- [Order risk controls](/broking-kyc/trading-risk/order-risk-controls/) — the regulatory control set
- [Back office](/broking-kyc/finix-broking-setup/backoffice/) — where the ledger that feeds this plane lives

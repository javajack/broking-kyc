---
title: "Stack: overview"
description: The Finix vendor stack as a system — the ten planes, the four architectural bands, the boundaries where responsibility transfers between products, and the three pages that pin down who does what, how configuration is named, and what every interface owes every other interface.
---

> **Why this plane comes first:** Every later page assumes a particular division of labour — that the <abbr title="Order Management System">OMS</abbr> and not the back office holds the order book, that the <abbr title="Risk Management System">RMS</abbr> and not the OMS holds the margin number, that the back office and not the RMS owns the ledger of record. Those assumptions are choices, several of them are contestable, and if you make different ones then half the configuration tables later in this manual move to a different system. So this plane states the choices explicitly, before anything depends on them.

## TL;DR

- **A broking stack is not a pipeline, it is a set of systems that must agree about numbers.** The hard problem is not moving an order from front end to exchange; it is that four systems hold a view of the same client's cash and three hold a view of the same position, and they are updated at different times by different events.
- **Name the boundary, not the product.** The useful unit of design is the interface — what crosses it, in which direction, how often, how it fails, and who notices. [The integration contract matrix](/broking-kyc/finix-broking-setup/stack/integration-contract-matrix/) enumerates every one of them for this stack.
- **Three things must never have two owners**: the order book, the margin number at the moment of order release, and the ledger of record. Dual ownership of any of the three produces a class of incident that reconciliation cannot fix after the fact.
- **Configuration is a compliance artefact, not an implementation detail.** A limit, a cut-off time, a retention period and a penalty threshold are all configuration, and all four are inspectable. [Environments and configuration](/broking-kyc/finix-broking-setup/stack/environments-config-baseline/) treats them as versioned, reviewed objects with an owner and a reason.
- **Assume every external system is unavailable at the worst possible moment.** Each interface in the matrix carries a stated degradation behaviour, because "the vendor was down" is not an answer an exchange or a client accepts.

## The four bands

Read the [reference architecture diagram](/broking-kyc/finix-broking-setup/) as four horizontal bands.

| Band | What lives there | Characteristic failure |
|---|---|---|
| **Client band** | Dealer terminal, web, mobile, API, onboarding journey | A client sees state that no system of record agrees with |
| **Decision band** | Order acceptance, risk evaluation, limit enforcement, release or rejection | An order is released that should have been stopped, or stopped that should have been released |
| **Market band** | Exchange gateways, clearing corporation, depositories, the payment network | Loss of connectivity, or acceptance of a message the broker cannot later explain |
| **Record band** | Back office ledgers, obligations, contract notes, statements, regulatory reports, bank reconciliation | Two records of the same event that do not reconcile, discovered days later |

The bands matter because latency, reversibility and authority all change as you cross them. Inside the client band everything is reversible and nothing is authoritative. Inside the decision band things become irreversible within milliseconds. Once a message crosses into the market band the broker cannot unsend it, and in the record band the broker is accountable for a number it did not independently compute.

## The ten planes

| Plane | Primary system | Owns | Does not own |
|---|---|---|---|
| [Stack](/broking-kyc/finix-broking-setup/stack/) | — | Boundaries, naming, interface contracts | Any runtime behaviour |
| [Setting up](/broking-kyc/finix-broking-setup/setup/) | — | Registration, membership, capital, accounts, approvals | Anything that happens after go-live |
| [Onboarding](/broking-kyc/finix-broking-setup/onboarding/) | Digio, CVL <abbr title="KYC Registration Agency">KRA</abbr>, <abbr title="Central Registry of Securitisation Asset Reconstruction and Security Interest of India">CERSAI</abbr>, SecMark C-Safe | Client identity, consent, signature, screening, <abbr title="Unique Client Code">UCC</abbr> | Trading limits, funds |
| [OMS](/broking-kyc/finix-broking-setup/oms/) | Saral MoneyMaker | The order book, exchange sessions, order state | The margin number, the ledger |
| [RMS](/broking-kyc/finix-broking-setup/rms/) | Saral MoneyMaker RMS | Limits, margin at order time, square-off decisions | Order routing, settlement |
| [Back office](/broking-kyc/finix-broking-setup/backoffice/) | SecMark | Ledger of record, obligations, contract notes, reports | Intraday risk decisions |
| [Money movement](/broking-kyc/finix-broking-setup/money/) | Razorpay, RazorpayX, banks | Collection, disbursement, bank reconciliation, treasury | Client credit decisions |
| [Exchanges](/broking-kyc/finix-broking-setup/exchanges/) | <abbr title="National Stock Exchange of India">NSE</abbr>, <abbr title="BSE Limited (formerly Bombay Stock Exchange)">BSE</abbr>, <abbr title="Multi Commodity Exchange of India">MCX</abbr> and their clearing corporations | Matching, bands, halts, obligations, penalties | Everything inside the broker |
| [Daily operations](/broking-kyc/finix-broking-setup/daily-ops/) | People, with system support | The sequence and its timing | Any single system |
| [Compliance](/broking-kyc/finix-broking-setup/compliance/) | SecMark ComplianceSutra, <abbr title="Anti-Money Laundering">AML</abbr> Sutra | Evidence, filings, calendars, audit trail | Operational decisions |

## The three pages in this plane

- **[Vendor map](/broking-kyc/finix-broking-setup/stack/vendor-map/)** — what each named product actually does, with the public evidence for it, the boundaries where one product's responsibility ends, and the overlaps that have to be resolved by a decision rather than by both systems doing the job.
- **[Environments and configuration baseline](/broking-kyc/finix-broking-setup/stack/environments-config-baseline/)** — the environment matrix, the configuration key convention used throughout this manual, secret handling, change control, and the configuration items that are regulatory rather than discretionary.
- **[Integration contract matrix](/broking-kyc/finix-broking-setup/stack/integration-contract-matrix/)** — every interface in the stack: direction, transport, trigger, payload summary, timing, idempotency, failure mode and degraded behaviour.

## Where this connects

The design choices here are the practical form of the principles in [design principles](/broking-kyc/architecture/design-principles/), and the interface inventory is a stack-specific view of the dependency ordering in [integration <abbr title="Directed Acyclic Graph.">DAG</abbr>](/broking-kyc/operations/integration-dag/). If you want the same systems described without vendor names, [back office and RMS](/broking-kyc/appendix/back-office-rms/) and [OMS internals](/broking-kyc/deep-dives/trading-day/oms-internals/) are the vendor-neutral treatments.

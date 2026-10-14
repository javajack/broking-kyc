---
title: "Exchange nuances: overview"
description: What differs between NSE, BSE and MCX once you are connected — per-exchange behaviour in cash and derivatives, the commodity delivery regime, the cross-exchange difference matrix, sessions and calendars, bands, halts and surveillance measures, and the file-format reference the daily runbooks depend on.
---

> **Why this plane exists separately:** The [OMS plane](/broking-kyc/finix-broking-setup/oms/) describes how to connect and what an order is. This plane describes what each exchange actually does with it — and the differences are the part that breaks a design built against one exchange and generalised. Session boundaries, band semantics, freeze thresholds, settlement cycles, file names and delivery mechanics all vary, and several of them vary within an exchange by segment. The pages are therefore exchange-first, then a difference matrix, then the cross-cutting mechanisms.

## TL;DR

- **The equity day is a three-part structure, not a single session**: pre-open call auction from 09:00 to 09:15 with order entry, matching and buffer phases; continuous trading 09:15 to 15:30; closing session 15:30 to 15:40. After-market orders queued overnight are released into the pre-open at 09:00.
- **Settlement is T+1 in equity cash, with an optional T+0 regime** extended to the top 500 scrips by SEBI/HO/MRD/MRD-PoD-2/P/CIR/2024/02 (10 December 2024).
- **BSE's connectivity topology differs structurally**: a separate connection and a separate protocol instance per segment, which makes each segment its own integration, monitoring and certification track.
- **MCX is a different operating model**, not just a different market: a session to 23:30 — 23:55 in United States daylight saving — physical delivery with a tender period, a 19:30 delivery-intention deadline, and a margin ladder that starts before expiry week ends.
- **Order-type availability diverges and has been narrowing.** Stop-loss market orders were discontinued for options on NSE from 27 September 2021 and on BSE from 9 October 2023; market-priced multileg orders were discontinued; all-or-none and minimum fill sit in the protocol while being unavailable in practice.
- **Price protection operates in two layers in derivatives** — the operating price range and, since 31 October 2022, Limit Price Protection with dynamic, instrument-class-specific ranges.
- **Every daily runbook depends on files**, and the file set, names and timing differ per exchange and clearing corporation. [File formats and downloads](/broking-kyc/finix-broking-setup/exchanges/08-file-formats-downloads/) is the reference the [BOD](/broking-kyc/finix-broking-setup/daily-ops/01-bod-runbook/) and [EOD](/broking-kyc/finix-broking-setup/daily-ops/05-eod-runbook/) runbooks assert against.

## The pages

| # | Page | Scope |
|---|---|---|
| 1 | [NSE cash](/broking-kyc/finix-broking-setup/exchanges/01-nse-cash/) | Sessions, settlement, order behaviour, special markets, operational nuances |
| 2 | [NSE derivatives](/broking-kyc/finix-broking-setup/exchanges/02-nse-fno/) | Contracts, expiry, physical settlement, Limit Price Protection, ban periods, position limits |
| 3 | [BSE cash and derivatives](/broking-kyc/finix-broking-setup/exchanges/03-bse-cash-fno/) | The per-segment topology and what differs from NSE |
| 4 | [MCX commodities](/broking-kyc/finix-broking-setup/exchanges/04-mcx-commodity/) | The long session, tender and delivery, the margin ladder, warehouse operations |
| 5 | [Cross-exchange difference matrix](/broking-kyc/finix-broking-setup/exchanges/05-cross-exchange-matrix/) | Every difference that changes an implementation |
| 6 | [Sessions and calendars](/broking-kyc/finix-broking-setup/exchanges/06-sessions-calendars/) | Session state machines, holidays, special sessions, daylight saving |
| 7 | [Bands, halts and surveillance](/broking-kyc/finix-broking-setup/exchanges/07-bands-halts-surveillance/) | Price bands, circuit breakers, freezes, surveillance measures, ban periods |
| 8 | [File formats and downloads](/broking-kyc/finix-broking-setup/exchanges/08-file-formats-downloads/) | The complete file inventory with timing and consumers |

## Where this connects

- [Exchange connectivity protocols](/broking-kyc/finix-broking-setup/oms/02-exchange-connectivity-protocols/) — how you connect
- [Order types catalogue](/broking-kyc/finix-broking-setup/oms/04-order-types-catalogue/) — the support matrix these differences drive
- [Segment rules comparison](/broking-kyc/deep-dives/foundational/segment-rules-comparison/) — the vendor-neutral reference matrix
- [Pre-open and closing auction](/broking-kyc/deep-dives/foundational/pre-open-closing-auction/) — the auction mechanics in depth
- [Surveillance norms](/broking-kyc/deep-dives/trading-day/surveillance-norms-gsm-asm/) — the measure frameworks
- [Daily operations](/broking-kyc/finix-broking-setup/daily-ops/) — where these nuances are executed

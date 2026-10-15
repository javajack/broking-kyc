---
title: "Market data: overview"
description: The market data plane — what each exchange publishes and on what transport, the wire format and packet mechanics, how subscription and unsubscription actually work, gap recovery and redundant-line arbitration, internal normalisation and distribution, the fan-out that serves many concurrent app and programmatic consumers, redistribution licensing, and the separate content-data layer.
---

> **Why this plane is ordered this way:** Market data is the only plane in this manual that is read by every other one and owned by none of them. The risk ladder needs it in microseconds, the client's screen needs it in a readable rhythm, the valuation run needs it coherent across instruments, and the surveillance engine needs every print in order. So the plane is ordered from the wire inward and then outward again: what the venue sends, how it is framed, how it is subscribed to, what to do when it breaks, how it becomes one internal representation, and only then how it reaches a hundred thousand concurrent consumers. The fan-out page is late in the sequence deliberately — almost every mistake made there is a consequence of a decision taken in one of the earlier pages.

## TL;DR

- **Three venues, three unrelated market data architectures.** The order path already needed two adapter codebases; market data needs three, because the feed products, the transports, the subscription models and the recovery mechanics have nothing in common.
- **"Subscription" means different things on different feeds.** Some are a full firehose where the only selection is what you choose to decode; some require explicit per-instrument requests; some require joining the right multicast groups and nothing else. Getting this wrong at design time produces either a capacity problem or a silent blind spot.
- **Market data fails silently, and nothing else in the stack does.** A feed that stops updating one instrument produces no error anywhere. Every downstream number continues to be computed, confidently, from a dead price. Per-instrument staleness detection is the single highest-value control in this plane.
- **Conflation is a correctness boundary, not an optimisation.** Dropping intermediate ticks is right for a human screen and wrong for anything that must reconstruct what the market looked like at a moment.
- **The fan-out layer is the firm's own protocol, and nobody else's document specifies it.** Subscription multiplexing, per-client caps, reconnect and resume, sequence semantics and back-pressure are all the firm's design decisions, and clients will build against whatever it does on day one.
- **Receiving data and being allowed to show it are different questions.** The licence under which a member receives a feed governs what it may display, to whom, and what it must report — and pushing live prices to a retail app is a licensing question before it is an engineering one.
- **Price data and content data are separate supply chains.** Fundamentals, corporate actions, ratios, news and research come from a different kind of supplier, on a different cadence, with different failure consequences, and they do not belong in the same plane as a multicast feed.

## The pages

| # | Page | What it settles |
|---|---|---|
| 1 | [The feed catalogue](/broking-kyc/finix-broking-setup/marketdata/01-feed-catalogue/) | Every market data product at <abbr title="National Stock Exchange of India">NSE</abbr>, <abbr title="BSE Limited (formerly Bombay Stock Exchange)">BSE</abbr> and <abbr title="Multi Commodity Exchange of India">MCX</abbr>: official names, coverage, transport, availability, who may take it, and the route to get it |
| 2 | [Wire formats and packets](/broking-kyc/finix-broking-setup/marketdata/02-wire-format-and-packets/) | The packet envelope, compression, sequencing, the message families, depth semantics, and snapshot versus incremental |
| 3 | [Subscription mechanics](/broking-kyc/finix-broking-setup/marketdata/03-subscription-mechanics/) | Firehose or subscription per feed, the subscribe and unsubscribe requests, multicast group membership, and the published limits |
| 4 | [Gap recovery and arbitration](/broking-kyc/finix-broking-setup/marketdata/04-gap-recovery-and-arbitration/) | Gap detection, redundant-line arbitration, retransmission and snapshot recovery, and what to do when recovery is not offered |
| 5 | [Normalisation and internal distribution](/broking-kyc/finix-broking-setup/marketdata/05-normalisation-and-internal-distribution/) | The layer between the feed handler and every consumer: conflation policy, staleness, the price that is not one price, and the two stores |
| 6 | [Fan-out to clients](/broking-kyc/finix-broking-setup/marketdata/06-fanout-to-clients/) | The streaming interface the firm publishes: subscription multiplexing, per-client caps, reconnect and resume, back-pressure, and scale |
| 7 | [Redistribution and licensing](/broking-kyc/finix-broking-setup/marketdata/07-redistribution-and-licensing/) | What the firm may do with the data it receives, what it must report, and where the display and non-display line falls |
| 8 | [The content data layer](/broking-kyc/finix-broking-setup/marketdata/08-content-data-layer/) | Fundamentals, corporate actions, news and research: a different supply chain, and whether it needs its own treatment |
| 9 | [Configuration reference](/broking-kyc/finix-broking-setup/marketdata/09-marketdata-config-reference/) | Every tunable in the plane, its default, its class and its failure mode |

## The two bands in this plane

The plane divides at the normalisation layer, and the two halves have opposite engineering properties.

**Inbound** — pages 1 to 4 — is governed entirely by documents the firm did not write. The venues decide the formats, the transports, the subscription models, the recovery facilities and the licensing. There is no design freedom and considerable room for error, because each venue's behaviour has to be implemented as specified rather than as expected. The work is exacting rather than creative, and the failure mode is a defect that only appears under load or after a gap.

**Outbound** — pages 5 to 8 — is almost entirely the firm's own design, and nobody else's document specifies it. How many instruments a client may subscribe to, what happens on reconnect, whether updates carry sequence numbers, how a slow mobile connection is handled, what a client is permitted to see and what the firm must report about it: these are decisions, and the firm will live with the first version of them for a long time because clients build against them. The failure mode here is not a defect but a commitment — an interface published without a rate limit, a cap or a resume semantic is very hard to change afterwards.

## Where this connects

- [Exchange connectivity protocols](/broking-kyc/finix-broking-setup/oms/02-exchange-connectivity-protocols/) — the links these feeds arrive on, and the order path alongside them
- [Order path edge cases](/broking-kyc/finix-broking-setup/oms/12-order-path-edge-cases/) — the same discipline applied to the order path: sequencing, silent loss and control messages
- [The gateway and event architecture](/broking-kyc/finix-broking-setup/stack/bff-and-event-architecture/) — why market data and order events are separate transports with separate guarantees
- [Pre-trade check ladder](/broking-kyc/finix-broking-setup/rms/03-pretrade-check-ladder/) — the consumer with the hardest latency requirement
- [Infrastructure and connectivity](/broking-kyc/finix-broking-setup/setup/08-infrastructure-connectivity/) — bandwidth, colocation and the physical arrangement
- [The file register](/broking-kyc/finix-broking-setup/files/01-file-register-architecture/) — the source of the reproducible price record
- [Algo, API, DMA and <abbr title="Smart Order Routing">SOR</abbr>](/broking-kyc/finix-broking-setup/oms/09-algo-api-dma-sor/) — the programmatic consumers of both planes
- [Vendor interface verification](/broking-kyc/finix-broking-setup/stack/vendor-interface-verification/) — establishing what a data supplier actually publishes before signing

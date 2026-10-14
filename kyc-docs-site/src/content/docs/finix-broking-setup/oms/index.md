---
title: "OMS: overview"
description: The order management plane on Saral MoneyMaker — architecture, exchange protocols, user identifiers, the complete order-type catalogue across NSE, BSE and MCX, order attributes and validity, the forward and return paths with every state and rejection class, modification rules, algorithmic and programmatic access, and the configuration reference.
---

> **Why this plane is ordered this way:** An order management system is usually described by its features, which tells you nothing about whether it will behave correctly. The useful description is a path: where an order enters, what it must carry, what happens to it at each hop, what can come back, and what the system must do with each thing that comes back. So this plane starts with the architecture and the connectivity underneath it, then establishes what an order *is* — its type, its attributes, its validity — before tracing it forward to the exchange and back again. Modification and cancellation come after the return path because they are only comprehensible once you know what state an order can be in. Algorithmic and programmatic access comes last because it is the same path with different entry characteristics and a much higher obligation.

## TL;DR

- **The order path is the only hard real-time system the firm operates.** Everything else can retry; an order cannot. [<abbr title="Order Management System">OMS</abbr> architecture](/broking-kyc/finix-broking-setup/oms/01-oms-architecture/) and the [forward path](/broking-kyc/finix-broking-setup/oms/06-order-forward-path/) are written to that standard.
- **"Order type" conflates three independent things**: the price instruction, the time instruction and the quantity instruction. <abbr title="National Stock Exchange of India">NSE</abbr>'s own structure makes this explicit — order conditions are classified as time-related, price-related and quantity-related, and they combine. [Order types](/broking-kyc/finix-broking-setup/oms/04-order-types-catalogue/) and [attributes and validity](/broking-kyc/finix-broking-setup/oms/05-order-attributes-validity/) separate them deliberately.
- **Some order types are the exchange's and some are the broker's.** A limit order exists at the exchange; a cover order, a bracket order and most Good Till Triggered implementations exist only in the broker's system and are reconstructed as exchange orders when their condition fires. Confusing the two produces client expectations the exchange will not honour.
- **Not every attribute is available everywhere.** All or None and Minimum Fill exist in the order-book structure but are not available on the system per <abbr title="Securities and Exchange Board of India">SEBI</abbr> directives; Good Till Cancelled and Good Till Date are applicable for commodities; multileg orders with a market price condition for all contracts were discontinued and such orders are rejected. The matrix matters more than the list.
- **The return path has more states than the forward path**, and most production defects live there: acknowledgement, rejection, partial fill, full fill, trigger, freeze, cancellation by the exchange, and unsolicited messages. See [the return path](/broking-kyc/finix-broking-setup/oms/07-order-return-path/).
- **Exchange-side price protection rejects orders your own checks would pass.** NSE's Limit Price Protection, introduced on 31 October 2022 in the derivatives segment, validates limit order prices against a dynamic range around a reference price, over and above the operating price range. Orders outside it are rejected by the exchange.
- **Every order type you offer must be certified**, and the enabled configuration must match the certification record exactly. See [certification](/broking-kyc/finix-broking-setup/setup/10-certification-mock-golive/).

## The pages

| # | Page | What it settles |
|---|---|---|
| 1 | [OMS architecture](/broking-kyc/finix-broking-setup/oms/01-oms-architecture/) | Components, the single release point, state ownership, latency budget |
| 2 | [Exchange connectivity protocols](/broking-kyc/finix-broking-setup/oms/02-exchange-connectivity-protocols/) | NSE <abbr title="Non-NEAT Front End">NNF</abbr> and the Trading Access Point, <abbr title="BSE Limited (formerly Bombay Stock Exchange)">BSE</abbr> <abbr title="Enhanced Trading Interface">ETI</abbr> sessions per segment, <abbr title="Multi Commodity Exchange of India">MCX</abbr>, session management |
| 3 | [User IDs, <abbr title="Computer-to-Computer Link.">CTCL</abbr> and NNF](/broking-kyc/finix-broking-setup/oms/03-user-id-ctcl-nnf/) | Identifier schemes, the reporting obligation, the register and its reconciliation |
| 4 | [Order types catalogue](/broking-kyc/finix-broking-setup/oms/04-order-types-catalogue/) | Every order type, exchange-native and broker-synthetic, with the support matrix |
| 5 | [Order attributes and validity](/broking-kyc/finix-broking-setup/oms/05-order-attributes-validity/) | Time, price and quantity conditions, and which combinations are legal where |
| 6 | [Order forward path](/broking-kyc/finix-broking-setup/oms/06-order-forward-path/) | Entry to exchange, every check in order, with the state machine |
| 7 | [Order return path](/broking-kyc/finix-broking-setup/oms/07-order-return-path/) | Everything that can come back, and what must happen to each |
| 8 | [Modification and cancellation](/broking-kyc/finix-broking-setup/oms/08-modify-cancel-rules/) | What may change, what resets priority, and the race conditions |
| 9 | [Algo, API, DMA and <abbr title="Smart Order Routing">SOR</abbr>](/broking-kyc/finix-broking-setup/oms/09-algo-api-dma-sor/) | Approvals, controls, rate limits, the kill switch |
| 10 | [OMS configuration reference](/broking-kyc/finix-broking-setup/oms/10-oms-config-reference/) | Every tunable, its default, its class and its failure mode |

## Where this connects

- [<abbr title="Risk Management System">RMS</abbr>](/broking-kyc/finix-broking-setup/rms/) — the release decision the OMS defers to
- [Exchange nuances](/broking-kyc/finix-broking-setup/exchanges/) — the exchange-specific behaviour the OMS must accommodate
- [OMS internals](/broking-kyc/deep-dives/trading-day/oms-internals/) — the vendor-neutral treatment
- [Order and risk controls](/broking-kyc/trading-risk/order-risk-controls/) — the regulatory control set
- [Continuous session operations](/broking-kyc/finix-broking-setup/daily-ops/03-continuous-session-ops/) — running this plane during the day

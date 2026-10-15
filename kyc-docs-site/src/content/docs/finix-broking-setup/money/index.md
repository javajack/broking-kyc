---
title: "Money movement: overview"
description: The money plane — Razorpay collection and RazorpayX disbursement, the bank account architecture they settle into, reconciliation, treasury and exchange funding, end-of-day upstreaming, and the race conditions between a money clock and a trading clock that do not tick together.
---

> **Why this plane is ordered this way:** Money and trading are two clocks. A client's payment can be authorised and still not be good funds; an exchange margin call can land before a treasury transfer settles; a pay-out can be approved against a credit that has not cleared. Everything difficult in this plane is a consequence of that gap, so the pages run from the mechanics outward: architecture, then collection, then disbursement, then the reconciliation that proves both, then treasury, then upstreaming, and finally the race conditions themselves — which get a page of their own because they are the subject, not an appendix.

## TL;DR

- **Client money is not revenue.** Every payment rail in this stack is built for merchants, where collected money belongs to the merchant. For a broker it belongs to the client, must be segregated from the firm's own funds and from other clients' funds by statute, and must settle into the prescribed nodal account.
- **Two accounts with prescribed names carry client money**: the Upstreaming Client Nodal Bank Account, "Name of the SB/<abbr title="Clearing Member">CM</abbr> – <abbr title="Upstreaming Client Nodal Bank Account">USCNB</abbr> account", and the Downstreaming Client Nodal Bank Account, "Name of the SB/CM – <abbr title="Downstreaming Client Nodal Bank Account">DSCNB</abbr> account", from which client payments are made after funds are received from the clearing corporation or clearing member the same day.
- **Third-party payments are prohibited**, which makes payer attribution an architectural requirement rather than a reconciliation convenience.
- **Validated <abbr title="Unified Payments Interface">UPI</abbr> handles apply to broker collection**, with the `@valid` structure and the `brk` username suffix for brokers, extended in August 2026 to investor-facing collection accounts including depository-participant charge accounts.
- **Clear credit balances are upstreamed to clearing corporations at end of day**, in cash, a lien on fixed deposit receipts, or a pledge of mutual fund overnight scheme units.
- **The bank's cut-off is the real deadline**, always earlier than the clearing corporation's, and the internal deadline is earlier still.
- **Capacity is granted on confirmed good funds, never on an authorisation.** The gap between the two is where credit is extended against money that may reverse.

## The pages

| # | Page | What it settles |
|---|---|---|
| 1 | [Payments architecture](/broking-kyc/finix-broking-setup/money/01-payments-architecture/) | The account map in motion, the two Razorpay products, and who owns what |
| 2 | [Pay-in rails](/broking-kyc/finix-broking-setup/money/02-payin-rails/) | Collection channels, validated handles, virtual accounts, payer attribution, the confirmation gate |
| 3 | [Pay-out engine](/broking-kyc/finix-broking-setup/money/03-payout-engine/) | Authorisation, the contact and fund-account model, idempotency, webhooks, reversals |
| 4 | [Bank reconciliation](/broking-kyc/finix-broking-setup/money/04-bank-recon/) | Matching across bank, gateway and ledger; exception ageing; unattributed money |
| 5 | [Treasury and exchange funding](/broking-kyc/finix-broking-setup/money/05-treasury-exchange-funding/) | Funding the clearing account, intraday liquidity, cash-equivalent composition |
| 6 | [Upstreaming and downstreaming](/broking-kyc/finix-broking-setup/money/06-upstreaming-downstreaming/) | The end-of-day computation and instruction, and the forms permitted |
| 7 | [Money and trade in sync](/broking-kyc/finix-broking-setup/money/07-money-trade-sync/) | Every race condition between the two clocks, with its correct resolution |
| 8 | [Money operations catalogue](/broking-kyc/finix-broking-setup/money/08-money-operations-catalogue/) | Every money action a human can take, from a routine pay-out release to the interventions that only happen under pressure |
| 9 | [Real-time limit updates](/broking-kyc/finix-broking-setup/money/09-realtime-limit-updates/) | How a pay-in becomes trading capacity in seconds rather than at the next extract, and why attribution is the binding constraint |

## Where this connects

- [Bank account architecture](/broking-kyc/finix-broking-setup/setup/06-bank-account-architecture/) — the account map this plane operates
- [Ledger and accounting](/broking-kyc/finix-broking-setup/backoffice/04-ledger-accounting/) — where money becomes a client balance
- [Limit framework](/broking-kyc/finix-broking-setup/rms/04-limit-framework/) — where confirmed funds become capacity
- [Settlement obligations](/broking-kyc/finix-broking-setup/backoffice/05-settlement-obligations/) — what the treasury funds
- [Client funds upstreaming](/broking-kyc/deep-dives/settlement/client-funds-upstreaming/) — the regime in depth

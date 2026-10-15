---
title: "Product operations: overview"
description: The products a broker runs beyond plain delivery and intraday trading — margin trading, the pledge lifecycle, the derivatives contract and expiry cycle, physical settlement, commodity delivery, currency and rate derivatives, securities lending, and primary-market and fund platforms — each at configuration and operating-sequence level.
---

> **Why this plane exists:** Each product in this plane adds a distinct operational machine rather than a new order type. Margin trading adds a loan book. Pledging adds a state machine that spans two depositories. Physical settlement adds a delivery obligation that can be far larger than the margin held. Commodity delivery adds warehouses. Treating these as product toggles is how firms discover, in an expiry week, that enabling a product enabled an obligation they had not staffed.

## TL;DR

- **Enabling a product enables an obligation.** Every page here ends with what must be true operationally before the product is switched on; the consolidated view is the enablement matrix.
- **Two pools of securities, governed differently.** Funded stock and margin collateral look alike and are not, and conflating them is the most consequential error available in margin trading.
- **A pledge cannot span the two depositories.** Pledgor and pledgee must sit in the same one, which constrains account architecture rather than being a technicality.
- **Open interest is now delta-adjusted for index options.** Limits are measured on a net future-equivalent basis at portfolio level, and index futures deliberately stayed on gross notional.
- **Physical settlement escalates margin through expiry week** on a published ladder, and the client warning has to precede the escalation, not follow it.
- **Several widely repeated "rules" are proposals.** The pages separate what is in force from what a consultation proposed.

## The pages

| Page | What it covers |
|---|---|
| [Margin trading facility operations](/broking-kyc/finix-broking-setup/products/01-mtf-operations/) | Permission, eligibility, the exact borrowing and exposure arithmetic, variable initial margin, where funded stock sits, reporting, and in-force versus proposed |
| [The pledge lifecycle](/broking-kyc/finix-broking-setup/products/02-pledge-lifecycle/) | The four distinct pledge arrangements, the state machine, both depositories' mechanics, invocation and its 2026 notice obligation, and the edge cases |
| [The derivatives contract lifecycle](/broking-kyc/finix-broking-setup/products/03-fno-contract-lifecycle/) | Contract introduction and the expiry-weekday regime, strike chains, the contract master's daily churn, and position limits on a delta-adjusted basis |
| [Expiry and physical settlement](/broking-kyc/finix-broking-setup/products/04-expiry-physical-settlement/) | Settlement price determination, exercise and assignment, the delivery-margin ladder, netting, and the operating sequence on expiry evening |
| [Commodity delivery operations](/broking-kyc/finix-broking-setup/products/05-commodity-delivery-operations/) | Tender and delivery periods, warehousing and receipts, the evening session, and how a broker that does not want delivery operates |
| [Currency and rate derivatives](/broking-kyc/finix-broking-setup/products/06-currency-ird-operations/) | The underlying-exposure regime, position limits, settlement, and the broker-side controls |
| [Securities lending operations](/broking-kyc/finix-broking-setup/products/07-slbm-operations/) | Enrolment, the two legs, margin, recall and foreclosure |
| [Primary market and fund platforms](/broking-kyc/finix-broking-setup/products/08-ipo-mf-bonds-operations/) | Public issue applications, fund platforms, bonds and government securities |
| [The product enablement matrix](/broking-kyc/finix-broking-setup/products/09-product-enablement-matrix/) | What must be true — permission, documentation, systems, people, reporting — before each product goes live |

## Where this connects

Client-side activation is under [product activation](/broking-kyc/product-activation/) and the risk treatments under [trading risk and derivatives](/broking-kyc/trading-risk/). Capacity effects are in [the limit impact matrix](/broking-kyc/finix-broking-setup/rms/10-limit-impact-matrix/), and the expiry-day sequence in [expiry operations](/broking-kyc/finix-broking-setup/daily-ops/08-expiry-ops/).

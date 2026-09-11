---
title: "Trading Risk & Derivatives"
description: Selector for the eight trading-risk pages — exercise and physical settlement, expiry-day operations, position limits and open interest, collateral and cross-margin, margin shortfall, order controls, proprietary/employee trading, and client protection.
---

> **Why this page is structured this way:** The eight pages below answer eight different questions that arrive at a broker's risk desk from eight different directions — a client asking what happens if they hold a stock option to expiry, a compliance officer asking who monitors a position limit intraday, a finance head asking why pledged collateral produced less buying power than expected. The selector table maps question to page so a reader does not have to read the section linearly. The closing paragraph places this section relative to the broker-side deep dives that already exist.

## TL;DR

- **Eight topic pages.** Four cover derivatives mechanics (settlement at expiry, expiry-day operations, position limits, collateral); four cover the control layer (margin penalties, order-level risk controls, proprietary and employee trading, client protection).
- **Client-facing bias.** Where a broker-side deep dive already exists — [<abbr title="Standard Portfolio Analysis of Risk">SPAN</abbr> and margin methodology](/broking-kyc/deep-dives/trading-day/rms-span-methodology/), [short delivery and auction](/broking-kyc/deep-dives/trading-day/short-delivery-auction/), [surveillance measures](/broking-kyc/deep-dives/trading-day/surveillance-norms-gsm-asm/) — these pages cover the client-visible consequence and the servicing workflow, and link rather than repeat.
- **Regulatory spine.** The 2024–2026 equity-derivatives reform sequence: [<abbr title="Securities and Exchange Board of India">SEBI</abbr>/<abbr title="Head Office (SEBI circular ID prefix)">HO</abbr>/<abbr title="Market Regulation Department (SEBI)">MRD</abbr>/TPD/P/CIR/2024/132](/broking-kyc/reference/circulars/sebi-other/#sebihomrdtpdpcir2024132) (Oct 1, 2024), SEBI/HO/MRD/TPD-1/P/CIR/2025/76 and /2025/79 (May 2025), SEBI/HO/MRD/TPD-1/P/CIR/2025/122 (Sep 1, 2025), and HO/47/15/11(2)2025-MRD-TPD1/ I/4226/2026 (Feb 5, 2026). The 2025 and 2026 instruments in that list are cited by verbatim ID and link to the issuer page: `[not yet in index]`.
- **Collateral spine.** [SEBI/HO/MRD2_DCAP/CIR/2021/0598](/broking-kyc/reference/circulars/sebi-other/#sebihomrd2_dcapcir20210598) (client-level collateral segregation) and [SEBI/HO/<abbr title="Markets Intermediaries Regulation and Supervision Department (SEBI)">MIRSD</abbr>/DOP/CIR/P/2020/28](/broking-kyc/reference/circulars/sebi-mirsd/#sebihomirsddopcirp202028) (margin pledge in the depository system).
- **Every page carries a `Verified through 2026-09-11` stamp** and tags unverified claims explicitly.

## Selector

| Page | The question it answers | Who reads it | Primary regulatory anchor | Depends on |
| --- | --- | --- | --- | --- |
| [Exercise, assignment and physical settlement](./exercise-assignment-physical/) | What happens to a stock future or stock option that is still open at expiry, and what does the client have to fund or deliver? | <abbr title="Risk Management System">RMS</abbr> desk, settlement ops, client servicing | SEBI physical-settlement circulars (2018–2019); [<abbr title="NSE Clearing Limited (formerly National Securities Clearing Corporation Limited)">NCL</abbr>/CMPT/55330](/broking-kyc/reference/circulars/clearing-corps/#nclcmpt55330) net settlement | Delivery margins, demat holdings, debit authorisation |
| [Expiry-day operations](./expiry-day-operations/) | What changes on an expiry day — margins, premium collection, spread benefit, monitoring — and what is the broker's runbook? | RMS head, <abbr title="Order Management System">OMS</abbr> owner, operations lead | [SEBI/HO/MRD/TPD/P/CIR/2024/132](/broking-kyc/reference/circulars/sebi-other/#sebihomrdtpdpcir2024132); SEBI/HO/MRD/TPD-1/P/CIR/2025/76 | Contract master, risk-parameter files, client margin statement |
| [Position limits and open interest](./position-limits-oi/) | How much can one client, one member or the market as a whole hold, and what happens on a breach? | Compliance officer, surveillance desk | SEBI/HO/MRD/TPD-1/P/CIR/2025/79; SEBI/HO/MRD/TPD-1/P/CIR/2025/122 | <abbr title="Permanent Account Number">PAN</abbr>/<abbr title="Unique Client Code">UCC</abbr> aggregation, delta feeds, <abbr title="Market Wide Position Limit">MWPL</abbr> files |
| [Collateral and cross-margin](./collateral-cross-margin/) | Which assets create margin capacity, how much after haircuts, and when does an offsetting position reduce the requirement? | Finance, RMS, back-office | [SEBI/HO/MRD2_DCAP/CIR/2021/0598](/broking-kyc/reference/circulars/sebi-other/#sebihomrd2_dcapcir20210598); [NCL/CMPT/62978](/broking-kyc/reference/circulars/clearing-corps/#nclcmpt62978) | Pledge confirmations, eligibility lists, allocation files |
| [Margin shortfall and peak margin](./margin-shortfall-peak-margin/) | How is a shortfall measured against intraday snapshots, and what penalty follows? | RMS, compliance, internal audit | [SEBI/HO/MRD2/DCAP/CIR/P/2020/127](/broking-kyc/reference/circulars/sebi-other/#sebihomrd2dcapcirp2020127) | Snapshot files, allocation reporting |
| [Order and risk controls](./order-risk-controls/) | Which pre-trade and intraday controls must sit in front of an order, and what happens when a broker's systems fail? | OMS/RMS engineering, technology compliance | Kill switch, <abbr title="Investor Risk Reduction Access">IRRA</abbr> and price-band frameworks | OMS limits, exchange APIs |
| [Proprietary, employee and insider-trading policy](./prop-employee-trading-pit/) | What must a broker disclose about its own trading, and how are staff dealings controlled? | Compliance officer, HR, internal audit | Broker regulations; <abbr title="Prohibition of Insider Trading">PIT</abbr> Regulations and structured digital database obligations | Employee registers, PAN mapping |
| [Client protection frameworks](./client-protection-frameworks/) | Which client-side safeguards must a broker implement — authentication, verified handles, disclosure documents, voluntary freeze? | Product, compliance, support | 2FA and <abbr title="Most Important Terms and Conditions">MITC</abbr> frameworks; SEBI Check; validated <abbr title="Unified Payments Interface">UPI</abbr> handles | Onboarding data, communication stack |

## How to choose

Start from the event, not the page title.

- **A position is open on expiry morning.** Read [expiry-day operations](./expiry-day-operations/) for the margin and monitoring changes that apply during the session, then [exercise, assignment and physical settlement](./exercise-assignment-physical/) for what happens after the close.
- **A client has been told they cannot add a position.** The cause is either a position limit (read [position limits and open interest](./position-limits-oi/)) or insufficient recognised collateral (read [collateral and cross-margin](./collateral-cross-margin/)). These are separate tests and a breach of one is not cured by fixing the other.
- **A penalty or a debit has appeared without a new trade.** Check whether the cause is a margin shortfall against an intraday snapshot ([margin shortfall and peak margin](./margin-shortfall-peak-margin/)), a delivery margin staged during expiry week ([exercise, assignment and physical settlement](./exercise-assignment-physical/)), or the loss of a spread or cross-margin benefit when one leg expired ([collateral and cross-margin](./collateral-cross-margin/)).
- **Something failed on the broker's side.** [Order and risk controls](./order-risk-controls/) covers kill switch, investor risk reduction access and price-band behaviour; [client protection frameworks](./client-protection-frameworks/) covers what the client is entitled to see and do.
- **An inspection question has arrived.** [Proprietary, employee and insider-trading policy](./prop-employee-trading-pit/) and [position limits and open interest](./position-limits-oi/) carry the register-and-evidence obligations that inspections test most often.

## Two distinctions this section keeps separate

**Margin capacity versus position permission.** More collateral raises the margin a client can support; it does not raise a position limit. The collateral page and the position-limits page never substitute for each other.

**Exchange requirement versus broker policy.** Almost every number here has a regulatory floor and a stricter broker overlay. Broker-side figures taken from public policy documents rather than circulars are tagged `[industry practice]` and attributed. Implement the regulatory obligation; treat the broker figure as an example of how firms set buffers.

## How this section relates to the rest of the site

The [deep dives](/broking-kyc/deep-dives/) already describe the broker's internal machinery: how SPAN builds an initial margin from a sixteen-scenario grid, how a short delivery becomes an auction, how the surveillance stack stages a stock into <abbr title="Graded Surveillance Measure">GSM</abbr> or <abbr title="Additional Surveillance Measure">ASM</abbr>, how client funds are upstreamed to the clearing corporation. This section sits one layer up from that machinery and one layer down from the [broker process narrative](/broking-kyc/broker-process/narrative/): it takes the specific derivatives and risk events that a client or a regulator actually asks about and walks them end to end, naming the circular, the file, the screen and the consequence at each step.

Three other layers connect to it. The [field atlas](/broking-kyc/reference/field-atlas/) carries the field-by-field destination mapping for the computed risk values these pages describe — see the [computed margin](/broking-kyc/reference/field-atlas/sections/computed-margin/), [computed peak margin](/broking-kyc/reference/field-atlas/sections/computed-peak-margin/) and [margin pledge](/broking-kyc/reference/field-atlas/sections/x-margin-pledge/) sections. The [integration <abbr title="Directed Acyclic Graph.">DAG</abbr>](/broking-kyc/operations/integration-dag/) places the same steps on a dependency graph, with [trading hours](/broking-kyc/operations/integration-dag/trading-hours/) covering the intraday loop that expiry-day operations sits inside. The [segment rules comparison](/broking-kyc/deep-dives/foundational/segment-rules-comparison/) gives the per-segment baseline — hours, settlement cycle, lot sizes, eligibility — that these pages assume rather than restate.

Finally, activation comes first. A client cannot reach any of these events without the segment being enabled, which is covered in the [trading preferences](/broking-kyc/journey/06-trading-preferences/) journey screen and in the product-activation section. Read activation before risk if the question is "why can this client not trade this at all".

## Verified through

2026-09-11

---

*AI-generated and not legal, financial, or compliance advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*

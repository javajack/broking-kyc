---
title: Lifecycle (post-onboarding)
description: Operator-friendly step-by-step walkthroughs for every post-onboarding KYC lifecycle event — re-KYC, modifications, dormancy & reactivation, voluntary closure, transmission (deceased), NRI ↔ resident conversion.
---

> **Why this page is structured this way:** Onboarding has 9 well-known screens, documented under [User Journey](/broking-kyc/journey/). Post-onboarding events are less standardized — each scenario has its own trigger, its own field set, its own propagation path through <abbr title="KYC Registration Agency">KRA</abbr> / <abbr title="Central KYC (records registry)">CKYC</abbr> / <abbr title="Unique Client Code">UCC</abbr> / <abbr title="Beneficial Owner">BO</abbr>. This section is the operator walkthrough for each scenario, parallel in shape to the onboarding journey.

## TL;DR

- 6 scenario pages plus this overview.
- Each scenario page: step-by-step walkthrough, field-level callouts, regulatory citations, sub-cases, practical notes.
- Complementary to the [Compliance Blueprint](/broking-kyc/operations/compliance-blueprint/) (what must be done), the [Integration <abbr title="Directed Acyclic Graph.">DAG</abbr>](/broking-kyc/operations/integration-dag/) (dependency structure), the [Broker Process Narrative](/broking-kyc/broker-process/narrative/) (chronological story), and the [Field-level Data Flow Atlas](/broking-kyc/reference/field-atlas/) (where each field flows).
- AI-generated synthesis. **Verify each scenario's procedural details against current circulars and your back-office configuration before relying on them in production.**

## Scenarios

| Scenario | Typical timeline | Page |
|---|---|---|
| Re-<abbr title="Know Your Customer (process).">KYC</abbr> (risk-tier-based refresh) | 2y / 8y / 10y per risk tier | [re-kyc](./re-kyc/) |
| Modifications (address / bank / nominee / segment / mobile / email / name) | 1–3 days per modification | [modifications](./modifications/) |
| Dormancy → Reactivation | 12-month detection; reactivation 1–3 days | [dormancy-reactivation](./dormancy-reactivation/) |
| Voluntary closure | 5–7 business days end-to-end | [closure](./closure/) |
| Transmission (deceased client) | weeks (nominee path) to months (succession) | [transmission](./transmission/) |
| <abbr title="Non-Resident Indian">NRI</abbr> ↔ Resident conversion | 1–4 weeks both directions | [nri-conversion](./nri-conversion/) |

## How the lifecycle pages relate to other site sections

- **What must happen** — the [Compliance Blueprint KYC-lifecycle domain](/broking-kyc/operations/compliance-blueprint/) lists every verifiable obligation per scenario.
- **What runs before what** — the [Integration DAG lifecycle-events page](/broking-kyc/operations/integration-dag/lifecycle-events/) maps the dependency graph for each scenario.
- **Where the data flows** — the [Field-level Data Flow Atlas](/broking-kyc/reference/field-atlas/) shows which destinations receive each modified field.
- **How it fits the operational day** — the [Broker Process Narrative Section 6](/broking-kyc/broker-process/narrative/) puts these scenarios in narrative context.
- **This section** — operator walkthroughs you can hand to a new ops engineer learning the scenarios.

## Practical notes

- **[industry practice]** Most brokers maintain a "lifecycle queue" distinct from the onboarding queue. The ops teams running the two queues have different rhythms: onboarding is high-volume / standardised; lifecycle is lower-volume / higher per-case variation.
- **[gotcha]** The single most common mistake across all lifecycle scenarios: firing KRA / CKYC / exchange UCC / depository BO updates concurrently for a modification. They must serialize — KRA first, the rest validate against the new KRA state. See the [Integration DAG modification path](/broking-kyc/operations/integration-dag/lifecycle-events/).
- **[risk trade-off]** Tighter dormancy detection (e.g., 6 months instead of 12) reduces stale-account risk but increases friction for occasional traders. Industry default is 12 months; tighter settings are a deliberate broker-policy choice with measurable customer-experience cost.
- **[cost optimization]** Lifecycle events generate disproportionate operational cost relative to their volume because they don't fit standard onboarding pipelines. Brokers that invest in specific lifecycle-scenario runbooks for ops staff see substantially faster average resolution time on these events.

## Verified through

2026-05-14

---

*AI-generated and not legal, financial, or compliance advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*

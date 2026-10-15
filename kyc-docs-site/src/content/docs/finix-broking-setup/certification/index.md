---
title: "Software certification and change control: overview"
description: What a broker must do with the exchange whenever trading software is introduced or changed — the approval regime for terminals, internet and mobile applications and programmatic access, terminal and user-identifier registration, how a version or logic change is classified and re-certified, and how mock trading and recovery drills are arranged and evidenced.
---

> **Why this plane exists:** A broking firm's software is not merely its own concern. Terminals and user identifiers are registered with the exchange, internet and mobile applications need approval before clients touch them, protocol versions are mandated and upgrade windows are enforced, and periodic mock sessions are the mechanism by which the exchange satisfies itself that a member's systems work. A firm that treats a release as an internal event will eventually ship a change that invalidates a certification, and discover it through a rejection or an inspection finding.

## TL;DR

- **Not everything needs approval, and the distinctions matter.** Some software needs prior exchange approval, some needs empanelment of the vendor, some needs only intimation, and some needs nothing — and the categories differ by channel.
- **Terminal and identifier registration is continuous, not one-off.** Additions, deletions and relocations are intimated on a clock, and an unreported terminal is a named contravention.
- **A change's classification determines its consequence.** A cosmetic change, a functional change, a change to risk logic and a protocol version bump have entirely different obligations.
- **Protocol versions are mandated and windows are enforced.** The exchange, not the firm, decides when an interface version stops being accepted.
- **Mock sessions are a participation obligation with evidence**, not an optional rehearsal, and the recovery drill regime sits alongside them.
- **The system audit examines change management specifically**, including vendor-supplied order and risk systems, so the version register is an audit artefact.

## The pages

| Page | What it covers |
|---|---|
| [The software approval regime](/broking-kyc/finix-broking-setup/certification/01-software-approval-regime/) | What requires approval, empanelment or intimation across terminals, internet and mobile applications, programmatic access and algorithmic strategies, and the vendor-product versus in-house distinction |
| [Mobile and web application submission](/broking-kyc/finix-broking-setup/certification/02-mobile-web-app-submission/) | The submission pack, the security audit and penetration testing requirement, authentication requirements, client-facing disclosures, and what the approval covers |
| [Terminal and user-identifier registration](/broking-kyc/finix-broking-setup/certification/03-ctcl-nnf-terminal-registration/) | The identifier scheme, location reporting, the register the firm must maintain, and the reconciliation against exchange records |
| [Change and version control](/broking-kyc/finix-broking-setup/certification/04-change-version-control/) | Change classification, what triggers re-certification, mandated interface versions and upgrade windows, change-freeze periods, and the version register |
| [Mock trading and drills](/broking-kyc/finix-broking-setup/certification/05-mock-trading-and-drills/) | How mock sessions are scheduled and enrolled, what is tested, the evidence owed afterwards, the consequence of non-participation, and the recovery-drill regime |

## Where this connects

The identifier mechanics are in [user identifiers, terminal-connected software and the unique order identifier](/broking-kyc/finix-broking-setup/oms/03-user-id-ctcl-nnf/) and the go-live sequence in [certification, mock trading and go-live](/broking-kyc/finix-broking-setup/setup/10-certification-mock-golive/). Change control as a configuration discipline is in [environments and configuration baseline](/broking-kyc/finix-broking-setup/stack/environments-config-baseline/), the audit view in [the audit machinery](/broking-kyc/finix-broking-setup/compliance/05-audit-machinery/), and the technology obligations in [cyber resilience configuration](/broking-kyc/finix-broking-setup/compliance/04-cyber-cscrf-config/).

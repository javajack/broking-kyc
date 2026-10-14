---
title: "Compliance at config level: overview"
description: Compliance as configured, owned and evidenced rather than as a policy set — the obligation-to-configuration map, the reporting pipeline across every authority, inspection readiness and the evidence pack, and the cyber-resilience configuration that regulation 18(5) made statutory.
---

> **Why this plane exists in an implementation manual:** Most compliance documentation describes obligations. This plane describes where each obligation actually lives in the stack — which configuration value implements it, which system evidences it, who owns it, and what an inspector is shown. That mapping is the thing a firm either has or spends a fortnight assembling at the start of an inspection, and it is cheap to maintain if it is built as the stack is built.

## TL;DR

- **The 2026 regulations moved compliance into the architecture.** Client-asset segregation, cyber resilience, an eight-year records floor, a 21-calendar-day complaint clock, a whistle-blower channel and a mule-account detection duty are statutory, which means they are system properties rather than policy statements.
- **Every obligation maps to a configuration value, a system and an owner.** The [compliance configuration baseline](/broking-kyc/finix-broking-setup/compliance/01-compliance-config-baseline/) is that map, and it is the artefact an inspection is shown first.
- **The classification matters more than the value.** A regulatory value needs a circular, an exchange-set value needs an ingestion job, a discretionary value needs an approved policy — and misclassifying any of them is itself a finding.
- **Reporting spans more authorities than most firms track**: clearing corporations, exchanges, SEBI, FIU-IND, depositories, the registries and the tax authorities, each on its own calendar and format.
- **Evidence is produced as a by-product of doing things properly**, or it is reconstructed under pressure. The difference is visible to an inspector within minutes.
- **An obligation without an owner is the failure the calendar exists to prevent**, and it should alarm.

## The pages

| # | Page | What it settles |
|---|---|---|
| 1 | [Compliance configuration baseline](/broking-kyc/finix-broking-setup/compliance/01-compliance-config-baseline/) | The obligation-to-configuration-to-evidence map, with owners |
| 2 | [Regulatory reporting pipeline](/broking-kyc/finix-broking-setup/compliance/02-reporting-pipeline/) | Every authority, every filing, the calendar and the evidence |
| 3 | [Inspection readiness](/broking-kyc/finix-broking-setup/compliance/03-inspection-readiness/) | The questions, the evidence pack, the drill |
| 4 | [Cyber resilience configuration](/broking-kyc/finix-broking-setup/compliance/04-cyber-cscrf-config/) | Regulation 18(5) at configuration level |

## Where this connects

- [SEBI registration under the 2026 regulations](/broking-kyc/finix-broking-setup/setup/02-sebi-registration-2026/) — the instrument behind most of this
- [Compliance blueprint](/broking-kyc/operations/compliance-blueprint/) — the full obligation register across the site
- [Periodic calendar](/broking-kyc/finix-broking-setup/daily-ops/09-periodic-calendar/) — the operational calendar
- [Audit and compliance](/broking-kyc/operations/audit-compliance/) — the vendor-neutral treatment
- [Inspection types](/broking-kyc/deep-dives/compliance-audit/inspection-types/) — what inspections look like
- [CSCRF deep dive](/broking-kyc/deep-dives/compliance-audit/cscrf-deep-dive/) — the cyber framework in depth

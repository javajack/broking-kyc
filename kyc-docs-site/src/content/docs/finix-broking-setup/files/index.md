---
title: "Files and data interchange: overview"
description: The file layer a broking operation actually runs on — the register that enumerates every file, the per-day-type manifest, and the venue-by-venue inventories of what arrives, what the firm sends, and what happens when a file is late, short or revised.
---

> **Why this plane exists:** An Indian broking operation is, mechanically, a file-processing business. Orders and trades flow over sessions, but the tradeable universe, the margin parameters, the obligations, the collateral values, the penalties and most client reporting all arrive as files on a schedule. The day works only if the right files arrived, were recognised, were applied, and were seen to have been applied. Most firms discover this after building the file layer as a drawer of scripts, which is why this plane treats it as a system with its own register, state model and failure semantics.

## TL;DR

- **The register is the artefact.** One authoritative list of every file, with source, schedule, consumer, criticality and failure behaviour. Without it nobody can answer "what have we not received today".
- **The manifest is per day type, not per day.** An ordinary Tuesday, a settlement day, an expiry, a commodity tender day, a post-holiday day and a month end expect different sets.
- **Assert applied state, not job success.** The question is what version the consuming system is actually using, not whether the ingestion job exited cleanly.
- **Count, then value, then diff.** Truncation is the dangerous failure because it succeeds; record-count ranges and a diff against yesterday are the two highest-value checks.
- **An unread response file is an unmade submission.** The quietest and most expensive failure class in the whole plane.

## The pages

| Page | What it covers |
|---|---|
| [The file register and its architecture](/broking-kyc/finix-broking-setup/files/01-file-register-architecture/) | Register columns, day types and manifests, collection, naming and versioning, validation order, the applied-state assertion, idempotency, criticality as a gate |
| [NSE and NSE Clearing files](/broking-kyc/finix-broking-setup/files/02-nse-files/) | The largest file surface: masters, bhavcopy and its October 2026 retirements, risk and surveillance files, margin parameters and reporting, obligations, collateral, uploads, and the naming inconsistencies that cause bugs |
| [BSE and Indian Clearing files](/broking-kyc/finix-broking-setup/files/03-bse-files/) | What is established about the other exchange's file surface, and an honest account of what could not be verified |
| [MCX files](/broking-kyc/finix-broking-setup/files/04-mcx-files/) | The commodity venue's file surface and the evening-session timing consequences |
| [Clearing corporation files](/broking-kyc/finix-broking-setup/files/05-clearing-corporation-files/) | The cross-venue clearing view: obligations, margin, collateral, penalties, settlement |
| [Depository files](/broking-kyc/finix-broking-setup/files/06-depository-files/) | The participant interface at both depositories, the standardised delta file, pledge and unpaid-securities flows |
| [Outbound submissions](/broking-kyc/finix-broking-setup/files/07-outbound-submissions/) | Everything the firm sends, and the response files that prove it arrived |
| [Handling exceptions](/broking-kyc/finix-broking-setup/files/08-file-handling-exceptions/) | The twenty-two exception classes, the decision each forces, and the blast radius of getting it wrong |
| [Bank and payment files](/broking-kyc/finix-broking-setup/files/09-bank-payment-files/) | Statements, gateway settlement, mandates and the reconciliation they feed |

## Where this connects

The gates these files block are in [the master trading-day checklist](/broking-kyc/finix-broking-setup/daily-ops/10-master-trading-day-checklist/) and the runbooks under [daily operations](/broking-kyc/finix-broking-setup/daily-ops/). The interface-level view of the same boundaries is [the integration contract matrix](/broking-kyc/finix-broking-setup/stack/integration-contract-matrix/), and the vendor-neutral batch view is [batch pipeline](/broking-kyc/operations/batch-pipeline/).

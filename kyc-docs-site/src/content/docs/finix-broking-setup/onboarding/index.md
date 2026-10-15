---
title: "Client onboarding: overview"
description: The onboarding plane as wired to the Finix stack — Digio for verification, signature and stamping, CVL KRA with four-KRA interoperability, CERSAI CKYCRR 2.0, SecMark C-Safe for PEP and sanctions screening, exchange unique client code registration, demat opening, and the account lifecycle operations that follow.
---

> **Why this plane is narrower than it looks:** Client onboarding is specified in depth elsewhere on this site — the [user journey](/broking-kyc/journey/), the [field atlas](/broking-kyc/reference/field-atlas/), the [<abbr title="KYC Registration Agency">KRA</abbr> reference](/broking-kyc/vendors/kra/) and the [lifecycle walkthroughs](/broking-kyc/lifecycle/). This plane covers only what changes when that specification is wired to *this* stack: which vendor does what, where the gates are, what each integration's failure branches look like, and the 2026 changes — <abbr title="Central KYC Records Registry">CKYCRR</abbr> 2.0 and the statutory screening and mule-detection obligations — that most internal documentation has not caught up with.

## TL;DR

- **The firm owns the journey; vendors own the primitives.** The screens and conversion are the broker's; verification, signature, stamping and registry calls are Digio's. That split lets the journey change without a vendor dependency and lets a vendor change without a redesign.
- **CVL KRA is the primary KRA, and it is not an island.** Five KRAs operate under a mandated interoperability framework, so a query to one returns the record whoever holds it, and a duplicate upload for an already-compliant investor is **rejected** — the correct response is to download, not to retry.
- **CKYCRR 2.0 went live on 1 August 2026**, phased, with the pilot and readiness window extended to 5 October 2026. It replaces batch uploads and PDFs with real-time APIs, structured payloads, <abbr title="One-Time Password">OTP</abbr>-based consent for download and masked Aadhaar.
- **Screening is SecMark C-Safe, and it is a lifecycle not an event.** More than fifty global and domestic lists including politically exposed persons, re-run on list change and on client-attribute change, with the **list version recorded against every result**.
- **Four gates stand between a completed journey and a tradeable account**: screening resolved, unique client code registered per exchange and segment, demat active before any delivery-creating trade, and the client master present and reconciled across onboarding, the order management system and the back office.
- **<abbr title="National Securities Depository Limited">NSDL</abbr> activation is the onboarding bottleneck.** <abbr title="Central Depository Services (India) Limited">CDSL</abbr> activates in hours by application programming interface against roughly fifteen days by batch for NSDL, which determines what the journey can promise.
- **The dangerous state is a signature that exists at the vendor and not with the broker** — the account looks incomplete and is legally complete. Reconcile retrieved artefacts daily.

## The pages

| # | Page | What it settles |
|---|---|---|
| 1 | [Digio integration](/broking-kyc/finix-broking-setup/onboarding/01-digio-integration/) | Verification, signature, stamping and mandates, with every failure branch |
| 2 | [CVL KRA integration](/broking-kyc/finix-broking-setup/onboarding/02-kra-cvl-integration/) | Lookup, upload, download, status, and the interoperability behaviour |
| 3 | [<abbr title="Central KYC (records registry)">CKYC</abbr> and CKYCRR 2.0](/broking-kyc/finix-broking-setup/onboarding/03-ckyc-ckycrr2-integration/) | The 2026 real-time regime, consent, and the migration |
| 4 | [<abbr title="Politically Exposed Person">PEP</abbr> and sanctions screening](/broking-kyc/finix-broking-setup/onboarding/04-pep-sanctions-screening/) | C-Safe, list versioning, disposition, and the rescreening lifecycle |
| 5 | [<abbr title="Unique Client Code">UCC</abbr> registration](/broking-kyc/finix-broking-setup/onboarding/05-ucc-registration-exchanges/) | Per exchange and segment, with partial-batch handling |
| 6 | [eSign, <abbr title="Demat Debit and Pledge Instruction">DDPI</abbr> and pledge setup](/broking-kyc/finix-broking-setup/onboarding/06-esign-ddpi-pledge-setup/) | Authority artefacts and their custody |
| 7 | [Modification and closure operations](/broking-kyc/finix-broking-setup/onboarding/07-account-modification-closure/) | The lifecycle events that re-run parts of this plane |
| 8 | [KYC operations quality and audit](/broking-kyc/finix-broking-setup/onboarding/08-kyc-ops-quality-audit/) | Sampling, error classes, the quality metrics that matter and what an inspection looks at |

## Where this connects

- [User journey](/broking-kyc/journey/) — the nine-screen specification
- [Field atlas](/broking-kyc/reference/field-atlas/) — every field and where it goes
- [KRA reference](/broking-kyc/vendors/kra/) — the KRA integration in depth
- [Lifecycle walkthroughs](/broking-kyc/lifecycle/) — re-<abbr title="Know Your Customer (process).">KYC</abbr>, modifications, dormancy, closure, transmission, <abbr title="Non-Resident Indian">NRI</abbr> conversion
- [Batch pipeline](/broking-kyc/operations/batch-pipeline/) — the parallel agency pipelines
- [Intraday surveillance](/broking-kyc/finix-broking-setup/rms/07-intraday-surveillance/) — where screening output continues to matter

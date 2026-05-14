---
title: "Lifecycle: NRI ↔ Resident conversion"
description: Bidirectional conversion procedure between Resident and NRI status — PIS letter procurement, NRE/NRO bank linkage, segment restrictions (PIS delivery-only, commodities prohibited), CP-code removal post-July 2025, tax treatment differences.
---

import { Aside } from '@astrojs/starlight/components';

> **Why this page is structured this way:** Conversion goes both ways and the two directions differ substantively. Resident → NRI adds restrictions and new external linkages (PIS letter, NRE/NRO bank); NRI → Resident removes restrictions and unlinks PIS infrastructure. Two separate walkthroughs reflect this.

## TL;DR

- Triggered by client status change — moving abroad (Resident → NRI) or returning to India (NRI → Resident).
- **Resident → NRI** adds: passport + visa proof, NRE/NRO bank linkage, **PIS letter** from an AD-Category-I bank, segment restrictions (PIS = delivery-only, commodities prohibited).
- **NRI → Resident** removes: PIS account linkage, NRI-specific tax treatment; re-KYC as resident; segment restrictions lifted.
- **CP code (Custodian Participant) was removed post July 2025** — older reference to that has been retired.
- Timeline: 1–4 weeks both directions, mostly bottlenecked by external dependencies (passport / visa documentation, PIS letter from AD bank).
- Tax treatment differs: NRIs face **TDS at source** on capital gains and dividends; residents declare and self-assess.

## Conceptual overview

A resident Indian client and an NRI client are technically the same person, often the same brokerage relationship, but the regulatory framework treats them differently. NRIs investing in Indian securities operate under FEMA (Foreign Exchange Management Act) with specific routes — PIS (Portfolio Investment Scheme) for stock-market access through an AD bank — and specific restrictions (no intraday under PIS, no commodities). Conversion in either direction realigns the broker relationship with the right framework. Both directions are operationally substantial; pre-existing positions need careful handling.

## Direction 1 — Resident → NRI

Triggered when a resident client acquires NRI status (typically by acquiring residency abroad for 182+ days in a financial year).

### Step 1 — Client notification

Client notifies the broker of NRI status change. Usually voluntary — the client knows their tax / residency status has changed and proactively contacts the broker to ensure compliance.

The broker doesn't typically detect NRI status independently; FATCA / CRS self-certifications would surface foreign tax residency but those don't always coincide with NRI status changes.

### Step 2 — Documentation collection

Client submits:
- **Passport** — current valid passport.
- **Visa / residency proof** — work visa, residence permit, or similar proof of overseas residence.
- **PAN** — same PAN continues (Indians retain PAN even as NRIs).
- **Aadhaar** — retained but may have limited utility for NRI verification depending on Aadhaar's framework.
- Proof of overseas address (utility bill, lease, etc.).

### Step 3 — NRE / NRO bank account setup

NRIs cannot operate a regular Indian savings account for repatriable transactions. They need:
- **NRE (Non-Resident External) account** — for funds earned abroad and repatriated to India. Repatriable.
- **NRO (Non-Resident Ordinary) account** — for funds earned within India (rent, dividends, sale proceeds). Limited repatriability.

The client opens these at any AD bank (Authorized Dealer Category-I bank, typically a public-sector or major private bank).

### Step 4 — PIS letter procurement

For stock-market access under the PIS route, the client must obtain a **PIS letter** (Portfolio Investment Scheme letter) from their AD bank. This letter:
- Designates the bank as the PIS authority for the client.
- Specifies the NRE / NRO accounts linked to the PIS.
- Confirms the bank will handle reporting to RBI of NRI transactions.

The PIS letter is broker-agnostic — one PIS letter per client per bank, usable across any broker the client uses.

<Aside type="tip">
**Non-PIS route exists too.** A simpler alternative — non-PIS — uses just NRO accounts without a designated PIS bank. Non-PIS allows wider transactions (intraday, F&O) but with NRO repatriation limits. Most NRIs use PIS for the cleaner repatriation; some use non-PIS for the broader trading scope.
</Aside>

### Step 5 — Pre-existing position handling

Open derivatives positions need attention before conversion:
- **F&O positions** under resident framework — may need to be unwound or transferred to a non-PIS route.
- **Commodities (MCX) positions** — MCX prohibits NRI clients; positions must be closed before conversion.
- **CM holdings** continue without issue; they convert to NRI-held holdings.

### Step 6 — Conversion at broker

Broker updates:
- Client master with NRI flag, new addresses, NRE/NRO bank linkage, PIS letter on file.
- Exchange UCC updated to NRI client type.
- Depository BO re-mapped to NRI account type — affects payout routing (NRE for repatriable, NRO for non-repatriable).
- Segment restrictions applied per PIS rules.

### Step 7 — Segment restrictions

Under PIS route, only:
- **Cash market (CM)** — delivery-only. Intraday is not permitted.
- **No F&O** — though some brokers offer non-PIS F&O via NRO route.
- **No commodities (MCX)** — strict prohibition.

The broker's OMS enforces these restrictions at pre-trade RMS (segment check).

### Step 8 — Tax treatment

The broker applies NRI tax treatment to all transactions going forward:
- **TDS at source** on capital gains (short-term and long-term) — typically 10–20% depending on holding period.
- **TDS on dividends** — typically 20% (subject to applicable tax treaty rates).
- **TDS certificate** issued to the client for their tax filing.

This contrasts with residents who declare and self-assess.

### Step 9 — Notification

Client notified that conversion is complete; PIS account active; restrictions and tax treatment now in effect.

## Direction 2 — NRI → Resident

Triggered when an NRI client returns to India and re-acquires resident status (typically 182+ days residency in a financial year).

### Step 1 — Client notification

Client notifies the broker of return to India and resident status.

### Step 2 — Documentation collection

Client submits:
- **Passport** with current Indian address visa / stamps.
- **Indian address proof** — utility bill, rental agreement, Aadhaar updated with Indian address.
- **PAN** — same PAN.
- Proof of return to India (passport entry stamp, employment in India, etc.).

### Step 3 — Re-KYC as resident

A full re-KYC under the resident framework:
- Identity re-validated.
- Address re-validated (Indian address).
- Contact details updated.
- FATCA / CRS declarations updated to reflect Indian-only tax residency (or specific tax-residency arrangements if applicable).

This is functionally a [re-KYC](./re-kyc/) flow with the residency reclassification as the triggering event.

### Step 4 — PIS account closure

The PIS letter at the AD bank is revoked. The NRE / NRO accounts may continue to operate as ordinary resident accounts or be closed depending on client preference.

This is a client-and-bank action; the broker doesn't drive it but tracks completion as a prerequisite for the conversion.

### Step 5 — Linked bank account update

The client's bank account on file at the broker is updated from NRE / NRO to a regular Indian savings account. Penny-drop verification on the new account (as with any [bank modification](./modifications/#bank-account-change)).

### Step 6 — Conversion at broker

Broker updates:
- Client master with resident flag, new address, regular bank linkage.
- Exchange UCC updated to resident client type.
- Depository BO re-mapped to resident account type.
- Segment restrictions lifted (CM intraday now allowed; F&O / commodities can be elected with appropriate income proof).

### Step 7 — Segment re-enablement

Client can now elect:
- **CM intraday** — added to existing delivery-only access.
- **F&O** — with current-rules income proof.
- **Commodities (MCX)** — with current-rules income proof.

These are handled as [segment add modifications](./modifications/#segment-add--drop).

### Step 8 — Tax treatment change

Going forward, the broker applies resident tax treatment:
- **No TDS at source** on capital gains.
- **No TDS on dividends** (unless under specific PAN-Aadhaar / linkage situations).
- Client declares and self-assesses tax via ITR filing.

### Step 9 — Notification

Client notified that conversion is complete; resident framework now applies; full segment access available subject to election.

## Sub-cases

### CP code removal (post July 2025)

The CP code (Custodian Participant code) was a separate identifier maintained for institutional and certain NRI clients alongside the UCC. Post July 2025, CP code was retired in favour of unified UCC-based identification. Existing CP codes were migrated to UCC-only references.

NRI conversion flows post July 2025 do **not** include CP code procurement or update — that step has been retired.

### Partial conversion (status change without bank change)

A client moving abroad short-term (e.g., overseas employment for a fixed term) may notify the broker of NRI status without setting up NRE/NRO accounts immediately. Some brokers allow a "soft" conversion that applies NRI tax treatment and segment restrictions but defers bank-account change until the client is ready.

This is non-standard; most brokers prefer the full conversion at one go.

### Dual residency / tax treaty handling

Clients with dual residency (e.g., US-Indian dual taxation under DTAA) have specific FATCA / CRS handling and may require tax-treaty-rate certificates. This is beyond standard NRI conversion; usually routed through compliance officer + tax advisor.

### Frequent traveler edge case

A client traveling abroad frequently but not crossing the 182-day threshold remains a resident. Travel doesn't trigger NRI conversion; only physical residency abroad does.

## Field-level callouts

NRI conversion touches sections A (Identity), B (Address), C (Contact), G (Bank — significant change), J (FATCA/CRS), V (NRI-specific) primarily. See the [Field-level Data Flow Atlas Section V](/broking-kyc/reference/field-atlas/sections/v-nri-specific/) for NRI-specific destination flows.

## Practical notes

- **[industry practice]** Most brokers maintain a small dedicated NRI ops team because NRI handling has distinct compliance and tax-treatment patterns. Conversion is one of several NRI-specific procedures this team owns.
- **[gotcha]** PIS letter is broker-agnostic. A client switching brokers (after conversion to NRI) doesn't need a new PIS letter — the existing one carries over. New ops engineers sometimes assume the PIS letter is broker-specific and ask for a fresh one.
- **[risk trade-off]** Allowing trading immediately on conversion-day (before all backend updates complete) is a customer-experience win but exposes the broker to mis-applied tax treatment. Tighter brokers require all backend updates to complete (typically T+1) before resuming trading; looser brokers allow trading with end-of-day reconciliation of tax.
- **[cost optimization]** The bulk of NRI conversion ops cost is in PIS letter validation and bank-account verification. Automating these checks (validating PIS letter format against the AD bank's published format; automated penny-drop on the new bank account) reduces manual ops touch points.

## Cross-references

- [Compliance Blueprint — Edge-case compliances (NRI)](/broking-kyc/operations/compliance-blueprint/#edge-case-compliances-30-entries)
- [Integration DAG — NRI conversion path](/broking-kyc/operations/integration-dag/lifecycle-events/)
- [Field Atlas — Section V (NRI-Specific)](/broking-kyc/reference/field-atlas/sections/v-nri-specific/)
- [Appendix — NRI Deep Dive](/broking-kyc/appendix/nri-deep-dive/) (existing reference for non-conversion NRI specifics)
- [Lifecycle: Re-KYC](./re-kyc/) (NRI → Resident triggers re-KYC)
- [Lifecycle: Modifications — bank account](./modifications/#bank-account-change) (PIS / non-PIS bank changes use the same penny-drop procedure)
- [Circulars — SEBI MIRSD](/broking-kyc/reference/circulars/sebi-mirsd/) and [RBI](/broking-kyc/reference/circulars/rbi/) (FEMA NRI investment framework)

## Verified through

2026-05-14

---

*AI-generated and not legal, financial, or compliance advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*

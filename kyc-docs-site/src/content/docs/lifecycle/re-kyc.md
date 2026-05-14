---
title: "Lifecycle: Re-KYC"
description: Risk-tier-based KYC refresh procedure — high (2y) / medium (8y) / low (10y) cycles, trigger detection, refresh process, KRA + CKYC upload, and segment treatment during refresh.
---

import { Aside } from '@astrojs/starlight/components';

> **Why this page is structured this way:** Re-KYC is the most common lifecycle event a typical client will experience — every 2-10 years depending on their risk classification. The walkthrough below follows the operator-perspective steps from trigger detection through to confirmation. Cross-link to the [Integration DAG re-KYC subset](/broking-kyc/operations/integration-dag/lifecycle-events/) for the dependency view and the [Field-level Data Flow Atlas KYC sections](/broking-kyc/reference/field-atlas/) for what specifically changes.

## TL;DR

- Periodicity is **risk-tier-based**: high-risk every 2 years, medium-risk every 8 years, low-risk every 10 years.
- Trigger is the **anniversary of last KYC validation** OR an event that changes the client's risk tier (PEP discovery, sanctions hit, large unusual transaction).
- Refresh process re-runs much of the original onboarding flow but is **lighter** — most fields prefill from existing KRA / CKYC; the operator captures only what has changed.
- Failure to complete re-KYC by the anniversary triggers an **account hold** per SEBI's risk-based KYC framework.
- Re-KYC outputs uploaded to KRA + CKYC; exchange / depository continue using existing UCC and BO unless contact details changed.

## Conceptual overview

A client's KYC isn't a one-time event but a periodic obligation. The framework is risk-based: a low-risk retail client with stable employment and a small portfolio refreshes every 10 years; a high-risk client (PEP exposure, high-risk-jurisdiction residency, large transaction patterns) refreshes every 2 years. The refresh validates that the client's identity, address, contact, and financial profile haven't materially changed since the last KYC. When changes are found, the refresh also operates as a modification — propagating to exchange UCC and depository BO. When no changes are found, the refresh is a status-only update at KRA and CKYC.

## Step-by-step walkthrough

### Step 1 — Trigger detection

The orchestrator runs a daily scan of the client base for re-KYC due dates. Triggers:

- **Anniversary trigger** — anniversary of last KYC validation falls within the next 30 / 14 / 7 days, generating progressive reminder notifications.
- **Risk-tier change trigger** — fired when AML screening surfaces a new PEP / sanctions / adverse-media hit; immediate re-KYC required regardless of anniversary.
- **Regulatory trigger** — SEBI / RBI mandate (e.g., FATCA centralization in Feb 2024 forced an industry-wide re-collection of tax-residency declarations).
- **Voluntary client-initiated** — client updates their profile and triggers full re-KYC rather than partial modification.

The trigger writes a re-KYC task to the ops queue with target completion date.

### Step 2 — Reminder cascade

Reminder notifications go out to the client at T-30 / T-14 / T-7 days from the target completion date:

- T-30: email + SMS with re-KYC link and self-service option.
- T-14: SMS + email + in-app banner.
- T-7: SMS + email + phone call from broker servicing team for high-value clients.

<Aside type="tip">
**Self-service vs assisted re-KYC.** Self-service (client logs in, re-confirms their data via DigiLocker / OTP) handles ~70% of low-risk re-KYCs without any operator touch. Assisted re-KYC (call-center walks through the flow) handles high-risk or low-digital-literacy clients.
</Aside>

### Step 3 — Identity & address re-validation

Client logs in and follows a flow similar to onboarding Screens 2–4, but lighter:

- Existing identity prefilled from KRA / CKYC.
- Client confirms PAN, name, DOB — no change typical, but flagged if any.
- Aadhaar re-fetch via DigiLocker (fresh OAuth flow). New Aadhaar XML supersedes old.
- Address re-validated against current Aadhaar address. If different from KRA record, flagged as a modification within the re-KYC.

### Step 4 — Contact re-validation

Mobile and email OTP re-verify. Mobile change or email change is captured as a modification within the re-KYC.

### Step 5 — Financial profile refresh

Income range re-confirmed. If client has F&O / COM segments active, income proof refreshed via Account Aggregator (AA), recent ITR upload, or HRMS-based payroll verification.

### Step 6 — Declarations refresh

Client re-affirms FATCA / CRS declarations, PEP status, and consent for data processing under DPDP framework.

### Step 7 — eSign and submit

Single Aadhaar OTP eSign of the re-KYC application. The refreshed record is written to broker's master and queued for downstream propagation.

### Step 8 — Downstream propagation

If anything changed (address / bank / contact / income / segment / declarations), the change propagates through the standard sequential KRA → CKYC → UCC → BO chain. If nothing changed, only KRA and CKYC receive a status-only update with new validation date.

### Step 9 — Confirmation

Client receives confirmation: re-KYC complete, next refresh due on [date based on current risk tier]. Account hold (if any was placed) is lifted.

## Sub-cases

### PEP escalation re-KYC

When AML screening surfaces new PEP exposure (the client or a connected party), risk tier jumps to "high" and re-KYC fires immediately regardless of anniversary date. The flow adds:

- Senior management approval before account remains active.
- Enhanced Due Diligence (EDD) including source-of-funds documentation.
- More-frequent transaction monitoring post-re-KYC.

See [Compliance Blueprint AML domain](/broking-kyc/operations/compliance-blueprint/#aml--pmla--sanctions-25-entries) for the specific EDD obligations.

### Sanctions-hit forced re-KYC

If a client matches a UN / OFAC / India MEA UAPA sanctions list, the response is typically not re-KYC but **immediate freeze + FIU-IND STR filing + Compliance Officer escalation**. Re-KYC follows only after the sanctions hit is cleared as a false positive. See [Circulars FIU-IND sub-page](/broking-kyc/reference/circulars/fiu-ind/) for STR filing requirements.

### FATCA tax-residency change

When a client's tax residency status changes (e.g., relocation abroad without formal NRI conversion), FATCA / CRS declarations need updating. Triggers a partial re-KYC limited to the FATCA fields. The new self-certification is uploaded to KRA-centralized FATCA framework per [SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12](/broking-kyc/reference/circulars/sebi-mirsd/).

### Re-KYC declined / abandoned

If the client doesn't respond to the reminder cascade by T-0, the account moves to **hold** — trading disabled, only liquidation orders accepted. After 30 days on hold, segments are forcibly disabled. After 90 days, the broker may initiate dormancy procedure or formal account closure depending on regulatory guidance and broker policy.

<Aside type="caution">
**Account-hold-to-closure timeline isn't legally fixed.** SEBI rules require re-KYC by the anniversary; what happens during non-compliance is broker-policy with regulatory guardrails. Some brokers go to hold at T-0, segment-disable at T+30, and dormancy at T+90; others stretch this to 6 months. Document your policy explicitly in the client agreement.
</Aside>

## Field-level callouts

Re-KYC touches fields across master-dataset sections A (Personal Identity), B (Address), C (Contact), F (Financial Profile), G (Bank), J (FATCA/CRS), K (PEP/AML), and S (KRA Submission). For per-destination flow, see the [Field-level Data Flow Atlas](/broking-kyc/reference/field-atlas/).

## Practical notes

- **[industry practice]** The 90-day pre-expiry alert window for compliance-team visibility is increasingly common — by then, the client has had multiple reminder pings; the compliance team uses the residual time to escalate accounts likely to default on the re-KYC.
- **[gotcha]** A common mistake during PEP-triggered re-KYC: the new EDD documentation gets attached as a one-off rather than uploaded to KRA / CKYC. The re-KYC must include the EDD as part of the refreshed record so the next periodic re-KYC reflects the EDD baseline.
- **[risk trade-off]** Self-service re-KYC reduces operator cost but raises false-confirmation risk (client clicks through without verifying). Most brokers use a hybrid — self-service for low-risk + assisted for medium / high.
- **[cost optimization]** Batching the FATCA-only sub-cases monthly (rather than treating each as a full re-KYC) saves significant compliance-team time, since most don't trigger a full identity / address re-validation.

## Cross-references

- [Compliance Blueprint — KYC lifecycle domain](/broking-kyc/operations/compliance-blueprint/)
- [Integration DAG — lifecycle events page](/broking-kyc/operations/integration-dag/lifecycle-events/)
- [Field Atlas — Section S (KRA Submission)](/broking-kyc/reference/field-atlas/sections/s-kra-submission/)
- [Field Atlas — Section T (CKYC Submission)](/broking-kyc/reference/field-atlas/sections/t-ckyc-submission/)
- [Circulars — SEBI MIRSD KYC master](/broking-kyc/reference/circulars/sebi-mirsd/)
- [Circulars — CERSAI](/broking-kyc/reference/circulars/cersai/)

## Verified through

2026-05-14

---

*AI-generated and not legal, financial, or compliance advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*

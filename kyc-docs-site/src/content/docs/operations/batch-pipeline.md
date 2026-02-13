---
title: Batch Pipeline
description: What happens after the user is done — the multi-step, multi-agency batch pipeline that runs after maker-checker approval.
---

What happens after the user is done — the multi-step, multi-agency batch pipeline that runs after maker-checker approval. Each agency has its own sequential pipeline, but all agencies run in parallel. Shows intermediate statuses, retry logic, and SLAs for every step.

:::caution
**Trigger:** Batch processing begins **only after checker approval** (Step 11 in the flow). The maker auto-approves if all checks pass; the checker gives final sign-off. No batch job fires before checker approval.
:::

## Parallel Agency Pipelines

```
Checker Approved
  │
  ├─→ [KRA Pipeline]     Submit → Under Process → Registered → Validated (2-3 days)
  ├─→ [CKYC Pipeline]    Upload → Queued → Validated → KIN Generated (4-5 days)
  ├─→ [NSE Pipeline]     UCC Submit → PAN Verify → "A" Approved → Trading Active (same day)
  ├─→ [BSE Pipeline]     UCC Submit → 3-Param PAN Verify → Approved → Segments Live (same day)
  ├─→ [MCX Pipeline]     UCC Submit → Income Verify → Approved (next working day, if commodity)
  ├─→ [CDSL Pipeline]    BO File (Lines 01,02,05,07) → KYC Check → Bank Valid → Active (1-2 hrs)
  ├─→ [NSDL Pipeline]    UDiFF Submit → CDS Process → DPM Update → PAN Flag → Active (~15 days)
  └─→ [Income Pipeline]  Perfios/AA verify → Confirmed (1-2 hrs, if F&O)

  Final Gate: KRA Registered + BO Active + UCC Approved → ACTIVE (can trade)
```

## KRA Pipeline (4 Steps, 2-3 Working Days)

| Step | Action | Vendor | Input/Output | Status | SLA |
|------|--------|--------|-------------|--------|-----|
| 1 | Submit KRA record | Digio API / CVL SOAP / bulk TXT | Full KYC payload → App ref number | SUBMITTED | Immediate |
| 2 | KRA receives and validates | KRA (CVL/NDML) | Cross-checks PAN format, name, DOB | UNDER_PROCESS | 1-2 working days |
| 3 | Identity cross-checks | KRA | PAN-Aadhaar link, name consistency | REGISTERED | Same batch cycle |
| 4 | Email + mobile validation | KRA | Sends validation link to client | VALIDATED | +1 working day |

:::tip
**Trading is allowed at REGISTERED status.** VALIDATED is the final state but REGISTERED is sufficient for exchange operations. Retry: 3x exponential backoff on submission failures.
:::

## CKYC Pipeline (4 Steps, 4-5 Working Days)

| Step | Action | Vendor | Input/Output | Status | SLA |
|------|--------|--------|-------------|--------|-----|
| 1 | Submit JSON payload | Decentro API | Photo, POA, contact, IDs → Acknowledgement | UPLOADED | Immediate |
| 2 | CERSAI queues for processing | CERSAI | Record enters validation queue | QUEUED | 1-2 working days |
| 3 | Document OCR and verification | CERSAI | Auto-verification of submitted documents | VALIDATED | +1-2 working days |
| 4 | KIN generated | CERSAI | 14-digit CKYC Identification Number → SMS/email | KIN_GENERATED | +1 working day |

## NSE Pipeline (3 Steps, Same Day)

| Step | Action | Format | Input/Output | Status | SLA |
|------|--------|--------|-------------|--------|-----|
| 1 | Submit UCC | API (REST JSON) or batch (pipe-delimited, max 10K) | client_name, PAN, DOB, segments → ack | SUBMITTED | Immediate |
| 2 | PAN + Name + DOB verification | NSE via Protean | 3-param check against ITD | "A" (Approved) or "I" (Invalid) | Same batch cycle |
| 3 | Activation confirmation | Response batch file or API callback | UCC code + segment flags → trading permitted | ACTIVE | Same day (5PM cutoff) |

## BSE Pipeline (3 Steps, Same Day)

| Step | Action | Format | Input/Output | Status | SLA |
|------|--------|--------|-------------|--------|-----|
| 1 | Submit UCC | ETI/API (fixed-length, max 30K) | Client master data | SUBMITTED | Immediate |
| 2 | 3-parameter PAN verification | BSE via Protean | PAN + Name + DOB must all verify | VERIFIED | Same batch cycle |
| 3 | UCC approved + segment activation | Segment activation batch (max 50K) | Segments live | ACTIVE | Same day |

## MCX Pipeline (3 Steps, Next Working Day)

| Step | Action | Format | Input/Output | Status | SLA |
|------|--------|--------|-------------|--------|-----|
| 1 | Submit UCC | MCX CONNECT / CTCL API | Full KYC + income proof + client category (HE/SP/AR) | SUBMITTED | Immediate |
| 2 | Income verification | MCX | Income proof validated for commodity | VERIFIED | Same day |
| 3 | Approval | MCX | UCC approved for commodity trading | ACTIVE | Next working day |

## CDSL Pipeline (5 Steps, 1-2 Hours API)

| Step | Action | Format | Input/Output | Status | SLA |
|------|--------|--------|-------------|--------|-----|
| 1 | Submit BO file | Fixed-length positional (Lines 01,02,05,07) | DP ID + holder + contact + bank + nomination | SUBMITTED | Immediate |
| 2 | BO record creation + KYC check | CDAS | Cross-check KYC status, PAN validity | CREATED | Minutes (API) |
| 3 | Bank account validation | CDAS (Line 05) | Dividend/interest bank account verified | BANK_VALID | Minutes (API) |
| 4 | Nomination acceptance | CDAS (Line 07) | Nominee details recorded or opt-out flagged | NOM_ACCEPTED | Minutes (API) |
| 5 | CDAS activation | CDAS | 16-digit BO ID active; optional DDPI (24h) | ACTIVE | 1-2 hours (API) |

## NSDL Pipeline (5 Steps, ~15 Working Days)

| Step | Action | Format | Input/Output | Status | SLA |
|------|--------|--------|-------------|--------|-----|
| 1 | Submit via Insta Interface | UDiFF format (ISO-tagged, since Mar 2024) | Full KYC record | SUBMITTED | Immediate |
| 2 | CDS processing | CDS | Account ID + BO ID ("IN" + 14 chars) | PROCESSING | 3-5 working days |
| 3 | "Out file" sent back to DPM | DPM | Client_IDs returned in response file | DPM_UPDATED | +2-3 working days |
| 4 | Back-office client master created | Internal | Trading + margin limits set in ODIN | CLIENT_CREATED | +1 working day |
| 5 | PAN flag enablement | DPM | PAN flag enabled → trading enabled | ACTIVE | +5-7 working days |

## Income Pipeline (If F&O, 1-2 Hours)

| Step | Action | Vendor | Input/Output | Status | SLA |
|------|--------|--------|-------------|--------|-----|
| 1 | Verify income | Perfios ITR / Setu AA | ITR/bank statement → verified income | VERIFIED | 1-2 hours |

## Post-Activation Jobs

| Job | Vendor | Output | SLA |
|-----|--------|--------|-----|
| Segment Activation | NSE/BSE/MCX | Segments live | Same day |
| Back-Office Sync | 63 Moons ODIN | Client master record | Immediate |
| Welcome Kit | Kaleyra + AWS SES | Email + SMS | On activation |
| Nominee Video (if opt-out) | HyperVerge | Video declaration | Within 30 days |
| DDPI Setup (if opted) | CDSL/NSDL | DDPI registered | 1 day |

## Final Activation Gate

All three conditions must be met for the client to trade:

| Condition | Source | Required Status |
|-----------|--------|-----------------|
| KRA Registered | KRA (any of 5) | REGISTERED or VALIDATED |
| BO Account Active | CDSL and/or NSDL | ACTIVE |
| UCC Approved | NSE and/or BSE | ACTIVE |

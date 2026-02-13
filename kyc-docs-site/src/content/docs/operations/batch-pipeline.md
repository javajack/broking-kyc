---
title: Batch Pipeline
description: What happens after the user is done — the multi-step, multi-agency batch pipeline that runs after maker-checker approval.
prev:
  link: /broking-kyc/journey/09-review-esign/
  label: '← 9. Review + eSign'
---

When a customer finishes their KYC (Know Your Customer) onboarding journey and a checker gives final approval, the real back-office machinery kicks in. Think of the batch pipeline as a factory assembly line — raw KYC applications come in at one end, and fully registered trading accounts come out the other. Multiple government agencies, stock exchanges, and depositories each need to receive, validate, and approve the same customer data before that customer can place their first trade. This page walks you through every step of that assembly line, the intermediate statuses your operations team will monitor, and the SLA (Service Level Agreement) targets you should expect at each stage.

:::note[Prerequisite: User Journey Complete]
This page covers what happens **after** the user completes all 9 screens and the checker approves. Start with [Screen 9: Review + eSign](/broking-kyc/journey/09-review-esign/) for the user-facing journey.
:::

:::caution
**Trigger:** Batch processing begins **only after checker approval** (Step 11 in the flow). The maker auto-approves if all checks pass; the checker gives final sign-off. No batch job fires before checker approval.
:::

## Parallel Agency Pipelines

The first thing to understand about the batch pipeline is that it does not run in a single sequence. Instead, submissions to seven different agencies fire in parallel the moment the checker clicks "Approve." Each agency has its own internal sequence of steps, but from our system's perspective they all start at the same time. This parallel design is critical — if we ran them one after another, a single customer's activation could take weeks instead of hours.

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

In plain English: seven different submissions happen simultaneously. The customer cannot trade until at least three of them — KRA (KYC Registration Agency), a depository (for their demat account), and an exchange (for their trading code) — have all reached an approved or active state.

Now let us look at each pipeline in detail, starting with the two regulatory registrations (KRA and CKYC) and then moving to the exchanges and depositories.

## KRA Pipeline (4 Steps, 2-3 Working Days)

The KRA pipeline is the regulatory backbone of the entire process. Every new customer's identity details must be submitted to a KRA, which cross-checks their PAN (Permanent Account Number), name, and date of birth against official databases. Until the KRA marks the record as at least "Registered," the customer is not legally permitted to trade on any exchange.

| Step | Action | Vendor | Input/Output | Status | SLA |
|------|--------|--------|-------------|--------|-----|
| 1 | Submit KRA record | Digio API (Application Programming Interface) / CVL SOAP / bulk TXT | Full KYC payload → App ref number | SUBMITTED | Immediate |
| 2 | KRA receives and validates | KRA (CVL/NDML) | Cross-checks PAN format, name, DOB | UNDER_PROCESS | 1-2 working days |
| 3 | Identity cross-checks | KRA | PAN-Aadhaar link, name consistency | REGISTERED | Same batch cycle |
| 4 | Email + mobile validation | KRA | Sends validation link to client | VALIDATED | +1 working day |

:::tip[Trading Can Begin Early]
**Trading is allowed at REGISTERED status.** VALIDATED is the final state but REGISTERED is sufficient for exchange operations. Retry: 3x exponential backoff on submission failures.
:::

In plain English: your customer can start trading as soon as the KRA marks them "Registered" — they do not need to wait for the validation email step to complete.

With the KRA submission underway, the system simultaneously pushes the same customer's data to CKYC (Central KYC) for a separate, centralized identity record.

## CKYC Pipeline (4 Steps, 4-5 Working Days)

CKYC is the centralized identity repository maintained by CERSAI (Central Registry of Securitisation Asset Reconstruction and Security Interest of India). While the KRA pipeline handles the securities-market-specific KYC record, the CKYC pipeline creates a universal identity record that any financial institution in India can later retrieve. SEBI (Securities and Exchange Board of India) mandates dual upload — both KRA and CKYC — since August 2024.

| Step | Action | Vendor | Input/Output | Status | SLA |
|------|--------|--------|-------------|--------|-----|
| 1 | Submit JSON payload | Decentro API | Photo, POA, contact, IDs → Acknowledgement | UPLOADED | Immediate |
| 2 | CERSAI queues for processing | CERSAI | Record enters validation queue | QUEUED | 1-2 working days |
| 3 | Document OCR and verification | CERSAI | Auto-verification of submitted documents | VALIDATED | +1-2 working days |
| 4 | KIN generated | CERSAI | 14-digit CKYC Identification Number → SMS/email | KIN_GENERATED | +1 working day |

:::note[What is the KIN?]
The KIN (KYC Identification Number) is a unique 14-digit number that CERSAI assigns to each customer. Think of it as a universal financial identity number — any bank, insurer, or broker can later look up this customer's verified identity using this single number, instead of asking them to submit documents all over again.
:::

In plain English: the CKYC pipeline runs slower than most others (4-5 working days), but it does not block trading. It is a compliance obligation that runs in the background.

Now let us turn to the exchange pipelines — these determine when the customer actually gets a trading code.

## NSE Pipeline (3 Steps, Same Day)

The NSE (National Stock Exchange) pipeline creates the customer's UCC (Unique Client Code) — the identifier that ties every trade they place on NSE back to their identity. NSE is typically the fastest exchange to activate, with same-day turnaround if you submit before the 5 PM cutoff.

| Step | Action | Format | Input/Output | Status | SLA |
|------|--------|--------|-------------|--------|-----|
| 1 | Submit UCC | API (REST JSON) or batch (pipe-delimited, max 10K) | client_name, PAN, DOB, segments → ack | SUBMITTED | Immediate |
| 2 | PAN + Name + DOB verification | NSE via Protean | 3-param check against ITD | "A" (Approved) or "I" (Invalid) | Same batch cycle |
| 3 | Activation confirmation | Response batch file or API callback | UCC code + segment flags → trading permitted | ACTIVE | Same day (5PM cutoff) |

In plain English: submit the customer's details before 5 PM, and they will have an active NSE trading code by end of day.

The BSE (Bombay Stock Exchange) pipeline runs alongside NSE with a very similar structure but its own verification system.

## BSE Pipeline (3 Steps, Same Day)

BSE has a slightly different verification approach — it uses a strict 3-parameter PAN verification where the customer's PAN, name, and date of birth must all match against the Income Tax Department's records via Protean. BSE also supports larger batch sizes (up to 30,000 records) and a separate segment activation batch (up to 50,000 records).

| Step | Action | Format | Input/Output | Status | SLA |
|------|--------|--------|-------------|--------|-----|
| 1 | Submit UCC | ETI/API (fixed-length, max 30K) | Client master data | SUBMITTED | Immediate |
| 2 | 3-parameter PAN verification | BSE via Protean | PAN + Name + DOB must all verify | VERIFIED | Same batch cycle |
| 3 | UCC approved + segment activation | Segment activation batch (max 50K) | Segments live | ACTIVE | Same day |

The MCX (Multi Commodity Exchange) pipeline is only relevant for customers who want to trade commodities, but it has an important additional requirement.

## MCX Pipeline (3 Steps, Next Working Day)

MCX requires income proof for all commodity traders — this is an additional hurdle that equity-only customers do not face. Every MCX client must also be categorized as a Hedger (HE), Speculator (SP), or Arbitrageur (AR), which affects their margin requirements and position limits.

| Step | Action | Format | Input/Output | Status | SLA |
|------|--------|--------|-------------|--------|-----|
| 1 | Submit UCC | MCX CONNECT / CTCL API | Full KYC + income proof + client category (HE/SP/AR) | SUBMITTED | Immediate |
| 2 | Income verification | MCX | Income proof validated for commodity | VERIFIED | Same day |
| 3 | Approval | MCX | UCC approved for commodity trading | ACTIVE | Next working day |

:::caution[MCX Is Slower]
MCX activation takes at least one additional working day compared to NSE and BSE. If a customer is eager to trade commodities on Day 1, set expectations during onboarding that this segment may take slightly longer.
:::

With exchange registrations covered, let us move to the depository pipelines. These create the customer's demat account — the electronic account where their shares and securities are actually held.

## CDSL Pipeline (5 Steps, 1-2 Hours API)

CDSL (Central Depository Services Limited) is the depository promoted by BSE and is where the majority of retail investors hold their demat accounts. The "BO" in "BO account" stands for Beneficial Owner — the person who actually owns the securities. CDSL uses a fixed-length positional file format with numbered "lines" (01 through 07), where each line carries different categories of customer data.

| Step | Action | Format | Input/Output | Status | SLA |
|------|--------|--------|-------------|--------|-----|
| 1 | Submit BO file | Fixed-length positional (Lines 01,02,05,07) | DP ID + holder + contact + bank + nomination | SUBMITTED | Immediate |
| 2 | BO record creation + KYC check | CDAS | Cross-check KYC status, PAN validity | CREATED | Minutes (API) |
| 3 | Bank account validation | CDAS (Line 05) | Dividend/interest bank account verified | BANK_VALID | Minutes (API) |
| 4 | Nomination acceptance | CDAS (Line 07) | Nominee details recorded or opt-out flagged | NOM_ACCEPTED | Minutes (API) |
| 5 | CDAS activation | CDAS | 16-digit BO ID active; optional DDPI (24h) | ACTIVE | 1-2 hours (API) |

In plain English: CDSL via API is remarkably fast — a new demat account can go from submission to active in under two hours. The 16-digit BO ID (8-digit DP ID + 8-digit Client ID) is what uniquely identifies this customer's holdings.

NSDL (National Securities Depository Limited) is the other depository, and its pipeline is notably slower.

## NSDL Pipeline (5 Steps, ~15 Working Days)

NSDL, promoted by NSE, uses a different file format called UDiFF (Unified Distilled File Formats) with ISO-tagged fields (adopted since March 2024). The most important thing to know about NSDL is that the PAN flag enablement step — the final gate before trading is actually permitted — can take 5-7 working days on its own. This makes the total NSDL pipeline roughly 15 working days, significantly longer than CDSL.

| Step | Action | Format | Input/Output | Status | SLA |
|------|--------|--------|-------------|--------|-----|
| 1 | Submit via Insta Interface | UDiFF format (ISO-tagged, since Mar 2024) | Full KYC record | SUBMITTED | Immediate |
| 2 | CDS processing | CDS | Account ID + BO ID ("IN" + 14 chars) | PROCESSING | 3-5 working days |
| 3 | "Out file" sent back to DPM | DPM (Depository Participant Module) | Client_IDs returned in response file | DPM_UPDATED | +2-3 working days |
| 4 | Back-office client master created | Internal | Trading + margin limits set in ODIN | CLIENT_CREATED | +1 working day |
| 5 | PAN flag enablement | DPM | PAN flag enabled → trading enabled | ACTIVE | +5-7 working days |

:::tip[Why Most Brokers Default to CDSL]
Given the dramatic difference in activation speed — 1-2 hours for CDSL versus approximately 15 working days for NSDL — most retail-focused brokers default new customers to CDSL. NSDL accounts are more common among institutional and high-value clients.
:::

The final pipeline in our parallel set is the Income Pipeline, which only applies to customers who want to trade in derivatives.

## Income Pipeline (If F&O, 1-2 Hours)

If the customer has requested F&O (Futures and Options) or commodity segments, their declared income must be independently verified before those segments can be activated. This is a SEBI requirement to ensure that customers trading in leveraged instruments have adequate financial capacity.

| Step | Action | Vendor | Input/Output | Status | SLA |
|------|--------|--------|-------------|--------|-----|
| 1 | Verify income | Perfios ITR / Setu AA (Account Aggregator) | ITR/bank statement → verified income | VERIFIED | 1-2 hours |

In plain English: the system fetches the customer's income data — either by parsing their ITR (Income Tax Return) via Perfios or by pulling bank statements through the Account Aggregator framework — and confirms it aligns with their declared income range.

## Post-Activation Jobs

Once the critical pipelines have completed and the customer's account is active, several follow-up jobs run to finalize the onboarding experience. These are not blocking — the customer can already trade — but they are necessary for full compliance and a complete customer setup.

| Job | Vendor | Output | SLA |
|-----|--------|--------|-----|
| Segment Activation | NSE/BSE/MCX | Segments live | Same day |
| Back-Office Sync | 63 Moons ODIN | Client master record | Immediate |
| Welcome Kit | Kaleyra + AWS SES | Email + SMS | On activation |
| Nominee Video (if opt-out) | HyperVerge | Video declaration | Within 30 days |
| DDPI Setup (if opted) | CDSL/NSDL | DDPI registered | 1 day |

:::note[Nominee Opt-Out Video]
If a customer chose to opt out of nominating a beneficiary for their demat account, SEBI requires a video declaration within 30 days. This is handled by the HyperVerge VIPV (Video In-Person Verification) system and is one of the few post-activation tasks with a hard regulatory deadline.
:::

## Final Activation Gate

With all the parallel pipelines running, the system continuously monitors statuses and checks whether the three mandatory conditions for trading have been met. Until all three are satisfied, the customer's account remains in a "pending activation" state.

All three conditions must be met for the client to trade:

| Condition | Source | Required Status |
|-----------|--------|-----------------|
| KRA Registered | KRA (any of 5) | REGISTERED or VALIDATED |
| BO Account Active | CDSL and/or NSDL | ACTIVE |
| UCC Approved | NSE and/or BSE | ACTIVE |

In plain English: the customer needs three green lights — their identity must be registered with a KRA, they must have an active demat account at a depository, and they must have an approved trading code at an exchange. Only when all three are in place does the system flip their status to ACTIVE, and they can place their first trade.

:::tip[Typical Activation Timeline]
For a customer defaulting to CDSL with NSE/BSE equity segments, the fastest path to trading is typically 2-4 hours after checker approval — driven primarily by the CDSL API turnaround and same-day exchange UCC approval. The KRA "Registered" status usually arrives within 1-2 working days, which may be the actual bottleneck if it has not cleared by the time the exchange and depository are ready.
:::

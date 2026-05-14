---
title: "Lifecycle: Dormancy & reactivation"
description: 12-month / 24-month dormancy detection, segment auto-disable, dormant-MIS reporting, reactivation request flow, re-KYC trigger if dormant >12m, UCC unfreeze, BO reactivate, segment re-activation with income-proof re-check.
---

import { Aside } from '@astrojs/starlight/components';

> **Why this page is structured this way:** Dormancy → reactivation is a two-phase scenario. Phase 1 (dormancy detection + flagging) is broker-initiated and silent from the client's perspective. Phase 2 (reactivation) is client-initiated and resembles a partial re-onboarding. The walkthrough covers both phases sequentially.

## TL;DR

- Typical **dormancy threshold**: no trading activity for 12 months (broker-level) or 24 months (exchange-level). Some brokers use tighter thresholds.
- On dormancy: account flagged, F&O / COM segments auto-disabled, modifications restricted, account included in monthly dormant-MIS report to exchange.
- **Reactivation** is client-initiated. If dormant > 12 months, **re-KYC** is triggered as part of reactivation.
- Reactivation propagation: re-KYC → UCC unfreeze → BO reactivate → segment re-activation (with income-proof re-check for F&O / COM per current rules).
- The whole reactivation takes **1–3 business days** typical, longer if re-KYC is required.

## Conceptual overview

A client who hasn't traded for over a year is, from an ops perspective, simultaneously low-risk (no transaction surface) and high-risk (their last identity validation is stale, their bank or contact details may have changed without notice, their account is a soft target for takeover). Industry default response: progressively reduce capability — disable derivatives first, restrict modifications, eventually flag for full re-KYC on reactivation. The exact thresholds vary by broker policy within regulatory guidance.

## Phase 1 — Dormancy

### Step 1 — Detection

The orchestrator runs a monthly scan of the client base. For each active client, compute days-since-last-trade across all segments. Flag clients exceeding the broker's dormancy threshold:

- **12 months** — typical broker threshold. Account flagged "soft-dormant".
- **24 months** — typical exchange-level dormancy. Account flagged "hard-dormant".

Some brokers use tighter thresholds (6–9 months) as a deliberate fraud-prevention policy.

### Step 2 — Flagging actions

When an account flips to soft-dormant:

- **Segment auto-disable** for F&O / COM (segments requiring ongoing margin). CM segment typically remains active.
- **Modifications restricted** — bank account changes, address changes blocked except through a separate "modification-during-dormancy" approval path.
- Account flagged in client master with timestamp.
- Client notified via email + SMS that account has been flagged dormant and what reactivation requires.

When account flips to hard-dormant:

- **All segments disabled.**
- Account read-only — holdings visible, no transactions accepted.
- Client included in dormant-MIS report.

### Step 3 — Dormant-MIS reporting

Monthly MIS report to the exchange of dormant accounts in the broker's client base. Report includes UCC, dormancy status (soft / hard), days since last trade, broker's intended remediation.

The dormant-MIS isn't a regulator-driven enforcement mechanism; it's an exchange-tracked operational view. Used for industry-wide dormancy benchmarking and policy review.

<Aside type="tip">
**Dormancy notifications drive most reactivations.** Many "dormant" clients are simply inactive traders, not lost. A well-worded reactivation reminder ("you have segments paused because you haven't traded in 12 months; click here to reactivate") successfully reactivates a meaningful fraction at near-zero ops cost.
</Aside>

## Phase 2 — Reactivation

### Step 4 — Client-initiated request

Client logs in (typically the dormancy flagging didn't block login, only trading), sees segment-status indicators showing "Reactivation needed", clicks "Reactivate".

Alternatively, client calls the broker's servicing line and reactivation is initiated by the call-center.

### Step 5 — Re-KYC determination

The broker's orchestrator checks: is the last KYC validation more than 12 months old? (For most dormant accounts the answer is yes, because dormancy itself implies long inactivity which usually coincides with stale KYC.)

- **If re-KYC needed:** full [re-KYC flow](./re-kyc/) — identity / address / contact / income re-validation, eSign, propagation. This is the long path; takes 2–3 business days.
- **If re-KYC fresh:** skip to step 7.

### Step 6 — Re-KYC completion (if needed)

The standard re-KYC walkthrough applies. On completion, status moves to "ready to reactivate" — KRA and CKYC are now fresh.

### Step 7 — UCC unfreeze at exchanges

Exchange UCC for each elected exchange (NSE / BSE / MCX) updated from "inactive" / "frozen" to "active". This is a sequential propagation: KRA must be fresh first (from step 6 or already fresh from step 5), then exchange UCC validates against the refreshed KRA.

BSE's procedure for this is the "Unfreeze" process. NSE and MCX use parallel processes under different names.

### Step 8 — BO reactivate at depository

CDSL or NSDL BO account updated from "dormant" to "active". Holdings remain unchanged; the BO record's status flag flips.

### Step 9 — Segment re-activation

For each segment the client had active at the time of dormancy, evaluate re-activation:

- **CM segment** — typically auto-re-activates with the account.
- **F&O / CD** — re-activates with declaration (no additional proof typical).
- **COM segment** — re-activates with **fresh income proof** per MCX rules. Income proof from the original onboarding is not sufficient — the broker must re-verify income at reactivation time.
- **F&O if dormant > 24 months** — many brokers also require fresh income proof.

<Aside type="caution">
**Income proof requirement at reactivation is broker-policy with regulatory guardrails.** SEBI doesn't mandate fresh income proof for F&O reactivation; MCX does for commodities (effectively, all MCX clients regardless of dormancy). Most brokers err on the side of requiring fresh income proof for any segment requiring it, regardless of how recently the client was active. Document your policy explicitly in the client agreement.
</Aside>

### Step 10 — Confirmation

Client notified that reactivation is complete; segments active; trading resumed. Next re-KYC date updated based on current risk tier.

## Sub-cases

### Reactivation refused by client

A client who has moved abroad, lost interest, or doesn't respond to reactivation prompts stays dormant. After a broker-policy-driven threshold (often 24–36 months total inactivity), the broker may initiate dormant-account closure or formal account closure with SEBI / depository intimation.

### Modification request during dormancy

If a dormant client wants to update contact details or bank but doesn't want to fully reactivate, the broker can process a "modification-during-dormancy" with limited scope — typically updating only the requested field, not the full re-KYC. The account remains dormant.

### Auto-disable creating false dormancy

A client who actively holds positions but doesn't open new ones can appear dormant by the "no-trade" criterion even though they're holding deliberately. Tighter brokers exclude "holding-active" accounts from dormancy flagging; looser brokers flag them anyway and require explicit reactivation to add new positions.

## Field-level callouts

Dormancy detection touches master-dataset Section Y (Account Lifecycle & Dormancy). Reactivation triggers updates across sections A (Identity), B (Address), C (Contact), F (Financial), L (Trading Preferences) — same fields as re-KYC. See the [Field-level Data Flow Atlas Section Y](/broking-kyc/reference/field-atlas/sections/y-account-lifecycle/) for the per-destination flow.

## Practical notes

- **[industry practice]** Dormancy thresholds (12m, 24m) are conventions, not legal mandates. Some brokers use 6 months; some use 18. The decision is a trade-off between fraud-prevention rigor and customer-experience friction.
- **[gotcha]** Reactivation segment re-activation has different income-proof rules than initial activation. Specifically, MCX requires fresh income proof on every reactivation, regardless of the client's history. New ops engineers sometimes apply onboarding-time logic to reactivation and skip the income re-check.
- **[risk trade-off]** Letting CM segment auto-reactivate without re-KYC (when re-KYC is fresh) is a customer-experience win but masks the fact that the client's last identity validation may be 9-11 months old. Tighter brokers force re-KYC at every reactivation regardless of timing.
- **[cost optimization]** A well-designed in-app reactivation flow (no call-center needed) handles the bulk of reactivations at near-zero marginal cost. The investment in this UI pays back proportionally to the dormant client base size.

## Cross-references

- [Compliance Blueprint — KYC lifecycle domain](/broking-kyc/operations/compliance-blueprint/#kyc-lifecycle-41-entries)
- [Lifecycle: Re-KYC](./re-kyc/)
- [Integration DAG — dormancy & reactivation](/broking-kyc/operations/integration-dag/lifecycle-events/)
- [Field Atlas — Section Y (Account Lifecycle)](/broking-kyc/reference/field-atlas/sections/y-account-lifecycle/)
- [Circulars — SEBI MIRSD](/broking-kyc/reference/circulars/sebi-mirsd/)

## Verified through

2026-05-14

---

*AI-generated and not legal, financial, or compliance advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*

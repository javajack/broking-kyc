---
title: Admin Workflow
description: The maker-checker review process — how applications are auto-approved, when they need manual review, and the checker's role as the final gate.
---

Every KYC (Know Your Customer) application that flows through the system must pass a dual review before any data is submitted to regulators, exchanges, or depositories. This dual review is called the "maker-checker" process — a concept borrowed from banking operations where no single person can both initiate and approve a transaction. In our context, the "maker" is often the system itself (automatically verifying data against thresholds), and the "checker" is a human supervisor who gives the final sign-off. Think of it as the quality control station on the assembly line: the maker inspects each item against a checklist, and the checker does a final spot-check before the item ships. This page explains when applications sail through automatically, when they get flagged for human review, and what the checker is ultimately responsible for.

:::note[Why Maker-Checker Matters]
SEBI (Securities and Exchange Board of India) regulations require that no KYC submission to a KRA (KYC Registration Agency), exchange, or depository happens without appropriate review. The maker-checker model provides this dual control while keeping the process fast — 80-85% of applications need zero human intervention.
:::

The workflow has three tiers: automated approval (the majority of cases), manual review by operations staff (the maker), and final sign-off by a supervisor (the checker). Let us walk through each.

## Maker-Checker Flow

| Step | Role | Action | Outcome |
|------|------|--------|---------|
| 10 | **Maker (System)** | Auto-verify all checks against thresholds. If ALL pass → auto-approve. | Auto-approved (80-85% of cases) |
| 10 | **Maker (Ops)** | If any check is marginal (e.g., name match 70-89%), manually review flagged fields. | Approved / Escalated / Rejected |
| 11 | **Checker (Supervisor)** | Review maker's decision. Final approval or rejection. Mandatory — no batch processing without it. | **Checker Approved** → batch pipelines fire |
| Esc | **Compliance** | AML (Anti-Money Laundering) HIGH risk, PEP (Politically Exposed Person) matches, sanctions hits escalated from maker. Enhanced CDD (Customer Due Diligence) required. | Approved with conditions / Rejected |

In plain English: Step 10 is where the system (or an operations team member) reviews the application. Step 11 is where a supervisor gives the final green light. Only after Step 11 does the batch pipeline start submitting data to KRAs, exchanges, and depositories.

The key to keeping the process efficient is the auto-approve criteria. The better your upstream data capture and verification, the higher the percentage of applications that pass through without human involvement.

## Auto-Approve Criteria (Zero Human Touch)

Application is auto-approved if ALL conditions are met:

| Check | Threshold | Source |
|-------|-----------|--------|
| PAN (Permanent Account Number) status | = E (valid) | Decentro PAN API (Application Programming Interface) |
| PAN-Aadhaar linked | = Y | Decentro PAN API |
| PAN name vs DigiLocker name | >= 90% match | Internal name matcher |
| Penny drop name match | >= 80% | Decentro Penny Drop |
| Face match score | >= 85% | HyperVerge |
| Liveness detection | = Pass | HyperVerge |
| AML risk | = LOW | TrackWizz |
| PEP match | = None | TrackWizz |
| Sanctions match | = None | TrackWizz |

:::tip[Expected Auto-Approve Rate]
**Expected auto-approve rate: 80-85%** of applications need zero human intervention. This means your operations team only needs to manually handle roughly 1 in 5 or 6 applications — a significant efficiency gain over fully manual processes.
:::

In plain English: if the customer's PAN is valid and linked to Aadhaar, their name matches across documents, their selfie matches their photo ID, they pass liveness detection, and they have no AML/PEP/sanctions flags, the system auto-approves without any human touching it.

When an application does not meet all the auto-approve thresholds, it gets flagged for manual review. The triggers below define exactly which checks can be marginal (and therefore resolvable by a human reviewer) versus which ones must be escalated to compliance.

## Manual Review Triggers

| Trigger | Condition | Action Required |
|---------|-----------|----------------|
| Name mismatch | PAN vs DigiLocker match 70-89% | Verify names visually, check for initials/abbreviations |
| Penny drop marginal | Name match 60-79% | Check bank name vs Aadhaar name |
| Face match marginal | Score 70-84% | Review selfie quality, request retake if needed |
| AML MEDIUM risk | Risk score above LOW threshold | Review hit details, confirm false positive or escalate |
| PEP declared | User self-declared PEP = Yes | Enhanced CDD: verify position, source of wealth |
| Income mismatch | Declared vs verified income diverge > 50% | Review income proof documents |

:::note[Name Mismatches Are the Most Common Manual Trigger]
Indian names often have variations across documents — initials vs full names, middle names present on one document but not another, or transliteration differences between Aadhaar (which may be in a regional language) and PAN (which is always in English). Your operations team should develop a mental checklist for common name variations before rejecting an application.
:::

In plain English: most manual reviews are caused by name discrepancies between documents. A 75% name match between PAN and DigiLocker does not necessarily mean fraud — it often just means "Rajesh K" on one document and "Rajesh Kumar" on another.

Once the maker (whether automated or human) has made a decision, the checker performs the final review.

## Checker Final Approval

| Checker Action | When | Result |
|----------------|------|--------|
| **Approve** | Maker auto-approved or manually approved | Batch pipelines fire (KRA, CKYC, UCC, BO) |
| **Reject** | Fraud indicators, compliance red flags | Application rejected, client notified |
| **Send Back** | Missing information, unclear documentation | Returns to maker for re-review |

:::caution[Batch Processing Is Gated on the Checker]
**Critical:** Batch processing (KRA submit, CKYC upload, UCC registration, BO account opening) begins **only after checker approval**. This ensures no regulatory submission happens without dual sign-off. If the checker is unavailable or delayed, all pending applications queue up, which is why it is important to staff the checker role adequately during high-volume periods.
:::

In plain English: the checker is the last human gate. Once they approve, the system immediately begins submitting the customer's data to all the agencies described in the [Batch Pipeline](/broking-kyc/operations/batch-pipeline/) page. If they reject, the customer is notified and the application is closed. If they send it back, it returns to the maker queue for additional review.

:::tip[Optimizing Checker Throughput]
In practice, checkers should focus on the maker's notes and the flagged fields rather than re-reviewing the entire application. For auto-approved applications, the checker's role is a quick sanity check — confirming that the system's automated decision looks reasonable. For manually reviewed applications, the checker should pay particular attention to the maker's justification for approving marginal cases.
:::

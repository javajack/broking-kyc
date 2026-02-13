---
title: Admin Workflow
description: The maker-checker review process — how applications are auto-approved, when they need manual review, and the checker's role as the final gate.
---

The maker-checker review process — how applications are auto-approved, when they need manual review, and the checker's role as the final gate before batch processing begins. 80-85% of applications pass with zero human intervention.

## Maker-Checker Flow

| Step | Role | Action | Outcome |
|------|------|--------|---------|
| 10 | **Maker (System)** | Auto-verify all checks against thresholds. If ALL pass → auto-approve. | Auto-approved (80-85% of cases) |
| 10 | **Maker (Ops)** | If any check is marginal (e.g., name match 70-89%), manually review flagged fields. | Approved / Escalated / Rejected |
| 11 | **Checker (Supervisor)** | Review maker's decision. Final approval or rejection. Mandatory — no batch processing without it. | **Checker Approved** → batch pipelines fire |
| Esc | **Compliance** | AML HIGH risk, PEP matches, sanctions hits escalated from maker. Enhanced CDD required. | Approved with conditions / Rejected |

## Auto-Approve Criteria (Zero Human Touch)

Application is auto-approved if ALL conditions are met:

| Check | Threshold | Source |
|-------|-----------|--------|
| PAN status | = E (valid) | Decentro PAN API |
| PAN-Aadhaar linked | = Y | Decentro PAN API |
| PAN name vs DigiLocker name | >= 90% match | Internal name matcher |
| Penny drop name match | >= 80% | Decentro Penny Drop |
| Face match score | >= 85% | HyperVerge |
| Liveness detection | = Pass | HyperVerge |
| AML risk | = LOW | TrackWizz |
| PEP match | = None | TrackWizz |
| Sanctions match | = None | TrackWizz |

:::tip
**Expected auto-approve rate: 80-85%** of applications need zero human intervention.
:::

## Manual Review Triggers

| Trigger | Condition | Action Required |
|---------|-----------|----------------|
| Name mismatch | PAN vs DigiLocker match 70-89% | Verify names visually, check for initials/abbreviations |
| Penny drop marginal | Name match 60-79% | Check bank name vs Aadhaar name |
| Face match marginal | Score 70-84% | Review selfie quality, request retake if needed |
| AML MEDIUM risk | Risk score above LOW threshold | Review hit details, confirm false positive or escalate |
| PEP declared | User self-declared PEP = Yes | Enhanced CDD: verify position, source of wealth |
| Income mismatch | Declared vs verified income diverge > 50% | Review income proof documents |

## Checker Final Approval

| Checker Action | When | Result |
|----------------|------|--------|
| **Approve** | Maker auto-approved or manually approved | Batch pipelines fire (KRA, CKYC, UCC, BO) |
| **Reject** | Fraud indicators, compliance red flags | Application rejected, client notified |
| **Send Back** | Missing information, unclear documentation | Returns to maker for re-review |

:::caution
**Critical:** Batch processing (KRA submit, CKYC upload, UCC registration, BO account opening) begins **only after checker approval**. This ensures no regulatory submission happens without dual sign-off.
:::

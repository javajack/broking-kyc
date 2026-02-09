<section id="admin-workflow">
## <span class="section-num">14</span> KYC Admin Workflow

<p class="section-brief"><strong>The maker-checker review process</strong> &mdash; how applications are auto-approved, when they need manual review, and the checker's role as the final gate before batch processing begins. 80-85% of applications pass with zero human intervention.</p>

### Maker-Checker Flow

| Step | Role | Action | Outcome |
|------|------|--------|---------|
| 10 | **Maker (System)** | Auto-verify all checks against thresholds below. If ALL pass &rarr; auto-approve. | Auto-approved (80-85% of cases) |
| 10 | **Maker (Ops)** | If any check is marginal (e.g., name match 70-89%), manually review the flagged fields. | Approved / Escalated / Rejected |
| 11 | **Checker (Supervisor)** | Review maker's decision. Final approval or rejection. Checker sign-off is mandatory &mdash; no batch processing fires without it. | **Checker Approved** &rarr; batch pipelines fire |
| Esc | **Compliance** | AML HIGH risk, PEP matches, sanctions hits escalated from maker. Enhanced CDD required. | Approved with conditions / Rejected |

### Auto-Approve Criteria (Maker &mdash; no human touch)

Application is auto-approved if ALL conditions are met:

| Check | Threshold | Source |
|---|---|---|
| PAN status | = E (valid) | Decentro PAN API |
| PAN-Aadhaar linked | = Y | Decentro PAN API |
| PAN name vs DigiLocker name | &ge; 90% match | Internal name matcher |
| Penny drop name match | &ge; 80% | Decentro Penny Drop |
| Face match score | &ge; 85% | HyperVerge |
| Liveness detection | = Pass | HyperVerge |
| AML risk | = LOW | TrackWizz |
| PEP match | = None | TrackWizz |
| Sanctions match | = None | TrackWizz |

::: {.info-box .green}
**Expected auto-approve rate: 80-85%** of applications need zero human intervention.
:::

### Manual Review Triggers (Maker must review)

| Trigger | Condition | Action Required |
|---|---|---|
| Name mismatch | PAN vs DigiLocker name match 70-89% | Verify names visually, check for initials/abbreviations |
| Penny drop marginal | Name match 60-79% | Check bank name vs Aadhaar name, allow common variations |
| Face match marginal | Score 70-84% | Review selfie quality, request retake if needed |
| AML MEDIUM risk | Risk score above LOW threshold | Review hit details, confirm false positive or escalate |
| PEP declared | User self-declared PEP = Yes | Enhanced CDD: verify position, source of wealth |
| Income mismatch | Declared income vs verified income diverge &gt; 50% | Review income proof documents |

### Checker Final Approval

The checker reviews the maker's decision and gives final sign-off:

| Checker Action | When | Result |
|---|---|---|
| **Approve** | Maker auto-approved or manually approved | Batch pipelines fire (KRA, CKYC, UCC, BO) |
| **Reject** | Fraud indicators, compliance red flags | Application rejected, client notified |
| **Send Back** | Missing information, unclear documentation | Returns to maker for re-review |

::: {.info-box .orange}
**Critical:** Batch processing (KRA submit, CKYC upload, UCC registration, BO account opening) begins **only after checker approval**. This ensures no regulatory submission happens without dual sign-off.
:::

</section>

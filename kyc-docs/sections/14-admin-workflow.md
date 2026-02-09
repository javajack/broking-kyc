<section id="admin-workflow">
## <span class="section-num">14</span> KYC Admin Workflow

### Auto-Approve Criteria (no human touch)

Application is auto-approved if ALL conditions are met:

| Check | Threshold |
|---|---|
| PAN status | = E (valid) |
| PAN-Aadhaar linked | = Y |
| PAN name vs DigiLocker name | &ge; 90% match |
| Penny drop name match | &ge; 80% |
| Face match score | &ge; 85% |
| Liveness detection | = Pass |
| AML risk | = LOW |
| PEP match | = None |
| Sanctions match | = None |

::: {.info-box .green}
**Expected auto-approve rate: 80-85%** of applications need zero human intervention.
:::

</section>

<section id="status-machine">
## <span class="section-num">15</span> Application Status Machine

<p class="section-brief"><strong>Every state an application can be in</strong> &mdash; from the first mobile OTP to trading-ready. Tracks the user journey (9 screens), maker-checker review, and batch registration across agencies. Use this to understand what triggers each transition.</p>

<div class="status-flow">
  <span class="status-node pending">REGISTERED</span>
  <span class="status-arrow">&rarr;</span>
  <span class="status-node pending">PAN_ENTERED</span>
  <span class="status-arrow">&rarr;</span>
  <span class="status-node pending">DIGILOCKER_PENDING</span>
  <span class="status-arrow">&rarr;</span>
  <span class="status-node pending">FILLING</span>
  <span class="status-arrow">&rarr;</span>
  <span class="status-node pending">GATE_CHECK</span>
  <span class="status-arrow">&rarr;</span>
  <span class="status-node pending">e_SIGNED</span>
  <span class="status-arrow">&rarr;</span>
  <span class="status-node pending">UNDER_REVIEW</span>
  <span class="status-arrow">&rarr;</span>
  <span class="status-node pending">APPROVED</span>
  <span class="status-arrow">&rarr;</span>
  <span class="status-node pending">REGISTERING</span>
  <span class="status-arrow">&rarr;</span>
  <span class="status-node active">ACTIVE</span>
</div>

<p style="margin-top:8px;">
  <span class="status-node blocked">GATE_FAILED</span> (any blocking check fails) &mdash;
  <span class="status-node blocked">REJECTED</span> (admin rejection)
</p>

### Status Transitions

| From | To | Trigger |
|------|----|---------|
| &mdash; | REGISTERED | Mobile OTP verified (Screen 1 complete) |
| REGISTERED | PAN_ENTERED | PAN + DOB submitted (Screen 2), async checks fire |
| PAN_ENTERED | DIGILOCKER_PENDING | Redirected to DigiLocker (Screen 3) |
| DIGILOCKER_PENDING | FILLING | DigiLocker consent complete, data harvested |
| DIGILOCKER_PENDING | PAN_ENTERED | DigiLocker cancelled (retry) |
| FILLING | GATE_CHECK | Screen 8 declarations submitted |
| GATE_CHECK | e_SIGNED | Gate passed + e-Sign complete (Screen 9) |
| GATE_CHECK | GATE_FAILED | Any blocking check failed |
| GATE_FAILED | FILLING | User corrects issue + retries |
| e_SIGNED | UNDER_REVIEW | Auto &mdash; enters maker-checker queue |
| UNDER_REVIEW | APPROVED | Checker approval (after maker review) |
| UNDER_REVIEW | REJECTED | Checker rejection |
| REJECTED | FILLING | User resubmits with corrections |
| APPROVED | REGISTERING | Batch pipelines fire (KRA, CKYC, UCC, BO) |
| REGISTERING | ACTIVE | KRA Registered + UCC Approved + BO Active |

</section>

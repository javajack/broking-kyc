<section id="status-machine">
## <span class="section-num">15</span> Application Status Machine

<div class="status-flow">
  <span class="status-node pending">STARTED</span>
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

</section>

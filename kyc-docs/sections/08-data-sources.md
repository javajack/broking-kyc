<section id="data-sources">
## <span class="section-num">8</span> Data Source Mapping

<p class="section-brief"><strong>Where each field comes from</strong> &mdash; the resolution priority when DigiLocker, KRA, CKYC, and vendor APIs all provide the same field. DigiLocker wins for identity, KRA wins for financial profile, vendor APIs win for real-time verification results.</p>

### Resolution Priority (when multiple sources provide same field)

<div style="display:flex;gap:8px;flex-wrap:wrap;margin:16px 0;align-items:center;">
  <span style="background:var(--accent);color:white;padding:6px 16px;border-radius:20px;font-size:0.8rem;font-weight:700;">1. DigiLocker</span>
  <span style="color:var(--text-muted);font-weight:700;">&gt;</span>
  <span style="background:var(--green-bg);color:var(--green);padding:6px 16px;border-radius:20px;font-size:0.8rem;font-weight:700;border:1px solid var(--green);">2. CKYC (CERSAI)</span>
  <span style="color:var(--text-muted);font-weight:700;">&gt;</span>
  <span style="background:var(--green-bg);color:var(--green);padding:6px 16px;border-radius:20px;font-size:0.8rem;font-weight:700;border:1px solid var(--green);">3. KRA Fetch</span>
  <span style="color:var(--text-muted);font-weight:700;">&gt;</span>
  <span style="background:var(--purple-bg);color:var(--purple);padding:6px 16px;border-radius:20px;font-size:0.8rem;font-weight:700;border:1px solid var(--purple);">4. Vendor API</span>
  <span style="color:var(--text-muted);font-weight:700;">&gt;</span>
  <span style="background:#fef3c7;color:#92400e;padding:6px 16px;border-radius:20px;font-size:0.8rem;font-weight:700;border:1px solid #f59e0b;">5. User Input</span>
</div>

**Rule:** DigiLocker wins for identity fields. KRA/CKYC win for financial profile. User input only for data no source can provide (mobile, email, segment choice).

### Field Distribution (~454 total)

| Source | Fields | % | Examples |
|---|---|---|---|
| <span class="field-tag system">System Generated</span> | ~350+ | 77% | Timestamps, IDs, status codes, audit logs, API responses, submission tracking |
| <span class="field-tag auto">KRA/CKYC Prefill</span> | ~40 | 9% | Occupation, income, net worth, FATCA, PEP, signature, CKYC number |
| <span class="field-tag auto">DigiLocker</span> | ~25 | 5.5% | Name, DOB, gender, photo, full address, father's name, POI/POA |
| <span class="field-tag api">Vendor APIs</span> | ~25 | 5.5% | PAN status, bank name match, AML score, face match, e-Sign metadata |
| <span class="field-tag user">User Types</span> | **~12** | **3%** | Aadhaar, PAN, mobile, email, marital status, bank a/c, IFSC, segments |

</section>

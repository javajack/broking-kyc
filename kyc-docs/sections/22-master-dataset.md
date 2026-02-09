<section id="master-dataset">
## <span class="section-num">22</span> Master Dataset &mdash; Detailed Sections

Version 1.1 &mdash; ~454 fields across 30 sections. Regulatory basis: SEBI KYC Master Circular, Stock Brokers Master, AML/CFT Guidelines.

<details>
  <summary>Section A: Personal Identity (32 fields)</summary>
  <table>
    <thead><tr><th>#</th><th>Field</th><th>Type</th><th>Size</th><th>Req</th><th>Validation</th></tr></thead>
    <tbody>
      <tr><td>A01</td><td><code>pan</code></td><td>String</td><td>10</td><td>Y</td><td><code>[A-Z]{5}[0-9]{4}[A-Z]</code></td></tr>
      <tr><td>A02</td><td><code>pan_exempt</code></td><td>Boolean</td><td>1</td><td>N</td><td>Y/N</td></tr>
      <tr><td>A05</td><td><code>first_name</code></td><td>String</td><td>70</td><td>Y</td><td>Alpha + spaces, must match PAN</td></tr>
      <tr><td>A07</td><td><code>last_name</code></td><td>String</td><td>70</td><td>Y</td><td>Alpha + spaces, must match PAN</td></tr>
      <tr><td>A15</td><td><code>father_spouse_name</code></td><td>String</td><td>70</td><td>Y</td><td>Full name</td></tr>
      <tr><td>A18</td><td><code>gender</code></td><td>String</td><td>1</td><td>Y</td><td>M/F/T</td></tr>
      <tr><td>A20</td><td><code>date_of_birth</code></td><td>Date</td><td>10</td><td>Y</td><td>DD/MM/YYYY, age &ge; 18</td></tr>
      <tr><td>A23</td><td><code>aadhaar_number</code></td><td>String</td><td>12</td><td>N</td><td>12 digits, Verhoeff. Masked: XXXX-XXXX-1234</td></tr>
      <tr><td>A25</td><td><code>ckyc_number</code></td><td>String</td><td>14</td><td>N</td><td>14-digit KIN from CERSAI</td></tr>
    </tbody>
  </table>
  <p style="font-size:0.78rem;color:var(--text-muted)">Showing key fields. Full 32-field specification in KYC_MASTER_DATASET.md Section A.</p>
</details>

<details>
  <summary>Section B: Address Details (19 fields)</summary>
  <p>Correspondence address (B01-B09) + Permanent address (B10-B19). Source: DigiLocker Aadhaar XML auto-fills correspondence. Permanent defaults to same.</p>
</details>

<details>
  <summary>Section C: Contact Details (9 fields)</summary>
  <p>Mobile (ISD + number), alternate mobile, email, alternate email, landline, fax. Mobile and email are user-typed (Screen 3). OTP verification required for mobile.</p>
</details>

<details>
  <summary>Section D-E: POI &amp; POA (14 fields)</summary>
  <p>Auto-set from DigiLocker. POI = Aadhaar (type E). POA = Aadhaar address (type D). No user input needed.</p>
</details>

<details>
  <summary>Section F: Financial Profile (10 fields)</summary>
  <p>Occupation, income range, net worth, source of wealth, income proof. Pre-filled from KRA/CKYC if record exists. Income proof upload only for F&amp;O/Commodity.</p>
</details>

<details>
  <summary>Section G: Bank Account (16 fields per account, max 5)</summary>
  <p>Account number, IFSC, bank name (auto from IFSC), branch, MICR, account type, holder name, proof document, penny drop results (status, name match, UTR).</p>
</details>

<details>
  <summary>Sections H-AC: Remaining sections</summary>
  <p>H: Demat (9) | I: Nominations (22 per nominee) | J: FATCA (15) | K: PEP/AML (6) | L: Trading (12) | M: Risk (6) | N: IPV/VIPV (21) | O: DDPI (10) | P: Consent (23) | Q: Documents (16) | R: Verification Results (42) | S: KRA Submission (14) | T: CKYC Submission (12) | U: Exchange UCC (15) | V: NRI (22) | W: Minor/Joint/POA (26) | X: Margin (10) | Y: Lifecycle (20) | Z: Audit (20) | AA: DPDP (15) | AB: Communications (9) | AC: Running Account (9)</p>
</details>

</section>

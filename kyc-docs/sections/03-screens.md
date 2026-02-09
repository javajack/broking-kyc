<section id="screens">
<h2><span class="section-num">3</span> Screen-by-Screen Specification</h2>

<p class="section-brief"><strong>The 9-screen user journey</strong> &mdash; each screen has a single clear purpose. Mobile/email registration establishes the identity anchor and OTP channel before any KYC data enters the system. PAN+DOB fires async checks while the user completes DigiLocker consent. Total user time: ~6 minutes.</p>

<!-- SCREEN 1 -->
<div class="screen-card" id="screen-1">
<div class="screen-card-header">
<div class="screen-num">1</div>
<h4>Mobile / Email Registration</h4>
</div>
<p><strong>Purpose:</strong> Establish the identity anchor and OTP communication channel before any KYC data is captured.</p>
<p><strong>User types:</strong>
<span class="field-tag user">Mobile Number (10 digits)</span>
</p>
<p><strong>Validation:</strong> Mobile: 10 digits starting with 6-9. OTP sent via SMS for verification.</p>
<p><strong>Fallback:</strong> Email registration if mobile OTP fails 3 times.</p>
<p><strong>Time:</strong> ~30 seconds</p>

<div class="async-bar">
On registration, device fingerprinting fires:
<strong>Bureau.id Device Intelligence</strong> &mdash; 200+ risk signals, emulator/root detection, synthetic identity check
</div>

<div class="info-box blue"><strong>Why start with mobile?</strong> Mobile number is the universal communication channel for OTPs, KRA verification, CKYC, and all post-onboarding notifications. Establishing it first ensures every subsequent step has a verified contact channel.</div>
</div>

<!-- SCREEN 2 -->
<div class="screen-card" id="screen-2">
<div class="screen-card-header">
<div class="screen-num">2</div>
<h4>PAN + Date of Birth</h4>
</div>
<p><strong>Purpose:</strong> Capture the two identity keys that unlock all downstream data lookups.</p>
<p><strong>User types:</strong>
<span class="field-tag user">PAN (ABCDE1234F)</span>
<span class="field-tag user">Date of Birth</span>
</p>
<p><strong>Validation:</strong> PAN: <code>[A-Z]{5}[0-9]{4}[A-Z]</code>, 4th char P=Individual. DOB: valid date, age &ge; 18.</p>
<p><strong>Time:</strong> ~20 seconds</p>

<div class="async-bar">
On submit, 4 parallel API calls fire (results ready by Screen 4):
<strong>PAN Verify</strong> | <strong>KRA Lookup</strong> | <strong>CKYC Search</strong> | <strong>AML/PEP Screen</strong>
</div>

<!-- PAN Verification Vendors -->
<div class="vendor-table" id="v-pan">
<div class="vendor-table-title">Vendor Comparison: PAN Verification</div>
<table>
<thead><tr><th>Vendor</th><th>Type</th><th>Key Features</th><th>Cost/txn</th><th>Integration</th></tr></thead>
<tbody>
<tr class="recommended"><td><strong>Decentro</strong> <span class="badge-rec">Recommended</span></td><td>REST API</td><td>PAN status (E/F/X/D/N), name match, PAN-Aadhaar link check, DOB match. PAN_DETAILED variant returns father name, email, mobile.</td><td>Rs.1-3</td><td>API key, 1-2 weeks</td></tr>
<tr><td>Setu <span class="badge-new">New Option</span></td><td>REST API</td><td>Direct NSDL connection. Returns <code>aadhaar_seeding_status</code>, <code>category</code>, <code>full_name</code>. Consent+reason params for audit. Part of unified KYC bundle (PAN+Aadhaar+bank+eSign). Sandbox available.</td><td>Rs.3</td><td>API key, 1 week</td></tr>
<tr><td>Karza Technologies <span class="badge-alt">Alternate</span></td><td>REST API</td><td>PAN verify + PAN-Aadhaar link + form 26AS fetch. Govt database authentication. Under Perfios umbrella.</td><td>Rs.2-4</td><td>API key, 1-2 weeks</td></tr>
<tr><td>Sandbox.co.in <span class="badge-alt">Alternate</span></td><td>REST API</td><td>JWT + API key auth. Wallet-based pricing with calculator. Multiple document verification.</td><td>Rs.1-2</td><td>JWT token, 1 week</td></tr>
<tr><td>Protean (NSDL Direct) <span class="badge-alt">Alternate</span></td><td>HTTPS</td><td>Direct ITD-authorized. Bulk verification. Requires AUA authorization.</td><td>Contact</td><td>3+ weeks (registration)</td></tr>
<tr><td>Gridlines <span class="badge-new">New Option</span></td><td>REST API</td><td>PAN verify + cross-verification with other IDs. Modern API design. Startup-friendly pricing.</td><td>Rs.1-3</td><td>API key, 1 week</td></tr>
</tbody>
</table>
</div>

<!-- AML Screening Vendors -->
<div class="vendor-table" id="v-aml">
<div class="vendor-table-title">Vendor Comparison: AML / PEP / Sanctions Screening</div>
<table>
<thead><tr><th>Vendor</th><th>Key Features</th><th>Watchlists</th><th>Cost/txn</th></tr></thead>
<tbody>
<tr class="recommended"><td><strong>TrackWizz</strong> <span class="badge-rec">Recommended</span></td><td>India-specific: SEBI debarred, RBI defaulters, MHA lists. Fuzzy matching. Ongoing monitoring with webhooks. CKYC solution also available.</td><td>120+</td><td>Rs.5-15</td></tr>
<tr><td>ComplyAdvantage <span class="badge-alt">Alternate</span></td><td>Global coverage. EU/US/APAC endpoints. 600 calls/min. Real-time + batch screening.</td><td>100+</td><td>Rs.10-25</td></tr>
<tr><td>IDfy AML <span class="badge-alt">Alternate</span></td><td>150+ entity types. OFAC, SDN, UN, MHA. Background verification bundle.</td><td>150+</td><td>Rs.8-20</td></tr>
<tr><td>Bureau.id <span class="badge-new">New Option</span></td><td>Device fingerprint (99.7% persistence, survives factory resets). 200+ real-time risk signals per device. Detects emulators, rooting, coordinated fraud rings, synthetic identities. KYC/KYB/AML across 195+ markets.</td><td>Global + India</td><td>Contact</td></tr>
</tbody>
</table>
</div>
</div>

<!-- SCREEN 3 -->
<div class="screen-card" id="screen-3">
<div class="screen-card-header">
<div class="screen-num">3</div>
<h4>DigiLocker Consent (Redirect)</h4>
</div>
<p><strong>Purpose:</strong> Consent-based fetch of Aadhaar XML + PAN document.</p>
<p><strong>User types:</strong> 0 fields (enters Aadhaar number + OTP on DigiLocker). Aadhaar OTP sent fresh here.</p>
<p><strong>Data harvested (~25 fields with zero effort):</strong></p>
<p>
<span class="field-tag auto">Name (first/middle/last/full)</span>
<span class="field-tag auto">DOB</span>
<span class="field-tag auto">Gender</span>
<span class="field-tag auto">Photo</span>
<span class="field-tag auto">Father's Name</span>
<span class="field-tag auto">Full Address (8 fields)</span>
<span class="field-tag auto">POI auto-set (Aadhaar)</span>
<span class="field-tag auto">POA auto-set (Aadhaar)</span>
</p>
<div class="info-box green"><strong>IPV Exemption:</strong> Aadhaar eKYC via DigiLocker = IPV/VIPV exempted per SEBI circular. Saves an entire video call step.</div>
<p><strong>Time:</strong> ~60 seconds (redirect + consent + return). This 60s buffer is exactly the time needed for all 4 async API calls from Screen 2 to complete.</p>

<!-- DigiLocker / Aadhaar Vendors -->
<div class="vendor-table" id="v-aadhaar">
<div class="vendor-table-title">Vendor Comparison: Aadhaar / DigiLocker</div>
<table>
<thead><tr><th>Vendor</th><th>Product</th><th>Key Features</th><th>Unique Differentiator</th></tr></thead>
<tbody>
<tr class="recommended"><td><strong>Digio</strong> <span class="badge-rec">Recommended</span></td><td>DigiKYC + DigiLocker</td><td>MeitY-approved partner. DigiLocker OAuth 2.0 consent flow. Aadhaar Offline XML. Built-in face match. SEBI/RBI/IRDAI compliant.</td><td>Full-stack KYC orchestration. One SDK for DigiLocker + eSign + Video KYC + KRA + CKYC.</td></tr>
<tr><td>Decentro <span class="badge-alt">Alternate</span></td><td>DigiLocker Suite + SSO</td><td>DigiLocker APIs: Initiate Session, Get Issued Files, Download e-Aadhaar. UIStreams for guided workflows.</td><td>Unified API across PAN + bank + DigiLocker + CKYC. Single vendor for multiple use cases.</td></tr>
<tr><td>Setu <span class="badge-new">New Option</span></td><td>KYC Data Bundle + OKYC</td><td>DigiLocker gateway (70+ doc types, OAuth consent). OKYC: OTP-based offline Aadhaar XML. <strong>Aadhaar Redundancy API</strong>: auto-failover between supply partners for higher success rates.</td><td>Unified platform: Aadhaar+PAN+bank+DigiLocker+eSign from one vendor. AA market leader. Acquired by Pine Labs ($70-75M).</td></tr>
<tr><td>NPCI e-KYC Setu <span class="badge-new">New Option</span></td><td>e-KYC Setu System</td><td>Aadhaar e-KYC via NPCI without sharing Aadhaar number. Gazette Notification S.O.5684(E) legal basis. SEBI allowed for intermediaries Jun 2025. Biometric + OTP auth supported.</td><td>No AUA/KUA license needed. Privacy-first: broker gets masked Aadhaar + demographics only. Simplest regulatory path for Aadhaar eKYC.</td></tr>
<tr><td>HyperVerge <span class="badge-alt">Alternate</span></td><td>Aadhaar Suite</td><td>Aadhaar OCR, Aadhaar XML parsing, face match against Aadhaar photo. SDK for Android/iOS/Web.</td><td>Best-in-class OCR (99.8%) + face match in a single call. Good for fallback if DigiLocker is down.</td></tr>
</tbody>
</table>
</div>
</div>

<!-- SCREEN 4 -->
<div class="screen-card" id="screen-4">
<div class="screen-card-header">
<div class="screen-num">4</div>
<h4>Confirm Identity</h4>
</div>
<p><strong>Pre-filled (read-only):</strong>
<span class="field-tag auto">Name</span>
<span class="field-tag auto">DOB</span>
<span class="field-tag auto">Gender</span>
<span class="field-tag auto">Father's Name</span>
<span class="field-tag auto">Full Address</span>
<span class="field-tag auto">Photo</span>
<span class="field-tag auto">PAN</span>
</p>
<p><strong>Pre-filled from KRA/CKYC (if found):</strong>
<span class="field-tag auto">Occupation</span>
<span class="field-tag auto">Income Range</span>
<span class="field-tag auto">Net Worth</span>
<span class="field-tag auto">CKYC Number</span>
</p>
<p><strong>User types:</strong>
<span class="field-tag user">Email (C03)</span>
</p>
<div class="info-box blue"><strong>Note:</strong> Mobile already verified on Screen 1. Only email needs to be entered here.</div>
<p><strong>Time:</strong> ~30 seconds</p>

<!-- KRA Vendors -->
<div class="vendor-table" id="v-kra">
<div class="vendor-table-title">Vendor Comparison: KRA Integration</div>
<table>
<thead><tr><th>Vendor</th><th>APIs</th><th>KRA Coverage</th><th>Key Features</th><th>Cost/txn</th></tr></thead>
<tbody>
<tr class="recommended"><td><strong>Digio</strong> <span class="badge-rec">Recommended</span></td><td>REST/JSON</td><td>All 5 KRAs via interoperability</td><td>PAN Status Check, Fetch Details, Upload/Update, Download Docs. IP whitelisting. 2-day integration.</td><td>Rs.3-5</td></tr>
<tr><td>CVL KRA Direct <span class="badge-alt">Alternate</span></td><td>SOAP/XML</td><td>All 5 via interop</td><td>GetPanStatus, InsertUpdateKYCRecord, bulk tilde-delimited files. Legacy but stable.</td><td>Rs.2-3</td></tr>
<tr><td>TrackWizz <span class="badge-new">New Option</span></td><td>REST/JSON</td><td>CVL + NDML</td><td>KRA submission + CKYC upload + AML screening in one platform. Regulatory reporting bundle.</td><td>Rs.3-5</td></tr>
</tbody>
</table>
</div>

<!-- CKYC Vendors -->
<div class="vendor-table" id="v-ckyc">
<div class="vendor-table-title">Vendor Comparison: CKYC Integration</div>
<table>
<thead><tr><th>Vendor</th><th>APIs</th><th>Key Features</th><th>Note</th><th>Cost/txn</th></tr></thead>
<tbody>
<tr class="recommended"><td><strong>Decentro</strong> <span class="badge-rec">Recommended</span></td><td>Search + Download + Upload</td><td>REST API. Masked CKYC search (Jan 2025). Full download with identity match. Bulk upload.</td><td>Handles masked CKYC number correctly</td><td>Rs.3-10</td></tr>
<tr><td>Digio <span class="badge-alt">Alternate</span></td><td>Search + Download + Upload</td><td>FI code config, CKYC public key, keystore. Java 17 / Docker. GitHub SDK available.</td><td>More complex setup</td><td>Rs.3-10</td></tr>
<tr><td>TrackWizz <span class="badge-new">New Option</span></td><td>Search + Upload</td><td>CKYC solution for reporting entities. Combined with AML screening.</td><td>Good if already using TrackWizz for AML</td><td>Rs.5-10</td></tr>
<tr><td>Protean Direct <span class="badge-alt">Alternate</span></td><td>SFTP + API</td><td>Direct CERSAI integration. Batch and real-time. Official registry operator.</td><td>Requires FI registration with CERSAI</td><td>Contact</td></tr>
</tbody>
</table>
</div>
</div>

<!-- SCREEN 5 -->
<div class="screen-card" id="screen-5">
<div class="screen-card-header">
<div class="screen-num">5</div>
<h4>Bank Account</h4>
</div>
<p><strong>User types:</strong>
<span class="field-tag user">Account Number (G01)</span>
<span class="field-tag user">IFSC Code (G03)</span>
<span class="field-tag user">Account Type (G07)</span>
</p>
<p><strong>Auto-filled from IFSC (RBI master):</strong>
<span class="field-tag auto">Bank Name</span>
<span class="field-tag auto">Branch Name</span>
<span class="field-tag auto">Branch City</span>
<span class="field-tag auto">MICR Code</span>
</p>
<div class="async-bar">ASYNC: Penny Drop verification fires on submit &mdash; Rs.1 IMPS credit + name match scoring. IFSC Lookup + cheque/statement OCR also fire.</div>
<p><strong>Time:</strong> ~45 seconds</p>

<!-- Bank Verification Vendors -->
<div class="vendor-table" id="v-bank">
<div class="vendor-table-title">Vendor Comparison: Bank Account Verification</div>
<table>
<thead><tr><th>Vendor</th><th>Methods</th><th>Name Match</th><th>Key Features</th><th>Cost/txn</th></tr></thead>
<tbody>
<tr class="recommended"><td><strong>Decentro</strong> <span class="badge-rec">Recommended</span></td><td>Penny drop, Penniless, Reverse penny drop (UPI)</td><td>Score 0-100 + FULL/PARTIAL/NO match</td><td>Rs.1 IMPS credit. 3 verification types. &lt;2 sec response.</td><td>Rs.2-5</td></tr>
<tr><td>Setu <span class="badge-new">New Option</span></td><td>Penny drop, <strong>Reverse penny drop (pioneer)</strong>, PennyLess</td><td>Yes (name match)</td><td>Industry-first reverse penny drop: customer pays Rs.1 via UPI, Setu extracts account+name+IFSC. Data cannot be spoofed. Kissht reported 5x conversion uplift. Webhook with 5 exponential retries. Also offers UPI AutoPay (Rs.1L for securities).</td><td>Rs.2-4</td></tr>
<tr><td>Cashfree <span class="badge-alt">Alternate</span></td><td>Penny drop (async webhook)</td><td>Yes</td><td>Webhook-based. Free trial Rs.100 credits. Does NOT support Deutsche Bank and Paytm Payments Bank.</td><td>Rs.2-4</td></tr>
<tr><td>Razorpay <span class="badge-alt">Alternate</span></td><td>Penny drop</td><td>Yes</td><td>Two-step: Create Fund Account then Validation. RazorpayX Lite only.</td><td>Rs.3-5</td></tr>
<tr><td>Karza <span class="badge-new">New Option</span></td><td>Penny drop + IFSC lookup</td><td>Yes</td><td>Bank verification + IFSC master lookup in one. Under Perfios umbrella.</td><td>Rs.2-4</td></tr>
</tbody>
</table>
</div>
</div>

<!-- SCREEN 6 -->
<div class="screen-card" id="screen-6">
<div class="screen-card-header">
<div class="screen-num">6</div>
<h4>Trading Preferences</h4>
</div>
<p><strong>Segment toggles:</strong>
<span class="field-tag user">Equity/Cash (default ON)</span>
<span class="field-tag user">F&amp;O</span>
<span class="field-tag user">Currency Derivatives</span>
<span class="field-tag user">Commodity</span>
</p>
<p><strong>Conditional:</strong>
<span class="field-tag conditional">Income proof upload (if F&amp;O or Commodity)</span>
</p>
<div class="info-box orange"><strong>SEBI Requirement:</strong> F&amp;O/Commodity segments require income verification. Bank statement must show credit of at least Rs.10,000 in last 6 months. Annual income threshold is broker-specific (typically Rs.1-10 lakh).</div>

<div class="async-bar">
If F&amp;O/Commodity selected, income verification fires:
<strong>Perfios ITR Analyser</strong> or <strong>Setu Account Aggregator</strong>
</div>

<!-- Income Verification Vendors -->
<div class="vendor-table" id="v-income">
<div class="vendor-table-title">Vendor Comparison: Income / ITR Verification</div>
<table>
<thead><tr><th>Vendor</th><th>Products</th><th>Key Features</th><th>Unique Value</th><th>Cost</th></tr></thead>
<tbody>
<tr class="recommended"><td><strong>Perfios</strong> <span class="badge-rec">Recommended</span></td><td>ITR Analyser, Bank Statement Analyser, Account Aggregator</td><td>4000+ bank statement formats. ITR-V, Form 26AS, AIS. AI/ML fraud detection. Sahamati-empaneled TSP.</td><td>Full-stack income verification. AA integration for consent-based fetch. Rs.5-25/fetch via AA.</td><td>Contact (volume-based)</td></tr>
<tr><td>Setu (via AA) <span class="badge-new">New Option</span></td><td>Account Aggregator FIU</td><td>Consent-based bank statement fetch. No PDF upload needed. Real-time from FIP. RBI-licensed AA.</td><td>Eliminates manual income proof upload entirely. User just consents. Most seamless UX.</td><td>Rs.5-25/fetch</td></tr>
<tr><td>Finbox (BankConnect) <span class="badge-alt">Alternate</span></td><td>Bank statement analysis</td><td>500+ predictors. PDF upload + netbanking + AA. Income, expenses, obligations extraction.</td><td>Best for thin-file analysis with alternate data signals.</td><td>Contact</td></tr>
<tr><td>Karza Technologies <span class="badge-alt">Alternate</span></td><td>ITR Portal Access + GST Analytics</td><td>Direct ITR portal access. Form 26AS, GST-R. 100+ APIs, 8 crore monthly calls. Under Perfios (OneView brand). Risk scoring + income profiling beyond raw verification.</td><td>Deep analytics layer: not just "is this valid?" but GST trend analysis, income profiling.</td><td>Contact</td></tr>
<tr><td>Tartan <span class="badge-new">New Option</span></td><td>Payroll/HRMS Sync</td><td>30+ HRMS integrations covering 80% of organized market. Real-time salary + employment data with user consent. Payslip OCR. EPFO/UAN employment history. 60 data points per user.</td><td>Deepest payroll verification in India. Direct HRMS integrations, not just document analysis. Relevant for margin trading eligibility.</td><td>Contact</td></tr>
</tbody>
</table>
</div>

<!-- Account Aggregator (NEW) -->
<div class="vendor-table" id="v-aa">
<div class="vendor-table-title">NEW: Account Aggregator Framework (RBI-licensed)</div>
<table>
<thead><tr><th>AA Operator</th><th>Role</th><th>Key Features</th><th>Relevance for KYC</th></tr></thead>
<tbody>
<tr><td><strong>Setu (Onemoney)</strong></td><td>AA + FIU tech</td><td>Leading AA tech provider. Consent Manager UI. FIU APIs for data fetch. Sandbox available.</td><td>Can replace income proof upload: user consents, bank statement fetched automatically from bank FIP. Also fetch demat holdings via CDSL/NSDL FIP.</td></tr>
<tr><td><strong>Perfios (Anumati)</strong></td><td>AA Operator</td><td>Sahamati-empaneled. FIU + FIP capabilities. Rs.5-25/fetch pricing. 4000+ format analysis.</td><td>Income verification without manual upload. ITR + bank statement via consent.</td></tr>
<tr><td>Finvu</td><td>AA Operator</td><td>RBI-licensed. 40+ FIP integrations. Web + mobile SDK.</td><td>Bank statement fetch for F&amp;O income proof.</td></tr>
<tr><td>CAMS Finserv</td><td>AA Operator</td><td>Backed by CAMS (RTA). MF + demat data via AA.</td><td>Mutual fund holdings data for net worth verification.</td></tr>
</tbody>
</table>
<div class="info-box cyan" style="margin:16px; border-radius:8px;">
<strong>Account Aggregator for KYC:</strong> SEBI circular Aug 2022 allowed depositories (CDSL/NSDL) as FIPs in the AA ecosystem. This means brokers can fetch demat holdings, bank statements, and ITR data via consent-based AA flow instead of manual document upload. UPI AutoPay mandates for securities brokers now support up to Rs.1 lakh (NPCI 2024 circular), enabling SIP and margin funding setup during onboarding.
</div>
</div>
</div>

<!-- SCREEN 7 -->
<div class="screen-card" id="screen-7">
<div class="screen-card-header">
<div class="screen-num">7</div>
<h4>Nominations</h4>
</div>
<p><strong>Option A:</strong> Add nominee &mdash;
<span class="field-tag user">Name</span>
<span class="field-tag user">Relationship</span>
<span class="field-tag user">DOB</span>
<span class="field-tag user">Allocation %</span>
</p>
<p><strong>Option B:</strong> "I choose to opt out of nomination" (requires async video declaration within 30 days).</p>
<p>Up to 10 nominees (SEBI Jan 2025). Total allocation must = 100%. Pre-fill from KRA/CKYC if data exists.</p>
<p><strong>Time:</strong> ~30 seconds (1 nominee) to ~2 min (multiple)</p>
</div>

<!-- SCREEN 8 -->
<div class="screen-card" id="screen-8">
<div class="screen-card-header">
<div class="screen-num">8</div>
<h4>Declarations + Blocking Gate</h4>
</div>
<p><strong>Checkboxes:</strong>
<span class="field-tag user">FATCA: India-only tax resident (Y/N)</span>
<span class="field-tag user">PEP: Not a PEP (Y/N)</span>
<span class="field-tag user">Risk Disclosure: Acknowledged</span>
<span class="field-tag user">T&amp;C: Accepted</span>
<span class="field-tag user">Running Account: Quarterly settlement</span>
<span class="field-tag user">DDPI: Opt-in (optional)</span>
</p>
<p><strong>Conditional:</strong>
<span class="field-tag conditional">FATCA details (if non-India tax resident)</span>
<span class="field-tag conditional">PEP details (if PEP = Yes)</span>
</p>

<div class="gate-box">
<h4>BLOCKING GATE &mdash; All must pass before e-Sign</h4>
<div class="gate-check pass"><strong>PAN Valid</strong> &mdash; Status = E (exists and valid)</div>
<div class="gate-check pass"><strong>PAN-Aadhaar Linked</strong> &mdash; Seeding status = Y</div>
<div class="gate-check pass"><strong>AML/PEP Clean</strong> &mdash; Risk level = LOW or MEDIUM</div>
<div class="gate-check pass"><strong>Penny Drop Success</strong> &mdash; Name match &ge; 70%</div>
<div class="gate-check pass"><strong>PMLA Checks</strong> &mdash; Anti-money laundering compliance verified</div>
</div>
<p><strong>Time:</strong> ~30 seconds</p>
</div>

<!-- SCREEN 9 -->
<div class="screen-card active" id="screen-9">
<div class="screen-card-header">
<div class="screen-num" style="background:var(--green)">9</div>
<h4>Review + Face Match + e-Sign (Final)</h4>
</div>
<p><strong>Step 1:</strong> Scroll-through review of complete pre-filled application.</p>
<p><strong>Step 2:</strong> Selfie capture &rarr; Face match against Aadhaar photo. Threshold: &ge;80% + liveness pass.</p>
<p><strong>Step 3:</strong> Aadhaar OTP e-Sign on complete application PDF. SHA-256 hash, CCA-compliant DSC.</p>
<div class="info-box green"><strong>IPV/VIPV: EXEMPTED</strong> &mdash; Aadhaar eKYC (DigiLocker) used. No video call needed.</div>
<p><strong>Time:</strong> ~60 seconds. <strong>USER DONE. Total: ~6 minutes.</strong></p>

<!-- e-Sign Vendors -->
<div class="vendor-table" id="v-esign">
<div class="vendor-table-title">Vendor Comparison: e-Sign</div>
<table>
<thead><tr><th>Vendor</th><th>Auth Modes</th><th>Key Features</th><th>CCA Licensed</th><th>Cost/sign</th></tr></thead>
<tbody>
<tr class="recommended"><td><strong>Digio</strong> <span class="badge-rec">Recommended</span></td><td>Aadhaar OTP, Biometric, Face</td><td>CADES-compliant DSC. White-label SDK. 2-day integration. Signed PDF with embedded cert. KRA + DigiLocker + VIPV in one platform.</td><td>Via licensed CA</td><td>Rs.15-25</td></tr>
<tr><td>Setu <span class="badge-new">New Option</span></td><td>Aadhaar OTP</td><td>Up to 25 signers. eStamp on-the-fly (state-specific stamp duty). Name match for Aadhaar eSign. Webhook notifications. ET Money saw 30% conversion surge.</td><td>Via licensed CA</td><td>Contact</td></tr>
<tr><td>Leegality <span class="badge-new">New Option</span></td><td>Aadhaar OTP</td><td>Zero license fee, pay-per-use. Smart API. 55M+ eSigns. &lt;2 day integration. eStamping support for state-specific stamp duty.</td><td>Via licensed CA</td><td>~Rs.25</td></tr>
<tr><td>eMudhra <span class="badge-alt">Alternate</span></td><td>Aadhaar OTP, Biometric, IRIS</td><td>Licensed CA by CCA. SAP/Oracle connectors. Volume pricing &gt;10L/year.</td><td>Yes (direct)</td><td>Volume-based</td></tr>
<tr><td>Protean (NSDL) <span class="badge-alt">Alternate</span></td><td>OTP, Biometric, IRIS</td><td>Licensed CA by CCA. Cheapest per-sign. Government-backed.</td><td>Yes (direct)</td><td>~Rs.5.90</td></tr>
</tbody>
</table>
</div>

<div class="info-box purple"><strong>Leegality vs Digio:</strong> Leegality offers zero license fee and ~Rs.25/sign with eStamping support &mdash; ideal for cost-sensitive or pilot deployments. Digio remains recommended because its multi-product stack (KRA + DigiLocker + VIPV + eSign) reduces overall vendor count and integration overhead.</div>

<!-- Face Match Vendors -->
<div class="vendor-table" id="v-face">
<div class="vendor-table-title">Vendor Comparison: Face Match &amp; Liveness Detection</div>
<table>
<thead><tr><th>Vendor</th><th>Accuracy</th><th>Liveness</th><th>Key Features</th><th>Cost/txn</th></tr></thead>
<tbody>
<tr class="recommended"><td><strong>HyperVerge</strong> <span class="badge-rec">Recommended</span></td><td>99.8%</td><td>ISO 30107 Level 2</td><td>Passive liveness (no gestures). Detects prints, screens, videos, 3D masks, deepfakes. Android/iOS/Web SDK.</td><td>Rs.1-2</td></tr>
<tr><td>IDfy <span class="badge-alt">Alternate</span></td><td>~99%</td><td>Active + passive</td><td>Face match + background verification bundle. Tampering detection.</td><td>Rs.1-2</td></tr>
<tr><td>Signzy <span class="badge-new">New Option</span></td><td>~99%</td><td>AI-based</td><td>200+ APIs. 14,000+ doc types from 180+ countries. Only Indian platform in Gartner Banking 2024 Market Guide. No-code workflow builder. SOC 2 + ISO 27001. 99M customers served.</td><td>Contact</td></tr>
<tr><td>Bureau.id <span class="badge-new">New Option</span></td><td>~98%</td><td>Device-based</td><td>Device intelligence layer adds anti-fraud. Detects emulators, rooted devices. Good secondary signal.</td><td>Contact</td></tr>
</tbody>
</table>
</div>

<!-- Video KYC Vendors (for fallback / nomination opt-out) -->
<div class="vendor-table" id="v-vkyc">
<div class="vendor-table-title">Vendor Comparison: Video KYC / VIPV (for nomination opt-out / fallback)</div>
<table>
<thead><tr><th>Vendor</th><th>Compliance</th><th>Key Features</th><th>Speed</th><th>Cost/call</th></tr></thead>
<tbody>
<tr class="recommended"><td><strong>HyperVerge</strong> <span class="badge-rec">Recommended</span></td><td>SEBI VIPV + RBI V-CIP</td><td>Self-guided + agent-led. Random questions. Face match during video. 99.5% accuracy. 7-year recording storage.</td><td>&lt;1 min (self-guided)</td><td>Rs.30-50</td></tr>
<tr><td>Digio <span class="badge-alt">Alternate</span></td><td>SEBI VIPV + RBI V-CIP + IRDAI</td><td>DigiStudio no-code workflow. Android + iOS SDK. Auto-reconnect. 5-10 min auditor review.</td><td>3-5 min</td><td>Rs.30-50</td></tr>
<tr><td>IDfy <span class="badge-alt">Alternate</span></td><td>SEBI + RBI</td><td>Agent-assisted + self-serve. Language-based reviewer allocation. Low bandwidth support.</td><td>3-5 min</td><td>Rs.30-50</td></tr>
<tr><td>Signzy <span class="badge-new">New Option</span></td><td>SEBI + RBI</td><td>500K+ calls/month. Works at 75 kbps bandwidth (best for Tier 3/4). No-code AI platform for custom workflows. Gartner Banking 2024.</td><td>3-5 min</td><td>Contact</td></tr>
<tr><td>Veri5 Digital <span class="badge-new">New Option</span></td><td>SEBI + RBI</td><td>Aadhaar e-KYC + Video KYC integrated. NFC-based document reading. Offline SDK. 99.84% face match. Aadhaar Data Vault (RBI-compliant tokenized storage). SMS KYC for feature phones.</td><td>2-3 min</td><td>Contact</td></tr>
</tbody>
</table>
</div>

<!-- OCR Vendors -->
<div class="vendor-table" id="v-ocr">
<div class="vendor-table-title">Vendor Comparison: OCR &amp; Document Verification</div>
<table>
<thead><tr><th>Vendor</th><th>Accuracy</th><th>Docs Supported</th><th>Key Features</th><th>Cost/doc</th></tr></thead>
<tbody>
<tr class="recommended"><td><strong>HyperVerge</strong> <span class="badge-rec">Recommended</span></td><td>99.8%</td><td>PAN, Aadhaar, Passport, Voter ID, DL, Cheque</td><td>Confidence scores per field. Auto-detect document type. Min 800px width. Tampering detection.</td><td>Rs.1-3</td></tr>
<tr><td>IDfy <span class="badge-alt">Alternate</span></td><td>~99%</td><td>Wide range</td><td>3 modes: OCR-only, Verify-only, OCR+Verify. Government database cross-check.</td><td>Rs.1-3</td></tr>
<tr><td>Signzy <span class="badge-new">New Option</span></td><td>~99%</td><td>14,000+ from 180+ countries</td><td>SDK offline mode. SOC 2 + ISO 27001. Best for multi-country support if NRI flow needed.</td><td>Contact</td></tr>
<tr><td>Karza <span class="badge-new">New Option</span></td><td>~98%</td><td>Indian docs + GST</td><td>Under Perfios umbrella. Good combo with ITR verification. Govt database auth.</td><td>Rs.1-3</td></tr>
</tbody>
</table>
</div>
</div>

</section>

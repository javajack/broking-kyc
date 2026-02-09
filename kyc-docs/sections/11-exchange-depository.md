<section id="exchange-depository">
## <span class="section-num">11</span> Exchange &amp; Depository Registration &mdash; Batch Integration

::: {.info-box .blue}
**Context:** After e-Sign, the system submits client data to exchanges (NSE/BSE/MCX) for UCC registration and to depositories (CDSL/NSDL) for BO account opening. Each has different file formats, field requirements, and validation rules. PAN is the universal linking key across all systems.
:::

### NSE UCC Registration

| Aspect | Details |
|---|---|
| **Trading System** | NEAT / NOW (NEAT on Web) |
| **Submission Methods** | **UCI Online** (web, manual 1-by-1) \| **API Upload** (REST JSON, automated) \| **Batch Upload** (pipe-delimited TXT/CSV, no headers) |
| **API Reference** | NSE Circular NSE/ISC/60418 (API), NSE/ISC/61817 (Apr 30, 2024 &mdash; revised structure) |
| **Batch Limit** | Max 10,000 records per file |
| **Format Change** | New file structure effective Jul 15, 2024 on UCI Online |
| **Key UCC Fields** | `client_name`, `pan`, `dob`, `gender`, `mobile`, `email`, `address`, `city`, `state`, `pincode`, `country`, `ucc_code` (max 10 alphanumeric), `client_type`, `kyc_status` |
| **Segments** | CM (Cash/Equity), FNO (F&O), CD (Currency Derivatives), COM (Commodity) |
| **Client Status** | Active / Inactive / Closed |
| **Activation SLA** | Same day (batch 5PM cutoff) |
| **Connectivity** | Leased Line (4-300 Mbps) \| VSAT (remote) \| NSE ExtraNet (internet) |

### BSE UCC Registration

| Aspect | Details |
|---|---|
| **Trading System** | BOLT Plus |
| **Connectivity** | ETI (Enhanced Trading Interface) via TCP/IP, IML (Intermediate Messaging Layer) API |
| **Format Revision** | Revised format effective Jan 22, 2024. Old format discontinued Apr 19, 2024 EOD. PAN verification methodology change effective Apr 30, 2024. |
| **PAN Verification** | **3-parameter mandatory**: PAN + Client Name + Client DOB/Incorporation date. All 3 must verify successfully via Protean. |
| **Modification Rule** | Changes to Client Name and DOB only via **Unfreeze requests** &mdash; re-verified with Protean. |
| **Batch Limit** | Max 30,000 records per batch file (Circular Jul 29, 2024). Segment activation batch: max 50,000 records. |
| **Segments** | Equity, F&O, Currency, Debt |
| **Activation SLA** | Same day |

### MCX UCC Registration

| Aspect | Details |
|---|---|
| **Trading System** | MCX CONNECT |
| **Connectivity** | CTCL (Computer-to-Computer Link) &mdash; proprietary C-structure API via TCP/IP. Requires ISV empanelment for custom front-ends. |
| **Additional Requirement** | Standard KYC docs + **income proof mandatory** for commodity trading |
| **Client Category** | HE=Hedger, SP=Speculator, AR=Arbitrageur |
| **Activation SLA** | Next working day |

### CDSL BO Account Opening

| Aspect | Details |
|---|---|
| **Core System** | CDAS (Central Depository Accounting System) |
| **BO ID Format** | **16 digits (numeric)**: 8-digit DP ID + 8-digit Client ID. Example: `1234567800012345` |
| **Submission** | **API**: BO Setup & Modify Upload API \| **Portal**: DP Module (one-by-one) \| **Batch**: Fixed-length positional file upload |
| **File Format** | Fixed-length, positional (no delimiters). Numeric: right-justified zero-padded. Alpha: left-justified space-padded. Signatures: .jpg/.bmp/.gif/.tif/.png |
| **File Lines** | Line 01: Header / DP ID / holder basics (mandatory)<br>Line 02: Contact, KYC flags, email, phone, BO opening source (mandatory)<br>Line 03-04: 2nd/3rd holder details (if joint)<br>Line 05: Bank account details for dividend/interest (mandatory)<br>Line 06: Additional details<br>Line 07: Nomination details (mandatory &mdash; per Jan 2025 SEBI) |
| **Platforms** | **easi**: Read-only view of holdings/statements. **EASIEST**: Full transaction capability (off-market, inter-depository, pay-in). **myEasi**: Mobile app. |
| **DDPI** | Optional, replaces PoA. Rs.100 + 18% GST. Activation within 24 working hours. Online (Aadhaar eSign) or offline. |
| **TPIN/OTP Flow** | DP initiates &rarr; CDSL API &rarr; Client enters 6-digit TPIN &rarr; OTP to email+mobile &rarr; Authorized |
| **Activation SLA** | 1-2 hours (API). 1-3 business days (batch with KYC verification). |

### NSDL BO Account Opening

| Aspect | Details |
|---|---|
| **Core System** | DPM (Depository Participant Module). GISMO: NSDL-provided local DPM. License: Rs.40K/yr or Rs.2.5L one-time. |
| **BO ID Format** | **"IN" + 14 chars (alphanumeric)**: IN + 6 DP ID + 8 Client ID. Example: `IN30039412345678` |
| **Submission** | Via **Insta Interface** &rarr; CDS &rarr; Local/Cloud DPM. Batch files uploaded to DPM; "Out file" returns Client_IDs. |
| **File Format** | **UDiFF** (Unified Distilled File Formats) &mdash; ISO tags with standardized data types. Effective Mar 30, 2024. Old format discontinued May 15, 2024. |
| **Platforms** | **SPEED-e**: Online delivery instructions. **IDeAS**: View holdings/statements. **DPM Plus**: Enhanced DP operations (incl. online account closure). |
| **DDPI** | Primarily offline at many DPs (physical form couriered). Some support online via Aadhaar eSign. Processing: 2-3 business days. |
| **Activation SLA** | Most processing within 15 working days including verification. PAN flag must be enabled in DPM after verification. |

### CDSL vs NSDL &mdash; Key Differences

| Aspect | CDSL | NSDL |
|---|---|---|
| BO ID Format | 16 digits (numeric) | "IN" + 14 chars (alphanumeric) |
| Core System | DP Module / CDAS | DPM (Depository Participant Module) |
| Online Transfers | EASIEST | SPEED-e |
| View-only Portal | easi | IDeAS |
| File Format | Fixed-length positional (line-based 01-07+) | ISO-tagged UDiFF (standardized since Mar 2024) |
| Promoter | BSE | NSE |
| Market Share | ~11.27 crore accounts (more retail) | ~3.54 crore accounts (higher value) |
| API Availability | BO Setup/Modify API, eDIS API, Transaction API | DPM Plus, SPEED-e APIs, Insta Interface |
| DDPI Activation | Online (Aadhaar eSign), 24 hours | Often offline (physical form), 2-3 days |

### Common Rejection Reasons (Both Depositories)

| # | Rejection Reason | Fix |
|---|---|---|
| 1 | Multiple email addresses in email field | Single email only (CDSL rejects entire record) |
| 2 | PAN not verified / invalid | Verify PAN against ITD before submission |
| 3 | PAN-Aadhaar not linked | Client must link at incometax.gov.in |
| 4 | Name mismatch between Aadhaar, PAN, and form | Normalize names across all sources |
| 5 | DOB inconsistency across databases | Use PAN DOB as master |
| 6 | Missing mandatory file lines (01, 02, 05, 07) | Ensure all mandatory lines present |
| 7 | Incomplete 6 KYC attributes | All 6 must be populated before submission |
| 8 | Missing nomination or opt-out declaration | Mandatory since Mar 1, 2025 |
| 9 | Duplicate PAN with same status at same DP | Verify no existing account before creation |
| 10 | Missing guardian details when disability flag = Y | Validate conditional fields |

</section>

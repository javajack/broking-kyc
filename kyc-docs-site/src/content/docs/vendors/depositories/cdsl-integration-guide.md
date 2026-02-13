---
title: CDSL Integration Guide
description: UAT/production environments, request tracking, sequence numbers, security architecture, encryption, IP whitelisting, and SEBI circulars reference.
---

Before a single real client account can be opened in CDSL (Central Depository Services Limited), your system must pass through a multi-phase certification process that includes UAT (User Acceptance Testing) environment setup, test case execution against CDSL-defined scenarios, and a formal sign-off. After that, production onboarding involves leased line connectivity, IP whitelisting, DSC (Digital Signature Certificate) mapping, and strict security protocols. This page is the practical engineering guide to that journey — from requesting your first test credentials to processing your first live transaction. Whether you are integrating with CDSL for the first time or troubleshooting a production issue with file uploads and sequence numbers, this is where you will find the answers.

> Back to [CDSL Overview](/broking-kyc/vendors/depositories/cdsl/)

---

The first decision you will face is which environment to work in. CDSL provides three tiers — an Innovation Sandbox for prototyping, a DP (Depository Participant) UAT environment for real integration testing, and the production environment for live operations. Understanding the differences between these environments will save you from common mistakes like using test credentials in production or expecting real settlement behavior in UAT.

## 1. UAT / Test Environment vs Production

### 1.1 Environment Endpoints

| Aspect | UAT / Test | Production |
|--------|-----------|------------|
| **WebCDAS URL** | `test1.cdslindia.com` | `cdslweb.cdslindia.com` and `cdslapp.cdslindia.com` |
| **Mock Environment** | `mock.cdslindia.com` (MOCKCDAS for RTA/DP testing) | N/A |
| **API Services** | Test API server (credentials from dprtasupport@cdslindia.com) | `api.cdslindia.com/APIServices` |
| **eDIS Portal** | Sandbox eDIS (on request) | `edis.cdslindia.com` |
| **TPIN Generation** | Test TPIN generation | `edis.cdslindia.com/Home/GeneratePin` |
| **easi/EASIEST** | Test instance | `web.cdslindia.com/myeasitoken/Home/Login` |
| **CVL KRA Verification** | Test URL | `validate.cvlindia.com/CVLKRAVerification_V1/` |
| **Issuer Portal** | Test instance | `issuercentre.cdslindia.com/Home/Login` |

:::tip[Bookmark these URLs early]
During integration, you will switch between these endpoints dozens of times a day. Bookmark all UAT URLs separately from production ones, and use environment variables in your codebase to manage the switch. A common production incident is accidentally pointing to the test API server — or worse, the reverse.
:::

### 1.2 Test vs Production Environment Differences

| Aspect | UAT / Test | Production |
|--------|-----------|------------|
| **DP ID** | Test DP ID assigned by CDSL (unique per testing entity) | Real DP ID (8 digits, assigned at registration) |
| **Client IDs** | Test Client IDs (no real securities) | Real Client IDs auto-assigned by CDAS (Central Depository Accounting System) |
| **API Key** | Separate test API key (may have shorter validity) | Production API key (longer validity, strict rotation) |
| **eDIS API Key** | Test eDIS (Electronic Delivery Instruction Slip) key (separate from production) | Production eDIS API key |
| **Data** | Synthetic data; no real securities or settlements | Live market data, real ISINs (International Securities Identification Numbers), real settlements |
| **DSC** | Test DSC certificates (relaxed requirements) | Production DSC from Registered Authority of TCS (mandatory) |
| **Connectivity** | Internet access sufficient; no leased line needed | Leased line / MPLS (Multiprotocol Label Switching) / Internet with IP whitelisting |
| **IP Whitelisting** | May be relaxed; dynamic IPs may be allowed | Static IPs mandatory; registered with CDSL |
| **SSL/TLS** | TLS 1.2 (same as production) | TLS 1.2 or higher (mandatory) |
| **TransDtls Encryption** | Same encryption algorithm as production | Same encryption, production keys |
| **Settlement** | No real settlement; simulated settlement cycle | T+1 live settlement |
| **Audit Logging** | Minimal / test-only | Full audit trail per SEBI (Securities and Exchange Board of India) requirements |
| **Go-Live** | Self-service testing | Requires CDSL UAT sign-off certification |

In plain English: the UAT environment mirrors production in its API structure and file formats, but uses synthetic data and relaxed security. Think of it as a flight simulator — the controls are identical to a real cockpit, but crashing has no consequences. Production is the real flight.

### 1.3 UAT Certification Process

```
Phase 1: Registration & Setup (1-2 weeks)
   ├─ Submit request to dprtasupport@cdslindia.com
   ├─ Specify: APIs needed, connectivity mode, test scope
   ├─ CDSL assigns Test DP ID
   ├─ CDSL generates Test API Key
   ├─ CDSL provides Test WebCDAS credentials
   └─ MOCKCDAS access granted for file format testing

Phase 2: Integration Development (2-4 weeks)
   ├─ BO Setup file generation and upload testing
   ├─ API call testing (BO Setup, eDIS, Transaction Upload)
   ├─ File format validation (fixed-length positional for BO, XML-tag for transactions)
   ├─ Error handling and rejection scenario testing
   └─ Download report parsing (DP57, DPM3, DPM4)

Phase 3: Test Case Execution (1-2 weeks, CDSL-defined test cases)
   ├─ BO account opening (all account categories: IND, HUF, BDC, TRU)
   ├─ BO modification (name, address, bank, contact, KYC attributes)
   ├─ Nomination (add, modify, opt-out with video verification flag)
   ├─ eDIS flow (TPIN generation → VerifyDIS → OTP → callback)
   ├─ DDPI submission (online eSign + offline physical)
   ├─ Transaction uploads (pledge, IDT, off-market, freeze/unfreeze)
   ├─ File download parsing (DP57, DPM3, DPM4, Client Master)
   └─ Error scenarios (duplicate PAN, missing fields, invalid codes)

Phase 4: UAT Sign-Off (1 week)
   ├─ CDSL reviews test execution results
   ├─ Issues UAT completion certificate
   └─ Any issues must be resolved before production onboarding

Phase 5: Production Onboarding (1-2 weeks)
   ├─ Production DP ID + API key provisioned
   ├─ Client ID range pre-allocation requested (for BO ID on eSigned forms)
   ├─ IP whitelisting configured for production servers
   ├─ DSC mapping completed for all authorized signatories
   ├─ Leased line / MPLS / Internet connectivity certified
   ├─ Production security configuration verified
   └─ Go-Live approval issued by CDSL
```

:::caution
The entire UAT-to-production journey typically takes 6-10 weeks. Do not underestimate Phase 3 — CDSL provides a specific list of test cases, and every one must pass. The most common delays are in error scenario testing (Phase 3) and DSC mapping (Phase 5). Start the DSC procurement process in Phase 1, because getting hardware USB tokens takes 7-10 working days from the certifying authority.
:::

:::tip[Pre-Allocated BO IDs]
During Phase 5, request a **Client ID range pre-allocation** from CDSL. This allows you to assign BO (Beneficiary Owner) IDs before eSign, so the account opening form displays the demat account number when the client signs it. See [CDSL Overview — Section 5.4](/broking-kyc/vendors/depositories/cdsl/#54-pre-allocated-client-id-bo-id-range-reservation) for the full mechanism, implementation requirements, and eSign workflow.
:::

### 1.4 CDSL Innovation Sandbox (Extended)

| Aspect | Details |
|--------|---------|
| **Governance** | SEBI Innovation Sandbox Committee |
| **Eligibility** | Fintech startups, registered intermediaries, educational institutions, individual innovators |
| **Application** | Via SEBI Innovation Sandbox portal |
| **Cost** | Free for approved applicants |
| **Duration** | Defined testing window per approval |
| **Test Data** | Synthetic account statements, holding data, transaction data |
| **File Formats Provided** | Unformatted account statements, BO upload/download specifications, sample files |
| **Guidelines** | Operating Guidelines v3 (final) on CDSL website |

The Innovation Sandbox is useful if you want to explore CDSL integration before committing to a full DP registration. However, it provides limited API access (data access only) and static test data. For actual integration development, you need the DP UAT environment.

**Sandbox vs DP UAT vs Production**:

| Aspect | Innovation Sandbox | DP UAT | Production |
|--------|-------------------|--------|------------|
| **Access** | Open application via SEBI portal | Registered DP only | Live registered DP |
| **Data** | Sample/static test data | Dynamic test data, simulated flows | Live production data |
| **Credentials** | Sandbox-specific | Test API key from CDSL | Production API key |
| **APIs** | Limited (data access only) | Full API suite for testing | Full API suite |
| **File Formats** | Sample specifications and files | Full upload/download testing | Production file processing |
| **Use Case** | Prototyping, learning, hackathons | Integration development and certification | Live DP operations |
| **Contact** | innovation-sandbox.in | dprtasupport@cdslindia.com | helpdesk@cdslindia.com |

---

Every file you upload to CDSL and every API call you make needs a tracking mechanism. CDSL uses a system of sequence numbers and reference IDs that serve as the backbone for idempotency, deduplication, and audit trails. Getting sequence number management wrong is one of the most common causes of production file rejections. This section covers the tracking architecture in detail.

## 2. Request Tracking & Sequence Numbers

### 2.1 Unique Sequence Number Field

| Aspect | Details |
|--------|---------|
| **Field Name** | Unique Sequence Number |
| **Present In** | BO setup upload, BO modify upload, and transaction uploads |
| **Mandatory Since** | October 30, 2015 (initially optional; uniqueness checked if populated) |
| **Uniqueness Scope** | Per DP ID — each DP maintains its own sequence space |
| **Validation** | CDSL checks uniqueness across all records ever submitted by the DP |
| **Purpose** | Prevent duplicate submissions; enable idempotent retries |
| **Format** | Numeric; DP-defined; must be unique across all submissions (no reuse) |

In plain English: the Unique Sequence Number is like a receipt number at a bank counter — every transaction you submit gets a unique number, and if you accidentally submit the same number twice, CDSL rejects the duplicate. This prevents double account openings, double pledges, and other costly duplication errors.

### 2.2 Request Reference Number Types

| Reference Type | Format | Source | Description |
|----------------|--------|--------|-------------|
| **Unique Sequence Number** | Numeric (DP-defined) | DP generates | Master tracking ID for each record in upload files |
| **eDIS ReqId** | 15-digit numeric (e.g., `291951000000401`) | DP generates | Unique request ID for eDIS VerifyDIS API calls |
| **File Request ID** | Auto-generated by CDAS | CDSL assigns | Assigned when file upload is accepted by CDAS |
| **Transaction Reference** | Auto-generated by CDAS | CDSL assigns | Unique reference for each transaction in CDAS |
| **DRN (Demat Request Number)** | 10-digit numeric | CDSL assigns | Dematerialization/Rematerialization request number |
| **BO Setup Reference** | DP-generated | DP generates | Internal reference for BO account opening request |
| **Settlement ID** | Exchange-assigned | Exchange | Settlement number for on-market transactions |
| **CM ID** | 8-digit | Clearing Corp | Clearing Member identifier for settlement matching |

:::note[You generate some, CDSL generates others]
Notice the "Source" column carefully. Some reference numbers (Unique Sequence Number, eDIS ReqId, BO Setup Reference) are generated by your system — you control the format and must ensure uniqueness. Others (File Request ID, Transaction Reference, DRN) are assigned by CDSL after processing — you must capture and store these from CDSL's response for downstream tracking.
:::

### 2.3 Sequence Number Best Practices

| Aspect | Recommendation |
|--------|----------------|
| **Format** | `YYYYMMDD` + 6-digit zero-padded counter (e.g., `20260213000001`) |
| **Reset** | No automatic reset by CDSL; DP must ensure global uniqueness |
| **Counter Strategy** | Monotonically increasing; never reuse even after rejection |
| **Collision Handling** | Duplicate sequence number = record/file rejected by CDSL |
| **Retry Logic** | On rejection, generate NEW sequence number and resubmit (never reuse) |
| **Storage** | Persist sequence counter in database with transaction-safe increment |
| **Multi-Instance** | If multiple application instances, use partitioned ranges or centralized counter |
| **Disaster Recovery** | DR system must have access to same sequence counter or separate range |

:::caution
The most dangerous bug in sequence number management is reusing a number after a rejection. When CDSL rejects a file, the sequence numbers in that file are "burned" — they can never be used again, even though the records were not processed. Always generate a fresh sequence number for retries. If your counter is in-memory only (not persisted to a database), a server restart could cause sequence reuse and silent rejections.
:::

### 2.4 File Naming Conventions

**DP57 Report (Common Download)**:
```
Format: COD_EXP_<DPID>_<FILE_REQ_ID>_<I/F>_YYYYMMDDHHMM_<SeqNo>.csv

Components:
  COD          = Common Online Download
  EXP          = Export
  DPID         = 8-digit Depository Participant ID
  FILE_REQ_ID  = File request identifier assigned by CDSL
  I/F          = I (Incremental during day) or F (Full end-of-day)
  YYYYMMDDHHMM = Timestamp of report generation
  SeqNo        = Sequential number (for multiple files in same period)

Example: COD_EXP_12049200_78542_I_202602131430_001.csv
```

**DPM3 Holdings Report (Statement of Holdings)**:
```
Format: SOH_EXP_<DPID>_<ReqID>_<I/F>_YYYYMMDDHHMM_<Seq>.csv

Components:
  SOH          = Statement of Holdings
  EXP          = Export
  DPID         = 8-digit DP ID
  ReqID        = Request identifier from CDSL
  I/F          = I (Incremental) or F (Full)
  YYYYMMDDHHMM = Generation timestamp
  Seq          = Sequence number

Example: SOH_EXP_12049200_45321_F_202602130600_001.csv
```

**DP97 Report**:
```
Associated with COD (Cash on Demand) exports; generated alongside DP57 reports.
```

### 2.5 File Upload Acknowledgment & Status Polling Flow

Understanding the upload-poll-download cycle is essential because CDSL processes files asynchronously. You upload a file, receive an immediate acknowledgment, and then must poll for the processing result. This is not a synchronous request-response pattern.

```
┌─────────────┐     ┌──────────────────┐
│  DP System   │     │   CDSL CDAS       │
└──────┬──────┘     └────────┬─────────┘
       │                     │
       │ 1. Upload File      │
       │ (BO Setup / Txn /   │
       │  Common Upload)     │
       │ ─────────────────────►
       │                     │
       │ 2. Immediate ACK    │
       │ (HTTP 200 + File    │
       │  Request ID)        │
       │ ◄─────────────────────
       │                     │
       │     [CDSL Processes] │
       │     - Validates each │
       │       record         │
       │     - Applies biz    │
       │       rules          │
       │     - Checks unique  │
       │       sequence nos.  │
       │                     │
       │ 3. Poll Status      │
       │ (File Request ID)   │
       │ ─────────────────────►
       │                     │
       │ 4. Status Response  │
       │ ◄─────────────────────
       │                     │
       │  Possible statuses: │
       │  - Processing       │
       │  - Accepted          │
       │  - Partially Accepted│
       │  - Rejected          │
       │                     │
       │ 5. Download Detail  │
       │ (record-level       │
       │  success/reject     │
       │  with error codes)  │
       │ ─────────────────────►
       │                     │
       │ 6. Result File      │
       │ (per record: status │
       │  + error code +     │
       │  assigned BO ID for │
       │  successful setups) │
       │ ◄─────────────────────
       └──────────────────────┘
```

:::tip[Design your polling with exponential backoff]
CDSL does not push results to you — you must poll. A common mistake is polling too aggressively (e.g., every second), which can get your IP rate-limited, or too lazily (e.g., every hour), which delays client account activation. Start polling at 30-second intervals and use exponential backoff up to 5 minutes. For BO Setup files, expect processing to take 1-2 hours during business hours and longer for batch files submitted near end-of-day.
:::

### 2.6 Upload Processing Modes

| Mode | Behavior | Use Case |
|------|----------|----------|
| **File Level Upload** | Entire file processed if ALL records valid; entire file rejected if ANY record fails | Critical batch where all-or-nothing is needed |
| **Record Level Upload** | Successful records processed; error records rejected individually | Routine batch processing; partial success acceptable |

In plain English: with File Level Upload, a single bad record in a 1,000-record file causes all 1,000 records to be rejected. With Record Level Upload, the 999 good records go through and only the bad one is rejected. For day-to-day operations, Record Level Upload is almost always the right choice.

### 2.7 Date of Receipt Tracking (SEBI Mandate)

Per SEBI directive, CDSL mandates that DPs capture the date of receipt of request from BO for all transaction types. This field is present in:
- Online CDAS entry screens
- File upload formats (both BO setup and transaction uploads)
- API request payloads

Purpose: Audit trail for SLA compliance. CDSL uses this to monitor DP adherence to processing timelines (e.g., 2-day closure SLA, same-day off-market processing).

### 2.8 DP57 Report Generation Schedule

| Time | Report Type | Content |
|------|------------|---------|
| **Intra-day (multiple)** | Incremental (I) | Transactions processed since last incremental |
| **End of Day** | Full (F) | All transactions for the entire business day |
| **On-demand** | Full or Incremental | DP can request specific time window |

The DP57 single download was activated for all DPs with effect from January 18, 2011, replacing the need for separate module-specific downloads.

---

Security is not an afterthought in CDSL integration — it is a multi-layered architecture that spans network isolation, transport encryption, application authentication, transaction authorization, and data-level encryption. As an engineer, you will interact with most of these layers during integration. The security architecture below is not just a reference diagram — each layer maps to specific configuration steps you will need to complete.

## 3. Security & Encryption

### 3.1 Multi-Layered Security Architecture

```
┌──────────────────────────────────────────────────────────────────────┐
│                     CDSL Security Architecture                       │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  Layer 1: Network Security                                           │
│  ├─ Leased Line / MPLS VPN (dedicated, physically isolated)         │
│  ├─ IP Whitelisting (static IPs registered per DP)                   │
│  ├─ Firewall rules at CDSL data center (both primary + DR)          │
│  ├─ VPN tunnel with IPSec (for internet-based connectivity)          │
│  └─ VSAT encryption (satellite connectivity, for remote locations)   │
│                                                                      │
│  Layer 2: Transport Security                                         │
│  ├─ TLS 1.2+ for ALL HTTPS API communication                        │
│  ├─ SSL certificates for WebCDAS access                              │
│  ├─ Encrypted SFTP for batch file transfers (where applicable)       │
│  └─ SSL 2.0/3.0 + TLS 1.0 supported for legacy CDAS modules        │
│                                                                      │
│  Layer 3: Application Authentication                                 │
│  ├─ API Key (unique per DP, generated during registration)           │
│  ├─ Login ID + Password for CDAS web application                     │
│  ├─ Two-Factor Authentication (2FA) for DP module access             │
│  ├─ Session management with configurable timeout                     │
│  └─ Role-based access control within DP module                       │
│                                                                      │
│  Layer 4: Transaction Authorization                                  │
│  ├─ Digital Signature Certificate (DSC) via hardware e-Token         │
│  │   ├─ Required for: on-market, off-market, IDT transactions        │
│  │   ├─ Provider: Registered Authority of TCS (or Sify Safescrypt)   │
│  │   ├─ Class 3 certificate (individual + organizational)            │
│  │   └─ Hardware USB token (not software-based)                      │
│  ├─ TPIN (6-digit, CDSL-generated, BO-only, DP has NO access)       │
│  └─ OTP (CDSL sends directly to BO registered mobile)               │
│                                                                      │
│  Layer 5: Data-Level Security                                        │
│  ├─ eDIS TransDtls payload encryption (CDSL-provided algorithm/key)  │
│  ├─ Data at rest encryption per CDSL IT security policy              │
│  ├─ Complete audit trail (per SEBI mandate)                          │
│  └─ ISO 27001 + ISO 22301 certified infrastructure                  │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

In plain English: Layer 1 controls who can talk to CDSL's network. Layer 2 encrypts the conversation. Layer 3 verifies who you are. Layer 4 authorizes specific high-value actions (like moving securities). Layer 5 protects the data itself, even at rest. As an integrating DP, you will configure Layers 1-4 during onboarding. Layer 5 is managed by CDSL.

### 3.2 Digital Signature Certificate (DSC) — Comprehensive

| Aspect | Details |
|--------|---------|
| **Primary CA** | Sify Safescrypt (CDSL-approved Certifying Authority) |
| **Other CAs** | eMudhra, nCode, (s)TRUST (Capricorn) — BOs can use DSC from any RA |
| **DSC Class** | Class 3 Digital Signature Certificate |
| **Token Type** | Hardware USB e-Token (software certificates NOT accepted) |
| **Issuance Time** | 7-10 working days from application |
| **Validity Period** | Typically 2-3 years; must be renewed before expiry |
| **Required For** | All on-market, off-market, early pay-in, and inter-depository transactions |
| **Mapping** | Each authorized signatory's DSC must be mapped to their CDAS user profile |
| **Self-Authorization** | NOT allowed — DSC signatory must differ from DP authorized signatory |
| **BO DSC for EASIEST** | BO submits filled Annexure + DSC screenshot to DP; DP verifies and sends to CDSL |
| **No BO Charge** | CDSL does not charge for mapping DSC from other RAs to BO's EASIEST login |
| **Renewal** | Must renew before expiry; expired DSC blocks transaction authorization |

:::caution
DSC expiry is a silent production killer. When your DSC expires, all transaction authorizations fail, but the error message from CDSL may not clearly indicate "DSC expired." Set up calendar reminders 60 days, 30 days, and 7 days before expiry. Better yet, build an automated check in your operations dashboard that flags DSC certificates approaching expiry.
:::

### 3.3 DSC Mapping Checklist (from CDSL Official Checklist)

| # | Checklist Item | Required |
|---|---------------|----------|
| 1 | DSC Authorized Signatory name DIFFERENT from DP Authorized Signatory | Mandatory |
| 2 | Clear and visible snapshot of DSC details provided | Mandatory |
| 3 | Duly filled and signed Annexure (individual BO/CBO/CM form) | Mandatory |
| 4 | Print screen of Digital Signature Certificate details attached | Mandatory |
| 5 | DP verification stamp and signature on the form | Mandatory |
| 6 | Form submitted to CDSL for DSC-to-user mapping | Mandatory |

### 3.4 eDIS Encryption Details

| Aspect | Details |
|--------|---------|
| **Encrypted Field** | `TransDtls` parameter in VerifyDIS API call |
| **Content** | ISIN, quantity, exchange (NSE/BSE/MCX), segment (CM/FO/CD/COM), bulk flag |
| **Encryption** | DP encrypts using CDSL-provided encryption key and algorithm |
| **Key Provisioning** | Encryption parameters provided in API documentation during DP registration |
| **Key Rotation** | CDSL may rotate encryption keys; DP must implement key update mechanism |
| **Decryption** | CDSL decrypts server-side on eDIS portal |
| **TPIN Entry** | ALWAYS on CDSL's eDIS webpage — never on DP portal (prevents DP from capturing TPIN) |
| **OTP Delivery** | CDSL sends directly to BO's registered mobile (DP has zero access) |

:::note[Why TPIN never touches your system]
CDSL deliberately designed the eDIS flow so that the client's TPIN (Transaction PIN) is entered only on CDSL's own webpage. Your system redirects the client to CDSL's eDIS portal, but you never see or handle the TPIN. This is a security design principle — it prevents brokers from capturing client TPIN credentials. Similarly, the OTP goes directly from CDSL to the client's mobile. Your system only receives the final authorization callback (success or failure).
:::

### 3.5 WebCDAS Browser Security Configuration

From CDSL's RELID/WebCDAS Installation Guide:

| Setting | Configuration |
|---------|--------------|
| **Browser** | Internet Explorer / Edge (ActiveX compatibility); Chrome for WebCDAS |
| **Trusted Sites** | Add `http://cdslweb.cdslindia.com` and `http://cdslapp.cdslindia.com` |
| **SSL Settings** | Enable SSL 2.0, SSL 3.0, TLS 1.0 in Tools > Internet Options > Advanced > Security |
| **ActiveX Controls** | Enable for CDAS DP Module (signed ActiveX required) |
| **Pop-Up Blocker** | Disable for CDSL domains |
| **Java Runtime** | May be required for older CDAS modules |
| **Security Zone** | CDSL URLs in Trusted Sites zone with Medium security level |
| **Cookies** | Must be enabled for CDSL domains |

:::note[Migration Note]
CDSL has been progressively migrating to WebCDAS (browser-based) and REST APIs to reduce dependency on thick-client DP Module and ActiveX. Newer APIs (BO Setup, Transaction Upload, eDIS) are REST-based and browser-agnostic.
:::

### 3.6 IP Whitelisting Requirements

| Aspect | Details |
|--------|---------|
| **Requirement** | All DP servers calling CDSL APIs must have their IP addresses registered |
| **IP Type** | Static IPs only (dynamic IPs NOT permitted for production) |
| **Scope** | Primary data center + DR site IPs |
| **Multiple IPs** | Supported — DP can register multiple IPs |
| **VPN (Virtual Private Network) Egress** | If DP connects via VPN, the VPN exit (egress) IP must be whitelisted |
| **Change Process** | Written request to CDSL operations team; 2-3 working days to update |
| **UAT Relaxation** | Dynamic IPs may be allowed for test/UAT environment |
| **Verification** | CDSL may periodically verify that registered IPs are still in use |

:::tip[Plan for IP changes before they happen]
IP whitelisting changes take 2-3 working days — there is no emergency fast-track. If you are migrating data centers or changing cloud providers, submit the new IP whitelisting request weeks in advance. Running production traffic from a non-whitelisted IP will result in immediate connection refusals with no clear error message at the application layer.
:::

### 3.7 Connectivity Security Comparison

| Mode | Encryption | Authentication | Security Level | Monthly Cost | Best For |
|------|-----------|----------------|----------------|-------------|----------|
| **Local Leased Line** | Physical isolation (inherently secure) | N/A (dedicated circuit) | Highest | Rs. 8K-15K/month | Large DPs with high volume |
| **MPLS VPN** | Provider-managed label switching | Provider credentials + SLA | High | Rs. 4K-8K/month | Multi-branch DPs |
| **Site-to-Site VPN (IPSec)** | IPSec tunnel encryption | Certificate + pre-shared key | High | Rs. 2K-4K/month | Cost-effective secure connectivity |
| **Internet (HTTPS Direct)** | TLS 1.2+ for API calls | API Key + IP whitelisting | Moderate | Existing internet cost | API-only integration, small DPs |
| **VSAT** | Satellite encryption | VSAT credentials | Moderate | Rs. 10K-20K/month | Remote/rural locations |

In plain English: if you are a large broker with high transaction volumes, a leased line gives you the most reliable and secure connection. If you are a smaller DP or building a cloud-native integration, HTTPS Direct with IP whitelisting is the most practical starting point. Most new DPs start with HTTPS Direct and upgrade to MPLS or leased line as their volume grows.

### 3.8 CDSL Data Center Security

| Aspect | Details |
|--------|---------|
| **Certifications** | ISO 27001 (InfoSec), ISO 22301 (Business Continuity), BS 7799 |
| **Primary Site** | Mumbai-based data center |
| **DR Site** | Geographically separated Disaster Recovery site |
| **RPO** | Near-zero Recovery Point Objective (synchronous replication) |
| **RTO** | Recovery Time Objective within regulatory requirements |
| **Audit** | Regular SEBI inspections + internal audits |
| **Penetration Testing** | Periodic external penetration testing |

---

The final section of this guide is a comprehensive reference of all SEBI circulars and CDSL communiques relevant to DDPI (Demat Debit and Pledge Instruction), margin pledge, nomination, and BO modifications. Bookmark this section — you will refer to it frequently when tracing a regulatory requirement back to its source circular, or when compliance asks "which circular requires this?"

## 4. SEBI Circulars Reference

### 4.1 DDPI Circulars

| Circular Number | Date | Subject |
|-----------------|------|---------|
| SEBI/HO/MIRSD/DoP/P/CIR/2022/44 | Apr 4, 2022 | DDPI for settlement + pledge (original) |
| SEBI/HO/MIRSD/DoP/P/CIR/2022/119 | Jun 2022 | Implementation timeline extension |
| SEBI/HO/MIRSD-PoD-1/P/CIR/2022/137 | Oct 6, 2022 | DDPI scope expanded: MF + open offer |
| SEBI/HO/MIRSD/DoP/P/CIR/2022/153 | Nov 2022 | Further implementation extension |

### 4.2 Margin Pledge Circulars

| Circular Number | Date | Subject |
|-----------------|------|---------|
| SEBI/HO/MIRSD/DOP/CIR/P/2020/28 | Feb 25, 2020 | Margin pledge/re-pledge in depository system |
| SEBI/HO/MIRSD/DOP/CIR/P/2020/88 | Jun 1, 2020 | Extension to Aug 1, 2020 |
| SEBI/HO/MIRSD/DOP/CIR/P/2020/144 | Sep 22, 2020 | MTF securities as maintenance margin |
| SEBI/HO/MIRSD/MIRSD-PoD/P/CIR/2025/82 | Jun 3, 2025 | Automated pledge release + invocation |

### 4.3 Nomination Circulars

| Circular Number | Date | Subject |
|-----------------|------|---------|
| SEBI/HO/MIRSD/MIRSD-PoD-1/P/CIR/2025/3 | Jan 10, 2025 | Revise and Revamp Nomination Facilities |
| SEBI Feb 28, 2025 | Feb 28, 2025 | Clarifications to nomination circular |
| SEBI Jul 2025 | Jul 2025 | Extended Phase II & III implementation |

### 4.4 CDSL Communiques for DDPI/Pledge/Modifications

| Communique | Date | Subject |
|------------|------|---------|
| DP-115 | Ongoing | SEBI Circular on Margin Obligations |
| DP-234 | May 22, 2020 | Operational modalities for margin pledge/re-pledge |
| DP-304 | Jul 2021 | Mandatory updation of certain KYC attributes |
| DP-332 | Jun 14, 2022 | DDPI implementation |
| DP-408 | Aug 3, 2018 | Changes in BO Account Information |
| DP-412 | Aug 2020 | Margin Pledge/Re-Pledge implementation |
| DP-5565 | Ongoing | BO Setup/Modify changes for CM/POA (Power of Attorney)/DDPI holder |
| CDSL/OPS/DP/POLCY/2024/314 | Jun 7, 2024 | Pledge file format: rejection reason code |
| CDSL/OPS/DP/POLCY/2024/657 | Oct 30, 2024 | PAN modification at DP end |

:::tip[Keep a circular tracker]
SEBI and CDSL issue circulars and communiques throughout the year, and they often amend or supersede earlier ones. Maintain an internal tracker (a simple spreadsheet works) that maps each circular to the feature or validation rule it affects in your system. When a new circular arrives, check your tracker to see what needs updating. This practice will save your compliance team significant effort during SEBI inspections.
:::

---

## Related Pages

- [CDSL Overview](/broking-kyc/vendors/depositories/cdsl/) — Core BO integration spec
- [DDPI Deep Dive](/broking-kyc/vendors/depositories/cdsl-ddpi/) — DDPI lifecycle and authorization types
- [MTF & Pledge Deep Dive](/broking-kyc/vendors/depositories/cdsl-mtf-pledge/) — Pledge operations and file formats
- [BO Modifications](/broking-kyc/vendors/depositories/cdsl-modifications/) — Address, bank, nominee, PAN changes

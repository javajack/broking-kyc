# Leegality - Vendor Integration Specification

**Version**: 1.0
**Date**: 2026-02-13
**Parent**: [VENDOR_INTEGRATIONS.md](../../VENDOR_INTEGRATIONS.md) (V6: e-Sign)
**Our Use**: Aadhaar OTP e-Sign on KYC documents, Account Opening forms, DDPI agreements, Nomination forms
**KYC Flow Screen**: Screen 9 (Review + Face Match + e-Sign) per [kyc-flow.md](../../kyc-flow.md)

---

## Table of Contents

- [1. Overview](#1-overview)
- [2. eSign Types](#2-esign-types)
- [3. SEBI eSign Requirements](#3-sebi-esign-requirements)
- [4. API Integration](#4-api-integration)
- [5. Document Types for Broking](#5-document-types-for-broking)
- [6. Signing Ceremony Flow](#6-signing-ceremony-flow)
- [7. Template Management](#7-template-management)
- [8. Stamp Duty (e-Stamp via BharatStamp)](#8-stamp-duty-e-stamp-via-bharatstamp)
- [9. Non-Individual Entities](#9-non-individual-entities)
- [10. Webhook & Callback](#10-webhook--callback)
- [11. Document Storage & Retrieval](#11-document-storage--retrieval)
- [12. Integration with Our KYC Flow](#12-integration-with-our-kyc-flow)
- [13. Pricing](#13-pricing)
- [14. Edge Cases](#14-edge-cases)
- [15. Alternatives Comparison](#15-alternatives-comparison)
- [16. Security & Compliance](#16-security--compliance)
- [17. Recent Regulatory Changes](#17-recent-regulatory-changes)
- [18. Integration Checklist](#18-integration-checklist)
- [Appendix A: Error Codes](#appendix-a-error-codes)
- [Appendix B: Glossary](#appendix-b-glossary)
- [Appendix C: Data Mapping to Master Dataset](#appendix-c-data-mapping-to-master-dataset)

---

## 1. Overview

### 1.1 What is Leegality

Leegality is an Indian document infrastructure platform providing e-Sign, e-Stamp, document automation, and digital contracting services. The platform is operated by Grey Swift Private Limited (CIN: U74999HR2016PTC066380), headquartered in Gurugram, Haryana.

**Founded**: 2016
**Founders**: Sapan Parekh, Shivam Singla, Prakhar Agrawal
**Funding**: $6.63M across 3 rounds (latest: $5M Series A, October 2022)
**Scale**: 55M+ eSigns processed, 33M+ documents, 5.2M+ stamps digitized (as of 2025)
**Clients**: 1,500+ Indian businesses across BFSI, lending, insurance, real estate

### 1.2 Product Suite

| Product | Description |
|---------|-------------|
| **Aadhaar eSign** | OTP-based and biometric electronic signatures via CCA-compliant ESPs |
| **DSC Token Signing** | Digital Signature Certificate-based signing using hardware tokens |
| **Virtual Sign** | Non-Aadhaar electronic acknowledgement via OTP + signature pad |
| **QuickSign** | OTP-less digital acknowledgement for non-critical documents |
| **Fingerprint eSign** | Biometric signing via fingerprint capture devices |
| **Doc Signer** | Organizational Document Signer Certificate for automated broker-side signing |
| **BharatStamp** | Digital stamp paper procurement across 25+ Indian states |
| **Document Assembly** | Template engine with dynamic field injection and conditional sections |
| **Consentin** | DPDP (Digital Personal Data Protection) Act compliance platform |
| **Verifier API** | Post-signing verification for tampering detection and certificate validation |

### 1.3 Why Leegality for Stock Broker KYC

| Concern | Leegality's Value |
|---------|-------------------|
| Stock broker-specific use case | Dedicated use case page; supports KYC, DDPI, demat opening, sub-broker agreements |
| Single OTP ceremony | Customer signs all documents (KYC + AOF + DDPI + RDD) with one Aadhaar OTP in a 4-touch process |
| ESP redundancy | Dual Aadhaar eSign connections -- NSDL (primary) and eMudhra (backup); auto-switch on downtime |
| 80% less downtime | Auto-Switch to best ESP, fallbacks for OTP and biometrics, Non-Aadhaar Routing |
| e-Stamp integration | Built-in BharatStamp for DDPI stamp duty (DDPI requires stamping per SEBI circular) |
| Pay-per-success | Charges only for successful eSigns; failed eSign = zero cost |
| Fraud prevention | Face Match, Geofencing, Smart Liveliness, Verifier API built into signing flow |
| API 3.0 (Smart API) | Workflow-based API; configure once in dashboard, pass Workflow ID in API; no code changes for config updates |
| WhatsApp Pings | Send signing links, reminders, and signed PDFs via WhatsApp (high open rates vs SMS/email) |
| SEBI compliance | Explicit support for SEBI DDPI digitization, Section 65B audit trail |
| Zero license fee | Basic plan includes Aadhaar eSign, Digital Stamping, and API Access at zero license fee |

### 1.4 Key BFSI References

Leegality serves stock brokers, banks, NBFCs, insurance companies, and fintechs. IIFL Finance is a publicly known enterprise client (engaged Consentin for DPDP compliance, Sep 2025). Specific broker client names should be confirmed during vendor evaluation.

### 1.5 Documentation & Portals

| Resource | URL |
|----------|-----|
| Main Website | https://www.leegality.com |
| Stock Broker Use Case | https://www.leegality.com/stock-brokers |
| API Documentation | https://docs.leegality.com |
| API 3.0 JSON Schema | https://github.com/prakharmittal/leegality-apidocs/blob/master/api_3_0.json |
| Knowledge Base | https://knowledge.leegality.com |
| Support Portal | https://support.leegality.com |
| Digital Stamping | https://www.leegality.com/digital-stamping |
| Legal Primer | https://www.leegality.com/legalprimer |
| DDPI FAQs | https://www.leegality.com/blog/sebi-ddpi |
| Verifier Tool | https://verifier.leegality.com |

---

## 2. eSign Types

### 2.1 Signature Type Comparison

| Feature | Aadhaar eSign (OTP) | Aadhaar eSign (Biometric) | DSC Token | Virtual Sign | QuickSign | Fingerprint eSign |
|---------|---------------------|---------------------------|-----------|--------------|-----------|-------------------|
| **Legal basis** | IT Act 2000, Schedule II | IT Act 2000, Schedule II | IT Act 2000, Section 3 | IT Act 2000, Section 10A | IT Act 2000, Section 10A | IT Act 2000, Section 10A |
| **Legal equivalence** | Equivalent to wet-ink | Equivalent to wet-ink | Equivalent to wet-ink | Contractual validity | Contractual validity | Contractual validity |
| **Authentication** | Aadhaar number + OTP | Aadhaar number + fingerprint/iris | Hardware token + PIN | Phone/email OTP + signature pad | No OTP; digital acknowledgement | Fingerprint + OTP |
| **Requires Aadhaar** | Yes (linked to mobile) | Yes (biometric device needed) | No (CA-issued certificate) | No | No | Yes (for authentication) |
| **SEBI acceptance** | Yes (primary for KYC) | Yes | Yes (for entities) | For non-mandatory docs only | For acknowledgements only | Not yet SEBI-prescribed |
| **Cost** | ~Rs.25/sign | ~Rs.30/sign | Free (token cost upfront) | ~Rs.5/sign | ~Rs.2/sign | ~Rs.15/sign |
| **Use in our flow** | Primary for customer signing | Fallback for OTP issues | Broker-side signing (Doc Signer) | NRI/non-Aadhaar fallback | RDD acknowledgement | Field office operations |
| **Device needed** | Mobile phone | Biometric device (Mantra MFS-100) | USB token | Mobile phone | Mobile phone | Mantra MFS-100 |

### 2.2 Aadhaar OTP eSign (Primary for KYC)

This is the primary signing method for individual customer onboarding.

**How it works**:
1. Customer enters 12-digit Aadhaar number (or last 4 digits if Aadhaar retrieved via DigiLocker)
2. UIDAI sends OTP to Aadhaar-linked mobile number
3. Customer enters OTP
4. ESP (NSDL or eMudhra) authenticates via UIDAI, generates DSC
5. CAdES-compliant digital signature applied to document hash
6. Signed PDF returned with embedded DSC

**Regulatory chain**:
```
Customer --> Leegality (ASP) --> NSDL/eMudhra (ESP) --> UIDAI --> OTP --> Authenticate
                                      |
                                      v
                              Certifying Authority (CA)
                                      |
                                      v
                              Issue DSC --> Apply to document hash
                                      |
                                      v
                              CAdES-compliant signed PDF
```

**Key constraint**: Aadhaar must be linked to an active Indian mobile number. NRIs with Indian Aadhaar + Indian mobile can use this. NRIs without Indian mobile must use DSC or Virtual Sign fallback.

### 2.3 DSC Token Signing (For Non-Individuals and Broker-Side)

DSC (Digital Signature Certificate) tokens are USB devices issued by Certifying Authorities after KYC verification. Used by:
- Company directors for entity account opening
- Chartered Accountants for MCA filings
- Broker organizations for automated document countersigning via Doc Signer

**Doc Signer Certificate** (broker-side):
- Organizational DSC installed on broker's server
- Qualifies as Special Purpose Certificate under CCA Interoperability Guidelines
- Issued after thorough organizational KYC
- Private key remains on broker's server (exclusive control)
- Auto-signs documents within 20 seconds of all other signers completing

### 2.4 Virtual Sign (Non-Aadhaar Fallback)

Leegality's Secure Virtual Signature is a non-Aadhaar electronic authentication mechanism:
1. Signer receives OTP on registered phone or email
2. Signer authenticates by entering OTP
3. Signer affixes representation of signature on virtual pad
4. System captures authentication trail

**Use cases for broking**:
- Signer's Aadhaar not linked to mobile
- NRI without Indian mobile
- Cheaper alternative for non-mandatory documents
- Supplementary signatures on internal broker documents

**Legal validity**: Valid under Section 10A of IT Act (electronic contracts). Not equivalent to Schedule II eSign for SEBI-mandatory documents. Use only where SEBI does not explicitly require Aadhaar eSign.

---

## 3. SEBI eSign Requirements

### 3.1 Regulatory Basis

| Circular | Reference | Relevance |
|----------|-----------|-----------|
| SEBI KYC Master Circular | SEBI/HO/MIRSD/MIRSD-SEC-2/P/CIR/2023/168 (Oct 2023) | Aadhaar eSign accepted in lieu of wet signature on KYC documents |
| SEBI Stock Brokers Master | SEBI/HO/MIRSD/MIRSD-PoD/P/CIR/2025/90 (Jun 2025) | eSign provisions for account opening documents |
| SEBI DDPI Circular | SEBI/HO/MIRSD/DoP/CIR/P/2022/51 (Apr 2022) | DDPI can be digitally signed; replaces POA; requires stamping |
| SEBI eKYC Notification | SEBI/HO/MIRSD/DOP/CIR/P/2020/73 (Apr 2020) | eSign + Video KYC for end-to-end digital onboarding |
| IT Act 2000, Section 5 | Central legislation | Electronic signatures given legal recognition |
| e-Authentication Guidelines | CCA, MeitY (May 2019) | Regulatory framework for Aadhaar eSign operations |
| Gazette Notification | GSR 61(E) (Jan 2015) | Aadhaar eSign added to Schedule II of IT Act |

### 3.2 Which Documents Need eSign

| Document | eSign Required | Stamp Duty | Notes |
|----------|---------------|------------|-------|
| KYC Form (Part I - CERSAI) | Yes -- Aadhaar eSign | No | Identity + address attestation |
| KYC Form (Part II - Intermediary) | Yes -- Aadhaar eSign | No | Trading preferences, segments, income |
| Account Opening Form (AOF) | Yes -- Aadhaar eSign | No | Trading account agreement |
| DDPI Authorization | Yes -- Aadhaar eSign | **Yes** (varies by state) | Replaced POA since Nov 2022; stamp duty mandatory |
| Risk Disclosure Document (RDD) | Acknowledgement sufficient | No | Customer must read; QuickSign or Virtual Sign acceptable |
| Tariff/Brokerage Schedule | Acknowledgement sufficient | No | Fee structure acknowledgement |
| Nomination Form | Yes -- Aadhaar eSign | No | Up to 10 nominees (since Jan 2025) |
| Nomination Opt-Out Declaration | Yes -- Aadhaar eSign | No | Requires video verification per SEBI |
| Running Account Authorization | Yes -- Aadhaar eSign | No | Quarterly/monthly settlement preference |
| Rights & Obligations | Acknowledgement sufficient | No | Customer must read before signing |

### 3.3 Mandatory vs Optional Signatures

```
MANDATORY (Aadhaar eSign required by SEBI):
  - KYC application (Part I + Part II)
  - Account Opening Form
  - DDPI authorization (+ stamp duty)
  - Nomination form / Nomination opt-out

ACKNOWLEDGEMENT ONLY (QuickSign or Virtual Sign acceptable):
  - Risk Disclosure Document
  - Tariff/Brokerage schedule
  - Rights & Obligations document
  - Policies and Procedures document

BROKER-SIDE (Doc Signer / organizational DSC):
  - Broker's countersignature on agreements
  - Contract notes (daily)
  - Compliance certificates
```

### 3.4 Single Ceremony Strategy

SEBI permits a single Aadhaar OTP to sign multiple documents in one session. Our approach:

1. Generate all mandatory documents as a **single combined PDF** (KYC Part I + Part II + AOF + DDPI + Nomination)
2. Customer reviews the combined document
3. Single Aadhaar OTP signs the entire package
4. Acknowledgement documents (RDD, Tariff, R&O) collected via QuickSign in same session
5. Broker countersigns via Doc Signer Certificate (automated, within 20 seconds)

This maps to the "4-touch process" referenced in Leegality's stock broker documentation:
- Touch 1: Customer enters Aadhaar number
- Touch 2: Customer enters OTP
- Touch 3: Customer confirms signature placement
- Touch 4: Submission complete

---

## 4. API Integration

### 4.1 API Version & Architecture

Leegality uses **API 3.0 (Smart API)** which is workflow-driven. All signing configurations are saved in the Leegality Dashboard as "Workflows". The API call only needs:
1. Workflow ID (pre-configured in dashboard)
2. Variable parameters (signer details, document data)

This means changes to signing configuration (number of signers, stamp paper, verification options) require **zero code changes** -- only dashboard updates.

### 4.2 Authentication

| Parameter | Description |
|-----------|-------------|
| Header | `X-Auth-Token: <your_auth_token>` |
| Source | Obtained from API Settings tab in Leegality Dashboard |
| IP Whitelist | Optional; configure allowed IPs in API Settings |
| Webhook Verification | HMAC-SHA1 on `documentId` using Private Salt from API Settings |

```http
POST /api/v3.0/document/create
Content-Type: application/json
X-Auth-Token: <auth_token>
```

### 4.3 Environments

| Environment | Base URL | Purpose |
|-------------|----------|---------|
| Sandbox / UAT | `https://sandbox.leegality.com` | Integration testing (contact Leegality for sandbox credentials) |
| Production | `https://app.leegality.com` | Live signing operations |

**Note**: Sandbox credentials and specific base URLs should be confirmed during vendor onboarding. The GitHub API docs reference `https://contract-backend-dev.legistrak.com` for development endpoints.

### 4.4 Core API Endpoints

Based on the API 3.0 JSON schema (https://github.com/prakharmittal/leegality-apidocs/blob/master/api_3_0.json):

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/v3.0/document/create` | POST | Upload document + create signing invitation |
| `/api/v3.0/document/{documentId}` | GET | Get document details, status, signer info |
| `/api/v3.0/document/{documentId}/download` | GET | Download signed PDF |
| `/api/v3.0/document/{documentId}/audit-trail` | GET | Download Secure Audit Trail |
| `/api/v3.0/document/{documentId}/delete` | DELETE | Delete/cancel unsigned document |
| `/api/v3.0/documents/search` | GET | Search documents by filters |
| `/api/stamp-integration/get-stamp-shcil` | GET | Retrieve e-Stamp from organization wallet |

### 4.5 Document Create (Primary Integration Point)

**Request**:

```json
{
  "workflowId": "WF_KYC_INDIVIDUAL_V1",
  "file": {
    "name": "KYC_Application_ABCDE1234F.pdf",
    "contentType": "application/pdf",
    "content": "<base64_encoded_pdf>"
  },
  "signers": [
    {
      "name": "Rahul Sharma",
      "email": "rahul.sharma@example.com",
      "phone": "+919876543210",
      "signerType": "AADHAAR_ESIGN",
      "signerPosition": {
        "page": 12,
        "x": 100,
        "y": 650,
        "width": 200,
        "height": 50
      },
      "fields": {
        "pan": "ABCDE1234F",
        "applicationId": "APP-20260213-001"
      }
    }
  ],
  "stamp": {
    "required": true,
    "state": "Maharashtra",
    "denomination": 500,
    "purpose": "DDPI Authorization"
  },
  "callbackUrl": "https://kyc.ourbroker.com/api/webhooks/leegality",
  "redirectUrl": "https://kyc.ourbroker.com/application/{applicationId}/esign-complete",
  "expiryDays": 7,
  "customMessage": "Please sign your KYC application for account opening with Our Broker.",
  "metadata": {
    "applicationId": "APP-20260213-001",
    "panNumber": "ABCDE1234F",
    "stage": "KYC_ESIGN"
  }
}
```

**Key fields**:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `workflowId` | string | Yes | Pre-configured workflow ID from Leegality Dashboard |
| `file.content` | string | Yes | Base64-encoded PDF document |
| `file.name` | string | Yes | Filename for identification |
| `signers[]` | array | Yes | Array of signer objects |
| `signers[].signerType` | string | Yes | `AADHAAR_ESIGN`, `DSC`, `VIRTUAL_SIGN`, `QUICK_SIGN` |
| `signers[].phone` | string | Yes | Signer's mobile number (for signing link delivery) |
| `signers[].email` | string | No | Signer's email (for signing link delivery) |
| `signers[].signerPosition` | object | Yes | Signature placement coordinates on PDF (page, x, y, width, height) |
| `stamp` | object | No | Required only for DDPI and stamped agreements |
| `stamp.state` | string | Conditional | State for stamp duty (e.g., "Maharashtra", "Karnataka") |
| `stamp.denomination` | number | Conditional | Stamp value in INR |
| `callbackUrl` | string | Yes | Webhook URL for signing events |
| `redirectUrl` | string | No | URL to redirect customer after signing ceremony |
| `expiryDays` | number | No | Signing link expiry (default varies by plan) |
| `metadata` | object | No | Custom key-value pairs returned in webhooks |

**Response (Success)**:

```json
{
  "status": "success",
  "data": {
    "documentId": "DOC-xxxx-xxxx-xxxx",
    "signingUrl": "https://app.leegality.com/sign/xxxx-xxxx",
    "signers": [
      {
        "signerId": "SGN-xxxx",
        "name": "Rahul Sharma",
        "status": "PENDING",
        "signingUrl": "https://app.leegality.com/sign/xxxx-yyyy"
      }
    ],
    "createdAt": "2026-02-13T10:30:00Z",
    "expiresAt": "2026-02-20T10:30:00Z"
  }
}
```

### 4.6 Document Status Check

**Request**:

```http
GET /api/v3.0/document/DOC-xxxx-xxxx-xxxx
X-Auth-Token: <auth_token>
```

**Response**:

```json
{
  "status": "success",
  "data": {
    "documentId": "DOC-xxxx-xxxx-xxxx",
    "documentStatus": "SIGNED",
    "signers": [
      {
        "signerId": "SGN-xxxx",
        "name": "Rahul Sharma",
        "status": "SIGNED",
        "signedAt": "2026-02-13T10:35:22Z",
        "signMethod": "AADHAAR_ESIGN",
        "espProvider": "NSDL",
        "certificateDetails": {
          "serialNumber": "xxxx",
          "issuer": "NSDL e-Governance Infrastructure Limited",
          "validFrom": "2026-02-13T10:35:22Z",
          "validTo": "2026-02-13T10:35:22Z",
          "signerName": "RAHUL SHARMA"
        }
      }
    ],
    "auditTrail": {
      "available": true,
      "downloadUrl": "/api/v3.0/document/DOC-xxxx/audit-trail"
    },
    "stampDetails": {
      "stampId": "SHCIL-xxxx",
      "state": "Maharashtra",
      "denomination": 500,
      "defacementId": "DEF-xxxx"
    }
  }
}
```

### 4.7 Download Signed PDF

```http
GET /api/v3.0/document/DOC-xxxx-xxxx-xxxx/download
X-Auth-Token: <auth_token>

Response: Binary PDF (application/pdf)
Content-Disposition: attachment; filename="KYC_Application_ABCDE1234F_signed.pdf"
```

### 4.8 Status Polling vs Webhooks

| Approach | When to Use |
|----------|-------------|
| **Webhooks (recommended)** | Primary method. Leegality pushes events to your `callbackUrl` |
| **Status Polling** | Fallback if webhook delivery fails. Poll `GET /document/{id}` with exponential backoff |
| **Redirect URL** | Customer-facing; redirects browser after signing ceremony completes |

**Polling strategy** (fallback only):
```
Initial: Poll at T+30s after signing link sent
Then: Exponential backoff: 30s, 60s, 120s, 240s, 480s
Max: Poll every 10 minutes until expiry
Timeout: Stop polling after document expiry (7 days default)
```

---

## 5. Document Types for Broking

### 5.1 Document Inventory

| # | Document | Source Template | Dynamic Fields | eSign Type | Stamp Required |
|---|----------|---------------|----------------|------------|----------------|
| 1 | KYC Form Part I (CERSAI) | SEBI prescribed format | Name, PAN, DOB, Address, Photo, Aadhaar details | Aadhaar eSign | No |
| 2 | KYC Form Part II (Broker) | Broker's template | Segments, income, bank details, nominee, DP preferences | Aadhaar eSign | No |
| 3 | Account Opening Form | Broker's template | All KYC data + trading preferences | Aadhaar eSign | No |
| 4 | DDPI Authorization | SEBI prescribed format | Client name, BO ID, broker details | Aadhaar eSign | **Yes** |
| 5 | Risk Disclosure Document | Exchange prescribed | Client name, date | QuickSign | No |
| 6 | Tariff/Brokerage Schedule | Broker's template | Plan details, charges | QuickSign | No |
| 7 | Nomination Form | SEBI prescribed | Nominee name, relationship, share %, guardian if minor | Aadhaar eSign | No |
| 8 | Nomination Opt-Out | SEBI prescribed | Client declaration | Aadhaar eSign | No |
| 9 | Running Account Authorization | Broker's template | Settlement frequency preference | Aadhaar eSign | No |
| 10 | Rights & Obligations | Exchange prescribed | Client name, date | QuickSign | No |

### 5.2 Combined Document Strategy

For our 9-screen KYC flow, we generate documents as follows:

```
COMBINED PDF (signed with single Aadhaar OTP):
  Page 1-4:   KYC Part I (CERSAI format)
  Page 5-8:   KYC Part II (trading details)
  Page 9-11:  Account Opening Form
  Page 12-14: DDPI Authorization (with stamp paper affixed)
  Page 15-16: Nomination Form
  Page 17:    Running Account Authorization

SEPARATE ACKNOWLEDGEMENTS (QuickSign):
  Doc A: Risk Disclosure Document
  Doc B: Rights & Obligations
  Doc C: Tariff/Brokerage Schedule
```

### 5.3 Field Mapping: KYC Master Dataset to Document Templates

| Template Section | Master Dataset Fields | Field IDs |
|-----------------|----------------------|-----------|
| Personal Details | Full name, father's name, DOB, gender | A01-A04, A05-A08, A15, A18, A20 |
| PAN Details | PAN number, PAN status | A09, R01 |
| Address | Full address, city, state, PIN | B01-B08 |
| Contact | Mobile, email | C01-C04 |
| Bank Account | Bank name, branch, IFSC, a/c number | F01-F10 |
| Segments | Cash, F&O, commodity, currency | G01-G08 |
| Income | Annual income bracket | H01-H02 |
| Nominee | Nominee name, relationship, share | L01-L15 |
| DDPI | Client name, BO ID, broker TM code | Custom fields |

> Cross-reference: See [KYC_MASTER_DATASET.md](../../KYC_MASTER_DATASET.md) for complete field specifications.

---

## 6. Signing Ceremony Flow

### 6.1 End-to-End Flow (Screen 9 of KYC Journey)

```
┌──────────────────────────────────────────────────────────────────────┐
│                    SCREEN 9: Review + Face Match + e-Sign            │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  Step 1: DOCUMENT GENERATION (our backend)                          │
│  ├── Collect all data from Screens 1-8                              │
│  ├── Generate combined PDF from templates                            │
│  ├── Affix stamp paper for DDPI (via Leegality BharatStamp API)     │
│  └── Upload PDF to Leegality via Document Create API                │
│       └── Returns: documentId + signingUrl                          │
│                                                                      │
│  Step 2: FACE MATCH (HyperVerge) [before signing]                   │
│  ├── Customer takes selfie                                           │
│  ├── Match against Aadhaar photo from DigiLocker                    │
│  └── Threshold: >= 80% match + liveness pass                        │
│                                                                      │
│  Step 3: SIGNING CEREMONY (Leegality)                               │
│  ├── Embed signing URL in iframe / redirect to signing page          │
│  ├── Customer reviews document pages                                 │
│  ├── Touch 1: Customer enters Aadhaar number                        │
│  ├── Touch 2: Customer enters OTP (sent by UIDAI)                   │
│  ├── Touch 3: Customer confirms signature placement                  │
│  ├── Touch 4: Submission complete                                    │
│  └── Leegality fires webhook: document.signed                       │
│                                                                      │
│  Step 4: ACKNOWLEDGEMENTS (Leegality QuickSign)                     │
│  ├── RDD, R&O, Tariff schedule shown                                │
│  └── Customer acknowledges (no OTP needed)                           │
│                                                                      │
│  Step 5: BROKER COUNTERSIGN (Leegality Doc Signer)                  │
│  ├── Automated within 20 seconds                                     │
│  └── Organizational DSC applied to combined document                 │
│                                                                      │
│  Step 6: POST-SIGNING                                                │
│  ├── Download signed PDF + Audit Trail from Leegality               │
│  ├── Store in our document management system                         │
│  ├── Send signed PDF to customer via WhatsApp/email                  │
│  └── Update application status: GATE_CHECK --> e_SIGNED             │
│                                                                      │
│  Time: ~60 seconds total (per kyc-flow.md timing)                   │
└──────────────────────────────────────────────────────────────────────┘
```

### 6.2 Integration Mode Options

| Mode | Description | Recommended For |
|------|-------------|-----------------|
| **Redirect** | Customer redirected to Leegality's hosted signing page, then back to `redirectUrl` | Simple integration; good for mobile web |
| **Iframe Embed** | Signing page loaded in iframe within our application | Seamless UX; customer stays in our app |
| **SDK / API-driven** | Full API control over signing flow | Maximum customization; requires more dev effort |
| **WhatsApp** | Signing link sent via WhatsApp Pings | Async signing; customer completes later |
| **SMS/Email** | Traditional signing link delivery | Fallback delivery channel |

**Our recommended approach**: **Iframe Embed** for web application, **Redirect** for mobile app. This keeps the customer within our KYC flow while leveraging Leegality's signing UX.

### 6.3 Signing Link Delivery

| Channel | Method | Open Rate | Drop-off |
|---------|--------|-----------|----------|
| In-app (iframe/redirect) | Direct embed on Screen 9 | 100% | Lowest |
| WhatsApp Pings | Leegality sends via WhatsApp API | Very high | Low |
| SMS | Leegality sends SMS with link | Medium | Medium |
| Email | Leegality sends email with link | Low | High |

For our KYC flow, the signing happens in-app on Screen 9, so link delivery via SMS/WhatsApp/email is not needed for the primary flow. These channels are useful for:
- Retry scenarios (customer abandons Screen 9 and returns later)
- Multi-signatory flows (non-individual accounts)
- Sending signed PDF copy to customer after completion

### 6.4 Signing Link Expiry and Reminders

| Configuration | Default | Our Setting |
|--------------|---------|-------------|
| Link expiry | 7 days | 24 hours (for real-time KYC; abandoned sessions expire quickly) |
| Auto-reminder | Configurable | 1 reminder at T+4 hours if not signed |
| Max retries | No limit | 3 OTP attempts, then fallback to Virtual Sign |

---

## 7. Template Management

### 7.1 Leegality Template Engine

Leegality's Template Engine allows pre-filling of digital PDF templates with data before they are sent for signing:

| Feature | Description |
|---------|-------------|
| **Pre-fill fields** | Inject customer data (name, PAN, address) from KYC database into PDF form fields |
| **Document Assembly** | Combine multiple templates into single document |
| **Conditional sections** | Show/hide sections based on data (e.g., F&O risk disclosure only if F&O segment selected) |
| **Signature positioning** | Define exact coordinates (page, x, y, width, height) for signature placement |
| **Template versioning** | Maintain versions; deploy new templates without code changes |
| **Data linking** | Associate documents with application IDs for easy retrieval |

### 7.2 Template Configuration for Our Documents

| Document | Template Format | Dynamic Fields | Conditional Sections |
|----------|----------------|----------------|---------------------|
| KYC Part I | CERSAI prescribed PDF | Name, PAN, DOB, gender, address, photo | None (fixed format) |
| KYC Part II | Custom HTML-to-PDF | Segments, income, bank, trading preferences | F&O section if futures selected; Commodity section if commodity selected |
| DDPI | SEBI format PDF | Client name, BO ID, broker TM code, date | None (fixed format) |
| Nomination | SEBI format | Up to 10 nominee blocks | Additional nominee blocks based on count |
| RDD | Exchange format | Client name, date | F&O risk only if F&O selected; Commodity risk only if commodity selected |

### 7.3 Two Approaches to Document Generation

**Approach A: Generate PDF ourselves, upload to Leegality for signing only**
- We generate the complete PDF using our own template engine (HTML-to-PDF)
- Upload the pre-filled PDF to Leegality
- Leegality handles only the signing ceremony
- More control over document layout
- **Recommended for our architecture**

**Approach B: Use Leegality's Template Engine for generation + signing**
- Define templates in Leegality Dashboard
- Pass data fields via API; Leegality generates and signs
- Less code on our side
- Less control over layout; dependency on Leegality for template changes

### 7.4 Signature Placement Coordinates

For our combined PDF, signature placement coordinates:

```json
{
  "signerPositions": [
    {
      "label": "KYC Part I Signature",
      "page": 4,
      "x": 350,
      "y": 680,
      "width": 200,
      "height": 50
    },
    {
      "label": "KYC Part II Signature",
      "page": 8,
      "x": 350,
      "y": 680,
      "width": 200,
      "height": 50
    },
    {
      "label": "DDPI Signature",
      "page": 14,
      "x": 350,
      "y": 680,
      "width": 200,
      "height": 50
    },
    {
      "label": "Nomination Signature",
      "page": 16,
      "x": 350,
      "y": 680,
      "width": 200,
      "height": 50
    }
  ]
}
```

**Note**: Exact coordinates will be determined during template design. All positions refer to the single Aadhaar OTP signing ceremony; the customer authenticates once and the signature is applied at all defined positions.

---

## 8. Stamp Duty (e-Stamp via BharatStamp)

### 8.1 Why Stamp Duty Matters for Broking

The DDPI authorization **requires stamping** per SEBI circular SEBI/HO/MIRSD/DoP/CIR/P/2022/51. Unlike other KYC documents, simple eSign is not sufficient for DDPI -- it must be both signed AND stamped.

> "The DDPI shall also be adequately stamped." -- SEBI DDPI Circular

### 8.2 Leegality BharatStamp

BharatStamp is Leegality's digital stamping network:

| Feature | Detail |
|---------|--------|
| Coverage | 25+ Indian states and Union Territories |
| Procurement | Leegality procures stamp papers from authorized vendors nationwide |
| Defacement | Unique ID generated, stamp paper defaced and tied to electronic document |
| Dynamic Stamping | Stamp value calculated as percentage (ad-valorem) or fixed amount |
| Compliance | Fully compliant with Indian Stamp Act, 1899 and state stamp acts |
| Integration | Combined e-Stamp + e-Sign in single API flow |
| Scale | 5.2M+ stamps digitized; 400+ businesses using BharatStamp |

### 8.3 e-Stamp Flow

```
Step 1: Our backend determines stamp duty requirement
  ├── Document type: DDPI
  ├── Customer's state: From address (field B06)
  └── Stamp denomination: Look up state-specific rate

Step 2: Request stamp via Leegality API
  ├── Include stamp.state and stamp.denomination in Document Create request
  └── Leegality procures from SHCIL or state stamp vendor

Step 3: Leegality affixes stamp
  ├── Stamp paper defaced with unique ID
  ├── Defaced stamp affixed to DDPI pages of combined PDF
  └── Document ready for signing

Step 4: Combined e-Stamp + e-Sign
  ├── Customer signs the stamped document
  └── Both stamp and signature in single ceremony
```

### 8.4 SHCIL Integration

SHCIL (Stock Holding Corporation of India Limited) is the central e-Stamp agency:

| Detail | Value |
|--------|-------|
| API endpoint | `https://contract-backend-dev.legistrak.com/api/stamp-integration/get-stamp-shcil` |
| Authentication | `X-Auth-Token` (Leegality token) |
| Function | Retrieve e-Stamp from organization's pre-funded stamp wallet |
| Wallet | Pre-fund wallet with Leegality; stamps drawn from wallet per transaction |

### 8.5 Stamp Duty Rates for Broker Agreements (Major States)

Stamp duty for DDPI / Power of Attorney type instruments varies by state. The rates below are indicative and must be verified against current state stamp acts:

| State | Instrument Type | Stamp Duty (Indicative) | Notes |
|-------|----------------|------------------------|-------|
| Maharashtra | Authority/Power of Attorney | Rs.500 flat | For non-commercial POA-equivalent |
| Karnataka | Authority/Power of Attorney | Rs.500 flat | Fixed rate |
| Delhi | Authority/Power of Attorney | Rs.100 flat | Lower rate |
| Tamil Nadu | Authority/Power of Attorney | Rs.100-500 | Depends on instrument classification |
| Gujarat | Authority/Power of Attorney | Rs.100-500 | Depends on instrument classification |
| Telangana | Authority/Power of Attorney | Rs.500 flat | Fixed rate |
| Rajasthan | Authority/Power of Attorney | Rs.100-500 | Variable |
| Uttar Pradesh | Authority/Power of Attorney | Rs.100 flat | Lower rate |

**Important**: Stamp duty rates change. Always consult your legal counsel and the relevant state stamp act. Leegality can advise on current rates during integration.

**Implementation note**: Our system determines the customer's state from field B06 (state in address) and passes the appropriate stamp denomination to Leegality. The stamp cost is typically borne by the broker, not the customer.

---

## 9. Non-Individual Entities

### 9.1 Entity Types and Signing Requirements

| Entity Type | Who Signs | Signing Method | Additional Requirements |
|-------------|-----------|---------------|------------------------|
| **Individual** | Account holder | Aadhaar eSign (OTP) | Standard flow |
| **Company** | Authorized signatory(ies) | DSC Token or Aadhaar eSign | Board resolution appointing signatories |
| **HUF** | Karta | Aadhaar eSign | HUF deed, Karta declaration |
| **Partnership** | All partners or authorized partner | Aadhaar eSign per partner | Partnership deed, authority letter |
| **Trust** | Trustee(s) | DSC or Aadhaar eSign | Trust deed, trustee resolution |
| **NRI** | Account holder | Aadhaar eSign (if Indian mobile) or DSC | PIS permission letter, NRE/NRO bank a/c proof |

### 9.2 Multi-Signatory Workflows

Leegality supports multiple signers on a single document:

**Sequential signing** (ordered):
```
Signer 1 (Partner A) signs first
  --> Signer 2 (Partner B) signs second
    --> Signer 3 (Authorized Rep) signs third
      --> Doc Signer (Broker) auto-signs last
```

**Parallel signing** (any order):
```
Signer 1 (Partner A)  \
Signer 2 (Partner B)   } -- All sign independently in any order
Signer 3 (Partner C)  /
  --> Doc Signer (Broker) auto-signs after all complete
```

**Configuration**: Set signing order in Workflow Builder. The workflow saves the configuration for number of signatories and their sequence.

### 9.3 NRI Signing Considerations

| Scenario | Solution |
|----------|----------|
| NRI with Indian Aadhaar + Indian mobile | Standard Aadhaar OTP eSign works |
| NRI with Indian Aadhaar but no Indian mobile | Cannot use Aadhaar OTP; use DSC Token or Virtual Sign |
| NRI without Aadhaar | Must use DSC Token (physical signing at Indian consulate or via video verification) |
| OCI/PIO holder | Same as NRI; depends on Aadhaar availability |

**Fallback for NRIs**: Virtual Sign (OTP to email + signature pad). While not Schedule II equivalent, SEBI circulars do not explicitly prohibit this for NRI account opening. Confirm with compliance team.

### 9.4 Board Resolution / Authority Verification

For non-individual accounts, before triggering eSign:
1. Upload board resolution / partnership deed / trust deed as supporting document
2. Verify authorized signatory names match the eSign invitees
3. Cross-reference signatory PAN with entity records
4. Store authority documents alongside signed KYC documents

---

## 10. Webhook & Callback

### 10.1 Webhook Events

| Event | Trigger | Action in Our System |
|-------|---------|---------------------|
| `document.created` | Document uploaded and signing invitation created | Log creation; start monitoring |
| `document.viewed` | Signer opened the document for review | Update UI: "Customer is reviewing documents" |
| `document.signed` | All signers have signed | Download signed PDF; update status to `e_SIGNED` |
| `document.partially_signed` | Some signers signed (multi-signatory) | Track per-signer progress |
| `document.rejected` | Signer explicitly rejected | Alert ops team; allow retry |
| `document.expired` | Signing link expired without completion | Send reminder or generate new link |
| `document.failed` | eSign failed (ESP error, UIDAI down) | Trigger fallback flow |

### 10.2 Webhook Payload Structure

```json
{
  "event": "document.signed",
  "documentId": "DOC-xxxx-xxxx-xxxx",
  "timestamp": "2026-02-13T10:35:22Z",
  "data": {
    "documentStatus": "SIGNED",
    "signers": [
      {
        "signerId": "SGN-xxxx",
        "name": "RAHUL SHARMA",
        "status": "SIGNED",
        "signedAt": "2026-02-13T10:35:22Z",
        "signMethod": "AADHAAR_ESIGN",
        "espProvider": "NSDL",
        "ipAddress": "103.x.x.x",
        "geoLocation": {
          "latitude": 19.0760,
          "longitude": 72.8777
        }
      }
    ],
    "stampDetails": {
      "stampId": "SHCIL-xxxx",
      "state": "Maharashtra",
      "denomination": 500
    }
  },
  "metadata": {
    "applicationId": "APP-20260213-001",
    "panNumber": "ABCDE1234F",
    "stage": "KYC_ESIGN"
  },
  "mac": "a1b2c3d4e5f6..."
}
```

### 10.3 HMAC Verification

Leegality signs webhook payloads using HMAC-SHA1. Verify every webhook to prevent spoofing:

```python
import hmac
import hashlib

def verify_leegality_webhook(document_id: str, received_mac: str, private_salt: str) -> bool:
    """
    Verify Leegality webhook HMAC.
    The MAC is calculated by applying HMAC-SHA1 on documentId
    with the Private Salt from API Settings.
    """
    calculated_mac = hmac.new(
        private_salt.encode('utf-8'),
        document_id.encode('utf-8'),
        hashlib.sha1
    ).hexdigest()
    return hmac.compare_digest(calculated_mac, received_mac)
```

### 10.4 Webhook Retry Policy

| Attempt | Delay | Notes |
|---------|-------|-------|
| 1st | Immediate | First delivery attempt |
| 2nd | 5 minutes | Auto-retry on HTTP 4xx/5xx or timeout |
| 3rd | 30 minutes | Second retry |
| 4th | 2 hours | Third retry |
| 5th | 12 hours | Final retry |
| After 5th | Stops | Manual re-trigger via Leegality dashboard, or use polling fallback |

**Our webhook endpoint requirements**:
- Respond with HTTP 200 within 5 seconds
- Idempotent: handle duplicate deliveries gracefully (use `documentId` as dedup key)
- Log all payloads for audit trail

---

## 11. Document Storage & Retrieval

### 11.1 Storage Architecture

```
                     ┌─────────────────┐
                     │  Leegality Vault │
                     │  (Cloud Storage)  │
                     │                   │
                     │  - Signed PDFs    │
                     │  - Audit Trails   │
                     │  - Stamp records  │
                     └───────┬───────────┘
                             │
                    Download via API
                             │
                     ┌───────▼───────────┐
                     │  Our Document     │
                     │  Management System │
                     │                   │
                     │  - S3 / blob store │
                     │  - Mapped to Q02   │
                     │  - 8+ year retain  │
                     └───────────────────┘
```

### 11.2 What Gets Stored

| Artifact | Source | Format | Master Dataset Field | Retention |
|----------|--------|--------|---------------------|-----------|
| Signed Combined PDF | Leegality Download API | PDF (CAdES-signed) | Q02 (e-Sign document) | 8 years after account closure |
| Secure Audit Trail | Leegality Audit Trail API | PDF (digitally signed by Leegality) | Q03 (Audit trail) | Same as signed PDF |
| e-Stamp Certificate | Leegality Stamp API | Part of signed PDF | Embedded in DDPI pages | Same as signed PDF |
| Acknowledgement PDFs | Leegality QuickSign | PDF | Q04 (Acknowledgements) | 5 years minimum |
| Signing metadata | Webhook payload | JSON | R-section fields | Same as signed PDF |

### 11.3 Audit Trail Contents

Leegality's Secure Audit Trail captures:

| Data Point | Description |
|-----------|-------------|
| Signer identity | Name as per Aadhaar (from UIDAI authentication) |
| Timestamp | Exact date and time of signature (ISO 8601) |
| IP address | Signer's IP address at time of signing |
| Geolocation | GPS coordinates (if geofencing enabled) |
| Device info | Browser, OS, device type |
| OTP verification | UIDAI authentication result |
| Document hash | SHA-256 hash of document at time of signing |
| Certificate details | DSC serial number, issuer, validity period |
| ESP provider | NSDL or eMudhra (whichever processed the transaction) |

The audit trail PDF is digitally signed by Leegality, giving it a presumption of non-tampering under the IT Act. No separate Section 65B certificate is needed from Leegality -- the digitally signed audit trail serves as evidence.

### 11.4 Retrieval SLA

| Operation | Expected Time |
|-----------|--------------|
| Download signed PDF | < 2 seconds |
| Download audit trail | < 2 seconds |
| Search documents by metadata | < 5 seconds |
| Bulk export | Contact Leegality for batch download |

### 11.5 Our Retention Strategy

Per SEBI and PMLA requirements:

```
Document Type         Retention Period
─────────────────     ──────────────────────────────
KYC records           8 years after account closure
Signed documents      8 years after account closure
Audit trails          8 years after account closure
e-Stamp certificates  8 years after account closure
DDPI authorization    Lifetime of account + 8 years
Transaction records   8 years from date of transaction
```

After downloading from Leegality, store in our blob storage (S3 or equivalent) with:
- Encryption at rest (AES-256)
- Version control
- Access logging
- Immutable storage (WORM) for compliance

---

## 12. Integration with Our KYC Flow

### 12.1 Where eSign Fits in the 9-Screen Journey

Per [kyc-flow.md](../../kyc-flow.md):

```
Screen 1: Mobile + OTP
Screen 2: PAN Entry + DigiLocker
Screen 3: DigiLocker Consent (Aadhaar XML + PAN)
Screen 4: Personal Details Review
Screen 5: Bank Account + Penny Drop
Screen 6: Segments + Income
Screen 7: Nominations
Screen 8: Declarations + BLOCKING GATE
  └── All async checks (PAN, KRA, CKYC, AML, Bank) must pass
Screen 9: Review + Face Match + e-Sign  <-- LEEGALITY INTEGRATION HERE
```

### 12.2 Data Flow Sequence

```
T=0    User reaches Screen 9
       │
T+1s   Backend: Generate combined PDF
       ├── Pull all data from Screens 1-8
       ├── Render HTML templates to PDF
       └── Include DDPI stamp requirement
       │
T+3s   Backend: Call Leegality Document Create API
       ├── Upload combined PDF
       ├── Set signer details (name, phone, email from C01-C04)
       ├── Set signature positions
       ├── Set stamp requirements (state from B06)
       └── Receive documentId + signingUrl
       │
T+5s   Frontend: Face Match (HyperVerge)
       ├── Customer takes selfie
       ├── Match vs Aadhaar photo (from DigiLocker Q01)
       └── Pass/Fail (threshold >= 80%)
       │
T+10s  Frontend: Load signing ceremony
       ├── Embed signingUrl in iframe
       ├── Customer reviews document
       ├── Enters Aadhaar number
       └── Enters OTP
       │
T+50s  Leegality: Signing complete
       ├── Webhook: document.signed --> our backend
       ├── Backend: Download signed PDF
       ├── Backend: Download audit trail
       └── Backend: Store in document management system
       │
T+55s  Frontend: QuickSign for acknowledgements
       ├── RDD, R&O, Tariff shown
       └── Customer acknowledges (no OTP)
       │
T+60s  Backend: Doc Signer auto-countersign
       ├── Broker's organizational DSC applied
       └── Final signed document ready
       │
T+65s  Backend: Update application status
       ├── Status: GATE_CHECK --> e_SIGNED
       ├── Queue for maker-checker review
       └── Send signed PDF to customer (WhatsApp/email)
```

### 12.3 Blocking Gate Prerequisite

Before reaching Screen 9 (eSign), the Blocking Gate (Screen 8) must verify:

| # | Check | Vendor | Pass Criteria | Per |
|---|-------|--------|---------------|-----|
| 1 | PAN Verified | Decentro | Status = E (valid) | [Decentro.md](../verification/Decentro.md) |
| 2 | KRA Status | Digio | Not Rejected | kyc-flow.md Section 5 |
| 3 | CKYC Downloaded | Decentro | Search successful | kyc-flow.md Section 5 |
| 4 | AML Clear | TrackWizz | No matches / false positive cleared | kyc-flow.md Section 5 |
| 5 | Bank Verified | Decentro | Penny drop success + name match >= 70% | [Decentro.md](../verification/Decentro.md) |

If any check fails, the customer cannot proceed to eSign. This follows the principle: "Fail fast, fail gracefully. If blocking check fails, stop user before e-Sign. Don't waste their time."

### 12.4 Post-eSign Processing

After successful eSign, the following batch processes are triggered:

```
eSign Complete
  │
  ├── Immediate: Store signed PDF (Q02) in document management
  ├── Immediate: Store audit trail (Q03)
  ├── Immediate: Send signed PDF to customer
  │
  ├── Queued: KRA Upload (signed KYC form to CVL/NDML/DOTEX)
  ├── Queued: CKYC Upload (signed form to CERSAI)
  ├── Queued: UCC Registration (NSE/BSE/MCX)
  ├── Queued: BO Account Opening (CDSL/NSDL)
  │
  └── Maker-Checker Review
      ├── Checker verifies all documents
      ├── Approves or returns for correction
      └── On approval: activate trading account
```

---

## 13. Pricing

### 13.1 Leegality Pricing Model

| Component | Cost (Indicative) | Notes |
|-----------|-------------------|-------|
| Platform license fee | **Rs.0** | Zero license fee on Basic plan |
| Aadhaar eSign (OTP) | ~Rs.20-25 per signature | Volume-dependent; per successful sign only |
| Virtual Sign | ~Rs.3-5 per signature | Cheaper alternative |
| QuickSign | ~Rs.1-2 per acknowledgement | For non-critical documents |
| Doc Signer (organizational) | Included in plan | After DSC setup |
| e-Stamp (BharatStamp) | Stamp duty + procurement fee | Stamp duty varies by state; procurement fee ~Rs.50-100 |
| WhatsApp Pings | Additional per-message cost | Contact Leegality for WhatsApp pricing |
| Face Match (add-on) | ~Rs.3-5 per match | We use HyperVerge separately; may skip Leegality's |
| Geofencing (add-on) | Included in higher plans | GPS capture during signing |
| API access | Included | All plans include API access |

### 13.2 Cost Per Onboarding (Estimated)

| Item | Count | Unit Cost | Total |
|------|-------|-----------|-------|
| Aadhaar eSign (combined KYC doc) | 1 | Rs.25 | Rs.25 |
| QuickSign (RDD + R&O + Tariff) | 3 | Rs.2 | Rs.6 |
| e-Stamp for DDPI | 1 | Rs.50 (procurement) + Rs.500 (stamp duty avg) | Rs.550 |
| Doc Signer (broker countersign) | 1 | Rs.0 | Rs.0 |
| **Total per individual onboarding** | | | **~Rs.581** |
| Total without DDPI stamp | | | **~Rs.31** |

**Note**: Stamp duty cost (Rs.500 avg) is the dominant cost. If DDPI is optional (customer opts out), eSign cost drops to ~Rs.31 per onboarding.

### 13.3 Volume Discounts

Leegality offers volume-based pricing. Indicative tiers:

| Monthly Volume | Aadhaar eSign Rate | Notes |
|---------------|-------------------|-------|
| < 1,000 | ~Rs.25/sign | Standard rate |
| 1,000 - 10,000 | ~Rs.18-22/sign | Volume discount |
| 10,000 - 50,000 | ~Rs.12-18/sign | Enterprise negotiation |
| > 50,000 | ~Rs.8-15/sign | Custom enterprise pricing |

Actual rates should be negotiated directly with Leegality based on projected volumes.

### 13.4 Comparison with Alternatives

| Vendor | Aadhaar eSign Cost | e-Stamp | Integration Effort | Key Difference |
|--------|-------------------|---------|-------------------|----------------|
| **Leegality** | ~Rs.25/sign | Built-in (BharatStamp) | <2 days (Smart API) | Workflow-based API; dual ESP; stock broker focus |
| **Digio** | ~Rs.15-25/sign | Not built-in (separate integration) | 2-3 days | Broader KYC suite (also does KRA, DigiLocker) |
| **Setu eSign** | ~Rs.15-20/sign | Not available | 2-3 days | Setu ecosystem (AA, RPD); acquired by Pine Labs |
| **Protean (NSDL)** | ~Rs.5.90/sign | Not built-in | 5-7 days (older API) | Cheapest per-sign; direct from CA; less features |
| **eMudhra** | ~Rs.8-15/sign | Separate | 5-7 days | SAP/Oracle connectors; enterprise focus |
| **SignDesk** | ~Rs.20-30/sign | Available | 3-5 days | Document workflow focus |

---

## 14. Edge Cases

### 14.1 OTP Not Received

| Scenario | Cause | Handling |
|----------|-------|---------|
| OTP delayed | UIDAI congestion, telecom delay | Allow 2-minute wait; "Resend OTP" button triggers retry |
| OTP not received (3 attempts) | Mobile number mismatch with Aadhaar, telecom block | Show error: "OTP could not be delivered. Please ensure your Aadhaar is linked to your current mobile number." Offer Virtual Sign fallback |
| UIDAI service down | Planned/unplanned maintenance | Leegality Auto-Switch redirects to backup ESP (eMudhra). If both ESPs down, show "eSign service temporarily unavailable" with retry timer |

### 14.2 Signature Expired

| Scenario | Handling |
|----------|---------|
| Customer abandons mid-signing | Signing link remains active until expiry (24 hours in our config). Send WhatsApp reminder at T+4 hours |
| Link expired before signing | Generate new document and signing link. Old document auto-cancelled |
| Customer returns after expiry | Re-enter from Screen 9. Regenerate PDF (data may have changed) |

### 14.3 Partial Signing (Multi-Signatory)

| Scenario | Handling |
|----------|---------|
| Partner A signed, Partner B has not | Track per-signer status via `document.partially_signed` webhook. Send reminder to Partner B |
| One signer rejects | Document status becomes REJECTED. All signers must start over |
| Signer order violation (sequential) | Leegality enforces sequence; Signer B cannot sign before Signer A |

### 14.4 Aadhaar Not Linked to Mobile

| Scenario | Handling |
|----------|---------|
| Aadhaar registered with old mobile | Customer must visit nearest Aadhaar center to update mobile, OR use DSC/Virtual Sign fallback |
| Aadhaar-mobile link suspended | Same as above. Show message with Aadhaar update center link |
| Non-Aadhaar Routing | Leegality can auto-route to Virtual Sign if Aadhaar eSign fails (configurable in Workflow) |

### 14.5 Biometric Device Not Available

Fingerprint eSign requires Mantra MFS-100 device. If unavailable:
- Fall back to Aadhaar OTP eSign (default for digital journeys)
- Fingerprint eSign is primarily for field office / branch operations

### 14.6 ESP Downtime

| Scenario | Leegality Response |
|----------|-------------------|
| NSDL ESP down | Auto-Switch to eMudhra backup CA |
| eMudhra backup also down | Non-Aadhaar Routing to Virtual Sign (if configured) |
| Both ESPs + Virtual Sign down | Show "eSign service temporarily unavailable. Please try again later." Retry after 15 minutes |
| Planned UIDAI maintenance | Leegality may provide advance notice. Block eSign during maintenance window |

### 14.7 Document Tampering Detection

| Layer | Mechanism |
|-------|-----------|
| PDF signature | CAdES digital signature embedded in PDF. Any modification after signing invalidates the signature |
| Verifier API | POST-signing verification API checks signature certificate, signer identity, tampering |
| Secure Audit Trail | Digitally signed by Leegality; independent proof of signing event |
| SHA-256 hash | Document hash at time of signing recorded in audit trail |

### 14.8 Customer Signing from Outside India

| Scenario | Support |
|----------|---------|
| Indian citizen abroad (with Indian mobile) | Aadhaar OTP works if international roaming is active and SMS is received |
| NRI with Indian Aadhaar but no Indian SIM | Cannot use OTP eSign. Use DSC Token or Virtual Sign |
| Foreign national (no Aadhaar) | Not applicable for individual KYC (Aadhaar/PAN required for Indian broking) |

---

## 15. Alternatives Comparison

### 15.1 Detailed Feature Comparison

| Feature | Leegality | Digio | Setu eSign | SignDesk | Protean (NSDL) |
|---------|-----------|-------|------------|---------|----------------|
| **Aadhaar eSign (OTP)** | Yes | Yes | Yes | Yes | Yes (direct CA) |
| **Aadhaar eSign (Biometric)** | Yes | Yes | No | Yes | Yes |
| **DSC Token** | Yes | Yes | No | Yes | No |
| **Virtual Sign** | Yes | No | No | Yes | No |
| **QuickSign (OTP-less)** | Yes | No | No | No | No |
| **Fingerprint eSign** | Yes | No | No | No | No |
| **Doc Signer (Org DSC)** | Yes | Yes | No | No | No |
| **e-Stamp (BharatStamp)** | Yes (25+ states) | No | No | Yes | No |
| **Face Match** | Yes (built-in) | Yes (separate) | No | No | No |
| **Geofencing** | Yes | No | No | No | No |
| **Smart Liveliness** | Yes | No | No | No | No |
| **WhatsApp Pings** | Yes | No | No | No | No |
| **Dual ESP (auto-switch)** | Yes (NSDL + eMudhra) | Single ESP | Single ESP | Single ESP | N/A (is the ESP) |
| **Non-Aadhaar Routing** | Yes | No | No | No | N/A |
| **Verifier API** | Yes | No | No | No | No |
| **Section 65B Compliance** | Yes (digitally signed audit trail) | Yes | Basic | Yes | Basic |
| **Template Engine** | Yes | Basic | No | Yes | No |
| **DPDP Compliance (Consentin)** | Yes | No | No | No | No |
| **Workflow Builder** | Yes (API 3.0) | No | No | No | No |
| **Stock Broker Use Case** | Dedicated page + flow | General BFSI | General | General | General |
| **KRA Integration** | No | Yes | No | No | No |
| **DigiLocker** | No | Yes | No | No | No |
| **CKYC** | No | Yes (via partner) | No | No | No |
| **Per-Sign Cost** | ~Rs.25 | ~Rs.15-25 | ~Rs.15-20 | ~Rs.20-30 | ~Rs.5.90 |
| **License Fee** | Rs.0 | Varies | Rs.0 | Varies | Rs.0 |
| **Integration Time** | <2 days | 2-3 days | 2-3 days | 3-5 days | 5-7 days |
| **Scale (eSigns processed)** | 55M+ | Higher (670% revenue of Leegality) | Growing | Medium | Very high |

### 15.2 Recommendation

**Primary: Leegality** -- Chosen for our KYC system because:
1. Dedicated stock broker use case with DDPI support
2. Built-in e-Stamp (BharatStamp) -- critical for DDPI which requires stamping
3. Dual ESP auto-switch minimizes downtime
4. Smart API 3.0 (workflow-based) means faster integration and easier maintenance
5. QuickSign for acknowledgement documents reduces cost
6. Comprehensive fraud prevention (Face Match, Geofencing, Verifier API)
7. Zero license fee + pay-per-success model

**Alternative: Digio** -- Already in our stack for KRA, DigiLocker, and CKYC. Could consolidate eSign under Digio to reduce vendor count. However:
- No built-in e-Stamp (separate integration needed for DDPI)
- Single ESP (no auto-switch on downtime)
- No QuickSign equivalent (every document needs full eSign)
- Lacks stock broker-specific features

**Backup: Protean (NSDL)** -- Cheapest at Rs.5.90/sign but:
- Minimal feature set (no templates, no stamp, no workflow)
- Older API design; longer integration time
- No fraud prevention add-ons

---

## 16. Security & Compliance

### 16.1 Regulatory Compliance

| Regulation | Leegality Compliance |
|-----------|---------------------|
| **IT Act 2000, Section 5** | Electronic signatures given legal recognition; Aadhaar eSign recognized under Schedule II |
| **IT Act 2000, Section 10A** | Electronic contracts valid (Virtual Sign, QuickSign) |
| **CCA Framework** | Leegality operates under CCA (Controller of Certifying Authorities, MeitY) regulatory framework |
| **ESP Empanelment** | Leegality's parent Grey Swift Pvt Ltd is registered ASP (Application Service Provider) with NSDL ESP |
| **Certifying Authorities** | Partners: NSDL, Verasys, CDSL, CDAC via NeSL |
| **Indian Evidence Act** | Digitally signed audit trail enjoys presumption of non-tampering; Section 65B compliance |
| **SEBI KYC Circulars** | eSign accepted for all KYC and account opening documents |
| **SEBI DDPI Circular** | Explicit DDPI digitization support with mandatory stamping |
| **DPDP Act 2023** | Consentin platform for consent management compliance |
| **PMLA** | Audit trail meets customer due diligence record-keeping requirements |

### 16.2 CCA and ESP License Chain

```
Controller of Certifying Authorities (CCA)
  └── MeitY, Government of India
       │
       ├── Licensed ESPs (eSign Service Providers):
       │   ├── NSDL e-Governance (primary)
       │   └── C-DAC
       │
       ├── Licensed Certifying Authorities (CAs):
       │   ├── NSDL
       │   ├── eMudhra
       │   ├── Verasys
       │   ├── CDSL
       │   └── C-DAC via NeSL
       │
       └── Registered ASPs (Application Service Providers):
           └── Grey Swift Private Limited (Leegality)
               └── Registered with NSDL ESP
```

**Important**: Leegality itself is NOT an ESP or CA. It is an ASP empanelled with ESPs. The actual DSC is issued by the Certifying Authority (NSDL, eMudhra, Verasys). Leegality facilitates the signing ceremony and document management.

### 16.3 Data Security

| Layer | Implementation |
|-------|---------------|
| Data in transit | TLS 1.2+ encryption for all API communications |
| Data at rest | AES-256 encryption for stored documents |
| Aadhaar data | Leegality does NOT store Aadhaar numbers; authentication happens at UIDAI via ESP |
| Document access | API token + optional IP whitelisting |
| Webhook security | HMAC-SHA1 verification on all callbacks |
| Audit logging | All API calls logged with timestamps; accessible via dashboard |
| Penetration testing | Periodic security audits (confirm schedule during vendor evaluation) |

### 16.4 Signed PDF Security (CAdES)

The signed PDF contains:

```
PDF Document
  └── Digital Signature (CAdES-B or CAdES-T)
       ├── SignedInfo
       │   ├── Document hash (SHA-256)
       │   └── Signing algorithm (RSA-2048 or higher)
       ├── SignatureValue (encrypted hash)
       ├── KeyInfo
       │   ├── Signer's public key
       │   └── Certificate chain (CA --> Intermediate --> End entity)
       └── SignedProperties
           ├── Signing time
           ├── Signer's certificate reference
           └── Signature policy reference
```

Any modification to the PDF after signing invalidates the digital signature. This is verifiable:
- Using Adobe Acrobat's built-in signature validation
- Using Leegality's Verifier tool (https://verifier.leegality.com)
- Using Leegality's Verifier API (programmatic)

### 16.5 SEBI Inspection Readiness

| Requirement | How We Meet It |
|-------------|---------------|
| Signed KYC documents on demand | Download from our storage or Leegality vault within seconds |
| Audit trail for each signature | Leegality Secure Audit Trail with IP, timestamp, geolocation, device info |
| Proof of customer consent | Aadhaar OTP authentication = customer actively consented |
| Document integrity | CAdES digital signature; any tampering detectable |
| Stamp duty compliance | BharatStamp records with defacement ID and stamp certificate |
| Retention compliance | 8+ years in encrypted immutable storage |
| Section 65B certificate | Leegality's digitally signed audit trail serves as evidence; additional 65B certificate can be obtained from Leegality/CAs if needed in court proceedings |

---

## 17. Recent Regulatory Changes

### 17.1 eSign-Related SEBI Circulars (2024-2026)

| Date | Circular | Impact on eSign |
|------|----------|-----------------|
| Jan 2025 | Nomination changes | Up to 10 nominees allowed; nomination opt-out requires video verification. eSign needed for each nominee form |
| Jun 2025 | SEBI Stock Brokers Master Circular | SEBI/HO/MIRSD/MIRSD-PoD/P/CIR/2025/90 consolidates all stock broker requirements including eSign provisions |
| Jan 2026 | SEBI Stock Brokers Regulations 2026 | Replaces 1992 regulations entirely. eSign provisions continue; digital onboarding remains valid |
| Jun 2025 | NPCI e-KYC Setu | Aadhaar eKYC without AUA/KUA license (SEBI allowed). Does not change eSign requirements but changes how Aadhaar data is fetched |
| Feb 2025 | UPI Block Mechanism (mandatory for QSBs) | No direct impact on eSign, but affects overall onboarding flow |

### 17.2 CCA / MeitY Updates

| Date | Update | Impact |
|------|--------|--------|
| May 2019 | e-Authentication Guidelines | Current framework under which Aadhaar eSign operates |
| Jan 2015 | GSR 61(E) | Aadhaar eSign added to IT Act Schedule II (still current) |
| Ongoing | ESP empanelment | NSDL and C-DAC remain the only two ESPs. No new ESPs announced |

### 17.3 DPDP Act 2023 Impact

The Digital Personal Data Protection Act 2023 impacts how we collect, store, and process customer data including eSign-related data:

| Requirement | Our Approach |
|-------------|-------------|
| Consent for data processing | Leegality's Consentin platform available; integrate consent collection before eSign |
| Data minimization | Leegality does not store Aadhaar numbers (only authenticates via UIDAI) |
| Right to erasure | Signed documents are legal records with retention requirements; exempt from erasure for regulatory compliance |
| Data localization | Leegality servers in India; signed documents stored in India |

---

## 18. Integration Checklist

### 18.1 Pre-Integration

| # | Item | Owner | Status |
|---|------|-------|--------|
| 1 | Sign commercial agreement with Leegality (Grey Swift Pvt Ltd) | Legal + Procurement | [ ] |
| 2 | Obtain Leegality dashboard credentials | Leegality account manager | [ ] |
| 3 | Obtain API Auth Token from API Settings tab | Engineering | [ ] |
| 4 | Obtain Private Salt for webhook HMAC verification | Engineering | [ ] |
| 5 | Configure IP whitelist (production servers) | Engineering + DevOps | [ ] |
| 6 | Set up sandbox/UAT environment credentials | Leegality | [ ] |
| 7 | Define Workflow in Dashboard: Individual KYC eSign | Product + Engineering | [ ] |
| 8 | Define Workflow in Dashboard: DDPI eSign + Stamp | Product + Engineering | [ ] |
| 9 | Define Workflow in Dashboard: Non-Individual eSign | Product + Engineering | [ ] |
| 10 | Define Workflow in Dashboard: QuickSign for RDD/R&O | Product + Engineering | [ ] |
| 11 | Set up Doc Signer Certificate for broker countersign | Compliance + Leegality | [ ] |
| 12 | Pre-fund BharatStamp wallet for DDPI stamp duty | Finance + Leegality | [ ] |

### 18.2 Template Design

| # | Item | Owner | Status |
|---|------|-------|--------|
| 13 | Design KYC Part I template (CERSAI format) | Product + Legal | [ ] |
| 14 | Design KYC Part II template (broker-specific) | Product + Legal | [ ] |
| 15 | Design Account Opening Form template | Product + Legal | [ ] |
| 16 | Design DDPI template (SEBI format) | Product + Legal | [ ] |
| 17 | Design Nomination form template | Product + Legal | [ ] |
| 18 | Determine signature placement coordinates for combined PDF | Engineering | [ ] |
| 19 | Test PDF generation with sample data | QA | [ ] |

### 18.3 API Integration

| # | Item | Owner | Status |
|---|------|-------|--------|
| 20 | Implement Document Create API call | Backend Engineering | [ ] |
| 21 | Implement Webhook receiver endpoint | Backend Engineering | [ ] |
| 22 | Implement HMAC verification on webhooks | Backend Engineering | [ ] |
| 23 | Implement Document Download (signed PDF) | Backend Engineering | [ ] |
| 24 | Implement Audit Trail Download | Backend Engineering | [ ] |
| 25 | Implement iframe/redirect signing integration | Frontend Engineering | [ ] |
| 26 | Implement QuickSign for acknowledgement documents | Frontend Engineering | [ ] |
| 27 | Implement status polling (fallback for webhooks) | Backend Engineering | [ ] |
| 28 | Implement retry logic for failed eSigns | Backend Engineering | [ ] |
| 29 | Implement Doc Signer auto-countersign trigger | Backend Engineering | [ ] |

### 18.4 Testing

| # | Item | Owner | Status |
|---|------|-------|--------|
| 30 | Test Aadhaar OTP eSign end-to-end in sandbox | QA | [ ] |
| 31 | Test DDPI with e-Stamp in sandbox | QA | [ ] |
| 32 | Test webhook delivery and HMAC verification | QA | [ ] |
| 33 | Test ESP failover (NSDL to eMudhra auto-switch) | QA + Leegality | [ ] |
| 34 | Test signing link expiry and reminder flow | QA | [ ] |
| 35 | Test multi-signatory flow (non-individual) | QA | [ ] |
| 36 | Test QuickSign for acknowledgement documents | QA | [ ] |
| 37 | Test Doc Signer auto-countersign | QA | [ ] |
| 38 | Test signed PDF download and verification | QA | [ ] |
| 39 | Test edge cases: OTP failure, abandonment, expiry | QA | [ ] |
| 40 | Load test: concurrent signing requests | QA + DevOps | [ ] |

### 18.5 Go-Live

| # | Item | Owner | Status |
|---|------|-------|--------|
| 41 | Switch from sandbox to production environment | Engineering + DevOps | [ ] |
| 42 | Verify production webhook URL is accessible | DevOps | [ ] |
| 43 | Verify production IP whitelist | DevOps | [ ] |
| 44 | Fund BharatStamp production wallet | Finance | [ ] |
| 45 | Pilot with internal test accounts (10-20 users) | QA + Compliance | [ ] |
| 46 | Pilot with real customers (50-100 users) | Operations | [ ] |
| 47 | Monitor success rates, latency, failure reasons | Engineering + Ops | [ ] |
| 48 | Full production rollout | All teams | [ ] |

### 18.6 Post-Go-Live

| # | Item | Owner | Frequency |
|---|------|-------|-----------|
| 49 | Monitor eSign success rate (target: >95%) | Ops + Engineering | Daily |
| 50 | Monitor ESP uptime and auto-switch events | Engineering | Daily |
| 51 | Review failed eSigns and root causes | Ops | Weekly |
| 52 | Replenish BharatStamp wallet | Finance | Monthly |
| 53 | Review Leegality invoices vs actual usage | Finance | Monthly |
| 54 | Check for SEBI circular updates affecting eSign | Compliance | Quarterly |
| 55 | Review and update templates if regulation changes | Product + Legal | As needed |
| 56 | Leegality API version upgrades | Engineering | As released |

---

## Appendix A: Error Codes

Common error scenarios based on Leegality support documentation:

| Error Code | Description | Resolution |
|-----------|-------------|------------|
| `ESP_EDD002` | ESP service error (NSDL/eMudhra) | Auto-retry; if persistent, check ESP status on Leegality dashboard |
| `AUTH_INVALID` | Invalid or expired Auth Token | Regenerate token from API Settings |
| `SIGNER_NOT_FOUND` | Signer details mismatch | Verify signer phone/email matches invitation |
| `OTP_EXPIRED` | OTP expired (typically 10 minutes) | Customer must request new OTP |
| `OTP_INVALID` | Wrong OTP entered | Allow retry (max 3 attempts) |
| `UIDAI_DOWN` | UIDAI authentication service unavailable | Leegality auto-switches ESP; if both down, retry after 15 min |
| `DOC_EXPIRED` | Signing link expired | Create new document and signing invitation |
| `STAMP_INSUFFICIENT` | Insufficient balance in stamp wallet | Replenish BharatStamp wallet |
| `IP_NOT_WHITELISTED` | API call from non-whitelisted IP | Add IP to whitelist in API Settings |

---

## Appendix B: Glossary

| Term | Definition |
|------|-----------|
| **ASP** | Application Service Provider -- entity that provides eSign interface to end users (Leegality/Grey Swift) |
| **ESP** | eSign Service Provider -- entity authorized by CCA to facilitate Aadhaar eSign (NSDL, C-DAC) |
| **CA** | Certifying Authority -- entity authorized to issue Digital Signature Certificates (NSDL, eMudhra, Verasys) |
| **CCA** | Controller of Certifying Authorities -- apex regulatory body under MeitY |
| **DSC** | Digital Signature Certificate -- cryptographic certificate for digital signing |
| **CAdES** | CMS Advanced Electronic Signatures -- signature format standard (RFC 5126) |
| **DDPI** | Demat Debit and Pledge Instruction -- replaced POA for stock broker operations |
| **SHCIL** | Stock Holding Corporation of India Limited -- central e-Stamp agency |
| **BharatStamp** | Leegality's digital stamping product covering 25+ Indian states |
| **Doc Signer** | Organizational DSC for automated broker-side signing |
| **QuickSign** | OTP-less digital acknowledgement for non-critical documents |
| **Virtual Sign** | Non-Aadhaar electronic signature via OTP + signature pad |
| **Secure Audit Trail** | Digitally signed log of all signing events (IP, timestamp, device, geolocation) |
| **Verifier API** | Post-signing API to detect tampering and verify signer identity |

---

## Appendix C: Data Mapping to Master Dataset

| Leegality Response Field | Master Dataset Field | Field ID | Section |
|-------------------------|---------------------|----------|---------|
| `data.documentStatus` | `esign_status` | R20 | R: Third-Party Results |
| `data.signers[].signedAt` | `esign_timestamp` | R21 | R: Third-Party Results |
| `data.signers[].signMethod` | `esign_method` | R22 | R: Third-Party Results |
| `data.signers[].espProvider` | `esign_esp` | R23 | R: Third-Party Results |
| `data.signers[].certificateDetails.serialNumber` | `esign_cert_serial` | R24 | R: Third-Party Results |
| `data.signers[].certificateDetails.issuer` | `esign_cert_issuer` | R25 | R: Third-Party Results |
| `data.stampDetails.stampId` | `estamp_id` | R26 | R: Third-Party Results |
| `data.stampDetails.state` | `estamp_state` | R27 | R: Third-Party Results |
| `data.stampDetails.denomination` | `estamp_denomination` | R28 | R: Third-Party Results |
| Signed PDF (binary) | e-Sign document | Q02 | Q: Documents |
| Audit Trail PDF (binary) | Audit trail document | Q03 | Q: Documents |
| `metadata.applicationId` | `application_id` | AA01 | AA: System |

> Cross-reference: See [KYC_MASTER_DATASET.md](../../KYC_MASTER_DATASET.md) for complete field specifications (field IDs R20-R28 should be added if not present).

# DigiLocker Integration Deep Dive
## For Indian Stock Broker KYC Onboarding

**Version**: 1.0
**Date**: 2026-02-13
**Companion to**: [VENDOR_INTEGRATIONS.md](../../VENDOR_INTEGRATIONS.md) (Section V2)

---

## Table of Contents

1. [DigiLocker Partner Integration](#1-digilocker-partner-integration)
2. [OAuth 2.0 Consent Flow](#2-oauth-20-consent-flow)
3. [Document Types Available for Broking KYC](#3-document-types-available-for-broking-kyc)
4. [Aadhaar eKYC via DigiLocker (SEBI IPV Exemption)](#4-aadhaar-ekyc-via-digilocker)
5. [NPCI e-KYC Setu (New - June 2025)](#5-npci-e-kyc-setu)
6. [Aadhaar Offline XML](#6-aadhaar-offline-xml)
7. [API Technical Details](#7-api-technical-details)
8. [Non-Individual Entities](#8-non-individual-entities)
9. [Data Privacy and Compliance](#9-data-privacy-and-compliance)
10. [Edge Cases and Fallbacks](#10-edge-cases-and-fallbacks)
11. [Recent Changes 2024-2026](#11-recent-changes-2024-2026)
12. [Aggregator Comparison (Direct vs Digio vs Decentro vs Setu)](#12-aggregator-comparison)

---

## 1. DigiLocker Partner Integration

### 1.1 What is DigiLocker?

DigiLocker is a flagship initiative of the Ministry of Electronics & IT (MeitY) under the Digital India programme. It is a platform for issuance and verification of documents and certificates digitally, operated by the National e-Governance Division (NeGD) under MeitY. As of December 2024, DigiLocker has 43.49 crore users with 9.4 billion document issuances facilitated.

**Key URLs**:
- Main portal: https://www.digilocker.gov.in
- Partner portal: https://partners.digilocker.gov.in/requester.php
- API Setu (data exchange backbone): https://apisetu.gov.in/digilocker
- Entity Locker (for businesses): https://entity.digilocker.gov.in
- MeriPehchaan (National SSO): https://digilocker.meripehchaan.gov.in

### 1.2 Becoming a Requester Entity (RE)

A **Requester Entity** is an organization that can access users' documents from their DigiLocker with the user's consent. For a stock broker, this is the relevant partner type.

**Onboarding Process (SOP)**:

| Step | Activity | Timeline | Details |
|------|----------|----------|---------|
| 1 | Partner Identification | Week 1 | Apply at https://partners.digilocker.gov.in/requester.php. Submit company details, use cases, expected volumes |
| 2 | Evaluation & Verification | Week 2-3 | DigiLocker BDM reviews use cases. Committee evaluates compliance and legitimacy |
| 3 | Agreement & NDA | Week 3-4 | Execute contract with NeGD, Non-Disclosure Agreement (NDA), and Integrity Pact as per NeGD format |
| 4 | Technical Integration | Week 4-8 | Receive comprehensive technical documentation, detailed APIs, and integration guidelines. OAuth 2.0 client credentials (client_id + client_secret) issued |
| 5 | Testing | Week 8-10 | **IMPORTANT**: DigiLocker does NOT have a sandbox environment. Testing is performed on a production account with test credentials |
| 6 | Launch | Week 10-12 | Go-live after DigiLocker technical team sign-off |
| 7 | Ongoing Support | Continuous | DigiLocker's Technical Onboarding Team provides ongoing assistance |

**Requirements**:
- Registered Indian entity (company/LLP/partnership)
- Valid use case for document verification (broking KYC qualifies)
- Technical team capable of OAuth 2.0 + REST API integration
- Compliance with Digital Locker Rules, 2016 and IT Act, 2000
- SEBI registration certificate (for broking entities)

**Documents Needed**:
- Certificate of Incorporation / Registration
- SEBI Registration Certificate
- Authorized signatory letter
- Technical contact details
- Use case description and expected API volumes
- Data privacy and security policy

### 1.3 Direct Partner vs Aggregator Approach

| Criterion | Direct DigiLocker Partner | Via Aggregator (Digio/Decentro/Setu) |
|-----------|--------------------------|--------------------------------------|
| **Onboarding Time** | 10-12 weeks (MeitY approval) | 1-2 weeks (aggregator already a partner) |
| **Technical Complexity** | High - build OAuth flow, handle tokens, parse XML | Low - single REST API call, JSON responses |
| **Cost per Transaction** | Free (DigiLocker APIs are free) | Rs 3-8 per transaction (aggregator markup) |
| **Sandbox** | No sandbox available | Aggregators provide sandbox environments |
| **Document Parsing** | Parse XML/PDF yourself | Pre-parsed structured JSON returned |
| **Aadhaar XML Decryption** | Build your own decryption | Aggregator handles decryption |
| **Uptime & Support** | Depends on DigiLocker infra | Aggregator provides SLA + retry logic |
| **Compliance Burden** | Direct audit by MeitY/NeGD | Aggregator handles MeitY compliance |
| **MeriPehchaan SSO** | Need to implement separately | Aggregators like Decentro support SSO stack |
| **Recommendation** | For 50K+ monthly verifications | For most startups and mid-size brokers |

**Verdict for a new broker**: Start with an aggregator (Digio or Setu) to get to market fast. Evaluate direct partnership once volumes exceed 50K/month to save per-transaction costs.

### 1.4 DigiLocker Gateway / API Setu

API Setu is the backbone of DigiLocker's data exchange. It provides:
- Standardized APIs for all DigiLocker issuers and requesters
- Document Central: standardized XML schemas for 70+ document types
- Global document type registry with doc_type codes and org_id mappings

**API Setu Portal**: https://apisetu.gov.in/digilocker
**API Directory**: https://directory.apisetu.gov.in/api-collection/digilocker
**Document Central (XML Formats)**: https://docs.apisetu.gov.in/document-central/dl-xml-format/

---

## 2. OAuth 2.0 Consent Flow

### 2.1 Flow Overview

DigiLocker uses OAuth 2.0 Authorization Code flow. The latest API version is v2.2 (October 2022) for the Authorized Partner API.

```
                                    DigiLocker OAuth 2.0 Flow
                                    =========================

User (Browser)          Broker App (Backend)         DigiLocker Server
     |                         |                            |
     | 1. Click "Fetch from    |                            |
     |    DigiLocker"          |                            |
     |------------------------>|                            |
     |                         |                            |
     |                         | 2. Build authorize URL     |
     |                         |    with client_id,         |
     |                         |    redirect_uri, state     |
     |                         |                            |
     | 3. Redirect to DigiLocker authorize page             |
     |<------------------------|                            |
     |                         |                            |
     |                  4. User sees DigiLocker login page   |
     |                     (MeriPehchaan SSO)                |
     |                     - Enter Aadhaar / Mobile          |
     |                     - OTP verification                |
     |                     - Consent screen                  |
     |                         |                            |
     | 5. User authorizes      |                            |
     |-------------------------------------------------->   |
     |                         |                            |
     |   6. Redirect back with auth_code                    |
     |<--------------------------------------------------|  |
     |------------------------>|                            |
     |                         |                            |
     |                         | 7. POST /oauth2/2/token    |
     |                         |    (auth_code + secret)    |
     |                         |--------------------------->|
     |                         |                            |
     |                         | 8. Receive access_token    |
     |                         |    + refresh_token         |
     |                         |<---------------------------|
     |                         |                            |
     |                         | 9. GET /user/details       |
     |                         |    (Bearer access_token)   |
     |                         |--------------------------->|
     |                         |                            |
     |                         | 10. User profile returned  |
     |                         |<---------------------------|
     |                         |                            |
     |                         | 11. GET /user/files        |
     |                         |    (list documents)        |
     |                         |--------------------------->|
     |                         |                            |
     |                         | 12. Document list returned |
     |                         |<---------------------------|
     |                         |                            |
     |                         | 13. GET /user/files/<uri>  |
     |                         |    (fetch specific doc)    |
     |                         |--------------------------->|
     |                         |                            |
     |                         | 14. Document data returned |
     |                         |<---------------------------|
     |                         |                            |
     | 15. Display result      |                            |
     |<------------------------|                            |
```

### 2.2 Key Endpoints

**API Version History**:
- v1.x: Legacy endpoints at `api.digitallocker.gov.in`
- v2.0: Added MeriPehchaan SSO, PKCE support (Feb 2021)
- v2.2: Current version (Oct 2022) at `digilocker.meripehchaan.gov.in`

| Endpoint | Method | URL Path | Purpose |
|----------|--------|----------|---------|
| **Authorize** | GET | `/public/oauth2/1/authorize` | Initiate OAuth flow, redirect user to DigiLocker consent page |
| **Token (v2)** | POST | `/oauth2/2/token` | Exchange auth_code for access_token. Authenticated with app key + secret |
| **User Details** | GET | `/public/oauth2/1/user/details` | Get user profile (name, DOB, DigiLocker ID, eAadhaar indicator) |
| **File List** | GET | `/public/oauth2/1/user/files` | List all issued documents in user's DigiLocker |
| **File Download** | GET | `/public/oauth2/1/user/files/{uri}` | Download a specific document (PDF/XML) |
| **e-Aadhaar XML** | GET | `/public/oauth2/1/xml/{uri}` | Get e-Aadhaar data in machine-readable XML format |
| **Refresh Token** | POST | `/oauth2/2/token` | Refresh access_token using refresh_token |

**Base URLs**:

| Environment | URL | Notes |
|-------------|-----|-------|
| Production (MeriPehchaan) | `https://digilocker.meripehchaan.gov.in` | Current production endpoint |
| Production (Legacy) | `https://api.digitallocker.gov.in` | Older endpoint, may still work |
| Sandbox | **None available** | DigiLocker does not provide a sandbox. Test on production |

### 2.3 Authorization Request

```
GET /public/oauth2/1/authorize
    ?response_type=code
    &client_id={YOUR_CLIENT_ID}
    &redirect_uri={YOUR_CALLBACK_URL}
    &state={RANDOM_STATE_STRING}
    &dl_flow=signup         (optional: force signup flow)
    &code_challenge={PKCE}  (optional: for mobile apps)
    &code_challenge_method=S256  (optional: PKCE method)
```

**Parameters**:
- `response_type`: Always `code`
- `client_id`: Issued during partner onboarding
- `redirect_uri`: Pre-registered callback URL (must match exactly)
- `state`: Anti-CSRF token, returned as-is in callback
- `dl_flow`: Optional. Set to `signup` to force DigiLocker account creation
- `code_challenge` / `code_challenge_method`: For PKCE flow (recommended for mobile)

### 2.4 User Consent Screen

When redirected, the user sees the MeriPehchaan / DigiLocker login page:

1. **Login Step**: User enters Aadhaar number / mobile number / username
2. **OTP Step**: OTP sent to Aadhaar-linked mobile number, user enters OTP
3. **PIN/CAPTCHA Step**: If DigiLocker account exists, user enters security PIN
4. **Consent Screen**: Shows the requesting entity name, documents being requested, and asks explicit consent
5. **Auto-Signup**: If user has no DigiLocker account, one is automatically created using Aadhaar OTP (the user signs up with Aadhaar number + OTP, and the account is created on-the-fly)

### 2.5 Callback and Token Exchange

**Callback** (user redirected to your `redirect_uri`):
```
GET {redirect_uri}?code={AUTH_CODE}&state={STATE}
```

**Token Exchange**:
```
POST /oauth2/2/token
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code
&code={AUTH_CODE}
&redirect_uri={YOUR_CALLBACK_URL}
&code_verifier={PKCE_VERIFIER}    (if PKCE was used)
```

**Authentication**: Either:
- HTTP Basic Auth: `Authorization: Basic base64(client_id:client_secret)`
- OR POST body params: `client_id={ID}&client_secret={SECRET}`

**Token Response**:
```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIs...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "refresh_token": "dGhpcyBpcyBhIH...",
  "digilocker_id": "DL-XXXXXXXXXXXX"
}
```

### 2.6 Token Lifecycle

| Token | Validity | Refresh Mechanism |
|-------|----------|-------------------|
| **Access Token** | ~3600 seconds (1 hour) | Use refresh_token to get new access_token |
| **Refresh Token** | ~30 days | Re-authorize (full OAuth flow) when expired |
| **Auth Code** | ~5 minutes | Single-use, exchange immediately for tokens |

**Refresh Token Request**:
```
POST /oauth2/2/token
Content-Type: application/x-www-form-urlencoded

grant_type=refresh_token
&refresh_token={REFRESH_TOKEN}
```

### 2.7 Scopes / Document Types Requestable

DigiLocker uses a doc_type + org_id system rather than traditional OAuth scopes. You can request:

| doc_type Code | Document | org_id (Issuer) |
|---------------|----------|-----------------|
| `ADHAR` | Aadhaar Card (e-Aadhaar) | UIDAI |
| `PANCR` | PAN Card | NSDL e-Gov (Income Tax Dept) |
| `DRVLC` | Driving License | State RTOs (varies by state) |
| `VOIID` | Voter ID (EPIC) | ECI (**Note: Not fetchable via API as of 2025**) |
| `PASPT` | Passport | MEA (Ministry of External Affairs) |
| `CLXMK` | Class X Marksheet | CBSE / State Boards |
| `CLXIIMK` | Class XII Marksheet | CBSE / State Boards |
| `VEHIC` | Vehicle Registration (RC) | State Transport Depts |
| `INSUR` | Insurance Policy | Various insurers |
| `EDCER` | Education Certificates | Universities (via NAD) |

There are **70+ document types** available in the DigiLocker ecosystem. The full list can be fetched via the Get Document Types API and is recommended to be cached locally due to the large response size.

---

## 3. Document Types Available for Broking KYC

### 3.1 Aadhaar (e-Aadhaar XML) - Primary Identity Document

**Issuer**: UIDAI (Unique Identification Authority of India)
**doc_type**: `ADHAR`
**Dedicated API**: Yes - separate eAadhaar API (not the generic document fetch)

**Fields Returned**:

| XML Element | Attribute | Field | Description | KYC Use |
|-------------|-----------|-------|-------------|---------|
| `Poi` | `name` | Full Name | As recorded in Aadhaar | Primary identity name |
| `Poi` | `dob` | Date of Birth | Format: DD-MM-YYYY or YYYY | Age verification, DOB matching |
| `Poi` | `gender` | Gender | M / F / T (Male/Female/Transgender) | Gender field |
| `Poi` | `e` | Email Hash | SHA256 hash of email + share phrase | Cannot be used directly - hashed |
| `Poi` | `m` | Mobile Hash | SHA256 hash of mobile + share phrase | Cannot be used directly - hashed |
| `Poa` | `co` | Care Of | S/O, D/O, W/O prefix | Relationship indicator |
| `Poa` | `house` | House No. | Building/house number | Address line 1 |
| `Poa` | `street` | Street | Street name | Address line 1 |
| `Poa` | `lm` | Landmark | Nearby landmark | Address line 2 |
| `Poa` | `loc` | Locality | Locality/sector name | Address line 2 |
| `Poa` | `vtc` | Village/Town/City | VTC name | City |
| `Poa` | `subdist` | Sub-District | Taluka/tehsil | Sub-district |
| `Poa` | `dist` | District | District name | District |
| `Poa` | `state` | State | State name | State |
| `Poa` | `country` | Country | Always "India" for resident Aadhaar | Country |
| `Poa` | `pc` | Pincode | 6-digit postal code | Pincode |
| `Poa` | `po` | Post Office | Post office name | Post office |
| `Pht` | (element body) | Photograph | Base64-encoded JPEG image | Face match, IPV |
| (root) | `referenceId` | Reference ID | Last 4 digits of Aadhaar + timestamp (YYYYMMDDHHMMSSmmm) | Masked Aadhaar reference |

**CRITICAL**: What you do NOT get:
- **Full Aadhaar number** - Only last 4 digits available in the `referenceId` field. Full Aadhaar number is never returned via DigiLocker APIs. This is by design per the Aadhaar Act.
- **Email in plain text** - Only SHA256 hash provided
- **Mobile in plain text** - Only SHA256 hash provided
- **Biometrics** - Only photograph is returned, no fingerprint or iris data

**XML Schema**:
```xml
<OfflinePaperlessKyc referenceId="XXXX20260213153045123">
  <UidData>
    <Poi name="RAKESH KUMAR" dob="01-01-1990" gender="M"
         e="a1b2c3d4e5f6..." m="f6e5d4c3b2a1..." />
    <Poa co="S/O SURESH KUMAR"
         house="123" street="MG Road" lm="Near Temple"
         loc="Sector 5" vtc="Gurgaon" subdist="Gurgaon"
         dist="Gurgaon" state="Haryana" country="India"
         pc="122001" po="Gurgaon GPO" />
    <Pht>BASE64_ENCODED_JPEG_PHOTO_STRING</Pht>
  </UidData>
  <Signature>DIGITAL_SIGNATURE_BY_UIDAI</Signature>
</OfflinePaperlessKyc>
```

### 3.2 PAN Card

**Issuer**: Income Tax Department (via NSDL e-Governance / Protean)
**doc_type**: `PANCR`

**Fields Returned**:

| Field | Description | KYC Use |
|-------|-------------|---------|
| PAN Number | 10-character alphanumeric (e.g., ABCDE1234F) | Primary financial identifier |
| Full Name | Name as on PAN card | Name verification |
| Father's Name | Father's name as recorded | Additional identity verification |
| Date of Birth | DOB as recorded | DOB cross-verification |
| Gender | M/F | Gender field |

**DigiLocker PAN vs NSDL PAN Verification**:

| Aspect | DigiLocker PAN | NSDL PAN Verification (Protean API) |
|--------|---------------|-------------------------------------|
| **Source** | Income Tax Department via DigiLocker | NSDL/Protean directly |
| **What you get** | Full PAN card document (PDF + XML) with name, father's name, DOB | Status code (E/F/X/D/N) + name match result |
| **Aadhaar-PAN Link** | Not checked | Can verify Aadhaar-PAN link status |
| **Photo** | PAN card image (if available) | No photo |
| **User Action** | User must authenticate via DigiLocker (Aadhaar OTP) | No user action needed - backend API call |
| **Use Case** | Document fetch + identity verification | PAN validity check + seeding status |
| **Cost** | Free (via DigiLocker) or Rs 3-5 (via aggregator) | Rs 1-3 per verification |
| **Recommendation** | Use for document copy + name/DOB extraction | Use for PAN status verification + Aadhaar-PAN link check |

**Both are needed**: DigiLocker for fetching the PAN document + NSDL API for PAN status verification (E/F status) and Aadhaar-PAN link check.

### 3.3 Driving License

**Issuer**: State RTOs (Regional Transport Offices) - org_id varies by state
**doc_type**: `DRVLC`

**Fields Returned**:

| Field | Description | KYC Use |
|-------|-------------|---------|
| DL Number | Driving license number (format: XX-YYZZZZ/NNNNN) | Secondary ID proof |
| Full Name | Name as on DL | Name cross-verification |
| Date of Birth | DOB as recorded | DOB verification |
| Address | Full address as on DL | Address proof (secondary) |
| Issue Date | Date of issue | Document validity |
| Validity / Expiry Date | Valid until date | Ensure not expired |
| Vehicle Classes | Authorized vehicle classes (LMV, HMV, etc.) | Not KYC-relevant |
| Blood Group | Blood group (if recorded) | Not KYC-relevant |
| Issuing Authority | RTO name and code | Issuer verification |

**Important**: Not all state RTOs are integrated with DigiLocker. The `org_id` differs by state. Some states may return "No record available" if their RTO database is not connected.

### 3.4 Voter ID (EPIC)

**Issuer**: Election Commission of India (ECI)
**doc_type**: `VOIID`

**IMPORTANT LIMITATION**: As of 2025, the Election Commission of India (ECI) does **NOT** allow DigiLocker to access voter IDs through the API. Voter ID can be stored in DigiLocker's "Drive" section (manual upload) but **cannot be fetched programmatically** via the Requester API.

**Fallback**: Accept voter ID as a manual upload / physical document scan and verify via ECI's NVSP portal or OCR.

### 3.5 Passport

**Issuer**: Ministry of External Affairs (MEA) via Passport Seva
**doc_type**: `PASPT`

**Fields Returned**:
- Passport Number
- Full Name
- Date of Birth
- Nationality
- Issue Date / Expiry Date
- Place of Issue

**Note**: Passport is integrated with DigiLocker via Passport Seva. The user must have linked their passport to DigiLocker.

### 3.6 CKYC Record

**Cannot be fetched via DigiLocker**. CKYC (Central KYC) is maintained by CERSAI and requires separate integration via CKYC APIs (Search + Download + Upload). DigiLocker does not serve as a channel for CKYC records.

### 3.7 Other Documents (Not Directly KYC-Relevant but Available)

- Class X / XII Marksheets (CBSE, state boards) - useful for DOB verification in edge cases
- Vehicle Registration Certificate (RC)
- Insurance Policies
- University Degrees (via NAD - National Academic Depository)
- Income Tax Returns (ITR-V) - some issuers are integrated
- EPFO documents (UAN, passbook)

---

## 4. Aadhaar eKYC via DigiLocker

### 4.1 SEBI IPV Exemption - The Critical Benefit

This is the single most important regulatory benefit of DigiLocker for broker KYC: **exemption from In-Person Verification (IPV) / Video IPV (VIPV)**.

**SEBI Circular**: `SEBI/HO/MIRSD/DOP/CIR/P/2020/73` dated April 24, 2020

**Key Provision** (Paragraph 3.v):
> IPV/VIPV shall not be required by the Registered Intermediary (RI) where:
> - The KYC of the investor is completed using Aadhaar authentication/verification of UIDAI; OR
> - When the KYC form has been submitted online and documents have been provided through DigiLocker or any other source which could be verified online

**Consolidated in Master Circular**: `SEBI/HO/MIRSD/SECFATF/P/CIR/2023/169` dated October 12, 2023 - Master Circular on Know Your Client (KYC) norms for the securities market

**What This Means for Broker KYC**:
- If you fetch Aadhaar from DigiLocker and use it as the OVD (Officially Valid Document), you do NOT need to conduct Video IPV
- This saves Rs 15-40 per customer (cost of VIPV via HyperVerge/Digio)
- This removes the user friction of video call / selfie recording
- This significantly improves conversion rates (VIPV drop-off is typically 15-25%)

### 4.2 What Constitutes Valid DigiLocker-Based eKYC for SEBI

For the IPV exemption to apply:

1. **Document Source**: The Aadhaar (or other OVD) must be fetched directly from DigiLocker (not manually uploaded)
2. **Digital Signature**: The document must be digitally signed by the issuing authority (UIDAI for Aadhaar). DigiLocker-issued documents carry the issuer's digital signature
3. **Consent**: The user must have explicitly consented to sharing the document through the DigiLocker consent flow
4. **Online Submission**: The entire KYC form must have been submitted online (not physical)
5. **OVD Acceptance**: A digitally signed Aadhaar issued to DigiLocker by UIDAI is treated as an OVD under eSign of the client

### 4.3 Fields Harvested for KYC

From the Aadhaar XML fetched via DigiLocker, the following KYC fields are populated:

| # | KYC Field | Source XML | Mandatory for KRA | Notes |
|---|-----------|-----------|-------------------|-------|
| 1 | Full Name | `Poi.name` | Yes | Primary name for all registrations |
| 2 | Date of Birth | `Poi.dob` | Yes | DD-MM-YYYY format. Some old records may only have YYYY |
| 3 | Gender | `Poi.gender` | Yes | M/F/T |
| 4 | House/Building No. | `Poa.house` | Yes (part of address) | Address Line 1 component |
| 5 | Street | `Poa.street` | Yes (part of address) | Address Line 1 component |
| 6 | Landmark | `Poa.lm` | No | Address Line 2 component |
| 7 | Locality/Sector | `Poa.loc` | Yes (part of address) | Address Line 2 component |
| 8 | Village/Town/City | `Poa.vtc` | Yes | City field |
| 9 | Sub-District | `Poa.subdist` | No | Taluka/tehsil |
| 10 | District | `Poa.dist` | Yes | District |
| 11 | State | `Poa.state` | Yes | State |
| 12 | Pincode | `Poa.pc` | Yes | 6-digit postal code |
| 13 | Post Office | `Poa.po` | No | Post office name |
| 14 | Country | `Poa.country` | Yes | Always "India" for resident Aadhaar |
| 15 | Care Of (C/O) | `Poa.co` | No | Father/husband relationship prefix |
| 16 | Photograph | `Pht` (Base64 JPEG) | Yes (for face match) | Used for face matching with live selfie |
| 17 | Masked Aadhaar | `referenceId` (last 4 digits) | Yes (masked) | Only last 4 digits. Full number CANNOT be stored per Aadhaar Act |
| 18 | Email Hash | `Poi.e` | No | SHA256 hash - cannot extract plain text |
| 19 | Mobile Hash | `Poi.m` | No | SHA256 hash - cannot extract plain text |
| 20 | Digital Signature | `Signature` element | Yes (for validation) | UIDAI's digital signature for authenticity verification |

### 4.4 Photo Extraction for Face Matching

The `<Pht>` element contains a Base64-encoded JPEG photo which can be:
1. Decoded from Base64 to a JPEG image file
2. Sent to HyperVerge / Digio face match API along with a live selfie
3. Used for SEBI-mandated face matching (required even with IPV exemption)
4. Stored (encrypted) as part of KYC records

**Sample Extraction (Python)**:
```python
import base64
from lxml import etree

tree = etree.parse("aadhaar.xml")
photo_b64 = tree.find(".//Pht").text
photo_bytes = base64.b64decode(photo_b64)

with open("aadhaar_photo.jpg", "wb") as f:
    f.write(photo_bytes)
```

---

## 5. NPCI e-KYC Setu

### 5.1 Overview

NPCI formally introduced the e-KYC Setu facility via notification `NPCI/2024-25/e-KYC/003` dated March 10, 2025. SEBI approved its use for registered intermediaries in June 2025.

**SEBI Press Release**: [Registered Intermediaries are allowed to use e-KYC Setu System](https://www.sebi.gov.in/media-and-notifications/press-releases/jun-2025/registered-intermediaries-are-allowed-to-use-e-kyc-setu-system-of-national-payments-corporation-of-india-to-perform-aadhaar-based-e-kyc-authentication-for-ease-of-doing-business_94904.html)

**Key Advantage**: Aadhaar-based e-KYC **without disclosing the Aadhaar number** to the requesting entity (the broker). The broker never sees, stores, or processes the actual Aadhaar number.

### 5.2 How It Works - Technical Flow

```
Customer              Broker App           NPCI e-KYC Setu        UIDAI
   |                      |                      |                   |
   | 1. Initiate KYC      |                      |                   |
   |--------------------->|                      |                   |
   |                      |                      |                   |
   |                      | 2. Redirect to NPCI  |                   |
   |                      |  (Web URL) or invoke |                   |
   |                      |  SDK (Android)       |                   |
   |                      |--------------------->|                   |
   |                      |                      |                   |
   |     3. NPCI page: Enter Aadhaar + OTP       |                   |
   |     (or Face Auth via SDK)                   |                   |
   |<---------------------------------------------|                   |
   |                      |                      |                   |
   | 4. User enters       |                      |                   |
   |    Aadhaar + OTP     |                      |                   |
   |--------------------------------------------->|                   |
   |                      |                      |                   |
   |                      |                      | 5. Forward to     |
   |                      |                      |    UIDAI (without |
   |                      |                      |    revealing      |
   |                      |                      |    Aadhaar to RE) |
   |                      |                      |------------------>|
   |                      |                      |                   |
   |                      |                      | 6. UIDAI verifies |
   |                      |                      |    + returns eKYC |
   |                      |                      |<------------------|
   |                      |                      |                   |
   |                      | 7. Return masked     |                   |
   |                      |    demographic data  |                   |
   |                      |    + photo (if req)  |                   |
   |                      |<---------------------|                   |
   |                      |                      |                   |
   | 8. KYC Complete      |                      |                   |
   |<---------------------|                      |                   |
```

### 5.3 Integration Methods

| Method | Description | Use Case |
|--------|-------------|----------|
| **Web Redirect** | RE redirects user to NPCI's web page for Aadhaar input + OTP | Desktop web, mobile web |
| **Android SDK** | Native SDK for Android apps with OTP + Face Auth | Mobile app |
| **Authentication Modes** | Aadhaar OTP, UIDAI Face Authentication | Both supported |

### 5.4 What Data Is Returned

- **Masked demographic data**: Name, DOB, gender, address (with masked Aadhaar number)
- **Photo**: UIDAI photo (if requested)
- **NOT returned**: Full Aadhaar number, biometrics (fingerprint/iris)

### 5.5 Key Regulatory Advantage - No Section 11A Gazette Notification

Under Aadhaar Act Section 11A, any entity wanting to perform Aadhaar authentication needs a Central Government Gazette notification. Obtaining this individually is expensive and time-consuming.

With e-KYC Setu: **Any regulated entity onboarded by NPCI is deemed to have Central Government authorization** to use Aadhaar authentication for KYC purposes. They need not obtain their own Gazette notification under Section 11A, provided authentication is carried out strictly via NPCI's e-KYC Setu platform.

This is a massive compliance simplification.

### 5.6 Onboarding Process

1. Email `ekycservices@npci.org.in` expressing interest
2. NPCI provides onboarding documentation and integration kit
3. Single-window onboarding process
4. Receive technical documentation, SDKs, and security guidelines
5. Integration and testing
6. Go-live

### 5.7 e-KYC Setu vs DigiLocker - Complementary, Not Alternative

| Aspect | NPCI e-KYC Setu | DigiLocker |
|--------|----------------|------------|
| **Primary Function** | Aadhaar identity authentication | Document fetch with consent |
| **Aadhaar Number** | Never shared with RE | Not shared (only last 4 digits in reference) |
| **Section 11A** | Exempted via NPCI | Not applicable (document sharing, not authentication) |
| **Documents** | Aadhaar eKYC data only | 70+ document types (Aadhaar, PAN, DL, etc.) |
| **User Experience** | NPCI page (OTP/Face Auth) | DigiLocker login (Aadhaar OTP + PIN) |
| **Photo** | Yes (from UIDAI) | Yes (from Aadhaar XML) |
| **PAN/DL/Other Docs** | No | Yes |
| **IPV Exemption** | Yes (Aadhaar authentication) | Yes (SEBI circular 2020/73) |
| **Conversion Rate** | Better (simpler flow) | Lower (~60% typical) |
| **Cost** | NPCI pricing (contact for details) | Free (direct) or Rs 3-8 (aggregator) |

**Recommendation**: Use **both** complementarily:
- e-KYC Setu for Aadhaar identity authentication (faster, privacy-first, IPV exempt)
- DigiLocker for fetching PAN card, driving license, and other supporting documents

---

## 6. Aadhaar Offline XML

### 6.1 What Is It?

Aadhaar Offline XML is a downloadable, digitally signed XML document that users can generate from UIDAI's portal or the mAadhaar app. It was introduced after the Supreme Court's 2018 judgment (Puttaswamy case) that restricted Aadhaar eKYC use by private entities.

**Sources**:
- UIDAI Resident Portal: https://resident.uidai.gov.in (download XML)
- mAadhaar App: Available on Android/iOS

### 6.2 Generation Process

1. User visits https://myaadhaar.uidai.gov.in or opens mAadhaar app
2. Enters Aadhaar number + captcha
3. OTP sent to registered mobile
4. User enters OTP
5. Creates a **share code** (4-digit numeric passphrase)
6. Downloads ZIP file containing the XML
7. ZIP file is password-protected with the share code

**Validity**: The XML generation timestamp must be **within 3 days** of KYC verification per SEBI rules.

### 6.3 XML Structure and Fields

Same structure as DigiLocker Aadhaar XML (Section 3.1). The Offline XML contains:

```xml
<OfflinePaperlessKyc referenceId="XXXX20260213153045123">
  <UidData>
    <Poi name="RAKESH KUMAR" dob="01-01-1990" gender="M"
         e="SHA256_HASH" m="SHA256_HASH" />
    <Poa co="S/O SURESH KUMAR" house="123" street="MG Road"
         lm="Near Temple" loc="Sector 5" vtc="Gurgaon"
         subdist="Gurgaon" dist="Gurgaon" state="Haryana"
         country="India" pc="122001" po="Gurgaon GPO" />
    <Pht>BASE64_ENCODED_PHOTO</Pht>
  </UidData>
  <Signature xmlns="http://www.w3.org/2000/09/xmldsig#">
    <SignedInfo>...</SignedInfo>
    <SignatureValue>344_CHAR_DIGITAL_SIGNATURE</SignatureValue>
    <KeyInfo>...</KeyInfo>
  </Signature>
</OfflinePaperlessKyc>
```

**Key Attributes**:
- `referenceId`: Last 4 digits of Aadhaar + timestamp in YYYYMMDDHHMMSSmmm format
- `Poi.e` (email hash): `SHA256(SHA256(email + SharePhrase)) * N` where N = last digit of Aadhaar number (or 1 if last digit is 0)
- `Poi.m` (mobile hash): Same logic as email hash but with mobile number
- `Signature.s`: 344-character digital signature value
- Photo `Pht`: Base64-encoded JPEG

### 6.4 Decryption and Validation Process

**Step 1: Unzip**
```python
import zipfile

# ZIP password is the share code (4-digit passphrase)
with zipfile.ZipFile("aadhaar_offline.zip", "r") as z:
    z.extractall(pwd=share_code.encode())
```

**Step 2: Validate Digital Signature**
```
Algorithm: SHA256withRSA
Inputs:
  1. Signature value (from <s> tag or <SignatureValue>)
  2. XML content without the <Signature> element
  3. UIDAI public key (downloadable from https://uidai.gov.in)

Validation:
  - Parse the XML, extract the <Signature> element
  - Compute SHA256 hash of the remaining XML
  - Verify RSA signature using UIDAI's public key
  - If valid: document is authentic and untampered
```

**Step 3: Verify Email/Mobile Hash (Optional)**
```python
import hashlib

# To verify if a known email matches the hash
def verify_email(email, share_code, aadhaar_last_digit):
    combined = email + share_code
    hash_val = hashlib.sha256(combined.encode()).hexdigest()
    iterations = aadhaar_last_digit if aadhaar_last_digit != 0 else 1
    for _ in range(iterations - 1):
        hash_val = hashlib.sha256(hash_val.encode()).hexdigest()
    return hash_val
```

**Step 4: Calculate HMAC for Integrity**
After downloading the file data, calculate the HMAC and compare with the provided HMAC to ensure data integrity.

### 6.5 Offline XML vs Online DigiLocker eKYC

| Aspect | Offline XML | DigiLocker Online |
|--------|------------|-------------------|
| **User Action** | Download XML from UIDAI, enter share code | Login to DigiLocker, consent |
| **Freshness** | Must be within 3 days (SEBI rule) | Real-time from UIDAI database |
| **Full Aadhaar** | Only last 4 digits | Only last 4 digits |
| **Digital Signature** | UIDAI signature present | UIDAI signature present |
| **Requires** | Share code from user | DigiLocker account (auto-created if needed) |
| **Friction** | Higher (download + upload + share code) | Medium (DigiLocker login + consent) |
| **License** | No AUA/KUA needed | No license needed (via partner API) |
| **Cost** | Free | Free (direct) or Rs 3-8 (aggregator) |
| **IPV Exemption** | Yes (SEBI 2020/73) | Yes (SEBI 2020/73) |

### 6.6 Via Digio - Offline XML Processing

**API Docs**: https://documentation.digio.in/digikyc/aadhaar_offline/

**Flow**:
1. User downloads Aadhaar XML from UIDAI portal or mAadhaar app
2. User uploads the ZIP file to broker app
3. Broker sends the ZIP file + share phrase to Digio API
4. Digio performs:
   - Unzips using share code
   - Validates UIDAI digital signature
   - Extracts all identity fields
   - Decodes photo from Base64
5. Returns structured JSON response:

```json
{
  "id": "DIG-XXXXX",
  "status": "success",
  "data": {
    "name": "RAKESH KUMAR",
    "date_of_birth": "1990-01-01",
    "gender": "Male",
    "care_of": "S/O SURESH KUMAR",
    "address": {
      "house": "123",
      "street": "MG Road",
      "landmark": "Near Temple",
      "locality": "Sector 5",
      "vtc": "Gurgaon",
      "sub_district": "Gurgaon",
      "district": "Gurgaon",
      "state": "Haryana",
      "pincode": "122001",
      "country": "India"
    },
    "photo": "BASE64_JPEG_STRING",
    "masked_aadhaar": "XXXX XXXX 5678",
    "xml_generation_date": "2026-02-13",
    "signature_valid": true
  }
}
```

---

## 7. API Technical Details

### 7.1 Direct DigiLocker API

**Base URLs**:

| Environment | Base URL |
|-------------|----------|
| Production (Current) | `https://digilocker.meripehchaan.gov.in` |
| Production (Legacy) | `https://api.digitallocker.gov.in` |
| Sandbox | **Not available** |

**Authentication Headers**:
```
Authorization: Bearer {access_token}
```
For token endpoint:
```
Authorization: Basic {base64(client_id:client_secret)}
Content-Type: application/x-www-form-urlencoded
```

**Request/Response Format**: JSON for most APIs, XML for eAadhaar data

### 7.2 Via Setu (Aggregator)

**Base URLs**:

| Environment | Base URL |
|-------------|----------|
| Sandbox | `https://dg-sandbox.setu.co/api/digilocker` |
| Production | `https://dg.setu.co/api/digilocker` |

**Authentication**:
```
x-client-id: {setu_client_id}
x-client-secret: {setu_client_secret}
x-product-instance-id: {product_instance_id}
```

**Key Endpoints**:

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `POST /api/digilocker` | POST | Create DigiLocker request (returns `id` + redirect URL) |
| `GET /api/digilocker/{id}` | GET | Get request status |
| `GET /api/digilocker/{id}/aadhaar` | GET | Fetch Aadhaar data (JSON + XML) |
| `GET /api/digilocker/{id}/document/{doc_type}` | GET | Fetch specific document |

**Create Request**:
```json
POST /api/digilocker
{
  "redirectUrl": "https://broker.example.com/callback"
}
```

**Response**:
```json
{
  "id": "req_XXXXX",
  "status": "initiated",
  "url": "https://digilocker.meripehchaan.gov.in/...",
  "validUpto": "2026-02-13T16:00:00Z"
}
```

### 7.3 Via Decentro (Aggregator)

**Base URLs**:

| Environment | Base URL |
|-------------|----------|
| Staging | `https://in.staging.decentro.tech` |
| Production | `https://in.decentro.tech` |

**Key Endpoints**:

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `POST /v2/kyc/digilocker/initiate_session` | POST | Initiate DigiLocker session |
| `POST /v2/kyc/digilocker/generate_access_token` | POST | Generate access token from auth code |
| `GET /v2/kyc/digilocker/get_issued_files` | GET | List user's issued documents |
| `GET /v2/kyc/digilocker/get_e_aadhaar` | GET | Download e-Aadhaar XML |
| `GET /v2/kyc/digilocker/get_file_data` | GET | Download specific document |

**Authentication**:
```
client_id: {decentro_client_id}
client_secret: {decentro_client_secret}
module_secret: {kyc_module_secret}
```

**SSO DigiLocker APIs** (MeriPehchaan stack):
Decentro also offers SSO DigiLocker APIs that use the latest MeriPehchaan stack:
- `POST /v2/kyc/sso_digilocker/initiate_session` - SSO-based session
- Additional document pull and data access APIs

### 7.4 Via Digio (Aggregator)

**API Docs**: https://documentation.digio.in/digikyc/digilocker/

**Authentication**: `Authorization: Basic base64(client_id:client_secret)`

**Key APIs**:

| API | Purpose |
|-----|---------|
| Create DigiLocker Request | Start the consent flow, get redirect URL |
| Get User Details | Retrieve user name, ID, Aadhaar availability |
| Get Document List | List all government-issued documents in wallet |
| Get Aadhaar XML Data | Fetch Aadhaar KYC data (name, DOB, gender, address, photo) |
| Upload to DigiLocker | Save file to user's DigiLocker (JPG/JPEG/PNG/PDF, max 10MB) |

### 7.5 Error Codes

**DigiLocker Native Error Codes**:

| Error Code | HTTP Status | Description |
|------------|-------------|-------------|
| `invalid_token` | 401 | Invalid or expired access token |
| `uri_missing` | 400 | URI parameter missing in request |
| `insufficient_scope` | 403 | Request requires higher privileges |
| `invalid_uri` | 404 | No file found for given URI |
| `repository_service_exception` | 530 | Internal server error at DigiLocker |
| `invalid_app_hash` | 400 | App hash does not match |
| `invalid_app_id` | 400 | App ID not recognized |
| `unregistered_app_domain` | 400 | Callback domain not registered |
| `timestamp_expired` | 400 | Timestamp older than 30 minutes |
| `authorization_failed` | 401 | Authorization check failed |

**Setu DigiLocker Error Codes**:

| Error Code | Description |
|------------|-------------|
| `invalid_redirect_url` | Redirect URL not properly formatted |
| `session_expired` | DigiLocker session has expired |
| `user_denied_consent` | User denied the consent on DigiLocker |
| `document_not_available` | Requested document not in user's DigiLocker |
| `aadhaar_not_available` | eAadhaar not available for this account |
| `upstream_error` | DigiLocker server returned an error |

### 7.6 Rate Limits

DigiLocker does not publish formal rate limits in their API documentation. However:
- Aggregators (Setu, Decentro) impose their own rate limits based on plan
- Best practice: Implement exponential backoff for 429/5xx responses
- DigiLocker infra can be slow during peak hours (10 AM - 2 PM IST)

### 7.7 Webhook/Async Callbacks

DigiLocker's direct API is **synchronous** (request-response). There are no native webhook callbacks.

However, aggregators provide callback mechanisms:
- **Setu**: Provides webhook notifications when the DigiLocker flow is completed by the user
- **Decentro**: Polling-based or callback URL for session completion
- **Digio**: Callback URL when user completes DigiLocker consent

---

## 8. Non-Individual Entities

### 8.1 Entity Locker (Corporate DigiLocker)

MeitY launched **Entity Locker** for businesses in 2023. It is separate from individual DigiLocker.

**Portal**: https://entity.digilocker.gov.in

**Supported Entity Types**:
- Corporations (CIN-linked)
- MSMEs
- Startups
- Trusts
- Societies
- LLPs

**Features**:
- Real-time access to government databases
- Consent-based information sharing
- Aadhaar-authenticated role-based access
- 10 GB encrypted cloud storage
- Legally valid digital signatures

**Entity Locker API Specification**: v1.0 (October 2024)
- OAuth 2.0 with PKCE support
- Entity-level authentication (not individual)
- CIN-based document issuance

### 8.2 HUF (Hindu Undivided Family)

- The Karta (head of HUF) can use their personal DigiLocker for identity verification
- HUF PAN and Karta PAN are separate - only Karta's Aadhaar can be fetched via DigiLocker
- HUF does not have its own DigiLocker account
- Karta's individual DigiLocker documents used for KYC + HUF PAN card uploaded separately

### 8.3 NRI (Non-Resident Indian)

**DigiLocker works for NRIs with conditions**:
- NRI must have an Indian mobile number linked to Aadhaar (required for OTP)
- NRI must have an active Aadhaar number (not deactivated due to non-usage)
- If NRI doesn't have an Indian mobile number, they can contact DigiLocker Support with authenticated documents
- OCI (Overseas Citizen of India) and PIO (Person of Indian Origin) cards are NOT available via DigiLocker
- Passport can be fetched if linked

**Practical limitation**: Many NRIs don't have active Indian mobile numbers, making DigiLocker flow impractical. Fallback to manual document upload for NRI KYC.

### 8.4 Entity Types That CANNOT Use DigiLocker

| Entity Type | DigiLocker | Alternative |
|-------------|-----------|-------------|
| Foreign Nationals (FII/FPI) | No | Manual document upload |
| NRI without Indian mobile | No | Manual upload + consulate attestation |
| Trusts (for trust-level docs) | Entity Locker | Entity Locker API (v1.0) |
| Partnership Firms | Entity Locker | Entity Locker or manual |
| Minor accounts (below 18) | Limited | Guardian's DigiLocker |

---

## 9. Data Privacy and Compliance

### 9.1 Legal Framework

| Regulation | Relevance |
|-----------|-----------|
| **Information Technology Act, 2000** | DigiLocker operates under Section 2(t) - electronic records. IT (Preservation and Retention of Information by Intermediaries providing Digital Locker facilities) Rules, 2016 |
| **Digital Locker Rules, 2016** (Rule 9A) | Documents issued via DigiLocker are deemed at par with original physical documents. No sharing without explicit consent |
| **Aadhaar (Targeted Delivery of Financial & Other Subsidies, Benefits and Services) Act, 2016** | Sections 28, 29, 37, 38 - restrictions on storage and use of Aadhaar data |
| **Digital Personal Data Protection Act (DPDPA), 2023** | Applies to all personal data processing including DigiLocker data |
| **SEBI KYC Master Circular, 2023** | Governs how intermediaries handle KYC data including DigiLocker-sourced data |

### 9.2 Aadhaar Act Restrictions (Critical for Brokers)

**Section 29 - Restriction on Sharing Information**:
- Core biometric information (fingerprint, iris) must NOT be shared or used for any purpose other than Aadhaar authentication
- Aadhaar number, demographic information, or photograph must NOT be published, displayed, or posted publicly
- Identity information must NOT be used for any purpose other than what is specified to the individual
- Must NOT be shared further without individual's consent

**Section 37 - Penalty for Unauthorized Disclosure**:
- Imprisonment up to 3 years OR fine up to Rs 10,000 (individual)
- Fine up to Rs 1,00,000 (company)

**Section 38 - Penalty for Unauthorized Access**:
- Imprisonment up to 3 years AND fine not less than Rs 10,00,000

**SEBI Rule**: SEBI registered intermediaries CANNOT store/save the Aadhaar number of investors in their systems. Only the masked Aadhaar (last 4 digits) can be stored.

### 9.3 Consent Management

**User Consent Dashboard**:
- DigiLocker provides a "My Consent" dashboard
- Users can see which apps have access to their documents
- Users can cancel access anytime with a single click
- Users can set time limits for consent

**Consent Revocation**:
- When user revokes consent, the app's access is instantly stopped
- Stored tokens become redundant and useless
- App cannot fetch anything new from user's account
- Broker must handle consent revocation gracefully (mark DigiLocker data as "consent-revoked" but may retain for regulatory compliance period)

### 9.4 Data Retention Rules

| Data Type | Retention Rule | Source |
|-----------|---------------|--------|
| KYC records | 5 years after account closure | PMLA Rules |
| Aadhaar number (full) | MUST NOT be stored | Aadhaar Act Section 29 |
| Aadhaar masked (last 4) | Can be stored | SEBI circular |
| Aadhaar photo | Can be stored (encrypted) | For face match records |
| Documents fetched via DigiLocker | As per KYC retention | SEBI + PMLA |
| OAuth tokens | Discard after session | Security best practice |
| Consent records | 8 years | DPDPA, 2023 |

### 9.5 Implementation Best Practices

1. **Never store full Aadhaar number** - Mask to last 4 digits immediately upon receipt
2. **Encrypt at rest** - All DigiLocker-sourced data must be AES-256 encrypted in database
3. **Log consent** - Record timestamp, scope, and duration of every consent
4. **Audit trail** - Every access to DigiLocker data must be logged with user, timestamp, purpose
5. **Consent revocation handling** - Build webhook/polling to detect when user revokes consent on DigiLocker
6. **Data minimization** - Only fetch document types actually needed for KYC
7. **Token security** - Never log or store access_tokens/refresh_tokens in plain text

---

## 10. Edge Cases and Fallbacks

### 10.1 User Does Not Have a DigiLocker Account

**Not a blocker**. DigiLocker automatically creates an account during the consent journey:
- User is redirected to DigiLocker
- DigiLocker detects no existing account
- User enters Aadhaar number
- OTP sent to Aadhaar-linked mobile
- After OTP verification, account is created on-the-fly
- User proceeds with consent flow immediately

**Condition**: User must have a mobile number registered with Aadhaar.

### 10.2 Document Not Available in DigiLocker

Common reasons:
- Issuer (e.g., state RTO) not integrated with DigiLocker
- User has never fetched/linked the document
- Document data mismatch at issuer end (name mismatch)

**Fallback Strategy**:
```
1. Try DigiLocker fetch
2. If document not found:
   a. Prompt user to manually fetch document in DigiLocker app first
   b. If still not available: Accept manual document upload (photo/scan)
   c. Run OCR (HyperVerge) on uploaded document
   d. Verify authenticity via issuer API where available (e.g., NSDL for PAN)
```

### 10.3 Aadhaar Address Mismatch with Current Address

Very common - Aadhaar address is often the permanent/hometown address, not the current city.

**Handling**:
1. Fetch Aadhaar from DigiLocker -> Use as **permanent address**
2. Ask user for **correspondence address** separately
3. If correspondence address differs from Aadhaar:
   - Accept additional address proof (utility bill, rent agreement, bank statement)
   - Mark as "address mismatch - additional proof collected"
4. For KRA/CKYC upload: Submit both addresses (permanent from Aadhaar, correspondence from user)
5. SEBI allows different permanent and correspondence addresses

### 10.4 Name Mismatch Between Aadhaar and PAN

Common issue: middle name, initials, spelling variations.

**Handling**:
1. Fetch both Aadhaar (from DigiLocker) and PAN (from DigiLocker or NSDL)
2. Run fuzzy name matching (Levenshtein distance, Jaro-Winkler)
3. Thresholds:
   - >85% match: Auto-accept
   - 60-85% match: Flag for manual review by KYC admin
   - <60% match: Reject, ask user to update name on one of the documents
4. Common patterns to handle:
   - "RAKESH KUMAR" vs "RAKESH K" (initial vs full name)
   - "SHARMA RAKESH" vs "RAKESH SHARMA" (order swap)
   - "MOHAMMED" vs "MOHAMMAD" (transliteration variants)

### 10.5 DigiLocker Downtime Handling

DigiLocker can experience downtime, especially during peak hours.

**Strategy**:
1. Implement retry with exponential backoff (3 retries, 2s/4s/8s delays)
2. If DigiLocker is down:
   - Show user-friendly message: "DigiLocker is temporarily unavailable"
   - Offer fallback: "Upload documents manually"
   - Queue the DigiLocker fetch for retry (background job)
3. Health check endpoint: Monitor DigiLocker uptime independently
4. Circuit breaker pattern: After 5 consecutive failures, switch to manual upload mode for 15 minutes

### 10.6 Aadhaar OTP Not Received

User cannot complete DigiLocker authentication:
- Aadhaar-linked mobile may be inactive or changed
- UIDAI OTP delivery can be delayed (1-2 minutes)

**Handling**:
1. Show "Resend OTP" option (DigiLocker handles this)
2. If repeated failure: Fall back to Aadhaar Offline XML workflow
3. If no mobile linked to Aadhaar: Cannot use DigiLocker. Fall back to manual document upload

### 10.7 eAadhaar Not Available (eAadhaar Indicator = "N")

The User Details API returns an `eaadhaar` indicator with value "Y" or "N".

If "N": User has not linked Aadhaar to DigiLocker.
- Prompt user to link Aadhaar in their DigiLocker app
- Or fall back to Aadhaar Offline XML

---

## 11. Recent Changes 2024-2026

### 11.1 2024 Changes

| Date | Change | Impact |
|------|--------|--------|
| May 2024 | Issuer API Specification v1.13 released | Updated XML certificate formats |
| Oct 2024 | Entity Locker API Specification v1.0 released | Enables corporate DigiLocker integration via API |
| Nov 2024 | Entity Locker API updated (v1.0 revision) | Added PKCE support for mobile entity apps |
| Dec 2024 | DigiLocker reaches 43.49 crore users | Platform maturity milestone |
| 2024 | SEBI mandated dual upload (KRA + CKYC) since Aug 2024 | DigiLocker data must be uploaded to both KRA and CKYC |
| 2024 | FATCA/CRS upload to KRA mandatory since Jul 2024 | Additional compliance burden after DigiLocker KYC |

### 11.2 2025 Changes

| Date | Change | Impact |
|------|--------|--------|
| Jan 2025 | CKYC Search returns masked CKYC number | Full record needs Download API |
| Jan 2025 | Entity Locker explainer published | Clearer distinction between individual DigiLocker and Entity Locker |
| Mar 2025 | NPCI e-KYC Setu launched (notification NPCI/2024-25/e-KYC/003) | New Aadhaar authentication channel without AUA/KUA license |
| Mar 2025 | **SEBI circular on DigiLocker as DPI** for reducing unclaimed assets | DigiLocker now hosts demat statements, CAS; nominee feature added |
| Jun 2025 | **SEBI allows e-KYC Setu** for registered intermediaries | Aadhaar e-KYC without Aadhaar number disclosure |
| Jul 2025 | MeriPehchaan SSO expansion | More government services integrated |
| Aug 2025 | Vinod Kothari Consultants publishes e-KYC Setu analysis | Confirms no Section 11A notification needed via e-KYC Setu |

### 11.3 2026 Changes (So Far)

| Date | Change | Impact |
|------|--------|--------|
| Jan 2026 | SEBI Stock Brokers Regulations 2026 notified | Replaces 1992 regulations entirely. DigiLocker provisions maintained |
| Feb 2026 | DigiLocker 2026 security upgrades | Enhanced encryption standards, SIM binding feature |
| Feb 2026 | UPI Block Mechanism mandatory for QSBs | Related ASBA-like feature, DigiLocker not directly affected |

### 11.4 SEBI DigiLocker as Digital Public Infrastructure (March 2025)

This is a significant new development: SEBI circular on "Harnessing DigiLocker as a Digital Public Infrastructure for reducing Unclaimed Assets in the Indian Securities Market" (March 19, 2025, effective April 1, 2025).

**New Features**:
1. **Statement of Holdings**: Users can fetch and store demat holdings statements in DigiLocker
2. **Consolidated Account Statement (CAS)**: Mutual fund + demat CAS available
3. **Data Access Nominee**: Users can appoint nominees within DigiLocker who get notified upon user's demise
4. **Automatic Nominee Notification**: KRAs notify DigiLocker of user's demise -> DigiLocker notifies Data Access Nominees -> Facilitates transmission process

**Integration Requirements**: AMCs, Depositories (CDSL/NSDL), and KRAs must integrate with DigiLocker.

---

## 12. Aggregator Comparison

### 12.1 Feature Matrix

| Feature | Direct DigiLocker | Setu | Decentro | Digio |
|---------|-------------------|------|----------|-------|
| **DigiLocker Consent Flow** | Yes | Yes | Yes | Yes |
| **eAadhaar Fetch** | Yes | Yes | Yes | Yes |
| **PAN Fetch** | Yes | Yes | Yes | Yes |
| **DL Fetch** | Yes | Yes | Yes | Yes |
| **Offline XML Processing** | Build yourself | No | No | Yes |
| **MeriPehchaan SSO** | Yes | Via DigiLocker | Yes (SSO APIs) | Via DigiLocker |
| **Sandbox** | No | Yes | Yes | Yes |
| **Webhook Callbacks** | No | Yes | Yes | Yes |
| **Parsed JSON Response** | No (raw XML/PDF) | Yes | Yes | Yes |
| **Face Match** | No | No (separate product) | No (separate) | Yes (bundled) |
| **Document Upload to DigiLocker** | Yes | Yes | Yes | Yes |
| **Entity Locker** | Separate API | No | No | No |

### 12.2 API Endpoint Comparison for Aadhaar Fetch

**Setu**:
```
POST https://dg.setu.co/api/digilocker
Body: { "redirectUrl": "https://..." }
-> Returns { "id": "...", "url": "..." }

GET https://dg.setu.co/api/digilocker/{id}/aadhaar
-> Returns parsed JSON + XML file URL
```

**Decentro**:
```
POST https://in.decentro.tech/v2/kyc/digilocker/initiate_session
Headers: client_id, client_secret, module_secret
Body: { "reference_id": "...", "consent": true, "purpose": "KYC verification" }
-> Returns { "decentroTxnId": "...", "digilockerUrl": "..." }

GET https://in.decentro.tech/v2/kyc/digilocker/get_e_aadhaar
Headers: client_id, client_secret, module_secret
Query: { "reference_id": "..." }
-> Returns parsed Aadhaar data as JSON
```

**Digio**:
```
POST https://api.digio.in/v3/client/kyc/digilocker/request
Headers: Authorization: Basic base64(id:secret)
Body: { "customer_identifier": "...", "callback_url": "..." }
-> Returns { "id": "...", "url": "..." }

GET https://api.digio.in/v3/client/kyc/digilocker/{id}/aadhaar
-> Returns parsed Aadhaar data + photo
```

### 12.3 Pricing Estimates

| Provider | Per Transaction | Monthly Minimum | Notes |
|----------|----------------|-----------------|-------|
| Direct DigiLocker | Free | N/A | Requires MeitY partnership (10-12 week setup) |
| Setu | Rs 3-5 | Contact for pricing | Good documentation, sandbox available |
| Decentro | Rs 4-6 | Contact for pricing | Full KYC stack, SSO DigiLocker |
| Digio | Rs 5-8 | Contact for pricing | Bundled with eSign, KRA, offline XML |
| Other (Cashfree, Signzy, AuthBridge) | Rs 3-10 | Varies | Various bundling options |

**Note**: Pricing is indicative and volume-dependent. Contact vendors for exact quotes.

### 12.4 Recommendation for Broker KYC

**Recommended Stack**:

| Component | Provider | Reason |
|-----------|----------|--------|
| DigiLocker Consent + Aadhaar + PAN + DL | **Digio** (aggregator) | Already recommended for eSign, KRA. Single vendor for DigiLocker + eSign + KRA reduces integration points |
| Aadhaar Offline XML (fallback) | **Digio** | Built-in decryption + validation |
| NPCI e-KYC Setu | **Direct with NPCI** | New, no aggregator layer yet. Privacy-first Aadhaar verification |
| Entity Locker (corporate) | **Direct** (when needed) | Entity Locker API v1.0 for non-individual entities |

**Rationale**: Using Digio for DigiLocker keeps the vendor count low since Digio is already the recommended vendor for eSign (V6) and KRA (V4). This reduces integration complexity, vendor management overhead, and support escalation paths.

---

## Appendix A: DigiLocker XML Certificate Format (API Setu Standard)

The standard XML format for documents returned by DigiLocker issuers:

```xml
<Certificate
    xmlns="http://example.org/certificate"
    language="en"
    name="PAN Card"
    type="PANCR"
    number="ABCDE1234F"
    issueDate="2015-01-15"
    validFromDate="2015-01-15"
    expiryDate=""
    status="A">

    <IssuedBy>
        <Organization name="Income Tax Department" code="ITD"
                      tin="" uid="" type="Government"/>
    </IssuedBy>

    <IssuedTo>
        <Person uid="" title="Mr" name="RAKESH KUMAR"
                dob="1990-01-01" gender="M" maritalStatus=""
                religion="" phone="" email="">
            <Address type="permanent" line1="" line2=""
                     city="" state="" country="India" pin=""/>
        </Person>
    </IssuedTo>

    <CertificateData>
        <!-- Document-specific fields here -->
    </CertificateData>
</Certificate>
```

**Certificate Status Values**:
- `A` = Active
- `E` = Expired
- `R` = Revoked
- `S` = Suspended

---

## Appendix B: Key Reference URLs

| Resource | URL |
|----------|-----|
| DigiLocker Portal | https://www.digilocker.gov.in |
| Partner Registration | https://partners.digilocker.gov.in/requester.php |
| API Setu | https://apisetu.gov.in/digilocker |
| Entity Locker | https://entity.digilocker.gov.in |
| MeriPehchaan (SSO) | https://digilocker.meripehchaan.gov.in |
| Authorized Partner API v2.2 | https://cf-media.api-setu.in/resources/DigitalLocker-AuthorizedPartnerAPI-Specificationv2.2.pdf |
| Authorized Partner API v1.13 | https://img1.digitallocker.gov.in/circulars/Digital-Locker-Authorized-Partner-APISpecification-v1.13.pdf |
| Entity Locker API v1.0 | https://entity.digilocker.gov.in/assets/img/Requester%20-%20Entity%20Locker%20API%20Specification_28_11_24.pdf |
| XML Certificate Formats | https://docs.apisetu.gov.in/document-central/dl-xml-format/ |
| Partner SOP | https://cf-media.api-setu.in/resources/Partners-SOP.pdf |
| UIDAI Offline XML | https://uidai.gov.in/en/ecosystem/authentication-devices-documents/about-aadhaar-paperless-offline-e-kyc.html |
| SEBI Circular 2020/73 (IPV Exemption) | https://img1.digitallocker.gov.in/circulars/SEBI%20circular%20on%20KYC%20process%20and%20use%20of%20technology%20for%20KYC%20%2024-Apr-20.pdf |
| SEBI KYC Master Circular 2023 | https://www.sebi.gov.in/legal/master-circulars/oct-2023/master-circular-on-know-your-client-kyc-norms-for-the-securities-market_77945.html |
| SEBI DigiLocker DPI Circular (Mar 2025) | https://www.sebi.gov.in/legal/circulars/mar-2025/harnessing-digilocker-as-a-digital-public-infrastructure-for-reducing-unclaimed-assets-in-the-indian-securities-market_92769.html |
| SEBI e-KYC Setu Press Release (Jun 2025) | https://www.sebi.gov.in/media-and-notifications/press-releases/jun-2025/registered-intermediaries-are-allowed-to-use-e-kyc-setu-system-of-national-payments-corporation-of-india-to-perform-aadhaar-based-e-kyc-authentication-for-ease-of-doing-business_94904.html |
| NPCI e-KYC Setu | https://www.npci.org.in/what-we-do/e-kyc-services/e-kyc-setu-system |
| NPCI e-KYC Setu Circular | https://www.npci.org.in/PDF/npci/e-kyc-services/circulars/2025/e-KYC-003-FY-24-25-e-KYC-Setu-System.pdf |
| Setu DigiLocker Docs | https://docs.setu.co/data/digilocker/quickstart |
| Setu Error Codes | https://docs.setu.co/data/digilocker/error-codes |
| Decentro DigiLocker Docs | https://docs.decentro.tech/docs/kyc-digilocker |
| Digio DigiLocker Docs | https://documentation.digio.in/digikyc/digilocker/ |
| Vinod Kothari e-KYC Setu Analysis | https://vinodkothari.com/2025/08/setu-ing-the-standard-npcis-new-path-to-aadhaar-e-kyc/ |

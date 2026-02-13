# DigiLocker Integration Specification
## Identity Verification for Indian Stock Broker KYC

**Version**: 1.0
**Date**: 2026-02-13
**Parent**: [VENDOR_INTEGRATIONS.md](../../VENDOR_INTEGRATIONS.md) - Section V2 (4a/4b/4c)
**Companion**: [KYC_MASTER_DATASET.md](../../KYC_MASTER_DATASET.md)

---

## Table of Contents

1. [Overview](#1-overview)
2. [Integration Paths](#2-integration-paths)
3. [OAuth 2.0 Consent Flow](#3-oauth-20-consent-flow)
4. [Document Types for Broking KYC](#4-document-types-for-broking-kyc)
5. [Aadhaar eKYC via DigiLocker (Critical)](#5-aadhaar-ekyc-via-digilocker-critical)
6. [NPCI e-KYC Setu (New - Jun 2025)](#6-npci-e-kyc-setu-new---jun-2025)
7. [Aadhaar Offline XML (Fallback)](#7-aadhaar-offline-xml-fallback)
8. [Non-Individual Entities](#8-non-individual-entities)
9. [Data Privacy and Compliance](#9-data-privacy-and-compliance)
10. [API Technical Details](#10-api-technical-details)
11. [Edge Cases](#11-edge-cases)
12. [Integration with Other Vendors](#12-integration-with-other-vendors)
13. [Recent Changes (2024-2026)](#13-recent-changes-2024-2026)
14. [Cost](#14-cost)

---

## 1. Overview

### What is DigiLocker?

DigiLocker is a flagship initiative of the **Ministry of Electronics and Information Technology (MeitY)**, Government of India, under the Digital India programme. It provides citizens a secure cloud-based platform for storing, sharing, and verifying documents and certificates in a paperless manner.

### Key Facts

| Attribute | Details |
|-----------|---------|
| **Full Name** | DigiLocker (Digital Locker) |
| **Operated By** | NeGD (National e-Governance Division), MeitY |
| **Registered Users** | 200M+ (as of early 2026) |
| **Issuer Organizations** | 2,500+ government and semi-government bodies |
| **Documents Available** | Aadhaar, PAN, Driving License, Voter ID, Passport, Marksheets, Vehicle RC, etc. |
| **Legal Framework** | IT Act 2000, Section 9 (electronic gazette); documents treated at par with originals under Rule 9A of IT (Preservation and Retention) Rules |
| **Portal** | https://www.digilocker.gov.in |
| **API Docs** | https://api.digitallocker.gov.in and https://apisetu.gov.in/digilocker |
| **Spec PDF** | https://img1.digitallocker.gov.in/assets/img/Digital%20Locker%20Authorized%20Partner%20API%20Specification%20v1.11.pdf |

### Why DigiLocker Matters for Broking KYC

1. **IPV Exemption**: SEBI circular explicitly allows **In-Person Verification (IPV) exemption** when Aadhaar eKYC is obtained via DigiLocker. This eliminates the need for Video KYC (VIPV), saving Rs. 30-50 per customer and dramatically simplifying the onboarding flow.

2. **Consent-Based**: Documents are fetched only with explicit user consent via OAuth 2.0. The user sees exactly which documents are being requested and can grant or deny access. This aligns with DPDP Act 2023 principles.

3. **Government-Issued, Digitally Signed**: Documents fetched from DigiLocker carry the digital signature of the issuing authority (e.g., UIDAI for Aadhaar, Income Tax Dept for PAN). No separate document verification or forgery detection is needed.

4. **Auto-Fill Capability**: Aadhaar XML from DigiLocker provides ~25 structured fields (name, DOB, gender, full address, photo) that can be used to auto-fill KYC forms, KRA submissions, CKYC uploads, and exchange UCC registrations.

5. **Cost Efficiency**: DigiLocker is a government service with minimal per-transaction cost (Rs. 0-5 depending on integration path), compared to OCR-based extraction (Rs. 1-3 per doc) plus manual verification overhead.

6. **Coverage**: With 200M+ registered users, a significant portion of the target customer base already has DigiLocker accounts. For those who do not, account creation takes approximately 2 minutes using Aadhaar OTP.

---

## 2. Integration Paths

There are two primary approaches to integrating DigiLocker into the KYC system.

### 2a: Direct MeitY Partnership (Requester Entity)

Become a **Requester Entity (RE)** by partnering directly with MeitY/NeGD.

**Empanelment Process**:

| Step | Activity | Duration |
|------|----------|----------|
| 1 | Apply at DigiLocker partner registration portal (https://partners.digitallocker.gov.in) | 1 week |
| 2 | BDM (Business Development Manager) reviews use cases and entity credentials | 1-2 weeks |
| 3 | Committee approval by MeitY/NeGD | 2-4 weeks |
| 4 | Technical integration documentation and OAuth 2.0 client credentials issued | 1 week |
| 5 | Security audit and compliance review (STQC or equivalent) | 2-4 weeks |
| 6 | Integration development and testing against sandbox environment | 2-3 weeks |
| 7 | UAT sign-off and production go-live | 1 week |

**Total Timeline**: 2-4 months

**Advantages**:
- Lower per-transaction cost (government service, no aggregator margin)
- Direct relationship with MeitY; better support escalation path
- Full control over document types and consent scope
- No dependency on third-party aggregator uptime

**Requirements**:
- Dedicated infrastructure meeting MeitY security standards
- Security audit clearance (STQC or empaneled auditor)
- Data center in India with appropriate compliance certifications
- Designated SPOC (Single Point of Contact) for MeitY coordination
- Periodic compliance reviews

### 2b: Via Aggregator (Digio / Decentro)

Use a MeitY-approved partner that provides a REST API wrapper over DigiLocker.

#### Option 1: Digio

| Attribute | Details |
|-----------|---------|
| **API Docs** | https://documentation.digio.in/digikyc/digilocker/ |
| **Integration Time** | 2 days |
| **Auth** | `Authorization: Basic <base64(client_id:client_secret)>` |
| **IP Whitelist** | UAT: 35.154.20.28; Prod: 13.126.198.236, 52.66.66.81 |
| **Sandbox** | Yes (UAT environment) |
| **SDK** | Android SDK, iOS SDK, Web SDK available |
| **Additional** | Also provides Aadhaar Offline XML decryption (see Section 7) |

#### Option 2: Decentro

| Attribute | Details |
|-----------|---------|
| **API Docs** | https://docs.decentro.tech/docs/kyc-and-onboarding-identities-verification-services |
| **Integration Time** | 1-2 weeks |
| **Auth** | `client_id` + `client_secret` + `module_secret` in headers |
| **Sandbox** | Yes (staging environment) |
| **SDK** | No native SDK; REST API only |

**Aggregator Advantages**:
- Dramatically faster time-to-market (days vs months)
- No MeitY empanelment paperwork
- Unified API that bundles DigiLocker with other verification services
- Aggregator handles compliance, security audits, uptime

**Aggregator Disadvantages**:
- Higher per-transaction cost (Rs. 2-5 per document fetch vs near-zero for direct)
- Dependency on aggregator uptime and API stability
- Less control over consent flow UX customization
- Aggregator becomes a data processor under DPDP Act

### Recommendation

**Start with an aggregator (Digio recommended)** for rapid go-to-market. Digio is already the recommended vendor for KRA and eSign integrations (see VENDOR_INTEGRATIONS.md), so consolidating DigiLocker through Digio reduces vendor count and integration complexity.

**Migrate to direct MeitY partnership at scale** (10,000+ onboardings/month) to reduce per-transaction cost and gain full control. The OAuth 2.0 flow and document parsing logic remain identical; only the base URL and authentication mechanism change.

---

## 3. OAuth 2.0 Consent Flow

DigiLocker uses a standard OAuth 2.0 Authorization Code Grant flow. The broker never sees the user's DigiLocker credentials.

### Flow Diagram

```
User (Browser/App)           Broker Backend           DigiLocker Server
       |                           |                          |
       |  1. Click "Fetch from     |                          |
       |     DigiLocker"           |                          |
       |-------------------------->|                          |
       |                           |                          |
       |  2. Generate auth URL     |                          |
       |     with client_id,       |                          |
       |     redirect_uri, scope   |                          |
       |<--------------------------|                          |
       |                           |                          |
       |  3. Redirect to DigiLocker authorization endpoint    |
       |-------------------------------------------------->   |
       |                           |                          |
       |  4. User logs in (Aadhaar OTP or username/password)  |
       |                           |                          |
       |  5. User sees consent screen: "Broker XYZ requests   |
       |     access to your Aadhaar and PAN"                  |
       |                           |                          |
       |  6. User grants consent                              |
       |                           |                          |
       |  7. Redirect back with authorization code            |
       |<--------------------------------------------------   |
       |                           |                          |
       |  8. Forward auth code     |                          |
       |-------------------------->|                          |
       |                           |                          |
       |                           |  9. Exchange code for    |
       |                           |     access_token         |
       |                           |------------------------->|
       |                           |                          |
       |                           |  10. Access token        |
       |                           |<-------------------------|
       |                           |                          |
       |                           |  11. Fetch documents     |
       |                           |     using access_token   |
       |                           |------------------------->|
       |                           |                          |
       |                           |  12. Return document     |
       |                           |     XML/PDF              |
       |                           |<-------------------------|
       |                           |                          |
       |  13. Show success,        |                          |
       |      auto-fill form       |                          |
       |<--------------------------|                          |
```

### Step-by-Step API Calls

#### Step 1: Redirect User to DigiLocker Authorization

```
GET https://api.digitallocker.gov.in/public/oauth2/1/authorize
    ?response_type=code
    &client_id=<YOUR_CLIENT_ID>
    &redirect_uri=<YOUR_CALLBACK_URL>
    &state=<RANDOM_CSRF_TOKEN>
    &scope=openid
```

| Parameter | Required | Description |
|-----------|----------|-------------|
| `response_type` | Yes | Always `code` for authorization code grant |
| `client_id` | Yes | Issued during MeitY empanelment or by aggregator |
| `redirect_uri` | Yes | Pre-registered callback URL (must match exactly) |
| `state` | Yes | Random CSRF token; verified on callback to prevent CSRF attacks |
| `scope` | Yes | `openid` for basic profile; additional scopes for documents |

#### Step 2: User Authentication

The user is presented with DigiLocker's login page. Two authentication methods:

| Method | Flow | User Base |
|--------|------|-----------|
| **Aadhaar OTP** | Enter Aadhaar -> Receive OTP on registered mobile -> Enter OTP | ~95% of users |
| **Username/Password** | DigiLocker credentials (if previously set up) | ~5% of users |

#### Step 3: User Consent

DigiLocker shows a consent screen listing:
- The Requester Entity name (broker's registered name)
- Documents being requested (e.g., "Aadhaar e-KYC", "PAN Card")
- Purpose of access
- Duration of consent

The user explicitly **grants** or **denies** consent.

#### Step 4: Authorization Code Callback

On consent grant, DigiLocker redirects the user back to the broker's `redirect_uri`:

```
GET <redirect_uri>?code=<AUTHORIZATION_CODE>&state=<STATE>
```

**Validation**:
- Verify `state` matches the value sent in Step 1 (CSRF protection)
- `code` is a one-time-use authorization code, valid for a short window (~5-10 minutes)

If user denies consent:
```
GET <redirect_uri>?error=access_denied&state=<STATE>
```

#### Step 5: Exchange Code for Access Token

```
POST https://api.digitallocker.gov.in/public/oauth2/1/token

Content-Type: application/x-www-form-urlencoded

code=<AUTHORIZATION_CODE>
&grant_type=authorization_code
&client_id=<YOUR_CLIENT_ID>
&client_secret=<YOUR_CLIENT_SECRET>
&redirect_uri=<YOUR_CALLBACK_URL>
```

**Response**:
```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "refresh_token": "dGhpcyBpcyBhIHJlZnJlc2ggdG9rZW4..."
}
```

| Field | Description |
|-------|-------------|
| `access_token` | JWT token used for all subsequent API calls |
| `token_type` | Always `Bearer` |
| `expires_in` | Token validity in seconds (typically 3600 = 1 hour) |
| `refresh_token` | Optional; used to obtain new access token without re-consent |

#### Step 6: Fetch User Profile

```
GET https://api.digitallocker.gov.in/public/oauth2/1/user/details

Headers:
  Authorization: Bearer <access_token>
```

**Response**:
```json
{
  "digilocker_id": "DL-1234567890",
  "name": "RAKESH KUMAR",
  "dob": "01-01-1990",
  "gender": "M",
  "eaadhaar": "XXXXXXXX1234",
  "mobile": "XXXXXX7890"
}
```

#### Step 7: List Available Documents

```
GET https://api.digitallocker.gov.in/public/oauth2/1/user/files

Headers:
  Authorization: Bearer <access_token>
```

Returns a list of documents available in the user's DigiLocker (both issued and uploaded).

#### Step 8: Fetch Specific Document

```
GET https://api.digitallocker.gov.in/public/oauth2/1/pull/<DOCUMENT_URI>

Headers:
  Authorization: Bearer <access_token>
```

Returns the document as **XML** (for structured data like Aadhaar) or **PDF** (for visual documents like PAN card, DL).

### Session Management

| Aspect | Details |
|--------|---------|
| **Access Token Lifetime** | Typically 1 hour (3600 seconds) |
| **Refresh Token** | Available; use to extend session without re-consent |
| **Token Storage** | Store encrypted; never log or expose in URLs |
| **Concurrent Sessions** | Single active session per user per client_id |
| **Revocation** | User can revoke consent from DigiLocker dashboard at any time |

---

## 4. Document Types for Broking KYC

The following documents are relevant for stock broker KYC onboarding and can be fetched via DigiLocker.

### Document Matrix

| Document | Issuer | Document URI | Format | Fields Returned | Use in KYC |
|----------|--------|-------------|--------|-----------------|------------|
| **Aadhaar (e-Aadhaar XML)** | UIDAI | `in.gov.uidai-ADHAR` | XML | Name, DOB, Gender, Full Address (house, street, landmark, locality, vtc, district, state, pincode), Photo (base64), Masked Aadhaar | **Primary identity**; IPV exemption; face match reference; address proof |
| **PAN Card** | Income Tax Dept (Protean/NSDL) | `in.gov.cbdt-PANCR` | PDF/XML | PAN Number, Name, DOB, Father's Name | PAN verification; cross-reference with Decentro PAN API |
| **Driving License** | State Transport Dept (via Parivahan/Sarathi) | `in.gov.transport-DL` | XML/PDF | DL Number, Name, DOB, Address, Issue Date, Validity, Vehicle Classes | Address proof (alternative) |
| **Voter ID (EPIC)** | Election Commission of India | `in.gov.eci-EPIC` | PDF | Name, Address, Voter ID Number, Father/Husband Name | Address proof (alternative) |
| **Passport** | Ministry of External Affairs | `in.gov.mea-PASSPORT` | PDF | Passport Number, Name, DOB, Nationality, Gender, Issue/Expiry Dates | Identity + address proof; required for NRI clients |
| **Vehicle Registration (RC)** | Transport Dept (Vahan) | `in.gov.transport-VAHAN` | XML | Vehicle details, Owner name, Address | Not typically used in broking KYC |
| **Class 10 Marksheet** | CBSE/State Board | Varies by board | PDF | Name, DOB, Father's Name, Roll Number | DOB verification (fallback) |
| **Class 12 Marksheet** | CBSE/State Board | Varies by board | PDF | Name, DOB, Father's Name | Not typically used |

### Priority for Broking KYC

For individual stock broker KYC, the documents are fetched in this priority order:

1. **Aadhaar XML** - Always fetch (mandatory for IPV exemption, address, photo, identity)
2. **PAN Card** - Fetch if available (cross-verification with PAN API result)
3. **Driving License** - Fetch only if address proof needed (when Aadhaar address differs from current address)
4. **Voter ID / Passport** - Fetch as alternative address proof if DL not available

### Minimum Viable Fetch

For the standard KYC flow, **only Aadhaar XML is strictly necessary** from DigiLocker. PAN verification is handled independently via the Decentro PAN API (V1). Additional documents are fetched only in exception scenarios (address mismatch, name mismatch, etc.).

---

## 5. Aadhaar eKYC via DigiLocker (Critical)

This is the most important section of this document. DigiLocker-based Aadhaar eKYC is the **primary identity verification path** for 80-85% of onboarding customers.

### IPV Exemption - SEBI Regulatory Basis

**SEBI Circular**: SEBI/HO/MIRSD/SEC-2/P/CIR/2023/37

**Key Provision**: When Aadhaar eKYC data is obtained through DigiLocker (or equivalent government electronic mechanism), the requirement for In-Person Verification (IPV) is **exempted**. This means:

- No Video KYC (VIPV) session required
- No agent-assisted video call needed
- No recording, random questions, or OTP verification during video
- Significant cost saving: Rs. 30-50 per customer (VIPV cost eliminated)
- Significant time saving: 3-5 minutes per customer (VIPV duration eliminated)
- Better conversion: no drop-off at VIPV stage (historically 10-15% drop-off at video step)

**Impact on Onboarding Flow**:

```
WITH DigiLocker Aadhaar eKYC (80-85% of customers):
  PAN Verify -> DigiLocker Consent -> Bank Verify -> Form Fill -> Face Match -> eSign -> Done
  Total time: ~5-7 minutes
  Total cost: ~Rs. 30-50

WITHOUT DigiLocker (15-20% fallback):
  PAN Verify -> Doc Upload -> OCR -> Bank Verify -> Form Fill -> VIPV Session -> Face Match -> eSign -> Done
  Total time: ~10-15 minutes
  Total cost: ~Rs. 80-120
```

### Aadhaar XML Structure

The Aadhaar e-KYC XML obtained via DigiLocker has the following structure:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Certificate>
  <CertificateData>
    <KycRes ret="y" code="0" ttl="20260215T120000" txn="UKC:1234567890">
      <UidData uid="XXXXXXXX1234">
        <Poi name="RAKESH KUMAR" dob="1990-01-01" gender="M"
             phone="9876543210" email="rakesh@email.com" />
        <Poa co="S/O SURESH KUMAR"
             house="123" street="MG Road"
             lm="Near Temple" loc="Sector 5"
             vtc="Gurgaon" subdist="Gurgaon"
             dist="Gurgaon" state="Haryana"
             country="India" pc="122001"
             po="Gurgaon GPO" />
        <Pht>BASE64_ENCODED_JPEG_PHOTO</Pht>
      </UidData>
    </KycRes>
  </CertificateData>
  <Signature xmlns="http://www.w3.org/2000/09/xmldsig#">
    <!-- UIDAI digital signature for verification -->
  </Signature>
</Certificate>
```

### Field Extraction - Complete List (~25 Fields)

| XML Path | Field Name | Type | Max Length | Example | KYC Use |
|----------|-----------|------|-----------|---------|---------|
| `UidData/@uid` | Masked Aadhaar | String | 12 | `XXXXXXXX1234` | Reference ID (never store full) |
| `Poi/@name` | Full Name | String | 99 | `RAKESH KUMAR` | Primary name for KYC form |
| `Poi/@dob` | Date of Birth | Date | 10 | `1990-01-01` | DOB verification |
| `Poi/@gender` | Gender | Char | 1 | `M` | M=Male, F=Female, T=Transgender |
| `Poi/@phone` | Mobile (hashed) | String | - | Hashed value | Cross-verify with declared mobile |
| `Poi/@email` | Email (hashed) | String | - | Hashed value | Cross-verify with declared email |
| `Poa/@co` | Care Of | String | 99 | `S/O SURESH KUMAR` | Father's/spouse name extraction |
| `Poa/@house` | House/Flat No | String | 99 | `123` | Address line 1 component |
| `Poa/@street` | Street Name | String | 99 | `MG Road` | Address line 1 component |
| `Poa/@lm` | Landmark | String | 99 | `Near Temple` | Address line 2 component |
| `Poa/@loc` | Locality | String | 99 | `Sector 5` | Address line 2 component |
| `Poa/@vtc` | Village/Town/City | String | 99 | `Gurgaon` | City for KYC |
| `Poa/@subdist` | Sub-District | String | 99 | `Gurgaon` | Administrative unit |
| `Poa/@dist` | District | String | 99 | `Gurgaon` | District for KYC |
| `Poa/@state` | State | String | 99 | `Haryana` | State for KYC |
| `Poa/@country` | Country | String | 99 | `India` | Always "India" for domestic |
| `Poa/@pc` | Pincode | String | 6 | `122001` | Pincode for KYC |
| `Poa/@po` | Post Office | String | 99 | `Gurgaon GPO` | Post office name |
| `Pht` | Photo | Base64 | ~50KB | Base64 JPEG | Face match reference image |

### Data Mapping to KYC Master Dataset

| DigiLocker Field | Master Dataset Field | Field ID | Section | Notes |
|-----------------|---------------------|----------|---------|-------|
| `Poi/@name` | `digilocker_aadhaar_name` | R22 | R: Third-Party Results | Primary name source |
| `Poa/*` (concatenated) | `digilocker_aadhaar_address` | R23 | R: Third-Party Results | Full address concatenation |
| `Poi/@dob` | `digilocker_aadhaar_dob` | R24 | R: Third-Party Results | Date format: YYYY-MM-DD |
| `Poi/@gender` | `digilocker_aadhaar_gender` | R25 | R: Third-Party Results | M/F/T |
| `Pht` (base64) | `digilocker_aadhaar_photo` | R26 | R: Third-Party Results | JPEG, used for face match |
| `Poa/@co` | Extract father/spouse name | - | A: Personal Details | Parse "S/O", "D/O", "W/O" prefix |
| `UidData/@uid` | Masked Aadhaar reference | - | B: Identity Documents | Store only last 4 digits |

### Address Concatenation Logic

The Aadhaar address fields must be concatenated into a structured address for KYC forms:

```
Address Line 1: {house}, {street}
Address Line 2: {lm}, {loc}
Address Line 3: {vtc}, {subdist}
City:           {dist}
State:          {state}
Pincode:        {pc}
Country:        {country}
```

**Example**:
```
Address Line 1: 123, MG Road
Address Line 2: Near Temple, Sector 5
Address Line 3: Gurgaon, Gurgaon
City:           Gurgaon
State:          Haryana
Pincode:        122001
Country:        India
```

**BSE UCC Address Rules**: Address Line 1 must NOT start with client name. Address Lines 1, 2, and 3 must all be distinct. The concatenation logic above naturally satisfies these rules.

### Photo Extraction and Usage

The `<Pht>` element contains a base64-encoded JPEG photograph of the Aadhaar holder. This photo is used for:

1. **Face Match** (via HyperVerge): Compare Aadhaar photo against live selfie captured during onboarding
2. **CKYC Upload**: Photo is a mandatory field in the CKYC upload payload
3. **KRA Upload**: Photo may be required by some KRAs
4. **Admin Review**: Displayed in the KYC Admin dashboard for manual verification

**Photo Quality Considerations**:
- Aadhaar photos can be old (taken at enrollment, possibly years ago)
- Resolution may be low (typically 150-200 DPI)
- Lighting and angle may not be optimal
- For face match, HyperVerge handles low-quality reference images with adaptive thresholds
- If face match score is between 60-79%, flag for manual review rather than auto-reject

### Care-Of Field Parsing

The `Poa/@co` (Care Of) field contains relationship information that can be parsed to extract father's/spouse's name:

| Prefix | Meaning | Parse Rule |
|--------|---------|------------|
| `S/O` | Son Of | Father's name (male individual) |
| `D/O` | Daughter Of | Father's name (female individual) |
| `W/O` | Wife Of | Spouse's name (married female) |
| `C/O` | Care Of | Guardian or relative (ambiguous) |

**Parsing Example**:
```
Input:  "S/O SURESH KUMAR"
Output: relationship = "Father", name = "SURESH KUMAR"
```

---

## 6. NPCI e-KYC Setu (New - Jun 2025)

### Overview

NPCI (National Payments Corporation of India) launched **e-KYC Setu** on March 10, 2025, as a privacy-first alternative to traditional Aadhaar eKYC.

**Portal**: https://www.npci.org.in/product/e-kyc-services/e-kyc-setu-system

### Key Differences from DigiLocker Aadhaar eKYC

| Aspect | DigiLocker Aadhaar eKYC | NPCI e-KYC Setu |
|--------|------------------------|-----------------|
| **Aadhaar Number Disclosure** | Masked Aadhaar (XXXXXXXX1234) is visible | Aadhaar number is **never disclosed** to the broker |
| **License Required** | None (via aggregator) or MeitY empanelment (direct) | None; no AUA/KUA license needed for SEBI-regulated entities |
| **Infrastructure** | DigiLocker servers (MeitY) | NPCI infrastructure |
| **Token Approach** | Access token (OAuth 2.0) | Tokenized identity (privacy-preserving) |
| **Data Returned** | Full demographic + photo + address | Demographic data without Aadhaar number |
| **Photo** | Yes (base64 JPEG) | Subject to implementation; may or may not include photo |
| **SEBI Approval** | Long-established | Approved from Jun 2025 (SEBI/HO/MIRSD/PoD/P/CIR/2025/90) |
| **Maturity** | Mature; widely used | Early adoption phase; limited ecosystem |
| **IPV Exemption** | Yes (established precedent) | Likely yes, but regulatory clarity still emerging |
| **Availability** | Web + Mobile | Web interface + Android SDK |

### SEBI Regulatory Status

- SEBI allowed NPCI e-KYC Setu for securities market intermediaries from **June 2025**
- Reference: SEBI Stock Brokers Master Circular SEBI/HO/MIRSD/PoD/P/CIR/2025/90
- No AUA (Authentication User Agency) or KUA (KYC User Agency) license required
- Privacy-preserving: aligns with DPDP Act 2023 data minimization principle

### Integration Status and Recommendation

**Current Status (Feb 2026)**:
- NPCI e-KYC Setu is still in early adoption
- Limited number of entities have completed integration
- SDK and API documentation are evolving
- Not all use cases (like photo for face match) are fully resolved

**Recommendation**:
- **Primary Path**: Continue using DigiLocker for Aadhaar eKYC (proven, mature, IPV exemption established)
- **Monitor**: Track NPCI e-KYC Setu adoption and regulatory clarifications
- **Plan Migration**: When e-KYC Setu reaches maturity and IPV exemption is explicitly confirmed, evaluate migration for privacy benefits
- **Parallel Support**: Consider supporting both DigiLocker and e-KYC Setu to give customers a choice

---

## 7. Aadhaar Offline XML (Fallback)

For users who do not have a DigiLocker account or prefer not to use it, the **Aadhaar Offline XML** method serves as a fallback.

### Flow

```
Step 1: User downloads Aadhaar XML from:
        - UIDAI mAadhaar mobile app (recommended, most convenient)
        - resident.uidai.gov.in website
        - UIDAI Aadhaar portal
        User sets a 4-digit "share code" (password for the XML)

Step 2: User uploads the downloaded XML file to the broker's KYC app

Step 3: User enters the 4-digit share code in the KYC app

Step 4: Broker backend sends XML + share code to Digio API
        POST /aadhaar-offline/verify
        Body: { "xml_file": <multipart>, "share_phrase": "1234" }

Step 5: Digio decrypts the XML using the share code,
        validates the UIDAI digital signature (ensures no tampering),
        and returns structured JSON

Step 6: Broker receives the same fields as DigiLocker Aadhaar
        (name, DOB, gender, address, photo)
```

### Digio Aadhaar Offline API

**API Docs**: https://documentation.digio.in/digikyc/aadhaar_offline/

**Request**:
```
POST https://api.digio.in/aadhaar-offline/verify
Headers:
  Authorization: Basic <base64(client_id:client_secret)>
Content-Type: multipart/form-data

Body:
  xml_file: <aadhaar_offline.xml>
  share_phrase: "1234"
```

**Response** (simplified):
```json
{
  "id": "AOFF_xxxxxxxxxxxx",
  "status": "completed",
  "result": {
    "name": "RAKESH KUMAR",
    "dob": "01-01-1990",
    "gender": "M",
    "care_of": "S/O SURESH KUMAR",
    "address": {
      "house": "123",
      "street": "MG Road",
      "landmark": "Near Temple",
      "locality": "Sector 5",
      "vtc": "Gurgaon",
      "district": "Gurgaon",
      "state": "Haryana",
      "pincode": "122001",
      "country": "India"
    },
    "photo": "BASE64_ENCODED_JPEG",
    "masked_aadhaar": "XXXXXXXX1234",
    "signature_valid": true,
    "xml_generated_on": "2026-02-10T10:30:00"
  }
}
```

### Comparison: DigiLocker vs Offline XML

| Aspect | DigiLocker | Aadhaar Offline XML |
|--------|-----------|-------------------|
| **UX** | Seamless (OAuth redirect, 2-3 clicks) | Manual (download XML, set share code, upload) |
| **User Drop-off** | Low (~5%) | Higher (~15-20%) due to multi-step process |
| **Data Freshness** | Real-time from UIDAI | As of XML generation date (could be stale) |
| **IPV Exemption** | Yes (SEBI confirmed) | Yes (Aadhaar eKYC regardless of source) |
| **License Required** | None (via aggregator) | None |
| **Photo Quality** | Same (UIDAI photo) | Same (UIDAI photo) |
| **Cost** | Rs. 2-5 (via aggregator) | Rs. 3-5 (Digio decryption fee) |
| **Offline Support** | No (requires internet for OAuth) | Partially (XML can be downloaded offline on mAadhaar) |

### When to Use Offline XML

1. User does not have a DigiLocker account and does not want to create one
2. DigiLocker service is experiencing downtime
3. User prefers manual control over document sharing
4. User's Aadhaar mobile number has changed (DigiLocker OTP will fail)
5. Technical issues with DigiLocker OAuth flow (browser compatibility, redirect failures)

---

## 8. Non-Individual Entities

DigiLocker is primarily designed for individual citizens. Its applicability for non-individual entity types in broking KYC is limited.

### Entity-Wise Applicability

| Entity Type | DigiLocker Applicable? | What Can Be Fetched | What Cannot Be Fetched | Fallback |
|-------------|----------------------|--------------------|-----------------------|----------|
| **Individual** | Yes (full support) | Aadhaar, PAN, DL, Voter ID, Passport | - | Offline XML + OCR |
| **Corporate (Company)** | Partial (directors only) | Individual directors' Aadhaar/PAN via their personal DigiLocker | CIN, MOA, AOA, Board Resolution, Authorized Signatory Letter | Manual upload + OCR (HyperVerge) |
| **HUF** | Partial (Karta only) | Karta's personal Aadhaar/PAN | HUF PAN card, HUF declaration, co-parcener details | Manual upload |
| **NRI** | Conditional | Aadhaar/PAN if Indian mobile linked to Aadhaar is still active | Passport (if not on DigiLocker), overseas address proof, PIS permission | Manual upload + consular attestation |
| **Partnership Firm** | Partial (partners only) | Individual partners' Aadhaar/PAN | Partnership deed, firm PAN, authorized signatory | Manual upload |
| **LLP** | Partial (designated partners only) | Individual DPs' Aadhaar/PAN | LLP Agreement, LLPIN certificate | Manual upload |
| **Trust** | Partial (trustees only) | Individual trustees' Aadhaar/PAN | Trust deed, registration certificate | Manual upload |
| **Minor (on behalf of)** | Partial (guardian only) | Guardian's Aadhaar/PAN | Minor's birth certificate (may be on DigiLocker if issued digitally) | Manual upload |

### NRI-Specific Considerations

NRI clients face unique challenges with DigiLocker:

1. **Mobile Number Dependency**: DigiLocker login requires Aadhaar OTP, which is sent to the mobile number registered with Aadhaar. Many NRIs have changed their Indian mobile numbers after moving abroad.

2. **Virtual ID**: NRIs can use Aadhaar Virtual ID (VID) -- a 16-digit temporary alias that maps to Aadhaar but doesn't expose the actual number. DigiLocker supports VID for authentication.

3. **Address Mismatch**: Aadhaar address will be the Indian address; NRI's current address (overseas) will differ. Need to collect current overseas address separately.

4. **Fallback Flow for NRIs**:
   - Manual upload of Aadhaar Offline XML (if available)
   - Upload scanned/photographed Aadhaar card + OCR via HyperVerge
   - Passport upload (mandatory for NRIs in any case)
   - PIS permission letter from authorized dealer bank
   - Overseas address proof (utility bill, bank statement)

### Corporate Entity Flow

For company accounts, the KYC process uses DigiLocker for individual director/signatory verification while entity documents are collected separately:

```
Step 1: Company PAN verification (Decentro API)
Step 2: CIN/LLPIN verification (MCA portal or Decentro)
Step 3: For each director/authorized signatory:
        -> DigiLocker consent for personal Aadhaar + PAN
        -> Or manual upload + OCR
Step 4: Entity documents (manual upload):
        -> MOA/AOA or Partnership Deed or Trust Deed
        -> Board Resolution / Authorization Letter
        -> Entity PAN card
        -> Address proof of registered office
Step 5: OCR + manual verification of uploaded entity documents
```

---

## 9. Data Privacy and Compliance

### Regulatory Framework

| Regulation | Applicability | Key Requirements |
|-----------|--------------|-----------------|
| **Aadhaar Act 2016** | Aadhaar data handling | Must NOT store full Aadhaar number; only last 4 digits or masked format |
| **IT Act 2000** | Electronic documents | DigiLocker documents are legally equivalent to originals (Section 9, Rule 9A) |
| **DPDP Act 2023** | Personal data processing | Consent management, purpose limitation, data minimization, data principal rights |
| **SEBI KYC Master Circular** | KYC data retention | 8 years post account closure (SEBI Stock Brokers Regulations 2026) |
| **PMLA 2002** | Customer due diligence | KYC records for AML compliance |

### Aadhaar Number Handling - Critical Rules

**Do**:
- Store only the masked Aadhaar number: `XXXXXXXX1234` (last 4 digits visible)
- Use Aadhaar Virtual ID (VID) where possible instead of Aadhaar number
- Store extracted demographic data (name, DOB, address) separately from Aadhaar reference
- Log that Aadhaar eKYC was performed (audit trail) without logging the Aadhaar number

**Do Not**:
- Store the full 12-digit Aadhaar number anywhere in the system
- Display full Aadhaar number in any UI, report, or log
- Use Aadhaar number as a primary key or index in the database
- Share Aadhaar number with third parties (exchanges, depositories) unless legally mandated
- Retain the raw Aadhaar XML beyond the extraction session (extract fields, then discard XML)

### Consent Management

| Aspect | Implementation |
|--------|---------------|
| **Consent Capture** | DigiLocker OAuth consent screen (user explicitly grants/denies) |
| **Consent Record** | Store: timestamp, scope, documents consented, consent_id from DigiLocker |
| **Consent Duration** | Access token expires in 1 hour; no persistent access after expiry |
| **Consent Revocation** | User can revoke consent from DigiLocker dashboard (https://digilocker.gov.in -> Activity Log) |
| **Re-Consent** | If KYC data needs refresh (e.g., address change), new consent flow required |
| **Consent Display** | Show user what data was fetched and how it will be used before proceeding |

### Data Retention Policy

| Data Type | Retention Period | Storage | Deletion |
|-----------|-----------------|---------|----------|
| Aadhaar XML (raw) | Do not retain | Transient (process and discard) | Delete immediately after field extraction |
| Extracted fields (name, DOB, address) | 8 years post account closure | Encrypted at rest (AES-256) | Automated purge per retention policy |
| Aadhaar photo (base64) | 8 years post account closure | Encrypted blob storage | Automated purge |
| Consent record | 8 years post account closure | Audit log database | Automated purge |
| Access token | 1 hour | In-memory only (Redis/session) | Auto-expires; never persist to disk |
| DigiLocker transaction ID | 8 years | Audit log | Automated purge |

### Virtual ID Support

Aadhaar Virtual ID (VID) is a 16-digit temporary number that maps to the Aadhaar number but can be revoked and regenerated by the user.

| Aspect | Details |
|--------|---------|
| **Length** | 16 digits (vs 12 for Aadhaar) |
| **Validity** | Until revoked by user or new VID generated |
| **Generation** | User generates from UIDAI portal or mAadhaar app |
| **DigiLocker Support** | VID can be used for DigiLocker login instead of Aadhaar number |
| **Recommendation** | Support VID as alternative; privacy-conscious users may prefer it |

---

## 10. API Technical Details

### Endpoints

| Environment | Base URL | Purpose |
|-------------|---------|---------|
| **Production** | `https://api.digitallocker.gov.in` | Live API |
| **Sandbox** | `https://sandbox.digitallocker.gov.in` (or as provided during empanelment) | Testing |
| **API Setu** | `https://apisetu.gov.in/digilocker` | Alternative documentation portal |

### Authentication

| Parameter | Details |
|-----------|---------|
| **Client ID** | Issued during MeitY empanelment (alphanumeric string) |
| **Client Secret** | Issued during empanelment; must be kept confidential (never expose in client-side code) |
| **Token Type** | OAuth 2.0 Bearer token (JWT) |
| **Token in Header** | `Authorization: Bearer <access_token>` |

### API Endpoints Reference

| Method | Endpoint | Purpose | Auth Required |
|--------|----------|---------|---------------|
| `GET` | `/public/oauth2/1/authorize` | Redirect user for consent | Client ID only (in URL) |
| `POST` | `/public/oauth2/1/token` | Exchange auth code for token | Client ID + Client Secret |
| `GET` | `/public/oauth2/1/user/details` | Fetch user profile | Bearer token |
| `GET` | `/public/oauth2/1/user/files` | List available documents | Bearer token |
| `GET` | `/public/oauth2/1/pull/<URI>` | Fetch specific document | Bearer token |
| `GET` | `/public/oauth2/1/user/files/<URI>` | Download document file | Bearer token |

### Rate Limits

| Tier | Requests/Minute | Requests/Day | Notes |
|------|----------------|-------------|-------|
| **Standard** | 60 | 10,000 | Default tier for new partners |
| **Premium** | 300 | 100,000 | Request via MeitY for high-volume partners |
| **Via Aggregator** | Varies | Varies | Governed by aggregator's allocation |

Rate limit exceeded returns HTTP 429 with `Retry-After` header.

### Error Codes

| HTTP Code | Error | Description | Action |
|-----------|-------|-------------|--------|
| 200 | - | Success | Process response |
| 400 | `invalid_request` | Missing or malformed parameters | Fix request parameters |
| 401 | `invalid_token` | Access token expired or invalid | Re-authenticate (new consent flow) |
| 403 | `consent_denied` | User denied consent on DigiLocker screen | Show user-friendly message; offer Offline XML fallback |
| 404 | `document_not_found` | Requested document not available in user's DigiLocker | Skip this document; try alternative |
| 408 | `request_timeout` | DigiLocker server timeout | Retry with exponential backoff |
| 429 | `rate_limit_exceeded` | Too many requests | Implement backoff; respect `Retry-After` header |
| 500 | `internal_server_error` | DigiLocker server error | Retry after delay; escalate if persistent |
| 502 | `bad_gateway` | Upstream issuer unavailable (e.g., UIDAI down) | Retry later; offer Offline XML fallback |
| 503 | `service_unavailable` | DigiLocker under maintenance | Show maintenance message; offer Offline XML fallback |

### Retry Strategy

```
Retry Policy:
  Max retries: 3
  Initial delay: 1 second
  Backoff multiplier: 2x (1s -> 2s -> 4s)
  Max delay: 10 seconds
  Retryable codes: 408, 429, 500, 502, 503
  Non-retryable: 400, 401, 403, 404
```

### Webhook / Polling

DigiLocker does **not** natively support webhooks. The OAuth flow is synchronous:
- User completes consent -> redirect with code -> exchange for token -> fetch documents
- All steps happen in the same user session
- No async notification mechanism

If using an aggregator (Digio), webhook callbacks may be available for status updates on asynchronous operations.

### Request/Response Format

| Aspect | Details |
|--------|---------|
| **Request Format** | Form-encoded (token endpoint); URL parameters (authorize endpoint) |
| **Response Format** | JSON (profile, file list); XML or PDF (documents) |
| **Character Encoding** | UTF-8 |
| **Date Format** | `YYYY-MM-DD` (ISO 8601) in Aadhaar XML; `DD-MM-YYYY` in some profile responses |
| **Photo Format** | Base64-encoded JPEG in XML; inline in PDF documents |

---

## 11. Edge Cases

### 11.1: User Does Not Have a DigiLocker Account

**Frequency**: ~20-30% of new customers (especially in tier-2/3 cities, older demographics)

**Handling**:
```
1. Display message: "You don't have a DigiLocker account yet"
2. Provide link: https://digilocker.gov.in/signup
3. Inform user: "Creating an account takes ~2 minutes with your Aadhaar OTP"
4. Option: "Or skip DigiLocker and upload documents manually"
5. If user creates account:
   -> Return to KYC flow
   -> Re-initiate DigiLocker consent
6. If user skips:
   -> Fallback to Aadhaar Offline XML (Section 7) or manual upload + OCR
   -> VIPV (Video KYC) will be required since IPV exemption is lost
```

### 11.2: Documents Not Available in DigiLocker

**Scenario**: User has DigiLocker account but specific documents (e.g., PAN, DL) are not linked/available.

**Handling**:
```
1. Aadhaar is almost always available (linked by default)
2. PAN may not be available if not pulled into DigiLocker previously
   -> User can link PAN in DigiLocker (takes 1-2 minutes)
   -> Or skip; PAN is verified via Decentro API anyway
3. DL/Voter ID may not be available for all states
   -> Fallback to manual upload + OCR (HyperVerge)
4. Passport availability depends on Passport Seva portal linkage
   -> Fallback to manual upload + OCR
```

### 11.3: Aadhaar Address Mismatch with Current Address

**Frequency**: ~15-20% of customers (people who have moved)

**Handling**:
```
1. Aadhaar address is accepted as permanent/correspondence address
2. If customer's current address differs:
   -> Ask: "Is this your current address?"
   -> If No: Collect current address separately
   -> Request additional address proof (utility bill, bank statement, rent agreement)
   -> Upload and OCR the additional address proof
3. For KRA/CKYC upload:
   -> Aadhaar address = permanent address
   -> Current address = correspondence address (if different)
4. SEBI allows different correspondence and permanent addresses in KYC
```

### 11.4: Name Mismatch Between Aadhaar and PAN

**Frequency**: ~5-8% of customers (spelling differences, middle name inclusion/exclusion, abbreviation differences)

**Common Causes**:
- Aadhaar: "RAKESH KUMAR SHARMA" vs PAN: "RAKESH K SHARMA"
- Aadhaar: "SUNITA DEVI" vs PAN: "SUNITA" (no surname on PAN)
- Transliteration differences in regional names

**Handling**:
```
1. Run fuzzy name matching (Levenshtein distance, Jaro-Winkler, Soundex)
2. If match score >= 80%:
   -> Accept with note; use PAN name as primary (PAN is the legal name for financial purposes)
3. If match score 50-79%:
   -> Flag for manual review in KYC Admin
   -> Admin verifies by comparing both documents visually
   -> If clearly same person: approve with note
   -> If ambiguous: request customer to correct name on Aadhaar or PAN at respective authority
4. If match score < 50%:
   -> Reject auto-processing
   -> Inform customer: "Name on Aadhaar does not match PAN. Please correct at UIDAI or Income Tax Department before proceeding."
5. Cannot auto-resolve name mismatches; only the customer can update their records
```

### 11.5: DigiLocker Service Downtime

**Frequency**: Rare but does occur (government infrastructure, typically <1% downtime)

**Handling**:
```
1. Detect downtime via:
   -> HTTP 503 response from DigiLocker API
   -> Timeout (>15 seconds) on authorize redirect
   -> Known maintenance windows (MeitY publishes schedules)
2. Display message: "DigiLocker is temporarily unavailable. Please try one of the following:"
3. Offer alternatives:
   a. "Try again in a few minutes" (with auto-retry button)
   b. "Upload Aadhaar Offline XML instead" (Section 7 fallback)
   c. "Upload document photos manually" (OCR path; VIPV will be required)
4. Save application state so user can resume later
5. Monitor DigiLocker status and notify user when service is restored
```

### 11.6: Aadhaar Photo Quality Issues

**Scenario**: Photo from Aadhaar is old, low-resolution, or of poor quality, affecting face match accuracy.

**Handling**:
```
1. Always attempt face match with available photo
2. If HyperVerge face match score is 60-79%:
   -> Flag for manual review (do not auto-reject)
   -> Admin visually compares Aadhaar photo with selfie
   -> Consider factors: age difference, weight change, glasses
3. If face match score < 60%:
   -> Request user to capture selfie again (lighting, angle guidance)
   -> If still low: escalate to VIPV (Video KYC) for agent-assisted verification
4. Do not reject solely based on photo quality; Aadhaar photos are government-issued
5. Log the face match score for audit purposes regardless of outcome
```

### 11.7: User Denies Consent

**Handling**:
```
1. DigiLocker redirects back with error=access_denied
2. Display: "You chose not to share your documents via DigiLocker"
3. Offer alternatives:
   a. "Try DigiLocker again" (in case of accidental denial)
   b. "Upload Aadhaar Offline XML" (Section 7)
   c. "Upload documents manually" (OCR path)
4. Inform user: "Without DigiLocker, video verification (VIPV) will be required"
5. Track consent denial rate for analytics (high denial rate may indicate UX issues)
```

### 11.8: OAuth Redirect Failures

**Scenarios**: Browser compatibility issues, popup blockers, corporate firewalls blocking DigiLocker URLs, mobile browser in-app webview issues.

**Handling**:
```
1. Detect redirect failure (timeout on callback, user reports issue)
2. Suggestions:
   a. "Try using Chrome or Safari browser"
   b. "Disable popup blocker for this site"
   c. "If using a corporate network, try on mobile data"
   d. "Try on a different device"
3. Alternative: Open DigiLocker in a new tab/window instead of redirect
4. Mobile apps: Use Chrome Custom Tabs (Android) or SFSafariViewController (iOS) instead of WebView
5. Fallback: Offer Offline XML or manual upload
```

### 11.9: Aadhaar OTP Not Received

**Scenario**: User attempts DigiLocker login via Aadhaar OTP but OTP is not delivered to registered mobile.

**Handling**:
```
1. This is a UIDAI/telecom issue, not a DigiLocker issue
2. Display: "OTP not received? Please check:"
   a. "Is your mobile number updated with Aadhaar?"
   b. "Check if SMS is blocked by DND settings"
   c. "Wait 30 seconds and try 'Resend OTP'"
3. If persistent:
   a. "Try DigiLocker username/password login instead" (if previously set up)
   b. "Use Aadhaar Offline XML method" (download from mAadhaar app which uses device authentication)
   c. "Visit nearest Aadhaar enrollment center to update mobile number"
```

---

## 12. Integration with Other Vendors

DigiLocker data flows into multiple downstream systems and vendor integrations.

### Data Flow Diagram

```
                    DigiLocker
                        |
                        v
              +-------------------+
              | Aadhaar XML Data  |
              | Name, DOB, Gender |
              | Address, Photo    |
              +-------------------+
                   |    |    |    |
        +----------+    |    |    +----------+
        |               |    |               |
        v               v    v               v
  +-----------+   +----------+  +---------+  +----------+
  | HyperVerge|   | KRA      |  | CKYC    |  | Exchange |
  | Face Match|   | Upload   |  | Upload  |  | UCC      |
  +-----------+   +----------+  +---------+  +----------+
        |               |           |             |
        v               v           v             v
  Photo vs Selfie  Auto-fill    Auto-fill    Auto-fill
  Liveness check   KRA fields   CKYC fields  UCC fields
```

### 12.1: DigiLocker Photo -> HyperVerge Face Match

| Aspect | Details |
|--------|---------|
| **Input** | `Pht` (base64 JPEG from Aadhaar XML) = Reference Image (image1) |
| **Paired With** | Live selfie captured via HyperVerge SDK = Probe Image (image2) |
| **API** | `POST https://ind-faceid.hyperverge.co/v1/photo/verifyPair` |
| **Expected Output** | `match: yes/no`, `match-score: 0-100`, `to-be-reviewed: yes/no` |
| **Threshold** | score >= 80 -> auto-approve; 60-79 -> manual review; <60 -> re-capture or VIPV |
| **Photo Prep** | Decode base64, save as JPEG, resize if needed (min 150x150px) |

### 12.2: DigiLocker Aadhaar Data -> KRA Upload

Fields auto-filled into KRA upload payload (Digio KRA API):

| DigiLocker Field | KRA Field | KRA Upload Column |
|-----------------|-----------|------------------|
| `Poi/@name` | Applicant Name | `NAME` |
| `Poi/@dob` | Date of Birth | `DOB` |
| `Poi/@gender` | Gender | `GENDER` |
| `Poa/@house` + `Poa/@street` | Correspondence Address Line 1 | `CORR_ADDR1` |
| `Poa/@lm` + `Poa/@loc` | Correspondence Address Line 2 | `CORR_ADDR2` |
| `Poa/@vtc` | Correspondence City | `CORR_CITY` |
| `Poa/@pc` | Correspondence Pincode | `CORR_PIN` |
| `Poa/@state` | Correspondence State | `CORR_STATE` |
| `Poa/@country` | Correspondence Country | `CORR_COUNTRY` |
| Same address fields | Permanent Address | `PERM_ADDR1`, `PERM_ADDR2`, etc. |
| `Poi/@name` + verification | Identity Proof Type | `POI_TYPE` = "Aadhaar" |

### 12.3: DigiLocker PAN -> Cross-Verify with Decentro PAN API

| Step | Action |
|------|--------|
| 1 | Fetch PAN from DigiLocker (if available): `in.gov.cbdt-PANCR` |
| 2 | Extract PAN number from DigiLocker response |
| 3 | Verify PAN via Decentro API: `POST /kyc/public/api/customer/verification/validate` with `document_type: "PAN_COMPARE"` |
| 4 | Compare: DigiLocker PAN name vs Decentro PAN name vs Aadhaar name |
| 5 | If all match: high confidence identity verification |
| 6 | If mismatch: flag for review (names may differ between PAN and Aadhaar) |

### 12.4: DigiLocker Address -> CKYC Upload

Fields auto-filled into CKYC upload payload (Decentro CKYC API):

| DigiLocker Field | CKYC Field | Notes |
|-----------------|-----------|-------|
| `Poa/@house` + `Poa/@street` | `address_line_1` | Concatenate with comma separator |
| `Poa/@lm` + `Poa/@loc` | `address_line_2` | Concatenate with comma separator |
| `Poa/@vtc` | `city` | Village/Town/City |
| `Poa/@dist` | `district` | District name |
| `Poa/@state` | `state_code` | Map state name to 2-letter state code |
| `Poa/@pc` | `pincode` | 6-digit pincode |
| `Poa/@country` | `country_code` | `IN` for India |
| `Poi/@name` | `full_name` | As per Aadhaar |
| `Poi/@dob` | `dob` | Convert to DD-MM-YYYY for CKYC |
| `Poi/@gender` | `gender` | M/F/T |
| `Pht` | `photo` | Base64 JPEG (mandatory for CKYC upload) |

### 12.5: DigiLocker Data -> Exchange UCC Registration

| DigiLocker Field | NSE UCC Field | BSE UCC Field |
|-----------------|--------------|--------------|
| `Poi/@name` | `client_name` | `Client Name (First + Last)` |
| `Poi/@dob` | `dob` | `Date of Birth` (DD/MM/YYYY) |
| `Poi/@gender` | `gender` | `Gender` (M/F/T) |
| `Poa` (concatenated) | `address` | `Address Line 1-3` |
| `Poa/@vtc` or `Poa/@dist` | `city` | `City` |
| `Poa/@state` | `state` | `State` (2-letter code) |
| `Poa/@pc` | `pincode` | `Pincode` |
| Masked Aadhaar | `aadhaar_number` (masked) | `Aadhaar Number` (masked) |

---

## 13. Recent Changes (2024-2026)

### Timeline of Relevant Changes

| Date | Change | Impact on DigiLocker Integration |
|------|--------|--------------------------------|
| **Oct 2023** | SEBI KYC Master Circular (SEBI/HO/MIRSD/MIRSD-SEC-2/P/CIR/2023/168) | Confirmed DigiLocker as valid eKYC mechanism; IPV exemption codified |
| **Feb 2023** | SEBI circular on Aadhaar eKYC (SEBI/HO/MIRSD/SEC-2/P/CIR/2023/37) | Explicit IPV exemption when Aadhaar eKYC via DigiLocker |
| **Nov 2022** | DDPI replaces POA | No direct impact on DigiLocker; DDPI is a separate consent |
| **Jan 2025** | CKYC Search returns masked CKYC number | No impact on DigiLocker; affects downstream CKYC integration |
| **Jan 2025** | Up to 10 nominees (SEBI mandate) | No impact on DigiLocker; nominee data collected in KYC form |
| **Mar 2025** | NPCI e-KYC Setu launched | New alternative to DigiLocker Aadhaar eKYC (Section 6) |
| **Jun 2025** | SEBI allows NPCI e-KYC Setu | Regulatory green light for e-KYC Setu; DigiLocker remains primary |
| **Jun 2025** | SEBI Stock Brokers Master Circular (SEBI/HO/MIRSD/PoD/P/CIR/2025/90) | Updated KYC framework; DigiLocker position reaffirmed |
| **Jan 2026** | SEBI Stock Brokers Regulations 2026 notified | Replaces 1992 regulations entirely; data retention now 8 years |
| **Ongoing** | DigiLocker 2.0/3.0 API updates | MeitY incrementally adding new document types and API features |
| **Ongoing** | New issuers joining DigiLocker | More state-level documents becoming available (utility bills, property records) |

### API Version History

| Version | Status | Key Changes |
|---------|--------|-------------|
| v1.0 | Deprecated | Original XML-based API |
| v1.1 | Current (production) | OAuth 2.0 consent flow; JSON + XML responses; partner spec v1.11 |
| v2.0 | Upcoming (announced) | Enhanced API; additional document types; improved error handling |
| v3.0 | Planned | Potential integration with Account Aggregator ecosystem |

### What to Watch

1. **NPCI e-KYC Setu maturation**: If IPV exemption is explicitly confirmed for e-KYC Setu, it could become the preferred path due to privacy benefits
2. **DigiLocker for corporates**: MeitY has discussed expanding DigiLocker to cover CIN-linked corporate documents; would transform non-individual KYC
3. **Account Aggregator integration**: DigiLocker data as a consent artifact in the AA ecosystem is being explored
4. **DPDP Act enforcement**: Full enforcement of the Digital Personal Data Protection Act may impose additional consent and data handling requirements on DigiLocker integrations

---

## 14. Cost

### Direct Partnership (MeitY Requester Entity)

| Item | Cost | Notes |
|------|------|-------|
| **Empanelment** | Free (no fee to MeitY) | But internal costs for security audit, integration development |
| **Security Audit** | Rs. 2-5 lakh (one-time) | STQC or empaneled auditor |
| **Integration Development** | Rs. 5-10 lakh (one-time) | Developer effort for OAuth flow, XML parsing, error handling |
| **Per Document Fetch** | Rs. 0-1 per fetch | Government service; near-zero marginal cost |
| **Infrastructure** | Rs. 1-2 lakh/month | Dedicated servers meeting MeitY security standards |
| **Annual Compliance** | Rs. 1-2 lakh/year | Periodic security reviews, re-certification |

**Break-Even vs Aggregator**: At ~5,000+ onboardings/month, direct partnership becomes cheaper than aggregator.

### Via Aggregator (Digio / Decentro)

| Item | Digio | Decentro | Notes |
|------|-------|----------|-------|
| **Setup Fee** | Nil - Rs. 50,000 | Nil - Rs. 25,000 | Negotiable based on volume commitment |
| **Aadhaar eKYC (DigiLocker)** | Rs. 3-5 per consent | Rs. 3-5 per consent | Includes OAuth flow + document fetch |
| **PAN Fetch (DigiLocker)** | Rs. 2-3 per fetch | Rs. 2-3 per fetch | |
| **DL / Voter ID Fetch** | Rs. 2-5 per fetch | Rs. 2-5 per fetch | |
| **Aadhaar Offline XML Decrypt** | Rs. 3-5 per decrypt | Rs. 3-5 per decrypt | Fallback method |
| **Monthly Minimum** | Rs. 5,000-10,000 | Rs. 5,000-10,000 | Varies by contract |
| **Volume Discounts** | Available at 10K+/month | Available at 10K+/month | Negotiate slab-based pricing |

### Cost Comparison: DigiLocker Path vs Manual Upload Path

| Cost Item | DigiLocker Path | Manual Upload + OCR Path |
|-----------|----------------|--------------------------|
| Document fetch / upload | Rs. 3-5 (DigiLocker) | Rs. 0 (user uploads) |
| OCR extraction | Rs. 0 (structured XML) | Rs. 1-3 per doc (HyperVerge) |
| Document verification | Rs. 0 (government-signed) | Rs. 1-2 (tampering check) |
| VIPV / Video KYC | Rs. 0 (IPV exempt) | Rs. 30-50 (HyperVerge VIPV) |
| Manual review effort | Low (high-confidence data) | Higher (OCR errors, forgery risk) |
| **Total per customer** | **Rs. 3-5** | **Rs. 32-55** |
| **Savings** | - | **Rs. 30-50 per customer** |

At 10,000 onboardings/month, DigiLocker path saves approximately **Rs. 3-5 lakh/month** compared to the manual upload + VIPV path.

### Estimated Per-Onboarding Cost (DigiLocker Path)

| Step | Vendor | Cost (Rs.) |
|------|--------|-----------|
| PAN Verification | Decentro | 1-3 |
| DigiLocker Aadhaar eKYC | Digio/DigiLocker | 3-5 |
| Bank Verification (Penny Drop) | Decentro | 2-5 |
| KRA Lookup | Digio | 3-5 |
| Face Match + Liveness | HyperVerge | 2-4 |
| AML/PEP Screening | TrackWizz | 5-15 |
| eSign | Digio | 15-25 |
| CKYC Upload | Decentro | 5-10 |
| **Total (DigiLocker path)** | | **Rs. 36-72** |
| **Total (without DigiLocker, with VIPV)** | | **Rs. 80-150** |

---

## 15. Implementation Checklist

### Pre-Integration

- [ ] Choose integration path: Direct (MeitY Requester Entity) vs Aggregator (Digio/Decentro)
- [ ] If direct: Apply for MeitY Requester Entity empanelment
- [ ] If direct: Complete STQC security audit (Rs. 2-5 lakh)
- [ ] If aggregator: Sign commercial agreement with Digio/Decentro
- [ ] Obtain sandbox/UAT credentials
- [ ] Register OAuth 2.0 redirect URIs

### Development

- [ ] Implement OAuth 2.0 consent flow (authorization URL → callback → token exchange)
- [ ] Implement Aadhaar eKYC document fetch (demographic + photo)
- [ ] Implement PAN document fetch from DigiLocker
- [ ] Implement Driving License fetch (if needed)
- [ ] Parse Aadhaar XML response (name, DOB, gender, address, photo)
- [ ] Build NPCI e-KYC Setu integration (Jun 2025 — Aadhaar eKYC without sharing Aadhaar number)
- [ ] Implement Aadhaar Offline XML fallback (share code + decrypt)
- [ ] Build consent management (capture, store, audit trail per DPDP Act)
- [ ] Implement document verification (check DigiLocker digital signature)
- [ ] Map fetched data to KYC_MASTER_DATASET.md fields (R22-R26)
- [ ] Build address parsing logic (split DigiLocker address into components)
- [ ] Handle partial data scenarios (missing fields in DigiLocker response)

### Testing (UAT)

- [ ] Test: OAuth consent flow — successful authorization
- [ ] Test: OAuth consent flow — user denies consent
- [ ] Test: Aadhaar eKYC fetch — complete data
- [ ] Test: Aadhaar eKYC fetch — partial data (missing fields)
- [ ] Test: PAN fetch — successful
- [ ] Test: NPCI e-KYC Setu — Aadhaar eKYC without Aadhaar number
- [ ] Test: Aadhaar Offline XML — download, share code, decrypt
- [ ] Test: Token expiry and refresh flow
- [ ] Test: DigiLocker downtime handling (fallback to manual upload)
- [ ] Test: Cross-verification — DigiLocker name vs PAN name (fuzzy match)
- [ ] Test: Address parsing — various address formats

### Production

- [ ] Switch from sandbox to production credentials
- [ ] Deploy DigiLocker integration to production
- [ ] Verify first live Aadhaar eKYC fetch
- [ ] Verify first live PAN fetch
- [ ] Set up monitoring: consent rates, fetch success rates, latency
- [ ] Track IPV exemption compliance (DigiLocker fetch = IPV exempt)
- [ ] Document runbook for DigiLocker downtime and common errors

---

*This document should be read alongside [VENDOR_INTEGRATIONS.md](../../VENDOR_INTEGRATIONS.md) for the complete vendor stack and [KYC_MASTER_DATASET.md](../../KYC_MASTER_DATASET.md) for field-level data mapping. Each section references specific fields (R22-R26) from the master dataset.*

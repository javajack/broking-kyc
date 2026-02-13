---
title: CKYC
description: Central KYC (CERSAI) integration — search, download, and upload for KYC identity record management.
---

Central KYC (CKYC) is India's unified identity registry for all financial institutions, operated by CERSAI (Central Registry of Securitisation Asset Reconstruction and Security Interest of India) through its technology partner Protean (formerly NSDL e-Governance Infrastructure Limited). Unlike the KRA (KYC Registration Agency) system which serves only the securities market, CKYC spans banking, insurance, securities, and NBFCs (Non-Banking Financial Companies) -- making it the single most comprehensive KYC repository in the Indian financial ecosystem.

Every individual in the registry is assigned a unique 14-digit KIN (KYC Identification Number) that serves as a permanent cross-sector identity reference. When a customer completes KYC at any financial institution, that record becomes available to all other regulated entities through search and download operations. This is the "do KYC once, use everywhere" vision that CKYC was designed to fulfill -- eliminating redundant identity verification across institutions and reducing onboarding friction for customers.

Since August 2024, SEBI (Securities and Exchange Board of India) mandates dual upload to both KRA and CKYC for every new account. This page covers the complete CKYC integration: search, download, and upload operations via Decentro (our primary aggregator), the SFTP batch pipeline for bulk processing, dual upload orchestration with KRA, and handling of the January 2025 masking change that altered how CKYC numbers are returned in search responses.

## Table of Contents

1. [Overview](#1-overview)
2. [CKYC Operations](#2-ckyc-operations)
3. [SFTP Batch Upload](#3-sftp-batch-upload)
4. [Via Decentro (Primary Aggregator)](#4-via-decentro-primary-aggregator)
5. [CKYC + KRA Dual Upload Flow](#5-ckyc--kra-dual-upload-flow)
6. [Non-Individual Entities](#6-non-individual-entities)
7. [CKYC Number (KIN)](#7-ckyc-number-kin)
8. [Edge Cases](#8-edge-cases)
9. [Data Privacy](#9-data-privacy)
10. [Pricing](#10-pricing)
11. [Recent Changes (2024-2026)](#11-recent-changes-2024-2026)
12. [Key References](#12-key-references)

:::tip[Quick Reference]

| Attribute | Value |
|-----------|-------|
| System | CERSAI Central KYC Registry (Protean) |
| Unique Identifier | 14-digit KIN |
| Integration | Decentro REST API |
| Operations | Search, Download, Upload |
| Masked Search | Since Jan 2025 — Download for full record |
| Upload SLA | 4-5 working days for KIN generation |
| Dual Upload | KRA + CKYC mandatory since Aug 2024 |

:::

---

## 1. Overview

### What is CKYC?

The **Central KYC Registry (CKYCR)** is a centralized repository of KYC records maintained by **CERSAI** (Central Registry of Securitisation Asset Reconstruction and Security Interest of India). **Protean** (formerly NSDL e-Governance Infrastructure Limited) is the technology partner that operates the CKYC system on behalf of CERSAI.

### Purpose

CKYC provides a **single KYC record per individual** accessible by all regulated financial institutions across sectors:
- Banks (RBI-regulated)
- Stock brokers and intermediaries (SEBI-regulated)
- Insurance companies (IRDAI-regulated)
- Mutual fund houses (SEBI-regulated via AMFIs)
- NBFCs and payment banks

When a customer completes KYC at any financial institution, that record is uploaded to the CKYC registry. Any other financial institution can then search and download the existing record instead of re-doing KYC from scratch. This is the "do KYC once, use everywhere" vision.

### CKYC Identification Number (KIN)

Every individual in the CKYC registry is assigned a **14-digit CKYC Identification Number (KIN)**. This is the unique identifier for a person across all financial institutions in India.

- Format: 14 numeric digits (e.g., `50000012345678`)
- Assigned by CERSAI upon successful upload
- One KIN per person (deduplicated by PAN + DOB + name)
- Permanent -- does not change even when records are updated

### CKYC vs KRA: Key Differences

| Aspect | CKYC (CKYCR) | KRA |
|--------|-------------|-----|
| **Regulator** | RBI (via CERSAI) | SEBI |
| **Scope** | All financial sectors (banking, insurance, securities, pensions) | Securities market only (brokers, DPs, MFs) |
| **Operator** | Protean (single registry) | 5 KRAs (CVL, NDML, DOTEX, CAMS, KFintech) |
| **Template** | CERSAI Part I template (identity-focused) | KRA form (includes trading-specific fields) |
| **Unique ID** | 14-digit KIN | PAN-based (no separate ID) |
| **Impact on trading** | No direct impact -- regulatory compliance only | Direct impact -- KRA status determines trading permission |
| **Mandate** | RBI circular + SEBI circular (Aug 2024) | SEBI KYC norms (longstanding) |

### Dual Upload Mandate

Since **August 1, 2024**, SEBI mandates that all intermediaries must upload KYC records to **both** KRA and CKYC:
- **Circular**: SEBI/HO/MIRSD/SECFATF/P/CIR/2024/79 (Jun 6, 2024)
- Previously, brokers only uploaded to KRA; CKYC upload was optional
- Now both are mandatory for every new account opening

---

## 2. CKYC Operations

With the conceptual groundwork established, this section walks through the four core API operations -- Search, Download, Upload, and Modify -- that make up the real-time CKYC integration via Decentro.

### 2a. Search

Search the CKYC registry to check if a customer already has an existing CKYC record.

**Endpoint**: `POST /kyc/ckyc/search`
**Decentro Docs**: https://docs.decentro.tech/reference/kyc-and-onboarding-api-reference-identities-ckyc-services-search

#### Request

```json
{
  "reference_id": "CKYC_SEARCH_20260213_001",
  "document_type": "PAN",
  "id_number": "ABCDE1234F",
  "consent": true,
  "consent_purpose": "KYC verification for stock broking account opening"
}
```

**Supported search document types**:
| Document Type | API Value | Notes |
|--------------|-----------|-------|
| PAN | `PAN` | Primary search key (recommended) |
| Aadhaar | `AADHAAR` | 12-digit Aadhaar number |
| Voter ID | `VOTER_ID` | EPIC number |
| Passport | `PASSPORT` | Passport number |
| Driving Licence | `DRIVING_LICENCE` | DL number |

:::tip[Use PAN as the Primary Search Key]
PAN is the recommended search key because it has the highest match rate and is mandatory for all securities market participants. Since PAN is already captured and verified earlier in the onboarding flow, it is always available at the point when CKYC search is triggered -- no additional customer input required.
:::

#### Response (Success -- Record Found)

```json
{
  "decentroTxnId": "DTX-CKYC-20260213-xxxx",
  "status": "SUCCESS",
  "responseCode": "S00000",
  "message": "CKYC record found",
  "data": {
    "ckycId": "$XXXX1234$",
    "ckycReferenceId": "REF123456789",
    "fullName": "RAKESH KUMAR",
    "fathersFullName": "SURESH KUMAR",
    "dob": "1990-05-15",
    "gender": "M",
    "kycDate": "2023-06-15",
    "lastUpdated": "2024-03-10",
    "photo": "<BASE64_ENCODED_PHOTO>",
    "identityDetails": [
      {
        "idType": "PAN",
        "idNumber": "ABCDE1234F"
      },
      {
        "idType": "AADHAAR",
        "idNumber": "XXXX XXXX 5678"
      }
    ]
  }
}
```

#### Response (No Record Found)

```json
{
  "decentroTxnId": "DTX-CKYC-20260213-yyyy",
  "status": "SUCCESS",
  "responseCode": "S00001",
  "message": "No CKYC record found for the given document",
  "data": null
}
```

#### Jan 2025 Masking Change

Since **January 2025**, CERSAI introduced a privacy enhancement: CKYC Search returns a **masked CKYC number** in the format `$XXXX1234$` (only last 4 digits visible). The full 14-digit KIN is only available via the **Download** operation.

**Implications**:
- Search alone is no longer sufficient to get the full KIN
- If you need the KIN for KRA upload or depository records, you must call Download
- The masked ID can still be used to identify that a record exists
- The `ckycReferenceId` from search can be used as input to the Download API

:::caution[Breaking Change -- Masked KIN in Search Response]
The January 2025 masking change is a breaking change for any integration that previously relied on the Search response alone to obtain the full 14-digit KIN. If your system stored the KIN from Search results, you must now add a Download call after every successful Search to retrieve the unmasked KIN. Audit any existing code paths that parse the `ckycId` field, as the masked format (`$XXXX1234$`) will fail validation checks expecting 14 numeric digits.
:::

#### Error Codes

| Code | Meaning | Action |
|------|---------|--------|
| `S00000` | Success -- record found | Proceed to Download if full record needed |
| `S00001` | No record found | Proceed with fresh CKYC upload after KYC capture |
| `E00001` | Invalid document type | Check document_type parameter |
| `E00002` | Invalid document number | Validate format before calling |
| `E00003` | Consent not provided | Ensure `consent: true` is set |
| `E00010` | CKYC registry unavailable | Retry after delay (see edge cases) |
| `E00011` | Rate limit exceeded | Implement exponential backoff |

---

### 2b. Download

Download the complete CKYC record for a customer, including all personal details, addresses, identity documents, and images.

**Endpoint**: `POST /kyc/ckyc/download`
**Decentro Docs**: https://docs.decentro.tech/reference/kyc-and-onboarding-api-reference-identities-ckyc-services-download

#### Request

```json
{
  "reference_id": "CKYC_DOWNLOAD_20260213_001",
  "ckyc_number": "50000012345678",
  "consent": true,
  "consent_purpose": "KYC verification for stock broking account opening"
}
```

Alternative input (when full CKYC number is not available):

```json
{
  "reference_id": "CKYC_DOWNLOAD_20260213_002",
  "document_type": "PAN",
  "id_number": "ABCDE1234F",
  "consent": true,
  "consent_purpose": "KYC verification for stock broking account opening"
}
```

#### Response Fields (50+ fields)

The Download response returns the complete CKYC record. Fields are grouped below:

**Personal Details**:
| Field | Type | Description |
|-------|------|-------------|
| `prefix` | String | Mr/Mrs/Ms/Dr etc. |
| `firstName` | String | First name |
| `middleName` | String | Middle name (optional) |
| `lastName` | String | Last name / surname |
| `maidenName` | String | Maiden name (if applicable) |
| `fullName` | String | Concatenated full name |
| `fathersFullName` | String | Father's name |
| `spouseFullName` | String | Spouse's name (if married) |
| `mothersFullName` | String | Mother's maiden name |
| `dob` | Date | Date of birth (YYYY-MM-DD) |
| `gender` | String | M/F/T |
| `maritalStatus` | String | Single/Married/Widowed/Divorced |
| `nationality` | String | Nationality code |
| `citizenship` | String | IN for Indian citizen |
| `residentialStatus` | String | Resident/NRI/FPI |
| `occupationType` | String | Occupation code (01-08) |
| `occupationDetail` | String | Free text occupation |
| `annualIncome` | String | Income range code |

**Correspondence Address**:
| Field | Type | Description |
|-------|------|-------------|
| `corrAddressLine1` | String | Line 1 (building/flat) |
| `corrAddressLine2` | String | Line 2 (street/road) |
| `corrAddressLine3` | String | Line 3 (landmark) |
| `corrCity` | String | City/Town |
| `corrDistrict` | String | District |
| `corrState` | String | State code |
| `corrPincode` | String | 6-digit PIN code |
| `corrCountry` | String | Country code (IN) |
| `corrAddressType` | String | Residential/Business/Registered Office |
| `corrAddressProofType` | String | Document type used as proof |

**Permanent Address** (same structure as correspondence, prefixed `perm`):
| Field | Type | Description |
|-------|------|-------------|
| `permAddressLine1` through `permCountry` | String | Permanent address fields |
| `sameAsCorrespondence` | Boolean | True if permanent = correspondence |

**Contact Details**:
| Field | Type | Description |
|-------|------|-------------|
| `mobileNumber` | String | 10-digit mobile |
| `mobileCountryCode` | String | +91 for India |
| `email` | String | Email address |
| `phoneNumber` | String | Landline (optional) |
| `faxNumber` | String | Fax (optional, legacy) |

**Identity Documents**:
| Field | Type | Description |
|-------|------|-------------|
| `pan` | String | PAN number |
| `aadhaar` | String | Masked Aadhaar (XXXX XXXX 1234) |
| `voterId` | String | Voter ID / EPIC number |
| `passportNumber` | String | Passport number |
| `passportExpiry` | Date | Passport expiry date |
| `drivingLicence` | String | DL number |
| `dlExpiry` | Date | DL expiry date |

**Tax / FATCA Details**:
| Field | Type | Description |
|-------|------|-------------|
| `taxResidencyCountry` | String | Country of tax residency |
| `taxIdentificationNumber` | String | TIN for non-India tax residency |
| `birthCountry` | String | Country of birth |
| `birthCity` | String | City of birth |
| `isPoliticallyExposed` | Boolean | PEP status as declared |

**Images (Base64 encoded)**:
| Field | Type | Description |
|-------|------|-------------|
| `photo` | String | Passport-size photo (Base64, JPEG/PNG) |
| `signature` | String | Signature image (Base64, JPEG/PNG) |
| `identityProofImage` | String | Scanned copy of ID proof |
| `addressProofImage` | String | Scanned copy of address proof |

**Metadata**:
| Field | Type | Description |
|-------|------|-------------|
| `ckycNumber` | String | Full 14-digit KIN (unmasked) |
| `kycDate` | Date | Original KYC date |
| `lastUpdated` | Date | Last modification date |
| `uploadedBy` | String | FI code of institution that uploaded |
| `verificationMethod` | String | IPV/OVD/eKYC/VKYC |

#### Use Case in Onboarding

When CKYC Download returns a full record for a returning customer:
1. Pre-fill the KYC form with downloaded data (name, DOB, address, contact)
2. Show the photo and signature from CKYC for visual confirmation
3. Compare with PAN/Aadhaar data from DigiLocker for consistency
4. Customer reviews pre-filled data and corrects any outdated information
5. Only capture delta fields (trading preferences, nominee details, segment selection -- Part II data not in CKYC)

---

### 2c. Upload

Submit a new CKYC record for a customer who does not have an existing CKYC record.

**Endpoint**: `POST /kyc/ckyc/upload`
**Decentro Docs**: https://docs.decentro.tech/reference/kyc-and-onboarding-api-reference-identities-ckyc-services-upload-individuals

#### Request Payload Structure

The upload payload is the most complex CKYC operation. It must conform to the CERSAI Part I template.

```json
{
  "reference_id": "CKYC_UPLOAD_20260213_001",
  "fi_code": "SEBI_BROKER_CODE",
  "branch_code": "HO_001",

  "verifier": {
    "name": "Priya Sharma",
    "designation": "Compliance Officer",
    "employee_code": "EMP-CO-001",
    "place": "Mumbai",
    "date": "2026-02-13"
  },

  "individual_record": {
    "prefix": "Mr",
    "first_name": "Rakesh",
    "middle_name": "",
    "last_name": "Kumar",
    "maiden_name": "",
    "fathers_full_name": "Suresh Kumar",
    "mothers_full_name": "Kamla Devi",
    "spouse_full_name": "",
    "dob": "1990-05-15",
    "gender": "M",
    "marital_status": "01",
    "nationality": "IN",
    "citizenship": "IN",
    "residential_status": "01",
    "occupation_type": "01",
    "pan": "ABCDE1234F",
    "mobile": "9876543210",
    "email": "rakesh.kumar@email.com"
  },

  "disability_info": {
    "is_differently_abled": false,
    "disability_type": "",
    "udid_number": ""
  },

  "current_address": {
    "line1": "Flat 402, Tower B, Green Heights",
    "line2": "Sector 62, Noida",
    "line3": "",
    "city": "Noida",
    "district": "Gautam Buddha Nagar",
    "state": "09",
    "pincode": "201301",
    "country": "IN",
    "address_type": "01",
    "proof_type": "AADHAAR"
  },

  "permanent_address": {
    "same_as_current": true
  },

  "poa": {
    "document_type": "AADHAAR",
    "document_number": "XXXX XXXX 5678",
    "issue_date": "",
    "expiry_date": ""
  },

  "kyc_verification_details": {
    "verification_type": "DIGITAL_KYC",
    "verification_date": "2026-02-13",
    "verification_place": "Online"
  },

  "documents": [
    {
      "document_type": "PHOTO",
      "file_name": "photo.jpg",
      "file_content": "<BASE64_JPEG_MAX_1MB>",
      "mime_type": "image/jpeg"
    },
    {
      "document_type": "ADDRESS_PROOF",
      "file_name": "aadhaar.jpg",
      "file_content": "<BASE64_JPEG_MAX_1MB>",
      "mime_type": "image/jpeg"
    },
    {
      "document_type": "SIGNATURE",
      "file_name": "signature.jpg",
      "file_content": "<BASE64_JPEG_MAX_1MB>",
      "mime_type": "image/jpeg"
    }
  ],

  "ids": [
    {
      "id_type": "PAN",
      "id_number": "ABCDE1234F"
    },
    {
      "id_type": "AADHAAR",
      "id_number": "XXXX XXXX 5678"
    }
  ],

  "consent": true,
  "consent_purpose": "CKYC record creation for stock broking account"
}
```

#### Mandatory Fields Checklist

| # | Field Group | Required Fields | Notes |
|---|------------|----------------|-------|
| 1 | FI Info | `fi_code`, `branch_code`, `reference_id` | Assigned by CERSAI during registration |
| 2 | Verifier | `name`, `designation`, `employee_code`, `place`, `date` | Must be an authorized signatory |
| 3 | Personal | `first_name`, `last_name`, `dob`, `gender`, `pan` | Last name mandatory even if single-word name |
| 4 | Address | At least correspondence address (line1, city, state, pincode, country) | Permanent address if different |
| 5 | Contact | `mobile` (mandatory), `email` (recommended) | At least one contact method |
| 6 | Disability | `is_differently_abled` (Boolean) | Mandatory container even if `false` |
| 7 | Documents | Photo (mandatory), Address proof (mandatory) | Base64, max 1MB each, JPEG/PNG |
| 8 | IDs | At least PAN | Aadhaar strongly recommended |
| 9 | Verification | `verification_type`, `verification_date` | Type from: CERTIFIED_COPIES / EKYC / OFFLINE_VERIFICATION / DIGITAL_KYC / E_DOCUMENT / VKYC |

#### Upload Response (Success)

```json
{
  "decentroTxnId": "DTX-CKYC-UP-20260213-xxxx",
  "status": "SUCCESS",
  "responseCode": "S00000",
  "message": "CKYC record submitted successfully",
  "data": {
    "ckycNumber": "50000098765432",
    "referenceId": "CKYC_UPLOAD_20260213_001",
    "submissionStatus": "ACCEPTED",
    "submissionDate": "2026-02-13T14:30:00+05:30"
  }
}
```

#### Upload Response (Rejected)

```json
{
  "decentroTxnId": "DTX-CKYC-UP-20260213-yyyy",
  "status": "FAILURE",
  "responseCode": "E00020",
  "message": "CKYC record rejected",
  "data": {
    "referenceId": "CKYC_UPLOAD_20260213_001",
    "submissionStatus": "REJECTED",
    "rejectionReasons": [
      "Photo quality below minimum resolution (300x300px)",
      "Address proof document expired"
    ]
  }
}
```

#### Common Rejection Reasons

| Reason | Resolution |
|--------|-----------|
| Photo quality below minimum resolution | Re-capture photo at minimum 300x300 px, clear face visible |
| Signature image unclear | Re-capture with white background, dark ink |
| Address proof expired | Request customer to provide valid address proof |
| PAN not verified / PAN inactive | Check PAN status via V1 (PAN Verification) first |
| Name mismatch between PAN and submitted name | Ensure exact name match or provide supporting documents |
| Mandatory field missing | Validate all mandatory fields before submission |
| Duplicate record exists | Perform CKYC Search first to avoid duplicates |
| Invalid state/pincode combination | Validate against India Post pincode database |

#### Processing Timeline

- **Immediate**: Decentro returns a submission acknowledgment with reference ID
- **4-5 working days**: CERSAI processes the record and generates KIN
- **Notification**: Decentro provides a webhook/callback for status updates, or poll using the reference ID
- **KIN available**: Once accepted, the 14-digit KIN can be fetched and stored

---

### 2d. Update / Modify

When a customer's data changes (address change, name change after marriage, mobile number change), submit a modification request to update the existing CKYC record.

#### When to Trigger

| Change Type | Re-verification Needed? | Supporting Documents |
|-------------|------------------------|---------------------|
| Address change | No | New address proof |
| Mobile / Email change | No | None (self-declaration) |
| Name change (marriage) | Yes | Marriage certificate + gazette notification |
| Name change (other) | Yes | Court order / gazette notification |
| DOB correction | Yes | Birth certificate / passport |
| Photo / Signature update | No | New photo/signature |
| PAN correction | Yes | PAN card copy |

#### Modification Flow

1. Retrieve existing CKYC record via Download
2. Prepare modification payload with only changed fields + supporting documents
3. Submit via `POST /kyc/ckyc/update` (or vendor-specific modify endpoint)
4. CERSAI processes the modification (5-7 working days for re-verification cases)
5. Updated record available for all FIs

#### Important Notes

- Only the **uploading FI** or the **customer's current FI** can modify the record
- If the original upload was done by a bank and the customer is now opening a broking account, the broker uploads a fresh record (CERSAI handles dedup)
- Modification requests with re-verification take longer (5-7 working days vs 2-3 for simple changes)

---

## 3. SFTP Batch Upload

While the API operations above handle real-time, per-customer interactions with CKYC, high-volume scenarios -- particularly the nightly batch after maker-checker approval -- call for a bulk upload mechanism via SFTP.

For bulk uploads -- typically used after maker-checker approval in the admin system for processing multiple records in a single batch.

### File Format

CERSAI supports two batch formats:

**JSON-Lines Format** (recommended):
```
{"reference_id":"BATCH_001","fi_code":"SEBI_BROKER","individual_record":{...},"documents":[...]}
{"reference_id":"BATCH_002","fi_code":"SEBI_BROKER","individual_record":{...},"documents":[...]}
{"reference_id":"BATCH_003","fi_code":"SEBI_BROKER","individual_record":{...},"documents":[...]}
```

Each line is a self-contained JSON record matching the upload payload structure.

### File Naming Convention

```
<FI_CODE>_<DATE>_<SEQUENCE>.<extension>

Examples:
SEBI_BROKER_20260213_001.jsonl
SEBI_BROKER_20260213_002.jsonl
```

### SFTP Configuration

| Parameter | Value |
|-----------|-------|
| Host | CERSAI-provided SFTP endpoint |
| Port | 22 (standard SFTP) |
| Authentication | SSH key + FI credentials |
| Upload directory | `/upload/individual/` |
| Response directory | `/response/individual/` |
| Max file size | 50MB per file |
| Max records per file | 1000 records |

### Batch Processing Flow

```
1. Admin approves batch of KYC records (maker-checker complete)
   |
2. System generates SFTP batch file (JSON-lines format)
   |
3. File uploaded to CERSAI SFTP server
   |       Path: /upload/individual/<FI_CODE>_<DATE>_<SEQ>.jsonl
   |
4. CERSAI processes file (T+1 to T+3 working days)
   |
5. Response file generated in /response/individual/
   |       Filename: <FI_CODE>_<DATE>_<SEQ>_RESPONSE.jsonl
   |
6. System polls SFTP for response file
   |
7. Parse response: extract KIN for accepted records, log rejections
   |
8. Update internal database with KIN and status per record
```

### Response File Format

```json
{"reference_id":"BATCH_001","status":"ACCEPTED","ckyc_number":"50000012345678","message":""}
{"reference_id":"BATCH_002","status":"REJECTED","ckyc_number":"","message":"Photo below minimum resolution"}
{"reference_id":"BATCH_003","status":"ACCEPTED","ckyc_number":"50000012345679","message":""}
```

### Use Case in Our System

The batch pipeline (defined in [KYC Flow](/broking-kyc/journey/) v2.0) uses SFTP batch for CKYC uploads:

```
Batch Pipeline Step 6: CKYC Upload
  |--- Trigger: After maker-checker approval (Step 5)
  |--- Input: All approved records pending CKYC upload
  |--- Method: SFTP batch (primary) or API per-record (fallback)
  |--- Frequency: Daily batch at 10 PM IST
  |--- Monitoring: Response file polling every 4 hours from T+1
```

---

## 4. Via Decentro (Primary Aggregator)

### Why Decentro for CKYC?

Decentro is our recommended primary vendor for CKYC integration because it abstracts away the complexity of direct CERSAI integration.

### Decentro CKYC Capabilities

| Operation | Endpoint | Supported |
|-----------|----------|-----------|
| Search | `POST /kyc/ckyc/search` | Yes |
| Download | `POST /kyc/ckyc/download` | Yes |
| Upload (Individual) | `POST /kyc/ckyc/upload` | Yes |
| Upload (Non-Individual) | `POST /kyc/ckyc/upload/non-individual` | Yes |
| Modify/Update | `POST /kyc/ckyc/update` | Yes |
| Bulk Upload | Via API batching or SFTP passthrough | Limited |

**API Docs**: https://docs.decentro.tech/docs/kyc-and-onboarding-identities-ckyc-services

### Decentro Integration Details

| Parameter | Value |
|-----------|-------|
| Base URL (Production) | `https://in.decentro.tech/v2` |
| Base URL (Sandbox) | `https://in.staging.decentro.tech/v2` |
| Authentication | API Key + Secret in headers (`client_id`, `client_secret`, `module_secret`) |
| Rate Limit | 100 requests/minute (default, negotiable) |
| Response Format | JSON |
| Timeout | 30 seconds (recommended client-side) |
| Webhook Support | Yes -- for async status updates on uploads |

### Decentro vs Direct CERSAI Integration

| Aspect | Via Decentro | Direct CERSAI |
|--------|-------------|---------------|
| **Setup time** | 1-2 weeks | 3-4 weeks |
| **Prerequisites** | Decentro account, API key | FI code registration, digital signature certificate, CKYC public key, keystore configuration |
| **API format** | Simple REST/JSON | Complex -- XML/SOAP for some operations, specific encryption requirements |
| **Authentication** | API key + secret | Digital signature per request + FI credentials |
| **Sandbox** | Yes (staging environment) | Limited test environment |
| **Monitoring** | Decentro dashboard + webhooks | Manual log review |
| **Cost per transaction** | Slight markup (Rs. 1-3 over CERSAI) | Base CERSAI pricing |
| **Cost at scale** | Higher at 10K+ records/month | Lower at scale |
| **Support** | Decentro support team + Slack channel | CERSAI helpdesk (slower response) |
| **Recommended for** | Startups, mid-size brokers, quick go-to-market | Large brokers with dedicated integration team, cost sensitivity at scale |

### Recommendation

Use **Decentro for initial launch** and API-based real-time operations (search, download, individual upload). Consider **direct CERSAI SFTP** for batch uploads once volumes exceed 5,000 records/month to optimize costs.

### Alternate: Digio

Digio also offers CKYC integration but with a different setup:

| Parameter | Value |
|-----------|-------|
| API Docs | https://documentation.digio.in/digikyc/ckyc/api_integration/ |
| Requirements | FI code, CKYC public key, keystore configuration |
| Runtime | Java 17 or Docker |
| SDK | https://github.com/digio-tech/gateway_kyc_lite |
| Setup time | 2-3 weeks |
| Best for | If already using Digio for KRA (single vendor) |

---

## 5. CKYC + KRA Dual Upload Flow

With both the API and batch pathways for CKYC covered, this section addresses the orchestration challenge: how to coordinate CKYC uploads alongside the mandatory KRA upload so that neither system becomes a bottleneck for account activation.

### Mandate

Since August 2024, every new KYC record must be uploaded to both:
1. **KRA** (via Digio -- V4 integration) -- for securities market KYC status
2. **CKYC** (via Decentro -- V5 integration) -- for cross-sector KYC registry

### Recommended Sequence

```
Customer KYC Complete + Maker-Checker Approved
  |
  +---> [Step 1] KRA Upload (via Digio) -----> BLOCKING for trading
  |       |
  |       +---> KRA Status: "KYC Registered" / "On Hold" / "Rejected"
  |
  +---> [Step 2] CKYC Upload (via Decentro) -> NON-BLOCKING for trading
          |                                      (runs in parallel)
          +---> CKYC Status: "Accepted" / "Rejected" / "Pending"
```

### Priority Rationale

**KRA first** because:
- KRA status directly determines whether the client can trade
- KRA "Registered" or "Validated" = trading allowed
- KRA "On Hold" / "Rejected" = trading blocked
- KRA processing is typically faster (1-2 working days vs 4-5 for CKYC)

**CKYC in parallel** because:
- CKYC does not impact trading permission
- CKYC is purely for regulatory compliance and cross-sector data sharing
- Failure in CKYC upload should not delay account activation

### Failure Handling Matrix

| KRA Status | CKYC Status | Action |
|------------|-------------|--------|
| Registered | Accepted | All good -- no action needed |
| Registered | Rejected | Client can trade. Retry CKYC with corrected data. Log for compliance. |
| Registered | Pending | Client can trade. Monitor CKYC status asynchronously. |
| On Hold | Accepted | Trading blocked. Resolve KRA issues (document upload, address proof). |
| On Hold | Rejected | Trading blocked. Resolve both KRA and CKYC issues. |
| Rejected | Accepted | Trading blocked. Re-submit KRA with corrected data. |
| Rejected | Rejected | Trading blocked. Review all KYC data for errors, re-submit both. |

### Retry Strategy

For CKYC upload failures:
1. **Immediate retry** (1x) -- for transient errors (timeout, server error)
2. **Delayed retry** (after 1 hour) -- for rate limiting or temporary unavailability
3. **Manual review queue** -- after 3 failed attempts, route to compliance team
4. **Daily batch retry** -- unresolved failures included in nightly batch upload

### Data Consistency

The following 6 attributes must match across KRA and CKYC records:

| Attribute | Notes |
|-----------|-------|
| Name | Exact match (or fuzzy match >95%) |
| PAN | Must be identical |
| Address | Correspondence address match |
| Mobile | 10-digit number match |
| Email | Case-insensitive match |
| Income Range | Same range code |

Discrepancies between KRA and CKYC uploads for the same client will trigger compliance flags. Ensure the same data source is used for both uploads.

---

## 6. Non-Individual Entities

CKYC supports non-individual entities with a different template and additional requirements.

### CKYC Constitution Types

| Code | Entity Type | Key Additional Fields |
|------|------------|----------------------|
| 01 | Individual | Standard fields (covered above) |
| 02 | Partnership Firm | Firm PAN, registration number, all partner details |
| 03 | Company | CIN, date of incorporation, registered office, directors, UBO |
| 04 | Trust | Trust deed reference, trustee details, settler details |
| 05 | HUF | HUF PAN, Karta details, coparcener information |
| 06 | Government Entity | Entity code, department details |
| 07 | Society | Registration number, governing body members |
| 08 | AOP/BOI | Formation document, member details |
| 09 | LLP | LLPIN, LLP agreement reference, designated partner details |
| 10 | Others | Case-by-case basis |

### Corporate (Constitution Code: 03)

**Additional mandatory fields**:
- CIN (Corporate Identification Number) from MCA
- Date of Incorporation
- Registered office address
- Director details (name, DIN, PAN, address) for all directors
- Authorized signatory details (name, designation, PAN, specimen signature)
- Board Resolution authorizing account opening (upload as document)
- UBO (Ultimate Beneficial Owner) declaration -- individuals holding >10% stake or exercising control

**UBO Requirements** (per PMLA/SEBI norms):
- Full KYC of each UBO (name, PAN, address, DOB, photo, signature)
- Ownership chain tracing to natural person(s)
- Declaration of all persons with >10% voting rights / capital

### HUF (Constitution Code: 05)

**Additional mandatory fields**:
- HUF PAN (separate from Karta's individual PAN)
- Karta details (full individual KYC -- name, PAN, DOB, address, photo)
- Coparcener information (name, relationship, PAN for each)
- HUF declaration document upload

**Note**: Karta acts as the primary contact and decision-maker. Karta must also have individual CKYC.

### Partnership Firm (Constitution Code: 02)

**Additional mandatory fields**:
- Firm PAN
- Firm registration number (if registered)
- Partnership deed reference
- All partner information (name, PAN, DOB, address, capital share %)
- Authorized partner designated for correspondence
- At least one partner must complete individual CKYC

### NRI (Residential Status: Non-Resident)

NRI accounts use the individual template (Code: 01) but with additional requirements:

| Requirement | Details |
|-------------|---------|
| Overseas address | Mandatory -- correspondence address outside India |
| Indian address | Required for communication within India (optional but recommended) |
| Tax residency | FATCA/CRS self-certification mandatory |
| Tax ID | Foreign TIN (Tax Identification Number) in country of residence |
| Passport | Copy mandatory (as identity + address proof abroad) |
| Country of residence | ISO country code |
| NRE/NRO bank account | Bank verification on NRE/NRO account |
| PIO/OCI status | If applicable, OCI/PIO card copy |

### Trust (Constitution Code: 04) / LLP (Constitution Code: 09)

**Trust additional fields**:
- Trust deed registration number and date
- Settler details (individual KYC)
- Trustee details (individual KYC for each trustee)
- Beneficiary information (if determinable)
- Purpose of trust

**LLP additional fields**:
- LLPIN (LLP Identification Number) from MCA
- LLP agreement date and registration details
- Designated Partner details (name, DPIN, PAN, KYC)
- Non-designated Partner details
- Authorized signatory

---

## 7. CKYC Number (KIN)

### Format and Structure

```
KIN: 50000012345678
      |            |
      14 digits total
      Assigned by CERSAI
      Unique per natural person
```

- **Length**: Exactly 14 numeric digits
- **Assignment**: By CERSAI upon successful CKYC upload
- **Uniqueness**: One KIN per person, deduplicated by PAN + DOB + biometrics
- **Permanence**: KIN does not change even when the CKYC record is updated or modified

### Storage Requirements

The KIN must be stored in the broker's system at multiple levels:

| System | Field | Purpose |
|--------|-------|---------|
| Customer master | `ckyc_number` (Field A25) | Primary reference for all CKYC operations |
| KRA upload record | Optional field in KRA payload | Cross-reference between KRA and CKYC |
| Depository (CDSL/NSDL) | BO account record | CDSL/NSDL may request KIN for records |
| Exchange UCC | UCC registration data | NSE/BSE may include in UCC records |
| CKYC submission log | `ckyc_kin_generated` (Field T06) | Audit trail for CKYC submission |

### Masked vs Unmasked

| Context | Format | Example | Source |
|---------|--------|---------|--------|
| CKYC Search response (post Jan 2025) | Masked | `$XXXX1234$` | Search API |
| CKYC Download response | Full (unmasked) | `50000012345678` | Download API |
| Internal database | Full (unmasked) | `50000012345678` | Stored after download |
| Display to customer | Masked | `XXXXXXXXXX5678` | UI display |
| Regulatory reports | Full | `50000012345678` | Compliance submissions |

### KIN Lifecycle

```
1. Customer has no CKYC record
   |--- KIN: None
   |
2. Broker uploads CKYC record
   |--- Status: Submitted (no KIN yet)
   |
3. CERSAI processes and accepts record (T+4-5 days)
   |--- KIN assigned: 50000012345678
   |--- Status: Accepted
   |
4. Broker fetches KIN from response/webhook
   |--- Store KIN in customer master (Field A25)
   |
5. Customer opens account at another FI (e.g., insurance)
   |--- Insurance company searches CKYC by PAN
   |--- Finds existing record with KIN 50000012345678
   |--- Downloads full record -- no re-KYC needed
   |
6. Customer updates address at bank
   |--- Bank submits CKYC modification
   |--- Same KIN, updated address
   |--- Broker can re-download to get latest data
```

---

## 8. Edge Cases

The specifications above describe the happy path, but production systems inevitably encounter scenarios that require special handling. The cases below capture the most common real-world complications and the recommended resolution for each.

### 8.1 Customer Already Has CKYC from Another FI

**Scenario**: Customer completed KYC at a bank. Now opening a broking account.

**Flow**:
1. CKYC Search by PAN returns existing record (from bank upload)
2. CKYC Download retrieves full record with photo, address, etc.
3. Pre-fill KYC form with downloaded data
4. Customer reviews and confirms (or updates outdated fields)
5. Broker captures Part II data (trading preferences, nominees, segments)
6. **No fresh CKYC upload needed** -- record already exists
7. But broker still uploads to KRA (KRA is separate from CKYC)

**Exception**: If the existing CKYC record is outdated (e.g., old address, old photo), the broker may submit a **CKYC modification** with updated data and fresh documents.

### 8.2 Data Mismatch Between CKYC and Customer-Provided Data

**Scenario**: CKYC record says "RAKESH KUMAR" but PAN card says "RAKESH KUMAR SHARMA".

**Resolution**:
1. Flag discrepancy in the system with specific mismatch details
2. Show both values to the customer in the form UI
3. Customer provides supporting document (gazette notification, marriage certificate, court order)
4. Use PAN name as authoritative (PAN is the primary ID for securities market)
5. Submit CKYC modification to correct the name if needed
6. Proceed with KYC using PAN name; do not block onboarding for CKYC name mismatch alone

### 8.3 Multiple CKYC Records for Same Person

**Scenario**: Customer was uploaded to CKYC by two different banks with slightly different data.

**Resolution**:
- CERSAI handles deduplication internally using PAN + DOB + biometric matching
- Search returns the **primary/latest** record
- If duplicates exist, CERSAI merges them (retaining the most recent data)
- The broker always gets a single record from search/download
- No action needed from the broker side

### 8.4 CKYC System Downtime

**Scenario**: CERSAI/Protean systems are unavailable during onboarding.

**Resolution**:
1. CKYC Search failure should **not block onboarding** -- CKYC is non-blocking for trading
2. Log the failure and proceed with KRA upload (which is the trading blocker)
3. Queue the CKYC upload for retry when system is available
4. Retry strategy: 3 retries with exponential backoff (1 min, 5 min, 30 min)
5. If still unavailable after retries, add to daily batch upload queue
6. CKYC upload deadline: within 10 working days of account opening (SEBI norm)

### 8.5 Minor's CKYC

**Scenario**: Opening a demat account for a minor (allowed with guardian).

**Flow**:
1. Minor's CKYC record created with guardian's details
2. Guardian's individual CKYC must also exist
3. Minor's record includes: minor's name, DOB, guardian name, guardian relationship, guardian PAN
4. When minor turns 18: fresh CKYC record as an independent individual (new KIN may be assigned)
5. Old minor record linked to new adult record via PAN

### 8.6 NRI CKYC Considerations

**Scenario**: NRI customer with overseas address and foreign tax residency.

**Additional steps**:
1. CKYC Search may not find existing record (NRI may not have Indian CKYC)
2. Upload must include overseas address as correspondence address
3. FATCA/CRS self-certification mandatory (country of tax residence, TIN)
4. Passport copy mandatory as identity proof
5. Processing may take longer (7-10 working days) due to additional verification

### 8.7 CKYC Upload After KRA Success

**Scenario**: KRA upload succeeds immediately but CKYC upload fails.

**Impact**: None on trading. The client can trade. But:
1. Non-compliance risk if CKYC not uploaded within deadline
2. Add to CKYC retry queue
3. Compliance dashboard should flag "CKYC Pending" accounts
4. Escalate if not resolved within 10 working days

:::note[CKYC Is Non-Blocking for Trading]
Unlike KRA status, which directly gates trading permission, CKYC upload status has no impact on whether a client can place orders. A failed or pending CKYC upload is a compliance concern, not a trading blocker. Design your system so that CKYC failures never delay account activation -- route them to an async retry queue and a compliance monitoring dashboard instead.
:::

### 8.8 PAN Not Active

**Scenario**: CKYC upload fails because PAN is inactive/deactivated.

**Resolution**:
- This should be caught earlier in the flow (V1: PAN Verification -- status E/F/X/D/N)
- PAN must be active (status "E" = Existing and valid) before CKYC upload
- If PAN inactive: onboarding blocked at PAN verification stage itself, before CKYC

---

## 9. Data Privacy

Because CKYC centralizes sensitive personal data across all financial sectors, a robust privacy and consent framework governs every interaction with the registry. This section outlines the key data handling obligations that the broker's implementation must satisfy.

### Aadhaar Handling

- Aadhaar is stored in **masked form** within CKYC records (last 4 digits visible)
- Full Aadhaar number is never stored or transmitted in CKYC APIs
- Aadhaar masking format: `XXXX XXXX 5678`
- Aadhaar as address proof: only masked version submitted to CKYC

:::danger[Aadhaar Storage and Transmission Restrictions]
Under the Aadhaar Act (Section 29) and UIDAI regulations, storing or logging the full 12-digit Aadhaar number is prohibited unless you are an authorized AUA/KUA. The broker must never persist the full Aadhaar number in any database, log file, API response cache, or analytics pipeline. Only the masked format (`XXXX XXXX 5678`) may be stored. Violations carry penalties up to Rs. 1 crore per incident under the Aadhaar Act.
:::

### Consent Framework

| Consent Type | When Required | Format |
|-------------|---------------|--------|
| CKYC Search consent | Before every search | API parameter (`consent: true`, `consent_purpose: "..."`) |
| CKYC Download consent | Before downloading full record | API parameter |
| CKYC Upload consent | Part of KYC form consent (Section P: `consent_kyc_data_sharing`) | Signed declaration |
| Data sharing consent | Implicit -- CKYC is a pull model | Customer acknowledged at KYC time |

### Data Sharing Model

CKYC operates on a **pull model**:
- Customer's data is uploaded by the FI that performed KYC
- Other FIs can **search** for the record only when the customer approaches them for a new relationship
- The customer implicitly consents when they provide PAN/Aadhaar for KYC at a new FI
- No FI can "push" or proactively access another FI's customer records
- Each search/download is logged by CERSAI for audit

### Data Retention

- CKYC records are **permanent** -- there is no auto-deletion
- Records persist even after the customer closes all FI relationships
- Modification updates the existing record (no versioning visible externally)
- CERSAI maintains internal audit trail of all modifications

### Broker's Data Handling Obligations

| Obligation | Details |
|------------|---------|
| Store KIN securely | Encrypted at rest in customer master database |
| Mask KIN in UI | Show only last 4 digits to customer-facing staff |
| Log all CKYC API calls | Audit trail with timestamp, reference ID, outcome |
| Do not cache full CKYC records | Download fresh when needed; do not store downloaded images long-term |
| Purge downloaded images | After extracting and storing relevant data, delete base64 images from API response logs |

---

## 10. Pricing

### Transaction Pricing

| Operation | Via Decentro | Via Digio | Direct CERSAI | Notes |
|-----------|-------------|-----------|---------------|-------|
| Search | Rs. 3-5 | Rs. 3-5 | Rs. 1-2 | Per query |
| Download | Rs. 5-8 | Rs. 5-8 | Rs. 3-5 | Per download (includes images) |
| Upload (Individual) | Rs. 8-12 | Rs. 8-10 | Rs. 5-7 | Per record |
| Upload (Non-Individual) | Rs. 10-15 | Rs. 10-15 | Rs. 7-10 | More complex validation |
| Modify/Update | Rs. 5-8 | Rs. 5-8 | Rs. 3-5 | Per modification |
| Batch Upload (SFTP) | N/A (API only) | N/A | Rs. 3-5 per record | Volume discount at scale |

### Cost Per Onboarding (CKYC Component)

**Scenario 1: New customer (no existing CKYC)**
```
CKYC Search (no result)     : Rs. 3-5
CKYC Upload (after KYC)     : Rs. 8-12
                              ----------
Total                       : Rs. 11-17
```

**Scenario 2: Returning customer (existing CKYC)**
```
CKYC Search (found)         : Rs. 3-5
CKYC Download (pre-fill)    : Rs. 5-8
                              ----------
Total                       : Rs. 8-13
(No upload needed)
```

### Volume Pricing (Decentro)

| Monthly Volume | Discount Tier | Effective Rate (Search) |
|---------------|--------------|------------------------|
| < 1,000 | Standard | Rs. 5 |
| 1,000 - 5,000 | Tier 1 | Rs. 4 |
| 5,000 - 20,000 | Tier 2 | Rs. 3 |
| > 20,000 | Custom | Negotiated |

### Registration Costs (Direct CERSAI)

| Item | Cost | Frequency |
|------|------|-----------|
| FI Code registration | Rs. 25,000 | One-time |
| Digital Signature Certificate | Rs. 5,000 - 10,000 | Annual renewal |
| Annual maintenance | Rs. 10,000 | Annual |
| Integration setup | Internal engineering cost | One-time |

---

## 11. Recent Changes (2024-2026)

| Date | Change | Impact | Reference |
|------|--------|--------|-----------|
| Jun 6, 2024 | SEBI mandates dual KRA + CKYC upload | All intermediaries must upload to both KRA and CKYC | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/79 |
| Aug 1, 2024 | Dual upload effective date | Compliance deadline for all new accounts | Same circular |
| Jan 2025 | CKYC Search returns masked KIN | Download required for full 14-digit KIN | CERSAI system update |
| Ongoing (2025-2026) | CERSAI system scalability upgrades | Improved uptime and response times expected | CERSAI internal |
| Q1 2026 | CKYC integration with e-KYC Setu (NPCI) | Future: Aadhaar eKYC data may flow directly to CKYC | Under discussion |

### Upcoming / Expected

- **CKYC for all existing customers**: SEBI may mandate retrospective CKYC upload for existing clients (currently only new accounts required)
- **CKYC interop with AA framework**: Potential integration with Account Aggregator for data sharing
- **Real-time KIN generation**: CERSAI working on reducing processing time from 4-5 days to real-time or T+1

---

## 12. Key References

### Regulatory

| Document | Reference | Date |
|----------|-----------|------|
| SEBI KYC Master Circular | SEBI/HO/MIRSD/MIRSD-SEC-2/P/CIR/2023/168 | Oct 12, 2023 |
| SEBI KRA Upload to CKYCRR | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/79 | Jun 6, 2024 |
| RBI Master Direction on KYC | RBI/2016-17/49 | Updated periodically |
| PMLA Rules (UBO, CDD) | Prevention of Money Laundering Act, 2002 | Amended 2023 |

### Technical / API

| Resource | URL |
|----------|-----|
| CERSAI CKYC Portal | https://ckyc.cersai.org.in |
| Protean CKYC (Direct FI Registration) | https://ckyc.protean-tech.in |
| Decentro CKYC API Docs | https://docs.decentro.tech/docs/kyc-and-onboarding-identities-ckyc-services |
| Decentro CKYC Search Reference | https://docs.decentro.tech/reference/kyc-and-onboarding-api-reference-identities-ckyc-services-search |
| Decentro CKYC Download Reference | https://docs.decentro.tech/reference/kyc-and-onboarding-api-reference-identities-ckyc-services-download |
| Decentro CKYC Upload Reference | https://docs.decentro.tech/reference/kyc-and-onboarding-api-reference-identities-ckyc-services-upload-individuals |
| Digio CKYC Docs | https://documentation.digio.in/digikyc/ckyc/api_integration/ |
| Digio CKYC SDK (GitHub) | https://github.com/digio-tech/gateway_kyc_lite |

### Internal Cross-References

| Artifact | Section | Relevance |
|----------|---------|-----------|
| [Master Dataset](/broking-kyc/reference/master-dataset) | Section A (Fields A25, A29) | CKYC number field, disability flag |
| [Master Dataset](/broking-kyc/reference/master-dataset) | Section T (Fields T01-T12) | CKYC submission data fields |
| [Master Dataset](/broking-kyc/reference/master-dataset) | Section R5 (Fields R36-R42) | CKYC search/download result fields |
| [Master Dataset](/broking-kyc/reference/master-dataset) | Appendix A7 | CKYC constitution type codes |
| [Vendor Integrations](/broking-kyc/vendors/) | Section 7 (V5) | Original CKYC vendor research |
| [KYC Flow](/broking-kyc/journey/) | Steps 4, 21, Batch Pipeline Step 6 | CKYC search in onboarding, CKYC upload in batch |

---

## 13. Implementation Checklist

### Pre-Integration

- [ ] Register as Financial Institution (FI) with CERSAI (or use Decentro as proxy)
- [ ] Obtain CERSAI FI code and digital certificate (if direct integration)
- [ ] Set up Decentro CKYC sandbox credentials (if aggregator path)
- [ ] Configure SFTP access for batch upload (if direct integration)
- [ ] Obtain UAT environment access

### Development

- [ ] Implement CKYC Search by PAN (via Decentro API)
- [ ] Handle masked CKYC number in search response (Jan 2025 change)
- [ ] Implement CKYC Download (full record with unmasked KIN)
- [ ] Implement CKYC Upload for individual customers (50+ fields)
- [ ] Implement CKYC Upload field mapping from Master Dataset
- [ ] Build SFTP batch upload pipeline (for bulk uploads)
- [ ] Implement dual upload flow (KRA + CKYC in parallel)
- [ ] Build CKYC record parser (XML/JSON response → internal model)
- [ ] Implement KIN storage and tracking in customer record
- [ ] Build prefill logic: CKYC Download → onboarding form fields
- [ ] Handle CKYC Upload validation errors and rejection codes
- [ ] Implement retry logic for CERSAI downtime

### Testing (UAT)

- [ ] Test: CKYC Search — existing record found (masked KIN)
- [ ] Test: CKYC Search — no record found
- [ ] Test: CKYC Download — full record retrieval
- [ ] Test: CKYC Upload — new individual record (all mandatory fields)
- [ ] Test: CKYC Upload — validation error handling
- [ ] Test: SFTP batch upload — multiple records
- [ ] Test: Dual upload — KRA + CKYC parallel submission
- [ ] Test: Prefill flow — CKYC data populates onboarding form
- [ ] Test: Edge cases — CERSAI timeout, duplicate PAN, name mismatch
- [ ] Test: Non-individual upload (Corporate/HUF) if applicable

### Production

- [ ] Switch from sandbox to production credentials
- [ ] Deploy CKYC integration to production
- [ ] Verify first live CKYC Search + Download
- [ ] Verify first live CKYC Upload (confirm KIN generation)
- [ ] Set up monitoring: success rates, latency, rejection tracking
- [ ] Set up daily reconciliation of CKYC upload status
- [ ] Document runbook for CERSAI downtime and common rejections
| `vendors/identity/KRA.md` | (Planned) | KRA integration -- dual upload counterpart |

---

## Appendix A: Field Mapping -- CKYC Upload to Master Dataset

Mapping between the CKYC upload payload and our internal [Master Dataset](/broking-kyc/reference/master-dataset) fields:

| CKYC Upload Field | Master Dataset Field | Section |
|-------------------|---------------------|---------|
| `fi_code` | `ckyc_fi_code` (T01) | T |
| `branch_code` | `ckyc_branch_code` (T02) | T |
| `reference_id` | `ckyc_reference_id` (T03) | T |
| `first_name` | `first_name` (A02) | A |
| `last_name` | `last_name` (A04) | A |
| `dob` | `date_of_birth` (A06) | A |
| `gender` | `gender` (A07) | A |
| `pan` | `pan_number` (A12) | A |
| `mobile` | `mobile_number` (A13) | A |
| `email` | `email_address` (A14) | A |
| `occupation_type` | `occupation` (A18) | A |
| `is_differently_abled` | `is_differently_abled` (A29) | A |
| `address_line1` | `corr_address_line1` (B01) | B |
| `city` | `corr_city` (B04) | B |
| `state` | `corr_state` (B06) | B |
| `pincode` | `corr_pincode` (B07) | B |
| `verification_type` | `ckyc_document_submission_type` (T09) | T |
| `verifier_name` | `ckyc_verifier_name` (T10) | T |

## Appendix B: CKYC Status Codes

| Status | Code | Meaning | Action |
|--------|------|---------|--------|
| Submitted | SU | Record submitted to CERSAI, pending processing | Wait for processing (4-5 working days) |
| Accepted | AC | Record accepted, KIN generated | Store KIN, mark CKYC complete |
| Rejected | RJ | Record rejected with reasons | Fix issues, re-submit |
| Under Process | UP | Record being processed by CERSAI | No action, wait |
| Modification Pending | MP | Modification submitted, pending approval | Wait (5-7 working days for re-verification) |

## Appendix C: Document Submission Types

| Code | Type | When Used |
|------|------|-----------|
| CERTIFIED_COPIES | Physical document copies certified by authorized person | In-branch KYC |
| EKYC | Aadhaar-based e-KYC (OTP or biometric) | Aadhaar OTP verification |
| OFFLINE_VERIFICATION | Offline Aadhaar XML or DigiLocker | DigiLocker-based KYC |
| DIGITAL_KYC | Geo-tagged photo + OVD verification | Digital KYC (RE visit) |
| E_DOCUMENT | Electronically fetched documents (DigiLocker, e-PAN) | Document pull via APIs |
| VKYC | Video KYC per RBI/SEBI norms | Video call verification |

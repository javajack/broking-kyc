# KRA (KYC Registration Agency) Integration Specification

## Vendor Integration for Indian Stock Broking KYC

**Version**: 1.0
**Date**: 2026-02-13
**Primary Vendor**: Digio (REST API wrapper over all 5 KRAs)
**Alternate**: CVL KRA Direct (SOAP/XML)
**Parent Document**: [VENDOR_INTEGRATIONS.md](../../VENDOR_INTEGRATIONS.md) - Section V4

---

## Table of Contents

1. [KRA Ecosystem Overview](#1-kra-ecosystem-overview)
2. [Digio KRA API (Primary Integration Path)](#2-digio-kra-api-primary-integration-path)
3. [KRA Status Codes (Critical for Trading)](#3-kra-status-codes-critical-for-trading)
4. [KRA Upload - Detailed Field Specification](#4-kra-upload---detailed-field-specification)
5. [Timeline & SLA](#5-timeline--sla)
6. [KRA Modify](#6-kra-modify)
7. [Non-Individual Entities](#7-non-individual-entities)
8. [Direct KRA Integration (Alternative)](#8-direct-kra-integration-alternative)
9. [Dual Upload: KRA + CKYC](#9-dual-upload-kra--ckyc)
10. [6 KYC Attributes Cross-Validation](#10-6-kyc-attributes-cross-validation)
11. [Edge Cases](#11-edge-cases)
12. [Reconciliation & Reporting](#12-reconciliation--reporting)
13. [Pricing](#13-pricing)
14. [Recent Regulatory Changes (2024-2026)](#14-recent-regulatory-changes-2024-2026)
15. [Key Reference Documents](#15-key-reference-documents)

---

## 1. KRA Ecosystem Overview

### 1.1 What is a KRA?

A KYC Registration Agency (KRA) is a SEBI-registered entity that holds and maintains the KYC records of all investors in the Indian securities market. Every intermediary (broker, mutual fund, PMS, AIF, depository participant) registered with SEBI must upload client KYC records to a KRA within 3 working days of account opening.

The KRA system ensures that once an investor completes KYC with one intermediary, they do not need to repeat the full KYC process when opening accounts with other SEBI-registered intermediaries. The new intermediary simply looks up the investor's PAN at the KRA, retrieves the existing record, and uses it.

### 1.2 The 5 SEBI-Registered KRAs

| # | KRA Name | Full Name | Promoted By | Website |
|---|----------|-----------|-------------|---------|
| 1 | **CVL KRA** | CDSL Ventures Limited KRA | CDSL (Central Depository Services Ltd) | https://www.cvlkra.com |
| 2 | **NDML KRA** | NSDL Database Management Limited KRA | NSDL (National Securities Depository Ltd) | https://kra.ndml.in |
| 3 | **CAMS KRA** | Computer Age Management Services KRA | CAMS (MF RTA) | https://www.camskra.com |
| 4 | **DOTEX KRA** | DotEx International Limited KRA | NSE subsidiary | https://www.abortkra.com |
| 5 | **KFintech KRA** | KFin Technologies KRA | KFintech (MF RTA) | https://kra.kfintech.com |

### 1.3 KRA Interoperability

All 5 KRAs operate under a SEBI-mandated interoperability framework:

- **Any KRA can access records from any other KRA** via the interoperability protocol.
- When an intermediary queries a PAN at one KRA, it receives the record regardless of which KRA originally holds it.
- The queried KRA fetches the record from the holding KRA in the background.
- The investor's KYC status is portable across all intermediaries and all KRAs.

**Practical implication**: An intermediary (broker) only needs to integrate with a single KRA (or a wrapper like Digio) to access records across all 5 KRAs.

### 1.4 KRA vs CKYC

| Attribute | KRA | CKYC |
|-----------|-----|------|
| **Regulator** | SEBI (Securities and Exchange Board of India) | RBI / CERSAI (Central Registry of Securitisation) |
| **Scope** | Securities market only (brokers, MFs, DPs, PMSs, AIFs) | All financial institutions (banks, NBFCs, insurance, securities) |
| **Data Standard** | KRA template (Part I + Part II) | CERSAI template (Part I only, standardized across financial sector) |
| **Identifier** | PAN (primary key) | 14-digit CKYC Identification Number (KIN) |
| **Part I** | Identity data (CERSAI-aligned) | Identity data (CERSAI standard) |
| **Part II** | Intermediary-specific data (trading prefs, risk, segments) | Not applicable (CKYC only stores Part I) |
| **Trading Gate** | KRA status determines if client can trade | CKYC status does NOT directly gate trading |
| **Number of Agencies** | 5 KRAs | 1 central registry (CERSAI/Protean) |

### 1.5 SEBI Mandate: Dual Upload

Since **August 2024**, SEBI mandates that every securities market intermediary must upload client KYC to **both**:
1. **KRA** (any one of the 5 KRAs) -- determines trading eligibility
2. **CKYC** (CERSAI central registry) -- financial sector-wide compliance

Failure to upload to both constitutes a compliance violation and can attract regulatory action during SEBI inspections.

### 1.6 SEBI Mandate: Intermediary KYC Obligation

Per SEBI KYC Master Circular (SEBI/HO/MIRSD/MIRSD-SEC-2/P/CIR/2023/168, October 2023):
- Every SEBI-registered intermediary must verify the KYC status of a client before opening an account.
- If the client is KYC Registered/Validated at a KRA, the intermediary fetches the existing record and verifies it.
- If the client is not KYC-compliant, the intermediary must collect KYC data and upload to a KRA within 3 working days.
- The intermediary must also verify the 6 KYC attributes (Name, PAN, Address, Mobile, Email, Income Range) and ensure consistency across KRA, exchange UCC, and depository records.

---

## 2. Digio KRA API (Primary Integration Path)

### 2.1 Why Digio

| Factor | Detail |
|--------|--------|
| **Unified Access** | Single REST API covers all 5 KRAs via interoperability |
| **API Type** | REST/JSON (vs SOAP/XML for direct KRA) |
| **Integration Time** | ~2 days (vs ~3 weeks for direct CVL KRA registration) |
| **SDK Support** | Mobile (Android/iOS) and Web SDKs available |
| **Other Integrations** | Digio also provides e-Sign, CKYC, DigiLocker, Video KYC -- reduces vendor count |

### 2.2 Authentication

| Parameter | Detail |
|-----------|--------|
| **Auth Method** | API Key + Secret (Basic Auth) |
| **Header** | `Authorization: Basic <base64(client_id:client_secret)>` |
| **IP Whitelisting** | Mandatory. Must whitelist server IPs with Digio before production use |
| **UAT IPs** | `35.154.20.28` |
| **Production IPs** | `13.126.198.236`, `52.66.66.81` |
| **Rate Limits** | Contact Digio for rate limit details; standard is 100 req/min |

### 2.3 Base URLs

| Environment | Base URL |
|-------------|----------|
| Sandbox (UAT) | `https://ext.digio.in/client/kyc/v2` (UAT credentials) |
| Production | `https://api.digio.in/client/kyc/v2` |

**API Documentation**: https://documentation.digio.in/digikyc/kra/api_integration/

### 2.4 Endpoints

#### 2.4.1 KRA PAN Status Lookup

Checks the KYC status of a PAN across all 5 KRAs via interoperability. This is the first call in the onboarding flow -- determines whether the client needs fresh KYC or has existing records.

**Endpoint**: `GET /kra/pan-status`

**Request**:
```
GET /kra/pan-status?pan=ABCDE1234F
Headers:
  Authorization: Basic <base64(client_id:client_secret)>
  Content-Type: application/json
```

**Request Parameters**:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `pan` | string | Yes | 10-character PAN (format: AAAAA9999A) |

**Response (Success - KYC Found)**:
```json
{
  "id": "DIG-KRA-xxxxxxxxxxxx",
  "status": "success",
  "pan": "ABCDE1234F",
  "kra_status": "KYC Registered",
  "kra_source": "CVL",
  "applicant_name": "RAKESH KUMAR",
  "application_date": "2023-05-15",
  "last_update_date": "2024-08-20",
  "email_validated": "Y",
  "mobile_validated": "Y",
  "pan_aadhaar_linked": "Y",
  "aadhaar_authenticated": "Y"
}
```

**Response (Not Found)**:
```json
{
  "id": "DIG-KRA-xxxxxxxxxxxx",
  "status": "success",
  "pan": "ZZZZZ9999Z",
  "kra_status": "Not Available",
  "kra_source": null,
  "applicant_name": null,
  "application_date": null,
  "last_update_date": null
}
```

**Data Mapping** (Response -> `KYC_MASTER_DATASET.md`):

| API Response Field | Master Dataset Field | Section |
|-------------------|---------------------|---------|
| `kra_status` | `kra_lookup_status` (R27) | R: Third-Party Results |
| `kra_source` | `kra_lookup_source` (R28) | R |
| `applicant_name` | `kra_lookup_name` (R29) | R |
| `application_date` | `kra_lookup_app_date` (R30) | R |
| `last_update_date` | `kra_lookup_last_update` (R31) | R |
| `email_validated` | `kra_email_validated` (R32) | R |
| `mobile_validated` | `kra_mobile_validated` (R33) | R |

---

#### 2.4.2 KRA Fetch (Full Record Download)

Downloads the complete KYC record from the KRA. Use this after a successful PAN Status Lookup that returns "KYC Registered" or "KYC Validated" to prefill the onboarding form with existing data.

**Endpoint**: `GET /kra/fetch`

**Request**:
```
GET /kra/fetch?pan=ABCDE1234F&kra=CVL
Headers:
  Authorization: Basic <base64(client_id:client_secret)>
  Content-Type: application/json
```

**Request Parameters**:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `pan` | string | Yes | 10-character PAN |
| `kra` | string | Yes | KRA identifier from lookup response (`CVL`, `NDML`, `CAMS`, `DOTEX`, `KFINTECH`) |

**Response (Success)**:
```json
{
  "id": "DIG-KRA-FETCH-xxxxxxxxxxxx",
  "status": "success",
  "pan": "ABCDE1234F",
  "kra_source": "CVL",
  "kra_status": "KYC Registered",
  "personal_details": {
    "prefix": "MR",
    "first_name": "RAKESH",
    "middle_name": "",
    "last_name": "KUMAR",
    "maiden_name": "",
    "father_spouse_name": "SURESH KUMAR",
    "father_spouse_prefix": "FATHER",
    "mother_name": "SUNITA DEVI",
    "date_of_birth": "1990-01-15",
    "gender": "M",
    "marital_status": "MARRIED",
    "nationality": "IN",
    "citizenship": "INDIAN",
    "residential_status": "RESIDENT"
  },
  "identity_details": {
    "pan": "ABCDE1234F",
    "aadhaar_reference": "XXXX-XXXX-1234",
    "passport_number": "",
    "passport_expiry": "",
    "voter_id": "",
    "driving_license": "",
    "dl_expiry": ""
  },
  "correspondence_address": {
    "line1": "123 MG ROAD",
    "line2": "SECTOR 5",
    "line3": "NEAR TEMPLE",
    "city": "GURGAON",
    "state": "HARYANA",
    "pincode": "122001",
    "country": "IN",
    "address_type": "RESIDENTIAL"
  },
  "permanent_address": {
    "line1": "123 MG ROAD",
    "line2": "SECTOR 5",
    "line3": "NEAR TEMPLE",
    "city": "GURGAON",
    "state": "HARYANA",
    "pincode": "122001",
    "country": "IN",
    "same_as_correspondence": true
  },
  "contact_details": {
    "mobile_country_code": "+91",
    "mobile": "9876543210",
    "email": "rakesh.kumar@email.com",
    "std_code": "",
    "phone": "",
    "fax": ""
  },
  "financial_details": {
    "occupation": "02",
    "occupation_description": "Services (Salaried)",
    "gross_annual_income_range": "04",
    "gross_annual_income_description": "10 Lakh - 25 Lakh",
    "net_worth": "2500000",
    "net_worth_date": "2024-03-31",
    "source_of_wealth": "SALARY"
  },
  "tax_details": {
    "tax_residency_india_only": true,
    "fatca_country": "IN",
    "tax_identification_number": "",
    "fatca_declaration_date": "2024-08-20"
  },
  "pep_details": {
    "is_pep": false,
    "is_pep_related": false,
    "pep_declaration": "I declare that I am not a Politically Exposed Person"
  },
  "documents": {
    "photo": "BASE64_ENCODED_OR_URL",
    "signature": "BASE64_ENCODED_OR_URL",
    "poi_type": "PAN",
    "poi_document": "BASE64_ENCODED_OR_URL",
    "poa_type": "AADHAAR",
    "poa_document": "BASE64_ENCODED_OR_URL"
  },
  "kyc_metadata": {
    "kyc_date": "2023-05-15",
    "kyc_mode": "EKYC",
    "ipv_performed": true,
    "ipv_date": "2023-05-15",
    "intermediary_code": "BSE-MBR-12345",
    "intermediary_name": "XYZ SECURITIES LTD"
  }
}
```

**Data Mapping**: The fetched record populates the prefill layer of the onboarding form. Fields map to `KYC_MASTER_DATASET.md` sections A (Personal), B (Identity), C (Address), D (Contact), E (Occupation), F (Financial), J (FATCA), K (PEP/AML), and R34 (full KRA record reference).

---

#### 2.4.3 KRA Upload (Submit New or Modified KYC Record)

Submits a complete KYC record to the KRA. Used for fresh KYC (client not found at KRA) or modification of existing records.

**Endpoint**: `POST /kra/upload`

**Request**:
```
POST /kra/upload
Headers:
  Authorization: Basic <base64(client_id:client_secret)>
  Content-Type: application/json
```

**Request Body** (see Section 4 for complete field specification):
```json
{
  "pan": "ABCDE1234F",
  "application_type": "NEW",
  "application_number": "APP-2026-001234",
  "intermediary_code": "BSE-MBR-12345",
  "pos_code": "POS001",
  "personal_details": {
    "prefix": "MR",
    "first_name": "RAKESH",
    "middle_name": "",
    "last_name": "KUMAR",
    "father_spouse_name": "SURESH KUMAR",
    "father_spouse_prefix": "FATHER",
    "mother_name": "SUNITA DEVI",
    "date_of_birth": "1990-01-15",
    "gender": "M",
    "marital_status": "MARRIED",
    "nationality": "IN",
    "citizenship": "INDIAN",
    "residential_status": "RESIDENT"
  },
  "identity_details": { "..." : "see Section 4" },
  "correspondence_address": { "..." : "see Section 4" },
  "permanent_address": { "..." : "see Section 4" },
  "contact_details": { "..." : "see Section 4" },
  "financial_details": { "..." : "see Section 4" },
  "tax_details": { "..." : "see Section 4" },
  "pep_details": { "..." : "see Section 4" },
  "fatca_crs": { "..." : "see Section 4" },
  "documents": {
    "photo": "<base64_encoded_jpeg>",
    "signature": "<base64_encoded_jpeg>",
    "poi_type": "PAN",
    "poi_document": "<base64_encoded_pdf_or_jpeg>",
    "poa_type": "AADHAAR",
    "poa_document": "<base64_encoded_pdf_or_jpeg>"
  },
  "kyc_verification": {
    "kyc_mode": "EKYC",
    "ipv_performed": true,
    "ipv_date": "2026-02-13",
    "ipv_agent_name": "VERIFIER NAME",
    "ipv_agent_designation": "COMPLIANCE OFFICER",
    "ipv_agent_employee_code": "EMP001"
  },
  "callback_url": "https://your-server.com/webhooks/kra-upload"
}
```

**Application Type Values**:

| Value | Meaning |
|-------|---------|
| `NEW` | Fresh KYC submission (client not previously registered) |
| `MODIFY` | Modification of existing KYC record |
| `UPDATE` | Update/enhancement of existing record (e.g., adding FATCA) |

**Response (Accepted for Processing)**:
```json
{
  "id": "DIG-KRA-UPLOAD-xxxxxxxxxxxx",
  "status": "accepted",
  "pan": "ABCDE1234F",
  "kra_reference_number": "KRA-REF-2026-567890",
  "kra_target": "CVL",
  "submitted_at": "2026-02-13T10:30:00+05:30",
  "estimated_completion": "2026-02-15T18:00:00+05:30",
  "message": "KYC record submitted for processing. Use callback or poll for status."
}
```

**Response (Validation Error)**:
```json
{
  "id": "DIG-KRA-UPLOAD-xxxxxxxxxxxx",
  "status": "error",
  "error_code": "VALIDATION_FAILED",
  "errors": [
    { "field": "personal_details.date_of_birth", "message": "DOB cannot be in the future" },
    { "field": "documents.photo", "message": "Photo exceeds maximum size of 1MB" }
  ]
}
```

**Async Processing**: KRA uploads are asynchronous. The API accepts the submission and processes it in the background. Status updates are delivered via:
1. **Callback/Webhook**: Digio calls the `callback_url` with the final status
2. **Polling**: Call `GET /kra/pan-status` periodically to check if status transitions from "Under Process" to "KYC Registered"

---

#### 2.4.4 KRA Documents Download

Retrieves documents stored at the KRA for a given PAN. This is primarily useful for CVL KRA which stores document images.

**Endpoint**: `GET /kra/documents`

**Request**:
```
GET /kra/documents?pan=ABCDE1234F&document_type=PHOTO
Headers:
  Authorization: Basic <base64(client_id:client_secret)>
  Content-Type: application/json
```

**Request Parameters**:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `pan` | string | Yes | 10-character PAN |
| `document_type` | string | Yes | One of: `PHOTO`, `SIGNATURE`, `POI`, `POA`, `ALL` |

**Response**:
```json
{
  "id": "DIG-KRA-DOC-xxxxxxxxxxxx",
  "status": "success",
  "pan": "ABCDE1234F",
  "documents": [
    {
      "type": "PHOTO",
      "format": "JPEG",
      "size_bytes": 45320,
      "content": "BASE64_ENCODED_IMAGE",
      "uploaded_date": "2023-05-15"
    },
    {
      "type": "SIGNATURE",
      "format": "JPEG",
      "size_bytes": 23100,
      "content": "BASE64_ENCODED_IMAGE",
      "uploaded_date": "2023-05-15"
    }
  ]
}
```

**Note**: Not all KRAs store document images. CVL KRA is the most comprehensive for document storage. NDML and others may return limited document data.

### 2.5 Error Handling

| HTTP Code | Error Type | Description | Recommended Action |
|-----------|-----------|-------------|-------------------|
| 200 | Success | Request processed successfully | Process response |
| 400 | Bad Request | Invalid parameters (wrong PAN format, missing fields) | Fix input validation |
| 401 | Unauthorized | Invalid API credentials or IP not whitelisted | Check credentials, verify IP whitelist |
| 403 | Forbidden | Account suspended or exceeded quota | Contact Digio support |
| 404 | Not Found | PAN not found at any KRA (for fetch/documents) | Fresh KYC required |
| 422 | Unprocessable Entity | Data format errors in upload payload | Fix field format errors per error details |
| 429 | Rate Limited | Too many requests | Implement exponential backoff (start 1s, max 60s) |
| 500 | Internal Server Error | Digio server error | Retry with exponential backoff, max 3 retries |
| 502 | Bad Gateway | Upstream KRA system unavailable | Retry after 5 minutes |
| 503 | Service Unavailable | KRA system under maintenance | Queue for retry, check KRA maintenance schedule |

### 2.6 Webhook/Callback

For async operations (upload, modify), Digio sends a callback to the configured URL:

```json
POST https://your-server.com/webhooks/kra-upload
Content-Type: application/json
X-Digio-Signature: <HMAC-SHA256 signature>

{
  "event": "kra.upload.completed",
  "id": "DIG-KRA-UPLOAD-xxxxxxxxxxxx",
  "pan": "ABCDE1234F",
  "kra_reference_number": "KRA-REF-2026-567890",
  "kra_status": "KYC Registered",
  "completed_at": "2026-02-14T14:00:00+05:30",
  "kra_source": "CVL"
}
```

**Webhook Security**: Verify the `X-Digio-Signature` header using HMAC-SHA256 with your client secret before processing the callback. Reject any callbacks that fail signature verification.

---

## 3. KRA Status Codes (Critical for Trading)

### 3.1 Status Definitions

| Status | Meaning | Can Client Trade? | Description |
|--------|---------|-------------------|-------------|
| **KYC Registered** | KYC submitted and accepted by KRA | **Yes** | Base level of compliance. Client's KYC data has been received and accepted by the KRA. Sufficient for account activation and trading. |
| **KYC Validated** | KYC verified and validated (higher confidence) | **Yes** | Enhanced verification level. KRA has cross-verified the data against original sources (PAN, Aadhaar, etc.). Higher confidence than Registered. |
| **Under Process** | KYC submission being processed | **No** | Temporary state. KRA has received the submission but validation is in progress. Typically resolves within 2 working days. |
| **On Hold** | KYC held for clarification or additional documents | **No** | KRA has flagged the submission for review. Common reasons: name mismatch, address discrepancy, unclear documents. Requires resolution. |
| **Rejected** | KYC submission rejected | **No** | KRA has rejected the submission. Common reasons: invalid PAN, forged documents, non-compliant data. Requires corrected re-submission. |
| **Not Available** | No KYC record found for this PAN | **No (N/A)** | Client has never completed KYC with any SEBI-registered intermediary. Fresh KYC collection and upload required. |

### 3.2 Status Transition Flow

```
                        +------------------+
                        |  Not Available   |
                        | (No KYC record)  |
                        +--------+---------+
                                 |
                          [Submit KYC]
                                 |
                                 v
                        +------------------+
                        | Under Process    |
                        | (Validating...)  |
                        +--------+---------+
                                 |
                    +------------+------------+
                    |            |            |
                    v            v            v
           +--------+--+ +------+-----+ +----+-------+
           |   On Hold  | | KYC        | |  Rejected  |
           | (Clarify)  | | Registered | | (Fix data) |
           +--------+--+ +------+-----+ +----+-------+
                    |            |            |
          [Resolve] |            |    [Re-submit corrected]
                    |            |            |
                    v            v            |
           +--------+--+ +------+-----+      |
           | Under     | | KYC        |      |
           | Process   | | Validated  |      |
           +--------+--+ +------------+      |
                    |                         |
                    +-------->  Back to Under Process  <---+
```

### 3.3 Key Rules

- **Only "KYC Registered" or "KYC Validated" allows trading.** All other statuses block account activation and trading.
- Hold/Rejection can happen at **any stage** after submission. A previously Registered client can be placed On Hold if discrepancies are discovered during validation.
- A client who is **KYC Registered at another broker** will show up in the lookup. The new broker does NOT need to re-upload KYC -- they fetch the existing record, verify it, and proceed.
- **KYC Validated is not required for trading.** KYC Registered is sufficient. Validation is a higher-confidence state achieved through cross-verification by the KRA.
- Status is **PAN-based**, not intermediary-based. A client has one KRA status regardless of how many brokers they have accounts with.

---

## 4. KRA Upload - Detailed Field Specification

### 4.1 Part I: CERSAI Template (Identity Data)

Part I follows the CERSAI (Central Registry of Securitisation Asset Reconstruction and Security Interest) standardized KYC template used across all financial institutions. This is the same template used for CKYC uploads.

#### 4.1.1 Personal Details

| # | Field Name | Type | Max Length | Mandatory | Valid Values / Notes |
|---|-----------|------|-----------|-----------|---------------------|
| 1 | `prefix` | string | 5 | Yes | `MR`, `MRS`, `MS`, `DR`, `PROF`, `MASTER`, `MISS` |
| 2 | `first_name` | string | 60 | Yes | As per PAN card. Uppercase. No special characters except space and hyphen. |
| 3 | `middle_name` | string | 60 | No | As per PAN card |
| 4 | `last_name` | string | 60 | Yes | As per PAN card |
| 5 | `maiden_name` | string | 60 | No | Pre-marriage name (if applicable) |
| 6 | `father_spouse_name` | string | 120 | Yes | Full name of father or spouse |
| 7 | `father_spouse_prefix` | string | 10 | Yes | `FATHER`, `SPOUSE` |
| 8 | `mother_name` | string | 120 | No | Full name of mother |
| 9 | `date_of_birth` | date | 10 | Yes | YYYY-MM-DD format. Cannot be in the future. Client must be 18+ for individual accounts. |
| 10 | `gender` | string | 1 | Yes | `M` (Male), `F` (Female), `T` (Transgender) |
| 11 | `marital_status` | string | 10 | Yes | `MARRIED`, `UNMARRIED`, `WIDOW`, `DIVORCED`, `OTHERS` |
| 12 | `nationality` | string | 2 | Yes | ISO 3166-1 alpha-2 country code. `IN` for Indian. |
| 13 | `citizenship` | string | 20 | Yes | `INDIAN`, `NRI`, `PIO`, `OCI`, `FOREIGN_NATIONAL` |
| 14 | `residential_status` | string | 20 | Yes | `RESIDENT`, `NON_RESIDENT`, `FOREIGN_NATIONAL` |

#### 4.1.2 Identity Details

| # | Field Name | Type | Max Length | Mandatory | Valid Values / Notes |
|---|-----------|------|-----------|-----------|---------------------|
| 15 | `pan` | string | 10 | Yes | AAAAA9999A format. Must be valid (E status). |
| 16 | `aadhaar_reference` | string | 16 | Conditional | Masked format: XXXX-XXXX-1234 (last 4 digits only). Mandatory if Aadhaar is used as proof of identity/address. Full Aadhaar number must NOT be stored or transmitted (UIDAI mandate). |
| 17 | `passport_number` | string | 20 | Conditional | Mandatory for NRIs. Format: A1234567 (1 alpha + 7 digits for Indian passports). |
| 18 | `passport_expiry` | date | 10 | Conditional | YYYY-MM-DD. Mandatory if passport provided. Must be future date. |
| 19 | `voter_id` | string | 20 | No | Electoral Photo Identity Card number |
| 20 | `driving_license` | string | 20 | No | Format varies by state. Include state code prefix. |
| 21 | `dl_expiry` | date | 10 | Conditional | YYYY-MM-DD. Mandatory if DL provided. |
| 22 | `ckycid` | string | 14 | No | 14-digit CKYC Identification Number (KIN), if available from CKYC search. |

#### 4.1.3 Correspondence Address

| # | Field Name | Type | Max Length | Mandatory | Notes |
|---|-----------|------|-----------|-----------|-------|
| 23 | `corr_address_line1` | string | 100 | Yes | Must NOT start with client name. Must not be identical to line2 or line3. |
| 24 | `corr_address_line2` | string | 100 | No | Must not be identical to line1 or line3. |
| 25 | `corr_address_line3` | string | 100 | No | Must not be identical to line1 or line2. |
| 26 | `corr_city` | string | 35 | Yes | City/Town/Village name |
| 27 | `corr_state` | string | 2 | Yes | State code (e.g., `HR` for Haryana, `MH` for Maharashtra) |
| 28 | `corr_pincode` | string | 6 | Yes | 6-digit Indian pincode |
| 29 | `corr_country` | string | 2 | Yes | ISO 3166-1 alpha-2. `IN` for India. |
| 30 | `corr_address_type` | string | 15 | Yes | `RESIDENTIAL`, `BUSINESS`, `REGISTERED_OFFICE`, `UNSPECIFIED` |
| 31 | `corr_proof_type` | string | 20 | Yes | `AADHAAR`, `PASSPORT`, `VOTER_ID`, `DL`, `UTILITY_BILL`, `BANK_STATEMENT` |

#### 4.1.4 Permanent Address

| # | Field Name | Type | Max Length | Mandatory | Notes |
|---|-----------|------|-----------|-----------|-------|
| 32 | `perm_same_as_correspondence` | boolean | - | Yes | If true, permanent address fields are copied from correspondence address |
| 33-39 | `perm_address_line1` through `perm_country` | Same as correspondence | Same | Conditional | Mandatory if `perm_same_as_correspondence` is false |

#### 4.1.5 Contact Details

| # | Field Name | Type | Max Length | Mandatory | Notes |
|---|-----------|------|-----------|-----------|-------|
| 40 | `mobile_country_code` | string | 5 | Yes | `+91` for India |
| 41 | `mobile` | string | 10 | Yes | 10-digit Indian mobile number. Must be pre-verified via OTP. |
| 42 | `email` | string | 100 | Yes | Must be pre-verified. Valid email format. |
| 43 | `std_code` | string | 5 | No | Landline STD code |
| 44 | `phone` | string | 12 | No | Landline number |
| 45 | `fax` | string | 15 | No | Fax number (rarely used) |

#### 4.1.6 Tax Residency & FATCA Declaration

| # | Field Name | Type | Max Length | Mandatory | Notes |
|---|-----------|------|-----------|-----------|-------|
| 46 | `tax_residency_india_only` | boolean | - | Yes | True if tax resident of India only. If false, FATCA/CRS detailed declaration required. |
| 47 | `fatca_country_of_birth` | string | 2 | Conditional | ISO country code. Mandatory if US person or non-India tax resident. |
| 48 | `fatca_country_of_citizenship` | string | 2 | Conditional | ISO country code |
| 49 | `fatca_country_of_tax_residency` | string | 2 | Conditional | ISO country code |
| 50 | `fatca_tax_identification_number` | string | 20 | Conditional | TIN/SSN/EIN in country of tax residency |
| 51 | `fatca_tin_issuing_country` | string | 2 | Conditional | Country that issued the TIN |
| 52 | `fatca_declaration_date` | date | 10 | Yes | YYYY-MM-DD. Date of self-certification. |
| 53 | `fatca_us_person` | boolean | - | Yes | Whether the client is a US person under FATCA |
| 54 | `fatca_greencard_holder` | boolean | - | Conditional | Mandatory if `fatca_us_person` is true |

**FATCA/CRS upload to KRA is mandatory since July 2024.**

#### 4.1.7 Income & Financial Profile

| # | Field Name | Type | Max Length | Mandatory | Notes |
|---|-----------|------|-----------|-----------|-------|
| 55 | `occupation_code` | string | 2 | Yes | `01`=Business, `02`=Salaried, `03`=Professional, `04`=Agriculture, `05`=Retired, `06`=Housewife, `07`=Student, `08`=Others |
| 56 | `occupation_description` | string | 50 | No | Free text if code is `08` |
| 57 | `gross_annual_income_range` | string | 2 | Yes | `01`=Below 1L, `02`=1-5L, `03`=5-10L, `04`=10-25L, `05`=25L-1Cr, `06`=Above 1Cr |
| 58 | `net_worth` | number | 15 | No | In INR. Recommended for HNI clients. |
| 59 | `net_worth_date` | date | 10 | Conditional | YYYY-MM-DD. Mandatory if net_worth provided. Must be within last 1 year. |
| 60 | `source_of_wealth` | string | 50 | No | `SALARY`, `BUSINESS`, `INHERITANCE`, `INVESTMENT`, `PENSION`, `OTHERS` |

#### 4.1.8 PEP Declaration

| # | Field Name | Type | Max Length | Mandatory | Notes |
|---|-----------|------|-----------|-----------|-------|
| 61 | `is_pep` | boolean | - | Yes | Politically Exposed Person (or has been in last 12 months). Includes heads of state, ministers, MPs, judges, military officers, senior government officials, political party leaders. |
| 62 | `is_pep_related` | boolean | - | Yes | Family member or close associate of a PEP. Family = spouse, parents, siblings, children, and their spouses. |
| 63 | `pep_declaration_text` | string | 500 | Yes | Self-declaration text confirming PEP/non-PEP status |

#### 4.1.9 Documents (Images)

| # | Field Name | Type | Format | Mandatory | Notes |
|---|-----------|------|--------|-----------|-------|
| 64 | `photo` | binary/string | JPEG, PNG | Yes | Passport-size photograph. Base64 encoded. Max 1MB. Min 200x200px, max 1000x1000px. |
| 65 | `signature` | binary/string | JPEG, PNG | Yes | Signature image. Base64 encoded. Max 1MB. |
| 66 | `poi_type` | string | - | Yes | Proof of Identity type: `PAN`, `AADHAAR`, `PASSPORT`, `VOTER_ID`, `DL` |
| 67 | `poi_document` | binary/string | JPEG, PNG, PDF | Yes | Proof of Identity document image. Base64 encoded. Max 2MB. |
| 68 | `poa_type` | string | - | Yes | Proof of Address type: `AADHAAR`, `PASSPORT`, `VOTER_ID`, `DL`, `UTILITY_BILL`, `BANK_STATEMENT` |
| 69 | `poa_document` | binary/string | JPEG, PNG, PDF | Yes | Proof of Address document image. Base64 encoded. Max 2MB. |

### 4.2 Part II: Intermediary-Specific Data

Part II data is specific to the securities market intermediary and includes trading-related preferences. This data is NOT shared across intermediaries -- each broker maintains their own Part II data.

| # | Field Name | Type | Max Length | Mandatory | Notes |
|---|-----------|------|-----------|-----------|-------|
| 70 | `trading_account_type` | string | 10 | Yes | `INDIVIDUAL`, `JOINT`, `HUF`, `CORPORATE`, `TRUST`, `NRI` |
| 71 | `segment_equity` | boolean | - | Yes | Equity cash segment activation |
| 72 | `segment_equity_derivatives` | boolean | - | No | F&O segment (requires income proof >= 10L or net worth certificate) |
| 73 | `segment_currency_derivatives` | boolean | - | No | Currency derivatives |
| 74 | `segment_commodity` | boolean | - | No | Commodity segment (MCX) |
| 75 | `segment_debt` | boolean | - | No | Debt/Fixed Income segment |
| 76 | `risk_appetite` | string | 15 | Yes | `LOW`, `MODERATE`, `HIGH`, `VERY_HIGH` (derived from risk profiling questionnaire) |
| 77 | `settlement_preference` | string | 10 | Yes | `MONTHLY`, `QUARTERLY` (running account settlement frequency) |
| 78 | `ddpi_opted` | boolean | - | Yes | Whether client has opted for DDPI (Demat Debit and Pledge Instruction). DDPI replaced POA since Nov 2022. |
| 79 | `ddpi_scope` | string | 100 | Conditional | Scope of DDPI authorization. Mandatory if `ddpi_opted` is true. |
| 80 | `nominee_count` | number | 2 | Yes | Number of nominees (0 to 10). 0 means opt-out with mandatory video verification. |
| 81-90 | Nominee details (per nominee) | object | - | Conditional | `name`, `relationship`, `dob`, `percentage`, `pan`, `aadhaar_ref`, `address` per nominee. Up to 10 nominees since Jan 2025. |
| 91 | `bank_account_number` | string | 20 | Yes | Primary bank account for trading |
| 92 | `bank_ifsc` | string | 11 | Yes | IFSC code |
| 93 | `bank_name` | string | 50 | Yes | Bank name as per penny drop |
| 94 | `bank_account_type` | string | 2 | Yes | `SB`=Savings, `CA`=Current |
| 95 | `bank_micr` | string | 9 | No | 9-digit MICR code |

### 4.3 FATCA/CRS Detailed Declaration (when applicable)

When a client has tax residency outside India (`tax_residency_india_only` = false), the following additional FATCA/CRS fields are required. This section supports multiple tax residency countries.

| # | Field Name | Type | Mandatory | Notes |
|---|-----------|------|-----------|-------|
| 96 | `fatca_crs_records` | array | Yes | Array of tax residency declarations (one per country of tax residency) |
| 96.1 | `country_of_tax_residency` | string | Yes | ISO 3166-1 alpha-2 code |
| 96.2 | `tax_identification_number` | string | Yes | TIN in that country |
| 96.3 | `tin_type` | string | Yes | `TIN`, `SSN`, `EIN`, `ITIN`, `OTHER` |
| 96.4 | `tin_not_available_reason` | string | Conditional | If TIN not available: `NOT_ISSUED`, `PENDING`, `EXEMPT` |
| 97 | `entity_type_fatca` | string | No | For non-individuals: `ACTIVE_NFFE`, `PASSIVE_NFFE`, `FINANCIAL_INSTITUTION` |
| 98 | `giin` | string | No | Global Intermediary Identification Number (for financial institutions) |
| 99 | `sponsoring_entity_name` | string | No | For sponsored entities |
| 100 | `sponsoring_entity_giin` | string | No | Sponsoring entity's GIIN |

### 4.4 Document Size & Format Requirements

| Document | Format | Min Size | Max Size | Min Resolution | Notes |
|----------|--------|----------|----------|---------------|-------|
| Photograph | JPEG, PNG | 10KB | 1MB | 200x200px | Recent passport-size, white/light background |
| Signature | JPEG, PNG | 5KB | 1MB | 100x50px | Blue/Black ink on white background |
| PAN Card | JPEG, PNG, PDF | 10KB | 2MB | 800px width | Clear, readable, all corners visible |
| Aadhaar Card | JPEG, PNG, PDF | 10KB | 2MB | 800px width | Front + Back (if both sides have info) |
| Passport | JPEG, PNG, PDF | 10KB | 2MB | 800px width | First and last pages |
| Address Proof | JPEG, PNG, PDF | 10KB | 2MB | 800px width | Must show name and address clearly |

---

## 5. Timeline & SLA

### 5.1 Regulatory Timelines

| Activity | Timeline | Reference |
|----------|----------|-----------|
| KRA upload after account opening | Within **3 working days** | SEBI KYC Master Circular |
| KRA validation after submission | **2 working days** | KRA processing SLA |
| Total: submission to validation | **~5 working days** | Combined |
| CKYC upload (parallel) | Within **3 working days** | SEBI Aug 2024 circular |
| Client trading eligibility | Upon KRA status = "Registered" | Can trade before "Validated" |

### 5.2 API Response Times

| Operation | Response Type | Expected Latency |
|-----------|-------------|-----------------|
| PAN Status Lookup | **Synchronous** (real-time) | 1-3 seconds |
| Full Record Fetch | **Synchronous** (real-time) | 2-5 seconds |
| Upload (submission acceptance) | **Synchronous** (acceptance) | 1-3 seconds |
| Upload (final status) | **Asynchronous** (callback/poll) | 1-48 hours |
| Document Download | **Synchronous** (real-time) | 2-5 seconds |
| Modify (submission acceptance) | **Synchronous** (acceptance) | 1-3 seconds |
| Modify (final status) | **Asynchronous** (callback/poll) | 1-48 hours |

### 5.3 KRA System Maintenance Windows

KRA systems typically have scheduled maintenance:
- **CVL KRA**: Sunday maintenance window (varies, check CVL website)
- **NDML KRA**: Sunday maintenance (typically 6 AM - 12 PM IST)
- **All KRAs**: Year-end / quarter-end may have extended processing times

**Recommendation**: Build retry queues for KRA submissions. If a submission fails due to KRA downtime, queue it for automatic retry every 15 minutes for up to 24 hours, then escalate to operations.

---

## 6. KRA Modify

### 6.1 When to Modify

A KRA modification is required when a client's data changes after the initial KYC submission. Common triggers:

| Trigger | Example |
|---------|---------|
| Address change | Client moves to a new city |
| Contact change | New mobile number or email |
| Name change | Marriage (maiden to married name), court-ordered name change |
| Income change | Promotion, job change (affects income range code) |
| Occupation change | Salaried to business, retired, etc. |
| Marital status change | Marriage, divorce |
| FATCA update | Change in tax residency or TIN |
| Nominee update | Add/remove/modify nominees |
| Document update | Expired passport replaced, new address proof |

### 6.2 Modifiable vs Non-Modifiable Fields

| Category | Fields | Modification Process |
|----------|--------|---------------------|
| **Freely Modifiable** | Address (corr + perm), Mobile, Email, STD/Phone, Occupation, Income range, Net worth, Marital status, FATCA/CRS data, Nominee details | Submit modification via KRA Upload API with `application_type: "MODIFY"`. No additional verification needed beyond standard API validation. |
| **Modifiable with Re-verification** | Name (first/middle/last), Date of Birth, Gender | Requires supporting documents: gazette notification (name change), marriage certificate, court order. KRA manual review triggered. Takes 3-5 working days. |
| **Non-Modifiable** | PAN | PAN is the primary key. Cannot be changed. If PAN itself changes (surrender + new allotment), a fresh KYC submission is required. Old record linked via old PAN becomes inactive. |
| **Restricted** | Citizenship, Nationality, Residential status | Change from Resident to NRI (or vice versa) triggers enhanced due diligence. New PIS permission letter needed for NRI conversion. Residential status change may require fresh account opening. |

### 6.3 Modification API Call

The modification uses the same `POST /kra/upload` endpoint with the `application_type` set to `"MODIFY"`:

```json
{
  "pan": "ABCDE1234F",
  "application_type": "MODIFY",
  "application_number": "MOD-2026-001234",
  "intermediary_code": "BSE-MBR-12345",
  "modification_reason": "ADDRESS_CHANGE",
  "modified_fields": ["correspondence_address", "contact_details.mobile"],
  "correspondence_address": {
    "line1": "456 NEW STREET",
    "line2": "BLOCK B",
    "line3": "",
    "city": "MUMBAI",
    "state": "MH",
    "pincode": "400001",
    "country": "IN",
    "address_type": "RESIDENTIAL",
    "proof_type": "AADHAAR"
  },
  "contact_details": {
    "mobile_country_code": "+91",
    "mobile": "9876543211"
  },
  "documents": {
    "poa_type": "AADHAAR",
    "poa_document": "<base64_new_address_proof>"
  },
  "callback_url": "https://your-server.com/webhooks/kra-modify"
}
```

### 6.4 Modification Impact on 6 KYC Attributes

When any of the 6 KYC attributes (Name, PAN, Address, Mobile, Email, Income Range) is modified at the KRA, the same change must be propagated to:
1. **Exchange UCC** (NSE, BSE, MCX) -- via UCC modification batch or API
2. **Depository** (CDSL, NSDL) -- via BO modification
3. **CKYC** (CERSAI) -- via CKYC modification

Failure to synchronize creates a mismatch, which triggers non-compliance flags during exchange reconciliation.

---

## 7. Non-Individual Entities

KRA supports multiple entity types beyond individuals. Each has additional mandatory fields and documentation requirements.

### 7.1 Corporate (Company)

| Field | Type | Mandatory | Notes |
|-------|------|-----------|-------|
| `cin` | string | Yes | Company Identification Number (21 characters, issued by MCA/ROC) |
| `registration_number` | string | Conditional | If CIN not available (pre-2013 companies) |
| `date_of_incorporation` | date | Yes | YYYY-MM-DD |
| `place_of_incorporation` | string | Yes | City + State of ROC registration |
| `company_type` | string | Yes | `PRIVATE_LIMITED`, `PUBLIC_LIMITED`, `ONE_PERSON_COMPANY`, `SECTION_8` |
| `directors` | array | Yes | Array of director objects (minimum 2 for private, 3 for public) |
| `directors[].name` | string | Yes | Full name of director |
| `directors[].din` | string | Yes | Director Identification Number (8 digits, issued by MCA) |
| `directors[].pan` | string | Yes | Director's PAN |
| `directors[].designation` | string | Yes | `MANAGING_DIRECTOR`, `WHOLE_TIME_DIRECTOR`, `DIRECTOR`, `INDEPENDENT_DIRECTOR` |
| `directors[].nationality` | string | Yes | ISO country code |
| `directors[].is_authorized_signatory` | boolean | Yes | Whether this director is authorized to operate the trading account |
| `authorized_signatory` | object | Yes | Details of person authorized to operate the account |
| `authorized_signatory.name` | string | Yes | Full name |
| `authorized_signatory.pan` | string | Yes | PAN |
| `authorized_signatory.designation` | string | Yes | Designation in the company |
| `authorized_signatory.specimen_signature` | binary | Yes | Signature image (base64) |
| `ubo_declaration` | array | Yes | Ultimate Beneficial Owner declaration (individuals owning >= 10% for listed, >= 25% for unlisted companies) |
| `ubo[].name` | string | Yes | Full name of UBO |
| `ubo[].pan` | string | Yes | PAN |
| `ubo[].holding_percentage` | number | Yes | Percentage of ownership |
| `ubo[].address` | object | Yes | UBO's address |

**Required Documents for Corporate**:
- MOA (Memorandum of Association)
- AOA (Articles of Association)
- Board Resolution authorizing trading account opening
- Board Resolution authorizing designated signatories
- Certificate of Incorporation
- PAN card of the company
- Latest audited financials (for net worth/income verification)
- Address proof of registered office (utility bill, bank statement, or GST certificate)

### 7.2 HUF (Hindu Undivided Family)

| Field | Type | Mandatory | Notes |
|-------|------|-----------|-------|
| `huf_pan` | string | Yes | PAN of the HUF entity (separate from Karta's personal PAN) |
| `huf_name` | string | Yes | Name as per HUF PAN (e.g., "SURESH KUMAR HUF") |
| `karta_name` | string | Yes | Full name of the Karta (head of HUF) |
| `karta_pan` | string | Yes | Karta's individual PAN |
| `karta_dob` | date | Yes | Karta's date of birth |
| `karta_address` | object | Yes | Karta's residential address |
| `coparceners` | array | No | Array of coparcener details (recommended but not mandatory) |
| `coparceners[].name` | string | Recommended | Coparcener name |
| `coparceners[].pan` | string | Recommended | Coparcener PAN |
| `coparceners[].relationship` | string | Recommended | Relationship to Karta (son, grandson, father, etc.) |

**Required Documents for HUF**:
- HUF PAN card
- Karta's PAN card
- Karta's identity proof (Aadhaar/Passport/Voter ID)
- HUF declaration deed (on stamp paper, signed by Karta and coparceners)
- Address proof of HUF
- Bank account in the name of the HUF

### 7.3 Partnership Firm

| Field | Type | Mandatory | Notes |
|-------|------|-----------|-------|
| `firm_pan` | string | Yes | PAN of the partnership firm |
| `firm_name` | string | Yes | Name as per PAN |
| `registration_number` | string | No | Registrar of Firms registration number (if registered) |
| `date_of_registration` | date | Conditional | Mandatory if registered partnership |
| `partners` | array | Yes | Array of partner details (all partners) |
| `partners[].name` | string | Yes | Full name |
| `partners[].pan` | string | Yes | Individual PAN |
| `partners[].dob` | date | Yes | Date of birth |
| `partners[].percentage_share` | number | Yes | Profit-sharing ratio (must total 100%) |
| `partners[].is_authorized` | boolean | Yes | Whether authorized to operate trading account |
| `authorized_partner` | object | Yes | The partner designated to operate the account |

**Required Documents for Partnership**:
- Partnership firm PAN card
- Partnership deed (registered or unregistered)
- PAN cards of all partners
- Identity proof of authorized partner
- Address proof of firm
- Authority letter (if authorized partner is different from managing partner)

### 7.4 NRI (Non-Resident Indian)

| Field | Type | Mandatory | Notes |
|-------|------|-----------|-------|
| `country_of_residence` | string | Yes | ISO country code of current country of residence |
| `tax_id_in_country_of_residence` | string | Yes | Tax Identification Number (SSN for US, SIN for Canada, etc.) |
| `nre_nro_account_type` | string | Yes | `NRE` (repatriable) or `NRO` (non-repatriable) |
| `pis_permission_reference` | string | Yes | RBI Portfolio Investment Scheme permission letter reference number |
| `pis_bank_name` | string | Yes | Name of the bank through which PIS operates |
| `overseas_address` | object | Yes | Complete overseas address (mandatory, in addition to Indian address if any) |
| `overseas_address.line1` | string | Yes | Address line 1 |
| `overseas_address.line2` | string | No | Address line 2 |
| `overseas_address.city` | string | Yes | City |
| `overseas_address.state_province` | string | No | State/Province |
| `overseas_address.zip_postal_code` | string | Yes | ZIP/Postal code |
| `overseas_address.country` | string | Yes | ISO country code |
| `pio_oci_status` | string | Conditional | `PIO` (Person of Indian Origin), `OCI` (Overseas Citizen of India), `NONE`. Mandatory if citizenship is not Indian. |
| `pio_oci_card_number` | string | Conditional | PIO/OCI card number. Mandatory if `pio_oci_status` is PIO or OCI. |

**FATCA/CRS for NRIs**: NRIs have more detailed FATCA/CRS requirements since they have tax residency outside India. All tax residency countries must be declared with TINs.

**Required Documents for NRI**:
- PAN card (Indian PAN is mandatory for NRI trading)
- Passport (Indian or foreign, with valid visa for foreign passport)
- Overseas address proof
- PIS permission letter from RBI-authorized bank
- NRE/NRO bank account details
- PIO/OCI card (if applicable)
- Photo and signature

**CP Code Removal**: Note that SEBI removed the requirement for Custodial Participant (CP) code for NRIs effective July 2025.

### 7.5 Trust

| Field | Type | Mandatory | Notes |
|-------|------|-----------|-------|
| `trust_name` | string | Yes | Full name of trust as per registration |
| `trust_pan` | string | Yes | PAN of the trust entity |
| `trust_registration_number` | string | Yes | Registrar of Trusts registration number |
| `trust_deed_date` | date | Yes | Date of trust deed execution |
| `trust_type` | string | Yes | `PRIVATE`, `PUBLIC`, `CHARITABLE`, `RELIGIOUS` |
| `trustees` | array | Yes | Array of trustee details (multiple trustees possible) |
| `trustees[].name` | string | Yes | Full name of trustee |
| `trustees[].pan` | string | Yes | Trustee PAN |
| `trustees[].designation` | string | Yes | `MANAGING_TRUSTEE`, `TRUSTEE` |
| `trustees[].is_authorized` | boolean | Yes | Whether authorized to operate trading account |
| `beneficiaries` | array | Conditional | Beneficiary information (mandatory for private trusts) |
| `beneficiaries[].name` | string | Yes | Beneficiary name |
| `beneficiaries[].pan` | string | No | Beneficiary PAN (if available) |
| `beneficiaries[].relationship` | string | No | Relationship to settlor |

**Required Documents for Trust**:
- Trust PAN card
- Trust deed (registered)
- PAN cards of all trustees
- Identity proof of authorized trustee
- Board resolution (if applicable) authorizing trading
- Address proof of registered office

### 7.6 LLP (Limited Liability Partnership)

| Field | Type | Mandatory | Notes |
|-------|------|-----------|-------|
| `llpin` | string | Yes | LLP Identification Number (issued by MCA, 7 characters: AAA-nnnn format) |
| `llp_name` | string | Yes | Full name as per LLP registration |
| `llp_pan` | string | Yes | PAN of the LLP |
| `date_of_incorporation` | date | Yes | Date of LLP incorporation |
| `designated_partners` | array | Yes | Array of designated partner details (minimum 2) |
| `designated_partners[].name` | string | Yes | Full name |
| `designated_partners[].dpin` | string | Yes | Designated Partner Identification Number (DPIN, 8 digits) |
| `designated_partners[].pan` | string | Yes | Individual PAN |
| `designated_partners[].is_authorized` | boolean | Yes | Whether authorized for trading |
| `llp_agreement_date` | date | Yes | Date of LLP agreement |

**Required Documents for LLP**:
- LLP PAN card
- Certificate of Incorporation (Form 16 issued by ROC)
- LLP Agreement
- PAN cards of all designated partners
- Identity proof of authorized partner
- Address proof of registered office

---

## 8. Direct KRA Integration (Alternative - for Reference)

Direct integration with a KRA (bypassing Digio) provides more control and is cheaper at scale but requires significantly more development effort. This path is NOT recommended for Phase 1.

### 8.1 CVL KRA Direct (SOAP/XML)

| Parameter | Detail |
|-----------|--------|
| **Protocol** | SOAP 1.1 / SOAP 1.2 |
| **WSDL** | https://www.cvlkra.com/PANInquiry.asmx |
| **Data Format** | XML (SOAP envelope) |
| **Auth** | SOAP header with username + password (issued by CVL after registration) |
| **Setup Time** | ~3 weeks (includes registration, documentation, UAT testing, go-live) |
| **Registration** | Must register as a Point of Service (POS) with CVL KRA |

**SOAP Methods**:

| Method | Purpose | Request Type |
|--------|---------|-------------|
| `GetPanStatus` | PAN status lookup across all KRAs | XML with PAN |
| `SolicitPANDetailsFetchALLKRA` | Fetch detailed KYC record | XML with PAN + KRA identifier |
| `InsertUpdateKYCRecord` | Submit or modify 1 KYC record | Full KYC XML |
| `GetBulkPanStatus` | Bulk PAN status check (batch) | XML with multiple PANs |

**Sample SOAP Request** (GetPanStatus):
```xml
<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
               xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
               xmlns:xsd="http://www.w3.org/2001/XMLSchema">
  <soap:Header>
    <AuthHeader xmlns="http://www.cvlkra.com/">
      <UserName>YOUR_USERNAME</UserName>
      <Password>YOUR_PASSWORD</Password>
      <PosCode>YOUR_POS_CODE</PosCode>
    </AuthHeader>
  </soap:Header>
  <soap:Body>
    <GetPanStatus xmlns="http://www.cvlkra.com/">
      <PanNo>ABCDE1234F</PanNo>
    </GetPanStatus>
  </soap:Body>
</soap:Envelope>
```

### 8.2 Bulk Upload via CVL KRA

For bulk KYC operations, CVL KRA supports tilde (~) delimited text files uploaded through the CVL KRA portal (Utilities menu).

**File Format** (one record per line):
```
POS_CODE~APP_TYPE~APP_NO~PAN_NO~PAN_EXEMPT~PREFIX~NAME~FATHER_SPOUSE_NAME~
MOTHER_NAME~GENDER~MARITAL_STATUS~DOB~NATIONALITY~RESIDENTIAL_STATUS~
OCCUPATION~CORR_ADDR1~CORR_ADDR2~CORR_ADDR3~CORR_CITY~CORR_PIN~CORR_STATE~
CORR_COUNTRY~PERM_ADDR1~...~MOBILE_CODE~MOBILE~EMAIL~POI_TYPE~POI_DOC_NO~
POA_TYPE~POA_DOC_NO~INCOME~NET_WORTH~PEP~KYC_DATE~...
```

**Key details**:
- Delimiter: tilde (`~`)
- Encoding: UTF-8
- No header row
- Each field must be in the exact position per CVL specification
- Maximum batch size: varies (contact CVL for current limits)
- Processing: overnight batch cycle

### 8.3 NDML KRA Direct

| Parameter | Detail |
|-----------|--------|
| **Protocol** | REST API + SOAP XML |
| **Portal** | https://kra.ndml.in |
| **Auth** | Entity-specific credentials |
| **Setup Time** | ~3 weeks |

Similar functionality to CVL KRA with different endpoint structures.

### 8.4 Cost Comparison: Digio vs Direct

| Factor | Digio (REST Wrapper) | Direct KRA |
|--------|---------------------|------------|
| Setup cost | Minimal (API key) | Registration fee + development time |
| Per-query cost | Rs.3-5 (lookup), Rs.5-10 (upload) | Rs.2-3 (lookup), Rs.3-5 (upload) |
| Development time | ~2 days | ~3 weeks |
| Maintenance | Digio handles KRA protocol changes | Must maintain SOAP/XML parsers, handle KRA format changes |
| Support | Digio support team | Direct with KRA (slower response) |
| Multi-KRA access | Built-in interoperability | Must integrate separately or rely on KRA interop protocol |

**Recommendation**: Use Digio for Phase 1. Consider direct CVL KRA integration for Phase 2+ when volume exceeds 50,000+ KYC operations/month and cost savings justify the development investment.

---

## 9. Dual Upload: KRA + CKYC

### 9.1 Regulatory Background

SEBI mandated dual upload to both KRA and CKYC (CERSAI) effective **August 2024**. This ensures that:
1. Securities-market KYC is maintained at the KRA (for trading eligibility)
2. Financial-sector-wide KYC is maintained at CKYC (for cross-sector interoperability)

### 9.2 Recommended Sequence

```
Step 1: KRA Upload [via Digio]
  |--- Submit full KYC record (Part I + Part II)
  |--- Wait for acceptance
  |
Step 2: CKYC Upload [via Decentro]
  |--- Submit Part I data (CERSAI template)
  |--- Receives 14-digit KIN (CKYC Identification Number)
  |
Step 3: Update internal records
  |--- Store KRA reference number + KRA status
  |--- Store CKYC KIN
  |--- Mark both uploads as completed
```

**Why KRA first?**
- KRA status directly gates trading. Getting KRA acceptance first allows faster account activation.
- CKYC upload can proceed in parallel or immediately after KRA acceptance.
- If KRA upload fails, the client cannot trade regardless of CKYC status, so it is the critical path.

### 9.3 Conflict Scenarios

| Scenario | KRA Status | CKYC Status | Can Trade? | Action Required |
|----------|-----------|-------------|-----------|----------------|
| Both accepted | Registered/Validated | KIN assigned | **Yes** | None |
| KRA accepts, CKYC rejects | Registered | Rejected | **Yes** | CKYC rejection must be resolved for compliance, but trading is not blocked |
| KRA rejects, CKYC accepts | Rejected | KIN assigned | **No** | KRA rejection must be resolved. Re-submit corrected KYC to KRA. |
| Both reject | Rejected | Rejected | **No** | Fix data issues and re-submit to both |
| KRA accepts, CKYC pending | Registered | Under Process | **Yes** | Monitor CKYC status. No action needed for trading. |

### 9.4 Data Consistency

The data submitted to KRA and CKYC must be consistent since both use the CERSAI Part I template for identity data. Any discrepancies between the two submissions will cause reconciliation issues during SEBI inspections.

**Best practice**: Use the same data payload for both KRA and CKYC submissions. Build a single "KYC Record" object in the application layer and derive both the KRA payload and CKYC payload from it.

---

## 10. 6 KYC Attributes Cross-Validation

### 10.1 The 6 Mandatory Attributes

SEBI requires that 6 key KYC attributes must be consistent across all systems where the client is registered:

| # | Attribute | KRA Field | Exchange UCC Field | Depository BO Field |
|---|-----------|-----------|-------------------|-------------------|
| 1 | **Name** | `applicant_name` | `client_name` | `bo_name` |
| 2 | **PAN** | `pan` | `pan` | `pan` |
| 3 | **Address** | `correspondence_address` | `address` | `bo_address` |
| 4 | **Mobile** | `mobile` | `mobile_number` | `mobile` |
| 5 | **Email** | `email` | `email_id` | `email` |
| 6 | **Income Range** | `gross_annual_income_range` | `income_range` | N/A (not stored at depository) |

### 10.2 Cross-Validation Rules

- All 6 attributes must match **exactly** across KRA, Exchange (NSE/BSE/MCX), and Depository (CDSL/NSDL).
- Name matching allows minor variations (e.g., "RAKESH KUMAR" vs "RAKESH  KUMAR" with extra space) but the canonical form should be as per PAN.
- Address matching is fuzzy -- the address need not be character-for-character identical, but the same address must be represented.
- Mobile and Email must match exactly (no variations).
- Income Range must match the same code across all systems.

### 10.3 Mismatch Consequences

- Client is marked **non-compliant** by the exchange.
- Exchange may change client status to **Not Permitted to Trade (NPTT)**.
- Broker receives compliance notice during periodic reconciliation.
- Persistent mismatches can attract SEBI regulatory action.

### 10.4 Resolution Process

```
1. Identify which system has the mismatch (KRA, Exchange, or Depository)
2. Determine the "source of truth" (typically the most recent verified data)
3. Update the mismatched system:
   - KRA: Submit modification via KRA Upload API
   - Exchange: Submit UCC modification (NSE API/BSE SOAP/batch)
   - Depository: Submit BO modification (CDSL CDAS/NSDL DPM)
4. Verify all 3 systems show consistent data
5. Document the correction for audit trail
```

---

## 11. Edge Cases

### 11.1 Customer Already KYC Registered at Another Broker

**Scenario**: Customer's PAN lookup returns "KYC Registered" or "KYC Validated" with a different intermediary.

**Action**:
- Fetch the full KRA record via `GET /kra/fetch`
- Prefill the onboarding form with the fetched data
- Customer verifies and confirms the data
- **No re-upload needed** if data has not changed
- If any of the 6 KYC attributes differ from the customer's current details, submit a modification

### 11.2 Customer KYC Validated but Data Changed

**Scenario**: Customer moved to a new address since their last KYC.

**Action**:
- Submit a KRA modification with the updated fields
- Simultaneously update exchange UCC and depository BO
- Monitor KRA status -- should remain Registered/Validated after modification

### 11.3 Minor Turning Major

**Scenario**: A minor account holder turns 18.

**Action**:
- The guardian's KYC **cannot** be used for the now-adult client
- A **fresh KYC upload** must be submitted in the client's own name
- The client must provide their own PAN (not the guardian's PAN)
- The minor account must be converted to an individual account
- New account opening workflow with full KYC

### 11.4 PAN Status Changed (E to X -- Deactivated)

**Scenario**: Client's PAN becomes inoperative (e.g., PAN-Aadhaar linking deadline missed).

**Action**:
- PAN verification will return status `X` (deactivated)
- KRA status may be affected -- some KRAs flag records with inactive PANs
- **Trading must be blocked** until PAN is reactivated
- Client must link PAN-Aadhaar at the Income Tax portal and get PAN reactivated
- Once PAN is `E` (valid) again, re-verify and re-confirm with KRA

### 11.5 Duplicate PAN

**Scenario**: KRA rejects the upload with a "duplicate PAN" error.

**Action**:
- This means another entity (possibly a different person with the same PAN, or a data entry error) already has a KYC record with this PAN
- Client must verify their PAN is correct
- If the PAN genuinely belongs to the client, they must resolve the duplicate with the Income Tax Department
- The broker cannot override or resolve duplicate PAN issues at the KRA level
- Document the case and escalate to compliance

### 11.6 Name Change After Marriage

**Scenario**: Client's name changed from maiden name to married name.

**Action**:
- Submit KRA modification with `application_type: "MODIFY"` and the new name
- Supporting documents required: marriage certificate, gazette notification, or court order
- New PAN card reflecting the updated name (if PAN was updated at ITD)
- KRA manual review triggered -- takes 3-5 working days
- Simultaneously update all systems (exchange UCC, depository BO, CKYC)

### 11.7 Deceased Customer

**Scenario**: Account holder passes away.

**Action**:
- **No KRA update is possible** for the deceased client's record
- The KRA record remains as-is
- Account closure workflow is initiated:
  1. Transmission of securities to nominee/legal heir
  2. Settlement of pending positions and obligations
  3. UCC status changed to "Closed" at exchanges
  4. Depository BO status changed to "Closed"
  5. Records retained per SEBI retention policy (minimum 8 years under 2026 Regulations)

### 11.8 NRI Returning to India (Residential Status Change)

**Scenario**: NRI client returns to India and becomes a resident.

**Action**:
- Submit KRA modification: `residential_status` from `NON_RESIDENT` to `RESIDENT`
- NRE bank account must be redesignated or changed to a resident savings account
- PIS permission is no longer needed (and should be surrendered to the bank)
- Overseas address replaced with Indian address
- FATCA/CRS declaration updated (tax residency now India only, if applicable)
- Exchange UCC and depository BO must be updated accordingly

### 11.9 Client with Multiple Trading Accounts

**Scenario**: Client has accounts with multiple brokers.

**Action**:
- KRA lookup returns the existing record regardless of which broker originally uploaded it
- Each broker maintains their own Part II data
- The KRA record (Part I) is shared across all intermediaries
- If one broker submits a modification, the updated record is visible to all brokers on subsequent lookup
- Each broker is independently responsible for the 6 KYC attributes matching in their exchange UCC and depository BO

### 11.10 KRA System Downtime During Onboarding

**Scenario**: KRA API returns 503 during a client onboarding session.

**Action**:
- Continue the onboarding flow -- collect all data from the client
- Queue the KRA submission for retry
- Account can be provisionally created (client cannot trade until KRA status is "Registered")
- Retry KRA submission every 15 minutes for up to 24 hours
- If KRA remains unavailable for >24 hours, escalate to operations and notify compliance
- SEBI allows 3 working days for KRA upload, so brief KRA downtime does not create compliance risk

---

## 12. Reconciliation & Reporting

### 12.1 Daily Reconciliation

| Task | Frequency | Method |
|------|-----------|--------|
| KRA status check for all active clients | Daily (overnight batch) | Bulk PAN status API via Digio or direct KRA download |
| Identify clients whose KRA status changed | Daily | Compare current status with previous day |
| Flag clients moved to "On Hold" or "Rejected" | Daily | Auto-block trading for affected clients |
| New "Registered" / "Validated" clients | Daily | Auto-enable trading for newly compliant clients |

### 12.2 Periodic Reconciliation

| Task | Frequency | Method |
|------|-----------|--------|
| 6 KYC attributes cross-check (KRA vs Exchange vs Depository) | Weekly or Monthly | Download client master from all systems, compare programmatically |
| CKYC vs KRA consistency check | Monthly | Verify that both KRA and CKYC records exist and match for all clients |
| FATCA/CRS completeness check | Quarterly | Ensure all clients with non-India tax residency have complete FATCA declarations at KRA |
| PAN validity re-check | Monthly | Re-verify PAN status (E/F/X/D) for all active clients. Flag deactivated PANs. |
| Nominee declaration completeness | Quarterly | Ensure all clients have either nominated or opted out (with video verification) |

### 12.3 KRA Bulk Status Check

Digio provides a bulk status check API for verifying the KRA status of multiple PANs in a single call:

```
POST /kra/bulk-status
Headers:
  Authorization: Basic <base64(client_id:client_secret)>
  Content-Type: application/json

{
  "pans": ["ABCDE1234F", "FGHIJ5678K", "KLMNO9012P", ...],
  "callback_url": "https://your-server.com/webhooks/kra-bulk-status"
}
```

**Limits**: Up to 1000 PANs per request. For larger batches, paginate.

**Response** (async via callback):
```json
{
  "event": "kra.bulk_status.completed",
  "batch_id": "BATCH-xxxx",
  "results": [
    { "pan": "ABCDE1234F", "kra_status": "KYC Validated", "kra_source": "CVL" },
    { "pan": "FGHIJ5678K", "kra_status": "KYC Registered", "kra_source": "NDML" },
    { "pan": "KLMNO9012P", "kra_status": "On Hold", "kra_source": "CVL" }
  ]
}
```

### 12.4 Reports for Compliance

| Report | Purpose | Retention |
|--------|---------|-----------|
| KRA submission log | Audit trail of all KRA uploads/modifications | 8 years (SEBI 2026 Regulations) |
| KRA status change log | Track all status transitions per client | 8 years |
| 6 KYC attribute mismatch report | Identify non-compliant clients | Generate and resolve monthly |
| FATCA/CRS upload confirmation | Prove FATCA compliance to SEBI | 8 years |
| Dual upload completion report | Prove both KRA + CKYC uploads completed | 8 years |

---

## 13. Pricing

### 13.1 Digio KRA API Pricing (Estimated)

| Operation | Cost per Transaction (INR) | Notes |
|-----------|---------------------------|-------|
| KRA PAN Status Lookup | Rs. 3-5 | Per PAN query across all KRAs |
| KRA Full Record Fetch | Rs. 5-8 | Per download of complete record |
| KRA Upload (New) | Rs. 5-10 | Per submission (new KYC) |
| KRA Upload (Modify) | Rs. 5-10 | Per modification request |
| KRA Document Download | Rs. 3-5 | Per document retrieval |
| KRA Bulk Status Check | Rs. 1-2 per PAN | Discounted for bulk operations |

**Pricing Notes**:
- Prices are indicative and subject to volume-based discounts.
- Contact Digio for exact pricing based on expected monthly volume.
- Digio typically offers tiered pricing: higher volumes = lower per-transaction cost.
- Minimum monthly commitment may apply.

### 13.2 Direct KRA Pricing (for Comparison)

| Operation | CVL KRA Direct (INR) | Notes |
|-----------|---------------------|-------|
| PAN Status Lookup | Rs. 2-3 | Direct to CVL, no wrapper markup |
| Full Record Fetch | Rs. 3-5 | |
| Upload (New) | Rs. 3-5 | |
| Upload (Modify) | Rs. 3-5 | |
| Bulk Upload (per record) | Rs. 1-2 | Via tilde-delimited file |

**Direct KRA is ~30-50% cheaper** but requires 3 weeks of setup, SOAP/XML development, and ongoing maintenance of protocol changes.

### 13.3 Estimated Cost per Onboarding (KRA Component)

| Scenario | Operations | Est. Cost (INR) |
|----------|-----------|-----------------|
| **New client, not KYC-registered** | Lookup (Rs.4) + Upload (Rs.8) | Rs. 12 |
| **Existing client, KYC found** | Lookup (Rs.4) + Fetch (Rs.6) | Rs. 10 |
| **Existing client, data modification** | Lookup (Rs.4) + Fetch (Rs.6) + Modify (Rs.8) | Rs. 18 |

---

## 14. Recent Regulatory Changes (2024-2026)

| Date | Change | Impact on KRA Integration |
|------|--------|--------------------------|
| **Jul 2024** | FATCA/CRS upload to KRA mandatory | All KRA uploads must include complete FATCA/CRS declaration. Failure to include FATCA data results in KRA rejection. |
| **Aug 2024** | Dual upload (KRA + CKYC) mandatory | Both KRA and CKYC uploads required within 3 working days. Build parallel upload pipelines. |
| **Jan 2025** | CKYC search returns masked CKYC number | CKYC Search API now returns masked KIN ($XXXX1234$). Full CKYC Download required for unmasked number. Does not affect KRA workflow directly. |
| **Jan 2025** | Up to 10 nominees allowed | KRA upload Part II must support up to 10 nominees (previously 3). Nomination opt-out requires video verification. |
| **Jun 2025** | SEBI Stock Brokers Master Circular updated | SEBI/HO/MIRSD/MIRSD-PoD/P/CIR/2025/90. Updated KYC requirements, reporting timelines, and compliance obligations for stock brokers. |
| **Jul 2025** | CP code requirement removed for NRIs | NRI clients no longer need Custodial Participant code. Simplifies NRI KRA uploads. |
| **Jan 2026** | SEBI Stock Brokers Regulations 2026 notified | Replaces the 1992 regulations entirely. New data retention requirements (8 years), updated record-keeping standards, enhanced compliance framework. |

---

## 15. Key Reference Documents

### 15.1 SEBI Circulars

| Circular | Date | Subject |
|----------|------|---------|
| SEBI/HO/MIRSD/MIRSD-SEC-2/P/CIR/2023/168 | Oct 2023 | **KYC Master Circular** -- comprehensive KYC requirements for all SEBI-registered intermediaries. Covers KRA obligations, CKYC requirements, IPV/VIPV, document requirements, and timelines. |
| SEBI/HO/MIRSD/MIRSD-PoD/P/CIR/2025/90 | Jun 2025 | **Stock Brokers Master Circular** -- updated operational and compliance requirements for stock brokers, including KYC, UCC, margin, and risk management. |
| SEBI Stock Brokers Regulations 2026 | Jan 7, 2026 | **New Regulations** -- replaces SEBI (Stock Brokers and Sub-Brokers) Regulations 1992. New registration requirements, capital adequacy, record retention (8 years), and governance standards. |
| SEBI/HO/MIRSD/DOP/CIR/P/2019/136 | - | **UCC-Demat Mapping** -- mandatory mapping between exchange UCC and depository BO account for all clients. |

### 15.2 KRA Documentation

| Document | Source |
|----------|--------|
| CVL KRA POS Manual | https://www.cvlkra.com (POS login -> Downloads) |
| CVL KRA SOAP WSDL | https://www.cvlkra.com/PANInquiry.asmx |
| NDML KRA Integration Guide | https://kra.ndml.in (Member login -> API docs) |
| CAMS KRA Portal | https://www.camskra.com |
| KFintech KRA Portal | https://kra.kfintech.com |
| DOTEX KRA Portal | https://www.absortkra.com |

### 15.3 Digio Documentation

| Document | URL |
|----------|-----|
| Digio KRA API Integration | https://documentation.digio.in/digikyc/kra/api_integration/ |
| Digio Android SDK | https://documentation.digio.in/sdk/android/kyc_full/ |
| Digio iOS SDK | https://github.com/digio-tech/digio-iOS-KYC-SDK |
| Digio Gateway KYC Lite (GitHub) | https://github.com/digio-tech/gateway_kyc_lite |

### 15.4 Related Internal Documents

| Document | Path | Relevance |
|----------|------|-----------|
| KYC Master Dataset | `KYC_MASTER_DATASET.md` | Field-level specification. KRA fields map to sections R (Third-Party Results), S (Submission Records). |
| Vendor Integrations | `VENDOR_INTEGRATIONS.md` | Parent document. KRA is Section V4. |
| KYC Flow | `kyc-flow.md` | 9-screen user journey. KRA lookup in Screen 1, KRA upload in batch pipeline. |
| CKYC Integration | `vendors/ckyc/CKYC.md` | CKYC integration spec (if created). Dual upload companion to KRA. |

---

## 16. Implementation Checklist

### Pre-Integration

- [ ] Register with CVL KRA as intermediary (or verify existing registration)
- [ ] Sign commercial agreement with Digio (primary KRA API vendor)
- [ ] Obtain Digio KRA sandbox/UAT credentials
- [ ] Download CVL KRA POS manual and batch file format specs
- [ ] Set up UAT environment for API and batch testing

### Development

- [ ] Implement KRA Lookup by PAN (via Digio API)
- [ ] Implement KRA Fetch (full record retrieval)
- [ ] Implement KRA Submit (new individual registration)
- [ ] Implement KRA Modify (update existing record)
- [ ] Implement KRA status code handling (Registered/Validated/On Hold/Rejected)
- [ ] Build batch file generation (tilde-delimited format for CVL KRA)
- [ ] Implement FATCA/CRS declaration fields in KRA upload (mandatory since Jul 2024)
- [ ] Implement nominee data in KRA Part II (up to 10 nominees since Jan 2025)
- [ ] Build dual upload pipeline: KRA + CKYC in parallel (mandatory since Aug 2024)
- [ ] Implement 6 KYC attribute cross-validation (Name, PAN, Address, Mobile, Email, Income)
- [ ] Build KRA rejection report parser and retry logic
- [ ] Implement KRA status polling and reconciliation

### Testing (UAT)

- [ ] Test: KRA Lookup — existing record (KYC Registered / Validated)
- [ ] Test: KRA Lookup — no record found
- [ ] Test: KRA Lookup — On Hold / Under Process status
- [ ] Test: KRA Submit — new individual (all mandatory fields)
- [ ] Test: KRA Submit — with FATCA/CRS declaration
- [ ] Test: KRA Submit — with 10 nominees
- [ ] Test: KRA Modify — update address, mobile, email
- [ ] Test: KRA batch upload (tilde-delimited file)
- [ ] Test: Dual upload — KRA + CKYC parallel
- [ ] Test: 6 KYC attribute validation (mismatch detection)
- [ ] Test: Rejection handling and resubmission
- [ ] Test: NRI client KRA submission

### Production

- [ ] Switch from sandbox to production credentials
- [ ] Deploy KRA integration to production
- [ ] Verify first live KRA Lookup + Submit
- [ ] Set up monitoring: success rates, rejection rates, SLA compliance
- [ ] Set up daily KRA status reconciliation
- [ ] Set up FATCA/CRS compliance reporting
- [ ] Document runbook for common KRA rejections and resolution steps

---

*This document covers the KRA integration in detail for the broking KYC project. It should be read alongside `KYC_MASTER_DATASET.md` for field-level mappings and `VENDOR_INTEGRATIONS.md` for the broader vendor integration context.*

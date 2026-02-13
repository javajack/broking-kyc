---
title: NSE UCC
description: NSE Unique Client Code (UCC) registration — UCI Online portal, REST API, and batch file integration.
---


## Table of Contents

1. [Overview](#1-overview)
2. [Trading System (NEAT/NOW)](#2-trading-system-neatnow)
3. [UCI Online Portal](#3-uci-online-portal)
4. [UCC Registration Methods](#4-ucc-registration-methods)
5. [API Integration (REST API)](#5-api-integration-rest-api)
6. [Batch File Format](#6-batch-file-format)
7. [Key Field Specifications](#7-key-field-specifications)
8. [PAN Verification (3-Parameter)](#8-pan-verification-3-parameter)
9. [UCC/PAN Validation at Order Entry](#9-uccpan-validation-at-order-entry)
10. [Segment Activation](#10-segment-activation)
11. [6 KYC Attributes](#11-6-kyc-attributes)
12. [Client Category Codes](#12-client-category-codes)
13. [Occupation Codes](#13-occupation-codes)
14. [Income Range Codes](#14-income-range-codes)
15. [Status Codes & Responses](#15-status-codes--responses)
16. [Non-Individual Entity Requirements](#16-non-individual-entity-requirements)
17. [Modification & Closure Process](#17-modification--closure-process)
18. [UCC-Demat Mapping](#18-ucc-demat-mapping)
19. [NSE Clearing (NCL) Relationship](#19-nse-clearing-ncl-relationship)
20. [Error Handling & Common Rejection Reasons](#20-error-handling--common-rejection-reasons)
21. [Timeline & SLA](#21-timeline--sla)
22. [Recent Circulars (2024-2025-2026)](#22-recent-circulars-2024-2025-2026)
23. [Edge Cases & Future Considerations](#23-edge-cases--future-considerations)
24. [Key Reference Documents & Contacts](#24-key-reference-documents--contacts)

---

## 1. Overview

### 1.1 NSE in the Indian Capital Markets

The National Stock Exchange of India (NSE), established in 1992 and operational since 1994, is India's largest stock exchange by turnover. NSE introduced electronic, screen-based trading to India and operates across multiple market segments. NSE is the mandatory exchange for UCC (Unique Client Code) registration as part of the SEBI-mandated KYC framework.

### 1.2 NSE's Role in KYC/UCC

Every trading member (broker) registered with NSE must register each client with a Unique Client Code (UCC) before the client can place any order. The UCC record captures identity, financial profile, bank, and demat details and must remain synchronized with the client's KRA and CKYC records. NSE enforces 6 mandatory KYC attributes (Name, PAN, Address, Mobile, Email, Income Range) that must be compliant before a client is marked "Permitted to Trade" (PTT).

### 1.3 Regulatory Foundation

| Regulation | Reference |
|------------|-----------|
| SEBI KYC Master Circular | SEBI/HO/MIRSD/MIRSD-SEC-2/P/CIR/2023/168 (Oct 2023) |
| SEBI Stock Brokers Master Circular | SEBI/HO/MIRSD/MIRSD-PoD/P/CIR/2025/90 (Jun 2025) |
| SEBI Stock Brokers Regulations 2026 | Notified Jan 7, 2026 (replaces 1992 regulations) |
| NSE UCC Master Circular | NSE/ISC/61817 (Apr 30, 2024) |
| NSE UCC API Introduction | NSE/ISC/60418 (Jan 25, 2024) |
| UCC-Demat Mapping | SEBI/HO/MIRSD/DOP/CIR/P/2019/136 |

---

## 2. Trading System (NEAT/NOW)

### 2.1 NEAT (National Exchange for Automated Trading)

NEAT is NSE's core trading platform, originally launched in 1994. It provides an anonymous, order-driven market with automatic order matching on a price-time priority basis.

### 2.2 NOW (NEAT on Web)

NOW is the browser-based version of the NEAT terminal. It provides trading access through a web interface without requiring dedicated terminal software. NOW supports all segments available on NSE.

### 2.3 Connectivity Options

| Mode | Protocol | Use Case | Latency |
|------|----------|----------|---------|
| Leased Line | Dedicated circuit | Primary production connectivity | Lowest |
| NSE ExtraNet | Internet-based VPN | Cost-effective primary/backup | Low-Medium |
| VSAT | Satellite | Remote/DR locations | Higher |
| Co-location | Direct rack in NSE data center | Algo/HFT trading | Microseconds |
| NOW (Web) | HTTPS | Manual trading, small brokers | Higher |

### 2.4 Trading API (CTCL/NOTIS)

For order routing, NSE provides:

| System | Purpose | Protocol |
|--------|---------|----------|
| CTCL (Computer-to-Computer Link) | DMA/Algo trading | Proprietary TCP/IP (C-structure messages) |
| NOTIS (NSE Open Trading Interface System) | Third-party front-end connectivity | API-based |
| NNF (NSE Now Front-end) | NSE NOW terminal connectivity | Proprietary |

**Note**: UCC registration is a **prerequisite** for order placement on any of these systems. The UCC is validated at every order entry point.

---

## 3. UCI Online Portal

### 3.1 Portal Overview

**URL**: Accessible through the NSE Member Portal (ENIT - Extranet for New Initiatives and Technology)
**Path**: Member Portal > UCI Online

UCI (Unique Client Identification) Online is the web-based portal for managing UCC records. It is the primary interface for manual UCC operations.

### 3.2 Portal Capabilities

| Function | Description |
|----------|-------------|
| New UCC Registration | Create individual or non-individual client records |
| UCC Modification | Update existing client details (non-financial and financial) |
| UCC Status Change | Activate, deactivate, or close client accounts |
| PAN Verification | Initiate and view 3-parameter PAN verification results |
| UCC Search | Search existing UCCs by PAN, client code, or name |
| Batch Upload | Upload pipe-delimited batch files for bulk operations |
| Download Reports | Download PAN verification reports, rejection reports, compliance reports |
| Help & Manuals | API documentation, file format specifications, user guides |

### 3.3 Access Path for API Documentation

```
Member Portal > UCI Online > Help > Manuals
```

This path provides:
- REST API specification document
- Batch file format specification
- Sample request/response payloads
- Field-level validation rules
- Error code reference
- UAT environment details

### 3.4 Authentication

Access to UCI Online requires:
1. Valid NSE Member Portal credentials (Trading Member ID + User ID + Password)
2. IP whitelisting (production)
3. Two-factor authentication (OTP to registered mobile)

---

## 4. UCC Registration Methods

NSE provides three methods for UCC registration, each suited to different operational scales.

### 4.1 Method Comparison

| Method | Scale | Format | Interface | Automation | Max Records |
|--------|-------|--------|-----------|------------|-------------|
| UCI Online (Manual) | 1-by-1 | Web form | Browser | None | N/A |
| REST API | Automated, real-time | JSON over HTTPS | API | Full | Per-call (1 record) |
| Batch Upload | Bulk | Pipe-delimited TXT, no headers | UCI Online upload | Semi-automated | 10,000 per file |

### 4.2 When to Use Which Method

| Scenario | Recommended Method |
|----------|-------------------|
| Testing / single-client onboarding | UCI Online (Manual) |
| Real-time digital onboarding | REST API |
| End-of-day batch processing | Batch Upload |
| Migration from another broker | Batch Upload |
| Segment activation for existing clients | Batch Upload |
| Corrections / resubmissions | UCI Online or API |

---

## 5. API Integration (REST API)

### 5.1 Introduction

NSE introduced the REST API for UCC registration via circular **NSE/ISC/60418** dated **January 25, 2024**. This was a significant modernization from the previous batch-only and manual-only methods, enabling real-time automated UCC creation and modification.

### 5.2 Environments

| Environment | Base URL | Purpose |
|-------------|----------|---------|
| UAT (Testing) | Provided upon registration (via UCI Online > Help) | Integration testing, certification |
| Production | Provided after UAT certification | Live UCC operations |

**Note**: Exact URLs are provided to registered members through the UCI Online portal. They are not publicly documented. Members must complete UAT certification before receiving production credentials.

### 5.3 Authentication

| Parameter | Details |
|-----------|---------|
| Method | API Key + Member Credentials |
| Header: `Authorization` | Bearer token (obtained via auth endpoint) |
| Header: `X-Member-Code` | Trading Member ID (6-character alphanumeric) |
| IP Whitelisting | Mandatory for production; member must register server IPs with NSE |
| TLS | TLS 1.2+ required |

**Authentication Flow**:
```
1. POST /auth/token
   Body: { "member_code": "ABCDEF", "user_id": "xxx", "api_key": "xxx", "api_secret": "xxx" }
   Response: { "access_token": "eyJ...", "expires_in": 3600, "token_type": "Bearer" }

2. Use token in subsequent requests:
   Authorization: Bearer eyJ...
```

### 5.4 API Endpoints

| Operation | Method | Endpoint | Description |
|-----------|--------|----------|-------------|
| Create UCC | POST | `/uci/v1/ucc` | Register a new client |
| Modify UCC | PUT | `/uci/v1/ucc/{client_code}` | Update existing client details |
| Get UCC | GET | `/uci/v1/ucc/{client_code}` | Retrieve UCC record |
| Change Status | PATCH | `/uci/v1/ucc/{client_code}/status` | Activate/Deactivate/Close |
| PAN Verification | GET | `/uci/v1/pan-verify/{pan}` | Check PAN verification status |
| Segment Activation | POST | `/uci/v1/ucc/{client_code}/segments` | Activate/deactivate segments |
| Batch Status | GET | `/uci/v1/batch/{batch_id}` | Check batch upload processing status |

### 5.5 Create UCC - Request Payload

```json
POST /uci/v1/ucc
Content-Type: application/json
Authorization: Bearer <access_token>
X-Member-Code: ABCDEF

{
  "client_code": "CLI0001234",
  "client_name_first": "RAKESH",
  "client_name_middle": "",
  "client_name_last": "KUMAR",
  "pan": "ABCDE1234F",
  "dob": "1990-01-15",
  "gender": "M",
  "client_category": "01",
  "occupation_code": "02",
  "income_range": "04",
  "address": {
    "line1": "123 MG Road, Sector 5",
    "line2": "Near City Mall",
    "line3": "",
    "city": "GURUGRAM",
    "state": "HR",
    "pincode": "122001",
    "country": "IN"
  },
  "mobile": "9876543210",
  "email": "rakesh.kumar@email.com",
  "bank_details": {
    "account_number": "1234567890123",
    "ifsc": "SBIN0001234",
    "account_type": "SB"
  },
  "demat_details": {
    "dp_id": "IN301549",
    "client_id": "12345678",
    "depository": "NSDL"
  },
  "segments": {
    "equity_cash": true,
    "equity_derivatives": true,
    "currency_derivatives": false,
    "commodity": false,
    "debt": false,
    "slbm": false
  },
  "kyc_status": "Y",
  "fatca_declaration": "Y",
  "pep_status": "N",
  "aadhaar_masked": "XXXXXXXX5678",
  "nominees": [
    {
      "sequence": 1,
      "name": "PRIYA KUMAR",
      "relationship": "SPOUSE",
      "pan": "BCDEF2345G",
      "dob": "1992-05-20",
      "percentage": 50,
      "address": {
        "line1": "123 MG Road, Sector 5",
        "city": "GURUGRAM",
        "state": "HR",
        "pincode": "122001"
      }
    },
    {
      "sequence": 2,
      "name": "AARAV KUMAR",
      "relationship": "SON",
      "pan": "",
      "dob": "2015-08-10",
      "percentage": 50,
      "guardian_name": "RAKESH KUMAR",
      "guardian_pan": "ABCDE1234F",
      "guardian_relationship": "FATHER",
      "address": {
        "line1": "123 MG Road, Sector 5",
        "city": "GURUGRAM",
        "state": "HR",
        "pincode": "122001"
      }
    }
  ],
  "nomination_opt_out": false
}
```

### 5.6 Create UCC - Success Response

```json
{
  "status": "SUCCESS",
  "status_code": 200,
  "data": {
    "client_code": "CLI0001234",
    "pan": "ABCDE1234F",
    "ucc_status": "REGISTERED",
    "pan_verification_status": "A",
    "ptt_status": "PENDING",
    "segments_activated": ["CM"],
    "segments_pending": ["FO"],
    "registration_date": "2026-02-13",
    "message": "UCC registered successfully. PAN verification approved. PTT status will be updated by next trading day."
  },
  "timestamp": "2026-02-13T14:30:00+05:30",
  "request_id": "REQ-2026-0213-143000-ABCDEF"
}
```

### 5.7 Modify UCC - Request Payload

```json
PUT /uci/v1/ucc/CLI0001234
Content-Type: application/json
Authorization: Bearer <access_token>
X-Member-Code: ABCDEF

{
  "modification_type": "NON_FINANCIAL",
  "fields_modified": ["address", "mobile", "email"],
  "address": {
    "line1": "456 Park Avenue, DLF Phase 3",
    "line2": "",
    "line3": "",
    "city": "GURUGRAM",
    "state": "HR",
    "pincode": "122002",
    "country": "IN"
  },
  "mobile": "9876543211",
  "email": "rakesh.k@newemail.com"
}
```

### 5.8 Change Status - Request Payload

```json
PATCH /uci/v1/ucc/CLI0001234/status
Content-Type: application/json
Authorization: Bearer <access_token>
X-Member-Code: ABCDEF

{
  "new_status": "I",
  "reason": "Client requested temporary deactivation",
  "effective_date": "2026-02-14"
}
```

### 5.9 Error Response Format

```json
{
  "status": "ERROR",
  "status_code": 400,
  "errors": [
    {
      "field": "pan",
      "code": "PAN_MISMATCH",
      "message": "PAN verification failed. Name/DOB does not match ITD records."
    },
    {
      "field": "address.line1",
      "code": "ADDR_STARTS_WITH_NAME",
      "message": "Address Line 1 must not start with client name."
    }
  ],
  "timestamp": "2026-02-13T14:35:00+05:30",
  "request_id": "REQ-2026-0213-143500-ABCDEF"
}
```

### 5.10 UAT Certification Process

| Step | Activity | Duration |
|------|----------|----------|
| 1 | Member requests API access via UCI Online portal | 1-2 days |
| 2 | NSE issues UAT credentials + API documentation | 2-3 days |
| 3 | Member develops integration against UAT environment | 1-4 weeks |
| 4 | Member submits test results (new registration, modify, status change, error handling) | 1 day |
| 5 | NSE reviews test results and certifies | 3-5 days |
| 6 | NSE issues production credentials + IP whitelisting | 1-2 days |

**UAT Test Cases Required**:
- New Individual UCC creation (all mandatory fields)
- New Non-Individual UCC creation (Corporate with director details)
- UCC modification (address change, bank change, demat change)
- Status change (Active -> Inactive -> Active)
- Segment activation (add F&O to existing equity-only client)
- PAN verification lookup
- Error handling (duplicate UCC, invalid PAN, missing fields)
- Nominee addition (up to 10 nominees)

### 5.11 Rate Limits

| Tier | Rate Limit | Burst |
|------|-----------|-------|
| Standard | 60 requests/minute | 10 requests/second |
| High Volume (upon approval) | 300 requests/minute | 50 requests/second |

---

## 6. Batch File Format

### 6.1 File Specification

| Attribute | Value |
|-----------|-------|
| Delimiter | Pipe (`\|`) |
| Encoding | UTF-8 (ASCII subset preferred) |
| Row Terminator | CRLF or LF |
| Header Row | **None** (no header line; data starts on line 1) |
| File Extension | `.txt` or `.csv` |
| Max Records per File | **10,000** (vs BSE's 30,000) |
| Row Structure | Two rows per client: Row 1 = General Info, Row 2 = Director Details (if applicable) |
| Circular | NSE/ISC/61817 (Apr 30, 2024), revised field structure effective Jul 15, 2024 |

### 6.2 Row Structure

**Row 1**: General client information -- applicable to ALL client types (individuals and non-individuals). Contains fields 1 through 183 as per the revised 183-field structure (effective May 2025, harmonized with BSE SaveUCC_V2).

**Row 2**: Director/partner details -- applicable ONLY to non-individual entities (Corporate, Body Corporate, Partnership). If the client is an individual, Row 2 is omitted or left as an empty row.

### 6.3 Sample Batch File (Individual Client)

```
ABCDEF|CLI0001234|RAKESH||KUMAR|ABCDE1234F|15/01/1990|M|01|02|123 MG Road Sector 5|Near City Mall||GURUGRAM|HR|122001|IN|9876543210|rakesh.kumar@email.com|04|1234567890123|SBIN0001234|SB|IN301549|12345678|NSDL|Y|Y|XXXXXXXX5678|N|PRIYA KUMAR|SPOUSE|BCDEF2345G|50|...|Y|Y|N|N|N|N|A|...
```

**Notes**:
- Fields beyond the shown sample continue for the full 183-field structure
- Empty optional fields are represented by consecutive pipes: `||`
- Date fields use DD/MM/YYYY format strictly
- No trailing pipe at end of row
- No enclosing quotes around fields (even if field contains spaces)

### 6.4 Sample Batch File (Corporate Client with Director Row)

```
ABCDEF|COR0001234|ACME|TECHNOLOGIES|PRIVATE LIMITED|AABCA1234B|01/04/2005||04|01|Cyber Hub Tower A Floor 5|DLF Phase 2||GURUGRAM|HR|122002|IN|9876543210|info@acmetech.com|06|9876543210123|HDFC0001234|CA|12345678||CDSL|Y|Y||N|...|Y|Y|N|N|N|N|A|...
NEW|COR0001234|VIKRAM SINGH|12345678|N|FGHIJ5678K
NEW|COR0001234|ANITA MEHTA|87654321|N|KLMNO6789L
```

### 6.5 Batch Upload Process

```
1. Member prepares pipe-delimited TXT file (max 10,000 records)
2. Login to UCI Online portal
3. Navigate to: UCI Online > Batch Upload > New Registration / Modification
4. Select file and upload
5. System validates file format (immediate rejection for format errors)
6. File queued for processing (overnight batch cycle)
7. Processing results available next morning
8. Download rejection report for failed records
9. Correct and resubmit only the failed records
```

### 6.6 Batch Upload Types

| Upload Type | Purpose | Max Records | Fields |
|-------------|---------|-------------|--------|
| New Registration | Create new UCC records | 10,000 | 183 (full structure) |
| Modification | Update existing UCC records | 10,000 | 183 (full structure) |
| Bank Details Update | Update bank account details only | 10,000 | Subset of bank fields |
| Depository Details Update | Update demat account details | 10,000 | Subset of demat fields |
| Segment Activation | Activate/deactivate segments | 10,000 | Client code + segment flags |
| Nominee Update | Update nominee details | 10,000 | Client code + nominee fields |

---

## 7. Key Field Specifications

### 7.1 Core Fields (Row 1 - General Information)

The following table documents the key fields in the 183-field pipe-delimited structure. Not all 183 fields are listed here -- only the most critical ones for implementation. For the complete field list, refer to the specification document at UCI Online > Help > Manuals.

| Field # | Field Name | Type | Max Length | Mandatory | Valid Values / Rules |
|---------|-----------|------|-----------|-----------|---------------------|
| 1 | Trading Member ID | AN | 6 | M | NSE member code assigned at registration |
| 2 | Client Code | AN | 10 | M | Unique per member, alphanumeric, no special chars |
| 3 | Client Name (First) | A | 70 | M | As per PAN/ITD records, uppercase |
| 4 | Client Name (Middle) | A | 35 | O | |
| 5 | Client Name (Last) | A | 35 | M | As per PAN/ITD records |
| 6 | PAN | AN | 10 | M | AAAAA9999A format; or `PAN_EXEMPT` for ITD-exempt |
| 7 | Date of Birth / DOI / DOR | D | 10 | M | DD/MM/YYYY; DOI for companies, DOR for others |
| 8 | Gender | A | 1 | M (Indiv.) | M = Male, F = Female, T = Transgender |
| 9 | Client Category | N | 2 | M | 01-46, see Section 12 |
| 10 | Occupation Code | N | 2 | M | 01-08, see Section 13 |
| 11 | Address Line 1 | AN | 100 | M | Must NOT start with client name |
| 12 | Address Line 2 | AN | 100 | O | Must NOT equal Addr Line 1 or 3 |
| 13 | Address Line 3 | AN | 100 | O | Must NOT equal Addr Line 1 or 2 |
| 14 | City | A | 35 | M | |
| 15 | State | A | 2 | M | 2-letter state code (see state code table) |
| 16 | Pincode | N | 6 | M | Valid Indian 6-digit pincode |
| 17 | Country | A | 2 | M | ISO 3166-1 alpha-2 (IN for India) |
| 18 | Mobile Number | N | 10 | M | 10-digit Indian mobile, must be verified |
| 19 | Email ID | AN | 100 | M | Valid format, must be verified |
| 20 | Income Range Code | N | 2 | M | 01-06, see Section 14 |
| 21 | Bank Account Number | AN | 20 | M | |
| 22 | Bank IFSC Code | AN | 11 | M | 4 alpha + 0 + 6 alphanumeric |
| 23 | Bank Account Type | A | 2 | M | SB = Savings, CA = Current |
| 24 | DP ID | AN | 8/16 | M | NSDL: IN+6 chars, CDSL: 8 digits |
| 25 | DP Client ID | AN | 8/16 | M | NSDL: 8 chars, CDSL: 8 digits |
| 26 | Depository | A | 4 | M | CDSL or NSDL |
| 27 | KYC Status | A | 1 | M | Y = KYC compliant, N = Not compliant |
| 28 | FATCA Declaration | A | 1 | M | Y = Declared, N = Not declared |
| 29 | Aadhaar (Masked) | AN | 12 | O | Last 4 digits visible: XXXXXXXX5678 |
| 30 | PEP Status | A | 1 | M | Y = PEP, N = Not PEP, R = PEP Related |
| 31 | Equity Cash Segment | A | 1 | M | Y / N |
| 32 | Equity Derivatives (F&O) | A | 1 | O | Y / N |
| 33 | Currency Derivatives | A | 1 | O | Y / N |
| 34 | Commodity Segment | A | 1 | O | Y / N (NSE COM since 2018) |
| 35 | Debt Segment | A | 1 | O | Y / N |
| 36 | SLBM (Securities Lending & Borrowing) | A | 1 | O | Y / N |
| 37 | Client Status | A | 1 | M | A = Active, I = Inactive, C = Closed |
| 38 | POA/DDPI for Funds | A | 1 | O | Y / N |
| 39 | POA/DDPI for Securities | A | 1 | O | Y / N |
| 40 | Running Account Auth | A | 1 | O | M = Monthly, Q = Quarterly |
| 41 | Nomination Opt-out | A | 1 | M | Y = Opted out (video verification required), N = Nominees provided |

### 7.2 Nominee Fields (Fields 42-101, accommodating 10 nominees)

Each nominee occupies 6 fields. With up to 10 nominees (SEBI mandate effective Jan 2025), fields 42-101 are allocated as follows:

| Nominee # | Field Range | Sub-Fields per Nominee |
|-----------|-------------|----------------------|
| Nominee 1 | 42-47 | Name, Relationship, PAN, DOB, Percentage, Address |
| Nominee 2 | 48-53 | Same pattern |
| Nominee 3 | 54-59 | Same pattern |
| Nominees 4-10 | 60-101 | Same pattern (added in 183-field structure, May 2025) |

**Nominee Sub-Field Structure** (repeated for each nominee):

| Sub-Field | Type | Max Length | Mandatory | Rules |
|-----------|------|-----------|-----------|-------|
| Nominee Name | A | 70 | M (if nominee provided) | Full name |
| Nominee Relationship | A | 20 | M (if nominee provided) | Standardized code (see below) |
| Nominee PAN | AN | 10 | O | AAAAA9999A format |
| Nominee DOB | D | 10 | O | DD/MM/YYYY |
| Nominee Percentage | N | 3 | M (if nominee provided) | 1-100, total across all nominees must = 100 |
| Nominee Address | AN | 200 | O | Full address if different from client |

**Standardized Nominee Relationship Codes**:

| Code | Relationship |
|------|-------------|
| SPOUSE | Spouse |
| SON | Son |
| DAUGHTER | Daughter |
| FATHER | Father |
| MOTHER | Mother |
| BROTHER | Brother |
| SISTER | Sister |
| GRAND_FATHER | Grand Father |
| GRAND_MOTHER | Grand Mother |
| GRAND_SON | Grand Son |
| GRAND_DAUGHTER | Grand Daughter |
| OTHERS | Others (specify) |

### 7.3 Guardian Fields (for Minor Clients - Category 02)

| Field # | Field Name | Type | Max Length | Mandatory | Rules |
|---------|-----------|------|-----------|-----------|-------|
| 102 | Guardian Name | A | 70 | M (minor) | Full legal name |
| 103 | Guardian PAN | AN | 10 | M (minor) | Must pass 3-param PAN verification |
| 104 | Guardian DOB | D | 10 | M (minor) | DD/MM/YYYY |
| 105 | Guardian Relationship | A | 20 | M (minor) | FATHER / MOTHER / LEGAL_GUARDIAN |
| 106 | Guardian Address | AN | 200 | O | If different from client |

### 7.4 Second Holder / Joint Holder Fields

| Field # | Field Name | Type | Max Length | Mandatory | Rules |
|---------|-----------|------|-----------|-----------|-------|
| 107 | Second Holder Name | A | 70 | O | |
| 108 | Second Holder PAN | AN | 10 | O | Must pass PAN verification |
| 109 | Second Holder DOB | D | 10 | O | |
| 110 | Third Holder Name | A | 70 | O | |
| 111 | Third Holder PAN | AN | 10 | O | Must pass PAN verification |
| 112 | Third Holder DOB | D | 10 | O | |

### 7.5 Director Details (Row 2 - Non-Individual Entities)

| Field # | Field Name | Type | Max Length | Mandatory | Valid Values |
|---------|-----------|------|-----------|-----------|-------------|
| 1 | Action | A | 3 | M | NEW = Add director, DEL = Remove director |
| 2 | Client Code | AN | 10 | M | Must match Row 1 client code |
| 3 | Director Name | A | 70 | M | Full name |
| 4 | DIN | N | 8 | M | Director Identification Number (for companies) |
| 5 | Foreign Resident | A | 1 | M | Y / N |
| 6 | Director PAN | AN | 10 | M | AAAAA9999A format |

### 7.6 State Codes

| Code | State | Code | State |
|------|-------|------|-------|
| AN | Andaman & Nicobar | MH | Maharashtra |
| AP | Andhra Pradesh | MN | Manipur |
| AR | Arunachal Pradesh | ML | Meghalaya |
| AS | Assam | MZ | Mizoram |
| BR | Bihar | NL | Nagaland |
| CH | Chandigarh | OR | Odisha |
| CT | Chhattisgarh | PY | Puducherry |
| DD | Daman & Diu | PB | Punjab |
| DL | Delhi | RJ | Rajasthan |
| GA | Goa | SK | Sikkim |
| GJ | Gujarat | TN | Tamil Nadu |
| HP | Himachal Pradesh | TG | Telangana |
| HR | Haryana | TR | Tripura |
| JH | Jharkhand | UP | Uttar Pradesh |
| JK | Jammu & Kashmir | UK | Uttarakhand |
| KA | Karnataka | WB | West Bengal |
| KL | Kerala | LA | Ladakh |
| MP | Madhya Pradesh | DN | Dadra & Nagar Haveli |

---

## 8. PAN Verification (3-Parameter)

### 8.1 Overview

NSE mandates 3-parameter PAN verification against NSDL/Protean (Income Tax Department) records for every UCC. This is identical to BSE's requirement, as it is a SEBI mandate applicable to all exchanges.

### 8.2 The Three Parameters

| # | Parameter | Field | Source | Mandatory |
|---|-----------|-------|--------|-----------|
| 1 | PAN Number | 10-character alphanumeric (AAAAA9999A) | Client input | Yes |
| 2 | Client Name | Name as per PAN/ITD records | Client input (must match ITD) | Yes |
| 3 | DOB / DOI / DOR | Date of Birth (individuals) / Date of Incorporation (companies) / Date of Registration | Client input (must match ITD) | Yes -- for all holders including Guardian |

### 8.3 Verification Result Codes

| Code | Status | Description | Impact on PTT | Trading Allowed |
|------|--------|-------------|---------------|-----------------|
| **A** | Approved | All 3 parameters match ITD records | Prerequisite for PTT | Only after PTT granted |
| **I** | Incorrect | One or more parameters do not match | Cannot be marked PTT | No |
| **P** | Pending | Verification in progress (ITD system delay) | PTT deferred | No |

### 8.4 PAN Verification Rules

1. **Mandatory for all holders**: Primary holder, Second holder, Third holder, AND Guardian (in case of Minor)
2. **Name must match ITD exactly**: If name on PAN card differs from ITD database, client must first correct at ITD (by filing PAN correction form) before UCC submission
3. **DOB/DOI mandatory**: DOB for individuals, DOI for companies, DOR for trusts/partnerships
4. **PAN-Aadhaar linking**: No longer a parameter for PTT status (per NSE circular NSE/ISC/62244, May 30, 2024). However, clients with inoperative PAN due to non-linking face ITD restrictions.
5. **`PAN_EXEMPT` keyword**: Used for investors who are exempt from PAN requirement under Income Tax provisions (e.g., certain government entities). When PAN_EXEMPT is used, PAN verification is bypassed but the UCC has limited trading capabilities.
6. **Special PAN `AAAAA8888A`**: Reserved for Central Government / State Government / Court-appointed officials

### 8.5 PAN Verification Failure Resolution

```
1. Download PAN verification report from UCI Online
2. Identify records with status "I" (Incorrect)
3. Compare client-provided name/DOB with ITD records
4. Client corrects data at ITD source (via NSDL PAN Update portal)
5. Wait for ITD records to update (2-7 working days)
6. Re-submit UCC with corrected data
7. PAN re-verification automatically triggered
```

---

## 9. UCC/PAN Validation at Order Entry

### 9.1 Overview

Since **July 2022**, NSE validates UCC and PAN status at every order entry point across all trading segments. No order can be placed unless the client's UCC is compliant and PAN is verified.

### 9.2 Segments Where Validation Applies

| Segment | Code | Validation Active |
|---------|------|-------------------|
| Cash Market (Equity) | CM | Yes |
| Futures & Options | FO | Yes |
| Currency Derivatives | CD | Yes |
| Commodity Derivatives | COM | Yes |
| Securities Lending & Borrowing | SLBM | Yes |
| Debt Segment | D | Yes |

### 9.3 Validation Logic at Order Entry

```
Order Received
  |
  +-- Check: Does client_code exist in UCC database?
  |     No  --> REJECT: "Invalid client code"
  |     Yes --> Continue
  |
  +-- Check: Is UCC status = Active?
  |     No (Inactive/Closed) --> REJECT: "Client not active"
  |     Yes --> Continue
  |
  +-- Check: Is PTT status = "Permitted to Trade"?
  |     No (NPTT) --> REJECT: "Client not permitted to trade"
  |     Yes --> Continue
  |
  +-- Check: Is PAN verification = "A" (Approved)?
  |     No (I/P) --> REJECT: "PAN verification pending/failed"
  |     Yes --> Continue
  |
  +-- Check: Is requested segment activated for this client?
  |     No  --> REJECT: "Segment not activated"
  |     Yes --> Continue
  |
  +-- Check: Are 6 KYC attributes compliant?
  |     No  --> REJECT: "KYC non-compliant"
  |     Yes --> ORDER ACCEPTED
```

### 9.4 Contingency Mode Exception

During **contingency time** (system disruption, disaster recovery, or exchange-declared contingency periods), UCC validation may be temporarily relaxed. Specifically:

- UCC is **not validated** during declared contingency time
- Broker must validate UCC offline and is responsible for compliance
- Post-contingency, any trades placed for invalid UCCs must be squared off
- NSE circular specifies contingency procedures separately

**Important**: This exception is rare and applies only during exchange-declared contingency events. Normal operations always enforce full validation.

---

## 10. Segment Activation

### 10.1 Available Segments on NSE

| Segment | Full Name | Code | Income Proof | Additional Requirements |
|---------|-----------|------|-------------|------------------------|
| Equity Cash | Capital Market | CM | No | Basic KYC sufficient |
| Equity Derivatives | Futures & Options | FO | Yes | Income >= Rs.10L or net worth certificate; SEBI eligibility criteria |
| Currency Derivatives | Currency | CD | No specific income requirement | |
| Commodity | NSE COM | COM | Yes (for most commodities) | Income proof; NSE commodity trading since 2018 |
| Debt | Debt Segment | D | No | Minimal additional requirements |
| SLBM | Securities Lending & Borrowing | SLBM | No | Segment-specific agreement |

### 10.2 Segment Activation Rules

1. **Equity Cash (CM) is default**: Every new UCC must have at least the CM segment activated
2. **F&O eligibility criteria**: Per SEBI/HO/MRD/TPD-1/P/CIR/2025/33, enhanced eligibility criteria for F&O trading include income proof, net worth assessment, and risk disclosure acknowledgement
3. **Segment activation is additive**: Members can activate additional segments for existing clients without re-registering the UCC
4. **Segment deactivation**: Members can deactivate segments; this prevents new orders but does not affect existing open positions (which must be closed separately)
5. **Commodity segment**: NSE launched commodity derivatives in 2018; commodity segment activation requires separate income documentation

### 10.3 F&O Eligibility Enhancement (2025)

Per SEBI circular effective 2025:
- Minimum annual income documentation required (income proof / ITR / bank statement / net worth certificate)
- Risk disclosure document must be signed by client
- Member must assess client's ability to bear losses
- Stress testing of client portfolio may be required
- Broker responsible for ensuring eligibility before activation

### 10.4 Segment Activation via Batch

```
Segment Activation Batch File Format (pipe-delimited):
Field 1: Trading Member ID
Field 2: Client Code
Field 3: CM (Y/N)
Field 4: FO (Y/N)
Field 5: CD (Y/N)
Field 6: COM (Y/N)
Field 7: D (Y/N)
Field 8: SLBM (Y/N)

Example:
ABCDEF|CLI0001234|Y|Y|N|N|N|N
ABCDEF|CLI0005678|Y|Y|Y|Y|N|N
```

Max records per segment activation file: **10,000**

---

## 11. 6 KYC Attributes

### 11.1 Overview

SEBI mandates that 6 KYC attributes must be captured, verified, and kept consistent across all three registries: KRA, Exchange (NSE), and Depository (CDSL/NSDL). Non-compliance with any attribute renders the client "Not Permitted to Trade" (NPTT).

### 11.2 The 6 Attributes

| # | Attribute | Validation Requirement | UCC Field Mapping |
|---|-----------|----------------------|-------------------|
| 1 | **Name** | Must match PAN/ITD records exactly (3-param PAN verification) | Fields 3-5 (First, Middle, Last) |
| 2 | **PAN** | Valid, non-inoperative PAN; verified against ITD | Field 6 |
| 3 | **Address** | Complete with pincode; must match submitted documents | Fields 11-17 |
| 4 | **Mobile Number** | Valid 10-digit Indian mobile; must be verified (OTP) | Field 18 |
| 5 | **Email ID** | Valid format; must be verified (link/OTP) | Field 19 |
| 6 | **Income Range** | Gross annual income code (01-06) | Field 20 |

### 11.3 Consistency Requirements

```
KRA Record              Exchange UCC (NSE)        Depository (CDSL/NSDL)
-----------             ------------------         ----------------------
Name        <=======>   Name (Fields 3-5)  <=======>  BO Name
PAN         <=======>   PAN (Field 6)      <=======>  BO PAN
Address     <=======>   Address (11-17)    <=======>  BO Address
Mobile      <=======>   Mobile (Field 18)  <=======>  BO Mobile
Email       <=======>   Email (Field 19)   <=======>  BO Email
Income Range<=======>   Income (Field 20)  <=======>  N/A (not in demat)
```

Any discrepancy between these three systems triggers compliance alerts and may result in NPTT status.

### 11.4 Distinct Mobile & Email (SEBI Dec 2024)

Per SEBI circular (Dec 2024):
- Each client must have a **distinct** mobile number (not shared with other clients)
- Each client must have a **distinct** email ID (not shared with other clients)
- **Family exception**: Spouse, dependent children, and dependent parents may share mobile/email
- NSE enforces this during UCC registration; duplicate mobile/email across unrelated clients will be rejected

---

## 12. Client Category Codes

Client category codes are standardized by SEBI and are identical across NSE, BSE, and MCX.

| Code | Category | Entity Type | Notes |
|------|----------|-------------|-------|
| 01 | Individual | Person | Most common; UPI applicable |
| 02 | On behalf of Minor | Person (Guardian acting) | Guardian PAN/DOB mandatory |
| 03 | HUF (Hindu Undivided Family) | Non-individual | Karta details required; UPI applicable |
| 04 | Company | Non-individual | DOI, CIN, Director details mandatory |
| 05 | AOP (Association of Persons) | Non-individual | |
| 06 | Partnership Firm | Non-individual | Partner details, authorized signatory |
| 07 | Body Corporate | Non-individual | DOI, CIN/Reg No., Director details |
| 08 | Trust | Non-individual | Trust deed, trustee details |
| 09 | Society | Non-individual | |
| 10 | Others | Miscellaneous | |
| 11 | NRI - Others | NRI | |
| 12 | DFI (Dev. Financial Institution) | Institutional | |
| 13 | Sole Proprietorship | Non-individual | |
| 21 | NRI - Repatriable (NRE) | NRI | NRE bank account mandatory |
| 22 | OCB (Overseas Corporate Body) | Foreign | |
| 23 | FII (Foreign Institutional Investor) | Foreign | |
| 24 | NRI - Repatriable (NRO) | NRI | NRO bank account mandatory |
| 25 | Overseas Corp. Body - Others | Foreign | |
| 26 | NRI Child | NRI | |
| 27 | NRI - HUF (NRO) | NRI | |
| 28 | NRI - Minor (NRO) | NRI | |
| 29 | NRI - HUF (NRE) | NRI | |
| 31 | Provident Fund | Institutional | |
| 32 | Super Annuation Fund | Institutional | |
| 33 | Gratuity Fund | Institutional | |
| 34 | Pension Fund | Institutional | |
| 36 | Mutual Funds FOF Schemes | Institutional | |
| 37 | NPS Trust | Institutional | |
| 38 | Global Development Network | Institutional | |
| 39 | FCRA | Institutional | |
| 41 | QFI - Individual | Foreign (QFI) | |
| 42 | QFI - Minors | Foreign (QFI) | |
| 43 | QFI - Corporate | Foreign (QFI) | |
| 44 | QFI - Pension Funds | Foreign (QFI) | |
| 45 | QFI - Hedge Funds | Foreign (QFI) | |
| 46 | QFI - Mutual Funds | Foreign (QFI) | |

**UPI Applicability**: Only client categories **01** (Individual) and **03** (HUF), Cash segment (CM) only.

---

## 13. Occupation Codes

Occupation codes are standardized by SEBI and identical across all exchanges.

| Code | Occupation | Typical Entity |
|------|-----------|----------------|
| 01 | Business | Proprietors, business owners |
| 02 | Services (Salaried) | Employed individuals |
| 03 | Professional | Doctors, lawyers, CAs, architects |
| 04 | Agriculture | Farmers, agricultural workers |
| 05 | Retired | Pensioners, retirees |
| 06 | Housewife | Homemakers |
| 07 | Student | Students (minor accounts via guardian) |
| 08 | Others | Any not covered above |

---

## 14. Income Range Codes

Income range codes are standardized by SEBI and identical across all exchanges.

| Code | Income Range (Annual, INR) | F&O Eligibility |
|------|---------------------------|-----------------|
| 01 | Below 1 Lakh | No (unless net worth certificate) |
| 02 | 1 Lakh - 5 Lakh | No (unless net worth certificate) |
| 03 | 5 Lakh - 10 Lakh | Conditional |
| 04 | 10 Lakh - 25 Lakh | Yes |
| 05 | 25 Lakh - 1 Crore | Yes |
| 06 | Above 1 Crore | Yes |

**Notes**:
- Income range is mandatory for ALL client categories
- For F&O and Commodity segments, income code 04 or above is generally required (or equivalent net worth documentation)
- Income range must be updated periodically; stale declarations may trigger compliance review
- This is one of the 6 mandatory KYC attributes

---

## 15. Status Codes & Responses

### 15.1 Client Status (UCC Level)

| Status | Code | Description | Can Trade? | Reversible? |
|--------|------|-------------|-----------|-------------|
| Active | A | Client account is active and operational | Yes (if PTT) | N/A |
| Inactive | I | Member-deactivated or non-compliant | No | Yes (can reactivate) |
| Closed | C | Account permanently closed by member | No | **No (irreversible)** |

**Critical**: Closed status is **irreversible**. Once a UCC is marked Closed, it cannot be reopened. A new UCC must be registered if the client wishes to resume trading. This is different from Inactive status, which can be reversed.

### 15.2 PAN Verification Status

| Code | Status | Description | PTT Impact |
|------|--------|-------------|-----------|
| A | Approved | All 3 parameters verified against ITD | Eligible for PTT |
| I | Incorrect | Name/DOB mismatch with ITD | NOT eligible for PTT |
| P | Pending | Verification in progress | NOT eligible for PTT |

### 15.3 PTT (Permitted to Trade) Status

| Status | Description | Requirements |
|--------|-------------|--------------|
| PTT | Permitted to Trade | PAN = A + KYC compliant + 6 attributes valid + active status |
| NPTT | Not Permitted to Trade | Any requirement not met |

### 15.4 PTT Determination Logic

```
PTT = TRUE when ALL of the following are met:
  1. UCC Status = Active (A)
  2. PAN Verification = Approved (A)
  3. KYC Status = Y
  4. All 6 KYC Attributes are compliant
  5. FATCA declaration = Y
  6. No regulatory holds or blocks

NPTT = TRUE when ANY of the above is not met
```

### 15.5 Automatic Consequences of Status Changes

| Event | Automatic Action |
|-------|-----------------|
| UCC status changed from Active to Inactive | All open orders cancelled; no new orders accepted; demat auto-delinked |
| UCC status changed from Active to Closed | All open orders cancelled; final settlement initiated; demat permanently delinked |
| PAN status changed from A to I | PTT revoked; client moves to NPTT |
| KYC attribute becomes non-compliant | PTT revoked; compliance alert generated |

**Demat Auto-Delinking**: When a UCC status changes from Active to Inactive or Closed, the demat account mapping is automatically delinked from trading. Relinking requires re-verification when reactivating (Inactive case only).

---

## 16. Non-Individual Entity Requirements

### 16.1 Entity-Specific Mandatory Fields

| Entity (Category) | Additional Mandatory Fields |
|-------------------|---------------------------|
| Minor (02) | Guardian Name, Guardian PAN, Guardian DOB, Guardian Relationship; Guardian must pass 3-param PAN verification |
| HUF (03) | Karta Name, Karta PAN, Karta DOB, HUF PAN; Karta must pass 3-param PAN verification |
| Company (04) | DOI (Date of Incorporation), CIN (Corporate Identification Number), Director details (Name, DIN, PAN, Foreign Resident flag per director), Authorized Signatory details |
| AOP (05) | Member details, Authorized Signatory |
| Partnership (06) | Partnership PAN, Partner details (Name, PAN for each partner), Authorized Signatory, Partnership Deed registration |
| Body Corporate (07) | DOI, CIN/Registration Number, Director details |
| Trust (08) | Trust deed registration details, Trustee details (Name, PAN), Trust PAN |
| Society (09) | Registration certificate, Authorized office bearers |
| Sole Proprietorship (13) | Proprietor's PAN (same as business PAN), Business registration proof |

### 16.2 NRI-Specific Requirements

| Requirement | Details |
|-------------|---------|
| RBI PIS Permission | Portfolio Investment Scheme permission letter from authorized dealer (AD bank) required for equity trading |
| Bank Account Type | NRE for repatriable (category 21), NRO for non-repatriable (category 24) |
| CP Code | Custodial Participant code requirement **removed** by SEBI (July 2025) |
| PAN-Aadhaar | NRI PANs must be "PAN-Aadhaar linked" OR marked "Not applicable" per ITD records |
| Country of Residence | Mandatory; determines FATCA/CRS reporting obligations |
| Tax Residency Certificate | Required for treaty benefits |
| Seafarer NRIs | Certain address/document fields relaxed |

### 16.3 Director Details Submission

For non-individual entities requiring director details:

**Via API**:
```json
{
  "directors": [
    {
      "action": "NEW",
      "name": "VIKRAM SINGH",
      "din": "12345678",
      "foreign_resident": false,
      "pan": "FGHIJ5678K"
    },
    {
      "action": "NEW",
      "name": "ANITA MEHTA",
      "din": "87654321",
      "foreign_resident": false,
      "pan": "KLMNO6789L"
    }
  ]
}
```

**Via Batch (Row 2 per director)**:
```
NEW|COR0001234|VIKRAM SINGH|12345678|N|FGHIJ5678K
NEW|COR0001234|ANITA MEHTA|87654321|N|KLMNO6789L
```

**Director Changes**: Existing directors can be removed by submitting Row 2 with Action = `DEL`.

---

## 17. Modification & Closure Process

### 17.1 Types of Modifications

| Type | Fields | Method | PAN Re-verification |
|------|--------|--------|---------------------|
| Non-Financial | Address, Mobile, Email, Bank, Demat | API, Batch, UCI Online | No |
| Financial | Segment activation/deactivation | Segment activation batch/API | No |
| Identity | Name, DOB, PAN | UCI Online only (with documentary proof) | Yes |
| Status | Active/Inactive/Closed | API, UCI Online | No |
| Nominee | Add/modify/remove nominees | API, Batch, UCI Online | No |

### 17.2 Modification Process

```
Via API:
1. Call PUT /uci/v1/ucc/{client_code} with modified fields
2. System validates changes (format, business rules)
3. If PAN-related change -> triggers 3-param PAN re-verification
4. If successful -> UCC updated, PTT status reassessed
5. If validation fails -> error response with field-level details

Via Batch:
1. Prepare modification file with full record (all 183 fields, modified ones updated)
2. Upload via UCI Online > Batch Upload > Modification
3. Processed in overnight batch cycle
4. Download results next morning

Via UCI Online (Manual):
1. Login to UCI Online
2. Search for client by Client Code or PAN
3. Click "Modify"
4. Update fields
5. Submit; changes effective immediately for non-financial modifications
```

### 17.3 Client Status Transition Rules

| From | To | Allowed? | Process | Notes |
|------|-----|----------|---------|-------|
| Active (A) | Inactive (I) | Yes | Member updates via API/portal/batch | Client cannot trade; open orders cancelled |
| Active (A) | Closed (C) | Yes | Member closes; final settlement | **Irreversible**; demat delinked permanently |
| Inactive (I) | Active (A) | Yes | Re-verification of 6 KYC attributes | May take T+2 working days |
| Inactive (I) | Closed (C) | Yes | Member closes | **Irreversible** |
| Closed (C) | Active (A) | **No** | Not possible | New UCC required |
| Closed (C) | Inactive (I) | **No** | Not possible | New UCC required |

### 17.4 Closure Process

```
1. Verify no open positions exist (all segments)
2. Complete all pending settlements
3. Transfer any remaining securities from linked demat
4. Settle any remaining fund obligations
5. Update client status to "C" (Closed) via API or UCI Online
6. UCC automatically marked NPTT
7. Demat mapping permanently delinked
8. Inform all exchanges (NSE/BSE/MCX) of closure
9. Retain records per SEBI retention policy (minimum 8 years per 2026 regulations)
10. Closed UCC code CANNOT be reused for another client
```

---

## 18. UCC-Demat Mapping

### 18.1 SEBI Mandate

Per **SEBI/HO/MIRSD/DOP/CIR/P/2019/136**, every UCC must be mapped to at least one demat account. This mapping ensures that securities delivery and settlement are correctly linked to the trading account.

### 18.2 Mapping Rules

| Rule | Details |
|------|---------|
| Minimum mapping | Each UCC must have at least 1 demat account mapped |
| Multiple demat | A UCC can be mapped to multiple demat accounts (across CDSL and NSDL) |
| PAN consistency | PAN on UCC must match PAN on demat account |
| Name consistency | Name on UCC must match BO name on demat account |
| One-to-many | One UCC can map to multiple demat accounts |
| Many-to-one | Multiple UCCs (at different brokers) can map to the same demat account |

### 18.3 Demat ID Formats

| Depository | Format | Example | Structure |
|------------|--------|---------|-----------|
| NSDL | IN + 6-digit DP ID + 8-digit Client ID | IN30154912345678 | 16 characters starting with "IN" |
| CDSL | 8-digit DP ID + 8-digit Client ID | 1234567812345678 | 16 digits (no "IN" prefix) |

### 18.4 Auto-Delinking Behavior

| Trigger Event | Demat Action |
|---------------|-------------|
| UCC Active -> Inactive | Demat delinked; relinking possible on reactivation |
| UCC Active -> Closed | Demat permanently delinked |
| PAN mismatch detected | Demat flagged; may be delinked pending correction |
| Depository BO closed | UCC notified; demat mapping invalidated |

### 18.5 Mapping via API

```json
POST /uci/v1/ucc/{client_code}/demat
Content-Type: application/json
Authorization: Bearer <access_token>

{
  "action": "ADD",
  "dp_id": "IN301549",
  "client_id": "12345678",
  "depository": "NSDL",
  "primary": true
}
```

---

## 19. NSE Clearing (NCL) Relationship

### 19.1 NSE Clearing Limited (NCL)

NCL (formerly NSCCL - National Securities Clearing Corporation Limited) is the clearing corporation subsidiary of NSE. It handles clearing and settlement for all trades executed on NSE.

### 19.2 UCC-NCL Interaction

| Aspect | Details |
|--------|---------|
| Trade Obligation | Every trade on NSE generates an obligation in NCL against the UCC |
| Settlement | NCL settles all segment obligations (equity T+1, derivatives as per contract) |
| Margin | Client-level margins computed by NCL based on UCC positions |
| Collateral | Clearing members upload collateral data daily, segregated by UCC |
| Risk Management | NCL monitors risk at UCC level (SPAN + Exposure margins) |
| Default | If clearing member defaults, NCL's risk management framework protects client collateral per UCC |

### 19.3 Client-Level Segregation (SEBI Mandate)

| Requirement | Reference |
|-------------|-----------|
| Client-level collateral segregation | SEBI circular Jul 20, 2021 |
| 50% margin in cash/cash equivalents | SEBI peak margin norms |
| Client can view disaggregated collateral | NCL web portal |
| Clearing member to report per UCC | Daily obligation |

### 19.4 Settlement Cycles

| Segment | Settlement Cycle | Notes |
|---------|-----------------|-------|
| Equity Cash (CM) | T+1 | Since Jan 27, 2023 |
| Equity Derivatives (FO) | T+1 (premium), Expiry-based for margins | Daily MTM settlement |
| Currency Derivatives (CD) | T+1 | |
| Commodity (COM) | T+1 for non-delivery; delivery per contract | |
| Debt (D) | T+1 | |
| SLBM | As per lending/borrowing contract | |

---

## 20. Error Handling & Common Rejection Reasons

### 20.1 API Error Codes

| Error Code | Category | Description | Resolution |
|------------|----------|-------------|-----------|
| `INVALID_CLIENT_CODE` | Validation | Client code format invalid or >10 chars | Fix client code format |
| `DUPLICATE_UCC` | Business | PAN already registered under another client code | Merge or close duplicate |
| `PAN_FORMAT_INVALID` | Validation | PAN does not match AAAAA9999A pattern | Correct PAN format |
| `PAN_MISMATCH` | Business | Name/DOB does not match ITD records | Client corrects at ITD first |
| `PAN_INOPERATIVE` | Business | PAN is inoperative (not linked to Aadhaar) | Client links Aadhaar at ITD |
| `ADDR_STARTS_WITH_NAME` | Validation | Address Line 1 starts with client name | Remove name from address start |
| `ADDR_LINES_DUPLICATE` | Validation | Two or more address lines are identical | Make address lines distinct |
| `MOBILE_DUPLICATE` | Business | Mobile already used by unrelated client | Use distinct mobile per SEBI rule |
| `EMAIL_DUPLICATE` | Business | Email already used by unrelated client | Use distinct email per SEBI rule |
| `MOBILE_NOT_VERIFIED` | Business | Mobile number not verified (OTP) | Complete mobile verification |
| `EMAIL_NOT_VERIFIED` | Business | Email not verified | Complete email verification |
| `PINCODE_INVALID` | Validation | Pincode is not a valid 6-digit Indian pincode | Correct pincode |
| `IFSC_INVALID` | Validation | IFSC does not match 4A+0+6AN pattern | Correct IFSC code |
| `DEMAT_INVALID` | Business | DP ID/Client ID not found at depository | Verify demat details with CDSL/NSDL |
| `NOMINEE_PCT_INVALID` | Validation | Nominee percentages do not sum to 100 | Correct percentages to total exactly 100 |
| `MANDATORY_FIELD_MISSING` | Validation | Required field is blank or null | Populate all mandatory fields |
| `GUARDIAN_REQUIRED` | Business | Minor client (cat 02) without guardian details | Add guardian details |
| `INCOME_RANGE_MISSING` | Validation | Income range code not provided | Provide income range (01-06) |
| `SEGMENT_INELIGIBLE` | Business | Client does not meet segment eligibility | Provide income proof or adjust segments |
| `FATCA_NOT_DECLARED` | Validation | FATCA declaration flag is N | Client must declare FATCA status |
| `KYC_NON_COMPLIANT` | Business | 6 KYC attributes not all valid | Update all 6 attributes |
| `DOB_FORMAT_INVALID` | Validation | Date not in DD/MM/YYYY format | Correct date format |

### 20.2 Batch Rejection Handling

```
1. Upload batch file via UCI Online
2. Immediate format validation:
   - File encoding check (UTF-8/ASCII)
   - Delimiter check (pipe)
   - Field count per row (must be exactly 183 for Row 1)
   - If format fails -> entire file rejected with format error
3. Overnight processing:
   - Each record validated individually
   - Valid records: processed and registered
   - Invalid records: rejected with specific error code per field
4. Next morning:
   - Download rejection report from UCI Online
   - Report contains: Row Number, Client Code, Field Name, Error Code, Error Description
5. Correction:
   - Fix ONLY the rejected records
   - Resubmit in a new batch file
   - Do NOT include already-accepted records (causes duplicate error)
```

### 20.3 Common Validation Rules

| # | Rule | Applies To |
|---|------|-----------|
| 1 | All mandatory fields must be non-blank | All records |
| 2 | PAN: exactly AAAAA9999A (5 alpha + 4 numeric + 1 alpha) | Field 6 |
| 3 | DOB: DD/MM/YYYY strictly | Field 7 |
| 4 | Mobile: exactly 10 digits | Field 18 |
| 5 | Email: valid format (contains @ and domain) | Field 19 |
| 6 | Pincode: exactly 6 digits | Field 16 |
| 7 | IFSC: exactly 11 chars (4 alpha + 0 + 6 alphanumeric) | Field 22 |
| 8 | Address Line 1 must NOT start with client name | Field 11 |
| 9 | Address Lines 1, 2, 3 must all be distinct | Fields 11-13 |
| 10 | Nominee percentages must total exactly 100 | Nominee fields |
| 11 | Client Code: max 10 alphanumeric, no special characters | Field 2 |
| 12 | Income Range: 01-06 only | Field 20 |
| 13 | State Code: valid 2-letter Indian state code | Field 15 |
| 14 | Client Category: valid code from 01-46 table | Field 9 |
| 15 | Gender: M, F, or T only (mandatory for individuals) | Field 8 |

---

## 21. Timeline & SLA

### 21.1 UCC Registration to PTT

| Operation | SLA | Notes |
|-----------|-----|-------|
| New UCC to PTT | **T+1** (next trading day) | UCCs compliant by 22:00 hrs on T are PTT on T+1 |
| Emergency PTT Processing | **Same day (T)** if submitted by 14:30 hrs | Exigency provision; PTT effective by next session |
| API-based registration | Near real-time registration; PTT by T+1 | Registration is instant; PTT batch runs overnight |
| Batch upload processing | Overnight (T+1 morning) | Files uploaded by EOD on T processed overnight |

### 21.2 Modification Timelines

| Operation | SLA | Notes |
|-----------|-----|-------|
| Non-financial modification (API) | Near real-time | Address, mobile, email, bank, demat changes |
| Non-financial modification (batch) | T+1 | Processed in overnight batch |
| Segment activation | T+1 | Subject to eligibility verification |
| Status change (Active -> Inactive) | Immediate (API) / T+1 (batch) | |
| Status change (Inactive -> Active) | T+2 working days | Re-verification of 6 KYC attributes required |
| PAN re-verification | Real-time to T+1 | Depends on ITD system availability |

### 21.3 PAN Verification SLA

| Scenario | SLA |
|----------|-----|
| Normal processing | Real-time (seconds) to T+1 |
| ITD system busy/down | May take up to 2-3 working days |
| After client corrects at ITD | 2-7 working days for ITD records to update |

### 21.4 Exchange Operating Hours (for SLA context)

| Window | Time (IST) | Relevance |
|--------|-----------|-----------|
| Pre-open session | 09:00 - 09:15 | |
| Normal trading | 09:15 - 15:30 | |
| Post-close | 15:40 - 16:00 | |
| UCI Online / API | Available 24x7 | UCC operations can be submitted anytime |
| Batch processing cutoff | ~22:00 | Files submitted after this processed next day |
| Emergency PTT cutoff | 14:30 | For same-day PTT processing |

---

## 22. Recent Circulars (2024-2025-2026)

| Date | Circular/Reference | Subject | Impact |
|------|-------------------|---------|--------|
| Jan 25, 2024 | NSE/ISC/60418 | Introduction of REST API for UCC registration | New automated channel; API-based real-time UCC operations |
| Apr 30, 2024 | NSE/ISC/61817 | UCC Master Circular - revised field structure | Current governing circular for all UCC operations; pipe-delimited format updated |
| May 30, 2024 | NSE/ISC/62244 | PAN-Aadhaar seeding no longer required for PTT | Removes PAN-Aadhaar linkage as PTT parameter; aligns with ITD rules |
| Jul 15, 2024 | NSE Notice | Revised batch file format effective date | 183-field structure deadline; old format discontinued |
| Aug 2024 | NSE Notice | Old UCC format fully discontinued | Only revised format accepted |
| Oct 2024 | NSE Notice | 150-field structure goes live (interim) | Intermediate structure before 183-field expansion |
| Jan 2025 | SEBI Mandate | Up to 10 nominees for trading + demat | Nominees expanded from 3 to 10; video verification for opt-out |
| Feb 1, 2025 | SEBI/NSE | UPI Block Mechanism mandatory for QSBs | ASBA-like mechanism for secondary market (Qualified Stock Brokers) |
| May 2025 | NSE/BSE | 183-field UCC structure (SaveUCC_V2 equivalent) | Harmonized structure across exchanges; nominees 4-10 supported |
| Jun 2025 | SEBI/HO/MIRSD/MIRSD-PoD/P/CIR/2025/90 | Stock Brokers Master Circular | Consolidated regulation for all broker operations |
| Jul 2025 | SEBI | CP code requirement removed for NRIs | Simplifies NRI onboarding |
| Dec 2025 | SEBI | NRI KYC relaxation for re-KYC process | Eases periodic KYC renewal for NRIs |
| Jan 7, 2026 | SEBI | Stock Brokers Regulations 2026 notified | Replaces 1992 regulations entirely; new compliance framework |

---

## 23. Edge Cases & Future Considerations

### 23.1 Current Edge Cases

| Edge Case | Handling |
|-----------|---------|
| `PAN_EXEMPT` clients | Use keyword `PAN_EXEMPT` in PAN field; PAN verification bypassed; limited trading capabilities; SEBI may mandate PAN for all investors in future |
| Minor turning 18 | Must transition from category 02 to 01; guardian details removed; client must independently complete KYC; new PAN verification in own name |
| NRI converting to Resident | Status change from NRI category (21/24) to Individual (01); bank account change from NRE/NRO to regular savings; PIS permission no longer needed; fresh KYC as resident |
| Resident converting to NRI | Reverse of above; must obtain PIS permission from AD bank; change bank to NRE/NRO; FATCA/CRS reporting changes |
| Closed UCC reuse | Client code of a closed UCC CANNOT be reassigned to a new client; a completely new client code must be generated |
| Contingency mode | UCC not validated during exchange-declared contingency; trades placed must be reconciled post-contingency |
| Duplicate PAN across brokers | Same PAN can have UCCs at multiple brokers (legitimate); duplicate PAN at SAME broker is rejected |
| PAN change (rare) | If ITD issues new PAN (merger/correction), old UCC must be closed and new UCC created with new PAN |
| Hindu Undivided Family dissolution | HUF UCC closed; individual members register as category 01 |
| Death of account holder | UCC must be closed after legal formalities; nominee claims processed; securities transferred |

### 23.2 Non-Individual Expansion

SEBI has been progressively enhancing non-individual client onboarding:
- LLP (Limited Liability Partnership) may get dedicated category code
- Foreign Portfolio Investors (FPI) onboarding streamlining ongoing
- AI/ML-based entity verification being explored by regulators

### 23.3 Upcoming Regulatory Changes

| Area | Expected Change | Timeline |
|------|----------------|----------|
| Digital-first onboarding | Fully paperless KYC with video verification may become default | 2026 |
| Account Aggregator | Income verification via AA may replace manual income proof | 2026-2027 |
| e-KYC Setu | NPCI's Aadhaar e-KYC without Aadhaar number may become standard | 2026 |
| UPI Block Mechanism | Extension from QSBs to all brokers | 2026 |
| Consolidated Account Statement | Cross-exchange, cross-depository unified view | 2026-2027 |
| Real-time KYC updates | KRA/CKYC/Exchange real-time synchronization | Future |

### 23.4 NRI Simplification Roadmap

SEBI has been progressively simplifying NRI requirements:
- CP code removed (Jul 2025)
- Re-KYC relaxation (Dec 2025)
- Expected: further simplification of PIS requirement and documentation for NRI onboarding

---

## 24. Key Reference Documents & Contacts

### 24.1 NSE Circulars & Documents

| Document | Reference | Access |
|----------|-----------|--------|
| UCC Master Circular | NSE/ISC/61817 (Apr 30, 2024) | NSE Circular Archive |
| UCC API Introduction | NSE/ISC/60418 (Jan 25, 2024) | NSE Circular Archive |
| PAN-Aadhaar PTT Change | NSE/ISC/62244 (May 30, 2024) | NSE Circular Archive |
| API Specification | Available via Member Portal > UCI Online > Help > Manuals | Member Portal (login required) |
| Batch File Format Spec | Available via Member Portal > UCI Online > Help > Manuals | Member Portal (login required) |
| UAT Environment Details | Provided on API access approval | Member Portal |
| NSE Circular Archive | https://www.nseindia.com/regulations/exchanges-circulars | Public |

### 24.2 SEBI References

| Document | Reference |
|----------|-----------|
| KYC Master Circular | SEBI/HO/MIRSD/MIRSD-SEC-2/P/CIR/2023/168 (Oct 2023) |
| Stock Brokers Master Circular | SEBI/HO/MIRSD/MIRSD-PoD/P/CIR/2025/90 (Jun 2025) |
| Stock Brokers Regulations 2026 | Notified Jan 7, 2026 |
| UCC-Demat Mapping | SEBI/HO/MIRSD/DOP/CIR/P/2019/136 |
| F&O Eligibility Enhancement | SEBI/HO/MRD/TPD-1/P/CIR/2025/33 |
| Nomination Framework | SEBI (multiple circulars, consolidated in master circular) |

### 24.3 NSE Contacts

| Function | Contact | Details |
|----------|---------|---------|
| UCI Team (UCC support) | uci@nse.co.in | Primary contact for all UCC/UCI Online issues |
| NSE Toll Free | **1800 266 0050** (Option 5 for UCI) | For telephonic support |
| Member Services | memberservices@nse.co.in | General member queries |
| Technology Support | techsupport@nse.co.in | Connectivity, API, technical issues |
| Compliance | compliance@nse.co.in | Regulatory compliance queries |
| NSE Website | https://www.nseindia.com | Public information |
| NSE Member Portal (ENIT) | https://enit.nseindia.com | Member login (credentials required) |

### 24.4 Related Internal Documents

| Document | Path | Description |
|----------|------|-------------|
| Vendor Integrations | `/vendors/` | Master vendor integration spec (Section V12) |
| Master Dataset | `/reference/master-dataset` | Complete field-level data specification |
| KYC Flow | `/journey/` | 9-screen user journey, maker-checker workflow |
| BSE.md | `./BSE.md` | BSE UCC integration specification (to be created) |
| MCX.md | `./MCX.md` | MCX UCC integration specification (to be created) |

---

## Appendix A: Comparison with BSE UCC Integration

Key differences between NSE and BSE UCC systems for implementation planning:

| Aspect | NSE | BSE |
|--------|-----|-----|
| Portal | UCI Online (via Member Portal) | https://ucc.bseindia.com |
| API Type | REST API (JSON) | SOAP API (XML) - SaveUCC / SaveUCC_V2 |
| API Introduction | Jan 2024 (NSE/ISC/60418) | Long-standing SOAP service |
| Batch Max Records | **10,000** per file | **30,000** per file |
| Segment Activation Max | 10,000 per file | 50,000 per file |
| Batch Format | Pipe-delimited TXT | Pipe-delimited TXT |
| Field Count (Current) | **183** (May 2025, harmonized) | **183** (May 2025, SaveUCC_V2) |
| Commodity Segment | NSE COM (since 2018) | No commodity on BSE |
| SLBM Segment | Available | Available |
| Client Categories | 01-46 (identical) | 01-46 (identical) |
| Occupation Codes | 01-08 (identical) | 01-08 (identical) |
| Income Range Codes | 01-06 (identical) | 01-06 (identical) |
| PAN Verification | 3-parameter (identical) | 3-parameter (identical) |
| PAN Status Codes | A / I / P (identical) | A / I / P (identical) |
| PTT Terminology | PTT / NPTT | PTT / NPTT |
| Clearing Corp | NCL (NSE Clearing Limited) | ICCL (Indian Clearing Corporation Limited) |
| Settlement | T+1 (equity cash) | T+1 (equity cash) |
| Closed Status | Irreversible (same) | Irreversible (same) |
| Nominees | Up to 10 (SEBI mandate) | Up to 10 (SEBI mandate) |

**Implementation Note**: Due to the harmonized 183-field structure (May 2025), the data model for UCC records is now identical across NSE and BSE. The primary difference is the transport mechanism (REST vs SOAP) and operational limits (batch sizes). A single internal data model can serve both exchanges, with exchange-specific adapters for API/batch generation.

---

## Appendix B: Implementation Checklist

### Pre-Integration

- [ ] Obtain NSE Trading Membership (or verify existing membership)
- [ ] Register for UCI Online portal access
- [ ] Request API access via UCI Online > Help section
- [ ] Receive UAT credentials from NSE
- [ ] Download API specification and batch format documents
- [ ] Set up UAT environment
- [ ] Register server IPs for production whitelisting

### Development

- [ ] Implement API authentication flow (token-based)
- [ ] Implement Create UCC endpoint (individual + non-individual)
- [ ] Implement Modify UCC endpoint
- [ ] Implement Status Change endpoint
- [ ] Implement PAN Verification lookup
- [ ] Implement Segment Activation endpoint
- [ ] Implement batch file generation (183-field pipe-delimited)
- [ ] Implement batch upload and status polling
- [ ] Implement error handling for all error codes
- [ ] Implement nominee management (up to 10)
- [ ] Implement UCC-Demat mapping
- [ ] Build rejection report parser
- [ ] Build 6 KYC attribute compliance checker

### Testing (UAT)

- [ ] Test: New Individual UCC creation
- [ ] Test: New Non-Individual UCC creation (with directors)
- [ ] Test: UCC Modification (all field types)
- [ ] Test: Status transitions (Active -> Inactive -> Active)
- [ ] Test: Closure (verify irreversibility)
- [ ] Test: PAN verification (A, I, P scenarios)
- [ ] Test: Segment activation/deactivation
- [ ] Test: Nominee addition (1-10 nominees)
- [ ] Test: Batch upload (10K records)
- [ ] Test: Error handling (all error codes)
- [ ] Test: Duplicate UCC detection
- [ ] Test: PAN_EXEMPT handling
- [ ] Test: Minor client with guardian
- [ ] Test: NRI client
- [ ] Submit test results to NSE for certification

### Production

- [ ] Receive production credentials
- [ ] Configure production IP whitelisting
- [ ] Deploy to production
- [ ] Verify first live UCC registration
- [ ] Set up monitoring and alerting
- [ ] Set up daily PAN verification status reconciliation
- [ ] Set up 6 KYC attribute compliance monitoring
- [ ] Document runbook for common rejection handling

---

*This document is a companion to [Vendor Integrations](/vendors/) Section V12 and should be read alongside [Master Dataset](/reference/master-dataset) for field-level data mapping. Client category codes, occupation codes, income range codes, and PAN verification rules are identical to BSE as they are SEBI-mandated standards.*

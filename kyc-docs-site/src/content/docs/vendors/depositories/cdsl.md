---
title: CDSL BO Integration
description: CDSL Beneficiary Owner (BO) account opening — CDAS system, fixed-length positional file format, and DDPI.
---


## Table of Contents

1. [Overview](#1-overview)
2. [CDAS (Central Depository Accounting System)](#2-cdas-central-depository-accounting-system)
3. [BO Account Opening - API Method](#3-bo-account-opening---api-method)
4. [BO Account Opening - File Upload Method](#4-bo-account-opening---file-upload-method)
5. [BO ID Format](#5-bo-id-format)
6. [DDPI (Demat Debit and Pledge Instruction)](#6-ddpi-demat-debit-and-pledge-instruction)
7. [eDIS (Electronic Delivery Instruction Slip)](#7-edis-electronic-delivery-instruction-slip)
8. [easi / easiest](#8-easi--easiest)
9. [Non-Individual Entities](#9-non-individual-entities)
10. [Nomination](#10-nomination)
11. [KYC Linkage](#11-kyc-linkage)
12. [Transaction APIs](#12-transaction-apis)
13. [Modification & Closure](#13-modification--closure)
14. [Status Codes](#14-status-codes)
15. [Reconciliation & Reports](#15-reconciliation--reports)
16. [UCC-Demat Mapping](#16-ucc-demat-mapping)
17. [Security & Compliance](#17-security--compliance)
18. [Charges](#18-charges)
19. [Timeline & SLA](#19-timeline--sla)
20. [Recent Circulars (2024-2026)](#20-recent-circulars-2024-2026)
21. [Edge Cases](#21-edge-cases)
22. [Future Considerations](#22-future-considerations)

---

## 1. Overview

### 1.1 What is CDSL

CDSL (Central Depository Services Limited) is one of two central depositories in India, regulated by SEBI under the **Depositories Act, 1996** and the **SEBI (Depositories and Participants) Regulations, 2018**. CDSL facilitates holding securities in electronic (dematerialized) form and enables settlement of trades executed on stock exchanges.

- **Established**: 1999 (promoted by BSE)
- **Regulator**: SEBI
- **Governing Law**: Depositories Act, 1996
- **BO Accounts**: 12+ crore (as of 2025)
- **Active DPs**: 590+
- **Market Share**: ~75% of new demat accounts (as of 2025)
- **Registered Office**: Mumbai, Maharashtra

### 1.2 Depository Participant (DP) Model

CDSL operates through a **DP (Depository Participant) model**. A stock broker acting as a DP is the intermediary between the investor and the depository.

```
Investor (BO) <---> DP (Broker) <---> CDSL <---> Clearing Corporation <---> Exchange
```

**Our role**: We act as a DP of CDSL. This means:
- We are registered with CDSL as a Depository Participant
- We are assigned a unique **8-digit DP ID** by CDSL
- We open and maintain Beneficiary Owner (BO) accounts for our clients
- We submit all instructions (demat, transfer, pledge, etc.) on behalf of clients
- We are responsible for KYC compliance at the depository level
- We pay CDSL annual fees and per-transaction charges

**DP Registration Requirements**:
- SEBI registration as Stock Broker or Clearing Member
- Net worth as prescribed by SEBI (minimum Rs. 50 lakhs for broker-DP)
- Adequate infrastructure (CDAS connectivity, trained staff)
- Compliance officer appointment mandatory

### 1.3 CDSL Ventures Limited (CVL)

CVL is a wholly-owned subsidiary of CDSL that operates:
- **CVL KRA**: KYC Registration Agency (one of 5 SEBI-registered KRAs)
- **CVL MF Services**: Mutual fund servicing
- **CVL Academic**: Certification programs

**Integration note**: CVL KRA is a separate integration (see V4 in Vendor Integrations). This document covers only the depository (CDSL) integration. However, we use CVL KRA status as a prerequisite for BO account opening.

---

## 2. CDAS (Central Depository Accounting System)

### 2.1 System Overview

CDAS is CDSL's core technology platform through which all depository operations are processed.

| Attribute | Details |
|-----------|---------|
| System Name | CDAS - Central Depository Accounting System |
| Type | Web-based application + API layer |
| Access | Browser (Internet Explorer/Edge for legacy, Chrome for newer modules) |
| URL | https://cdas.cdslindia.com (production) |
| Connectivity | Leased line / VPN / Internet with certificate-based auth |
| Uptime SLA | 99.5% during market hours (9:00 AM - 5:00 PM IST, Mon-Fri) |
| Maintenance Window | Saturday 6:00 PM - Sunday 6:00 AM (typically) |

### 2.2 CDAS Modules

| Module | Purpose | Access Method |
|--------|---------|---------------|
| BO Account Management | Open, modify, close BO accounts | Web + API |
| Transaction Module | Demat, remat, transfer, pledge | Web + API + File upload |
| Corporate Action Module | Dividend, bonus, split, rights | Web (read-only for DP) |
| eDIS Module | Electronic delivery instruction slip | API |
| DDPI Module | DDPI registration and management | Web + API |
| Reporting Module | Holdings, transactions, reconciliation | Web + File download |
| Billing Module | View charges, generate invoices | Web |
| Admin Module | User management, IP config | Web |

### 2.3 DP Connectivity to CDAS

**Connection Methods** (in order of preference):

| Method | Latency | Cost | Recommended For |
|--------|---------|------|-----------------|
| CDSL API (REST over HTTPS) | Low (~200ms) | Per-transaction | Primary: automated operations |
| CDAS Web Portal | Medium | Included in annual fee | Secondary: manual operations, reporting |
| File Upload (SFTP/Web) | High (batch) | Per-file | Bulk operations (>100 accounts/day) |

**API Base URL**: `https://api.cdslindia.com/v1/` (production)
**Sandbox URL**: `https://sandbox-api.cdslindia.com/v1/` (UAT)

**Connectivity Prerequisites**:
1. DP registered with CDSL and assigned DP ID
2. Digital certificate issued by CDSL-approved CA (typically NIC or eMudhra)
3. Static IP addresses registered with CDSL for whitelisting
4. User IDs created in CDAS admin module (role-based: Maker, Checker, Admin)
5. VPN tunnel established (for leased-line DPs) or HTTPS with mTLS (for API)

---

## 3. BO Account Opening - API Method

**This is our PRIMARY method for account opening.**

### 3.1 Endpoint

```
POST /v1/bo/setup
Content-Type: application/json
Authorization: Bearer {dp_auth_token}
X-DP-ID: {8_digit_dp_id}
X-Certificate-Thumbprint: {cert_thumbprint}
```

### 3.2 Authentication

| Component | Details |
|-----------|---------|
| Method | Certificate-based mTLS + Bearer token |
| Certificate | X.509 issued by CDSL-approved CA, installed on server |
| Token | JWT obtained via `/v1/auth/token` endpoint, valid 8 hours |
| IP Whitelisting | Only registered static IPs can call API |
| Rate Limit | 100 requests/minute per DP (BO setup), 500 requests/minute (queries) |

**Token Request**:
```
POST /v1/auth/token
{
  "dp_id": "12345678",
  "certificate_serial": "ABCD1234...",
  "timestamp": "2026-02-13T10:00:00+05:30"
}
```

### 3.3 Request Fields

#### 3.3a: Account Holder Details

| # | Field | Type | Size | Mandatory | Validation | Notes |
|---|-------|------|------|-----------|------------|-------|
| 1 | `account_type` | String | 2 | **Y** | `IN`=Individual, `JO`=Joint, `CO`=Corporate, `HU`=HUF, `TR`=Trust, `PA`=Partnership, `MN`=Minor | Primary account classification |
| 2 | `holder_first_name` | String | 50 | **Y** | Alpha + space only | As per PAN card |
| 3 | `holder_middle_name` | String | 50 | N | Alpha + space | |
| 4 | `holder_last_name` | String | 50 | **Y** | Alpha + space only | |
| 5 | `holder_full_name` | String | 150 | **Y** | Concatenation of first+middle+last | Must match PAN/KRA name exactly |
| 6 | `pan` | String | 10 | **Y** | `[A-Z]{5}[0-9]{4}[A-Z]` | Validated against NSDL/Protean DB |
| 7 | `dob` | String | 10 | **Y** | `DD/MM/YYYY` | Must match PAN DOB |
| 8 | `gender` | String | 1 | **Y** | `M`=Male, `F`=Female, `T`=Transgender | |
| 9 | `father_husband_name` | String | 100 | **Y** | As per KYC documents | |
| 10 | `mother_name` | String | 100 | N | | |
| 11 | `marital_status` | String | 1 | N | `M`=Married, `S`=Single, `W`=Widowed, `D`=Divorced | |
| 12 | `nationality` | String | 2 | **Y** | ISO 3166-1 alpha-2; `IN` for Indian | |
| 13 | `residential_status` | String | 2 | **Y** | `RI`=Resident Indian, `NR`=NRI, `FN`=Foreign National | |
| 14 | `occupation_code` | String | 2 | **Y** | CDSL occupation code table (01-15) | See Section 3.3g |
| 15 | `annual_income_range` | String | 2 | **Y** | `01`=<1L, `02`=1-5L, `03`=5-10L, `04`=10-25L, `05`=25L-1Cr, `06`=>1Cr | |
| 16 | `mobile_number` | String | 10 | **Y** | Indian 10-digit mobile | Must match KRA-registered mobile |
| 17 | `email` | String | 100 | **Y** | Valid email format | Must match KRA-registered email |
| 18 | `aadhaar_number` | String | 12 | Cond. | 12-digit Verhoeff check | Masked storage; last 4 digits only stored at CDSL |
| 19 | `ckyc_number` | String | 14 | Cond. | 14-digit CKYC ID (KIN) | If available from CKYC registry |
| 20 | `kra_status` | String | 2 | **Y** | `KR`=Registered, `KV`=Validated | Must be KR or KV to proceed |
| 21 | `politically_exposed` | String | 1 | **Y** | `Y`/`N` | PEP flag |
| 22 | `related_to_pep` | String | 1 | **Y** | `Y`/`N` | Related to PEP flag |
| 23 | `tax_status` | String | 2 | **Y** | `01`=Individual, `02`=NRI, `03`=HUF, etc. | CDSL tax status code table |

#### 3.3b: Correspondence Address

| # | Field | Type | Size | Mandatory | Validation | Notes |
|---|-------|------|------|-----------|------------|-------|
| 24 | `corr_address_line1` | String | 80 | **Y** | Alphanumeric + special chars | Flat/House/Building |
| 25 | `corr_address_line2` | String | 80 | N | | Street/Road/Locality |
| 26 | `corr_address_line3` | String | 80 | N | | Area/Landmark |
| 27 | `corr_city` | String | 50 | **Y** | | City/Town/Village |
| 28 | `corr_state` | String | 30 | **Y** | CDSL state code table | |
| 29 | `corr_pincode` | String | 6 | **Y** | 6-digit Indian PIN | |
| 30 | `corr_country` | String | 2 | **Y** | ISO 3166-1 alpha-2 | Default: `IN` |
| 31 | `corr_phone` | String | 15 | N | With STD code | Landline if any |

#### 3.3c: Permanent Address

| # | Field | Type | Size | Mandatory | Validation | Notes |
|---|-------|------|------|-----------|------------|-------|
| 32 | `perm_same_as_corr` | String | 1 | **Y** | `Y`/`N` | If Y, copy correspondence address |
| 33 | `perm_address_line1` | String | 80 | Cond. | Required if perm_same_as_corr = N | |
| 34 | `perm_address_line2` | String | 80 | N | | |
| 35 | `perm_address_line3` | String | 80 | N | | |
| 36 | `perm_city` | String | 50 | Cond. | | |
| 37 | `perm_state` | String | 30 | Cond. | CDSL state code table | |
| 38 | `perm_pincode` | String | 6 | Cond. | 6-digit Indian PIN | |
| 39 | `perm_country` | String | 2 | Cond. | ISO 3166-1 alpha-2 | |

#### 3.3d: Bank Details

| # | Field | Type | Size | Mandatory | Validation | Notes |
|---|-------|------|------|-----------|------------|-------|
| 40 | `bank_account_number` | String | 20 | **Y** | Alphanumeric | Primary bank account |
| 41 | `bank_ifsc` | String | 11 | **Y** | `[A-Z]{4}0[A-Z0-9]{6}` | RBI IFSC directory validated |
| 42 | `bank_micr` | String | 9 | Cond. | 9-digit numeric | Required if MICR available |
| 43 | `bank_name` | String | 100 | **Y** | Auto-derived from IFSC | |
| 44 | `bank_branch` | String | 100 | N | Auto-derived from IFSC | |
| 45 | `bank_account_type` | String | 2 | **Y** | `SB`=Savings, `CA`=Current, `NR`=NRE, `NO`=NRO | |
| 46 | `bank_verified` | String | 1 | **Y** | `Y` only | Must be penny-drop verified before submission |

**Additional Bank Accounts** (up to 5 total):

| # | Field | Type | Size | Mandatory | Notes |
|---|-------|------|------|-----------|-------|
| 47-51 | `bank2_account_number` through `bank5_account_number` | String | 20 | N | Additional bank accounts |
| 52-56 | `bank2_ifsc` through `bank5_ifsc` | String | 11 | Cond. | Required if additional bank provided |
| 57-61 | `bank2_account_type` through `bank5_account_type` | String | 2 | Cond. | Required if additional bank provided |

#### 3.3e: Nomination Details

| # | Field | Type | Size | Mandatory | Validation | Notes |
|---|-------|------|------|-----------|------------|-------|
| 62 | `nomination_opted` | String | 1 | **Y** | `Y`/`N` | |
| 63 | `nomination_opt_out_reason` | String | 2 | Cond. | Required if opted=N; needs video verification | `01`=Do not wish, `02`=Will submit later |
| 64 | `num_nominees` | Number | 2 | Cond. | 1-10 | Required if opted=Y |

**Per Nominee (repeat up to 10)**:

| # | Field | Type | Size | Mandatory | Validation | Notes |
|---|-------|------|------|-----------|------------|-------|
| 65 | `nominee_N_name` | String | 100 | **Y** | Full legal name | N = 1 to 10 |
| 66 | `nominee_N_relationship` | String | 2 | **Y** | Relationship code table | SP=Spouse, CH=Child, PA=Parent, SI=Sibling, OT=Other |
| 67 | `nominee_N_applicable_percent` | Decimal | 6,2 | **Y** | 0.01 - 100.00 | All nominees must sum to 100.00 |
| 68 | `nominee_N_dob` | String | 10 | **Y** | DD/MM/YYYY | |
| 69 | `nominee_N_pan` | String | 10 | N | Valid PAN format | Optional but recommended |
| 70 | `nominee_N_address_line1` | String | 80 | **Y** | | |
| 71 | `nominee_N_city` | String | 50 | **Y** | | |
| 72 | `nominee_N_state` | String | 30 | **Y** | | |
| 73 | `nominee_N_pincode` | String | 6 | **Y** | | |
| 74 | `nominee_N_is_minor` | String | 1 | **Y** | `Y`/`N` | Derived: DOB < 18 years from today |
| 75 | `nominee_N_guardian_name` | String | 100 | Cond. | Required if minor=Y | |
| 76 | `nominee_N_guardian_pan` | String | 10 | Cond. | Required if minor=Y | |
| 77 | `nominee_N_guardian_relationship` | String | 2 | Cond. | Required if minor=Y | |
| 78 | `nominee_N_guardian_address` | String | 255 | Cond. | Required if minor=Y | |

#### 3.3f: Standing Instructions

| # | Field | Type | Size | Mandatory | Validation | Notes |
|---|-------|------|------|-----------|------------|-------|
| 79 | `si_auto_credit` | String | 1 | **Y** | `Y`/`N` | Auto-credit securities from IPO/corporate actions |
| 80 | `si_auto_pledge` | String | 1 | N | `Y`/`N` | Default: `N` |
| 81 | `si_auto_delivery` | String | 1 | N | `Y`/`N` | Default: `N`; only if DDPI |
| 82 | `si_sms_alert` | String | 1 | **Y** | `Y` | Mandatory for all accounts |
| 83 | `si_email_alert` | String | 1 | **Y** | `Y` | Mandatory for all accounts |
| 84 | `si_ras_frequency` | String | 2 | **Y** | `Q1`=Quarterly, `M1`=Monthly | Running Account Settlement frequency |

#### 3.3g: Additional Details

| # | Field | Type | Size | Mandatory | Validation | Notes |
|---|-------|------|------|-----------|------------|-------|
| 85 | `bsda_flag` | String | 1 | N | `Y`/`N` | Basic Services Demat Account (for small investors) |
| 86 | `fatca_country` | String | 2 | Cond. | ISO country code | Required if US/foreign tax obligations |
| 87 | `fatca_tax_id` | String | 20 | Cond. | Foreign TIN | Required if fatca_country is not IN |
| 88 | `crs_country_of_birth` | String | 2 | **Y** | ISO country code | |
| 89 | `crs_country_of_citizenship` | String | 2 | **Y** | ISO country code | |
| 90 | `gross_annual_income` | String | 15 | N | Numeric | Actual income (optional; range is mandatory) |

**Occupation Code Table**:

| Code | Occupation |
|------|-----------|
| 01 | Private Sector Service |
| 02 | Public Sector / Government Service |
| 03 | Business / Self-Employed |
| 04 | Professional (Doctor, Lawyer, CA, etc.) |
| 05 | Agriculturist |
| 06 | Retired |
| 07 | Housewife / Homemaker |
| 08 | Student |
| 09 | Forex Dealer |
| 10 | Government Service |
| 11 | Public Sector |
| 12 | Private Sector |
| 13 | Not Categorized |
| 14 | Others |
| 15 | Not Applicable |

#### 3.3h: Document Details

| # | Field | Type | Size | Mandatory | Validation | Notes |
|---|-------|------|------|-----------|------------|-------|
| 91 | `poi_type` | String | 2 | **Y** | `PA`=PAN, `PP`=Passport, `DL`=DrivingLicense, `VI`=VoterID | Proof of Identity type |
| 92 | `poi_number` | String | 20 | **Y** | Document number | |
| 93 | `poa_type` | String | 2 | **Y** | `AA`=Aadhaar, `PP`=Passport, `UT`=Utility, `BA`=BankStatement | Proof of Address type |
| 94 | `poa_number` | String | 20 | **Y** | Document number | |
| 95 | `ipv_done` | String | 1 | **Y** | `Y` | In-Person Verification / Video IPV completed |
| 96 | `ipv_date` | String | 10 | **Y** | DD/MM/YYYY | Date of IPV |
| 97 | `ipv_mode` | String | 2 | **Y** | `VP`=Video, `IP`=In-person | SEBI VIPV or physical |
| 98 | `photo_attached` | String | 1 | **Y** | `Y` | Client photograph uploaded |

### 3.4 Response

**Success Response** (HTTP 200):
```json
{
  "status": "SUCCESS",
  "bo_id": "1234567800001234",
  "dp_id": "12345678",
  "client_id": "00001234",
  "account_status": "ACTIVE",
  "opening_date": "13/02/2026",
  "message": "BO account created successfully",
  "reference_id": "CDSL-REF-20260213-001234"
}
```

**Error Response** (HTTP 400/422):
```json
{
  "status": "FAILED",
  "error_code": "BO_ERR_045",
  "error_message": "PAN verification failed - name mismatch",
  "field": "holder_full_name",
  "reference_id": "CDSL-REF-20260213-001235"
}
```

**Common Error Codes**:

| Error Code | Description | Resolution |
|------------|-------------|------------|
| BO_ERR_001 | Invalid DP ID | Verify DP ID in request header |
| BO_ERR_010 | Duplicate PAN - account already exists | Check if BO already exists for this PAN under our DP |
| BO_ERR_020 | KRA status not valid | Ensure KRA status is Registered or Validated |
| BO_ERR_030 | Mandatory field missing | Check field indicated in `field` attribute |
| BO_ERR_040 | PAN format invalid | Verify PAN format: `[A-Z]{5}[0-9]{4}[A-Z]` |
| BO_ERR_045 | PAN name mismatch | Name must match PAN database exactly |
| BO_ERR_050 | Bank account verification pending | Penny-drop must be completed first |
| BO_ERR_060 | Nominee percentage does not sum to 100 | Adjust nominee percentages |
| BO_ERR_070 | Minor nominee without guardian | Provide guardian details |
| BO_ERR_080 | Invalid state code | Use CDSL state code table |
| BO_ERR_090 | FATCA details incomplete | Provide tax residency details |
| BO_ERR_100 | Certificate authentication failed | Renew/re-register certificate |
| BO_ERR_110 | IP not whitelisted | Register IP with CDSL admin |
| BO_ERR_120 | Rate limit exceeded | Retry after 60 seconds |

### 3.5 Timeline

- **API submission to BO ID generation**: 1-2 hours (typically under 30 minutes during market hours)
- **Best case**: 5-10 minutes (during low-load periods)
- **Worst case**: 4 hours (end-of-day peak, system maintenance)

---

## 4. BO Account Opening - File Upload Method

### 4.1 Overview

The file upload method uses a **fixed-length positional file format** where each BO account record spans exactly **7 lines**. This method is used for bulk account opening (>100 accounts/day) or as a fallback when API is unavailable.

**File Naming Convention**: `BO_SETUP_{DPID}_{YYYYMMDD}_{SEQ}.txt`
Example: `BO_SETUP_12345678_20260213_001.txt`

**Upload Method**: SFTP or CDAS Web Portal upload
**Processing**: Next working day batch (cutoff: 5:00 PM IST)
**Max Records Per File**: 10,000

### 4.2 File Structure - 7 Lines Per Record

#### Line 01: Account Holder Basic Details

| Position | Length | Field | Format | Mandatory | Notes |
|----------|--------|-------|--------|-----------|-------|
| 1-2 | 2 | Record Type | `01` | **Y** | Always "01" for Line 1 |
| 3-10 | 8 | DP ID | Numeric | **Y** | 8-digit DP ID, zero-padded |
| 11-12 | 2 | Account Type | Alpha | **Y** | IN/JO/CO/HU/TR/PA/MN |
| 13-62 | 50 | First Name | Alpha | **Y** | Left-aligned, space-padded |
| 63-112 | 50 | Middle Name | Alpha | N | Left-aligned, space-padded |
| 113-162 | 50 | Last Name | Alpha | **Y** | Left-aligned, space-padded |
| 163-172 | 10 | PAN | Alphanumeric | **Y** | |
| 173-182 | 10 | DOB | DD/MM/YYYY | **Y** | |
| 183-183 | 1 | Gender | Alpha | **Y** | M/F/T |
| 184-283 | 100 | Father/Husband Name | Alpha | **Y** | Left-aligned, space-padded |
| 284-285 | 2 | Nationality | Alpha | **Y** | ISO 3166-1 alpha-2 |
| 286-287 | 2 | Occupation Code | Numeric | **Y** | 01-15 |
| 288-289 | 2 | Residential Status | Alpha | **Y** | RI/NR/FN |
| 290-299 | 10 | Mobile Number | Numeric | **Y** | 10-digit |
| 300-399 | 100 | Email | Alphanumeric | **Y** | Left-aligned, space-padded |

**Total Line 01 Length**: 399 characters

#### Line 02: Address Details

| Position | Length | Field | Format | Mandatory | Notes |
|----------|--------|-------|--------|-----------|-------|
| 1-2 | 2 | Record Type | `02` | **Y** | Always "02" |
| 3-10 | 8 | DP ID | Numeric | **Y** | Must match Line 01 |
| 11-90 | 80 | Corr Address Line 1 | Alphanumeric | **Y** | |
| 91-170 | 80 | Corr Address Line 2 | Alpha | N | |
| 171-250 | 80 | Corr Address Line 3 | Alpha | N | |
| 251-300 | 50 | Corr City | Alpha | **Y** | |
| 301-330 | 30 | Corr State | Alpha | **Y** | CDSL state code |
| 331-336 | 6 | Corr Pincode | Numeric | **Y** | |
| 337-338 | 2 | Corr Country | Alpha | **Y** | |
| 339-339 | 1 | Perm Same As Corr | Alpha | **Y** | Y/N |
| 340-419 | 80 | Perm Address Line 1 | Alphanumeric | Cond. | Required if field 339 = N |
| 420-499 | 80 | Perm Address Line 2 | Alpha | N | |
| 500-579 | 80 | Perm Address Line 3 | Alpha | N | |
| 580-629 | 50 | Perm City | Alpha | Cond. | |
| 630-659 | 30 | Perm State | Alpha | Cond. | |
| 660-665 | 6 | Perm Pincode | Numeric | Cond. | |
| 666-667 | 2 | Perm Country | Alpha | Cond. | |

**Total Line 02 Length**: 667 characters

#### Line 03: Bank Details

| Position | Length | Field | Format | Mandatory | Notes |
|----------|--------|-------|--------|-----------|-------|
| 1-2 | 2 | Record Type | `03` | **Y** | Always "03" |
| 3-10 | 8 | DP ID | Numeric | **Y** | |
| 11-12 | 2 | Number of Banks | Numeric | **Y** | 1-5 |

**Per Bank (up to 5, each block = 144 chars)**:

| Offset | Length | Field | Format | Notes |
|--------|--------|-------|--------|-------|
| +0 | 20 | Account Number | Alphanumeric | Left-padded with zeros |
| +20 | 11 | IFSC | Alphanumeric | |
| +31 | 9 | MICR | Numeric | 000000000 if not available |
| +40 | 100 | Bank Name | Alpha | |
| +140 | 2 | Account Type | Alpha | SB/CA/NR/NO |
| +142 | 1 | Primary | Alpha | Y for first bank, N for others |
| +143 | 1 | Verified | Alpha | Y (must be penny-drop verified) |

**Bank block positions**: Bank 1 at 13-156, Bank 2 at 157-300, Bank 3 at 301-444, Bank 4 at 445-588, Bank 5 at 589-732

**Total Line 03 Length**: 732 characters (max, with 5 banks)

#### Line 04: Nomination Details

| Position | Length | Field | Format | Mandatory | Notes |
|----------|--------|-------|--------|-----------|-------|
| 1-2 | 2 | Record Type | `04` | **Y** | Always "04" |
| 3-10 | 8 | DP ID | Numeric | **Y** | |
| 11-11 | 1 | Nomination Opted | Alpha | **Y** | Y/N |
| 12-13 | 2 | Number of Nominees | Numeric | Cond. | 01-10, required if opted=Y |

**Per Nominee (up to 10, each block = 310 chars)**:

| Offset | Length | Field | Format | Notes |
|--------|--------|-------|--------|-------|
| +0 | 100 | Nominee Name | Alpha | Full legal name |
| +100 | 2 | Relationship | Alpha | SP/CH/PA/SI/OT |
| +102 | 6 | Percentage | Numeric | Format: 099.99 (5+decimal) |
| +108 | 80 | Address | Alphanumeric | Full address |
| +188 | 50 | City | Alpha | |
| +238 | 30 | State | Alpha | |
| +268 | 6 | Pincode | Numeric | |
| +274 | 10 | DOB | DD/MM/YYYY | |
| +284 | 10 | PAN | Alphanumeric | Blank if not available |
| +294 | 1 | Is Minor | Alpha | Y/N |
| +295 | 100 | Guardian Name | Alpha | Required if minor=Y |
| +395 | 10 | Guardian PAN | Alphanumeric | Required if minor=Y |
| +405 | 2 | Guardian Relationship | Alpha | Required if minor=Y |

**Total Line 04 Length**: variable (13 + num_nominees * 407 chars)

#### Line 05: Standing Instructions

| Position | Length | Field | Format | Mandatory | Notes |
|----------|--------|-------|--------|-----------|-------|
| 1-2 | 2 | Record Type | `05` | **Y** | Always "05" |
| 3-10 | 8 | DP ID | Numeric | **Y** | |
| 11-11 | 1 | Auto Credit | Alpha | **Y** | Y/N |
| 12-12 | 1 | Auto Pledge | Alpha | N | Y/N; default N |
| 13-13 | 1 | Auto Delivery | Alpha | N | Y/N; default N |
| 14-14 | 1 | SMS Alert | Alpha | **Y** | Must be Y |
| 15-15 | 1 | Email Alert | Alpha | **Y** | Must be Y |
| 16-17 | 2 | RAS Frequency | Alpha | **Y** | Q1/M1 |

**Total Line 05 Length**: 17 characters

#### Line 06: Additional Details

| Position | Length | Field | Format | Mandatory | Notes |
|----------|--------|-------|--------|-----------|-------|
| 1-2 | 2 | Record Type | `06` | **Y** | Always "06" |
| 3-10 | 8 | DP ID | Numeric | **Y** | |
| 11-12 | 2 | Income Range | Numeric | **Y** | 01-06 (same as API) |
| 13-13 | 1 | Politically Exposed | Alpha | **Y** | Y/N |
| 14-14 | 1 | Related to PEP | Alpha | **Y** | Y/N |
| 15-16 | 2 | Tax Status | Numeric | **Y** | CDSL tax status code |
| 17-17 | 1 | BSDA Flag | Alpha | N | Y/N |
| 18-19 | 2 | FATCA Country | Alpha | Cond. | ISO country if foreign tax |
| 20-39 | 20 | FATCA Tax ID | Alphanumeric | Cond. | Foreign TIN |
| 40-41 | 2 | Country of Birth | Alpha | **Y** | ISO country code |
| 42-43 | 2 | Country of Citizenship | Alpha | **Y** | ISO country code |
| 44-57 | 14 | CKYC Number | Numeric | N | If available |

**Total Line 06 Length**: 57 characters

#### Line 07: Document Details

| Position | Length | Field | Format | Mandatory | Notes |
|----------|--------|-------|--------|-----------|-------|
| 1-2 | 2 | Record Type | `07` | **Y** | Always "07" |
| 3-10 | 8 | DP ID | Numeric | **Y** | |
| 11-12 | 2 | POI Type | Alpha | **Y** | PA/PP/DL/VI |
| 13-32 | 20 | POI Number | Alphanumeric | **Y** | |
| 33-34 | 2 | POA Type | Alpha | **Y** | AA/PP/UT/BA |
| 35-54 | 20 | POA Number | Alphanumeric | **Y** | |
| 55-55 | 1 | IPV Done | Alpha | **Y** | Must be Y |
| 56-65 | 10 | IPV Date | DD/MM/YYYY | **Y** | |
| 66-67 | 2 | IPV Mode | Alpha | **Y** | VP/IP |
| 68-68 | 1 | Photo Attached | Alpha | **Y** | Must be Y |

**Total Line 07 Length**: 68 characters

### 4.3 File Upload Response

CDSL returns a response file within 24 hours:

**Response File Name**: `BO_SETUP_RESP_{DPID}_{YYYYMMDD}_{SEQ}.txt`

| Position | Length | Field | Notes |
|----------|--------|-------|-------|
| 1-10 | 10 | PAN | Client PAN from request |
| 11-26 | 16 | BO ID | Assigned BO ID (blank if rejected) |
| 27-27 | 1 | Status | `S`=Success, `R`=Rejected |
| 28-127 | 100 | Remarks | Error description if rejected |

### 4.4 Padding Rules

- **Alpha fields**: Left-aligned, right-padded with spaces
- **Numeric fields**: Right-aligned, left-padded with zeros
- **Date fields**: Always DD/MM/YYYY, no padding
- **Empty optional fields**: Filled with spaces to maintain positional alignment
- **Line terminator**: CRLF (`\r\n`) after each line
- **File encoding**: ASCII / ISO 8859-1 (no Unicode)

---

## 5. BO ID Format

### 5.1 Structure

```
BO ID (16 digits) = DP ID (8 digits) + Client ID (8 digits)

Example:
  DP ID:     12345678       (assigned by CDSL to the DP at registration)
  Client ID: 00001234       (sequential, assigned by CDSL per DP)
  BO ID:     1234567800001234
```

### 5.2 Rules

| Rule | Details |
|------|---------|
| Total Length | Exactly 16 digits, all numeric |
| DP ID | First 8 digits; fixed for a given DP; assigned by CDSL |
| Client ID | Last 8 digits; sequential within the DP; starts from 00000001 |
| Uniqueness | Globally unique across all DPs in CDSL |
| Permanence | Once assigned, never reused even after account closure |
| Display | Often shown as `DP ID - Client ID` with hyphen (e.g., `12345678-00001234`) |

### 5.3 CDSL vs NSDL BO ID Comparison

| Attribute | CDSL | NSDL |
|-----------|------|------|
| Total Length | 16 digits | 16 characters |
| Format | Pure numeric | `IN` + 14 alphanumeric |
| DP Portion | First 8 digits | Characters 3-8 (6 chars) |
| Client Portion | Last 8 digits | Characters 9-16 (8 chars) |
| Example | `1234567800001234` | `IN30012345678901` |
| Prefix | None | Always starts with "IN" |

### 5.4 Storage in Our System

Per Master Dataset Section H:

| Field | Value | Notes |
|-------|-------|-------|
| `depository` (H01) | `CDSL` | Fixed for our primary depository |
| `dp_id` (H03) | `{our_8_digit_dp_id}` | Our DP ID |
| `client_id` (H04) | `{8_digit_client_id}` | From CDSL response |
| `bo_id` (H05) | `{dp_id}{client_id}` | Concatenation; 16 digits |
| `account_type` (H06) | `IN` / `JO` / `MN` etc. | Account classification |
| `account_status` (H07) | `AC` / `FR` / `CL` | Current status |

---

## 6. DDPI (Demat Debit and Pledge Instruction)

### 6.1 Regulatory Background

| Attribute | Details |
|-----------|---------|
| SEBI Circular | SEBI/HO/MIRSD/DoP/P/CIR/2022/44 (Nov 18, 2022) |
| Effective Date | November 18, 2022 |
| Replaces | Power of Attorney (POA) |
| Nature | One-time authorization from BO to DP |
| Mandatory | **No** - DDPI is optional; broker cannot deny services if client declines |

### 6.2 DDPI Scope

DDPI authorizes the DP (broker) to perform the following without per-trade TPIN+OTP:

| Authorization | Code | Description |
|---------------|------|-------------|
| Settlement of trades | `SE` | Transfer securities to clearing corporation for settlement |
| Margin pledging | `PL` | Pledge/re-pledge securities for margin requirements |
| Mutual fund redemption | `MF` | Transfer MF units for redemption/switch |
| Tendering shares | `TN` | Tender shares in buybacks/open offers/delisting |

**What DDPI does NOT cover**:
- Off-market transfers (always require separate DIS/eDIS)
- Inter-depository transfers (CDSL to NSDL or vice versa)
- Gift transfers
- Any transfer to a third-party account

### 6.3 DDPI Registration Flow

```
1. Client opts in for DDPI during account opening (or later)
         |
2. Broker collects DDPI form (physical or digital)
   Fields: BO ID, DP ID, holder name, authorization scope, date, signature
         |
3. Broker submits DDPI to CDSL via CDAS
   Endpoint: POST /v1/ddpi/register
   {
     "bo_id": "1234567800001234",
     "dp_id": "12345678",
     "holder_name": "RAKESH KUMAR",
     "authorization_date": "13/02/2026",
     "scope": ["SE", "PL", "MF", "TN"],
     "signature_mode": "DIGITAL",   // or "PHYSICAL"
     "esign_reference": "ESIGN-REF-123"  // if digital
   }
         |
4. CDSL processes DDPI registration
         |
5. DDPI activated within 24 hours
   Status: ACTIVE
         |
6. CDSL sends confirmation to client (SMS + email)
```

### 6.4 DDPI API

**Register DDPI**:
```
POST /v1/ddpi/register
```

**Check DDPI Status**:
```
GET /v1/ddpi/status?bo_id={bo_id}

Response:
{
  "bo_id": "1234567800001234",
  "ddpi_status": "ACTIVE",
  "scope": ["SE", "PL", "MF", "TN"],
  "registration_date": "13/02/2026",
  "activation_date": "14/02/2026"
}
```

**Revoke DDPI** (client-initiated only):
```
POST /v1/ddpi/revoke
{
  "bo_id": "1234567800001234",
  "revocation_reason": "CLIENT_REQUEST",
  "effective_date": "15/02/2026"
}
```

### 6.5 DDPI Status Values

| Status | Description |
|--------|-------------|
| `NOT_REGISTERED` | DDPI not submitted for this BO |
| `PENDING` | DDPI submitted, awaiting CDSL processing |
| `ACTIVE` | DDPI registered and active |
| `REVOKED` | DDPI revoked by client |
| `SUSPENDED` | DDPI suspended (regulatory/compliance reason) |

### 6.6 Impact on Operations

| Scenario | With DDPI | Without DDPI |
|----------|-----------|--------------|
| Sell trade settlement | Automatic debit | Requires eDIS (TPIN+OTP) per trade |
| Margin pledging | Automatic pledge | Requires eDIS per pledge |
| MF redemption | Automatic | Requires eDIS per redemption |
| Buyback/OFS tendering | Automatic | Requires eDIS per tender |
| Off-market transfer | eDIS required (always) | eDIS required (always) |

---

## 7. eDIS (Electronic Delivery Instruction Slip)

### 7.1 Overview

eDIS is the per-transaction authorization mechanism. It is used:
- When DDPI is **not** set up (all debit transactions require eDIS)
- When DDPI **is** set up but transaction is outside DDPI scope (e.g., off-market transfer)
- As a fallback when DDPI is temporarily suspended

### 7.2 eDIS Flow

```
Step 1: Broker initiates transaction
        Broker system calls CDSL eDIS API with transaction details
                |
Step 2: CDSL generates eDIS authorization page
        Returns URL for client redirection
                |
Step 3: Client redirected to CDSL eDIS page
        Displays: ISIN, quantity, execution date, DP ID, BO ID
                |
Step 4: Client enters TPIN
        6-digit PIN set by client via CDSL easi portal
                |
Step 5: OTP verification
        CDSL sends OTP to registered mobile + email
        Client enters OTP on CDSL page
                |
Step 6: eDIS authorized
        CDSL returns success callback to broker
        Transaction can proceed
                |
Step 7: Settlement
        Securities debited from BO account on settlement date
```

### 7.3 TPIN

| Attribute | Details |
|-----------|---------|
| Length | 6 digits |
| Set By | Client, via CDSL easi/easiest portal |
| Reset | Client-initiated via easi portal or CDSL helpdesk |
| Default | Not pre-set; client must create before first eDIS use |
| Expiry | No expiry; valid until changed by client |
| Attempts | 3 wrong attempts locks TPIN; reset via easi |
| Our Responsibility | Guide client to set TPIN; we cannot set it for them |

### 7.4 eDIS API Endpoints

**Generate eDIS**:
```
POST /v1/edis/generate
{
  "bo_id": "1234567800001234",
  "dp_id": "12345678",
  "transactions": [
    {
      "isin": "INE009A01021",
      "quantity": 100,
      "execution_date": "13/02/2026",
      "settlement_id": "2026021300001",
      "transaction_type": "SELL"
    }
  ],
  "callback_url": "https://our-broker.com/edis/callback",
  "redirect_url": "https://our-broker.com/edis/complete"
}

Response:
{
  "edis_request_id": "EDIS-20260213-001234",
  "cdsl_redirect_url": "https://edis.cdslindia.com/auth?req=EDIS-20260213-001234",
  "expiry": "2026-02-13T23:59:59+05:30",
  "status": "PENDING_AUTH"
}
```

**Check eDIS Status**:
```
GET /v1/edis/status?request_id={edis_request_id}

Response:
{
  "edis_request_id": "EDIS-20260213-001234",
  "status": "AUTHORIZED",   // PENDING_AUTH / AUTHORIZED / REJECTED / EXPIRED / REVOKED
  "authorized_at": "2026-02-13T10:15:30+05:30",
  "transactions": [
    {
      "isin": "INE009A01021",
      "quantity": 100,
      "status": "AUTHORIZED"
    }
  ]
}
```

**Revoke eDIS** (before execution):
```
POST /v1/edis/revoke
{
  "edis_request_id": "EDIS-20260213-001234",
  "revocation_reason": "CLIENT_REQUEST"
}
```

### 7.5 eDIS Status Values

| Status | Description |
|--------|-------------|
| `PENDING_AUTH` | eDIS generated, awaiting client TPIN+OTP |
| `AUTHORIZED` | Client has authorized; transaction can proceed |
| `REJECTED` | Client rejected or wrong TPIN/OTP |
| `EXPIRED` | Authorization window expired (end of day) |
| `REVOKED` | Revoked by client before execution |
| `EXECUTED` | Securities debited as per authorization |

### 7.6 eDIS Callback

CDSL sends a POST callback to `callback_url` after client completes or rejects:

```json
{
  "edis_request_id": "EDIS-20260213-001234",
  "status": "AUTHORIZED",
  "bo_id": "1234567800001234",
  "timestamp": "2026-02-13T10:15:30+05:30",
  "signature": "SHA256_HMAC_SIGNATURE"
}
```

**Signature verification**: HMAC-SHA256 of `edis_request_id|status|bo_id|timestamp` using shared secret key provided by CDSL during DP onboarding.

---

## 8. easi / easiest

### 8.1 easi (Electronic Access to Securities Information)

| Attribute | Details |
|-----------|---------|
| Purpose | Basic online view access for investors (BOs) |
| URL | https://easi.cdslindia.com |
| Login | BO ID + password (set by client) |

**Features for Investors**:
- View current holdings (ISIN-wise)
- View transaction history
- View corporate action entitlements
- Download Consolidated Account Statement (CAS)
- Set/reset TPIN for eDIS
- View pledge/unpledge status
- View nomination details

### 8.2 easiest (Enhanced Active Securities Information Electronic System for Trading)

| Attribute | Details |
|-----------|---------|
| Purpose | Enhanced transactional access for investors |
| URL | https://easiest.cdslindia.com |
| Login | BO ID + password + OTP (2FA mandatory) |

**Additional Features over easi**:
- Submit Delivery Instructions (DIS) online
- Create/modify/revoke pledges
- Freeze/unfreeze accounts (partial or full)
- Submit inter-depository transfer requests
- Update bank details, nomination, address
- Submit DDPI online

### 8.3 myEasi Mobile App

- Available on Android and iOS
- Biometric login (fingerprint/face)
- View holdings, transactions, CAS
- eDIS authorization via app
- Push notifications for corporate actions

### 8.4 DP Integration with easi/easiest

As a DP, we can:
- Provide deep links for clients to access easi/easiest
- Pre-populate BO ID in login redirects
- Receive status callbacks when clients perform actions via easiest (e.g., DDPI submission)
- Access easi/easiest admin module to view client portfolios (with authorization)

**API for Holdings Query** (DP-side):
```
GET /v1/holdings?bo_id={bo_id}&as_of_date={DD/MM/YYYY}

Response:
{
  "bo_id": "1234567800001234",
  "as_of_date": "13/02/2026",
  "holdings": [
    {
      "isin": "INE009A01021",
      "company_name": "INFOSYS LIMITED",
      "quantity": 500,
      "free_balance": 400,
      "pledged_balance": 100,
      "lock_in_balance": 0
    }
  ]
}
```

---

## 9. Non-Individual Entities

### 9.1 Corporate Accounts

| Requirement | Details |
|-------------|---------|
| Account Type | `CO` |
| CIN | 21-character Corporate Identification Number (mandatory) |
| PAN | Corporate PAN (starts with `A` in 4th character) |
| Board Resolution | Upload required: authorizing demat account opening and naming authorized signatories |
| Authorized Signatories | List of individuals authorized to operate the account; each needs PAN, DIN (if director), address |
| MOA/AOA | Memorandum and Articles of Association (copy to be maintained) |
| Directors List | Full list of directors with DIN, PAN, addresses |
| Beneficial Ownership | Declaration of beneficial owners holding > 10% (SEBI mandate since 2024) |
| Operating Instructions | Who can sign: singly, jointly, any two directors, etc. |

**Additional API Fields for Corporate**:

| Field | Type | Size | Mandatory | Notes |
|-------|------|------|-----------|-------|
| `cin` | String | 21 | **Y** | MCA CIN |
| `company_type` | String | 2 | **Y** | PV=Private, PU=Public, OPC=One Person, SE=Section 8 |
| `date_of_incorporation` | String | 10 | **Y** | DD/MM/YYYY |
| `authorized_signatory_count` | Number | 2 | **Y** | 1-10 |
| `signatory_N_name` | String | 100 | **Y** | Per signatory |
| `signatory_N_pan` | String | 10 | **Y** | Per signatory |
| `signatory_N_din` | String | 8 | Cond. | If signatory is director |
| `signatory_N_designation` | String | 50 | **Y** | Director/CEO/CFO/Company Secretary/Authorized Person |
| `operating_instruction` | String | 2 | **Y** | SI=Singly, JO=Jointly, EO=Either or |

### 9.2 HUF Accounts

| Requirement | Details |
|-------------|---------|
| Account Type | `HU` |
| PAN | HUF PAN (separate from Karta's individual PAN) |
| Karta | Primary holder; operates the account |
| Coparceners | Not mandatory in demat account; only Karta details required |
| HUF Declaration | Declaration from Karta confirming HUF status |
| Karta's PAN | Required in addition to HUF PAN |

**Additional API Fields for HUF**:

| Field | Type | Size | Mandatory | Notes |
|-------|------|------|-----------|-------|
| `huf_pan` | String | 10 | **Y** | HUF PAN |
| `karta_name` | String | 100 | **Y** | |
| `karta_pan` | String | 10 | **Y** | Karta's individual PAN |
| `karta_dob` | String | 10 | **Y** | DD/MM/YYYY |
| `huf_formation_date` | String | 10 | N | DD/MM/YYYY |

### 9.3 Partnership Firm Accounts

| Requirement | Details |
|-------------|---------|
| Account Type | `PA` |
| PAN | Partnership PAN |
| Partnership Deed | Copy required for records |
| Authorized Partners | List of partners authorized to operate demat account |
| Registration Certificate | If registered under Partnership Act |

**Additional API Fields for Partnership**:

| Field | Type | Size | Mandatory | Notes |
|-------|------|------|-----------|-------|
| `partnership_pan` | String | 10 | **Y** | Firm PAN |
| `partnership_registration_no` | String | 20 | Cond. | If registered |
| `authorized_partner_count` | Number | 2 | **Y** | |
| `partner_N_name` | String | 100 | **Y** | Per partner |
| `partner_N_pan` | String | 10 | **Y** | Per partner |

### 9.4 NRI Accounts

| Requirement | Details |
|-------------|---------|
| Account Type Suffix | Account sub-type indicates NRI status |
| Account Sub-Types | NRE (Non-Resident External), NRO (Non-Resident Ordinary), SNRE (Special NRE), SNRO (Special NRO) |
| PAN | Indian PAN mandatory for NRIs |
| PIS Permission | Portfolio Investment Scheme permission from designated bank (RBI mandate) |
| FEMA Compliance | Investments subject to FEMA limits; FDI sectoral caps apply |
| Bank Account Type | Must match: NRE demat → NRE bank account, NRO demat → NRO bank account |
| Repatriation | NRE = fully repatriable; NRO = restricted repatriation (up to USD 1M/year) |
| RBI Reporting | Broker must report NRI holdings to RBI via designated bank |

**Additional API Fields for NRI**:

| Field | Type | Size | Mandatory | Notes |
|-------|------|------|-----------|-------|
| `nri_account_type` | String | 4 | **Y** | NRE/NRO/SNRE/SNRO |
| `country_of_residence` | String | 2 | **Y** | ISO country code |
| `overseas_address_line1` | String | 80 | **Y** | Address in country of residence |
| `overseas_address_city` | String | 50 | **Y** | |
| `overseas_address_country` | String | 2 | **Y** | |
| `pis_bank_name` | String | 100 | **Y** | Designated AD bank for PIS |
| `pis_permission_number` | String | 30 | **Y** | RBI PIS permission reference |
| `pis_permission_date` | String | 10 | **Y** | DD/MM/YYYY |
| `passport_number` | String | 20 | **Y** | Valid passport |
| `passport_expiry` | String | 10 | **Y** | DD/MM/YYYY |

### 9.5 Trust Accounts

| Requirement | Details |
|-------------|---------|
| Account Type | `TR` |
| Trust Deed | Copy required |
| Registration | Trust registration number under Indian Trusts Act / Societies Act |
| Trustees | Details of all trustees; at least one authorized to operate |
| Beneficiary Info | Not mandatory in demat; maintained at trust level |

**Additional API Fields for Trust**:

| Field | Type | Size | Mandatory | Notes |
|-------|------|------|-----------|-------|
| `trust_pan` | String | 10 | **Y** | Trust PAN |
| `trust_registration_number` | String | 30 | **Y** | |
| `trust_type` | String | 2 | **Y** | PR=Private, PU=Public, CH=Charitable |
| `trustee_count` | Number | 2 | **Y** | |
| `trustee_N_name` | String | 100 | **Y** | Per trustee |
| `trustee_N_pan` | String | 10 | **Y** | Per trustee |

### 9.6 LLP Accounts

| Requirement | Details |
|-------------|---------|
| Account Type | `LP` (or treated as `PA` variant) |
| LLPIN | LLP Identification Number from MCA |
| Designated Partners | At least 2, with DPIN (Designated Partner Identification Number) |
| LLP Agreement | Copy required |

**Additional API Fields for LLP**:

| Field | Type | Size | Mandatory | Notes |
|-------|------|------|-----------|-------|
| `llpin` | String | 7 | **Y** | MCA LLPIN (AAB-1234 format) |
| `designated_partner_count` | Number | 2 | **Y** | Minimum 2 |
| `partner_N_name` | String | 100 | **Y** | |
| `partner_N_dpin` | String | 8 | **Y** | Designated Partner ID Number |
| `partner_N_pan` | String | 10 | **Y** | |

### 9.7 Minor Accounts

| Requirement | Details |
|-------------|---------|
| Account Type | `MN` |
| Guardian | Mandatory; natural guardian (parent) or court-appointed guardian |
| Guardian PAN | Mandatory |
| Minor's PAN | Required if available (PAN is mandatory for minors aged 15+) |
| Minor's DOB | Mandatory; determines automatic conversion trigger |
| Automatic Conversion | At age 18, account must be converted to individual (IN) type |
| Trading | Minors cannot trade in F&O; equity delivery only |
| Nomination | Not applicable for minor accounts (guardian is the de-facto representative) |

**Additional API Fields for Minor**:

| Field | Type | Size | Mandatory | Notes |
|-------|------|------|-----------|-------|
| `minor_dob` | String | 10 | **Y** | DD/MM/YYYY |
| `minor_pan` | String | 10 | Cond. | Required if 15+ years old |
| `guardian_name` | String | 100 | **Y** | |
| `guardian_pan` | String | 10 | **Y** | |
| `guardian_relationship` | String | 2 | **Y** | FA=Father, MO=Mother, LG=Legal Guardian |
| `guardianship_proof` | String | 2 | Cond. | `BC`=Birth Certificate, `CO`=Court Order |

---

## 10. Nomination

### 10.1 Regulatory Framework

| Circular | Details |
|----------|---------|
| SEBI/HO/MIRSD/POD-1/P/CIR/2023/193 | Up to 10 nominees allowed (effective Jan 2025) |
| SEBI circular Jun 10, 2024 | Simplified nomination: 3 mandatory fields (name, percentage, relationship) |
| Deadline | March 1, 2025 for existing accounts to opt-in or opt-out |

### 10.2 Nomination Rules

| Rule | Details |
|------|---------|
| Maximum Nominees | 10 |
| Minimum Nominees | 1 (if nomination opted) |
| Percentage Allocation | Must sum to exactly 100.00% |
| Minor Nominee | Guardian details mandatory |
| Opt-Out | Allowed, but requires video verification + signed declaration |
| Change After Opening | Client can add/modify/remove nominees via easi/easiest or through DP |
| Joint Accounts | Nomination can be made for joint accounts; requires consent of all holders |

### 10.3 Mandatory Fields Per Nominee (Post Jun 2024 Simplification)

| Field | Mandatory | Notes |
|-------|-----------|-------|
| Nominee Name | **Y** | Full legal name |
| Relationship | **Y** | Relationship code |
| Percentage | **Y** | 0.01 to 100.00 |
| DOB | **Y** | To determine minor status |
| Address | **Y** | Full address |
| PAN | N | Optional (previously recommended) |
| Mobile | N | Optional |
| Email | N | Optional |

### 10.4 Opt-Out Process

```
1. Client indicates "I do not wish to nominate" on the application
          |
2. Video verification initiated (HyperVerge/Digio VIPV)
   Client records: "I, [name], BO ID [number], voluntarily opt out of nomination"
          |
3. Declaration form generated (physical or e-signed)
          |
4. DP submits opt-out to CDSL via API or CDAS
   POST /v1/nomination/opt-out
   {
     "bo_id": "1234567800001234",
     "declaration_date": "13/02/2026",
     "video_reference": "VIPV-REF-12345",
     "esign_reference": "ESIGN-REF-12345"
   }
          |
5. CDSL records opt-out status
          |
6. Client can opt-in later at any time
```

### 10.5 Transmission of Securities (Upon Nominee Claim)

When the BO passes away:
1. Nominee(s) submit claim to DP with death certificate
2. DP verifies nominee identity and percentage allocation
3. Securities transferred to nominee's demat account(s) per percentage allocation
4. No probate/succession certificate required if valid nomination exists
5. If no nomination and no will: legal heir determination per Indian Succession Act

---

## 11. KYC Linkage

### 11.1 KRA Status Prerequisite

Before opening a BO account, the client's KRA status must be one of:

| KRA Status | BO Opening Allowed | Notes |
|------------|-------------------|-------|
| KYC Registered | **Yes** | Minimum requirement |
| KYC Validated | **Yes** | Higher tier (post exchange validation) |
| Under Process | **No** | Wait for KRA to process |
| On Hold | **No** | KRA has queries; resolve first |
| Rejected | **No** | Re-submit KYC to KRA |
| Not Found | **No** | Submit fresh KYC to KRA |

**Our Flow**: KRA pipeline and CDSL pipeline run in parallel after checker approval (see KYC Flow Section 8). However, if KRA status is not yet Registered at the time of CDSL API submission, the CDSL API will reject with `BO_ERR_020`.

**Mitigation**: Our batch pipeline checks KRA status before submitting to CDSL. If KRA is still under process, CDSL submission is deferred and retried (see retry logic in KYC Flow Section 9).

### 11.2 CKYC Number in BO Record

| Attribute | Details |
|-----------|---------|
| Field | `ckyc_number` in BO record |
| Length | 14 digits (KIN - KYC Identification Number) |
| Source | CKYC registry (CERSAI) |
| Mandatory | Not mandatory for BO opening, but must be updated once available |
| Update | Via BO modification API after CKYC upload is processed |

### 11.3 Six KYC Attributes Consistency

SEBI mandates that the following 6 attributes must match across KRA, Exchange (NSE/BSE), and Depository (CDSL):

| # | Attribute | Notes |
|---|-----------|-------|
| 1 | Name | Exact match (as per PAN) |
| 2 | PAN | Primary identifier; must be identical |
| 3 | Address | Correspondence address; reasonable match |
| 4 | Mobile Number | 10-digit; must match KRA-registered mobile |
| 5 | Email | Must match KRA-registered email |
| 6 | Income Range | Range code must match (01-06) |

**Mismatch Handling**: If any attribute mismatches between KRA and CDSL, the BO account may be flagged for re-KYC. Our system should ensure all 6 attributes are synchronized before submission.

---

## 12. Transaction APIs

### 12.1 Available Transaction Types

| Transaction | API Endpoint | Method | Description |
|------------|--------------|--------|-------------|
| Dematerialization | `POST /v1/transaction/demat` | API + File | Convert physical certificates to electronic |
| Rematerialization | `POST /v1/transaction/remat` | API + File | Convert electronic to physical certificates |
| Off-Market Transfer | `POST /v1/transaction/offmarket` | API + File | Transfer within CDSL between two BOs |
| Inter-Depository Transfer | `POST /v1/transaction/inter-depository` | API + File | Transfer between CDSL and NSDL |
| Pledge | `POST /v1/transaction/pledge` | API | Create pledge on securities |
| Unpledge | `POST /v1/transaction/unpledge` | API | Release pledge |
| Invocation of Pledge | `POST /v1/transaction/invoke-pledge` | API | Pledgee invokes pledge (margin shortfall) |
| Freeze | `POST /v1/transaction/freeze` | API | Freeze securities (regulatory/client) |
| Unfreeze | `POST /v1/transaction/unfreeze` | API | Release freeze |
| Transmission | `POST /v1/transaction/transmission` | File + Manual | Transfer to legal heir/nominee on death |

### 12.2 Dematerialization

```
POST /v1/transaction/demat
{
  "bo_id": "1234567800001234",
  "isin": "INE009A01021",
  "company_name": "INFOSYS LIMITED",
  "quantity": 100,
  "certificate_numbers": ["CERT-001", "CERT-002"],
  "distinctive_numbers_from": "1001",
  "distinctive_numbers_to": "1100",
  "folio_number": "FOLIO-12345"
}
```

**Timeline**: 15-21 working days (involves RTA verification of physical certificates)

### 12.3 Off-Market Transfer

```
POST /v1/transaction/offmarket
{
  "transferor_bo_id": "1234567800001234",
  "transferee_bo_id": "1234567800005678",
  "isin": "INE009A01021",
  "quantity": 100,
  "consideration": "MARKET",    // MARKET / OFF_MARKET / GIFT
  "execution_date": "13/02/2026",
  "edis_reference": "EDIS-20260213-001234"  // if no DDPI
}
```

**Timeline**: Same day if submitted before 4:00 PM IST

### 12.4 Inter-Depository Transfer

```
POST /v1/transaction/inter-depository
{
  "source_bo_id": "1234567800001234",        // CDSL BO
  "target_bo_id": "IN30012345678901",        // NSDL BO
  "target_depository": "NSDL",
  "isin": "INE009A01021",
  "quantity": 100,
  "reason": "CLIENT_REQUEST"
}
```

**Timeline**: T+1 (next working day)

### 12.5 Pledge/Unpledge

```
POST /v1/transaction/pledge
{
  "pledgor_bo_id": "1234567800001234",
  "pledgee_bo_id": "1234567800009999",   // Clearing member BO
  "isin": "INE009A01021",
  "quantity": 100,
  "pledge_type": "MARGIN",    // MARGIN / LOAN / OTHER
  "reference_number": "PLEDGE-20260213-001"
}
```

**Timeline**: Real-time (if both BOs in CDSL); T+1 for inter-depository

---

## 13. Modification & Closure

### 13.1 BO Details Modification

**Endpoint**:
```
POST /v1/bo/modify
{
  "bo_id": "1234567800001234",
  "modifications": {
    "email": "new.email@example.com",
    "mobile_number": "9876543210",
    "corr_address_line1": "New Address Line 1",
    "corr_city": "Mumbai",
    "corr_state": "Maharashtra",
    "corr_pincode": "400001"
  },
  "supporting_documents": ["DOC-REF-123"],
  "modification_reason": "CLIENT_REQUEST"
}
```

### 13.2 Fields Requiring Re-KYC

The following modifications trigger a re-KYC requirement:

| Field | Re-KYC Required | KRA Update Required | Notes |
|-------|----------------|--------------------|----- -|
| Name | **Yes** | **Yes** | Name change requires legal documents (gazette, court order) |
| PAN | **Yes** | **Yes** | PAN change/merger per NSDL/Protean process |
| Address | **Yes** (if permanent) | **Yes** | Correspondence address: no re-KYC; permanent: yes |
| Mobile | No | **Yes** | KRA OTP re-validation triggered |
| Email | No | **Yes** | KRA email re-validation triggered |
| Bank Details | No | No | Penny-drop verification required for new bank |
| Income Range | No | **Yes** | If crossing slab boundary |
| Nomination | No | No | Via separate nomination API |
| FATCA Details | **Yes** | **Yes** | Tax residency change |
| Residential Status | **Yes** | **Yes** | RI to NR or vice versa triggers complete re-KYC |

### 13.3 Account Closure

**Prerequisites**:
1. Zero securities balance (all holdings must be transferred or sold)
2. No pending transactions (no open pledge, pending DIS, etc.)
3. No outstanding dues to DP
4. Client request in writing (physical form or e-signed)

**Closure Endpoint**:
```
POST /v1/bo/close
{
  "bo_id": "1234567800001234",
  "closure_reason": "CLIENT_REQUEST",   // CLIENT_REQUEST / DUPLICATE / REGULATORY
  "closure_date": "13/02/2026",
  "client_confirmation": "ESIGN-REF-789"
}
```

**Post-Closure**:
- BO ID is marked `CLOSED` and cannot be reactivated
- BO ID is never reused or reassigned
- Records retained for minimum 8 years (SEBI mandate) plus 2 years (Limitation Act)
- UCC-Demat mapping on exchanges must be updated (delink closed BO)

### 13.4 Dormancy

| Attribute | Details |
|-----------|---------|
| Definition | No transactions (debit or credit) for 12+ consecutive months |
| Automatic | CDSL auto-flags dormant accounts |
| Impact | No impact on holdings; securities remain safe |
| Trading | Dormant BO can still receive credits (dividends, bonus); debits may require reactivation |
| Reactivation | Client submits reactivation request to DP; DP updates via CDAS |
| Re-KYC | Required if dormant for 24+ months |

**Reactivation Endpoint**:
```
POST /v1/bo/reactivate
{
  "bo_id": "1234567800001234",
  "reactivation_date": "13/02/2026",
  "kyc_revalidation": "COMPLETED"  // or "NOT_REQUIRED" if <24 months
}
```

---

## 14. Status Codes

### 14.1 BO Account Status

| Status | Code | Description | Can Trade | Can Receive Credits |
|--------|------|-------------|-----------|-------------------|
| Active | `AC` | Normal operational state | **Yes** | **Yes** |
| Suspended | `SU` | Temporarily suspended | **No** | **Yes** (credits only) |
| Frozen | `FR` | Account frozen (all or partial) | **No** | Depends on freeze type |
| Closed | `CL` | Permanently closed | **No** | **No** |
| Dormant | `DO` | Inactive for 12+ months | Limited | **Yes** |
| Under Closure | `UC` | Closure in process | **No** | **No** |

### 14.2 Suspension Reasons

| Reason Code | Description | Initiated By | Resolution |
|-------------|-------------|-------------|------------|
| `KYC_NC` | KYC non-compliance | CDSL (auto) | Update KYC; re-validate with KRA |
| `REG_ORD` | Regulatory order (SEBI/Court) | SEBI/Court | Comply with order; file application |
| `DP_REQ` | DP-initiated suspension | DP | DP lifts suspension |
| `NOM_NC` | Nomination non-compliance (post Mar 2025 deadline) | CDSL (auto) | Submit nomination or opt-out |
| `FATCA_NC` | FATCA/CRS non-compliance | CDSL | Submit FATCA declaration |
| `PAN_INV` | PAN invalidated by NSDL/Protean | CDSL (auto) | Resolve PAN status with IT dept |

### 14.3 Freeze Types

| Type | Description | Impact |
|------|-------------|--------|
| Full Freeze | All securities frozen | No debit or credit |
| Partial Freeze | Specific ISINs frozen | Only frozen ISINs blocked |
| Debit Freeze | Only debits blocked | Can receive credits but cannot transfer out |
| Regulatory Freeze | Court/SEBI/ED ordered | Requires court order to unfreeze |

### 14.4 Impact on Trading

| BO Status | Equity Delivery | F&O | IPO | Corporate Actions | Pledge |
|-----------|----------------|-----|-----|-------------------|--------|
| Active | Allowed | Allowed | Allowed | Auto-credited | Allowed |
| Suspended | **Blocked** | **Blocked** | **Blocked** | Credited (held) | **Blocked** |
| Frozen (Full) | **Blocked** | **Blocked** | **Blocked** | **Blocked** | **Blocked** |
| Frozen (Debit) | Sell blocked; Buy credited | **Blocked** | Credits only | Credited | **Blocked** |
| Dormant | May need reactivation | Need reactivation | Credits OK | Auto-credited | Need reactivation |
| Closed | **N/A** | **N/A** | **N/A** | **N/A** | **N/A** |

---

## 15. Reconciliation & Reports

### 15.1 Daily Reports

| Report | Description | Format | Delivery Time |
|--------|-------------|--------|---------------|
| Client Master Report | All BO records under our DP ID | CSV/Pipe-delimited | 6:00 AM IST |
| Holdings Report | ISIN-wise holdings for all BOs | CSV | 7:00 AM IST (T+1 data) |
| Transaction Report | All transactions processed previous day | CSV | 7:00 AM IST |
| Corporate Action Report | Pending/processed corporate actions | CSV | 8:00 AM IST |
| eDIS Authorization Report | eDIS created/authorized/expired | CSV | 6:30 AM IST |
| Pledge/Unpledge Report | Pledge activities | CSV | 7:00 AM IST |
| DIS Report | Delivery Instructions settled | CSV | After market close |

### 15.2 Weekly/Monthly Reports

| Report | Frequency | Description |
|--------|-----------|-------------|
| DP Activity Summary | Weekly | Transaction volumes, new accounts, closures |
| Dormant Account Report | Monthly | List of accounts crossing 12-month dormancy |
| KYC Compliance Report | Monthly | Accounts with KYC deficiencies |
| FATCA Compliance Report | Monthly | Accounts requiring FATCA updates |
| Nomination Status Report | Monthly | Accounts without nomination/opt-out |
| Billing Statement | Monthly | Charges, fees, transaction costs |

### 15.3 Consolidated Account Statement (CAS)

SEBI mandates a single CAS covering holdings across CDSL + NSDL + mutual funds:
- Generated by CDSL/NSDL jointly (SEBI MDAC mandate)
- Sent to investors monthly (if transactions) or half-yearly (if no transactions)
- Our system receives CAS data for reconciliation

### 15.4 How to Download Reports from CDAS

**Method 1: CDAS Web Portal**
1. Login to CDAS with DP admin credentials
2. Navigate to Reports > Download Reports
3. Select report type, date range
4. Download in CSV/Excel format

**Method 2: SFTP**
1. CDSL pushes daily reports to assigned SFTP directory
2. Our batch job picks up files at 7:00 AM IST
3. Files are parsed and loaded into our back-office system

**Method 3: API**
```
GET /v1/reports/download?type={report_type}&date={YYYY-MM-DD}

Response: File download (CSV format)
```

### 15.5 Reconciliation Process

Our system must reconcile daily:

| Reconciliation | Source A | Source B | Frequency |
|---------------|----------|----------|-----------|
| Holdings | CDSL Holdings Report | Our back-office | Daily (T+1) |
| Transactions | CDSL Transaction Report | Our trade log | Daily |
| Client Master | CDSL Client Master | Our client DB | Daily |
| Bank Details | CDSL BO bank details | Our verified bank list | On change |
| Nominee Data | CDSL nominee records | Our nominee records | Weekly |
| Pledge Position | CDSL pledge report | Our margin system | Real-time |

**Break Resolution**: Any mismatch (break) must be investigated and resolved within T+1. Unresolved breaks >3 days must be escalated to compliance officer.

---

## 16. UCC-Demat Mapping

### 16.1 Regulatory Basis

| Circular | Details |
|----------|---------|
| Reference | SEBI/HO/MIRSD/DOP/CIR/P/2019/136 |
| Requirement | Every UCC (Unique Client Code) registered on an exchange must be linked to a valid demat account |
| Purpose | Ensure settlement chain integrity; every trade settles to a verified demat account |

### 16.2 Mapping Flow

```
1. Client onboarded: UCC created on NSE/BSE + BO created on CDSL
          |
2. UCC-Demat Mapping submitted
   Method A: Exchange portal (NSE UCI / BSE BOLT)
   Method B: API
          |
3. Exchange verifies:
   - UCC exists and is active
   - BO ID exists and is active in CDSL
   - PAN matches between UCC and BO
          |
4. Mapping activated
   Client can now trade (trades settle to this demat)
```

### 16.3 API for Mapping Verification

```
GET /v1/ucc-mapping/verify?bo_id={bo_id}&ucc={ucc_code}&exchange={NSE/BSE}

Response:
{
  "bo_id": "1234567800001234",
  "ucc": "ABC12345",
  "exchange": "NSE",
  "mapping_status": "ACTIVE",    // ACTIVE / INACTIVE / PENDING / DELINKED
  "pan_match": true,
  "last_verified": "2026-02-13"
}
```

### 16.4 Delinking Notifications

CDSL sends automatic delinking notifications when:
- BO account is closed or suspended
- BO PAN is changed or invalidated
- KYC status drops below Registered

**Webhook** (if configured):
```json
{
  "event": "UCC_DEMAT_DELINK",
  "bo_id": "1234567800001234",
  "ucc": "ABC12345",
  "exchange": "NSE",
  "reason": "BO_SUSPENDED",
  "timestamp": "2026-02-13T10:00:00+05:30"
}
```

**Action Required**: When we receive a delink notification, our system must:
1. Block trading for the affected UCC
2. Notify the client
3. Resolve the underlying issue (KYC, suspension, etc.)
4. Re-establish mapping once resolved

---

## 17. Security & Compliance

### 17.1 Authentication

| Layer | Details |
|-------|---------|
| Certificate | X.509 digital certificate issued by CDSL-approved CA |
| Certificate Validity | Typically 2 years; must renew before expiry |
| mTLS | Mutual TLS for all API calls |
| Bearer Token | JWT with 8-hour validity, obtained via cert-based auth |
| IP Whitelisting | Only pre-registered static IPs can access CDSL APIs |
| User Roles | Maker, Checker, Admin, Viewer (role-based access in CDAS) |

### 17.2 IP Whitelisting

| Requirement | Details |
|-------------|---------|
| Registration | Submit IP addresses to CDSL via CDAS admin module |
| Minimum | 2 IPs (primary + DR) |
| Maximum | 10 IPs per DP |
| Change Process | Submit request via CDAS; activated within 24 hours |
| NAT | NAT IPs are acceptable (CDSL sees public IP) |

### 17.3 Data Encryption

| Aspect | Requirement |
|--------|-------------|
| In Transit | TLS 1.2+ mandatory for all API communication |
| At Rest | AES-256 encryption for BO data stored in our system |
| PAN | Store encrypted; display masked (XXXX1234X) in UI |
| Aadhaar | Store only last 4 digits; never store full Aadhaar |
| Bank Account | Store encrypted; display masked in UI |
| TPIN | Never stored by DP; managed solely by CDSL |

### 17.4 Audit Trail

CDSL requires DPs to maintain audit trails for:

| Event | Retention Period | Details |
|-------|-----------------|---------|
| BO Account Opening | 10 years | All fields, documents, IPV record |
| BO Modification | 10 years | Before/after values, who modified, when |
| Transaction Instructions | 8 years | Full instruction details, authorization record |
| eDIS Authorizations | 8 years | Request, authorization, execution |
| DDPI Registration/Revocation | 10 years | Full lifecycle |
| Client Communications | 5 years | Emails, SMS, letters related to demat |
| Reconciliation Records | 5 years | Daily reconciliation output |

### 17.5 SEBI Compliance Requirements

| Regulation | Requirement |
|-----------|-------------|
| SEBI (Depositories and Participants) Regulations 2018 | Primary governing regulation for DPs |
| SEBI Circular on Cyber Security (Jul 2024) | Mandatory SOC-2 / ISO 27001 for DPs processing >1L accounts |
| SEBI Circular on Business Continuity (Dec 2023) | DR site mandatory; RTO < 4 hours, RPO < 1 hour |
| SEBI Circular on Investor Grievance (ongoing) | SCORES integration mandatory; resolve within 21 days |
| CDSL DP Operating Instructions | Detailed operational guidelines (updated periodically) |
| PMLA (Prevention of Money Laundering Act) | AML/CFT compliance for all demat transactions |

---

## 18. Charges

### 18.1 Charges to DP (Paid by Us to CDSL)

| Charge Type | Amount (Approximate) | Frequency |
|-------------|---------------------|-----------|
| DP Annual Fee | Rs. 5,000 - 25,000 | Annual |
| BO Account Opening | Rs. 5 - 10 per account | Per account |
| Transaction Charge (On-market) | Rs. 3.50 per instruction | Per instruction |
| Transaction Charge (Off-market) | Rs. 5 per instruction | Per instruction |
| Pledge Creation | Rs. 12 per instruction | Per instruction |
| Inter-Depository Transfer | Rs. 10 per instruction | Per instruction |
| Dematerialization | Rs. 5 per certificate | Per certificate |
| Rematerialization | Rs. 10 per certificate + postal | Per certificate |
| Account Closure | Nil | - |
| CAS Charges | Nil (SEBI subsidized) | - |

**Note**: Charges are subject to revision by CDSL. GST applicable at 18% on all charges.

### 18.2 Charges to Client (Set by DP/Broker)

| Charge Type | Typical Range | Notes |
|-------------|---------------|-------|
| Account Opening | Rs. 0 (free) | Most brokers offer free opening |
| Annual Maintenance Charge (AMC) | Rs. 0 - 300/year | Many discount brokers: Rs. 0 |
| Transaction (Sell) | Rs. 5 - 25 per scrip | Per scrip per day |
| Pledge/Unpledge | Rs. 0 - 30 | Per instruction |
| Off-Market Transfer | Rs. 25 - 50 | Per instruction |
| Physical Statement | Rs. 25 - 50 | Per statement (electronic is free) |
| Failed Transaction | Rs. 0 - 50 | DP discretion |

### 18.3 BSDA (Basic Services Demat Account)

For small investors, SEBI mandates free/low-cost demat accounts:

| Criterion | BSDA Eligibility |
|-----------|-----------------|
| Holdings Value | Up to Rs. 10 lakhs |
| No. of Demat Accounts | Only 1 demat across all DPs (CDSL + NSDL) |
| Individual Only | Only for individual BO (not HUF/Corporate/etc.) |
| AMC | Rs. 0 (up to Rs. 4 lakh holdings); Rs. 100 (Rs. 4-10 lakh) |
| Transaction Charges | Same as regular account |

---

## 19. Timeline & SLA

### 19.1 Key SLAs

| Operation | SLA | Best Case | Worst Case |
|-----------|-----|-----------|------------|
| BO Opening (API) | 1-2 hours | 5-10 minutes | 4 hours |
| BO Opening (File) | Next working day | Same day (if before cutoff) | T+2 (if Friday submission) |
| DDPI Activation | 24 hours | 4-6 hours | 48 hours |
| eDIS Authorization | Real-time | Instant (after TPIN+OTP) | N/A (client-dependent) |
| Off-Market Transfer | Same day | 30 minutes | End of day |
| Inter-Depository Transfer | T+1 | T+1 (no faster) | T+2 |
| Dematerialization | 15-21 working days | 10 working days | 30 working days |
| Rematerialization | 15-30 working days | 15 working days | 45 working days |
| Pledge Creation | Real-time | Instant | 30 minutes |
| Account Closure | 1-3 working days | Same day | 5 working days |
| Reactivation (Dormant) | 1-2 working days | Same day | 3 working days |
| BO Modification | 1-2 hours (API) | 30 minutes | Next working day (file) |

### 19.2 CDAS Availability

| Window | Availability |
|--------|-------------|
| Market Hours (9:00 AM - 3:30 PM) | Full availability |
| Pre-Market (7:00 AM - 9:00 AM) | Available (reduced load) |
| Post-Market (3:30 PM - 5:00 PM) | Full availability |
| Evening (5:00 PM - 11:00 PM) | Available (batch processing) |
| Night (11:00 PM - 7:00 AM) | Available (maintenance window possible) |
| Weekends | Limited (Saturday AM for maintenance; Sunday off) |
| Holidays | Exchange holidays: limited availability |

---

## 20. Recent Circulars (2024-2026)

### 20.1 Key SEBI/CDSL Circulars Affecting Our Integration

| Date | Circular / Reference | Subject | Impact on Integration |
|------|---------------------|---------|----------------------|
| Jan 7, 2026 | SEBI Stock Brokers Regulations 2026 | Replaces 1992 regulations entirely | Review all DP compliance requirements under new framework |
| Jan 10, 2025 | SEBI/HO/MIRSD/POD-1/P/CIR/2023/193 | Up to 10 nominees | Update nomination fields in BO setup API (previously 3 max) |
| Mar 1, 2025 | Nomination compliance deadline | All existing accounts must have nomination or opt-out | Run campaigns for non-compliant accounts; flag at risk of suspension |
| Jun 10, 2024 | SEBI simplified nomination circular | 3 mandatory fields for nomination | Simplified form; fewer mandatory fields |
| Aug 2024 | SEBI dual upload mandate (KRA + CKYC) | Both KRA and CKYC upload mandatory | Ensure CKYC number is populated in BO record |
| Jul 2024 | SEBI FATCA/CRS to KRA | FATCA/CRS upload to KRA mandatory | Include FATCA fields in BO setup; sync with KRA |
| Dec 2024 | SEBI distinct mobile/email circular | Unique mobile and email per client | Validate at BO opening; reject duplicates |
| Nov 18, 2022 | SEBI/HO/MIRSD/DoP/P/CIR/2022/44 | DDPI replaces POA | Implement DDPI flow; stop accepting POA |
| Feb 1, 2025 | UPI Block Mechanism mandatory for QSBs | ASBA-like for secondary market | May affect settlement flow for qualifying brokers |

### 20.2 CDSL System Updates (2024-2025)

| Date | Update | Impact |
|------|--------|--------|
| 2025 Q1 | eDIS API v2.0 | New endpoints for batch eDIS; enhanced callback mechanism |
| 2025 Q2 | BO Setup API v3.0 | 10-nominee support; FATCA fields added |
| 2024 Q4 | Enhanced reconciliation reports | New report formats; ISIN-level detail |
| 2024 Q3 | TPIN reset workflow | Clients can reset TPIN via easi without calling DP |

---

## 21. Edge Cases

### 21.1 Minor Turning 18 (Automatic Conversion)

```
Trigger: Minor's DOB + 18 years = today's date
         |
1. CDSL system flags account for conversion
         |
2. DP (us) receives notification via daily report / webhook
         |
3. Action required within 30 days:
   a. Obtain fresh KYC from the now-adult client
   b. Client submits own PAN (if not already provided)
   c. Update account type from MN to IN
   d. Remove guardian linkage
   e. Client sets own TPIN for eDIS
   f. Client can now opt for DDPI independently
   g. F&O segment activation becomes possible
         |
4. If not converted within 30 days:
   Account may be frozen (debit freeze)
   Client must visit DP to complete conversion
```

### 21.2 NRI Status Change

**Resident to NRI**:
1. Client notifies DP of change in residential status
2. Existing demat account must be redesignated as NRO (or new NRE account opened)
3. Bank account must be converted to NRO (or NRE opened)
4. PIS permission from designated bank required
5. Update KRA, CKYC, exchange UCC
6. Some securities may face FEMA restrictions; existing F&O positions must be squared off
7. DDPI may need re-registration under NRI rules

**NRI to Resident**:
1. Client returns to India; notifies DP
2. NRE/NRO account redesignated to Resident
3. PIS permission surrendered
4. Update all registrations (KRA, CKYC, Exchange, CDSL)
5. Simpler transition than Resident to NRI

### 21.3 PAN Change/Merger

| Scenario | Action |
|----------|--------|
| PAN correction (typo in name) | Modify BO record; update KRA; exchange re-mapping |
| PAN merger (duplicate PANs) | Retain one PAN; close BO linked to surrendered PAN; transfer holdings |
| PAN invalidated by IT dept | BO suspended automatically; client must obtain valid PAN |

### 21.4 Deceased Account Holder (Transmission)

```
1. Legal heir/nominee informs DP of BO holder's death
          |
2. Documents required:
   - Death certificate (original or notarized copy)
   - If nominee exists: nominee's identity proof + demat account details
   - If no nominee: succession certificate / probate / legal heir certificate
   - Transmission request form
          |
3. DP verifies documents
          |
4. DP submits transmission request to CDSL
   File-based process (not API currently)
          |
5. CDSL processes transmission
   Securities transferred to nominee/legal heir BO account
          |
6. Timeline: 7-30 working days (depending on documentation completeness)
          |
7. If multiple nominees: securities split per percentage allocation
   If percentages result in fractional shares: rounded down, remainder cash-settled
```

### 21.5 Joint Holder Accounts

| Aspect | Details |
|--------|---------|
| Maximum Holders | 3 (first holder, second holder, third holder) |
| PAN Required | For all holders |
| KYC Required | For all holders (each must be KRA Registered) |
| Operating Mode | `AO`=Anyone or Survivor, `JO`=Jointly, `FS`=First or Survivor |
| Nomination | Allowed; requires consent of all holders |
| Death of First Holder | Account continues with surviving holder(s) per operating mode |
| Death of All Holders | Transmission to nominee/legal heir |

### 21.6 Duplicate BO Detection

| Scenario | CDSL Behavior |
|----------|--------------|
| Same PAN, same DP | Rejected with `BO_ERR_010` (duplicate) |
| Same PAN, different DP | Allowed (investor can have multiple demat accounts) |
| Same PAN, CDSL + NSDL | Allowed (cross-depository) |
| BSDA check | If BSDA requested but client already has demat elsewhere, rejected |

### 21.7 Failed BO Opening Recovery

| Failure Point | Recovery Action |
|---------------|-----------------|
| API timeout | Retry with idempotency key; check if BO was created via query API |
| KRA status invalid | Queue in our system; retry when KRA status updates |
| PAN mismatch | Return to client for name correction; re-verify PAN |
| Bank verification pending | Queue; submit after penny-drop completes |
| CDSL system down | File upload as fallback; process next working day |

---

## 22. Future Considerations

### 22.1 Corporate BO Accounts

Corporate account opening is more complex than individual:
- Multiple authorized signatories with individual KYC
- Board resolution digitization and verification
- CIN verification via MCA API
- Beneficial ownership declaration (SEBI 2024 mandate)
- Operating instructions matrix (singly, jointly, any two, etc.)

**Recommendation**: Phase 2 implementation after individual flow is stable. Use file upload initially for corporate accounts while building API integration.

### 22.2 FPI (Foreign Portfolio Investor) Accounts

- Custodian model: FPIs operate through SEBI-registered custodians
- Our DP may not directly open FPI accounts unless we have custodian capabilities
- DDPs (Designated Depository Participants) handle FPI registrations
- CDSL has a separate FPI module in CDAS

**Recommendation**: Not in scope for Phase 1. Evaluate if we plan to serve FPI clients.

### 22.3 CDSL Mobile Integration

- myEasi app allows investors to manage their demat accounts
- CDSL is expanding mobile-first features (biometric auth, eDIS via app)
- Deep linking from our trading app to myEasi for eDIS can improve UX
- Push notifications from CDSL app can supplement our communications

### 22.4 UDiFF (Unified Distilled File Formats)

- SEBI MDAC (Market Data Advisory Committee) mandate for standardized formats
- ISO-tagged data types across NSDL and CDSL
- Implementation completed March 30, 2024; old format discontinued May 15, 2024
- Our system should support UDiFF for any file-based interactions

### 22.5 T+0 and T+1 Settlement

- T+1 settlement is now standard (since Jan 2023)
- T+0 (instant settlement) is being piloted for select stocks
- Impact on eDIS: faster authorization cycles needed
- Impact on pledge: real-time margin checks become critical

### 22.6 Blockchain/DLT Initiatives

- CDSL has piloted blockchain-based solutions for certain processes
- e-Voting (corporate governance) already uses blockchain
- Future: tokenized securities may change demat operations fundamentally
- No immediate integration impact, but worth monitoring

---

## Deep-Dive Guides

For detailed coverage of specific CDSL topics, see these dedicated pages:

| Guide | Topics Covered |
|-------|---------------|
| [DDPI Deep Dive](/broking-kyc/vendors/depositories/cdsl-ddpi/) | DDPI lifecycle, 4 authorization types, vs POA comparison, file format, revocation |
| [MTF & Pledge Operations](/broking-kyc/vendors/depositories/cdsl-mtf-pledge/) | Margin pledge, re-pledge, MTF funding, eLAS, automated release, CUSPA, file formats |
| [BO Modifications](/broking-kyc/vendors/depositories/cdsl-modifications/) | Address, bank, nominee, PAN, email/mobile changes, account closure, dormancy |
| [Integration Guide](/broking-kyc/vendors/depositories/cdsl-integration-guide/) | UAT/production environments, request tracking, security architecture, SEBI circulars |

---

## Appendix A: CDSL State Code Table

| Code | State |
|------|-------|
| AN | Andaman and Nicobar Islands |
| AP | Andhra Pradesh |
| AR | Arunachal Pradesh |
| AS | Assam |
| BR | Bihar |
| CH | Chandigarh |
| CG | Chhattisgarh |
| DD | Dadra and Nagar Haveli and Daman and Diu |
| DL | Delhi |
| GA | Goa |
| GJ | Gujarat |
| HR | Haryana |
| HP | Himachal Pradesh |
| JK | Jammu and Kashmir |
| JH | Jharkhand |
| KA | Karnataka |
| KL | Kerala |
| LA | Ladakh |
| MP | Madhya Pradesh |
| MH | Maharashtra |
| MN | Manipur |
| ML | Meghalaya |
| MZ | Mizoram |
| NL | Nagaland |
| OD | Odisha |
| PY | Puducherry |
| PB | Punjab |
| RJ | Rajasthan |
| SK | Sikkim |
| TN | Tamil Nadu |
| TG | Telangana |
| TR | Tripura |
| UP | Uttar Pradesh |
| UK | Uttarakhand |
| WB | West Bengal |

---

## Appendix B: Relationship Code Table

| Code | Relationship |
|------|-------------|
| SP | Spouse |
| FA | Father |
| MO | Mother |
| SO | Son |
| DA | Daughter |
| BR | Brother |
| SI | Sister |
| GF | Grandfather |
| GM | Grandmother |
| GS | Grandson |
| GD | Granddaughter |
| CH | Child |
| PA | Parent |
| UN | Uncle |
| AU | Aunt |
| NE | Nephew |
| NI | Niece |
| CO | Cousin |
| FR | Friend |
| LG | Legal Guardian |
| OT | Other |

---

## Appendix C: Tax Status Code Table

| Code | Tax Status |
|------|-----------|
| 01 | Individual - Resident Indian |
| 02 | Individual - NRI |
| 03 | HUF |
| 04 | Company - Private |
| 05 | Company - Public |
| 06 | Partnership Firm |
| 07 | Trust |
| 08 | Society |
| 09 | AOP/BOI |
| 10 | LLP |
| 11 | Government |
| 12 | Local Authority |
| 13 | Artificial Juridical Person |
| 14 | FII/FPI |

---

## Appendix D: Integration Checklist

### Pre-Go-Live Checklist

| # | Item | Status | Notes |
|---|------|--------|-------|
| 1 | DP ID assigned by CDSL | Pending | Application submitted |
| 2 | Digital certificate obtained | Pending | eMudhra CA |
| 3 | Static IPs registered with CDSL | Pending | Primary + DR IPs |
| 4 | CDAS user accounts created | Pending | Maker, Checker, Admin, API Service |
| 5 | BO Setup API tested in sandbox | Pending | All account types |
| 6 | eDIS API tested in sandbox | Pending | Generate, verify, revoke |
| 7 | DDPI registration tested | Pending | Register, status check, revoke |
| 8 | File upload format validated | Pending | 7-line format, all 10K test records |
| 9 | Reconciliation reports automated | Pending | Daily download + parse + compare |
| 10 | UCC-Demat mapping flow tested | Pending | NSE + BSE mapping |
| 11 | Error handling for all BO_ERR codes | Pending | Retry logic, alerting |
| 12 | Audit trail logging implemented | Pending | All CDSL operations logged |
| 13 | DR site connectivity verified | Pending | Failover test |
| 14 | SEBI compliance review | Pending | Legal sign-off |
| 15 | Client-facing TPIN guidance docs | Pending | How to set TPIN via easi |
| 16 | Nomination workflow (10 nominees) | Pending | End-to-end test |
| 17 | Minor account conversion workflow | Pending | Age-18 trigger test |
| 18 | NRI account flow (NRE/NRO) | Pending | With PIS linkage |
| 19 | BSDA eligibility check | Pending | Cross-DP duplicate check |
| 20 | Production certificate deployment | Pending | After all sandbox tests pass |

---

## Appendix E: Quick Reference - API Endpoints Summary

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/v1/auth/token` | POST | Obtain JWT token |
| `/v1/bo/setup` | POST | Open new BO account |
| `/v1/bo/modify` | POST | Modify BO details |
| `/v1/bo/close` | POST | Close BO account |
| `/v1/bo/reactivate` | POST | Reactivate dormant account |
| `/v1/bo/status` | GET | Check BO account status |
| `/v1/bo/search` | GET | Search BO by PAN/name |
| `/v1/holdings` | GET | Query holdings for a BO |
| `/v1/ddpi/register` | POST | Register DDPI |
| `/v1/ddpi/status` | GET | Check DDPI status |
| `/v1/ddpi/revoke` | POST | Revoke DDPI |
| `/v1/edis/generate` | POST | Generate eDIS authorization |
| `/v1/edis/status` | GET | Check eDIS status |
| `/v1/edis/revoke` | POST | Revoke eDIS |
| `/v1/nomination/update` | POST | Add/modify nominees |
| `/v1/nomination/opt-out` | POST | Record nomination opt-out |
| `/v1/transaction/demat` | POST | Dematerialization request |
| `/v1/transaction/remat` | POST | Rematerialization request |
| `/v1/transaction/offmarket` | POST | Off-market transfer |
| `/v1/transaction/inter-depository` | POST | Inter-depository transfer |
| `/v1/transaction/pledge` | POST | Create pledge |
| `/v1/transaction/unpledge` | POST | Release pledge |
| `/v1/transaction/invoke-pledge` | POST | Invoke pledge |
| `/v1/transaction/freeze` | POST | Freeze securities |
| `/v1/transaction/unfreeze` | POST | Unfreeze securities |
| `/v1/ucc-mapping/verify` | GET | Verify UCC-Demat mapping |
| `/v1/reports/download` | GET | Download reports |

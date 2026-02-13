# CDSL Integration Specification
## Central Depository Services (India) Limited - Comprehensive DP Integration Guide

**Version**: 1.3
**Date**: 2026-02-13
**Companion to**: [VENDOR_INTEGRATIONS.md](./VENDOR_INTEGRATIONS.md), [kyc-docs/sections/11-exchange-depository.md](./kyc-docs/sections/11-exchange-depository.md)
**Primary Reference**: CDSL DP Operating Instructions (June 2025), SEBI Master Circular SEBI/HO/MRD/MRD-PoD-1/P/CIR/2024/168 (Dec 2024)
**UDiFF Catalogue**: v3.0.1.0 (Feb 4, 2026) - https://www.cdslindia.com/DP/Harmonization.html

---

## Table of Contents

1. [CDAS Architecture & DP Connectivity](#1-cdas-architecture--dp-connectivity)
2. [BO Account Opening - API](#2-bo-account-opening---api)
3. [BO Account Opening - File Upload](#3-bo-account-opening---file-upload)
4. [BO ID Format & Assignment](#4-bo-id-format--assignment)
5. [Status & Sub-Status Codes](#5-status--sub-status-codes)
6. [DDPI - Demat Debit and Pledge Instruction](#6-ddpi---demat-debit-and-pledge-instruction)
7. [eDIS - Electronic Delivery Instruction Slip](#7-edis---electronic-delivery-instruction-slip)
8. [easi / EASIEST / myEasi](#8-easi--easiest--myeasi)
9. [Non-Individual Entities](#9-non-individual-entities)
10. [Nomination](#10-nomination)
11. [KYC Linkage](#11-kyc-linkage)
12. [Transaction APIs](#12-transaction-apis)
13. [Modification & Closure](#13-modification--closure)
14. [CVL KRA Integration](#14-cvl-kra-integration)
15. [Reconciliation & Reports](#15-reconciliation--reports)
16. [Security & Authentication](#16-security--authentication)
17. [SLA & Timelines](#17-sla--timelines)
18. [Charges & Tariff](#18-charges--tariff)
19. [Error Codes & Rejection Reasons](#19-error-codes--rejection-reasons)
20. [Off-Market Reason Codes](#20-off-market-reason-codes)
21. [Freeze / Unfreeze Framework](#21-freeze--unfreeze-framework)
22. [Regulatory Compliance](#22-regulatory-compliance)
23. [Key CDSL Communiques Reference](#23-key-cdsl-communiques-reference)
24. [CDSL Group Companies & Subsidiaries](#24-cdsl-group-companies--subsidiaries)
25. [UDiFF Harmonization Initiative](#25-udiff-harmonization-initiative)
26. [CDAS Technical Architecture (Detailed)](#26-cdas-technical-architecture-detailed)
27. [DP Back-Office Software Vendors](#27-dp-back-office-software-vendors)
28. [Innovation Sandbox](#28-innovation-sandbox)
29. [Online BO Account Opening (eKYC Flow)](#29-online-bo-account-opening-ekyc-flow)
30. [UAT / Test Environment vs Production (Deep Dive)](#30-uat--test-environment-vs-production-deep-dive)
31. [Request Tracking & Sequence Numbers (Deep Dive)](#31-request-tracking--sequence-numbers-deep-dive)
32. [Security & Encryption (Extended Deep Dive)](#32-security--encryption-extended-deep-dive)
33. [CDSL Connectivity Options (Extended Deep Dive)](#33-cdsl-connectivity-options-extended-deep-dive)
34. [DDPI Deep Dive - Demat Debit and Pledge Instruction](#34-ddpi-deep-dive---demat-debit-and-pledge-instruction)
35. [MTF (Margin Trading Facility) - CDSL Pledge Operations](#35-mtf-margin-trading-facility---cdsl-pledge-operations)
36. [BO Modification - Comprehensive Use Cases](#36-bo-modification---comprehensive-use-cases)
37. [Key SEBI Circulars Reference (Extended)](#37-key-sebi-circulars-reference-extended)

---

## 1. CDAS Architecture & DP Connectivity

### 1.1 System Overview

CDAS (Central Depository Accounting System) is the core platform through which all Depository Participants (DPs) interact with CDSL. It handles account opening, transactions, pledges, corporate actions, and reporting.

| Component | Details |
|-----------|---------|
| **Core System** | CDAS - Central Depository Accounting System |
| **Architecture** | Centralized, server-based at CDSL data center |
| **Access Model** | DP Module connects to CDAS via leased line / MPLS / Internet |
| **DP Module** | Client-side interface software provided by CDSL for DP operations |
| **Operating Hours** | Weekdays: typically 9:00 AM - 6:00 PM; Saturdays (1st/3rd/5th): limited hours |
| **Data Center** | Primary + DR (Disaster Recovery) site |

### 1.2 Connectivity Options

| Mode | Details |
|------|---------|
| **Local Leased Line** | Dedicated line between DP office and CDSL. Annual charges apply. |
| **MPLS Leased Line** | Multi-Protocol Label Switching - managed VPN over carrier network |
| **VSAT** | Satellite-based connectivity for remote locations |
| **Ethernet / Router** | Standard ethernet connectivity to CDSL network |
| **Internet** | DP can use own internet connectivity to access CDAS (with security) |

### 1.3 Connectivity Setup

| Aspect | Details |
|--------|---------|
| **Advance Payment** | Rs. 1,00,000 (adjusted against first invoice after commissioning) |
| **Requirement** | Continuous connectivity as per SEBI guidelines |
| **Hardware** | Must procure hardware as per CDSL-specified configuration |
| **Exclusivity** | Hardware used exclusively for CDSL operations |
| **Installation** | Must be in a secure place at the DP's office |
| **Trained Staff** | Minimum 2 trained staff, at least 1 NISM-certified or CDSL 5-day training |

### 1.4 DP Admission Process

```
Step 1: Forward Form-F to CDSL (prescribed registration form)
   - List of directors + last 3 years shareholding pattern
   - Net worth certificate (min Rs. 2 Crore for stock brokers) on Statutory Auditor letterhead
   ↓
Step 2: CDSL forwards payment to SEBI
   ↓
Step 3: SEBI grants Certificate of Registration
   ↓
Step 4: DP submits Master Creation Form to CDSL
   ↓
Step 5: CDSL generates unique DP-ID (8 digits)
   ↓
Step 6: Connectivity setup + hardware installation
   ↓
Step 7: DP goes live on CDAS
```

---

## 2. BO Account Opening - API

### 2.1 API Overview

| Aspect | Details |
|--------|---------|
| **API Name** | BO Setup and Modify Upload API |
| **Function** | Upload files for Account opening (BO setup) and Modification of account details |
| **Portal** | `api.cdslindia.com/APIServices` |
| **Documentation** | Available to registered DPs through CDSL portal |
| **Contact** | dprtasupport@cdslindia.com |

### 2.2 Authentication

| Component | Details |
|-----------|---------|
| **API Key** | Generated by CDSL during DP registration; unique per DP |
| **IP Whitelisting** | DP must register static IPs with CDSL |
| **SSL/TLS** | HTTPS mandatory for all API communication |
| **Digital Signature** | DSC (Digital Signature Certificate) required for transaction authorization |
| **DSC Issuance** | Via Registered Authority (RA) of TCS; takes 7-10 days |

### 2.3 Upload Modes

| Mode | Description |
|------|-------------|
| **File Level Upload** | Entire file processed if all records valid; entire file rejected if any record fails |
| **Record Level Upload** | Successful records processed; error records rejected individually |

### 2.4 API Endpoints (Known)

| API | Base URL | Method | Purpose |
|-----|----------|--------|---------|
| **BO Setup Upload** | `api.cdslindia.com` | POST | Create new BO accounts |
| **BO Modify Upload** | `api.cdslindia.com` | POST | Modify existing BO details |
| **eDIS VerifyDIS** | `edis.cdslindia.com/eDIS/VerifyDIS/` | POST | Verify delivery instruction |
| **eDIS TPIN Generate** | `edis.cdslindia.com/Home/GeneratePin` | POST | Generate TPIN for BO |
| **Margin Pledge** | `api.cdslindia.com/APIServices` | POST | Online pledge setup |
| **Transaction Upload** | `api.cdslindia.com` | POST | Demat/Remat/IDT/Pledge/Freeze |

> **NOTE**: Detailed API schemas (request/response JSON/XML) are provided only to registered DPs under NDA. Contact CDSL at dprtasupport@cdslindia.com for API sandbox access.

### 2.5 Full List of CDSL APIs

| # | API Name | Category | Description |
|---|----------|----------|-------------|
| 1 | **BO Setup and Modify Upload API** | Account | Upload files for BO account opening + modification |
| 2 | **eDIS (e-DIS)** | Transaction | Electronic debit instruction - eliminates physical DIS |
| 3 | **eDIS Revocation API** | Transaction | Revoke pre-trade eDIS authorization by BO |
| 4 | **Transaction Upload API** | Transaction | Upload for Demat, IDT, Pledge, Freeze, Common, Restat, CA |
| 5 | **Pledge API (eLAS)** | Pledge | Online Loan Against Shares - direct pledge from BO demat |
| 6 | **e-Margin Pledge API** | Pledge | Online pledge for margin benefits |
| 7 | **Margin Repledge API** | Pledge | Repledge shares in favor of Clearing Corporation |
| 8 | **eVoting API** | Corporate Actions | BO can cast vote via DP website through CDSL eVoting |
| 9 | **Early Pay-in API** | Settlement | Online early pay-in for margin benefits |
| 10 | **Destat API** | Conversion | Convert MF units from SoA to electronic (demat) form |
| 11 | **KRA APIs (CVL)** | Group Company | Upload/modify KYC records for SEBI intermediaries |
| 12 | **eKYC API** | Group Company | Aadhaar-based eKYC (identity + address proof) |
| 13 | **e-Sign API** | Group Company | Aadhaar-based online electronic signature |
| 14 | **GSP Service (MySARAL GST)** | Group Company | GST return filing |

### 2.6 Sandbox / UAT

| Aspect | Details |
|--------|---------|
| **Test Environment** | Available for registered DPs; contact CDSL for sandbox credentials |
| **Test DP ID** | Assigned by CDSL for UAT |
| **Test Portal** | `test1.cdslindia.com` (referenced in CDSL test environments) |
| **Mock Portal** | `mock.cdslindia.com` (for RTA testing) |
| **Go-Live** | Requires successful UAT sign-off + CDSL approval |

---

## 3. BO Account Opening - File Upload

### 3.1 General File Format Rules

| Rule | Details |
|------|---------|
| **Format** | Fixed-length positional (no delimiters/separators) |
| **Numeric Fields** | Right-justified, zero-padded |
| **Alphanumeric Fields** | Left-justified, space-padded |
| **Empty Fields** | Fill with spaces (do NOT leave blank or use delimiters) |
| **Date Format** | DDMMYYYY (8 characters) |
| **Character Set** | ASCII |
| **Signature Upload** | Supported formats: .jpg, .bmp, .gif, .tif, .png |

### 3.2 Line Structure Overview

For BO setup, every detail record contains multiple lines. Lines 01, 02, 05, and 07 are **mandatory**. If a line contains no data, that line will not be written.

| Line Code | Content | Mandatory | Description |
|-----------|---------|-----------|-------------|
| **Line 01** | First Holder - Basic Details | **YES** | Account type, status, sub-status, PAN, name, DOB, gender, father/spouse name, occupation, income range, CKYC number, KRA status, DP ID |
| **Line 02** | First Holder - Contact & KYC | **YES** | Address (correspondence + permanent), city, state, pincode, country, phone, mobile, email, KYC flags, BO opening source, FATCA details |
| **Line 03** | Second Holder Details | No | Joint holder 1: name, PAN, DOB, gender, address, contact details, KYC flags |
| **Line 04** | Third Holder Details | No | Joint holder 2: name, PAN, DOB, gender, address, contact details, KYC flags |
| **Line 05** | Bank Account Details | **YES** | Bank name, branch, account number, account type (Savings/Current/NRE/NRO), IFSC code, MICR code - used for dividend/interest credit |
| **Line 06** | Additional Details | No | Standing instructions, power of attorney / DDPI details, CM (Clearing Member) details, UCC linkage, global custody details |
| **Line 07** | Nomination Details | **YES** | Nominee name, relationship, percentage share, address, date of birth, guardian details (if nominee is minor), opt-out flag (requires video verification) |

> **Post-2025 Update**: A new line is added for capturing **BO-UCC Link** (Unique Client Code) details, linking the demat account to trading account.

### 3.3 Line 01 - First Holder Basic Details (Estimated Fields)

Based on CDSL communiques DP-119, DP-408, and the account opening form, Line 01 contains:

| Field | Type | Est. Length | Description | Mandatory |
|-------|------|-------------|-------------|-----------|
| Record Type | AN | 2 | "01" - Line identifier | Y |
| DP ID | N | 8 | 8-digit Depository Participant ID | Y |
| Client ID | N | 8 | 8-digit Client ID (auto-assigned or pre-assigned) | Y |
| Account Category | AN | 2 | IND=Individual, HUF, BDC=Body Corporate, TRU=Trust, etc. | Y |
| Account Status | AN | 2 | Active, Closed, Suspended, Frozen | Y |
| Sub-Status Code | N | 2-3 | Numeric code for account sub-type (e.g., 01=Ind Resident, 03=NRI Repatriable) | Y |
| PAN | AN | 10 | Permanent Account Number | Y |
| First Name | AN | 30 | First/given name of holder | Y |
| Middle Name | AN | 30 | Middle name | N |
| Last Name | AN | 30 | Surname/family name | Y |
| Date of Birth | N | 8 | DDMMYYYY format | Y |
| Gender | AN | 1 | M=Male, F=Female, T=Transgender | Y |
| Father/Spouse Name | AN | 60 | Father's or husband's name | Y |
| Occupation Code | AN | 2 | Occupation type code | N |
| Income Range | N | 2 | Income slab code (as per SEBI KYC) | Y |
| CKYC Number | N | 14 | 14-digit Central KYC Identification Number | N |
| KRA Status | AN | 2 | KYC registration status from KRA | N |
| Citizenship | AN | 2 | Country code (IN=India) | Y |
| Residential Status | AN | 1 | R=Resident, N=NRI, F=Foreign National | Y |
| PAN Verification Flag | AN | 1 | Y=Verified, N=Not Verified | Y |
| Aadhaar Linked Flag | AN | 1 | Y=Linked, N=Not Linked | N |

> **IMPORTANT**: Exact field positions and lengths are in CDSL Communique CDSL/OPS/SYSTM/2023/119 (DP-119) and the UDiFF Catalogue. DPs must download from https://www.cdslindia.com/DP/Harmonization.html

### 3.4 Line 02 - Contact & KYC Details (Estimated Fields)

| Field | Type | Est. Length | Description | Mandatory |
|-------|------|-------------|-------------|-----------|
| Record Type | AN | 2 | "02" - Line identifier | Y |
| DP ID | N | 8 | Same as Line 01 | Y |
| Client ID | N | 8 | Same as Line 01 | Y |
| Correspondence Address Line 1 | AN | 60 | Street / Building | Y |
| Correspondence Address Line 2 | AN | 60 | Locality / Area | N |
| Correspondence Address Line 3 | AN | 60 | Landmark | N |
| City | AN | 30 | City name | Y |
| State | AN | 30 | State name or code | Y |
| Pincode | N | 6 | 6-digit PIN code | Y |
| Country | AN | 2 | Country code | Y |
| Permanent Address (same fields) | AN | varies | If different from correspondence | N |
| Phone (STD) | AN | 15 | Landline with STD code | N |
| Mobile | N | 10 | 10-digit mobile number | Y |
| Email | AN | 50 | Single email only (multiple emails rejected) | Y |
| Mobile Verified Flag | AN | 1 | Y/N | Y |
| Email Verified Flag | AN | 1 | Y/N | Y |
| KYC Compliance Flag | AN | 1 | Y/N | Y |
| BO Account Opening Source | AN | 2 | Online / Offline / API | Y |
| FATCA Declaration Flag | AN | 1 | Y=Declared | Y |
| Tax Residency Country | AN | 2 | Country code for FATCA/CRS | N |
| TIN (Tax ID Number) | AN | 20 | For FATCA/CRS reporting | N |

### 3.5 Line 05 - Bank Account Details (Estimated Fields)

| Field | Type | Est. Length | Description | Mandatory |
|-------|------|-------------|-------------|-----------|
| Record Type | AN | 2 | "05" - Line identifier | Y |
| DP ID | N | 8 | Same as Line 01 | Y |
| Client ID | N | 8 | Same as Line 01 | Y |
| Bank Name | AN | 50 | Name of the bank | Y |
| Branch Name | AN | 50 | Branch name | N |
| Account Number | AN | 20 | Bank account number | Y |
| Account Type | AN | 2 | SB=Savings, CA=Current, NRE, NRO | Y |
| IFSC Code | AN | 11 | 11-character IFSC code | Y |
| MICR Code | N | 9 | 9-digit MICR code | N |

### 3.6 Line 07 - Nomination Details (Estimated Fields)

| Field | Type | Est. Length | Description | Mandatory |
|-------|------|-------------|-------------|-----------|
| Record Type | AN | 2 | "07" - Line identifier | Y |
| DP ID | N | 8 | Same as Line 01 | Y |
| Client ID | N | 8 | Same as Line 01 | Y |
| Nomination Flag | AN | 1 | Y=Nominated, N=Opted-out | Y |
| Nominee 1 Name | AN | 60 | Full name of first nominee | Y (if flag=Y) |
| Nominee 1 Relationship | AN | 20 | Relationship with holder | Y (if flag=Y) |
| Nominee 1 Percentage | N | 5 | Percentage share (e.g., 100.00 or 50.00) | Y (if flag=Y) |
| Nominee 1 Address | AN | 120 | Full address | Y (if flag=Y) |
| Nominee 1 DOB | N | 8 | DDMMYYYY | N |
| Nominee 1 Guardian Name | AN | 60 | Required if nominee is minor | Conditional |
| Nominee 1 Guardian Relationship | AN | 20 | Relationship of guardian to nominee | Conditional |
| Nominee 1 Guardian Address | AN | 120 | Guardian address | Conditional |
| (Repeat for Nominees 2-10) | | | Up to 10 nominees since Jan 2025 | N |
| Opt-Out Declaration | AN | 1 | Y if opting out of nomination | Conditional |
| Opt-Out Video Verification Flag | AN | 1 | Y=Video verified (required for opt-out) | Conditional |

---

## 4. BO ID Format & Assignment

### 4.1 Structure

```
BO ID: 16 digits (purely numeric)
┌────────────────┬────────────────┐
│  DP ID (8)     │  Client ID (8) │
│  12345678      │  00012345      │
└────────────────┴────────────────┘
Full BO ID: 1234567800012345
```

| Component | Details |
|-----------|---------|
| **Total Length** | 16 digits (numeric only - no alphabetic characters) |
| **First 8 digits** | DP ID - unique identifier for the Depository Participant |
| **Last 8 digits** | Client ID - unique identifier for the BO within that DP |
| **DP ID Assignment** | Assigned by CDSL when DP is registered (Master Creation Form) |
| **Client ID Assignment** | Auto-generated sequentially by CDAS system during BO account creation |
| **Permanence** | BO ID is fixed once created; cannot be changed |
| **Example** | DP ID `12049200` + Client ID `01830421` = BO ID `1204920001830421` |

### 4.2 DP ID Ranges (Common Brokers)

| DP ID Prefix | Depository Participant |
|-------------|----------------------|
| 12049200 | Zerodha |
| 12081600 | HDFC Securities |
| 12088700 | ICICI Securities |
| 12084500 | Angel One |
| 12033500 | Kotak Securities |

> **Note**: DP IDs are published on CDSL website at https://www.cdslindia.com/dp/dplist.aspx

---

## 5. Status & Sub-Status Codes

### 5.1 Account Status (Primary)

| Status | Description | Trading Allowed |
|--------|-------------|-----------------|
| **Active** | Account is fully operational | Yes |
| **Suspended** | Temporarily suspended by depository or regulator | No |
| **Frozen** | Frozen for debit and/or credit due to non-compliance | Partial/No |
| **Closed** | Account permanently closed | No |
| **Dormant** | No transactions for 12+ months | Limited |
| **To Be Closed** | Closure process initiated, pending completion | No |

### 5.2 Sub-Status Codes (Account Types)

Based on CDSL Communique CDSL/OPS/DP/SYSTM/2023/729 (Dec 15, 2023):

| Sub-Status Code | Description | Category |
|----------------|-------------|----------|
| 01 | Individual Resident | Individual |
| 02 | Individual Director | Individual |
| 03 | NRI Repatriable | NRI |
| 04 | NRI Non-Repatriable | NRI |
| 05 | Individual Director's Relative | Individual |
| 06 | HUF / AOP | Individual |
| 07 | Individual Promoter | Individual |
| 08 | NRI Repatriable Promoter | NRI |
| 09 | NRI Non-Repatriable Promoter | NRI |
| 10 | Minor | Individual |
| 11 | Foreign National | Foreign |
| 12 | Body Corporate (Domestic) | Corporate |
| 13 | Trust | Non-Individual |
| 14 | Partnership Firm | Non-Individual |
| 15 | Limited Liability Partnership (LLP) | Non-Individual |
| 16 | Banks / Financial Institutions | Institutional |
| 17 | FII / FPI | Foreign |
| 18 | Mutual Fund | Institutional |
| 19 | Insurance Company | Institutional |
| 20 | Venture Capital Fund | Institutional |
| 21 | IEPF Suspense Account | Special |
| 30 | Corporate CM/TM - Proprietary Account | Clearing |
| 31 | Individual CM/TM - Proprietary Account | Clearing |
| 32 | HUF CM/TM - Proprietary Account | Clearing |
| 40 | Client Securities Margin Pledge Account | Margin |
| 81 | Ind Resident - PMS Negative Nomination | PMS |
| 82 | HUF - PMS | PMS |

> **NOTE**: Full list in Annexure-A of Communique DP-729. Download latest from CDSL. New codes for NRI-Depository Receipts, Foreign National-DR, etc. added periodically.

### 5.3 Product Codes

| Code | Product Description |
|------|-------------------|
| CM | Cash Market / Equity |
| FO | Futures & Options |
| CD | Currency Derivatives |
| COM | Commodity |
| SLB | Securities Lending & Borrowing |

---

## 6. DDPI - Demat Debit and Pledge Instruction

### 6.1 Overview

| Aspect | Details |
|--------|---------|
| **SEBI Circular** | SEBI/HO/MIRSD/DoP/P/CIR/2022/153 dated October 6, 2022 |
| **Effective Date** | November 19, 2022 |
| **Replaces** | Power of Attorney (POA) |
| **Nature** | One-time authorization given by BO to DP/broker |
| **Scope** | Debit securities for settlement, pledge for margin, mutual fund transactions on exchange platforms, tendering in open offers |

### 6.2 DDPI vs POA

| Aspect | DDPI (New) | POA (Old - Discontinued) |
|--------|-----------|--------------------------|
| Scope | Limited to specific purposes only | Broad authority |
| Purposes | Settlement delivery, margin pledge, MF on exchange, open offer tendering | General demat operations |
| Risk | Lower - limited scope | Higher - broad authority |
| Online Submission | Yes (Aadhaar eSign) | Generally offline |
| Activation Time | ~24 working hours (online) | 2-5 business days |
| Revocation | Anytime by BO | Anytime by BO |

### 6.3 DDPI Authorization Flow

```
Step 1: BO initiates DDPI request via broker portal/app
   ↓
Step 2: DP generates DDPI form with pre-filled details
   ↓
Step 3: BO reviews and signs via:
   Option A: Aadhaar eSign (online - 24h activation)
   Option B: Physical form submission (offline - 2-3 days)
   ↓
Step 4: DP uploads signed DDPI to CDSL via BO Modify API / CDAS
   ↓
Step 5: CDSL activates DDPI flag on BO account
   ↓
Status: DDPI Active → No TPIN/OTP needed for routine trades
```

### 6.4 With vs Without DDPI

| Scenario | With DDPI | Without DDPI |
|----------|-----------|--------------|
| **Selling Shares** | Automatic debit by broker | TPIN + OTP required each time (eDIS) |
| **Margin Pledge** | Broker can initiate pledge | BO must approve each pledge via TPIN/OTP |
| **Convenience** | High - seamless trading | Lower - manual auth each trade |
| **Security** | Moderate - limited scope auth | Higher - per-transaction authorization |
| **Cost** | Rs. 100 + 18% GST | No charge |

### 6.5 DDPI Communique Reference

- CDSL Communique: DP-332 (DDPI implementation)
- File format changes: DP-5565 (BO Setup/Modify changes for DDPI/POA holder fields)

---

## 7. eDIS - Electronic Delivery Instruction Slip

### 7.1 Overview

eDIS is the electronic mechanism for authorizing share debits from a demat account, replacing physical DIS forms. It is required when the BO has NOT submitted DDPI.

### 7.2 TPIN Details

| Aspect | Details |
|--------|---------|
| **TPIN Length** | 6 digits |
| **Generated By** | CDSL (directly to BO, NOT the DP) |
| **Delivery** | SMS to registered mobile |
| **Activation** | 6 minutes after generation |
| **Validity** | 90 days from generation |
| **Reset** | Online anytime with OTP on mobile |
| **Lock** | 3 consecutive wrong entries = TPIN invalidated (must regenerate) |
| **DP Access** | NONE - DP cannot view, edit, or store TPIN |

### 7.3 eDIS API Integration Flow

```
┌──────────────┐     ┌──────────────────┐     ┌─────────────────────┐
│  DP / Broker  │     │  CDSL eDIS Portal │     │    BO (Client)      │
│  Application  │     │  edis.cdslindia   │     │    Mobile/Web       │
└──────┬───────┘     └────────┬─────────┘     └──────────┬──────────┘
       │                      │                          │
       │ 1. DP Registration   │                          │
       │   (Get API Key)      │                          │
       │ ◄────────────────────│                          │
       │                      │                          │
       │ 2. BO sells shares   │                          │
       │ (trade entry)        │                          │
       │                      │                          │
       │ 3. POST /eDIS/VerifyDIS/                        │
       │ (DPId, ReqId, Version,                          │
       │  TransDtls [encrypted])                         │
       │ ─────────────────────►                          │
       │                      │                          │
       │                      │ 4. Redirect BO to CDSL   │
       │                      │    eDIS page              │
       │                      │ ─────────────────────────►│
       │                      │                          │
       │                      │ 5. BO enters TPIN        │
       │                      │ ◄─────────────────────────│
       │                      │                          │
       │                      │ 6. CDSL sends OTP        │
       │                      │ ─────────────────────────►│
       │                      │                          │
       │                      │ 7. BO enters OTP         │
       │                      │ ◄─────────────────────────│
       │                      │                          │
       │ 8. Success/Reject    │                          │
       │    callback to DP    │                          │
       │ ◄────────────────────│                          │
       └──────────────────────┘                          │
```

### 7.4 eDIS API Endpoint Details

| Endpoint | URL | Method |
|----------|-----|--------|
| **Verify DIS** | `https://edis.cdslindia.com/eDIS/VerifyDIS/` | POST (HTML Form) |
| **Generate TPIN** | `https://edis.cdslindia.com/Home/GeneratePin` | POST |
| **Change TPIN** | `https://edis.cdslindia.com/home/changepin` | POST |

### 7.5 VerifyDIS Request Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| **DPId** | String | 8-digit DP ID (e.g., "83400") |
| **ReqId** | String | Unique request ID (e.g., "291951000000401") |
| **Version** | String | API version: "1.1" |
| **TransDtls** | String | Encrypted transaction details containing ISIN, quantity, exchange, segment |

### 7.6 TransDtls Encrypted Payload (Decrypted Structure)

| Field | Description |
|-------|-------------|
| ISIN | International Securities Identification Number (12 chars) |
| Quantity | Number of shares to debit |
| Exchange | NSE / BSE / MCX |
| Segment | CM / FO / CD / COM |
| Bulk Flag | Y/N for bulk authorization |

### 7.7 eDIS Revocation

| Aspect | Details |
|--------|---------|
| **API** | eDIS Revocation API |
| **Purpose** | Revoke pre-trade eDIS authorization provided by BO |
| **Timing** | Can be revoked before settlement |
| **Effect** | Previously authorized transactions will not be settled |

---

## 8. easi / EASIEST / myEasi

### 8.1 Comparison

| Feature | easi | EASIEST | myEasi |
|---------|------|---------|--------|
| **Full Form** | Electronic Access to Securities Information | Electronic Access to Securities Information and Execution of Secured Transaction | Mobile version of easi |
| **Access Type** | Read-only | Read + Write (transact) | Read + Write (transact) |
| **Holdings View** | Yes | Yes | Yes |
| **Transaction History** | Yes | Yes | Yes |
| **Off-Market Transfer** | No | Yes | Yes |
| **Inter-Depository Transfer** | No | Yes | Yes |
| **TPIN Required** | No | Yes (for transactions) | Yes (for transactions) |
| **Trusted Accounts** | N/A | Yes (set up trusted accounts for easy transfer) | Yes |
| **Platform** | Web | Web | iOS + Android |
| **Fee** | Free | Free | Free |
| **Registration** | Online at web.cdslindia.com | Online at web.cdslindia.com | Via app download |

### 8.2 Unified Investor Platform (Feb 2025)

CDSL and NSDL, in collaboration with SEBI, launched the **Unified Investor App (UIP)** in February 2025:
- Integrates **myEasi** (CDSL) and **SPEED-e** (NSDL)
- Consolidated view of holdings across both depositories
- Single dashboard for all demat securities
- Eliminates need for multiple platform logins

### 8.3 DP Integration with easi/EASIEST

| Aspect | Details |
|--------|---------|
| **BO Registration** | DP authenticates BO ID, trusted accounts, grouped accounts |
| **Trusted Accounts** | BO can add trusted accounts for off-market transfers (verified by DP) |
| **DSC Requirement** | All off-market, inter-depository transactions need digital signature authorization |
| **DSC Provider** | Obtained from any RA of Tata Consultancy Services |

---

## 9. Non-Individual Entities

### 9.1 Corporate BO Accounts

| Requirement | Details |
|-------------|---------|
| **Account Category** | Body Corporate (BDC) |
| **CIN** | Corporate Identification Number (21 chars) - mandatory |
| **Board Resolution** | Authorizing account opening + naming authorized signatories |
| **Authorized Signatories** | Name + DSC mapping for each signatory |
| **If Single Director** | Board Resolution must be signed by Company Secretary |
| **Documents** | Certificate of Incorporation, MOA, AOA, PAN, address proof |
| **DSC Mapping** | Each authorized signatory must have DSC mapped in CDAS |

### 9.2 HUF (Hindu Undivided Family)

| Requirement | Details |
|-------------|---------|
| **Account Category** | HUF |
| **Karta** | Name, PAN, identity proof of Karta |
| **Coparcener List** | List of all coparceners (members) |
| **HUF PAN** | Separate PAN in the name of HUF |
| **HUF Declaration** | Declaration of HUF formation |

### 9.3 Partnership Firms

| Requirement | Details |
|-------------|---------|
| **Account Category** | Partnership Firm |
| **Partnership Deed** | Certified copy |
| **Partner Details** | Name, PAN, address of all partners |
| **Authorized Partner** | Board resolution / partnership agreement naming authorized signatory |

### 9.4 NRI Accounts

| Type | NRE Demat | NRO Demat |
|------|-----------|-----------|
| **Funding Source** | Income earned abroad (fully repatriable) | Income from India (rental, pension, dividend) |
| **Repatriation** | Fully repatriable | Capped at USD 1M/year (CA certificate required) |
| **PIS Requirement** | Mandatory for equity trading | Mandatory for equity trading |
| **PIS Approval** | From designated AD (Authorized Dealer) bank | From designated AD bank |
| **FEMA Compliance** | Full compliance with FEMA regulations | Full compliance with FEMA regulations |
| **MF / IPO** | PIS not required for MF or IPO | PIS not required for MF or IPO |
| **Sub-Status Code** | 03 (NRI Repatriable) | 04 (NRI Non-Repatriable) |
| **Bank Account** | NRE bank account linked | NRO bank account linked |

### 9.5 Other Entity Types

| Entity | Key Requirements |
|--------|-----------------|
| **Trust** | Trust deed, list of trustees, PAN of trust, authorized signatory resolution. ESOP transactions permitted only from Trust sub-type accounts. |
| **LLP** | LLP Agreement, Certificate of Registration from MCA, designated partners' details |
| **FPI (Foreign Portfolio Investor)** | SEBI FPI registration, Global Custodian relationship, Category I/II classification, DDP (Designated Depository Participant) required |
| **Society** | Certificate of Registration, Bye-laws, Resolution naming authorized signatories |

---

## 10. Nomination

### 10.1 Rules (Post SEBI Circular Jan 10, 2025)

| Aspect | Details |
|--------|---------|
| **Maximum Nominees** | 10 (increased from 3) |
| **Effective Date** | March 1, 2025 |
| **Compliance Deadline** | All existing accounts must nominate or opt-out |
| **Non-Compliance** | Demat account frozen for debits |
| **Eligible Nominees** | Only individual / natural persons (NOT trusts, companies, HUF, etc.) |
| **POA Restriction** | Person acting under POA CANNOT add nominees on behalf of investor |
| **Default Distribution** | If percentages not specified, equal distribution among nominees |

### 10.2 Nominee Fields

| Field | Required | Description |
|-------|----------|-------------|
| Nominee Name | Y | Full name of nominee |
| Relationship | Y | Relationship to account holder |
| Percentage Share | Y | Allocation percentage (must total 100%) |
| Address | Y | Full postal address |
| Date of Birth | N | Nominee DOB |
| Email | Y (per 2025) | Nominee email (new mandatory field) |
| Mobile | Y (per 2025) | Nominee mobile (new mandatory field) |
| Guardian Name | Conditional | Required if nominee is minor |
| Guardian Relationship | Conditional | Guardian's relationship to nominee |
| Guardian Address | Conditional | Guardian's postal address |

### 10.3 Opt-Out Process

```
Step 1: BO declares opt-out of nomination
   ↓
Step 2: Video verification required (SEBI mandate)
   - VIPV (Video In-Person Verification) or
   - Video recording of BO declaring opt-out
   ↓
Step 3: DP uploads opt-out declaration + video reference to CDSL
   ↓
Step 4: CDSL marks account as "Nomination Opted Out"
```

### 10.4 Transmission (On Death of Holder)

| Aspect | Details |
|--------|---------|
| **Documents Required** | Death certificate + nominee's KYC documents |
| **NO Longer Required** | Affidavit, indemnity bond (removed by SEBI Jan 2025 circular) |
| **Process** | Nominee submits claim to DP → DP verifies → securities transmitted |

---

## 11. KYC Linkage

### 11.1 6 Mandatory KYC Attributes

SEBI mandates that these 6 attributes must match across KRA, Exchange (UCC), and Depository (BO):

| # | Attribute | Validation |
|---|-----------|------------|
| 1 | Name | Must match PAN records |
| 2 | PAN | Must be valid and verified with ITD |
| 3 | Address | Must match KYC records |
| 4 | Mobile Number | Must be verified via OTP |
| 5 | Email | Must be verified via OTP |
| 6 | Income Range | Must be declared (slab code) |

### 11.2 KRA Status Integration

| Status at KRA | Meaning | Impact on CDSL |
|---------------|---------|----------------|
| KYC Registered | Full KYC completed | BO can be activated |
| KYC Validated | KYC verified by intermediary | BO can be activated |
| On Hold | KYC under review | BO activation may be delayed |
| Under Process | KYC being processed | BO activation may be delayed |
| Rejected | KYC rejected | BO cannot be activated |
| Not Available | No KYC record at any KRA | Fresh KYC required |

### 11.3 CKYC Integration

| Aspect | Details |
|--------|---------|
| **CKYC Number** | 14-digit KIN (KYC Identification Number) |
| **Stored in** | Line 01 of BO file (CKYC Number field) |
| **Search** | By PAN or DOB+Name via CERSAI/Protean |
| **Download** | Full record download with unmasked details |
| **Upload** | After new KYC, generate and upload to CKYC registry |
| **Dual Upload** | Mandatory since Aug 2024: Upload to BOTH KRA and CKYC |
| **Masked CKYC** | Since Jan 2025, search returns masked CKYC number; download needed for full record |

---

## 12. Transaction APIs

### 12.1 Transaction Upload API

The **Transaction Upload API** allows DPs to upload files for multiple transaction types:

| Transaction Type | `<Tp>` Tag Value | Description |
|-----------------|------------------|-------------|
| Demat | DEMAT | Dematerialization of physical certificates |
| Destat | DESTAT | Destatementization (MF SoA to demat) |
| Remat | REMAT | Rematerialization (demat to physical) |
| Restat | RESTAT | Restatementization / Redemption |
| Normal Pay-in | PAYIN | Pay-in to clearing house |
| Early Pay-in | EPAYIN | Early pay-in for margin benefits |
| Inter Depository | IDT | CDSL to NSDL or vice versa |
| Off-Market | OFFMKT | Between two CDSL accounts |
| On-Market | ONMKT | Market settlement |
| Pledge | PLEDGE | Pledge creation |
| Un-pledge | UNPLEDGE | Pledge release |
| Confiscation | CONFISCATE | Pledge invocation |
| Auto Un-pledge | AUTOUNPLEDGE | Automatic un-pledge |
| BO Level Freeze | BOFREEZE | Freeze entire BO account |
| BO-ISIN Level Freeze | BOISINFREEZE | Freeze specific ISIN in BO account |
| Unfreeze | UNFREEZE | Remove freeze |
| One-to-One Transmission | TRANS11 | Single nominee transmission |
| Account Transfer | ACCTRANSFER | Transfer all holdings to new account |
| One-to-Many Transmission | TRANS1M | Multiple nominee transmission |
| DIS Issuance/Cancellation | DIS | DIS slip management |

### 12.2 Common Upload File Format

| Rule | Details |
|------|---------|
| **Format** | Tag-based (NOT positional for transactions) |
| **First Tag** | `<Tp>` indicating upload type |
| **Multiple Types** | Different transaction types can be in the same file |
| **Field Order** | Fields can be in any order |
| **Quantity** | Max 12 digits before decimal, 3 after; decimal point required |
| **Date** | DDMMYYYY format |
| **Pledge Sub-Type** | 'S' for pledge sub-type field |

### 12.3 Inter-Depository Transfer (IDT) Specifics

| Aspect | Details |
|--------|---------|
| **Module** | OLIDT (Online Inter-Depository Transfer) |
| **Exchange** | Instructions exchanged online between CDSL and NSDL |
| **Weekday Deadline** | 6:00 PM for DPs to verify & release IDT instructions |
| **Saturday Deadline** | 2:30 PM (1st, 3rd, 5th Saturdays) |
| **G-Sec IDT** | Batch mode: 3 batches on weekdays, 1 batch on working Saturdays |
| **Standing Instruction** | If not given, separate receipt instruction needed for each IDT |

### 12.4 Pledge Mechanism (Margin Pledge)

| API | Description |
|-----|-------------|
| **eLAS API** | Loan Against Shares - BO pledges directly from DP website |
| **e-Margin Pledge API** | Pledge for margin benefits; supports margin funding |
| **Margin Repledge API** | DP repledges shares to Clearing Corporation |
| **OTP Verification** | Required from BO for all pledge operations |

---

## 13. Modification & Closure

### 13.1 BO Modification

| Aspect | Details |
|--------|---------|
| **API** | BO Modify Upload API (same API as BO Setup) |
| **Scope** | Name, address, bank details, contact details, KYC attributes, nomination |
| **Print Rule** | On activation/modification: Line Code 0 + all fields of modified Line Code printed |
| **Nominee Modification** | If nominee modified: Line Code 0 + all Line Code 6 fields printed (modified + unmodified) |
| **Address Modification** | Joint holder changes: Line Codes 1, 2, 3 all printed |
| **Auto-Propagation** | Address changes automatically downloaded to all companies where BO holds securities |
| **File** | BO Modify Upload format (same lines 01-07 structure) |

### 13.2 Account Closure

| Aspect | Details |
|--------|---------|
| **Initiation** | By BO (online or physical request) |
| **Online Closure** | Available for accounts opened online or offline (SEBI mandate) |
| **No Reason Required** | BO shall not be required to give reasons for closure (online mode) |
| **Pre-Conditions** | All free securities must be transferred out; no outstanding dues |
| **DP Timeline** | Complete transfer + closure within **2 working days** from dues clearance |
| **Dues Notification** | DP must inform BO of dues + payment deadline |
| **Effective Date** | July 14, 2025 for new closure procedures |
| **File Upload** | BO Signature/Closure Upload format (per DP-5565) |

### 13.3 Dormancy Rules

| Aspect | Details |
|--------|---------|
| **Inactive Definition** | No transactions for 12+ consecutive months |
| **Impact** | Account flagged as dormant/inactive |
| **Reactivation** | Submit reactivation request to DP + updated KYC |
| **Documents** | PAN, address proof, recent photo, reactivation form |
| **Timeline** | Typically processed within 2-3 working days |

---

## 14. CVL KRA Integration

### 14.1 Overview

| Aspect | Details |
|--------|---------|
| **Entity** | CDSL Ventures Limited (CVL) |
| **Relationship** | Wholly owned subsidiary of CDSL |
| **Role** | First SEBI-approved KYC Registration Agency (KRA) |
| **Records** | 7+ crore fully digitized KYC records |
| **Intermediaries** | 2,700+ intermediaries accessing the system |
| **Website** | https://www.cvlkra.com |

### 14.2 Integration Model

| Aspect | Details |
|--------|---------|
| **Registration** | DP of CDSL and/or NSDL can register with CVL-KRA |
| **Multi-Registration** | Intermediaries with multiple SEBI registrations can use one ID or separate IDs |
| **APIs** | KRA APIs provided by CDSL for upload/modification of KYC records |
| **Verification** | https://validate.cvlindia.com/CVLKRAVerification_V1/ |
| **Purpose** | Centralize KYC, avoid duplication, single-point change, uniform data |

### 14.3 CVL KRA Operating Instructions

- Available at: https://www.cvlindia.com/CVLINDIA_DOC/pdf/CVL-KRA%20Operating%20Instructions-New.pdf
- Covers: Registration, KYC upload, modification, search, download procedures

---

## 15. Reconciliation & Reports

### 15.1 Key Report Downloads

| Report | Format | Description | Frequency |
|--------|--------|-------------|-----------|
| **DPM3** | CSV (SOH_EXP_\<DPID\>_\<ReqID\>_\<I/F\>_YYYYMMDDHHMM_\<Seq\>.csv) | All balances of all BO ISINs - complete holdings snapshot | Weekly / Monthly / On-demand |
| **DPM4** | CSV | BO-ISINs with balances changed between time intervals (delta report) | Daily / On-demand |
| **DPM5** | CSV | Additional holdings report format | Periodic |
| **DP57** | Fixed format | Single download report for ALL transaction types during the day | Intra-day (multiple times) |
| **CD03** | CSV | ISIN Master Details download | On-demand |
| **DPC9** | CSV/PDF | Online Statement of Transactions and Holdings | On-demand |
| **Client Master** | Fixed format | Complete BO master data for all clients | Daily EOD |

### 15.2 DP57 Report Contents

The DP57 is the primary reconciliation report containing:

| Field | Description |
|-------|-------------|
| Record Identifier | Report record type |
| Transaction Type | Demat/Remat/IDT/Pledge/Freeze/Pay-in/Pay-out etc. |
| BO ID | 16-digit BO identifier |
| ISIN | Security identifier |
| Transaction ID | Unique transaction reference |
| Quantity | Transaction quantity |
| Transaction Status | Setup/Verified/Executed/Rejected |
| Transaction Setup Date | Date of instruction entry |
| Business Date | Settlement/business date |
| Counter BO ID | Counterparty BO ID (for transfers) |
| CM ID | Clearing Member ID |
| Settlement ID | Exchange settlement number |

### 15.3 DP57 Transaction Types Covered

Dematerialization, Rematerialization, Inter-depository, Off-market, On-market, Pledge, Confiscation, Freeze/Unfreeze, Early Pay-in, BSE/NSE Pay-in/Pay-out, SLB Pay-out, Transmission (One-to-many)

### 15.4 CAS (Consolidated Account Statement)

| Aspect | Details |
|--------|---------|
| **Provider** | CDSL (for CDSL accounts) + combined with NSDL |
| **Frequency** | Monthly (if transactions), Half-yearly (if no transactions) |
| **Content** | Holdings + transactions across all demat accounts with the depository |
| **Delivery** | Email to registered email ID |
| **Download** | Available via CDSL easi portal |

---

## 16. Security & Authentication

### 16.1 Authentication Layers

| Layer | Details |
|-------|---------|
| **API Key** | Unique key generated per DP during registration; used in all API calls |
| **Digital Signature Certificate (DSC)** | e-Token based DSC from RA of TCS; required for transaction authorization |
| **IP Whitelisting** | DP must register static IP addresses with CDSL |
| **SSL/TLS** | HTTPS encryption for all API and web communication |
| **Two-Factor Auth** | Login ID + Password + 2FA for DP Module / CDAS access |
| **TPIN** | 6-digit PIN for BO-level transaction authorization (eDIS) |
| **OTP** | One-time password to registered mobile for transaction verification |

### 16.2 DSC Requirements

| Aspect | Details |
|--------|---------|
| **Provider** | Registered Authority (RA) of Tata Consultancy Services (TCS) |
| **Format** | e-Token (hardware token) |
| **Issuance Time** | 7-10 working days |
| **Required For** | All on-market, off-market, and inter-depository transactions |
| **Mapping** | Each authorized signatory must have DSC mapped in CDAS |

### 16.3 Encryption Requirements

| Aspect | Details |
|--------|---------|
| **API Communication** | HTTPS with TLS 1.2 or higher |
| **eDIS TransDtls** | Transaction details encrypted before transmission to CDSL |
| **Data at Rest** | CDSL maintains encryption per IT security policy |
| **Audit Trail** | Complete audit log of all transactions maintained by CDSL |

---

## 17. SLA & Timelines

### 17.1 Account Opening

| Method | Timeline | Notes |
|--------|----------|-------|
| **API (BO Setup Upload)** | 1-2 hours | Fastest; real-time validation + auto-assignment of Client ID |
| **DP Module (Online)** | 1-2 hours | Manual entry via CDAS screens |
| **File Upload (Batch)** | 1-3 business days | Depends on file size, validation, KYC verification |
| **Full E2E (including KYC)** | Same day to 2 days | If all KYC attributes verified + KRA status valid |

### 17.2 Transaction Timelines

| Operation | Timeline |
|-----------|----------|
| Off-market Transfer | T+0 (same day, before 6 PM cutoff) |
| Inter-Depository Transfer | T+0 (OLIDT, before 6 PM weekday / 2:30 PM Saturday) |
| Dematerialization | 2-5 business days (depends on RTA processing) |
| Rematerialization | 15-30 business days |
| Pledge Setup | T+0 (with OTP/TPIN) |
| Freeze/Unfreeze | T+0 |
| Account Closure | 2 working days from dues clearance |
| DDPI Activation (Online) | ~24 working hours |
| DDPI Activation (Offline) | 2-3 business days |
| Nomination Update | T+0 (via API or CDAS) |

---

## 18. Charges & Tariff

### 18.1 CDSL Charges to DPs (Effective October 2024)

| Service | Charge (Rs.) | Notes |
|---------|-------------|-------|
| **Transaction (Debit)** | Rs. 3.50 per debit transaction (flat) | Effective Oct 1, 2024 |
| **Female Holder Discount** | Rs. 0.25 discount per debit | First holder must be female |
| **Mutual Fund ISIN Discount** | Rs. 0.25 discount per debit | For MF ISINs only |
| **CM Account** | Rs. 500/month per exchange | Clearing Member account |
| **Corporate AMC** | Rs. 500/year | Annual maintenance for corporate accounts |
| **Client Securities Margin Pledge Account AMC** | Rs. 500/year | For margin pledge accounts |
| **Connectivity (Annual)** | Rs. 1,00,000+ | Varies by connectivity mode |

### 18.2 DP Charges to Clients (Indicative - Set by Individual DP)

| Charge Type | Typical Range | Notes |
|-------------|--------------|-------|
| **Account Opening Fee** | Rs. 0 - Rs. 500 | One-time; many discount brokers charge zero |
| **Annual Maintenance Charge (AMC)** | Rs. 200 - Rs. 750/year | Non-BSDA: ~Rs. 300/year (Rs. 25/month) |
| **BSDA AMC** | Rs. 0 - Rs. 100/year | Basic Services Demat Account (holdings < Rs. 10 lakh) |
| **Transaction (Debit)** | Rs. 13.50 - Rs. 25 per transaction | Rs. 3.50 CDSL + DP markup |
| **Dematerialization** | Rs. 50 - Rs. 150 per request | Per certificate |
| **Rematerialization** | Rs. 25 per 100 securities + postage | Per certificate |
| **Pledge** | Rs. 25 per ISIN | Per pledge instruction |
| **Off-Market Transfer** | Rs. 25 - Rs. 50 | Per transfer instruction |
| **DDPI** | Rs. 100 + 18% GST | One-time |

---

## 19. Error Codes & Rejection Reasons

### 19.1 CDAS Error Codes (BO/Account Operations)

Reference: Communique CDSL/OPS/DP/GENRL/2451 (May 12, 2011) + updates

| Error Code | Description |
|------------|-------------|
| CIF0002-F | BO/POA Identification Number Does Not Exist |
| CIF0003-F | BO/POA Identification Number Already Exists |
| CIF0004-F | POA Link To This BO Account Already Exists |
| CIF0005-F | DP Is Not Authorized For This Operation |
| CIF0008-F | Name And Address Does Not Exist |
| CIF0014-F | No BO Exists With This Search Name |
| DEM0330-E | DRN Status Is Not Setup |
| DEM0336-E | Not A Valid BO Category For DEMAT |

### 19.2 Common BO Setup Rejection Reasons

| # | Rejection Reason | Validation Rule | Fix |
|---|-----------------|-----------------|-----|
| 1 | Multiple email addresses | Email field must contain exactly 1 address | Parse and use single primary email |
| 2 | PAN not verified / invalid | PAN must be verified with ITD | Run PAN verification before submission |
| 3 | PAN-Aadhaar not linked | CBDT mandate for PAN-Aadhaar linkage | Client must link at incometax.gov.in |
| 4 | Name mismatch | Name across Aadhaar/PAN/form must match | Normalize names using PAN as master |
| 5 | DOB inconsistency | DOB must match across all databases | Use PAN DOB as authoritative source |
| 6 | Missing mandatory lines | Lines 01, 02, 05, 07 all required | Validate file structure before upload |
| 7 | Incomplete 6 KYC attributes | All 6 mandatory attributes must be populated | Check: Name, PAN, Address, Mobile, Email, Income |
| 8 | Missing nomination or opt-out | Mandatory since Mar 1, 2025 | Include Line 07 with nomination or opt-out |
| 9 | Duplicate PAN at same DP | Same PAN with same status cannot exist | Check existing accounts before creation |
| 10 | Missing guardian for disability | When disability flag=Y, guardian details needed | Validate conditional fields |
| 11 | Invalid date format | Must be DDMMYYYY, 8 digits | Format validation before upload |
| 12 | Numeric field not zero-padded | Right-justified with zero padding | Apply formatting rules |
| 13 | Alpha field not space-padded | Left-justified with space padding | Apply formatting rules |
| 14 | Invalid account category | Must be valid code: IND, HUF, BDC, etc. | Validate against code table |
| 15 | Invalid sub-status for category | Sub-status must match account category | Cross-validate codes |

---

## 20. Off-Market Reason Codes

Reference: CDSL Communique DP-569

| Code | Description |
|------|-------------|
| 01 | Off-Market Sale/Purchase |
| 03 | Margin Returned by Stock Broker/PCM |
| 12 | For Buy-Back |
| 13 | Open Offer for Acquisition |
| 14 | Redemption of Mutual Fund Units |
| 16 | Merger/Demerger of Corporate Entity |
| 17 | Dissolution/Restructuring/Winding Up of Partnership Firm/Trust |
| 18 | Conversion of Depository Receipt (DR) to Underlying Securities and Vice Versa |
| 88 | Transfer Between Minor Account and Guardian Account |
| 92 | Gift |
| 93 | Donation |
| 94 | Refund of Securities by IEPF Authority |
| 95 | ESOP/Transfer to Employee |
| 96 | Implementation of Govt./Regulatory Direction/Orders |
| 97 | Erroneous Transfer Pertaining to Client Securities |

> Validation: Reason code is mandatory for all off-market and inter-depository transactions. Invalid reason code = rejection.

---

## 21. Freeze / Unfreeze Framework

### 21.1 Freeze Types

| Type | Level | Description |
|------|-------|-------------|
| **BO Level Freeze** | Entire Account | All ISINs frozen for debit and/or credit |
| **BO-ISIN Level Freeze** | Specific ISIN | Only specified security frozen in the account |
| **PAN Level Freeze (Security)** | PAN across depositories | For insider trading window closure |
| **Partial Freeze** | Partial quantity | Specific quantity frozen within an ISIN |

### 21.2 Freeze Initiators

| Initiator | Typical Reason |
|-----------|---------------|
| **BO** | Self-initiated via easi/EASIEST for security |
| **DP** | Non-compliance, KYC issues, outstanding dues |
| **CDSL** | Regulatory direction, non-delivery of SCN/Orders |
| **SEBI** | Investigation, enforcement action |
| **Court** | Court orders |
| **Listed Company** | Insider trading window closure (PAN freeze at security level) |

### 21.3 Insider Trading - PAN Freeze Framework

| Aspect | Details |
|--------|---------|
| **SEBI Circulars** | Aug 5, 2022 + Jul 19, 2023 |
| **Scope** | Designated Persons of listed companies (NIFTY50/SENSEX30, extended to Top 1000) |
| **Mechanism** | PAN frozen at company's security level during trading window closure |
| **Restrictions** | On-market transactions, off-market transfers, pledge creation in equity + equity derivatives |
| **Freeze Reason Code** | 25 = "Trading Window Closure Period" |
| **Joint Holder** | If joint holder PAN = designated person, BO-ISIN level freeze applied |
| **Unfreeze** | Automatic on re-opening of trading window |

### 21.4 Freeze/Unfreeze Intimation

Per CDSL guidelines, DPs must send freeze/unfreeze intimations to BOs regularly via email/SMS.

---

## 22. Regulatory Compliance

### 22.1 Key SEBI Regulations

| Regulation / Circular | Date | Key Provision |
|----------------------|------|---------------|
| SEBI (Depositories and Participants) Regulations, 2018 | 2018 | Governing framework for depositories |
| SEBI Master Circular for Depositories | Dec 3, 2024 | SEBI/HO/MRD/MRD-PoD-1/P/CIR/2024/168 - consolidated guidelines |
| SEBI DDPI Circular | Oct 6, 2022 | DDPI replaces POA |
| SEBI Nomination Circular | Jan 10, 2025 | Up to 10 nominees, simplified transmission |
| SEBI 6 KYC Attributes | Ongoing | Mandatory matching across KRA/Exchange/Depository |
| SEBI FATCA/CRS Upload | Jul 2024 | Mandatory upload to KRA |
| SEBI PAN-Aadhaar Linkage | Ongoing | Mandatory for all demat accounts |
| SEBI BSDA Revised Criteria | Jun 28, 2024 | SEBI/HO/MIRSD/MIRSDPoD1/P/CIR/2024/91 |
| SEBI Online Closure | Jul 14, 2025 | Online closure mandatory for DPs with online services |

### 22.2 Compliance Timelines (2024-2026)

| Deadline | Requirement |
|----------|-------------|
| Oct 1, 2024 | Revised CDSL transaction charges (Rs. 3.50/debit) |
| Dec 3, 2024 | SEBI Master Circular for Depositories effective |
| Jan 10, 2025 | SEBI nomination rules (up to 10 nominees) |
| Feb 20, 2025 | Depositories to implement revised nomination norms |
| Mar 1, 2025 | Nomination compliance deadline for all accounts |
| Mar 15, 2025 | Nomination forms (digital + physical) finalized |
| Jun 30, 2025 | Mandatory dematerialization deadline (private companies - Rule 9B) |
| Jul 14, 2025 | New closure/shifting procedures effective |
| Aug 9, 2025 | Updated BSDA facility (per CDSL communique) |

### 22.3 BSDA (Basic Services Demat Account)

| Aspect | Details |
|--------|---------|
| **Eligibility** | Individual only, holdings <= Rs. 10 lakh, single depository |
| **AMC** | Rs. 0 (holdings <= Rs. 4 lakh) to Rs. 100 (holdings Rs. 4-10 lakh) |
| **Benefit** | Reduced charges for small investors |
| **Eligibility Check** | Based on data shared between CDSL and NSDL |

---

## 23. Key CDSL Communiques Reference

| Communique | Date | Subject |
|------------|------|---------|
| DP-119 | Feb 22, 2023 | BO File Format Changes |
| DP-158 | Ongoing | Status and Sub-Status for Demat Accounts (Harmonization) |
| DP-178 | Ongoing | Common Upload / Pledge / Margin Pledge File Format |
| DP-304 | Jul 13, 2021 | Mandatory Updation of Certain KYC Attributes |
| DP-317 | Ongoing | SEBI Circular - Updation of Choice of Nomination |
| DP-332 | Nov 2022 | DDPI Implementation |
| DP-340 | Ongoing | Off-Market Reason Code Validation |
| DP-384 | Ongoing | Updated Reason Code for Off-Market Execution |
| DP-404 | Ongoing | BO Setup Upload File Format |
| DP-408 | Aug 3, 2018 | Changes in BO Account Information |
| DP-411 | Ongoing | Status and Sub-Status Codes Available in CDAS |
| DP-465 | Ongoing | Consideration Amount Payment Details for Off-Market Transactions |
| DP-506 | Ongoing | Updated Status and Sub-Status for Demat Accounts |
| DP-569 | Ongoing | Off-Market Reason Codes |
| DP-595 | Ongoing | SEBI Master Circular for Depositories |
| DP-729 | Dec 15, 2023 | Additional Status, Sub-Status, and Product Codes |
| DP-730 | Dec 3, 2024 | SEBI Master Circular for Depositories (Latest) |
| DP-5456 | Ongoing | Upload File Formats (Consolidated) |
| DP-5565 | Ongoing | BO Setup/Modify Changes - CM/POA Holder |
| DP-5872 | Ongoing | Erroneous Transfer Reversal Process |

### Important URLs

| Resource | URL |
|----------|-----|
| CDSL Homepage | https://www.cdslindia.com |
| APIs Page | https://www.cdslindia.com/DP/APIs.html |
| File Formats | https://www.cdslindia.com/DP/File%20format.html |
| Harmonization (UDiFF) | https://www.cdslindia.com/DP/Harmonization.html |
| DP List | https://www.cdslindia.com/dp/dplist.aspx |
| Tariff Download | https://www.cdslindia.com/dp/tariffdownload.aspx |
| DP Communiques Index | https://www.cdslindia.com/Publications/DP-COMMUNIQUES-INDEX.aspx |
| eDIS Portal | https://edis.cdslindia.com |
| TPIN Generation | https://edis.cdslindia.com/Home/GeneratePin |
| easi/EASIEST Portal | https://web.cdslindia.com/myeasitoken/Home/Login |
| CVL KRA | https://www.cvlkra.com |
| CVL KRA Verification | https://validate.cvlindia.com/CVLKRAVerification_V1/ |
| API Services Portal | https://api.cdslindia.com/APIServices |
| CDSL Helpdesk Email | helpdesk@cdslindia.com |
| DP RTA Support | dprtasupport@cdslindia.com |
| Helpdesk Phone | 08069144800 |

---

## 24. CDSL Group Companies & Subsidiaries

### 24.1 Group Structure

| Entity | Full Name | Relationship | Incorporated | Key Function |
|--------|-----------|-------------|-------------|--------------|
| **CDSL** | Central Depository Services (India) Limited | Parent | 1999 | Securities depository (holding in demat form) |
| **CVL** | CDSL Ventures Limited | Wholly-owned subsidiary | 2006 | KRA, eKYC, eSign, RTA, GSP, Academic Depository |
| **CIRL** | Centrico Insurance Repository Limited (formerly CDSL Insurance Repository Ltd) | Subsidiary | 2011 | Electronic insurance policies (eIA) |
| **CCRL** | Countrywide Commodity Repository Limited | Subsidiary | 2017 | Electronic warehouse receipts (eNWRs) for WDRA |
| **CDSL IFSC** | CDSL IFSC Limited | Subsidiary | - | GIFT City IFSC depository operations |

### 24.2 CVL (CDSL Ventures Limited) - Detailed Services

CVL is the most integration-relevant subsidiary for stock brokers:

| Service | Description | Website |
|---------|-------------|---------|
| **CVL KRA** | KYC Registration Agency - 10+ crore KYC records, 2,700+ intermediaries | https://www.cvlkra.com |
| **Aadhaar eKYC** | CDSL/CVL is KSA/ASA with UIDAI - instant electronic KYC | https://www.cvlindia.com |
| **Aadhaar eSign** | Certifying Authority for Aadhaar-based electronic signatures | https://www.cvlindia.com |
| **CKYC Support** | Central KYC document upload facilitation to CERSAI | - |
| **RTA Services** | Registrar & Share Transfer Agent for listed companies | - |
| **GSP** | GST Suvidha Provider (MySARAL GST platform) | - |
| **Academic Depository** | CVL NAD - National Academic Depository for academic awards | https://www.academicdepository.com |
| **PMJJBY** | Pradhan Mantri Jeevan Jyoti Bima Yojana claim repository | - |
| **Accreditation Agency** | Investor accreditation services (per SEBI norms) | - |
| **SmartODR** | Online dispute resolution platform | - |

**Key Integration Note**: CVL KRA, eKYC, and eSign APIs are accessed through CVL, NOT through the CDSL depository system. These are separate API integrations with separate credentials. However, there is data flow between them:
- CVL KRA status is checked before BO account opening in CDSL
- eSign can be used for DDPI form signing
- eKYC data can populate BO setup fields

### 24.3 CIRL (Centrico Insurance Repository)

| Aspect | Details |
|--------|---------|
| **Former Name** | CDSL Insurance Repository Limited |
| **IRDAI Registration** | Registered Insurance Repository |
| **Function** | Maintain insurance policies in electronic form (eIA - e-Insurance Account) |
| **Relevance to Broking** | Not directly relevant to stock broking KYC; relevant if offering insurance products |

### 24.4 CCRL (Countrywide Commodity Repository)

| Aspect | Details |
|--------|---------|
| **WDRA Registration** | Registered repository under Warehousing Development & Regulatory Authority |
| **Function** | Electronic Negotiable/Non-Negotiable Warehouse Receipts (eNWRs/eNNWRs) |
| **Relevance to Broking** | Relevant for commodity segment operations; warehouse receipts for commodity delivery |

---

## 25. UDiFF Harmonization Initiative

### 25.1 Overview

SEBI's Market Data Advisory Committee (MDAC) mandated the **Unified Distilled File Formats (UDiFF)** to standardize data files across all Market Infrastructure Institutions (MIIs) - including CDSL, NSDL, NSE, BSE, MCX, and clearing corporations.

| Aspect | Details |
|--------|---------|
| **Initiative** | UDiFF - Unified Distilled File Formats |
| **Mandated By** | SEBI MDAC (Market Data Advisory Committee) |
| **Purpose** | Standardize and harmonize file formats across all depositories and exchanges |
| **Current Version** | UDiFF Catalogue v3.0.1.0 |
| **Guidance Document** | Annexure A - UDiFF Guidance Note V2023.11.2 |
| **CDSL Portal** | https://www.cdslindia.com/DP/Harmonization.html |
| **NSDL Portal** | https://nsdl.co.in/nsdlnews/udiff.php |
| **Last Updated** | February 4, 2026 |

### 25.2 UDiFF File Types (13 Total from CDSL)

| # | File Type | Purpose | Direction |
|---|-----------|---------|-----------|
| 1 | **ISIN Master** | Current details of admitted ISINs | CDSL -> DP |
| 2 | **Member Master** | DP, RTA, and CM details | CDSL -> DP |
| 3 | **Corporate Action Master** | RTA-setup corporate actions | CDSL -> DP |
| 4 | **CC Calendar** | Settlement calendar data | CDSL -> DP |
| 5 | **eDIS File** | BO authorizations | CDSL -> DP |
| 6 | **Statement of Holding** | Investor holdings | CDSL -> DP |
| 7 | **Statement of Transaction** | Investor transactions | CDSL -> DP |
| 8 | **COD/DP57** | Complete DP transaction dump | CDSL -> DP |
| 9 | **ISIN Rate Master** | Stock exchange traded rates | CDSL -> DP |
| 10 | **Transaction Upload** | Transaction uploads for CDAS | DP -> CDSL |
| 11 | **BO Upload** | BO creation/modification files | DP -> CDSL |
| 12 | **Client Master** | Investor details from CDAS | CDSL -> DP |
| 13 | **DIS Master** | DIS Master details | CDSL -> DP |

### 25.3 Implementation Timeline

| Date | Milestone |
|------|-----------|
| 2023 | SEBI MDAC recommends UDiFF standardization |
| Jan 18, 2025 | Harmonized file upload mandatory via DP easiest login |
| Nov 14, 2025 | Full UDiFF live release (DPs must implement back-office changes) |
| Jul 24, 2025 | Nomination Phase III updates in UDiFF catalogue |
| Feb 4, 2026 | Latest catalogue update (v3.0.1.0) |

### 25.4 Impact on Integration

- **Old format**: CDSL-proprietary fixed-length positional files (Lines 01-07)
- **New format**: UDiFF harmonized format (aligned with NSDL where possible)
- **Transition**: Both formats may be supported during transition period
- **Action Required**: Download latest UDiFF catalogue from CDSL Harmonization page and update file generation logic
- **Key Difference from NSDL**: NSDL uses UDiFF format natively; CDSL provides mapping documents between old (proprietary) and new (UDiFF) formats

---

## 26. CDAS Technical Architecture (Detailed)

### 26.1 Technology Stack

| Component | Technology |
|-----------|-----------|
| **Database** | Oracle (centralized) |
| **Application Server** | Oracle + proprietary application layer |
| **Middleware** | Tuxedo (transaction processing middleware) |
| **Storage** | EMC NAS (Network Attached Storage) - dual devices |
| **Processing Model** | Straight-Through Processing (STP) |
| **Settlement** | T+1 (since Jan 27, 2023) |
| **Architecture** | Centralized - all DPs connect to single CDAS instance |

### 26.2 DP Connectivity Architecture

```
                   ┌─────────────────────────┐
                   │      CDSL Data Center    │
                   │  ┌───────────────────┐   │
                   │  │    CDAS System     │   │
                   │  │  (Oracle + Tuxedo) │   │
                   │  └────────┬──────────┘   │
                   │           │              │
                   │  ┌────────┴──────────┐   │
                   │  │  API Gateway       │   │
                   │  │  (api.cdslindia)   │   │
                   │  └────────┬──────────┘   │
                   │           │              │
                   │  ┌────────┴──────────┐   │
                   │  │  eDIS Portal       │   │
                   │  │  (edis.cdslindia)  │   │
                   │  └────────┬──────────┘   │
                   │           │              │
                   └───────────┼──────────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
     ┌────────┴───────┐ ┌─────┴──────┐ ┌───────┴──────┐
     │  Leased Line / │ │  Internet  │ │  VSAT        │
     │  MPLS VPN      │ │  (HTTPS)   │ │  (Satellite) │
     └────────┬───────┘ └─────┬──────┘ └───────┬──────┘
              │                │                │
     ┌────────┴───────┐ ┌─────┴──────┐ ┌───────┴──────┐
     │  DP Back-Office│ │  DP Web    │ │  Remote DP   │
     │  Software      │ │  Portal    │ │  Office      │
     │  (Apex/CMC/    │ │  (Browser) │ │              │
     │   Prism/etc.)  │ │            │ │              │
     └────────────────┘ └────────────┘ └──────────────┘
```

### 26.3 Hardware Configuration (Minimum for DP)

| Component | Specification |
|-----------|--------------|
| **Processor** | Intel Core i7 or higher |
| **RAM** | 6 GB minimum |
| **Storage** | 600 GB HDD or higher |
| **Display** | AGP-compatible display card |
| **Network** | Ethernet NIC |
| **OS** | Windows 7.0 or above |
| **Database** | SQL Server Standard Edition |
| **Antivirus** | McAfee or equivalent |
| **PDF Reader** | Adobe Acrobat Reader 7+ |
| **Connectivity** | Leased line / MPLS / Internet |

### 26.4 Cost Structure for DP Setup

| Item | Amount (Rs.) |
|------|-------------|
| **Hardware (Single User)** | 57,500 |
| **Hardware (Multi-User)** | Up to 1,77,500 |
| **Security Deposit** | 5,00,000 (refundable, interest-free) |
| **Annual Charges** | 40,000 - 50,000 |
| **Connectivity Advance** | 1,00,000 (adjusted against first invoice) |
| **Insurance** | As per CDSL requirement |

### 26.5 Certifications

| Certification | Description |
|--------------|-------------|
| **ISO 27001** | Information Security Management System |
| **ISO 22301** | Business Continuity Management System (since Jun 2013) |
| **BS 7799** | Information Security Standard |

---

## 27. DP Back-Office Software Vendors

### 27.1 CDSL-Approved Vendors

Per CDSL Circular CDSL/OPS/DP/1097:

| # | Vendor | Location | Key Product |
|---|--------|----------|-------------|
| 1 | **Apex Softcell (India) Pvt Ltd** | Mumbai | LD DP Back Office |
| 2 | **Acer eSolutions Pvt Ltd** | Mumbai | DP Operations Suite |
| 3 | **Kalpataru Computer Services Pvt Ltd** | Mumbai | DP Management System |
| 4 | **CMC Limited** | Mumbai | Depository Operations |
| 5 | **Prism Cybersoft Pvt Ltd** | Mumbai | DP Back Office |
| 6 | **Winsoft Technologies (I) Pvt Ltd** | Mumbai | DP Solutions |
| 7 | **Synergy Softwares Ltd** | New Delhi | DP Back Office |

### 27.2 Back-Office Software Features (Typical)

| Feature | Description |
|---------|-------------|
| **Multi-Depository** | Handle both CDSL and NSDL operations |
| **Multi-Branch** | Branch-level operations and reporting |
| **File Upload/Download** | Auto-generate upload files (BO setup, transactions) and parse downloads (DP57, DPM3/4) |
| **CDAS Integration** | Real-time or batch connectivity with CDAS |
| **Risk Engine** | Real-time integration with risk management |
| **Billing** | Automated billing cycles per client |
| **Reporting** | Holdings, transactions, MIS, aging analysis |
| **Audit Trail** | Dual authentication and complete audit logging |
| **Digital Instruction** | Paperless instruction processing |

---

## 28. Innovation Sandbox

### 28.1 Overview

CDSL participates in SEBI's Innovation Sandbox initiative, providing a testing platform for fintech companies, startups, and developers.

| Aspect | Details |
|--------|---------|
| **Purpose** | Testing and knowledge platform for innovators in Indian securities market |
| **Eligibility** | Startups, fintechs, educational institutions, individuals |
| **Application Portal** | https://innovation-sandbox.in |
| **Data Provided** | Unformatted account statements in data format |
| **File Specs** | Full specification and sample files for account statements |
| **Review Process** | Applications reviewed by committee |
| **Notable User** | Finzoom (developer of INDmoney app) |

### 28.2 What Sandbox Provides

- Account statement data in machine-readable format
- File format specifications and sample files
- Test environment for prototype development
- Guidance on communiques covering BO info, KYC, file formats, off-market, demat, pledge operations

### 28.3 Sandbox vs Production API Access

| Aspect | Innovation Sandbox | Production API |
|--------|-------------------|----------------|
| **Access** | Open application via portal | Registered DP only |
| **Data** | Sample/test data | Live production data |
| **Credentials** | Sandbox-specific | API key from CDSL |
| **Use Case** | Prototyping, learning | Live operations |
| **Contact** | innovation-sandbox.in | dprtasupport@cdslindia.com |

---

## 29. Online BO Account Opening (eKYC Flow)

### 29.1 eKYC at CDSL Level

| Aspect | Details |
|--------|---------|
| **CDSL Role** | KYC Service Agency (KSA) / Authentication Service Agency (ASA) with UIDAI |
| **Service** | Aadhaar-based eKYC providing instant PoI + PoA |
| **Data Returned** | Name, address, DOB, gender, mobile, email (from Aadhaar) |
| **Replaces** | Physical Proof of Identity and Proof of Address documents |
| **KUA/AUA** | DP accesses eKYC through CDSL as registered KSA/ASA |

### 29.2 Online BO Opening Flow (for DP/Broker)

```
Step 1: Client initiates account opening on broker app/website
   ↓
Step 2: PAN verification (via Protean/NSDL or vendor like Decentro)
   ↓
Step 3: KRA lookup (CVL KRA or other KRA)
   - If found: Download KYC data, display to client for confirmation
   - If not found: Fresh KYC required
   ↓
Step 4: Aadhaar eKYC (via CDSL KSA/ASA or DigiLocker)
   - OTP-based consent
   - Returns: Name, Address, DOB, Gender, Photo
   ↓
Step 5: Photograph capture with:
   - Timestamp
   - Geo-location tagging
   - Liveliness check (blink/nod detection)
   ↓
Step 6: Bank account verification (Penny Drop / RPD)
   ↓
Step 7: Client signs digitally (Aadhaar eSign via CVL/Leegality)
   ↓
Step 8: DP generates BO Setup file (Lines 01, 02, 05, 07 minimum)
   ↓
Step 9: Upload via BO Setup API or batch file upload to CDAS
   ↓
Step 10: CDSL assigns Client ID → 16-digit BO ID generated
   ↓
Step 11: Client receives demat account credentials
```

### 29.3 KRA Data Integration During BO Opening

When DP opens account based on KRA download:
- KYC details downloaded from KRA must be displayed to client
- Client must confirm no changes in downloaded details
- If changes exist, client must provide updated details
- Updated details must be submitted back to KRA (modify flow)

---

## 30. UAT / Test Environment vs Production (Deep Dive)

### 30.1 Environment Endpoints

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

### 30.2 Test vs Production Environment Differences

| Aspect | UAT / Test | Production |
|--------|-----------|------------|
| **DP ID** | Test DP ID assigned by CDSL (unique per testing entity) | Real DP ID (8 digits, assigned at registration) |
| **Client IDs** | Test Client IDs (no real securities) | Real Client IDs auto-assigned by CDAS |
| **API Key** | Separate test API key (may have shorter validity) | Production API key (longer validity, strict rotation) |
| **eDIS API Key** | Test eDIS key (separate from production) | Production eDIS API key |
| **Data** | Synthetic data; no real securities or settlements | Live market data, real ISINs, real settlements |
| **DSC** | Test DSC certificates (relaxed requirements) | Production DSC from Registered Authority of TCS (mandatory) |
| **Connectivity** | Internet access sufficient; no leased line needed | Leased line / MPLS / Internet with IP whitelisting |
| **IP Whitelisting** | May be relaxed; dynamic IPs may be allowed | Static IPs mandatory; registered with CDSL |
| **SSL/TLS** | TLS 1.2 (same as production) | TLS 1.2 or higher (mandatory) |
| **TransDtls Encryption** | Same encryption algorithm as production | Same encryption, production keys |
| **Settlement** | No real settlement; simulated settlement cycle | T+1 live settlement |
| **Audit Logging** | Minimal / test-only | Full audit trail per SEBI requirements |
| **Go-Live** | Self-service testing | Requires CDSL UAT sign-off certification |

### 30.3 UAT Certification Process

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
   ├─ IP whitelisting configured for production servers
   ├─ DSC mapping completed for all authorized signatories
   ├─ Leased line / MPLS / Internet connectivity certified
   ├─ Production security configuration verified
   └─ Go-Live approval issued by CDSL
```

### 30.4 CDSL Innovation Sandbox (Extended)

| Aspect | Details |
|--------|---------|
| **Governance** | SEBI Innovation Sandbox Committee |
| **Eligibility** | Fintech startups, registered intermediaries, educational institutions, individual innovators |
| **Application** | Via SEBI Innovation Sandbox portal (https://innovation-sandbox.in) |
| **Cost** | Free for approved applicants |
| **Duration** | Defined testing window per approval |
| **Test Data** | Synthetic account statements, holding data, transaction data |
| **File Formats Provided** | Unformatted account statements, BO upload/download specifications, sample files |
| **Guidelines** | Operating Guidelines v3 (final) on CDSL website |
| **Notable User** | Finzoom (developer of INDmoney app) - used sandbox for portfolio dashboard development |
| **Reference** | https://www.cdslindia.com/Publications/InnovationSandbox.html |

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

## 31. Request Tracking & Sequence Numbers (Deep Dive)

### 31.1 Unique Sequence Number Field

| Aspect | Details |
|--------|---------|
| **Field Name** | Unique Sequence Number |
| **Present In** | BO setup upload, BO modify upload, and transaction uploads |
| **Mandatory Since** | October 30, 2015 (initially optional; uniqueness checked if populated) |
| **Uniqueness Scope** | Per DP ID - each DP maintains its own sequence space |
| **Validation** | CDSL checks uniqueness across all records ever submitted by the DP |
| **Purpose** | Prevent duplicate submissions; enable idempotent retries |
| **Format** | Numeric; DP-defined; must be unique across all submissions (no reuse) |

### 31.2 Request Reference Number Types

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

### 31.3 Sequence Number Best Practices

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

### 31.4 File Naming Conventions

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

### 31.5 File Upload Acknowledgment & Status Polling Flow

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

### 31.6 Upload Processing Modes

| Mode | Behavior | Use Case |
|------|----------|----------|
| **File Level Upload** | Entire file processed if ALL records valid; entire file rejected if ANY record fails | Critical batch where all-or-nothing is needed |
| **Record Level Upload** | Successful records processed; error records rejected individually | Routine batch processing; partial success acceptable |

### 31.7 Date of Receipt Tracking (SEBI Mandate)

Per SEBI directive, CDSL mandates that DPs capture the date of receipt of request from BO for all transaction types. This field is present in:
- Online CDAS entry screens
- File upload formats (both BO setup and transaction uploads)
- API request payloads

Purpose: Audit trail for SLA compliance. CDSL uses this to monitor DP adherence to processing timelines (e.g., 2-day closure SLA, same-day off-market processing).

### 31.8 DP57 Report Generation Schedule

| Time | Report Type | Content |
|------|------------|---------|
| **Intra-day (multiple)** | Incremental (I) | Transactions processed since last incremental |
| **End of Day** | Full (F) | All transactions for the entire business day |
| **On-demand** | Full or Incremental | DP can request specific time window |

The DP57 single download was activated for all DPs with effect from January 18, 2011, replacing the need for separate module-specific downloads.

---

## 32. Security & Encryption (Extended Deep Dive)

### 32.1 Multi-Layered Security Architecture

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

### 32.2 Digital Signature Certificate (DSC) - Comprehensive

| Aspect | Details |
|--------|---------|
| **Primary CA** | Sify Safescrypt (CDSL-approved Certifying Authority) |
| **Other CAs** | eMudhra, nCode, (s)TRUST (Capricorn) - BOs can use DSC from any RA |
| **DSC Class** | Class 3 Digital Signature Certificate |
| **Token Type** | Hardware USB e-Token (software certificates NOT accepted) |
| **Issuance Time** | 7-10 working days from application |
| **Validity Period** | Typically 2-3 years; must be renewed before expiry |
| **Required For** | All on-market, off-market, early pay-in, and inter-depository transactions |
| **Mapping** | Each authorized signatory's DSC must be mapped to their CDAS user profile |
| **Self-Authorization** | NOT allowed - DSC signatory must differ from DP authorized signatory |
| **BO DSC for EASIEST** | BO submits filled Annexure + DSC screenshot to DP; DP verifies and sends to CDSL |
| **No BO Charge** | CDSL does not charge for mapping DSC from other RAs to BO's EASIEST login |
| **Renewal** | Must renew before expiry; expired DSC blocks transaction authorization |

### 32.3 DSC Mapping Checklist (from CDSL Official Checklist)

| # | Checklist Item | Required |
|---|---------------|----------|
| 1 | DSC Authorized Signatory name DIFFERENT from DP Authorized Signatory | Mandatory |
| 2 | Clear and visible snapshot of DSC details provided | Mandatory |
| 3 | Duly filled and signed Annexure (individual BO/CBO/CM form) | Mandatory |
| 4 | Print screen of Digital Signature Certificate details attached | Mandatory |
| 5 | DP verification stamp and signature on the form | Mandatory |
| 6 | Form submitted to CDSL for DSC-to-user mapping | Mandatory |

### 32.4 eDIS Encryption Details

| Aspect | Details |
|--------|---------|
| **Encrypted Field** | `TransDtls` parameter in VerifyDIS API call |
| **Content** | ISIN, quantity, exchange (NSE/BSE/MCX), segment (CM/FO/CD/COM), bulk flag |
| **Encryption** | DP encrypts using CDSL-provided encryption key and algorithm |
| **Key Provisioning** | Encryption parameters provided in API documentation during DP registration |
| **Key Rotation** | CDSL may rotate encryption keys; DP must implement key update mechanism |
| **Decryption** | CDSL decrypts server-side on eDIS portal |
| **TPIN Entry** | ALWAYS on CDSL's eDIS webpage - never on DP portal (prevents DP from capturing TPIN) |
| **OTP Delivery** | CDSL sends directly to BO's registered mobile (DP has zero access) |

### 32.5 WebCDAS Browser Security Configuration

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

> **Migration Note**: CDSL has been progressively migrating to WebCDAS (browser-based) and REST APIs to reduce dependency on thick-client DP Module and ActiveX. Newer APIs (BO Setup, Transaction Upload, eDIS) are REST-based and browser-agnostic.

### 32.6 IP Whitelisting Requirements

| Aspect | Details |
|--------|---------|
| **Requirement** | All DP servers calling CDSL APIs must have their IP addresses registered |
| **IP Type** | Static IPs only (dynamic IPs NOT permitted for production) |
| **Scope** | Primary data center + DR site IPs |
| **Multiple IPs** | Supported - DP can register multiple IPs |
| **VPN Egress** | If DP connects via VPN, the VPN exit (egress) IP must be whitelisted |
| **Change Process** | Written request to CDSL operations team; 2-3 working days to update |
| **UAT Relaxation** | Dynamic IPs may be allowed for test/UAT environment |
| **Verification** | CDSL may periodically verify that registered IPs are still in use |

### 32.7 Connectivity Security Comparison

| Mode | Encryption | Authentication | Security Level | Monthly Cost | Best For |
|------|-----------|----------------|----------------|-------------|----------|
| **Local Leased Line** | Physical isolation (inherently secure) | N/A (dedicated circuit) | Highest | Rs. 8K-15K/month | Large DPs with high volume |
| **MPLS VPN** | Provider-managed label switching | Provider credentials + SLA | High | Rs. 4K-8K/month | Multi-branch DPs |
| **Site-to-Site VPN (IPSec)** | IPSec tunnel encryption | Certificate + pre-shared key | High | Rs. 2K-4K/month | Cost-effective secure connectivity |
| **Internet (HTTPS Direct)** | TLS 1.2+ for API calls | API Key + IP whitelisting | Moderate | Existing internet cost | API-only integration, small DPs |
| **VSAT** | Satellite encryption | VSAT credentials | Moderate | Rs. 10K-20K/month | Remote/rural locations |

### 32.8 CDSL Data Center Security

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

## 33. CDSL Connectivity Options (Extended Deep Dive)

### 33.1 Connectivity Architecture Diagram

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  DP Head Office                                                      │
│  ┌────────────────────────┐                                          │
│  │  DP Back-Office System │                                          │
│  │  ┌──────────────────┐  │                                          │
│  │  │ CDAS DP Module   │──├──── Leased Line ────┐                    │
│  │  │ (Thick Client)   │  │                     │                    │
│  │  └──────────────────┘  │                     │                    │
│  │  ┌──────────────────┐  │                     ▼                    │
│  │  │ WebCDAS          │──├──── MPLS VPN ──── ┌─────────────┐        │
│  │  │ (Browser-based)  │  │                   │  CDSL Data   │        │
│  │  └──────────────────┘  │                   │  Center      │        │
│  │  ┌──────────────────┐  │                   │             │        │
│  │  │ API Integration  │──├──── Internet ──── │  ┌─────┐    │        │
│  │  │ (REST APIs)      │  │    (HTTPS +       │  │CDAS │    │        │
│  │  └──────────────────┘  │     IP whitelist) │  │     │    │        │
│  └────────────────────────┘                   │  └─────┘    │        │
│                                               │             │        │
│  DP Branch Office(s)                          │  ┌─────┐    │        │
│  ┌────────────────────────┐                   │  │eDIS │    │        │
│  │  Branch Terminal       │──── Internet ──── │  │Portal│    │        │
│  │  (WebCDAS only)        │    + Site-to-Site │  └─────┘    │        │
│  │                        │      VPN          │             │        │
│  └────────────────────────┘                   │  ┌─────┐    │        │
│                                               │  │ API  │    │        │
│  Remote DP (rural)                            │  │ Gwy  │    │        │
│  ┌────────────────────────┐                   │  └─────┘    │        │
│  │  VSAT Terminal         │──── VSAT ──────── │             │        │
│  └────────────────────────┘                   └──────┬──────┘        │
│                                                      │               │
│                                               ┌──────┴──────┐        │
│                                               │  CDSL DR     │        │
│                                               │  Site         │        │
│                                               └──────────────┘        │
└──────────────────────────────────────────────────────────────────────┘
```

### 33.2 Connectivity Setup Process

```
Step 1: Choose Connectivity Mode
   ├─ Leased Line (highest security, highest cost)
   ├─ MPLS VPN (managed by telecom provider)
   ├─ Internet + VPN (cost-effective, adequate for API-only)
   ├─ VSAT (for remote locations)
   └─ Internet Direct (API-only, with IP whitelisting)

Step 2: Download Connectivity Form from CDSL
   └─ Available at: https://ww1.cdslindia.com/dp/dpconnectivity.html

Step 3: Submit Form + Advance Payment
   ├─ Connectivity form duly completed
   ├─ Advance payment: Rs. 1,00,000 (favouring CDSL)
   └─ Payment adjusted against first annual invoice after commissioning

Step 4: CDSL Provisions Connectivity
   ├─ Assigns IP ranges (for leased line/MPLS)
   ├─ Configures firewall rules
   ├─ Provides network parameters
   └─ Coordinates with telecom provider (if leased line/MPLS)

Step 5: DP Installs Hardware
   ├─ Procure CDSL-specified hardware configuration
   ├─ Install at secure location in DP office
   ├─ Configure network parameters
   └─ Install DP Module / configure WebCDAS browser

Step 6: Connectivity Testing
   ├─ Verify network reachability to CDSL servers
   ├─ Test CDAS login and basic operations
   ├─ Verify file upload/download functionality
   └─ Confirm API connectivity (if applicable)

Step 7: Go-Live Certification
   └─ CDSL certifies connectivity as production-ready
```

### 33.3 Hardware Configuration (CDSL-Specified)

**Single User Setup** (Estimated Rs. 57,500):

| Component | Specification |
|-----------|--------------|
| Processor | Intel Core i7 (or equivalent) |
| RAM | 6 GB minimum |
| Storage | 600 GB+ hard drive |
| Display | 15" SVGA monitor or TFT |
| Network | Network Interface Card (NIC) |
| Ports | Serial / Parallel / USB (for DSC e-Token) |
| OS | Windows 7.0 or above |
| Database | SQL Server Standard Edition |
| Antivirus | McAfee (recommended by CDSL) |
| PDF Reader | Adobe Acrobat Reader 7.0+ |

**Multi-User Server + Node Setup** (Estimated Rs. 1,77,500):

| Component | Specification |
|-----------|--------------|
| Server | Higher-spec processor + additional RAM + RAID storage |
| Nodes | Standard workstations connected to server via LAN |
| Network | Ethernet LAN between server and workstation nodes |
| Dedicated Usage | Hardware EXCLUSIVELY for CDSL operations (SEBI requirement) |

### 33.4 Real-Time vs Batch Processing Comparison

| Aspect | Real-Time (API) | Batch (File Upload) |
|--------|-----------------|---------------------|
| **BO Account Opening** | BO Setup Upload API - immediate validation, Client ID returned | BO Setup File - batch processing (minutes to hours) |
| **Transactions** | CDAS online entry / Transaction Upload API | Common Upload file (XML-tag format) |
| **eDIS** | REST API (VerifyDIS) - real-time authorization | N/A (always real-time) |
| **Pledge** | Margin Pledge API - real-time with OTP | Pledge in Common Upload file |
| **Reports** | DP57 incremental (multiple times intra-day) | DPM3 (weekly), DPM4 (daily), Client Master (daily EOD) |
| **Latency** | Seconds to minutes | Minutes to hours |
| **Throughput** | Lower (per-request overhead) | Higher (bulk processing) |
| **Error Handling** | Immediate per-record feedback | Batch rejection report (download after processing) |
| **Reliability** | Network-dependent; needs retry logic | More resilient; file can be re-uploaded |
| **Recommended For** | Online KYC (individual account opening), urgent operations | Bulk migration, corporate onboarding, end-of-day reconciliation |
| **Fallback** | File upload as fallback for API downtime | API for urgent/priority accounts |

### 33.5 CDAS Processing Windows

| Operation | Weekday Window | Saturday (1st/3rd/5th) | Sunday/Holiday |
|-----------|---------------|------------------------|----------------|
| **BO Setup (API)** | ~9:00 AM - 6:00 PM | ~9:00 AM - 2:30 PM | Closed |
| **BO Setup (File)** | Upload anytime; processed in batches | Upload anytime; processed in batches | Upload queued for next business day |
| **Off-Market Transfer** | Until 6:00 PM | Until 2:30 PM | Closed |
| **IDT (Inter-Depository)** | Until 6:00 PM | Until 2:30 PM | Closed |
| **eDIS Authorization** | Market hours + grace period | Market hours + grace | Closed |
| **DP57 Incremental** | Multiple times during day | Multiple times during day | N/A |
| **DP57 Full (EOD)** | After market close | After market close | N/A |
| **DPM3/DPM4 Download** | Available after EOD processing | Available after EOD | Available (previous day's data) |

### 33.6 API vs File Upload Decision Matrix

| Factor | Prefer API | Prefer File Upload |
|--------|-----------|-------------------|
| Volume | < 100 accounts/day | > 100 accounts/day |
| Latency | Real-time confirmation needed | Next-day processing acceptable |
| Error Handling | Per-record immediate feedback | Batch rejection report |
| Reliability | Network-dependent | More resilient to connectivity issues |
| Monitoring | API response codes + HTTP status | File acceptance ACK + status polling |
| Integration Effort | REST client implementation | File generation + SFTP/upload + result parsing |
| Recommended | Online KYC, individual account opening | Bulk migration, corporate onboarding, batch operations |
| Fallback Strategy | File upload as fallback for API downtime | API for urgent/priority accounts during batch delay |

### 33.7 Back-Office Software Ecosystem

Several third-party vendors provide pre-built CDSL integration:

| Provider | Product | Key CDSL Features |
|----------|---------|-------------------|
| **Comtek** | DPBackOffice | DP50/DPE2 import, DP57 parsing, DPM3/4 reconciliation, auto pay-in file, CDSL format export/import, branch merge |
| **Tplus** | CROSS | Full demat request management, CDAS data entry + auth + upload, back-office reconciliation, billing |
| **DPSecure** | DPSecure Cloud | Cloud-based CDSL DP operations, CDAS integration, compliance reporting |
| **63 Moons** | ODIN | Integrated trading + depository module, direct CDAS connectivity, risk management |
| **Apex Softcell** | LD DP BackOffice | CDSL-approved vendor, full BO lifecycle management |
| **Prism Cybersoft** | DP Back Office | CDSL-approved, multi-branch support |

---

## 34. DDPI Deep Dive - Demat Debit and Pledge Instruction

### 34.1 Regulatory Background

DDPI was introduced through a series of SEBI circulars to replace the broad-scope Power of Attorney (POA) with a limited-purpose authorization:

| Circular | Date | Subject |
|----------|------|---------|
| SEBI/HO/MIRSD/DoP/P/CIR/2022/44 | April 4, 2022 | Initial DDPI framework for settlement delivery + pledge/re-pledge |
| SEBI/HO/MIRSD/DoP/P/CIR/2022/119 | June 2022 | Implementation extension |
| SEBI/HO/MIRSD-PoD-1/P/CIR/2022/137 | October 6, 2022 | Expanded scope: MF on exchange + open offer tendering |
| SEBI/HO/MIRSD/DoP/P/CIR/2022/153 | November 2022 | Further implementation extension |
| CDSL Communique DP-332 | June 14, 2022 (implemented Nov 2022) | CDSL system implementation of DDPI |
| CDSL Communique DP-5565 | Ongoing | BO Setup/Modify file format changes for DDPI/POA holder fields |

### 34.2 Four DDPI Authorization Types

DDPI is limited to exactly four purposes (no broader authority):

| # | Authorization Type | Description | SEBI Circular |
|---|-------------------|-------------|---------------|
| 1 | **Settlement Delivery** | Transfer of securities held in BO account towards stock exchange-related deliveries / settlement obligations arising out of trades executed by the client | Apr 2022 (original) |
| 2 | **Pledge / Re-pledge for Margin** | Pledging / re-pledging of securities in favour of TM/CM for the purpose of meeting margin requirements of the client | Apr 2022 (original) |
| 3 | **Mutual Fund on Exchange** | Mutual fund transactions being executed on stock exchange order entry platforms (e.g., BSE StAR MF, NSE MFSS) | Oct 2022 (amendment) |
| 4 | **Open Offer Tendering** | Tendering shares in open offers through stock exchange platforms (takeover / buyback offers routed via exchange) | Oct 2022 (amendment) |

> **CRITICAL**: Any other use (e.g., off-market transfers, inter-depository transfers, gift transfers) is NOT covered by DDPI. These require eDIS (TPIN + OTP) authorization.

### 34.3 DDPI vs POA - Detailed Comparison

| Aspect | DDPI (Current) | POA (Legacy - Discontinued for new clients) |
|--------|---------------|----------------------------------------------|
| **Scope** | Limited to 4 specific purposes only | Broad - could cover any demat operation |
| **Legal Instrument** | Standardized SEBI-prescribed format | General POA on stamp paper |
| **Stamp Duty** | Required (varies by state: Rs. 100 typical) | Required (higher in many states) |
| **Digital Execution** | Aadhaar eSign supported (hybrid: digital sign + stamp duty) | Generally physical only |
| **Activation Time** | ~24 working hours (online via eSign) | 2-5 business days (physical processing) |
| **Cost to Client** | Rs. 100 + 18% GST = Rs. 118 (one-time) | Rs. 100-500 (varied) |
| **Revocation** | Anytime by BO, effective immediately | Anytime by BO |
| **Risk** | Low - limited scope, no misuse of broader powers | High - broad authority, potential misuse |
| **New Clients (post Sep 2022)** | Only option available | Not accepted |
| **Existing POA Holders** | POA remains valid until client revokes | N/A |
| **Nominee Action** | Person acting under DDPI CANNOT add/modify nominees | Person acting under POA CANNOT add nominees (Jan 2025 rule) |

### 34.4 CDSL DDPI Implementation - Technical Details

#### 34.4.1 POA_TYPE_FLAG in BO File Format

CDSL introduced a new field `POA_TYPE_FLAG` in the BO Setup/Modify file format per Communique DP-332:

| POA_TYPE_FLAG Value | Meaning |
|--------------------|---------|
| **P** | Traditional POA (legacy, existing clients only) |
| **D** | DDPI (Demat Debit and Pledge Instruction) |
| **N** | No POA / No DDPI (client uses eDIS TPIN+OTP for each transaction) |

#### 34.4.2 DDPI Master POA ID Creation

```
Step 1: DP creates DDPI Master POA ID in CDAS
   - POA_TYPE_FLAG = 'D'
   - DDPI authorization details populated
   |
Step 2: DP links DDPI Master POA ID to the BO's demat account
   - Via BO Modify Upload API or CDAS Web Portal
   - Line 06 (Additional Details) updated with DDPI linkage
   - Line 21 repeated for each CM POA / PMS POA / DDPI Account Mapping combination
   |
Step 3: CDSL activates DDPI flag on BO account
   - BO account now has DDPI = Active
   - Settlement debits, margin pledges, MF/open offer handled automatically
```

#### 34.4.3 Online DDPI Submission Flow (DP Integration)

```
┌──────────────────┐     ┌───────────────┐     ┌──────────────┐     ┌──────────┐
│  Broker App/Web  │     │   eSign API   │     │  CDSL CDAS   │     │   BO     │
│  (DP System)     │     │  (Leegality/  │     │              │     │ (Client) │
│                  │     │   Digio)      │     │              │     │          │
└────────┬─────────┘     └──────┬────────┘     └──────┬───────┘     └────┬─────┘
         │                      │                      │                  │
         │  1. Client clicks    │                      │                  │
         │     "Activate DDPI"  │                      │                  │
         │ <──────────────────────────────────────────────────────────────│
         │                      │                      │                  │
         │  2. Generate DDPI    │                      │                  │
         │     document         │                      │                  │
         │     (pre-filled BO   │                      │                  │
         │      details)        │                      │                  │
         │                      │                      │                  │
         │  3. Send to eSign    │                      │                  │
         │ ────────────────────>│                      │                  │
         │                      │                      │                  │
         │                      │  4. Aadhaar OTP      │                  │
         │                      │     to client        │                  │
         │                      │ ───────────────────────────────────────>│
         │                      │                      │                  │
         │                      │  5. Client enters    │                  │
         │                      │     OTP              │                  │
         │                      │ <───────────────────────────────────────│
         │                      │                      │                  │
         │  6. Signed DDPI      │                      │                  │
         │     document         │                      │                  │
         │ <────────────────────│                      │                  │
         │                      │                      │                  │
         │  7. Collect stamp    │                      │                  │
         │     duty (Rs. 100    │                      │                  │
         │     + GST) via PG    │                      │                  │
         │ <──────────────────────────────────────────────────────────────│
         │                      │                      │                  │
         │  8. Upload DDPI to   │                      │                  │
         │     CDSL via BO      │                      │                  │
         │     Modify API       │                      │                  │
         │ ───────────────────────────────────────────>│                  │
         │                      │                      │                  │
         │  9. CDSL activates   │                      │                  │
         │     DDPI (~24 hrs)   │                      │                  │
         │ <───────────────────────────────────────────│                  │
         │                      │                      │                  │
         │  10. Confirmation    │                      │                  │
         │      to client       │                      │                  │
         │ ──────────────────────────────────────────────────────────────>│
```

### 34.5 DDPI BO Modify File Format

When activating DDPI, the DP submits a BO Modify file with Line 06 (Additional Details) updated:

| Field | Type | Length | Value | Description |
|-------|------|--------|-------|-------------|
| POA_TYPE_FLAG | Alpha | 1 | `D` | Indicates DDPI |
| POA_MASTER_ID | Alphanumeric | 16 | DDPI Master POA ID | CDAS-assigned ID for the DDPI record |
| POA_HOLDER_NAME | Alpha | 100 | Broker/DP name | Name of DDPI holder (the broker) |
| POA_HOLDER_PAN | Alphanumeric | 10 | Broker PAN | PAN of the DDPI holder entity |
| DDPI_AUTH_SETTLEMENT | Alpha | 1 | `Y`/`N` | Authorization for settlement delivery |
| DDPI_AUTH_PLEDGE | Alpha | 1 | `Y`/`N` | Authorization for pledge/re-pledge |
| DDPI_AUTH_MF | Alpha | 1 | `Y`/`N` | Authorization for MF on exchange |
| DDPI_AUTH_OPENOFFER | Alpha | 1 | `Y`/`N` | Authorization for open offer tendering |
| DDPI_ESIGN_DATE | Numeric | 8 | DDMMYYYY | Date of eSign |
| DDPI_ESIGN_REF | Alphanumeric | 30 | eSign reference | eSign transaction ID from Aadhaar eSign |
| DDPI_STAMP_DUTY_REF | Alphanumeric | 20 | Stamp duty ref | Stamp duty payment reference |
| DDPI_EFFECTIVE_DATE | Numeric | 8 | DDMMYYYY | Date DDPI becomes effective |

> **NOTE**: Exact field positions are in CDSL Communique DP-332 and DP-5565. These are estimated fields based on public documentation. Obtain the full spec from CDSL after DP registration.

### 34.6 DDPI Modification and Revocation

#### 34.6.1 Client-Initiated Revocation

| Aspect | Details |
|--------|---------|
| **Right** | Client can revoke DDPI at any time without giving reasons |
| **Process** | Submit revocation request to DP (online or physical) |
| **DP Obligation** | Must process revocation within 1 working day |
| **Effect** | DDPI flag set to inactive; client must use eDIS (TPIN+OTP) for all subsequent transactions |
| **CDSL Update** | DP submits BO Modify with POA_TYPE_FLAG = 'N' |
| **Re-activation** | Client can submit new DDPI anytime (fresh process + stamp duty) |
| **SEBI Mandate** | Stock exchanges and depositories shall ensure that brokers have enabled clients to revoke/cancel DDPI |

#### 34.6.2 Broker-Initiated Deactivation

| Scenario | Action |
|----------|--------|
| Client closure of trading account | DDPI automatically deactivated |
| DP registration cancelled | All DDPI under that DP deactivated |
| Regulatory order | CDSL can deactivate DDPI as per SEBI/court order |

#### 34.6.3 DDPI Modification

DDPI modification is limited - the four authorization types are all-or-nothing in practice. If a client wants to change authorization scope:

1. Revoke existing DDPI
2. Submit new DDPI with updated authorizations
3. Fresh stamp duty required

### 34.7 Trading Flow: With vs Without DDPI

#### With DDPI Active:
```
Client sells shares --> Broker executes trade on exchange -->
T+1: Clearing Corporation sends delivery obligation -->
Broker automatically debits shares from client BO account (DDPI authorized) -->
Shares delivered to CC for settlement -->
T+1 settlement complete
```

#### Without DDPI (eDIS):
```
Client sells shares --> Broker executes trade on exchange -->
T+0/T+1: Client receives eDIS authorization request -->
Client redirected to CDSL eDIS portal (edis.cdslindia.com) -->
Client enters TPIN (6-digit) --> CDSL sends OTP to registered mobile -->
Client enters OTP --> Authorization complete -->
Broker debits shares --> Delivered to CC --> Settlement complete

RISK: If client misses TPIN+OTP window --> Short delivery -->
      Auction penalty (20% + 5% annualized) on the broker
```

### 34.8 DDPI Stamp Duty Considerations

| State | E-Stamp Duty for DDPI | Notes |
|-------|-----------------------|-------|
| Maharashtra | Rs. 100 | Can be paid via SHCIL e-Stamp |
| Karnataka | Rs. 100-200 | e-Stamping via KSRSAC |
| Delhi | Rs. 100 | Via e-Stamp portals |
| Tamil Nadu | Rs. 100 | Via TNREGINET |
| Other States | Rs. 50-200 | Varies; broker typically handles payment |

> **Implementation Note**: Most brokers collect a flat Rs. 100 + GST from the client and handle stamp duty procurement. The e-stamping can be automated via SHCIL/NeSL APIs.

### 34.9 DDPI Processing Timeline

| Stage | Online (eSign) | Offline (Physical) |
|-------|---------------|-------------------|
| Client initiates | T+0 | T+0 |
| Document generation | Instant | N/A |
| eSign / Physical sign | T+0 (minutes) | T+0 to T+2 (courier) |
| Stamp duty payment | T+0 (online PG) | T+0 (stamp paper) |
| Upload to CDSL | T+0 | T+1 to T+3 |
| CDSL processing | ~24 working hours | 2-3 working days |
| DDPI active | T+1 | T+3 to T+5 |

---

## 35. MTF (Margin Trading Facility) - CDSL Pledge Operations

### 35.1 Regulatory Framework

The margin pledge framework was introduced by SEBI to eliminate the older title-transfer system where brokers physically held client securities:

| Circular | Date | Subject |
|----------|------|---------|
| SEBI/HO/MIRSD/DOP/CIR/P/2020/28 | Feb 25, 2020 | Margin obligations by way of Pledge/Re-pledge in Depository System |
| SEBI/HO/MIRSD/DOP/CIR/P/2020/88 | Jun 1, 2020 | Extension of timeline to August 1, 2020 |
| CDSL Communique DP-234 | May 22, 2020 | Operational modalities and file formats for margin pledge/re-pledge |
| CDSL Communique DP-412 | August 2020 | Margin Pledge/Re-Pledge implementation |
| CDSL/OPS/DP/POLCY/2024/314 | Jun 7, 2024 | Revised file format with mandatory rejection reason code field |
| SEBI/HO/MIRSD/MIRSD-PoD/P/CIR/2025/82 | Jun 3, 2025 | Automated pledge release + invocation mechanism |
| SEBI extension | Aug 2025 | Extended automation deadline to October 10, 2025 |

### 35.2 Pledge Ecosystem Architecture

```
┌─────────────────┐
│   CLIENT (BO)   │
│   Demat Account │  Securities remain HERE
│   (16-digit ID) │  throughout the pledge lifecycle
└────────┬────────┘
         │
         │ Margin Pledge (Client --> TM/CM)
         │ Client authorizes via TPIN+OTP or DDPI
         v
┌─────────────────────────────────┐
│  BROKER (TM/CM)                 │
│  Client Securities Margin       │
│  Pledge Account (CUSPA)         │
│  Sub-status code: 40            │
└────────┬────────────────────────┘
         │
         │ Re-pledge (TM --> CM --> CC)
         │ Broker re-pledges to Clearing Corporation
         v
┌─────────────────────────────────┐
│  CLEARING CORPORATION           │
│  (NSCCL / ICCL / MCXCCL)       │
│  Receives re-pledge lien        │
│  Provides margin credit         │
└─────────────────────────────────┘
```

**Key Principle**: Securities NEVER leave the client's demat account. Only pledge liens are created in the depository system, maintaining full audit trail. Client continues to receive dividends, bonuses, and other corporate action benefits.

### 35.3 Three Types of Pledges in CDSL

| Pledge Type | Purpose | Pledgor --> Pledgee | OTP Required |
|-------------|---------|---------------------|--------------|
| **Normal Pledge** | Loan Against Shares (eLAS) | Client --> NBFC/Bank | Yes (TPIN+OTP) |
| **Margin Pledge** | Margin collateral for trading | Client --> TM/CM CUSPA | Yes (TPIN+OTP) or DDPI |
| **MTF Pledge** | Margin Trading Facility funding | Client --> TM/CM Funding Account | Yes (TPIN+OTP) or DDPI |

### 35.4 Margin Pledge Process Flow

#### 35.4.1 Client-to-Broker Pledge (Margin Pledge)

```
Step 1: Client selects securities to pledge via broker app
   |
Step 2: Broker initiates margin pledge request in CDSL
   - Transaction Type: Margin Pledge
   - Pledgor: Client BO ID (16-digit)
   - Pledgee: Broker's CUSPA ID
   - ISIN + Quantity specified
   |
Step 3: CDSL sends authentication link to client
   - Email: Registered email ID
   - SMS: Registered mobile number
   - Contains: List of securities + quantities pending pledge
   |
Step 4: Client authenticates pledge
   Option A (With DDPI): Automatic - no client action needed
   Option B (Without DDPI):
     - Client clicks link, enters PAN or Demat Account Number
     - Reviews securities list
     - Clicks "Generate OTP" (OTP valid for 20 minutes)
     - Enters OTP to authorize
   |
Step 5: CDSL creates pledge lien
   - Securities marked as "Pledged" in client's BO account
   - Lien reflected in CUSPA
   - Securities remain in client account
   |
Step 6: Margin credit available from T+1 onwards
   - Clearing Corporation provides margin benefit
   - Haircut applied based on security category (VaR + ELM)
```

#### 35.4.2 Broker-to-CC Re-pledge

```
Step 7: Broker re-pledges client securities to Clearing Corporation
   - Transaction Type: Margin Re-pledge
   - Pledgor: Broker's CUSPA
   - Pledgee: Clearing Corporation (NSCCL/ICCL/MCXCCL)
   - ISIN + Quantity
   |
Step 8: Clearing Corporation accepts re-pledge
   - Margin credit granted to broker against client position
   - Complete trail visible: Client --> TM/CM --> CC
```

#### 35.4.3 Unpledge Process

```
Step 9: Client requests unpledge via broker app
   |
Step 10: Broker unpledges from CC first (if re-pledged)
   - Reverse re-pledge: CC releases lien
   |
Step 11: Broker releases pledge from CUSPA
   - Client's securities become "free" in BO account
   - Available for sale or other transactions
   |
Timeline: Unpledge typically completes within few hours (same day)
```

### 35.5 MTF Pledge Process Flow

MTF is different from regular margin pledge - here the broker funds the client's purchase:

```
Step 1: Client buys shares worth Rs. 10 lakh using MTF
   - Client pays Rs. 2.5 lakh (25% margin)
   - Broker funds Rs. 7.5 lakh (75% funding)
   |
Step 2: Shares credited to client's demat account on T+1
   |
Step 3: Broker initiates MTF pledge request
   - Pledgor: Client BO ID
   - Pledgee: Broker's "Client Securities under Margin Funding Account"
   |
Step 4: CDSL sends pledge authentication link to client
   - Email + SMS to registered details
   |
Step 5: Client must accept pledge by T+3 (5:00 PM deadline)
   - Authentication via PAN/Demat number + OTP
   |
Step 6: If client FAILS to accept by T+3:
   - Broker MUST square off position on T+4
   - Applicable penalties and interest charged to client
   |
Step 7: Once pledged, broker re-pledges to CC for margin benefit
```

### 35.6 CDSL Pledge File Format (Tag-Based)

Pledge transactions use the **tag-based** Common Upload format (not positional):

#### 35.6.1 Pledge Transaction Tags

| Tag | Field | Type | Length | Description |
|-----|-------|------|--------|-------------|
| `<Tp>` | Transaction Type | Numeric | 2 | `7` = Pledge/Unpledge/Confiscation |
| `<Usn>` | User Serial Number | Numeric | 8 | DP's unique serial for this transaction |
| `<Pldgtp>` | Pledge Type | Alpha | 1 | `P`=Pledge, `U`=Unpledge, `C`=Confiscation (Invocation) |
| `<Subtp>` | Pledge Sub Type | Alpha | 1 | `S`=Setup, `A`=Accept, `R`=Reject, `C`=Cancel by Pledgor, `E`=Reversal by Pledgee |
| `<Psn>` | Pledge Sequence Number | Numeric | 10 | CDSL-assigned sequence number |
| `<Bnfcry>` | Pledgor BO ID | Alpha | 16 | 16-digit BO ID of pledgor (client) |
| `<CtrPty>` | Pledgee BO ID | Alpha | 16 | 16-digit BO ID of pledgee (broker CUSPA / CC) |
| `<ISIN>` | ISIN Code | Alpha | 12 | 12-character ISIN (e.g., INE009A01021) |
| `<Qty>` | Quantity | Numeric | 15.3 | Max 12 digits before decimal, 3 after; decimal required |
| `<Prtqty>` | Partial Quantity | Numeric | 15.3 | For partial unpledge |
| `<Rcvdt>` | Request Received Date | Numeric | 8 | DDMMYYYY - date instruction received from client |
| `<Remk>` | Remarks | Alpha | 50 | Free text remarks |
| `<RejRsnCd>` | Rejection Reason Code | Alpha | 3 | Mandatory when rejecting pledge/unpledge (since Jun 2024, per CDSL/OPS/DP/POLCY/2024/314) |

#### 35.6.2 Margin Pledge Specific Tags (Additional)

| Tag | Field | Description |
|-----|-------|-------------|
| `<MrgPldgTp>` | Margin Pledge Type | `MP`=Margin Pledge, `MRP`=Margin Re-pledge, `MFP`=MTF Pledge |
| `<CMID>` | Clearing Member ID | For re-pledge to CC |
| `<ExchCd>` | Exchange Code | NSE/BSE/MCX |
| `<SegCd>` | Segment Code | CM/FO/CD/COM |

#### 35.6.3 Sample Pledge File

```xml
<Tp>7</Tp>
<Usn>00000001</Usn>
<Pldgtp>P</Pldgtp>
<Subtp>S</Subtp>
<Bnfcry>1234567800012345</Bnfcry>
<CtrPty>1234567899990040</CtrPty>
<ISIN>INE009A01021</ISIN>
<Qty>100.000</Qty>
<Rcvdt>13022026</Rcvdt>
<MrgPldgTp>MP</MrgPldgTp>
<Remk>Margin pledge for equity derivatives</Remk>
```

#### 35.6.4 Sample Unpledge File

```xml
<Tp>7</Tp>
<Usn>00000002</Usn>
<Pldgtp>U</Pldgtp>
<Subtp>S</Subtp>
<Psn>0000012345</Psn>
<Bnfcry>1234567800012345</Bnfcry>
<CtrPty>1234567899990040</CtrPty>
<ISIN>INE009A01021</ISIN>
<Qty>50.000</Qty>
<Prtqty>50.000</Prtqty>
<Rcvdt>14022026</Rcvdt>
<MrgPldgTp>MP</MrgPldgTp>
<Remk>Partial unpledge - client request</Remk>
```

#### 35.6.5 Sample Invocation (Confiscation) File

```xml
<Tp>7</Tp>
<Usn>00000003</Usn>
<Pldgtp>C</Pldgtp>
<Subtp>S</Subtp>
<Psn>0000012345</Psn>
<Bnfcry>1234567800012345</Bnfcry>
<CtrPty>1234567899990040</CtrPty>
<ISIN>INE009A01021</ISIN>
<Qty>100.000</Qty>
<Rcvdt>15022026</Rcvdt>
<Remk>Margin call failure - invocation</Remk>
```

### 35.7 Pledge Invocation (Confiscation)

Invocation occurs when the broker exercises the pledge to recover dues:

| Aspect | Details |
|--------|---------|
| **Trigger** | Client fails to meet margin call / MTF funding obligation |
| **Process** | Broker submits confiscation instruction to CDSL (Pldgtp = 'C') |
| **Effect** | Securities transferred from client BO to broker BO / CC account |
| **Client Notification** | CDSL sends SMS + email to client about invocation |
| **Reversal** | Not possible once executed; client must buy back |
| **Rejection Reason** | Since Jun 2024, broker must specify rejection reason code when rejecting pledge/unpledge |

### 35.8 SEBI Automated Pledge Mechanism (June 2025)

SEBI circular SEBI/HO/MIRSD/MIRSD-PoD/P/CIR/2025/82 introduced three new automated mechanisms effective October 10, 2025:

#### 35.8.1 Pledge Release for Early Pay-in (PR-EP)

| Aspect | Details |
|--------|---------|
| **Trigger** | Client sells securities that are currently pledged (margin/CUSPA/MTF) |
| **Old Process** | Manual: Client unpledges, waits, then sells. Short delivery risk. |
| **New Process** | Automated single instruction: Pledge release + Early pay-in block simultaneously |
| **Key Feature** | Does NOT require DDPI/POA or any electronic/physical instruction from client |
| **Validation** | Based on confirmed delivery obligation data from Clearing Corporation |
| **Effective Date** | October 10, 2025 (extended from September 1, 2025 after CDSL/NSDL representations) |

#### 35.8.2 Invocation for Early Pay-in (IV-EP)

| Aspect | Details |
|--------|---------|
| **Trigger** | Broker invokes pledged margin securities for client's settlement |
| **Process** | Securities automatically blocked for early pay-in in client's demat account |
| **Trail** | Transaction trail maintained in broker's margin pledge account |
| **Validation** | Limited to confirmed delivery obligations only |
| **Exclusion** | Mutual fund units not traded on exchange excluded |

#### 35.8.3 Invocation for Redemption (IV-RD)

| Aspect | Details |
|--------|---------|
| **Trigger** | Broker invokes pledged securities for redemption (MF units, etc.) |
| **Process** | Direct redemption instruction from broker's pledge account |

### 35.9 Pledge APIs Summary

| API | Endpoint | Purpose | Auth |
|-----|----------|---------|------|
| **e-Margin Pledge** | `api.cdslindia.com/APIServices` | Create margin pledge from BO to TM/CM | API Key + DSC |
| **Margin Repledge** | `api.cdslindia.com/APIServices` | Re-pledge from TM/CM to CC | API Key + DSC |
| **eLAS** | `api.cdslindia.com/APIServices` | Loan Against Shares pledge | API Key + DSC |
| **Transaction Upload** | `api.cdslindia.com/APIServices` | Batch pledge/unpledge via file upload | API Key + DSC |
| **Pledge Query** | `api.cdslindia.com/APIServices` | Query pledge status by BO/ISIN | API Key |

### 35.10 Margin Pledge Haircut Framework

When securities are pledged as margin, the Clearing Corporation applies a haircut:

| Security Category | Typical Haircut | Margin Benefit (on Rs. 1 lakh pledged) |
|-------------------|-----------------|----------------------------------------|
| Group I (Large Cap, liquid) | VaR (8-15%) + ELM (3.5%) | Rs. 81,500 - Rs. 88,500 |
| Group II (Mid Cap) | VaR (15-30%) + ELM (5%) | Rs. 65,000 - Rs. 80,000 |
| Group III (Small Cap) | VaR (30-50%) + ELM (5%) | Rs. 45,000 - Rs. 65,000 |
| ETFs / Liquid Bees | 5-10% | Rs. 90,000 - Rs. 95,000 |
| Sovereign Gold Bonds | 10-15% | Rs. 85,000 - Rs. 90,000 |

> **Note**: Actual haircuts are published daily by Clearing Corporations (NSCCL/ICCL). These are indicative ranges.

### 35.11 Client Securities Margin Pledge Account (CUSPA)

| Aspect | Details |
|--------|---------|
| **Sub-Status Code** | 40 (Client Securities Margin Pledge Account) |
| **Who Opens** | Broker (TM/CM) opens with CDSL |
| **Tag** | "TMCM - Client Securities Margin Pledge Account" |
| **Purpose** | Holds pledge liens from clients who have given DDPI/POA |
| **AMC** | Rs. 500/year (charged by CDSL to DP) |
| **Separate from** | Broker's proprietary account (sub-status 30/31/32) |
| **Visibility** | Client can see pledge status via easi/EASIEST/myEasi |
| **SEBI Mandate** | Every TM/CM must open CUSPA for collecting client securities as margin |

### 35.12 MTF-Specific Demat Account

| Aspect | Details |
|--------|---------|
| **Account Label** | "Client Securities under Margin Funding Account" |
| **Who Opens** | Broker opens with CDSL |
| **Purpose** | Holds MTF pledge liens (funded stock) |
| **SEBI Requirement** | Mandatory separate account for MTF funded stock (per SEBI/HO/MIRSD/DOP/CIR/P/2020/28) |
| **Pledge Duration** | Until client repays MTF funding or position is squared off |
| **Client Action** | Must accept pledge by T+3 (5:00 PM) else auto square-off on T+4 |
| **Interest** | Broker charges MTF interest (typically 12-18% p.a.) on funded amount |

### 35.13 Pledge Cost Structure

| Operation | CDSL Charge | Typical DP Charge to Client |
|-----------|------------|---------------------------|
| Margin Pledge (create) | Part of Rs. 3.50/debit txn | Rs. 25-30 per ISIN + GST |
| Unpledge | No separate charge | Free or Rs. 10-15 |
| Re-pledge (TM to CC) | Part of Rs. 3.50/debit txn | Not charged to client |
| Invocation | Part of Rs. 3.50/debit txn | Penalty charges to client |

---

## 36. BO Modification - Comprehensive Use Cases

### 36.1 Overview

BO modifications are submitted via the same **BO Modify Upload API** used for account opening, using the same Line 01-07 file structure. Only modified fields need to contain new values; unchanged fields retain existing data.

| Aspect | Details |
|--------|---------|
| **API** | POST /v1/bo/modify (same structure as BO Setup Upload API) |
| **File Upload** | `BO_MODIFY_{DPID}_{YYYYMMDD}_{SEQ}.txt` |
| **Processing** | Online: 1-2 hours; Batch: next working day |
| **Maker-Checker** | Required in CDAS (Maker sets up, Checker verifies and releases) |
| **Print Rule** | On modification: Line Code 0 (header) + all fields of modified Line Code printed |
| **Nominee Print Rule** | If nominee modified: Line Code 0 + ALL Line Code 07 fields printed (modified + unmodified) |
| **Joint Holder Print Rule** | Address changes: Line Codes 01, 02, 03 all printed |
| **Auto-Propagation** | Address changes automatically downloaded to all companies where BO holds securities |
| **CDSL Communiques** | DP-408, DP-304, DP-5565 |

### 36.2 Address Change

#### 36.2.1 Process Flow

```
Step 1: Client submits address change request to DP
   - Online: Via broker app/portal
   - Offline: Physical form + supporting documents
   |
Step 2: DP validates supporting documents
   - Acceptable: Aadhaar, Passport, Utility Bill (<3 months),
     Voter ID, Driving License, Bank Statement
   - Third-party address: Additional KYC for third party required
     (DP must obtain PoI + PoA for third party as well)
   |
Step 3: Maker creates modification in CDAS
   - BO Modify file: Line 02 (Address Details) updated
   - Correspondence address and/or Permanent address
   |
Step 4: Checker verifies and releases
   - Cross-validates documents against entered address
   |
Step 5: CDSL processes modification
   - Address change auto-propagated to ALL companies where BO holds securities
   |
Step 6: Confirmation sent to client (SMS + email)
```

### 36.3 Bank Account Modification

#### 36.3.1 Process Flow

```
Step 1: Client requests bank account change
   - Add new bank / Change primary bank / Delete bank (keep min 1)
   |
Step 2: DP collects supporting documents
   - Cancelled cheque leaf (new bank)
   - Bank statement header (new bank)
   - Self-attested ID proof
   |
Step 3: DP verifies new bank account
   - Penny drop verification (Rs. 1 credit via IMPS)
   - IFSC validation against RBI directory
   - Account holder name match with BO name
   |
Step 4: Maker creates modification in CDAS (Line 05)
   |
Step 5: Checker verifies and releases
   |
Step 6: CDSL processes update (typically same day)
   - All future corporate action payouts to new/updated bank
```

#### 36.3.2 Bank Modification Rules

| Rule | Details |
|------|---------|
| **Minimum Banks** | Must maintain at least 1 bank account |
| **Maximum Banks** | Up to 5 bank accounts per BO |
| **Primary Bank** | Exactly 1 must be marked as primary |
| **Verification** | New bank must be penny-drop verified before submission |
| **NRI Accounts** | NRE account for NRE demat; NRO account for NRO demat (must match) |
| **Name Match** | Bank account holder name must match BO name (or joint holder) |

### 36.4 Nominee Update

#### 36.4.1 SEBI Nomination Rules (January 10, 2025)

Circular: SEBI/HO/MIRSD/MIRSD-PoD-1/P/CIR/2025/3 (Jan 10, 2025)
Amendment: SEBI Feb 28, 2025 (clarifications)
Extension: SEBI Jul 2025 (Phase II & III implementation extension)

| Aspect | Details |
|--------|---------|
| **Maximum Nominees** | 10 (increased from 3) |
| **Effective Date** | March 1, 2025 |
| **Mandatory Fields** | Name, relationship, percentage, address, email, mobile, one ID (PAN or DL or last 4 Aadhaar digits) |
| **Percentage** | Must total exactly 100.00% across all nominees |
| **Minor Nominee** | Guardian details mandatory (name, PAN, relationship, address) |
| **POA/DDPI Restriction** | Person acting under POA/DDPI CANNOT add/modify nominees |
| **Default Distribution** | If percentages not specified, equal distribution |
| **Non-Compliance** | Account frozen for debits |
| **Record Retention** | 8 years post-transmission |

#### 36.4.2 Nomination Update Process

```
Step 1: Client initiates nomination change
   Option A: Online via broker portal (OTP verified)
   Option B: Physical nomination form (signed by all holders)
   |
Step 2: Populate nominee details (for each nominee, up to 10):
   - Full name, Relationship code (SP/CH/PA/SI/OT)
   - Percentage share, Full address (line 1, city, state, pincode)
   - Email ID (mandatory since Mar 2025)
   - Mobile number (mandatory since Mar 2025)
   - One ID: PAN or DL number or last 4 digits of Aadhaar
   - DOB; If minor: Guardian name, PAN, relationship, address
   |
Step 3: Maker enters in CDAS (Line 07 updated; ALL nominees sent)
   |
Step 4: Checker verifies (percentages = 100%, guardian for minors)
   |
Step 5: CDSL processes update (T+0 via API)
```

#### 36.4.3 Opt-Out Process (Decline Nomination)

```
Step 1: Client declares opt-out of nomination
   |
Step 2: Online process:
   - OTP verification to registered mobile/email
   - PLUS one of:
     a) Video recording by the regulated entity, OR
     b) Physical acknowledgment at DP office
   |
Step 3: DP uploads opt-out to CDSL (Line 07: Flag='N', OptOut='Y', Video='Y')
   |
Step 4: CDSL marks account as "Nomination Opted Out"
```

#### 36.4.4 Simplified Transmission (On Death of Holder)

Per SEBI Jan 2025 circular:

| Document | Required? | Notes |
|----------|-----------|-------|
| Death certificate | **Yes** | Mandatory |
| Nominee's KYC documents | **Yes** | Updated KYC |
| Affidavit | **No** | Removed by SEBI |
| Indemnity bond | **No** | Removed by SEBI |
| Undertaking / Attestation / Notarization | **No** | All removed by SEBI |

- **Joint accounts**: Surviving holders need only death certificate (no KYC re-verification)
- **Unclaimed portions**: Frozen in original account with enhanced due diligence
- **Liability protection**: Post-transmission claims are between nominee(s) and claimants only, without reference to regulated entities

### 36.5 Email / Mobile Update

| Step | Details |
|------|---------|
| 1 | Client submits change request (online or offline) |
| 2 | New email verified via OTP to new email |
| 3 | New mobile verified via OTP to new mobile |
| 4 | Maker updates in CDAS: Line 02 (mobile, email fields) |
| 5 | Checker verifies and releases |
| 6 | Confirmation sent to BOTH old and new contact details |

**Critical**: Mobile and Email are part of the 6 mandatory KYC attributes. Changes must be propagated to KRA + Exchange (UCC) within 10 working days.

### 36.6 PAN Correction

Per CDSL Notification CDSL/OPS/DP/POLCY/2024/657 (October 30, 2024):

| Step | Details |
|------|---------|
| 1 | BO submits PAN correction request with self-attested PAN copy |
| 2 | DP stamps PAN copy: "Verified with original" + "PAN verified with income tax site" |
| 3 | DP verifies PAN on protean-tinpan.com |
| 4 | DP matches BO's signature on PAN copy with signature in CDAS |
| 5 | For partnership/trust/HUF: First and last 3 pages of deeds |
| 6 | For mergers: Merger docs + new entity PAN |
| 7 | Maker creates modification in CDAS (Line 01) |
| 8 | Checker processes by T+2 working days |
| 9 | Cross-system sync: KRA + Exchange + CKYC must be updated |

### 36.7 Segment Activation / Deactivation

Segment activation is primarily an **exchange-level operation** (UCC), not a CDSL BO modification. The depository does not enforce segment-level restrictions on BO accounts.

| Segment | Exchange(s) | Income Proof | Process |
|---------|-------------|-------------|---------|
| CM (Equity) | NSE, BSE | No (default) | Auto with UCC |
| FO (Derivatives) | NSE, BSE | Yes (min Rs. 10L) | UCC modify at exchange |
| CD (Currency) | NSE, BSE, MSE | No | UCC modify at exchange |
| COM (Commodity) | MCX, NCDEX | Yes (mandatory) | UCC modify at exchange |
| SLB | NSE, BSE | Separate agreement | SLB agreement with broker |

### 36.8 BO Account Closure

#### 36.8.1 Regulatory Framework

| Aspect | Details |
|--------|---------|
| **SEBI Mandate** | DPs with online services MUST provide online closure facility |
| **Circular** | SEBI/HO/MRD/MRD-PoD-1/P/CIR/2024/168 (Dec 2024) |
| **Effective Date** | July 14, 2025 (new procedures) |
| **Client Right** | BO shall NOT be required to give reasons for closure (online mode) |

#### 36.8.2 Closure Process

```
Step 1: Client initiates closure (online: no reason required; or physical ACRF)
   |
Step 2: Pre-conditions check:
   [ ] All free securities transferred to target BO account
   [ ] No outstanding dues (AMC, transaction charges)
   [ ] No pending corporate actions
   [ ] All pledges released (unpledged)
   [ ] No frozen/suspended securities
   [ ] No pending inter-depository transfers
   |
Step 3a: No dues --> DP closes within 2 working days
Step 3b: Dues exist --> DP notifies within 2 days; client pays within 30 days
   |
Step 4: Securities transferred to target BO via Account Transfer (ACCTRANSFER)
   |
Step 5: Account status = "Closed" in CDAS
   |
Step 6: Closure confirmation within 2 working days (SMS + email)
```

#### 36.8.3 Special Securities During Closure

| Security Type | Transfer Rules |
|---------------|---------------|
| **Free securities** | Standard transfer |
| **Locked-in** | Intra-CDSL: standard; Cross-depository: Corporate Action mechanism |
| **Pledged** | Must be unpledged first |
| **Frozen** | Permitted with identical PAN pattern within same depository; freeze maintained |
| **Suspended** | Cannot be transferred until lifted |

#### 36.8.4 Dormancy and Reactivation

| Aspect | Details |
|--------|---------|
| **Dormant** | No transactions for 12+ months |
| **Reactivation** | Request to DP + updated KYC (PAN, address proof, photo) |
| **Timeline** | 2-3 working days |

### 36.9 BO Modification Summary Matrix

| Modification | File Line | Timeline | Key Documents | Cross-System Sync |
|-------------|-----------|----------|--------------|-------------------|
| Address Change | Line 02 | Same day | Address proof | KRA (10 days) |
| Bank Add/Change | Line 05 | Same day | Cheque + penny drop | Exchange (10 days) |
| Nominee Update | Line 07 | T+0 | Nom form + OTP | N/A |
| Nominee Opt-Out | Line 07 | T+0 | Video + declaration | N/A |
| Email/Mobile | Line 02 | Same day | OTP (old + new) | KRA + Exchange (10 days) |
| PAN Correction | Line 01 | T+2 | PAN copy + IT verify | KRA + Exchange + CKYC |
| Segment Activation | N/A | 1-2 days | Income proof | Exchange UCC |
| DDPI Activation | Line 06 | ~24 hours | eSign + stamp duty | N/A |
| Account Closure | Closure API | 2 working days | ACRF + transfer | Exchange UCC deactivation |

---

## 37. Key SEBI Circulars Reference (Extended)

### 37.1 DDPI Circulars

| Circular Number | Date | Subject |
|-----------------|------|---------|
| SEBI/HO/MIRSD/DoP/P/CIR/2022/44 | Apr 4, 2022 | DDPI for settlement + pledge (original) |
| SEBI/HO/MIRSD/DoP/P/CIR/2022/119 | Jun 2022 | Implementation timeline extension |
| SEBI/HO/MIRSD-PoD-1/P/CIR/2022/137 | Oct 6, 2022 | DDPI scope expanded: MF + open offer |
| SEBI/HO/MIRSD/DoP/P/CIR/2022/153 | Nov 2022 | Further implementation extension |

### 37.2 Margin Pledge Circulars

| Circular Number | Date | Subject |
|-----------------|------|---------|
| SEBI/HO/MIRSD/DOP/CIR/P/2020/28 | Feb 25, 2020 | Margin pledge/re-pledge in depository system |
| SEBI/HO/MIRSD/DOP/CIR/P/2020/88 | Jun 1, 2020 | Extension to Aug 1, 2020 |
| SEBI/HO/MIRSD/DOP/CIR/P/2020/144 | Sep 22, 2020 | MTF securities as maintenance margin |
| SEBI/HO/MIRSD/MIRSD-PoD/P/CIR/2025/82 | Jun 3, 2025 | Automated pledge release + invocation |

### 37.3 Nomination Circulars

| Circular Number | Date | Subject |
|-----------------|------|---------|
| SEBI/HO/MIRSD/MIRSD-PoD-1/P/CIR/2025/3 | Jan 10, 2025 | Revise and Revamp Nomination Facilities |
| SEBI Feb 28, 2025 | Feb 28, 2025 | Clarifications to nomination circular |
| SEBI Jul 2025 | Jul 2025 | Extended Phase II & III implementation |

### 37.4 CDSL Communiques for DDPI/Pledge/Modifications

| Communique | Date | Subject |
|------------|------|---------|
| DP-115 | Ongoing | SEBI Circular on Margin Obligations |
| DP-234 | May 22, 2020 | Operational modalities for margin pledge/re-pledge |
| DP-304 | Jul 2021 | Mandatory updation of certain KYC attributes |
| DP-332 | Jun 14, 2022 | DDPI implementation |
| DP-408 | Aug 3, 2018 | Changes in BO Account Information |
| DP-412 | Aug 2020 | Margin Pledge/Re-Pledge implementation |
| DP-5565 | Ongoing | BO Setup/Modify changes for CM/POA/DDPI holder |
| CDSL/OPS/DP/POLCY/2024/314 | Jun 7, 2024 | Pledge file format: rejection reason code |
| CDSL/OPS/DP/POLCY/2024/657 | Oct 30, 2024 | PAN modification at DP end |

---

## Notes for Implementation

### What We Need from CDSL (Action Items)

1. **API Sandbox Credentials**: Register as DP and request API key + sandbox environment access from dprtasupport@cdslindia.com
2. **Full UDiFF Catalogue**: Download from https://www.cdslindia.com/DP/Harmonization.html - contains exact field positions and lengths for ALL file formats (v3.0.1.0)
3. **DP-119 PDF**: Complete BO Setup file format specification with exact positional details
4. **DP-729 Annexure-A**: Complete list of all status/sub-status/product codes
5. **Error Code List**: Complete list from Communique CDSL/OPS/DP/GENRL/2451
6. **DSC Certificate**: Obtain from RA of TCS (or Sify Safescrypt) for transaction authorization - Class 3 on hardware e-Token
7. **IP Whitelisting**: Register production server static IPs with CDSL (primary + DR site)
8. **Connectivity Agreement**: Choose leased line / MPLS / internet mode; download connectivity form from ww1.cdslindia.com/dp/dpconnectivity.html
9. **Test DP ID**: For UAT testing of BO setup, transactions, eDIS flows
10. **eDIS API Key**: Separate API key + encryption parameters for eDIS integration
11. **MOCKCDAS Access**: Request access to mock environment for file format testing
12. **eDIS Encryption Key**: Obtain encryption key/algorithm for TransDtls field encryption
13. **UAT Test Cases**: Request CDSL's standard UAT test case checklist for certification

### Integration Priority (for our KYC system)

| Priority | Integration | Reason |
|----------|------------|--------|
| P0 | BO Setup Upload API | Core account opening - must go live first |
| P0 | Line 01-07 File Generation | File-based fallback for batch processing |
| P1 | eDIS API (VerifyDIS) | Required for clients without DDPI |
| P1 | DDPI Submission | Streamlined trading experience |
| P1 | Nomination (Line 07) | SEBI mandatory since Mar 2025 |
| P2 | Transaction Upload API | Demat/Remat/Pledge operations |
| P2 | CVL KRA APIs | KYC verification and upload |
| P3 | DPM3/DP57 Downloads | Reconciliation and reporting |
| P3 | Pledge APIs (eLAS, Margin) | Margin operations |
| P1 | DDPI Activation Flow (Section 34) | Seamless trading; avoid eDIS friction |
| P2 | Margin Pledge / Unpledge (Section 35) | MTF and margin trading support |
| P1 | BO Modification API (Section 36) | Address/bank/nominee updates post-onboarding |
| P2 | Automated Pledge Release (Section 35.8) | SEBI mandate effective Oct 2025 |

### Key Technical Contacts

| Contact | Email | Purpose |
|---------|-------|---------|
| **DP RTA Support** | dprtasupport@cdslindia.com | API integration, MOCKCDAS, UAT queries |
| **CDSL Helpdesk** | helpdesk@cdslindia.com | Production issues, general queries |
| **Phone** | 08069144800 | All queries |
| **Connectivity** | Download form from ww1.cdslindia.com/dp/dpconnectivity.html | Leased line / MPLS setup |

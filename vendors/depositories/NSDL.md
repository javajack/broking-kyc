# NSDL Integration Specification
## National Securities Depository Limited - Comprehensive DP Integration Guide (Phase 2)

**Version**: 1.0
**Date**: 2026-02-13
**Phase**: 2 (Secondary Depository - CDSL is primary)
**Companion to**: [CDSL_INTEGRATION.md](../../CDSL_INTEGRATION.md), [VENDOR_INTEGRATIONS.md](../../VENDOR_INTEGRATIONS.md) Section V13, [11-exchange-depository.md](../../kyc-docs/sections/11-exchange-depository.md)
**Primary References**: NSDL Master Circular for Participants (Apr 2025), NSDL Policy 2024-0012 (Client Maintenance API), SEBI Master Circular SEBI/HO/MRD/MRD-PoD-1/P/CIR/2024/168 (Dec 2024)

---

## Table of Contents

1. [Overview](#1-overview)
2. [DPM (Depository Participant Module)](#2-dpm-depository-participant-module)
3. [BO Account Opening](#3-bo-account-opening)
4. [DDPI on NSDL](#4-ddpi-on-nsdl)
5. [SPEED-e / IDeAS](#5-speed-e--ideas)
6. [NSDL CAS (Consolidated Account Statement)](#6-nsdl-cas-consolidated-account-statement)
7. [Non-Individual Entities](#7-non-individual-entities)
8. [Nomination](#8-nomination)
9. [Key Differences from CDSL (Comparison Table)](#9-key-differences-from-cdsl-comparison-table)
10. [Modernization Status](#10-modernization-status)
11. [Transaction Types](#11-transaction-types)
12. [Charges](#12-charges)
13. [Recent Circulars (2024-2026)](#13-recent-circulars-2024-2026)
14. [When to Use NSDL vs CDSL](#14-when-to-use-nsdl-vs-cdsl)
15. [Edge Cases](#15-edge-cases)

---

## 1. Overview

### 1.1 Background

| Aspect | Details |
|--------|---------|
| **Full Name** | National Securities Depository Limited |
| **Established** | November 8, 1996 |
| **Significance** | India's first depository; pioneered electronic securities holding in India |
| **Promoters** | IDBI Bank, UTI, NSE (National Stock Exchange) |
| **Regulator** | SEBI (Securities and Exchange Board of India) |
| **Governing Law** | Depositories Act, 1996; SEBI (Depositories and Participants) Regulations, 2018 |
| **Website** | https://nsdl.co.in |
| **Listed** | NSE/BSE (ticker: NSDL) |
| **IPO Status** | Awaiting SEBI approval (as of Feb 2026) |

### 1.2 NSDL vs CDSL: Market Position (As of Oct 2025)

| Metric | NSDL | CDSL |
|--------|------|------|
| **Demat Accounts** | ~4.23 crore (42.3M) | ~16.77 crore (167.7M) |
| **Account Market Share** | ~20.5% | ~79.5% |
| **Custody Value** | Rs. 464 lakh crore | Rs. 70.5 lakh crore |
| **Custody Value Share** | ~86.8% | ~13.2% |
| **Revenue per Account** | Rs. 91.69 | Rs. 33.21 |
| **Primary Client Base** | Institutional, HNI, legacy retail | Retail, new-age brokers |
| **Account Growth (2025)** | +11.4% YoY | +17.9% YoY |
| **DPs Registered** | ~280 | ~590+ |

**Key Insight**: NSDL has far fewer accounts but holds nearly 7x the custody value of CDSL, reflecting its dominance in institutional and high-value segments. CDSL dominates retail through partnerships with discount brokers (Zerodha, Groww, Angel One, etc.).

### 1.3 Phase 2 Priority Rationale

NSDL is our Phase 2 depository integration for the following reasons:

1. **CDSL dominates retail**: ~80% of new demat accounts open with CDSL. Our target market (retail onboarding) aligns with CDSL.
2. **CDSL has better API maturity**: REST APIs, 1-2 hour account opening, online DDPI (24h activation).
3. **NSDL is slower**: Legacy DPM system, historically ~15 working day account opening, offline DDPI at most DPs.
4. **But NSDL is required for**: Clients with existing NSDL accounts, certain institutional clients, NRI clients with specific custodian preferences, and inter-depository transfers.

---

## 2. DPM (Depository Participant Module)

### 2.1 System Architecture

The DPM is NSDL's core system for DP operations. Unlike CDSL's centralized CDAS where DPs connect to a single server, NSDL's architecture has a local component at the DP level that syncs with NSDL's central CDS (Core Depository System).

```
                           ┌─────────────────────────┐
                           │   NSDL CDS (Central)     │
                           │   Core Depository System  │
                           └────────────┬────────────┘
                                        │
                    ┌───────────────────┼───────────────────┐
                    │                   │                    │
            ┌───────▼──────┐   ┌───────▼──────┐   ┌───────▼──────┐
            │  eDPM System │   │   DPM Plus   │   │ Insta        │
            │  (Central)   │   │   (Cloud)    │   │ Interface    │
            └───────┬──────┘   └───────┬──────┘   └───────┬──────┘
                    │                  │                   │
            ┌───────▼──────┐   ┌───────▼──────┐          │
            │  Local DPM   │   │  Cloud DPM   │          │
            │  (DP Office) │   │  (NSDL Host) │          │
            └───────┬──────┘   └──────────────┘          │
                    │                                     │
            ┌───────▼──────────────────────────────────────▼──┐
            │              DP Back-Office System               │
            │         (ODIN / Custom / Third-Party)           │
            └─────────────────────────────────────────────────┘
```

| Component | Purpose |
|-----------|---------|
| **CDS** | NSDL's Core Depository System - central ledger for all accounts and securities |
| **eDPM** | Central electronic DPM - allows DPs to submit instructions online to CDS |
| **Local DPM** | Installed at DP premises - account creation, modification, report downloads |
| **Cloud DPM** | NSDL-hosted version of Local DPM - eliminates on-premise infrastructure |
| **DPM Plus** | Enhanced limited-purpose back-office: single sign-on, billing, KRA integration, CML/SOH printing |
| **Insta Interface** | Instant account opening system - API/technical integration for real-time BO creation |

### 2.2 GISMO (Local DPM Software)

GISMO is the NSDL-provided software that runs as the Local DPM at DP premises.

| Aspect | Details |
|--------|---------|
| **Full Form** | General Interface for System Management and Operations |
| **Purpose** | Local DPM client software for account management, report download, instruction processing |
| **Licensing** | Annual: Rs. 40,000/year OR One-time: Rs. 2,50,000 |
| **Server Requirements** | Windows Server 2008+ / SQL Server 2008+ / .NET Framework 3.5+ |
| **Deployment** | On-premise at DP office (requires dedicated hardware) |
| **Connectivity** | Syncs with NSDL CDS via leased line / MPLS / internet |
| **Alternative** | Cloud DPM (NSDL-hosted, eliminates on-premise infrastructure) |
| **Maintenance** | DP responsible for hardware, OS patches, SQL backups |

> **NOTE**: The server requirements above are the historically documented minimums. NSDL may have updated these for newer versions. Verify with NSDL before procurement. Cloud DPM is the recommended path for new DPs to avoid on-premise infrastructure overhead.

### 2.3 Local DPM vs Cloud DPM

| Aspect | Local DPM (GISMO) | Cloud DPM |
|--------|-------------------|-----------|
| **Hosting** | On-premise at DP office | NSDL data center |
| **Infrastructure** | DP procures and maintains | NSDL manages |
| **Cost** | License + hardware + maintenance | Subscription-based |
| **Setup Time** | Weeks (hardware procurement + installation) | Days (NSDL provisioning) |
| **Backup/DR** | DP responsibility | NSDL responsibility |
| **API Integration** | Client Maintenance API hosted locally | Client Maintenance API hosted on cloud |
| **Recommended For** | Large DPs with existing infrastructure | New DPs, smaller operations |

### 2.4 Building Own DPM-Compatible System

DPs have the option to build their own back-office system that integrates with NSDL via the Client Maintenance API rather than using GISMO. This is the path taken by large brokers (e.g., Zerodha, ICICI Securities) who use ODIN, TCS BaNCS, or custom systems.

Requirements for custom DPM integration:
- Must support Client Maintenance API (NSDL Policy 2024-0012)
- Must handle UDiFF file format generation and parsing
- Must connect to NSDL CDS via eDPM or Insta Interface
- Must maintain audit trail per SEBI requirements
- Must pass NSDL technical audit before go-live

---

## 3. BO Account Opening

### 3.1 BO ID Format

```
NSDL BO ID: "IN" + 6-digit DP ID + 8-digit Client ID = 16 characters total
┌────┬──────────────┬────────────────┐
│ IN │  DP ID (6)   │ Client ID (8)  │
│ IN │  300394      │  12345678      │
└────┴──────────────┴────────────────┘
Full BO ID: IN30039412345678
```

| Component | Details |
|-----------|---------|
| **Total Length** | 16 characters (alphanumeric - always starts with "IN") |
| **Prefix** | "IN" - constant for all NSDL accounts |
| **DP ID** | 6 digits - unique identifier for the Depository Participant |
| **Client ID** | 8 digits - unique identifier for the BO within that DP |
| **DP ID Assignment** | Assigned by NSDL when DP is registered |
| **Client ID Assignment** | Generated by CDS during account activation; returned in "Out file" |
| **Permanence** | BO ID is fixed once created; cannot be changed |

**Critical difference from CDSL**: CDSL BO IDs are 16-digit purely numeric (e.g., `1234567800012345`). NSDL BO IDs always start with "IN" and are alphanumeric. Your system must handle both formats and identify depository from the prefix.

### 3.2 DP ID Examples (Common NSDL Participants)

| DP ID | Depository Participant |
|-------|----------------------|
| IN300394 | HDFC Bank |
| IN300183 | ICICI Bank |
| IN300484 | Kotak Mahindra Bank |
| IN300513 | Axis Bank |
| IN300214 | State Bank of India |

> **Note**: Full DP list is published on NSDL website. Format shown with "IN" prefix for clarity.

### 3.3 Account Opening Flow

```
Step 1: DP submits account data via Insta Interface API (UDiFF format)
   ↓  Status: SUBMITTED
Step 2: Data received at NSDL Insta Interface, transmitted to CDS
   ↓  Status: PROCESSING
Step 3: CDS validates data, creates account, generates BO ID ("IN" + DP ID + Client ID)
   ↓  Status: ACCOUNT_CREATED
Step 4: "Out file" sent back to Local DPM / Cloud DPM with Client_IDs
   ↓  Status: DPM_UPDATED
Step 5: DP back-office (ODIN/custom) creates client master record
   ↓  Status: CLIENT_CREATED
Step 6: PAN flag enablement in DPM after verification
   ↓  Status: ACTIVE (trading enabled)
```

| Method | Details | Timeline |
|--------|---------|----------|
| **Insta Interface API** | Real-time submission to CDS; fastest path | Hours to 1-2 days (if all validations pass) |
| **DPM File Upload** | Batch file uploaded to Local/Cloud DPM, synced to CDS | 2-5 working days |
| **DPM Plus Manual** | One-by-one entry via DPM Plus web interface | 3-7 working days |
| **Legacy Full Cycle** | End-to-end including physical document verification | Up to 15 working days |

> **NOTE**: The "~15 working days" timeline cited in older documentation reflects the legacy process including physical verification. With Insta Interface and digital KYC, timelines are significantly faster but still lag CDSL's 1-2 hour API-based opening.

### 3.4 Client Maintenance API (NSDL Policy 2024-0012)

This is NSDL's modernized API for BO account operations, introduced in 2024.

| Aspect | Details |
|--------|---------|
| **Circular** | NSDL/POLICY/2024/0012 |
| **Purpose** | API integration between DP back-office and Local DPM/Cloud DPM for account opening and modification |
| **Hosting** | API hosted on Local DPM or Cloud DPM (not directly on CDS) |
| **Initiation** | From DP back-office system to DPM |
| **Account Types** | Currently supports single-holding individual accounts via Insta Interface |
| **Operations** | Account opening + demographic detail modification |
| **Format** | UDiFF (ISO-tagged) for data exchange |

> **Key Limitation**: As of the 2024 circular, the Insta Interface API supports only single-holding demat accounts. Joint accounts and non-individual entities still require the traditional DPM file upload route.

### 3.5 UDiFF (Unified Distilled File Formats)

UDiFF is the SEBI-mandated standardized file format that replaced the older proprietary formats used by both NSDL and CDSL. It is the primary format for all NSDL data exchange.

| Aspect | Details |
|--------|---------|
| **Full Form** | Unified Distilled File Formats |
| **Mandated By** | SEBI MDAC (Market Data Advisory Committee) |
| **Effective Date** | EOD March 30, 2024 |
| **Old Format Discontinued** | May 15, 2024 |
| **Standard** | ISO-tagged fields with standardized data types and lengths |
| **Coverage** | 23 standardized formats (reduced from 200+ disparate formats) |
| **Applies To** | NSDL, CDSL, NSE, BSE, MCX, and all clearing corporations |

### 3.6 UDiFF Format Structure

Unlike CDSL's fixed-length positional format (Lines 01-07), UDiFF uses ISO-tagged fields.

**CDSL Format (Fixed-Length Positional)**:
```
01123456780001234501ABCDEFGH...    (Line 01: Record type + DP ID + Client ID + data...)
02123456780001234560011 MG Road... (Line 02: Contact details...)
```

**UDiFF Format (ISO-Tagged)**:
```
<Tp>BOACCT</Tp>
<DpId>300394</DpId>
<ClntId>12345678</ClntId>
<Nm>
  <FrstNm>RAKESH</FrstNm>
  <MddlNm></MddlNm>
  <LstNm>KUMAR</LstNm>
</Nm>
<DOB>19850115</DOB>
<PAN>ABCDE1234F</PAN>
<Addr>
  <Ln1>123 MG Road</Ln1>
  <City>Mumbai</City>
  <State>MH</State>
  <Pin>400001</Pin>
  <Ctry>IN</Ctry>
</Addr>
<BnkAcct>
  <AcctNb>9876543210</AcctNb>
  <IFSC>HDFC0001234</IFSC>
  <AcctTp>SB</AcctTp>
</BnkAcct>
```

Key characteristics of UDiFF:
- **Tagged fields**: Each data element wrapped in ISO-standard tags
- **Flexible ordering**: Fields can appear in any order within a record
- **Self-describing**: Tags identify the data, unlike positional formats where position determines meaning
- **Extensible**: New fields can be added without breaking existing parsers
- **Standardized data types**: Dates, amounts, codes follow ISO standards
- **Cross-MII**: Same format used across NSDL, CDSL, exchanges, clearing corporations

### 3.7 UDiFF vs CDSL Fixed-Length (Developer Comparison)

| Aspect | CDSL Fixed-Length | NSDL UDiFF |
|--------|-------------------|------------|
| **Parsing** | Position-based substring extraction | XML/tag-based parsing |
| **Field Order** | Strict positional - must match spec exactly | Flexible - any order within record |
| **Padding** | Numeric: right-justified zero-padded; Alpha: left-justified space-padded | No padding needed - tag delimited |
| **Empty Fields** | Must fill with spaces to maintain positions | Omit tag or use empty tag |
| **Extensibility** | Adding fields requires shifting all subsequent positions | Add new tag anywhere |
| **Validation** | Count characters, check positions | Parse tags, validate values |
| **Error Debugging** | Difficult - must count character positions | Easy - human-readable tags |
| **File Size** | Compact (no tag overhead) | Larger (tag overhead) |
| **Implementation Effort** | Medium (strict positional mapping) | Lower (standard XML parsing) |

---

## 4. DDPI on NSDL

### 4.1 Critical Difference from CDSL

This is one of the most significant operational differences between NSDL and CDSL, and a key reason why new-age brokers prefer CDSL.

| Aspect | CDSL | NSDL |
|--------|------|------|
| **DDPI Submission** | Online (Aadhaar eSign) | Primarily offline (physical/scanned form) |
| **Activation Time** | ~24 working hours | 2-3 business days |
| **Process** | Digital end-to-end | Physical form couriered to DP / scanned upload |
| **Client Experience** | Seamless - sign digitally during onboarding | Friction - requires separate physical step |

> **Impact on Our System**: For clients with NSDL demat accounts, the DDPI flow cannot be completed inline during digital onboarding. The system must handle an asynchronous DDPI activation that completes days after account opening. Clients trade using SPEED-e (IPIN-based) authorization until DDPI is activated.

### 4.2 NSDL DDPI Submission Process

```
Step 1: BO requests DDPI via broker portal/app
   ↓
Step 2: DP generates DDPI form with pre-filled BO details
   ↓
Step 3: BO signs the form:
   Option A: Aadhaar eSign (available at some DPs, not universal)
   Option B: Physical signature on printed form
   Option C: Wet-signed scanned copy uploaded
   ↓
Step 4: DP submits signed DDPI to NSDL via DPM
   ↓
Step 5: NSDL processes offline (manual verification at CDS)
   ↓  Processing: 2-3 business days
Step 6: DDPI flag activated on BO account in DPM
   ↓
Status: DDPI Active - no per-trade authorization needed
```

### 4.3 Without DDPI: SPEED-e Authorization

Until DDPI is activated, every sell trade requires explicit authorization via SPEED-e:

```
1. DP/Broker portal initiates sell instruction
2. Client redirected to NSDL SPEED-e portal
3. Client enters IPIN (Internet Personal Identification Number)
4. OTP sent to registered mobile + email
5. Client enters OTP
6. Delivery instruction authorized
7. Shares debited from demat account
```

### 4.4 Our System's DDPI Handling for NSDL

```
During Onboarding:
  ├─ If CDSL account: Offer DDPI inline (eSign), activates in 24h
  └─ If NSDL account:
       ├─ Inform client: "DDPI activation takes 2-3 business days"
       ├─ Generate pre-filled DDPI form (PDF)
       ├─ Option A: eSign (if DP supports it)
       ├─ Option B: Client prints, signs, uploads scanned copy
       ├─ Submit to NSDL via DPM
       ├─ Set status: DDPI_PENDING
       └─ Poll DPM for activation confirmation
            └─ On activation: Update status to DDPI_ACTIVE

Until DDPI Active:
  └─ All sell trades routed through SPEED-e (IPIN + OTP)
```

---

## 5. SPEED-e / IDeAS

### 5.1 SPEED-e (Submission of Participant Electronic Execution of Delivery)

SPEED-e is NSDL's electronic delivery instruction system, analogous to CDSL's eDIS. It allows demat account holders to submit delivery instructions online.

| Aspect | Details |
|--------|---------|
| **Purpose** | Online submission of delivery instructions (eliminates physical DIS) |
| **Portal** | https://eservices.nsdl.com |
| **Authorization** | IPIN (Internet Personal Identification Number) + OTP |
| **IPIN** | Password-based; set by BO during SPEED-e registration |
| **OTP** | Sent to registered mobile + email |
| **Registration** | Online via eservices.nsdl.com; authorized by DP |
| **Availability** | Weekdays + working Saturdays; special Sunday availability announced via circulars |
| **Mobile App** | NSDL Speede App (Android/iOS) |
| **Cost** | Free for BOs |

### 5.2 SPEED-e Registration Flow

```
Step 1: BO visits eservices.nsdl.com and initiates SPEED-e registration
   ↓
Step 2: Enters BO ID + DP ID + PAN + personal details
   ↓
Step 3: OTP sent to registered mobile + email for validation
   ↓
Step 4: Registration request forwarded to DP for authorization
   ↓
Step 5: DP authorizes electronically; BO notified via email
   ↓
Step 6: BO sets IPIN (password) for future logins
   ↓
Step 7: Clearing Member(s) authorize pre-notified account addition
   ↓
Status: SPEED-e Active - BO can submit instructions online
```

### 5.3 SPEED-e vs CDSL eDIS

| Aspect | CDSL eDIS | NSDL SPEED-e |
|--------|-----------|--------------|
| **Authorization Method** | TPIN (6-digit, CDSL-generated) + OTP | IPIN (password, BO-set) + OTP |
| **TPIN/IPIN Source** | CDSL generates, sends to BO via SMS | BO creates own IPIN during registration |
| **DP Involvement** | DP cannot see TPIN | DP authorizes SPEED-e registration |
| **Lock Policy** | 3 wrong TPIN entries = invalidated | Password reset available online |
| **Bulk Authorization** | Supported (bulk flag in TransDtls) | Supported |
| **API Integration** | eDIS VerifyDIS API (POST to edis.cdslindia.com) | SPEED-e facility via NSDL eservices |
| **Pre-trade Auth** | Yes (SEBI-mandated before T+1 settlement) | Yes |
| **Revocation** | eDIS Revocation API | Via SPEED-e portal |

### 5.4 IDeAS (Internet-based Demat Account Statement)

IDeAS is NSDL's online portal for demat account holders to view their holdings and transaction history, analogous to CDSL's easi.

| Aspect | Details |
|--------|---------|
| **Purpose** | View demat holdings, transaction history, CAS |
| **Portal** | https://eservices.nsdl.com (shared with SPEED-e) |
| **Access Type** | Read-only (view holdings + statements) |
| **Authentication** | Same credentials as SPEED-e (IPIN/password) |
| **Features** | Holdings view, transaction history, CAS download, ISIN details |
| **Cost** | Free |
| **Mobile** | Available via NSDL Speede App |

### 5.5 IDeAS vs CDSL easi/EASIEST

| Aspect | CDSL easi | CDSL EASIEST | NSDL IDeAS | NSDL SPEED-e |
|--------|-----------|-------------|------------|--------------|
| **View Holdings** | Yes | Yes | Yes | Yes |
| **Transaction History** | Yes | Yes | Yes | Yes |
| **Off-Market Transfer** | No | Yes | No | Yes |
| **Inter-Depository** | No | Yes | No | Yes |
| **Delivery Instructions** | No | Yes | No | Yes |
| **Read/Write** | Read-only | Read + Write | Read-only | Read + Write |
| **Portal** | web.cdslindia.com | web.cdslindia.com | eservices.nsdl.com | eservices.nsdl.com |

### 5.6 Unified Investor Platform (UIP) - Feb 2025

CDSL and NSDL, in collaboration with SEBI, launched the Unified Investor App (UIP) in February 2025:

| Aspect | Details |
|--------|---------|
| **Purpose** | Consolidated view of holdings across both CDSL and NSDL |
| **Integrates** | myEasi (CDSL) + SPEED-e/IDeAS (NSDL) |
| **Benefit** | Single dashboard for all demat securities regardless of depository |
| **Impact** | Eliminates need for multiple platform logins for investors with accounts at both depositories |

---

## 6. NSDL CAS (Consolidated Account Statement)

### 6.1 Overview

| Aspect | Details |
|--------|---------|
| **Full Form** | Consolidated Account Statement |
| **Provider** | NSDL (for NSDL accounts) - combined with CDSL data for cross-depository view |
| **Frequency** | Monthly (if transactions during the month); Half-yearly (if no transactions) |
| **Content** | Holdings + transactions across all demat accounts at the depository |
| **Includes** | Equity, MF (demat form), bonds, government securities held in demat |
| **Format** | PDF emailed to registered email; also downloadable via IDeAS |
| **Delivery** | Automatic email to registered email ID |
| **Combined CAS** | Since SEBI mandate, CAS includes holdings from both NSDL and CDSL |

### 6.2 CAS Contents

| Section | Details |
|---------|---------|
| **Account Summary** | BO ID, name, PAN, DP name, account status |
| **Equity Holdings** | ISIN, company name, quantity, face value |
| **Mutual Fund Holdings** | Scheme name, folio, units, NAV (if held in demat) |
| **Transaction Summary** | Debits, credits, pledges during the period |
| **Valuation** | Market value of holdings (based on last available price) |

### 6.3 Implementation Note

For our system, CAS is an NSDL-generated report delivered directly to the BO. Our system does not need to generate CAS but should:
- Ensure the BO's email is correctly registered (CAS delivery depends on it)
- Be aware that CAS data may differ from real-time holdings (CAS is periodic)
- Use DPM reports (equivalent of CDSL's DPM3/DP57) for real-time reconciliation

---

## 7. Non-Individual Entities

### 7.1 Entity Types

The entity types are the same as CDSL (SEBI mandates uniform categories), but NSDL uses its own form formats and processing flows through DPM rather than CDAS.

| Entity Type | NSDL Processing | Key Difference from CDSL |
|-------------|----------------|-------------------------|
| **Individual (Resident)** | Insta Interface (single holding) or DPM file | CDSL: API for single + joint |
| **Joint Holding** | DPM file upload only (Insta Interface does NOT support joint as of 2024) | CDSL: API supports joint |
| **HUF** | DPM file upload | Same entity requirements, different file format |
| **Body Corporate** | DPM file upload; Board resolution + CIN required | Same requirements, UDiFF format |
| **Trust** | DPM file upload; Trust deed + trustee list | Same requirements |
| **Partnership / LLP** | DPM file upload; Partnership deed + LLP agreement | Same requirements |
| **FPI** | Through Designated DP (DDP); NSDL has strong institutional presence | NSDL preferred by many FPIs historically |

### 7.2 NRI Accounts

NRI demat account types are identical across both depositories (SEBI-mandated):

| Account Type | NSDL Sub-Status | Repatriation | Bank Account |
|-------------|-----------------|--------------|--------------|
| **NRE** (Non-Resident External) | NRI Repatriable | Fully repatriable | NRE savings/current |
| **NRO** (Non-Resident Ordinary) | NRI Non-Repatriable | Capped at USD 1M/year | NRO savings/current |
| **SNRE** (Special NRE) | Specific sub-status | Fully repatriable | SNRE account |
| **SNRO** (Special NRO) | Specific sub-status | Capped | SNRO account |

NRI processing notes for NSDL:
- PIS (Portfolio Investment Scheme) approval required from AD bank, same as CDSL
- FEMA compliance identical
- NSDL historically preferred by some NRI custodian banks (HDFC Bank, ICICI Bank)
- Processing time for NRI accounts may be longer on NSDL due to offline DDPI

### 7.3 Corporate Accounts

| Requirement | NSDL | CDSL |
|-------------|------|------|
| **CIN** | 21-character Corporate Identification Number | Same |
| **Board Resolution** | Required, uploaded via DPM | Required, uploaded via CDAS |
| **Authorized Signatories** | DSC mapping in DPM | DSC mapping in CDAS |
| **Document Format** | UDiFF tagged format | Fixed-length positional |
| **Processing** | Via DPM file upload | Via BO Setup API or file upload |

---

## 8. Nomination

### 8.1 SEBI Mandate (Uniform Across Both Depositories)

The nomination rules are identical for NSDL and CDSL, as they are SEBI-mandated:

| Aspect | Details |
|--------|---------|
| **Maximum Nominees** | 10 (increased from 3; effective Mar 1, 2025) |
| **Mandatory** | Nomination or opt-out required for all accounts |
| **Non-Compliance** | Demat account frozen for debits |
| **Eligible Nominees** | Individuals / natural persons only |
| **Opt-Out** | Requires video verification (VIPV) |
| **Distribution** | If percentages not specified, equal distribution |
| **Transmission** | Simplified (no affidavit/indemnity needed since Jan 2025) |

### 8.2 NSDL-Specific Implementation

| Aspect | NSDL | CDSL |
|--------|------|------|
| **Nomination Submission** | Via DPM file (UDiFF format) | Via BO Setup file (Line 07) or API |
| **Opt-Out Video** | Uploaded to DPM, linked to BO record | Uploaded to CDAS, linked to BO record |
| **Online Nomination** | Available via DPM Plus and IDeAS | Available via easi/EASIEST |
| **Modification** | DPM file upload or DPM Plus | BO Modify API or CDAS |
| **Insta Demat KYC Nomination** | eservices.nsdl.com/instademat-kyc-nomination/ | Via easi portal |

### 8.3 Nominee Fields (Same as CDSL)

| Field | Required | Description |
|-------|----------|-------------|
| Nominee Name | Y | Full name |
| Relationship | Y | Relationship to account holder |
| Percentage Share | Y | Must total 100% across all nominees |
| Address | Y | Full postal address |
| Date of Birth | N | Nominee DOB |
| Email | Y (since 2025) | Nominee email |
| Mobile | Y (since 2025) | Nominee mobile |
| Guardian Name | Conditional | Required if nominee is minor |
| Guardian Relationship | Conditional | Guardian's relationship to nominee |

---

## 9. Key Differences from CDSL (Comparison Table)

### 9.1 Comprehensive Comparison

| Aspect | CDSL | NSDL |
|--------|------|------|
| **Established** | 1999 | 1996 (India's first) |
| **Promoters** | BSE, SBI, HDFC Bank, Standard Chartered | NSE, IDBI Bank, UTI |
| **Accounts** | ~16.77 crore (79.5%) | ~4.23 crore (20.5%) |
| **Custody Value** | ~Rs. 70.5 lakh crore (13.2%) | ~Rs. 464 lakh crore (86.8%) |
| **Primary Clients** | Retail investors, discount brokers | Institutional, HNI, banks |
| **BO ID Format** | 16 digits (numeric): DP ID(8) + Client ID(8) | "IN" + 14 chars: IN + DP ID(6) + Client ID(8) |
| **Core System** | CDAS (Central Depository Accounting System) | DPM (Depository Participant Module) + CDS |
| **Architecture** | Centralized (DPs connect to CDAS server) | Distributed (Local/Cloud DPM syncs with CDS) |
| **File Format** | Fixed-length positional (Lines 01-07) | UDiFF (ISO-tagged, since Mar 2024) |
| **BO Opening API** | BO Setup & Modify Upload API (REST) | Client Maintenance API (via DPM) + Insta Interface |
| **BO Opening Time** | 1-2 hours (API) | Hours to days (Insta Interface) |
| **DDPI** | Online, Aadhaar eSign, 24 hours | Offline at most DPs, 2-3 days |
| **eDIS Equivalent** | eDIS (TPIN + OTP) | SPEED-e (IPIN + OTP) |
| **Account View** | easi (read) / EASIEST (read+write) / myEasi (mobile) | IDeAS (read) / SPEED-e (read+write) / Speede App |
| **TPIN/IPIN** | TPIN: 6-digit, CDSL-generated, SMS delivery | IPIN: Password, BO-created during registration |
| **Local Module** | N/A (centralized) | GISMO (Local DPM) or Cloud DPM |
| **API Maturity** | Modern REST APIs, well-documented | DPM-based, modernizing (Client Maintenance API 2024) |
| **DPs** | ~590+ | ~280 |
| **Joint Account API** | Supported | Not supported via Insta Interface (DPM file only) |
| **Transaction Charge** | Rs. 3.50/debit instruction | Rs. 4.00/debit instruction |
| **Female Discount** | Rs. 0.25 discount | Yuva Plan (youth) has free debits |
| **DSC Provider** | RA of TCS | RA of TCS (same) |

### 9.2 Developer Impact Summary

| What | CDSL (What We Built) | NSDL (What Changes) |
|------|---------------------|---------------------|
| **BO ID Validation** | `^\d{16}$` | `^IN\d{14}$` (or `^IN[A-Z0-9]{14}$`) |
| **File Generation** | Fixed-length positional with padding | UDiFF XML-tagged format |
| **API Endpoint** | `api.cdslindia.com/APIServices` | Via Local/Cloud DPM (Client Maintenance API) |
| **DDPI Flow** | Inline during onboarding (eSign) | Async, separate step, 2-3 day wait |
| **Sell Authorization** | TPIN+OTP via eDIS API | IPIN+OTP via SPEED-e portal |
| **Report Downloads** | DPM3/DP57 from CDAS | Equivalent reports from DPM |
| **Account Status Polling** | Direct CDAS query | DPM sync + "Out file" parsing |

---

## 10. Modernization Status

### 10.1 Historical Context

NSDL, as the older depository, built its systems in the late 1990s around a distributed architecture (DPM at each DP). CDSL, established later (1999), adopted a centralized architecture (CDAS) that proved more amenable to modern API-first approaches. This is why CDSL leads in API maturity and is preferred by new-age digital brokers.

### 10.2 Recent Modernization Initiatives

| Year | Initiative | Details |
|------|-----------|---------|
| **2022** | DPM Plus | Enhanced back-office: single sign-on, billing, KRA integration, online account transfer/closure |
| **2024** | Client Maintenance API | NSDL/POLICY/2024/0012 - API for account opening and modification via DPM |
| **2024** | UDiFF Adoption | ISO-tagged format mandatory from Mar 30, 2024 (SEBI mandate) |
| **2024** | Cloud DPM | NSDL-hosted DPM eliminates on-premise infrastructure for DPs |
| **2024** | Standardized File Formats | NSDL/POLICY/2024/0041 - Aligning with SEBI's format standardization |
| **2025** | Master Circular Update | Apr 2025 - Consolidated operational guidelines, streamlined procedures |
| **2025** | Online Account Closure | DPM Plus enhanced for online closure including joint and NIL balance accounts |
| **2025** | UIP (Unified Investor Platform) | Cross-depository consolidated view (with CDSL) |
| **2026** | Extended SPEED-e Availability | Sunday availability for delivery instructions (Feb 2026 circular) |

### 10.3 Where NSDL Still Lags

| Area | CDSL Status | NSDL Status | Gap |
|------|-------------|-------------|-----|
| **Direct REST APIs** | Multiple documented REST APIs | APIs routed through DPM layer | NSDL adds DPM middleware |
| **Account Opening Speed** | 1-2 hours via API | Hours to days via Insta Interface | Significant for real-time onboarding |
| **DDPI** | Online, 24h | Mostly offline, 2-3 days | Major UX difference |
| **Joint Account API** | Supported | Not supported via API | Must use file upload |
| **API Documentation** | Public API page with specs | NDA-based, less accessible | Harder for developers |
| **DP Ecosystem** | 590+ DPs, strong discount broker presence | 280 DPs, more bank-based | Fewer integration partners |

### 10.4 Where NSDL Leads

| Area | Details |
|------|---------|
| **Institutional Depth** | 86.8% custody value - dominant for FPI, MF, insurance, banks |
| **Revenue per Account** | Rs. 91.69 vs CDSL's Rs. 33.21 - higher value transactions |
| **Government Securities** | Strong in G-Sec demat (separate DPM operating manual) |
| **UDiFF Pioneer** | UDiFF originated from NSDL/SEBI standardization initiative |
| **Global Custodian Relations** | Preferred by many global custodians for FPI accounts |

---

## 11. Transaction Types

All transaction types are the same as CDSL (SEBI-mandated uniform operations), but protocols differ.

### 11.1 Transaction Types

| Transaction | NSDL Protocol | CDSL Protocol | Notes |
|-------------|---------------|---------------|-------|
| **Dematerialization** | DPM instruction to CDS + RTA | CDAS instruction to RTA | Physical certificate to electronic |
| **Rematerialization** | DPM instruction to CDS + RTA | CDAS instruction to RTA | Electronic to physical certificate |
| **Off-Market Transfer** | DPM instruction (between NSDL accounts) | CDAS off-market module | Transfer between same depository |
| **Inter-Depository Transfer** | OLIDT (NSDL <-> CDSL) | OLIDT (CDSL <-> NSDL) | Cross-depository; 6PM weekday / 2:30PM Saturday deadline |
| **On-Market Settlement** | Via clearing corporation + DPM | Via clearing corporation + CDAS | Pay-in / pay-out |
| **Pledge** | DPM pledge instruction | CDAS pledge / eLAS / e-Margin | OTP required from BO |
| **Un-pledge** | DPM un-pledge instruction | CDAS un-pledge | Release of pledged securities |
| **Freeze / Unfreeze** | DPM freeze instruction | CDAS freeze (BO level / BO-ISIN level) | Regulatory, DP, or BO-initiated |
| **Transmission** | DPM transmission instruction | CDAS one-to-one / one-to-many | On death of holder to nominee(s) |

### 11.2 Inter-Depository Transfer (IDT) Details

| Aspect | Details |
|--------|---------|
| **Module** | OLIDT (Online Inter-Depository Transfer) |
| **Direction** | NSDL -> CDSL or CDSL -> NSDL |
| **Weekday Deadline** | 6:00 PM for DPs to verify and release IDT instructions |
| **Saturday Deadline** | 2:30 PM (1st, 3rd, 5th working Saturdays) |
| **G-Sec IDT** | Batch mode: 3 batches on weekdays, 1 batch on working Saturdays |
| **Standing Instruction** | If not given, separate receipt instruction needed for each IDT |
| **Reason Code** | Mandatory for all IDT (same codes as off-market) |

### 11.3 Off-Market Reason Codes

Reason codes are standardized across NSDL and CDSL per SEBI mandate. NSDL issued a circular in late 2025 regarding validation of reason codes during off-market execution.

| Code | Description |
|------|-------------|
| 01 | Off-Market Sale/Purchase |
| 03 | Margin Returned by Stock Broker/PCM |
| 12 | For Buy-Back |
| 13 | Open Offer for Acquisition |
| 14 | Redemption of Mutual Fund Units |
| 16 | Merger/Demerger of Corporate Entity |
| 92 | Gift |
| 93 | Donation |
| 95 | ESOP/Transfer to Employee |
| 96 | Implementation of Govt./Regulatory Direction/Orders |

> Full list same as CDSL (see CDSL_INTEGRATION.md Section 20). NSDL validates reason codes at execution time.

---

## 12. Charges

### 12.1 NSDL Charges to DPs

NSDL does not charge investors directly. It charges DPs, who set their own client-facing tariffs.

| Service | NSDL Charge to DP | Comparable CDSL Charge |
|---------|-------------------|----------------------|
| **Transaction (Debit)** | Rs. 4.00 per debit instruction | Rs. 3.50 per debit instruction |
| **AMC (DP to NSDL)** | Rs. 500/year per DP | Rs. 500/year (corporate accounts) |
| **Account Opening** | No separate charge from NSDL | No separate charge from CDSL |
| **Custody Fee** | Based on value of securities held | Based on value of securities held |

### 12.2 Typical DP Charges to Clients (Indicative)

| Charge Type | NSDL DPs (Typical Range) | CDSL DPs (Typical Range) |
|-------------|-------------------------|-------------------------|
| **Account Opening** | Rs. 0 - Rs. 500 | Rs. 0 - Rs. 500 |
| **AMC (Standard)** | Rs. 200 - Rs. 1,000/year | Rs. 200 - Rs. 750/year |
| **AMC (BSDA)** | Rs. 0 - Rs. 100/year | Rs. 0 - Rs. 100/year |
| **Transaction (Debit)** | Rs. 15 - Rs. 30 per transaction | Rs. 13.50 - Rs. 25 per transaction |
| **Dematerialization** | Rs. 50 - Rs. 150 per request | Rs. 50 - Rs. 150 per request |
| **Pledge** | Rs. 25 per ISIN | Rs. 25 per ISIN |
| **Off-Market Transfer** | Rs. 25 - Rs. 50 | Rs. 25 - Rs. 50 |
| **DDPI** | Rs. 100 + 18% GST | Rs. 100 + 18% GST |

### 12.3 Special Plans

| Plan | Details |
|------|---------|
| **NSDL Yuva Plan** | Youth demat accounts with free debit transactions from NSDL (effective Oct 1, 2024) |
| **BSDA** | Basic Services Demat Account - reduced charges for holdings up to Rs. 10 lakh. Rs. 0 AMC for holdings up to Rs. 4 lakh; standard AMC for Rs. 4-10 lakh. Eligibility checked between NSDL and CDSL. |

---

## 13. Recent Circulars (2024-2026)

### 13.1 Key NSDL Circulars

| Circular Reference | Date | Subject |
|-------------------|------|---------|
| NSDL/POLICY/2024/0012 | 2024 | Client Maintenance API - API integration for account opening and modification |
| NSDL/POLICY/2024/0026 | 2024 | Standardization of File Formats (UDiFF) |
| NSDL/POLICY/2024/0041 | 2024 | Additional UDiFF standardization across all MIIs |
| NSDL/POLICY/2024/0083 | Jun 2024 | Auditor details update on e-pass portal |
| NSDL Master Circular | Apr 30, 2025 | Master Circular for Participants (DPs) - consolidated operational guidelines |
| NSDL/POLICY/2025/0139 | Jul 2025 | Internal and Concurrent Audit of Depository Operations |
| NSDL DPM Plus Enhancement | Jul 2025 | Online demat account closure for joint and NIL balance accounts |
| NSDL/POLICY/2026/0001 | Feb 2026 | Availability of SPEED-e facility on Sunday, February 01, 2026 |
| NSDL Account Closure | Jan 2026 | Processing of "To Be Closed" requests in Account Closure module of DPM (EOD Jan 2, 2026) |

### 13.2 SEBI Circulars Applicable to Both Depositories

| Circular | Date | Impact |
|----------|------|--------|
| SEBI Master Circular for Depositories | Dec 3, 2024 | SEBI/HO/MRD/MRD-PoD-1/P/CIR/2024/168 - consolidated guidelines |
| SEBI Nomination Rules | Jan 10, 2025 | Up to 10 nominees; simplified transmission |
| SEBI Online Closure | Jul 14, 2025 | Mandatory online closure for DPs with online services |
| SEBI BSDA Revised Criteria | Jun 28, 2024 | SEBI/HO/MIRSD/MIRSDPoD1/P/CIR/2024/91 |
| SEBI DDPI | Oct 6, 2022 | DDPI replaces POA (uniform across both depositories) |

---

## 14. When to Use NSDL vs CDSL

### 14.1 Decision Matrix

| Scenario | Recommended Depository | Reason |
|----------|----------------------|--------|
| **New retail individual** | CDSL | Faster onboarding (1-2h), online DDPI, better API |
| **Client has existing NSDL demat** | NSDL (keep existing) | Avoid inter-depository transfer friction |
| **Institutional client** | NSDL | Historically preferred, global custodian relationships |
| **FPI / Foreign investor** | NSDL | Dominant in custody value, DDP relationships |
| **NRI with bank custodian** | Depends on bank | Many major banks (HDFC, ICICI) have both NSDL and CDSL DP IDs |
| **Discount broker model** | CDSL | All major discount brokers (Zerodha, Groww, etc.) are CDSL-primary |
| **HNI / Large portfolio** | Either | NSDL has higher per-account revenue, but CDSL is equally capable |
| **Government securities** | NSDL | Stronger G-Sec demat infrastructure |
| **IPO / primary market** | Either | Both support IPO credit equally |

### 14.2 Our System Strategy

```
Primary Path (Phase 1 - Live):
  └─ CDSL: All new individual retail accounts
       ├─ BO Setup API (1-2 hours)
       ├─ Inline DDPI (eSign, 24h activation)
       ├─ eDIS (TPIN+OTP for non-DDPI)
       └─ Full API integration

Secondary Path (Phase 2 - This Integration):
  └─ NSDL: Existing NSDL account holders + institutional
       ├─ Client Maintenance API via DPM (Insta Interface)
       ├─ Async DDPI (2-3 days, offline form process)
       ├─ SPEED-e (IPIN+OTP for non-DDPI)
       └─ UDiFF file generation for batch operations

Migration Support:
  └─ Inter-Depository Transfer (OLIDT)
       ├─ Client requests NSDL -> CDSL transfer
       ├─ Both DP IDs required
       ├─ Deadline: 6PM weekdays / 2:30PM Saturdays
       └─ Same-day execution
```

---

## 15. Edge Cases

### 15.1 Migration from NSDL to CDSL (Inter-Depository Transfer)

When a client with an existing NSDL demat account wants to move to CDSL (e.g., switching to our primary depository):

```
Step 1: Open new CDSL demat account (via our primary flow)
   ↓
Step 2: Client initiates IDT from NSDL to CDSL
   Option A: Via SPEED-e (online, IPIN+OTP)
   Option B: Via DIS form to NSDL DP
   ↓
Step 3: NSDL DP verifies and releases instruction
   ↓
Step 4: OLIDT processes transfer (NSDL <-> CDSL messaging)
   ↓
Step 5: Securities credited to CDSL account
   ↓
Step 6: (Optional) Client can close NSDL account after transfer
   ↓
Timeline: Same day (before 6PM weekday deadline)
```

**Important Notes**:
- IDT is per-ISIN (each security transferred separately)
- Fractional quantities cannot be transferred via IDT
- Pledged securities must be un-pledged before IDT
- Frozen securities cannot be transferred
- Both DPs must be operational and connected

### 15.2 NSDL Account for NRI with Specific Custodian Requirements

Some NRI clients have mandated custodian banks that only operate as NSDL DPs:

```
Scenario: NRI client's custodian bank (e.g., Standard Chartered) is NSDL-only DP
   ├─ Cannot open CDSL account with this custodian
   ├─ Must use NSDL for demat
   ├─ Trading account can still be with our broker
   ├─ DP services through custodian's NSDL DP
   └─ Our system must support:
        ├─ Mapping external NSDL BO ID to our trading account
        ├─ SPEED-e authorization for sell trades
        ├─ Async DDPI handling
        └─ PIS compliance verification with AD bank
```

### 15.3 Legacy NSDL Accounts with Old Format Data

Pre-UDiFF accounts (opened before Mar 2024) may have data in the old proprietary format:

```
Scenario: Client with legacy NSDL account migrates to our platform
   ├─ BO ID format is same ("IN" + 14 chars) regardless of era
   ├─ Data in DPM may still reference old field formats internally
   ├─ On modification: DPM automatically converts to UDiFF format
   ├─ No action needed from our side for format migration
   └─ KYC attributes may need update (6 mandatory attributes since 2024)
        ├─ Name (match with PAN)
        ├─ PAN (verified with ITD)
        ├─ Address (current)
        ├─ Mobile (verified via OTP)
        ├─ Email (verified via OTP)
        └─ Income Range (declared)
```

### 15.4 Dual Depository Clients

Clients who hold securities in both NSDL and CDSL:

```
Scenario: Client has NSDL demat (legacy) + opens CDSL demat (via our platform)
   ├─ Both accounts are valid and operational simultaneously
   ├─ Trading can be done from either account
   ├─ UCC (trading account) can be mapped to both BO IDs
   ├─ Settlement: broker must ensure correct depository for pay-in/pay-out
   ├─ CAS: Unified view available via UIP (Feb 2025)
   └─ Our system must:
        ├─ Store both BO IDs (NSDL + CDSL) in client master
        ├─ Allow client to select preferred depository for settlement
        ├─ Handle DDPI/eDIS differently per depository
        └─ Reconcile holdings across both accounts
```

### 15.5 Account Closure Timing

```
NSDL Account Closure (vs CDSL):
   ├─ CDSL: 2 working days from dues clearance
   ├─ NSDL: DPM Plus now supports online closure (Jul 2025 enhancement)
   │   ├─ Joint accounts: Now supported for online closure
   │   ├─ NIL balance accounts: Now supported for online closure
   │   └─ "To Be Closed" processing: Batch at EOD
   ├─ Pre-conditions (both):
   │   ├─ All free securities transferred out
   │   ├─ No outstanding dues
   │   ├─ No pending transactions
   │   └─ No pledged securities
   └─ SEBI mandate (Jul 14, 2025): Online closure must be available
```

---

## Implementation Notes

### What We Need from NSDL (Action Items)

1. **DP Registration**: Register as NSDL DP (or use existing DP partner)
2. **DPM Access**: Choose Local DPM (GISMO) or Cloud DPM
3. **Client Maintenance API Specs**: Request NSDL/POLICY/2024/0012 detailed specs
4. **Insta Interface Access**: For real-time account opening API
5. **UDiFF Catalogue**: Download from https://nsdl.co.in/nsdlnews/udiff.php
6. **SPEED-e Integration Docs**: For delivery instruction authorization
7. **DSC Certificate**: From RA of TCS (same provider as CDSL)
8. **Test Environment**: Request sandbox/UAT DPM access from NSDL
9. **IP Whitelisting**: Register production server IPs
10. **Master Circular**: Download from https://nsdl.co.in/business/circular.php

### Integration Priority (for our KYC system)

| Priority | Integration | Reason |
|----------|------------|--------|
| P0 | Client Maintenance API (via Insta Interface) | Core BO account opening for NSDL clients |
| P0 | UDiFF File Generation | Batch fallback + joint account support |
| P1 | SPEED-e Integration | Sell authorization for clients without DDPI |
| P1 | DDPI Async Flow | Handle offline DDPI process (2-3 day wait) |
| P1 | BO ID Validation | Support "IN" + 14 char format alongside CDSL 16-digit |
| P2 | Inter-Depository Transfer | NSDL-to-CDSL migration support |
| P2 | DPM Report Downloads | Reconciliation and holdings verification |
| P3 | Non-Individual UDiFF Files | Corporate, HUF, Trust account opening |
| P3 | NRI-Specific Flows | NRE/NRO with custodian bank requirements |

### Key URLs

| Resource | URL |
|----------|-----|
| NSDL Homepage | https://nsdl.co.in |
| NSDL e-Services (SPEED-e / IDeAS) | https://eservices.nsdl.com |
| Insta Demat KYC Nomination | https://eservices.nsdl.com/instademat-kyc-nomination/ |
| UDiFF Information | https://nsdl.co.in/nsdlnews/udiff.php |
| DP Circulars | https://nsdl.co.in/business/circular.php |
| NSDL Fees & Charges | https://nsdl.co.in/about/charges.php |
| NSDL Statistics | https://nsdl.co.in/about/statistics.php |
| eDPM Login | https://edpm.nsdl.com/dpm-web/login.do |
| NSDL API Overview | https://nsdl.co.in/API-BP/api_brief.html |
| SPEED-e FAQs | https://eservices.nsdl.com/SecureWeb/Faqs.html |
| SPEED-e Registration | https://eservices.nsdl.com/SecureWeb/speedehtmls/SignonSPEEDe.html |
| Account Verification (SPEED-e) | https://eservices.nsdl.com/verme-portal/ |
| NSDL Speede App (Android) | https://play.google.com/store/apps/details?id=com.msf.NSDL.Android |
| Issuer Interface | https://issuer.nsdl.com |
| NSDL Hardware Requirements | https://nsdl.co.in/joining/dephard.php |
| Master Circular (Mar 2025) | https://nsdl.co.in/downloadables/pdf/Master_circular_to_participants_march_2025.pdf |
| Client Maintenance API Circular | https://nsdl.co.in/downloadables/pdf/2024-0012-Policy-NSDL_APIs_and_Technology_Integrations_for_Market_Participants_-_Client_Maintenance_API.pdf |

---
title: BSE UCC
description: BSE Unique Client Code registration — BOLT Plus portal, PAN verification, and batch upload.
---

BSE Limited (formerly Bombay Stock Exchange), established in 1875, is Asia's oldest stock exchange and a cornerstone of India's financial infrastructure. For KYC (Know Your Customer) onboarding at a stock broking firm, BSE's UCC (Unique Client Code) registration system is a mandatory integration -- every client who trades on BSE must have a registered UCC before placing their first order. While NSE (National Stock Exchange) uses a modern REST API, BSE's UCC system is built on SOAP (Simple Object Access Protocol) web services -- a different technology that requires a different integration approach. This page covers everything you need to build that integration, from the SOAP API payloads and batch file formats to PAN (Permanent Account Number) verification, segment activation, and the BSE StAR MF (Mutual Fund) platform.

:::tip[Quick Reference]

| Item | Detail |
|------|--------|
| Exchange | BSE Limited (formerly Bombay Stock Exchange) |
| Trading System | BOLT Plus (BSE Online Trading - Plus) |
| Clearing Corporation | ICCL (Indian Clearing Corporation Limited) |
| UCC Portal | https://ucc.bseindia.com |
| SOAP API Endpoint | `https://ucc.bseindia.com/newucc/ucc_api_webservice/ucc_api_service.asmx` |
| Segments | Equity Cash, Equity Derivatives (F&O), Currency Derivatives, Debt |
| Settlement | T+1 (since Jan 27, 2023) |
| MF Platform | BSE StAR MF (https://www.bsestarmf.in) |

:::

## Table of Contents

1. [Overview](#1-overview)
2. [BOLT Plus System & Broker Connectivity](#2-bolt-plus-system--broker-connectivity)
3. [UCC Registration Methods](#3-ucc-registration-methods)
4. [SOAP API - SaveUCC](#4-soap-api---saveucc)
5. [SOAP API - SaveUCC_V2 (183 Fields)](#5-soap-api---saveucc_v2-183-fields)
6. [Non-Financial Transaction API (Nominees 4-10)](#6-non-financial-transaction-api-nominees-4-10)
7. [3-Parameter PAN Verification](#7-3-parameter-pan-verification)
8. [Batch File Format Specification](#8-batch-file-format-specification)
9. [Client Category Codes](#9-client-category-codes)
10. [Occupation Codes](#10-occupation-codes)
11. [Income Range Codes](#11-income-range-codes)
12. [Segment Activation](#12-segment-activation)
13. [Status Codes & Trading Eligibility](#13-status-codes--trading-eligibility)
14. [Non-Individual Entity Requirements](#14-non-individual-entity-requirements)
15. [BSE ICCL (Clearing Corporation)](#15-bse-iccl-clearing-corporation)
16. [BSE StAR MF Integration](#16-bse-star-mf-integration)
17. [Modification & Closure Process](#17-modification--closure-process)
18. [Error Handling & Validation Rules](#18-error-handling--validation-rules)
19. [Reconciliation & Reports](#19-reconciliation--reports)
20. [Timeline & SLA](#20-timeline--sla)
21. [Recent Circulars (Jan 2024 - Jan 2026)](#21-recent-circulars-jan-2024---jan-2026)
22. [6 KYC Attributes Compliance](#22-6-kyc-attributes-compliance)
23. [Implementation Checklist](#23-implementation-checklist)

---

Let us start with the big picture: what BSE is, how it fits into the Indian capital market ecosystem, and the scope of integration required for KYC onboarding.

## 1. Overview

BSE (formerly Bombay Stock Exchange), established in 1875, is Asia's oldest stock exchange. For KYC onboarding, the primary integration point is the **UCC (Unique Client Code)** registration system, which is mandatory before any client can trade on BSE segments.

**Key Facts**:

| Item | Detail |
|------|--------|
| Exchange | BSE Limited (formerly Bombay Stock Exchange) |
| Trading System | BOLT Plus (BSE Online Trading - Plus) |
| Clearing Corporation | ICCL (Indian Clearing Corporation Limited) |
| UCC Portal | https://ucc.bseindia.com |
| SOAP API Endpoint | https://ucc.bseindia.com/newucc/ucc_api_webservice/ucc_api_service.asmx |
| Segments | Equity Cash, Equity Derivatives (F&O), Currency Derivatives, Debt |
| Settlement | T+1 (since Jan 27, 2023) |
| MF Platform | BSE StAR MF (https://www.bsestarmf.in) |
| Test Environment | https://www.bseindia.com/nta.aspx |

**Integration Scope for KYC Onboarding**:
- UCC registration (new client)
- 3-parameter PAN verification
- Segment activation (Equity, F&O, Currency, Debt)
- Bank and depository detail linking
- Nominee registration (up to 10 nominees)
- Client modification and closure
- UCC-Demat mapping (SEBI/HO/MIRSD/DOP/CIR/P/2019/136)

:::note[BSE vs NSE: The Key Technical Difference]
NSE uses a REST API (JSON over HTTPS) introduced in January 2024. BSE uses a long-standing SOAP API (XML over HTTP). The underlying data model is now identical (183 fields, harmonized since May 2025), but the transport mechanism is fundamentally different. If you have only worked with REST APIs before, expect a different integration experience with BSE's SOAP services.
:::

Now let us understand the trading infrastructure that UCC registration feeds into.

---

Before diving into UCC registration, it helps to understand the trading system your clients will use. BOLT Plus is BSE's trading engine, and the connectivity options determine how orders flow from your application to the exchange.

## 2. BOLT Plus System & Broker Connectivity

### 2.1 Trading System

**BOLT Plus** (BSE Online Trading - Plus) is the successor to the original BOLT system launched in 1995. It is a fully electronic order-matching system supporting all BSE segments.

- Supports: Equity Cash, Equity Derivatives, Currency Derivatives, Debt
- **BOLT Plus on Web (BOW)**: Browser-based trading terminal for members who do not use dedicated front-ends

### 2.2 Connectivity Options

| Mode | Protocol | Use Case | Latency | Notes |
|------|----------|----------|---------|-------|
| **ETI** (Enhanced Trading Interface) | TCP/IP, FIX V5.0 SP2 binary | High-frequency, low-latency DMA | Lowest (~microseconds) | Proprietary session layer |
| **IML** (Intermediate Messaging Layer) | TCP/IP via `iml.ini` config | Standard broker connectivity | Low (~milliseconds) | Separate instance per segment |
| **BOW** (BOLT Plus on Web) | HTTPS (browser) | Manual trading, small brokers | Higher | No software installation |
| Leased Line | Dedicated circuit | Production primary | Fixed | BSE data center co-location |
| MPLS VPN | IP-based WAN | Production alternate | Low | Multiple PoPs |
| VSAT | Satellite | Remote / disaster recovery | Higher | For locations without terrestrial links |

In plain English: ETI is for algorithmic traders who need microsecond latency, IML is for standard brokers who run their own trading software, and BOW is for small brokers who just need a browser. The choice does not affect UCC registration -- it only affects how orders reach the exchange.

### 2.3 ETI Technical Specifications

The Enhanced Trading Interface (ETI) is BSE's lowest-latency connectivity option for algorithmic and DMA (Direct Market Access) trading.

| Attribute | Detail |
|-----------|--------|
| Protocol Basis | FIX V5.0 SP2 semantics (including all officially approved extension packs) |
| Encoding | Flat binary encoding over TCP/IP |
| Architecture | Asynchronous, message-based |
| Session Layer | Proprietary (not standard FIX session layer) |
| Session Management | Exchange provides unique Session ID per member; only one active session per Session ID at any time |
| Failover | No built-in automatic failover; participant applications must implement their own |
| Gateway | Connects via Exchange Application Gateways hosting client sessions |
| Latest Version | v1.6.10 (includes encryption + activity timestamp changes) |
| API Manual PDF | https://www.bseindia.com/downloads1/ETI_API_ManualV158.pdf |

**Key Design Characteristics**:
- Message-based rather than request-response; the exchange can push unsolicited messages
- Binary encoding (not text-based FIX tag=value) for minimal serialization overhead
- Each session is uniquely identified; reconnection requires session re-establishment
- Members must handle heartbeat, sequence number recovery, and reconnection logic

### 2.4 IML Configuration

IML (Intermediate Messaging Layer) is the standard connectivity layer between a broker's trading application and BOLT Plus.

| Attribute | Detail |
|-----------|--------|
| Config File | `iml.ini` |
| Port Parameter | `PortL` (listener port) |
| Segment Isolation | Each segment (Equity, F&O, Currency, Debt) requires a **separate IML instance** |
| IP Configuration | Both member-side and exchange-side IP + port must be configured |
| Installation Guide | https://www.bseindia.com/downloads1/NTA-IML-Installation_Guide.pdf |
| IML API Reference | https://www.bseindia.com/downloads1/BOLTPlus_IML_API_version_6.0.pdf |
| Connectivity Manual | https://www.bseindia.com/downloads1/BOLTPLUS_Connectivity_ManualV12.pdf (v1.4, Jul 2023) |

**IML Configuration Example** (`iml.ini` structure):
```ini
[IML]
PortL=<listener_port>
ExchangeIP=<exchange_gateway_ip>
ExchangePort=<exchange_gateway_port>
MemberIP=<member_application_ip>
MemberPort=<member_application_port>
Segment=<EQ|EQD|CUR|DEBT>
```

:::caution[One IML Instance Per Segment]
A common setup mistake is trying to use a single IML instance for multiple segments. Each segment (Equity, F&O, Currency, Debt) requires its own dedicated IML instance with separate port configurations.
:::

### 2.5 Test Environment

BSE provides a BOLT Plus simulation environment for integration testing. Members can connect using Exchange-provided terminal software or build custom applications.

- Portal: https://www.bseindia.com/nta.aspx
- Simulation hours are announced by BSE (typically after market hours or weekends)
- Members should test: order placement, modification, cancellation, trade confirmation, margin computation

With the trading infrastructure understood, let us move to the core topic: how to register UCCs on BSE.

---

BSE offers multiple methods for UCC registration, ranging from manual web forms to SOAP APIs to bulk batch files. The choice depends on your scale and automation needs. This section maps out all options and helps you decide.

## 3. UCC Registration Methods

BSE supports multiple methods for UCC (Unique Client Code) registration. The method chosen depends on the broker's scale and technical capability.

| Method | Capacity | Format | Interface | Best For |
|--------|----------|--------|-----------|----------|
| **Manual (BOLT Plus Web)** | 1-by-1 | Web form | https://ucc.bseindia.com | Small brokers, ad-hoc |
| **SOAP API (SaveUCC)** | Automated, single/batch | XML via SOAP 1.1/1.2 | `ucc_api_service.asmx` | Medium brokers, API integration |
| **SOAP API (SaveUCC_V2)** | Automated, 183 fields | XML via SOAP 1.1/1.2 | `ucc_api_service.asmx` | All brokers (current standard) |
| **Batch Upload (New Reg)** | Max 30,000 records/file | Pipe-delimited TXT | UCC module upload | Large brokers, bulk onboarding |
| **Batch Upload (Bank)** | Max 20,000 records/file | Pipe-delimited TXT | UCC module upload | Bank detail updates |
| **Batch Upload (Demat)** | Max 30,000 records/file | Pipe-delimited TXT | UCC module upload | Depository detail updates |
| **Batch Upload (Segments)** | Max 50,000 records/file | Pipe-delimited TXT | UCC module upload | Segment activation |

### UCC Field Structure Evolution

The BSE UCC structure has evolved significantly over 2024-2025 to accommodate SEBI (Securities and Exchange Board of India) mandates (10 nominees, enhanced KYC attributes).

| Version | Field Count | Effective Date | Status |
|---------|-------------|---------------|--------|
| Old Structure | 131 fields | Pre-2024 | **Discontinued** Aug 16, 2024 |
| Revised Structure | 150 fields | Oct 4, 2024 | Active (existing UCC creation/modification) |
| New Structure (SaveUCC_V2) | 183 fields | May 22, 2025 | **Active** (fresh UCC creation/modification) |
| Additional Nominee API | 56 fields | May 2025 | Supplementary (nominees 4-10) |

**Key Changes Across Versions**:
- 131 to 150: Added income range as mandatory attribute, enhanced address fields, mobile/email verification flags
- 150 to 183: Nominees increased from 3 to 10 (SEBI mandate effective Jan 2025), guardian relationship fields for minor clients, standardized nominee relationship codes, FATCA/CRS enhancements
- Nominees 4-10 are submitted via a separate Non-Financial Transaction API Webservice (not within the main SaveUCC payload)

In plain English: if you are building a new integration today, target the 183-field SaveUCC_V2 structure. The older formats are either discontinued or will be soon.

Now let us look at the SOAP API in detail, starting with the original SaveUCC operation.

---

The SOAP API is BSE's primary programmatic interface for UCC operations. If you are unfamiliar with SOAP, think of it as the XML equivalent of a REST API -- you send structured XML requests and receive structured XML responses. The next two sections cover both the original SaveUCC and the current SaveUCC_V2 operations.

## 4. SOAP API - SaveUCC

### 4.1 Endpoint & Protocol

| Item | Detail |
|------|--------|
| WSDL / Endpoint | `https://ucc.bseindia.com/newucc/ucc_api_webservice/ucc_api_service.asmx` |
| Protocol | SOAP 1.1 and SOAP 1.2 |
| Operation | `SaveUCC` |
| SOAPAction | `http://tempuri.org/SaveUCC` |
| Input Parameter | `XmlUCCdata` (string containing XML-encoded UCC data) |
| Output Parameter | `SaveUCCResult` (string containing result XML) |
| Content-Type (1.1) | `text/xml; charset=utf-8` |
| Content-Type (1.2) | `application/soap+xml; charset=utf-8` |

### 4.2 SOAP 1.1 Request Envelope

```xml
POST /newucc/ucc_api_webservice/ucc_api_service.asmx HTTP/1.1
Host: ucc.bseindia.com
Content-Type: text/xml; charset=utf-8
SOAPAction: "http://tempuri.org/SaveUCC"

<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
               xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
               xmlns:xsd="http://www.w3.org/2001/XMLSchema">
  <soap:Body>
    <SaveUCC xmlns="http://tempuri.org/">
      <XmlUCCdata>string</XmlUCCdata>
    </SaveUCC>
  </soap:Body>
</soap:Envelope>
```

### 4.3 SOAP 1.1 Response Envelope

```xml
HTTP/1.1 200 OK
Content-Type: text/xml; charset=utf-8

<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
               xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
               xmlns:xsd="http://www.w3.org/2001/XMLSchema">
  <soap:Body>
    <SaveUCCResponse xmlns="http://tempuri.org/">
      <SaveUCCResult>string</SaveUCCResult>
    </SaveUCCResponse>
  </soap:Body>
</soap:Envelope>
```

### 4.4 SOAP 1.2 Request Envelope

```xml
POST /newucc/ucc_api_webservice/ucc_api_service.asmx HTTP/1.1
Host: ucc.bseindia.com
Content-Type: application/soap+xml; charset=utf-8

<?xml version="1.0" encoding="utf-8"?>
<soap12:Envelope xmlns:soap12="http://www.w3.org/2003/05/soap-envelope"
                 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                 xmlns:xsd="http://www.w3.org/2001/XMLSchema">
  <soap12:Body>
    <SaveUCC xmlns="http://tempuri.org/">
      <XmlUCCdata>string</XmlUCCdata>
    </SaveUCC>
  </soap12:Body>
</soap12:Envelope>
```

### 4.5 SOAP 1.2 Response Envelope

```xml
HTTP/1.1 200 OK
Content-Type: application/soap+xml; charset=utf-8

<?xml version="1.0" encoding="utf-8"?>
<soap12:Envelope xmlns:soap12="http://www.w3.org/2003/05/soap-envelope"
                 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                 xmlns:xsd="http://www.w3.org/2001/XMLSchema">
  <soap12:Body>
    <SaveUCCResponse xmlns="http://tempuri.org/">
      <SaveUCCResult>string</SaveUCCResult>
    </SaveUCCResponse>
  </soap12:Body>
</soap12:Envelope>
```

### 4.6 XmlUCCdata Payload Structure (SaveUCC - 150 Fields)

The `XmlUCCdata` parameter is a string containing XML-encoded client data. The XML must be properly escaped when embedded inside the SOAP envelope.

```xml
<UCCDetails>
  <TradingMemberID>123456</TradingMemberID>
  <ClientCode>ABCD001234</ClientCode>
  <ClientNameFirst>RAKESH</ClientNameFirst>
  <ClientNameMiddle></ClientNameMiddle>
  <ClientNameLast>KUMAR</ClientNameLast>
  <PAN>ABCDE1234F</PAN>
  <DOB>01/01/1990</DOB>
  <Gender>M</Gender>
  <ClientCategory>01</ClientCategory>
  <OccupationCode>02</OccupationCode>
  <AddressLine1>123 MG ROAD SECTOR 5</AddressLine1>
  <AddressLine2>NEAR METRO STATION</AddressLine2>
  <AddressLine3></AddressLine3>
  <City>GURGAON</City>
  <State>HR</State>
  <Pincode>122001</Pincode>
  <Country>IN</Country>
  <MobileNo>9876543210</MobileNo>
  <EmailID>rakesh.kumar@email.com</EmailID>
  <IncomeRange>03</IncomeRange>
  <BankAccountNo>1234567890123</BankAccountNo>
  <BankIFSC>SBIN0001234</BankIFSC>
  <BankAccountType>SB</BankAccountType>
  <DPID>12345678</DPID>
  <DPClientID>12345678</DPClientID>
  <Depository>CDSL</Depository>
  <KYCStatus>Y</KYCStatus>
  <AadhaarMasked>XXXXXXXX1234</AadhaarMasked>
  <FATCADeclaration>Y</FATCADeclaration>
  <Nominee1Name>PRIYA KUMAR</Nominee1Name>
  <Nominee1Relationship>SPOUSE</Nominee1Relationship>
  <Nominee1PAN>XYZAB5678C</Nominee1PAN>
  <Nominee1Percentage>100</Nominee1Percentage>
  <POAFunds>N</POAFunds>
  <POASecurities>N</POASecurities>
  <EquitySegment>Y</EquitySegment>
  <EquityDerivativesSegment>N</EquityDerivativesSegment>
  <CurrencyDerivativesSegment>N</CurrencyDerivativesSegment>
  <DebtSegment>N</DebtSegment>
  <ClientStatus>A</ClientStatus>
  <!-- ... additional fields up to 150 ... -->
</UCCDetails>
```

:::caution[XML Encoding is Critical]
The XML string inside `<XmlUCCdata>` must be properly XML-encoded. Ampersands become `&amp;`, angle brackets become `&lt;` and `&gt;`. Failure to encode properly is one of the most common causes of SOAP call failures. Test with names containing ampersands (e.g., "M&M") to verify your encoding.
:::

**Important Notes**:
- All date fields must be in `DD/MM/YYYY` format
- PAN must be in `AAAAA9999A` format (5 alpha + 4 numeric + 1 alpha)
- Mobile must be exactly 10 digits
- Pincode must be exactly 6 digits

The SaveUCC operation supports the 150-field structure. For new registrations, you should use SaveUCC_V2 with the full 183-field structure, covered next.

---

SaveUCC_V2 is the current standard for all new UCC registrations on BSE. It extends the original SaveUCC with 33 additional fields, primarily to support 10 nominees, enhanced FATCA/CRS (Foreign Account Tax Compliance Act / Common Reporting Standard) reporting, and minor client guardianship details.

## 5. SOAP API - SaveUCC_V2 (183 Fields)

### 5.1 Endpoint & Protocol

| Item | Detail |
|------|--------|
| WSDL / Endpoint | `https://ucc.bseindia.com/newucc/ucc_api_webservice/ucc_api_service.asmx` |
| Operation | `SaveUCC_V2` |
| SOAPAction | `http://tempuri.org/SaveUCC_V2` |
| Input Parameter | `XmlUCCdata` (string containing XML-encoded UCC data, 183 fields) |
| Output Parameter | `SaveUCCResult` (string containing result XML) |
| Effective Date | May 22, 2025 |
| Mandate | Required for all fresh UCC creation and modification |

### 5.2 SOAP 1.1 Request Envelope (SaveUCC_V2)

```xml
POST /newucc/ucc_api_webservice/ucc_api_service.asmx HTTP/1.1
Host: ucc.bseindia.com
Content-Type: text/xml; charset=utf-8
SOAPAction: "http://tempuri.org/SaveUCC_V2"

<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
               xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
               xmlns:xsd="http://www.w3.org/2001/XMLSchema">
  <soap:Body>
    <SaveUCC_V2 xmlns="http://tempuri.org/">
      <XmlUCCdata>string</XmlUCCdata>
    </SaveUCC_V2>
  </soap:Body>
</soap:Envelope>
```

### 5.3 SOAP 1.2 Request Envelope (SaveUCC_V2)

```xml
POST /newucc/ucc_api_webservice/ucc_api_service.asmx HTTP/1.1
Host: ucc.bseindia.com
Content-Type: application/soap+xml; charset=utf-8

<?xml version="1.0" encoding="utf-8"?>
<soap12:Envelope xmlns:soap12="http://www.w3.org/2003/05/soap-envelope"
                 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                 xmlns:xsd="http://www.w3.org/2001/XMLSchema">
  <soap12:Body>
    <SaveUCC_V2 xmlns="http://tempuri.org/">
      <XmlUCCdata>string</XmlUCCdata>
    </SaveUCC_V2>
  </soap12:Body>
</soap12:Envelope>
```

### 5.4 Key Additions in 183-Field Structure (over 150-field)

The SaveUCC_V2 structure adds 33 fields primarily for:

| Category | New Fields | Purpose |
|----------|-----------|---------|
| Nominees 1-3 Enhanced | Nominee DOB, Nominee Address, Nominee Guardian (for minor nominees) | SEBI nominee enhancement mandate |
| Guardian Enhanced | Guardian Relationship, Guardian Address, Guardian Mobile | Minor client compliance |
| FATCA/CRS Enhanced | Tax Residency Country 2/3, TIN 2/3, TIN Reason Codes | Multi-jurisdiction reporting |
| Nomination Opt-Out | NominationOptOut flag, NominationOptOutVideoRef | Video verification for opt-out |
| KYC Attributes | CKYCNumber, KRAStatus, KRASource | Cross-reference fields |
| Additional Contact | AlternateMobile, AlternateEmail | Communication redundancy |

### 5.5 Nominee Fields in SaveUCC_V2

For each of Nominees 1-3 (within the main SaveUCC_V2 payload):

| Field | Type | Length | Mandatory | Notes |
|-------|------|--------|-----------|-------|
| NomineeXName | Alpha | 70 | M (if opted in) | Full name |
| NomineeXRelationship | Alpha | 20 | M | Standardized relationship code |
| NomineeXPAN | Alphanumeric | 10 | O | PAN of nominee |
| NomineeXPercentage | Numeric | 3 | M | 1-100; total across all nominees must = 100 |
| NomineeXDOB | Date | 10 | M (V2) | DD/MM/YYYY |
| NomineeXAddress | Alphanumeric | 200 | O (V2) | Full address of nominee |
| NomineeXGuardianName | Alpha | 70 | M (if minor) | Required if nominee is a minor |
| NomineeXGuardianRelationship | Alpha | 20 | M (if minor) | Relationship of guardian to nominee |

Where `X` = 1, 2, or 3.

**Nominees 4-10**: Cannot be submitted via SaveUCC_V2. Must use the separate Non-Financial Transaction API Webservice (see Section 6).

:::note[Split Nominee Submission]
This is a design quirk worth noting: nominees 1-3 go through the main SaveUCC_V2 call, but nominees 4-10 require a completely separate API. Your system needs to handle this two-step submission and ensure nominee percentages total exactly 100 across both calls.
:::

The next section covers the separate API for nominees 4 through 10.

---

SEBI mandated support for up to 10 nominees effective January 2025. Because the main SaveUCC_V2 API only accommodates nominees 1-3, BSE created a separate API for the remaining nominees. This section covers that supplementary integration.

## 6. Non-Financial Transaction API (Nominees 4-10)

### 6.1 Overview

SEBI mandated support for up to 10 nominees effective Jan 2025 (extended deadline Mar 1, 2025 for demat accounts). The main SaveUCC / SaveUCC_V2 APIs support only Nominees 1-3. Nominees 4 through 10 must be registered via a separate API.

| Item | Detail |
|------|--------|
| API | Non-Financial Transaction API Webservice |
| Field Count | 56 fields (for nominees 4-10 block) |
| Effective | May 2025 |
| Prerequisite | UCC must already be created via SaveUCC / SaveUCC_V2 |
| Constraint | Nominees 1-3 must be populated in the main UCC record first |

### 6.2 Nominee 4-10 Fields (per nominee)

| Field | Type | Length | Mandatory | Notes |
|-------|------|--------|-----------|-------|
| ClientCode | Alphanumeric | 10 | M | Must match existing UCC |
| NomineeSequence | Numeric | 2 | M | 4-10 |
| NomineeName | Alpha | 70 | M | Full name |
| NomineeRelationship | Alpha | 20 | M | Standardized code |
| NomineePAN | Alphanumeric | 10 | O | |
| NomineePercentage | Numeric | 3 | M | Allocation percentage |
| NomineeDOB | Date | 10 | M | DD/MM/YYYY |
| NomineeAddress | Alphanumeric | 200 | O | |
| NomineeGuardianName | Alpha | 70 | M (if minor) | |
| NomineeGuardianRelationship | Alpha | 20 | M (if minor) | |

**Validation**: Total percentage across ALL nominees (1-10) must equal exactly 100.

With the API structures covered, let us turn to PAN verification -- the mandatory check that determines whether a client can trade.

---

PAN verification is the single most important gate in the UCC registration process. BSE's 3-parameter check (PAN + Name + DOB) is like a bouncer checking your ID against the guest list -- all three must match or you are turned away. This section covers how the verification works and how to handle failures.

## 7. 3-Parameter PAN Verification

### 7.1 Overview

BSE mandates 3-parameter PAN verification against NSDL/Protean (Income Tax Department) records for every client before granting PTT (Permitted to Trade) status.

### 7.2 The Three Parameters

| # | Parameter | Field Description | Mandatory |
|---|-----------|-------------------|-----------|
| 1 | **PAN Number** | 10-character alphanumeric in `AAAAA9999A` format | Yes - for all holders |
| 2 | **Client Name** | Name exactly as per PAN/ITD (Income Tax Department) records | Yes - for all holders |
| 3 | **DOB / DOI / DOR** | Date of Birth (individuals), Date of Incorporation (companies), Date of Registration (other entities) | Yes - for all holders **including Guardian** |

### 7.3 Verification Result Codes

| Code | Status | Meaning | Trading Impact |
|------|--------|---------|----------------|
| **A** | Approved | All 3 parameters match ITD records | Eligible for PTT |
| **I** | Incorrect | One or more parameters do not match ITD records | **NOT** eligible for PTT |
| **P** | Pending | Verification in progress (ITD system processing) | **NOT** eligible for PTT |

### 7.4 Verification Rules

1. **DOB/DOI is mandatory** for ALL holders including Guardian in case of Minor Client (category 02)
2. If Client Name or DOB differs from ITD records, the client must **correct at ITD** (Income Tax Department) **before** resubmission to BSE
3. Once PAN is marked `I` (Incorrect), the UCC record **cannot** be marked PTT until corrected
4. Special PAN `AAAAA8888A` is used for Central Government / State Government / Court-appointed officials
5. **PAN-Aadhaar seeding is NO LONGER a parameter** for PTT status (per NSE circular NSE/ISC/62244, May 30, 2024; BSE follows the same rule)
6. Only clients with PAN status `A` (Approved) are eligible for PTT
7. NRI PANs must be either "PAN-Aadhaar linked" or marked "Not applicable" per ITD records

### 7.5 PTT Decision Matrix

| PAN Status | KYC Compliant | Bank Verified | Demat Linked | Result |
|------------|---------------|---------------|--------------|--------|
| A | Yes | Yes | Yes | **PTT** (Permitted to Trade) |
| A | No | Yes | Yes | NPTT - complete KYC |
| A | Yes | No | Yes | NPTT - verify bank |
| A | Yes | Yes | No | NPTT - link demat |
| I | Any | Any | Any | **NPTT** - correct PAN at ITD |
| P | Any | Any | Any | **NPTT** - wait for verification |

In plain English: PTT requires ALL four conditions to be met -- PAN approved, KYC complete, bank verified, and demat linked. If any one fails, the client cannot trade.

Beyond the SOAP API, BSE also supports batch file uploads for high-volume operations. The next section documents the batch file format.

---

Batch files are essential for bulk operations -- migrating clients from another broker, doing end-of-day reconciliation, or activating segments across thousands of clients at once. BSE supports significantly higher batch limits than NSE (30,000 vs 10,000 records per file), making batch uploads particularly useful for large-scale operations.

## 8. Batch File Format Specification

### 8.1 File Structure

| Attribute | Detail |
|-----------|--------|
| Delimiter | Pipe (`\|`) |
| Encoding | UTF-8 or ASCII |
| Row Structure | **Two rows per client**: Row 1 (general info) + Row 2 (director details for non-individual) |
| Headers | **No header row** |
| Line Ending | CRLF (Windows) or LF (Unix) |
| File Extension | `.txt` |

### 8.2 Batch Upload Limits

| Operation | Max Records per File | Effective Circular Date |
|-----------|---------------------|------------------------|
| New Registration / Modification | 30,000 | Feb 23, 2024 |
| Bank Details Update | 20,000 | Feb 23, 2024 |
| Depository Details Update | 30,000 | Jul 29, 2024 |
| Segment Activation | 50,000 | Jul 29, 2024 |

:::tip[BSE Has Higher Batch Limits]
BSE allows up to 30,000 records per registration file (vs NSE's 10,000) and 50,000 for segment activation (vs NSE's 10,000). If you are migrating a large client base, BSE batch processing can be significantly more efficient.
:::

### 8.3 Row 1 - General Information (Revised Format, effective Apr 19, 2024)

| # | Field Name | Type | Max Length | Mandatory | Valid Values / Notes |
|---|-----------|------|-----------|-----------|---------------------|
| 1 | Trading Member ID | Alphanumeric | 6 | M | BSE member code assigned by exchange |
| 2 | Client Code | Alphanumeric | 10 | M | Unique per member; max 10 chars |
| 3 | Client Name (First) | Alpha | 70 | M | Must match PAN/ITD records |
| 4 | Client Name (Middle) | Alpha | 35 | O | |
| 5 | Client Name (Last) | Alpha | 35 | M | Must match PAN/ITD records |
| 6 | PAN | Alphanumeric | 10 | M | `AAAAA9999A` format (5 alpha + 4 numeric + 1 alpha) |
| 7 | Date of Birth / DOI / DOR | Date | 10 | M | `DD/MM/YYYY` format |
| 8 | Gender | Alpha | 1 | M (Indiv.) | `M` = Male, `F` = Female, `T` = Transgender |
| 9 | Client Category | Numeric | 2 | M | See [Section 9](#9-client-category-codes) |
| 10 | Occupation Code | Numeric | 2 | M | See [Section 10](#10-occupation-codes) |
| 11 | Address Line 1 | Alphanumeric | 100 | M | **Cannot start with client name** |
| 12 | Address Line 2 | Alphanumeric | 100 | O | Cannot equal Address Line 1 or 3 |
| 13 | Address Line 3 | Alphanumeric | 100 | O | Cannot equal Address Line 1 or 2 |
| 14 | City | Alpha | 35 | M | |
| 15 | State | Alpha | 2 | M | State code (e.g., `MH`, `DL`, `KA`, `HR`) |
| 16 | Pincode | Numeric | 6 | M | Valid Indian pincode |
| 17 | Country | Alpha | 2 | M | `IN` for India |
| 18 | Mobile Number | Numeric | 10 | M | Must be pre-verified |
| 19 | Email ID | Alphanumeric | 100 | M | Must be pre-verified |
| 20 | Income Range | Numeric | 2 | M | See [Section 11](#11-income-range-codes) |
| 21 | Bank Account Number | Alphanumeric | 20 | M | |
| 22 | Bank IFSC Code | Alphanumeric | 11 | M | Format: 4 alpha + `0` + 6 alphanumeric |
| 23 | Bank Account Type | Alpha | 2 | M | `SB` = Savings, `CA` = Current |
| 24 | DP ID | Alphanumeric | 8 or 16 | M | NSDL: `IN` + 6 chars; CDSL: 8 digits |
| 25 | DP Client ID | Alphanumeric | 8 or 16 | M | NSDL: 8 chars; CDSL: 8 digits |
| 26 | Depository | Alpha | 4 | M | `CDSL` or `NSDL` |
| 27 | KYC Status | Alpha | 1 | M | `Y` = KYC compliant, `N` = Not compliant |
| 28 | Aadhaar Number (masked) | Numeric | 12 | O | Last 4 digits visible (XXXXXXXX1234) |
| 29 | FATCA Declaration | Alpha | 1 | M | `Y` = Declared, `N` = Not declared |
| 30 | Nominee 1 Name | Alpha | 70 | M* | *Mandatory if nomination opted in |
| 31 | Nominee 1 Relationship | Alpha | 20 | M* | Standardized code |
| 32 | Nominee 1 PAN | Alphanumeric | 10 | O | |
| 33 | Nominee 1 Percentage | Numeric | 3 | M* | 1-100; total across all nominees must = 100 |
| 34 | Nominee 2 Name | Alpha | 70 | O | |
| 35 | Nominee 2 Relationship | Alpha | 20 | O* | Mandatory if Nominee 2 Name provided |
| 36 | Nominee 2 PAN | Alphanumeric | 10 | O | |
| 37 | Nominee 2 Percentage | Numeric | 3 | O* | Mandatory if Nominee 2 Name provided |
| 38 | Nominee 3 Name | Alpha | 70 | O | |
| 39 | Nominee 3 Relationship | Alpha | 20 | O* | Mandatory if Nominee 3 Name provided |
| 40 | Nominee 3 PAN | Alphanumeric | 10 | O | |
| 41 | Nominee 3 Percentage | Numeric | 3 | O* | Mandatory if Nominee 3 Name provided |
| 42 | Nomination Opt-Out Flag | Alpha | 1 | O | `Y` = Opted out (requires video verification) |
| 43 | POA for Funds | Alpha | 1 | O | `Y`/`N` (DDPI replaced POA since Nov 2022) |
| 44 | POA for Securities | Alpha | 1 | O | `Y`/`N` |
| 45 | Equity Segment | Alpha | 1 | M | `Y`/`N` |
| 46 | Equity Derivatives Segment | Alpha | 1 | O | `Y`/`N` |
| 47 | Currency Derivatives Segment | Alpha | 1 | O | `Y`/`N` |
| 48 | Debt Segment | Alpha | 1 | O | `Y`/`N` |
| 49 | Client Status by Member | Alpha | 1 | M | `A` = Active, `I` = Inactive, `C` = Closed |
| 50 | Guardian Name | Alpha | 70 | M (minor) | Required if Client Category = `02` |
| 51 | Guardian PAN | Alphanumeric | 10 | M (minor) | |
| 52 | Guardian DOB | Date | 10 | M (minor) | `DD/MM/YYYY` |
| 53 | Guardian Relationship | Alpha | 20 | M (minor) | Relationship to minor |
| 54 | Second Holder Name | Alpha | 70 | O | For joint holdings |
| 55 | Second Holder PAN | Alphanumeric | 10 | O | |
| 56 | Third Holder Name | Alpha | 70 | O | |
| 57 | Third Holder PAN | Alphanumeric | 10 | O | |
| ... | (Additional fields up to ~150) | | | | Including FATCA/CRS, enhanced nominee fields, etc. |

### 8.4 Row 2 - Director Details (Non-Individual Entities Only)

Applicable for Client Categories: 04 (Company), 06 (Partnership), 07 (Body Corporate).

| # | Field Name | Type | Max Length | Mandatory | Notes |
|---|-----------|------|-----------|-----------|-------|
| 1 | Action | Alpha | 3 | M | `NEW` = Add director, `DEL` = Remove director |
| 2 | Client Code | Alphanumeric | 10 | M | Must match Row 1 Client Code |
| 3 | Director Name | Alpha | 70 | M | Full name |
| 4 | DIN | Numeric | 8 | M | Director Identification Number (for companies) |
| 5 | Whether Foreign Resident | Alpha | 1 | M | `Y` / `N` |
| 6 | Director PAN | Alphanumeric | 10 | M | PAN of the director |

### 8.5 Sample Batch File

```
123456|ABCD001234|RAKESH||KUMAR|ABCDE1234F|01/01/1990|M|01|02|123 MG ROAD SECTOR 5|NEAR METRO STATION||GURGAON|HR|122001|IN|9876543210|rakesh@email.com|03|1234567890123|SBIN0001234|SB|12345678|12345678|CDSL|Y|XXXXXXXX1234|Y|PRIYA KUMAR|SPOUSE|XYZAB5678C|100||||||||||N|N|Y|N|N|N|A|||||||||
123456|EFGH005678|ACME TRADERS PVT LTD||LTD|AABCA1234B|15/06/2010||04|01|456 INDUSTRIAL AREA PHASE 2|OKHLA||NEW DELHI|DL|110020|IN|9812345678|info@acme.in|05|9876543210987|HDFC0001234|CA|IN301234|12345678|NSDL|Y||Y|||||||||||N|N|Y|Y|N|N|A|||||||||
NEW|EFGH005678|SURESH SHARMA|12345678|N|BBBBB2345C
NEW|EFGH005678|ANITA GUPTA|23456789|N|CCCCC3456D
```

### 8.6 Address Validation Rules

These rules are strictly enforced during batch upload validation:

| Rule # | Validation | Rejection If |
|--------|-----------|-------------|
| 1 | Address Line 1 must NOT start with Client Name | Line 1 begins with first/last name |
| 2 | Address Line 1 and Line 2 must NOT be identical | Line 1 == Line 2 |
| 3 | Address Line 1 and Line 3 must NOT be identical | Line 1 == Line 3 |
| 4 | Address Line 2 and Line 3 must NOT be identical | Line 2 == Line 3 |
| 5 | Address must match submitted documents | Mismatch with Aadhaar/Passport/DL address |
| 6 | Pincode must be 6 digits | Non-numeric or wrong length |
| 7 | State code must be valid 2-character code | Invalid state abbreviation |

The next several sections cover the code tables used in UCC records. These are SEBI-standardized and identical across all exchanges, but understanding them is essential for building your validation logic.

---

Client category codes classify each entity type. The category you assign determines which additional fields are mandatory and what trading capabilities apply. For a retail broking firm, category 01 (Individual) will account for the vast majority of onboarding, but your system must handle the full range.

## 9. Client Category Codes

### 9.1 Individual & Domestic Categories (01-13)

| Code | Category | Entity Type | Notes |
|------|----------|-------------|-------|
| 01 | Individual | Person | Most common; UPI applicable (Cash segment) |
| 02 | On behalf of Minor | Person (Guardian acting) | Guardian details mandatory; PAN of minor + guardian both required |
| 03 | HUF (Hindu Undivided Family) | Non-individual | Karta details mandatory; UPI applicable (Cash segment) |
| 04 | Company | Non-individual | DOI, CIN, Director details mandatory (Row 2) |
| 05 | AOP (Association of Persons) | Non-individual | |
| 06 | Partnership Firm | Non-individual | Partner details required; Director row applicable |
| 07 | Body Corporate | Non-individual | DOI, CIN/Reg No., Director details (Row 2) |
| 08 | Trust | Non-individual | Trust deed registration, Trustee details |
| 09 | Society | Non-individual | |
| 10 | Others | Miscellaneous | |
| 11 | NRI - Others | NRI | |
| 12 | DFI (Development Financial Institution) | Institutional | |
| 13 | Sole Proprietorship | Non-individual | |

### 9.2 NRI Categories (21-29)

| Code | Category | Account Type | Key Requirements |
|------|----------|-------------|------------------|
| 21 | NRI - Repatriable (NRE) | NRE Bank Account | RBI PIS permission letter, NRE account |
| 22 | OCB (Overseas Corporate Body) | Varies | |
| 23 | FII (Foreign Institutional Investor) | Varies | |
| 24 | NRI - Repatriable (NRO) | NRO Bank Account | RBI PIS permission letter, NRO account |
| 25 | Overseas Corp. Body - Others | Varies | |
| 26 | NRI Child | NRO/NRE | Guardian acting on behalf |
| 27 | NRI - HUF (NRO) | NRO | NRI HUF with NRO account |
| 28 | NRI - Minor (NRO) | NRO | NRI minor with NRO account |
| 29 | NRI - HUF (NRE) | NRE | NRI HUF with NRE account |

### 9.3 Institutional Categories (31-39)

| Code | Category | Notes |
|------|----------|-------|
| 31 | Provident Fund | |
| 32 | Super Annuation Fund | |
| 33 | Gratuity Fund | |
| 34 | Pension Fund | |
| 36 | Mutual Funds FOF Schemes | Fund of Funds |
| 37 | NPS Trust | National Pension System |
| 38 | GDN (Global Development Network) | |
| 39 | FCRA | Foreign Contribution Regulation Act entities |

### 9.4 QFI Categories (41-46)

| Code | Category | Notes |
|------|----------|-------|
| 41 | QFI - Individual | Qualified Foreign Investor |
| 42 | QFI - Minors | |
| 43 | QFI - Corporate | |
| 44 | QFI - Pension Funds | |
| 45 | QFI - Hedge Funds | |
| 46 | QFI - Mutual Funds | |

### 9.5 UPI Applicability

UPI-based trading (Block Mechanism / ASBA-like for secondary market) is applicable **only** for:
- Client Category `01` (Individual)
- Client Category `03` (HUF)
- Cash segment only
- Mandatory for Qualified Stock Brokers (QSBs) from Feb 1, 2025

---

## 10. Occupation Codes

| Code | Occupation | Typical Client Profile |
|------|-----------|----------------------|
| 01 | Business | Self-employed, business owner, entrepreneur |
| 02 | Services (Salaried) | Employed in private/public sector |
| 03 | Professional | Doctor, lawyer, CA, engineer (independent practice) |
| 04 | Agriculture | Farmer, agriculturist |
| 05 | Retired | Retired from service/business |
| 06 | Housewife | Homemaker |
| 07 | Student | Currently enrolled in education |
| 08 | Others | Any occupation not in 01-07 |

**Notes**:
- Occupation code is mandatory for all client categories
- For non-individual entities, use the primary nature of business (01 for business entities, 08 for institutional)
- Occupation influences income validation checks (e.g., Student with income range 06 may trigger review)

---

Income range codes determine F&O (Futures and Options) eligibility and are one of the 6 mandatory KYC attributes. Understanding these codes is essential for building correct segment activation logic.

## 11. Income Range Codes

| Code | Income Range (Annual, INR) | F&O Eligibility |
|------|---------------------------|-----------------|
| 01 | Below 1 Lakh | No (income too low for F&O) |
| 02 | 1 Lakh - 5 Lakh | No |
| 03 | 5 Lakh - 10 Lakh | No |
| 04 | 10 Lakh - 25 Lakh | Yes (meets SEBI threshold) |
| 05 | 25 Lakh - 1 Crore | Yes |
| 06 | Above 1 Crore | Yes |

**Notes**:
- Income range is one of the **6 mandatory KYC attributes** (Name, PAN, Address, Mobile, Email, Income Range) required for UCC compliance
- For F&O segment activation, income must be >= 10 Lakh (code 04 or above) OR client must provide net worth certificate
- Income range is self-declared; however, for F&O segments, supporting documents (ITR, salary slip, bank statement, net worth certificate) are required per SEBI guidelines
- SEBI enhanced F&O eligibility criteria: SEBI/HO/MRD/TPD-1/P/CIR/2025/33
- Non-individual entities: Use the entity's annual turnover/income

Now let us cover segment activation -- the mechanism that controls which market segments a client can trade in on BSE.

---

Segment activation on BSE follows the same SEBI rules as NSE, but there is one notable difference: BSE does not have a commodity segment (commodities trade on NSE and MCX). This section covers the available segments, eligibility requirements, and the batch activation process.

## 12. Segment Activation

### 12.1 Available Segments

| Segment | Code | Income Proof Required | Additional Requirements |
|---------|------|----------------------|------------------------|
| **Equity Cash** | EQ | No | Basic KYC sufficient |
| **Equity Derivatives (F&O)** | EQD | **Yes** (income >= 10L or net worth) | SEBI F&O eligibility criteria; risk disclosure |
| **Currency Derivatives** | CUR | No specific income requirement | |
| **Debt** | DEBT | No | |

### 12.2 F&O Eligibility (SEBI Enhanced Criteria)

Per SEBI/HO/MRD/TPD-1/P/CIR/2025/33, the following must be validated before activating F&O:

| Criterion | Requirement |
|-----------|-------------|
| Income | Annual income >= Rs. 10 Lakh (income range code 04 or above) |
| OR Net Worth | Net worth >= Rs. 10 Lakh (net worth certificate from CA, valid for 1 year) |
| Risk Disclosure | Client must acknowledge F&O risk disclosure document |
| Knowledge Assessment | Exchange-specific awareness questionnaire |
| Income Proof | ITR / Salary Slip / Bank Statement / CA Certificate |

### 12.3 Segment Activation Batch

| Item | Detail |
|------|--------|
| Max Records | 50,000 per file |
| Format | Pipe-delimited TXT |
| Key Fields | Client Code, EQ (Y/N), EQD (Y/N), CUR (Y/N), DEBT (Y/N) |
| Processing | Overnight batch cycle |
| SLA | T+1 (activated by next trading day) |

### 12.4 Segment-Specific Notes

- **UPI Block Mechanism**: Mandatory for QSBs from Feb 1, 2025 for secondary market orders (ASBA-like). Applicable only to Equity Cash segment for Individual (01) and HUF (03) categories
- **Currency Derivatives**: Available for all client categories; no specific income threshold
- **Debt Segment**: Separate activation required; minimal additional documentation
- Each segment requires a separate IML instance for BOLT Plus connectivity

With segment activation covered, let us look at the status codes that govern a client's lifecycle -- from registration through PTT to potential closure.

---

Status codes determine whether a client can trade on BSE. Understanding the status matrix and the transitions between states is critical for building correct lifecycle management in your system.

## 13. Status Codes & Trading Eligibility

### 13.1 PAN Verification Status

| Code | Status | Meaning | Can Proceed to PTT? |
|------|--------|---------|---------------------|
| **A** | Approved | All 3 parameters (PAN + Name + DOB) match ITD records | Yes |
| **I** | Incorrect | One or more parameters do not match | No - must correct at ITD |
| **P** | Pending | Verification in progress at ITD | No - must wait |

### 13.2 Trading Eligibility Status

| Status | Code | Description | Can Trade? |
|--------|------|-------------|-----------|
| **Permitted to Trade** | PTT | UCC fully compliant, PAN approved, KYC complete, bank + demat verified | **Yes** |
| **Not Permitted to Trade** | NPTT | Missing KYC, PAN not approved, bank/demat issues, or inactive | **No** |

### 13.3 Client Account Status

| Status | Code | Description | Transitions |
|--------|------|-------------|-------------|
| **Active** | A | Client actively registered and eligible (if PTT) | Can move to I or C |
| **Inactive** | I | Member-deactivated or non-compliant; temporarily suspended | Can move to A (with re-verification) |
| **Closed** | C | Account permanently closed by member | **Irreversible** - cannot reopen |

:::caution[Closed is Irreversible]
Once a UCC is marked Closed (`C`), it can never be reopened. A new UCC must be registered if the client wishes to trade again. Implement a confirmation step with a cooling-off period in your system before allowing closure.
:::

### 13.4 Combined Status Matrix

| PAN Status | Client Status | KYC Complete | Bank Verified | Demat Linked | Result |
|------------|---------------|-------------|---------------|--------------|--------|
| A | A | Y | Y | Y | **PTT** - Can trade |
| A | A | N | Y | Y | NPTT - Complete KYC |
| A | A | Y | N | Y | NPTT - Verify bank |
| A | A | Y | Y | N | NPTT - Link demat |
| A | I | Y | Y | Y | NPTT - Reactivate account |
| I | A | Y | Y | Y | NPTT - Correct PAN at ITD |
| P | A | Y | Y | Y | NPTT - Wait for PAN verification |
| Any | C | Any | Any | Any | NPTT - Account closed (irreversible) |

In plain English: every row in this matrix represents a real scenario your operations team will encounter. Build your client dashboard to surface the exact reason a client is NPTT, so the operations team can take targeted action.

The next section covers the additional requirements for non-individual entities.

---

Most clients are individuals, but your system must also handle companies, trusts, partnerships, HUFs (Hindu Undivided Families), and NRIs (Non-Resident Indians). Each entity type has specific mandatory fields and documents beyond the standard individual requirements.

## 14. Non-Individual Entity Requirements

### 14.1 Requirements by Entity Type

| Entity (Code) | Extra Mandatory Fields | Key Documents |
|---------------|----------------------|---------------|
| **HUF (03)** | Karta Name, Karta PAN, Karta DOB, HUF PAN | HUF deed, Karta PAN, HUF PAN |
| **Company (04)** | DOI, CIN, Director details (Name, DIN, PAN, Foreign Resident flag), Authorized signatory | MOA, AOA, Board resolution, CIN certificate |
| **Partnership (06)** | Partnership PAN, Partner details, Authorized signatory | Partnership deed, Partner PANs |
| **Body Corporate (07)** | DOI, CIN/Registration No., Director details | Registration certificate, Board resolution |
| **Trust (08)** | Trust deed registration, Trustee details | Trust deed, Trustee PANs |
| **Society (09)** | Registration number, Authorized signatory | Society registration certificate |
| **Sole Prop (13)** | Proprietor PAN (same as entity PAN typically) | Business registration, Proprietor ID |

### 14.2 NRI-Specific Requirements

| Requirement | Detail |
|-------------|--------|
| RBI PIS Permission | Portfolio Investment Scheme permission letter from designated AD bank (required for equity trading) |
| Bank Account | NRE account for repatriable (category 21/29); NRO account for non-repatriable (category 24/27/28) |
| CP Code | Custodial Participant code requirement **REMOVED** by SEBI (July 2025) |
| PAN-Aadhaar | NRI PANs must be either "PAN-Aadhaar linked" or marked "Not applicable" per ITD records |
| Bank Account Type | Both Current and Savings permissible for HUF/Trust/Society tax status |
| Seafarer NRIs | Some documentation requirements relaxed |
| Re-KYC | NRI KYC relaxation for re-KYC process (SEBI circular Dec 10, 2025) |

### 14.3 Director Details (Row 2 of Batch File)

Required for: Company (04), Body Corporate (07), Partnership (06).

**Operations**:
- `NEW`: Add a new director to the entity's UCC record
- `DEL`: Remove an existing director from the entity's UCC record

**Fields per Director**:
| Field | Format | Mandatory |
|-------|--------|-----------|
| Action | `NEW` or `DEL` | Yes |
| Client Code | Must match Row 1 | Yes |
| Director Name | Alpha, max 70 chars | Yes |
| DIN | 8-digit numeric | Yes (for companies) |
| Foreign Resident | `Y` / `N` | Yes |
| Director PAN | `AAAAA9999A` format | Yes |

Now let us look at BSE's clearing corporation, ICCL, and how it relates to UCC registration.

---

Every trade on BSE generates settlement obligations managed by ICCL. Understanding this relationship helps you appreciate why UCC compliance has financial consequences beyond order rejection -- margins, collateral, and settlement obligations are all tracked at the UCC level.

## 15. BSE ICCL (Clearing Corporation)

### 15.1 Overview

**ICCL** (Indian Clearing Corporation Limited) is the clearing corporation subsidiary of BSE, responsible for clearing and settlement of all trades executed on BSE.

### 15.2 UCC-ICCL Linkage

| Aspect | Detail |
|--------|--------|
| Trade Validation | Every trade on BSE requires a valid UCC; ICCL generates obligations per UCC |
| UCC-Demat Mapping | Mandatory per SEBI/HO/MIRSD/DOP/CIR/P/2019/136 |
| Pay-in Transactions | Normal/Early pay-in requires mandatory UCC details |
| Clearing Members | Settle all obligations (margins, penalties, levies) for their trading members |

### 15.3 Client-Level Collateral (SEBI Circular Jul 20, 2021)

| Requirement | Detail |
|-------------|--------|
| Collateral Segregation | Client-level collateral segregation mandatory |
| Cash Component | 50% of margins and collateral must be in cash/cash equivalents |
| Confidence Interval | Initial margins at 99.99% confidence interval |
| Haircuts | Applied on real-time basis |
| Client Portal | Web portal for clients to view disaggregated (segment-wise, asset-type) collateral |
| Daily Upload | Clearing members must upload collateral data **daily** |

### 15.4 Settlement

| Item | Detail |
|------|--------|
| Equity Cash | T+1 settlement (since Jan 27, 2023) |
| Derivatives | T+1 for premium, MTM daily |
| MF Units | Via StAR MF platform |
| Clearing Bank | Clearing members must maintain clear balance in depository account + funds in clearing bank |
| Acceptable Collateral | Equity securities with impact cost <= 0.1% for Rs. 1 Lakh order, traded >= 99% of days in previous 6 months |

BSE also operates a mutual fund distribution platform called StAR MF. If your broking firm plans to distribute mutual funds, the next section covers how StAR MF integrates with UCC and KYC.

---

BSE StAR MF is India's largest mutual fund distribution platform by transaction volume. If your broking firm distributes mutual funds, this integration is essential. The KYC and UCC requirements overlap significantly with the equity trading UCC, making it efficient to build both integrations together.

## 16. BSE StAR MF Integration

### 16.1 Platform Overview

**BSE StAR MF** (Stock Exchange Aggregation and Reporting - Mutual Funds) is BSE's mutual fund distribution platform that allows brokers, distributors, and RIAs (Registered Investment Advisors) to process MF transactions.

### 16.2 API Details

| Item | Detail |
|------|--------|
| Production Endpoint | `https://www.bsestarmf.in/StarMFWebService/StarMFWebService.svc` |
| WSDL / Help | `https://www.bsestarmf.in/StarMFWebService/StarMFWebService.svc/help` |
| API Structure Doc (v3.1) | https://www.bsestarmf.in/APIFileStructure.pdf |
| Web File Structures | https://bsestarmf.in/WEBFileStructure.pdf (Apr 10, 2024) |
| Protocol | SOAP 1.2 (recommended), SOAP 1.1 supported |
| Testing Tool | SOAPUI (open-source) recommended; Postman requires manual XML crafting |
| Test Environment | Request via navaneetha.krishnan@bsetech.in or aqsa.shaikh@bsetech.in |

### 16.3 Authentication

| Item | Detail |
|------|--------|
| Credentials | Web Service ID + Password (provided by BSE to each member) |
| Pass Key | Alphanumeric, **no special characters**, required at every login |
| Session | Managed via `getPassword` / authentication methods |

### 16.4 Key SOAP Methods

| Method | Purpose | KYC Relevance |
|--------|---------|---------------|
| `getPassword` | Session authentication | Pre-requisite for all calls |
| `MFAPI` (UCC Registration) | Create/modify UCC for MF platform | **Yes** - requires KYC + bank details |
| `MFAPI` (Client Master Upload) | Upload client details for MFI/MFD/RFD/RFI/RIA | **Yes** |
| `MFAPI` (Order Entry) | Purchase/Redeem/SIP/STP/SWP transactions | No |
| `MFAPI` (Client Order Payment Status) | Query payment and order status | No |
| `MFAPI` (Mandate Registration) | Register auto-debit mandate (pre-req for SIP) | Partial |

### 16.5 StAR MF SOAP 1.2 Example (getPassword)

```xml
POST /StarMFWebService/StarMFWebService.svc HTTP/1.1
Host: www.bsestarmf.in
Content-Type: application/soap+xml; charset=utf-8

<?xml version="1.0" encoding="utf-8"?>
<soap12:Envelope xmlns:soap12="http://www.w3.org/2003/05/soap-envelope"
                 xmlns:star="http://www.bsestarmf.in/StarMFWebService/">
  <soap12:Body>
    <star:getPassword>
      <star:UserId>YOUR_MEMBER_ID</star:UserId>
      <star:Password>YOUR_PASSWORD</star:Password>
      <star:PassKey>YOUR_PASS_KEY</star:PassKey>
    </star:getPassword>
  </soap12:Body>
</soap12:Envelope>
```

### 16.6 KYC Relationship with StAR MF

- Before executing MF transactions, UCC must be created with KYC + demat + bank details
- PAN entered triggers system check of KYC status for primary holder
- If KYC not done, Video KYC link can be initiated after initial UCC form section
- Eligible client types: Individuals, HUF, Corporate Body (subject to KYC compliance)
- For minors: guardian must be KYC compliant
- Client Master Structure: 150 fields (existing) or 183 fields (new, from May 2025)

### 16.7 Tax Status / Holding Codes (StAR MF)

Tax Status codes align with Client Category Codes (Section 9).

**Holding Nature Codes**:

| Code | Holding Nature |
|------|---------------|
| SI | Single |
| JO | Joint |
| AS | Anyone or Survivor |

Now let us cover modifications and closures -- the ongoing lifecycle management of UCC records.

---

Client data changes are inevitable. Whether it is an address update, a bank account change, or a full account closure, this section covers the rules, processes, and important constraints you need to build into your system.

## 17. Modification & Closure Process

### 17.1 Modification

| Aspect | Detail |
|--------|--------|
| Portal | https://ucc.bseindia.com (login and select "Modify") |
| Batch | Same file format as registration; submit only modified records |
| Non-Financial Changes | Address, mobile, email, bank details, demat details via batch upload |
| Financial Changes | Segment activation/deactivation via separate segment activation batch |
| PAN Verification Changes | Effective Apr 30, 2024 (new methodology) |

**What Can Be Modified**:
- Personal details (address, contact)
- Bank account details
- Depository details (DP ID, Client ID)
- Segment subscriptions
- Nominee details
- Income range
- FATCA/CRS information
- Client status (Active/Inactive)

**What Cannot Be Modified**:
- PAN number (requires new UCC if PAN changes)
- Client Code (immutable after creation)
- Trading Member ID

### 17.2 Client Status Transitions

| From Status | To Status | Action Required | SLA |
|-------------|-----------|----------------|-----|
| Active (A) | Inactive (I) | Member updates via UCC portal or batch; client cannot trade | Immediate |
| Active (A) | Closed (C) | Member closes account; update UCC status; final settlement | Immediate; settlements T+1 |
| Inactive (I) | Active (A) | Re-verification of 6 KYC attributes required | T+2 working days |
| Closed (C) | Active (A) | **Not possible** - new UCC registration required | N/A |

### 17.3 Closure Process

1. Complete all pending settlements and clear all financial obligations
2. Transfer or close all open positions (no open orders/positions allowed)
3. Settle running account (if applicable)
4. Update client status to `C` (Closed) in UCC database
5. UCC automatically marked as NPTT (Not Permitted to Trade)
6. Inform all exchanges (BSE, NSE, MCX) where UCC was registered
7. Close demat account linkage (notify CDSL/NSDL)
8. Retain records per SEBI retention policy (minimum 5-8 years; 8 years under SEBI Stock Brokers Regulations 2026)
9. Issue final account statement to client

**Critical**: Closure is **irreversible**. A closed UCC cannot be reopened. If the client wishes to trade again, a completely new UCC registration is required.

When things go wrong -- and in a system processing thousands of UCCs, they will -- you need to understand error codes and validation rules. The next section is your debugging reference.

---

Error handling is where your integration will be tested the most. This section catalogues the validation rules, common rejection reasons, and SOAP error codes you will encounter, along with the resolution for each. Keep this section bookmarked.

## 18. Error Handling & Validation Rules

### 18.1 Common Validation Rules (Batch Upload)

| # | Rule | Field(s) | Rejection Condition |
|---|------|----------|-------------------|
| 1 | All mandatory fields populated | All M fields | Any mandatory field blank |
| 2 | PAN format | PAN | Not `AAAAA9999A` (5 alpha + 4 numeric + 1 alpha) |
| 3 | Date format | DOB, DOI, DOR | Not `DD/MM/YYYY` |
| 4 | Mobile format | Mobile Number | Not exactly 10 digits |
| 5 | Email format | Email ID | Invalid email syntax |
| 6 | Pincode format | Pincode | Not exactly 6 digits |
| 7 | IFSC format | Bank IFSC | Not 11 characters (4 alpha + `0` + 6 alphanumeric) |
| 8 | Address Line 1 | Address | Starts with client name |
| 9 | Address distinctness | Address Lines 1/2/3 | Any two lines identical |
| 10 | Nominee percentage | Nominee 1-3 % | Total does not equal 100 (if nominees present) |
| 11 | Client Code uniqueness | Client Code | Duplicate within same Trading Member |
| 12 | Income range | Income Range | Missing or invalid code |
| 13 | Client Category | Client Category | Invalid code (not in 01-46 table) |
| 14 | Depository | Depository | Not `CDSL` or `NSDL` |
| 15 | Gender | Gender | Not `M`, `F`, or `T` (for individuals) |
| 16 | Bank Account Type | Account Type | Not `SB` or `CA` |
| 17 | Guardian fields (minor) | Guardian Name/PAN/DOB | Missing when Client Category = `02` |

### 18.2 Common Rejection Reasons

| Rejection Type | Cause | Resolution |
|---------------|-------|-----------|
| **PAN Incorrect (I)** | Name/DOB mismatch with ITD records | Client corrects at Income Tax Department, then broker resubmits |
| **Address validation fail** | Addr Line 1 starts with name, or lines duplicated | Fix address formatting per rules |
| **Mobile/Email unverified** | Mobile or email not verified prior to submission | Complete OTP/email verification first |
| **Duplicate UCC** | Same PAN already registered under another Client Code with same member | Merge accounts or close the duplicate |
| **Missing mandatory fields** | Required fields are blank or contain invalid data | Complete all mandatory fields |
| **KYC non-compliant** | All 6 KYC attributes not valid | Update all 6 attributes (Name, PAN, Address, Mobile, Email, Income) |
| **Bank details invalid** | IFSC code not found or account number invalid | Correct bank details; verify via penny drop |
| **Demat details invalid** | DP (Depository Participant) ID / Client ID mismatch with depository records | Verify DP ID and Client ID with CDSL/NSDL |
| **PAN-Aadhaar not linked** | PAN marked inoperative at ITD | Client links Aadhaar at ITD portal (exception: NRI with "Not applicable" status) |
| **Income range missing** | No income declaration provided | Client provides income range (mandatory KYC attribute) |
| **Nominee percentage mismatch** | Total nominee % does not equal 100 | Adjust percentages to total exactly 100 |

### 18.3 Correction & Resubmission Process

1. Download rejection report from UCC portal after batch processing (available next morning for overnight batches)
2. Identify rejection reason codes per record in the report
3. Correct the data in source system (KYC application)
4. Resubmit **only** the corrected records in a new batch file
5. **Do NOT** resubmit already-accepted records (will cause duplicate UCC errors)
6. For PAN-related rejections: client must first correct at ITD, then broker resubmits
7. Monitor resubmission results in next batch cycle

:::tip[Automate Rejection Handling]
Build an automated parser for BSE rejection reports that maps each error to the original record, flags the specific field that failed, and queues the record for correction. This is essential for handling batch uploads at scale.
:::

### 18.4 SOAP API Error Response Format

```xml
<SaveUCCResult>
  <Status>FAILURE</Status>
  <ErrorCode>ERR_PAN_MISMATCH</ErrorCode>
  <ErrorMessage>PAN verification failed - Name does not match ITD records</ErrorMessage>
  <ClientCode>ABCD001234</ClientCode>
  <FieldName>ClientNameFirst</FieldName>
</SaveUCCResult>
```

Common SOAP error codes:

| Error Code | Description | Action |
|-----------|-------------|--------|
| ERR_PAN_MISMATCH | PAN/Name/DOB mismatch with ITD | Correct at ITD |
| ERR_DUPLICATE_UCC | Client Code already exists | Use different code or modify existing |
| ERR_INVALID_FORMAT | Field format validation failed | Check field formats |
| ERR_MANDATORY_MISSING | Required field not provided | Fill all mandatory fields |
| ERR_INVALID_SEGMENT | Invalid segment code or ineligible | Check eligibility |
| ERR_BANK_INVALID | Bank account/IFSC invalid | Verify bank details |
| ERR_DEMAT_INVALID | DP ID/Client ID not found | Verify with depository |
| ERR_AUTH_FAILED | API authentication failure | Check credentials |

Monitoring and reconciliation are essential for production operations. The next section covers the reports BSE provides and how to use them.

---

Daily reconciliation is not optional -- it is how you catch compliance drift before it blocks your clients from trading. This section covers the reports BSE provides and the reconciliation processes you should implement.

## 19. Reconciliation & Reports

### 19.1 Available Reports

| Report | Frequency | Access Method | Purpose |
|--------|-----------|--------------|---------|
| UCC Client Master Report | On-demand | BSE StAR MF: Admin >> Admin Reports >> Client Master Reports (TXT download) | Full client list |
| PAN Verification Status | Daily | UCC portal download | PAN A/I/P status per client |
| UCC Compliance Report | Daily | UCC portal | Lists PTT / NPTT status per client |
| Trade Confirmation | Daily (T+0) | BOLT Plus / BOW trade logs | Trade execution details |
| Obligation Report | Settlement day | ICCL portal | Settlement obligations |
| Margin Report | Daily | ICCL (segment-wise, client-level) | Margin requirements |
| Collateral Report | Daily | ICCL web portal (client disaggregation) | Collateral positions |
| Rejection/Error Report | Per batch upload | Available after batch processing | Batch rejection details |
| 6 KYC Attribute Compliance | Periodic | Exchange-level compliance monitoring | KYC attribute status |

### 19.2 Reconciliation Process

**Daily Reconciliation** (recommended):
1. Download PAN Verification Status report from BSE UCC portal
2. Compare with internal KYC database for any new `I` (Incorrect) or `P` (Pending) statuses
3. Download UCC Compliance Report to identify NPTT clients
4. Cross-reference with internal active client list
5. Flag any discrepancies for immediate resolution

**Post-Batch Reconciliation**:
1. After each batch upload, download the Rejection/Error Report
2. Match submitted records against accepted/rejected counts
3. For accepted records, verify PTT status on T+1
4. For rejected records, initiate correction workflow

Now let us look at the SLAs and timelines that govern BSE UCC operations.

---

Understanding SLAs helps you set the right expectations with your product and operations teams. The most important question is always: "When can the client start trading?" This section provides definitive answers.

## 20. Timeline & SLA

### 20.1 Operation SLAs

| Operation | SLA | Notes |
|-----------|-----|-------|
| **New UCC to PTT** | T+1 (next trading day) | UCCs compliant by 22:00 hrs on T are PTT on T+1 |
| **Emergency PTT Processing** | Same day (T) if submitted by 14:30 hrs | Exigency provision; PTT by next trading session |
| **UPI-based UCC activation** | Same day if by 16:00 hrs | Must have validated PAN, bank, demat by 4 PM |
| **Account Reactivation** | T+2 working days | T = day confirmation of re-verification provided |
| **Batch Upload Processing** | Overnight (T+1 morning) | Files uploaded during trading hours processed in overnight batch cycle |
| **PAN Verification** | Real-time to T+1 | Depends on ITD (Income Tax Department) system availability |
| **Segment Activation** | T+1 | Subject to income/eligibility validation |
| **SOAP API Response** | Near real-time (seconds) | Individual record processing |
| **Rejection Report** | T+1 morning | Available after overnight batch processing |

### 20.2 Cut-off Times

| Activity | Cut-off Time | Notes |
|----------|-------------|-------|
| UCC submission for next-day PTT | 22:00 hrs (T) | Records compliant by 10 PM get PTT next day |
| Emergency PTT request | 14:30 hrs (T) | Same-day activation for urgent cases |
| UPI activation | 16:00 hrs (T) | PAN + bank + demat must be validated by 4 PM |
| Batch file upload | No fixed cut-off | But processing happens overnight |
| Modification effective | T+1 | Non-financial modifications processed overnight |

:::note[The 10 PM Rule]
Just like NSE, the critical SLA to remember: if a compliant UCC is submitted before 10 PM (22:00 hrs), the client gets PTT status the next trading day. Design your batch processes around this cutoff.
:::

The regulatory landscape for BSE UCC has evolved significantly over 2024-2025. The next section documents the key circulars that shaped the current system.

---

Staying current with circulars is essential. Each one can change field formats, add new mandatory fields, or alter eligibility criteria. The following timeline gives you the regulatory context for how the BSE UCC system reached its current state.

## 21. Recent Circulars (Jan 2024 - Jan 2026)

### 21.1 Complete Timeline

| Date | Circular / Notice | Subject | Impact |
|------|------------------|---------|--------|
| Jan 22, 2024 | BSE Notice | New UCC format effective; old format coexists | Transition period begins |
| Feb 23, 2024 | BSE Circular | Batch upload file format for bank account details (max 20K records) | New bank detail batch format |
| Feb 23, 2024 | BSE Circular | Revised file formats in UCC system | Updated field definitions |
| Mar 20, 2024 | BSE Reminder | Implementation deadline reminder for revised formats | Migration urgency |
| Mar 27, 2024 | BSE Notice | Final reminder; old format discontinued Mar 28, 2024 EOD | **Hard deadline** |
| Mar 28, 2024 | BSE Effective | Old format no longer accepted | 131-field format discontinued |
| Apr 18, 2024 | BSE Notice | Revised file formats effective Apr 19, 2024 EOD | Current batch format active |
| Apr 30, 2024 | BSE Notice | PAN verification methodology changes effective | New 3-param verification rules |
| May 30, 2024 | NSE/ISC/62244 (BSE follows) | PAN-Aadhaar seeding no longer required for PTT | Simplified PTT criteria |
| Jul 29, 2024 | BSE Circular | Batch upload for Depository details (max 30K); Segment activation (max 50K) | New batch types added |
| Aug 7, 2024 | BSE Notice | Client Master Structure revision to 150 fields | Field count increase |
| Aug 16, 2024 | BSE Effective | Old 131-field UCC structure fully discontinued | **No backward compatibility** |
| Oct 4, 2024 | BSE Effective | 150-field revised structure goes live | Current production structure |
| Jan 10, 2025 | BSE Notice | Modification of Client Codes enhancement in RTRMS and BEFS modules | Back-office system updates |
| Feb 1, 2025 | SEBI Effective | UPI Block Mechanism mandatory for QSBs (secondary market) | Trading workflow change |
| Mar 1, 2025 | SEBI Effective | Nomination opt-out/opt-in deadline for demat accounts; up to 10 nominees | Nominee fields expanded |
| May 22, 2025 | BSE Notice | New 183-field UCC Registration API Structure (SaveUCC_V2) effective | **Current API standard** |
| May 29, 2025 | BSE Circular | 183-field structure document published for members | Detailed field spec available |
| Jul 2025 | SEBI | CP (Custodial Participant) code requirement removed for NRIs | NRI onboarding simplified |
| Dec 10, 2025 | SEBI Circular | NRI KYC relaxation for re-KYC process | Reduced re-KYC burden for NRIs |
| Jan 7, 2026 | SEBI | New Stock Brokers Regulations 2026 notified (replaces 1992 regs) | Comprehensive regulatory overhaul |

The 6 KYC attributes must be consistent across all systems. The next section explains these attributes and the cross-system consistency requirements specific to BSE.

---

The 6 KYC attributes are the backbone of client compliance. They must match across the KRA (KYC Registration Agency), the exchange (BSE and NSE), and the depository (CDSL/NSDL). A mismatch in any one of them can block trading. This section explains the attributes and the consistency requirements.

## 22. 6 KYC Attributes Compliance

### 22.1 Mandatory Attributes

The 6 KYC attributes must match across **KRA**, **Exchange (BSE/NSE)**, and **Depository (CDSL/NSDL)** records.

| # | Attribute | BSE UCC Field | Validation |
|---|-----------|---------------|-----------|
| 1 | **Name** | ClientNameFirst + ClientNameMiddle + ClientNameLast | Must match PAN/ITD records exactly |
| 2 | **PAN** | PAN | Valid, non-inoperative, `AAAAA9999A` format |
| 3 | **Address** | AddressLine1 + AddressLine2 + AddressLine3 + City + State + Pincode | Complete with valid pincode |
| 4 | **Mobile Number** | MobileNo | 10 digits, verified via OTP |
| 5 | **Email ID** | EmailID | Valid format, verified via link/OTP |
| 6 | **Income Range** | IncomeRange | Valid code 01-06 |

### 22.2 Cross-System Consistency

| System | Attribute Source | Sync Requirement |
|--------|-----------------|-----------------|
| KRA (CVL/NDML/DOTEX/CAMS/KFintech) | KYC application form | Upload within 3 working days |
| BSE UCC | UCC registration API/batch | Must match KRA record |
| NSE UCC | UCI Online / API | Must match KRA record |
| MCX (Multi Commodity Exchange) UCC | MCX CONNECT | Must match KRA record |
| CDSL (Central Depository Services Limited) BO Account | CDAS | Must match KRA record |
| NSDL (National Securities Depository Limited) BO Account | DPM / Insta Interface | Must match KRA record |

Any mismatch in the 6 attributes across these systems results in compliance flags and potential trading blocks.

:::caution[Cross-System Sync is Non-Negotiable]
When a client updates their address on one system, that same update must propagate to all others. Your KYC system should treat these updates as a single atomic operation -- update one, update all.
:::

Finally, here is the implementation checklist to guide your development and go-live process.

---

## 23. Implementation Checklist

### 23.1 Pre-Integration

- [ ] Obtain BSE Trading Member ID (6-character code)
- [ ] Register for UCC portal access at https://ucc.bseindia.com
- [ ] Obtain SOAP API credentials (for SaveUCC / SaveUCC_V2)
- [ ] Request BSE StAR MF Web Service ID + Password (if MF distribution)
- [ ] Set up test environment connectivity (https://www.bseindia.com/nta.aspx)
- [ ] Obtain BOLT Plus connectivity (ETI/IML) for trading
- [ ] Configure IML instances (one per segment)

### 23.2 Development

- [ ] Implement SOAP client for SaveUCC_V2 (183 fields)
- [ ] Implement batch file generation (pipe-delimited, Row 1 + Row 2)
- [ ] Implement 3-parameter PAN verification flow
- [ ] Build address validation logic (all 7 rules)
- [ ] Implement nominee management (1-3 via SaveUCC_V2, 4-10 via Non-Financial API)
- [ ] Build client category routing (individual vs non-individual vs NRI)
- [ ] Implement segment activation logic with F&O eligibility checks
- [ ] Build error handling for all SOAP error codes
- [ ] Implement batch rejection report parsing and correction workflow

### 23.3 Testing

- [ ] Test SaveUCC with Individual client (category 01)
- [ ] Test SaveUCC with Minor client (category 02) including Guardian fields
- [ ] Test SaveUCC with Company (category 04) including Director details (Row 2)
- [ ] Test SaveUCC with NRI client (categories 21/24)
- [ ] Test batch upload with 100+ records
- [ ] Test address validation rules (all 7 rejection scenarios)
- [ ] Test PAN verification with A/I/P results
- [ ] Test segment activation for F&O (income validation)
- [ ] Test nominee submission (3 via SaveUCC_V2 + 4-10 via Non-Financial API)
- [ ] Test modification workflow (status change, bank update, address update)
- [ ] Test error response handling for all error codes
- [ ] Validate PTT timing (submit by 22:00, verify PTT on T+1)

### 23.4 Go-Live

- [ ] Switch from test to production endpoint
- [ ] Verify production SOAP API connectivity
- [ ] Submit first production UCC and verify PTT
- [ ] Set up daily reconciliation process (PAN status + compliance reports)
- [ ] Configure batch upload schedule (if using batch method)
- [ ] Set up monitoring and alerting for API failures
- [ ] Document SLA escalation process for emergency PTT requests

---

## Appendix A: State Codes

| Code | State |
|------|-------|
| AN | Andaman & Nicobar |
| AP | Andhra Pradesh |
| AR | Arunachal Pradesh |
| AS | Assam |
| BR | Bihar |
| CH | Chandigarh |
| CG | Chhattisgarh |
| DD | Daman & Diu |
| DL | Delhi |
| DN | Dadra & Nagar Haveli |
| GA | Goa |
| GJ | Gujarat |
| HP | Himachal Pradesh |
| HR | Haryana |
| JH | Jharkhand |
| JK | Jammu & Kashmir |
| KA | Karnataka |
| KL | Kerala |
| LA | Ladakh |
| LD | Lakshadweep |
| MH | Maharashtra |
| ML | Meghalaya |
| MN | Manipur |
| MP | Madhya Pradesh |
| MZ | Mizoram |
| NL | Nagaland |
| OD | Odisha |
| PB | Punjab |
| PY | Puducherry |
| RJ | Rajasthan |
| SK | Sikkim |
| TN | Tamil Nadu |
| TG | Telangana |
| TR | Tripura |
| UK | Uttarakhand |
| UP | Uttar Pradesh |
| WB | West Bengal |

---

## Appendix B: Nominee Relationship Codes (Standardized)

| Code | Relationship |
|------|-------------|
| SPOUSE | Spouse (Husband/Wife) |
| SON | Son |
| DAUGHTER | Daughter |
| FATHER | Father |
| MOTHER | Mother |
| BROTHER | Brother |
| SISTER | Sister |
| GRANDSON | Grandson |
| GRANDDAUGHTER | Granddaughter |
| GRANDFATHER | Grandfather |
| GRANDMOTHER | Grandmother |
| UNCLE | Uncle |
| AUNT | Aunt |
| NEPHEW | Nephew |
| NIECE | Niece |
| FRIEND | Friend |
| OTHERS | Others (specify) |

---

## Appendix C: Key URLs & References

| Resource | URL |
|----------|-----|
| BSE UCC Portal | https://ucc.bseindia.com |
| UCC SOAP API Endpoint | https://ucc.bseindia.com/newucc/ucc_api_webservice/ucc_api_service.asmx |
| BSE StAR MF Endpoint | https://www.bsestarmf.in/StarMFWebService/StarMFWebService.svc |
| StAR MF Help/WSDL | https://www.bsestarmf.in/StarMFWebService/StarMFWebService.svc/help |
| StAR MF API Structure (v3.1) | https://www.bsestarmf.in/APIFileStructure.pdf |
| StAR MF Web File Structure | https://bsestarmf.in/WEBFileStructure.pdf |
| ETI API Manual (v1.6.10) | https://www.bseindia.com/downloads1/ETI_API_ManualV158.pdf |
| IML Installation Guide | https://www.bseindia.com/downloads1/NTA-IML-Installation_Guide.pdf |
| IML API (v6.0) | https://www.bseindia.com/downloads1/BOLTPlus_IML_API_version_6.0.pdf |
| BOLT Plus Connectivity Manual | https://www.bseindia.com/downloads1/BOLTPLUS_Connectivity_ManualV12.pdf |
| BSE Test Environment | https://www.bseindia.com/nta.aspx |
| SEBI Stock Brokers Master Circular | SEBI/HO/MIRSD/MIRSD-PoD/P/CIR/2025/90 |
| SEBI KYC Master Circular | SEBI/HO/MIRSD/MIRSD-SEC-2/P/CIR/2023/168 |
| UCC-Demat Mapping Circular | SEBI/HO/MIRSD/DOP/CIR/P/2019/136 |
| StAR MF Test Env Contact | navaneetha.krishnan@bsetech.in / aqsa.shaikh@bsetech.in |

---

*This document is a detailed companion to [Vendor Integrations](/broking-kyc/vendors/) Section V12 (BSE). It should be read alongside [Master Dataset](/broking-kyc/reference/master-dataset) for field-level data mapping.*

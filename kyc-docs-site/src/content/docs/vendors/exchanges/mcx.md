---
title: MCX UCC
description: MCX Unique Client Code registration — MCX CONNECT, CTCL API, and commodity-specific requirements.
---


## Table of Contents

1. [Exchange Overview](#1-exchange-overview)
2. [MCX CONNECT / T7 Trading System](#2-mcx-connect--t7-trading-system)
3. [Connectivity Options](#3-connectivity-options)
4. [CTCL (Computer-to-Computer Link)](#4-ctcl-computer-to-computer-link)
5. [UCC Registration](#5-ucc-registration)
6. [3-Parameter PAN Verification](#6-3-parameter-pan-verification)
7. [Client Categories (Commodity-Specific)](#7-client-categories-commodity-specific)
8. [Income Proof Requirements](#8-income-proof-requirements)
9. [Batch File Format Specification](#9-batch-file-format-specification)
10. [NRI Restrictions](#10-nri-restrictions)
11. [Non-Individual Entity Requirements](#11-non-individual-entity-requirements)
12. [Commodity Segments & Trading Hours](#12-commodity-segments--trading-hours)
13. [MCX iCOMDEX Indices](#13-mcx-icomdex-indices)
14. [MCXCCL (Clearing Corporation)](#14-mcxccl-clearing-corporation)
15. [Position Limits](#15-position-limits)
16. [Differences from NSE/BSE](#16-differences-from-nsebse)
17. [Penalties & Compliance](#17-penalties--compliance)
18. [Recent Circulars (2024-2026)](#18-recent-circulars-2024-2026)
19. [Key Documents to Obtain](#19-key-documents-to-obtain)

---

## 1. Exchange Overview

MCX (Multi Commodity Exchange of India Ltd.) is India's largest commodity derivatives exchange, regulated by SEBI under the Securities Contracts (Regulation) Act, 1956. It offers trading in commodity futures and options across bullion, base metals, energy, and agricultural commodities.

| Attribute | Details |
|-----------|---------|
| Full Name | Multi Commodity Exchange of India Limited |
| Regulator | SEBI (Securities and Exchange Board of India) |
| Clearing Corp | MCXCCL (MCX Clearing Corporation Limited) |
| Trading System | MCX CONNECT (T7 platform, post-Project Udaan) |
| Exchange Code | MCX |
| Segments | Commodity Derivatives (Futures + Options) |
| Settlement | MCXCCL (wholly-owned subsidiary) |
| Trading Hours | 9:00 AM - 11:30/11:55 PM (non-agri), 9:00 AM - 5:00 PM (agri) |
| Exchange Website | https://www.mcxindia.com |
| Member Portal | https://www.mcxindia.com/members |
| Circular Repository | https://www.mcxindia.com/market-operations/circulars |

---

## 2. MCX CONNECT / T7 Trading System

### 2.1 Project Udaan

MCX undertook a complete technology transformation called **Project Udaan**, migrating to a new trading and clearing platform:

| Component | Old System | New System (Post-Udaan) | Go-Live |
|-----------|-----------|------------------------|---------|
| Trading Engine | In-house | **T7 Trading Architecture** (Deutsche Borse / Eurex technology) | October 2023 |
| Clearing & Settlement | In-house | **TCS BaNCS** for Market Infrastructure | October 2023 |
| Trading Terminal | MCX Trader Workstation | **MCX Trade Station (MTS)** | October 2023 |
| Member Admin | Legacy portal | **Member Control Station (MCS)** | October 2023 |

### 2.2 T7 Trading Architecture

The T7 system is the same core engine used by Deutsche Borse (Eurex / Xetra). Key characteristics:

- **Matching Engine**: Central limit order book with price-time priority
- **Latency**: Sub-millisecond matching (significant improvement over legacy)
- **Capacity**: Handles millions of orders per second
- **Resilience**: Active-active data center architecture with seamless failover

### 2.3 MCX Trade Station (MTS)

MTS is the exchange-provided trading terminal for members:

- Browser-based and desktop application variants
- Replaces the older MCX Trader Workstation (TWS)
- Provides order entry, order management, market watch, trade blotter
- Integrated with MCS for member administration functions

### 2.4 Member Control Station (MCS)

MCS is the administrative portal for trading members:

- UCC registration and management (online mode)
- Member configuration and user management
- Risk parameter monitoring
- Segment activation and deactivation
- Collateral management interface
- Report generation and download

### 2.5 Market Data Dissemination

T7 provides three market data interfaces:

| Interface | Full Name | Description | Use Case |
|-----------|-----------|-------------|----------|
| **T7 EMDI** | Enhanced Market Data Interface | Un-netted, tick-by-tick market data | Full granularity, high-frequency strategies |
| **T7 MDI** | Market Data Interface | Netted (aggregated) market data at regular intervals | Standard market data consumption |
| **T7 EOBI** | Enhanced Order Book Interface v1.2 | Full order-by-order book data (every order add/modify/delete) | Ultra-low-latency strategies, full book reconstruction |

- EMDI and MDI are multicast UDP-based feeds
- EOBI provides the deepest level of market transparency
- All feeds are available on production and simulation environments

---

## 3. Connectivity Options

### 3.1 Network Connectivity Modes

| Mode | Protocol | Bandwidth Options | Use Case | Latency |
|------|----------|-------------------|----------|---------|
| **Point-to-Point Leased Line** | Dedicated circuit | Configurable | Primary production, lowest latency | Lowest |
| **MPLS VPN** | IP-based WAN | 10 / 20 / 30 / 40 Mbps | Standard production connectivity | Low |
| **Internet VPN** | IPSec over internet | Variable | Backup / disaster recovery / small members | Higher |

### 3.2 Connectivity Requirements

- Primary and backup links mandatory for trading members
- Colocation facility available at MCX data centers
- Network latency monitoring tools provided by exchange
- Separate connectivity required for trading (order routing) and market data (EMDI/MDI/EOBI)

---

## 4. CTCL (Computer-to-Computer Link)

### 4.1 Overview

CTCL allows trading members to connect their own software (or ISV-provided software) directly to the MCX trading engine. It is the primary mechanism for algorithmic trading, custom front-ends, and back-office integration.

**Availability**: Only for registered trading members of MCX.

**Master Circular**: MCX/CTCL/281/2024 (April 30, 2024)

### 4.2 API Types

MCX provides three API types for CTCL connectivity:

| API Type | Protocol | Encoding | Status | Notes |
|----------|----------|----------|--------|-------|
| **Non-FIX (Legacy)** | TCP/IP | C-struct binary (proprietary) | Legacy, being phased out | Original MCX API format |
| **FIX v4.2** | TCP/IP | FIX tag-value text | Available | Standard FIX protocol |
| **MCX ETI** (Primary) | TCP/IP | Flat binary encoding | **Primary, recommended** | FIX v5.0 SP2 semantics, proprietary session layer |

### 4.3 MCX ETI (Enhanced Trading Interface) - Primary API

MCX ETI is the primary and recommended API for CTCL connectivity post-Project Udaan.

| Attribute | Details |
|-----------|---------|
| Current Version | **v1.4.2** |
| Go-Live Date | **January 7, 2025** |
| Protocol | TCP/IP |
| Encoding | Flat binary (proprietary, NOT standard FIX tag-value) |
| Semantics | Based on FIX v5.0 SP2 (including officially approved extension packs) |
| Session Layer | Proprietary (NOT standard FIX session layer) |
| Encryption | **IV Charset encryption** added in v1.4.2 |
| Failover | No built-in automatic failover; member applications must implement own failover logic |
| Session Management | Exchange provides unique Session ID per member; only one active session per Session ID at any time |

**Key features of ETI v1.4.2**:
- Asynchronous, message-based interface
- Connects via Exchange Application Gateways hosting client sessions
- IV Charset encryption for enhanced security (new in v1.4.2)
- Supports order entry, modification, cancellation, trade confirmation, market data subscription
- Binary encoding provides lower latency compared to text-based FIX

### 4.4 ISV Empanelment Process

Independent Software Vendors (ISVs) wanting to provide CTCL-based solutions must go through a formal empanelment:

```
Step 1: Application  -> Submit empanelment application to MCX
Step 2: Development  -> Develop software using MCX ETI / FIX API specifications
Step 3: Testing      -> Test on MCX simulation/UAT environment
Step 4: Demo         -> Demonstrate functionality to MCX technology team
Step 5: Approval     -> MCX reviews and grants empanelment (or requests changes)
Step 6: Go-Live      -> Deploy on production with specific trading member(s)
```

- Each ISV application must be individually empanelled
- Annual renewal may be required
- MCX reserves right to audit ISV software at any time

---

## 5. UCC Registration

### 5.1 Registration Methods

| Method | Interface | Scale | Format | Notes |
|--------|-----------|-------|--------|-------|
| **Online Portal (MCS)** | Member Control Station web UI | Manual, 1-by-1 | Web form | For individual registrations |
| **Batch Upload** | MCS upload module | Bulk | Pipe-delimited text file | 2 rows per client |
| **API** | Post-T7 REST/ETI | Automated | Structured messages | Available after Project Udaan migration |

### 5.2 UCC Registration Flow

```
1. Member submits UCC record
   (via MCS portal / Batch upload / API)
        |
        v
2. MCX validates mandatory fields
   (Name, PAN, DOB, Address, Mobile, Email, Income, Category)
        |
        v
3. PAN 3-parameter verification
   (PAN + Name + DOB against NSDL/Protean/ITD records)
        |
        v
4. Status assigned
   +---> A (Active)    -> Eligible for PTT (Permitted to Trade)
   +---> I (Inactive)  -> PAN verification failed, NOT eligible
   +---> P (Pending)   -> Verification in progress, NOT eligible
        |
        v
5. PTT (Permitted to Trade) flag set
   (only if Status = A AND all validations pass)
        |
        v
6. Client can commence trading
```

### 5.3 UCC Status Values

| Status | Meaning | Trading Impact |
|--------|---------|----------------|
| **A** (Active) | All verifications passed | Eligible for PTT |
| **I** (Inactive) | PAN verification failed or client deactivated | NOT eligible for PTT |
| **P** (Pending) | Verification in progress | NOT eligible for PTT |

### 5.4 Mandatory Error Account

MCX mandates that every trading member maintain an **ERROR account**:

| Rule | Details |
|------|---------|
| Client Code | Must be exactly `"ERROR"` |
| Purpose | Catch-all for unmatched/erroneous trades |
| Penalty for not maintaining | **Rs. 10,000 per month** |
| Penalty for fresh trades in ERROR account | **Rs. 10,000 per day** |
| Expected behavior | Members must transfer trades out of ERROR account to correct client codes within the same trading day |

### 5.5 Client Code Modification

| Rule | Details |
|------|---------|
| Modification allowed | Yes, during trading hours |
| Effective date | **July 8, 2024** |
| Scope | Transfer of trades from one client code to another (including ERROR account) |
| Audit trail | All modifications logged and reported to exchange |

### 5.6 Email ID Requirement

| Rule | Details |
|------|---------|
| Email mandatory | **Yes, since October 21, 2024** |
| Applies to | All new UCC registrations and modifications |
| Distinct email | Required per SEBI mandate (family exception: spouse, dependent children/parents) |
| Validation | Must be a valid, deliverable email address |

### 5.7 Activation Timeline

- New UCC registrations are typically activated on the **next working day** after successful PAN verification
- This is slightly slower than NSE/BSE which can activate same day in some cases

---

## 6. 3-Parameter PAN Verification

MCX follows the same 3-parameter PAN verification as BSE/NSE, verifying against NSDL/Protean (Income Tax Department) records.

### 6.1 The Three Parameters

| # | Parameter | Field | Mandatory |
|---|-----------|-------|-----------|
| 1 | PAN Number | 10-character alphanumeric (AAAAA9999A format) | Yes |
| 2 | Client Name | Name as per PAN / ITD records | Yes |
| 3 | DOB / DOI / DOR | Date of Birth (individuals) / Date of Incorporation (companies) / Date of Registration (other entities) | Yes |

### 6.2 Verification Result Codes

| Code | Status | Meaning | Trading Impact |
|------|--------|---------|----------------|
| **A** | Approved | All 3 parameters match ITD records | Eligible for PTT |
| **I** | Incorrect | One or more parameters do not match | NOT eligible for PTT |
| **P** | Pending | Verification in progress | NOT eligible for PTT |

### 6.3 PAN Verification Rules

- DOB/DOI is mandatory for ALL holders including Guardian in case of Minor Client
- If Client Name or DOB differs from ITD records, must be corrected at ITD BEFORE submission to MCX
- Once PAN is marked "I" (Incorrect), the record cannot be marked PTT until corrected and re-verified
- PAN value `AAAAA8888A` is used for Central Government / State Government / Court-appointed officials
- PAN-Aadhaar seeding is NOT a parameter for PTT status

---

## 7. Client Categories (Commodity-Specific)

### 7.1 SEBI 6-Category Classification

SEBI mandates a 6-category classification specifically for commodity derivatives, per circular **SEBI/HO/CDMRD/DNPMP/CIR/P/2019/08**:

| Category Code | Category Name | Description | Examples |
|---------------|---------------|-------------|----------|
| **1** | Farmers / FPOs | Agricultural producers and Farmer Producer Organizations | Individual farmers, FPOs registered under Companies Act |
| **2** | Value Chain Participants (VCPs) | Entities involved in physical commodity value chain | Processors, millers, exporters, importers, wholesalers, retailers |
| **3** | Proprietary Traders | Members trading on their own account | Trading member proprietary book |
| **4** | Domestic Financial Institutional Investors | Indian financial institutions | Mutual funds, insurance companies, banks, pension funds |
| **5** | Foreign Participants | Foreign entities (non-agri, cash-settled only) | FPIs, foreign corporates (restricted to non-agri cash-settled contracts) |
| **6** | Others | All other participants not covered above | Retail individuals, HUFs, non-VCP corporates |

### 7.2 Legacy Trading Purpose Codes

In addition to the 6-category classification, MCX retains legacy trading purpose codes:

| Code | Purpose | Description |
|------|---------|-------------|
| **HE** | Hedger | Client trading to hedge underlying physical commodity exposure |
| **SP** | Speculator | Client trading for speculative / directional purposes |
| **AR** | Arbitrageur | Client trading to exploit price differentials across markets/contracts |

### 7.3 Classification Rules

- Categorization is **commodity-wise** (a client may be Category 2 for gold and Category 6 for crude oil)
- Classification is **self-declaration based** (client declares their category at onboarding)
- VCP status may require supporting documentation (business registration, import/export license)
- Hedger (HE) status may require proof of underlying physical exposure for position limit exemptions
- Category can be changed through UCC modification if client's business profile changes

---

## 8. Income Proof Requirements

### 8.1 Mandatory Income Proof

**CRITICAL**: Unlike equity markets where income proof is required only for F&O segments, MCX requires income proof for ALL commodity trading. This is mandatory regardless of the commodity segment or trading purpose.

| Requirement | Details |
|-------------|---------|
| Applicability | **ALL clients trading on MCX** (not just F&O as in equity) |
| Frequency | At onboarding; periodic review as per member's risk policy |
| Verification | Member must verify and retain proof on record |

### 8.2 Accepted Income Proof Documents

| # | Document | Validity | Notes |
|---|----------|----------|-------|
| 1 | **Income Tax Return (ITR)** | Latest financial year | Most preferred; verifiable via income proof verification APIs |
| 2 | **Annual Accounts** | Latest financial year | For businesses / corporates; audited preferred |
| 3 | **Salary Slip** | Last 3 months | For salaried individuals |
| 4 | **Form 16** | Latest financial year | TDS certificate from employer |
| 5 | **Net Worth Certificate** | From practicing CA, latest year | For HNIs and non-individual entities |
| 6 | **Bank Statement** | Last 6 months | Showing regular income credits |

### 8.3 Income Range Codes

| Code | Income Range | Description |
|------|-------------|-------------|
| **1** | Below Rs. 1,00,000 | Below 1 Lakh per annum |
| **2** | Rs. 1,00,000 - Rs. 5,00,000 | 1 to 5 Lakhs per annum |
| **3** | Rs. 5,00,000 - Rs. 10,00,000 | 5 to 10 Lakhs per annum |
| **4** | Rs. 10,00,000 - Rs. 25,00,000 | 10 to 25 Lakhs per annum |
| **5** | Above Rs. 25,00,000 | Above 25 Lakhs per annum |

---

## 9. Batch File Format Specification

### 9.1 Format Overview

| Attribute | Details |
|-----------|---------|
| Delimiter | Pipe (`|`) separated |
| Rows per client | **2 rows** (same structure as BSE) |
| Row 1 | General client information (applicable to ALL client types) |
| Row 2 | Director / Partner details (applicable ONLY to Corporate / Partnership / Body Corporate) |
| Encoding | UTF-8 / ASCII |
| Line ending | CRLF or LF |
| Header row | None (data starts from row 1) |

### 9.2 Row 1 - General Client Information (Key Fields)

| # | Field Name | Type | Length | Mandatory | Valid Values / Notes |
|---|-----------|------|--------|-----------|---------------------|
| 1 | Trading Member ID | Alphanumeric | 6 | M | MCX member code |
| 2 | Client Code | Alphanumeric | 10 | M | Unique per member (max 10 chars) |
| 3 | Client Name (First) | Alpha | 70 | M | As per PAN records |
| 4 | Client Name (Middle) | Alpha | 35 | O | |
| 5 | Client Name (Last) | Alpha | 35 | M | As per PAN records |
| 6 | PAN | Alphanumeric | 10 | M | AAAAA9999A format |
| 7 | Date of Birth / DOI | Date | 10 | M | DD/MM/YYYY |
| 8 | Gender | Alpha | 1 | M | M / F / T (Transgender) |
| 9 | Client Type | Alpha | 2 | M | IN (Individual), CP (Corporate), HU (HUF), PA (Partnership), TR (Trust) |
| 10 | Address Line 1 | Alphanumeric | 100 | M | Correspondence address |
| 11 | Address Line 2 | Alphanumeric | 100 | O | |
| 12 | Address Line 3 | Alphanumeric | 100 | O | |
| 13 | City Code | Numeric | 6 | M | As per MCX State-City Code Master |
| 14 | State Code | Numeric | 2 | M | As per MCX State-City Code Master |
| 15 | Pincode | Numeric | 6 | M | |
| 16 | Country | Alpha | 2 | M | IN (India), etc. |
| 17 | Mobile Number | Numeric | 10 | M | 10-digit Indian mobile |
| 18 | Email ID | Alphanumeric | 100 | M | Mandatory since Oct 21, 2024 |
| 19 | Income Range | Numeric | 1 | M | 1 / 2 / 3 / 4 / 5 (see Section 8.3) |
| 20 | Trading Category | Alpha | 2 | M | HE / SP / AR |
| 21 | Commodity Category | Numeric | 1 | M | 1-6 (see Section 7.1) |
| 22 | Demat Account (DP ID) | Alphanumeric | 8 | O | CDSL DP ID or NSDL DP ID |
| 23 | Demat Account (Client ID) | Alphanumeric | 8 | O | BO account client ID |
| 24 | Bank Account Number | Alphanumeric | 20 | M | Primary bank account |
| 25 | Bank IFSC Code | Alphanumeric | 11 | M | |
| 26 | KYC Status | Alpha | 1 | M | Y (Yes) / N (No) |
| 27 | Nominee Name | Alpha | 100 | O | |
| 28 | Nominee Relationship | Alpha | 20 | O | |
| 29 | Nominee PAN | Alphanumeric | 10 | O | |
| 30 | Guardian Name | Alpha | 100 | C | Mandatory for minor clients |
| 31 | Guardian PAN | Alphanumeric | 10 | C | Mandatory for minor clients |

**Note**: This is a representative subset. The full batch specification may contain additional fields for second/third holders, multiple nominees (up to 10 per SEBI mandate), FATCA/CRS declarations, and segment-specific flags. Refer to the official MCX UCC File Formats document for the complete field list.

### 9.3 Row 2 - Director / Partner Details

Row 2 is required ONLY for non-individual entities (Corporate, Partnership, Body Corporate):

| # | Field Name | Type | Length | Mandatory | Notes |
|---|-----------|------|--------|-----------|-------|
| 1 | Trading Member ID | Alphanumeric | 6 | M | Same as Row 1 |
| 2 | Client Code | Alphanumeric | 10 | M | Same as Row 1 |
| 3 | Director/Partner Name | Alpha | 100 | M | |
| 4 | Director/Partner PAN | Alphanumeric | 10 | M | Individual PAN of director/partner |
| 5 | Director/Partner DIN | Numeric | 8 | C | Mandatory for company directors |
| 6 | Designation | Alpha | 50 | M | Director / Partner / Trustee / Karta |
| 7 | Date of Birth | Date | 10 | M | DD/MM/YYYY |

### 9.4 State-City Code Master

| Attribute | Details |
|-----------|---------|
| Last updated | **July 30, 2024** |
| Effective date | **August 5, 2024** |
| Format | Downloadable master file from MCS portal |
| Usage | State Code and City Code in batch files must match the master |
| Updates | MCX publishes updates via circular; members must use latest master |

---

## 10. NRI Restrictions

### 10.1 Absolute Prohibition

| Rule | Details |
|------|---------|
| **NRIs CANNOT trade commodity derivatives on MCX** | **Absolute restriction - no exceptions** |
| Regulatory basis | SEBI commodity derivatives regulations + RBI FEMA guidelines |
| Applies to | All NRI categories (NRI, NRO, NRE, PIO, OCI) |
| Impact on KYC system | Must validate residential status at onboarding; reject NRI applications for MCX |

### 10.2 FPI Restrictions

| Rule | Details |
|------|---------|
| FPI participation | Allowed, but severely restricted |
| Commodity type | **Non-agricultural commodities ONLY** |
| Settlement type | **Cash-settled contracts ONLY** (no physical delivery) |
| Position limit | **20% of client-level position limit** |
| Registration | Must be SEBI-registered FPI (Category I or II) |
| Agricultural commodities | **Completely banned** for FPIs |

### 10.3 KYC System Implementation Notes

```
At onboarding:
  IF client.residential_status == "NRI" OR "NRO" OR "NRE" OR "PIO" OR "OCI":
    REJECT MCX segment activation
    DISPLAY: "NRI clients are not permitted to trade commodity derivatives on MCX"

  IF client.entity_type == "FPI":
    ALLOW only non-agri, cash-settled contracts
    SET position_limit = 0.20 * client_level_position_limit
    BLOCK agricultural commodity contracts
```

---

## 11. Non-Individual Entity Requirements

### 11.1 Corporate (Private Limited / Public Limited / LLP)

| Document | Mandatory | Notes |
|----------|-----------|-------|
| Board Resolution | Yes | Authorizing commodity trading and naming authorized signatories |
| Memorandum of Association (MOA) | Yes | Objects clause must permit commodity trading |
| Articles of Association (AOA) | Yes | |
| Certificate of Incorporation (CIN) | Yes | As issued by MCA (Ministry of Corporate Affairs) |
| Director KYC | Yes | PAN, Aadhaar, address proof for all directors |
| Authorized Signatory | Yes | Board resolution naming specific individuals authorized to operate |
| PAN of entity | Yes | Corporate PAN (4th character = C for company, F for firm, etc.) |
| GST Registration | Conditional | If applicable to the business |
| Latest Audited Financials | Yes | For income proof requirement |

### 11.2 HUF (Hindu Undivided Family)

| Document | Mandatory | Notes |
|----------|-----------|-------|
| HUF PAN | Yes | PAN in name of HUF (4th character = H) |
| Karta Details | Yes | PAN, Aadhaar, address proof of Karta |
| HUF Deed | Yes | Declaring HUF members and Karta |
| Coparcener Details | Conditional | May be required for large HUFs |
| Bank Account | Yes | Must be in name of HUF |

### 11.3 Partnership Firm

| Document | Mandatory | Notes |
|----------|-----------|-------|
| Partnership Deed | Yes | Registered or unregistered |
| All Partner PANs | Yes | Individual PAN of every partner |
| Authorized Partner | Yes | Partnership deed clause or separate authorization letter |
| Firm PAN | Yes | PAN in name of partnership firm (4th character = F) |
| Firm Registration Certificate | Conditional | If registered under Indian Partnership Act |

### 11.4 Trust

| Document | Mandatory | Notes |
|----------|-----------|-------|
| Trust Deed | Yes | Registered trust deed |
| Trustee Details | Yes | PAN, Aadhaar, address proof of all trustees |
| Resolution | Yes | Trust resolution authorizing commodity trading |
| Trust PAN | Yes | PAN in name of trust (4th character = T) |
| Registration Certificate | Yes | Under Indian Trusts Act or relevant state legislation |

### 11.5 NRI

| Status | Details |
|--------|---------|
| **NOT PERMITTED** | NRIs are completely prohibited from trading on MCX. See Section 10. |

---

## 12. Commodity Segments & Trading Hours

### 12.1 Bullion Contracts

| Contract | Lot Size | Trading Hours | Settlement |
|----------|----------|---------------|------------|
| Gold (1 kg) | 1 kg | 9:00 AM - 11:30 PM | Physical delivery |
| Gold (100 g) | 100 grams | 9:00 AM - 11:30 PM | Physical delivery |
| Gold (8 g) | 8 grams | 9:00 AM - 11:30 PM | Physical delivery |
| Gold Mini | 100 grams | 9:00 AM - 11:30 PM | Physical delivery |
| Gold Petal | 1 gram | 9:00 AM - 11:30 PM | Physical / Cash |
| Silver (30 kg) | 30 kg | 9:00 AM - 11:30 PM | Physical delivery |
| Silver (5 kg) | 5 kg | 9:00 AM - 11:30 PM | Physical delivery |
| Silver (1 kg) | 1 kg | 9:00 AM - 11:30 PM | Physical delivery |
| Silver Mini | 5 kg | 9:00 AM - 11:30 PM | Physical delivery |

### 12.2 Energy Contracts

| Contract | Lot Size | Trading Hours | Settlement |
|----------|----------|---------------|------------|
| Crude Oil | 100 barrels | 9:00 AM - 11:55 PM | Cash settled (linked to NYMEX WTI) |
| Natural Gas | 1,250 MMBtu | 9:00 AM - 11:55 PM | Cash settled (linked to Henry Hub) |

### 12.3 Base Metal Contracts

| Contract | Lot Size | Trading Hours | Settlement |
|----------|----------|---------------|------------|
| Copper | 2,500 kg | 9:00 AM - 11:30 PM | Physical delivery |
| Zinc | 5,000 kg | 9:00 AM - 11:30 PM | Physical delivery |
| Aluminium | 5,000 kg | 9:00 AM - 11:30 PM | Physical delivery |
| Lead | 5,000 kg | 9:00 AM - 11:30 PM | Physical delivery |
| Nickel | 1,500 kg | 9:00 AM - 11:30 PM | Physical delivery |

### 12.4 Agricultural Contracts

| Contract | Lot Size | Trading Hours | Settlement | Notes |
|----------|----------|---------------|------------|-------|
| Cotton | 25 bales | **9:00 AM - 5:00 PM** | Physical delivery | Restricted hours |
| Mentha Oil | 360 kg | **9:00 AM - 5:00 PM** | Physical delivery | Restricted hours |

### 12.5 Trading Hours Summary

| Segment | Trading Session | Pre-Open | Notes |
|---------|----------------|----------|-------|
| **Non-Agricultural** (Bullion, Energy, Base Metals) | 9:00 AM - 11:30 PM / 11:55 PM | 8:45 AM - 9:00 AM | Extended hours for international price alignment |
| **Agricultural** | 9:00 AM - 5:00 PM | 8:45 AM - 9:00 AM | Restricted hours per SEBI directive |

- Non-agri closing time varies: 11:30 PM for most, 11:55 PM for crude oil and natural gas
- Trading hours may change during daylight saving transitions in US/Europe
- Saturday, Sunday, and exchange-declared holidays are non-trading days

---

## 13. MCX iCOMDEX Indices

MCX publishes commodity indices under the **iCOMDEX** brand:

| Index | Composition | Base Date | Base Value |
|-------|-------------|-----------|------------|
| **iCOMDEX Composite** | Weighted basket of all actively traded MCX commodities | Apr 1, 2005 | 1,000 |
| **iCOMDEX Bullion** | Gold and Silver futures | Apr 1, 2005 | 1,000 |
| **iCOMDEX Base Metals** | Copper, Zinc, Aluminium, Lead, Nickel | Apr 1, 2005 | 1,000 |
| **iCOMDEX Gold** | Gold futures only | - | - |
| **iCOMDEX Copper** | Copper futures only | - | - |
| **iCOMDEX Crude Oil** | Crude Oil futures only | - | - |

### Index Derivatives

- MCX offers index futures and options on select iCOMDEX indices
- **No separate UCC registration is needed** for index derivatives; the same MCX UCC covers index trading
- Position limits for index derivatives are separate from underlying commodity limits

---

## 14. MCXCCL (Clearing Corporation)

### 14.1 Overview

| Attribute | Details |
|-----------|---------|
| Full Name | MCX Clearing Corporation Limited |
| Relationship | Wholly-owned subsidiary of MCX |
| Recognition | Recognized by SEBI as a clearing corporation |
| Role | Central counterparty (CCP) for all MCX trades |
| System | TCS BaNCS for Market Infrastructure (post-Project Udaan) |

### 14.2 Member Types

| Type | Code | Role |
|------|------|------|
| **Trading Member (TM)** | TM | Can trade on own account and on behalf of clients; clears through a CM |
| **Trading-cum-Clearing Member (TCM)** | TCM | Can trade AND clear/settle on own account and for clients |
| **Professional Clearing Member (PCM)** | PCM | Only clears and settles trades on behalf of TMs; does not trade |

### 14.3 Margining Framework (SPAN-Based)

MCXCCL uses a multi-layered SPAN-based margining system:

| Margin Component | Description | Typical Rate |
|------------------|-------------|--------------|
| **SPAN Margin** | Standard Portfolio Analysis of Risk; computed using SPAN algorithm | Varies by commodity volatility |
| **Extreme Loss Margin (ELM)** | Additional margin for tail risk | **1.25% for futures**, **1% for options** |
| **Additional Margin** | Exchange-imposed during high volatility or special situations | Variable, announced via circular |
| **Concentration Margin** | For large positions exceeding threshold % of open interest | Progressive, based on position size |
| **Delivery Period Margin** | Enhanced margin during tender/delivery period | Significantly higher (up to 25-50% of contract value) |

### 14.4 Collateral Management

| Rule | Details |
|------|---------|
| Client collateral segregation | **Mandatory at UCC level** |
| Acceptable collateral | Cash, bank guarantees, fixed deposits, approved securities, warehouse receipts |
| Cash component | Minimum 50% of total margin in cash or cash-equivalent |
| Haircuts | Applied to non-cash collateral based on asset type and liquidity |
| Collateral reporting | Daily reporting to MCXCCL with client-level breakup |

---

## 15. Position Limits

### 15.1 Position Limit Structure

| Level | Description | Set By |
|-------|-------------|--------|
| **Client Level** | Maximum position a single client can hold in a commodity | SEBI / MCX circular |
| **Member Level** | Maximum position a trading member (including all clients) can hold | SEBI / MCX circular |
| **Market-Wide Position Limit (MWPL)** | Maximum open interest allowed across the entire market for a contract | SEBI / MCX circular |
| **Near Month Limit** | Separate limit for the near-month (expiring) contract | Typically tighter than all-month |
| **All Month Combined** | Combined position across all contract months | |

### 15.2 Special Provisions

| Provision | Details |
|-----------|---------|
| **Hedger Exemption** | Bona fide hedgers (Category 1, 2) may apply for position limit exemption above client level |
| **FPI Limit** | **20% of client-level position limit** (severely restricted) |
| **Aggregation** | Positions across all contract months are aggregated for limit computation |
| **Reporting** | Large position reporting (above threshold) mandatory to exchange |

### 15.3 Penalty for Limit Breach

- Exchange may impose square-off of excess positions
- Financial penalties as per MCX penalty structure
- Repeated breaches may result in trading restriction or membership action

---

## 16. Differences from NSE/BSE

### 16.1 Comparison Table

| Parameter | MCX | NSE | BSE |
|-----------|-----|-----|-----|
| **Segment** | Commodity derivatives ONLY | Multi-segment (Equity, F&O, Currency, Commodity) | Multi-segment (Equity, F&O, Currency, Commodity, Debt) |
| **Trading System** | MCX CONNECT (T7) | NEAT / Colocation | BOLT Plus (T7-based ETI) |
| **Income Proof** | **ALWAYS mandatory** (all commodity trading) | Only for F&O / Commodity segments | Only for F&O / Commodity segments |
| **NRI Trading** | **Completely banned** | Allowed (Equity, limited F&O) | Allowed (Equity, limited F&O) |
| **Trading Hours** | 9:00 AM - 11:30/11:55 PM (non-agri) | 9:15 AM - 3:30 PM (Equity), extended for commodity | 9:15 AM - 3:30 PM (Equity), extended for commodity |
| **Physical Delivery** | **Norm** (most contracts are delivery-based) | Limited (mostly cash-settled) | Limited (mostly cash-settled) |
| **Client Classification** | **6-category commodity classification** + HE/SP/AR codes | Standard (Individual, Corporate, HUF, etc.) | Standard (Individual, Corporate, HUF, etc.) |
| **UCC Activation** | **Next working day** (slightly slower) | Same day possible | Same day possible |
| **Batch File Format** | Pipe-delimited, 2 rows/client | Pipe-delimited, single row | Pipe-delimited, 2 rows/client |
| **Batch Upload Limit** | Similar to BSE | Max 10,000 records/file | Max 30,000 records/file |
| **API Protocol** | MCX ETI (binary FIX 5.0 SP2) | FIX / proprietary | ETI (binary FIX 5.0 SP2) / SOAP (UCC) |
| **Error Account** | Mandatory (`ERROR`), Rs. 10K/month penalty | Mandatory | Mandatory |
| **Clearing Corp** | MCXCCL (wholly-owned subsidiary) | NSE Clearing Ltd (NCL) | Indian Clearing Corp Ltd (ICCL) |
| **Delivery Infrastructure** | Exchange-accredited warehouses, vaults, assaying centers | N/A for equity; limited for commodity | N/A for equity; limited for commodity |

### 16.2 Key Implications for KYC System

1. **Separate income proof workflow**: MCX requires income proof for ALL clients, not just F&O. The KYC system must enforce this when MCX segment is selected.
2. **NRI blocking**: The system must prevent NRI clients from activating MCX segment.
3. **Commodity category capture**: Additional field (1-6) required only for MCX, not for NSE/BSE equity.
4. **Trading purpose capture**: HE/SP/AR code required only for MCX.
5. **Extended hours support**: Back-office and risk systems must support MCX's extended trading hours (up to 11:55 PM).
6. **Physical delivery management**: Delivery period margin hikes, warehouse receipt management, and delivery obligations are unique to MCX.

---

## 17. Penalties & Compliance

### 17.1 Penalty Schedule

| Violation | Penalty | Reference |
|-----------|---------|-----------|
| **Trading without valid UCC** | **1% of trade value** | MCX penalty circular |
| **Not maintaining ERROR account** | **Rs. 10,000 per month** | MCX UCC circular |
| **Fresh trade booked in ERROR account** | **Rs. 10,000 per day** | MCX UCC circular |
| **Client code modification after cut-off** | As per exchange penalty grid | MCX member circular |
| **Position limit breach** | Square-off + financial penalty | MCXCCL risk circular |
| **Margin shortfall** | Interest on shortfall amount + potential square-off | MCXCCL margin circular |
| **Non-reporting of large positions** | Exchange-determined penalty | MCX surveillance circular |
| **KYC non-compliance** | Exchange action (warning, penalty, suspension) | MCX compliance circular |

### 17.2 Compliance Obligations

| Obligation | Frequency | Details |
|------------|-----------|---------|
| Client margin reporting | Daily | Client-level margin and collateral breakup to MCXCCL |
| Large position reporting | Daily | When client position exceeds threshold |
| UCC data reconciliation | Monthly | Reconcile UCC records with exchange |
| KYC periodic review | Annual | Review and update client KYC information |
| Income proof renewal | Annual / Biennial | Re-verify income declarations |
| FATCA/CRS reporting | Annual | Report to KRA as per CBDT timelines |
| Audit trail retention | 5 years minimum | All trade, order, and client modification records |

---

## 18. Recent Circulars (2024-2026)

### 2024 Circulars

| Date | Circular No. | Subject | Impact |
|------|-------------|---------|--------|
| Apr 30, 2024 | MCX/CTCL/281/2024 | CTCL Master Circular | Consolidated CTCL rules, ISV empanelment process |
| Jul 8, 2024 | - | Client Code Modification during trading hours | Allowed client code modification during live trading session |
| Jul 30, 2024 | - | State-City Code Master update | New master effective Aug 5, 2024; batch files must use updated codes |
| Oct 21, 2024 | - | Email ID mandatory for UCC | Email field made mandatory for all new registrations and modifications |
| Dec 2024 | - | Distinct mobile/email per client | Per SEBI mandate; family exception for spouse, dependent children/parents |

### 2025 Circulars

| Date | Circular No. | Subject | Impact |
|------|-------------|---------|--------|
| Jan 7, 2025 | - | MCX ETI v1.4.2 go-live | New CTCL API version with IV Charset encryption |
| Jan 2025 | - | Nominee enhancement (up to 10) | Per SEBI mandate effective Jan 2025; UCC format updated |
| 2025 (various) | MCX/TRD/208/2025 | MCX Master Circular - Market Operations | Consolidated trading rules, UCC procedures, settlement norms |
| Jun 2025 | - | SEBI Stock Brokers Master Circular alignment | Updated procedures per SEBI/HO/MIRSD/MIRSD-PoD/P/CIR/2025/90 |

### 2026 Circulars

| Date | Circular No. | Subject | Impact |
|------|-------------|---------|--------|
| Jan 2026 | - | SEBI Stock Brokers Regulations 2026 alignment | Updated member compliance norms per new SEBI regulations (notified Jan 7, 2026) |

---

## 19. Key Documents to Obtain

The following documents should be obtained from MCX (member portal or relationship manager) for implementation:

| # | Document | Version / Reference | Purpose | Source |
|---|----------|-------------------|---------|--------|
| 1 | **MCX UCC File Formats v1.0** | Latest version | Complete batch file field specification (all fields, validation rules, error codes) | MCX Member Portal / Relationship Manager |
| 2 | **MCX ETI API v1.4.2** | v1.4.2 (Jan 7, 2025) | Primary CTCL API specification for trading and UCC integration | MCX Technology Team |
| 3 | **MCX FIX API v1.0** | Latest version | Alternative CTCL API specification (FIX 4.2 text protocol) | MCX Technology Team |
| 4 | **MCX Master Circular - Market Operations** | MCX/TRD/208/2025 | Consolidated trading rules, UCC procedures, settlement norms, trading hours | MCX Circular Repository |
| 5 | **MCXCCL Consolidated Master Circular** | Latest version | Clearing, settlement, margining, collateral, risk management norms | MCXCCL / MCX Member Portal |
| 6 | **MCX State-City Code Master** | Jul 30, 2024 (effective Aug 5, 2024) | State and city codes for batch file validation | MCX Member Portal |
| 7 | **MCX CTCL Master Circular** | MCX/CTCL/281/2024 (Apr 30, 2024) | CTCL rules, ISV empanelment, API connectivity norms | MCX Circular Repository |
| 8 | **MCX ETI Simulation Environment Guide** | Latest version | Test environment setup, connectivity, test scenarios | MCX Technology Team |
| 9 | **MCX T7 Market Data Interface Specifications** | EMDI / MDI / EOBI v1.2 | Market data feed specifications for data consumption | MCX Technology Team |
| 10 | **SEBI Commodity Client Classification Circular** | SEBI/HO/CDMRD/DNPMP/CIR/P/2019/08 | 6-category client classification rules for commodity derivatives | SEBI Website |

---

## Appendix A: UCC Integration Checklist

```
Pre-Integration:
  [ ] Obtain MCX trading membership or confirm existing membership
  [ ] Get MCX member code and MCS portal credentials
  [ ] Obtain UCC batch file format specification from MCX
  [ ] Obtain State-City Code Master (latest version)
  [ ] Set up CTCL connectivity (if API-based integration planned)
  [ ] Complete ISV empanelment (if using custom software)

UCC Registration Implementation:
  [ ] Build NRI validation gate (block MCX for NRI clients)
  [ ] Implement income proof mandatory collection (ALL MCX clients)
  [ ] Add commodity category field (1-6) to onboarding form
  [ ] Add trading purpose field (HE/SP/AR) to onboarding form
  [ ] Implement PAN 3-parameter verification flow
  [ ] Build batch file generator (pipe-delimited, 2 rows/client)
  [ ] Implement ERROR account setup for member
  [ ] Build UCC status tracking (A/I/P -> PTT flow)
  [ ] Implement email ID mandatory validation

Testing:
  [ ] Test batch file generation with sample data
  [ ] Validate against State-City Code Master
  [ ] Test PAN verification flow (A/I/P scenarios)
  [ ] Test NRI rejection flow
  [ ] Test non-individual entity flows (Corporate, HUF, Partnership, Trust)
  [ ] Test on MCX simulation environment (if CTCL)
  [ ] Reconcile UCC records post-upload

Go-Live:
  [ ] Submit initial batch of UCCs
  [ ] Verify PTT status for all active clients
  [ ] Confirm ERROR account is active
  [ ] Set up daily margin and position reporting
  [ ] Configure extended trading hours in back-office systems
```

---

## Appendix B: Error Handling Reference

### Common UCC Rejection Reasons

| Error Code | Description | Resolution |
|------------|-------------|------------|
| PAN_MISMATCH | PAN details do not match ITD records | Verify PAN, name, DOB against IT department records |
| INVALID_STATE_CITY | State or city code not in master | Use latest State-City Code Master (Aug 5, 2024+) |
| DUPLICATE_UCC | Client code already exists for this member | Use unique client code or modify existing UCC |
| MISSING_INCOME | Income range not provided | Income proof is mandatory for ALL MCX clients |
| INVALID_CATEGORY | Commodity category code not in 1-6 range | Use valid SEBI 6-category code |
| NRI_BLOCKED | NRI clients not permitted on MCX | Cannot activate MCX segment for NRI clients |
| MISSING_EMAIL | Email ID not provided | Email mandatory since Oct 21, 2024 |
| INVALID_FORMAT | Batch file format error | Verify pipe-delimited format, 2 rows per client, field lengths |

---

*This document is based on publicly available MCX circulars, SEBI regulations, and industry research as of February 2026. Implementation teams should obtain the latest specifications directly from MCX for production integration.*

---
title: TrackWizz
description: AML/PEP/sanctions screening and ongoing monitoring via TrackWizz for regulatory compliance.
---


## Table of Contents

1. [Overview](#1-overview)
2. [Screening Databases (120+ Watchlists)](#2-screening-databases-120-watchlists)
3. [Screening API](#3-screening-api)
4. [PMLA Compliance](#4-pmla-compliance)
5. [Ongoing Monitoring](#5-ongoing-monitoring)
6. [Risk Scoring](#6-risk-scoring)
7. [Non-Individual Entity Screening](#7-non-individual-entity-screening)
8. [SEBI AML Framework](#8-sebi-aml-framework)
9. [Integration Details](#9-integration-details)
10. [Reporting](#10-reporting)
11. [Pricing](#11-pricing)
12. [Edge Cases](#12-edge-cases)
13. [Alternatives Comparison](#13-alternatives-comparison)
14. [Integration with Our System](#14-integration-with-our-system)

---

## 1. Overview

TrackWizz is an Indian AML/CFT (Anti-Money Laundering / Combating the Financing of Terrorism) compliance platform specialized for capital markets participants. It provides automated screening of customers and entities against 120+ global and India-specific watchlists, with ongoing monitoring capabilities.

| Attribute | Details |
|-----------|---------|
| **Specialization** | Capital markets AML compliance (brokers, AMCs, banks, NBFCs) |
| **Watchlists** | 120+ global and Indian regulatory lists |
| **Matching Engine** | Fuzzy matching with Hindi-English transliteration, aliases, initials |
| **PEP Coverage** | 95+ global PEP databases including India-specific classifications |
| **Adverse Media** | Refinitiv World-Check partnership for news/media screening |
| **Deployment** | On-premise or Cloud SaaS |
| **API Type** | REST / JSON |
| **Authentication** | Bearer token |
| **PMLA Compliance** | Full support: CDD, EDD, STR/CTR filing templates |
| **Ongoing Monitoring** | Real-time alerts via webhook when customers appear on new lists |
| **Regulatory Focus** | SEBI, RBI, FATF, PMLA, UAPA - designed for Indian regulated entities |

**Why TrackWizz for Indian Broking**:
- Deep coverage of India-specific lists (SEBI debarred, RBI defaulters, MHA banned orgs, UAPA, NIA, ED)
- Fuzzy matching handles Indian name variations and Hindi-English transliterations
- On-premise deployment option for firms with data residency requirements
- Pre-built STR/CTR templates for FIU-IND filing
- Used by brokers, AMCs, and banks for PMLA compliance

---

## 2. Screening Databases (120+ Watchlists)

### 2.1 International Sanctions

| List | Source | Update Frequency |
|------|--------|-----------------|
| OFAC SDN (Specially Designated Nationals) | US Treasury Department | Real-time (within hours of publication) |
| UN Security Council Consolidated List | United Nations | Real-time |
| EU Sanctions List | European External Action Service | Real-time |
| HM Treasury Sanctions List | UK Government | Real-time |
| FATF High-Risk Jurisdictions | Financial Action Task Force | Updated per FATF plenary (3x/year) |
| OFAC Consolidated Non-SDN | US Treasury | Real-time |
| Australian DFAT Sanctions | Australia Dept of Foreign Affairs | Daily |
| Canadian OSFI List | Office of Superintendent of Financial Institutions | Daily |

### 2.2 India-Specific Regulatory Lists

| List | Source | Relevance | Update Frequency |
|------|--------|-----------|-----------------|
| **SEBI Debarred Entities** | SEBI orders database | Persons/entities barred from securities market | Daily (as SEBI publishes orders) |
| **RBI Defaulters List** | Reserve Bank of India | Wilful defaulters, fraud accounts | Quarterly (RBI publishes periodically) |
| **UAPA Designated Entities** | Unlawful Activities (Prevention) Act, MHA | Terrorist individuals and organizations | Real-time (gazette notifications) |
| **MHA Banned Organizations** | Ministry of Home Affairs | Banned organizations under UAPA | As notified |
| **NIA Lists** | National Investigation Agency | Terror-accused, chargesheeted persons | As published |
| **Enforcement Directorate Orders** | ED, Ministry of Finance | PMLA attachment/prosecution orders | Daily |
| **IRDA Blacklist** | Insurance Regulatory and Development Authority | Blacklisted insurance agents/entities | Periodic |
| **NHB Defaulters** | National Housing Bank | Housing finance defaulters | Periodic |
| **NCLT Orders** | National Company Law Tribunal | Companies under insolvency/liquidation | As published |
| **CBI Most Wanted** | Central Bureau of Investigation | Fugitives, absconding accused | As updated |

### 2.3 PEP (Politically Exposed Person) Databases

TrackWizz screens against 95+ global PEP databases with particular depth for Indian PEPs.

**Indian PEP Classification**:

| PEP Category | Examples | Risk Level |
|--------------|----------|-----------|
| **Executive (Central)** | President, PM, Cabinet Ministers, Ministers of State | Very High |
| **Executive (State)** | Chief Ministers, State Ministers, Governors | Very High |
| **Legislative (Central)** | Members of Parliament (Lok Sabha + Rajya Sabha) | High |
| **Legislative (State)** | Members of Legislative Assembly (MLAs), MLCs | High |
| **Judiciary** | Supreme Court / High Court Judges | High |
| **Civil Services** | IAS, IPS, IFS officers (Joint Secretary and above) | High |
| **Regulatory Bodies** | SEBI Board members, RBI Board/Deputy Governors | High |
| **PSU Heads** | CMD/MD of Central PSUs (Navratna, Maharatna) | Medium-High |
| **Defence** | Service Chiefs, Lt. General and above | High |
| **Diplomatic** | Ambassadors, High Commissioners | Medium-High |
| **Local Government** | Mayors, Municipal Commissioners (large cities) | Medium |

**PEP Family Members** (SEBI requires screening):

| Relationship | Screening Required |
|-------------|-------------------|
| Spouse | Mandatory |
| Children (including adult children) | Mandatory |
| Parents | Mandatory |
| Siblings | Recommended |
| In-laws (parents of spouse) | Recommended |
| Close associates (known business partners) | Recommended |

### 2.4 Adverse Media

| Source | Coverage |
|--------|---------|
| **Refinitiv World-Check** | Partnership for global adverse media screening |
| **News/Media Screening** | Negative coverage in major Indian and international media |
| **Court Records** | Published judgments involving financial crime |
| **Regulatory Actions** | Published enforcement actions by SEBI, RBI, ED, CBI |

Coverage includes: fraud, corruption, bribery, money laundering, terrorist financing, tax evasion, insider trading, market manipulation, drug trafficking, human trafficking, organized crime, cybercrime, environmental crime.

### 2.5 Database Update Frequency

| List Category | Update Frequency |
|---------------|-----------------|
| International sanctions (OFAC, UN, EU) | Real-time / within hours |
| SEBI debarred entities | Daily |
| RBI defaulters | Quarterly |
| UAPA/MHA | As gazette-notified (real-time ingestion) |
| ED/NIA | Daily |
| PEP databases | Weekly refresh |
| Adverse media | Daily crawl |
| IRDA/NHB/NCLT | Periodic (weekly-monthly) |

---

## 3. Screening API

### 3.1 Individual Screening

**Endpoint**: `POST /api/v1/screen`

**Authentication**: `Authorization: Bearer <token>`

**Request**:
```json
{
  "reference_id": "SCR_<timestamp>_<pan>",
  "name": "RAHUL SHARMA",
  "dob": "1990-01-15",
  "pan": "ABCDE1234F",
  "gender": "M",
  "father_name": "SURESH SHARMA",
  "address": "Mumbai, Maharashtra",
  "nationality": "Indian",
  "country_of_residence": "IN",
  "screening_type": "FULL",
  "callback_url": "https://kyc.broker.com/webhooks/aml"
}
```

| Field | Type | Mandatory | Description |
|-------|------|-----------|-------------|
| `reference_id` | String | Yes | Unique reference for this screening request |
| `name` | String | Yes | Full name (as per PAN/KYC documents) |
| `dob` | String (YYYY-MM-DD) | Yes | Date of birth |
| `pan` | String (10 chars) | Yes | PAN number |
| `gender` | String (M/F/T) | No | Gender |
| `father_name` | String | No | Father's name (improves match accuracy) |
| `address` | String | No | Address (city, state minimum) |
| `nationality` | String | Yes | Nationality |
| `country_of_residence` | String (ISO 3166-1 alpha-2) | No | Country code |
| `screening_type` | Enum | Yes | `FULL` (all lists), `SANCTIONS_ONLY`, `PEP_ONLY`, `ADVERSE_MEDIA_ONLY` |
| `callback_url` | String (URL) | No | Webhook URL for async results / ongoing monitoring alerts |

**Response (Success)**:
```json
{
  "status": "COMPLETED",
  "screening_id": "SCR-2024-001234",
  "reference_id": "SCR_1705312200_ABCDE1234F",
  "risk_level": "LOW",
  "overall_result": "CLEAR",
  "matches": [
    {
      "match_id": "MTH-2024-005678",
      "list_name": "SEBI_DEBARRED",
      "list_category": "REGULATORY",
      "match_score": 45,
      "match_type": "PARTIAL_NAME",
      "matched_entity": "RAHUL SHARMA",
      "matched_entity_details": {
        "dob": "1975-03-20",
        "order_number": "SEBI/WTM/2023/xxxx",
        "debarment_period": "2023-05-01 to 2028-04-30"
      },
      "is_false_positive": true,
      "false_positive_reason": "DOB mismatch (15 years difference)"
    }
  ],
  "pep_status": "NOT_PEP",
  "pep_details": null,
  "sanctions_hit": false,
  "sanctions_details": [],
  "adverse_media_hit": false,
  "adverse_media_details": [],
  "screening_summary": {
    "lists_screened": 124,
    "total_potential_matches": 1,
    "auto_dismissed": 1,
    "requiring_review": 0,
    "confirmed_matches": 0
  },
  "timestamp": "2024-01-15T10:30:00Z",
  "expires_at": "2025-01-15T10:30:00Z"
}
```

**Response (PEP Hit)**:
```json
{
  "status": "COMPLETED",
  "screening_id": "SCR-2024-001235",
  "risk_level": "HIGH",
  "overall_result": "HIT",
  "pep_status": "PEP_FAMILY",
  "pep_details": {
    "pep_type": "FAMILY_MEMBER",
    "related_pep_name": "RAJESH SHARMA",
    "related_pep_designation": "Member of Parliament, Lok Sabha",
    "relationship": "FATHER",
    "pep_category": "LEGISLATIVE_CENTRAL",
    "pep_since": "2019-05-23",
    "confidence": 87
  },
  "sanctions_hit": false,
  "adverse_media_hit": false,
  "matches": [],
  "timestamp": "2024-01-15T10:31:00Z"
}
```

**Response (Sanctions Hit)**:
```json
{
  "status": "COMPLETED",
  "screening_id": "SCR-2024-001236",
  "risk_level": "CRITICAL",
  "overall_result": "HIT",
  "pep_status": "NOT_PEP",
  "sanctions_hit": true,
  "sanctions_details": [
    {
      "list_name": "UAPA_DESIGNATED",
      "match_score": 95,
      "match_type": "EXACT_NAME_DOB",
      "matched_entity": "RAHUL SHARMA",
      "designation_date": "2023-08-15",
      "gazette_notification": "S.O. 1234(E)",
      "offense_type": "TERRORIST_FINANCING"
    }
  ],
  "adverse_media_hit": true,
  "adverse_media_details": [
    {
      "source": "REFINITIV",
      "headline": "NIA files chargesheet against...",
      "publication_date": "2023-09-01",
      "categories": ["TERRORISM", "FINANCIAL_CRIME"]
    }
  ],
  "timestamp": "2024-01-15T10:32:00Z"
}
```

### 3.2 Fuzzy Matching Engine

TrackWizz uses a proprietary fuzzy matching engine optimized for Indian names.

**Matching Capabilities**:

| Variation Type | Example | Handling |
|---------------|---------|---------|
| Hindi-English transliteration | "Rakesh" vs "Rakesh" | Phonetic matching across scripts |
| Name order variations | "SHARMA RAHUL" vs "RAHUL SHARMA" | Token-order agnostic matching |
| Initials | "R. SHARMA" vs "RAHUL SHARMA" | Initial expansion matching |
| Aliases | "Bobby" vs "Rajesh" (known alias) | Alias database cross-reference |
| Common misspellings | "RAAKESH" vs "RAKESH" | Edit-distance matching (Levenshtein) |
| Prefix/suffix | "Dr. RAHUL SHARMA" vs "RAHUL SHARMA" | Title/honorific stripping |
| Middle name variations | "RAHUL KUMAR SHARMA" vs "RAHUL SHARMA" | Partial token matching |
| Patronymic patterns | "RAHUL S/O SURESH" vs "RAHUL SHARMA" | Father-name pattern recognition |

### 3.3 Match Scoring

Each potential match is assigned a score from 0 to 100:

| Score Range | Classification | Action | Auto-Resolvable |
|-------------|---------------|--------|-----------------|
| 90-100 | **High confidence match** | Immediate escalation to compliance officer | No |
| 70-89 | **Probable match** | Manual review required | No |
| 50-69 | **Partial match** | Likely false positive, review recommended | Configurable |
| 0-49 | **Low match** | Auto-dismiss (threshold configurable) | Yes (default) |

**Score Calculation Factors**:
- Name similarity (weighted highest)
- Date of birth match/proximity
- PAN match (exact = +30 points)
- Address/geography overlap
- Father's name match
- Gender match

### 3.4 Bulk Screening API

**Endpoint**: `POST /api/v1/screen/batch`

**Request**:
```json
{
  "reference_id": "BATCH_2024_Q1_001",
  "screening_type": "FULL",
  "callback_url": "https://kyc.broker.com/webhooks/aml-batch",
  "customers": [
    {
      "customer_id": "CUST001",
      "name": "RAHUL SHARMA",
      "dob": "1990-01-15",
      "pan": "ABCDE1234F",
      "nationality": "Indian"
    },
    {
      "customer_id": "CUST002",
      "name": "PRIYA PATEL",
      "dob": "1985-06-20",
      "pan": "FGHIJ5678K",
      "nationality": "Indian"
    }
  ]
}
```

**Response** (async, results delivered via webhook):
```json
{
  "batch_id": "BATCH-2024-001234",
  "status": "PROCESSING",
  "total_records": 2,
  "estimated_completion": "2024-01-15T10:45:00Z",
  "callback_url": "https://kyc.broker.com/webhooks/aml-batch"
}
```

**Webhook Callback** (delivered per-customer as completed):
```json
{
  "event": "BATCH_SCREENING_RESULT",
  "batch_id": "BATCH-2024-001234",
  "customer_id": "CUST001",
  "screening_id": "SCR-2024-001234",
  "risk_level": "LOW",
  "overall_result": "CLEAR",
  "pep_status": "NOT_PEP",
  "sanctions_hit": false,
  "adverse_media_hit": false,
  "timestamp": "2024-01-15T10:35:00Z"
}
```

**Batch Limits**:
- Maximum 1,000 records per batch request
- For larger volumes, split into multiple batch requests
- Batch completion: typically 5-30 minutes depending on volume
- Useful for: periodic re-screening, annual compliance reviews, portfolio-wide checks

---

## 4. PMLA Compliance

TrackWizz provides tooling aligned with the Prevention of Money Laundering Act, 2002 (PMLA) and the Prevention of Money Laundering (Maintenance of Records) Rules, 2005.

### 4.1 CDD (Customer Due Diligence) - Standard

Applicable to all customers at onboarding and periodically thereafter.

| CDD Requirement | TrackWizz Role |
|----------------|---------------|
| Verify identity of customer | Screening result confirms no identity conflicts |
| Understand nature of business/occupation | Risk scoring based on occupation input |
| Assess risk profile | Automated risk classification (Low/Medium/High) |
| Screen against sanctions/PEP lists | Core screening functionality |
| Ongoing monitoring | Continuous watchlist monitoring with alerts |
| Record keeping | Full audit trail of all screening decisions |

### 4.2 EDD (Enhanced Due Diligence) - Triggered

EDD is triggered when any of the following conditions are met:

| EDD Trigger | TrackWizz Detection | Required Action |
|-------------|--------------------|-----------------|
| **PEP or PEP family member** | `pep_status` != `NOT_PEP` | Senior management approval, source of funds verification |
| **High-risk country** (FATF grey/black list) | `country_of_residence` in FATF list | Enhanced identity verification, source of wealth documentation |
| **Sanctions list near-match** | `match_score` 70-89 on sanctions list | Manual review by compliance officer, document findings |
| **Adverse media hit** | `adverse_media_hit` = true | Investigate nature of adverse media, assess materiality |
| **Suspicious activity patterns** | Post-onboarding transaction monitoring | File STR if suspicion confirmed |
| **High-value transactions** | As per broker's internal policy thresholds | Additional verification, senior management review |
| **Complex ownership structure** | Multiple UBO layers identified | Trace full ownership chain, verify all UBOs |

**FATF High-Risk Jurisdictions** (as of Feb 2026):

| Category | Countries | Impact |
|----------|-----------|--------|
| **Black List** (Call for Action) | North Korea, Iran, Myanmar | Prohibited or extreme restrictions |
| **Grey List** (Increased Monitoring) | Updated per FATF plenary | EDD mandatory, enhanced scrutiny |

### 4.3 STR (Suspicious Transaction Report)

Filed with FIU-IND (Financial Intelligence Unit - India) when suspicious activity is identified.

| STR Requirement | Details |
|----------------|---------|
| **Filing deadline** | Within 7 working days of forming suspicion |
| **Filed with** | FIU-IND (https://fiuindia.gov.in) |
| **Format** | Prescribed FIU-IND electronic format |
| **Tipping off** | Prohibited - customer must NOT be informed about STR filing |
| **Record retention** | 5 years from date of STR filing |
| **TrackWizz support** | Pre-formatted STR template generation, auto-population of customer data |

**STR Indicators (Securities Market)**:
- Frequent and rapid purchase/sale with no apparent profit motive
- Trading in shares of companies with no fundamentals
- Sudden spike in trading activity inconsistent with customer profile
- Frequent off-market transfers
- Multiple accounts with structurally similar trading patterns
- Circular trading patterns
- Front-running indicators

### 4.4 CTR (Cash Transaction Report)

| CTR Requirement | Details |
|----------------|---------|
| **Threshold** | Cash transactions exceeding Rs. 10 lakh (in aggregate per month) |
| **Filing deadline** | Within 15 days of the month following the transaction |
| **Filed with** | FIU-IND |
| **TrackWizz support** | Automated CTR generation for threshold breaches |

**Note**: Cash transactions are uncommon in broking (most settlements are electronic), but CTR reporting is still required if cash is received for any reason (e.g., margin payments in cash at branch).

### 4.5 Record Retention

| Record Type | Minimum Retention | Authority |
|-------------|------------------|-----------|
| Customer identification records | 5 years after business relationship ends | PMLA Section 12 |
| Transaction records | 5 years from date of transaction | PMLA Rules |
| STR/CTR filing records | 5 years from date of filing | FIU-IND guidelines |
| AML screening results | 5 years after business relationship ends | SEBI AML Circular |
| EDD documentation | 5 years after business relationship ends | PMLA Rules |
| Correspondence with FIU-IND | 5 years from date of correspondence | FIU-IND guidelines |

**Note**: SEBI Stock Brokers Regulations 2026 require 8-year retention for KYC records overall, which supersedes the 5-year PMLA minimum for brokers.

---

## 5. Ongoing Monitoring

### 5.1 Re-Screening Frequency

| Customer Risk Level | Minimum Re-Screening | SEBI Requirement |
|--------------------|---------------------|-----------------|
| Low | Annually | SEBI mandates minimum annual re-screening |
| Medium | Semi-annually | Recommended best practice |
| High / PEP | Quarterly | Recommended best practice |

### 5.2 Real-Time Watchlist Monitoring

TrackWizz monitors all screened customers against watchlist updates in real-time. When a customer matches a newly published list entry, an alert is generated.

**Webhook Alert Payload**:
```json
{
  "event": "WATCHLIST_ALERT",
  "alert_id": "ALT-2024-007890",
  "customer_id": "CUST001",
  "customer_name": "RAHUL SHARMA",
  "customer_pan": "ABCDE1234F",
  "original_screening_id": "SCR-2024-001234",
  "new_match": {
    "list_name": "ED_PMLA_ORDERS",
    "list_category": "REGULATORY",
    "match_score": 82,
    "match_type": "NAME_DOB_MATCH",
    "matched_entity": "RAHUL SHARMA",
    "publication_date": "2024-06-15",
    "details": "PMLA provisional attachment order under Section 5(1)"
  },
  "priority": "HIGH",
  "requires_action_by": "2024-06-22T23:59:59Z",
  "timestamp": "2024-06-15T14:00:00Z"
}
```

### 5.3 Transaction Monitoring

TrackWizz can ingest transaction data for pattern-based suspicious activity detection.

**Monitored Patterns**:
- Unusual trading volume relative to customer profile
- Rapid buy-sell cycles with minimal holding period
- Concentration in illiquid/penny stocks
- Sudden large fund transfers (in/out)
- Trading activity inconsistent with declared income
- Multiple linked accounts with coordinated activity

**Note**: Transaction monitoring requires feeding trade/settlement data from the back-office system (63 Moons ODIN or equivalent) to TrackWizz. This is typically a batch feed (daily EOD file).

### 5.4 Alert Management Workflow

```
Alert Generated
    |
    v
[OPEN] --> Assigned to compliance analyst
    |
    v
[UNDER REVIEW] --> Analyst investigates (documents, trading patterns, media)
    |
    +--> [ESCALATED] --> Senior compliance officer / Principal Officer review
    |         |
    |         +--> [STR FILED] --> STR submitted to FIU-IND
    |         |
    |         +--> [ACCOUNT RESTRICTED] --> Trading suspended pending investigation
    |         |
    |         +--> [DISMISSED] --> False positive, documented with reasons
    |
    +--> [DISMISSED] --> False positive at L1, documented with reasons
    |
    v
[CLOSED] --> Final resolution documented in audit trail
```

---

## 6. Risk Scoring

### 6.1 Customer Risk Classification

TrackWizz assigns a composite risk score and classification to each customer.

| Risk Level | Score Range | Implication |
|-----------|-------------|-------------|
| **LOW** | 0-30 | Standard CDD, annual re-screening |
| **MEDIUM** | 31-60 | Enhanced monitoring, semi-annual re-screening |
| **HIGH** | 61-100 | EDD required, quarterly re-screening, senior management approval |

### 6.2 Risk Factor Weights

| Risk Factor | Weight | Low Risk | Medium Risk | High Risk |
|-------------|--------|----------|-------------|-----------|
| **Geography** (country of residence / nationality) | 25% | India, US, UK, EU, Japan, Australia | GCC, South-East Asia, non-FATF grey | FATF grey/black list countries |
| **Occupation** | 15% | Salaried, retired, student | Business owner, professional | Arms dealer, casino operator, precious metals, virtual assets |
| **Income Source** | 15% | Salary, pension, rental income | Business income, investments | Unverifiable sources, cash-intensive businesses |
| **PEP Status** | 20% | Not PEP | PEP family member / close associate | Direct PEP |
| **Adverse Media** | 10% | No hits | Minor/old negative coverage | Active financial crime reporting |
| **Transaction Patterns** | 10% | Normal trading activity | Occasional spikes | Consistent unusual patterns |
| **Sanctions/Regulatory** | 5% | Clean | Near-matches (dismissed) | Active match or past enforcement action |

### 6.3 Risk Score Integration

The risk score feeds into the broker's CDD/EDD decision matrix:

```
Risk Score
    |
    +--> LOW (0-30)    --> Standard onboarding, no additional requirements
    |
    +--> MEDIUM (31-60) --> Flag for L2 review during onboarding
    |                      Additional documentation may be requested
    |                      Enhanced monitoring post-onboarding
    |
    +--> HIGH (61-100)  --> BLOCK onboarding until EDD completed
                           Senior management must approve
                           Source of funds/wealth documentation mandatory
                           Quarterly re-screening
                           Principal Officer notification
```

---

## 7. Non-Individual Entity Screening

### 7.1 Corporate Entities

For corporate accounts, screening must cover the company AND all key individuals.

**Screening Scope**:

| Entity | Screening Required | API Calls |
|--------|-------------------|-----------|
| Company name | Screen against all watchlists | 1 call (entity screening) |
| All directors | Individual screening for each director | N calls (1 per director) |
| All UBOs (Ultimate Beneficial Owners) | Individual screening for each UBO | N calls (1 per UBO) |
| Authorized signatories | Individual screening | N calls (1 per signatory) |

**UBO (Ultimate Beneficial Owner) Identification**:

| Threshold | Regulation |
|-----------|-----------|
| **10% ownership or control** | SEBI standard for securities market intermediaries |
| **25% ownership or control** | PMLA Rules general threshold |
| **Effective control** regardless of ownership | PMLA Rules (management/operational control) |

**Note**: SEBI uses the stricter 10% threshold for intermediaries. All persons with 10% or more ownership stake, directly or indirectly, must be identified and screened.

**Corporate Screening Request**:
```json
{
  "reference_id": "SCR_CORP_001",
  "entity_type": "CORPORATE",
  "entity_name": "ACME TRADING PVT LTD",
  "cin": "U74999MH2020PTC123456",
  "pan": "AABCA1234F",
  "country_of_incorporation": "IN",
  "screening_type": "FULL",
  "directors": [
    {
      "name": "RAHUL SHARMA",
      "din": "12345678",
      "dob": "1990-01-15",
      "pan": "ABCDE1234F",
      "nationality": "Indian",
      "is_foreign_resident": false
    }
  ],
  "ubos": [
    {
      "name": "SURESH SHARMA",
      "dob": "1960-05-20",
      "pan": "FGHIJ5678K",
      "ownership_percentage": 51,
      "nationality": "Indian"
    }
  ]
}
```

### 7.2 Entity Type Screening Requirements

| Entity Type | Screen Entity Name | Screen Individuals | Who to Screen |
|-------------|-------------------|-------------------|---------------|
| **HUF** | Yes (HUF name) | Yes | Karta + coparceners (if known) |
| **Partnership Firm** | Yes (firm name) | Yes | All partners individually |
| **LLP** | Yes (LLP name) | Yes | All designated partners + UBOs (10%+) |
| **Company** | Yes (company name) | Yes | All directors + all UBOs (10%+) |
| **Body Corporate** | Yes (entity name) | Yes | All directors + all UBOs (10%+) |
| **Trust** | Yes (trust name) | Yes | All trustees + known beneficiaries + settlor |
| **Society** | Yes (society name) | Yes | Office bearers (President, Secretary, Treasurer) |
| **NRI Individual** | Yes | Yes | Additional country-risk screening for country of residence |

### 7.3 UBO Identification for Complex Structures

For layered ownership / shell company structures:

```
TrackWizz approach:
1. Screen the top-level entity
2. Identify all direct shareholders/partners with 10%+ stake
3. For corporate shareholders, drill down to identify natural persons
4. Continue until all natural person UBOs are identified
5. Screen every natural person UBO individually
6. Flag if ownership chain includes:
   - Entities in FATF high-risk jurisdictions
   - Bearer share structures
   - Nominee arrangements
   - Multi-layered offshore structures (3+ layers)
```

**Escalation**: If UBO cannot be identified (opaque structures, non-cooperative entities), TrackWizz flags this as a risk factor. SEBI guidelines require that brokers must NOT proceed with onboarding if UBO cannot be identified.

---

## 8. SEBI AML Framework

### 8.1 Governing Circular

**Master Circular**: SEBI/HO/MIRSD/DOP/P/CIR/2023/37 (March 15, 2023)
**Consolidated with**: SEBI/HO/MIRSD/MIRSD-SEC-2/P/CIR/2023/168 (October 2023)

This circular prescribes AML/CFT obligations for all SEBI-registered intermediaries, including stock brokers.

### 8.2 Broker Obligations under SEBI AML Framework

| Obligation | Details | TrackWizz Support |
|-----------|---------|-------------------|
| **Customer Identification & Verification** | Identify customer, verify identity using reliable documents | Screening confirms no identity conflicts with watchlists |
| **Risk Categorization** | Classify customers as Low/Medium/High risk | Automated risk scoring and classification |
| **Ongoing Monitoring** | Monitor transactions, periodic account reviews | Real-time watchlist monitoring + transaction pattern analysis |
| **STR/CTR Filing** | File with FIU-IND when suspicious activity detected | Pre-formatted STR/CTR templates, auto-population |
| **Staff Training** | Regular AML training for all staff | TrackWizz provides training materials and awareness resources |
| **Designated Principal Officer** | Appoint Principal Officer for AML compliance | Alert routing to designated Principal Officer |
| **Record Retention** | Minimum 5 years (8 years per SEBI 2026 Regulations for brokers) | Full audit trail stored within retention period |
| **Annual Audit** | Internal audit of AML procedures | Compliance dashboard with audit-ready reports |
| **FATF Compliance** | Screen against FATF lists, apply EDD for high-risk countries | FATF grey/black list integrated in screening |
| **Wire Transfer Rules** | Originator/beneficiary information for fund transfers | Not directly applicable to screening, but customer data verified |

### 8.3 Principal Officer Responsibilities

The designated Principal Officer (PO) is the single point of contact with FIU-IND.

| Responsibility | How TrackWizz Helps |
|---------------|-------------------|
| Oversee AML compliance program | Management dashboard with KPIs |
| Review and file STRs | STR template generation, review workflow |
| Respond to FIU-IND queries | Audit trail provides historical screening data |
| Ensure staff training | Training module tracking |
| Annual AML audit coordination | Compliance reports for auditors |
| Escalation of high-risk matters | Alert routing directly to PO for critical matches |

### 8.4 Penalties for Non-Compliance

| Authority | Penalty Type | Amount/Action |
|-----------|-------------|---------------|
| **SEBI** | Monetary penalty | Up to Rs. 1 crore per violation |
| **SEBI** | Suspension/cancellation | Broker registration suspension or cancellation |
| **FIU-IND** | Penalty for non-filing | Rs. 10,000 per day of non-compliance |
| **PMLA (ED)** | Criminal prosecution | Imprisonment up to 7 years + fine |
| **PMLA (ED)** | Provisional attachment | Attachment of property involved in money laundering |

---

## 9. Integration Details

### 9.1 API Specifications

| Attribute | Details |
|-----------|---------|
| **Protocol** | REST over HTTPS (TLS 1.2+) |
| **Data Format** | JSON (request and response) |
| **Character Encoding** | UTF-8 |
| **API Version** | v1 (current) |

### 9.2 Authentication

**Token Acquisition**:

```
POST /api/v1/auth/login
Content-Type: application/json

{
  "client_id": "your_client_id",
  "client_secret": "your_client_secret"
}
```

**Response**:
```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIs...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "refresh_token": "dGhpcyBpcyBhIHJlZnJl..."
}
```

**Usage**: Include in all subsequent requests:
```
Authorization: Bearer eyJhbGciOiJSUzI1NiIs...
```

**Token Lifecycle**:
- Access token valid for 1 hour (3600 seconds)
- Refresh token valid for 24 hours
- Refresh before expiry using `POST /api/v1/auth/refresh`
- Rotate client credentials quarterly (security best practice)

### 9.3 Environments

| Environment | Purpose | Access |
|-------------|---------|--------|
| **Sandbox/UAT** | Testing and development | Contact TrackWizz for test credentials |
| **Production** | Live screening | Activated after UAT sign-off |

**Sandbox Notes**:
- Sandbox returns synthetic match results for testing
- Specific test names trigger specific responses (e.g., "OFAC TEST ENTITY" returns sanctions hit)
- No real watchlist data in sandbox
- Rate limits apply (same as production)

### 9.4 Rate Limits

| Endpoint | Rate Limit | Burst Limit |
|----------|-----------|-------------|
| `POST /api/v1/screen` | 50 TPS (transactions per second) | 100 TPS for 10 seconds |
| `POST /api/v1/screen/batch` | 10 requests/minute | N/A |
| `GET /api/v1/screen/{id}` | 100 TPS | 200 TPS |
| `POST /api/v1/auth/login` | 10 requests/minute | N/A |

**Rate Limit Headers**:
```
X-RateLimit-Limit: 50
X-RateLimit-Remaining: 48
X-RateLimit-Reset: 1705312260
```

### 9.5 SLA

| Metric | Target |
|--------|--------|
| **Screening response time** | < 5 seconds (P95) |
| **Batch processing** | < 30 minutes for 1,000 records |
| **API uptime** | 99.9% |
| **Webhook delivery** | < 60 seconds from event |
| **Support response** | < 4 hours (critical), < 24 hours (standard) |
| **Data center** | India-based (regulatory compliance) |

### 9.6 Webhook Configuration

**Webhook Setup**:
```json
POST /api/v1/webhooks/register
{
  "url": "https://kyc.broker.com/webhooks/aml",
  "events": ["WATCHLIST_ALERT", "BATCH_SCREENING_RESULT", "MONITORING_ALERT"],
  "secret": "webhook_signing_secret_xxxxx"
}
```

**Webhook Verification** (HMAC-SHA256):
```
X-TrackWizz-Signature: sha256=d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3
```

Verify by computing `HMAC-SHA256(webhook_secret, request_body)` and comparing with the header value.

**Retry Policy**: 3 retries with exponential backoff (30s, 2m, 10m). After 3 failures, alert is queued and webhook marked unhealthy.

### 9.7 Error Handling

| HTTP Code | Error Code | Meaning | Action |
|-----------|-----------|---------|--------|
| 200 | - | Success | Process response |
| 400 | `INVALID_INPUT` | Malformed request or missing mandatory fields | Fix input and retry |
| 400 | `INVALID_PAN` | PAN format invalid | Validate PAN format before calling |
| 400 | `INVALID_DOB` | Date format not YYYY-MM-DD | Fix date format |
| 401 | `TOKEN_EXPIRED` | Bearer token expired | Refresh token and retry |
| 401 | `INVALID_TOKEN` | Token invalid or revoked | Re-authenticate |
| 403 | `IP_NOT_WHITELISTED` | Calling IP not in whitelist | Add IP to whitelist in TrackWizz dashboard |
| 404 | `SCREENING_NOT_FOUND` | Screening ID does not exist | Verify screening ID |
| 429 | `RATE_LIMIT_EXCEEDED` | Too many requests | Implement exponential backoff, retry after `Retry-After` header |
| 500 | `INTERNAL_ERROR` | TrackWizz server error | Retry with exponential backoff (max 3 retries) |
| 503 | `SERVICE_UNAVAILABLE` | Maintenance or source unavailable | Retry after delay, check status page |

**Error Response Format**:
```json
{
  "error": {
    "code": "INVALID_INPUT",
    "message": "Field 'dob' is required for screening_type FULL",
    "details": {
      "field": "dob",
      "constraint": "required"
    }
  },
  "request_id": "REQ-2024-567890"
}
```

### 9.8 Deployment Options

| Option | Description | Pros | Cons |
|--------|-------------|------|------|
| **Cloud SaaS** (Recommended) | TrackWizz-hosted, API-only integration | Fast setup (1-2 weeks), no infra management, auto-updates to watchlists | Data leaves broker's network, ongoing subscription |
| **On-Premise** | TrackWizz software deployed in broker's data center | Data stays in-house, full control, customizable | Higher upfront cost, manual watchlist updates, longer setup (4-8 weeks) |

---

## 10. Reporting

### 10.1 STR Filing Assistance

TrackWizz generates pre-formatted STR templates compatible with FIU-IND's electronic filing system.

**STR Template Fields** (auto-populated from screening data):
- Reporting entity details (broker name, SEBI registration number)
- Customer identification details (name, PAN, DOB, address)
- Account details (trading account number, BO ID)
- Suspicious transaction details (date, amount, type, description)
- Reason for suspicion (mapped from screening results and analyst notes)
- Supporting documentation list

### 10.2 CTR Generation

Automated CTR generation when cash transaction thresholds are breached:
- Individual cash transaction > Rs. 10 lakh
- Aggregate cash transactions > Rs. 10 lakh in a calendar month
- Connected cash transactions < Rs. 10 lakh individually but > Rs. 10 lakh in aggregate (structuring detection)

### 10.3 Regulatory Reports

| Report | Frequency | Content |
|--------|-----------|---------|
| **AML Compliance Summary** | Monthly | Screening volumes, hit rates, resolution stats |
| **PEP Register** | Quarterly | List of all PEP customers with EDD status |
| **High-Risk Customer Report** | Quarterly | All customers classified as High risk with current status |
| **STR/CTR Filing Register** | Monthly | All STRs/CTRs filed with FIU-IND |
| **False Positive Report** | Monthly | Dismissed matches, rates by list type |
| **Re-Screening Compliance** | Quarterly | Customers due/overdue for re-screening |
| **Annual AML Audit Report** | Annually | Comprehensive report for internal/external auditors |

### 10.4 Management Dashboard

TrackWizz provides a web-based dashboard with:

| Dashboard Widget | Metric |
|-----------------|--------|
| **Screening Volume** | Daily/weekly/monthly screening counts |
| **Hit Rate** | Percentage of screenings with matches (by list type) |
| **False Positive Rate** | Percentage of matches dismissed as false positives |
| **Alert Queue** | Open alerts pending review (with aging) |
| **Risk Distribution** | Customer base breakdown by Low/Medium/High risk |
| **SLA Compliance** | Alert resolution time vs. target |
| **STR Filing Status** | Filed vs. pending STRs |
| **Re-Screening Due** | Customers due for periodic re-screening |

### 10.5 Audit Trail

Every screening decision is logged with:
- Screening request and full response
- Analyst who reviewed (if manual review)
- Decision taken (approve / reject / escalate)
- Reason for decision (especially for dismissed matches)
- Timestamp of each action
- Supervisor approval (if escalated)

The audit trail is immutable and retained for the configured retention period (minimum 5 years, recommend 8 years per SEBI 2026 Regulations).

---

## 11. Pricing

### 11.1 SaaS Pricing (Estimated)

| Component | Price Range | Notes |
|-----------|-----------|-------|
| **Per-screening (individual)** | Rs. 5-15 | Depends on screening_type and volume commitment |
| **Per-screening (entity)** | Rs. 10-25 | Higher due to entity + director/UBO screening |
| **Ongoing monitoring** | Rs. 2-5 per customer per month | OR annual per-customer fee |
| **Batch screening** | Rs. 3-10 per record | Volume discount on bulk |
| **Dashboard access** | Included | Web portal for compliance team |
| **Webhook alerts** | Included | Real-time monitoring alerts |
| **STR/CTR templates** | Included | Report generation |

### 11.2 Volume Discounts

| Monthly Volume | Discount |
|---------------|----------|
| < 1,000 screenings | Standard pricing |
| 1,000 - 5,000 | 10-15% discount |
| 5,000 - 20,000 | 20-25% discount |
| 20,000+ | Custom pricing (negotiate) |

### 11.3 On-Premise Pricing

| Component | Price Range | Notes |
|-----------|-----------|-------|
| **License fee** (one-time) | Rs. 10-25 lakh | Depends on deployment size |
| **Annual maintenance** | 15-20% of license fee | Includes watchlist updates, patches |
| **Per-transaction fee** | Rs. 1-5 | Lower than SaaS due to upfront license |
| **Implementation** | Rs. 5-10 lakh | Setup, configuration, training |

### 11.4 Estimated Monthly Cost for a Retail Broker

| Scenario | New Accounts/Month | Re-Screening | Monthly Cost (Approx.) |
|----------|-------------------|-------------|----------------------|
| Small broker | 500 | 5,000 annual | Rs. 15,000-25,000 |
| Mid-size broker | 5,000 | 50,000 annual | Rs. 75,000-1,50,000 |
| Large broker | 50,000 | 5,00,000 annual | Rs. 5,00,000+ (custom) |

---

## 12. Edge Cases

### 12.1 Common Indian Names Generating False Positives

**Problem**: Names like "Amit Kumar", "Rahul Sharma", "Priya Patel" match hundreds of watchlist entries.

**Solution**:
```
Mitigation strategy:
1. Always provide DOB + PAN along with name (reduces false positives by ~80%)
2. Configure auto-dismiss threshold at 50 (dismiss all matches scoring below 50)
3. Use father's name as additional differentiator
4. Address/geography matching further reduces false positives
5. Build a whitelisted false-positive database (see 12.5)
```

### 12.2 Customer Cleared Initially but Later Sanctioned

**Scenario**: Customer passes screening at onboarding, but 6 months later appears on SEBI debarred list.

**Handling**:
```
1. TrackWizz ongoing monitoring detects the new match
2. Webhook alert sent to broker's system (priority: CRITICAL)
3. Compliance team reviews within 24 hours
4. If confirmed match:
   a. Freeze trading account immediately
   b. Notify designated Principal Officer
   c. File STR with FIU-IND if applicable
   d. Notify exchanges (NSE/BSE) per SEBI requirement
   e. Document all actions in audit trail
```

### 12.3 PEP Family Members

**SEBI Requirement**: Screen spouse, children, and parents of PEPs.

**Challenge**: Customer may not disclose PEP relationship. TrackWizz handles this by:
1. Matching father's name against PEP database
2. Surname matching against known PEP families
3. Address proximity matching (same household)
4. Media/news cross-reference for PEP family connections

**If PEP family relationship discovered post-onboarding**:
- Upgrade risk classification to HIGH
- Trigger EDD
- Obtain senior management approval for continued relationship
- Increase monitoring frequency to quarterly

### 12.4 Name Change After Screening

**Scenario**: Customer changes name after marriage (e.g., "Priya Patel" becomes "Priya Sharma").

**Handling**:
1. Customer notifies broker of name change
2. Re-screen with new name via `POST /api/v1/screen`
3. Link new screening_id to original screening_id in records
4. Update ongoing monitoring to use new name
5. Retain old name screening records (do not delete)

### 12.5 False Positive Whitelisting

**Capability**: Once a match is dismissed as a false positive, TrackWizz can be configured to not re-alert for the same match in subsequent screenings.

**Configuration**:
```json
POST /api/v1/whitelist
{
  "customer_pan": "ABCDE1234F",
  "dismissed_match_id": "MTH-2024-005678",
  "reason": "Different DOB (1990 vs 1975), different father name, verified PAN-Aadhaar link",
  "approved_by": "compliance_officer_id",
  "valid_until": "2025-01-15T00:00:00Z"
}
```

**Rules**:
- Whitelisting is customer-specific + match-specific
- Whitelist has expiry (re-review required, typically annual)
- New matches from different lists are NOT auto-whitelisted
- Whitelist audit trail maintained
- Whitelist can be revoked at any time

### 12.6 Transliteration Challenges

**Problem**: Hindi names transliterated to English have multiple valid spellings.

| Hindi | Possible English Spellings |
|-------|--------------------------|
| (Rakesh) | Rakesh, Rakeesh, Raksh |
| (Sharma) | Sharma, Sharema, Sharmaa |
| (Gupta) | Gupta, Guptaa, Gopta |
| (Srinivasan) | Srinivasan, Srinivaasan, Shrinivasan |
| (Choudhary) | Choudhary, Chowdhury, Chaudhary, Choudhury, Chowdhary |

TrackWizz handles this with phonetic matching algorithms (Soundex, Metaphone, and Indian-language-specific phonetic rules).

### 12.7 Deceased Person on Watchlist

**Scenario**: A customer's name matches a deceased person on a historical watchlist.

**Handling**: If DOB clearly differs and the watchlisted entity is confirmed deceased, auto-dismiss with documented reason. However, if the customer shares name AND DOB with a deceased watchlisted entity, flag for manual review (possible identity theft).

---

## 13. Alternatives Comparison

| Feature | TrackWizz | ComplyAdvantage | IDfy AML | Bureau.id |
|---------|-----------|----------------|----------|-----------|
| **Focus** | AML/CFT compliance | Global AML compliance | Identity + AML | Device fraud prevention |
| **Indian Regulatory Lists** | Excellent (SEBI, RBI, MHA, UAPA, ED, NIA) | Good (global focus, some Indian lists) | Good (150+ entities) | N/A (not AML) |
| **PEP Coverage** | 95+ global databases | 200+ global databases | Basic PEP screening | N/A |
| **Adverse Media** | Refinitiv World-Check partnership | Own AI-powered screening | Basic media screening | N/A |
| **Deployment Options** | SaaS + On-premise | SaaS only | SaaS only | SaaS only |
| **India Specialization** | High (built for Indian regulatory landscape) | Medium (global platform) | Medium (Indian company but broader focus) | High (Indian device fraud) |
| **Ongoing Monitoring** | Yes (webhook alerts) | Yes (webhook alerts) | Limited | N/A |
| **STR/CTR Templates** | Yes (FIU-IND format) | No (global format) | No | N/A |
| **Pricing (per screen)** | Rs. 5-15 | $0.50-2 (Rs. 40-170) | Rs. 5-15 | Rs. 2-5 (device check) |
| **API Response Time** | < 5 seconds | < 3 seconds | < 5 seconds | < 1 second |
| **Best For** | Indian broker AML/PMLA compliance | Global firms, multi-jurisdiction | Quick integration, basic screening | Fraud prevention layer (device fingerprinting) |
| **Integration Time** | 1-2 weeks | 1-2 weeks | 1 week | 1 week |

**Recommendation**: TrackWizz is the primary choice for Indian broker AML compliance due to:
1. Deep coverage of India-specific regulatory lists (SEBI, RBI, MHA, UAPA, ED)
2. Hindi-English transliteration-aware fuzzy matching
3. Pre-built STR/CTR templates for FIU-IND
4. On-premise deployment option for data-sensitive firms
5. Cost-effective for Indian market (Rs. pricing vs. USD)

**Bureau.id as Complement**: Bureau.id addresses device fraud (99.7% persistence device fingerprinting, 200+ risk signals) which is a separate concern from AML screening. Consider adding Bureau.id as a complementary fraud prevention layer for detecting:
- Multiple accounts from same device
- Device spoofing / emulators
- Bot-driven account creation
- Proxy/VPN usage during onboarding

---

## 14. Integration with Our System

### 14.1 Screening Gate in Onboarding Flow

AML screening runs as a **BLOCKING GATE** before account approval. No account can be activated without a CLEAR or manually-approved AML screening result.

```
Onboarding Flow Position:

  PAN Verified [V1] -----> KRA Lookup [V4] -----> Bank Verified [V3]
                                                         |
                                                         v
                                              +---------------------+
                                              |  AML SCREENING [V10]|  <-- BLOCKING GATE
                                              |     TrackWizz       |
                                              +---------------------+
                                                    |         |
                                                    v         v
                                                 CLEAR       HIT
                                                    |         |
                                                    v         v
                                               Proceed    Route to
                                              to e-Sign   Compliance
                                                [V6]       Team
```

### 14.2 Integration Sequence

```
Step 1: Collect screening data
  |--- name: from PAN verification (R02) or KRA fetch
  |--- dob: from PAN verification or Aadhaar
  |--- pan: from user input (verified)
  |--- nationality: from KYC form
  |--- address: from Aadhaar/DigiLocker
  |--- father_name: from KRA record or Aadhaar
  |
Step 2: Call TrackWizz screening API
  |--- POST /api/v1/screen
  |--- Wait for synchronous response (< 5 seconds)
  |
Step 3: Process result
  |--- IF overall_result = "CLEAR" AND risk_level = "LOW":
  |       -> Auto-approve, store screening_id, proceed to next step
  |
  |--- IF overall_result = "CLEAR" AND risk_level = "MEDIUM":
  |       -> Flag for L2 review during admin validation (Step 26-29)
  |       -> Allow onboarding to continue (non-blocking)
  |
  |--- IF overall_result = "HIT" AND sanctions_hit = true:
  |       -> BLOCK immediately
  |       -> Route to Principal Officer
  |       -> DO NOT proceed with onboarding
  |       -> Consider STR filing
  |
  |--- IF overall_result = "HIT" AND pep_status != "NOT_PEP":
  |       -> Route to compliance team for EDD
  |       -> Onboarding paused until EDD completed and approved
  |       -> Senior management sign-off required
  |
  |--- IF overall_result = "HIT" AND adverse_media_hit = true:
  |       -> Route to compliance team for review
  |       -> Assess materiality of adverse media
  |       -> Document decision (proceed with EDD or reject)
  |
Step 4: Register webhook for ongoing monitoring
  |--- TrackWizz monitors customer against future watchlist updates
  |--- Webhook alerts routed to compliance alert queue
  |
Step 5: Store results
  |--- screening_id -> stored in application record
  |--- risk_level -> stored for risk classification
  |--- pep_status -> mapped to KYC_MASTER_DATASET K01, K02
  |--- Full response -> stored for audit trail (8-year retention)
```

### 14.3 Data Mapping to Master Dataset

| TrackWizz Response Field | Master Dataset Field | Section | Notes |
|-------------------------|---------------------|---------|-------|
| `pep_status` (PEP/PEP_FAMILY) | `is_pep` (K01) | K: AML/Compliance | Boolean: true if PEP |
| `pep_details.relationship` | `is_pep_related` (K02) | K: AML/Compliance | Boolean: true if PEP family |
| `pep_details.pep_type` | `pep_type` | K | PEP, PEP_FAMILY, PEP_ASSOCIATE |
| `pep_details.related_pep_name` | `pep_related_person_name` | K | Name of related PEP |
| `risk_level` | `aml_risk_level` | K | LOW, MEDIUM, HIGH |
| `screening_id` | `aml_screening_id` | R: Third-Party Results | Unique screening reference |
| `sanctions_hit` | Escalation flag | - | If true: do not onboard, report |
| `adverse_media_hit` | EDD trigger | - | If true: enhanced due diligence |

### 14.4 Ongoing Re-Screening Schedule

| Trigger | Action | Implementation |
|---------|--------|---------------|
| **New account onboarding** | Full screening | Synchronous API call during onboarding flow |
| **Annual re-screening** | Batch re-screen all active customers | Monthly batch job (screen 1/12th of customer base each month) |
| **Customer data change** | Re-screen with updated data | Triggered when customer updates name, address, or nationality |
| **Watchlist update alert** | Review alert, investigate | Webhook-triggered, routed to compliance queue |
| **Regulatory directive** | Ad-hoc screening against specific list | On-demand batch screening |

**Batch Re-Screening Job**:
```
Cron: 0 2 1 * *  (1st of every month at 2 AM)

1. Query all active customers where:
   - last_screening_date < (today - (365 / risk_frequency_multiplier))
   - Risk frequency: LOW=365 days, MEDIUM=180 days, HIGH=90 days
2. Extract: name, dob, pan, nationality, address
3. Submit to TrackWizz batch API (up to 1,000 per batch)
4. Process webhook results:
   - CLEAR: update last_screening_date
   - HIT: create compliance alert, assign to analyst
5. Generate re-screening compliance report
```

### 14.5 Error Handling and Fallback

| Scenario | Handling |
|----------|---------|
| TrackWizz API timeout (> 10 seconds) | Retry once. If still fails, queue for async processing. DO NOT auto-approve. |
| TrackWizz API 5xx error | Retry up to 3 times with exponential backoff (5s, 15s, 45s) |
| TrackWizz API 429 (rate limited) | Queue request, retry after `Retry-After` header value |
| TrackWizz completely unavailable | Pause onboarding. AML screening is a BLOCKING requirement - cannot be skipped. |
| Webhook delivery failure | TrackWizz retries 3 times. If all fail, poll `GET /api/v1/alerts` every 15 minutes. |

**Critical Rule**: AML screening must NEVER be bypassed or skipped. If TrackWizz is unavailable, onboarding must be paused until screening can be completed. This is a regulatory requirement under PMLA and SEBI AML guidelines.

---

*This document should be read alongside [Vendor Integrations](/vendors/) (Section 12: V10) and [Master Dataset](/reference/master-dataset) (Section K: AML/Compliance) for the complete integration context.*

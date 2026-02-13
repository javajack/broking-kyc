---
title: CDSL MTF & Pledge Operations
description: Margin pledge, re-pledge, MTF funding, eLAS, pledge invocation, automated pledge release, CUSPA accounts, and pledge file formats.
---

Comprehensive guide to pledge operations in CDSL — margin pledge, MTF pledge, eLAS (Loan Against Shares), automated pledge release, and the tag-based file format.

> Back to [CDSL Overview](/broking-kyc/vendors/depositories/cdsl/)

---

## 1. Regulatory Framework

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

---

## 2. Pledge Ecosystem Architecture

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

---

## 3. Three Types of Pledges in CDSL

| Pledge Type | Purpose | Pledgor --> Pledgee | OTP Required |
|-------------|---------|---------------------|--------------|
| **Normal Pledge** | Loan Against Shares (eLAS) | Client --> NBFC/Bank | Yes (TPIN+OTP) |
| **Margin Pledge** | Margin collateral for trading | Client --> TM/CM CUSPA | Yes (TPIN+OTP) or DDPI |
| **MTF Pledge** | Margin Trading Facility funding | Client --> TM/CM Funding Account | Yes (TPIN+OTP) or DDPI |

---

## 4. Margin Pledge Process Flow

### 4.1 Client-to-Broker Pledge (Margin Pledge)

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

### 4.2 Broker-to-CC Re-pledge

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

### 4.3 Unpledge Process

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

---

## 5. MTF Pledge Process Flow

MTF is different from regular margin pledge — here the broker funds the client's purchase:

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

---

## 6. CDSL Pledge File Format (Tag-Based)

Pledge transactions use the **tag-based** Common Upload format (not positional).

### 6.1 Pledge Transaction Tags

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
| `<Rcvdt>` | Request Received Date | Numeric | 8 | DDMMYYYY — date instruction received from client |
| `<Remk>` | Remarks | Alpha | 50 | Free text remarks |
| `<RejRsnCd>` | Rejection Reason Code | Alpha | 3 | Mandatory when rejecting pledge/unpledge (since Jun 2024, per CDSL/OPS/DP/POLCY/2024/314) |

### 6.2 Margin Pledge Specific Tags (Additional)

| Tag | Field | Description |
|-----|-------|-------------|
| `<MrgPldgTp>` | Margin Pledge Type | `MP`=Margin Pledge, `MRP`=Margin Re-pledge, `MFP`=MTF Pledge |
| `<CMID>` | Clearing Member ID | For re-pledge to CC |
| `<ExchCd>` | Exchange Code | NSE/BSE/MCX |
| `<SegCd>` | Segment Code | CM/FO/CD/COM |

### 6.3 Sample Pledge File

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

### 6.4 Sample Unpledge File

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

### 6.5 Sample Invocation (Confiscation) File

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

---

## 7. Pledge Invocation (Confiscation)

Invocation occurs when the broker exercises the pledge to recover dues:

| Aspect | Details |
|--------|---------|
| **Trigger** | Client fails to meet margin call / MTF funding obligation |
| **Process** | Broker submits confiscation instruction to CDSL (Pldgtp = 'C') |
| **Effect** | Securities transferred from client BO to broker BO / CC account |
| **Client Notification** | CDSL sends SMS + email to client about invocation |
| **Reversal** | Not possible once executed; client must buy back |
| **Rejection Reason** | Since Jun 2024, broker must specify rejection reason code when rejecting pledge/unpledge |

---

## 8. SEBI Automated Pledge Mechanism (June 2025)

SEBI circular SEBI/HO/MIRSD/MIRSD-PoD/P/CIR/2025/82 introduced three new automated mechanisms effective October 10, 2025:

### 8.1 Pledge Release for Early Pay-in (PR-EP)

| Aspect | Details |
|--------|---------|
| **Trigger** | Client sells securities that are currently pledged (margin/CUSPA/MTF) |
| **Old Process** | Manual: Client unpledges, waits, then sells. Short delivery risk. |
| **New Process** | Automated single instruction: Pledge release + Early pay-in block simultaneously |
| **Key Feature** | Does NOT require DDPI/POA or any electronic/physical instruction from client |
| **Validation** | Based on confirmed delivery obligation data from Clearing Corporation |
| **Effective Date** | October 10, 2025 (extended from September 1, 2025 after CDSL/NSDL representations) |

### 8.2 Invocation for Early Pay-in (IV-EP)

| Aspect | Details |
|--------|---------|
| **Trigger** | Broker invokes pledged margin securities for client's settlement |
| **Process** | Securities automatically blocked for early pay-in in client's demat account |
| **Trail** | Transaction trail maintained in broker's margin pledge account |
| **Validation** | Limited to confirmed delivery obligations only |
| **Exclusion** | Mutual fund units not traded on exchange excluded |

### 8.3 Invocation for Redemption (IV-RD)

| Aspect | Details |
|--------|---------|
| **Trigger** | Broker invokes pledged securities for redemption (MF units, etc.) |
| **Process** | Direct redemption instruction from broker's pledge account |

---

## 9. Pledge APIs Summary

| API | Endpoint | Purpose | Auth |
|-----|----------|---------|------|
| **e-Margin Pledge** | `api.cdslindia.com/APIServices` | Create margin pledge from BO to TM/CM | API Key + DSC |
| **Margin Repledge** | `api.cdslindia.com/APIServices` | Re-pledge from TM/CM to CC | API Key + DSC |
| **eLAS** | `api.cdslindia.com/APIServices` | Loan Against Shares pledge | API Key + DSC |
| **Transaction Upload** | `api.cdslindia.com/APIServices` | Batch pledge/unpledge via file upload | API Key + DSC |
| **Pledge Query** | `api.cdslindia.com/APIServices` | Query pledge status by BO/ISIN | API Key |

---

## 10. Margin Pledge Haircut Framework

When securities are pledged as margin, the Clearing Corporation applies a haircut:

| Security Category | Typical Haircut | Margin Benefit (on Rs. 1 lakh pledged) |
|-------------------|-----------------|----------------------------------------|
| Group I (Large Cap, liquid) | VaR (8-15%) + ELM (3.5%) | Rs. 81,500 - Rs. 88,500 |
| Group II (Mid Cap) | VaR (15-30%) + ELM (5%) | Rs. 65,000 - Rs. 80,000 |
| Group III (Small Cap) | VaR (30-50%) + ELM (5%) | Rs. 45,000 - Rs. 65,000 |
| ETFs / Liquid Bees | 5-10% | Rs. 90,000 - Rs. 95,000 |
| Sovereign Gold Bonds | 10-15% | Rs. 85,000 - Rs. 90,000 |

:::note
Actual haircuts are published daily by Clearing Corporations (NSCCL/ICCL). These are indicative ranges.
:::

---

## 11. Client Securities Margin Pledge Account (CUSPA)

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

---

## 12. MTF-Specific Demat Account

| Aspect | Details |
|--------|---------|
| **Account Label** | "Client Securities under Margin Funding Account" |
| **Who Opens** | Broker opens with CDSL |
| **Purpose** | Holds MTF pledge liens (funded stock) |
| **SEBI Requirement** | Mandatory separate account for MTF funded stock (per SEBI/HO/MIRSD/DOP/CIR/P/2020/28) |
| **Pledge Duration** | Until client repays MTF funding or position is squared off |
| **Client Action** | Must accept pledge by T+3 (5:00 PM) else auto square-off on T+4 |
| **Interest** | Broker charges MTF interest (typically 12-18% p.a.) on funded amount |

---

## 13. Pledge Cost Structure

| Operation | CDSL Charge | Typical DP Charge to Client |
|-----------|------------|---------------------------|
| Margin Pledge (create) | Part of Rs. 3.50/debit txn | Rs. 25-30 per ISIN + GST |
| Unpledge | No separate charge | Free or Rs. 10-15 |
| Re-pledge (TM to CC) | Part of Rs. 3.50/debit txn | Not charged to client |
| Invocation | Part of Rs. 3.50/debit txn | Penalty charges to client |

---

## Related Pages

- [CDSL Overview](/broking-kyc/vendors/depositories/cdsl/) — Core BO integration spec
- [DDPI Deep Dive](/broking-kyc/vendors/depositories/cdsl-ddpi/) — DDPI authorization that enables automatic pledge
- [BO Modifications](/broking-kyc/vendors/depositories/cdsl-modifications/) — Modifying pledge-related account details
- [Integration Guide](/broking-kyc/vendors/depositories/cdsl-integration-guide/) — UAT environments and SEBI circulars

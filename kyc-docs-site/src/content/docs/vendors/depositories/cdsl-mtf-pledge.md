---
title: CDSL MTF & Pledge Operations
description: Margin pledge, re-pledge, MTF funding, eLAS, pledge invocation, automated pledge release, CUSPA accounts, and pledge file formats.
---

In India's securities market, when a client wants to use their existing shares as collateral for trading, they do not hand over the shares to their broker. Instead, a "pledge" is created — a lien recorded in the depository system that says "these shares belong to the client, but the broker has a claim on them for margin purposes." This mechanism, introduced by SEBI (Securities and Exchange Board of India) in 2020, replaced the older and riskier practice of physically transferring shares to the broker's account. As an engineer building or maintaining a broking platform, you will implement pledge creation, re-pledge to clearing corporations, unpledge flows, and the newer automated pledge mechanisms. This page covers the full lifecycle of pledge operations in CDSL (Central Depository Services Limited), including MTF (Margin Trading Facility) pledges, eLAS (Electronic Loan Against Shares), and the tag-based file formats you will work with.

> Back to [CDSL Overview](/broking-kyc/vendors/depositories/cdsl/)

---

Pledging shares for margin is like using your house as collateral for a loan — the house stays in your name, you continue living in it and receiving mail there, but the bank has a lien on it. If you fail to repay the loan, the bank can seize it. Similarly, pledged shares remain in the client's demat account (they continue receiving dividends and corporate action benefits), but if the client fails to meet margin obligations, the broker can invoke the pledge and take the shares.

Before diving into the technical flows, it is important to understand the regulatory circulars that define this framework. These circulars are not just background reading — they dictate the exact file formats, timelines, and validation rules your system must implement.

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

Now that you know the regulatory basis, the next step is understanding the architecture — who are the parties involved, where do the shares actually sit, and how does the lien flow from client to broker to clearing corporation? The diagram below is the single most important mental model for pledge operations.

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

In plain English: the diagram above shows a two-hop chain. The client pledges to the broker's CUSPA (Client Securities Margin Pledge Account), and the broker then re-pledges to the CC (Clearing Corporation). The CC is the one that actually grants margin credit. Your system needs to manage both hops.

:::note[Why two hops?]
You might wonder why the client does not pledge directly to the clearing corporation. The answer is that the broker is the intermediary — the CC (Clearing Corporation) only deals with its clearing members (the broker), not with individual clients. The broker aggregates margin from multiple clients and presents it to the CC. This two-hop design also lets the broker track which client's securities back which margin obligation.
:::

---

CDSL supports three distinct types of pledges, each serving a different business purpose. Understanding the differences is critical because they use different account types and have different authentication requirements.

## 3. Three Types of Pledges in CDSL

| Pledge Type | Purpose | Pledgor --> Pledgee | OTP Required |
|-------------|---------|---------------------|--------------|
| **Normal Pledge** | Loan Against Shares (eLAS) | Client --> NBFC/Bank | Yes (TPIN+OTP) |
| **Margin Pledge** | Margin collateral for trading | Client --> TM/CM CUSPA | Yes (TPIN+OTP) or DDPI (Demat Debit and Pledge Instruction) |
| **MTF Pledge** | Margin Trading Facility funding | Client --> TM/CM Funding Account | Yes (TPIN+OTP) or DDPI |

:::tip[DDPI changes the client experience]
For margin and MTF pledges, if the client has activated DDPI, the pledge happens automatically without any action from the client. Without DDPI, the client receives an SMS/email link from CDSL and must enter their TPIN (Transaction PIN) and OTP (One-Time Password) to authorize each pledge. This is why DDPI activation during onboarding directly impacts the pledge flow's user experience.
:::

---

The margin pledge is the most common pledge type you will implement. The following section walks through the complete lifecycle — from the client selecting shares to pledge, all the way through to the clearing corporation granting margin credit. Pay close attention to the authentication step (Step 4), as this is where DDPI vs non-DDPI clients diverge.

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

:::caution
The OTP in Step 4 is valid for only 20 minutes. If the client does not act within this window, the pledge request expires and must be re-initiated. For non-DDPI clients, you should build retry logic and clear notifications to minimize failed pledge attempts.
:::

### 4.2 Broker-to-CC Re-pledge

```
Step 7: Broker re-pledges client securities to Clearing Corporation
   - Transaction Type: Margin Re-pledge
   - Pledgor: Broker's CUSPA
   - Pledgee: Clearing Corporation (NSCCL/ICCL/MCXCCL)
   - ISIN (International Securities Identification Number) + Quantity
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
   - Client's securities become "free" in BO (Beneficiary Owner) account
   - Available for sale or other transactions
   |
Timeline: Unpledge typically completes within few hours (same day)
```

In plain English: unpledging works in reverse order. If the shares were re-pledged to the CC, the broker must first release the re-pledge from the CC, and only then release the pledge from the client. Think of it as unstacking — you remove the top layer first.

---

MTF is a fundamentally different use case from regular margin pledge, even though it uses similar depository mechanics. In regular margin pledge, the client already owns the shares and is pledging them as collateral. In MTF, the broker is funding the client's purchase — the broker lends money, the client buys shares with that money, and then pledges those newly purchased shares back to the broker as security for the loan.

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

:::caution[The T+3 deadline is hard]
If a client buys shares on MTF and does not accept the pledge by T+3 at 5:00 PM, the broker is required by SEBI to square off the position on T+4. This is not optional — it is a regulatory mandate. Your system must track pending MTF pledge acceptances and trigger alerts well before the deadline. Build escalation notifications at T+1, T+2, and T+3 morning to give the client every opportunity to accept.
:::

---

Having understood the business flows, it is time to look at the file format used to submit pledge transactions to CDSL. Unlike the BO (Beneficiary Owner) Setup files which use a fixed-length positional format, pledge transactions use a tag-based XML-like format. This section is your reference for building the file generation logic.

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

In plain English: the `<MrgPldgTp>` tag is how CDSL distinguishes between a regular margin pledge (`MP`), a re-pledge from broker to clearing corporation (`MRP`), and an MTF pledge (`MFP`). Getting this tag wrong will cause your transaction to be rejected or, worse, processed against the wrong account type.

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

:::tip[Partial unpledge requires the Pledge Sequence Number]
Notice that the unpledge file includes `<Psn>` (Pledge Sequence Number) — this is the CDSL-assigned identifier from the original pledge. Your system must store this number when the pledge is created, because you cannot unpledge without referencing it. Also note the `<Prtqty>` tag for partial unpledge: the client pledged 100 shares but is unpledging only 50.
:::

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

Invocation — also called confiscation — is the most severe action in the pledge lifecycle. It is the point at which the broker actually seizes the client's shares. Because of its gravity, it is tightly regulated and cannot be reversed. The next section covers the rules and process.

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

:::caution
Invocation is irreversible. Once CDSL processes a confiscation instruction, the shares are transferred out of the client's account permanently. There is no undo. Your system should require explicit confirmation (ideally multi-level approval) before submitting an invocation instruction, and maintain a complete audit trail for regulatory review.
:::

---

Until mid-2025, selling pledged shares required a manual multi-step process: the client had to unpledge, wait for the unpledge to complete, and then sell. This created operational risk and frequent short deliveries. SEBI addressed this with an automated mechanism that combines pledge release with settlement in a single instruction. This is one of the most significant recent changes to the pledge framework.

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

:::tip[PR-EP simplifies your settlement flow]
Before PR-EP, your system had to orchestrate a multi-step dance: check if shares are pledged, trigger unpledge, wait for unpledge confirmation, then proceed with settlement delivery. With PR-EP, a single automated instruction handles both the pledge release and the early pay-in block. This significantly reduces short delivery risk and simplifies your settlement logic. If you are building a new system, design for PR-EP from the start.
:::

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

For day-to-day integration work, you will interact with CDSL's pledge operations through a set of APIs. The table below summarizes the key endpoints. All pledge APIs require authentication via API Key and DSC (Digital Signature Certificate).

## 9. Pledge APIs Summary

| API | Endpoint | Purpose | Auth |
|-----|----------|---------|------|
| **e-Margin Pledge** | `api.cdslindia.com/APIServices` | Create margin pledge from BO to TM (Trading Member)/CM (Clearing Member) | API Key + DSC |
| **Margin Repledge** | `api.cdslindia.com/APIServices` | Re-pledge from TM/CM to CC | API Key + DSC |
| **eLAS** | `api.cdslindia.com/APIServices` | Loan Against Shares pledge | API Key + DSC |
| **Transaction Upload** | `api.cdslindia.com/APIServices` | Batch pledge/unpledge via file upload | API Key + DSC |
| **Pledge Query** | `api.cdslindia.com/APIServices` | Query pledge status by BO/ISIN | API Key |

:::note
All pledge APIs share the same base URL (`api.cdslindia.com/APIServices`) and are differentiated by request parameters. The DSC (Digital Signature Certificate) must be a Class 3 certificate on a hardware USB token — software certificates are not accepted. See the [Integration Guide](/broking-kyc/vendors/depositories/cdsl-integration-guide/) for DSC procurement and mapping details.
:::

---

When a client pledges shares worth Rs. 1 lakh, the clearing corporation does not grant Rs. 1 lakh of margin credit. It applies a "haircut" — a percentage deduction that accounts for the risk that the share price might drop. The haircut varies by how liquid and stable the security is. Understanding these haircuts is important for building accurate margin calculators in your trading platform.

## 10. Margin Pledge Haircut Framework

When securities are pledged as margin, the Clearing Corporation applies a haircut:

| Security Category | Typical Haircut | Margin Benefit (on Rs. 1 lakh pledged) |
|-------------------|-----------------|----------------------------------------|
| Group I (Large Cap, liquid) | VaR (8-15%) + ELM (3.5%) | Rs. 81,500 - Rs. 88,500 |
| Group II (Mid Cap) | VaR (15-30%) + ELM (5%) | Rs. 65,000 - Rs. 80,000 |
| Group III (Small Cap) | VaR (30-50%) + ELM (5%) | Rs. 45,000 - Rs. 65,000 |
| ETFs / Liquid Bees | 5-10% | Rs. 90,000 - Rs. 95,000 |
| Sovereign Gold Bonds | 10-15% | Rs. 85,000 - Rs. 90,000 |

In plain English: VaR (Value at Risk) measures how much a security's price might drop in a worst-case scenario, and ELM (Extreme Loss Margin) is an additional buffer. A Group I large-cap stock with a combined haircut of 15% means that pledging Rs. 1 lakh of that stock gives you only Rs. 85,000 of margin credit.

:::note
Actual haircuts are published daily by Clearing Corporations (NSCCL/ICCL). These are indicative ranges.
:::

---

The broker needs a special demat account to receive pledge liens from clients. This is the CUSPA — a mandatory account that SEBI requires every trading member to maintain. It is separate from the broker's own proprietary demat account, creating a clear wall between client assets and the broker's own assets.

## 11. Client Securities Margin Pledge Account (CUSPA)

| Aspect | Details |
|--------|---------|
| **Sub-Status Code** | 40 (Client Securities Margin Pledge Account) |
| **Who Opens** | Broker (TM/CM) opens with CDSL |
| **Tag** | "TMCM - Client Securities Margin Pledge Account" |
| **Purpose** | Holds pledge liens from clients who have given DDPI/POA (Power of Attorney) |
| **AMC** | Rs. 500/year (charged by CDSL to DP (Depository Participant)) |
| **Separate from** | Broker's proprietary account (sub-status 30/31/32) |
| **Visibility** | Client can see pledge status via easi/EASIEST/myEasi |
| **SEBI Mandate** | Every TM/CM must open CUSPA for collecting client securities as margin |

:::tip[Sub-status code 40 is your identifier]
When querying CDSL for account details, the sub-status code 40 is how you identify a CUSPA. Your broker's proprietary accounts will have sub-status codes 30, 31, or 32. Never confuse the two — pledging client shares into the broker's proprietary account instead of CUSPA is a serious regulatory violation.
:::

---

MTF pledges flow into a different account from regular margin pledges. SEBI requires this separation so that funded stock (MTF) can be tracked independently from margin collateral. This is another account your brokerage must open with CDSL before offering MTF services.

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

Finally, a quick reference on what pledge operations cost. These charges flow through to the client in various ways, and your billing system needs to account for them. The CDSL charge is per-transaction, while the DP (Depository Participant) charge to the client varies by brokerage.

## 13. Pledge Cost Structure

| Operation | CDSL Charge | Typical DP Charge to Client |
|-----------|------------|---------------------------|
| Margin Pledge (create) | Part of Rs. 3.50/debit txn | Rs. 25-30 per ISIN + GST |
| Unpledge | No separate charge | Free or Rs. 10-15 |
| Re-pledge (TM to CC) | Part of Rs. 3.50/debit txn | Not charged to client |
| Invocation | Part of Rs. 3.50/debit txn | Penalty charges to client |

:::note
The Rs. 3.50 per debit transaction is CDSL's consolidated charge that covers multiple transaction types. Pledges, re-pledges, and invocations all fall under this umbrella. Your finance team will reconcile these charges in the monthly CDSL invoice.
:::

---

## Related Pages

- [CDSL Overview](/broking-kyc/vendors/depositories/cdsl/) — Core BO integration spec
- [DDPI Deep Dive](/broking-kyc/vendors/depositories/cdsl-ddpi/) — DDPI authorization that enables automatic pledge
- [BO Modifications](/broking-kyc/vendors/depositories/cdsl-modifications/) — Modifying pledge-related account details
- [Integration Guide](/broking-kyc/vendors/depositories/cdsl-integration-guide/) — UAT environments and SEBI circulars

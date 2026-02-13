---
title: 6-Attribute Matching
description: The 6 fields that must match everywhere — Name, PAN, Address, Mobile, Email, and Income Range across KRA, exchanges, and depositories.
---

In the Indian securities market, a customer's identity is not stored in one place — it is spread across their KRA (KYC Registration Agency) record, their exchange UCC (Unique Client Code), and their depository BO (Beneficial Owner) account. SEBI (Securities and Exchange Board of India) mandates that six specific data fields must be identical across all three of these systems. The 6-attribute match is like a three-way handshake — KRA, exchange, and depository must all agree on the same name, PAN (Permanent Account Number), address, mobile number, email address, and income range. If even one of these six fields is inconsistent, settlements can be blocked and accounts can be frozen. This page explains what the six attributes are, why they matter, and what happens when they do not match.

:::danger
**Critical SEBI Mandate:** Six KYC (Know Your Customer) attributes must be consistent across KRA records, Exchange UCC, and Depository BO accounts. PAN is the primary linkage key. Mismatches block settlement and can freeze accounts.
:::

Understanding these six attributes is foundational to everything else in the KYC pipeline. Every screen in the user journey, every validation rule in the admin workflow, and every batch submission to an exchange or depository ultimately serves one purpose: ensuring these six fields are correct and consistent.

## The 6 Mandatory KYC Attributes

| # | Attribute | Verification Source | SEBI Requirement |
|---|-----------|-------------------|------------------|
| 1 | **Name** | PAN card (NSDL/Protean) | Must match as per PAN records across KRA, exchange UCC, and demat account |
| 2 | **PAN** | Income Tax Dept (via Protean) | Primary key. PAN-Aadhaar linkage mandatory. BSE (Bombay Stock Exchange) requires 3-param verification. |
| 3 | **Address** | Aadhaar / DigiLocker | Correspondence address must be consistent. Permanent address from Aadhaar. |
| 4 | **Mobile** | OTP verification | KRA verifies against official databases. Must be unique per client. |
| 5 | **Email** | OTP verification | KRA verifies email. Contract notes and statements sent here. |
| 6 | **Income Range** | Client declaration / AA (Account Aggregator) / bank statement | Required for demat account opening (effective Aug 2021). |

In plain English: think of these six fields as the "signature" of a customer's identity in the securities ecosystem. The name and PAN come from the Income Tax Department, the address comes from Aadhaar, the mobile and email are verified via OTP (One-Time Password), and the income range is either declared by the customer or verified through bank statements. All six must tell the same story across every system that holds the customer's data.

:::note[Why PAN Is the Master Key]
PAN is the only attribute that is machine-verifiable against a government database in real time. That is why it serves as the primary linkage key — when an exchange sends daily UCC data to a depository, it is the PAN that the depository uses to map the trading account to the demat account.
:::

Now that you know what the six attributes are, let us look at the SEBI circulars that established these requirements.

## Key Regulatory References

| Circular | Date | Subject |
|----------|------|---------|
| SEBI/HO/MIRSD/DOP/CIR/P/2019/136 | Nov 2019 | Mapping of UCC with Demat Account based on PAN |
| SEBI/HO/MIRSD/FATF/P/CIR/2023/0144 | 2023 | KRA attribute verification against official databases |
| SEBI/HO/MIRSD/SECFATF/P/CIR/2024/41 | May 2024 | Review of KYC validation at KRAs |
| SEBI/HO/MIRSD/MIRSD-PoD-1/P/CIR/2023/37 | Mar 2023 | KYC attribute requirements for depository accounts |

The November 2019 circular is particularly important because it established the mechanism by which exchanges and depositories share data daily to keep UCC-demat mappings in sync.

## UCC-Demat Mapping Mechanism

This is the technical plumbing that makes the 6-attribute match enforceable. Every day, exchanges send a file to depositories containing the PAN, segment, trading member/clearing member IDs, and UCC allotment details of all newly registered clients. The depository then uses the PAN to map each trading account to its corresponding demat account. If the PAN does not match, or if a customer has multiple UCCs, the mapping logic must handle all of them holder-wise.

```
SEBI CIRCULAR (Nov 2019): UCC ↔ Demat Mapping

Exchange (NSE/BSE/MCX)          Depository (CDSL/NSDL)
       │                                │
       │  Daily UCC data file           │
       │  (PAN, Segment, TM/CM,        │
       │   UCC allotted)               │
       │─────────────────────────────▸  │
       │                                │ Maps UCC to BO account
       │                                │ based on PAN
       │                                │
       ▼                                ▼
   ┌──────────┐  PAN = Primary Key  ┌──────────┐
   │ Trading  │◄────────────────────│  Demat   │
   │ Account  │   Must match:       │  Account │
   │ (UCC)    │   PAN, Name, DOB    │  (BO ID) │
   └──────────┘                     └──────────┘

• One-time bulk mapping done by Nov 30, 2019
• Incremental (new UCCs) shared DAILY thereafter
• Multiple UCCs for single PAN: all mapped holder-wise
```

In plain English: every day, the exchange tells the depository "here are today's new trading accounts and their PANs." The depository looks up those PANs in its records and links each trading account to the corresponding demat account. If the PAN or name does not match, the link fails, and that customer cannot settle trades.

:::tip[Why One Customer Might Have Multiple UCCs]
A customer may trade on multiple exchanges (NSE, BSE, MCX) and through multiple brokers, each of which gives them a separate UCC. All of these UCCs are mapped to the same demat account using PAN as the common key. The daily file ensures that new UCCs are linked immediately.
:::

Knowing what happens when attributes match is useful, but knowing what happens when they do not match is critical.

## What Happens When Attributes Don't Match

| Mismatch Type | Impact | Resolution |
|---------------|--------|------------|
| PAN mismatch (trading vs demat) | **Settlement blocked** | Cannot debit/credit securities. Client must correct PAN. |
| Name spelling difference | UCC rejection / KRA hold | Normalize to PAN name. BSE: only via Unfreeze request. |
| Mobile/Email not verified at KRA | KYC not portable | Client verifies via M-Aadhaar or KRA portal OTP. |
| PAN-Aadhaar not linked | Account may freeze | Client links at incometax.gov.in. |
| Income range missing | Demat opening blocked | Client must declare income range. |
| Address inconsistency | KRA hold possible | Update via KRA modify or CKYC (Central KYC) update. |

:::caution[Settlement Blocked Is the Worst Outcome]
When PAN does not match between the trading account and the demat account, the customer literally cannot buy or sell securities — the settlement system cannot debit shares from a demat account that does not match the trading account's PAN. This is the most severe consequence of a 6-attribute mismatch and requires immediate client intervention to resolve.
:::

In plain English: a PAN mismatch is the most dangerous error because it blocks settlements entirely. Name mismatches and missing income ranges are more common but less severe — they typically result in holds or rejections that can be corrected through administrative processes.

The 6-attribute requirements also interact directly with segment activation, because different trading segments have different income verification thresholds.

## Segment Activation Requirements

| Segment | Income Proof | Min Income | Additional Requirements |
|---------|-------------|-----------|----------------------|
| **Equity Cash (CM)** | No | None | Basic KYC sufficient. Default segment. |
| **Equity F&O** | **Yes** | Broker-specific (Rs.1-5L) | Trading experience declaration. Bank statement showing Rs.10K credit. |
| **Currency Derivatives** | No | None | No additional income proof. |
| **Commodity (MCX)** | **Yes** | Broker-specific | MCX (Multi Commodity Exchange) registration. Client category: Hedger/Speculator/Arbitrageur. |
| **Debt / Bond** | No | None | Mostly available with equity segment. |

In plain English: equity cash trading is the easiest segment to activate — just basic KYC is sufficient. F&O (Futures and Options) and commodity trading require income proof, which is why the "Income Range" attribute (the sixth of our six attributes) becomes especially important for customers who want to trade derivatives.

:::caution[Income Proof Documents Accepted]
**Income Proof Documents Accepted:** Bank statement (6 months, Rs.10K+ credit), ITR acknowledgement, Form 16, salary slip (3 months), net worth certificate (CA-certified), FD receipt. Alternatively: **Account Aggregator consent-based fetch** eliminates manual upload entirely.
:::

:::tip[Account Aggregator for Income Verification]
If your system supports AA integration, the income verification step becomes seamless — the customer simply gives consent on their AA app, and their bank statement data flows directly to your system without any document uploads. This is the recommended approach for F&O segment activation, as covered in the [Account Aggregator Framework](/broking-kyc/vendors/account-aggregator) page.
:::

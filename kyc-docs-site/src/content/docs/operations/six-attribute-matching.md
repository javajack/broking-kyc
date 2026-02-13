---
title: 6-Attribute Matching
description: The 6 fields that must match everywhere — Name, PAN, Address, Mobile, Email, and Income Range across KRA, exchanges, and depositories.
---

The 6 fields that must match everywhere — Name, PAN, Address, Mobile, Email, and Income Range must be consistent across KRA records, Exchange UCC, and Depository BO accounts. Mismatches block settlement and can freeze accounts.

:::danger
**Critical SEBI Mandate:** Six KYC attributes must be consistent across KRA records, Exchange UCC, and Depository BO accounts. PAN is the primary linkage key. Mismatches block settlement and can freeze accounts.
:::

## The 6 Mandatory KYC Attributes

| # | Attribute | Verification Source | SEBI Requirement |
|---|-----------|-------------------|------------------|
| 1 | **Name** | PAN card (NSDL/Protean) | Must match as per PAN records across KRA, exchange UCC, and demat account |
| 2 | **PAN** | Income Tax Dept (via Protean) | Primary key. PAN-Aadhaar linkage mandatory. BSE requires 3-param verification. |
| 3 | **Address** | Aadhaar / DigiLocker | Correspondence address must be consistent. Permanent address from Aadhaar. |
| 4 | **Mobile** | OTP verification | KRA verifies against official databases. Must be unique per client. |
| 5 | **Email** | OTP verification | KRA verifies email. Contract notes and statements sent here. |
| 6 | **Income Range** | Client declaration / AA / bank statement | Required for demat account opening (effective Aug 2021). |

## Key Regulatory References

| Circular | Date | Subject |
|----------|------|---------|
| SEBI/HO/MIRSD/DOP/CIR/P/2019/136 | Nov 2019 | Mapping of UCC with Demat Account based on PAN |
| SEBI/HO/MIRSD/FATF/P/CIR/2023/0144 | 2023 | KRA attribute verification against official databases |
| SEBI/HO/MIRSD/SECFATF/P/CIR/2024/41 | May 2024 | Review of KYC validation at KRAs |
| SEBI/HO/MIRSD/MIRSD-PoD-1/P/CIR/2023/37 | Mar 2023 | KYC attribute requirements for depository accounts |

## UCC-Demat Mapping Mechanism

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

## What Happens When Attributes Don't Match

| Mismatch Type | Impact | Resolution |
|---------------|--------|------------|
| PAN mismatch (trading vs demat) | **Settlement blocked** | Cannot debit/credit securities. Client must correct PAN. |
| Name spelling difference | UCC rejection / KRA hold | Normalize to PAN name. BSE: only via Unfreeze request. |
| Mobile/Email not verified at KRA | KYC not portable | Client verifies via M-Aadhaar or KRA portal OTP. |
| PAN-Aadhaar not linked | Account may freeze | Client links at incometax.gov.in. |
| Income range missing | Demat opening blocked | Client must declare income range. |
| Address inconsistency | KRA hold possible | Update via KRA modify or CKYC update. |

## Segment Activation Requirements

| Segment | Income Proof | Min Income | Additional Requirements |
|---------|-------------|-----------|----------------------|
| **Equity Cash (CM)** | No | None | Basic KYC sufficient. Default segment. |
| **Equity F&O** | **Yes** | Broker-specific (Rs.1-5L) | Trading experience declaration. Bank statement showing Rs.10K credit. |
| **Currency Derivatives** | No | None | No additional income proof. |
| **Commodity (MCX)** | **Yes** | Broker-specific | MCX registration. Client category: Hedger/Speculator/Arbitrageur. |
| **Debt / Bond** | No | None | Mostly available with equity segment. |

:::caution
**Income Proof Documents Accepted:** Bank statement (6 months, Rs.10K+ credit), ITR acknowledgement, Form 16, salary slip (3 months), net worth certificate (CA-certified), FD receipt. Alternatively: **Account Aggregator consent-based fetch** eliminates manual upload entirely.
:::

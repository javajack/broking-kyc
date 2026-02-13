---
title: Setu Deep Dive
description: Deep dive into Setu's unified KYC platform — acquired by Pine Labs, can consolidate Aadhaar, PAN, bank verification, DigiLocker, and eSign into a single vendor.
---

Setu is one of the most interesting vendors in the Indian fintech infrastructure space, and understanding what it offers — and what it does not — is important for anyone building a KYC (Know Your Customer) onboarding system. Setu provides a unified API (Application Programming Interface) platform that covers Aadhaar e-KYC (electronic Know Your Customer), PAN (Permanent Account Number) verification, bank account validation, DigiLocker integration, eSign, and Account Aggregator services — all through a single set of APIs. For a stock broking firm, this means the potential to replace three or four separate vendor integrations with one contract and one integration. This page examines Setu's full product suite, compares each product against our current vendor stack, and helps you decide where Setu adds real value.

:::note[Why Setu Matters]
Setu was acquired by Pine Labs for $70-75M in 2024 and nearly doubled its revenue to INR 35.2 crore in FY24. It pioneered the Reverse Penny Drop concept (where the customer pays Rs.1 via UPI instead of the broker depositing Rs.1 via IMPS) and is the market leader in India's AA (Account Aggregator) ecosystem. If you are evaluating vendor consolidation, Setu is the first vendor to assess.
:::

Think of Setu as the "Swiss Army knife" of Indian identity and payment verification APIs — it does many things well, but there are specialized tools (like HyperVerge for face matching or TrackWizz for AML) that are better at specific tasks. The strategic question is: which functions should you consolidate into Setu, and which are better served by dedicated vendors?

Let us start with what Setu actually offers.

## Product Suite

| Product | What It Does | Unique Feature | Pricing |
|---------|-------------|----------------|---------|
| **eKYC Setu (NPCI)** | Aadhaar e-KYC without AUA/KUA license | No licensing burden. Smart routing across supply partners | Contact |
| **OKYC (Offline Aadhaar)** | OTP-based Aadhaar XML fetch | Aadhaar Redundancy API: auto-failover between 2 suppliers | Contact |
| **DigiLocker Gateway** | Fetch 70+ document types via OAuth consent | Combined with OKYC for redundancy | Contact |
| **PAN Verification** | Direct NSDL connection (name, category, Aadhaar seeding) | Returns aadhaar_seeding_status | Rs.3/txn |
| **Reverse Penny Drop** | Customer pays Rs.1 via UPI; extracts account, name, IFSC (Indian Financial System Code) | Industry pioneer. Data cannot be spoofed. Rs.1 refunded in 48h | Contact |
| **Penny Drop (IMPS)** | Deposits Rs.1 via IMPS; sync + async modes | Truncated account holder name in response | Contact |
| **PennyLess** | Zero-balance account verification | Combined endpoint with Penny Drop | Contact |
| **eSign** | Aadhaar OTP e-signatures; up to 25 signers/doc | eStamp on-the-fly (state-specific stamp duty) | Contact |
| **Account Aggregator** | India's first AA gateway. Consent-based financial data sharing | Market leader. 5M daily requests. Multi-consent merge | Rs.5-25/fetch |

In plain English: Setu's product line spans the full identity verification and bank verification spectrum. The eKYC Setu product is notable because it lets you perform Aadhaar-based e-KYC without obtaining your own AUA (Authentication User Agency) or KUA (KYC User Agency) license from UIDAI — a significant regulatory and operational simplification. The Reverse Penny Drop is unique because it is spoof-proof: since the customer initiates the UPI payment, the bank account details come directly from the UPI system rather than from user input.

:::tip[Reverse Penny Drop vs Traditional Penny Drop]
In a traditional Penny Drop, the broker deposits Rs.1 into the customer's account and reads back the account holder's name from the IMPS response. The problem is that the customer provides their own account number and IFSC, which could be incorrect or fabricated. In a Reverse Penny Drop, the customer pays Rs.1 to the broker via UPI, and the system extracts the account number, holder name, and IFSC from the UPI transaction itself. The data comes from the customer's bank, not from the customer's input, which is why it cannot be spoofed.
:::

Now let us compare each Setu product against the equivalent vendor in our current stack.

## Setu vs Current Stack

| Function | Setu | Current Stack | Winner |
|----------|------|--------------|--------|
| Aadhaar eKYC | eKYC Setu (no AUA/KUA license) | Digio/Decentro | Setu (no licensing) |
| DigiLocker | Unified platform | Digio (deeper orchestration) | Tie |
| PAN Verify | Same quality, unified billing | Decentro | Tie |
| Bank Verify | Reverse Penny Drop (pioneer, spoof-proof) | Decentro Penny Drop | Setu |
| eSign | Integrated eStamp | Digio (deeper doc workflow) | Tie |
| CKYC (Central KYC) | **Not offered** | Decentro | Decentro |
| Video KYC | **Not offered** | HyperVerge | HyperVerge |
| Face Match/Liveness | **Not offered** | HyperVerge | HyperVerge |
| OCR (Optical Character Recognition) | **Not offered** | HyperVerge | HyperVerge |
| Income (AA) | Market leader | Perfios ITR | Complementary |

In plain English: Setu wins clearly on two fronts — Aadhaar eKYC (because it removes the licensing burden) and bank verification (because the Reverse Penny Drop is more secure). For DigiLocker, PAN, and eSign, Setu is comparable to the current stack but not clearly better. For CKYC, Video KYC, face matching, and OCR, Setu simply does not offer these capabilities, so you will still need other vendors for those functions.

:::caution[Setu Does Not Cover CKYC, Video KYC, or Face Matching]
This is the most important limitation to understand. Even if you consolidate identity and bank verification into Setu, you will still need HyperVerge (or Signzy) for face matching, liveness detection, OCR, and VIPV (Video In-Person Verification), and TrackWizz (or Decentro) for CKYC search and upload. Setu is a powerful consolidation play, but it does not eliminate the need for specialized vendors in these critical areas.
:::

Given the comparison above, here is the strategic decision framework.

## Decision Point

Setu can consolidate 5 vendor functions into 1 for identity + bank + eSign. But still need:
- **HyperVerge** for face match, video KYC, OCR
- **TrackWizz** for CKYC/AML (Anti-Money Laundering)
- **Digio** for KRA (KYC Registration Agency)

Net reduction: 2-3 fewer vendor contracts with Setu consolidation.

In plain English: adopting Setu replaces three separate vendor integrations (Aadhaar eKYC, bank verification, and potentially eSign) with a single Setu integration, while keeping HyperVerge, TrackWizz, and Digio for capabilities that Setu does not offer. The net benefit is fewer contracts to manage, unified billing, and the Reverse Penny Drop security advantage.

## Key Facts

- **Acquired by Pine Labs** ($70-75M, 2024)
- **Revenue**: INR 35.2 crore in FY24 (nearly doubled)
- **Reverse Penny Drop**: Pioneered the concept; Kissht reported 5x conversion uplift
- **Account Aggregator**: India's first AA gateway, market leader
- **Gaps**: No CKYC, no Video KYC, no OCR, no Face Match

:::tip[When to Choose Setu Over Decentro]
If your primary concern is reducing vendor count and you value the Reverse Penny Drop's security advantage, start with Setu for identity and bank verification. If your primary concern is CKYC integration (which is mandatory for all new accounts since August 2024), Decentro remains essential because Setu does not offer CKYC. In practice, many brokers use both — Setu for identity/bank/AA and Decentro for CKYC.
:::

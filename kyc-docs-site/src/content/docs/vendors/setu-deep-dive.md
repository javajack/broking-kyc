---
title: Setu Deep Dive
description: Deep dive into Setu's unified KYC platform — acquired by Pine Labs, can consolidate Aadhaar, PAN, bank verification, DigiLocker, and eSign into a single vendor.
---

Deep dive into Setu's unified KYC platform — acquired by Pine Labs for $70-75M, Setu can consolidate Aadhaar, PAN, bank verification, DigiLocker, and eSign into a single vendor. Revenue nearly doubled to INR 35.2 crore in FY24.

## Product Suite

| Product | What It Does | Unique Feature | Pricing |
|---------|-------------|----------------|---------|
| **eKYC Setu (NPCI)** | Aadhaar e-KYC without AUA/KUA license | No licensing burden. Smart routing across supply partners | Contact |
| **OKYC (Offline Aadhaar)** | OTP-based Aadhaar XML fetch | Aadhaar Redundancy API: auto-failover between 2 suppliers | Contact |
| **DigiLocker Gateway** | Fetch 70+ document types via OAuth consent | Combined with OKYC for redundancy | Contact |
| **PAN Verification** | Direct NSDL connection (name, category, Aadhaar seeding) | Returns aadhaar_seeding_status | Rs.3/txn |
| **Reverse Penny Drop** | Customer pays Rs.1 via UPI; extracts account, name, IFSC | Industry pioneer. Data cannot be spoofed. Rs.1 refunded in 48h | Contact |
| **Penny Drop (IMPS)** | Deposits Rs.1 via IMPS; sync + async modes | Truncated account holder name in response | Contact |
| **PennyLess** | Zero-balance account verification | Combined endpoint with Penny Drop | Contact |
| **eSign** | Aadhaar OTP e-signatures; up to 25 signers/doc | eStamp on-the-fly (state-specific stamp duty) | Contact |
| **Account Aggregator** | India's first AA gateway. Consent-based financial data sharing | Market leader. 5M daily requests. Multi-consent merge | Rs.5-25/fetch |

## Setu vs Current Stack

| Function | Setu | Current Stack | Winner |
|----------|------|--------------|--------|
| Aadhaar eKYC | eKYC Setu (no AUA/KUA license) | Digio/Decentro | Setu (no licensing) |
| DigiLocker | Unified platform | Digio (deeper orchestration) | Tie |
| PAN Verify | Same quality, unified billing | Decentro | Tie |
| Bank Verify | Reverse Penny Drop (pioneer, spoof-proof) | Decentro Penny Drop | Setu |
| eSign | Integrated eStamp | Digio (deeper doc workflow) | Tie |
| CKYC | **Not offered** | Decentro | Decentro |
| Video KYC | **Not offered** | HyperVerge | HyperVerge |
| Face Match/Liveness | **Not offered** | HyperVerge | HyperVerge |
| OCR | **Not offered** | HyperVerge | HyperVerge |
| Income (AA) | Market leader | Perfios ITR | Complementary |

## Decision Point

Setu can consolidate 5 vendor functions into 1 for identity + bank + eSign. But still need:
- **HyperVerge** for face match, video KYC, OCR
- **TrackWizz** for CKYC/AML
- **Digio** for KRA

Net reduction: 2-3 fewer vendor contracts with Setu consolidation.

## Key Facts

- **Acquired by Pine Labs** ($70-75M, 2024)
- **Revenue**: INR 35.2 crore in FY24 (nearly doubled)
- **Reverse Penny Drop**: Pioneered the concept; Kissht reported 5x conversion uplift
- **Account Aggregator**: India's first AA gateway, market leader
- **Gaps**: No CKYC, no Video KYC, no OCR, no Face Match

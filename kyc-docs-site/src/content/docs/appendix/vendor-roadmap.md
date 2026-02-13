---
title: Vendor Roadmap
description: Vendors not yet fully specified — Income/ITR (Perfios), Back-Office/RMS (ODIN), Communications (SMS/Email), Credit Bureau (CIBIL).
---

Vendors not yet fully specified in the current phase. These integrations are planned for future phases or are supplementary to the core KYC onboarding flow.

## V11: Income / ITR Verification

| Vendor | Product | Use Case | Integration |
|--------|---------|----------|-------------|
| **Perfios** | ITR Analyser | Detailed income analysis from ITR XML/PDF | REST API, 4000+ bank statement formats |
| **Finbox** | Bank Statement Analysis | Income extraction from bank statements | API + SDK |
| **Tartan** | Payroll/HRMS Verification | Real-time income from employer HRMS | 30+ HRMS integrations |

**Status**: Required for F&O/Commodity segment activation. Can be partially replaced by [Account Aggregator](/broking-kyc/vendors/account-aggregator) for bank statement-based income proof.

## V14: Back-Office / RMS

| Vendor | Product | Market Share | Key Features |
|--------|---------|-------------|-------------|
| **63 Moons** (Recommended) | ODIN | 70-80% | Multi-exchange (NSE/BSE/MCX). Front + Mid + Back + RMS. 1M+ licensees. |
| Symphony Fintech | XTS | Growing | OMS + RMS + Compliance. XTS OTIS. |
| TCS | BaNCS | ~30% volume | Integrated trading, clearing, surveillance. |
| OmneNEST | OmneNEST | 200+ brokers | Powers Zerodha Kite, Upstox, Finvasia. |

**Status**: Back-office integration is post-onboarding. Client master record sync happens after checker approval. Critical for trading activation.

## V15: Communications

| Channel | Vendor | Key Features | Regulatory |
|---------|--------|-------------|-----------|
| SMS (Recommended) | **Kaleyra / MSG91** | DLT registered. Pre-approved templates. OTP, trade confirmations. | TRAI DLT mandate |
| Email (Recommended) | **AWS SES / SendGrid** | SPF, DKIM, DMARC. Digitally signed contract notes. | IT Act 2000 |
| WhatsApp | Gupshup / Infobip / Kaleyra | OTP delivery, trade confirmations (supplementary). | Cannot replace email per SEBI |
| Push | Firebase / OneSignal | Mobile app notifications. Real-time alerts. | Supplementary only |

**Status**: Required for OTP delivery (SMS/WhatsApp), welcome kits (Email), and ongoing notifications. DLT registration mandatory for SMS.

## V16: Credit Bureau (Optional)

| Vendor | Product | Use Case |
|--------|---------|----------|
| **CIBIL** (TransUnion) | Credit Score + Report | Optional credit check during onboarding |
| **Experian** | Credit Score + Report | Alternative to CIBIL |
| **CRIF High Mark** | Credit Score | Covers microfinance segment |
| **Equifax** | Credit Score | Additional coverage |

**Status**: Credit bureau integration is optional for stock broking KYC. May be useful for margin funding eligibility assessment or loan against securities products.

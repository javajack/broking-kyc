---
title: Vendor Roadmap
description: Vendors not yet fully specified — Income/ITR (Perfios), Back-Office/RMS (ODIN), Communications (SMS/Email), Credit Bureau (CIBIL).
---

Not every vendor integration is needed on day one. This page documents the integrations that are planned for future phases or serve supplementary purposes beyond the core KYC onboarding flow. Each section covers the vendor landscape, current status, and why the integration matters. When these phases come up on the roadmap, this page gives you a head start on understanding the options.

## V11: Income / ITR Verification

Income verification becomes relevant when a customer wants to activate F&O (Futures and Options) or Commodity segments, both of which require proof of income. The vendors below analyze bank statements or ITR (Income Tax Return) data to extract and verify income figures.

| Vendor | Product | Use Case | Integration |
|--------|---------|----------|-------------|
| **Perfios** | ITR Analyser | Detailed income analysis from ITR XML/PDF | REST API, 4000+ bank statement formats |
| **Finbox** | Bank Statement Analysis | Income extraction from bank statements | API + SDK |
| **Tartan** | Payroll/HRMS Verification | Real-time income from employer HRMS | 30+ HRMS integrations |

**Status**: Required for F&O/Commodity segment activation. Can be partially replaced by [Account Aggregator](/broking-kyc/vendors/account-aggregator) for bank statement-based income proof.

## V14: Back-Office / RMS

The back-office and RMS (Risk Management System) is where the client master record lives after onboarding is complete. It handles trading limits, margin calculations, and compliance monitoring. The KYC system pushes the client master record to the back-office after checker approval.

| Vendor | Product | Market Share | Key Features |
|--------|---------|-------------|-------------|
| **63 Moons** (Recommended) | ODIN | 70-80% | Multi-exchange (NSE/BSE/MCX). Front + Mid + Back + RMS. 1M+ licensees. |
| Symphony Fintech | XTS | Growing | OMS + RMS + Compliance. XTS OTIS. |
| TCS | BaNCS | ~30% volume | Integrated trading, clearing, surveillance. |
| OmneNEST | OmneNEST | 200+ brokers | Powers Zerodha Kite, Upstox, Finvasia. |

**Status**: Back-office integration is post-onboarding. Client master record sync happens after checker approval. Critical for trading activation.

:::note
63 Moons ODIN dominates the Indian brokerage back-office market with 70-80% share. If you are joining an existing broking firm, there is a strong chance you will be working with ODIN. The XTS platform from Symphony Fintech is the main alternative for newer firms.
:::

## V15: Communications

The communications layer handles OTP delivery, welcome kits, transaction alerts, and regulatory notifications. SMS and email are mandatory per SEBI (Securities and Exchange Board of India); WhatsApp and push notifications are supplementary.

| Channel | Vendor | Key Features | Regulatory |
|---------|--------|-------------|-----------|
| SMS (Recommended) | **Kaleyra / MSG91** | DLT (Distributed Ledger Technology) registered. Pre-approved templates. OTP, trade confirmations. | TRAI DLT mandate |
| Email (Recommended) | **AWS SES / SendGrid** | SPF, DKIM, DMARC. Digitally signed contract notes. | IT Act 2000 |
| WhatsApp | Gupshup / Infobip / Kaleyra | OTP delivery, trade confirmations (supplementary). | Cannot replace email per SEBI |
| Push | Firebase / OneSignal | Mobile app notifications. Real-time alerts. | Supplementary only |

**Status**: Required for OTP delivery (SMS/WhatsApp), welcome kits (Email), and ongoing notifications. DLT registration mandatory for SMS.

## V16: Credit Bureau (Optional)

Credit bureau checks are not required for standard stock broking KYC, but they can be useful for assessing eligibility for margin trading facility or loan-against-securities products.

| Vendor | Product | Use Case |
|--------|---------|----------|
| **CIBIL** (TransUnion) | Credit Score + Report | Optional credit check during onboarding |
| **Experian** | Credit Score + Report | Alternative to CIBIL |
| **CRIF High Mark** | Credit Score | Covers microfinance segment |
| **Equifax** | Credit Score | Additional coverage |

**Status**: Credit bureau integration is optional for stock broking KYC. May be useful for margin funding eligibility assessment or loan against securities products.

:::tip[When to consider credit bureau integration]
If the broker plans to offer MTF (Margin Trading Facility), a credit score check during onboarding can help set appropriate credit limits and reduce risk. Otherwise, this integration can be safely deferred to a much later phase.
:::

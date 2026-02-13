---
title: Vendor Strategy
description: Which vendors to invest in and which to skip — a strategic assessment of 25+ vendors across identity, payments, compliance, and back-office layers.
---

Which vendors to invest in and which to skip — a strategic assessment of 25+ vendors across identity, payments, compliance, and back-office layers. Includes the recommended final stack and alternates for every integration point.

## Vendors Worth Serious Evaluation

| Vendor | Why Consider | Primary Use Case | Integration Effort |
|--------|-------------|-----------------|-------------------|
| **Setu** | Unified KYC APIs + eKYC Setu + reverse penny drop + AA market leader | Could replace parts of Decentro for identity APIs and add AA capability | 1-2 weeks (API-first) |
| **Bureau.id** | Device intelligence and fraud prevention — layer no one else provides | Fraud overlay during onboarding: multi-accounting, synthetic identities, device spoofing | 1 week (SDK) |
| **Signzy** | All-in-one with no-code platform; Gartner-recognized | Vendor consolidation; strongest low-bandwidth Video KYC (75 kbps for Tier 3/4) | 2-3 weeks |
| **Karza/Perfios** | Deep analytics layer (GST, ITR, bank statement analysis) | Income/suitability verification for F&O. 4000+ bank statement formats. | 2 weeks |
| **Tartan** | Deepest payroll/income verification in India | Real-time HRMS income data. 30+ HRMS integrations. | 1-2 weeks |
| **Leegality** | Zero license fee eSign + eStamping | Cost-sensitive deployments, pilot phases. 55M+ eSigns. Smart API <2 day integration. | <2 days |

## Vendors Likely Not Needed

| Vendor | What They Offer | Why Skip |
|--------|----------------|----------|
| Gridlines | 100+ identity APIs, face match, UPI reverse penny drop | Covered by Decentro + Setu |
| Veri5 Digital | Aadhaar eKYC, Video KYC, face match (99.84%) | Covered by Setu + HyperVerge |
| OnGrid | 150+ APIs, background verification | BGV-focused. Not core KYC need. |
| AuthBridge | Digital KYC, Video KYC, AML | Enterprise-heavy, legacy LOS focus |
| IDfy | OCR + face match + background verification | Covered by HyperVerge |
| Razorpay (BAV only) | Penny drop, UPI/VPA validation | Covered by Setu/Decentro |
| Cashfree (BAV only) | Penny drop, reverse penny drop | Covered. Niche: widest co-op bank coverage. |

## Recommended Final Stack

| Layer | Recommended | Role | Alternate |
|-------|------------|------|-----------|
| Identity + DigiLocker | **Digio** or **Setu** | DigiLocker, Aadhaar eKYC, KRA | Decentro |
| PAN + Bank + eSign | **Setu** or **Decentro** + **Digio** | PAN verify, penny drop, eSign | Leegality (eSign, cost optimization) |
| Face Match + Video + OCR | **[HyperVerge](/vendors/verification/hyperverge)** | Liveness, face match, OCR, VIPV fallback | Signzy (low bandwidth), IDfy |
| CKYC + AML | **[TrackWizz](/vendors/fraud/trackwizz)** | CKYC search/upload, AML/PEP screening | Decentro (CKYC) + ComplyAdvantage (AML) |
| Income Verification | **Perfios** (ITR) + **Setu AA** (bank statement) | F&O activation, margin eligibility | Karza, Tartan (payroll) |
| Fraud Prevention | **Bureau.id** | Device intelligence, anti-fraud overlay | Signzy (embedded) |
| Back-Office | **63 Moons ODIN** | Multi-exchange trading + RMS | Symphony XTS, OmneNEST |
| Communications | **Kaleyra** + **AWS SES** | SMS (DLT), email, WhatsApp | MSG91, SendGrid |

## Vendor Deep-Dive Pages

| Vendor | Category | Page |
|--------|----------|------|
| DigiLocker | Identity | [DigiLocker Integration](/vendors/identity/digilocker) |
| CKYC | Identity | [CKYC Integration](/vendors/identity/ckyc) |
| Decentro | Verification | [Decentro Integration](/vendors/verification/decentro) |
| HyperVerge | Verification | [HyperVerge Integration](/vendors/verification/hyperverge) |
| KRA | KYC Registration | [KRA Integration](/vendors/kra) |
| Leegality | eSign | [Leegality Integration](/vendors/esign/leegality) |
| TrackWizz | Fraud & AML | [TrackWizz Integration](/vendors/fraud/trackwizz) |
| NSE | Exchange | [NSE UCC Integration](/vendors/exchanges/nse) |
| BSE | Exchange | [BSE UCC Integration](/vendors/exchanges/bse) |
| MCX | Exchange | [MCX UCC Integration](/vendors/exchanges/mcx) |
| CDSL | Depository | [CDSL BO Integration](/vendors/depositories/cdsl) |
| NSDL | Depository | [NSDL BO Integration](/vendors/depositories/nsdl) |

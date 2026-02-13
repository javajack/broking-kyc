---
title: Vendor Strategy
description: Which vendors to invest in and which to skip — a strategic assessment of 25+ vendors across identity, payments, compliance, and back-office layers.
---

Building a KYC (Know Your Customer) onboarding system for an Indian stock broker requires integrating with a surprisingly large number of third-party vendors. From identity verification to bank account validation, from AML (Anti-Money Laundering) screening to e-Sign, from exchange connectivity to back-office trading systems — no single vendor covers everything. The challenge is not finding vendors; it is choosing the right combination that minimizes the number of contracts you manage, provides reliable uptime, meets regulatory requirements, and keeps costs predictable. This page is your strategic guide: which vendors are worth serious evaluation, which you can safely skip, and what the recommended final stack looks like.

:::note[How to Read This Page]
This is the high-level strategy page. For detailed integration specifications — API (Application Programming Interface) endpoints, request/response formats, error codes — see the individual vendor deep-dive pages linked at the bottom. Start here to understand the "why" of each vendor choice, then go to the deep-dive pages for the "how."
:::

Think of the vendor landscape as layers in a stack. At the bottom are the identity and verification vendors (who confirm the customer is who they claim to be). In the middle are the compliance and fraud prevention vendors (who check whether the customer should be allowed to trade). At the top are the exchange and depository integrations (which actually create the trading and demat accounts). Every layer depends on the ones below it.

Let us start with the vendors that deserve serious evaluation — either because they offer unique capabilities or because they can consolidate multiple functions into a single contract.

## Vendors Worth Serious Evaluation

| Vendor | Why Consider | Primary Use Case | Integration Effort |
|--------|-------------|-----------------|-------------------|
| **Setu** | Unified KYC APIs + eKYC Setu + reverse penny drop + AA (Account Aggregator) market leader | Could replace parts of Decentro for identity APIs and add AA capability | 1-2 weeks (API-first) |
| **Bureau.id** | Device intelligence and fraud prevention — layer no one else provides | Fraud overlay during onboarding: multi-accounting, synthetic identities, device spoofing | 1 week (SDK) |
| **Signzy** | All-in-one with no-code platform; Gartner-recognized | Vendor consolidation; strongest low-bandwidth Video KYC (75 kbps for Tier 3/4) | 2-3 weeks |
| **Karza/Perfios** | Deep analytics layer (GST, ITR, bank statement analysis) | Income/suitability verification for F&O (Futures and Options). 4000+ bank statement formats. | 2 weeks |
| **Tartan** | Deepest payroll/income verification in India | Real-time HRMS income data. 30+ HRMS integrations. | 1-2 weeks |
| **Leegality** | Zero license fee eSign + eStamping | Cost-sensitive deployments, pilot phases. 55M+ eSigns. Smart API <2 day integration. | <2 days |

In plain English: Setu is interesting because it can replace several vendors with a single integration. Bureau.id fills a gap that nobody else covers (device-level fraud detection). Signzy is the strongest choice if your customers are in low-bandwidth areas. Karza/Perfios are essential for income verification. Tartan is useful if you need payroll-based income data. Leegality is the cheapest eSign option.

:::tip[Vendor Consolidation Reduces Operational Overhead]
Each vendor contract means a separate commercial agreement, a separate integration to maintain, separate API credentials to rotate, and a separate support channel to manage. Every vendor you can eliminate by consolidating its functionality into another vendor saves ongoing operational effort, not just upfront integration time.
:::

Not every vendor in the Indian fintech ecosystem is worth integrating with. Several offer capabilities that are already covered by the recommended stack.

## Vendors Likely Not Needed

| Vendor | What They Offer | Why Skip |
|--------|----------------|----------|
| Gridlines | 100+ identity APIs, face match, UPI reverse penny drop | Covered by Decentro + Setu |
| Veri5 Digital | Aadhaar eKYC, Video KYC, face match (99.84%) | Covered by Setu + HyperVerge |
| OnGrid | 150+ APIs, background verification | BGV-focused. Not core KYC need. |
| AuthBridge | Digital KYC, Video KYC, AML | Enterprise-heavy, legacy LOS focus |
| IDfy | OCR (Optical Character Recognition) + face match + background verification | Covered by HyperVerge |
| Razorpay (BAV only) | Penny drop, UPI/VPA validation | Covered by Setu/Decentro |
| Cashfree (BAV only) | Penny drop, reverse penny drop | Covered. Niche: widest co-op bank coverage. |

In plain English: these are all legitimate vendors, but their capabilities overlap with vendors already in the recommended stack. Unless you have a specific edge case — such as needing Cashfree's cooperative bank coverage or Signzy's 75 kbps Video KYC — the recommended stack covers everything you need.

With the evaluation complete, here is the recommended final stack that balances coverage, reliability, and vendor count.

## Recommended Final Stack

| Layer | Recommended | Role | Alternate |
|-------|------------|------|-----------|
| Identity + DigiLocker | **Digio** or **Setu** | DigiLocker, Aadhaar eKYC, KRA (KYC Registration Agency) | Decentro |
| PAN (Permanent Account Number) + Bank + eSign | **Setu** or **Decentro** + **Digio** | PAN verify, penny drop, eSign | Leegality (eSign, cost optimization) |
| Face Match + Video + OCR | **[HyperVerge](/broking-kyc/vendors/verification/hyperverge)** | Liveness, face match, OCR, VIPV fallback | Signzy (low bandwidth), IDfy |
| CKYC (Central KYC) + AML | **[TrackWizz](/broking-kyc/vendors/fraud/trackwizz)** | CKYC search/upload, AML/PEP (Politically Exposed Person) screening | Decentro (CKYC) + ComplyAdvantage (AML) |
| Income Verification | **Perfios** (ITR) + **Setu AA** (bank statement) | F&O activation, margin eligibility | Karza, Tartan (payroll) |
| Fraud Prevention | **Bureau.id** | Device intelligence, anti-fraud overlay | Signzy (embedded) |
| Back-Office | **63 Moons ODIN** | Multi-exchange trading + RMS | Symphony XTS, OmneNEST |
| Communications | **Kaleyra** + **AWS SES** | SMS (DLT), email, WhatsApp | MSG91, SendGrid |

:::caution[No Single Vendor Covers Everything]
Even with aggressive consolidation, the recommended stack includes 7-8 vendor contracts. This is the reality of building a compliant KYC system in India — the regulatory landscape requires different specialized vendors for identity, compliance, exchanges, and depositories. Resist the temptation to over-consolidate into a single vendor, as it creates a single point of failure.
:::

In plain English: the stack has three core vendors for identity and verification (Digio/Setu, HyperVerge, TrackWizz), two for income (Perfios + Setu AA), one for fraud (Bureau.id), one for back-office (63 Moons ODIN), and one for communications (Kaleyra + AWS SES). Exchange and depository integrations are direct — there is no vendor intermediary for NSE (National Stock Exchange), BSE (Bombay Stock Exchange), MCX (Multi Commodity Exchange), CDSL (Central Depository Services Limited), or NSDL (National Securities Depository Limited).

For detailed integration specifications, API references, and implementation guides, see the individual vendor pages below.

## Vendor Deep-Dive Pages

| Vendor | Category | Page |
|--------|----------|------|
| DigiLocker | Identity | [DigiLocker Integration](/broking-kyc/vendors/identity/digilocker) |
| CKYC | Identity | [CKYC Integration](/broking-kyc/vendors/identity/ckyc) |
| Decentro | Verification | [Decentro Integration](/broking-kyc/vendors/verification/decentro) |
| HyperVerge | Verification | [HyperVerge Integration](/broking-kyc/vendors/verification/hyperverge) |
| KRA | KYC Registration | [KRA Integration](/broking-kyc/vendors/kra) |
| Leegality | eSign | [Leegality Integration](/broking-kyc/vendors/esign/leegality) |
| TrackWizz | Fraud & AML | [TrackWizz Integration](/broking-kyc/vendors/fraud/trackwizz) |
| NSE | Exchange | [NSE UCC Integration](/broking-kyc/vendors/exchanges/nse) |
| BSE | Exchange | [BSE UCC Integration](/broking-kyc/vendors/exchanges/bse) |
| MCX | Exchange | [MCX UCC Integration](/broking-kyc/vendors/exchanges/mcx) |
| CDSL | Depository | [CDSL BO Integration](/broking-kyc/vendors/depositories/cdsl) |
| NSDL | Depository | [NSDL BO Integration](/broking-kyc/vendors/depositories/nsdl) |

:::tip[Start with the Recommended Vendors]
If you are new to the codebase, start by reading the HyperVerge, TrackWizz, and KRA deep-dive pages — these cover the verification, compliance, and registration layers that are most unique to stock broking. The exchange and depository pages are important but more procedural; the identity verification pages are where the interesting engineering challenges live.
:::

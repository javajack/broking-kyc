---
title: Cost Analysis
description: What each onboarding costs in vendor API fees — per-transaction costs for every integration point and total cost-per-onboarding estimates.
---

Every time a customer opens an account, the system makes calls to a dozen or more external APIs -- PAN (Permanent Account Number) verification, bank penny drop, KRA (KYC Registration Agency) lookup, e-Sign, and so on. Each call has a per-transaction cost. This page breaks down those costs so you can understand the economics of onboarding: what each integration costs, what the total per-customer cost looks like under different scenarios, and where there are opportunities to optimize.

You will refer back to this page during vendor selection discussions, budget planning, or when someone asks "why are we paying Rs.X per onboarding?"

## Per-Transaction Costs

The table below shows the recommended vendor for each integration point alongside the cheapest alternative. Costs are approximate and subject to volume-based negotiation.

| Integration | Recommended | Cost/txn | Cheapest Alt | Cost |
|------------|------------|----------|-------------|------|
| PAN Verify | Decentro | Rs.1-3 | Sandbox.co.in | Rs.1-2 |
| Bank Verify (Penny Drop) | Decentro | Rs.2-5 | Cashfree | Rs.2-4 |
| KRA Lookup/Submit | Digio | Rs.3-5 | CVL Direct | Rs.2-3 |
| CKYC (Central KYC) Search/Upload | Decentro | Rs.3-10 | TrackWizz | Rs.5-10 |
| e-Sign | Digio | Rs.15-25 | Protean | Rs.5.90 |
| OCR (per doc) | HyperVerge | Rs.1-3 | IDfy | Rs.1-3 |
| Face Match | HyperVerge | Rs.1-2 | IDfy | Rs.1-2 |
| AML (Anti-Money Laundering) Screening | TrackWizz | Rs.5-15 | IDfy | Rs.8-20 |
| Video KYC (if needed) | HyperVerge | Rs.30-50 | Signzy | Contact |
| Income Verify (AA, if F&O) | Setu AA | Rs.5-25 | Perfios ITR | Rs.15-50 |
| Device Intelligence (optional) | Bureau.id | Contact | — | — |

In plain English: the most expensive single integration is Video KYC at Rs.30-50 per session, but it is only used when the DigiLocker path is not available. The largest cost across all onboardings is e-Sign at Rs.15-25 per transaction, since every customer goes through it.

## Total Cost per Onboarding

| Scenario | Cost Range |
|----------|-----------|
| **Recommended stack** | **Rs.85-175** (with AA income verify for F&O) |
| **Cheapest stack** | **Rs.50-100** (equity-only, no F&O) |
| **Setu consolidation** | **Rs.70-130** (unified PAN+bank+eSign pricing) |

:::tip[Equity-only vs F&O onboarding]
Customers who only want equity cash trading cost significantly less to onboard because they skip income verification and the additional VIPV (Video In-Person Verification) that some F&O (Futures and Options) workflows require. When projecting costs, segment your customer base by expected segment mix.
:::

## Cost Optimization Strategies

- **Setu consolidation**: Unified pricing for PAN + bank + eSign can reduce per-unit costs
- **Leegality for eSign**: Zero license fee + pay-per-success model reduces eSign costs significantly
- **DigiLocker path**: Saves Rs.30-50/customer vs manual upload + VIPV (see [DigiLocker cost comparison](/broking-kyc/vendors/identity/digilocker))
- **Account Aggregator**: Eliminates manual income proof upload for F&O activation
- **Volume negotiations**: Most vendors offer slab-based pricing at 10K+ onboardings/month

:::note
These costs do not include infrastructure costs (servers, storage, bandwidth), exchange registration fees, or depository charges. They cover vendor API fees only.
:::

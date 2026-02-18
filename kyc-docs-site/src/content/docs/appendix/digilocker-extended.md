---
title: DigiLocker Extended
description: Extended DigiLocker specification — advanced OAuth flows, document type catalog, XML schema details, NPCI e-KYC Setu integration, and aggregator comparison.
---

DigiLocker is the backbone of the modern KYC onboarding flow. When a customer grants consent through DigiLocker, the system can fetch their Aadhaar details (name, date of birth, gender, address, photograph) directly from UIDAI (Unique Identification Authority of India) -- eliminating manual document uploads and often bypassing the need for a separate IPV (In-Person Verification) step. This page covers the advanced integration details beyond what is needed for basic onboarding: the OAuth 2.0 consent flow mechanics, the full document type catalog, the Aadhaar XML response schema, the newer NPCI (National Payments Corporation of India) e-KYC Setu alternative, and a cost comparison between direct integration and aggregator-based access.

:::note
This page contains extended DigiLocker documentation beyond what's needed for basic individual KYC onboarding. The core DigiLocker integration spec is at [DigiLocker Integration](/broking-kyc/vendors/identity/digilocker).
:::

## Source Document

The extended DigiLocker specification is maintained in `kyc-docs/sections/25-digilocker-deep-dive.md` (61KB). Key sections include:

### Integration Paths

There are two ways to integrate with DigiLocker. The choice depends on your onboarding volume.

| Path | Description | When to Use |
|------|------------|------------|
| **Direct (MeitY RE)** | Register as Requester Entity with MeitY (Ministry of Electronics and Information Technology) | 5,000+ onboardings/month (cost-effective) |
| **Aggregator** | Use aggregator's DigiLocker gateway | Faster integration, lower initial investment |

### OAuth 2.0 Consent Flow

The DigiLocker consent flow follows the standard OAuth 2.0 authorization code grant pattern. If you have worked with any OAuth-based API before, this will be familiar.

```
1. Generate authorization URL with scopes
2. Redirect user to DigiLocker consent page
3. User authenticates with Aadhaar/mobile OTP
4. User selects documents to share
5. DigiLocker redirects back with authorization code
6. Exchange code for access token
7. Fetch documents using access token
```

### Document Types for Broking KYC

These are the documents relevant to stock broking KYC that can be fetched through DigiLocker. In practice, the Aadhaar eKYC document provides the most value since it supplies name, date of birth, gender, address, and photograph in a single fetch.

| Document | Issuer | Key Fields Extracted |
|----------|--------|---------------------|
| Aadhaar eKYC | UIDAI | Name, DOB, gender, address, photo |
| PAN Card | Income Tax Dept | PAN, name, DOB, father's name |
| Driving License | State RTO | Name, DOB, address, DL number, expiry |
| Voter ID | ECI (Election Commission of India) | Name, DOB, address, EPIC number |

### NPCI e-KYC Setu

This is a newer mechanism, allowed by SEBI since June 2025, for performing Aadhaar eKYC without sharing the actual Aadhaar number. It uses the NPCI infrastructure (the same network that powers UPI).

- Uses NPCI infrastructure (same as UPI)
- Customer authenticates via UPI app
- eKYC data flows without Aadhaar number exposure
- Privacy-preserving alternative to traditional DigiLocker

:::tip[Why e-KYC Setu matters]
The traditional DigiLocker path requires the customer to share their Aadhaar number. e-KYC Setu achieves the same identity verification without exposing the Aadhaar number at all, which is a significant privacy improvement. As this mechanism matures, it may become the preferred path for Aadhaar-based eKYC.
:::

### Aadhaar XML Response Schema

These are the key fields returned in the Aadhaar eKYC XML response. The address comes as a structured object with individual components, which makes it straightforward to map into the address fields (Section B) of the master dataset.

- `name` -- Full name as per Aadhaar
- `dob` -- Date of birth (DD-MM-YYYY)
- `gender` -- M/F/T
- `phone` -- Last 4 digits only (hashed)
- `email` -- Hashed (not in plaintext)
- `address` -- Structured (house, street, landmark, locality, district, state, pincode)
- `photo` -- Base64-encoded JPEG

### Cost Comparison

The break-even point between direct integration and aggregator access is roughly 5,000 onboardings per month. Below that volume, the aggregator path is more economical due to the high one-time setup cost of direct MeitY registration.

| Integration Path | Setup Cost | Per-Fetch Cost | Break-Even |
|-----------------|-----------|---------------|-----------|
| Direct (MeitY RE) | Rs.7-15 lakh (one-time) | Rs.0-1/fetch | ~5,000 onboardings/month |
| Aggregator | Rs.0-50K | Rs.3-5/fetch | Below 5,000/month |

For the complete specification, refer to the extended DigiLocker deep-dive document in the source repository.

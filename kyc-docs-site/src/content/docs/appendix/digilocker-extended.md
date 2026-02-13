---
title: DigiLocker Extended
description: Extended DigiLocker specification — advanced OAuth flows, document type catalog, XML schema details, NPCI e-KYC Setu integration, and aggregator comparison.
---

Extended DigiLocker specification covering advanced OAuth flows, document type catalog, XML schema details, NPCI e-KYC Setu integration, and detailed aggregator comparison.

:::note
This page contains extended DigiLocker documentation beyond what's needed for basic individual KYC onboarding. The core DigiLocker integration spec is at [DigiLocker Integration](/broking-kyc/vendors/identity/digilocker).
:::

## Source Document

The extended DigiLocker specification is maintained in `kyc-docs/sections/25-digilocker-deep-dive.md` (61KB). Key sections include:

### Integration Paths

| Path | Description | When to Use |
|------|------------|------------|
| **Direct (MeitY RE)** | Register as Requester Entity with MeitY | 5,000+ onboardings/month (cost-effective) |
| **Aggregator (Digio/Decentro)** | Use aggregator's DigiLocker gateway | Faster integration, lower initial investment |

### OAuth 2.0 Consent Flow

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

| Document | Issuer | Key Fields Extracted |
|----------|--------|---------------------|
| Aadhaar eKYC | UIDAI | Name, DOB, gender, address, photo |
| PAN Card | Income Tax Dept | PAN, name, DOB, father's name |
| Driving License | State RTO | Name, DOB, address, DL number, expiry |
| Voter ID | ECI | Name, DOB, address, EPIC number |

### NPCI e-KYC Setu

New mechanism (SEBI allowed Jun 2025) for Aadhaar eKYC without sharing the Aadhaar number:
- Uses NPCI infrastructure (same as UPI)
- Customer authenticates via UPI app
- eKYC data flows without Aadhaar number exposure
- Privacy-preserving alternative to traditional DigiLocker

### Aadhaar XML Response Schema

Key fields in the Aadhaar eKYC XML response:
- `name` — Full name as per Aadhaar
- `dob` — Date of birth (DD-MM-YYYY)
- `gender` — M/F/T
- `phone` — Last 4 digits only (hashed)
- `email` — Hashed (not in plaintext)
- `address` — Structured (house, street, landmark, locality, district, state, pincode)
- `photo` — Base64-encoded JPEG

### Cost Comparison

| Integration Path | Setup Cost | Per-Fetch Cost | Break-Even |
|-----------------|-----------|---------------|-----------|
| Direct (MeitY RE) | Rs.7-15 lakh (one-time) | Rs.0-1/fetch | ~5,000 onboardings/month |
| Aggregator | Rs.0-50K | Rs.3-5/fetch | Below 5,000/month |

For the complete specification, refer to the extended DigiLocker deep-dive document in the source repository.

---
title: NRI Deep Dive
description: Consolidated NRI onboarding flow — additional requirements for Non-Resident Indians across KRA, exchanges, depositories, and bank verification.
---

NRI (Non-Resident Indian) onboarding is a fundamentally different workflow from resident Indian onboarding. The customer lives abroad, may not have an active Aadhaar, needs a PIS (Portfolio Investment Scheme) permission letter from an AD (Authorized Dealer) bank, and must use NRE (Non-Resident External) or NRO (Non-Resident Ordinary) bank accounts for settlement. This page consolidates every NRI-specific requirement identified across the vendor integration specifications, so you have a single place to understand what changes when the customer's residential status (field A22) is set to NRI, FN (Foreign National), or PIO (Person of Indian Origin).

:::note
NRI onboarding is planned for a future phase after the individual resident KYC system is stable. This page consolidates NRI-specific requirements identified across vendor specs.
:::

## NRI-Specific Fields (Section V -- 22 Fields)

These are the additional fields captured only for NRI customers. They are documented in full in the [Master Dataset, Section V](/broking-kyc/reference/master-dataset#23-section-v-nri-specific-requirements).

| Field | Description | Source |
|-------|------------|--------|
| Passport Number | Mandatory for NRI | User input |
| Passport Expiry | Must be valid | User input |
| Visa Type/Number | Employment/Business/Student | User input |
| Country of Residence | ISO 3166-1 alpha-2 | User input |
| PIS Permission | Portfolio Investment Scheme from AD bank | Bank letter |
| NRE/NRO Account | Bank account for settlement | Penny Drop verify |
| Tax Residency Certificate | If claiming DTAA (Double Taxation Avoidance Agreement) benefit | User upload |
| Overseas Address | Full address in country of residence | User input |

## Vendor-Specific NRI Requirements

Each external system handles NRI customers differently. The sections below highlight what changes in each integration.

### KRA
- NRI client category in KRA (KYC Registration Agency) upload
- CP (Custodial Participant) code -- **removed since Jul 2025**
- FATCA/CRS (Foreign Account Tax Compliance Act / Common Reporting Standard) declaration mandatory (non-India tax resident)
- Full spec: [KRA Integration](/broking-kyc/vendors/kra) Section 7

### Exchanges
- **NSE**: NRI client type in UCC (Unique Client Code) registration
- **BSE**: Same 3-param PAN (Permanent Account Number) verification applies
- **MCX**: NRI commodity trading has additional restrictions
- Full specs: [NSE](/broking-kyc/vendors/exchanges/nse), [BSE](/broking-kyc/vendors/exchanges/bse)

### Depositories
- NRE/NRO linked BO (Beneficiary Owner) account
- Different settlement bank requirements
- PIS permission verification before activation

### Bank Verification
- Penny Drop to NRE/NRO account (same flow as resident)
- Additional name matching for overseas spelling variations

### eSign
- Aadhaar eSign may not be available (if Aadhaar deactivated)
- DSC (Digital Signature Certificate) as alternative
- Physical signature with wet signature attestation as fallback

:::caution
Many NRIs do not have an active Aadhaar number, which means the DigiLocker and Aadhaar OTP e-Sign paths are unavailable. The system must support DSC-based signing and manual document upload as fallback paths for NRI onboarding.
:::

## Key Regulatory Differences

This table summarizes the key differences between resident and NRI onboarding. It is a useful quick-reference when scoping the NRI feature or explaining to stakeholders why NRI onboarding takes longer.

| Aspect | Resident | NRI |
|--------|----------|-----|
| PAN | Mandatory | Mandatory (4th char = P for individual) |
| Aadhaar | Mandatory for eKYC | Optional (may not have active Aadhaar) |
| Bank Account | Savings/Current | NRE/NRO only |
| PIS Permission | Not applicable | Mandatory for equity trading |
| FATCA | India-only declaration | Full FATCA/CRS (country of residence) |
| eSign | Aadhaar OTP | DSC / Physical / Aadhaar (if active) |
| KRA | Standard flow | NRI category + CP code (removed Jul 2025) |

:::tip[The PIS constraint that catches people off guard]
Under the PIS route, NRIs cannot do intraday trading -- they are restricted to delivery-based trades only, and they cannot access F&O (Futures and Options), currency, or commodity segments. The Non-PIS route allows intraday and F&O but still blocks currency and commodity. Make sure the onboarding UI clearly communicates these restrictions before the customer selects their trading route.
:::

---
title: NRI Deep Dive
description: Consolidated NRI onboarding flow — additional requirements for Non-Resident Indians across KRA, exchanges, depositories, and bank verification.
---

Consolidated NRI onboarding flow — additional requirements for Non-Resident Indians across all vendor integrations. NRI KYC adds PIS permission, NRE/NRO bank accounts, and additional regulatory compliance.

:::note
NRI onboarding is planned for a future phase after the individual resident KYC system is stable. This page consolidates NRI-specific requirements identified across vendor specs.
:::

## NRI-Specific Fields (Section V — 22 Fields)

| Field | Description | Source |
|-------|------------|--------|
| Passport Number | Mandatory for NRI | User input |
| Passport Expiry | Must be valid | User input |
| Visa Type/Number | Employment/Business/Student | User input |
| Country of Residence | ISO 3166-1 alpha-2 | User input |
| PIS Permission | Portfolio Investment Scheme from AD bank | Bank letter |
| NRE/NRO Account | Bank account for settlement | Penny Drop verify |
| Tax Residency Certificate | If claiming DTAA benefit | User upload |
| Overseas Address | Full address in country of residence | User input |

## Vendor-Specific NRI Requirements

### KRA
- NRI client category in KRA upload
- CP (Custodial Participant) code — **removed since Jul 2025**
- FATCA/CRS declaration mandatory (non-India tax resident)
- Full spec: [KRA Integration](/vendors/kra) Section 7

### Exchanges
- **NSE**: NRI client type in UCC registration
- **BSE**: Same 3-param PAN verification applies
- **MCX**: NRI commodity trading has additional restrictions
- Full specs: [NSE](/vendors/exchanges/nse), [BSE](/vendors/exchanges/bse)

### Depositories
- NRE/NRO linked BO account
- Different settlement bank requirements
- PIS permission verification before activation

### Bank Verification
- Penny Drop to NRE/NRO account (same flow as resident)
- Additional name matching for overseas spelling variations

### eSign
- Aadhaar eSign may not be available (if Aadhaar deactivated)
- DSC (Digital Signature Certificate) as alternative
- Physical signature with wet signature attestation as fallback

## Key Regulatory Differences

| Aspect | Resident | NRI |
|--------|----------|-----|
| PAN | Mandatory | Mandatory (4th char = P for individual) |
| Aadhaar | Mandatory for eKYC | Optional (may not have active Aadhaar) |
| Bank Account | Savings/Current | NRE/NRO only |
| PIS Permission | Not applicable | Mandatory for equity trading |
| FATCA | India-only declaration | Full FATCA/CRS (country of residence) |
| eSign | Aadhaar OTP | DSC / Physical / Aadhaar (if active) |
| KRA | Standard flow | NRI category + CP code (removed Jul 2025) |

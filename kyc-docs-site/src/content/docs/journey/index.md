---
title: User Journey
description: The 9-screen KYC onboarding journey — regulatory compliance across identity verification, bank linkage, and account activation.
next:
  link: /broking-kyc/journey/01-mobile-registration/
  label: 'Screen 1: Mobile Registration →'
---

This section documents the KYC (Know Your Customer) onboarding journey mandated by SEBI, the exchanges (NSE, BSE, MCX), and the depositories (CDSL, NSDL). The journey is structured as 9 sequential screens, each mapping to specific regulatory requirements. Every field collected traces to a compliance obligation under SEBI KYC Master Circular (SEBI/HO/MIRSD/MIRSD-SEC-2/P/CIR/2023/168), PMLA requirements, or exchange/depository registration specifications.

This section walks you through every screen the customer sees, what the system does behind the scenes at each step, and why the screens are ordered the way they are. Read these pages in sequence. By the end, you will have a complete mental model of the onboarding pipeline.

## The 9 Screens at a Glance

Each screen has a single clear purpose. Every field maps directly to a regulatory requirement or a downstream system dependency.

| Screen | Title | What Happens |
|--------|-------|-------------|
| [1. Mobile Registration](/broking-kyc/journey/01-mobile-registration/) | Mobile / Email Registration | User enters mobile, OTP verified. Device risk assessment fires async. |
| [2. PAN + DOB](/broking-kyc/journey/02-pan-dob/) | PAN + Date of Birth | User enters PAN + DOB. 4 async API calls fire: PAN Verify, KRA Lookup, CKYC Search, AML Screen. |
| [3. DigiLocker Consent](/broking-kyc/journey/03-digilocker-consent/) | DigiLocker Consent (Redirect) | Redirect to DigiLocker. Harvests identity fields. IPV/VIPV exempted per SEBI circular. |
| [4. Confirm Identity](/broking-kyc/journey/04-confirm-identity/) | Confirm Identity | Pre-filled from DigiLocker + KRA + CKYC. User enters email only. |
| [5. Bank Account](/broking-kyc/journey/05-bank-account/) | Bank Account | User enters account, IFSC, type. Penny Drop fires async. |
| [6. Trading Preferences](/broking-kyc/journey/06-trading-preferences/) | Trading Preferences | Segment toggles. Income proof if F&O/Commodity selected per SEBI requirements. |
| [7. Nominations](/broking-kyc/journey/07-nominations/) | Nominations | Up to 10 nominees (SEBI Jan 2025). Opt-out requires video declaration. |
| [8. Declarations Gate](/broking-kyc/journey/08-declarations-gate/) | Declarations + Blocking Gate | FATCA, PEP, T&C checkboxes. Blocking gate: all async checks must pass. |
| [9. Review + eSign](/broking-kyc/journey/09-review-esign/) | Review + Face Match + e-Sign | Review application, selfie face match, Aadhaar OTP e-Sign. Done. |

## User Input Summary

The user provides a minimal set of fields across all 9 screens. Remaining fields are pre-filled from DigiLocker (Government of India's digital document platform), KRA (KYC Registration Agency), CKYC (Central KYC registry), or IFSC lookup. The architecture maximises pre-fill from authoritative government and regulatory sources per the DigiLocker-first approach permitted under SEBI circular SEBI/HO/MIRSD/DOP/CIR/P/2020/73.

**User-typed fields:** Mobile, PAN (Permanent Account Number), DOB (Date of Birth), Email, Bank Account Number, IFSC, Account Type, Segment Toggles, Nominee details (if adding), Declaration checkboxes.

## Regulatory Requirements

The following regulatory mandates drive the screen sequencing and data collection:

- **Mobile OTP verification** -- required for Aadhaar-based authentication (eKYC and eSign) and as the primary communication channel for KRA and exchange notifications
- **DigiLocker-based Aadhaar eKYC** -- provides IPV exemption per SEBI circular SEBI/HO/MIRSD/DOP/CIR/P/2020/73, eliminating the need for video In-Person Verification
- **Parallel verification** -- PAN verification against NSDL/Protean, KRA lookup, CKYC search (CERSAI), and AML/PEP screening per SEBI AML/CFT guidelines must all complete before account activation
- **Single eSign** -- one Aadhaar OTP signature on the complete application PDF, legally valid under IT Act 2000 Section 3A
- **Blocking gate** -- all verification results must be evaluated before eSign per SEBI KYC norms; no account shall be activated with unresolved verification failures

For vendor implementation options, see [Vendor Integrations](/broking-kyc/vendors/).

:::caution[The blocking gate is non-negotiable]
Screen 8 is not just a checkbox screen. It is where the system evaluates every async check that has been running since Screen 1. If PAN verification failed, KRA returned "Rejected," or AML flagged the customer as high-risk, the journey stops here. Never let a customer reach e-Sign if any blocking condition is unresolved.
:::

---
title: User Journey
description: The 9-screen KYC onboarding journey — from mobile OTP to first trade in ~6 minutes.
next:
  link: /broking-kyc/journey/01-mobile-registration/
  label: 'Screen 1: Mobile Registration →'
---

The 9-screen user journey — each screen has a single clear purpose. Mobile/email registration establishes the identity anchor and OTP channel before any KYC data enters the system. PAN+DOB fires async checks while the user completes DigiLocker consent. Total user time: approximately 6 minutes.

## The 9 Screens at a Glance

| Screen | Title | Time | What Happens |
|--------|-------|------|-------------|
| [1. Mobile Registration](/broking-kyc/journey/01-mobile-registration/) | Mobile / Email Registration | ~30s | User enters mobile, OTP verified. Bureau.id device fingerprint fires async. |
| [2. PAN + DOB](/broking-kyc/journey/02-pan-dob/) | PAN + Date of Birth | ~20s | User enters PAN + DOB. 4 async API calls fire: PAN Verify, KRA Lookup, CKYC Search, AML Screen. |
| [3. DigiLocker Consent](/broking-kyc/journey/03-digilocker-consent/) | DigiLocker Consent (Redirect) | ~60s | Redirect to DigiLocker. Harvests ~25 identity fields. IPV/VIPV exempted. |
| [4. Confirm Identity](/broking-kyc/journey/04-confirm-identity/) | Confirm Identity | ~30s | Pre-filled from DigiLocker + KRA + CKYC. User enters email only. |
| [5. Bank Account](/broking-kyc/journey/05-bank-account/) | Bank Account | ~45s | User enters account, IFSC, type. Penny Drop fires async. |
| [6. Trading Preferences](/broking-kyc/journey/06-trading-preferences/) | Trading Preferences | ~30s | Segment toggles. Income proof if F&O/Commodity selected. |
| [7. Nominations](/broking-kyc/journey/07-nominations/) | Nominations | ~30s–2m | Up to 10 nominees. Opt-out requires video declaration. |
| [8. Declarations Gate](/broking-kyc/journey/08-declarations-gate/) | Declarations + Blocking Gate | ~30s | FATCA, PEP, T&C checkboxes. Blocking gate: all async checks must pass. |
| [9. Review + eSign](/broking-kyc/journey/09-review-esign/) | Review + Face Match + e-Sign | ~60s | Review application, selfie face match, Aadhaar OTP e-Sign. Done. |

## User Input Summary

The user types approximately **12 fields** across all 9 screens. Everything else is pre-filled from DigiLocker, KRA, CKYC, or IFSC lookup.

**User-typed fields:** Mobile, PAN, DOB, Email, Bank Account Number, IFSC, Account Type, Segment Toggles, Nominee details (if adding), Declaration checkboxes.

## Timing Flow

The 60-second DigiLocker redirect on Screen 3 is deliberately positioned to absorb the latency of the 4 async API calls fired on Screen 2. By Screen 4, all results (PAN status, KRA data, CKYC record, AML screening) are ready for pre-fill and gate evaluation.

## Key Design Decisions

- **Mobile first** — establishes the OTP channel before any KYC data enters the system
- **DigiLocker-first** — harvests ~25 fields with zero typing, provides Aadhaar eKYC for IPV exemption
- **Async verification** — blocking checks run in parallel, never in the user's critical path
- **Single e-Sign** — one Aadhaar OTP signature on the complete application PDF
- **Blocking gate** — all async results evaluated at Screen 8, before the user invests time in e-Sign

---
title: User Journey
description: The 9-screen KYC onboarding journey — from mobile OTP to first trade in ~6 minutes.
next:
  link: /broking-kyc/journey/01-mobile-registration/
  label: 'Screen 1: Mobile Registration →'
---

Imagine a person who has never traded a single share in their life. They have downloaded your app, maybe after seeing an ad or hearing from a friend. They are curious, possibly impatient, and almost certainly unfamiliar with the regulatory machinery that stands between them and their first trade. Your job, as the system that greets them, is to guide them through KYC (Know Your Customer) verification in under six minutes -- collecting just enough information to satisfy SEBI (Securities and Exchange Board of India), the exchanges, and the depositories, while making the experience feel effortless.

This section walks you through every screen the customer sees, what the system does behind the scenes at each step, and why the screens are ordered the way they are. Read these pages in sequence. By the end, you will have a complete mental model of the onboarding pipeline.

## The 9 Screens at a Glance

Each screen has a single clear purpose. The customer never needs to wonder "why am I being asked this?" -- every field maps directly to a regulatory requirement or a downstream system dependency.

| Screen | Title | Time | What Happens |
|--------|-------|------|-------------|
| [1. Mobile Registration](/broking-kyc/journey/01-mobile-registration/) | Mobile / Email Registration | ~30s | User enters mobile, OTP verified. Bureau.id device fingerprint fires async. |
| [2. PAN + DOB](/broking-kyc/journey/02-pan-dob/) | PAN + Date of Birth | ~20s | User enters PAN + DOB. 4 async API calls fire: PAN Verify, KRA Lookup, CKYC Search, AML Screen. |
| [3. DigiLocker Consent](/broking-kyc/journey/03-digilocker-consent/) | DigiLocker Consent (Redirect) | ~60s | Redirect to DigiLocker. Harvests ~25 identity fields. IPV/VIPV exempted. |
| [4. Confirm Identity](/broking-kyc/journey/04-confirm-identity/) | Confirm Identity | ~30s | Pre-filled from DigiLocker + KRA + CKYC. User enters email only. |
| [5. Bank Account](/broking-kyc/journey/05-bank-account/) | Bank Account | ~45s | User enters account, IFSC, type. Penny Drop fires async. |
| [6. Trading Preferences](/broking-kyc/journey/06-trading-preferences/) | Trading Preferences | ~30s | Segment toggles. Income proof if F&O/Commodity selected. |
| [7. Nominations](/broking-kyc/journey/07-nominations/) | Nominations | ~30s-2m | Up to 10 nominees. Opt-out requires video declaration. |
| [8. Declarations Gate](/broking-kyc/journey/08-declarations-gate/) | Declarations + Blocking Gate | ~30s | FATCA, PEP, T&C checkboxes. Blocking gate: all async checks must pass. |
| [9. Review + eSign](/broking-kyc/journey/09-review-esign/) | Review + Face Match + e-Sign | ~60s | Review application, selfie face match, Aadhaar OTP e-Sign. Done. |

## User Input Summary

The user types approximately **12 fields** across all 9 screens. Everything else is pre-filled from DigiLocker (Government of India's digital document platform), KRA (KYC Registration Agency), CKYC (Central KYC registry), or IFSC lookup. This is not accidental -- the entire architecture is designed to minimize manual data entry and maximize pre-fill from authoritative government and regulatory sources.

**User-typed fields:** Mobile, PAN (Permanent Account Number), DOB (Date of Birth), Email, Bank Account Number, IFSC, Account Type, Segment Toggles, Nominee details (if adding), Declaration checkboxes.

:::tip[The 12-field principle]
When someone asks "how long does onboarding take?" the answer is: the customer types roughly 12 fields. That number is the north star for product and engineering. Every design decision aims to keep it as low as possible while remaining fully compliant.
:::

## Timing Flow

The 60-second DigiLocker redirect on Screen 3 is deliberately positioned to absorb the latency of the 4 async API calls fired on Screen 2. By Screen 4, all results (PAN status, KRA data, CKYC record, AML screening) are ready for pre-fill and gate evaluation. This is one of the most important architectural decisions in the entire flow -- the customer perceives zero wait time for operations that collectively take 3-8 seconds to complete.

:::note[Why Screen 3 is the pivot point]
Screen 3 (DigiLocker) requires the customer to leave your app briefly and authenticate with the government platform. That ~60 seconds of "dead time" from your system's perspective is exactly when the four API calls from Screen 2 complete in the background. It is an elegant use of user wait time.
:::

## Key Design Decisions

These five principles drove the screen sequencing. You will see them referenced throughout the individual screen pages.

- **Mobile first** -- establishes the OTP (One-Time Password) channel before any KYC data enters the system
- **DigiLocker-first** -- harvests ~25 fields with zero typing, provides Aadhaar eKYC for IPV (In-Person Verification) exemption
- **Async verification** -- blocking checks run in parallel, never in the user's critical path
- **Single e-Sign** -- one Aadhaar OTP signature on the complete application PDF via eSign (electronic signature via Aadhaar OTP)
- **Blocking gate** -- all async results evaluated at Screen 8, before the user invests time in e-Sign

:::caution[The blocking gate is non-negotiable]
Screen 8 is not just a checkbox screen. It is where the system evaluates every async check that has been running since Screen 1. If PAN verification failed, KRA returned "Rejected," or AML flagged the customer as high-risk, the journey stops here. Never let a customer reach e-Sign if any blocking condition is unresolved.
:::

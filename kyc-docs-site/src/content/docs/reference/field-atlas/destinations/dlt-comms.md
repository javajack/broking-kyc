---
title: "DLT Comms (SMS / Email) — Fields consumed"
description: "Every field consumed by DLT Comms (SMS / Email), with source section, destination format, update frequency, transformation rule, and quirks. Use this when building an integration with this destination."
---

> **Why this page is structured this way:** This is the destination-first view for DLT Comms (SMS / Email). Engineers building an integration with this destination get the complete field list on one page. To see where each field originated in onboarding, follow the per-section links via the [atlas overview](/broking-kyc/reference/field-atlas/).

## TL;DR

- **26 unique fields** consumed by DLT Comms (SMS / Email).
- Source spans sections: A, C, G, H, O, P, R, U, Y, AA, AB.
- **11 rows cite a public spec source**; **15** are `[industry typical]`.

## Field-destination rows

Sorted by `source_section`, then `field_id`.

| source_section | field_id | field_name | destination_field_name | destination_format | frequency | transformation | quirks_notes | spec_source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| A | A-first_name | First Name | FIRST_NAME_VAR | VARCHAR(20) | on-event | [direct] | used for salutation in transactional templates; capitalised on render | [industry typical] |
| A | A-full_name | Full Name | CLIENT_NAME_VAR | VARCHAR(30) | on-event | truncate to N | SMS body limit 160 GSM-7 chars; long names truncated to ~30 chars or rendered "Dear <First Name>" | [industry typical] |
| AA | AA-dpdp_marketing_consent | DPDP Marketing Consent | PROMO_OPTIN_FLAG | CHAR(1) | on-event | [direct] | gates promotional category templates only; transactional/service templates exempt; DPDP requires granular separation | [industry typical] |
| AB | AB-dnd_registered | DND Registered | DND_FLAG | CHAR(1) | on-event | lookup against R | checked against TRAI DND registry at send-time; transactional category bypasses DND, promotional respects it | [industry typical] |
| AB | AB-pref_contract_note_mode | Contract Note Mode | CN_DELIVERY_MODE | CHAR(2) | on-event | [direct] | EM (email mandatory) drives daily contract-note email; PH adds physical dispatch | SEBI/HO/MIRSD/POD-1/P/CIR/2025/94 |
| AB | AB-pref_email_notifications | Email Notifications Pref | EMAIL_OPTIN_FLAG | CHAR(1) | on-event | [direct] | SEBI mandates contract notes via email; cannot be N for transactional | SEBI/HO/MIRSD/POD-1/P/CIR/2025/94 |
| AB | AB-pref_language | Preferred Language | LANG_CODE_VAR | CHAR(2) | on-event | [direct] | DLT template-ID differs per language; broker must register Hindi/regional templates separately | [industry typical] |
| AB | AB-pref_sms_notifications | SMS Notifications Pref | SMS_OPTIN_FLAG | CHAR(1) | on-event | [direct] | SEBI Dec 3, 2024 mandates SMS alerts; cannot be N; opt-out only via DND but transactional category overrides DND | SEBI/HO/MIRSD/POD-1/P/CIR/2025/94 |
| AB | AB-pref_whatsapp_notifications | WhatsApp Notifications Pref | WA_OPTIN_FLAG | CHAR(1) | on-event | [direct] | optional; WA business templates pre-approved by Meta; not under TRAI DLT but parallel pre-registration | [industry typical] |
| AB | AB-whatsapp_optin_date | WhatsApp Opt-in Date | WA_OPTIN_TS | DATE YYYYMMDD | on-event | [direct] | Meta requires explicit opt-in within last 24 months for utility template; refresh needed if older | [industry typical] |
| C | C-alternate_email | Alternate Email | CC_EMAIL | VARCHAR(100) | on-event | lowercase | typically family-member/authorized-user; SEBI does not mandate alert here | [industry typical] |
| C | C-alternate_mobile | Alternate Mobile | CC_MSISDN | CHAR(10) | on-event | derived from Y | optional CC for critical alerts (margin call, contract note); not always populated | [industry typical] |
| C | C-email | Email Address | TO_EMAIL | VARCHAR(100) | on-event | lowercase | email gateway uses TLS; bounce/complaint rate must be < 0.1% under ESP rules | [industry typical] |
| C | C-mobile_isd_code | Mobile ISD Code | COUNTRY_CODE | CHAR(5) | on-event | [direct] | prepended to MSISDN for non-IN; SMS gateway routes via international ILD for non-91 | [industry typical] |
| C | C-mobile_number | Mobile Number | RECIPIENT_MSISDN | CHAR(10) | on-event | derived from Y | strip +91/0 prefix; DLT requires 10-digit MSISDN; rejected if scrubbed against DND when transactional category not used | [industry typical] |
| G | G-account_number | Bank Account Number | ACCOUNT_LAST4 | VARCHAR(4) | on-event | truncate to N | SMS shows only last 4 digits (e.g. "A/c XX1234"); RBI masking guideline; full number never sent | [industry typical] |
| H | H-bo_id | BO ID | BO_ID_VAR | CHAR(16) | on-event | [direct] | printed in depository SMS (off-market transfer alert, pledge alert); CDSL/NSDL prescribed templates | [industry typical] |
| H | H-dp_id | DP ID | DP_ID_VAR | CHAR(8) | on-event | [direct] | printed in depository transactional templates to locate DP | [industry typical] |
| O | O-ddpi_opted | DDPI Opted | DDPI_FLAG | CHAR(1) | on-event | [direct] | if Y, depository fires "debit authorized via DDPI" SMS on each pay-in; if N, manual CDAS/SPEED-e SMS issued | SEBI/HO/MIRSD/POD-1/P/CIR/2025/94 |
| P | P-consent_electronic_communication | Electronic Communication Consent | ECN_CONSENT | CHAR(1) | on-event | [direct] | required for e-contract notes and e-statements over email; if N, only physical mode permitted | SEBI/HO/MIRSD/POD-1/P/CIR/2025/94 |
| P | P-consent_email_mobile_validation | KRA Validation SMS/Email Consent | KRA_VALIDATION_CONSENT | CHAR(1) | on-event | [direct] | KRA fires SMS/email to validate registered mobile/email; without consent, KRA cannot validate; blocks KYC | SEBI/HO/MIRSD/POD-1/P/CIR/2025/94 |
| P | P-running_account_settlement_freq | Running A/c Settlement Freq | RAS_FREQ_VAR | CHAR(2) | on-event | [direct] | 30-day inactive trigger SMS per SEBI Jan 2025; settlement-completion SMS uses this code for narrative | SEBI/HO/MIRSD/MIRSD-PoD1/P/CIR/2025/1 |
| R | R-kra_email_validated | KRA Email Validated | KRA_EMAIL_VALID_FLAG | CHAR(1) | on-event | [direct] | flag set after KRA-issued email link/OTP validated | SEBI/HO/MIRSD/POD-1/P/CIR/2025/94 |
| R | R-kra_mobile_validated | KRA Mobile Validated | KRA_MOBILE_VALID_FLAG | CHAR(1) | on-event | [direct] | flag set after KRA-issued OTP SMS validated by client; KRA blocks validation if mobile/email unvalidated | SEBI/HO/MIRSD/POD-1/P/CIR/2025/94 |
| U | U-ucc_code | UCC Code | CLIENT_CODE_VAR | VARCHAR(10) | on-event | [direct] | printed in trade-confirm SMS to identify account; mandatory per SEBI Dec 2024 alert circular | SEBI/HO/MIRSD/POD-1/P/CIR/2025/94 |
| Y | Y-account_status | Account Status | STATUS_VAR | CHAR(2) | on-event | lookup against R | populates status-change SMS body ("Your a/c is now Active/Dormant/Suspended"); auto-fired on Y01 change | SEBI/HO/MIRSD/POD-1/P/CIR/2025/94 |

## Verified through

2026-05-14

---

*AI-generated and not legal advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*

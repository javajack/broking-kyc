---
title: "Section AB: Communication Preferences — Data Flow"
description: "Where each field in Section AB: Communication Preferences flows downstream — destinations, formats, frequencies, transformations, quirks."
---

> **Why this page is structured this way:** This is the field-first view for Section AB: Communication Preferences. Each row is one field-destination relationship. To see the same data from the destination's perspective, jump from the [atlas overview](/broking-kyc/reference/field-atlas/).

## TL;DR

- **8 unique fields** in this section.
- **17 field-destination relationships** total.
- Source-of-truth field definitions: [Master Dataset](/broking-kyc/reference/master-dataset/).

## Data flow table

Sorted by `field_id`, then `destination`.

| field_id | field_name | destination | destination_field_name | destination_format | frequency | transformation | quirks_notes | spec_source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| AB-dnd_registered | DND Registered | back-office | dnd_flg | CHAR(1) | on-modify | [direct] | TRAI DND; promotional <abbr title="Short Message Service.">SMS</abbr> suppressed if Y | [industry typical] |
| AB-dnd_registered | DND Registered | dlt-comms | DND_FLAG | CHAR(1) | on-event | lookup against R | checked against TRAI DND registry at send-time; transactional category bypasses DND, promotional respects it | [industry typical] |
| AB-pref_contract_note_mode | Contract Note Mode | back-office | cn_mode_cd | VARCHAR(2) | on-modify | [direct] | EM/PH; PH triggers physical-dispatch workflow | [industry typical] |
| AB-pref_contract_note_mode | Contract Note Delivery Mode | contract-notes | DeliveryMode | CHAR(2) | on-trade | [direct] | EM=Email mandatory; PH=Physical+Email; SMS/IM channel permitted as supplement | <abbr title="National Stock Exchange of India">NSE</abbr>/INSP/52604 |
| AB-pref_contract_note_mode | Contract Note Mode | dlt-comms | CN_DELIVERY_MODE | CHAR(2) | on-event | [direct] | EM (email mandatory) drives daily contract-note email; PH adds physical dispatch | <abbr title="Securities and Exchange Board of India">SEBI</abbr>/<abbr title="Head Office (SEBI circular ID prefix)">HO</abbr>/<abbr title="Markets Intermediaries Regulation and Supervision Department (SEBI)">MIRSD</abbr>/POD-1/P/CIR/2025/94 |
| AB-pref_email_notifications | Email Notifications Pref | back-office | email_notif_flg | CHAR(1) | on-modify | [direct] | cannot be N per SEBI Dec 2024 mandate; default Y | SEBI Dec 3, 2024 SMS/Email mandate |
| AB-pref_email_notifications | Email Notification Preference | contract-notes | none | none | on-trade | [direct] | cannot be N per SEBI mandate; primary <abbr title="Electronic Contract Note.">ECN</abbr> channel | NSE/INSP/61999 |
| AB-pref_email_notifications | Email Notifications Pref | dlt-comms | EMAIL_OPTIN_FLAG | CHAR(1) | on-event | [direct] | SEBI mandates contract notes via email; cannot be N for transactional | SEBI/HO/MIRSD/POD-1/P/CIR/2025/94 |
| AB-pref_language | Language Preference | back-office | lang_pref_cd | VARCHAR(2) | on-modify | [direct] | EN/HI/etc; drives DLT-template language selection | [industry typical] |
| AB-pref_language | Preferred Language | dlt-comms | LANG_CODE_VAR | CHAR(2) | on-event | [direct] | DLT template-ID differs per language; broker must register Hindi/regional templates separately | [industry typical] |
| AB-pref_sms_notifications | SMS Notifications Pref | back-office | sms_notif_flg | CHAR(1) | on-modify | [direct] | cannot be N per SEBI Dec 2024 mandate; default Y | SEBI Dec 3, 2024 SMS/Email mandate |
| AB-pref_sms_notifications | SMS Notifications Pref | dlt-comms | SMS_OPTIN_FLAG | CHAR(1) | on-event | [direct] | SEBI Dec 3, 2024 mandates SMS alerts; cannot be N; opt-out only via DND but transactional category overrides DND | SEBI/HO/MIRSD/POD-1/P/CIR/2025/94 |
| AB-pref_statement_frequency | Statement Frequency | back-office | stmt_freq_cd | VARCHAR(2) | on-modify | [direct] | DA/WK/MN; drives statement-generation cron | [industry typical] |
| AB-pref_whatsapp_notifications | WhatsApp Notifications Pref | back-office | wa_notif_flg | CHAR(1) | on-modify | [direct] | optional; opt-in required separately | [industry typical] |
| AB-pref_whatsapp_notifications | WhatsApp Notifications Pref | dlt-comms | WA_OPTIN_FLAG | CHAR(1) | on-event | [direct] | optional; WA business templates pre-approved by Meta; not under TRAI DLT but parallel pre-registration | [industry typical] |
| AB-whatsapp_optin_date | WhatsApp Opt-In Date | back-office | wa_optin_dt | DATE YYYYMMDD | on-event | formatted | audit trail for WhatsApp opt-in | [industry typical] |
| AB-whatsapp_optin_date | WhatsApp Opt-in Date | dlt-comms | WA_OPTIN_TS | DATE YYYYMMDD | on-event | [direct] | Meta requires explicit opt-in within last 24 months for utility template; refresh needed if older | [industry typical] |

## Verified through

2026-05-14

---

*AI-generated and not legal advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*

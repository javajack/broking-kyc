---
title: Communications
description: SMS, email, and WhatsApp vendor options for OTP delivery, status updates, welcome kits, and regulatory notifications.
---

SMS, email, and WhatsApp vendor options for OTP delivery, status updates, welcome kits, and regulatory notifications. Covers DLT registration, delivery rates, and pricing.

## Vendor Comparison

| Channel | Vendor | Key Features | Regulatory |
|---------|--------|-------------|-----------|
| SMS (Recommended) | **Kaleyra / MSG91** | DLT registered. Pre-approved templates. Delivery tracking. OTP, trade confirmations, margin calls. | TRAI DLT mandate. Distinct mobile per client (SEBI Dec 2024). |
| Email (Recommended) | **AWS SES / SendGrid** | SPF, DKIM, DMARC. Digitally signed contract notes. 5-year delivery logs. | IT Act 2000. Non-tamperable ECNs. Revised format Aug 2024. |
| WhatsApp | Gupshup / Infobip / Kaleyra | OTP delivery, trade confirmations (supplementary), customer service. | Cannot replace email for contract notes per SEBI. |
| Push | Firebase / OneSignal | Mobile app notifications. Real-time alerts. | Supplementary only. |

## Communication Triggers During Onboarding

| Event | Channel | Content |
|-------|---------|---------|
| Mobile OTP | SMS + WhatsApp | 6-digit OTP, 5-min expiry |
| Email verification | Email | Verification link |
| Application submitted | Email + SMS | Confirmation with reference number |
| Maker review pending | Internal | Dashboard notification to ops team |
| Checker approval | Email + SMS | "Your account is being set up" |
| Account activated | Email + SMS + WhatsApp | Welcome kit with login credentials |
| KRA registered | Email | KRA registration confirmation |
| BO account created | Email | Demat account number notification |
| Nominee video reminder | SMS + WhatsApp | "Complete your nomination video within 30 days" |

## DLT Registration Requirements

All promotional and transactional SMS in India require TRAI DLT (Distributed Ledger Technology) registration:

- **Entity registration**: Register as a business entity on DLT platform
- **Header registration**: Register sender IDs (e.g., BROKR)
- **Template registration**: Pre-approve all message templates
- **Consent management**: Maintain consent records for promotional SMS
- **Scrubbing**: All SMS pass through DLT scrubbing before delivery

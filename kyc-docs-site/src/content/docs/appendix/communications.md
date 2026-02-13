---
title: Communications
description: SMS, email, and WhatsApp vendor options for OTP delivery, status updates, welcome kits, and regulatory notifications.
---

The onboarding flow generates a series of communications to the customer -- OTP messages, status updates, verification confirmations, and a welcome kit at the end. Post-onboarding, the broker must send contract notes, margin alerts, and regulatory notifications. This page covers the vendor options for each communication channel, the specific messages triggered during onboarding, and the DLT (Distributed Ledger Technology) registration requirements that apply to all SMS sent in India.

## Vendor Comparison

Each channel has a recommended vendor and specific regulatory requirements. SMS and email are mandatory per SEBI (Securities and Exchange Board of India) circular from December 2024; WhatsApp and push notifications are supplementary and cannot replace the mandatory channels.

| Channel | Vendor | Key Features | Regulatory |
|---------|--------|-------------|-----------|
| SMS (Recommended) | **Kaleyra / MSG91** | DLT registered. Pre-approved templates. Delivery tracking. OTP, trade confirmations, margin calls. | TRAI DLT mandate. Distinct mobile per client (SEBI Dec 2024). |
| Email (Recommended) | **AWS SES / SendGrid** | SPF, DKIM, DMARC. Digitally signed contract notes. 5-year delivery logs. | IT Act 2000. Non-tamperable ECNs (Electronic Contract Notes). Revised format Aug 2024. |
| WhatsApp | Gupshup / Infobip / Kaleyra | OTP delivery, trade confirmations (supplementary), customer service. | Cannot replace email for contract notes per SEBI. |
| Push | Firebase / OneSignal | Mobile app notifications. Real-time alerts. | Supplementary only. |

## Communication Triggers During Onboarding

The table below lists every message the system sends during the onboarding journey, from the initial OTP to the final welcome kit. You will reference this when building notification templates or debugging why a customer did not receive a specific message.

| Event | Channel | Content |
|-------|---------|---------|
| Mobile OTP | SMS + WhatsApp | 6-digit OTP, 5-min expiry |
| Email verification | Email | Verification link |
| Application submitted | Email + SMS | Confirmation with reference number |
| Maker review pending | Internal | Dashboard notification to ops team |
| Checker approval | Email + SMS | "Your account is being set up" |
| Account activated | Email + SMS + WhatsApp | Welcome kit with login credentials |
| KRA registered | Email | KRA (KYC Registration Agency) registration confirmation |
| BO account created | Email | Demat account number notification |
| Nominee video reminder | SMS + WhatsApp | "Complete your nomination video within 30 days" |

:::tip[The nominee video reminder]
Customers who opt out of nomination must complete a video verification within 30 days. If they miss the deadline, their account functionality may be restricted. The system should send reminders at day 7, day 21, and day 28.
:::

## DLT Registration Requirements

All promotional and transactional SMS in India require TRAI (Telecom Regulatory Authority of India) DLT registration. This is a one-time setup but must be completed before any SMS can be sent.

- **Entity registration**: Register as a business entity on DLT platform
- **Header registration**: Register sender IDs (e.g., BROKR)
- **Template registration**: Pre-approve all message templates
- **Consent management**: Maintain consent records for promotional SMS
- **Scrubbing**: All SMS pass through DLT scrubbing before delivery

:::note
DLT template approval can take 3-7 business days. Plan for this lead time when adding new SMS templates for features like margin calls, settlement reminders, or new regulatory notifications.
:::

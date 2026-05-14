---
title: Security & Compliance
description: Security standards the KYC system must meet — encryption, access control, API security, Aadhaar data vault, and regulatory compliance.
---

A <abbr title="Know Your Customer (process).">KYC</abbr> system handles some of the most sensitive data a person can share: their Aadhaar number, <abbr title="Permanent Account Number">PAN</abbr> (Permanent Account Number), bank account details, biometric photographs, and signed financial declarations. This page outlines the security standards and regulatory compliance requirements that govern how this data must be stored, transmitted, and accessed. If you are building or reviewing any part of the KYC stack, these are the non-negotiable guardrails.

:::caution
Violations of Aadhaar data handling rules carry criminal penalties under the Aadhaar Act, 2016. Storing raw Aadhaar numbers in application databases is illegal -- always use the Aadhaar Data Vault pattern described below.
:::

## Core Security Requirements

These are the baseline standards that every component of the KYC system must meet, regardless of which vendor or deployment environment is involved.

| Requirement | Standard |
|-------------|----------|
| Transport | TLS (Transport Layer Security) 1.2+ (HTTPS only) |
| Authentication | API keys rotated quarterly |
| IP Whitelisting | Required for <abbr title="KYC Registration Agency">KRA</abbr>, recommended for all |
| Data Encryption | AES-256 for data at rest |
| PII Handling | Mask Aadhaar (XXXX-XXXX-1234), tokenize PAN |
| Data Retention | 8 years (<abbr title="Securities and Exchange Board of India">SEBI</abbr> 2026 Regulations) |
| <abbr title="Video In-Person Verification (sometimes &quot;Video CIP&quot; / V-CIP)">VIPV</abbr> Recording | 7 years minimum (tamper-proof) |
| <abbr title="Digital Personal Data Protection Act 2023 (and Rules 2025)">DPDP</abbr> Act 2023 | Consent management, data principal rights |
| Vendor SLA | 99.9% uptime, <3s P95, India data center, SOC 2 / ISO 27001 |

In plain English: everything is encrypted in transit and at rest, sensitive identifiers are masked or tokenized, and all records must be kept for at least eight years.

## Aadhaar Data Vault

Per UIDAI (Unique Identification Authority of India) Aadhaar Data Vault specifications, there is a strict separation between how Aadhaar numbers are stored and how the rest of the application accesses them.

- Aadhaar numbers must NOT be stored in application databases
- Use a dedicated Aadhaar Data Vault with reference token mapping
- All Aadhaar access must be logged with purpose
- Data vault must support search by reference token only

You will encounter the reference token in many parts of the codebase. Whenever you see a field like `aadhaar_reference_number` instead of a raw 12-digit number, that is the data vault pattern at work.

## API Security Checklist

Every external API integration -- whether it is PAN verification, penny drop, or KRA submission -- must follow these controls.

| Control | Implementation |
|---------|---------------|
| Rate limiting | Per-API, per-client throttling |
| Request signing | HMAC-SHA256 on webhook payloads |
| Idempotency | `reference_id` on all mutable API calls |
| Timeout handling | Circuit breaker with exponential backoff |
| Credential storage | Secrets manager (never in code/config) |
| Audit logging | All API calls logged with timestamp, user, action, result |

:::tip[Idempotency matters more than you think]
KRA and <abbr title="Central KYC (records registry)">CKYC</abbr> (Central KYC) submissions can fail mid-flight due to network issues. Without a `reference_id`, retrying the same submission can create duplicate records at the registry. Always include one on mutable calls.
:::

## Regulatory Framework

The KYC system sits at the intersection of multiple regulatory regimes. You will see references to these regulations throughout the codebase and in vendor documentation.

| Regulation | Key Requirements |
|-----------|-----------------|
| SEBI (Securities and Exchange Board of India) Stock Brokers Regulations 2026 | 8-year retention, enhanced governance, capital adequacy |
| SEBI Cybersecurity Framework | CISO appointment, vulnerability assessment, incident response |
| DPDP (Digital Personal Data Protection) Act 2023 | Consent before processing, right to erasure (with exemptions for regulatory records), data localization |
| PCI DSS (Payment Card Industry Data Security Standard) | Applicable if handling payment card data (<abbr title="Unified Payments Interface">UPI</abbr>/mandate setup) |
| <abbr title="Prevention of Money Laundering Act 2002">PMLA</abbr> (Prevention of Money Laundering Act) 2002 | CDD (Customer Due Diligence), EDD (Enhanced Due Diligence) for high-risk clients, <abbr title="Suspicious Transaction Report">STR</abbr> (Suspicious Transaction Report) filing |
| IT Act 2000 | Section 65B audit trail for e-signed documents |

:::note
The DPDP Act grants customers a "right to erasure," but this right does not override SEBI's 8-year retention mandate. If a customer requests deletion of their KYC data, the compliance team must explain that regulatory records are exempt from erasure until the retention period expires.
:::

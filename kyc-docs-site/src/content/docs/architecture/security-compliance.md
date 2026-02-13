---
title: Security & Compliance
description: Security standards the KYC system must meet — encryption, access control, API security, Aadhaar data vault, and regulatory compliance.
---

Security standards the KYC system must meet — encryption, access control, API security, Aadhaar data vault requirements, and compliance with SEBI cybersecurity framework, DPDP Act 2023, and PCI DSS.

## Core Security Requirements

| Requirement | Standard |
|-------------|----------|
| Transport | TLS 1.2+ (HTTPS only) |
| Authentication | API keys rotated quarterly |
| IP Whitelisting | Required for KRA, recommended for all |
| Data Encryption | AES-256 for data at rest |
| PII Handling | Mask Aadhaar (XXXX-XXXX-1234), tokenize PAN |
| Data Retention | 8 years (SEBI 2026 Regulations) |
| VIPV Recording | 7 years minimum (tamper-proof) |
| DPDP Act 2023 | Consent management, data principal rights |
| Vendor SLA | 99.9% uptime, <3s P95, India data center, SOC 2 / ISO 27001 |

## Aadhaar Data Vault

Per UIDAI Aadhaar Data Vault specifications:

- Aadhaar numbers must NOT be stored in application databases
- Use a dedicated Aadhaar Data Vault with reference token mapping
- All Aadhaar access must be logged with purpose
- Data vault must support search by reference token only

## API Security Checklist

| Control | Implementation |
|---------|---------------|
| Rate limiting | Per-API, per-client throttling |
| Request signing | HMAC-SHA256 on webhook payloads |
| Idempotency | `reference_id` on all mutable API calls |
| Timeout handling | Circuit breaker with exponential backoff |
| Credential storage | Secrets manager (never in code/config) |
| Audit logging | All API calls logged with timestamp, user, action, result |

## Regulatory Framework

| Regulation | Key Requirements |
|-----------|-----------------|
| SEBI Stock Brokers Regulations 2026 | 8-year retention, enhanced governance, capital adequacy |
| SEBI Cybersecurity Framework | CISO appointment, vulnerability assessment, incident response |
| DPDP Act 2023 | Consent before processing, right to erasure (with exemptions for regulatory records), data localization |
| PCI DSS | Applicable if handling payment card data (UPI/mandate setup) |
| PMLA 2002 | CDD, EDD for high-risk clients, STR filing |
| IT Act 2000 | Section 65B audit trail for e-signed documents |

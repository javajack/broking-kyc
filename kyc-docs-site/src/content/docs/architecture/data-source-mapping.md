---
title: Data Source Mapping
description: Where each field comes from — the resolution priority when DigiLocker, KRA, CKYC, and verification APIs all provide the same field.
---

During onboarding, the same piece of client information -- a name, a date of birth, an address -- can arrive from several different systems: DigiLocker, the <abbr title="KYC Registration Agency">KRA</abbr> (<abbr title="Know Your Customer (process).">KYC</abbr> Registration Agency), the <abbr title="Central KYC (records registry)">CKYC</abbr> (Central KYC) registry, a verification API, or the customer themselves. This page documents which source wins when they conflict. You will refer back to it when debugging data mismatches or trying to understand why a particular field was prefilled with a value the client did not type in.

:::tip[When to use this page]
If a QA tester or ops team member asks "where did this value come from?", the resolution priority and source-to-screen mapping below give you the answer.
:::

## Resolution Priority

When multiple sources provide the same field, the system uses a fixed precedence order to decide which value to keep.

**1. DigiLocker > 2. CKYC (<abbr title="Central Registry of Securitisation Asset Reconstruction and Security Interest of India">CERSAI</abbr>) > 3. KRA Fetch > 4. Verification API > 5. User Input**

**Rule:** DigiLocker wins for identity fields. KRA/CKYC win for financial profile. User input only for data no source can provide (mobile, email, segment choice).

Government-issued digital documents (DigiLocker) are treated as the highest-authority source per [<abbr title="Securities and Exchange Board of India">SEBI</abbr>/<abbr title="Head Office (SEBI circular ID prefix)">HO</abbr>/<abbr title="Markets Intermediaries Regulation and Supervision Department (SEBI)">MIRSD</abbr>/DOP/CIR/P/2020/73](/broking-kyc/reference/circulars/sebi-mirsd/#sebihomirsddopcirp202073). Registry records (CKYC/KRA) take precedence over third-party verification services, which in turn take precedence over customer-entered data.

## Field Distribution (~454 Total)

The table below shows how the roughly 454 fields in the master dataset break down by origin. The vast majority are system-generated -- timestamps, status codes, and audit logs that the customer never sees.

| Source | Category | Examples |
|--------|----------|----------|
| System Generated | Largest share of total fields | Timestamps, IDs, status codes, audit logs, API responses, submission tracking |
| KRA/CKYC Prefill | Regulatory profile fields | Occupation, income, net worth, <abbr title="Foreign Account Tax Compliance Act (US)">FATCA</abbr>, <abbr title="Politically Exposed Person">PEP</abbr>, signature, CKYC number |
| DigiLocker | Government identity fields | Name, DOB, gender, photo, full address, father's name, POI/<abbr title="Power of Attorney">POA</abbr> documents |
| Verification APIs | Verification and compliance fields | <abbr title="Permanent Account Number">PAN</abbr> status, bank name match, <abbr title="Anti-Money Laundering">AML</abbr> screening result, face match result, eSign metadata |
| **User Input** | **Minimal manual entry** | Mobile, PAN, DOB, email, bank a/c, <abbr title="Indian Financial System Code.">IFSC</abbr>, segments, marital status |

:::note
Customer manual entry is limited to fields unavailable from any government or regulatory source. This design reduces error rates in downstream KRA/CKYC/<abbr title="Unique Client Code">UCC</abbr> submissions per SEBI data quality requirements.
:::

## Source-to-Screen Mapping

This table connects the nine onboarding screens to their primary data sources. When investigating a bug on a specific screen, this tells you which integration to look at first.

| Screen | Primary Source | Fields Filled | User Input |
|--------|---------------|---------------|------------|
| Screen 1 | User + <abbr title="One-Time Password">OTP</abbr> | Mobile, email | 1-2 fields |
| Screen 2 | User + async APIs | PAN, DOB + KRA/CKYC/AML results | 2 fields |
| Screen 3 | DigiLocker | Identity fields (name, DOB, gender, address, photo, father's name) | 0 fields (redirect) |
| Screen 4 | Pre-filled from Screen 1-3 | Name, DOB, gender, address confirmed | 1 field (email) |
| Screen 5 | User + Bank Verification | Bank account, IFSC, beneficiary name | 3 fields |
| Screen 6 | User toggles + KRA prefill | Segment preferences, income range | Toggles only |
| Screen 7 | User | Nominee details | Variable |
| Screen 8 | System | Declaration checkboxes | Checkboxes |
| Screen 9 | Review + Verification APIs | Face match result, eSign | 0 fields (OTP) |

:::caution
Screen 3 (DigiLocker) and Screen 9 (eSign) involve zero user-typed fields, but both involve redirects to external systems. If these screens appear to hang, the issue is almost always on the external service side or a network timeout -- not a problem with the form logic.
:::

---
title: Minor & Joint Accounts
description: KYC requirements for minor accounts (with guardian) and joint demat accounts — additional fields, validation rules, and vendor handling.
---

KYC requirements for minor accounts (with guardian) and joint demat accounts. These account types require additional fields, different validation rules, and special handling across vendor integrations.

:::note
Minor and joint accounts are planned for a future phase. This page documents the requirements identified across vendor specs.
:::

## Minor Accounts

### Requirements
- Guardian PAN and KYC mandatory
- Guardian must be natural guardian (parent) or court-appointed
- Minor's PAN required (4th char = P)
- Minor's DOB must confirm age < 18
- Account converts to individual on turning 18 (re-KYC required)

### Vendor Handling
- **CDSL**: Guardian details in Line 01, minor flag set. Disability flag if applicable.
- **NSDL**: Guardian details in UDiFF record. Mandatory guardian KYC.
- **KRA**: Minor category with guardian sub-record
- **Exchange UCC**: Minor client type with guardian PAN

## Joint Accounts (Demat Only)

### Requirements
- Up to 3 holders (1st holder + 2 joint holders)
- Each holder needs full KYC (PAN, Aadhaar, address)
- Operating mode: Single / Joint / Anyone or Survivor
- Nomination applies to entire joint holding

### Vendor Handling
- **CDSL**: Lines 03-04 for 2nd/3rd holder details
- **NSDL**: Joint holder records in UDiFF format
- **Exchange UCC**: 1st holder is the trading account holder
- **eSign**: All holders must sign (multi-signatory workflow via Leegality)

## Fields (Section W — 26 Fields)

| Category | Fields | Notes |
|----------|--------|-------|
| Guardian Details | 8 fields | Name, PAN, relationship, KYC status, address |
| Joint Holder 1 | 8 fields | Name, PAN, Aadhaar, KYC, signature |
| Joint Holder 2 | 8 fields | Same as Joint Holder 1 |
| Operating Mode | 2 fields | Mode code + description |

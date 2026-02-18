---
title: Minor & Joint Accounts
description: KYC requirements for minor accounts (with guardian) and joint demat accounts — additional fields, validation rules, and vendor handling.
---

Minor accounts (for customers under 18) and joint demat accounts are special account types that add layers of complexity to the standard individual onboarding flow. A minor account requires a guardian with their own completed KYC. A joint account requires full KYC for up to three holders, each of whom must independently sign the application. This page documents the requirements for both account types and how each vendor integration handles them.

:::note
Minor and joint accounts are planned for a future phase. This page documents the requirements identified across vendor specs.
:::

## Minor Accounts

### Requirements
- Guardian PAN (Permanent Account Number) and KYC mandatory
- Guardian must be natural guardian (parent) or court-appointed
- Minor's PAN required (4th char = P)
- Minor's DOB (Date of Birth) must confirm age < 18
- Account converts to individual on turning 18 (re-KYC required)

### Vendor Handling

Each external system has its own mechanism for representing the guardian-minor relationship.

- **CDSL**: Guardian details in Line 01, minor flag set. Disability flag if applicable.
- **NSDL**: Guardian details in UDiFF (Unified Document Interchange Flat File) record. Mandatory guardian KYC.
- **KRA**: Minor category with guardian sub-record
- **Exchange UCC (Unique Client Code)**: Minor client type with guardian PAN

:::caution
When a minor turns 18, the account must be converted to a regular individual account through a re-KYC process. This is not automatic -- the system should trigger a notification 30 days before the `date_of_majority` field (W12) to give the ops team time to initiate the conversion. If the conversion is not completed, the account must be frozen per SEBI (Securities and Exchange Board of India) guidelines.
:::

## Joint Accounts (Demat Only)

### Requirements
- Up to 3 holders (1st holder + 2 joint holders)
- Each holder needs full KYC (PAN, Aadhaar, address)
- Operating mode: Single / Joint / Anyone or Survivor
- Nomination applies to entire joint holding

### Vendor Handling

Joint accounts multiply the data capture and verification effort since each holder goes through essentially the same KYC process as a standalone individual.

- **CDSL**: Lines 03-04 for 2nd/3rd holder details
- **NSDL**: Joint holder records in UDiFF format
- **Exchange UCC**: 1st holder is the trading account holder
- **eSign**: All holders must sign (multi-signatory eSign workflow)

## Fields (Section W -- 26 Fields)

| Category | Fields | Notes |
|----------|--------|-------|
| Guardian Details | 8 fields | Name, PAN, relationship, KYC status, address |
| Joint Holder 1 | 8 fields | Name, PAN, Aadhaar, KYC, signature |
| Joint Holder 2 | 8 fields | Same as Joint Holder 1 |
| Operating Mode | 2 fields | Mode code + description |

:::tip[Why joint accounts are demat-only]
Trading accounts in India are always single-holder. Joint holding applies only to the demat (depository) account. This means the 1st holder is the one who places trades and whose income/risk profile governs segment activation, while the 2nd and 3rd holders are co-owners of the securities held in the demat account.
:::

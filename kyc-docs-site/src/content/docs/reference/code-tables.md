---
title: Code Tables
description: Lookup values for every dropdown and coded field — occupation codes, KRA status codes, PAN status codes, and other reference data.
---

Lookup values for every dropdown and coded field — occupation codes, state codes, country codes, relationship types, income ranges, and other reference data used across KRA, CKYC, and exchange submissions.

## Occupation Codes (KRA/CKYC)

| Code | Description |
|------|-------------|
| 01 | Private Sector Service |
| 02 | Public Sector Service |
| 03 | Government Service |
| 04 | Business |
| 05 | Professional |
| 06 | Agriculturist |
| 07 | Retired |
| 08 | Housewife |
| 09 | Student |
| 11 | Self Employed |
| 99 | Others (specify) |

## KRA Status Codes

| Status | Trading | Action |
|--------|---------|--------|
| KYC Registered | **Allowed** | Fetch and prefill |
| KYC Validated | **Allowed** | Fetch and prefill |
| Under Process | **Blocked** | Wait for KRA validation |
| On Hold | **Blocked** | Resolve discrepancy |
| KYC Rejected | **Blocked** | Re-submit corrected KYC |
| Not Available | N/A | Fresh KYC required |

## PAN Status Codes

| Code | Description | Onboarding |
|------|-------------|-----------|
| E / valid | Existing and Valid | Proceed |
| F | Fake / Invalid | Reject |
| X | Deactivated | Reject |
| D | Deleted | Reject |
| N | Not Found | Reject |

## Income Range Codes

| Code | Range | Used By |
|------|-------|---------|
| 01 | Below Rs. 1 Lakh | KRA, Exchange UCC |
| 02 | Rs. 1-5 Lakh | KRA, Exchange UCC |
| 03 | Rs. 5-10 Lakh | KRA, Exchange UCC |
| 04 | Rs. 10-25 Lakh | KRA, Exchange UCC |
| 05 | Rs. 25 Lakh - 1 Crore | KRA, Exchange UCC |
| 06 | Above Rs. 1 Crore | KRA, Exchange UCC |

## Client Category Codes (MCX)

| Code | Description | Income Proof |
|------|-------------|-------------|
| HE | Hedger | Required |
| SP | Speculator | Required |
| AR | Arbitrageur | Required |

## Application Status Codes

| Status | Phase | Description |
|--------|-------|-------------|
| REGISTERED | User Journey | Mobile verified |
| PAN_ENTERED | User Journey | Async checks in flight |
| DIGILOCKER_PENDING | User Journey | Waiting for DigiLocker consent |
| FILLING | User Journey | Completing Screens 4-8 |
| GATE_CHECK | User Journey | Blocking gate evaluation |
| GATE_FAILED | User Journey | A blocking check failed |
| e_SIGNED | Submitted | Aadhaar OTP e-Sign complete |
| UNDER_REVIEW | Admin | In maker-checker queue |
| APPROVED | Admin | Checker signed off |
| REJECTED | Admin | Checker rejected |
| REGISTERING | Batch | Agency pipelines running |
| ACTIVE | Complete | Can trade |

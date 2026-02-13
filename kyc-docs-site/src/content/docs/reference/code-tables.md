---
title: Code Tables
description: Lookup values for every dropdown and coded field — occupation codes, KRA status codes, PAN status codes, and other reference data.
---

This page collects all the coded lookup values used across the KYC system -- the values behind every dropdown, every status field, and every coded response from external systems. You will not read this cover-to-cover, but you will come back to it frequently when building form dropdowns, parsing API responses, or investigating why a record was rejected by the KRA (KYC Registration Agency) or an exchange.

:::tip[Quick navigation]
Use Ctrl+F to search for a specific code. If you see a two-digit code in a database record or API response and do not know what it means, this is the page to check.
:::

## Occupation Codes (KRA/CKYC)

These codes are used in the KRA submission file and the CKYC (Central KYC) upload. The occupation dropdown on the onboarding form maps directly to these values.

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

You will encounter these statuses when the system performs a KRA lookup by PAN (Permanent Account Number). The status determines whether the customer can trade and how the onboarding flow should proceed.

| Status | Trading | Action |
|--------|---------|--------|
| KYC Registered | **Allowed** | Fetch and prefill |
| KYC Validated | **Allowed** | Fetch and prefill |
| Under Process | **Blocked** | Wait for KRA validation |
| On Hold | **Blocked** | Resolve discrepancy |
| KYC Rejected | **Blocked** | Re-submit corrected KYC |
| Not Available | N/A | Fresh KYC required |

:::caution
"On Hold" is the status that generates the most support tickets. It typically means there is a mismatch between the name or address in the KRA record and what SEBI (Securities and Exchange Board of India) validation checks expect. The ops team must review the discrepancy and either correct the data or escalate to the KRA for resolution.
:::

## PAN Status Codes

These come back from the PAN verification API (NSDL/Protean). Any status other than "E" or "valid" is a hard stop -- the onboarding cannot proceed.

| Code | Description | Onboarding |
|------|-------------|-----------|
| E / valid | Existing and Valid | Proceed |
| F | Fake / Invalid | Reject |
| X | Deactivated | Reject |
| D | Deleted | Reject |
| N | Not Found | Reject |

## Income Range Codes

These codes are submitted to the KRA and the exchanges as part of UCC (Unique Client Code) registration. The customer selects an income range on the onboarding form; the system stores the corresponding code.

| Code | Range | Used By |
|------|-------|---------|
| 01 | Below Rs. 1 Lakh | KRA, Exchange UCC |
| 02 | Rs. 1-5 Lakh | KRA, Exchange UCC |
| 03 | Rs. 5-10 Lakh | KRA, Exchange UCC |
| 04 | Rs. 10-25 Lakh | KRA, Exchange UCC |
| 05 | Rs. 25 Lakh - 1 Crore | KRA, Exchange UCC |
| 06 | Above Rs. 1 Crore | KRA, Exchange UCC |

## Client Category Codes (MCX)

MCX (Multi Commodity Exchange) requires a client category code during UCC registration. All three categories require income proof documentation.

| Code | Description | Income Proof |
|------|-------------|-------------|
| HE | Hedger | Required |
| SP | Speculator | Required |
| AR | Arbitrageur | Required |

## Application Status Codes

These are internal application statuses that track where a customer is in the onboarding journey. You will see them in the admin dashboard and in the application status API.

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

:::note
The transition from "e_SIGNED" to "UNDER_REVIEW" happens automatically when the customer completes the e-Sign step. From "APPROVED" to "REGISTERING," the system kicks off the batch pipeline that submits to the KRA, CKYC, exchanges, and depositories. "ACTIVE" is set only after all external registrations succeed.
:::

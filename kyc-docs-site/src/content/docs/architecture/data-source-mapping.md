---
title: Data Source Mapping
description: Where each field comes from — the resolution priority when DigiLocker, KRA, CKYC, and vendor APIs all provide the same field.
---

Where each field comes from — the resolution priority when DigiLocker, KRA, CKYC, and vendor APIs all provide the same field. DigiLocker wins for identity, KRA wins for financial profile, vendor APIs win for real-time verification results.

## Resolution Priority

When multiple sources provide the same field:

**1. DigiLocker > 2. CKYC (CERSAI) > 3. KRA Fetch > 4. Vendor API > 5. User Input**

**Rule:** DigiLocker wins for identity fields. KRA/CKYC win for financial profile. User input only for data no source can provide (mobile, email, segment choice).

## Field Distribution (~454 Total)

| Source | Fields | % | Examples |
|--------|--------|---|----------|
| System Generated | ~350+ | 77% | Timestamps, IDs, status codes, audit logs, API responses, submission tracking |
| KRA/CKYC Prefill | ~40 | 9% | Occupation, income, net worth, FATCA, PEP, signature, CKYC number |
| DigiLocker | ~25 | 5.5% | Name, DOB, gender, photo, full address, father's name, POI/POA |
| Vendor APIs | ~25 | 5.5% | PAN status, bank name match, AML score, face match, e-Sign metadata |
| **User Types** | **~12** | **3%** | Mobile, PAN, DOB, email, bank a/c, IFSC, segments, marital status |

## Source-to-Screen Mapping

| Screen | Primary Source | Fields Filled | User Input |
|--------|---------------|---------------|------------|
| Screen 1 | User + OTP | Mobile, email | 1-2 fields |
| Screen 2 | User + async APIs | PAN, DOB + KRA/CKYC/AML results | 2 fields |
| Screen 3 | DigiLocker | ~25 identity fields | 0 fields (redirect) |
| Screen 4 | Pre-filled from Screen 1-3 | Name, DOB, gender, address confirmed | 1 field (email) |
| Screen 5 | User + Penny Drop | Bank account, IFSC, beneficiary name | 3 fields |
| Screen 6 | User toggles + KRA prefill | Segment preferences, income range | Toggles only |
| Screen 7 | User | Nominee details | Variable |
| Screen 8 | System | Declaration checkboxes | Checkboxes |
| Screen 9 | Review + APIs | Face match, e-Sign | 0 fields (OTP) |

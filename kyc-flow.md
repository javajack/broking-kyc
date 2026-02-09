# KYC Onboarding Flow — Optimized for Minimal User Input

**Version**: 2.0
**Date**: 2026-02-10
**Philosophy**: Reduce, Reuse, Recycle — Never ask the user what we already know
**Companion Documents**: [KYC_MASTER_DATASET.md](./KYC_MASTER_DATASET.md) | [VENDOR_INTEGRATIONS.md](./VENDOR_INTEGRATIONS.md)

---

## Table of Contents

1. [Design Principles](#1-design-principles)
2. [Flow Summary](#2-flow-summary)
3. [Screen-by-Screen Specification](#3-screen-by-screen-specification)
4. [Async Operations Map](#4-async-operations-map)
5. [Blocking Gate Logic](#5-blocking-gate-logic)
6. [Data Source Resolution](#6-data-source-resolution)
7. [Field-Level Source Mapping](#7-field-level-source-mapping)
8. [Batch Processing Pipeline](#8-batch-processing-pipeline)
9. [Error Handling & Edge Cases](#9-error-handling--edge-cases)
10. [KYC Admin Workflow](#10-kyc-admin-workflow)
11. [Status Machine](#11-status-machine)
12. [HTML Merge Plan](#12-html-merge-plan)
13. [Diagrams Index](#13-diagrams-index)

---

## 1. Design Principles

| # | Principle | Implementation |
|---|-----------|----------------|
| 1 | **Mobile-first registration** | Start with mobile OTP verification before any KYC data. Establishes the identity anchor and communication channel for all subsequent OTPs and notifications. |
| 2 | **DigiLocker-first** | Force Aadhaar + PAN fetch via DigiLocker consent. This harvests ~25 identity fields with zero typing. |
| 3 | **Aadhaar via DigiLocker** | DigiLocker consent flow provides Aadhaar eKYC without needing the user to type their Aadhaar number into our app. Strongest identity anchor with IPV exemption. |
| 4 | **Pre-fill everything** | DigiLocker + KRA + CKYC together cover ~90 identity/financial fields. User only confirms. |
| 5 | **Async verification** | PAN verify, KRA lookup, CKYC search, AML screening — all fire in parallel while user is on DigiLocker screen. |
| 6 | **Minimal user typing** | Target: ~12 fields typed by user (mobile, PAN, DOB, email, bank a/c, IFSC, a/c type + toggles). |
| 7 | **e-Sign everything** | Single Aadhaar OTP e-Sign on the complete application. No physical signatures. |
| 8 | **Batch submission** | KRA, CKYC, UCC, BO account — all submitted async after maker-checker approval. User never waits. |
| 9 | **IPV exemption** | Aadhaar eKYC (via DigiLocker) exempts IPV/VIPV requirement per SEBI circular. Saves one step. |
| 10 | **Progressive disclosure** | Only show fields relevant to user's choices (F&O income proof, FATCA details, PEP details). |
| 11 | **Fail fast, fail gracefully** | If blocking check fails (PAN invalid, AML hit), stop user before e-Sign. Don't waste their time. |

---

## 2. Flow Summary

```
USER JOURNEY (9 screens, ~6 minutes)
═══════════════════════════════════════

Screen 1: Mobile / Email Registration (1 field: mobile + OTP)
    └──▶ ASYNC: Device Fingerprint [Bureau.id]

Screen 2: Enter PAN + DOB (2 fields)
    ├──▶ ASYNC: PAN Verify [Decentro]
    ├──▶ ASYNC: KRA Lookup [Digio]
    ├──▶ ASYNC: CKYC Search [Decentro]
    └──▶ ASYNC: AML/PEP Screen [TrackWizz]

Screen 3: DigiLocker Consent (redirect — 0 fields)
    └──▶ Harvests: Name, DOB, Gender, Photo, Address, Father's Name, PAN doc

Screen 4: Confirm Identity (1 field: email)
    └──▶ Mobile already verified from Screen 1. Everything else pre-filled.

Screen 5: Bank Account (3 fields: account no, IFSC, type)
    └──▶ ASYNC: Penny Drop [Decentro]

Screen 6: Trading Preferences (segment checkboxes)
    └──▶ Conditional: Income proof upload if F&O/Commodity
    └──▶ ASYNC: Income verify [Perfios/Setu AA] (if F&O)

Screen 7: Nominations (add nominee or opt-out)

Screen 8: Declarations (FATCA, PEP, RDD, T&C checkboxes)
    └──▶ BLOCKING GATE: All async checks must pass

Screen 9: Review + Selfie + e-Sign
    ├──▶ Face Match [HyperVerge] — selfie vs Aadhaar photo
    └──▶ Aadhaar OTP e-Sign [Digio]

═══════════════════════════════════════
USER DONE. Everything below is async.
═══════════════════════════════════════

MAKER-CHECKER REVIEW:
    Step 10: Maker — auto-approve if all checks pass; manual review for edge cases
    Step 11: Checker — final approval (mandatory before any batch processing)

BATCH ZONE (parallel agency pipelines, after checker approval):
    ├─→ KRA Pipeline:   Submit → Under Process → Registered → Validated (2-3 days)
    ├─→ CKYC Pipeline:  Upload → Queued → Validated → KIN Generated (4-5 days)
    ├─→ NSE Pipeline:   UCC Submit → PAN Verify → Approved → Trading Active (same day)
    ├─→ BSE Pipeline:   UCC Submit → 3-Param PAN Verify → Approved → Segments Live (same day)
    ├─→ MCX Pipeline:   UCC Submit → Income Verify → Approved (next working day, if commodity)
    ├─→ CDSL Pipeline:  BO File → KYC Check → Bank Valid → Active (1-2 hrs API)
    ├─→ NSDL Pipeline:  UDiFF Submit → CDS Process → DPM Update → PAN Flag → Active (~15 days)
    └─→ Income Pipeline: Perfios/AA verify → Confirmed (1-2 hrs, if F&O)

FINAL GATE: KRA Registered + BO Active + UCC Approved → ACTIVE (can trade)
TOTAL: Client active in 24-72 hours
```

**See**: [diagrams/01-onboarding-flow.svg](./diagrams/01-onboarding-flow.svg)

---

## 3. Screen-by-Screen Specification

### Screen 1: Mobile / Email Registration

| Attribute | Value |
|-----------|-------|
| **Purpose** | Establish the identity anchor and OTP communication channel before any KYC data is captured |
| **User input** | 1 field: Mobile Number (10 digits, starting with 6-9) |
| **Validation** | Mobile: 10 digits starting with 6-9. OTP sent via SMS for verification. |
| **Fallback** | Email registration if mobile OTP fails 3 times |
| **Async triggers** | Device fingerprinting (Bureau.id) — 200+ risk signals |
| **UX note** | Clean entry screen with single mobile field and "Send OTP" button |
| **Time** | ~30 seconds |

### Screen 2: PAN + Date of Birth

| Attribute | Value |
|-----------|-------|
| **Purpose** | Capture the two identity keys that unlock all downstream data lookups |
| **User input** | 2 fields: PAN (10 chars ABCDE1234F), Date of Birth |
| **Validation** | PAN: regex `[A-Z]{5}[0-9]{4}[A-Z]` + 4th char type check. DOB: valid date, age >= 18 |
| **Async triggers** | On submit, fire 4 parallel API calls (see Section 4) |
| **UX note** | Show spinner "Verifying your details..." while redirecting to DigiLocker |
| **Master Dataset fields** | A01 (PAN), A20 (DOB) |
| **Time** | ~20 seconds |

### Screen 3: DigiLocker Consent (Redirect)

| Attribute | Value |
|-----------|-------|
| **Purpose** | Consent-based fetch of Aadhaar XML + PAN document from DigiLocker |
| **User input** | 0 fields (user enters Aadhaar number + OTP on DigiLocker) |
| **Login** | Aadhaar number + OTP on DigiLocker site. OTP sent fresh here. |
| **Documents fetched** | Aadhaar eKYC XML, PAN Card (issued document) |
| **Data harvested** | A05-A08 (name parts), A15 (father's name), A18 (gender), A20 (DOB), B01-B08 (full address), Q01 (photo), D01-D07 (POI auto-set as Aadhaar), E01-E07 (POA auto-set as Aadhaar) |
| **Total fields populated** | ~25 fields with zero user effort |
| **Vendor** | DigiLocker Official API via Digio |
| **IPV impact** | Aadhaar eKYC via DigiLocker = IPV/VIPV exempted (SEBI circular) |
| **Time** | ~60 seconds (redirect + consent + return) |

### Screen 4: Confirm Identity

| Attribute | Value |
|-----------|-------|
| **Purpose** | Show pre-filled identity data for user confirmation + capture email |
| **Pre-filled (read-only)** | Name, DOB, Gender, Father's Name, Full Address, Photo, PAN — from DigiLocker |
| **Pre-filled (from KRA/CKYC, if found)** | Occupation, Income Range, Net Worth, CKYC Number, Signature |
| **User input** | 1 field: Email (C03). Mobile already verified on Screen 1. |
| **Optional** | Mother's Name (A16), Occupation (F01 — if not pre-filled from KRA) |
| **Validation** | Email: standard format. |
| **UX note** | Pre-filled fields shown in green/read-only cards. User can flag "this is wrong" (rare) |
| **Time** | ~30 seconds |

### Screen 5: Bank Account

| Attribute | Value |
|-----------|-------|
| **Purpose** | Capture primary bank account for fund settlement |
| **User input** | 3 fields: Account Number (G01), IFSC Code (G03), Account Type (G07 — dropdown) |
| **Auto-filled from IFSC** | Bank Name (G02), Branch Name (G04), Branch City (G05), MICR Code (G06) — via RBI IFSC master |
| **Document** | Upload: Cancelled cheque or bank statement image (G08) — OCR via HyperVerge |
| **Async trigger** | Penny Drop verification (Decentro) — Rs.1 IMPS credit + name match |
| **Validation** | IFSC: 11 chars (4 alpha + 0 + 6 alphanum). Account: 9-18 digits. |
| **UX note** | Auto-populate bank/branch as user types IFSC. Show penny drop status inline. |
| **Time** | ~45 seconds |

### Screen 6: Trading Preferences

| Attribute | Value |
|-----------|-------|
| **Purpose** | Select trading segments and risk preferences |
| **User input** | Segment toggles: Equity/Cash (L01, default ON), F&O (L02), Currency (L03), Commodity (L04) |
| **Conditional** | If F&O or Commodity selected → show income proof upload (L08) |
| **Pre-filled (from KRA)** | If KRA record exists with segment info, pre-select those segments |
| **Income proof** | Upload ITR / 6-month bank statement / salary slip / CA certificate |
| **SEBI threshold** | F&O: Annual income >= Rs.10 lakh (or net worth as proxy) |
| **Async trigger** | Income verification fires if F&O/Commodity selected (Perfios/Setu AA) |
| **UX note** | Equity pre-checked. Clear messaging: "F&O requires income proof" |
| **Time** | ~30 seconds (longer if uploading income proof) |

### Screen 7: Nominations

| Attribute | Value |
|-----------|-------|
| **Purpose** | Add nominee(s) or explicitly opt out |
| **Option A** | Add nominee: Name (I02), Relationship (I03), DOB (I04), Allocation % (I05) |
| **Option B** | "I choose to opt out of nomination" checkbox |
| **Max nominees** | Up to 10 (SEBI Jan 2025 circular). Total allocation must = 100% |
| **Opt-out impact** | Requires video declaration (scheduled async, within 30 days) |
| **Pre-filled** | If KRA/CKYC has nominee data, pre-fill first nominee |
| **UX note** | Start with 1 nominee form. "Add another" button. Clear % allocation UI. |
| **Time** | ~30 seconds (1 nominee) to ~2 min (multiple) |

### Screen 8: Declarations + Blocking Gate

| Attribute | Value |
|-----------|-------|
| **Purpose** | Regulatory declarations + consent checkboxes + blocking gate verification |
| **User input** | Checkboxes (all mandatory except DDPI): |
| | - FATCA: "I am a tax resident of India only" (J01 — Y/N) |
| | - PEP: "I am NOT a PEP / related to PEP" (K01 — Y/N) |
| | - RDD: "I have read the Risk Disclosure Document" (P03) |
| | - T&C: "I accept Terms & Conditions" (P01) |
| | - RAS: "I authorize quarterly running account settlement" (AC01) |
| | - DDPI: "I opt-in to DDPI" (O01 — toggle, optional) |
| **Conditional** | If FATCA = non-India → expand FATCA fields (J04-J15: country, TIN, GIIN) |
| | If PEP = Yes → expand PEP details (K02-K08: position, organization) |
| **Blocking gate** | Before proceeding, all async checks must have completed and passed (see Section 5) |
| **UX note** | Show gate status: "PAN ✓ | AML ✓ | Bank ✓ | PAN-Aadhaar Link ✓" |
| **Time** | ~30 seconds |

### Screen 9: Review + Face Match + e-Sign

| Attribute | Value |
|-----------|-------|
| **Purpose** | Final review, biometric verification, legally binding signature |
| **Step 1** | Scroll-through review of complete pre-filled application |
| **Step 2** | Selfie capture → Face match against Aadhaar photo (HyperVerge) |
| | - Threshold: ≥ 80% match score + liveness detection pass |
| | - Anti-spoofing: print attack, screen replay, mask detection |
| **Step 3** | Aadhaar OTP e-Sign (Digio) on the complete application PDF |
| | - Generate PDF with all data → SHA-256 hash → CCA-compliant DSC |
| | - User receives OTP on Aadhaar-linked mobile → signs |
| **IPV/VIPV** | EXEMPTED — Aadhaar eKYC (DigiLocker) used for identity verification |
| **Output** | Signed PDF stored as Q02 (e-Sign document) |
| **Time** | ~60 seconds |

---

## 4. Async Operations Map

### 4.1 Real-Time Async (fired during user journey)

| Trigger Point | API Call | Vendor | Ref | Expected Response Time | What It Provides |
|--------------|----------|--------|-----|----------------------|-----------------|
| Screen 1 submit | Device Fingerprint | Bureau.id | V11 | 1-2 seconds | Device risk score, emulator detection, synthetic identity flags |
| Screen 2 submit | PAN Verification | Decentro | V1 | 2-5 seconds | PAN status (E/F/X/D/N), name on PAN, PAN-Aadhaar link status |
| Screen 2 submit | KRA Lookup | Digio | V4 | 3-8 seconds | KRA status, if found: full KYC record (identity + financial profile) |
| Screen 2 submit | CKYC Search | Decentro | V5 | 3-8 seconds | CKYC number (masked), if found: can trigger download |
| Screen 2 submit | AML/PEP Screening | TrackWizz | V10 | 5-15 seconds | AML risk score, PEP match, sanctions list match, risk level |
| Screen 5 submit | Penny Drop | Decentro | V3 | 10-30 seconds | Account holder name, name match %, UTR reference |
| Screen 6 submit | Income Verify (if F&O) | Perfios/Setu AA | V12 | 1-2 hours | Verified income bracket |
| Screen 9 selfie | Face Match | HyperVerge | V9 | 3-5 seconds | Match score, liveness score, spoof detection |
| Screen 9 OTP | e-Sign | Digio | V6 | 5-10 seconds | Signed PDF, signature metadata, certificate chain |

### 4.2 Timing Strategy

```
TIMELINE (seconds from start):
 0s    User enters mobile number on Screen 1 → OTP sent
 30s   Screen 1 done → device fingerprint complete
 50s   User enters PAN + DOB on Screen 2 → 4 async APIs fire
 55s   User redirected to DigiLocker (Screen 3)
 115s  DigiLocker complete, return to Screen 4
       ├── By now: PAN verify complete (took ~3s)
       ├── By now: KRA lookup complete (took ~5s)
       ├── By now: CKYC search complete (took ~5s)
       └── By now: AML screening complete (took ~10s)
       → All 4 async results ready BEFORE user needs them
 145s  Email entered (Screen 4)
 190s  Bank account entered (Screen 5) → penny drop fires
 220s  User on Screen 6 (segments) → penny drop completes (~20s)
 250s  Nominations (Screen 7)
 280s  User on Screen 8 (declarations) → blocking gate check
       → All 5 checks should be complete by now
 310s  Screen 9: Face match + e-Sign
 370s  DONE. ~6 minutes total.
```

The key insight: **DigiLocker takes ~60 seconds**, which is exactly the time buffer needed for all 4 parallel API calls to complete. The user never waits for verification results.

---

## 5. Blocking Gate Logic

Before the user can proceed to e-Sign (Screen 9), ALL of these must be true:

| # | Check | Source | Pass Criteria | Fail Action |
|---|-------|--------|---------------|-------------|
| 1 | PAN Valid | Decentro PAN API | Status = `E` (exists and valid) | Show error: "PAN is invalid or inactive. Please verify." |
| 2 | PAN-Aadhaar Linked | Decentro PAN API | `aadhaar_seeding_status` = `Y` | Show error: "Your PAN and Aadhaar are not linked. Please link at incometax.gov.in" |
| 3 | AML Clean | TrackWizz API | Risk level = `LOW` or `MEDIUM` | If HIGH: Block. Route to manual review queue. |
| 4 | PEP Check | TrackWizz API | No PEP match OR user declared PEP (enhanced CDD) | If undeclared PEP match: Flag for admin review |
| 5 | Penny Drop Success | Decentro Penny Drop | Bank response = success + name match ≥ 70% | Show error: "Bank verification failed. Please check account details." |

### Gate Display (Screen 8)

```
┌─────────────────────────────────────────┐
│  Verification Status                     │
│  ✓ PAN Verified          (0:03)         │
│  ✓ PAN-Aadhaar Linked    (0:03)         │
│  ✓ AML Screening Clear   (0:10)         │
│  ✓ Bank Account Verified (0:25)         │
│                                          │
│  [Proceed to e-Sign →]                   │
└─────────────────────────────────────────┘
```

If any check is still pending (rare, only if APIs are slow):
```
│  ⟳ Bank Account Verifying...  (retrying) │
│                                           │
│  [Waiting for verification...]            │
```

If any check fails:
```
│  ✗ PAN-Aadhaar Not Linked                │
│    Please link at incometax.gov.in        │
│    [I've linked it → Retry Check]         │
```

---

## 6. Data Source Resolution

When multiple sources provide the same field, resolution priority:

```
1. DigiLocker (Government source of truth)
   └── Wins for: Name, DOB, Gender, Address, Photo, Father's Name

2. CKYC (CERSAI — cross-sector verified)
   └── Wins for: CKYC Number, additional ID types

3. KRA (Market-sector verified)
   └── Wins for: Occupation, Income, Net Worth, FATCA, PEP status, Signature

4. Vendor API (Real-time verification)
   └── Wins for: PAN status, Bank verification, AML score, Face match

5. User Input (Fallback for unique data)
   └── Required for: Mobile, Email, DOB, Bank A/C, IFSC, Segments, Nominations
```

### Cross-Validation Rules

| Field | Primary Source | Cross-Validate Against | Action on Mismatch |
|-------|---------------|----------------------|-------------------|
| Name | DigiLocker (Aadhaar) | PAN Verify (Protean) | If >20% different → flag for admin review |
| Name | DigiLocker (Aadhaar) | Penny Drop (bank name) | If name match <70% → penny drop fails |
| PAN | User input (Screen 2) | DigiLocker (PAN doc) | Must match exactly. If not → error. |
| DOB | User input (Screen 2) | DigiLocker (Aadhaar) | Must match. DigiLocker wins. Log discrepancy. |
| Address | DigiLocker (Aadhaar) | KRA/CKYC (if exists) | DigiLocker wins. KRA/CKYC for correspondence. |

**See**: [diagrams/02-data-source-mapping.svg](./diagrams/02-data-source-mapping.svg)

---

## 7. Field-Level Source Mapping

### Section A: Personal Identity (~22 fields)

| Field ID | Field Name | Source | Screen | User Action |
|----------|-----------|--------|--------|-------------|
| A01 | PAN | User types | 2 | Type |
| A03 | Application Number | System generated | — | None |
| A04 | KYC Type (New/Modify) | System logic | — | None |
| A05 | First Name | DigiLocker (Aadhaar XML) | 4 | Confirm (read-only) |
| A06 | Middle Name | DigiLocker (Aadhaar XML) | 4 | Confirm (read-only) |
| A07 | Last Name | DigiLocker (Aadhaar XML) | 4 | Confirm (read-only) |
| A08 | Full Name | DigiLocker (Aadhaar XML) | 4 | Confirm (read-only) |
| A09-A14 | Alternate Names | Not captured (minimal flow) | — | None |
| A15 | Father's Name | DigiLocker (PAN doc) | 4 | Confirm (read-only) |
| A16 | Mother's Name | Optional user input | 4 | Optional type |
| A17 | Spouse Name | Not captured initially | — | None |
| A18 | Gender | DigiLocker (Aadhaar XML) | 4 | Confirm (read-only) |
| A19 | Marital Status | Not captured initially (minimal flow) | — | None |
| A20 | DOB | User types (Screen 2), confirmed via DigiLocker | 2 | Type |
| A21 | Citizenship | Default: Indian | — | None |
| A22 | Residential Status | Default: Resident Individual | — | None |

### Section B: Address (~8 fields)

| Field ID | Field Name | Source | Screen | User Action |
|----------|-----------|--------|--------|-------------|
| B01 | House/Building | DigiLocker (Aadhaar XML) | 4 | Confirm |
| B02 | Street/Road | DigiLocker (Aadhaar XML) | 4 | Confirm |
| B03 | Landmark | DigiLocker (Aadhaar XML) | 4 | Confirm |
| B04 | Locality/Area | DigiLocker (Aadhaar XML) | 4 | Confirm |
| B05 | City/Town | DigiLocker (Aadhaar XML) | 4 | Confirm |
| B06 | District | DigiLocker (Aadhaar XML) | 4 | Confirm |
| B07 | State | DigiLocker (Aadhaar XML) | 4 | Confirm |
| B08 | Pincode | DigiLocker (Aadhaar XML) | 4 | Confirm |

### Section C: Contact (~4 fields)

| Field ID | Field Name | Source | Screen | User Action |
|----------|-----------|--------|--------|-------------|
| C01 | Mobile Number | User types | 1 | Type + OTP verify |
| C02 | Alternate Mobile | Not captured | — | None |
| C03 | Email | User types | 4 | Type |
| C04 | Alternate Email | Not captured | — | None |

### Section D-E: POI/POA (~14 fields)

| Field ID | Field Name | Source | Screen | User Action |
|----------|-----------|--------|--------|-------------|
| D01-D07 | POI fields | Auto-set: Aadhaar (via DigiLocker) | — | None |
| E01-E07 | POA fields | Auto-set: Aadhaar (via DigiLocker) | — | None |

### Section F: Financial Profile (~8 fields)

| Field ID | Field Name | Source | Screen | User Action |
|----------|-----------|--------|--------|-------------|
| F01 | Occupation | KRA prefill OR user selects | 4 | Select if not pre-filled |
| F02 | Organization | Not captured initially | — | None |
| F03 | Annual Income Range | KRA prefill OR system default | — | Confirm if pre-filled |
| F04 | Net Worth | KRA prefill | — | None |
| F05 | Net Worth Date | System generated | — | None |
| F06 | Source of Wealth | KRA prefill OR default: Salary | — | None |

### Section G: Bank Account (~8 fields)

| Field ID | Field Name | Source | Screen | User Action |
|----------|-----------|--------|--------|-------------|
| G01 | Account Number | User types | 5 | Type |
| G02 | Bank Name | IFSC lookup (RBI master) | 5 | Auto-filled |
| G03 | IFSC Code | User types | 5 | Type |
| G04 | Branch Name | IFSC lookup (RBI master) | 5 | Auto-filled |
| G05 | Branch City | IFSC lookup (RBI master) | 5 | Auto-filled |
| G06 | MICR Code | IFSC lookup (RBI master) | 5 | Auto-filled |
| G07 | Account Type | User selects | 5 | Dropdown (Savings/Current) |
| G08 | Cheque/Statement Image | User uploads | 5 | Upload |

### Section I: Nominations (~6 fields per nominee)

| Field ID | Field Name | Source | Screen | User Action |
|----------|-----------|--------|--------|-------------|
| I01 | Nomination opted | User selects | 7 | Yes/No toggle |
| I02 | Nominee Name | User types (or KRA prefill) | 7 | Type |
| I03 | Relationship | User selects | 7 | Dropdown |
| I04 | Nominee DOB | User types | 7 | Date picker |
| I05 | Allocation % | User enters | 7 | Number |
| I06 | Guardian (if minor) | User types (if nominee is minor) | 7 | Conditional |

### Section J-K: FATCA/PEP (~4 fields normally)

| Field ID | Field Name | Source | Screen | User Action |
|----------|-----------|--------|--------|-------------|
| J01 | India-only tax resident | User selects | 8 | Checkbox (default: Yes) |
| J02-J15 | FATCA details | User types (only if J01 = No) | 8 | Conditional |
| K01 | PEP status | User declares | 8 | Checkbox (default: No) |
| K02-K08 | PEP details | User types (only if K01 = Yes) | 8 | Conditional |

### Section L: Trading Segments (~6 fields)

| Field ID | Field Name | Source | Screen | User Action |
|----------|-----------|--------|--------|-------------|
| L01 | Equity/Cash | Default: ON | 6 | Toggle (pre-checked) |
| L02 | F&O | User toggles | 6 | Toggle |
| L03 | Currency Derivatives | User toggles | 6 | Toggle |
| L04 | Commodity | User toggles | 6 | Toggle |
| L05 | Mutual Funds | Not in initial flow | — | None |
| L08 | Income Proof | User uploads (if F&O/Commodity) | 6 | Conditional upload |

### Sections N-Q: IPV, DDPI, Consent, Docs

| Field ID | Field Name | Source | Screen | User Action |
|----------|-----------|--------|--------|-------------|
| N01-N08 | IPV fields | Auto-set: EXEMPTED (Aadhaar eKYC) | — | None |
| O01 | DDPI opt-in | User toggles | 8 | Optional toggle |
| P01-P06 | Consent checkboxes | User checks | 8 | Checkboxes |
| Q01 | Photo | DigiLocker (Aadhaar) | — | None |
| Q02 | e-Sign document | System generated | 9 | Aadhaar OTP |

### Sections R-AC: System/Async (~300+ fields)

All fields in Sections R (verification results), S (KRA submission), T (CKYC submission), U (exchange registration), V-AC (NRI, lifecycle, audit, DPDP, communication, RAS) are **entirely system-generated** during async batch processing. Zero user involvement.

---

## 8. Batch Processing Pipeline

After maker-checker approval (Step 11), the following batch pipelines run in parallel:

### Per-Agency Pipelines

Each agency has its own multi-step sequence, but agencies run **in parallel** after checker approval.

```
Checker Approved
  │
  ├─→ [KRA Pipeline]     Submit → Under Process → Registered → Validated (2-3 days)
  ├─→ [CKYC Pipeline]    Upload → Queued → Validated → KIN Generated (4-5 days)
  ├─→ [NSE Pipeline]     UCC Submit → PAN Verify → Approved → Trading Active (same day)
  ├─→ [BSE Pipeline]     UCC Submit → 3-Param PAN Verify → Approved → Segments Live (same day)
  ├─→ [MCX Pipeline]     UCC Submit → Income Verify → Approved (next working day, if commodity)
  ├─→ [CDSL Pipeline]    BO File → KYC Check → Bank Valid → Active (1-2 hrs API)
  ├─→ [NSDL Pipeline]    UDiFF Submit → CDS Process → DPM Update → PAN Flag → Active (~15 days)
  └─→ [Income Pipeline]  Perfios/AA verify → Confirmed (1-2 hrs, if F&O)

  Final Gate: KRA Registered + BO Active + UCC Approved → ACTIVE (can trade)
```

### Post-Activation

| Job | Vendor | Output | SLA |
|-----|--------|--------|-----|
| Segment Activation | NSE/BSE/MCX | Segments live | Same day |
| Back-Office Sync | 63 Moons ODIN | Client master record | Immediate |
| Welcome Kit | Kaleyra + AWS SES | Email + SMS sent | On activation |
| Nominee Video | HyperVerge | Video declaration recorded | Within 30 days (if opt-out) |
| Running Account Settlement | Internal | RAS schedule initialized | On activation |

**See**: [diagrams/03-async-batch-processing.svg](./diagrams/03-async-batch-processing.svg)

### Job Queue Architecture

```
                    ┌──────────────────┐
  Checker Approved → │ Event Bus (Kafka)│
                    └──────┬───────────┘
                           │
           ┌───────────────┼───────────────┐
           │               │               │
     ┌─────▼─────┐  ┌─────▼─────┐  ┌─────▼─────┐
     │ Queue: KRA │  │Queue: CKYC│  │Queue:Income│
     │ (Digio)    │  │(Decentro) │  │ (Perfios)  │
     └─────┬──────┘  └─────┬─────┘  └─────┬─────┘
           │               │               │
           └───────┬───────┘               │
                   │                       │
           ┌───────▼───────────────────────▼──┐
           │  All run in parallel              │
           └───────────────┬──────────────────┘
                           │
           ┌───────────────┼───────────────┐
           │               │               │
     ┌─────▼────┐   ┌─────▼────┐   ┌─────▼────┐
     │Queue: NSE│   │Queue: BSE│   │Queue:CDSL│
     │   UCC    │   │   UCC    │   │  BO Acct │
     └──────────┘   └──────────┘   └──────────┘
```

---

## 9. Error Handling & Edge Cases

### 9.1 DigiLocker Failures

| Scenario | Handling |
|----------|----------|
| User cancels DigiLocker consent | Return to Screen 2. Allow retry. After 3 attempts, offer manual document upload fallback. |
| DigiLocker service down | Show "DigiLocker is temporarily unavailable. Try again in a few minutes." Queue for retry. |
| Aadhaar XML missing fields | If address incomplete, flag for user to manually enter missing fields on Screen 4. |
| PAN document not in DigiLocker | Fallback: PAN verify API (Decentro) + user enters father's name manually. |

### 9.2 Verification Failures

| Check | Failure | User-Facing Message | System Action |
|-------|---------|---------------------|---------------|
| PAN Invalid (status ≠ E) | PAN deactivated/fake | "Your PAN appears to be inactive. Please contact your nearest PAN center." | Block onboarding. |
| PAN-Aadhaar not linked | Not seeded | "PAN-Aadhaar linking is mandatory. Visit incometax.gov.in to link." | Block. Provide link. |
| AML High Risk | Sanctions/PEP match | "Your application requires additional review. Our team will contact you." | Route to compliance team. |
| Penny Drop Failed | Wrong a/c or closed | "Bank verification failed. Please check your account number and IFSC." | Allow re-entry on Screen 5. |
| Face Match < 80% | Poor selfie/mismatch | "Face verification unsuccessful. Please try again in good lighting." | Allow 3 retries. Then manual VIPV. |
| e-Sign OTP failed | Wrong OTP / timeout | "OTP verification failed. Click to resend." | Allow 3 OTP attempts. |

### 9.3 KRA/CKYC Edge Cases

| Scenario | Handling |
|----------|----------|
| KRA record exists but status = "On Hold" | Fetch data for pre-fill but note: Trading will be blocked until KRA status updated. Admin must resolve. |
| KRA record exists with different broker | Normal. KRA is centralized. Fetch and use. Our KRA submit will add our intermediary code. |
| CKYC record exists from another sector (bank) | Great — pre-fill all matching fields. Upload new CKYC record with securities-specific additions. |
| Both KRA and CKYC exist with conflicting data | DigiLocker wins for identity. KRA wins for financial. Log discrepancy for admin review. |
| Neither KRA nor CKYC exists | Fresh KYC. DigiLocker still provides identity. Financial fields: user enters on Screen 4. |

### 9.4 Timeout Handling

| API | Expected | Timeout | Fallback |
|-----|----------|---------|----------|
| DigiLocker | 60s | 120s | Show retry button. After 3 fails, offer manual flow. |
| PAN Verify | 3s | 15s | Retry once. If still failed, queue for async check. Don't block user. |
| KRA Lookup | 5s | 20s | Pre-fill without KRA data. Submit KRA as fresh. |
| CKYC Search | 5s | 20s | Pre-fill without CKYC data. Upload as fresh. |
| AML Screen | 10s | 30s | Queue for async. Mark as "pending" in blocking gate. |
| Penny Drop | 20s | 60s | Show "verifying..." on Screen 6. Must resolve before Screen 8 gate. |

---

## 10. KYC Admin Workflow

The KYC Admin application handles the back-office side:

### 10.1 Queue Structure

```
┌─────────────────────────────────────────────────────┐
│                  KYC ADMIN DASHBOARD                 │
├─────────┬──────────┬──────────┬──────────┬──────────┤
│ Pending │ In Review│ Approved │ Rejected │ Active   │
│   (12)  │   (3)    │   (45)   │   (2)    │  (1,024) │
└─────────┴──────────┴──────────┴──────────┴──────────┘
```

### 10.2 Maker-Checker Flow

| Step | Role | Action |
|------|------|--------|
| 10 | System (Maker) | Auto-verify: PAN match, penny drop name match, face match, AML score. If ALL pass → auto-approve. |
| 10 | Ops (Maker) | If any auto-check marginal (e.g., name match 70-89%), manually review. |
| 11 | Supervisor (Checker) | Review maker's decision. Final approval — batch processing begins only after checker sign-off. |
| Esc | Compliance (Escalation) | AML high-risk cases, PEP matches, sanctions hits. |

### 10.3 Auto-Approve Criteria

Application is auto-approved (no human touch) if ALL:
- PAN status = E (valid)
- PAN-Aadhaar linked = Y
- PAN name vs DigiLocker name match ≥ 90%
- Penny drop name match ≥ 80%
- Face match score ≥ 85%
- Liveness detection = pass
- AML risk = LOW
- No PEP match
- No sanctions match
- KRA status = Registered or Validated (if exists)

**Expected auto-approve rate**: ~80-85% of applications.

---

## 11. Status Machine

```
                        ┌─────────────┐
                        │ REGISTERED  │ Mobile OTP verified (Screen 1)
                        └──────┬──────┘
                               │
                        ┌──────▼──────┐
                        │ PAN_ENTERED │ PAN + DOB submitted (Screen 2)
                        └──────┬──────┘
                               │
                        ┌──────▼──────┐
                        │  DIGILOCKER │ On DigiLocker redirect
                        │   PENDING   │
                        └──────┬──────┘
                               │
                        ┌──────▼──────┐
                        │   FILLING   │ Screen 4-8
                        └──────┬──────┘
                               │
                        ┌──────▼──────┐
                        │  GATE CHECK │ Blocking gate evaluation
                        └──────┬──────┘
                          pass │       │ fail
                        ┌──────▼──┐ ┌──▼──────────┐
                        │ e-SIGNED │ │ GATE FAILED │
                        └──────┬──┘ └─────────────┘
                               │
                        ┌──────▼──────┐
                        │   UNDER     │ Maker-checker review
                        │   REVIEW    │
                        └──────┬──────┘
                          pass │       │ fail
                    ┌──────────▼──┐ ┌──▼──────────┐
                    │  APPROVED   │ │  REJECTED   │
                    └──────┬──────┘ └─────────────┘
                           │
                    ┌──────▼──────┐
                    │ REGISTERING │ Batch pipelines (KRA + UCC + BO)
                    └──────┬──────┘
                           │
                    ┌──────▼──────┐
                    │   ACTIVE    │ Ready to trade
                    └─────────────┘
```

### Status Transitions

| From | To | Trigger |
|------|----|---------|
| — | REGISTERED | Mobile OTP verified (Screen 1 complete) |
| REGISTERED | PAN_ENTERED | PAN + DOB submitted (Screen 2), async checks fire |
| PAN_ENTERED | DIGILOCKER_PENDING | Redirected to DigiLocker (Screen 3) |
| DIGILOCKER_PENDING | FILLING | DigiLocker consent complete |
| DIGILOCKER_PENDING | PAN_ENTERED | DigiLocker cancelled (retry) |
| FILLING | GATE_CHECK | Screen 8 declarations submitted |
| GATE_CHECK | e_SIGNED | Gate passed + e-Sign complete (Screen 9) |
| GATE_CHECK | GATE_FAILED | Any blocking check failed |
| GATE_FAILED | FILLING | User corrects issue + retries |
| e_SIGNED | UNDER_REVIEW | Auto — enters maker-checker queue |
| UNDER_REVIEW | APPROVED | Checker approval (after maker review) |
| UNDER_REVIEW | REJECTED | Checker rejection |
| REJECTED | FILLING | User resubmits with corrections |
| APPROVED | REGISTERING | Batch pipelines fire (KRA, CKYC, UCC, BO) |
| REGISTERING | ACTIVE | KRA Registered + UCC Approved + BO Active |

---

## 12. HTML Merge Plan

All three MD documents will merge into a single HTML reference:

### 12.1 Document Structure

```
kyc-reference.html
├── Navigation sidebar (sticky)
│   ├── Flow Overview (from kyc-flow.md)
│   ├── Master Dataset (from KYC_MASTER_DATASET.md)
│   ├── Vendor Integrations (from VENDOR_INTEGRATIONS.md)
│   └── Diagrams (embedded SVGs)
│
├── Content sections
│   ├── kyc-flow.md → rendered as Section 1
│   ├── KYC_MASTER_DATASET.md → rendered as Section 2
│   ├── VENDOR_INTEGRATIONS.md → rendered as Section 3
│   └── SVG diagrams → inline embedded
│
└── Features
    ├── Search across all documents
    ├── Cross-reference hyperlinks between sections
    ├── Collapsible field tables
    ├── Print-friendly CSS
    └── Dark mode toggle
```

### 12.2 Build Approach

```
Option A: Static Site Generator (Recommended)
─────────────────────────────────────────────
Tool: Pandoc + custom HTML template
Command: pandoc kyc-flow.md KYC_MASTER_DATASET.md VENDOR_INTEGRATIONS.md \
         --toc --toc-depth=3 \
         --template=template.html \
         --css=styles.css \
         -o kyc-reference.html

Option B: Custom Script
───────────────────────
Build script that:
1. Parses all .md files with marked.js or markdown-it
2. Inlines SVG diagrams
3. Generates cross-reference links
4. Outputs single self-contained HTML file
```

### 12.3 Cross-Reference Map

| From (kyc-flow.md) | To (other docs) |
|---------------------|-----------------|
| Field ID references (A01, G03, etc.) | → KYC_MASTER_DATASET.md field definitions |
| Vendor references (V1, V4, etc.) | → VENDOR_INTEGRATIONS.md vendor sections |
| API call references | → VENDOR_INTEGRATIONS.md API specs |
| Diagram references | → diagrams/*.svg (inline) |

---

## 13. Diagrams Index

| # | Filename | Description |
|---|----------|-------------|
| 1 | [01-onboarding-flow.svg](./diagrams/01-onboarding-flow.svg) | Complete 9-screen user flow with async operations, maker-checker, and batch zone |
| 2 | [02-data-source-mapping.svg](./diagrams/02-data-source-mapping.svg) | Where each field comes from: DigiLocker vs KRA vs CKYC vs User vs System |
| 3 | [03-async-batch-processing.svg](./diagrams/03-async-batch-processing.svg) | Post-approval pipeline: parallel agency pipelines, intermediate statuses, retry logic |

---

## Appendix: Key Metrics

| Metric | Value |
|--------|-------|
| Total fields in Master Dataset | ~454 |
| Fields user types | ~12 |
| Fields from DigiLocker | ~25 |
| Fields from KRA/CKYC prefill | ~40 |
| Fields from vendor APIs | ~25 |
| Fields system-generated | ~350+ |
| Pre-fill rate | ~97% |
| User screens | 9 |
| Estimated user time | ~6 minutes |
| Async APIs (real-time) | 8 calls |
| Batch jobs (post approval) | 8 parallel pipelines |
| Time to active (total) | 24-72 hours |
| Auto-approve rate (expected) | 80-85% |
| Cost per onboarding (vendor APIs) | Rs.80-150 |

---

*Generated: 2026-02-10 | v2.0 | Companion: [KYC_MASTER_DATASET.md](./KYC_MASTER_DATASET.md) | [VENDOR_INTEGRATIONS.md](./VENDOR_INTEGRATIONS.md)*

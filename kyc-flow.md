# KYC Onboarding Flow — Optimized for Minimal User Input

**Version**: 1.0
**Date**: 2026-02-09
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
| 1 | **DigiLocker-first** | Force Aadhaar + PAN fetch via DigiLocker consent. This harvests ~25 identity fields with zero typing. |
| 2 | **Aadhaar-number login only** | No phone/email login for DigiLocker. Aadhaar number ensures we get the strongest identity anchor. |
| 3 | **Pre-fill everything** | DigiLocker + KRA + CKYC together cover ~90 identity/financial fields. User only confirms. |
| 4 | **Async verification** | PAN verify, KRA lookup, CKYC search, AML screening — all fire in parallel while user is on DigiLocker screen. |
| 5 | **Minimal user typing** | Target: ~12 fields typed by user (Aadhaar, PAN, mobile, email, marital status, bank a/c, IFSC, a/c type + toggles). |
| 6 | **e-Sign everything** | Single Aadhaar OTP e-Sign on the complete application. No physical signatures. |
| 7 | **Batch submission** | KRA, CKYC, UCC, BO account — all submitted async after e-Sign. User never waits. |
| 8 | **IPV exemption** | Aadhaar eKYC (via DigiLocker) exempts IPV/VIPV requirement per SEBI circular. Saves one step. |
| 9 | **Progressive disclosure** | Only show fields relevant to user's choices (F&O income proof, FATCA details, PEP details). |
| 10 | **Fail fast, fail gracefully** | If blocking check fails (PAN invalid, AML hit), stop user before e-Sign. Don't waste their time. |

---

## 2. Flow Summary

```
USER JOURNEY (8 screens, ~5 minutes)
═══════════════════════════════════════

Screen 1: Enter Aadhaar + PAN (2 fields)
    ├──▶ ASYNC: PAN Verify [Decentro]
    ├──▶ ASYNC: KRA Lookup [Digio]
    ├──▶ ASYNC: CKYC Search [Decentro]
    └──▶ ASYNC: AML/PEP Screen [TrackWizz]

Screen 2: DigiLocker Consent (redirect — 0 fields)
    └──▶ Harvests: Name, DOB, Gender, Photo, Address, Father's Name, PAN doc

Screen 3: Confirm Identity (3 fields: mobile, email, marital status)
    └──▶ Everything else pre-filled from DigiLocker + KRA/CKYC

Screen 4: Bank Account (3 fields: account no, IFSC, type)
    └──▶ ASYNC: Penny Drop [Decentro]

Screen 5: Trading Preferences (segment checkboxes)
    └──▶ Conditional: Income proof upload if F&O/Commodity

Screen 6: Nominations (add nominee or opt-out)

Screen 7: Declarations (FATCA, PEP, RDD, T&C checkboxes)
    └──▶ BLOCKING GATE: All async checks must pass

Screen 8: Review + Selfie + e-Sign
    ├──▶ Face Match [HyperVerge] — selfie vs Aadhaar photo
    └──▶ Aadhaar OTP e-Sign [Digio]

═══════════════════════════════════════
USER DONE. Everything below is async.
═══════════════════════════════════════

BATCH ZONE:
    ├── KRA Submit [Digio] ──────────── 1-3 working days
    ├── CKYC Upload [Decentro] ──────── 1-2 working days
    ├── Admin Review (maker-checker) ── < 30 min (auto-approve if all checks pass)
    ├── Income Verify [Perfios] ─────── if F&O (1-2 hours)
    ├── NSE UCC Registration ────────── same day
    ├── BSE UCC Registration ────────── same day
    ├── CDSL BO Account ─────────────── 1-2 hours
    ├── MCX UCC (if commodity) ──────── next working day
    ├── Segment Activation ──────────── same day
    ├── DDPI Setup (if opted) ───────── 1 day
    ├── Back-office sync (ODIN) ─────── immediate
    ├── Welcome Kit (email+SMS) ─────── on activation
    └── Nominee Video (if opt-out) ──── schedule within 30 days

TOTAL: Client active in 24-72 hours
```

**See**: [diagrams/01-onboarding-flow.svg](./diagrams/01-onboarding-flow.svg)

---

## 3. Screen-by-Screen Specification

### Screen 1: Start — Aadhaar + PAN Entry

| Attribute | Value |
|-----------|-------|
| **Purpose** | Capture the two identity anchors that unlock all downstream data |
| **User input** | 2 fields: Aadhaar Number (12 digits), PAN (10 chars ABCDE1234F) |
| **Validation** | Aadhaar: Verhoeff checksum. PAN: regex `[A-Z]{5}[0-9]{4}[A-Z]` + 4th char type check |
| **OTP** | Aadhaar OTP sent immediately (used for DigiLocker login on next screen) |
| **Async triggers** | On submit, fire 4 parallel API calls (see Section 4) |
| **UX note** | Show spinner "Verifying your details..." while redirecting to DigiLocker |
| **Master Dataset fields** | A01 (PAN), A02 (Aadhaar) |
| **Time** | ~30 seconds |

### Screen 2: DigiLocker Consent (Redirect)

| Attribute | Value |
|-----------|-------|
| **Purpose** | Consent-based fetch of Aadhaar XML + PAN document from DigiLocker |
| **User input** | 0 fields (user logs into DigiLocker with Aadhaar number + OTP) |
| **Login** | Force Aadhaar number login (not phone/email). User already has OTP from Screen 1. |
| **Documents fetched** | Aadhaar eKYC XML, PAN Card (issued document) |
| **Data harvested** | A05-A08 (name parts), A15 (father's name), A18 (gender), A20 (DOB), B01-B08 (full address), Q01 (photo), D01-D07 (POI auto-set as Aadhaar), E01-E07 (POA auto-set as Aadhaar) |
| **Total fields populated** | ~25 fields with zero user effort |
| **Vendor** | DigiLocker Official API via Digio |
| **IPV impact** | Aadhaar eKYC via DigiLocker = IPV/VIPV exempted (SEBI circular) |
| **Time** | ~60 seconds (redirect + consent + return) |

### Screen 3: Confirm Identity

| Attribute | Value |
|-----------|-------|
| **Purpose** | Show pre-filled identity data for user confirmation + capture missing fields |
| **Pre-filled (read-only)** | Name, DOB, Gender, Father's Name, Full Address, Photo, PAN — from DigiLocker |
| **Pre-filled (from KRA/CKYC, if found)** | Occupation, Income Range, Net Worth, CKYC Number, Signature |
| **User input** | 3 fields: Mobile (C01), Email (C03), Marital Status (A19) |
| **Optional** | Mother's Name (A16), Occupation (F01 — if not pre-filled from KRA) |
| **Validation** | Mobile: 10 digits starting with 6-9. Email: standard format. OTP verify on mobile. |
| **UX note** | Pre-filled fields shown in green/read-only cards. User can flag "this is wrong" (rare) |
| **Time** | ~45 seconds |

### Screen 4: Bank Account

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

### Screen 5: Trading Preferences

| Attribute | Value |
|-----------|-------|
| **Purpose** | Select trading segments and risk preferences |
| **User input** | Segment toggles: Equity/Cash (L01, default ON), F&O (L02), Currency (L03), Commodity (L04) |
| **Conditional** | If F&O or Commodity selected → show income proof upload (L08) |
| **Pre-filled (from KRA)** | If KRA record exists with segment info, pre-select those segments |
| **Income proof** | Upload ITR / 6-month bank statement / salary slip / CA certificate |
| **SEBI threshold** | F&O: Annual income >= Rs.10 lakh (or net worth as proxy) |
| **UX note** | Equity pre-checked. Clear messaging: "F&O requires income proof" |
| **Time** | ~30 seconds (longer if uploading income proof) |

### Screen 6: Nominations

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

### Screen 7: Declarations

| Attribute | Value |
|-----------|-------|
| **Purpose** | Regulatory declarations + consent checkboxes |
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

### Screen 8: Review + Face Match + e-Sign

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
| Screen 1 submit | PAN Verification | Decentro | V1 | 2-5 seconds | PAN status (E/F/X/D/N), name on PAN, PAN-Aadhaar link status |
| Screen 1 submit | KRA Lookup | Digio | V4 | 3-8 seconds | KRA status, if found: full KYC record (identity + financial profile) |
| Screen 1 submit | CKYC Search | Decentro | V5 | 3-8 seconds | CKYC number (masked), if found: can trigger download |
| Screen 1 submit | AML/PEP Screening | TrackWizz | V10 | 5-15 seconds | AML risk score, PEP match, sanctions list match, risk level |
| Screen 4 submit | Penny Drop | Decentro | V3 | 10-30 seconds | Account holder name, name match %, UTR reference |
| Screen 8 selfie | Face Match | HyperVerge | V9 | 3-5 seconds | Match score, liveness score, spoof detection |
| Screen 8 OTP | e-Sign | Digio | V6 | 5-10 seconds | Signed PDF, signature metadata, certificate chain |

### 4.2 Timing Strategy

```
TIMELINE (seconds from start):
 0s    User enters Aadhaar + PAN on Screen 1
 5s    Screen 1 submitted → 4 async APIs fire
 10s   User redirected to DigiLocker (Screen 2)
 60s   DigiLocker complete, return to Screen 3
       ├── By now: PAN verify complete (took ~3s)
       ├── By now: KRA lookup complete (took ~5s)
       ├── By now: CKYC search complete (took ~5s)
       └── By now: AML screening complete (took ~10s)
       → All 4 async results ready BEFORE user needs them
120s   Bank account entered (Screen 4) → penny drop fires
150s   User on Screen 5 (segments) → penny drop completes (~20s)
210s   User on Screen 7 (declarations) → blocking gate check
       → All 5 checks should be complete by now
270s   Screen 8: Face match + e-Sign
300s   DONE. ~5 minutes total.
```

The key insight: **DigiLocker takes ~60 seconds**, which is exactly the time buffer needed for all 4 parallel API calls to complete. The user never waits for verification results.

---

## 5. Blocking Gate Logic

Before the user can proceed to e-Sign (Screen 8), ALL of these must be true:

| # | Check | Source | Pass Criteria | Fail Action |
|---|-------|--------|---------------|-------------|
| 1 | PAN Valid | Decentro PAN API | Status = `E` (exists and valid) | Show error: "PAN is invalid or inactive. Please verify." |
| 2 | PAN-Aadhaar Linked | Decentro PAN API | `aadhaar_seeding_status` = `Y` | Show error: "Your PAN and Aadhaar are not linked. Please link at incometax.gov.in" |
| 3 | AML Clean | TrackWizz API | Risk level = `LOW` or `MEDIUM` | If HIGH: Block. Route to manual review queue. |
| 4 | PEP Check | TrackWizz API | No PEP match OR user declared PEP (enhanced CDD) | If undeclared PEP match: Flag for admin review |
| 5 | Penny Drop Success | Decentro Penny Drop | Bank response = success + name match ≥ 70% | Show error: "Bank verification failed. Please check account details." |

### Gate Display (Screen 7)

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
   └── Required for: Mobile, Email, Marital Status, Bank A/C, IFSC, Segments, Nominations
```

### Cross-Validation Rules

| Field | Primary Source | Cross-Validate Against | Action on Mismatch |
|-------|---------------|----------------------|-------------------|
| Name | DigiLocker (Aadhaar) | PAN Verify (Protean) | If >20% different → flag for admin review |
| Name | DigiLocker (Aadhaar) | Penny Drop (bank name) | If name match <70% → penny drop fails |
| PAN | User input (Screen 1) | DigiLocker (PAN doc) | Must match exactly. If not → error. |
| DOB | DigiLocker (Aadhaar) | KRA (if exists) | DigiLocker wins. Log discrepancy. |
| Address | DigiLocker (Aadhaar) | KRA/CKYC (if exists) | DigiLocker wins. KRA/CKYC for correspondence. |

**See**: [diagrams/02-data-source-mapping.svg](./diagrams/02-data-source-mapping.svg)

---

## 7. Field-Level Source Mapping

### Section A: Personal Identity (~22 fields)

| Field ID | Field Name | Source | Screen | User Action |
|----------|-----------|--------|--------|-------------|
| A01 | PAN | User types | 1 | Type |
| A02 | Aadhaar | User types | 1 | Type |
| A03 | Application Number | System generated | — | None |
| A04 | KYC Type (New/Modify) | System logic | — | None |
| A05 | First Name | DigiLocker (Aadhaar XML) | 3 | Confirm (read-only) |
| A06 | Middle Name | DigiLocker (Aadhaar XML) | 3 | Confirm (read-only) |
| A07 | Last Name | DigiLocker (Aadhaar XML) | 3 | Confirm (read-only) |
| A08 | Full Name | DigiLocker (Aadhaar XML) | 3 | Confirm (read-only) |
| A09-A14 | Alternate Names | Not captured (minimal flow) | — | None |
| A15 | Father's Name | DigiLocker (PAN doc) | 3 | Confirm (read-only) |
| A16 | Mother's Name | Optional user input | 3 | Optional type |
| A17 | Spouse Name | Not captured initially | — | None |
| A18 | Gender | DigiLocker (Aadhaar XML) | 3 | Confirm (read-only) |
| A19 | Marital Status | User selects | 3 | Select dropdown |
| A20 | DOB | DigiLocker (Aadhaar XML) | 3 | Confirm (read-only) |
| A21 | Citizenship | Default: Indian | — | None |
| A22 | Residential Status | Default: Resident Individual | — | None |

### Section B: Address (~8 fields)

| Field ID | Field Name | Source | Screen | User Action |
|----------|-----------|--------|--------|-------------|
| B01 | House/Building | DigiLocker (Aadhaar XML) | 3 | Confirm |
| B02 | Street/Road | DigiLocker (Aadhaar XML) | 3 | Confirm |
| B03 | Landmark | DigiLocker (Aadhaar XML) | 3 | Confirm |
| B04 | Locality/Area | DigiLocker (Aadhaar XML) | 3 | Confirm |
| B05 | City/Town | DigiLocker (Aadhaar XML) | 3 | Confirm |
| B06 | District | DigiLocker (Aadhaar XML) | 3 | Confirm |
| B07 | State | DigiLocker (Aadhaar XML) | 3 | Confirm |
| B08 | Pincode | DigiLocker (Aadhaar XML) | 3 | Confirm |

### Section C: Contact (~4 fields)

| Field ID | Field Name | Source | Screen | User Action |
|----------|-----------|--------|--------|-------------|
| C01 | Mobile Number | User types | 3 | Type + OTP verify |
| C02 | Alternate Mobile | Not captured | — | None |
| C03 | Email | User types | 3 | Type |
| C04 | Alternate Email | Not captured | — | None |

### Section D-E: POI/POA (~14 fields)

| Field ID | Field Name | Source | Screen | User Action |
|----------|-----------|--------|--------|-------------|
| D01-D07 | POI fields | Auto-set: Aadhaar (via DigiLocker) | — | None |
| E01-E07 | POA fields | Auto-set: Aadhaar (via DigiLocker) | — | None |

### Section F: Financial Profile (~8 fields)

| Field ID | Field Name | Source | Screen | User Action |
|----------|-----------|--------|--------|-------------|
| F01 | Occupation | KRA prefill OR user selects | 3 | Select if not pre-filled |
| F02 | Organization | Not captured initially | — | None |
| F03 | Annual Income Range | KRA prefill OR system default | — | Confirm if pre-filled |
| F04 | Net Worth | KRA prefill | — | None |
| F05 | Net Worth Date | System generated | — | None |
| F06 | Source of Wealth | KRA prefill OR default: Salary | — | None |

### Section G: Bank Account (~8 fields)

| Field ID | Field Name | Source | Screen | User Action |
|----------|-----------|--------|--------|-------------|
| G01 | Account Number | User types | 4 | Type |
| G02 | Bank Name | IFSC lookup (RBI master) | 4 | Auto-filled |
| G03 | IFSC Code | User types | 4 | Type |
| G04 | Branch Name | IFSC lookup (RBI master) | 4 | Auto-filled |
| G05 | Branch City | IFSC lookup (RBI master) | 4 | Auto-filled |
| G06 | MICR Code | IFSC lookup (RBI master) | 4 | Auto-filled |
| G07 | Account Type | User selects | 4 | Dropdown (Savings/Current) |
| G08 | Cheque/Statement Image | User uploads | 4 | Upload |

### Section I: Nominations (~6 fields per nominee)

| Field ID | Field Name | Source | Screen | User Action |
|----------|-----------|--------|--------|-------------|
| I01 | Nomination opted | User selects | 6 | Yes/No toggle |
| I02 | Nominee Name | User types (or KRA prefill) | 6 | Type |
| I03 | Relationship | User selects | 6 | Dropdown |
| I04 | Nominee DOB | User types | 6 | Date picker |
| I05 | Allocation % | User enters | 6 | Number |
| I06 | Guardian (if minor) | User types (if nominee is minor) | 6 | Conditional |

### Section J-K: FATCA/PEP (~4 fields normally)

| Field ID | Field Name | Source | Screen | User Action |
|----------|-----------|--------|--------|-------------|
| J01 | India-only tax resident | User selects | 7 | Checkbox (default: Yes) |
| J02-J15 | FATCA details | User types (only if J01 = No) | 7 | Conditional |
| K01 | PEP status | User declares | 7 | Checkbox (default: No) |
| K02-K08 | PEP details | User types (only if K01 = Yes) | 7 | Conditional |

### Section L: Trading Segments (~6 fields)

| Field ID | Field Name | Source | Screen | User Action |
|----------|-----------|--------|--------|-------------|
| L01 | Equity/Cash | Default: ON | 5 | Toggle (pre-checked) |
| L02 | F&O | User toggles | 5 | Toggle |
| L03 | Currency Derivatives | User toggles | 5 | Toggle |
| L04 | Commodity | User toggles | 5 | Toggle |
| L05 | Mutual Funds | Not in initial flow | — | None |
| L08 | Income Proof | User uploads (if F&O/Commodity) | 5 | Conditional upload |

### Sections N-Q: IPV, DDPI, Consent, Docs

| Field ID | Field Name | Source | Screen | User Action |
|----------|-----------|--------|--------|-------------|
| N01-N08 | IPV fields | Auto-set: EXEMPTED (Aadhaar eKYC) | — | None |
| O01 | DDPI opt-in | User toggles | 7 | Optional toggle |
| P01-P06 | Consent checkboxes | User checks | 7 | Checkboxes |
| Q01 | Photo | DigiLocker (Aadhaar) | — | None |
| Q02 | e-Sign document | System generated | 8 | Aadhaar OTP |

### Sections R-AC: System/Async (~300+ fields)

All fields in Sections R (verification results), S (KRA submission), T (CKYC submission), U (exchange registration), V-AC (NRI, lifecycle, audit, DPDP, communication, RAS) are **entirely system-generated** during async batch processing. Zero user involvement.

---

## 8. Batch Processing Pipeline

After e-Sign completion, the following jobs run asynchronously:

### Phase 1: Immediate (0-30 minutes)

| Job | Vendor | Input | Output | Retry | SLA |
|-----|--------|-------|--------|-------|-----|
| Admin Review | Internal | All verification results | Approved / Rejected | N/A | 30 min (auto-approve if all checks pass) |
| KRA Submit | Digio | KRA file (tilde-delimited) | App ref number | 3x exponential | 1-3 working days for ack |
| CKYC Upload | Decentro | CERSAI JSON payload | 14-digit KIN | 3x exponential | 1-2 working days |
| Income Verify | Perfios | ITR/bank statement | Verified income | 2x | 1-2 hours (if F&O) |

### Phase 2: Post-Approval (after Phase 1 gate)

| Job | Vendor | Input | Output | SLA |
|-----|--------|-------|--------|-----|
| NSE UCC | NSE API | PAN, Name, DOB, Segments | UCC code | Same day (batch 5PM cutoff) |
| BSE UCC | BSE API | PAN, Name, DOB | UCC code | Same day |
| CDSL BO Account | CDSL DP Module | Full KYC record | DP ID + Client ID | 1-2 hours |
| MCX UCC | MCX Portal | Full KYC (if commodity) | UCC code | Next working day |
| DDPI Setup | CDSL/NSDL | DDPI authorization | DDPI registered | 1 day (if opted) |

### Phase 3: Post-Registration

| Job | Vendor | Input | Output | SLA |
|-----|--------|-------|--------|-----|
| Segment Activation | NSE/BSE/MCX | UCC + segments | Segments live | Same day |
| Back-Office Sync | 63 Moons ODIN | Client master data | Trading + margin limits set | Immediate |
| Welcome Kit | Kaleyra + AWS SES | Client code, DP ID, UCC, credentials | Email + SMS sent | On activation |
| Nominee Video | HyperVerge | Schedule link | Video declaration recorded | Within 30 days (if opt-out) |
| Running Account Settlement | Internal | Preference (Q/M) | RAS schedule initialized | On activation |

**See**: [diagrams/03-async-batch-processing.svg](./diagrams/03-async-batch-processing.svg)

### Job Queue Architecture

```
                    ┌──────────────────┐
  e-Sign Complete → │ Event Bus (Kafka)│
                    └──────┬───────────┘
                           │
           ┌───────────────┼───────────────┐
           │               │               │
     ┌─────▼─────┐  ┌─────▼─────┐  ┌─────▼─────┐
     │ Queue: KRA │  │Queue: CKYC│  │Queue:Admin │
     │ (Digio)    │  │(Decentro) │  │ (Internal) │
     └─────┬──────┘  └─────┬─────┘  └─────┬─────┘
           │               │               │
     ┌─────▼─────┐  ┌─────▼─────┐  ┌─────▼──────┐
     │  Worker    │  │  Worker   │  │  Worker    │
     │  Process   │  │  Process  │  │  Process   │
     └─────┬──────┘  └─────┬─────┘  └─────┬─────┘
           │               │               │
           └───────┬───────┘               │
                   │                       │
           ┌───────▼───────────────────────▼──┐
           │  Dependency Gate: All Complete?    │
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
| User cancels DigiLocker consent | Return to Screen 1. Allow retry. After 3 attempts, offer manual document upload fallback. |
| DigiLocker service down | Show "DigiLocker is temporarily unavailable. Try again in a few minutes." Queue for retry. |
| Aadhaar XML missing fields | If address incomplete, flag for user to manually enter missing fields on Screen 3. |
| PAN document not in DigiLocker | Fallback: PAN verify API (Decentro) + user enters father's name manually. |

### 9.2 Verification Failures

| Check | Failure | User-Facing Message | System Action |
|-------|---------|---------------------|---------------|
| PAN Invalid (status ≠ E) | PAN deactivated/fake | "Your PAN appears to be inactive. Please contact your nearest PAN center." | Block onboarding. |
| PAN-Aadhaar not linked | Not seeded | "PAN-Aadhaar linking is mandatory. Visit incometax.gov.in to link." | Block. Provide link. |
| AML High Risk | Sanctions/PEP match | "Your application requires additional review. Our team will contact you." | Route to compliance team. |
| Penny Drop Failed | Wrong a/c or closed | "Bank verification failed. Please check your account number and IFSC." | Allow re-entry on Screen 4. |
| Face Match < 80% | Poor selfie/mismatch | "Face verification unsuccessful. Please try again in good lighting." | Allow 3 retries. Then manual VIPV. |
| e-Sign OTP failed | Wrong OTP / timeout | "OTP verification failed. Click to resend." | Allow 3 OTP attempts. |

### 9.3 KRA/CKYC Edge Cases

| Scenario | Handling |
|----------|----------|
| KRA record exists but status = "On Hold" | Fetch data for pre-fill but note: Trading will be blocked until KRA status updated. Admin must resolve. |
| KRA record exists with different broker | Normal. KRA is centralized. Fetch and use. Our KRA submit will add our intermediary code. |
| CKYC record exists from another sector (bank) | Great — pre-fill all matching fields. Upload new CKYC record with securities-specific additions. |
| Both KRA and CKYC exist with conflicting data | DigiLocker wins for identity. KRA wins for financial. Log discrepancy for admin review. |
| Neither KRA nor CKYC exists | Fresh KYC. DigiLocker still provides identity. Financial fields: user enters on Screen 3. |

### 9.4 Timeout Handling

| API | Expected | Timeout | Fallback |
|-----|----------|---------|----------|
| DigiLocker | 60s | 120s | Show retry button. After 3 fails, offer manual flow. |
| PAN Verify | 3s | 15s | Retry once. If still failed, queue for async check. Don't block user. |
| KRA Lookup | 5s | 20s | Pre-fill without KRA data. Submit KRA as fresh. |
| CKYC Search | 5s | 20s | Pre-fill without CKYC data. Upload as fresh. |
| AML Screen | 10s | 30s | Queue for async. Mark as "pending" in blocking gate. |
| Penny Drop | 20s | 60s | Show "verifying..." on Screen 5. Must resolve before Screen 7 gate. |

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
| 1 | System (Maker) | Auto-verify: PAN match, penny drop name match, face match, AML score. If ALL pass → auto-approve. |
| 2 | Ops (Maker) | If any auto-check marginal (e.g., name match 70-80%), manually review. |
| 3 | Supervisor (Checker) | Review maker's decision. Approve / reject / send back. |
| 4 | Compliance (Escalation) | AML high-risk cases, PEP matches, sanctions hits. |

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
                        │   STARTED   │ Screen 1 begun
                        └──────┬──────┘
                               │
                        ┌──────▼──────┐
                        │  DIGILOCKER │ On DigiLocker redirect
                        │   PENDING   │
                        └──────┬──────┘
                               │
                        ┌──────▼──────┐
                        │   FILLING   │ Screen 3-7
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
                        │   UNDER     │ Batch processing
                        │   REVIEW    │
                        └──────┬──────┘
                          pass │       │ fail
                    ┌──────────▼──┐ ┌──▼──────────┐
                    │  APPROVED   │ │  REJECTED   │
                    └──────┬──────┘ └─────────────┘
                           │
                    ┌──────▼──────┐
                    │ REGISTERING │ Exchange + BO
                    └──────┬──────┘
                           │
                    ┌──────▼──────┐
                    │   ACTIVE    │ Ready to trade
                    └─────────────┘
```

### Status Transitions

| From | To | Trigger |
|------|----|---------|
| STARTED | DIGILOCKER_PENDING | Screen 1 submitted |
| DIGILOCKER_PENDING | FILLING | DigiLocker consent complete |
| DIGILOCKER_PENDING | STARTED | DigiLocker cancelled (retry) |
| FILLING | GATE_CHECK | Screen 7 declarations submitted |
| GATE_CHECK | e_SIGNED | Gate passed + e-Sign complete |
| GATE_CHECK | GATE_FAILED | Any blocking check failed |
| GATE_FAILED | FILLING | User corrects issue + retries |
| e_SIGNED | UNDER_REVIEW | Auto — enters batch queue |
| UNDER_REVIEW | APPROVED | Admin approval (auto or manual) |
| UNDER_REVIEW | REJECTED | Admin rejection |
| REJECTED | FILLING | User resubmits with corrections |
| APPROVED | REGISTERING | KRA + CKYC + admin complete |
| REGISTERING | ACTIVE | UCC + BO + segments complete |

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
| 1 | [01-onboarding-flow.svg](./diagrams/01-onboarding-flow.svg) | Complete 8-screen user flow with async operations, blocking gate, and batch zone |
| 2 | [02-data-source-mapping.svg](./diagrams/02-data-source-mapping.svg) | Where each field comes from: DigiLocker vs KRA vs CKYC vs User vs System |
| 3 | [03-async-batch-processing.svg](./diagrams/03-async-batch-processing.svg) | Post e-Sign pipeline: job queues, dependency gates, retry logic, timeline |

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
| User screens | 8 |
| Estimated user time | ~5 minutes |
| Async APIs (real-time) | 7 calls |
| Batch jobs (post e-Sign) | 10-14 jobs |
| Time to active (total) | 24-72 hours |
| Auto-approve rate (expected) | 80-85% |
| Cost per onboarding (vendor APIs) | Rs.80-150 |

---

*Generated: 2026-02-09 | Companion: [KYC_MASTER_DATASET.md](./KYC_MASTER_DATASET.md) | [VENDOR_INTEGRATIONS.md](./VENDOR_INTEGRATIONS.md)*

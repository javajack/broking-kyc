---
title: CDSL BO Modifications
description: Comprehensive guide to BO account modifications — address, bank, nominee, PAN, email/mobile changes, segment activation, account closure, and dormancy.
---

All BO modifications are submitted via the **BO Modify Upload API** using the same Line 01-07 file structure as account opening. Only modified fields need to contain new values; unchanged fields retain existing data.

> Back to [CDSL Overview](/broking-kyc/vendors/depositories/cdsl/)

---

## 1. Overview

| Aspect | Details |
|--------|---------|
| **API** | POST /v1/bo/modify (same structure as BO Setup Upload API) |
| **File Upload** | `BO_MODIFY_{DPID}_{YYYYMMDD}_{SEQ}.txt` |
| **Processing** | Online: 1-2 hours; Batch: next working day |
| **Maker-Checker** | Required in CDAS (Maker sets up, Checker verifies and releases) |
| **Print Rule** | On modification: Line Code 0 (header) + all fields of modified Line Code printed |
| **Nominee Print Rule** | If nominee modified: Line Code 0 + ALL Line Code 07 fields printed (modified + unmodified) |
| **Joint Holder Print Rule** | Address changes: Line Codes 01, 02, 03 all printed |
| **Auto-Propagation** | Address changes automatically downloaded to all companies where BO holds securities |
| **CDSL Communiques** | DP-408, DP-304, DP-5565 |

---

## 2. Address Change

### 2.1 Process Flow

```
Step 1: Client submits address change request to DP
   - Online: Via broker app/portal
   - Offline: Physical form + supporting documents
   |
Step 2: DP validates supporting documents
   - Acceptable: Aadhaar, Passport, Utility Bill (<3 months),
     Voter ID, Driving License, Bank Statement
   - Third-party address: Additional KYC for third party required
     (DP must obtain PoI + PoA for third party as well)
   |
Step 3: Maker creates modification in CDAS
   - BO Modify file: Line 02 (Address Details) updated
   - Correspondence address and/or Permanent address
   |
Step 4: Checker verifies and releases
   - Cross-validates documents against entered address
   |
Step 5: CDSL processes modification
   - Address change auto-propagated to ALL companies where BO holds securities
   |
Step 6: Confirmation sent to client (SMS + email)
```

---

## 3. Bank Account Modification

### 3.1 Process Flow

```
Step 1: Client requests bank account change
   - Add new bank / Change primary bank / Delete bank (keep min 1)
   |
Step 2: DP collects supporting documents
   - Cancelled cheque leaf (new bank)
   - Bank statement header (new bank)
   - Self-attested ID proof
   |
Step 3: DP verifies new bank account
   - Penny drop verification (Rs. 1 credit via IMPS)
   - IFSC validation against RBI directory
   - Account holder name match with BO name
   |
Step 4: Maker creates modification in CDAS (Line 05)
   |
Step 5: Checker verifies and releases
   |
Step 6: CDSL processes update (typically same day)
   - All future corporate action payouts to new/updated bank
```

### 3.2 Bank Modification Rules

| Rule | Details |
|------|---------|
| **Minimum Banks** | Must maintain at least 1 bank account |
| **Maximum Banks** | Up to 5 bank accounts per BO |
| **Primary Bank** | Exactly 1 must be marked as primary |
| **Verification** | New bank must be penny-drop verified before submission |
| **NRI Accounts** | NRE account for NRE demat; NRO account for NRO demat (must match) |
| **Name Match** | Bank account holder name must match BO name (or joint holder) |

---

## 4. Nominee Update

### 4.1 SEBI Nomination Rules (January 10, 2025)

Circular: SEBI/HO/MIRSD/MIRSD-PoD-1/P/CIR/2025/3 (Jan 10, 2025)
Amendment: SEBI Feb 28, 2025 (clarifications)
Extension: SEBI Jul 2025 (Phase II & III implementation extension)

| Aspect | Details |
|--------|---------|
| **Maximum Nominees** | 10 (increased from 3) |
| **Effective Date** | March 1, 2025 |
| **Mandatory Fields** | Name, relationship, percentage, address, email, mobile, one ID (PAN or DL or last 4 Aadhaar digits) |
| **Percentage** | Must total exactly 100.00% across all nominees |
| **Minor Nominee** | Guardian details mandatory (name, PAN, relationship, address) |
| **POA/DDPI Restriction** | Person acting under POA/DDPI CANNOT add/modify nominees |
| **Default Distribution** | If percentages not specified, equal distribution |
| **Non-Compliance** | Account frozen for debits |
| **Record Retention** | 8 years post-transmission |

### 4.2 Nomination Update Process

```
Step 1: Client initiates nomination change
   Option A: Online via broker portal (OTP verified)
   Option B: Physical nomination form (signed by all holders)
   |
Step 2: Populate nominee details (for each nominee, up to 10):
   - Full name, Relationship code (SP/CH/PA/SI/OT)
   - Percentage share, Full address (line 1, city, state, pincode)
   - Email ID (mandatory since Mar 2025)
   - Mobile number (mandatory since Mar 2025)
   - One ID: PAN or DL number or last 4 digits of Aadhaar
   - DOB; If minor: Guardian name, PAN, relationship, address
   |
Step 3: Maker enters in CDAS (Line 07 updated; ALL nominees sent)
   |
Step 4: Checker verifies (percentages = 100%, guardian for minors)
   |
Step 5: CDSL processes update (T+0 via API)
```

### 4.3 Opt-Out Process (Decline Nomination)

```
Step 1: Client declares opt-out of nomination
   |
Step 2: Online process:
   - OTP verification to registered mobile/email
   - PLUS one of:
     a) Video recording by the regulated entity, OR
     b) Physical acknowledgment at DP office
   |
Step 3: DP uploads opt-out to CDSL (Line 07: Flag='N', OptOut='Y', Video='Y')
   |
Step 4: CDSL marks account as "Nomination Opted Out"
```

### 4.4 Simplified Transmission (On Death of Holder)

Per SEBI Jan 2025 circular:

| Document | Required? | Notes |
|----------|-----------|-------|
| Death certificate | **Yes** | Mandatory |
| Nominee's KYC documents | **Yes** | Updated KYC |
| Affidavit | **No** | Removed by SEBI |
| Indemnity bond | **No** | Removed by SEBI |
| Undertaking / Attestation / Notarization | **No** | All removed by SEBI |

- **Joint accounts**: Surviving holders need only death certificate (no KYC re-verification)
- **Unclaimed portions**: Frozen in original account with enhanced due diligence
- **Liability protection**: Post-transmission claims are between nominee(s) and claimants only, without reference to regulated entities

---

## 5. Email / Mobile Update

| Step | Details |
|------|---------|
| 1 | Client submits change request (online or offline) |
| 2 | New email verified via OTP to new email |
| 3 | New mobile verified via OTP to new mobile |
| 4 | Maker updates in CDAS: Line 02 (mobile, email fields) |
| 5 | Checker verifies and releases |
| 6 | Confirmation sent to BOTH old and new contact details |

:::caution
Mobile and Email are part of the 6 mandatory KYC attributes. Changes must be propagated to KRA + Exchange (UCC) within 10 working days.
:::

---

## 6. PAN Correction

Per CDSL Notification CDSL/OPS/DP/POLCY/2024/657 (October 30, 2024):

| Step | Details |
|------|---------|
| 1 | BO submits PAN correction request with self-attested PAN copy |
| 2 | DP stamps PAN copy: "Verified with original" + "PAN verified with income tax site" |
| 3 | DP verifies PAN on protean-tinpan.com |
| 4 | DP matches BO's signature on PAN copy with signature in CDAS |
| 5 | For partnership/trust/HUF: First and last 3 pages of deeds |
| 6 | For mergers: Merger docs + new entity PAN |
| 7 | Maker creates modification in CDAS (Line 01) |
| 8 | Checker processes by T+2 working days |
| 9 | Cross-system sync: KRA + Exchange + CKYC must be updated |

---

## 7. Segment Activation / Deactivation

Segment activation is primarily an **exchange-level operation** (UCC), not a CDSL BO modification. The depository does not enforce segment-level restrictions on BO accounts.

| Segment | Exchange(s) | Income Proof | Process |
|---------|-------------|-------------|---------|
| CM (Equity) | NSE, BSE | No (default) | Auto with UCC |
| FO (Derivatives) | NSE, BSE | Yes (min Rs. 10L) | UCC modify at exchange |
| CD (Currency) | NSE, BSE, MSE | No | UCC modify at exchange |
| COM (Commodity) | MCX, NCDEX | Yes (mandatory) | UCC modify at exchange |
| SLB | NSE, BSE | Separate agreement | SLB agreement with broker |

---

## 8. BO Account Closure

### 8.1 Regulatory Framework

| Aspect | Details |
|--------|---------|
| **SEBI Mandate** | DPs with online services MUST provide online closure facility |
| **Circular** | SEBI/HO/MRD/MRD-PoD-1/P/CIR/2024/168 (Dec 2024) |
| **Effective Date** | July 14, 2025 (new procedures) |
| **Client Right** | BO shall NOT be required to give reasons for closure (online mode) |

### 8.2 Closure Process

```
Step 1: Client initiates closure (online: no reason required; or physical ACRF)
   |
Step 2: Pre-conditions check:
   [ ] All free securities transferred to target BO account
   [ ] No outstanding dues (AMC, transaction charges)
   [ ] No pending corporate actions
   [ ] All pledges released (unpledged)
   [ ] No frozen/suspended securities
   [ ] No pending inter-depository transfers
   |
Step 3a: No dues --> DP closes within 2 working days
Step 3b: Dues exist --> DP notifies within 2 days; client pays within 30 days
   |
Step 4: Securities transferred to target BO via Account Transfer (ACCTRANSFER)
   |
Step 5: Account status = "Closed" in CDAS
   |
Step 6: Closure confirmation within 2 working days (SMS + email)
```

### 8.3 Special Securities During Closure

| Security Type | Transfer Rules |
|---------------|---------------|
| **Free securities** | Standard transfer |
| **Locked-in** | Intra-CDSL: standard; Cross-depository: Corporate Action mechanism |
| **Pledged** | Must be unpledged first |
| **Frozen** | Permitted with identical PAN pattern within same depository; freeze maintained |
| **Suspended** | Cannot be transferred until lifted |

### 8.4 Dormancy and Reactivation

| Aspect | Details |
|--------|---------|
| **Dormant** | No transactions for 12+ months |
| **Reactivation** | Request to DP + updated KYC (PAN, address proof, photo) |
| **Timeline** | 2-3 working days |

---

## 9. BO Modification Summary Matrix

| Modification | File Line | Timeline | Key Documents | Cross-System Sync |
|-------------|-----------|----------|--------------|-------------------|
| Address Change | Line 02 | Same day | Address proof | KRA (10 days) |
| Bank Add/Change | Line 05 | Same day | Cheque + penny drop | Exchange (10 days) |
| Nominee Update | Line 07 | T+0 | Nom form + OTP | N/A |
| Nominee Opt-Out | Line 07 | T+0 | Video + declaration | N/A |
| Email/Mobile | Line 02 | Same day | OTP (old + new) | KRA + Exchange (10 days) |
| PAN Correction | Line 01 | T+2 | PAN copy + IT verify | KRA + Exchange + CKYC |
| Segment Activation | N/A | 1-2 days | Income proof | Exchange UCC |
| DDPI Activation | Line 06 | ~24 hours | eSign + stamp duty | N/A |
| Account Closure | Closure API | 2 working days | ACRF + transfer | Exchange UCC deactivation |

---

## Related Pages

- [CDSL Overview](/broking-kyc/vendors/depositories/cdsl/) — Core BO integration spec
- [DDPI Deep Dive](/broking-kyc/vendors/depositories/cdsl-ddpi/) — DDPI activation is a BO modification
- [MTF & Pledge Deep Dive](/broking-kyc/vendors/depositories/cdsl-mtf-pledge/) — Pledge operations on modified accounts
- [Integration Guide](/broking-kyc/vendors/depositories/cdsl-integration-guide/) — UAT environments and SEBI circulars

---
title: CDSL BO Modifications
description: Comprehensive guide to BO account modifications — address, bank, nominee, PAN, email/mobile changes, segment activation, account closure, and dormancy.
---

Once a Beneficiary Owner (BO) demat account is opened in CDSL (Central Depository Services Limited), the client's life does not stop changing. They move houses, switch banks, get married, have children who become nominees, correct a misspelled name, or eventually decide to close the account altogether. Every one of these changes must be reflected in CDSL's records, and many of them must also be propagated to KRA (KYC Registration Agency), stock exchanges, and CKYC (Central KYC Registry). As an engineer, you will build the modification workflows that handle these changes — and you need to understand which file lines to update, which documents to collect, and which downstream systems must be notified. By the end of this page, you will know how to implement every major type of BO modification through CDSL's CDAS (Central Depository Accounting System).

Changing bank details on a BO account is like updating your address with the post office — except here, CDSL automatically tells every company whose shares you hold, so dividends and corporate action payouts reach the right account.

> Back to [CDSL Overview](/broking-kyc/vendors/depositories/cdsl/)

---

Before diving into specific modification types, it is important to understand the common mechanics that apply to all BO modifications. The overview below covers the API, file naming, processing modes, and the maker-checker workflow that CDSL mandates for every change.

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

In plain English: all modifications use the same BO Modify API and the same file structure as account opening. You only populate the fields that are changing — everything else retains its existing value. The maker-checker workflow means one person enters the change and a different person must approve it before CDSL processes it.

:::note[Same file structure, different purpose]
The BO Modify file uses the exact same Line 01-07 format as the BO Setup file. If you have already built the BO Setup file generator, you can reuse most of that code for modifications. The key difference is that in a modify file, unchanged fields are left as-is rather than populated from scratch.
:::

---

Address changes are one of the most common modifications and have a unique property: CDSL automatically propagates the new address to every company (registrar/transfer agent) where the BO holds securities. This means a single address change in CDSL can trigger hundreds of downstream updates. Understanding this auto-propagation is important for setting client expectations.

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

:::tip[PoI and PoA are not Power of Attorney]
In this context, PoI means "Proof of Identity" and PoA means "Proof of Address" — not Power of Attorney. This is a common source of confusion in KYC documentation. When CDSL says "PoA required for third-party address," they mean the DP (Depository Participant) must collect address proof, not a legal authorization document.
:::

---

Bank account changes directly affect where clients receive their dividend payouts and other corporate action proceeds. This modification requires additional verification (penny drop) to prevent fraud, and has strict rules about maintaining at minimum one bank account at all times.

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

:::caution
The penny drop verification (Rs. 1 credit via IMPS) must succeed before you submit the bank change to CDSL. If you submit a bank account that fails penny drop later, the client may miss dividend payouts. Always verify first, submit second. Also ensure the IFSC (Indian Financial System Code) is validated against the current RBI directory — bank branches merge and close, and stale IFSCs will cause failed payouts.
:::

---

Nomination rules changed significantly in January 2025, with SEBI (Securities and Exchange Board of India) increasing the maximum number of nominees from 3 to 10, making email and mobile mandatory for each nominee, and simplifying the transmission process after a holder's death. If your system was built before this circular, it almost certainly needs updating.

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
| **POA/DDPI Restriction** | Person acting under POA (Power of Attorney) / DDPI (Demat Debit and Pledge Instruction) CANNOT add/modify nominees |
| **Default Distribution** | If percentages not specified, equal distribution |
| **Non-Compliance** | Account frozen for debits |
| **Record Retention** | 8 years post-transmission |

:::caution
If a client does not provide nomination details and does not explicitly opt out (with video verification), the account will be frozen for debits. This means the client cannot sell shares or transfer securities. Your onboarding flow must handle nomination as a mandatory step — either the client provides nominees or goes through the opt-out process with video recording.
:::

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

:::note[All nominees must be sent every time]
When updating nominees, you must send the complete list of all nominees in the Line 07 section — not just the one being added or changed. CDSL replaces the entire nominee list with whatever you send. If you send only the new nominee, all existing nominees will be removed. This is a common integration mistake that causes production incidents.
:::

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

In plain English: opting out of nomination is deliberately harder than providing nominees. SEBI wants to discourage opt-outs because they complicate inheritance. The video verification requirement ensures the client is making a conscious, informed decision.

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

:::tip[Simplified transmission is a major improvement]
Before the Jan 2025 circular, transmitting securities after a holder's death required affidavits, indemnity bonds, notarizations, and often took months. SEBI removed all of these for accounts with nominees. If the account has a valid nominee, the only documents needed are the death certificate and the nominee's KYC. This dramatically simplifies your transmission workflow — design it as a streamlined, compassionate process.
:::

---

Email and mobile updates may seem routine, but they carry outsized importance in the Indian securities ecosystem. These are two of the six mandatory KYC attributes that SEBI requires to be consistent across the depository, KRA, and exchange records. A mismatch can trigger compliance flags and even trading restrictions.

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

In plain English: when a client changes their mobile number, you must update it in three places — CDSL, KRA, and the exchange UCC (Unique Client Code) records — within 10 working days. Your system should automate this cross-system propagation rather than relying on manual processes.

---

PAN (Permanent Account Number) corrections are rare but critically important. A PAN links a client's identity across the entire financial system — depository, exchanges, KRA, CKYC (Central KYC Registry), and the income tax department. Getting a PAN correction wrong can disconnect a client from their own securities. The process is deliberately rigorous.

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

:::caution
PAN correction triggers a mandatory update across KRA, all exchanges where the client has a UCC, and CKYC. Failing to propagate the PAN change can result in trading being blocked when the exchange runs its periodic PAN verification. Implement this as an automated workflow that tracks propagation status across all downstream systems and raises alerts if any update fails.
:::

---

Segment activation is often confused with BO modification, but it is primarily an exchange-level operation, not a CDSL one. The depository does not restrict which market segments a BO account can be used for — that control lives at the exchange UCC level. This section clarifies the boundary.

## 7. Segment Activation / Deactivation

Segment activation is primarily an **exchange-level operation** (UCC), not a CDSL BO modification. The depository does not enforce segment-level restrictions on BO accounts.

| Segment | Exchange(s) | Income Proof | Process |
|---------|-------------|-------------|---------|
| CM (Equity) | NSE, BSE | No (default) | Auto with UCC |
| FO (Derivatives) | NSE, BSE | Yes (min Rs. 10L) | UCC modify at exchange |
| CD (Currency) | NSE, BSE, MSE | No | UCC modify at exchange |
| COM (Commodity) | MCX, NCDEX | Yes (mandatory) | UCC modify at exchange |
| SLB | NSE, BSE | Separate agreement | SLB agreement with broker |

In plain English: a client's demat account does not "know" about segments. Whether a client can trade in derivatives or commodities is controlled by their UCC registration at the exchange. The demat account simply holds whatever securities result from trading in any segment.

---

Account closure is a client right that SEBI has strengthened in recent years. Clients can now close their demat accounts online without giving a reason, and DPs (Depository Participants) must process closures within strict timelines. However, several preconditions must be met before closure can proceed — your system needs to check all of them.

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

:::tip[Build a pre-closure checklist in your app]
Rather than letting a client initiate closure and then discovering blockers, build a pre-closure diagnostic that checks all six preconditions upfront. Show the client exactly what needs to be resolved (e.g., "You have 50 shares of INFY pledged — unpledge them first") before they start the closure process. This reduces support tickets and improves the client experience.
:::

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

:::note
Dormant accounts are not the same as closed accounts. A dormant account still exists and holds securities — it is simply flagged because there has been no activity. The client can reactivate it by submitting updated KYC documents to the DP. Your system should send periodic reminders to clients with dormant accounts, as reactivation is simpler than opening a new account.
:::

---

The table below is a quick reference matrix that ties together everything covered on this page. Use it as a lookup when implementing specific modification types — it tells you which file line to update, the expected timeline, required documents, and which downstream systems need to be notified.

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

:::tip[Cross-system sync is where most bugs hide]
The "Cross-System Sync" column is deceptively important. A modification is not truly complete until it has been propagated to all listed downstream systems within the SEBI-mandated timeline (typically 10 working days). Build a reconciliation job that compares CDSL records with KRA and exchange records, and flags discrepancies. This is one of the most common audit findings.
:::

---

## Related Pages

- [CDSL Overview](/broking-kyc/vendors/depositories/cdsl/) — Core BO integration spec
- [DDPI Deep Dive](/broking-kyc/vendors/depositories/cdsl-ddpi/) — DDPI activation is a BO modification
- [MTF & Pledge Deep Dive](/broking-kyc/vendors/depositories/cdsl-mtf-pledge/) — Pledge operations on modified accounts
- [Integration Guide](/broking-kyc/vendors/depositories/cdsl-integration-guide/) — UAT environments and SEBI circulars

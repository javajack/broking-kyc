---
title: Master Dataset
description: Complete field-level specification — all ~454 fields across 30 sections with data types, sizes, validation rules, source systems, and regulatory references.
---

This is the single most comprehensive reference in the entire documentation set. It defines every field the KYC system captures, stores, or generates -- roughly 454 fields across 30 sections, covering everything from the customer's PAN (Permanent Account Number) to the audit trail of every modification made to their record. You will not read this cover-to-cover, but you will come back to it regularly when building forms, writing validation logic, debugging field-mapping issues, or answering compliance questions about where a particular piece of data comes from and why it is required.

:::tip[How to use this page]
Use your browser's search (Ctrl+F) to find a specific field name like `pan_verify_status` or a section letter like "Section G." Each field has a unique identifier (e.g., A01, G12) that is referenced throughout the codebase and in API mapping documents.
:::

## 1. Architecture Overview

### 1.1 Two-Part KYC Structure (SEBI Mandated)

SEBI (Securities and Exchange Board of India) mandates that KYC is split into two parts. This is not an implementation choice -- it is a regulatory requirement. Part I is standardized across all intermediaries (brokers, mutual funds, insurance), while Part II is specific to each intermediary's line of business.

| Part | Name | Purpose | Template |
|------|------|---------|----------|
| **Part I** | KYC Form / CIP (Customer Identification Procedure) | Basic client identification - standardized across all SEBI intermediaries | CERSAI prescribed template |
| **Part II** | CDD (Customer Due Diligence) | Activity-specific information for the intermediary (trading prefs, segments, risk) | Intermediary-designed |

### 1.2 Systems Involved

These are all the external systems our KYC application communicates with. You will see their abbreviations throughout this document and the codebase.

| System | Entity | Purpose |
|--------|--------|---------|
| **KRA** | CVL/NDML/DOTEX/CAMS/KFintech | Securities-market KYC registry (SEBI regulated) |
| **CKYC (CKYCR)** | CERSAI / Protean | Cross-sector KYC registry (RBI/SEBI/IRDAI) |
| **PAN Verification** | NSDL/Protean (ITD authorized) | Identity & PAN-Aadhaar linkage check |
| **DigiLocker** | MeitY / UIDAI | Consent-based document fetch (Aadhaar, PAN, DL) |
| **e-KYC Setu** | NPCI | Aadhaar e-KYC without disclosing Aadhaar number |
| **Bank Verification** | Penny Drop / UPI | Account ownership verification |
| **e-Sign** | UIDAI / CCA | Aadhaar OTP-based digital signature |
| **NSE/BSE/MCX** | Exchanges | UCC registration for trading |
| **CDSL/NSDL** | Depositories | BO/Demat account creation |

### 1.3 Onboarding Flow Summary

This is the high-level decision tree that determines how much data the system needs to capture from the customer. If a KRA (KYC Registration Agency) record already exists for their PAN, much of the form is prefilled. If neither KRA nor CKYC (Central KYC) has a record, the customer goes through the full capture flow.

```
Client Initiates -> PAN Lookup in KRA -> KRA Found?
  -> Yes: KRA Fetch + CKYC Search -> Compare & Prefill -> Capture Delta
  -> No:  CKYC Search -> CKYC Found?
           -> Yes: Download & Prefill -> Capture Delta
           -> No:  Fresh KYC Capture (Full)

All Paths Lead To:
  -> PAN Verification (Protean)
  -> Aadhaar/DigiLocker Consent
  -> Bank Account Verification (Penny Drop)
  -> IPV/VIPV
  -> Capture Remaining Data (Segments, Nominees, FATCA, DDPI)
  -> e-Sign on Application
  -> Submit to KRA + CKYC
  -> Register UCC on NSE/BSE/MCX
  -> Open BO Account on CDSL/NSDL
  -> Activate Segments
  -> Client Ready to Trade
```

---

## 2. Section A: Personal Identity

**Source**: CERSAI KYC Template (Part I) + KRA Fields
**Required By**: KRA, CKYC, NSE, BSE, MCX, CDSL, NSDL

This is the foundational identity section. Every downstream system -- exchanges, depositories, KRA, CKYC -- needs these fields. The name fields (A05-A07) must match the PAN card exactly; even minor spelling differences will cause KRA rejections.

| # | Field Name | Data Type | Size | Mandatory | Validation | Source/Notes |
|---|-----------|-----------|------|-----------|------------|-------------|
| A01 | `pan` | String | 10 | **Y** | `[A-Z]{5}[0-9]{4}[A-Z]` | Primary identifier. 4th char: P=Individual |
| A02 | `pan_exempt` | Boolean | 1 | N | Y/N | Only for specific govt categories |
| A03 | `pan_exempt_category` | String | 2 | Cond. | Code table | Required if pan_exempt=Y |
| A04 | `prefix` | String | 5 | N | Mr/Mrs/Ms/Dr | Name prefix/salutation |
| A05 | `first_name` | String | 70 | **Y** | Alpha + spaces | Must match PAN card |
| A06 | `middle_name` | String | 70 | N | Alpha + spaces | |
| A07 | `last_name` | String | 70 | **Y** | Alpha + spaces | Must match PAN card |
| A08 | `full_name` | String | 200 | **Y** | Derived | Concatenation of A05+A06+A07 |
| A09 | `maiden_prefix` | String | 5 | N | | |
| A10 | `maiden_first_name` | String | 70 | N | | If name changed after marriage |
| A11 | `maiden_middle_name` | String | 70 | N | | |
| A12 | `maiden_last_name` | String | 70 | N | | |
| A13 | `father_spouse_flag` | String | 1 | **Y** | F=Father, S=Spouse | Indicates which relation |
| A14 | `father_spouse_prefix` | String | 5 | **Y** | Mr/Mrs/Ms | |
| A15 | `father_spouse_name` | String | 70 | **Y** | | Full name of father or spouse |
| A16 | `mother_prefix` | String | 5 | N | | |
| A17 | `mother_name` | String | 70 | N | | Mother's full name |
| A18 | `gender` | String | 1 | **Y** | M/F/T | Male/Female/Transgender |
| A19 | `marital_status` | String | 1 | N | S/M/O | Single/Married/Others |
| A20 | `date_of_birth` | Date | 10 | **Y** | DD/MM/YYYY | Must match PAN. Age >= 18 |
| A21 | `nationality` | String | 2 | **Y** | ISO country code | IN=Indian |
| A22 | `residential_status` | String | 2 | **Y** | RI/NRI/FN/PIO | Resident Indian / NRI / Foreign National / PIO |
| A23 | `aadhaar_number` | String | 12 | N | 12 digits, Verhoeff algo | Masked in storage: XXXX-XXXX-1234 |
| A24 | `aadhaar_reference_number` | String | 28 | N | | Virtual ID or reference from DigiLocker |
| A25 | `ckyc_number` | String | 14 | N | 14 digits | Central KYC Identification Number (KIN) |
| A26 | `din` | String | 8 | N | 8 digits | Director Identification Number (if applicable) |
| A27 | `place_of_birth` | String | 50 | N | | City/Town of birth |
| A28 | `country_of_birth` | String | 2 | N | ISO country code | Required for FATCA |
| A29 | `is_differently_abled` | Boolean | 1 | **Y** | Y/N | CKYC mandatory field |
| A30 | `disability_type` | String | 2 | Cond. | Code table | Required if A29=Y |
| A31 | `disability_percentage` | Number | 3 | Cond. | 0-100 | Required if A29=Y |
| A32 | `udid_number` | String | 18 | Cond. | `[A-Z]{2}\d{16}` | Unique Disability ID |

---

## 3. Section B: Address Details

**Source**: CERSAI KYC Template + KRA Fields
**Required By**: KRA, CKYC, NSE, BSE, CDSL, NSDL

Address data typically comes from DigiLocker (Aadhaar XML). If the permanent address is the same as the correspondence address, the customer sets `perm_same_as_corr` to Y and the permanent fields are auto-copied.

### B1: Correspondence / Current Address

| # | Field Name | Data Type | Size | Mandatory | Validation |
|---|-----------|-----------|------|-----------|------------|
| B01 | `corr_address_line1` | String | 100 | **Y** | |
| B02 | `corr_address_line2` | String | 100 | N | |
| B03 | `corr_address_line3` | String | 100 | N | |
| B04 | `corr_city` | String | 50 | **Y** | |
| B05 | `corr_district` | String | 50 | N | |
| B06 | `corr_state` | String | 30 | **Y** | State code table |
| B07 | `corr_pincode` | String | 6 | **Y** | 6 digits |
| B08 | `corr_country` | String | 30 | **Y** | Default: India |
| B09 | `corr_address_proof_type` | String | 2 | **Y** | POA code table |

### B2: Permanent Address

| # | Field Name | Data Type | Size | Mandatory | Validation |
|---|-----------|-----------|------|-----------|------------|
| B10 | `perm_same_as_corr` | Boolean | 1 | **Y** | Y/N |
| B11 | `perm_address_line1` | String | 100 | Cond. | Required if B10=N |
| B12 | `perm_address_line2` | String | 100 | N | |
| B13 | `perm_address_line3` | String | 100 | N | |
| B14 | `perm_city` | String | 50 | Cond. | |
| B15 | `perm_district` | String | 50 | N | |
| B16 | `perm_state` | String | 30 | Cond. | |
| B17 | `perm_pincode` | String | 6 | Cond. | |
| B18 | `perm_country` | String | 30 | Cond. | |
| B19 | `perm_address_proof_type` | String | 2 | Cond. | |

---

## 4. Section C: Contact Details

| # | Field Name | Data Type | Size | Mandatory | Validation |
|---|-----------|-----------|------|-----------|------------|
| C01 | `mobile_isd_code` | String | 5 | **Y** | Default: +91 |
| C02 | `mobile_number` | String | 15 | **Y** | 10 digits for India, starts with 6/7/8/9 |
| C03 | `alternate_mobile` | String | 15 | N | |
| C04 | `email` | String | 100 | **Y** | RFC 5322 format |
| C05 | `alternate_email` | String | 100 | N | |
| C06 | `phone_std_code` | String | 5 | N | Landline STD |
| C07 | `phone_number` | String | 15 | N | Landline number |
| C08 | `fax_std_code` | String | 5 | N | |
| C09 | `fax_number` | String | 15 | N | |

---

## 5. Section D: Identity Documents (POI)

**Officially Valid Documents (OVDs) per PMLA (Prevention of Money Laundering Act) Rules**

These are the Proof of Identity documents accepted under Indian law. In practice, almost all customers use Aadhaar (via DigiLocker) or PAN as their POI (Proof of Identity).

| # | Field Name | Data Type | Size | Mandatory | Validation |
|---|-----------|-----------|------|-----------|------------|
| D01 | `poi_type` | String | 2 | **Y** | POI code table (see Appendix A) |
| D02 | `poi_document_number` | String | 30 | **Y** | Format per document type |
| D03 | `poi_expiry_date` | Date | 10 | Cond. | DD/MM/YYYY - for Passport, DL |
| D04 | `poi_issue_date` | Date | 10 | N | |
| D05 | `poi_issuing_authority` | String | 50 | N | |
| D06 | `poi_verified_from_issuer` | Boolean | 1 | **Y** | Y/N |
| D07 | `poi_document_image` | BLOB | - | **Y** | JPEG/PNG/PDF, max 2MB |

### Accepted POI Documents

| Code | Document | ID Format |
|------|----------|-----------|
| A | Passport | `[A-Z]\d{7}` |
| B | Voter ID Card | `[A-Z]{3}\d{7}` |
| C | Driving License | State-specific format |
| D | PAN Card (with photo) | `[A-Z]{5}\d{4}[A-Z]` |
| E | Aadhaar / UID | 12 digits (Verhoeff) |
| F | NREGA Job Card | State-specific |
| G | NPR Letter | - |
| Z | Others (Govt/Defense ID) | - |

---

## 6. Section E: Address Documents (POA)

POA (Proof of Address) documents have validity constraints. A utility bill older than two months is not acceptable. You will encounter these constraints in the document upload validation logic.

| # | Field Name | Data Type | Size | Mandatory | Validation |
|---|-----------|-----------|------|-----------|------------|
| E01 | `poa_type` | String | 2 | **Y** | POA code table |
| E02 | `poa_document_number` | String | 30 | **Y** | |
| E03 | `poa_expiry_date` | Date | 10 | Cond. | For Passport, DL |
| E04 | `poa_issue_date` | Date | 10 | N | |
| E05 | `poa_verified_from_issuer` | Boolean | 1 | **Y** | |
| E06 | `poa_address_same_as_corr` | Boolean | 1 | **Y** | Y/N |
| E07 | `poa_document_image` | BLOB | - | **Y** | JPEG/PNG/PDF, max 2MB |

### Accepted POA Documents

| Code | Document | Validity Constraint |
|------|----------|--------------------|
| A | Passport | Valid / not expired |
| B | Voter ID Card | No expiry |
| C | Driving License | Valid / not expired |
| D | Aadhaar / UID | No expiry |
| E | Utility Bill | Not older than 2 months |
| F | Bank Statement | Not older than 3 months |
| G | Property/Municipal Tax Receipt | Current year |
| H | Govt/Defense ID Card | Valid |
| Z | Others | Case-specific |

---

## 7. Section F: Financial Profile

**Required By**: PMLA/AML compliance, Segment activation, KRA (optional), Exchange registration

The financial profile drives two critical decisions: which trading segments the customer can access (F&O and Commodity require income proof), and what risk category they fall into for AML (Anti-Money Laundering) screening.

| # | Field Name | Data Type | Size | Mandatory | Validation | Notes |
|---|-----------|-----------|------|-----------|------------|-------|
| F01 | `occupation` | String | 2 | **Y** | Occupation code table | See Appendix A |
| F02 | `occupation_others` | String | 50 | Cond. | | If F01=99 (Others) |
| F03 | `gross_annual_income_range` | String | 2 | **Y** | Income range code | See Appendix A |
| F04 | `declared_annual_income` | Decimal | 15,2 | N | INR | Exact amount if provided |
| F05 | `net_worth` | Decimal | 15,2 | N | INR Lakhs | |
| F06 | `net_worth_date` | Date | 10 | Cond. | DD/MM/YYYY | Required if F05 provided. Must be < 1 year old |
| F07 | `source_of_wealth` | String | 100 | N | | Salary/Business/Inheritance/etc |
| F08 | `income_proof_type` | String | 2 | Cond. | | Required for F&O/Commodity segments |
| F09 | `income_proof_document` | BLOB | - | Cond. | PDF/JPEG, max 5MB | |
| F10 | `income_proof_financial_year` | String | 9 | Cond. | YYYY-YYYY | e.g., 2025-2026 |

### Income Proof Types (for F&O/Derivatives activation)

| Code | Document | Key Field Extracted |
|------|----------|-------------------|
| BS | Bank Statement (6 months) | Average monthly balance |
| SS | Salary Slip (last 3 months) | Gross monthly salary |
| IT | ITR Acknowledgement | Gross total income |
| F16 | Form 16 | Annual salary |
| NW | Net Worth Certificate (CA certified) | Net worth amount, CA details |
| DH | Demat Holding Statement | Holding value |
| FD | Fixed Deposit Receipt | FD value |

### Income Range Codes

| Code | Range (INR) | Proposed New Ranges (SEBI Jan 2026) |
|------|-------------|-------------------------------------|
| 01 | Below 1 Lakh | 0 - 5 Lakhs |
| 02 | 1 - 5 Lakhs | 5 - 10 Lakhs |
| 03 | 5 - 10 Lakhs | 10 - 50 Lakhs |
| 04 | 10 - 25 Lakhs | 50 Lakhs - 1 Crore |
| 05 | 25 Lakhs - 1 Crore | 1 - 2 Crore |
| 06 | Above 1 Crore | Above 2 Crore |

:::caution
SEBI proposed revised income range codes in January 2026. When these are finalized, every system that stores or transmits income range codes -- KRA, exchanges, back-office -- will need to be updated simultaneously. Watch for the final circular.
:::

---

## 8. Section G: Bank Account Details

**Required By**: Broker (pay-in/pay-out), Exchange (settlement), SEBI regulation
**Validation**: Penny Drop verification mandatory for primary account
**Multiple Accounts**: Up to 5 bank accounts allowed

The bank section is where many onboarding failures occur. The penny drop verification (a Rs.1 IMPS credit to confirm the account exists and the name matches) is a blocking step. If the name returned by the bank does not match the PAN name above a configurable threshold, the application cannot proceed.

### Per Bank Account (repeat for each, max 5):

| # | Field Name | Data Type | Size | Mandatory | Validation |
|---|-----------|-----------|------|-----------|------------|
| G01 | `bank_account_seq` | Number | 1 | **Y** | 1-5 |
| G02 | `is_primary` | Boolean | 1 | **Y** | Exactly one must be Y |
| G03 | `bank_name` | String | 100 | **Y** | |
| G04 | `branch_name` | String | 100 | **Y** | |
| G05 | `account_number` | String | 18 | **Y** | Alphanumeric |
| G06 | `ifsc_code` | String | 11 | **Y** | `[A-Z]{4}0[A-Z0-9]{6}` |
| G07 | `micr_code` | String | 9 | N | 9 digits |
| G08 | `account_type` | String | 2 | **Y** | SB=Savings, CA=Current, NRE, NRO |
| G09 | `account_holder_name` | String | 100 | **Y** | Must match PAN name |
| G10 | `bank_proof_type` | String | 2 | **Y** | CC=Cancelled Cheque, BS=Bank Statement |
| G11 | `bank_proof_document` | BLOB | - | **Y** | JPEG/PNG/PDF |
| G12 | `penny_drop_status` | String | 2 | **Y** | S=Success, F=Failed, P=Pending |
| G13 | `penny_drop_ref` | String | 30 | Cond. | UTR from penny drop |
| G14 | `penny_drop_name_returned` | String | 100 | Cond. | Name returned by bank |
| G15 | `penny_drop_name_match_score` | Number | 3 | Cond. | 0-100 percentage |
| G16 | `penny_drop_date` | DateTime | - | Cond. | ISO 8601 |

---

## 9. Section H: Demat Account Details

**Required By**: CDSL/NSDL (BO account), Broker (settlement)

The BO (Beneficiary Owner) ID format differs between the two depositories. CDSL uses a 16-digit numeric ID, while NSDL uses "IN" followed by 14 alphanumeric characters. You will see this distinction in every depository-related integration.

| # | Field Name | Data Type | Size | Mandatory | Validation | Notes |
|---|-----------|-----------|------|-----------|------------|-------|
| H01 | `depository` | String | 4 | **Y** | CDSL/NSDL | |
| H02 | `dp_name` | String | 100 | **Y** | | Depository Participant name |
| H03 | `dp_id` | String | 8 | **Y** | CDSL: 8 digits, NSDL: IN+6 digits | |
| H04 | `client_id` | String | 8 | **Y** | 8 digits | |
| H05 | `bo_id` | String | 16 | **Y** | CDSL: 16 digits, NSDL: IN+14 chars | Derived: dp_id + client_id |
| H06 | `account_type` | String | 2 | **Y** | IN=Individual, JO=Joint, MN=Minor | |
| H07 | `account_status` | String | 2 | **Y** | AC=Active, FR=Frozen, CL=Closed | |
| H08 | `bsda_flag` | Boolean | 1 | N | Y/N | Basic Services Demat Account |
| H09 | `opening_date` | Date | 10 | **Y** | DD/MM/YYYY | |

---

## 10. Section I: Nomination Details

**Regulatory Basis**: SEBI circular Jan 10, 2025 (up to 10 nominees), SEBI circular Jun 10, 2024 (simplified to 3 mandatory fields)
**Required By**: CDSL/NSDL demat, Broker trading account

Nomination rules changed significantly in 2024-2025. Previously, nomination was optional. Now, customers must either nominate at least one person or explicitly opt out -- and opting out requires video verification.

| # | Field Name | Data Type | Size | Mandatory | Validation |
|---|-----------|-----------|------|-----------|------------|
| I01 | `nomination_opted` | Boolean | 1 | **Y** | Y/N |
| I02 | `opt_out_declaration` | Boolean | 1 | Cond. | Required if I01=N. Needs video verification |
| I03 | `number_of_nominees` | Number | 2 | Cond. | 1-10, required if I01=Y |

### Per Nominee (repeat for each, max 10):

| # | Field Name | Data Type | Size | Mandatory | Validation |
|---|-----------|-----------|------|-----------|------------|
| I04 | `nominee_seq` | Number | 2 | **Y** | 1-10 |
| I05 | `nominee_name` | String | 100 | **Y** | |
| I06 | `nominee_relationship` | String | 2 | **Y** | Relationship code table |
| I07 | `nominee_dob` | Date | 10 | **Y** | DD/MM/YYYY |
| I08 | `nominee_percentage` | Decimal | 5,2 | **Y** | 0.01-100.00; all must sum to 100 |
| I09 | `nominee_pan` | String | 10 | Cond. | Any one unique ID mandatory |
| I10 | `nominee_aadhaar` | String | 12 | Cond. | |
| I11 | `nominee_passport` | String | 8 | Cond. | |
| I12 | `nominee_address` | String | 255 | **Y** | |
| I13 | `nominee_city` | String | 50 | **Y** | |
| I14 | `nominee_state` | String | 30 | **Y** | |
| I15 | `nominee_pincode` | String | 6 | **Y** | |
| I16 | `nominee_mobile` | String | 15 | N | |
| I17 | `nominee_email` | String | 100 | N | |
| I18 | `nominee_is_minor` | Boolean | 1 | **Y** | Derived from nominee_dob |

### Guardian Details (required if nominee is minor):

| # | Field Name | Data Type | Size | Mandatory | Validation |
|---|-----------|-----------|------|-----------|------------|
| I19 | `guardian_name` | String | 100 | Cond. | Required if I18=Y |
| I20 | `guardian_pan` | String | 10 | Cond. | |
| I21 | `guardian_relationship` | String | 2 | Cond. | Relationship code |
| I22 | `guardian_address` | String | 255 | Cond. | |

---

## 11. Section J: FATCA/CRS Declaration

**Regulatory Basis**: SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 (Feb 20, 2024) - Centralization at KRAs
**Required By**: KRA (upload mandatory since Jul 1, 2024), All SEBI intermediaries

FATCA (Foreign Account Tax Compliance Act) and CRS (Common Reporting Standard) are international tax compliance frameworks. India participates in both. For the vast majority of Indian-resident customers, the declaration is straightforward -- they check "tax resident of India only" and move on. The complexity arises for NRIs (Non-Resident Indians) and dual citizens who have tax residency in other countries.

| # | Field Name | Data Type | Size | Mandatory | Validation |
|---|-----------|-----------|------|-----------|------------|
| J01 | `is_tax_resident_of_india_only` | Boolean | 1 | **Y** | Y/N |
| J02 | `is_us_person` | Boolean | 1 | **Y** | Y/N |
| J03 | `us_tin_ssn` | String | 11 | Cond. | Required if J02=Y |
| J04 | `us_green_card_holder` | Boolean | 1 | Cond. | Required if J02=Y |
| J05 | `country_of_birth` | String | 2 | **Y** | ISO country code |
| J06 | `place_of_birth_city` | String | 50 | **Y** | |
| J07 | `citizenship_country` | String | 2 | **Y** | ISO country code (can be multiple) |

### Tax Residency Details (repeat for each country, if J01=N):

| # | Field Name | Data Type | Size | Mandatory | Validation |
|---|-----------|-----------|------|-----------|------------|
| J08 | `tax_country_seq` | Number | 1 | Cond. | 1-5 |
| J09 | `tax_country` | String | 2 | Cond. | ISO country code |
| J10 | `tax_id_number` | String | 30 | Cond. | TIN for that country |
| J11 | `tax_id_type` | String | 2 | Cond. | TIN/SSN/EIN etc |
| J12 | `tin_not_available_reason` | String | 2 | Cond. | If TIN not provided: A=Country doesn't issue, B=Unable to obtain, C=Not required |

### Declaration

| # | Field Name | Data Type | Size | Mandatory | Validation |
|---|-----------|-----------|------|-----------|------------|
| J13 | `fatca_declaration_date` | Date | 10 | **Y** | DD/MM/YYYY |
| J14 | `fatca_declaration_place` | String | 50 | **Y** | |
| J15 | `fatca_signature` | BLOB | - | **Y** | Digital or scanned |

---

## 12. Section K: PEP & AML Declaration

**Regulatory Basis**: SEBI AML/CFT Master Circular (SEBI/HO/MIRSD/SECFATF/P/CIR/2024/78)

A PEP (Politically Exposed Person) is anyone who holds or has recently held a prominent public function -- a minister, a senior government official, or a high-ranking military officer. Their immediate family members and close associates are also classified as PEP-related. If a customer declares PEP status, the application triggers EDD (Enhanced Due Diligence), which involves additional manual review by the compliance team.

| # | Field Name | Data Type | Size | Mandatory | Validation |
|---|-----------|-----------|------|-----------|------------|
| K01 | `is_pep` | Boolean | 1 | **Y** | Y/N |
| K02 | `is_pep_related` | Boolean | 1 | **Y** | Y/N - Related to a PEP |
| K03 | `pep_details` | String | 200 | Cond. | Name, designation, relationship if K01/K02=Y |
| K04 | `source_of_funds` | String | 100 | **Y** | Salary/Business/Investments/Inheritance/Gift/Others |
| K05 | `beneficial_owner_declaration` | Boolean | 1 | **Y** | Declare if acting for self |
| K06 | `beneficial_owner_details` | String | 500 | Cond. | If K05=N, details of actual BO |

---

## 13. Section L: Trading Preferences & Segments

**Required By**: NSE/BSE/MCX UCC registration, Broker

This section determines what the customer can trade. Equity cash is the default segment that every customer gets. F&O (Futures and Options) and Commodity segments require income proof, which is why the financial profile (Section F) must be completed first.

| # | Field Name | Data Type | Size | Mandatory | Validation | Conditions |
|---|-----------|-----------|------|-----------|------------|------------|
| L01 | `segment_equity_cash` | Boolean | 1 | **Y** | Y/N | Default segment |
| L02 | `segment_equity_fno` | Boolean | 1 | **Y** | Y/N | Requires income proof |
| L03 | `segment_currency` | Boolean | 1 | **Y** | Y/N | |
| L04 | `segment_commodity` | Boolean | 1 | **Y** | Y/N | Requires income proof |
| L05 | `exchange_nse` | Boolean | 1 | **Y** | Y/N | |
| L06 | `exchange_bse` | Boolean | 1 | **Y** | Y/N | |
| L07 | `exchange_mcx` | Boolean | 1 | Cond. | Y/N | Required if L04=Y |
| L08 | `trading_experience_equity_years` | Number | 2 | N | 0-50 | |
| L09 | `trading_experience_fno_years` | Number | 2 | Cond. | 0-50 | Required if L02=Y |
| L10 | `trading_experience_commodity_years` | Number | 2 | Cond. | 0-50 | Required if L04=Y |
| L11 | `trading_preference` | String | 5 | N | | Delivery/Intraday/Both |
| L12 | `settlement_type` | String | 2 | N | | T+1, T+0 |

### Segment Activation Requirements Matrix

| Segment | Income Proof | Min Income | Risk Disclosure | Additional |
|---------|-------------|------------|-----------------|------------|
| Equity Cash | No | None | General RDD | - |
| Equity F&O | **Yes** | Broker-specific (typically 1-5L) | F&O specific RDD | Trading experience declaration |
| Currency Derivatives | No | None | Currency RDD | - |
| Commodity | **Yes** | Broker-specific | Commodity RDD | MCX registration |

---

## 14. Section M: Risk Profiling

**Regulatory Basis**: SEBI guidelines on suitability and risk profiling

| # | Field Name | Data Type | Size | Mandatory | Validation |
|---|-----------|-----------|------|-----------|------------|
| M01 | `age_group` | String | 2 | **Y** | 01=18-25, 02=26-35, 03=36-45, 04=46-55, 05=56-65, 06=65+ |
| M02 | `investment_objective` | String | 2 | **Y** | CA=Capital Appreciation, IN=Income, WP=Wealth Preservation, SP=Speculation |
| M03 | `risk_appetite` | String | 1 | **Y** | L=Low, M=Medium, H=High |
| M04 | `investment_horizon` | String | 1 | **Y** | S=Short(<1yr), M=Medium(1-3yr), L=Long(>3yr) |
| M05 | `risk_profile_score` | Number | 3 | N | 0-100 | Computed from M01-M04 + F01+F03 |
| M06 | `risk_category` | String | 2 | N | | Conservative/Moderate/Aggressive |

---

## 15. Section N: IPV / VIPV

**Regulatory Basis**: SEBI KYC Master Circular - IPV mandatory unless Aadhaar e-KYC used
**Required By**: KRA (IPV flag), Broker

IPV (In-Person Verification) is a regulatory requirement to confirm that the person applying is who they claim to be. VIPV (Video In-Person Verification) is the digital equivalent -- a recorded video call where a trained agent verifies the customer's identity against their documents.

| # | Field Name | Data Type | Size | Mandatory | Validation | Notes |
|---|-----------|-----------|------|-----------|------------|-------|
| N01 | `ipv_required` | Boolean | 1 | **Y** | | N if Aadhaar e-KYC or DigiLocker used |
| N02 | `ipv_mode` | String | 2 | Cond. | PH=Physical, VI=Video(VIPV), AE=Aadhaar eKYC | |
| N03 | `ipv_status` | String | 2 | **Y** | CO=Completed, PE=Pending, FA=Failed | |
| N04 | `ipv_date` | Date | 10 | Cond. | DD/MM/YYYY | |
| N05 | `ipv_verifier_name` | String | 100 | Cond. | | Authorized official |
| N06 | `ipv_verifier_designation` | String | 50 | Cond. | | |
| N07 | `ipv_verifier_organization` | String | 100 | Cond. | | |
| N08 | `ipv_verifier_employee_code` | String | 20 | Cond. | | |

### VIPV-Specific Fields (if N02=VI):

| # | Field Name | Data Type | Size | Mandatory | Notes |
|---|-----------|-----------|------|-----------|-------|
| N09 | `vipv_session_id` | String | 50 | **Y** | Unique session identifier |
| N10 | `vipv_start_time` | DateTime | - | **Y** | ISO 8601 |
| N11 | `vipv_end_time` | DateTime | - | **Y** | |
| N12 | `vipv_duration_seconds` | Number | 5 | **Y** | |
| N13 | `vipv_consent_obtained` | Boolean | 1 | **Y** | Informed consent before video |
| N14 | `vipv_video_url` | String | 500 | **Y** | Secure, tamper-proof storage |
| N15 | `vipv_video_hash` | String | 64 | **Y** | SHA-256 integrity hash |
| N16 | `vipv_otp_verified` | Boolean | 1 | N | OTP confirmation during VIPV |
| N17 | `vipv_face_match_score` | Number | 3 | N | 0-100 |
| N18 | `vipv_liveness_score` | Number | 3 | N | 0-100 |
| N19 | `vipv_random_questions_json` | JSON | - | **Y** | Array of Q&A with timestamps |
| N20 | `vipv_geolocation` | JSON | - | N | {lat, lon, accuracy} |
| N21 | `vipv_device_info` | JSON | - | N | {device, os, browser, app_version} |

---

## 16. Section O: DDPI Authorization

**Regulatory Basis**: SEBI/HO/MIRSD/DoP/P/CIR/2022/44 (replaces POA since Nov 18, 2022)
**Required By**: CDSL/NSDL, Broker
**Note**: DDPI is **optional** - broker cannot deny services if client refuses

DDPI (Demat Debit and Pledge Instruction) replaced the older POA (Power of Attorney) mechanism in November 2022. It authorizes the broker to debit securities from the customer's demat account for specific purposes -- settlement, pledging, mutual fund transactions, and tendering in open offers. Without DDPI, the customer must manually authorize each debit through the depository's system (CDSL's CDAS or NSDL's SPEED-e).

| # | Field Name | Data Type | Size | Mandatory | Validation |
|---|-----------|-----------|------|-----------|------------|
| O01 | `ddpi_opted` | Boolean | 1 | **Y** | Y/N |
| O02 | `ddpi_bo_id` | String | 16 | Cond. | BO ID from Section H |
| O03 | `ddpi_dp_id` | String | 8 | Cond. | DP ID |
| O04 | `ddpi_authorization_date` | Date | 10 | Cond. | DD/MM/YYYY |
| O05 | `ddpi_scope` | String | 2 | Cond. | AL=All transactions, SP=Specific |
| O06 | `ddpi_for_settlement` | Boolean | 1 | Cond. | Transfer securities for settlement |
| O07 | `ddpi_for_pledge` | Boolean | 1 | Cond. | Pledge/re-pledge for margins |
| O08 | `ddpi_for_mutual_fund` | Boolean | 1 | Cond. | MF transactions |
| O09 | `ddpi_for_tendering` | Boolean | 1 | Cond. | Tendering shares in open offers/buybacks |
| O10 | `ddpi_client_signature` | BLOB | - | Cond. | Digital or physical |

---

## 17. Section P: Consent & Declarations

This section covers the legal consents and declarations that the customer must acknowledge before the application can be e-signed. Several of these are SEBI-mandated and cannot be made optional.

| # | Field Name | Data Type | Size | Mandatory | Notes |
|---|-----------|-----------|------|-----------|-------|
| P01 | `consent_kyc_data_sharing` | Boolean | 1 | **Y** | Consent to share KYC with KRA/CKYC |
| P02 | `consent_aadhaar_usage` | Boolean | 1 | Cond. | If Aadhaar used for e-KYC |
| P03 | `consent_digilocker` | Boolean | 1 | Cond. | If DigiLocker used |
| P04 | `consent_email_mobile_validation` | Boolean | 1 | **Y** | Consent for KRA validation SMS/email |
| P05 | `consent_electronic_communication` | Boolean | 1 | **Y** | E-contract notes, statements |
| P06 | `declaration_information_true` | Boolean | 1 | **Y** | All info provided is true |
| P07 | `declaration_not_banned` | Boolean | 1 | **Y** | Not debarred by SEBI/Exchange |
| P08 | `risk_disclosure_acknowledged` | Boolean | 1 | **Y** | General Risk Disclosure Document |
| P09 | `rdd_fno_acknowledged` | Boolean | 1 | Cond. | F&O risk disclosure |
| P10 | `rdd_commodity_acknowledged` | Boolean | 1 | Cond. | Commodity risk disclosure |
| P11 | `rdd_currency_acknowledged` | Boolean | 1 | Cond. | Currency risk disclosure |
| P12 | `running_account_authorization` | Boolean | 1 | **Y** | Authorization for running account |
| P13 | `running_account_settlement_freq` | String | 2 | **Y** | Q1=Quarterly(1st Friday), Q2=Quarterly, M=Monthly |
| P14 | `terms_conditions_accepted` | Boolean | 1 | **Y** | Broker T&C |
| P15 | `tariff_sheet_acknowledged` | Boolean | 1 | **Y** | Brokerage/charges acknowledgement |

### E-Sign Details

| # | Field Name | Data Type | Size | Mandatory | Notes |
|---|-----------|-----------|------|-----------|-------|
| P16 | `esign_mode` | String | 2 | **Y** | AO=Aadhaar OTP, BI=Biometric, WS=Wet Signature |
| P17 | `esign_transaction_id` | String | 50 | Cond. | e-Sign transaction ID |
| P18 | `esign_timestamp` | DateTime | - | Cond. | ISO 8601 |
| P19 | `esign_document_hash` | String | 64 | Cond. | SHA-256 of signed document |
| P20 | `esign_certificate_serial` | String | 50 | Cond. | DSC serial number |
| P21 | `esign_signed_document_url` | String | 500 | Cond. | Stored signed PDF |
| P22 | `declaration_date` | Date | 10 | **Y** | DD/MM/YYYY |
| P23 | `declaration_place` | String | 50 | **Y** | City of declaration |

---

## 18. Section Q: Document Images & Uploads

**Master list of all documents captured during onboarding**

| # | Document Type | Format | Max Size | Mandatory | Notes |
|---|-------------|--------|----------|-----------|-------|
| Q01 | Photograph (passport size) | JPEG/PNG | 1 MB | **Y** | Recent, clear, colour |
| Q02 | Signature specimen | JPEG/PNG | 500 KB | **Y** | On white background |
| Q03 | PAN Card image | JPEG/PNG/PDF | 2 MB | **Y** | Both sides if applicable |
| Q04 | Proof of Identity document | JPEG/PNG/PDF | 2 MB | **Y** | As per POI type |
| Q05 | Proof of Address document | JPEG/PNG/PDF | 2 MB | **Y** | As per POA type |
| Q06 | Bank proof (cancelled cheque / statement) | JPEG/PNG/PDF | 2 MB | **Y** | |
| Q07 | Income proof document | PDF/JPEG | 5 MB | Cond. | For F&O/Commodity |
| Q08 | FATCA self-certification form | PDF | 2 MB | **Y** | Signed |
| Q09 | Nomination form | PDF | 2 MB | Cond. | If nomination opted |
| Q10 | DDPI form | PDF | 2 MB | Cond. | If DDPI opted |
| Q11 | KYC application form (signed) | PDF | 5 MB | **Y** | Complete AOF Part I + II |
| Q12 | VIPV recording | MP4/WebM | 50 MB | Cond. | If VIPV done |
| Q13 | DigiLocker fetched documents | XML/PDF | - | N | Auto-fetched via consent |
| Q14 | Aadhaar XML (offline) | XML | 1 MB | N | Masked Aadhaar |
| Q15 | Net worth certificate | PDF | 2 MB | N | CA certified |
| Q16 | Risk disclosure acknowledgement | PDF | 2 MB | **Y** | Signed RDD |

---

## 19. Section R: Third-Party Verification Results

**Stored results from all external verification APIs**

These fields are system-populated -- they come from vendor API responses, not from user input. When debugging a verification failure, these are the fields you will inspect to understand what the external system returned.

### R1: PAN Verification (NSDL/Protean)

| # | Field Name | Data Type | Size | Notes |
|---|-----------|-----------|------|-------|
| R01 | `pan_verify_status` | String | 2 | E=Valid, F=Fake, X=Deactivated, D=Deleted, N=NotFound |
| R02 | `pan_verify_name` | String | 100 | Name as per ITD |
| R03 | `pan_verify_dob` | Date | 10 | DOB as per ITD |
| R04 | `pan_verify_category` | String | 1 | P=Individual, C=Company, H=HUF, F=Firm |
| R05 | `pan_aadhaar_seeding_status` | String | 1 | Y=Linked, N=Not linked |
| R06 | `pan_verify_name_match` | Boolean | 1 | Does name match? |
| R07 | `pan_verify_dob_match` | Boolean | 1 | Does DOB match? |
| R08 | `pan_verify_timestamp` | DateTime | - | ISO 8601 |
| R09 | `pan_verify_transaction_id` | String | 50 | API transaction reference |

### R2: Bank Account Verification (Penny Drop)

| # | Field Name | Data Type | Size | Notes |
|---|-----------|-----------|------|-------|
| R10 | `bank_verify_status` | String | 2 | S=Success, F=Failed |
| R11 | `bank_verify_name_at_bank` | String | 100 | Account holder name from bank |
| R12 | `bank_verify_name_match_score` | Number | 3 | 0-100% |
| R13 | `bank_verify_name_match_result` | String | 20 | FULL_MATCH / PARTIAL_MATCH / NO_MATCH |
| R14 | `bank_verify_account_exists` | Boolean | 1 | |
| R15 | `bank_verify_utr` | String | 30 | Bank UTR reference |
| R16 | `bank_verify_payment_mode` | String | 4 | IMPS/NEFT/UPI |
| R17 | `bank_verify_timestamp` | DateTime | - | |
| R18 | `bank_verify_transaction_id` | String | 50 | |

### R3: DigiLocker Verification

| # | Field Name | Data Type | Size | Notes |
|---|-----------|-----------|------|-------|
| R19 | `digilocker_consent_id` | String | 50 | Consent transaction ID |
| R20 | `digilocker_consent_date` | DateTime | - | |
| R21 | `digilocker_documents_fetched` | JSON | - | Array of {doc_type, doc_uri, issuer, fetched_date} |
| R22 | `digilocker_aadhaar_name` | String | 100 | Name from Aadhaar via DigiLocker |
| R23 | `digilocker_aadhaar_address` | JSON | - | Structured address from Aadhaar |
| R24 | `digilocker_aadhaar_dob` | Date | 10 | |
| R25 | `digilocker_aadhaar_gender` | String | 1 | |
| R26 | `digilocker_aadhaar_photo` | BLOB | - | Base64 photograph |

### R4: KRA Lookup/Fetch Results

| # | Field Name | Data Type | Size | Notes |
|---|-----------|-----------|------|-------|
| R27 | `kra_lookup_status` | String | 20 | See KRA status codes in Appendix A |
| R28 | `kra_name` | String | 10 | Which KRA holds record (CVL/NDML/DOTEX/CAMS/KFintech) |
| R29 | `kra_applicant_name` | String | 100 | Name in KRA |
| R30 | `kra_application_date` | Date | 10 | |
| R31 | `kra_email_validated` | Boolean | 1 | |
| R32 | `kra_mobile_validated` | Boolean | 1 | |
| R33 | `kra_pan_aadhaar_linked` | Boolean | 1 | |
| R34 | `kra_fetch_data` | JSON | - | Full KRA record if fetched |
| R35 | `kra_fetch_timestamp` | DateTime | - | |

### R5: CKYC Search/Download Results

| # | Field Name | Data Type | Size | Notes |
|---|-----------|-----------|------|-------|
| R36 | `ckyc_search_status` | String | 10 | SUCCESS/FAILURE |
| R37 | `ckyc_id_masked` | String | 14 | Masked CKYC number from search |
| R38 | `ckyc_id_unmasked` | String | 14 | Full CKYC number from download |
| R39 | `ckyc_reference_id` | String | 20 | Registry reference |
| R40 | `ckyc_full_name` | String | 200 | |
| R41 | `ckyc_download_data` | JSON | - | Full CKYC record if downloaded |
| R42 | `ckyc_download_timestamp` | DateTime | - | |

---

## 20. Section S: KRA Submission Data

**Upload to KRA within 3 working days of KYC completion**
**KRA validates within 2 working days**

| # | Field Name | Data Type | Size | Mandatory | Notes |
|---|-----------|-----------|------|-----------|-------|
| S01 | `kra_pos_code` | String | 20 | **Y** | Intermediary Point of Service code |
| S02 | `kra_app_type` | String | 2 | **Y** | IN=Individual |
| S03 | `kra_app_number` | String | 30 | **Y** | Unique application reference |
| S04 | `kra_submission_date` | DateTime | - | **Y** | |
| S05 | `kra_submission_status` | String | 2 | **Y** | SU=Submitted, AC=Accepted, RJ=Rejected |
| S06 | `kra_submission_response` | JSON | - | N | KRA response payload |
| S07 | `kra_validation_status` | String | 20 | N | KRA status after validation |
| S08 | `kra_validation_date` | DateTime | - | N | |
| S09 | `kra_rejection_reason` | String | 200 | N | If rejected |
| S10 | `kra_verifier_name` | String | 100 | **Y** | Person who verified KYC |
| S11 | `kra_verifier_designation` | String | 50 | **Y** | |
| S12 | `kra_verifier_organization` | String | 100 | **Y** | |
| S13 | `kra_kyc_date` | Date | 10 | **Y** | Date of original KYC |
| S14 | `kra_verification_date` | Date | 10 | **Y** | Date of verification |

---

## 21. Section T: CKYC Submission Data

**Upload to CKYC Registry (CERSAI/Protean) - mandatory since Aug 1, 2024**

| # | Field Name | Data Type | Size | Mandatory | Notes |
|---|-----------|-----------|------|-----------|-------|
| T01 | `ckyc_fi_code` | String | 20 | **Y** | Financial institution code |
| T02 | `ckyc_branch_code` | String | 20 | **Y** | Branch identifier |
| T03 | `ckyc_reference_id` | String | 14 | **Y** | Unique document reference |
| T04 | `ckyc_submission_date` | DateTime | - | **Y** | |
| T05 | `ckyc_submission_status` | String | 2 | **Y** | SU=Submitted, AC=Accepted, RJ=Rejected |
| T06 | `ckyc_kin_generated` | String | 14 | N | 14-digit KIN if successful |
| T07 | `ckyc_submission_response` | JSON | - | N | Full CKYC response |
| T08 | `ckyc_rejection_reason` | String | 200 | N | If rejected |
| T09 | `ckyc_document_submission_type` | String | 30 | **Y** | CERTIFIED_COPIES / EKYC / OFFLINE_VERIFICATION / DIGITAL_KYC / E_DOCUMENT / VKYC |
| T10 | `ckyc_verifier_name` | String | 100 | **Y** | |
| T11 | `ckyc_verifier_designation` | String | 50 | **Y** | |
| T12 | `ckyc_verifier_employee_code` | String | 20 | **Y** | |

---

## 22. Section U: Exchange Registration (UCC)

**UCC = Unique Client Code, registered on each exchange the client will trade on**

The UCC (Unique Client Code) is the customer's identity on the exchange. Each exchange has its own registration process and slightly different field requirements, but the core data is the same. The UCC is assigned by the broker and submitted to the exchange for approval.

### U1: Common UCC Fields (NSE/BSE/MCX)

| # | Field Name | Data Type | Size | Mandatory | Notes |
|---|-----------|-----------|------|-----------|-------|
| U01 | `ucc_code` | String | 10 | **Y** | Alphanumeric, assigned by broker |
| U02 | `ucc_client_type` | String | 2 | **Y** | IN=Individual, HU=HUF, NR=NRI, CO=Corporate |
| U03 | `ucc_registration_date` | Date | 10 | **Y** | |

### U2: NSE-Specific

| # | Field Name | Data Type | Size | Mandatory | Notes |
|---|-----------|-----------|------|-----------|-------|
| U04 | `nse_cm_activated` | Boolean | 1 | Cond. | Cash Market segment |
| U05 | `nse_fno_activated` | Boolean | 1 | Cond. | F&O segment |
| U06 | `nse_cd_activated` | Boolean | 1 | Cond. | Currency Derivatives |
| U07 | `nse_com_activated` | Boolean | 1 | Cond. | Commodity segment |
| U08 | `nse_ucc_status` | String | 2 | **Y** | AP=Approved, RJ=Rejected, PE=Pending |

### U3: BSE-Specific

| # | Field Name | Data Type | Size | Mandatory | Notes |
|---|-----------|-----------|------|-----------|-------|
| U09 | `bse_cm_activated` | Boolean | 1 | Cond. | |
| U10 | `bse_fno_activated` | Boolean | 1 | Cond. | |
| U11 | `bse_cd_activated` | Boolean | 1 | Cond. | |
| U12 | `bse_ucc_status` | String | 2 | **Y** | |

### U4: MCX-Specific

| # | Field Name | Data Type | Size | Mandatory | Notes |
|---|-----------|-----------|------|-----------|-------|
| U13 | `mcx_com_activated` | Boolean | 1 | Cond. | Commodity on MCX |
| U14 | `mcx_client_category` | String | 2 | Cond. | HE=Hedger, SP=Speculator, AR=Arbitrageur |
| U15 | `mcx_ucc_status` | String | 2 | Cond. | |

---

## 23. Section V: NRI-Specific Requirements

**Regulatory Basis**: RBI PIS (Portfolio Investment Scheme), FEMA regulations
**When Applicable**: residential_status (A22) = NRI / FN / PIO

NRI (Non-Resident Indian) onboarding involves additional regulatory requirements that resident Indians do not face. The most significant is the PIS (Portfolio Investment Scheme) permission from an AD (Authorized Dealer) bank, which is mandatory before an NRI can trade in Indian equities.

| # | Field Name | Data Type | Size | Mandatory | Validation | Notes |
|---|-----------|-----------|------|-----------|------------|-------|
| V01 | `pis_permission_status` | Boolean | 1 | **Y** (NRI) | Y/N | RBI PIS permission obtained |
| V02 | `pis_permission_letter` | BLOB | - | Cond. | PDF | RBI PIS permission document |
| V03 | `pis_account_number` | String | 20 | Cond. | | Designated PIS bank account |
| V04 | `pis_bank_name` | String | 100 | Cond. | | PIS designated bank |
| V05 | `pis_bank_branch` | String | 100 | Cond. | | PIS designated branch |
| V06 | `pis_permission_date` | Date | 10 | Cond. | DD/MM/YYYY | |
| V07 | `pis_validity_date` | Date | 10 | Cond. | DD/MM/YYYY | |
| V08 | `overseas_address_line1` | String | 100 | **Y** (NRI) | | Overseas residential address |
| V09 | `overseas_address_line2` | String | 100 | N | | |
| V10 | `overseas_city` | String | 50 | **Y** (NRI) | | |
| V11 | `overseas_state` | String | 50 | N | | |
| V12 | `overseas_zip` | String | 15 | **Y** (NRI) | | |
| V13 | `overseas_country` | String | 2 | **Y** (NRI) | ISO code | |
| V14 | `overseas_phone` | String | 20 | N | | With country code |
| V15 | `nre_nro_account_type` | String | 3 | **Y** (NRI) | NRE/NRO | For fund settlement |
| V16 | `nre_nro_bank_account` | String | 18 | **Y** (NRI) | | |
| V17 | `nre_nro_ifsc` | String | 11 | **Y** (NRI) | | |
| V18 | `nre_nro_swift_code` | String | 11 | N | | For international transfers |
| V19 | `repatriation_status` | String | 2 | **Y** (NRI) | RP=Repatriable, NR=Non-repatriable | |
| V20 | `tax_residency_certificate` | BLOB | - | Cond. | PDF | Country-specific TRC |
| V21 | `nri_trading_route` | String | 2 | **Y** (NRI) | PI=PIS, NP=Non-PIS | PIS restricts intraday |
| V22 | `investment_limit_current` | Decimal | 15,2 | N | | Current investment value |

### NRI Trading Restrictions

| Route | Intraday | Delivery | F&O | Currency | Commodity |
|-------|----------|----------|-----|----------|-----------|
| PIS | **No** | Yes | No | No | No |
| Non-PIS | Yes | Yes | Yes | **No** | **No** |

---

## 24. Section W: Minor / Joint / POA Accounts

### W1: Account Holding Pattern

| # | Field Name | Data Type | Size | Mandatory | Validation |
|---|-----------|-----------|------|-----------|------------|
| W01 | `holding_type` | String | 2 | **Y** | SI=Single, J2=Joint(2), J3=Joint(3) |
| W02 | `operation_mode` | String | 2 | Cond. | ES=Either or Survivor, AS=Anyone or Survivor, JO=Jointly |
| W03 | `is_minor_account` | Boolean | 1 | **Y** | Derived from DOB < 18 years |

### W2: Minor Account Fields (if W03=Y)

| # | Field Name | Data Type | Size | Mandatory | Notes |
|---|-----------|-----------|------|-----------|-------|
| W04 | `guardian_name` | String | 100 | **Y** | |
| W05 | `guardian_pan` | String | 10 | **Y** | |
| W06 | `guardian_aadhaar` | String | 12 | N | |
| W07 | `guardian_relationship` | String | 2 | **Y** | FA=Father, MO=Mother, CG=Court-appointed |
| W08 | `guardian_address` | String | 255 | **Y** | |
| W09 | `guardian_identity_proof` | BLOB | - | **Y** | |
| W10 | `guardian_address_proof` | BLOB | - | **Y** | |
| W11 | `court_order_document` | BLOB | - | Cond. | If W07=CG |
| W12 | `date_of_majority` | Date | 10 | **Y** | DOB + 18 years (auto-calculated) |
| W13 | `conversion_to_major_done` | Boolean | 1 | N | Must be done at age 18 |
| W14 | `conversion_date` | Date | 10 | Cond. | |

**Minor Restrictions**: Delivery trades only, no derivatives, max holding Rs.2 lakh across exchanges.

### W3: Second/Third Holder (if W01=J2 or J3)

Complete replication of Section A (Personal Identity), Section B (Address), Section C (Contact), Section D (POI), Section E (POA), Section K (PEP), Section J (FATCA) for each additional holder. Prefix fields with `holder2_` or `holder3_`.

### W4: Power of Attorney (if someone else operates)

| # | Field Name | Data Type | Size | Mandatory | Notes |
|---|-----------|-----------|------|-----------|-------|
| W15 | `poa_granted` | Boolean | 1 | **Y** | Y/N |
| W16 | `poa_holder_name` | String | 100 | Cond. | |
| W17 | `poa_holder_pan` | String | 10 | Cond. | Mandatory KYC per SEBI |
| W18 | `poa_holder_aadhaar` | String | 12 | Cond. | |
| W19 | `poa_holder_relationship` | String | 50 | Cond. | |
| W20 | `poa_execution_date` | Date | 10 | Cond. | |
| W21 | `poa_registration_number` | String | 30 | Cond. | |
| W22 | `poa_validity_period` | String | 20 | Cond. | |
| W23 | `poa_scope` | String | 2 | Cond. | TR=Trading, DM=Demat, BO=Both |
| W24 | `poa_notarized` | Boolean | 1 | Cond. | |
| W25 | `poa_document` | BLOB | - | Cond. | |
| W26 | `poa_revocation_date` | Date | 10 | N | If POA revoked |

---

## 25. Section X: Margin Pledge & Collateral

**Regulatory Basis**: SEBI peak margin norms, SEBI (Stock Brokers) Regulations 2026

| # | Field Name | Data Type | Size | Mandatory | Notes |
|---|-----------|-----------|------|-----------|-------|
| X01 | `pledge_consent_obtained` | Boolean | 1 | **Y** | Consent for pledging securities as margin |
| X02 | `pledge_agreement_date` | Date | 10 | Cond. | |
| X03 | `online_pledge_activated` | Boolean | 1 | N | |
| X04 | `mtf_enabled` | Boolean | 1 | **Y** | Margin Trading Facility |
| X05 | `mtf_agreement_date` | Date | 10 | Cond. | |
| X06 | `mtf_limit_sanctioned` | Decimal | 15,2 | Cond. | INR |
| X07 | `mtf_interest_rate` | Decimal | 5,2 | Cond. | % per annum |
| X08 | `collateral_type_preference` | String | 2 | N | CA=Cash, SE=Securities, FD=Fixed Deposit, ET=ETF |
| X09 | `total_pledged_value` | Decimal | 15,2 | N | Current total (with haircut) |
| X10 | `daily_margin_report_status` | String | 2 | N | CO=Compliant, NC=Non-Compliant |

---

## 26. Section Y: Account Lifecycle & Dormancy

**Regulatory Basis**: SEBI framework for automated deactivation (Jul 2022), SEBI (Stock Brokers) Regulations 2026

These fields track the account from activation through dormancy to closure. You will encounter them when building the account status dashboard and the automated dormancy workflows.

| # | Field Name | Data Type | Size | Mandatory | Notes |
|---|-----------|-----------|------|-----------|-------|
| Y01 | `account_status` | String | 2 | **Y** | AC=Active, IN=Inactive, DO=Dormant, SU=Suspended, CL=Closed |
| Y02 | `account_status_date` | Date | 10 | **Y** | Last status change |
| Y03 | `account_status_reason` | String | 100 | N | |
| Y04 | `last_trade_date` | Date | 10 | N | |
| Y05 | `days_inactive` | Number | 5 | N | Auto-calculated |
| Y06 | `dormancy_declaration_date` | Date | 10 | N | Typically after 12 months inactive |
| Y07 | `reactivation_request_date` | Date | 10 | N | |
| Y08 | `reactivation_approval_date` | Date | 10 | N | |
| Y09 | `reactivation_fresh_kyc` | Boolean | 1 | N | |
| Y10 | `closure_request_date` | Date | 10 | N | |
| Y11 | `closure_reason` | String | 100 | N | |
| Y12 | `closure_securities_settled` | Boolean | 1 | N | |
| Y13 | `closure_funds_settled` | Boolean | 1 | N | |
| Y14 | `final_closure_date` | Date | 10 | N | |
| Y15 | `kyc_validity_start` | Date | 10 | **Y** | |
| Y16 | `kyc_validity_end` | Date | 10 | **Y** | 5-year cycle |
| Y17 | `next_kyc_review_date` | Date | 10 | **Y** | |
| Y18 | `ovd_expiry_date` | Date | 10 | N | For Passport/DL |
| Y19 | `kyc_inadequacy_reason` | String | 50 | N | If auto-deactivated |
| Y20 | `auto_deactivation_date` | Date | 10 | N | SEBI framework for inadequate KYC |

---

## 27. Section Z: Audit Trail & Modification Tracking

**Regulatory Basis**: SEBI (Stock Brokers) Regulations 2026 - 8-year record retention

Every change to a client record is logged. This is not optional -- SEBI requires a complete, tamper-proof audit trail for eight years. The maker-checker workflow (Z09-Z15) ensures that no single person can modify a client record without a second person reviewing and approving the change.

### Z1: Modification Log (per change)

| # | Field Name | Data Type | Size | Mandatory | Notes |
|---|-----------|-----------|------|-----------|-------|
| Z01 | `modification_id` | String | 20 | **Y** | Unique change ID |
| Z02 | `field_name` | String | 50 | **Y** | Which field changed |
| Z03 | `old_value` | String | 500 | **Y** | Previous value |
| Z04 | `new_value` | String | 500 | **Y** | New value |
| Z05 | `modification_date` | DateTime | - | **Y** | ISO 8601 |
| Z06 | `modified_by_user` | String | 50 | **Y** | User ID |
| Z07 | `modification_source` | String | 2 | **Y** | CR=Client Request, CO=Compliance, KR=KRA Update, SY=System |
| Z08 | `modification_reason` | String | 200 | N | |

### Z2: Maker-Checker Workflow

| # | Field Name | Data Type | Size | Mandatory | Notes |
|---|-----------|-----------|------|-----------|-------|
| Z09 | `approval_status` | String | 2 | **Y** | PE=Pending, AP=Approved, RJ=Rejected |
| Z10 | `maker_id` | String | 50 | **Y** | |
| Z11 | `maker_timestamp` | DateTime | - | **Y** | |
| Z12 | `checker_id` | String | 50 | Cond. | |
| Z13 | `checker_timestamp` | DateTime | - | Cond. | |
| Z14 | `approval_level` | String | 2 | N | L1/L2/L3 |
| Z15 | `rejection_reason` | String | 200 | Cond. | |

### Z3: Suspicious Activity Tracking

| # | Field Name | Data Type | Size | Mandatory | Notes |
|---|-----------|-----------|------|-----------|-------|
| Z16 | `suspicious_activity_flagged` | Boolean | 1 | N | |
| Z17 | `suspicious_activity_type` | String | 50 | Cond. | |
| Z18 | `sar_filed` | Boolean | 1 | Cond. | Suspicious Activity Report |
| Z19 | `sar_filing_date` | Date | 10 | Cond. | |
| Z20 | `investigation_status` | String | 2 | Cond. | OP=Open, CL=Closed |

---

## 28. Section AA: DPDP Act 2023 Consent Management

**Regulatory Basis**: Digital Personal Data Protection Act 2023, DPDP Rules 2025 (compliance deadline: May 13, 2027)

The DPDP (Digital Personal Data Protection) Act requires granular, informed consent before processing personal data. Each consent purpose must be separately captured and independently revocable.

| # | Field Name | Data Type | Size | Mandatory | Notes |
|---|-----------|-----------|------|-----------|-------|
| AA01 | `dpdp_consent_obtained` | Boolean | 1 | **Y** | |
| AA02 | `dpdp_consent_date` | Date | 10 | **Y** | |
| AA03 | `dpdp_consent_version` | String | 10 | **Y** | Version of consent text |
| AA04 | `dpdp_consent_expiry` | Date | 10 | N | |
| AA05 | `dpdp_marketing_consent` | Boolean | 1 | **Y** | Separate granular consent |
| AA06 | `dpdp_third_party_sharing_consent` | Boolean | 1 | **Y** | |
| AA07 | `dpdp_analytics_consent` | Boolean | 1 | **Y** | |
| AA08 | `dpdp_cross_border_consent` | Boolean | 1 | **Y** | |
| AA09 | `dpdp_consent_withdrawal_date` | Date | 10 | N | |
| AA10 | `dpdp_right_to_access_request` | Date | 10 | N | |
| AA11 | `dpdp_right_to_correction_request` | Date | 10 | N | |
| AA12 | `dpdp_right_to_erasure_request` | Date | 10 | N | |
| AA13 | `dpdp_breach_notification_sent` | Boolean | 1 | N | |
| AA14 | `dpdp_breach_notification_date` | Date | 10 | N | |
| AA15 | `data_retention_end_date` | Date | 10 | **Y** | 8 years per SEBI Regs |

---

## 29. Section AB: Communication Preferences

**Regulatory Basis**: SEBI circular Dec 3, 2024 (SMS/Email alerts mandatory)

| # | Field Name | Data Type | Size | Mandatory | Notes |
|---|-----------|-----------|------|-----------|-------|
| AB01 | `pref_email_notifications` | Boolean | 1 | **Y** | Cannot be N (mandatory per SEBI) |
| AB02 | `pref_sms_notifications` | Boolean | 1 | **Y** | Cannot be N (mandatory per SEBI) |
| AB03 | `pref_whatsapp_notifications` | Boolean | 1 | N | Optional |
| AB04 | `pref_push_notifications` | Boolean | 1 | N | Mobile app |
| AB05 | `pref_language` | String | 2 | **Y** | EN=English, HI=Hindi, regional codes |
| AB06 | `pref_contract_note_mode` | String | 2 | **Y** | EM=Email (mandatory), PH=Physical+Email |
| AB07 | `pref_statement_frequency` | String | 2 | N | DA=Daily, WK=Weekly, MN=Monthly |
| AB08 | `dnd_registered` | Boolean | 1 | N | Do Not Disturb (TRAI) |
| AB09 | `whatsapp_optin_date` | Date | 10 | Cond. | |

---

## 30. Section AC: Running Account Settlement

**Regulatory Basis**: SEBI guidelines effective 2025, auto-settlement for inactive accounts within 30 days

| # | Field Name | Data Type | Size | Mandatory | Notes |
|---|-----------|-----------|------|-----------|-------|
| AC01 | `ras_authorized` | Boolean | 1 | **Y** | Running Account Authorization |
| AC02 | `ras_settlement_frequency` | String | 2 | **Y** | MN=Monthly, QR=Quarterly |
| AC03 | `ras_next_settlement_date` | Date | 10 | **Y** | Auto-calculated |
| AC04 | `ras_last_settlement_date` | Date | 10 | N | |
| AC05 | `ras_settlement_bank_account` | String | 18 | **Y** | Primary bank for fund return |
| AC06 | `ras_auto_settlement_trigger_days` | Number | 3 | **Y** | Default: 30 days inactive |
| AC07 | `ras_last_transaction_date` | Date | 10 | N | |
| AC08 | `ras_optin_date` | Date | 10 | **Y** | |
| AC09 | `ras_optout_date` | Date | 10 | N | |

---

## Appendix A: Code Tables

The code tables below are the lookup values used throughout the master dataset. You will reference these when building dropdowns, writing validation logic, or parsing data from external systems.

### A1: Occupation Codes (KRA/CKYC)

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
| 10 | Forex Dealer |
| 11 | Self Employed |
| 99 | Others (specify) |

### A2: POI Document Type Codes

| Code | Document |
|------|----------|
| A | Passport |
| B | Voter ID Card |
| C | Driving License |
| D | PAN Card (with photograph) |
| E | Aadhaar / UID |
| F | NREGA Job Card |
| G | NPR Letter / Govt ID |
| Z | Others |

### A3: POA Document Type Codes

| Code | Document |
|------|----------|
| A | Passport |
| B | Voter ID Card |
| C | Driving License |
| D | Aadhaar / UID |
| E | Utility Bill (max 2 months old) |
| F | Bank Statement (max 3 months old) |
| G | Property/Municipal Tax Receipt |
| H | Govt/Defense ID Card |
| Z | Others |

### A4: KRA Status Codes

| Status | Description | Trading Allowed |
|--------|-------------|-----------------|
| KYC Registered | Fully compliant, validated | **Yes** |
| KYC Validated | Verified + client confirmed details | **Yes** |
| Under Process | KRA processing, verification underway | No |
| On Hold | Discrepancy in documents/validation | No |
| KYC Rejected | Rejected after verification | No |
| KYC Registered - Incomplete | Old record, needs update | Limited |
| Not Available | No record in any KRA | N/A (fresh KYC) |

:::tip[The two statuses that matter most]
In day-to-day operations, you will mostly care about "KYC Registered" and "On Hold." The first means the customer can trade; the second means something in their KYC did not pass validation and needs manual intervention before trading can begin.
:::

### A5: Relationship Codes (Nominees)

| Code | Relationship |
|------|-------------|
| FA | Father |
| MO | Mother |
| SP | Spouse |
| SO | Son |
| DA | Daughter |
| BR | Brother |
| SI | Sister |
| GF | Grandfather |
| GM | Grandmother |
| OT | Others (specify) |

### A6: State Codes (India)

| Code | State | Code | State |
|------|-------|------|-------|
| AN | Andaman & Nicobar | MH | Maharashtra |
| AP | Andhra Pradesh | MN | Manipur |
| AR | Arunachal Pradesh | ML | Meghalaya |
| AS | Assam | MZ | Mizoram |
| BR | Bihar | NL | Nagaland |
| CH | Chandigarh | OD | Odisha |
| CT | Chhattisgarh | PY | Puducherry |
| DD | Daman & Diu | PB | Punjab |
| DL | Delhi | RJ | Rajasthan |
| GA | Goa | SK | Sikkim |
| GJ | Gujarat | TN | Tamil Nadu |
| HR | Haryana | TG | Telangana |
| HP | Himachal Pradesh | TR | Tripura |
| JK | Jammu & Kashmir | UP | Uttar Pradesh |
| JH | Jharkhand | UT | Uttarakhand |
| KA | Karnataka | WB | West Bengal |
| KL | Kerala | LA | Ladakh |
| MP | Madhya Pradesh | | |

### A7: CKYC Constitution Types

| Code | Type |
|------|------|
| 01 | Individual |
| 02 | Partnership Firm |
| 03 | Company |
| 04 | Trust |
| 05 | HUF |
| 06 | Government Entity |
| 07 | Society |
| 08 | AOP/BOI |
| 09 | LLP |
| 10 | Others |

---

## Appendix B: Regulatory Circular Reference

| # | Topic | Circular Number | Date | Key Impact |
|---|-------|----------------|------|------------|
| 1 | KYC Master Circular | SEBI/HO/MIRSD/MIRSD-SEC-2/P/CIR/2023/168 | Oct 12, 2023 | Consolidated KYC norms, CERSAI templates |
| 2 | AML/CFT Guidelines | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/78 | Jun 6, 2024 | Anti-Money Laundering standards |
| 3 | FATCA/CRS at KRAs | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 | Feb 20, 2024 | Mandatory FATCA upload to KRA from Jul 1, 2024 |
| 4 | KRA Validation Review | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/41 | May 14, 2024 | On-Hold -> KYC Registered relaxation |
| 5 | KRA Upload to CKYCRR | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/79 | Jun 6, 2024 | Mandatory CKYC upload from Aug 1, 2024 |
| 6 | e-KYC & DigiLocker | SEBI/HO/MIRSD/DOP/CIR/P/2020/73 | Apr 24, 2020 | Aadhaar e-KYC + DigiLocker permitted |
| 7 | e-KYC Setu (NPCI) | SEBI press release | Jun 30, 2025 | Aadhaar e-KYC without sharing Aadhaar number |
| 8 | DDPI replacing POA | SEBI/HO/MIRSD/DoP/P/CIR/2022/44 | Apr 4, 2022 | DDPI mandatory from Nov 18, 2022 |
| 9 | Nomination Revamp | SEBI circular | Jan 10, 2025 | Up to 10 nominees, video opt-out |
| 10 | Nomination Simplification | SEBI circular | Jun 10, 2024 | Only 3 mandatory fields for nomination |
| 11 | DigiLocker for Assets | SEBI/HO/OIAE/OIAE_IAD-3/P/CIR/2025/32 | Mar 19, 2025 | Demat statements in DigiLocker |
| 12 | Stock Brokers Master | SEBI/HO/MIRSD/MIRSD-PoD/P/CIR/2025/90 | Jun 17, 2025 | Consolidated broker operations circular |
| 13 | KYC Overhaul Consultation | SEBI consultation paper | Jan 16, 2026 | Proposed: centralized supplementary KYC, 5-yr review cycle |

---

## Appendix C: Third-Party API Specifications

> **Detailed vendor comparison, recommended vendors, API endpoints, request/response formats, and complete integration sequence are in [Vendor Integrations](/broking-kyc/vendors/)**

### C1: PAN Verification API (NSDL/Protean)

**Recommended Vendor**: Decentro (see [Vendor Integrations](/broking-kyc/vendors/))
**Endpoint**: ITD-authorized service (Protean/NSDL)

| Direction | Field | Type | Notes |
|-----------|-------|------|-------|
| **Request** | pan | String(10) | PAN number |
| | name | String | For name matching |
| | dob | Date | For DOB matching |
| | consent | String | "Y" mandatory |
| | reason | String | Purpose |
| **Response** | status | String | E/F/X/D/N/EA/EC/ED/EF |
| | registered_name | String | Name per ITD |
| | category | String | P=Individual |
| | dob | Date | DOB per ITD |
| | aadhaar_seeding_status | String | Y/N (PAN-Aadhaar link) |
| | name_match | Boolean | |
| | dob_match | Boolean | |
| | valid | Boolean | Overall validity |

### C2: Bank Account Verification (Penny Drop)

**Method**: IMPS-based Rs.1 credit

| Direction | Field | Type | Notes |
|-----------|-------|------|-------|
| **Request** | account_number | String(18) | |
| | ifsc | String(11) | `[A-Z]{4}0[A-Z0-9]{6}` |
| | beneficiary_name | String | For matching |
| **Response** | status | String | SUCCESS/FAILURE |
| | name_at_bank | String | Registered holder name |
| | name_match_score | Integer | 0-100 |
| | name_match_result | String | FULL_MATCH/PARTIAL_MATCH/NO_MATCH |
| | account_exists | Boolean | |
| | utr | String | Bank UTR reference |
| | payment_mode | String | IMPS/NEFT/UPI |

### C3: DigiLocker Consent Flow

**Documents Fetchable**:
- Aadhaar (e-Aadhaar XML with demographic + address + photo)
- PAN Card (number, name, father's name, DOB)
- Driving License (number, name, DOB, address, validity, vehicle classes)
- Voter ID, Passport, Insurance Policy, Bank Statements

**Aadhaar XML Fields Returned**:
- name, dob, gender, photo (base64)
- Address: careOf, house, street, landmark, locality, vtc, subDistrict, district, state, country, pincode, postOffice

### C4: e-Sign (Aadhaar OTP-based)

| Direction | Field | Type | Notes |
|-----------|-------|------|-------|
| **Request** | document_hash | String | SHA-256 of document |
| | aadhaar_number | String(12) | |
| | auth_mode | String | OTP/BIOMETRIC/FACE |
| | otp | String(6) | If auth_mode=OTP |
| | asp_id | String | Application Service Provider ID |
| **Response** | status | String | SUCCESS/FAILURE |
| | signed_document | Base64 | Digitally signed PDF |
| | signature_value | Base64 | Digital signature |
| | certificate_chain | Array | X.509 cert chain |
| | esign_txn_id | String | Transaction ID |
| | dsc_serial_number | String | DSC serial |

### C5: KRA Web Service (CVL KRA Example)

**SOAP Endpoint**: `cvlkra.com/PANInquiry.asmx`

| Method | Purpose |
|--------|---------|
| `GetPanStatus` | Check KYC status across all KRAs |
| `InsertUpdateKYCRecord` | Submit/modify KYC record (XML) |
| `SolicitPANDetailsFetchALLKRA` | Fetch PAN details from all KRAs |

**File Format**: Tilde (~) delimited text file for bulk upload/download

### C6: CKYC API (via Protean/aggregators)

| Operation | Method | Key Fields |
|-----------|--------|------------|
| Search | POST | document_type, id_number, consent | Returns masked CKYC ID |
| Download | POST | ckyc_id or reference_id, consent | Returns full record + images |
| Upload | POST | Full individual record (see Section T) | Returns 14-digit KIN |

---

## Appendix D: Onboarding Process Flow

### Phase 1: Pre-Check & Data Fetch
```
1. Client provides PAN + Mobile
2. PAN Verification (Protean) -> Validate PAN status, get name/DOB
3. KRA Lookup (by PAN) -> Check if KYC exists
4. If KRA found: KRA Fetch -> Download existing record -> Pre-fill form
5. If KRA not found: CKYC Search (by PAN) -> Download if found -> Pre-fill
6. If neither found: Fresh KYC flow
```

### Phase 2: Identity & Address Capture
```
7. Aadhaar consent via DigiLocker -> Fetch Aadhaar XML (name, address, photo)
8. OR: Manual document upload (POI + POA)
9. Cross-verify: PAN name vs Aadhaar name vs KRA name
10. Capture remaining personal details not available from pre-fill
```

### Phase 3: Financial & Compliance
```
11. Bank account details -> Penny Drop verification
12. Income/Occupation details
13. Income proof upload (if F&O/Commodity segments selected)
14. FATCA/CRS self-certification
15. PEP/AML declaration
16. Risk profiling questionnaire
```

### Phase 4: Nominations & Authorizations
```
17. Nominee details (1-10) OR opt-out with video verification
18. DDPI authorization (optional)
19. Running account authorization
20. Segment selection (Equity/F&O/Currency/Commodity)
21. Risk disclosure acknowledgements per segment
```

### Phase 5: Verification & Signing
```
22. IPV/VIPV (unless Aadhaar e-KYC exemption applies)
23. Review all captured data
24. e-Sign via Aadhaar OTP on complete application
```

### Phase 6: Registration & Submission
```
25. Upload to KRA (within 3 working days)
26. Upload to CKYC (within 3 working days)
27. Register UCC on NSE/BSE/MCX
28. Open BO account on CDSL/NSDL
29. Activate trading segments
30. Generate welcome kit / credentials
31. Client ready to trade
```

### Phase 7: KYC Admin Validation (Back-Office)
```
32. Admin reviews captured data vs verification results
33. Name match check (PAN vs Aadhaar vs Bank vs KRA)
34. Address validation
35. Bank proof validation
36. Income proof validation (for derivative segments)
37. FATCA/CRS review
38. PEP screening
39. IPV/VIPV recording review
40. Document quality check
41. KRA submission status monitoring
42. CKYC submission status monitoring
43. Exchange UCC confirmation
44. Final approval / rejection with reasons
```

---

## Field Count Summary

| Section | Description | Total Fields | Mandatory |
|---------|-------------|-------------|-----------|
| A | Personal Identity | 32 | 16 |
| B | Address Details | 19 | 10 |
| C | Contact Details | 9 | 3 |
| D | Identity Documents (POI) | 7 | 5 |
| E | Address Documents (POA) | 7 | 5 |
| F | Financial Profile | 10 | 3 |
| G | Bank Account Details (per account) | 16 | 12 |
| H | Demat Account Details | 9 | 8 |
| I | Nomination Details (per nominee) | 22 | 12 |
| J | FATCA/CRS Declaration | 15 | 8 |
| K | PEP & AML Declaration | 6 | 4 |
| L | Trading Preferences & Segments | 12 | 7 |
| M | Risk Profiling | 6 | 4 |
| N | IPV / VIPV | 21 | 5+ |
| O | DDPI Authorization | 10 | 1 |
| P | Consent & Declarations | 23 | 16 |
| Q | Document Images | 16 | 8 |
| R | Third-Party Verification Results | 42 | - (system) |
| S | KRA Submission Data | 14 | 10 |
| T | CKYC Submission Data | 12 | 8 |
| U | Exchange Registration (UCC) | 15 | 5+ |
| V | NRI-Specific Requirements | 22 | ~12 (NRI only) |
| W | Minor / Joint / POA Accounts | 26 | conditional |
| X | Margin Pledge & Collateral | 10 | 2 |
| Y | Account Lifecycle & Dormancy | 20 | 5 |
| Z | Audit Trail & Modification | 20 | ~10 (system) |
| AA | DPDP Consent Management | 15 | 8 |
| AB | Communication Preferences | 9 | 4 |
| AC | Running Account Settlement | 9 | 5 |
| **TOTAL** | | **~454** | **~200** |

---

*This specification covers the complete superset of data fields required for onboarding an individual customer in an Indian stock broking firm. The actual fields captured will vary based on:*
- *Whether existing KRA/CKYC record is found (pre-fill reduces capture)*
- *Segments selected (F&O/Commodity need income proof)*
- *KYC method used (Aadhaar e-KYC exempts IPV)*
- *DDPI and nomination choices*
- *Residential status (NRI has additional requirements - see Section V)*
- *Account type: Minor (Section W) / Joint (Section W) / POA (Section W)*
- *Margin trading facility opted (Section X)*

**For third-party API specifications, vendor selection, and integration sequences, see [Vendor Integrations](/broking-kyc/vendors/)**

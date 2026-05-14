---
title: "Section I: Nomination Details — Data Flow"
description: "Where each field in Section I: Nomination Details flows downstream — destinations, formats, frequencies, transformations, quirks."
---

> **Why this page is structured this way:** This is the field-first view for Section I: Nomination Details. Each row is one field-destination relationship. To see the same data from the destination's perspective, jump from the [atlas overview](/broking-kyc/reference/field-atlas/).

## TL;DR

- **22 unique fields** in this section.
- **58 field-destination relationships** total.
- Source-of-truth field definitions: [Master Dataset](/broking-kyc/reference/master-dataset/).

## Data flow table

Sorted by `field_id`, then `destination`.

| field_id | field_name | destination | destination_field_name | destination_format | frequency | transformation | quirks_notes | spec_source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| I-guardian_address | Guardian Address | cdsl-bo | GUARDIAN_ADDRESS | CHAR(255) | on-modify | truncate to N | Mandatory if minor nominee; right-padded | <abbr title="Central Depository Services (India) Limited">CDSL</abbr>/OPS/<abbr title="Depository Participant">DP</abbr>/POLCY/2025/289 |
| I-guardian_address | Guardian Address | nsdl-bo | GdnAdr | VARCHAR(255) UDiFF | on-modify | truncate to N | ISO 20022 address structure | <abbr title="National Securities Depository Limited">NSDL</abbr>/POLICY/2025/0030 |
| I-guardian_name | Guardian Name | back-office | guardian_nm | VARCHAR(100) | on-modify | [direct] | conditional on minor nominee; transmission custodian | [industry typical] |
| I-guardian_name | Guardian Name (Minor Nominee) | cdsl-bo | GUARDIAN_NAME | CHAR(100) | on-modify | uppercase | Conditional in line 07; mandatory if nominee_is_minor=Y | CDSL/OPS/DP/POLCY/2025/289 |
| I-guardian_name | Guardian Name (Minor Nominee) | nsdl-bo | GdnNm | VARCHAR(100) UDiFF | on-modify | uppercase | Conditional ISO-tagged element | NSDL/POLICY/2025/0030 |
| I-guardian_pan | Guardian <abbr title="Permanent Account Number">PAN</abbr> | back-office | guardian_pan | CHAR(10) | on-modify | uppercase | conditional; mandatory <abbr title="Know Your Customer (process).">KYC</abbr> of guardian | [industry typical] |
| I-guardian_pan | Guardian PAN | cdsl-bo | GUARDIAN_PAN | CHAR(10) | on-modify | uppercase | Conditional on nominee_is_minor=Y | CDSL/OPS/DP/POLCY/2025/289 |
| I-guardian_pan | Guardian PAN | nsdl-bo | GdnPANNb | CHAR(10) UDiFF | on-modify | uppercase | Conditional element | NSDL/POLICY/2025/0030 |
| I-guardian_relationship | Guardian Relationship | cdsl-bo | GUARDIAN_RELATION | CHAR(2) | on-modify | lookup against R | Relationship code FA/MO/CG; conditional on nominee_is_minor=Y | CDSL/OPS/DP/POLCY/2025/289 |
| I-guardian_relationship | Guardian Relationship | nsdl-bo | GdnRltnshp | CHAR(2) UDiFF | on-modify | lookup against R | Conditional element | NSDL/POLICY/2025/0030 |
| I-nomination_opted | Nomination Opted | back-office | nom_opted_flg | CHAR(1) | on-modify | [direct] | Y/N; N requires video opt-out per Jan 2025 revamp | <abbr title="Securities and Exchange Board of India">SEBI</abbr> circular Jan 10, 2025 |
| I-nomination_opted | Nomination Opted | cdsl-bo | NOMINATION_OPTED | CHAR(1) | one-time | [direct] | Y/N; line 07 mandatory; per SEBI Jun 10, 2024 simplification 3 fields minimum at opt-in | CDSL/OPS/DP/POLCY/2024/317 |
| I-nomination_opted | Nomination Opted | nsdl-bo | NomFlg | CHAR(1) UDiFF | one-time | [direct] | Y/N element; ISO-tagged; can be changed any number of times per SEBI Jan 10, 2025 | NSDL/POLICY/2025/0006 |
| I-nominee_aadhaar | Nominee Aadhaar (Last 4) | cdsl-bo | NOMINEE_AADHAAR_L4 | CHAR(4) | on-modify | formatted | Last 4 digits only; first 8 must be 'X' if full Aadhaar captured per CDSL/OPS/DP/SYSTM/2024/628 | CDSL/OPS/DP/SYSTM/2024/628 |
| I-nominee_aadhaar | Nominee Aadhaar (Last 4) | nsdl-bo | NomAdhaarL4 | CHAR(4) UDiFF | on-modify | formatted | Last 4 digits only; masked per <abbr title="Digital Personal Data Protection Act 2023 (and Rules 2025)">DPDP</abbr> | NSDL/POLICY/2025/0030 |
| I-nominee_address | Nominee Address | back-office | nom_addr | VARCHAR(255) | on-modify | [direct] | transmission documents lookup | [industry typical] |
| I-nominee_address | Nominee Address | cdsl-bo | NOMINEE_ADDRESS | CHAR(255) | on-modify | truncate to N | Mandatory at opening per SEBI revamp; line 07 nominee block; truncated to 255 | CDSL/OPS/DP/POLCY/2025/289 |
| I-nominee_address | Nominee Address | nsdl-bo | NomAdr | VARCHAR(255) UDiFF | on-modify | truncate to N | ISO 20022 address structure; address/state made optional from V2.0.0.0 (Apr 4, 2025) | NSDL/POLICY/2025/0042 |
| I-nominee_city | Nominee City | back-office | nom_city | VARCHAR(50) | on-modify | [direct] | intimation routing on holder death event | [industry typical] |
| I-nominee_city | Nominee City | cdsl-bo | NOMINEE_CITY | CHAR(35) | on-modify | truncate to N | Right-pad with spaces | CDSL/OPS/DP/POLCY/2025/289 |
| I-nominee_city | Nominee City | nsdl-bo | NomTwnNm | VARCHAR(50) UDiFF | on-modify | truncate to N | Conditional after V2.0.0.0 | NSDL/POLICY/2025/0042 |
| I-nominee_dob | Nominee DOB | back-office | nom_dob | DATE YYYYMMDD | on-modify | formatted | derives nominee_is_minor flag for guardian workflow | [industry typical] |
| I-nominee_dob | Nominee Date of Birth | cdsl-bo | NOMINEE_DOB | CHAR(8) | on-modify | formatted | YYYYMMDD format; mandatory; used to derive minor flag | CDSL/OPS/DP/SYSTM/2024/628 |
| I-nominee_dob | Nominee Date of Birth | nsdl-bo | NomBirthDt | ISODate (YYYY-MM-DD) | on-modify | formatted | ISO 8601 date; mandatory per Oct 21, 2024 nominee mandatory fields | NSDL/POLICY/2025/0030 |
| I-nominee_email | Nominee Email | cdsl-bo | NOMINEE_EMAIL | CHAR(100) | on-modify | lowercase | Mandatory per CDSL/OPS/DP/POLCY/2025/289 (was optional pre-revamp) | CDSL/OPS/DP/POLCY/2025/289 |
| I-nominee_email | Nominee Email | nsdl-bo | NomEmailAdr | VARCHAR(100) UDiFF | on-modify | lowercase | Email element | NSDL/POLICY/2025/0030 |
| I-nominee_is_minor | Nominee Is Minor | back-office | nom_is_minor | CHAR(1) | on-modify | derived from Y | derived from nominee_dob; triggers guardian-section requirement | [industry typical] |
| I-nominee_is_minor | Nominee is Minor | cdsl-bo | NOMINEE_MINOR_FLG | CHAR(1) | on-modify | derived from Y | Derived from nominee_dob; Y if age < 18; triggers guardian block in line 07 | CDSL/OPS/DP/POLCY/2025/289 |
| I-nominee_is_minor | Nominee is Minor | nsdl-bo | NomMnrFlg | CHAR(1) UDiFF | on-modify | derived from Y | Derived element; triggers Gdn block in XML | NSDL/POLICY/2025/0030 |
| I-nominee_mobile | Nominee Mobile | back-office | nom_mobile | VARCHAR(15) | on-modify | [direct] | transmission intimation route | [industry typical] |
| I-nominee_mobile | Nominee Mobile | cdsl-bo | NOMINEE_MOBILE | CHAR(15) | on-modify | [direct] | Mandatory per CDSL/OPS/DP/POLCY/2025/289; 10-digit India | CDSL/OPS/DP/POLCY/2025/289 |
| I-nominee_mobile | Nominee Mobile | nsdl-bo | NomMblNb | VARCHAR(15) UDiFF | on-modify | [direct] | ISO 20022 PhneNb pattern | NSDL/POLICY/2025/0030 |
| I-nominee_name | Nominee Name | back-office | nom_name | VARCHAR(100) | on-modify | [direct] | per-nominee row; transmission lookup key | [industry typical] |
| I-nominee_name | Nominee Name | cdsl-bo | NOMINEE_NAME | CHAR(100) | on-modify | uppercase | Repeats per nominee in line 07 block; mandatory; right-padded; per CDSL/OPS/DP/POLCY/2025/289 | CDSL/OPS/DP/POLCY/2025/289 |
| I-nominee_name | Nominee Name | nsdl-bo | NomNm | VARCHAR(100) UDiFF | on-modify | uppercase | ISO-tagged repeating element; mandatory | NSDL/POLICY/2025/0030 |
| I-nominee_pan | Nominee PAN | back-office | nom_pan | CHAR(10) | on-modify | uppercase | conditional; one unique ID per nominee mandatory | [industry typical] |
| I-nominee_pan | Nominee PAN | cdsl-bo | NOMINEE_PAN | CHAR(10) | on-modify | uppercase | One of PAN/last-4-Aadhaar/DL/Passport mandatory per SEBI Jun 10, 2024 simplification; right-padded | CDSL/OPS/DP/POLCY/2024/317 |
| I-nominee_pan | Nominee PAN | nsdl-bo | NomPANNb | CHAR(10) UDiFF | on-modify | uppercase | At least one identifier (PAN/Aadhaar-last4/DL/Passport) mandatory | NSDL/POLICY/2025/0030 |
| I-nominee_passport | Nominee Passport | cdsl-bo | NOMINEE_PASSPORT | CHAR(8) | on-modify | uppercase | Passport for <abbr title="Non-Resident Indian">NRI</abbr> nominee; one of the unique IDs per SEBI Jun 2024 simplification | CDSL/OPS/DP/POLCY/2024/317 |
| I-nominee_passport | Nominee Passport | nsdl-bo | NomPsprtNb | CHAR(8) UDiFF | on-modify | uppercase | Passport identifier element | NSDL/POLICY/2025/0030 |
| I-nominee_percentage | Nominee Percentage | back-office | nom_pct | NUMBER(5,2) | on-modify | [direct] | must sum to 100 across nominees; validated at <abbr title="Beneficial Owner">BO</abbr> ingestion | SEBI circular Jan 10, 2025 |
| I-nominee_percentage | Nominee Percentage | cdsl-bo | NOMINEE_PCT | CHAR(6) | on-modify | formatted | Format 999.99 zero-padded; sum across nominees must equal 100.00; rejection if mismatch | CDSL/OPS/DP/POLCY/2025/32 |
| I-nominee_percentage | Nominee Percentage | nsdl-bo | NomShrPctg | Decimal(5,2) UDiFF | on-modify | formatted | Percentage element; sum=100 validated; if not specified, distributed equally per SEBI Jan 2025 | NSDL/POLICY/2025/0006 |
| I-nominee_pincode | Nominee Pincode | back-office | nom_pin | CHAR(6) | on-modify | [direct] | physical dispatch on transmission | [industry typical] |
| I-nominee_pincode | Nominee Pincode | cdsl-bo | NOMINEE_PIN | CHAR(6) | on-modify | [direct] | 6-digit numeric | CDSL/OPS/DP/POLCY/2025/289 |
| I-nominee_pincode | Nominee Pincode | nsdl-bo | NomPstCd | CHAR(6) UDiFF | on-modify | [direct] | 6-digit numeric element | NSDL/POLICY/2024/0041 |
| I-nominee_relationship | Nominee Relationship | back-office | nom_rel_cd | VARCHAR(2) | on-modify | lookup against R | FA/MO/SP/SO/DA etc per code table | [industry typical] |
| I-nominee_relationship | Nominee Relationship | cdsl-bo | NOMINEE_RELATION | CHAR(2) | on-modify | lookup against R | Relationship code FA/MO/SP/SO/DA/BR/SI/GF/GM/OT; mandatory | CDSL/OPS/DP/POLCY/2025/32 |
| I-nominee_relationship | Nominee Relationship | nsdl-bo | NomRltnshp | CHAR(2) UDiFF | on-modify | lookup against R | Relationship code element; mandatory | NSDL/POLICY/2025/0006 |
| I-nominee_seq | Nominee Sequence Number | cdsl-bo | NOMINEE_SEQ | CHAR(2) | on-modify | [direct] | 01-10; line 07 repeating block sequence; rejection if duplicates | CDSL/OPS/DP/POLCY/2025/289 |
| I-nominee_seq | Nominee Sequence Number | nsdl-bo | NomSeqNb | VARCHAR(2) UDiFF | on-modify | [direct] | Sequence element 01-10; ordering element in XML | NSDL/POLICY/2025/0006 |
| I-nominee_state | Nominee State | back-office | nom_state | VARCHAR(30) | on-modify | [direct] | state for transmission stamp-duty determination | [industry typical] |
| I-number_of_nominees | Number of Nominees | back-office | num_nominees | NUMBER(2) | on-modify | [direct] | 1-10; expanded from 3 in Jan 2025 | SEBI circular Jan 10, 2025 |
| I-number_of_nominees | Number of Nominees | cdsl-bo | NUM_NOMINEES | CHAR(2) | on-modify | [direct] | 01-10 per SEBI Jan 10, 2025 revamp; line 07 | CDSL/OPS/DP/POLCY/2025/32 |
| I-number_of_nominees | Number of Nominees | nsdl-bo | NbOfNomins | VARCHAR(2) UDiFF | on-modify | [direct] | Up to 10 nominees per BO; per SEBI Jan 10, 2025 revamp | NSDL/POLICY/2025/0006 |
| I-opt_out_declaration | Opt-Out Declaration | back-office | opt_out_decl | CHAR(1) | on-modify | [direct] | requires 30-day video declaration window; pending status persists in BO | SEBI circular Jan 10, 2025 |
| I-opt_out_declaration | Opt-Out Declaration | cdsl-bo | OPT_OUT_FLAG | CHAR(1) | one-time | [direct] | Y if nominator opts out; needs video verification per SEBI; line 07 | CDSL/OPS/DP/POLCY/2025/145 |
| I-opt_out_declaration | Opt-Out Declaration | nsdl-bo | OptOutDcln | CHAR(1) UDiFF | one-time | [direct] | Opt-out flag; recorded via separate declaration block | NSDL/POLICY/2025/0030 |

## Verified through

2026-05-14

---

*AI-generated and not legal advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*

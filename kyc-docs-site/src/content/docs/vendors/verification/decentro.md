---
title: Decentro
description: PAN verification, bank account verification (penny drop), and CKYC proxy via Decentro unified REST API platform.
---


## 1. Overview

### What is Decentro

Decentro is an API-first financial infrastructure platform based in India. It provides a unified REST API layer over fragmented government and banking infrastructure -- PAN verification (NSDL/Protean), bank account verification (IMPS/NPCI), and CKYC (CERSAI) -- so that regulated entities like stock brokers do not have to integrate with each underlying system individually.

### Why Decentro for This Project

| Concern | Decentro's Value |
|---------|-----------------|
| PAN verification | Single API call against NSDL/ITD, returns status + name + category + Aadhaar seeding status |
| Bank account verification | Penny drop (IMPS Rs.1 credit), penniless (zero-cost), and reverse penny drop -- all via one endpoint |
| CKYC proxy | Abstracts CERSAI authentication (FI code, digital certificate) behind simple REST calls for Search, Download, and Upload |
| API-first design | REST/JSON, consistent request/response structure, reference IDs for idempotency |
| Sandbox | Staging environment available for integration testing before production go-live |
| Documentation | Comprehensive API docs at https://docs.decentro.tech with interactive Postman-style explorer |

### Key BFSI Clients

Decentro serves banks, NBFCs, fintechs, and brokerages across India. Publicly known clients include lending platforms, neobanks, and insurance companies that use their KYC and payments infrastructure. Specific client names should be confirmed during vendor evaluation.

### API Docs Portal

- Main: https://docs.decentro.tech
- KYC: https://docs.decentro.tech/docs/kyc-and-onboarding-identities-verification-services-customer-verification
- Payments/Bank Verify: https://docs.decentro.tech/reference/payments_api-validate-bank-account
- CKYC: https://docs.decentro.tech/docs/kyc-and-onboarding-identities-ckyc-services

---

## 2. PAN Verification API

### 2.1 Endpoint & Environments

| Environment | Base URL |
|-------------|---------|
| Staging | `https://in.staging.decentro.tech/kyc/public/api/customer/verification/validate` |
| Production | `https://in.decentro.tech/kyc/public/api/customer/verification/validate` |

### 2.2 Request

```http
POST /kyc/public/api/customer/verification/validate
Content-Type: application/json

Headers:
  client_id: <your_client_id>
  client_secret: <your_client_secret>
  module_secret: <your_kyc_module_secret>
```

```json
{
  "reference_id": "PAN_20260213_ABCDE1234F",
  "document_type": "PAN",
  "id_number": "ABCDE1234F",
  "consent": "Y",
  "purpose": "KYC onboarding for stock broking account"
}
```

**Fields**:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `reference_id` | string | Yes | Unique per request; use pattern `PAN_<timestamp>_<pan>` for traceability |
| `document_type` | string | Yes | `PAN`, `PAN_DETAILED`, or `PAN_COMPARE` |
| `id_number` | string | Yes | 10-character PAN (format: AAAAA9999A) |
| `consent` | string | Yes | Must be `"Y"` to confirm customer consent |
| `purpose` | string | Yes | Free-text purpose statement for audit trail |
| `name` | string | Only for `PAN_COMPARE` | Name to match against ITD records |
| `dob` | string | Only for `PAN_COMPARE` | DOB to match (DD/MM/YYYY) |

### 2.3 Response (Success)

```json
{
  "decentroTxnId": "DTX-xxxx-xxxx-xxxx",
  "status": "SUCCESS",
  "responseCode": "S00000",
  "message": "PAN verified successfully",
  "data": {
    "status": "valid",
    "id_number": "ABCDE1234F",
    "name": "RAHUL SHARMA",
    "category": "individual",
    "aadhaar_seeding_status": "Successful",
    "last_updated_at": "2025-06-15"
  }
}
```

### 2.4 Document Type Variants

| `document_type` | Purpose | Extra Fields Returned |
|-----------------|---------|----------------------|
| `PAN` | Basic verification | status, name, category, aadhaar_seeding_status |
| `PAN_DETAILED` | Extended personal info | + father_name, email, mobile, DOB, gender |
| `PAN_COMPARE` | Source match against NSDL | + name_match (boolean), dob_match (boolean); requires `name` + `dob` in request |

**Recommendation**: Use `PAN` for standard onboarding. Use `PAN_DETAILED` if you need father's name or DOB from ITD (saves a separate DigiLocker call in some flows). Use `PAN_COMPARE` only when you already have customer-provided name/DOB and want a hard match against ITD.

### 2.5 PAN Status Codes

These map to `pan_verify_status` (field R01) in Master Dataset.

| Code | Decentro `data.status` | Meaning | Onboarding Action |
|------|------------------------|---------|-------------------|
| E | `valid` | Existing and valid PAN | Proceed with onboarding |
| F | `fake` / `invalid` | Fake or invalid PAN number | **Reject** -- ask customer to verify PAN card |
| X | `deactivated` | Deactivated (PAN-Aadhaar not linked per Section 139AA) | **Reject** -- ask customer to link Aadhaar with PAN on Income Tax portal |
| D | `deleted` | Deleted by Income Tax Department | **Reject** -- PAN is permanently invalid |
| N | `not_found` | Not found in ITD database | **Reject** -- verify PAN number, may be a typo |
| EA | `valid` (with flag) | Valid + amalgamation event | Proceed with a note in admin dashboard |
| ED | `valid` (with flag) | Valid + death event recorded at ITD | **Reject** -- escalate to compliance team |

**Important**: Status `E` does not guarantee the person is alive. A deceased person's PAN may still show status `E` if ITD has not recorded the death event. This cannot be caught by PAN verification alone -- it requires cross-referencing with other sources (CKYC death flag, KRA status, or Video KYC as a physical presence check).

### 2.6 PAN Category (4th Character of PAN)

The 4th character of a PAN number encodes the entity type. This maps to `pan_verify_category` (field R04).

| 4th Char | Category | Entity Type |
|----------|----------|-------------|
| P | Individual (Person) | Natural person |
| C | Company | Incorporated under Companies Act |
| H | HUF (Hindu Undivided Family) | Joint family entity |
| F | Firm (Partnership) | Registered partnership firm |
| A | AOP (Association of Persons) | Association of Persons / Body of Individuals |
| T | Trust | Charitable or private trust |
| B | BOI (Body of Individuals) | Body of Individuals |
| L | Local Authority | Municipal corporation, panchayat, etc. |
| J | Artificial Juridical Person | Statutory body, government entity |
| G | Government | Central/State government |

**For broking KYC**: Individual onboarding expects `P` (Person). If the 4th character is anything other than `P`, the application must be routed to the non-individual onboarding flow which requires additional documentation (board resolution, authorized signatory, etc.).

### 2.7 Name Matching Logic

Decentro returns the name exactly as recorded at ITD (`data.name`). The broker's system is responsible for comparing this against the customer-provided name.

**Recommended approach**:
1. Normalize both names: uppercase, remove extra spaces, remove honorifics (Mr./Mrs./Dr.)
2. Tokenize into words
3. Compare using fuzzy matching (Jaro-Winkler or Levenshtein distance)
4. Score >= 85: auto-approve; 60-84: manual review; < 60: reject

**Common mismatches**:
- Initials vs full name: "R SHARMA" vs "RAHUL SHARMA"
- Middle name present/absent: "RAHUL KUMAR SHARMA" vs "RAHUL SHARMA"
- Spelling variations: "SURESH" vs "SURESH KUMAR"
- Transliteration: Hindi-to-English name variations

### 2.8 Bulk PAN Verification

Decentro provides a batch API for verifying multiple PANs in a single call. Useful for:
- Migrating existing clients to new system
- Periodic re-verification of client base
- Batch onboarding of corporate employees

Contact Decentro for batch API documentation and rate limits.

### 2.9 Data Mapping to Master Dataset

| Decentro Response Field | Master Dataset Field | Field ID | Section |
|------------------------|---------------------|----------|---------|
| `data.name` | `pan_verify_name` | R02 | R: Third-Party Results |
| `data.status` | `pan_verify_status` | R01 | R: Third-Party Results |
| `data.category` | `pan_verify_category` | R04 | R: Third-Party Results |
| `data.aadhaar_seeding_status` | `pan_aadhaar_seeding_status` | R05 | R: Third-Party Results |
| `decentroTxnId` | `pan_verify_txn_id` | R03 | R: Third-Party Results |

### 2.10 Cost

| Item | Estimated Cost |
|------|---------------|
| PAN basic verification (`PAN`) | Rs. 1-3 per call |
| PAN detailed verification (`PAN_DETAILED`) | Rs. 2-4 per call |
| PAN compare (`PAN_COMPARE`) | Rs. 2-4 per call |
| Bulk PAN (volume pricing) | Rs. 0.50-1.50 per call |

---

## 3. Bank Account Verification

### 3.1 Penny Drop (IMPS Rs.1 Credit) -- Primary Method

This is the primary bank verification method. Decentro initiates a Rs.1 IMPS credit to the customer's bank account. If the transfer succeeds, the account is valid and the beneficiary name is returned by the receiving bank.

#### Endpoint & Environments

| Environment | Base URL |
|-------------|---------|
| Staging | `https://in.staging.decentro.tech/core_banking/money_transfer/validate_account` |
| Production | `https://in.decentro.tech/core_banking/money_transfer/validate_account` |

#### Request

```http
POST /core_banking/money_transfer/validate_account
Content-Type: application/json

Headers:
  client_id: <your_client_id>
  client_secret: <your_client_secret>
  module_secret: <your_payments_module_secret>
```

```json
{
  "reference_id": "BANK_20260213_143052",
  "purpose_message": "KYC Bank Verification",
  "beneficiary_details": {
    "account_number": "1234567890",
    "ifsc": "SBIN0001234",
    "name": "RAHUL SHARMA"
  },
  "transfer_amount": 1,
  "validation_type": "pennydrop",
  "perform_name_match": true
}
```

**Fields**:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `reference_id` | string | Yes | Unique per request; `BANK_<timestamp>` |
| `purpose_message` | string | Yes | Narration that appears in bank statement |
| `beneficiary_details.account_number` | string | Yes | Customer's bank account number |
| `beneficiary_details.ifsc` | string | Yes | 11-character IFSC code |
| `beneficiary_details.name` | string | Yes | Customer-provided name (for matching) |
| `transfer_amount` | number | Yes | Always `1` (Rs.1 penny drop) |
| `validation_type` | string | Yes | `pennydrop`, `penniless`, or `reverse_pennydrop` |
| `perform_name_match` | boolean | Yes | Set `true` to get name match score |

#### Response (Success)

```json
{
  "decentroTxnId": "DTX-xxxx-xxxx-xxxx",
  "status": "SUCCESS",
  "data": {
    "transactionStatus": "Success",
    "accountStatus": "Valid",
    "beneficiaryName": "RAHUL SHARMA",
    "nameMatchScore": 95,
    "nameMatchResult": "FULL_MATCH",
    "validationType": "Penny Drop",
    "utr": "IMPS1234567890",
    "paymentMode": "IMPS"
  }
}
```

#### Response (Failure - Invalid Account)

```json
{
  "decentroTxnId": "DTX-xxxx-xxxx-xxxx",
  "status": "FAILURE",
  "responseCode": "E00001",
  "message": "Account validation failed",
  "data": {
    "transactionStatus": "Failed",
    "accountStatus": "Invalid",
    "failureReason": "Account does not exist or is closed"
  }
}
```

### 3.2 Name Match Scoring

Name match scoring is performed by Decentro when `perform_name_match` is set to `true`. The score compares the `beneficiary_details.name` you sent with the `beneficiaryName` returned by the receiving bank.

| Score Range | `nameMatchResult` | Onboarding Action |
|-------------|-------------------|-------------------|
| 85-100 | `FULL_MATCH` | Auto-approve bank verification |
| 50-84 | `PARTIAL_MATCH` | Manual review -- common with initials vs full name, missing middle name |
| 20-49 | `POOR_PARTIAL_MATCH` | Manual review required -- additional documents may be needed |
| 0-19 | `NO_MATCH` | **Reject** -- ask customer to check bank details or provide a different account |

**Common partial match scenarios**:
- "R SHARMA" (bank) vs "RAHUL SHARMA" (PAN) -- initials
- "RAHUL SHARMA" (bank) vs "RAHUL KUMAR SHARMA" (PAN) -- middle name
- "SMT RAHUL SHARMA" (bank) vs "RAHUL SHARMA" (PAN) -- bank-added prefix
- Joint account: bank returns primary holder name only

### 3.3 Penny Drop Operational Details

| Aspect | Detail |
|--------|--------|
| Transfer amount | Rs.1 (non-refundable, credited to customer's account) |
| Transfer mode | IMPS (Immediate Payment Service) via NPCI |
| Speed | Real-time, typically under 30 seconds |
| Bank coverage | All major banks on the IMPS network (99%+ coverage) |
| Working hours | 24x7x365 (IMPS is always-on) |
| Statement narration | Shows as "KYC Bank Verification" or custom `purpose_message` |

### 3.4 Penniless / Zero-Cost Verification

An alternative where no actual funds are transferred. Decentro validates the account number + IFSC combination through NPCI infrastructure without initiating a payment.

```json
{
  "reference_id": "BANK_PENNILESS_20260213",
  "purpose_message": "KYC Bank Verification",
  "beneficiary_details": {
    "account_number": "1234567890",
    "ifsc": "SBIN0001234",
    "name": "RAHUL SHARMA"
  },
  "validation_type": "penniless",
  "perform_name_match": true
}
```

| Aspect | Penny Drop | Penniless |
|--------|-----------|-----------|
| Cost | Rs. 2-5 per call | Rs. 1-2 per call |
| Fund transfer | Yes (Rs.1 credited) | No transfer |
| Reliability | High (IMPS confirmation) | Lower (some banks do not support) |
| Name returned | Always (from IMPS beneficiary enquiry) | Usually (depends on bank response) |
| Use case | Primary verification for onboarding | Cost-sensitive bulk re-verification |

**Recommendation**: Use penny drop for all new customer onboarding. Use penniless only for periodic re-verification of existing clients where cost matters and you already have a verified account on record.

### 3.5 Reverse Penny Drop (Alternative)

In reverse penny drop, the customer initiates a UPI payment of Rs.1 TO the broker's VPA (Virtual Payment Address). The broker's system receives the payment notification and extracts the verified account details from the UPI response.

| Aspect | Detail |
|--------|--------|
| Direction | Customer pays Rs.1 to broker's VPA |
| Verification source | UPI ecosystem provides verified account + name |
| Pros | User-initiated (higher trust), instant, cheapest |
| Cons | Requires customer to have UPI app, slightly more UX friction |
| Pioneer | Setu pioneered this method; Decentro may offer similar |
| Customer coverage | Only customers with active UPI setup |

**Flow**:
1. Broker generates a unique VPA or UPI collect request
2. Customer pays Rs.1 via any UPI app (GPay, PhonePe, Paytm, etc.)
3. Broker receives UPI callback with payer account details (name, account number, IFSC)
4. Broker verifies name match and marks bank as verified

**Note**: Not all customers have UPI. For customers without UPI (elderly, NRI with NRE accounts, etc.), fall back to standard penny drop.

### 3.6 Data Mapping to Master Dataset

| Decentro Response Field | Master Dataset Field | Field ID | Section |
|------------------------|---------------------|----------|---------|
| `data.transactionStatus` | `bank_verify_status` | R10 | R: Third-Party Results |
| `data.beneficiaryName` | `bank_verify_name_at_bank` | R11 | R: Third-Party Results |
| `data.nameMatchScore` | `bank_verify_name_match_score` | R12 | R: Third-Party Results |
| `data.nameMatchResult` | `bank_verify_name_match_result` | R13 | R: Third-Party Results |
| `data.utr` | `bank_verify_utr` | R15 | R: Third-Party Results |
| `data.paymentMode` | `bank_verify_payment_mode` | R16 | R: Third-Party Results |
| `decentroTxnId` | `bank_verify_txn_id` | R14 | R: Third-Party Results |

---

## 4. CKYC Proxy APIs

Decentro provides a simplified REST API layer over the CERSAI CKYC system. Without Decentro, brokers would need to handle CERSAI's FI code registration, digital certificate management, and SFTP-based batch uploads directly. Decentro abstracts all of this.

### 4.1 CKYC Search

Searches the CKYC registry by PAN (or other ID) to check if a customer already has a CKYC record.

**Endpoint**: `POST /kyc/ckyc/search`
**Docs**: https://docs.decentro.tech/reference/kyc-and-onboarding-api-reference-identities-ckyc-services-search

#### Request

```json
{
  "reference_id": "CKYC_SEARCH_20260213_143052",
  "document_type": "PAN",
  "id_number": "ABCDE1234F",
  "consent": true,
  "consent_purpose": "KYC verification for stock broking account"
}
```

#### Response

```json
{
  "decentroTxnId": "DTX-xxxx-xxxx-xxxx",
  "status": "SUCCESS",
  "responseCode": "S00000",
  "data": {
    "ckycId": "$XXXX1234$",
    "ckycReferenceId": "REF123456",
    "fullName": "RAHUL SHARMA",
    "kycDate": "15-06-2023",
    "fathersFullName": "SURESH SHARMA",
    "photo": "BASE64_ENCODED_PHOTO",
    "identityDetails": [
      {
        "idType": "PAN",
        "idNumber": "ABCDE1234F"
      }
    ]
  }
}
```

**Important**: Since January 2025, CKYC Search returns a **masked CKYC number** (format: `$XXXX1234$`). The full 14-digit CKYC Identification Number (KIN) is only available via the Download API. This was a CERSAI policy change to prevent unauthorized bulk lookups.

#### Search Result Interpretation

| Outcome | Meaning | Next Step |
|---------|---------|-----------|
| Record found | Customer has existing CKYC record | Call Download API to get full 50+ field record; prefill onboarding form |
| Record not found | No CKYC record exists for this PAN | Fresh KYC data capture required; Upload to CKYC after maker-checker approval |
| Error / timeout | CERSAI system unavailable | Retry; proceed with onboarding without CKYC prefill; queue CKYC search for later |

### 4.2 CKYC Download

Downloads the full CKYC record including personal details, addresses, contact info, identity documents, and images.

**Endpoint**: `POST /kyc/ckyc/download`
**Docs**: https://docs.decentro.tech/reference/kyc-and-onboarding-api-reference-identities-ckyc-services-download

#### Request

```json
{
  "reference_id": "CKYC_DOWNLOAD_20260213_143100",
  "ckyc_id": "$XXXX1234$",
  "consent": true,
  "consent_purpose": "KYC verification for stock broking account"
}
```

#### Response (Partial -- Key Fields)

The full response includes 50+ fields. Key fields for broking KYC:

```json
{
  "decentroTxnId": "DTX-xxxx-xxxx-xxxx",
  "status": "SUCCESS",
  "data": {
    "ckycId": "12345678901234",
    "fullName": "RAHUL SHARMA",
    "fathersFullName": "SURESH SHARMA",
    "mothersFullName": "SUNITA SHARMA",
    "dateOfBirth": "01-01-1990",
    "gender": "M",
    "maritalStatus": "Single",
    "nationality": "Indian",
    "residentialStatus": "Resident Individual",
    "occupation": "Service",
    "currentAddress": {
      "line1": "123, MG Road",
      "line2": "Sector 5",
      "city": "Gurgaon",
      "state": "Haryana",
      "pincode": "122001",
      "country": "India"
    },
    "permanentAddress": { "..." : "..." },
    "mobile": "9876543210",
    "email": "rahul.sharma@email.com",
    "identityDocuments": [
      { "type": "PAN", "number": "ABCDE1234F" },
      { "type": "AADHAAR", "number": "XXXX-XXXX-1234" }
    ],
    "photo": "BASE64_ENCODED_PHOTO",
    "signature": "BASE64_ENCODED_SIGNATURE",
    "kycDate": "15-06-2023",
    "kycVerifiedBy": "SOME_FI_CODE"
  }
}
```

### 4.3 CKYC Upload

Submits a new CKYC record to the CERSAI registry. Called asynchronously after maker-checker approval in the KYC Admin workflow.

**Endpoint**: `POST /kyc/ckyc/upload`
**Docs**: https://docs.decentro.tech/reference/kyc-and-onboarding-api-reference-identities-ckyc-services-upload-individuals

#### Required Payload Structure

The upload payload is complex because it mirrors the CERSAI record structure:

```json
{
  "reference_id": "CKYC_UPLOAD_20260213_150000",
  "fi_code": "BROKER_FI_CODE",
  "branch_code": "001",
  "verifier": {
    "name": "COMPLIANCE OFFICER NAME",
    "designation": "Compliance Officer",
    "employee_code": "EMP001",
    "place": "Mumbai",
    "date": "13-02-2026"
  },
  "individual_record": {
    "prefix": "Mr",
    "first_name": "RAHUL",
    "middle_name": "",
    "last_name": "SHARMA",
    "maiden_prefix": "",
    "maiden_first_name": "",
    "maiden_middle_name": "",
    "maiden_last_name": "",
    "fathers_full_name": "SURESH SHARMA",
    "mothers_full_name": "SUNITA SHARMA",
    "spouse_full_name": "",
    "date_of_birth": "01-01-1990",
    "gender": "M",
    "marital_status": "01",
    "nationality": "IN",
    "residential_status": "01",
    "occupation": "02",
    "mobile_code": "91",
    "mobile": "9876543210",
    "email": "rahul.sharma@email.com"
  },
  "disability_info": {
    "is_disabled": false
  },
  "current_address": {
    "line1": "123, MG Road",
    "line2": "Sector 5",
    "line3": "",
    "city": "Gurgaon",
    "district": "Gurgaon",
    "state": "06",
    "pincode": "122001",
    "country": "IN",
    "address_type": "01"
  },
  "permanent_address": { "...": "same structure as current_address" },
  "poa": {
    "document_type": "01",
    "document_number": "XXXX1234"
  },
  "kyc_verification_details": {
    "verification_type": "C",
    "verification_date": "13-02-2026",
    "verification_place": "Mumbai"
  },
  "documents": [
    {
      "type": "PHOTO",
      "format": "JPEG",
      "data": "BASE64_ENCODED_PHOTO"
    },
    {
      "type": "POA",
      "format": "PDF",
      "data": "BASE64_ENCODED_ADDRESS_PROOF"
    }
  ],
  "ids": [
    {
      "id_type": "PAN",
      "id_number": "ABCDE1234F"
    },
    {
      "id_type": "AADHAAR",
      "id_number": "XXXX-XXXX-1234"
    }
  ]
}
```

**Document constraints**: Each document (photo, address proof) must be Base64-encoded, max 1MB per file.

#### Response (Success)

```json
{
  "decentroTxnId": "DTX-xxxx-xxxx-xxxx",
  "status": "SUCCESS",
  "data": {
    "ckycId": "12345678901234",
    "message": "CKYC record uploaded successfully"
  }
}
```

**Returns**: 14-digit CKYC Identification Number (KIN) on success.

### 4.4 What Decentro Handles Behind the Scenes

| Complexity | Without Decentro | With Decentro |
|------------|-----------------|---------------|
| FI Code registration | Broker registers with CERSAI as Financial Institution | Decentro manages FI authentication |
| Digital certificate | Broker maintains CERSAI digital certificate, handles renewal | Decentro handles certificate lifecycle |
| Data format | CERSAI-specific XML/JSON structure with coded fields | Simplified JSON with readable field names |
| Batch upload (SFTP) | Broker sets up SFTP, formats batch files per CERSAI spec | Not needed -- use REST API |
| Error handling | CERSAI-specific error codes | Decentro normalizes to standard HTTP + clear messages |

---

## 5. Non-Individual Entity Handling

### 5.1 Corporate PAN (4th character `C` or `A`)

PAN verification returns the company/association name instead of individual name fields.

```json
{
  "data": {
    "status": "valid",
    "id_number": "AABCC1234D",
    "name": "ACME TECHNOLOGIES PRIVATE LIMITED",
    "category": "company",
    "aadhaar_seeding_status": "Not Applicable"
  }
}
```

- Aadhaar seeding is not applicable for companies
- DOI (Date of Incorporation) may be available via `PAN_DETAILED` variant
- Additional documents required: Board resolution, authorized signatory details, CIN

### 5.2 HUF PAN (4th character `H`)

```json
{
  "data": {
    "status": "valid",
    "id_number": "AABCH1234D",
    "name": "SURESH KUMAR HUF",
    "category": "huf"
  }
}
```

- Karta (head of HUF) details needed separately
- Bank account may be in HUF name or Karta name
- Both HUF PAN and Karta PAN must be verified

### 5.3 Partnership PAN (4th character `F`)

- Returns firm name
- Each partner's individual PAN must also be verified
- Authorized signatory PAN must be verified

### 5.4 Trust PAN (4th character `T`)

- Returns trust name
- Trustee details and their individual PANs must be verified separately
- Trust deed registration details required

### 5.5 NRI Bank Verification

NRE (Non-Resident External) and NRO (Non-Resident Ordinary) accounts:

| Aspect | Detail |
|--------|--------|
| IFSC codes | Same as regular accounts at the branch -- no special IFSC for NRE/NRO |
| Account number | May have different prefix/structure per bank for NRE vs NRO |
| Name format | Bank may include suffix like "NRE" or "NRO" in account holder name |
| Penny drop | Works the same way via IMPS network |
| Name match | May show lower score due to "NRE"/"NRO" suffix or slightly different name format |
| Recommendation | Accept partial match (score 50+) for NRI accounts and flag for manual review |

### 5.6 Corporate Bank Accounts

- Verification works identically to individual accounts
- Bank returns the company name as beneficiary
- Name match score compares company name (may differ slightly from PAN name, e.g., "ACME TECH PVT LTD" vs "ACME TECHNOLOGIES PRIVATE LIMITED")

### 5.7 Joint Accounts

- Penny drop returns the **primary holder's name only**
- If the customer is the second or third holder, name match will fail
- **Workaround**: If `NO_MATCH`, ask customer if it is a joint account; if yes, request a cancelled cheque or bank statement showing both names and route to manual review

---

## 6. Integration Details

### 6.1 Authentication

All Decentro API calls require three headers:

| Header | Description |
|--------|-------------|
| `client_id` | Your Decentro client identifier (issued during onboarding) |
| `client_secret` | Your Decentro client secret (issued during onboarding) |
| `module_secret` | Module-specific secret (KYC module, Payments module, etc.) |

**Key management**:
- Store in environment variables or secrets manager (never hardcode)
- Rotate quarterly per security policy
- Different credentials for staging vs production
- Each module (KYC, Payments) has its own `module_secret`

### 6.2 Base URLs

| Environment | Base URL | Purpose |
|-------------|---------|---------|
| Staging | `https://in.staging.decentro.tech` | Integration testing, sandbox data |
| Production | `https://in.decentro.tech` | Live transactions |

### 6.3 Rate Limits

| Plan | Typical TPS (Transactions Per Second) |
|------|---------------------------------------|
| Starter | 10-20 TPS |
| Growth | 50-100 TPS |
| Enterprise | 100-200 TPS |
| Custom | Negotiable above 200 TPS |

Rate limit headers returned in response:
- `X-RateLimit-Limit`: Maximum requests per window
- `X-RateLimit-Remaining`: Remaining requests in current window
- `X-RateLimit-Reset`: Time when the rate limit resets

### 6.4 SLA

| Metric | Target |
|--------|--------|
| API uptime | 99.9% |
| PAN verification P95 latency | < 2 seconds |
| Penny drop P95 latency | < 5 seconds (IMPS network dependent) |
| CKYC search P95 latency | < 5 seconds (CERSAI dependent) |
| Support response (production incidents) | < 4 hours |

### 6.5 Webhook Support

For asynchronous operations (e.g., penny drop where IMPS may be delayed):

```json
{
  "webhook_url": "https://your-domain.com/webhooks/decentro",
  "webhook_events": ["BANK_VERIFICATION_COMPLETE", "CKYC_UPLOAD_COMPLETE"]
}
```

- Configure webhooks via Decentro dashboard
- Verify webhook authenticity using HMAC signature in `X-Decentro-Signature` header
- Implement idempotent webhook handlers (Decentro may retry failed deliveries)

### 6.6 Error Codes

#### Standard HTTP Codes

| Code | Meaning | Action |
|------|---------|--------|
| 200 | Success | Process response |
| 400 | Bad Request | Fix input validation (missing field, wrong format) |
| 401 | Unauthorized | Check/refresh API credentials |
| 404 | Not Found | Record does not exist at source |
| 422 | Unprocessable Entity | Input format correct but semantically invalid |
| 429 | Rate Limited | Implement exponential backoff, retry after `Retry-After` header |
| 500 | Server Error | Retry with exponential backoff (Decentro issue) |
| 503 | Source Unavailable | Upstream source (ITD/NPCI/CERSAI) down; queue for retry |

#### Decentro-Specific Response Codes

| Code | Meaning |
|------|---------|
| `S00000` | Success |
| `E00001` | General error |
| `E00002` | Invalid input |
| `E00003` | Source timeout |
| `E00004` | Source unavailable |
| `E00005` | Rate limit exceeded |
| `E00006` | Insufficient balance (wallet-based billing) |

### 6.7 Retry Strategy

```
Retry policy:
  - Max retries: 3
  - Initial delay: 1 second
  - Backoff multiplier: 2x (1s, 2s, 4s)
  - Retry on: 429, 500, 503, network timeout
  - Do NOT retry: 400, 401, 404, 422
  - Penny drop specific: IMPS network may be slow during peak hours;
    if timeout, check status via reference_id before retrying
    (to avoid duplicate Rs.1 credits)
```

### 6.8 IP Whitelisting

- Optional but recommended for production
- Configure via Decentro dashboard
- Whitelist your server's static IPs (or NAT gateway IPs if behind VPC)
- Staging environment does not require IP whitelisting

---

## 7. Pricing

| Service | Estimated Cost (per call) | Notes |
|---------|--------------------------|-------|
| PAN Verification (basic) | Rs. 1-3 | Most common call |
| PAN Verification (detailed) | Rs. 2-4 | Includes DOB, father name |
| Penny Drop (IMPS) | Rs. 2-5 | + Rs.1 credited to customer |
| Penniless Verification | Rs. 1-2 | Lower reliability |
| Reverse Penny Drop | Rs. 1-2 | If supported by Decentro |
| CKYC Search | Rs. 3-5 | First check in CKYC flow |
| CKYC Download | Rs. 5-8 | Full 50+ field record |
| CKYC Upload | Rs. 8-10 | Generates 14-digit KIN |

**Volume discounts**: Available at 10K+, 50K+, 100K+ monthly transactions. Contact Decentro sales.

**Billing model**: Wallet-based (pre-paid) or invoice-based (post-paid with monthly settlement). Enterprise plans typically use invoice-based billing.

**Monthly minimum**: May apply depending on plan. Confirm during contract negotiation.

**Estimated cost per onboarding** (Decentro services only):
- PAN verification: Rs. 2
- Penny drop: Rs. 4
- CKYC search: Rs. 4
- CKYC upload (if needed): Rs. 9
- **Total**: Rs. 10-19 per customer (Decentro portion only)

---

## 8. Edge Cases

### 8.1 PAN of Deceased Person

- PAN status may still show `E` (valid) if ITD has not recorded the death event
- Cannot be caught by PAN verification alone
- Mitigation: Video KYC (VIPV) serves as physical presence verification; CKYC download may show death flag if updated by another FI; KRA status may be updated

### 8.2 Closed Bank Account

- Penny drop fails with specific error: `"failureReason": "Account does not exist or is closed"`
- The Rs.1 is NOT debited if the transfer fails
- Action: Ask customer to provide an active bank account

### 8.3 Joint Bank Account

- Penny drop returns primary holder name only
- If customer is the secondary/tertiary holder, name match will fail
- Action: Accept `NO_MATCH` if customer confirms joint account; request cancelled cheque or bank statement; route to manual review

### 8.4 Bank Account Name Different from PAN Name

- Common for married women (maiden name on PAN, married name at bank)
- Common for names with transliteration differences
- Name match score will be `PARTIAL_MATCH` (50-84)
- Action: Route to manual review; ask for bank statement or passbook copy

### 8.5 IFSC Code for Merged Banks

Banks that have merged have their IFSC codes migrated over time. Decentro typically handles IFSC migration internally.

| Merged Bank | Old IFSC Prefix | New IFSC Prefix | Merged Into |
|-------------|----------------|-----------------|-------------|
| Andhra Bank | ANDB | UBIN | Union Bank of India |
| Corporation Bank | CORP | UBIN | Union Bank of India |
| Oriental Bank of Commerce | ORBC | PUNB | Punjab National Bank |
| United Bank of India | UTBI | PUNB | Punjab National Bank |
| Syndicate Bank | SYNB | CNRB | Canara Bank |
| Allahabad Bank | ALLA | IDIB | Indian Bank |
| Dena Bank | BKDN | BARB | Bank of Baroda |
| Vijaya Bank | VIJB | BARB | Bank of Baroda |
| Lakshmi Vilas Bank | LAVB | DBSS | DBS Bank India |

If a customer provides an old IFSC, the penny drop may still work (banks maintain old IFSCs for some time) or may fail. If it fails, ask customer to check their latest bank passbook for updated IFSC.

### 8.6 UPI-Only Accounts (Payment Banks)

- Payment bank accounts (Paytm Payments Bank, Airtel Payments Bank, Jio Payments Bank, etc.) may not have traditional IFSC codes
- Some payment banks DO have IFSC codes and support IMPS penny drop
- If penny drop fails for a payment bank account, use UPI VPA verification as alternative
- **SEBI note**: Payment bank accounts may not be suitable as primary bank for broking (settlement requires scheduled commercial bank account per some exchange rules)

### 8.7 PAN-Aadhaar Not Linked

- PAN status will be `X` (deactivated / inoperative) per Section 139AA of Income Tax Act
- Customer must link Aadhaar with PAN on the Income Tax e-filing portal before proceeding
- Deadline for linking has been extended multiple times; check current deadline
- **Exception**: NRI PANs may show "Not applicable" for Aadhaar linking -- this is acceptable
- **Exchange note**: PAN-Aadhaar seeding is no longer a parameter for PTT (Permitted to Trade) status per NSE circular NSE/ISC/62244 (May 30, 2024), but the PAN itself becomes inoperative if not linked

### 8.8 CKYC Record Stale or Incomplete

- CKYC records may be outdated (old address, old mobile number)
- If CKYC download returns data that conflicts with customer-provided data, treat CKYC data as pre-fill only -- do not override customer input
- Always capture fresh data from the customer and validate against CKYC
- Upload updated record to CKYC after onboarding is complete

### 8.9 CERSAI System Downtime

- CERSAI has scheduled maintenance windows (typically late night / early morning IST)
- During downtime, CKYC Search/Download/Upload will return 503
- Action: Queue CKYC operations for retry; do not block onboarding on CKYC availability
- CKYC upload is an async step in the batch pipeline anyway (after maker-checker approval)

---

## 9. Alternatives Comparison

| Feature | Decentro | Setu | Cashfree |
|---------|----------|------|----------|
| **PAN Verification** | Yes (basic + detailed + compare) | No direct PAN API | Yes |
| **Penny Drop** | IMPS-based, real-time | Reverse penny drop (pioneer) | IMPS + async webhook |
| **Penniless Verification** | Yes | No | No |
| **CKYC Search** | Yes (full proxy) | No CKYC offering | No CKYC offering |
| **CKYC Download** | Yes | No | No |
| **CKYC Upload** | Yes | No | No |
| **Pricing (PAN)** | Rs. 1-3 | N/A | Rs. 2-4 |
| **Pricing (Bank Verify)** | Rs. 2-5 | Rs. 2-3 | Rs. 2-5 |
| **API Style** | REST/JSON | REST/JSON | REST/JSON |
| **Documentation Quality** | Good (interactive docs) | Excellent (developer-first) | Good |
| **Sandbox** | Yes (staging env) | Yes | Yes (with Rs.100 credits) |
| **Integration Time** | 1-2 weeks | 1-2 weeks | 1-2 weeks |
| **Best For** | Full KYC bundle (PAN + Bank + CKYC) | UPI/AA focused flows | Payment-focused brokers |
| **Key Strength** | Single vendor for 3 integrations | Reverse penny drop, Account Aggregator | Payment gateway + verification combo |
| **Key Weakness** | No KRA, no eSign, no OCR | No PAN API, no CKYC, no video KYC | No CKYC, limited KYC scope |
| **Setu Note** | -- | Acquired by Pine Labs ($70-75M); AA market leader | -- |
| **Bank Coverage** | All IMPS banks | UPI-enabled accounts only (for reverse penny drop) | Most banks; does NOT support Deutsche Bank, Paytm Payments Bank |

**Why Decentro for this project**: Decentro is the only vendor in this comparison that offers PAN verification, bank verification, AND CKYC proxy through a single integration. This reduces the number of vendor contracts, API integrations, and credential sets to manage.

---

## 10. Security & Compliance

### 10.1 Certifications

| Certification | Status |
|---------------|--------|
| ISO 27001 | Certified (Information Security Management) |
| SOC 2 Type II | Certified (Security, Availability, Confidentiality) |
| PCI DSS | Compliant (for payment data handling) |

### 10.2 Data Security

| Layer | Standard |
|-------|----------|
| Data in transit | TLS 1.2+ (HTTPS only; HTTP rejected) |
| Data at rest | AES-256 encryption |
| API authentication | API Key + Secret + Module Secret (triple-header) |
| PII handling | Decentro does not store PAN numbers or bank details post-verification (stateless) |
| Audit logs | All API calls logged with timestamps; available via dashboard |

### 10.3 Data Residency

- All data processed and stored within India (Indian data center)
- Compliant with RBI data localization requirements
- Compliant with DPDP Act 2023 requirements for financial data

### 10.4 Our Responsibilities

| Responsibility | Detail |
|----------------|--------|
| Consent management | Capture and store customer consent before calling Decentro APIs (`consent: "Y"` is a technical requirement, but legal consent must be captured in our app) |
| Data retention | Store verification results per SEBI mandate (8 years under Stock Brokers Regulations 2026) |
| PII masking in logs | Mask PAN (show only last 4: XXXXXX1234F), mask Aadhaar (show only last 4) in application logs |
| Credential security | Store Decentro API keys in secrets manager; never in code or config files |
| Webhook security | Verify HMAC signature on all webhook callbacks before processing |

---

## 11. Integration with Our System

### 11.1 Where Decentro Fits in the Onboarding Flow

Referencing [KYC Flow](/journey/) (v2.0, 9-screen flow):

| Step | Screen | Decentro API | When | Purpose |
|------|--------|-------------|------|---------|
| 1 | Screen 1 (PAN + Mobile) | PAN Verification | Immediately after PAN entry | Gate check -- reject invalid PAN before proceeding |
| 2 | Screen 1 (after PAN success) | CKYC Search | Immediately after PAN verified | Check if CKYC record exists to prefill form |
| 3 | Screen 1 (if CKYC found) | CKYC Download | After CKYC search returns a match | Fetch full record to prefill personal + address details |
| 4 | Screen 3-4 (Bank Details) | Penny Drop | After customer enters bank account + IFSC | Verify account is valid and name matches |
| 5 | Post-approval (Batch Pipeline) | CKYC Upload | Async, after maker-checker approval | Submit new/updated CKYC record to CERSAI; generates KIN |

### 11.2 Cross-Verification Matrix

PAN name from Decentro is the anchor name. It must be cross-verified against names from other sources:

| Source A (Decentro) | Source B | Match Method | Action on Mismatch |
|---------------------|----------|-------------|-------------------|
| PAN name | DigiLocker Aadhaar name | Fuzzy match (score >= 80) | Manual review |
| PAN name | KRA name (via Digio) | Exact or fuzzy match | Use KRA name as reference (already verified) |
| PAN name | Bank beneficiary name (Decentro penny drop) | `nameMatchScore` from API | Per score thresholds in Section 3.2 |
| PAN name | CKYC name (Decentro download) | Fuzzy match | CKYC name is pre-verified; flag if different |
| PAN name | Customer-entered name | Fuzzy match (score >= 85) | Ask customer to enter name exactly as on PAN |

### 11.3 Error Handling in Our Backend

```
PAN Verification:
  - On SUCCESS: store result, proceed to CKYC search
  - On FAILURE (status F/X/D/N): show error to customer, block proceeding
  - On 429/500/503: retry (max 3 times); if still failing, show "try again later"
  - On 401: alert ops team (credential issue), show generic error to customer

Bank Verification:
  - On SUCCESS + FULL_MATCH: auto-approve bank, proceed
  - On SUCCESS + PARTIAL_MATCH: flag for admin review, allow customer to proceed
  - On SUCCESS + NO_MATCH: show warning, ask customer to verify details
  - On FAILURE: show error, ask customer to re-enter or try different account
  - On timeout: check status via reference_id, avoid duplicate penny drop

CKYC Search:
  - On SUCCESS (found): call Download, prefill form
  - On SUCCESS (not found): proceed with fresh KYC capture
  - On FAILURE/timeout: proceed without CKYC prefill (non-blocking)

CKYC Upload:
  - On SUCCESS: store KIN, update admin dashboard
  - On FAILURE: queue for retry in batch pipeline
  - On validation error: flag record for admin review, fix data, resubmit
```

### 11.4 Idempotency

All Decentro APIs accept a `reference_id` field. Use this for idempotency:

- Generate unique `reference_id` per operation: `{TYPE}_{YYYYMMDD}_{HHMMSS}_{PAN_or_ACCOUNT}`
- If a call times out, retry with the SAME `reference_id`
- Decentro will return the cached result instead of processing again
- This prevents duplicate penny drops (and duplicate Rs.1 credits)

---

## 12. Implementation Checklist

### Pre-Integration

- [ ] Sign commercial agreement with Decentro
- [ ] Obtain Decentro dashboard credentials and API keys
- [ ] Set up sandbox/UAT environment
- [ ] Register production server IPs for whitelisting
- [ ] Configure webhook endpoint URLs in Decentro dashboard

### Development

- [ ] Implement PAN Verification API (validate → advanced)
- [ ] Implement CKYC Search API
- [ ] Implement CKYC Download API (full record fetch)
- [ ] Implement CKYC Upload API (individual)
- [ ] Implement Penny Drop bank verification (IMPS Rs.1 credit)
- [ ] Implement Reverse Penny Drop (VPA-based, if available)
- [ ] Implement name match scoring logic (thresholds per Section 3.2)
- [ ] Implement idempotency via `reference_id` on all API calls
- [ ] Implement webhook receiver with signature verification
- [ ] Build retry logic with exponential backoff (429/500/503)
- [ ] Build error handling for all PAN status codes (E/F/X/D/N)
- [ ] Integrate PII masking in application logs (PAN last 4, Aadhaar last 4)

### Testing (UAT)

- [ ] Test: PAN verification — valid PAN (status E)
- [ ] Test: PAN verification — invalid/deactivated PAN (status F/X/D/N)
- [ ] Test: CKYC Search — record found (masked KIN response)
- [ ] Test: CKYC Search — record not found
- [ ] Test: CKYC Download — full record retrieval with unmasked KIN
- [ ] Test: CKYC Upload — new individual record submission
- [ ] Test: Penny Drop — successful verification with full name match
- [ ] Test: Penny Drop — partial name match (threshold handling)
- [ ] Test: Penny Drop — no match (rejection flow)
- [ ] Test: Penny Drop — timeout and idempotent retry
- [ ] Test: Webhook delivery and signature verification
- [ ] Test: Rate limiting (429) and retry behavior
- [ ] Test: Cross-verification matrix (PAN name vs other sources)

### Production

- [ ] Switch from sandbox to production credentials
- [ ] Verify production IP whitelisting
- [ ] Deploy to production
- [ ] Verify first live PAN verification
- [ ] Verify first live bank account verification
- [ ] Set up monitoring and alerting (success rates, latency, errors)
- [ ] Set up daily reconciliation of verification results
- [ ] Document runbook for common error scenarios

---

*This document is a detailed specification for Decentro integration within our KYC onboarding system. It should be read alongside [Vendor Integrations](/vendors/) for the full vendor landscape and [Master Dataset](/reference/master-dataset) for field-level data mapping.*

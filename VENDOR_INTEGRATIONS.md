# Vendor Integration Specification
## KYC Onboarding - Indian Stock Broking Firm

**Version**: 1.0
**Date**: 2026-02-09
**Companion to**: [KYC_MASTER_DATASET.md](./KYC_MASTER_DATASET.md)

---

## Table of Contents

1. [Vendor Selection Summary](#1-vendor-selection-summary)
2. [Integration Architecture](#2-integration-architecture)
3. [V1: PAN Verification](#3-v1-pan-verification)
4. [V2: Aadhaar / DigiLocker](#4-v2-aadhaar--digilocker)
5. [V3: Bank Account Verification](#5-v3-bank-account-verification)
6. [V4: KRA Integration](#6-v4-kra-integration)
7. [V5: CKYC Integration](#7-v5-ckyc-integration)
8. [V6: e-Sign](#8-v6-e-sign)
9. [V7: Video KYC / VIPV](#9-v7-video-kyc--vipv)
10. [V8: OCR & Document Verification](#10-v8-ocr--document-verification)
11. [V9: Face Match & Liveness](#11-v9-face-match--liveness)
12. [V10: AML / PEP / Sanctions Screening](#12-v10-aml--pep--sanctions-screening)
13. [V11: Income & ITR Verification](#13-v11-income--itr-verification)
14. [V12: Exchange Connectivity (NSE/BSE/MCX)](#14-v12-exchange-connectivity)
15. [V13: Depository Integration (CDSL/NSDL)](#15-v13-depository-integration)
16. [V14: Back-Office / RMS Software](#16-v14-back-office--rms-software)
17. [V15: Communication & Notifications](#17-v15-communication--notifications)
18. [V16: Credit Bureau (Optional)](#18-v16-credit-bureau-optional)
19. [Integration Sequence - Complete Onboarding](#19-integration-sequence---complete-onboarding)
20. [Vendor Comparison Matrix](#20-vendor-comparison-matrix)
21. [Environment & Security Requirements](#21-environment--security-requirements)

---

## 1. Vendor Selection Summary

### Recommended Primary Vendor Stack

| # | Integration | Recommended Vendor | Alternate Vendor | Reason |
|---|------------|-------------------|-----------------|--------|
| V1 | PAN Verification | **Decentro** | Protean (direct), Sandbox.co.in | REST API, PAN-Aadhaar link check, name/DOB match |
| V2 | Aadhaar / DigiLocker | **Digio** + DigiLocker Official | HyperVerge, Decentro | MeitY-approved partner, offline XML + eKYC |
| V3 | Bank Verification | **Decentro** | Cashfree, Razorpay | Penny drop + penniless + UPI verification |
| V4 | KRA | **Digio** | CVL KRA direct (SOAP) | REST API over all 5 KRAs (CVL/NDML/DOTEX/CAMS/KFintech) |
| V5 | CKYC | **Decentro** | Digio, Arya.ai | Search + Download + Upload + Bulk APIs |
| V6 | e-Sign | **Digio** | Leegality, eMudhra | Aadhaar OTP eSign, CCA compliant, 2-day integration |
| V7 | Video KYC / VIPV | **HyperVerge** | Digio, IDfy | SEBI VIPV compliant, 99.5% accuracy, SDK for Android/iOS/Web |
| V8 | OCR & Doc Verification | **HyperVerge** | IDfy, Signzy | 99.8% accuracy, all Indian docs, face match built-in |
| V9 | Face Match & Liveness | **HyperVerge** | IDfy, FacePhi | ISO 30107 Level 2 certified, passive liveness |
| V10 | AML / PEP / Sanctions | **TrackWizz** | ComplyAdvantage, IDfy | 120+ watchlists, India-specific (SEBI/RBI/MHA lists) |
| V11 | Income / ITR | **Perfios** (via Karza) | Finbox | ITR fetch, bank statement analysis, AA framework |
| V12 | Exchange Connectivity | **Back-office vendor** | Direct API to NSE/BSE/MCX | UCC registration via API or bulk file |
| V13 | Depository | **CDSL/NSDL direct** | Via DP software | CDAS APIs for CDSL, DPM for NSDL |
| V14 | Back-Office / RMS | **63 Moons (ODIN)** | Symphony XTS, TCS BaNCS | 70-80% market share, multi-exchange |
| V15 | Communication | **SMS**: Kaleyra/MSG91, **Email**: AWS SES | Gupshup (WhatsApp) | DLT-registered, delivery tracking |
| V16 | Credit Bureau | **CIBIL (TransUnion)** | Experian, CRIF | Optional - not mandated by SEBI for broking KYC |

---

## 2. Integration Architecture

### 2.1 Connectivity Pattern

```
KYC App (Frontend)
    |
    v
KYC API Gateway (Backend)
    |
    +---> Decentro APIs -------> PAN Verify, Bank Verify, CKYC, Aadhaar
    |
    +---> Digio APIs ----------> KRA, e-Sign, DigiLocker, CKYC
    |
    +---> HyperVerge APIs -----> OCR, VIPV, Face Match, Liveness
    |
    +---> TrackWizz APIs ------> AML Screening, PEP Check, Sanctions
    |
    +---> Perfios/Karza -------> ITR Fetch, Bank Statement Analysis
    |
    +---> Exchange APIs --------> NSE/BSE/MCX UCC Registration
    |
    +---> Depository APIs ------> CDSL/NSDL BO Account Opening
    |
    +---> Communication --------> SMS (Kaleyra), Email (SES), WhatsApp
    |
    v
KYC Admin (Back-Office Validation)
```

### 2.2 Common Authentication Patterns

| Vendor | Auth Method | Header/Param |
|--------|-----------|-------------|
| Decentro | API Key | `client_id` + `client_secret` in headers |
| Digio | API Key + IP whitelist | `Authorization: Basic <base64(client_id:client_secret)>` |
| HyperVerge | App credentials | `appId` + `appKey` in headers |
| TrackWizz | API Key | `Authorization: Bearer <token>` |
| CVL KRA | SOAP credentials | SOAP header with username/password |
| Protean | Entity credentials | Entity-specific auth token |

### 2.3 Common Response Handling

All vendor APIs return JSON (except CVL KRA which returns XML). Standard error handling:

| HTTP Code | Meaning | Action |
|-----------|---------|--------|
| 200 | Success | Process response |
| 400 | Bad Request | Fix input validation |
| 401 | Unauthorized | Refresh credentials |
| 404 | Not Found | Record doesn't exist |
| 422 | Unprocessable | Input format error |
| 429 | Rate Limited | Implement backoff |
| 500 | Server Error | Retry with exponential backoff |
| 503 | Source Unavailable | Queue for retry |

---

## 3. V1: PAN Verification

### Primary: Decentro

**API Docs**: https://docs.decentro.tech/docs/kyc-and-onboarding-identities-verification-services-customer-verification

| Env | Base URL |
|-----|---------|
| Staging | `https://in.staging.decentro.tech/kyc/public/api/customer/verification/validate` |
| Production | `https://in.decentro.tech/kyc/public/api/customer/verification/validate` |

**Request**:
```json
POST /kyc/public/api/customer/verification/validate
Headers: { "client_id": "xxx", "client_secret": "xxx", "module_secret": "xxx" }

{
  "reference_id": "PAN_<timestamp>_<pan>",
  "document_type": "PAN",
  "id_number": "ABCDE1234F",
  "consent": "Y",
  "purpose": "KYC onboarding for stock broking account"
}
```

**Response (Success)**:
```json
{
  "decentroTxnId": "DTX-xxxx",
  "status": "SUCCESS",
  "responseCode": "S00000",
  "message": "PAN verified successfully",
  "data": {
    "status": "valid",
    "id_number": "ABCDE1234F",
    "name": "RAKESH KUMAR",
    "category": "individual",
    "aadhaar_seeding_status": "Successful",
    "last_updated_at": "2025-06-15"
  }
}
```

**Variants Available**:

| document_type | Purpose | Extra Fields |
|--------------|---------|-------------|
| `PAN` | Basic verification | status, name, category |
| `PAN_DETAILED` | Extended info | + father_name, email, mobile, DOB, gender |
| `PAN_COMPARE` | NSDL source match | + name_match, dob_match (send `name` + `dob` in request) |

**PAN Status Codes** (maps to `KYC_MASTER_DATASET.md` field R01):

| Status | Description | Onboarding Action |
|--------|-------------|-------------------|
| `E` / `valid` | Existing and Valid | Proceed |
| `F` | Fake / Invalid | **Reject** |
| `X` | Deactivated | **Reject** - ask client to reactivate |
| `D` | Deleted | **Reject** |
| `N` | Not Found | **Reject** - verify PAN number |
| `EA` | Valid + Amalgamation | Proceed with note |
| `ED` | Valid + Death event | **Reject** - escalate |

**Data Mapping** (Decentro response -> KYC_MASTER_DATASET.md):

| API Response Field | Master Dataset Field | Section |
|-------------------|---------------------|---------|
| `data.name` | `pan_verify_name` (R02) | R: Third-Party Results |
| `data.status` | `pan_verify_status` (R01) | R: Third-Party Results |
| `data.category` | `pan_verify_category` (R04) | R: Third-Party Results |
| `data.aadhaar_seeding_status` | `pan_aadhaar_seeding_status` (R05) | R: Third-Party Results |

### Alternate: Protean (NSDL) Direct

**API Docs**: https://tinpan.proteantech.in/downloads/online-pan-verification/

- Requires authorization as AUA by Income Tax Department
- HTTPS stateless service
- Returns: pan_status (E/F/X/D/N), name, category, DOB
- Supports bulk verification via file upload
- Pricing: per-verification fee (contact Protean)

### Alternate: Sandbox.co.in

**API Docs**: https://developer.sandbox.co.in/reference/verify-pan-details-api

- Endpoint: `POST https://api.sandbox.co.in/kyc/pan/verify`
- Auth: JWT token + `x-api-key` header
- Wallet-based pricing with calculator at https://sandbox.co.in/pricing

---

## 4. V2: Aadhaar / DigiLocker

### 4a: DigiLocker Official (MeitY Partner)

**API Docs**: https://api.digitallocker.gov.in/ and https://apisetu.gov.in/digilocker
**Spec PDF**: https://img1.digitallocker.gov.in/assets/img/Digital%20Locker%20Authorized%20Partner%20API%20Specification%20v1.11.pdf

**Partner Onboarding** (one-time):
1. Apply at DigiLocker partner registration portal
2. BDM reviews use cases
3. Committee approval
4. Technical integration documentation received
5. OAuth 2.0 client credentials issued
6. Testing and go-live

**Auth**: OAuth 2.0 with `client_id` + `client_secret`

**Consent Flow Sequence**:
```
1. POST /authorize          -> Redirect user to DigiLocker consent page
2. User logs in + consents  -> DigiLocker redirects back with auth_code
3. POST /token              -> Exchange auth_code for access_token
4. GET /user/details        -> Get user profile (name, DOB, gender)
5. GET /user/files          -> List available documents
6. GET /user/files/<uri>    -> Download specific document (Aadhaar XML, PAN, DL)
```

**Documents Fetchable**:

| Document | Issuer | Key Fields Returned |
|----------|--------|-------------------|
| **Aadhaar (e-Aadhaar XML)** | UIDAI | name, dob, gender, photo, full address (house, street, landmark, locality, vtc, district, state, pincode), hashed mobile/email |
| **PAN Card** | Income Tax Dept | pan_number, name, father_name, dob |
| **Driving License** | State RTO | dl_number, name, dob, address, issue_date, validity, vehicle_classes |
| **Voter ID** | ECI | voter_id, name, age, address |
| **Passport** | MEA | passport_number, name, dob, nationality |

**Aadhaar XML Structure** (key fields for KYC):
```xml
<OfflinePaperlessKyc>
  <UidData>
    <Poi name="RAKESH KUMAR" dob="01-01-1990" gender="M" />
    <Poa co="S/O SURESH KUMAR" house="123" street="MG Road"
         lm="Near Temple" loc="Sector 5" vtc="Gurgaon"
         subdist="Gurgaon" dist="Gurgaon" state="Haryana"
         country="India" pc="122001" po="Gurgaon GPO" />
    <Pht>BASE64_ENCODED_PHOTO</Pht>
  </UidData>
</OfflinePaperlessKyc>
```

**Data Mapping** (DigiLocker -> KYC_MASTER_DATASET.md):

| DigiLocker Field | Master Dataset Field | Section |
|-----------------|---------------------|---------|
| `Poi.name` | `digilocker_aadhaar_name` (R22) | R |
| `Poi.dob` | `digilocker_aadhaar_dob` (R24) | R |
| `Poi.gender` | `digilocker_aadhaar_gender` (R25) | R |
| `Poa.*` (full address) | `digilocker_aadhaar_address` (R23) | R |
| `Pht` | `digilocker_aadhaar_photo` (R26) | R |

### 4b: Aadhaar Offline XML via Digio

**API Docs**: https://documentation.digio.in/digikyc/aadhaar_offline/

**Flow**:
1. User downloads Aadhaar XML from UIDAI portal (mAadhaar or resident.uidai.gov.in)
2. User uploads XML to broker app
3. Broker sends XML + share phrase to Digio API
4. Digio decrypts, validates UIDAI digital signature, extracts data
5. Returns structured JSON with name, DOB, gender, address, photo

**Advantages**: No AUA/KUA license needed, cheaper than online eKYC, user controls data sharing.

### 4c: NPCI e-KYC Setu (New - June 2025)

**Portal**: https://www.npci.org.in/product/e-kyc-services/e-kyc-setu-system

**Key Advantage**: Aadhaar e-KYC **without disclosing Aadhaar number** to broker.
- No AUA/KUA license required for SEBI-regulated entities
- Web interface + Android SDK
- Tokenized approach - privacy-first
- Launched March 10, 2025 by NPCI

---

## 5. V3: Bank Account Verification

### Primary: Decentro (Penny Drop)

**API Docs**: https://docs.decentro.tech/reference/payments_api-validate-bank-account

| Env | Base URL |
|-----|---------|
| Staging | `https://in.staging.decentro.tech/core_banking/money_transfer/validate_account` |
| Production | `https://in.decentro.tech/core_banking/money_transfer/validate_account` |

**Request**:
```json
POST /core_banking/money_transfer/validate_account
Headers: { "client_id": "xxx", "client_secret": "xxx", "module_secret": "xxx" }

{
  "reference_id": "BANK_<timestamp>",
  "purpose_message": "KYC Bank Verification",
  "beneficiary_details": {
    "account_number": "1234567890",
    "ifsc": "SBIN0001234",
    "name": "RAKESH KUMAR"
  },
  "transfer_amount": 1,
  "validation_type": "pennydrop",
  "perform_name_match": true
}
```

**Response**:
```json
{
  "decentroTxnId": "DTX-xxxx",
  "status": "SUCCESS",
  "data": {
    "transactionStatus": "Success",
    "accountStatus": "Valid",
    "beneficiaryName": "RAKESH KUMAR",
    "nameMatchScore": 95,
    "nameMatchResult": "FULL_MATCH",
    "validationType": "Penny Drop",
    "utr": "IMPS1234567890",
    "paymentMode": "IMPS"
  }
}
```

**Verification Types**:

| Type | Method | Cost | Speed | Use Case |
|------|--------|------|-------|----------|
| `pennydrop` | Rs.1 IMPS credit | ~Rs.2-5/txn | <2 sec | Primary verification |
| `penniless` | Zero-cost check | Lower | <2 sec | Cost-sensitive bulk |
| `reverse_pennydrop` | User sends Re.1 via UPI | Lowest | User-dependent | UPI-enabled clients |

**Name Match Results** (maps to R13):

| Result | Score Range | Onboarding Action |
|--------|-----------|-------------------|
| `FULL_MATCH` | 85-100 | Auto-approve |
| `PARTIAL_MATCH` | 50-84 | Manual review |
| `POOR_PARTIAL_MATCH` | 20-49 | Manual review + additional docs |
| `NO_MATCH` | 0-19 | **Reject** or request correct account |

**Data Mapping** (Decentro -> KYC_MASTER_DATASET.md):

| API Response Field | Master Dataset Field | Section |
|-------------------|---------------------|---------|
| `data.transactionStatus` | `bank_verify_status` (R10) | R |
| `data.beneficiaryName` | `bank_verify_name_at_bank` (R11) | R |
| `data.nameMatchScore` | `bank_verify_name_match_score` (R12) | R |
| `data.nameMatchResult` | `bank_verify_name_match_result` (R13) | R |
| `data.utr` | `bank_verify_utr` (R15) | R |
| `data.paymentMode` | `bank_verify_payment_mode` (R16) | R |

### Alternate: Cashfree

**API Docs**: https://www.cashfree.com/docs/api-reference/vrs/v2/bav-v2/bank-account-verification-async-v2
- Async API (webhook-based results)
- Auth: `x-client-id` + `x-client-secret`
- Free trial with Rs.100 credits
- Does **not** support Deutsche Bank and Paytm Payments Bank

### Alternate: Razorpay

**API Docs**: https://razorpay.com/docs/api/x/account-validation/
- Two-step process: Create Fund Account -> Create Validation
- Basic HTTP Auth
- Only for RazorpayX Lite accounts

---

## 6. V4: KRA Integration

### Primary: Digio

**API Docs**: https://documentation.digio.in/digikyc/kra/api_integration/

**Auth**: API Key + IP whitelisting (UAT: 35.154.20.28, Prod: 13.126.198.236, 52.66.66.81)

**APIs Available**:

| Operation | Endpoint | Purpose | Maps to |
|-----------|----------|---------|---------|
| PAN Status Check | `GET /kra/pan-status` | KRA lookup across all 5 KRAs | R27-R33 |
| Fetch Details | `GET /kra/fetch` | Download full KYC record | R34 |
| Upload/Update | `POST /kra/upload` | Submit/modify KYC data | S01-S14 |
| Download Documents | `GET /kra/documents` | Retrieve CVL documents | - |

**KRA Sources Supported**: CVL, NDML, CAMS (all 5 via interoperability)

**KRA Lookup Response** (PAN Status Check):
```json
{
  "pan": "ABCDE1234F",
  "kra_status": "KYC Registered",
  "kra_source": "CVL",
  "applicant_name": "RAKESH KUMAR",
  "application_date": "2023-05-15",
  "email_validated": "Y",
  "mobile_validated": "Y",
  "pan_aadhaar_linked": "Y"
}
```

**KRA Status -> Trading Decision** (maps to R27):

| KRA Status | Trading | Action |
|------------|---------|--------|
| KYC Registered | **Allowed** | Fetch full record, prefill |
| KYC Validated | **Allowed** | Fetch full record, prefill |
| Under Process | Blocked | Wait for KRA validation |
| On Hold | Blocked | Resolve discrepancy |
| KYC Rejected | Blocked | Re-submit corrected KYC |
| Not Available | N/A | Fresh KYC required |

### Alternate: CVL KRA Direct (SOAP)

**WSDL**: https://www.cvlkra.com/PANInquiry.asmx

| SOAP Method | Purpose |
|-------------|---------|
| `GetPanStatus` | PAN status across all KRAs (XML response) |
| `InsertUpdateKYCRecord` | Submit/modify 1 record (XML request/response) |
| `SolicitPANDetailsFetchALLKRA` | Fetch detailed PAN data |

**Bulk Upload**: Tilde (~) delimited text files via CVL portal Utilities menu.

**File Format (one record per line)**:
```
POS_CODE~APP_TYPE~APP_NO~PAN_NO~PAN_EXEMPT~PREFIX~NAME~FATHER_SPOUSE_NAME~
MOTHER_NAME~GENDER~MARITAL_STATUS~DOB~NATIONALITY~RESIDENTIAL_STATUS~
OCCUPATION~CORR_ADDR1~CORR_ADDR2~CORR_ADDR3~CORR_CITY~CORR_PIN~CORR_STATE~
CORR_COUNTRY~PERM_ADDR1~...~MOBILE_CODE~MOBILE~EMAIL~POI_TYPE~POI_DOC_NO~
POA_TYPE~POA_DOC_NO~INCOME~NET_WORTH~PEP~KYC_DATE~...
```

**Timeline**: KYC must be uploaded within 3 working days. KRA validates within 2 working days.

---

## 7. V5: CKYC Integration

### Primary: Decentro

**API Docs**: https://docs.decentro.tech/docs/kyc-and-onboarding-identities-ckyc-services

### 7a: CKYC Search

**Endpoint**: `POST /kyc/ckyc/search`
**Docs**: https://docs.decentro.tech/reference/kyc-and-onboarding-api-reference-identities-ckyc-services-search

```json
{
  "reference_id": "CKYC_SEARCH_<timestamp>",
  "document_type": "PAN",
  "id_number": "ABCDE1234F",
  "consent": true,
  "consent_purpose": "KYC verification for stock broking account"
}
```

**Response**:
```json
{
  "decentroTxnId": "DTX-xxxx",
  "status": "SUCCESS",
  "responseCode": "S00000",
  "data": {
    "ckycId": "$XXXX1234$",
    "ckycReferenceId": "REF123456",
    "fullName": "RAKESH KUMAR",
    "kycDate": "15-06-2023",
    "fathersFullName": "SURESH KUMAR",
    "photo": "BASE64_PHOTO",
    "identityDetails": [...]
  }
}
```

**Important**: Since Jan 2025, CKYC Search returns **masked CKYC number** ($XXXX1234$). Full download is required for unmasked number.

### 7b: CKYC Download

**Endpoint**: `POST /kyc/ckyc/download`
**Docs**: https://docs.decentro.tech/reference/kyc-and-onboarding-api-reference-identities-ckyc-services-download

Returns complete record with 50+ fields including: personal details, addresses, contact, identity documents, images (photo, signature, POI, POA).

### 7c: CKYC Upload

**Endpoint**: `POST /kyc/ckyc/upload`
**Docs**: https://docs.decentro.tech/reference/kyc-and-onboarding-api-reference-identities-ckyc-services-upload-individuals

**Required Payload Structure**:
- `fi_code`, `branch_code`, `reference_id`
- `verifier` object (name, designation, employee_code, place, date)
- `individual_record` object (all personal + address + contact fields)
- `disability_info` object (mandatory container, even if not disabled)
- `poa` object (proof of address document)
- `current_address` object
- `kyc_verification_details` object
- `documents` array (photo + address proof, Base64, max 1MB each)
- `ids` array (PAN + address proof ID numbers)

**Returns**: 14-digit CKYC Identification Number (KIN) on success.

### Alternate: Digio

**API Docs**: https://documentation.digio.in/digikyc/ckyc/api_integration/
- Requires FI code, CKYC public key, keystore configuration
- Java 17 or Docker deployment
- GitHub SDK: https://github.com/digio-tech/gateway_kyc_lite

---

## 8. V6: e-Sign

### Primary: Digio

**API Docs**: https://documentation.digio.in/digisign/types_of_sign/aadhaar_based/

**Aadhaar OTP e-Sign Flow**:

```
Step 1: Create Sign Request
  POST /v2/client/document/upload
  -> Upload PDF document to Digio
  -> Returns document_id

Step 2: Add Signer
  POST /v2/client/document/<doc_id>/sign/aadhaar
  -> Add signer with Aadhaar number
  -> Signer receives link via email/SMS

Step 3: Signer Authenticates
  -> Signer opens link
  -> Enters Aadhaar number
  -> Receives OTP on registered mobile
  -> Enters OTP

Step 4: e-Sign Applied
  -> Digio generates DSC (Digital Signature Certificate)
  -> Applies CADES-compliant signature on document hash
  -> Returns signed PDF

Step 5: Download Signed Document
  GET /v2/client/document/<doc_id>
  -> Download signed document with embedded DSC
```

**Data Mapping** (-> KYC_MASTER_DATASET.md):

| Digio Field | Master Dataset Field | Section |
|-------------|---------------------|---------|
| `esign_txn_id` | `esign_transaction_id` (P17) | P |
| `signed_at` | `esign_timestamp` (P18) | P |
| `document_hash` | `esign_document_hash` (P19) | P |
| `certificate_serial` | `esign_certificate_serial` (P20) | P |
| `signed_document_url` | `esign_signed_document_url` (P21) | P |

**CCA Compliance**: Digio operates under CCA (Controller of Certifying Authorities) regulatory framework, MeitY.

### Alternate: Leegality

**Website**: https://www.leegality.com/
- Zero license fee, pay-per-use (~Rs.25/eSign)
- Smart API system - <2 day integration
- 55M+ eSigns processed

### Alternate: eMudhra

**Website**: https://esign.e-mudhra.com/
- Licensed CA by CCA: https://cca.gov.in/service-providers.html
- SAP/Oracle connectors
- Volume pricing for >10 lakh/year

### Alternate: Protean (NSDL) eSign

**Portal**: https://asp.portal.egov.proteantech.in/
**Docs**: https://docs.risewithprotean.io/
- Licensed Certifying Authority by CCA
- ~Rs.5.90/eSign
- OTP + Biometric + IRIS modes

---

## 9. V7: Video KYC / VIPV

### Primary: HyperVerge

**API Docs**: https://hyperverge.co/in/integrations-marketplace/video-kyc-api/
**SDK Repos**: https://github.com/hyperverge/hyperkyc-android

**SEBI VIPV Compliance Features**:
- Random question generation with response capture
- OTP verification (auto-approves OTPs read aloud)
- Document display during video call (PAN, Aadhaar, KYC form)
- Live face match with photo on record
- Tamper-proof recording with date-time stamping
- Minimum 7-year secure storage (RBI requirement)
- Geo-location capture
- Liveness detection during video

**SDKs Available**:

| Platform | SDK | Notes |
|----------|-----|-------|
| Android | hyperverge/hyperkyc-android | Native SDK |
| iOS | HyperVerge iOS SDK | Native SDK |
| Web | HyperVerge Web SDK | Browser-based |

**Agent Dashboard**: Multi-agent support with call scheduling, in-call tools, quality monitoring.

**Accuracy**: 99.5% with low false positive rate.

**Data Mapping** (-> KYC_MASTER_DATASET.md Section N):

| HyperVerge Output | Master Dataset Field | Section |
|-------------------|---------------------|---------|
| `session_id` | `vipv_session_id` (N09) | N |
| `start_time` | `vipv_start_time` (N10) | N |
| `end_time` | `vipv_end_time` (N11) | N |
| `video_url` | `vipv_video_url` (N14) | N |
| `video_hash` | `vipv_video_hash` (N15) | N |
| `face_match_score` | `vipv_face_match_score` (N17) | N |
| `liveness_score` | `vipv_liveness_score` (N18) | N |
| `questions_json` | `vipv_random_questions_json` (N19) | N |

### Alternate: Digio

**Docs**: https://documentation.digio.in/digikyc/video_based_verification/
- Compliant with SEBI VIPV + RBI V-CIP + IRDAI VBIP
- DigiStudio no-code platform for workflow design
- Android SDK: https://documentation.digio.in/sdk/android/kyc_full/
- iOS SDK: https://github.com/digio-tech/digio-iOS-KYC-SDK
- 3-5 min customer completion, 5-10 min auditor review

### Alternate: IDfy

**Docs**: https://api-docs.kyc.idfy.com/
- Agent-assisted + self-serve modes
- Intelligent reviewer allocation (language/product/location)
- Auto-reconnect and auto-save
- Low bandwidth support

---

## 10. V8: OCR & Document Verification

### Primary: HyperVerge

**API Docs**: https://github.com/hyperverge/kyc-india-rest-api
**Base URL**: `https://ind-docs.hyperverge.co/v2.0`

**Auth**: `appId` + `appKey` headers

**Supported Documents & Endpoints**:

| Document | Endpoint | Fields Extracted |
|----------|----------|-----------------|
| PAN Card | `POST /readPAN` | name, pan_no, father, date, date_of_issue |
| Aadhaar | `POST /readAadhaar` | aadhaar_no, name, dob, gender, address, phone, pin, QR data |
| Passport | `POST /readPassport` | passport_num, name, dob, nationality, gender, issue/expiry, MRZ |
| Voter ID | `POST /readVoterID` | name, voterid, dob, gender, age, address |
| Driving License | `POST /readKYC` | dl_number, name, dob, address, validity, vehicle_classes |
| Cheque | `POST /readKYC` | account_no, ifsc, bank_name, branch, micr |
| Generic KYC | `POST /readKYC` | Auto-detects document type |

**Request** (multipart/form-data):
```
POST /v2.0/readPAN
Headers: { "appId": "xxx", "appKey": "xxx" }
Body: { "image": <file> }  // JPEG, PNG, TIFF, PDF. Min 800px width.
```

**Response**:
```json
{
  "status": "success",
  "statusCode": "200",
  "result": {
    "details": [
      {
        "type": "pan",
        "fieldsExtracted": {
          "name": { "value": "RAKESH KUMAR", "conf": 0.99 },
          "pan_no": { "value": "ABCDE1234F", "conf": 0.99 },
          "father": { "value": "SURESH KUMAR", "conf": 0.95 },
          "date": { "value": "01/01/1990", "conf": 0.97 }
        }
      }
    ]
  }
}
```

**Accuracy**: ~99.8% in live environments. Each field includes confidence score.

### Alternate: IDfy

**Docs**: https://api-docs.idfy.com/v2/
- Three task types: OCR-Only, Verification-Only, OCR+Verification
- Government database cross-verification
- Tampering detection

### Alternate: Signzy

**Docs**: https://signzy.gitbook.io/api-docs/
- 14,000+ document types from 180+ countries
- SDK mode for offline APIs (PAN, DL, Passport extraction)
- SOC 2 and ISO 27001 certified

---

## 11. V9: Face Match & Liveness

### Primary: HyperVerge

**Face Match API**: https://github.com/hyperverge/face-match-india-rest-api
**Endpoint**: `POST https://ind-faceid.hyperverge.co/v1/photo/verifyPair`

**Request** (multipart/form-data):
```
POST /v1/photo/verifyPair
Headers: { "appId": "xxx", "appKey": "xxx" }
Body: {
  "image1": <aadhaar_photo>,   // Reference image (from Aadhaar/PAN)
  "image2": <user_selfie>       // Live capture
}
```

**Response**:
```json
{
  "status": "success",
  "statusCode": "200",
  "result": {
    "match": "yes",
    "match-score": 92,
    "to-be-reviewed": "no"
  }
}
```

**Liveness Detection**:
- **Passive liveness**: Single selfie, no gestures required
- ~99.8% accuracy
- ISO 30107-1/30107-3 Level 2 certified
- Detects: printed photos, digital photos, videos, 3D masks, deepfakes

**Face Match Score Interpretation**:

| Score | Result | Action |
|-------|--------|--------|
| 80-100 | Strong match | Auto-approve |
| 60-79 | Moderate match | Manual review |
| 0-59 | Weak/no match | **Reject** or re-capture |

---

## 12. V10: AML / PEP / Sanctions Screening

### Primary: TrackWizz

**Website**: https://trackwizz.com/screening.html

**Databases Screened** (120+ watchlists):

| Category | Lists |
|----------|-------|
| **International Sanctions** | OFAC SDN, UN Security Council, EU Sanctions, UAPA (India) |
| **India Regulatory** | SEBI Debarred List, RBI Defaulters, IRDA List, NHB |
| **PEP** | 95+ global PEP databases |
| **Adverse Media** | Via Refinitiv World-Check partnership |
| **Government** | MHA (Ministry of Home Affairs) |

**Screening Flow**:
```
1. Submit customer data (name, DOB, nationality, PAN)
2. System screens against 120+ watchlists
3. Fuzzy matching engine reduces false positives
4. Returns match results with risk scores
5. Set up ongoing monitoring with webhook alerts
```

**Data Mapping** (-> KYC_MASTER_DATASET.md Section K):

| Screening Result | Master Dataset Field | Section |
|-----------------|---------------------|---------|
| PEP match found | `is_pep` (K01) | K |
| PEP related match | `is_pep_related` (K02) | K |
| Sanctions match | Escalate - do not onboard | - |
| Adverse media | Flag for enhanced due diligence | - |

**Deployment**: On-premise or cloud SaaS.

### Alternate: ComplyAdvantage

**API Docs**: https://docs.complyadvantage.com/api-docs
- EU/US/APAC regional endpoints
- Auth: `Authorization: Token YOUR_API_KEY`
- Rate limit: 600 calls/minute
- `POST /searches` -> `GET /searches/{id}` -> `PUT /searches/{id}/matches/{match_id}`

### Alternate: IDfy AML

**Website**: https://www.idfy.com/anti-money-laundering/
- 150+ entities monitored
- OFAC, SDN, UN, MHA lists
- Real-time screening

---

## 13. V11: Income & ITR Verification

### Primary: Perfios

**Website**: https://perfios.ai
**Products**: Bank Statement Analyser, ITR Analyser, Account Aggregator

**Capabilities**:

| Feature | Details |
|---------|---------|
| **ITR Fetch** | Direct from Income Tax portal via AA or manual upload |
| **Forms Supported** | ITR-V, Form 26AS, AIS, Forms 1-6 |
| **Bank Statement** | 4000+ formats (PDFs, scans, images) |
| **Income Derivation** | AI/ML transaction analysis, salary identification |
| **Fraud Detection** | Statement integrity, digital tampering checks |
| **AA Integration** | Sahamati-empaneled TSP - full-stack FIP and FIU |

**Use for KYC**: Verify income proof for F&O/Commodity segment activation (maps to Section F: Financial Profile).

### Alternate: Finbox (BankConnect)

**API Docs**: https://docs.finbox.in/bank-connect/rest-api.html
- Auth: `x-api-key` + `server-hash` headers
- 500+ predictors (income, expenses, obligations)
- Data via: PDF upload, netbanking, AA network
- Endpoints: `/transactions/`, `/salary/`, `/recurring_transactions/`

### Alternate: Karza Technologies

**Website**: https://karza.in/products/kitr
- Direct ITR portal access
- Forms: ITR-V, Form 26AS, GST-R
- Under Perfios umbrella
- Government database authentication

---

## 14. V12: Exchange Connectivity

### 14a: NSE

**Trading System**: NEAT (National Exchange for Automated Trading) / NOW (NEAT on Web)

**Connectivity Options**:

| Method | Bandwidth | Use Case |
|--------|-----------|----------|
| Leased Line | 4-300 Mbps | Primary production |
| VSAT | Satellite-based | Remote locations |
| NSE ExtraNet | Internet-based | Cost-effective |

**UCC Registration**:

| Method | Scale | Format |
|--------|-------|--------|
| UCI Online (Web) | Manual, 1-by-1 | Web form |
| API Upload | Automated | REST API (JSON) |
| Batch Upload | Bulk | Pipe-delimited TXT/CSV, no headers |

**UCC API Ref**: NSE Circular NSE/ISC/60418 (API), NSE/ISC/61817 (Apr 30, 2024 - revised structure)

**UCC Fields**: client_name, pan, dob, gender, mobile, email, address, city, state, pincode, country, ucc_code (max 10 alphanumeric), client_type, kyc_status.

**Client Status Values**: Active / Inactive / Closed

### 14b: BSE (Bombay Stock Exchange) - Comprehensive UCC Integration

---

#### 14b.1: BOLT Plus System & Broker Connectivity

**Trading System**: BOLT Plus (BSE Online Trading - Plus)
- Successor to original BOLT (launched 1995), now fully electronic
- Supports: Equity Cash, Equity Derivatives, Currency Derivatives, Debt segments
- BOLT Plus on Web (BOW): Browser-based trading terminal for members

**Connectivity Options**:

| Mode | Protocol | Use Case | Latency |
|------|----------|----------|---------|
| ETI (Enhanced Trading Interface) | TCP/IP, FIX V5.0 SP2 binary | High-frequency, low-latency DMA | Lowest (~microseconds) |
| IML (Intermediate Messaging Layer) | TCP/IP via iml.ini config | Standard broker connectivity | Low (~milliseconds) |
| BOLT Plus on Web (BOW) | HTTPS (browser) | Manual trading, small brokers | Higher |
| Leased Line | Dedicated circuit | Production primary | Fixed |
| MPLS VPN | IP-based WAN | Production alternate | Low |
| VSAT | Satellite | Remote/disaster recovery | Higher |

**ETI Technical Specifications**:
- Asynchronous, message-based interface derived from FIX V5.0 SP2 semantics (including all officially approved extension packs)
- Proprietary session layer with flat binary encoding over TCP/IP
- Session-oriented: Exchange provides unique Session ID per member; only one active session per Session ID at any time
- No built-in automatic failover (participant applications must implement their own)
- Connects via Exchange Application Gateways hosting client sessions
- Ref: ETI API Manual (latest v1.6.10 with encryption + activity timestamp changes)
- Download: https://www.bseindia.com/downloads1/ETI_API_ManualV158.pdf

**IML Configuration**:
- Config file: `iml.ini` - defines Exchange-side IP and port
- Each segment (Equity, F&O, Currency, Debt) requires a **separate IML instance**
- Listener port defined as `PortL` in iml.ini
- Both sides (member and exchange) require IP + port configuration
- Installation guide: https://www.bseindia.com/downloads1/NTA-IML-Installation_Guide.pdf
- IML API: https://www.bseindia.com/downloads1/BOLTPlus_IML_API_version_6.0.pdf
- Connectivity Manual: https://www.bseindia.com/downloads1/BOLTPLUS_Connectivity_ManualV12.pdf (v1.4, Jul 2023)

**Test Environment**:
- BSE provides BOLT Plus simulation environment for testing
- Members can connect using Exchange-provided terminal or build own applications
- URL: https://www.bseindia.com/nta.aspx

---

#### 14b.2: UCC Registration Process

**Methods of UCC Registration**:

| Method | Capacity | Format | Interface |
|--------|----------|--------|-----------|
| Manual (BOLT Plus Web) | 1-by-1 | Web form | https://ucc.bseindia.com |
| SOAP API (SaveUCC) | Automated | XML via SOAP 1.1/1.2 | ucc_api_service.asmx |
| SOAP API (SaveUCC_V2) | Automated, 183 fields | XML via SOAP 1.1/1.2 | ucc_api_service.asmx |
| Batch Upload (New Registration) | Max 30,000 records/file | Pipe-delimited TXT | UCC module upload |
| Batch Upload (Bank Details) | Max 20,000 records/file | Pipe-delimited TXT | UCC module upload |
| Batch Upload (Depository Details) | Max 30,000 records/file | Pipe-delimited TXT | UCC module upload |
| Batch Upload (Segment Activation) | Max 50,000 records/file | Pipe-delimited TXT | UCC module upload |

**UCC SOAP API Details**:

Endpoint: `https://ucc.bseindia.com/newucc/ucc_api_webservice/ucc_api_service.asmx`

| Operation | SOAPAction | Input | Output |
|-----------|-----------|-------|--------|
| SaveUCC | `http://tempuri.org/SaveUCC` | XmlUCCdata (string) | SaveUCCResult (string) |
| SaveUCC_V2 | `http://tempuri.org/SaveUCC_V2` | XmlUCCdata (string) | SaveUCCResult (string) |

SOAP 1.1 Request Envelope:
```xml
<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
               xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
               xmlns:xsd="http://www.w3.org/2001/XMLSchema">
  <soap:Body>
    <SaveUCC xmlns="http://tempuri.org/">
      <XmlUCCdata>string</XmlUCCdata>
    </SaveUCC>
  </soap:Body>
</soap:Envelope>
```

SOAP 1.2 Request Envelope:
```xml
<?xml version="1.0" encoding="utf-8"?>
<soap12:Envelope xmlns:soap12="http://www.w3.org/2003/05/soap-envelope"
                 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                 xmlns:xsd="http://www.w3.org/2001/XMLSchema">
  <soap12:Body>
    <SaveUCC xmlns="http://tempuri.org/">
      <XmlUCCdata>string</XmlUCCdata>
    </SaveUCC>
  </soap12:Body>
</soap12:Envelope>
```

**UCC Field Structure Evolution**:

| Version | Fields | Effective Date | Status |
|---------|--------|---------------|--------|
| Old Structure | 131 fields | Pre-2024 | Discontinued Aug 16, 2024 |
| Revised Structure | 150 fields | Oct 4, 2024 | Active (existing UCC creation/modification) |
| New Structure (SaveUCC_V2) | 183 fields | May 22, 2025 | Active (fresh UCC creation/modification) |
| Additional Nominee API | 56 fields | May 2025 | Supplementary (nominees 4-10) |

Key changes in 183-field structure:
- Nominees increased from 3 to 10 (SEBI mandate effective Jan 2025)
- Guardian relationship fields for minor clients
- Standardized nominee relationship codes
- Nominees 4-10 via separate Non-Financial Transaction API Webservice

---

#### 14b.3: 3-Parameter PAN Verification

BSE mandates 3-parameter PAN verification against NSDL/Protean (Income Tax Department) records.

**The Three Parameters**:

| # | Parameter | Field | Mandatory |
|---|-----------|-------|-----------|
| 1 | PAN Number | 10-character alphanumeric (AAAAA9999A format) | Yes |
| 2 | Client Name | Name as per PAN/ITD records | Yes |
| 3 | DOB/DOI/DOR | Date of Birth (individuals) / Date of Incorporation (companies) / Date of Registration | Yes - for all holders including Guardian |

**Verification Result Codes**:

| Code | Status | Meaning | Trading Impact |
|------|--------|---------|----------------|
| A | Approved | All 3 parameters match ITD records | Eligible for PTT |
| I | Incorrect | One or more parameters do not match | NOT eligible for PTT |
| P | Pending | Verification in progress | NOT eligible for PTT |

**Rules**:
- DOB/DOI is mandatory for ALL holders including Guardian in case of Minor Client
- If Client Name or DOB differs from ITD records, must be corrected at ITD BEFORE submission
- Once PAN marked "I" (Incorrect), record cannot be marked "Permitted to Trade" (PTT)
- PAN value "AAAAA8888A" used for Central Govt / State Govt / Court-appointed officials
- PAN-Aadhaar seeding is NO LONGER a parameter for PTT status (per NSE circular NSE/ISC/62244, May 30, 2024 - BSE follows same)

---

#### 14b.4: Batch File Format Specification

**File Format**: Pipe (`|`) delimited text file, two rows per client record.

**Row Structure**:
- **Row 1**: General client information applicable to ALL client types
- **Row 2**: Director details (applicable ONLY for Corporate/Partnership/Body Corporate entities)

**Batch Upload Limits**:

| Operation | Max Records per File | Circular Date |
|-----------|---------------------|--------------|
| New Registration / Modification | 30,000 | Feb 23, 2024 |
| Bank Details Update | 20,000 | Feb 23, 2024 |
| Depository Details Update | 30,000 | Jul 29, 2024 |
| Segment Activation | 50,000 | Jul 29, 2024 |

**Key Fields in Batch File (Revised Format, effective Apr 19, 2024)**:

Row 1 - General Information (pipe-delimited):

| # | Field Name | Type | Length | Mandatory | Valid Values / Notes |
|---|-----------|------|--------|-----------|---------------------|
| 1 | Trading Member ID | Alphanumeric | 6 | M | BSE member code |
| 2 | Client Code | Alphanumeric | 10 | M | Unique per member |
| 3 | Client Name (First) | Alpha | 70 | M | As per PAN |
| 4 | Client Name (Middle) | Alpha | 35 | O | |
| 5 | Client Name (Last) | Alpha | 35 | M | As per PAN |
| 6 | PAN | Alphanumeric | 10 | M | AAAAA9999A format |
| 7 | Date of Birth / DOI | Date | 10 | M | DD/MM/YYYY |
| 8 | Gender | Alpha | 1 | M (Indiv.) | M/F/T |
| 9 | Client Category | Numeric | 2 | M | See code table below |
| 10 | Occupation Code | Numeric | 2 | M | See code table below |
| 11 | Address Line 1 | Alphanumeric | 100 | M | Cannot start with client name |
| 12 | Address Line 2 | Alphanumeric | 100 | O | Cannot equal Addr Line 1 or 3 |
| 13 | Address Line 3 | Alphanumeric | 100 | O | Cannot equal Addr Line 1 or 2 |
| 14 | City | Alpha | 35 | M | |
| 15 | State | Alpha | 2 | M | State code |
| 16 | Pincode | Numeric | 6 | M | Valid Indian pincode |
| 17 | Country | Alpha | 2 | M | IN for India |
| 18 | Mobile Number | Numeric | 10 | M | Must be verified |
| 19 | Email ID | Alphanumeric | 100 | M | Must be verified |
| 20 | Income Range | Numeric | 2 | M | See code table below |
| 21 | Bank Account Number | Alphanumeric | 20 | M | |
| 22 | Bank IFSC Code | Alphanumeric | 11 | M | |
| 23 | Bank Account Type | Alpha | 2 | M | SB=Savings, CA=Current |
| 24 | DP ID | Alphanumeric | 8/16 | M | NSDL: IN+6, CDSL: 8 digits |
| 25 | DP Client ID | Alphanumeric | 8/16 | M | NSDL: 8 chars, CDSL: 8 digits |
| 26 | Depository | Alpha | 4 | M | CDSL / NSDL |
| 27 | KYC Status | Alpha | 1 | M | Y/N |
| 28 | Aadhaar Number (masked) | Numeric | 12 | O | Last 4 digits visible |
| 29 | FATCA Declaration | Alpha | 1 | M | Y/N |
| 30 | Nominee 1 Name | Alpha | 70 | M* | *Mandatory if opt-in |
| 31 | Nominee 1 Relationship | Alpha | 20 | M* | |
| 32 | Nominee 1 PAN | Alphanumeric | 10 | O | |
| 33 | Nominee 1 Percentage | Numeric | 3 | M* | 1-100, total must = 100 |
| ... | (Nominees 2-3 follow same pattern) | | | | |
| 34-42 | Nominee 2 & 3 Details | Various | Various | O | Same as Nominee 1 |
| 43 | POA for Funds | Alpha | 1 | O | Y/N (DDPI replaced POA since Nov 2022) |
| 44 | POA for Securities | Alpha | 1 | O | Y/N |
| 45 | Equity Segment | Alpha | 1 | M | Y/N |
| 46 | Equity Derivatives Segment | Alpha | 1 | O | Y/N |
| 47 | Currency Derivatives Segment | Alpha | 1 | O | Y/N |
| 48 | Debt Segment | Alpha | 1 | O | Y/N |
| 49 | Client Status by Member | Alpha | 1 | M | A=Active, I=Inactive, C=Closed |
| 50 | Guardian Name | Alpha | 70 | M (minor) | Required if client category = 02 |
| 51 | Guardian PAN | Alphanumeric | 10 | M (minor) | |
| 52 | Guardian DOB | Date | 10 | M (minor) | DD/MM/YYYY |
| ... | (Additional fields up to ~150 for revised format) | | | | |

Row 2 - Director Details (for non-individual entities only):

| # | Field Name | Type | Length | Mandatory | Notes |
|---|-----------|------|--------|-----------|-------|
| 1 | Action | Alpha | 3 | M | NEW (add) / DEL (remove) |
| 2 | Client Code | Alphanumeric | 10 | M | Same as Row 1 |
| 3 | Director Name | Alpha | 70 | M | Full name |
| 4 | DIN (Director Identification Number) | Numeric | 8 | M | For companies |
| 5 | Whether Foreign Resident | Alpha | 1 | M | Y/N |
| 6 | Director PAN | Alphanumeric | 10 | M | |

**Address Validation Rules**:
- Address Line 1 must NOT start with Client Name
- Address Line 1 and Line 2 must NOT be identical
- Address Line 1 and Line 3 must NOT be identical
- Address Line 2 and Line 3 must NOT be identical
- Address must match documents submitted (Passport, Aadhaar, etc.)

---

#### 14b.5: Segment Activation

**Segments Available on BSE**:

| Segment | Code | Income Proof Required | Additional Requirements |
|---------|------|----------------------|------------------------|
| Equity Cash | EQ | No | Basic KYC sufficient |
| Equity Derivatives (F&O) | EQD | Yes (income >= 10L or net worth) | SEBI F&O eligibility criteria |
| Currency Derivatives | CUR | No specific income req | |
| Debt Segment | DEBT | No | |

**Segment Activation Batch**: Max 50,000 records per file. Fields include Client Code, segments to activate (Y/N per segment).

**Segment-Specific Differences**:
- F&O: Requires income proof, risk disclosure, and SEBI eligibility check (SEBI/HO/MRD/TPD-1/P/CIR/2025/33 - enhanced criteria)
- Currency: Available for all client categories
- Debt: Separate segment activation, minimal additional requirements
- UPI Block Mechanism: Mandatory for QSBs from Feb 1, 2025 for secondary market (ASBA-like)

---

#### 14b.6: Client Category Codes (BSE)

| Code | Category | Entity Type |
|------|----------|-------------|
| 01 | Individual | Person |
| 02 | On behalf of Minor | Person (Guardian acting) |
| 03 | HUF (Hindu Undivided Family) | Non-individual |
| 04 | Company | Non-individual |
| 05 | AOP (Association of Persons) | Non-individual |
| 06 | Partnership Firm | Non-individual |
| 07 | Body Corporate | Non-individual |
| 08 | Trust | Non-individual |
| 09 | Society | Non-individual |
| 10 | Others | Miscellaneous |
| 11 | NRI - Others | NRI |
| 12 | DFI (Dev. Financial Institution) | Institutional |
| 13 | Sole Proprietorship | Non-individual |
| 21 | NRI - Repatriable (NRE) | NRI |
| 22 | OCB (Overseas Corporate Body) | Foreign |
| 23 | FII (Foreign Institutional Investor) | Foreign |
| 24 | NRI - Repatriable (NRO) | NRI |
| 25 | Overseas Corp. Body - Others | Foreign |
| 26 | NRI Child | NRI |
| 27 | NRI - HUF (NRO) | NRI |
| 28 | NRI - Minor (NRO) | NRI |
| 29 | NRI - HUF (NRE) | NRI |
| 31 | Provident Fund | Institutional |
| 32 | Super Annuation Fund | Institutional |
| 33 | Gratuity Fund | Institutional |
| 34 | Pension Fund | Institutional |
| 36 | Mutual Funds FOF Schemes | Institutional |
| 37 | NPS Trust | Institutional |
| 38 | Global Development Network | Institutional |
| 39 | FCRA | Institutional |
| 41 | QFI - Individual | Foreign (QFI) |
| 42 | QFI - Minors | Foreign (QFI) |
| 43 | QFI - Corporate | Foreign (QFI) |
| 44 | QFI - Pension Funds | Foreign (QFI) |
| 45 | QFI - Hedge Funds | Foreign (QFI) |
| 46 | QFI - Mutual Funds | Foreign (QFI) |

UPI applicability: Client categories 01 (Individual) and 03 (HUF) only, Cash segment only.

#### 14b.7: Occupation Codes (BSE)

| Code | Occupation |
|------|-----------|
| 01 | Business |
| 02 | Services (Salaried) |
| 03 | Professional |
| 04 | Agriculture |
| 05 | Retired |
| 06 | Housewife |
| 07 | Student |
| 08 | Others |

#### 14b.8: Income Range Codes (BSE/SEBI Standard)

| Code | Income Range (Annual, INR) |
|------|---------------------------|
| 01 | Below 1 Lakh |
| 02 | 1 Lakh - 5 Lakh |
| 03 | 5 Lakh - 10 Lakh |
| 04 | 10 Lakh - 25 Lakh |
| 05 | 25 Lakh - 1 Crore |
| 06 | Above 1 Crore |

Note: Income range is one of the 6 mandatory KYC attributes (Name, PAN, Address, Mobile, Email, Income Range) required for UCC compliance.

#### 14b.9: Tax Status / Holding Codes (BSE StAR MF)

Tax Status Codes align with Client Category Codes above (01-46).

**Holding Nature Codes**:

| Code | Holding Nature |
|------|---------------|
| SI | Single |
| JO | Joint |
| AS | Anyone or Survivor |

---

#### 14b.10: Status Codes and Responses

**Client Verification Statuses**:

| Status | Code | Description | Can Trade? |
|--------|------|-------------|-----------|
| PAN Approved | A | All 3 parameters verified against ITD | Prerequisite |
| PAN Incorrect | I | PAN/Name/DOB mismatch with ITD | No |
| PAN Pending | P | Verification in progress | No |
| Permitted to Trade (PTT) | PTT | UCC fully compliant, active | Yes |
| Not Permitted to Trade | NPTT | Missing KYC, inactive, or PAN issues | No |
| Active | A | Client actively trading | Yes (if PTT) |
| Inactive | I | Member-deactivated or non-compliant | No |
| Closed | C | Account closed by member | No |

**Common Rejection Reasons**:

| Rejection Type | Cause | Resolution |
|----------------|-------|-----------|
| PAN Incorrect | Name/DOB mismatch with ITD | Client to correct at ITD, then resubmit |
| Address validation fail | Addr1 starts with name, or Addr lines duplicated | Fix address formatting |
| Mobile/Email unverified | Mobile or email not verified | Complete verification before submission |
| Duplicate UCC | Same PAN already registered under another code | Merge or close duplicate |
| Missing mandatory fields | Required fields blank/invalid | Complete all mandatory fields |
| KYC non-compliant | 6 KYC attributes not all valid | Update all 6 attributes |
| Bank details invalid | IFSC/Account not validated | Correct bank details |
| Demat details invalid | DP ID / Client ID mismatch | Verify with depository |
| PAN-Aadhaar not linked | PAN inoperative at ITD | Client links Aadhaar at ITD (exception: NRI with "Not applicable" status) |
| Income range missing | No income declaration | Client provides income range |

---

#### 14b.11: Non-Individual Entity Requirements

**Additional Fields by Entity Type**:

| Entity | Extra Mandatory Fields |
|--------|----------------------|
| HUF (03) | Karta name, Karta PAN, Karta DOB, HUF PAN |
| Company (04) | DOI, CIN, Director details (Name, DIN, PAN, Foreign Resident flag), Authorized signatory |
| Partnership (06) | Partnership PAN, Partner details, Authorized signatory |
| Body Corporate (07) | DOI, CIN/Registration No., Director details |
| Trust (08) | Trust deed registration, Trustee details |
| NRI (21/24) | PIS permission letter (RBI), NRE/NRO bank account, Country of residence |

**NRI-Specific Requirements**:
- RBI PIS (Portfolio Investment Scheme) permission letter required for equity trading
- NRE account for repatriable, NRO for non-repatriable
- CP (Custodial Participant) code requirement REMOVED by SEBI (July 2025)
- NRI PANs must be either "PAN-Aadhaar linked" or marked "Not applicable" per ITD records
- Bank account types: Both Current and Savings permissible for HUF/Trust/Society tax status
- Seafarer NRIs: Some fields relaxed

**Director Details (Row 2 of batch file)**:
- Required for Companies (04), Body Corporate (07), Partnership (06)
- Fields: Action (NEW/DEL), Client Code, Director Name, DIN, Foreign Resident (Y/N), Director PAN
- Director changes via batch: add new or delete existing directors

---

#### 14b.12: Modification and Closure Process

**Modification**:
- Members login to UCC portal at https://ucc.bseindia.com and select "Modify" option
- Batch modification follows same file format as registration
- Changes in PAN verification methodology effective Apr 30, 2024
- Non-financial modifications (address, mobile, email, bank, demat) can be done via batch upload
- Financial modifications (segment change) require separate segment activation batch

**Client Status Changes**:

| From Status | To Status | Action Required |
|-------------|-----------|----------------|
| Active | Inactive | Member updates via UCC portal or batch; client cannot trade |
| Active | Closed | Member closes account; update UCC status; final settlement |
| Inactive | Active | Re-verification of 6 KYC attributes; may take T+2 working days |
| Closed | Active | New UCC registration required (closed accounts cannot be reopened) |

**Closure Process**:
1. Complete all pending settlements
2. Transfer/close all open positions
3. Update client status to "Closed" in UCC database
4. UCC marked as "Not Permitted to Trade"
5. Inform exchanges (BSE/NSE) of closure
6. Retain records per SEBI retention policy (min 5-8 years)

---

#### 14b.13: Timeline and SLA

| Operation | SLA | Notes |
|-----------|-----|-------|
| New UCC to PTT | T+1 (next trading day) | UCCs compliant by 22:00 hrs on T are PTT on T+1 |
| Emergency PTT Processing | Same day (T) if by 14:30 hrs | Exigency provision; PTT by next session |
| UPI-based UCC activation | Same day if by 16:00 hrs | Must have validated PAN, bank, demat by 4 PM |
| Account Reactivation | T+2 working days | T = day confirmation provided |
| Batch Upload Processing | Overnight (T+1 morning) | Uploaded files processed in batch cycles |
| PAN Verification | Real-time to T+1 | Depends on ITD system availability |
| Segment Activation | T+1 | Subject to income/eligibility validation |

---

#### 14b.14: BSE ICCL (Indian Clearing Corporation Limited)

**Role**: ICCL is the clearing corporation subsidiary of BSE, handling clearing and settlement for all BSE trades.

**UCC-ICCL Linkage**:
- Every trade on BSE requires valid UCC; ICCL generates obligations per UCC
- UCC-Demat mapping mandatory: SEBI/HO/MIRSD/DOP/CIR/P/2019/136
- Normal/Early Pay-in transactions require mandatory UCC details
- Clearing members settle all obligations (margins, penalties, levies) for their trading members

**Margin at Client Level**:
- ICCL requires clearing members to upload collateral data **daily**
- SEBI circular Jul 20, 2021: Client-level collateral segregation mandatory
- Web portal for clients to view disaggregated (segment-wise, asset-type) collateral
- 50% of margins and collateral in cash/cash equivalents
- Initial margins at 99.99% confidence interval
- Haircuts applied on real-time basis

**Settlement**:
- ICCL settles all BSE trades including equity, derivatives, MF units (via StAR MF)
- T+1 settlement for equity cash (since Jan 27, 2023)
- Clearing members must maintain clear balance in depository account + funds in clearing bank
- Acceptable collateral: Equity securities with impact cost <= 0.1% for Rs 1L order, traded >= 99% of days in previous 6 months

---

#### 14b.15: BSE StAR MF Integration

**Platform**: BSE StAR MF (Stock Exchange Aggregation and Reporting - Mutual Funds)

**SOAP 1.2 Web Services API**:

| Item | Details |
|------|---------|
| Production Endpoint | `https://www.bsestarmf.in/StarMFWebService/StarMFWebService.svc` |
| WSDL / Help | `https://www.bsestarmf.in/StarMFWebService/StarMFWebService.svc/help` |
| API Doc (v3.1) | https://www.bsestarmf.in/APIFileStructure.pdf |
| Web File Structures | https://bsestarmf.in/WEBFileStructure.pdf (Apr 10, 2024) |
| Protocol | SOAP 1.2 (recommended), SOAP 1.1 supported |
| Testing Tool | SOAPUI (open-source) recommended; POSTMAN requires manual XML crafting |
| Test Environment | Request via navaneetha.krishnan@bsetech.in or aqsa.shaikh@bsetech.in |

**Authentication**:
- Web Service ID + Password provided by BSE to each member
- Pass Key: Alphanumeric, no special characters, required at every login
- Session management via getPassword / authentication methods

**Key SOAP Methods**:

| Method | Purpose | Related to KYC |
|--------|---------|---------------|
| getPassword | Session authentication | Pre-requisite for all calls |
| MFAPI (UCC Registration) | Create/modify UCC for MF platform | Yes - requires KYC + bank details |
| MFAPI (Client Master Upload) | Upload client details for MFI/MFD/RFD/RFI/RIA | Yes |
| MFAPI (Order Entry) | Purchase/Redeem/SIP/STP/SWP transactions | No |
| MFAPI (Client Order Payment Status) | Query payment and order status | No |
| MFAPI (Mandate Registration) | Register auto-debit mandate (pre-req for SIP) | Partial |

**KYC Relationship with StAR MF**:
- Before executing MF transactions, UCC must be created with KYC + demat + bank details
- PAN entered => system checks KYC status of primary holder
- If KYC not done, Video KYC link can be initiated after initial UCC form section
- Individuals, HUF, and Corporate Body can participate subject to KYC compliance
- For minors, guardian must be KYC compliant
- Client Master Structure on StAR MF: 150 fields (existing) or 183 fields (new, from May 2025)

---

#### 14b.16: Reconciliation and Reports

**Reports Available to Brokers from BSE**:

| Report | Frequency | Access Method |
|--------|-----------|--------------|
| UCC Client Master Report | On-demand | BSE StAR MF: Admin >> Admin Reports >> Client Master Reports (TXT download) |
| PAN Verification Status | Daily | UCC portal download |
| UCC Compliance Report | Daily | Lists PTT / NPTT status per client |
| Trade Confirmation | Daily (T+0) | BOLT Plus / BOW trade logs |
| Obligation Report | Settlement day | ICCL portal |
| Margin Report | Daily | ICCL - segment-wise, client-level |
| Collateral Report | Daily | ICCL web portal (client disaggregation) |
| Rejection/Error Report | Per batch upload | Available after batch processing |
| 6 KYC Attribute Compliance | Periodic | Exchange-level compliance monitoring |

---

#### 14b.17: Recent SEBI/BSE Circulars (2024-2026)

| Date | Circular/Notice | Subject |
|------|----------------|---------|
| Jan 22, 2024 | BSE Notice | New UCC format effective; old format coexists |
| Feb 23, 2024 | BSE Circular | Batch upload file format for bank account details (max 20K records) |
| Feb 23, 2024 | BSE Circular | Revised file formats in UCC system |
| Mar 20, 2024 | BSE Reminder | Implementation deadline reminder for revised formats |
| Mar 27, 2024 | BSE Notice | Final reminder; old format discontinued Mar 28, 2024 EOD |
| Mar 28, 2024 | BSE Effective | Old format no longer accepted |
| Apr 18, 2024 | BSE Notice | Revised file formats effective Apr 19, 2024 EOD |
| Apr 30, 2024 | BSE Notice | PAN verification methodology changes effective |
| May 30, 2024 | NSE/ISC/62244 (BSE follows) | PAN-Aadhaar seeding no longer required for PTT |
| Jul 29, 2024 | BSE Circular | Batch upload for Depository details (max 30K); Segment activation (max 50K) |
| Aug 7, 2024 | BSE Notice | Client Master Structure revision to 150 fields |
| Aug 16, 2024 | BSE Effective | Old 131-field UCC structure fully discontinued |
| Oct 4, 2024 | BSE Effective | 150-field revised structure goes live |
| Jan 10, 2025 | BSE Notice | Modification of Client Codes enhancement in RTRMS and BEFS modules |
| Mar 1, 2025 | SEBI Effective | Nomination opt-out/opt-in deadline for demat accounts; up to 10 nominees |
| May 22, 2025 | BSE Notice | New 183-field UCC Registration API Structure (SaveUCC_V2) effective |
| May 29, 2025 | BSE Circular | 183-field structure document published for members |
| Jul 2025 | SEBI | CP (Custodial Participant) code requirement removed for NRIs |
| Dec 10, 2025 | SEBI Circular | NRI KYC relaxation for re-KYC process |
| Jan 7, 2026 | SEBI | New Stock Brokers Regulations 2026 notified (replaces 1992 regs) |

---

#### 14b.18: Error Handling & Correction

**Common Validation Rules (Batch Upload)**:
1. All mandatory fields must be populated; blank mandatory = rejection
2. PAN format: exactly AAAAA9999A (5 alpha + 4 numeric + 1 alpha)
3. DOB format: DD/MM/YYYY strictly
4. Mobile: exactly 10 digits, must be pre-verified
5. Email: valid format, must be pre-verified
6. Pincode: exactly 6 digits
7. IFSC: exactly 11 characters (4 alpha + 0 + 6 alphanumeric)
8. Address Lines 1, 2, 3 must all be distinct; Line 1 cannot start with client name
9. Total nominee percentage must equal exactly 100 if nominees present
10. Client Code: max 10 alphanumeric characters, unique per member
11. Income Range: mandatory for all client types

**Correction/Resubmission Process**:
1. Download rejection report from UCC portal after batch processing
2. Identify rejection reason codes per record
3. Correct the data in source system
4. Resubmit only the corrected records in a new batch file
5. Do NOT resubmit already-accepted records (will cause duplicate errors)
6. For PAN-related rejections: client must first correct at ITD, then resubmit

**6 KYC Attributes (Mandatory for Compliance)**:
Must match across KRA, Exchange (BSE/NSE), and Depository (CDSL/NSDL):
1. Name (as per PAN)
2. PAN (valid, non-inoperative)
3. Address (complete with pincode for India addresses)
4. Mobile Number (valid, verified)
5. Email ID (valid, verified)
6. Income Range (gross annual income code)

**BSE StAR MF**: SOAP 1.2 Web Services for mutual fund orders. API Structure: https://www.bsestarmf.in/APIFileStructure.pdf (v3.1)

### 14c: MCX

**Trading System**: MCX CONNECT

**Connectivity**: CTCL (Computer-to-Computer Link) - proprietary C-structure API via TCP/IP

**Client Registration**: Standard KYC docs + income proof. Requires ISV empanelment for custom trading front-ends.

---

## 15. V13: Depository Integration

### 15a: CDSL

**Systems**:
- **CDAS** (Central Depository Accounting System): Core system
- **EASI/EASIEST**: BO access (view + transactions)
- **myEasi**: Mobile app for BOs

**APIs Available** (https://www.cdslindia.com/DP/APIs.html):

| API | Purpose |
|-----|---------|
| BO Setup & Modify Upload | Account opening and modifications |
| eDIS API | Electronic Delivery Instruction authorization |
| eDIS Revocation API | Pre-trade authorization revocation |
| Transaction Upload API | Multi-module (Demat, Inter-depository, Pledge, Freeze) |

**BO Account Opening**:
- Digital mode through DP website with Video IPV
- API-based upload to CDAS
- BO ID format: 16 digits (8-digit DP ID + 8-digit Client ID)

**DDPI Integration**:
- One-time authorization (replaces per-trade TPIN/OTP)
- DP software registers DDPI with CDSL
- Fields: deponent_name, bo_id, dp_id, authorization_date, scope, signature

**TPIN/OTP Flow** (eDIS):
```
1. DP/Broker portal initiates transaction
2. Calls CDSL API with encrypted transaction details
3. CDSL webpage opens on client device
4. Client reviews details, enters 6-digit TPIN
5. OTP sent to registered email + mobile
6. Transaction authorized
```

### 15b: NSDL

**Systems**:
- **DPM** (Depository Participant Module): Core DP software
- **SPEED-e**: Online facility for retail investors
- **IDeAS**: Internet-based demat account statement
- **Insta Interface**: Instant account opening system

**DPM Software**:
- **GISMO**: NSDL-provided local DPM
- Annual license: Rs.40,000 OR one-time: Rs.2,50,000
- Server: Windows 2008 Server + SQL Server 2008 + .NET 3.5

**BO Account Opening**:
- Via Insta Interface -> CDS -> Local/Cloud DPM
- BO ID format: IN + 6-digit DP ID + 8-digit Client ID (16 chars starting with "IN")

**UDiFF** (Unified Distilled File Formats):
- Standardized format across NSDL/CDSL (SEBI MDAC mandate)
- ISO tags with standardized data types
- Implementation: Mar 30, 2024. Old format discontinued: May 15, 2024

---

## 16. V14: Back-Office / RMS Software

### Option A: 63 Moons (ODIN)

**Website**: https://www.63moons.com/
**Product**: ODIN (Online Data Integration)

| Feature | Details |
|---------|---------|
| Market Share | 70-80% of Indian retail broking |
| Exchange Support | NSE, BSE, MCX (multi-exchange) |
| Segments | Equity, F&O, Currency, Commodity |
| Capabilities | Front + Mid + Back office + RMS |
| Network | 1 million+ licensees, 600+ cities |

### Option B: Symphony Fintech (XTS)

**Website**: https://symphonyfintech.com/xts/
- OMS + RMS + Compliance + Back-office
- Multi-exchange connectivity
- XTS OTIS: Alternative to NSE NOTIS platform
- 10+ years in market

### Option C: TCS BaNCS

**Website**: https://www.tcs.com/what-we-do/products-platforms/tcs-bancs/
- ~30% of Indian retail trading volumes
- Powers 30+ brokerage organizations
- Integrated trading, clearing, surveillance
- Recent: ICICI Securities partnership (Apr 2025)

### Option D: OmneNEST (formerly Omnisys)

**Website**: https://omnenest.com/
- 200+ broker clients
- Powers Zerodha Kite, Upstox, Finvasia
- BSE, NSE, MCX connectivity

---

## 17. V15: Communication & Notifications

### SEBI Mandates (Dec 2024 Circular):
- Distinct mobile number per client (family exception: spouse, dependent children/parents)
- Distinct email per client (same family exception)
- SMS + Email alerts mandatory for all trades

### SMS Gateway

**Recommended**: Kaleyra / MSG91

| Requirement | Details |
|-------------|---------|
| DLT Registration | Mandatory for commercial SMS in India |
| Template Registration | Pre-approved templates with operators |
| Sender ID | Registered entity-level sender ID |
| Use Cases | OTP, trade confirmations, margin calls, account alerts |
| Delivery Tracking | Mandatory delivery receipt logging |

### Email Service

**Recommended**: AWS SES / SendGrid

| Requirement | Details |
|-------------|---------|
| Digital Signature | All contract notes must be digitally signed |
| Encryption | Non-tamperable ECNs (IT Act 2000) |
| Authentication | SPF, DKIM, DMARC configured |
| Delivery Logs | Mandatory proof of delivery (5-year retention) |
| Contract Note Format | Revised format effective Aug 1, 2024 |

### WhatsApp Business API (Optional Enhancement)

**Provider**: Gupshup / Infobip / Kaleyra

| Use Case | Priority |
|----------|----------|
| OTP delivery | Medium |
| Trade confirmations | Low (supplementary to SMS/Email) |
| Margin alerts | Medium |
| Customer service | High |
| Account statements | Low |

**Note**: WhatsApp **cannot** replace email for contract notes per current SEBI mandate.

---

## 18. V16: Credit Bureau (Optional)

**Note**: Credit checks are **NOT mandatory** for SEBI broking KYC. Optional for enhanced risk assessment.

### CIBIL (TransUnion)

**API Marketplace**: https://apimarketplace.transunioncibil.com/
- Credit score (300-900)
- Repayment history, open/closed loans
- Requires user consent (RBI mandated)

### Experian India

**API Portal**: https://developer.experian.com
- REST API with API key auth
- Input: name, mobile, DOB, PAN

### CRIF High Mark

**Website**: https://www.crifhighmark.com/
- Via aggregators (SurePass, IDSPay)
- RBI licensed

---

## 19. Integration Sequence - Complete Onboarding

### Phase 1: Identity Pre-Check (Real-time, ~30 seconds)

```
Step 1: Client enters PAN + Mobile
  |
Step 2: PAN Verification [V1: Decentro]
  |--- Input:  { pan, name (optional), dob (optional) }
  |--- Output: { status, name, category, aadhaar_seeding }
  |--- Action: If status != valid -> REJECT
  |
Step 3: KRA Lookup [V4: Digio]
  |--- Input:  { pan }
  |--- Output: { kra_status, kra_source, name, email/mobile validated }
  |--- Action: If found -> Fetch full record (prefill form)
  |            If not found -> Step 4
  |
Step 4: CKYC Search [V5: Decentro]
  |--- Input:  { document_type: "PAN", id_number: pan }
  |--- Output: { ckyc_id (masked), name, photo }
  |--- Action: If found -> Download full record (prefill form)
  |            If not found -> Fresh KYC flow
```

### Phase 2: Identity & Document Capture (~3-5 minutes)

```
Step 5: DigiLocker Consent [V2: DigiLocker Official / Digio]
  |--- User redirected to DigiLocker -> Consent -> Auth code returned
  |--- Fetch: Aadhaar XML (name, DOB, gender, photo, address)
  |--- Fetch: PAN Card (number, name, father, DOB)
  |--- Action: Prefill form fields, extract photo
  |
Step 6: OCR on uploaded documents [V8: HyperVerge]
  |--- If DigiLocker not used -> User uploads PAN + Aadhaar/Passport/DL
  |--- HyperVerge OCR extracts all fields with confidence scores
  |--- Action: Auto-fill form, flag low-confidence fields for manual review
  |
Step 7: Cross-Verification
  |--- Compare: PAN name vs Aadhaar name vs KRA name vs Bank name
  |--- Fuzzy match score for each pair
  |--- Action: If all match (>80%) -> proceed
  |            If mismatch -> flag for manual review
```

### Phase 3: Financial & Compliance (~2-3 minutes)

```
Step 8: Bank Account Verification [V3: Decentro]
  |--- Input:  { account_number, ifsc, name }
  |--- Output: { status, name_at_bank, match_score, utr }
  |--- Action: If FULL_MATCH -> proceed
  |            If PARTIAL/NO_MATCH -> flag for review
  |
Step 9: Capture remaining data (form-based)
  |--- Financial profile (occupation, income range)
  |--- FATCA/CRS self-certification
  |--- PEP/AML declaration
  |--- Risk profiling questionnaire
  |--- Segment selection (Equity/F&O/Currency/Commodity)
  |
Step 10: Income Proof (if F&O/Commodity selected) [V11: Perfios]
  |--- Upload: ITR/Salary Slip/Bank Statement/Net Worth Certificate
  |--- Perfios analyzes and validates income
  |--- Action: If income meets threshold -> activate segment
```

### Phase 4: AML Screening (~5-10 seconds)

```
Step 11: AML/PEP/Sanctions Check [V10: TrackWizz]
  |--- Input:  { name, dob, nationality, pan }
  |--- Output: { pep_status, sanctions_hit, adverse_media, risk_score }
  |--- Action: If sanctions hit -> REJECT (report to FIU)
  |            If PEP -> Enhanced due diligence
  |            If clean -> proceed
```

### Phase 5: Nominations & Authorizations (~2-3 minutes)

```
Step 12: Nomination capture (1-10 nominees)
  |--- For each: name, relationship, DOB, %, unique ID, address
  |--- Or: opt-out with video declaration
  |
Step 13: DDPI Authorization (optional)
  |--- If opted: capture DDPI consent + scope + signature
  |
Step 14: Running account authorization
  |--- Settlement frequency: Monthly or Quarterly
  |
Step 15: Risk disclosures acknowledgement (per segment)
```

### Phase 6: Verification & Signing (~3-5 minutes)

```
Step 16: Face Match [V9: HyperVerge]
  |--- Input:  { aadhaar_photo (from DigiLocker), live_selfie }
  |--- Output: { match: yes/no, score: 0-100, liveness: pass/fail }
  |--- Action: If match >= 80% + liveness pass -> proceed
  |
Step 17: IPV/VIPV [V7: HyperVerge]
  |--- If Aadhaar eKYC used -> IPV exempted (skip to Step 18)
  |--- Else: Video IPV session
  |     - Random questions + OTP + document display
  |     - Face match + liveness during video
  |     - Recording stored with SHA-256 hash
  |
Step 18: Review all captured data
  |--- Client reviews and confirms all information
  |
Step 19: e-Sign [V6: Digio]
  |--- Generate KYC application PDF (Part I + Part II)
  |--- Aadhaar OTP e-Sign on complete application
  |--- Store signed PDF with DSC
```

### Phase 7: Registration & Submission (~Async, 1-5 business days)

```
Step 20: Upload to KRA [V4: Digio]
  |--- Submit full KYC record to KRA
  |--- Timeline: Within 3 working days
  |--- KRA validates within 2 working days
  |--- Monitor status: Registered -> Validated
  |
Step 21: Upload to CKYC [V5: Decentro]
  |--- Submit to CKYC Registry (CERSAI/Protean)
  |--- Generates 14-digit KIN
  |--- Timeline: Near-real-time (API) or 4-5 days (batch)
  |
Step 22: Register UCC [V12: NSE/BSE/MCX API or batch]
  |--- NSE UCC registration (API or batch file)
  |--- BSE UCC registration (3-param PAN verification)
  |--- MCX registration (if commodity segment)
  |
Step 23: Open BO Account [V13: CDSL/NSDL]
  |--- CDSL: BO Setup API -> CDAS -> DP ID + Client ID assigned
  |--- NSDL: Insta Interface -> CDS -> IN + DP ID + Client ID
  |
Step 24: Activate Segments
  |--- Per exchange: CM, F&O, CD, COM as selected
  |
Step 25: Generate credentials & welcome kit
  |--- Trading ID, demat account details, login credentials
  |--- Send via email + SMS
```

### Phase 8: KYC Admin Validation (Back-Office, parallel)

```
Step 26: Admin Dashboard Review
  |--- Name consistency check (PAN vs Aadhaar vs Bank vs KRA)
  |--- Address validation
  |--- Bank proof review
  |--- Income proof validation (derivative segments)
  |--- FATCA/CRS review
  |--- PEP screening result review
  |--- IPV/VIPV recording review
  |--- Document quality check (OCR confidence scores)
  |
Step 27: Compliance Checks
  |--- AML screening cleared
  |--- SEBI debarred list check
  |--- Duplicate PAN check across existing clients
  |
Step 28: Submission Monitoring
  |--- KRA submission status
  |--- CKYC submission status
  |--- Exchange UCC confirmation
  |
Step 29: Final Approval / Rejection
  |--- Maker-checker workflow (L1 review -> L2 approve)
  |--- If approved -> Client activated
  |--- If rejected -> Reason communicated, re-submission workflow
```

---

## 20. Vendor Comparison Matrix

### Cost Comparison (Estimated per-transaction)

| Integration | Decentro | Digio | HyperVerge | Others |
|-------------|----------|-------|------------|--------|
| PAN Verify | Rs.1-3 | Rs.2-5 | Rs.2-5 | Sandbox: Rs.1-2 |
| Bank Verify (Penny) | Rs.2-5 | Rs.3-5 | - | Cashfree: Rs.2-4 |
| KRA Lookup | - | Rs.3-5 | Rs.3-5 | CVL direct: Rs.2-3 |
| CKYC Search | Rs.3-5 | Rs.3-5 | - | Arya: Rs.3-5 |
| CKYC Upload | Rs.5-10 | Rs.5-10 | - | - |
| eSign | - | Rs.15-25 | - | Leegality: Rs.25, Protean: Rs.5.90 |
| Video KYC | - | Rs.30-50 | Rs.30-50 | IDfy: Rs.30-50 |
| OCR (per doc) | - | - | Rs.1-3 | IDfy: Rs.1-3 |
| Face Match | - | - | Rs.1-2 | IDfy: Rs.1-2 |
| AML Screening | - | - | - | TrackWizz: Rs.5-15 |

**Estimated total cost per onboarding**: Rs.80-150 (fully digital, all verifications)

### Integration Complexity

| Vendor | API Type | Auth | Sandbox | Integration Time | SDK |
|--------|----------|------|---------|-----------------|-----|
| Decentro | REST/JSON | API Key | Yes (staging) | 1-2 weeks | No |
| Digio | REST/JSON | API Key + IP whitelist | Yes (UAT) | 2 days | Yes (mobile+web) |
| HyperVerge | REST/JSON | appId+appKey | Yes | 1-2 weeks | Yes (Android/iOS/Web) |
| TrackWizz | REST/JSON | Bearer token | Contact | 1-2 weeks | No |
| CVL KRA | SOAP/XML | SOAP credentials | Yes | 3 weeks (registration) | No |

---

## 21. Environment & Security Requirements

### API Security

| Requirement | Standard |
|-------------|---------|
| Transport | TLS 1.2+ (HTTPS only) |
| Authentication | API keys rotated quarterly |
| IP Whitelisting | Required for KRA, recommended for all |
| Data Encryption | AES-256 for data at rest |
| PII Handling | Mask Aadhaar (XXXX-XXXX-1234), tokenize PAN |
| Audit Logging | All API calls logged with request/response (PII redacted) |
| Webhook Security | HMAC signature verification on callbacks |

### Compliance

| Requirement | Standard |
|-------------|---------|
| Data Retention | 8 years (SEBI 2026 Regulations) |
| VIPV Recording | 7 years minimum (tamper-proof) |
| DPDP Act 2023 | Consent management, data principal rights |
| PMLA | Customer due diligence records |
| IT Act 2000 | e-Sign, electronic contract notes |

### Vendor SLAs (Recommended Minimums)

| Metric | Target |
|--------|--------|
| API Uptime | 99.9% |
| Response Time (P95) | <3 seconds |
| Support Response | <4 hours (production issues) |
| Data Center | India-based (regulatory requirement) |
| Certifications | SOC 2, ISO 27001 |

---

*This document should be read alongside [KYC_MASTER_DATASET.md](./KYC_MASTER_DATASET.md) which defines the complete field-level data specification. Each vendor integration maps to specific fields in the master dataset as noted in the "Data Mapping" sections above.*

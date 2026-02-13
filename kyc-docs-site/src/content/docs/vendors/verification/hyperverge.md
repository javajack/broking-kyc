---
title: HyperVerge
description: OCR document extraction, face match, video-in-person verification (VIPV), and liveness detection for KYC onboarding.
---


## Table of Contents

1. [Overview](#1-overview)
2. [Face Match API](#2-face-match-api)
3. [Liveness Detection](#3-liveness-detection)
4. [VIPV (Video In-Person Verification)](#4-vipv-video-in-person-verification---sebi-compliant)
5. [Document OCR](#5-document-ocr)
6. [Non-Individual Entity Documents](#6-non-individual-entity-documents)
7. [SDK Integration](#7-sdk-integration)
8. [Integration Details](#8-integration-details)
9. [HyperVerge Dashboard](#9-hyperverge-dashboard)
10. [Pricing](#10-pricing)
11. [Compliance & Certifications](#11-compliance--certifications)
12. [Edge Cases & Failure Handling](#12-edge-cases--failure-handling)
13. [Alternatives Comparison](#13-alternatives-comparison)
14. [Integration with Our System](#14-integration-with-our-system)

---

## 1. Overview

### About HyperVerge

HyperVerge is an AI-powered identity verification platform founded in India, serving major banks, fintechs, NBFCs, and stock brokers. The company provides document OCR, face match, liveness detection, and video KYC capabilities through REST APIs and native SDKs.

**Website**: https://hyperverge.co
**API Docs**: https://github.com/hyperverge/kyc-india-rest-api
**SDK Repos**: https://github.com/hyperverge/hyperkyc-android

### Our Usage

| Capability | Purpose in KYC Flow | Phase |
|-----------|---------------------|-------|
| **Face Match** | Compare DigiLocker Aadhaar photo vs live selfie | Phase 6: Verification |
| **Liveness Detection** | Ensure live person (not spoof) during selfie/video | Phase 6: Verification |
| **VIPV** | Video In-Person Verification when DigiLocker not used | Phase 6: Verification |
| **Document OCR** | Extract fields from PAN, Aadhaar, cheque, passport, DL | Phase 2: Document Capture |

### Key Metrics

| Metric | Value |
|--------|-------|
| Face Match Accuracy | ~99.8% |
| OCR Accuracy | ~99.8% (with per-field confidence scores) |
| Liveness Certification | ISO 30107-3 Level 2 (iBeta tested) |
| Presentation Attack Detection | Printed photos, digital screens, videos, 3D masks, deepfakes |
| SDK Platforms | Android (5.0+), iOS (11+), Web (JavaScript) |
| Data Residency | India (Mumbai data center) |
| Integration Time | 1-2 weeks |

---

## 2. Face Match API

### Endpoint

```
POST https://ind-faceid.hyperverge.co/v1/photo/verifyPair
```

### Authentication

```
Headers:
  appId: <your_app_id>
  appKey: <your_app_key>
```

### Request

Multipart form-data with two images:

| Parameter | Type | Description |
|-----------|------|-------------|
| `image1` | file (JPEG/PNG) or base64 | Reference image (from Aadhaar/PAN photo via DigiLocker) |
| `image2` | file (JPEG/PNG) or base64 | Live selfie (captured via HyperVerge SDK) |

```
POST /v1/photo/verifyPair
Content-Type: multipart/form-data

image1: <aadhaar_photo_file>
image2: <live_selfie_file>
```

### Response

**Success (match found)**:
```json
{
  "status": "success",
  "statusCode": "200",
  "result": {
    "match": "yes",
    "confidence": 92.5,
    "details": {
      "face_detected_ref": true,
      "face_detected_selfie": true,
      "multiple_faces_ref": false,
      "multiple_faces_selfie": false
    }
  }
}
```

**Success (no match)**:
```json
{
  "status": "success",
  "statusCode": "200",
  "result": {
    "match": "no",
    "confidence": 35.2,
    "details": {
      "face_detected_ref": true,
      "face_detected_selfie": true,
      "multiple_faces_ref": false,
      "multiple_faces_selfie": false
    }
  }
}
```

**Error (face not detected)**:
```json
{
  "status": "failure",
  "statusCode": "422",
  "error": "Face not detected in image2. Ensure clear, front-facing photo."
}
```

### Score Thresholds and Actions

| Score Range | Classification | Onboarding Action |
|------------|---------------|-------------------|
| 80-100 | Strong match | Auto-approve |
| 60-79 | Moderate match | Route to manual review queue in KYC Admin |
| 0-59 | Weak / no match | Reject or prompt re-capture of selfie |

### Anti-Spoofing Capabilities

The face match API works in conjunction with liveness detection (Section 3) to detect and reject:

| Attack Type | Detection Method |
|------------|-----------------|
| Printed photos | Texture analysis, depth estimation |
| Digital screens (phone/tablet/laptop) | Moire pattern detection, reflection analysis |
| Pre-recorded videos | Temporal analysis, lip movement detection |
| 3D masks | Material analysis, skin texture verification |
| Deepfakes | AI-generated artifact detection, frequency domain analysis |

### Data Mapping (to Master Dataset)

| API Response Field | Master Dataset Field | Section |
|-------------------|---------------------|---------|
| `result.match` | `face_match_result` (R40) | R: Third-Party Results |
| `result.confidence` | `face_match_score` (R41) | R: Third-Party Results |
| `result.details.face_detected_ref` | `face_match_ref_detected` (R42) | R: Third-Party Results |
| `result.details.face_detected_selfie` | `face_match_selfie_detected` (R43) | R: Third-Party Results |

---

## 3. Liveness Detection

HyperVerge supports two modes of liveness detection.

### 3a. Passive Liveness (Recommended for UX)

| Attribute | Details |
|-----------|---------|
| Input | Single selfie image (no gestures required) |
| Method | AI analyzes texture, depth cues, lighting from a single frame |
| Processing Time | Sub-second (<500ms typical) |
| User Experience | Best UX - customer just takes a selfie |
| Use Case | Default for all onboarding flows |

**How it works**: The customer takes a single selfie through the HyperVerge SDK. The AI model analyzes the image for liveness signals without requiring any user interaction beyond the initial capture. This is transparent to the user.

### 3b. Active Liveness

| Attribute | Details |
|-----------|---------|
| Input | Video sequence with prompted gestures |
| Prompts | Head turn left/right, blink, smile, nod |
| Method | AI verifies real-time response to random prompts |
| Processing Time | 3-5 seconds |
| User Experience | More friction - requires following on-screen instructions |
| Use Case | High-value accounts, regulatory requirement, enhanced security |

**When to use Active Liveness**:
- Customer flagged for enhanced due diligence (PEP, high-risk)
- Passive liveness confidence score falls in borderline range
- Regulatory audit requires demonstrable active verification

### Liveness API

The liveness check is integrated into the SDK flow. When using the REST API directly:

```
POST https://ind-faceid.hyperverge.co/v1/photo/verifyLiveness
Content-Type: multipart/form-data
Headers: { "appId": "xxx", "appKey": "xxx" }

Body: { "image": <selfie_file> }
```

**Response**:
```json
{
  "status": "success",
  "statusCode": "200",
  "result": {
    "live": "yes",
    "liveness_score": 0.97,
    "attack_type": "none",
    "details": {
      "is_printed_photo": false,
      "is_digital_screen": false,
      "is_video_replay": false,
      "is_mask": false
    }
  }
}
```

**Failure response (spoof detected)**:
```json
{
  "status": "success",
  "statusCode": "200",
  "result": {
    "live": "no",
    "liveness_score": 0.12,
    "attack_type": "printed_photo",
    "details": {
      "is_printed_photo": true,
      "is_digital_screen": false,
      "is_video_replay": false,
      "is_mask": false
    }
  }
}
```

### Liveness Score Interpretation

| Score Range | Classification | Action |
|------------|---------------|--------|
| 0.90-1.00 | High confidence live | Auto-approve |
| 0.70-0.89 | Moderate confidence | Consider re-capture or manual review |
| 0.00-0.69 | Likely spoof | Reject, prompt re-capture in better conditions |

### Certification

- **ISO 30107-1 / 30107-3 Level 2 certified**
- Tested by iBeta Quality Assurance (independent third-party lab)
- Level 2 = defends against sophisticated presentation attacks (not just printed photos)
- Attacks tested: print (laser/inkjet), digital display (phone/tablet/monitor), 3D mask, video replay

---

## 4. VIPV (Video In-Person Verification) - SEBI Compliant

### When Is VIPV Required?

| Scenario | VIPV Required? | Reason |
|----------|---------------|--------|
| Customer completed Aadhaar eKYC via DigiLocker | **NO** (Exempted) | IPV exemption per SEBI KYC Master Circular |
| Customer uploaded Aadhaar Offline XML (not eKYC) | **YES** | No real-time identity verification done |
| Customer used alternative address proof (Passport, DL, Voter ID) | **YES** | eKYC not performed |
| Customer could not complete DigiLocker flow | **YES** | Fallback path requires VIPV |

**Expected usage**: ~15-20% of customers (those not using DigiLocker for Aadhaar eKYC).

### SEBI VIPV Requirements Checklist

Per SEBI KYC Master Circular (SEBI/HO/MIRSD/MIRSD-SEC-2/P/CIR/2023/168) and Stock Brokers Master Circular (SEBI/HO/MIRSD/MIRSD-PoD/P/CIR/2025/90):

| # | Requirement | HyperVerge Implementation |
|---|------------|---------------------------|
| 1 | Random question generation + response capture | AI generates random questions; speech-to-text captures answers |
| 2 | OTP verification (customer reads aloud) | OTP sent to registered mobile; customer reads aloud; auto-recognized via speech-to-text |
| 3 | Document display (PAN, Aadhaar, KYC form shown to camera) | SDK prompts customer to hold up each document; OCR runs in real-time |
| 4 | Live face match vs document photo | Video frame compared against Aadhaar/PAN photo during session |
| 5 | Liveness detection during video | Passive liveness runs continuously during video session |
| 6 | Geo-location capture | SDK captures GPS coordinates (lat/long) at session start |
| 7 | Tamper-proof recording storage (7-year retention per RBI) | Recording encrypted (AES-256), SHA-256 hash generated, stored in India DC |
| 8 | Activity log with timestamps | Every action timestamped: session start, document shown, question asked, OTP read, etc. |

### VIPV Flow

```
Step 1:  SDK initiates video session
         -> Camera + microphone permissions requested
         -> Session ID generated
         -> Geo-location captured (lat/long)

Step 2:  Customer shows PAN card to camera
         -> Real-time OCR extracts: PAN number, name, DOB, father's name
         -> Cross-verified against pre-captured PAN data

Step 3:  Customer shows Aadhaar card to camera
         -> Real-time OCR extracts: name, DOB, gender, address
         -> Photo extracted for face match reference
         -> Cross-verified against pre-captured Aadhaar data

Step 4:  Random question displayed on screen
         -> Customer answers verbally
         -> Speech-to-text captures response
         -> Answer logged with timestamp

Step 5:  OTP sent to registered mobile number
         -> Customer reads OTP aloud
         -> Speech-to-text auto-recognizes OTP digits
         -> OTP verified against server-generated value

Step 6:  Live face match
         -> Video frame captured
         -> Compared against Aadhaar/PAN photo
         -> Match score calculated (same thresholds as Section 2)

Step 7:  Liveness check (passive, during video)
         -> AI confirms live person throughout session
         -> No additional gesture required

Step 8:  Geo-location re-confirmed
         -> Final GPS coordinates captured

Step 9:  Session recording finalized
         -> Video encrypted (AES-256)
         -> SHA-256 hash generated for tamper evidence
         -> Recording uploaded to secure storage (India DC)

Step 10: Result generated
         -> PASS / FAIL with detailed scorecard
         -> All individual check results (face match, liveness, OCR, OTP) included
         -> Activity log with all timestamps attached
```

### VIPV Modes

| Mode | Description | Pass Rate | Cost | Best For |
|------|------------|-----------|------|----------|
| **Agent-Assisted** | Human agent conducts VIPV via video call, verifies documents and identity interactively | Higher (~98%) | Rs. 40-50/session | Complex cases, elderly customers, low digital literacy |
| **Fully Automated** | AI-driven, no human agent involved, all checks performed by AI | Standard (~95%) | Rs. 30-40/session | Scale, standard onboarding, cost optimization |

### VIPV API

**Initiate Session**:
```
POST https://ind-vkyc.hyperverge.co/v1/session/create
Headers: { "appId": "xxx", "appKey": "xxx" }

{
  "customer_id": "CUST_12345",
  "reference_image": "<base64_aadhaar_photo>",
  "customer_name": "RAKESH KUMAR",
  "customer_mobile": "9876543210",
  "customer_email": "rakesh@example.com",
  "mode": "automated",
  "callback_url": "https://api.broker.in/webhooks/hyperverge/vipv"
}
```

**Session Status Webhook**:
```json
{
  "event": "session.completed",
  "session_id": "VIPV_SESSION_ABC123",
  "status": "PASS",
  "result": {
    "face_match": {
      "match": "yes",
      "score": 88.5
    },
    "liveness": {
      "live": "yes",
      "score": 0.96
    },
    "ocr": {
      "pan_verified": true,
      "aadhaar_verified": true
    },
    "otp_verified": true,
    "questions_answered": 2,
    "geo_location": {
      "latitude": 28.6139,
      "longitude": 77.2090
    },
    "recording": {
      "url": "https://storage.hyperverge.co/recordings/VIPV_SESSION_ABC123.mp4",
      "hash_sha256": "a1b2c3d4e5f6...",
      "duration_seconds": 180,
      "size_bytes": 15728640
    },
    "activity_log": [
      {"timestamp": "2026-02-13T10:30:00Z", "action": "session_started"},
      {"timestamp": "2026-02-13T10:30:05Z", "action": "geo_location_captured"},
      {"timestamp": "2026-02-13T10:30:15Z", "action": "pan_shown", "ocr_result": "ABCDE1234F"},
      {"timestamp": "2026-02-13T10:30:45Z", "action": "aadhaar_shown", "ocr_result": "XXXX-XXXX-1234"},
      {"timestamp": "2026-02-13T10:31:00Z", "action": "random_question_asked", "question": "What is your mother's maiden name?"},
      {"timestamp": "2026-02-13T10:31:15Z", "action": "question_answered"},
      {"timestamp": "2026-02-13T10:31:30Z", "action": "otp_sent"},
      {"timestamp": "2026-02-13T10:31:45Z", "action": "otp_verified"},
      {"timestamp": "2026-02-13T10:32:00Z", "action": "face_match_completed", "score": 88.5},
      {"timestamp": "2026-02-13T10:32:05Z", "action": "liveness_confirmed"},
      {"timestamp": "2026-02-13T10:32:10Z", "action": "session_completed", "result": "PASS"}
    ]
  }
}
```

### Recording Storage

| Attribute | Details |
|-----------|---------|
| Encryption | AES-256 at rest, TLS 1.2+ in transit |
| Tamper Evidence | SHA-256 hash generated at recording completion |
| Retention | Minimum 7 years (RBI V-CIP requirement) |
| Storage Location | India (Mumbai data center) |
| Access | Downloadable via API with authenticated credentials |
| Format | MP4 (H.264 video, AAC audio) |

### Data Mapping (to Master Dataset, Section N)

| HyperVerge Output | Master Dataset Field | Section |
|-------------------|---------------------|---------|
| `session_id` | `vipv_session_id` (N09) | N: IPV Details |
| `activity_log[0].timestamp` | `vipv_start_time` (N10) | N |
| `activity_log[-1].timestamp` | `vipv_end_time` (N11) | N |
| `recording.url` | `vipv_video_url` (N14) | N |
| `recording.hash_sha256` | `vipv_video_hash` (N15) | N |
| `result.face_match.score` | `vipv_face_match_score` (N17) | N |
| `result.liveness.score` | `vipv_liveness_score` (N18) | N |
| `result.activity_log` (questions) | `vipv_random_questions_json` (N19) | N |
| `result.geo_location` | `vipv_geo_location` (N20) | N |
| `recording.duration_seconds` | `vipv_duration_seconds` (N16) | N |

---

## 5. Document OCR

### Base URL

| Environment | Base URL |
|-------------|---------|
| Sandbox | `https://test-docs.hyperverge.co/v2.0` |
| Production | `https://ind-docs.hyperverge.co/v2.0` |

### Authentication

```
Headers:
  appId: <your_app_id>
  appKey: <your_app_key>
```

### Supported Documents and Endpoints

| Document | Endpoint | Method | Content-Type |
|----------|----------|--------|-------------|
| PAN Card | `/readPAN` | POST | multipart/form-data |
| Aadhaar Card | `/readAadhaar` | POST | multipart/form-data |
| Passport | `/readPassport` | POST | multipart/form-data |
| Driving License | `/readKYC` | POST | multipart/form-data |
| Voter ID | `/readVoterID` | POST | multipart/form-data |
| Cheque / Cancelled Cheque | `/readKYC` | POST | multipart/form-data |
| Auto-Detect (any KYC doc) | `/readKYC` | POST | multipart/form-data |

### Input Requirements

| Parameter | Details |
|-----------|---------|
| Field name | `image` |
| Accepted formats | JPEG, PNG, TIFF, PDF (first page) |
| Minimum resolution | 800px width recommended |
| Maximum file size | 5MB |
| Color | Color preferred; grayscale accepted with lower accuracy |

### Request Example (PAN OCR)

```
POST /v2.0/readPAN
Content-Type: multipart/form-data
Headers: { "appId": "xxx", "appKey": "xxx" }

Body:
  image: <pan_card_image_file>
```

### Response Examples

#### PAN Card OCR Response

```json
{
  "status": "success",
  "statusCode": "200",
  "result": {
    "details": [
      {
        "type": "pan",
        "fieldsExtracted": {
          "pan_no": { "value": "ABCDE1234F", "conf": 0.99 },
          "name": { "value": "RAKESH KUMAR", "conf": 0.99 },
          "father": { "value": "SURESH KUMAR", "conf": 0.95 },
          "date": { "value": "01/01/1990", "conf": 0.97 },
          "date_of_issue": { "value": "15/06/2015", "conf": 0.85 }
        }
      }
    ]
  }
}
```

**PAN OCR Fields**:

| Field | Key | Description | Typical Confidence |
|-------|-----|-------------|-------------------|
| PAN Number | `pan_no` | 10-character alphanumeric PAN | 0.97-0.99 |
| Name | `name` | Name as printed on PAN card | 0.95-0.99 |
| Father's Name | `father` | Father's name on PAN | 0.90-0.97 |
| Date of Birth | `date` | DOB in DD/MM/YYYY format | 0.93-0.99 |
| Date of Issue | `date_of_issue` | Card issue date (if visible) | 0.80-0.90 |

#### Aadhaar Card OCR Response

```json
{
  "status": "success",
  "statusCode": "200",
  "result": {
    "details": [
      {
        "type": "aadhaar",
        "fieldsExtracted": {
          "aadhaar_no": { "value": "XXXX-XXXX-1234", "conf": 0.98 },
          "name": { "value": "RAKESH KUMAR", "conf": 0.99 },
          "dob": { "value": "01/01/1990", "conf": 0.97 },
          "gender": { "value": "M", "conf": 0.99 },
          "address": { "value": "123, MG Road, Sector 5, Gurgaon, Haryana - 122001", "conf": 0.88 },
          "photo": { "value": "<base64_encoded_face_photo>", "conf": 0.95 }
        }
      }
    ]
  }
}
```

**Aadhaar OCR Fields**:

| Field | Key | Description | Typical Confidence |
|-------|-----|-------------|-------------------|
| Aadhaar Number | `aadhaar_no` | Masked (last 4 digits visible per UIDAI norms) | 0.95-0.99 |
| Name | `name` | Name on Aadhaar | 0.95-0.99 |
| Date of Birth | `dob` | DOB in DD/MM/YYYY | 0.93-0.98 |
| Gender | `gender` | M / F / T | 0.98-0.99 |
| Address | `address` | Full address as printed | 0.80-0.92 |
| Photo | `photo` | Extracted face photo (base64) | 0.90-0.97 |

#### Cheque / Cancelled Cheque OCR Response

```json
{
  "status": "success",
  "statusCode": "200",
  "result": {
    "details": [
      {
        "type": "cheque",
        "fieldsExtracted": {
          "account_no": { "value": "1234567890", "conf": 0.96 },
          "ifsc": { "value": "SBIN0001234", "conf": 0.98 },
          "bank_name": { "value": "State Bank of India", "conf": 0.99 },
          "branch": { "value": "Gurgaon Main Branch", "conf": 0.90 },
          "micr": { "value": "110002345", "conf": 0.94 }
        }
      }
    ]
  }
}
```

**Cheque OCR Fields**:

| Field | Key | Description | Typical Confidence |
|-------|-----|-------------|-------------------|
| Account Number | `account_no` | Bank account number | 0.92-0.98 |
| IFSC Code | `ifsc` | 11-character IFSC | 0.95-0.99 |
| Bank Name | `bank_name` | Name of the bank | 0.95-0.99 |
| Branch | `branch` | Branch name | 0.85-0.95 |
| MICR Code | `micr` | 9-digit MICR code | 0.90-0.97 |

#### Passport OCR Response

```json
{
  "status": "success",
  "statusCode": "200",
  "result": {
    "details": [
      {
        "type": "passport",
        "fieldsExtracted": {
          "passport_num": { "value": "K1234567", "conf": 0.98 },
          "name": { "value": "RAKESH KUMAR", "conf": 0.99 },
          "dob": { "value": "01/01/1990", "conf": 0.97 },
          "nationality": { "value": "INDIAN", "conf": 0.99 },
          "gender": { "value": "M", "conf": 0.99 },
          "issue_date": { "value": "15/06/2020", "conf": 0.95 },
          "expiry_date": { "value": "14/06/2030", "conf": 0.96 },
          "place_of_birth": { "value": "NEW DELHI", "conf": 0.92 },
          "place_of_issue": { "value": "NEW DELHI", "conf": 0.90 },
          "mrz_line1": { "value": "P<INDKUMAR<<RAKESH<<<<<<<<<<<<<<<<<<<<<<<<", "conf": 0.99 },
          "mrz_line2": { "value": "K12345671IND9001010M3006146<<<<<<<<<<<<<<00", "conf": 0.99 }
        }
      }
    ]
  }
}
```

#### Driving License OCR Response

```json
{
  "status": "success",
  "statusCode": "200",
  "result": {
    "details": [
      {
        "type": "dl",
        "fieldsExtracted": {
          "dl_number": { "value": "HR0120190012345", "conf": 0.97 },
          "name": { "value": "RAKESH KUMAR", "conf": 0.98 },
          "dob": { "value": "01/01/1990", "conf": 0.96 },
          "address": { "value": "123, MG Road, Gurgaon, Haryana", "conf": 0.85 },
          "issue_date": { "value": "01/06/2019", "conf": 0.93 },
          "validity": { "value": "31/05/2039", "conf": 0.94 },
          "vehicle_classes": { "value": "LMV, MCWG", "conf": 0.90 }
        }
      }
    ]
  }
}
```

### Auto-Detect Mode (`/readKYC`)

The `/readKYC` endpoint automatically identifies the document type and extracts relevant fields. Use this when:
- Document type is not known in advance
- Building a generic document upload flow
- Processing mixed document batches

The response includes a `type` field indicating the detected document type: `pan`, `aadhaar`, `passport`, `dl`, `voter_id`, `cheque`, etc.

### Tamper Detection

HyperVerge OCR includes built-in tamper detection that flags signs of document manipulation:

| Tamper Type | Detection |
|------------|-----------|
| Photo pasting (face swapped on document) | Detects paste edges, inconsistent lighting |
| Text editing (Photoshopped name/DOB) | Font inconsistency, pixel-level artifacts |
| Cropped/partial documents | Missing expected regions, incomplete fields |
| Color-copied documents | Color profile analysis, print pattern detection |

Tamper detection results appear in the response as:
```json
{
  "tamper_check": {
    "is_tampered": false,
    "tamper_score": 0.05,
    "tamper_details": []
  }
}
```

### Confidence Score Handling

| Confidence Range | Quality | Action |
|-----------------|---------|--------|
| 0.95-1.00 | High | Auto-accept field value |
| 0.80-0.94 | Medium | Accept but flag for visual confirmation by customer |
| 0.60-0.79 | Low | Present to customer for manual correction |
| 0.00-0.59 | Very Low | Prompt re-capture of document |

---

## 6. Non-Individual Entity Documents

HyperVerge's OCR capabilities extend beyond individual KYC documents to support entity-level verification.

### Corporate Documents

| Document | OCR Support | Fields Extracted | Accuracy Notes |
|----------|------------|-----------------|----------------|
| CIN Certificate | Yes | CIN number, company name, date of incorporation, registered office | Good accuracy on printed certificates |
| Board Resolution | Partial | Signatory names, company name, date | Limited accuracy on handwritten portions |
| MOA/AOA | Partial | Company name, objects (first page) | Multi-page documents require page-by-page processing |

### HUF Documents

| Document | OCR Support | Fields Extracted |
|----------|------------|-----------------|
| Karta's Aadhaar | Yes (standard Aadhaar OCR) | Name, DOB, gender, address, photo |
| Karta's PAN | Yes (standard PAN OCR) | PAN number, name, DOB |
| HUF PAN | Yes (standard PAN OCR) | HUF PAN number, HUF name |
| HUF Deed | Partial (generic document OCR) | HUF name, Karta name (accuracy varies) |

### Partnership Documents

| Document | OCR Support | Fields Extracted |
|----------|------------|-----------------|
| Partnership Deed | Partial | Firm name, partner names, dates (accuracy varies on scanned legal docs) |
| Partnership PAN | Yes (standard PAN OCR) | Firm PAN, firm name |
| Partner's PAN/Aadhaar | Yes (standard individual OCR) | All standard fields |

### Face Match for Non-Individuals

For authorized signatories and directors of non-individual entities, the same face match API (Section 2) applies. The reference image is the signatory's PAN/Aadhaar photo, matched against a live selfie.

---

## 7. SDK Integration

### Android SDK

| Attribute | Details |
|-----------|---------|
| Repository | https://github.com/hyperverge/hyperkyc-android |
| Min SDK Version | API 21 (Android 5.0 Lollipop) |
| SDK Size | ~5MB (AAR) |
| Language | Java / Kotlin compatible |
| Camera | Uses device camera with quality optimization |
| Permissions | Camera, Internet, Location (for VIPV) |

**Gradle Integration**:
```groovy
dependencies {
    implementation 'co.hyperverge:hyperkyc-android:x.y.z'
}
```

**Basic Usage**:
```kotlin
val config = HyperKycConfig.Builder()
    .appId("your_app_id")
    .appKey("your_app_key")
    .setWorkflow("face_match_liveness")
    .build()

HyperKyc.start(activity, config, object : HyperKycCallback {
    override fun onSuccess(result: HyperKycResult) {
        // result.faceMatchScore, result.livenessResult, etc.
    }
    override fun onFailure(error: HyperKycError) {
        // Handle error
    }
})
```

### iOS SDK

| Attribute | Details |
|-----------|---------|
| Repository | HyperVerge iOS SDK (contact for access) |
| Min iOS Version | iOS 11.0+ |
| Language | Swift / Objective-C compatible |
| SDK Size | ~4MB |
| Permissions | Camera, Internet, Location (for VIPV) |

**CocoaPods Integration**:
```ruby
pod 'HyperKyc', '~> x.y.z'
```

### Web SDK (JavaScript)

| Attribute | Details |
|-----------|---------|
| Integration | JavaScript SDK loaded via script tag or npm |
| Browser Support | Chrome 60+, Firefox 60+, Safari 12+, Edge 79+ |
| Requirements | Camera access via getUserMedia API, HTTPS required |
| Size | ~200KB (minified + gzip) |

**Script Tag Integration**:
```html
<script src="https://cdn.hyperverge.co/hyperkyc-web/v1/hyperkyc.min.js"></script>
```

**Basic Usage**:
```javascript
const hyperKyc = new HyperKyc({
    appId: 'your_app_id',
    appKey: 'your_app_key',
    workflow: 'face_match_liveness'
});

hyperKyc.start({
    containerId: 'kyc-container',
    onSuccess: function(result) {
        console.log('Face match score:', result.faceMatchScore);
        console.log('Liveness:', result.livenessResult);
    },
    onFailure: function(error) {
        console.error('Error:', error.code, error.message);
    },
    onCancel: function() {
        console.log('User cancelled');
    }
});
```

### SDK Capabilities

All SDKs handle the following:

| Feature | Description |
|---------|-------------|
| Camera capture | Optimized capture with auto-focus, exposure adjustment |
| Image quality check | Real-time feedback if image is blurry, dark, or overexposed |
| Liveness prompts | On-screen instructions for active liveness (if configured) |
| Document alignment guide | Overlay guide for positioning PAN/Aadhaar in frame |
| Result callback | Structured result object with scores and status |
| Error handling | Detailed error codes for camera issues, network errors, etc. |
| UI customization | Customizable themes, colors, fonts to match broker's brand identity |
| Localization | Support for multiple Indian languages in UI text |

---

## 8. Integration Details

### Authentication

All API requests require `appId` and `appKey` in HTTP headers:

```
Headers:
  appId: <your_application_id>
  appKey: <your_application_key>
  Content-Type: multipart/form-data (for image APIs)
  Content-Type: application/json (for session APIs)
```

Credentials are issued per environment (sandbox vs production). Rotate keys periodically (quarterly recommended).

### Base URLs

| Service | Sandbox | Production |
|---------|---------|------------|
| Document OCR | `https://test-docs.hyperverge.co/v2.0` | `https://ind-docs.hyperverge.co/v2.0` |
| Face Match / Liveness | `https://test-faceid.hyperverge.co/v1` | `https://ind-faceid.hyperverge.co/v1` |
| VIPV | `https://test-vkyc.hyperverge.co/v1` | `https://ind-vkyc.hyperverge.co/v1` |
| Dashboard | `https://dashboard.hyperverge.co` | `https://dashboard.hyperverge.co` |

### Rate Limits

| Tier | Rate Limit | Burst |
|------|-----------|-------|
| Standard | 50 TPS (transactions per second) | 100 TPS |
| Enterprise | 100+ TPS (configurable) | 200+ TPS |

Rate limit headers returned:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1707820800
```

### Webhook Support

For async operations (VIPV session results), HyperVerge sends webhooks to the configured `callback_url`:

**Webhook Payload**:
```json
{
  "event": "session.completed",
  "session_id": "VIPV_SESSION_ABC123",
  "status": "PASS",
  "timestamp": "2026-02-13T10:32:10Z",
  "result": { ... }
}
```

**Webhook Security**:
- HMAC-SHA256 signature in `X-HyperVerge-Signature` header
- Verify signature before processing:
  ```
  signature = HMAC-SHA256(webhook_secret, request_body)
  ```

### Error Codes

| HTTP Code | Error | Description | Action |
|-----------|-------|-------------|--------|
| 200 | Success | Request processed successfully | Process response |
| 400 | Bad Request | Malformed request, missing required fields | Fix input parameters |
| 401 | Unauthorized | Invalid or expired appId/appKey | Check credentials, rotate if needed |
| 404 | Not Found | Invalid endpoint or session ID | Verify URL and session ID |
| 413 | Payload Too Large | Image exceeds maximum file size (5MB) | Compress or resize image |
| 422 | Unprocessable Entity | Face not detected, document not readable | Prompt user to re-capture |
| 429 | Too Many Requests | Rate limit exceeded | Implement backoff, retry after `Retry-After` header |
| 500 | Internal Server Error | HyperVerge server issue | Retry with exponential backoff |
| 503 | Service Unavailable | Temporary maintenance or overload | Retry after delay |

### Retry Strategy

Recommended retry policy for transient errors (429, 500, 503):

```
Attempt 1: Immediate
Attempt 2: Wait 1 second
Attempt 3: Wait 3 seconds
(Max 2 retries, total 3 attempts)
```

For 422 errors (face not detected, document unreadable), do NOT retry automatically. Prompt the user to re-capture the image with better conditions.

### Timeout Configuration

| API | Recommended Timeout |
|-----|-------------------|
| Face Match | 10 seconds |
| Liveness | 10 seconds |
| Document OCR | 15 seconds |
| VIPV Session Create | 15 seconds |
| VIPV Webhook | N/A (async) |

---

## 9. HyperVerge Dashboard

HyperVerge provides an admin dashboard at `https://dashboard.hyperverge.co` for monitoring and management.

### Dashboard Features

| Feature | Description |
|---------|-------------|
| **Real-time Analytics** | Total verifications, success/failure rates, average scores by day/week/month |
| **Transaction Search** | Search by session ID, customer ID, date range, status |
| **Manual Review Queue** | View borderline cases (face match 60-79%) for human decision |
| **Manual Override** | Approve or reject borderline verifications with audit trail |
| **Screenshot/Video Viewer** | View captured selfies, document images, VIPV recordings inline |
| **Audit Trail** | Complete history of every verification attempt with timestamps and reviewer actions |
| **API Usage** | Track API call volume, latency percentiles, error rates |
| **Alerts** | Configure alerts for high failure rates, API errors, unusual patterns |

### Manual Review Workflow

```
1. Verification completes with borderline score (face match 60-79%)
2. Case appears in "Pending Review" queue on dashboard
3. Reviewer sees:
   - Reference image (Aadhaar/PAN photo)
   - Live selfie
   - Face match score
   - Liveness score
   - OCR results (if applicable)
4. Reviewer decides: Approve / Reject / Request Re-capture
5. Decision logged with reviewer ID, timestamp, reason
6. Webhook sent to broker system with final decision
```

### User Roles

| Role | Permissions |
|------|------------|
| Admin | Full access: settings, API keys, user management, all data |
| Reviewer | Manual review queue, approve/reject, view transactions |
| Analyst | View-only: analytics, reports, transaction search |
| Auditor | View audit trail, compliance reports (read-only) |

---

## 10. Pricing

### Per-Transaction Pricing (Estimated)

| Service | Cost (INR) | Notes |
|---------|-----------|-------|
| Face Match | Rs. 1-2 per match | Includes anti-spoofing |
| Passive Liveness | Rs. 1-2 per check | Often bundled with face match |
| Active Liveness | Rs. 2-3 per check | Higher due to video processing |
| Document OCR (per document) | Rs. 1-3 per document | Varies by document type |
| VIPV - Fully Automated | Rs. 30-40 per session | AI-driven, no agent |
| VIPV - Agent-Assisted | Rs. 40-50 per session | Includes agent time |

### Additional Costs

| Item | Cost | Notes |
|------|------|-------|
| SDK License | Included | No separate SDK license fee; included in per-transaction pricing |
| VIPV Recording Storage | Additional | For 7-year retention beyond standard period; negotiate based on volume |
| Dashboard Access | Included | Standard dashboard included; advanced analytics may be extra |
| Support | Included (standard) | Dedicated account manager for enterprise plans |

### Volume Discounts

| Monthly Volume | Typical Discount |
|---------------|-----------------|
| Up to 10,000 transactions | Standard pricing |
| 10,001 - 50,000 | 10-15% discount |
| 50,001 - 200,000 | 15-25% discount |
| 200,000+ | Custom enterprise pricing (negotiate) |

### Estimated Per-Onboarding Cost (HyperVerge components only)

| Scenario | Components | Est. Cost |
|----------|-----------|-----------|
| DigiLocker path (no VIPV) | Face Match + Liveness + OCR (2 docs) | Rs. 5-9 |
| Non-DigiLocker path (with VIPV) | Face Match + Liveness + OCR (2 docs) + VIPV | Rs. 35-55 |

---

## 11. Compliance & Certifications

### Certifications

| Certification | Scope | Status |
|--------------|-------|--------|
| **ISO 27001** | Information Security Management System | Certified |
| **SOC 2 Type II** | Security, Availability, Processing Integrity controls | Certified |
| **ISO 30107-3 Level 2** | Presentation Attack Detection (Liveness) | iBeta certified |
| **GDPR** | Data protection (for international operations) | Compliant |

### Regulatory Compliance

| Regulation | Compliance |
|-----------|------------|
| **SEBI VIPV** | Fully compliant with SEBI KYC Master Circular requirements for Video IPV |
| **RBI V-CIP** | Compliant with RBI Video-based Customer Identification Process guidelines |
| **IRDAI VBIP** | Compliant with Insurance Regulatory Authority Video-Based Identification Process |
| **DPDP Act 2023** | Data Protection Digital Privacy Act compliance (India) |
| **IT Act 2000** | Electronic record and digital signature compliance |
| **PMLA** | Prevention of Money Laundering Act - KYC verification support |

### Data Residency

| Aspect | Details |
|--------|---------|
| Primary Data Center | Mumbai, India |
| Data Sovereignty | All Indian customer data processed and stored within India |
| Backup | Geo-redundant within India |
| Data Deletion | On request, customer data purged within 30 days (except regulatory retention) |

### SEBI Audit Requirements

HyperVerge supports the following for SEBI inspection/audit:

| Requirement | HyperVerge Support |
|-------------|-------------------|
| Transaction audit trail | Complete API logs with request/response (PII masked) |
| VIPV recording access | Downloadable recordings with hash verification |
| Verification evidence | Face match scores, liveness results, OCR data exportable |
| System audit | SOC 2 Type II report available on request |
| Data retention proof | Logs and recordings retained per configured retention policy |

---

## 12. Edge Cases & Failure Handling

### Image Quality Issues

| Issue | SDK Behavior | Backend Behavior | Resolution |
|-------|-------------|-----------------|------------|
| Low light / dark environment | SDK shows real-time brightness warning | Returns 422 or low confidence | Prompt user to move to better-lit area |
| Camera blur / out of focus | SDK shows focus indicator | Returns 422 or low confidence | Prompt user to hold steady, auto-focus |
| Glare on document | SDK detects reflection spots | Lower OCR confidence | Prompt user to tilt document, remove glare source |
| Partial document visibility | SDK shows alignment guide | Incomplete field extraction | Prompt user to fit full document in frame |
| Very low resolution camera | SDK warns at session start | May not meet minimum 800px | Suggest uploading a scanned copy instead |

### Face Match Challenges

| Challenge | Impact | Handling |
|-----------|--------|----------|
| Elderly users with significant appearance change from Aadhaar photo (10+ years old) | Lower confidence score (60-75 typical) | Lower auto-approve threshold or route to manual review |
| Glasses (prescription) | Minimal impact | Handles well; trained on diverse dataset |
| Sunglasses | Moderate impact | SDK prompts removal; face detection may fail |
| Masks (COVID/medical) | High impact | SDK prompts removal; face detection will fail |
| Facial hair change (clean-shaven vs full beard) | Moderate impact (5-10 point drop) | Usually still above 80 threshold; manual review if borderline |
| Multiple faces in frame | Rejection | SDK detects and prompts single face in frame |
| Heavy makeup or cosmetic changes | Minor impact | Handles well in most cases |
| Head coverings (religious) | Minimal impact if face fully visible | SDK accepts if face is visible; turban, hijab (face visible) OK |

### Document OCR Challenges

| Challenge | Impact | Handling |
|-----------|--------|----------|
| Laminated document with heavy glare | Reduced accuracy (80-90%) | Prompt user to capture at angle to avoid glare |
| Very old / faded documents | Reduced accuracy (70-85%) | Flag low-confidence fields for manual entry |
| Handwritten portions on legal documents | Poor accuracy (<70%) | Auto-detect and skip; flag for manual transcription |
| Non-standard fonts or print quality | Moderate impact | Per-field confidence lets system identify weak fields |
| Multi-language documents (Hindi + English) | Good support for common Indian languages | OCR trained on bilingual Indian documents |
| Aadhaar in regional language only | Moderate impact | Supports 12 Indian languages but accuracy varies |

### VIPV Challenges

| Challenge | Impact | Handling |
|-----------|--------|----------|
| Poor network connectivity | Video quality degrades, session may drop | SDK auto-adjusts bitrate; auto-reconnect with session resume |
| Background noise | OTP speech recognition may fail | Visual OTP entry fallback available |
| Customer does not understand instructions | Session failure | Agent-assisted mode recommended for such cases |
| OTP not received on mobile | Session blocked at OTP step | Allow OTP resend (max 3 attempts); fallback to email OTP |
| Customer holds document too close/far | OCR during video fails | SDK provides distance guide overlay |

### System-Level Edge Cases

| Scenario | Handling |
|----------|----------|
| HyperVerge API down (500/503) | Retry with exponential backoff; if persistent, queue for later; show user-friendly message |
| Rate limit exceeded (429) | Backoff and retry; alert ops team if sustained |
| Sandbox/Production credential mismatch | 401 error; log and alert; environment-specific config check |
| Image upload timeout | Retry once; if persistent, suggest smaller file or better network |
| Webhook delivery failure | HyperVerge retries 3 times over 15 minutes; poll status API as fallback |

---

## 13. Alternatives Comparison

| Feature | HyperVerge | IDfy | Signzy |
|---------|-----------|------|--------|
| **Face Match Accuracy** | ~99.8% | ~99.5% | ~99.0% |
| **Liveness Certification** | ISO 30107 Level 2 (iBeta) | ISO 30107 Level 1 | Basic liveness |
| **Liveness Mode** | Passive + Active | Passive + Active | Active only |
| **VIPV - SEBI Compliant** | Full (automated + agent) | Full (automated + agent) | Agent-assisted only |
| **OCR Document Types** | 7+ Indian doc types | 3 task types (OCR/Verify/Both) | 14,000+ doc types (180+ countries) |
| **OCR Accuracy** | ~99.8% with per-field confidence | ~99.0% | ~98.5% |
| **Tamper Detection** | Built-in | Available | Available |
| **SDK** | Android / iOS / Web | Android / iOS / Web | Web + offline SDK |
| **Face Match Pricing** | Rs. 1-2 | Rs. 2-5 | Rs. 2-4 |
| **OCR Pricing** | Rs. 1-3 | Rs. 2-5 | Rs. 2-4 |
| **VIPV Pricing** | Rs. 30-50 | Rs. 30-50 | Rs. 40-60 |
| **Integration Time** | 1-2 weeks | 1-2 weeks | 2-3 weeks |
| **Certifications** | ISO 27001, SOC 2 Type II | ISO 27001 | ISO 27001, SOC 2 |
| **India Data Residency** | Yes (Mumbai) | Yes | Yes |
| **Deepfake Detection** | Yes | Limited | No |
| **Low Bandwidth Support** | Moderate | Moderate | Best (offline SDK) |
| **Best For** | High accuracy at scale, full VIPV | Bundled verification + gov DB check | Low bandwidth, global doc coverage |

### Why HyperVerge for Our Stack

1. **Highest face match accuracy** (~99.8%) reduces manual review queue volume
2. **ISO 30107 Level 2 liveness** provides strongest presentation attack defense (regulatory defensible)
3. **Full SEBI VIPV compliance** with both automated and agent-assisted modes
4. **Native SDKs** for Android, iOS, and Web -- covers all our customer channels
5. **Single vendor** for face match + liveness + OCR + VIPV reduces integration complexity
6. **Per-field confidence scores** on OCR enable intelligent auto-fill vs manual review routing
7. **India data residency** (Mumbai DC) meets SEBI/RBI data localization requirements
8. **Tamper detection** built into OCR catches document fraud early

---

## 14. Integration with Our System

### Architecture Overview

```
KYC App (Frontend - Web/Android/iOS)
    |
    +---> HyperVerge SDK (embedded)
    |       |
    |       +--- Camera capture + quality check
    |       +--- Liveness prompts (if active mode)
    |       +--- Document alignment guide
    |       +--- VIPV session management
    |       |
    |       +--- Returns: images, scores, session data
    |
    v
KYC API Gateway (Backend)
    |
    +---> HyperVerge REST APIs
    |       |
    |       +--- /v1/photo/verifyPair    (Face Match)
    |       +--- /v1/photo/verifyLiveness (Liveness)
    |       +--- /v2.0/readPAN           (PAN OCR)
    |       +--- /v2.0/readAadhaar       (Aadhaar OCR)
    |       +--- /v2.0/readKYC           (Auto-detect OCR)
    |       +--- /v1/session/create      (VIPV)
    |       |
    |       +--- Webhooks -> /webhooks/hyperverge/vipv
    |
    +---> Cross-verification with other vendors
    |
    v
KYC Database
    |
    v
KYC Admin (Back-Office)
```

### Data Flow: Face Match (DigiLocker Path)

```
Step 1: DigiLocker returns Aadhaar XML
        -> Extract photo from <Pht> element (base64)
        -> Store as reference_image in KYC DB

Step 2: HyperVerge SDK captures live selfie
        -> SDK performs client-side quality check
        -> SDK performs passive liveness check
        -> Returns selfie image + liveness result

Step 3: Backend calls HyperVerge Face Match API
        -> POST /v1/photo/verifyPair
        -> image1 = DigiLocker Aadhaar photo
        -> image2 = live selfie from SDK

Step 4: Process result
        -> If match >= 80% AND liveness = pass -> Auto-approve (store in R40-R43)
        -> If match 60-79% -> Route to KYC Admin manual review queue
        -> If match < 60% -> Prompt re-capture; max 3 attempts then reject
```

### Data Flow: OCR (Non-DigiLocker Path)

```
Step 1: Customer uploads PAN card image
        -> HyperVerge OCR: POST /v2.0/readPAN
        -> Extract: pan_no, name, father, dob (with confidence scores)
        -> Auto-fill form fields where confidence >= 0.80

Step 2: Customer uploads Aadhaar card image
        -> HyperVerge OCR: POST /v2.0/readAadhaar
        -> Extract: name, dob, gender, address, photo (masked aadhaar_no)
        -> Auto-fill form fields where confidence >= 0.80

Step 3: Cross-verify OCR results
        -> Compare PAN OCR name vs Aadhaar OCR name (fuzzy match)
        -> Compare PAN OCR DOB vs Aadhaar OCR DOB (exact match)
        -> Flag discrepancies for manual review

Step 4: Use extracted Aadhaar photo as reference for Face Match (Step 2 above)
```

### Data Flow: Cheque OCR to Penny Drop

```
Step 1: Customer uploads cancelled cheque image
        -> HyperVerge OCR: POST /v2.0/readKYC
        -> Extract: account_no, ifsc, bank_name, branch, micr

Step 2: Auto-fill bank details in KYC form
        -> account_number = OCR account_no
        -> ifsc_code = OCR ifsc

Step 3: Feed to Decentro Penny Drop API [V3]
        -> POST /core_banking/money_transfer/validate_account
        -> { account_number: <from OCR>, ifsc: <from OCR>, name: <from PAN> }
        -> Verify account ownership via name match

Step 4: Cross-verify
        -> Decentro beneficiary_name vs PAN name vs Aadhaar name
        -> If all match -> bank details confirmed
        -> If mismatch -> flag for review
```

### Data Flow: VIPV (Non-DigiLocker Path)

```
Step 1: Customer did not complete DigiLocker Aadhaar eKYC
        -> VIPV required (no IPV exemption)

Step 2: Backend creates VIPV session
        -> POST /v1/session/create
        -> Pass: reference_image (from PAN/Aadhaar OCR photo), customer details

Step 3: SDK launches VIPV session
        -> Customer follows on-screen prompts:
           1. Show PAN -> OCR verifies
           2. Show Aadhaar -> OCR verifies
           3. Answer random question
           4. Read OTP aloud
           5. Face match + liveness (continuous)

Step 4: Session completes
        -> Webhook received at /webhooks/hyperverge/vipv
        -> Store results in Section N fields (N09-N20)
        -> Store recording URL + hash for 7-year retention

Step 5: KYC Admin reviews VIPV result
        -> If PASS: mark IPV as completed
        -> If FAIL: contact customer, offer retry (max 3 attempts)
        -> If borderline: reviewer watches recording, makes decision
```

### Error Handling Strategy

| Error Type | Detection | Action | Fallback |
|-----------|-----------|--------|----------|
| API timeout | Timeout after configured threshold | Retry once | Show user-friendly message, allow manual document entry |
| Face not detected (422) | API returns 422 | Do NOT retry | Prompt user to re-capture with SDK guidance |
| Low face match score (<60%) | Score in response | Allow 2 re-captures | Route to VIPV if repeated failure |
| API down (500/503) | HTTP status code | Retry with backoff (3 attempts) | Queue for async processing; allow user to continue and verify later |
| Rate limited (429) | HTTP 429 + Retry-After | Wait and retry | Alert ops team if sustained |
| Tamper detected on document | `tamper_check.is_tampered = true` | Reject document | Require original document; flag for compliance review |
| VIPV session dropped | Webhook timeout or session status | Session auto-resume on reconnect | If unrecoverable, create new session |

### Environment Configuration

```yaml
# config/hyperverge.yml

sandbox:
  app_id: "HV_SANDBOX_APP_ID"
  app_key: "HV_SANDBOX_APP_KEY"
  ocr_base_url: "https://test-docs.hyperverge.co/v2.0"
  face_base_url: "https://test-faceid.hyperverge.co/v1"
  vipv_base_url: "https://test-vkyc.hyperverge.co/v1"

production:
  app_id: "${HYPERVERGE_APP_ID}"
  app_key: "${HYPERVERGE_APP_KEY}"
  ocr_base_url: "https://ind-docs.hyperverge.co/v2.0"
  face_base_url: "https://ind-faceid.hyperverge.co/v1"
  vipv_base_url: "https://ind-vkyc.hyperverge.co/v1"

common:
  face_match_auto_approve_threshold: 80
  face_match_manual_review_threshold: 60
  liveness_auto_approve_threshold: 0.90
  ocr_auto_accept_confidence: 0.80
  max_selfie_retries: 3
  max_vipv_retries: 3
  api_timeout_ms: 10000
  vipv_timeout_ms: 15000
  retry_max_attempts: 3
  retry_backoff_base_ms: 1000
  webhook_secret: "${HYPERVERGE_WEBHOOK_SECRET}"
  callback_url: "https://api.broker.in/webhooks/hyperverge/vipv"
  vipv_recording_retention_years: 7
```

---

*This document should be read alongside [Vendor Integrations](/broking-kyc/vendors/) (Sections V7, V8, V9 for HyperVerge context) and [Master Dataset](/broking-kyc/reference/master-dataset) for field-level data mappings.*

---
title: Error Handling
description: What happens when things go wrong — fallback flows for DigiLocker failures, verification timeouts, KRA/CKYC edge cases, and API errors.
---

What happens when things go wrong — fallback flows for DigiLocker failures, verification timeouts, KRA/CKYC edge cases, and API errors. Every error has a user-facing message and a system action.

## DigiLocker Failures

| Scenario | Handling |
|----------|---------|
| User cancels consent | Return to Screen 1. Allow retry. After 3 attempts, offer manual document upload fallback. |
| Service down | Show "DigiLocker is temporarily unavailable." Queue for retry. |
| Missing fields in XML | Flag for user to manually enter missing fields on Screen 3. |
| PAN doc not in DigiLocker | Fallback: PAN verify API + user enters father's name manually. |

## Verification Failures

| Check | Failure | User Message |
|-------|---------|-------------|
| PAN Invalid | Status != E | "Your PAN appears to be inactive. Contact nearest PAN center." |
| PAN-Aadhaar not linked | Not seeded | "PAN-Aadhaar linking is mandatory. Visit incometax.gov.in" |
| AML High Risk | Sanctions/PEP | "Your application requires additional review." |
| Penny Drop Failed | Wrong a/c | "Bank verification failed. Check account number and IFSC." |
| Face Match < 80% | Poor selfie | "Face verification unsuccessful. Try again in good lighting." |
| e-Sign OTP failed | Wrong OTP | "OTP verification failed. Click to resend." (3 attempts) |

## Timeout Handling

| API | Expected | Timeout | Fallback |
|-----|----------|---------|----------|
| DigiLocker | 60s | 120s | Retry button. After 3 fails, manual flow. |
| PAN Verify | 3s | 15s | Queue async. Don't block user. |
| KRA Lookup | 5s | 20s | Pre-fill without KRA. Submit fresh. |
| AML Screen | 10s | 30s | Mark "pending" in gate. |
| Penny Drop | 20s | 60s | Must resolve before gate. |

## General API Error Strategy

| HTTP Code | Meaning | Action |
|-----------|---------|--------|
| 429 | Rate limited | Exponential backoff (1s, 2s, 4s). Max 3 retries. |
| 500 | Server error | Retry with same `reference_id`. Max 3 retries. |
| 503 | Service unavailable | Retry after `Retry-After` header. Alert ops if persistent. |
| 401 | Auth failure | Alert ops team (credential issue). Show generic error to user. |
| 400 | Bad request | Log payload for debugging. Do not retry. Fix and resubmit. |

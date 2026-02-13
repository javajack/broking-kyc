---
title: Error Handling
description: What happens when things go wrong — fallback flows for DigiLocker failures, verification timeouts, KRA/CKYC edge cases, and API errors.
---

In a KYC (Know Your Customer) onboarding pipeline that depends on a dozen external services — DigiLocker, PAN (Permanent Account Number) verification, Aadhaar, bank account validation, face matching, AML (Anti-Money Laundering) screening — things will go wrong. Services go down, APIs (Application Programming Interfaces) time out, customers enter incorrect data, and third-party systems return unexpected responses. The mark of a well-built system is not that it never encounters errors, but that it handles every error gracefully: showing the customer a clear message, logging the details for debugging, and retrying or falling back automatically wherever possible. This page catalogs every known error scenario, the user-facing message it should trigger, and the system action that should follow.

:::note[Design Principle: Never Leave the Customer Stranded]
Every error in this catalog has both a user-facing message (what the customer sees) and a system action (what the back-end does). The goal is to never show a generic "Something went wrong" screen. Specific, actionable messages dramatically reduce support ticket volume and improve onboarding completion rates.
:::

Let us start with the most common failure point in the user journey: DigiLocker.

## DigiLocker Failures

DigiLocker is the government's digital document wallet, and it is the primary source for Aadhaar XML, PAN card, and other identity documents during onboarding. Because it is a centralized government service, it can experience high traffic, planned maintenance, or intermittent outages — especially during financial year-end periods when onboarding volumes spike.

| Scenario | Handling |
|----------|---------|
| User cancels consent | Return to Screen 1. Allow retry. After 3 attempts, offer manual document upload fallback. |
| Service down | Show "DigiLocker is temporarily unavailable." Queue for retry. |
| Missing fields in XML | Flag for user to manually enter missing fields on Screen 3. |
| PAN doc not in DigiLocker | Fallback: PAN verify API + user enters father's name manually. |

In plain English: DigiLocker failures are usually temporary or user-initiated. The system should always offer a retry first, and fall back to manual document upload only after three failed attempts. Never force the customer to start over from scratch.

:::tip[Manual Upload Fallback]
When DigiLocker is unavailable, the fallback flow asks the customer to upload photos of their PAN card and Aadhaar card. These are then processed through OCR (Optical Character Recognition) via HyperVerge to extract the same data that DigiLocker would have provided. The data quality is slightly lower (OCR can misread characters), which is why DigiLocker is always preferred.
:::

Beyond DigiLocker, several other verification steps can fail during the user journey. Each has its own failure mode and user message.

## Verification Failures

These are failures that occur during the identity verification steps — PAN validation, Aadhaar linkage checks, bank account verification, face matching, and e-Sign. Each failure has a specific user-facing message designed to tell the customer exactly what went wrong and what they should do about it.

| Check | Failure | User Message |
|-------|---------|-------------|
| PAN Invalid | Status != E | "Your PAN appears to be inactive. Contact nearest PAN center." |
| PAN-Aadhaar not linked | Not seeded | "PAN-Aadhaar linking is mandatory. Visit incometax.gov.in" |
| AML High Risk | Sanctions/PEP (Politically Exposed Person) | "Your application requires additional review." |
| Penny Drop Failed | Wrong a/c | "Bank verification failed. Check account number and IFSC (Indian Financial System Code)." |
| Face Match < 80% | Poor selfie | "Face verification unsuccessful. Try again in good lighting." |
| e-Sign OTP failed | Wrong OTP | "OTP verification failed. Click to resend." (3 attempts) |

:::caution[AML High Risk Is Deliberately Vague]
Notice that the AML High Risk message says "Your application requires additional review" — it does not tell the customer why. This is intentional. Revealing that a sanctions or PEP hit triggered the flag could compromise the integrity of the screening process and may violate PMLA (Prevention of Money Laundering Act) requirements around tipping off.
:::

In plain English: PAN and bank verification failures are the customer's responsibility to fix (by linking PAN-Aadhaar or correcting their account details). Face match failures can often be resolved by simply retaking the selfie in better lighting. AML flags are handled internally by the compliance team.

When an external API does not fail outright but simply takes too long to respond, the system needs clear timeout thresholds and fallback behavior.

## Timeout Handling

Each external API has an expected response time and a maximum timeout. If the API does not respond within the timeout window, the system should either retry, queue the request for async processing, or fall back to an alternative flow. The goal is to never block the customer on a slow API when there is a reasonable alternative.

| API | Expected | Timeout | Fallback |
|-----|----------|---------|----------|
| DigiLocker | 60s | 120s | Retry button. After 3 fails, manual flow. |
| PAN Verify | 3s | 15s | Queue async. Don't block user. |
| KRA (KYC Registration Agency) Lookup | 5s | 20s | Pre-fill without KRA. Submit fresh. |
| AML Screen | 10s | 30s | Mark "pending" in gate. |
| Penny Drop | 20s | 60s | Must resolve before gate. |

In plain English: the PAN verification timeout is generous (15 seconds) because it can be processed asynchronously — the customer can continue filling in other fields while the PAN check completes in the background. The Penny Drop, however, must resolve before the customer can proceed, because bank account verification is a hard gate in the onboarding flow.

:::note[Why Penny Drop Cannot Be Async]
Unlike PAN verification, the Penny Drop (a Rs.1 IMPS credit to the customer's bank account) returns the account holder's name, which the system uses for name matching. This name match is a critical input to the maker-checker decision, so the system cannot let the customer proceed without it. If the Penny Drop keeps timing out, ops should investigate whether the customer's bank is experiencing IMPS downtime.
:::

Finally, here is the general strategy for handling HTTP error codes from any vendor API.

## General API Error Strategy

This table applies to every vendor API in the system — Decentro, HyperVerge, TrackWizz, Digio, Setu, and others. The HTTP status codes follow standard conventions, but the retry behavior and alerting logic are specific to our pipeline.

| HTTP Code | Meaning | Action |
|-----------|---------|--------|
| 429 | Rate limited | Exponential backoff (1s, 2s, 4s). Max 3 retries. |
| 500 | Server error | Retry with same `reference_id`. Max 3 retries. |
| 503 | Service unavailable | Retry after `Retry-After` header. Alert ops if persistent. |
| 401 | Auth failure | Alert ops team (credential issue). Show generic error to user. |
| 400 | Bad request | Log payload for debugging. Do not retry. Fix and resubmit. |

:::tip[Always Retry with the Same Reference ID]
When retrying a 500 error, always use the same `reference_id` as the original request. This ensures idempotency — the vendor can detect that this is a retry of the same request and avoid creating duplicate records. Without this, a timeout followed by a blind retry could result in double PAN verifications, double Penny Drops, or duplicate KRA submissions.
:::

In plain English: 429 and 500 errors are transient and should be retried with exponential backoff. 503 means the vendor is temporarily down and you should respect their `Retry-After` header. 401 means your API credentials are wrong or expired — this is an ops emergency, not a customer issue. 400 means your request payload is malformed — do not retry the same bad request; fix the data first.

:::caution[Escalation Path for Persistent Failures]
If any vendor API returns 500 or 503 errors for more than 15 minutes, the system should automatically alert the operations team via the internal messaging channel. If the failure persists for more than an hour, escalate to the vendor's support team with the relevant `reference_id` values and timestamps. Document every escalation — these records are useful during vendor SLA (Service Level Agreement) reviews.
:::

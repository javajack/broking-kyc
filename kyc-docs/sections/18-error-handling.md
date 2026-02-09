<section id="error-handling">
## <span class="section-num">18</span> Error Handling &amp; Edge Cases

### DigiLocker Failures

| Scenario | Handling |
|---|---|
| User cancels consent | Return to Screen 1. Allow retry. After 3 attempts, offer manual document upload fallback. |
| Service down | Show "DigiLocker is temporarily unavailable." Queue for retry. |
| Missing fields in XML | Flag for user to manually enter missing fields on Screen 3. |
| PAN doc not in DigiLocker | Fallback: PAN verify API + user enters father's name manually. |

### Verification Failures

| Check | Failure | User Message |
|---|---|---|
| PAN Invalid | Status &ne; E | "Your PAN appears to be inactive. Contact nearest PAN center." |
| PAN-Aadhaar not linked | Not seeded | "PAN-Aadhaar linking is mandatory. Visit incometax.gov.in" |
| AML High Risk | Sanctions/PEP | "Your application requires additional review." |
| Penny Drop Failed | Wrong a/c | "Bank verification failed. Check account number and IFSC." |
| Face Match < 80% | Poor selfie | "Face verification unsuccessful. Try again in good lighting." |
| e-Sign OTP failed | Wrong OTP | "OTP verification failed. Click to resend." (3 attempts) |

### Timeout Handling

| API | Expected | Timeout | Fallback |
|---|---|---|---|
| DigiLocker | 60s | 120s | Retry button. After 3 fails, manual flow. |
| PAN Verify | 3s | 15s | Queue async. Don't block user. |
| KRA Lookup | 5s | 20s | Pre-fill without KRA. Submit fresh. |
| AML Screen | 10s | 30s | Mark "pending" in gate. |
| Penny Drop | 20s | 60s | Must resolve before gate. |

</section>

<section id="flow-summary">
## <span class="section-num">2</span> Flow Summary

<p class="section-brief"><strong>The complete onboarding pipeline at a glance</strong> &mdash; from the user's first mobile OTP to the moment they can trade. Shows the 9-screen user journey (~6 min), the maker-checker review, and the multi-agency batch processing that runs in parallel after approval.</p>

```
USER JOURNEY (9 screens, ~6 minutes)

Screen 1: Mobile / Email Registration (1 field: mobile + OTP)
    |--> ASYNC: Device Fingerprint [Bureau.id]

Screen 2: Enter PAN + DOB (2 fields)
    |--> ASYNC: PAN Verify, KRA Lookup, CKYC Search, AML Screen

Screen 3: DigiLocker Consent (redirect, 0 fields)
    |--> Harvests: Name, DOB, Gender, Photo, Address, Father's Name, PAN

Screen 4: Confirm Identity (1 field: email)
    |--> Mobile already verified from Screen 1

Screen 5: Bank Account (3 fields: account no, IFSC, type)
    |--> ASYNC: Penny Drop, IFSC Lookup, OCR

Screen 6: Trading Preferences (segment toggles)
    |--> ASYNC: Income verify (if F&O/Commodity)

Screen 7: Nominations (add nominee or opt-out)

Screen 8: Declarations (checkboxes) + BLOCKING GATE

Screen 9: Review + Face Match + Aadhaar OTP e-Sign

--- USER DONE (~6 minutes) ---

MAKER-CHECKER REVIEW:
    Step 10: Maker (auto-approve if all checks pass; manual only for edge cases)
    Step 11: Checker (final approval)

BATCH ZONE (parallel agency pipelines, after checker approval):
    ├─→ KRA Pipeline:   Submit → Under Process → Registered → Validated (2-3 days)
    ├─→ CKYC Pipeline:  Upload → Queued → Validated → KIN Generated (4-5 days)
    ├─→ NSE Pipeline:   UCC Submit → PAN Verify → Approved → Trading Active (same day)
    ├─→ BSE Pipeline:   UCC Submit → 3-Param PAN Verify → Approved → Segments Live (same day)
    ├─→ MCX Pipeline:   UCC Submit → Income Verify → Approved (next working day, if commodity)
    ├─→ CDSL Pipeline:  BO File → KYC Check → Bank Valid → Active (1-2 hrs API)
    ├─→ NSDL Pipeline:  UDiFF Submit → CDS Process → DPM Update → PAN Flag → Active (~15 days)
    └─→ Income Pipeline: Perfios/AA verify → Confirmed (1-2 hrs, if F&O)

FINAL GATE: KRA Registered + BO Active + UCC Approved → ACTIVE (can trade)
TOTAL: Client active in 24-72 hours
```

</section>

<section id="flow-summary">
## <span class="section-num">2</span> Flow Summary

```
USER JOURNEY (8 screens, ~5 minutes)

Screen 1: Enter Aadhaar + PAN (2 fields)
    |--> ASYNC: PAN Verify, KRA Lookup, CKYC Search, AML Screen

Screen 2: DigiLocker Consent (redirect, 0 fields)
    |--> Harvests: Name, DOB, Gender, Photo, Address, Father's Name, PAN

Screen 3: Confirm Identity (3 fields: mobile, email, marital status)

Screen 4: Bank Account (3 fields: account no, IFSC, type)
    |--> ASYNC: Penny Drop

Screen 5: Trading Preferences (segment toggles)

Screen 6: Nominations (add nominee or opt-out)

Screen 7: Declarations (checkboxes) + BLOCKING GATE

Screen 8: Review + Face Match + Aadhaar OTP e-Sign

--- USER DONE (~5 minutes) ---

BATCH ZONE (async, 24-72 hours):
    KRA Submit, CKYC Upload, Admin Review, Exchange UCC,
    CDSL BO Account, Segment Activation, Welcome Kit
```

</section>

<section id="design-principles">
## <span class="section-num">1</span> Design Principles

| # | Principle | Implementation |
|---|---|---|
| 1 | **DigiLocker-first** | Force Aadhaar + PAN fetch via DigiLocker consent. Harvests ~25 identity fields with zero typing. |
| 2 | **Aadhaar-number login only** | No phone/email login for DigiLocker. Aadhaar number ensures the strongest identity anchor. |
| 3 | **Pre-fill everything** | DigiLocker + KRA + CKYC cover ~90 identity/financial fields. User only confirms. |
| 4 | **Async verification** | PAN verify, KRA lookup, CKYC search, AML screening fire in parallel while user is on DigiLocker. |
| 5 | **Minimal user typing** | ~12 fields: Aadhaar, PAN, mobile, email, marital status, bank a/c, IFSC, a/c type + toggles. |
| 6 | **e-Sign everything** | Single Aadhaar OTP e-Sign on the complete application. No physical signatures. |
| 7 | **Batch submission** | KRA, CKYC, UCC, BO account submitted async after e-Sign. User never waits. |
| 8 | **IPV exemption** | Aadhaar eKYC (DigiLocker) exempts IPV/VIPV per SEBI circular. Saves one step. |
| 9 | **Progressive disclosure** | Only show fields relevant to choices (F&O income proof, FATCA, PEP). |
| 10 | **Fail fast, fail gracefully** | If blocking check fails, stop user before e-Sign. Don't waste their time. |

</section>

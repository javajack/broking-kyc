<section id="setu-deep-dive">
## <span class="section-num">4</span> Setu Product Portfolio &mdash; Deep Dive

::: {.info-box .purple}
**Why Setu matters:** Acquired by Pine Labs for $70-75M (2022). Revenue nearly doubled to INR 35.2 crore in FY24. Setu can potentially consolidate Aadhaar + PAN + bank verification + DigiLocker + eSign into a single vendor, reducing integration overhead. Key gaps: no CKYC, no Video KYC, no face match/liveness, no OCR.
:::

### Product-by-Product Breakdown

| Product | What It Does | API Pattern | Unique Feature | Pricing |
|---|---|---|---|---|
| **eKYC Setu (via NPCI)** | Aadhaar e-KYC without AUA/KUA license. Routes through NPCI. Returns masked Aadhaar + demographics. | `POST /api/verify/` | No licensing burden. Legal basis: Gazette S.O.5684(E). Smart routing across supply partners. | Contact |
| **OKYC (Offline Aadhaar)** | OTP-based Aadhaar verification. Fetches XML with name, gender, DOB, address. | `POST /api/verify/` | **Aadhaar Redundancy API**: auto-failover between 2 supply partners. Unique to Setu. | Contact |
| **DigiLocker Gateway** | Fetch 70+ document types. OAuth consent flow. Scope codes: ADHAR, PANCR, DRVLC. | OAuth + REST | Combined with OKYC for redundancy + higher success rates. | Contact |
| **PAN Verification** | Direct NSDL connection. Returns name, category, Aadhaar seeding status. | `POST /api/verify/pan` | Consent + reason params for audit. Returns `aadhaar_seeding_status`. | Rs.3/txn |
| **Reverse Penny Drop** | Customer pays Rs.1 via UPI. Setu extracts account, name, IFSC. Rs.1 refunded in 48h. | `POST /api/verify/ban/reverse` | Industry pioneer. Data cannot be spoofed. Webhook with 5 exponential retries. Kissht: 5x conversion. | Contact |
| **Penny Drop (IMPS)** | Deposits Rs.1 via IMPS. Sync + async modes. | REST + Webhook | Truncated account holder name in response. | Contact |
| **PennyLess** | Zero-balance account verification. No funds deposited. | REST + Webhook | Combined endpoint with Penny Drop. | Contact |
| **eSign** | Aadhaar OTP-based e-signatures. Up to 25 signers/doc. | Upload &rarr; Create &rarr; Download | eStamp on-the-fly (state-specific stamp duty). Name match feature. ET Money: 30% conversion surge. | Contact |
| **Account Aggregator** | India's first AA gateway. Consent-based financial data sharing. 5M daily requests. | `POST /Consent` &rarr; `POST /FI/request` | Market leader. Multi-consent: merge requests into single flow. Pre-built themeable consent screens. | Rs.5-25/fetch |

### Setu vs Current Stack Comparison

| Capability | Current Vendor | Setu Alternative | Setu Advantage | Setu Limitation |
|---|---|---|---|---|
| Aadhaar eKYC | Digio / Decentro | eKYC Setu (NPCI) | No AUA/KUA license needed | Newer product, less battle-tested |
| DigiLocker | Digio | DigiLocker Gateway | Unified platform | Digio has deeper KYC orchestration |
| PAN Verify | Decentro | PAN API | Same quality, unified billing | Comparable feature set |
| Bank Verify | Decentro | Reverse Penny Drop | Pioneer, most mature, spoof-proof | Others now offer similar |
| eSign | Digio | eSign + eStamp | Integrated eStamp | Digio has deeper doc workflow (DigiDocs) |
| CKYC | Decentro / TrackWizz | &mdash; | &mdash; | <span style="color:var(--red);font-weight:600;">Not offered by Setu</span> |
| Video KYC | HyperVerge | &mdash; | &mdash; | <span style="color:var(--red);font-weight:600;">Not offered</span> |
| Face Match / Liveness | HyperVerge | &mdash; | &mdash; | <span style="color:var(--red);font-weight:600;">Not offered</span> |
| OCR | HyperVerge | &mdash; | &mdash; | <span style="color:var(--red);font-weight:600;">Not offered</span> |
| Income (AA) | Perfios | Account Aggregator | Market leader, highest volumes | More relevant for lending than basic KYC |

::: {.info-box .blue}
**Decision Point:** Setu can consolidate 5 vendors into 1 for identity+bank+eSign. But you still need HyperVerge (face/video/OCR), TrackWizz (CKYC/AML), and Digio (KRA). Net reduction: 2-3 fewer vendor contracts, simpler billing, one SDK for core identity flow.
:::

</section>

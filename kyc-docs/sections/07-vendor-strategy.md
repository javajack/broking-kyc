<section id="vendor-strategy">
## <span class="section-num">7</span> Strategic Vendor Evaluation Matrix

### Vendors Worth Serious Evaluation (Beyond Current Stack)

| Vendor | Why Consider | Primary Use Case | Integration Effort |
|---|---|---|---|
| **Setu** | Unified KYC APIs + eKYC Setu + reverse penny drop + AA market leader | Could replace parts of Decentro for identity APIs and add AA capability | 1-2 weeks (API-first) |
| **Bureau.id** | Device intelligence and fraud prevention &mdash; layer no one else provides | Fraud overlay during onboarding: catches multi-accounting, synthetic identities, device spoofing | 1 week (SDK) |
| **Signzy** | All-in-one with no-code platform; Gartner-recognized | Vendor consolidation priority; strongest low-bandwidth Video KYC (75 kbps for Tier 3/4) | 2-3 weeks |
| **Karza/Perfios** | Deep analytics layer (GST, ITR, bank statement analysis) | Income/suitability verification for margin trading and F&O. 4000+ bank statement formats. | 2 weeks |
| **Tartan** | Deepest payroll/income verification in India | Real-time HRMS income data for eligibility. 30+ HRMS integrations. Relevant if F&O/margin products offered. | 1-2 weeks |

### Vendors Likely Not Needed (Covered by Current Stack)

| Vendor | What They Offer | Why Skip |
|---|---|---|
| Gridlines (OnGrid sister) | 100+ identity APIs, face match, UPI reverse penny drop | Covered by Decentro + Setu. No unique advantage for broking KYC. |
| Veri5 Digital | Aadhaar eKYC, Video KYC, face match (99.84%), Aadhaar Data Vault | Covered by Setu (Aadhaar) + HyperVerge (face/video). Niche: SMS KYC for feature phones. |
| OnGrid | 150+ APIs, background verification, eLockr platform | BGV-focused. Customer KYC needs met by other vendors. Useful only for employee BGV. |
| AuthBridge | Digital KYC, Video KYC, AML, LOS/LMS integrations | Enterprise-heavy, legacy LOS focus. Current stack is more modern and API-first. |
| IDfy | OCR + face match + NameMatch + background verification, SOC 2 Type II | Covered by HyperVerge for OCR/face match. BGV not a core need for customer KYC. |
| Razorpay (BAV only) | Penny drop, UPI/VPA validation, composite API | Bank verification covered by Setu/Decentro. Only relevant if already on RazorpayX. |
| Cashfree (BAV only) | Penny drop, reverse penny drop, 126+ co-op banks | Bank verification covered. Niche: widest co-operative bank coverage. |

### Recommended Final Stack

| Layer | Recommended | Role | Alternate |
|---|---|---|---|
| Identity + DigiLocker | **Digio** or **Setu** | DigiLocker, Aadhaar eKYC, KRA | Decentro |
| PAN + Bank + eSign | **Setu** (unified) or **Decentro** + **Digio** | PAN verify, penny drop, eSign | Split across vendors |
| Face Match + Video + OCR | **HyperVerge** | Liveness, face match, OCR, VIPV fallback | Signzy (low bandwidth), IDfy |
| CKYC + AML | **TrackWizz** | CKYC search/upload, AML/PEP screening | Decentro (CKYC) + ComplyAdvantage (AML) |
| Income Verification | **Perfios** (ITR) + **Setu AA** (bank statement) | F&O activation, margin eligibility | Karza, Tartan (payroll) |
| Fraud Prevention | **Bureau.id** | Device intelligence, anti-fraud overlay | Signzy (embedded) |
| Back-Office | **63 Moons ODIN** | Multi-exchange trading + RMS | Symphony XTS, OmneNEST |
| Communications | **Kaleyra** + **AWS SES** | SMS (DLT), email, WhatsApp | MSG91, SendGrid |

</section>

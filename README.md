# KYC Onboarding Specification

> **Disclaimer:** This entire project — including all documentation, architecture decisions, vendor analysis, and code — was generated using [Claude Code](https://docs.anthropic.com/en/docs/claude-code), an AI-powered coding agent by Anthropic. AI models can and do hallucinate. Any information presented here may be inaccurate, incomplete, or outdated. Any resemblance to or overlap with the products, documentation, or intellectual property of any specific vendor, organization, or individual is **purely coincidental and unintended**. This project is **not directly inspired by any particular product, vendor, or proprietary system**, and no plagiarism is intended. All content is based on publicly available information, regulatory circulars, and vendor documentation freely accessible on the internet. **This is not legal, financial, or compliance advice.** This project was primarily undertaken to estimate Claude Code's research and solution-design capabilities.

---

A comprehensive technical specification for individual customer KYC (Know Your Customer) onboarding in an Indian stock broking firm. Covers the full journey from mobile OTP to first trade in 24-72 hours.

**Live site:** [https://javajack.github.io/broking-kyc/](https://javajack.github.io/broking-kyc/)

## What's Inside

- **9-screen mobile-first user journey** — mobile OTP, PAN, DigiLocker, identity confirmation, bank verification, trading preferences, nominations, declarations, and eSign
- **~454 fields** across 30 sections, with ~90% prefilled via DigiLocker, KRA, and CKYC
- **25+ vendor integrations** — Decentro, Digio, HyperVerge, Leegality, TrackWizz, Setu, and more
- **8 parallel batch pipelines** — KRA, CKYC, NSE, BSE, MCX, CDSL, NSDL, and Income
- **Maker-checker admin workflow** with status machine and error handling
- **Full SEBI/KRA/CKYC regulatory compliance** mapping with circular references
- **Exchange & depository integration** specs for NSE, BSE, MCX, CDSL, and NSDL
- **Cost analysis, code tables, and architecture diagrams**

## Tech Stack

The documentation site is built with:

- [Astro](https://astro.build/) v5 + [Starlight](https://starlight.astro.build/) — static site generator for docs
- [Pagefind](https://pagefind.app/) — client-side search
- GitHub Pages — hosting
- GitHub Actions — CI/CD

## Project Structure

```
broking/
├── kyc-docs-site/          # Astro Starlight documentation site
│   ├── src/
│   │   ├── content/docs/   # All documentation pages (56 markdown/mdx files)
│   │   ├── components/     # Custom Astro components
│   │   └── styles/         # Custom CSS
│   ├── public/             # Static assets (diagrams, images)
│   ├── dev.sh              # Start local dev server
│   ├── prod.sh             # Build and preview production
│   └── stop.sh             # Stop running servers
├── .github/workflows/      # GitHub Pages deployment
├── LICENSE                 # MIT
└── README.md               # This file
```

## Local Development

```bash
cd kyc-docs-site

# Install dependencies
npm install

# Start dev server (hot reload)
./dev.sh            # runs on http://localhost:4321/broking-kyc

# Or production preview
./prod.sh           # builds then serves on http://localhost:4322/broking-kyc

# Stop servers
./stop.sh           # stops all, or ./stop.sh dev / ./stop.sh prod
```

## Key Regulatory References

**884 circulars** tracked across 13 issuer groupings — SEBI (MIRSD + MRD + IMD + OIAE + LAD-NRO + CFD), RBI, NPCI, CERSAI, MeitY/CCA, FIU-IND, CDSL, NSDL, NSE, BSE, MCX, and clearing corps (NSCCL / ICCL / MCXCCL) — over the 2020-01-01 → 2026-05-14 window. Coverage spans regulatory norms AND operational/file-format circulars (BOD/EOD specs, settlement files, margin frameworks). Here are the most critical ones:

| Regulation | Reference |
|---|---|
| SEBI KYC Master Circular | SEBI/HO/MIRSD/MIRSD-SEC-2/P/CIR/2023/168 (Oct 2023) |
| KYC Process & Technology (Online KYC, VIPV) | SEBI/HO/MIRSD/DOP/CIR/P/2020/73 (Apr 2020) |
| KYC Simplification at KRAs | SEBI/HO/MIRSD/FATF/P/CIR/2023/0144 (Aug 2023) |
| PAN-Aadhaar Linking Relaxation | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/41 (May 2024) |
| Dual KRA + CKYC Upload | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/79 (Jun 2024) — mandatory since Aug 2024 |
| FATCA/CRS Centralization at KRAs | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 (Feb 2024) — mandatory since Jul 2024 |
| AML/CFT Guidelines | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/78 (Jun 2024) |
| DDPI replacing POA | SEBI/HO/MIRSD/DoP/P/CIR/2022/44 (Apr 2022) — mandatory since Nov 2022 |
| Nomination Revamp (up to 10 nominees) | SEBI circular (Jan 10, 2025) — video verification for opt-out |
| DigiLocker for Demat Holdings | SEBI/HO/OIAE/OIAE_IAD-3/P/CIR/2025/32 (Mar 2025) |
| SEBI Stock Brokers Master Circular | SEBI/HO/MIRSD/MIRSD-PoD/P/CIR/2025/90 (Jun 2025) |
| SEBI Stock Brokers Regulations 2026 | SEBI/LAD-NRO/GN/2026/291 (Jan 7, 2026) — replaces 1992 regulations |
| Client Fund Upstreaming | SEBI/HO/MIRSD/MIRSD-PoD-1/P/CIR/2023/84 (Jun 2023) |
| UPI Block Mechanism (QSBs) | SEBI consultation paper (Aug 2024) — mandatory from Feb 1, 2025 |
| T+0 Settlement | SEBI/HO/MRD/MRD-PoD-3/P/CIR/2024/20 (Mar 2024) — top 500 stocks Dec 2024 |
| e-KYC Setu (NPCI) | SEBI press release (Jun 2025) — Aadhaar e-KYC without AUA/KUA license |
| UPI AutoPay Rs 1 Lakh Limit | RBI/2023-2024/88 + NPCI/UPI/OC-151A (Dec 2023) |
| Account Aggregator Master Direction | RBI/DNBR/2016-17/46 (Sep 2016, updated Sep 2024) |
| DPDP Act 2023 + Rules 2025 | Notified Nov 13, 2025 — full compliance deadline May 2027 |
| KYC Onboarding Consultation Paper | SEBI (Jan 16, 2026) — proposes centralized KYC, 5-year review cycle |

See the [Regulatory Circulars master index](https://javajack.github.io/broking-kyc/reference/regulatory-circulars/) (curated highlights + per-issuer navigation), the [per-issuer sub-pages](https://javajack.github.io/broking-kyc/reference/circulars/sebi-mirsd/) (884 verified entries with primary URLs, in-force dates, supersession chains, and impact-area tags), the [circulars changelog](https://javajack.github.io/broking-kyc/reference/circulars-changelog/) (delta against the prior 37-entry list), and the [References & Sources](https://javajack.github.io/broking-kyc/reference/references-sources/) (130+ URLs) page for complete listings.

## Compliance & Vendor Coverage

- **[Compliance Blueprint](https://javajack.github.io/broking-kyc/operations/compliance-blueprint/)** — inventory of 400 verifiable operational, one-time, and edge-case compliance touchpoints a broker must address. Each row: regulator, frequency, owner role, trigger, evidence artefact, penalty, and linked circular(s). Domains: KYC lifecycle, AML/PMLA, margin, client funds, settlement, surveillance, cyber, BCP/DR, audit, reporting, grievance, DPDP, member compliance, investor servicing, exchange/depository registration, edge cases.
- **[Vendor Atlas](https://javajack.github.io/broking-kyc/vendors/atlas/)** — named-product enumeration of 233 real products across 22 categories spanning the full broking technology stack: OMS/EMS/RMS, back-office, surveillance, AML, KYC verification, face/liveness, OCR, CKYC connectors, eSign, account aggregator, payment/mandate, DLT/SMS/WhatsApp, email, ITR/income, credit bureau, mutual fund platforms, IPO/OFS, pledge tech, algo/quant API, market data, CRM/comms. Endorsement-free; descriptive positioning only.
- **[Field-level Data Flow Atlas](https://javajack.github.io/broking-kyc/reference/field-atlas/)** — bidirectional mapping of 1,314 field-destination relationships across 14 destinations (KRA, CKYC, NSE/BSE/MCX UCC, CDSL/NSDL BO, back-office, RMS, contract notes, regulatory reports, DLT comms, FATCA/CRS, AML/FIU). Browse by section (field-first) or destination (system-first); downloadable [master CSV](https://javajack.github.io/broking-kyc/field-atlas-master.csv) (~1,300 rows × 11 columns).
- **[Integration Choreography DAG](https://javajack.github.io/broking-kyc/operations/integration-dag/)** — dependency graph of 163 integration nodes across six phases (Onboarding, BOD, Trading Hours, EOD & Settlement, Recurring Cycles, Lifecycle Events). ASCII DAGs + per-node detail (idempotency, retry policy, rollback, SLA, failure surface, spec source).
- **[Lifecycle (post-onboarding)](https://javajack.github.io/broking-kyc/lifecycle/)** — operator-walkthrough deep-dives for six post-onboarding scenarios: re-KYC, modifications, dormancy & reactivation, voluntary closure, transmission, NRI conversion. Step-by-step with field-level callouts, sub-cases, and cross-links to blueprint / DAG / circulars.

## Author

**[Rakesh Waghela](https://www.linkedin.com/in/rakeshwaghela)** — Technology & Product Consultant

Available for consulting and collaboration on technology strategy, product architecture, and system design. Reach out via LinkedIn for inquiries.

- [LinkedIn](https://www.linkedin.com/in/rakeshwaghela)
- [X / Twitter](https://x.com/webiyo)
- [Book a Session](https://topmate.io/rakeshwaghela)

## License

[MIT](LICENSE)

---

*Built entirely with [Claude Code](https://docs.anthropic.com/en/docs/claude-code) by Anthropic.*

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

| Regulation | Reference |
|---|---|
| SEBI KYC Master Circular | SEBI/HO/MIRSD/MIRSD-SEC-2/P/CIR/2023/168 (Oct 2023) |
| SEBI Stock Brokers Master | SEBI/HO/MIRSD/MIRSD-PoD/P/CIR/2025/90 (Jun 2025) |
| SEBI Stock Brokers Regulations 2026 | Notified Jan 7, 2026 |
| Dual KRA + CKYC Upload | Mandatory since Aug 2024 |
| DDPI (replaces POA) | Since Nov 2022 |
| Up to 10 Nominees | Since Jan 2025 |

See the full [Regulatory Circulars](https://javajack.github.io/broking-kyc/reference/regulatory-circulars/) and [References & Sources](https://javajack.github.io/broking-kyc/reference/references-sources/) pages for complete listings.

## Author

**Rakesh Waghela** — Tech & KYC Solutions Architect

- [LinkedIn](https://www.linkedin.com/in/rakeshwaghela)
- [X / Twitter](https://x.com/webiyo)
- [Book a Consultation](https://topmate.io/rakeshwaghela)

## License

[MIT](LICENSE)

---

*Built entirely with [Claude Code](https://docs.anthropic.com/en/docs/claude-code) by Anthropic.*

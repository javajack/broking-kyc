# 🏦 Broking KYC — Complete Onboarding Specification

> 📋 Production-grade KYC specification for individual customer onboarding in an **Indian stock broking firm** — SEBI/KRA/CKYC compliant, DigiLocker-first, vendor-evaluated.

---

## 🎯 What Is This?

This repo is a **comprehensive reference specification** for building a KYC (Know Your Customer) onboarding system. It covers everything from the first screen a customer sees to the final exchange registration — with field-level detail, vendor comparisons, and regulatory references.

**This is not code.** It's the blueprint you'd hand to an engineering team before writing line one.

---

## 📊 At a Glance

| | |
|---|---|
| 🖥️ **User Screens** | 8 screens, ~5 minutes end-to-end |
| ⌨️ **User Types** | ~12 fields only — everything else is auto-sourced |
| 📦 **Total Fields** | ~454 across 30 dataset sections |
| 🤖 **Pre-filled** | 97% via DigiLocker + KRA + CKYC |
| 🏢 **Vendors Evaluated** | 25+ across 14 integration categories |
| ⏱️ **Activation Time** | 24–72 hours (account ready to trade) |

---

## 📁 Repository Structure

```
broking-kyc/
├── 📄 kyc.html                    ← Single-page HTML reference (open in browser)
├── 📝 KYC_MASTER_DATASET.md       ← ~454 fields across 30 sections (v1.1)
├── 🔌 VENDOR_INTEGRATIONS.md      ← 25+ vendor specs, APIs, comparisons
├── 🗺️ kyc-flow.md                 ← 8-screen user journey + async pipeline
├── 📜 LICENSE
│
├── 🏗️ kyc-docs/                   ← Pandoc build pipeline (source of kyc.html)
│   ├── build.sh                   ← One-command rebuild: ./build.sh
│   ├── template.html              ← CSS + sidebar + hero + JS shell
│   ├── metadata.yaml              ← Version, date, stats
│   ├── strip-heading-ids.lua      ← Pandoc Lua filter
│   └── sections/                  ← 24 Markdown content files
│       ├── 01-design-principles.md
│       ├── 02-flow-summary.md
│       ├── 03-screens.md          ← Screen cards + vendor tables
│       ├── ...
│       └── 24-diagrams.md
│
└── 📐 diagrams/                   ← Architecture SVGs
    ├── 01-onboarding-flow.svg
    ├── 02-data-source-mapping.svg
    └── 03-async-batch-processing.svg
```

---

## 🌟 Key Features

### 🔐 Regulatory Compliance
- ✅ SEBI KYC Master Circular (Oct 2023) compliant
- ✅ SEBI Stock Brokers Regulations 2026 ready
- ✅ Dual upload: **KRA + CKYC** (mandatory since Aug 2024)
- ✅ DDPI (replaces POA since Nov 2022)
- ✅ Up to 10 nominees (SEBI Jan 2025)
- ✅ FATCA/CRS upload to KRA (mandatory since Jul 2024)
- ✅ UPI Block Mechanism (mandatory for QSBs since Feb 2025)

### 📱 8-Screen User Journey
| # | Screen | What Happens |
|---|---|---|
| 1️⃣ | Aadhaar + PAN Entry | Identity anchors → triggers 4 parallel API calls |
| 2️⃣ | DigiLocker Consent | Fetches ~25 identity fields with zero typing |
| 3️⃣ | Confirm Identity | Pre-filled from KRA/CKYC — user just reviews |
| 4️⃣ | Bank Account | Penny drop verification + IFSC lookup |
| 5️⃣ | Trading Preferences | Segments, income, experience |
| 6️⃣ | Nominations | Up to 10 nominees or video opt-out |
| 7️⃣ | Declarations + Gate | FATCA, PEP, risk disclosures — **blocking gate** |
| 8️⃣ | Review + e-Sign | Final review → Aadhaar e-Sign → done |

### 🔌 14 Vendor Integration Categories
Each category includes **multi-vendor comparison tables** with cost, features, and integration effort:

| Category | 🏆 Recommended | Vendors Compared |
|---|---|---|
| PAN Verification | Decentro | 6 vendors |
| Aadhaar / DigiLocker | Digio | 5 vendors |
| Bank Verification | Decentro | 5 vendors |
| KRA Integration | Digio | 3 vendors |
| CKYC Integration | Decentro | 4 vendors |
| e-Sign | Digio | 4 vendors |
| Video KYC / VIPV | HyperVerge | 4 vendors |
| OCR / Doc Verify | HyperVerge | 4 vendors |
| Face Match / Liveness | HyperVerge | 4 vendors |
| AML / PEP Screening | TrackWizz | 4 vendors |
| Income / ITR | Perfios | 4 vendors |
| Account Aggregator | Setu AA | 4 vendors |
| Communications | Gupshup | 2 vendors |
| Back Office / RMS | 63 Moons (ODIN) | 2 vendors |

### 🏛️ Exchange & Depository Specs
- 📈 **NSE** — UCC registration via UCI Online + REST API + batch
- 📊 **BSE** — BOLT Plus, 3-param PAN verification
- 🛢️ **MCX** — MCX CONNECT, income proof mandatory for commodity
- 🏦 **CDSL** — CDAS, 16-digit BO ID, DDPI online (24h)
- 🏦 **NSDL** — DPM, UDiFF format (ISO-tagged), SPEED-e/IDeAS

### 📐 3 Architecture Diagrams
1. **Complete Onboarding Flow** — 8 screens + async operations + batch pipeline
2. **Data Source Mapping** — where each of the ~454 fields comes from
3. **Async Batch Processing** — KRA/CKYC/Exchange submission pipeline

---

## 🚀 Quick Start

### View the spec
Just open **`kyc.html`** in any browser — it's a self-contained single-page document with sidebar navigation, search-friendly sections, and styled tables.

### Rebuild after editing
```bash
# Requires pandoc (apt install pandoc)
cd kyc-docs
./build.sh
# → outputs kyc.html in the parent directory
```

---

## 🧩 Who Is This For?

| Role | What You'll Use |
|---|---|
| 🏗️ **Product Manager** | `kyc.html` — full spec with screen flows and field details |
| 👨‍💻 **Backend Engineer** | `VENDOR_INTEGRATIONS.md` — API specs, auth flows, error codes |
| 🎨 **Frontend Engineer** | Screen-by-screen cards in `kyc.html` §3 — fields, validations, UX |
| 📋 **Compliance Officer** | Regulatory section (§19) — 15 SEBI/RBI circulars mapped |
| 💰 **CTO / Architect** | Cost analysis (§20), vendor matrix (§7), batch pipeline (§10) |

---

## 📚 Sections in the Spec

| # | Section | Description |
|---|---|---|
| 1 | 🎯 Design Principles | 10 guiding principles (DigiLocker-first, async, etc.) |
| 2 | 🗺️ Flow Summary | 8-screen journey at a glance |
| 3 | 🖥️ Screen Specification | Field-level detail for each screen + vendor tables |
| 4 | 🔗 Setu Deep Dive | Setu platform analysis (Pine Labs acquisition, APIs) |
| 5 | 🏦 Account Aggregator | RBI AA framework — operators, FIPs, consent flow |
| 6 | 💳 Payment Mandates | UPI autopay, e-NACH, UPI Block mechanism |
| 7 | 🏆 Vendor Strategy | Strategic evaluation matrix + recommended stack |
| 8 | 📊 Data Sources | Where each field comes from (priority order) |
| 9 | 📋 Field Summary | ~454 fields across 30 dataset sections |
| 10 | ⚙️ Batch Pipeline | KRA/CKYC/Exchange async submission pipeline |
| 11 | 🏛️ Exchange & Depository | NSE/BSE/MCX/CDSL/NSDL specs |
| 12 | 🔗 Six-Attribute Match | KYC attribute reconciliation across systems |
| 13 | 🔍 Audit & Compliance | SEBI inspection readiness, CSCRF checklist |
| 14 | 👤 Admin Workflow | KYC Admin panel — review/approve/reject flow |
| 15 | 🚦 Status Machine | Application lifecycle states and transitions |
| 16 | 📬 Communications | Email/SMS/WhatsApp templates and triggers |
| 17 | 🖥️ Back Office | Trading platform and RMS integration |
| 18 | ⚠️ Error Handling | Error codes, retry logic, fallback strategies |
| 19 | 📜 Regulatory | 15 SEBI/RBI circulars with dates and impact |
| 20 | 💰 Cost Analysis | Per-transaction cost breakdown by integration |
| 21 | 🔒 Security | Data protection, encryption, access controls |
| 22 | 📦 Master Dataset | Complete field-level specification (Section A sample) |
| 23 | 📑 Code Tables | Occupation, KRA status, PAN status codes |
| 24 | 📐 Diagrams | 3 architecture SVGs |

---

## ⚖️ License

See [LICENSE](LICENSE) for details.

---

<p align="center">
  Built with 🧠 Claude Code + 📄 Pandoc
</p>

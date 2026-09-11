# Broking Universe Gaps — Design

**Date:** 2026-09-11
**Sub-project:** #11 of the broking-ops expansion
**Status:** Approved in chat (scope + Obsidian workspace); spec written for the record

## Context

Ten sub-projects shipped through 2026-05-15 (191 pages). The circulars sweep window closed on 2026-05-14. A coverage scan of ~140 candidate topics across all pages on 2026-09-11 found two kinds of gaps:

1. **Feature gaps** — client-facing journeys that exist only as short appendix pages (minor, NRI, HUF, partnership/LLP, company, trust, FPI: 560–750 words each) or only as broker-side deep-dives with no activation flow (MTF, IPO/ASBA, SLBM, pledge, DDPI, F&O/commodity segment activation).
2. **Absent topics** — 0–2 pages mention: kill switch, IRRA, SEBI Check, verified UPI handles, physical settlement of stock F&O, exercise/assignment, Oct-2024 F&O measures, odd lot, trade-for-trade, options on goods, interest-rate derivatives, GTT/bracket/cover/basket orders, employee & proprietary trading policy, corporate-actions handling (bonus/split/demerger/rights/delisting/buyback/tender/IEPF), rematerialisation, family mapping, 3-in-1 accounts, RBI Retail Direct / G-Sec via broker, brokerage plan models, tax P&L, SFT.

Plus a **regulatory delta**: circulars 2026-05-15 → 2026-09-11 across the 13 issuer groups, including follow-ups on the Jan-2026 KYC-centralisation consultation and the Stock Brokers Regulations 2026.

## Goal

Ship four new top-level sections (~43 pages + 4 landings), refresh the circulars index for the May–Sep 2026 window, and wire everything into the existing navigation layers (sidebar, personas, blueprint, glossary, README).

## Output

### Section A — Account Variants (`account-variants/`, 12 pages)

Full screen-by-screen onboarding journeys at the same field-level depth as `journey/`. Each page: eligibility → documents → screens (delta vs resident-individual journey) → KRA/CKYC/UCC/BO field deltas → activation → practical notes.

- `index.md` — variant selector; what differs from the resident-individual journey and why.
- `minor.mdx` — natural/court guardian, guardian PAN/KYC, demat + MF only (no F&O/intraday), attaining majority conversion, guardian change.
- `nri.mdx` — NRE/NRO, PIS vs non-PIS route, designated bank, FEMA/RBI limits, OCI/PIO, repatriability, custodian/CP-code for F&O, tax residency, in-person verification abroad.
- `huf.mdx` — Karta, coparcener declaration, HUF PAN + deed, succession of Karta.
- `partnership-llp.mdx` — deed/LLPIN, authorised signatories, partner KYC, UBO.
- `company.mdx` — board resolution, MOA/AOA, authorised signatories, UBO/SBO, LEI thresholds, CIN.
- `trust-society-aop.mdx` — registration, trustees/office bearers, UBO for trusts.
- `fpi-fvci.mdx` — FPI categories, DDP, custodian, CP code, CAF, SEBI FPI Regs 2019 amendments.
- `joint-accounts.mdx` — joint demat holders, single trading account, mode of operation, either/survivor.
- `bsda.mdx` — Basic Services Demat Account eligibility thresholds, charges, auto-conversion.
- `bank-broker-3in1.mdx` — bank-led 3-in-1 and bank-referral models, fund flow differences.
- `institutional-custodial.mdx` — PMS/AIF/MF/insurance clients via custodian, give-up/take-up, family mapping, sole proprietor.

### Section B — Product Activation (`product-activation/`, 13 pages)

Client-facing activation flows (consent, disclosures, screens, back-office toggles) for products the site already covers from the broker side.

- `index.md`
- `fno-activation.mdx` — income proof options, RDD, Oct-2024 F&O measures at client level, segment addition at UCC.
- `commodity-activation.mdx` — MCX/NCDEX, options on goods, physical-delivery declarations.
- `currency-ird-activation.mdx` — currency derivatives, interest-rate derivatives, hedger declarations.
- `mtf-activation.mdx` — MTF consent, interest sheet, pledge acceptance UX, square-off disclosures.
- `ipo-asba-upi.mdx` — UPI vs bank-ASBA vs 3-in-1, mandate acceptance, SME lot rules, cut-offs, allotment, refunds.
- `slbm-enrolment.mdx` — lender/borrower enrolment, contract terms, margins.
- `margin-pledge.mdx` — pledge/unpledge/repledge client UX, depository OTP, haircut display.
- `ddpi-edis-tpin.mdx` — DDPI vs eDIS/TPIN choice, activation, revocation.
- `api-algo-access.mdx` — API keys, static IP, retail algo tagging, order limits.
- `gift-ifsc.mdx` — routing via IFSC subsidiary, LRS, products.
- `bonds-gsec-nps.mdx` — RFQ bonds, NSE goBID/BSE Direct, RBI Retail Direct, SGB secondary, NPS via broker.
- `advanced-order-types.mdx` — GTT, bracket/cover, basket, AMO, disclosed quantity, iceberg, odd lot.

### Section C — Funds & Tax (`funds-tax/`, 9 pages)

- `index.md`
- `payin-rails.mdx` — UPI, PG net-banking, NEFT/RTGS/IMPS, UPI block for secondary, third-party fund prohibition, bank verification.
- `payout-running-account.mdx` — quarterly/monthly settlement, retention rules, pay-out SLAs.
- `delayed-payment-charges.mdx` — DPC/interest, disclosure, caps, T+1 debit mechanics.
- `brokerage-and-charges.mdx` — brokerage caps, plan models, exchange transaction charges (uniform post Oct 2024), SEBI fee, GST, STT, stamp duty, DP charges, tariff sheet.
- `ledger-and-statements.mdx` — client-facing ledger, bills, funds/holding statements, CAS.
- `tax-reporting.mdx` — tax P&L, capital gains (FIFO, grandfathering), F&O business income, NRI TDS, SFT/AIS touchpoints.
- `corporate-actions.mdx` — dividend, bonus, split, demerger, rights entitlement trading, buyback/tender via exchange, delisting, IEPF, F&O adjustments.
- `demat-servicing.mdx` — demat of physical, rematerialisation, off-market, gift, freeze/unfreeze, account closure interplay.

### Section D — Trading Risk & Derivatives (`trading-risk/`, 9 pages)

- `index.md`
- `exercise-assignment-physical.mdx` — exercise/assignment, physical settlement of stock F&O, margins in expiry week.
- `expiry-day-operations.mdx` — weekly-expiry rationalisation, intraday position monitoring, upfront premium, calendar-spread removal.
- `position-limits-oi.mdx` — MWPL, ban period, client-level limits, delta-based index OI limits.
- `collateral-cross-margin.mdx` — 50:50 cash equivalent, eligible collateral, haircuts, hedge benefit, cross-margin.
- `margin-shortfall-peak-margin.mdx` — penalty slabs, reporting, peak-margin snapshots.
- `order-risk-controls.mdx` — kill switch, IRRA, price bands, dynamic circuits, OTR, fat-finger, self-trade prevention.
- `prop-employee-trading-pit.mdx` — proprietary trading disclosure, employee trading policy, PIT/SDD obligations for brokers.
- `client-protection-frameworks.mdx` — 2FA, SIM/device binding, SEBI Check, verified UPI handles, MITC, voluntary freeze.

### Regulatory delta

- Research window 2026-05-15 → 2026-09-11, all 13 issuer groups, same schema as `working/SCHEMA.md`.
- Output to `working/circulars-delta-2026-09/`; consolidation extended to read both directories.
- Regenerate per-issuer pages, master index, and append a dated section to `reference/circulars-changelog.md`.

### Wiring

- Sidebar: four new groups after Deep Dives.
- Personas: add the relevant new pages to each reading path.
- Compliance blueprint: append rows for new obligations surfaced by the delta.
- Glossary: new terms; rerun `wrap_abbreviations.py`.
- README + homepage: new section blurbs.
- `validate_links.py` clean; Astro build clean.

## Workflow

Codex (gpt-5.5) does research and drafting; Claude orchestrates, reviews verdicts, wires navigation, builds, commits.

1. **Phase 1 (parallel):** 4 circular-delta research tasks + 4 topic-cluster research tasks → notes under `working/gaps-2026-09/`.
2. **Phase 2:** consolidate circulars; 4 drafting tasks (one per section) using exemplar pages + conventions.
3. **Phase 3:** wiring, link validation, build, per-section commits, memory + Obsidian notes.

## Documentation conventions

Project-wide: source traceability, reasoned structure, HL→LL, alternatives surfaced, practical notes, vendor naming without endorsement, field-level baseline. Every page ends with a `Verified through 2026-09-11` stamp.

## Out of scope

- Rewriting existing appendix pages (they get a pointer to the new variant pages).
- Implementation code.
- Per-vendor configuration detail.

## Success criteria

- 4 landings + ~43 pages, each ≥ 1,200 words, ≥ 3 cross-links, ≥ 1 Aside, field tables where a form/file/API exists.
- Circulars index extended with verified May–Sep 2026 entries; changelog updated.
- Build and link validation clean; sidebar, personas, README, glossary updated.
- Memory + Obsidian workspace notes written.

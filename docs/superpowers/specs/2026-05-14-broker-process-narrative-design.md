# Broker Process Narrative — Design

**Date:** 2026-05-14
**Sub-project:** #6 of the broking-ops expansion
**Status:** Design — pending user review

## Context

Three sub-projects have shipped this session:
- #1 Circulars Refresh — 884 entries across 13 issuer groupings.
- #2 Vendor Atlas — 233 named products across 22 categories.
- #7 Compliance Blueprint — 400 verifiable touchpoints across 16 domains.

These are all **breadth-first reference pages**. The site now lacks a complementary **narrative** layer — a continuous story explaining how Indian broking operations actually flow from a freshly-ACTIVE account through trading, settlement, and recurring cycles. The existing `architecture/flow-summary.mdx` covers onboarding through ACTIVE; nothing covers what happens after.

## Goal

A single 8,000–12,000-word narrative page that picks up where `flow-summary.mdx` ends and walks the full client+broker lifecycle: ACTIVE → first trade → trading day mechanics → settlement → daily reporting → weekly/monthly/quarterly/annual cycles → lifecycle events (modifications, dormancy, closure, transmission).

The narrative **synthesizes from the project's accumulated material** (884 circulars + 400 blueprint rows + 233 atlas vendors + existing journey/architecture/operations/vendor docs). No external research agents needed.

## Output

- **File:** `kyc-docs-site/src/content/docs/broker-process/narrative.mdx`
- **Format:** `.mdx` (uses Starlight components — `Aside`, `StatusFlow`, optional `Diagram`)
- **Sidebar:** new top-level group "Broker Process" between User Journey and Vendor Integrations. Initially has one item (this narrative); later sub-projects can add deep-dives to the same group.

## Sections

The page follows the project's documentation conventions (TL;DR → why-this-order → conceptual overview → mechanics → practical notes → verified-through). The six **mechanics** sections, in order:

### 1. From ACTIVE to First Trade (~800–1,200 words)

Continuation of `flow-summary.mdx`. Day 0 evening: account flips ACTIVE; welcome email + DP login + segment limits posted. Day 1 morning: client logs in; segments visible; first order. Pre-trade RMS path (margin lock, segment check, order-type validation), exchange ack, execution, intraday MTM accrual, contract note generation T+24h. Establishes vocabulary the rest of the page reuses.

### 2. A Trading Day — Operator's View (~3,500–5,000 words)

Hour-by-hour from 06:00 IST through past 23:00, organized as five sub-phases. This is the bulk of the page.

- **BOD (06:00–08:30):** download holiday calendar, contract files (CM / F&O / CD), SPAN scanrange, circuit-filter, member files, MTM T-1, prior-day obligation files; RMS overnight margin parameters reload; surveillance start-of-day checks.
- **Pre-open (09:00–09:15):** order matching window, pre-open price discovery, AMO release.
- **Trading hours (09:15–15:30):** continuous trading; **4 peak margin snapshots** at 11:30 / 12:30 / 13:30 / 14:30 with Daily Margin File generation; real-time RMS; surveillance (NORMS, OTR, GSM/ASM); block-deal windows; MWPL checks.
- **Closing window (15:30–15:40):** closing auction, settlement-price discovery.
- **EOD (15:40–19:00):** trade booking; contract note generation (T+24h ECN); MTM end-of-day; position files; obligation files to clearing; peak margin response; member compliance reporting.
- **Settlement & overnight (19:00–06:00):** payin/payout (T+1 default; T+0 beta where applicable); funds upstreaming to clearing corp (SEBI Jun 2023 mandate); bank reconciliation; KRA / CKYC daily upload; ledger update; prep for next BOD.

### 3. The Settlement Cycle (~1,000–1,500 words)

T+1 mechanics, T+0 beta scope (top 25 Mar 2024 → top 500 Dec 2024 expansion), payin/payout obligations, direct-payout-to-demat (SEBI Jun 2024, phased Nov 2024 / Jan–Feb 2025), short-delivery → auction process, give-up / take-up, MTF settlement, MFOS / FDR upstreaming, ASBA-style UPI Block for QSBs (mandatory Feb 1, 2025).

### 4. Daily Reporting Touchpoints (~800–1,200 words)

Daily Margin File (DMF), Client Funding Report (CFR, weekly), UCC daily upload, KRA daily upload, peak margin reports (4 snapshots), surveillance reports, CSCRF logs, technical glitch reports if any. Each named report cross-links to its row in the Compliance Blueprint.

### 5. Recurring Cycles (~1,200–1,800 words)

- **Weekly:** CFR submission, internal reconciliation.
- **Monthly:** Client funding to exchange, GST, TDS deposit, complaint MIS, networth check.
- **Quarterly:** Running-account settlement on calendar quarter-ends, FATCA refresh, BCP drill.
- **Half-yearly:** Compliance certificate to SEBI, internal audit.
- **Annual:** Statutory audit, KRA audit, system audit cycle, fit-and-proper refresh, ITR Form-16A dispatch to clients.

Each cycle cross-links to relevant Compliance Blueprint rows.

### 6. Lifecycle Events (~1,000–1,500 words)

Modifications (address / bank / nominee / segment / mobile / email / name), re-KYC periodicity by risk tier (high 2y / medium 8y / low 10y), dormancy criteria (12-month, 24-month thresholds), reactivation, voluntary closure, transmission (single / joint / nominee paths), deceased handling, NRI ↔ resident conversion. Cross-links to relevant journey screens and Compliance Blueprint edge-case rows.

## Voice and conventions

- Third-person neutral. Matches the rest of the site.
- Phase callouts via `Aside` components ("Why this happens", "Common gotcha", "Industry practice").
- **Liberal cross-linking** — every named compliance touchpoint, vendor category, and circular ID becomes a link to its anchor on the appropriate reference page.
- **Documentation conventions applied throughout** — TL;DR at top (3–5 bullets), why-this-order note (1–2 sentences), conceptual overview paragraph, mechanics (the 6 sections), practical notes section at the bottom (tagged `[gotcha]`, `[industry practice]`, `[cost optimization]`, `[risk trade-off]`), verified-through stamp, AI disclaimer.
- **Vendor-naming policy:** descriptive references to product *categories* (e.g., "the broker's OMS receives the order"), not specific vendor names. Atlas is the one place names live. Exception: regulator-named products like DigiLocker, Setu, KRA agencies, depositories, exchanges, clearing corps — these are not vendor endorsements, they're regulatory entities.

## Out of scope

- How-to instructions for building the systems described — that's #4 (Integration DAG) territory and per-domain deep-dives.
- Vendor selection guidance — that's the Vendor Atlas.
- Regulatory deep-dives — that's the Circulars Index and Blueprint.
- Per-screen onboarding walk-through — already covered in `journey/`.

## Risks

- **Length drift.** 8K–12K is the target; if a section blows past, split into a sub-page rather than ship an unwieldy single doc.
- **Cross-link rot.** Anchors on the blueprint and atlas pages are stable; circular anchors are stable. But if any of those pages are restructured later, the narrative will need a cross-link refresh.
- **Voice inconsistency.** A long narrative drafted in one pass can shift voice across sections. Mitigation: write top-down, re-read each section before moving on.

## Success criteria

- Single `.mdx` page at `broker-process/narrative.mdx`, 8,000–12,000 words.
- Six mechanics sections present, in stated order, each within its target word band.
- ≥ 30 inline cross-links into blueprint / atlas / circulars / journey pages.
- ≥ 5 `Aside` callouts for gotchas / industry practice / cost / risk.
- `Verified through: 2026-05-14` stamp present.
- AI-generated + not-legal-advice disclaimer present.
- Sidebar updated with new top-level "Broker Process" group.
- Astro build clean.

## Workflow

Inline drafting, no agents. Implementation plan (next step via writing-plans) will likely have 4–6 tasks: scaffold the new section directory + landing, draft sections 1–3 in one commit, draft sections 4–6 in a second commit, sidebar update + commit, final build verification.

## Next step

After user approval: invoke writing-plans for the implementation plan.

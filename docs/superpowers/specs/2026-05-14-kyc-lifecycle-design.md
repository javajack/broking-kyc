# KYC Lifecycle (beyond onboarding) — Design

**Date:** 2026-05-14
**Sub-project:** #5 of the broking-ops expansion
**Status:** Design — pending user review

## Context

Six sub-projects have shipped: #1 Circulars Refresh, #2 Vendor Atlas, #3 Field-level Atlas, #4 Integration DAG, #6 Broker Process Narrative, #7 Compliance Blueprint.

Lifecycle events have been *touched* throughout — narrative (#6 Section 6), compliance blueprint (#7 edge-case domain), integration DAG (#4 lifecycle-events page), field atlas. The existing `journey/` pages cover onboarding screen-by-screen. What's missing: **dedicated operator-walkthrough deep-dives** for each post-onboarding lifecycle event — the equivalent of what `journey/` does for onboarding screens, but for re-KYC, modifications, dormancy, closure, transmission, NRI conversion.

## Goal

A 7-page "Lifecycle" section at `kyc-docs-site/src/content/docs/lifecycle/` providing operator-friendly step-by-step walkthroughs for the six main post-onboarding lifecycle scenarios, with explicit field-level coverage, regulatory citations, and cross-links to existing breadth-first reference pages.

## Output

### Pages

- `lifecycle/index.md` — overview + scenario navigation.
- `lifecycle/re-kyc.md` — risk-tier-based re-KYC (high 2y / medium 8y / low 10y), trigger detection, refresh process, KRA + CKYC upload, segment treatment.
- `lifecycle/modifications.md` — all modification flows (address, bank, nominee per SEBI Jan 2025 10-nominee rules, segment add/drop, mobile/email OTP re-verify, name/DOB with BSE Unfreeze + Protean 3-param re-check). Sub-sections per modification type.
- `lifecycle/dormancy-reactivation.md` — 12-month / 24-month dormancy detection, segment auto-disable, MIS reporting, reactivation request, re-KYC trigger if >12m, UCC unfreeze, BO reactivate.
- `lifecycle/closure.md` — voluntary closure 6-step procedure.
- `lifecycle/transmission.md` — single-deceased (nominee path + succession path), joint-deceased (survivor mode + succession), doc requirements, CDSL/NSDL procedural variants.
- `lifecycle/nri-conversion.md` — Resident → NRI and NRI → Resident bidirectional flows.

### Per-page structure

Each per-scenario page:
1. Frontmatter (title + description).
2. "Why this page is structured this way" — 1-sentence layout note.
3. TL;DR (4–6 bullets).
4. Conceptual overview (1–2 paragraphs).
5. Step-by-step walkthrough (numbered steps with trigger / fields / system calls / expected outcome).
6. Sub-cases / branches (explicit edge cases).
7. Field-level callouts cross-linked to Field Atlas.
8. Practical notes section (tagged `[gotcha]` / `[industry practice]` / `[cost optimization]` / `[risk trade-off]`).
9. Cross-references to blueprint, DAG, circulars, atlas vendors, journey.
10. Verified-through stamp + AI disclaimer.

### Sidebar update

New top-level sidebar group **"Lifecycle"** between **User Journey** and **Broker Process**, containing overview + 6 scenario pages.

## Workflow

Inline synthesis from accumulated session context. No research agents. Each scenario page draws from:
- Compliance blueprint KYC-lifecycle (41) and edge-case (30) domains.
- Integration DAG lifecycle-events page (32 nodes).
- Broker-process narrative Section 6.
- Field-atlas sections A, B, C, G, H, I, V, Y, Z.
- Circulars (SEBI MIRSD KYC norms, SEBI Jan 2025 nominee revamp, CDSL/NSDL transmission circulars, FATCA centralization Feb 2024).

## Documentation conventions

Project-wide conventions: source traceability, reasoned structure, HL→LL progression, alternatives surfaced, practical notes section, field-level baseline, vendor-naming neutrality (atlas is the one place names live).

## Risks

- **Overlap with existing pages** (narrative, DAG, blueprint, atlas). Mitigation: lifecycle pages are *operator-walkthrough* shape; the others are *narrative / inventory / dependency / data-flow* shapes. Cross-link explicitly; don't duplicate prose.
- **Length drift** — target ~1,500–2,500 words per scenario page; overview ~600.
- **Edge-case explosion** — focus on the main path with explicit sub-case sub-headings for branches. Don't try to cover every conceivable variant.

## Out of scope

- Implementation code or actual forms.
- Per-vendor variations (vendor differences linked to atlas, not duplicated).
- Non-individual entity lifecycle (HUF / corporate / partnership / trust) — covered in existing `appendix/non-individual-entities.md`.
- Minor/joint specific lifecycle — covered in existing `appendix/minor-joint-accounts.md`. Where these intersect lifecycle events (e.g., minor → age-18 conversion), link from this section.

## Success criteria

- 1 overview + 6 per-scenario pages.
- Each scenario page ≥ 1,200 words.
- Each scenario page ≥ 4 cross-links and ≥ 2 Aside callouts.
- Total ≥ 8,000 words across the 7 pages.
- Sidebar updated with new "Lifecycle" top-level group.
- Astro build clean.
- Memory entry created.

## Workflow summary

1. Commit this spec.
2. Invoke writing-plans for the implementation plan.
3. Execute inline — scaffold + overview, then 6 per-scenario pages, then sidebar + memory.

## Next step

After user approval: invoke writing-plans.

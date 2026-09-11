# Broking Universe Gaps — Implementation Plan

Spec: `docs/superpowers/specs/2026-09-11-broking-universe-gaps-design.md`. Orchestrator: Claude. Workers: Codex gpt-5.5 via `~/.claude/skills/delegating-to-codex/scripts/codex-bg.sh` (detached, JSON verdicts only).

## Phase 1 — Research (parallel, 8 tasks) — launched 2026-09-11 20:37 IST

| Task | Output |
| --- | --- |
| circ-sebi | `working/circulars-delta-2026-09/sebi-mirsd.md`, `sebi-other.md` |
| circ-rbi-npci | `rbi.md`, `npci.md`, `cersai.md`, `meity.md`, `fiu.md` |
| circ-exch-cc | `nse.md`, `bse.md`, `mcx.md`, `clearing-corps.md` |
| circ-depos | `cdsl.md`, `nsdl.md` |
| gap-account-variants | `working/gaps-2026-09/account-variants/*.md` (12 notes) |
| gap-product-activation | `working/gaps-2026-09/product-activation/*.md` (13 notes) |
| gap-funds-tax | `working/gaps-2026-09/funds-tax/*.md` (9 notes) |
| gap-trading-risk | `working/gaps-2026-09/trading-risk/*.md` (9 notes) |

Gate: each verdict `status: done`; spot-check `_SUMMARY.md` counts and `[unknown — verify]` counts from verdicts only.

## Phase 2 — Consolidate + draft

1. **circ-consolidate (Codex, code):** extend `working/consolidate.py` to read `working/circulars/*.md` + `working/circulars-delta-2026-09/*.md`; regenerate issuer pages + master index with window `2020-01-01 → 2026-09-11`; preserve existing `circulars-changelog.md` and append a dated `## 2026-09-11 sweep` section (counts by issuer, new entries list, supersessions); rerun `working/wrap_abbreviations.py`; run `working/validate_links.py`. Verdict includes new-entry count.
2. **draft-<section> ×4 (Codex, docs, parallel):** from research notes + `PAGE_TEMPLATE.md`, write every page of the section into `kyc-docs-site/src/content/docs/<section>/`; then `npm run build` in `kyc-docs-site/` and fix own MDX errors; run `python3 working/validate_links.py` and fix own broken links; report word counts, link counts, Aside counts.

Gate: build exit code 0 (Claude runs `npm run build >/dev/null; echo RC=$?`), validate_links exit code.

## Phase 3 — Wiring (Claude + one Codex task)

1. Sidebar groups in `kyc-docs-site/astro.config.mjs` (four groups after Deep Dives).
2. **wire-nav (Codex):** add new pages to persona reading paths, section landings, homepage cards, README sections list; append blueprint rows for new obligations from the delta (`working/blueprint/cluster-*.md` + `build_blueprint.py`); add glossary terms; rerun abbr wrap; build + link validation.
3. Pointers from `appendix/minor-joint-accounts.md`, `appendix/nri-deep-dive.md`, `appendix/non-individual-entities.md` to the new variant pages.
4. Commits: one per section + one for circulars + one for wiring.
5. Memory files + Obsidian session/research notes.

## Success checks

- `find src/content/docs -name '*.md*' | wc -l` ≈ 191 + 47.
- Build RC=0, link validation RC=0.
- Every new page has `Verified through` + `2026-09-11`.

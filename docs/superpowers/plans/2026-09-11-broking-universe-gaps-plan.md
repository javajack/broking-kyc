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

## Execution log

- **2026-09-11 20:37 IST** — 8 Codex research tasks launched. 3 finished before the Codex account hit its usage cap (reset 2026-09-16): 174 delta circular entries plus 10 partial topic notes. 150 of 174 primary URLs returned HTTP 200; the 24 failures are bot-blocked MCX PDFs.
- **21:25 IST** — user instruction: stop using Codex. Drafting moved to 8 Claude Opus subagents, two per section, briefed by `working/gaps-2026-09/prompts/DRAFT_AGENT_BRIEF.md`. Phase 2 drafting and research were merged: agents researched directly from primary sources and used the partial notes where present.
- `working/consolidate.py` extended to read `working/circulars-delta-2026-09/`, skip `## SUMMARY` blocks, map extra SEBI departments (AFD, DDHS, ITD, ISD) to `sebi-other`, set the window end to 2026-09-11, and prepend a dated delta section to the changelog while keeping the 2026-05-14 section.
- **Corrections found by drafting agents:** Stock Brokers Master Circular is `SEBI/HO/MIRSD/MIRSD-PoD/P/CIR/2025/90` (was indexed as `.../POD-1/P/CIR/2025/94`); 3-in-1 / UPI-block mandate is `SEBI/HO/MRD/MRD-PoD-2/P/CIR/2024/153` (two deep dives cited a non-existent `2024/175`); IRRA was discontinued by `HO/38/44/12(3)2025-MIRSD-TPD1/I/10705/2026` (2026-05-07); corporate PAN fourth character is `C`.
- **2026-09-12 02:00 IST** — Opus session limit interrupted two agents; both relaunched. Build clean (235 pages), 47 new pages pass the template audit, four section commits plus a wiring commit landed. Circulars gap-fill (NSE, BSE, NCL, ICCL, FIU-IND plus 2025 equity-derivatives backfill) and blueprint rows ran as follow-up agents. WebSearch budget (200 calls) was exhausted, so follow-ups used WebFetch and curl only.
- **2026-09-12 02:50 IST** — Blueprint agent: 422 rows (22 added, 34 updated). Gap-fill agent: 71 entries (NSE 29, NCL/ICCL 25, BSE 11, SEBI 6 backfills; FIU-IND verified zero in window). Index total 1,130. Two backfilled SEBI IDs use the circulars' own forms: `SEBI/HO/MRD/MRD-TPD-1/P/CIR/2025/76` and `SEBI/HO/MRD/TPD/CIR/P/2025/ 122`.
- New repair scripts in `working/`: `fix_anchors_normalized.py` (match anchors to built heading ids), `resolve_index_tags.py` and `resolve_bold_tags.py` (anchor citations that the index now contains and drop stale `[not yet in index]` tags). The older `fix_anchor_links.py` strips hyphens from non-circular anchors; do not use it.
- Final state: 234 source pages, 235 built pages, build exit 0, link validation 0 broken pages and 0 broken anchors.

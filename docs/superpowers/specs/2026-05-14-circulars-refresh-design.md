# Circulars Refresh — Design

**Date:** 2026-05-14
**Sub-project:** 1 of 6 in the broking-ops expansion
**Status:** Design — pending user review

## Context

`broking-kyc` is shifting from a KYC-onboarding capability demo to a broader, three-audience knowledge base (operator playbook + capability demo + personal KB) covering full Indian broking operations. Six sub-projects are sequenced: (1) Circulars Refresh — this spec, (2) Vendor Atlas, (3) Field-level Data Flow, (4) Integration Choreography DAG, (5) KYC Lifecycle beyond onboarding, (6) Broking Operations Platform (SOD/EOD, RMS, settlement, reporting, audit, grievance).

This sub-project replaces the existing 37-entry hand-curated circulars index with a verified, comprehensive 2020–2026 sweep that becomes the regulatory citation baseline for everything downstream.

## Goal

Expand `kyc-docs-site/src/content/docs/reference/regulatory-circulars.md` into a verified index of every circular in force (or recently superseded) across SEBI, RBI, NPCI, CERSAI, MeitY, FIU-IND, depositories (CDSL, NSDL), exchanges (NSE, BSE, MCX), and clearing corps (NSCCL, ICCL, MCXCCL) from **2020-01-01 through 2026-05-14**.

### Coverage explicitly includes (not just regulatory — operational too)

- **SEBI** — KYC, AML, AA, DPDP, brokers regulations, surveillance, technical glitches, BCP/DR, system audit, MTF, SLBM, investor grievance (SCORES/ODR), client funds upstreaming, T+0 / T+1 settlement, nomination, fees & charges.
- **Exchanges (NSE, BSE, MCX)** — UCC, segment activation, position limits, margin frameworks (SPAN, ELM, VaR, MTM), surveillance, member compliance, **BOD/EOD batch file specifications**: UCC files, contract files, position files, margin files, trade files, obligation files, MTM files, member files, holiday calendars, circuit-filter files, file format circulars themselves (UDiFF, pipe-delimited, fixed-length, ETI), CTCL approvals, algo approvals, co-location, FIX gateway, internet trading, mobile trading.
- **Clearing corps (NSCCL, ICCL, MCXCCL)** — settlement obligations, margin calls, default fund, auction, give-up/take-up, EOD MTM, span/scanrange files, settlement file specs, payin/payout files.
- **Depositories (CDSL, NSDL)** — BO opening, modifications, transmission, pledge/MTF pledge, DDPI, file format circulars (CDAS, UDiFF, DPM), e-DIS/SPEED-e, demat dematerialisation, easi/easiest.
- **RBI / NPCI** — UPI Block, AutoPay, eNACH, mandates, account aggregator, KYC master direction, banking ops touching brokers.
- **CERSAI** — CKYC operational guidelines, KIN issuance, file formats.
- **MeitY** — DigiLocker, eSign, DPDP rules.
- **FIU-IND** — STR/CTR/CCR reporting formats and circulars.

## Per-entry schema

Every circular gets: **circular ID, date issued, issuer, applies-to (broker/depository/exchange/clearing-corp/all), in-force date, status (in-force/superseded/withdrawn), superseded-by, impact-area tags (onboarding/re-KYC/RMS/settlement/reporting/surveillance/dpdp/etc.), 2–4 sentence summary traceable to clauses in the linked PDF, primary URL (verified HTTP 200, title and date match), archive URL (if primary dead).**

## Output files

- `kyc-docs-site/src/content/docs/reference/regulatory-circulars.md` — master sortable index.
- Per-issuer sub-pages where volume warrants (likely SEBI MIRSD, possibly RBI).
- `kyc-docs-site/src/content/docs/reference/circulars-changelog.md` — diff log against the prior 37-entry list: new, changed, superseded, removed.
- Inline citations: every doc that references a circular gets its citation present in the new index. No orphans, no broken cross-links.

## Three-layer rendering

Same dataset, three reading paths (presentation only):

- **Operator** — filter chips on the index: `Onboarding`, `Re-KYC`, `RMS`, `Settlement`, `Reporting`, `Surveillance`, `In-force only` (default on).
- **Capability demo** — curated "most-impactful 12–15 circulars" highlight panel at top of the index, mirroring the current README table.
- **Personal KB** — full sortable table with toggles for `superseded`, `withdrawn`, `archived`.

Filter chips and toggles ship as a follow-up UI piece — content is the priority for this sub-project.

## Citation rigor

- Every entry has a primary URL fetched at least once (HTTP 200, title and date match).
- Dead primary URLs get an `archive.org` Wayback URL or are flagged with a `// withdrawn` note.
- "Verified through: 2026-05-14" stamp at top of the index; re-stamped on every refresh.
- AI-generated + not-legal-advice disclaimer stays prominent. New line: "Summaries are paraphrased — read the linked PDF before acting on any provision."

## Vendor naming policy

- Mirror what the circular names: DigiLocker, Setu, named KRAs (CVL, NDML, DOTEX, CAMS, KFintech), CERSAI, depositories, exchanges, NPCI products (UPI Block, AutoPay, eNACH).
- Don't introduce vendor names the circulars themselves don't use.
- Full product enumeration deferred to sub-project #2 (Vendor Atlas).

## Workflow

User-elected: **parallel sweep, no pilot**.

- One sub-agent per issuer (SEBI gets two: MIRSD vs others, given volume). Issuers: SEBI-MIRSD, SEBI-other, RBI, NPCI, CERSAI, MeitY, FIU-IND, CDSL, NSDL, NSE, BSE, MCX, clearing corps. ~13 agents.
- Each agent uses WebSearch + WebFetch, returns entries matching the schema, writes to a working file at `working/circulars/<issuer>.md` (gitignored).
- Main session consolidates: normalize formatting, dedupe across issuers (e.g., joint SEBI+exchange circulars), build the master index, build the changelog, update cross-links across all `kyc-docs-site/src/content/docs/**` files that cite circulars.
- Single PR at end of sub-project. User reviews diff vs prior 37-entry list.

## Risks

- **Schema drift across agents** — mitigation: explicit schema in each agent prompt + a single consolidation/normalization pass before committing.
- **Stale URLs at scale** — mitigation: archive.org fallback is standard, flagged in the changelog.
- **Volume overrun** — realistic range is 80–250 entries (vs current 37). If too dense to read, sub-page split per issuer kicks in.
- **Hallucinated circular IDs** — mitigation: every ID must be present in the linked-PDF metadata or page text fetched by WebFetch. No ID survives without source verification.

## Out of scope

Vendor names not in circulars (→ #2). Field-level data flow (→ #3). Integration DAG (→ #4). Re-KYC/modification/dormancy workflows (→ #5). Non-KYC broking ops (→ #6). UI work for filter chips / layered nav (separate piece after content lands).

## Success criteria

- ≥80 circulars indexed.
- 100% of entries have a verified primary or archive URL.
- Every cross-reference from journey/operations/vendors/appendix docs to a circular resolves to an index entry.
- `circulars-changelog.md` exists and documents the diff.
- Demo-path highlight panel updated.
- "Verified through: 2026-05-14" stamp present.

## Documentation conventions (apply across all six sub-projects)

These are project-wide content rules, not specific to circulars. Every doc page in this expansion honors them; sub-projects #2–#6 inherit without restating.

1. **Source traceability.** Every assertion is traceable to one of:
   - A specific circular clause (cited inline with issuer + circular ID + clause/page).
   - An agency or exchange technical spec (KRA, CKYC, NSE, BSE, MCX, CDSL, NSDL, RBI, NPCI, FIU-IND, NSCCL, ICCL, MCXCCL).
   - A vendor's public product documentation (linked).
   - A verifiable industry source (regulator publication, exchange annual report, vendor SOC, named industry report).
   - Where no primary source exists, the claim is tagged inline: `[industry practice — unverified]` or `[AI inference — verify before acting]`. No silent inferences.

2. **Reasoned doc structure.** Every page opens with a 1–2 sentence "why this order" note explaining the structural choice (e.g., "BOD jobs are time-sequential, so this page is ordered by job-start time; for read-by-system view see <link>"). Lets a future editor preserve intent.

3. **High-level → low-level progression.** Every page follows the same vertical: **TL;DR** (3–5 bullets) → **Conceptual overview** (1–2 paragraphs) → **Mechanics** (tables, field-level layouts, file specs, code snippets where they exist). A reader can stop after any layer and still have a coherent picture; an operator can drill down without flipping between pages.

4. **Alternatives surfaced explicitly.** Wherever a real choice exists in industry — DigiLocker vs OCR fallback, AA vs ITR upload, CDSL vs NSDL routing, ENIT vs ENIT-New, FIX vs CTCL, SPAN vs portfolio margin, direct-RTGS vs upstream-pool — document it as "Approach A / Approach B / when to pick which / who actually uses what". Never present one path as if it's the only one.

5. **Practical notes section per page.** A consistently-named section (suggest: `## Practical notes`) at the end of every operational page, capturing:
   - Common failure modes and field-tested workarounds.
   - Edge cases the official docs typically omit (cooperative bank IMPS delays, NRI Aadhaar limitations, MCX commodity-category nuances, exchange holiday-edge BOD shifts).
   - Industry-practice insights — what brokers actually do vs what the circular literally says.
   - Cost / time / risk trade-offs that affect operator decisions.
   Tag entries with the type: `[gotcha]`, `[industry practice]`, `[cost optimization]`, `[risk trade-off]`.

6. **Vendor names without endorsement.** Name real products throughout (mirroring circulars in #1; full enumeration in #2; named inline in #3–#6). For each, note **positioning** ("dominant in retail back-office", "preferred for institutional custody", "common AA gateway") not **endorsement** ("best", "recommended", "industry-leading"). Pricing shape and SLA shape OK; "buy this" language not OK.

7. **Field-level baseline.** Wherever a file, form, API payload, or screen is described, fields are documented with `name | type | length | mandatory | source-system | destination-system(s) | notes`. No prose-only field descriptions.

## Next step

After user approval, invoke the writing-plans skill to break the sweep into per-agent dispatches and the consolidation phase.

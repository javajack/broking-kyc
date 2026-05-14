# Circulars Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the 37-entry hand-curated `kyc-docs-site/src/content/docs/reference/regulatory-circulars.md` with a verified, comprehensive index of every circular in force (or recently superseded) across SEBI, RBI, NPCI, CERSAI, MeitY, FIU-IND, depositories (CDSL, NSDL), exchanges (NSE, BSE, MCX), and clearing corps (NSCCL, ICCL, MCXCCL) issued between 2020-01-01 and 2026-05-14 — including operational and file-format circulars, not just regulatory ones.

**Architecture:** Thirteen parallel research sub-agents (one per issuer, SEBI gets two) each produce a markdown working file with entries conforming to a shared schema. The main session then consolidates into a master index, generates a changelog against the prior list, performs a project-wide cross-link sweep, and applies the documentation-conventions presentation layer (TL;DR, why-this-order, alternatives surfaced, practical notes section, "verified through" stamp). Working files are gitignored and deleted at end. Single PR for the whole sub-project.

**Tech Stack:** Astro Starlight (existing site, no build changes), WebSearch + WebFetch (research), markdown (output format), sub-agents (Explore subagent_type for read-only research).

**Note on TDD adaptation:** This is a content/research plan, not code. The "test" model from TDD adapts as follows — each output is verified by **schema conformance** (every entry has all required fields with valid types) + **URL spot-check** (≥3 random entries per agent fetch HTTP 200 with title/date matching the entry) + **cross-reference completeness** (no doc cites a circular not in the new index).

---

## File Structure

**Files to create (final, committed):**

- `kyc-docs-site/src/content/docs/reference/circulars-changelog.md` — diff log: new / changed / superseded / removed vs. prior 37-entry list.
- `kyc-docs-site/src/content/docs/reference/circulars/<issuer>.md` — per-issuer sub-pages, created only for issuers with >60 entries (almost certainly SEBI-MIRSD; likely RBI; possibly NSE).

**Files to modify:**

- `kyc-docs-site/src/content/docs/reference/regulatory-circulars.md` — replaced wholesale with new index.
- `README.md` — sync the highlight table (currently 20 entries → curated "most-impactful 12–15").
- `.gitignore` — add `working/`.
- Any file under `kyc-docs-site/src/content/docs/**/*.{md,mdx}` that cites a circular by ID — citations updated to match the new index. Identified via grep.

**Files to create (temporary, gitignored, deleted at end):**

- `working/SCHEMA.md` — the per-entry schema contract.
- `working/AGENT_PROMPT.md` — the parameterized prompt template.
- `working/circulars/<issuer>.md` — one per agent (13 files).
- `working/MASTER_DRAFT.md` — consolidated draft before splitting/finalising.

**Responsibilities by file:**

| File | Owns |
| --- | --- |
| `regulatory-circulars.md` | Master index, sortable. Curated highlight panel at top + full table + filter-chip stubs (chip JS deferred to a later UI piece). |
| `circulars-changelog.md` | The delta against prior 37 entries, grouped by category (new in-force / superseded / withdrawn / removed). |
| `circulars/<issuer>.md` | Issuer-scoped subset when master index exceeds readable density. |
| `working/SCHEMA.md` | Canonical entry schema — every agent must conform. |
| `working/AGENT_PROMPT.md` | Reusable prompt skeleton — each Task 5 dispatch substitutes ISSUER, SEED_URLS, FOCUS_AREAS, OUTPUT_PATH. |

---

## Phase 1 — Setup (Tasks 1–4)

### Task 1: Working directory + gitignore

**Files:**
- Create: `working/.keep`
- Modify: `.gitignore`

- [ ] **Step 1: Create working directory**

```bash
mkdir -p /home/rakesh/work/broking-kyc/working/circulars
touch /home/rakesh/work/broking-kyc/working/.keep
```

Expected: directories created, no errors.

- [ ] **Step 2: Add to .gitignore**

Append to `/home/rakesh/work/broking-kyc/.gitignore`:

```
# Temporary research workspace for sub-project specs (e.g., circulars refresh).
# Contents are agent-produced drafts; deleted at end of each sub-project.
working/
```

- [ ] **Step 3: Verify gitignore picks up working/**

Run:
```bash
git -C /home/rakesh/work/broking-kyc check-ignore -v working/SCHEMA.md
```

Expected output: a line matching `.gitignore:N:working/        working/SCHEMA.md`.

- [ ] **Step 4: Commit gitignore change**

```bash
git -C /home/rakesh/work/broking-kyc add .gitignore
git -C /home/rakesh/work/broking-kyc commit -m "Ignore working/ research scratch directory"
```

---

### Task 2: Schema contract

**Files:**
- Create: `working/SCHEMA.md`

- [ ] **Step 1: Write the schema document**

Write the exact content below to `/home/rakesh/work/broking-kyc/working/SCHEMA.md`:

````markdown
# Circular Entry Schema (v1)

Every circular entry produced by an issuer-research agent MUST conform to this schema. The consolidation step rejects non-conforming entries.

## Entry format

Each entry is a single markdown block with a YAML-style frontmatter header followed by a paragraph summary. Stored as `## <circular_id>` sections in the issuer working file.

```
## <circular_id>

- date_issued: YYYY-MM-DD
- issuer: <one of: SEBI-MIRSD | SEBI-MRD | SEBI-OIAE | SEBI-IMD | SEBI-LAD-NRO | RBI | NPCI | CERSAI | MeitY | FIU-IND | CDSL | NSDL | NSE | BSE | MCX | NSCCL | ICCL | MCXCCL>
- title: "<verbatim from the circular header>"
- applies_to: <comma-separated subset of: broker, depository, exchange, clearing-corp, all-intermediaries>
- in_force_date: YYYY-MM-DD | immediate
- status: in-force | superseded | withdrawn
- superseded_by: <circular_id or empty>
- impact_areas: <comma-separated subset of the tag list below>
- primary_url: <direct link to circular PDF or page, HTTP 200 verified>
- archive_url: <https://web.archive.org/web/*/<primary_url> if primary dead, else empty>

Summary: 2–4 sentences. Every claim traceable to a specific clause or section of the linked document. Use clause references inline like "(per clause 3.2)" where the source is structured.
```

## Impact-area tag list (closed vocabulary)

`onboarding` | `re-KYC` | `kyc-modification` | `dormant` | `closure` | `transmission` | `nominee` | `aml` | `fatca-crs` | `dpdp` | `rms` | `margin` | `peak-margin` | `mtf` | `slbm` | `settlement` | `t0-t1` | `upstreaming` | `client-funds` | `surveillance` | `reporting` | `file-format` | `bod-eod` | `system-audit` | `cyber-security` | `bcp-dr` | `grievance` | `scores-odr` | `mutual-funds` | `derivatives` | `commodities` | `nri` | `minor-joint` | `non-individual` | `digi-locker` | `esign` | `aa` | `upi-block` | `mandate` | `other`

If a circular doesn't cleanly fit any tag, use `other` AND open a note in the working file's `## OPEN_QUESTIONS` section at the bottom.

## Validation rules

1. `circular_id` must appear verbatim in the linked document (issuer's exact format).
2. `date_issued` must be present on the circular itself (not the index page).
3. `primary_url` MUST have been WebFetch-verified during research. Don't include URLs you didn't fetch.
4. If `status: superseded`, `superseded_by` must be non-empty and reference another circular_id.
5. Summary sentences must avoid editorializing ("important", "landmark", "key"). State what the circular requires, not its perceived significance.
6. If any field is unknown after research, write `[unknown — verify]` — do not omit the field, do not guess.

## Open-questions section

At the bottom of every working file, include:

```
## OPEN_QUESTIONS

- <free-text notes about ambiguous entries, supersession chains you couldn't resolve, URLs that 404'd, etc.>
```

Consolidation reads these and either resolves or surfaces to the user.
````

- [ ] **Step 2: Verify file**

```bash
wc -l /home/rakesh/work/broking-kyc/working/SCHEMA.md
```

Expected: >40 lines.

---

### Task 3: Agent prompt template

**Files:**
- Create: `working/AGENT_PROMPT.md`

- [ ] **Step 1: Write the prompt template**

Write to `/home/rakesh/work/broking-kyc/working/AGENT_PROMPT.md`:

````markdown
# Issuer Research Agent — Prompt Template

This template is substituted with per-issuer parameters at dispatch time (Task 5). Placeholders use `{{NAME}}`.

---

You are researching Indian financial regulatory circulars for a comprehensive index.

**Scope:** ONLY circulars issued by **{{ISSUER}}** between **2020-01-01 and 2026-05-14**.

**Output file:** Write all entries to `{{OUTPUT_PATH}}`. Append; do not overwrite an existing file without checking it's empty.

**Schema:** Conform exactly to `working/SCHEMA.md`. Re-read it before starting. Validation rules are non-negotiable.

**Seed URLs (start here, follow archive/index pagination):**

{{SEED_URLS}}

**Focus areas — circulars relevant to these topics are in scope; everything else can be skipped:**

{{FOCUS_AREAS}}

**Method:**

1. WebFetch each seed URL. Note the archive/index structure (pagination, year-folders, department prefixes).
2. WebSearch for additional circulars not on the seed pages, e.g.: `"{{ISSUER}} circular 2024 [topic]"`, `site:{{ISSUER_DOMAIN}} circular [year]`.
3. For each candidate circular found, WebFetch the actual circular page or PDF (NOT just the index row). Confirm: HTTP 200, title and date match what the index claimed.
4. Extract entry fields per schema. Read at least the first page of the circular to write the summary — do not paraphrase from the index.
5. Write the entry to `{{OUTPUT_PATH}}` immediately, then move to the next candidate.
6. If a URL returns 404 / 403 / redirect-to-error, try the Wayback Machine: `https://web.archive.org/web/*/<url>`. If the snapshot is good, use it as `archive_url` and keep `primary_url` empty with a `[dead link — see archive]` note.
7. At end, append `## OPEN_QUESTIONS` section with any unresolved supersessions, ambiguous dates, etc.

**Rules:**

- No inferred circular IDs. If you can't see the ID in the document, skip it or flag in OPEN_QUESTIONS.
- No paraphrased titles. Copy verbatim.
- No editorializing in summaries (no "important", "landmark", "key").
- Target: comprehensive within window. 50+ entries is normal for active issuers; 100+ is fine.
- If you find a circular that was superseded during the window, include BOTH the superseding and superseded entries — the index needs the full chain.

**Return when done:**

- Total entry count written.
- List of URLs that failed verification (404 / mismatch / dead).
- Count of entries marked `[unknown — verify]` in any field.
- One-paragraph summary of what categories of circulars dominate this issuer's output in the window.
````

- [ ] **Step 2: Verify file**

```bash
wc -l /home/rakesh/work/broking-kyc/working/AGENT_PROMPT.md
```

Expected: >40 lines.

---

### Task 4: Commit setup

- [ ] **Step 1: Verify working files are gitignored**

```bash
git -C /home/rakesh/work/broking-kyc status
```

Expected: only the gitignore change (already committed in Task 1) is tracked. `working/` does not appear in untracked files.

- [ ] **Step 2: No commit needed for Task 4**

Working files are gitignored. Task 4 is just a checkpoint that Phase 1 is complete and Phase 2 can begin.

---

## Phase 2 — Parallel research dispatch (Task 5)

### Task 5: Dispatch all 13 issuer-research agents in parallel

This is one tool-use message with 13 Agent calls (`subagent_type: Explore`, `run_in_background: true`). The harness will notify on each completion; the consolidation tasks (Phase 4) gate on all 13 being done.

**Files:**
- Each agent writes to `working/circulars/<issuer-slug>.md`.

- [ ] **Step 1: Dispatch all 13 agents in a single message**

In one tool-use block, make 13 `Agent` calls. Each call's prompt is the `working/AGENT_PROMPT.md` template substituted with the per-issuer parameters below. Each call uses:
- `subagent_type: "Explore"` (read-only research; cannot edit other code)
- `run_in_background: true` (long-running; main session continues)
- `description`: `"Research <ISSUER> circulars"` (3–5 word summary)

#### Agent 1 — SEBI-MIRSD

- ISSUER: `SEBI-MIRSD`
- OUTPUT_PATH: `working/circulars/sebi-mirsd.md`
- ISSUER_DOMAIN: `sebi.gov.in`
- SEED_URLS:
  - `https://www.sebi.gov.in/sebiweb/home/HomeAction.do?doListing=yes&sid=1&ssid=6&smid=0` (Legal → Circulars)
  - `https://www.sebi.gov.in/sebiweb/home/HomeAction.do?doListing=yes&sid=1&ssid=8&smid=0` (Master Circulars)
  - `https://www.sebi.gov.in/legal/master-circulars/oct-2023/master-circular-for-stock-brokers_72151.html` (Stock Brokers Master Circular)
  - `https://www.sebi.gov.in/legal/master-circulars/jun-2025/master-circular-for-stock-brokers-2025_94120.html` or equivalent 2025 update (search SEBI legal page)
- FOCUS_AREAS:
  - KYC norms, KRA, CKYC dual upload
  - AML/CFT, PMLA, STR/CTR
  - Account Aggregator, AA consent
  - DPDP touchpoints under MIRSD
  - Brokers regulations (incl. 2026 replacement of 1992 regs)
  - MTF, SLBM
  - Nomination, dormant accounts, transmission
  - Intermediary registration, fit-and-proper
  - FATCA/CRS
  - System audit (every 2 years), cyber-security CSCRF
  - BCP/DR
  - Client funds upstreaming
  - SCORES, ODR, investor grievance
  - Technical glitches reporting
  - Fees and charges disclosure

#### Agent 2 — SEBI-other (MRD, IMD, OIAE, LAD-NRO, CFD)

- ISSUER: `SEBI-MRD` (also tag entries SEBI-IMD / SEBI-OIAE / SEBI-LAD-NRO / SEBI-CFD per the actual department prefix in the circular ID)
- OUTPUT_PATH: `working/circulars/sebi-other.md`
- ISSUER_DOMAIN: `sebi.gov.in`
- SEED_URLS:
  - `https://www.sebi.gov.in/sebiweb/home/HomeAction.do?doListing=yes&sid=1&ssid=6&smid=0` (filter by non-MIRSD department prefix)
  - `https://www.sebi.gov.in/sebiweb/home/HomeAction.do?doListing=yes&sid=1&ssid=8&smid=0`
- FOCUS_AREAS:
  - Market surveillance (NORMS, social-media surveillance)
  - T+0 / T+1 settlement
  - UPI Block for QSBs (the SEBI-side consultation + final circular)
  - DigiLocker for demat holdings (Mar 2025)
  - Exchange & clearing-corp regulations
  - Position limits, margin frameworks (SPAN, ELM, VaR)
  - Derivatives — F&O product structure, expiry, settlement
  - Commodities — staggered delivery, expiry-day rules
  - SCORES + ODR framework circulars
  - Mutual funds touching brokers (MFI, MF-Lite)
  - LAD-NRO Gazette notifications (Brokers Regulations 2026, etc.)
  - IPO / OFS / rights / buyback operational circulars affecting brokers

#### Agent 3 — RBI

- ISSUER: `RBI`
- OUTPUT_PATH: `working/circulars/rbi.md`
- ISSUER_DOMAIN: `rbi.org.in`
- SEED_URLS:
  - `https://www.rbi.org.in/Scripts/BS_CircularIndexDisplay.aspx`
  - `https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx` (Master Directions)
  - `https://www.rbi.org.in/Scripts/NotificationUser.aspx`
- FOCUS_AREAS:
  - KYC Master Direction (and amendments)
  - UPI operating guidelines and circulars
  - AutoPay limit changes (incl. Dec 2023 ₹1L for MCC 6211)
  - eNACH framework, mandate management
  - Account Aggregator NBFC-AA Master Direction
  - Banking ops touching brokers: settlement banks, clearing-bank requirements, IMPS, RTGS, NEFT operating circulars
  - Payment systems oversight (PSS Act)
  - Digital lending touchpoints if any
  - Outsourcing of financial services
  - CKYC interconnection circulars on the RBI side

#### Agent 4 — NPCI

- ISSUER: `NPCI`
- OUTPUT_PATH: `working/circulars/npci.md`
- ISSUER_DOMAIN: `npci.org.in`
- SEED_URLS:
  - `https://www.npci.org.in/what-we-do/upi/circular`
  - `https://www.npci.org.in/what-we-do/upi-autopay/circular`
  - `https://www.npci.org.in/what-we-do/nach/circular`
  - `https://www.npci.org.in/what-we-do/upi/upi-product-overview` (for product-level operating docs)
- FOCUS_AREAS:
  - UPI Block — single-block-multiple-debit (SBMD), ASBA-style for brokers (mandatory from Feb 1, 2025)
  - UPI AutoPay limits (the ₹1L MCC 6211 change)
  - eNACH operating circulars, debit/return code lists
  - Mandate management API circulars
  - UPI version updates (2.0, 3.0, etc.) where they affect broker integrations
  - UPI Lite — relevance for low-value top-ups

#### Agent 5 — CERSAI

- ISSUER: `CERSAI`
- OUTPUT_PATH: `working/circulars/cersai.md`
- ISSUER_DOMAIN: `cersai.org.in` (also `ckycindia.in`)
- SEED_URLS:
  - `https://www.ckycindia.in/ckyc/assets/doc/notification/` (notifications archive)
  - `https://www.cersai.org.in/CERSAI/notifications.prg`
  - `https://www.ckycindia.in/ckyc/document.html` (templates, formats)
- FOCUS_AREAS:
  - CKYC operational guidelines, KIN issuance, dedup rules
  - Dual upload mandate (KRA + CKYC, effective Aug 1, 2024)
  - CKYC template revisions (T1/T2/Minor/Legal Entity)
  - File format specifications
  - Masked KIN search (Jan 2025 change)
  - API specifications for CKYC search/download/upload
  - Risk-based KYC periodicity rules

#### Agent 6 — MeitY (incl. CCA for eSign, MeitY for DPDP)

- ISSUER: `MeitY`
- OUTPUT_PATH: `working/circulars/meity.md`
- ISSUER_DOMAIN: `meity.gov.in` (also `cca.gov.in`)
- SEED_URLS:
  - `https://www.meity.gov.in/digidhan`
  - `https://www.meity.gov.in/data-protection-framework`
  - `https://www.cca.gov.in/eSign.html`
  - `https://www.cca.gov.in/sites/default/files/files/eSign-Service-Operating-Guidelines.pdf` (or its current location)
  - `https://digilocker.gov.in/partners/` (DigiLocker partner program guidelines)
- FOCUS_AREAS:
  - DigiLocker API guidelines for financial intermediaries
  - eSign Service operating guidelines (CCA)
  - CCA-licensed ESPs (eMudhra, NSDL e-Gov, C-DAC, etc.)
  - DPDP Act 2023 — notified provisions
  - DPDP Rules 2025 (notified Nov 13, 2025)
  - IT Rules 2021 amendments touching financial intermediaries
  - Aadhaar e-KYC framework changes (incl. NPCI e-KYC Setu, Jun 2025)

#### Agent 7 — FIU-IND

- ISSUER: `FIU-IND`
- OUTPUT_PATH: `working/circulars/fiu.md`
- ISSUER_DOMAIN: `fiuindia.gov.in`
- SEED_URLS:
  - `https://fiuindia.gov.in/files/PMLA/reportingentity/index.html`
  - `https://fiuindia.gov.in/files/downloads/index.html`
  - `https://fiuindia.gov.in/files/AML_Legislation/index.html`
- FOCUS_AREAS:
  - STR (Suspicious Transaction Report) format updates
  - CTR (Cash Transaction Report) format
  - CCR (Counterfeit Currency Report)
  - NTR (Non-Profit Transaction Report)
  - Cross-Border Wire Transfer Report (CBWTR)
  - FINnet / FINGate technical specifications
  - Reporting deadlines, formats, escalation matrices
  - Designated director / principal officer requirements
  - Red-flag indicator updates

#### Agent 8 — CDSL

- ISSUER: `CDSL`
- OUTPUT_PATH: `working/circulars/cdsl.md`
- ISSUER_DOMAIN: `cdslindia.com`
- SEED_URLS:
  - `https://www.cdslindia.com/Notification/Communiques.aspx`
  - `https://www.cdslindia.com/DP/Notification.aspx`
  - `https://www.cdslindia.com/Downloads/Forms.aspx` (form/format docs that change with circulars)
- FOCUS_AREAS:
  - BO opening file specs (positional / line 01–07)
  - Account modification file specs
  - Transmission process & file specs
  - Pledge (margin pledge, MTF pledge)
  - DDPI activation, scope, revocation
  - e-DIS authorization
  - CDAS file format circulars
  - easi / easiest enhancements
  - Automated pledge release (PR-EP) effective Oct 2025
  - Automated invocation (IV-EP / IV-RD) Oct 2025
  - DP audit framework circulars
  - 16-digit BO ID structure

#### Agent 9 — NSDL

- ISSUER: `NSDL`
- OUTPUT_PATH: `working/circulars/nsdl.md`
- ISSUER_DOMAIN: `nsdl.co.in`
- SEED_URLS:
  - `https://nsdl.co.in/policies/circulars.php`
  - `https://nsdl.co.in/downloadables/pdf/policy/` (or current circulars archive)
  - `https://nsdl.co.in/business/depository-services.php` (operational doc links)
- FOCUS_AREAS:
  - BO opening (Insta Interface API, paper file fallback)
  - Account modification
  - Transmission (single, joint, nominee, succession)
  - Pledge framework
  - DDPI on NSDL
  - SPEED-e and IPIN
  - DPM circulars
  - UDiFF (ISO-tagged) file format adoption (Mar 2024)
  - "IN" + 14-character BO ID structure
  - DP compliance audit framework
  - PAN flag finalization (5–7 days)

#### Agent 10 — NSE

- ISSUER: `NSE`
- OUTPUT_PATH: `working/circulars/nse.md`
- ISSUER_DOMAIN: `nseindia.com`
- SEED_URLS:
  - `https://www.nseindia.com/resources/exchange-communication-circulars`
  - `https://www.nseindia.com/resources/regular-services-circulars-trading`
  - `https://www.nseindia.com/resources/membership-circulars`
- FOCUS_AREAS:
  - UCC registration (REST API + batch file), 3-param Protean check
  - Segment activation (CM, F&O, CD, debt, IRD)
  - Surveillance (NORMS), GSM, ASM lists
  - CTCL approvals
  - Algo approval, vendor empanelment
  - Co-location, FIX gateway operational circulars
  - Position limits, market-wide position limits (MWPL)
  - Margin frameworks (SPAN, ELM, additional margin, MTM)
  - **BOD file specs**: holiday calendar, contract files (CM, F&O, CD), span files, circuit-filter, member files, MTM files (T-1)
  - **EOD file specs**: trade files, position files, obligation files, MTM end-of-day
  - **File-format circulars themselves** (UDiFF adoption, pipe-delimited spec versions)
  - Disaster recovery testing schedules
  - Member compliance reporting (CAR, DPC, etc.)

#### Agent 11 — BSE

- ISSUER: `BSE`
- OUTPUT_PATH: `working/circulars/bse.md`
- ISSUER_DOMAIN: `bseindia.com`
- SEED_URLS:
  - `https://www.bseindia.com/markets/MarketInfo/DispNewNoticesCirculars.aspx`
  - `https://www.bseindia.com/static/about/circulars.aspx`
  - `https://www.bseindia.com/markets/equity/EQReports/EQReports_DBPP.aspx`
- FOCUS_AREAS:
  - UCC (BEFS — BSE Electronic Filing System)
  - Unfreeze process (BSE-specific name/DOB change)
  - Segment activation
  - ETI / API specs, BOLT replacement notifications
  - Surveillance, GSM/ASM equivalents
  - **BOD file specs** (fixed-length, segment-specific)
  - **EOD file specs**
  - CM / F&O / CD operational circulars
  - IPO via BFS (BSE Foundation Services) operational
  - StAR MF circulars touching brokers
  - SME platform circulars

#### Agent 12 — MCX

- ISSUER: `MCX`
- OUTPUT_PATH: `working/circulars/mcx.md`
- ISSUER_DOMAIN: `mcxindia.com`
- SEED_URLS:
  - `https://www.mcxindia.com/regulation-data/all-circulars`
  - `https://www.mcxindia.com/regulation-data/notices`
  - `https://www.mcxindia.com/membership` (membership compliance docs)
- FOCUS_AREAS:
  - UCC (with income proof mandatory)
  - Commodity client categories: HE / SP / AR / Farmer / VCP / DFI / Foreign / Other
  - NRI prohibition rules
  - CTCL specs (CTCL is TCP/IP on MCX)
  - **BOD file specs** (pipe-delimited; 2 rows/client)
  - **EOD file specs**
  - Surveillance, position limits
  - Margin frameworks (commodity-specific scanrange, span)
  - Staggered delivery rules
  - Expiry-day rules (compulsory delivery, cash-settled distinction)
  - ERROR account requirements (₹10K/month penalty if not maintained)
  - Member compliance reporting

#### Agent 13 — Clearing corps (NSCCL + ICCL + MCXCCL)

- ISSUER: tag entries `NSCCL`, `ICCL`, or `MCXCCL` per actual issuer
- OUTPUT_PATH: `working/circulars/clearing-corps.md`
- ISSUER_DOMAIN: `nseindia.com` (for NSCCL), `bseindia.com` (for ICCL), `mcxccl.com` (for MCXCCL)
- SEED_URLS:
  - `https://www.nseindia.com/resources/exchange-communication-circulars` (filter to clearing)
  - `https://www.nseindia.com/products-services/clearing-and-settlement-clearing-corporation`
  - `https://www.bseindia.com/markets/MarketInfo/DispNewNoticesCirculars.aspx` (filter to ICCL)
  - `https://www.mcxccl.com/Default.aspx` (or whatever is the current MCXCCL site)
- FOCUS_AREAS:
  - Settlement obligations and timelines (T+0, T+1 default)
  - Margin calls and peak margin reporting (4 snapshots: 11:30, 12:30, 13:30, 14:30)
  - Default fund / Core SGF (Settlement Guarantee Fund) circulars
  - Auction mechanism
  - Give-up / take-up procedures
  - EOD MTM calculation
  - SPAN / scanrange file generation circulars
  - Settlement file specs (obligation file, payin/payout)
  - Final settlement files
  - Margin reporting from brokers to clearing (DMF, CFR)
  - Penalty schedules (margin shortfall, settlement default)

- [ ] **Step 2: Confirm dispatch**

After the single multi-Agent message lands, expect 13 "Async agent launched successfully" outputs with agent IDs. The harness will deliver completion notifications as each finishes. Phase 3 begins after all 13 are done.

---

## Phase 3 — Per-output verification (Task 6)

### Task 6: Verify each agent output against schema

**Files:**
- Read: `working/circulars/*.md` (13 files)
- Check: each conforms to `working/SCHEMA.md`

For each of the 13 files, run a verification pass.

- [ ] **Step 1: List output files and entry counts**

```bash
cd /home/rakesh/work/broking-kyc
for f in working/circulars/*.md; do
  echo "$f: $(grep -c '^## ' "$f") entries"
done
```

Expected: 13 files, total entries probably 300–800 across all issuers (rough ballpark — SEBI-MIRSD and NSE will dominate).

- [ ] **Step 2: Schema validation — each file**

For each file, verify:
1. Every `## <id>` section is followed by all required fields: `date_issued`, `issuer`, `title`, `applies_to`, `in_force_date`, `status`, `superseded_by`, `impact_areas`, `primary_url`, `archive_url`, and a `Summary:` line.
2. `status` values are within `in-force | superseded | withdrawn`.
3. `superseded_by` is non-empty whenever `status: superseded`.
4. `impact_areas` tags are all in the closed vocabulary from SCHEMA.md.
5. A `## OPEN_QUESTIONS` section exists at the bottom.

Use a quick grep-based check:

```bash
for f in working/circulars/*.md; do
  echo "=== $f ==="
  echo "  entries:        $(grep -c '^## [^O]' "$f")"
  echo "  has open Qs:    $(grep -c '^## OPEN_QUESTIONS' "$f")"
  echo "  missing date:   $(grep -c '^- date_issued: $' "$f")"
  echo "  superseded:     $(grep -c '^- status: superseded' "$f")"
  echo "  with sup_by:    $(grep -c '^- superseded_by: [A-Z]' "$f")"
done
```

Expected: every file has `has open Qs: 1`, the superseded count equals the with-sup_by count (every supersession has its target), `missing date` is 0.

- [ ] **Step 3: URL spot-check — sample 3 random entries per file**

For each file, pick 3 random entries, WebFetch each `primary_url`, and confirm:
- HTTP 200
- Page title or PDF metadata contains the entry's title (substring match, case-insensitive)
- Page contains the date_issued (in any common format)

Failed spot-checks → flag in `working/VERIFICATION_NOTES.md` for the consolidation step to address (likely re-dispatch the affected agent for those specific entries).

- [ ] **Step 4: Decide on re-dispatches**

If any agent's output:
- has fewer entries than rough floor (SEBI-MIRSD <40, NSE <40, RBI <20, CDSL/NSDL <30 are suspect),
- has >10% URL spot-check failures,
- or has malformed schema,

re-dispatch that agent with a corrective prompt that names the specific issues. Otherwise proceed to Phase 4.

---

## Phase 4 — Consolidation (Tasks 7–12)

### Task 7: Merge into master draft

**Files:**
- Create: `working/MASTER_DRAFT.md`

- [ ] **Step 1: Concatenate all working files into one draft**

```bash
cd /home/rakesh/work/broking-kyc
{
  echo "# Master Draft — all circular entries (pre-sort)"
  echo
  for f in working/circulars/*.md; do
    echo "<!-- source: $f -->"
    cat "$f"
    echo
  done
} > working/MASTER_DRAFT.md
echo "Total entries: $(grep -c '^## [^O]' working/MASTER_DRAFT.md)"
```

Expected: 300–800 entries (rough).

---

### Task 8: Sort, dedupe, supersession-chain check

**Files:**
- Modify: `working/MASTER_DRAFT.md`

- [ ] **Step 1: Sort by date_issued descending**

Read `working/MASTER_DRAFT.md`. Re-emit entries in descending order of `date_issued`. If same date, secondary sort by `issuer` alphabetical, then by `circular_id`.

Output back to `working/MASTER_DRAFT.md` with a `## SORTED_BY: date_issued desc, issuer asc, circular_id asc` marker at the top.

- [ ] **Step 2: Dedupe by circular_id**

Some joint circulars (e.g., SEBI + exchange) may have been picked up by two agents. For each duplicate `circular_id`:
- Prefer the entry from the more authoritative source (SEBI > exchange for a joint circular; primary issuer wins).
- Merge non-conflicting fields if helpful (e.g., union of `impact_areas`).
- Drop the duplicate.

Log every dedup decision in `working/DEDUP_LOG.md` (one line per pair).

- [ ] **Step 3: Verify supersession chains**

For every entry with `status: superseded` and a non-empty `superseded_by`:
- Confirm the target `circular_id` exists in the master draft.
- If not, either (a) the agent missed the target — flag for re-research, or (b) the target is older than 2020 and out-of-window — leave a note in the entry: `(supersedes-target out of 2020-2026 window)`.

Write the chain-check results to `working/SUPERSESSION_CHECK.md`.

---

### Task 9: Build changelog vs. prior 37-entry list

**Files:**
- Read: `kyc-docs-site/src/content/docs/reference/regulatory-circulars.md` (current state)
- Create: `kyc-docs-site/src/content/docs/reference/circulars-changelog.md`

- [ ] **Step 1: Extract prior IDs**

```bash
grep -oE '(SEBI|RBI|NPCI|CERSAI|MeitY)[/A-Z0-9_-]+' /home/rakesh/work/broking-kyc/kyc-docs-site/src/content/docs/reference/regulatory-circulars.md | sort -u > /tmp/prior-ids.txt
wc -l /tmp/prior-ids.txt
```

Expected: roughly 37 lines (matches the prior count).

- [ ] **Step 2: Extract new IDs**

```bash
grep -oE '^## [A-Z][A-Z0-9_/.-]+' /home/rakesh/work/broking-kyc/working/MASTER_DRAFT.md | sed 's/^## //' | sort -u > /tmp/new-ids.txt
wc -l /tmp/new-ids.txt
```

- [ ] **Step 3: Compute deltas**

```bash
comm -23 /tmp/new-ids.txt /tmp/prior-ids.txt > /tmp/added.txt
comm -13 /tmp/new-ids.txt /tmp/prior-ids.txt > /tmp/removed.txt
comm -12 /tmp/new-ids.txt /tmp/prior-ids.txt > /tmp/retained.txt
echo "Added: $(wc -l < /tmp/added.txt)"
echo "Removed: $(wc -l < /tmp/removed.txt)"
echo "Retained: $(wc -l < /tmp/retained.txt)"
```

- [ ] **Step 4: Write changelog**

Write `kyc-docs-site/src/content/docs/reference/circulars-changelog.md` with structure:

```markdown
---
title: Circulars Index — Changelog
description: What's new, changed, superseded, or removed compared to the prior 37-entry hand-curated list.
---

> **Why this page?** The circulars index was re-swept on 2026-05-14 across 13 issuers (SEBI, RBI, NPCI, CERSAI, MeitY, FIU-IND, CDSL, NSDL, NSE, BSE, MCX, NSCCL, ICCL, MCXCCL) over the 2020-01-01 → 2026-05-14 window. This page tracks the delta against the prior list so editors, operators, and capability-demo readers can see what changed.

## Summary

- Total entries before: 37
- Total entries after: <COMPUTED>
- Newly added: <N>
- Carried forward unchanged: <N>
- Superseded since prior compile: <N>
- Withdrawn since prior compile: <N>
- Removed (out of scope on re-review): <N>

## Newly added (grouped by issuer)

<list of `<circular_id>` — `<short reason / topic>`>

## Carried forward unchanged

<list of `<circular_id>`>

## Superseded since prior compile

<table: original_id → superseded_by_id, date of supersession>

## Withdrawn since prior compile

<list with brief reason>

## Removed (out of scope on re-review)

<list with brief reason — e.g., not applicable to broking ops on re-read>

## Verified through

2026-05-14
```

Fill in `<COMPUTED>` and `<N>` from the previous step's actual numbers. Fill in the lists from the delta files plus per-entry context from `working/MASTER_DRAFT.md`.

---

### Task 10: Sub-page split decision

**Files:**
- Possibly create: `kyc-docs-site/src/content/docs/reference/circulars/<issuer-slug>.md`

- [ ] **Step 1: Count entries per issuer in the master draft**

```bash
grep -E '^- issuer: ' /home/rakesh/work/broking-kyc/working/MASTER_DRAFT.md | sort | uniq -c | sort -rn
```

- [ ] **Step 2: Apply split rule**

For every issuer with >60 entries, create a sub-page. Otherwise keep that issuer inline in the master index.

For each issuer to split, create `kyc-docs-site/src/content/docs/reference/circulars/<issuer-slug>.md`:

```markdown
---
title: <Issuer> Circulars
description: Full list of <Issuer> circulars in the 2020-01-01 → 2026-05-14 window. Linked from the master regulatory circulars index.
---

> **Why this page?** Issuer-scoped subset — used when the master index would otherwise be too dense to read.

## TL;DR

- <3–5 bullets summarizing this issuer's most-impactful circulars in the window>

## Conceptual overview

<1–2 paragraphs: what this issuer regulates, what the broker / depository / exchange must do in response to its circulars, where the dependencies sit>

## All circulars (descending date)

<table with columns: ID | Date | Title | In-force | Status | Impact areas | Link>

## Practical notes

- [industry practice] <…>
- [gotcha] <…>
- [cost optimization] <…>
- [risk trade-off] <…>

## Verified through

2026-05-14
```

The master index then shows summary rows for split issuers with a "see full list" link.

---

### Task 11: Replace `regulatory-circulars.md`

**Files:**
- Modify: `kyc-docs-site/src/content/docs/reference/regulatory-circulars.md`

- [ ] **Step 1: Compose new master index**

Replace the file entirely with:

```markdown
---
title: Regulatory Circulars
description: Verified index of SEBI / RBI / NPCI / CERSAI / MeitY / FIU-IND / exchange / depository / clearing-corp circulars in force or recently superseded, 2020-01-01 → 2026-05-14.
---

> **Why this page is structured this way:** TL;DR for capability-demo readers up top → most-impactful highlight panel → full sortable index by date → per-issuer sub-pages where volume warranted. Operator readers can land directly on filter chips; KB readers see everything.

## TL;DR

- <COMPUTED total> circulars indexed across 14 issuers.
- Window: 2020-01-01 → 2026-05-14. Re-verified 2026-05-14.
- Coverage spans regulatory norms AND operational/file-format circulars (BOD/EOD files, settlement specs, margin frameworks).
- Disclaimer: AI-generated summaries; **read the linked PDF before acting on any provision**.

## Most-impactful 12–15 circulars (curated)

<table — selected from the full index. Curation criteria: each row materially changes broker/depository/exchange behaviour, OR is widely cited in industry practice, OR is the basis of a downstream design decision in this site>

| ID | Date | Issuer | Title | Impact |
| --- | --- | --- | --- | --- |
| <row> | <…> | <…> | <…> | <…> |

## Full index (descending date)

<see [Changelog](./circulars-changelog) for delta from prior version>

Filter (operator path): <Onboarding | Re-KYC | RMS | Settlement | Reporting | Surveillance | DPDP | All> *(filter chips ship as a separate UI piece; this page renders the full table for now)*

| ID | Date | Issuer | Applies to | In-force | Status | Impact areas | Title | Link |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| <one row per entry, sorted by date desc>

## Per-issuer pages (split where volume warranted)

- [SEBI-MIRSD circulars](./circulars/sebi-mirsd) *(if split)*
- [RBI circulars](./circulars/rbi) *(if split)*
- [NSE circulars](./circulars/nse) *(if split)*
- *(... any other split issuers ...)*

## Practical notes

- **[industry practice]** Operators typically cite circulars by short-form (e.g., "Oct 2023 master circular for stock brokers") rather than full ID in informal comms; this page is the canonical lookup for the actual IDs.
- **[gotcha]** SEBI re-numbered some master circulars in 2025; the `superseded_by` chain is the only safe way to track current-in-force versions.
- **[cost optimization]** Subscribing to issuer email lists (SEBI / NSE / BSE / MCX / RBI) costs nothing and removes the need for periodic site-scraping — recommended for ops teams.
- **[risk trade-off]** Operational circulars from exchanges supersede informally via "notices" rather than full circulars; member compliance teams should track BOTH channels.

## Verified through

2026-05-14

---

*AI-generated and not legal advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*
```

Fill the curated highlight table with 12–15 hand-picked rows (selection criteria documented inline). Fill the full index from `working/MASTER_DRAFT.md` post-dedup.

- [ ] **Step 2: Verify file renders in Astro Starlight**

```bash
cd /home/rakesh/work/broking-kyc/kyc-docs-site && ./dev.sh
```

Open `http://localhost:4321/broking-kyc/reference/regulatory-circulars/` and confirm:
- Page loads
- Table renders without truncation
- Internal links resolve

`./stop.sh dev` when done.

---

### Task 12: Commit consolidation

- [ ] **Step 1: Stage and commit**

```bash
cd /home/rakesh/work/broking-kyc
git add kyc-docs-site/src/content/docs/reference/regulatory-circulars.md
git add kyc-docs-site/src/content/docs/reference/circulars-changelog.md
git add kyc-docs-site/src/content/docs/reference/circulars/ 2>/dev/null || true
git commit -m "$(cat <<'EOF'
Refresh circulars index: 2020-2026 verified sweep across 14 issuers

Replaces the 37-entry hand-curated list with a comprehensive index covering
regulatory and operational circulars from SEBI, RBI, NPCI, CERSAI, MeitY,
FIU-IND, CDSL, NSDL, NSE, BSE, MCX, NSCCL, ICCL, MCXCCL. Adds a delta
changelog and per-issuer sub-pages where volume warranted.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Phase 5 — Cross-link sweep (Tasks 13–15)

### Task 13: Find all citations in existing docs

**Files:**
- Read: `kyc-docs-site/src/content/docs/**/*.{md,mdx}`
- Excluded: `kyc-docs-site/src/content/docs/reference/regulatory-circulars.md` (the index itself)
- Excluded: `kyc-docs-site/src/content/docs/reference/circulars-changelog.md`
- Excluded: `kyc-docs-site/src/content/docs/reference/circulars/`

- [ ] **Step 1: Grep for circular ID patterns**

```bash
cd /home/rakesh/work/broking-kyc/kyc-docs-site/src/content/docs
grep -rEn '(SEBI|RBI|NPCI|MeitY)[/A-Z0-9._-]+(/[0-9]{4})?' . \
  --include='*.md' --include='*.mdx' \
  --exclude='reference/regulatory-circulars.md' \
  --exclude='reference/circulars-changelog.md' \
  --exclude-dir='circulars' \
  > /tmp/citations.txt
wc -l /tmp/citations.txt
```

- [ ] **Step 2: Cross-reference each citation against the new index**

For each citation in `/tmp/citations.txt`, confirm the cited ID exists in the new master index. Build:
- `/tmp/citations-resolved.txt` — citations whose IDs exist.
- `/tmp/citations-orphaned.txt` — citations whose IDs don't exist (typo? superseded? out of scope?).

Each orphan needs a decision: (a) typo — fix to correct ID; (b) superseded — point to new ID; (c) out-of-scope — add to index as a borderline case; (d) typo for a non-existent ID — remove the citation.

---

### Task 14: Apply cross-link updates

**Files:**
- Modify: each file in `/tmp/citations.txt`

- [ ] **Step 1: For each file with citations, update**

Make every citation a markdown link to the master index, anchored to the entry's `circular_id` slug:

Example before:
```
per SEBI/HO/MIRSD/MIRSD-SEC-2/P/CIR/2023/168
```

Example after:
```
per [SEBI/HO/MIRSD/MIRSD-SEC-2/P/CIR/2023/168](/broking-kyc/reference/regulatory-circulars/#sebi-ho-mirsd-mirsd-sec-2-p-cir-2023-168)
```

(Use the Astro Starlight base path `/broking-kyc/...`.)

- [ ] **Step 2: Resolve every orphan**

Apply the decision from Task 13 Step 2 for each orphan. Document any controversial calls in a `working/ORPHAN_DECISIONS.md` for review.

---

### Task 15: Commit cross-link sweep

- [ ] **Step 1: Stage and commit**

```bash
cd /home/rakesh/work/broking-kyc
git add kyc-docs-site/src/content/docs/
git commit -m "$(cat <<'EOF'
Cross-link circular citations to refreshed index

Every doc-site citation of a circular ID now links to its entry in the
master regulatory circulars index. Orphan citations resolved per
working/ORPHAN_DECISIONS.md.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Phase 6 — Polish (Tasks 16–18)

### Task 16: Sync README highlight table

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Replace the current 20-entry table**

The current README has a 20-entry "Key Regulatory References" table at the bottom. Replace it with the same 12–15 curated highlight rows used in `regulatory-circulars.md` master index, so the two are consistent.

Update the line `See the full [Regulatory Circulars](https://javajack.github.io/broking-kyc/reference/regulatory-circulars/) (37 entries with official links)` to reflect the new count.

- [ ] **Step 2: Verify rendering**

Preview the README on GitHub or via a local markdown viewer. Confirm table renders, links resolve, count line is accurate.

---

### Task 17: Apply documentation conventions to landing artifacts

**Files:**
- Modify: `kyc-docs-site/src/content/docs/reference/regulatory-circulars.md`
- Modify: `kyc-docs-site/src/content/docs/reference/circulars-changelog.md`
- Modify: each per-issuer sub-page if created

- [ ] **Step 1: Confirm conventions present on each landing artifact**

For each of the master index, the changelog, and any per-issuer sub-page, confirm:

1. **Why-this-order note** is present near the top (1–2 sentences explaining structural choice).
2. **TL;DR** section (3–5 bullets) is the first content section after frontmatter.
3. **Conceptual overview** paragraph exists before the mechanics tables.
4. **Practical notes** section exists at the bottom (tagged `[gotcha]`, `[industry practice]`, `[cost optimization]`, `[risk trade-off]`).
5. **Verified through: 2026-05-14** stamp present.
6. AI-generated + not-legal-advice disclaimer line present.

Anything missing — add it. Reference the documentation-conventions memory entry if uncertain.

---

### Task 18: Commit polish

- [ ] **Step 1: Stage and commit**

```bash
cd /home/rakesh/work/broking-kyc
git add README.md
git add kyc-docs-site/src/content/docs/reference/regulatory-circulars.md
git add kyc-docs-site/src/content/docs/reference/circulars-changelog.md
git add kyc-docs-site/src/content/docs/reference/circulars/ 2>/dev/null || true
git commit -m "$(cat <<'EOF'
Apply documentation conventions to circulars index and changelog

Add TL;DR, why-this-order, conceptual overview, practical notes, and
verified-through stamp to the master index, changelog, and per-issuer
sub-pages. Sync README highlight table to match the curated 12-15.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Phase 7 — Cleanup (Tasks 19–20)

### Task 19: Delete working directory

**Files:**
- Delete: `working/`

- [ ] **Step 1: Delete the working dir**

```bash
rm -rf /home/rakesh/work/broking-kyc/working/
```

- [ ] **Step 2: Verify clean**

```bash
cd /home/rakesh/work/broking-kyc
git status
```

Expected: clean tree, no untracked files.

---

### Task 20: Final verification

- [ ] **Step 1: Build the site**

```bash
cd /home/rakesh/work/broking-kyc/kyc-docs-site
./prod.sh
```

Expected: Astro build succeeds; no broken links reported. Browse to:
- `http://localhost:4322/broking-kyc/reference/regulatory-circulars/` — master index
- `http://localhost:4322/broking-kyc/reference/circulars-changelog/` — changelog
- Sample one of the docs that previously cited a circular (e.g., `journey/02-pan-dob/`) — confirm the link goes to the right index anchor.

`./stop.sh prod` when done.

- [ ] **Step 2: Summary commit (none expected — but if any straggler changes)**

```bash
cd /home/rakesh/work/broking-kyc
git status
```

If anything is uncommitted, decide whether to commit it as a follow-up or revert.

- [ ] **Step 3: Update memory**

Update `/home/rakesh/.claude/projects/-home-rakesh-work-broking-kyc/memory/regulatory_anchors.md` with the new entry count and the verified-through date. Update `MEMORY.md` index line accordingly.

---

## Self-review (run at end of writing this plan)

**Spec coverage** — each section of the design spec maps to a task:
- "Per-entry schema" → Task 2.
- "Output files" → Task 11 (master index), Task 9 (changelog), Task 10 (sub-pages).
- "Three-layer rendering" → Task 11 (highlight panel = demo; full index = KB; filter-chip stubs for operator, full filter UI deferred per spec).
- "Citation rigor" → Task 6 (per-output verification), Task 17 (verified-through stamp), Task 11 (disclaimer).
- "Vendor naming policy" (this sub-project) → embedded in Task 5 agent prompts via `working/AGENT_PROMPT.md` rules.
- "Workflow: parallel sweep" → Task 5 (single dispatch of all 13 agents).
- "Documentation conventions" → Task 17 explicitly verifies each landing artifact.

**Placeholder scan** — searched for `TBD`, `TODO`, "implement later", "fill in details", "Similar to Task N", "add appropriate error handling". None present. Each agent prompt is fully expanded; consolidation steps include actual commands.

**Type consistency** — field names used consistently across SCHEMA, AGENT_PROMPT, and consolidation tasks: `circular_id`, `date_issued`, `issuer`, `title`, `applies_to`, `in_force_date`, `status`, `superseded_by`, `impact_areas`, `primary_url`, `archive_url`. All match.

---

## Risks and contingencies

- **Rate-limiting on issuer sites.** Likely on SEBI and exchange archives. Agents should pace WebFetch calls; consolidation can re-dispatch with smaller batches if blocked.
- **JavaScript-heavy archive pages** (some SEBI/exchange pages). If WebFetch can't reach a real circular listing, fall back to WebSearch for individual circulars and use issuer's PDF subdomain or archive.org.
- **Schema drift across agents.** Verification step (Task 6) catches this; re-dispatch with a corrective prompt for the affected agent.
- **Orphan citations after cross-link sweep.** Documented in `working/ORPHAN_DECISIONS.md`; visible in the consolidation commit for user review.
- **Site build failures from new heavy tables.** Astro renders fine for large tables but search index (Pagefind) may need a re-index. Task 20 confirms.

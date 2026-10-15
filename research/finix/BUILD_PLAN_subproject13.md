# Finix depth pass — build plan (sub-project #13)

Started 2026-10-15. Extends `finix-broking-setup` (88 pages from sub-project #12).

## Brief (user, 2026-10-15)

Reason like an experienced broker *starting up in 2026* and fill the missing parts:
compliance, MTF, pledging, F&O process, "which files come from which exchange for what
process and how those files are dealt with", KYC/compliance/audit mechanics and **who in
a team is responsible for what**, the **near-real-time and real-time monitoring and data
sharing obligations** toward exchanges, and — the flagship — **one page with ALL the
checklists and every activity that must happen like clockwork every trading day**.
Also drill back into every existing plane to add missed nuance; the user's own examples:
*how pay-in and pay-out affect limits*, *how different kinds of charges affect limits and
the ledger*, *how many usual and unusual activities are done in back office, OMS, RMS*.
All new 2026 rules must be captured.

Explicitly authorised: research agents. (Codex MCP server was down — CONNECTION_CLOSED.)

## Research threads (8 parallel agents → working/finix2/RESEARCH_*.md)

| # | File | Scope |
|---|---|---|
| 1 | RESEARCH_files.md | Exchange / clearing-corp / depository file register: names, portals, timings, formats, consumers |
| 2 | RESEARCH_monitoring.md | Real-time + periodic submissions, alerts received, incident reporting, AML reporting |
| 3 | RESEARCH_mtf_pledge.md | MTF 2026 rules; pledge/re-pledge/invocation lifecycle across CDSL + NSDL |
| 4 | RESEARCH_fno.md | Contract lifecycle, expiry standardisation, physical settlement, position limits, F&O margin |
| 5 | RESEARCH_2026_changes.md | Every 2025–26 regulatory change + "notified vs effective vs merely proposed" |
| 6 | RESEARCH_roles_audit.md | Statutory + operational roles, NISM mapping, SoD, the full audit register |
| 7 | RESEARCH_charges_limits.md | Every charge and rate; event → ledger → limit → timing matrix |
| 8 | RESEARCH_commodity_currency.md | MCX delivery/warehousing; currency + IRD operations |

Evidence discipline (lesson from the BSE/IML error in #12): every agent must tag each fact
[verified] / [likely] / [uncertain] / [unknown] and is forbidden from inventing filenames,
circular numbers, rates or timings. Anything not [verified] carries an on-page caution.

## Page inventory — 49 new pages

### New plane `files/` — Files and data interchange (10)
- index.md
- 01-file-register-architecture.mdx — transport, scheduling, naming, idempotency, the per-day-type expected-file manifest
- 02-nse-files.mdx
- 03-bse-files.mdx
- 04-mcx-files.mdx
- 05-clearing-corporation-files.mdx
- 06-depository-files.mdx
- 07-outbound-submissions.mdx
- 08-file-handling-exceptions.mdx — late / missing / partial / corrupt / duplicate / **revised** files, reprocessing
- 09-bank-payment-files.mdx

### New plane `monitoring/` — Monitoring and data sharing (7)
- index.md
- 01-monitoring-obligation-map.mdx
- 02-realtime-near-realtime.mdx
- 03-periodic-submissions.mdx
- 04-alerts-received-and-response.mdx
- 05-incident-breach-reporting.mdx
- 06-aml-monitoring-reporting.mdx

### New plane `products/` — Product operations (10)
- index.md
- 01-mtf-operations.mdx
- 02-pledge-lifecycle.mdx
- 03-fno-contract-lifecycle.mdx
- 04-expiry-physical-settlement.mdx
- 05-commodity-delivery-operations.mdx
- 06-currency-ird-operations.mdx
- 07-slbm-operations.mdx
- 08-ipo-mf-bonds-operations.mdx
- 09-product-enablement-matrix.mdx

### New plane `roles/` — People and accountability (6)
- index.md
- 01-role-register.mdx
- 02-raci-trading-day.mdx
- 03-raci-periodic-compliance.mdx
- 04-segregation-access-control.mdx
- 05-escalation-oncall.mdx

### New plane `certification/` — Exchange software certification and change control (6)
*(added mid-build on user request 2026-10-15: "how mobile and web app submission,
certification process happens in respect to exchanges, when there is any change in OMS,
RMS logic or version how it gets checked, submitted etc with exchanges, how mock
participation happens, how mocks are arranged")*
- index.md
- 01-software-approval-regime.mdx — what needs approval vs empanelment vs intimation
- 02-mobile-web-app-submission.mdx — IBT/mobile app submission, security audit, 2FA, disclosures
- 03-ctcl-nnf-terminal-registration.mdx — terminal and user-ID registration, location reporting, the register
- 04-change-version-control.mdx — change classification, re-certification triggers, mandated API versions, change-freeze windows
- 05-mock-trading-and-drills.mdx — mock scheduling, enrolment, mandatory participation, evidence, DR drills

### Additions to existing planes (10)
- daily-ops/10-master-trading-day-checklist.mdx — **FLAGSHIP**, superset of every runbook
- oms/11-operations-catalogue.mdx
- rms/10-limit-impact-matrix.mdx — **user's explicit example**
- rms/11-operations-catalogue.mdx
- backoffice/11-charges-billing-engine.mdx
- backoffice/12-operations-catalogue.mdx
- money/08-money-operations-catalogue.mdx
- onboarding/08-kyc-ops-quality-audit.mdx
- compliance/05-audit-machinery.mdx
- compliance/06-regulatory-change-2026.mdx

## Enrichment pass (existing 88 pages)

Target the nuances the user named, then sweep for others:
- pay-in / pay-out → limit timing (money plane, rms plane)
- charge classes → ledger and limit effect (backoffice, funds-tax cross-link)
- usual vs unusual operator activity per system
- per-plane: anything the research threads surface that contradicts or deepens what is written

## Conventions

Identical to sub-project #12 — see working/finix/BUILD_PLAN.md section "Page conventions".
New config keys continue `finix.<plane>.<domain>.<item>[.<scope>]`.
Classification stays **R** regulatory / **E** exchange-set / **D** discretionary.

## Progress

- [x] survey existing 88 pages + 322-page site, gap list
- [x] build plan
- [ ] research threads land
- [ ] write 43 pages
- [ ] enrichment pass
- [ ] diagrams
- [ ] sidebar wiring
- [ ] glossary additions
- [ ] abbr pass, link validation, build

---

## STATUS as of 2026-10-15 — PAUSED (usage limit)

### Written (7 pages, ~26,600 words) — ON DISK, NOT COMMITTED

| Page | Words |
|---|---|
| oms/11-operations-catalogue.mdx | 4,067 |
| rms/10-limit-impact-matrix.mdx | 5,015 |
| rms/11-operations-catalogue.mdx | 3,554 |
| backoffice/12-operations-catalogue.mdx | 3,751 |
| money/08-money-operations-catalogue.mdx | 3,519 |
| files/01-file-register-architecture.mdx | 3,689 |
| files/08-file-handling-exceptions.mdx | 3,044 |

### IMPORTANT: dangling links

The 7 pages above cross-link forward to pages not yet written. Before any build or
link validation is trusted, either write the remaining pages or strip these links:
- files/02..07, files/09
- monitoring/* (all)
- products/01, 02, 09
- roles/01, 02, 04
- daily-ops/10-master-trading-day-checklist
- backoffice/11-charges-billing-engine
- compliance/05, 06
- onboarding/08

Nothing is wired into astro.config.mjs yet, so these are orphan pages until the
sidebar is updated.

### Research threads

8 agents were dispatched. **All 8 died on a session rate limit before writing any
RESEARCH_*.md file.** No research output survived. Decision taken on resume: do NOT
re-dispatch broad agents. Instead ground the pages in the repo's own 322 pages of
already-researched coverage (deep-dives on MTF, pledge, physical settlement, position
limits, charges, audits, CSCRF, surveillance, settlement), cross-link to them, and do
narrow targeted verification only where a specific 2026 figure is load-bearing.
Anything not verifiable carries an on-page caution, per the #12 convention.

### Remaining: 36 pages

files 8 · monitoring 7 · products 7 · roles 6 · daily-ops 1 (flagship checklist)
· backoffice 1 · compliance 2 · onboarding 1 · plus diagrams, sidebar, glossary,
abbr pass, link validation, build.

### Resume order recommended

1. Read the landed RESEARCH_*.md files.
2. Write daily-ops/10-master-trading-day-checklist.mdx — the user's flagship ask,
   and the page with most standalone value.
3. roles/ plane (user asked who is responsible for what).
4. files/02..09 from RESEARCH_files.md.
5. monitoring/ from RESEARCH_monitoring.md.
6. products/ from RESEARCH_mtf_pledge.md, RESEARCH_fno.md, RESEARCH_commodity_currency.md.
7. backoffice/11 from RESEARCH_charges_limits.md; compliance/05-06 from
   RESEARCH_roles_audit.md and RESEARCH_2026_changes.md.
8. Then the enrichment pass over the original 88 pages.

---

## COMPLETED — 2026-10-15

**49 new pages** in `finix-broking-setup`, taking the section from 88 to 137 pages.
Site total 372 pages. **6,130 internal links, 0 broken.** Glossary 219 → 232 entries.

### Planes delivered

| Plane | Pages | Note |
|---|---|---|
| files/ | 10 | NSE register verified against live sources; BSE and MCX honest about what was unreachable |
| monitoring/ | 7 | Real-time, periodic, inbound alerts, incidents, AML |
| products/ | 10 | MTF, pledge, F&O lifecycle, expiry/physical, commodity, currency, lending, primary market, enablement |
| roles/ | 6 | Role register, two RACI matrices, segregation, escalation |
| certification/ | 6 | Added mid-build on user request: approval regime, app submission, terminal registration, change control, mocks and drills |
| additions | 10 | Master checklist, limit-impact matrix, four operations catalogues, charges engine, audit machinery, change register, KYC ops |

### Research

Nine codex-exec threads (the codex MCP server was down; `codex exec` with web search
was used instead) plus recovered subagent output, totalling ~184,000 words of
primary-source research in `working/finix2/RESEARCH_*.md`. Every fact carries an
evidence class. The agents' own "gaps and cautions" sections are reproduced as
on-page cautions rather than smoothed over.

### Corrections made to EXISTING content

1. **segment-rules-comparison.mdx** — SOMM was expanded as "Self-Originated Member
   Margin". Corrected to **Short Option Minimum Margin**, verified against MCXCCL's
   own risk-management FAQ. Glossary entry added recording that it does **not** exist
   in Indian equity derivatives (abolished 1 June 2020).
2. **rms/10-limit-impact-matrix.mdx** (written earlier in this same build) — framed the
   cash-equivalent minimum as a per-client constraint. Corrected: it applies at
   **clearing-member level**, and the regulator has expressly stated there need be no
   minimum at each individual client level. What binds a cash-poor client is usually the
   firm's own policy, which must be disclosed as policy rather than as regulation.
3. Two circular anchors (`NSE/CMTR/57270`, `NSE/FAOP/57264`) were cited as index
   anchors but are only body-text mentions, not headings. Downgraded to
   `[not yet in index]`.

### Checks that found NO error (recorded so they are not repeated)

- No equity-F&O page asserted a short option minimum margin.
- The glossary already had NNF correct as **Non-NEAT Front End** (not "Neat-on-Net").
- The site already reflected the **IRRA discontinuation** (7 May 2026) correctly.
- The site already used **ComRIS** correctly, not COMTRACK.

### Open items for a future pass

- **Project Jagrook circular number is now verified** —
  HO/38/24/(15)2026-MIRSD-PODMMC/I/22872/2026, 1 Oct 2026, transition 5–31 Oct,
  permanent from 1 Nov 2026. This closes an open item from sub-project #12.
- **Settlement-price method** changed with the Closing Auction Session (3 Aug 2026) and
  a reversal decision was pending before the regulator's advisory committee at research
  time. Flagged on-page; re-verify first.
- **BSE** could not be read at all (site serves nav shell; data interface access-denied).
  Its file register, form codes, penalty rates and identifier schema remain unobtained.
  A browser-driven pass would close this.
- **MCX** consolidated terminal-connectivity master not downloadable; member file
  inventory and upload schemas unobtained.
- **Corporate actions on pledged stock** — only the automatic mechanism is verified.
  Deliberately not asserted; confirm with the depository before documenting.
- Several rates and figures are secondary-sourced and marked as placeholders that must
  not reach production.

---

## SUB-PROJECT #14 — order path, eventing and architecture deep dive (IN PROGRESS)

User brief (2026-10-15): go deep on the order path and nuances not yet captured; the
reverse path and its effect on limits; how many times SPAN and other files arrive per
day and what they impact; what system monitoring must be communicated to the exchange;
how DR sites are planned; how the confluence of systems sits behind a BFF API with an
eventing model handling order placement, in-flight and reverse paths; how pay-in and
pay-out drive real-time limit updates; whether near-real-time or "virtual" contract
notes are possible; how the depositories are interacted with for files — in the context
of the named stack or in general. Plus a **second pass on the master trading-day
checklist** to add items missed first time.

### Written and committed

| Page | Note |
|---|---|
| `stack/bff-and-event-architecture` | Gateway-vs-risk boundary, commands vs events, ordering and idempotency, in-flight state, back-pressure, **never retry an unacknowledged order send** |
| `files/10-ingestion-cadence-map` | Per-segment parameter batch counts, the random snapshot regime, ~40–50 ingest-and-apply events a day, and a file→systems-touched matrix |
| `money/09-realtime-limit-updates` | Why a periodic extract cannot be real-time; the **delta-plus-extract** design with zero-tolerance per-client drift reconciliation |
| `monitoring/07-system-monitoring-to-exchange` | **The decisive finding**: a non-designated broker pushes NO continuous telemetry; designated brokers serve a named parameter set monitored in real time. Pull-vs-push unresolved in primary material and flagged. No exchange-installed agent in any source |
| `daily-ops/10-master-trading-day-checklist` | **Second pass: 164 → 198 items.** Also corrected a figure I had overstated ("roughly two hundred and sixty") to the real count |

### STILL TO WRITE — research is ready on disk

| Page | Research file | Status |
|---|---|---|
| `oms/12-order-path-edge-cases` | `RESEARCH_orderpath.md` (14,486 words) | **Research complete, page not written.** Drop copy, order-state recovery after disconnect, sequence gaps, quantity/price freeze, self-trade prevention, trade modification, partial fills and the auction session's effect, unsolicited messages, ETI session-model differences |
| `backoffice/13-near-realtime-contract-notes` | `RESEARCH_contractnotes.md` (8,808 words) | **Research complete, page not written.** Answers whether an intraday/provisional/"virtual" contract note is a real artefact |
| `files/06` additions, or a new page | `RESEARCH_depository_apis.md` (8,179 words) | **Research complete.** Real-time vs batch depository operations, authorisation flows, which operations are synchronous |
| `stack/vendor-interface-reality` or a `stack/vendor-map` addition | `RESEARCH_vendor_apis.md` (6,079 words) | **Research complete.** What vendors actually publish about interfaces and eventing — grounds the "in context of Saral" framing with evidence |
| `stack/disaster-recovery-architecture` | **`RESEARCH_dr.md` — NOT PRODUCED** | The thread did not complete. Open questions below |

### Open DR questions, for a future research pass

- Does a member need exchange connectivity provisioned to the recovery site in advance?
- Are exchange user, terminal and box identifiers tied to a location or address, and must recovery-site identifiers be separately registered?
- What must the member tell the exchange before or during a failover?
- Does the exchange provide any facility to assist member failover?
- Separate connectivity charges for a recovery link?
- What happens to in-flight orders on failover, and is there an exchange order-state recovery facility?
- Active-active vs active-passive: any regulatory preference?

The regulatory *drill* regime (thresholds, frequencies, recovery objectives, site
separation, penalties) IS already documented in
`certification/05-mock-trading-and-drills` and `monitoring/05-incident-breach-reporting`
— what is missing is the **architecture and exchange-connectivity** dimension.

### Note on tooling

Codex exhausted its account usage limit partway through this pass and the four threads
died; the work was redone with Claude agents. When codex became available again it was
given two *different* topics to avoid duplicating the running agents. The research
corpus is now committed under `research/finix/` precisely because it keeps being
expensive to regenerate.

### RESEARCH_dr.md — LANDED, page not yet written

The thread completed after the commit above. 658 lines, 324 tagged facts (269 verified).
Key findings captured here so the page can be written without re-reading the file.

**Thresholds and the drill regime — all confirmed:**
- Recovery-site requirement: **50,000 clients across all exchanges**. **Not** the
  10,000-client figure that governs glitch-framework applicability — guard the distinction.
- "Specified stock brokers" = **top 20 per exchange** by internet/wireless clients, published annually.
- Drills: **half-yearly** full-trading-day for Specified members; **quarterly** for
  designated large brokers, with the literal requirement that they **"shall not coincide
  with drills conducted by Exchange"**.
- Recovery time objective **2 hours**, recovery point objective **15 minutes**.
- Different seismic zones, else **at least 250 km**.
- Missed drill: a first amount **plus a monthly amount while it continues, capped per
  instance** — and that penalty row is **"NA" for non-Specified brokers**.

**A real regulatory conflict to document rather than resolve:** the cyber framework's
recovery control, tagged mandatory for **all** regulated entities, requires declaring a
Disaster **within 30 minutes**, while the glitch guidelines define a disaster as a
**45-minute** disruption. Recovery objectives agree; the declaration clock does not, and
nothing reconciles them. **Run internal procedures to 30 minutes.**

**The architectural answers, which resolved sharply:**
- Exchange-terminal and terminal-converted identifiers are **legally pinned to one office
  address** — the undertaking says so in terms. **Only non-exchange-terminal identifiers
  may be mapped across cities**, and exchange-terminal login is **barred from colocation
  and third-party data centres**. Therefore **a remote recovery site must be
  own-front-end only.** This is the single most important design consequence.
- Connectivity: **no recovery-site tariff exists**; a recovery link is an ordinary
  connectivity scenario with ordinary processing fees and last-mile arrangements.
- Order-state recovery: the exchange's **per-stream download-request facility** is the
  recovery mechanism. Three hazards to design against: exception handling means the
  exchange **cancels outstanding orders and sends no cancellation messages**; a
  cancel-on-logout setting **can empty the order book at failover**; and orders are only
  cancellable from the **originating terminal mapping**.
- **No pre-failover notice obligation exists.** Disclosure is retrospective, through the
  next-day preliminary incident report, which asks whether operations moved to the
  recovery site and what the recovery time was — **a self-reported number that is the
  basis for the recovery-time-breach penalty**.
- **"Active-active" and "active-passive" appear zero times** across all eight primary
  documents examined. The regulator's own description of broker practice is
  **"independent cold sites"** — so the page should not frame this as a regulated choice.
- The investor risk reduction platform was discontinued 7 May 2026; the fallback is now
  **contingency pool trading from exchange premises**.

**Its own gaps:** the other two venues' identifier, charging and order-recovery mechanics
are unknown; one penalty annexure was read from a third-party mirror and **its figures
need re-verification**; and a 2024 market-infrastructure modification circular was not
retrievable, so the institution-side numbers may not be current.

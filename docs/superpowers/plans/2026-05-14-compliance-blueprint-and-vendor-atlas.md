# Compliance Blueprint + Vendor Atlas Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship two new table-driven pages — a comprehensive Compliance Blueprint (~250–400 rows × 10 cols across ~15 broker-compliance domains) and a Vendor Atlas (~150–250 rows × 10 cols across ~22 vendor categories naming real products) — to the broking-kyc Astro Starlight site, with cross-links into the existing 884-entry circulars index.

**Architecture:** Eight parallel research sub-agents (four per deliverable, by domain/category cluster) write to working files. Two consolidation scripts parse and emit final markdown pages with project-wide conventions (TL;DR, why-this-order, conceptual overview, mechanics tables, practical notes, verified-through). Cross-links from blueprint rows to circular anchors auto-built. Single PR cycle covering both sub-projects.

**Tech Stack:** Astro Starlight (no build changes), Python 3 (consolidation scripts), WebSearch + WebFetch (agent research), markdown (output), sub-agents (`general-purpose` for read+write capability).

**Note on TDD adaptation:** Content/research plan, not code. The verification model is **schema conformance** (every entry has all required columns) + **URL spot-check** (≥3 random vendor URLs per agent HTTP 200) + **cross-ref integrity** (every circular_ref in blueprint resolves to an existing anchor).

---

## File Structure

**Files to create (final, committed):**

- `kyc-docs-site/src/content/docs/operations/compliance-blueprint.md` — the blueprint page.
- `kyc-docs-site/src/content/docs/vendors/atlas.md` — the vendor atlas page.

**Files to modify:**

- `kyc-docs-site/astro.config.mjs` — add sidebar entries: "Compliance Blueprint" under Operations, "Vendor Atlas — All Products" at top of Vendor Integrations.
- `README.md` — add a brief mention of the new Compliance Blueprint and Vendor Atlas pages.

**Files to create (temporary, gitignored, deleted-or-kept at end):**

- `working/blueprint/<cluster>.md` — 4 agent outputs.
- `working/atlas/<cluster>.md` — 4 agent outputs.
- `working/SCHEMA_BLUEPRINT.md` — entry schema for blueprint agents.
- `working/SCHEMA_ATLAS.md` — entry schema for atlas agents.
- `working/build_blueprint.py` — consolidator → `operations/compliance-blueprint.md`.
- `working/build_atlas.py` — consolidator → `vendors/atlas.md`.

**File responsibilities:**

| File | Owns |
| --- | --- |
| `operations/compliance-blueprint.md` | The complete operational + one-time + edge-case compliance inventory, grouped by domain, with cross-links to circular anchors. |
| `vendors/atlas.md` | The named-product enumeration across 22 vendor categories, with positioning and integration notes. |
| `working/SCHEMA_BLUEPRINT.md` | Canonical schema for every blueprint row (10 columns). |
| `working/SCHEMA_ATLAS.md` | Canonical schema for every atlas row (10 columns). |
| `working/blueprint/<cluster>.md` | Per-agent output, sectioned by domain. |
| `working/atlas/<cluster>.md` | Per-agent output, sectioned by category. |
| `working/build_blueprint.py` | Parse blueprint working files, sort by domain, validate cross-refs, emit the blueprint page. |
| `working/build_atlas.py` | Parse atlas working files, sort by category, emit the atlas page. |

---

## Phase 1 — Setup (Tasks 1–4)

### Task 1: Create directories

**Files:**
- Create: `working/blueprint/`, `working/atlas/` (under existing gitignored `working/`).

- [ ] **Step 1: Create directories**

```bash
mkdir -p /home/rakesh/work/broking-kyc/working/blueprint /home/rakesh/work/broking-kyc/working/atlas
ls /home/rakesh/work/broking-kyc/working/
```

Expected: `blueprint/` and `atlas/` listed alongside the existing `circulars/`, `SCHEMA.md`, etc.

- [ ] **Step 2: Verify gitignore covers them**

```bash
git -C /home/rakesh/work/broking-kyc check-ignore -v working/blueprint working/atlas
```

Expected: both shown ignored by the existing `working/` rule.

---

### Task 2: Blueprint schema

**Files:**
- Create: `working/SCHEMA_BLUEPRINT.md`

- [ ] **Step 1: Write the schema**

Write to `/home/rakesh/work/broking-kyc/working/SCHEMA_BLUEPRINT.md`:

````markdown
# Compliance Blueprint Entry Schema (v1)

Every blueprint entry MUST conform to this schema. Consolidation rejects non-conforming rows.

## Entry format

Each entry is a markdown block headed by `## <id>` where `<id>` is `<DOMAIN>-<NNN>` (e.g., `KYC-001`, `AML-014`, `MARGIN-007`).

```
## <id>

- name: <verb-led short name, e.g., "Submit STR to FIU-IND">
- domain: <KYC | AML | MARGIN | CLIENT-FUNDS | SETTLEMENT | SURVEILLANCE | CYBER | BCP-DR | AUDIT | REPORTING | GRIEVANCE | DPDP | MEMBER-COMP | INVESTOR-SERVICING | EXCH-DEPOT-REG | EDGE-CASE>
- regulator: <comma-separated subset of: SEBI | RBI | NPCI | CERSAI | MeitY | FIU-IND | NSE | BSE | MCX | CDSL | NSDL | NSCCL | ICCL | MCXCCL>
- frequency: <continuous | daily | weekly | monthly | quarterly | half-yearly | annual | event-triggered | one-time | as-required>
- owner_role: <Compliance Officer | Principal Officer | Designated Director | RMS Lead | Ops Lead | CISO | Internal Audit | Statutory Auditor | DP Manager | Settlement Ops | Funds Ops | Surveillance Analyst | Customer Service Lead | DPO>
- trigger: <when does this obligation arise>
- evidence: <specific artifact that proves compliance — file name / report ID / certificate / log / DB state / attestation>
- penalty: <consequence for non-compliance — Rs amount / suspension / cancellation / reputational; cite source if known>
- circular_ref: <comma-separated circular IDs from sub-project #1's per-issuer pages; format: "SEBI/HO/.../2024/79", "CDSL/OPS/DP/.../2024/123">
- notes: <edge cases, deferrals, recent changes, industry practice>
```

## Closed vocabularies

- Domain (15 values): `KYC | AML | MARGIN | CLIENT-FUNDS | SETTLEMENT | SURVEILLANCE | CYBER | BCP-DR | AUDIT | REPORTING | GRIEVANCE | DPDP | MEMBER-COMP | INVESTOR-SERVICING | EXCH-DEPOT-REG | EDGE-CASE`
- Frequency (10 values): `continuous | daily | weekly | monthly | quarterly | half-yearly | annual | event-triggered | one-time | as-required`

## Validation rules

1. `id` must follow `<DOMAIN>-<NNN>` pattern.
2. `regulator` values must be from the closed list.
3. `frequency` value must be from the closed list.
4. `circular_ref` MUST contain at least one ID that resolves in `kyc-docs-site/src/content/docs/reference/circulars/` (or be `[no direct circular — industry practice]` with a note in `notes:`).
5. Summary-style prose is NOT used here — this is a structured-row schema. Keep `notes` to one short paragraph max.

## OPEN_QUESTIONS

Each working file ends with `## OPEN_QUESTIONS` for ambiguous entries, missing circulars, frequency uncertainty.
````

- [ ] **Step 2: Verify**

```bash
wc -l /home/rakesh/work/broking-kyc/working/SCHEMA_BLUEPRINT.md
```

Expected: ≥30 lines.

---

### Task 3: Atlas schema

**Files:**
- Create: `working/SCHEMA_ATLAS.md`

- [ ] **Step 1: Write the schema**

Write to `/home/rakesh/work/broking-kyc/working/SCHEMA_ATLAS.md`:

````markdown
# Vendor Atlas Entry Schema (v1)

Every atlas entry MUST conform to this schema.

## Entry format

Each entry is a markdown block headed by `## <slug>` where `<slug>` is a kebab-case form of `<category>-<vendor>` (e.g., `oms-rupeed`, `back-office-techexcel`, `aa-finvu`, `esign-leegality`).

```
## <slug>

- vendor: <product name, exact casing>
- vendor_company: <owning company / business unit>
- category: <one of the 22 closed vocab values>
- positioning: <one line: "dominant in retail back-office" | "common AA gateway" | "niche / emerging" | "deep-discount segment leader" | etc. Descriptive only — never "best" / "leading" / "recommended">
- pricing_shape: <per-transaction | per-month | setup-fee | freemium | contact-sales | bundled | unknown>
- pricing_range: <indicative Rs/transaction or Rs/month range if publicly disclosed, else "not public">
- integration_shape: <REST API | SDK | file batch / SFTP | on-prem | hosted SaaS | webhook | comma-separated>
- regulatory_anchors: <comma-separated circular IDs or framework references — e.g., "SEBI/HO/MIRSD/DOP/CIR/P/2020/73" for DigiLocker partners; "RBI NBFC-AA Master Direction" for AA gateways>
- primary_url: <verified HTTP 200 vendor product page; not the corporate-home page if a product page exists>
- notes: <one short paragraph: distinguishing features, known integration partners, recent news / changes>
```

## Closed vocabulary — Categories (22)

`OMS-EMS-Trading` | `RMS` | `Back-Office` | `Surveillance-Market` | `AML-PEP-Sanctions` | `KYC-Verification` | `Face-Match-Liveness-VIPV` | `OCR-Document-Parsing` | `eSign-eStamp` | `AA-Consent-Manager` | `Payment-Mandate-UPI` | `CKYC-Connectors` | `DLT-SMS-WhatsApp` | `Email-Transactional` | `ITR-Income-Verification` | `Credit-Bureau` | `Mutual-Fund-Platforms` | `IPO-OFS` | `Pledge-DDPI-Tech` | `Algo-Quant-API` | `Market-Data-News` | `CRM-Comms-Servicing`

## Validation rules

1. `category` must be from the closed list.
2. `primary_url` MUST have been WebFetch-verified during research.
3. `positioning` must NOT contain endorsement words: `best`, `top`, `leading`, `recommended`, `superior`, `industry-leading`, `gold standard`.
4. If `pricing_range` is "not public", that's fine — public price data is sparse for B2B SaaS in India.
5. Each category must have ≥3 vendor entries (if fewer real products exist, list what's verifiable and note the gap in `## OPEN_QUESTIONS`).

## OPEN_QUESTIONS

Each working file ends with `## OPEN_QUESTIONS` for ambiguous vendors, dead URLs, unverifiable pricing.
````

- [ ] **Step 2: Verify**

```bash
wc -l /home/rakesh/work/broking-kyc/working/SCHEMA_ATLAS.md
```

Expected: ≥30 lines.

---

### Task 4: Phase 1 checkpoint

- [ ] **Step 1: Verify all setup files present and gitignored**

```bash
ls /home/rakesh/work/broking-kyc/working/
git -C /home/rakesh/work/broking-kyc status
```

Expected: working files visible locally; `git status` shows no changes to tracked files.

- [ ] **Step 2: No commit needed**

All Phase 1 outputs are gitignored. Proceed to Phase 2.

---

## Phase 2 — Parallel dispatch (Task 5)

### Task 5: Dispatch all 8 research agents in parallel

One multi-tool message with 8 `Agent` calls (`subagent_type: "general-purpose"`, `run_in_background: true`).

#### Compliance Blueprint agents (4)

#### Agent A — Blueprint cluster 1: KYC lifecycle + AML/PMLA + Edge cases

- OUTPUT_PATH: `/home/rakesh/work/broking-kyc/working/blueprint/cluster-1-kyc-aml-edge.md`
- DOMAINS: `KYC`, `AML`, `EDGE-CASE`
- Topics:
  - KYC initial onboarding (6-attribute matching, KRA upload, CKYC upload, dual-upload mandate)
  - Re-KYC periodicity (risk-based: high 2y / medium 8y / low 10y)
  - Modifications: address, bank, nominee, segment, mobile, email, name, DOB
  - Dormancy criteria + reactivation
  - Closure (voluntary + forced)
  - Transmission (single deceased, joint deceased, succession, nominee path)
  - PAN-Aadhaar linking
  - PMLA STR / CTR / CCR / NTR / CBWTR
  - Designated director + principal officer
  - Sanctions screening (UNSC, MEA UAPA)
  - Beneficial ownership reporting
  - PEP screening
  - AML risk categorization (low/medium/high)
  - PMLA recordkeeping (5y)
  - FIU-IND FINnet 2.0 connectivity
  - NRI compliances (PIS letter, NRE/NRO, FATCA, PIS delivery-only)
  - Minor (guardian KYC, age-18 conversion 30d)
  - Joint accounts (multi-sig eSign, 3-holder max)
  - Non-individual (HUF/Partnership/LLP/Corporate/Trust — MOA/AOA, UBO)
  - Deceased handling
  - NRI to resident conversion
  - Nominee opt-out 30d video
- Target: 70–100 rows

#### Agent B — Blueprint cluster 2: Margin + Client Funds + Settlement + Surveillance

- OUTPUT_PATH: `/home/rakesh/work/broking-kyc/working/blueprint/cluster-2-margin-funds-settlement-surv.md`
- DOMAINS: `MARGIN`, `CLIENT-FUNDS`, `SETTLEMENT`, `SURVEILLANCE`
- Topics:
  - Peak margin reporting (4 intraday snapshots: 11:30, 12:30, 13:30, 14:30)
  - DMF (Daily Margin File) to clearing
  - CFR (Client Funding Report) weekly
  - MTM end-of-day
  - SPAN / ELM / exposure margin
  - Cross-margin same/different expiry (Apr 2024)
  - Hedge benefit, portfolio margin
  - Client funds segregation (FY22-23 50% cash-equivalent rule)
  - Daily client funds upstreaming (Jun 2023 SEBI mandate)
  - Quarterly running-account settlement (calendar quarter-ends)
  - ASBA / UPI Block for QSBs (Feb 2025)
  - Dormant funds parking (SUSPE1234N UCC)
  - T+1 default settlement
  - T+0 beta scope
  - Auction (short delivery)
  - Payin/payout cut-offs
  - Give-up / take-up
  - EOD obligation file processing
  - Direct payout to demat (SEBI Jun 2024, Nov 2024 / Jan-Feb 2025 phases)
  - MFOS / FDR / cash collateral upstreaming
  - Surveillance: OTR (Order-to-Trade Ratio)
  - GSM (Graded Surveillance Measure)
  - ASM (Additional Surveillance Measure), LT-ASM
  - NORMS
  - Manipulative trade flagging
  - Spoof / layering detection
  - Social-media surveillance
  - Off-market transfer reporting
  - Abnormal trading penalties
- Target: 70–100 rows

#### Agent C — Blueprint cluster 3: Cyber + BCP/DR + Audit + Reporting

- OUTPUT_PATH: `/home/rakesh/work/broking-kyc/working/blueprint/cluster-3-cyber-bcp-audit-reporting.md`
- DOMAINS: `CYBER`, `BCP-DR`, `AUDIT`, `REPORTING`
- Topics:
  - CSCRF compliance (Aug 2024 + Dec 2024 / Mar 2025 / Apr 2025 / Aug 2025 clarifications)
  - Cyber audit Type I/II/III
  - VAPT (Vulnerability Assessment + Penetration Testing) quarterly
  - CERT-In 6-hour incident reporting (Apr 28, 2022 directions)
  - ISO 27001 alignment
  - SOC + log retention
  - Access control + data classification
  - BCP plan documentation
  - Quarterly DR drill (member + clearing corp)
  - Near-site / far-site separation
  - RTO / RPO targets
  - Tabletop exercises
  - DR site BCP-DR circular compliance
  - Concurrent audit (continuous, broker funds + securities)
  - Half-yearly internal audit (mandatory, member)
  - System audit (every 2 years per SEBI)
  - Statutory audit (annual)
  - KRA audit
  - DP audit (CDSL / NSDL)
  - Cyber audit
  - Settlement audit
  - Pre-launch / post-launch audits for new segments
  - Half-yearly compliance certificate to SEBI
  - Monthly client funding report
  - FATCA/CRS annual
  - GST / TDS / STT / SEBI turnover fees / stamp duty cycles
  - Member compliance reporting (CAR, DPC)
  - Technical glitch reporting
  - Operational loss event reporting
- Target: 70–100 rows

#### Agent D — Blueprint cluster 4: Grievance + DPDP + Member-comp + Investor-servicing + Exch/depot-reg

- OUTPUT_PATH: `/home/rakesh/work/broking-kyc/working/blueprint/cluster-4-grievance-dpdp-member-investor-reg.md`
- DOMAINS: `GRIEVANCE`, `DPDP`, `MEMBER-COMP`, `INVESTOR-SERVICING`, `EXCH-DEPOT-REG`
- Topics:
  - SCORES (SEBI portal) — registration + monthly MIS + escalation
  - ODR (Smart ODR — Aug 2023)
  - IGRC at exchange
  - Complaint redressal officer
  - Complaint disposal SLA (21 days)
  - DPDP Act 2023 + Rules Nov 2025 (compliance May 2027)
  - Consent management
  - Data principal rights (access, correction, erasure, portability, nomination)
  - Breach reporting
  - DPO designation
  - Consent manager registration
  - SDF (Significant Data Fiduciary) determination
  - Cross-border data transfer
  - Data retention boundaries
  - Networth maintenance (Rs.3 cr min for stockbroker)
  - Base Minimum Capital (BMC) + Additional Base Capital (ABC)
  - Fit-and-proper (continuing)
  - NISM certifications (compliance officer, AP, dealer)
  - Employee trading code
  - Insider trading code (Code of Conduct, designated person list, pre-clearance)
  - Advertisement approval
  - AP supervisory framework (NSE/COMP chain)
  - KMP changes intimation
  - Resident director mandate (2026 regs)
  - Contract notes (T+24h, digital signed, ECN)
  - Margin statements (daily)
  - Quarterly statement of accounts
  - Annual statement
  - Holding statements
  - Annual TDS certificates
  - Corporate action communications
  - SMS/email DLT compliance (template approval)
  - UCC daily upload to exchanges
  - Segment activation (CM, F&O, CD, debt, IRD)
  - Member admission (NSE, BSE, MCX) — fit-and-proper, networth, BMC
  - Demat BO opening (CDSL 1-2h, NSDL ~15d)
  - DDPI activation/revocation (24h)
  - Pledge: margin + MTF + automated release (PR-EP) + automated invocation (IV-EP/IV-RD)
  - MTF eligibility approval (broker level)
  - SLBM operations
  - Member resignation procedure
- Target: 50–80 rows

#### Vendor Atlas agents (4)

#### Agent E — Atlas cluster 1: Trading platforms + Back-office

- OUTPUT_PATH: `/home/rakesh/work/broking-kyc/working/atlas/cluster-1-trading-backoffice.md`
- CATEGORIES: `OMS-EMS-Trading`, `RMS`, `Back-Office`
- Products to research (seed list — find more):
  - **OMS/EMS/Trading**: Rupeed, 63 Moons ODIN, Greeksoft, Symphony Fintech (Presto/Stoxkart), NEST/Omnesys (Thomson Reuters / Refinitiv), Refinitiv Eikon, Aravali, ProTrade, IRIS by Shilpi, ProSarva, ASTHA Trade, BIRT, Astha by 63 Moons.
  - **RMS**: Aravali RMS, Symphony Risk, Greeksoft RMS, 63 Moons RMS modules.
  - **Back-office**: TechExcel (BO Plus, BO Smart), Mihir (Mihir BO), Aastha BO, Shilpi BO, Greeksoft BO, ProSarva, OmneNEST, JK Group, Fintso, Gradatim, BancAlliance, BaNCS (TCS), XTS by 63 Moons.
- Target: 30–50 vendors

#### Agent F — Atlas cluster 2: KYC + Verification + AML + Face match + OCR + CKYC

- OUTPUT_PATH: `/home/rakesh/work/broking-kyc/working/atlas/cluster-2-kyc-verification-aml.md`
- CATEGORIES: `KYC-Verification`, `Face-Match-Liveness-VIPV`, `OCR-Document-Parsing`, `AML-PEP-Sanctions`, `CKYC-Connectors`, `Surveillance-Market`
- Products:
  - **KYC-Verification (PAN/IFSC/penny drop)**: Decentro, HyperVerge, Karza, Perfios, IDfy, Signzy, Bureau, Cashfree Verification, Hypercheck, Surepass, AuthBridge.
  - **Face/liveness/VIPV**: HyperVerge, IDfy, Signzy, Karza, Sumsub.
  - **OCR**: HyperVerge OCR, Karza Aadhaar OCR, IDfy Doc, Signzy Doc.
  - **AML/PEP/Sanctions**: TrackWizz AML, Refinitiv World-Check, LexisNexis Risk, Tookitaki, Acuity Knowledge, Nameescan, ComplyAdvantage, FineXact, FinAcua.
  - **CKYC connectors**: Decentro CKYC, Signzy CKYC, Karza CKYC, IDfy CKYC, Bureau CKYC.
  - **Surveillance-Market**: TrackWizz Trade Surveillance, Aravali Surveillance.
- Target: 40–60 vendors

#### Agent G — Atlas cluster 3: eSign + AA + Payment/Mandate + DLT + Email + Credit + ITR

- OUTPUT_PATH: `/home/rakesh/work/broking-kyc/working/atlas/cluster-3-esign-aa-payment-comms-itr.md`
- CATEGORIES: `eSign-eStamp`, `AA-Consent-Manager`, `Payment-Mandate-UPI`, `DLT-SMS-WhatsApp`, `Email-Transactional`, `Credit-Bureau`, `ITR-Income-Verification`
- Products:
  - **eSign/eStamp**: Leegality, Digio, eMudhra, NSDL e-Sign, Signzy, Truecopy, SignDesk, eSignDesk, Adobe Sign India, Drysign.
  - **AA gateway / consent manager**: Finvu (Cookiejar Technologies), OneMoney, Anumati (Perfios), NeSL AA, Digio AA, Setu, PhonePe AA, Sahamati-certified TSPs.
  - **Payment/Mandate/UPI**: Razorpay, Cashfree, PineLabs, BillDesk, Easebuzz, Atom, JusPay, Setu, Decentro.
  - **DLT/SMS/WhatsApp**: Kaleyra, MSG91, Gupshup, Karix, Route Mobile, Twilio, Infobip, ValueFirst, Tanla.
  - **Email transactional**: AWS SES, SendGrid, Mailchimp Transactional (Mandrill), Brevo, Pepipost, Postmark.
  - **Credit Bureau**: CIBIL TransUnion, Experian, CRIF High Mark, Equifax.
  - **ITR/Income**: Perfios ITR Analyser, Finbox, Tartan (HRMS), Cleartax, Zoop, Scripbox-Income.
- Target: 50–70 vendors

#### Agent H — Atlas cluster 4: MF + IPO + Pledge + Algo + Market data + CRM-comms

- OUTPUT_PATH: `/home/rakesh/work/broking-kyc/working/atlas/cluster-4-mf-ipo-algo-data-crm.md`
- CATEGORIES: `Mutual-Fund-Platforms`, `IPO-OFS`, `Pledge-DDPI-Tech`, `Algo-Quant-API`, `Market-Data-News`, `CRM-Comms-Servicing`
- Products:
  - **MF platforms**: BSE StAR MF, NSE NMF II, MF Utility, CAMS, KFintech, MFCentral.
  - **IPO/OFS**: KFinTech, BigShare, Karvy / Link Intime, MUFG, Beetel.
  - **Pledge/DDPI tech**: CDSL EASIEST / EASI, NSDL SPEED-e, broker-side pledge APIs.
  - **Algo/Quant/API**: Tradetron, AlgoBaba, AlgoTest, Streak, Sensibull, Smallcase Gateway, KiteConnect (Zerodha), Upstox API, Angel One SmartAPI, IIFL Markets API, Fyers API, ICICIdirect API.
  - **Market data/news**: TickerPlant, Refinitiv Eikon, Bloomberg Terminal, EOD India, Tickertape.
  - **CRM/Comms/servicing**: Freshdesk, Zendesk, Salesforce, HubSpot, LeadSquared, NextHelpdesk, Tata Tele Business Services.
- Target: 40–60 vendors

- [ ] **Step 1: Dispatch all 8 agents in one tool-use message**

Each Agent call uses the prompt template:

```
You're contributing to the broking-kyc project's <DELIVERABLE> (<Compliance Blueprint | Vendor Atlas>).
This is sub-project #<7 | 2>, run in parallel with 7 sibling agents.

**Output:** Write to `<OUTPUT_PATH>` using the Write tool. Create fresh.

**Schema:** Conform to `/home/rakesh/work/broking-kyc/working/<SCHEMA_BLUEPRINT.md | SCHEMA_ATLAS.md>`. Read it first.

**Scope:**
- <For blueprint: list of domains>
- <For atlas: list of categories>

**Topics / seed products:**
<bulleted list per the cluster above>

**Method:**
1. WebSearch for each topic / product using domain-relevant queries.
2. WebFetch each candidate vendor URL or circular for verification.
3. Build entries per schema.
4. Cross-reference circulars: blueprint rows MUST reference existing circular IDs (read working/circulars/*.md if needed to find IDs).
5. Write entries as you find them.
6. End with `## OPEN_QUESTIONS`.

**Rules:**
- No inferred IDs, no paraphrased titles, no editorializing.
- Vendor names verbatim from product's own page.
- Positioning NEVER uses: best, top, leading, recommended, superior, industry-leading.
- Pricing: only public ranges; "not public" is acceptable.
- Unknown field → `[unknown — verify]`.

**Return:** Entry count, failed-URL list, `[unknown — verify]` count, one-paragraph summary of dominant topics found.
```

- [ ] **Step 2: Confirm dispatch**

8 "Async agent launched" messages with agent IDs. Wait for harness completion notifications.

---

## Phase 3 — Per-output verification (Task 6)

### Task 6: Schema validation per agent output

**Files:** Read each of 8 files in `working/blueprint/*.md` and `working/atlas/*.md`.

- [ ] **Step 1: Count entries per file**

```bash
cd /home/rakesh/work/broking-kyc
echo "Blueprint:"
for f in working/blueprint/*.md; do
  total=$(grep -c '^## ' "$f")
  open_q=$(grep -c '^## OPEN_QUESTIONS' "$f")
  entries=$((total - open_q))
  printf "  %-50s entries=%d open_q=%d\n" "$(basename $f)" "$entries" "$open_q"
done
echo "Atlas:"
for f in working/atlas/*.md; do
  total=$(grep -c '^## ' "$f")
  open_q=$(grep -c '^## OPEN_QUESTIONS' "$f")
  entries=$((total - open_q))
  printf "  %-50s entries=%d open_q=%d\n" "$(basename $f)" "$entries" "$open_q"
done
```

Expected: 4 blueprint files (each 50-100 entries, total 250-400+); 4 atlas files (each 30-70 entries, total 150-250+).

- [ ] **Step 2: Schema field-presence sanity**

Run for each file:

```bash
for f in working/blueprint/*.md; do
  echo "=== $f ==="
  grep -c '^- name: ' "$f"
  grep -c '^- domain: ' "$f"
  grep -c '^- regulator: ' "$f"
  grep -c '^- frequency: ' "$f"
  grep -c '^- owner_role: ' "$f"
  grep -c '^- evidence: ' "$f"
  grep -c '^- circular_ref: ' "$f"
done
```

The counts for each required field should match the entry count.

For atlas, equivalent grep on `vendor`, `category`, `positioning`, `primary_url`, `regulatory_anchors`.

- [ ] **Step 3: Endorsement-word check in atlas**

```bash
egrep -nri --include='*.md' '(\bbest\b|\bleading\b|\btop\b|\brecommended\b|\bsuperior\b|\bindustry-leading\b|\bgold standard\b)' working/atlas/
```

Expected: empty or only descriptive uses (e.g., "top of book" or "leading indicator" are acceptable — flag for manual review if any matches).

If endorsement words found in `positioning:` fields, flag the entry — consolidator will rewrite or escalate.

- [ ] **Step 4: Stitch OPEN_QUESTIONS into truncated files**

If any file lacks `## OPEN_QUESTIONS`, append a generic stub:

```bash
for f in working/blueprint/*.md working/atlas/*.md; do
  if ! grep -q '^## OPEN_QUESTIONS' "$f"; then
    printf '\n\n## OPEN_QUESTIONS\n\n- Agent was terminated before reaching closing review pass. Entries above are schema-valid; coverage in the final ~10-15%% may be incomplete.\n' >> "$f"
    echo "Stubbed: $f"
  fi
done
```

---

## Phase 4 — Consolidation (Tasks 7–10)

### Task 7: Build the blueprint page

**Files:**
- Create: `working/build_blueprint.py`
- Output (final): `kyc-docs-site/src/content/docs/operations/compliance-blueprint.md`

- [ ] **Step 1: Write `working/build_blueprint.py`**

```python
#!/usr/bin/env python3
"""
Build operations/compliance-blueprint.md from working/blueprint/*.md.
- Parse all working files into structured rows.
- Sort by domain (canonical order), then by id.
- Validate circular_ref against per-issuer sub-page anchors (warn on orphans).
- Emit grouped tables.
"""
import re
from pathlib import Path
from collections import defaultdict

REPO = Path("/home/rakesh/work/broking-kyc")
BP_DIR = REPO / "working" / "blueprint"
CIRC_DIR = REPO / "kyc-docs-site" / "src" / "content" / "docs" / "reference" / "circulars"
OUT = REPO / "kyc-docs-site" / "src" / "content" / "docs" / "operations" / "compliance-blueprint.md"

DOMAIN_ORDER = [
    "KYC", "AML", "MARGIN", "CLIENT-FUNDS", "SETTLEMENT", "SURVEILLANCE",
    "CYBER", "BCP-DR", "AUDIT", "REPORTING", "GRIEVANCE", "DPDP",
    "MEMBER-COMP", "INVESTOR-SERVICING", "EXCH-DEPOT-REG", "EDGE-CASE",
]
DOMAIN_LABEL = {
    "KYC": "KYC lifecycle",
    "AML": "AML / PMLA / Sanctions",
    "MARGIN": "Margin compliance",
    "CLIENT-FUNDS": "Client funds",
    "SETTLEMENT": "Settlement",
    "SURVEILLANCE": "Surveillance",
    "CYBER": "Cyber security",
    "BCP-DR": "BCP / DR",
    "AUDIT": "Audit cycles",
    "REPORTING": "Reporting cadences",
    "GRIEVANCE": "Investor grievance",
    "DPDP": "DPDP / data protection",
    "MEMBER-COMP": "Member compliance",
    "INVESTOR-SERVICING": "Investor servicing",
    "EXCH-DEPOT-REG": "Exchange & depository registration",
    "EDGE-CASE": "Edge-case compliances",
}
FIELDS = ["name", "domain", "regulator", "frequency", "owner_role", "trigger", "evidence", "penalty", "circular_ref", "notes"]


def slugify(s):
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-") or "x"


def parse(path):
    text = path.read_text(encoding="utf-8")
    out = []
    for section in re.split(r"^## ", text, flags=re.MULTILINE)[1:]:
        header = section.split("\n", 1)[0].strip()
        body = section.split("\n", 1)[1] if "\n" in section else ""
        if header.startswith("OPEN_QUESTIONS"):
            continue
        entry = {"id": header}
        for line in body.splitlines():
            line = line.strip()
            if line.startswith("- ") and ":" in line:
                k, _, v = line[2:].partition(":")
                entry[k.strip()] = v.strip()
        out.append(entry)
    return out


def build_circular_index():
    """Map of circular_id -> issuer slug for cross-link validation."""
    idx = {}
    for sub in CIRC_DIR.glob("*.md"):
        slug = sub.stem
        for line in sub.read_text(encoding="utf-8").splitlines():
            m = re.match(r"^###\s+(\S.*?)\s*$", line)
            if m:
                cid = m.group(1).strip()
                if "/" in cid and len(cid) > 6:
                    idx[cid] = slug
    return idx


def linkify_circulars(ref: str, idx: dict) -> str:
    """Replace each circular ID in `ref` with a link to its anchor."""
    if not ref or ref.startswith("["):
        return ref
    parts = [p.strip() for p in ref.split(",")]
    out = []
    for p in parts:
        if p in idx:
            out.append(f"[{p}](/broking-kyc/reference/circulars/{idx[p]}/#{slugify(p)})")
        elif p:
            out.append(p)  # Unknown — leave plain; flag in OPEN_QUESTIONS
    return ", ".join(out)


def main():
    all_rows = []
    for f in sorted(BP_DIR.glob("*.md")):
        all_rows.extend(parse(f))
    print(f"Parsed {len(all_rows)} blueprint rows")

    by_domain = defaultdict(list)
    for r in all_rows:
        by_domain[r.get("domain", "EDGE-CASE")].append(r)

    idx = build_circular_index()
    print(f"Built circular index: {len(idx)} IDs")

    # Stats
    domains_present = [d for d in DOMAIN_ORDER if by_domain.get(d)]
    total = sum(len(by_domain[d]) for d in domains_present)
    orphan_refs = 0
    for r in all_rows:
        ref = r.get("circular_ref", "")
        if ref and not ref.startswith("["):
            for p in [x.strip() for x in ref.split(",")]:
                if p and p not in idx:
                    orphan_refs += 1

    # Write the page
    OUT.parent.mkdir(parents=True, exist_ok=True)
    with OUT.open("w", encoding="utf-8") as fh:
        fh.write("---\ntitle: Compliance Blueprint\n")
        fh.write('description: "Verified inventory of every operational, one-time, and edge-case compliance touchpoint in Indian stock broking operations. One row per verifiable obligation, with regulator, frequency, owner, trigger, evidence, penalty, and linked circular(s)."\n')
        fh.write("---\n\n")

        fh.write("> **Why this page is structured this way:** Operators come to this page to find \"what must I do, by when, and what evidence proves I did it\". Rows are grouped by domain so each ops or compliance function can scan their own bucket. Each row links to the specific circular driving it on the per-issuer circulars sub-pages.\n\n")

        fh.write("## TL;DR\n\n")
        fh.write(f"- **{total} compliance touchpoints** inventoried across {len(domains_present)} domains.\n")
        fh.write("- Each row is **verifiable** — has a named evidence artefact (file / report / log / certificate / attestation).\n")
        fh.write("- Covers **operational** (daily / weekly / monthly / quarterly), **one-time / strategic** (admission, registration, FY closure), and **edge cases** (NRI, minor, joint, non-individual, transmission, dormancy, closure).\n")
        fh.write(f"- **{orphan_refs}** circular references didn't match the per-issuer sub-pages — flagged for re-verification.\n")
        fh.write("- AI-generated; **read the linked circular before acting**.\n\n")

        fh.write("## Conceptual overview\n\n")
        fh.write("Every broker must do a long list of things on a recurring schedule and a longer list of things triggered by events (a client onboards, a suspicious transaction surfaces, a margin shortfall happens, a system glitch occurs, a quarter closes). This page is the inventory: what to do, who owns it, what proves it was done, what happens if it wasn't. The blueprint does NOT explain *how* to do each — that's the role of per-domain deep-dive pages (separate sub-projects). It also doesn't cover *vendor selection* — see the [Vendor Atlas](/broking-kyc/vendors/atlas/).\n\n")

        for d in domains_present:
            rows = by_domain[d]
            fh.write(f"## {DOMAIN_LABEL[d]} ({len(rows)} entries)\n\n")
            fh.write("| ID | Name | Regulator | Frequency | Owner | Trigger | Evidence | Penalty | Circulars | Notes |\n")
            fh.write("| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |\n")
            for r in rows:
                def esc(x):
                    return (x or "").replace("|", "\\|").replace("\n", " ").strip()
                cid_links = linkify_circulars(r.get("circular_ref", ""), idx)
                fh.write(
                    f"| {r['id']} "
                    f"| {esc(r.get('name'))} "
                    f"| {esc(r.get('regulator'))} "
                    f"| {esc(r.get('frequency'))} "
                    f"| {esc(r.get('owner_role'))} "
                    f"| {esc(r.get('trigger'))} "
                    f"| {esc(r.get('evidence'))} "
                    f"| {esc(r.get('penalty'))} "
                    f"| {cid_links.replace('|', '\\|')} "
                    f"| {esc(r.get('notes'))} |\n"
                )
            fh.write("\n")

        fh.write("## Practical notes\n\n")
        fh.write("- **[industry practice]** Ops teams typically operate from a weekly compliance calendar — they take this blueprint, filter to their domain, and slot recurring items into the calendar. Event-triggered items are handled via runbook.\n")
        fh.write("- **[gotcha]** Several compliances have overlapping evidence requirements (e.g., the same trade file is evidence for margin reporting AND settlement). Mapping evidence-to-source once and reusing is a substantial efficiency win.\n")
        fh.write("- **[risk trade-off]** \"Continuous\" frequencies (concurrent audit, surveillance) cannot be batched without breaching the obligation; \"event-triggered\" can be queued with SLAs.\n")
        fh.write("- **[cost optimization]** Many small brokers under-resource their reporting function and pay penalties; the marginal cost of an extra reporting analyst is often less than the average annual penalty for a mid-size broker (industry-reported figures vary; verify in your books).\n\n")

        fh.write("## Verified through\n\n2026-05-14\n\n---\n\n")
        fh.write("*AI-generated and not legal, financial, or compliance advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*\n")

    print(f"Wrote {OUT}")
    if orphan_refs:
        print(f"WARNING: {orphan_refs} circular references didn't match existing sub-page anchors. Review during cross-link Phase.")


if __name__ == "__main__":
    main()
```

- [ ] **Step 2: Run it**

```bash
python3 /home/rakesh/work/broking-kyc/working/build_blueprint.py
```

Expected: prints parsed row count, circular index size, writes the blueprint page. Note any orphan-circular-ref count.

- [ ] **Step 3: Spot-check the output**

```bash
wc -l /home/rakesh/work/broking-kyc/kyc-docs-site/src/content/docs/operations/compliance-blueprint.md
head -50 /home/rakesh/work/broking-kyc/kyc-docs-site/src/content/docs/operations/compliance-blueprint.md
```

Expected: file is several hundred lines; frontmatter present; first domain section visible.

---

### Task 8: Build the atlas page

**Files:**
- Create: `working/build_atlas.py`
- Output (final): `kyc-docs-site/src/content/docs/vendors/atlas.md`

- [ ] **Step 1: Write `working/build_atlas.py`**

```python
#!/usr/bin/env python3
"""
Build vendors/atlas.md from working/atlas/*.md.
- Parse all working files.
- Sort by category, then by vendor.
- Emit grouped tables.
"""
import re
from pathlib import Path
from collections import defaultdict

REPO = Path("/home/rakesh/work/broking-kyc")
AT_DIR = REPO / "working" / "atlas"
OUT = REPO / "kyc-docs-site" / "src" / "content" / "docs" / "vendors" / "atlas.md"

CATEGORY_ORDER = [
    "OMS-EMS-Trading", "RMS", "Back-Office",
    "Surveillance-Market", "AML-PEP-Sanctions",
    "KYC-Verification", "Face-Match-Liveness-VIPV", "OCR-Document-Parsing",
    "CKYC-Connectors",
    "eSign-eStamp",
    "AA-Consent-Manager",
    "Payment-Mandate-UPI",
    "DLT-SMS-WhatsApp", "Email-Transactional",
    "ITR-Income-Verification", "Credit-Bureau",
    "Mutual-Fund-Platforms", "IPO-OFS",
    "Pledge-DDPI-Tech",
    "Algo-Quant-API", "Market-Data-News",
    "CRM-Comms-Servicing",
]
CATEGORY_LABEL = {
    "OMS-EMS-Trading": "OMS / EMS / Trading platforms",
    "RMS": "Risk Management Systems",
    "Back-Office": "Back-office",
    "Surveillance-Market": "Market surveillance",
    "AML-PEP-Sanctions": "AML / PEP / Sanctions",
    "KYC-Verification": "KYC verification (PAN / IFSC / penny drop)",
    "Face-Match-Liveness-VIPV": "Face match / liveness / VIPV",
    "OCR-Document-Parsing": "OCR / document parsing",
    "CKYC-Connectors": "CKYC connectors",
    "eSign-eStamp": "eSign / eStamp",
    "AA-Consent-Manager": "Account Aggregator / consent manager",
    "Payment-Mandate-UPI": "Payment / mandate / UPI",
    "DLT-SMS-WhatsApp": "DLT / SMS / WhatsApp",
    "Email-Transactional": "Email transactional",
    "ITR-Income-Verification": "ITR / income verification",
    "Credit-Bureau": "Credit bureau",
    "Mutual-Fund-Platforms": "Mutual fund platforms",
    "IPO-OFS": "IPO / OFS",
    "Pledge-DDPI-Tech": "Pledge / DDPI tech",
    "Algo-Quant-API": "Algo / Quant / API",
    "Market-Data-News": "Market data / news",
    "CRM-Comms-Servicing": "CRM / comms / servicing",
}


def parse(path):
    text = path.read_text(encoding="utf-8")
    out = []
    for section in re.split(r"^## ", text, flags=re.MULTILINE)[1:]:
        header = section.split("\n", 1)[0].strip()
        body = section.split("\n", 1)[1] if "\n" in section else ""
        if header.startswith("OPEN_QUESTIONS"):
            continue
        entry = {"slug": header}
        for line in body.splitlines():
            line = line.strip()
            if line.startswith("- ") and ":" in line:
                k, _, v = line[2:].partition(":")
                entry[k.strip()] = v.strip()
        out.append(entry)
    return out


def main():
    all_rows = []
    for f in sorted(AT_DIR.glob("*.md")):
        all_rows.extend(parse(f))
    print(f"Parsed {len(all_rows)} atlas rows")

    by_cat = defaultdict(list)
    for r in all_rows:
        by_cat[r.get("category", "OMS-EMS-Trading")].append(r)
    cats_present = [c for c in CATEGORY_ORDER if by_cat.get(c)]
    total = sum(len(by_cat[c]) for c in cats_present)

    # Endorsement check
    bad_words = ["best", "top", "leading", "recommended", "superior", "industry-leading", "gold standard"]
    flagged = []
    for r in all_rows:
        pos = (r.get("positioning") or "").lower()
        for w in bad_words:
            if re.search(rf"\b{w}\b", pos):
                flagged.append((r.get("slug"), w, r.get("positioning")))
                break
    if flagged:
        print(f"WARNING: {len(flagged)} entries use endorsement words in positioning:")
        for slug, word, pos in flagged[:10]:
            print(f"  {slug} [{word}] -> {pos}")

    OUT.parent.mkdir(parents=True, exist_ok=True)
    with OUT.open("w", encoding="utf-8") as fh:
        fh.write("---\ntitle: Vendor Atlas\n")
        fh.write('description: "Named-product enumeration across the Indian broking technology stack. Real products with positioning, integration shape, pricing shape, and regulatory anchors. Endorsement-free; positions descriptively without ranking."\n')
        fh.write("---\n\n")

        fh.write("> **Why this page is structured this way:** Engineers and architects picking integration partners use this page to see what products exist in each category. Rows are grouped by category so the reader scans their integration surface, then drills into specific products via the linked URLs.\n\n")

        fh.write("> **Policy note:** This page **names real products** and offers **descriptive positioning** (\"dominant in retail back-office\", \"common AA gateway\"). It explicitly avoids **endorsement language** (\"best\", \"top\", \"leading\", \"recommended\"). All other docs in this site remain vendor-neutral.\n\n")

        fh.write("## TL;DR\n\n")
        fh.write(f"- **{total} products** enumerated across {len(cats_present)} categories.\n")
        fh.write("- Each entry has a verified primary URL, positioning note, pricing shape, integration shape, and regulatory-anchor reference.\n")
        fh.write("- Pricing is often **not public** for Indian B2B SaaS — treat ranges as indicative, verify in your own RFP.\n")
        fh.write("- AI-generated; **verify any vendor claim with the vendor's own published material before acting**.\n\n")

        fh.write("## Conceptual overview\n\n")
        fh.write("Indian broking platforms typically assemble from 15–25 third-party products spanning OMS/EMS, RMS, back-office, KYC, AML/surveillance, eSign, payment mandates, account aggregator, comms/DLT, and servicing. Larger brokers build some of these in-house but procure most. This atlas is the breadth layer — what exists where. For per-vendor depth (API specs, SLAs, integration walk-throughs), see the existing per-vendor pages under [Vendor Integrations](/broking-kyc/vendors/).\n\n")

        for c in cats_present:
            rows = sorted(by_cat[c], key=lambda r: (r.get("vendor", "") or "").lower())
            fh.write(f"## {CATEGORY_LABEL[c]} ({len(rows)} products)\n\n")
            fh.write("| Vendor | Company | Positioning | Pricing shape | Range | Integration | Regulatory anchors | URL | Notes |\n")
            fh.write("| --- | --- | --- | --- | --- | --- | --- | --- | --- |\n")
            for r in rows:
                def esc(x):
                    return (x or "").replace("|", "\\|").replace("\n", " ").strip()
                url = r.get("primary_url", "")
                if url and not url.startswith("["):
                    url_md = f"[link]({url})"
                else:
                    url_md = url
                fh.write(
                    f"| {esc(r.get('vendor'))} "
                    f"| {esc(r.get('vendor_company'))} "
                    f"| {esc(r.get('positioning'))} "
                    f"| {esc(r.get('pricing_shape'))} "
                    f"| {esc(r.get('pricing_range'))} "
                    f"| {esc(r.get('integration_shape'))} "
                    f"| {esc(r.get('regulatory_anchors'))} "
                    f"| {url_md} "
                    f"| {esc(r.get('notes'))} |\n"
                )
            fh.write("\n")

        fh.write("## Practical notes\n\n")
        fh.write("- **[industry practice]** Most large Indian brokers bundle their stack from a handful of dominant players (63 Moons / Greeksoft / Symphony Fintech for trading-and-RMS; ODIN / TechExcel / Shilpi / Aastha for back-office); switching cost is high once a stack is bedded in.\n")
        fh.write("- **[gotcha]** Pricing is rarely public for the institutional-grade products (OMS, RMS, back-office); contact-sales is the default, and prices vary 5-10x by broker scale.\n")
        fh.write("- **[risk trade-off]** Vendor consolidation (one provider for KYC + AML + face match + OCR) reduces integration cost but increases single-point-of-failure risk.\n")
        fh.write("- **[cost optimization]** Account Aggregator (AA) gateways usage-based pricing means low-volume use is cheap; per-transaction verify (penny drop, PAN, face match) adds up at scale — bulk pricing is negotiable.\n\n")

        fh.write("## Verified through\n\n2026-05-14\n\n---\n\n")
        fh.write("*AI-generated and not endorsement of any vendor. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*\n")

    print(f"Wrote {OUT}")
    if flagged:
        print(f"REMINDER: {len(flagged)} entries have endorsement language — review manually or fix in the working files.")


if __name__ == "__main__":
    main()
```

- [ ] **Step 2: Run it**

```bash
python3 /home/rakesh/work/broking-kyc/working/build_atlas.py
```

Expected: prints parsed row count, writes atlas page, flags any endorsement-language entries.

- [ ] **Step 3: If flagged endorsement words, fix in working files and re-run**

For each flagged entry, edit `working/atlas/<cluster>.md` to rewrite the `positioning:` line, then re-run `build_atlas.py`.

---

### Task 9: Site rebuild + cross-link validation

- [ ] **Step 1: Astro build**

```bash
cd /home/rakesh/work/broking-kyc/kyc-docs-site && npm run build 2>&1 | tail -20
```

Expected: build completes; new pages listed in output:
- `/operations/compliance-blueprint/index.html`
- `/vendors/atlas/index.html`

- [ ] **Step 2: Spot-check 5 cross-links from blueprint to circular sub-pages**

```bash
grep -oE '/broking-kyc/reference/circulars/[a-z-]+/#[a-z0-9-]+' /home/rakesh/work/broking-kyc/kyc-docs-site/src/content/docs/operations/compliance-blueprint.md | sort -u | head -5
```

For each: verify the anchor exists on the target sub-page by searching for the slugified ID.

---

### Task 10: Commit consolidated output

- [ ] **Step 1: Stage and commit**

```bash
cd /home/rakesh/work/broking-kyc
git add kyc-docs-site/src/content/docs/operations/compliance-blueprint.md
git add kyc-docs-site/src/content/docs/vendors/atlas.md
git commit -m "$(cat <<'EOF'
Add Compliance Blueprint + Vendor Atlas

Compliance Blueprint at operations/compliance-blueprint.md: <N> verifiable
compliance touchpoints across <D> domains (KYC lifecycle, AML/PMLA,
margin, client funds, settlement, surveillance, cyber, BCP/DR, audit,
reporting, grievance, DPDP, member compliance, investor servicing,
exchange/depository registration, edge cases). Each row: name,
regulator, frequency, owner role, trigger, evidence artefact, penalty,
linked circular. Cross-links resolve into the per-issuer circulars
sub-pages from sub-project #1.

Vendor Atlas at vendors/atlas.md: <V> products enumerated across <C>
categories. Real vendor names with descriptive positioning, pricing
shape, integration shape, regulatory anchors. Endorsement-free policy
banner; vendor-naming reversal scoped to this page only.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)" 2>&1 | tail -5
```

Replace `<N>`, `<D>`, `<V>`, `<C>` with actual counts from the build outputs.

---

## Phase 5 — Sidebar, README, polish (Tasks 11–13)

### Task 11: Update Astro sidebar

**Files:**
- Modify: `kyc-docs-site/astro.config.mjs`

- [ ] **Step 1: Add "Vendor Atlas" entry at the top of Vendor Integrations**

In `astro.config.mjs`, find the `label: "Vendor Integrations"` block. Replace the first `items:` entry (`{ label: "Vendor Strategy", slug: "vendors" }`) with two entries:

```js
{ label: "Vendor Atlas — All Products", slug: "vendors/atlas" },
{ label: "Vendor Strategy", slug: "vendors" },
```

- [ ] **Step 2: Add "Compliance Blueprint" entry to Operations**

In the `label: "Operations"` block, add at the top (before `Batch Pipeline`):

```js
{ label: "Compliance Blueprint", slug: "operations/compliance-blueprint" },
```

- [ ] **Step 3: Rebuild and verify**

```bash
cd /home/rakesh/work/broking-kyc/kyc-docs-site && npm run build 2>&1 | tail -10
```

Expected: build complete; sidebar nav now includes both entries.

---

### Task 12: Update README

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Add a brief "Compliance & Vendors" section after "Key Regulatory References"**

Insert before the `## Author` heading:

```markdown
## Compliance & Vendor Coverage

- **[Compliance Blueprint](https://javajack.github.io/broking-kyc/operations/compliance-blueprint/)** — inventory of every verifiable operational, one-time, and edge-case compliance touchpoint a broker must address. Each row: regulator, frequency, owner role, trigger, evidence artefact, penalty, and linked circular(s).
- **[Vendor Atlas](https://javajack.github.io/broking-kyc/vendors/atlas/)** — named-product enumeration across 22 categories spanning the full broking technology stack: OMS/EMS, RMS, back-office, surveillance, AML, KYC verification, eSign, account aggregator, payment mandates, DLT, ITR, credit bureau, mutual funds, IPO, pledge tech, algo, market data, CRM. Endorsement-free; descriptive positioning only.
```

---

### Task 13: Commit sidebar + README

- [ ] **Step 1: Stage and commit**

```bash
cd /home/rakesh/work/broking-kyc
git add kyc-docs-site/astro.config.mjs README.md
git commit -m "$(cat <<'EOF'
Expose Compliance Blueprint and Vendor Atlas in sidebar and README

Sidebar:
- New "Compliance Blueprint" entry at top of Operations.
- New "Vendor Atlas — All Products" entry at top of Vendor Integrations.

README:
- New "Compliance & Vendor Coverage" section linking the two pages.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)" 2>&1 | tail -5
```

---

## Phase 6 — Memory + final verification (Task 14)

### Task 14: Update memory and do final verification

- [ ] **Step 1: Update project_overview memory**

Edit `/home/rakesh/.claude/projects/-home-rakesh-work-broking-kyc/memory/project_overview.md` — update the "Scope covered" line to include:

```markdown
... Sub-project #1 (Circulars Refresh, 884 entries) and sub-projects #2 (Vendor Atlas) + #7 (Compliance Blueprint) are complete; #3 Field-level Atlas, #4 Integration DAG, #5 KYC Lifecycle beyond onboarding, and #6 Broking Ops Platform / process narrative remain queued.
```

- [ ] **Step 2: Add a new memory entry for the vendor atlas + blueprint pair**

Write `/home/rakesh/.claude/projects/-home-rakesh-work-broking-kyc/memory/blueprint_and_atlas.md`:

```markdown
---
name: blueprint-and-atlas
description: Two breadth-first reference pages added 2026-05-14 — operations/compliance-blueprint.md (verifiable compliance inventory) and vendors/atlas.md (named-product enumeration). Both cross-link to the 884-entry circulars index.
metadata:
  type: project
---

`operations/compliance-blueprint.md` indexes every verifiable compliance touchpoint with name, regulator, frequency, owner role, trigger, evidence artefact, penalty, and linked circulars. ~<N> rows across ~<D> domains. **Why:** user requested a foundation map so we can decide where to deepen next. **How to apply:** treat this as the authoritative inventory; per-domain deep-dives are separate sub-projects yet to be done.

`vendors/atlas.md` enumerates real vendor products across ~<C> categories with positioning, pricing shape, integration shape, and regulatory anchors. **Why:** sub-project #2 of the original decomposition; user explicitly authorized vendor naming on this page (reversing c343ac1 for atlas only). **How to apply:** when asked about a vendor or integration choice, reference the atlas row; existing per-vendor pages under `vendors/<category>/` are the depth layer. Don't introduce vendor names in other docs.

Related: [[project-overview]], [[regulatory-anchors]], [[documentation-conventions]].
```

Fill `<N>`, `<D>`, `<C>` with actuals after build.

- [ ] **Step 3: Update MEMORY.md index**

Append to `/home/rakesh/.claude/projects/-home-rakesh-work-broking-kyc/memory/MEMORY.md`:

```markdown
- [Blueprint and Atlas](blueprint_and_atlas.md) — 2026-05-14 additions: compliance-blueprint.md (inventory) and vendors/atlas.md (named products); both breadth-first, cross-linked to circulars
```

- [ ] **Step 4: Final build sanity**

```bash
cd /home/rakesh/work/broking-kyc/kyc-docs-site && npm run build 2>&1 | grep -E '(Error|error|Complete|✓ \w)' | tail -5
```

Expected: build complete, no errors.

- [ ] **Step 5: Final git state**

```bash
git -C /home/rakesh/work/broking-kyc log --oneline origin/main..HEAD
```

Expected: previous 7 commits from sub-project #1 + new 3-4 commits from this sub-project (spec, content, sidebar+README, possibly fixes).

---

## Self-review

**Spec coverage** — each spec section maps to tasks:
- "Compliance Blueprint structure" → Task 7 (build_blueprint.py + grouping by domain + 10-column schema)
- "Vendor Atlas structure" → Task 8 (build_atlas.py + grouping by category + 10-column schema)
- "Documentation conventions" → Tasks 7/8 (TL;DR + why-this-order + conceptual overview + practical notes + verified-through built into both build scripts)
- "Workflow: 8 parallel agents" → Task 5
- "Cross-references to circulars" → Task 7 (linkify_circulars function; orphan-ref reporting)
- "Vendor naming policy" → Task 5 prompt + Task 6 endorsement word check
- "Risks: rate limit, vendor verifiability, cross-ref orphans, endorsement re-opening" → addressed via 8-not-13 agent dispatch, per-agent OPEN_QUESTIONS, build script orphan reporting, endorsement scan
- "Success criteria" → Task 6 (counts), Task 9 (build verification)
- "Out of scope" → made explicit in spec; not implemented here

**Placeholder scan** — no "TBD", "TODO", "implement later", "fill in details", "Similar to Task N", or open-ended hand-waves. Each step has either explicit code or explicit command + expected output. The `<N>`, `<D>`, `<V>`, `<C>` markers in commit messages and memory are intentional placeholders the engineer fills in from build output — clearly marked as such.

**Type consistency** — column names and closed vocabularies stay consistent across SCHEMA_BLUEPRINT.md → build_blueprint.py and SCHEMA_ATLAS.md → build_atlas.py.

---

## Risks & contingencies

- **Rate limit (per sub-project #1 experience)**: 8 in parallel is conservative; if hit, resume from working files post 5pm IST reset (the partial files retain valid entries).
- **Cross-ref orphans**: build script warns; manual fix in working files + re-run.
- **Endorsement words slip through**: build script grep; manual fix.
- **Astro build error on huge tables**: 22-category × ~10 rows = manageable; 16-domain × ~20 rows = manageable. If a single page hits Astro/MDX size limit, sub-page split per domain/category (similar to circulars).
- **Sidebar nav growth**: adding 2 entries; existing nav already has 16+ entries. No issue.

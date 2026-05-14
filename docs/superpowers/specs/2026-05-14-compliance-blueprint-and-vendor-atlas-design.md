# Compliance Blueprint + Vendor Atlas — Design

**Date:** 2026-05-14
**Sub-projects:** #7 (Compliance Blueprint, foundational addition) and #2 (Vendor Atlas) of the broking-ops expansion
**Status:** Design — pending user review

## Context

Sub-project #1 (Circulars Refresh) is done — 884 circulars indexed across 13 issuer groupings. User identified three remaining gaps for the next round:

1. No single broker-process narrative ("onboard → trade → BOD/EOD → settlement → limits") — addressed later by sub-project #6.
2. Vendor coverage is thin — real products like **Rupeed**, **TechExcel**, **63 Moons ODIN**, **Greeksoft**, **Symphony Fintech**, **Aravali**, **Shilpi**, **ProSarva**, **NEST/Omnesys**, **ASTHA**, **OmneNEST**, **Mihir**, **Astha**, comm vendors (**Kaleyra/MSG91/Gupshup/Karix/Route Mobile**), AA gateways (**Finvu/OneMoney/Anumati/NeSL/Setu**), eSign (**Leegality/Digio/eMudhra/NSDL/Signzy/SignDesk**), credit bureaus, ITR (**Perfios/Finbox/Tartan**), and more aren't enumerated. → addressed by **sub-project #2 Vendor Atlas**.
3. No compliance inventory — 884 circulars indexed but no "here is everything a broker must DO and the evidence required" page. → addressed by **NEW sub-project #7 Compliance Blueprint**.

User-confirmed scope (this design):
- Blueprint scope: **operational + one-time/strategic + edge-case** compliances (~250–400 rows).
- Atlas + Blueprint: **run in parallel** — dispatch both now.

## Goal

Two new top-level deliverables:

1. **Compliance Blueprint** at `kyc-docs-site/src/content/docs/operations/compliance-blueprint.md` — single comprehensive page, table-driven inventory of every verifiable compliance touchpoint in Indian stock broking operations, with: name · regulator · frequency · owner role · trigger · **evidence/artifact required** · penalty/risk · linked circular(s).
2. **Vendor Atlas** at `kyc-docs-site/src/content/docs/vendors/atlas.md` — single comprehensive page, table-driven enumeration of real products across ~20 vendor categories spanning the full broking tech stack (KYC + non-KYC), with: vendor · category · positioning · pricing shape · integration notes · primary URL.

Both pages are **breadth-first** (map the territory), not depth-first (per-vendor or per-compliance deep-dives — those come after). They're foundation maps that let the user decide where to deepen next.

## Compliance Blueprint — structure

### Sections (~15 domains)

1. **KYC lifecycle** — initial onboarding, re-KYC periodicity (risk-based — high 2y / medium 8y / low 10y), KRA/CKYC dual upload, six-attribute matching, modifications (address / bank / nominee / segment / mobile / email / name / DOB), dormancy → reactivation, closure, transmission (single deceased, joint deceased, succession).
2. **AML / PMLA / Sanctions** — STR / CTR / CCR / NTR / CBWTR reporting; designated director; principal officer; sanctions screening (UNSC, MEA, MHA UAPA); beneficial ownership; PEP screening; risk categorization; group-wide AML policy; PMLA recordkeeping (5y); FIU-IND FINnet 2.0 connectivity.
3. **Margin compliance** — peak margin reporting (4 intraday snapshots: 11:30, 12:30, 13:30, 14:30); DMF (Daily Margin File) to clearing corp; CFR (Client Funding Report) weekly; MTM end-of-day; SPAN/ELM/exposure margin; cross-margin same/different expiry; hedge benefit; portfolio margin.
4. **Client funds** — segregation; daily upstreaming to clearing corp (Jun 2023 SEBI mandate); quarterly running-account settlement (calendar quarter-ends); ASBA/UPI Block for QSBs (Feb 2025); dormant funds parking (SUSPE1234N); 50% cash-equivalent rule (FY22-23).
5. **Settlement** — T+1 default; T+0 beta scope; auction (short delivery); payin/payout cut-offs; give-up/take-up; EOD obligation file processing; direct-payout-to-demat (SEBI Jun 2024, phased Nov 2024 / Jan-Feb 2025); MFOS/FDR/cash collateral upstreaming.
6. **Surveillance** — Order-to-Trade Ratio (OTR); GSM (Graded Surveillance Measure); ASM (Additional Surveillance Measure); LT-ASM; NORMS; manipulative trade flagging; spoof / layering detection; social-media surveillance; off-market transfers; abnormal trading penalties.
7. **Cyber security** — CSCRF (Aug 2024 framework + Dec 2024 / Mar 2025 clarifications); cyber audit (Type-I/II/III); VAPT (Vulnerability Assessment and Penetration Testing — quarterly); CERT-In 6-hour incident reporting (Apr 2022 directions); ISO 27001 alignment; SOC; data classification; access control; logs retention.
8. **BCP / DR** — BCP plan documentation; quarterly DR drill (member + clearing corp); near-site / far-site separation; RTO / RPO targets; tabletop exercises; DR site BCP-DR circular compliance.
9. **Audit cycles** — concurrent audit (continuous, broker funds + securities); half-yearly internal audit (mandatory, member); system audit (every 2 years per SEBI); statutory audit (annual); KRA audit; DP audit (CDSL / NSDL); cyber audit; settlement audit; pre-launch and post-launch audits for new segments.
10. **Reporting cadences** — half-yearly compliance certificate to SEBI; monthly client funding (exchange); daily margin / peak margin (clearing); weekly client funding (exchange); FATCA/CRS annual; GST / TDS / STT / SEBI turnover / stamp duty cycles; member compliance reporting (CAR, DPC); UCC daily; segment-activation files; technical glitch reporting; loss event reporting (operational risk).
11. **Investor grievance** — SCORES (SEBI portal); ODR (Smart ODR — Aug 2023); IGRC at exchange; complaint redressal officer; monthly grievance MIS; complaint disposal SLA (21 days); SCORES escalation.
12. **DPDP** — consent management; data principal rights (access / correction / erasure / portability / nomination); breach reporting; DPO designation; consent manager registration; SDF (Significant Data Fiduciary) status; cross-border data transfer rules; data retention boundaries.
13. **Member compliance** — networth maintenance (Rs.3 cr min for stockbroker); Base Minimum Capital (BMC); Additional Base Capital (ABC); fit-and-proper (continuing); NISM certifications (compliance officer, AP, dealer); employee trading code; insider trading code; designated person list; pre-clearance for trades; advertisement approval; AP supervisory framework; KMP changes; resident director mandate (2026 regs).
14. **Investor servicing** — contract notes (T+24h, digital signed); margin statements (daily); quarterly statement of accounts; annual statement; holding statements; ECN (Electronic Contract Note); annual TDS certificates; corporate action communications; SMS/email DLT compliance.
15. **Exchange & depository registration / modification** — UCC daily upload; segment activation; member admission; demat BO opening (CDSL 1-2h / NSDL 15d); DDPI activation/revocation; pledge (margin + MTF); MTF eligibility; SLBM operations; member resignation; clearing-corp registration.
16. **Edge-case compliances** — NRI (PIS letter, NRE/NRO, FATCA-mandatory, PIS delivery-only restriction); minor (guardian KYC, age-18 conversion within 30d or freeze); joint accounts (multi-signatory eSign, 3-holder max); non-individual (HUF/Partnership/LLP/Corporate/Trust — MOA/AOA, UBO, multi-sig); transmission (single/joint/nominee paths); deceased handling; dormancy criteria (12m / 24m); reactivation (re-KYC); voluntary closure; nominee opt-out 30d video; segment add/drop.

### Column schema (each row)

| Column | Description |
| --- | --- |
| `id` | Domain-prefixed sequential, e.g., `KYC-001`, `AML-014` |
| `name` | Short verb-led name, e.g., "Submit STR to FIU-IND" |
| `regulator` | SEBI / RBI / NPCI / CERSAI / MeitY / FIU-IND / NSE / BSE / MCX / CDSL / NSDL / NSCCL / ICCL / MCXCCL |
| `frequency` | continuous \| daily \| weekly \| monthly \| quarterly \| half-yearly \| annual \| event-triggered \| one-time \| as-required |
| `owner_role` | Compliance Officer \| Principal Officer \| Designated Director \| RMS Lead \| Ops Lead \| CISO / IT \| Internal Audit \| Statutory Auditor \| DP Manager \| Settlement Ops \| Funds Ops |
| `trigger` | What event makes the obligation arise (e.g., "client onboarding submitted", "suspicious activity detected", "every business day BOD") |
| `evidence` | Specific artifact that proves compliance — file name / report ID / certificate / log / database state / attestation |
| `penalty` | Penalty for non-compliance (Rs amount / suspension / cancellation / reputational) |
| `circular_ref` | Linked circular ID(s) anchored to the per-issuer sub-page from sub-project #1 |
| `notes` | Edge cases, deferrals, recent changes, industry practice |

### Output

One markdown file at `kyc-docs-site/src/content/docs/operations/compliance-blueprint.md`. Sidebar entry added under **Operations**.

Page structure follows project conventions (TL;DR → why-this-order → conceptual overview → mechanics tables grouped by domain → practical notes → verified-through stamp → AI disclaimer).

## Vendor Atlas — structure

### Categories (~20)

1. **OMS / EMS / Trading platforms** — Rupeed, 63 Moons ODIN, Greeksoft, Symphony Fintech (Presto/Stoxkart), NEST/Omnesys (Thomson Reuters), Refinitiv Eikon, Aravali, ProTrade, IRIS, Shilpi, ProSarva, ASTHA, BIRT, Astha Trade.
2. **RMS (Risk Management Systems)** — Aravali RMS, Symphony Risk, Greeksoft RMS, 63 Moons RMS, in-house at large brokers.
3. **Back-office** — TechExcel (BO Plus, BO Smart), Mihir (Mihir BO), Aastha, Shilpi BO, Greeksoft BO, ProSarva, OmneNEST, JK Group, Fintso, Gradatim, BancAlliance, BaNCS (TCS), XTS, Aastha BO, Wisdom Capital BO.
4. **Surveillance / Market** — TrackWizz Trade Surveillance, Aravali Surveillance, NSE NORMS internals, in-house surveillance.
5. **AML / PEP / Sanctions** — TrackWizz AML, Refinitiv World-Check, LexisNexis Risk, Tookitaki, Acuity Knowledge, Nameescan, ComplyAdvantage, FineXact, FinAcua.
6. **KYC verification (PAN/IFSC/penny drop)** — Decentro, HyperVerge, Karza, Perfios, IDfy, Signzy, Bureau, Cashfree Verification, Hypercheck, Surepass, AuthBridge.
7. **Face match / liveness / VIPV** — HyperVerge, IDfy, Signzy, Karza, Sumsub (international).
8. **OCR / document parsing** — HyperVerge OCR, Karza Aadhaar OCR, IDfy Doc, Signzy Doc.
9. **eSign / eStamp** — Leegality, Digio, eMudhra, NSDL e-Sign, Signzy, Truecopy, SignDesk, eSignDesk, Adobe Sign India, Drysign.
10. **AA gateway / consent manager** — Finvu (Cookiejar), OneMoney, Anumati (Perfios), NeSL AA, Digio AA, Setu, PhonePe AA, Sahamati certified TSPs (~16 operators).
11. **Payment / mandate (UPI / eNACH / collect)** — Razorpay, Cashfree, PineLabs, BillDesk, Easebuzz, Atom, JusPay, Setu, Decentro, NPCI direct.
12. **CKYC connectors** — Decentro CKYC, Signzy CKYC, Karza CKYC, IDfy CKYC, Bureau CKYC, in-house ESF-RB connection.
13. **DLT / SMS / WhatsApp** — Kaleyra, MSG91, Gupshup, Karix, Route Mobile, Twilio, Infobip, ValueFirst, Tanla, Solutions Infini, Webex.
14. **Email / transactional** — AWS SES, SendGrid, Mailchimp Transactional (Mandrill), Brevo (formerly Sendinblue), Pepipost, Postmark.
15. **ITR / income verification** — Perfios ITR Analyser, Finbox, Tartan (payroll HRMS), Cleartax, Zoop, Scripbox-Income.
16. **Credit bureau** — CIBIL TransUnion, Experian, CRIF High Mark, Equifax (for MTF eligibility, optional).
17. **Mutual Fund platforms** — BSE StAR MF, NSE NMF II, MF Utility, CAMS, KFintech, MFCentral.
18. **IPO / OFS** — KFinTech, BigShare, Karvy / Link Intime, MUFG, Beetel, Tata Capital BFL.
19. **Pledge / DDPI tech** — CDSL EASIEST / EASI, NSDL SPEED-e, broker-side pledge APIs.
20. **Algo / Quant / API** — Tradetron, AlgoBaba, AlgoTest, Streak, Sensibull, Smallcase Gateway, KiteConnect (Zerodha), Upstox API, Angel One SmartAPI, IIFL Markets API, Fyers API, ICICIdirect API.
21. **Market data / news** — TickerPlant, Refinitiv Eikon, Bloomberg Terminal, EOD India, Tickertape (data), Sensibull data.
22. **Comms / CRM / WhatsApp Business** — Freshdesk, Zendesk, Salesforce, HubSpot, LeadSquared, NextHelpdesk, Tata Tele Business Services, Whatfix.
23. **Investor servicing platforms** — TickerPlant, Refinitiv News, Reuters India, EOD India, Indian Investor.

### Column schema (each row)

| Column | Description |
| --- | --- |
| `vendor` | Real product name |
| `category` | One of the 22 categories above |
| `vendor_company` | Owning company |
| `positioning` | One-line: dominant / common / niche / emerging — descriptive not endorsing |
| `pricing_shape` | Per-transaction / per-month / setup-fee / freemium / contact-sales |
| `pricing_range` | Indicative Rs/transaction or Rs/month range where publicly known |
| `integration_shape` | REST API / SDK / file batch / SFTP / on-prem / hosted |
| `regulatory_anchors` | Circulars or regulatory programs the vendor's product anchors against (e.g., "SEBI Online KYC Apr 2020" for DigiLocker partners) |
| `primary_url` | Vendor's product page (verified live) |
| `notes` | Distinguishing features, known integration partners, recent news |

### Output

One markdown file at `kyc-docs-site/src/content/docs/vendors/atlas.md`. Sidebar entry added under **Vendor Integrations** as the new top item ("Vendor Atlas — All Products").

The existing per-vendor files under `vendors/identity/`, `vendors/verification/`, `vendors/depositories/`, `vendors/esign/`, `vendors/fraud/`, `vendors/exchanges/` remain. The atlas is the breadth layer; existing files are the depth (and more depth pages can be added later as separate sub-projects).

## Documentation conventions

Both pages honour the project-wide conventions (per `2026-05-14-circulars-refresh-design.md`): source traceability, reasoned doc structure, HL→LL progression, alternatives surfaced, practical notes section, vendor naming without endorsement, field-level baseline.

For both pages specifically:
- Source traceability: every blueprint row links a circular; every atlas row links the vendor's own product page.
- Reasoned structure: blueprint sorted by domain (operators find their area fast); atlas sorted by category (engineers/architects find their integration surface fast).
- Vendor naming policy: enumerate, position, never endorse. Vendor names *are* the deliverable here — this is the explicit reversal of the c343ac1 de-opinionating commit, scoped to the atlas page.

## Workflow

**Parallel research dispatch — 8 agents in one tool-use batch**:

- **Compliance Blueprint** (4 agents, by domain cluster):
  - Agent A: KYC lifecycle + AML/PMLA + Edge cases (~70–100 rows)
  - Agent B: Margin + Client funds + Settlement + Surveillance (~70–100 rows)
  - Agent C: Cyber + BCP + Audit + Reporting (~70–100 rows)
  - Agent D: Grievance + DPDP + Member compliance + Investor servicing + Exchange/depository registration (~50–80 rows)
- **Vendor Atlas** (4 agents, by category cluster):
  - Agent E: Trading platforms (OMS/EMS/RMS) + Back-office (~30–50 vendors)
  - Agent F: KYC + Verification + AML + Face match + OCR + CKYC connectors (~40–60 vendors)
  - Agent G: eSign + AA + Payment/mandate + DLT + Email + Credit bureau + ITR (~50–70 vendors)
  - Agent H: MF platforms + IPO + Pledge + Algo/Quant + Market data + Comms + Servicing (~40–60 vendors)

Each agent's output written to a working file. Main session consolidates into the two final pages.

**Stagger safety net:** if mid-sweep we see rate-limit pressure (per the experience in sub-project #1), I'll proactively halt remaining dispatches and recover from working files (post 5pm IST reset window).

## Risks

- **Vendor verifiability**: some Indian broker software vendors don't publish public pricing or detailed product pages — agents will use industry reports, news, and broker-blog mentions where direct product pages don't exist.
- **Compliance row count overshoot**: 400 is the upper bound; if research finds 500+ verifiable touchpoints, we sub-page the blueprint by domain (similar to circulars).
- **Cross-references to circulars**: blueprint rows reference circulars by ID — must validate that referenced IDs exist in the sub-pages from sub-project #1. Script will flag orphans.
- **Vendor naming risk**: introducing vendor names re-opens the de-opinionating concern. Mitigated by strict "enumerate, position, don't endorse" rule and a banner on the atlas page.

## Success criteria

- **Compliance Blueprint**: ≥200 rows across ≥12 domains; every row has owner_role, evidence, frequency; ≥90% of rows have a linked circular reference; AI disclaimer + verified-through stamp present.
- **Vendor Atlas**: ≥150 vendor entries across ≥18 categories; every entry has a primary URL (verified); each category has 3+ entries; pricing shape filled where publicly known; AI disclaimer + verified-through stamp present.
- Site builds clean (Astro + Pagefind).
- Sidebar updated with both new pages.
- Three commits: blueprint, atlas, sidebar+README sync.

## Out of scope (this sub-project)

- Per-vendor deep-dives (separate follow-ups; the atlas is breadth-first).
- Per-compliance deep-dives (separate follow-ups).
- Process narrative (sub-project #6 — separate).
- Field-level data flow (sub-project #3).
- Integration DAG (sub-project #4).
- Re-KYC lifecycle detail (sub-project #5).

## Next step

After user approval: invoke `writing-plans` for the consolidated implementation plan covering both sub-projects, then execute in parallel.

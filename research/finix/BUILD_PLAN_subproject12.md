# Finix Broking Setup — build plan and progress

Sub-project #12. New section `finix-broking-setup` in `kyc-docs-site/src/content/docs/`.
Brief: a heavy operational manual / process documentation for standing up and running
an Indian broking operation on a **named vendor stack**, at literal implementation and
config level, covering every order type, every RMS/back-office check, forward and return
order paths, exchange-by-exchange nuances, BOD/EOD, money movement, and midday firefighting.

## The named stack (explicitly authorised by the user for this sub-project)

| Plane | Product | Verified public facts used |
|---|---|---|
| OMS / RMS / dealer terminal | **Saral MoneyMaker** (Saral Information Technology Pvt Ltd) | Money Maker Client Solo (multi-exchange dealer terminal NSE/BSE/MCX/NCDEX), Money Maker Browser, Money Maker Handy (mobile), Money Maker Challenge (algo + Auto Trader + Modeler), Pharos tool, SPAN margining, limits at ID/client/scrip level, VAR+ELM computed pre-release, RMS Failed Order Book, Exposure View, Net Obligation view, basket orders, GTT, Stock SIP, TradingView charts, option chain/Greeks, bulk file upload, direct multicast, back-office integration |
| Back office + middleware + compliance | **SecMark** (SecMark Consultancy Ltd, BSE: 543234) | Back Office Solution (broking, DP, institutional, prop; 300+ clients claim), Middleware & API Suite (order orchestration, real-time risk checks, margin validation, trade lifecycle, reconciliation), Partner Portal (sub-broker/branch, commission), SmartReco (reconciliation), e-KYC, Mobile/Web Trading, C-Safe (screening across 50+ lists incl. SEBI, UNSC, OFAC, PEP), AML Sutra (transaction monitoring + STR in FINNet 2.0 format), ComplianceSutra (6 modules: Governance, Risk, Compliance, Audit, Project, Task). Acquired iBeats and Busiwin back-office products. |
| KYC / eSign / eStamp / mandates | **Digio** | DigiKYC (Aadhaar/PAN, OCR, Face Sync, CKYC, KRA, DigiLocker, offline Aadhaar, Video KYC), DigiSign (Aadhaar eSign OTP/biometric/iris/face-match, USB DSC, Document Signer Certificate, stylus electronic signature), eStamping, DDPI and Nomination document preview with digital e-stamp duty payment, eNACH/NACH eMandate + UPI AutoPay, AML/CFT screening, template-based document and agreement management |
| KRA | **CVL KRA** primary (CDSL Ventures Ltd) + four-KRA interop (NDML, CAMS, Karvy/KFin, DotEx) | 5 SEBI-registered KRAs; mandated back-end interoperability so a query to one returns the record; duplicate upload of an already-compliant investor is rejected and must be downloaded instead; CVL provides API to push customer data + images and to check status/fetch/submit |
| CKYC | **CERSAI CKYCRR**, now **CKYCRR 2.0** | CKYCRR 2.0 went live 1 Aug 2026, phased; pilot/readiness testing extended to 5 Oct 2026; real-time API-first replacing PDF/batch; structured JSON/XML; four core API patterns (Search, Download-with-OTP, Generate/Upload, Update); mandatory OTP consent, Aadhaar masking, AI de-duplication, risk-tiered update schedule; SFTP retained for bulk; CERSAI awarded Rs 161 crore rebuild contract |
| PEP / sanctions / AML | SecMark **C-Safe** + **AML Sutra** | screening across 50+ global/domestic lists (SEBI debarred, UNSC, OFAC, PEP); transaction monitoring and STR generation in FINNet 2.0 format |
| Payments | **Razorpay** PG (pay-in) + **RazorpayX** Payouts | Payouts via UPI/IMPS/NEFT/RTGS; contact → fund account → payout object model; bulk add, queueing; webhook callback on every state change; Smart Collect 2.0 virtual accounts for automated bank-transfer reconciliation; `settlement.processed` event; UTR used to reconcile against bank statement |
| Exchanges | **NSE, BSE, MCX** — cash, F&O, currency, commodity | see exchange research below |
| Depository | CDSL / NSDL (DP or tie-up) | existing site coverage |

## Verified regulatory anchors specific to this sub-project

- **SEBI (Stock Brokers) Regulations, 2026** — notified 7 Jan 2026, SEBI/LAD-NRO/GN/2026/291, Gazette of India Extraordinary Part III Sec 4, GI/2026 (143). Full repeal of the 1992 regulations. 11 chapters, 51 regulations: I Preliminary (1–3), II Registration (4–14), III General Obligations (15–20), IV Fraud Prevention & Detection (21–26), V Inspection (27–32), VI Default Action (33), VII Enforcement Relaxation (34–35), VIII Code of Conduct (36–39), IX Fee Payment (40–46), X Networth & Deposits (47–48), XI Miscellaneous (49–51).
  - Designated director resident in India ≥182 days per FY (existing brokers: 6-month window)
  - ≥2 years' experience in trading/dealing in securities
  - Reg 18(2)(c) strict segregation of client money and securities from own and from other clients
  - Reg 20(d) cash from clients prohibited by statute
  - Reg 16 record retention minimum 8 years
  - Reg 10(e) complaint redressal within 21 calendar days
  - Reg 18(5) statutory cyber security and cyber resilience obligation
  - Reg 18(6) continuous SCORES/ODR enrolment
  - Reg 19 Qualified Stock Brokers, size-based, incl. orderly wind-down
  - Reg 23(8) explicit mule-account detection obligation
  - Reg 25 mandatory whistle-blower policy with confidential channel and retaliation protection
  - Reg 2(1)(g), 15(2) Execution Only Platforms formally defined
  - Reg 3 single registration covers stock broker and clearing member roles
  - Net worth: TM ₹1 cr, SCM ₹5 cr, CM ₹15 cr, PCM ₹50 cr
  - Chapter IX fees: segment-wise turnover fee ₹1–₹10 per crore; clearing member ₹50,000 p.a.; 1% per month interest on delay (Reg 44(2))
  - Registration routed through the exchange; exchange forwards with recommendation within 30 days
- **Client Unpaid Securities Pledgee Account (CUSPA)** — HO/38/11/(9)2026-MIRSD-POD/I/15382/2026 dated 3 Jul 2026, amending para 46 of the Master Circular for Stock Brokers (17 Jun 2025). ALREADY IN INDEX → anchor `#ho381192026-mirsd-podi153822026`
  - auto-pledge at pay-out without client instruction, reason "unpaid"; email/SMS notice
  - daily max-pledge-value recomputation from ledger + margin obligation; release excess by next trading day
  - payment window capped at 5 trading days from pay-out
  - extension request by 6 PM on 5th trading day (lower circuit sellers-only, suspension/halt, other MII-recognised cause); up to one additional calendar week, renewable with fresh client communication
  - day 6 depository auto-release if neither invoked nor released
  - invocation → block in client demat → depository verifies block against client-level obligation → sell under client UCC → surplus to client ledger
  - CUSPA securities may not be further pledged or transferred to banks/NBFCs
  - may count for margin collection reporting; no client trading exposure permitted against them
  - paras 46.1–46.11 effective 3 months from exchange operational guidelines; 46.12–46.14 effective 6 months from 3 Jul 2026; exchange guidelines within 30 days
- **Project Jagrook investor awareness messages** — SEBI circular 1 Oct 2026 under s.11(1) SEBI Act. Website landing pages + trading app landing pages. 5–31 Oct 2026 messages + existing risk disclosures on websites, app display voluntary; from 1 Nov 2026 mandatory on website landing pages and apps must display messages and risk disclosures on alternate days. Supplements the 19 May 2023 risk-disclosure circular. Exchanges/depositories to inform members and update bylaws. Circular number not yet verified → mark `[not yet in index]`.
- **Master Circular for Stock Brokers** SEBI/HO/MIRSD/MIRSD-PoD/P/CIR/2025/90 (17 Jun 2025) — in index, anchor `#sebihomirsdmirsd-podpcir202590`

## Exchange / membership research (verified)

**NSE membership** — net worth TM ₹1 cr, SCM ₹5 cr, CM ₹15 cr, PCM ₹50 cr; plus variable net worth = 10% of average daily cash balance of clients retained across segments/exchanges over previous 6 months. BMC deposit by trading type: prop without algo ₹10 L; client-only without prop and without algo ₹15 L; prop + client without algo ₹25 L; any member with algo ₹50 L. ₹1 L cash IFSD to NSE Clearing (not required if CM/SCM clears and settles only on gross basis for both securities and funds with no settlement guarantee). Application processing fee ₹10,000 + tax (₹5,000 for exclusive EGR). One-time admission fee ₹5,00,000 + tax for all segments except exclusive Commodity (₹1,00,000) and exclusive Debt (₹50,000); ₹50,000 if applying for Cash + FO + CD + COM collectively.

**BSE membership** — TM/LTM net worth ₹1 cr, SCM ₹5 cr, TCM ₹15 cr, PCM ₹50 cr. Deposit-based membership against ₹10,00,000 deposit; ₹1 L earnest money with application. Individuals, corporates, partnership firms and LLPs eligible. Connectivity: BSE Open Message Bus / BOLT Plus IML API (EQ, EQD, CDX); separate connection AND separate IML instance per segment; application connects by user registration request through IML.

**MCX membership** (MCX's own published FAQ figures — flag as exchange-published, read with the 2026 regulations) — TM net worth ₹10 L individual / ₹25 L corporate; TCM ₹75 L; PCM ₹500 L. Minimum paid-up capital ₹30 L. Processing charges ₹10,000 + taxes non-refundable (MCX/MEM/669/2019 dated 26 Nov 2019). TM admission fee ₹7,50,000 non-refundable. Eligible: individual/proprietorship, registered partnership, HUF, private limited, public limited, co-operative societies.

**NSE connectivity / user IDs** — CTCL facility lets a TM use its own front end; access by unique User ID. NEAT IDs convertible to Non-NEAT Front End (NNF); 12-digit terminal IDs created by the TM and reported to the exchange before routing any order. NEAT-to-CTCL / non-NEAT user ID conversion applied for through NSE-ENIT per circular NSE/MSD/67755 dated 29 Apr 2025. Facilities available: CTCL, IBT, DMA, STWT, Algorithmic Trading, SOR, API. WAN over TCP/IP; interactive TCP/IP connectivity for user-specific messages; front end may connect through middleware called Trading Access Point (TAP). NNF protocol documents published per segment (e.g. TP_COM_Trimmed_NNF_Protocol_2.9, SLBM NNF Protocol 2.5/2.6).

**NSE Clearing member reports** — CSV, specified structure, delivered to the member's Reports folder on the Extranet; cover trades, obligations, deliveries, auctions, corporate actions, settlements, shortages. Daily Obligation report = daily cumulative net buy/sell position for a trading day. Final Obligation report = net securities and funds obligation, downloaded T+1. Bank Summary report = transactions in the member's clearing account at the clearing bank. Daily Funds Statement = break-up of debits/credits in the clearing bank account. ENIT at https://enit.nseindia.com/MemberPortal/ ; path ENIT-COMPLIANCE-NEW > Compliance > Status Report.

**Margin collection and reporting** — CM/custodian reports margin collected from each client/TM/CP as at EOD and the peak margin collected during the day; reporting cut-off T+5 working days. Penalty slabs around 0.5% / 1% of shortfall by amount and percentage thresholds (short-collection < ₹1 lakh AND < 10% of requirement → 0.5%; ≥ ₹1 lakh or ≥ 10% → 1%), escalating to 5% per day where the same shortfall persists beyond three consecutive days or recurs more than a set number of times in a month; GST 18% on penalty. TREAT PRECISE SLABS AS DIRECTIONAL — cite exchange circular and mark unverified figures.

**MCX trading / delivery** — non-agri (bullion, base metals, energy) 09:00–23:30 IST, to 23:55 during US daylight saving; select agri such as cotton 09:00–21:00; other agri 09:00–17:00. Staggered delivery tender period = last 3 trading days including expiry day; 8.34% incremental margin across those days. Delivery period margin = higher of (3% + 5-day 99% VaR of spot price volatility) or 25%. Delivery intention by buyer or seller on any tender day till 19:30 through MCXCCL eClear. Sellers exempt from all margins if goods tendered as early pay-in with documentary evidence, except MTM which MCXCCL continues to collect.

**Order types verified (NSE)** — market, limit, stop-loss market, stop-loss limit, IOC (partial match possible, unmatched portion cancelled immediately), disclosed quantity (part of order quantity shown to market), AMO (equity 15:45–08:57, F&O until 09:10, released to exchange ~09:00, modifiable/cancellable before release; limit and market variants), GTT (long-dated, up to about a year).

## Page inventory (status: [ ] todo, [x] done)

### Section root
- [x] index.md — section landing

### stack/ (4)
- [x] index.md
- [x] vendor-map.mdx
- [x] environments-config-baseline.mdx
- [x] integration-contract-matrix.mdx

### setup/ (11)
- [x] index.md
- [x] 01-entity-capital-structure.mdx
- [x] 02-sebi-registration-2026.mdx
- [x] 03-exchange-membership.mdx
- [x] 04-clearing-arrangement.mdx
- [x] 05-depository-participant.mdx
- [x] 06-bank-account-architecture.mdx
- [x] 07-people-certification-org.mdx
- [x] 08-infrastructure-connectivity.mdx
- [x] 09-vendor-onboarding-contracts.mdx
- [x] 10-certification-mock-golive.mdx

### onboarding/ (8)
- [x] index.md
- [x] 01-digio-integration.mdx
- [x] 02-kra-cvl-integration.mdx
- [x] 03-ckyc-ckycrr2-integration.mdx
- [x] 04-pep-sanctions-screening.mdx
- [x] 05-ucc-registration-exchanges.mdx
- [x] 06-esign-ddpi-pledge-setup.mdx
- [x] 07-account-modification-closure.mdx

### oms/ (11)
- [x] index.md
- [x] 01-oms-architecture.mdx
- [x] 02-exchange-connectivity-protocols.mdx
- [x] 03-user-id-ctcl-nnf.mdx
- [x] 04-order-types-catalogue.mdx
- [x] 05-order-attributes-validity.mdx
- [x] 06-order-forward-path.mdx
- [x] 07-order-return-path.mdx
- [x] 08-modify-cancel-rules.mdx
- [x] 09-algo-api-dma-sor.mdx
- [x] 10-oms-config-reference.mdx

### rms/ (10)
- [x] index.md
- [x] 01-rms-architecture.mdx
- [x] 02-margin-engine.mdx
- [x] 03-pretrade-check-ladder.mdx
- [x] 04-limit-framework.mdx
- [x] 05-collateral-pledge.mdx
- [x] 06-squareoff-engine.mdx
- [x] 07-intraday-surveillance.mdx
- [x] 08-margin-reporting-penalties.mdx
- [x] 09-rms-config-reference.mdx

### backoffice/ (11)
- [x] index.md
- [x] 01-backoffice-architecture.mdx
- [x] 02-trade-import-reconciliation.mdx
- [x] 03-contract-notes.mdx
- [x] 04-ledger-accounting.mdx
- [x] 05-settlement-obligations.mdx
- [x] 06-cuspa-unpaid-securities.mdx
- [x] 07-corporate-actions.mdx
- [x] 08-statements-retention.mdx
- [x] 09-regulatory-reporting.mdx
- [x] 10-backoffice-config-reference.mdx

### money/ (8)
- [x] index.md
- [x] 01-payments-architecture.mdx
- [x] 02-payin-rails.mdx
- [x] 03-payout-engine.mdx
- [x] 04-bank-recon.mdx
- [x] 05-treasury-exchange-funding.mdx
- [x] 06-upstreaming-downstreaming.mdx
- [x] 07-money-trade-sync.mdx

### exchanges/ (9)
- [x] index.md
- [x] 01-nse-cash.mdx
- [x] 02-nse-fno.mdx
- [x] 03-bse-cash-fno.mdx
- [x] 04-mcx-commodity.mdx
- [x] 05-cross-exchange-matrix.mdx
- [x] 06-sessions-calendars.mdx
- [x] 07-bands-halts-surveillance.mdx
- [x] 08-file-formats-downloads.mdx

### daily-ops/ (10)
- [x] index.md
- [x] 01-bod-runbook.mdx
- [x] 02-pre-open-ops.mdx
- [x] 03-continuous-session-ops.mdx
- [x] 04-close-post-close-ops.mdx
- [x] 05-eod-runbook.mdx
- [x] 06-settlement-day-ops.mdx
- [x] 07-incident-playbooks.mdx
- [x] 08-expiry-ops.mdx
- [x] 09-periodic-calendar.mdx

### compliance/ (5)
- [x] index.md
- [x] 01-compliance-config-baseline.mdx
- [x] 02-reporting-pipeline.mdx
- [x] 03-inspection-readiness.mdx
- [x] 04-cyber-cscrf-config.mdx

### Diagrams (public/diagrams/)
- [x] finix-01-stack-architecture.svg
- [x] finix-02-order-path.svg
- [x] finix-03-money-flow.svg
- [x] finix-04-trading-day-timeline.svg
- [x] finix-05-setup-roadmap.svg
- [x] finix-06-onboarding-pipeline.svg

### Wiring
- [x] astro.config.mjs sidebar entry
- [x] glossary additions
- [x] run working/wrap_abbreviations.py
- [x] npm run build
- [x] working/validate_links.py + fix_anchors_normalized.py

## Page conventions (match the existing site exactly)

1. Frontmatter `title` + `description`. `.mdx` when components used.
2. `import { Aside } from '@astrojs/starlight/components';`
3. `> **Why this page is structured this way:** …` one paragraph.
4. `## TL;DR` — 5–8 bullets, each with a **bold lead-in**, citations inline.
5. `## Conceptual overview` — 2–4 prose paragraphs, no bullets.
6. `## 1. Regulatory framework` where applicable — bulleted circular list.
7. Numbered sections thereafter. Config tables. Field tables. Runbook. Exception paths.
8. `## Practical notes` and/or `## Where this connects` near the end.
9. Cross-links as `/broking-kyc/<path>/`.
10. Circular links `/broking-kyc/reference/circulars/<issuer>/#<anchor>`; anchor = lowercase of the ID with `/`, `(`, `)`, spaces removed and hyphens kept. Unindexed → `` `[not yet in index]` ``.
11. Write abbreviations plainly; `working/wrap_abbreviations.py` adds `<abbr>` on first use per page at the end.
12. Vendor naming is authorised for this section only. Every vendor page carries the stack disclaimer.


---

## COMPLETED — 2026-10-15

88 pages, 6 SVG diagrams, sidebar wired, glossary +8 entries, 855 abbr wraps,
5,546 internal links validated with 0 broken, 323 pages build clean.

### Correction made during the build

**BSE connectivity.** Initial pages stated that BSE requires a separate connection
and a separate IML protocol instance per segment. Research during the wiring phase
established that **the legacy IML interface is discontinued** and the current
interactive interface is **BSE ETI (Enhanced Trading Interface)**, session-oriented,
requiring **a separate session per segment** while **the participant identifier
remains common across segments**, with **API versions mandated by the exchange**.
Corrected across 13 pages; exchanges/03-bse-cash-fno.mdx rewritten. The claim was
downgraded from "three separate integrations" to "per-segment session management";
per-segment certification still holds.

### Figures that need re-verification before production use

- MCX published net worth figures (TM Rs 10L individual / Rs 25L corporate, TCM
  Rs 75L, PCM Rs 500L) conflict with Chapter X of the 2026 regulations (TM Rs 1 cr).
  Flagged on the page; needs written clarification from the exchange.
- Margin penalty slabs (0.5% / 1%, escalation to 5% per day) are from the 2011 grid
  adopted by reference; verify against the current exchange circular.
- Project Jagrook circular number not verified (1 Oct 2026, investor awareness
  messages mandatory from 1 Nov 2026).
- SEBI (Stock Brokers) Regulations 2026 regulation numbers are from professional
  commentary, not the gazette text. Flagged on the page.
- NSE/FAOP/49677, NSE/MSD/67755, LPP ranges, expiry standardisation circular,
  CKYCRR 2.0 category dates — all marked [not yet in index].

# System monitoring that must be communicated to the exchange

| Research boundary | Treatment |
|---|---|
| As-of date and intended business | **15 October 2026.** Greenfield Indian stockbroker seeking NSE, BSE and MCX trading membership; IBT/STWT (internet and wireless) trading offered from day one. This is a research inventory for an operations manual, not an assurance that every exchange-specific onboarding artefact has been seen. |
| Evidence notation | **[verified]** = the primary document was downloaded and read in this session; the clause/page is named and the URL resolves to the file actually inspected. **[likely]** = two or more named independent sources agree. **[uncertain]** = one weak or secondary source only. **[unknown]** = not established; stated as a gap rather than guessed. **[verified-carried]** = verified in an earlier session of this same project and recorded in a sibling `RESEARCH_*.md`, but not re-fetched today. |
| Named-entity discipline | No circular number, parameter name, threshold, portal name or email address in this document is inferred. Every one appears verbatim in a document read in this session, or is explicitly tagged otherwise. Where a primary source contradicts itself or another primary source, both readings are shown and the conflict is flagged rather than reconciled. |
| Days | "Working days", "trading days", "calendar days" and an unqualified "days" are reproduced exactly as the source states them. The 2022→2026 change from *14 days* to *14 working days* is a real change, not a paraphrase. |
| Applicability classes used below | **Applicable broker** = IBT/STWT broker above the framework's client threshold. **Specified stock broker / Specified Member** = the exchange-designated subset that carries LAMA and the enhanced DR obligations. **QSB** = Qualified Stock Broker (separate SEBI designation, separate exchange list). **RE / Qualified RE / Mid-size / Small-size / Self-certification RE** = CSCRF categories. These four classification systems are independent and are *not* interchangeable. [verified] NSE/COMP/73981 §33.9; NSE/INSP/56927 Annexure A; CSCRF Table 4. |
| Exchange coverage | SEBI's framework is addressed to "All recognized Stock Exchanges" and the exchanges framed the detailed guidelines **jointly**; the NSE intimation format itself names NSE, BSE, MCX, NCDEX and MSEI as venues on which a glitch may be reported. The BSE and MCX notice numbers implementing it were **not** retrievable today (both sites returned HTTP 403 to automated access). [verified] for scope; [unknown] for BSE/MCX notice numbers. |

---

## 0. The decisive answer, stated first

The single most important distinction the brief asks for:

| Question | Answer | Confidence |
|---|---|---|
| Is a *typical* broker pushing continuous system telemetry to the exchange? | **No.** For every broker outside the exchange-designated "Specified stock brokers" list, the obligation is **incident-triggered reporting plus internal self-monitoring**. There is no routine system-health return, no periodic performance file, no telemetry stream. The NSE compliance master's own mandatory-submissions chapter contains no technology-telemetry return for ordinary brokers. | [verified] NSE/COMP/73981 Chapter IV (§§27–44) and §33; SEBI 09-Jan-2026 §§7, 10 |
| Is *any* broker pushing continuous system telemetry to the exchange? | **Yes — the "Specified stock brokers" only, and continuously, in real time, through LAMA.** The broker builds an API-based gateway and **serves** the values of 12–14 named key parameters from it; the exchange **independently monitors those parameters in real time** through that API gateway. NSE's own common-submissions list records the periodicity of "Parameters for monitoring Technical Glitches" as **"Real time"**. | [verified] SEBI 09-Jan-2026 §10.1; NSE/COMP/72254 Annexure 2 §7.1; NSE/COMP/73981 §33.7; NSE/INSP/73976 Exhibit 53 item 44 |
| Which direction does the data move, and does the exchange install an agent? | The broker **builds and serves**; the exchange **consumes/monitors through the API gateway**. The verbs in the primary text are "shall build API-based Logging and Monitoring Mechanism (LAMA) **to allow** stock exchanges to monitor", "values … **should be served by** the Specified stock brokers", and "Stock exchanges will, **through the API gateway**, independently monitor these key parameters in real-time". The system auditor's version adds that data "**is being published in the LAMA server**". **No primary source read today mentions an exchange-installed agent, collector, or on-premise appliance.** So: broker-hosted endpoint/server, exchange-side consumption. Whether the transport is exchange-pull or broker-push *into* an exchange-side LAMA server is **not resolved by the public text** — "served by" reads as pull, "published in the LAMA server" reads as push, and the two phrasings sit in different NSE documents. | [verified] for the obligation and the absence of any agent language; **[unknown]** for pull-vs-push at the wire level |
| Where is the technical specification? | **Not public.** The 2022 exchange circular states that "'Specified Members' will be notified by the Stock Exchanges, for onward discussion on the implementation and applicability of 'LAMA' and its key parameters." The endpoint schema, authentication, polling interval and payload format are communicated bilaterally to designated members. No published spec was found. | [verified] NSE/COMP/54876 §5 closing line; [unknown] for the schema itself |

**Operational consequence for a greenfield broker.** Finix will not be a Specified stock broker on day one — that list is the exchange's top 20 by IBT/STWT clients, published at the start of each financial year. Finix therefore has **no LAMA obligation at launch**, and no continuous telemetry obligation to the exchange at launch. What Finix *must* build at launch is (a) the internal monitoring and 70%-of-installed-capacity alerting that the framework and the system-audit TOR both require of *all* brokers, and (b) the incident-reporting machinery (2h / T+1 / 14 working days). The LAMA gateway is a **design-for-later** item — but because the parameter list is published, it can be designed in from the start at near-zero marginal cost. See §8.

---

## 1. The technical glitch framework

### 1.1 The circular chain, exactly

| Instrument | Number as printed | Date | Status | Evidence |
|---|---|---|---|---|
| SEBI original framework | **SEBI/HO/MIRSD/TPD-1/P/CIR/2022/160** | **25 November 2022** (note: *not* 30 November) | **Superseded** expressly by the 2026 circular §14 | [verified] quoted in SEBI 09-Jan-2026 §1 and §14; quoted again in NSE/COMP/54876 and NSE/COMP/66369 |
| Exchange detailed guidelines (original), jointly framed | **NSE/COMP/54876**, Circular Ref. No. 76/2022 equivalent | **16 December 2022** | Superseded for substance; **still the operative citation inside NSE's system-audit TOR items 17(u)–17(w)** (see §2.8) | [verified] `COMP54876.zip`; SEBI 09-Jan-2026 §1 confirms the 16-Dec-2022 date |
| Effective date of the 2022 framework | — | **1 April 2023** | Historic | [verified] NSE/COMP/54876 covering page |
| SEBI consolidation | Master Circular for Stock Brokers **SEBI/HO/MIRSD/MIRSD-PoD/P/CIR/2025/90**, **paragraph 65** | 17 June 2025 | Carried the 2022 framework; overtaken by the 2026 circular | [verified] NSE/COMP/73981 footnote 40 |
| **SEBI revised framework** | **HO/38/44/12(1)2026-MIRSD-TPD1** (NSE renders it "SEBI/HO/ 38/44/12(1)2026-MIRSD-TPD1") | **9 January 2026** | **Operative.** "This circular shall come into effect from January 09, 2026." Issued under s.11(1) SEBI Act 1992 and **Regulation 50 of SEBI (Stock Brokers) Regulations 2026** | [verified] `sebi_jan2026_glitch.pdf` §§14, 16, 18; signed Vishal M Padole, GM, MIRSD |
| Exchange detailed guidelines (revised), jointly framed | **NSE/COMP/72254**, Circular Ref. No. **03/2026** | **9 January 2026** | **Operative** from 9 January 2026. SEBI circular = Annexure 1; **joint exchange guidelines = Annexure 2**; disincentives = Annexure A; Preliminary Incident Report = Annexure B; RCA = Annexure C | [verified] `COMP72254.zip` |
| NSE compliance master restating it | **NSE/COMP/73981**, §33 (Annexure A = main PDF, 124pp; Annexure C = Exhibits) | **30 April 2026** (PDF creation date) | Operative restatement; **Exhibits 39/40/41 are byte-identical in content to Annexures A/B/C of NSE/COMP/72254** | [verified] diffed by reading both |
| Specified-Members list in force | **NSE/COMP/66369**, Circular Ref. No. 06/2025 — "Revised List of Specified Members for the Framework on Technical Glitches" | **29 January 2025** | Operative list; new entrants' enhanced obligations began **1 April 2025**. Predecessor list: **NSE/COMP/57720**, 26 July 2023 | [verified] `COMP66369.pdf`; cited as the live list by NSE/COMP/73981 footnote 41 and by system-audit TOR 26(f) |
| System audit framework carrying the glitch/LAMA TOR | **NSE/INSP/73850**, Circular Ref. No. 20/2026, "System Audit of Trading Members" | **22 April 2026** | Operative TOR | [verified] `INSP73850.pdf` |

### 1.2 Scope threshold — 2022 vs 2026

| Dimension | 2022 framework | 2026 framework | Evidence |
|---|---|---|---|
| Who the framework binds | **All members providing IBT/STWT** to their clients. **No client-count threshold at all.** | **IBT/STWT brokers with more than 10,000 registered clients (excluding closed accounts) as on 31 March of the previous financial year.** | [verified] NSE/COMP/54876 covering page; SEBI 09-Jan-2026 §6.1, NSE/COMP/72254 Annexure 2 §3.1, NSE/COMP/73981 §33.3 |
| Institutional clients | [unknown] — not addressed in the 2022 covering text read today | **Excluded** from the count determining applicability | [verified] NSE/COMP/72254 Annexure 2 §10; NSE/COMP/73981 §33.9(b) |
| Who publishes the applicable-broker list | — | **The stock exchange** shall "issue detailed guidelines in this regard and disseminate the list of applicable stock brokers" | [verified] SEBI 09-Jan-2026 §6.2 |
| LAMA sub-scope | **Specified Members** = top 20 members by IBT/STWT clients. Clauses 3.viii, 4.vi, 5.i, 5.ii, 5.iii, 6.v, 6.xiii, 6.xiv applied *only* to them | **Specified stock brokers** = top 20 by IBT/STWT clients; **list published at the beginning of every financial year on the exchange website** | [verified] NSE/COMP/54876 covering page; NSE/COMP/72254 Annexure 2 §9; NSE/COMP/73981 §33.9(a) |
| BCP/DR sub-scope | **Specified Members** *and* members with **≥ 50,000 clients across all Exchanges** | Members with a **minimum client base of 50,000 clients across all Exchanges** | [verified] NSE/COMP/54876 §6.i; NSE/COMP/72254 Annexure 2 §8.1; NSE/COMP/73981 §33.8(a) |
| Capacity-planning sub-scope | Applied to all members in scope; **quarterly** peak-load determination, **1.5x** installed capacity for everyone | Tiered: QSB / Specified / remaining (see §3) | [verified] NSE/COMP/54876 §3.v; NSE/COMP/72254 Annexure 2 §§5.5–5.8 |

**The "top 20" vs 42-name conflict — flag this in the manual.** §33.9(a) of the April 2026 NSE compliance master says the **top 20** brokers are classified as Specified stock brokers. The list printed immediately below it in the same document, and sourced to NSE/COMP/66369, contains **42 named trading members** (5paisa through Zerodha). The 29-January-2025 circular itself reads as an *additive* revision — it adds five new names to a list carried forward from NSE/COMP/57720 (26 July 2023) rather than re-cutting a top-20. So the published roster has grown well past the stated criterion. **Do not design on the assumption that "top 20" caps the list at twenty names.** Treat the exchange's published list as controlling and re-check it at the start of each financial year. [verified] NSE/COMP/73981 §33.9(a) and the 42-row table beneath it; NSE/COMP/66369 body text.

### 1.3 What counts as a technical glitch

The definition is **identical word-for-word** in SEBI 09-Jan-2026 §5.1, NSE/COMP/72254 Annexure 2 §1.1 and NSE/COMP/73981 §33.1. [verified]

| Element | 2022 | 2026 | Evidence |
|---|---|---|---|
| Core wording | "any malfunction in the Member's systems including malfunction in its hardware, software, networks, processes, or any products or services provided by the Member in the electronic form" | "any malfunction in the electronic system of stock broker, including malfunction in its hardware, software, **networks/bandwidth**, processes or products or services, **directly or indirectly related to trading and risk management, occurred during trading session of stock exchange**" | [verified] NSE/COMP/54876 §1; SEBI 09-Jan-2026 §5.1 |
| Named causes | Explicitly included "inadequate Infrastructure/systems, **cyberattacks/incidents**, procedural errors, and omissions, or process failures or otherwise" | Cause list **dropped**; cyberattack no longer named as a glitch cause (cyber incidents now run entirely on the CSCRF/FIRE track — §7.1) | [verified] both texts, by comparison |
| Outsourced systems | In scope — "in their own systems or the one outsourced from any third parties" | In scope — "The malfunction in the systems of stock brokers **or the one outsourced from any third parties**" | [verified] both |
| Affected functions | "normal functions/operations/services of systems of the Member" — broad | **Enumerated**: "trading and risk management functions such as **log-in, order placement (including modification, cancelation, execution, confirmation, status), allocation and viewing of margin/collateral/funds** etc." | [verified] SEBI 09-Jan-2026 §5.1 |
| Impact modes | stoppage, slowing down or variance | stoppage, **slowing down** or variance — **degradation counts, not only outage** | [verified] both |
| **Duration trigger** | **contiguous period of five minutes (5 minutes) or more** | **contiguous period of five minutes or more** — unchanged | [verified] both |
| Window | Not expressly limited to the trading session in the 2022 wording read today | **"occurred during trading session of stock exchange"** — expressly limited | [verified] SEBI 09-Jan-2026 §5.1 |
| 'Critical Systems' definition | "all IT systems that are related to Trading applications and trading-related services" | "all IT systems that are related to trading applications and trading related services" — unchanged | [verified] NSE/COMP/54876 §1; NSE/COMP/72254 Annexure 2 §5.7 |

**The six exclusions (new in 2026 — there were none in 2022).** These are *not* reportable at all: "irrespective of the time of occurrence and accordingly **need not be reported to Exchanges**". [verified] SEBI 09-Jan-2026 §5.2; NSE/COMP/72254 Annexure 2 §1.2; NSE/COMP/73981 §33.1(a)–(f).

| # | Exclusion, as worded | Operational caution |
|---|---|---|
| i | "Technical glitches occurred due to **global issues** such as malfunction or technical disruption at the **cloud service providers** or any other global technology provider or any technical issue causing **widespread disruption**" | The qualifier is *global / widespread*. A failure of **your** tenancy, **your** region, **your** cluster, or **your** outsourced vendor is not global. Retain provider status-page evidence and blast-radius evidence before claiming this. |
| ii | "Technology disruption due to technical issues **at MII**" | Exchange/CC/depository-origin. Keep the exchange's own incident notice as evidence. Note Annexure B field 7 separately asks whether the issue was "encountered on the Exchange-provided environment". |
| iii | "Technological glitches observed while processing of **new trading account (KYC process)**" | Onboarding/eKYC outages are out of this framework entirely — they remain a service/grievance matter. |
| iv | "Technical issues at the **Back-office** which does not impact the trading and settlement of the clients" | The carve-out is conditional. A back-office failure that reaches trading or settlement is **in** scope. |
| v | "The failure of **payment gateway** applications due to technical issues exist at **banks** or at the service provider or at **payment aggregators** end" | Locates the fault at the bank/PA/PG. Your own funds-allocation layer failing is in scope — "allocation and viewing of margin/collateral/funds" is named in the definition. |
| vi | "Technical issues observed in the **decision support tools** such as technical charts, profit and loss statements, back office reports etc." | Charts and P&L are out. Order placement and margin viewing are in. Draw this line in the monitoring taxonomy, not in the incident call. |

### 1.4 Reporting timeline — each of the brief's three claims, verified

| Claim in the brief | Verdict | Exact operative text | Evidence |
|---|---|---|---|
| "Intimation within 2 hours of occurrence" | **Correct for 2026.** Was **1 hour** under 2022. | "Stock brokers shall inform regarding the technical glitch to the stock exchanges **and also to their clients** within **2 hours from the time of occurrence** of the glitch." 2022: "immediately but **not later than 1 hour** from the time of occurrence". | [verified] SEBI 09-Jan-2026 §7.1 / NSE/COMP/72254 Annexure 2 §4.1 / NSE/COMP/73981 §33.4(a); NSE/COMP/54876 §2.i |
| "Preliminary incident report by T+1" | **Correct**, with a relief added in 2026. | "within **T+1 day** of the incident (T being the date of the incident). However, **if T+1 day falls on a trading holiday; submission may be done on next trading day**." The trading-holiday relief did **not** exist in 2022. | [verified] SEBI 09-Jan-2026 §7.3; NSE/COMP/54876 §2.ii |
| "Root cause analysis within 14 working days" | **Correct for 2026 — and this is a substantive change.** 2022 said "within **14 days**", unqualified. | "within **14 working days** from the date of the incident." | [verified] SEBI 09-Jan-2026 §7.4; NSE/COMP/54876 §2.iii |

Full clock table:

| Trigger | Deliverable | Clock | Recipient / channel | Who | Evidence |
|---|---|---|---|---|---|
| Glitch ≥ 5 contiguous minutes, during the trading session, not excluded | **Intimation of Incident** — Annexure B / Exhibit 40 Part 1 | **T-day, within 2 hours of occurrence** | Stock exchanges **and clients** | Applicable broker | [verified] SEBI §7.1; Annexure B part 1 header "(T-day, within 2 Hour of the Incident)" |
| Same | **Client notification** | Within the same 2 hours | **Broker website** *and* at least one of SMS / email / pop-up in the mobile or web trading app | Applicable broker | [verified] SEBI §7.2; NSE/COMP/73981 §33.4(b) |
| Same | **Preliminary Incident Report** — Annexure B / Exhibit 40 Part 2 | **T+1 day**; if T+1 is a **trading holiday**, next trading day | Stock exchange, via Samuhik Prativedan Manch | Applicable broker | [verified] SEBI §7.3, §7.5 |
| Same | **Root Cause Analysis Report** — Annexure C / Exhibit 41 | **14 working days** from date of incident | Stock exchange, via Samuhik Prativedan Manch | Applicable broker | [verified] SEBI §7.4, §7.5 |
| Glitch **lasting more than 45 minutes** | **Independent auditor's report on the RCA** | **Within 45 days of the incident** | Stock exchange | Applicable broker | **[verified] but single-source among the 2026 instruments** — present in **NSE/COMP/73981 §33.4(f)** only. It is **absent from SEBI 09-Jan-2026 §7 and from NSE/COMP/72254 Annexure 2 §4.** The 2022 analogue (NSE/COMP/54876 §2.iii) required independent-auditor *verification* of the RCA for incidents > 45 minutes but set **no separate 45-day clock**. Treat the 45-day clock as an NSE requirement; verify independently for BSE/MCX. |
| Claiming the disincentive exemption | **System auditor's certificate** on the affected-client threshold | [unknown] — no clock stated | Stock exchange | Applicable broker claiming exemption | [verified] NSE/COMP/72254 Annexure 2 §2.3; clock **[unknown]** |
| Exchange side | Dissemination of the glitch incident on the exchange website | — | Public | Exchange | [verified] SEBI §7.1, §13 |
| Exchange side | Examination of all glitches "reported by stock brokers **as well as independently monitored by stock exchanges**" | — | — | Exchange | [verified] SEBI §7.6 — note the explicit acknowledgement that the exchange detects glitches on its own |

**2022 reporting channel, for historical contrast:** "The reporting would be made to a dedicated email address **infotechglitch@nse.co.in**, which is common across the Exchanges", using the formats in Annexure B of that circular. [verified] NSE/COMP/54876 §2. Replaced in 2026 by Samuhik Prativedan Manch (§4). Whether the legacy mailbox remains live as a fallback is **[unknown]**.

### 1.5 Financial-disincentive structure — both frameworks in full

**2026 structure** — NSE/COMP/72254 **Annexure A** = NSE/COMP/73981 **Exhibit 39**. All amounts verbatim. [verified]

| Part | Trigger | Specified stock brokers | All other applicable stock brokers |
|---|---|---|---|
| **A** | Threshold for Part A to apply at all | Glitch **continuing for more than 15 minutes**, counted **during the financial year** | same |
| A(i) | **6th glitch incident onwards** | **₹25,000 per instance**, "progressively increase by ₹25,000 for subsequent instances" + case-by-case additional disciplinary action | **₹10,000 per instance**, "progressively increase by ₹5,000 for subsequent instances" + case-by-case additional disciplinary action |
| A(ii) | 7th to 10th incident in the FY | "The progressive financial disincentive provision will continue." | same |
| A(iii) | **11th incident onwards** | Progressive disincentive continues **plus on-boarding of new clients (exchange-wise / segment-wise depending on nature of glitches) shall be stopped** until the exchange analyses the RCA and satisfies itself about corrective measures, **or 15 days from glitch, whichever is higher** | Progressive disincentive continues; relevant authority decides disciplinary action case-by-case. **No automatic onboarding stop** |
| B(i) | **Failure to report** the glitch incident to the Exchange | **₹5 lakh** | **₹1 lakh** |
| B(ii) | Failure to submit the **Preliminary Incident Report** by T+1 (trading-holiday relief applies) | **₹50,000 + ₹25,000 per day** while failure continues, **capped at ₹5 lakh** | **₹20,000 + ₹5,000 per day** while failure continues, **capped at ₹1,00,000** |
| B(iii) | Failure to submit **RCA within 14 working days** | same cell as B(ii) in the source table | same cell as B(ii) in the source table |
| B(iv) | **Failure to set up DR site** as per the provisions | **₹2 lakh** | **₹20,000** |
| B(v) | Failure to restore operations by moving to DR site **within RTO** | **₹1 lakh** | **₹20,000** |
| B(vi) | Failure to conduct **DR drill / live trading from DR site** | **₹1 lakh + ₹50,000 for every month** during which failure continues, **capped at ₹5 lakh per instance** | **NA** |

**2022 structure** — NSE/COMP/54876 **Annexure C**. [verified] Kept for contrast, and because it shows precisely what the 2026 "rationalisation" bought.

| Trigger | Specified Members | All other Members |
|---|---|---|
| Glitch > 15 min — **first** instance | **Observation Letter** | **Observation Letter** |
| — **second** instance | **Administrative warning** | **Administrative warning** |
| — **third instance onwards** | **₹50,000 per instance**, progressively +₹25,000 | **₹20,000 per instance**, progressively +₹5,000 |
| **More than 5** glitch incidents > 15 min in the FY | **No on-boarding of new clients** until exchange analyses RCA and is satisfied, or 15 days from glitch, whichever higher | Case-by-case disciplinary action |
| Failure to restore operations by moving to DR site within RTO | **₹2 lakh** | **₹20,000** |
| Failure to inform Exchange **within 1 hour**; failure to submit preliminary report by T+1; failure to submit RCA within 14 days (one merged cell) | **₹50,000 + ₹25,000 per day** while failure continues — **no cap** | **₹20,000 + ₹5,000 per day** while failure continues — **no cap** |
| Failure to conduct DR drill / live trading from DR site | **₹2 lakh + ₹1 lakh every month** while failure continues — **no cap** | **NA** |

**What actually changed in the money.** Read the two tables together:

| Change | Direction | Evidence |
|---|---|---|
| Per-instance charge for a >15-min glitch starts at the **6th** incident instead of the **3rd**, and the first-instance Observation Letter / second-instance Administrative Warning rungs are **gone** | Later onset, but no formal soft-landing rungs | [verified] 2022 Annexure C row 1 vs 2026 Annexure A row A(i) |
| Per-instance amount **halved** for Specified (₹50,000 → ₹25,000) and halved for others (₹20,000 → ₹10,000) | Lower | [verified] same rows |
| Escalation step for Specified **raised** (+₹25,000 → +₹25,000 unchanged in step but now applied from a ₹25,000 base) | Neutral/lower | [verified] |
| Onboarding stop moves from ">5 incidents" to the **11th incident onwards**, and becomes **exchange-wise / segment-wise depending on nature of glitches** rather than blanket | Materially later and narrower | [verified] 2022 row 2 vs 2026 row A(iii) |
| **Caps introduced** on late preliminary/RCA (₹5 lakh / ₹1 lakh) and on missed DR drills (₹5 lakh per instance) — there were **no caps** in 2022 | Lower tail risk | [verified] |
| **"Failure to report" split out as its own charge at ₹5 lakh / ₹1 lakh** — in 2022 non-intimation sat in the same merged daily-accrual cell as late reports | **Higher and sharper.** Non-reporting is now the most expensive single act in the schedule for an ordinary applicable broker (₹1 lakh flat) and for a Specified broker (₹5 lakh flat) | [verified] 2026 Annexure A B(i) |
| DR-restoration failure for Specified **reduced** ₹2 lakh → ₹1 lakh; **new** separate ₹2 lakh charge for failure to *set up* a DR site at all | Re-pointed at the structural failure rather than the event | [verified] 2026 B(iv), B(v) |
| Missed DR drill for Specified **reduced** from ₹2 lakh + ₹1 lakh/month uncapped to ₹1 lakh + ₹50,000/month capped at ₹5 lakh | Lower | [verified] |

**Terminology note that matters for how this reads in a board pack.** SEBI's October 2025 announcement adopts "**financial disincentive**" in place of "penalty" for procedural lapses and technical errors, expressly "to avoid unnecessary reputational impact on stock brokers". The glitch schedule uses that word throughout. It is still money, and it still triggers escalation. [verified] SEBI PR No.66/2025, 10 October 2025.

**Where glitch penalties do *not* live.** NSE's general enforcement annexures do not absorb the glitch schedule. Annexure 1.3 of the inspection master carries an explicit note: *"For non-complainces with respect to Technical Glitches to prevent Business disruptions, actions as prescribed under Exchange circular NSE/COMP/72254 dated Janurary 09, 2026 shall continue."* So the glitch disincentives are a self-contained schedule and are not duplicated by the generic periodic-submission penalty ladder in Annexure 1.2. [verified] NSE/INSP/73976 Annexure 1.3, final note (typo in the source reproduced).

### 1.6 Exemptions from the disincentive structure — the quantitative gate

New in 2026 and operationally important, because it is the one place the framework demands **auditor-certified log evidence**.

| Layer | Rule | Evidence |
|---|---|---|
| Qualifying glitch types | The disincentive structure does **not** apply to (a) "A technical glitch that occurred either in the **mobile-based trading application or in the web-based trading application while either of them is functioning in a proper manner**"; (b) "A technical glitch that is **minor in nature or has a minor impact** on the seamless operations" | [verified] SEBI §5.3; NSE/COMP/72254 Annexure 2 §2.1; NSE/COMP/73981 §33.2.2 |
| **Client-impact ceiling — QSBs and Specified stock brokers** | Unique clients affected must **not** exceed **the lower of**: average of **1%** of unique clients (segment-wise / exchange-wise) traded in the previous quarter, **or 5,000** unique clients (segment-wise / exchange-wise) | [verified] NSE/COMP/72254 Annexure 2 §2.2(a); NSE/COMP/73981 §33.2.3(a) |
| **Client-impact ceiling — other brokers** | Unique clients affected must **not** exceed **the lower of**: average of **2%** of unique clients (segment-wise / exchange-wise) traded in the previous quarter, **or 2,000** unique clients (segment-wise / exchange-wise) | [verified] same, (b) |
| Burden of proof | "Stock broker is required to **demonstrate to the Stock Exchange based on the audit of logs' etc.** that the above mentioned threshold criteria is met. Stock broker shall submit **system auditor's certificate** to stock Exchange in this regard." | [verified] NSE/COMP/72254 Annexure 2 §2.3; NSE/COMP/73981 §33.2.4 |
| Reporting is **not** exempted | The definition/reporting trigger is **5 contiguous minutes**. The disincentive gate is **more than 15 minutes**. An exemption from the *disincentive* is not an exemption from *reporting*. Do not wait fifteen minutes to start the reportability assessment, and do not treat a single-channel outage as unreportable. | [verified] by reading §5.1 (definition) against §2/§33.2 (disincentive) — they are separate provisions |

**Design consequence.** The exemption is unusable without per-client impact attribution in your logs. To claim it you must be able to produce, for an arbitrary 5–60 minute window, the **count of distinct UCCs affected, segment-wise and exchange-wise**, in a form an exchange-empanelled system auditor will certify, alongside the previous quarter's **average unique clients traded** on the same segment/exchange cut. The RCA format (Annexure C field 7) independently demands "Number and **percentage** of clients affected (**duly certified by Auditor**)". That is a logging-schema requirement, and it is the single most commonly under-built capability implied by this framework. [verified] Annexure 2 §2.3 and Annexure C field 7.

---

## 2. LAMA — the Logging And Monitoring Mechanism

> **Name discipline.** The acronym expands, in every primary source read today, to **"Logging and Monitoring Mechanism"** and is always qualified as **"API-based"**. The brief's phrasing "Logging And Monitoring Mechanism" is correct. SEBI's own 2026 wording is "**API based Logging and Monitoring Mechanism (LAMA)**". [verified] SEBI 09-Jan-2026 §10.1.

### 2.1 What it is, in the regulator's own words

| Source | Verbatim | Evidence |
|---|---|---|
| **SEBI 09-Jan-2026 §10.1** | "Proactively and independently monitoring technical glitches shall be one of the approaches in mitigating the impact of such glitches. In this context, **Stock Exchanges have deployed API based Logging and Monitoring Mechanism (LAMA). Stock exchanges shall continue to monitor the trading systems of the stock brokers through this mechanism.**" | [verified] |
| **SEBI 09-Jan-2026 §10.2** | "Stock exchanges shall **review the applicable provisions of LAMA** and issue detailed guidelines with regard to **applicability, key monitoring parameters and preservation of logs** etc." | [verified] |
| **NSE/COMP/72254 Annexure 2 §7.1** (joint exchange guidelines) | "…the **'Specified stock brokers' shall build API-based Logging and Monitoring Mechanism (LAMA) to allow stock exchanges to monitor the 'Key Parameters' of the 'critical systems'.** Under this mechanism, 'Specified stock brokers' shall monitor key systems & functional parameters to ensure that their trading systems function in a smooth manner. **Stock exchanges will, through the API gateway, independently monitor these key parameters in real-time to gauge the health of the 'critical systems'** of the 'Specified stock brokers'." | [verified] |
| **NSE/COMP/72254 Annexure 2 §7.1 (second clause, same number)** | "Through the **'LAMA' Gateway**, values of the 'Key Parameters' listed below **should be served by** the 'Specified stock brokers'." | [verified] — note the source has two clauses both numbered 7.1; NSE/COMP/73981 §33.7 renumbers them (i) and (ii) |
| **NSE/INSP/73850 TOR 17(u)** | "System auditor shall verify whether the specified member has **integrated all the critical systems in LAMA**. Whether **data from all the critical systems is being published in the LAMA server** in accordance with NSE/COMP/54876, dated December 16, 2022." | [verified] |
| **NSE/COMP/54876 §5 closing line (2022)** | "'Specified Members' will be notified by the Stock Exchanges, for onward discussion on the **implementation and applicability of 'LAMA' and its key parameters**." | [verified] |

**Reading.** LAMA is a standing, real-time, API-mediated supervisory channel into the health of a designated broker's trading stack. It is categorically different from incident reporting: incident reporting is the broker telling the exchange that something broke; LAMA is the exchange watching the broker's instrumentation continuously so it can see something breaking without being told. SEBI §7.6's reference to glitches "**independently monitored by stock exchanges**" is LAMA's output being used as an enforcement input.

### 2.2 Who must build it

| | |
|---|---|
| **Bound** | **"Specified stock brokers" / "Specified Members"** only. Defined as "The **top 20** stock brokers registered with the Exchange, having the most Internet and Wireless technology-based (IBT/STWT) clients". List "will be published at the beginning of every financial year on the website of the stock exchange". Institutional clients are excluded from the determination. [verified] NSE/COMP/72254 Annexure 2 §§9, 10; NSE/COMP/73981 §33.9 |
| **List in force** | NSE/COMP/66369, 29 January 2025 — **42 named members**, new entrants complying from **1 April 2025**. Predecessor NSE/COMP/57720, 26 July 2023. [verified] |
| **Not bound** | Every broker not on the published list — including every QSB that is not also a Specified stock broker, and every applicable broker above 10,000 clients that is not in the designated set. **LAMA is not a QSB obligation and not a general applicable-broker obligation.** [verified] by the scope wording in Annexure 2 §7.1 ("the 'Specified stock brokers' shall build…") and by TOR 17(u)'s heading "Applicable to 'Specified Members'" |
| **Section heading in 2022** | The 2022 circular's §5 is literally titled "**Monitoring mechanism - Applicable to 'Specified Members'**", and the covering page lists 5.i, 5.ii and 5.iii among the clauses that apply "only to 'Specified Members'". The LAMA scope has never been general. [verified] NSE/COMP/54876 covering page and §5 |

### 2.3 The parameters — and a real discrepancy between primary sources

Three published lists exist. They do **not** agree. All three were read in full today.

| # | Group | 2022 — NSE/COMP/54876 §5.ii | 2026 — NSE/COMP/72254 Annexure 2 §7.1 / NSE/COMP/73981 §33.7(ii) | 2026 audit TOR — NSE/INSP/73850 **17(w)** |
|---|---|---|---|---|
| 1 | Application | Log monitoring | Log monitoring | Log monitoring |
| 2 | Application | Requests/Second | Requests/Second | Requests/Second |
| 3 | Application | Average response times | Average response times | Average response times |
| 4 | Application | Trading trend analysis-related data | Trading trend analysis-related data | Trading trend analysis-related data |
| 5 | Application | Trading API failure counts | Trading API failure counts | Trading API failure counts |
| 6 | Application | **Network Latency** | **— absent —** | **Network Latency** |
| 7 | System | CPU Utilization | CPU Utilization | CPU Utilization |
| 8 | System | Memory Utilization | Memory Utilization | Memory Utilization |
| 9 | System | Disk utilization | Disk utilization | Disk utilization |
| 10 | System | Database replication and its Health | Database replication and its Health | Database replication and its Health |
| 11 | System | Uptime | Uptime | Uptime |
| 12 | Network | Packet Error Counts | Packet Error Counts | Packet Error Counts |
| 13 | Network | Bandwidth Utilization | Bandwidth Utilization | Bandwidth Utilization |
| 14 | Network | **DNS failures** | **— absent —** | **DNS failures** |
| | **Count** | **14** | **12** | **14** |

**How to handle this.** The April 2026 system-audit TOR — the document an auditor will actually hold — enumerates **14** parameters including **Network Latency** (listed under Application) and **DNS failures** (listed under Network), and cites **NSE/COMP/54876 dated December 16, 2022** as its authority. The January 2026 joint guidelines and the April 2026 compliance master both print **12** and drop those two. SEBI §10.2 expressly directed the exchanges to *review* LAMA's "applicability, **key monitoring parameters** and preservation of logs" — so the 12-item table is plausibly the post-review list and the TOR simply was not re-pointed. **For a build: instrument all 14.** The cost of the two extra series is trivial, the TOR an auditor works from asks for them, and shipping 12 invites a finding against 17(w). Flag the conflict in the manual rather than silently choosing one. [verified] all three lists, by direct reading; the **reason** for the divergence is **[unknown]**.

**What the parameter names do and do not pin down.** Each name is a metric *family*, not a metric definition. The sources give **no** unit, aggregation window, percentile, cardinality, label set, or sampling interval for any of the fourteen. "Log monitoring" is not even a scalar. "Trading trend analysis-related data" is undefined in every source read. **[unknown]** — and necessarily resolved bilaterally under NSE/COMP/54876 §5's "onward discussion" clause.

### 2.4 Thresholds — be precise about what does and does not exist

| Question | Answer | Evidence |
|---|---|---|
| Are there prescribed threshold values for the LAMA key parameters? | **No. None.** Not one of the 14 parameters carries a published threshold, target, SLA, red line or acceptable range in SEBI 09-Jan-2026, NSE/COMP/72254 (all six files), NSE/COMP/73981 §33, NSE/COMP/54876 or NSE/INSP/73850. The exchange "monitors to gauge the health"; the text does not say what value fails. | [verified] by exhaustive reading of all five documents |
| So what *are* the numeric thresholds in this framework? | They attach to **capacity and incident duration**, not to LAMA telemetry. See the consolidated table below. | [verified] |
| Does the exchange publish what it does when a LAMA series degrades? | **[unknown].** No escalation ladder, alert contract, or notification commitment was found. SEBI §7.6 says only that glitches "independently monitored by stock exchanges, shall be examined by the stock exchanges for suitable actions". |

**Every numeric threshold in the glitch framework, consolidated** (none of these is a LAMA parameter threshold):

| Value | What it gates | Evidence |
|---|---|---|
| **5 contiguous minutes** | A malfunction becomes a *technical glitch* — definition and reporting trigger | [verified] SEBI §5.1 |
| **more than 15 minutes** | A glitch becomes eligible for the Part A financial disincentive | [verified] Annexure A part A |
| **more than 45 minutes** | Triggers the independent auditor's report on the RCA (NSE: within 45 days) | [verified] NSE/COMP/73981 §33.4(f) |
| **45-minute disruption of any Critical System** | Meets the definition of **'Disaster'** for BCP/DR invocation (or any additional Governing-Board criterion) | [verified] Annexure 2 §8.3 |
| **70% of installed capacity** | Mandatory internal alert threshold on current capacity utilisation | [verified] Annexure 2 §5.9 |
| **2x** observed peak load | Minimum installed capacity — **QSBs** | [verified] Annexure 2 §5.8 |
| **1.5x** observed peak load | Minimum installed capacity — **Specified stock brokers and other stock brokers** | [verified] Annexure 2 §5.8 |
| **10,000 registered clients** (ex-closed, as on 31 March prior FY, ex-institutional) | Framework applicability | [verified] SEBI §6.1 |
| **50,000 clients across all Exchanges** | Mandatory BCP/DR setup | [verified] Annexure 2 §8.1 |
| **top 20** by IBT/STWT clients | Specified stock broker designation → LAMA + enhanced DR (but see the 42-name conflict, §1.2) | [verified] Annexure 2 §9 |
| **1% / 5,000** and **2% / 2,000** unique clients | Disincentive-exemption client-impact ceilings | [verified] Annexure 2 §2.2 |
| **RTO 2 hours, RPO 15 minutes** | DR recovery objectives after declaration of Disaster | [verified] Annexure 2 §8.9 |
| **250 km** | Minimum PDC↔DRS separation where different seismic zones are not feasible | [verified] Annexure 2 §8.4 |
| **30 days / 2 years** | LAMA log retention, normal / post-glitch | [verified] Annexure 2 §7.2 |
| **past 2 years → next 3 years** | Capacity-planning extrapolation basis and horizon | [verified] Annexure 2 §5.3 |
| **180 days** | QSB-only: per-second peak-load trend window used to compute next quarter's peak load | [verified] NSE/INSP/56927 Annexure A §8.3.2 |

### 2.5 Frequency and mechanism of submission — the brief's central question

| Sub-question | Finding | Evidence |
|---|---|---|
| **How often is monitoring data made available?** | **Continuously, in real time.** Two independent primary statements: (a) "Stock exchanges will, through the API gateway, independently monitor these key parameters **in real-time**"; (b) NSE's own common-submissions register, **Exhibit 53 item 44**, lists the submission "**Parameters for monitoring Technical Glitches**" with Frequency/due date = "**Real time**". | [verified] NSE/COMP/72254 Annexure 2 §7.1; NSE/INSP/73976 Exhibit 53 item 44 |
| **The brief's unverified note that glitch-monitoring parameters are reported "real time"** | **Confirmed, and now sourced.** The note traces to Exhibit 53 item 44 of NSE's inspection master, which records the periodicity verbatim as "Real time", referencing **NSE/COMP/67776 dated April 30, 2025 (Para 31)** — the FY2025-26 NSE compliance master, whose glitch chapter is Para 31 (it is Para 33 in the April 2026 master NSE/COMP/73981). **Important qualifier: this is the LAMA obligation, so "real time" applies to Specified stock brokers only.** | [verified] Exhibit 53 item 44 |
| **Through what mechanism?** | A **broker-built, API-based gateway** — the "**LAMA Gateway**" / "**LAMA server**" — from which the broker **serves/publishes** the key-parameter values, and which the exchange monitors. | [verified] Annexure 2 §7.1; TOR 17(u), 17(w) |
| **Does the exchange install an agent on broker infrastructure?** | **No primary source says so.** Across SEBI 09-Jan-2026, all six NSE/COMP/72254 files, NSE/COMP/73981 §33, NSE/COMP/54876 and NSE/INSP/73850, there is **no mention of an agent, collector, sidecar, appliance, or exchange-supplied software on broker premises.** The architecture as published is: broker builds the endpoint; exchange consumes over API. | [verified] as an absence across five documents; **[unknown]** whether an exchange-side collector exists in the bilateral implementation pack |
| **Does the exchange consume an API or a feed?** | **An API.** The word used is "API gateway" / "API-based", not "feed", "file", "push notification" or "stream". | [verified] Annexure 2 §7.1 |
| **Pull or push?** | **Unresolved in public text, and the two NSE documents point opposite ways.** Annexure 2 §7.1: values "should be **served by** the Specified stock brokers" and the exchange monitors "**through the API gateway**" — a pull reading. TOR 17(u): data "is being **published in the LAMA server**" — a push reading. Either the auditor TOR is loose language, or the "LAMA server" is exchange-side and brokers post to it. **Do not assert one in the manual.** | [verified] both texts; **[unknown]** which is architecturally correct |
| **Is there a file upload, portal screen, or scheduled return for LAMA?** | **No.** LAMA appears in no exhibit as a form, format, template or upload path. Exhibit 53 item 44 has no format reference — unlike item 43 (glitch incident reporting), which points at the reporting formats. LAMA is machine-to-machine. | [verified] Exhibit 53 items 43 and 44 compared |
| **Is LAMA within Samuhik Prativedan Manch?** | **Listed in the same 70-item common-submissions register as a "common submission among Exchanges"** (item 44), but SPM's described function is one-exchange filing of *reports*, and nothing read today says a single LAMA gateway discharges NSE, BSE and MCX simultaneously. | [verified] for the Exhibit 53 listing; **[unknown]** for whether one gateway serves all exchanges |
| **Is LAMA monitoring an exchange *service* the broker can buy?** | **[unknown].** The framework assigns the build to the broker. No exchange-provided LAMA-as-a-service offering was found. |

### 2.6 Retention

| Scope | Period | Who holds it | Evidence |
|---|---|---|---|
| Logs of the key parameters, **normal course** | **30 days** | "**The 'Specified stock brokers' and the Exchange** will preserve" — the retention duty is **mutual**; the exchange keeps a copy too | [verified] NSE/COMP/72254 Annexure 2 §7.2; NSE/COMP/73981 §33.7(iii); identical in NSE/COMP/54876 §5.iii |
| "**if a technical glitch takes place, the logs and data related to the glitch**" | **2 years** | same | [verified] same. Note the 2026 wording adds "the **logs and** data"; 2022 said "the data related to the glitch" |
| Interaction with longer retention duties | 30 days is a LAMA-specific **minimum** for telemetry. It does **not** displace CERT-In's 180-day ICT log retention within India, nor securities-law record retention, nor CSCRF log requirements. Do not let a 30-day telemetry TTL set the retention policy for order logs or security logs. | [verified-carried] CERT-In 180 days and the broader retention stack are established in `RESEARCH_monitoring.md` §"CERT-In logs / point of contact" |

**Design consequence.** The 2-year rule is **retrospective on a 30-day window**: at the moment a glitch is declared, the glitch-adjacent slice of a rolling 30-day telemetry store must be promoted to a 2-year hold. That means the pipeline needs (a) a 30-day hot retention floor, (b) an incident-scoped export/legal-hold path, and (c) immutability on the promoted slice — because that slice becomes the evidence base for the RCA, for the auditor's client-impact certificate, and for any independent-auditor report on a >45-minute incident.

### 2.7 What the system auditor checks about LAMA

Four distinct TOR items in **NSE/INSP/73850** (22 April 2026). All four are marked **"Yes"** for both **Type I/II** and **Type III** audit scopes — i.e. in scope for every audit type, to be marked Not Applicable with written justification where the member is not a Specified Member. [verified]

| TOR clause | Title / question, verbatim | What it forces you to be able to show |
|---|---|---|
| **17(u)** | "**LAMA - Monitoring mechanism - Applicable to 'Specified Members'.** System auditor shall verify whether the specified member has **integrated all the critical systems in LAMA**. Whether data from all the critical systems **is being published in the LAMA server** in accordance with NSE/COMP/54876, dated December 16, 2022." | A **Critical Systems inventory** reconciled 1:1 against LAMA integration coverage. "All" means completeness is the test — a gap list is a finding. |
| **17(v)** | "Whether **LAMA logs have been preserved for prescribed period** as mentioned in Exchange Circular no. NSE/COMP/54876 dated December 16, 2022?" | Evidence of the 30-day store and of the 2-year glitch-slice hold, with the promotion event auditable. |
| **17(w)** | "Whether the Specified member is **providing values of the 'Key Parameters' through the 'LAMA' Gateway**" — followed by the **14-parameter enumeration** (Application incl. **Network Latency**; System; Network incl. **DNS failures**) | Per-parameter liveness evidence at the gateway. This is the clause that makes the 12-vs-14 discrepancy consequential. |
| **17(x)** | "**Logging & Monitoring: (Applicable to COLO Members)** — 1. …whether members have the **real time monitoring of IT infrastructure/servers hosted in allotted racks in Colocation facility**; 2. …whether members have **configured appropriate rules at SOC** to detect any suspicious/malicious activity on servers/infra or traffic originating from the servers/network devices hosted in Colo facility; 3. …whether members have setup **monitoring through SOC** covering functions (not limited to) — Continuous Monitoring, Log Management, Threat Response, Alert…" | A **second, independent real-time monitoring obligation** that attaches to **colocation**, not to Specified-Member status. If Finix takes NSE colo racks, 17(x) binds from day one even though 17(u)–(w) do not. |
| Related | **17(t) "Traffic Monitoring: (Applicable to COLO Members)"** — member "shall also monitor the traffic originating from its own IT infrastructure hosted in NSE COLO towards Exchange and put adequate controls to prevent any spurious/unwanted traffic coming to Exchange", verified against **NSE/MSD/59764 dated December 14, 2023** and **NSE/MSD/60456 dated January 30, 2024** | Egress traffic monitoring and control toward the exchange. See §6.2 — this is the one place the exchange watches your infrastructure and can act unilaterally. |

**Audit type determines frequency, and IBT/algo pushes you to the strictest tier.** NSE/INSP/73850 Annexure A: a trading member using "NEAT, NNF and ALGO (irrespective of location and terminals)" gets **Type III** ToR at **half-yearly** frequency; a member that is also a depository participant or offers other financial services is Type III half-yearly on the same column. Exchange-provided NEAT/NEAT+ and ASP-provided software are excluded from the audit scope. **A greenfield broker offering algo/API trading is therefore on a half-yearly system audit carrying the LAMA TOR clauses from its first cycle**, answered Not Applicable with justification until designation. [verified] NSE/INSP/73850 Annexure A and the TOR Not-Applicable rule in NSE/INSP/73976 §8.6.1.

### 2.8 Is there a financial disincentive specifically for LAMA failure?

| Finding | Evidence |
|---|---|
| **The glitch disincentive schedule contains no LAMA line item.** NSE/COMP/72254 Annexure A / Exhibit 39 covers: >15-min glitch frequency, failure to report, late preliminary report, late RCA, failure to set up DR, failure to restore within RTO, failure to conduct DR drill. **Nothing on LAMA integration, LAMA availability, LAMA parameter completeness, or LAMA log retention.** | [verified] full text of Annexure A read |
| So how is LAMA enforced? | Through the **system audit** route: a 17(u)/(v)/(w) non-compliance becomes an audit observation requiring a corrective-action report, with the auditor re-certifying Compliant/Non-Compliant on ENIT, and the generic audit-observation enforcement ladder applying to non-closure. | [verified] NSE/INSP/73976 §8.6.1 (the equivalent mechanic, stated for cyber audit) and NSE/INSP/73976 Annexure 1.2 rows on system-audit report/ATR |
| Exact tariff for a LAMA-specific finding | **[unknown].** No per-item LAMA charge was located in Annexure 1.2 or 1.3. Do not assert one, and do not assert zero. | — |

---

## 3. Capacity planning obligations

### 3.1 The general framework — what must be planned, on what basis

All clauses from **NSE/COMP/72254 Annexure 2 §5** = **NSE/COMP/73981 §33.5**, with SEBI's enabling text at **SEBI 09-Jan-2026 §8**. [verified]

| Requirement | Verbatim substance | 2022 position | Evidence |
|---|---|---|---|
| **Scope of the plan** | Capacity planning for the **'critical systems'** including "**server capacities, network availability, bandwidth, and the serving capacity of trading applications**" | Same list; 2022 omitted "bandwidth" in the equivalent clause | [verified] Annexure 2 §5.2; NSE/COMP/54876 §3.ii |
| **Basis of the projection** | "based on the **rate of growth in the number of transactions observed in the past 2 years**. This data should be **extrapolated to predict the capacity required for the next 3 years**." | **Identical** | [verified] Annexure 2 §5.3; NSE/COMP/54876 §3.iii |
| **Growth proxy — answering the brief directly** | The framework's basis is **transaction growth**, not client growth or turnover growth. SEBI's rationale sentence invokes investor numbers ("Increasing number of investors may create an additional burden"), but the measurement rule is transactions. **The client-base / turnover proportionality test appears in the system-audit TOR, not in the framework:** TOR 17(k) — "System auditor shall verify whether the member has put in place, a mechanism to **handle increase in capacity in proportion to the increase in client base/financial turnover**." Both tests therefore apply: transaction-based extrapolation (framework) **and** proportionality to client/turnover growth (audit). | [verified] Annexure 2 §§5.1, 5.3; NSE/INSP/73850 TOR 17(k) |
| **Coverage of outsourced systems** | "shall include **all 'critical systems' operated in-house or through a Vendor/Application service provider (ASP)**" | Identical | [verified] Annexure 2 §5.4 |
| **Periodicity of the planning exercise** | **QSBs — quarterly. 'Specified stock brokers' — half-yearly. Remaining stock brokers — yearly.** | 2022: "every year" for all | [verified] Annexure 2 §5.5; NSE/COMP/54876 §3.iv |
| **Peak-load measurement window** | "highest peak load observed **during a calendar quarter** in case of QSB, **during a calendar half year** in case of specified stock brokers, and **during a calendar year** in case of other stock brokers" | 2022: "highest peak load observed … **during a calendar quarter**" for everyone | [verified] Annexure 2 §5.6; NSE/COMP/54876 §3.v |
| **Installed-capacity multiple** | "at least **2 times (2x)** of the observed peak load for **QSBs** and **1.5 times (1.5x)** … for **'specified stock brokers' and other stock brokers**" | 2022: **1.5x** for all | [verified] Annexure 2 §5.8; NSE/COMP/54876 §3.v |
| **Mandatory alerting threshold** | "shall deploy adequate monitoring mechanisms **within their networks and systems** to get **timely alerts on current utilization of capacity going beyond permissible limit of 70% of its installed capacity**" | Identical, plus 2022 added: "In case the actual capacity utilization **nears 70%** …, **immediate action shall be taken to avoid a breach of capacity**" — that action sentence is **dropped** from the 2026 joint guidelines but **retained** in TOR 17(k) and in the QSB framework | [verified] Annexure 2 §5.9; NSE/COMP/54876 §3.vi; NSE/INSP/56927 Annexure A §8.3.2 |
| **Redundancy** | "members shall **strive to achieve full redundancy** in their IT systems that are related to 'critical systems'" — aspirational verb, at the **primary data centre** | 2022 confined this to **Specified Members** (§3.viii); 2026 extends it to all applicable members | [verified] Annexure 2 §5.11; NSE/COMP/54876 §3.viii |
| **Audit hook** | "Adequate capacity planning and its review **shall be a part of the annual system audit** of the Members" | Identical | [verified] Annexure 2 §5.10 |
| **'Critical Systems'** | "all IT systems that are related to trading applications and trading related services" | Identical | [verified] Annexure 2 §5.7 |

### 3.2 What must be *reported* or *demonstrated* to the exchange

This is the part most likely to be over-stated in an operations manual. The honest position:

| Who | Periodic capacity submission to the exchange? | Evidence |
|---|---|---|
| **Ordinary applicable broker** (10,000+ IBT/STWT clients, not QSB, not Specified) | **None.** Capacity planning is an **internally held, audit-examined** obligation. No periodic capacity return, certificate, utilisation report or peak-load filing exists for this class in NSE/COMP/73981 Chapter IV, in Annexure 2 §5, or in Exhibit 53's 70 common submissions. It is **demonstrated through the system audit**, not filed. | [verified] by exhaustive reading of Annexure 2 §5, NSE/COMP/73981 Chapter IV, and all 70 Exhibit 53 rows |
| **Specified stock broker** | Same as above for capacity **documents** — but its live capacity/utilisation picture reaches the exchange **continuously through LAMA** (CPU, Memory, Disk, Bandwidth Utilization, Requests/Second, Uptime). **LAMA is how a Specified broker's capacity position becomes visible to the exchange, and it is not a filing.** | [verified] Annexure 2 §7.1 parameter table |
| **QSB** | **Yes — a real quarterly filing.** "**CTO/CIO of QSBs to submit declaration/certification to the Exchange for technical capacity**", due **within 45 days from the end of the quarter**. Plus the **updated Information Technology Policy with minutes of the IT Committee**, half-yearly, within 45 days from the end of the half-year. Plus QSBs "**to also participate in Exchange mocks for testing capacity and submit a report on such mocks to the Exchange within defined timelines**". | [verified] NSE/INSP/56927 Annexure A §§8.3.1–8.3.2; NSE/INSP/73976 Exhibit 53 items 15 and 16 |
| **QSB — the underlying obligation** | SEBI (**SEBI/HO/MIRSD/MIRSD-PoD-1/P/CIR/2023/24**, 6 February 2023): QSBs "shall, at all times, maintain adequate technical capacity to process **2 times the peak transaction load encountered during the preceding half year**". NSE's enhanced overlay: peak load "**calculated for the next quarter based on the per second peak load trend for the past 180 days**"; installed capacity **≥ 2x** observed peak; "**In case of shared servers peak load to be calculated based on utilization of server + RAM**"; "QSBs shall implement suitable mechanisms, including generation of appropriate alerts, to **monitor capacity utilisation on a real-time basis**"; the 70% alert rule; "QSBs shall be **able to add capacity while maintaining accessibility and availability quickly and seamlessly**". | [verified] NSE/INSP/56927 Annexure A §8.3.2, columns C, D, E, F, G |
| QSB designation | By exchange list. FY2026-27 list issued **1 April 2026** via **NSE/INSP/73575**, with voluntary applications by 30 April 2026. | [verified-carried] `RESEARCH_2026_changes.md` row 2026-04-01 |

**Note the asymmetry worth putting in the manual.** QSBs owe a **quarterly CTO/CIO capacity attestation** but **no LAMA telemetry**. Specified stock brokers owe **continuous LAMA telemetry** but **no quarterly capacity attestation**. A broker that is both owes both. Neither obligation implies the other.

### 3.3 What the system audit examines on capacity

**NSE/INSP/73850 TOR 17(k) "Capacity Management"**, verbatim bullets — in scope for **both** Type I/II and Type III. [verified]

| Check | Note |
|---|---|
| "Does the organization have **documented processes/procedures for capacity management for all the IT assets**?" | "All IT assets" is broader than "Critical Systems". |
| "Are installed systems & procedures **adequate to handle algorithm orders/trades**?" | Algo-specific capacity adequacy. |
| "Is there a **capacity plan for growth** in place?" | |
| "System auditor shall verify whether the member has put in place, a mechanism to **handle increase in capacity in proportion to the increase in client base/financial turnover**." | **This is the proportionality test the brief asks about** — and it is an audit TOR item, not a framework clause. |
| "Are **System bandwidth utilization and throughput** being monitored, tracked and **reported periodically**?" | "Reported periodically" here means **internal** periodic reporting; no external recipient is named anywhere. Do not read it as an exchange return. |
| "Whether **peak load is monitored for all critical systems and alerts generated on threshold reaching 70% of capacity**" | The 70% alert must be demonstrably *generated*, not merely configured. |
| "Is there a mechanism to **track triggered alerts and issues resolved timely**?" | An alert register with closure evidence. |
| "Whether the member is monitoring peak load and has performed **periodic load/stress testing at least twice a year** in their 'Critical Systems' including the trading applications, servers, and network architecture. The Peak load shall be determined based on the highest peak load observed by the Members **during a calendar quarter**." | **Two findings.** (a) A **twice-yearly load/stress testing** cadence appears **only here** — it is in neither SEBI 09-Jan-2026 nor Annexure 2 §5. (b) The TOR still states the **calendar-quarter** peak-load window for everyone, which is the **2022** rule; Annexure 2 §5.6 now tiers it quarter/half-year/year. The TOR lags the January 2026 guidelines on this point. |
| "The installed capacity shall be at least **1.5 times (1.5x) for specified members / 2 Times (2x) for QSB's** of the observed peak load." | Consistent with Annexure 2 §5.8. |
| "**Specified Members as per circular NSE/COMP/54876 dated December 16, 2022**, to ensure capacity planning based on the rate of growth in the number of transactions observed in the past 2 years. This data should be extrapolated to predict the capacity required for the next 3 years." | Again anchored to the superseded 2022 circular. |

**TOR 26 "Technical Glitch"** adds the glitch-specific audit scope — all marked Yes for Type I/II and Type III. [verified] NSE/INSP/73850 TOR 26(a)–(h).

| Clause | Substance |
|---|---|
| **26(a)** | Member "has **reported all instances** of technical glitches within the prescribed timelines during the audit period in accordance with **NSE/COMP/72254 dated January 09, 2026**. Member has **correctly reported the issues faced and duration of the downtime**. Member has **implemented all the measures as mentioned in RCAs** and has taken necessary steps to prevent recurrence." |
| **26(b)** | "Does the organisation have **internal policy to handle technical glitches** in accordance with the framework defined in Exchange circular NSE/COMP/72254" |
| **26(c)** | Policy must cover: "1. Outline the **key systems/departments** handling the normal function/operation of the Member and **assign responsibilities at business owner and technology owner level**. 2. Lay down the **processes/steps** to be adopted in case of technical glitches along with the **timelines and communication with concerned stakeholders including clients**. 3. Define the **Escalation matrix including reporting of such incident to the Exchange**." |
| **26(d)** | "Check the **preparedness of the Member to shift its operations from PDC to DRS** and comment on documented results and observations on DR drills" |
| **26(e)** | Change Management and Patch Management implemented, plus "the recommended measures as per RCA" reviewed by the auditor |
| **26(f)** | Adequate **Capacity Planning and its review** per NSE/COMP/72254 for Specified Members (list: **NSE/COMP/66369**, 29-Jan-2025), per **NSE/INSP/56927 dated June 01, 2023** for QSBs (list: **NSE/INSP/55875 dated March 03, 2023**), "and for **remaining stock brokers, capacity planning shall be on yearly basis**" |
| **26(g)** | **Test-driven environments** for all types of software developed by the member or its vendors, per NSE/COMP/72254 |
| **26(h)** | Peak-load monitoring with the **tiered** window — "a calendar quarter for QSBs, a calendar half-year for specified stock brokers, and a calendar year for other stock brokers" (26(h) is **aligned** to the 2026 tiering, while 17(k) is not — the same circular is internally inconsistent) |

**26(a) is the clause with teeth for a greenfield broker.** "Correctly reported the issues faced and **duration of the downtime**" means the auditor re-derives your incident durations from your logs and compares them to what you filed. Under-reporting a 16-minute outage as 14 minutes to stay under the Part A gate is an audit finding *and* a "failure to report" exposure at ₹1 lakh / ₹5 lakh. Build the duration determination to be reproducible from immutable telemetry, not from a human's recollection of when the on-call bridge opened.

---

## 4. Samuhik Prativedan Manch — verified

| Question | Answer | Evidence |
|---|---|---|
| **Is the name real?** | **Yes, verbatim.** Used by SEBI and by the exchanges: "Stock brokers shall submit information/reports mentioned above, on **'Samuhik Prativedan Manch'** i.e. **common portal for submissions by stock brokers**." | [verified] SEBI 09-Jan-2026 §7.5; NSE/COMP/72254 Annexure 2 §4.5; NSE/COMP/73981 §33.4(e) |
| **What is it?** | SEBI's definition, verbatim: "**Samuhik Prativedan Manch is a technology based common reporting mechanism which enables filing of common report at one stock exchange instead of at multiple exchanges.** This common reporting across stock exchanges has been implemented with effect from **August 01, 2025** in order to **reduce the compliance cost** for stock brokers." | [verified] SEBI Press Release **PR No.66/2025**, 10 October 2025 |
| **Who files there?** | **Stock brokers.** It is described as the "common portal for submissions by stock brokers". | [verified] SEBI 09-Jan-2026 §7.5 |
| **What is filed there (glitch)?** | The **Intimation of Incident (2h)**, the **Preliminary Incident Report (T+1)** and the **RCA (14 working days)** — "information/reports mentioned above". | [verified] SEBI 09-Jan-2026 §7.5 read with §§7.1–7.4 |
| **What else is filed there?** | Phase I from **1 August 2025**: **40** compliance reports. Phase II from **15 October 2025**: **30 additional**. NSE's implementation: Phase I = 40 (39 QSB compliances + 1 AI/ML reporting); Phase II = 28 from 15 October 2025 **plus 2 more (Annexure A items 29 and 30) from 15 December 2025**. The consolidated register is **Exhibit 53, "Common Submission among Exchanges" — 70 compliance reports/submissions**. | [verified] SEBI PR 66/2025; NSE/INSP/69184 (18 July 2025); NSE/INSP/70505 (29 September 2025); NSE/INSP/73976 Exhibit 53 |
| **How it actually works** | "Members of NSE who are also registered with any other exchange(s) (**BSE/MSE/MCX/NCDEX**) are required to submit their compliance reports/submissions **to NSE only**. … **NSE will share these submissions (including data/documents) with other exchange(s)** where the member is also registered. Submission of data/report **to NSE alone will be treated as submission to other exchanges**." | [verified] NSE/INSP/69184; restated in NSE/INSP/73976 §8.19 |
| **Naming caution — important** | **NSE's own circulars never use the phrase "Samuhik Prativedan Manch."** NSE calls it "**Technology based sharing mechanisms of common submissions among Exchanges**" (NSE/INSP/69184, NSE/INSP/70505, NSE/INSP/73976 §8.19). "Samuhik Prativedan Manch" is the name SEBI uses, and which the exchanges adopted **inside the glitch circular**. Both names denote the same mechanism. In the manual, introduce both and say they are the same thing, or a reader searching NSE's site for "Samuhik" will find nothing. | [verified] by reading both sets of circulars |
| **Portal URL / module / deep link** | **[unknown].** No URL, module path, menu path or login domain for SPM appears in any document read today. NSE's circulars describe a routing *rule* ("submit to NSE only"), not a new portal, which suggests existing NSE submission modules are the entry points — but the glitch module's actual location is **[unknown]**. Resolve at membership onboarding; do not print a guessed path. |
| **Does it waive supervision?** | **No.** "The technology based sharing mechanism … is for the purpose of **ease in the reporting requirement**, however the **processing of the submission along with the monitoring and supervision of compliance will continue to be carried out by respective stock exchanges** as per the existing process." Each exchange still supervises and still enforces. | [verified] NSE/INSP/69184; NSE/INSP/73976 §8.19 |
| **Is the glitch entry in Exhibit 53 current?** | **No — Exhibit 53 is stale on this row and must not be used as the timeline source.** Item **43 "Technical Glitch Incident Reporting"** still reads "Intimation of Technical Glitch Incident **within 1 hour** from the start of the glitch … RCA report within **14 days** of the incident", citing **NSE/COMP/67776 dated April 30, 2025 (Para 31)** — the FY2025-26 master. The operative clocks from 9 January 2026 are **2 hours** and **14 working days**. An April 2026 exhibit carrying January 2026-superseded text is exactly the kind of trap that produces a late filing. | [verified] Exhibit 53 item 43 compared against SEBI 09-Jan-2026 §§7.1, 7.4 |

---

## 5. Real-time / near-real-time data that actually reaches the exchange

A complete inventory, so the manual can state the boundary rather than hand-wave it. "Trading messages" are excluded as self-evident — the exchange receives every order entry, modification and cancellation by construction.

| Channel | Is it real-time? | Direction and mechanism | Who it binds | Evidence |
|---|---|---|---|---|
| **LAMA key parameters** | **Yes — "real-time"**, and registered as "Real time" periodicity in Exhibit 53 item 44 | Broker builds and **serves/publishes** via API gateway; exchange **monitors through the API gateway** | **Specified stock brokers only** (published list) | [verified] Annexure 2 §7.1; Exhibit 53 item 44 |
| **Colocation egress traffic** | **Yes, continuously observed by the exchange** | Exchange observes traffic arriving from the member's colo racks; member must monitor its own egress and "put adequate controls to prevent any spurious/unwanted traffic coming to Exchange" | **COLO members** | [verified] NSE/MSD/59764 §1; TOR 17(t) |
| **Market SOC security telemetry** | **Yes — "continuous monitoring of security events"** | Broker **onboards onto an exchange-operated SOC**. "Bombay Stock Exchange (BSE) and National Stock Exchange (NSE) **have been mandated to setup Market SOC**. Further, **small-size REs and Self-certification REs have been mandated to be onboarded on the Market SOC**." Market SOC setup deadline: **1 January 2025**. BSE and NSE report its functional efficacy to SEBI periodically. | **Mandatory for Small-size and Self-certification REs** — which is where a greenfield broker sits (see §8). Optional (own/group/third-party SOC) for larger categories | [verified] CSCRF (SEBI/HO/ITD-1/ITD_CSC_EXT/P/CIR/2024/113, 20 Aug 2024) §"Anticipate | Detect" b, and §4.5.1–4.5.4 |
| **Clearing-corporation risk telemetry** (NCL PRISM, BSE/ICCL RTRMS, MCXCCL) | **Yes, real-time** — margin/collateral utilisation with 70/80/90/100% bands, risk-reduction at 90%, disablement at 100% | CC computes from positions and collateral it already holds; the broker consumes status, does not push telemetry | All members, per segment | [verified-carried] `RESEARCH_monitoring.md` §1 and the PRISM/RTRMS/MCXCCL rows |
| **Order-to-trade ratio and intraday order-flow monitoring** | Intraday/daily | Exchange computes from order messages it already receives | All members | [verified-carried] `RESEARCH_alerts.md` — NSE/SURV/72668 (6 Feb 2026), NSE/SURV/73597 (2 Apr 2026), NSE/SURV/75524 (31 Jul 2026) |
| **System health, latency, throughput, availability as a *periodic return*** | **No such return exists for any broker class.** | — | — | **[verified] as an absence**: no such item in NSE/COMP/73981 Chapter IV §§27–44, in Annexure 2, or among the 70 rows of Exhibit 53 |
| **QSB technical-capacity declaration** | **No — quarterly, 45 days after quarter-end.** Near-real-time only in the sense that the *underlying* monitoring must be real-time ("monitor capacity utilisation on a **real-time basis**") — but what reaches the exchange is a periodic CTO/CIO certification | Broker files; exchange receives | **QSBs only** | [verified] NSE/INSP/56927 Annexure A §8.3.2; Exhibit 53 item 16 |
| **CERT-In "near-real-time" information** | Only **when directed** | CERT-In may specify format and timing, which may include near-real-time information, through the designated point of contact | All, on direction | [verified-carried] `RESEARCH_monitoring.md` §"CERT-In further information / near-real-time directions" — CERT-In Directions §(iii) |
| **MII real-time performance monitoring framework** | Yes — **but it binds MIIs, not brokers** | SEBI circular dated **10 December 2024**, "Revised Guidelines for Capacity Planning and Real Time Performance Monitoring framework of Market Infrastructure Institutions (MIIs)"; plus the **11 February 2026** commodity-derivatives capacity/real-time-performance circular for MIIs | **MIIs** | [verified] ITRI circular footnote 2 names the 10-Dec-2024 circular; [verified-carried] `RESEARCH_2026_changes.md` for the Feb 2026 commodity circular |

**The decisive sentence for the manual.** A broker outside the Specified list pushes **no** continuous system telemetry to the exchange under the glitch framework; it pushes continuous **security-event** telemetry to an exchange-operated **Market SOC** under CSCRF if it is a Small-size or Self-certification RE; and it reports **incidents**, not telemetry, under the glitch framework. Three different mechanisms, three different triggers, and only one of them is the glitch framework. Do not merge them.

---

## 6. Alerts the exchange sends a broker about the broker's own systems

### 6.1 What was *not* found

| Searched for | Result |
|---|---|
| An exchange-to-broker alert on the broker's **latency** | **[unknown] — none found.** No latency alert, threshold, or notification contract in any document read today. |
| An exchange-to-broker alert on the broker's **message rate** | **[unknown] — none found** as a *system-health* alert. Order-rate control exists, but as a **limit and a charge**, not an advisory alert: "Threshold Order Per Second (**TOPS**)" governs algo-order tagging and registration, and the OTR framework charges per algo order and restricts order entry. [verified] NSE/INSP/73850 TOR 27(f) for TOPS; [verified-carried] `RESEARCH_alerts.md` for OTR. |
| An exchange-to-broker alert on **session health** | **[unknown] — none found** as a published alert product. |
| A published LAMA alert/escalation contract | **[unknown] — none found.** See §2.4. |

### 6.2 What *does* come back from the exchange about your infrastructure

| Mechanism | What happens | Evidence |
|---|---|---|
| **Colocation abnormality — unilateral action, not an alert** | "Participants are requested to note that **if any instance of abnormality is observed by the Exchange, the Exchange shall have the exclusive right to take, at its discretion, such actions, steps, measures, proceedings, decisions** … It is understood that such actions … may entail and include **immediate rack port disconnection of all racks of the Participant, user disablement etc., without notice to the participant**". Participants "may also be required to conduct **forensic audit and cyber security audit, at the instance of the Exchange**", and the Exchange "reserves the right to conduct audit including simulations and to this end, may **direct the Participant to hand over equipment** for the purpose of audit/investigation". | [verified] NSE/MSD/59764 §§7–10 |
| Colo market-hours access | Modified by **NSE/MSD/60456** (30 January 2024): "**Access to colocation facility shall not be provided to Colo participant during market hours**", with effect from **5 February 2024, start of market hours** — superseding the earlier emergency-access carve-out. | [verified] NSE/MSD/60456 |
| Colo change discipline | Hardware installation/modification/decommissioning requires a **work permit** with proposed date and time, plus post-execution reporting; new hardware or upgrades go live **only after validation in mock drills or the Simulation market**, with the exchange colo support team monitoring the impact and the participant recording the outcome **for system audits**. | [verified] NSE/MSD/59764 §§4–5 |
| Colo periodic confirmation | "Colo participants shall be required to **confirm adherence to all Exchange and SEBI circulars periodically through a separate report**. The format for such a report and Terms of Reference (TOR) for same will be shared vide a separate circular shortly." **[unknown]** whether that separate circular has since issued and what the format/cadence is. | [verified] NSE/MSD/59764 §12; the follow-up circular is **[unknown]** |
| Glitch counterpart | The exchange **disseminates glitch incidents on its website** and examines glitches "reported by stock brokers **as well as independently monitored by stock exchanges** … for suitable actions". So the exchange's independent detection surfaces as **public disclosure and enforcement**, not as a courtesy alert to you. | [verified] SEBI 09-Jan-2026 §§7.1, 7.6, 13 |
| Risk-side alerts (not system health) | PRISM / RTRMS / MCXCCL margin-utilisation warnings and status changes; surveillance alerts via MSD/MRS. These are **collateral and conduct** alerts, not infrastructure-health alerts. | [verified-carried] `RESEARCH_monitoring.md` §1 and §"Monitor/recipient" table |

**Honest answer for the manual.** The exchange does **not** run a broker-facing system-health alerting service. It observes (LAMA for Specified brokers, colo traffic for colo members, Market SOC for small REs), and when it does not like what it sees it **acts** — disconnection, disablement, directed forensic audit, public dissemination, enforcement. Design your own alerting on the assumption that the exchange's first communication about a degradation may be an enforcement letter, not a warning.

---

## 7. The 2026 changes

### 7.1 Cyber incident reporting aligned to a standard report format — FIRE

| Item | Finding | Evidence |
|---|---|---|
| Instrument | **HO/(449)2026-ITD-5_DIV1/I/19448/2026**, dated **24.08.2026**. Bilingual Hindi/English. Signed Mamata Roy, DGM. | [verified] `fire26.pdf` |
| Addressees | A long list of all SEBI-regulated entity categories, expressly including "**All Stock Brokers through Exchanges**" and "All Depository Participants through Depositories". **This one does bind brokers.** | [verified] addressee list, page 1 |
| What **FIRE** stands for | "**Format for Incident Reporting Exchange (FIRE)**" Framework — "**developed by Financial Stability Board (FSB)**". Note: an FSB document format, not a SEBI acronym, and nothing to do with a stock exchange despite the word "Exchange". | [verified] §3 |
| What SEBI did | "SEBI has **aligned its Incident Reporting Portal** with 'Format for Incident Reporting Exchange (FIRE)' Framework … FIRE enables a structured incident reporting by **defining common information fields, standardized definitions, and consistent classification of incident attributes** promoting harmonisation across sectors or jurisdictions." | [verified] §3 |
| Staged lifecycle | "The portal will facilitate reporting of incidents **in stages to reflect incident life cycle from initial reporting to intermediate updates and final closure**, while **acknowledging that certain information may not be available at the time of initial reporting**." | [verified] §4 |
| The clocks — **unchanged** | Restates the CSCRF requirement that REs report cyber incidents "through **mkt_incidents@sebi.gov.in** within **6 hours** and **SEBI Incident Reporting Portal** within **24 hours**". | [verified] §2 |
| Where | "Regulated Entities (REs) shall report cyber incidents through the **Cyber Incident Reporting Portal of SEBI** which can be accessed by logging into **https://siportal.sebi.gov.in**." | [verified] §5 |
| Read-with | "This circular should be read in conjunction with the applicable SEBI circulars (including but not limited to **Cybersecurity and Cyber Resilience framework**)". | [verified] §6 |
| **Critical distinction for the manual** | **FIRE is cyber-incident reporting. It is not glitch reporting.** Different circular, different department (ITD vs MIRSD), different clocks (6h/24h vs 2h/T+1/14 working days), different portal (siportal.sebi.gov.in vs Samuhik Prativedan Manch), different recipient (SEBI vs stock exchange). And since the 2026 glitch definition **dropped** "cyberattacks/incidents" from its cause list (see §1.3), the two tracks are now cleanly separated — where the 2022 glitch definition expressly included cyberattacks and could overlap. A cyber incident that also stops trading for ≥5 contiguous minutes during the session will still trigger **both** tracks on its own terms. | [verified] by comparing FIRE §§2–5 against SEBI 09-Jan-2026 §§5.1, 7; and NSE/COMP/54876 §1 against SEBI 09-Jan-2026 §5.1 |
| Exchange/depository cyber SOP, for completeness | Separate from SEBI's route: report any cyber security incident to the exchange **within 6 hours** of noticing/detecting/being informed, under the joint-exchange SOP issued under CSCRF; staged interim/mitigation/RCA/VAPT/forensic clocks follow. | [verified] NSE/INSP/73976 §8.6.1 "Standard Operating Procedure (SOP) for handling Cyber Security Incidents"; detailed stage clocks [verified-carried] `RESEARCH_monitoring.md` cyber table |

### 7.2 IT Resilience Index — is it MII-only?

**Yes. Unambiguously, and verified from the addressee list, not inferred from the title.**

| Item | Finding | Evidence |
|---|---|---|
| Instrument | **HO/47/18/11(1)2026-MRD-TPD1/I/19509/2026**, **24 August 2026**. Signed Darshil D. Bhatt, DGM, Division of Policy and Development – 4, Market Regulation Department. | [verified] `itri.pdf` |
| **Addressees** | "**All Stock Exchanges / All Clearing Corporations / All Depositories (Except AMC Repo Clearing Ltd.)**" — **brokers are not addressed, and no clause imposes anything on brokers.** Contrast FIRE, whose addressee list names stock brokers explicitly. | [verified] page 1 |
| Origin | Following discussion with SEBI's **Technical Advisory Committee (TAC)** and a **Consultation Paper dated March 25, 2026** ("Consultation Paper on Framework of IT Resilience Index for Market Infrastructure Institutions (MIIs)"). | [verified] §4 and footnote 1 |
| Scope of measurement | "ITRI shall measure the **robustness of Critical Systems of MIIs**" as defined at clause **9.1.2.3** of the 30-Dec-2024 master circular for Stock Exchanges and Clearing Corporations, clause **4.31.2.3** of the 3-Dec-2024 master circular for Depositories, and clause **16.4.3(c)** of the 4-Aug-2023 master circular for the Commodity Derivatives Segment; "scope shall also include other systems feeding/related to such Critical Systems." | [verified] §5.1 |
| **Parameters and weightages** | **Availability 20; Security 20; Integrity 10; Governance 10; Reliability and Monitoring 10; Business Continuity 10; Modularity and Flexibility 10; Scalability 5; Others (such as Incident handling, etc.) 5. Total 100.** | [verified] §5.2 |
| Sub-parameters | The **Industry Standards Forum (ISF)** of MIIs "shall finalize sub-parameters and detailed measurement criteria for each parameter … **by November 30, 2026**", and "shall also formulate **baseline parameters, acceptable threshold scores** as well as the **SOP** for calculating ITRI along with an objective **system-driven scoring methodology**" for comparability across MIIs. | [verified] §§5.3, 5.6 |
| Computation and reporting | **Half-yearly, within 60 days from the end of each half-year**; MII submits the comparative analysis of **two consecutive half-years (rolling)** plus corrective actions taken or proposed **to its SCOT and Governing Board**. | [verified] §5.4 |
| Non-discretionary | "computation of ITRI shall be **system-driven**, i.e., ITRI would be computed **automatically from IT systems** (or data extracted from such systems) **without manual intervention** … to ensure that computation of ITRI remains **non-discretionary and fool proof**." Manual retrieval of any parameter only after prior discussion of the exception with SCOT. | [verified] §5.5 |
| Early Warning System | "MIIs shall develop an **Early Warning System** to detect possible deterioration in any of the parameters of ITRI leading to possible performance issue, slowness etc. … and framework to remedy these." | [verified] §6 |
| Continuous service-delivery visibility | "MIIs shall build systems providing **continuous visibility into service delivery to market participants**… including **consolidated dashboards** that will assist in monitoring system/application performance and continuous service delivery as well as any deviation/anomalies thereof", plus SOPs to "monitor availability of systems and continuity of service delivery to all market participants and **flag any disruption/deviation**". | [verified] §§8, 9 |
| Timeline | Beta already implemented. Full operationalisation including Early Warning System and Real Time Monitoring of Service Delivery by **28 February 2027**. SOP to SEBI after SCOT review by **31 January 2027**. **First submission of ITRI computation for the half-year ending 31 March 2027.** | [verified] §§10.1–10.3 |
| Does broker glitch data feed ITRI? | **[unknown].** Nothing in the circular says so. The sub-parameters that would settle it are not finalised until 30 November 2026. | — |
| **Manual guidance** | Put ITRI in a "what the exchange owes *you*" box, not in the broker obligations register. Its practical relevance to Finix is **indirect but real**: MII §§8–9 build consolidated service-delivery dashboards and flag deviations, which means from 2027 the exchange will have a sharper, system-driven view of degradation **it** causes — useful when you invoke glitch exclusion (ii), "Technology disruption due to technical issues at MII", or Annexure B field 7, "Was the issue encountered on the Exchange-provided environment?". | [verified] ITRI §§8–9; SEBI 09-Jan-2026 §5.2(ii); Annexure B field 7 |

### 7.3 Other 2026 movements touching this area

| Change | Status | Caution | Evidence |
|---|---|---|---|
| **IRRA discontinued** | **NSE/COMP/73981 §33.10 still describes the Investor Risk Reduction Access platform** as available on member request after a technical glitch. SEBI **discontinued IRRA with immediate effect from 7 May 2026**. The compliance master was finalised 30 April 2026 and therefore predates the discontinuation by a week. | **Do not put IRRA activation in the glitch runbook.** The master's §33.10 is dead text. | [verified] NSE/COMP/73981 §33.10 (text read today); discontinuation [verified-carried] `RESEARCH_monitoring.md` and `RESEARCH_2026_changes.md`, SEBI PDF `attachdocs/may-2026/1778149088029.pdf` |
| **Contingency Pool Trading** | The same May 2026 SEBI circular describes exchange-premises contingency terminals for squaring off clients' outstanding positions during disruptions. | Distinct from IRRA. **[unknown]** current exchange-specific booking, activation, eligibility and reporting SOPs. | [verified-carried] `RESEARCH_monitoring.md` |
| **Penalty→financial disincentive rationalisation** | Revised framework issued by the exchanges in consultation with SEBI on **10 October 2025**; 235 penalty items reviewed in phase 1 (40 removed, 105 reclassified as financial disincentive, 90 retained as penalties with 36 rationalised, 7 converted to advisory/warning for first instance, 6 capped, 29 unchanged, 12 new). Lead-exchange levy for violations common across exchanges, to stop multiple exchanges penalising the same observation. **Applies also to ongoing enforcement proceedings.** | The glitch schedule is a self-contained annexure and is governed by NSE/COMP/72254 (see §1.5). | [verified] SEBI PR No.66/2025 |
| **Regulation 50, SEBI (Stock Brokers) Regulations 2026** | The enabling provision cited by the 9 January 2026 glitch circular. | Note the new 2026 broker regulations are the source of authority, not the 1992 regulations. | [verified] SEBI 09-Jan-2026 §16 |

---

## 8. What this means for a greenfield broker — day one versus thresholds

Finix's own numbers were not supplied, so this is expressed as triggers. [verified] for each threshold from the sources above.

| Obligation | Trigger | Day-one for a greenfield IBT/STWT broker? |
|---|---|---|
| **Glitch framework (definition, 2h/T+1/14-working-day reporting, disincentives)** | **> 10,000 registered clients** (ex-closed, ex-institutional) as on 31 March of the previous FY | **No** at launch. Binds from the financial year after the 31-March count crosses 10,000. **But build the machinery before the threshold**: the first in-scope year begins with no grace period, and the 2-hour clock is unforgiving. |
| **Internal capacity monitoring, 70% alerts, 1.5x installed capacity, annual capacity planning on a 2-year/3-year basis** | Framework applicability (>10,000) **for the framework version**; **but TOR 17(k) "Capacity Management" is in scope for every system audit regardless** | **Effectively yes**, via TOR 17(k). Documented capacity-management process for all IT assets, growth plan, bandwidth/throughput monitoring, 70% alerting with a tracked alert register, and **load/stress testing at least twice a year** are audit checkpoints from the first audit. |
| **System audit** | All trading members. Type III (NEAT+NNF+ALGO) → **half-yearly**; Type II → annual or once in 2 years by terminal/location count; Type I → annual | **Yes.** An algo/API-offering broker is **Type III, half-yearly**, carrying the LAMA TOR items answered Not Applicable with justification. |
| **CSCRF compliance; Market SOC onboarding** | CSCRF Table 4: **"Less than or equal to 10,000 active clients as per UCC and providing IBT facility/Algo trading facility" = Small-size RE.** (≤10,000 active clients **and not** providing IBT or algo = Self-certification RE; >10,000 and up to 50,000 = Mid-size; >50,000 and up to 5,00,000 = Mid-size per the table's banding; >5,00,000 = Qualified RE; QSBs are Qualified REs) | **Yes.** A greenfield broker offering IBT with ≤10,000 active clients is a **Small-size RE**, and Small-size REs are **mandated to be onboarded on the Market SOC** operated by NSE/BSE. This is the one continuous telemetry relationship Finix will have with an exchange from day one — and it is **security** telemetry, not performance telemetry. Small-size REs need not constitute an IT Committee; CSCRF compliance is reviewed and approved by MD/CEO/Board member/Partner/Proprietor. |
| **Cyber incident reporting (6h email + 24h portal, FIRE fields, staged closure)** | All REs | **Yes.** |
| **Exchange cyber incident SOP (6h to exchange, then interim/mitigation/RCA/VAPT/forensic stages)** | All trading members | **Yes.** |
| **BCP/DR setup, 'Disaster' definition, RTO 2h / RPO 15min, 250km separation, board-approved BCP-DR policy, quarterly board review, annual policy review, IRT/CMT** | **≥ 50,000 clients across all Exchanges** for mandatory setup; **Specified Members** for half-yearly DR live-trading drills; **IRT/CMT chaired by MD or CTO** is a Specified-Member requirement | **No** at launch, but note the **new-member phase-in**: "In case if any new member falls under the purview of Technical glitch framework the DR drills/live trading for such members shall include running operations with **30% clients** from DRS for at least 1 full trading day during the **first quarter**, **60%** during the **second quarter**, and **100%** from the **subsequent quarter onwards**." Plan the DR topology before you need it; 250km and one-to-one PDC/DRS correspondence are not retrofittable cheaply. |
| **ISO 27001 within 2 years of framework applicability** | **Specified Members and QSBs.** ISO 20000 (IT Service Management) and ISO 22301 (BCMS) are **recommended**, with the requirement that "All Policies, procedures and processes **must be based on** these international Standards" | **No** as a certification obligation, **yes** as a policy-design constraint — the "must be based on" sentence is not scoped to Specified Members in the text. |
| **LAMA gateway, 14 key parameters, 30-day/2-year retention** | **Specified stock broker designation** (published list, start of each FY) | **No.** But see the build note below. |
| **QSB overlay: quarterly capacity planning, 2x installed capacity, 180-day per-second peak trend, real-time utilisation monitoring, quarterly CTO/CIO technical-capacity declaration (45 days), half-yearly IT Policy + ITC minutes, exchange capacity mocks with report, winding-down policy** | **QSB designation** by exchange list | **No.** |
| **Colocation obligations: egress traffic monitoring, real-time rack monitoring, SOC rules for colo infra, work permits, mock validation of hardware changes, no market-hours access** | **Taking NSE colo racks** | **Only if** Finix colocates. If it does, TOR 17(t) and 17(x) bind immediately — and 17(x) is a **real-time monitoring** obligation that arrives via colo, not via Specified-Member status. |

**The build note that matters.** Three things argue for instrumenting the full LAMA parameter set from day one even though the obligation does not yet bind:

1. **The parameter list is published and stable across four years** (2022 and 2026, 12 or 14 items). There is no guesswork in the metric families, only in their schemas.
2. **Eleven of the fourteen are metrics a competent SRE stack emits anyway** — CPU, memory, disk, uptime, bandwidth, packet errors, DNS failures, requests/second, response times, API failure counts, DB replication health. The genuinely bespoke ones are "Log monitoring" and "Trading trend analysis-related data", plus Network Latency as an application-level series.
3. **The disincentive-exemption and RCA evidence requirements are strictly harder than LAMA.** Auditor-certified *unique clients affected, segment-wise and exchange-wise*, against the previous quarter's average unique clients traded, reconstructible for an arbitrary 5-minute window, with a 2-year immutable hold on the glitch slice — that is the real engineering requirement hiding in this framework, and it is needed the moment the framework applies, not when the LAMA list calls your name.

---

## 9. Primary sources, as inspected

Every URL below was fetched and the document read in this session unless marked [verified-carried].

| Tag | Document | URL |
|---|---|---|
| SEBI-2026 | SEBI, Review of Framework to address the 'technical glitches' in Stock Brokers' Electronic Trading Systems, **HO/38/44/12(1)2026-MIRSD-TPD1**, 09-Jan-2026 (7pp) | https://www.sebi.gov.in/sebi_data/attachdocs/jan-2026/1767957683485.pdf |
| NSE-72254 | NSE/COMP/72254, Ref 03/2026, 09-Jan-2026 — circular + Annexure 1 (SEBI circular) + **Annexure 2 (joint exchange detailed guidelines, 10pp)** + Annexure A (disincentives) + Annexure B (Preliminary Incident Report) + Annexure C (RCA) | https://nsearchives.nseindia.com/content/circulars/COMP72254.zip |
| NSE-54876 | NSE/COMP/54876, 16-Dec-2022 — original joint exchange guidelines; Annexure A (SEBI 2022 framework), Annexure B (reporting format .xlsx), **Annexure C (2022 penalty structure)** | https://nsearchives.nseindia.com/content/circulars/COMP54876.zip |
| NSE-66369 | NSE/COMP/66369, Ref 06/2025, 29-Jan-2025 — Revised List of Specified Members (42 names in Annexure A) | https://nsearchives.nseindia.com/content/circulars/COMP66369.pdf |
| NSE-COMP-master | NSE/COMP/73981, Master Circular for Member Compliance, 30-Apr-2026 — §33 glitch framework; Exhibit 39 (disincentives), Exhibit 40 (Preliminary Incident Report), Exhibit 41 (RCA) | https://archives.nseindia.com/content/circulars/COMP73981.zip |
| NSE-73850 | NSE/INSP/73850, Ref 20/2026, 22-Apr-2026 — System Audit of Trading Members; Annexure A (audit type matrix), TOR 17(k), 17(t)–17(x), 26(a)–26(h), 27 | https://nsearchives.nseindia.com/content/circulars/INSP73850.pdf |
| NSE-INSP-master | NSE/INSP/73976, Master Circular for Inspection, 29-Apr-2026 — §8.6 cyber, §8.19 common submissions, **Exhibit 53 (70 common submissions, items 43 and 44)**, Annexures 1.1–1.6 (enforcement) | https://archives.nseindia.com/content/circulars/INSP73976.zip |
| NSE-69184 | NSE/INSP/69184, Ref 46/2025, 18-Jul-2025 — common submissions phase I (40 reports from 01-Aug-2025) | https://nsearchives.nseindia.com/content/circulars/INSP69184.pdf |
| NSE-70505 | NSE/INSP/70505, Ref 57/2025, 29-Sep-2025 — common submissions phase II (28 from 15-Oct-2025; 2 more from 15-Dec-2025) | https://nsearchives.nseindia.com/content/circulars/INSP70505.pdf |
| NSE-56927 | NSE/INSP/56927, 01-Jun-2023 — QSB enhanced obligations; Annexure A §8.3.1–8.3.2 (scalable infrastructure and technical capacity, quarterly CTO/CIO declaration) | https://nsearchives.nseindia.com/content/circulars/INSP56927.zip |
| NSE-MSD-59764 | NSE/MSD/59764, Ref 76/2023, 14-Dec-2023 — Colocation Advisory | https://nsearchives.nseindia.com/content/circulars/MSD59764.pdf |
| NSE-MSD-60456 | NSE/MSD/60456, Ref 06/2024, 30-Jan-2024 — Colocation Advisory update (no market-hours access from 05-Feb-2024) | https://nsearchives.nseindia.com/content/circulars/MSD60456.pdf |
| SEBI-PR66 | SEBI Press Release **PR No.66/2025**, 10-Oct-2025 — penalty rationalisation **and the definition of Samuhik Prativedan Manch** | https://www.sebi.gov.in/sebi_data/attachdocs/oct-2025/1760093949147.pdf |
| SEBI-FIRE | SEBI, **HO/(449)2026-ITD-5_DIV1/I/19448/2026**, 24-Aug-2026 — alignment of the Incident Reporting Portal with the FSB FIRE format | https://www.sebi.gov.in/sebi_data/attachdocs/aug-2026/1787569463244.pdf |
| SEBI-ITRI | SEBI, **HO/47/18/11(1)2026-MRD-TPD1/I/19509/2026**, 24-Aug-2026 — IT Resilience Index for MIIs (4pp) | https://www.sebi.gov.in/sebi_data/attachdocs/aug-2026/1787568759364.pdf (landing page: https://www.sebi.gov.in/legal/circulars/aug-2026/it-resilience-index-for-market-infrastructure-institutions-miis-_103913.html ) |
| SEBI-CSCRF | SEBI, **SEBI/HO/ITD-1/ITD_CSC_EXT/P/CIR/2024/113**, 20-Aug-2024 — Cybersecurity and Cyber Resilience Framework; Table 4 (broker categorisation), §4.5 (Market SOC), "Anticipate | Detect" SOC mandate | https://www.sebi.gov.in/sebi_data/attachdocs/aug-2024/1724326790365.pdf |
| Cited but not fetched today | SEBI/HO/MIRSD/MIRSD-PoD-1/P/CIR/2023/24 (06-Feb-2023, QSB obligations); SEBI Master Circular for Stock Brokers SEBI/HO/MIRSD/MIRSD-PoD/P/CIR/2025/90 (17-Jun-2025) para 65; SEBI 10-Dec-2024 MII capacity/real-time performance monitoring; NSE/COMP/57720 (26-Jul-2023); NSE/COMP/67776 (30-Apr-2025) Para 31; NSE/INSP/55875 (03-Mar-2023) QSB list; NSE/INSP/73575 (01-Apr-2026) FY26-27 QSB list; NSE/INSP/73503 (27-Mar-2026); CERT-In Directions; SEBI IRRA discontinuation (May 2026) | Each is quoted **by number and date** from a document read today, or is [verified-carried] from a sibling `RESEARCH_*.md`. None of these numbers is reconstructed from memory. |

---

## 10. Gaps and cautions

**Decisive answers, restated so they cannot be misread**

1. **Push versus incident-only.** For any broker not on the exchange's published Specified-stock-brokers list, the glitch framework is **incident-triggered reporting plus internal self-monitoring**. No telemetry leaves the building on a schedule. For Specified stock brokers, telemetry is **continuous and real-time** over a broker-built API gateway. Both statements are [verified]. Writing the manual as if all brokers stream telemetry, or as if no broker does, would be wrong in opposite directions.
2. **The "real time" note in the brief is correct and now sourced** — Exhibit 53 item 44 of NSE/INSP/73976 records "Parameters for monitoring Technical Glitches" at "**Real time**" periodicity. It is the LAMA obligation, hence **Specified brokers only**.
3. **No agent.** No primary source mentions an exchange-installed agent. The published architecture is broker-built endpoint, exchange-side consumption over API.

**Conflicts inside the primary sources — carry these into the manual as flags, do not resolve them silently**

4. **12 vs 14 LAMA parameters.** NSE/COMP/72254 Annexure 2 §7.1 and NSE/COMP/73981 §33.7 list **12**. NSE/INSP/73850 TOR 17(w) — the document an auditor works from — lists **14**, adding **Network Latency** and **DNS failures**, and cites the superseded 2022 circular as authority. **Instrument 14.** The reason for the divergence is **[unknown]**.
5. **"Top 20" vs 42 published names.** §33.9(a) states top 20; the list beneath it has 42. NSE/COMP/66369 is additive rather than a re-cut. Treat the published list as controlling.
6. **The 45-minute / 45-day independent-auditor RCA report** appears in **NSE/COMP/73981 §33.4(f) only** — not in SEBI 09-Jan-2026 §7 and not in NSE/COMP/72254 Annexure 2 §4. Treat it as an NSE requirement and verify separately for BSE and MCX.
7. **Exhibit 53 item 43 is stale** — still prints "within 1 hour" and "14 days". The operative clocks are **2 hours** and **14 working days** from 9 January 2026. Never use Exhibit 53 as the timeline source.
8. **NSE/INSP/73850 contradicts itself on the peak-load window.** TOR 17(k) states a calendar quarter for everyone (the 2022 rule); TOR 26(h) states the 2026 tiering (quarter/half-year/year). 26(h) matches the operative guidelines.
9. **NSE/COMP/73981 §33.10 still describes IRRA**, which SEBI discontinued from 7 May 2026. The master was finalised 30 April 2026. Dead text — keep IRRA out of the runbook.
10. **The joint 2026 guidelines number two consecutive clauses "7.1"** in Annexure 2 §7. NSE/COMP/73981 §33.7 renumbers them (i) and (ii). Cite §33.7(i)/(ii) when precision matters.

**Genuine unknowns — do not fill these in**

11. **[unknown] LAMA transport direction at the wire level.** "Served by" (Annexure 2) reads as exchange-pull; "published in the LAMA server" (TOR 17(u)) reads as broker-push. Both are primary. Unresolved.
12. **[unknown] LAMA technical specification** — endpoint schema, authentication, polling interval, payload format, metric units, aggregation windows, percentiles, label sets, per-parameter definitions. Communicated bilaterally to designated members under NSE/COMP/54876 §5's "onward discussion" clause. Nothing published.
13. **[unknown] Threshold values for any LAMA parameter.** None exist in any of the five framework documents. The exchange "gauges health"; the failing value is unpublished. Do not invent an SLA.
14. **[unknown] LAMA alert or escalation contract.** No published commitment that the exchange will notify a broker when a LAMA series degrades.
15. **[unknown] LAMA-specific financial disincentive.** Exhibit 39 / Annexure A has no LAMA line item; enforcement appears to run through system-audit observations. No tariff located — and absence of a tariff is not absence of consequence.
16. **[unknown] Samuhik Prativedan Manch URL, module path and glitch deep link.** No URL anywhere. NSE's own circulars describe a routing rule, not a portal, and never use the SPM name. Resolve at onboarding.
17. **[unknown] Whether one LAMA gateway discharges NSE, BSE and MCX**, notwithstanding item 44's presence in the common-submissions register.
18. **[unknown] Whether the 2022 fallback mailbox `infotechglitch@nse.co.in` remains live** alongside SPM.
19. **[unknown] Clock for the system auditor's certificate** supporting a disincentive-exemption claim (Annexure 2 §2.3 states no deadline).
20. **[unknown] BSE and MCX notice numbers** implementing the 9 January 2026 framework, and their respective monitoring-mechanism and disincentive annexures. **Both bseindia.com and mcxindia.com returned HTTP 403 to every automated request in this session.** Prior work in this project recorded, as [verified-carried], **MCX 195/2026** and **MCX 015/2026** (via Ricago/TeamLease mirrors) and **BSE notice 20260313-24** (via a TeamLease printout) as the BSE/MCX adoption instruments — see `RESEARCH_certification.md` — but those are **secondary mirrors, not primary PDFs, and were not re-inspected today.** The framework's *substance* is nonetheless [verified] for BSE and MCX, because SEBI's circular binds "All recognized Stock Exchanges", the exchanges framed Annexure 2 **jointly**, and Annexure B's venue field names NSE, BSE, MCX, NCDEX and MSEI. **Retrieve the BSE and MCX originals manually before the manual cites a BSE or MCX notice number.**
21. **[unknown] Whether broker glitch or downtime data feeds the MII IT Resilience Index.** ITRI sub-parameters are not finalised until 30 November 2026.
22. **[unknown] The colo "separate report" format and TOR** promised by NSE/MSD/59764 §12 ("will be shared vide a separate circular shortly" — December 2023). Follow-up circular not located.
23. **[unknown] Market SOC operational detail** — onboarding mechanics, log-source scope, cost, data-residency terms, and what exactly the exchange sees. CSCRF mandates the onboarding for Small-size and Self-certification REs; the operating pack was not retrieved.

**Method caution**

24. **Web search was unavailable.** This session's WebSearch budget was exhausted at the first call (200/200). Every finding above was obtained by **direct retrieval of primary PDFs and ZIPs over HTTPS** from sebi.gov.in, archives.nseindia.com and nsearchives.nseindia.com, using circular numbers recovered from (a) this project's existing `RESEARCH_*.md` corpus and (b) cross-references inside the documents themselves. The upside is that everything cited was read in full rather than summarised from a search snippet. The downside is **discovery risk**: a 2026 circular that nothing else cross-references — most plausibly a LAMA implementation or onboarding circular, or an NSE circular naming the SPM module — would not have surfaced. **Before this is treated as complete, run keyword searches for "LAMA", "Samuhik Prativedan Manch", and "Logging and Monitoring Mechanism" against sebi.gov.in and the NSE circular index.**
25. **One prior-research correction.** `RESEARCH_monitoring.md` line 51 marks the LAMA "current exact polling cadence" as [unknown]. That is right about the *cadence* but understates what is published: the **periodicity is "Real time"** ([verified], Exhibit 53 item 44) and the **direction and mechanism are specified** ([verified], Annexure 2 §7.1). Only the wire-level schema and interval remain unknown. Update that row when the manual is written.

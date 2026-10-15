# Disaster Recovery Site Planning and Exchange Connectivity — Indian Stockbroker (NSE / BSE / MCX)

Research date: **2026-10-15**. Prepared for a greenfield Indian stockbroker operations manual.

**Evidence tags.** `[verified]` = read in the cited primary document. `[likely]` = 2+ independent sources named, but not read in a single authoritative primary text. `[uncertain]` = one weak/secondary source. `[unknown]` = not established; do not assert.

**Reading rule for this file.** Three *separate* rulebooks govern broker DR. They do not agree on every number, and the differences are not drafting noise — they are independently enforceable:

| Rulebook | Instrument | Governs | Disaster trigger | RTO | RPO |
|---|---|---|---|---|---|
| Broker technical-glitch framework | SEBI 9-Jan-2026 + joint exchange guidelines | Stock brokers (IBT/STWT, >10,000 clients) | **45-minute** disruption of a critical system | **2 hours** | **15 minutes** |
| Cyber framework (CSCRF) | SEBI CSCRF, Aug 2024 | **All** regulated entities incl. all brokers | declare **within 30 minutes** of the incident | **2 hours** | **15 minutes** |
| MII framework | SEBI/HO/MRD1/DTCS/CIR/P/2021/33 | Exchanges, CCs, depositories (**not** brokers) | declare **within 30 minutes** of the incident | **45 minutes** | **15 minutes** |

[verified] all three rows — see §1.5. **Do not copy the MII 45-minute RTO or the 500 km separation into a broker manual.**

---

## 0. Source register

| Tag | Document | Number / date | URL |
|---|---|---|---|
| **[S-GLITCH]** | SEBI — Review of Framework to address 'Technical Glitches' in Stock Brokers' Electronic Trading Systems | **SEBI/HO/38/44/12(1)2026-MIRSD-TPD1, 9 Jan 2026** | https://www.sebi.gov.in/sebi_data/attachdocs/jan-2026/1767957683485.pdf |
| **[X-JOINT]** | Joint exchange guidelines (Annexure-1) adopting the above — definition, applicability, capacity, software testing, **BCP & DRS (§8)**, LAMA, Annexure-A penalties, Annexure-B/C report formats | **MCX/TECH/015/2026, 9 Jan 2026** | Third-party mirror: https://www.ricago.com/assets/front/base/file/file_management/4967.pdf |
| **[N-COMP]** | NSE Master Circular — Membership Compliance Dept., **§33.8 BCP/DRS, §33.9 Specified Members**, Exhibit 39 penalties | **NSE/COMP/73981, 30 Apr 2026** (Circular Ref. 39/2026) | https://nsearchives.nseindia.com/content/circulars/COMP73981.zip |
| **[N-UID]** | NSE **User id — Consolidated Circular** (user IDs, box IDs, location, multilocking, shifting, **§6 Business Continuity Provisions**, **§7 Redundancy Options**, CTCL ULC mapping + undertaking) | **NSE/MSD/73956, 29 Apr 2026** (Ref. 27/2026) | https://nsearchives.nseindia.com/content/circulars/MSD73956.zip |
| **[N-AUD]** | NSE System Audit **Terms of Reference, §11 BCP/DR** | **NSE/INSP/73850, 22 Apr 2026** (Ref. 20/2026) | https://nsearchives.nseindia.com/content/circulars/INSP73850.pdf |
| **[N-INSP]** | NSE Master Circular — Inspection Dept., incl. **Exhibit 49 QSB Comprehensive Operating Guidelines** and **Exhibit 53 Common Submission among Exchanges** (inside `Exhibits.zip`) | **NSE/INSP/73976, 29 Apr 2026** (Ref. 21/2026) | https://nsearchives.nseindia.com/content/circulars/INSP73976.zip |
| **[N-NNF]** | NSE **Trimmed NNF Protocol, Capital Market**, v6.7 — Message Download, Ch.11 Exception Handling, Cancel-on-Logout, heartbeat/box sign-off | v6.7, dated **30 Sep 2026** | https://nsearchives.nseindia.com//web/mediaattachment/2026-09/TP_CM_Trimmed_NNF_PROTOCOL_6.7_20260930175847.pdf |
| **[N-DC]** | NSE **FAQs on Direct Connection** (box ID ↔ IP, parent/child IP, gateway router) | undated page, retrieved 2026-10-15 | https://www.nseindia.com/trade/login-without-tap-direct-connection-faqs |
| **[N-CONN]** | NSE **Connectivity options at NSE** (categories A–I/O/S, single vs dual leased line) | PDF published 2026-08 | https://nsearchives.nseindia.com//web/mediaattachment/2026-08/Read_more_about_Connectivity_Options_at_NSE_.pdf_20260810192335.pdf |
| **[N-COST]** | NSE **Connectivity Costing (Non-Colo)** — ARC table, processing fees | page "Updated on: **10/08/2026**" | https://www.nseindia.com/trade/platform-services-connectivity-costing |
| **[N-CAL]** | NSE **Contingency Drill / Mock Trading schedule for 2026** | page, retrieved 2026-10-15 | https://www.nseindia.com/static/resources/exchange-communication-contingency-drill-calendar |
| **[S-MII]** | SEBI — Guidelines for BCP and DR of **MIIs** | **SEBI/HO/MRD1/DTCS/CIR/P/2021/33, 22 Mar 2021** | https://www.sebi.gov.in/sebi_data/attachdocs/mar-2021/1616417504302.pdf |
| **[S-CSCRF]** | SEBI **Cybersecurity and Cyber Resilience Framework**, v1.0 (205 pp.) | Aug 2024 | https://www.sebi.gov.in/sebi_data/attachdocs/aug-2024/1724326790365.pdf |
| **[S-QSB]** | SEBI — Qualified Stock Brokers: enhanced obligations (§§8.5.10–8.5.13 BCP) | **SEBI/HO/MIRSD/MIRSD-PoD-1/P/CIR/2023/24, 6 Feb 2023** | https://www.sebi.gov.in/sebi_data/attachdocs/feb-2023/1675683541895.pdf |
| **[S-IRRA]** | SEBI — **Discontinuation of IRRA platform**; describes Contingency Pool Trading | **HO/38/44/12(3)2025-MIRSD-TPD1/I/10705/2026, 7 May 2026** | https://www.sebi.gov.in/sebi_data/attachdocs/may-2026/1778149088029.pdf |
| **[S-CP26]** | SEBI **Consultation Paper** — Measures to Strengthen BCP and DR of MIIs | **15 Sep 2026**, comments closed **5 Oct 2026** | https://www.sebi.gov.in/sebi_data/attachdocs/sep-2026/1789466812410.pdf |
| **[S-ITRI]** | SEBI — IT Resilience Index for MIIs | **HO/47/18/11(1)2026-MRD-TPD1/I/19509/2026, 24 Aug 2026** | https://www.sebi.gov.in/legal/circulars/aug-2026/it-resilience-index-for-market-infrastructure-institutions-miis-_103913.html |

Referenced but **not retrieved**: SEBI/HO/MRD/TPD/P/CIR/2024/119 (12 Sep 2024, modifications to MII BCP/DR) — metadata only; SEBI Master Circular for Stock Exchanges and Clearing Corporations **dated 30 Dec 2024** (paras 9.1.3.3, 9.1.3.8 cited inside [S-CP26]); NSE/MSD/73957, 29 Apr 2026 (service-provider connectivity rate chart); NSE/COMP/66369, 29 Jan 2025 (Specified Members list). Treat their contents as **[unknown]**.

---

## 1. Regulatory requirements

### 1.1 Which brokers must establish a DR site — the threshold is 50,000, not 10,000

The user's premise is correct that there is a client-count threshold, and the number is **50,000 across all exchanges**. Two distinct thresholds must not be conflated:

| Threshold | Number | What it triggers | Measurement | Evidence |
|---|---|---|---|---|
| **Technical-glitch framework applicability** | **more than 10,000** registered clients (excluding closed accounts), broker providing IBT/STWT platforms, as on **31 March of previous financial year** | The whole glitch framework: definition, reporting, capacity planning, software testing, monitoring, and §8's BCP/DR chapter | Institutional clients **excluded** from the applicability computation | [verified] [S-GLITCH] §6.1; [X-JOINT] §10; [N-COMP] §33.9(b) |
| **Mandatory DR setup** | **minimum client base of 50,000 clients across all Exchanges** | Must "mandatorily establish a 'Business Continuity'/'Disaster Recovery setup'" | "across all Exchanges" — aggregate, not per-exchange | [verified] [X-JOINT] §8.1; [N-COMP] §33.8(a); corroborated by [N-AUD] ToR 11(a) |

Verbatim, [X-JOINT] §8.1 / [N-COMP] §33.8(a): *"Members with a minimum client base of 50,000 clients across all Exchanges, are to mandatorily establish a 'Business Continuity'/ 'Disaster Recovery setup'."* [verified]

The policy driver is explicit: [S-GLITCH] §11.1(i) directs exchanges to rationalise so that *"BCP and DRS shall not be applicable to small size stock brokers."* [verified]

**Two independent routes also compel a DR site below 50,000 clients:**

| Route | Who | Effect | Evidence |
|---|---|---|---|
| **Specified stock broker** designation | Top 20 by IBT/STWT clients per exchange | ToR 11(a) applies BCP/DR to *"'Specified Members' **and** Members with a minimum client base of 50,000 clients"* — i.e. Specified status compels DR irrespective of the 50,000 count | [verified] [N-AUD] ToR 11(a) |
| **QSB** designation | SEBI-designated / voluntary QSBs | QSB operating guidelines impose **quarterly** DR drills from "the DR site of QSB" — which presupposes one exists | [verified] [S-QSB] §§8.5.11–8.5.13; [N-INSP] Exhibit 49 row 15 |

> **Greenfield implication.** A new broker is below every threshold on day one and has **no** mandatory DR-site obligation. But CSCRF RC.RP.S2 (30-minute disaster declaration, RTO 2h, RPO 15 min) is tagged **"All REs (Mandatory)"** with no size carve-out [verified] [S-CSCRF]. A broker with no second site cannot meet a 2-hour RTO for a site-loss scenario. Build the DR site before crossing 50,000 clients, not after — a DR site is not a 90-day project, and the §8.6 phase-in (below) assumes one already exists when the framework first bites.

### 1.2 "Specified stock brokers" — definition and a drafting ambiguity to manage

Verbatim, [X-JOINT] §9: *"'Specified stock brokers': The top 20 stock brokers registered with the Exchange, having the most Internet and Wireless technology-based (IBT/STWT) clients are classified as 'Specified stock brokers' for this purpose. The list of 'specified stock brokers' will be published at the beginning of every financial year on the website of the stock exchange."* [verified]

| Point | Detail | Evidence |
|---|---|---|
| Basis | **Top 20** per exchange by **IBT/STWT client base** | [verified] [X-JOINT] §9; [N-COMP] §33.9(a) |
| Publication | Beginning of every financial year, on the exchange website | [verified] [X-JOINT] §9 |
| Per-exchange, not market-wide | "registered with the Exchange" — NSE, BSE and MCX each designate 20; the union across three exchanges exceeds 20 firms. Use each venue's actual list | [verified] wording of [X-JOINT] §9 |
| Institutional clients excluded | From the framework applicability computation | [verified] [X-JOINT] §10 |
| **Ambiguity to flag** | [N-COMP] heads the published list **"33.9 Identification of Specified Members for Implementation of Logging and Monitoring Mechanism (LAMA)"**, yet §33.8(e) imposes the half-yearly DR drill on "Specified Members". The same list is used for two purposes under a LAMA-captioned heading | [verified] headings in [N-COMP] §§33.8–33.9 |
| NSE's published list provenance | The list reproduced in the **Apr-2026** master cites **NSE Circular NSE/COMP/66369 dated 29 Jan 2025** (footnote 41); entries seen include 5paisa Capital, Acumen Capital, Alice Blue, Anand Rathi, Angel One, Axis Securities, Bonanza Portfolio, Choice Equity Broking | [verified] [N-COMP] §33.9 and fn.41 |
| Whether an FY2026-27 list exists | **[unknown]** — not retrieved. §9 requires annual publication; confirm the current list with each exchange before relying on designation status | — |

### 1.3 Drill frequency by category — both user hypotheses confirmed

| Category | DR drill / live-trading frequency | Scope of the drill | "Not coinciding" condition | Evidence |
|---|---|---|---|---|
| **Specified Members** | **Half-yearly** | *"running all operations from DRS for at least 1 full trading day"* | not stated | [verified] [X-JOINT] §8.5; [N-COMP] §33.8(e) |
| **QSBs** | **Quarterly** | *"running all operations from DRS for at least 1 full trading day"* | **"such drills shall not coincide with drills conducted by Exchange"** | [verified] [N-INSP] Exhibit 49 row 15 (cols. D & E) |
| **New member newly falling under the framework** | Phased: **30% of clients** from DRS for ≥1 full trading day in **Q1**, **60%** in **Q2**, **100%** from the **subsequent quarter** onwards — each for ≥1 full trading day | per-quarter client percentage | not stated | [verified] [X-JOINT] §8.6; [N-COMP] §33.8(f) |
| **Non-Specified, non-QSB broker ≥50,000 clients** | **[unknown]** — must establish the DR setup (§8.1) and the auditor must assess preparedness (§8.14), but no own-DR drill *frequency* is stated for this band in any instrument read | — | — | [verified] by absence across [X-JOINT] §8, [N-COMP] §33.8, [N-AUD] ToR 11 |
| **All REs (cyber route)** | *"suitable periodic drills to test the adequacy and effectiveness of the response and recovery plan"* (RC.RP.S3, **All REs, Mandatory**) — frequency unquantified | response & recovery plan | — | [verified] [S-CSCRF] RC.RP.S3 |
| **MIIs & Qualified REs (incl. QSBs)** | **Cyber resilience testing at least 2 times in a financial year (6-month periodicity)**, scenario-based, validating recovery within prescribed RTO/RPO | includes a recommended **ransomware scenario where both PDC and DRS are impacted** | — | [verified] [S-CSCRF] RC.RP.S2(2) and the drill note above it |

Verbatim, QSB column D of [N-INSP] Exhibit 49 row 15: *"QSB shall conduct DR drills/live trading from the DR site on quarterly basis."* Column E: *"QSBs shall conduct DR drills/ live trading from the DR site on quarterly basis. DR drills/ live trading shall include running all operations from DRS for at least 1 full trading day and such drills shall not coincide with drills conducted by Exchange."* [verified]

**Precedence.** The QSB quarterly regime is an **additional** overlay, not a substitute. A firm that is both a QSB and a Specified Member drills **quarterly**, each drill a full trading day running all operations, and none coinciding with an exchange drill. [verified] by the separate standing of [N-INSP] Exhibit 49 and [X-JOINT] §8.5.

### 1.4 Also required of QSBs under the BCP head

| Obligation | Requirement | Evidence |
|---|---|---|
| BCP policy review | **Half-yearly** (vs annually for the general broker rule) | [verified] [S-QSB] §8.5.10; [N-INSP] Ex.49 row 15 |
| Client communication on disruption | Alternate means of communication incl. a channel to clients; *"Such communication shall be completed **within 60 minutes from the time of disruption**"* | [verified] [N-INSP] Ex.49 row 15 col. D |
| Failback | *"QSBs to ensure smooth failback to Primary Site after the disaster and ensure all associated issues are resolved and business operations are back to source"* | [verified] [N-INSP] Ex.49 row 15 col. D |
| CISO review | Implementation of BCP and SOP on DR reviewed **monthly**, report to the board; board comments on the CISO's DR report minuted | [verified] [S-QSB] §8.5.12; [N-INSP] Ex.49 row 15 |
| Specified-broker provisions extend to QSBs | *"All the provisions applicable to specified stockbrokers … shall also be applicable to the QSBs"* | [verified] [S-QSB] §8.5.13 |
| Cyber/resilience audit | Half-yearly system audit by a **CERT-In empanelled** auditor | [verified] [S-QSB] §8.5.14 |

### 1.5 Disaster trigger, RTO and RPO

| Item | Broker rule | Evidence |
|---|---|---|
| **"Disaster" definition** | *"'Disaster' may be defined as scenarios where: **a. A 45-minute disruption of any of the 'critical systems'**, or b. Any additional criteria specified by the Governing Board of the Member."* | [verified] [X-JOINT] §8.3; [N-COMP] §33.8(c) |
| **RTO** | *"the maximum time taken to restore operations of 'critical systems' from DRS **after the declaration of 'Disaster'** shall be **2 Hours**"* | [verified] [X-JOINT] §8.9; [N-COMP] §33.8(i) |
| **RPO** | *"the maximum tolerable period for which data might be lost due to a major incident shall be **15 Minutes**"* | [verified] [X-JOINT] §8.9; [N-COMP] §33.8(i) |
| Who declares | **Specified Members** must constitute an **IRT/CMT chaired by the MD**, or by the **CTO** if the MD is unavailable; IRT/CMT is *"responsible for the actual declaration of disaster, invoking the BCP and shifting of operations from PDC to DRS"* | [verified] [X-JOINT] §8.15; [N-COMP] §33.8(n) |
| Decision teams (all brokers) | *"Stock brokers, shall constitute responsible teams for taking decisions about shifting of operations from primary site to DR site, putting adequate resources at DR site, and setting up mechanism to make DR site operational from primary data centre etc."* | [verified] [X-JOINT] §8.7 |

**The 45-minute vs 30-minute tension — this is the single most important compliance trap in this topic.**

CSCRF **RC.RP.S2**, applicability **"All REs (Mandatory)"**, verbatim: *"In the event of disruption of any one or more of the critical systems, the RE shall, **within 30 minutes of the incident, declare that incident as 'Disaster'** based on the business impact analysis. Accordingly, the RTO shall be two (2) hours as recommended by IOSCO for the resumption of critical operations. The RPO shall be 15 minutes for all REs. The recovery plan shall be scenario-based and in line with the RTO and RPO specified."* [verified] [S-CSCRF] RC.RP.S2.

| | Glitch framework ([X-JOINT] §8.3, §8.9) | CSCRF (RC.RP.S2) |
|---|---|---|
| Trigger | a **45-minute** disruption **is** a Disaster | **declare within 30 minutes** of the incident |
| RTO | 2 hours from declaration | 2 hours |
| RPO | 15 minutes | 15 minutes |
| Applies to | brokers in the glitch framework | **all REs**, mandatory |

RTO and RPO agree at 2 hours / 15 minutes. The **declaration clock does not**. Read together, the binding effective worst case is: **decide and declare by T+30 minutes, restore critical systems from DRS by declaration + 2 hours.** Write the SOP to the 30-minute clock and record the 45-minute glitch-framework definition as the *outer* definitional boundary, not as permission to deliberate for 45 minutes. [verified] both sources; the *reconciliation* is **analyst interpretation** — no instrument read resolves the conflict expressly. Obtain written confirmation from each exchange.

### 1.6 Site separation

Verbatim, [X-JOINT] §8.4 / [N-COMP] §33.8(d): *"The DRS shall preferably be set up in **different seismic zones**. In case, due to any reasons like operational constraints, such a geographic separation is not possible, then the Primary Data Centre (PDC) and DRS shall be separated from each other by a distance of **at least 250 kilometres** to ensure that both of them do not get affected by the same natural disaster. **The DR site shall be made accessible from primary data centre to ensure syncing of data across two sites.**"* [verified]

| Entity | Preference | Fallback distance | Evidence |
|---|---|---|---|
| **Stock broker** | different seismic zones | **≥ 250 km** | [verified] [X-JOINT] §8.4; [N-COMP] §33.8(d); restated by auditor test [N-AUD] ToR 11(j) *"not less than 250 km"* |
| **MII** (exchange/CC/depository) | different seismic zones | **minimum 500 km** | [verified] [S-MII] §3(c) |

Note the final sentence of §8.4: inter-site **accessibility for data syncing is itself a regulatory requirement**, not merely an engineering choice. Distance and replication connectivity are a single clause.

### 1.7 Penalties — Annexure A of the joint exchange guidelines

| Ref | Failure | **Specified stock brokers** | **All other applicable stock brokers** | Evidence |
|---|---|---|---|---|
| B(iv) | **Failure to set up DR site** as per the provisions | **₹2 lac** | **₹20,000** | [verified] [X-JOINT] Annexure A, B(iv) |
| B(v) | **Failure to restore operations by moving to DR site within RTO** | **₹1 lac** | **₹20,000** | [verified] [X-JOINT] Annexure A, B(v) |
| **B(vi)** | **Failure to conduct DR drill / live trading from DR site** as per the provisions | **₹1 lac, plus ₹50,000 for every month during which failure continues, subject to maximum ₹5 lac per instance** | **NA** | [verified] [X-JOINT] Annexure A, B(vi) |
| B(i) | Failure to report a technical glitch incident to the Exchange | ₹5 lac | ₹1 lac | [verified] [X-JOINT] Annexure A, B(i) |
| B(ii) | Failure to submit the **preliminary incident report by T+1** (if T+1 is a trading holiday, next trading day) | ₹50,000 + ₹25,000/day, max ₹5 lac | ₹20,000 + ₹5,000/day, max ₹1,00,000 | [verified] [X-JOINT] Annexure A, B(ii) |
| B(iii) | Failure to submit **RCA within 14 working days** | same cell as B(ii) | same cell as B(ii) | [verified] [X-JOINT] Annexure A, B(iii) |
| A(i) | 6th glitch incident onwards (>15 min, in a FY) | ₹25,000/instance, **+₹25,000 progressively** | ₹10,000/instance, **+₹5,000 progressively** | [verified] [X-JOINT] Annexure A, A(i) |
| A(iii) | **11th incident onwards** | progressive penalty **plus onboarding of new clients stopped** (exchange-wise/segment-wise per nature of glitch) until the exchange analyses the RCA and satisfies itself on corrective measures, **or 15 days from the glitch, whichever is higher** | progressive penalty + case-to-case disciplinary action | [verified] [X-JOINT] Annexure A, A(iii) |

Every row additionally carries: *"the relevant authority of the Exchange on a case-to-case basis and based on the gravity of non-compliance shall decide on additional disciplinary actions."* [verified]

**The B(vi) "NA" matters.** The monthly-accruing missed-drill penalty is expressly **not** levied on non-Specified brokers — consistent with §8.5 imposing the half-yearly drill only on Specified Members. A non-Specified broker above 50,000 clients can still be penalised ₹20,000 under **B(iv)** for not having the DR setup at all, and ₹20,000 under **B(v)** for missing RTO in a real event. **Do not generalise the ₹1 lac + ₹50,000/month tariff to all brokers.** [verified] [X-JOINT] Annexure A.

### 1.8 Certification

| Requirement | Who | Clock | Evidence |
|---|---|---|---|
| **ISO 27001** (Information Security) — mandatory | **Specified Members and QSBs** | **within 2 years from applicability of the framework** | [verified] [X-JOINT] §8.16; [N-COMP] §33.8(o) |
| ISO 20000 (IT Service Mgmt), ISO 22301 (BCMS) | same | **"recommended to be adhered to"** — all policies/procedures/processes must be *based on* these standards | [verified] [X-JOINT] §8.16 |
| ISO 27001 **scope must include** PDC site, **DR site, NDR site**, SOC and Colocation facility | MIIs and Qualified REs | mandatory | [verified] [S-CSCRF] PR.IP.S16 |

Do not report ISO 20000/22301 as mandatory annual returns. [verified] the "recommended" wording.

---

## 2. THE KEY ARCHITECTURAL QUESTIONS

All NSE answers below are from NSE's own current consolidated circulars and protocol documents. **BSE and MCX equivalents are [unknown] and must be confirmed separately** — see §8.

### (a) Does a member need separate exchange connectivity provisioned to the DR site in advance?

**Yes — effectively, and it must be ordered and activated beforehand; there is no on-demand DR link.**

| Finding | Detail | Evidence |
|---|---|---|
| **It is an audit test, not an option** | ToR **11(d) "Connectivity with other FMIs"**: *"The system auditor should check whether there is an **alternative medium to communicate with Stock Exchanges and other FMIs**."* Applicable to Type I/II **and** Type III audits | [verified] [N-AUD] ToR 11(d) |
| **Network HA is explicitly in scope** | ToR **11(c) "High Availability"**: *"Whether BCP / DR systems **and network connectivity** provide high availability and have **no single point of failure** for any critical operations as identified by the BCP/DR policy."* | [verified] [N-AUD] ToR 11(c) |
| Connectivity is a **subscribed scenario**, applied for in advance | NSE connectivity is sold as categories **A–I, O, S**, each in a **"Single Leased Line"** variant (A2, B1, C1, D1, E1, F1, G1, H1, I1, O1, S1) and a **"Dual Leased Lines"** variant (A4, B2, C2, D2, E2, F2, G2, H2, I2, O2, S2). Bandwidth options 4/10/20/30/50/100/150/200/300 Mbps | [verified] [N-CONN] |
| Activation is an **ENIT request**, with a fee | Activation and shifting/surrender/cancellation are chargeable ENIT activities (§2(e) below); child IPs via *ENIT – New – Trade > Membership > Tcp IP Scenario > Activation > Activation Type* | [verified] [N-COST]; [N-DC] Q11 |
| Direct Connection works over any link type | *"'Direct Connection' is available on all the existing modes of connectivity"* (lease line, colocation, etc.) | [verified] [N-DC] Q3 |
| Permitted DR hosting locations | Trading-terminal location is restricted to *"main office / branch offices / in the office of the approved Authorized Person / at the co-location facility provided by the Exchange / at the Third-party data centers/service provider's site"*. **"Third Party Data Centre/ service provider site can host Trading/ Internet/ NNF server of the member."** | [verified] [N-UID] §3.2 |
| **Hard constraint on a remote DR site** | *"Login from NEAT/NEAT Plus application is **not allowed** from Colocation facility or connectivity availed at Third Party Data Centre."* | [verified] [N-UID] §3.2 |
| Inter-site link is separately mandated | §8.4: *"The DR site shall be made accessible from primary data centre to ensure syncing of data across two sites."* | [verified] [X-JOINT] §8.4 |

**Architectural consequence.** A DR site in a third-party data centre or at NSE colocation **cannot run NEAT/NEAT Plus at all**. A remote DR site must be an **NNF/Direct-Connection** site. If your BCP assumes dealers failing over to NEAT terminals at a distant DR data centre, that plan is non-compliant on its face. [verified] [N-UID] §3.2. (Design inference, flagged as such: this is why a greenfield broker should be NNF-only end to end and treat NEAT purely as a same-office fallback.)

### (b) Are exchange user IDs, NNF IDs, CTCL IDs or box IDs tied to a location or an IP address? Must DR-site identifiers be separately registered?

**Yes to both, and the binding constraint is sharper than "tied to an IP": NEAT-lineage IDs are tied to a *dealing office*; only NON-NEAT IDs may be served from a second city.**

#### Identifier model (NSE)

| Identifier | What it is bound to | Evidence |
|---|---|---|
| **Box ID** | **A connection, i.e. one IP per segment.** The gateway router allocates a gateway server by *"the no. of messages allotted for each Box Id"*; worked example shows Parent IP `…60.2` → Box ID `123`, Child 1 `…60.12` → Box ID `456`, Child 2 `…60.11` → Box ID `789`, all in CM | [verified] [N-DC] Q6, Q10 |
| **User ID quota** | *"Trading members are allotted **50 user ids per box id per segment** upon request."* Also stated on the connectivity sheet as *"50 User IDs per box for each segment"* | [verified] [N-UID] §2.3; [N-CONN] |
| **Message rate** | Controlled **per connected Box ID**; threshold = configured rate +10%; messages beyond that are rejected and *"the Box id is disconnected if the messages exceed 110% of the subscribed rate"*. On disconnect *"all user ids connected to the Box id shall also be disconnected"* | [verified] [N-DC] Q12-13; [N-NNF] heartbeat section |
| **NEAT user ID** | An IP/connectivity, in a specific dealing office | [verified] [N-UID] §§3.1, 5(g),(i) |
| **NEAT converted to NNF** | Same as NEAT for locking purposes; **may login via NEAT as well as NNF**; 12-digit CTCL/IBT/STWT/DMA terminal details must be reported before routing orders. Login/order placement via NEAT on such an ID *"shall result in CTCL mismatch being generated"* | [verified] [N-UID] §3.1 |
| **NON-NEAT user ID** | A separate category that **cannot login/trade through NEAT/NEAT Plus**; no certification required *"as the user does not have trading eligibility by itself"*; 12-digit terminal details must be reported with valid certification before routing orders. *"Members will be required to build additional back up facilities for exigency."* | [verified] [N-UID] §3.1 |
| **12-digit NNF / CTCL / IBT / STWT / DMA terminal IDs** | Member-reported, mapped to an Exchange-allotted user ID and a Unique Location Code | [verified] [N-UID] §§3.1, 6.1 |

#### The location rules — and the one that decides your DR topology

| Facility | Geographic reach | Request path | Evidence |
|---|---|---|---|
| **Multilocking of user ID** | Map an existing **NEAT / NEAT-converted-NNF** user ID to **up to four IPs**. *"Multilocking facility can be availed **only between Ips located in the same dealing office**."* **Exception:** *"Member can do multilocking of users **across cities** for user type **non-neat**."* | ENIT-NEW-TRADE > Trade > User Id request > **Multi lock neat user id** | [verified] [N-UID] §5(g), §7 |
| Algo-tagged exception | *"Members can multi-lock an 'Algo' tagged user **across cities**"*; and may do CTCL ULC mapping for an Algo-tagged user with another Algo-tagged user across cities | ENIT user-id / pre-trade paths | [verified] [N-UID] §5 (Algo tagging bullets) |
| **CTCL ULC (location) mapping** | Map multiple **12-digit NNF** users across multiple connectivities **within the same location**; *"Member can request CTCL ULC mapping of users across multiple Exchange connectivities, **across cities for user type Non-Neat**."* | ENIT-NEW-TRADE > Trade > Member Reporting (Pre Trade) > **CTCL ULC Mapping** | [verified] [N-UID] §6.1(b),(e) |
| **Shifting of user ID** | *"from one connectivity/location to another **i.e., from one Lease Line to another**"* | ENIT > User Id request > Shifting | [verified] [N-UID] §5(i) |
| Unlocking | *"In the absence of Multi locking the member can unlock his user id to login from alternate connectivity."* Corporate Manager can request unlock for all users from the trading terminal | ENIT > Password Reset/Unlock NEAT user id | [verified] [N-UID] §7 |
| **Multi-vendor mapping** | *"User Ids can be mapped with multiple vendors-products-versions combination."* | ENIT > User Id request > **Neat to CTCL Conversion** | [verified] [N-UID] §7 |

**The governing sentence.** The CTCL ULC Mapping undertaking that the member must digitally submit states, verbatim:

> *"3. That the Undersigned states that the servers used for Additional Facility for **NEAT CTCL IDs shall be located at the same office address** which is ______.*
> *4. That the Undersigned states that the servers used for Additional Facility for **NON NEAT IDs shall be located across cities**."*

[verified] [N-UID] §6.1(h), undertaking clauses 3–4.

**So: a DR site in a different city can be served only by NON-NEAT (12-digit NNF) identifiers.** NEAT and NEAT-converted IDs are legally pinned to one office address. [verified]

#### Registration and withdrawal mechanics

| Rule | Detail | Evidence |
|---|---|---|
| **Pre-registration is mandatory** | 12-digit CTCL/IBT/STWT/DMA terminal details must be reported to the Exchange **before routing any order** through them. Use of unreported terminals is *"unauthorized and in violation of the requirements"* | [verified] [N-UID] §3.1 and the unreported-terminal warning |
| **Do it in advance** | *"Accordingly, Members are advised to have multi locking done for their user id **in advance**."* | [verified] [N-UID] §7 |
| **Shifting wipes your risk configuration** | *"On shifting of user id, the existing **multi-lock, limits, and proprietary rights** if present on the selected user **gets removed**."* | [verified] [N-UID] §5(i) note |
| **SLBM needs a separate grant** | If an SLBM-enabled user ID is shifted or multilocked to a different IP, the member must mail **msm@nse.co.in** to have SLBM rights granted on the destination/multilocked IP | [verified] [N-UID] §5(i) note |
| **ULC mapping self-destructs on a location change** | *"In cases where the NEAT/ NNF ID is disabled / shifted to another IP in a **different location**, the above facility shall stand to be **withdrawn automatically**."* Undertaking cl.10 repeats this | [verified] [N-UID] §6.1(g), undertaking cl.10 |
| **NSE may inspect the DR facility unannounced** | *"NSEIL shall, at its discretion, have an absolute right to inspect the Additional Facility used by the Undersigned at any time and without prior notice"*; and may withdraw the facility at its discretion without notice or reasons | [verified] [N-UID] undertaking cls. 6, 8 |
| Same approved user | The mapped NEAT CTCL IDs *"shall be accessed by one and the same approved user"* whose name is uploaded to NSEIL and who holds the required certification | [verified] [N-UID] undertaking cl.1 |
| **The exchange already holds your DR address** | NSE's inspection master lists, among member data fields, **"19 Location of BCP/ DR site"**, annotated *"Shall be sourced through other regulatory submissions."* | [verified] [N-INSP] member-data table row 19 |
| Which submission carries it | **[unknown]** — the master says "other regulatory submissions" without naming the form | — |
| IP/segment reuse | *"Same IPs initially given for CD segment can be used for other segments i.e. CM, FO and COM Segment simultaneously."* | [verified] [N-DC] Q9 |
| Child IPs | Max **9 child IPs per parent IP** in non-colocation; **no child-IP concept in colocation**; child IPs are issued in the same subnet as the parent | [verified] [N-DC] Q11, Q8 |
| NEAT/NNF cannot share an IP | *"Member can either connect through NEAT or through NNF from an IP in the segment. NEAT and NNF application cannot simultaneously connect through same IP in the segment."* A member logged in via NEAT *"will require separate IP for 'Direct Connection'"* | [verified] [N-DC] Q8 |
| Message-rate split is the member's job | Message rate and user limits are per scenario; the member must bifurcate across IPs and segments so the scenario total is not breached, *"to avoid disconnection by the Exchange"* | [verified] [N-DC] Q10, Q11 |

> **Design note (analyst inference, not regulation).** Because ULC mapping is withdrawn automatically when an ID is shifted to another IP in a different location, the robust DR pattern is **not** "shift IDs at failover". It is: pre-register a *distinct set of NON-NEAT 12-digit terminal IDs* on the DR-site connectivity and keep them standing and mapped, so failover is an application-routing change rather than an exchange-registration change. Shifting at failover also wipes limits and proprietary rights [verified] §5(i) — an avoidable second outage.

### (c) What must the member tell the exchange before or during a failover?

**Nothing in advance of the switchover itself. The disclosure is retrospective and rides on the technical-glitch reporting machinery.** No instrument read imposes a pre-failover notice or a standalone "DR invocation report".

| Obligation | Clock | Content | Evidence |
|---|---|---|---|
| **Intimation of Incident** | **T-day, within 2 hours of the incident** | Letter/report subject; **Name of the Member; Member Code**; **Designated Officer** (name, mobile, email); **Date & Time of Incident**; **Exchanges on which the glitch was encountered (NSE, BSE, MCX, NCDEX, MSEI)**; **Intimation to clients** — *"Please attach screenshots of communications to clients"*; additional details | [verified] [X-JOINT] Annexure B item 1 |
| Client intimation | within the same 2 hours | On the broker website **and** another permitted mode (SMS/email/app notification) | [verified] [X-JOINT] Annexure B item 1(5); [N-COMP] §33.4 |
| **Preliminary Incident Report — carries the DR disclosure** | **T+1 day** (if T+1 is a trading holiday, next trading day) | Includes, verbatim as item 8: ***"Did you move operations to the Disaster Recover (DR) site? If, Yes, what was the Recovery Time?"*** Also: incident duration in minutes; description; immediate action; business impact incl. **number of clients impacted**; whether **alternate trading channels** were available and whether traffic spiked on them; whether a **third-party vendor** caused it and whether a **back-up vendor** exists; whether the issue was on the **Exchange-provided environment** (and if so, details of intimation to the Exchange); cause category (network/hardware/software/human error/other) | [verified] [X-JOINT] Annexure B item 2, esp. item 8 |
| **Audit-tested duty to report the declaration** | with the preliminary report | ToR 11(i): *"**c. The declaration of disaster shall be reported in the preliminary report submitted to the Exchange.**"* | [verified] [N-AUD] ToR 11(i)(c) |
| **RCA** | **14 working days** | Annexure C format: member/code; reporting officer; date & time of incident; **date and time of recovery and duration**; chronology; category; business impact incl. **number and percentage of clients affected duly certified by Auditor**, complaints received/resolved, claims made/paid; immediate action; root-cause summary; preventive action. Signed by **Compliance Officer/CTO** | [verified] [X-JOINT] Annexure C |
| Independent-auditor RCA | glitch **longer than 45 minutes** → independent auditor report on the RCA **within 45 days** | — | [verified] [N-COMP] §33.4(f) (corroborates prior project research) |
| Submission route | **Samuhik Prativedan Manch** — single common broker reporting platform, replacing reporting to each exchange | [verified] [S-GLITCH] §3.3 ("Common Reporting Platform"); [N-COMP] §33.4(e). Exact glitch-module deep link **[unknown]** |
| **QSB client-communication clock** | **within 60 minutes from the time of disruption** | via the alternate channel of communication | [verified] [N-INSP] Ex.49 row 15 |
| A standalone, pre-failover "DR invocation" notice to NSE/BSE/MCX | **[unknown]** — none found in [X-JOINT] §8, [N-COMP] §33, [N-AUD] ToR 11, [N-UID], or [N-INSP] Ex.49 | — |

**Practical reading.** You do **not** seek exchange permission to invoke your own DR. You switch, then you disclose — within 2 hours if the disruption meets the 5-minute glitch definition, and formally in the T+1 preliminary report, which asks directly whether you moved to DR and what your recovery time was. Note the trap: **Annexure B item 8 is a self-reported RTO measurement.** It is the number against which penalty B(v) (failure to restore within RTO — ₹1 lac / ₹20,000) is assessed. Instrument your failover to produce a defensible timestamp. [verified] facts; the inference about B(v) exposure is analyst reasoning.

If the DR move is **not** accompanied by a reportable glitch (e.g. a planned drill, or a disruption under 5 continuous minutes), no glitch report is triggered — but the drill-reporting duties in §6 below still apply.

### (d) Does the exchange provide any facility to assist member failover?

**Yes — four distinct facilities, of which one (Contingency Pool) is the real safety net and one (IRRA) was abolished in May 2026.**

| Facility | What it does | Access / conditions | Evidence |
|---|---|---|---|
| **Contingency Pool Facility** (NSE) | *"The Exchange provides trading facility from its premises to members in the event of a contingency where trading member is **not able to use own connectivity because of a technical or a power failure**."* | Written request **on company letterhead signed by an authorised signatory**, asking permission to trade from the Exchange's premises. **"The facility is available on a first come first serve basis."** Request must state: **reason for failure for accessing trading application**, and **details of the authorised persons who will be coming**, with **user id and segment details** | [verified] [N-UID] §7 |
| Contingency Pool Trading (SEBI's description) | *"a mechanism offered by Stock Exchanges that allows Stock brokers to **square off outstanding open positions for their clients** during business disruptions. This facility operates via the exchange's internal network within its physical premises, where broker allocated dedicated terminals are seamlessly connected to the Stock Exchange trading platform."* Noted as *"utilized by brokers on several occasions over the past few years"* | Exchanges *"may review the Contingency Pool Trading facility to strengthen its framework"* | [verified] [S-IRRA] §§4, 5, 7 |
| **Multilocking / unlocking / ULC mapping** | Pre-provisioned alternate login paths for the same IDs; unlocking as the unplanned fallback | See §2(b). NSE frames these under *"**6. Business Continuity Provisions**"* and *"**7. Redundancy Options available to members in terms of User Id**"* | [verified] [N-UID] §§6, 7 |
| **Gateway Router** | Exchange-side session resilience: the GR allocates a gateway server per trading day. *"if the gateway has a failure during the day, the user will be allocated a new gateway server. This will be done **transparently for the user** by the gateway router server."* If a member is logged off, it must request a **new session key** (the old key is cleaned up and is unique per session); it is then directed to the **same** gateway already allocated for the day | [verified] [N-DC] Q6; [N-NNF] gateway-router section |
| **IRRA — DO NOT PUT THIS IN A 2026 RUNBOOK** | Investor Risk Reduction Access, introduced 30 Dec 2022, operational 1 Oct 2023, as an alternative trading access point on broker disruption | **Discontinued with immediate effect, in force from 7 May 2026.** Supersedes SEBI/HO/MIRSD/MIRSD-PoD-1/P/CIR/2022/177. SEBI records that *"the platform has not been accessed by the stock brokers"* and exchanges *"unanimously recommended"* discontinuation | [verified] [S-IRRA] §§1, 6, 7, 8, 11 |

SEBI's own stated reason for abolishing IRRA is a useful statement of the current expectation: brokers' *"operational resilience"* has been strengthened by *"facilitating seamless transitions between primary and alternate sites during periods of disruption and **emergence of independent cold sites for business continuity**"*, alongside BCP-DR operationalisation, CSCRF, M-SoC and the glitch framework. [verified] [S-IRRA] §§2–3. The phrase "independent cold sites" is SEBI's, and is the closest thing in any reviewed instrument to a statement of market practice — see §4.

### (e) Are there separate connectivity charges for a DR link?

**No separate "DR tariff" exists. A DR link is charged as an ordinary additional connectivity scenario — category ARC to the exchange, plus a per-activation processing fee, plus last-mile charges paid directly to the network provider (TNI).**

**NSE leased-line category charges — Annual Recovery Charges (ARC) payable to NSE, + taxes as applicable** [verified] [N-COST], page "Updated on: 10/08/2026":

| # | Category | Messages/sec | ARC (₹) — **Wednesdays & Thursdays** | ARC (₹) — **other days of the week** |
|---|---|---|---|---|
| 1 | A | 40 | 50,000 | 50,000 |
| 2 | B | 100 | 1,25,000 | 2,50,000 |
| 3 | C | 200 | 2,50,000 | 5,00,000 |
| 4 | D | 400 | 5,00,000 | 10,00,000 |
| 5 | E | 1,000 | 12,50,000 | 25,00,000 |
| 6 | F | 2,000 | 25,00,000 | 50,00,000 |
| 7 | G | 5,000 | 62,50,000 | 1,25,00,000 |
| 8 | H | 10,000 | 1,25,00,000 | 2,50,00,000 |
| 9 | **I** (Commodity Derivatives Segment only) | 120 | 2,000 | 2,000 |
| 10 | **O** (Market data broadcast) | NA | **Nil** | **Nil** |
| 11 | **S** (Connect2NSE: NOTIS, EXTRANET) | NA | 50,000 | 50,000 |

**Application Processing Fees collected by the Exchange (Leased Line)** [verified] [N-COST]:

| Scenario type | Codes | **Activation** | **Shifting / Surrender / Cancellation** |
|---|---|---|---|
| **Single Scenario** | A2, B1, C1, D1, E1, F1, G1, H1, I1, O1, S1 | **₹2,000 + taxes** | **₹1,000 + taxes** |
| **Dual Scenario** | A4, B2, C2, D2, E2, F2, G2, H2, I2, O2, S2 | **₹4,000 + taxes** | **₹2,000 + taxes** |

**Notes reproduced verbatim from [N-COST]** [verified]:
- *"The Message Rate Charges towards interactive message category scenarios and applicable processing fees shall be levied to members by the Exchange."*
- *"The regulation and management of telecom service providers and their rate card towards members last mile connectivity is handled by **TNI**."*
- *"Members/participants shall be required to pay the **last mile connectivity charges, annual recovery charges (service provider), router charges, one-time charges, installation charges, port charges etc. directly to TNI**."*
- *"The **ARC charges shall be levied proportionately** for period for which the category has been subscribed."*
- Service-provider ARC: *"As per Service Provider Rate Chart… **NSE/MSD/73957 dated April 29, 2026**"* — **[unknown]**, not retrieved.

| Question | Answer | Evidence |
|---|---|---|
| Separate DR-link tariff? | **No.** No DR-specific line item appears on NSE's costing page | [verified] by absence, [N-COST] |
| Two ways to buy a redundant link | (i) a **Dual Scenario** (two leased lines under one category code, e.g. B2); (ii) a **second Single Scenario** activated independently | [verified] [N-CONN]; [N-DC] Q8 Option 1 |
| Cheapest route to a second IP on the same line | **Parent–Child IP** (up to 9 child IPs per parent, non-colo). Does **not** add message capacity — *"Existing message rate and user limits as applicable according to scenario would remain"*; the member must bifurcate the subscribed rate across IPs/segments | [verified] [N-DC] Q10, Q11 |
| Does a DR link double your ARC? | **Depends on structure, not on the word "DR".** The ARC is per subscribed category; the processing fee is explicitly double for a Dual Scenario (₹4,000 vs ₹2,000). Whether a Dual Scenario attracts one or two category ARCs is **[unknown]** from the page text — confirm with NSE Membership before budgeting | [verified] fee split; ARC treatment [unknown] |
| **The Wednesday/Thursday split** | Not a DR matter but a major budget driver: for categories B–H the ARC for non-Wed/Thu days is **exactly 2× the Wed/Thu rate**. Category A, I, O, S are flat | [verified] [N-COST] |
| Colocation | **No child-IP concept** in NSE colocation; the costing page retrieved is captioned **"Connectivity Costing (Non-Colo)"**, so colocation pricing is **[unknown]** | [verified] [N-DC] Q11; [N-COST] caption |
| BSE and MCX DR/connectivity tariffs | **[unknown]** — not retrieved (MCX returned HTTP 403; BSE membership page carried no connectivity tariff) | — |

> **Budget line for the manual (analyst synthesis, each component [verified] individually).** A DR link costs: (NSE category ARC, proportionate to subscription period) + (₹2,000–₹4,000 activation processing fee) + (TNI last-mile: service-provider ARC + router + one-time + installation + port charges) + your own cross-site replication circuit, which is **not** an exchange product at all and is procured commercially.

### (f) What happens to in-flight orders and order state on failover? Is there an order-state recovery facility?

**Yes — NSE provides a full per-stream replay of the day's trader messages (Message Download). But the answer splits sharply by *whose* side failed, and there are two mechanisms that will silently destroy your order book if you have not planned for them.**

#### The recovery facility: Message Download

| Element | Detail | Evidence |
|---|---|---|
| Purpose | *"This request is used to download the messages intended for the trader from the trading system. When the trader makes a request for message download, **all the transactions of the trader and other important broadcasts are downloaded**."* | [verified] [N-NNF] "Message Download" |
| Request | **`DOWNLOAD_REQUEST` (7000)**, packet length 48 bytes: `MESSAGE_HEADER` (40) + `SequenceNumber` (DOUBLE, 8) | [verified] [N-NNF] Table 17 |
| `SequenceNumber` semantics | *"This contains the time last message was received by the workstation. This can be obtained from the **Time Stamp1** of the MESSAGE_HEADER. To retrieve the messages **from the beginning of the trading day**, this field should be set to **'0'** or the **Sequence Number received in the logon response message**."* | [verified] [N-NNF] Table 17 |
| **Per-stream, not global** | NSE's trading system is multiple matching engines ("streams"). Download is *"served through each individual stream"*; the request must be **sent individually per stream**, with the **stream number in the first byte of the 2-byte AlphaChar** of the header. Total stream count arrives in the first byte of AlphaChar of **`SYSTEM_INFORMATION_OUT` (1601)** at login; streams are numbered from 1. An invalid stream number ⇒ *"exchange will drop the request"* | [verified] [N-NNF] "Message Download Changes" |
| Incremental vs full | *"If the sequence number in the request is 0, then **all** messages for that stream will be sent. To get **incremental** download for any particular stream, the message download request must contain the **last sequence number received from that stream**."* | [verified] [N-NNF] |
| Recommendation | *"Message download request can be made for one or more streams. It is **recommended that the user requests download for all the streams**."* | [verified] [N-NNF] |
| Response envelope | **`HEADER_RECORD` (7011)** → **`MESSAGE_RECORD` (7021)** (80–512 bytes; outer header marks it as download data, inner header gives the data type) → **`TRAILER_RECORD` (7031)**. Stream number in the first AlphaChar byte of each | [verified] [N-NNF] Tables 17–18, transaction-code list |
| Stream number on live messages | Carried in the **`TimeStamp2`** field of the message header | [verified] [N-NNF] |
| Also replays outage notices | The Ch.11 outage broadcast *"Member can also receive this message through journal download"* | [verified] [N-NNF] Ch.11 |
| **Related: Update Local Database Download** | Downloads updated securities and participants; *"Any carried over **GTC or GTD orders** are also downloaded with this request. **As of now GTC and GTD facilities are not allowed** hence there will be no download for GTC and GTD orders."* (Capital Market segment) | [verified] [N-NNF] |
| **Drop Copy** as a parallel feed | NSE Drop Copy provides dedicated **Trade Only** and **Order & Trade** data over TCP/IP, with its own **Drop Copy Gateway Router**, subscription requests and an *"Order & Trade Drop copy Download sequence"* | [verified] NSE `DC_FO_Normal_DROPCOPY_PROTOCOL_3.0` (Sep 2026), ToC/§1 |

#### What actually happens to in-flight orders

| Scenario | Outcome | Evidence |
|---|---|---|
| **Exchange-side stream outage** | Ch.11 Exception Handling: (1) at start of outage, a broadcast carries `StreamNumber` + status **1**, and *"members may get disconnected"*; (2) ***"members should clear outstanding orders at their end for the respective streams. Exchange would also cancel all the outstanding orders and **no cancellation messages will be sent for these orders**"***; (3) on restore, broadcast with status **0**; (4) members may reconnect. Structure: **`MS_BCAST_CONT_MESSAGE` / `BCAST_CONT_MSG` (5294)**, 244 bytes | [verified] [N-NNF] Ch.11 |
| **TCP loss (your side, incl. site failure)** | *"If member system detects a loss of TCP connection with the exchange trading system, please perform the **same operations for starting a fresh login** given above."* No special DR path | [verified] [N-NNF] "Recovering from disconnections" |
| **Heartbeat failure** | Heartbeat (`23506`, 40 bytes) required after **30 seconds** of inactivity. Two consecutive missed heartbeats ⇒ socket disconnected. Excess heartbeats increment a **drop counter**; at the exchange's threshold *"the member connection will be disconnected… The exchange will also **logoff the box id** of the member, which means that **all the users linked to that box id will be disconnected**."* Drop counter resets per box ID after each disconnection | [verified] [N-NNF] heartbeat section |
| Connection terminated by exchange | **`BOX_SIGN_OFF` (20322)** / `MS_BOX_SIGN_OFF`, 42 bytes, carrying the `BoxId` and an error code | [verified] [N-NNF] |
| **Cancel On Logout (COL)** | *"This functionality **if enabled** provides facility to traders to **cancel all their outstanding orders when user logs off** from exchange trading system. COL functionality is **not available during preopen session and after CTS close** (for CAS eligible securities). **Corporate manager can enable/disable COL status** for the users within trading member's firm."* Set via **`COL_USER_STATUS_CHANGE_IN` (5790)** / `_OUT` (5791), with `ColoUserBit` = `0` disable / `1` enable, per user ID | [verified] [N-NNF] "Cancel On Logout (COL) Status" |
| **Kill Switch** | *"provides a facility to traders to cancel all of their orders at the same time"*, or all outstanding orders on a specified security. **Not allowed during preopen**; restricted after CTS close for CAS-eligible securities (`BC_CTS_CLOSE_FOR_CAS` 6651). Member-level and user-level variants exist | [verified] [N-NNF] Kill Switch, Member/User Level Kill Switch |
| Who can cancel whose orders | *"CM can cancel BM's and DL's order, but BM and DL cannot cancel CM's order. BM can cancel DL's order, but DL cannot cancel BM's order."* | [verified] [N-NNF] |
| **The cross-ID cancellation trap** | *"Orders placed via one NEAT-CTCL combination can be **modified/cancelled from the same NEAT ID or the Branch/Corporate manager with which the NEAT id is mapped**."* | [verified] [N-UID] §7 (12-digit NNF terminal ids row) |
| Day orders at EOD | *"At the end of the trading day, all outstanding Day orders are [cancelled]"* — Day is the default order term | [verified] [N-NNF] order-term section |
| IOC | Uncrossed IOC orders are cancelled by the system | [verified] [N-NNF] |

> **The three failover hazards, stated plainly.**
> 1. **An exchange-side stream outage silently voids your orders.** The exchange cancels them and sends **no** cancellation messages. A DR site that reconstructs its book purely from inbound confirmations will believe those orders are still live. You must act on `BCAST_CONT_MSG` (5294) status 1 by clearing your own book for that stream. [verified]
> 2. **COL can empty your book at the exact moment you fail over.** If COL is enabled on your user IDs, logging off the primary site cancels all outstanding orders. That may be precisely what you want (clean slate at DR) or precisely what you must avoid (positions you intended to manage). Decide the COL posture **per user ID, in the BCP, before the event** — Corporate Manager controls it via 5790. [verified]
> 3. **Failing over to different user IDs orphans your in-flight orders.** Orders placed through one NEAT-CTCL combination can be modified or cancelled only from that NEAT ID or its mapped Branch/Corporate Manager. If DR runs on a different ID set, pre-existing orders are not cancellable from DR except through the mapped manager hierarchy. This argues for **mapping DR IDs under the same Corporate Manager** and for Kill Switch (member-level) as the break-glass. [verified] facts; the mitigation design is analyst inference.
>
> **Net recovery design.** On DR bring-up: log in per stream → read `SYSTEM_INFORMATION_OUT` (1601) for the stream count → issue `DOWNLOAD_REQUEST` (7000) with `SequenceNumber` = 0 **for every stream** → rebuild the day's order and trade state from `MESSAGE_RECORD` (7021) to `TRAILER_RECORD` (7031) → reconcile against Drop Copy. Message Download is scoped to the **current trading day** only [verified by the "beginning of the trading day" wording]; it is **not** a substitute for your own persisted order store or for an RPO-15-minute replication design.

**BSE (ETI/EOBI) and MCX order-state recovery mechanics: [unknown].** Prior project research notes a BSE session-stage example as `[uncertain]`. Do not assume the NSE Message Download model transfers; BSE ETI and MCX have their own retransmission/session-recovery semantics that must be read from their current protocol specifications.

---

## 3. The exchange's own DR

### 3.1 The MII framework — and the clause that governs your failover design

[S-MII] (SEBI/HO/MRD1/DTCS/CIR/P/2021/33, 22 Mar 2021) supersedes SEBI/HO/MRD/DMS1/CIR/P/2019/43 of 26 Mar 2019. [verified] §10.

**The single most important clause for a broker**, verbatim [S-MII] §4(b):

> *"MIIs should develop systems that **do not require configuration changes at the end of trading members/ clearing members/ depository participants for switchover from the PDC to DRS**. Further, MIIs should test such switchover functionality by conducting **unannounced live trading from its DRS for at least 1 day in every six months**. Unannounced live trading from DRS of MIIs shall be done at a **short notice of 45 minutes** after 90 days from the date of this circular."*

[verified]. **An exchange moving to its own DR site must not require you to change configuration.** This is why your DR planning concerns *your* site, not the exchange's. In practice the exchange-side switchover reaches you as a disconnect-and-relogin event handled by the Gateway Router and Message Download (§2(f)), not as a new endpoint to configure.

| MII requirement | Detail | Evidence |
|---|---|---|
| Architecture | BCP + **DRS** + **Near Site (NS)** — *"Apart from DRS, all MIIs including Depositories shall also have a Near Site (NS) to ensure zero data loss"* | [verified] [S-MII] §3(a),(b) |
| Separation | Preferably different seismic zones; else **minimum 500 km** PDC↔DRS | [verified] [S-MII] §3(c) |
| Disaster declaration | *"within **30 minutes** of the incident, declare that incident as 'Disaster'"* | [verified] [S-MII] §4(c) |
| **RTO** | **45 minutes** from declaration (implemented within 90 days of the circular) | [verified] [S-MII] §4(c) |
| **RPO** | **15 minutes** | [verified] [S-MII] §4(d) |
| "Critical Systems" | Exchange/CC: **Trading, Risk Management, Collateral Management, Clearing and Settlement, Index computation**. Depository: systems supporting settlement process and inter-depository transfer system | [verified] [S-MII] §4(c) |
| One-to-one correspondence | Hardware, system software, application environment, network and security devices of DRS/NS and PDC | [verified] [S-MII] §4(a) |
| Solution architecture | *"high availability, fault tolerance, no single point of failure, zero data loss, and data and transaction integrity"* | [verified] [S-MII] §4(e) |
| Updates propagation | *"Any updates made at the PDC should be reflected at DRS/ NS **immediately (before end of day)** with head room flexibility without compromising any of the performance metrics"* | [verified] [S-MII] §4(f) |
| **Replication mode** | *"Replication between PDC and NS should be **synchronous** to ensure zero data loss whereas, the one between PDC and DRS and between NS and DRS **may be asynchronous**."* | [verified] [S-MII] §4(h) |
| Staffing | DRS/NS manpower must have the **same expertise** as PDC and be able to function at short notice **independently**; sufficient trained staff to run live operations from DRS *"without involving staff of the PDC"* | [verified] [S-MII] §3(d) |
| IRT/CMT | Chaired by **MD**, or **CTO** if MD unavailable; responsible for declaring disaster, invoking BCP, shifting PDC→DRS | [verified] [S-MII] §3(e) |
| Governance | **Technology Committee** reviews BCP-DR implementation **quarterly**; policy approved by Governing Board after Technology Committee vetting, then communicated to SEBI; policy reviewed **at least once in six months and after every occurrence of disaster** | [verified] [S-MII] §3(f), §6(b) |
| DRS leasing | If an MII leases DRS premises to others (incl. subsidiaries), **right of first use of all resources including network resources must remain with the MII**, with access controls restricting physical and logical access to critical systems | [verified] [S-MII] §6(c) |

### 3.2 Exchange-side drill and mock calendar

| Item | Requirement | Evidence |
|---|---|---|
| **DR drills** | **Quarterly.** For exchanges and CCs *"these drills should be closer to real life scenario (trading days) with **minimal notice to DRS staff** involved"* | [verified] [S-MII] §5(a) |
| PDC staff excluded | *"During the drills, the staff based at PDC should **not** be involved in supporting operations in any manner"* | [verified] [S-MII] §5(b) |
| Scope | *"running **all** operations from DRS for at least **1 full trading day**"* | [verified] [S-MII] §5(c) |
| Pre-drill artefact | *"Before DR drills, the **timing diagrams** clearly identifying resources at both ends (DRS as well as PDC) should be in place"* | [verified] [S-MII] §5(d) |
| **Live trading from DR site** | *"shall be scheduled for **at least two consecutive days in every six months**… organized on **normal working days** (i.e. **not on weekends / trading holidays**)"*, with DRS staff able to run it independently of PDC staff | [verified] [S-MII] §5(g) |
| **Unannounced live trading from DRS** | **≥1 day every six months**, at **45 minutes' notice** | [verified] [S-MII] §4(b) |
| **Intraday switchover in mocks** | *"Stock Exchanges, Clearing Corporations and Depositories shall include a scenario of **intraday shifting from PDC to DRS during the mock trading sessions** in order to demonstrate its preparedness to meet RTO/RPO"* | [verified] [S-MII] §5(h) |
| Reporting | Drill results and observations documented, placed before the **Governing Board**, then *"forwarded to **SEBI within a month** of the DR drill"* | [verified] [S-MII] §5(e) |
| MII system audit | Auditor must check the MII's preparedness to shift PDC→DRS **unannounced** and comment on documented drill results; §5(f) and §6(a)(v) expressly in system-audit scope | [verified] [S-MII] §5(f), §7 |
| Master circular location | DR-drill stipulations now sit at **paras 9.1.3.3 and 9.1.3.8** of the **Master Circular dated 30 Dec 2024 for Stock Exchanges and Clearing Corporations**, with *"Identical stipulations… in the Master Circular for Depositories and the Master Circular for Commodity Derivatives Segment"* | [verified] [S-CP26] §4.1.1 (the master circulars themselves: **[unknown]**, not retrieved) |

### 3.3 Must members participate?

| Question | Answer | Evidence |
|---|---|---|
| NSE's stated position | *"The Exchange gives utmost importance to periodical testing of trading infrastructure and its **recovery & response mechanisms**. Contingency Drills/ Mock Trading sessions are conducted by the Exchange for this purpose from time to time. **Large scale participation of members is quintessential for the success of such sessions.**"* | [verified] [N-CAL] |
| Why the calendar is published | *"In order to enable market participants to **plan and schedule their own contingency plans/testing**, the Exchange is hereby notifying the Contingency drills /Mock trading sessions calendar for the year 2026"* | [verified] [N-CAL] |
| Is "quintessential" a mandate? | **No** — it is exhortation, not an obligation clause. **[verified]** by the wording itself | [verified] [N-CAL] |
| But participation **is** compelled by other routes | SEBI's software-testing baseline requires monthly exchange mocks with algo-broker participation, with proprietary-trading suspension for ≥1 trading day where the exchange finds non-participation reasons unsatisfactory; MCX/CTCL/195/2026 (13 Apr 2026) requires all approved algos — enabled or not, changed or unchanged — to participate ≥1 hour monthly | **[likely]** — carried from prior project research (`RESEARCH_certification.md` §5.2), citing SEBI's testing circular and MCX/CTCL/195/2026; **not re-verified in this pass** |
| 2026 calendar dates by segment | **[unknown]** — the calendar table on [N-CAL] is populated client-side and did not render; no dates retrieved. Read the per-segment session notice, not the calendar, for actual timings | — |
| **A critical distinction** | An exchange Saturday mock run **from the exchange's DR site** does **not** discharge the member's own DR-drill obligation under [X-JOINT] §8.5 or [N-INSP] Ex.49. These are separate obligations on separate infrastructure | **[likely]** — the two obligations are textually independent ([X-JOINT] §8.5 is about the *member's* DRS; [S-MII] §5 is about the *MII's*); prior project research states this conclusion explicitly |
| QSB scheduling constraint | QSB drills *"shall not coincide with drills conducted by Exchange"* — so you cannot piggyback on the exchange calendar | [verified] [N-INSP] Ex.49 row 15 |

---

## 4. Active-active versus active-passive

### 4.1 Does any regulation express a preference?

**No. The terms do not appear.** A case-insensitive search for "active-active", "active-passive", "hot standby" and "warm standby" across all eight primary documents read in this pass — [X-JOINT], [N-COMP], [S-MII], [S-CSCRF], [N-AUD], [N-INSP] Ex.49, [S-CP26] and [N-UID] — returned **zero matches**. [verified] (negative finding, by exhaustive search of the retrieved texts).

What the instruments mandate instead is a set of **outcome properties**, which constrain the design without naming a topology:

| Mandated property | Text | Which topologies satisfy it |
|---|---|---|
| **One-to-one correspondence** | *"Hardware, system software, application environment, network and security devices and associated application environments of DRS and PDC shall have **one-to-one correspondence** between them."* | Rules out a thin/subset DR. Satisfied by active-passive with full kit [verified] [X-JOINT] §8.8 |
| **Standing capacity at both sites** | *"**Adequate resources shall be made available at all times** to handle operations at PDC **or** DRS."* | Rules out a cold site that is provisioned only on invocation [verified] [X-JOINT] §8.8 |
| **Immediate propagation** | *"**Any updates made at the PDC shall be reflected at DRS immediately.**"* (brokers — note: **no** "before end of day" softener, unlike the MII rule) | Pushes toward continuous replication, not nightly batch [verified] [X-JOINT] §8.10 |
| **No single point of failure** | *"the whole system shall ensure **high availability, right sizing, and no single point of failure**"* | Component-level redundancy at each site [verified] [X-JOINT] §8.10 |
| **Replication sized to RTO** | *"Replication architecture, bandwidth and load consideration between the DRS and PDC shall be **within stipulated RTO**"* | Bandwidth must be engineered, and evidenced [verified] [X-JOINT] §8.10 |
| **Network HA, audited** | *"Whether BCP / DR systems **and network connectivity** provide high availability and have no single point of failure"* | Dual links, dual IPs [verified] [N-AUD] ToR 11(c) |
| **All critical systems in HA mode** | *"Whether redundancy is built at all levels of infrastructure? Whether **all critical systems / infrastructure are in HA mode**?"* | [verified] [N-AUD] ToR 11(e) |
| MII-only, and the clearest signal in any instrument | *"Replication between PDC and **NS** should be **synchronous** to ensure zero data loss whereas, the one between PDC and DRS and between NS and DRS **may be asynchronous**."* | A three-tier **sync-near / async-far** model — i.e. explicitly **not** synchronous active-active across the long haul [verified] [S-MII] §4(h) |

**Interpretation (analyst, clearly flagged).** A 2-hour RTO with a 15-minute RPO and "immediately reflected" updates is comfortably met by a well-run **active-passive (warm standby) with continuous asynchronous replication**. Nothing requires active-active, and [S-MII] §4(h) shows the regulator's own architecture of choice for the long-haul leg is **asynchronous**. Conversely, the 250 km minimum separation makes synchronous replication across the two sites impractical on latency grounds — so the regulation's distance rule and an active-active synchronous design are in tension. This inference is mine; **no instrument read states it.**

### 4.2 What is market practice?

**Largely [unknown] from primary sources — and this research deliberately does not guess.** Two defensible data points exist:

| Data point | What it says | Status |
|---|---|---|
| **SEBI's own characterisation of broker practice** | Among the reasons for abolishing IRRA, SEBI records that brokers' innovations have *"strengthened the operational resilience of Stock brokers by **facilitating seamless transitions between primary and alternate sites** during periods of disruption and **emergence of independent cold sites for business continuity** etc."* | [verified] [S-IRRA] §3. Note SEBI uses **"cold sites"** — i.e. the regulator's own description of prevailing practice is *not* active-active |
| **The NSE identifier regime forecloses true active-active across cities for NEAT** | NEAT and NEAT-converted IDs may be multilocked only within the **same dealing office**, and the ULC undertaking fixes their servers to the **same office address**; only **NON-NEAT** IDs may be multilocked and ULC-mapped **across cities**. Algo-tagged users are a further exception | [verified] [N-UID] §5(g), §6.1(e), undertaking cls. 3–4 |
| Whether named brokers run active-active | **[unknown]** — no primary source surveyed. Do not state a market-share or prevalence claim in the manual | — |

> **Practical conclusion for a greenfield broker (analyst recommendation).** Build **NNF/Non-NEAT end to end**, so that cross-city ULC mapping and multilocking are available to you at all. Run **active-passive with continuous replication** as the compliance baseline, and use **dual leased lines plus parent/child IPs** to get active-active *connectivity* (which the identifier rules do permit, and which ToR 11(c)/11(d) effectively require) even while the *application* tier remains active-passive. Separating "active-active network" from "active-active application" is the key to meeting ToR 11(c) without a synchronous cross-site database.

---

## 5. Data replication expectations, demonstrating the RPO, and auditor evidence

### 5.1 Replication expectations

| Requirement | Applies to | Text / detail | Evidence |
|---|---|---|---|
| Immediate reflection of updates | Brokers | *"Any updates made at the PDC shall be reflected at DRS **immediately**."* | [verified] [X-JOINT] §8.10; [N-COMP] §33.8(j) |
| Replication sized to RTO | Brokers | *"Replication architecture, bandwidth and load consideration between the DRS and PDC shall be **within stipulated RTO**"*, with HA, right sizing and no SPOF | [verified] [X-JOINT] §8.10 |
| Inter-site accessibility | Brokers | *"The DR site shall be made accessible from primary data centre to ensure **syncing of data across two sites**."* | [verified] [X-JOINT] §8.4 |
| Software/config parity at DR | Brokers | Primary and DR must carry corresponding software/configuration; production updates must be reflected at DR | **[likely]** — [verified] §§8.8/8.10 establish hardware/software/application-environment correspondence and immediate update propagation; the narrower "deployed software version parity" framing is carried from prior project research (`RESEARCH_certification.md`, citing §§8.8–8.10) |
| **Patch parity, with clocks** | All REs | *"patches are implemented at **both PDC and DR site**"* within: **High = 1 week**, **Moderate = 2 weeks**, **Low = 1 month**; emergency patching per OEM timelines. Patch-compliance tracking reported to the IT Committee **quarterly** | [verified] [S-CSCRF] patch-management guideline, items 10–11 |
| Backup siting | All REs | Backup of **data as well as server images**; *"maintained at **off-site locations** to keep backup copies intact and unbroken"*; plan approved by the IT Committee | [verified] [S-CSCRF] RC.RP.S4(1)-(3) |
| Offline backups | **MIIs and Qualified REs** | *"maintain **offline, encrypted** backups of data and shall regularly test these backups **at least on a quarterly basis**"* | [verified] [S-CSCRF] RC.RP.S4(5) |
| Backup restore testing | All REs | *"REs shall periodically conduct backup testing and **restore back-up data to check its usability**"* | [verified] [S-CSCRF] RC.RP.S2(3) |
| RTO/RPO written into the plan | All REs | *"RTO and RPO, as prescribed by SEBI from time to time, shall be **included in the recovery plan** for the restoration of systems after cybersecurity incidents"*; and *"RTO and RPO, as specified by SEBI, shall be **mandated while executing**"* recovery | [verified] [S-CSCRF] RC.RP.S4(4), RS/RC guidelines |
| RTO across dependencies | All REs | *"RE's RTO shall be met for **all interconnected systems and networks** through capacity upgradations and **periodic coordinated resilience testing**"* | [verified] [S-CSCRF] RC.IM.S2(1) |
| Recovery plan improvement | All REs | *"Recovery plan shall be improved after analysing the learnings from periodic drills."* | [verified] [S-CSCRF] RC.IM.S2(2) |
| MII replication mode | MIIs | PDC↔NS **synchronous** (zero data loss); PDC↔DRS and NS↔DRS **may be asynchronous** | [verified] [S-MII] §4(h) |
| Broker synchronous/asynchronous choice | Brokers | **[unknown]** — no broker instrument read specifies the mode. §8.10's "immediately" plus a 15-minute RPO is the only constraint | [verified] by absence |

### 5.2 How the RPO is demonstrated

There is **no prescribed RPO measurement methodology** in any instrument read. **[unknown].** What *is* prescribed is a chain of evidence from which an RPO claim must be supportable:

| Evidence vehicle | What it must show | Evidence |
|---|---|---|
| **Documented drill learning, naming RTO and RPO** | *"The system auditor shall verify whether **learning of DR drill has been documented including RTO and RPO**?"* | [verified] [N-AUD] ToR 11(a) |
| **Self-reported recovery time on a real event** | Preliminary Incident Report item 8: *"Did you move operations to the Disaster Recover (DR) site? If, Yes, **what was the Recovery Time**?"* | [verified] [X-JOINT] Annexure B item 2(8) |
| **RCA recovery timestamps** | RCA Annexure C requires **date and time of incident**, **date and time of recovery**, and **duration of the incident** | [verified] [X-JOINT] Annexure C items 3–4 |
| **Backup currency at incident time** | CSCRF containment checklist asks: *"**Is the latest data backup (as per prescribed RPO) available?**"* | [verified] [S-CSCRF] incident containment checklist |
| **Scenario-based validation** | Cyber resilience testing *"to validate their ability to recover and resume operations following a cybersecurity incident/ attack **within prescribed RTO and RPO defined by SEBI**"* | [verified] [S-CSCRF] RC.RP.S2(2) |
| Golden images | Containment checklist: *"Have the 'golden' server images and data been identified?"* | [verified] [S-CSCRF] |

> **Recommended demonstration pack (analyst design — no template is prescribed).** For each drill and each real event, capture: (1) replication lag telemetry sampled at ≤5-minute intervals, with the maximum observed lag over the period; (2) the last committed transaction at PDC and the first recovered transaction at DRS, with a reconciliation of the gap and a count of records requiring re-entry; (3) exchange-side truth from `DOWNLOAD_REQUEST` (7000) replay and Drop Copy, reconciled against your own order/trade store; (4) wall-clock timestamps for incident, declaration, switchover start, first order accepted at DR, and full-operations resumption; (5) failback timestamps. Items (1)–(2) are what substantiate an RPO claim; item (3) is what substantiates that no client order was lost. This is implementation guidance, **not** a regulatory template.

### 5.3 What the auditor actually tests — NSE System Audit ToR §11, verbatim scope

§11 is captioned *"BCP/DR (**Only applicable for Stockbrokers having BCP / DR site**)"*. All sub-clauses below are marked applicable to **Type I/II and Type III** audits. [verified] [N-AUD].

| Clause | What the auditor checks | Notable wording |
|---|---|---|
| **11(a)** | Applicability (*"'Specified Members' **and** Members with a minimum client base of 50,000 clients"*); documented BCP/DR policy and plan; auditor comments on documented incident-response procedures and on drill observations; **whether Specified Members conducted half-yearly DR drills/live trading**; **whether all clients were shifted to the DR site during the drill**; all operations from DR for **≥1 full trading day**; **whether drill learning is documented including RTO and RPO** | Cites **NSE/COMP/54876 dated 16 Dec 2022** — a **stale cross-reference** (see §8) |
| **11(b)** | **Alternate channel of communication** to clients in case of disaster, and whether that channel can **authenticate the user** via additional details or **OTP** | Authentication on the fallback channel is an explicit test |
| **11(c)** | **High Availability** of BCP/DR systems **and network connectivity**; **no single point of failure** for critical operations identified by the policy | — |
| **11(d)** | **Connectivity with other FMIs** — *"whether there is an alternative medium to communicate with Stock Exchanges and other FMIs"* | The DR-connectivity test (§2(a)) |
| **11(e)** | Documented BC/DR/IR process commensurate with size and risk profile; documentation exists; **"If a BCP/DRP plan exists, has it been tested on regular basis?"**; documented risk assessments; **emergency Call List** maintained; **redundancy at all levels**; **all critical systems/infrastructure in HA mode** | — |
| **11(f)** | SIEM: documented process; log-based incident identification across OS, databases, network devices; events detected/classified/investigated/resolved; periodic reports; **logging facilities and log information protected from tampering and unauthorized access** | — |
| **11(g)** | A **dedicated Incident Response Team** for risk and compliance activities | — |
| **11(h)** | **Does the organization have a Disaster Recovery Site?**; documented risk assessments; emergency Call List; robust systems/technical infrastructure to provide essential facilities, perform systemically critical functions and give seamless service | — |
| **11(i)** | Incident-response procedures covering: **(a)** identification of all critical operations **and the process of informing clients of any disruption**, with sufficient review of potential risks and business impact; **(b)** declaration of incident as "Disaster" (timelines etc.) and restoration from DR upon declaration, with **adequate resources (appropriately trained and experienced) available at the DR Site**; **(c)** *"The declaration of disaster shall be reported in the preliminary report submitted to the Exchange."* | (c) is the failover-disclosure duty |
| **11(j)** | **Distinct primary and DR sites for technology infrastructure, workspace for people, and operational processes**; DRS *"sufficiently away (**not less than 250 km**)"* from PDC; provision for **alternate physical location of employees**; books-and-records backup and recovery (**hard copy and electronic**); all mission-critical systems identified with backup provision | "Workspace for people" — DR is not only a data centre |
| Related, outside §11 | **Primary Site Unavailability** and **Disaster Recovery** items under the premises section: alternate physical employee location; books/records backup and recovery; mission-critical system identification. **§12** requires segregation of data and processing facilities, incl. where a TM has more than one broking entity in the group or common promoters | [verified] [N-AUD] |
| Governance review | Board-approved BCP-DR policy; **annual** review plus **ad-hoc review on any major change in critical systems or any technical glitch encountered**; **quarterly** Governing Board review of implementation; **periodic training programs** for employees, outsourced staff and vendors | [verified] [X-JOINT] §§8.11, 8.13; [N-COMP] §33.8(k),(m) |
| Auditor's DR mandate | *"The System Auditor, while covering the BCP – DR as a part of mandated annual System Audit, shall check the **preparedness of the Member to shift its operations from PDC to DRS** and comment on **documented results and observations on DR drills** conducted by the Members."* | [verified] [X-JOINT] §8.14 |
| Outsourcing/vendor DR | Third-party contracts must specify the third party's responsibilities for **IT security and contingency plans, insurance cover, business continuity and disaster recovery plans, force majeure**; the intermediary **and its third parties** shall establish and maintain contingency plans *"including a plan for disaster recovery and **periodic testing of backup facilities**"*; **separate contingency plans per outsourcing arrangement**; coordination of contingency plans at both ends; and plans for **non-performance by the third party** | [verified] [N-INSP] outsourcing section §§6, 6.1–6.3 |

---

## 6. What must be demonstrated in a drill, and the reporting afterwards

### 6.1 Drill content

| Must demonstrate | Source text | Evidence |
|---|---|---|
| **All operations from DRS for ≥1 full trading day** | [X-JOINT] §8.5 / [N-INSP] Ex.49 | [verified] |
| **All clients shifted to the DR site** | Auditor must verify *"whether **all the clients were shifted** to the DR site during the drill"* | [verified] [N-AUD] ToR 11(a) |
| Client-percentage phase-in for newly in-scope members | 30% → 60% → 100%, each ≥1 full trading day, by quarter | [verified] [X-JOINT] §8.6 |
| **Independent decision and invocation** | Responsible teams for the shift decision, resourcing at DR, and the mechanism to make DR operational from PDC (§8.7); for Specified Members, an **IRT/CMT chaired by MD (or CTO)** that actually declares the disaster and invokes BCP (§8.15) | [verified] [X-JOINT] §§8.7, 8.15 |
| **PDC/DRS one-to-one correspondence** across hardware, system software, application environment, network and security devices, with adequate resources at all times | §8.8 | [verified] |
| **Recovery within RTO/RPO**, documented | §8.9; ToR 11(a) *"including RTO and RPO"* | [verified] |
| **Replication, bandwidth and load within RTO**; HA, right sizing, no SPOF; immediate update propagation | §8.10 | [verified] |
| **Alternate client communication channel**, with authentication (OTP/additional details) — and for QSBs, **within 60 minutes of disruption** | ToR 11(b); Ex.49 row 15 | [verified] |
| **Alternative medium to communicate with exchanges and other FMIs** | ToR 11(d) | [verified] |
| **Failback to primary** | QSB: *"ensure smooth failback to Primary Site after the disaster and ensure all associated issues are resolved and business operations are back to source"* | [verified] [N-INSP] Ex.49 row 15 |
| **Staffing and workspace at DR** | Adequate, appropriately trained and experienced resources at the DR site (ToR 11(i)(b)); distinct DR workspace for people (ToR 11(j)) | [verified] |
| Cyber-scenario variant | CSCRF: scenario-based resilience testing incl. a recommended **ransomware scenario where both PDC and DRS are impacted**, assessing *"people, processes and technologies"* | [verified] [S-CSCRF] |
| Not satisfied by attending an exchange mock | The member's own DR live-trading drill is a separate obligation; QSB drills must **not coincide** with exchange drills | **[likely]** / [verified] respectively — see §3.3 |

### 6.2 Reporting after the drill

| Report | Recipient | Clock | Evidence |
|---|---|---|---|
| **Details and observations of BCP drills** | Exchange | **30 days from end of quarter** | [verified] [N-INSP] **Exhibit 53 item 23** (ref. NSE/INSP/56927 Annexure A, 8.5.10–8.5.13); restated in Ex.49 row 15 col. G |
| **BCP Policy and SOP** | Exchange | **45 days from the end of half year** | [verified] [N-INSP] **Exhibit 53 item 22**; Ex.49 row 15 col. G |
| **Signed and dated Minutes of Board Meeting** at which BCP-DR policy implementation was placed before the Board | Exchange | **45 days from end of quarter** | [verified] [N-INSP] **Exhibit 53 item 24**; Ex.49 row 15 col. G |
| Details and observations of **Cybersecurity** drills and awareness trainings | Exchange | **45 days from end of quarter** | [verified] [N-INSP] Exhibit 53 item 21 |
| Minutes of **Cybersecurity/Technology Committee** meetings incl. cybersecurity framework, details of cybersecurity drills, trainings | Exchange | **45 days from the end of half year** | [verified] [N-INSP] Exhibit 53 item 20 |
| CISO particulars (name, designation, qualification, experience, expertise) and count of security analysts | Exchange | **30 days from the end of financial year** | [verified] [N-INSP] Exhibit 53 item 19 |
| Cyber resilience testing **lessons learned** | **SEBI** | **within 3 months** from the end of the relevant testing period; status of observations monitored and tracked by the IT Committee; results placed before the IT Committee | [verified] [S-CSCRF] RC.RP.S2(5) |
| **Whether these three Exhibit-53 rows are QSB-only or apply to every member** | — | **[uncertain]** — Exhibit 53 is captioned *"Common Submission among Exchanges"* and the BCP rows are referenced to the QSB-provision numbers (8.5.10–8.5.13), which suggests the QSB population. **Confirm scope with the exchange.** | — |
| A universal post-drill filing form/deadline for **non-QSB** members across NSE+BSE+MCX | — | **[unknown]** — none found. §8.14 requires documented results and auditor review, but no filing form | [verified] by absence |
| MII equivalent (for contrast) | Governing Board, then **SEBI within a month of the DR drill** | — | [verified] [S-MII] §5(e) |

---

## 7. 2025–2026 changes

### 7.1 The January 2026 technical-glitch framework — DR provisions

| Item | Detail | Evidence |
|---|---|---|
| Instrument | **SEBI/HO/38/44/12(1)2026-MIRSD-TPD1, 9 January 2026** — "Review of Framework to address the 'Technical Glitches' in Stock Brokers' Electronic Trading Systems" | [verified] [S-GLITCH]; recited in [X-JOINT] |
| **Supersession** | *"This circular shall supersede earlier SEBI circular no **SEBI/HO/MIRSD/TPD-1/P/CIR/2022/160 dated November 25, 2022**."* | [verified] [S-GLITCH] §14 |
| Exchange adoption | Exchanges *"have jointly framed detailed guidelines"* as **Annexure-1**, covering definition, applicability, capacity planning, software testing & change management, **BCP & DRS**, and monitoring; issued e.g. as **MCX/TECH/015/2026, 9 Jan 2026** | [verified] [X-JOINT] |
| **The DR mandate SEBI gave the exchanges**, verbatim §11.1 | *"Stock Exchanges shall review the current guidelines for the applicability of the BCP and DRS. The current guidelines shall be **rationalised based on the size of the stock brokers & their technology dependency** ensuring the following: **i** BCP and DRS shall **not be applicable to small size stock brokers**. **ii** Setting up of DR site in **different seismic zones**. **iii** **Frequency of DR drill and trading from DR site**. **iv** Defining **Recovery Time Objective (RTO) and Recovery Point Objective (RPO)** and defining the term **"Disaster"** for the implementation of the DR. **v** Requirement for the **coverage of BCP-DR during the System Audit and ISO certification** requirements."* | [verified] [S-GLITCH] §11 |
| Rationalisation rationale | §3.4: *"Rationalised and cost effective based technology requirements: The requirements for the **capacity planning, software testing and DR drill** have been rationalised based on the size of the stock brokers & their technology dependency."* | [verified] [S-GLITCH] §3.4 |
| Reporting simplification | §3.3: glitch reporting extended **one hour → two hours**; trading holidays considered; reporting consolidated *"from reporting to all the exchanges to a **single reporting platform** (i.e. Common Reporting Platform)"* | [verified] [S-GLITCH] §3.3 |
| Disincentive rationalisation | §3.5 and §12: structure rationalised for exemptions, **type of glitch (major or minor)** and frequency | [verified] [S-GLITCH] §§3.5, 12 |
| Public disclosure of glitches | §13: *"Stock exchanges shall **disseminate on their websites the instances of technical glitches** occurred in the trading system of stock brokers."* | [verified] [S-GLITCH] §13 |
| Glitch definition (for completeness) | Malfunction in hardware, software, networks/bandwidth, processes, products or services, **including systems outsourced from third parties**, directly or indirectly related to trading and risk management, during a trading session, leading to stoppage/slowdown/variance in functions such as **log-in, order placement (incl. modification, cancellation, execution, confirmation, status), allocation and viewing of margin/collateral/funds**, for a **contiguous period of five minutes or more** | [verified] [S-GLITCH] §5.1 |
| Exclusions | Global cloud/technology disruptions or widespread technical disruption; **technology disruption due to technical issues at MII**; KYC/new-account processing glitches; back-office issues not impacting trading/settlement; payment-gateway failures caused at banks, service providers or payment aggregators; issues in **decision-support tools** (technical charts, P&L statements, back-office reports) | [verified] [S-GLITCH] §5.2 |
| Disincentive exemptions | Not applicable where a glitch *"occurred one of two modes of trading (i.e either in the mobile-based trading application or in the web-based trading application) while other mode of the trading is functioning in proper manner"*, or where the glitch *"is minor in nature or has a minor impact"* | [verified] [S-GLITCH] §5.3 |
| Monitoring | **LAMA** (API-based Logging and Monitoring Mechanism) continues; exchanges to review applicability, key monitoring parameters and log preservation. Glitch logs and data retained **2 years** | [verified] [S-GLITCH] §10; [X-JOINT] §7.2 |
| **Net DR effect** | The **substance** of the DR regime (50,000 clients, 45-minute disaster, 250 km, RTO 2h, RPO 15 min, half-yearly Specified-Member drill, phase-in, ISO 27001 in 2 years) is carried in the **joint exchange Annexure-1 §8**, not in SEBI's circular text. SEBI's circular sets the *mandate*; the exchanges set the *numbers* | [verified] by comparing [S-GLITCH] §11 with [X-JOINT] §8 |

### 7.2 Other 2025–2026 changes affecting DR

| Date | Change | DR relevance | Evidence |
|---|---|---|---|
| **7 May 2026** | **IRRA discontinued with immediate effect** (SEBI HO/38/44/12(3)2025-MIRSD-TPD1/I/10705/2026), superseding SEBI/HO/MIRSD/MIRSD-PoD-1/P/CIR/2022/177 of 30 Dec 2022. SEBI records the platform *"has not been accessed by the stock brokers"* | **Remove IRRA from every runbook.** The exchange-side fallback is now **Contingency Pool Trading**; exchanges *"may review"* and strengthen it | [verified] [S-IRRA] |
| **22 Apr 2026** | NSE System Audit ToR reissued (**NSE/INSP/73850**, Ref. 20/2026) | §11 BCP/DR is the operative audit checklist; applies to Type I/II **and** Type III | [verified] [N-AUD] |
| **29–30 Apr 2026** | NSE consolidated masters reissued: **MSD/73956** (User id), **COMP/73981** (Membership Compliance, §33.8–33.9), **INSP/73976** (Inspection, Exhibits 48/49/50/53), **INVG/73992** (NNF/software registration) | Current operational baseline for identifiers, DR provisions, QSB obligations and reporting | [verified] |
| **10 Aug 2026** | NSE Connectivity Costing page and Connectivity Options sheet current as published | Connectivity budget basis; references service-provider rate chart **NSE/MSD/73957, 29 Apr 2026** | [verified] [N-COST], [N-CONN] |
| **24 Aug 2026** | **SEBI IT Resilience Index (ITRI) for MIIs** — HO/47/18/11(1)2026-MRD-TPD1/I/19509/2026 | **MII** measure, not a broker return. Monitor for downstream connectivity/BCP effects. Contents **[unknown]** — body not retrieved | [verified] circular number/date; substance [unknown] |
| **15 Sep 2026** | **SEBI Consultation Paper — Measures to Strengthen BCP and DR of MIIs**; comments closed **5 Oct 2026** | **Proposal only. As at 2026-10-15 no final instrument was established.** See §7.3 | [verified] [S-CP26] |
| **30 Sep 2026** | NSE Trimmed NNF Protocol CM **v6.7** current | Message Download, Ch.11 exception handling, COL, kill switch | [verified] [N-NNF] |
| 2026 | **SEBI (Stock Brokers) Regulations, 2026** in force — the IRRA circular is issued under *"Section 11(1) of the SEBI Act 1992 and **Regulation 50 of SEBI (Stock Brokers) Regulations 2026**"*; NSE's inspection master records deletions *"with reference to **Regulation 19** of Stock Broker Regulation 2026"* | Regulatory base has changed; check that DR/BCP policy cites the 2026 Regulations | [verified] [S-IRRA] §9; [N-INSP] fn.26 |
| Carried from prior project research, **not re-verified here** | MCX/CTCL/195/2026 (13 Apr 2026) monthly algo mock participation; NSE/INVG/76131 vendor STQC (2 Sep 2026, existing-version certificate deadline 28 Feb 2027); SEBI retail-algo framework applicable to all brokers from 1 Apr 2026 | Peripheral to DR but affects drill/mock planning | **[likely]** — `RESEARCH_certification.md` / `RESEARCH_2026_changes.md` |

### 7.3 What the September 2026 MII consultation proposes (proposal, not law)

Objectives: *"(a) Shortening time for conducting mock DR drills; (b) Strengthening operational resilience at primary site of MIIs, and; (c) Strengthening data recovery for Stock Exchanges."* [verified] [S-CP26] §1.1.

| Proposal | Detail | Evidence |
|---|---|---|
| **Replace "1 full trading day"** | *"DR drill would involve initiating operations at PDC and **switching over operations to DRS during a non-working day**"*; *"Overall session time for DR drill should be **at least 4 hours** including the switchover time from PDC to DRS"* | [verified] [S-CP26] §4.1.3.1–4.1.3.2 |
| Why | Commodity-derivatives trading days run to **11:55 PM**, making whole-market-hours drills *"cumbersome for market participants as well as MIIs"* | [verified] [S-CP26] §4.1.2 |
| Load realism | MIIs to *"cover all the scenarios of market operations during the DR drill and **simulate real life load / participation close to the actual load**"* | [verified] [S-CP26] §4.1.3.3 |
| Scenario governance | Switchover scenarios to be tested per architecture and line of business, with the list *"reviewed by the **Standing Committee on Technology (SCOT)**"* | [verified] [S-CP26] §4.1.3.4 |
| **Fault-tolerance testing** | MIIs to *"regularly test the **fault tolerance** of their PDC / DRS to satisfy themselves that if a component / switch / server / etc. fails, the **redundant component … automatically takes over** operations"*; plus stress/mock testing of **masters, table sizes and non-transactional components**, not only transaction volumes and orders/sec | [verified] [S-CP26] §4.2.1.1 |
| Boundary conditions | Proactively identify, document and monitor **all boundary conditions and upper limits** (database, configuration, table size, counter limits) before breach | [verified] [S-CP26] §4.2.1.2 |
| Error logging | Adequate application/component-level error logging **plus a ready reckoner for interpreting such errors** | [verified] [S-CP26] §4.2.1.3 |
| **Configuration-drift testing** | *"periodic tests / alerts verifying component / application level controls / configurations pertaining to IT systems of **PDC, Near Site (NS) and DRS** to ensure that there is **no drift** in the configuration / settings at individual component level"* | [verified] [S-CP26] §4.2.1.4 |
| **Recover trade data from the CC** | Existing protocol recovers trade data from NS or DRS, but *"It may be possible that the disruption scenario impacted replication at NS or DRS"*; since *"The connectivity arrangement between a Stock Exchange and a Clearing Corporation (CC) is different from the link connectivity of a stock exchange with its NS / DRS"*, exchanges shall *"put in place a framework to **recover the lost data from the CCs** in case of disruption"*, with SOPs | [verified] [S-CP26] §4.3.1 |
| **Status** | **Consultation only.** Comments closed 5 Oct 2026. **No final circular established as at 2026-10-15** — **[unknown]** | [verified] [S-CP26] §5.1 |
| Broker read-across | **None directly** — these are MII obligations. But §4.2.1.1 (automatic redundant takeover) and §4.2.1.4 (no configuration drift between sites) are exactly what broker ToR 11(c) and §8.8 already imply, and are a strong signal of the direction of travel for broker audits | analyst inference, flagged |

---

## 8. Gaps and cautions

### 8.1 Hard conflicts and defects in the source material — read these before writing the manual

1. **30 minutes vs 45 minutes for declaring a Disaster.** CSCRF RC.RP.S2 (All REs, Mandatory) says declare **within 30 minutes of the incident**; the joint exchange guidelines §8.3 define a Disaster as a **45-minute** disruption. RTO (2h) and RPO (15 min) agree. **No instrument read reconciles them.** Write the SOP to 30 minutes and obtain written confirmation from each exchange. [verified] both texts; the conflict is real, not an artefact.
2. **§8.12 does not exist.** The joint exchange guidelines jump from **§8.11 to §8.13** — a grep for "8.12" across the full text returns **zero** matches. Do not cite a §8.12, and do not assume a clause is missing from your copy. [verified].
3. **The April 2026 System Audit ToR cites a superseded circular.** ToR 11(a) grounds the BCP/DR obligation in *"circular **NSE/COMP/54876 dated December 16, 2022**"* — i.e. the pre-revision instrument — even though the **9 Jan 2026** framework superseded SEBI's Nov 2022 circular. The *substance* (50,000 clients, half-yearly drill, 250 km) matches the current rules, so this is almost certainly a stale cross-reference rather than a live divergence, but **flag it to your auditor** rather than letting them audit to the 2022 text. [verified] both the ToR citation and the supersession.
4. **"Specified Members" sits under a LAMA caption.** [N-COMP] §33.9 is headed *"Identification of Specified Members for Implementation of **Logging and Monitoring Mechanism (LAMA)**"*, yet the same designation drives the §33.8(e) DR drill duty and the Annexure-A penalty columns. Treat the list as one population serving both purposes, and confirm. [verified] headings.
5. **The published Specified Members list may be stale.** The Apr-2026 master reproduces a list sourced to **NSE/COMP/66369 dated 29 Jan 2025**, while §9 requires publication *"at the beginning of every financial year"*. Whether an FY2026-27 list has issued is **[unknown]**.
6. **The §8.6 phase-in does not say which population it applies to.** It is triggered by *"any new member [falling] under the purview of Technical glitch framework"* — i.e. the **10,000**-client trigger — yet it prescribes drills from a DRS whose existence is mandated only at **50,000** clients, and the half-yearly cadence is stated only for Specified Members. The interaction is genuinely ambiguous. **[uncertain]** — do not apply it mechanically to every broker crossing 10,000 clients; get it confirmed.
7. **No stated own-DR drill frequency for a non-Specified, non-QSB broker above 50,000 clients.** It must *have* the DR setup (§8.1) and the auditor must assess shift-preparedness (§8.14), but no cadence is prescribed and Annexure-A B(vi) is **"NA"** for this band. **[unknown]** — set an internal policy (and say in the manual that it is internal policy, not regulation).

### 8.2 Not established — do not assert

| Gap | Status | How to close it |
|---|---|---|
| **BSE and MCX identifier, registration and location rules** for DR sites (the analogue of NSE's NEAT-vs-NON-NEAT / ULC / multilocking regime) | **[unknown]** — MCX pages returned HTTP 403; BSE membership page carried nothing relevant | Obtain BSE's current member user-ID/connectivity master and MCX/CTCL/256/2026 (30 Apr 2026, identified as controlling in prior project research) |
| **BSE (ETI/EOBI) and MCX order-state recovery and session-resumption mechanics** | **[unknown]** — the NSE Message Download model must **not** be assumed to transfer | Read current BSE ETI and MCX protocol specifications; look specifically for retransmission, sequence-number recovery and any cancel-on-disconnect behaviour |
| **BSE and MCX connectivity tariffs**, and whether either prices a DR link differently | **[unknown]** | Exchange membership/technology departments |
| **NSE colocation connectivity pricing** | **[unknown]** — the retrieved page is captioned *"Connectivity Costing (**Non-Colo**)"* | NSE colocation tariff schedule |
| **Whether a Dual Scenario attracts one or two category ARCs** | **[unknown]** — only the processing fee is explicitly doubled (₹4,000 vs ₹2,000) | NSE Membership, in writing, before budgeting |
| **NSE/MSD/73957, 29 Apr 2026** — service-provider connectivity rate chart (last-mile, router, port, installation) | **[unknown]** — referenced on [N-COST], not retrieved | NSE circular archive |
| **Which regulatory submission carries "Location of BCP/DR site"** to NSE | **[unknown]** — the inspection master says only *"sourced through other regulatory submissions"* | NSE Inspection/Membership; confirm the form and its update cadence when you commission or move a DR site |
| **The 2026 contingency drill / mock calendar dates by segment** | **[unknown]** — table is client-side rendered and did not load | [N-CAL] in a browser, plus each segment's session notice (the notice, not the calendar, is controlling) |
| **SEBI/HO/MRD/TPD/P/CIR/2024/119 (12 Sep 2024)** — modifications to MII BCP/DR; **SEBI Master Circular for Stock Exchanges and CCs dated 30 Dec 2024** (paras 9.1.3.3, 9.1.3.8); **SEBI ITRI circular body (24 Aug 2026)** | **[unknown]** — metadata only. The 2024 modification circular **may have changed the 2021 MII numbers quoted in §3** | Retrieve all three before relying on §3's MII figures as current |
| **Any final instrument arising from the 15 Sep 2026 MII consultation** | **[unknown]** — comments closed 5 Oct 2026; nothing final established as at 2026-10-15 | Monitor SEBI circulars |
| **Scope of Exhibit 53 BCP rows** (items 22/23/24) — QSB-only or all members | **[uncertain]** — caption says "Common Submission among Exchanges" but references are to QSB provisions 8.5.10–8.5.13 | NSE Inspection |
| **BSE/MCX portal implementation** of the equivalent QSB/BCP submissions | **[unknown]** | Each exchange's compliance portal |
| **Broker synchronous vs asynchronous replication** — any mandated mode | **[unknown]** (**[verified]** by absence). Only "immediately" + RPO 15 min constrain it | — |
| **Market practice on active-active vs active-passive** among Indian brokers | **[unknown]**. The only regulator-sourced characterisation is SEBI's reference to *"emergence of independent **cold sites**"* [verified] [S-IRRA] §3 | Do not publish a prevalence claim |
| **A prescribed RPO measurement methodology** | **[unknown]** (**[verified]** by absence) — only the evidence chain in §5.2 is prescribed | Agree the measurement basis with your system auditor in advance |
| **A universal non-QSB post-drill filing form and deadline** across NSE+BSE+MCX | **[unknown]** (**[verified]** by absence) | — |
| **A standalone pre-failover "DR invocation" notice** to any of the three exchanges | **[unknown]** (**[verified]** by absence across the instruments read) — disclosure rides on the 2-hour intimation and T+1 preliminary report | Confirm with each exchange's trade-support desk |
| **Samuhik Prativedan Manch** glitch-module deep link and field schema | **[unknown]** | Exchange compliance portal |

### 8.3 Provenance cautions

- **[X-JOINT] was read from a third-party mirror** (`ricago.com`) of **MCX/TECH/015/2026**. Mitigation: every §8 clause quoted from it was **independently cross-checked against NSE's own master circular [N-COMP] §33.8**, which matches in substance and wording (50,000 clients; 45-minute disaster; 250 km; RTO 2h / RPO 15 min; half-yearly Specified-Member drill; 30/60/100% phase-in; ISO 27001). The **Annexure-A penalty table and Annexure-B/C report formats were read only from the mirror** — re-verify those from MCX's or BSE's official copy before publishing the penalty figures.
- **[N-COST]** and **[N-DC]** are undated or page-dated web pages, not circulars. [N-COST] carries *"Updated on: 10/08/2026"*. Charges change by circular; re-check before each budget cycle.
- **NSE pages are client-side rendered**; several tables (drill calendar, parts of the costing page) required raw-HTML extraction and some did not render at all. Absence of a table in this report is not evidence that it is absent from the page.
- **Items tagged [likely] carried from prior project research** in this repository (`RESEARCH_certification.md`, `RESEARCH_monitoring.md`, `RESEARCH_2026_changes.md`) were **not re-verified in this pass**: the independent-auditor RCA clock (45-minute glitch → 45 days), the mock/algo participation regime, and the "exchange mock from DR does not discharge the member drill" conclusion. They are flagged inline.
- **This research is NSE-centric by necessity.** Every architectural answer in §2 is **verified for NSE only**. The regulatory layer in §1 is common to NSE, BSE and MCX (the joint guidelines), but **the identifier, connectivity, charging and order-recovery mechanics in §2 are not**. Do not publish §2 as tri-exchange guidance without closing the BSE/MCX gaps above.

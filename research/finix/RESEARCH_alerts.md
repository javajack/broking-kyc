# RESEARCH: inbound alert and notice streams to a stockbroker (NSE / BSE / MCX)

Research date 2026-10-15. Recovered from subagent transcript.

---

I have a comprehensive primary-source base. Here is the research.

---

# Inbound Alert & Notice Streams to a Stockbroker — NSE / BSE / MCX
**Research date: 2026-10-15. Scope: what the exchange / CC / depository PUSHES TO the member that demands action.**

## How I sourced this (so you can re-verify)

NSE's public circular index is machine-readable and was the backbone of this research:
`https://www.nseindia.com/api/circulars?fromDate=DD-MM-YYYY&toDate=DD-MM-YYYY` (needs a cookie from `https://www.nseindia.com/` and a `Referer` header). I harvested **45,739 NSE/NCL circulars (2018-01-01 → 2026-10-15)** and grepped subjects. Circular bodies are at `https://nsearchives.nseindia.com/content/circulars/<REF>.pdf` (or `.zip`). BSE notices are readable at `https://www.bseindia.com/markets/MarketInfo/DispNewNoticesCirculars.aspx?page=<YYYYMMDD-NN>` via curl (not WebFetch — 403). **api.bseindia.com and all of mcxindia.com are blocked at the Akamai edge from this environment.** WebSearch budget was exhausted at the first call, so everything below is direct-from-source or explicitly flagged.

**The single most valuable document I found** is one I'd recommend you base the whole chapter on:

> **NSE/SURV/74008 — "Surveillance and Investigation Consolidated Circular", 30 April 2026, 154 pages.**
> `https://nsearchives.nseindia.com/content/circulars/SURV74008.pdf`
> It consolidates all 39 live surveillance/investigation circulars into one indexed document and is the current authority. Its NCL twins are `CMPT73997` (F&O), `CMPT73996` (CM), `COM74020` (commodity), `CMPL74024` (CM master), all dated 30 Apr 2026, and `NSE/ISC/73973` (UCC Master Circular, 30 Apr 2026).

---

## 1. Surveillance / transactional alerts downloaded to members

### 1.1 The primary circular

| Item | Value | Evidence |
|---|---|---|
| Root circular | **NSE/INVG/22908**, 7 Mar 2013, Circular Ref 831/2013, "Surveillance Obligations for Trading Members" | [verified] `https://nsearchives.nseindia.com/content/circulars/INVG22908.zip` |
| Interim | **NSE/SURV/40148**, 5 Feb 2019, Ref 58/2019 (one page; "step up monitoring") | [verified] `https://nsearchives.nseindia.com/content/circulars/SURV40148.pdf` |
| **Current operative circular** | **NSE/SURV/48818**, 1 Jul 2021, Circular Ref 452/2021, "Surveillance Obligations for Trading Members – Update", effective 1 Aug 2021 | [verified] `https://nsearchives.nseindia.com/content/circulars/SURV48818.pdf` |
| Still in force in 2026 | Reproduced verbatim as Item 17 of NSE/SURV/74008 (30 Apr 2026) | [verified] `https://nsearchives.nseindia.com/content/circulars/SURV74008.pdf` |
| BSE twin | **BSE Notice 20210701-30**, 1 Jul 2021, category "Compliance", same title, same text | [verified] `https://www.bseindia.com/markets/MarketInfo/DispNewNoticesCirculars.aspx?page=20210701-30` (BSE predecessors: 20130307-21 and 20190205-54) |
| Commodity segment | **NSE/SURV/46161**, 27 Oct 2020 (and NSE/SURV/50862, 31 Dec 2021 for quarterly submission) | [verified] `https://nsearchives.nseindia.com/content/circulars/SURV46161.pdf` |

### 1.2 The alert list — exact exchange wording

**NSE/SURV/48818 Annexure I, "Transactional alerts downloaded by the Exchange to facilitate effective surveillance at the Member end"** — 12 alerts [verified]:

| # | Transactional Alert (exchange's own wording) | Segment |
|---|---|---|
| 1 | Significantly increase in client activity | Cash |
| 2 | Sudden trading activity in dormant account | Cash |
| 3 | Clients / Group of Client(s), deal in common scrips | Cash |
| 4 | Client(s) / Group of Client(s) is concentrated in a few illiquid scrips | Cash |
| 5 | Client(s) / Group of Client(s) dealing in scrip in minimum lot size | Cash |
| 6 | Client / Group of Client(s) Concentration in a scrip | Cash |
| 7 | Circular Trading | Cash |
| 8 | Pump and Dump | Cash |
| 9 | Reversal of Trades | Cash **and** Derivatives |
| 10 | Front Running | Cash |
| 11 | Concentrated position in the Open Interest / High Turnover concentration | Derivatives |
| 12 | Order book spoofing i.e. large orders away from market | Cash |

**Drafting note worth making in your docs:** the 2013 list had **13** alerts; item 9 was **"Wash Sales" (Cash & Derivatives)** and "Reversal of Trades" was #10. Wash Sales was dropped from the published list in the 2021 revision. [verified — compare INVG22908 against SURV48818]

**Commodity Derivatives (NSE/SURV/46161) — a different and smaller list, with stated periodicity** [verified]:

| # | Transactional Alert | Periodicity |
|---|---|---|
| 1 | Significant increase in Client Activity | Monthly |
| 2 | Sudden trading activity in dormant account | Monthly |
| 3 | Concentrated position in the Open Interest / High Turnover concentration | Daily |
| 4 | Large Trade (added w.e.f. 2 Nov 2020) | Daily |
| 5 | Order Spoofing (added w.e.f. 2 Nov 2020) | Daily |

Commodity alerts are delivered on **ENIT-Trade → Others → Transactional Alerts**; adverse observations go to **DL-SURV-COMM@nse.co.in**. [verified]

### 1.3 Disposal timeline — the "45 days" figure

**[verified] 45 days is correct and is stated three separate times in the primary source**, and is still stated in the 30 Apr 2026 consolidated circular (lines corresponding to §17 of NSE/SURV/74008):

- §1.2 — "Processing of alerts **within 45 days** from the date of alerts downloaded by the Exchanges as well as alerts generated at member's end."
- §4.3 — "…all alerts are analyzed and status thereof (**Verified & Closed / Verified & Sent to Exchange**) including action taken is updated **within 45 days, in the Member Surveillance Dashboard**."
- §4.4 — "…alerts generated at the Trading Members end… report instances with adverse observation, along with details of action taken, to the Exchange **within 45 days of the alert generation**."

The 2013 root circular adds: **"The Trading Member may seek extension of the time period from the Exchange, wherever required."** [verified, INVG22908] — that extension right survives into the commodity circular too.

Supporting evidence standard: bank / demat statements for **at least ±15 days from the date of transactions** [verified, INVG22908 Annexure and SURV46161 §C].

Separately, the ISF implementation standards impose a **30-day re-review cadence**: *"Every Internal / Exchange alert should be reviewed periodically by the Trading Members at least every 30 days till such time the alert is open."* [verified, NSE/INVG/65921 §5.5.6]

### 1.4 The delivery channel — Member Surveillance Dashboard (MSD)

**NSE/SURV/44477, 27 May 2020, Ref 300/2020** [verified] `https://nsearchives.nseindia.com/content/circulars/SURV44477.zip`

- URL: `https://www.connect2nse.com/SurveillanceDashboard/`; credentials delivered via Extranet at `<Member folder>/Investigation/Dnld`; login = password + OTP. Login must be validated within **30 days** of the circular or it is deactivated. [verified]
- **BSE's equivalent system is called e-BOSS** — "status thereof … is updated within 45 days, **in the e-BOSS System**" [verified, BSE Notice 20210701-30 §4.3]. This is a real NSE-vs-BSE difference worth calling out.
- MSD has four parts: (1) Information Dashboard, (2) Alert / Monitoring Dashboard, (3) Exchange communication, (4) Transactional escalation from TM to the Exchange. Plus a window for "Members' view" on the market (required when Nifty moves > ±1% in a day). [verified]
- **Live data refreshes at 11:30, 13:30, 15:00 and 17:00.** [verified]
- Expected response is **same-day (T day)**; an alert needing deeper analysis can be parked "under-watch" for **up to 15 days**. [verified, MSD FAQ Q7]

**Intraday alert categories inside MSD** (distinct from the 12 transactional alerts, and a stream most write-ups miss) [verified]:

| Dashboard | Alert |
|---|---|
| Information | Concentrated Trading activity |
| Information | SMS Alert (clients trading in scrips with unsolicited SMS circulation) |
| Information | Illiquid Securities |
| Information | FPI/NRI Monitoring |
| Information | High Order to Trade Ratio |
| Alert / Monitoring | Large Matched Trades |
| Alert / Monitoring | Last Trade Price (LTP) Variation |
| Alert / Monitoring | Large Unexecuted Orders |
| Alert / Monitoring | Large Cancel Orders |
| Alert / Monitoring | Terminal PAN verification (Self-Trade) |

"Exchange communication" is a chat-thread channel where NSE officials demand KYC, bank statements etc., with email notification; "members are requested to close the communication within the defined timeframe." [verified]

### 1.5 The obligation to revert

Two distinct obligations [verified, SURV48818 §4]:
- **Exchange-downloaded alerts** → update status in MSD (Verified & Closed / Verified & Sent to Exchange) within 45 days.
- **Member-generated alerts** → report *adverse observations only*, with action taken, to the Exchange within 45 days.

Also required: obtain trading rationale and documentation (bank statements, demat statements) **before** disposing; record observations in writing. [verified]

### 1.6 The quarterly "Surveillance Obligations for Trading Members" report

**NSE/SURV/49765, 29 Sep 2021, "Surveillance Obligation – Quarterly reporting by trading members"** [verified] `https://nsearchives.nseindia.com/content/circulars/SURV49765.zip`

- Due **within 15 days from end of the quarter**; uploaded on the **Member Surveillance Dashboard**; **NIL Report required** if nothing to report; effective from quarter ending September 2021. [verified, SURV48818 §6 and SURV74008]
- Three tables [verified, exact column headings]:
  - **A. Status of Alerts generated by the Trading member** — Name of Alert | No. of alerts under process at the beginning of quarter | No. of new alerts generated in the quarter | No. of alerts Verified & closed in the quarter | No. of alerts referred to Exchange (*) | No. of alerts pending / under process at the end of quarter
  - **B. Details of alerts referred to the Exchange** — Sr. No. | Date of Alert | Type of Alert | Brief observation and details of action taken | Date referred to Exchange
  - **C. Details of any major surveillance action taken (other than alerts referred to Exchange), if any, during the quarter** — Sr. No. | Brief action taken during the quarter
- Submission mechanics (commodity, illustrative of the whole flow) [verified, SURV50862 Annexure]: MSD → **Reports** tab → Export type "Commodity Quarterly Report To Upload" → prefilled CSV `Com_qtr_rpt_upld.csv` → **Exchange Submission** tab → Upload type "Commodity_Quarterly_Upload" → tick "Nil Submit" for NIL. If you edit the prefilled counts you must flip the `System generated` flag from **Y to N**. Cross-field validations are enforced (e.g. alerts referred to Exchange ≤ opening + new; closing = opening + new − closed).
- Other MSD export types visible: Info Alerts, Monitoring Alerts, Exchange Communication, Transactional Escalation, Members View, Member MIS, Quarterly Table 1/2/3 MIS, Commodity Quarterly MIS View, Transactional Alerts Summary. [verified]

### 1.7 What happens if alerts are not disposed

Two layers.

**(a) Late/non-submission of the quarterly report** — the slab has been *superseded* in 2026. Use the new one.

*Old (NSE/SURV/48818 §7, confirmed again in NSE/SURV/57315 of 27 Jun 2023):* 1st instance Rs 10,000/day until submission; 2nd instance onwards Rs 20,000/day; levied monthly, debited to the monthly bill. [verified]

*Current (NSE/INSP/73792, 17 Apr 2026, "Ease of Doing Business – Rationalization and Standardization of penalties levied on Trading Members", Annexure 1.5 item 1)* [verified] `https://nsearchives.nseindia.com/content/circulars/INSP73792.zip`:

| Stage | Action |
|---|---|
| Day 16 → day 20 | **Advise** |
| Day 21 → day 25 (or submission, whichever earlier) | **Rs 500/day (non-QSB), Rs 1,000/day (QSB)** |
| Not submitted by day 25 | **New client registration prohibited**, + 5-calendar-day notice of disablement of trading facility until submission. **The disablement notice is shared with all Exchanges.** |
| Not submitted by day 30 | **Member disabled in all segments** until submission |
| Repeat (2nd time onwards) | Monetary penalty **+ 50% escalation**, same disablement ladder |

This supersedes the Rs 10,000/20,000 per-day figures that are still widely quoted online. The predecessor to INSP73792 is **NSE/INSP/70746, 10 Oct 2025**, built on a SEBI-constituted Working Group (ANMI, BBF, CPAI) and SEBI-approved. [verified]

**(b) Not disposing the alerts themselves** [verified, SURV48818 §8 / SURV74008 §17]: during investigation or inspection, non-fulfilment of surveillance obligations → disciplinary action. Explicitly named: *"delay in processing of transactional alerts downloaded by the Exchange and repeated instances of delay in reporting of the status of alerts, may result in further disciplinary action as deemed fit in terms of Rules, Bye-laws and Regulations."* And it "does not preclude SEBI / Exchange to take any further action(s)."

Inspection-level penalties (NSE/INSP/73792 Annexure 1.1) [verified]:

| # | Contravention | 1st instance | Repeat |
|---|---|---|---|
| 79 | Member does not have transactional alerts facility (including repeated breaches) / monitoring of such alert as specified by exchanges | Advise + comply within 30 days | 2nd: Rs 10,000 + comply in 30 days; 3rd+: 50% escalation |
| 195 | MIS of Transactional Alerts (generated, disposed, pending) with action taken/exceptions not placed before board/partner/proprietor quarterly | Advise | 2nd: Warning; 3rd+: Rs 5,000 |
| 196 | Non-adherence to guidelines on recommended best practices, common types of market abuse, accountability matrix for effective trade surveillance operations | Advise + 30 days | 2nd: Warning + 30 days; 3rd: matter placed before relevant authority |

### 1.8 Internal governance the circular forces on you

- Board/Partner/Proprietor-approved **surveillance policy**, reviewed periodically. [verified]
- **Quarterly MIS** to Designated Director / Partners / Proprietor on alerts opened/generated/processed/pending, reasons for pendency and closure plan. [verified]
- **Internal auditor** must review the surveillance policy, its implementation and effectiveness, and the alerts generated in the audit period, and record observations in the report. [verified]
- Alerts and the fact that transactions are under scrutiny **must not be passed on to investors** unless explicitly stated by Exchange/SEBI (tipping-off bar). [verified, NSE/INVG/65921 §8.3]

---

## 2. Client-level / trading-pattern alerts beyond the above

The governing document here is **NSE/INVG/65921, 31 Dec 2024 — "Measures to instil confidence in securities market – Brokers' Institutional mechanism for prevention and detection of fraud or market abuse – update"**, which carries the **Industry Standards Forum (ISF) implementation standards** for Chapter IVA of the SEBI (Stock Brokers) Regulations. [verified] `https://nsearchives.nseindia.com/content/circulars/INVG65921.pdf`
Parent: SEBI circular **SEBI/HO/MIRSD/MIRSD-PoD-1/P/CIR/2024/96 dated 4 Jul 2024**, forwarded as NSE/SURV/62827 of 8 Jul 2024. [verified]

Phase-in by active UCC count [verified]: QSBs — 1 Aug 2024; >50,000 UCCs — 1 Jan 2025; 2,001–50,000 — 1 Apr 2025; **up to 2,000 — 1 Apr 2026** (i.e. a greenfield member is already in scope today).

### 2.1 Verdicts on the three specific alerts you asked about

| Alert you asked about | Verdict | Evidence |
|---|---|---|
| **Clients trading in F&O aged 70+** | **NOT an exchange-generated alert, and not a mandated broker alert either.** I searched the full text of NSE/SURV/48818, NSE/SURV/46161, NSE/SURV/74008 (154 pp.), NSE/INVG/65921 (ISF standards), NSE/INSP/56927 (QSB comprehensive operating guidelines), NSE/SURV/44477 (MSD manual) and the NSE circular-subject index 2018–2026. **No reference to age, date of birth as a risk factor, "senior citizen", "elderly" or "70".** | **[unknown]** — no primary source found. Treat as a broker-internal / product-suitability control, not a regulatory alert. The nearest mandated item is the QSB daily obligation of *"Regular interaction with retail clients trading only in options from a product suitability perspective"* [verified, INVG65921 §5.5.5.2.2] |
| **Occupation mismatch** | **Not found as an alert anywhere.** "Occupation" does not appear as an alert parameter in any primary source I read. | **[unknown]** |
| **Income-range mismatch** | **Real and mandated — but as income/net-worth disproportionality, not "income range mismatch".** Three distinct mandated alerts (below). Separately, **gross annual income is a mandatory UCC field** the Exchange polices. | **[verified]** |
| **Dormant account activity** | **Real and exchange-generated.** "Sudden trading activity in dormant account" is alert #2 in the NSE cash list and #2 in the commodity list (monthly). Also appears in the ISF market-abuse matrix as "Sudden surge in dormant account". | **[verified]** |

### 2.2 The income/net-worth alert family (all [verified], NSE/INVG/65921)

- §5.5.3.4 — *"Disproportionate trading activity vs reported income / Net worth"* — applicable to **all** trading members.
- §5.5.6 alert #4 — *"Margin obligations disproportionate to declared income / Networth (peak of the month)"*; threshold "if more than max (x times n/w or y times income)".
- §5.5.6 alert #5 — *"Net funds pay-in/pay-out during a period (one month) disproportionate to declared income/Networth"*.
- §5.5.6 alert #8 — *"Clients making net profit/losses over a period which is a significant amount as compared to their income/Networth in cash segment beyond a particular threshold"*.
- **QSB-only, monthly** §5.5.5.1.1 — *"Clients having significantly higher Pay-in obligation compared to Income declared or Net Worth uploaded in the UCC system of the Exchange"*.
- Thresholds are **broker-set** ("to be determined by brokers as per their business size"), decided by PO/DD/CO/CSO with documented rationale, reviewed by the apex body at least once a year, and recalibrated at least annually. [verified]

### 2.3 Full mandated broker-generated alert themes (all trading members) — [verified, NSE/INVG/65921 §5.5.3]

5.5.3.1 Client/group accounting for significant % of total trading activity in a scrip/contract vs market · 5.5.3.2 New account or client dealing after a significant time gap accounting for significant value/% of activity · 5.5.3.3 Dealing frequently in small quantities / minimum market lot · 5.5.3.4 Disproportionate trading activity vs reported income/net worth · 5.5.3.5 Frequent changes in KYC · 5.5.3.6 Suspicious trading prior to a price-sensitive announcement by a connected listed company · 5.5.3.7 Significant selling concentration in scrips on the **'For Information list' or 'Current Watch list'** (unsolicited-SMS lists; ref NSE/INVG/45517, 30 Aug 2020) · 5.5.3.8 Consistency in profit/loss at client/group level (ref NSE/INVG/2019/40175, 7 Feb 2019) · 5.5.3.9 Significant trading in a scrip by a client who has pledged shares of the same scrip · 5.5.3.10 Whether orders are placed by the client or an authorised representative; KYC address vs dealing-office address · **5.5.3.11 Trading activities of accounts of relatives of the entity, to identify synchronized/coordinated trading** (this one is new in the 2024 ISF standards and is *not* in SURV48818).

Additional for internet-based trading: **IP address monitoring, including multiple client codes from the same location** [verified]. Additional for TMs who are DPs (in SURV48818 / BSE 20210701-30 but dropped in the ISF list): significant trading where client has pledged shares / significant holding / frequent off-market transactions [verified].

### 2.4 QSB-only enhanced alerts (ref NSE/INSP/56927, 1 Jun 2023) — [verified]

**Monthly:** higher pay-in obligation vs declared income/net worth · unrelated clients with common Mobile Numbers or Email Ids · **unrelated clients using common devices for trading (device-identifier data; ref NSE/INVG/64567, 15 Oct 2024)** · client activity in deep OTM contracts where clients incur losses · regular campaigns on password sharing · repeated delivery default (3+ times in a rolling 6 months).

**Daily:** client onboarding monitoring (same location, then no/low trading) · retail options-only client suitability interaction · artificial price boost / Pump and Dump · large orders placed and cancelled · order spoofing · client/related-client concentration vs Exchange volumes · circular trading / reversal pattern · **client watchlist from historically observed manipulations** · front running by dealers/clients of the TM's large trades · compliance with NSE/SURV/48818 themes · fat-finger/error-trade preventive controls · long-dated option contracts · **trading in stocks under ASM, GSM and the unsolicited-messages framework** · FUTP and PIT abuses · linked clients on the same side controlling a substantial share of market OI in a commodity/contract.

### 2.5 The accountability matrix (asked for by inspectors — item 196 above)

[verified, NSE/INVG/65921 §9]: CEO/ED/Senior Management/KMP → Board or Audit Committee; Promoters → Board or Audit Committee; Employees → Senior Management/KMP, Designated Director and CEO; **Clients** → official heading trade surveillance under supervision of senior management, Compliance Officer, Designated Director and CEO; **Authorised Persons** → same as clients.

### 2.6 New in Dec 2025: surveillance-software vendor empanelment

**NSE/INVG/71818, 15 Dec 2025 — "Procedure of empanelment of vendors for surveillance software"** [verified, summarised at §39 of NSE/SURV/74008]. Covers empanelment of automated system-driven surveillance software vendors **and** registration of in-house developed surveillance software, with prescribed Application, Undertaking for In-house Surveillance Facility, Undertaking for Surveillance Application, Auditor's Report, Auditor's Certificate and Vendor Application formats (Annexures I–VI). For a greenfield member this is a build-vs-buy gate you must clear. The ISF standards also set a tiered expectation: small members may run a manual process, larger ones must have an alert-generation system (in-house or vendor). [verified]

---

## 3. Margin shortfall / margin violation notifications

### 3.1 Files the clearing corporation pushes

**MG-12 / MG-13 are real and current.** [verified]

| File | Who gets it | Naming convention | Location |
|---|---|---|---|
| **MG12** — Detailed EOD margin file for **Clearing Member / Custodian** | CM, Custodian | CM segment: `C_MG12_<MEMBER CODE>_DDMMYYYY.LIS.gz` | `CMFTP/C<MEMBERCODE>/REPORTS`; Custodians via NMASS → File Mgmt → File Download |
| **MG13** — Detailed EOD margin file for **Trading Member** | TM | CM segment: `C_MG13_<MEMBER CODE>_DDMMYYYY.LIS.gz` | `CMFTP/C<MEMBERCODE>/REPORTS` |
| MG09 / MG10 / MG11 | CM / TM / CM | Margin statement (CM), margin statement (TM), margin payable statement (CM) — F&O: `F_MG10_<MEMBER CODE>_DDMMYYYY.LIS.gz` etc. | F&O: `/FAOFTP/...` |
| MG-14 / MG-15 | CM / TM | Cross margin benefit report | F&O |
| **SA01–SA06** | TM / CM | Short allocation reports (SA04/SA05 are the client-level ones referenced in the penalty computation) | F&O |
| **PNL01 / PNL02 / PNL03** | TM / CM / CM-for-TM | **Penalty files** — see §4 | `Member Folder/REPORTS/DNLD/PNL01` etc. |
| DELOI | TM / CM | `F_TM_DELOI_<MEMBER CODE>_DDMMYYYY.csv.gz` / `F_CM_DELOI_...` | `FAOFTP/F<MEMBER CODE>/REPORTS` |
| **F_MWPLBASEPOS01 / 02** | TM / CM | `F_MWPLBASEPOS01_<MEM_CODE>_YYYYMMDD.CSV` | `/FAOFTP/F<MEMBER CODE>/Letters/Dnld` |
| Contract_Delta (intraday / EOD) | all | `Contract_Delta_DDMMYYYY_inn.csv` (intraday) / `Contract_Delta_DDMMYYYY.csv` (EOD) | `FAOFTP/FAOCOMMON/Limit Files/` |
| DLMG01 / DLMG02 | CM / TM | Delivery Margin Report | F&O |
| AEL | all | Extreme Loss Margin File | F&O |

Sources: NCL/CMPT/42900 (12 Dec 2019, Annexures 1–4) `https://nsearchives.nseindia.com/content/circulars/CMPT42900.pdf`; NCL/CMPT/45087 and /45088 (21 Jul 2020) which named MG-12/13 explicitly on the back of **SEBI/HO/MRD2/DCAP/CIR/P/2020/127 dated 20 Jul 2020**; and Part D of the current **NCL/CMPT/73997** (F&O Consolidated Circular, 30 Apr 2026). All [verified].

**Files you upload back** [verified]: CM `C_MRG_TM_<DDMMYYYY>_nn.CSV` / `C_MRG_CM_<DDMMYYYY>_nn.CSV`; F&O `F_MRG_TM_<DDMMYYYY>_nn.CSV` / `F_MRG_CM_<DDMMYYYY>_nn.CSV`. `nn` is a batch number starting 01, incrementing to max 99; **the latest batch for the trade date is final**. Upload via NSCCL-MASS → Client Margin → File upload, or extranet `/CMFTP/C<MEMBERCODE>/COLAT/UPLD` (CM) / `/FAOFTP/F<MEMBERCODE>/COLAT/UPLD` (F&O). Bad filenames and zero-byte files are renamed `<filename>.failed` in your folder.

**Return / processed files** [verified]: `C_MRG_TMR_<MEMBER CODE>_<DDMMYYYY>_nn.CSV` (CM) / `F_MRG_TMR_...` (F&O). Per-record reason codes:

| Code | Meaning |
|---|---|
| 01 | Record size does not match (e.g. extra comma) |
| 02 | Date in record does not match file date |
| 03 | Record is altered — **no matching record in MG-13/MG-12** (error in date/client code/margin amount) |
| 04 | Record pertains to proprietary position for trading member |
| 05 | Record pertains to proprietary position for clearing member |
| 06 | Margin amount collected is negative or non-numeric |
| 07 | **Insufficient Margin** (difference amount shown) |
| 08 | **Sufficient Margin** (difference amount shown) |

If a record has multiple errors, the **lowest-numbered** code is reported. [verified]

**Intraday snapshots:** the CC sends **a minimum of 4 snapshots** of client-wise margin requirement, taken randomly within pre-defined time windows, computed on fixed BOD margin parameters; MG-12/13 carry both the **EOD** and the **peak across intraday snapshots**. [verified, NCL/CMPT/73997 §15.1.1]

### 3.2 The sign-off date — [verified]

> *"The cut off day upto which a TMs/CMs/Custodian may report client margin details to the Clearing Corporation is referred to as the **sign off date**. It shall be **5 working days after the trade date i.e. … up to T+5 working days**."*

— NCL/CMPT/42900 §3 (2019) **and** unchanged in NCL/CMPT/73997 §15.3 and NCL/CMPT/73996 §12.3, both 30 Apr 2026. Corrections are made by re-uploading with an **incremental batch number any time prior to the sign-off date**. A file loaded after it is rejected with *"File is not being processed as file upload date is greater than sign off date"*. **All non-reporting is treated as 100% short reporting.** [verified]

### 3.3 Short-collection / non-collection penalty slabs — [verified, and current as of 30 Apr 2026]

From **NCL/CMPT/73997 §16.12** (F&O) and **NCL/CMPT/73996** (CM), identical to the 2019 Annexure 4:

| Short collection for each client / TM / CP | Penalty % (per instance) |
|---|---|
| (< Rs 1 lakh) **AND** (< 10% of applicable margin) | **0.5%** |
| (≥ Rs 1 lakh) **OR** (≥ 10% of applicable margin) | **1.0%** |

Escalations [verified]:
- Short/non-collection continuing **more than 3 consecutive days** → **5% of the shortfall amount for each day** of continued shortfall **beyond the 3rd day**.
- Short/non-collection on **more than 5 days in a month** → **5% of the shortfall for each day** during the month **beyond the 5th day**.
- **Nifty50 carve-out:** if the short collection is caused by a movement of **3% or more in the Nifty50 index (close to close)** on day T, penalty is imposed **only if the shortfall continues to T+2**.
- Non-reporting = **100% short reporting**.

**Important correction to a common misstatement:** the "5%" is *not* a "5% for repeated" flat slab — it is a **per-day 5% of shortfall** beyond the 3-consecutive-day or 5-days-in-a-month triggers. Do not write it as a single repeat-offence rate.

**Shortage computation** (F&O §15.4) takes the **higher** of: (a) EOD margin obligation vs EOD margin available, (b) peak margin obligation across snapshots vs peak margin available, and (c) highest of intraday/EOD short allocation after excess collateral across segments and valid reason codes. [verified]

**Collection:** debited to the CM's settlement account with the designated primary clearing bank **on a monthly basis**, collected by the **tenth working day of the subsequent calendar month**. [verified]

### 3.4 Margin violation / disablement notices

**Definition** [verified, NCL/CMPT/73997 §16.2]: margin liability of a CM exceeding effective deposit less minimum liquid networth, **or** a TM's margin liability exceeding the limit set by its CM, **at any time including during trading hours**, is a violation. The CC may advise the Exchange to withdraw membership rights / trading facilities — **"without any notice"** — and close out positions by placing counter orders.

**Risk-reduction mode** kicks in at **90% utilisation**, monitored at both TM and CM level on the client-collateral-excess logic. [verified, §10.8]

**Penalty for margin violations (disablements), levied monthly** [verified, NCL/CMPT/73997 §16.7]:

| Instances of Disablement (in a calendar month, during market hours) | Penalty |
|---|---|
| 1st instance | 0.07% per day |
| 2nd to 5th | 0.07%/day + Rs 5,000 per instance |
| 6th to 10th | 0.07%/day + Rs 20,000 (for 2nd–5th) + Rs 10,000 per instance from 6th–10th |
| 11th onwards | 0.07%/day + Rs 70,000 (for 2nd–10th) + Rs 50,000 per instance from 11th. **Additionally referred to the Member Committee.** |

Collected from the CM; the CM may recover from the TM. [verified, and NCL/CMPT/40794 of 22 Apr 2019 made both margin-obligation and TM-position-limit penalties collectible from the CM]

Settlement shortage, for contrast [verified, §16.3]: shortage ≥ Rs 5 lakh → CC may advise withdrawal of membership rights; < Rs 5 lakh → amount blocked from effective deposits; **≥ Rs 2 lakh on six or more occasions in the preceding three months** → withdrawal of rights; penal charge **0.07% per day** of shortage.

**Penalty letters** [verified, NCL/CMPT/73997 §15.7]: *"Letters for client margin penalty shall be downloaded to the members on NSCCL-MASS and also through extranet into their respective folders. (Path: `/FAOFTP/F<MEMBER CODE>/LETTERS/DNLD`)"*.

**SMS alert facility** [verified, NCL/CMPT/73997 Item 17]: subscribe via NMASS under super-admin login (Registration then Subscription); **max 5 mobile numbers per member**; explicitly a convenience only — the CC disclaims liability and you remain bound whether or not you received the alert. Do not design a control that depends on it.

### 3.5 BSE / ICCL side — [verified]

From ICCL's own member awareness deck `https://www.icclindia.com/downloads/Awareness_Session_on_Margin_Allocation_And_Segregation_Reportings_at_BSECL_29012025.pdf`:
- Files disseminated by the CC: **Intraday margin file (UDiFF)**, **EOD margin file (UDiFF)**, **Margin Reporting file (existing non-standardised format)**, plus a **response file** after processing reported vs levied margins.
- Short allocation file for T day is posted on the member's **Extranet Portal on T+1**.
- Collateral segregation reporting must be uploaded for T day **by T+1 23:59:59**.
- **Collateral segregation non-reporting penalty: 0.5% of the margin reported** (EOD or peak reported, whichever higher). The **penalty file is generated on T+6** and posted on the Extranet Portal as **`Colatseg_<CM Code>_ddmmyyyy.csv`**.
- ICCL short-allocation **reason codes** you can report against to avoid penalty [verified, BSE/ICCL Notice 20230427-28, effective trade date 2 May 2023]: 01 Excess collateral with other CC · 02 Value of securities sold for which EPI done by EOD to CC · 03 Trades on behalf of NRI clients · 04 Trades for CP clients by TMs (TM only) · 05 Trades executed in wrong client codes · 06 Allocation request submitted to ICCL but accepted later · 07 Securities repledged by CM to CC in depositories not yet processed · 08 Value of EPI of funds by Custodians by EOD for marginable CP codes. **False reporting attracts the false-margin-reporting penalty.**
- Naming note: BSE's 2025 material titles this "at BSECL" while the deck's own branding and the issuing signature say "Indian Clearing Corporation Limited". **[uncertain]** — confirm the current legal name before you print it.

---

## 4. Penalty advices — how they reach the member, and the appeal window

### 4.1 NSE / NCL delivery channels — [verified]

| Channel | What arrives | Source |
|---|---|---|
| **Extranet `…/LETTERS/DNLD`** | Client-margin penalty letters | NCL/CMPT/73997 §15.7 |
| **Extranet `Member Folder/REPORTS/DNLD/PNL01` (and PNL02, PNL03)** | Daily penalty detail files | NCL/CMPT/53083, 25 Jul 2022 |
| **NSCCL-MASS / NMASS** | Penalty letters and margin files | NCL/CMPT/73997 |
| **"Penalties at NCL" menu on the member portal** (`https://inspection.nseindia.com/MemberPortal/` → Statement Upload → Penalties at NCL) | (1) Penalty for Non-Submission, (2) Penalty for Modification and Delayed Submission, (3) Penalty for Client Margin/Short Allocation — viewable at **member level and client level**, downloadable | NCL/CMPL/60552, 5 Feb 2024 `https://nsearchives.nseindia.com/content/circulars/CMPL60552.pdf` |
| **Monthly bill** | Surveillance quarterly-report penalties are "debited in the monthly bill" | NSE/SURV/48818 §7 |
| **Settlement account debit** | Margin short-reporting penalties, monthly, by the 10th working day of the following month | NCL/CMPT/73997 §16.12 |

**PNL file formats** [verified, NCL/CMPT/53083, 25 Jul 2022]:
- **PNL01** — detail penalty for short/non-reporting by **trading members**: `C_PNL01_<MEMBER CODE>_DDMMYYYY.CSV`, standardised name `NCL_C_PNL01_<MEMBER CODE>_DDMMYYYY.CSV`. Fields: Trade Date, Client Code, **EOD Reporting Shortfall (a)**, **Peak Reporting Shortfall (b)**, **EOD Short Allocation (c)**, **Shortfall Amount = Max[(a),(b),(c)]**, Penalty Amount, **GST Amount**, Total Penalty Amount.
- **PNL02** — same for **clearing members**, at TM/CP level: `C_PNL02_<MEMBER CODE>_DDMMYYYY.CSV.gz` / `NCL_C_PNL02_...`.
- **PNL03** — penalty on TMs affiliated to a CM, provided to the CM: `C_PNL03_<MEMBER CODE>_DDMMYYYY.CSV.gz`.
- Revised-format PNL files went live **10 Aug 2022 (T+6th day)**.

NCL also warns that the portal view "may not be considered as final penalty" and that members must refer to official NCL communication for authenticity. [verified]

### 4.2 The exchange-side (non-clearing) enforcement chain — [verified, NSE/INSP/73792, 17 Apr 2026]

**Letter of Observations (LO)** → **Intimation of Observation (IO)** → **Show Cause Notice (SCN)** → opportunity of personal hearing before the Relevant Authority → **Action Letter / Order**. Failure to respond within the LO/IO/SCN timeline is construed as *"No additional information is available"* and the Exchange proceeds on what it has; persistent failure may be treated as **non-cooperation** and draw proceedings under Chapter IV of NSEIL Rules. [verified]

Other 2026 rules worth capturing [verified, same circular]:
- Penalty/financial disincentive **below Rs 1,000 → the Exchange "Advises" instead of levying**.
- If cumulative inspection-driven penalty in a financial year exceeds **Rs 1 crore or 20% of the member's latest reported networth, whichever is lower**, the matter goes to the Relevant Authority.
- Un-prescribed procedural/non-critical violations: **Advice → Warning → Rs 5,000** for 1st/2nd/3rd instances.
- Certain actions bypass the Relevant Authority entirely (terminal disablement, prohibition on onboarding new clients, blocking collateral) — including everything in Annexures 1.2–1.5.

### 4.3 The window to represent / appeal

**Clearing-corporation penalties (margin, short allocation, segregation, non-submission):**
- **7 working days from the date the penalty is made available on the portal** — [verified] NCL/CMPL/71983 FAQ Q2, citing **NCL/CMPL/58063 dated 23 Aug 2023**. Beyond 7 days you must justify the delay in the request itself and it is taken up "only on a case-to-case basis".
- Raised **only** through the portal — *"Any request raised through emails shall not be considered."* [verified]
- **New portal from 24 Dec 2025: `https://ims.connect2nsccl.com/NCLMemberPortal/`** (NCL/CMPL/71983). Navigation: Inspection Portal → Statement Upload → Penalties at NCL → **Submission for Penalty Review Request**. Mandatory fields: Type of Penalty, Total Penalty Amount, Contact details, Email address, Attachment. A request is valid only when its status reads **"Success"**; track under "View status". NCL adds any document request as a comment against the Case ID **on or before two weeks**. Upload file naming: `MemberCode_TypeofPenalty_DDMMYYYY_SEQNO.csv`, where the date is the **upload** date, not the trade date. [verified]
- Lineage: introduced NCL/CMPL/60651 (12 Feb 2024); FAQ NCL/CMPL/66692 (14 Feb 2025); revised FAQ NCL/CMPL/72710 (9 Feb 2026); new category added NCL/CMPL/74821 (23 Jun 2026). [verified from circular index]

**Review / appeal / waiver against Member Committee actions — the 2025 SEBI overhaul:**
**SEBI/HO/MRD/POD-III/CIR/P/2025/112 dated 5 Aug 2025**, forwarded as **NSE/INSP/69613 (12 Aug 2025)** and **NCL/CMPL/69557 (7 Aug 2025)** [verified] `https://nsearchives.nseindia.com/content/circulars/INSP69613.pdf`:
- Review/appeal/waiver against actions of the **Internal Committee (IC)** of the Member Committee, or against actions taken by the MII under a **pre-approved policy on regulatory action** → placed before the **Member Committee**.
- Review/appeal/waiver against actions taken by the **Member Committee itself** → handled by a **separate mechanism set up by the Governing Board** with **Public Interest Directors and/or Independent External Professionals who are not on the MC**. The Governing Board must issue an SOP for this.
- Further appeal → members are free to approach the appropriate authority under applicable law.
- **Applicable from the 45th day of issuance** of the SEBI circular.

Older NSE-side references: NSE/INSP/47457 (25 Feb 2021) "List of violations and applicable penalties (CM, F&O, CD and CO segments)"; NCL/CMPL/58063 (23 Aug 2023) "Application for review of various penalties levied by NSE Clearing Ltd."; NCL/CMPL/49286 and NCL/CMPL/59930 "Uniform penalty structure for Clearing Members". [verified from index]

**BSE equivalent appeal window:** **[unknown]** — I could not locate a BSE/ICCL notice stating a specific representation window. The SEBI Aug 2025 circular applies to all MIIs identically, so the MC/IC structure will be the same; the 7-working-day clock is an NCL-specific figure and should **not** be asserted for ICCL.

---

## 5. Ban period / MWPL and position-limit breach notices

### 5.1 MWPL ban mechanics — [verified, NCL/CMPT/73997 §16.13, 30 Apr 2026]

- At EOD the CC checks whether **market-wide Future Equivalent (FutEq) Open Interest exceeds 95% of applicable MWPL**; if so the stock is **placed in ban period from the next day**.
- Normal trading resumes only after **combined FutEq OI across all Exchanges comes down to 80% of MWPL**.
- **"All stocks placed under ban for the next trading day shall be disseminated on the website of the Clearing Corporation."** Daily EOD MWPL utilisation (FutEq, across exchanges) is also published on the CC website.

### 5.2 Entity-level monitoring during ban — what the member actually receives

[verified, §16.13.2]:
- On ban entry, every entity's position is frozen as a **base position** (Day 1) and pushed to you as **`F_MWPLBASEPOS01_<MEM_CODE>_YYYYMMDD.CSV`** (TM) / **`F_MWPLBASEPOS02_...`** (CM) at **`/FAOFTP/F<MEMBER CODE>/Letters/Dnld`**.
- On Day 2, the CC computes FutEq OI using the **2 PM intraday delta snapshot** published as **`Contract_Delta_DDMMYYYY_i04.csv`** at `FAOFTP/FAOCOMMON/Limit Files/`.
- **The operational reason this matters:** *"the method of taking snapshot delta at 2 PM would provide an avenue to members to check positions of their clients between 2 PM to 3.30 PM and in case of increase in FutEq positions (or change of sign), take measures, if required, so as to avoid penalty."* That 2 PM → 3:30 PM window is the member's action window and belongs in your runbook.
- Base position updates at EOD only if the entity traded to **decrease** FutEq OI, or FutEq OI is unchanged but actual open positions changed. Corporate-action adjustments are applied.

**Ban-period violation penalty** [verified, §16.13.5]: violated quantity = |FutEq OI of base position − FutEq OI of EOD position| (or absolute EOD FutEq if the sign flipped). **Penalty 1% of violation value (violated quantity × underlying price), minimum Rs 5,000, maximum Rs 1,00,000, per entity per stock per day.** A violation does **not** reset the base position, so the penalty recurs daily while violated quantity > 0 and the stock remains in ban.

### 5.3 New in Oct 2025 — intraday MWPL broadcast on the terminal

**NSE/SURV/71090, 31 Oct 2025 — "Intraday monitoring of MWPL utilization for Single Stocks on Future Equivalent (FutEq) basis"**, implementing **SEBI/HO/MRD/TPD-1/P/CIR/2025/79 dated 29 May 2025** [verified, reproduced at §32 of NSE/SURV/74008]:
- MWPL utilisation monitored **4 times a day on random snapshots**; both futures and options counted.
- **"Exchanges shall broadcast MWPL utilisation message on the Exchange provided trading terminals once the Future Equivalent (FutEq) open interest in the futures and options contract in a security exceeds 60% of the MWPL specified for such security."** Displayed per the 4 random snapshots.
- Delta methodology is published in full: FutEq(call) = N(d1); FutEq(put) = N(d1) − 1; FutEq(future) = 1; d1 = {ln(S/K) + (Rf + 0.5·Vol_Annual²)·T} / (Vol_Annual·√T), with Rf fixed at the latest **RBI repo rate** and prorated time to expiry as defined in NSE/SURV/70553 (30 Sep 2025).

This is a genuinely new inbound alert (terminal broadcast, not a file) and most existing write-ups predate it.

### 5.4 Position-limit breach — client/NRI/MF level

[verified, NCL/CMPT/73997 §16.8]: where a Client / NRI / FPI Category II (individuals, family offices, corporates) / MF scheme EOD open position exceeds the limit, penalty **per day of violation** = **1% of the value of the quantity in violation** (excess quantity × closing price in the CM normal market) **per entity per stock**, **or Rs 1,00,000 per entity per stock, whichever is LOWER, subject to a minimum of Rs 5,000** per entity per stock. Recoverable from the client.

Note the "whichever is lower" — it is a cap, not a floor. This is frequently misreported.

### 5.5 Equity index derivatives position limits — intraday monitoring and the 2025 penalty grid

**NSE/SURV/67436, 3 Apr 2025 — "Standard Operating Procedure – Intraday Position Monitoring for Index Derivatives Contracts"**, mirrored by **BSE Notice 20250403-58** of the same date [both verified] — `https://www.bseindia.com/markets/MarketInfo/DispNewNoticesCirculars.aspx?page=20250403-58`.

Implementing SEBI/HO/MRD/TPD-1/P/CIR/2024/132 (1 Oct 2024), SEBI/HO/MRD/MRD-PoD-2/P/CIR/2024/140 (15 Oct 2024) and SEBI/HO/MRD/TPD-1/P/CIR/2025/41 (28 Mar 2025):
- From **1 Apr 2025**, index derivatives position limits are monitored **intraday** on **minimum 4 random snapshots** in pre-defined time windows.
- **"There shall be no penalty for breach of existing position limits intraday and such intraday breaches shall not be considered as violations, until further directions."** Exchanges must still **intimate such breaches to clients/trading members for their risk monitoring**. [verified] — i.e. this is a pure notification stream today, and a trap for anyone who assumes it is penal.
- **Passive breaches** (where market OI drops and your unchanged position therefore exceeds the limit) are explicitly **not penalised and need not be unwound**. [verified]
- TM-level index limits: higher of **Rs 7,500 crore or 15% of total market OI** in equity index futures / index options respectively. [verified]

**EOD index position-limit penalty (FPI / Mutual Fund / Trading Member level), levied monthly** — NSE/SURV/67688 (24 Apr 2025), aligned to BSE Notice 20250403-58, and re-stated as item 8 of NSE/INSP/73792 Annexure 1.5 (Apr 2026) [verified]:

| Instances of position-limit violation | Monetary penalty |
|---|---|
| 1st instance | **NIL** |
| 2nd to 5th | Rs 5,000 per instance |
| 6th to 10th | Rs 20,000 (for 2nd–5th) + Rs 10,000 per instance from 6th–10th |
| 11th onwards | Rs 70,000 (for 2nd–10th) + **Rs 1,000 × cumulative no. of instances** from the 11th (Rs 11,000 for the 11th, Rs 12,000 for the 12th…). **Plus referral to the Member Committee.** |

Live circular chain for index position-limit monitoring [verified, index of NSE/SURV/74008 item 31]: NSE/SURV/64953 (8 Nov 2024) → 67436 (3 Apr 2025) → 67688 (24 Apr 2025) → 68845 (30 Jun 2025) → 69393 (30 Jul 2025) → 70553 (30 Sep 2025) → 71673 (5 Dec 2025). And **NSE/SURV/75524 (31 Jul 2026)** changes FutEq/Delta intraday position-limit monitoring **and OTR** on account of the new **Closing Auction Session (CAS)**. [verified from index — I did not read 75524's body]

### 5.6 Commodity derivatives — revised Sept 2026

**SEBI circular HO/47/16/13(5)2026-MRD-POD1/I/20735/2026 dated 9 Sep 2026**, "Review of Position Limits for Clients and Penalty Provisions for Violation / Breach of Position Limits for Commodity Derivatives Segment", **in force with immediate effect** [verified] `https://www.sebi.gov.in/sebi_data/attachdocs/oct-2026/1791806752815.pdf`. Revises Annexure J under para 3.4.3 of the SEBI Master Circular for Commodity Derivatives of 4 Aug 2023:

| Violation at client level in OI | Penalty per day of violation |
|---|---|
| **More than 2%** of the prescribed limit | Limit exceeded × closing price × no. of days × **2% (0.02)**, **or Rs 2,00,000, whichever is LOWER** |
| **Up to 2%** of the prescribed limit | Limit exceeded × closing price × no. of days × **2% (0.02)**, **or Rs 10,000, whichever is LOWER** |

Plus [verified]: the member must bring the position within limits **by the next trading day**, failing which **the Exchange squares off the excess without further notice** by placing orders in that client code. More than 3 instances of the >2% case for a TM in a calendar month → **TM put in square-off mode for one day** (same commodity). More than 3 instances of (a)+(b) combined in a month → **an additional penalty equal to the penalty already charged**, with an exemption where the violation arises **exclusively from clubbing of positions**. Repeated violations may draw SEBI action. **Penalty is credited to the Exchange's Investor Protection Fund.**

Client-level numeric limits were also reset: Broad 2% / Narrow 1% / Sensitive 0.5% of deliverable supply; 'Broad Commodity' redefined as deliverable supply ≥ 10 lakh MT or ≥ INR 5,000 crore averaged over 5 years; commodities shifting narrow→broad retain 1% for one year. [verified]

---

## 6. GSM / ASM / ESM — how the member learns, what each imposes, and the client-notification duty

### 6.1 How the member learns — three channels, all [verified]

1. **Daily exchange circulars/notices with annexures.** NSE issues these as `NSE/SURV/...` ("Applicability of Additional Surveillance Measure (ASM)", "Applicability of Short-Term ASM", "Applicability of Enhanced Surveillance Measure (ESM)", "List of Securities moving to Stage I/II/III/IV of GSM", "GSM – Periodic relaxation of Surveillance action"). BSE issues the same day as notices with `.xls` annexures — e.g. on 25 Jul 2025: 20250725-53 (ESM), -54 (LT-ASM), -57 (GSM stage movements), -58 (ST-ASM), -61 (Revision of ESM); on 31 Dec 2024 also 20241231-45 (Surveillance Measure for securities under IBC) and -57 (unsolicited videos/social-media messages).
2. **The `SurvInd` field in the security master files `security.txt` and `nnf_security.dat`**, which carry a scrip-wise surveillance indicator. This is the machine-readable channel your RMS must consume.
3. **Alert message on NEAT / NEAT+** at order entry for any security under GSM/ASM/IBC-IRP/unsolicited SMS or Videos/Pledge/ASM-ICA/ASM-IBC/ESM.

Master list reference path: *"Regulation > Market Surveillance > Consolidated List of Surveillance Indicators"* on nseindia.com. [verified]

### 6.2 The member's obligation to inform clients — this is the concrete, enforceable one

[verified, NSE/SURV/54513 (18 Nov 2022), NSE/SURV/55831 (1 Mar 2023), NSE/SURV/57110 (14 Jun 2023), all reproduced at §§12–14 of NSE/SURV/74008]:

> Trading Members **are required to develop a functionality on their non-NEAT front end including IBT, STWT, CTCL etc.**, whereby any person placing an order in a security under GSM / ASM / IRP as per IBC / Unsolicited SMS or Videos / Pledge / ASM-ICA / ASM-IBC / ESM gets this message before the order is placed:
>
> **"Security is under Surveillance Measure- \<relevant Short Code (Surv Indicator)\>, would you like to continue?" Yes / No**
>
> The order shall be sent to the Exchange **only if "Yes" is selected**. *"the aforesaid verbatim of the pop-up message should mandatorily be included in the pop-up message on the trading front-end"* and *"the aforesaid feature is mandatory for trading members with retail clients."*

A compliance confirmation in the form *"(Name of the trading member) has integrated the surveillance indicator's functionality into its system…"* is required. [verified]

### 6.3 Surveillance Indicator master list (Annexure-I to NSE/SURV/74008) — [verified]

| Code | Description | Short Code |
|---|---|---|
| 99 | Shortlisted under Graded Surveillance Measure | GSM - 0 (99) |
| 1–6 | GSM Stage I / II / III / IV / V / VI | GSM - I…VI |
| 11, 12 | ST-ASM Stage I / II | STASM - I (11), STASM - II (12) |
| 13–16 | LT-ASM Stage I / II / III / IV | LTASM - I…IV |
| 20 | IBC – Receipt of Disclosure or Recommenced scrip | IBC - Receipt (20) *(earlier code 10, discontinued)* |
| 21, 22 | ASM IBC Stage I / II | IBC - I (21), IBC - II (22) |
| 23, 24 | ASM ICA (Inter Creditor Agreement) Stage I / II | ICA - I (23), ICA - II (24) |
| 25 | Company with high promoter Encumbrance | High promoter Encumbrance (25) |
| 26 | High promoter **and** non-promoter Encumbrance | (26) |
| 30 | Information list (unsolicited SMS) | SMS Info. List (30) |
| 31 | Current watch list (unsolicited SMS) | SMS watch List (31) |
| 32 | **Unsolicited Video** | Unsolicited Video (32) |
| 33 | Unsolicited Video and LTASM Stage IV | (33) |
| 34, 35 | **ESM Stage I / II** | ESM - I (34), ESM - II (35) |
| 36, 37 | ESM Stage I / II **and** GSM Stage 0 | (36), (37) |
| 50–53 | LTASM Stage I–IV **and** GSM Stage 0 | (50)–(53) |
| 54, 55 | STASM Stage I / II **and** GSM Stage 0 | (54), (55) |
| 56, 57 | Encumbrance variants **and** GSM Stage 0 | (56), (57) |
| 58–61 | ASM IBC / ASM ICA Stage I–II **and** GSM Stage 0 | (58)–(61) |
| 62–66 | IBC-Receipt and GSM Stage 0; GSM Stage I–IV and IBC-Receipt | (62)–(66) |

Note: Stages V and VI exist as indicator codes (5, 6) although the published GSM framework currently runs Stage 0 → Stage IV. Flag that rather than assert a six-stage framework.

### 6.4 GSM — current framework (2026)

**Latest framework update: NSE/SURV/74254, 15 May 2026, "Graded Surveillance Measure Framework – Update", effective from the quarterly review on 19 Jun 2026 (for quarter ended March 2026).** [verified] `https://nsearchives.nseindia.com/content/circulars/SURV74254.pdf`

**Shortlisting criteria** [verified]:

| | Mainboard | SME |
|---|---|---|
| **Criteria I** | Net worth ≤ Rs 10 cr **AND** Net Fixed Assets ≤ Rs 25 cr **AND** PE > 2× PE of Nifty 500 **OR** negative PE | Net worth ≤ Rs 5 cr **AND** NFA ≤ Rs 10 cr **AND** PE > PE of Nifty 500 **OR** PE ≤ 0 |
| **Criteria II** | Full market cap < Rs 25 cr **AND** PE > 2× Nifty 500 PE; **OR** negative PE with P/B > 2× Nifty 500 P/B or negative P/B | Full market cap < Rs 10 cr **AND** PE > Nifty 500 PE; **OR** negative PE with P/B > Nifty 500 P/B or negative P/B |

**Stage actions** [verified]:

| Stage | Surveillance action |
|---|---|
| **0** | Shortlisted and monitored for price movement; no trading restriction (indicator 99) |
| **I** | Applicable margin rate **100%** and price band of **5% or lower** as applicable |
| **II** | **Trade for Trade** with 5%-or-lower price band **+ Additional Surveillance Deposit (ASD) of 50% of trade value from the Buyers** |
| **III** | Trade for Trade with 5%-or-lower price band **+ trading permitted once a week (every Monday / 1st trading day of the week) + ASD 100% of trade value from Buyers** |
| **IV** | Same as III **plus no upward movement** |

**2026 changes (NSE/SURV/74254, from the Joint Surveillance Meeting of Exchanges and SEBI on 15 May 2026)** [verified] — these tighten the net materially:
- Exclusion **modified**: "Securities that are part of any Index (NSE or BSE)" → **"Securities that are part of (Nifty 500 / BSE 500) Index"**.
- Exclusions **removed** entirely: (1) institutional holding > 10% with no promoter offloading in 5 years and price within the 3-year high-low range; (2) **securities that paid a dividend for each of the last three preceding years**; (3) securities listed via Scheme of Arrangement (merger/demerger) in the last 1 year — replaced by explicit demerger/merger inheritance rules (if the parent is under GSM, demerged entities attract GSM; on merger, if any security was under GSM the resultant entity continues under it).

**Remaining exclusions** [verified]: price discovery pending (SEBI CIR/MRD/DP/01/2012 and /02/2012); securities under suspension; securities with derivative products; constituents of Nifty 500 / BSE 500; securities listed in the last 1 year through IPO.

**Review calendar** — NSE/SURV/72561 (1 Feb 2026) publishes the tentative schedule, which is itself an inbound date you must diarise [verified]:

| Quarter ended | Date of circular |
|---|---|
| December 2025 | 6 Mar 2026 |
| March 2026 | 19 Jun 2026 |
| June 2026 | 4 Sep 2026 |
| September 2026 | 4 Dec 2026 |

(If the date falls on a trading holiday, the circular is published the following working day.) Reviews use quarterly (mainboard) or half-yearly (SME) results filed under LODR within 45 days of quarter-end / 60 days for annual results. GSM lineage: NSE/SURV/34262 (23 Feb 2017, introduction) → 34321 → 38389 → 38638 → 42790 → 59425 (GSM for SME, 17 Nov 2023) → 64066 → 72561 → 74254.

### 6.5 ASM — current framework

**ST-ASM and LT-ASM stage actions** (NSE/SURV/46557, 4 Dec 2020, revised column — still the operative table per the index of NSE/SURV/74008) [verified] `https://nsearchives.nseindia.com/content/circulars/SURV46557.pdf`:

| Framework | Stage | Action |
|---|---|---|
| **Short Term ASM** | I | Applicable margin = higher of **50%** or existing margin, subject to max 100% |
| | II | Applicable margin = higher of **100%** or existing margin, subject to max 100% |
| **Long Term ASM** | I | Applicable margin **100% from T+3 day** |
| | II | Reduction of price band to next lower level **+ 100% margin from T+3** |
| | III | Further reduction of price band to next lower level **+ 100% margin from T+3** |
| | IV | **Settlement on Gross basis with 100% margin for all clients and 5% price band** |

(The pre-Dec-2020 "top 10 clients by gross traded value > Rs 10 lakh get 100% margin on gross traded value at EoD" rule was **discontinued w.e.f. 7 Dec 2020**. [verified])

Minimum retention 5/15 trading days per stage; stocks exit if they do not meet entry criteria at review; stocks moving to LT-ASM leave ST-ASM. ST-ASM Stage I also triggers the Exchange seeking clarification from the company and display of the names on a **Surveillance dashboard on the Exchange website**. [verified, NSE/SURV/74008 §5]

LT-ASM lineage: NSE/SURV/39265 → 45111 → 46557 → 48506 → 52090 (22 Apr 2022, shortlisting criteria, effective 2 May 2022) → **63362 (9 Aug 2024, "LT-ASM Framework on Equity Derivatives")** → 64066. ST-ASM lineage: 39265 → 46557 → 52144 (28 Apr 2022) → 58558 (25 Sep 2023, ST-ASM for SME Segment) → 64066. [verified]

**Sep 2024 change:** NSE/SURV/64066 (20 Sep 2024) **removed the PSU-company exclusion from all four frameworks (LT-ASM, ST-ASM, GSM, ESM)** with effect from 23 Sep 2024. [verified]

### 6.6 ESM — current framework (revised Jul 2025)

**NSE/SURV/69315, 25 Jul 2025, "Revision of Enhanced Surveillance Measure (ESM)", applicable from 28 Jul 2025.** [verified] `https://nsearchives.nseindia.com/content/circulars/SURV69315.pdf`

**Scope:** ESM is **not SME-only**. It applies to **all companies with market capitalisation less than INR 1,000 crore**, extended from SME-only to mainboard companies under that cap by NSE/SURV/63361 of 9 Aug 2024 (effective 13 Aug 2024). [verified]

**Shortlisting (Stage 1)** — either 1.1 or 1.2 [verified]:
- **1.1 High–Low price variation** (corporate-action adjusted) over 3 / 6 / 12 months ≥ **1 standard deviation** of the High-Low variation of all companies under INR 1,000 cr, **AND** minimum thresholds **3M > 75%, 6M > 100%, 12M > 150%**, **AND** positive close-to-close price variation over the last three months.
- **1.2 Close-to-Close price variation** over 3 / 6 / 12 months ≥ **1 standard deviation**, **AND** minimum thresholds **3M > 50%, 6M > 75%, 12M > 100%**.
- **Excluded:** securities on which derivative products are available.

**Stage actions (unchanged by the 2025 revision — only the criteria changed)** [verified]:

| Stage | Entry condition | Action |
|---|---|---|
| **I** | Meets entry criteria | **100% margin from T+2 day** **AND** **Trade for Trade** settlement with **5% price band** (or **2%** if the scrip is already in a 2% band) |
| **II** | Already in Stage I **and** either (a) close-to-close variation ≥ +15% in 5 consecutive trading days, **or** (b) monthly close-to-close variation ≥ +30%; **AND** PE ≤ 0 or PE > 2× Nifty 500 PE | **Trade for Trade with 2% price band** **AND** **100% margin** **AND** trading permitted with ±2% price band on all trading days **under Periodic Call Auction** |

**Review and exit** [verified]: stage-wise review **weekly**; eligible for exit after **90 calendar days** in the framework; a Stage-2 security must be held in Stage 2 for a **minimum of 1 month**, after which it may move to Stage 1 at weekly review if its close-to-close positive variation is < 15% in a month; exit is stage-wise and subject to not meeting entry criteria. On exit, the price band reverts to the pre-shortlisting band unless another surveillance framework applies, in which case that framework's band prevails.

Market Makers must still meet market-making obligations on ESM scrips (SEBI CIR/MRD/DP/14/2010, CIR/MRD/DSA/17/2010; NSE/SME/MEM/21427; NSE/SURV/63146). [verified]

ESM lineage: NSE/SURV/56948 (2 Jun 2023, introduction) → 57609 (18 Jul 2023) → 63361 (9 Aug 2024) → 64400 (4 Oct 2024) → 64066 (20 Sep 2024) → **69315 (25 Jul 2025)**. [verified]

### 6.7 Related measures in the same family you will also receive

All [verified, index of NSE/SURV/74008]: Periodic Call Auction for Illiquid Securities (NSE/CMTR/23063) · Periodic review of movement to/from **Trade for Trade** (NSE/SURV/33844, 58561) · **IBC / ASM-IBC** (NSE/SURV/55582; updated NSE/SURV/70074, 5 Sep 2025; further update NSE/SURV/75652, 7 Aug 2026) · **high promoter and non-promoter Encumbrance** under Reg. 28(3) SAST (NSE/SURV/51189 — issued near-weekly) · **high promoter pledge** (NSE/SURV/42507, 44169) · **low non-promoter holding** (NSE/SURV/55579) · **Inter Creditor Agreement** (NSE/SURV/52368) · **Deep OTM contracts** (NSE/SURV/42382) · **unsolicited SMS / videos on social media** (NSE/INVG/54165, 54196, 55766; NSE/INVG/45517) · **Cautionary Messages on Trading Terminal** (NSE/SURV/57778, 60281, 60574, 63563, 64402, 64924, 65097).

---

## 7. UCC rejections, mismatch files and KRA/CKYC-side rejections

**Governing document: NSE/ISC/73973, 30 Apr 2026, "Master Circular for Unique Client Code"** [verified] `https://nsearchives.nseindia.com/content/circulars/ISC73973.zip`
Supplemented by **NSE/ISC/75249, 17 Jul 2026, "General Operational Guidelines on Unique Client Code (UCC)"** [verified] `https://nsearchives.nseindia.com/content/circulars/ISC75249.pdf`

### 7.1 The files NSE pushes to you — explicitly enumerated

NSE/ISC/75249 §8 states outright: *"The Exchange disseminates below mentioned files to Members. Members are requested to actively monitor these files and initiate action, if any."* [verified]

| File / report | Exact name & path | Cadence |
|---|---|---|
| **Trading Status Report** (Permitted to Trade) | `SEG_TMCODE_UCC_TRADING_STATUS_DDMMYYYY_nn` on Extranet — CM `/Reports`, FO `/FAOFTP/Reports`, CDS `/CDSFTP/Reports`, CO `/COMTFTP/Reports`, DEBT `/DEBTFTP/Reports`, SLB `/SLBFTP/Reports` | Daily, **two batches: Batch 01 = UCCs permitted as at 14:30 hrs; Batch 02 = as at 22:00 hrs** |
| **Not Permitted to Trade Report** | `SEG_TMCODE_RECORDS_NOT_PERMITTED_TO_TRADE_DDMMYYYY_nn`, same segment paths | Daily, two intervals (**14:00 and 22:00 hrs**) |
| **Mobile Number Revocation List (MNRL)** | Member Portal > UCI Online > Download > **Report for disconnected Mobile numbers** | **Daily** |
| **Demat and Bank Account Validation Status** | `SEG_TMCODE_UCC_DEMAT_AND_BANK_ACCOUNT_VALIDATION_STATUS_DATE_SEQUENCE.csv` on Extranet | **EOD daily**; covers all active UCCs in CM and F&O, plus bank validation for UPI/block-mechanism clients |
| **PAN status report** | Member Portal > UCI Online > Other Options > **PAN status report** (any 10-day window) | On demand |
| **Mandatory (fields) Report** | Member Portal > UCI Online > Download > **Report for Mandatory Fields** — blanks / invalid / incomplete, **including PAN–Aadhaar Seeding status** | **Weekly** |
| **Full File Report** | Member Portal > UCI Online > Download > Full File > Request, then View Full File next working day | On demand — **max 5 requests/day, period ≤ 1 year** |

All [verified] from Part B of NSE/ISC/73973.

**The 22:00 cut-off is the operative rule:** *"UCCs identified as compliant by the Exchange at 22.00 hrs. on the previous day shall be considered as permitted to trade for the next trading day."* Under normal circumstances Batch 2 governs next-day order placement; in exigencies, Batch 1 is used. A non-compliant UCC that is fixed is permitted to trade **only on the next trading day**. [verified]

### 7.2 What makes a UCC "Permitted to Trade" (and therefore what the rejection files are telling you)

[verified, NSE/ISC/73973 §2(B)(e), per NSE/ISC/47869, 48165, 49094, 51754, 68187 and SEBI/HO/MIRSD/MIRSD-PoD1/P/CIR/2024/75]:
- **6 KYC attributes:** Name (as per PAN), complete address (incl. PIN code for Indian addresses), PAN, valid mobile number, valid email-id, **income details / range**.
- Custodian details for clients availing custodian services.
- **PAN verification status = "Approved"**.
- UCC in **"Active"** status.
- **PAN of the UCC is KRA compliant**.
- **Valid Primary Demat Account** in Cash Segment, as applicable.
- `BUYBACK***` codes must also be compliant.

### 7.3 PAN mismatch — the actual rule

[verified, NSE/ISC/73973 §5, per NSE/ISC/60830 of 23 Feb 2024]:
> **"W.e.f April 19, 2024 PAN Verification shall be considered successful only when the status of all the three parameters i.e. PAN, Client Name and Client Date of Birth / Date of Incorporation are successfully verified (i.e. they should completely match with the details available with Protean)."**

PAN status values returned: **Approved / Incorrect / Pending for verification**. [verified]
Corrections to Client Name or DOB/DOI **can only be done via an Unfreeze request** (single: Member Portal > UCI Online > Other options > Unfreezing request > New Request; bulk: Bulk upload-unfreezing, Annexure E format). The revised details are re-verified with Protean. [verified]

Demat format validation [verified, NSE/ISC/75249 §3]: NSDL = DP ID 8 characters (alpha/numeric) + BO ID 8 characters (numeric); CDSL = 16 characters (numeric). One account must be marked **Primary**. **Operational trap worth documenting:** *"Members are advised to include Demat account details in the UCC modification file only when there is a change… Submission of unchanged Demat details may result in re-verification by the Depositories and could impact the client's Permitted to Trade status."* [verified]

### 7.4 "Dealer PAN mismatch file"

**[unknown].** I found no NSE/BSE file or report by that name. The nearest verifiable items are:
- MSD alert **"Terminal PAN verification (Self-Trade)"** — *"Order entered by same client by entering erroneous PAN on one side and thereby resulting in self-trade"* [verified, NSE/SURV/44477 Annexure 1].
- **NSE/MSD/49030, 23 Jul 2021 — "User id – Updation of same PAN against multiple Algo terminals"** [verified from index, body not read].
- **NSE/MSD/58774, 5 Oct 2023 — "ENIT – User Trading Rights Module"** [verified from index, body not read].
Do not assert a "dealer PAN-mismatch file" without further confirmation.

### 7.5 KRA-side rejections — the exchange DOES push these, monthly, by name

This is a stream many write-ups miss. NSE issues a circular **every month** titled "Guidelines in pursuance of amendment to SEBI KYC (Know Your Client) Registration Agency (KRA) Regulations, 2011". Latest at research date: **NSE/ISC/76893, 14 Oct 2026, Circular Ref 44/2026** [verified] `https://nsearchives.nseindia.com/content/circulars/ISC76893.pdf` (prior: 76370 on 16 Sep 2026; 75724 on 13 Aug 2026; 75191 on 14 Jul 2026; 74672, 74160, 73745, 73218, 72795, 72265 — one per month through 2026).

**Files pushed at `https://enit.nseindia.com/MemberPortal/` → ENIT > Log > Downloads** [verified]:

| KRA Status | File Name |
|---|---|
| **On Hold** | `<TM Code>_Non-Validated_Clients_by_KRA` |
| **Not Available** (KYC never uploaded to KRA by the member) | `<TMcode>_KRA_NOT_AVAILABLE` |
| **Demise** | `<TMcode>_Demise_Clients_by_KRA` |

Mechanics in the October 2026 cycle, illustrating the standard pattern [verified]:
- PANs uploaded to KRAs till **30 Sep 2026** whose primary KYC status is **"On-Hold"** → **not permitted to trade or square off open positions** w.e.f. **31 Oct 2026**.
- PANs reported as **Demised** till 30 Sep 2026 → member must mark the UCCs **"Closed"** in the Exchange UCC database **before 31 Oct 2026**, after due diligence.
- The Exchange flags these PANs (including Not Available and Demise) using the KRA data **as at 5 Oct 2026** and sets them Not Permitted to Trade from 31 Oct 2026.
- **"All PANs that become KRA compliant subsequently, will be permitted to trade on T+1, based on the information received from KRA by the Exchange on T Day."** ← that is your correction timeline.
- **"demise-related data is being shared by the KRAs on a daily basis"** (per SEBI/HO/OIAE/OIAE_IAD-1/P/CIR/2023/0000000163 dated 3 Oct 2023, centralised mechanism for reporting the demise of an investor through KRAs). Member must block all debit transactions in deceased investors' accounts.

**Only "KYC Registered" or "KYC Validated" clients may trade.** [verified, NSE/ISC/73973 §8(c) and NSE/ISC/75249 §4, which words it as **"KRA Validated" or "KRA Registered"**]

**One-off 2026 deadline:** **NSE/ISC/73596, 2 Apr 2026, "Unique Client Codes (UCCs) with Non-Verified KRA Status"** required members to **mark inactive/close all existing UCCs not verified by KRA by 30 April 2026**, with *"Any Non-Compliance with this requirement shall be viewed seriously by the Exchange."* [verified] `https://nsearchives.nseindia.com/content/circulars/ISC73596.pdf`. Related: **NSE/ISC/72532, 30 Jan 2026, "Extension for Upload of Client Records to KRAs for Validations"**.

### 7.6 UCC upload rejection reasons

The UCC master circular's **API error codes** are documented [verified, ISC73973 Annexures C/D]: 201 Invalid Request / Received Null or Empty UciApiRequest · 203 Invalid UciApiRequest / Invalid member code · 204 Invalid/Empty/Null Request · 207 Invalid member code · 400 Bad Request – Malformed/Invalid Request Data · 401 Unauthorized – Invalid JWT Token (Authentication Failed) · plus "Validation Failed – ucc is invalid" and field-level messages such as "…is Invalid Email ID".

A **field-by-field rejection-reason catalogue** for the bulk upload file is **[unknown]** at this level of detail — it lives in Annexures A/B of ISC73973 (which I extracted but which are large field-format tables rather than a labelled error-code list). If you need the full list, the authoritative place is Annexure A (new-client bulk upload) and Annexure B (bulk modification) inside `ISC73973.zip`.

**Live endpoints** [verified, ISC73973 §2(A)]: UCI-Online at `https://enit.nseindia.com/MemberPortal/` and `https://inspection.nseindia.com/MemberPortal/`; UAT at `https://lama.uat.nseindia.com/MemberPortalRevamp/`. APIs: `https://api.nseindia.com/uciservice/api/auth`, `/clientupload`, `/getpanstatus`, `/getuccpanstatus`; UAT at `https://clientprofilinguat.nseindia.com/uciservice/api/...`.

**Client-status change (effective 24 Jul 2026)** [verified, NSE/ISC/75249]: the "Client Status" module in UCI-Online **no longer permits Inactive → Active**. That transition must now go through **"Query Client"**, **"New Client Bulk Upload"**, or the **Client Profiling API**. Active→Inactive, Active→Close and Inactive→Close remain in the module.

### 7.7 Related inbound UCC-adjacent streams

- **NCL/CMPT/73380, 20 Mar 2026 — "Information of Inactive Custodial Participant Codes to Trading Members"** (updated by NCL/CMPT/76493, 23 Sep 2026). [verified from index; body not read]
- **NSE/ISC/60116, 4 Jan 2024 — "Multiple UCC with same email address and mobile number"**. [verified from index]
- **NSE/ISC/68832, 30 Jun 2025 — "Updation of Account Type Field in UCC database"**. [verified from index]

---

## 8. What is new in 2026 (and late 2025)

### 8.1 Reversal Trade Cancellation Mechanism (RTCM) — the biggest new inbound stream

**NSE/SURV/74022, 30 Apr 2026, "RTCM in Equity & Equity Derivatives Segment (Five trading days horizon)"** [verified] `https://nsearchives.nseindia.com/content/circulars/SURV74022.pdf` (and NSE/SURV/74137, 8 May 2026).

Built on the intraday RTCM introduced by NSE/SURV/62493 (18 Jun 2024, Equity) and NSE/SURV/65645 / 65736 / 66070 (Dec 2024 – Jan 2025, Equity Derivatives). The new layer monitors reversal trades between a **pair of PANs** (CP codes where applicable) on a **rolling 5-trading-day basis** and **cancels trades automatically**, intraday, when four thresholds are simultaneously breached (reversal quantity vs market gross traded quantity; reversal ratio across 5 days; aggregated square-off difference across 5 days; per-PAN reversal quantity vs that PAN's total quantity that day).

**What you receive** [verified]:
- **A message on the trading terminal:** `Trade CXL: <Trade details> Trade Cancelled by Exchange User Id (Dealer ID)`.
- **Daily F&O eligibility file: `FO_RTCM_DDMMMYYYY.csv` at extranet `/faocommon/Surveillance/RTCM`.**
- **Monthly equity eligibility file: `CM_RTCM_mmmyyyy.csv` at extranet `/common/Surveillance/RTCM`.**

Other key points [verified]: **client code modification during market hours resulting in reversal is also cancelled**; checks run **from 10:30 a.m. (09:00–10:30 accumulated) until 3:00 p.m.** only; equity scope is all series (EQ, BE, BZ, SM, ST, SZ) excluding NSE Clearing approved securities, Nifty 500 constituents and ETFs; **implementation date of the 5-day mechanism "shall be intimated separately"** — so as of 15 Oct 2026 it is announced but not necessarily live. RTCM explicitly **does not absolve** the member of its obligations under NSE/INVG/46662 (abnormal/non-genuine transactions) or NSE/SURV/48818.

Operationally the exchange has been issuing an RTCM circular roughly monthly through 2026 (SURV72496 Jan, 72957 Feb, 73434 Mar, 73922 Apr, 74388 May, 74906 Jun, 75400 Jul, 75929 Aug, 76510 Sep). [verified from index]

### 8.2 Penalty on Abnormal / Non-Genuine Transactions — the "caution letter" stream

**NSE/INVG/46662, 16 Dec 2020**, reproduced in full at §34 of NSE/SURV/74008 [verified]:
> *"The Exchange shall send necessary **advice/caution letter** to the Trading members and initiate appropriate disciplinary actions against the members concerned in case the activity is observed to be abnormal/non-genuine. Exchange shall levy a **penalty of 100% of the traded value / profit made / loss incurred** as a result of the trades on the trading members for both profit and loss making abnormal / non-genuine transactions after following the due process & providing necessary opportunity to the trading member for clarification in the matter."*

The decision on whether trades are abnormal/non-genuine is the Exchange's and is "final and binding". Applicable across **Cash Market, Currency Derivatives, Equity Derivatives and Commodity Derivatives**. Indicative scenarios listed include fresh positions created very close to or on expiry, large quantities in the last half hour without change in beneficial ownership, and heightened attention where ASM/GSM/PCA/T2T apply.

### 8.3 Order-to-Trade Ratio — revised twice in 2026

**NSE/SURV/72668 (6 Feb 2026)** and **NSE/SURV/73597 (2 Apr 2026)** revise the OTR framework; **NSE/SURV/75524 (31 Jul 2026)** adjusts OTR and FutEq intraday monitoring for the new **Closing Auction Session (CAS)**. Current grid [verified, §18 of NSE/SURV/74008]:

| Daily algo order-to-trade ratio | Charge per algo order |
|---|---|
| < 50 | Nil |
| 50 to < 250 (incremental) | 2 paise |
| 250 to < 500 (incremental) | 10 paise |
| **500 to < 1000 (incremental)** | **15 paise** (was 10) |
| **1000 to < 2000 (incremental)** | **20 paise** (new) |
| **2000 or more (incremental)** | **25 paise** (new) |

Plus: ratio ≥ 2000 on three occasions in the previous 30 rolling trading days → **no orders for the first 15 minutes** of the next trading day (equity; risk-reduction mode continues in equity and currency derivatives). Penalised on **more than ten occasions in the previous 30 rolling trading days** → **proprietary trading rights suspended for the first trading hour** of the next day. **"Disablement / Suspension shall take place across all Exchanges."** Orders within **0.75% of LTP** are excluded from the ratio; SME, ETF and designated-market-maker securities are excluded in the equity segment; odd lot, auction, block, pre-open, post-close, PCA and IPO call auction sessions are excluded. OTR data is provided **daily in member-portal folders**. [verified]

### 8.4 Penalty rationalisation across exchanges

**NSE/INSP/70746 (10 Oct 2025)** then **NSE/INSP/73792 (17 Apr 2026)** standardise the disciplinary framework across *all* exchanges, based on a **SEBI-constituted Working Group with ANMI, BBF and CPAI**, SEBI-approved. Annexures 1.1–1.6 split actions by inspection, periodic submissions, membership compliance, investor grievances, **surveillance activities**, and **investigation activities**. Disablement notices under the surveillance annexure are **shared with all Exchanges**. [verified]

### 8.5 SEBI's cross-institution / "integrated surveillance" direction — what I could and could not confirm

**[verified] things that are genuinely cross-institutional and new:**
- **DoT Digital Intelligence Platform (DIP)** feeding the securities market: the **Mobile Number Revocation List (MNRL)** now reaches members as a daily UCI-Online report, per **SEBI letter SEBI/HO/MIRSD-PoD/P/OW/2025/13583/1 dated 19 May 2025** and **NSE/ISC/72805 dated 13 Feb 2026**. Also **NSE/COMP/74753, 17 Jun 2026 — "Integration and utilization of Department of Telecommunications' (DoT) Digital Intelligence Platform (DIP) to strengthen cyber fraud prevention"**.
- **NSE/COMP/73433, 23 Mar 2026 — SOP on the National Cybercrime Reporting Portal (NCRP) and the Citizen Financial Cyber Fraud Reporting and Management System (CFCFRMS)** — custody, restoration of money and grievance redressal.
- **Centralised demise reporting through KRAs**, daily, with per-member files (§7.5 above).
- **Cross-exchange enforcement**: disablement for quarterly-surveillance-report non-submission and for OTR breaches both operate **across all exchanges** (NSE/INSP/73792 Annexure 1.5; NSE/SURV/74008 §18).
- **Joint Surveillance Meetings of Exchanges and SEBI** are the explicit decision-making forum for GSM/ASM/ESM changes (named as such in NSE/SURV/74254, 69315, 64066), and NSE explicitly aligns penalty structures "in line with BSE Notice No. …" (NSE/SURV/67688). The frameworks are already *de facto* common across NSE and BSE.
- **Surveillance-software vendor empanelment** (NSE/INVG/71818, 15 Dec 2025) — a central register of acceptable surveillance tooling.
- **UDiFF (Unified Distilled File Formats)** standardisation of exchange→member interface files continues, with ISO tags as headers and standardised report names (`NCL_C_PNL01_...`). [verified, NCL/CMPT/73997 Part D and NCL/CMPT/53083]

**[unknown] — I could NOT verify any of the following, and you should not assert them:**
- A single **common/centralised alert dissemination platform** replacing NSE's MSD and BSE's e-BOSS. No circular I read announces one. As of 15 Oct 2026 they remain two separate systems.
- Any **new alert category added to the Annexure-I transactional alert list** since July 2021. The 12-alert list is unchanged.
- Any SEBI 2026 circular specifically titled around "integrated surveillance" of brokers. SEBI's circular listing is reachable at `https://www.sebi.gov.in/sebiweb/home/HomeAction.do?doListing=yes&sid=1&ssid=7&smid=0` but only serves the latest 25 and its POST pagination returned HTTP 530 from here.

---

## Gaps and cautions — what I could NOT verify

**Blocked at the network layer (not "doesn't exist"):**
1. **MCX in its entirety.** `www.mcxindia.com` returns 403 from the Akamai edge for every path tried (`/circulars`, `/api/CircularsAPI/GetCircularData`, direct `/docs/default-source/circulars/...` PDFs), and WebFetch gets 403 too. **Nothing MCX-specific in this report is first-hand.** What transfers safely: the SEBI commodity position-limit penalty circular of 9 Sep 2026 binds all commodity exchanges including MCX; NSE's commodity surveillance obligations circular (NSE/SURV/46161) shows the *pattern* but MCX's alert list, periodicity, portal name, file names and penalty mechanics are **[unknown]**.
2. **BSE's notice search API** (`api.bseindia.com`) is 403. Individual notice pages work by number, and I scanned several dates by brute force, but I could not do a keyword search across BSE notices. Consequently BSE coverage below is thinner than NSE's by construction, not by absence.
3. **BSE notice attachments.** The attachment download link is rendered via the blocked API, so I could **not read BSE Notice 20210701-30's "Annexure I"** (BSE's own transactional alert list). The body text is otherwise word-for-word identical to NSE/SURV/48818, so the list is **[likely]** identical — but mark it as unverified rather than asserting it.
4. **All web search.** The session's WebSearch budget (200/200) was consumed on the first call; DuckDuckGo, Bing (via WebFetch — returned unrelated cached garbage), Mojeek and lite.duckduckgo are all challenge-blocked from this host. So nothing here rests on secondary sources, which is good for accuracy but means I could not sanity-check against commentary.

**Substantive items I could not confirm:**
5. **"Clients trading in F&O aged 70+" — [unknown].** Not in NSE/SURV/48818, NSE/SURV/46161, NSE/SURV/74008 (154 pp.), NSE/INVG/65921 (ISF standards), NSE/INSP/56927 (QSB guidelines), NSE/SURV/44477 (MSD manual), or anywhere in 45,739 NSE circular subject lines 2018–2026. No age, DOB-as-risk-factor, "senior citizen", "elderly" or "70" reference exists. **Treat as broker-internal product-suitability, not a regulatory alert.**
6. **"Occupation mismatch" alert — [unknown].** Occupation does not appear as an alert parameter in any primary source read. Income/net-worth disproportionality is real and mandated (three separate alerts); occupation is not.
7. **"Dealer PAN-mismatch file" — [unknown].** No file by that name found. Nearest verified items: the MSD "Terminal PAN verification (Self-Trade)" alert; NSE/MSD/49030 (same PAN against multiple algo terminals); NSE/MSD/58774 (ENIT User Trading Rights Module). I did not read the bodies of the latter two.
8. **A field-level UCC upload rejection-reason catalogue — [unknown] at that granularity.** API-level error codes are verified; the per-field bulk-upload reject reasons live in Annexures A/B of `ISC73973.zip` as format tables, not a labelled code list.
9. **BSE/ICCL penalty representation window — [unknown].** The **7 working days** figure is NCL-specific (NCL/CMPL/58063, via the NCL/CMPL/71983 FAQ). Do not generalise it to ICCL. The SEBI Aug 2025 MC/IC appeal architecture does apply to all MIIs.
10. **"ICCL" vs "BSECL" — [uncertain].** BSE's 2025 member deck is filenamed "…at BSECL" while its branding and signature say "Indian Clearing Corporation Limited". Confirm the current legal name before printing it.
11. **Circulars I located in the index but did not read the body of** — flagging so you don't inherit my gaps: NSE/SURV/71090 (read only as summarised in SURV74008), NSE/SURV/75524 (CAS impact on FutEq/OTR), NSE/SURV/72668 & 73597 (OTR revisions, read only as consolidated), NSE/INVG/71818 (vendor empanelment, read only as summarised), NSE/ISC/72805 (MNRL), NCL/CMPT/73380 (inactive CP codes), NSE/INSP/70746 (Oct 2025 penalty standardisation), NSE/SURV/52144 (ST-ASM 2022 framework — scanned PDF), NSE/SURV/63362 (LT-ASM on equity derivatives).
12. **GSM Stage V and VI — [uncertain].** Surveillance indicator codes 5 and 6 exist in the master list, but the published GSM framework (NSE/SURV/74254, May 2026) defines only Stage 0 → Stage IV. Describe the indicator list as carrying codes for V and VI without asserting a live six-stage framework.
13. **RTCM 5-day mechanism go-live — [unknown].** NSE/SURV/74022 §15: *"The implementation date of the 5-day RTCM mechanism shall be intimated separately."* The intraday RTCM is live; the 5-day layer may not be.
14. **Figures that are widely repeated online but which I want to explicitly correct:** the margin "5%" is a **per-day** rate beyond 3-consecutive-days or 5-days-in-a-month, **not** a flat repeat-offence slab; the client position-limit penalty is "1% of value **or** Rs 1,00,000, **whichever is lower**" (a cap, not a floor); and the surveillance quarterly-report penalty is **no longer** Rs 10,000/20,000 per day — NSE/INSP/73792 of 17 Apr 2026 replaced it with the Rs 500/1,000-per-day + disablement ladder.

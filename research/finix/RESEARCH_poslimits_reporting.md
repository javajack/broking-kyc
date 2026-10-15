# RESEARCH: position limits, prop/employee trading, AP oversight, UCC and client-data submissions

Research date 2026-10-15. Recovered from subagent transcript.

---

Research complete. Here are the findings.

---

# Broker reporting & monitoring obligations — greenfield NSE + BSE + MCX member
**Research date: 2026-10-15**

## Method note (affects evidence quality — please read)

The `WebSearch` tool budget for this session was already exhausted before I began, and every search engine I tried was blocked to `curl` (DuckDuckGo/Mojeek = CAPTCHA, SearxNG instances = challenge pages, Bing = returned keyword-unrelated spam results). So **no search engine was used at all**. Instead I navigated primary-source indexes directly:

- **SEBI** — drove `sebi.gov.in/sebiweb/home/HomeAction.do?doListing=yes&sid=1&ssid=7` with `search=`/`fromDate=`/`toDate=`/`nextValue=` params, then pulled each circular's `sebi_data/attachdocs/...pdf` and ran `pdftotext`.
- **NSE** — the circulars JSON API `https://www.nseindia.com/api/circulars?fromDate=DD-MM-YYYY&toDate=DD-MM-YYYY` is open (note: the documented `from_date`/`to_date` params are silently ignored; `fromDate`/`toDate` work). I indexed **40,030 NSE/NCL circulars (Jan-2018 → Oct-2026)** locally and searched subjects, then fetched PDFs/ZIPs from `nsearchives.nseindia.com`.
- **MCX** — reachable only with a full browser header set (UA + `Accept` + `Sec-Fetch-*` + `Referer`); its circular filter endpoint `/circulars/all-circulars/GetFilteredAnnouncements?CircularTitle=…` then works.
- **ICCL / BSECL** — `www.icclindia.com` is server-rendered and reachable.
- **BSE (the exchange)** — **NOT reachable.** `www.bseindia.com` is an Angular SPA that returns only nav chrome, and `api.bseindia.com` returns Akamai "Access Denied" under every header combination I tried. Wayback CDX timed out / rate-limited. **This is why the two BSE date sets you asked me to verify are marked [unknown] below.**

Everything tagged `[verified]` below was read by me in the primary document at the URL given.

---

# 1. Position limits and open-interest reporting / monitoring

## 1.1 The 2025 overhaul — the actual circulars

| Circular | Ref | Date | What it does |
|---|---|---|---|
| Measures to Strengthen Equity Index Derivatives Framework | SEBI/HO/MRD/TPD-1/P/CIR/2024/132 | 01-Oct-2024 | First mandated intraday monitoring of index-derivatives position limits (≥4 random snapshots), effective 01-Apr-2025 |
| Monitoring of position limits for equity derivative segment | SEBI/HO/MRD/MRD-PoD-2/P/CIR/2024/140 | 15-Oct-2024 | Introduced **previous-day market OI** as the monitoring base and the **passive-breach** carve-out; set TM (prop+client) index limits at ₹7,500 cr / 15% |
| Intraday Monitoring of Position Limits for Index Derivatives | **SEBI/HO/MRD/TPD-1/P/CIR/2025/41** | 28-Mar-2025 | Intraday monitoring starts 01-Apr-2025 but **no penalty, no violation** for intraday breaches of the then-existing notional limits |
| **Measures for Enhancing Trading Convenience and Strengthening Risk Monitoring in Equity Derivatives** | **SEBI/HO/MRD/TPD-1/P/CIR/2025/79** | **29-May-2025** | **The core rewrite**: FutEq OI, new MWPL formula, ban-period delta rule, index futures/options limits, single-stock limits |
| Framework for Intraday Position Limits Monitoring for Equity Index Derivatives | **SEBI/HO/MRD/TPD/CIR/P/2025/122** | **01-Sep-2025** | Separate, higher **intraday** FutEq limits for index **options** + expiry-day penalty |

**[verified]**
- https://www.sebi.gov.in/legal/circulars/oct-2024/measures-to-strengthen-equity-index-derivatives-framework-for-increased-investor-protection-and-market-stability_87208.html
- https://www.sebi.gov.in/legal/circulars/oct-2024/monitoring-of-position-limits-for-equity-derivative-segment_87567.html
- https://www.sebi.gov.in/legal/circulars/mar-2025/intraday-monitoring-of-position-limits-for-index-derivatives_93123.html (PDF: `.../attachdocs/mar-2025/1743161645941.pdf`)
- https://www.sebi.gov.in/legal/circulars/may-2025/measures-for-enhancing-trading-convenience-and-strengthening-risk-monitoring-in-equity-derivatives_94293.html (PDF: `.../attachdocs/may-2025/1748521484014.pdf`, 21 pages)
- https://www.sebi.gov.in/legal/circulars/sep-2025/framework-for-intraday-position-limits-monitoring-for-equity-index-derivatives_96376.html

### Open Interest is now delta-based (FutEq OI) — para 5.1 of 2025/79 [verified]
OI is measured **at portfolio level as net delta-adjusted open positions across futures and options for an underlying**. Long futures delta = +1 × notional; long call 0→+1; long put 0→−1; short call negative; short put positive. Market-wide FutEq OI = **gross addition of each UCC's net FutEq OI**. CCs disseminate FutEq OI per scrip/index and intimate entity-level FutEq OI through their portals. *"Already implemented"* per the para-6 phasing table.

### Index options — entity (PAN) level limits [verified]

| Basis | End of day | Intraday |
|---|---|---|
| Net FutEq | **₹1,500 cr** | **₹5,000 cr** |
| Gross FutEq (each of long-delta and short-delta separately) | **₹10,000 cr** | **₹10,000 cr** |

- EoD figures: 2025/79 para 5.5.1.1; effective via glide path 01-Jul-2025 → 05-Dec-2025, **normal implementation 06-Dec-2025** (para 6 table).
- Intraday figures: 2025/122 paras 4.1–4.2, effective **01-Oct-2025**; the expiry-day penalty limb (para 4.7) effective **06-Dec-2025**.
- The consultation paper (24-Feb-2025) had proposed much tighter numbers (EoD net ₹500 cr / gross ₹1,500 cr; intraday net ₹1,000 cr / gross ₹2,500 cr) — recorded in 2025/122 para 1 and **superseded**. Don't quote those as live limits.
- Restricted to **index options only** (2025/122 para 4.10).
- NSE restates both EoD and intraday numbers: NSE/SURV/70553 (30-Sep-2025) Annexure 1 paras 2.1–2.2, and NSE/SURV/74008 (Apr-2026 Surveillance consolidated circular) item 31 paras 1.1–1.2. **[verified]** https://nsearchives.nseindia.com/content/circulars/SURV70553.pdf , https://nsearchives.nseindia.com/content/circulars/SURV74008.pdf

### Index futures — entity level, **gross notional** basis [verified]
(2025/79 para 5.5.2; Annexure-1 clause 1.3.2.2.2; NSE/SURV/76750 06-Oct-2026)

| Participant | Index futures limit |
|---|---|
| FPI Cat I / Mutual Funds / **Trading Member (Proprietary)** / **Client** | higher of **₹500 cr** or **15%** of market index-futures OI |
| FPI Cat II (other than individuals, family offices, corporates) | higher of ₹500 cr or **10%** |
| FPI Cat II (individuals, family offices, corporates) | higher of ₹500 cr or **5%** |

Computed **gross** at MF level, **net** at FPI / client / MF-sub-scheme / proprietary level (Annexure-1 cl. 1.3.2.2.3).

⚠️ **Correction worth carrying into the docs:** the older per-category rupee figures (₹300 cr for FPI-II non-individual, ₹100 cr for FPI-II individual) that appear in NSE/SURV/67436 (03-Apr-2025) were **superseded w.e.f. 01-Jul-2025** — all three categories are now **₹500 cr** with the %-of-OI leg differing (15/10/5). NSE/SURV/76750 is the clean current source. **[verified]** https://nsearchives.nseindia.com/content/circulars/SURV76750.pdf

### Trading-member level (prop + client), index futures AND index options [verified]
**Higher of ₹7,500 cr or 15% of market OI** in that index's futures (resp. options) contracts, measured on gross notional basis — from 15-Oct-2024. Source: 2025/79 Annexure-1 cl. 1.3.2.3.1 & 2.3.2.3.1; NSE/SURV/74008 item 31 paras 3.1–3.2; NSE/SURV/76750.

### Additional exposure against holdings (the "hedge" leg) [verified]
2025/79 para 5.5.3 / Annexure-1 cl. 1.3.2.2.1:
- Aggregate **short** index positions (short futures + short calls + long puts) ≤ **holding of stocks** — *sourced by the exchanges directly from the depositories*.
- Aggregate **long** index positions (long futures + long calls + short puts) ≤ holding of **cash & cash equivalents, G-Secs, T-Bills and similar** (**excluding bank guarantees**, per NSE/SURV/74008 cl. 2.1.2) — *"The members of the respective entities shall report the same to Clearing Corporation."* **← this is a member reporting obligation; see §1.5.**

### Single stocks — entity-level limits recalibrated to new MWPL [verified]
2025/79 para 5.8.1, effective **01-Oct-2025**; restated in NCL/CMPT/73997 (F&O consolidated, 30-Apr-2026) Item 11:

| Entity | % of MWPL |
|---|---|
| Client / NRI | 10% |
| Trading Member (Proprietary) | 20% |
| Trading Member (Prop + Client) / FPI Cat I / MF | 30% |
| FPI Cat II (non-individual) | 20% |
| FPI Cat II (individual/family office/corporate) | 10% |

https://nsearchives.nseindia.com/content/circulars/CMPT73997.zip (Item 11.1–11.3); same percentages on ICCL's page https://www.icclindia.com/static/Risk_Management/mwpl.aspx **[verified]**

Options-on-futures in **commodities**: client/member numeric limits are **twice** the corresponding futures numbers; positions may exceed futures limits on devolvement and must be brought back **within two trading days of options expiry** (NCL/COM/74020 Item 8.2) **[verified]**.

## 1.2 Intraday monitoring of index-derivatives limits

| Question | Answer | Evidence |
|---|---|---|
| When did it start? | **01-Apr-2025** (monitoring only, no penalty) | SEBI 2025/41 para 3.1 **[verified]** |
| How many snapshots? | **Minimum 4 random snapshots** per trading day, in pre-defined windows; from 01-Oct-2025 at least one must fall **14:45–15:30** | SEBI 2025/122 para 4.3; NSE/SURV/70553 cl. 3.3 **[verified]** |
| 5th snapshot? | From **31-Jul-2026**, because of the Closing Auction Session: **no snapshot** from CAS start until the index equilibrium price is determined, and an **additional window for a 5th snapshot** runs from equilibrium-price determination to **15:40**. Close price of the index is used for delta and valuation in any post-equilibrium snapshot; time-to-expiry in Black-Scholes uses the revised **15:40** derivatives close on expiry day | NSE/SURV/75524 (31-Jul-2026) **[verified]** https://nsearchives.nseindia.com/content/circulars/SURV75524.pdf |
| Cure period | If a breach is seen, an **additional snapshot 15 minutes later**. Breach persisting in both = **provisional breach**, intimated to TM/CM and client by email EOD/T+1. After allowing cash-equivalent / stock-holding benefit it becomes a **final breach**. **The 15-min cure does not apply to snapshots taken after 14:45** | NSE/SURV/70553 cl. 3.9–3.14; NSE/SURV/75524 **[verified]** |
| Volatility / price inputs | Volatility = **previous day EOD** (higher of underlying annualised vol and futures annualised vol) — deliberately, so members can replicate the model without knowing snapshot timing. Underlying price = **real-time index value at snapshot**. Same-day-expiry contracts **are** included | NSE/SURV/70553 cl. 3.5–3.7, Annexure 2 (FutEq of call = N(d1); of put = N(d1)−1) **[verified]** |
| Do penalties apply intraday? | **Index futures: no** — "no penalty … such intraday breaches shall not be considered as violations, until further directions" (still the text in the Apr-2026 consolidated circular). **Index options: yes, but only on expiry day** — ASD from **08-Dec-2025**, at **1.5× the computed ASD**, blocked for one month. ASD is **not** applicable to non-expiry-day intraday breaches | SEBI 2025/41 para 3.2; SEBI 2025/122 para 4.7; NSE/SURV/71673 (05-Dec-2025) **[verified]** https://nsearchives.nseindia.com/content/circulars/SURV71673.pdf |
| Non-penal consequence of intraday breach | Exchanges must **examine trading patterns**, **seek the rationale for the positions from the client**, examine the entity's trading in index constituents, and **discuss the instance with SEBI in the surveillance meeting** | SEBI 2025/122 para 4.6 **[verified]** |

### "Passive breach" [verified]
Positions are tested against limits computed from the **total market OI at the end of the previous day's trade**. If market OI falls, an entity can breach a %-linked limit **without trading at all** — such cases "shall not be considered as violation", no penalty, no unwinding required. Origin: SEBI 2024/140 para 3; restated SEBI 2025/79 paras 5.5.2.5.1–3 and Annexure-1 cl. 1.3.5 / 2.3.2.3.4.

Two operational subtleties NSE adds, both **[verified]** (NSE/SURV/74008 item 31 cl. 3.5.4 worked example):
1. Passive-breach relief only applies to **limits linked to % of market OI** — not to the fixed ₹ legs.
2. Once an entity has been **penalised** for an active breach, it must thereafter stay at or below the *reduced* final limit; a subsequent day's reduction to below the *old* limit is still a breach. (In NSE's own table: position 1301 on 07-Jun with limit 1200 → penalty; next day position 1199 vs limit 1197 → penalty again.)

## 1.3 MWPL and ban period as of 2026

**MWPL definition** (2025/79 para 5.2, effective **01-Oct-2025**) **[verified]**:
> **lower of (a) 15% of free float and (b) 65 × market-wide Average Daily Delivery Value (ADDV) across CCs, subject to a floor of 10% of free float**, recalculated **every three months** on rolling 3-month ADDV.

This replaced the old flat *20% of non-promoter holding*. NSE adds: MWPL applies for the next **3 calendar months**, is disseminated on CC websites and by circular **by the 20th of the last month of the reference quarter**; corporate actions trigger an adjustment-factor revision on ex-date (NCL/CMPT/73997 cl. 11.4) **[verified]**. ICCL states the identical formula **[verified]** https://www.icclindia.com/static/Risk_Management/mwpl.aspx

**Ban-period mechanics** [verified]:
- Entry: at EOD, if **market-wide FutEq OI across exchanges > 95% of MWPL** → scrip in ban from the next trading day (2025/79 para 5.2.6; NCL/CMPT/73997 cl. 11.4.1 & 16.13.1).
- Exit: normal trading resumes only when combined FutEq OI across exchanges falls to **80% or below** of MWPL.
- **The rule changed from "no fresh positions" to a delta test** (2025/79 para 5.3, effective 01-Oct-2025): any trading after entry into ban must **reduce the entity's FutEq OI on an EoD basis**. A **sign change of delta is not an acceptable reduction**. **Passive increase in FutEq OI from underlying price movement is not a breach.** SEBI's Table 2 illustration: long 1 future, then adding a long put (negative delta) or a short OTM call is *permissible*; going to long 2 futures + long put + short call is *not*.
- NSE/NCL operating detail (NCL/CMPT/73997 cl. 16.13.2) **[verified]**: Day-1 EOD positions are stored as **base position**; from Day 2 the base position is revalued using the **2 PM intraday delta file** `Contract_Delta_DDMMYYYY_i04.csv` and compared with Day-2 EOD positions × the same 2 PM delta. Base position updates at EOD only if the entity actually traded to reduce FutEq OI (or FutEq unchanged but actual open positions changed). The 2 PM snapshot is explicitly described as giving members a **2 PM–3:30 PM window to fix client positions and avoid penalty**.
- **Ban-period penalty**: 1% of violation value (violated FutEq quantity × underlying price), **min ₹5,000, max ₹1,00,000 per entity per stock per day**, continuing while the violated quantity > 0 and the stock remains in ban (NCL/CMPT/73997 cl. 16.13.5) **[verified]**.
- **Intraday MWPL monitoring** (2025/79 para 5.4, effective **03-Nov-2025**): exchanges check MWPL utilisation **at least four random times** per session, may levy **Additional Surveillance Margin**, and must report significant utilisation / breach of MWPL to SEBI in the **fortnightly surveillance meeting** **[verified]**.
- Files: banned-securities and combined-OI (incl. delta-equivalent) files are published daily — ICCL exposes `BannedSecurities.zip`, `CCPCombinedOI.zip`, `combineoi_deleq.zip`; NSE's cross-exchange MWPL file format is Part C(41) of the NCL F&O consolidated circular **[verified]**.

## 1.4 Position-limit **penalties** (equity derivatives) — NSE/NCL [verified]
(NCL/CMPT/73997 cl. 16.6–16.8)

- **TM / FPI / MF level breach**: lower of (1% of value of excess quantity at CM-segment closing price) or **₹1,00,000** per entity per stock, **minimum ₹5,000**; referral to Member Committee from the **11th instance** in a calendar quarter.
- Plus **additional margin**, slab-wise on breach %: 100–<110% → 5%; 110–<125% → 10%; 125–<150% → 15%; ≥150% → 20%, applied on (underlying price × breach quantity), **from the first instance in a calendar quarter**, computed EOD and blocked from the **clearing member's proprietary collateral** on T+1 before market open, released on T+1 once within limits.
- **Client / NRI / FPI Cat-II individual / MF scheme breach**: same 1% / ₹1,00,000 / ₹5,000 structure, **per day of violation**, charged to the clearing member who may recover from the client.
- **EoD breach of %-of-market-OI index limits**: monthly slab penalty — 1st instance **NIL**; 2nd–5th ₹5,000 each; 6th–10th ₹20,000 + ₹10,000 per instance; **11th onwards** ₹70,000 + ₹1,000 × cumulative instances (₹11,000 for the 11th, ₹12,000 for the 12th …) + Member Committee referral (NSE/SURV/74008 item 31 para 4) **[verified]**.
- **Breach of the holdings/cash-backed additional exposure limits**: additional deposit equal to the **margin chargeable on the excess position**, **retained by the exchange for one month** (2025/79 Annexure-1 cl. 1.3.2.2.5, 2.3.2.2.4) **[verified]**.

## 1.5 What the MEMBER must REPORT vs what the exchange computes

**The exchange/CC computes and pushes; the member reports only four things.** This is the single most useful framing for your docs.

### Exchange/CC → member (member does not report these)
| Artefact | Detail | Evidence |
|---|---|---|
| Entity-level FutEq OI | CCs intimate entity-level FutEq OI through their portal | SEBI 2025/79 cl. 5.1.3 **[verified]** |
| `F_CM_DELOI_<MEMBER CODE>_DDMMYYYY.csv.gz` / `F_TM_DELOI_…` | Futures-Equivalent Open Interest report, at `FAOFTP/F<MEMBER CODE>/REPORTS`; fields: CM code, TM code, Client/CP code, Symbol, Gross OI, **Net Delta OI** | NCL/CMPT/73997 Part D **[verified]** |
| `Contract_Delta_DDMMYYYY_inn.csv` (intraday, batch nn) and `Contract_Delta_DDMMYYYY.csv` (EOD) | Per-contract delta factors, at `FAOFTP/FAOCOMMON/Limit Files/` | NCL/CMPT/73997 Part D **[verified]** |
| `oi_cli_limit_DD-MMM-YYYY.lst` | Client-level position-limit file. **2026 change: from 02-Nov-2026 this file carries STOCKS ONLY** (previously index + stocks) | NCL/CMPT/76766, 07-Oct-2026 **[verified]** https://nsearchives.nseindia.com/content/circulars/CMPT76766.pdf |
| `Index_deriv_pos_limit_DDMMYYYY` | **New** F&O Index Derivatives Position Limit file (fields: `index, instrument, qty_limit, category`), published from **05/06-Oct-2026** at Market Data → Derivatives → Daily Reports (https://www.nseindia.com/all-reports-derivatives) | NSE/SURV/76750, 06-Oct-2026 **[verified]** |
| Glide-path intimation (historic) | Until 05-Dec-2025: exchanges intimated entity + TM/CM **by 9 PM on T** if FutEq OI in any index's options exceeded the limit | SEBI 2025/79 cl. 5.5.4.1 **[verified]** |
| BSE/ICCL equivalents | `ICCL_EDX_CLPosLim_<DDMMYY>.zip` and `ICCL_EDX_TMPosLim_<DDMMYY>.zip` (client- and TM-level position limit files), plus MWPL/OI files | https://www.icclindia.com/static/Risk_Management/mwpl.aspx **[verified]** |

### Member → exchange/CC (actual reporting obligations)

**(a) Cash & cash-equivalent reporting — the "RPT" file.** To get the benefit of the long-side additional-exposure limb, the **clearing member** reports the entity's cash/cash-equivalent holdings to the CC. Format **[verified]** (NSE/SURV/74008 cl. 2.2.3):

| Trade Date | TM/CP Code | UCC Code | PAN | Index | Allocated Value | Total Reported value |
|---|---|---|---|---|---|---|

- Reported **index-wise**; total allocation across indices must not exceed the total reported value.
- Excludes bank guarantees. CM may report on the basis of visibility the TM/custodian has (ledger balance, G-Sec, liquid-fund holdings through that CM).
- Channel: email — **`rpt-ncl@nsccl.co.in`** (NCL) and **`Collaterals@icclindia.com`** (ICCL). Timing in the circular text: **T+1 by 12:00 noon**, but that sentence is prefaced "**Till December 05, 2025**" and the Apr-2026 consolidated circular still carries it unchanged — **[uncertain]** what the post-glide-path timing formally is. NSE/SURV/71673 confirms RPT reporting **continues** post-Dec-2025 ("benefit of cash and cash equivalents … will be provided as per the index wise allocation provided by the clearing member in the RPT reporting"), and NSE/SURV/70553 cl. 3.17.2 points to NSE/SURV/68845 para 2 for the framework. **Correctness of the reported data is expressly the CM's/TM's responsibility and records must be preserved for verification.**
- Short-side benefit needs **no member report** — stock holdings are pulled from NSDL/CDSL for the breaching PANs at EOD and valued at T-day close on T+1 (NSE/SURV/70553 cl. 3.17.1). No benefit for pay-out shortages; on a settlement holiday holdings are taken post-settlement **[verified]**.

**(b) The 15% / persons-acting-in-concert disclosure — the one you asked about.** **[verified]**
> "Any person or persons **acting in concert who together own 15% or more of the open interest on a particular underlying index** is required to **report this fact to the Exchange/Clearing Corporation**. Failure to do so shall be treated as a **violation** and shall attract appropriate penal and disciplinary action in accordance with the Rules, Byelaws and Regulations."

- Format: **Part C (49) — "Format of letter to be provided by Clearing Member for disclosure of Client Position in Index Based Contracts"** of **NCL/CMPT/61801 dated 29-Apr-2024**.
- Channel: email **`pac_position@nse.co.in`** ("pac" = persons acting in concert).
- Sources: NSE/SURV/67436 (03-Apr-2025) cl. 2.1.12; **still live** in NSE/SURV/74008 (30-Apr-2026) item 31 cl. 2.7.
- ⚠️ Caveat: I could **not** retrieve the Part C(49) template itself. The Apr-2026 NCL F&O consolidated circular (NCL/CMPT/73997) has **dropped index position limits entirely** from its Part A/B and its Part C no longer contains an "Index Based Contracts" annexure — index limits migrated to the Surveillance stream. So the surveillance circular points at a **2024** Part C that the **2026** consolidated circular no longer carries. Flag this as a live ambiguity for the member to confirm with NSE. **[uncertain]**
- A parallel obligation applies to FPI Cat-II individuals/family offices/corporates and MF schemes owning ≥15% of OI in all derivative contracts on an index (NSE/SURV/67436 cl. 12.10.1) **[verified]**. ICCL's equity-derivatives consolidated circular has the equivalent for FPI Cat-III / MF schemes **[verified]**.

**(c) Breach self-reporting by FPIs/MFs.** "It shall also be obligatory on FPI/MFs to report any breach of position limits by them / their sub-schemes to the Exchange" and ensure no fresh positions in that underlying — again to **`pac_position@nse.co.in`** (NSE/SURV/74008 cl. 2.5) **[verified]**.

**(d) Client-level limit enforcement (not a filing, but a hard member duty).** Client limits are monitored **at UCC level** and **across all members a client trades through**. On violation the TM/CM must ensure the client (i) takes **no fresh positions** and (ii) **reduces** to within limits (NCL/CMPT/73997 cl. 11.3.2) **[verified]**. MCX reiterates that members must monitor open position limits **intraday as well as EOD**, commodity-wise, across all limit categories, and must have internal RMS controls preventing order entry that would breach limits (MCX/S&I/749/2024, 11-Nov-2024) **[verified]**.

**What is NOT a member filing:** there is **no** position-limit or open-interest return in the consolidated "Reporting Requirements" table (Section X) of the SEBI Master Circular for Stock Brokers (SEBI/HO/MIRSD/MIRSD-PoD/P/CIR/2025/90, 17-Jun-2025) — I read all 37 rows. Position-limit obligations live entirely at exchange/CC level. **[verified]** https://www.sebi.gov.in/legal/master-circulars/jun-2025/master-circular-for-stock-brokers_94623.html

**NRI change [verified]:** SEBI/HO/MIRSD/MIRSD-PoD/P/CIR/2025/109 (29-Jul-2025) **removed** the mandatory requirement for NRIs to notify clearing-member names and be assigned a **CP code**. NRIs trading ETDs without a CP code are now monitored **like ordinary clients**, and NRI limits = client-level limits. Members had to offer existing NRI clients an **exit from CP code on email request within 90 days**. https://www.sebi.gov.in/legal/circulars/jul-2025/operational-efficiency-in-monitoring-of-non-resident-indians-nris-position-limits-in-exchange-traded-derivatives-contracts-ease-of-doing-investment_95679.html

## 1.6 Currency derivatives position limits (NSE/NCL, Apr-2026 consolidated) [verified]
NCL/CD/73998, 30-Apr-2026, Item 9 — https://nsearchives.nseindia.com/content/circulars/CD73998.zip

| Pair | TM (non-bank & bank) | TM — RBI-authorised bank | **Non-bank broker proprietary** | **Client** | FPI I / FPI II non-indiv | FPI II indiv/FO/corp |
|---|---|---|---|---|---|---|
| USD-INR | 15% of OI or **USD 100 mn** | 15% or **USD 1 bn** | 15% or USD 50 mn | 6% or USD 20 mn | 15% or USD 100 mn | 6% or USD 20 mn |
| EUR-INR | 15% or EUR 50 mn | — | 15% or EUR 25 mn | 6% or EUR 10 mn | 15% or EUR 50 mn | 6% or EUR 10 mn |
| GBP-INR | 15% or GBP 50 mn | — | 15% or GBP 25 mn | 6% or GBP 10 mn | 15% or GBP 50 mn | 6% or GBP 10 mn |
| JPY-INR | 15% or JPY 2,000 mn | — | 15% or JPY 1,000 mn | 6% or JPY 400 mn | 15% or JPY 2,000 mn | 6% or JPY 400 mn |
| EUR-USD / GBP-USD / USD-JPY (cross) | 15% or EUR/GBP/USD 100 mn | — | 15% or 50 mn | 6% or 10 mn | 15% or 100 mn | 6% or 10 mn |

Also: proprietary **bank** brokers 15% of all-FCYINR OI or USD 200 mn combined; proprietary **non-bank** brokers 15% or USD 100 mn combined.

Key structural differences from equity:
- Limits linked to OI **apply at the time of opening a position**; a drop in total OI does **not** force unwinding, but the member/participant **cannot increase existing or create new positions** until compliant. (This is the original source of the "passive breach" logic that SEBI later imported into equity — NSE/SURV/67436 cl. 2.1.3.1 says the equity rule was adopted "in conformity with the extant practice in currency derivatives segment".) **[verified]**
- Client gross open position: long = long futures + long calls + short puts; short = short futures + short calls + long puts.
- **CC intimates the clearing member when a client exceeds the limit OR exceeds 3% of OI** — an early-warning tier **[verified]**.
- **Member reporting file**: clearing members must report, via a file, the details of clients wishing to take positions **beyond USD 100 mn** (equivalent) in INR contracts across all exchanges, and must submit an **Authorised Dealer/Custodian confirmation** — format **Part C (34) "Format for providing information of clients for position beyond USD 100 million"**. Basis: RBI/2019-20/210 A.P.(DIR Series) Circular 29 dated 07-Apr-2020 **[verified]**.
- NRI CP codes in CD segment: Part C(36) request format to **`cpcodecm@nsccl.co.in`** + Part C(37) AD Cat-I bank letter **[verified]**.
- IRD/91-DTB/MIBOR limits also in Item 9 (e.g. 8–11yr bucket: 10% of OI or ₹1,200 cr for TM/banks/PDs/MF-AMC; 3% or ₹400 cr for MF schemes and other clients) **[verified]**.

## 1.7 Commodity derivatives

### Framework [verified]
SEBI Master Circular for Commodity Derivatives Segment, **SEBI/HO/MRD/MRD-PoD-1/P/CIR/2023/136, 04-Aug-2023**, Chapter 3 — https://www.sebi.gov.in/legal/master-circulars/aug-2023/master-circular-for-commodity-derivatives-segment_74974.html (PDF `.../attachdocs/aug-2023/1691151096694.pdf` — note: the xref table is corrupt; `pdftotext` fails until you repair it with `gs -sDEVICE=pdfwrite`). **Still the operative master circular** — the Sep-2026 circular amends it rather than replacing it.

| Item | Agricultural | Non-agricultural |
|---|---|---|
| Client overall limit | Numeric value from "deliverable supply" by category (see 2026 change below) | **higher of** the Annexure-M numeric limit **or 5% of market-wide OI** |
| Member overall limit | **10× client numeric limit or 15% of market-wide OI, whichever is higher** | **10× client numeric limit or 20% of market-wide OI, whichever is higher** |
| **Near-month** client limit | **¼ of the overall client limit** | — (near-month limits are an agri construct) |
| **Near-month** member limit | **¼ of the overall member limit** | — |
| Exchange-wide limit | **50% of 'deliverable supply'** for the relevant year | — |
| Netting | All long and short positions across contracts added **separately**, higher of the two = overall position (**no netting**) | All long and short positions across contracts **netted out** |
| Near-month computation | Higher of long/short in near-month contracts; **netting near-month against far-month is NOT permitted**; at member level, client positions (incl. proprietary, treated as a client) are added **without netting** | — |
| Proprietary | Member's proprietary positions are **treated and computed as client positions** | same |
| Clubbing | Exchanges must club positions of clients/members "acting in concert" — Annexure I | same |

**Non-agri client numeric limits (Annexure M)** [verified] — identical in the SEBI master circular and NCL/COM/74020 Item 8:

| Commodity | Unit | Client limit | | Commodity | Unit | Client limit |
|---|---|---|---|---|---|---|
| Aluminium | MT | 25,000 | | Natural Gas | mmBtu | 6,000,000 |
| Brent Crude Oil | BBL | 400,000 | | Nickel | MT | 1,000 |
| Copper | MT | 7,000 | | Silver | MT | 100 |
| Crude Oil | BBL | 480,000 | | Steel | MT | 120,000 |
| Gold | Kgs | 5,000 | | Zinc | MT | 7,000 |
| Lead | MT | 3,500 | | | | |

(NCL's version adds ELECMBL 3,000,000 MWh and shows BRCRUDEOIL as 4,000,000 barrels — **[uncertain]** whether that is an NSE-specific contract-size difference or a typo vs SEBI's 400,000 BBL. Don't quote the Brent figure without checking the live exchange file.)

### Current MCX agri limits incl. near-month — effective 26-Oct-2026 [verified]
MCX/S&I/579/2026, 14-Oct-2026 — https://www.mcxindia.com/docs/default-source/circulars/english/2026/october/circular---579---2026.pdf

| Commodity | Unit | Client overall | Member overall | **Client near-month** | **Member near-month** |
|---|---|---|---|---|---|
| Cotton | Bales | 600,000 | 6,000,000 | 150,000 | 1,500,000 |
| Kapas | MT | 290,900 | 2,909,000 | 72,725 | 727,250 |
| Cottonseed Wash Oil | MT | 26,000 | 260,000 | 6,500 | 65,000 |
| Crude Sunflower Oil* | MT | 61,600 | 616,000 | 15,400 | 154,000 |
| Mentha Oil | MT | 390 | 3,900 | 97.50 | 975 |
| Cardamom | MT | 240 | 2,400 | 60 | 600 |

*launched 12-Oct-2026. Member overall = numeric limit **or 15% of market-wide open position, whichever is higher**. Exchange-wide limits (50% of deliverable supply) also in the circular: Cotton 16,800,000 bales; Kapas 7,272,500 MT; Cottonseed Wash Oil 650,000 MT; Mentha Oil 19,500 MT. (The printed Crude Sunflower Oil and Cardamom exchange-wide figures read "1,540,000" and "1,2700" — the latter is a clear typo in the source.)

### Hedge-limit exemption — the application process [verified]
**MCX Hedge Policy for Domestic Participants, version 3.1, revision date 06-12-2025** — https://www.mcxindia.com/docs/default-source/market-operations/trading-surveillance/reports/hedge-policy-for-domestic-participants9d5e3aba-2bc6-41ac-9a24-b32d71ca9f0d.pdf (linked from https://www.mcxindia.com/market-operations/trading-surveillance/hedge-policy). Note the webpage header says "July 16, 2025" while the document's own revision history says 06-12-2025 — cite the version number, not the page date.

- Hedge limit is **in addition to** the normal position limit, **non-transferable**, usable only by the grantee.
- **It is NOT available for near-month contracts** from the date the near-month limit applies — and members must ensure the hedger **reduces near-month positions to within the normal limit before** the near-month limit kicks in.
- Granted **case by case** on documented underlying physical exposure: export/import commitments, stocks held, past track record of production/purchase/sales, processing capacity.
- **Documents — Annexures to the Hedge Policy:**
  - **Annexure 1** — Application form cum write-up on hedge rationale
  - **Annexure 2** — Joint declaration for availing hedge limits
  - **Annexure 3** — Statement of physical stocks owned by the hedger (warehouse location/address), certified by CA/CS
  - **Annexure 4** — Summary/periodic statement of export/import, certified by CA/CS
  - Plus: financial statements for ≥1 FY (CA/CS certified); bank certificate where stock is pledged; for track-record basis, quarterly/half-yearly production/purchase/sales/processing statements + installed-vs-utilised capacity statement
- Stocks may be pledged with scheduled commercial/co-op banks, in a Government entity's or **WDRA-approved** warehouse, or in owned/leased premises (exchange may require third-party assayer / warehouse-service-provider / independent auditor certification).
- Validity per the approval letter; **auto-cancels on expiry without notice**; renewal/enhancement must be applied for **at least one month before expiry**.
- Cross-exchange cap: hedging positions across **multiple exchanges/contracts must not exceed actual/anticipated physical exposure**, even if unused sanctioned limit exists.
- Hedger must preserve records **≥3 years**; exchange publishes allocated hedge positions **anonymously** (commodity, long/short hedge limits, application date, approval date, start date, valid-till).
- **Member duties**: do not put through a trade breaching the hedge limit/terms; monitor the hedger's position continuously; **immediately inform the exchange of any violation**; exercise due diligence throughout the hedge period; may collect additional margin.
- **Penalties**: breach of overall hedge limits, or availing hedge limits without corresponding physical stock / export-import commitment → **₹50,000 per instance or ₹5,000 per expiry contract per day, whichever is higher**. Forged/fake documents → **suspension of membership / debarment of client** plus financial penalty. Procedural violations (e.g. delay in submitting statements) → case by case. **Penalty on the hedger is recovered from the member.**
- **Portal: [unknown].** The policy names **no online portal** — submission is documentary, with `marketoperations@mcxindia.com` as the queries address and the Trading Department as addressee in the Annexure-1 letterhead format. Do **not** assert a portal name.
- SEBI basis: Master Circular cl. 3.7, from **SEBI/HO/CDMRD/DMP/CIR/P/2016/71 dated 19-Aug-2016** ("Position Limits for Hedgers"); MCX's own implementing circular is MCX/T&S/243/2016 dated 24-Aug-2016 **[verified]**.

### Client-wise position reporting file for MCX — **[unknown] / likely does not exist as a member return**
I searched MCX's circular index for "client wise", "position limit", "AP Inspection", "inspection report" and found **no member-side client-wise position reporting file**. The only "client wise" hit is **MCX/MEM/997/2020 (31-Dec-2020) "Discontinuation of Submission of Client Wise Fund and Securities Balance on Monthly Basis"** — i.e. MCX *removed* a client-wise balance submission. The MCX model is **exchange-computes, exchange-disseminates**: effective open-interest/position limits are published at *Market Operations → Trading & Surveillance → Reports → Market Wide Open Interest* (MCX/S&I/749/2024), and the member's duty is intraday + EOD monitoring with internal RMS controls, not a filing. **[verified]** that this is what the circulars say; **[unknown]** whether a non-circularised extranet return exists.

---

# 2. Proprietary trading disclosure

## 2.1 Disclosure to clients — SEBI level [verified]
**SEBI Master Circular for Stock Brokers (2025/90, 17-Jun-2025), clause 30 "Disclosure of proprietary trading by Broker to Client"**, consolidating **Circular SEBI/MRD/SE/CIR-42/2003 dated 19-Nov-2003**:

> 30.1 … every broker shall **disclose to his client whether he does client based business or proprietary trading as well**.
> 30.2 The broker shall disclose this information **upfront to his new clients at the time of entering into the Know Your Client agreement**.
> 30.3 In case of a broker who at present does not trade on proprietary account, **chooses to do so at a later date, he shall be required to disclose this to his clients before carrying out any proprietary trading**.

**Commodity segment — MCX's implementation is more prescriptive** (MCX/T&S/147/2016, 17-May-2016, Part I, implementing SEBI/HO/CDMRD/DMP/CIR/P/2016/49 dated 25-Apr-2016) **[verified]** — https://www.mcxindia.com/docs/default-source/circulars/english/2016/may/circular-147-2016d5d2604657fb64e3bdfdff00007acb35gu17ef2618-a5ec-439e-b337-68609a1dedc7.pdf. Members must:
(a) disclose to **existing** clients by **letter and/or email**; (b) update the information on the **company website**; (c) **disclose proprietary-trading information on the contract notes** issued to clients; (d) disclose upfront to new clients at KYC; (e) disclose before starting if commencing later. Compliance deadline was 22-Jul-2016, with **continuing compliance** thereafter.

Note the practical gap: the contract-note and website legs are **explicit for the commodity segment** and **not spelled out** in the SEBI Master Circular for Stock Brokers. A member running all three exchanges should apply the MCX standard across the board.

## 2.2 "Pro-account" trading terminal — one location, undertaking for more [verified]
**SEBI Master Circular for Stock Brokers clause 31 "Pro-account trading terminal"**, consolidating **Circular SEBI/MRD/SE/CIR-32/2003/27/08 dated 27-Aug-2003**:

- **31.3.1** Facility of placing orders on "pro-account" through trading terminals shall be extended **only at ONE location** of the member, as specified/required by the member.
- **31.3.2** Terminals at other locations must be able to place orders **only for and on behalf of a client** by entering client-code details.
- **31.3.3** A member needing pro-account from **more than one location** must **submit an undertaking to the Stock Exchange stating the reason**, and the exchange **may, on a case-to-case basis after due diligence**, consider extending the facility.

The stated rationale is from SEBI/exchange inspections: members were placing large numbers of pro-account orders from multiple locations rather than from the corporate office, and those trades were later transferred to client codes in the back office — which "clearly violate the requirement of putting the orders of clients under the appropriate client code".

**MCX operationalises this with named forms** (MCX/T&S/147/2016, Part II) **[verified]**:
- **Annexure 1** — "Application for Pro account trading facility from one location" (default location), on member letterhead, to the **Trading Department, MCX**
- **Annexure 2** — **Undertaking** for using pro-account from **more than one location**
- **Annexure 3** — Application for enablement of pro-account facility specifying **location and reason**
- **Annexure 4** — Information format for members already availing the facility
- Critically: *"CTCL Ids mapped to an Exchange user id which is enabled for 'pro-account' trading is **automatically enabled** for 'pro-account' trading. Members are therefore advised to ensure that **no trades in 'pro-account' should be executed through any CTCL Id unless the approvals are taken from the Exchange**."*

**NSE/BSE equivalent forms: [unknown].** I found no NSE circular 2018→2026 on pro-account location approval (the NSE corpus has exactly one "proprietary" subject hit in 9 years, and it is about UCC for prop accounts in direct payout). The SEBI-level rule plainly applies; the NSE/BSE submission artefact is not circularised in the period I indexed. Do not invent a form name.

## 2.3 Enabling / disabling pro trading — NSE mechanism [verified]
At NSE this is done through the **Base Minimum Capital (BMC) category**, not a standalone "pro switch" (NSE/COMP/73981, Master Circular for Membership Compliance Department, 30-Apr-2026, cl. 5.4):

| Category | Profile | BMC |
|---|---|---|
| 1 | **Only proprietary trading**, without Algo | ₹10 lakh |
| 2 | **Only client trading** (no proprietary), without Algo | ₹15 lakh |
| 3 | **Proprietary + client**, without Algo | ₹25 lakh |
| 4 | Any member with Algo | ₹50 lakh |
| — | Commodity-derivatives-only member | ₹10 lakh (no Algo) / ₹50 lakh (Algo) |

- Category 1 members **shall not undertake any client trading or Algo**; Category 2 members **shall not undertake any proprietary trading or Algo**.
- **Portal / path: `ENIT-NEW-COMPLIANCE > Compliance > BMC > Change Category`.**
- Requests received **before 4:00 pm** take effect the **next working day**; after 4:00 pm, the **subsequent cycle**. Member must ensure NSE IFSD adequacy. BMC is blocked first from CM-segment deposits, then F&O, then CD.
- Minimum 50% of the deposit in cash/cash equivalents (commodity: 25% cash, 75% FDR/BG).

Also relevant **[verified]** (SEBI Master Circular cl. 32, from **SEBI/MIRSD/CIR-06/2004 dated 13-Jan-2004**; restated NSE/COMP/73981):
- A broker **cannot deal with another broker of the same exchange**, for proprietary trading or for clients, **except with prior permission of the exchange**, and the exchange may allow dealing with **only one** such broker.
- A broker **can deal with only one broker of another exchange for proprietary trading**, **after intimating** that broker's name to its **parent stock exchange**.

**UCC for PRO codes [verified]** (NSE/ISC/73973, UCC Master Circular, 30-Apr-2026, Part A cl. 1(D)): members must **mandatorily upload PAN details for all 'PRO' codes** — the **Trading Member code is used as the UCC** with the member's own valid PAN and other information. Separately, **error accounts** must be named `ERROR` or `ERROR%` and tagged `ERROR` in the "Account type" field, or the UCC gets marked "Not Permitted to Trade" under Direct Payout Phase II (from 07-Jul-2025) (refs NSE/INVG/56395 17-Apr-2023; NSE/ISC/68187 26-May-2025). A clearing-side circular also covers "UCC for proprietary and client account by Trading members" for direct payout: NCL/CMPT/68965, 04-Jul-2025.

## 2.4 Periodic reporting file for pro trading — **[unknown] / none found**
No pro-trading periodic return appears in:
- Section X "Reporting Requirements" of the SEBI Master Circular for Stock Brokers (all 37 rows read) **[verified]**
- NSE's **Exhibit 53 list of the 70 common compliance submissions** (all 70 read) **[verified]**
- the NSE Inspection master circular's Item 8 "Compliance Submissions and Requirements" **[verified]**

Pro positions **do** count distinctly for limits and margin **[verified]**: separate TM-proprietary single-stock limit (20% of MWPL) vs TM prop+client (30%); in commodities, proprietary positions are *"treated and computed as client positions"*; in margining, "for proprietary positions — netted at trading/clearing member level **without any set-offs between client and proprietary positions**", and margin on a trade from a TM's proprietary account is blocked first from TM proprietary collateral, then CM proprietary collateral (NCL/CMPT/73997).

One more negative worth recording **[verified]**: two NSE/BSE enforcement artefacts specifically target pro trading — NSE's Inspection master circular lists *"Notice for disablement of proprietary trading"* and *"Disablement of proprietary trading terminals"* as administrative actions for **non-availability of client funds / use of client funds for PROP / debit-balance client obligation** (Item 9.1). So pro-trading privileges are a lever the exchange pulls when client-funds compliance fails.

---

# 3. Employee / dealer / designated-person trading disclosures

## 3.1 The governing instrument is PIT, not the broker circulars [verified]
I searched the SEBI Master Circular for Stock Brokers for "insider trading", "designated person", "structured digital", "front running", "personal trading" — **there is no employee/designated-person trading disclosure framework in it**. The only hits are DMA clauses where the *client* undertakes not to engage in insider trading. This is a clean and useful finding: the obligation sits **entirely** in the PIT Regulations plus the exchanges' surveillance circulars.

**SEBI (Prohibition of Insider Trading) Regulations, 2015, amended upto 12-Mar-2025** — https://www.sebi.gov.in/legal/regulations/mar-2025/securities-and-exchange-board-of-india-prohibition-of-insider-trading-regulations-2015-last-amended-on-march-12-2025-_92672.html (text PDF, served in an iframe: `https://www.sebi.gov.in/sebi_data/attachdocs/aug-2026/1786963663321.pdf`)

### Reg 9(1) — a stock broker MUST have a Schedule C code of conduct [verified]
> "The board of directors of every listed company and **the board of directors or head(s) of the organisation of every intermediary shall ensure that the chief executive officer or managing director shall formulate a code of conduct** with their approval **to regulate, monitor and report trading by its designated persons and immediate relatives of designated persons** … adopting the minimum standards set out in Schedule B (in case of a listed company) **and Schedule C (in case of an intermediary)**."

NOTE to Reg 9: *"every intermediary registered with SEBI is **mandatorily** required to formulate a code of conduct."* A stock broker is a registered intermediary → **Schedule C applies**. A **listed** broker must apply **Schedule B for trading in its own securities** and **Schedule C for trading in other securities** (Explanation to Reg 9(1)).

### Schedule C — what the broker must collect, do and report [verified]

| Cl. | Requirement | Specifics |
|---|---|---|
| 1 | Compliance officer reports to board/head(s) of organisation, and in particular to the **Chairman of the Audit Committee** (or analogous body) | at a frequency the board stipulates, **not less than once a year** |
| 2 | Need-to-know handling; **Chinese Wall** procedures; documented "cross the wall" process | |
| 3 | **Designated persons AND their immediate relatives** governed by an internal code of conduct on dealing in securities | |
| 4 | **Pre-clearance** by the compliance officer, where the proposed trade value exceeds a **threshold the board/head(s) stipulate** | ⚠️ **the threshold is set by the firm, not by SEBI** |
| 5 | Compliance officer maintains a confidential **"restricted list"** used to approve/reject pre-clearance | |
| 6 | Pre-clearance requires a **declaration of no possession of UPSI** | |
| 7 | Pre-cleared trades must execute within a timeframe **not more than 7 trading days**, else fresh pre-clearance | |
| 8 | **Contra-trade restriction: not less than 6 months** for a designated person who is a connected person of a listed company and trades in that company's securities (**2 months** for MF units, w.e.f. 01-Nov-2024). Compliance officer may relax, reasons in writing. **Contra-trade profits are disgorged to the IPEF**; not applicable to trades pursuant to exercise of stock options | |
| 9 | Board/head(s) stipulate the **formats** for pre-clearance applications, **reporting of trades executed**, **reporting of decisions not to trade after pre-clearance**, and **reporting of holdings at such intervals as determined** | ⚠️ **formats and intervals are firm-determined, not SEBI-prescribed** |
| 10 | Code must stipulate sanctions — **wage freeze, suspension, recovery etc.**; amounts collected remitted to SEBI for the **IPEF** | |
| 11 | On observing a violation of the regulations, the intermediary shall **promptly inform the stock exchange(s) where the concerned securities are traded, in such form and manner as may be specified by the Board** | (w.e.f. 17-Jul-2020; previously "inform the Board promptly") |
| 12 | **Annual** (and on-change) disclosure by **every designated person** of **name and PAN** of: (a) **immediate relatives**; (b) persons with whom a **material financial relationship** exists; (c) **phone/mobile/cell numbers used**. **One-time**: names of **educational institutions** attended and **past employers**. "Material financial relationship" = recipient of any payment (loan, gift) from a designated person in the preceding 12 months **≥ 25% of that designated person's annual income**, excluding arm's-length transactions | |
| 13 | Documented process for bringing people "inside" on sensitive transactions and making them aware of duties/liability | |

### Reg 3(5)/(6) — Structured Digital Database **does apply to a broker** [verified]
> "The board of directors **or head(s) of the organisation of every person required to handle unpublished price sensitive information** shall ensure that a **structured digital database** is maintained containing the **nature of the UPSI** and the **names** of persons who **shared** and **with whom** it was shared, **along with PAN** (or other legal identifier). **Such database shall not be outsourced** and shall be maintained **internally** with adequate internal controls such as **time stamping and audit trails** to ensure non-tampering."
> Proviso: information **not emanating from within the organisation** may be entered **not later than 2 calendar days** from receipt.
> Reg 3(6): preserved **not less than 8 years** after completion of the relevant transactions; if SEBI notifies an investigation/enforcement proceeding, **until completion of those proceedings**.

### Reg 7(2) — the ₹10 lakh / 2-trading-day rule is for LISTED-COMPANY designated persons [verified]
> Every promoter, member of the promoter group, **designated person** and director **of every company** shall disclose **to the company** the securities acquired/disposed **within 2 trading days** of the transaction if the value traded — in one transaction or a series **over any calendar quarter** — **exceeds ₹10 lakh**. The **company** then notifies the particulars **to the stock exchange within 2 trading days** of receipt / becoming aware.
> Reg 7(1)(b): on appointment as KMP or director, or on becoming a promoter/promoter-group member, disclose holdings **to the company within 7 days**.

⚠️ **Important distinction to get right in the docs:** Reg 7 is a **company**-facing disclosure chain (designated person → company → exchange). It bites a stock broker **as an issuer** only if the broker is itself listed. For an **unlisted** broker, there is **no SEBI-prescribed ₹10 lakh / 2-day disclosure of employee trades to anyone** — Schedule C cl. 9 leaves the trade-reporting formats, thresholds and intervals to the broker's own board-approved code. Several secondary compliance write-ups conflate these; the regulation text does not.

## 3.2 Exchange-level reporting of employee/dealer misconduct — this is the real filing [verified]
**SEBI/HO/MIRSD/MIRSD-PoD-1/P/CIR/2024/96, 04-Jul-2024 — "Measures to instil confidence in securities market – Brokers' institutional mechanism for prevention and detection of fraud or market abuse"** — https://www.sebi.gov.in/legal/circulars/jul-2024/measures-to-instil-confidence-in-securities-market-brokers-institutional-mechanism-for-prevention-and-detection-of-fraud-or-market-abuse_84588.html ; reproduced at **clause 98 of the SEBI Master Circular for Stock Brokers**. Four pillars: (1) systems for surveillance of trading activities and internal controls; (2) **obligations of the stock broker and its employees**; (3) **escalation and reporting mechanisms**; (4) **whistle-blower policy**.

Phase-in by active UCCs: **QSBs 01-Aug-2024**; >50,000 UCCs **01-Jan-2025**; 2,001–50,000 **01-Apr-2025**; up to 2,000 **01-Apr-2026** → **a greenfield member is already in scope** (smallest tier live since Apr-2026).

**NSE's guidance note — NSE/INVG/65921, 31-Dec-2024** (Annexure A) gives the operative detail **[verified]** — https://nsearchives.nseindia.com/content/circulars/INVG65921.pdf :

| Obligation | Frequency | Recipient |
|---|---|---|
| Any employee, on knowledge of fraud/market abuse/suspicious activity, informs **senior management** forthwith | immediate | internal |
| Annual reminder communication to all employees of that obligation | yearly (**recommendatory** for Small TMs; **mandatory** for Medium/Large/QSB) | internal |
| **Quarterly MIS** on the framework | quarterly | **apex body** (Audit Committee / Board / analogous) — which must review **not less than once a quarter** |
| **Detection of suspicious activity → inform details** | **as soon as reasonably possible, in any case not later than 48 hours from detection** | **Stock exchange**, via **email or the Member Surveillance Dashboard (MSD)** (manner per NSE/SURV/44477, 27-May-2020) |
| **Summary analysis + action-taken report** on instances of suspicious activity, fraud and market abuse — **or a 'nil report'** | **half-yearly** | **Stock exchanges** |
| **Deviation report** on adherence to internal controls / risk management / surveillance / client-onboarding policies, with proposed corrective actions | at regular intervals | **apex body AND stock exchanges**; submitted by **PO / Designated Director / Compliance Officer / Chief Surveillance Officer** as applicable |

TM size bands for calibration: **Small** <2,000 active UCCs; **Medium** 2,000–50,000; **Large** >50,000; **Huge** = QSBs (as on 31-Mar of the previous year).

Alert types in the guidance note that are specifically about the member's own people **[verified]**:
- **Alert 13 — "Front Running by Dealers/Clients to large trades of the Trading Member"** (factor: repeated trades by a dealer in the same security ahead of a firm order above a member-set ₹ crore threshold)
- An explicit concept of **"whitelisted employees/Authorised Persons (APs)"** for alert suppression
- Alerts on circular trading/reversal patterns involving clients and/or **APs acting in concert**; unauthorised trading by an AP with unusual/high activity

Note also NSE cl. 5.6.2 **[verified]**: a TM must ensure its trading terminals are used **only by its employees (including employees of holding/subsidiary companies) and/or APs**, **only at exchange-approved locations**, and **never by clients in any form or manner**.

Related but **not** a broker obligation: **SEBI/HO/MRD/DCAP/CIR/P/2021/23, 03-Mar-2021** "Code of Conduct & Institutional mechanism for prevention of Fraud or Market Abuse" applies the Schedule C standard to **MIIs (exchanges, CCs, depositories)**, not to brokers. Don't cite it as a broker rule. **[verified]** https://www.sebi.gov.in/legal/circulars/mar-2021/code-of-conduct-and-institutional-mechanism-for-prevention-of-fraud-or-market-abuse_49374.html

## 3.3 Dealer / approved-user reporting to the exchange [verified]
**NSE/COMP/50576, 13-Dec-2021 "Approved User/Persons"** — https://nsearchives.nseindia.com/content/circulars/COMP50576.pdf :
> Approved Users / Approved Persons (**"Dealers"**) of a member, as defined in **Regulation 2.2 of NSEIL CM & FO Regulations** and **NSE/MSD/34638 dated 13-Apr-2017**, **cannot operate as Dealer with more than one Trading Member**. Members "are also required to **report the details of the CTCL terminals along with the name/PAN of the Dealer, details of the NISM/NCFM certificate etc. to the Exchange before routing any order through such terminals**."

The circular was issued because members kept reporting dealers who had left the firm. Members must **immediately disable/deactivate** a terminal when the dealer is no longer associated, or reassign and re-report.

**Certification and auto-disablement** (NSE/INSP/73976, Inspection master circular, cl. 5.1–5.2, from SEBI (Certification of Associated Persons in the Securities Markets) Regulations 2007 Reg 3; NSE/INSP/40559 27-Mar-2019; NSE/INSP/56784 22-May-2023) **[verified]**:
- All approved users/persons must hold **valid certification at all points in time**; **no trades may be executed without valid certification**.
- Terminals may be entrusted **only to Approved Persons** — employees of the TM, partner/proprietor/director(s), registered APs, or employees of an AP. **No other person** may operate or place orders. Terminals must **not** be entrusted to clients or unregistered intermediaries.
- **"Exchange at EOD shall disable the user ID of all approved persons for which the certificate has expired"** and renewal has not been updated in exchange records. Members must monitor expiries, verify authenticity of certification before uploading, and keep terminal/certification data current.
- Terminals may be located **only** in the member's main/branch offices or a **registered AP's** office.

**MCX AP user/sales-personnel certification**: "The approved users and/or sales personnel of Authorised Persons shall have the necessary certification of the respective segments at all points of time" (SEBI Master Circular cl. 33.4.4) **[verified]**.

**Director/employee trading in the broker's own listed securities, and in exchange/depository securities** **[verified]**: the NSE Inspection master circular carries "Compliance with fit & proper requirement by Members in case of trading in securities of **Stock Exchanges**" (Item 2.7) and "…in securities of **depositories**" (Item 2.8). I did not read those two items in full — flagging as **[verified] that the obligation exists**, **[unknown]** as to its exact reporting mechanics.

---

# 4. Authorised Person (AP) reporting

## 4.1 SEBI framework [verified]
SEBI Master Circular for Stock Brokers **clause 33 "Market Access through Authorised Persons"**, consolidating **Circular MIRSD/DR-1/CIR-16/09 dated 06-Nov-2009** and **Circular SEBI/CIR/MIRSD/AP/8/2010 dated 23-Jul-2010**.

- **Definition** (33.1): any individual, partnership firm, LLP or body corporate appointed by a stock broker who provides access to the exchange's trading platform **as an agent of the stock broker**.
- **33.2** Prior approval of the exchange is needed **for each such person**, and **per segment**.
- **Eligibility** (33.4): Indian citizen, ≥18, no conviction for fraud/dishonesty, good reputation and character, **passed at least 10th standard**; for firms/LLPs/bodies corporate all partners/directors must comply and the object clause must permit dealing in securities; **necessary infrastructure** (office space, equipment, manpower); approved users/sales personnel **certified at all times**.
- **Conditions** (33.5): broker responsible for **all acts of omission and commission** of the AP, deemed to be the broker's own; **AP shall not receive or pay money or securities in its own name**; AP's remuneration **only from the broker**, **nothing charged to clients**; **an AP cannot be appointed by more than one broker on the same exchange**; a **partner/director of an AP cannot himself be an AP on the same exchange**; written agreement in the exchange-specified form covering scope, responsibilities, confidentiality, commission sharing, termination.
- **Withdrawal** (33.6): on request from broker or AP, or when the exchange is satisfied continuation is detrimental to investors/market, or the AP becomes ineligible.
- **Broker obligations** (33.7): an AP-located terminal is a **branch office** of the broker; **display AP particulars at each branch**; **notify clients of that branch at least 30 days before** any change of AP; **conduct periodic inspection of branches assigned to APs and records of their operations** (33.7.5 — **this is the legal root of the quarterly AP-inspection filing**); client registered with the broker only, funds/securities settled directly broker↔client, AP issues **no document in its own name**, **no client funds/securities into any AP account**; **on noticing irregularities: seek withdrawal of approval, withhold all moneys due to the AP until investor problems are resolved, alert investors in the AP's location, file a police complaint**, and take all measures to protect investors.
- **Exchange obligations** (33.8): maintain an AP database (PAN of AP and of all partners/directors, broker details, branch locations, number and details of terminals, withdrawals of approval, change in status/constitution, disciplinary actions) — **all except PAN published on the exchange website**; inspect AP branches when inspecting the broker; **AP–client disputes treated as broker–client disputes**; on withdrawal for disciplinary reasons the exchange issues a **press release** naming the AP and the reason.

**On the 2018 discontinuation of sub-broker registration: [unknown].** I could not locate that circular through the SEBI listing within this session's constraints. The sub-broker→AP migration is real and well known, but I am not going to assert a reference number I did not read.

## 4.2 The quarterly "Inspection of Authorised Person" submission — **NSE equivalent VERIFIED**

**Your BSE dates (30-Apr / 31-Jul / 31-Oct / 31-Jan) match the NSE rule exactly.** [verified at NSE; [unknown] at BSE]

**NSE/COMP/65970, 03-Jan-2025, "Framework for Supervision of Authorised Persons (APs) & Branches by Members"** — https://nsearchives.nseindia.com/content/circulars/COMP65970.pdf :

| Inspections undertaken during | Due date of reporting |
|---|---|
| Quarter 1 (Apr–Jun) | **July 31** |
| Quarter 2 (Jul–Sep) | **Oct 31** |
| Quarter 3 (Oct–Dec) | **Jan 31** |
| Quarter 4 (Jan–Mar) | **April 30** |

- Rule: *"Inspections undertaken during a particular quarter shall be reported **within one month from the end of the said quarter**."*
- **Portal/path: ENIT (Electronic NSE Interface Terminal) → `ENIT-NEW-COMPLIANCE > Compliance > Authorised Person > Applications > Inspection of Authorised Person New`.**
- **All fields mandatory; once submitted the data CANNOT be edited.**
- **If no inspections are conducted in a quarter, a "NIL" declaration is MANDATORY for that quarter.**
- Re-confirmed verbatim in **NSE/COMP/73981 (Master Circular for Membership Compliance Department, 30-Apr-2026) cl. 18.10** **[verified]**.

**Scope and methodology — NSE/COMP/63628, 28-Aug-2024** (Annexure A; "in joint consultation with other Exchanges") — https://nsearchives.nseindia.com/content/circulars/COMP63628.pdf **[verified]**. 16+ parameters across *Dealing with clients*, *Management of branches/AP and internal control*, *Terminal operations and related systems*, including: all clients registered **directly with the TM only** (examine the AP's demat and bank statements); **no movement of funds/securities between clients and the AP** (examine **all** demat and bank accounts, obtain **written confirmation from the AP that all accounts have been disclosed**, and chase any undisclosed account found); **no fixed periodic payments to clients mapped to the AP** (examine all client ledgers); **no cash dealings**; AP not involved in fund-based activity, deposit collection, unauthorised trading, **dabba/paper trading**, dealing with unregistered intermediaries, accepting public deposits or giving assured returns, offering incentives for account opening, or seeking authorisation to trade on clients' behalf — with the **indicative methodology expressly including "mystery shopping, surprise visits, web searches, and regular feedback from the clients of the AP"**; complaints analysis; **no advertisements by APs** (newspapers/pamphlets/journals/magazines/emails/Facebook/Instagram/Telegram) without exchange approval through the TM, including no publishing of performance returns — *"Scan all social media accounts, newspapers, and print media platforms"*; all AP terminals match what is reported to the exchange, operated only by approved/certified users; **voice recording** systems in the AP's main office and all branches; APs without assigned terminals must be unable to place trades for the TM's clients; contract notes / statements of funds / daily margin statements **not generated or issued by the AP**.

The circular also mandates **enhanced due diligence at onboarding**: in-person verification, site visits, PAN validation, background checks, **scrutiny of all demat and bank account statements of the AP**, and **continuous screening that the AP is not debarred by SEBI/exchanges**.

**MCX — same quarterly cadence, different portal** [verified]:
- Portal: **AP Portal `https://approfile.mcxindia.com`**, tab **"AP Inspection"** (format file provided on the same tab) — **MCX/MEM/052/2022, 28-Jan-2022**. ⚠️ That circular set **annual** reporting (FY-2021-22 window 01-Apr-2022 to 31-May-2022, "subsequently, inspections shall be reported on yearly basis").
- **MCX has since moved to quarterly**: **MCX/COMP/480/2026, 21-Aug-2026** states *"for quarter April-June, **AP inspection reports are required to be submitted by July 31st**"* — identical to NSE. **[verified]**
- MCX's framework circular **MCX/INSP/572/2024, 29-Aug-2024** is the mirror of NSE/COMP/63628 (same Annexure A, same "joint consultation with other Exchanges" language). **[verified]**
- MCX's underlying AP supervision circular is **MCX/INSP/601/2019 dated 22-Oct-2019** (referenced, not read).

**BSE: [unknown].** I could not read any BSE notice. What I can say: the **quarterly cadence with one-month lag is a jointly-agreed, cross-exchange standard** (both NSE and MCX circulars say "in joint consultation with other Exchanges"), and **NSE's verified dates are exactly the 30-Apr / 31-Jul / 31-Oct / 31-Jan set you were given for BSE**. So the BSE figure is **highly plausible** — but I am marking it **[unknown]** rather than [likely] because I could not name even one independent source for the *BSE* instance, let alone two.

ICCL's own master circulars index (where the BSE-group member-compliance documents live) is at https://www.icclindia.com/Static/downloads/ConsolidatedCircular.aspx — **"Master circular- Member inspection"** = notice **20260429-33** and **"Master circular- Membership compliance"** = notice **20260429-34**, both updated **till 31-Mar-2026**. I retrieved both covering notices (`https://www.icclindia.com/downloads/UploadDocs/Notices/20260429-34/20260429-34.pdf`) but **their "Annexure-1" attachments — which contain the actual compliance content — are not at any guessable path**, and BSE's attachment endpoint `DownloadAttach.aspx` 404s. **That is the single biggest remaining gap in this research.**

## 4.3 The 2026 addition — AP Action Taken Report (ATR) [verified]
**NSE/COMP/75878, 21-Aug-2026** — https://nsearchives.nseindia.com/content/circulars/COMP75878.pdf, and the identical **MCX/COMP/480/2026, 21-Aug-2026**:

| Step | Deadline (illustrated for Apr–Jun quarter) |
|---|---|
| AP inspection report submitted | **by 31 July** (within 1 month of quarter end) |
| **Disciplinary action taken** for non-compliances found | **by 31 August** (within **2 months** of quarter end) |
| **ATR + status of closure of observations submitted to the Exchange** | **by 30 September** (within **3 months** of quarter end) |

- **Exception**: where the applicable circular prescribes **termination**, disciplinary action must be taken **within 7 days** of receipt of the AP inspection report from the auditor / identification of the non-compliance.
- Applies to **AP inspection reports for the July–September 2026 quarter onwards**.
- Both circulars say *"the operational guidelines for submission of ATR shall be communicated separately"* — so as of **15-Oct-2026 the submission mechanism for the ATR is [unknown]**.
- Underlying "indicative disciplinary actions" circulars: **NSE/INSP/70751** (= NSE/COMP/70751) and **MCX/INSP/577/2025**, both dated **10-Oct-2025 / 06-Nov-2025** respectively, titled *"List of violations and Disciplinary Action on Authorised Person observed during Inspection"* — https://nsearchives.nseindia.com/content/circulars/COMP70751.pdf (listed in my index; I did not read its contents). NSE's master circular places them at **Exhibit 29**.

## 4.4 AP registration / cancellation filings [verified]
**NSE** (NSE/COMP/73981 cl. 18.9; NSE/COMP/70748 of 10-Oct-2025):
- Registration: `ENIT-COMPLIANCE-NEW > Compliance > Authorized Person > Applications > New Registration`; scanned duly-certified documents per the checklist uploaded with the application. Checklist and formats at **Exhibit 26**.
- Cancellation: `… > Applications > Cancellation`. **Detailed reason required.** If **due to disciplinary action**, the member must submit a **copy of the police complaint, copy of the press release, amount withheld (if any), and the method by which clients were informed**.
- **New in Oct-2025: bulk AP cancellation** — `ENIT > Compliance > Authorised Person > Applications > Cancellation Bulk Request`, **available only for cancellations on grounds OTHER than disciplinary**. Requests are **auto-processed** and **cannot be modified once submitted**; members must verify AP PAN, segments and cancellation reason before upload. Manual at **Exhibit 27**. https://nsearchives.nseindia.com/content/circulars/COMP70748.pdf
- Cancellation on disciplinary grounds must be effected **through ENIT selecting the reason "Disciplinary action"** with necessary details (cl. 18.8(i)).
- **Inactive APs**: members must review all registered APs regardless of terminal allocation and **cancel registrations of APs inactive for 6 months or more, on an immediate basis**; must monitor that trades on an AP terminal are commensurate with clients mapped; and should cancel **before 31 March** each year to avoid AMC (cl. 18.14).

**NSE AP fees** (cl. 18.12–18.13) **[verified]**:

| Activity | Fee |
|---|---|
| AP Registration | **₹5,000 per segment** for Capital Market, F&O, Currency Derivatives, Debt; **₹500** for Commodity |
| AP Cancellation | **NIL** |
| AP **Annual Maintenance Charge** | **₹5,000** for all segments + GST |

AMC is levied in **April** for the next financial year on all APs registered **as on 31 March**, and **is not refunded** even if the registration is cancelled during the year, including for disciplinary action. Confirmed by the separate annual circulars NSE/COMP/72642 (05-Feb-2026), NSE/COMP/66407 (30-Jan-2025), NSE/COMP/60859 (26-Feb-2024).

**MCX**: digitally-signed/eSigned applications for AP registration, cancellation and change in profile accepted since MCX/MEM/340/2021 (08-Jun-2021); AP status (Active/Inactive) maintained on the **MCX AP Portal** (MCX/MEM/433/2021). 2026 fee changes: **MCX/MEM/187/2026 (09-Apr-2026)** "Revision In Method Of Levy Of Annual Subscription Charges Of Authorised Person"; **MCX/MEM/326/2026 (01-Jun-2026)** extension of the AP-ASC billing cut-off for FY-2026-27; **MCX/MEM/450/2026 (05-Aug-2026)** "Revision in Cancellation Charges on Authorised Person (AP), Refund for AP re-activated in FY 2026-27 and invoicing of AP Annual Subscription". **[verified]** that these exist with these titles/dates; **[unknown]** as to the amounts — I did not read them.

## 4.5 Periodic AP reporting other than inspection [verified]

**(a) Weekly reporting of clients mapped to APs.**
- **NSE** (cl. 18.11): upload details of clients mapped to each AP in the exchange database **on a weekly basis, on or before the next 2 trading days of the subsequent week**, via `ENIT-NEW-COMPLIANCE > Compliance > Authorized Person > Applications > Update Client Details`. **Details reported must match the exchange UCC records.** Origin: NSE/COMP/49509, 03-Sep-2021.
- **MCX** (MCX/MEM/748/2023, 31-Oct-2023): on the **AP Portal `https://approfile.mcxindia.com`** → "Client details" tab → **DOWNLOAD APPROVED APs** (Excel of all approved APs) → fill **columns E to J** with client details (clients whose **UCC is registered with MCX**) under each AP → **UPLOAD** → **SAVE**. Annexure-A = portal format, Annexure-B = helpfile. For new clients mapped from 01-Nov-2023 onwards, **weekly**. Details must match exchange UCC records.
- **Penalty at MCX for non-/partial reporting of UCC details mapped to APs: ₹2 lakh** (see below).

**(b) Quarterly QSB declaration.** Item 36 of NSE's 70-submission list: *"Declaration w.r.t compliance with circulars on **Supervision of Authorised Persons (APs) & Branches by Members**"* — **within 30 days from end of quarter**, under NSE/INSP/56927 Annexure A ref. 9.1. **This is a QSB obligation** (items 1–39 of Exhibit 53 all trace to the QSB enhanced-obligations circular), so a greenfield non-QSB member is **not** in scope. **[verified]**

**(c) Annual/periodic AP data maintenance.** AP address, contact details, directors/partners, terminals allocated, number of clients etc. must be "**updated in Exchange records from time to time**"; where APs operate from a member branch, the member must maintain **appropriate physical segregation** of the AP's space and display the **AP-specific notice board** in addition to the member's (NSE/COMP/63628; NSE/COMP/73981 cl. 18.8(m); MCX/INSP/572/2024). **[verified]**

**(d) Name restrictions.** AP and TM names must not contain words such as **Advisors, Asset/Wealth/Portfolio Management** unless separately registered with SEBI/another regulator; the exchange will **reject any AP application** with a misleading name. Prohibited-word list: **NSE/COMP/55716 (22-Feb-2023)**, reiterated NSE/COMP/56041, NSE/COMP/61367, NSE/COMP/62672, NSE/COMP/63777; MCX/MEM/191/2023, 188/2024, 432/2024. **[verified]**

## 4.6 Reporting AP misconduct / unauthorised schemes — the hard deadline [verified]

| Exchange | Deadline | Channel |
|---|---|---|
| **NSE** | *"Members shall be **mandatorily required to report any observed incidents related to assured returns or unauthorised schemes operated by the AP to the Exchange within ONE working day**"* | NSE/COMP/63628, 28-Aug-2024; reiterated NSE/COMP/73981 cl. 18.8(k) |
| **MCX** | *"they shall be **mandatorily required to report any incidence, observed by them, involving assured returns or any unauthorised schemes operated by the AP, to the Exchange, within TWO working days**"* — by email to **`apcell@mcxindia.com`** | MCX/MEM/052/2022, 28-Jan-2022 |
| **MCX (2024 restatement)** | **"within one working day"** | MCX/INSP/572/2024, 29-Aug-2024 |

⚠️ Note the MCX inconsistency (2 working days in 2022, 1 working day in 2024). The 2024 circular is later and aligns with NSE — treat **1 working day** as the operating standard but flag the older text. **[verified] that both texts exist.**

Required follow-through, both exchanges **[verified]**:
- **Scan social media** to identify mis-selling / assured returns / unauthorised schemes operated by an AP, **including loan transactions**.
- On identification: **inspect the AP / investigate**; **withdraw approval on disciplinary grounds**; **withhold funds due to the AP until investor issues are resolved**; **send alert messages to investors in the AP's location**; **file a complaint with the relevant police station**.
- **Maintain and provide documentary evidence** of police complaints, press releases, advertisements issued to the market, **communication logs of alert messages sent to investors**, and other protective measures including disciplinary actions taken.
- Members must ensure APs are not "operating any schemes of unauthorised collective investments/portfolio management, promising indicative/guaranteed/fixed returns etc."
- **Vicarious and several liability**: NSE cl. 18.15 invokes **Section 182 of the Indian Contract Act, 1872** (definition of 'Agent') to make all provisions of that Act applicable to the TM–AP relationship, and makes the TM "**vicariously and severally liable**" for AP violations.
- NSE cl. 18.16 makes the TM responsible for all acts of its APs **and/or employees at their branches**, including any arrangements entered into by the AP/employees with the TM's clients — expressly covering **unauthorised trading**, **participation in price manipulation willingly or unwillingly**, and allowing investors to trade beyond specified limits.

## 4.7 AP-related penalties [verified]

**MCX/INSP/204/2025, 25-Apr-2025, "Penalty structure for non-compliance with oversight of Authorised Persons by the trading members"**, Annexure A — https://www.mcxindia.com/docs/default-source/circulars/english/2025/april/circular-204-2025gue429e000-9e33-4d04-94c7-761f9fc3cf02.pdf

| # | Violation | Penalty | Repeat |
|---|---|---|---|
| 1 | No appropriate systems to monitor/review trading terminals mapped to branches/APs | **₹1,000 per terminal** + direction to put systems in place within 15 days | 2nd: **+50% escalation**; 3rd: **+100% escalation** (both with the 15-day direction) |
| 2 | **Delay in reporting AP inspection** to the Exchange | **₹10,000 per day** after the due date | **+50% escalation** |
| 3 | **Incorrect submission** of AP-inspection information | **₹25,000 per day** after the due date; additional disciplinary action if **materially** incorrect | referred to the relevant authority for disciplinary action |
| 4 | **Not conducting AP inspections** per the prescribed framework | **₹2 lakh for each year** | — |
| 5 | **Non-reporting / partial reporting of UCC details mapped to APs** | **₹2 lakh** | — |

Plus: the relevant authority may impose additional disciplinary action case by case based on gravity.

Also **MCX/MEM/270/2025, 28-May-2025** — "Penalty structure on Members where Members / their Employees / **Authorised Persons (APs) use their contact details for client account opening**"; NSE's equivalent is **NSE/INSP/70746, 10-Oct-2025** (cited in the NSE UCC master circular as the penalty basis for shared mobile/email across UCCs). **[verified] that these exist; [unknown] as to amounts.**

**NSE penalty quantum for late/incorrect AP filings: [unknown].** NSE's Inspection master circular routes all of this to "**Chapter 10 — Enforcement Actions**" / the **Penalty Dashboard** (Exhibit 54) rather than printing a table in the text I read. NSE also provides a **Compliance Calendar** as a functionality **inside the Penalty Dashboard**, showing due dates for the current month, refreshed monthly (NSE/INSP/73976 cl. 8.1). Do not quote NSE AP penalty figures.

Exchange-side consequence circulars worth citing: **NSE/INSP/73503, 27-Mar-2026** "Common violations/deficiencies observed by the Exchange during the inspections of Trading Members and **Authorised Persons**" (Exhibit 52), and MCX's "List of common irregularities observed during inspection" PDF. **[verified]**

---

# 5. UCC / client-data submissions

## 5.1 The UCC obligation [verified]
- **SEBI origin: Circular SMDRP/Policy/Cir-39/2001 dated 18-Jul-2001** (mandatory UCC for all clients), with **Circular SEBI/MRD/SE/CIR-34/2003/29/09 dated 29-Sep-2003** — both cited as the footnote authority for clause 20 of the SEBI Master Circular for Stock Brokers. Also carried at **para 14 of Chapter 1 of the SEBI Master Circular for Stock Exchanges and Clearing Corporations, SEBI/HO/MRD-PoD2/CIR/P/2024/00181 dated 30-Dec-2024**.
- **Commodity segment**: UCC mandatory per **para 1.4 of the SEBI Commodity Derivatives Master Circular (04-Aug-2023)** and NSE/ISC/47598 (10-Mar-2021).
- SEBI Master Circular cl. 20.1–20.2: mandatory UCC for all clients; **collect and maintain PAN in the back office for all clients**; verify documents and retain a copy; **furnish the particulars of clients to the Stock Exchanges/Clearing Corporations, updated MONTHLY, with a given month's information reaching the exchange within SEVEN WORKING DAYS of the following month**; exchanges maintain the database and **preserve historical records of all quarterly submissions for seven years**.
- cl. 20.3 (from **SEBI/HO/MIRSD/DOP/CIR/P/2019/136 dated 15-Nov-2019**): **UCC must be mapped to the client's demat account**; a client trading through multiple TMs has each UCC mapped to one or more demat accounts; **exchanges share UCC data (PAN, segment, TM/CM code, UCC) with the depositories DAILY for newly created UCCs**; depositories map on PAN.

## 5.2 How a member actually uploads UCC at NSE [verified]
**NSE/ISC/73973, "Master Circular for Unique Client Code", 30-Apr-2026** (consolidating all UCC circulars up to 31-Mar-2026) — https://nsearchives.nseindia.com/content/circulars/ISC73973.zip

Two channels — **Member Portal (UCI-Online)** and **API**:

| Purpose | Endpoint / path |
|---|---|
| UCI-Online (live) | `https://enit.nseindia.com/MemberPortal/` and `https://inspection.nseindia.com/MemberPortal/` |
| UCI-Online (UAT) | `https://lama.uat.nseindia.com/MemberPortalRevamp/` |
| API registration (live) | `https://enit.nseindia.com/api-reg/welcome`, `https://inspection.nseindia.com/api-reg/welcome` |
| API auth | `https://api.nseindia.com/uciservice/api/auth` |
| **Client upload** | `https://api.nseindia.com/uciservice/api/clientupload` |
| PAN status | `https://api.nseindia.com/uciservice/api/getpanstatus` |
| **UCC-wise** PAN status | `https://api.nseindia.com/uciservice/api/getuccpanstatus` |
| API UAT | `https://clientprofilinguat.nseindia.com/uciservice/api/...` |

- File formats: **Annexure A** (New Bulk Upload, .xlsx — UCI-Online), **Annexure B** (Bulk Modification, .xlsx), **Annexure D** (API). The technical spec is **"TDD – UCI External interface"**, REST/HTTPS, JSON, bidirectional — the version shipped with the Apr-2026 master circular is **v2.1 dated 01-Jan-2026**; **v2.2** ships with the Sep-2026 validation circular.
- Modification: single — `Member Portal > UCI Online > Client detail > Query Client > Modify`; bulk — `… > Client detail > Bulk Modification > File Upload`.
- **Unfreeze** (to change name, category, DOB/DOI): `… > Other options > Unfreezing request > New Request`, or bulk via Annexure E.
- **Client status** (Inactive / Closed): `… > Client Details > Update Client Status`.
- Reports NSE pushes back (Part B): **Full File Report**, **Trading Status Report**, **Mobile Number Revocation List (MNRL) Report**, **PAN Status Report**, **Mandatory Report**, **Not Permitted to Trade Report**, **Demat and Bank Account Validation Status**. Per NSE/ISC/75249 these include *Permitted to Trade* and *Not Permitted to Trade* batches 1 & 2, MNRL, demat/bank verification status, and a **weekly** report of mandatory fields for all UCCs uploaded by the member.

### Fields that drive "Permitted to Trade" [verified]
Master Circular Part A cl. 2(e): a UCC is permitted to trade only when it is compliant with the **6 KYC attributes**, is **KRA verified/registered**, and has a **valid primary demat account** (as applicable):
- **Name (as per PAN)**, **complete address incl. PIN code** (for Indian addresses), **PAN**, **valid mobile number**, **valid email ID**, **income details / range**
- **Custodian details** updated for clients availing custodian services
- **PAN verification status = Approved**
- UCC in **"Active"** status
- PAN **KRA compliant**
- **Valid primary demat account** in Cash Segment, as applicable
- For buybacks, the `BUYBACK***` UCC must also be compliant
- Plus any other field mandatory for the file format and client category

Also mandated: **name and date of birth/incorporation as per Income Tax records / PAN card**; **separate mobile number and email for each client**, with the family/authorised-person exception of **para 34.2.4 of the SEBI Master Circular for Stock Brokers** requiring a **specific written request** (self/spouse/dependent children/dependent parents; HUF Karta or co-parcener with Karta's prior approval; partner with all/authorised partners' approval; trustee/beneficiary per Trust resolution; corporate authorised person per Board resolution). Where shared contact details exist without a written declaration, the member must send a **30-day notice** to the client. **Members must ensure their own / employees' / APs' mobile numbers and email addresses are NOT captured as client contact details** — penalty basis NSE/INSP/70746 (10-Oct-2025). Demat format: NSDL = **DP ID 8 chars + BO ID 8 chars**; CDSL = **16 numeric chars**; appropriate account marked **Primary**. UCCs identified as compliant **by 22:00 hrs on the previous day** are permitted to trade the next trading day. **[verified]**

## 5.3 "UCC wise settlement details" — NSE equivalent VERIFIED; BSE dates NOT

**NSE: there is no fixed calendar date — it is a floating 10-trading-day deadline.** [verified]

**NSE/INSP/73976, Master Circular – Inspection Department, 29-Apr-2026, cl. 4.4**:

| # | Reporting requirement | Timeline | Format |
|---|---|---|---|
| 1 | **Submission of UCC wise settlement details** | **Within 10 trading days post settlement date** | **Exhibit 23** |

- Purpose stated in the circular: *"In order to monitor the compliance of timely settlement of running account of clients' funds and to verify that **excess clients' funds are not retained by the TM as on the date of settlement** of running account, it has been decided **in joint consultation with other Exchanges and SEBI** that Stock Brokers / Trading Members shall report the UCC wise settlement details to the Exchange…"*
- **Exclusions**: not applicable to members doing **only proprietary trading and/or only institutional-client trading** — such members give a **one-time declaration through the system**. Members serving both institutional and non-institutional clients must submit data **for all non-institutional clients**.
- Non-compliance penalty per Chapter 10 (Penalty Dashboard).
- Also item **66** of NSE's 70 common submissions: *"Submission of UCC wise settlement of Client Funds details — **Within 10 Trading Days post settlement date**"*, circular refs **NSE/INSP/55135 (05-Jan-2023)**, **NSE/INSP/58676 (29-Sep-2023)**, **NSE/INSP/67207 (20-Mar-2025)**.

**So the due dates move every year with the running-account settlement calendar.** The FY-2026-27 calendar (Exhibit 20 of NSE/INSP/73976, "Annual calendar for the settlement of running account") **[verified]**:

| Quarter | Quarterly settlement date(s) FY2026-27 | ⇒ UCC-wise settlement filing due |
|---|---|---|
| Q1 | **17 and/or 18 April 2026** (Fri/Sat) | ~10 trading days later |
| Q2 | **3 and/or 4 July 2026** (Fri/Sat) | ~10 trading days later |
| Q3 | **16 and/or 17 October 2026** (Fri/Sat) | ~10 trading days later |
| Q4 | **1 and/or 2 January 2027** (Fri/Sat) | ~10 trading days later |

Monthly settlement dates FY2026-27 are also in Exhibit 20: 17/18-Apr, 15/16-May, 5/6-Jun, 3/4-Jul, 7/8-Aug, 4/5-Sep, 16/17-Oct, 6/7-Nov, 4/5-Dec, 1/2-Jan, 5/6-Feb, 5/6-Mar. SEBI requires exchanges to **jointly issue this annual calendar at the beginning of the financial year** (Master Circular cl. 15.10.1.2).

**On your BSE dates 27-Apr / 17-Jul / 26-Oct / 15-Jan: [unknown], and they do not reconcile with FY2026-27.** Ten trading days after 16/17-Oct-2026 lands around **30-Oct-2026**, not 26-Oct. These dates look like a **snapshot of one particular financial year** (a year whose Q3 settlement fell earlier in October), published in a compliance-vendor compilation. Given the obligation was framed "in joint consultation with other Exchanges", BSE almost certainly uses the same 10-trading-day rule rather than fixed dates. **Recommendation for the docs: state the RULE ("within 10 trading days post settlement date, against the jointly-issued annual running-account settlement calendar") and do NOT publish fixed dates for either exchange.** That is both correct and durable.

⚠️ **Exhibit 23 content not retrieved**: "Exhibit 23 – Submission of UCC wise settlement details.pdf" in the Apr-2026 exhibit bundle is a **1-page image-only PDF** and no OCR tooling (tesseract/ocrmypdf) is available in this environment. So the **field list of the UCC-wise settlement file is [unknown]**.

## 5.4 Weekly client-wise ISIN holding statement — **the premise is out of date** [verified]

This is the most important correction in this section.

| Regime | What it was | Status |
|---|---|---|
| **Weekly** submission of Holding Statement, Cash & Cash Equivalent Balances and Bank Balances via API | NSE/INSP/51191 (31-Jan-2022), NSE/INSP/51599 (10-Mar-2022), NSE/INSP/51938 (06-Apr-2022), NSE/INSP/52509 (03-Jun-2022), NSE/INSP/52829 (30-Jun-2022) | **superseded** |
| **Daily** submission | NSE/INSP/55039 (28-Dec-2022), NSE/INSP/55250 (13-Jan-2023), **NSE/INSP/55380 (25-Jan-2023)** | in force |
| **NSE/INSP/60046 (29-Dec-2023)** "Daily submission of Holding Statement" | replaced the daily nil-declaration with a **One Time Nil Holding declaration** | **current** |
| **Client Level Cash and Cash Equivalent Balances** reporting | **NSE/INSP/61121 (13-Mar-2024) "Discontinuation of Reporting of Client Level Cash and Cash Equivalent Balances"** | **discontinued** |

**Current NSE position (NSE/INSP/73976 cl. 8.3) [verified]:**
> "Stock Broker/Trading Members shall submit **Holding Statement through Application Programming Interface (API) on a daily on T+1 basis**. In case of submission of nil holding of clients' securities, Trading Members are required to submit **One Time Nil Holding declaration** to the Exchange through the Stock Broker / Trading Member portal."

- The One Time Nil Holding declaration on T+1 **stands valid until the next holding statement submission**; **non-submission within the due date is treated as non-submission of the Holding Statement**.
- When holdings resume, the member must first make a **Bulk Nil Holding submission** for all earlier dates with no client holdings, then resume API submission at **T+1**. Manual = **Exhibit 43**.
- Portal path (from the Exhibit 43 manual): `Statement upload > Holding Statement Daily > Submit Data > Submission in the capacity of Trading member > Not Applicable Declaration`.
- Confirmed as item **65** of the 70 common submissions: *"Holding statement — **T+1 day**"*, ref NSE/INSP/60046 and NSE/INSP/55380.
- Even the Budget-day Sunday live session gets its own schedule circular (**NSE/INSP/72510, 28-Jan-2026**, "Schedule for Reporting of Holding statement on account of Live Trading Session on Sunday, February 01, 2026") — a nice indicator of how operationally daily this is. **[verified]**
- Format of the Register of Securities / Holding Statement / Bank Book / Client Ledger = **Exhibit 41** of NSE/INSP/73976 (fields not read — **[unknown]**).

### The genuinely MONTHLY ISIN-wise client submission (SEBI level) [verified]
**SEBI Master Circular for Stock Brokers cl. 15.9 "Uploading clients' fund balance and securities balance by the Stock Brokers on Stock Exchange system"** — brokers upload, **on a monthly basis, for every client**, onto **each exchange** where the broker is a member:
- **15.9.1.1** Exchange-wise EOD **fund balance** per the client ledger, consolidated across all segments, plus net funds payable/receivable across all exchanges
- **15.9.1.2** EOD securities balances **ISIN wise** (as on the last trading day of the month) **and** consolidated (total number of ISINs, total number of securities across all ISINs)
- **15.9.1.3** **ISIN-wise number of securities pledged**, funds raised from such pledging, and the consolidated equivalents
- **15.9.1.4 Deadline: within SEVEN CALENDAR DAYS of the last trading day of the month**
- **15.9.1.5 Exclusions**: custodian-settled clients; clients with **zero funds and zero securities** who have **not traded in the last 12 months**
- The exchange then forwards 15.9.1.1–3 to clients by **email**, and 15.9.1.1 + consolidated 15.9.1.2/3 by **SMS**, on the contact details the broker uploaded.
- Item **6** of the Master Circular's Section X reporting table confirms "monthly … onto each Stock Exchange system".

**MCX discontinued its version**: MCX/MEM/997/2020 (31-Dec-2020) "Discontinuation of Submission of Client Wise Fund and Securities Balance on Monthly Basis". **[verified]**

### The weekly "G principle" client-funds monitoring [verified]
**SEBI Master Circular cl. 15.5** (from **SEBI/HO/MIRSD/MIRSD-PoD-1/P/CIR/2024/03 dated 12-Jan-2024**):
> **G Principle**: "The total available funds i.e. cash and cash equivalent with the stock broker and with the clearing corporation/clearing member should **always be equal to or greater than clients' funds as per the ledger balance**."

- Exchanges run alert-based monitoring on this; **"Stock Brokers shall ensure due compliance in submitting the information to the Exchanges within the stipulated time."**
- Not applicable to brokers doing **only proprietary trading and/or only institutional clients**.
- The **weekly** periodicity is confirmed indirectly and robustly by SEBI's own Early Warning Mechanism trigger at cl. 18.2.4(c): *"**Failure by stock broker to upload WEEKLY data regarding monitoring of clients' funds** as specified in SEBI's circular on Enhanced Supervision, **for three consecutive weeks**"* — three consecutive failures is an early-warning event for diversion of client securities. **[verified]**
- NSE's SOP = **Exhibit 34 "SOP for Monitoring of client funds under Enhanced Supervision"** of NSE/INSP/73976 (contents not read — **[unknown]**).
- Other EWM triggers in the same clause worth noting: non-recovery of significant dues from debit-balance clients; significant dues to credit-balance clients; **pledging securities of credit-balance clients and using the funds for own purposes or to fund debit-balance clients**; **mis-reporting / wrong reporting about client funds or securities**; significant increase in RBS score; terminal disabled for a number of days in the previous quarter.

## 5.5 Bank and demat account reporting — **2026 change** [verified]
**SEBI HO/38/11/(1)2026-MIRSD-POD/I/7656/2026, 23-Mar-2026, "Ease of doing business measures – Relaxations in certain reporting requirements for certain Stock Brokers and doing away with the requirement of reporting of demat account"** — https://www.sebi.gov.in/legal/circulars/mar-2026/ease-of-doing-business-measures-relaxations-in-certain-reporting-requirements-for-certain-stock-brokers-and-doing-away-with-the-requirement-of-reporting-of-demat-account_100511.html (PDF `.../attachdocs/mar-2026/1774264133189.pdf`). **In force from 17-Apr-2026.**

- **Para 15.4.2 of the Master Circular (reporting of demat accounts to exchanges) is DELETED.** Demat-account reporting by brokers to exchanges is **done away with**.
- **Only bank accounts** are now communicated — **within 7 working days of opening**, and **within 7 working days of closure**.
- Brokers which are **also banks or primary dealers** report **only those bank accounts used for stock broking activities**.
- The tagging requirement at 15.3.4 does **not** apply to brokers which are **primary dealers** for demat accounts used exclusively for non-broking activity (previously the carve-out existed only for banks).
- **Depositories** now provide details of all demat accounts opened/closed by a broker **directly to the concerned exchanges**, periodicity to be jointly determined by exchanges and depositories.
- Non-compliance on bank-account nomenclature/reporting and demat nomenclature attracts penal action per exchange/depository provisions.

NSE's implementation is in NSE/INSP/73976 cl. 8.2, which also records a standing requirement **[verified]**: members must give an **undertaking authorising the Exchange to instruct their bank(s) to provide information/statements for all bank accounts directly to the Exchange or through an exchange-authorised fintech solution provider**, must keep their banks notified of that authorisation, and need **not** submit a fresh authorisation for each new bank account. Format = **Exhibit 42**. (Note: items 67 and 68 of the 70-submission list still read "Reporting of Bank Accounts / Reporting of Demat Accounts — within one week of account opening/closing" — the Apr-2026 Exhibit 53 predates the 17-Apr-2026 effective date, so item 68 is now **stale**.)

## 5.6 The 2025/2026 single-filing reform — materially important for a multi-exchange member [verified]
**NSE/INSP/73976 cl. 8.19 "Technology based sharing mechanisms of common submissions among Exchanges"** (refs **NSE/INSP/69184, 18-Jul-2025** and **NSE/INSP/70505, 29-Sep-2025**):

> "Members of NSE who are also registered with any other exchange(s) (**BSE / MSE / MCX / NCDEX**) are required to **submit their compliance reports/submissions to NSE only**. Such members are **not required** to submit compliance reports to other exchange(s)… NSE will **share these submissions (including data/documents)** with other exchange(s) where the member is also registered. **Submission of data/report to NSE alone will be treated as submission to other exchanges.**"

- The list is **Exhibit 53 – "Common Submission among Exchanges" — 70 compliance reports/submissions**. I read all 70. Items 1–39 are QSB-specific (NSE/INSP/56927 Annexure A). Items 40–70 are general, and include: AI/ML reporting; proof of insurance cover; KMP/director PAN updation (within 7 days); technical-glitch incident reporting and glitch-monitoring parameters (real time); event-based changes (non-designated and designated directors, shareholding/share capital, advertisements, change in control, change in status/constitution/merger, appointment and change of Compliance Officer, correspondence address, registered office address, member name change, NOC for WOS/JV); CSCRF cyber-audit and VAPT reports (QSB and non-QSB variants); SaaS software reporting (within 30 days); QSB investor-service-centre details (monthly within 7 days); **Holding statement (T+1)**; **UCC wise settlement of client funds (10 trading days)**; bank-account reporting; demat-account reporting (now redundant); **half-yearly net worth certificate** (MTF members: 45 days from H1 ending 30-Sep and 60 days from H2 ending 31-Mar; non-MTF: 60 days from both); **Annual Returns — annually by 31 October**.
- **Processing, monitoring and supervision of compliance remains with each exchange** — only the filing is centralised.
- ⚠️ **The AP inspection report is NOT in the 70-item list** — only the *QSB declaration* about AP supervision (item 36) is. **Inference ([likely], not verified): a member must file the quarterly AP inspection report separately with EACH exchange** (NSE via ENIT, MCX via approfile.mcxindia.com, BSE via its own portal). This is consistent with the fact that AP approval itself is per-exchange and per-segment, and with MCX issuing its own ATR circular on the same day as NSE. **Worth confirming with the exchanges before publishing as fact.**

Other NSE cross-reference points for the docs **[verified]**:
- **Half-yearly net worth** (NSE/COMP/73981 cl. 5.5): within **2 months** of the half-year — **31 May** (H1 ending March) and **30 November** (H1 ending September). ⚠️ Note this **conflicts** with Exhibit 53 item 69 (45/60 days from 30-Sep and 31-Mar) and with the SEBI Master Circular Section X item 9 (**certificate as on 31 March and 30 September, submitted not later than 30 April and 31 October**). **Three different formulations in three live documents — mark as [uncertain] and confirm before publishing a date.**
- **Statement of Accounts to clients** — **weekly** (Monday–Saturday), sent **on or before the next 4 trading days of the subsequent week**; not required for clients with zero funds, zero securities, zero commodities **and** flagged Inactive (no trades in 24 months across all exchanges) in the exchange UCC database. Client should raise disputes **preferably within 7 working days** of receipt (NSE/INSP/73976 cl. 4.5).

---

# 6. 2026 changes (Jan-2026 → 15-Oct-2026)

| Date | Change | Source | Evidence |
|---|---|---|---|
| **23-Mar-2026** (eff. **17-Apr-2026**) | **Demat-account reporting to exchanges abolished**; bank accounts only, within 7 working days of opening/closure; bank/PD carve-outs widened to primary dealers; depositories now feed demat open/close data to exchanges directly | SEBI HO/38/11/(1)2026-MIRSD-POD/I/7656/2026 | **[verified]** |
| **02-Apr-2026** | TMs directed to **mark inactive/close all existing UCCs not verified by KRA by 30-Apr-2026**; "any non-compliance will be viewed seriously" | NSE/ISC/73596; MCX/T&S/176/2026 (02-Apr-2026, same subject) | **[verified]** |
| **29/30-Apr-2026** | Fresh annual **master/consolidated circulars** across the board — NSE Membership Compliance (NSE/COMP/73981), Inspection (NSE/INSP/73976), UCC (NSE/ISC/73973), Surveillance (NSE/SURV/74008), NCL F&O (CMPT/73997), Currency (CD/73998), Commodity (COM/74020), Clearing Members (CMPL/74024); ICCL master circulars updated till 31-Mar-2026 (notices 20260429-10/21/33/34/39/40) | NSE, ICCL | **[verified]** |
| **Apr-2026** | **Index position limits removed from the NCL F&O consolidated circular** — Item 11 now covers only single securities and MWPL; index limits live solely in the Surveillance stream (NSE/SURV/74008 item 31) | NCL/CMPT/73997 vs NSE/SURV/74008 | **[verified]** |
| **09-Apr / 01-Jun / 05-Aug-2026** | MCX revises the **method of levying AP Annual Subscription Charges**, extends the FY-2026-27 billing cut-off, then revises **AP cancellation charges** and refunds for APs re-activated in FY-2026-27 | MCX/MEM/187/2026, 326/2026, 450/2026 | **[verified]** titles/dates; amounts **[unknown]** |
| **03-Jul-2026** | SEBI circular on **Handling of Client's Unpaid Securities by Trading Members** | SEBI (title and date confirmed in the SEBI listing) | **[verified]** title/date; contents **[unknown]** |
| **17-Jul-2026** | **General Operational Guidelines on UCC**: immediate updation of client changes; include demat details in modification files **only when changed** (unchanged demat details trigger depository re-verification and can break Permitted-to-Trade status); NSDL/CDSL DP-ID/BO-ID format; KRA-validated/registered before transacting; full-file reconciliation facility; gross annual income kept current; **22:00 hrs previous-day compliance cut-off**; list of files NSE disseminates | NSE/ISC/75249 | **[verified]** |
| **31-Jul-2026** | **Intraday snapshot regime changed for the Closing Auction Session**: no snapshot from CAS start until index equilibrium price is determined; **additional 5th-snapshot window** from equilibrium determination to **15:40**; close price used for delta and valuation post-equilibrium; **no 15-minute cure period for any snapshot after 14:45**; Black-Scholes time-to-expiry uses the **15:40** derivatives close on expiry day. Also: CAS orders excluded from cash-segment OTR | NSE/SURV/75524 | **[verified]** |
| **06-Aug → 01-Oct-2026** | **MCX new UCC interface** — MCX UCC File Formats **v1.1** + **UCC-API v1.0** (UCC file from member, response file, error codes, PAN-verification export). Go-live slipped 07-Sep → (504/2026) → 16-Sep (523/2026) → 25-Sep (546/2026) → **05-Oct**, then **"extended until further communication"** on 01-Oct-2026 (556/2026). **As at 15-Oct-2026 there is NO live date.** | MCX/S&I/453, 504, 523, 546, 556 of 2026 | **[verified]** |
| **21-Aug-2026** | **AP Action Taken Report introduced** (NSE and MCX, same day): disciplinary action within **2 months** of quarter end, **ATR within 3 months**; **7 days** where termination is prescribed; applies from the **Jul–Sep 2026** quarter. Operational guidelines for ATR submission **still awaited** | NSE/COMP/75878; MCX/COMP/480/2026 | **[verified]** |
| **09-Sep-2026** | **Commodity derivatives position limits and penalties overhauled** — see detail below | SEBI HO/47/16/13(5)2026-MRD-POD1/I/20735/2026; MCX/S&I/513/2026; NCL/COM/76267; NSE/SURV/76726 | **[verified]** |
| **11-Sep-2026** (go-live **09-Oct-2026 EOD**) | **Enhancement of validations in UCC fields** — comprehensive field-level validation changes for creation/modification; new Annexure A (New Bulk Upload), Annexure B (Bulk Modification), **TDD-UCI External interface v2.2** (UAT and LIVE); UAT at `lama.uat.nseindia.com/MemberPortalRevamp/` and `clientprofilinguat.nseindia.com/uciservice/api/clientupload`; members told to use the Bulk Modification file only for fields actually changing | NSE/ISC/76299 | **[verified]** |
| **06-Oct-2026** | NSE begins **disseminating next-day index position limits in quantity terms** via the new `Index_deriv_pos_limit_DDMMYYYY` file ("F&O-Index Derivatives Position Limit") at Market Data → Derivatives → Daily Reports | NSE/SURV/76750 | **[verified]** |
| **07-Oct-2026** (eff. **02-Nov-2026**) | `oi_cli_limit_DD-MMM-YYYY.lst` will carry **stocks only** — index limits move out of the client-level position-limit file | NCL/CMPT/76766 | **[verified]** |
| **01-Oct-2026** | SEBI: **Display of "investor awareness message(s)" by stock brokers on their trading apps and websites, under Project Jagrook** | SEBI (listing) | **[verified]** title/date; contents **[unknown]** |
| **14-Oct-2026** (eff. **26-Oct-2026**) | New MCX **agri open position limits** incl. near-month, with **Crude Sunflower Oil** added (contract launched 12-Oct-2026) | MCX/S&I/579/2026 | **[verified]** |

### The 09-Sep-2026 commodity change in detail [verified]
SEBI HO/47/16/13(5)2026-MRD-POD1/I/20735/2026 — https://www.sebi.gov.in/legal/circulars/sep-2026/review-of-position-limits-for-clients-and-penalty-provisions-for-violation-breach-of-position-limits-for-commodity-derivatives-segment_104387.html — **in force with immediate effect**, amending paras 3.4.3 and 3.5.2 of the Aug-2023 Commodity Master Circular.

**(a) Annexure J penalties — now CAPPED.** Monetary penalty on the member for client-level OI violations (own account or client/clubbed-client level), **per day of violation**:

| Case | Penalty |
|---|---|
| Violation **> 2%** of the prescribed limit | (limit exceeded × closing price × number of days × **2%**) **or ₹2,00,000, WHICHEVER IS LOWER** |
| Violation **up to 2%** of the prescribed limit | (limit exceeded × closing price × number of days × **2%**) **or ₹10,000, WHICHEVER IS LOWER** |

(Option penalty computed on the **near calendar month underlying future close price**.)
- The member must bring the position within limits **by the next trading day** after the violation; if the violation continues the **Exchange will square off the excess position without further notice**, by placing orders on the member's behalf in that client code, and **will not be responsible for the consequences**.
- **>3 instances of the >2% case** for a TM in a **calendar month**, in the **same commodity** → **member put on square-off mode for one day**.
- **>3 instances** of the >2% and ≤2% cases combined in a calendar month → an **additional penalty equal to the OI-violation penalty** on the TM — **except where the violation arises exclusively from clubbing of positions**.
- Repeated violations may draw SEBI action against the member.
- Penalties are credited to the **Investor Protection Fund** of the exchange.

**(b) 'Broad Commodity' redefined**: an agri commodity is **Broad** if it is not Sensitive **and** average deliverable supply over the past five years is **≥10 lakh MT** or **≥₹5,000 crore**.

**(c) Client-level numeric limits, as a % of deliverable supply**:

| Category | Client-level position limit |
|---|---|
| **Broad** | **2% of deliverable supply** |
| **Narrow** | **1%** |
| **Sensitive** | **0.5%** |

Numbers rounded **downward** to appropriate zeroes. Commodities moving Narrow→Broad under the new definition **retain the 1% limit for one year**; thereafter the exchange may, on review and satisfaction, raise them to 2%.

---

# Gaps and cautions

### Could not be verified at all
1. **Every BSE-specific item.** `www.bseindia.com` is an Angular SPA serving only nav chrome; `api.bseindia.com` returns Akamai "Access Denied" under every header permutation; `DownloadAttach.aspx` 404s; Wayback CDX timed out and the availability API rate-limited. **Both of your BSE date sets (30-Apr/31-Jul/31-Oct/31-Jan and 27-Apr/17-Jul/26-Oct/15-Jan) are therefore [unknown], not [likely]** — I could not name even one source for the BSE instance. The NSE analogue of the first set is **verified identical**; the second set **does not reconcile** with the FY2026-27 settlement calendar and is almost certainly a one-year snapshot of a floating 10-trading-day rule. **A follow-up session with browser access (claude-in-chrome against bseindia.com) would close this.**
2. **ICCL/BSECL "Master circular – Membership compliance" and "Master circular – Member inspection" (notices 20260429-34 and 20260429-33)** — I retrieved the covering notices but their **Annexure-1 attachments**, which hold all the substance, are not at any guessable URL. These are the documents that would settle the BSE AP-inspection and UCC-wise-settlement dates.
3. **NSE/SURV/68845 (30-Jun-2025)** — the foundational NSE circular on FutEq position-limit monitoring and the **RPT cash/cash-equivalent reporting framework** — is a **12-page image-only PDF** (no text layer) and no OCR tooling (tesseract/ocrmypdf/pymupdf) is installed. I reconstructed its content from the later circulars that quote it (SURV/70553, SURV/71673, SURV/74008), but **its Annexure 1 para 2 — the primary statement of the RPT reporting mechanics — is unread**.
4. **Exhibit 23 (UCC-wise settlement details format)** — 1-page image-only PDF; **the field list of that file is [unknown]**.
5. **Part C(49)** — "Format of letter to be provided by Clearing Member for disclosure of Client Position in Index Based Contracts" of **NCL/CMPT/61801 (29-Apr-2024)**. The template was not retrieved, and the Apr-2026 consolidated circular appears **no longer to carry it**, while the Apr-2026 surveillance circular still cites it. **A live ambiguity — flag it rather than paper over it.**
6. **NSE penalty quantum for AP and UCC filing defaults** — NSE routes everything to "Chapter 10 / Penalty Dashboard (Exhibit 54)" without a printed table in the text I read. Only **MCX's** AP penalty schedule is verified. Do not quote NSE amounts.
7. **MCX hedge-limit application portal** — the Hedge Policy names **no portal**; submission is documentary (Annexures 1–4) with `marketoperations@mcxindia.com` for queries and the Trading Department as addressee. If a portal exists, it is not in the policy. **Do not invent one.**
8. **SEBI 2018 circular discontinuing sub-broker registration** — not located within this session's constraints. Do not cite a reference number for it.
9. **Exhibits not read** (contents [unknown]): Exhibit 26 (AP registration checklist/formats), Exhibit 29 (indicative AP disciplinary actions), Exhibit 34 (SOP for monitoring client funds), Exhibit 41 (format of Register of Securities / Holding Statement / Bank Book / Client Ledger), Exhibit 54 (Penalty Dashboard).

### Internal inconsistencies in live primary sources — carry the caveat, don't pick a side silently
10. **Half-yearly net worth certificate deadline — three different formulations**: SEBI Master Circular Section X item 9 says *"not later than 30 April and 31 October"*; NSE/COMP/73981 cl. 5.5 says *"within 2 months … 31 May and 30 November"*; Exhibit 53 item 69 says *"45 days (MTF, H1 Sep) / 60 days"*. **[uncertain]** — confirm before publishing any date.
11. **RPT reporting timing post-glide-path**: NSE/SURV/74008 (Apr-2026) still carries *"Till December 05, 2025, clearing members shall report on T+1 day by 12:00 noon"* — stale text for a framework the Dec-2025 circular confirms continues. **[uncertain]**.
12. **MCX AP misconduct reporting deadline**: **2 working days** (MCX/MEM/052/2022) vs **1 working day** (MCX/INSP/572/2024). Later circular governs, but both texts are live on the site.
13. **MCX AP inspection periodicity**: MCX/MEM/052/2022 says **yearly**; MCX/COMP/480/2026 implies **quarterly with a 31-July Q1 deadline**. The 2026 circular governs, but **no MCX circular explicitly announcing the annual→quarterly switch was found** — likely one exists that my title-keyword search missed.
14. **Exhibit 53 item 68 (demat account reporting)** is **stale** — superseded by the SEBI circular of 23-Mar-2026 effective 17-Apr-2026, which is *after* the exhibit's 30-Apr-2026 publication but amends a rule the exhibit still lists.
15. **Brent Crude Oil client limit**: SEBI Annexure M says **400,000 BBL**; NCL/COM/74020 says **4,000,000 barrels** for BRCRUDEOIL. **[uncertain]** — contract-size difference or typo. Check the live exchange limit file.
16. **MCX/S&I/579/2026 printed typos**: Crude Sunflower Oil exchange-wide limit reads "1,540,000" (inconsistent with 10× the member limit pattern) and Cardamom reads "1,2700". Reproduce the client/member/near-month table (which is internally consistent) and treat the exchange-wide column with care.

### Inferences, labelled as such
17. **"The quarterly AP inspection report must be filed with each exchange separately"** — **[likely]**, by inference from its absence from NSE's 70-item common-submission list plus the per-exchange nature of AP approval plus MCX and NSE issuing parallel ATR circulars on the same day. **Not verified.**
18. **"BSE uses the same 10-trading-day rule for UCC-wise settlement details rather than fixed dates"** — **[likely]**, by inference from the NSE circular's own words ("decided in joint consultation with other Exchanges and SEBI"). **Not verified.**

### Reusable tooling note for the next session
The working access routes are worth recording: SEBI's circular listing accepts `search=`, `fromDate=`/`toDate=` (**DD-MM-YYYY**) and `nextValue=` as **GET** params and is fully scriptable; SEBI circular bodies live in `sebi_data/attachdocs/<mon-year>/<digits>.pdf` linked from the page HTML (regulations are served in an **iframe** pointing at the same path); the NSE circulars API needs **`fromDate`/`toDate`**, not the documented `from_date`/`to_date`; MCX needs the full `Sec-Fetch-*` + `Referer` header set, after which `/circulars/all-circulars/GetFilteredAnnouncements?CircularTitle=…&page=N` works; `icclindia.com` is plain server-rendered ASP.NET. Several SEBI and exchange PDFs need `gs -sDEVICE=pdfwrite` repair before `pdftotext`, and a handful are **image-only** — **installing `tesseract-ocr` would unblock items 3 and 4 above.**

# Equity derivatives lifecycle — broker operations research

| Document control | Value |
|---|---|
| Research cutoff | 2026-10-15, India; rule status assessed against sources retrieved in this research session. |
| Scope | Indian broker operating NSE and BSE equity F&O; currency and MCX comparisons only where needed to prevent applying equity rules to another segment. |
| Evidence discipline | Each factual table row carries an evidence tag and linked source. A tag applies to the factual cells in that row; separately labelled recommended controls are implementation advice, not claims that a regulator prescribed that workflow. |
| [verified] | Supporting primary text was read: regulator/exchange/clearing corporation document or official product page. It does not mean every later circular or today's member-only parameter file was available. |
| [likely] | At least two independent secondary publishers corroborate the claim; named in the row. |
| [uncertain] | A single secondary source, inaccessible original, unresolved conflict, or incomplete implementation evidence. |
| [unknown] | Not established; no invented operational value supplied. |
| Dates and precedence | Notification date, effective date, contract-generation date and first affected expiry are different fields. Later operative circulars override older consolidated text; consultations are proposals. |
| Research method | More than 40 targeted web search queries, primary-document downloads and section-level reading. The pre-existing draft was used only for leads; incomplete sections and claims were reworked. |

## 1. Priority findings and rule status

| Issue | Finding as of cutoff | Notification / effectiveness | Evidence |
|---|---|---|---|
| NSE expiry | **Tuesday**; monthly stock/index derivatives on the **last Tuesday**; holidays move expiry to the preceding trading day. | NSE/FAOP/68747, 25 Jun 2025; revised weekday for expiries from Sep 2025. | [verified] [NSE expiry circular][NSE-EXP]; [current specifications][SPEC]. |
| BSE expiry | **Thursday**; monthly stock/index contracts on the **last Thursday**. This is corroborated, but the BSE originals were inaccessible in this session. | BSE 20250617-11, 17 Jun 2025, approval communication; 20250623-59, 23 Jun 2025, implementation; contracts expiring on/after 1 Sep 2025. | [likely] HDFC SKY and ICICI Securities independently confirm weekday/date; NoticeBlue reproduces both numbered notices. [HDFC][HDFC-EXP], [ICICI][ICICI-EXP], [notice reproduction][BSE-EXP-MIRROR]. Exact notice references remain subject to obtaining originals. |
| SEBI standardisation | Each exchange chooses Tuesday or Thursday, one weekly benchmark index option; other equity derivatives have minimum one-month tenor and monthly expiry on the chosen last weekday. | SEBI expiry circular, 26 May 2025; exchange-specific transition schedules implement it. | [verified] [SEBI circular landing page][SEBI-EXP]; [NSE implementation][NSE-EXP]. |
| Expiry price in 2026 | **CAS-based cash closing prices replaced the old universal last-30-minute cash VWAP description from 3 Aug 2026**; index final settlement uses constituent closing prices; stock final settlement uses volume-weighted cash closes across exchanges. | SEBI HO/47/11/11(3)2025-MRD-POD2/I/2765/2026, 16 Jan 2026, §4.9 and §6.1. | [verified] [CAS circular][CAS]. |
| Subsequent CAS review | September 2026 paper discusses alternative derivatives settlement calculations and trading hours. It is a **consultation**, not authority to revert live settlement to VWAP. | Paper dated 12 Sep 2026; comments due 3 Oct 2026. No final replacement was established by this research. | [verified] proposal status and current-rule description: [SEBI paper][CAS-CP]. [unknown] any final replacement issued at/after this cutoff. |
| Do not exercise | NCL discontinued the stock-option expiry-day DNE facility from **March 2023 expiry**. ITM exercise is automatic; client preference does not cancel delivery. | NCL/CMPT/55328, 20 Jan 2023, §g. | [verified] [DNE/net-settlement circular][DNE]; [NCL 2026 §5.3][NCL]. |
| Delivery ladder | E−4/E−3/E−2/E−1: **10% / 25% / 45% / 70% of computed delivery margin**, not of the full contract value. | NCL/CMPT/43262, 17 Jan 2020; applicable from 30 Jan 2020 expiry, margin levy from 24 Jan 2020; retained in 2026. | [verified] [original ladder circular][LADDER]; [NCL §10.2.7][NCL]. |
| Index option limits | PAN-level, per-index **FutEq** limits: EOD net ₹1,500 crore; gross long and gross short ₹10,000 crore **each**. Intraday net ₹5,000 crore, gross ₹10,000 crore each side. | EOD glide path 1 Jul–5 Dec 2025; normal implementation 6 Dec 2025. Intraday limits 1 Oct 2025; expiry-day ASD provision 6 Dec 2025. | [verified] [SEBI 2025/79][FUTEQ]; [SEBI 2025/122][INTRADAY]; [NSE surveillance §31][SURV]. |
| TM index limits | TM prop+client aggregate is still higher of **₹7,500 crore or 15% of market OI**, separately for index futures/options, on the existing notional basis. Do not replace it with the PAN option FutEq cap. | Explicitly restated by NSE/SURV/76750 on **6 Oct 2026**. TM FutEq reform in Dec 2025 consultation is not treated as effective here. | [verified] [Oct 2026 NSE circular][INDEX-LIMIT]; [SEBI May annexure][FUTEQ]. |
| Stock spreads on expiry | Near leg expiring today no longer earns calendar-spread benefit. **NCL implementation is 4 May 2026**, not an inferred 5 May date. | SEBI notified 5 Feb 2026, effective after three months; NCL 2026 consolidated circular explicitly gives 4 May. | [verified] [SEBI notification][STOCK-SPREAD]; [NCL §10.2.4 footnote and §10.4.5][NCL]. |
| STT current rates | From **1 Apr 2026**: option sale 0.15% of premium, purchaser's exercise 0.15% of intrinsic value, futures sale 0.05% of traded value. Physical stock delivery additionally attracts 0.10% on both receiver and giver. | Finance Act 2026 rates reflected in NSE's official table; physical-delivery treatment retained in NCL 2026. | [verified] [NSE STT][STT]; [NCL §6.1][NCL]. |

## 2. Contract lifecycle, listing calendar and contract master

### 2.1 Listed tenors and expiry

| Exchange / family | Available cycle established by source | Operations consequence | Evidence |
|---|---|---|---|
| NSE NIFTY futures | Three consecutive monthly contracts: near, next, far. | Replace expired near month with a new far month; futures are not weekly simply because NIFTY options are. | [verified] [NSE specifications][SPEC]. |
| NSE NIFTY options | Four weekly expiries excluding monthly expiries; three monthly expiries; three quarterly expiries on Mar/Jun/Sep/Dec cycle; next eight half-yearly expiries on Jun/Dec cycle after quarterly series. | Maintain explicit expiry dates and tenure labels; avoid double-counting a monthly expiry as a separate weekly series. | [verified] [NSE specifications][SPEC]. |
| NSE BANKNIFTY | Three monthly futures/options; options additionally three quarterly expiries. No current weekly BANKNIFTY series in this specification. | Remove stale weekly-product assumptions from UI, risk and rollover jobs. | [verified] [NSE specifications][SPEC]. |
| NSE FINNIFTY, MIDCPNIFTY, NIFTYNXT50 | Three monthly futures/options; no weekly series in current specification. | Monthly roll and last-Tuesday expiry. | [verified] [NSE specifications][SPEC]. |
| NSE NIFTYFPI | Nifty India FPI 150 futures/options appear in the official specification updated 11 Aug 2026; three monthly series, last Tuesday; symbol NIFTYFPI. | Add the sixth index to instrument/risk configuration. Exact first trading date is not independently established here. | [verified] [NSE NIFTYFPI product page][FPI150]; [specifications][SPEC]. [unknown] first-live circular/date. |
| NSE single stocks | Three monthly futures/options; last Tuesday, preceding trading day if holiday. New far-month contracts introduced on trading day following near-month expiry. | Settlement type must remain physical; rollover requires a new trade. | [verified] [individual securities specification][STOCK-SPEC]; [NCL §5.4][NCL]. |
| BSE SENSEX | Weekly, monthly and long-dated options; the transition notice reproduction explicitly includes quarterly and half-yearly options. Weekly futures ceased after 12 Aug 2025 according to that reproduction. | Do not offer SENSEX weekly futures from an obsolete specification. Number of currently listed weekly/long-dated expiries needs the current BSE master. | [likely] weekly/monthly Thursday options: HDFC SKY and ICICI Securities, [HDFC][HDFC-EXP], [ICICI][ICICI-EXP]. [uncertain] exact long-dated inventory and weekly-futures cessation: [single notice reproduction][BSE-EXP-MIRROR]. |
| BSE BANKEX, SENSEX50, single stocks | Monthly contracts; last Thursday according to HDFC's product table and BSE notice reproduction. | Stocks moved from second Thursday to last Thursday; do not use the old stock calendar. | [likely] HDFC SKY + NoticeBlue, [HDFC][HDFC-EXP], [BSE notice reproduction][BSE-EXP-MIRROR]. |
| BSE FOCIT | BSE Focused IT futures/options launched 11 May 2026 according to launch reporting and BSE's own announcement. | BSE's older three-index universe is incomplete; retrieve FOCIT specifications before enabling. | [likely] Business Standard + Yobee independently report launch; [Business Standard][FOCIT-BS], [Yobee][FOCIT-YB]. BSE official notice 20260415-34 is linked but inaccessible: [original][FOCIT]. |
| Weekly rationing | One weekly benchmark index option per exchange; the current core products are NIFTY at NSE and SENSEX at BSE. Other index and stock derivatives have monthly-or-longer tenor. | Calendar must be exchange/product specific. | [verified] general restriction: [SEBI 2024 framework][INDEX132], [SEBI expiry framework][SEBI-EXP]; NSE product: [SPEC][SPEC]. [likely] BSE choice: [HDFC][HDFC-EXP] + [ICICI][ICICI-EXP]. |
| Expiry vs settlement day | Expiry ends the derivative; cash settlement and securities delivery follow CC schedules. They are not the same operational event. | Keep expiry calendar separate from settlement-calendar and bank/depository cutoffs. | [verified] [NCL §§3–5, 8][NCL]. |

### 2.2 Exact expiry transition references

| Authority / reference | Notified | Effective mechanism | Evidence |
|---|---|---|---|
| SEBI 2025/76 | 26 May 2025 | Tuesday/Thursday framework; each exchange's approved weekday is implemented by its own circular. The SEBI landing page identifies SEBI/HO/MRD/TPD-1/P/CIR/2025/76. | [verified] [SEBI source][SEBI-EXP]. |
| NSE/FAOP/68747, Circular 111/2025 | 25 Jun 2025 | Contracts expiring on/before 31 Aug 2025 unchanged, subject to long-dated transition; new contracts expiring on/after 1 Sep generated with Tuesday dates from 26 Jun EOD. Existing Sep-onward NIFTY/BANKNIFTY long-dated expiries realigned in 31 Jul EOD master. | [verified] [NSE circular pp1–4][NSE-EXP]. |
| BSE 20250617-11 | 17 Jun 2025 | SEBI agreement to BSE's Thursday; new contracts expiring on/after 1 Sep; last Thursday monthly. | [likely] weekday/date: HDFC SKY + ICICI Securities. [uncertain] exact notice wording/reference verified through NoticeBlue reproduction only: [original link][BSE-APPROVAL], [reproduction][BSE-APPROVAL-MIRROR]. |
| BSE 20250623-59 | 23 Jun 2025 | Reproduction says revised index master at 24 Jun EOD, effective 25 Jun; stock master at 10 Jul EOD, effective 11 Jul; first revised SENSEX weekly date 4 Sep 2025. These are master-change dates, not the effective September expiry month. | [uncertain] [BSE original inaccessible][BSE-EXP], [NoticeBlue reproduction][BSE-EXP-MIRROR]. |
| Holiday adjustment | Per current contract specifications | NSE uses the prior trading day. A last-weekday label is not a substitute for the published maturity date. BSE's current full holiday convention was not directly retrieved. | [verified] [NSE specification][SPEC]. [unknown] primary BSE holiday text in force at cutoff. |

### 2.3 Daily master changes and recommended controls

| Object / event | Verified exchange behaviour or file | Recommended broker control — design guidance | Evidence |
|---|---|---|---|
| Main NSE master | contract.gz and NSE_FO_contract_ddmmyyyy.csv.gz; /faoftp/faocommon/; MII version also available through daily derivatives reports. | Archive each dated file; validate schema, instrument identity, expiry, strike, option type, lot, tick, permitted quantity and tradability before publishing. | [verified] [NSE consolidated §1.9, master table][NSE-MASTER]. |
| Spread master | spd_contract.gz and NSE_FO_spdcontract_ddmmyyyy.csv.gz; daily load required. | Validate both legs against that day's master; handle missing spread combinations during lot transitions. | [verified] [NSE §1.12][NSE-MASTER]; [lot-change circular][LOTS]. |
| Stock strike scheme | NSE_FO_SosScheme.csv contains symbol, month type, step and provided/reserve strike counts. | Compare actual enabled chain with scheme; do not synthesize tradable strikes client-side. | [verified] [NSE §1.11][NSE-MASTER]. |
| Quantity freeze | qtyfreeze.csv; quantity freezes reviewed monthly and for relevant corporate actions. | Enforce per-order freeze separately from client/TM position limits and margins. | [verified] [NSE §1.9][NSE-MASTER]. |
| New maturity | New near/next/far or weekly contract introduced according to product cycle after expiry. | Validate newly introduced expiry, closing expired series while retaining history for settlement. | [verified] [NSE stock specification][STOCK-SPEC]; [NIFTYFPI cycle][FPI150]. |
| Corporate action | Exchange may adjust lot/strike/contract terms; corporate-action changes may affect existing contracts. | Reconcile pre/post-adjustment quantities, costs, pending orders and risk exposure using the specific corporate-action circular. No universal factor is asserted. | [verified] [NSE §1.13 and corporate-action sections][NSE-MASTER]. |
| Intraday strike enablement | Reserve/additional strikes can be enabled in the move's direction; notification broadcast to trading terminals. | Support intraday instrument updates across market data, OMS, RMS, API and back office; retain enablement timestamp and reject unknown tokens. | [verified] [NSE §1.11][NSE-MASTER]. |
| Withdrawal of illiquid strikes | Stock-options review monthly; out-of-scheme zero-OI strikes disabled, existing-OI strikes retained. Long-term index review semiannual. | Do not delete an instrument merely because it is outside today's standard strike window. | [verified] [NSE §1.11][NSE-MASTER]. |
| BSE master format/path | Current primary technical file specification was not retrieved. | Obtain the current BSE member package and schema; do not borrow NSE filenames or copy a secondary example as authoritative. | [unknown] exact current BSE master filename, version and intraday protocol. |
| Rollover | Expired futures/options cease to exist; a new expiry is a distinct contract. | Treat rollover as closing/opening trades and a temporary margin event; never silently migrate client positions. | [verified] cessation: [NCL §5][NCL]; distinct cycles: [SPEC][SPEC]. Recommended execution control is a design inference. |

### 2.4 Strike counts — schemes, not a single universal cap

| NSE short-term series | Interval | Published ITM–ATM–OTM counts | Evidence |
|---|---:|---|---|
| NIFTY weekly/monthly | 50 | 35–1–35 | [verified] [NSE §1.11][NSE-MASTER]. |
| BANKNIFTY monthly | 100 and 500 | 50–1–50 at 100; 15–1–15 at 500, including overlapping 500-grid strikes. Do not add both counts as unique strikes. | [verified] [NSE §1.11][NSE-MASTER]. |
| MIDCPNIFTY monthly | 25 and 100 | 30–1–30 at 25; 15–1–15 at 100, including overlaps. | [verified] [NSE §1.11][NSE-MASTER]. |
| FINNIFTY near month | 50 and 100 | 25–1–25 at each grid; wider grid includes overlapping finer-grid strikes. | [verified] [NSE §1.11][NSE-MASTER]. |
| FINNIFTY middle/far month | 100 and 500 | 20–1–20 at 100; 6–1–6 at 500, including overlaps. | [verified] [NSE §1.11][NSE-MASTER]. |
| NIFTYNXT50 monthly | 100 and 500 | 40–1–40 at 100; 20–1–20 at 500, including overlaps. | [verified] [NSE §1.11][NSE-MASTER]. |
| NIFTY/BANKNIFTY long dated | Current consolidated table: 1,500 | 5–1–5; framework permits minimum 1–1–1 and maximum 5–1–5 with at least 5% coverage each side. NIFTY table cites NSE/FAOP/71819 dated 16 Dec 2025. | [verified] [NSE §1.11, pp23–24][NSE-MASTER]. |
| NIFTYFPI and BSE current chains | Not asserted here | Exact current numeric schemes require their latest product circular/master. | [unknown] numeric strike scheme independently verified for these products. |
| Interpretation | Base scheme plus live enablements and retained OI strikes | Counts above are not proof that a live chain can never contain more strikes. The exchange explicitly permits intraday expansion and retention of out-of-scheme OI. | [verified] [NSE §1.11][NSE-MASTER]. |

| NSE stock options | Near / middle month | Far month | Evidence |
|---|---|---|---|
| Narrow step | Base step, determined by stock volatility | Twice base step | [verified] [NSE §1.11 stock scheme][NSE-MASTER]. |
| Wide step | Twice base step | Four times base step | [verified] [NSE §1.11][NSE-MASTER]. |
| Narrow counts | Minimum 3–1–3; maximum 12–1–12 | Minimum 3–1–3; maximum 6–1–6 | [verified] [NSE §1.11][NSE-MASTER]. |
| Wide counts | Minimum 1–1–1; maximum 12–1–12 | Minimum 1–1–1; maximum 6–1–6 | [verified] [NSE §1.11][NSE-MASTER]. |
| Coverage / ATM | Narrow about 10%, wide adds about 5%, subject to min/max counts; ATM from previous underlying close rounded to interval. | Same framework, different step/count. | [verified] [NSE §1.11][NSE-MASTER]. |
| Review / expansion | Step reviewed quarterly; new strikes from prior close for next working day; intraday addition in direction of move permitted at exchange discretion. No fixed percentage-move trigger or guaranteed minute interval found. | Same. | [verified] mechanism: [NSE §1.11][NSE-MASTER]. [unknown] universal activation trigger/time. |
| Illiquid-strike removal | Review EOD on first trading day after monthly expiry; disabling effective second trading day after expiry; out-of-scheme with zero OI only. | Same. | [verified] [NSE §1.11][NSE-MASTER]. |

## 3. Expiry-day settlement, exercise, tax and workflow

### 3.1 Prices and the 2026 closing auction

| Item | Operative rule / distinction | Evidence |
|---|---|---|
| Index futures final settlement | Closing value of underlying index on expiry, calculated from constituent closing prices. Cash-settled. | [verified] [CAS §4.9.1][CAS]; [NCL §5.1][NCL]. |
| Index options final exercise price | Same underlying final-settlement reference determines ITM and cash exercise value; call intrinsic = max(final price − strike, 0); put = max(strike − final price, 0). | [verified] [CAS §4.9][CAS]; [NCL §§4–5][NCL]. Formula is a direct arithmetic expression of the payoff, not a quoted source example. |
| Stock futures final settlement | CC computes volume-weighted average of cash closing prices across exchanges. Futures final MTM is cash settled; delivery valued at futures final settlement price. | [verified] [CAS §4.9.1][CAS]; [NCL §5.4.2][NCL]. |
| Stock options | Closing/settlement price determines moneyness; delivered shares and funds are exchanged at the option's **strike price**. Do not substitute spot LTP for exercise test, or final spot settlement for delivery strike. | [verified] [NCL §§5.3–5.4][NCL]; [CAS §4.9][CAS]. |
| Daily futures MTM, unexpired | NCL consolidated §4.1 specifies last-30-minute VWAP of the **futures contract** across exchanges; theoretical valuation if untraded in that window. This is distinct from expiry's underlying-based final price. | [verified] [NCL §§4.1–4.2][NCL]. [uncertain] precise post-CAS clock-window implementation in later CC SOP was not retrieved; do not hard-code 15:00–15:30. |
| Old final-settlement rule | Before CAS, constituent/stock cash closes used the last 30 minutes of continuous trading. The September paper explicitly describes this as the prior rule. | [verified] [SEBI CAS review §3.3][CAS-CP]. |
| CAS reference vs final price | Reference uses cash trades 15:00–15:15. If absent, day's LTP; if no trade that day, previous close adjusted as applicable. Final CAS price is auction equilibrium, with reference-price fallback if no equilibrium. | [verified] [CAS §§4.3, 4.6][CAS]. |
| Scope | Initial CAS applies to cash stocks with derivatives; remaining securities retain last-30-minute CTS VWAP. An index can contain securities using different closing mechanisms; consume official constituent/index closes. | [verified] scope: [CAS §4.1][CAS]. Mixed-mechanism caution is an operational inference. |
| CAS sequence and derivatives close | Transition/reference 15:15–15:20; market+limit order entry 15:20–15:25; limit-only entry 15:25–15:30 with random close 15:28–15:30; matching 15:30–15:35; equity derivatives trade until **15:40**. | [verified] [CAS §4.2][CAS]. |
| Post-close cash | 15:50–16:00 at closing price. It is not an extension of derivative trading or a guaranteed remedy for missing inventory. | [verified] window: [CAS §4.2.4][CAS]. Remedy caution is a design inference. |
| CAS stock-futures constraints | Cash auction ±3% from reference; stock futures aligned during 15:15–15:40 and normal dynamic price-band flexing suspended in that period. | [verified] [CAS §4.4][CAS]. |
| Proposal still distinct | Sep 2026 consultation considers blended CTS+CAS VWAP versus CTS-only VWAP with later transition; revised closing windows also proposed. | [verified] **proposal only**, [SEBI review][CAS-CP]. [unknown] final adoption before/at cutoff. |

### 3.2 Exercise, assignment and STT

| Event / complaint | Rule and broker explanation | Evidence |
|---|---|---|
| Exercise style | European; index and stock ITM options automatically exercised on expiry. OTM/ATM have no positive intrinsic exercise payoff. | [verified] [NCL §5.3][NCL]. |
| Assignment | Exercised long positions allocated against shorts in the same series at client level on a **random** basis. Avoid describing allocation as pro-rata. | [verified] [NCL §5.3][NCL]. |
| DNE | Stock DNE withdrawn from March 2023 expiry; old CTM/DNE upload and response reports were also discontinued by the same circular. | [verified] [NCL/CMPT/55328 §g and Annexure E][DNE]. |
| Reintroduction rumours / alternative settlement | No current NCL DNE reinstatement established. A consultation about ITM stock-option devolvement into futures is not an operational election. | [verified] automatic exercise in [NCL 2026 §5.3][NCL]; **proposal**: [Dec 2024 consultation][DEVOLVE-CP]. [unknown] final implementation of that proposal. |
| Option sale STT | Seller: **0.15% of premium**, effective 1 Apr 2026, previously 0.10%. | [verified] [NSE official STT table][STT]. |
| Exercise STT | Purchaser/holder: **0.15% of intrinsic value**, effective 1 Apr 2026, previously 0.125%. Do not apply exercise STT to full index notional. | [verified] [NSE official STT table][STT]; [NCL §6.1(6)][NCL]. |
| Assigned option writer | Exercise tax is specified as purchaser-payable; assignment does not turn the writer into the exercise-tax payer. Writer already bears sale-premium STT; physical delivery may separately attract delivery STT. | [verified] [NCL §6.1 table and (7)][NCL]; [NSE STT][STT]. |
| Physically settled stock F&O | **0.10% delivery STT payable by both purchaser/receiver and seller/giver**, in addition to applicable derivative trade/exercise tax treatment. Netting cash/F&O settlements does not merge the tax bases. | [verified] [NCL §6.1(7)][NCL]; [SEBI netting §3.5][NET]. |
| Futures sale STT | Seller: **0.05% of traded futures value**, effective 1 Apr 2026, previously 0.02%. | [verified] [NSE STT][STT]. |
| Common expiry complaint — index | Client sees ITM proceeds and a new exercise STT debit despite making no sell order. Explain automatic exercise and intrinsic-value tax. Historical full-notional exercise-tax stories are not the current basis. | [verified] rule basis: [NCL §5.3][NCL], [STT][STT]. Complaint scenario is illustrative, not a frequency claim. |
| Common expiry complaint — stocks | A cheap option becomes ITM at closing determination; holder faces a full share/funding obligation and delivery tax, which can dwarf the premium. “I bought an option” does not exempt physical settlement. | [verified] underlying mechanics: [NCL §§5.3–5.4, 6.1][NCL]. Complaint scenario is illustrative. |
| Tax reconciliation | CC supplies client/TM liability detail; exercise and physical-stock tax collected with expiry+1 delivery pay-in. Contract note must specify total STT. | [verified] [NCL §§6.2, 6.4, 6.6][NCL]. |
| Tax caveat | NSE's STT web page retains a later generic sentence mentioning settlement price; its current rate/basis bullets and NCL §6.1 explicitly specify **intrinsic value** for exercise. | [verified] source inconsistency: [NSE STT][STT], [NCL][NCL]. Use current specific provisions and CC tax output. |

### 3.3 Recommended broker expiry-afternoon/evening sequence

| Sequence / owner | Recommended activity | Verified dependency / timing |
|---|---|---|
| Before session — reference data / RMS | Load expiry and settlement calendars, contract/lot changes, margin parameters, bans and exchange notices; calculate loss of spread offsets before giving client limits. | [verified] [NSE master requirements][NSE-MASTER]; [NCL §10][NCL]. Internal job time is [unknown]/broker-defined. |
| Before session — RMS / client service | Produce delivery candidates: futures, long/short ITM stock options and near-ATM options; show share/fund requirement and tax estimate; require delivery readiness or planned exit. | [verified] obligation basis: [NCL §5.4][NCL]. Watchlist breadth and warning cadence are recommended controls. |
| Afternoon — RMS / treasury / DP | Reconcile available cash, unencumbered deliverable shares and demat authority; reserve settlement funding; monitor fillability and margin shortfalls. | [verified] pay-in and delivery obligations: [NCL §§3, 8, 10.2.7][NCL]. Exact client deadlines are broker policy. |
| At 14:00 delta publication — RMS | For banned stocks, compare stored base and projected EOD positions using that day's CC 14:00 delta; detect increases/sign flips and arrange corrective execution. | [verified] [NCL §16.13][NCL]. |
| During expiry trading — dealing / RMS | Execute authorised exits or rolls for delivery-incapable clients; watch residual legs and failed/unfilled orders. Do not promise liquidation will complete in illiquid or price-constrained markets. | [verified] binding settlement basis: [NCL §5.4][NCL]; constraints: [CAS §4.4][CAS]. Forced-exit time and decision tree are broker policy. |
| 15:15–15:35 — market data / dealing | Track CAS state and indicative vs final prices; refresh delivery scenarios as moneyness changes. Record final official settlement values when published. | [verified] [CAS §§4.2, 4.6, 4.12][CAS]. |
| Until 15:40 — dealing / RMS | Complete derivative execution, including intended post-CAS offsets; keep same-day-expiring options in position-limit monitoring. Do not treat 15:30 as the derivative close under this regime. | [verified] [CAS §4.2.3][CAS]; [NSE/SURV/75524][CAS-SURV]. |
| After derivative close — back office / clearing | Reconcile executions/give-ups, final open positions, exercise/assignment and MTM/premium settlements; convert expiring stock F&O into security/funds obligations. | [verified] [NCL §§4–5][NCL]. Exact final-file delivery time is [unknown], not invented. |
| Evening — settlement / treasury | Reconcile same-security physical obligations and eligible cash offsets by UCC–TM–CM–CC; reconcile taxes separately; fund the correct capital-market settlement bank account. | [verified] [DNE/netting circular §§a–c][DNE]; [NCL §5.4.3][NCL]. |
| Evening — client service / compliance | Send itemised expiry outcome: closed/expired/exercised contracts, security quantity, delivery price, cash, taxes, due funds/securities and unresolved failures; preserve contact and execution logs. | [verified] underlying tax/settlement duties: [NCL §§5–6][NCL]. Notification format/cadence is recommended policy. |
| Settlement day — treasury / DP / clearing | Complete pay-in, reconcile direct/depository and bank outcomes, identify shortages, follow auction/close-out, release margins only on settlement completion. | [verified] [NCL §§3, 8, 10.2.7][NCL]; [shortages procedure][SHORT]. Exact CC calendar times must be loaded for that settlement. |

## 4. Physical settlement of single-stock derivatives

### 4.1 Which positions deliver, quantity and value

| Position remaining at expiry | Securities obligation | Funds / valuation | Evidence |
|---|---|---|---|
| Long stock future | Receive shares | Pay futures final settlement price × quantity; final futures MTM separately cash settled. | [verified] [NCL §§5.4.1–5.4.2][NCL]. |
| Short stock future | Deliver shares | Receive final settlement price × quantity; final MTM separately. | [verified] [NCL §5.4][NCL]. |
| Long ITM call exercised | Receive shares | Pay strike × quantity. | [verified] [NCL §5.4][NCL]. |
| Short ITM call assigned | Deliver shares | Receive strike × quantity. | [verified] [NCL §5.4][NCL]. |
| Long ITM put exercised | Deliver shares | Receive strike × quantity. | [verified] [NCL §5.4][NCL]. |
| Short ITM put assigned | Receive shares | Pay strike × quantity. | [verified] [NCL §5.4][NCL]. |
| OTM option; positions closed before expiry | No delivery from that expired/closed option position | Executed premium/trade charges and other obligations remain. | [verified] delivery set is open futures plus exercised/assigned ITM options: [NCL §5.4][NCL]. |
| Quantity | Market lot × contracts resulting in delivery | Use lot applicable to that contract, including adjustment/transition. | [verified] [NCL §5.4.1][NCL]; [NSE lot rules][NSE-MASTER]. |
| Scope | Single-stock derivatives are physically settled; index derivatives cash settled. | A position's tax or margin product label does not change settlement type. | [verified] [SEBI eligibility circular p3][ELIG]; [NCL §5][NCL]. |

### 4.2 Staggered delivery margins

| Session relative to expiry E | NCL required fraction of calculated delivery margin | Ordinary NSE Tuesday example, no intervening holiday | Evidence |
|---|---:|---|---|
| E−4 EOD | **10%** | Previous Wednesday EOD | [verified] [NCL/CMPT/43262][LADDER]; Tuesday example expressly in [NCL §10.2.7][NCL]. |
| E−3 EOD | **25%** | Previous Thursday EOD | [verified] [LADDER][LADDER]; weekday mapping calculated from trading sessions. |
| E−2 EOD | **45%** | Previous Friday EOD | [verified] [LADDER][LADDER]; weekday mapping calculated from trading sessions. |
| E−1 EOD | **70%** | Monday EOD | [verified] [LADDER][LADDER]; weekday mapping calculated from trading sessions. |
| Expiry / post-expiry | Delivery positions attract applicable cash-market VaR, ELM and MTM, held until settlement. The ladder is not a rule saying “100% contract value exchange margin on E.” | Full funds/securities are nevertheless needed to discharge settlement obligations. | [verified] [NCL §§5.4, 10.2.7][NCL]. |
| Marginable position | Lower of potential deliverable positions and ITM long-option positions, at client level; re-evaluated EOD using revised positions, underlying close and cash margin rates. | Futures/short options already have their ordinary derivative margin; do not levy the pre-expiry long-option ladder indiscriminately as a universal extra percentage. | [verified] [NCL §10.2.7][NCL]. |
| Margin basis | Cash-segment VaR + ELM + applicable additional margins for that stock; marginable positions valued at underlying close; NCL also specifies strike valuation for ITM long-option positions. | Obtain actual CC calculation rather than a flat broker estimate. | [verified] [NCL §10.2.7][NCL]. |
| Illustration only | If computed delivery margin is ₹2,00,000: ₹20,000 / ₹50,000 / ₹90,000 / ₹1,40,000. These are **cumulative required levels**, not four amounts to add. | Calculated illustration; no assumed stock/lot/price. | [verified] arithmetic application of [NCL ladder][LADDER]. |
| House risk overlay | Brokers may demand earlier/higher funding and apply square-off policy. Zerodha's published E−1/full-value requirements differ from the NCL ladder. | Publish house margin and exchange margin in separate fields, with basis and deadline. | [verified] broker's own policy, not universal law: [Zerodha policy][BROKER-PHYS]; NCL floor: [NCL][NCL]. |
| BSE/ICCL confirmation | SEBI physical-settlement framework applies, but the current ICCL delivery-ladder circular and operational timestamp were not obtained. | Confirm the selected CC's rules; NCL percentages above are verified specifically for NCL. | [unknown] independently verified ICCL ladder/circular. |

### 4.3 Netting, shortages and internal risk policy

| Topic | Operational rule / recommended control | Evidence |
|---|---|---|
| Same underlying within F&O expiry | Aggregate signed share obligations across expiring futures, exercised calls and puts for the same client/security; receive legs positive, deliver legs negative. Different strikes retain different cash valuations. | [verified] [NCL §5.4 and Part C netting examples][NCL]. |
| Illustrative spread | Long future 100 shares and assigned short call 100 shares give zero net shares for the same eligible settlement. Their delivery-value difference and final MTM/tax may remain. | [verified] arithmetic inference from [NCL §§5.4, 6][NCL]; illustrative quantities, not a real contract lot. |
| Different expiries | A next-month hedge does not deliver this month; do not offset its shares against today's delivery obligation. | [verified] only expiry-open futures and current exercised/assigned positions deliver: [NCL §5.4][NCL]. |
| Cash-segment offset | Corresponding expiry-day cash trade obligations net with physical F&O where **same security and CM–TM–UCC**, and same CC/clearing arrangement. Different CMs/CCs do not qualify. | [verified] [SEBI 2022/165 §3.2][NET]; [NCL/CMPT/55328 §a][DNE]. |
| Institution exclusion | Cash/F&O settlement netting unavailable to institutional investors, including **all FPIs**. Non-institutional CP eligibility requires same custodian/CM and excludes delivery-only mandates such as relevant PMS arrangements. | [verified] [SEBI 2022/165 §§3.3–3.4][NET]. |
| What netting changes | Delivery/funds settlement and eligible margins; tax and stamp duty remain separately computed by segment. | [verified] [SEBI §3.5][NET]; [NCL §5.4.3][NCL]. |
| Settlement routing | Net obligation settles in capital-market settlement number/type; funds use capital-market settlement bank account. Separate F&O physical settlement calendar discontinued in NCL's implementation. | [verified] [NCL/CMPT/55328 §§b–c][DNE]. |
| EPI | Early pay-in benefit applied first to cash obligations; residual benefit to F&O net delivery under same CM–TM–client. Securities allocation uses cash-market settlement identifiers. | [verified] [NCL/CMPT/55328 §e][DNE]; [NCL §10.2.7.1][NCL]. |
| Margin benefit after conversion | Offset cash positions can reduce total cash margin and F&O delivery margin; residual positions still margined. No assignment margin on positions identified for delivery. | [verified] [NCL §10.2.7][NCL]. |
| Securities shortage | NCL identifies shortage, debits valuation, conducts buy-in auction under cash-market schedule. Seller bears auction difference; unprocured quantity closes out. Internal shortages also go through CC auction procedure. | [verified] [NCL §8][NCL]; [NSE shortages][SHORT]. |
| Ordinary auction timing | Buying-in auction on T+1 after payout for normal cash settlement; use actual settlement calendar/holiday schedule. | [verified] [NSE shortages][SHORT]. |
| Normal-market failed auction close-out | Higher of highest price across exchanges from trade day to auction day, or **20% above settlement price on auction day**. Corporate-action/direct-closeout cases have separate rules. This is not a flat “20% penalty on every shortage.” | [verified] [NSE shortages][SHORT]. |
| Funding failure | Buyer must meet clearing funds obligation; insufficient client funds are a broker/CM funding and default-management issue, not cancellation of exercise. | [verified] [NCL §§3, 8, 16][NCL]. |
| Recommended warning process | Identify exposure before E−4; refresh at each EOD and intraday near expiry; request delivery intent and available funds/shares; warn that OTM can become ITM; show contractual square-off policy and escalation contact. | [verified] risk basis: [NCL §§5.4, 10.2.7][NCL]. Process and cadence are recommended house policy. |
| Recommended forced-exit process | Restrict new expiry risk for deficient clients, record warnings, attempt authorised liquidation sufficiently before close, track unfilled orders/residual legs, escalate unavoidable delivery to treasury/DP/clearing. | [verified] risk basis: [NCL][NCL]. Exact square-off time/fee/notice period is [unknown] for this greenfield broker and must be set in its policy. |
| Inventory readiness | A margin pledge or portfolio display alone is not a completed securities pay-in. Check free/blocked quantity, depository authority and actual delivery acknowledgement. | [verified] pay-in mechanism: [NCL §8 and §10.2.7.1][NCL]. Recommended readiness test is a design inference. |

## 5. Position limits, open interest and surveillance

### 5.1 Measurement and index limits

| Measure | Basis / limit | Effective state and source |
|---|---|---|
| FutEq definition | Signed quantity × contract delta; net across portfolio for an underlying. Long future +1; long call positive; long put negative; shorts reverse sign. Gross addition of client net FutEq produces market measure. | [verified] [SEBI 2025/79 §5.1][FUTEQ]. |
| Quantity vs rupees | For index-option limits, net/gross FutEq quantity is multiplied by underlying index price; EOD uses close, intraday uses snapshot price. | [verified] [NSE surveillance §31.1, §31.19][SURV]. |
| EOD index option net | Absolute net exposure ≤ **₹1,500 crore**, per PAN/per index across option contracts/expiries. | [verified] [SEBI §5.5][FUTEQ]; [NSE §31.1][SURV]. Normal implementation 6 Dec 2025. |
| EOD index option gross | Long-delta side ≤ **₹10,000 crore** AND short-delta side ≤ **₹10,000 crore**. Long side = long calls + short puts; short side = short calls + long puts. Gross cannot be erased by opposite-side positions. | [verified] [NSE §31.1][SURV]. |
| Intraday index option limits | Absolute net ≤ **₹5,000 crore**; gross ≤ **₹10,000 crore per side**. | [verified] [SEBI/HO/MRD/TPD/CIR/P/2025/122 §§4,6][INTRADAY]; effective 1 Oct 2025. |
| Important separation | Generic FutEq framework covers derivatives; **index-option ceilings are for options** and index futures retain separate limits. Do not add a future hedge to erase an option ceiling. | [verified] [SEBI 2025/79 §5.5 and annexure][FUTEQ]; [2025/122 §4.10][INTRADAY]. |
| Futures — client, NRI, FPI-I, MF, TM proprietary | Higher of **₹500 crore or 15%** of that index's futures market OI. Gross notional basis. | [verified] [SEBI §5.5.2][FUTEQ]; [NSE Oct 2026 restatement][INDEX-LIMIT]. |
| Futures — FPI-II except individuals/family offices/corporates | Higher of **₹500 crore or 10%** of futures OI. | [verified] [SEBI §5.5.2][FUTEQ]; [NSE][INDEX-LIMIT]. |
| Futures — FPI-II individuals/family offices/corporates | Higher of **₹500 crore or 5%** of futures OI. | [verified] [SEBI §5.5.2][FUTEQ]; [NSE][INDEX-LIMIT]. |
| TM total — futures and options separately | Higher of **₹7,500 crore or 15%** of respective index futures/options market OI; prop+clients, existing gross-notional framework. | [verified] [SEBI May 2025 annexure][FUTEQ]; [6 Oct 2026 circular][INDEX-LIMIT]. |
| Market OI denominator | Previous day's market OI used for linked limits; passive excess caused by OI decline is not a violation if entity has not increased position. This relief does not authorise fresh increase. | [verified] [SEBI §5.5.2.5][FUTEQ]; [NSE §31.3][SURV]. |
| Holdings-backed additional exposure | Additional short index exposure supported by stocks; additional long exposure supported by cash/cash equivalents, G-secs/T-bills etc. NSE excludes bank guarantees. Documentation/reporting is required; not an automatic doubling of limits. | [verified] [SEBI §5.5.3][FUTEQ]; [NSE §31.2.1–2.2][SURV]. |
| Index MWPL / ban | Stock-style free-float MWPL and 95% ban mechanism are specified for single stocks, not the index-option ₹ limits. | [verified] scope contrast: [SEBI §§5.2–5.5][FUTEQ]; [NCL §11.4][NCL]. |
| Daily limit report | NSE/SURV/76750, 6 Oct 2026: Index_deriv_pos_limit_DDMMYYYY, fields index, instrument, qty_limit, category. Report available from 5 Oct for next-day applicable limits; dissemination effective 6 Oct. | [verified] [NSE source][INDEX-LIMIT]. No filename extension is invented. |
| Proposed TM reform | Dec 4, 2025 consultation reviews TM index limits, including FutEq-based options measurement. No final implementation established; Oct 6, 2026 circular still restates ₹7,500 crore/15% framework. | [verified] **proposal**: [SEBI consultation][TM-CP]; current positive evidence: [NSE][INDEX-LIMIT]. |

### 5.2 Single-stock MWPL and participant limits

| Topic / participant | Rule | Evidence |
|---|---|---|
| MWPL formula | **max(10% free-float shares, min(15% free-float shares, 65 × average daily delivered quantity))** in the NCL quantity implementation. SEBI calls the second limb ADDV; NCL explicitly specifies “in terms of quantity.” Do not multiply rupee ADDV and compare directly to share counts. | [verified] [SEBI §5.2][FUTEQ]; [NCL §11.4][NCL]. |
| Recalculation | Quarterly using preceding three-month rolling delivery data; NCL says applicable for next three calendar months, published on CC website and by circular by 20th of last month of reference quarter; corporate actions can adjust ex-date limits. | [verified] [SEBI §5.2.4][FUTEQ]; [NCL §11.4][NCL]. |
| Effective | Revised MWPL, stock-ban FutEq test and participant percentages effective **1 Oct 2025**. | [verified] [SEBI §6][FUTEQ]. |
| Client / NRI | **10% MWPL per exchange**; combine same client across members; NCL calls this gross open position across derivative contracts. | [verified] [NCL §§11.3,12][NCL]; [SEBI §5.8][FUTEQ]. |
| TM proprietary | **20% MWPL per exchange**. | [verified] [NCL §11.2][NCL]. |
| TM prop + clients | **30% MWPL per exchange**. | [verified] [NCL §11.1][NCL]. |
| FPI-I / MF aggregate | **30% MWPL**. | [verified] [SEBI §5.8.1.3][FUTEQ]; [NCL §12][NCL]. |
| FPI-II other than individuals/family offices/corporates | **20% MWPL**. | [verified] [SEBI §5.8.1.4][FUTEQ]. |
| FPI-II individuals/family offices/corporates; MF scheme | **10% MWPL**. | [verified] [SEBI §5.8][FUTEQ]; [NCL §12.2][NCL]. |
| Measurement caution | Market utilisation/ban is explicitly FutEq. NCL's ordinary client-limit clause still says **gross open position**. Preserve separate calculations; do not assume all stock limit checks can be net-delta checks just because the denominator changed. | [verified] exact distinction in [NCL §§11.3,11.4,16.13][NCL]. [unknown] any later uniform replacement of the entity-limit gross wording. |

### 5.3 Exactly what to do when a stock enters ban

| Stage | Rule / action | Evidence |
|---|---|---|
| Entry test | At EOD, market-wide FutEq OI **exceeds 95%** MWPL; ban begins next trading day. A 95% threshold is not a hard per-client limit. | [verified] [NCL §§11.4.1,16.13.1][NCL]. |
| Exit test | Normal trading resumes after combined exchange FutEq OI falls to **80% or below**. | [verified] [NCL §11.4.1][NCL]. |
| Published status | CC publishes next-day banned stocks and EOD FutEq utilisation. NSE ban file: fo_secban_DDMMYYYY.csv. | [verified] [NCL §16.13.1][NCL]; [NSE surveillance §23][SURV]. |
| Broker front end | Load ban indicators and mandatory retail cautionary prompt for non-NEAT front ends; exchange order submission only after affirmative confirmation. REG_INDDDMMYY.csv alone does not contain ban details; consume fo_secban too. | [verified] [NSE surveillance, cautionary-message section][SURV]. |
| Permitted trading | Trading during ban must reduce entity EOD FutEq OI without reversing sign; passive delta changes from underlying movement are excluded. A risk-reducing new option can qualify even when raw contract count rises. | [verified] [SEBI §5.3 and worked examples][FUTEQ]. |
| Base portfolio | Save positions when stock enters ban. For each later day, revalue base and actual EOD positions using **the same 14:00 CC delta**. | [verified] [NCL §16.13.2][NCL]. |
| Delta input | Contract_Delta_DDMMYYYY_i04.csv; generated from SPAN parameters at 14:00. | [verified] [NCL §16.13.2(3)][NCL]. |
| Test | Current absolute FutEq must be ≤ base absolute FutEq **and no sign change**. Retain/update base according to the CC algorithm only when eligible reductions or equal-FutEq composition changes occur; violation does not reset the base. | [verified] [NCL §16.13.2–16.13.5][NCL]. |
| Practical RMS control | Recompute before orders and after fills; monitor hedges whose removal increases net exposure; prevent sign flips. “Close-only” is a conservative house policy, not a complete transcription of the delta-reduction permission. | [verified] rule basis: [SEBI §5.3][FUTEQ], [NCL §16.13][NCL]. Order-control design is recommended. |
| Breach remediation | Stop exposure-increasing orders; obtain corrective execution; reconcile CC breach report; retain base/delta/execution evidence. A separate ordinary client-limit breach requires no fresh position and reduction into limit. | [verified] mandatory client-limit response: [NCL §11.3.2][NCL]; ban algorithm: [NCL §16.13][NCL]. |
| Ban penalty | **1% of violation value**, min **₹5,000**, max **₹1,00,000**, per entity/stock/day. Violation value = violated FutEq quantity × underlying price. Sign flip: use absolute EOD FutEq quantity; otherwise excess against base. Continued breach continues penalty. | [verified] [NCL §16.13.5][NCL]. |
| Intraday market surveillance | From 3 Nov 2025, at least four random stock MWPL utilisation snapshots; terminal alerts above **60%**. This early warning is not an automatic intraday ban. | [verified] [SEBI §§5.4,6][FUTEQ]; [NSE surveillance stock-FutEq section][SURV]. |

### 5.4 Penalties, reporting and institutional handling

| Control / breach | Requirement / consequence | Evidence |
|---|---|---|
| Stock TM/FPI/MF excess | 1% excess value, floor ₹5,000 and cap ₹1 lakh per entity/stock; member committee referral from 11th instance. | [verified] [NCL §16.6.1][NCL]. |
| Stock TM additional margin | Utilisation 100–<110%: 5%; 110–<125%: 10%; 125–<150%: 15%; ≥150%: 20%, applied to excess position value; blocked from CM proprietary collateral T+1 before market. | [verified] [NCL §16.6.2][NCL]. |
| Client/NRI/MF-scheme stock excess | Same 1% excess-value formula, min ₹5,000/max ₹1 lakh, each violation day; levied on CM, may be recovered from liable client. | [verified] [NCL §16.8][NCL]. |
| Index OI-linked EOD breach | Monthly slab: first nil; instances 2–5 ₹5,000 each; 6–10 ₹10,000 each; 11 onward ₹1,000 × instance ordinal, plus prior accumulated amounts and committee referral. This is distinct from stock ban penalty. | [verified] [NSE surveillance §31.4][SURV]. |
| Index option EOD FutEq breach | ASD derived from fresh/last-added positions in breach direction; short-position margin or long premium apportioned to excess; blocked one month; cash/FD eligible. Holdings/cash relief considered first. | [verified] [NSE surveillance §31.9–17][SURV]. |
| Expiry-day intraday option breach | NSE specifies **1.5 × computed ASD** for intraday breach; holding/cash allocation and cure rules apply. Not a flat 1.5% penalty. | [verified] [NSE surveillance §31.18–20][SURV]. |
| Intraday cure | Normally additional snapshot after 15 minutes; continuing breach is provisional pending holdings/cash checks. No cure for post-14:45 snapshots under later CAS circular. | [verified] [NSE §31.19][SURV]; [NSE/SURV/75524][CAS-SURV]. |
| CAS snapshot update | No index-position snapshot from CAS start until equilibrium index price; additional fifth-snapshot window from equilibrium determination to 15:40. Expiring-today contracts included. Close index price used for post-equilibrium deltas/valuation. | [verified] [NSE/SURV/75524, 31 Jul 2026][CAS-SURV]. |
| Non-expiry intraday breach | Surveillance examination/rationale can follow; expiry-day ASD rule should not be represented as applying to every non-expiry intraday snapshot. | [verified] [SEBI 2025/122 §§4.6–4.7][INTRADAY]; [NSE §31.20 notes][SURV]. |
| FPI / MF setup | Unique CP code via CM for FPI/MF/scheme; map give-up, confirmation, custodian and PAN identity. | [verified] [NCL §12.1][NCL]. |
| MF monitoring | MF aggregate and scheme-level limits both matter; SEBI treats MF aggregate like FPI/TM and schemes like clients. Index-futures gross aggregate, net sub-scheme treatment specified. | [verified] [SEBI May annexure §§1.3.2–1.3.3][FUTEQ]. |
| FPI reporting | Confirm positions through designated CMs; CM reports confirmed trades EOD; aggregate exchange exposure monitored. Cash/holding evidence needed for additional index exposure. | [verified] [SEBI annexure §1.3.3.1][FUTEQ]. |
| NRI simplification | Mandatory CP-code requirement removed; NRI limits align with clients. Existing clients could request CP-code exit; optional CP-code route remains. | [verified] [NCL §§12.3–12.4][NCL]; [SEBI 29 Jul 2025 circular][NRI]. |
| Concentration disclosure | Persons acting together owning ≥15% OI in an underlying index must disclose; FPI/MF must report breaches and stop fresh positions in that underlying. | [verified] [NSE surveillance §31.2.5–2.7][SURV]. |
| Broker daily duties | Monitor client/PAN, prop and aggregate TM books; obtain CC/exchange across-member signals; reconcile quantity/rupee/delta measures, holdings-backed limit reports and breach/ASD outputs. | [verified] basis: [NCL §§11–12][NCL]; [NSE §31][SURV]. Recommended reconciliation design. |
| Current hedge-report deadline | Older noon T+1 glide-path deadline ended 5 Dec 2025. Current limit checks require same-day position/holding compliance; exact current member-upload deadline/channel was not independently established. | [verified] glide-path end: [SEBI §5.5.4][FUTEQ]. [unknown] current upload cutoff; obtain latest CC SOP. |

### 5.5 Equity vs currency vs commodity — avoid transplanting limits

| Market | Limit structure / broker distinction | Evidence |
|---|---|---|
| Equity indices | Separate option FutEq ceilings, futures OI-linked limits and TM aggregate limits; no stock free-float ban calculation. | [verified] [SEBI 2025/79][FUTEQ]; [NSE Oct 2026][INDEX-LIMIT]. |
| Equity stocks | Share-based MWPL denominator, FutEq utilisation/ban, separate participant percentages and physical delivery. | [verified] [NCL §§5,11,16][NCL]. |
| Currency | Per-currency-pair gross positions; NSE defines long as long futures/calls + short puts, short as short futures/calls + long puts. Equity option FutEq rupee caps and stock 95% ban do not define this framework. | [verified] [NSE currency limits][FX]. |
| USD-INR | Client higher of 6% OI / USD20m; non-bank prop higher of 15% / USD50m; total bank/non-bank TM higher of 15% / USD100m. RBI-authorised bank enhanced limit separately specified. | [verified] [NSE currency limits][FX]; official page dated 22 Jul 2024, still served at cutoff. Latest circular-level revalidation remains a gap. |
| EUR-INR / GBP-INR | Client higher of 6% / EUR10m or GBP10m; non-bank prop 15% / 25m; total TM 15% / 50m in respective currency. | [verified] [NSE currency limits][FX]. |
| JPY-INR | Client higher of 6% / JPY400m; non-bank prop 15% / JPY1,000m; total TM 15% / JPY2,000m. | [verified] [NSE currency limits][FX]. |
| Currency FPI classes | FPI-I and FPI-II excluding individual/family-office/corporate subcategories have higher limits; latter subcategories have client-like limits. USD-INR example: 15%/USD100m vs 6%/USD20m. | [verified] [NSE currency limits][FX]. |
| Currency underlying-exposure permissions | Exchange position limits are a different question from RBI permission, eligible exposure and documentary thresholds. Do not label USD100m an unconditional permission to speculate. | [unknown] current RBI directional/exposure rules not fully verified in this equity-focused pass; obtain current RBI master direction before launching currency. |
| Commodity/MCX | Separate product/participant/delivery limits; SEBI issued a commodity-specific client-limit/penalty review on 9 Sep 2026. It is not an equity limit amendment. | [verified] title/scope/date: [SEBI commodity circular][COM-LIMIT]. [unknown] MCX implementation and product-by-product limits in this research. |

## 6. F&O margins and liquidity controls

| Component | Rule / operational meaning | Evidence |
|---|---|---|
| SPAN | Portfolio scenario risk; initial margins collected upfront; client portfolios net individually, gross across clients. Not a fixed universal percentage of premium. | [verified] [NCL §10.2][NCL]; [NCL margins page][MARGIN]. |
| “SPAN + exposure” terminology | Current NCL calls the extra tail-risk component **Extreme Loss Margin (ELM)**; avoid adding a second generic exposure charge if it is merely an alias for ELM in vendor UI. | [verified] current component names: [NCL §§10.2,10.4][NCL]. Alias reconciliation is recommended implementation guidance. |
| Index futures ELM | **2%** of notional futures value. | [verified] [NCL §10.4.1][NCL]. |
| Short index option ELM | Normally **2%** underlying notional; **3%** for strikes >10% OTM versus previous close; **5%** for residual expiry >9 months. | [verified] [NCL §10.4.2][NCL]. |
| Stock futures / short-option ELM | Normally **3.5%**; deep-OTM stock shorts (>30% OTM vs previous close) **5.25%**. | [verified] [NCL §§10.4.3–10.4.4][NCL]. |
| Extra index expiry ELM | **Additional 2 percentage points** for short index options expiring that day, whether brought forward or newly opened. NCL expressly says index options; do not blanket-add it to stock options. | [verified] [NCL §10.4.2][NCL]; [SEBI 2024/132 §5.6][INDEX132], effective 20 Nov 2024. |
| Separate short-option minimum | **No separate short-option minimum charge** for equity index or stock derivatives under NCL/CMPT/44391. This does not remove SPAN/ELM. | [verified] [NCL 2020 margin revision §5][SOM]. |
| Option buyer | Upfront net premium payable; potentially delivery margins near expiry for ITM stock options. “Buyer pays only premium” is insufficient for a stock contract retained into delivery. | [verified] [NCL §15.1.1][NCL]; [premium implementation][PREMIUM]; [NCL §10.2.7][NCL]. |
| Premium effective date | SEBI originally notified 1 Feb 2025; **NCL/CMPT/66046, 9 Jan 2025 changed implementation to 10 Feb 2025**. | [verified] [original SEBI framework][INDEX132]; [NCL implementation][PREMIUM]. |
| Calendar spreads / SPAN | Monthly portfolio delta determines spread; spread charge added to worst-scenario loss: **1.75% far-month contract for indices**, **2.2% for stocks**. Benefit is lower risk requirement, not zero margin. | [verified] [NCL §10.2.4][NCL]. |
| Calendar futures / ELM | ELM on one-third of far-month futures open-position value for qualifying spread. | [verified] [NCL §10.4.5][NCL]. |
| Index spread expiry removal | Same-day-expiring leg excluded. Original SEBI target 1 Feb 2025; NCL FAQ states implementation **10 Feb 2025**. Non-expiring spread legs can retain benefit. | [verified] [SEBI §5.2][INDEX132]; [NCL risk FAQ][RISK-FAQ]. |
| Stock spread expiry removal | Same-day-expiring leg excluded from **4 May 2026** at NCL; remaining next/far-month spread still eligible. | [verified] [NCL §10.2.4 footnote][NCL]; [SEBI 5 Feb 2026][STOCK-SPREAD]. |
| Crystallised obligations | Intraday closed-futures P&L and net option premium; EOD adds MTM/final settlement and exercise/assignment. Client net payable blocked as consolidated crystallised obligation margin until settlement. | [verified] [NCL §10.2.6][NCL]. |
| Delivery margin | Pre-expiry ladder; post-expiry cash VaR/ELM/MTM; release after settlement. | [verified] [NCL §10.2.7][NCL]. |
| Ad-hoc / additional margin | CC may increase margin; volatile-stock framework can make minimum total margin equal maximum observed intraday move after specified recurrence tests. Do not hard-code one ad-hoc rate. | [verified] [NCL §10.6][NCL]; [margins page][MARGIN]. |
| Long-dated concentration | CM short concentration ≥20%, subject to minimum ₹500 crore notional, attracts separate tiered concentration margin; ordinary ELM does not cover every charge. | [verified] [NCL §10.5][NCL]. Detailed live applicability requires CC parameters. |
| Peak-margin snapshots | At least four random intraday client-margin snapshots; collection test uses **fixed BOD SPAN and ELM parameters**, plus net option premium payable at snapshot. EOD requirement also uses BOD parameters. | [verified] [NCL §15.1.1][NCL]. |
| Do not confuse snapshots | Margin-collection snapshots above differ from exchange position-limit FutEq snapshots and from changing live CC risk parameters. Passing one does not establish compliance with the others. | [verified] distinct frameworks: [NCL §§10,15][NCL]; [SEBI index intraday][INTRADAY]. |
| Collection vs reporting | Initial excluding delivery + ELM upfront; delivery and consolidated obligations by **T+1**. Margin/short-allocation reporting cutoff **T+5 working days**; this is not five days' credit to collect upfront margin. | [verified] [NCL §§15.1,15.3][NCL]. |
| Margin reports | MG-12/13 include EOD and peak; reconcile reported collected amounts and short allocation, retaining bank/collateral evidence. | [verified] [NCL §15.1][NCL]; [official margin reports page][MARGIN]. |
| Shortfall penalty | 0.5% if shortfall <₹1 lakh AND <10% applicable margin; otherwise 1%. Continued >3 consecutive days or >5 days/month invokes 5% rules. Non-reporting treated as 100% short reporting. | [verified] [NCL §16.12][NCL]. |
| Cash vs collateral | CM effective deposits require at least 50% cash component under NCL framework; pledged securities do not equal immediately available settlement cash. | [verified] cash mix: [NCL margins page][MARGIN]; pay-in obligation: [NCL §3][NCL]. Recommended treasury distinction. |
| Recommended expiry stress | Reprice after spread expiry, remove closed hedges, add index short ELM, model stock delivery and tax; reserve funding for orders not yet filled and for overnight settlement. | [verified] rule basis: [NCL §§5,6,10][NCL]. Stress procedure is recommended house design. |

### 6.1 Cross-margin is not the same as physical-settlement netting

| Feature | NCL rule | Evidence |
|---|---|---|
| Eligible combinations | Index futures vs constituent-stock futures/cash basket, eligible ETFs vs futures/cash, stock futures vs underlying cash positions, and qualifying index-futures pairs. | [verified] [NCL §10.13.1][NCL]. |
| Basket | Index/ETF constituent basket must meet specified replica quantities. Each position used once; no double-counting the same hedge. | [verified] [NCL §10.13.1][NCL]. |
| Options / T+0 | Option positions excluded from ordinary cross-margin benefit; constituent stock positions in T+0 settlement excluded. | [verified] [NCL §10.13.1(vi–viii)][NCL]. |
| Setup | Same CM: client mapping/intimation; different CMs: prescribed agreements. This arrangement differs from physical cash/F&O settlement netting, which requires same eligible TM–CM/CC. | [verified] [NCL §10.13][NCL]; [SEBI netting][NET]. |
| Spread residual | Normally 25% of applicable upfront margin for same-expiry offsets, 35% for different-expiry offsets; eligible index-pair offsets 30%/40% respectively. | [verified] [NCL §10.13.4][NCL]. |
| Expiry and other benefits | Different-expiry cross-margin revoked at beginning of earlier expiry day. Already-EPI-benefited positions excluded; benefit exists only while relevant positions remain margined. | [verified] [NCL §10.13.4][NCL]. |
| Institutional distinction | Cross-margin available to all categories subject to confirmations/conditions; this does **not** repeal the institutional exclusion from cash/F&O **settlement netting**. | [verified] [NCL §10.13][NCL]; [SEBI §3.3][NET]. |

## 7. Other 2025–2026 changes and product maintenance

| Change | Rule / effective state | Broker impact | Evidence |
|---|---|---|---|
| Index contract value | Minimum ₹15 lakh at introduction; review range ₹15–20 lakh. Index lot multiple of 5, minimum 10 in NSE consolidated specification. | Parameterise lot and notional; do not publish a permanently fixed lot table. | [verified] [NSE §1.13][NSE-MASTER]; [SEBI 2024 framework][INDEX132]. |
| Stock contract value | Minimum ₹5 lakh at introduction; review range ₹5–10 lakh; applicable lot-rounding exceptions specified by NSE. | Equity stock lot sizing differs from index lot sizing. | [verified] [NSE §1.13][NSE-MASTER]. |
| Periodic review | NSE reviews lots every six months using previous month's average close; at least two weeks' advance notice. Larger/new incompatible lots generally apply to new-month contracts. | Mixed-lot maturities and disabled spread combinations need explicit support. | [verified] [NSE §1.13][NSE-MASTER]. |
| NSE 2025 lot revision affecting 2026 | NSE/FAOP/70616, 3 Oct 2025: NIFTY 75→65; BANKNIFTY 35→30; FINNIFTY 65→60; MIDCPNIFTY 140→120; NIFTYNXT50 remains 25. | Circular starts 28 Oct 2025 EOD, but weekly/monthly old lots remain through Dec expiry. First revised NIFTY weekly expiry 6 Jan 2026; monthly 27 Jan 2026; existing quarterly/half-yearly lots changed 30 Dec 2025 EOD. | [verified] [lot circular and annexure][LOTS]. These are verified transition values, not certification that no later Oct 2026 review occurred. |
| Stock eligibility | Top 500 by average daily market cap and traded value; MQSOS ≥₹75 lakh; MWPL-value threshold ≥₹1,500 crore; ADDV ≥₹35 crore; rolling six-month criteria. | Track eligibility/exit circulars independently of trading ban. Do not recalculate the eligibility MWPL-value test from the newer trading-limit formula without the applicable exchange methodology. | [verified] [SEBI 2024/116 §2][ELIG]; [NSE eligibility section][NSE-MASTER]. |
| Stock exit | Failure for continuous three months, using rolling six-month data; minimum six-month listing gestation; no new maturity, existing maturities may continue and add strikes; one-year re-entry bar. | Keep close/settle and existing-chain functions active during phase-out. | [verified] [SEBI §§3–4][ELIG]. |
| Stock Product Success Framework | At least lower of 15% active stock-derivative TMs or 200 TMs; trade on ≥75% trading days; average daily futures+premium turnover ≥₹75 crore; average daily notional OI ≥₹500 crore. | New exits can arise even if cash-market eligibility is met. | [verified] [SEBI §4][ELIG]. |
| Non-benchmark index eligibility | At least 14 constituents; largest weight ≤20%; top-three combined ≤45%; weights of remaining constituents descend; quarterly checking. Framework effective 3 Nov 2025. | Monitor constituent changes and existing-index transition circular separately. | [verified] [SEBI 2025/79 §§5.7,6][FUTEQ]. [unknown] all existing-index transition completion dates in this pass. |
| Futures pre-open | Current-month stock/index futures; next-month futures included in last five trading days before expiry; SEBI rollout date 6 Dec 2025. | Futures order/risk systems need auction states; options are not covered by this expansion. | [verified] [SEBI §§5.6,6][FUTEQ]. |
| Auction alignment | New pre-open framework effective 7 Sep 2026: 09:00–09:15, order-entry random close 09:08–09:10, market-order priority, no stop-loss/iceberg. | Update auction validation and client session indicators. | [verified] [CAS §§5–6][CAS]. |
| CAS surveillance | Futures band controls and modified index FutEq snapshots; CAS cash orders excluded from OTR under NSE/SURV/75524. | Extend surveillance and RMS through 15:40; maintain CAS-specific market-state logic. | [verified] [CAS][CAS]; [NSE CAS surveillance][CAS-SURV]. |
| LT-ASM for derivatives stocks | Stage I: F&O margin at least 50%, cash 100%; Stage II MWPL 75% and margin at least 100%; Stage III/IV MWPL 50%, margins at least 100%, subject to stage conditions and T+3 implementation. | A surveillance notice can change both margin and position headroom even without a client trade. | [verified] [NSE/SURV/74008 LT-ASM equity derivatives table pp18–20][SURV]. Do not describe this as a generic GSM rule. |
| NIFTYFPI / FOCIT | New product coverage described in §2; old five-index NSE and three-index BSE inventories are insufficient. | Use current contract master plus product circular, not a static marketing list. | [verified] NSE sixth index: [SPEC][SPEC]. [likely] BSE FOCIT: [Business Standard][FOCIT-BS] + [Yobee][FOCIT-YB]. |
| Oct 2026 index-limit file | Daily quantity-format limits added; client option limits still separately FutEq. | Ingest as a reference feed and reconcile against own limit engine. | [verified] [NSE/SURV/76750][INDEX-LIMIT]. |
| Commodity limit reform | Separate 9 Sep 2026 commodity circular exists. | Route to MCX/commodity research; no equity penalty copied into commodity RMS. | [verified] scope/date: [SEBI commodity circular][COM-LIMIT]. |
| Proposed ITM-to-futures model | Dec 2024 consultation proposes stock-option devolvement framework. | Keep as proposal; current verified physical exercise workflow remains the production basis. | [verified] consultation: [SEBI paper][DEVOLVE-CP]; [NCL current settlement][NCL]. |
| Proposed TM-limit / CAS changes | Dec 2025 TM paper and Sep 2026 CAS review remain proposals in this document. | Maintain a notified/effective/proposed change register, and require actual operative circular before changing behaviour. | [verified] [TM paper][TM-CP], [CAS paper][CAS-CP]. |

## 8. Source register and publication controls

| Source key | Primary document / retrieval scope | Evidence |
|---|---|---|
| NCL | NCL/CMPT/73997, 30 Apr 2026, consolidated F&O ZIP; Part B §§3–6,8,10–12,15–16 and associated parts read. Older final-price wording superseded by operative CAS framework. | [verified] [download][NCL]; [official consolidated index][MASTER-INDEX]. |
| NSE-MASTER | NSE/FAOP/73928, 28 Apr 2026, consolidated F&O ZIP; contract specifications, strikes, lot/master/eligibility sections read. | [verified] [download][NSE-MASTER]; [index][MASTER-INDEX]. |
| SURV | NSE/SURV/74008, 30 Apr 2026; stock surveillance, caution prompts, index limits and stock FutEq monitoring. Read with July/October updates. | [verified] [PDF][SURV]. |
| FUTEQ | SEBI/HO/MRD/TPD-1/P/CIR/2025/79, 29 May 2025, including implementation table and annexure. | [verified] [PDF][FUTEQ]. |
| INTRADAY | SEBI/HO/MRD/TPD/CIR/P/2025/122, 1 Sep 2025, PDF reference. SEBI landing page formats identifier differently; PDF form used here. | [verified] [PDF][INTRADAY]. |
| CAS | SEBI HO/47/11/11(3)2025-MRD-POD2/I/2765/2026, 16 Jan 2026; operative from 3 Aug, pre-open from 7 Sep. | [verified] [PDF][CAS]. |
| CAS-CP | SEBI 12 Sep 2026 review; retrieved full paper describes current settlement, proposals and comment deadline. | [verified] [PDF][CAS-CP]. |
| BSE source limitation | Original expiry notice URLs returned access errors. Exact notice text was obtained through NoticeBlue and cross-checked with independent broker reporting; consequently not tagged primary-verified. | [uncertain] access/evidence limitation; [BSE approval][BSE-APPROVAL], [BSE implementation][BSE-EXP]. |
| Recommended policy cells | Owners, job ordering, alerts, stress tests and internal forced-exit controls are proposed manual design, supported by cited settlement/risk dependencies. | [unknown] the greenfield broker's approved actual policy, vendors, internal times, portals and fees. |
| Additional primary sources (second pass) | NSE/FATAX/73524 (31 Mar 2026 STT rates), NSE/FATAX/63809 (9 Sep 2024 STT rates), NSE/FATAX/41919 (20 Aug 2019 intrinsic-value basis); NCL/CMPT/55328 (DNE withdrawal, clause g), NCL/CMPT/49775, 51971, 46881 (DNE history), NCL/CMPT/43262 (delivery ladder origin), NCL/CMPT/67750 (2025 consolidated, for the DNE absence check), NCL/CD/73998 (currency limits); NSE/FAOP/76436, 76657, 76899, 71819 (strikes, lots, new underlyings); NSE/CMTR/73362 and NSE/FAOP/74467 (CAS implementation and FAQs); SEBI 2024/140 (TM limits, passive breaches). | [verified] each read in full or at the cited section. |
| Publication checks | Re-fetch operative circulars and daily parameter/master files; carry evidence tags into downstream manual; avoid presenting an unresolved item as an implementation constant. | Recommended editorial control; no externally prescribed checklist claimed. |

[MASTER-INDEX]: https://www.nseindia.com/static/resources/consolidated-master-circulars
[NCL]: https://archives.nseindia.com/content/circulars/CMPT73997.zip
[NSE-MASTER]: https://archives.nseindia.com/content/circulars/FAOP73928.zip
[SURV]: https://archives.nseindia.com/content/circulars/SURV74008.pdf
[NSE-EXP]: https://archives.nseindia.com/content/circulars/FAOP68747.pdf
[SEBI-EXP]: https://www.sebi.gov.in/legal/circulars/may-2025/final-settlement-day-expiry-day-for-equity-derivatives-contracts_94189.html
[BSE-APPROVAL]: https://www.bseindia.com/markets/MarketInfo/DispNewNoticesCirculars.aspx?page=20250617-11
[BSE-EXP]: https://www.bseindia.com/markets/MarketInfo/DispNewNoticesCirculars.aspx?page=20250623-59
[BSE-APPROVAL-MIRROR]: https://noticeblue.com/circulars/647186de-7c15-4d51-9c50-2cdcc08f5c8f
[BSE-EXP-MIRROR]: https://noticeblue.com/circulars/1b901a53-6165-40dc-92ca-ddd5ca6d1a12
[HDFC-EXP]: https://hdfcsky.com/blogs/share-market/revision-of-nse-and-bse-expiry-day-of-derivatives-contracts
[ICICI-EXP]: https://www.icicidirect.com/research/equity/finace/sebi-clears-expiry-day-clash-between-nse-and-bse
[SPEC]: https://www.nseindia.com/static/products-services/equity-derivatives-contract-specifications
[STOCK-SPEC]: https://www.nseindia.com/static/products-services/equity-derivatives-individual-securities
[FPI150]: https://www.nseindia.com/static/products-services/equity-derivatives-nifty-india-fpi
[CAS]: https://www.sebi.gov.in/sebi_data/attachdocs/jan-2026/1768576287344.pdf
[CAS-CP]: https://www.sebi.gov.in/sebi_data/attachdocs/sep-2026/1789202841824.pdf
[DNE]: https://archives.nseindia.com/content/circulars/CMPT55328.pdf
[LADDER]: https://archives.nseindia.com/content/circulars/CMPT43262.pdf
[STT]: https://www.nseindia.com/static/products-services/equity-derivatives-securities-transaction-tax
[NET]: https://www.sebi.gov.in/sebi_data/attachdocs/nov-2022/1669806407982.pdf
[SHORT]: https://www.nseindia.com/static/products-services/equity-market-shortages-handling
[FUTEQ]: https://www.sebi.gov.in/sebi_data/attachdocs/may-2025/1748521484014.pdf
[INTRADAY]: https://www.sebi.gov.in/sebi_data/attachdocs/sep-2025/1756745625835.pdf
[INDEX-LIMIT]: https://archives.nseindia.com/content/circulars/SURV76750.pdf
[CAS-SURV]: https://archives.nseindia.com/content/circulars/SURV75524.pdf
[STOCK-SPREAD]: https://www.sebi.gov.in/sebi_data/attachdocs/feb-2026/1770288869049.pdf
[TM-CP]: https://www.sebi.gov.in/reports-and-statistics/reports/dec-2025/consultation-paper-on-review-of-existing-position-limits-for-trading-members-in-equity-derivatives-segment_98180.html
[NRI]: https://www.sebi.gov.in/legal/circulars/jul-2025/operational-efficiency-in-monitoring-of-non-resident-indians-nris-position-limits-in-exchange-traded-derivatives-contracts-ease-of-doing-investment_95679.html
[FX]: https://www.nseindia.com/static/products-services/currency-derivatives-position-limits
[MARGIN]: https://www.nseclearing.in/risk-management/equity-derivatives/margins
[SOM]: https://archives.nseindia.com/content/circulars/CMPT44391.pdf
[INDEX132]: https://www.sebi.gov.in/sebi_data/attachdocs/oct-2024/1727786261636.pdf
[PREMIUM]: https://nsearchives.nseindia.com/content/circulars/CMPT66046.pdf
[RISK-FAQ]: https://www.nseclearing.in/sites/default/files/2025-08/NCL%20-%20FAQ%20RISK%20MANAGEMENT.pdf
[LOTS]: https://archives.nseindia.com/content/circulars/FAOP70616.pdf
[ELIG]: https://www.sebi.gov.in/sebi_data/attachdocs/aug-2024/1725027626764.pdf
[BROKER-PHYS]: https://support.zerodha.com/category/trading-and-markets/trading-faqs/f-otrading/articles/policy-on-physical-settlement
[FOCIT]: https://www.bseindia.com/downloads/UploadDocs/Notices/20260415-34/20260415-34.pdf
[FOCIT-BS]: https://www.business-standard.com/markets/news/bse-launches-f-and-o-contracts-on-focused-it-index-to-aid-investors-126051101145_1.html
[FOCIT-YB]: https://www.yobee.co.in/newsroom/bse-launches-focit-futures-and-options-india-s-first-it-sector-index-derivative
[COM-LIMIT]: https://www.sebi.gov.in/legal/circulars/sep-2026/review-of-position-limits-for-clients-and-penalty-provisions-for-violation-breach-of-position-limits-for-commodity-derivatives-segment_104387.html
[DEVOLVE-CP]: https://www.sebi.gov.in/sebi_data/attachdocs/dec-2024/1733395948054.pdf
[STT-2026]: https://nsearchives.nseindia.com/content/circulars/FATAX73524.pdf
[STT-2024]: https://nsearchives.nseindia.com/content/circulars/FATAX63809.pdf
[STT-INTRINSIC]: https://nsearchives.nseindia.com/content/circulars/FATAX41919.pdf
[DNE-2021]: https://nsearchives.nseindia.com/content/circulars/CMPT49775.pdf
[DNE-2022]: https://nsearchives.nseindia.com/content/circulars/CMPT51971.pdf
[DNE-2021-BASE]: https://nsearchives.nseindia.com/content/circulars/CMPT46881.pdf
[NCL-2025]: https://nsearchives.nseindia.com/content/circulars/CMPT67750.zip
[CD-NCL]: https://nsearchives.nseindia.com/content/circulars/CD73998.zip
[STRIKE-STK]: https://nsearchives.nseindia.com/content/circulars/FAOP76436.zip
[LOTS-STK-2026]: https://nsearchives.nseindia.com/content/circulars/FAOP76657.zip
[NEWSTK-2026]: https://nsearchives.nseindia.com/content/circulars/FAOP76899.pdf
[CAS-NSE-SOP]: https://nsearchives.nseindia.com/content/circulars/CMTR73362.pdf
[CAS-FAOP]: https://nsearchives.nseindia.com/content/circulars/FAOP74467.zip
[LONGSTRIKE]: https://nsearchives.nseindia.com/content/circulars/FAOP71819.pdf
[MONPL-2024]: https://www.sebi.gov.in/sebi_data/attachdocs/oct-2024/1728990538428.pdf

## 9. Corrections and resolutions from the second research pass

Two items that earlier working notes left open are now settled against primary text. Record them here so the superseded readings are not reinstated.

| Item | Superseded reading | **Resolved finding** | Evidence |
|---|---|---|---|
| **Do Not Exercise (DNE)** | "Discontinued in Oct 2021, re-introduced Apr 2022, then absent from the consolidated circular from Jun 2023 — no withdrawal circular found, status `[uncertain]`." | **DNE was formally discontinued with effect from the March 2023 expiry.** The withdrawal is clause **(g)** of a circular whose *subject line is about net settlement*, which is why a subject-line search for "do not exercise" misses it. Verbatim: *"**g) Do not Exercise facility:** The facility of do not exercise available for stock options on expiry date shall be discontinued."* followed by *"The above changes shall be effective from **March 2023 expiry** of F&O contracts."* | `[verified]` NCL/CMPT/55328 (Ref. 031/2023), 20 Jan 2023, clause (g) — https://nsearchives.nseindia.com/content/circulars/CMPT55328.pdf |
| **Delivery margin ladder origin** | Ladder quoted only from the current consolidated circular, with no origin. | The **10 / 25 / 45 / 70** ladder **replaced an earlier 20 / 40 / 60 / 80 ladder**, applicable from contracts expiring **30 January 2020**, with the revised levy applying from **24 January 2020**. The same circular is the source of the T+1 collection rule: *"members shall be required to collect the delivery margins by T+1 day and shall be included in the client margin reporting for clearing and trading members."* | `[verified]` NCL/CMPT/43262 (Ref. 009/2020), 17 Jan 2020 — https://nsearchives.nseindia.com/content/circulars/CMPT43262.pdf |

**Full DNE timeline, now complete** — useful because clients and older broker material still refer to it:

| Date | Event | Source |
|---|---|---|
| 22 Aug 2017 | DNE introduced for equity options | NSCCL/CMPT/35635 (cited in later circulars) `[verified]` |
| 1 Jan 2021 | Codified as Part B **§5.3.4** of NCL's consolidated circular, with the CTM definition | NCL/CMPT/46881 `[verified]` |
| **14 Oct 2021** | DNE **discontinued** — *"the 'Do not Exercise' facility shall not be available from October 14, 2021"* | NCL/CMPT/49775 (085/2021), 29 Sep 2021 `[verified]` |
| **28 Apr 2022** | **Re-introduced, stock options only** — *"It is reiterated that the introduction of DNE is only for Stock Option contracts"* | NCL/CMPT/51971 (038/2022), 11 Apr 2022 `[verified]` |
| 12 Apr 2022 | Procedure: requests on **NSCCL-MASS (NMASS)**, menu "Exercise Request" | NCL/CMPT/51996 (039/2022) `[verified]` |
| **March 2023 expiry** | **Discontinued, and not reinstated since** | **NCL/CMPT/55328 (031/2023), 20 Jan 2023, clause (g)** `[verified]` |
| Jun 2023 onward | §5.3.4 absent from every NCL F&O consolidated circular — confirmed across NCL/CMPT/57320 (Jun 2023), 61801 (Apr 2024), 67750 (Apr 2025), 73997 (Apr 2026) | `[verified]` |

**The CTM scope, for explaining what DNE could and could not do** `[verified]` NCL/CMPT/46881 §5.3.4: DNE applied only to **Close To Money** strikes — for calls, the **3 ITM strikes immediately below** the final settlement price; for puts, the **3 ITM strikes immediately above** it. *"All in-the-money option contracts, not in the 'CTM' option series, shall be exercised automatically."* So DNE never protected a deep-ITM holder. The common client belief that it could have is wrong.

**Residual traces a broker will still see** `[verified]`: the **EX01/EX02** exercise report format in the April 2026 consolidated circular still carries a field named **"Exercise / Do Not Exercise Flag"**, and the file register still lists `NCL_F_CTM_<MEMBER CODE>_DDMMYYYY.CSV` (CTM position download), `.Tnn` (DNE request upload) and `.Snn`/`.Rnn` (response). These are **legacy layouts**, not a live facility. Note that NCL/CMPT/55328 Annexure E lists reports **discontinued** at the same time.

---

## 10. Operational detail annexe

Material verified in this pass that the rule-status tables above summarise rather than reproduce. Everything here is `[verified]` against NCL/CMPT/73997 (Consolidated Circular — F&O Segment of NCL, 30 Apr 2026) and its Parts C and D, or the circular named in the row.

### 10.1 Ban-period monitoring — the algorithm the CC actually runs

`[verified]` NCL/CMPT/73997 §16.13.2. This is the single most important operational hook in the position-limit area.

1. On the day the stock enters ban (**Day 1**), each entity's EoD open position is stored as the **base position**.
2. On **Day 2**, the Day-1 positions are revalued using the **intraday Future Equivalent published by the CC from SPAN parameters as at 2 PM on Day 2** — file **`Contract_Delta_DDMMYYYY_i04.csv`** (Part D item 42). This isolates the **passive** delta change.
3. The **Day-2 EoD positions** are multiplied by the **same 2 PM delta**.
4. *"If FutEq open interest of the entity for current end of day position in the stock is **less than or equal to** the FutEq open interest of the entity for base position **without any change in sign**, then the same shall not be treated as a violation. All other cases shall be identified as a violation and will be levied penalty."*
5. The base position updates at EoD **only if** (a) the entity traded in a way that decreased its FutEq OI, **or** (b) FutEq OI is unchanged but trades changed actual open positions. Otherwise it carries over. Adjusted for corporate actions.
6. Iterates daily while the stock is in ban.

**Why 2 PM** `[verified]` §16.13.4, verbatim: *"the method of taking snapshot delta at 2 PM would provide an avenue to members to check positions of their clients between 2 PM to 3.30 PM and in case of increase in FutEq positions (or change of sign in the position), take measures, if required, so as to avoid penalty."*

A broker that does not consume this file intraday cannot perform the check the CC expects of it.

**Penalty** `[verified]` §16.13.5: violated quantity = absolute difference between base-position FutEq OI and EoD FutEq OI; **if the sign changed, the violated quantity is the absolute EoD FutEq OI** (not the increment). Penalty **1% of violation value** (violated quantity × underlying price), **minimum ₹5,000, maximum ₹1,00,000 per entity per stock per day**. *"violation does not result in a change in base position. Accordingly, till the time violated quantity … is greater than zero and the stock remains in ban the penalty would continue to be levied."*

**Thresholds** `[verified]` §§11.4.1, 16.13.1: ban on market-wide **FutEq** OI exceeding **95%** of MWPL (tested EoD, effective next day); normal trading resumes only when combined cross-exchange FutEq OI falls to **80% or below**.

**What clients may still do in a banned stock** `[verified]` SEBI/HO/MRD/TPD-1/P/CIR/2025/79 §5.3.2–5.3.3. The test is net delta reduction, not absence of new contracts. SEBI's own illustration:

| Day | EoD position | SEBI's comment |
|---|---|---|
| 1 | Long futures 1 lot | Stock entered ban EoD day 1. Delta positive; any decrease to 0 permissible later. |
| 2 | Long futures 1 lot, underlying +5% | **Passive** increase, no new position. **Permissible.** |
| 3 | Long futures 1 lot + long put 1 lot | Overall delta reduction (long put negative delta). **Permissible.** |
| 4 | + short OTM call 1 lot | Further delta reduction. While EoD delta > 0, **permissible.** |
| 5 | Long futures 2 lots + long put + short call | Additional positive delta vs previous day. **Not permissible.** |

A front end that blanket-blocks all orders in banned scrips is now **more restrictive than the rule**, and blocks legitimate delta-reducing hedges.

### 10.2 The mandatory ban-period front-end control

`[verified]` NSE/SURV/74008 (Surveillance and Investigation Consolidated Circular, 30 Apr 2026), implementing NSE/FAOP/37975 of 8 Jun 2018.

Trading members must build, on every non-NEAT front end **including IBT, STWT and CTCL**, a pop-up on order entry in an affected security, with this verbatim text:

> **"Security is under - <for relevant indicator refer Reg Indicator file/fo_secban>, would you like to continue?" Yes / No.**

- If multiple actions apply, **all** must appear. NSE's example: *"Security is under - GSM-0, ESM-1, Failed to pay Annual listing fee & BAN period in F&O, would you like to continue?"*
- *"The order shall be sent to the Exchange only if option 'Yes' is selected."*
- *"the aforesaid verbatim of the pop-up message should **mandatorily** be included"*, and the feature is *"**mandatory for trading members with retail clients**."*
- **Integration trap** `[verified]`: ban-period status is **not** in the regulatory indicator file. NSE states that details of securities in ban period are not available in `REG_IND` and members must use **`fo_secban`**. Two files, two sources, one pop-up.

### 10.3 Intraday MWPL delta formula

`[verified]` NSE/SURV/74008 item 32 (from NSE/SURV/71090, 31 Oct 2025). Four random snapshots a day; both futures and options counted; utilisation on FutEq OI at security level; **terminal broadcast once FutEq OI exceeds 60% of MWPL**.

- FutEq of a **call** = `N(d1)`; of a **put** = `N(d1) − 1`; of a **future** = `1`
- `d1 = {ln(S/K) + (Rf + 0.5 × Vol_Annual²) × T} / (Vol_Annual × √T)`
- `S` = underlying price **at the time of the snapshot** (real time); `K` = strike; `Rf` = risk-free rate, **fixed at the latest RBI repo rate**; `Vol_Annual` = annualised applicable underlying volatility from **previous day EoD (T−1)**; `T` = prorated time to expiry per NSE/SURV/70553 of 30 Sep 2025; `N(·)` = cumulative normal distribution.

This is the formula a broker must implement to shadow the exchange's own calculation.

### 10.4 Position-limit penalties and additional margin

`[verified]` NCL/CMPT/73997 §§16.6, 16.8.

**Monetary penalty — identical formula for TM/FPI/MF (§16.6.1) and client/NRI/FPI-II-individual/MF-scheme (§16.8):** **1% of the value of the quantity in violation** (excess quantity valued at the cash-segment closing price) per entity per stock, **or ₹1,00,000 per entity per stock, whichever is lower**, subject to a **minimum of ₹5,000** per entity per stock. For clients it is charged **for every day of violation**, to the clearing member, who *"may in turn recover such amount of penalty from the concerned clients."* TMs are referred to the **Member Committee from the 11th instance** onward; instances count **across all stock underlyings in a calendar quarter**.

**Additional margin on TM breach (§16.6.2):**

| Breach as % of applicable position limit | Additional margin |
|---|---|
| 100% to <110% | **5%** |
| 110% to <125% | **10%** |
| 125% to <150% | **15%** |
| 150% and above | **20%** |

Levied on **(underlying price × position quantity in breach)**, from the **first instance** in a calendar quarter, computed EoD, blocked from the **clearing member's proprietary collateral on T+1 before market hours**, and *"fully released on T+1 day (before start of market hours)"* once positions are within limits.

**Index derivatives breach** `[verified]` SEBI 2025/79 Annexure-1 §§1.3.2.2.5, 2.3.2.2.4: an additional deposit *"equivalent to the amount of margin chargeable on excess position beyond the limits"*, **retained by the exchange for 1 month**.

**No intraday penalty for the general index limits** `[verified]` SEBI 2025/79 Annexure-1 §1.3.4.3: *"there shall be **no penalty for breach of existing position limits intraday** and such intraday breaches shall not be considered as violations."* The exception is the **expiry-day** index-option intraday breach, which from **6 Dec 2025** attracts penalty / additional surveillance deposit per a joint exchange SOP `[verified]` SEBI 2025/122 §§4.7, 6 — **quantum `[unknown]`**, the SOP was not locatable.

**Broker's duty on a client breach** `[verified]` §11.3.2: ensure *"a. the client does not take fresh positions and b. the position of such clients are reduced so as to be within permissible limits."* Client limits are monitored at **UCC level** and *"shall be applicable on the combined positions for the same clients trading through different members, as well"* — a broker can be penalised for a breach invisible in its own book.

### 10.5 Margin numbers the summary tables compress

**ELM rates** `[verified]` NCL §10.4:

| Contract | ELM |
|---|---|
| Index futures | **2%** of notional on gross open futures, at last traded futures price |
| Short index options | **2%**, at last closing price of the underlying index |
| Short index options, deep OTM (strike **>10%** OTM vs previous close) | **3%** |
| Short index options, long-dated (expiry >9 months) | **5%** |
| Short index options, **on that contract's expiry day** | **+2%** → 4% normal, 5% deep OTM |
| Stock futures | **3.5%** of notional on gross open futures |
| Short stock options | **3.5%** |
| Short stock options, deep OTM (strike **>30%** OTM vs previous close) | **5.25%** |
| Futures calendar spread | ELM on **one-third of the far-month leg value** |

ELM nets at individual client level, grosses across clients; proprietary nets at TM/CM level with **no client/prop set-off**. Note the two different deep-OTM thresholds: **10%** index, **30%** stock.

**Risk parameters** `[verified]` NCL §10, and NCL/CMPT/44391 (072/2020):

| Parameter | Value |
|---|---|
| Model | **SPAN®**, **16** risk scenarios; scenarios 15–16 at double the max price scan range, **35%** loss weighting |
| MPOR | **2 days**, applied by scaling the Price Scan Range |
| PSR floor — index | **9.3%** of underlying value |
| PSR floor — long-dated index options (>9 months) | **17.70%** |
| PSR floor — single stock | **14.2%**; scaled by **√3** if mean impact cost for a ₹5 lakh order >1% (recomputed on the 15th monthly; applies from the 3rd working day after) |
| VSR floor — index | **4%** (25% of annualised EWMA volatility) |
| VSR floor — single stock | **10%** |
| EWMA λ | **0.995** |
| Risk parameter file refresh | **6× daily** — 11:00, 12:30, 14:00, 15:30, EOD, BOD |

**Short Option Minimum Margin does not exist in Indian equity derivatives** `[verified]` NCL/CMPT/44391 Annexure 1 item 5, verbatim: **"There shall be no separate short option minimum charge for index derivatives and single stock derivatives."** Effective 1 Jun 2020. Deep-OTM short-option tail risk is covered instead by the PSR floors, SPAN scenarios 15–16, the elevated deep-OTM ELM, and the cash collection on far-OTM shorts below. **SOMM does exist in commodity derivatives — do not carry it across.**

**"Exposure margin" is pre-2020 terminology** `[verified]`: replaced by **SPAN + ELM** from **1 Jun 2020** (NCL/CMPT/44391, implementing SEBI/HO/MRD2/DCAP/CIR/P/2020/27 of 24 Feb 2020). The only surviving "exposure margin" in F&O is the **Additional Exposure Margin on securities under MWPL concentration** — **15%** where the **top 10 clients exceed 20% of MWPL**, with the **higher** of that or ASM applying `[verified]` NCL/CMPT/76356 (0106/2026), 16 Sep 2026, effective 30 Sep 2026.

**Calendar spread charge** `[verified]` NCL §10.2.4 — computed on the **delta of the portfolio** per month and levied **in addition to** the worst-scenario loss: **1.75% of the far-month contract** for indices, **2.2%** for single stocks. Benefit runs *"till the expiry−1 day of the near month contract."*

**SPAN file mechanics on expiry day** `[verified]` NCL 146/2024 and 023/2026: a **`scanTiers`** tag gives **two tiers** on expiry day (Tier 1 = nearest expiry as both start and end period; Tier 2 = next through farthest) versus **one tier** otherwise; and the **`dspread`** tag **contains no combination involving the nearest expiry**. A broker replicating SPAN locally must handle the tier switch on expiry mornings or it will overstate available margin all day.

**Other additional margins** `[verified]` NCL §§10.5–10.7:

| Levy | Trigger and rate |
|---|---|
| Concentration margin (§10.5) | CM ≥20% concentration on the short side in an expiry month of **long-dated index options**, min notional **₹500 crore**: 20–<35% → **1.5%**, 35–<50% → **2.25%**, ≥50% → **3%** of short long-dated notional; EoD, blocked from the **cash component** on T+1 |
| Highly volatile stocks (§10.6) | Intraday move (max of H−L, H−PC, L−PC) **>10% on ≥3 days in 1 month** → minimum total margin = max intraday move over the last month, until the monthly expiry after **3 months**. **>10% on ≥10 days in 6 months** → max move over 6 months, until the monthly expiry after **1 year** |
| Client-portfolio stress (§10.7.1) | **20% market fall and 17.74% market rise** stress on every client portfolio, EoD; where a client's net loss after margins and depository-confirmed hedges is **≥₹25 crore**, the **full excess over ₹25 crore** is levied, blocked from CM collateral T+1 |
| Option value in cash (§10.7.2) | Fresh **net short** far-OTM positions: strike **≥40%** away → all stock and index contracts; **≥30%** → index 9 months–2 years; **≥20%** → index up to 9 months. Net short value collected **in cash** on T+1, held till expiry or square-up. Report `F_OPTCSH` |
| Margin on consolidated crystallised obligation (§10.2.6) | Replaced net buy premium + intraday crystallised losses + assignment margin from 1 Jun 2020. **Intraday:** premium payable/receivable + futures crystallised P&L at weighted-average trade prices; if net payable, that is the margin. **EoD:** futures MTM to settle + option premium + **exercise/assignment** + futures final settlement. Released on completion of settlement |

### 10.6 Upfront collection, snapshots and margin penalties

**Upfront collection applies to F&O** `[verified]` NCL §15.1: *"Members are required to collect initial margins (**excluding delivery margins**) and extreme loss margins from their client/constituents on an **upfront** basis."* Delivery margins and the consolidated crystallised obligation are collectible by **T+1** — the funding gap the broker carries in expiry week.

**Option premium is part of the upfront requirement** from **1 Feb 2025** `[verified]` SEBI 2024/132 §5.1 — *"shall also include net options premium payable at the client level"*, and included in CC intraday snapshots for penalty purposes.

**Snapshots** `[verified]`: **minimum 4** per day, randomly taken in pre-defined windows; NCL's short-allocation file naming `F_SA01/02_P__DDMMYYYY_i01/i02/i03/i04` confirms four in practice. Snapshot and EoD requirements are computed on **fixed Beginning-of-Day parameters** (SPAN + ELM) **plus net option premium payable at the snapshot**, *only* for verifying upfront collection — while the CC's own margin calls run on the intraday-refreshed risk file (6× daily). **That dual basis is a standing source of confusion on broker risk desks and is worth stating explicitly.**

**Shortage computation — the higher of three** `[verified]` NCL §15.4: (a) EoD obligation vs EoD margin available; (b) **peak obligation across snapshots vs peak margin available during the day**; (c) highest intraday or EoD short **allocation**, after excess collateral across segments and valid reason codes.

**Client-level short/non-collection penalty** `[verified]` NCL §16.12:

| Short collection per client | Penalty |
|---|---|
| (< ₹1 lakh) **AND** (<10% of applicable margin) | **0.5%** of shortfall |
| (≥ ₹1 lakh) **OR** (≥10% of applicable margin) | **1.0%** of shortfall |

Persisting **>3 consecutive days** → **5%** per further day; **>5 days in a month** → **5%** per day beyond the 5th. **Non-reporting is treated as 100% short reporting.** Debited from the CM's settlement account monthly by the **10th working day** of the following month. **Nifty50 relief:** where the short collection follows a **≥3% close-to-close move in Nifty50** on day T, the penalty applies only if the shortfall persists to **T+2** — the one systematic exemption, and it exists precisely for post-index-move margin spikes.

**Member-level margin violation / disablement** `[verified]` NCL §16.7 (and NCL 143/2024, effective 1 Jan 2025):

| Disablements in a calendar month | Penalty |
|---|---|
| 1st | **0.07% per day** |
| 2nd–5th | 0.07%/day + **₹5,000** per instance |
| 6th–10th | 0.07%/day + ₹20,000 + **₹10,000** per instance |
| 11th onward | 0.07%/day + ₹70,000 + **₹50,000** per instance, plus Member Committee referral |

Related controls `[verified]`: **risk reduction mode at 90%** collateral utilisation (exit below **85%**); **voluntary close-out** with member-defined upper/lower limits in N-MASS, modifiable intraday unless already in risk reduction mode; **CM-set intraday uncrystallised MTM limits** on TMs (futures only, net loss at TM level, disablement at 100% of limit), enhanced by **NCL/CMPT/73495, 27 Mar 2026**. A CM electing **T+0 daily MTM** that fails to pay faces **0.07% of the EoD T+0 margin amount** and loses scaled-down margins to the end of the quarter; *"partial payment … would also be considered as non payment"*; the option is elected once a quarter and is irrevocable for it.

### 10.7 Cross margin between cash and F&O

`[verified]` NCL §10.13. Available to **all categories of market participants**.

**Eligible combinations, in the CC's priority order:** (a) index futures + constituent stock futures, same expiry; (b) same, different expiry; (c) index futures + constituent cash positions; (d) ETF + constituent stock futures; (e) ETF + constituent cash positions; (f) index futures + ETF in cash; (g) stock futures + stock cash positions; (h) index futures on **eligible correlated equity indices**, same expiry; (i) same, different expiries.

**Conditions:** the basket must be a **complete replica** of the index (NCL publishes unit counts); **options are NOT eligible**; ETF and constituent stocks must be in the **same settlement number**; **T+0 settlement positions ineligible**; a position counts **only once**; positions already given **early pay-in** benefit are excluded. Correlated index pairs need correlation **>0.90 over six months**, **≥80%** of one index's constituents present in the other, and the smaller index's constituents carrying **≥80% free-float weight** in the larger — checked on the **15th** monthly.

**The benefit — spread margins instead of full margin:**

| Combination | Spread margin |
|---|---|
| Same expiry | **25%** of applicable upfront margins |
| Different expiry | **35%** |
| Correlated index futures pair, same expiry | **30%** |
| Correlated index futures pair, different expiries | **40%** |

Benefit = margin on the full portfolio − margin excluding the offset positions − the spread margin.

**Revocation:** where expiries differ, the benefit is **fully revoked at the beginning of the expiry day of whichever leg expires first** — the design SEBI expressly aligned the calendar-spread removal with (2024/132 §5.2.1).

**Process:** the CM uploads client-wise cross-margin details via **NSCCL-MASS**, same **UCC** in both segments. Where the client settles through different CMs or a custodian, **tri-partite or amendment agreements** are required (Part C formats 36–40); with client details alone the benefit is **limited to index futures + constituent stock futures**. Computation is **real-time at client level** and the TM/CM must pass it to the client. **Institutional cash positions count only after custodian confirmation on T+1.** A client may hold **two accounts** (arbitrage / non-arbitrage) solely to complete a replica, aggregated for compliance, retaining **one UCC**. On default the CC may hold cross-margin positions to expiry in its own name or liquidate in either segment. NCL republishes the **cross-margin eligible ETF list** roughly monthly (latest in this pass: NCL/CMPT/76594–76595, 28 Sep 2026) — a standing refresh for the risk system.

**Separately** `[verified]`: physical settlement itself carries a margin offset — positions converted to delivery on expiry and the underlying cash obligation *"shall be allowed margin benefit to the extent of offsetting positions"*, only where the CM-TM-client (UCC) is common across segments, applied **on total margins in the Capital Market segment and on delivery margins in F&O**, with residual positions margined normally. NCL/CMPT/55328 clause (d), with a worked example at its Annexure C.

### 10.8 The official net-settlement worked example

`[verified]` NCL/CMPT/73997 **Part C (3)**, and identically at Annexure A of NCL/CMPT/55328. Symbol XYZ; call strike 250, settlement price 260. **TM2 clears through a different clearing member in cash (M00001) and F&O (M00002).**

**Client level:**

| CM | TM | Client | Cash qty | Cash amount | F&O qty | F&O amount | **Net qty** | **Net amount** |
|---|---|---|---|---|---|---|---|---|
| M00001 | TM1 | AAA | −80 | 20,400 | +100 | −25,000 | **+20** | **−4,600** |
| M00001 | TM1 | BBB | +80 | −20,400 | −100 | +25,000 | **−20** | **+4,600** |
| M00001 | TM1 | CCC | −100 | 25,500 | +100 | −25,000 | **0** | **+500** |
| M00001 | TM2 | DDD | −80 | 20,400 | 0 | 0 | **−80** | **+20,400** |
| M00002 | TM2 | DDD | 0 | 0 | +100 | −25,000 | **+100** | **−25,000** |

**CM level:** M00001 nets −180/+45,900 against +100/−25,000 to **−80 / +20,900**; M00002 stands alone at **+100 / −25,000**.

Client DDD is the point of the example: because its cash and F&O clearing run through **different** CMs, the two obligations do **not** net, leaving a −80 delivery in one CM and a +100 receipt in another. Quantity convention: **+ receive / − deliver**; amount: **+ receivable / − payable**.

### 10.9 File and report register, with published timings

`[verified]` NCL/CMPT/73997 Part D and the NSE circulars cited. Standard timings apply to **members with no Custodial Participant trades** — CP/custodial flows download later.

| Time | File | Path |
|---|---|---|
| **18:00** | `FOSett_prce_DDMMYYYY.csv` — settlement prices | `/faoftp/faocommon/` |
| **18:00** | `nsccl.YYYYMMDD.s.spn.gz` — SPAN parameter file | `/faoftp/faocommon/Parameter/` |
| **19:45** | `Trade_NCL_FO_0_TM_<memcode>_<trade date>_F_0000.csv` and the CM equivalent | `/faoftp/F<MemberCode>` |

| File | Content |
|---|---|
| `contract.gz`, `NSE_FO_contract_ddmmyyyy.csv.gz` | F&O contract master / MII-format contract file — instrument, symbol, expiry, strike, option type, lot size, quantity freeze, price bands. Extranet `/faoftp/faocommon`; MII file also at https://www.nseindia.com/all-reports-derivatives |
| `spd_contract.gz`, `NSE_FO_spdcontract_ddmmyyyy.csv.gz` | Spread combination contracts for the day-spread order book |
| `NSE_FO_SosScheme.csv` | Per-stock strike scheme: symbol, month type, symbol type, step value, strikes provided (ITM/ATM/OTM), **total strikes including reserve** (ITM/ATM/OTM). The gap between "provided" and "including reserve" is the intraday reserve pool |
| `fo_secban_DDMMYYYY.csv` | **Ban-period securities** for the next trading day |
| `REG_INDDDMMYY.csv` | Surveillance / regulatory indicators per security, for the next trading day — https://www.nseindia.com/all-reports |
| `Contract_Delta_DDMMYYYY_i04.csv` | **2 PM intraday FutEq (delta) per contract** — ban-period monitoring |
| `Index_deriv_pos_limit_DDMMYYYY` | Index derivatives position limits in **quantity terms** for the next trading day; fields `index`, `instrument`, `qty_limit`, `category` (from 6 Oct 2026) |
| `F_EX01` / `F_EX02` | **Exercise report** (TM / CM), `/FAOFTP/F<MEMBER CODE>/REPORTS` |
| `F_AS01` / `F_AS02` | **Assignment report** (TM / CM), same path |
| `F_MG12` / `F_MG13` | EoD margin file (CM / TM), `.LIS.gz`, same path |
| `F_DLMG01` / `F_DLMG02` | Delivery margin reports |
| `F_AEL_OPT_CONTRACTS_DDMMYYYY.CSV` | Applicable ELM% per contract, **inclusive of the +2% expiry-day index-option ELM**; widened from option strikes to **all futures and option contracts** from 7 Jul 2026 (NCL/CMPT/74569, deferred by 74594) |
| `F_SA01`–`F_SA06` | Short allocation; snapshot suffixes `_i01`–`_i04` |
| `F_OPTCSH` | Option value collected in cash (far-OTM shorts) |
| `F_MRG_TM_` / `F_MRG_CM_` | Member's **margin-collected** reporting upload — EoD **and peak** — via NSCCL-MASS or `/FAOFTP/F<MEMBERCODE>/COLAT/UPLD`. **Sign-off T+5 working days** |
| `<XXXXX>_DNETOBLG_SETTYPENO_DDMMYYYY.csv` | **Netted detailed final obligation** report (CM/custodian; `<XXXXX>T_` for TM) — the file that carries the cash + F&O physical net obligation |
| `F_<MEMBER CODE>_DLVR_SETTYPNO_DDMMYYYY.csv` | Delivery report, F&O segment |
| `F_CN01`, `F_PS05`/`F_PS06`, `F_MWPLBA`, `F_SECREL`, `F_BK01`–`F_BK03` | Contracts; exchange-wise positions (TM/CM); MWPL; securities release; bank/obligation reports |

**MG12 / MG13 field layout** `[verified]`: Trade date; TM/CP code (MG12) or client code (MG13); **SPAN margin**; Filler; **Extreme Loss margin**; **Delivery margin**; **Margin on consolidated crystallised obligation**; **Total margin to be collected** (= the sum of those four); **Peak of intra-day margin to be collected**. Margins are on **EoD positions with BOD margin parameters**.

**Exercise report (EX01/EX02) fields** `[verified]`: Date; Exercise Number; Exercise Date; Clearing Member Code; Member Type; Member Code; Account Type; Client Account Code; Settlement Type; Instrument Type; Symbol; Expiry Date; Strike Price; Option Type; Corporate Action Level; Market Type; Requested Quantity; Exercise Type; Exercise Style; Final Exercise Type; **Exercise / Do Not Exercise Flag** (legacy — see §9); Remarks; Acceptance Flag; Rejected Quantity; Rejection Reason; **Valid Exercise Quantity**; **Settlement Price (underlying close price of the security)**; **Value (Settlement Price × Valid Exercise Quantity)**.

**Assignment report (AS01/AS02) fields** `[verified]`: Assignment Date; Segment Indicator; Assigned Clearing Member Code; Assigned Member Account Type; Assigned Member Type; Assigned Member Code; Assigned Client Account Code; Settlement Type; Instrument Type; Symbol; Expiry Date; Strike Price; Option Type; Corporate Action Level; **Assigned Quantity**; **Assignment Type (interim or final exercise)**; Settlement Price (underlying close price).

### 10.10 Exercise, assignment and settlement cycle — exact wording

`[verified]` NCL/CMPT/73997 §5.3 and the NSE settlement mechanism page:

- **European style**, both index options and options on individual securities; *"all in-the-money contracts shall get automatically exercised on the expiry day."*
- *"Long positions at in-the money contracts shall be assigned to short positions in option contracts with the same series on a **random basis**."* — **random, not pro-rata.**
- *"Option contracts, which have been exercised, shall be assigned and allocated to clearing members, at the **client level** on a random basis."*
- Index options: cash settled by debit/credit of clearing accounts; **pay-in/pay-out T+1** (T = expiry day).
- *"Open positions, in option on individual securities contracts, shall cease to exist after exercise or on expiration day as the case may be."*
- **Premium settlement** is premium-style, cash settled, netted *"across all option contracts for each CM at the client level"* at end of day; pay-in/pay-out **T+1**.
- **Settlement period** §3.2: daily MTM, final settlement of cash-settled futures, premium settlement and cash-settled exercise settlement are *"effected before start of market hours on the next day."*
- **Delivery settlement** §3.3: netted with the cash segment and settled **in the Capital Market segment**, in its settlement/market type and settlement number. NCL *"shall not issue separate settlement calendar for F&O physical settlement and F&O physical Auction market"* `[verified]` NCL/CMPT/55328 (b)(2).
- **Early pay-in priority** `[verified]` NCL/CMPT/55328 (e): EPI of funds is considered **first in the Capital Market segment**; any residual allocated at client or client-security level is then applied to **net buy obligations in F&O** under the same CM-TM-client.

### 10.11 Delivery margin — the full clause

`[verified]` NCL §10.2.7, with the origin circular at §9 above.

- Levied on the **lower of potential deliverable positions or ITM long option positions**, from **four days prior to expiry**. NCL's own example is now written for the Tuesday world: *"If expiry of derivative contract is on Tuesday, the delivery margins on potential in-the-money long option position shall be applicable from previous **Wednesday EOD**."*
- ITM is identified **daily**, on the **closing price of the security in the underlying Capital Market segment**.
- Valuation is asymmetric: **ITM long options at the strike price**; other marginable positions at the **underlying closing price**.
- Rate = the **Capital Market segment** margin rate for that security (**VaR + ELM + additional margins**), *"updated for every change in margin rate in Capital Market segment"* — not the F&O rate.
- Stagger: **10% / 25% / 45% / 70%** of the delivery margin computed at **E−4 / E−3 / E−2 / E−1 EOD**. **There is no 100% step** — from expiry day the position carries full cash-segment VaR + ELM + MTM as delivery margin.
- *"recomputed only on an EOD basis considering the revised position, underlying prices, and margin rates"* — so the **base moves daily**, and a client's margin can rise much faster than 10→70 implies.
- EoD **MTM margins** are computed on **expiry day and expiry+1** as the difference between the settlement obligation and the value of positions at the cash-segment closing price.
- Delivery margins are **part of the clearing member's initial margin** but are **excluded from upfront client collection** and collectible by **T+1** — the broker funds the difference.

### 10.12 Shortage, auction and close-out cascade

`[verified]` NCL §8.8:

1. Seller fails to deliver on pay-in day.
2. The short-delivering CM is **debited the value of the undelivered securities at the Capital Market valuation price as of the expiry day preceding the pay-in day**.
3. The CC conducts a **buy-in auction** per the cash-segment auction schedule. *"The auction amount shall be charged to the short delivering member"* — the broker bears the **auction** price, not the valuation price.
4. *"Failure to procure shares in auction shall be closed out."* Likewise where *"the auction seller fails to deliver in part or full on auction pay-in day."*
5. Securities **under corporate action** are **not auctioned** — *"Such shortages shall be closed out directly."*
6. *"Close out shall be at the closeout price of the security as determined in Capital Market Segment."* — **the formula itself is `[unknown]` here**; it lives in NCL/CMPT/73996 (Consolidated Circular, Capital Market Segment, 30 Apr 2026), which was not retrieved. **Do not publish a close-out percentage without it.**
7. **Internal shortages** are identified by the CC and auctioned per the cash-segment procedure; custodian-CMs may include theirs. Members must **upload pay-in/pay-out shortage details daily** (format at Part C (6)). From **March 2023**, F&O clearing members provide voluntary-auction requests for F&O physical internal shortages in the **cash segment's** settlement type, number and series `[verified]` NCL/CMPT/55328 (b)(3).

**Pay-in / pay-out operational traps** `[verified]` NCL §8:

- The CM's **Capital Market** depository account is used; a CM not a member in the cash segment must hold a **pool account with both depositories**.
- Settlement accounts must be maintained at **both NSDL and CDSL**, with specific pay-in instructions and attention to **depository cut-offs**.
- Per SEBI/HO/MIRSD/DoP/P/CIR/2022/119 clause 4.5, *"in case of discrepancies in details like **UCC, TM ID, CM ID, ISIN** etc. between instruction and obligation, such transfer instructions will be rejected by the depositories"* — and *"any rejection thereof will result into **shortage in fulfilment of pay-in obligation**."*
- **Auto Delivery Out** generates delivery-out instructions from net obligations across cash and F&O physical, *"released on the **Expiry day**"*, available only if availed in the cash segment. **Auto DO is not provided** for incremental T+1 obligations from **custodian-rejected cash trades** — manual pay-in instructions required.
- Pay-out goes **directly to the client demat account** (SEBI/HO/MIRSD/MIRSD-PoD1/P/CIR/2024/75, 5 Jun 2024). SCM/TM-CM/PCM may request **pay-out under pledge** for unpaid or MTF clients — the route for a client taking delivery without full funds.
- **Funds settlement** runs from the **cash-segment settlement bank account**; fund shortages are apportioned **pro-rata on segment-wise obligation**, and default losses are computed the same way with **segment-wise default waterfalls maintained**.

### 10.13 STT worked example at current rates

Rates `[verified]` NSE/FATAX/73524, 31 Mar 2026 (Finance Act 2026, effective 1 Apr 2026). Arithmetic below is illustrative.

Single-stock call, lot 500, strike ₹1,000, final settlement price ₹1,010 (₹10 ITM), one lot:

| Leg | Base | Rate | STT |
|---|---|---|---|
| Exercise STT — on the **long holder, as "Purchaser"** | Intrinsic value (1,010 − 1,000) × 500 = **₹5,000** | **0.15%** | **₹7.50** |
| Delivery STT — purchaser side | 1,000 × 500 = **₹5,00,000** (delivery at strike) | **0.10%** | **₹500** |
| Delivery STT — seller side | ₹5,00,000 | **0.10%** | **₹500** |

Gross intrinsic gain ₹5,000; exercising buyer's STT ₹507.50 — about **10%** of the gain, before brokerage, stamp duty and exchange charges. Now take the same option **1 paisa** ITM: exercise STT ≈ ₹0.01, but the **delivery STT is still ₹500** on a ₹5 position.

**That is the live 2026 complaint** — the **0.10% delivery STT on the full contract value** of a barely-ITM physically settled stock option, payable on **both** sides. It is **not** the pre-2019 problem: exercise STT moved from the **full settlement price** to the **intrinsic value** with effect from **1 September 2019** (`[verified]` NSE/FATAX/41919, 20 Aug 2019 — *"STT at the prescribed rate shall be levied on the 'intrinsic value' instead of the settlement price as at present"*, per Finance (No.2) Act 2019, assent 1 Aug 2019). Any example showing STT exceeding an option's entire value is almost certainly pre-2019 and must not be reused.

For **index** options the picture is much milder: cash settled, so only the exercise STT on intrinsic value applies — no delivery leg.

**Netting does not reduce STT** `[verified]`: *"netting of delivery obligations shall be only for the purpose of settlement. Therefore, Securities Transaction Tax (STT) and Stamp Duty shall continue to be computed, levied and reported on a **segment wise level**."* A client seeing a net-zero delivery is still charged on both the cash and F&O physical legs — a complaint in its own right.

**Collection and discipline** `[verified]` NCL §§6.3–6.6: STT on exercise and on physically settled stock derivatives is collected on **Expiry+1 with the delivery pay-in** (otherwise T+1); *"Non-payment of STT shall be treated as non-fulfilment of settlement obligations"*; STT follows the **client code at order entry or as modified up to the trade modification close time** (NSE F&O: **16:15**) and *"The Exchange shall not entertain any request for modification thereafter"*; the **contract note must specify total STT**.

### 10.14 Supplementary notes on areas 1 and 5

**Stock options strike scheme** `[verified]` NSE/FAOP/73928 §1.11 — narrow and wide ranges per expiry:

| | | Near month | Middle month | Far month |
|---|---|---|---|---|
| Step value | Narrow | Step Value | Step Value | **2 ×** Step Value |
| | Wide | **2 ×** Step Value | **2 ×** Step Value | **4 ×** Step Value |
| Strikes | Narrow | Min 3–1–3, Max 12–1–12 | Min 3–1–3, Max 12–1–12 | Min 3–1–3, **Max 6–1–6** |
| | Wide | Min 1–1–1, Max 12–1–12 | Min 1–1–1, Max 12–1–12 | Min 1–1–1, **Max 6–1–6** |

Design intent, verbatim: *"The strike scheme will attempt to provide coverage of around **10% in narrow range**. The wide range will provide an **additional 5%** from the narrow range, thereby providing total price range of around **15%** subject to meeting minimum and maximum number of strikes."* Step value is set by the **volatility of the underlying** and **reviewed quarterly**; new strikes are introduced *"on the next working day based on the previous day's underlying close values"*; ATM is the close rounded to the nearest strike interval.

**Strike removal** `[verified]` same section — identical three-part test for stock options (**monthly** review, on the trading day after the monthly expiry, EOD) and long-dated index options (**semi-annual**, on June/December expiries): contracts **eligible** under the scheme continue **irrespective of open interest**; contracts **not eligible but with open interest** continue; contracts **not eligible and with zero open interest** are **discontinued**.

**Lot size granularity** `[verified]` NSE/FAOP/73928 §1.13: index — multiple of **5**, not less than **10**. Stock — multiple of **25**, not less than **50**; if the value at lot size 50 exceeds ₹10 lakh → multiple of **5**, not less than **10**; if the value at lot size 10 still exceeds ₹10 lakh → lot size **5**. Review every **6 months** on the average closing price of the last one month, with **at least 2 weeks** notice. *"If the revised lot size is higher than the existing one or lower than the existing one and not in multiple of old lot, it is made effective for only new month contracts"* — which is why two live expiries of the same underlying can carry different lot sizes.

**Quarter Sigma Order Size method** `[verified]` NSE/FAOP/73928 §3.5: VaR per security on J.R. Varma Committee / EWMA lines gives one sigma; **× 0.25** gives quarter sigma; **× the average of best buy and best sell** gives the quarter sigma price; the order value that would move the price by that amount, on each side, from **four order-book snapshots per day** over the previous six months, is the MQSOS. NSE's worked example: best buy 306.45, best sell 306.90, average 306.70, one sigma 0.009, quarter sigma 0.00225, quarter sigma price **₹0.70**.

**Two further stock-exit routes** `[verified]` NSE/FAOP/73928 §3.5: **Scenario B.2** — *"If a FO stock has remained subject to the ban on new position for a significant part of the month consistently for three months … then all the Exchanges shall phase out derivative contracts on that underlying post confirmation"* ("significant part" is **not quantified** in the circular). **Scenario B.3** — the exchange *"may compulsorily close out all derivative contract positions in a particular underlying"* where continuance is *"detrimental to the interest of the market"*, decided with other exchanges and applied uniformly.

**Currency derivatives TM limits, for the cross-segment contrast** `[verified]` NCL/CD/73998 (30 Apr 2026) §9.1.1 — gross open position across all contracts not to exceed: **USD-INR** 15% of OI or **USD 100 mn** (bank and non-bank TM), or **USD 1 bn** for a **bank TM authorised by RBI**; **EUR-INR** 15% or EUR 50 mn; **GBP-INR** 15% or GBP 50 mn; **JPY-INR** 15% or JPY 2,000 mn; **EUR-USD** 15% or EUR 100 mn; **GBP-USD** 15% or GBP 100 mn; **USD-JPY** 15% or USD 100 mn. Proprietary non-bank broker limits (§9.1.5) are half the USD-INR/EUR-USD/GBP-USD/USD-JPY figures and half the EUR/GBP-INR figures; combined FCYINR proprietary limits (§9.1.6) are 15% of all-FCYINR OI or **USD 200 mn** (bank) / **USD 100 mn** (non-bank).

The structural contrast worth drawing out `[verified]` §9.1: *"The position limit linked to open interest shall be applicable **at the time of opening a position**. Such positions shall not be required to be unwound immediately … in the event of a drop of total open interest. However … the trading member shall not be allowed to increase their existing positions or create new positions till they comply."* This is the original **passive-breach** treatment that SEBI expressly imported into equity derivatives in October 2024 — *"In conformity with the extant practice in currency derivatives segment"* (SEBI 2024/140 §3.1).

### 10.15 Research method, for refreshing this document

Primary sources were obtained by direct fetching rather than search, after the session's web-search budget was exhausted. The patterns that worked:

| Purpose | Endpoint / pattern |
|---|---|
| Enumerate SEBI circulars by keyword | `https://www.sebi.gov.in/sebiweb/home/HomeAction.do?doListingAll=yes&search=<term>` — returns landing-page URLs across circulars, master circulars and consultation papers |
| SEBI document PDF | The landing page embeds `/sebi_data/attachdocs/<mon-yyyy>/<id>.pdf` |
| **Enumerate NSE/NCL circulars by date range** | `https://www.nseindia.com/api/circulars?fromDate=DD-MM-YYYY&toDate=DD-MM-YYYY` — bootstrap cookies from `https://www.nseindia.com/resources/exchange-communication-circulars` first, and send a `Referer`. Returns `cirDisplayDate`, `circDisplayNo`, `fileDept`, `sub`, `circFilelink` |
| NSE/NCL circular file | `https://nsearchives.nseindia.com/content/circulars/<DEPT><NUM>.pdf` or `.zip` (older: `archives.nseindia.com`). Zips often contain `PART A/B.pdf` and `PART C/D.docx` — extract the docx with `zipfile` + `word/document.xml` |
| NSE content pages | Work with a cookie jar and `Referer`; much of the content is JS-rendered, so prefer circulars |

The NSE circular API was the single most productive source: it allows both positive enumeration (every expiry, strike, lot-size, position-limit, margin and CAS circular from 2021 to date) and **negative confirmation** — though note the DNE case in §9, where the withdrawal sat in clause (g) of a circular whose subject line said "net settlement". **Subject-line sweeps prove nothing on their own; confirm negatives against the current consolidated circular as well.**

**Inaccessible in this pass:** bseindia.com, bseclearing.com and BSE's notices API (403 / Access Denied / JS-only); incometaxindia.gov.in (403); SEBI's Master Circular **Chapter 5** PDFs (JS-loaded — only the 4-page covering circular is attached to the landing page); and **NCL/CMPT/73996**, the Capital Market consolidated circular that holds the close-out price formula.


---

## Gaps and cautions

| Gap / caution | Evidence class and exact unresolved point | Required follow-up before production use |
|---|---|---|
| BSE expiry originals | [likely] Thursday / 1 Sep 2025 independently corroborated; [uncertain] exact numbered notice text read only via reproduction because original access failed. | Obtain BSE 20250617-11 and 20250623-59 directly/member archive; retain the actual notices. Do not promote these rows to [verified] merely because a URL exists. |
| BSE current product inventory | [unknown] exact current counts for weekly/quarterly/half-yearly SENSEX, all new monthly indices, stock universe, lot sizes and strike counts; FOCIT launch only [likely] here. | Read the trade-date BSE contract master and each new-product circular; distinguish approval from launch. |
| BSE/ICCL operational parity | [unknown] independently retrieved current ICCL ladder circular, DNE withdrawal reference, margin/penalty overlays, settlement timing and file schemas. | Bind manual to actual CC; NCL-specific figures and files must not automatically become ICCL facts. |
| CAS live review | [unknown] whether a final replacement circular issued on/after 15 Oct 2026; [verified] September document is a consultation. | Check dated SEBI/exchange notices before publishing any VWAP reversion or revised closing time. News of expected decisions is insufficient. |
| Post-CAS detailed CC SOP | [uncertain] exact cross-exchange volume weights, no-trade/fallback handling and unexpired-futures daily VWAP clock window in the later implementation SOP. | Obtain applicable CC settlement SOP; use official settlement prices, not locally reconstructed indicative prices. |
| Exact live lots and universe | [verified] 2025 lot transition; [unknown] full 15 Oct 2026 master inventory and any subsequent periodic lot changes. | Archive date-specific master. Do not describe transition lot figures as permanently current. |
| Future-effective Oct 2026 changes | [unknown] complete list of announced-but-not-yet-effective stock additions/exits and later lot changes. | Separate launch/expiry effective dates from notice date; no unverified symbols/circulars from the prior draft retained. |
| Intraday strike trigger | [unknown] universal move threshold, maximum reserve count beyond published per-symbol scheme, or guaranteed enablement interval. | Use exchange broadcasts/master updates; do not invent a “5% move” trigger or fixed refresh deadline. |
| Stock entity-limit measurement | [verified] NCL ordinary client clause says gross open position while MWPL/ban explicitly uses FutEq; [unknown] any later harmonising implementation. | Obtain latest entity-limit SOP; maintain both gross-position and FutEq monitoring until resolved. |
| Eligibility MWPL-value test | [uncertain] relationship between historical eligibility-value methodology and recalibrated trading MWPL denominator; NSE consolidated eligibility section retains separate wording. | Use exchange eligibility determination; do not recalculate exit eligibility from trading MWPL without authority. |
| Holdings-backed limit reporting | [unknown] current exact upload deadline/channel after glide path; [verified] old noon T+1 provision was transitional. | Obtain latest NCL/ICCL reporting SOP and acknowledgement/error specifications. |
| Currency | [verified] official NSE limit table read; [unknown] complete latest RBI underlying-exposure permission, documentation and later currency amendments. | Dedicated currency pass required; do not interpret position ceiling as trading permission. |
| MCX | [verified] separate Sep 2026 commodity review exists; [unknown] exact MCX effective changes, thresholds and product delivery limits in this document. | Complete commodity-specific research before enabling MCX operations. |
| Consultations | [verified] TM FutEq reform, CAS alternatives and ITM-to-futures devolvement identified as proposals; [unknown] complete final-disposition history. | Obtain operative circular and effective date before changing production. |
| Forced square-off | [unknown] greenfield broker's internal notice period, time, higher margin, fee, delivery opt-in and liquidation authority. | Approve written RMS/client policy; published broker examples are not universal exchange deadlines. |
| Settlement times and holidays | [unknown] exact pay-in/payout, file-publication, trade-modification and auction times for each future settlement. | Load official settlement calendars; never infer deadlines from ordinary-market closing time. |
| Coverage of all later circulars | [unknown] exhaustive completeness through every member-only notice on cutoff date; [verified] positive current evidence includes 6 Oct 2026 index-limit circular. | Periodic circular reconciliation; absence from web search is not proof of repeal or non-existence. |
| Primary-page staleness | [verified] April NCL final-price text predates effective CAS; NSE STT page contains inconsistent generic wording; original SEBI margin dates differ from exchange implementation. | Apply dated operative amendments; retain contradictions in evidence register. |
| Knowledge-base write | [unknown] durable-vault update completion: this session permits writes only inside the repo and /tmp; Obsidian is outside writable roots. | Session handoff staged in working/finix2/logs/2026-10-15-fno-kb-handoff.md for later authorised vault import. |
| Close-out price formula | [unknown] NCL §8.8 defers to "the closeout price of the security as determined in Capital Market Segment"; the formula itself sits in NCL/CMPT/73996 (Capital Market consolidated circular, 30 Apr 2026), which was not retrieved. | Read NCL/CMPT/73996 before publishing any close-out percentage or the commonly quoted "20% above close / highest price trade-day-to-auction-day" rule. |
| Additional Surveillance Deposit quantum | [unknown] SEBI 2025/122 §4.7 delegates the expiry-day index-option breach penalty to a joint exchange SOP effective 6 Dec 2025; the SOP and its rupee/percentage basis were not locatable. | Obtain the joint exchange SOP; do not state a quantum. |
| Short Option Minimum Margin | [verified] NCL abolished the short option minimum charge for index and single stock derivatives from 1 Jun 2020 (NCL/CMPT/44391, Annexure 1 item 5). **There is no SOMM in Indian equity F&O.** SOMM does exist in commodity derivatives. | Reject any SOMM percentage offered for equity F&O; if a brief asserts one, treat the brief as wrong. |
| 2% expiry-day ELM scope | [verified] **index options only** — NCL places it in §10.4.2 (short index options), not §10.4.4 (stock options), and NCL/CMPT/64639 says "short index options" expressly. SEBI 2024/132 §5.6.1 says only "short options contracts", so a reader checking SEBI alone may disagree. | Cite NCL, not SEBI, for the scope of this levy. |
| Negative findings by subject-line search | [verified] the DNE withdrawal sat in clause (g) of a circular titled for net settlement (NCL/CMPT/55328), so a keyword sweep of circular subjects missed it entirely. | Never treat absence from a subject-line sweep as repeal. Cross-check the current consolidated circular and the topic-adjacent circulars. |

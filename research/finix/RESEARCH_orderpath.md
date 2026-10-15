# Exchange Protocol and Order-State Edge Cases — NSE, BSE, MCX

**Research date:** 2026-10-15
**Context:** greenfield Indian stockbroker (NSE + BSE + MCX; cash, equity F&O, currency, commodity). Input to an operations and architecture manual.
**Evidence tagging:** every row carries `[verified]` (fetched primary document, quoted, URL given) / `[likely]` (two or more independent sources, both named) / `[uncertain]` (inference or single weak source) / `[unknown]` (not established — do not design against it).

> **Method note.** This pass was done against the exchanges' own published protocol manuals rather than secondary write-ups. Where a protocol message name, transaction code, FIX tag or circular number appears below, it was read out of the document named in the same row. Where a statement is an analyst inference about broker-side design, it is labelled as such and is *not* attributed to the exchange.

---

## 0. Source inventory

All of the following were fetched and parsed during this pass. HTTP 200 on each; exchange WAFs reject non-browser agents, so a browser `User-Agent` + `Sec-Fetch-*` header set is required.

| # | Document | Version / date | Venue | URL | Tag |
|---|---|---|---|---|---|
| S1 | Trading Protocols landing page (NNF, drop copy, MTBT, NOTIS, extranet) | live page, read 2026-10-15 | NSE | https://www.nseindia.com/trade/platform-services-neat-trading-system-protocols | [verified] |
| S2 | Capital Market Trading System — Protocol for Non-Neat Front End ("Trimmed NNF", CM) | v6.7, 2026-09-30 | NSE | https://nsearchives.nseindia.com/web/mediaattachment/2026-09/TP_CM_Trimmed_NNF_PROTOCOL_6.7_20260930175847.pdf | [verified] |
| S3 | Futures and Options Trading System — Protocol for Non-Neat Front End (FO) | v9.51, 2026-09-30 | NSE | https://nsearchives.nseindia.com/web/mediaattachment/2026-09/TP_FO_Trimmed_NNF_PROTOCOL_9.51_20260930175019.pdf | [verified] |
| S4 | Protocol for Drop Copy Service — Capital Markets Segment | v3.0, September 2025 | NSE | https://nsearchives.nseindia.com/web/sites/default/files/inline-files/DC_CM_Normal_DROPCOPY_PROTOCOL_3.0_0.pdf | [verified] |
| S5 | Protocol for Drop Copy Service — F&O Segment | v3.0, 2026-09-02 | NSE | https://nsearchives.nseindia.com/web/mediaattachment/2026-09/DC_FO_Normal_DROPCOPY_PROTOCOL_3.0_20260902172916.pdf | [verified] |
| S6 | Trading Interfaces (CTCL) page — lists ETI, FIX, MDI, EMDI, EOBI, Drop Copy | live page, read 2026-10-15 | MCX | https://www.mcxindia.com/technology/ctcl/trading-interfaces | [verified] |
| S7 | Trading Binary Interface — MCX Enhanced Trading Interface (ETI) API | v1.4.2, 2024-08-14, released under circular **MCX/CTCL/536/2024** | MCX | https://www.mcxindia.com/docs/default-source/technology-services/new-trading-interfaces/trading-binary-interface---mcx-enhanced-trading-interface-(eti)-api-v1-4-2.zip?sfvrsn=3ee49479_1 | [verified] |
| S8 | Circular **MCX/TECH/066/2019**, "Drop Copy Facility for CTCL Users" | 2019-02-06 | MCX | https://www.mcxindia.com/docs/default-source/circulars/english/2019/february/circular-066-2019gucf18417c-fae7-47f0-92ad-45309e14a884.pdf?sfvrsn=543a7716_0 | [verified] |
| S9 | SEBI circular **HO/38/44/12(3)2025-MIRSD-TPD1/I/10705/2026**, "Discontinuation of Investor Risk Reduction Access (IRRA) platform" | 2026-05-07 | SEBI | https://www.sebi.gov.in/sebi_data/attachdocs/may-2026/1778149088029.pdf | [verified] |
| S10 | "Bombay Stock Exchange's NTA / **Enhanced Trading Interface Manual** / NTA Release 2.1" — Interface Version 2.4, Build 600.003.610-600003650.12 | **V1.6.15**, cover date **2026-09-17** | BSE | https://www.bseindia.com/downloads1/BSE_ETI_Manual_format.zip (member `BSE_ETI_Manual_V1.6.15.pdf`) | [verified] |
| S11 | Same manual, **older copy still linked from the equity-derivatives live page** | **V1.6.12**, cover date **2024-12-13** | BSE | https://www.bseindia.com/downloads1/ETI_Messaging_format_Manual.pdf | [verified] |
| S12 | "Drop Copy" document (site label), `DropCopy.docx` | file date 2026-01-27, no version stated | BSE | https://www.bseindia.com/downloads1/DropCopy.zip | [verified] |
| S13 | "**BOLTPLUS Connectivity Manual**" | cover **v1.4**; change log row "1.4 / 10th July 2023"; running header says V 1.3 | BSE | https://www.bseindia.com/downloads1/BOLTPLUS_Connectivity_ManualV12.pdf | [verified] |
| S14 | "BSE Market Data Interfaces Manual" **v1.4.1** (2023-04-19); "BSE's Enhanced Order Book Interface Manual" **V1.4** (2025-05-24) | as shown | BSE | https://www.bseindia.com/downloads1/BSE_market_data_manual_v141.zip ; https://www.bseindia.com/downloads1/BSE_market_data_EOBI.zip | [verified] |

**How the BSE documents were found** (worth recording, because it is not discoverable by ordinary browsing): `www.bseindia.com` is an Angular SPA and `/static/nta/interactive_interfaces`, `/static/nta/market_data_interfaces` and `/boltpluslivesetup` all return an identical ~14 KB shell with no content. The document URLs are **hardcoded string literals in the main JS bundle** `https://www.bseindia.com/assets/includenew/js/main-LRHPGAAH.js` (~884 KB); grepping `/downloads1/…` out of it yields 118 static document paths. `robots.txt` returns the SPA shell; `sitemap.xml` is real (311 URLs) and reveals the `/static/nta/*` route names. `api.bseindia.com/BseIndiaAPI/api/NoticesCirculars/w` returns Akamai "Access Denied", so **BSE's notices/circulars cannot be searched programmatically** — this is the single biggest evidence gap in this document. `member.bseindia.com` is live but behind an Extranet login. `[verified]`

**S10 vs S11 is a live trap.** The same manual is published at two URLs at two different versions: the equity-cash and simulation pages link **V1.6.15 (Sep 2026)**; the equity-derivatives live section links **V1.6.12 (Dec 2024)**. A broker implementing from the derivatives page link is three versions behind and will miss, among other things, the matching-engine-reinitialisation handling added in §9.12, `AlgoID (30649)` on mass-cancel requests, the `MessageHeaderOut` change `Pad2(25017)`→`Filler4(30652)`, and reasons `271 Client Debarred` / `272 Order Ineligible CAS`. `[verified]` S10 §9.10–§9.12

Other protocol documents listed on S1 but not opened in this pass (names and versions are `[verified]` from S1; contents `[unknown]`): Trimmed NNF **CD v6.4**, Trimmed NNF **COM v3.6**, Drop Copy – Normal protocol **CM v2.1 / FO v1.9 / CUR v1.7 / COM v1.5**, Order & Trade Drop Copy **CM v3.0 / FO v3.0**, Multicast Tick-By-Tick (MTBT) **v7.1** all four segments, NOTIS WEB Protocol **CM v2.1 / FO v2.1 / CD v1.5 / SLB v1.1 / COM v1.1**, SLBM Normal NNF **v2.7**, Extranet API Protocol **v2.0**, EGR Trimmed NNF **v1.3**.

MCX documents listed on S6 but not opened: **MCX FIX v1.2**, **MCX MDI v1.5**, **MCX EMDI v1.5**, **MCX EOBI v1.2**, MCX Reference Data Files (Masters), MCX File Formats, UCC File Formats, ETI header file, connectivity details (test and live/PDC+DRS).

---

## 1. DROP COPY

**Answer: all three venues offer a drop copy. The names and the mechanics differ materially, and at MCX there are two distinct things both called "drop copy".**

| Venue | Facility name (exact) | What carries it | Scope | Tag |
|---|---|---|---|---|
| NSE | **"Exchange Dropcopy Facility"**; two services — **Drop Copy – Normal protocol** (legacy) and **Order & Trade Drop Copy** (new) | Dedicated TCP/IP connection to a **Drop Copy Gateway Router** → assigned **Drop Copy Gateway**. Separate gateway-router connections for Order+Trade vs Trade-only. | Corporate Manager user ⇒ member-firm-level order and trade data; Branch Manager / Dealer ⇒ that user's data only. Clearing member gets all trades related to it. | [verified] S1, S4 |
| BSE | **"Drop Copy"** — and there are **two**: (a) the **trade** drop copy, "the ETI Drop Copy feature", subscribed with `Subscribe (10025)` at `RefApplID = 1` (Trade); (b) the **order** drop copy, which the manual's own recovery table labels *"Listener broadcast (standard order drop copy)"*, `RefApplID (1355) = 5` | **Inside BSE ETI itself** — no separate interface or connection | (a) *"trades for the entire member firm within the same ETI message flow"*, **Admin Sessions only (IDs 0 and 200)**, trading members only; (b) per session, or all sessions of a business unit; **LF sessions only** | [verified] S12, S10, S13 |
| MCX | (a) **Drop Copy** facility for CTCL users (circular **MCX/TECH/066/2019**); (b) **Listener Broadcast** inside **MCX ETI**, which the manual itself calls "'drop copies' for standard orders" | (a) Leased-line connectivity, separate application to the exchange; (b) in-band ETI broadcast subscription (`RefApplID (1355) = 5`, Listener Data) | (a) "copy of trade and order related information for **all user IDs under the member**"; (b) per-**session** — a listener session subscribes to the listener data of one specified session; `SubscriptionScope = 0` gives member-level | [verified] S6, S7, S8 |

### 1.1 NSE — exact wording and payload

S1 states: *"Members can subscribe to the Dropcopy facility provided by the Exchange. Members developing the functionality need to refer the below mentioned API documents for connecting and receiving the drop copy from the Exchange."* `[verified]`

S1 also states: *"Exchange has introduced a new drop copy API which will have orders and trades information. Members shall have choice either to download only trade information or download both orders and trade information. **Initially, available in Capital Market (CM) segment.**"* — yet S1's own table publishes **Order & Trade Drop Copy v3.0 for both CM and F&O**. Treat the "CM only" sentence as stale page copy; confirm current segment enablement with NSE Member Services. `[verified]` that both statements appear; `[uncertain]` which is operative today.

S4 Chapter 1: *"The NSE Drop Copy (DC) service provides dedicated Trade Only and Order & Trade data. It disseminates information about members / users order and trades on a real time basis… Members will initiate the connection to the assigned DC Gateway using the **existing login credentials being used for login to the Trading System**."* `[verified]`

**Subscription is a protocol-level act, not just an entitlement:** after logon, the member sends a subscription request **per partition**.

| Subscription | Transaction code | Delivers (exact list from S4) | Tag |
|---|---|---|---|
| Trade only | `DC_TRD_SUBSCRIPTION_REQUEST (8000)` | `TRADE_CONFIRMATION (2222)`, `TRADE_CANCEL_CONFIRM (2282)`, `TRADE_CANCEL_REJECT (2286)`, `TRADE_MODIFY_CONFIRM (2287)` | [verified] S4 |
| Order & Trade | `DC_ONT_SUBSCRIPTION_REQUEST (9000)` | `PRICE_CONFIRMATION (2012)`, `ORDER_MOD_REJECT (2042)`, `ORDER_CANCEL_REJECT (2072)`, `ORDER_CONFIRMATION (2073)`, `ORDER_MOD_CONFIRMATION (2074)`, `ORDER_CANCEL_CONFIRMATION (2075)`, `FREEZE_TO_CONTROL (2170)`, `ON_STOP_NOTIFICATION (2212)`, `ORDER_ERROR (2231)`, `BATCH_ORDER_CANCEL (9002)`, plus all trade confirmations above | [verified] S4 |

Both subscription requests carry a `SequenceNumber` (LONG LONG): *"This contains the last sequence number as received by the user. To retrieve the messages from the beginning of the trading day, this field should be set to '0'."* Only packets with a **greater** sequence number than the one supplied are sent. `[verified]` S4

Operational properties from S4's FAQ, all `[verified]`:

| Question | NSE's answer |
|---|---|
| Credentials | *"Member should use existing NNF User ID and password, as used for login to Exchange Trading system."* Password changes on the trading system reflect on drop copy the same day; you cannot reset a password through drop copy. |
| Can the same user ID be logged into interactive and drop copy at once? | *"Yes. Drop copy channel is independent of the Interactive channel."* |
| End-of-day marker | *"No explicit message will be sent to indicate end of messages."* |
| Clearing member trades | *"Yes. All the trades related to Clearing Member will be available."* |
| Sessions covered | Pre-open, Normal market (continuous matching), Special Pre-open for IPO listing/relisting, Auction, Illiquid call auction session, Block trades, Post close session. *"For trades in CALL AUCTION 2 market Book type will be set as Regular Lot Order (1)"* |
| Sequence-number semantics | *"Sequence number is user wise and streamwise unique value maintained at host end. For different user types i.e. Dealer, Branch manager, Corporate manager and clearing member, sequence number is uniquely maintained."* |
| Login window / post-market connection | *"Details shall be clarified through a circular."* ⇒ `[unknown]` — must be confirmed per circular before designing a nightly drop-copy harvest. |

### 1.2 MCX — two mechanisms, do not conflate them

**(a) The standalone Drop Copy facility.** S8 (MCX/TECH/066/2019) verbatim: *"Using Drop Copy facility, Members will be able to monitor their trading activities on the Exchange platform. The Member will also get copy of trade and order related information for all user IDs under the member through a secured mechanism for risk management and other business operations."* Mechanics, all `[verified]` S8:

- Apply for the **Drop Copy API** in the Annexure-I format; the exchange shares the API on receipt.
- A **test environment** is provided; apply separately in the Annexure-II format to **enable** the facility, after which the exchange supplies the parameters for receiving drop copy data.
- *"The Drop Copy Data will be provided to members on Leased Line connectivity. Members should monitor the link utilization and may opt for separate leased line connectivity if required."*
- *"Members availing CTCL facility may apply for the Drop Copy **without any additional charges**."*
- The exchange may impose additional conditions and reserves the right to **withdraw** the facility for non-compliance, or to modify/withdraw the facility at its sole discretion.

S6 repeats this and adds: *"Members can refer document list available in CTCL Downloads section required for procuring this facility."* `[verified]`

**(b) Drop copy inside ETI — the Listener Broadcast.** S6's interface table describes MCX ETI as providing *"trading functions like Order Handling, Execution Notifications and **Drop copy for complete order history of all standard orders of a session**."* `[verified]`

S7 §4.18 "Listener Broadcast" verbatim: *"The new trading architecture offers 'drop copies' for standard orders to sessions within the same business unit. This service is provided on session level; for example, each listener session may subscribe to listener broadcast data of one specified session. The listener broadcast provides information of the complete order history of standard orders of a session and can be retransmitted. Complete order history means here: all changes to an order happening on the current business day. Drop copies for standard orders are sent once it is entered into the persistent store."* `[verified]`

Subscription and scope table from S7 §4.23.9:

| `RefApplID (1355)` | Stream | Drop copy at member level | Drop copy at user group | Drop copy at self | Tag |
|---|---|---|---|---|---|
| 5 | Listener Data | `SubscriptionScope = 0` (member-level details) | Not provided | `SubscriptionScope = Session ID`, user level | [verified] S7 |
| 1 | Trade | `SubscriptionScope = 0` | `SubscriptionScope = 0`, wildcard / list of users | `SubscriptionScope = Session ID` | [verified] S7 |
| 2 | News / General Message | Market | Market | Market | [verified] S7 |
| 12 | Ex/Dex | `SubscriptionScope = 0` | wildcard / list of users | `SubscriptionScope = Session ID` | [verified] S7 |

Subscribe with `Subscribe-10025` (one broadcast type per request, via `RefApplID`); the response returns a subscription identifier in `ApplSubID (28727)`. Unsubscribe with `Unsubscribe-10006` citing `RefApplSubID (28728)`. *"After a session is established, it is not subscribed to any broadcast, but the risk control broadcast; nevertheless, unsolicited session data is received."* Risk control broadcast needs no subscription: *"The receipt of the risk control broadcast is required by the regulator for all sessions."* `[verified]` S7

**Critical caveat for risk-system design** — S7 §4.23.10.2: *"All order response information in the MCX ETI is **preliminary**… This is also true for the standard order drop copy information published via the Listener broadcast. A participant application always needs to confirm the preliminary execution information with the corresponding legally binding Trade Notification message (Trade Capture Report (AE))."* `[verified]` A drop copy at MCX is therefore **not** a settlement-grade record; the Trade Notification stream is.

### 1.3 BSE — drop copy rides the ETI, and it is admin-session-only

This is the single most design-relevant difference between BSE and the other two: **BSE has no separate drop-copy connection**. S12 verbatim:

> *"BSE supports the "Drop Copy" feature for trades. It is a facility that allows members to receive real-time copies of trades executed by their member firm. **The ETI Drop Copy feature enables the member's trading application to receive trades for the entire member firm within the same ETI message flow.** The Drop Copy facility is subscription-based. The member application must connect to the exchange and subscribe to the Drop Copy facility."* `[verified]`

> *"The communication framework for fetching Drop Copy data is the same ETI framework used by member trading applications. If the ETI framework is already in place, implementing the Drop Copy facility requires minimal changes. **If the ETI application is not in place, fresh development of an ETI-based trading application is a prerequisite for using the Drop Copy facility.**"* `[verified]` S12

S13 §2.1 corroborates at interface level: *"The BSE ETI is the high-performance, low-latency trading interface designed for Participants that require optimal performance and customization. This interface supports full trading functionality, **drop copy** and risk alerts."* `[verified]`

**Eligibility — a hard constraint** `[verified]` S12, verbatim:
> *"Drop Copy of trades is available to **Admin Sessions only (i.e., for 0 and 200 ids only)**. The Drop Copy facility is available only to trading members. **Clearing members cannot use the Drop Copy facility to fetch trades of their trading members.**"*

Contrast NSE, where S4 states flatly *"Will clearing member also get trade data? **Yes.** All the trades related to Clearing Member will be available."* `[verified]` S4. A broker that is also a clearing member therefore gets a clearing-level drop copy at NSE and **cannot** get one at BSE. `[verified]` both sides.

**Session ID and connection sequence** `[verified]` S12, verbatim: *"The Drop Copy Session ID should be a combination of the Member ID and the five-digit Trader ID (00000 or 00200)."* Steps, in order:

| # | Message | TemplateID | Note from S12 |
|---|---|---|---|
| 1 | Connection Gateway Request | 10020 | — |
| 2 | Session Registration Request | 10053 | — |
| 3 | Session Logon Request | 10000 | *"The login process of Admin session id is identical to that of any other ETI session Ids."* |
| 4 | User Logon Request | 10018 | — |
| 5 | Session List Inquire | 10035 | — |
| 6 | Subscribe | 10025 | *"Subscription can be made for specific session IDs, or all session IDs can be subscribed to with a single subscribe request"*; *"Once subscribed, trade messages will be delivered to the member application in real-time via a socket connection. The member application can direct these trades either to a file or directly to their RMS (Risk Management System)."* |
| 7 | **Order** Retransmission | **10026** | *"Retransmission requests are sent on a session-wise basis. **Order Retransmission is allowed for LF session IDs, whereas Order Retransmission for HF session IDs is not permitted**"* |
| 8 | **Trade** Retransmission | **10008** | *"Trade Retransmission requests are sent on a session-wise basis."* |

**Recovery for late joiners and disconnects** `[verified]` S12: *"In case of disconnection during the day or for late joiners, retransmission of trades is possible. To retransmit trades, use the Retransmit Message (Message ID: 10008). **Retransmission must be done separately for each session id.** Use the Retransmit Message (Message ID: 10026) to retransmit the orders of LF session ids which must be done separately for each session id. Order retransmission for HF session is not allowed."*

S10 §6.11.1 footnote reinforces this: *"Retransmission of listener broadcast data must be requested for each session separately. **No session wildcard processing is supported for retransmission.**"* `[verified]`

**Order drop copy (Listener Broadcast), S10 §4.9** verbatim — note the explicit exclusion of lean orders, which the MCX wording does not state:
> *"The new trading architecture offers 'drop copies' for standard orders (**not for lean orders**) to sessions within the same business unit. This service is provided on session level; for example each listener session may subscribe to listener broadcast data of one specified session **or all sessions of a business unit**. The listener broadcast provides information of the complete order history of standard orders of a session and can be retransmitted. Complete order history means here: all changes to an order happening on the current business day"* `[verified]`

S10 also restricts who may subscribe to broadcasts at all: *"Broadcasts may only be subscribed by LF sessions with the exception of service availability, trade broadcast trade enhancement notification and risk control."* `[verified]`

**And the same preliminary-vs-binding warning as MCX**, S10 §6.11.2 verbatim: *"All order and quote response information in the BSE ETI is preliminary; this includes Execution Reports (8) sent out for non-persistent orders as well as quote Execution Reports (U8) sent out for quotes. **This is also true for the standard order drop copy information published via the Listener broadcast.** For these reasons, a participant application always needs to confirm the preliminary execution information with the corresponding legally binding Trade Notification message (Trade Capture Report (AE))."* And §4.7.1: *"Notifications about trades are only provided on Exchange via Trade Capture Report (AE) messages. **Information provided via Execution Reports (8, U8) is indicative only** and needs to be confirmed via a Trade Capture Report (AE)."* `[verified]`

**What was not found:** no BSE drop-copy **application form, enrolment circular, email address or fee schedule**. S12 describes "subscription" purely in the protocol sense (the `Subscribe (10025)` message). All 118 `/downloads1/` paths in the JS bundle were checked; the notices API is Akamai-blocked; `member.bseindia.com` is behind a login. `[unknown]` — assume an Extranet or IML-desk process exists and confirm with BSE (the interactive-interfaces page gives *"Functional queries — IML Info — 022-22728705/8885 — iml.info@bseindia.com"* and *"Technical queries — BSE Tech Support — 022-22728053 — bse.tech@bseindia.com"* `[verified]` S10 page template).

### 1.4 Drop copy — the three venues side by side

| Dimension | NSE | BSE | MCX |
|---|---|---|---|
| Separate connection? | **Yes** — dedicated Drop Copy Gateway Router and gateways, independent of the interactive channel | **No** — same ETI message flow, a dedicated admin session | **Both exist**: a leased-line Drop Copy facility (circular 066/2019) *and* in-band ETI listener broadcast |
| Credentials | Existing NNF user ID/password | Admin session ID = Member ID + Trader ID `00000` or `00200` | Separate application (Annexure I and II) for the leased-line facility; session-level for listener |
| Order data available? | Yes — "Order & Trade Drop Copy" v3.0 | Yes — Listener broadcast, **LF sessions only, standard orders only** | Yes — Listener broadcast, standard orders only |
| Trade data available? | Yes (Trade-only service exists separately) | Yes — admin sessions only | Yes (`RefApplID = 1`) |
| Clearing member access | **Yes** | **No** | `[unknown]` |
| Recovery | Re-subscribe with last sequence number; incremental download explicitly recommended | `10008` trades / `10026` orders, **per session, no wildcard** | `Retransmit-10008` with `PartitionID`, range by `ApplMsgID`/`ApplSeqNum` |
| Settlement-grade? | No explicit statement; no EOD marker | **No** — explicitly preliminary | **No** — explicitly preliminary |
| Tag | [verified] S1, S4 | [verified] S10, S12 | [verified] S6, S7, S8 |

### 1.5 What drop copy is actually for

`[uncertain]` — analyst inference, consistent with the facility descriptions above but not an exchange statement:

| Use | Why drop copy and not the interactive session |
|---|---|
| Real-time RMS / position keeping | Decouples the risk engine from the order-entry process; survives an OMS crash because the stream is a separate TCP session with its own sequence space. |
| Surveillance | Gives a firm-wide (Corporate Manager / `SubscriptionScope = 0`) view that no single dealer session has. |
| Intraday reconciliation | Independent second copy to diff against the OMS order book; catches silent message loss in the interactive path. |
| Algo / ASP oversight | A member whose order flow originates in a vendor or client algo still gets a member-level record it controls. |

Drop copy is **not** a substitute for the end-of-day trade file for settlement purposes `[uncertain]` — at MCX this is explicit (preliminary vs Trade Notification, above, `[verified]`); at NSE the FAQ's "no explicit end-of-day message" makes an EOD file reconciliation structurally necessary `[verified]` that the FAQ says so, `[uncertain]` as to the conclusion.

---

## 2. ORDER-STATE RECOVERY AFTER DISCONNECT

**No venue lets a member ask "what is the state of order X?".** All three say, in almost identical words, that the member owns its order state. This is the single most important architectural fact in this document.

| | NSE (NNF) | BSE (ETI) | MCX (ETI) |
|---|---|---|---|
| Can the member *ask* the exchange for the state of an order? | **No.** S2 General Guidelines: *"No host-end inquiries are permitted for NNF users."* | **No.** S10 §4.5.13: *"Order status inquiries are not supported by the Exchange Participants must maintain the state of orders based on the Execution Report (8) messages."* And §6.13: *"**There is no mechanism to fetch the current state of a particular order**"* | **No.** S7 §4.15: *"Order status inquiries are not supported by the Exchange Participants must maintain the state of orders based on the Execution Report (8) messages."* |
| Recovery mechanism | **Replay the message journal** — `DOWNLOAD_REQUEST (7000)` per stream | **Order book restatement** (push, **LF sessions only**) + application-level retransmission (pull) + a prescribed **cancel-probe** for unknown-state orders | **Order book restatement** (push) + **application-level retransmission** (pull) |
| Shape of recovery | Event log replay from a sequence number | Snapshot + selective replay + active probing | Snapshot of live orders at start-of-day / market reset, plus selective event retransmission |
| Tag | [verified] S2 | [verified] S10 | [verified] S7 |

### 2.1 NSE — journal / message download

S2 Chapter 10, "Recovering from disconnections", verbatim: *"If member system detects a loss of TCP connection with the exchange trading system, please perform the same operations for starting a fresh login given above."* There is **no session-resume**: the member re-runs Gateway Router Request → Gateway Router Response → Secure Box Registration → Box Sign On → SignOn In. `[verified]` S2

Authoritative state is then rebuilt with **Message Download** (NSE also calls it *journal download* in Chapters 11 and 12). Mechanics, all `[verified]` S2:

| Element | Detail |
|---|---|
| Request | `DOWNLOAD_REQUEST (7000)`, 48 bytes, carries `SequenceNumber` (DOUBLE) |
| Per-stream | *"NSE's trading system constitutes of multiple matching engines (streams)."* The total number of streams is in the first byte of the `AlphaChar` field of `SYSTEM_INFORMATION_OUT (1601)`; streams are numbered from 1. *"Message download request needs to be sent individually for a stream by the user."* The stream number goes in the first byte of `AlphaChar` of the request header; an invalid stream number ⇒ **the exchange drops the request silently**. |
| Sequence semantics | *"If the sequence number in the request is 0, then all messages for that stream will be sent. To get incremental download for any particular stream, the message download request must contain the last sequence number received from that stream."* `SequenceNumber` *"contains the time last message was received by the workstation. This can be obtained from the Time Stamp1 of the MESSAGE_HEADER."* |
| Response framing | `HEADER_RECORD (7011)` → one or more `MESSAGE_RECORD (7021)` (80–512 bytes; outer header says "part of message download", inner header gives the real transaction code) → `TRAILER_RECORD (7031)`. First byte of `AlphaChar` of header and trailer carries the stream number. |
| Loop discipline | *"Once download is completed for one stream, DOWNLOAD_REQUEST will be sent for the next stream with its corresponding sequence number. Request will be sent until message download gets completed for all the streams."* |
| Stream number vs order number | The first two digits of the `OrderNumber` returned in `ORDER_CONFIRMATION (2073)` contain a stream number which *"will be different from the stream number for Journal Download Request-Response"* — **do not** use the order-number prefix to pick a download stream. |

**What the journal contains** (S2's own list, `[verified]`): logon/logoff responses; interactive messages from NSE-Control; order entry / modification / cancellation responses; trade modification and cancellation responses; trade confirmation and stop-loss trigger; broadcast messages (security master change, change of market status, broadcast message string, turnover exceeded, broker reactivated, reference price broadcast); and the **contingency broadcast** message.

**Prescribed procedure — is there one?** Partly. `[verified]`: NSE prescribes the *mechanism* (fresh login + per-stream incremental journal download) and, for the two named failure classes below, prescribes **what the member must do**. There is **no** published "reconcile your order book this way" SOP in S2. `[unknown]`

**Stream outage (S2 Chapter 11, Exception Handling) — prescribed, verbatim:**
1. *"At the start of the outage message will be sent on broadcast channel with StreamNumber and status as 1 (start of outage) and members may get disconnected from the exchange (Member can also receive this message through journal download)."*
2. *"On receiving message in step 1, members should clear outstanding orders at their end for the respective streams. **Exchange would also cancel all the outstanding orders and no cancellation messages will be sent for these orders.**"*
3. *"Once exchange has restored the stream, message will be sent on broadcast channel with StreamNumber and status as 0 (end of outage)."*
4. *"On receiving the message in step 3, Members can reconnect to the exchange in case they have got disconnected in step 1."*

Carrier: `MS_BCAST_CONT_MESSAGE` / `BCAST_CONT_MSG (5294)`, 244 bytes, fields `StreamNumber` (0 = all streams impacted, else the impacted stream number) and `Status` (1 = start of outage, 0 = end of outage). `[verified]` S2

**DR switchover ("DR 45 Initiative", S2 Chapter 11) — prescribed, verbatim and consequential:**

| # | Rule | Tag |
|---|---|---|
| 1 | *"Members will have to reconnect to trading system, as they will be disconnected once the primary site is unavailable"* | [verified] |
| 2 | *"Member should continue to use existing connectivity parameter for connecting to NSE trading system at DR site"* | [verified] |
| 3 | On reconnecting at DR the member receives the start-of-outage message **as part of journal download** | [verified] |
| 4 | *"Exchange shall **not carry forward outstanding orders** from primary site to DR site and no cancellation messages will be sent for these orders. Accordingly members are advised to clear outstanding orders at their end."* | [verified] |
| 5–6 | *"Exchange shall publish streamwise trade number of the last trade (Exchange trade number) available at DR site. Member may note that **streamwise trades upto the last trade number shall only be considered**."* Broadcast as `MS_TRADER_INT_MSG`. | [verified] |
| 7 | Trade modification / cancellation is possible on trades available at DR | [verified] |
| 8 | End-of-outage message arrives live if connected, else via journal download post-reconnect | [verified] |
| 9 | *"**Journal download information before switchover shall not be available**"* | [verified] |
| 10 | *"Used limit value in User Order Value Limit (UOVL) and Branch Order Value Limit (BOVL) will be **reset to zero** after switchover to DR site."* | [verified] |

Rule 9 is the sharp edge: after a DR switchover the member **cannot** replay the pre-switchover journal, so the authoritative pre-switchover record is whatever the member itself persisted plus the published last-trade-number per stream. An OMS that treats the exchange journal as its system of record will be blind. `[uncertain]` (inference from `[verified]` rules 4, 5 and 9.)

### 2.2 MCX — order book restatement + retransmission

S7 §4.15 "Order Book Restatement", verbatim: *"During the start-of-day phase and after a market reset event, all active orders of a session will be transmitted to the market participant via the respective session. Initially a Trading Session Event message is sent informing the participant about start-of-day or a market reset event per partition respectively, optionally followed by Extended Order Information messages for each restated order of the corresponding session and finally a Trading Session Event message is sent indicating the end of the restatement per product."* `[verified]`

Restatement is itself recoverable: *"Order book restatement messages are recoverable. The owning session can request a retransmission in the event it was not logged on at the time. Order book restatement messages are also sent on the listener broadcast."* `[verified]` S7

Restated orders arrive as Execution Reports with `OrdStatus (39) = 0 New` or `1 Partially filled` and `ExecType (150) = D Restated`. `[verified]` S7 §4.14

**The destructive rule:** *"In case a session is cancelled by the member (disconnected from the ETI-Gateway) **all open non-persistent orders and quotes which were entered via this session will be deleted and will not be restated**."* `[verified]` S7 §4.15. Order persistence is therefore a design decision made **at order entry** via `ExecInst (18)`:

| Order class | `ExecInst (18)` / `ApplSeqIndicator (28703)` | Behaviour across interruption | Tag |
|---|---|---|---|
| **Persistent** | `ExecInst = H` (bitmap, first bit) | *"A persistent order is an order that survives a trading interruption… reinstated at the beginning of the Business Day (if valid for that Business Day) or after a Market Reset."* | [verified] S7 §4.4 |
| **Standard** | `ApplSeqIndicator = 1 (Recovery_Required)` | *"The complete order history of an order having this flag set will be part of the listener broadcast and may be recovered via retransmission requests. Standard orders are persistent."* | [verified] S7 §4.4 |
| **Non-persistent / Lean** | `ExecInst = Q` (bitmap, second bit), with `ApplSeqIndicator = 0 (No_Recovery_Required)` | *"Non persistent orders are automatically cancelled at the end of the business day or after a market reset."* Execution notifications can still be recovered via retransmission on the session data channel; *"All data on lean orders are visible only to the session that submitted the order."* | [verified] S7 §4.4 |

**Retransmission (S7 §4.23.10.1)** — the pull side. Requests use `Retransmit-10008` / `Retransmit Response-10009`, and for order events `Retransmit Response (Order Event)-10027`; `Gap Fill-10032` also exists. `PartitionID (5948)` is **mandatory** on every retransmission request *"Since application message identifiers and sequence numbers are unique per partition."* One broadcast type per request via `RefApplID (1355)`.

| Recoverable data | Scope | Sequencing field | `RefApplID` | Range fields | Tag |
|---|---|---|---|---|---|
| Recoverable session data | session | `ApplMsgID (28704)` | 4 | `ApplBegMsgID (28718)` / `ApplEndMsgID (28719)` | [verified] S7 |
| Listener broadcast (standard order drop copy) | session | `ApplMsgID (28704)` | 5 | `ApplBegMsgID` / `ApplEndMsgID` | [verified] S7 |
| Trades | business unit | `ApplSeqNum (1181)` | 1 | `ApplBegSeqNum (1182)` / `ApplEndSeqNum (1183)` | [verified] S7 |
| General Messages | market | `ApplSeqNum (1181)` | 2 | `ApplBegSeqNum` / `ApplEndSeqNum` | [verified] S7 |
| Trade Enhancement | session | `ApplSeqNum (1181)` | 1 | `ApplBegSeqNum` / `ApplEndSeqNum` | [verified] S7 |
| Ex/Dex | session | `ApplSeqNum (1181)` | 12 | `ApplBegSeqNum` / `ApplEndSeqNum` | [verified] S7 |

Omitted start value defaults to 1; omitted end value means "all available messages". The response reports the range actually recovered, *"This range may differ from the requested range, i.e. further retransmission requests may need to be submitted."* `[verified]` S7

**MCX's prescribed post-failure procedure (S7 §4.23.10.2) is explicit and should be implemented verbatim:** *"In case of an exchange system failure, the participant is informed of a market reset event via the Trading Session Event message including the last persisted application message identifier. This message is followed by an order book restatement of all active orders. In this event it is highly recommended to reconcile all Execution Reports (8) with higher application message identifiers with the corresponding Trade Capture Reports (AE). **If there is no Trade Capture Report (AE) for a given Execution Report (8) then this Execution Report (8) has to be considered invalid and should be discarded.**"* `[verified]`

The "last persisted application message identifier" is carried in `RefApplLastMsgID (28722)` of `Trading Session Event-10307`, documented as *"Last persisted application message identifier in case of a Market Reset event."* `[verified]` S7

### 2.3 BSE — restatement, and the only explicitly prescribed "unknown state" procedure in Indian market protocol documentation

BSE's §6.13 "Order Handling for Exception Cases" (S10) is the most operationally valuable passage located in this entire pass, because it is the only place where an Indian exchange tells a member **what to do when it does not know whether its order exists**. Verbatim, in sequence:

> *"In certain cases of disruption, the order request for addition/amendment/deletion is acknowledged with a standard Reject [TemplateID: 10010] having the `SessionRejectReason(373)=104` and error text as **"Result of Transaction Unknown"**. This case of Reject message is **not an actual rejection** of the order request. This is an auxiliary acknowledgment and not actual rejection of the order request."*

> *"Further, once the auxiliary acknowledgement is already sent to the user and later if the order request was processed successfully by matching engine after taking unduly high time, **the exchange does not send the actual confirmation of such orders again. It is expected the member applications to build a reconciliation mechanism for such orders.**"*

> *"Firstly, it is highly recommended that the member applications should **park such orders in freeze state and do not consider it as rejected order**. Further they should **not initiate any modification on such orders** till the actual state of the order is reconciled."*

> *"There is no mechanism to fetch the current state of a particular order thus the suggested mechanism would be that if such order is not traded and do not reflect in Trade notification message then it is likely that the order is either pending or cancelled. To ascertain that, **the member application can initiate a cancel request for such orders. If the cancellation goes through successfully then it would mean that the order was pending, and it is now cancelled completely** and thus the member can decide on placing same order again. **If the cancellation request is rejected with standard Reject message with error text as "Order not found" then it would mean that the order is not pending anymore.**"*

> *"However, if the order request is for addition and if such order is acknowledged with auxiliary response "Result of Transaction Unknown" then **the user will not have the OrderID(37) to initiate the cancel request. Thus in such cases the Client Order ID ClOrdId(11) can be used** to initiate the cancel request. While using ClOrdID(11), the user has to be careful about the original client order id `OrigClOrdID(41)` and `ClOrdID(11)`… `OrigClOrdID(41)` should be set to the value which was sent in `ClOrdID(11)` in the earlier request whose state is unknown. If this is not set correctly it would result in "Order not found" rejection even though the order may be present in the order book."*

> *"In addition to above method of reconciliation, an alternative mode of reconciliation would be from **RTRMS Zero Terminal**. The RTRMS Zero Terminal provides the view of pending orders and trades and member can reconcile the status of such order(s) from RTRMS Zero Terminal. This method can be adopted if the number of such orders are few."*

All `[verified]` S10 §6.13. **Three hard requirements fall out of this for the greenfield OMS** `[uncertain]` (inference, but tightly bound to the text):

1. The OMS must carry a **client-assigned `ClOrdID (11)` on every order** and must retain it, because after a "Result of Transaction Unknown" it is the *only* handle on the order — the exchange order ID does not exist yet on the member side.
2. The OMS must have an **"unknown" order state** distinct from both pending and rejected, must block modifications in that state, and must drive a cancel-probe to resolve it. This is a different state machine from NSE's (which has no equivalent) and from MCX's.
3. There must be a **manual fallback path** via the RTRMS Zero Terminal for small residues. A fully automated reconciliation design with no human escape hatch does not match what BSE itself recommends.

**Matching-engine reinitialisation** (S10 §6.13 part III, newly added in V1.6.15 per §9.12) — the second prescribed procedure, and it differs by session type:

> *"In certain cases of disruption in a partition, the matching engine of that partition is reinitialised. Consequently, all the orders of a HF Session are cancelled by the exchange… The scope of cancellation is all lean orders and standard orders. **The HF session should cancel all the orders belonging to the partition while LF sessions should cancel the lean orders and all standard orders (whose restatement is not received from exchange) only for the partition** for which the trading session event message is received."*

Message sequence, verbatim: *"Service Availability Message [TemplateID: 10030] → Trading Session Event [TemplateID: 10307] → Restatement Messages [TemplateID: 10117] → Trading Session Event [TemplateID: 10307]"*, with `Trading Session Event (1368) = 102: Market Reset` on the first and `= 103: End of Restatement` on the last. And the rule that catches naive implementations:

> *"**If a member application receives an End of Restatement event for a product without receiving any restated orders, it should interpret this as an indication that all standard orders for that product have been cancelled.** In such cases, the member application must remove all corresponding orders for that product from its local order book to ensure synchronization with the exchange."*

S10 §9.12 states the obligation plainly: *"Members are required to ensure that their applications handle these cancellation events correctly in accordance with the procedures described in this section."* `[verified]`

**Order book restatement is not available to every session.** S10 §4.15 footnote: *"Order Book Restatement is only provided for Low Frequency Sessions (LF), see chapter Session Concept."* The §5.1 capability table confirms Order Book Restatement **LF = Yes, HF = No**, along with Listener Broadcast, News and Session List Inquire all **HF = No**. `[verified]` S10

This is a structural decision point for the broker `[uncertain]`: an HF session buys throughput and gives up **every recovery facility BSE offers** — no restatement, no listener/order drop copy, no order retransmission (per S12), no session list inquire. A member running HF sessions must reconstruct state entirely from its own persisted log plus trade notifications, and on a matching-engine reinitialisation must simply **assume all its orders are gone**.

**Retransmission** (S10 §6.11.1) `[verified]`: *"Re-transmission is supported for recoverable session data and the broadcast types, trades, news, trade enhancement and risk control. Since application message identifiers and sequence numbers are unique per partition, the `PartitionID (5948)` is a mandatory parameter for all retransmission requests."* Omitted start value = 1, omitted end = infinity, and *"This range may differ from the requested range, i.e. further retransmission requests may need to be submitted."* Session data recoverability (§6.9): *"For standard orders the complete order history may be recovered. **For lean orders only match events in the session scope and unsolicited events may be recovered.** Session Data are recoverable, if and only if they have an `ApplMsgId (28704)`."*

**No automatic failover** (S10 §5.3.1/§5.3.2) `[verified]`: *"There will be no automatic session failover if a connection to the gateway is lost. **Participants should therefore implement a failover mechanism in their application**"* … *"If the active BSE ETI session is ever disconnected, for any reason, the participant application must reconnect to the Connection Gateway by resending the Gateway Request message, and then receive a new gateway assignment."*

**Orders die on disconnect** (S10 §5.5) `[verified]`: *"**Quotes and non-persistent orders are automatically cancelled on session disconnect**"* — notified via `Order Mass Cancellation Notification` with `MassActionReason (28721) = 6 = "Session Loss"`.

### 2.4 Establishing authoritative open-order state — synthesis

`[uncertain]` — this is the analyst's recommended procedure, assembled from the `[verified]` rules above. It is not published by any exchange as a single SOP.

| Step | NSE | BSE | MCX |
|---|---|---|---|
| 1 | Re-login (fresh Gateway Router → Box Sign On → SignOn In) | Fresh TLS 1.3 to Connection Gateway (`10020`) → new gateway assignment → `10053` with `MsgSeqNum = 1` → `10000` → `10018` | Fresh TCP + `Session Logon-10000` with `MsgSeqNum = 1` |
| 2 | Per stream, `DOWNLOAD_REQUEST (7000)` from last persisted `TimeStamp1` per stream; consume to `TRAILER_RECORD (7031)` | Consume `10030` → `10307` (`1368 = 102 Market Reset`) → `10117` restatements → `10307` (`103 End of Restatement`), **per product** | Consume `Trading Session Event-10307`; if `TradSesEvent = 102 Market Reset`, capture `RefApplLastMsgID` |
| 3 | Replay the journal against the local order book; the local book, not the exchange, is the system of record | **End of Restatement with no restated orders for a product ⇒ purge every standard order for that product locally.** Drop all lean orders. HF sessions: purge everything for the partition | Consume the restatement (`ExecType = D Restated`) to end-of-restatement; drop locally-held non-persistent orders |
| 4 | Check for `BCAST_CONT_MSG (5294)`: if a start-of-outage was seen, **purge** outstanding orders for that stream without waiting for cancellation messages | Retransmit `10026` (orders, LF only) and `10008` (trades) **per session, no wildcard**, with mandatory `PartitionID (5948)` | Retransmit listener (`RefApplID 5`) and trade (`RefApplID 1`) ranges per partition to close gaps |
| 5 | Reconcile fills against the EOD trade file before settlement | Discard any Execution Report (8) / Quote Execution Report (U8) with no matching Trade Capture Report (AE) | Discard any Execution Report above `RefApplLastMsgID` that has no matching Trade Capture Report (AE) |
| 6 | If DR switchover: assume **zero** open orders at the DR site; trust only trades up to the published streamwise last trade number; reset local UOVL/BOVL used-limit mirrors to zero | For any order left in "Result of Transaction Unknown": hold in a freeze state, do not modify, **send a cancel keyed on `OrigClOrdID (41)`** and read the outcome; residue to RTRMS Zero Terminal | — |

**Business-continuity adjunct, 2026:** SEBI discontinued the **IRRA** platform with immediate effect on 2026-05-07 (S9), superseding SEBI/HO/MIRSD/MIRSD-PoD-1/P/CIR/2022/177 of 2022-12-30. S9 names the surviving mechanism: *"Stock Exchanges provide an alternative contingency trading framework for the Stock brokers (i.e. **Contingency Pool Trading facility**). The Contingency Pool Trading facility is a mechanism offered by Stock Exchanges that allows Stock brokers to **square off outstanding open positions for their clients** during business disruptions. This facility operates via the exchange's internal network within its physical premises, where broker allocated dedicated terminals are seamlessly connected to the Stock Exchange trading platform."* S9 adds that exchanges *"may review the Contingency Pool Trading facility to strengthen its framework."* `[verified]` S9. The per-exchange operating rules of the Contingency Pool Trading facility were not retrieved in this pass — `[unknown]`.

---

## 3. SEQUENCE NUMBERS AND GAPS

| Property | NSE NNF (interactive) | NSE Drop Copy | MCX ETI (session layer) | MCX ETI (application layer) |
|---|---|---|---|---|
| Who sequences | Host end, **per user and per stream** | Host end, per user and per stream/partition | Participant, `MsgSeqNum (34)`, from 1 at Session Logon | Exchange, `ApplMsgID (28704)` or `ApplSeqNum (1181)` |
| Gap detectable by member | Yes, journal sequence is per stream | Yes — the document explicitly contemplates gaps | n/a (member owns the counter) | `ApplSeqNum`: **yes** — *"gapless and allows gap detection"*. `ApplMsgID`: **no** — *"Gap detection is not possible"* |
| On a gap | Re-request download for that stream from the last good sequence number | Re-subscribe with last received sequence number | Any gap, unexpected or duplicate `MsgSeqNum` ⇒ **reject + disconnect** | Issue a `Retransmit` for the range |
| Session restart required? | No — download is in-session | **Depends**: partition-level or full TCP disconnection ⇒ restart from Logon Request; a pure sequence gap ⇒ just re-subscribe | **Yes, always** | No |
| Tag | [verified] S2 | [verified] S4 | [verified] S7 | [verified] S7 |

**NSE interactive.** Continuity is the member's problem only in the sense that it must track the last `TimeStamp1` per stream to drive incremental download; there is no in-band "gap fill" request on the interactive order path, and there is no sequence-gap-triggered disconnect documented in S2. The FO protocol does carry a session-level error `e$seq_no_mismatch (17105)` "Sequence number mismatch" and `e$Invalid_box_id (17104)`, `sssssse$hearbeat_not_received (17102)` `[verified]` S3 — so a mismatch is an error condition on the secure-box channel, but S2/S3 do not describe a replay-on-gap facility for the interactive stream. `[verified]` that the codes exist; `[unknown]` the precise trigger semantics.

**NSE drop copy — exact wording** (S4 Chapter 5), `[verified]`: *"In case of any disconnection during market hours, it is recommended to make use of the **incremental download facility** by sending the last received sequence number in the subsequent subscription request. **It is advisable to not to initiate full download again.** In case of receipt of duplicate message sequence number the message may be dropped at user end. In case of gap in sequence number, request for Drop Copy subscription to be done by the User with last received sequence number. In case of **partition level TCP disconnection or complete disconnection across partitions, user will need to initiate from Logon Request**."*

**MCX session layer — zero tolerance** (S7 §4.23.6), verbatim: *"The MsgSeqNum (34) in the request header must increment with each message sent by the participant to the gateway, starting with the Session Logon message as sequence number 1… In case of any unexpected sequence numbers, sequence number gaps, or duplicate sequence numbers, the request message will be rejected with a sequence number error, and the session will be disconnected. **Note: There is no recovery mechanism for message sequence numbers in the MCX ETI. All participant connections (including a reconnection after a disconnection) are considered "new" and all Session Logon requests are expected to contain the message sequence number 1.**"* And §4.23: *"Retransmission is not supported on the session layer; it is available on the application layer for a subset of messages. It is not possible to retransmit all messages received on a session."* `[verified]`

`ApplMsgID (28704)` characteristics, verbatim S7 §4.23.7.1 `[verified]`: unique per partition and business day; ascending during a business day until end-of-stream; *"Gap detection is not possible"*; does not start at any particular number; 16 bytes, big-endian, comparable with `memcmp()`.

`ApplSeqNum (1181)` characteristics, verbatim S7 §4.23.7.2 `[verified]`: first message is 1; ascending until end-of-stream; *"The message sequence will be gapless and allows gap detection"*; unique per business day + partition + business unit for Trade Notification, per market for News, per business unit for Risk Control.

**Design consequence** `[uncertain]`: at MCX the member must build gap detection on `ApplSeqNum` streams (trades, news, risk) and **cannot** build it on `ApplMsgID` streams (session data, listener/drop copy). Recovery on the `ApplMsgID` streams is therefore range-based ("give me everything from my last known identifier onward"), not gap-based. A broker that assumes a dense counter on the listener stream will mis-detect loss.

**MCX session drop triggers** (S7 §4.23.3) `[verified]`: *"The MCX ETI will automatically drop a session if: The TCP/IP session is disconnected., If three consecutive heartbeats are missed, If reject/disconnect limit is exceeded."* Heartbeat interval: participant-specified in Session Logon, minimum **100 milliseconds** in production, upper limit **60 seconds**; heartbeats do not count against throttle counters; the system performs a **forced logout overnight**. If Session Logon fails, *"no further logon attempts will be accepted on that TCP connection. The application must drop the TCP session and restart the logon to the Connection Gateway."*

**NSE heartbeat and the drop counter** (S2 Chapter 10) `[verified]`: *"Heartbeat is to be sent only if there is inactivity for 30 seconds."* Transaction code `HEARTBEAT (23506)`, 40 bytes, echoed back by the exchange. *"Trading Host will consider the member system as inactive after missing two heartbeats in succession and disconnect the socket connection. If a member sends more than one heartbeat message within the same interval, the exchange will disregard the extra messages and increase the drop counter by 1 for every additional heartbeat message received… If the drop counter reaches the threshold value set by the exchange, the member connection will be disconnected… The exchange will also logoff the box id of the member, which means that **all the users linked to that box id will be disconnected**. The drop counter will be reset to zero for the respective box id after every disconnection."* Connection termination is announced with `BOX_SIGN_OFF (20322)`. The drop-counter **threshold value is not published** — `[unknown]`.

This is a real operational trap `[uncertain]`: an over-eager heartbeat timer in the member's adapter does not merely waste bandwidth, it eventually disconnects **every user on the box**.

---

## 4. QUANTITY FREEZE AND PRICE FREEZE

**The shape of the thing (NSE):** a freeze is **not** a rejection and **not** an acceptance. The order is sent to the exchange, the exchange holds it pending manual approval by NSE-Control, and the member is told the order is in limbo by a distinct transaction code. The order is in a third state that the broker's OMS, client-facing UI and RMS must all be able to represent.

### 4.1 NSE — the freeze state machine

| Step | Message / code | Detail | Tag |
|---|---|---|---|
| Order triggers a freeze | — | FO: *"The order will go for a freeze if the quantity is greater than the freeze quantity determined by NSE-Control."* | [verified] S3 |
| Member is told it is pending | `FREEZE_TO_CONTROL (2170)` | CM: *"Order freeze response is generated when the order placed by the trader or the order after modification is awaiting approval from the exchange. This response is not expected for Auction Orders."* | [verified] S2, S3 |
| Which kind of freeze | `ReasonCode` in the order structure | **`17` = Price Freeze, `18` = Quantity Freeze.** FO: *"Reason code '18' denotes Quantity freeze and reason code '17' denotes Price freeze."* | [verified] S2 (Appendix "Reason Codes"), S3 |
| Order flag | `Frozen` bit in Order Terms | *"If set to 1, represents the order has gone for a freeze"* (output-only) | [verified] S2 |
| Exchange **approves** | `ORDER_CONFIRMATION (2073)` if the freeze arose on order entry; `ORDER_MOD_CONFIRMATION (2074)` if it arose on modification — **both delivered as unsolicited messages** | *"This message is sent when a previous order, which resulted in freeze, is approved by the Exchange."* CM also notes the confirmation carries `LastModifiedDateTime` and `LastActivityReference`. | [verified] S2 Ch.5 |
| Exchange **rejects** | `ORDER_ERROR_OUT (2231)` if the freeze arose on entry; `ORDER_MOD_REJECT_OUT (2042)` if on modification — unsolicited | *"This message is sent when a previous order, which resulted in freeze, is rejected by the Exchange."* | [verified] S2 Ch.5 |
| Telling approval apart from a normal confirmation | `ReasonCode` on the confirmation | FO: *"Reason code '17' or '18' denotes freeze approved/rejected. Reason code '0' denotes normal confirmation."* | [verified] S3 |
| If the freeze is rejected as a cancellation | `OE_QTY_FREEZE_CAN (16307)` *"The order has been cancelled due to quantity freeze."*; `OE_PRICE_FREEZE_CAN (16308)` *"The order has been cancelled due to price freeze."* | FO error-code appendix | [verified] S3 |

### 4.2 Member obligations at protocol level

| Obligation | Source | Tag |
|---|---|---|
| **A frozen order cannot be modified.** S2's "Rules of Order Modification" lists *"Modifying Frozen orders"* among modifications that are **not allowed**. | S2 Ch.4 | [verified] |
| The freeze decision arrives **unsolicited and asynchronously** — the OMS must accept `2073`/`2074`/`2231`/`2042` with no outstanding request of its own, and must correlate by `OrderNumber`. | S2 Ch.5 | [verified] |
| Freeze events are replayed in the journal (`MESSAGE_RECORD (7021)` inner data includes Chapter 5 unsolicited messages), so a member disconnected across the approval window recovers the outcome via `DOWNLOAD_REQUEST (7000)`. | S2 Ch.3 | [verified] |
| `FREEZE_TO_CONTROL (2170)` is in the **Order & Trade Drop Copy** payload, so a drop-copy-fed RMS also sees the pending state. | S4 | [verified] |
| **Freeze orders are excluded from the kill switch's reach only by implication** — S2 does not say the kill switch cancels pending-freeze orders. `[unknown]`; must be tested in UAT. | — | [unknown] |

### 4.3 Where freeze limits are published

| Venue | Vehicle | Field | Tag |
|---|---|---|---|
| NSE CM | Security master, `STOCK_STRUCTURE` (322 bytes) in the Update Local Database / security download | `FreezeQuantity` (LONG, offset 125) — *"Freeze quantity."* Also `WarningQuantity` (offset 130) | [verified] S2 |
| NSE CM | Intraday security-master change broadcast | `BCAST_SECURITY_MSTR_CHG (7305)` carries the updated master; in the FO structure `MS_SECURITY_UPDATE_INFO` (298 bytes) `FreezeQuantity` sits at offset 88 | [verified] S2, S3 |
| NSE FO | Security master | `FreezeQuantity` (LONG, offset 88); `VolumeFreezePercent` (SHORT, offset 81) — *"This field contains the volume freeze percent."* | [verified] S3 |
| BSE / MCX | see §4.4 and Gaps | — | — |

The practical point for a greenfield broker `[uncertain]`: freeze quantity is a **per-security, intraday-mutable** parameter delivered on the same channel as the rest of the security master, and it changes via `BCAST_SECURITY_MSTR_CHG (7305)` during the day. A pre-trade check built on a start-of-day snapshot will drift. MCX ETI, by contrast, contains **no** freeze concept at all — a text search of S7 for "freeze"/"frozen" returns nothing `[verified]` S7 — so the commodity order path has no equivalent third state.

<!-- MERGE-ANCHOR-4: freeze limit publication files, exchange obligations, client-communication circulars -->

### 4.4 The client-communication problem

`[uncertain]` — analyst analysis; no exchange or SEBI text on this specific point was located in this pass.

A frozen order is an order the client has placed, that the exchange has acknowledged, that is not live in the book, that cannot be modified, and whose fate is a human decision at the exchange with **no published service-level time limit** (`[unknown]`). Three consequences:

1. **UI state.** "Pending" is not enough; the order is neither open nor rejected. A distinct terminal state ("awaiting exchange approval — quantity freeze") is required, or clients will re-punch and double up.
2. **Margin and limits.** The order consumes the client's limit while frozen, but it is not in the order book, so it cannot be cancelled to release the limit. The RMS must decide whether to block the exposure or release it, and the choice is visible to the client.
3. **Audit.** Because approval arrives unsolicited, possibly after the member reconnected, the order's audit trail must stitch a `2170` to a later `2073`/`2231` that may have arrived through a journal replay rather than live. The `LastActivityReference` (nanosecond unique value) on the confirmation is the field designed for this `[verified]` S2.

---

## 5. SELF-TRADE PREVENTION

**Headline: it is exchange-side at both NSE and MCX, but at NSE the member chooses which leg dies.** This is the opposite of the common assumption that self-trade prevention is purely a broker-side control.

### 5.1 NSE — the `STPC` order flag

NSE exposes a **member-settable bit** in the order flags called `STPC`. S2's order-flags table, verbatim:

> `STPC` — Input
> • *"If set to 0, represents order resulting in self-trade to be cancelled as per **default action by the exchange**."*
> • *"If set to 1, represents **active order** resulting in self-trade to be cancelled."*
> • *"Order modification will be rejected if this bit is modified. In case of triggered stop loss order, bit selected during order entry will be considered"*

`[verified]` S2 (CM, Order Flags) and S3 (FO), where the FO table reads *"STPC 0 — Cancel order resulting in self trade as per default action by the exchange"* / *"STPC 1 — Cancel active order resulting in self trade"*, with the note *"STPC bit can be set for RL, 2L, 3L, Spread, SL transcodes. STPC bit in the modification transcodes should be same as set in the original order else the modification request will be [rejected]."*

| Fact | Detail | Tag |
|---|---|---|
| Side | **Exchange-side** — the matching engine refuses the match and cancels a leg. The member does not have to detect the crossing. | [verified] S2, S3 |
| Member control | The `STPC` bit, set per order, chooses between the exchange's default action and "cancel the active (aggressing) order". | [verified] S2, S3 |
| Immutability | `STPC` cannot be changed by modification; a modification that changes it is rejected. For a triggered stop-loss, the bit as set at entry governs. | [verified] S2, S3 |
| What the member is told | FO error code `e$order_cancelled_for_self_trade (17071)` — *"The order could have resulted in self trade"* | [verified] S3 |
| What the exchange's "default action" actually is | **Not stated in S2 or S3.** `[unknown]` — must be obtained from NSE before relying on `STPC = 0`. | [unknown] |
| Identity used for the self-trade test | **Not stated in S2 or S3.** See §5.3. | [unknown] from protocol |

### 5.2 MCX — `SMPF`

S7 §4.10 "SMPF Self-Match Prevention Functionality", verbatim: *"Self-Match refers to trades where both buyer and seller clients are same. Such Self-Match does not server any economic purpose of Members/Clients instead Members have to incur additional expenses like Transaction charges, CTT, etc. **Buy and Sell orders having the same PAN (belonging to member and/or UCC) are considered as self-match orders and will not be matched with each other.** Self-match prevention refers to a mechanism by which Exchange restricts execution of self-match trades whereby when an active order gets potentially matched with a passive order resulting in Self-Match Trade. User needs to refer the Extended Order Information (10117) message for SMPF cancellation. **System cancels the active or passive order as per SMPF order identifier received with order** instead of executing the self-match trade."* `[verified]`

| Fact | MCX | Tag |
|---|---|---|
| Side | Exchange-side (`SMPF`) | [verified] S7 |
| Identity | **PAN**, belonging to member and/or UCC | [verified] S7 |
| Which leg dies | Active **or** passive, "as per SMPF order identifier received with order" — i.e. the member elects, as at NSE | [verified] S7 |
| Notification | `Extended Order Information (10117)` | [verified] S7 |
| Order-status encoding | §4.14 lists *"Cancellation due to Self-Match Prevention (SMP)"* ⇒ `OrdStatus (39) = 4 Cancelled`, `ExecType (150) = 4 Cancelled` | [verified] S7 |

Note the asymmetry worth designing for `[uncertain]`: a prevented self-trade is reported through the **ordinary cancellation path** (`OrdStatus 4` / `ExecType 4` at MCX; a cancellation plus error `17071` at NSE). Without decoding the reason, a broker's OMS will log it as a plain cancellation and the client will see an unexplained disappearance.

<!-- MERGE-ANCHOR-5: NSE/BSE self-trade regime at circular level, identity (PAN/UCC), penalty and surveillance consequence -->

---

## 6. ORDER AND TRADE MODIFICATION

### 6.1 What the protocols permit

| Venue | Trade modification scope | Verbatim | Tag |
|---|---|---|---|
| NSE CM | **Client account number only** | *"This functionality provides facility to traders to modify the trades. **Only account number modification is allowed.**"* Not allowed: modifying trade quantity; modifying Pro/Cli field; modifying Participant field; BM modifying CM's trades; DL modifying BM's trades; DL modifying CM's trades; modifying non-existing trade; **modifying Auction trades**. | [verified] S2 |
| NSE FO | **Client account number only** | *"Trade Modification is a facility provided by NSE to allow users to change client account number of executed trades. Trade modification functionality will be available to the member **irrespective of trade's Give up approval/rejection status**."* | [verified] S3 |
| MCX | **Account information only** | `Trade Modification Request-8005`: *"The Trade Modify Instruction Request message provides the ability to request the change in **Account Information** for an already executed trade."* | [verified] S7 |

Messages:

| Venue | Request | Confirmation | Error / reject | Tag |
|---|---|---|---|---|
| NSE CM/FO | `TRADE_MOD_IN (5445)` on `TRADE_INQUIRY_DATA` (CM 210 bytes / FO `MS_TRADE_INQ_DATA` 234 bytes) | `TRADE_MODIFY_CONFIRM (2287)` on `MS_TRADE_CONFIRM`; `LogTime` carries the latest modified time | `CTRL_MSG_TO_TRADER (5295)` with an error code | [verified] S2, S3 |
| NSE FO (unsolicited set) | — | Chapter 7 lists *"Trade Modification Requested Notification / Trade Modification Confirmation Response / Trade Modification Rejection Response"* as **unsolicited** messages | — | [verified] S3 |
| MCX | `8005` | `Trade Modification Response – 8010`; also `Trade Modification Notification`; plus `Resubmit for Approval Request (8500)` / `Resubmit for Approval Confirmation (8510)` sent to the *"Order and Quote Management"* service | — | [verified] S7 |

**Trade cancellation is a two-sided, exchange-adjudicated act at NSE** (`[verified]` S2): *"To cancel a trade, both the parties of the trade must request for trade cancellation. As soon as the request reaches the trading system, a requested message is sent… Otherwise, it goes to the NSE-Control as an alert. The counter party to the trade is notified of the trade cancellation request… When both the parties of the trade ask for trade cancellation, it may be approved or rejected by the Exchange."* Codes: `TRADE_CANCEL_IN (5440)` → `TRADE_CANCEL_OUT (5441)` ack → `TRADE_CANCEL_CONFIRM (2282)` or `TRADE_CANCEL_REJECT (2286)`; data errors return `TRADE_ERROR (2223)`.

### 6.2 Member-side entitlement controls (NSE, CM-BM functionalities)

These are the levers a compliance function actually uses, and they are protocol-level, not portal-level `[verified]` S2 Chapter 12:

| Control | Request code | Values | Note |
|---|---|---|---|
| Trade Modification Status per user | `User TRD-MOD Status Update Request` | — | *"Corporate manager can enable/disable Trade Modification Status for the users… If Trade Modification status for user is enabled, then user will be allowed to [modify trades]"* |
| Trade Cancellation Status per user | `User TRD-CXL Status Update Request` | — | same pattern |
| Cancel On Logout (COL) per user | `COL_USER_STATUS_CHANGE_IN (5790)`, `COL_USER_STATUS_CHANGE_REQ` 52 bytes | `ColoUserBit` `'0'` disable / `'1'` enable | *"This functionality if enabled provides facility to traders to cancel all their outstanding orders when user logs off… **COL functionality is not available during preopen session and after CTS close (for CAS eligible securities).**"* |
| Kill switch (all orders, or all orders in one security) | `KILL_SWITCH_IN (2062)` → response `QUICK_CANCEL_OUT (2061)`; errors as `ORDER_ERROR (2231)` | Blank Symbol+Series = everything | *"Kill switch is not allowed during preopen session. For CAS eligible securities, kill switch is restricted after CTS close `BC_CTS_CLOSE_FOR_CAS (6651)`."* Also available at **member level** and **user level** (separate requests). |

MCX's equivalent is `Order Mass Cancellation Request-10120` → `Order Mass Cancellation Response-10121`, with `Order Mass Cancellation Response No Hits-10124` when nothing matched: *"a user can cancel all orders within a specified instrument, user or session scope using single request to exchange. The instrument scope can be extended to an entire product."* `[verified]` S7 §4.11

### 6.3 Order modification and price-time priority

| | NSE CM | MCX |
|---|---|---|
| Cannot be modified | Buy↔Sell; Symbol and Series; Participant field; Pro/Cli field; **Frozen orders**; BM modifying CM's orders; DL modifying BM's or CM's orders; non-existent order; inquiry user; a modification that would breach the branch order value limit | Security identification (`MarketSegmentID`, `SimpleSecurityID`, `SecurityID`, `ProductComplex`); `Side (54)`; `TradingSessionSubID (625)`; `ExecInst (18)`; `ApplSeqIndicator (28703)`; persistent↔non-persistent; **completely filled orders** |
| Loses time priority | Price change (always); quantity **increase** (always, decrease never); DQ change that increases disclosed quantity or crosses DQ↔non-DQ with an increase; MF↔AON change; SL limit/trigger change; **quantity change on an ATO or Market order, in either direction** | `Price (44)` modified in any way; `OrderQty (38)` increased; `OrdType (40)` changed; `ExecType (150) = L "Triggered by system"` |
| Retains time priority | Quantity reduction; Day↔non-Day; GTC/GTD changes; Remarks | — |
| `OrdType` transition rules | Per "Rules of Order Modification" | Limit→Market only; Stop(Market)→Stop(Limit)/Limit/Market; Stop(Limit)→Stop(Market)/Limit/Market |
| Tag | [verified] S2 | [verified] S7 §4.7 |

MCX quantity modification semantics are worth lifting verbatim because they differ from a naive "delta" model `[verified]` S7 §4.9: *"Participants need to specify the **new total order quantity** when modifying the field OrderQty (38)… The previously executed quantity of an order is maintained and is used to calculate the new open quantity. **If this is zero or less, then the order will be cancelled.**"* With the invariants `OrderQty (38) = CumQty (14) + LeavesQty (151)` while live, and `OrderQty (38) = CumQty (14) + CxlQty (84)` once cancelled.

<!-- MERGE-ANCHOR-6: trade modification window clock times per exchange, client-code modification reason codes and error-account regime, modification-volume monitoring and penalties, OTR framework -->

---

## 7. PARTIAL FILLS, VALIDITY AND CARRY-FORWARD (INCLUDING CAS)

### 7.1 Validity terms

| Term | NSE CM (verbatim) | MCX (`TimeInForce (59)`) | Tag |
|---|---|---|---|
| Day | *"This is the default term for an order. **At the end of the trading day, all outstanding Day orders are cancelled by the system.**"* | `59 = 0`; *"The validity of a day order ends at the close of that trading period for the Business day."* | [verified] S2, S7 |
| **End-of-session** | not available | `59 = 7`; *"The validity of a session order ends at the close of that trading session for the business day."* — **MCX-only; NSE has no equivalent** | [verified] S7 |
| IOC | *"This term forces the order to match immediately, else be cancelled. **If the order trades partially, the remaining part is cancelled.**"* | `59 = 3`; *"an IOC order is to be filled immediately, either completely or to the extent possible; the portion that cannot be filled immediately is cancelled. DQ is not allowed for TimeInForce IOC orders."* | [verified] S2, S7 |
| GTD | *"allows the dealer to keep an order in the system for a certain number of days… Each day is a calendar day. **This facility is disabled as of now.**"* | not described in S7 | [verified] S2 |
| GTC | *"allows the broker to keep an order in the system until it is canceled… **This facility is disabled as of now.**"* | not described in S7 | [verified] S2 |
| MF / AON | Minimum Fill: traded quantity at least the MF amount, multiples of market lot, less than order quantity; MF ≤ DQ when both set. AON: entire order trades or nothing. | — | [verified] S2 |

**Prohibited combinations at order entry (NSE CM "Rules of Order Entry")** `[verified]` S2, relevant to validity handling: *"GTC/GTD days more than specified days"*; *"Spot orders with GTC/GTD"*; *"Auction orders with GTC/GTD/IOC"*; *"IOC and Disclosed Quantity combination"*; *"Difference between limit price and trigger price in stop loss limit orders is greater than permissible range."*

### 7.2 Partial fills

| Aspect | NSE | MCX | Tag |
|---|---|---|---|
| Partial-fill reporting | `TRADE_CONFIRMATION (2222)`; *"The order may trade completely or partially."* Order-level running total in `VolumeFilledToday` (*"the total quantity traded in a day… should be set to '0' while sending order entry request"*) and remaining in `Volume`/`VolumeOriginal` | `OrdStatus (39) = 1 Partially filled`, `ExecType (150) = F Trade`; `CumQty (14)` / `LeavesQty (151)` | [verified] S2, S3, S7 |
| One report per match **event** | — | *"Every match event with one or more executions (match steps) in a simple or complex instrument result in only **one** Execution Report (8) for each order respectively. A Trade Notification will then be sent to confirm **each trade at each price level**."* | [verified] S7 §4.16.2 |
| Reconciliation keys | `OrderNumber`, `FillNumber`, `LastActivityReference` (nanoseconds) | `FillMatchID (28708)` ↔ `TrdMatchID (880)`; `FillExecID (1363)` ↔ `SideTradeID (1506)`; `LegExecID (28725)` ↔ `SideTradeID (1506)` for complex instruments; `TradeID (1003)` / `OrigTradeID (1126)` for all leg allocations of one match event | [verified] S2, S7 |
| Partially filled order at close | Cancelled with the rest of the Day orders — see §7.3 | Day order validity ends at close of the trading period | [verified] S2, S7 |

### 7.3 End-of-day batch cancellation at NSE

`BATCH_ORDER_CANCEL (9002)` is an **unsolicited** message delivered on `ORDER_ENTRY_REQUEST`. S2 Chapter 5 verbatim: *"GTC\GTD orders which are valid till date, if not traded, are also removed from the book. A response for the same is sent to the user. As of now GTC and GTD facilities are not allowed hence there will be GTC and GTD orders."* — the last clause reads as a typographical error in the published document (it is inconsistent with the same document's statement that GTC and GTD are *"disabled as of now"*); quote it with care. `[verified]` that this is the published wording; `[uncertain]` as to intended meaning.

The authoritative statement of the semantic is in S2's order-activity enumeration: `ACTIVITY_BATCH_ORDER_CANCEL` (value 8) — *"At the end of the day, all untraded Day orders are cancelled. GTC/GTD orders due for cancellation are also cancelled."* `[verified]` S2. `BATCH_ORDER_CANCEL (9002)` is also in the **Order & Trade Drop Copy** payload `[verified]` S4.

### 7.4 Closing Auction Session (CAS) — effect on order handling and carry-forward

CAS is already in the live NSE CM protocol. The revision history of S2 records *"**6.5** — Updated order details description for Closing Auction session"*, *"**6.6** — Updated for Alignment of the Pre-Open Auction Session with CAS"*, and an *"Added new transcode and structure for CAS reference price"* entry; the abbreviation list defines **"CAS — Closing Auction Session"**. `[verified]` S2

**Order types and terms permitted in CAS** `[verified]` S2: *"Closing Auction orders are Regular lot orders to be placed only on **CAS eligible securities** when normal market is in closing auction. **Only limit orders and market orders are allowed in CAS.** None of the following terms are attached: DQ, All or None, Minimum Fill and Trigger Price."* A market order entered during CAS has the **`ATO`** bit set and is priced at `0`; the `ATO` flag description reads *"If set to 1, represents Market order in PREOPEN or CALL AUCTION1 or CALL AUCTION 2 or CAS."* `[verified]` S2

**Carry-forward — the key sentence** `[verified]` S2: *"Unmatched limit orders of CTS (Continuous Trading Session) are **cancelled or carried forward to the CAS** without any change in time priority for CAS eligible securities."*

That disjunction ("cancelled **or** carried forward") is not resolved in the protocol document — the protocol describes both outcomes and the broker's OMS must handle both. Which applies in which case is `[unknown]` from S2 and must come from the NSE CAS implementation circular. For comparison, the pre-open carry-forward rules **are** stated unambiguously in the same document `[verified]` S2:

| Session | Unmatched order treatment | Tag |
|---|---|---|
| Pre-open → Normal (general) | *"Unmatched ATO/ Limit Pre-open orders are carried forward to the Normal Market without any change in time priority. For unmatched ATO orders which are carried forward, **derived price will be assigned, response for these orders will be sent to traders as 'Unsolicited' modification response**."* | [verified] |
| Pre-open → Normal (IPO / relisting) | *"Unmatched Limit Pre-open orders are cancelled **or** carried forward to the Normal Market without any change in time priority for IPO/Relisting securities."* | [verified] |
| Pre-open → next session (illiquid) | *"Unmatched limit Pre-open orders are carried forward to the next session without any change in time priority for illiquid securities"* | [verified] |
| CTS → CAS (CAS eligible) | *"cancelled or carried forward to the CAS without any change in time priority"* | [verified] |
| **End of CAS** | *"After order collection period in CAS, the Closing Auction matching will be done. Once matching is completed, **all pending unmatched orders will get cancelled by the system**, the transcode `ORDER_CANCEL_CONFIRMATION (2075)` will be sent."* | [verified] |
| End of call auction generally | *"In after order collection period, the call auction order matching will be done. Once matching is completed the **IOC orders** which were not traded will get cancelled by the system, the transcode `ORDER_CANCEL_CONFIRMATION (2075)` will be sent."* | [verified] |
| Circuit hit | *"In case of circuit hit, if Order collection phase is planned, orders related to normal market which were not traded will get cancelled by the system, the transcode `ORDER_CANCEL_CONFIRMATION (2075)` will be sent."* | [verified] |

**Exchange-initiated cancellation is flagged, and the flags matter.** On `ORDER_CANCEL_CONFIRMATION (2075)` and `ORDER_CANCEL_REJECT (2072)` `[verified]` S2:

- `ModCxlBy` is *"Set to 'C' when below types of unmatched orders cancelled by Exchange: Preopen / Call Auction 2 / **Closing Auction**"* (`'C'` = Exchange; the other values are `'T'` Trader, `'B'` Branch Manager, `'M'` Corporate Manager).
- The `Preopen` bit in `Order_Flags` is set to 1 in the cancellation response for: Preopen; *"Preopen orders carried forwarded to normal open"*; Call Auction 2; *"Call Auction 2 orders carried forwarded to normal open (IPO/Relist)"*; **Closing Auction**. It is 0 for a normal-market-open order cancellation.

So a broker can distinguish "the exchange flushed my CAS book" from "my dealer cancelled" from the two fields together — and must, or end-of-day order-state reporting will mis-attribute cancellations. `[uncertain]` (inference from `[verified]` field semantics.)

**Restrictions during CAS** `[verified]` S2:

| Restriction | Wording |
|---|---|
| Market-order modification/cancellation | *"Order modifications/cancellations for market orders will not be allowed during CAS/Preopen Market order restriction period."* |
| Market-order cancellation | *"The trader cannot cancel market order of CAS eligible token during CAS Market order restriction period."* |
| Kill switch | *"Kill switch is not allowed during preopen session. For CAS eligible securities, kill switch is restricted after CTS close `BC_CTS_CLOSE_FOR_CAS (6651)`."* |
| Cancel On Logout | *"COL functionality is not available during preopen session and **after CTS close (for CAS eligible securities)**."* |

These four together are the real operational bite of CAS for a broker `[uncertain]`: between `BC_CTS_CLOSE_FOR_CAS (6651)` and `BC_CAS_END (6655)` the broker's two emergency levers — kill switch and cancel-on-logout — are **unavailable for CAS-eligible securities**, and market orders already in the CAS book cannot be pulled during the market-order restriction period. Any risk-reduction runbook that assumes "we can always flatten the order book" must carve out this window.

**CAS market data** `[verified]` S2: `BCAST_CAS_REF_PRICE (7338)` / `BCAST_CAS_REF_PRICE` structure (442 bytes, up to 20 `TOKEN_AND_REFPRICE` records of `SEC_INFO` + `Token` + `ReferencePrice`) — *"This message is sent for CAS-enabled securities at the conclusion of the continuous trading session and prior to the commencement of the CAS session for those securities."* During CAS, `IndicativeImbalanceQty` *"is applicable during Closing Auction Session for CAS eligible security only"* and carries the indicative imbalance quantity at the equilibrium price; the indicative equilibrium price of CAS is carried in the MBP broadcast, and *"During the Closing Auction Session (CAS) and preopen session, the indicative imbalance quantity for market orders can be derived using the MBPInformation available in the `BCAST_ONLY_MBP (7208)` message… The quantity field at the ATO price point within the MBPInformation structure should be referred to for this calculation."*

<!-- MERGE-ANCHOR-7: SEBI CAS circular number/date/effective date, eligible securities, session timings and phases, pre-open modifications; NSE/BSE implementation circulars; resolution of the "cancelled or carried forward" disjunction -->

---

## 8. UNSOLICITED AND ADMINISTRATIVE MESSAGES

Both NSE and MCX devote a dedicated chapter to messages that arrive with no request outstanding. An OMS that is structured as request/response with a correlation map **will drop these**, and every one of them changes order or session state.

### 8.1 NSE — the unsolicited set

S2 Chapter 5 introduction: *"This section details the unsolicited messages that are received on the interactive connection. These messages are not received by the users in response to any request."* S2 also warns, twice: *"Please note this section is referenced in CM_DROP_COPY_PROTOCOL document. Any change here may also impact the Order Drop Copy functionality."* `[verified]`

| Message | Code | Trigger | What the member must do | Tag |
|---|---|---|---|---|
| Cancellation of Orders in Batch | `BATCH_ORDER_CANCEL (9002)` | End of day: untraded Day orders, and GTC/GTD due for cancellation | Flush the local day book; do not expect per-order cancellations | [verified] S2 |
| Stop Loss Order Triggering | `ON_STOP_NOTIFICATION (2212)` (on `TRADE_CONFIRM` layout) | A stop-loss order triggers | Move the order from the stop book to the regular book locally; note that `STPC` as set at entry governs the triggered order | [verified] S2 |
| Freeze Approve | `ORDER_CONFIRMATION (2073)` / `ORDER_MOD_CONFIRMATION (2074)` | NSE-Control approves a frozen order | Transition the order from "pending freeze" to live; correlate by `OrderNumber` + `LastActivityReference` | [verified] S2 |
| Freeze Reject | `ORDER_ERROR_OUT (2231)` / `ORDER_MOD_REJECT_OUT (2042)` | NSE-Control rejects a frozen order | Terminate the order; release limits; tell the client | [verified] S2 |
| Trade Confirmation | `TRADE_CONFIRMATION (2222)`, `MS_TRADE_CONFIRM` 228 bytes | Any fill | Apply the fill. The `ST_ORDER_FLAGS` `Preopen` indicator is set to 1 for trades in the **Call Auction 2** session | [verified] S2 |
| Order Cancellation Confirmation **by the exchange** | `ORDER_CANCEL_CONFIRMATION (2075)` | *"This will be an 'Unsolicited Message' if **NSE-Control cancels the order**."* Also end-of-auction flush, CAS flush, circuit-hit flush | Cancel locally; read `ModCxlBy = 'C'` and the `Preopen` flag to attribute the cancellation | [verified] S2 |
| Unsolicited **modification** | `ORDER_MOD_CONFIRMATION (2074)` | Freeze approval on a modified order; and carried-forward unmatched ATO pre-open orders, which get a derived price and *"response for these orders will be sent to traders as 'Unsolicited' modification response"* | Accept a price change the member never requested | [verified] S2 |
| Trade Cancellation (three forms) | Requested Notification; `TRADE_CANCEL_CONFIRM (2282)`; `TRADE_CANCEL_REJECT (2286)` | Counterparty requests cancellation of a trade you are party to; exchange approves or rejects | Reverse the trade in the trade book; adjust positions and client obligations | [verified] S2 |
| Interactive / broadcast message from NSE-Control | `MS_TRADER_INT_MSG`, `CTRL_MSG_TO_TRADER (5295)` | Any exchange-to-trader message, including trade-modification errors and the DR streamwise last-trade-number publication | Log and surface to the dealing desk; parse the DR last-trade-number case | [verified] S2 |
| Contingency broadcast | `BCAST_CONT_MSG (5294)`, `MS_BCAST_CONT_MESSAGE` 244 bytes | Stream outage start/end | Purge outstanding orders for the stream on `Status = 1`; reconnect on `Status = 0` | [verified] S2 |

### 8.2 NSE — session and market state broadcasts

All of the following share the `BCAST_VCT_MESSAGES` structure (298 bytes) and carry `SEC_INFO`, `MarketType` (`'1'` Normal / `'2'` Odd Lot / `'3'` Spot), a `BROADCAST_DESTINATION` structure and a 240-byte free-text `BroadcastMessage`. `[verified]` S2

| Code | Name | NSE's own description |
|---|---|---|
| 6531 | `BC_PREOPEN_SHUTDOWN_MSG` | *"sent when the market is preopened"* |
| 6664 | `BC_PREOPEN_MARKET_ORDER_RESTRICTED` | *"sent when market orders restriction starts during preopen session"* |
| 6571 | `BC_NORMAL_MKT_PREOPEN_ENDED` | *"sent when the preopen period ends"* |
| 6511 | `BC_OPEN_MESSAGE` | *"sent when the market is opened"* |
| **6651** | `BC_CTS_CLOSE_FOR_CAS` | *"sent when normal market has closed for securities participating in closing auction session"* |
| 6652 | `BC_REVISED_PRICE_BAND_COMPLETED` | *"sent when price band of securities revised for Closing Auction Session"* |
| **6653** | `BC_CAS_START` | *"sent when closing auction session has started"* |
| 6654 | `BC_MARKET_ORDER_RESTRICTED` | *"sent when market orders restriction starts during closing auction session"* |
| **6655** | `BC_CAS_END` | *"sent when closing auction session has ended"* |
| 6521 | `BC_CLOSE_MESSAGE` | *"sent when the market is closed"* |
| 6583 | `BC_CLOSING_START` | *"sent when closing session is opened"* |
| 6584 | `BC_CLOSING_END` | *"sent when closing session is closed"* |

Journal/broadcast codes also used: `BCAST_JRNL_VCT_MSG (6501)` for general broadcast messages, `BCAST_SECURITY_MSTR_CHG (7305)` for intraday security-master change (including `FreezeQuantity`), `BCAST_CAS_REF_PRICE (7338)`, `BCAST_ONLY_MBP (7208)`. `[verified]` S2. Note S2 v6.7's revision entry *"Discontinuation of Bhavcopy broadcast"* — the in-band bhavcopy broadcast is being withdrawn; a greenfield broker should not build on it. `[verified]` S2

### 8.3 MCX — the unsolicited set

S7 §4.22.1.1: *"The receiver of the direct response to a request sent to the gateway is always the submitting session. Additionally, **the session is informed about system events and all unsolicited messages referring to status changes of orders belonging to that session**."* And §4.23.8: *"Each session receives information on orders and quotes which were entered in their own session **automatically without any subscription**."* `[verified]`

S7 §4.14's order-status matrix names the unsolicited cases explicitly `[verified]`:

| Scenario | `OrdStatus (39)` | `ExecType (150)` |
|---|---|---|
| Order book replay — transmission of all active orders | `0 New` / `1 Partially filled` | `D Restated` |
| Triggered Stop Order | `0 New` | `L Triggered by system` |
| Modification of an order to IOC **triggered by the system** | `0 New` | `5 Replaced` |
| **Unsolicited modification triggered by third party** | `1 New` / `2 Partially filled` / `3 Filled` (as printed) | `5 Replaced` |
| **Unsolicited cancellation triggered by third party** | `4 Cancelled` | `4 Cancelled` |
| **Unsolicited cancellation triggered by the trading system** | `4 Cancelled` | `4 Cancelled` |
| Cancellation of not (fully) executed IOC order | `4 Cancelled` | `4 Cancelled` |
| Cancellation due to Self-Match Prevention (SMP) | `4 Cancelled` | `4 Cancelled` |
| Cancellation of squareOff order / of RRM order | `4 Cancelled` | `4 Cancelled` |
| Approval of RRM order | `7 RRM Suspended` | `0 New` |
| Approval of SquareOff order | `8 SquareOff Suspended` | `0 New` |

(The `OrdStatus` values printed as `1/2/3` in the "unsolicited modification" row are inconsistent with the rest of the table's `0/1/2` encoding; treat as a document defect and confirm in UAT. `[uncertain]`)

**MCX squareoff-suspended flow** `[verified]` S7 §4.14.1 — relevant because it produces exchange-driven order outcomes with a timer:

| Action | `OrdStatus` | `ExecType` | `ExecRestatementReason` |
|---|---|---|---|
| Order placed by user with status SquareOff Suspended, accepted by T7 | `8 SquareOff Suspended` | `0 New` | `101 Order Add` |
| Order pending with CnS — no response received at given time | `4 Cancelled` | `4 Cancelled` | `215 Risk Reduction Timer Expired` |
| Order pending with CnS — order accepted | `0 New` | `0 New` | `101 Order Add` |
| Order pending with CnS — order rejected | `4 Cancelled` | `4 Cancelled` | `197 Pending Order Deletion` |

**MCX administrative and mass-action messages** `[verified]` S7:

| Message | Code | Purpose |
|---|---|---|
| `Delete All Order Broadcast` | 10122 | *"informs about an unsolicited mass cancellation event of orders"* |
| `Mass Cancellation Event` | 10308 | *"informs about an event that implicitly led to the mass cancellation of orders"* |
| `Trading Session Event` | 10307 | `TradSesEvent (1368)`: `101 Start of Service`, `102 Market Reset`, `103 End of Restatement`, `104 End of Service`, `105 Service Resumed`; `RefApplLastMsgID (28722)` on a Market Reset |
| `Trade Notification Status` | 10501 | *"informs about the end of the Trade Notification stream for the respective business day"* |
| `Market Status Notification` | 4125 | market status |
| `General Messages – Margin Change Notification` | 4025 | margin change |
| `Service Availability` | 10030 | *"Provides information on the availability of a partition"*; delivered as `User Notification (CB)`, no application sequencing (`N/A`) |
| `Auction Notification` | 11028 | auction |
| `News` | 10031 | *"public information from the MCX market supervision"*; *"News messages distributed without an ApplSeqNum are not part of the retransmission responses"* |
| `Market Wide OI Violation` / `Market Wide OI Alert` | 8100 / 8101 | position-limit breach and warning |
| `Throttle Update Notification` | 10028 | throttle change |
| `Session Logout Notification` / `User Logout Notification` | 10012 / 10043 | forced logout |
| `System Information Download` | 4100 | system info |
| `Cancel Order Notification` | 10112 | multileg cancellation notification |

**`MassActionReason (28721)` — why the exchange killed your orders.** Two different enum sets are published, one per message `[verified]` S7:

| On `Delete All Order Broadcast-10122` | On `Mass Cancellation Event-10308` |
|---|---|
| `0` No special reason; `1` Trading was stopped; `2` Emergency; `3` Market Maker protection; `4` Stop button Activated; `5` Business unit suspended; `6` **Session loss or logout**; `7` **Duplicate Session Login**; `8` Clearing Risk Control; `100` Internal connection loss; `107` Instrument Suspended; `108` Price Band Shrink; `119` RRM: Market Wide Position Limit | `105` Product State Halt; `106` Product State Holiday; `107` Instrument Suspended; `109` Complex Instrument Deletion; `111` Product temporarily not tradeable |

(The published layout of the 10122 enum list is mangled in the source PDF — values `2`/`4`/`5` and their labels "Emergency", "Stop button", "Activated", "Business unit", "5suspended" are split across lines. The set of values and the set of labels are `[verified]`; the exact value↔label pairing for `2`, `4` and `5` is `[uncertain]` and should be read off the vendor-supplied header file.)

`ExecInst (18)` on `Mass Cancellation Event-10308` gives the **cancellation scope**: `1` Persistent Order (FIX `H`), `2` Non-Persistent Order (FIX `Q`), `3` Persistent and Non-Persistent (FIX `H,Q`); *"'No value' indicates no order cancellation"*, and *"Quotes are always cancelled by Mass Cancellation Events."* `[verified]` S7

Two of these reasons deserve a design response `[uncertain]`: `6 Session loss or logout` means **MCX may mass-cancel on a session drop**, which combines with the non-persistent-order deletion rule in §2.2 — so the answer to "what happened to my orders when the link died?" at MCX depends on the persistence flag set at entry **and** on whether a mass-cancellation event fired. `7 Duplicate Session Login` means a careless failover that logs in a second instance of the same Session ID can flush the live book; recall S7 §3.2: *"A Session ID can only establish one session at any time."*

### 8.4 How a member must handle each class

`[uncertain]` — analyst recommendation, grounded in the `[verified]` message semantics above.

| Class | Handling rule |
|---|---|
| Exchange-initiated cancellation (NSE `2075` with `ModCxlBy='C'`; MCX `10122`/`10308`) | Treat as authoritative and terminal. Never re-send the order automatically. Record the reason code for client communication and for the audit trail. |
| Session/market state change (NSE `BCAST_VCT_MESSAGES`; MCX `10307`, `4125`) | Drive an explicit session-state machine. Gate the order-entry path, the kill switch and COL on it — several are *prohibited* in specific states. |
| Silent cancellation (NSE stream outage and DR switchover) | The only two documented cases where orders die with **no** message. Must be handled by the contingency-broadcast handler, not by the order-response handler. |
| Unsolicited modification (NSE pre-open ATO carry-forward; MCX `ExecType 5` third-party/system) | The OMS must accept state changes it did not request, including price changes. A "my view is correct" model breaks here. |
| Preliminary vs binding (MCX) | Never settle on an Execution Report. Reconcile to `Trade Capture Report (AE)` and discard unmatched Execution Reports above the last persisted `ApplMsgID`. |
| Trade cancellation / modification notifications | Must be able to reverse a booked trade intraday and re-run client obligations, including after the trade has been passed to downstream back-office. |

---

## 9. BSE ETI SESSION MODEL AND MCX-SPECIFIC DIFFERENCES

### 9.1 Where BSE sits — and what this pass established

BSE's trading platform is of the same Deutsche Börse T7 lineage as MCX's current interface suite, which is why both publish an **ETI (Enhanced Trading Interface)** plus MDI/EMDI/EOBI market-data interfaces. `[uncertain]` — architecture lineage is widely reported but was not verified from a BSE primary document in this pass.

<!-- MERGE-ANCHOR-9: BSE ETI manual findings — drop copy, session model, sequence numbers, restatement/retransmission, self-match prevention, freeze, trade modification, document titles and versions -->

### 9.2 MCX vs NSE — the differences that change order-state design

| Dimension | NSE (NNF) | MCX (ETI) | Why it matters |
|---|---|---|---|
| Protocol family | Proprietary binary, FIX-unrelated, transaction codes (`2000`, `2073`, …) | *"predominantly derived from the industry standard FIX protocol"*, FIX 5.0 SP2 semantics with UDFs; flat binary encoding, little-endian, `BodyLen` always a multiple of 8; each message has a `TemplateID (28500)` | Two entirely separate adapter codebases; no shared message model |
| Session identity | Box ID + user IDs; many users per box | **Session ID**; *"A Session ID can only establish one session at any time. Each participant application requires its own session."* Two-step: `Connection Gateway Request-10020` → `Connection Gateway Response-10021` → `Session Logon-10000`, then `User Logon-10018` per user | At MCX the session is the unit of order ownership, visibility and recovery; at NSE the box is the unit of disconnection blast radius |
| Order visibility | Per user/branch/corporate hierarchy | *"MCX ETI based applications receive information on orders which were entered in their own session"* — plus the listener broadcast for cross-session visibility | A multi-session MCX deployment needs listener subscriptions to see itself whole |
| Order ownership for cancellation | CM > BM > DL hierarchy | *"The owner of an order is the entering business unit, session and user. The Exchange also supports order cancellation on a different session for the same business unit. Head traders of the same trader group and the supervisor (MAT Terminal) of the business unit may cancel on behalf of the owning user."* | Cross-session cancel is native at MCX |
| Order persistence | Not a member choice | **Member's choice at entry**: persistent / standard / non-persistent (lean) | Determines whether orders survive a disconnect or market reset |
| Freeze | Price freeze (17) and quantity freeze (18), with exchange approval | **No freeze concept in the ETI manual** | The commodity order path has no pending-approval state |
| State recovery | Journal replay (`7000`) | Order book restatement + application-layer retransmission | Event-log replay vs snapshot + selective replay |
| Session-layer sequence gap | No documented replay on the interactive path; gap handling lives in download/subscription | **Reject + disconnect, always; no recovery; every logon starts at `MsgSeqNum = 1`** | MCX adapter must be bullet-proof on its own outbound counter |
| Validity | Day, IOC (GTC/GTD disabled) | Day, **End-Of-session**, IOC | Extra validity to model |
| Binding record | Trade confirmation | Execution Report is **preliminary**; `Trade Capture Report (AE)` is *"legally binding"* | Two-tier trade truth at MCX only |
| Throttling | Drop counter on heartbeats; exchange-set threshold | Architecture throttle per session; `Throttle Update Notification-10028`; transaction limit and **reject/disconnect limit** (exceeding it drops the session) | MCX publishes an explicit reject budget |
| Text / client-code carriage | `AccountNumber`, PAN fields in trade structures | `FreeText1 (58)` = **UCC Code/Client Code**, `FreeText2 (25008)` = **CP Code**, `FreeText3 (25009)`; `UserReferenceText` (renamed from `ComplianceText`) | Client code travels as a FIX text field at MCX — validate charset: *"\x20, \x22-\x7B,\x7D,\x7E"* |
| Timestamps | Seconds since midnight 1 Jan 1980; `LastActivityReference` in nanoseconds | *"nanoseconds past the UNIX epoch"*, **UTC** | Two different epochs in one back office |
| Encryption | Encryption/decryption of interactive messages (S2 Ch.9); GCM-encrypted channel for the immediate-ack path (S2 Ch.13) | Encryption/decryption for Interactive API, incl. **sequential encryption/decryption** and IV charset (added at v1.4.2) | Both venues now encrypt the interactive path |
| Tag | [verified] S2, S3 | [verified] S6, S7 | |

### 9.3 NSE-only features a greenfield OMS should know about

| Feature | Detail | Tag |
|---|---|---|
| **Gateway router** | Members connect first to a **gateway router server**, which allocates a gateway server based on used capacity; *"If all gateway servers have similar used capacity then a gateway server will be randomly [allocated]"*; a member is directed to the **same** gateway on re-login, but *"the user must ask the gateway router"* each time; *"if the gateway has a failure during the day, the user will be allocated a new gateway"*. Used capacity is cleaned up at end of day. | [verified] S2 |
| **Secure box registration** | Login sequence is `GR_RESPONSE` → new TCP to allocated gateway → `SECURE_BOX_REGISTRATION_RESPONSE` → `BOX_SIGN_ON_REQUEST_OUT` → then the Chapter 3 protocol. *"Once a connection for a particular Box ID is established, all users linked with this Box ID [proceed]"*. Error `19031` is sent before disconnection in one failure path. | [verified] S2 |
| **Immediate order acknowledgement** (S2 Chapter 13, new) | Optional extra ack *"sent immediately upon receipt of the order at the Exchange"*, on a **separate port on the gateway router server** using the *"new GCM-encrypted channel with new additional authentication tag"*. Request codes `TRIMMED_BOARD_LOT_ACK_IN (20400)`, `TRIMMED_ORDER_MOD_ACK_IN (20402)`, `TRIMMED_ORDER_CANCEL_ACK_IN (20404)`; response `MS_ACK_RESPONSE` 22 bytes, `QUICK_ACK_OE_RESP (20401)`. *"The existing process of sending a final confirmation or rejection message will continue unchanged."* | [verified] S2 |
| **No host-end inquiries** | *"No host-end inquiries are permitted for NNF users."* The only inquiry in S2 is Chapter 8's **Auction Inquiry** (`AUCTION_INQUIRY_REQUEST`/`RESPONSE`). | [verified] S2 |
| **Price/limit scaling** | *"All price fields must be multiplied by 100 before sending to the host end and divided by [100 on receipt]"*; *"All branch/user/order value limit fields must be multiplied by (100000 * 100)"*. All time fields are *"number of seconds from midnight January 1, 1980"*. All alphabetical data upper-cased except passwords; all numeric data zeroed unless set; reserved fields NULL-initialised. | [verified] S2 |
| **Order number encodes a stream** | First two digits of `OrderNumber` = stream number (different from the journal-download stream number), next fourteen digits a sequence number. | [verified] S2 |


# Content data and market-data fan-out — Indian retail broker, 2026

## A. Content-data layer

### A1. CMOTS: products, datasets and interfaces

[verified] The vendor identifies **APIDataFeed** as a C-MOTS Infotech product. Its current corporate website uses **CMOTS Internet Technologies Pvt. Ltd.** [S1, S14] [unknown] The expansion “Capital Market Online Technologies” and the exact contracting entity for a new broker agreement were not established from these pages; obtain the vendor's legal-entity and contracting particulars. [S1, S14]

[verified] APIDataFeed advertises REST/SOAP and XML/JSON/CSV delivery at platform level. Its FAQ says subscribed API documentation is emailed to customers. [S2, S3] [unknown] This does not establish a separately accessible SOAP binding, WSDL, REST endpoint or file-transfer schedule for every named dataset below. Obtain the subscribed endpoint specification and delivery schedule. [S2, S3]

| Content family | Exact published names and coverage | Published transport / format; documentation boundary |
|---|---|---|
| Company identity and background | [verified] `Company Profile`, `Company Background`, `Board of Directors`, `Directors Reports`. [S4] | [verified] API catalogue; shared REST/SOAP, XML/JSON/CSV offering. [S2] [unknown] Individual binding and response schema require subscriber documentation. [S3] |
| Financials and ratios | [verified] `Profit and Loss`, `Quarterly Results`, `Key Financial Ratios`, `Peer Comparison`. [S4] | [verified] Same platform delivery choices. [S2] [unknown] Named standalone balance-sheet and cash-flow endpoints, consolidated versus standalone treatment, restatement history and ratio formula definitions were not established. [S4] |
| Ownership | [verified] `Share Holding Pattern`, `MF Holdings`. [S4] | [verified] API catalogue and platform formats. [S2, S4] [unknown] Holder-category schema, publication lag and revised-filing treatment require the subscribed specification. [S3, S4] |
| Corporate events | [verified] `Board Meetings`, `Bonus Issues`, `Right Issues`, `Split of Face Value`, `Change of Name`, `De-Listed Shares`; exchange-specific announcement and book-closure variants also appear. [S5] | [verified] API; the page distinguishes delayed BSE announcements from EOD announcement variants. [S5] [unknown] Event identifiers, cancellation/correction messages and contractual freshness guarantees were not published in the material read. [S5] |
| Mutual funds | [verified] `Daily NAV`, `Historical NAV`, `Scheme Ratios`, `Scheme Holding`, `Scheme Asset Allocation`, `Scheme Performance`, `Fund Profile`, `Scheme Comparison`, `New Fund Offer`, `Scheme Master`. [S6] | [verified] API catalogue; platform XML/JSON/CSV. [S2, S6] [unknown] Separate NAV, holdings, expense-ratio and classification update schedules need the purchased dataset specification. [S3, S6] |
| News and market commentary | [verified] `Analyst Poll`, `Corporate News`, `Corporate Result`, `Economy News`, `IPO News`, `Mutual Fund News`, `Market Beat`, `Stock Alert`, `Quick Peek/Review`, `Hot Pursuit/Stock Action`. [S7] | [verified] API catalogue, with the news category labelled delayed. [S7] [unknown] Article-body versus headline rights, editorial correction protocol, archive retention and push delivery were not established. [S3, S7] |
| Research | [verified] The news catalogue includes analyst-oriented content; Capitaline's own brochure separately describes in-house equity research within its database products. [S7, S15] | [unknown] A dedicated CMOTS research-report API, recommendation lifecycle API, report PDF feed, analyst-registration payload and redistribution licence were not found. Capitaline database access does not itself establish a CMOTS syndication endpoint. [S3, S7, S15] |
| Indices and equity analytics | [verified] `Index List`, `Index Wise Company NSE`, `Index Constituents NSE EOD`, `Live Indices NSE Delayed`, `Historical Returns NSE`, `Sector Wise Company`, `Company Master`. [S8] | [verified] API catalogue; delayed prices advertised as BSE **5 minutes**, NSE **15 minutes**, alongside EOD variants; master APIs labelled EOD. [S8] [unknown] These labels do not establish a current real-time index licence or constituent-change SLA. [S8] |
| IPO information | [verified] `Forthcoming IPOs`, `Open/Current IPOs`, `Closed IPOs`, `New Issue Monitor`, `New Listing NSE EOD`, `Basis of Allotment`, `Draft Prospectus`. [S9] | [verified] API catalogue and shared platform formats. [S2, S9] [unknown] Prospectus-document redistribution rights and availability of any separate file feed need confirmation. [S3, S9] |
| Derivatives | [verified] Published products include `FII Statistics`, `Derivative Summary EOD`, `Get Quotes Delayed`, and OI/mover datasets. [S10] | [verified] API variants distinguish delayed and EOD delivery. [S10] [unknown] This is not evidence of a lossless exchange order-event feed. [S10, S55] |
| Currency | [verified] `Currency Futures NSE EOD`, `Currency Intraday Chart NSE`, `Forex Currency EOD`, `Get Quotes Delayed`. [S11] | [verified] API catalogue and shared platform formats. [S2, S11] [unknown] Current venue coverage and endpoint-level latency need confirmation. [S11] |
| Commodities | [verified] `Commodity News`, `End-Session Commentary`, `Closing Commodity Prices MCX EOD`, `Future Prices Ticker MCX Delayed`; NCDEX variants are also listed. [S12] | [verified] API catalogue and shared platform formats. [S2, S12] [unknown] Exact live entitlements and file-transfer options are not established by catalogue labels. [S12] |
| Other markets and investments | [verified] `World Indices`, `Forex`, `MF Investment`, `FII Investment`, `ADR Prices`. [S13] | [verified] API catalogue and shared platform formats. [S2, S13] [unknown] Each upstream market's licensing chain and refresh schedule require contractual evidence. [S13] |
| Custom delivery and additional coverage | [verified] CMOTS advertises web APIs, CSV, XML, JSON and iframe delivery; its team also describes insurance and corporate fixed-deposit data collection and RDBMS integration work. [S1, S14] | [unknown] Named public insurance/FD APIs, bulk SFTP/FTP services and streaming push protocols were not established. A format such as CSV does not by itself prove scheduled file transfer. [S1, S14] |

| Integration issue | Evidence and qualification |
|---|---|
| Public URL example | [verified] The FAQ prints `http://apis.cmots.com/equity.svc/Sector-Wise-Company/Realty/00000051/10?responsetype=xml&apikey=YOURAPIKEY`; it also names `equity.svc/Price-Ticker/NSE`, `derivatives.svc/Top-Quantity/FUT` and `company-information.svc/Company-Chart/ACCLtd/6/1d`. These are documentation examples, not authenticated endpoint tests. [S3] |
| Authentication | [verified] FAQ examples use `apikey` and `responsetype`; separate prose describes a token in a username field and an account allowance of two IP addresses. [S3] [unknown] Which authentication profile applies to a new contract, TLS endpoint and credential-rotation mechanics remain unestablished. [S3] |
| Licensing | [verified] The FAQ states: “C-MOTS API redistribution is not permitted.” [S3] [uncertain] A broker therefore needs written clarification distinguishing licensed in-app display from onward API redistribution; a purchased API subscription alone is insufficient evidence of either permission. [S3] |
| Conflicting availability claims | [verified] APIDataFeed's homepage advertises **99.95%** availability; its FAQ says **99%** uptime. The homepage also displays both **200+** and **100+** API counts. [S2, S3] [unknown] Neither is accepted here as the signed SLA or definitive inventory. [S2, S3] |
| Conflicting format description | [verified] The FAQ's example requests XML but adjacent prose calls its result CSV. [S3] [unknown] Actual endpoint behaviour requires the subscriber specification and a licensed sample response. [S3] |
| Refresh cadence | [verified] The FAQ says update timing depends on the dataset and describes intraday snapshots; the corporate site says data is updated upon receipt from exchanges. [S3, S14] [uncertain] Neither is a universal real-time guarantee for financials, ownership, NAV or news. [S3, S14] |

### A2. Comparable suppliers and the exchange boundary

| Supplier / alternative | Evidence of relevant content supply | Boundary of what is established |
|---|---|---|
| Accord Fintech | [verified] `ACE DATAFEED` covers company information, mutual funds, corporate announcements, news, IPOs and market datasets; subscription delivery is FTP or API, CSV or JSON. [S16] | [unknown] Public endpoint schemas, redistribution schedules, corrections SLA and broker-specific commercial terms were not established. [S16] |
| Cogencis Information Services | [verified] NSE describes `Cogencis WorkStation` as data, news and analytics, and describes Data Feed solutions for ingestion from multiple sources into financial applications. [S17] | [unknown] Dataset-by-dataset equivalence to CMOTS and a public transport/schema specification were not established. [S17] |
| Global Datafeeds | [verified] Its own API documentation exposes `GetSHPAdvanced` for ownership breakdowns, with HTTP GET and JSON/XML/CSV response examples. [S18] | [uncertain] It is an evidenced overlapping supplier, not proven here to replace the entire CMOTS news/MF/research catalogue. [S18] |
| Capitaline | [verified] Publisher material names `Capitaline Enterprise` and `Capitaline AWS`, covering financial analysis and equity research. [S15] | [uncertain] Treat this as a related database/product alternative, not a separately proven competing API syndicator or automatic research redistribution licence. [S1, S15] |
| NSE Data & Analytics | [verified] Its separate Corporate Data service includes company fundamentals, announcements and ownership filings; EOD corporate announcements use SFTP after **20:00 IST daily**. [S19] | [verified] The separate online corporate service is delivered over a dedicated leased circuit. [S19] [uncertain] Corporate content is therefore not exclusively a vendor-sourced category. [S19] |
| BSE | [verified] BSE's data portal lists Corporate Data APIs for financials, disclosures, announcements and corporate actions. [S20] | [unknown] Exact coverage, schema and customer-specific redistribution rights require its product manual and agreement. [S20] |

| Broking-app requirement | What the content layer adds | Overlap / source-of-truth boundary |
|---|---|---|
| Company and investment pages | [verified] CMOTS provides financial statements, ratios, ownership and company background. [S4] [uncertain] These are suitable inputs for company pages, comparison and screening. [S4] | [verified] NSE's MTBT messages describe orders/trades; its corporate disclosures are a separate product. [S19, S55] [uncertain] Do not expect earnings or editorial analysis in an order-event stream. [S19, S55] |
| Corporate-event calendar | [verified] Both CMOTS and exchange content products cover corporate events. [S5, S19, S20] | [uncertain] Use exchange/issuer notices to reconcile dates and revisions; do not let an informational calendar silently determine entitlement accounting or trading restrictions. This is a proposed control, not a published CMOTS guarantee. [S5, S19, S20] |
| Mutual-fund discovery | [verified] CMOTS offers NAV history, holdings and performance datasets. [S6] | [uncertain] Fund-selection content needs its own data definitions; an equity quote stream cannot establish scheme portfolio composition or NAV publication status. [S6, S30] |
| News and recommendations | [verified] The vendor catalogue mixes news, analysis and analyst-oriented items. [S7] | [uncertain] Classify the actual payload and presentation as factual news, statistical information or research before publication; the endpoint's category name does not settle the regulatory treatment. [S7, S23] |
| Prices, charts and index membership | [verified] CMOTS supplies price/chart/index products as well as content; NSE sells multiple real-time and snapshot products. [S8, S21] | [uncertain] Define which source drives executable quote displays, which drives historical charts and which supplies index composition. Different licences and freshness labels should survive aggregation. [S8, S21, S22] |

### A3. Compliance edge: research, recommendations and news

| Question | Primary-source answer |
|---|---|
| When does content become research? | [verified] RA Regulations **2(1)(w)** cover electronic investment analysis/opinion; exceptions include statistical financial summaries and general market/index commentary. **2(1)(wa)** includes recommendations, targets, model portfolios and trading calls. [S23] |
| Does broker registration alone suffice? | [verified] Regulation **3** requires RA registration subject to specified exemptions; it does not give stock brokers a general exemption. [S23] |
| Are “free” broker recommendations outside the regime? | [verified] The **6 February 2026** RA Master Circular, **1.8(b)**, expressly treats research supplied to the broker's broking clients as consideration-backed even without a separate research fee. [S24] |
| Third-party research display | [verified] Regulation **22(2)–(3)** requires the distributing RA/research entity to check for material falsehoods/misleading information and disclose provider conflicts or link to disclosures. **22(4)** exempts those duties where there is no direct/indirect business or contractual relationship. [S23] [uncertain] A contracted research feed ordinarily fails that no-relationship condition. [S23] |
| Selective release | [verified] Regulation **22(1)** prohibits preferential advance release to internal traders or selected clients over other entitled recipients. [S23] |
| Records and controls | [verified] Regulations **19–21** address disclosures/report content/public appearances; **25** requires research and rationale records, with minimum **five-year** preservation. [S23] [uncertain] Preserve the report version, disclosure link and audience entitlement used for each publication. [S23] |
| Unregistered recommendation suppliers | [verified] The 2026 Master Circular, chapter **21**, addresses prohibited associations with unregistered/unpermitted advice providers or impermissible performance claimants, with specified exceptions. [S24] [uncertain] An ordinary trading app should not presume it qualifies as a SEBI-specified digital platform. [S24] |
| News controls | [verified] **Cir/ISD/1/2011**, 23 March 2011, requires intermediary controls against spreading unverified information and retention of relevant communication logs. [S26] [verified] **Cir/ISD/2/2011**, 24 March 2011, requires compliance-officer approval before employees forward market-related news and expressly addresses the officer's responsibility. [S27] |
| Is there a universal ban on third-party news/research in trading apps? | [unknown] No such blanket prohibition was established in the cited provisions. [S23–S27] [verified] Third-party research distribution is expressly contemplated by regulation 22. [S23] [unknown] A special app-only safe harbour, or an express exemption for automated licensed news ingestion from the communication controls, was not established. [S26, S27] |
| Very recent 2026 amendment | [verified] **SEBI/LAD-NRO/GN/2026/321**, dated 8 October and posted by SEBI on 10 October 2026, relaxes institutional-client call recording and takes effect on the thirtieth day after Gazette publication. It is not yet effective on **15 October 2026**, and is not a retail research-display exemption. [S25] |

[uncertain] Proposed publication workflow: classify content; verify provider/rights; retain source and version; perform applicable research review; attach conflicts and authorship disclosures; publish to the entitled audience; support withdrawal and correction. The cited rules support these controls, but do not prescribe this exact software workflow. [S23, S24, S26, S27]

### A4. Documentation decision and operational ownership

[uncertain] **Yes: give content data its own deep-dive section, with CMOTS as one implementation appendix.** A vendor-interface page alone would hide dataset-specific licensing, publication controls, temporal meaning and correction handling. This is an architectural recommendation drawn from the primary evidence, not an assertion that SEBI mandates a documentation section. [S3–S7, S19, S22–S27]

| Dimension | Evidence | Recommended documentation and ownership |
|---|---|---|
| Licensing | [verified] CMOTS restricts API redistribution; NSE permits redistribution only as contracted and separately restricts index creation. [S3, S22] | [uncertain] Legal/compliance and procurement should own a rights matrix for app display, article bodies, caching, archives, derived analytics and onward APIs; engineering implements entitlements. [S3, S22] |
| Refresh cadence | [verified] CMOTS exposes delayed/EOD categories; NSE's EOD corporate files arrive after 20:00 IST. [S8, S19] | [uncertain] Data operations should own dataset freshness, effective dates, reporting periods and source-publication times. Per-dataset schedules are more useful than one feed-wide “last updated” timestamp. [S3, S8, S19] |
| Correctness consequences | [verified] Research distributors have review/disclosure obligations; SEBI's news circular addresses price-discovery harm from rumours. [S23, S26] | [uncertain] Research/editorial and compliance should own interpretation, corrections and withdrawal; data engineering should own mapping, units, duplicates and revision propagation. Incorrect ratios can distort screens; incorrect event dates can mislead clients. These are risk inferences, not documented CMOTS incidents. [S4, S5, S23, S26] |
| Operational resilience | [verified] The RA Master Circular's outsourcing principles retain intermediary accountability and require governance, due diligence, contracts and contingency planning where applicable. [S24, annexure H] | [uncertain] Assign service ownership across data engineering/SRE, data operations and research/compliance. Distinguish ingestion uptime from editorial completeness and legal permission to publish. [S24] |
| Relationship to trading infrastructure | [verified] Broker WebSockets expose quote subscription/session contracts; content APIs expose different dataset contracts. [S2–S8, S30, S35, S38] | [uncertain] Keep execution-price freshness and quote recovery in market-data operations; keep content provenance and publication governance in the content section, with explicit shared instrument identifiers and escalation paths. [S4, S19, S30, S55] |

[unknown] Public sources do not establish the actual department names, staffing or RACI inside each Indian broker. The ownership allocation above is proposed, not an industry survey finding. [S1, S24, S30, S35, S38]

## B. Fan-out layer

### B1. Published client-facing subscription limits

[verified] The following are broker-published API limits, with different quota units: API key, user, session, connection and token/mode combination. [S30, S35, S38, S41, S44, S49] [uncertain] They cannot be multiplied into a universal Indian retail-market-data allowance or used as evidence of onward redistribution permission. [S22, S28]

| Broker / interface | Instruments or subscriptions | Concurrent connections | Formats and depth |
|---|---|---|---|
| Zerodha, Kite Connect v3 | [verified] **“3000 instruments”** per connection. [S30] | [verified] **“3 websocket connections”** per API key. [S30] | [verified] JSON requests; binary quotes; `ltp` **8 bytes**, `quote` **44**, `full` **184** for tradable instruments; full mode has **5 bid + 5 offer** levels. Index packets differ. [S30] |
| Upstox, Market Data Feed V3, normal | [verified] Single-category limits: LTPC **5000**, Option Greeks **3000**, Full **2000**; mixed-category limits respectively **2000 / 2000 / 1500**. The page describes these in user terms; an independent per-socket multiplier is **[unknown]**. [S35] | [verified] **“2 connections per user”**. [S35] | [verified] Binary subscription frames; Protobuf responses. `ltpc`, `option_greeks`, `full`; full includes **5** market levels. [S35] |
| Upstox Plus | [verified] Full D30: individual limit **50**, combined-column limit **1500**. [S35] [unknown] Do not interpret that column as permission for 1500 simultaneous D30 instruments without clarification. [S35] | [verified] **“5 connections per user”**. [S35] | [verified] `full_d30` provides **30** market levels. [S35] |
| DhanHQ v2, Live Market Feed | [verified] **5000** instruments per connection; subscription request batches at most **100** instruments. [S38] | [verified] **5** per user. [S38] | [verified] JSON requests, little-endian binary responses; Ticker, Quote, Full; Full contains **5** buy/sell levels. [S38] |
| DhanHQ, Full Market Depth | [verified] **20-level:** **50** instruments/connection; **200-level:** **1** instrument/connection; NSE equity/derivatives. [S39] | [verified] Page says exceeding **5** WebSockets disconnects the first with **805**. [S39] [unknown] Shared quota across ordinary, 20-level and 200-level sockets is not made explicit. [S38, S39] | [verified] JSON subscriptions, binary depth; `RequestCode=23`; separate bid/ask response codes **41 / 51**. [S39] |
| Angel One, SmartAPI WebSocket 2.0 | [verified] **“1000”** token subscriptions per session; one token in three modes counts as **3** subscriptions; repeated identical token/mode subscriptions do not add quota. [S41] | [verified] **3** concurrent connections per client code. [S41] | [verified] JSON requests; little-endian binary responses; mode **1** LTP, **2** Quote, **3** Snap Quote; Snap Quote includes **5-level** depth. [S41, S42] |
| FYERS, API v3 data socket | [verified] Support says **5000 unique symbols per API key**; developer reference says **5000 per connection**. This is an unresolved scope conflict. [S44, S46] | [verified] Support recommends at most **5 per user**; it does not describe this as a guaranteed hard entitlement. [S45] [unknown] Exact data-socket hard cap remains unresolved; see B5. [S45] | [verified] SDK exposes `SymbolUpdate`, `DepthUpdate`, LTP-only `litemode`; depth **5 levels**. [S46] [unknown] Ordinary raw-wire schema is not established by SDK callback objects alone. [S46] |
| FYERS, TBT socket | [verified] Developer reference: **5 symbols/connection**. [S46] | [verified] **3 connections/app/user**; channels **1–50**. [S46] | [verified] Protobuf, **50-level** depth, NSE equity/NFO; endpoint `wss://rtsocket-api.fyers.in/versova`. [S46] |
| Finvasia Shoonya | [verified] March 2026 changelog states **“500 tokens/connection”**. [S50] [unknown] Current rate-limit table omits that subscription figure; contractual persistence is unconfirmed. [S49, S50] | [verified] Rate-limit page: **1/session**; FAQ: **1/user**. [S49, S54] | [verified] JSON touchline snapshots/deltas; official SDK also documents **5-level** depth. [S52, S53] |

### B2. Authentication and session mechanics

| Broker | Connection authentication | Session lifecycle |
|---|---|---|
| Kite | [verified] `wss://ws.kite.trade` query fields `api_key`, `access_token`. [S30] | [verified] Login yields `request_token`; exchange using API key, secret-derived checksum and `/session/token`. Token expires at **06:00 next day**, or earlier on invalidation/master logout. [S31] |
| Upstox | [verified] Feed authorization uses `Authorization: Bearer access_token` and redirects to the authorized WebSocket endpoint. [S35] | [verified] OAuth authorization-code exchange yields the access token; standard token expires at **03:30 the following morning**, irrespective of generation time. [S36] |
| Dhan | [verified] `wss://api-feed.dhan.co` uses `version=2`, `token`, `clientId`, `authType=2`; depth hosts use the same credential fields. [S38, S39] | [verified] Web-generated tokens last **24 hours**; `RenewToken` replaces an active web-generated token with another 24-hour token, invalidating the old one. Expired tokens cannot use that renewal flow. API-key/secret and partner flows are separately documented. [S40] |
| Angel One | [verified] `wss://smartapisocket.angelone.in/smart-stream` headers: `Authorization`, `x-api-key`, `x-client-code`, `x-feed-token`. Login/refresh returns `jwtToken`, `refreshToken`, `feedToken`; browser URL uses `clientCode`, `feedToken`, `apiKey`. [S41] | [unknown] A stable current token-expiry clock and uninterrupted-socket token rotation guarantee were not established. [S41] |
| FYERS | [verified] Developer reference uses `<app_id>:<access_token>` for socket authentication. [S46] [verified] Notice requires a valid access token for all WebSockets from **30 September 2026**. [S47] | [unknown] Exact token lifetime and what happens to an already-open socket at expiry require the current authentication specification. [S46, S47] |
| Shoonya | [verified] Connect to `wss://api.shoonya.com/NorenWSAPI/`; JSON connect `t=a` carries `uid`, `actid`, `source`, `accesstoken`; wait for `t=ak`, `s=Ok`. [S51] | [verified] Current documentation describes login/OAuth access tokens. [S51] [unknown] Exact expiry/refresh clock and legacy `susertoken` compatibility were not resolved here. [S51, S53] |

[unknown] None of these client-login descriptions establishes unrestricted multi-client redistribution rights, token sharing across users, or a third-party vendor's permitted aggregate data use. Obtain broker partner terms and the relevant exchange data agreement. [S22, S28, S30, S35, S38, S41, S46, S51]

### B3. Cadence, conflation and heartbeat

| Feed | What is actually published | What must not be inferred |
|---|---|---|
| Kite | [verified] Broker staff described snapshot delivery as usually **1 tick/s**, sometimes **2** in July 2023; December 2024 guidance explains cumulative volume should be differenced rather than summing last-trade quantity. [S33, S58] | [unknown] No current fixed cadence or all-exchange-ticks SLA was established. [S30, S33] [verified] An older March 2017 response asserted a maximum of 1 tick/s, conflicting with the later explanation. [S33] |
| Upstox V3 | [verified] Documentation describes real-time updates and initial status/snapshot ordering. [S35] | [unknown] Numerical event frequency, conflation window and maximum delivery latency were not established. [S35] |
| Dhan ordinary feed | [verified] Vendor calls it event-based tick-by-tick data; server ping is **10 seconds**, disconnection after **40 seconds** without response. [S38] | [unknown] That wording does not establish delivery of every underlying exchange order/trade event or a fixed update interval. [S38, S55] |
| Dhan depth | [verified] Depth page has the same **10-second** ping and **40-second** timeout. [S39] | [unknown] Numeric depth-refresh cadence and conflation algorithm were not established. [S39] |
| Angel One | [verified] Published contract says text `ping`/`pong` every **30 seconds**; current Python SDK sets `HEART_BEAT_INTERVAL=10`. [S41, S42] | [unknown] Neither number is market-update cadence; no fixed update-frequency guarantee was established. [S41] |
| FYERS | [verified] Developer reference exposes `setQueueProcessInterval(ms)` with **1–2000 ms**. [S46] | [uncertain] This is client queue processing control, not evidence of server/exchange conflation. [S46] [unknown] Server-side cadence SLA remains unestablished. [S46] |
| Shoonya | [verified] Touchline changes are streamed after the initial snapshot. [S52] | [unknown] Fixed tick frequency, conflation interval and maximum latency were not established. [S51, S52] |

### B4. Snapshot, deltas, reconnect and sequence semantics

| Interface | Initial state / subsequent delivery | Reconnect and resume | Sequence evidence |
|---|---|---|---|
| Kite | [verified] Broker staff describe an initial cached tick, then updates when data changes. [S34] | [verified] Official Python SDK supports automatic reconnect with exponential backoff and subscription restoration. [S32] [unknown] No missed-tick replay/resume cursor was found in the cited API contract. [S30] | [verified] Published quote packet fields contain timestamps but no sequence-number field. [S30] |
| Upstox V3 | [verified] First message supplies market status, second a snapshot, later messages live updates. [S35] | [verified] SDK exposes configurable `auto_reconnect(enable, interval, retryCount)` and reconnect events. [S37] [unknown] No server-side missed-event replay guarantee was established. [S35, S37] | [unknown] `currentTs` is a timestamp; no documented resume sequence was established. [S35] |
| Dhan ordinary | [verified] Subscription also produces a previous-close packet; Ticker/Quote/OI/Full responses have different response codes. [S38] | [unknown] No atomic snapshot-to-delta handoff, durable resume cursor or replay guarantee was found. [S38] | [verified] Ordinary response header lists response code, length, segment and security ID, not a sequence field. [S38] |
| Dhan depth | [verified] Twenty-level header labels `Message Sequence` as **“to be ignored”**; 200-level header instead describes row count. [S39] | [unknown] That field cannot establish a supported sequence-gap recovery API. [S39] | [unknown] Sequence scope, reset rules and replay operation are not established. [S39] |
| Angel One | [verified] SDK supports retries and a `resubscribe()` method. [S42] | [unknown] Reconnect success does not establish recovery of missed ticks or guaranteed restoration for every SDK version. [S42] | [verified] Contract exposes `Sequence Number`; index-feed sequence is explicitly unavailable and should be ignored. [S41] [unknown] Contiguous scope and a replay request are not established. [S41] |
| FYERS TBT | [verified] Developer reference explicitly describes a full first snapshot followed by diffs; channel activation uses `switchChannel` with `resume_channels` / `pause_channels`. [S46] | [unknown] Resuming a paused channel is not evidence of cross-disconnection replay. Server resume token, replay horizon and gap recovery were not established. [S46] | [unknown] Sequence semantics require the linked TBT protobuf schema and recovery specification; no layout is reconstructed here. [S46] |
| Shoonya touchline | [verified] Subscribe `t=t`; one `t=tk` snapshot per instrument, then `t=tf` changes. Apart from `t`, `e`, `tk`, absent fields are unchanged; merge by exchange/token. Unsubscribe uses `t=u`, acknowledgment `t=uk`. [S52] | [verified] Broker explicitly instructs reconnect with backoff, authenticate again and resend subscriptions: subscriptions do not survive disconnect. [S51, S52] | [verified] Published touchline contract has `ft` time but no sequence/resume field. [S52] [unknown] Missed-update replay is not established. [S51, S52] |
| Shoonya depth | [verified] Official SDK distinguishes `t=dk` acknowledgment and `t=df` updates, with bid/ask fields through level 5. [S53] | [unknown] Current OAuth documentation's sparse-field/recovery guarantees for depth need a specific depth contract; do not assume touchline semantics automatically cover every depth field. [S51–S53] | [unknown] No depth replay sequence contract was established. [S53] |

[uncertain] For a broker's own downstream service, explicitly document replacement-versus-merge semantics, initialization completeness, stale-state handling, resubscription, and whether any replay exists. A sensible default after disconnect is to invalidate the cached state until a fresh baseline is obtained; a heartbeat or timestamp alone does not establish book completeness. These are design recommendations derived from the different contracts above. [S30, S35, S39, S41, S46, S51, S52]

### B5. Conflicts and superseded claims

| Issue | Both sides | Treatment |
|---|---|---|
| Angel 20-depth | [verified] Current SDK still contains `DEPTH=4`, 20-level parsing and a 50-token check. [S42] [verified] SmartAPI Team announced removal of 20-depth effective **25 April 2025**, directing users to 5-depth. [S43] | [uncertain] Treat 20-depth as deprecated; code presence is not a current service entitlement. [S42, S43] |
| FYERS symbol scope | [verified] Support: 5000/API key. Developer reference: 5000/connection. [S44, S46] | [unknown] Request a versioned entitlement statement; do not assume 25,000 distinct symbols from five connections. [S44–S46] |
| FYERS old 50-symbol result | [verified] A support category for API v2.1 still describes 50 symbols. [S48] | [verified] It is a different version from the v3 5000-symbol page; not a basis for overriding the v3 limit. [S44, S48] |
| Shoonya documentation mismatch | [verified] Changelog says March 2026 clarified 500 tokens/connection and 15 REST quote requests/s; current rate page omits the token cap and instead gives approximately 1 REST request/s/instrument. [S49, S50] | [unknown] These are not interchangeable quotas; obtain the current per-user/per-instrument rate schedule. [S49, S50] |
| Dhan bid/ask wording | [verified] Depth prose reverses buy/sell labels, while its packet table associates 41 with bid/buy and 51 with ask/sell. [S39] | [unknown] Obtain corrected documentation and canonical packet fixtures; do not implement from the contradictory prose. [S39] |
| Upstox initial message typing | [verified] Page prose calls the second tick a snapshot, but the snapshot example uses `type: live_feed`. [S35] | [unknown] Initialization detection must be checked against the current `.proto` and service behaviour; the label alone does not resolve it. [S35] |
| CMOTS availability and output descriptions | [verified] Homepage/FAQ availability figures and FAQ XML/CSV wording differ, as detailed in A1. [S2, S3] | [unknown] Signed SLA and subscriber response specification are needed. [S2, S3] |

### B6. Exchange/SEBI constraints versus broker choices

| Constraint | What primary sources establish | Scope |
|---|---|---|
| Third-party use | [verified] **SEBI/HO/MRD/MRD-PoD-3/P/CIR/2024/56**, 24 May 2024, restricts third-party real-time sharing to market-functioning/regulatory purposes; requires agreements identifying use and justification, annual board review of recipients/activities, and anti-misuse diligence. [S28] | [uncertain] A broker API is not permission to republish a market-wide public feed. [S22, S28] |
| Education in 2026 | [verified] **HO/47/17/12(11)2025-MRD-POD3/I/11107/2026**, 8 May 2026, effective **1 July 2026**, sets **30 days** for educational sharing/use, with a **1-day** NISM simulation-lab exception, legal agreements and usage audit trail. [S29] | [verified] It modifies the earlier 1-day sharing/3-month education-use provisions. [S29] [uncertain] It is not a 30-day delay requirement for legitimate broker trading quotes. [S28, S29] |
| Exchange licence | [verified] NSE policy makes redistribution agreement-dependent and reserves ownership and inspection rights; its market-data definition includes corporate and historical data, not just ticks. [S22] | [unknown] Each broker's exact display, non-display, depth and third-party API permissions require its executed schedule. [S22] |
| Depth products | [verified] NSE lists L1 best bid/ask, L2 **5 levels**, L3 **20 levels**, and TBT full order book. [S21] | [uncertain] Product depth is not itself a SEBI retail-depth ceiling. [S21] [unknown] No universal rule limiting all retail broker APIs to five levels was found; current Dhan/Upstox/FYERS documentation describes deeper products. [S35, S39, S46] |
| Exchange snapshot cadence | [verified] NSE sells binary **1-minute / 5-minute** snapshots delivered by SFTP. [S21] | [uncertain] Those are particular products, not mandatory conflation intervals for every broker WebSocket. [S21] |
| NSE packet-specific cadence | [verified] CM L1/L2/L3 specification **v1.33**, FAQ 15, describes `CV` initial dissemination within **6–9 seconds**, then **5-second** updates/retransmissions, with two retransmissions for illiquid securities. [S56] | [uncertain] These numbers concern `CV`; they must not be generalized to all NSE packets or all client tick rates. [S56] |
| NSE upstream recovery rates | [verified] MTBT **v6.6**, §8: **13 concurrent connections/IP/segment**, **100 connections/s/IP**, at least **10 ms** between recovery requests, request within **1 second** of connection. [S55] | [verified] These govern recovery-server access, not retail WebSocket subscriptions. [S55] |
| BSE upstream snapshot/delta | [verified] Indexed text of BSE manual **v1.3.5**, §11.3, distinguishes event-driven depth increments from timed snapshots; `MarketDepth(264)` is exchange configured. [S57] | [unknown] Current 2026 BSE conflation settings, applicable protocol revision and onward retail obligations were not established from that legacy manual. [S57] |
| Universal fan-out rate limit | [unknown] No exchange/SEBI document establishing one universal client WebSocket connection count, symbols/socket cap, ticks/s cap or mandatory conflation window was found in the cited material. This is a bounded research result, not proof that no product-specific contract/circular exists. [S21, S22, S28, S29, S55–S57] | [uncertain] Keep broker API quotas, upstream technical limits, order-entry rates and redistribution permissions as separate controls. [S28, S30, S35, S49, S55] |

### B7. Upstream recovery is not downstream resume

| Primary interface | Exact documented mechanism | Consequence for a broker |
|---|---|---|
| NSE NDAL MTBT v6.6, 7 September 2026 | [verified] Sequenced UDP multicast; header fields `stream_id`, `seq_no`; numbering starts at **1** per stream/day and restarts at **1** after DR switchover. Missing ticks can be requested over TCP using message type `R`, `Start Sequence Number`, `End Sequence Number`; response `Y` has status `S`/`E`. [S55] | [uncertain] The ingestion service can use that upstream mechanism, but it does not create a client-facing replay contract after normalization, filtering or conflation. [S30, S35, S55] |
| BSE legacy MDI/EMDI manual | [verified] `MarketDataSnapshotFullRefresh`, `MsgType(35)=W`, `MsgSeqNum(34)`, `MarketDepth(264)` and `LastMsgSeqNumProcessed` appear in §11.3.1, with different netted/unnetted applicability. [S57] | [unknown] Current template IDs and complete 2026 recovery rules require the applicable BSE manual/template set. Legacy tags are evidence of a mechanism, not a production decoder specification. [S57] |
| Retail broker WebSockets | [verified] Shoonya explicitly requires rebuilding subscriptions; Dhan depth tells consumers to ignore its sequence field; Kite's quote schema has no sequence field. [S30, S39, S51] | [uncertain] Do not promise clients lossless reconstruction merely because the upstream exchange stream is sequenced. [S30, S39, S51, S55] |

## Numbered source register

[verified] Sources below were read or retrieved on **15 October 2026**; publication/version dates are stated where established. [S1–S58] [uncertain] To answer the vendor and broker questions, “primary sources” is interpreted to include their own product/interface documentation and clearly attributed staff announcements, alongside exchange and SEBI material. No third-party article is used to establish a factual conclusion.

| ID | Primary source and locator |
|---|---|
| S1 | [verified] CMOTS, [APIDataFeed About Us](https://www.apidatafeed.com/about-us), product ownership and data-production description. |
| S2 | [verified] CMOTS, [APIDataFeed homepage](https://www.apidatafeed.com/), delivery formats, advertised transports and availability. |
| S3 | [verified] CMOTS, [APIDataFeed FAQ](https://www.apidatafeed.com/faq), documentation, licensing, authentication examples, cadence and uptime. |
| S4 | [verified] CMOTS, [Company Information catalogue](https://www.apidatafeed.com/product/company-information). |
| S5 | [verified] CMOTS, [Announcement catalogue](https://www.apidatafeed.com/product/announcement). |
| S6 | [verified] CMOTS, [Mutual Fund catalogue](https://www.apidatafeed.com/product/mutual-fund). |
| S7 | [verified] CMOTS, [News catalogue](https://www.apidatafeed.com/product/news). |
| S8 | [verified] CMOTS, [Equity catalogue](https://www.apidatafeed.com/product/equity). |
| S9 | [verified] CMOTS, [IPO catalogue](https://www.apidatafeed.com/product/ipo). |
| S10 | [verified] CMOTS, [Derivatives catalogue](https://www.apidatafeed.com/product/derivatives). |
| S11 | [verified] CMOTS, [Currency catalogue](https://www.apidatafeed.com/product/currency). |
| S12 | [verified] CMOTS, [Commodities catalogue](https://www.apidatafeed.com/product/commodities). |
| S13 | [verified] CMOTS, [Other Markets catalogue](https://www.apidatafeed.com/product/other-markets). |
| S14 | [verified] CMOTS, [corporate homepage](https://www.cmots.com/) and [Market Data Provider](https://www.cmots.com/services/market-data-provider); primary-site indexed text read, direct renderer returned a JavaScript shell. |
| S15 | [verified] Capitaline, [publisher product brochure](https://www.capitaline.com/Demo/AllProducts.pdf). |
| S16 | [verified] Accord Fintech, [Data Feed Solutions](https://www.accordfintech.com/static/data-feed-solutions.aspx). |
| S17 | [verified] NSE, [Cogencis Information Services](https://www.nse.in/static/cogencis). |
| S18 | [verified] Global Datafeeds, [GetSHPAdvanced API](https://docs.globaldatafeeds.in/getshpadvanced-23196898e0). |
| S19 | [verified] NSE, [Paid Corporate Data](https://www.nseindia.com/static/market-data/corporate-data-subscription), page updated 11 June 2026. |
| S20 | [verified] BSE, [Market Data portal](https://marketdata.bseindia.com/), Corporate Data product category. |
| S21 | [verified] NSE, [Paid Real Time Data](https://www.nseindia.com/static/market-data/real-time-data-subscription), levels and snapshot products. |
| S22 | [verified] NSE, [Data Sharing & Usage Policy](https://www.nseindia.com/static/market-data/nse-data-policy), usage restrictions and relevant-agreement provisions. |
| S23 | [verified] SEBI, [RA Regulations consolidated through 25 November 2025](https://www.sebi.gov.in/sebi_data/attachdocs/aug-2026/1785912002778.pdf), regulations 2, 3, 19–22, 25; [official landing page](https://www.sebi.gov.in/legal/regulations/nov-2025/securities-and-exchange-board-of-india-research-analysts-regulations-2014-last-amended-on-november-25-2025-_98248.html). |
| S24 | [verified] SEBI, [Master Circular for Research Analysts, 6 February 2026](https://www.sebi.gov.in/sebi_data/attachdocs/feb-2026/1770375507051.pdf), §1.8, chapter 21, outsourcing annexure. |
| S25 | [verified] SEBI, [RA Amendment Regulations 2026](https://www.sebi.gov.in/sebi_data/attachdocs/oct-2026/1791796596784.pdf), notification SEBI/LAD-NRO/GN/2026/321. |
| S26 | [verified] SEBI, [Cir/ISD/1/2011](https://www.sebi.gov.in/sebi_data/attachdocs/1301040094242.pdf), 23 March 2011. |
| S27 | [verified] SEBI, [Cir/ISD/2/2011](https://www.sebi.gov.in/sebi_data/attachdocs/1301040026718.pdf), 24 March 2011 addendum. |
| S28 | [verified] NSE, [NSE/COMP/62283](https://nsearchives.nseindia.com/content/circulars/COMP62283.pdf), 31 May 2024, reproducing SEBI's 24 May 2024 real-time-sharing circular. |
| S29 | [verified] SEBI, [Educational price-data circular, 8 May 2026](https://www.sebi.gov.in/sebi_data/attachdocs/may-2026/1778242522289.pdf), §§4–7. |
| S30 | [verified] Zerodha, [Kite Connect v3 WebSocket specification](https://kite.trade/docs/connect/v3/websocket/). |
| S31 | [verified] Zerodha, [Kite user/authentication specification](https://kite.trade/docs/connect/v3/user/). |
| S32 | [verified] Zerodha, [Python SDK documentation/source](https://kite.trade/docs/pykiteconnect/v4/), KiteTicker reconnection and resubscription. |
| S33 | [verified] Zerodha, [Frequency of ticks](https://kite.trade/forum/discussion/1291/frequency-of-ticks), attributed broker-staff replies, March 2017 and July 2023; dated practice, not a 2026 SLA. |
| S34 | [verified] Zerodha, [Initial cached tick and change-driven updates](https://kite.trade/forum/discussion/11133/not-getting-data-for-all-nse-subscribed-and-tick-getlasttradedtime-is-returning-null), sujith replies, March 2022. |
| S35 | [verified] Upstox, [Market Data Feed V3](https://upstox.com/developer/api-documentation/v3/get-market-data-feed/), limits, modes, auth, initialization. |
| S36 | [verified] Upstox, [Get Token](https://upstox.com/developer/api-documentation/get-token/). |
| S37 | [verified] Upstox, [Streamer Functions](https://upstox.com/developer/api-documentation/streamer-function/). |
| S38 | [verified] Dhan, [Live Market Feed v2](https://dhanhq.co/docs/v2/live-market-feed/). |
| S39 | [verified] Dhan, [Full Market Depth](https://dhanhq.co/docs/v2/full-market-depth/), 20/200-level interfaces. |
| S40 | [verified] Dhan, [Authentication](https://dhanhq.co/docs/v2/authentication/). |
| S41 | [verified] Angel One, [SmartAPI documentation](https://smartapi.angelone.in/docs) and [indexed response-contract view](https://smartapi.angelone.in/docs/Instruments), WebSocket Streaming 2.0; indexed primary text read, direct renderer returned a shell. |
| S42 | [verified] Angel One, [official smartWebSocketV2.py](https://raw.githubusercontent.com/angel-one/smartapi-python/main/SmartApi/smartWebSocketV2.py); moving main branch, retrieved 15 October 2026. |
| S43 | [verified] Angel One, [SmartAPI Team 20-depth deprecation notice](https://smartapi.angelone.in/smartapi/forum/topic/5217/deprecation-of-20-market-depth-from-websocket-2-0-effective-april-25-2025/2), effective 25 April 2025. |
| S44 | [verified] FYERS, [v3 symbol cap](https://support.fyers.in/portal/en/kb/articles/is-there-a-limit-to-the-number-of-symbols-i-can-track-using-the-data-websocket-in-api-v3), updated 29 August 2025. |
| S45 | [verified] FYERS, [maximum WebSocket connections](https://support.fyers.in/portal/en/kb/articles/what-is-the-maximum-number-of-websocket-connections-a-single-user-can-have-on-fyers). |
| S46 | [verified] FYERS developer organisation, [v3 WebSocket reference](https://github.com/FyersDev/fyers-skills/blob/master/skills/fyers-trading/references/websocket.md); moving master branch. |
| S47 | [verified] FYERS, [Notice Board](https://fyers.in/notice-board), “Mandatory WebSocket Authentication from 30 September 2026”, update 27 September 2026. |
| S48 | [verified] FYERS, [legacy v2.1 Data WebSocket support category](https://support.fyers.in/portal/en/kb/fyers-api-integrations/fyers-api/api-v2-1/data-websocket). |
| S49 | [verified] Shoonya, [Rate Limits](https://www.shoonya.com/api-documentation/rate-limits). |
| S50 | [verified] Shoonya, [Changelog](https://www.shoonya.com/api-documentation/changelog), March 2026 documentation entry. |
| S51 | [verified] Shoonya, [WebSocket Overview](https://www.shoonya.com/api-documentation/websocket-overview). |
| S52 | [verified] Shoonya, [Subscribe to Market Feed](https://www.shoonya.com/api-documentation/subscribe-market-feed). |
| S53 | [verified] Shoonya, [official Python SDK README](https://github.com/Shoonya-Dev/ShoonyaApi-py), subscription/depth response contracts. |
| S54 | [verified] Shoonya, [connection-count FAQ](https://shoonya.com/faq/api/how-many-websocket-connections-a-user-can-have-in-shoonya-api/). |
| S55 | [verified] NSE Data & Analytics, [MTBT API Specification v6.6](https://nsearchives.nseindia.com//web/mediaattachment/2026-09/Realtime_CM_CD_TBT_ver_6.6.pdf), 7 September 2026, §§2, 4, 7–8. |
| S56 | [verified] NSE Data & Analytics, [CM Level 1/2/3 specification v1.33](https://nsearchives.nseindia.com//web/mediaattachment/2026-08/Real_time-CM-L1L2L3-V1.33.pdf), FAQ 15, printed p.55. |
| S57 | [verified] BSE, [Market Data Interfaces Manual v1.3.5](https://www.bseindia.com/downloads1/BSE_market_data_manual_v135.pdf), indexed primary text of §§11.3–11.3.1; direct PDF retrieval returned 403. [unknown] Current applicability not established. |
| S58 | [verified] Zerodha, [Volume data aggregation issue](https://kite.trade/forum/discussion/14694/volume-data-aggregation-issue-using-websockets), sujith replies, December 2024. |

## Gaps and cautions

| Not established | Document or evidence needed to settle it |
|---|---|
| [unknown] CMOTS contracting entity, full legal-name expansion and current saleable SKU inventory. [S1, S14] | [unknown] Vendor legal particulars and dated commercial product schedule. [S1, S14] |
| [unknown] Per-dataset REST/SOAP mapping, HTTPS production URLs, WSDL/OpenAPI, response fields, file-transfer transport and delivery guarantees. [S2, S3] | [unknown] Subscribed API manual, WSDL/OpenAPI where offered, delivery annexure and authenticated sample responses. [S3] |
| [unknown] Named balance-sheet/cash-flow endpoints, ratio methodologies, restatements, historical point-in-time coverage and consolidated/standalone handling. [S4] | [unknown] Financial-data dictionary and revision/methodology manual. [S4] |
| [unknown] Standalone CMOTS research-report feed, analyst metadata, article licences and permission for in-app versus onward redistribution. [S3, S7, S15] | [unknown] Research/news syndication agreement, endpoint catalogue and rights schedule. [S3, S7, S15] |
| [unknown] Vendor refresh/correction SLA, enforceable uptime target and operational ownership inside the researched brokers. [S2, S3, S24] | [unknown] Signed SLA, correction runbook and broker RACI; proposed ownership in A4 is not verified practice. [S2, S3, S24] |
| [unknown] Universal retail tick-rate, conflation or depth ceiling; broker-specific exchange redistribution entitlements. [S21, S22, S28, S55–S57] | [unknown] Applicable current exchange dissemination circulars and executed display/non-display/third-party API schedules; absence from this search is not proof of unrestricted use. [S22] |
| [unknown] Current BSE MDI/EMDI template set, conflation configuration and complete recovery rules. [S57] | [unknown] Applicable 2026 BSE Market Data Interfaces Manual, FAST templates and implementation circular; legacy v1.3.5 is insufficient for implementation. [S57] |
| [unknown] Upstox per-connection versus per-user aggregation and interpretation of Plus D30 combined limits; exact snapshot discriminator. [S35] | [unknown] Versioned V3 entitlement clarification, current protobuf and initial-message contract. [S35] |
| [unknown] FYERS hard data-socket cap, conflicting 5000-symbol scope, raw ordinary-wire schema and TBT resume semantics. [S44–S46] | [unknown] Current v3/TBT protocol and plan entitlement annexure, linked `https://public.fyers.in/tbtproto/1.0.0/msg.proto`, recovery specification. [S46] |
| [unknown] Dhan shared connection accounting across feed products, reliable depth side labels and supported sequence semantics. [S38, S39] | [unknown] Corrected Full Market Depth specification, quota clarification and canonical test packets. [S39] |
| [unknown] Angel token expiry clock, sequence scope/gap handling and guaranteed retry/subscription restoration; retained 20-depth SDK code conflicts with removal notice. [S41–S43] | [unknown] Current session-lifecycle contract and WebSocket 2.0 recovery addendum; supported SDK release notes and tests. [S41–S43] |
| [unknown] Shoonya authoritative subscription/REST quotas, exact session lifetime, and complete current depth delta contract. [S49–S53] | [unknown] Corrected Rate Limits schedule matching the changelog, OAuth/session manual and depth-stream specification. [S49–S53] |
| [unknown] Lossless client replay, resume cursor, event retention horizon and fixed tick-frequency SLA across the surveyed brokers. [S30, S35, S38, S41, S46, S51] | [unknown] Explicit broker recovery/SLA documents; reconnect helpers, sequence fields and “real-time” marketing do not settle these questions. [S32, S37, S39, S42, S46, S51] |
| [unknown] App-only exemption or blanket prohibition for licensed third-party news, and precise application of employee-forwarding controls to fully automated feeds. [S23, S26, S27] | [unknown] Applicable SEBI/exchange clarification addressing automated syndication and the broker's specific publication arrangement. [S23, S26, S27] |
| [unknown] Catalogue existence does not establish current endpoint availability, throughput or observed production behaviour; no licensed live-feed subscription was exercised. [S2, S3, S30, S35, S38, S41, S46, S51] | [unknown] Vendor/broker UAT credentials, approved test plan, entitlement confirmation and timestamped integration results. [S3, S30, S35, S38, S41, S46, S51] |

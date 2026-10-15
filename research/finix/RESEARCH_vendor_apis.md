# Public interfaces, eventing and real-time capabilities of Indian broking software vendors

Research cut-off: **2026-10-15**. Scope supplied by the brief: a greenfield broker using NSE, BSE and MCX across cash, equity F&O, currency and commodities; Saral MoneyMaker and SecMark are the named stack. This is a public-evidence inventory, not a certification of installed software.

| Reading rule | Meaning in this report |
|---|---|
| Confidence | **[verified]** means the cited source actually publishes the statement. For marketing, it verifies the publication, not performance or successful integration. **[likely]** requires two independent, named sources. **[uncertain]** identifies unresolved interpretation or applicability. **[unknown]** means the research did not establish the capability or detail. |
| Provenance | **[public, vendor-stated]** is the software supplier's website, documentation, repository or corporate disclosure. **[third-party]** is a broker, reseller, other publisher, or exchange speaking about a vendor. An exchange's own list is explicitly called **exchange-primary**: third-party relative to the supplier, but authoritative for what that exchange publishes. |
| Inference | **[inference]** marks the author's interpretation; **[recommendation]** marks proposed procurement/architecture work. Neither is a vendor capability claim. Row-level evidence applies to the factual statements in that row; mixed claims carry separate tags. |
| Missing documentation | “Not found publicly” describes this search, not proof that a private interface or customer integration kit does not exist. A website's word “API” does not establish REST, FIX, streaming, database access or a particular endpoint. |
| Dates and status | Publication, contractual acquisition, proposed development, registration and production enablement are distinct. Search-engine crawl dates and years inside URL paths are not treated as effective dates. Undated product pages have no independently established release date. |
| Scope of searches | More than 20 distinct web searches were executed, followed by direct page/PDF inspection, repository documentation and an architecture-diagram inspection. A representative query ledger appears below. No trading, payment, login or other operational API was called. |

## 1. Decisive findings

| Question | Finding | Evidence and boundary |
|---|---|---|
| Do Indian broking vendors publish usable event interfaces? | **Yes.** Symphony XTS documents order/trade/position socket events; Synapsewave ODIN documents streaming order/trade responses; Kambala Noren publishes REST/WebSocket SDK documentation. | [verified] [public, vendor-stated] [XTS][XTS], [ODIN][ODIN], [Noren SDK][NOREN]. These are documented interfaces, not deductions from “real-time” marketing. |
| Does the SecMark-related middleware have public interface documentation? | **Yes, through the CodiFi-hosted NinjaFox documentation lineage.** SecMark names Ninja Fox on its middleware page and reports acquiring CodiFi trading middleware/software. NinjaFox publishes orders, funds, portfolio, WebSocket and order-webhook interfaces. | [verified] [public, vendor-stated] [SecMark middleware][SMW], [FY2025–26 annual report][SAR], [NinjaFox documentation][NF]. [uncertain] [inference] Exact documentation version, licensed modules and compatibility with a particular SecMark deployment still need confirmation. |
| Does Saral publish an OMS/RMS developer specification? | **No public developer specification was located** for MoneyMaker order entry, limit administration, margin extraction or trade-event consumption. | [unknown] Checked the [vendor site][SH], [solutions][SS], [features][SF], indexed technical searches and the broker-hosted manual below. This does not establish that Saral has no APIs. |
| Is a message bus publicly described? | **Yes, at an architectural level:** NinjaFox's diagram explicitly includes Apache Kafka on its transactional-log path. **No broker-consumable Kafka/AMQP topic contract was located for Saral or SecMark.** | [verified] [public, vendor-stated] [NinjaFox architecture diagram][NFA]. [unknown] External topic access, order/limit event schemas, replay and delivery guarantees. Kafka in a logging path does not establish a transaction integration bus. |
| Is “file-and-synchronous-API is the norm” an evidence-backed industry conclusion? | **No.** The researched publications demonstrate a mixture of files, request/response APIs, event streams and webhooks. They do not establish industry market share or a universal integration norm. | [uncertain] [inference] Comparative conclusion from the evidence tables below. [verified] [public, vendor-stated] Specific counterexamples: [XTS][XTS], [ODIN][ODIN], [NinjaFox events][NFW], and [SecMark back office][SBO]. |

## 2. Saral Information Technologies / MoneyMaker

### 2.1 What Saral itself publishes

| Product or topic | Public statement, tightly scoped | What it does **not** establish | Evidence |
|---|---|---|---|
| Money Maker Client Solo / dealer terminal | Multi-exchange dealer trading in one application; NSE, BSE, MCX and NCDEX; SPAN margining and RMS. | [unknown] Exact current product-to-facility mapping, licensed segments, external APIs and cross-exchange risk-netting rules. | [verified] [public, vendor-stated] [Solutions][SS]. |
| Browser | Web-facing trading, analysis, order management and reporting across exchanges/segments. | [unknown] External browser SDK, embeddable components or public HTTP/WebSocket protocol. | [verified] [public, vendor-stated] [Solutions][SS]. |
| Handy | Mobile trading across exchanges/segments. Its feature list includes news API integration and standard back-office integration. | [unknown] A customer-facing trading API cannot be inferred from an API used to import news. | [verified] [public, vendor-stated] [Solutions][SS], [Features][SF]. |
| Challenge / Auto Trader / Modeler | Challenge is integrated into Money Maker Client for exchange-approved algorithm execution; Auto Trader has risk safeguards; Modeler creates algorithms. | [unknown] Supported programming language, external strategy SDK, order callback contract, FIX session or algorithm registration for this broker. | [verified] [public, vendor-stated] [Solutions][SS]. |
| Challenge data/strategy features | Lists triggers, hedging, strategy-related differences and direct multicast. | [unknown] What is multicast, its direction, packet format, accessibility or whether it contains orders/trades. | [verified] [public, vendor-stated] [Features][SF]. |
| Pharos | Named as a MoneyMaker tool. | [unknown] A separately licensed service, public API or event system is not established by that name. | [verified] [public, vendor-stated] [Features][SF]. |
| Dealer observability | Lists an RMS failed-order book, exposure and net-obligation views. | [unknown] Programmatic subscriptions to those views. | [verified] [public, vendor-stated] [Features][SF]. |
| File handling | Lists bulk file upload and a configurable backup-file format. | [unknown] An interface specification, supported integration datasets, transport or automation contract. | [verified] [public, vendor-stated] [Features][SF]. |
| Live behaviour | Describes real-time market information and trading features. | [unknown] A public stream of client limits, collateral changes or risk decisions. | [verified] [public, vendor-stated] [Solutions][SS], [Features][SF]. |

### 2.2 Integration mechanisms: what is established and what remains unknown

| Interface sought | Finding | Evidence / provenance |
|---|---|---|
| Trading/order API | No public endpoint catalogue, request/response specification, downloadable SDK or developer portal located. | [unknown] [Saral site][SH], [Solutions][SS], [Features][SF]; targeted searches recorded below. |
| FIX to broker applications | No Saral-published northbound FIX specification located. | [unknown] External client integration remains unestablished. The phrase about not fixing a strategy on the feature page is not a FIX-protocol claim. [SF] |
| FIX to an exchange | NCDEX publishes Saral in its **FIX-empanelled CTCL vendor** list, for CTCL/IBT/STWT. | [verified] [third-party] **Exchange-primary**, [NCDEX FIX list][NCFIX]. This establishes the listed exchange-facing classification, not a FIX endpoint that a broker may consume. |
| File import/export | Actual terminal-oriented CSV batch-order import is described in a broker-hosted manual; see the separately classified evidence below. | [verified] [third-party] [MoneyMaker manual, printed p.7][SMAN]. [unknown] Current server-to-server file integration contract. |
| Database / ODBC / JDBC / SQL / CDC | No supported database integration specification, schema or change-data-capture interface located. | [unknown] Search finding; [vendor publication scope][SH]. Do not invent a database type or integration table name. |
| WebSocket / SSE / webhook / message queue | No public contract located for MoneyMaker order, trade, position, margin or limit events. | [unknown] Search finding; [vendor publication scope][SF]. “Direct multicast” cannot supply the missing contract. |
| RMS limit reads and writes | No public limits endpoint, limit upload layout, acknowledgements or update-conflict semantics located. | [unknown] [Vendor product descriptions][SS]; broker policies describe behaviour but not this interface. |
| Margin exposure to other systems | No public margin-calculation/available-margin interface or push schema located. | [unknown] SPAN functionality and an on-screen margin view do not identify a machine interface. [SS], [SMAN] |
| Back-office integration | Integration is advertised; its mechanics and counterparties are not specified. | [unknown] API versus file versus database, push versus pull, scope, cadence and Saral–SecMark connector availability. Vendor claim itself is recorded in §2.1. |
| Multi-exchange coverage | Exchange names are vendor-stated; a broker-hosted manual provides a more granular historical segment list. | [unknown] Current NSE/BSE currency enablement and every NSE/BSE/MCX product/version combination require the actual vendor/exchange matrix. Multi-exchange support does not prove common limits or automatic cross-exchange netting. |
| Algo integration | Built-in algorithm functionality is public; a third-party development interface is not established. | [unknown] Auto Trader/Modeler programming contract, deployment process, strategy lifecycle and external event callbacks. [SS] |

### 2.3 Broker-hosted evidence — useful, but not Saral's current developer documentation

| Publisher / artefact | What is actually published | Interpretation and freshness limit |
|---|---|---|
| Matalia-hosted MoneyMaker User Guide, printed p.5 | Lists NSE cash/F&O/currency, BSE cash/derivatives/currency, MCX and NCDEX. | [verified] [third-party] [Manual][SMAN]. [uncertain] Current product coverage: the document's supported release and present validity are not established. |
| Same manual, pp.7–8 | Describes CSV order batches, exposure displays and terminal holding information. | [verified] [third-party] [Manual][SMAN]. [unknown] It does not establish an unattended back-office server interface. |
| Same manual, p.38 | Pharos appears under market functions with signals, strategy selection and composing/saving strategies. | [verified] [third-party] [Manual][SMAN]. [uncertain] Best evidence of its UI role; not proof of an external programming interface. |
| Same manual, p.115 | Describes downloading/loading SPAN files and loading client positions for margin calculation. | [verified] [third-party] [Manual][SMAN]. [unknown] A terminal workflow does not establish automated margin-file application in the production RMS. |
| Equirus RMS policy | Names MoneyMaker/Saral; describes ID-, client- and scrip-level limits, daily exposure-limit updates and VaR/ELM checks before allowing an order through. | [verified] [third-party] [Equirus policy][EQ]. This is a broker's published operating policy, not a Saral technical specification. [unknown] Update transport, read interface and intraday eventing. |
| Trimurti RMS policy | Publishes substantially the same MoneyMaker limit/check description. | [verified] [third-party] [Trimurti policy][TRI]. [uncertain] Similar wording is not proof of independent technical validation; the two policies are not promoted to a “[likely]” API capability. |

## 3. SecMark: middleware, public documentation lineage and operational interfaces

### 3.1 What the middleware claims to do

| Function | SecMark's published scope | Interface / ownership boundary | Evidence |
|---|---|---|---|
| Identity and order orchestration | Access/user management, order orchestration and book building. | [unknown] Exact orchestration state machine and whether book building means the order/trade books or something else in a particular module. | [verified] [public, vendor-stated] [Technology][ST]. |
| Risk and margin | Explicitly claims real-time risk checks and margin validation. | [unknown] Which checks are executed locally, delegated to an OMS/RMS, authoritative, cached or configurable. | [verified] [public, vendor-stated] [Technology][ST]. |
| Trade lifecycle | Trade lifecycle management, reconciliation, reporting/analytics, audit trails and regulatory data flows. | [unknown] This marketing statement is not an endpoint catalogue for allocation, clearing, settlement or regulatory submission. | [verified] [public, vendor-stated] [Technology][ST]. |
| Integration scope | Claims integration with OMS/RMS platforms and major exchanges; mobile/web offerings advertise open APIs. | [unknown] A tested connector for Saral, exact exchange adapters and facility permissions. | [verified] [public, vendor-stated] [Technology][ST]. |
| Market and instrument services | Streaming prices, watchlists, a common contract master, charts, historical OHLC and broadcasts. | [unknown] Current segment entitlement and production feed contract for the proposed broker. | [verified] [public, vendor-stated] [Middleware product page][SMW]. |
| Trading and account visibility | Orders, baskets, positions/holdings/P&L, funds/balance updates and margin calculators; alerts for prices, margin calls and portfolio changes. | [unknown] Marketing “live” does not identify an event subscription for every entity. | [verified] [public, vendor-stated] [Middleware product page][SMW]. |
| Operations tools | Control Tower for orders, feeds and margins; content/research, analytics, screeners and mutual funds are also listed. | [unknown] These product components need not share one API or licence. | [verified] [public, vendor-stated] [Middleware product page][SMW]. |
| Capacity claims | The technology page claims capacity beyond three times the load; the specific middleware page gives other relative processing/capacity claims. | [uncertain] No public reproducible benchmark or contracted workload envelope established. Do not turn these marketing comparisons into an SLA. | [verified] [public, vendor-stated] [Technology][ST], [Middleware][SMW]. |
| Does SecMark claim to own the underlying OMS/RMS? | Its FY2025–26 annual report describes API connections to OMS/RMS and says its own OMS/RMS offering remains a gap it intends to fill through development. | **Proposed development**, not proof of a released native OMS/RMS. [unknown] Any subsequent launch by the research cut-off. | [verified] [public, vendor-stated] [Annual report, Management Discussion & Analysis, printed p.39][SAR]. |

### 3.2 The CodiFi / NinjaFox documentation finding

| Evidence link | Finding | Confidence and exact attribution |
|---|---|---|
| Corporate acquisition | SecMark's FY2025–26 report says it acquired trading web/mobile platforms, middleware/software and related IP from Codifi Finserv Private Limited and Codifi Soft Tech Private Limited; it also describes ongoing development/support arrangements. | [verified] [public, vendor-stated] [Annual report, Directors' Report and MD&A][SAR]. This is stronger evidence than a reseller's partnership description. |
| Product-name connection | SecMark's own middleware page refers to **Ninja Fox**. | [verified] [public, vendor-stated] [Middleware page][SMW], retrieved directly even though the search-browser fetch returned a cache miss. |
| Public developer documentation | `ninjafox.codifi.in` publishes a **Middleware API Document** whose introduction names NinjaFox, provides architecture and documents live/sandbox base URLs. | [verified] [public, vendor-stated] **CodiFi/NinjaFox publication**, [Introduction][NF]. No authenticated portal was needed to read it. Availability of working credentials was not tested. |
| What can be concluded | Public technical documentation exists for the acquired middleware lineage; saying simply “SecMark has no public API documentation” would omit material evidence. | [uncertain] [inference] Mapping rests on [SecMark's named product][SMW], [acquisition disclosure][SAR] and [NinjaFox introduction][NF]. The exact current supported version is not established. |
| What cannot be concluded | Every published NinjaFox route is included, supported and enabled in the broker's SecMark contract; it is a verified Saral adapter; or its documentation is a current SecMark support commitment. | [unknown] Require a product/version/support mapping and integration kit from SecMark. |

### 3.3 Actual published interface detail in the related NinjaFox suite

The identifiers below are transcribed from the cited documentation. They are examples of published interface detail, not newly proposed API names. **[unknown]** Deployment-specific base URLs, credentials and supported versions must be obtained from the supplier.

| Surface | Published operations / fields | Transport and event meaning | Evidence |
|---|---|---|---|
| Order lifecycle | `POST /orders/web/execute`, `GET /info/orderbook`, `POST /info/history`, `POST /orders/modify`, `POST /orders/cancel`, `GET /info/tradebook`. | HTTP request/response operations for submission, amendment, cancellation and lifecycle retrieval. | [verified] [public, vendor-stated] [NinjaFox Orders][NFO]. |
| Margin estimate | `POST /orders/getmargin`. | Returns an order's margin requirement. [unknown] This alone does not establish atomic funds reservation or the final pre-trade approval decision. | [verified] [public, vendor-stated] [Orders][NFO]. |
| Funds and limits | `GET funds/limits`; response fields include `availableMargin`, `marginUsed`, `payin`, `stockPledge`, `exposure`, `span`, `premium`, `cdsDay`, `cdsNrml`, `mcxDay`, `mcxNrml`. | Request/response fund/margin snapshot, including currency/commodity distinctions. [unknown] A corresponding published push event or administrative limit-write API was not located. | [verified] [public, vendor-stated] [Funds][NFF]. |
| Portfolio | `GET /holdings/`, `GET /holdings/mtf/`, `GET /positions/`, `POST /positions/conversion`. | Holdings, MTF holdings, positions and conversion. [unknown] Position streaming is not established by these HTTP routes. | [verified] [public, vendor-stated] [Portfolio][NFP]. |
| Market stream | Market/depth subscriptions and acknowledgements are documented. | WebSocket market data. | [verified] [public, vendor-stated] [WebSocket documentation][NFW]. |
| Order stream | The detailed section gives `GET open-api/order-notify/ws/createWsToken` and `wss://<Base URL>/open-api/order-notify/websocket`; authentication uses `orderToken` and `userId`. | WebSocket order-status updates, including a sample margin rejection. | [verified] [public, vendor-stated] [Order Status Feed][NFW]. |
| Order webhooks | `/api/webhook/subscribe` and `/api/webhook/unsubscribe`; registration uses `callbackUrl`, with bearer authentication. | Asynchronous order updates; examples include order/execution identifiers, status and fill information. | [verified] [public, vendor-stated] [Webhook Order Updates][NFW]. |
| Delivery contract | The pages above were not found to specify durable replay, retry/backoff, webhook signatures, ordering guarantees or an exactly-once contract. | [unknown] Do not fill these gaps with assumptions. Endpoint prefixes also differ between the order-stream detailed section and its summary; confirm against a supported specification. | [unknown] [Reviewed event page][NFW]. |
| Reconciliation API | Marketing claims reconciliation, but a specific exchange/back-office reconciliation service contract was not located in this public API set. | [unknown] There is no verified mapping from SmartReco import/matching jobs to a NinjaFox route. | [ST], [NFO], [SRECO]. |
| Internal message technology | The architecture diagram shows transactional/other logs flowing through **Apache Kafka** to a log database; it separately shows OMS/RMS adapters, back-office platforms, broadcast and market-data components. | [unknown] External Kafka access or order/position/limit topic interfaces. | [verified] [public, vendor-stated] [Architecture diagram][NFA], visually inspected. |

### 3.4 Back office and the adjacent SecMark products

| Product | Publicly described integration or real-time behaviour | What remains unestablished | Evidence |
|---|---|---|---|
| Broking back office | API integration with banks, front office and drop-copy feeds; bank receipt import; bank-statement and DP-file reconciliation; holdings export for front-office RMS upload. | [unknown] Whether every integration is a direct API, a file adapter or a partner service; drop-copy source, schema, transport and coverage. | [verified] [public, vendor-stated] [Broking back office][SBO]. |
| Back-office coverage | Lists NSE, BSE, MCX, NCDEX, MSEI and GIFT City; describes combined equity/commodity RMS and configurable margin/MTM treatment. | [unknown] Which back-office product/version provides each function, which supported exchange segments are enabled, and whether those controls are authoritative pre-trade checks. | [verified] [public, vendor-stated] [Broking back office][SBO]. |
| SmartReco | File ingestion in Excel/CSV/XML/text; consolidation, configurable single/composite-key matching, duplicate/missing-record detection, exception handling and audit/report exports. | [unknown] Public REST job submission, database CDC, event-trigger contract, webhook or message-queue connector. | [verified] [public, vendor-stated] [SmartReco][SRECO]. |
| SmartReco real-time language | Describes on-demand scheduling/execution and progress visibility. | [unknown] Fast reconciliation of imported files does not prove continuous consumption of trade events. Performance/accuracy advertising was not independently tested. | [verified] [public, vendor-stated] [SmartReco][SRECO]. |
| Partner Portal | Referral links, assisted onboarding, status/rejection/activation tracking, revenue/scheme visibility and central controls; claims live status visibility. | [unknown] Partner event webhook or public API schema. | [verified] [public, vendor-stated] [Partner Portal][SPART]. |
| C-Safe | Client screening across domestic/global negative lists, including PEP; continuous screening is advertised. | [unknown] Screening API, list-change event, callback payload, rescreen cadence or guaranteed update latency. | [verified] [public, vendor-stated] [Technology][ST]. |
| AML Sutra | Surveillance/transaction monitoring and STR output in FINNet 2.0 format. | [unknown] A public transaction-ingestion contract, alert stream or direct FIU submission API. | [verified] [public, vendor-stated] [Technology][ST]. |
| ComplianceSutra | Workflow/monitoring across governance, risk, compliance, audit, project and task modules. | [unknown] Programmatic task/event integration, evidence export schema and change-notification protocol. | [verified] [public, vendor-stated] [Technology][ST]. |

## 4. Other suppliers: documented event interfaces versus marketing

| Supplier / product | What is publicly published | Orders / trades / positions / limits distinction | Documentation level and source |
|---|---|---|---|
| **Symphony Fintech — XTS** | Interactive API documentation with Socket.IO connections and server events for orders, executions and positions; HTTP operations alongside them. | Explicit order/trade/position events. [unknown] A limit-change event or universal broker-wide admin stream was not established. | [verified] [public, vendor-stated] [Current documentation][XTS], [older versioned documentation][XTSOLD]. Includes payloads and code, not only a feature list. |
| **Synapsewave Innovations — ODIN** | Public B2C API documentation, OpenAPI/Postman/SDK download links and a Socket.IO streaming-server example. `MSG:DATA` carries order/trade responses; `MessageType` distinguishes `ORD_NRML` and `TRD_MSG`. | Order/trade push is explicit. Position, holdings and limit retrieval are documented API/report functions; [unknown] a matching limit-push contract. | [verified] [public, vendor-stated] [ODIN B2C][ODIN], [Cloud REST][ODINC]. ODIN ownership attribution follows the completed business sale disclosed by [63 moons on 20 January 2025][ODSALE]. |
| **Kambala Solutions — Noren OMS** | Vendor product page offers integration APIs/FIX. The `kambalatech` .NET repository documents REST plus WebSocket, order updates, positions, limits and order/basket margin operations. | WebSocket order updates; `PositionsBook` and `Limits` are documented operations. [unknown] Do not recast a callback for an HTTP response as a continuous limit subscription. | [verified] [public, vendor-stated] [Noren product][KAMBALA], [SDK][NOREN], [Java SDK][NORENJ]. This is Noren evidence, not an OmneNEST/NEST specification. |
| **CodiFi / NinjaFox, acquired middleware lineage now associated with SecMark** | Public order WebSockets and order webhooks, plus HTTP funds/portfolio APIs. | Event delivery for orders; limit and position snapshots separately documented. | [verified] [public, vendor-stated] [Documentation][NF], details and applicability caveats in §3. |
| **Greeksoft** | Advertises FIX integration with tag/symbol remapping and institutional FIX sources. | [unknown] No public event schema or limit-push contract verified here. Its separately titled upcoming-products page describes trading/data/portfolio APIs; publication there is not proof of general availability. | [verified] [public, vendor-stated] [Main site][GREEK], [upcoming-products page][GREEKUP]. [uncertain] Release status of those newer API claims. |
| **Rupeeseed** | Its API/algo article discusses REST/WebSocket APIs and says platforms may provide webhooks/event notifications. | [unknown] This general explanatory article is not a Rupeeseed product-specific webhook or margin-event contract. | [verified] [public, vendor-stated] [Vendor article][RUPEE]. Included to avoid converting industry commentary into a delivered feature. |
| **OptionX enterprise** | Advertises market-data distribution using WebSocket and UDP multicast, alongside an OMS with risk/margin functions. | Market-data streaming is explicit. [unknown] Order, position and limit event interfaces do not follow from market-data fan-out. | [verified] [public, vendor-stated] [TBT/OMS product page][OPTIONX]; marketing-level evidence, not a public wire specification. |
| **Devexperts / DXtrade — international supplier serving an Indian broker** | An India-specific OMS/RMS case study describes an event-driven system and publishes system/workflow/deployment diagrams. | Evidence that such architecture is publicly described for Indian broking. [unknown] A reusable external bus contract for another broker. | [verified] [public, vendor-stated] [Case study, 17 July 2023][DEVEX]. Not presented as an India-incorporated vendor or evidence of Saral/SecMark behaviour. |
| **Shoonya / Finvasia — broker API comparator, not a substitute for vendor documentation** | Publishes a WebSocket gateway for market/depth and order-status feeds. | Verifies that broker's exposed API; does not prove a common interface across every Noren installation. | [verified] [third-party] Broker-primary [WebSocket overview][SHOONYA], [API introduction][SHOONYAINTRO]. |

## 5. Exchange empanelment, product registration and deployment verification

### 5.1 Public lists and concrete findings

| Exchange / register | What is public and what was verified | Limits and operational implication | Evidence |
|---|---|---|---|
| NSE vendor/ASP lists | NSE publishes links for empanelled vendors and ASPs. The vendor download link resolved to an XLSX despite its visible ZIP label. | [unknown] The spreadsheet contents could not be retrieved in this run; do not invent its current rows. | [verified] [third-party] **Exchange-primary**, [NSE list page][NSELIST], [observed XLSX target][NSEXLS]. |
| NSE Saral listing | The 30 April 2026 NNF consolidated circular lists Saral among empanelled vendors, printed p.13. | [unknown] Exact MoneyMaker product/version/facility registration and any later change in status. | [verified] [third-party] **Exchange-primary**, [NSE/INVG/73992, §2.2.1][NSEMASTER]. Original PDF was inspected from the existing research cache; direct fresh ZIP retrieval timed out. |
| NSE separate product registration | Vendor software registration is explicitly a separate process; separate applications are required for each product. Member registration is another process. | A vendor name on a list does not approve all products or this broker's installation. | [verified] [third-party] **Exchange-primary**, [NNF circular §§12.3, 12.5.3 and 2.2][NSEMASTER]. |
| BSE vendor list | BSE's published colocation guidelines point to a public IML empanelled-vendor list URL. | [unknown] Current list rows, Saral/SecMark status and product/version matrix could not be inspected because the BSE page/download fetches were blocked. The historical URL label does not establish the current production protocol. | [verified] [third-party] **Exchange-primary publication pointer**, [BSE guidelines][BSEGUIDE]; [list URL cited in BSE's indexed document][BSELIST]. Read-access limitation recorded, not replaced with an assumed list. |
| MCX trading vendors | The readable classic exchange page lists **Saral: CTCL Yes, IBT Yes, WT Yes; ATF No, ASP No, DMA No**. | [uncertain] Treat these as the published table's classifications, not a fresh exchange confirmation. It is unsafe to infer MCX ATF permission from Saral's Challenge marketing. | [verified] [third-party] **Exchange-primary**, [MCX classic vendor table][MCXCLASSIC]. |
| MCX current registration page | The current page lists Saral in its trading-vendor table and **Secmark Consultancy Limited** in its back-office vendor list. | [unknown] Image-only status cells in the current trading table do not reliably expose Yes/No values in extracted text. Back-office empanelment does not establish middleware/OMS/API/algo approval. | [verified] [third-party] **Exchange-primary**, [MCX registration page][MCXREG]. |
| NCDEX: useful example outside the requested deployment | Its public product/version list identifies Saral Money Maker Client for CTCL, Solo for IBT and Handy for STWT; separate FIX-vendor list also names Saral. | [unknown] These listings cannot be transferred to NSE, BSE or MCX. Current marketing names do not necessarily map one-to-one to registered names. | [verified] [third-party] **Exchange-primary**, [product/version table, p.2][NCVER], [FIX list][NCFIX]. |

### 5.2 How the broker should verify a vendor

| Verification layer | Concrete evidence to obtain / compare | Basis |
|---|---|---|
| Legal supplier and category | Match legal vendor name and any business-transfer history with each exchange's current vendor/ASP/algo-provider/back-office category. | [recommendation] Based on [verified] separate [NSE vendor/ASP lists][NSELIST] and [MCX categories][MCXREG]. Do not combine categories into “exchange approved”. |
| Registered product | Obtain the exchange registration/approval evidence identifying the exact product, release, facility, exchange and segment being supplied; compare with deployment inventory. | [recommendation] Based on [verified] [NSE product-registration separation][NSEMASTER] and [NCDEX public product/version example][NCVER]. [unknown] A public consolidated product registry covering every NSE/BSE/MCX deployment was not located. |
| Member's deployment | Obtain this broker's own application, acknowledgement and approval, with the applicable testing/auditor evidence. | [verified] [third-party] **Regulator/exchange-primary**, [SEBI software-testing and approval §§5–8][SEBITEST], [NSE NNF §2.2][NSEMASTER], [MCX technology FAQ][MCXFAQ]. Vendor empanelment alone is insufficient. |
| NSE channel and formats | NSE describes ENIT for relevant NNF registrations; SOR has a separate physical-submission route in the consolidated circular. Check subsequent format changes. | [verified] [third-party] **Exchange-primary**, [NSE NNF §2.2][NSEMASTER], [current CTCL page][NSECTCL]. Do not substitute the vendor's developer portal for exchange registration. |
| MCX implementation and change | Its FAQ describes documentation, test environment, mock/simulation, auditor certification and approval; major functionality/RMS version changes have a further process. | [verified] [third-party] **Exchange-primary**, [MCX FAQ][MCXFAQ]. [uncertain] FAQ annexure numbering may be legacy; reconcile against the current master before filing. |
| BSE implementation | Ask BSE/member services for the current product/facility registration record and compare it with the vendor confirmation and proposed build. | [recommendation] [unknown] A current BSE-specific product registration screen/form sequence was not verified in this research; no portal path is invented. [SEBITEST] supplies the securities-market approval baseline. |
| Scope of approval | Record exchange, segment, product/version, channel, strategy where relevant, infrastructure and the broker's approval separately. | [recommendation] Approval scope and interface design answer different questions. [unknown] Empanelment does not establish any unlisted REST/WebSocket/Kafka capability. |

### 5.3 Publication versus effective or proposed status

| Item | Published / notified | Effective, available or proposed status | Evidence |
|---|---|---|---|
| SEBI testing/approval baseline | 19 August 2013; CIR/MRD/DP/24/2013. | The document explicitly states effectiveness from **1 October 2013**. Used for the underlying approval distinction, not as an exhaustive 2026 implementation checklist. | [verified] [third-party] **Regulator-primary**, [circular §11][SEBITEST]. |
| NSE NNF consolidation | NSE/INVG/73992, **30 April 2026**. | The current NSE service pages cite it. Consolidation date is not a fresh commencement date for every rule compiled within it. | [verified] [third-party] **Exchange-primary**, [circular][NSEMASTER], [CTCL page][NSECTCL]. |
| Subsequent NSE form revision | NSE/INVG/74233, **15 May 2026**. | Revised NNF registration formats effective **18 May 2026**. The retained primary PDF was read; do not use April annexures without checking revisions. | [verified] [third-party] **Exchange-primary**, [revision circular][NSEFORMS]. |
| MCX master reference | MCX's vendor page cites MCX/CTCL/256/2026, **30 April 2026**. | [unknown] No independent effective date for every provision is inferred from this page citation. | [verified] [third-party] **Exchange-primary**, [MCX vendor page][MCXREG]. |
| SecMark's own OMS/RMS | FY2025–26 annual report describes intended development. | **Proposed**, not verified generally available software. | [verified] [public, vendor-stated] [Annual report][SAR]. |
| Public developer pages | NinjaFox, XTS, ODIN and Noren docs were readable. | [unknown] Readable documentation is not proof that every broker can obtain access or that a specific installation runs that release. | [verified] [public, vendor-stated] [NF], [XTS], [ODIN], [NOREN]. |

## 6. Architectural answer for the manual

| Architectural proposition | Evidence-based verdict | Consequence for the named stack |
|---|---|---|
| “No Indian OMS/RMS vendor publishes event-driven integration.” | **False.** XTS, ODIN and Noren provide explicit order-related push interfaces; XTS also documents position events. | [verified] [public, vendor-stated] [XTS][XTS], [ODIN][ODIN], [Noren][NOREN]. [inference] A broker may integrate events where the deployed product contract supports them. |
| “Real-time prices imply live limits and margins.” | **Unsupported.** The public interfaces distinguish market feeds, order events and fund/portfolio reads. | [uncertain] [inference] [NinjaFox events][NFW], [funds][NFF], [portfolio][NFP]. [unknown] A limit-change stream for Saral or NinjaFox was not established. |
| “Kafka appears in a diagram, so the broker can subscribe to orders and limits.” | **Unsupported.** NinjaFox depicts Kafka for logs. | [verified] [public, vendor-stated] [Diagram][NFA]. [unknown] Consumer access, topic inventory, event schemas, retention, cursor recovery and authority over financial state. |
| “All back-office links are nightly files.” | **Unsupported.** SecMark advertises APIs/drop-copy integration as well as file-based reconciliation/export. | [verified] [public, vendor-stated] [Back office][SBO]. [unknown] Actual cadence and transport of the Saral–SecMark link. |
| “File-and-synchronous-API is the industry norm.” | **Not established by public evidence.** The defensible description is a heterogeneous mix; a claim about prevalence needs deployment data. | [uncertain] [inference] Comparative finding, not a statistical survey. The concrete counterexamples above decisively reject an exclusively file/request-response description. |
| Safe manual wording for Saral | “Public material establishes trading/risk features; the external order, trade, limit and margin integration contracts must be obtained from Saral.” | [recommendation] [unknown] Do not specify invented Saral URLs, event names, tables, file layouts or update timings. |
| Safe manual wording for SecMark | “SecMark advertises risk-capable middleware; related NinjaFox public docs demonstrate HTTP, WebSocket and webhook interfaces. Deployed version, adapters and modules require confirmation.” | [recommendation] Supported publication evidence in §3; [unknown] exact production mapping. |
| Event-driven broker architecture | A broker-owned event layer is a design option if supported adapters can provide the necessary data. Specify it as the broker's architecture, with source reconciliation and explicit handling of lost/duplicate/out-of-order events. | [recommendation] [inference] This is not a claimed Saral or SecMark product feature. [unknown] Feasibility and latency until the actual integration contracts are obtained. |
| Risk authority | Document who owns accepted balances, margin reservations, limit changes, order admission and square-off decisions, including failure behaviour between middleware and RMS. | [recommendation] The overlap is vendor-stated in [SecMark's scope][ST] and [Saral's RMS description][SS]; [unknown] responsibility allocation for this broker. |

## 7. Research coverage and source handling

| Search group | Representative queries actually executed |
|---|---|
| Saral discovery | `Saral Information Technology Money Maker API FIX Pharos RMS integration`; `site:saral-info.com products Money Maker RMS API Pharos`; `site:saral-info.com API FIX database back office`; `site:saral-info.com "RMS" "Pharos"`; `site:saral-info.com "Solo" "Browser"` |
| Saral technical and negative searches | `"Saral" "MoneyMaker" "API" "FIX"`; `"Saral" "RMS" "limit" Money Maker`; `"Money Maker" "Pharos" trading`; `"saral-info.com" "websocket" OR "FIX" OR "API documentation" OR "database"`; `"MoneyMaker" "Saral" "API documentation"` |
| SecMark and lineage | `SecMark Middleware API Suite real time risk margin`; `site:secmark.in "Middleware"`; `site:secmark.in "API" "risk"`; `site:secmark.in "SmartReco" "API"`; `site:secmark.in API documentation websocket middleware`; `site:codifi.in API websocket middleware risk`; `"SecMark" "CodiFi" middleware`; `site:secmark.in "Codifi" "December"` |
| Event-interface comparators | `Symphony Fintech XTS websocket order trade position documentation`; `Kambala Noren websocket API documentation`; `ODIN API documentation websocket Synapsewave`; `site:synapsewave.com/api "WebSocket" "Order"`; `site:rupeeseed.com API websocket event driven`; `site:greeksoft.co.in OR site:greeksoft.com API websocket FIX` |
| Message-bus hypothesis | `Indian OMS RMS vendor "Kafka" "API"`; `Indian OMS RMS vendor Kafka RabbitMQ event driven message bus`; `"trading" "OMS" "message bus" "India"`; `"OMS" "event-driven" "uTrade"`; `"Noren" "message" "bus"`; `"Symphony" "XTS" "Kafka" OR "message queue"` |
| Exchange verification | `site:nseindia.com empanelled software vendors registered products Saral`; `site:nseindia.com empanelled vendors NNF software Saral`; `site:bseindia.com empanelled ISV CTCL vendor Saral Money Maker`; `site:mcxindia.com empanelled software vendors CTCL Saral`; `BSE IML empanelled vendor list Saral Information Technologies`; `"BSE" "List of empanelled vendors" software` |

| Retrieval issue / exclusion | Handling |
|---|---|
| SecMark search cache versus live site | [verified] [research observation] The search-browser copy of the [announcements page][SANN] exposed an older site; direct retrieval exposed current pages and the FY2025–26 report. The current annual report and directly read middleware page anchor the lineage finding. |
| NSE downloads | [verified] [research observation] Current list/circular landing pages were readable, but fresh archive requests timed out. Previously retained original NSE circular PDFs were inspected directly; the unavailable XLSX was not treated as read. |
| BSE blocking | [verified] [research observation] List/guideline direct requests returned access errors. The indexed primary guideline establishes a public-list pointer; current list contents remain [unknown]. |
| Secondary technical material | [verified] [research observation] Broker-hosted MoneyMaker manual and RMS policies are segregated in §2.3. No claim of Saral API availability is based on them. |
| False matches | [unknown] No relevance was established for unrelated Saral tax/ERP APIs or unrelated Pharos print-management APIs; they were excluded. |
| Generic engineering articles / recruiting pages | [unknown] They do not establish a named vendor's shipped interface or a production architecture and were not used for that purpose. |
| Commercial benchmark language | [uncertain] Vendor adjectives, throughput comparisons and broad compliance claims were not independently validated or converted into acceptance criteria. |

## Source links

References are grouped here for maintainability; the claim-level citations above identify their scope.

[SH]: https://www.saral-info.com/
[SS]: https://www.saral-info.com/solutions
[SF]: https://www.saral-info.com/features
[SMAN]: https://www.matalia.co.in/wp-content/uploads/2023/03/MoneyMaker-User-Guide.pdf
[EQ]: https://cdn.equiruswealth.com/web/files/pdf/policies/RMS%20Policy.pdf
[TRI]: https://trimurticapital.in/pdf/2%20RMS%20Policy.pdf
[ST]: https://www.secmark.in/technology
[SMW]: https://www.secmark.in/middleware-and-api-suite
[SBO]: https://www.secmark.in/broking-backoffice
[SRECO]: https://www.secmark.in/smartreco
[SPART]: https://www.secmark.in/partner-portal
[SANN]: https://www.secmark.in/st-ex-announcements
[SAR]: https://cdn.prod.website-files.com/69ae61a43b387c927730d766/6aa2b10d4813f29d16a3d26c_Reg.%2034%20(1)%20Annual%20Report%20(4).pdf
[NF]: https://ninjafox.codifi.in/
[NFO]: https://ninjafox.codifi.in/orders/
[NFW]: https://ninjafox.codifi.in/Websocket/
[NFF]: https://ninjafox.codifi.in/Funds/
[NFP]: https://ninjafox.codifi.in/portfolio/
[NFA]: https://ninjafox.codifi.in/assets/images/Group%2037.svg
[XTS]: https://symphonyfintech.com/xts-trading-front-end-api-v2/
[XTSOLD]: https://www.symphonyfintech.com/interactive/doc/index.html
[ODIN]: https://www.synapsewave.com/api/b2capi/
[ODINC]: https://www.synapsewave.com/api/ODINRestAPI/
[ODSALE]: https://www.63moons.com/investors/corporate-announcement/Disclosures/ODINletter20012025.pdf
[KAMBALA]: https://kambala.co.in/noren-oms/
[NOREN]: https://github.com/kambalatech/NorenApi-dotNet
[NORENJ]: https://github.com/kambalatech/NorenApi-java
[GREEK]: https://www.greeksoft.co.in/
[GREEKUP]: https://greeksoft.co.in/upcomingProducts/
[RUPEE]: https://www.rupeeseed.com/api-based-algo-trading-platforms-empowering-quantitative-traders-and-developers/
[OPTIONX]: https://optionx.trade/enterprise/tbt-feed-engine
[DEVEX]: https://devexperts.com/case-studies/high-load-order-management-system-for-a-major-indian-retail-broker/
[SHOONYA]: https://www.shoonya.com/api-documentation/websocket-overview
[SHOONYAINTRO]: https://www.shoonya.com/api-documentation
[NSELIST]: https://www.nseindia.com/static/trade/platform-services-non-neat-empanelled-vendors-of-the-exchange
[NSEXLS]: https://nsearchives.nseindia.com/web/mediaattachment/2026-05/eq_inetvendors_20260522161332.xlsx
[NSEMASTER]: https://nsearchives.nseindia.com/content/circulars/INVG73992.zip
[NSEFORMS]: https://nsearchives.nseindia.com/content/circulars/INVG74233.zip
[NSECTCL]: https://www.nseindia.com/static/trade/platform-services-non-neat-ctcl
[BSEGUIDE]: https://www.bseindia.com/markets/MarketInfo/DownloadAttach.aspx?attachedId=4c504b01-0b41-459f-9878-d26e1387ed02&id=20250812-34
[BSELIST]: https://www.bseindia.com/static/markets/Derivatives/DeriReports/IMLEmpanalledVendorList.aspx
[MCXREG]: https://www.mcxindia.com/technology/ctcl/empanelment-registration
[MCXCLASSIC]: https://classic.mcxindia.com/technology/ctcl/ctcl-vendor-empanelment
[MCXFAQ]: https://www.mcxindia.com/gu/faq/technology-services
[NCVER]: https://www.ncdex.com/public/uploads/pages/List%20of%20Empanelled%20Vendors%20version%20and%20strategy%20details_Ver6.pdf
[NCFIX]: https://ncdex.com/public/uploads/pages/List%20of%20FIX%20Empanelled%20CTCL%20Vendor.pdf
[SEBITEST]: https://www.sebi.gov.in/sebi_data/attachdocs/1376969894633.pdf

## Gaps and cautions

| Gap / caution | Required next evidence or safe treatment |
|---|---|
| Saral external interfaces | [unknown] Obtain the supported integration catalogue, current schemas, sample files, authentication rules, version matrix and a working test environment. No public OMS/RMS developer contract was located. |
| Saral limits and margin | [unknown] Obtain read/write semantics, fund/collateral-to-limit flow, atomicity, acknowledgement, rejection handling, audit history and restart/reconciliation behaviour. A broker policy's daily update statement is not an interface SLA. |
| Saral–SecMark connector | [unknown] Obtain a signed-off compatibility matrix and actual interface/control ownership. No public evidence establishes the particular pair's production wiring. |
| SecMark/NinjaFox version mapping | [uncertain] The lineage is evidenced, but the acquired code, public CodiFi docs and contracted SecMark deployment need an explicit supported-version mapping. |
| Risk functions versus core RMS | [uncertain] SecMark markets risk checks in middleware while its annual report describes plans for its own OMS/RMS. Obtain the boundary between middleware checks and the connected RMS's authoritative decision. |
| Event completeness | [unknown] Ask which events cover all entry channels, dealer/manual changes, partial fills, corrections, cancellations, square-offs, fund changes and collateral changes. A client-scoped stream need not cover the broker's entire book. |
| Recovery and event security | [unknown] Confirm sequencing, deduplication, gap detection, replay/snapshot recovery, session expiry, webhook verification, retries, outage behaviour and retention. Published streaming alone does not answer these questions. |
| Public bus contract | [unknown] No external Kafka/AMQP topic contract for Saral or SecMark was established. NinjaFox's Kafka logging diagram must not be relabelled as a durable order/position/limit event bus. |
| Exchange approval | [unknown] Recheck current lists and obtain product/version/facility/segment and member-specific approvals. [verified] [third-party] The [classic MCX table][MCXCLASSIC] marks Saral's ATF column **“No”**; [uncertain] current applicability. Verify the intended algo deployment directly with MCX. |
| Public-source freshness | [uncertain] Undated pages, legacy manuals, stale search caches and inaccessible BSE/NSE downloads prevent certification of a complete current product inventory. A documented endpoint is not a tested production service. |
| Proposed versus available | [unknown] No completion date is invented for SecMark's proposed native OMS/RMS. Greeksoft's upcoming-products page is not treated as a release announcement. |
| Industry generalisation | [uncertain] The research establishes concrete event-interface counterexamples and public file/API mechanisms. It does not establish which model dominates installed Indian broking systems. |

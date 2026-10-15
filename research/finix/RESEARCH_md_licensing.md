# Indian exchange market-data licensing and broker client delivery — 2026

## Evidence and scope

| Item | Treatment |
|---|---|
| Research cut-off | [verified] Primary documents retrieved on 15 October 2026; individual document dates and retrieval limitations appear in the source register below. [S1–S29] |
| Claim labels | `[verified]` = directly read in a primary source; `[uncertain]` = interpretation or application to a proposed architecture; `[unknown]` = not established by the cited sources. `[likely]` is reserved for strong secondary evidence and is deliberately unused because this report uses primary sources only. |
| Meaning of an absence | [unknown] “Not established” does **not** mean an agreement, obligation or fee does not exist; it identifies a missing authoritative instrument. No broker-specific executed agreements were available for this review. [S1, S6, S9, S12] |

## 1. Member access, client display and redistribution

| Exchange / issue | Finding |
|---|---|
| NSE membership feed | [verified] NSE supplies live feeds as part of membership. Additional market-data subscriptions go through NSE Data & Analytics Limited and the applicable documentation. The policy calls the contractual instrument the “Relevant Agreement”; it can take different forms. [S1, Live Feed Data to Trading Members; Definitions] |
| NSE registered clients | [verified] The 30 April 2026 market-data circular permits use by clients registered to trade with the member on NSE in any segment. [S2, p.12, General Notes] |
| NSE purpose restriction | [verified] The 20 April 2023 circular confines client use to legitimate trading and prohibits gaming/virtual-trading use. It also reiterates the earlier internal-use/no-redistribution instruction. [S3] |
| NSE apparent conflict | [verified] The 2014 circular says member-received data is for internal use without redistribution; the 2026 circular expressly allows registered-client use and still references the 2014 circular. Both provisions therefore need to be read together. [S4; S2, p.12] |
| NSE own retail app | [uncertain] An authenticated app serving the member's registered trading clients for trading is supported by S2/S3. A separate vendor licence is **not established as universally necessary merely because WebSocket transport is used**. Conversely, these sources do not establish unrestricted onward-feed, anonymous-user or third-party-platform rights. [S2–S4] |
| NSE redistribution rights | [verified] Redistribution is forbidden except as agreed contractually; data ownership remains with NSE/NSE Data. A feed connection is not ownership of the data. [S1, Limitations on Usage] |
| BSE domestic contractual route | [verified] BSE's subscription portal requires registration/KYC, plan selection, agreement on pricing/contracts and payment. [S9] [unknown] The precise current member market-data undertaking, client-app grant and domestic vendor-agreement clauses were not publicly established in the sources read. [S9, S10] |
| BSE member website versus app | [verified] The February 2025 tariff separately lists member websites, terminals, charting software and open websites/mobile applications. The member-website row has no real-time price and offers one-minute snapshot/delayed-and-above equity-plus-indices data for ₹50,000/year. [S10, p.6] [uncertain] That row cannot be used to prove either a blanket ban on authenticated trading-app live prices or an automatic free app entitlement. [S10] |
| BSE international route | [verified] Deutsche Börse identifies itself as exclusive licensor of BSE India information products to international customers; electronic dissemination requires its Market Data Dissemination Agreement. [S11] [uncertain] This does not substitute for establishing the domestic Indian broker's contract. [S11] |
| MCX direct subscription | [verified] MCX requires execution of its data-feed agreement before feeds begin; its process includes a request, exchange review, order form, agreement and payment. [S12] |
| MCX member entitlement | [verified] MCX's subscriber-category page permits a member's subscribed feed on its own website and prohibits resale. Redistributors taking an authorised vendor's feed must also contract with MCX; dissemination is restricted to their own authorised delivery media/subscribers. [S13] |
| MCX own retail app | [unknown] An automatic app right arising solely from membership was not established. The public member-category wording is website-specific. Obtain the member's CTCL/IBT/WT undertaking and market-data permission covering authenticated mobile display. [S13, S25] |
| MCX scope control | [verified] Uses on wireless devices, public internet displays or other devices outside the data-feed agreement require explicit exchange permission. [S14] [uncertain] An already authorised app need not be treated as a new vendor business solely because it uses WebSockets; whether the grant covers it is contractual. [S13, S14] |

## 2. What the licence categories mean

| Category | Supported distinction |
|---|---|
| Internal use | [uncertain] Describes the permitted audience/organisation, rather than guaranteeing that every computational use is free. Distinguish internal screen viewing from automated consumption and from transmission outside the permitted audience. [S1, S5] |
| Display use | [verified] NSE's tariff distinguishes internal display from vendor terminal, software/charting and mobile delivery. [S6, §§1.1, 1.3] [uncertain] Rendering quotes for humans and providing a reusable raw feed should be assessed separately, even if both use the same server. [S5 §3.3; S6 p.3] |
| Non-display use | [verified] NSE covers automated trading calculations, algorithms, SOR, valuation, risk management and internal derived-data analysis; display-only/redistribution-only infrastructure is addressed separately. [S5, §§1.3, 3.3] |
| Non-display grant | [verified] NSE requires an agreement/undertaking and direct payment. Enterprise treatment counts legal entities separately; global treatment covers specified subsidiaries in the same business line. External redistribution of derived data needs separate terms and fees. [S5, §§2–3] |
| Vendor licence | [verified] NSE defines a data vendor as an entity in the business of supplying market data to subscribers; MCX distinguishes direct vendors from downstream redistributors. [S5 §1.1; S13] [uncertain] It is an exchange data-rights arrangement, not an entitlement created by stockbroker registration or algo-provider empanelment. [S1, S13, S20] |
| BSE non-display definition | [unknown] A complete domestic BSE non-display policy and fee schedule was not obtained; NSE definitions and overseas BSE licensing terms must not be transplanted into the domestic BSE contract. [S10, S11] |
| MCX non-display | [verified] MCX publishes separate enterprise/global non-display prices and requires approval and fees when vendors supply clients for non-display use. [S16, p.4] [unknown] Its complete signed-contract definitions and any member exemption remain unestablished. [S13, S16] |

### WebSocket and API decision table

| Proposed delivery | Classification / permission result |
|---|---|
| Own authenticated app, own registered trading clients, screen display | [uncertain] A client-display use case; for NSE, S2 supplies affirmative registered-client support. Do not automatically classify every such connection as a separately chargeable vendor terminal. Establish the broker's actual grant and approved frontend. [S2; S22] |
| Publicly documented API, authenticated per client | [uncertain] Public documentation alone does not settle redistribution. A reusable data stream needs an explicit assessment of audience, permitted purpose, automation and downstream rights. S2 does not expressly grant a general raw-feed API licence. [S2, S5, S6] |
| Anonymous public WebSocket / quote API | [unknown] No blanket membership-based permission was found. Establish public dissemination rights before offering it. [S1, S10, S13] |
| Broker supplies third-party platform, which serves many users | [uncertain] Treat as external feed supply/redistribution requiring express permission, even where some platform users are broker clients; their client status does not establish the platform's sublicensing rights. [S1, S13, S19] |
| Each client supplies a broker API key to a third-party platform | [unknown] No primary source read establishes a blanket exemption for this architecture or permits the platform to pool/rebroadcast the resulting feed. Obtain exchange approval addressing the actual flow. [S19–S21] |
| Client's trading algorithm consumes prices | [uncertain] Algo/API trading approval and non-display data permission require separate examination; the former does not establish that every data-use fee is waived. [S5, S20, S21] |
| Free prices bundled with brokerage | [unknown] Charging zero does not establish exemption from data restrictions. No general free-retail-tier exemption was found in the reviewed instruments. [S1, S10, S13] |

## 3. Reporting, counting, audit and breach

| Obligation | Established rule | Not established |
|---|---|---|
| NSE inspection rights | [verified] NSE/NSE Data reserve inspection of books, records and electronic documents, plus reasonably notified spot checks of usage/distribution and end-user information; recipients must cooperate. Misuse can lead to investigation and action following legal advice. [S1, Monitoring and Audit] | [unknown] Contract-specific notice periods, record retention, retrospective assessment formula and penalties. [S1] |
| NSE user/device reporting | [verified] The vendor tariff uses monthly per-user variable charges. [S6 p.2] | [unknown] Monthly billing is not proof of a particular reporting deadline. Enabled-versus-active users, concurrent device treatment, shared logins, multi-device netting, zero returns and annual declarations need the reporting annexure. [S6] |
| NSE non-display breach | [verified] NSE Data may instruct a vendor to stop supplying a client that fails to execute the required instrument or pay non-display fees. [S5 §3.2] | [unknown] A universal additional monetary penalty or cure period. [S5] |
| BSE counts and declarations | [verified] The tariff includes monthly variable fees under terminal/software categories. [S10] | [unknown] Domestic reporting frequency, due dates, device/user definitions, annual certificates, audit rights, audit-cost recovery and breach remedies were not established without the agreement/reporting schedule. [S9, S10] |
| MCX periodic client list | [verified] For variable-fee calculation, MCX requires quarterly client lists by 10 April, July, October and January for the preceding quarter; other reports follow the agreement. [S14] | [unknown] Device deduplication, inactive IDs, multi-device/concurrent-session counting and a universal annual declaration. [S14] |
| MCX count basis | [verified] The tariff bases variable billing on reported ID counts. [S16 p.3] | [unknown] Whether one retail person using multiple devices produces one or multiple billable IDs under a particular contract. [S16] |
| MCX breach | [verified] Failure to pay annual subscription charges on time permits immediate service termination. [S14] | [unknown] Full audit rights, notice, inspection costs, under-reporting damages and other termination/cure provisions. [S12, S14] |
| SEBI governance for third-party sharing | [verified] Agreements must specify activities and justify real-time sharing for orderly market functioning; the intermediary's Board must review recipient entities and activities at least once each financial year. Due diligence, anti-misuse terms and best-effort safeguards apply. [S19 §2] | [uncertain] This Board review is distinct from an exchange user-count return. [S19] |
| Educational-data audit trail | [verified] From 1 July 2026, the amended SEBI provision expressly requires anti-misuse contractual terms including a usage audit trail. [S18 §§6.1, 7] | [unknown] That circular does not establish a fixed retention period for this trail. [S18] |

## 4. Published tariffs and infrastructure charges

[uncertain] The following are selected published line items, not a quotation for a broker's complete stack. A member's trading-feed entitlement, separately licensed vendor feed, transport, hosting and client-facing commercial package must not be assumed to have identical charging treatment. [S1, S6, S10, S16, S23]

### NSE

[verified] Domestic schedule effective **1 April 2026**; figures below are INR, excluding taxes. Annual fixed fees and monthly domestic-user charges are separate. [S6 pp.1–6]

| Product / category | Annual fixed | Monthly/user | Evidence |
|---|---:|---:|---|
| CM terminal L1 | 25,50,000 | 1,145 | [verified] [S6 p.2] |
| CM terminal L2 | 40,00,000 | 1,675 | [verified] [S6 p.2] |
| CM terminal L3 | 42,50,000 | 1,860 | [verified] [S6 p.2] |
| CM terminal TBT | 53,00,000 | 2,100 | [verified] [S6 p.2] |
| F&O terminal L1 / L2 | 25,50,000 / 40,00,000 | 1,175 / 1,700 | [verified] [S6 p.2] |
| CM charting L1 | 25,50,000 | 875 | [verified] [S6 p.2] |
| CM mobile L1, add-on only | 12,25,000 | 875 | [verified] [S6 pp.2–3] |
| CM non-display L1, enterprise / global | 23,90,000 / 37,60,000 | — | [verified] [S6 p.4] |
| CM non-display TBT, enterprise / global | 51,90,000 / 84,30,000 | — | [verified] [S6 p.4] |
| CM internal-display L1, enterprise / global | 24,40,000 / 34,50,000 | — | [verified] [S6 p.5] |
| CM one-minute snapshot, per medium | 16,00,000 | — | [verified] [S6 p.6] |
| CM one-minute snapshot, 15-minute delayed, per medium | 1,20,000 | — | [verified] [S6 p.6] |

[verified] Vendor-to-client feed delivery requires NSE Data's written consent and prior licence/agreement. [S6 p.3, note 3]

### BSE

[verified] Read schedule: **February 2025**, domestic, tax-exclusive; selected equity entries below. “NA” is not a zero-price grant. [S10 pp.1, 3–6]

| Category | Annual INR | Monthly variable INR | Evidence |
|---|---:|---:|---|
| Terminal L1 / L2 | 10,00,000 / 10,00,000 | 650 / 950 | [verified] [S10 pp.3–4] |
| Terminal L3 | 15,00,000 | 1,150 | [verified] [S10 pp.3–4] |
| Charting L1 / L2 / L3 | 10,00,000 / 10,00,000 / 15,00,000 | 360 / 700 / 1,050 | [verified] [S10 pp.4–5] |
| Open website/mobile L1 / L2 | 16,00,000 / 23,00,000 | Not stated in row | [verified] [S10 p.5] |
| Open website/mobile L1, 15-minute delayed | 75,000 | Not stated in row | [verified] [S10 p.5] |

[unknown] No later replacement domestic tariff, complete non-display tariff, or precise per-user/per-device counting rule was established. Confirm the applicable 2026 schedule with BSE rather than treating these prices as a current contractual quote. [S10]

### MCX

[verified] The website links a domestic vendor tariff effective **1 July 2024**. Selected annual fixed and monthly terminal charges follow. [S15, S16]

| Category | Annual INR | Monthly terminal INR | Evidence |
|---|---:|---:|---|
| Vendor L1 / L2 | 36,28,800 / 49,24,800 | 800 / 1,200 | [verified] [S16 p.2] |
| Vendor L3 EMDI / EOBI | 50,27,400 / 54,00,000 | 1,500 / 1,500 | [verified] [S16 p.2] |
| Delayed terminal entitlement | — | 300 | [verified] [S16 p.2] |
| Mobile L1 / L2, unlimited users | 15,55,200 / 23,32,800 | Unlimited users | [verified] [S16 p.2] |
| Login website plus mobile, L1 | 36,60,000 | Unlimited users | [verified] [S16 p.3] |
| 15-minute-and-above delayed, three media | 2,00,000 | — | [verified] [S16 p.4] |
| Non-display L1, enterprise / global | 19,00,000 / 32,00,000 | — | [verified] [S16 p.4] |
| Non-display L2, enterprise / global | 25,50,000 / 38,20,000 | — | [verified] [S16 p.4] |

[verified] Direct client feed access outside vendor terminals/software requires prior approval and applicable fees. [S16 p.3]

### Connectivity and colocation

| Exchange | Published charge / limitation |
|---|---|
| NSE | [verified] Current facility page: full/half/quarter racks ₹9,00,000/₹4,50,000/₹2,25,000 annually, with ₹1,00,000/₹50,000/₹25,000 setup; additional connectivity pair ₹75,000 annually plus tax. Market-data and order connectivity use 10 Gbps ports. The page references NSE/MSD/73958, 29 April 2026. [S23] |
| NSE interpretation | [uncertain] These are infrastructure charges, not evidence of an unrestricted redistribution licence or a per-retail-user data fee. [S23; S1] |
| BSE | [verified] Notice 20250812-34, 12 August 2025, introduces revised colocation guidelines, immediately superseding earlier directions. [S24] [unknown] Attachment pricing and a current standalone colocation data-feed charge were not retrieved. Obtain the guideline and commercial annexures. [S24] |
| MCX transport | [verified] English delivery page: leased-line support/connectivity ₹1,50,000/year plus tax; internet ₹1,00,000/year plus tax. [S17] [unknown] These do not establish a colocation tariff or its included data rights. [S17] |
| MCX conflicting page | [verified] A legacy Gujarati-path page instead says internet delivery ₹50,000/year plus tax. [S26] [uncertain] Use the newer English amount only as published guidance pending confirmation; do not silently reconcile the conflict. [S17, S26] |
| Rate-card circulars | [verified] NSE and MCX publish standalone dated data tariffs; BSE's retrieved tariff is dated February 2025. [S6, S10, S16] [unknown] A separate promulgating circular number for each rate card was not established. [S6, S10, S16] |

## 5. What must be shown, delay conventions and snap quotes

| Question | Result |
|---|---|
| Required timestamp/source | [verified] SEBI's broker master circular requires the broker website's ticker, quotes and order book to carry timestamps and source attribution. Its wireless-trading provisions also require timestamped stock quotes. [S22, §53 investor-information provision, printed p.130; §54.3.1] |
| Mandatory real-time quote service? | [unknown] No universal obligation to give every retail client continuous streaming quotes, every tick, or a specified maximum quote latency was established from the reviewed provisions. Real-time order/trade confirmation requirements should not be restated as an every-tick market-data requirement. [S22 §§53–56] |
| Mandatory five/twenty/full depth? | [unknown] No general broker-client minimum of five, twenty or full-book levels was established. Published product depth is not itself a client-display mandate. [S7, S8, S22] |
| NSE depth products | [verified] L1 supplies best bid/ask; L2 up to five levels; L3 up to twenty; tick-by-tick supplies the full order book. The direct real-time product uses multicast and a dedicated leased line, with authorised vendors an alternative. [S7] |
| Indian 15-minute convention | [verified] NSE sells a 15-minute delayed snapshot product, generated every minute. [S7] [uncertain] Thus the convention exists as a product, but is not a universal Indian statutory safe harbour or a licence-free threshold. [S7, S18, S19] |
| Snapshots versus delay | [verified] NSE describes one/five-minute binary snapshots over SFTP; its 15-minute delayed section separately specifies FTP. [S7] [uncertain] Sampling interval and age of information are different; neither converts a snapshot into freely redistributable data. Confirm the subscribed specification's transport. [S7, S1] |
| Snap quote entitlement | [unknown] No general free allowance of a specified number of on-demand quotes, or universally applicable per-snap-quote charge, was established for an Indian member's retail app. Obtain the relevant channel schedule; do not borrow overseas quote-count models. [S6, S10, S16] |
| Free versus paid clients | [unknown] No universal SEBI rule requiring a free live tier or restricting live prices to paying users was established. Commercial tiers do not determine exchange permission. [S19, S22] |
| Educational/simulation use | [verified] From **1 July 2026**, SEBI requires a **30-day lag** for educational/awareness sharing, no monetary incentives, legal agreements and misuse controls. NISM's simulation lab has a one-day exception. The amended education/advice clarification restricts using the preceding thirty days' prices in the specified recommendation-like presentations. [S18 §§6–7] |
| Live fantasy/virtual trading | [verified] NSE expressly prohibits its data being used for gaming and virtual trading; legitimate client trading is the permitted purpose in the cited member circular. [S3] [uncertain] A fifteen-minute delay or a free subscription is not a demonstrated workaround for such use. [S3, S18] |

## 6. Third-party APIs and the retail-algo framework

| Layer | Requirement / boundary |
|---|---|
| SEBI data-sharing gate | [verified] Real-time third-party sharing is restricted to orderly securities-market functioning or regulatory requirements. Contractual activities and justification must be documented. [S19 §2(i)–(ii)] |
| NSE approval route | [uncertain] Present the actual recipient, purpose, display/raw-feed/automated usage, channels and onward rights to NSE Data; obtain the relevant grant rather than relying solely on the trading frontend approval. The express vendor-client feed rule is in the tariff. [S1, S6] |
| MCX approval route | [verified] Vendors require MCX approval before contracting with redistributors; the redistributor must also execute MCX's agreement. [S14] [verified] Submit the prescribed request/order process for a direct subscription. [S12] |
| BSE approval route | [unknown] The precise domestic broker-to-third-party API approval form, department workflow and standard conditions were not established. Obtain BSE's written commercial/data permission and the relevant frontend/API approval separately. [S9, S10] |
| SEBI retail-algo controls | [verified] The February 2025 framework prohibits open APIs in its algo-trading scope and requires identifiable API keys, whitelisted static IP, OAuth and two-factor authentication. Brokers are principals; algo providers act as agents. Exchange permissions, provider empanelment and order identification are separate obligations. [S20 §5(I)–(III)] |
| Framework's market-data content | [verified] SEBI directs exchange operational modalities to address data flow between provider, broker and exchange, retaining broker responsibility under outsourcing guidelines. [S20 §5(IV)(c)] [unknown] S20 supplies no general exchange market-data redistribution grant, new market-data tariff or minimum client-display depth. [S20] |
| NSE operational clarification | [verified] NSE's November 2025 FAQ ties client static IP to tech-savvy investors placing orders; provider strategies run on broker infrastructure, while tech-savvy clients host their own logic. API orders require algo tagging even within the **10 OPS** threshold. [S21 Q3, Q5, Q8, Q10] |
| Data-only API inference | [uncertain] The order-focused static-IP clarification is not a finding that data-only APIs are licence-free, freely shareable or universally exempt from every access control. It also does not establish a ban on all market-data WebSockets. [S20, S21] |
| Algo fee disclosure | [verified] SEBI permits broker/provider sharing of subscription charges and brokerage, with prominent complete charge disclosures and conflict controls. [S20 §5(III)(d)] [uncertain] That provision does not waive the exchange's data charges. [S20] |
| 2026 implementation | [verified] SEBI's September 2025 extension makes the framework, standards and operational modalities applicable to all brokers from **1 April 2026**; brokers missing transition milestones face a bar on new retail API-algo onboarding from 5 January 2026. [S29 §§4–8] |

## 7. Changes, conflicts and technical boundaries

| Date / issue | Finding |
|---|---|
| February 2025 BSE tariff | [verified] S10 is explicitly dated February 2025. [unknown] The review did not establish every price delta versus its predecessor or a subsequent replacement. [S10] |
| 2025–2026 retail API changes | [verified] The February 2025 SEBI framework, November 2025 NSE clarification and April 2026 final rollout are the relevant verified sequence. [S20, S29, S21] |
| April 2026 NSE tariff | [verified] S6 is effective 1 April 2026. [unknown] A complete comparison with the preceding tariff was not performed; an effective date alone does not prove every line increased. [S6] |
| Education: apparent one-day / three-month conflict | [verified] SEBI explains that the 2024 one-day rule governed sharing while the January 2025 three-month rule governed educational usage. The May 2026 circular reconciles these to thirty days from July 2026, subject to the NISM exception. This is an express amendment, not an unresolved choice of delays. [S18 §§1–7] |
| MCX historical-data changes | [verified] Policy V7.1 records a 30 May 2025 historical-product enhancement; V7.0, 8 May 2026, moves historical trade-book lag from fifteen to thirty days, retaining three months for order books. V7.1 was approved 25 June 2026 and updates educational sharing. [S8 pp.2–3] |
| MCX stale-page conflict | [verified] The legacy overview lists delayed feeds at 1/2/5/10/20 minutes; V7.1 additionally lists fifteen minutes. [S27; S8 p.9] [uncertain] Prefer the explicit current policy/product quote over an omission on a legacy page. [S8, S27] |
| MCX version metadata | [verified] The linked PDF's actual cover says V7.1, despite older search/PDF metadata naming V6.6; the website dates the policy link July 2026. [S8, S15] |
| NSE internal-use wording | [uncertain] Resolve the S4/S2 tension as limited legitimate registered-client use alongside a continuing bar on unauthorised onward distribution; obtain written confirmation for raw APIs and other boundary cases. Do not represent the older prohibition as eliminating all client use. [S2–S4] |
| BSE member/public-channel rows | [uncertain] S10's member-website real-time “NA” and separately priced public-app live products are channel distinctions, not proof that one silently overrides the other. [S10] |

### Published technical identifiers relevant to scope

| Item | What was established |
|---|---|
| MCX interfaces | [verified] V7.1 distinguishes TCP real-time delivery from multicast MDI/EMDI/EOBI; delayed files use FTPS/HTTPS. EMDI supplies twenty levels and EOBI the full order book/trades. Annexure I includes fields `Message Code`, `Instrument Identifier` and `Session ID`. [S8 pp.9, 11–13] |
| BSE interfaces | [verified] The connectivity manual distinguishes multicast MDI in FAST FIX from proprietary-binary Direct NFCAST, and high-bandwidth EMDI. Its low-bandwidth category is capped below 2 Mbps; high-bandwidth consumption is described as 10–200 Mbps. These are that manual's figures, not a verified capacity promise for every 2026 deployment. [S28 §3] |
| Technical access versus permission | [uncertain] A multicast address, session, API key or readable price field demonstrates access mechanics, not independent distribution authority. [S1, S8, S28] |
| Wire details | [unknown] No universal exchange-to-retail WebSocket protocol, licensing transaction ID, maximum retail subscription count, packet layout or byte-offset table was established. Obtain the exact subscribed feed/API release and the broker's own client-delivery specification. Serial numbers in a policy's field inventory are not proven message IDs or byte offsets. [S8 Annexures I–II; S7] |

## Source register

| ID | Primary source and locator | Status / scope |
|---|---|---|
| S1 | [NSE Data Sharing & Usage Policy](https://www.nseindia.com/static/market-data/nse-data-policy) | [verified] Policy text read: member feeds, agreement, restrictions, audit. |
| S2 | [NSE/MSD/74019, Market Data — Consolidated Circular, 30 April 2026](https://nsearchives.nseindia.com/content/circulars/MSD74019.pdf) | [verified] PDF read, especially p.12 registered-client use; archive-host copy also retrieved. |
| S3 | [NSE/COMP/56426, Usage of NSE Data only for Trading Purpose, 20 April 2023](https://archives.nseindia.com/content/circulars/COMP56426.pdf) | [verified] One-page member circular read. |
| S4 | [NSE/MEM/26958, Illegal data dissemination, 19 June 2014](https://archives.nseindia.com/content/circulars/MEM26958.pdf) | [verified] One-page member circular read; also referenced by S2. |
| S5 | [NSE Policy for Non-Display Usage of Market Data](https://nsearchives.nseindia.com/web/mediaattachment/2026-03/Non_Display_Policy_20260323164430.pdf) | [verified] Three-page policy read; linked from NSE's non-display page updated 24 April 2026. |
| S6 | [NSE domestic product pricing, effective 1 April 2026](https://nsearchives.nseindia.com/web/mediaattachment/2026-04/Download_Pricing_file_-_Domestic_clients_20260424122229.pdf) | [verified] Thirteen-page tariff read; selected figures only reproduced above. |
| S7 | [NSE Paid Real Time Data](https://www.nseindia.com/static/market-data/real-time-data-subscription) | [verified] Product descriptions, depth, transport and snapshot/delayed sections read. |
| S8 | [MCX External Data Feed Policy V7.1](https://www.mcxindia.com/docs/default-source/datafeedlink/mcx-data-feed-policy38a0d709-e1eb-4115-8188-f06cb7bd4a02.pdf?sfvrsn=c57f9a2b_2) | [verified] Twenty-one-page PDF read through web extraction; board approval 25 June 2026; public link leads to a document labelled internal. |
| S9 | [BSE market-data subscription portal](https://marketdata.bseindia.com/) | [verified] Subscription workflow read; not the executed licence text. |
| S10 | [BSE Information Products Domestic Tariff Sheet, February 2025](https://www.bseindia.com/downloads1/Information_Products_Pricing_Sheet.pdf) | [verified] Full PDF retrieved with a query-string retry after direct 403 failures; tables read using layout-preserving extraction. |
| S11 | [Deutsche Börse: BSE India Spot Market](https://www.mds.deutsche-boerse.com/mds-en/real-time-data/asian-markets/BSE-India-Spot-Market-1340020) | [verified] Exchange licensor's product/contract page; international scope. |
| S12 | [MCX Subscription Procedure](https://classic.mcxindia.com/technology/datafeed/subscription-procedure) | [verified] Request, execution and payment process read. |
| S13 | [MCX Who Can Subscribe to Datafeed](https://classic.mcxindia.com/technology/datafeed/who-can-subscribe-to-datafeed) | [verified] Member/vendor/redistributor categories read; legacy page. |
| S14 | [MCX General Terms & Conditions](https://classic.mcxindia.com/technology/datafeed/general-terms-conditions) | [verified] Public terms read; not the full executed agreement. |
| S15 | [MCX Datafeed](https://www.mcxindia.com/technology/datafeed) | [verified] Current link index for policy, tariffs and order form read. |
| S16 | [MCX domestic vendor tariff, effective 1 July 2024](https://www.mcxindia.com/docs/default-source/datafeedlink/mcx-data-feed-price-list-for-domestic-vendors----effective-from-july-01-20246be30cd5-d0b6-46c8-a0de-10c9cfabed14.pdf?sfvrsn=c41d4e85_1) | [verified] Five-page PDF read through web extraction, especially pp.2–4. |
| S17 | [MCX Medium of Delivery, English](https://classic.mcxindia.com/technology/datafeed/medium-of-delivery) | [verified] Connectivity prices read. |
| S18 | [SEBI HO/47/17/12(11)2025-MRD-POD3/I/11107/2026, 8 May 2026](https://www.sebi.gov.in/sebi_data/attachdocs/may-2026/1778242522289.pdf) | [verified] Four-page final circular read; educational-price-data amendment effective 1 July 2026. |
| S19 | [SEBI/HO/MRD/MRD-PoD-3/P/CIR/2024/56, 24 May 2024](https://www.sebi.gov.in/sebi_data/attachdocs/may-2024/1716559553659.pdf) | [verified] Three-page circular read; §§2(iii)–(iv) subsequently amended by S18. |
| S20 | [SEBI/HO/MIRSD/MIRSD-PoD/P/CIR/2025/0000013, 4 February 2025](https://www.sebi.gov.in/sebi_data/attachdocs/feb-2025/1738665456458.pdf) | [verified] Six-page retail-algo framework read. |
| S21 | [NSE retail-algo FAQ, 3 November 2025](https://nsearchives.nseindia.com/web/sites/default/files/inline-files/FAQ_Retail%20Algo_03112025_NSE.pdf) | [verified] Three-page FAQ read; its disclaimer gives circulars precedence over inconsistent FAQ content. |
| S22 | [SEBI/HO/MIRSD/MIRSD-PoD/P/CIR/2025/90, Master Circular for Stock Brokers, 17 June 2025](https://www.sebi.gov.in/sebi_data/attachdocs/jun-2025/1750158789381.pdf) | [verified] §§53–56 and relevant quote provisions read; this is a dated consolidation, not a claim that every later amendment was exhaustively audited. |
| S23 | [NSE Co-location Facility](https://www.nseindia.com/static/trade/platform-services-co-location-facility) | [verified] Published costs/connectivity read; page updated 22 September 2026. |
| S24 | [BSE Notice 20250812-34, Revised Guidelines for Co-location Facility and Related Services](https://www.bseindia.com/markets/MarketInfo/DispNewNoticesCirculars.aspx?page=20250812-34) | [verified] Official indexed notice text read; attachments not obtained. |
| S25 | [MCX Technology & Services FAQ](https://www.mcxindia.com/gu/faq/technology-services) | [verified] Data subscription and CTCL/IBT/WT documentation sections read. |
| S26 | [MCX legacy Medium of Delivery, Gujarati path](https://www.mcxindia.com/gu/technology/datafeed/medium-of-delivery) | [verified] Conflicting internet price read. |
| S27 | [MCX legacy Datafeed overview](https://classic.mcxindia.com/technology/datafeed) | [verified] Delayed-feed intervals read. |
| S28 | [BSE BOLTPLUS Connectivity Manual v1.12](https://www.bseindia.com/downloads1/BOLTPLUS_Connectivity_Manual_V1_12.pdf) | [verified] Official indexed §3 interface descriptions read; no wire layouts inferred. |
| S29 | [SEBI/HO/MIRSD/MIRSD-PoD/P/CIR/2025/132, 30 September 2025](https://www.sebi.gov.in/sebi_data/attachdocs/sep-2025/1759232056254.pdf) | [verified] Three-page rollout/timeline circular read. |

## Gaps and cautions

| Unresolved item | Exact evidence needed to settle it |
|---|---|
| [unknown] Broker-specific rights at all three exchanges | Executed membership/data undertakings, product order forms, schedules, amendments and exchange permissions for this broker; S1/S9/S12 establish routes, not this broker's grant. |
| [unknown] NSE client WebSocket/raw-API boundary | NSE's written application of S2–S4 and the current Data Usage/Data Sharing undertaking, including NSE/MSD/64333 of 3 October 2024 referenced by S2, to the proposed app/API and recipient classes. |
| [unknown] BSE automatic authenticated-app entitlement | Current BSE member data-use undertaking plus IBT/STWT approval terms and an express client-display clause; the S10 member-website tariff cannot settle it. |
| [unknown] MCX member app entitlement | Current MCX member CTCL/IBT/WT undertaking and data agreement covering app display, raw API export and downstream platform access; reconcile S13's website-only wording with the requested channels. |
| [unknown] Mandatory vendor status for every broker API | Written exchange classification of authenticated display, client download, automated use and third-party feed redistribution; neither transport nor broker status alone resolves the boundary. [S1, S13, S19] |
| [unknown] NSE/BSE reporting deadlines and counting | Current reporting annexures: billable user/terminal/device definitions, entitlement-versus-usage basis, concurrency, duplicate IDs, monthly/nil returns, due dates and declarations. [S6, S10] |
| [unknown] MCX detailed count rules and audits | Current licence/reporting/audit schedules and any circular replacing the quarterly-list rule; S14 establishes dates, not full counting or inspection machinery. |
| [unknown] Complete breach exposure | Signed default/remedy provisions for each exchange: cure periods, suspension, termination, arrears, interest, damages, audit costs and dispute process; no universal fine amount was established. [S1, S5, S14] |
| [unknown] BSE non-display tariffs; current BSE/MCX complete pricing | Current domestic non-display policy, 2026 tariff confirmation, amendments and any broker exemptions; reconcile S10/S16 with the actual subscription. |
| [unknown] Colocation market-data-only charges at BSE/MCX | Current colocation commercial annexures specifying feed ports, connections, streams, taxes and inclusions. For BSE obtain S24's “Colocation Guidelines Version V2.pdf” and “Annexures.zip”. |
| [unknown] Mandatory client depth / free live tier / snap-quote allowance | An express current SEBI or exchange provision imposing the claimed requirement. None was established in the reviewed provisions; this is a bounded negative finding, not proof that no specialised segment/front-end condition exists. [S7, S22] |
| [unknown] Comprehensive 2026 API operational amendments | Current exchange retail-algo/NNF master circulars and attachments, including NSE/INVG/73992 of 30 April 2026, plus BSE/MCX counterparts. S21 is useful clarification but does not replace those instruments. |
| [unknown] Exact production transport, IDs and limits | Subscribed feed's current protocol manual and release circular; for MCX, the API documents referenced in S8 Annexure II. No packet offsets, transaction/template IDs or retail connection limits have been invented. |
| [uncertain] Version and precedence risk | Confirm exchange-supplied documents against executed terms. S8's revision history, S17/S26's contradictory prices and S2/S4's scope tension show why a legacy webpage or tariff alone cannot settle every 2026 implementation. |

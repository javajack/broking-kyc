# NSE market-data dissemination for a broker front end — 2026

[verified] Document cut-off: 15 October 2026. The September protocol publications and circulars cited below are included; scheduled changes after the cut-off are labelled as such. [S1, S8, S9]

## 1. Product catalogue and delivery paths

[verified] NSE’s member broadcast, member “Multicast Tick by Tick” (MTBT), and NSE Data & Analytics Limited (NDAL) commercial data products have separate specifications and entitlements. “Level 3” means twenty-price-depth data; it is not the full order-level feed. [S4, S5, S10, S11]

| Official name / service | Segments and eligibility | Transport and availability |
|---|---|---|
| NNF broadcast; member **“Price volume (5 depth 1 second refresh)”** | [verified] Member dissemination covers CM, FO, CD, CO and SLBM; combined and selected stream-wise services are listed. [S4] | [verified] UDP multicast on exchange member connectivity, including colo where supported. [S4, S19] [verified] This is the broadcast side of the trading interface, not market data carried inside the encrypted interactive TCP session. [S2, S4] |
| Stream-wise price-volume broadcast | [verified] CM: five streams; FO: eighteen streams, with separate common streams/configuration. [S4, S6] | [verified] Multicast groups selected through the exchange’s Windows/Linux UDP application and configuration. [S4] [unknown] Public-internet delivery of these raw member multicast groups is not established. [S4] |
| **“Limit Price Protection Range (LPP) Broadcast”** | [verified] FO and COM member service. [S4] | [verified] Separate multicast parameters are published in the member dissemination circular. [S4] [unknown] Public-internet delivery is not established. [S4] |
| **“Multicast Tick by Tick” / “MTBT”** | [verified] Member CM, FO, CD and CO; CM five streams, FO eighteen, CD two, CO one. [S4, S5] | [verified] UDP multicast; TCP/IP recovery. Colo and non-colo member delivery exist. [S5, S18, S19] [verified] The 2025 commodity announcement provides non-colo POP connectivity and says commodity colo is unavailable. [S20] |
| NDAL **“Level 1”**, **“Level 2”**, **“Level 3”** real-time feeds | [verified] Published core matrix: L1 CM/FO/CD/WDM/COM; L2 CM/FO/CD/COM; L3 CM. Subscribers include data vendors and end users under agreement. [S10, S11, S22] | [verified] Multicast over a dedicated leased line between an NSE POP and the customer; alternatively through an authorised data vendor. [S10] [uncertain] UDP is consistent with this multicast design, but the reviewed commercial L1/L2 pages do not establish a universal UDP transport clause for every segment. Obtain the delivery specification. [S10, S12, S14] [unknown] TLS protection of this multicast payload is not established. [S12, S14] |
| NDAL **“Tick by Tick”** | [verified] Commercial CM and CD product; the current technical specification records discontinuation of its FO TBT service from 1 September 2021. This does **not** discontinue member FO MTBT. [S11, S15, S4] | [verified] UDP multicast over dedicated delivery; TCP recovery. [S10, S15] |
| **“Real Time Index Feed”** | [verified] Separate index feed, with `CX` index messages and `CI` end-of-day messages. [S16] | [verified] Commercial multicast delivery; CM level-feed revision history removes indices from that feed in March 2024. [S12, S16] [unknown] A generally available direct public-internet raw index multicast service is not established. [S10, S16] |
| **“Snapshot Data”** | [verified] One-, two- and five-minute products appear across the technical diagrams; the public product page advertises one- and five-minute snapshots. Availability must therefore be checked against the selected product/order form. [S10, S17] | [verified] Binary files delivered using SFTP over the internet in the snapshot specification. This is a paid periodic product, not the MTBT recovery snapshot. [S17, S5] |
| **“15 minute delayed”** data | [verified] Public product description says files are generated every minute with fifteen-minute-delayed data. [S10] | [verified] The page specifies FTP over the internet. [S10] [unknown] Whether a current agreement replaces FTP with SFTP is not established. [S10, S22] |
| **“Stock wise data”** | [verified] Selected-stock product, with stock-count-based pricing. [S21] | [unknown] Exact current production transport, schema and refresh interval require the Stock Wise Data technical specification and order form; price selection is not proof of a wire-level subscription opcode. [S10, S21] |
| **“Real Time Market Data Analytics”**, **“Real Time Option Greeks & Analytics Feed”** | [verified] Derived-data products are separately offered; market-data analytics covers CM/FO. [S23] | [verified] Tariff distinguishes one-minute, one-second and TBT variants. [S21] [unknown] Delivery transport and segment-by-variant eligibility need their specific interface documents. [S23] |
| **“INAV”** | [verified] CM commercial L1/L2/L3 include ETF indicative-NAV information; `CQ` maps NSE symbols to INAV symbols, and `CN` carries the value in `LTP`. Separate equity/debt ETF INAV tariff entries also exist. [S12, S21] | [verified] Included-feed delivery follows the CM feed. [S12] [unknown] The separate INAV product’s transport and entitlement require its order form. [S21, S22] |
| Other catalogue families | [verified] EOD/historical data, masters, corporate data and other reference products are separately listed. [S21, S22] [uncertain] They supplement rather than replace the live book needed by a trading screen. [S5, S21] | [unknown] There is no single established transport/entitlement applying to all these products. Obtain each product’s order form and specification. [S22] |

| Boundary / apparent conflict | Finding |
|---|---|
| “Low latency” versus product name | [verified] Colo carries MTBT; the normal/fast NNF broadcast processes are separately mentioned in its header documentation. [S19, S2] [unknown] A separately orderable 2026 product formally named “Low Latency Feed”, or a universal latency SLA for these feeds, was not established. “Fast broadcast” alone is not an entitlement or latency guarantee. [S1, S2, S10] |
| Catalogue scope beyond the core matrix | [verified] The commodity commercial manual’s diagram includes CBRICS/RFQ under L1; some segment diagrams contain additional or inconsistent labels. The FPI catalogue matrix does not give the same expanded enumeration. [S11, S14] [unknown] Obtain NDAL’s current product/segment order form before treating those diagram labels as available trading-member entitlements. [S22] |
| Other trading interfaces | [verified] The protocol index also lists SLBM NNF via TAP and EGR trimmed NNF. [S1] [unknown] An EGR MTBT product or paid EGR L2/L3 product is not established by the reviewed catalogue. [S1, S4, S11] |
| Broker’s own UI versus vendor platform | [verified] NSE allows member-developed NNF software; software-vendor/ASP empanelment is a separate process. [S1] [verified] NDAL redistribution requires its applicable agreement; software approval does not itself grant data redistribution rights. [S22] |

## 2. Packet-level protocols

### 2.1 NNF broadcast envelope

[verified] The following layout is read from CM trimmed NNF 6.6, chapter “Broadcast” and the broadcast-header section. It is not the NDAL level-feed header or MTBT header. The protocol page subsequently lists CM 6.7; its revision table records bhavcopy changes. [S2, S1, S9]

| Layer / issue | Published detail |
|---|---|
| Outer envelope | [verified] `BcastPackData`: `CHAR cNetId[2]`, `SHORT iNoPackets`, `CHAR cPackData[512]`. `iNoPackets` counts sequentially packed packets. Published network identifiers: equity `4`, equity derivatives `2`, currency derivatives `6`. [S2, pp. 90–91] |
| Compression wrapper | [verified] `COMPRESSION_BROADCAST_DATA`: `SHORT CompressionLen`, `CHAR BroadcastData[]`. Zero means uncompressed; nonzero gives compressed-data length. [S2, p. 91] |
| Decompressor | [verified] `lzo1z_decompress`, with `lzo1.07` named in the implementation instructions. Compressed and uncompressed packets must both be handled. [S2, pp. 89–93] |
| System prefix | [verified] Ignore eight system-header bytes preceding the message header; the message header begins at the ninth byte of the decompressed broadcast data. [S2, pp. 19–20, 91] |
| Message header | [verified] `BCAST_HEADER`, forty bytes: `Reserved` (CHAR, 4 bytes), `LogTime` (LONG, 4), `AlphaChar` (CHAR, 2), `TransCode` (SHORT, 2), `ErrorCode` (SHORT, 2), `BCSeqNo` (LONG, 4), another `Reserved` (CHAR, 4), `TimeStamp2` (CHAR, 8), `Filler2` (CHAR, 8), `MessageLength` (SHORT, 2). `MessageLength` includes the message header. [S2, pp. 18–20] |
| Multiplicity | [verified] Use `iNoPackets`; the envelope can contain multiple packets. [S2, p. 91] [unknown] A separately stated maximum message count per datagram was not located. [S2] |
| Maximum size — unresolved distinction | [verified] The envelope declares a 512-byte data array, while documented logical messages include a 546-byte CM ticker message and a 558-byte enhanced FO MBP message. [S2, S3] [unknown] These facts do not establish an unconditional maximum UDP datagram or decompressed buffer size. Compression may explain some cases, but a normative maximum/fragmentation rule is needed. Do not turn the declaration into an assumed “512-byte maximum message”. [S2, S3] |
| Interactive packet limit is different | [verified] The NNF interactive packet chapter describes a 1,024-byte maximum. [S2] [uncertain] Applying that limit to the multicast broadcast envelope would mix different packet definitions. [S2] |
| Encryption boundary | [verified] The interactive connection uses TCP: TLS 1.3 to the gateway router and AES-256-GCM for the allocated gateway connection. [S2, connectivity chapter] [unknown] These clauses do not establish TLS on UDP multicast broadcast. [S2, S4] |

### 2.2 Broadcast transaction codes

[verified] Codes below are segment-specific. CM entries were read in 6.6; FO entries in 9.50. The current index lists 6.7/9.51, whose September revisions concern bhavcopy and rejection changes. A structure’s presence in a manual is not proof that every production stream emits it. [S1, S2, S3, S9]

| Message family | CM | FO / qualifications |
|---|---|---|
| Market by order / combined book | [verified] `BCAST_MBO_MBP_UPDATE` — `7200`. [S2] | [verified] `7200` is also documented. [S3] [unknown] Current production emission and entitlement to its MBO component are not established merely by that definition. [S3, S4] |
| Market by price | [verified] `BCAST_ONLY_MBP` — `7208`. [S2] | [verified] `BCAST_ENHNCD_ONLY_MBP` — `17208`; legacy `7208` is superseded on the migrated FO feed. [S3, S6] |
| Market watch | [verified] `BCAST_MW_ROUND_ROBIN` — `7201`. [S2] | [verified] `BCAST_MW_ROUND_ROBIN` — `7201`; the FO migration replaces `17201`. [S3, S6] |
| Ticker / trade summary | [verified] `BCAST_TICKER_AND_MKT_INDEX` — `18703`. Do not substitute FO’s legacy `7202`. [S2, S3] | [verified] `BCAST_ENHNCD_TICKER_AND_MKT_INDEX` — `17202`; FO revision history strikes out `7202`. [S3] |
| Index | [verified] `BCAST_INDICES` — `7207`; `BCAST_INDICES_VIX` — `7216`. [S2] | [unknown] Do not infer identical index messages on every FO stream from the CM table. [S3, S4] |
| Open interest | [unknown] A CM per-security derivatives-OI broadcast is not established. [S2] | [verified] `ENHNCD_MKT_MVMT_CM_OI_IN` — `17130` reports underlying-security OI; includes `TokenNo` and eight-byte `CurrentOI`, with up to 39 records. This is distinct from contract OI. [S3] |
| Security/contract master | [verified] `BCAST_SECURITY_MSTR_CHG` — `18720`. [S2] | [verified] `BCAST_SECURITY_MSTR_CHG` — `7305`. [S3] |
| Security status | [verified] `BCAST_SECURITY_STATUS_CHG` — `18130`; `BCAST_SECURITY_STATUS_CHG_PREOPEN` — `18707`. [S2] | [verified] Corresponding status codes `7320` and pre-open `7210`. [S3] |
| Market status | [verified] `BC_OPEN_MESSAGE` — `6511`; `BC_CLOSE_MESSAGE` — `6521`; `BC_PREOPEN_SHUTDOWN_MSG` — `6531`; `BC_CIRCUIT_CHECK` — `6541`. [S2] | [unknown] Use the selected segment’s own status table; a CM code list is not a universal cross-segment contract. [S1, S3] |
| Spread depth | [unknown] Not established as a CM product. [S2] | [verified] `BCAST_ENHNCD_SPD_MBP_DELTA` — `17211`; migrated FO feed replaces `7211`. [S3, S6] |
| CAS | [verified] `BC_CTS_CLOSE_FOR_CAS` `6651`; `BC_REVISED_PRICE_BAND_COMPLETED` `6652`; `BC_CAS_START` `6653`; `BC_MARKET_ORDER_RESTRICTED` `6654`; `BC_CAS_END` `6655`; `BCAST_CAS_REF_PRICE` `7338`. [S2] | [unknown] Do not apply CM CAS status codes to FO without its own specification; futures reference-price alignment is separately documented. [S3, S30] |

### 2.3 Sequence numbering and the separate wire formats

| Feed | Sequence / packet semantics |
|---|---|
| NNF broadcast | [verified] `BCSeqNo` is explicitly **not unique**: eleven sequence sets for normal broadcast and six for fast broadcast, generated by individual host processes. `Filler2` carries machine number. [S2, p. 19] [unknown] A complete public mapping from process/stream identity to sequence domain and a normative gap-repair algorithm were not established. A single global `previous + 1` test is therefore unjustified. [S2] |
| Member MTBT | [verified] `STREAM_HEADER`: `short msg_len`, `short stream_id`, `int seq_no`; FO uses `unsigned int`. Eight-byte header, packed structures, little-endian format. Sequence starts at one per stream each day and increments; disaster recovery can reset it to one. Heartbeat has header sequence zero and carries the last sequence number. [S5, global-header and heartbeat sections] |
| MTBT gap detection | [verified] Stream-local sequence and heartbeat last-sequence fields support detecting missing messages; recovery accepts a start/end sequence range. [S5] [uncertain] A consumer should deduplicate both sources by stream and sequence, detect jumps in that domain, and distinguish a documented reset from a gap. [S4, S5] |
| NDAL level feeds | [verified] The commercial CDS specification instead uses `ST_COMP_BATCH_HEADER` (`cCompOrNot`, `nDataSize`, `iNoOfPackets`), `ST_INFO_HEADER` (`iCode`, `iLen`, `lSeqNo`) and trailer fields `iCheckSum`, `cEOT`; it describes LZO compression and big-endian encoding. [S13] [uncertain] Reusing the little-endian MTBT parser or NNF envelope for this product would be incorrect. [S2, S5, S13] |
| MTBT maximum packet size | [unknown] A universal maximum UDP payload/MTU was not established. The recovery snapshot’s size limit is not a multicast datagram limit. Obtain the current network/interface specification. [S5] |

## 3. Depth, trade and update semantics

| Product / message | Depth and payload | Published frequency / limitation |
|---|---|---|
| Member price-volume feed | [verified] Five price levels; MBP aggregates quantity and order count at a price, separately for buy and sell. [S2, S4] | [verified] NSE labels it “5 depth 1 second refresh”. [S4] [unknown] A guaranteed end-to-end latency or assurance that every intermediate trade is retained in that refresh is not established. [S4] |
| NNF combined MBO/MBP structure | [verified] Documented MBO arrays contain five buy and five sell entries; MBP has five levels per side. [S2] | [verified] This bounded structure is not the full order-event MTBT specification. [S2, S5] [unknown] Current production MBO emission cadence is not established. [S2, S4] |
| CM NNF ticker | [verified] `BCAST_TICKER_AND_MKT_INDEX` includes `Token`, `MarketType`, `FillPrice`, `FillVolume`, `MarketIndexValue`; up to 28 records. [S2] | [unknown] No verified tick-for-tick delivery guarantee for this message was established. [S2, S4] |
| NDAL L1 / L2 / L3 | [verified] Best bid/ask; five price levels; twenty price levels respectively. These are price-depth products, not an order-ID event book. [S10, S12] | [verified] CM `CV` FAQ: initial packet in 6–9 seconds, then updated or repeated packets every five seconds; illiquid-security packets repeated twice under current configuration. “Real time” therefore does not imply every level product is unthrottled. [S12, FAQ 15] [unknown] A universal numerical L1/L2 cadence across all segments was not established. [S10, S12–S14] |
| MTBT orders | [verified] Order additions/modifications/cancellations: `N`/`M`/`X`; spread equivalents `G`/`H`/`J`. Order-ID-based events allow book reconstruction. [S5] | [verified] Event-based order/trade dissemination. [S5] [unknown] No universal microsecond SLA or fixed millisecond batching threshold was established. [S5] |
| MTBT trades | [verified] `T` trade, `K` spread trade, CM/FO `C` trade cancellation. Trade structure includes timestamp, buy/sell order IDs, token, trade price and quantity; timestamp is nanoseconds since 1 January 1980. [S5] | [verified] Session rules matter: pre-open order collection is withheld under the specified pre-open handling, while matching-phase trades are disseminated. [S5, FAQ 9] [uncertain] “Full order book” must not be interpreted as visibility into every hidden or non-displayed order state. [S5] |
| NNF indices | [verified] Separate index broadcast messages exist. [S2] | [unknown] Exact index-value dissemination cadence was not established. Market-status/circuit heartbeats cannot settle it. [S2] |
| NDAL index | [verified] `CX` live index, `CI` EOD, `CH` heartbeat. [S16] | [verified] `CH` is every two seconds without data, with sequence zero. [S16] [unknown] That is not proof of two-second `CX` index-value updates. [S16] |
| Commercial snapshots / delayed | [verified] Periodic snapshots and fifteen-minute-delayed data are distinct offerings. [S10, S17] | [verified] One-/five-minute public snapshot offerings; delayed files generated each minute. The technical diagram additionally shows two-minute snapshots. [S10, S17] |
| Recovery snapshot | [verified] Outstanding-order snapshot refreshed every thirty seconds; does not provide a historical trade tape. [S5] | [verified] This interval is recovery-state freshness, not MTBT live-feed throttling. [S5] |

## 4. Subscription and unsubscription

| Question | Established answer |
|---|---|
| Is NNF broadcast a full firehose? | [verified] NSE publishes combined feeds and stream-wise multicast groups, and supplies UDP configuration/start-stop tooling. [S4] [uncertain] Treat a joined group as a firehose for its assigned content, with local token filtering; it is not necessarily every instrument across the exchange. [S4] |
| Per-token subscribe/unsubscribe requests? | [verified] No instrument subscribe/unsubscribe opcode is defined in the reviewed NNF broadcast or member MTBT message catalogues. [S2, S3, S5] [unknown] A vendor’s WebSocket subscription interface, if used, is that vendor’s API and cannot be inferred from NSE NNF. [S10] |
| Selecting member MTBT instruments | [verified] Stream-master CSVs map contracts into streams: `cm_contract_stream_info.csv`; `fo_contract_stream_info.csv`, `fo_spd_contract_stream_info.csv`; `cd_contract_stream_info.csv`, `cd_spd_contract_stream_info.csv`; `co_contract_stream_info.csv`. [S4] [uncertain] Select streams from these masters, receive their groups, then filter tokens in the broker’s ingestion layer. [S4, S5] |
| Joining / leaving groups | [verified] The member circular provides multicast IP/port assignments and exchange UDP application configuration; all-stream or respective-stream configurations can be started/stopped. [S4] [unknown] A universally applicable IGMP version, join-rate cap, group-count quota and per-token quota were not established. Obtain the UDP application manual from Extranet and current network provisioning details. [S4] |
| Paid level feeds | [verified] Product, segment, level, use and delivery are selected through commercial subscription. Current CM revision history removes the old TCP login process in version 1.19. [S12, S22] [unknown] Do not assume an old TCP login packet implements current instrument subscriptions. [S12] |
| Stock-wise product | [verified] Tariff permits stock-based commercial selection. [S21] [unknown] Real-time token subscription/unsubscription semantics are not established by that tariff. [S21] |
| Published stream counts versus limits | [verified] CM/FO/CD/CO MTBT stream counts are 5/18/2/1. [S4] [uncertain] These are dissemination partitions, not a maximum number of client watchlist symbols. [S4] |
| Infrastructure/IP restrictions | [verified] The 2018 non-colo T-category scheme specifies one IP and approved physical locations; member colo MTBT is enabled on the rack. [S18] [unknown] Current exceptions or replacement IP quotas need confirmation against the actual provisioned service. [S18, S19] |

## 5. Gaps, late joins and redundancy

| Path / event | Published behaviour and recovery |
|---|---|
| NNF multicast gap | [verified] The broadcast header has non-global sequence numbers. [S2] [unknown] No verified NNF multicast range-retransmission service, recovery snapshot opcode, or rule that re-login replays missed market data was established. Interactive transaction/download recovery must not be represented as market-data multicast replay without an explicit specification. [S2, S3] |
| Price-volume redundancy | [verified] NSE publishes **“Source 1”** and **“Source 2”**; both transmit simultaneously and can be used active-active or active-passive. [S4] [unknown] “Line A / Line B” is not established as the official universal naming or an equality/latency guarantee. [S4] |
| MTBT redundancy | [verified] Two sources are available; NSE says one multicast channel lags the other and recommends active-active use. [S4] [unknown] The exact delay, a universal assignment of the lagging channel to Source 2, and identical timing/packet boundaries are not established. [S4] |
| Missing MTBT messages | [verified] TCP recovery request type `R`, with stream ID and start/end sequence numbers; response `Y` indicates success/error. Each request uses a new connection. Recovery is file-based and can lag live dissemination. [S4, S5] |
| Late join / rebuild | [verified] TCP snapshot request type `O`, with start/end sequence set to zero; response `B`; snapshot transcode `10501`. Snapshot header is sixteen bytes: `Trans Code`, `Size`, `Number of records`, `Last Sequence Number`, `Stream ID`; subsequent order records use `N`/`G`. [S5, chapter 8] [uncertain] Buffer live deltas, build the snapshot, then apply subsequent sequence numbers with gap repair; the snapshot boundary is essential to avoid double application. [S5] |
| Snapshot limits | [verified] Thirty-second refresh; maximum snapshot size 75 MB over TCP/IP versus 30 MB on the former Solace service. [S5, FAQ 13] |
| TCP recovery limits | [verified] Thirteen simultaneous connections per IP per segment; 100 connections per second per IP, with at least ten milliseconds between successive requests; send request within one second of connection or the server disconnects. [S5, appendix] |
| Snapshot lifecycle | [verified] NSE warns that a snapshot refresh may disconnect a request; reconnect/retry. Server disconnects after sending the response. [S26] |
| Solace migration | [verified] CM TCP snapshot service was introduced in October 2025; FO/CD TCP snapshot followed in March 2026. Solace snapshot recovery for CM/FO/CD was retired from the 6 June 2026 mock. [S24–S26] |
| CO snapshot availability | [verified] MTBT 7.1 says snapshot recovery is available for COM as well as CM/FO/CD. [S5] [unknown] The April consolidated endpoints and June retirement circular do not establish its current production endpoint; obtain the COM enablement circular. [S4, S24] |
| NDAL level-feed gaps | [verified] Application sequence numbers exist in the commercial format. [S13] [unknown] A universal public TCP replay/snapshot service for all L1/L2/L3/index products was not established. MTBT recovery must not be silently applied to them. [S12–S16] |

| Concrete member addressing examples | Status |
|---|---|
| CM combined price-volume | [verified] Source 1 `239.50.50.11:10811`; Source 2 `239.50.50.16:10816`, in the April consolidated circular. [S4] |
| FO combined price-volume | [verified] September migration replaces April’s `239.50.50.21:10821` / `239.50.50.26:10826` with `239.50.50.22:10822` / `239.50.50.27:10827`. The newer circular governs. [S4, S6] |
| MTBT range recovery | [verified] April table: CM `172.28.124.34:10984`; FO `172.28.124.30:10990`; CD `172.28.124.32:10970`; CO `172.19.125.84:10960`. [S4] |
| TCP order-book snapshot | [verified] CM/FO/CD use `172.28.124.54` with ports `11984` / `11989` / `11985` respectively. These are distinct from range-recovery ports. [S24] |

[uncertain] These addresses are configuration evidence, not public-internet endpoints or a substitute for NSE provisioning and the latest member circulars. [S4, S6, S24]

## 6. Changes in 2025 and 2026

| Date / change | Consequence |
|---|---|
| January–February 2025, CM old-feed retirement | [verified] NSE/MSD/66082 postponed withdrawal of old CM five-depth parameters from 13 January to the 8 February 2025 mock. [S27] |
| July 2025 FO change | [verified] NSE/MSD/69328 introduced changed FO broadcast parameters and bhavcopy transcode `11833`. This is not a 2025 discontinuation of all in-band bhavcopy. [S28] |
| October 2025–June 2026 recovery migration | [verified] CM then FO/CD TCP snapshots replaced Solace; see section 5. [S24–S26] |
| FO 2026 production migration | [verified] NSE/MSD/75324 makes new FO broadcast parameters mandatory from the 5 September 2026 mock and discontinues old parameters. It widens cumulative traded volume from four-byte unsigned integer to eight-byte `LONG`; code replacements include `17201 → 7201`, `11833 → 1833`, `7208 → 17208`, `7211 → 17211`. [S6] |
| Bhavcopy original deadline | [verified] NSE/MSD/74764, 18 June 2026, announced cessation of NNF `.MS`/`.MD` bhavcopy dissemination from 12 October 2026. [S7] |
| Bhavcopy revised deadline — controls | [verified] NSE/MSD/76457, 21 September 2026, extends cessation to **16 November 2026**, covering CM, FO, CD, commodity, EGR and index bhavcopy. As of this report’s cut-off, the final cessation date is still in the future. [S8] |
| Bhavcopy messages affected | [verified] CM `TXN_EXT_MKT_STATS_RPT_DATA_NDT` `18201`; derivatives/commodity `RPRT_MARKET_STATS_OUT_RPT` `1833` and `SPD_BC_JRNL_VCT_MSG` `1862`; index `MKT_IDX_RPT_DATA` `1836`. DAT files are supplied through Extranet; CM/EGR DAT availability starts 12 October, with FO/CD/CO already available. This is not cessation of live index quotes or every bhavcopy file format. [S7, S8] |
| Latest published protocol versions | [verified] Protocol page: CM trimmed **6.7**, FO **9.51**, CD **6.4**, COM **3.6**; member MTBT **7.1**. September CM/FO manuals document bhavcopy discontinuation. [S1, S9] [unknown] A universal circular mandating every member to implement every listed version by one date was not established; publication and a mandatory production cutover are different evidence. [S1, S6, S9] |
| Newly named feed product in 2025/26 | [verified] TCP snapshot recovery and changed feed versions are evidenced. [S24–S26, S9] [unknown] A genuinely new separately licensed “low-latency” live-feed product launched in these years was not established. Analytics already appears in a June 2019 brochure. [S23] |

### Closing Auction Session market data

| Path | Published changes / cautions |
|---|---|
| NNF | [verified] CM status transitions `6651`–`6655` and reference-price broadcast `7338` are explicitly documented. [S2] |
| Member MTBT | [verified] Version 7.1 says CAS orders are disseminated during order collection; market orders carry price zero; matching-phase trades carry buy/sell order IDs; remaining-order cancellations are disseminated at session end. This differs from its pre-open handling. [S5, FAQ 9–10] |
| NDAL CM level feed | [verified] CAS messages include reference price `CR`, auction updates `AN`, start `AO`, market-order restriction `MR`, end `AC`. The FAQ schedules `CR` once per security during 15:15–15:20, `AO` at 15:20, multiple `AN` after `AO`, `MR` at 15:25 and `AC` during 15:28–15:30. [S12] |
| Explicit internal-document conflict | [verified] The CM commercial manual’s narrative calls the normal-market-close-for-CAS message **`TR`**, while its FAQ timing table calls it **`TC`**. [S12, CAS sequence and FAQ 16] [unknown] The authoritative wire identifier requires an NDAL clarification/erratum and captured test feed; do not silently choose one. [S12] |
| Derivatives linkage | [verified] FO commercial specification includes CAS reference-price message `FR`; the September operating circular extends reference-price and band alignment to index futures from 7 September 2026. [S29, S30] |
| Product/entitlement | [verified] CAS changes are published within existing NNF, MTBT and NDAL feed manuals. [S2, S5, S12, S29] [unknown] A separate purchasable product or extra fee named “CAS feed” was not established. [S21, S22] |

## 7. Fees, licensing and getting access

### Member routes

| Service | Fees and route |
|---|---|
| NNF price-volume broadcast | [verified] Member connectivity and multicast configuration are the documented access route. [S4] [unknown] A current stand-alone exchange fee specifically for five-depth NNF broadcast was not established; do not equate absence of a fee line with free telecom, connectivity or software certification. [S4, S19] |
| Member MTBT | [verified] NSE/MSD/38190 abolished MTBT feed charges for colo and non-colo members from 1 July 2018. Connectivity remains separately procured/charged. [S18] [unknown] No later reinstatement was established in the reviewed 2026 documents. [S4, S19] |
| Colo | [verified] MTBT is enabled with colo racks; 2026 consolidated colo rules cover CM/FO/CD, paired uplinks and ENIT applications. Annual base rack charges: quarter ₹2.25 lakh, half ₹4.5 lakh, full ₹9 lakh, HPD ₹18 lakh; setup ₹25,000/₹50,000/₹1 lakh/₹2 lakh respectively, before applicable additional costs. [S19] [verified] Interactive messages-per-second categories are separately priced; they are not market-data update throttles. [S19] |
| Non-colo MTBT | [verified] The T-category application is Annexure 1 of NSE/MSD/38190; surrender Annexure 2. It permits specified Indian member/AP offices or owned/hired external-DC rack locations and requires telecom connectivity. Its recommended minimum line capacity is 1.5 Gbps. [S18] [unknown] Obtain current provisioning confirmation rather than treating that 2018 recommendation as the sole 2026 route. [S18, S20] |
| Commodity non-colo | [verified] January 2025 announcement adds 50/100/150/200/300 Mbps POP leased-line options, alongside existing lower-bandwidth options, and MTBT over 300 Mbps. This is a different published connectivity route from the 2018 T-category recommendation. [S20] |
| Own front end / empanelment | [verified] Members may develop NNF software; exchange testing/approval and vendor/ASP empanelment information are on the protocol page. [S1] [unknown] A separate “data-feed empanelment” requirement for every member displaying data only to its own registered clients was not established. Obtain the member permission and application terms, not merely a vendor tariff. [S1, S4, S22] |
| Client display boundary | [verified] Member data may be provided to registered trading clients under the member circular’s conditions; that does not grant unrestricted public redistribution. [S4, S18] [verified] NDAL policy requires agreed permissions for redistribution and for creating indices/financial instruments from data. [S22] |

### NDAL subscription tiers and published charges

[verified] The domestic tariff is effective 1 April 2026. Amounts below are annual INR fixed charges unless a per-user charge is explicitly shown; applicable taxes and additional delivery/connectivity costs are separate. These are commercial NDAL tariff categories, not an assertion that a member owes vendor charges for its entitled registered-client display. [S21, S4, S22]

| Domestic software/charting data-vendor category | Fixed annual fee | Domestic user fee per month |
|---|---:|---:|
| CM L1 | [verified] ₹25,50,000 [S21] | [verified] ₹875 [S21] |
| CM L2 | [verified] ₹40,00,000 [S21] | [verified] ₹1,500 [S21] |
| CM L3 | [verified] ₹42,50,000 [S21] | [verified] ₹1,675 [S21] |
| CM TBT | [verified] ₹53,00,000 [S21] | [verified] ₹1,775 [S21] |
| FO L1 / L2 | [verified] ₹25,50,000 / ₹40,00,000 [S21] | [verified] ₹875 / ₹1,515 [S21] |
| CD L1 / L2 / TBT | [verified] ₹9,00,000 / ₹17,00,000 / ₹18,00,000 [S21] | [verified] ₹375 / ₹750 / ₹850 [S21] |
| WDM L1 | [verified] ₹4,50,000 [S21] | [verified] ₹215 [S21] |
| Index | [verified] ₹4,60,000 [S21] | [verified] ₹305 [S21] |

| Other domestic licence tier | Published annual examples / terms |
|---|---|
| Non-display, single site | [verified] CM L1/L2/L3/TBT: ₹23.9/32.9/34.5/51.9 lakh; FO L1/L2: ₹23.9/32.9 lakh; CD L1/L2/TBT: ₹10.1/13.8/17 lakh; index ₹4.6 lakh. [S21] |
| Internal display, single site | [verified] CM L1/L2/L3/TBT: ₹24.4/35.5/38.2/47.7 lakh; FO L1/L2: ₹24.4/35.5 lakh; CD L1/L2/TBT: ₹6.4/14.8/15.9 lakh; index ₹4 lakh. [S21] |
| Snapshots | [verified] One-minute CM or FO ₹16 lakh, CD ₹8 lakh; five-minute CM or FO ₹4.2 lakh, CD or WDM ₹2.2 lakh, per medium. [S21] |
| Fifteen-minute delayed | [verified] CM or FO ₹1.2 lakh; CD or WDM ₹65,000 per medium. [S21] |
| Stock-wise | [verified] One stock ₹11,000; up to five stocks of a group company ₹27,500; additional stocks ₹2,800 each, subject to the tariff’s ten-stock maximum. [S21] |
| Analytics | [verified] Tariff separates internal use, client display and combined use, with different one-minute/one-second/TBT charges. [S21] [unknown] Do not substitute these for the underlying raw-feed licence without NDAL’s product terms. [S22, S23] |
| COM, expanded catalogue and overseas use | [unknown] This extract does not establish a complete price for COM, CBRICS/RFQ, every analytics variant, or overseas redistribution. Obtain the relevant current order form; the tariff page publishes a separate international schedule. [S21, S22] |

| Application step | Route / required distinction |
|---|---|
| Member exchange feed | [verified] Use member infrastructure/colo applications and exchange support, with Extranet UDP manuals and current multicast/stream files; member circulars give `msm@nse.co.in`. [S4, S19, S30] |
| Commercial direct feed | [verified] NDAL subscription is by order form and written agreement; direct delivery needs the dedicated POP leased line. [S10, S22] |
| Via authorised vendor | [verified] NSE explicitly permits purchasing through an authorised data vendor. [S10] [unknown] Vendor internet API format, symbol limits, recovery, latency and fees must be obtained from that vendor’s agreement; they are not NSE wire-protocol guarantees. [S10, S22] |
| Licence classification | [uncertain] Before committing, document whether use is member-client display, public redistribution, internal display, non-display processing, derived analytics or overseas delivery, and have NSE/NDAL confirm the applicable permission. The published categories do not collapse into one “broker front-end licence”. [S4, S21, S22] |

## Source register

[verified] All sources below are NSE/NSE Data & Analytics primary publications. `archives.nseindia.com` links are NSE archive copies; some downloads are ZIP bundles containing the cited circular. [S1–S30]

| ID | Primary document and locator |
|---|---|
| S1 | [verified] [NSE trading-system protocols and member-development page](https://www.nseindia.com/static/trade/platform-services-neat-trading-system-protocols), current version catalogue. |
| S2 | [verified] [CM Trimmed NNF Protocol 6.6](https://nsearchives.nseindia.com/web/mediaattachment/2026-08/TP_CM_Trimmed_NNF_PROTOCOL_6.6_20260803151116.pdf), broadcast header, chapter 7, connectivity chapter. |
| S3 | [verified] [FO Trimmed NNF Protocol 9.50](https://nsearchives.nseindia.com/web/mediaattachment/2026-08/TP_FO_Trimmed_NNF_PROTOCOL_9.50_20260820170606.pdf), revision history and broadcast structures. |
| S4 | [verified] [NSE/MSD/74019, 30 April 2026](https://nsearchives.nseindia.com/content/circulars/MSD74019.pdf), consolidated member market-data dissemination, annexures. |
| S5 | [verified] [MTBT API Specification 7.1](https://nsearchives.nseindia.com/web/mediaattachment/2026-09/MTBT_CM_NNF_PROTOCOL_7.1_20260902170834.pdf), headers, event messages, recovery, FAQs and load-balancer appendix. |
| S6 | [verified] [NSE/MSD/75324, 21 July 2026](https://nsearchives.nseindia.com/content/circulars/MSD75324.pdf), mandatory FO broadcast migration on 5 September. |
| S7 | [verified] [NSE/MSD/74764, 18 June 2026](https://nsearchives.nseindia.com/content/circulars/MSD74764.pdf), original bhavcopy discontinuation notice. |
| S8 | [verified] [NSE/MSD/76457, 21 September 2026](https://nsearchives.nseindia.com/content/circulars/MSD76457.pdf), revised bhavcopy deadline and DAT availability. |
| S9 | [verified] [CM 6.7](https://nsearchives.nseindia.com/web/mediaattachment/2026-09/TP_CM_Trimmed_NNF_PROTOCOL_6.7_20260930175847.pdf) and [FO 9.51](https://nsearchives.nseindia.com/web/mediaattachment/2026-09/TP_FO_Trimmed_NNF_PROTOCOL_9.51_20260930175019.pdf), September revision tables. |
| S10 | [verified] [NSE real-time data subscription](https://www.nseindia.com/static/market-data/real-time-data-subscription), level definitions, delivery, snapshot and delayed products. |
| S11 | [verified] [NSE FPI FAQs brochure](https://nsearchives.nseindia.com/web/sites/default/files/inline-files/FPI%20FAQs_Brochure.pdf), market-data product/segment matrix, p. 25. |
| S12 | [verified] [NDAL real-time CM L1/L2/L3 1.33](https://nsearchives.nseindia.com/web/mediaattachment/2026-08/Real_time-CM-L1L2L3-V1.33.pdf), revision history, CAS and FAQ 15–16. Filename directory is August; revision history includes September. |
| S13 | [verified] [NDAL real-time CDS L1/L2 1.6](https://nsearchives.nseindia.com/web/sites/default/files/inline-files/Real%20time-CDS-L1L2-V1.6.pdf), commercial packet/compression specification. |
| S14 | [verified] [NDAL commodity L1/L2 1.6](https://nsearchives.nseindia.com/web/mediaattachment/2026-07/NSE_commodity_Market_Feed_L1L2-v1.6.pdf), catalogue diagram and commercial feed. |
| S15 | [verified] [NDAL CM/CD TBT 6.6](https://nsearchives.nseindia.com/web/mediaattachment/2026-09/Realtime_CM_CD_TBT_ver_6.6.pdf), product scope, FO discontinuation and TBT transport. |
| S16 | [verified] [Real-time Index Feed 1.30](https://nsearchives.nseindia.com/web/mediaattachment/2026-08/Realtime_Index_Feed_Data_v1.30.pdf), `CX`, `CI`, `CH`. |
| S17 | [verified] [Snapshot MDR CM 1.33](https://nsearchives.nseindia.com/web/mediaattachment/2026-05/Snapshot_MDR_RT_CM_v1.33.pdf), snapshot delivery and catalogue diagram. |
| S18 | [verified] [NSE/MSD/38190, 29 June 2018 — ZIP](https://archives.nseindia.com/content/circulars/MSD38190.zip), MTBT fee abolition, non-colo T-category scheme and applications. |
| S19 | [verified] [NSE/MSD/73958, 29 April 2026 — ZIP](https://archives.nseindia.com/content/circulars/MSD73958.zip), consolidated colo circular; infrastructure, ENIT and charges, particularly pp. 13–14. |
| S20 | [verified] [NSE commodity connectivity press release, 21 January 2025](https://nsearchives.nseindia.com/web/sites/default/files/2025-01/PR_cc_21012025.pdf), POP bandwidth and MTBT. |
| S21 | [verified] [Domestic pricing, effective 1 April 2026](https://nsearchives.nseindia.com/web/mediaattachment/2026-04/Download_Pricing_file_-_Domestic_clients_20260424122229.pdf), thirteen-page tariff; [tariff catalogue](https://www.nseindia.com/static/market-data/products-tariff). |
| S22 | [verified] [NSE Data Usage and Sharing Policy](https://www.nseindia.com/static/market-data/nse-data-policy), subscriptions, agreements and permitted use. |
| S23 | [verified] [NSE analytical products](https://www.nseindia.com/static/market-data/analytical-products) and [Real Time Market Data Analytics brochure](https://nsearchives.nseindia.com/s3fs-public/inline-files/Real_Time_Market_Data_Analytics_Brochure.pdf), June 2019. |
| S24 | [verified] [NSE/MSD/73425, 23 March 2026](https://nsearchives.nseindia.com/content/circulars/MSD73425.pdf), Solace retirement and TCP snapshot endpoints. |
| S25 | [verified] [NSE/MSD/70707, 8 October 2025](https://nsearchives.nseindia.com/content/circulars/MSD70707.pdf), correction of CM TCP snapshot port following the introduction notice. |
| S26 | [verified] [NSE/MSD/73149, 5 March 2026](https://archives.nseindia.com/content/circulars/MSD73149.pdf), FO/CD TCP snapshot introduction, retry and connection lifecycle. |
| S27 | [verified] [NSE/MSD/66082, 10 January 2025](https://archives.nseindia.com/content/circulars/MSD66082.pdf), CM old-feed retirement extension. |
| S28 | [verified] [NSE/MSD/69328, 28 July 2025](https://nsearchives.nseindia.com/content/circulars/MSD69328.pdf), new FO broadcast parameters and bhavcopy code. |
| S29 | [verified] [NDAL real-time FO L1/L2 1.11](https://nsearchives.nseindia.com/web/mediaattachment/2026-08/Real_time-FO-L1L2-V1.11.pdf), including CAS reference-price message. |
| S30 | [verified] [NSE/CMTR/76170, 3 September 2026](https://nsearchives.nseindia.com/content/circulars/CMTR76170.pdf), CAS reference-price/band alignment for index futures. |

## Gaps and cautions

| Unestablished item | Document / evidence that would settle it |
|---|---|
| [unknown] Definitive maximum NNF UDP datagram, decompressed size, fragmentation and packet-count limit; apparent 512-byte-array versus larger-message issue. [S2, S3] | [unknown] Current NNF broadcast transport specification or NSE clarification covering compressed and uncompressed cases, plus production/test packet captures. |
| [unknown] NNF process-to-sequence mapping, reset semantics, definitive gap detection, replay and late-join recovery. [S2, S3] | [unknown] NSE broadcast sequence/recovery specification and member UDP application manual; interactive recovery documentation alone does not settle multicast recovery. |
| [unknown] Current emission/availability of legacy `7200` MBO, and complete CD/CO/SLBM/EGR transaction-code matrices. [S1–S4] | [unknown] Current segment-specific broadcast manuals and production dissemination circulars. This report’s detailed code table is CM/FO, not an invented cross-segment mapping. |
| [unknown] Exact live index-value cadence and universal L1/L2 update frequencies/latency guarantees. [S2, S12–S16] | [unknown] Current dissemination-frequency/SLA annexures for each product; heartbeat timing is insufficient. |
| [unknown] Universal UDP/TLS contract for all commercial level feeds; stock-wise transport/schema; direct internet raw-feed availability. [S10, S12–S14, S21] | [unknown] NDAL network/interface specifications and signed delivery schedule for the chosen product. |
| [unknown] Per-instrument subscribe/unsubscribe extension, group quotas, IGMP version and join limits. No such token opcode is defined in the reviewed NNF/MTBT catalogues. [S2–S5] | [unknown] Extranet UDP application/network manual and any newer subscription extension circular. |
| [unknown] Exact redundant-channel delay and source assignment, formal “A/B” equivalence, reset/deduplication guarantees and universal MTBT datagram maximum. [S4, S5] | [unknown] NSE multicast redundancy/network specification and stream-operating notes. |
| [unknown] Current COM TCP snapshot endpoint and activation details; common replay service for NDAL L1/L2/L3/index. [S4, S5, S12–S16, S24] | [unknown] COM snapshot enablement circular and each NDAL product’s recovery-service specification. |
| [unknown] Resolution of CAS `TR` versus `TC`; precise entitlement to expanded catalogue labels and two-minute snapshots. [S11, S12, S14, S17] | [unknown] NDAL erratum, current product matrix/order form and CAS test-feed confirmation. |
| [unknown] A universal 2026 protocol-version mandate, a new separately licensed low-latency product, or separate CAS-feed fee. [S1, S6, S9, S21] | [unknown] Explicit dated implementation/launch/tariff circular. Absence from reviewed material is not proof of exchange-wide nonexistence. |
| [unknown] Complete current fees for every segment/product, replacement T-category terms, and exact licensing classification for this broker’s planned display/non-display/public/overseas use. [S18–S22] | [unknown] NSE member provisioning confirmation, current NDAL domestic/international order forms and the broker’s executed data agreement. |

# BSE and MCX market-data dissemination — 2026 implementation research

## Evidence and version boundaries

| Convention | Meaning |
|---|---|
| `[verified]` | Read in the identified exchange document; verification applies to that document/version, not automatically to the production configuration on 15 October 2026. |
| `[likely]` | Reserved for strong secondary evidence; not used for conclusions here because the requested evidence standard is primary sources only. |
| `[uncertain]` | Interpretation or implementation inference, with its primary-source basis identified. |
| `[unknown]` | Not established; the cited source or named replacement document identifies the outstanding evidence. |
| Access limitation | [verified] Several BSE PDFs were readable only through indexed passages; BSE's interface landing page and direct downloads returned access errors. MCX ZIP downloads were not readable. Two MCX manuals were read as exchange-authored PDFs hosted by a circular archive; those mirrors are explicitly identified below. [S1–S10, S13, S16] |
| Production baseline | [unknown] A complete, exchange-confirmed October 2026 release matrix was not obtained. Historical BSE FAST IDs below are deliberately version-labelled; they are not instructions to deploy those templates. Obtain the current segment-specific package from BSE and MCX before coding against it. [S1, S5, S6, S10, S13, S16] |

## 1. BSE interface catalogue

| BSE name | Content and encoding | Network arrangement | Bandwidth / latency and access |
|---|---|---|---|
| `MDI` — `Market Data Interface` | [verified] Netted, price-aggregated depth; FAST. [S2 §3.4] | [verified] Multicast; snapshots and incrementals share a channel. [S7 pp.5–6] | [verified] The connectivity comparison gives five levels, approximately **2.5 MBPS**, all networks, one feed across partitions. [S2 §3.4] |
| `EMDI` — `Enhanced Market Data Interface` | [verified] Un-netted price-aggregated depth; FAST. [S2 §3.4] | [verified] Multicast channels carry product groups; snapshots are separate from incrementals. [S7 pp.5–6] | [verified] The comparison gives five configured levels, approximately **50 MBPS**, all networks, partition-wise feeds. [S2 §3.4] |
| `EOBI` — `Enhanced Order Book Interface`; also `BSE Order by Order market data stream` | [verified] Individual visible orders, full depth, proprietary binary encoding. [S2 §3.2.2; S4 §5.4] | [verified] Separate incremental/snapshot channels with A/B services appear in the connection tables. [S3 §5.3] | [verified] The comparison gives approximately **230 MBPS**, partition-wise feeds, **BSE colocation only**. [S2 §3.4] |
| `Direct NFCAST` / `NFCAST (Snapshot)` | [verified] Netted five-level price-aggregated snapshots; binary. [S2 §3.4; S4 §5.4] | [verified] Multicast; each update is a replacement snapshot, without a separate incremental feed. [S7 pp.5–6,56] | [verified] Approximately **2.5 MBPS**, all networks, one feed across partitions in the comparison. [S2 §3.4] |
| `RDI` — `Reference Data Interface` | [verified] Reference/master data repeatedly multicast; an EOD master file is also described. [S2 §3.3] | [verified] Connection tables publish incremental and snapshot addresses. [S3 §5.3] | [unknown] Present production enablement, eligibility and separate charges require confirmation: the older market-data manual explicitly calls RDI unavailable. [S6 §2 versus S2 §3.3] |

[verified] BSE's equity master circular identifies these market-data feeds as services for ETI/API users. [S4 §5.4] [unknown] A separate public entitlement specification covering non-member direct recipients of each trading multicast feed was not established; commercial data-vending eligibility is a separate question. [S4; S21]

[verified] EMDI is designed for complete, low-latency updates within its configured depth, and EOBI for complete visible-book updates; their traffic increases with activity. MDI and Direct NFCAST reduce traffic by netting. [S7 p.5] [unknown] The quoted approximate bandwidths are not verified 2026 capacity requirements or latency SLAs; obtain the current segment/partition sizing sheet. [S2]

## 2. MCX interface catalogue

| MCX name | Content | Transport / arrangement | Availability and eligibility |
|---|---|---|---|
| `MCX MDI (Market Data Interface)` | [verified] Netted price-level data; individual trades are replaced by statistics. [S10; S13 §1.5] | [verified] UDP/FAST, combined snapshot/incremental channel. [S13 §§1.4,2.1] | [verified] Live connectivity lists `MDI-High`, a high-frequency market-data multicast. [S12 Annexure 1] [unknown] A current separately offered `MDI-Low` feed, netting interval, and complete connection-type eligibility were not established. [S12; S13] |
| `MCX EMDI (Enhanced Market Data Interface)` | [verified] Un-netted price-level updates and individual trades. [S10] [verified] External policy calls it Level 3, **20 best bid/ask levels**. [S17 §5.3] | [verified] UDP/FAST; distinct incremental and snapshot ports. [S12; S13] | [verified] Members need P2P leased lines; EMDI is configured only on EOBI/TBT-enabled P2P links. [S12 notes] |
| `MCX EOBI (Enhanced Order Book Interface) – Tick by Tick Data` | [verified] Un-netted full visible order book, executions and state changes. [S10] | [verified] UDP multicast, uncompressed little-endian binary; separate snapshot service; stated MTU **1372 bytes**. [S11 pp.7–8] | [verified] P2P delivery exists outside any claimed colo-only restriction. Members and empanelled ISVs may apply for the API. [S10; S12] [unknown] A distinct MCX colo delivery/entitlement offering was not established. [S10; S12] |
| `MCX Reference Data Files (Masters)` | [verified] Instrument, participant, asset and asset-underlying mapping masters. [S15] | [verified] File delivery via SFTP/FTP; **no messaging download for instrument master**. [S15 p.6] | [verified] Document addresses members connecting through Open Interface. [S15 p.6] |
| Standalone `RDI` | [verified] No RDI product appears in the inspected MCX interface catalogue or live-address circular. [S10; S12] [unknown] A separately provisioned MCX RDI multicast service is not established; do not import BSE/Eurex RDI into MCX's deployed catalogue. [S10; S12; S15] | [unknown] No verified MCX RDI address, packet layout, template ID, subscription or tariff. Obtain an explicit MCX RDI service specification if offered. [S10; S15] | [unknown] Not established. [S10; S15] |
| Other low-bandwidth products | [verified] MCX separately sells commercial Level 1/Level 2 feeds, including Internet delivery. [S18] [unknown] These are not established as a separate T7 `NFCAST` interface; no MCX NFCAST product was found in the inspected catalogue. [S10; S18] | [unknown] Do not equate the external commercial transport with member multicast transport without its API specification. [S17; S18] | [verified] External data subscription has its own agreement process. [S17 §4.3] |

[verified] MCX distinguishes high-bandwidth EMDI from lower-bandwidth MDI; its EOBI manual targets low latency and high throughput. [S13 §1.2; S11 §2] [unknown] Current per-stream peak bitrates and numeric feed-latency guarantees were not established. The interface page's **2 Mbps or above** P2P statement is not evidence that 2 Mbps can carry today's complete EOBI traffic. [S10; S23]

## 3. Packet and message details

### FAST envelopes and header fields

| Interface / version | Published envelope and decoded header | Sequencing / distinction |
|---|---|---|
| BSE EMDI, manual v1.3.5 | [verified] Header fields: `PartitionID` (`uInt32`), `SenderCompID` (`uInt32`), `PacketSeqNumber`, `SendingTime`, `PerformanceIndicator` (byte vectors). Last field is incremental-only. [S5 §11.1.2] | [verified] `PerformanceIndicator` describes ETI input-to-market-data socket timing in this BSE document. [S5] |
| BSE MDI, v1.3.5 | [verified] `SenderCompID`, `PacketSeqNumber`, `SendingTime`; no `PartitionID` or `PerformanceIndicator` in this header. [S5 §11.1.3] | [verified] Header sequencing supports A/B duplicate detection. [S5 §§7.2,10.3.1] |
| MCX MDI/EMDI, v1.6 | [verified] Datagram: packet header → FAST reset → message(s); message: `PMAP` → `TID` → data. Network byte order; independent decoding per datagram. [S13 §2.1] | [verified] EMDI header fields match the five names above, but `PerformanceIndicator` is **unused**. MDI has the three-field subset. `PacketSeqNumber` is scoped by sender and multicast address/port. [S13 §§5.1,6.1] |
| BSE/MCX decoding package | [unknown] Complete current XML operator definitions, field-presence rules, header lengths and all byte offsets were not verified against October 2026 deployed templates. Obtain the venue's XML FAST package; a logical FIX tag table is insufficient to construct a decoder. [S1; S10; S13] | [uncertain] Shared field names do not prove wire compatibility. [S5; S13] |

### FAST template identifiers actually read

[verified] The following identifiers are from **BSE v1.3.6 Table 8** and **MCX v1.6 Table 4**, respectively. [S6 §5.2.3; S13 §2.2.3] [unknown] BSE's historical numbers need replacement/confirmation from the current release; the BSE manual expressly warns that packet-header TIDs can change. [S6]

| Exact message label | BSE EMDI | BSE MDI | MCX EMDI | MCX MDI | Evidence |
|---|---:|---:|---:|---:|---|
| `Functional Beacon` | 109 | — | 109 | — | [verified] S6; S13 |
| Packet header | 111 | 116 | 60 | 65 | [verified] S6; S13 |
| `FAST Reset Message` | 120 | 120 | 120 | 120 | [verified] S6; S13 |
| `DepthSnapshot` | 93 | 101 | 93 | 101 | [verified] S6; S13 |
| `DepthIncremental` | 94 | 102 | 94 | 102 | [verified] S6; S13 |
| `ProductStateChange` | 97 | 108 | 97 | 108 | [verified] S6; S13 |
| `MassInstrumentStateChange` | 99 | 104 | 99 | 104 | [verified] S6; S13 |
| `InstrumentStateChange` | 98 | 103 | 98 | 103 | [verified] S6; S13 |
| `ComplexInstrumentUpdate` | 124 | 105 | Not listed | Not listed | [verified] Listing difference, not proof of universal absence: S6; S13 |
| `Index Stats` | Not established | Not established | 50 | 51 | [verified] MCX: S13; [unknown] BSE current package: S1 |

| Snapshot versus incremental | Published distinction |
|---|---|
| BSE depth messages | [verified] Snapshot is time-driven, per instrument; incremental reflects book changes. `MarketDepth` (264) sets depth. `MsgSeqNum` (34) is absent from EMDI depth snapshots; `LastMsgSeqNumProcessed` (369) links them to incrementals. MDI snapshots use `MsgSeqNum` and `RefreshIndicator` (1187), not that linkage field. [S8 §11.3.1] |
| MCX depth messages | [verified] Same distinction; `RefreshIndicator=Y` requires applying the MDI refresh. `MDUpdateAction` (279) includes `0 New`, `1 Change`, `2 Delete`, `3 Delete Thru`, `4 Delete From`, `5 Overlay`. [S13 §§6.2–6.3] |
| Individual orders | [verified] MDI/EMDI describe aggregated price levels, not individual orders. [S8 §9.3; S13 §1.5] [uncertain] Consequently their depth-entry identifiers must not be used as exchange order IDs. [S8; S13] |

### MCX EOBI binary identifiers

| Message | Template ID | Evidence |
|---|---:|---|
| `Packet Header` | 13003 | [verified] S11 pp.21–22 |
| `Heartbeat` | 13001 | [verified] S11 p.22 |
| `Order Add` / `Order Modify` / `Order Delete` / `Order Mass Delete` | 13100 / 13101 / 13102 / 13103 | [verified] S11 pp.20–21 |
| `Full Order Execution` / `Partial Order Execution` / `Order Modify Same Priority` | 13104 / 13105 / 13106 | [verified] S11 pp.20–21 |
| `Trade Report` / `Execution Summary` | 13201 / 13202 | [verified] S11 pp.20–21 |
| `Product State Change` / `Instrument State Change` / `Mass Instrument State Change` | 13300 / 13301 / 13302 | [verified] S11 pp.20–21 |
| `Top Of Book` | 13504 | [verified] S11 p.20 |
| `Product Summary` / `Instrument Summary` / `Snapshot Order` | 13600 / 13601 / 13602 | [verified] S11 p.21 |
| `Instrument Info` / `Index Info` | 13603 / 13604 | [verified] S11 pp.44,47 |

[verified] MCX EOBI's envelope is a packet header followed by messages for one product. Message-header fields are `BodyLen` (9), `TemplateID` (28500), `MsgSeqNum` (34). Packet-body fields are `ApplSeqNum` (1181), `MarketSegmentID` (1300), `PartitionID` (5948), `CompletionIndicator` (6228), `ApplSeqResetIndicator` (28841), `Pad5` (25020), `TransactTime` (60). Packet-header `MsgSeqNum` is unused. [S11 pp.14–15,21–22]

| Order identity issue | Finding |
|---|---|
| MCX EOBI | [verified] The reserve-field mapping associates `Reserve2`/21026 with previous priority and `Reserve4`/21008 with new priority; individual layouts mark them unused. [S11 pp.20,26–29] [unknown] An unambiguous supported order key is therefore not established from this manual. Obtain corrected layouts and sample add/modify/delete/execution packets; do not invent an `OrderID` or assume the generic Eurex timestamp key. [S11] |
| BSE EOBI | [unknown] The BSE EOBI manual and current binary layout were not readable. Exact header, template IDs, order key, timestamps, quantity widths and sequence/reset fields remain unverified. Obtain **BSE EOBI Manual v1.4 or successor**, plus its layout/header file from S1. MCX identifiers above are not BSE verification. [S1; S24] |

### Direct NFCAST

[verified] In v5.0 the first four bytes identify message type; the manual instructs a 2000-byte read and big-endian conversion. `Market picture Message` IDs **2020, 2021, 2033** require the documented decompression; 2021 has an eight-byte spread token. It explicitly states that no product/stream sequence number exists. [S7 pp.6,56] [unknown] The complete current NFCAST layout and any successor to v5.0 must be obtained from S1; 2000-byte read guidance is not a claim about every message's actual length. [S1; S7]

## 4. Subscribing and unsubscribing

### ETI application subscriptions

| Operation | BSE | MCX |
|---|---|---|
| Request | [verified] `Subscribe`, **10025**, `ApplicationMessageRequest` / `BW`; `RefApplID` (1355), `SubscriptionScope` (25001). Duplicate pairs forbidden. [S9 §7.7.22] | [verified] `Subscribe-10025`; same selection fields and duplicate-pair prohibition. [S16 §5.6.1] |
| Acknowledgement | [verified] `Subscribe Response`, **10005**; `ApplSubID` (28727) identifies the subscription. [S9 §7.7.23] | [verified] `Subscribe Response-10005`; same returned identifier. [S16 §5.6.2] |
| Revoke | [verified] `Unsubscribe`, **10006**, using `RefApplSubID` (28728); `Unsubscribe Response`, **10007**. [S9 §§7.7.24–25; S26 §7.4.2] | [verified] `Unsubscribe-10006` / `Unsubscribe Response-10007`; one subscription identifier per request. [S16 §§5.6.8–9] |
| Request framing | [verified] BSE request header includes `BodyLen`, `TemplateID`, `NetworkMsgID`, padding, then `MsgSeqNum`, `SenderSubID`; subscribe body is scope/application ID/padding. [S9 §7.7.22] | [verified] MCX publishes the same structural grouping but different padding tags. [S16 §5.6.1] [unknown] October 2026 encryption/session framing requires the current ETI package. [S10] |

| Scope | BSE published values | MCX published values / contradictions |
|---|---|---|
| Trade | [verified] `RefApplID=1`; session ID for session scope, no-value for business-unit scope. [S9] | [verified] §4.23.9 has no-value for own session; p.37 has session ID for self and **0** for member-wide drop copy. [S16 pp.36–37] |
| News / general messages | [verified] `2`; news scope **1**. [S9] | [verified] `2`; no-value in the request layout; “Market” in the drop-copy table. [S16 pp.37,203] |
| Service availability | [verified] `3`; partition ID or no-value for all partitions. [S9] | [verified] Partition/no-value in p.36; conflicts with p.203's session-ID instruction for other broadcasts. [S16] |
| Listener | [verified] `5` is listed. Older scope tables describe session and business-unit history, but print no-value for both. [S9; S27 pp.52–53] | [verified] `5`; session scope; member scope **0**; no user-group listener in the p.37 table. [S16] |
| Trade enhancement / exercise | [verified] BSE lists `0 Trade Enhancement`. [S9] | [verified] MCX lists `12 Ex/Dex`; trade enhancement is delivered under trade subscription. [S16 §5.6.1] |
| Risk control | [verified] Automatic, no subscription required in the inspected BSE and MCX descriptions. [S27 p.53; S16 p.36] | [verified] Same. [S16 p.36] |

[verified] MCX listener conveys the current business day's standard-order history; it is private drop copy, not the public market book. [S16 §4.18] [verified] BSE's older session restrictions prohibit listener/news subscriptions on HF sessions and say only HF sessions were then available. [S28 §5.1] [unknown] Do not infer that BSE listener is enabled in 2026 merely because template 10025 lists it; obtain the current session-entitlement matrix. Likewise MCX's conflicting scope tables need an exchange erratum. [S9; S16; S28]

### Multicast consumption: different meaning of “subscribe”

| Layer | Mechanics and boundary |
|---|---|
| Product selection | [verified] BSE tells receivers to join the multicast address carrying desired products, using reference-data mapping, then filter unwanted partitions. An address can contain several products. [S5 §10.3.3] [uncertain] “Per-product address” should therefore mean a product-to-stream mapping, not a unique multicast group per instrument. [S5] |
| IGMP | [uncertain] Implement multicast join/leave membership on the exchange-facing NIC/socket, normally through the OS's IP multicast membership API and network IGMP handling; bind the specified UDP port. This is an implementation inference from the published multicast delivery model. [S3; S12] [unknown] Required IGMP version, source-specific membership, router timers and allowed group counts were not found; obtain the exchange network configuration guide. [S1; S10] |
| Unsubscribe | [uncertain] Leaving a multicast group stops local reception of that group; it is not ETI `Unsubscribe(10006)`. Removing one UI watchlist item need not leave the group if other instruments still need it. [S5; S9; S12; S16] |
| Firehose boundary | [verified] These manuals describe pushed multicast channels and receiver-side filtering, not per-client market-watch request/response. [S5; S11; S13] [uncertain] Each joined channel is a firehose for its assigned products; selecting channels does not make it a per-security server subscription. [S5; S12] |
| Which feeds can be selected? | [verified] BSE MDI, EMDI, EOBI and NFCAST have published multicast endpoints; EMDI/EOBI also expose snapshot channels. MCX lists MDI plus EMDI/EOBI incremental/snapshot endpoints. [S3; S12] [unknown] No ETI scope for subscribing to these public feeds was established. [S9; S16] |
| MCX operational requirement | [verified] MCX/TECH/008/2026 asks EMDI/EOBI members to receive **all streams**, because products can move; changes appear in the SFTP stream master. [S14] [uncertain] An implementation that joins only today's favourite commodities risks losing them after a remapping. [S14] |
| A/B | [verified] BSE connection tables expose distinct A/B addresses. MCX protocol manuals describe live/live A/B, but the September 2026 connection circular gives PDC/DRS stream endpoints without labelled A/B pairs. [S3; S11; S12; S13] [unknown] MCX's member-facing physical A/B delivery must be confirmed; PDC and DRS must not simply be relabelled A and B. [S12] |

### Published endpoint examples — configuration evidence, not a complete live inventory

| Venue / feed | Endpoint(s) | Evidence |
|---|---|---|
| BSE currency MDI | A `229.0.0.19:10994`; B `229.0.0.20:10995` | [verified] S3 §5.3 |
| BSE currency EMDI, partition 1 | Incremental A/B `229.0.0.23:10923`, `.24:10924`; snapshot A/B `.25:10925`, `.26:10926` | [verified] Same `229.0.0` prefix: S3 §5.3 |
| BSE currency EOBI, partition 1 | Incremental A/B `236.0.0.1:10901`, `.2:10902`; snapshot A/B `.3:10903`, `.4:10904` | [verified] Same `236.0.0` prefix: S3 §5.3 |
| BSE currency NFCAST | `229.0.0.21:10996` | [verified] S3 §5.3 |
| MCX PDC MDI | `239.255.70.3:19096` | [verified] S12 Annexure 1 |
| MCX PDC EMDI stream 1 | `239.255.70.10`, incremental **19088**, snapshot **19090** | [verified] S12 Annexure 1 |
| MCX PDC EOBI stream 1 | Incremental `239.255.70.4:19088`; snapshot `239.255.70.5:19090` | [verified] S12 Annexure 1 |
| MCX DRS MDI / EMDI stream 1 | MDI `239.255.71.3:19096`; EMDI `239.255.71.10`, ports **19088/19090** | [verified] S12 Annexure 2 |

[verified] S12 lists eight EMDI streams, eight EOBI streams and an EOBI index stream per site. EMDI stream 5 uses **19068/19070**; not every stream uses the stream-1 ports. [S12] [unknown] Obtain the current full address and stream-master files rather than expanding the examples arithmetically. [S12; S14]

## 5. Gap detection and recovery

| Interface | Gap detection / recovery |
|---|---|
| BSE EMDI | [verified] Per-product `MsgSeqNum` is contiguous on incrementals. Try the other live service; if neither copy arrives, rebuild from snapshots. EMDI depth snapshots omit `MsgSeqNum` and carry `LastMsgSeqNumProcessed`. [S8 §7.4.1] |
| BSE MDI | [verified] Snapshots/incrementals share the sequence domain and channel; apply mandatory refreshes. [S7 p.6] [unknown] Current timing guarantees and restart rules require the deployed MDI manual. [S1] |
| BSE EOBI | [verified] Connectivity manual prescribes rebuilding from the replayed pending order book. [S2 §3.4] [unknown] Exact BSE EOBI gap/reset fields and product-cycle boundaries await its manual. [S1] |
| BSE Direct NFCAST | [verified] A subsequent complete snapshot replaces the affected book; no stream/product sequence exists. [S7 p.6] [uncertain] This restores current state, not the missing intermediate events or their chronology. [S7] |
| MCX MDI/EMDI | [verified] Packet sequencing is sender/channel scoped; message sequencing is product scoped. Repair from A/B, otherwise snapshots. EMDI uses `LastMsgSeqNumProcessed`; MDI shares `MsgSeqNum` between snapshots and incrementals. [S13 §§5–6] |
| MCX EOBI | [verified] `ApplSeqNum` sequences channel packets; `MsgSeqNum` sequences product updates. Buffer incrementals during recovery, install the product snapshot, then apply messages above `LastMsgSeqNumProcessed`. Service restart resets sequences to 1; `ApplSeqResetIndicator` marks initial restart packets. [S11 pp.9,12–15] |
| ETI retransmission | [verified] BSE `Retransmit` **10008** / response **10009**; order-event retransmit **10026** / response **10027**. Recovery selects application and partition, not a public multicast packet. [S26 §7.4.2; S27 §6.10] [verified] MCX uses the same IDs; sequence ranges use `ApplBegSeqNum`/`ApplEndSeqNum`, order-event ranges `ApplBegMsgID`/`ApplEndMsgID`. [S16 §5.6] |

[verified] MCX EMDI depth cycles lack explicit start/end messages: detect product transitions for a sender, or recurrence of the first `SecurityID` for each sender. A failover restarts that sender's cycle. [S13 §5.3.1] [unknown] A universal fixed snapshot-cycle duration, recovery-time SLA, or public-market-data TCP retransmission endpoint was not established for either venue. Obtain feed-specific production recovery specifications; ETI private-event retransmission does not establish such a service. [S1; S11; S13; S16; S27]

[verified] MCX's ETI general recovery text calls partition selection mandatory, but its `10008` field table says not to set `PartitionID` for News/Risk Control/SRQS Maintenance. [S16 pp.37,205] [unknown] The supported exceptions and inherited text need confirmation; do not implement a blanket “partition always required” rule. [S16]

## 6. Reference data and intraday changes

| Venue / mechanism | Established content and limitations |
|---|---|
| BSE RDI/RDF | [verified] Historical RDI TIDs: header **114**, `MarketDataReport` **125**, `ProductSnapshot` **122**, `InstrumentSnapshot` **123**, `InstrumentIncremental` **121**, reset **120**. [S6 Table 8] [unknown] These describe a specification whose introduction says RDI/RDF were unavailable; they do not prove a live 2026 RDI service. [S6 §2] |
| BSE operational files | [verified] The later connectivity manual describes multicast reference data and EOD master files. [S2 §3.3] [unknown] Current master filenames, publication cutoffs, SOD/EOD version handling, and whether RDF means the same product as the operational master must be confirmed from BSE's current master-file specification. [S1; S2; S6] |
| BSE intraday definitions | [verified] The historical design sends complex-instrument changes through MDI/EMDI and a richer RDI incremental; RDI appends changes to its repeating snapshot cycle. [S6 §9.2.8] [unknown] Deployment of this RDI portion remains unresolved. [S2; S6] |
| MCX master | [verified] `MCXScrips.bcp`: comma-separated ASCII; contains `Instrument PartitionID`, `ProductID`, instrument identifiers and contract attributes. The master says `ProductID` corresponds to ETI `MarketSegmentID(1300)`. [S15 p.6] |
| MCX stream mapping | [verified] Master v1.2 says partition also identifies EMDI/EOBI stream. The 2026 movement circular instead instructs use of stream-master updates at `https://sftp.mcxindia.com/`, `/Common/Contract Master`. [S15; S14] [uncertain] Maintain distinct partition/product/feed-stream mappings, refreshed together; do not assume numerical equality forever. [S14; S15] |
| MCX intraday state/reference | [verified] EOBI describes intraday complex-instrument changes. [S11 pp.7–8] [verified] MDI/EMDI v1.6 adds `MDEntryType` **7 Upper Circuit Limit**, **8 Lower Circuit Limit** to depth incrementals. [S13 revision history] [unknown] These do not establish complete intraday replacement of the file master or a standalone RDI. [S13; S15] |
| MCX definitive negative | [verified] The file specification explicitly excludes instrument-master messaging download. [S15 p.6] [unknown] It does not establish that every kind of reference-field update is absent from every broadcast. [S11; S13; S15] |

## 7. Fees, licensing and application route

### Trading-member access versus commercial data rights

| Venue / interface | Application route and fee finding |
|---|---|
| BSE MDI | [verified] Listed for ETI/API users. [S4] [unknown] Current activation form, separate feed fee and default entitlement were not established; obtain member market-data entitlement/charge schedule from BSE through S1. |
| BSE EMDI | [verified] Listed for ETI/API users and all networks in the comparison. [S4; S2] [unknown] Current activation procedure, bandwidth charge and separate licence fee need written BSE confirmation. [S1] |
| BSE EOBI | [verified] Colocation-only in the comparison. [S2] [unknown] Current feed tariff and application form were not read; obtain current colocation guidelines, EOBI enablement form and charging circular. [S20; S1] |
| BSE Direct NFCAST | [verified] Listed as snapshot service for ETI/API users. [S4] [unknown] Current activation and separate pricing not established. [S1] |
| BSE RDI/RDF | [unknown] Live entitlement and tariff unresolved; request an explicit production-status response, not merely a copy of the historical specification. [S1; S2; S6] |
| MCX MDI | [verified] Member CTCL route; MCX publishes in-house CTCL and IBT/WT application packages. [S19; S25] [unknown] A separately priced MDI member subscription was not established. [S19] |
| MCX EMDI | [verified] `Application by Member for EMDI facility` in CTCL downloads; TBT-enabled P2P line required. [S19; S12] [unknown] Member-specific feed fee not established; external-vendor EMDI prices below must not automatically be applied. [S22] |
| MCX EOBI | [verified] `Application by Member for Tick by Tick facility`; member/empanelled-ISV API access; interactive traffic disabled on the TBT line in the interface-page description. [S19; S10] [unknown] Current member-specific feed fee separate from connectivity not established. [S22; S23] |
| MCX reference files / hypothetical RDI | [verified] File download for members. [S15] [unknown] No separate reference-file fee or RDI application/tariff established. [S15; S19] |

[verified] MCX's published connectivity schedule lists annual P2P connectivity charges of **₹2,00,000** for 10–100 Mbps, **₹4,00,000** for 200/300 Mbps and **₹5,00,000** for 500 Mbps, in addition to PORT charges; carrier last-mile costs are separate. [S23] [unknown] These are not an all-in EMDI/EOBI quote. [S23]

### Commercial MCX prices actually published

[verified] These are **domestic vendor** prices effective **1 July 2024**, still linked by the inspected datafeed page; prices exclude taxes. They are not established trading-member feed charges. [S18; S22]

| Commercial licence product | Fixed annual price | Variable charge | Evidence |
|---|---:|---|---|
| Data vendor Level 1 | ₹36,28,800 | ₹800/terminal/month; delayed entitlement ₹300 | [verified] S22 p.2 |
| Data vendor Level 2 | ₹49,24,800 | ₹1,200/terminal/month; delayed entitlement ₹300 | [verified] S22 p.2 |
| Level 3 `EMDI` — data/software vendor | ₹50,27,400 | ₹1,500/terminal/month; delayed entitlement ₹300 | [verified] S22 p.2 |
| `EOBI` — data/software vendor | ₹54,00,000 | ₹1,500/terminal/month; delayed entitlement ₹300 | [verified] S22 p.2 |
| Non-display enterprise/global EMDI | ₹50,27,400 | Refer applicable agreement | [verified] Fixed fee: S22 p.4; [unknown] broker applicability |
| Non-display enterprise/global EOBI | ₹54,00,000 | Refer applicable agreement | [verified] Fixed fee: S22 p.4; [unknown] broker applicability |

[verified] MCX requires external requestors to submit its prescribed requisition and sign an agreement. Its commercial page prohibits member resale and requires direct subscribers to contract with MCX; redistribution has separate rights. Contact **datafeed@mcxindia.com** for licensing, **ctcl@mcxindia.com** for member applications, **apisupport@mcxindia.com** for protocol clarification. [S17 §4.3; S18; S19; S11]

[verified] BSE publishes a domestic Information Products tariff for data vendors, software vendors, websites and other consumers, distinct from trading-interface documentation. [S21] [unknown] A verified mapping from those commercial tariff rows to MDI/EMDI/EOBI/NFCAST member access, broker-authenticated display, public website display and non-display use was not established. Obtain a BSE quote naming the interface, segment, use and redistribution rights; do not assume a zero-priced trading feed grants unrestricted redistribution. [S4; S21]

[verified] MCX policy v7.1 distinguishes permissible real-time data sharing, written usage agreements and anonymity of client/member identities. [S17 §§4–6] [uncertain] For a broker-built frontend, the licensing request should explicitly name authenticated client display, charts/storage, public pages, analytics/non-display processing and any onward API. A socket entitlement alone does not answer all those questions. [S17; S18; S21]

## 8. Conflicts and misleading equivalences

| Issue | Evidence on both sides | Treatment |
|---|---|---|
| BSE RDI availability | [verified] S6 §2 says unavailable; S2 §3.3 describes continuous service and S3 supplies endpoints. | [unknown] Obtain current enablement confirmation; neither silently erase RDI nor claim it is definitely active. |
| MCX EOBI product coverage | [verified] S10/S11 describe selected benchmark derivatives; policy v7.1 says all commodity derivatives. [S17 §5.3] | [unknown] Current stream master settles actual instrument coverage. |
| MCX live/live versus address sheet | [verified] Manuals describe A/B; S12 labels PDC/DRS, without A/B pairs. | [unknown] Network provisioning documentation must identify redundancy actually delivered to the member. |
| MCX ETI scope | [verified] S16 pp.36–37 and p.203 disagree on session/no-value/zero and service-availability scope. | [unknown] Require a corrected request matrix and simulation examples. |
| MCX EOBI order key | [verified] S11 reserve mapping gives priority semantics; message layouts call the fields unused. | [unknown] Require an exchange-supported order identity algorithm. |
| RDI text inside MCX MDI manual | [verified] S13 §5.3.1 refers to consulting a reference snapshot feed; S15 expressly excludes master messaging, and S10/S12 list no RDI service. | [unknown] Treat this as unresolved inherited-design text, not evidence of an accessible MCX RDI endpoint. |
| Bandwidth statements | [verified] S10 mentions 2 Mbps or above; S23 lists modern P2P capacities up to 500 Mbps. | [uncertain] Minimum historical eligibility is not current peak-traffic sizing. |
| Filename versus document version | [verified] MCX's `mcx-eobi-v1-2.pdf` download contains **v1.5**, circular **MCX/CTCL/451/2025**, dated 8 September 2025. [S11] | [uncertain] Pin downloaded content/version, not URL filename. |

## Source register

| ID | Primary source and locator | Read status / boundary |
|---|---|---|
| S1 | [BSE trading-interface download page](https://www.bseindia.com/nta.aspx) | [unknown] Landing page inaccessible during research; obtain current manuals/XML/binary layouts here or from BSE. |
| S2 | [BSE BOLTPLUS Connectivity Manual, content v1.3](https://www.bseindia.com/downloads1/BOLTPLUS_Connectivity_ManualV12.pdf), §§3.2–3.4 | [verified] Exchange-hosted indexed comparison read; historical bandwidth/location evidence. |
| S3 | [BSE BOLTPLUS Connectivity Manual v1.12.2](https://www.bseindia.com/downloads1/BOLTPLUS_Connectivity_Manual_V1_12_2.pdf), §5.3 | [verified] Exchange-hosted indexed currency endpoint table read. |
| S4 | [BSE Equity Segment Master Circular, 20250429-51](https://www.bseindia.com/markets/MarketInfo/DownloadAttach.aspx?attachedId=8a7fec3a-95bc-4bd2-82de-76e2a84e2915&id=20250429-51), §5.4 | [verified] Exchange-hosted indexed interface catalogue read. |
| S5 | [BSE Market Data Interfaces Manual v1.3.5](https://www.bseindia.com/downloads1/BSE_market_data_manual_v135.pdf), §§7.2,10.3,11.1 | [verified] Indexed header/filter/recovery passages read; not a current release assertion. |
| S6 | [BSE Market & Reference Data Interfaces Manual v1.3.6](https://www.bseindia.com/downloads1/BSE_market%20data_manual_v%20136.pdf), §§2,5.2.3,9.2.8 | [verified] Indexed template, availability and reference-change passages read. |
| S7 | [BSE Direct NFCAST Manual v5.0](https://www.bseindia.com/downloads1/BSE_DIRECT_NFCAST_Manual.pdf), pp.5–6,56 | [verified] Indexed transport, netting, header and sequence passages read. |
| S8 | [BSE Market Data Interfaces Manual v1.3.4](https://www.bseindia.com/downloads1/BSE_market_data_manual_v134.pdf), §§7.4.1,9.3,11.3.1 | [verified] Indexed depth and recovery passages read. |
| S9 | [BSE ETI API Manual v1.6.11](https://www.bseindia.com/downloads1/ETI_API_Manual.pdf), §§7.7.22–25 | [verified] Indexed subscribe/unsubscribe fields read. |
| S10 | [MCX Trading Interfaces](https://www.mcxindia.com/technology/ctcl/trading-interfaces) | [verified] Full exchange page read; several linked ZIPs could not be decoded. |
| S11 | [MCX EOBI v1.5, MCX/CTCL/451/2025](https://www.mcxindia.com/docs/default-source/technology-services/new-trading-interfaces/mcx-eobi-v1-2.pdf?sfvrsn=32aa572a_2) | [verified] Exchange-hosted PDF read; misleading old filename. |
| S12 | [MCX live connectivity circular 509/2026, September 2026](https://www.mcxindia.com/docs/default-source/circulars/english/2026/september/circular-509---2026.pdf?sfvrsn=b41d2c18_1), Annexures 1–2 | [verified] Exchange-hosted PDC/DRS tables and line restrictions read. |
| S13 | [MCX/CTCL/005/2026, MDI/EMDI v1.6 — exchange URL](https://www.mcxindia.com/docs/default-source/circulars/english/2026/january/mcxctcl0052026-trading-market-data-interface-%28api%29-mdi-emdi---v1-6.pdf?sfvrsn=ce0f3f9e_0); [exchange-authored PDF mirror read](https://www.ricago.com/assets/front/base/file/file_management/4923.pdf) | [verified] Full manual downloaded and text-extracted from mirror; exchange URL failed. [unknown] Independent byte equality with exchange-hosted copy and subsequent production go-live not established. |
| S14 | [MCX/TECH/008/2026, 7 January 2026 — exchange circular PDF mirror](https://www.ricago.com/assets/front/base/file/file_management/4944.pdf) | [verified] Exchange-authored circular read; all-stream subscription and file-mapping instructions. |
| S15 | [MCX Reference Data Files v1.2](https://www.mcxindia.com/docs/default-source/technology-services/new-trading-interfaces/mcxctcl5062021-mcx-reference-data-files-%28masters%29.pdf?sfvrsn=d40d6956_2) | [verified] Exchange-hosted file-master specification read. |
| S16 | [MCX/CTCL/536/2024, ETI v1.4.2 — exchange-authored PDF mirror](https://avantiscdnprodstorage.blob.core.windows.net/legalupdatedocs/34560/MCX_notified_regarding_the_Trading_Binary_Interface_Aug162024.pdf) | [verified] Full manual downloaded and text-extracted; explicit 2024 baseline, not claimed latest. |
| S17 | [MCX External Data Feed Policy v7.1](https://www.mcxindia.com/docs/default-source/datafeedlink/mcx-data-feed-policy38a0d709-e1eb-4115-8188-f06cb7bd4a02.pdf?sfvrsn=c57f9a2b_2) | [verified] Exchange-hosted policy read; document control records June 2026 approval. |
| S18 | [MCX Datafeed: categories, eligibility, procedure and contacts](https://www.mcxindia.com/technology/datafeed) | [verified] Exchange page read; commercial service, distinct from CTCL. |
| S19 | [MCX CTCL Downloads](https://www.mcxindia.com/technology/ctcl/ctcl-downloads) | [verified] Application-package names read; ZIP contents unavailable. |
| S20 | [BSE Colocation Guidelines v2.0, notice 20250812-34](https://www.bseindia.com/markets/MarketInfo/DownloadAttach.aspx?attachedId=4c504b01-0b41-459f-9878-d26e1387ed02&id=20250812-34) | [verified] Document identified through exchange indexing; [unknown] complete fee/enablement provisions not read. |
| S21 | [BSE Information Products Domestic Tariff Sheet](https://www.bseindia.com/downloads1/Information_Products_Pricing_Sheet.pdf) | [verified] Indexed commercial product descriptions read; no inferred member-interface tariff. |
| S22 | [MCX Domestic Vendor Price List, effective 1 July 2024](https://www.mcxindia.com/docs/default-source/datafeedlink/mcx-data-feed-price-list-for-domestic-vendors----effective-from-july-01-20246be30cd5-d0b6-46c8-a0de-10c9cfabed14.pdf?sfvrsn=c41d4e85_1) | [verified] Exchange-hosted PDF read. |
| S23 | [MCX Connectivity](https://www.mcxindia.com/gu/technology/connectivity) | [verified] Exchange P2P capacity and connectivity-charge table read. |
| S24 | [BSE notice 20250528-44 — exchange circular PDF mirror](https://avantiscdnprodstorage.blob.core.windows.net/legalupdatedocs/43074/BSE-notified-regarding-the-Enhancement-in-Market-Data-Streams-MAY292025.pdf) | [verified] Exchange-authored notice names EOBI v1.4, MDI/EMDI v1.4.4 and NFCAST v5; supersession in 2026 requires current package. |
| S25 | [MCX CTCL](https://www.mcxindia.com/technology/ctcl) | [verified] Member eligibility and application overview read. |
| S26 | [BSE ETI v1.5.3](https://www.bseindia.com/downloads1/ETI_API_Manual_Live.pdf), §7.4.2 | [verified] Historical message-ID catalogue read through exchange indexing. |
| S27 | [BSE ETI v1.6.2](https://www.bseindia.com/downloads1/ETI_API_Manual_v16_2.pdf), broadcast/recovery sections | [verified] Indexed scope and partition-recovery passages read. |
| S28 | [BSE ETI v1.5.5](https://www.bseindia.com/downloads1/ETI_API_Manual_V155.pdf), §5.1 | [verified] Historical HF/LF restrictions read through exchange indexing. |

## Gaps and cautions

| Unresolved item | Document / evidence that would settle it |
|---|---|
| October 2026 production versions and cutovers | [unknown] Obtain BSE's current segment release matrix, including notices **20260709-11** and **20260805-32**, corresponding MDI/EMDI/NFCAST packages, and MCX v1.6 go-live confirmation. Those BSE notices could not be read from the exchange in this research. [S1; S13; S24] |
| BSE EOBI packet details and order identity | [unknown] BSE EOBI v1.4 or successor manual, binary header/layout/schema, and sample captures. No MCX/Eurex layout should be substituted. [S1; S24] |
| MCX EOBI supported order key | [unknown] Erratum resolving reserve-field priority semantics versus “not used”, plus add/modify/delete/execution examples. [S11] |
| FAST production XML and exact wire sizes | [unknown] Current BSE and MCX XML templates, including reset handling and packet-header schema; only historical BSE IDs were verified. [S1; S6; S10; S13] |
| ETI scope contradictions and BSE listener availability | [unknown] Current ETI message references, session entitlement matrix and exchange-certified subscription test cases; MCX pp.36–37/203 need reconciliation. [S9; S16; S28] |
| MCX public A/B mapping; IGMP details | [unknown] Current member network guide with A/B physical links, source IPs, multicast groups, IGMP version and router configuration. PDC/DRS tables alone do not settle this. [S12] |
| Complete current product/partition/stream maps | [unknown] Daily production stream master plus product master and movement circulars; examples above are not a complete configuration. [S3; S12; S14; S15] |
| RDI production existence/status | [unknown] BSE RDI activation circular resolving S6 versus S2; an MCX RDI service manual/endpoint circular if MCX offers it. MCX instrument-master messaging is expressly excluded, but that is narrower than proving no reference broadcasts exist. [S2; S6; S10; S15] |
| Snapshot timings, retransmission and failure limits | [unknown] Feed-specific snapshot schedule, maximum recovery window, restart rules, any public packet-replay service API/endpoint, and retry/rate limits. Private ETI retransmission cannot fill this evidence gap. [S11; S13; S16; S27] |
| Current peak bandwidth and numerical latency | [unknown] Venue-issued production capacity plan per segment/stream and service-level specification; approximate BSE comparison figures and MCX's historical line minimum are insufficient. [S2; S10; S23] |
| Member feed fees and broker display rights | [unknown] Current member fee circulars and signed entitlement schedule separately covering each feed, authenticated display, public display, storage, non-display analytics and redistribution. Vendor tariff rows are not a broker-specific quote. [S19–S23] |
| Master file lifecycle and intraday completeness | [unknown] Current SOD/EOD master delivery specification, update/version protocol and intraday instrument-change coverage. MCX's file master and market broadcasts must be reconciled operationally. [S1; S13; S15] |
| Mirror provenance | [unknown] Obtain exchange-hosted copies of S13, S14 and S16 and compare checksums/version histories before treating their detailed layouts as a deployment contract. These are exchange-authored primary documents read from mirrors, not secondary commentary. |

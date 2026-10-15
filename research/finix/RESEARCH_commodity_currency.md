# Commodity, currency and interest-rate derivatives: operations research

| Research boundary | Treatment |
|---|---|
| As-of date and purpose | **2026-10-15**; research for a greenfield Indian broker operating NSE, BSE and MCX. User-specified scope; not a claim of exchange approval for this broker. |
| Evidence convention | Each factual table row carries its evidence class and linked source; that classification covers the factual assertions in the row. **[verified]** = directly supported by a primary source, within the source's stated scope/date; **[likely]** = corroborated by at least two named independent secondary sources; **[uncertain]** = weak, incomplete or conflicting evidence; **[unknown]** = not established. Reference links resolve to the actual source URLs in the source register. |
| Recommendations versus rules | Rows explicitly marked **recommended broker control** describe proposed implementation choices. They do not establish a regulatory deadline, mandatory form, or an approved policy for this broker. Their adoption is **[unknown]**. |
| Temporal interpretation | “Notified” identifies publication; “effective” identifies operation; future-effective changes are separated. A published specification establishes product design, not proof that every expiry is liquid or available through every broker. |
| Source priority | Dated operative regulator/exchange/clearing-corporation circulars take precedence over inconsistent older specifications and FAQs. Conflicts and inaccessible implementation material are retained in the final gaps table. |
| Notation | Working definitions: CC = clearing corporation; CM = clearing member; TM = trading member; OI = open interest; WSP = warehouse service provider; T = delivery tender/allocation day where stated, otherwise trade day; E = expiry day; P = delivery payout day. All stated clock times are IST. |

## PART A — MCX COMMODITY OPERATIONS

### A1. Physical delivery: governing framework and lifecycle

| Stage / question | Verified operation and boundary | Evidence |
|---|---|---|
| Minimum staggered delivery period | SEBI reduced the minimum from five to **three working days**. Notified **2024-05-24**, effective **2024-07-01** for applicable staggered delivery periods. A statement that all current contracts necessarily have five tender days is obsolete. | [verified] [SEBI staggered-delivery circular][A01] |
| Contract-specific delivery terms | The settlement obligation, tender dates, delivery unit, quality, centres and settlement cycle come from the applicable contract and monthly delivery calendar. The October 2026 calendar distinguishes ComRIS and CCRL settlement and different intention deadlines. | [verified] [October delivery calendar][A03] |
| Staggered delivery mechanism | Sellers submit delivery intentions during the tender window; CC allocates delivery against eligible open longs. Assignment can occur before expiry. Unallocated positions continue subject to the contract; outstanding expiry positions in a compulsory-delivery contract must settle by delivery. | [verified] [MCXCCL delivery FAQ][A08]; [Gold specification][A02] |
| Seller readiness | A seller must have acceptable, valid, unencumbered deliverable stock in the designated system/location, meet the delivery unit and complete the required earmarking/pay-in. Holding a futures short or merely possessing goods elsewhere does not satisfy commodity pay-in. | [verified] [MCXCCL ComRIS FAQ][A07]; [Gold specification][A02] |
| Marking intention versus earmarking stock | The member submits the client's delivery intention; the corresponding receipt quantity must be earmarked for delivery. These are separate records, reconciled with the open position and delivery obligation. ComRIS records receipt ownership, balances and earmarking. | [verified] [MCXCCL ComRIS FAQ][A07] |
| Actual intention interface: conflict | The current MCXCCL FAQ names **MCXCCL BaNCS** for intentions; the Gold August-2026-onwards document still names **eClear**. The operational screen/API and cut-off configuration require member-side confirmation. ComRIS's identity is not in dispute. | [uncertain] Conflicting primary texts: [MCXCCL FAQ][A07], [Gold specification][A02] |
| Buyer–seller matching | For Gold's primary centre, allocation is random against open buyers, with possible preference to buyers who expressed intention. An allocated buyer cannot refuse delivery. Additional-centre matching has a separate window and process; it must not be represented as voluntary delivery for every open long. | [verified] [Gold specification][A02] |
| Delivery order price versus expiry price | Gold tender delivery uses the applicable closing/daily settlement price; expiry delivery uses the **due date rate (DDR)**. MCXCCL separately publishes DDRs. The final futures settlement and the invoice/delivery consideration must be reconciled without charging the same price movement twice. | [verified] [Gold specification][A02]; [MCXCCL clearing and settlement FAQ][A21] |
| Delivery margin: rate | For the cited Gold and Mentha contracts: **higher of 25% or [3% + five-day, 99% VaR of spot-price volatility]**. This is a formula with a floor, not a universal fixed 25% for all commodities. | [verified] [Gold specification][A02]; [Mentha specification][A20] |
| Delivery margin: when | Delivery margin applies to positions marked for delivery and is maintained through the prescribed pay-in stage. It is distinct from the cumulative tender-period margin and from the full funds/commodity settlement obligation. | [verified] [MCXCCL risk FAQ][A17] |
| Early commodity pay-in | SEBI's **June 19, 2026** clarification, effective **September 21**, permits early deposit of certified goods against relevant derivatives contracts; CC may exempt margins based on risk perception, but must continue collecting MTM. Relief is conditional, not automatic merely because a receipt exists. | [verified] [SEBI early-pay-in clarification][A44]; [MCXCCL procedure][A09] |
| Commodity pay-in and payout | Seller transfers/earmarks receipts under the CC's settlement process; buyer pays the delivery consideration; CC releases commodity and funds according to the calendar. Receipt payout establishes the commodity holding; later warehouse withdrawal is a separate logistics step. | [verified] [October delivery calendar][A03]; [MCXCCL ComRIS FAQ][A07] |
| Buyer after payout | Buyer may retain eligible stock in the warehouse, transfer it through the permitted receipt process, or arrange physical withdrawal. Storage, validity and lifting requirements continue after futures expiry. | [verified] [MCXCCL warehousing FAQ][A10]; [MCXCCL ComRIS FAQ][A07] |
| Full funding | Delivery margin does not replace the buyer's obligation to provide the full delivery funds. Likewise, a seller's margin does not replace acceptable commodity pay-in. | [verified] [Gold delivery procedure][A02]; [October delivery calendar][A03] |

### A2. Worked delivery calendar: October 2026, not a universal timetable

| Contract / action | Actual dates or times in the cited schedule | Status / evidence |
|---|---|---|
| GOLD / GOLDM, October expiry | Tender dates **September 30, October 1 and October 5**; expiry **October 5**; expiry delivery pay-in/payout **October 6**. The intervening calendar days illustrate why “last three days” cannot mean three consecutive calendar dates. | [verified] Notified **September 22, 2026**; [MCXCCL C&S/206/2026][A03] |
| Gold primary-centre intentions | **19:30**; Gold procedure also requires valid free stock earmarking by **19:30** on the tender day. | [verified] [October calendar][A03]; [Gold procedure][A02] |
| Gold additional centres | The Gold procedure uses **09:30–11:30** on the last two trading days excluding expiry, matching by **12:00**, and separate movement/pay-in requirements. This does not replace primary-centre deadlines. | [verified] [Gold procedure][A02] |
| Gold settlement clocks | Gold procedure specifies funds pay-in by **12:00** and commodity/funds payout at **14:00** on the applicable settlement working day; expiry commodity pay-in is by **12:00 on E+1**. The actual dated calendar determines which day is E+1. | [verified] [Gold procedure][A02]; [October calendar][A03] |
| NICKEL, October expiry | Tender **October 19–21**; expiry **October 21**; expiry settlement **October 22**; intention deadline **17:00**. | [verified] [October calendar][A03] |
| Base-metal month-end contracts | Relevant aluminium, copper, lead, steel-rebar and zinc contracts: tender **October 28–30**, expiry **October 30**, expiry settlement **November 2**; intention deadline **17:00**. | [verified] [October calendar][A03] |
| Mentha / Cardamom | October expiry **October 30**; expiry settlement **November 3** under the calendar's **CCRL T/E+2** arrangement, unlike the cited ComRIS T/E+1 settlements; intention deadline **15:00**. | [verified] [October calendar][A03] |
| Payout-account preference | CM submits the commodity payout preference by **12:00 on payout day**; the calendar describes payout to the CM account when the preference is absent. | [verified] [October calendar][A03] |
| Invoice workflow | Buyer supplies invoice details on payout day; seller uploads the soft invoice by **14:00 on P+1 working day**; buyer confirms by **18:00 on P+1**; the calendar separately specifies additional-document submission within **three working days**. | [verified] [October calendar][A03] |
| September 2026 invoice change | Circular dated **September 22, 2026**, applicable “henceforth,” adds delivery date, settlement number, grade/purity and warehouse address to the required invoice details and directs use of online ComRIS facilities instead of insisting on physical invoices. GST disputes are not resolved by MCXCCL under this facility. | [verified] [MCXCCL C&S/207/2026][A04] |

### A3. Failure to give or take delivery

| Failure / exposure | Consequence and calculation boundary | Evidence |
|---|---|---|
| Seller default: non-agricultural commodity | **3% of settlement price**, plus positive replacement-price difference. Replacement reference is the higher of the last spot prices on payout day and the following day. Apply the prescribed calculation to the defaulted quantity; do not treat the percentage as the entire possible debit. | [verified] [SEBI delivery-default framework, March 23, 2021][A05] |
| Seller default: agricultural commodity | **4% of settlement price**, plus positive replacement-price difference using the average of the three highest last spot prices in the five succeeding days after payout, as specified. | [verified] [SEBI delivery-default framework][A05] |
| Distribution of default penalty | Framework allocates at least **1.75%** to the settlement guarantee fund, up to **0.25%** towards administration, and **1% non-agri / 2% agri** plus the replacement-price component to the buyer. | [verified] [SEBI delivery-default framework][A05] |
| Buyer default | Buyer default is prohibited. CC determines the penalty with reference to seller loss, subject to the prescribed delivery-margin cap on that penalty. This is not a cap on delivery consideration or every other contractual liability. | [verified] [SEBI delivery-default framework][A05]; [Gold procedure][A02] |
| Repeated delivery default | SEBI's **August 17, 2021** circular provides an additional **3% of delivery-default value** for the stipulated repeated-default condition: three or more occasions over a rolling six months. Effective one month after issuance. | [verified] [SEBI repeated-default circular][A06] |
| Effective date of base framework | The March 23, 2021 seller/buyer-default framework took effect from the **first trading day of May 2021**. It is an operative framework, not a 2026 consultation proposal. | [verified] [SEBI default framework][A05] |
| Broker cannot contract out of CC settlement | A no-delivery policy regulates the broker–client service and liquidation rights; an outstanding compulsory-delivery position still creates an exchange/CC obligation. A client recovery claim does not itself fund the CM's pay-in. | [verified] [Gold compulsory-delivery terms][A02]; [MCXCCL settlement FAQ][A21] |
| Residual-risk response | **Recommended broker control:** have an exception owner, CM escalation, emergency funding and receipt-procurement/receipt-acceptance arrangements even if normal service excludes delivery. Track any default debit and recovery separately. | [unknown] Proposed broker procedure; exchange obligations supported by [A02], [A05]. |

### A4. Warehouses, assaying, receipts and client holdings

| Topic | Operational finding | Evidence |
|---|---|---|
| WDRA's role | WDRA regulates the registered warehouse/negotiable-receipt framework. Warehouse registration, repository recording and CC accreditation are separate layers; a warehouse acceptable for a particular exchange contract must meet that contract's accreditation requirements. | [verified] [Government working-group report on regulated warehousing][A11]; [SEBI commodity FAQ][A12] |
| Exchange accreditation | MCXCCL empanels WSPs, accredits designated warehouses, publishes approved assayers and a deliverability/validity matrix, and provides warehouse/vault inspection information. These are WSP/CC functions; a trading broker need not itself operate a warehouse. | [verified] [MCXCCL warehousing operations][A13]; [warehouse inspection disclosures][A14] |
| Actual MCX system name | **ComRIS — Commodity Receipts Information System**. The actual MCXCCL portal is **https://comris.mcxccl.com/**. “Comtrack” is not the name to use for the MCX receipt interface. | [verified] [MCXCCL ComRIS FAQ][A07]; [official portal link][A13] |
| Where COMTRACK belongs | NCDEX material uses **COMTRACK**. It must not be substituted for MCXCCL's ComRIS in this broker's runbook or integrations. | [verified] [NCDEX warehouse stock report expressly naming COMTRACK][A15] |
| eWHR versus eNWR | MCXCCL documentation distinguishes **ComRIS electronic warehouse receipts** for relevant bullion/base-metal deliveries from agricultural deliveries through **CCRL electronic negotiable warehouse receipts (eNWRs)**. “Electronic receipt” alone does not establish that it is a WDRA negotiable receipt. | [verified] [MCXCCL ComRIS FAQ][A07]; [October delivery calendar][A03]; [CCRL terms][A16] |
| Negotiability and repository | CCRL's repository framework records eNWR/eNNWR holdings and permits the specified transfers/pledges through repository accounts. A commodity repository account must not be confused with the client's ordinary equity demat balance or with an exchange-traded electronic gold receipt product. | [verified] [CCRL terms][A16]; [CCRL repository services][A16b] |
| Account segregation | ComRIS provides client beneficiary accounts and separate member proprietary/client-margin arrangements, with UCC mapping. A receipt may be free, earmarked or pledged; the status affects availability for settlement. | [verified] [MCXCCL ComRIS FAQ][A07] |
| Deposit documentation | Warehousing FAQ identifies **Know Your Depositor (KYD)**, **Customer Declaration Document (CDD)** and **Commodity Acceptance Document (CAD)**. CAD is an initial acceptance document, not by itself the final eligible receipt/quality approval. | [verified] [MCXCCL warehousing FAQ][A10] |
| Assaying | Deliverability depends on contract quality specifications, approved assaying/certification, permitted tolerance, warehouse/brand and validity. MCXCCL publishes commodity-specific assayer and validity information; expiry of deliverability is not necessarily the same as physical deterioration. | [verified] [MCXCCL warehousing FAQ][A10]; [assayer/validity directory][A13] |
| Gold quality example | The cited Gold contract uses **995 purity**, eligible refiner/serialised bars and the required certificate; qualifying **999 purity** receives the specified proportionate adjustment, while below-995 material is not acceptable. This is a Gold example, not a quality rule for all bullion contracts. | [verified] [Gold contract and delivery procedure][A02] |
| Withdrawal | Delivery order/authority and prescribed identification/documentation govern warehouse lifting; an authorised representative can lift subject to procedure. Arrange logistics and check charges/quality records before release. | [verified] [MCXCCL warehousing FAQ][A10] |
| Storage and insurance | Charges vary by commodity, vault/WSP, receipt quantity and actual storage period; insurance coverage and whether its premium is included must be checked against the applicable tariff/agreement. No universal “MCX storage plus insurance percentage” was verified. | [verified] Commodity-specific tariffs exist: [May 2026 tariff][A18], [September tariff][A19]. [unknown] Universal insurance tariff. |
| Particular insurance-inclusive example | Secondary reports of the **February 25, 2026** Thane base-metal warehouse accreditation say insurance is included in that warehouse's storage charges. This supports that specific example only; the primary tariff body was inaccessible. | [likely] Independent summaries: [Noticeblue][A19b] and [TeamLease RegTech][A19c]. |
| Holding before delivery | Open futures OI is a derivative position; it does not by itself create a warehouse commodity balance. The receipt account identifies goods following delivery/receipt transfer. | [verified] [Gold settlement procedure][A02]; [MCXCCL ComRIS FAQ][A07] |
| Broker books: proposed representation | **Recommended broker control:** client-wise commodity quantity subledger keyed to beneficiary/UCC, commodity/grade, receipt identifier, warehouse, quantity/unit, validity and free/pledged/earmarked status; reconcile to ComRIS/CCRL and CM payout. Keep proprietary goods separate. | [unknown] Proposed internal ledger schema; segregation and receipt states supported by [A07], [A16]. No mandated universal chart of accounts verified. |
| Cash versus quantity accounting | **Recommended broker control:** separate derivative MTM/premium, delivery consideration, tax invoice, storage/insurance/assay/transport charges and client recovery entries. Do not automatically recognise client-owned goods as broker-owned inventory. Resolve principal-versus-agent accounting with the actual contracts and accounting policy. | [unknown] Proposed accounting control, not a verified accounting-standard conclusion for this entity; delivery/invoice inputs supported by [A03], [A04]. |

| Verified bullion storage tariff | Effective date | Charge; scope | Evidence |
|---|---|---|---|
| Gold, 1 kg bar | **2026-05-01**, notified April 15 | **₹45 per bar per day**; actual days, taxes extra. | [verified] [MCXCCL WO/076/2026, MCX circular 200/2026][A18] |
| Gold Mini, 100 g bar | **2026-05-01** | **₹5 per bar per day**; actual days, taxes extra. | [verified] [Tariff][A18] |
| Silver, 30 kg bar | **2026-05-01** | **₹45 per bar per day**; actual days, taxes extra. | [verified] [Tariff][A18] |
| Silver Micro / Mini, specified 1 kg / 5 kg delivery bars | **2026-05-01** | Published table states **₹2.25 per bar per day**; do not silently convert this into a per-kg tariff. | [verified] [Tariff][A18] |
| Gold Petal / Guinea / Ten, 1 g / 8 g / 10 g | **2026-09-01**, notified August 5 | **₹0.20 per bar per day**; actual days, taxes extra. This later revision supersedes the older tariff for these products. | [verified] [MCXCCL WO/171/2026, MCX circular 448/2026][A19] |

### A5. Broker that excludes physical delivery

| Issue | Operating policy / implication | Evidence |
|---|---|---|
| Compulsory-delivery contract | The cited Gold and Mentha contracts require delivery of expiry OI. A client checkbox declining physical delivery cannot convert such a contract into a cash-settled contract. | [verified] [Gold][A02]; [Mentha][A20] |
| Cash-settled contract | Crude oil and natural gas use cash-settlement arrangements and pre-expiry margins; they are not subject to warehouse delivery merely because their margins rise before expiry. Product classification must come from the current contract specification. | [verified] [Crude Oil specification][A46]; [Natural Gas specification][A47]; [October margin schedule][A22] |
| No universal broker liquidation time | An internal no-delivery cut-off is the broker's risk policy and must precede the contract's delivery risk window. The cited exchange sources do not prescribe one uniform retail-broker forced-exit hour for every commodity. | [unknown] Universal broker cut-off not verified. Contract windows: [A02], [A03]. |
| Documented broker example | Zerodha states that compulsory-delivery positions are squared off **one day before the tender period**; its published policy gives **12:30 for agricultural** and **22:30 for non-agricultural NRML** positions. These are **Zerodha's policy times**, not MCX-wide deadlines. | [verified] First-party policy: [Zerodha delivery-policy FAQ][A23] |
| Agreement and disclosure | **Recommended broker control:** client terms should explicitly state excluded delivery services, broker liquidation rights, client obligation to exit, charges/default recovery, and the possibility liquidation fails. Provide contract-specific notices rather than a generic expiry warning. | [unknown] Proposed broker policy; comparable first-party practice [A23], [Alice Blue RMS policy][A24]. |
| Entry, order and option controls | **Recommended broker control:** block opening/re-entry in the expiring future before the internal cut-off; cancel residual pending orders; include options capable of devolving into that future; apply limits across trading channels and intraday/carry-forward product labels. | [unknown] Proposed RMS design; devolvement mechanics supported by [A25]. |
| Residual delivery risk | Illiquidity, a locked price limit, system disruption or failed exit can leave OI for assignment. A broker's intended square-off is not proof of execution; reconciliation must use executed trades, final positions and CC delivery allocations. | [verified] Policy explicitly recognises liquidation limitations: [Alice Blue RMS policy][A24]; compulsory delivery: [A02]. |
| Cut-off ownership | **Recommended broker control:** maintain dated per-contract tender/expiry/cut-off records, approval owner, customer communication and an exception queue. Choose the safety buffer from liquidity, holiday and funding risk; no numeric buffer is invented here. | [unknown] Broker-specific policy not yet established. |

### A6. Sessions, international-market alignment and price limits

| Topic | Current rule / date boundary | Evidence |
|---|---|---|
| Normal session categories | MCX distinguishes non-agricultural, selected internationally linked agricultural, and other agricultural contracts. Its general framework permits non-agri trading **09:00–23:30 / 23:55**, selected agri to **21:00**, and other agri to **17:00**. | [verified] [MCX trading overview][A26] |
| Current summer timetable | The March 2026 revision sets non-agri **09:00–23:30**, selected agri **09:00–21:00**, other agri **09:00–17:00**, effective **March 9, 2026**. The exchange circular is available as a broker-hosted facsimile; the exact current period is independently corroborated. | [likely] [FYERS notice][A27] and [Ventura report][A28]; [facsimile of MCX/TRD/068/2026][A27b]. |
| Already notified winter timetable | **MCX/TRD/550/2026**, notified **September 29**, specifies **November 2, 2026–March 12, 2027**: non-agri **09:00–23:55**; Cotton, Cotton Seed Wash Oil and Kapas **09:00–21:00**; other agri **09:00–17:00**. **Not yet effective on October 15.** | [verified] [Dated MCX trading-hours circular][A29] |
| Reason for shift | The dated circular expressly attributes the revision to **US daylight-saving timing changes**. International-market alignment is therefore part of the operating calendar; do not implement a permanent 23:30 closing time. | [verified] [MCX/TRD/550/2026][A29] |
| Morning/evening holidays | MCX's holiday schedule distinguishes the **09:00–17:00 morning session** and the **17:00–23:30/23:55 evening session**. A morning holiday does not necessarily imply a full-day closure. | [verified] [MCX trading-holiday schedule][A26b] |
| New product exception | SUNOIL launched **October 12, 2026** with normal **09:00–21:00** trading and **17:00 expiry-day close**. A later-issued contract-specific rule can differ from a broad earlier “all other agri” description. | [verified] [MCX/TRD/568/2026][A39] |
| Gold daily price limits | Gold specification uses **3% → 6% without cooling-off**, then **9% after 15 minutes**; further **3-percentage-point steps** may be permitted for international-price movements under its conditions. This is not a universal fixed final 9% cap. | [verified] [Gold specification][A02] |
| Energy DPL example | Crude Oil and Natural Gas start at **4%**, expand to **6% without cooling-off**, then **9% after 15 minutes**; further **3-percentage-point** expansion is possible for the stated international-price condition. The opening slab differs from Gold. | [verified] [Crude Oil][A46]; [Natural Gas][A47] |
| Agricultural DPL example | Mentha and the new SUNOIL specification use **4% initially**, then **6% after 15 minutes** in the affected contract; trading remains possible within the original band during that interval. “Cooling-off” must not automatically be implemented as a complete market halt. | [verified] [Mentha specification][A20]; [SUNOIL specification][A39] |
| Evening operations | **Recommended broker control:** staff RMS, funding escalation, market-data monitoring and incident response through the actual close and post-trade processing; parameterise trade close, code-modification close and delivery-intention close separately. | [unknown] Proposed staffing/control design. Distinct session and delivery clocks: [A03], [A29]. |

### A7. Margin layers and operative October 2026 examples

| Margin layer | Meaning and trigger | Evidence |
|---|---|---|
| Initial / SPAN | Risk-based initial margin, subject to the commodity's minimum and the applicable margin period of risk (MPOR). The final requirement can exceed a published minimum; do not price a client's entire requirement from one percentage. | [verified] [October classification/minimum-margin circular][A30] |
| Extreme-loss margin (ELM) | Additional to initial margin. Gold's cited specification states **minimum 1%**, but current risk files/circulars determine the actual applicable rate. | [verified] Published Gold minimum: [A02]. [unknown] A complete October 15 commodity-by-commodity live ELM snapshot. |
| Additional versus special | Additional margin can apply on both sides during volatility; special margin may target the long or short side. Rate, scope and collateral/cash requirement depend on the operative imposition. | [verified] [SUNOIL contract's margin clauses][A39]; [MCXCCL risk FAQ][A17] |
| Tender period | Cumulative increments before compulsory delivery, with the monthly schedule identifying the dates and percentages. This is separate from margin on positions actually assigned for delivery. | [verified] [October tender/pre-expiry schedule][A22] |
| Delivery period | Assigned positions attract the applicable delivery-margin formula through pay-in; full delivery consideration/commodity is still due. | [verified] [MCXCCL risk FAQ][A17]; [delivery calendar][A03] |
| Pre-expiry, cash-settled energy | Crude oil and natural gas schedules impose an incremental **5% each day to 25%** over the specified five trading days. This is pre-expiry risk protection, not evidence of physical delivery. | [verified] [October schedule][A22] |
| Agricultural lean period | **2% additional lean-period margin** applies to the designated agricultural contracts expiring in the lean period. Applicability is seasonal/contract-specific. | [verified] [MCXCCL risk FAQ][A17]; [October minimum-margin circular][A30] |
| Calendar spread | Spread relief is withdrawn by the start of tender period or expiry day, whichever occurs earlier. A hedged calendar position can therefore require materially more margin as its front contract approaches delivery. | [verified] [MCXCCL risk FAQ][A17] |
| Concentration | Separate concentration margins use client/CM exposure, eligible commodities and incremental slabs; the revised thresholds take effect **October 15, 2026, beginning of day**, following notification on **October 12**. Computation is EOD for the next trading day. | [verified] [MCXCCL RISK/221/2026][A31] |
| Concentration examples | Revised CM slabs above **10%, 15%, 20%, 25%, 30%** of relevant OI attract incremental rates **1%, 2%, 3%, 4%, 5%**, respectively. Client slabs/rates depend on commodity grouping; this cannot be substituted for the client position limit. | [verified] [Concentration circular, annexures][A31] |
| Option premium / SOMM / devolvement | Premium funds the long option; short options face SPAN/SOMM, net option value and ELM under the methodology; expiring options can additionally attract devolvement margin. “Option buyer pays premium only” is incomplete near devolvement. | [verified] [MCXCCL risk FAQ][A17] |

| October 1, 2026 minimum-margin change | Published minimum initial margin | Interpretation / evidence |
|---|---|---|
| Gold and variants; Copper; Aluminium; Zinc; Nickel; Steel Rebar | **8%** | [verified] Notified **September 7**, effective **October 1**; [MCXCCL RISK/193/2026][A30]. Older Gold-specification 6% is not the operative minimum in this schedule. |
| Lead and variants | **6%** | [verified] [October minimum schedule][A30]. |
| Mentha; Kapas; Cotton Seed Wash Oil | **10%** | [verified] [October minimum schedule][A30]. Do not retain an inconsistent older Mentha-specification minimum. |
| Cardamom | **12%** | [verified] [October minimum schedule][A30]. |
| Electricity | **10%** | [verified] [October minimum schedule][A30]. |
| Crude oil and variants | **30%** | [verified] Explicit override in [October schedule][A30]; not simply the generic volatility-class minimum. |
| Natural gas and variants | **13%** | [verified] Explicit override in [October schedule][A30]. |
| Silver and variants | **11.50%** | [verified] Explicit override in [October schedule][A30]. |
| What the table does not establish | These are published minimum initial-margin inputs, **not all-in client margins or proof that no later intraday intervention occurred**. | [unknown] Complete live October 15 SPAN/additional/special-margin file set was not captured. |

| October 2026 contract | Cumulative tender / pre-expiry schedule | Evidence |
|---|---|---|
| GOLD / GOLDM | **Sep 30: 8.34%; Oct 1: 16.68%; Oct 5: 25%**. Final total is 25%, not a mechanically computed 25.02%. | [verified] [MCXCCL RISK/204/2026][A22] |
| CRUDEOIL / mini | **Oct 13: 5%; 14: 10%; 15: 15%; 16: 20%; 19: 25%**. | [verified] [October schedule][A22] |
| NICKEL | **Oct 19: 8.34%; 20: 16.68%; 21: 25%**. | [verified] [October schedule][A22] |
| NATURALGAS / mini | **Oct 21: 5%; 22: 10%; 23: 15%; 26: 20%; 27: 25%**. | [verified] [October schedule][A22] |
| Relevant month-end base metals; Gold Guinea/Petal/Ten; Silver100 | **Oct 28: 8.34%; 29: 16.68%; 30: 25%**. | [verified] [October schedule][A22] |
| CARDAMOM | **Oct 28: 11.68%; 29: 23.36%; 30: 35%**. | [verified] [October schedule][A22] |
| MENTHAOIL | **Oct 28: 5%; 29: 10%; 30: 15%**. This alone demonstrates why one tender-margin rate cannot cover all MCX contracts. | [verified] [October schedule][A22] |

### A8. Commodity position limits and near-month controls

| Layer / example | Limit and effective-date boundary | Evidence |
|---|---|---|
| Gold overall futures | Published Gold specification: client **higher of 5 MT or 5% of market-wide OI**; member **higher of 50 MT or 20%**; aggregation includes specified Gold variants. | [verified] [Gold specification][A02]. This is a product example; daily limit files remain necessary. |
| Energy futures examples | Crude Oil: client **480,000 barrels or 5% OI**, member **4,800,000 barrels or 20% OI**, higher. Natural Gas: client **6,000,000 mmBtu or 5% OI**, member **60,000,000 mmBtu or 20% OI**, higher; specified combined-contract aggregation applies. | [verified] [Crude Oil][A46]; [Natural Gas][A47] |
| Approved hedge limits | MCX grants additional hedge limits case by case against documentary physical exposure; they are non-transferable and unavailable for the near-month contract once its near-month limit applies. Members must continuously monitor sanctioned limits and immediately report breaches. | [verified] [MCX domestic hedge policy, policy/guidelines][A49] |
| Agricultural layers | The exchange sets client, member, near-month and exchange-wide limits. The newly notified schedule makes client near-month limits **one-quarter of overall client limits**, and member near-month limits **one-quarter of overall member limits**. | [verified] [MCX/S&I/579/2026][A34], **future effective October 26**. |
| Latest located numerical revision | **Notified October 14, effective October 26, 2026**. It must **not** be loaded as already effective on the October 15 research date. Member overall limit is the stated numerical floor or **15% of market-wide OI**, whichever is higher. | [verified] [Dated numerical-limit circular][A34] |
| Mentha future schedule | From October 26: client **390 MT overall / 97.50 MT near-month**; member numerical floor **3,900 MT overall / 975 MT near-month**, subject to the OI rule. | [verified] [Future-effective schedule][A34] |
| Cardamom future schedule | From October 26: client **240 MT / 60 MT**; member numerical floor **2,400 MT / 600 MT**, subject to the OI rule. | [verified] [Future-effective schedule][A34] |
| SUNOIL at launch | Launch specification: client **61,600 MT overall / 15,400 MT near-month**; member overall **616,000 MT or 15% of market-wide OI**, higher; member near-month one-quarter. | [verified] [October 12 launch specification][A39] |
| Current October 15 agri limits | The older Mentha specification and October 26 schedule cannot establish the complete operative October 15 numerical matrix. The latter references intervening **July 31** and **September 9** circulars; their full operative chain was not verified here. | [unknown] Current matrix; [verified] existence of intervening references in [A34]. |
| Proposed RMS implementation | **Recommended broker control:** maintain separate overall/near-month/member/clubbed-client exposures; convert lots to commodity units and combine variants under the applicable rule; ingest changing limits; apply hedger exemptions only after approval. | [unknown] Proposed implementation; not proof of this broker's exemption eligibility. |

### A9. Options on commodity futures and devolvement

| Event | Operation / broker implication | Evidence |
|---|---|---|
| Product structure | The cited Gold option is European and has a specified Gold futures contract as underlying. The option's expiry and underlying futures expiry are separate dates. | [verified] [Gold options July-2026-onwards specification][A25] |
| Exercise | In-the-money options are automatically exercised unless the long holder submits a valid contrary instruction under the applicable process; out-of-the-money options expire. Use the contract's settlement reference and exercise rules. | [verified] [Gold option specification][A25] |
| Position mapping | Exercised **long call → long future; long put → short future; short call → short future; short put → long future**. | [verified] [Gold option specification][A25] |
| Booking and risk | Futures are created at the strike under the prescribed exercise/settlement process. They require futures margin and can subsequently enter compulsory delivery. Reconcile exercise cash flows with futures marking to avoid duplicate P&L. | [verified] [Gold option specification][A25] |
| Sensitivity and margin preparation | MCXCCL supplies a sensitivity report modelling ITM options as futures and imposes devolvement margin. Its FAQ describes staged **one-quarter/one-half** collection, but the wording of the day sequence requires confirmation against the current dated schedule. | [verified] Staging exists: [MCXCCL risk FAQ][A17]. [uncertain] Exact production day-by-day interpretation from that FAQ alone. |
| Long-option client funding | **Recommended broker control:** warn and fund for the possible futures position before the last exercise/exit opportunity; a premium-funded long option can become a leveraged futures exposure. A no-delivery broker must include this path in its exit controls. | [unknown] Proposed broker implementation; conversion supported by [A25]. |
| Do not generalise to every commodity option | Determine whether each product is an option on futures or a differently settled index/product contract. The Gold mapping is not a universal specification for every instrument carrying an MCX option label. | [unknown] Exhaustive current option-product matrix not verified. |

### A10. MCX-specific member operations and 2025–2026 changes

| Obligation / change | Difference or dated status | Evidence |
|---|---|---|
| Delivery operational stack | Commodity members need delivery intentions, allocation/obligation reconciliation, receipt-account mapping, commodity pay-in/payout and invoice handling where delivery is supported. Equity securities delivery processes do not supply these commodity functions. | [verified] [MCXCCL ComRIS FAQ][A07]; [October calendar][A03] |
| Client margin reporting | MCXCCL requires upfront SPAN/ELM/net-buy-premium collection and reporting of client margins, including peak/EOD obligations and “other” margins such as tender, delivery, concentration and devolvement. Obtain the actual member response-file specification; do not invent a file name from an equity exchange's convention. | [verified] [MCXCCL margin reporting][A43]; [settlement FAQ][A21] |
| Ordinary daily settlement | Daily MTM and premium settle **T+1 banking day**; published MCXCCL timetable gives **08:30 pay-in** and payout before trading. Physical delivery follows its separately specified calendar. Reporting/penalty windows do not postpone settlement funding. | [verified] [MCXCCL clearing/settlement FAQ][A21] |
| Compliance documents | MCX publishes account-opening/RDD/rights-and-obligations material, additional commodity-options disclosures and inspection/compliance resources. Common KYC, audit and AML controls coexist with these commodity-specific additions. | [verified] [MCX inspection and audit resources][A41] |
| Staff certification | **NISM Series XVI: Commodity Derivatives** is the relevant commodity-market certification for the covered associated-person roles; it is not an exam required of every retail client. | [verified] [NISM Series XVI][A40] |
| Warehouse reporting distinction | MCXCCL publishes WSP stock-audit and warehouse/vault inspection reports. Do not misassign every WSP inspection obligation to an ordinary non-delivery trading broker. | [verified] [MCXCCL warehouse inspections][A14] |
| Commodity tax and client reports | MCXCCL computes **Commodities Transaction Tax (CTT)** by client/contract, supplies EOD liability reports and collects it **T+1**; contract notes must show CTT. The page separately identifies exempt agricultural commodities. Equity STT configuration is not a substitute for this commodity tax matrix. | [verified] [MCXCCL CTT procedure][A48]. Tax rates are deliberately not extrapolated beyond that source. |
| Hedge-limit documentation and monitoring | Where serving approved hedgers, retain application/hedge rationale, underlying-stock or commercial-commitment evidence and prescribed periodic/renewal documentation. The exchange policy requires relevant hedge records for **at least three years**, continuous member monitoring, near-month reduction and breach notification. | [verified] [MCX domestic hedge policy][A49]. This is a hedge-record rule, not a universal retention period for every broker record. |
| Platform migration date | MCX's commodity derivatives platform went live **October 16, 2023**. Calling the fundamental platform migration a 2025 or 2026 launch would be incorrect. | [verified] [MCX corporate milestones][A35] |
| Platform components | TCS's primary announcement describes trading based on Deutsche Börse **T7**, with **TCS BaNCS** post-trade and member-facing components. Treat this as the published architecture, not a verified October-2026 software build number. Current MCXCCL FAQs also name BaNCS operational functions. | [verified] [TCS announcement][A36]; [MCXCCL risk FAQ][A17]. [unknown] Exact current production release. |
| 2025 product expansion | MCX's milestone record identifies Electricity futures launch on **July 10, 2025**, Nickel on **August 18, 2025**, and additional Gold/Silver monthly options and smaller/product variants during 2025. Each requires its own master-data and settlement mapping. | [verified] [MCX milestones][A35] |
| 2026 option product-ID split | Notified **September 15**, effective **September 21, 2026**, initially Copper: separate **OFCOPPERC / OFCOPPERP** product IDs/names; reflected in **MCXScrips.bcp**. Separate mass-cancellation requests are required; affected GTC/GTD orders are cancelled on introduction. Existing API structures/report layouts are not changed by this circular. | [verified] [MCXTECH/520/2026][A37]. Exact identifiers/file name are taken from the circular. |
| UCC interface deferral | **MCX/S&I/556/2026**, October 1, postpones the previously scheduled **October 5** implementation of **UCC file formats v1.1 / UCC-API v1.0** until further communication. Do not describe the planned October 5 switch as completed. | [verified] [UCC deferral circular][A38]. [unknown] Subsequent replacement go-live date. |
| New agricultural cash-settled product | **SUNOIL**, notified **October 8**, launched **October 12, 2026**, uses **cash settlement** and **5 MT** lots. This is an explicit exception to assuming every agricultural contract is physically delivered. | [verified] [MCX/TRD/568/2026][A39] |
| Delivery and cost changes already effective | Revised bullion storage tariffs from **May 1 / September 1** and electronic invoice guidance from **September 22** are operational changes captured above. | [verified] [A18], [A19], [A04] |
| Risk changes already effective | October minimum-margin schedule applies from **October 1**; revised concentration thresholds apply from **October 15 BOD**. | [verified] [A30], [A31] |
| Early-pay-in clarification now effective | The June 19 SEBI clarification took effect **September 21, 2026**; CC determines margin relief for qualifying certified-goods pay-in, with MTM continuing. | [verified] [SEBI final circular][A44] |
| Proposals, not operative rules | SEBI's **May 12, 2026** paper on phased physical settlement in selected agricultural contracts and **August 11, 2026** paper on FPI participation are explicitly consultations. No recommendation in them is treated here as an effective contract change. | [verified] Consultation status: [SEBI commodity publications index][A45]. [unknown] Complete subsequent implementation chain for those proposals. |
| Notified, not yet effective | Agricultural numerical limits apply **October 26**; winter hours **November 2**; the October 9 VSR review applies to **November 2026**. | [verified] [A34], [A29], [MCXCCL RISK/218/2026][A32] |
| Near-zero/negative-price framework | October 6 circular specifies **November 2026** framework parameters. Publication of thresholds is not proof that the alternative regime has been activated for a particular contract; follow the formal activation mechanism. | [verified] [MCXCCL RISK/217/2026][A33] |

## PART B — CURRENCY AND INTEREST RATE DERIVATIVES

### B1. INR currency derivatives: exposure eligibility and 2024–2026 status

| Question | Current answer / notification versus effect | Evidence |
|---|---|---|
| Controlling current text | RBI's **Master Direction — Risk Management and Inter-Bank Dealings**, displayed as updated **October 1, 2026**, retains the exchange-traded currency framework in section 3. | [verified] [Current RBI Master Direction][B01] |
| Permitted purpose: INR pairs | Exchange-traded currency derivatives involving INR are for hedging **contracted exposure**. The rule is not a blanket statutory ban on retail clients, but an unhedged speculative INR position does not satisfy it. | [verified] [RBI Master Direction §3.3][B01] |
| Position permitted without underlying exposure | **No unhedged allowance** under the INR hedging rule: effectively **zero** for pure speculation without a qualifying underlying. The commonly quoted USD 100 million is an evidence threshold, not permission to have no exposure. | [verified] Direct reading of [§3.3–3.4][B01]; [RBI clarification][B03]. |
| USD 100 million threshold | Up to **USD 100 million equivalent**, aggregated across **all INR pairs and all recognised exchanges**, a user need not routinely establish the underlying with documents upfront. The user must nevertheless have a valid underlying, not already hedged elsewhere, and be able to produce evidence when required. | [verified] [RBI clarification, April 4, 2024][B03]; [current §3.4][B01] |
| Above the threshold | Designate an authorised dealer/custodian for monitoring; positions must remain backed by eligible contracted exposure, within its amount/tenor and without duplicate hedging. | [verified] [RBI §3.4][B01] |
| Original notification | **January 5, 2024**, RBI/2023-24/108, **A.P. (DIR Series) Circular No. 13**; originally specified **April 5, 2024** effectiveness. | [verified] [RBI notification][B02] |
| Actual effective date | RBI announced deferral on **April 4, 2024** to **May 3, 2024**. RBI also stated that the underlying-exposure requirement was an existing policy being clarified, rather than a newly created permission to speculate below the threshold. | [verified] [RBI press release 2024-25/32][B03] |
| Exchange implementation documents | NSE's April implementation download is **CD61402.zip**, not an assumed PDF. BSE notice **20240401-9** was located but its full content was inaccessible in this run. No unverified annexure wording or mandatory form code is reproduced. | [unknown] Full attachment contents; located official endpoints [NSE ZIP][B04], [BSE notice][B05]. |
| Cross-currency scope | RBI's exchange framework places **no purpose restriction** on derivatives not involving INR. That does not override exchange position limits, participant eligibility, margin rules or the broker's product availability. | [verified] [RBI §3.3][B01] |

### B2. What the client must provide; effect on participation

| Documentation / observation | Operational interpretation | Evidence |
|---|---|---|
| Financial information is not FX exposure | Derivatives onboarding financial evidence establishes the client's financial details; it does not by itself prove an import/export, borrowing or other contracted foreign-exchange exposure. Keep the two review purposes distinct. | [verified] Financial-evidence requirement: [SEBI stock-broker master circular, §23.3][A42]; hedging purpose: [RBI][B01]. |
| Exposure declaration in broker practice | Zerodha required clients wishing to continue INR currency trading to submit a signed/e-signed declaration of eligible exposure. Its restriction from **April 4, 2024** was a broker implementation cut-off; it must not be confused with RBI's deferred **May 3** effective date. | [verified] First-party policy: [Zerodha currency-eligibility bulletin][B06]; regulator date: [B03]. |
| Is a universal upfront invoice compulsory below USD 100m? | **No such universal upfront submission is established by the RBI threshold rule.** Evidence must exist and be produced if required; a broker may ask for more to implement its own controls. A declaration alone cannot create an absent underlying. | [verified] [RBI clarification][B03]; [current Master Direction][B01]. |
| Suggested exposure evidence pack | **Recommended broker control:** request the executed commercial/loan/investment documents relevant to the claimed exposure, amount/currency, due date/tenor, existing OTC/exchange hedges, declaration against duplicate hedging, and change/cancellation notification. Examples are not an RBI-prescribed exhaustive document list. | [unknown] Broker-specific document matrix; exposure requirements supported by [B01]. |
| Above-threshold records | Capture designated AD/custodian details and its monitoring arrangement, together with exposure/hedge reconciliation; do not multiply the USD 100m threshold by exchange, broker or currency pair. | [verified] [RBI monitoring framework][B01] |
| Measured retail participation effect | NSE's May 2024 Market Pulse reports active individual currency-derivative investors falling from approximately **81,000 in March 2024 to 35,000 in April 2024**, in the context of the exposure-guideline implementation. This is an **NSE observation for those months**, not a 2026 all-exchange count. | [verified] [NSE Market Pulse, May 2024, active-investor discussion][B07] |
| Continued market contraction | Subsequent NSE Market Pulse editions discuss the decline in currency activity after the regulatory implementation. Exact October-2026 retail participation, market share and turnover were not verified. | [verified] Historical direction: [June 2024][B08], [March 2025][B09]. [unknown] Current 2026 magnitudes. |
| Broker activation decision | **Recommended broker control:** do not activate speculative INR currency trading through a generic F&O checkbox. Record eligibility review, declaration/evidence policy, aggregate exposure controls, expiry funding and a process to restrict/reduce positions when the underlying changes. | [unknown] Proposed broker procedure; legal purpose restriction supported by [B01]. |

### B3. Currency contracts, hours and settlement

| Product / parameter | NSE published specification; scope expressly limited where necessary | Evidence |
|---|---|---|
| INR futures and European options | **USDINR, EURINR, GBPINR, JPYINR**. Lots: **USD 1,000; EUR 1,000; GBP 1,000; JPY 100,000**. JPY quotation is INR per **100 JPY**; tick **₹0.0025**. | [verified] [NSE INR contract specifications][B10] |
| INR expiry cycle | Futures: **11 serial weekly and 12 monthly** cycles; options: **11 weekly, three serial monthly and three quarterly**, subject to the specified overlapping-expiry exclusions. Weekly expiry is Friday; monthly last trading is two working days before the last business day, at **12:30**. | [verified] [NSE INR specifications][B10]. Use dated contract masters for holidays. |
| Cross-currency futures and European options | **EURUSD, GBPUSD, USDJPY**. Lots **EUR 1,000; GBP 1,000; USD 1,000**, respectively; ticks **0.0001, 0.0001, 0.01** in the quoted currency. Settlement is in INR. | [verified] [NSE cross-currency specifications][B11] |
| Cross-currency expiry cycle | Published futures cycle: **12 monthly**; options: **three monthly plus three quarterly**. Last trading **12:30**, two working days before the last working day of the month, with holiday adjustment. | [verified] [NSE cross-currency specifications][B11] |
| Current normal trading hours | NSE publishes **09:00–17:00** for INR currency, cross-currency and interest-rate derivatives. Cross-currency specification retains a 19:30 headline but expressly footnotes revision to 17:00; use the current market timetable. | [verified] [NSE market timings/holiday page][B12]; [cross-currency revision footnote][B11]. |
| Futures daily MTM | Futures are marked to the CC's daily settlement price; daily profits/losses settle **T+1** through clearing-bank accounts. | [verified] [NCL currency settlement mechanism][B13] |
| Final currency settlement | Futures final P&L is cash settled **T+2**, T being the last trading day. NSE INR options specify premium settlement **T+1** and final settlement **T+2**; no foreign-currency principal is physically delivered under these contracts. | [verified] [NCL settlement mechanism][B13]; [INR specifications][B10] |
| Published NCL bank cut-off | NCL's settlement-schedule page specifies clear funds in the primary clearing account by **08:30 on settlement day**, payout thereafter. The dated settlement calendar and any later instructions remain the execution source. | [verified] [NCL currency settlement schedule][B14] |
| “RBI reference rate”: actual current source | The current RBI Master Direction explicitly names **FBIL Reference Rates on the last trading day** for INR exchange-traded derivative settlement. Calling RBI the current rate administrator is inaccurate. | [verified] [RBI §3.4(a)(iii)][B01] |
| Administrator transition | RBI transferred reference-rate computation/dissemination to **Financial Benchmarks India Private Limited (FBIL)** effective **July 10, 2018**; RBI stopped its reference-rate press release after July 9. | [verified] [RBI July 2018 announcement][B15] |
| Stale official wording | Older NSE/NCL settlement pages still say “RBI reference rate,” while the INR contract page elsewhere identifies FBIL. Preserve the benchmark lineage, but configure the current authorised benchmark and CC settlement file, not a search for a discontinued RBI daily release. | [uncertain] Inconsistent page wording: [NSE specification][B10], [NCL mechanism][B13]; controlling current wording [B01]. |
| Cross-currency benchmark implementation | Settlement is INR cash, but pair construction and INR conversion need the applicable CC formula and fixing source. This research does not assert that an INR reference-rate value can be copied directly into a EURUSD/GBPUSD/USDJPY final-price field. | [verified] INR settlement: [B11]. [unknown] Complete current conversion/rounding implementation verified end to end. |
| BSE product evidence | The indexed **2025 BSE Currency Derivatives Segment Master Circular** includes INR/cross-currency contracts and cash-settled government-bond IRF specifications. Its full attachment could not be fetched; it is insufficient to certify every live BSE October-2026 contract or ICCL parameter. | [uncertain] Partial indexed primary text: [BSE 2025 master][B19]. |

### B4. Currency margins and position limits: three distinct controls

| Control | Published rule / operational significance | Evidence |
|---|---|---|
| Eligibility / evidence | RBI's contracted-exposure requirement and USD 100m documentary threshold govern **purpose and evidence**. They do not replace exchange OI limits or margin requirements. | [verified] [RBI][B01]; [NSE position limits][B17]; [NCL margins][B16] |
| Initial margin | NCL uses upfront portfolio **SPAN**, based on **99% one-day VaR**, with a two-day horizon where next-day MTM cannot be collected before trading. Client positions are netted within a client and grossed across clients; no inter-client or client–proprietary set-off. | [verified] [NCL currency margins][B16] |
| ELM | NCL's published schedule, updated **August 12, 2025**, gives the rates below, additional to initial margin. Short-option ELM uses notional exposure. | [verified] [NCL currency margins][B16] |
| Premium / crystallised obligation | Net payable premium and crystallised futures losses contribute to intraday obligation margin; EOD obligations include MTM, premium, exercise/assignment and futures final settlement. Margin is released on completion of settlement. | [verified] [NCL currency margins][B16] |
| Conflicting old ELM table | NSE's general INR contract page displays older higher ELMs, including **1% USDINR futures / 1.5% short options**. NCL's dedicated later margin page gives **0.50% / 0.75%**. Use CC risk files and dated changes, not the stale contract-page margin cells. | [uncertain] Conflict: [B10] versus [B16]. [verified] The published NCL rates below. |
| Trading-member breach change in 2026 | **NCL/CD/73007**, notified **February 26**, effective **March 2, 2026**: additional margin on the excess position at **0.75%, 1%, 1.25%, 1.5%** for the specified breach slabs. Blocked from CM proprietary collateral on **T+1 before market**, retained until compliant. Monetary penalties are additional. | [verified] [NCL position-limit circular][B18] |

| Currency pair | Futures ELM | Short-option ELM | Evidence |
|---|---|---|---|
| USDINR | **0.50%** | **0.75%** | [verified] [NCL published schedule][B16] |
| EURINR | **0.15%** | **0.75%** | [verified] [NCL published schedule][B16] |
| GBPINR | **0.25%** | **0.75%** | [verified] [NCL published schedule][B16] |
| JPYINR | **0.35%** | **0.75%** | [verified] [NCL published schedule][B16] |
| EURUSD / GBPUSD / USDJPY | **0.50%** | **0.50%** | [verified] [NCL published schedule][B16] |

| NSE position-limit example | Published limit | Evidence |
|---|---|---|
| Ordinary client, USDINR | Higher of **6% of total OI or USD 20m**. | [verified] [NSE position limits][B17] |
| Ordinary client, EURINR / GBPINR / JPYINR | Higher of **6% OI or EUR 10m / GBP 10m / JPY 400m**, respectively. | [verified] [NSE position limits][B17] |
| Ordinary client, EURUSD / GBPUSD / USDJPY | Higher of **6% OI or EUR 10m / GBP 10m / USD 10m**, respectively. | [verified] [NSE position limits][B17] |
| Non-bank proprietary, USDINR | Higher of **15% OI or USD 50m**. Distinct from total TM exposure. | [verified] [NSE position limits][B17] |
| Bank/non-bank TM, USDINR | Higher of **15% OI or USD 100m**; separately authorised bank TMs have the published higher alternative. Do not confuse this USD 100m member-limit floor with RBI's all-exchange evidence threshold. | [verified] [NSE position limits][B17] |
| Futures/options aggregation | NSE's directional grouping includes long futures/calls/short puts on one side and short futures/calls/long puts on the other. The applicable gross-position methodology must be used, not simply cash premium or signed net lots across every instrument. | [verified] [NSE position-limit methodology][B17] |
| Production applicability | **Recommended broker control:** load the current client, proprietary, TM and participant-category matrices; reconcile all-exchange exposure declarations separately. Public static tables are the researched baseline, not a captured October-15 live limit file. | [unknown] Full current production file and this broker's controls. |

### B5. Interest-rate derivatives: regulation, products and participants

| Topic | Current position | Evidence |
|---|---|---|
| Final 2025 RBI Directions | **Notified December 8, 2025; effective March 1, 2026**, displayed as updated **September 22, 2026**. The June 16, 2025 consultation is historical; it must not be described as the only applicable instrument. | [verified] [RBI Rupee Interest Rate Derivatives Directions, 2025][B20] |
| Exchange product permission | Recognised exchanges may offer standardised IRDs with prior RBI approval of a new product or modification; floating benchmarks must be administered by an authorised financial benchmark administrator. Permission is not proof that every possible swap/future is listed. | [verified] [RBI §4][B20] |
| Eligible participants | Residents are eligible subject to product/exchange and institutional restrictions. Non-residents may use exchange IRDs for hedging; FPIs have specified additional conditions. | [verified] [RBI §§3–4][B20] |
| FPI controls | Aggregate long positions of FPIs with net-long IRF positions are capped at **₹5,000 crore** across IRF instruments; an FPI's gross shorts cannot exceed its consolidated long government-security and IRF positions. | [verified] [RBI §4.4][B20] |
| Who actually trades | Institutional bond/treasury hedgers are a natural use case; the sources establish eligible participation, not a verified October-2026 ranking of banks, primary dealers, mutual funds, insurers, corporates or individuals by volume. | [unknown] Current empirical participant mix. Eligibility source: [B20]. |
| Published NSE product families | NSE lists **government-security futures/options, 91-day Treasury-bill futures and overnight MIBOR futures** in its IRD product material. A product page is not evidence of current liquidity in every family. | [verified] [NSE IRD overview][B21] |
| Concrete 2026 GOI listings | **NSE/CD/74251**, notified **May 15**, made futures and options on **636GS2031 (6.36%, maturity February 16, 2031)** and **694GS2036 (6.94%, maturity May 11, 2036)** available from **May 19, 2026**. | [verified] [NSE launch circular][B22] |
| Actual contract master | That launch circular expressly names **cd_contract.gz**, **cd_spd_contract.gz**, and the Extranet path **/cdsftp/cdscommon**. These are verified identifiers in that circular; subsequent file-format migrations must still be checked. | [verified] [NSE/CD/74251][B22] |
| BSE boundary | Indexed BSE 2025 master text describes **FUTIRD**, GOI-bond underlyings, ₹2 lakh face-value lots and cash settlement. Current BSE IRD instrument availability and liquidity were not independently established. | [uncertain] Partial primary text [B19]; [unknown] October-2026 live inventory. |
| OTC is separate | RBI's OTC market-maker, product and reporting rules are separately specified. An exchange broker's IRD activation does not itself confer authorisation to act as an OTC IRD market-maker. | [verified] Separate regimes in [RBI §§4–5][B20]. |

### B6. Interest-rate contracts: operational particulars

| Contract | Units, hours and expiry | Settlement / special risk | Evidence |
|---|---|---|---|
| NSE GOI-bond futures/options | **₹200,000 face value / 2,000 units**; price tick **0.0025**; **09:00–17:00**; three serial monthly plus three quarterly expiries; last Thursday, adjusted for holiday. | Published contracts are **cash settled**, daily/final settlement **T+1**. Underlying bond-price exposure differs from a futures contract quoted directly as a yield. | [verified] [NSE GOI specifications][B23]; [2026 launch][B22] |
| GOI final settlement price | Underlying bond's weighted average traded price during the **last two hours on NDS-OM**, subject to **five trades**. | Published futures settlement material falls back to **FIMMDA** when trades are insufficient; the options specification names **FBIL**. This fallback discrepancy needs current CC confirmation rather than assuming one uniform provider. | [verified] Main price procedure: [NSE settlement mechanism][B26]. [uncertain] Fallback consistency: [B23], [B26]. |
| 91-day T-bill futures | **₹200,000 face value**; quote uses **100 minus annualised discount yield**; published expiry is **last Wednesday at 13:00**, subject to the contract's holiday/auction arrangements. | Cash-settlement value uses **2,000 × [100 − 0.25 × yield]**; expiry yield derives from the **RBI 91-day T-bill auction**, not an FX reference rate. | [verified] [NSE T-bill specification][B24]; [settlement mechanism][B26] |
| Overnight MIBOR futures | Published **₹5 crore notional** interest exposure; **₹411 per basis point**, **₹102.75 tick value**; **09:00–17:00**, last-working-day expiry at **10:00**. | Daily/final cash settlement **T+1**; final rate averages the applicable **FBIL overnight MIBOR** observations under the specified accrual/calendar convention. | [verified] [NSE MIBOR specification][B25]; [settlement mechanism][B26] |
| Interest versus currency cash flows | — | NSE's IRD settlement description nets applicable settlement with the currency-derivatives segment. This operational netting does not erase product-level accounting or exposure eligibility. | [verified] [NSE IRD settlement mechanism][B26] |
| Basis / liquidity controls | — | **Recommended broker control:** model bond identity, coupon/maturity, price versus yield quotation, tick value, benchmark fallback, and illiquidity separately. Do not route an IRD as an INR currency pair or apply MCX option-devolvement logic. | [unknown] Proposed implementation; contract distinctions supported by [B23]–[B26]. |

| NCL IRD margin parameter | Published value | Interpretation / evidence |
|---|---|---|
| Minimum price scan range: G-sec / 91-day T-bill / MIBOR | **1.75% / 0.065% / 5.50%**, respectively | [verified] [NCL IRD margins][B27]. These are scan-range inputs, not interchangeable all-in margins on face value. |
| G-sec futures ELM | **0.25% of gross MTM position value** | [verified] [NCL IRD margins][B27]. |
| G-sec short-option ELM | **0.25% of notional**, using **₹200,000** contract notional | [verified] [NCL IRD margins][B27]. |
| 91-day T-bill ELM | **0.015% of ₹200,000 notional** for gross positions | [verified] [NCL IRD margins][B27]. Older NSE product-page values differ; use the CC methodology. |
| MIBOR ELM | Page states **0.05% of contract value** | [verified] Published baseline in [B27]; [unknown] No dated October-15 risk file captured to exclude a later override. |
| Initial / other margin | Portfolio SPAN and applicable spread/ELM/obligation charges are additional components; interest-rate products require their own risk parameters and limits. | [verified] [NCL IRD margin methodology][B27] |

### B7. Broker activation and control checklist

| Control | Required basis versus proposed implementation | Evidence |
|---|---|---|
| Segment authorisation | RBI expressly requires separate currency-derivatives exchange membership/clearing arrangements under its framework. Cash-market membership alone must not be treated as operational currency permission. | [verified] [RBI §3.4][B01] |
| Client financial evidence | Broker must retain documentary financial details for clients opting for derivatives. The sources do not establish one universal document named “currency eligibility certificate” or a standard mandatory form code. | [verified] [SEBI stock-broker master §23.3][A42]; [unknown] Any such universal form. |
| Rights / exposure / close-out policy | SEBI's broker framework requires policies addressing exposure limits, refusal/restriction of orders and conditions for closing positions. Segment-specific no-delivery and FX-exposure controls should be implemented within that disclosed framework. | [verified] Policy topics: [SEBI §23.4][A42]. [unknown] Final wording for this greenfield broker. |
| Relevant staff exams | **NISM Series I — Currency Derivatives**, **Series IV — Interest Rate Derivatives**, and **Series XVI — Commodity Derivatives** cover the respective associated-person roles. They are not a substitute for client eligibility review. | [verified] [NISM I][B28], [NISM IV][B29], [NISM XVI][A40]. |
| Activation data model | **Recommended broker control:** separate exchange/segment/product permissions; financial-evidence record; FX underlying eligibility; risk disclosures; permitted order channels; client/CM identifiers; and commodity-delivery permission. Keep currency and IRD capability explicit even if they share a clearing segment. | [unknown] Proposed design. Supporting regulatory/product distinctions: [A42], [B01], [B22]. |
| Currency RMS | **Recommended broker control:** aggregate INR-pair exposure, inspect declared hedges elsewhere, enforce client/TM/proprietary limits, collect upfront margin/premium, reserve crystallised obligations and plan the 12:30 monthly expiry workflow. Escalate missing/ceased exposure. | [unknown] Proposed controls; obligations supported by [B01], [B10], [B16], [B17]. |
| IRD RMS | **Recommended broker control:** enable only approved symbols with validated CC files and usable market depth; monitor price/yield sensitivity and participant eligibility, including FPI conditions where relevant. Confirm final-price fallback before opening expiring contracts. | [unknown] Proposed controls; product and participation basis [B20], [B22]–[B27]. |
| Commodity RMS | **Recommended broker control:** per-contract delivery classification and dates, late-session coverage, price-band state, tender/pre-expiry/delivery layers, spread-relief withdrawal, devolvement and receipt/invoice exceptions. | [unknown] Proposed controls; source basis in Part A. |
| BSE/ICCL onboarding gate | **Recommended broker control:** obtain the current BSE trading master and ICCL clearing/risk/calendar files before enabling that route. Do not silently reuse NSE bank deadlines, symbols, margin tables or report names. | [unknown] BSE/ICCL's complete October-2026 implementation pack was not verified. |
| Audit trail | **Recommended broker control:** version every source and parameter by notification date, effective date, product, exchange/CC and supersession; retain submitted declarations, acknowledgements, funding and settlement reconciliations. | [unknown] Proposed broker evidence model. |

## Source register

| Reference group | Use and limitations |
|---|---|
| A01–A06 | Primary SEBI / MCXCCL delivery framework, October delivery timetable, invoicing and default consequences. |
| A07–A25 | Receipt systems, warehousing, tariffs, contract specifications and explicitly scoped first-party broker policies; A19b/A19c are secondary insurance-tariff reports. |
| A26–A49 | Trading hours, margins, position limits, technology, onboarding and dated 2026 changes; energy specifications, CTT and hedge policy. A27/A28 corroborate the summer timetable; A27b is an exchange circular hosted by a broker. |
| B01–B09 | RBI eligibility rules, implementation endpoints and historical NSE participation evidence. B04/B05 are located endpoints whose attachment contents were not verified. |
| B10–B29 | NSE/NCL specifications and risk rules, RBI IRD Directions, BSE partial historical evidence and NISM certification sources. B19 is not a substitute for the current BSE/ICCL operating pack. |
| Search coverage | Research used substantially more than the requested **20 web searches**, including regulator, exchange, clearing, warehouse/repository, broker-policy and current-circular searches. This is a research-process record, not independent evidence for any market rule. |

[A01]: https://www.sebi.gov.in/sebi_data/attachdocs/may-2024/1716550310879.pdf
[A02]: https://www.mcxindia.com/docs/default-source/products/contract-specification/gold/gold-august-2026-contract-onwardsd4df534857fb64e3bdfdff00007acb3574ea8ae7-7504-4567-a819-64dc0c700557.pdf
[A03]: https://www.mcxccl.com/docs/mcxccllibraries/circulars/english/2026/september/circular-206-2026.pdf?sfvrsn=dfede5f0_1
[A04]: https://www.mcxccl.com/docs/mcxccllibraries/circulars/english/2026/september/circula-207-2026.pdf?sfvrsn=7f7ad773_1
[A05]: https://www.sebi.gov.in/sebi_data/attachdocs/mar-2021/1616492485210.pdf
[A06]: https://www.sebi.gov.in/sebi_data/attachdocs/aug-2021/1629196523022.pdf
[A07]: https://www.mcxccl.com/spot/faq
[A08]: https://www.mcxccl.com/delivery/faq
[A09]: https://www.mcxccl.com/delivery/early-pay-in-of-commodities
[A10]: https://www.mcxccl.com/warehousing-logistics/faq
[A11]: https://www.dea.gov.in/files/other_reports_documents/Working_Group_Report_Development_Regulated_Warehousing_Ecosystem_Non_AgriculturalCommodities.pdf
[A12]: https://www.sebi.gov.in/sebi_data/faqfiles/nov-2021/1636459847983.pdf
[A13]: https://www.mcxccl.com/warehousing-logistics
[A14]: https://www.mcxccl.com/warehousing-logistics/warehouse-inspection
[A15]: https://www.ncdex.com/public/uploads/clearing_reports/Warehouse_Wise_Stock_position_as_on_03-JULY-2019.pdf
[A16]: https://www.ccrl.co.in/termsofbusiness.html
[A16b]: https://www.ccrl.co.in/whyus.html
[A17]: https://www.mcxccl.com/risk-management/faq
[A18]: https://www.mcxindia.com/docs/default-source/circulars/english/2026/april/circular--200-2026.pdf?sfvrsn=9e76029e_0
[A19]: https://www.mcxindia.com/docs/default-source/circulars/english/2026/august/circular-448-2026.pdf?sfvrsn=e1a9cdc4_1
[A19b]: https://noticeblue.com/circulars/325b939b-5db7-4e1c-b116-e0ac2d6ab212
[A19c]: https://teamleaseregtech.com/updates/article/53110/mcx-notified-regarding-the-accreditation-of-warehouse-for-storage-of-b/
[A20]: https://www.mcxindia.com/docs/default-source/products/contract-specification/mentha-oil/mentha-oil-june-2026-contract-onwards1b21664857fb64e3bdfdff00007acb35.pdf
[A21]: https://www.mcxccl.com/clearing-settlement/faq
[A22]: https://www.mcxccl.com/docs/mcxccllibraries/circulars/english/2026/september/circular-204-2026.pdf?sfvrsn=78bb96a9_1
[A23]: https://support.zerodha.com/category/trading-and-markets/trading-faqs/commoditytrading/articles/how-long-can-i-hold-mcx-contracts
[A24]: https://aliceblueonline.com/RmsLiveUpdatesPage/RmsPolicySection
[A25]: https://www.mcxindia.com/docs/default-source/options/gold-option-july-2026-contract-onwards8d88befa-a326-4ac6-8de1-4bfec750135e.pdf
[A26]: https://beta.mcxindia.com/market-operations/trading-surveillance
[A26b]: https://beta.mcxindia.com/market-operations/trading-surveillance/trading-holidays
[A27]: https://fyers.in/notice-board/revision-in-trading-timings-for-commodity-derivatives-1
[A27b]: https://bigul.co/pdf/circular---068---2026.pdf
[A28]: https://www.venturasecurities.com/news/commodities/mcx-adjusts-trading-hours-new-global-alignment-starts-today/
[A29]: https://www.mcxindia.com/docs/default-source/circulars/english/2026/september/circular-550--2026.pdf?sfvrsn=a1e7e1c5_1
[A30]: https://www.mcxccl.com/docs/mcxccllibraries/circulars/english/2026/september/circular-193-2026.pdf?sfvrsn=ad0fcd71_1
[A31]: https://www.mcxccl.com/docs/mcxccllibraries/circulars/english/2026/october/circular-221---2026.pdf?sfvrsn=21cd223d_1
[A32]: https://www.mcxccl.com/docs/mcxccllibraries/circulars/english/2026/october/circular-218-2026.pdf?sfvrsn=64a13e03_1
[A33]: https://www.mcxccl.com/docs/mcxccllibraries/circulars/english/2026/october/circular-217-2026.pdf?sfvrsn=2b6dd53c_1
[A34]: https://www.mcxindia.com/docs/default-source/circulars/english/2026/october/circular---579---2026.pdf?sfvrsn=dcbeea2_1
[A35]: https://beta.mcxindia.com/about-us
[A36]: https://www.tcs.com/who-we-are/newsroom/press-release/tcs-partners-with-mcx-to-transform-exchanges-core-systems-support-future-growth
[A37]: https://www.mcxindia.com/docs/default-source/circulars/english/2026/september/mcxtech5202026---introduction-of-separate-product-ids-product-name-for-call-and-put-options--live.pdf?sfvrsn=2daf86b4_1
[A38]: https://www.mcxindia.com/docs/default-source/circulars/english/2026/october/circular---556---2026.pdf?sfvrsn=78c70031_1
[A39]: https://www.mcxindia.com/docs/default-source/circulars/english/2026/october/circular-568-2026.pdf?sfvrsn=42f60264_1
[A40]: https://www.nism.ac.in/nism-series-xvi-commodity-derivatives-certification-examination
[A41]: https://www.mcxindia.com/inspection-and-audit
[A42]: https://www.sebi.gov.in/sebi_data/attachdocs/jun-2025/1750158789381.pdf
[A43]: https://www.mcxccl.com/clearing-settlement/client-margin-reporting
[A44]: https://www.sebi.gov.in/sebi_data/attachdocs/jun-2026/1781863954185.pdf
[A45]: https://www.sebi.gov.in/sebiweb/home/HomeAction.do?cid=29&doListingAll=yes
[A46]: https://www.mcxindia.com/docs/default-source/products/contract-specification/crude-oil/crude-oil-january-2026-contract-onwards267be8c1-650a-4baa-aabd-ffcc9364c100.pdf
[A47]: https://www.mcxindia.com/docs/default-source/products/contract-specification/natural-gas/natural-gas-january-2026-contract-onwards2ff2141b-f6e4-4b6a-9f0e-59f260cecf9b.pdf
[A48]: https://www.mcxccl.com/clearing-settlement/commodities-transaction-tax
[A49]: https://www.mcxindia.com/docs/default-source/market-operations/trading-surveillance/reports/hedge-policy-for-domestic-participants9d5e3aba-2bc6-41ac-9a24-b32d71ca9f0d.pdf?sfvrsn=def6f086_1
[B01]: https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx?id=10485
[B02]: https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=12594&Mode=0
[B03]: https://www.rbi.org.in/Scripts/BS_PressReleaseDisplay.aspx?prid=57628
[B04]: https://nsearchives.nseindia.com/content/circulars/CD61402.zip
[B05]: https://www.bseindia.com/markets/MarketInfo/DispNewNoticesCirculars.aspx?page=20240401-9
[B06]: https://zerodha.com/marketintel/bulletin/375304/change-in-eligibility-to-trade-in-currency-derivatives
[B07]: https://nsearchives.nseindia.com/web/sites/default/files/inline-files/Market%20Pulse_May%202024_Final_2.pdf
[B08]: https://nsearchives.nseindia.com/web/sites/default/files/inline-files/MarketPulse_June2024.pdf
[B09]: https://nsearchives.nseindia.com/web/sites/default/files/inline-files/Market%20Pulse_March%202025.pdf
[B10]: https://www.nseindia.com/static/products-services/currency-derivatives-contract-specification-inr
[B11]: https://www.nseindia.com/static/products-services/currency-derivatives-contact-specification-cross-currency
[B12]: https://www.nseindia.com/resources/exchange-communication-holidays?apiversion=v2
[B13]: https://www.nseclearing.in/clearing-settlement/currency-derivatives/settlement-mechanism
[B14]: https://www.nseclearing.in/clearing-settlement/currency-derivatives/settlement-schedule
[B15]: https://www.rbi.org.in/commonman/Upload/English/PressRelease/PDFs/PR3504072018.PDF
[B16]: https://www.nseclearing.in/risk-management/currency-derivatives/margins
[B17]: https://www.nseindia.com/static/products-services/currency-derivatives-position-limits
[B18]: https://nsearchives.nseindia.com/content/circulars/CD73007.pdf
[B19]: https://www.bseindia.com/markets/MarketInfo/DownloadAttach.aspx?attachedId=b29d206d-8df6-49d5-a7fd-5dd3303477e8&id=20250429-53
[B20]: https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=13214&Mode=0
[B21]: https://www.nseindia.com/static/products-services/about-interest-rate-derivatives
[B22]: https://nsearchives.nseindia.com/content/circulars/CD74251.pdf
[B23]: https://betanseapi.nseindia.com/static/products-services/interest-rate-derivatives-contract-specifications-g-sec
[B24]: https://www.nseindia.com/static/products-services/interest-rate-derivatives-contract-specifications-91-day-t-bills
[B25]: https://www.nseindia.com/static/products-services/interest-rate-derivatives-contract-specifications-mibor
[B26]: https://www.nseindia.com/static/products-services/interest-rate-derivatives-settlement-mechanism
[B27]: https://www.nseclearing.in/risk-management/nse-bond-futures/margins
[B28]: https://www.nism.ac.in/circular/nism-certification-series-i-cd-2009-1-dated-may-11-2009/
[B29]: https://www.nism.ac.in/circular/nism-certification-series-iv-interest-rate-derivatives-2022-01-dated-march-24-2022/

## Gaps and cautions

| Unresolved item | Evidence class / what was not verified | Required resolution or manual restriction |
|---|---|---|
| Complete as-of-day rule set | [unknown] No authenticated member-portal snapshot of every October 15 risk, contract, delivery and reporting parameter. Public research cannot establish absence of an intraday override. | Use this as sourced research; populate production from dated exchange/CC files and retain change history. |
| MCX delivery-intention UI | [uncertain] Current FAQ says BaNCS; Gold specification says eClear. | Confirm the active interface and field/cut-off workflow with MCXCCL/CM. Do not relabel ComRIS as COMTRACK. |
| Agricultural numerical limits on October 15 | [unknown] Full operative July/September revision chain not fetched. **October 26** numbers are verified but future-effective. | Obtain the applicable current limit matrix before opening those contracts; do not fall back to older Mentha values. |
| September 2026 position-limit framework | [uncertain] September 9 framework is referenced by the October circular and secondary transcripts, but the direct SEBI/MCX body could not be re-fetched. | Verify broad/narrow/sensitive classifications, transitional percentages and revised breach penalties from the operative primary document; no guessed rates have been inserted as current rules. |
| Gold-specific versus universal delivery terms | [unknown] No complete all-commodity delivery-unit/centre/purity/assignment/deadline matrix. | Gold is a worked example. Use each current contract and monthly calendar; no universal 25% delivery margin, three-calendar-day window or single intention hour. |
| October margins | [unknown] Complete actual SPAN, MPOR, ELM, additional/special and options risk-file values at the research timestamp. | Published minimums are inputs, not an all-in client quote; preserve later override precedence. |
| Devolvement staging | [uncertain] FAQ's one-quarter/one-half narrative is not sufficient to certify every exact collection day, contrary-instruction cut-off or product-specific exception. | Obtain dated option-expiry/devolvement schedule and member instructions. |
| WDRA status of each location | [unknown] Individual warehouse registrations, licence validity, commodity coverage and every bullion-vault legal status were not checked. | Check both WDRA/repository status where applicable and MCXCCL accreditation; do not call every ComRIS balance a statutory eNWR. |
| Insurance and non-bullion tariffs | [unknown] Universal insurance rate, all WSP tariffs, deductibles, valuation basis, transit coverage, assaying/re-assaying/loading charges and current base-metal/agri storage schedule. | Use location/commodity tariff and insurance terms. The Thane insurance-inclusive example is only [likely]. |
| Silver100 storage | [uncertain] A secondary tariff claim was found, but its operative primary tariff was not verified. | No Silver100 storage amount is asserted in the tariff table. |
| Goods accounting and tax | [unknown] Entity-specific principal/agent accounting, chart of accounts, GST rates/registration treatment and final client agreement. | Quantity/cash subledgers are recommendations; verify legal ownership, invoice and tax treatment before implementation. |
| No-delivery broker cut-off | [unknown] This greenfield broker has no verified adopted exit time, buffer or liquidation policy. | Published broker examples are not exchange mandates; approve and disclose this broker's own controls. |
| Platform / UCC completion | [unknown] Exact production build and replacement UCC v1.1/API v1.0 activation date after the October 1 deferral. | Do not infer go-live from the cancelled October 5 target; verify current vendor/member release documentation. |
| New products and proposals | [unknown] Exhaustive 2025–2026 launch inventory and final outcome of each 2026 commodity consultation. | A launch, future-effective circular and consultation have different status; product master and final circular control. |
| Currency exposure document template | [unknown] One mandatory universal declaration form/code or exhaustive supporting-document list; full NSE April ZIP and BSE implementation attachment unread. | Do not invent a form. Separate the RBI rule, exchange implementation and broker evidence policy. |
| Current retail impact | [unknown] October-2026 participant count/turnover and all-exchange causal estimate. | Use NSE's verified 2024 historical figures with their dates; no claim that retail participation is literally zero. |
| BSE / ICCL specifics | [unknown] Complete 2026 master circular attachments, live contracts, margins, bank cut-offs and report schemas. Older indexed BSE text is partial. | Obtain BSE/ICCL's current operating pack; do not copy NSE values across venues. |
| Currency benchmark conversion | [unknown] Complete cross-currency final-price construction, INR conversion, holiday fallback and rounding specification checked against current CC files. | FBIL is verified for INR expiry settlement; test cross-pair implementation separately. |
| Static official-page conflicts | [uncertain] Old NSE ELM values, “RBI reference rate” wording, and cross-currency 19:30 headlines remain on some pages. | Prefer current RBI text, NCL's dedicated margin schedule and explicit 17:00 timetable/revision; obtain dated member files. |
| IRD liquidity and participant mix | [unknown] October-2026 traded volumes, depth and active participants for each GOI/T-bill/MIBOR product; complete live BSE IRD universe. | Published specifications and the verified May-2026 listing do not establish liquidity. |
| IRD settlement fallback | [uncertain] Futures material names FIMMDA, while the options specification names FBIL for insufficient underlying trades. | Confirm the current CC fallback per instrument before coding final settlement. |
| IRD risk files | [unknown] Complete live position-limit and margin overrides, including later changes to published MIBOR ELM. | Use CC files and participant-specific rules; do not confuse scan ranges with notional-margin rates. |
| Reporting and membership checklist | [unknown] Exhaustive MCX-only filing calendar, all current client-category/hedger reporting fields, membership capital/deposit amounts and integration entitlements. | The report identifies operational differences; obtain current member compliance and technical packs before launch. |

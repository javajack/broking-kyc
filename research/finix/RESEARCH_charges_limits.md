# Charges, ledger balances and trading limits — Indian stockbroker

| Research control | Scope / convention |
|---|---|
| As-of date | **15 October 2026**; NSE, BSE and MCX; cash equities, equity derivatives, currency derivatives and commodity derivatives. User-specified scope. |
| Evidence classes | **[verified]** = inspected primary regulatory, exchange, clearing, depository or provider source; a provider source verifies only that provider's policy. **[likely]** = at least two named, independent secondary sources support the assertion. **[uncertain]** = one secondary source, unresolved conflict or incomplete corroboration. **[unknown]** = not established; never interpret as zero, exempt or prohibited. |
| Reading the tables | The evidence/source cell covers the facts in that row unless a cell has a different tag. Reference links resolve to source URLs at the end of Part B. Calculated percentage equivalents are arithmetic conversions of cited rupee rates. Rates exclude GST unless expressly stated. |
| Scope of “current” | **[verified]** means the cited instrument/tariff was inspected, not that an exhaustive legal supersession search can guarantee that no later instrument exists. Effective dates and material unresolved currentness questions appear explicitly. Broker examples are not the proposed broker's tariff. |
| Accounting versus regulation | **[unknown] (design)** identifies a recommended posting/reservation model where no universal regulator-prescribed software posting instant was verified. It is deliberately distinct from sourced settlement deadlines and margin eligibility. |
| Units | ₹1 lakh = ₹100,000; ₹1 crore = ₹10,000,000. “Both sides” means each buyer and seller pays on their own turnover; it does not mean charging one client twice for one side. Arithmetic definitions. |

## PART A — EVERY CHARGE

### A1. Brokerage structures, ceilings and disclosure

| Structure / rule | Rate / base / payer | Rounding / implementation | Evidence and status |
|---|---|---|---|
| Percentage brokerage | Negotiated percentage of executed consideration; futures normally contract turnover, options premium; charged to the trading client on the agreed sides. No universal commercial rate. | **[unknown]** universal per-fill versus per-order rounding; define aggregation and minimum-charge treatment in tariff. | **[verified]** negotiated tariff and ceilings: [NSE brokerage limits]. |
| Fixed executed-order / capped percentage | Provider example: Zerodha resident retail delivery ₹0; equity intraday/futures lower of ₹20 or 0.03% per executed order; options ₹20 per executed order. | Provider tariff, not an exchange levy; observe regulatory ceiling even where a minimum/fixed order fee is advertised. | **[verified]** provider example: [Zerodha charges]; **[verified]** ceiling: [NSE brokerage limits]. |
| Per-lot / subscription / negotiated full-service plans | **[unknown]** proposed broker's prices, minimums, subscription inclusions and effective dates. Do not substitute another broker's plan. | **[unknown]** treatment of a subscription against transaction-level ceilings needs the actual plan and compliance review. | **[verified]** client must receive charge tariff: [Broker master], §21.2.1. |
| Maximum cash-equity brokerage | 2.5% of contract value, excluding statutory levies; where share value is ₹10 or less, maximum 25 paise/share exception. | Ceiling is not a recommended price. | **[verified]** NSE's reproduction of SEBI/exchange requirements: [NSE brokerage limits], Annexure IV. |
| Maximum futures brokerage, including currency | 2.5% of contract value, excluding statutory levies. | Do not use margin deposited as the brokerage base. | **[verified]** [NSE brokerage limits]. |
| Maximum options brokerage | Higher of 2.5% of premium or ₹100 per lot; brokerage base is premium, not strike/notional. | This is a maximum-permitted formula, not a minimum charge. | **[verified]** [NSE brokerage limits]. |
| Commodity futures brokerage ceiling | MCX FAQ: 1% of contract value for non-delivery transactions; 2% plus expenses for delivery transactions. | Do not apply the equity 2.5% headline indiscriminately to commodities. | **[verified]** [MCX compliance FAQ]. **[unknown]** separate current BSE commodity rule and delivery-expense boundaries. |
| MCX commodity option brokerage ceiling | Higher of 2.5% of premium and **₹250 per lot** | Different from the equity/currency option ₹100-per-lot ceiling formula | **[verified]** [MCX compliance FAQ], citing MCX/INSP/286/2024 dated 30 April 2024. |
| BSE-specific ceiling implementation | **[unknown]** separately authenticated current BSE rule text and any product exceptions. | NSE evidence establishes the cited NSE rule; it is not a substitute for a BSE rulebook citation. | **[unknown]** procurement gap. |
| Agreed rates and actual levies | Do not charge above agreed tariff; statutory/regulatory recoveries must be actuals. | Preserve client tariff version and change intimation. | **[verified]** [NSE actuals enforcement], §6.16; [Broker master], account-opening undertaking. |
| Before-order disclosure | Brokerage and other charges for each order must be prominently displayed on IBT/wireless order-entry screens before placement. | Final extended implementation deadline: 31 January 2023. | **[verified]** [Order disclosure extension], dated 28 December 2022; [NSE actuals enforcement]. |

### A2. Securities Transaction Tax — current rates and distinct option bases

| Taxable event | Current rate | Tax base | Side liable | Rounding | Evidence / effective status |
|---|---:|---|---|---|---|
| Delivery equity share / business-trust unit purchase | 0.1% | Delivery transaction value | Buyer | STT-R below | **[verified]** [STT 2026 circular]; unchanged by April revision. |
| Delivery equity share / business-trust unit sale | 0.1% | Delivery transaction value | Seller | STT-R | **[verified]** [STT 2026 circular]. |
| Delivery equity-oriented fund unit | Purchase nil; sale 0.001% | Sale transaction value | Seller only | STT-R | **[verified]** [NSE statutory levies]. Do not apply ordinary share-delivery STT automatically to every ETF. |
| Non-delivery equity share / equity-oriented fund / business-trust unit | 0.025% | Sale transaction value | Seller | STT-R | **[verified]** [STT 2026 circular]. |
| Equity futures sale | **0.05%** | Futures traded price × quantity; not margin or profit | Seller | STT-R | **[verified]** [STT 2026 circular]; effective **1 April 2026**, previously 0.02%. |
| Equity option sale / writing / sale to close | **0.15%** | **Option premium** × quantity | Seller | STT-R | **[verified]** [STT 2026 circular]; effective **1 April 2026**, previously 0.10%. |
| Equity option exercised | **0.15%** | **Intrinsic value**, not premium or gross underlying notional | Purchaser / exercising long | STT-R | **[verified]** [STT 2026 circular], [NSE derivatives STT]; effective **1 April 2026**, previously 0.125%. |
| Assigned short option | Assignment does not turn the writer into the “purchaser” for exercise-STT. Writer's premium sale is taxed as above; delivery obligations may add delivery STT. | Premium sale and physical delivery are separate taxable events. | Follow each event's liable side | STT-R | **[verified]** distinction follows the purchaser/seller columns in [NSE derivatives STT] and physical-settlement treatment in [NCL STT]. |
| Physically settled stock derivatives | Delivery STT 0.1% on both receiver and giver of underlying securities; derivative-trade/exercise taxes must also be considered separately. | Delivery settlement value | Receiver and deliverer, respectively | STT-R | **[verified]** [NCL STT]. Do not apply only index cash-settlement logic. |
| Currency derivatives | STT nil | Not applicable | Neither | Not applicable | **[verified]** published currency tariff: [Zerodha charges]. **[unknown]** direct consolidated 2026 statutory exclusion citation not captured. |
| Commodity derivatives | CTT table below; do not relabel CTT as STT. | Product-specific | Product-specific | CTT-R | **[verified]** [MCXCCL CTT]. |
| **STT-R: valuation and tax rounding** | Weighted-average price rounded to nearest paisa; taxable value and STT rounded to nearest rupee, fractions ≥50 paise upward. | Apply statutory computation/aggregation; reconcile client tax to clearing records. | Collecting exchange/member chain | Do not round every execution independently without matching statutory aggregation. | **[verified]** [STT Rules], rules 3–4. **[unknown]** complete 2026 exchange allocation algorithm for all delivery/intraday netting edge cases. |

| Notification versus effect | Evidence |
|---|---|
| Finance Act 2026 received presidential assent on 30 March 2026; NSE notified the new STT rates on 31 March; effective date is 1 April 2026. This is enacted, not a Budget proposal. | **[verified]** [STT 2026 circular], NSE/FATAX/73524. |
| A current table and old explanatory prose can coexist on an exchange webpage. Use the 2026 rate circular and the intrinsic-value treatment, not stale prose suggesting gross settlement value for equity-option exercise. | **[verified]** comparison of [NSE derivatives STT], [STT 2026 circular] and [NCL STT]. |

### A3. Commodities Transaction Tax

| Taxable event | Rate | Base | Side liable | Rounding / collection | Evidence |
|---|---:|---|---|---|---|
| Non-exempt commodity futures / commodity-index futures sale | 0.01% | Traded futures value | Seller | CTT-R; client/contract/day calculation | **[verified]** [MCXCCL CTT]. |
| Sale of option on commodity derivative | 0.05% | Premium | Seller | CTT-R | **[verified]** [MCXCCL CTT]. |
| Exercise of option on commodity derivative | 0.0001% | Settlement price × quantity | Purchaser | CTT-R | **[verified]** [MCXCCL CTT]. **Not** equity-option intrinsic-value taxation. |
| Sale of option in goods | 0.05% | Premium | Seller | CTT-R | **[verified]** [MCXCCL CTT]. |
| Exercise of option in goods, actual delivery | 0.0001% | Settlement value | Purchaser | CTT-R | **[verified]** [MCXCCL CTT]. |
| Exercise of option in goods, cash settlement | 0.125% | Intrinsic value | Purchaser | CTT-R | **[verified]** [MCXCCL CTT]. |
| Exempt agricultural commodity contracts | Nil where covered by the notified exemption. | Check the legal commodity/contract classification. | None where exempt | Not applicable | **[verified]** exemption mechanism: [MCXCCL CTT]. **[unknown]** exhaustive 15 October 2026 exemption-to-contract mapping; do not infer exemption from a marketing category. |
| **CTT-R** | Nearest rupee; ≥50 paise rounds upward. | Taxable value / CTT under rule 4 | Member collection follows clearing schedule | Daily determination; MCXCCL collects on T+1. | **[verified]** [CTT Rules], rule 4; [MCXCCL CTT]. |

### A4. Exchange transaction charges, IPF/IPFT and clearing charges

| Exchange / segment | Exchange fee per ₹crore, each side | Percentage / base | Separate IPFT per ₹crore, each side | Effective/currentness evidence | Rounding |
|---|---:|---|---:|---|---|
| NSE cash equity | **₹306.99** | 0.0030699% of traded value | **₹0.01**; total ₹307 | **[verified]** [NSE fees March 2026]; effective **1 March 2026**. | **[unknown]** client-level rounding precision/allocation. |
| NSE equity futures | **₹182.99** | 0.0018299% of futures traded value | **₹0.01**; total ₹183 | **[verified]** [NSE fees March 2026]; 1 March 2026. | **[unknown]** same. |
| NSE equity options | **₹3,552.99** | 0.0355299% of premium turnover | **₹0.01**; total ₹3,553 | **[verified]** [NSE fees March 2026]; 1 March 2026. | **[unknown]** same. |
| NSE currency futures | ₹35 | 0.00035% of traded value | ₹5, separately reported in broker tariffs | Fee **[verified]** [NSE fees October 2024], effective 1 October 2024; IPFT **[likely]** independent [Zerodha IPFT] and [Pinnacle April 2026 tariff]. | **[unknown]** rounding; reconcile whether a displayed combined rate already includes IPFT. |
| NSE currency options / interest-rate options | ₹3,110 | 0.0311% of premium turnover | Currency options ₹200 | Fee **[verified]** [NSE fees October 2024]; currency IPFT **[likely]** [Zerodha IPFT] + [Pinnacle April 2026 tariff]. **[unknown]** interest-rate-option IPFT equivalence. | **[unknown]** rounding. |
| NSE commodity futures / options | Futures ₹10; options ₹100 | 0.0001% traded value / 0.001% premium | **[unknown]** current recoverable IPFT | **[likely]** independent [Zerodha exchange fees] + [Dhan October revision]; current primary tariff/waivers not authenticated. | **[unknown]**. |
| BSE cash, ordinary non-exclusive/A/B-group rate | ₹375 | 0.00375% of traded value | **[unknown]** current primary contribution schedule | **[likely]** independent [Zerodha exchange fees] and [Rupeezy tariff]; not a new October 2024 cash rate. | **[unknown]**. |
| BSE cash, special scrip groups | X/XT/Z/ZP: ₹10,000; SS/ST: ₹100,000; M/MT/TS/MS: ₹275 | Respectively 0.1%, 1%, 0.00275%; traded value | **[unknown]** | **[uncertain]** [Zerodha charges]; exact group eligibility and current BSE schedule must be authenticated before configuration. | **[unknown]**. |
| BSE SENSEX/BANKEX options | ₹3,250 | 0.0325% of premium | **[unknown]** separate recoverable IPF | **[likely]** [Zerodha October revision] + [Dhan October revision]; effective 1 October 2024; [BSE notice mirror] supports original notice. | **[unknown]**. |
| BSE stock options / SENSEX50 options | ₹500 | 0.005% of premium | **[unknown]** | Stock options **[likely]** [Zerodha October revision] + [Dhan October revision]; SENSEX50 **[uncertain]** [Zerodha exchange fees]. **[unknown]** product-specific 2026 waivers/availability. | **[unknown]**. |
| BSE equity futures | Nil | Futures turnover | **[unknown]** separate IPF | **[likely]** [Zerodha exchange fees] + [Rupeezy tariff]. No assumption that a waiver is permanent. | Not applicable to nil transaction fee. |
| BSE currency futures / options | ₹45 / ₹100 | 0.00045% traded value / 0.001% premium | **[unknown]** | **[likely]** [Zerodha exchange fees] + [Dhan October revision]. Primary current BSE tariff not authenticated. | **[unknown]**. |
| BSE commodity derivatives | **[unknown]** | **[unknown]** product-specific schedule | **[unknown]** | Do not import MCX rates or assume listed products are live. | **[unknown]**. |
| MCX commodity futures | ₹210 = ₹2.10/lakh | **0.0021%** of traded value | **[unknown]** separate client-recoverable IPF | **[likely]** [MCX 2026 master mirror] + independent [TeamLease MCX 2026]; originally effective 1 October 2024, repeated in April 2026 master. Primary MCX PDF retrieval unsuccessful. | **[unknown]**. |
| MCX commodity options | ₹4,180 = ₹41.80/lakh | **0.0418%** of premium | **[unknown]** separate client-recoverable IPF | **[likely]** same two sources. Do not misplace the decimal as 0.00418%. | **[unknown]**. |

| Ancillary charge / reconciliation issue | Treatment | Evidence |
|---|---|---|
| NSE 2026 fee split | Cash/futures/options exchange-plus-IPFT totals remain ₹307/₹183/₹3,553 per crore; fee allocation changed from ₹297+₹10, ₹173+₹10, ₹3,503+₹50. | **[verified]** [NSE fees March 2026]. Charging the new exchange component plus the old IPFT overcharges the client. |
| IPFT nature | Treat as its own MII levy, even if the contract note bundles it in exchange transaction charges; prevent double counting. | **[verified]** bundling described in [Zerodha IPFT]; **[verified]** actual-recovery rule: [True to label]. |
| Clearing corporation fee versus clearing-member service fee | **[unknown]** chosen NCL/ICCL/MCXCCL and third-party clearing-member commercial schedules. They are separate from exchange trading fees; no universal zero clearing fee established. | **[verified]** MIIs covered include clearing corporations: [True to label]. **[unknown]** proposed broker's contract, basis, minimum, payer allocation and rounding. |
| BSE clearing example | ₹0.02 per trade plus GST appears in one broker's 1 April 2026 tariff. | **[uncertain]** [Pinnacle April 2026 tariff]; not authenticated as a universal current ICCL charge. |
| Product waivers / new launches | **[unknown]** complete current waiver schedule, including new NSE index products and BSE variants. | Configure neither zero nor standard fees solely from a generic calculator. Obtain product-specific circular and expiry date. |
| Exchange fee / clearing fee / IPFT rounding | **[unknown]** universal rule. | Preserve decimal computation and reconcile invoice/control totals; this is a design recommendation, not an asserted statutory rounding method. |

### A5. SEBI turnover fees

| Segment | Rate | Base / liable side | Collection / rounding | Evidence |
|---|---:|---|---|---|
| Cash securities excluding debt | 0.00010% = ₹10/crore | All sales and purchases; both sides | Exchange collects from broker; **[unknown]** client allocation rounding | **[verified]** [Stock Brokers Regulations 2026], regulation 41. |
| Equity derivatives / currency derivatives | 0.00010% = ₹10/crore | Executed turnover and expiration settlements; options premium **plus notional value of exercised/assigned contracts** | Both sides as applicable; **[unknown]** allocation rounding | **[verified]** same regulation. Do not substitute STT intrinsic-value base. |
| Non-agricultural commodity derivatives | 0.00010% = ₹10/crore | Executed and expiration-settlement turnover; option exercise/assignment additionally uses notional | Both sides; **[unknown]** rounding | **[verified]** same regulation. |
| Agricultural commodity derivatives | 0.00001% = ₹1/crore | Agricultural derivative turnover | Both sides; **[unknown]** rounding | **[verified]** same regulation. |
| Interest-rate derivatives | 0.00005% = ₹5/crore | Relevant derivative turnover | Both sides; **[unknown]** rounding | **[verified]** same regulation. |
| Debt segment | **0.00002% = ₹2/crore** | Executed debt trades, sale and purchase | Both sides; **[unknown]** rounding | **[verified]** 2026 regulation; older ₹2.50/crore summaries must not override it. |
| Electronic gold receipts | 0.00010% = ₹10/crore | Sale and purchase turnover | Both sides; **[unknown]** rounding | **[verified]** same regulation; included for instrument completeness, not a claim that the proposed broker offers EGR. |
| Clearing/self-clearing registration fee | ₹50,000 annual fee in specified derivative/debt categories, subject to regulation's qualifications | Member business expense | Not automatically a per-trade client levy | **[verified]** same regulation. |

### A6. Uniform stamp duty regime

| Instrument / event | Rate | Base | Who pays / who collects | Rounding | Evidence / status |
|---|---:|---|---|---|---|
| Delivery transfer of securities other than debentures, including ordinary equity | 0.015% | Consideration/market value under collection rules | Buyer; exchange or authorised clearing corporation | Stamp-R | **[verified]** [NSE stamp table]; uniform regime effective **1 July 2020**. |
| Non-delivery equity transfer | 0.003% | Transaction value | Buyer; exchange/authorised CC | Stamp-R | **[verified]** [NSE stamp table]. |
| Equity futures | 0.002% | Futures contract traded value | Buyer; exchange/authorised CC | Stamp-R | **[verified]** [NSE stamp table]. |
| Equity options | 0.003% | Premium | Buyer; exchange/authorised CC | Stamp-R | **[verified]** [NSE stamp table]. |
| Currency / interest-rate futures | 0.0001% | Traded contract value | Buyer; exchange/authorised CC | Stamp-R | **[verified]** [NSE stamp table]. |
| Currency / interest-rate options | 0.0001% | Premium | Buyer; exchange/authorised CC | Stamp-R | **[verified]** [NSE stamp table]. |
| Commodity futures / commodity options | 0.002% / 0.003% | Futures turnover / option premium | Buyer; exchange/CC | Stamp-R | **[verified]** [MCXCCL FAQ]. |
| Transfer of debentures, bonds, CP, CD and securitised debt instruments | 0.0001% | Transfer consideration | Buyer for exchange trades; collector depends on trading/depository route | Stamp-R | **[verified]** [NSE stamp table], [CCIL stamp guidance]. |
| Issue of debentures | 0.005% | Issue value | Issuer; depository for dematerialised issuance | Stamp-R | **[verified]** [CCIL stamp guidance]. |
| Issue of securities other than debentures | 0.005% | Issue value | Issuer; depository for dematerialised issuance | Stamp-R | **[verified]** [CCIL stamp guidance]. |
| Off-market demat transfer for consideration | Instrument-class transfer rate; ordinary shares 0.015% | Consideration declared under collection rules | Transferor; depository | Stamp-R | **[verified]** [CCIL stamp guidance]. **[unknown]** complete broker/depository validation workflow for gifts and nil consideration. |
| Repo on corporate bonds | 0.00001% | Consideration specified for repo | Borrower / buyer of forward leg; relevant collecting agent | Stamp-R | **[verified]** [NSE stamp table]. |
| Government securities | Nil | Not applicable | None under this securities stamp schedule | Not applicable | **[verified]** [NSE stamp table]. |
| OFS / tender buyback / takeover / delisting, non-debenture securities | 0.015% | Transaction consideration | Offeror/seller, an exception to the normal buy-side rule | Stamp-R | **[verified]** [NSE stamp table]. |
| **Stamp-R** | Nearest rupee; ≥50 paise upward | Rule 7(3), collection rules | Client aggregate collection follows collecting-agent computation | Apply at prescribed aggregate, not guessed per-fill level | **[verified]** identifiable NCL circular reproduced in [NCL stamp circular mirror]; statutory text reproduced in [Stamp rule 7]. Primary-hosted current rule consolidation not obtained. |

### A7. GST — rate, precise components and exclusions

| Component | GST treatment / tax base | Who bears it / rounding | Evidence |
|---|---|---|---|
| Brokerage | 18% on brokerage service consideration | Client; GST-R below | **[verified]** [Zerodha charges] current tariff; taxable broking service: [CBIC sectoral FAQ], Q78. |
| Exchange transaction charges and clearing service charges | 18% on taxable service charges; do not tax trade principal | Recipient/client as billed through service chain | **[verified]** [Zerodha charges]; **[unknown]** precise clearing-member invoice treatment until contract/invoice obtained. |
| SEBI turnover fee | 18% in current broker charge formula | Client | **[verified]** [Zerodha charges]. Do not classify it as exempt merely because the recipient is a regulator. |
| IPFT | 18% on the IPFT recovery in cited NSE broker tariff | Client; count once if included in exchange charge | **[verified]** [Zerodha IPFT]. |
| STT, CTT, stamp duty | Excluded from GST valuation **only where Rule 33 pure-agent conditions are met**; otherwise section 15 valuation applies. | Client pays the levy, not GST-on-tax merely by default | **[verified]** [CBIC sectoral FAQ], securities-market Q7 and banking/stockbroking Q77. |
| DP debit, AMC, pledge and other DP services | 18% on taxable DP service fee, including recoveries forming its taxable consideration | Client/DP recipient as invoiced | **[verified]** current retail examples: [Zerodha charges], [NSDL participant charges]. **[unknown]** line-level tax mapping for every unusual depository expense. |
| Call-and-trade, auto square-off service, API/data subscription and other taxable broker services | 18% on the separately priced service | Client | **[verified]** published tariff examples: [Zerodha charges], [Kite API FAQ]. |
| Interest / delayed-payment charge on settlement debit / MTF | CBIC says interest/delayed-payment charges for brokerage/settlement obligations/MTF are not leviable to GST, being loan/advance-type transactions covered by exemption. | Client bears interest; do not automatically add 18% to interest | **[verified]** [CBIC sectoral FAQ], Q80. **[unknown]** treatment of a separately described administrative/default fee: substance and invoice must be examined. |
| Margin or exchange penalty recovered from client | **[unknown]** universal GST answer across genuine penalty reimbursement, service charge and interest; classification must be established. | Do not copy “18% on all penalties” from a broker calculator as law. | **[unknown]** current line-specific tax determination. |
| GST-R | CGST Act section 170 provides nearest-rupee rounding for sums payable/refundable under the Act; ≥50 paise upward. This does not by itself establish per-fill client invoicing precision. | **[unknown]** chosen invoice-level rounding/allocation method | **[uncertain]** statutory reproduction/ICAI explanation: [ICAI GST FAQ]; primary section text not independently captured in this research. |
| Practical calculation | Taxable service base = brokerage + taxable exchange/clearing fees + taxable SEBI/IPFT recoveries + other taxable services, counted once; exclude qualifying pure-agent taxes and exempt interest. | **[unknown] (design)** use component-level tax flags, not one blanket percentage on all ledger debits. | **[verified]** underlying treatments above; formula is an explicit synthesis, subject to each recovery's legal character. |

### A8. Depository charges versus the DP's client tariff

| Service | CDSL → DP charge | NSDL → DP charge | Client-facing DP treatment / evidence |
|---|---|---|---|
| Debit / settlement instruction | ₹3.50/debit; eligible female-first-holder and bond discounts ₹0.25 each | ₹4/debit instruction | **[verified]** [CDSL operating instructions], chapter 12; [NSDL July 2026 fees]. Client tariff is separate: **[verified]** [NSDL participant charges]. |
| Credits | Nil ordinary BO credit charge | No ordinary BO credit charge permitted | **[verified]** prohibition: [SEBI DP charge prohibition]. Do not confuse BO credits with clearing-member account services. |
| Debit exemptions | Specified MF/non-ETF, REIT, InvIT, AIF, SIF fee holiday from 1 January 2026 until further notice; other instrument exemptions apply | MF, SIF, REIT, InvIT, AIF exceptions stated | **[verified]** respective depository schedules. **[unknown]** exhaustive instrument/security-master eligibility; do not apply blanket ETF exemption. |
| Non-corporate BO AMC | Nil depository AMC | **[unknown]** universal non-corporate AMC from retrieved tariff | **[verified]** CDSL schedule; **[unknown]** ordinary retail DP AMC is broker-specific, subject to BSDA below. |
| Corporate BO AMC | ₹500/year | ₹500/year | **[verified]** respective schedules. This is not automatically the retail DP's final invoice. |
| Ordinary pledge creation, including ordinary MTF pledge where applicable | ₹12/request, pledgor side | ₹25/instruction | **[verified]** respective schedules; distinguish from margin-pledge workflow below. |
| Ordinary pledge closure / invocation | Closure ₹12/request on pledgor side under specified unpledge processing | Closure/invocation nil | **[verified]** respective schedules. **[unknown]** CDSL ordinary invocation charge not separately established here. |
| Margin pledge creation / release / invocation | ₹5/request; applicable initiating account, CC exemptions | ₹5/instruction; TM/CM invocation/release as specified | **[verified]** respective schedules. |
| Margin re-pledge / release | ₹1/request; CC exemptions | TM→CM ₹1; CM→CC ₹1; CM→TM release ₹1; CC release/invocation nil | **[verified]** respective schedules. Not a licence to multiply the client's charge without tariff/actual-cost justification. |
| Dematerialisation | Nil depository charge | **[unknown]** not separately established | **[verified]** CDSL schedule. **[unknown]** DP processing, per-certificate and courier tariff. |
| Rematerialisation | Higher of ₹10 per 100 securities or part (cap ₹5 lakh) and ₹10/certificate; G-sec exemption | Same formula and G-sec exemption | **[verified]** respective schedules. Client DP handling/courier charge is additional only under applicable tariff. |
| Failed/rejected instruction | **[unknown]** universal failure fee; ₹100 erroneous-transfer reversal is a different service | **[unknown]** universal failure fee | **[verified]** reversal service in CDSL schedule; **[unknown]** proposed DP's rejected-instruction tariff and trigger. |
| Depository minimum billing | ₹8,000/month minimum to DP | ₹8,000/month minimum to DP | **[verified]** respective schedules. Business overhead, not an automatic fixed levy on every BO. |
| Retail sell-debit example | CDSL ₹3.50 component | Not applicable | **[verified]** Zerodha example: ₹13 + GST = ₹15.34 per scrip sell-debit tariff, with ₹9.50 broker component: [Zerodha charges]. **[unknown]** exact aggregation exceptions must be taken from the provider's DP tariff. |
| Who bears which side | Depository bills DP under depository tariff; DP bills BO under agreed client tariff | Same separation | **[verified]** [NSDL participant charges], [CDSL operating instructions]. **[verified]** a depository-labelled recovery must comply with [True to label]; do not present the DP's own service fee as a depository levy. |
| Rounding | **[unknown]** universal rounding for depository instructions and client DP invoice | **[unknown]** | Instruction units and service minimums are not a statutory nearest-rupee rule; reconcile source invoice and GST treatment. |

| BSDA / prohibited DP charge | Current rule | Evidence / effective date |
|---|---|---|
| BSDA AMC, holdings ≤₹4 lakh | Nil AMC | **[verified]** [BSDA June 2024], effective 1 September 2024. |
| BSDA AMC, holdings >₹4 lakh and ≤₹10 lakh | Maximum ₹100/year | **[verified]** [BSDA June 2024]. |
| Holdings >₹10 lakh | Regular demat tariff may apply | **[verified]** [BSDA June 2024]. |
| BSDA eligibility | Individual, only one demat account as sole/first holder, and only one BSDA across depositories, subject to the holding threshold | **[verified]** [BSDA June 2024]. |
| 2026 BSDA changes | Quarterly eligibility review; eligible accounts default to BSDA unless authenticated/verifiable consent for regular account; suspended/delisted securities and ZCZP bonds excluded from threshold valuation; illiquid securities use last closing price | **[verified]** [BSDA December 2025], notified 24 December 2025, **effective 31 March 2026**. Final rule, not the earlier consultation. |
| BO account opening / custody / credits | SEBI prohibits specified BO account-opening, custody and credit charges; statutory charges are distinct | **[verified]** [SEBI DP charge prohibition], 28 January 2005. Do not confuse a trading-account service with a prohibited demat charge. |
| Account closure and identical-holder transfer on closure | No charge for closure; no transfer charge where all securities move to another DP/depository account with identical holder names/order under specified closure procedure | **[verified]** [SEBI DP closure charges], 9 November 2005. |
| AMC refund on closure / shifting DP | Annual/half-yearly AMC collected upfront must be refunded for remaining full quarter(s), counted from account-opening date; this provision does not apply to monthly/quarterly AMC collection | **[verified]** [Depository master 2023], §1.10.5, citing SEBI circular MRD/DP/20/2010 of 1 July 2010. **[unknown]** invoice/GST adjustment method. |
| Ordinary retail AMC example | Zerodha non-BSDA AMC ₹300/year + 18% GST, collected quarterly; first-year concession subject to provider eligibility | **[verified]** [Zerodha AMC]. This is a DP price, not a SEBI-mandated ordinary-account rate. |

### A9. Broker-levied services, funding and default charges

| Charge | Verifiable example / base | Who pays / posting trigger | Regulatory boundary / rounding / evidence |
|---|---|---|---|
| Delayed-payment charge / debit-balance interest | Zerodha publishes 0.05% per day on applicable debit balance | Debtor client; daily accrual basis subject to tariff | **[verified]** [Zerodha interest]. **[verified]** policy must disclose rate and period and cannot disguise unlawful funding: [Broker master], §23.4.4. **[unknown]** universal regulatory interest cap; compounding/day-count rule for proposed broker. |
| Call-and-trade | Zerodha ₹50/order + GST | Calling client, executed service as tariff specifies | **[verified]** [Zerodha charges]; **[unknown]** proposed broker's rate and failed/unexecuted-call treatment. |
| Auto square-off service | Zerodha ₹50/order + GST | Client whose position broker squares off under tariff | **[verified]** [Zerodha charges]. Distinct from brokerage, trading loss and regulatory penalty; **[unknown]** proposed rate. |
| Physical contract note | Zerodha ₹20 + courier | Requesting client under tariff | **[verified]** [Zerodha charges]. **[unknown]** permitted charge for mandatory physical delivery after ECN failure; do not impose request-service pricing on every mandatory communication. |
| Cheque bounce | Kotak published example ₹500 plus deposit charge | Client whose cheque dishonours | **[verified]** [Kotak cheque charges]; not a statutory penalty rate. **[unknown]** GST composition and proposed broker's fee. |
| Reactivation | **[unknown]** universal fee, ceiling or prohibition; proposed tariff unset | Only a defined, agreed service trigger | **[unknown]**; no invented ₹ amount or automatic default debit. |
| SMS / alerts | **[unknown]** proposed optional-alert subscription and mandatory-alert charge permissions | Separate mandatory regulatory communications from optional services | **[unknown]** universal broker fee; depository communications may have their own DP-side schedule. |
| API subscription | Kite Connect example ₹500/month; personal API has a free tier with different scope | Subscriber | **[verified]** [Kite API FAQ]. **[unknown]** proposed plan, exchange algo approvals and data redistribution rights; a subscription alone confers none. |
| Exchange data feed | Product, user, level and redistribution-dependent schedule; no single retail statutory rate | Contracted data recipient | **[verified]** 2026 tariff catalogue exists: [NSE data tariff]. **[unknown]** chosen feeds/licences and final cost. |
| MTF interest | Zerodha example 0.04%/day on funded amount, from T+1 through sale date under its policy | Funded client; separate MTF ledger | **[verified]** [Zerodha charges]; regulatory MTF segregation: [NSE MTF FAQ]. **[unknown]** proposed annual rate, day count and rounding. |
| Ordinary margin-pledge handling | Zerodha ₹30 + GST/request/ISIN; unpledge free under instant-pledging policy | Client requesting pledge | **[verified]** provider price: [Zerodha instant pledge]. **[verified]** NSE permits actual pledge/unpledge/invocation charges under written agreed tariff: [NSE margin FAQ], Q27. A separately labelled handling fee requires its own basis; do not inflate depository recovery. |
| MTF pledge handling | Zerodha ₹15 + GST per pledge/unpledge request per ISIN | MTF client | **[verified]** [Zerodha charges]. It is not the CDSL margin-pledge price by definition. |
| Expiry / physical-delivery brokerage and special service orders | Additional brokerage can be part of a provider's tariff for expiry, exercise, assignment or physical delivery; corporate-action and off-market instructions can also carry distinct service prices | Respective client under disclosed tariff and applicable ceiling | **[verified]** these separate categories appear in [Zerodha charges]. **[unknown]** proposed broker's rates; do not treat zero delivery brokerage as a promise that every such service is free. |
| Payment-gateway convenience | Zerodha ₹9 + GST for chargeable gateway transfers; UPI excluded | Client using paid method | **[verified]** [Zerodha charges]. **[unknown]** proposed provider agreement/tariff. |
| AMC, demat/remat processing, courier, rejected DIS and additional statements | **[unknown]** proposed DP tariff beyond the source examples/BSDA limits above | BO under agreed, permitted tariff | Do not manufacture market-wide rates. BSDA and express SEBI prohibitions override contract wording. |
| Commodity delivery expenses | **[unknown]** warehouse, assaying, transport, insurance, delivery-processing fees and underlying-goods GST by commodity/location | Contract-specific buyer/seller allocation | Derivative taxes are not an all-inclusive physical-commodity delivery invoice. Obtain contract specification and warehouse/CC tariff. |
| Rounding for broker services | **[unknown]** universal rule | Contractual invoice precision, after charge aggregation | Disclose the rate, unit, minimum and tax treatment; do not apply STT rounding to service fees by analogy. |

### A10. Penalties, auction losses and who may bear them

| Margin shortfall condition | Penalty on shortfall | Recurrence / timing | Primary obligor and client recovery | Evidence |
|---|---:|---|---|---|
| NSE applicable client-margin shortfall <₹1 lakh **and** <10% of required margin | 0.5% | Per applicable day/client/segment | Member is assessed; pass-on depends on cause/type below | **[verified]** [NSE F&O penalties], [NCL risk FAQ]. |
| Shortfall ≥₹1 lakh **or** ≥10% | 1% | Same | Same | **[verified]** same sources. Do not use “and” for this higher slab. |
| NSE shortfall >3 consecutive days | 5% | From fourth consecutive day on continuing shortfall | Same | **[verified]** [NSE F&O penalties]. |
| NSE shortfall >5 days in a month | 5% | Beyond fifth shortfall day in month | Same | **[verified]** [NSE F&O penalties]. |
| MCX short/non-collection base slabs | 0.5% / 1% with the same ₹1 lakh / 10% tests | Per applicable shortfall | Member assessed | **[verified]** [MCXCCL client margin reporting]. |
| MCX recurring shortfall | 5% | Beyond 3 consecutive days; also beyond 3 shortfall days in a month under cited schedule | Do not import NSE's five-day monthly threshold | **[verified]** [MCXCCL client margin reporting], [MCXCCL FAQ]. |
| Exceptional large market move | NSE published schedule contains a NIFTY movement exception with conditions | **[unknown]** verified applicability of every exception to each 2026 segment/client case | Do not auto-waive solely because a market moved sharply | **[verified]** exception exists in [NSE F&O penalties]; **[unknown]** complete operational applicability. |
| Margin calculation versus payment/reporting deadlines | Upfront collection is before trade; later settlement/reporting windows do not generally authorise absent upfront margin | Use segment-specific schedules, not one T+2 rule | Member must demonstrate collection and cause | **[verified]** [NSE margin FAQ]; [MCXCCL client margin reporting]. |

| Passing a penalty to a client | Rule / scope | Evidence / status |
|---|---|---|
| Ordinary upfront-margin collection shortfall | Broker generally bears it; client tariff cannot override the exchange prohibition | **[verified]** [NSE margin FAQ], Q20; [NCL inspection FAQ], Q33. |
| Upfront shortfall caused by client's dishonoured cheque | Specific exception permits client recovery under applicable conditions | **[verified]** [NCL inspection FAQ], Q33; effective **1 November 2024**. |
| Upfront shortfall caused by client breaking a hedge / expiry of a hedge leg | Specific exception; retain client attribution, evidence and disclosed policy | **[verified]** [NCL inspection FAQ], Q33; policy communication at least seven days before applicability/levy, whichever later, as specified there. |
| Other client margins | Actual exchange penalty may be passed where client failed the applicable obligation, with supporting records and agreed disclosures | **[verified]** [NSE margin FAQ], Q20. Not permission for a discretionary extra “exchange penalty”. |
| Broker reporting, submission, proprietary position or system default | No general authority to charge unrelated clients was verified | **[unknown]** legal pass-through basis; proposed control: book to broker expense unless a specific permitted client-caused recovery is evidenced. |
| MCX / BSE exceptions | **[unknown]** fully authenticated current, exchange-specific pass-on text matching all NSE exceptions | Do not assume an NSE permission automatically applies on MCX/BSE. |
| Refund / cancellation of an assessed penalty | **[unknown] (design)** reverse linked client recovery when the corresponding charge is waived/refunded; retain allocation trail | Actual-recovery principle: **[verified]** [NSE actuals enforcement]; precise penalty refund workflow not universally prescribed in retrieved sources. |

| Other penalty / loss | Rate or calculation | Who bears it / timing | Evidence and cautions |
|---|---|---|---|
| Short delivery: normal auction | Debit actual auction settlement consequences, not a made-up fixed “20% penalty” | CC assesses member; allocate evidenced client-caused short delivery under applicable policy | **[verified]** [NCL internal shortages FAQ]. Auction debit and close-out credit can differ. |
| Normal cash close-out when auction fails | Higher of highest price across exchanges from trade through auction and 120% of auction-day settlement price | Resulting shortage settlement; actual CC allocation controls | **[verified]** [NCL settlement FAQ February 2026]. Do not generalise to ETFs, bonds, corporate-action cases or every trade type. |
| Auction difference where auction is cheaper | Difference between settlement price and lower auction rate can still be collected from short-delivering member; it is not automatically client profit | Source calls this “auction difference” | **[verified]** [NCL internal shortages FAQ], Q9. **[unknown]** complete client-recovery treatment for all shortage types. |
| T+1 normal cash-market shortage timing | Auction on T+1; auction settlement T+2, under current securities-settlement description | Member must fund valuation/auction obligations | **[verified]** [NCL securities settlement]. Older shortages-handling webpage still refers to T+2 auction; do not use its timing. |
| Equity F&O client position-limit / MWPL-ban increase | Published NSE schedule: 1% of excess-position value; minimum ₹5,000, maximum ₹1 lakh per day for specified violations | Assessed on member; client recovery requires applicable cause/rule, not merely a generic consent | **[verified]** published [NSE F&O penalties]. **[unknown]** complete current mapping to newer index intraday monitoring/financial-disincentive frameworks; do not treat this as every F&O breach. |
| Currency TM position-limit breach: monetary | 1st instance ₹5,000; 2nd–5th ₹20,000 each; 6th–10th ₹50,000 each; 11th onward ₹1 lakh each, plus committee referral | TM-level breach, not a universal client fine | **[verified]** [NCL currency position 2026], effective **2 March 2026**. |
| Currency TM breach: additional margin | Position/limit ratio 100–<110%: 0.75%; 110–<125%: 1%; 125–<150%: 1.25%; ≥150%: 1.5%, applied to value of breached contracts | Blocked from CM proprietary collateral T+1 before market; released T+1 after compliance | **[verified]** [NCL currency position 2026]. It is collateral blocking, not a permanent penalty debit. |
| Commodity client/clubbed-client position breach >2% of limit | Lower of excess quantity × closing price × days × 2% and **₹2 lakh** | Charged to member; reduce within limit by next trading day, otherwise exchange square-off | **[verified]** [SEBI commodity position September 2026], immediate effect **9 September 2026**. |
| Commodity breach ≤2% of limit | Same formula capped at **₹10,000** | Same; options use near-month underlying futures close | **[verified]** same final circular. |
| Commodity recurrence | More than three specified instances/month can trigger additional equal penalty; >3 large breaches in same commodity can cause one-day square-off mode; clubbing-only exception applies to additional penalty | Member exposure; not automatically every client's liability | **[verified]** same final circular. May 2026 consultation is superseded on these points. |
| Late RBS submission, NSE 2026 example | First 7 calendar days: ₹1,500/day non-QSB, ₹3,000 QSB; days 8–21: ₹2,500/₹5,000 per day | Broker compliance expense; subsequent escalation/restrictions apply | **[verified]** [NSE RBS penalty 2026], Annexure D. **[unknown]** universal rate for other late submissions: none established. |
| Other late reports / false reporting / settlement funding failure | **[unknown]** report-, segment- and recurrence-specific 2026 schedules | Broker is assessed; distinguish financial disincentive, additional margin, penalty and disabling | Do not use the RBS rate for margin reports, cyber reports, client-fund returns or depository reports. |
| Penalty rounding | **[unknown]** universal rounding rule | Use assessing authority's debit/advice, allocate actuals | STT/CTT rounding does not automatically apply. |

### A11. What may and may not be charged; “true to label”

| Control | Required / prohibited treatment | Evidence |
|---|---|---|
| SEBI MII true-to-label circular | **SEBI/HO/MRD/TPD-1/P/CIR/2024/92**, notified **1 July 2024**, effective **1 October 2024** | **[verified]** [True to label]. |
| Actual MII recovery | Amount charged to end client as an MII levy must be the amount received by that MII; applies to exchanges, CCs and depositories | **[verified]** [True to label], §5(a). No retaining a volume-slab rebate while charging clients the undiscounted MII amount. |
| Flat versus slab pricing | MII charge structure to be uniform/equal rather than dependent on member volume/activity | **[verified]** [True to label], §5(b). Not a prohibition on every independently disclosed broker commercial plan. |
| Statutory actuals predate 2024 | NSE's 2022 instruction already requires statutory/regulatory levies recovered only at actuals | **[verified]** [NSE actuals enforcement]. The 2024 circular is not correctly described as only a tax circular. |
| Separate own service charge | Do not hide broker/DP remuneration inside “exchange”, “SEBI”, “stamp” or “depository” labels | **[verified]** actual-label obligation: [True to label]. **[unknown]** permissibility of a particular new service fee requires the actual tariff and applicable restrictions. |
| Tariff at onboarding | Supply charge tariff; agreed terms govern; changes must be intimated | **[verified]** [Broker master], §21.2.1 and account-opening undertaking. |
| Website / client access | Standard rights/obligations, risk disclosure and guidance documents available online; brokers with websites provide secured access to executed documents, account and margin information | **[verified]** [Broker master], §§21.13, 23.7. **[unknown]** a single universal circular requiring every tariff item on an unauthenticated public pricing page; do not invent one. |
| DP tariff dissemination | DP submits tariff to its depository annually by 30 April and informs tariff changes as effected; depository publishes comparative tariff information | **[verified]** [Depository master 2023], §1.10.6. Distinct from a broker's public pricing page. |
| Online price disclosure | Before-order charge display is an affirmative requirement, separately from onboarding tariff | **[verified]** [Order disclosure extension]. |
| Penalty and interest policy | Specify rate/period; no unlawful funding; client charge cannot override a regulatory prohibition | **[verified]** [Broker master], §§21.3, 23.4.4. |
| Unpaid-securities website policy transition | NSE operational guidelines require website-hosted policy and client communication before new provisions apply **31 October 2026** | **[verified]** [NSE unpaid securities July 2026]. As of 15 October this is a notified upcoming change, not an already-effective replacement. |
| Demat restrictions | BO opening/custody/credit prohibitions, BSDA AMC ceilings and qualifying closure-transfer exemption apply even if an inconsistent tariff is signed | **[verified]** [SEBI DP charge prohibition], [BSDA June 2024], [SEBI DP closure charges]. |
| Mandatory document copies | Executed client documents supplied free under master-circular requirement | **[verified]** [Broker master], §23.6. An optional physical-note/courier tariff is not authority to charge for every mandatory document. |

## PART B — EVENT → LEDGER → LIMIT → TIMING

### B1. Interpretation and balance separation

| Term / control | Meaning / evidence |
|---|---|
| Ledger sign convention | **[unknown] (design)** credit increases amount payable to client; debit decreases it/increases client debt. Maintain settled-cash, unsettled-receivable/payable and collateral subledgers rather than one ambiguous “balance”. |
| Available trading limit | **[unknown] (design)** eligible cash plus eligible collateral/expressly permitted receivables, less current obligations, order reservations, risk buffers and withdrawal reservations; enforce segment and cash-component constraints. This is a design model, not a universal regulatory formula. |
| Withdrawable balance | **[verified]** a broker can show trading credit before receipt/settlement while disallowing withdrawal: [Zerodha withdrawal rejection]. **[unknown] (design)** calculate withdrawable cash separately, after obligations and permitted retention. |
| Timing vocabulary | **[unknown] (design)** “Immediate” means after a verified success/eligibility event reaches the broker, not after a client screenshot. “Next BOD” is an implementation batch, not a synonym for T+1 settlement. “On settlement” means the applicable CC/bank settlement event. |
| Calendar | **[verified]** equity F&O daily settlement is T+1 under [NCL derivative settlement]; **[unknown]** exact dates require exchange/bank holidays and selected settlement cycle. Do not add one calendar day mechanically. |
| Evidence in matrix | Regulatory settlement/eligibility facts are tagged separately from recommended debit/credit/reservation postings. **[unknown] (design)** entries should not be promoted to “SEBI mandates this software timestamp”. |

### B2. Money in and money out

| Event | (i) Client ledger | (ii) Trading limit / available margin | (iii) Timing and evidence |
|---|---|---|---|
| UPI pay-in confirmed from mapped client bank | **[unknown] (design)** credit confirmed receipt/payment receivable once; distinguish gateway receivable from cleared bank cash | **[verified]** instant limit is an offered broker practice, not a rail-wide legal guarantee | **[verified]** Zerodha lists instant UPI credit: [Zerodha fund timeline]. **[unknown]** proposed integration latency; recognise only authenticated success. |
| Net-banking gateway pay-in | **[unknown] (design)** credit gateway receivable on authenticated success; reclassify to bank cash when remitted | **[verified]** broker may offer immediate limit while gateway settlement to broker takes longer, using its own capital | **[verified]** [Zerodha withdrawal rejection]; independent immediate-net-banking example [Samco fund timeline]. **[unknown]** proposed gateway settlement contract. |
| IMPS pay-in | **[unknown] (design)** credit after bank receipt and client reconciliation | **[verified]** Zerodha publishes approximately ten-minute credit; this is broker practice, not guaranteed by regulation | Receipt/reconciliation event; **[verified]** [Zerodha fund timeline]. **[unknown]** proposed SLA. |
| NEFT / RTGS pay-in | **[unknown] (design)** same; never treat sender's debit advice as proof of receiver credit | Eligible once receipt/client mapping and applicable allocation are established | **[verified]** Zerodha publishes roughly two-hour reflection for these routes: [Zerodha fund timeline]. **[unknown]** universal BOD or immediate-credit requirement. |
| Cheque deposited, not cleared | **[unknown] (design)** cheque-in-collection memorandum/receivable; keep separate from cleared cash | Conditional reporting accommodation exists; it is not an unconditional entitlement to pre-clearance limit | **[verified]** upfront-margin cheque must be received/booked by T, deposited by T+1 excluding bank holiday and cleared within T+5 working days: [NSE margin FAQ], Q16. **[unknown]** proposed RMS risk approval. |
| Cheque clears | **[unknown] (design)** move collection receivable to cleared-cash credit, avoiding duplicate credit | Increase eligible cash only by amount not already admitted provisionally | Actual bank clearance; **[verified]** clearance conditions in [NSE margin FAQ]. **[unknown]** bank-to-broker posting batch. |
| Third-party transfer / unverified remitter | **[unknown] (design)** no client credit; identify in suspense and return through verified banking process | No client limit solely from the transfer claim | **[verified]** third-party fund acceptance is an inspection irregularity: [NSE inspection irregularities]. **[unknown]** universal refund deadline/portal/form; none invented. |
| Payout requested | **[unknown] (design)** keep ledger cash; create payout reservation, or use a separately reconcilable payout-pending liability | Reduce spendable limit/withdrawable cash by accepted reservation; avoid double use | **[unknown]** universal statutory posting instant. Reserve immediately on accepting request; proposed design. Actual payout depends on obligations: **[verified]** [Zerodha payout adjustments]. |
| Payout accepted but awaiting bank processing | **[unknown] (design)** retain payout-pending state | Keep reservation until cancellation or confirmed failure | **[unknown]** universal SLA; apply chosen provider's cutoff and applicable settlement-of-client-funds obligations. |
| Payout processed successfully | **[unknown] (design)** debit client ledger when payment liability is discharged; clear matching reservation | No second reduction if reservation already deducted | Bank-confirmed processing; **[unknown]** universal ledger timestamp. Recipient-bank arrival can be later than broker submission. |
| Payout fails before debit | **[unknown] (design)** cancel pending reservation; no fictitious cash-credit journal | Restore only the reserved amount still genuinely available | Failure confirmation; **[unknown]** universal BOD rule. |
| Payout debited, then bank returns funds | **[unknown] (design)** linked reversal credit only after verified return/reconciliation | Restore eligible amount after checking intervening obligations | Return event, not an arbitrary next BOD; **[unknown]** universal restoration SLA. |
| Statutory/client settlement of funds, no running-account authority | **[unknown] (design)** payout journal follows bank instruction/payment control | Remove money committed to payout from spendable limit | **[verified]** funds settlement within one working day of payout unless written running-account authority: [NSE client funds settlement], Q1. This is not a universal one-day SLA from any withdrawal-button click. |
| Running-account settlement | **[unknown] (design)** debit actual remittance; retain only permitted amounts against obligations | Returned funds cease to support exposure | **[verified]** monthly/quarterly exchange dates; qualifying inactive credit balances follow upcoming monthly settlement, subject to conditions: [NSE client funds settlement]. **[unknown]** exact 2026 calendar dates not reproduced. |
| Deposit displayed as trading credit but not yet available for payout | **[unknown] (design)** retain gateway/settlement receivable classification | Trading use requires valid margin backing; withdrawal withheld until received/eligible | **[verified]** [Zerodha withdrawal rejection] explicitly distinguishes immediate trading credit from gateway receipt, often T+1/T+2. Provider practice, not a universal permission to trade against unsecured IOUs. |

### B3. Collateral and cash-market trades

| Event | (i) Client ledger | (ii) Trading limit / available margin | (iii) Timing and evidence |
|---|---|---|---|
| Client initiates pledge, not yet accepted | **[unknown] (design)** no cash credit; pending collateral record | No increase merely from request | **[verified]** securities collateral must use depository margin pledge: [NSE margin FAQ]. **[unknown]** request completion latency. |
| Margin pledge accepted and eligible | **[unknown] (design)** collateral subledger increases; cash ledger unchanged, except service fee | Admit approved value after haircut and cash-ratio constraints | **[verified]** instant pledge can now be processed in minutes under [Zerodha instant pledge], January 2026; **not** a universal next-BOD rule. |
| Collateral revalued at BOD | **[unknown] (design)** valuation entry, no cash receipt | Limit rises/falls with eligible valuation; encumbered amount remains reserved | **[verified]** reporting valuation uses T−1 close less haircut at least T-day VaR: [NSE margin FAQ], Q13. **[unknown]** tighter broker intraday valuation method. |
| Price falls / risk valuation changes intraday | **[unknown] (design)** no cash credit/debit merely from collateral mark | Reduce eligible collateral when new valuation becomes applicable; test shortfall | **[verified]** collateral subject to haircut/eligibility in [NCL liquid assets]. **[unknown]** proposed tick/batch frequency. |
| Haircut increases / decreases | **[unknown] (design)** cash unchanged | Increase reduces, decrease may increase eligible limit | At applicable risk-parameter effective time; **[verified]** haircut requirement: [NCL liquid assets]. **[unknown]** no universal next-BOD rule for every revision. |
| Unpledge requested | **[unknown] (design)** reserve quantity for release; no cash credit | Check free collateral; remove/reserve usable value before releasing it | **[verified]** only free/unencumbered collateral can be released when obligations are satisfied: [NSE margin FAQ], Q9. **[unknown]** exact release-processing SLA. |
| Unpledge completed | **[unknown] (design)** reduce collateral subledger; cash unchanged apart from permitted fee | Remove released value once; do not duplicate request-stage reduction | Depository confirmation; **[unknown]** universal BOD delay. |
| Delivery sale before funds payout, EPI conditions met | **[unknown] (design)** credit sale receivable/trade ledger; cash remains unsettled | **Up to 100%** sale value may support other positions across segments after accepted block-EPI and ledger credit | **[verified]** [NSE margin FAQ], Q5. Immediate eligibility after conditions, not automatic cash withdrawal; avoid stale “only 80%” rule. |
| EPI securities accepted for the sale itself | **[unknown] (design)** securities blocked/delivered; no independent cash inflow | EPI satisfies/exempts the applicable upfront/peak margin for that sale | **[verified]** [NSE margin FAQ], Q4–5. Do not count sold collateral and sale credit twice. |
| Delivery sale without accepted EPI / unsettled purchase sold as BTST | **[unknown] (design)** recognise receivable but flag delivery risk | **[unknown]** blanket immediate 100% reuse permission not verified for this case | No automatic extension of the EPI exception; establish settlement/delivery conditions first. |
| Delivery sale settles | **[unknown] (design)** reclassify receivable to settled client cash, net obligations/charges | Cash eligibility replaces temporary receivable eligibility; no duplicate limit | **[verified]** ordinary cash settlement T+1 under [NCL securities settlement]; selected T+0 trades require their own cycle. |
| Purchase obligation created, before pay-in | **[unknown] (design)** book purchase payable/debit on trade; reserve obligation without waiting for bank settlement | Block applicable upfront margin immediately; reserve remaining settlement funding as due | **[verified]** upfront requirements: [NCL risk FAQ]; settlement cycle: [NCL securities settlement]. **[unknown]** proposed broker may require full prefunding as stricter policy. |
| Purchase pay-in / securities payout | **[unknown] (design)** discharge payable with cash; receive securities in securities subledger | Released trade margin is offset by cash spent; holdings do not automatically become collateral | **[verified]** direct payout and settlement process: [NCL securities settlement]; margin pledge requirement: [NSE margin FAQ]. |
| Unpaid purchased securities, CUSPA | **[unknown] (design)** purchase debt remains; record unpaid pledge separately from freely pledged collateral | Do not grant fresh exposure merely because unpaid shares exist | **[uncertain]** current master/FAQ margin-reporting language differs; see B7 transition table. **[verified]** future explicit no-exposure provision: [SEBI unpaid securities July 2026]. |

### B4. Futures, options and realised versus unrealised amounts

| Event | (i) Client ledger | (ii) Trading limit / available margin | (iii) Timing and evidence |
|---|---|---|---|
| Unrealised futures profit during day | **[unknown] (design)** display P&L separately; no settled-cash credit | Do not create freely spendable cash solely from unrealised gain | **[verified]** broker implementation: [Zerodha P&L display]; **[unknown]** universal treatment of every intraday CC offset. |
| Unrealised futures loss during day | **[unknown] (design)** running risk loss before final MTM posting | Reduce available risk capacity as loss/margin requirement rises | **[verified]** loss treatment in [Zerodha P&L display]; **[verified]** CC crystallised obligation mechanics: [NCL derivative margins]. |
| Position closed intraday, original margin released | **[unknown] (design)** realised P&L recorded separately from released collateral | Released original margin can be reused, subject to remaining obligations; profit is a separate unsettled amount | **[verified]** cross-segment reuse: [NSE margin FAQ], Q7; profit delay: [Geojit intraday profits]. |
| Futures daily MTM profit booked at EOD | **[unknown] (design)** credit settlement receivable, not cleared cash | Do not make unsettled profit unrestricted buying power merely because ledger is credited | **[verified]** daily MTM settles T+1: [NCL derivative settlement]; broker profit-use restriction: [Zerodha F&O profits]. |
| Futures MTM profit actually settled | **[unknown] (design)** convert receivable to settled funds | Increase eligible cash, subject to existing obligations/allocation | On T+1 settlement, not necessarily at next BOD: **[verified]** [NCL derivative settlement]. |
| Futures daily MTM loss | **[unknown] (design)** debit EOD payable, reflecting losses already reserved intraday | Reduce cash/limit; collect/pay according to settlement schedule | T+1 settlement: **[verified]** [NCL derivative settlement]. A pay-in deadline is not permission for fresh unsupported exposure. |
| Equity option premium paid | **[unknown] (design)** debit premium payable; reserve payment immediately | Purchase requires upfront premium funding; release only on cancellation/offset as applicable | **[verified]** net option premium obligation: [NCL derivative margins]; cash premium settlement T+1: [NCL derivative settlement]. |
| Equity option premium received | **[unknown] (design)** credit unsettled premium receivable; keep short-option margin blocked | Same-day reuse commonly limited to option buying in same segment/exchange; not unrestricted cash/futures/short-option margin | **[likely]** independent [Navia premium restriction] + [Fyers premium reuse]. **[unknown]** precise primary rule covering all cross-exchange cases. |
| Received premium settles | **[unknown] (design)** reclassify receivable to settled cash | May increase cash margin subject to continuing short-option obligation | T+1: **[verified]** [NCL derivative settlement]. |
| Option expires worthless | **[unknown] (design)** no second premium debit/refund: original premium already booked; settle residual fees and obligations | Release expired-position margin after final risk/settlement processing | **[verified]** option settlement structure: [NCL derivative settlement]. The no-second-premium entry is accounting inference, not a prescribed journal format. |
| Cash-settled option expires in the money | **[unknown] (design)** separate final exercise receivable/payable; separate exercise STT on liable long | Loss/payable constrains limit; receivable becomes free cash on settlement, not simply expiry mark | Final cash settlement T+1: **[verified]** [NCL derivative settlement]; STT: [STT 2026 circular]. |
| Stock option / stock future physical expiry | **[unknown] (design)** delivery funds/securities obligation replaces a simple cash-only expiry assumption | Reserve delivery funding/securities and applicable margins | **[verified]** physical settlement described in [NCL derivative settlement], [NCL STT]. **[unknown]** complete expiry-by-contract delivery-margin ladder in this charges note. |
| Commodity futures MTM | **[unknown] (design)** daily receivable/payable; receipt into member bank is separate from allocation to client margin | Profit is not automatically usable collateral merely because member receives funds | **[verified]** [MCXCCL FAQ]; settlement on T+1 banking day and separate collateral funding process. |
| Commodity option premium / expiry | **[unknown] (design)** premium receivable/payable; no daily option MTM; expiry may devolve into futures under contract specification | Reserve premium and devolvement/delivery obligations | **[verified]** [MCXCCL FAQ]. **[unknown]** exact timing for each MCX option-in-goods, energy and deliverable contract. |

### B5. Charges, corporate actions and failed funding

| Event | (i) Client ledger | (ii) Trading limit / available margin | (iii) Timing and evidence |
|---|---|---|---|
| Brokerage/taxes/transaction charges posted EOD | **[unknown] (design)** debit actual calculated charges, reconciling earlier estimates | Reduce cash/limit; release estimate and replace with actual only once | EOD if that is chosen posting policy; **[unknown]** universal requirement for this precise instant. **[verified]** broker EOD charges can reduce payout: [Zerodha payout adjustments]. |
| DP debit / AMC / pledge fee billed | **[unknown] (design)** debit only under authorised DP/client billing arrangement, or keep separate DP receivable | Reduce trading cash when actually debited to authorised trading ledger; fee does not itself change security collateral value | **[unknown]** universal same-day/next-BOD billing cycle; tariff and DP batch govern. **[verified]** separate tariff relationship: [NSDL participant charges]. |
| Debit-balance interest accrual | **[unknown] (design)** accrue daily expense/payable, post agreed billing journal without duplicate accrual | Reduce available net cash as obligation accrues | **[verified]** disclosed rate/period required: [Broker master], §23.4.4. **[unknown]** proposed daily/monthly posting schedule. |
| MTF interest | **[unknown] (design)** debit MTF interest subledger; separately reconcile any payment from ordinary cash ledger | Reduces MTF equity/funding headroom; does not turn funded stock into free collateral | **[verified]** MTF separation: [NSE MTF FAQ]. **[unknown]** proposed billing and cash-sweep timing. |
| Exchange penalty assessed, broker must bear it | **[unknown] (design)** broker expense/payable; no client debit | No client limit reduction solely for the broker's expense | **[verified]** pass-on restrictions/exceptions in [NCL inspection FAQ]. **[unknown]** universal assessment-to-posting batch. |
| Margin-shortfall penalty, valid client-caused recovery | **[unknown] (design)** debit actual supported client recovery, keeping authority debit and evidence linked | Reduce limit; if it creates debit, reassess risk | On actual assessment/allocation under disclosed policy; **[verified]** pass-on conditions [NCL inspection FAQ]. Never book a forecast as a statutory final penalty. |
| Dividend | **[verified]** normally paid to registered bank; no automatic broker trading-ledger credit | No trading-limit addition until money is actually transferred/reconciled as eligible client funding | **[verified]** provider explanation [Zerodha dividend]. **[unknown]** issuer-specific payment date or failed-bank route. |
| Bonus shares | **[unknown] (design)** increase securities quantity when credited; no cash-ledger credit | No new cash; eligible collateral only after actual credit and required pledge/CC recognition | **[verified]** security-credit nature [Zerodha bonus]. **[unknown]** CA-specific pledge propagation/timing; do not assume announcement date creates margin. |
| Stock split | **[unknown] (design)** adjust quantity/face value/security identifiers as actual CA completes; no cash receipt | Revalue eligible pledged holding consistently; split alone creates no economic surplus | **[verified]** quantity/price adjustment: [Fyers corporate actions]. **[unknown]** broker/depository reconciliation batch. |
| Cash for fractional entitlement | **[unknown] (design)** recognise only confirmed cash receipt in the appropriate bank/account | No margin merely from expected fractional proceeds | **[verified]** fractional settlement example [Zerodha bonus]. **[unknown]** universal issuer timing. |
| Tender buyback consideration | **[verified]** inspected 2026 offer provides direct CC payment to tendering holder's bank; not inherently a broker cash-ledger credit | No broker limit from expected tender acceptance; count only actual eligible funding received | **[verified]** [Matrimony buyback January 2026]. **[unknown]** every buyback's payment route, failed-bank fallback, deductions and schedule: use that offer's document. |
| Cheque dishonoured after provisional limit | **[unknown] (design)** reverse linked provisional receipt/collection entry, not trade obligations; debit permitted bounce fee separately | Remove provisional eligibility immediately on confirmed dishonour; recompute shortfall and exposure | **[verified]** revise margin reporting; dishonoured cheque cannot remain collected margin: [NSE margin FAQ], Q16. **[verified]** client-caused upfront-penalty exception [NCL inspection FAQ]. |
| Unsettled receivable outside a verified exception | **[unknown] (design)** record receivable without treating it as cash | No unconditional limit merely because accounting recognises a receivable | **[unknown]** general permission; specific EPI, same-segment premium and conditional payment cases must be tested individually. |
| Promise to pay / screenshot / unreceived ordinary bank transfer | **[unknown] (design)** no confirmed receipt; memorandum only | No fictitious collected client margin | **[verified]** uncollected margin reported as collected is false reporting: [NSE margin FAQ], Q19. Own-capital funding is a separate, constrained question, not evidence of client receipt. |

### B6. General principles: which credits may create limit immediately?

| Principle | Operative distinction / limit effect | Timing / evidence |
|---|---|---|
| Confirmed received funds | **[unknown] (design)** eligible, reconciled client cash can increase limit after applicable allocation and reservations; unrelated/unidentified funds cannot simply be mapped by amount | **[verified]** client collateral allocation and segregation: [NCL collateral segregation]; third-party irregularity: [NSE inspection irregularities]. **[unknown]** universal bank-event-to-RMS SLA. |
| Exposure against unrealised gain | Unrealised P&L is not settled client cash; do not equate a positive mark with collected margin | **[verified]** CC obligation netting mechanics: [NCL derivative margins]; **[verified]** retail implementation restricts positive unsettled P&L [Zerodha F&O profits]. **[unknown]** exhaustive primary prohibition wording covering every product/netting case. |
| Realised profit versus released original margin | Original margin can become reusable when obligations fall; newly realised profit can remain unsettled | **[likely]** industry practice supported independently by [Zerodha F&O profits] and [Geojit intraday profits]; clearing T+1 cycle **[verified]** [NCL derivative settlement]. |
| Eligible EPI proceeds | Sale-value ledger credit plus accepted depository EPI permits up to 100% reuse under the cited rule | **[verified]** [NSE margin FAQ], Q5; it does not accelerate bank payout or remove new trade obligations. |
| Non-cash collateral | Only eligible, validly pledged collateral after haircut; not its unhaircut market value, and not free cash for withdrawing or paying every settlement obligation | **[verified]** [NCL liquid assets]. **[unknown]** proposed broker's tighter approved list/concentration limits. |
| Cash-equivalent ratio | At least **50%** of relevant collateral must be cash/cash-equivalent under NCL participant monitoring; another client's excess cash cannot satisfy a client's deficit | **[verified]** [NCL collateral segregation], section B. |
| Proprietary cash backing | Participant's excess proprietary cash-equivalent collateral may support client cash-component needs under NCL rules; this is not a right to use another client's funds | **[verified]** [NCL collateral segregation]. **[unknown]** proposed broker's permission, pricing and funding policy; do not label such support client cash received. |
| Cash-equivalent is an eligibility class | Cash-equivalent assets are those accepted/classified by CC, with applicable haircuts; not every bond, fund or deposit qualifies | **[verified]** [NCL liquid assets]. **[unknown]** current ISIN-level list and broker-level acceptance. |
| Bank guarantees / fixed deposits | CC collateral eligibility does not itself authorise ordinary retail clients to furnish every BG/FD type; newer client-fund upstreaming restrictions must be applied | **[verified]** restrictions/qualifications in [NCL inspection FAQ]. **[unknown]** complete non-individual commodity exceptions for proposed client set. |
| Funds not yet received | Gateway-backed immediate credit and conditional cheque-reporting rules are specific cases; they do not authorise general uncollateralised client exposure or false margin reporting | **[verified]** provider example [Zerodha withdrawal rejection]; cheque/reporting conditions [NSE margin FAQ]. **[unknown]** legal/contractual approval for proposed gateway credit bridge. |
| MTM/premium collection windows | Cash/equity F&O/currency consolidated crystallised obligations: T+1 client-collection rule; commodity MTM: T+2 in cited reporting FAQ | **[verified]** [NSE margin FAQ], Q18, reflecting April 2025 amendment. Distinguish CC settlement due date from client penalty/reporting deadline. |
| Commodity cash settlement versus collection grace | MCXCCL daily MTM/premium cash settlement is T+1 banking day; a T+2 client-collection test does not postpone the CM's T+1 pay-in | **[verified]** [MCXCCL FAQ], [MCXCCL client margin reporting]. |
| No double counting | **[unknown] (design)** do not count the same money as free cash plus pending payout, sold stock as collateral plus EPI proceeds, or released margin plus its unsettled profit | Derived operational control; reconcile order, ledger, collateral and CC allocations independently. |
| MTF separation | Excess MTF collateral is not automatically available for non-MTF positions; funded stock has its own pledge/ledger regime | **[verified]** [NSE MTF FAQ], [NSE margin FAQ], Q11. |
| Reporting does not equal fresh exposure permission | CUSPA treatment is a concrete example: reporting eligibility and permission to grant additional exposure differ | **[verified]** explicit future rule [SEBI unpaid securities July 2026]; current conflict/limited reporting accommodation below. |
| BOD is not a blanket entitlement | **[unknown] (design)** persist eligibility state and actual settlement confirmation across days; do not release every pending credit merely because date changed | **[verified]** settlement depends on CC schedules: [NCL derivative settlement], [NCL securities settlement]. |

### B7. Debit ageing, liquidation and the 2026 CUSPA transition

| Event / rule set | (i) Ledger effect | (ii) Limit / securities effect | (iii) Timing, status and evidence |
|---|---|---|---|
| Debit balance ages past broker's permitted deadline | **[unknown] (design)** debt remains; accrue disclosed charges, do not erase it on liquidation request | Restrict new exposure; liquidate permitted positions/securities under applicable specific rules and communicated policy | **[verified]** broker risk policy covers liquidation and dues: [Broker master], §23.4. **[unknown]** no one universal “all debits must be liquidated on day X” rule verified. |
| Unpaid delivery purchase, rules applicable on 15 October 2026 | **[unknown] (design)** debt and CUSPA pledge tracked separately | Sell unpaid securities within five trading days after payout if unpaid; notify client one trading day before sale; account for sale P&L to client | **[verified]** [Broker master], §§46.1.4–46.1.6; newer replacement has deferred effect. This is not five days from trade date. |
| Sale executed for recovery | **[unknown] (design)** sale receivable reduces net debt; charges remain separate; final cash at settlement | Remove sold collateral immediately; don't grant duplicate limit on stale pledged value | **[verified]** sale in client's code and client P&L treatment [Broker master], §46.1.6; receivable posting is design. |
| Payment before liquidation | **[unknown] (design)** credit confirmed receipt against debt | Release unpaid pledge as required; normal margin still needs a valid eligible pledge | **[verified]** [Broker master], §46.1.4. **[unknown]** depository release completion SLA. |
| Current CUSPA margin-reporting conflict | No new cash is created | Master §46.1.10 says unpaid pledge not for margin obligations; current NSE FAQ allows haircut-adjusted CUSPA reporting only against debit from those purchases | **[uncertain]** scope reconciliation pending: [Broker master] versus [NSE margin FAQ], Q3. Do not treat either as authority to create fresh exposure. |
| July 2026 final circular — notification | New unpaid-securities framework is final, not a consultation | Includes no fresh exposure on CUSPA, revised release/invocation process and exceptional extensions | **[verified]** notified **3 July 2026**: [SEBI unpaid securities July 2026]. |
| Main replacement provisions | Policy deadline ≤five trading days after payout; reasonable pre-liquidation notice; surplus returned to client; auto-release at end of sixth trading day where conditions apply | CUSPA may support margin reporting, **not exposure** | **[verified]** final provisions; effective **31 October 2026**, explicitly in [NSE unpaid securities July 2026]. **Not yet effective on this research date.** |
| New daily excess-pledge release | **[unknown] (design)** no cash credit just from pledge release | New maximum pledge-value formula: 2.25 × (EOD margin obligation − aggregate clear non-MTF ledger balance), with prescribed handling of excess quantity | **[verified]** [NSE unpaid securities July 2026], guideline 6; release excess by next trading day; **effective 31 October 2026**. Do not use for 15 October production calculations. |
| Exceptional extension | No automatic debt forgiveness or cash credit | Specified illiquidity/halt/beyond-control cases permit extension requests; not routine indefinite credit | **[verified]** [SEBI unpaid securities July 2026]; extension provisions effective **3 January 2027**, confirmed by [NSE unpaid securities July 2026]. |
| Older consultation papers | No operative ledger/limit effect | Neither April unpaid-securities nor May commodity-position proposals are implementation authority by themselves | **[verified]** final instruments are [SEBI unpaid securities July 2026] and [SEBI commodity position September 2026]; use final effective dates. |

### Source URLs

| Source handling | Evidence convention |
|---|---|
| Primary regulator/exchange/depository URLs | **[verified]** only for the specific inspected content cited in tables; stale passages and deferred provisions are separately flagged. |
| Broker support / tariff URLs | **[verified]** for the provider's own advertised policy; **[likely]** only where two independent providers support an industry-level assertion; never a substitute for a missing universal regulatory rule. |
| Mirrors | **[uncertain]** by default for currentness; an identifiable circular reproduced by a mirror is described as such. MCX rates have two independent secondary confirmations and remain **[likely]**, not primary-authenticated. |

[NSE brokerage limits]: https://nsearchives.nseindia.com/content/members/mem_comp_annexC.pdf
[Broker master]: https://www.sebi.gov.in/sebi_data/attachdocs/jun-2025/1750158789381.pdf
[MCX compliance FAQ]: https://www.mcxindia.com/en/faq/compliance
[NSE actuals enforcement]: https://enit.nseindia.com/MemDirWeb/viewPdf?fileName=McOrder_14556_05092023.pdf&financialYear=2023-2024
[Order disclosure extension]: https://archives.nseindia.com/content/circulars/INSP55031.pdf
[STT 2026 circular]: https://nsearchives.nseindia.com/content/circulars/FATAX73524.pdf
[NSE statutory levies]: https://www.nseindia.com/static/invest/first-time-investor-sebi-turnover-fees-stt-other-levies
[NSE derivatives STT]: https://www.nseindia.com/static/products-services/equity-derivatives-securities-transaction-tax
[NCL STT]: https://www.nseclearing.in/clearing-settlement/equity-derivatives/securities-transaction-tax
[STT Rules]: https://www.sebi.gov.in/sebi_data/attachdocs/apr-2017/1492087548939.pdf
[MCXCCL CTT]: https://www.mcxccl.com/clearing-settlement/commodities-transaction-tax
[CTT Rules]: https://thc.nic.in/Central%20Governmental%20Rules/Income-Tax%20Rules%2C1962%20%28Part-D%29.pdf
[NSE fees March 2026]: https://nsearchives.nseindia.com/content/circulars/FA73061.pdf
[NSE fees October 2024]: https://nsearchives.nseindia.com/content/circulars/FA64232.pdf
[Zerodha exchange fees]: https://support.zerodha.com/category/account-opening/resident-individual/ri-charges/articles/exchange-transaction-charges
[Zerodha October revision]: https://zerodha.com/marketintel/bulletin/391488/revision-in-transactions-charges-from-1st-october-2024
[Dhan October revision]: https://madefortrade.in/t/impact-of-changes-in-transaction-charges-from-1st-october-2024/32384
[BSE notice mirror]: https://www.steelcitynettrade.com/Circulars/BSE-Revision%20in%20Transaction%20Charges%20in%20Equity%20Derivatives%20Segment.pdf
[Rupeezy tariff]: https://rupeezy.in/pricing
[MCX 2026 master mirror]: https://noticeblue.com/circulars/b1774ebe-0283-4d1a-8b0c-0141453dc861
[TeamLease MCX 2026]: https://teamleaseregtech.com/updates/article/55262/mcx-notified-regarding-the-master-circular-finance-accounts/
[Zerodha IPFT]: https://support.zerodha.com/category/account-opening/resident-individual/ri-charges/articles/ipft-charges
[Pinnacle April 2026 tariff]: https://www.pinnacletrades.com/pdf/Charges01.04.2026.pdf
[Stock Brokers Regulations 2026]: https://www.sebi.gov.in/sebi_data/attachdocs/jan-2026/1767852346757.pdf
[NSE stamp table]: https://www.nseindia.com/static/invest/first-time-investor-stamp-duty-charges-taxes
[CCIL stamp guidance]: https://www.ccilindia.com/en/tr-stamp-duty
[NCL stamp circular mirror]: https://www.rkglobal.net/upload/637292848417967564_CMPT43121%20%281%29.pdf
[Stamp rule 7]: https://indiankanoon.org/doc/138768632/
[CBIC sectoral FAQ]: https://cbic-gst.gov.in/sectoral-faq.html
[ICAI GST FAQ]: https://idtc-icai.s3.amazonaws.com/download/pdf18/FAQs_and_MCQs_on_GST_Sep18.pdf
[CDSL operating instructions]: https://www.cdslindia.com/downloads/DP/currentDPs/DP-Operating-Instructions-Chapters-as-on-March-31-2026.pdf
[NSDL July 2026 fees]: https://nsdl.com/nsdl/2026-07/Fees_and_Charges_to_Depository_Participants-updated.pdf
[NSDL participant charges]: https://nsdl.com/participant/charges
[BSDA June 2024]: https://www.sebi.gov.in/sebi_data/attachdocs/jun-2024/1719572630913.pdf
[BSDA December 2025]: https://www.sebi.gov.in/sebi_data/attachdocs/dec-2025/1766582690382.pdf
[SEBI DP charge prohibition]: https://www.sebi.gov.in/sebi_data/attachdocs/1292584770599.pdf
[SEBI DP closure charges]: https://www.sebi.gov.in/legal/circulars/nov-2005/review-of-dematerialisation-charges_8397.html
[Zerodha charges]: https://zerodha.com/charges/
[Kotak cheque charges]: https://www.kotaksecurities.com/support/what-are-the-charges-for-deposit-withdrawal-of-funds-through-a-cheque/
[Kite API FAQ]: https://support.zerodha.com/category/trading-and-markets/general-kite/kite-api/articles/kite-connect-api-faqs
[NSE data tariff]: https://www.nseindia.com/static/market-data/products-tariff
[Zerodha instant pledge]: https://zerodha.com/z-connect/kite/introducing-instant-pledging
[NSE MTF FAQ]: https://www.nseindia.com/static/trade/members-faqs-margin-trading-facility
[NSE F&O penalties]: https://www.nseindia.com/static/products-services/equity-derivatives-penalties
[NCL risk FAQ]: https://www.nseclearing.in/sites/default/files/2025-01/NCL%20-%20FAQ%20RISK%20MANAGEMENT.pdf
[MCXCCL client margin reporting]: https://www.mcxccl.com/clearing-settlement/client-margin-reporting
[MCXCCL FAQ]: https://www.mcxccl.com/clearing-settlement/faq
[NSE margin FAQ]: https://www.nseindia.com/static/trade/members-faqs-margin-collection-and-reporting
[NCL inspection FAQ]: https://www.nseclearing.in/sites/default/files/2026-01/FAQ_MEMBER_INSPECTION.pdf
[NCL internal shortages FAQ]: https://www.nseclearing.in/sites/default/files/2026-01/Internal_Shortages_and_Auction.pdf
[NCL settlement FAQ February 2026]: https://www.nseclearing.in/sites/default/files/2026-02/NCL%20SETTLEMENT.pdf
[NCL securities settlement]: https://www.nseclearing.in/clearing-settlement/capital-market/securities-settlement
[NCL currency position 2026]: https://nsearchives.nseindia.com/content/circulars/CD73007.pdf
[SEBI commodity position September 2026]: https://www.sebi.gov.in/sebi_data/attachdocs/oct-2026/1791806752815.pdf
[NSE RBS penalty 2026]: https://nsearchives.nseindia.com/content/circulars/INSP73795.pdf
[True to label]: https://www.sebi.gov.in/sebi_data/attachdocs/jul-2024/1719836553556.pdf
[NCL derivative settlement]: https://www.nseclearing.in/clearing-settlement/equity-derivatives/settlement-mechanism
[NCL derivative margins]: https://www.nseclearing.in/risk-management/equity-derivatives/margins
[NCL liquid assets]: https://www.nseclearing.in/risk-management/equity-derivatives/liquid-assets
[NCL collateral segregation]: https://archives.nseindia.com/content/circulars/CMPT52000.pdf
[Zerodha fund timeline]: https://support.zerodha.com/category/funds/adding-funds/fund-addition-timeline/articles/why-is-the-money-i-added-through-an-imps-neft-transfer-not-reflecting-in-my-trading-account
[Samco fund timeline]: https://www.samco.in/help-support/article/how-long-does-it-take-for-neft-imps-rtgs-upi-deposits-to-reflect-in-samco/
[Zerodha withdrawal rejection]: https://support.zerodha.com/category/funds/fund-withdrawal/withdrawal-rejection/articles/why-is-my-withdrawal-request-being-rejected
[Zerodha payout adjustments]: https://support.zerodha.com/category/funds/fund-withdrawal/withdrawal-process/articles/why-have-i-received-a-lower-amount-of-payout-than-what-i-requested
[NSE inspection irregularities]: https://www.nseindia.com/static/trade/common-irregularities-observed-during-inspection-by-sebi
[Zerodha F&O profits]: https://support.zerodha.com/category/trading-and-markets/margins/margin-leverage-and-product-and-order-types/articles/profits-from-fno
[Geojit intraday profits]: https://support.geojit.com/support/solutions/articles/89000007523-can-i-use-intraday-profits-to-take-new-positions-
[Zerodha P&L display]: https://support.zerodha.com/category/trading-and-markets/general-kite/kite-holdings/articles/kite-funds-page-profit
[Navia premium restriction]: https://support.navia.co.in/support/solutions/articles/1000311743-restriction-of-trading-using-options-premium
[Fyers premium reuse]: https://support.fyers.in/portal/en/kb/articles/why-can-t-i-always-reuse-the-option-premium-received
[Zerodha dividend]: https://support.zerodha.com/category/console/corporate-actions/dividends/articles/i-hold-stocks-of-a-company-that-issued-dividends-how-and-when-will-i-get-the-dividends
[Zerodha bonus]: https://support.zerodha.com/category/console/corporate-actions/bonus/articles/impact-of-bonus-issue-on-equity-futures-options
[Fyers corporate actions]: https://support.fyers.in/portal/en/kb/articles/how-do-bonuses-dividends-and-splits-impact-my-holdings
[Matrimony buyback January 2026]: https://nsearchives.nseindia.com/corporate/MATRIMONY_22012026155235_NSEPublicannouncement22Jan26.pdf
[SEBI unpaid securities July 2026]: https://www.sebi.gov.in/sebi_data/attachdocs/jul-2026/1783077132079.pdf
[NSE unpaid securities July 2026]: https://nsearchives.nseindia.com/content/circulars/INSP75508.pdf
[Depository master 2023]: https://nsdl.com/nsdl/circulars/2023-0145-Policy-SEBI_Master_Circular_for_Depositories_dated_October_06_2023.pdf
[Zerodha AMC]: https://support.zerodha.com/category/account-opening/resident-individual/ri-charges/articles/what-is-the-annual-maintenance-charge
[Zerodha interest]: https://support.zerodha.com/category/console/ledger/articles/interest-charges
[NSE client funds settlement]: https://www.nseindia.com/static/trade/members-faqs-actual-settlement-of-funds-and-securities

## Gaps and cautions

| Gap / caution | Evidence class and precise unresolved issue | Required closure before production use |
|---|---|---|
| Current BSE tariff | **[unknown]** authenticated current primary cash-group, currency, commodity, option-variant and IPF schedules; some rows are only **[likely]** or **[uncertain]** | Obtain BSE/ICCL current tariff and dated product exceptions; corroboration is not primary verification. |
| MCX primary transaction-fee PDF | **[likely]** 2026 master text and independent compliance reporting agree; primary PDF could not be retrieved | Authenticate the exchange original before final charge-master sign-off. |
| NSE commodity / new-product waivers | **[unknown]** complete current primary rates, IPFT and waiver dates | Obtain product-specific active tariff; do not infer a new product's fee from segment headline. |
| Clearing charges | **[unknown]** selected NCL/ICCL/MCXCCL and external CM rates, minimums, units, tax and rounding | Obtain executed clearing agreements and current CC invoices; do not configure nil by default. |
| Currency IPFT and bundled fees | **[likely]** two independent tariffs corroborate amounts; primary current split still missing | Confirm exchange/CC invoice; prevent exchange-plus-IPFT double billing. |
| Rounding | **[unknown]** client-level exchange, clearing, SEBI fee, DP and broker-service precision; STT netting/allocation edge cases | Obtain calculation specifications and reconcile sample contract notes/invoices to MII control totals. |
| Stamp rounding provenance | **[verified]** reproduced NCL circular/rule text, but primary-hosted consolidated collection-rule copy missing | Authenticate the statutory/current CC implementation text. |
| GST details | **[unknown]** penalty-recovery classification, unusual DP recoveries and proposed invoice rounding; primary section 170 text not independently captured | Obtain tax treatment by charge code; preserve Rule 33 conditions, not blanket exclusions. |
| Proposed broker commercial tariff | **[unknown]** prices and triggers for reactivation, alerts, failures, API/data, DP services, physical documents, subscription plans and funding | Approve the broker's actual tariff; provider examples must not become default facts. |
| Interest / funding | **[unknown]** universal cap and compounding rule, chosen MTF rate, cash-component financing price and gateway-credit authorisation | Set documented rate/base/day count, legal funding basis and client disclosures. |
| Penalty schedules | **[unknown]** every BSE/MCX pass-on exception, newer index-monitoring penalty, report-specific late penalty and market-move waiver | Match cause, product, assessment date and circular before debiting a client. |
| Auctions / close-out | **[unknown]** all ETF, bond, corporate-action, special-series and physical-derivative exceptions, and all client allocation rules | Use actual CC assessment and relevant contract/settlement rules; 20% is not a universal penalty. |
| Brokerage cap coverage | **[unknown]** independently authenticated current BSE ceiling and subscription-plan ceiling allocation | Confirm exchange/product rule; do not extrapolate equity ceiling to MCX. |
| CUSPA current reporting conflict | **[uncertain]** master §46.1.10 versus limited current NSE FAQ accommodation | Obtain written exchange clarification for pre-31-October reporting; never infer extra exposure. |
| CUSPA transition | **[verified]** main new provisions start 31 October 2026; extensions start 3 January 2027 | Version rules by effective date; July notification is not July commencement. |
| Payment and payout timestamps | **[unknown]** universal immediate/BOD software posting and provider SLAs | Finalise bank/gateway callbacks, reconciliation, reservations, reversals and cutoffs; matrix design choices are not legal mandates. |
| Uncleared funds | **[unknown]** blanket permission to grant limit before receipt | Apply only evidenced cheque/gateway/eligible-collateral exceptions with actual margin backing; do not claim all uncleared funds are either universally permitted or universally prohibited. |
| Option-premium reuse | **[likely]** same-segment/exchange restriction supported by two providers; full primary cross-exchange rule not captured | Confirm CC/exchange scope before enabling cross-product reuse. |
| Corporate actions | **[unknown]** universal bonus/split pledge propagation, buyback payout route, issuer dates and failed-bank handling | Use issuer/CC/depository event instructions; announcement and ex-date alone are not broker cash credits. |
| Physical commodities | **[unknown]** location/contract-specific warehouse, assaying, logistics, delivery and goods-tax schedule | Obtain contract and service tariffs; derivative CTT/GST table is not an all-in delivery estimate. |
| Depository edge cases | **[unknown]** NSDL demat fee, failed-instruction schedules, youth-plan current eligibility window, ordinary CDSL invocation fee, AMC-refund GST handling and complete debit exemptions | Obtain current DP/depository tariff and applicable circulars; do not treat omissions as nil. |
| Stale source text | **[verified]** inspected sources contain old rate/timing prose alongside newer tables; provider pages can also mix old and new charges | Prefer dated final primary circulars; preserve sourced conflicts rather than silently choosing convenient numbers. |
| Research limitations | **[unknown]** absence of a later amendment cannot be proven by search alone | Research used substantially more than 20 web queries; recheck effective schedules at deployment and retain authenticated source versions. |



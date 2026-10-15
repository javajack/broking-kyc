# MTF and pledge / re-pledge operations — research as of 2026-10-15

| Reading convention | Meaning |
|---|---|
| Cutoff and purpose | Research cutoff **15 October 2026**; source material for a greenfield Indian broker's operations manual. Later effective dates are retained as implementation obligations, not represented as rules already effective. |
| `[verified]` | The linked primary document supports the statement. A dated historical rule or proposal is verified **only in the status stated**. Reference links resolve directly to source URLs. |
| `[likely]` | Requires two independent, named secondary sources. No operational rule below depends on this class. |
| `[uncertain]` | Single secondary source, unresolved source conflict, or explicitly identified inference. |
| `[unknown]` | Not established by the material retrieved; must not be promoted into a production rule. |
| Instructions / design suggestions | Explicitly identified recommendations are not additional regulatory requirements. State names in the lifecycle table are descriptive, not invented depository status codes. |
| Terminology | `[verified]` TM = trading member; CM = clearing member; CC = clearing corporation; DP = depository participant; BO = beneficial owner; UCC = unique client code; EPI = early pay-in. [Broker master][S01], [NCL settlement FAQ][S15]. |

## PART A — MARGIN TRADING FACILITY

### A1. Governing instruments and effective dates

| Instrument: exact identifier | Notified / issued | Status at cutoff and subject | Evidence |
|---|---|---|---|
| CIR/MRD/DP/54/2017 | 13 June 2017 | Comprehensive MTF framework; baseline subsequently amended and consolidated. Superseded the earlier 2004/2005 MTF circulars. | [verified] [SEBI original][S02], §§11–31. |
| CIR/MRD/DP/86/2017 | 1 August 2017 | Expanded permitted funding to commercial paper and unsecured long-term promoter/director loans. | [verified] [SEBI clarification][S03]. |
| SEBI/HO/MRD/MRD-PoD-3/P/CIR/2022/166 | 30 November 2022 | Group I equity ETFs admitted as funded securities and collateral; effective from the thirtieth day after issuance. | [verified] [SEBI ETF circular][S04]. |
| SEBI/HO/MIRSD/DOP/CIR/P/2020/28 | 25 February 2020 | Foundational margin pledge/re-pledge framework; funded stock held through pledge to a distinct funding account. Read with later amendments, not its original rollout timetable. | [verified] [Broker master][S01], §42 and source footnotes; [NSE FAQ][S10], Q16. |
| SEBI/HO/MRD/MRD-PoD-3/P/CIR/2024/65 | 29 May 2024 | CC collateral eligibility, haircuts and concentration rules; distinct from the MTF loan-book diversification rule. | [verified] [SEBI CC collateral circular][S35]. |
| SEBI/HO/MRD/MRD-PoD-2/P/CIR/2024/118 | 11 September 2024 | **Effective 1 October 2024**: cash-funded maintenance-margin mechanism; VaR + 5 ELM overlay; MTF reporting by T+1 18:00. | [verified] [SEBI amendment][S05], §§3–8. |
| NSE/COMP/63876 | 11 September 2024 | Defines MTF exposure and actual borrowing for the funding ceiling. | [verified] [NSE clarification][S11]. |
| SEBI/HO/MRD-PoD2/CIR/P/2024/00181 | 30 December 2024 | SECC master; effective on issue. **Chapter 1 §4** contains MTF provisions. | [verified] [Cover circular][S06], [Trading chapter][S07]. |
| SEBI/HO/MIRSD/MIRSD-PoD/P/CIR/2025/90 | **17 June 2025** | Broker master: §39 MTF; §42 pledge; §43 client collateral segregation; §46 CUSPA. Later amendments must be overlaid. | [verified] [SEBI broker master][S01]. |
| SEBI/HO/MRD/MRD-PoD-2/P/CIR/2025/120 | 26 August 2025 | **Immediate**: revised half-yearly MTF net-worth certificate submission dates. | [verified] [SEBI amendment][S08]. |
| SEBI/LAD-NRO/GN/2026/291 | **7 January 2026** Gazette notification | Stock Brokers Regulations, 2026: effective on Gazette publication; reg.51 repeals the 1992 regulations with savings. SEBI website publication is dated 8 January; that is not the notification date. | [verified] [Gazette][S09], regs.1, 51. |
| Consultation Paper on Review of MTF Framework | 18 June 2026 | **Proposal**, not an operative circular. No final adoption instrument was located in this research. Do not activate proposed changes merely because the consultation closed. | [verified] proposal [S13]; [unknown] final disposition after consultation. |
| RBI/2025-26/254; DOR.CRE.REC.446/07-01-001/2025-26 | 30 March 2026 | Revised Commercial Banks—Credit Facilities Amendment Directions, 2026; **effective 1 July 2026**, or earlier bank adoption of the whole package; replaces the February 2026 version. Material to bank funding of brokers. | [verified] [RBI revised directions][S14], introductory provisions and §219ZB. |

### A2. Permission, eligibility, eligible securities and withdrawal from eligibility

| Question | Established rule / operational implication | Evidence |
|---|---|---|
| Who can offer MTF? | Corporate stockbroker; MTF minimum net worth **₹3 crore**. This is the MTF threshold, not a substitute for membership/clearing capital requirements. Proposed LLP eligibility and ₹5 crore threshold must not be applied as existing MTF rules. | [verified] [2017 framework][S02], §11; [2026 proposal][S13]. |
| Net-worth computation | MTF texts refer to the regulatory net-worth definition, not paid-up capital or cash balance. Older texts still name the 1992 regulations; the 2026 recast is real. Exact current exchange certification computation/template must be checked against the applicable membership category. | [verified] [SECC §4.5][S07], [2026 regs][S09]; [unknown] definitive 2026 MTF-specific replacement computation template. |
| Permission or intimation? | **Prior exchange permission**, for the exchange where MTF is offered. NSE requires application through ENIT New Compliance, certified board resolution and auditor's net-worth certificate. An informal commencement intimation is insufficient. | [verified] [2017 §30][S02], [NSE Q1–3][S10]. |
| NSE and BSE | Obtain approval for each relevant venue; NSE approval is not evidence of BSE approval. BSE's current approval form/module was not independently retrieved. | [verified] exchange-specific permission [S02]; [unknown] BSE application workflow. |
| Client eligibility / opt-in | Due diligence before extending credit; written or irrefutable electronic client consent; communicate MTF rights/obligations and terms. One UCC per client/member, separate MTF and normal books. | [verified] [2017 §§24,27][S02], [NSE Q4–5][S10]. |
| Instruments | **Group I equity shares and Group I equity ETFs**. This MTF framework does not authorize funding equity F&O, currency or commodity derivative positions. Securities margin pledges may separately support permitted derivative collateral. | [verified] [ETF circular][S04], [SECC §4.2][S07]; scope inference from the specified eligible instruments. |
| Group I list | Use the exchange's current monthly classification. NSE FAQ identifies the report **“CM-Security Catergory Impact Cost”** and CATG record type 20, containing symbol, series, ISIN, next-month category and impact cost; category 1 in EQ is eligible. The report title's spelling is the exchange's. | [verified] [NSE Q9][S10], referencing NCL/CMPT/46880, 1 January 2021. |
| Classification versus collateral acceptance | Group I MTF eligibility and a CC's approved collateral list are **separate tests**; CC acceptance was tightened by the May 2024 circular. Passing Group I alone does not prove CC collateral eligibility. | [verified] [SEBI CC rules][S35], [MTF eligibility][S04]. |
| Existing **collateral** leaves Group I | Replace it with eligible collateral from the applicable month; do not keep assigning its former eligibility value indefinitely. | [verified] [NSE Q10][S10]. |
| Funded stock moves to trade-for-trade | No fresh MTF; existing funded positions liquidated within **30 days**, under the cited NSE 2004 operational circular. | [verified] **NSE/CMO/0131/2004**, download NSE/CMTR/5420, **9 September 2004** [S12]. |
| Funded stock faces suspension | Start liquidation on the suspension notice and complete before suspension takes effect; no fresh MTF for the affected security. | [verified] [NSE 2004 circular][S12]. |
| Simple Group I removal, without T2T/suspension | NSE FAQ refers funded positions to the above 2004 circular, whose operative text specifically describes T2T/suspension. A universal current “30 days after any removal” rule was not verified. The 2026 consultation expressly proposes a 30-day rebalance rule. | [verified] source cross-reference [S10], [S12]; [unknown] universal clock; [verified] proposal only [S13]. |
| Withdrawal of facility | NSE withdrawal application includes board resolution; open positions must first be liquidated and reported. Reporting continues until withdrawal. | [verified] [NSE Q3,23][S10]. |

### A3. Exact borrowing, exposure and concentration limits

| Measure | Formula / exact limit | Scope and caution | Evidence |
|---|---|---|---|
| MTF indebtedness | **B ≤ 5 × N** | N = regulatory net worth; B = outstanding MTF borrowing, aggregating permitted sources. | [verified] [2017 §16][S02]. |
| Broker MTF exposure | **E ≤ B + 0.50 × N**, also subject to lower self-imposed prudential limits | B means actual borrowing, not sanctioned credit lines. Consequently **5.5 × N** is only the derived outer ceiling when B reaches 5 × N; it is not always the available funding capacity. | [verified] [NSE/COMP/63876][S11]; arithmetic derived from [S02]. |
| Exposure definition | Aggregate outstanding MTF amount **less client cash actually used for that same client's pay-in** | Merely receiving cash does not establish the deduction; avoid deducting it twice. | [verified] [NSE clarification][S11]. |
| Per-client exposure | **≤10% of the broker's maximum allowable MTF exposure** | Denominator is maximum allowable exposure, not actual deployed MTF book. | [verified] [2017 §18(a)][S02]. |
| Single-security funding concentration | **No fixed percentage in the cited MTF diversification provision** | Funded securities and collateral must be well diversified under a **board-approved policy**. A universal numeric issuer cap was not established. | [verified] [SECC §4.7.3.2][S07]; [unknown] any additional current exchange-specific percentage. |
| Issuer-group / client-group cap | No separate fixed MTF percentage or aggregation formula verified | Do not mislabel the 10% **single-client** rule as a group cap. Specify internal connected-client/group limits as broker risk policy. | [unknown] universal group cap; [verified] actual single-client/diversification provisions [S02], [S07]. |
| CC concentration limits | Apply independently to collateral accepted at the CC | CC issuer/bank/group concentration constraints do not become broker MTF loan-book caps. CCs cannot accept specified collateral issued by the TM/CM itself or its group/associates. | [verified] [SEBI CC collateral circular][S35]. |
| Worked check | N = ₹10 crore, B = ₹20 crore ⇒ exposure ceiling ₹25 crore; single-client ceiling ₹2.5 crore; borrowing ceiling ₹50 crore | Arithmetic illustration only, assuming no tighter prudential cap. | [verified] calculation from [S02], [S11]. |

### A4. Margin, valuation and reuse

| Topic | Rule / implementation consequence | Evidence |
|---|---|---|
| Initial margin: Group I F&O-eligible shares | **VaR + 3 × ELM**, using the applicable **cash-segment** VaR and ELM. | [verified] [SECC §4.3.1][S07]. |
| Initial margin: other Group I shares / equity ETFs | **VaR + 5 × ELM**. These are variable security margins, not a universal fixed leverage offer. | [verified] [ETF circular][S04], [SECC §4.3.1][S07]. |
| Cash-market floor | NSE requires the higher of the applicable MTF margin and **20% of transaction value**; stricter broker/exchange requirements may apply. | [verified] [NSE Q27][S10]. |
| Forms | Broker master expressly permits cash, cash equivalents, Group I equity shares and Group I equity ETFs, with appropriate haircuts. SECC §4.3.2 instead says cash, cash equivalents or equity shares and cross-refers the liquid-assets framework. | [verified] wording difference: [Broker §39.2.2][S01], [SECC §4.3.2][S07]. |
| Form-selection recommendation | Accept only the overlap clearly supported by the MTF instruments and applicable haircuts pending resolution of wording differences. Do not infer that every CC-eligible bond/MF unit is eligible MTF initial collateral. | [uncertain] conservative implementation interpretation of [S01], [S07], [S35]. |
| Haircut source | Equity ETF MTF collateral follows the haircut treatment of liquid Group I equities. Use the applicable SEBI/exchange risk framework and dated security files, not a universal guessed haircut. | [verified] [ETF circular][S04]. |
| Daily valuation | Mark both collateral and funded stock to market daily; maintain required margin continuously and call shortfalls. Keep funded and collateral securities separately identifiable for funding computation. | [verified] [2017 §§5–8][S02], as amended by [S05]. |
| Maintenance calculation | NSE FAQ applies maintenance-margin percentage to the **lower of funded cost or market value**, with MTM loss separately required when market value falls below cost. | [verified] [NSE Q7][S10]. |
| Cash-funded maintenance exception | Client cash actually used for that client's CC pay-in may be represented for maintenance margin by the corresponding received, pledged funded securities. Applicable margin is **VaR + 5 ELM even for F&O shares**. This does not permit treating the entire funded book as free collateral. | [verified] [2024/118 §§3–4][S05]. |
| Appreciation | Additional exposure may follow increased collateral value after haircuts; **appreciation of funded stock cannot support additional exposure**. | [verified] [2017 §5][S02]. |
| Can MTF collateral be re-pledged? | **Yes:** securities supplied as MTF **margin collateral** may be re-pledged to CM/CC. Keep separate MTF allocation/books even if the same margin-pledge account also serves normal trades. | [verified] [NSE Q25–26][S10]. |
| Can funded shares be reused? | Funded shares belong in the funding pledge arrangement. They are not available for onward pledge to banks/NBFCs. Do not apply the permission for MTF **margin collateral** to MTF **funded stock**. | [verified] [NSE Q16][S10], [Broker §42.9][S01]. |
| Other clients / normal account | Client collateral is attributable to that client. NSE FAQ disallows counting excess MTF collateral towards that client's non-MTF margin; transfer of genuinely free normal collateral into MTF is conditional, not unrestricted double use. | [verified] [NSE Q8][S10], [SEBI segregation][S36]. |
| MTM form inconsistency | NSE Q7 allows cash/non-cash for MTM, while Q15's ledger description says MTM maintained in cash. Do not silently equate client MTF MTM support with cash settlement obligations to a CC. Obtain exchange clarification before permitting non-cash MTM operationally. | [verified] conflicting FAQ wording [S10]; [unknown] authoritative reconciliation. |

### A5. Broker funding sources and the 2026 bank overlay

| Source / issue | Treatment | Evidence |
|---|---|---|
| Own funds | Permitted. | [verified] [2017 framework][S02], §14 as amended. |
| Scheduled commercial banks | Permitted, subject also to bank lending directions and facility conditions. | [verified] [2017 framework][S02], [RBI directions][S14]. |
| RBI-regulated NBFCs | Permitted borrowing source; do not transfer/re-pledge clients' funded securities to the lender. | [verified] [2017 framework][S02], [NSE Q16][S10]. |
| Commercial paper | Permitted subject to RBI requirements. This is express permission for CP, not blanket permission for every debt instrument. | [verified] [August 2017 clarification][S03]. |
| Promoters / directors | **Unsecured long-term loans**, subject to applicable Companies Act provisions. | [verified] [August 2017 clarification][S03]. |
| NCDs / other debt | Not in the closed funding list retrieved. June 2026 consultation proposes adding NCDs/other debt. **Do not mark NCD-funded MTF as authorized solely from that proposal.** | [verified] existing list [S03], proposal [S13]; [unknown] subsequent enabling final instrument. |
| Client funds | Cannot finance another client's MTF even with the first client's consent. Same-client margin cash used for that client's pay-in is the specific permitted mechanism, not a client-fund borrowing pool. | [verified] [2017 §15][S02], [2024/118][S05]. |
| RBI bank-to-broker MTF security | Under §219ZB(2), bank MTF facilities must be fully secured by cash, cash equivalents and government securities including T-bills; **at least 50% of collateral in cash**. Distinct from clearing's cash/cash-equivalent ratio. | [verified] [RBI revised directions][S14]. |
| RBI transition | New/renewed facilities after implementation follow the revised directions; qualifying existing loans/guarantees continue under earlier terms until maturity. Effective 1 July 2026 unless the bank adopted the complete package earlier. | [verified] [RBI introductory transition provisions][S14]. |
| Treasury controls | Maintain separate records of MTF funds used and their sources; aggregate borrowing and exposure continuously rather than checking only at month-end. | [verified] recordkeeping and “at any point” limits [S02], §§16–18,25. |

### A6. Accounts, demat location and daily operating sequence

| Stage / question | Required distinction or process | Evidence |
|---|---|---|
| Exact funded-stock account name | **Client Securities under Margin Funding Account**. “Client Securities Margin Funded Account” is not the prescribed name. NCL abbreviates the funding account as **CSMFA**. | [verified] [Broker §42.9][S01], [NCL direct payout][S16]. |
| Margin collateral account | **Client Securities Margin Pledge Account** for TM/CM; this is separate from the funding pledgee account. | [verified] [Broker §42.4][S01]. |
| Where funded shares reside | Client's demat, pledged in favour of the designated funding account. Direct payout is followed by **auto-pledge without a specific client instruction**. | [verified] [NCL Q43][S15], [Broker §42.9][S01]. |
| Must client demat be with broker's own DP? | No such universal rule was found. CDSL permits pledgor and pledgee at different DPs **within CDSL**. Direct payout uses the verified primary demat mapped to UCC. Same **depository** is not same **DP**. | [verified] CDSL mechanics [S20], §8.5; primary demat [S15], Q45; [unknown] any venue/member-specific additional restriction. |
| Two-depository servicing | A pledge cannot bridge CDSL and NSDL directly; provide appropriate pledgee accounts in the relevant depository. NCL expressly requires CUSPA accounts where client accounts exist. Confirm CSMFA mappings in the production setup. | [verified] [CDSL §8.5][S20], [NCL][S16]; [uncertain] CSMFA mapping inference pending current onboarding specification. |
| Fresh MTF creation | Client opt-in → eligibility/credit checks → collect applicable initial margin → trade → book funded/collateral ledgers separately → report funded quantity for CC direct payout → confirm auto-pledge → ongoing margins/interest/reporting. | [verified] regulatory stages [S02], [S05], [S15]; sequence is an operational synthesis, not an exchange API specification. |
| Cash trade → MTF | NSE permits identification **by T+1**; MTF margin must exist on identification date. Normal upfront margin applies on T. This is not authority to refinance arbitrary old delivery holdings retrospectively. | [verified] [NSE Q17][S10]; [unknown] broader retrospective conversion permission. |
| MTF → cash / repayment | Client repays funded liability and agreed dues; member releases funded shares **proportionately within one working day of payment**. Multi-security selection follows client instruction or previously disclosed policy. | [verified] [NSE Q16,20][S10]. |
| Client sells funded shares | Use release-plus-EPI mechanism and match delivery obligation; reconcile sale proceeds against funded debit and charges. The special securities movement is documented in Part B. | [verified] [2025 pledge circular][S17]. |
| Pledge acceptance deadline | Normal direct-payout MTF is **auto-pledged**. The manual CDSL OTP path has a 15-minute OTP and authentication deadline at EOD of execution date; these are different mechanisms. | [verified] [NCL Q43][S15], [CDSL OTP specification][S23]. |
| Missed acceptance / square-off | Manual CDSL requests expire/cancel without required authentication. No universal **T+3 17:00 / T+4 square-off** deadline was verified. Broker help pages give differing conversion/liquidation policies; their clocks cannot be presented as SEBI rules. | [verified] cancellation [S23]; [unknown] universal MTF acceptance/square-off clock. |
| Actual margin default | Liquidation according to agreed terms, with the margin-call period **not exceeding five working days**; the broker may set a shorter disclosed period. Do not describe five days as guaranteed client credit. | [verified] [2017 §9][S02], [NSE Q18][S10]. |
| Running settlement | NSE requires excess MTF **cash** settled monthly/quarterly per client choice on the notified running-settlement date, alongside the client's non-MTF account. | [verified] [NSE Q20][S10]. |

### A7. Interest, client documents and risk disclosure

| Item | Established requirement / what the manual should specify | Evidence |
|---|---|---|
| Interest rate and basis | No uniform SEBI MTF rate, universal day-count denominator, accrual start day or compounding rule was established. Do not invent an annual cap or assume every broker starts on T+1. | [unknown] universal numeric convention; framework reviewed [S02], [S07]. |
| Concrete broker example | Zerodha's published terms specify **0.04% per day of funded amount, from T+1 until debit/positions cleared**. Verified only as that broker's published terms at retrieval; not the greenfield broker's tariff or an industry mandate. Other parts of those terms retain manual-pledge language. | [verified] provider's own terms [S45]; [uncertain] currency of its manual-pledge wording against [S15]. |
| Computation design | Proposed simple-interest engine: `interest = Σ(daily funded principal × applicable annual rate ÷ contractual day-count basis)`; alternatively use the contracted daily rate directly. Version rates; define start/end-day inclusion, holidays, repayment allocation, rounding, posting and capitalization. | [unknown] universal mandated formula; **design recommendation**, not a regulatory fact. |
| Required MTF documentation | Exchange rights/obligations document is binding; additional broker terms may be stricter but cannot dilute the framework. NSE identifies **NSE/COMP/35260, 30 June 2017** for MTF rights/obligations. | [verified] [2017 §§22–23][S02], [NSE circular index within FAQ][S10]. |
| Client evidence | Preserve MTF opt-in, delivered terms, tariff version, margin/liquidation policy and communications. Policy amendments take effect after communication. Product opt-in and depository transaction authorization are separate events. | [verified] consent/policy [S10], Q4,19; transaction authorization [S23]. |
| Risk disclosures to draft | Explain funded principal, variable margin/haircuts, interest and fees, margin calls, liquidation conditions, eligibility changes, corporate actions and exit/repayment. This is a recommended disclosure checklist; exact current exchange template must govern. | [uncertain] implementation checklist derived from [S02], [S05], [S10]; [unknown] fully reconciled current NSE+BSE template pair. |
| Disputes / investor protection | MTF disputes enter exchange grievance/arbitration machinery; MTF financing losses are not covered by IPF merely because the purchase was exchange-traded. | [verified] [2017 §§28–29][S02]. |

### A8. CC files versus exchange reporting

| Report / recipient | Content, route and timing | Status / evidence |
|---|---|---|
| **UNPAIDMTF → NCL** | Request/response facility in **NMASS** to identify unpaid/MTF payout quantities. NCL FAQ: upload from **15:30 on trade day to 10:00 on settlement day**; **13:00 only for second settlement on multiple-settlement days**. | [verified] [NCL Q44][S15]. Check the current dated settlement schedule; do not generalize exceptional calendars. |
| UNPAIDMTF flags | **M** = MTF; **T** = unpaid client of TM; **C** = relevant CM unpaid cases, including TM failure to pay CM. Allocation precedence **C → M → T**; residual payout free of pledge. Report by trade date/settlement type/number. | [verified] [NCL direct-payout FAQ][S19]. |
| Request is not confirmation | Reconcile uploaded request, processing response, actual client payout and depository pledge. NCL's report **DeliveryDpo** distinguishes awaiting confirmation **DCOAW** from confirmed **CONFTD**. These are payout status strings, not OTP status codes. | [verified] [NCL direct-payout FAQ][S19]. |
| Exact production filenames/layout | UNPAIDMTF is a verified logical file label. Current full filename grammar, field order, transport path, version and complete rejection dictionary were not obtained from the underlying NCL ZIP packages. | [unknown] full implementation specification; [verified] label/portal [S15]. |
| ICCL/BSE equivalent | A current authoritative equivalent filename, request format, flag mapping and cutoff were not retrieved. **Do not transplant NCL's UNPAIDMTF filename or deadline to ICCL.** | [unknown]. |
| **Daily MTF exposure → exchange** | Client/PAN, promoter category, collateral/funded scrips and quantities/values, gross funded exposure, lenders and borrowing; separate from payout instructions. Due **on or before 18:00 T+1**. | [verified] [2024 amendment][S05], [Broker Annexure 15][S01], [SECC §4.8][S07]. |
| NSE route and nil days | **ENIT-NEW Compliance → Compliance → MTR → MTR Submission**; daily reporting continues on nil days until withdrawal. | [verified] [NSE Q22–24][S10]. |
| Corporate-action reporting | Map old/new ISIN appropriately; bonus/split quantity movements are corporate-action adjustments, not purchases/sales fabricated to balance the report. | [verified] [NSE Q29][S10]. |
| Stale noon deadline | SECC reporting annexure still prints **12 noon**, while operative §4.8.1 and the September 2024 amendment say **18:00 T+1**. Use the amended operative deadline; retain evidence of the conflict. | [verified] [SECC annexure and §4.8.1][S07], [S05]. |
| Exchange → public | Exchange publishes security-wise gross outstanding MTF across brokers after trading hours on the following day. | [verified] [2017 §20][S02], [SECC §4.8.2][S07]. |
| Half-yearly **net-worth certificate** | As at 31 March / 30 September; operative revised deadlines **31 May / 15 November**. Paragraph 3 also describes 60/45 days, creating a counting inconsistency with paragraph 4's named dates. | [verified] [2025/120][S08]. Use named operative dates, confirm calendar/holiday treatment with exchange. |
| Half-yearly **MTF compliance audit** | Separate certificate within one month of half-year end: normally **30 April / 31 October**. NSE/COMP/73594, **2 April 2026**, requires March certificate by 30 April 2026, with CA/UDIN or prescribed non-commencement certification. | [verified] [NSE circular][S42], [2017 §26][S02]. |
| BSE compliance portal | NoticeBlue reproduces BSE notice **20261001-36, 1 October 2026**, describing **BEFS → Margin Trading** and September-half-year submission. Primary PDF returned 403; independently verified deadline remains the SEBI rule above. | [uncertain] single reproduction [S46]; inaccessible [primary PDF][S47]. |
| Collateral segregation reporting | Client-level collateral reporting/allocation is an additional obligation; MTF exposure upload does not replace it. | [verified] [SEBI segregation circular][S36]. |

### A9. 2025–2026 MTF change register and proposals

| Change | Position at 15 October 2026 | Evidence |
|---|---|---|
| Direct-payout MTF tracking | CDSL's 28 March 2025 circular added settlement linkage and **MF** identifier to DP37, effective **5 April 2025**; this is evidence of operational auto-pledge reporting, not a new client OTP requirement. | [verified] **CDSL/OPS/DP/REPRT/2025/208** [S26]. |
| Pledged-stock sale / invocation | June 2025 SEBI changes, extended to **10 October 2025**, apply to margin pledges including funded stock and CUSPA. | [verified] [S17], [S18]. |
| Net-worth filing | August 2025 relaxation changes certificate dates; it does **not** change ₹3 crore eligibility or the separate compliance-audit deadline. | [verified] [S08], [S42]. |
| 2026 broker regulations / bank credit | January regulatory recast and July-effective RBI bank-credit rules are operative developments, separate from the June MTF consultation. | [verified] [S09], [S14]. |
| Proposed eligibility | ₹5 crore MTF net worth; corporate brokers plus LLPs. | [verified] **proposal only** [S13]. |
| Proposed funding / exposure | Add NCDs/other debt; exposure based on borrowing plus available net worth after specified ring-fencing, with overall 5.5× ceiling; passive client-limit breaches get a proposed cure mechanism. | [verified] **proposal only** [S13]. Exact new formula must not replace current B + 0.5N. |
| Proposed collateral / stock exit | Broader CC-aligned collateral, revised treatment of eligible sales credit and a 30-day rebalance on removal/T2T/suspension. | [verified] **proposal only** [S13]. |
| Proposed operations / reporting | Uniform exchange rights/obligations, ledger treatment, refinements to auto-pledged quantities and T+1 reporting before CC pay-in. | [verified] **proposal only** [S13]. Current 18:00 reporting remains the verified operative deadline. |
| Already-existing cash settlement | NSE FAQ already requires periodic settlement of excess MTF cash; a similar consultation proposal does not prove that obligation is absent today. | [verified] [NSE Q20][S10]; [S13]. |

## PART B — PLEDGE / RE-PLEDGE LIFECYCLE

### B1. Four distinct pledge arrangements

| Type | Purpose / pledgee / authorization | Permitted handling and exit | Evidence |
|---|---|---|---|
| **Margin pledge** | Client collateral for trading obligations → TM/CM **Client Securities Margin Pledge Account**; client authorization in the depository process. | Re-pledge through TM → CM → CC for that client's obligations; release after risk checks; client-sale release/EPI or default invocation/EPI. | [verified] [Broker §42][S01], [2025 amendment][S17]. |
| **MTF funded-stock pledge** | Purchased funded stock → **Client Securities under Margin Funding Account**. Direct-payout auto-pledge is distinct from manually initiated margin-funding pledge. | Repayment releases corresponding stock; sale/default uses applicable EPI route. Prohibited bank/NBFC onward pledge. Do not treat funded stock as freely reusable trading collateral. | [verified] [NCL Q43][S15], [NSE Q16][S10], [S17]. |
| **CUSPA pledge** | Non-MTF unpaid purchases → **Client Unpaid Securities Pledgee Account**; auto-pledge without specific client instruction. | Short unpaid-securities lifecycle, prescribed communications and liquidation/release; current rule and notified future changes differ. Not interchangeable with approved MTF lending. | [verified] [Broker §46][S01], [July 2026 amendment][S32]. |
| **Ordinary pledge / loan against shares (LAS)** | Borrower pledges holdings to lender's pledgee account under a credit agreement; ordinary depository pledge acceptance rather than the trading-margin chain. | Release on discharge/consent; partial release/invocation supported; invocation normally transfers securities to pledgee. Lending eligibility, LTV and end-use are lender/regulation-specific. | [verified] [CDSL pledge FAQ][S22], [LAS module][S31]; [unknown] any universal LAS LTV/rate applicable to all lenders. |
| Off-market transfer / POA | Neither is itself proof of a margin pledge. Title-transfer collateral arrangements are prohibited for trading margin. | A POA/DDPI does not turn unpledged holdings into collected margin. | [verified] [Broker §42.2–42.3][S01]. |

### B2. Lifecycle state machine — descriptive states, not API enum names

| From → to | Actor / trigger and validation | Securities / collateral result | Evidence |
|---|---|---|---|
| Free balance → request prepared | Client instruction; DP validates BOs, ISIN, quantity, authority and applicable pledge type; maker/checker separation. | Request submission is not confirmation or usable CC collateral. | [verified] [CDSL operating instructions][S20], §8.5; workflow synthesis. |
| Request prepared → awaiting client authorization | Manual margin pledge initiates depository URL/OTP flow using registered contact details. | Pending instruction remains distinguishable from accepted pledge. | [verified] [CDSL 2020/309][S23], [NSDL FAQ][S29]. |
| Awaiting authorization → authenticated | Client identifies itself, reviews security/quantity/pledgee details and submits OTP through depository flow. | Authorization permits further processing; it does not prove successful downstream re-pledge or CC credit. | [verified] [CDSL OTP flow][S23], [NSDL margin pledge][S28]; sequencing synthesis. |
| Awaiting authorization → cancelled / rejected | Missing authentication, invalid details or balance/other validation failure. | No confirmed pledge credit; inspect actual reason and retry only after correction. | [verified] [CDSL OTP][S23], [reason codes][S24]. |
| Authenticated / ordinary request → pledge confirmed | Pledgee confirmation, or supported standing/automatic acceptance, plus successful depository checks. | Pledged quantity encumbered in client account; pledgee interest recorded; beneficial interest remains with pledgor until applicable invocation. | [verified] [CDSL §8][S20], [NSDL process][S28]. |
| Direct payout → MTF/CUSPA auto-pledged | CC request/flag and settlement credit produce the appropriate pledge automatically. | Bypasses the manual per-transaction client-instruction route; confirm actual pledge creation. | [verified] [NCL Q43–44][S15], [direct-payout process][S16]. |
| TM pledge → re-pledged to CM | TM identifies original client pledge and quantity; CM accepts through prescribed depository process. No fresh client OTP for each onward re-pledge. | Original client attribution retained; only available pledge quantity can be passed onward. | [verified] [Broker §42.11][S01], [CDSL §8.6][S20]. |
| CM re-pledge → re-pledged to CC | CM sends onward re-pledge to CC; CC/depository acceptance and collateral eligibility checks. | CC-recognized collateral is attributed through the chain; pending request is not final margin credit. | [verified] [Broker §42.11][S01], [CDSL §8.6][S20]. |
| Confirmed at CC → valued / allocated | Apply approved-security eligibility, price, haircut, concentration and allocation rules. | Usable value may be less than pledged market value; revalue and reconcile allocations. | [verified] [NCL liquid assets][S37], [SEBI segregation][S36]. |
| Any confirmed pledge → release requested | Pledgor asks; pledgee consent/risk clearance required, or pledgee initiates release itself. | Request alone does not free quantity. | [verified] [CDSL §8.5][S20], [NSDL process][S28]. |
| CC chain → downstream re-pledges released | CC checks CM collateral sufficiency/substitution; CM and TM perform their own checks before releasing upstream client encumbrance. | Release chain in dependency order; do not credit free balance from an intermediate acknowledgement. | [verified] [Broker §42.11.8–42.11.9][S01]. |
| Release approved → fully / partly unpledged | Pledgee release or accepted pledgor request; full or specified partial quantity. | Released quantity returns to free balance, or the appropriate locked balance where lock-in persists; remainder stays pledged. | [verified] [CDSL §8.5][S20], [pledge FAQ][S22]. |
| Pledged → release plus EPI block | Client sale; TM/CM single release-for-EPI instruction; delivery-obligation validation. | Quantity released from pledge and blocked for pay-in in client demat. This is **not free, withdrawable balance**. | [verified] [2025 SEBI circular][S17]. |
| Pledged → default/invocation workflow | Contractual/regulatory default, appropriate notice, entitled pledgee, releasable downstream quantities. | Ordinary invocation and trading-related invocation must take different movement paths. | [verified] [notice circular][S30], [CDSL §8][S20], [S17]. |
| Ordinary pledge → invoked | Pledgee instruction; whole or part; no fresh pledgor consent at invocation. | Invoked quantity moves to pledgee; notify parties under 2026 framework. | [verified] [CDSL pledge FAQ][S22], [SEBI notice circular][S30]. |
| Margin/MTF/CUSPA → invocation plus EPI | Default-related invocation for exchange-traded securities, matched to client's delivery obligation. | EPI block in client demat with TM/CM audit trail, then settlement debit. Excess unvalidated quantity is not silently treated as delivered. | [verified] [S17], [CDSL operating modalities][S25]. |
| Pledged untraded MF units → invocation plus redemption | Special route for MF units not traded on an exchange. | Invoke to pledgee and generate redemption process; do not send an exchange sell-order/EPI route for such units. | [verified] [S17], [CDSL UDiFF amendment][S27]. |
| EPI block → settled / exception | Match actual obligation and depository execution. Failed/short delivery enters settlement exception handling. | Settlement confirmation is distinct from pledge release; residual pledge balances remain separately tracked. | [verified] [NCL settlement FAQ][S15], [CDSL modalities][S25]. |
| Remaining quantity → closed | Full release, full invocation or applicable corporate-action/system closure. | Partial activity must not close the entire pledge. CDSL active DP37 report retains partially unpledged/invoked active positions. | [verified] [CDSL 2025/348][S26b]. |

### B3. CDSL versus NSDL: interfaces, authorization and schemas

| Area | CDSL | NSDL | Evidence |
|---|---|---|---|
| Core participant / investor systems | **WebCDAS / CDAS**, **Easiest**; DP maker/checker processing. | **DPM**, **SPEED-e**; Form 43 for margin-pledge processes. | [verified] [CDSL 2020/309][S23], [NSDL master][S29b], [NSDL service][S28]. |
| Client URL flow | SMS/email link → PAN, or BOID for PAN-exempt client → select pending transactions → generate OTP → submit. | SMS/email confirmation link / **Confirm Margin Pledge Transactions** facility → PAN/identification → OTP and transaction confirmation; mapping checks include UCC/member/segment. | [verified] [CDSL flow][S23], [NSDL FAQ][S29]. |
| OTP lifetime | **15 minutes**; regeneration supported. | Exact current OTP lifetime not verified. **Do not copy CDSL's 15 minutes to NSDL.** | [verified] CDSL [S23b]; [unknown] NSDL numeric TTL. |
| URL/instruction lifetime | Until authentication or EOD of execution date; unauthenticated manual requests cancel at EOD. Future-dated instructions distinguish setup date from execution date. | Current exact link expiry and system EOD clock not retrieved. | [verified] CDSL [S23]; [unknown] NSDL current cutoff. |
| Authorization variations | Manual margin/MTF pledge requires its relevant authorization; direct-payout auto-pledge follows separate CC route. | Physical Form 43, SPEED-e, broker/POA-initiated flow with client OTP are documented; pledgee standing acceptance available. Direct-payout auto-pledge separately applies. | [verified] [S23], [S28], [S15]. |
| Actual authorization URL templates | Use the link issued by CDSL; full tokenized URL grammar not established from primary specifications reviewed. | Use NSDL-issued link; exact production token URL grammar not independently established. | [unknown] hard-codeable URL templates. Broker screenshots are not an interface contract. |
| API capabilities | Official API page lists **eLAS**, **e-Margin Pledge**, margin re-pledge API for CCs, and transaction upload API. | Current production margin-pledge API specification, authentication and callback catalogue were not retrieved. | [verified] [CDSL API catalogue][S21]; [unknown] NSDL API details. |
| CDSL UDiFF change | **CDSL/OPS/DP/SETT/2025/518, 4 August 2025**: additional values in existing fields, **no added columns**; published catalogue version **v2.0.0.3**. Annexures cover Transaction Upload, COD and Easiest Common Upload. | Do not reuse CDSL schemas or enum values in NSDL integration. | [verified] [CDSL original][S27]; [unknown] cross-depository equivalence. |
| EPI / redemption values in that CDSL field | **YES**: release/invoke with client-UCC EPI; **NO**: applicable ordinary release / normal-pledge or re-pledge invocation; **RD**: untraded-MF invocation/redemption; **MBR**: exceptional member-PROP EPI route. | NSDL operational forms/schemas differ; current release file dictionary not verified. | [verified] [CDSL §3 and annexures][S27]; [unknown] NSDL mappings. |
| CDSL DP37 pledge-type identifiers | **MP** margin pledge; **MR** margin re-pledge; **UP** CUSPA; **MF** margin funding. Settlement ID populated in **PLEDGOR DP's INTERNAL REFERENCE NO** for direct-payout CUSPA/MTF pledges. | No matching NSDL report code claimed. | [verified] [CDSL 2025/208][S26]; [unknown] NSDL equivalent. |
| Forms | CDSL annexures **8.1 PRF, 8.2 URF, 8.3 IRF**; margin **8.4 MPRF, 8.5 MURF, 8.6 MIRF**, with combined form **8.8**. | NSDL **Form 43** for margin pledge/re-pledge initiation, release and invocation. Current amended form must include 2026 undertakings. | [verified] [CDSL annexures][S20b], [NSDL master §7.3][S29b], [SEBI 2026][S30]. |
| LAS change in 2026 | **CDSL/OPS/DP/POLICY/2026/468, 15 July 2026**: investor request on participating bank/NBFC platform → DP Easiest **LAS** menu → same-day approve/reject; optional auto approval. Reports **DP97, DP37, DPC9**. | No equivalent 2026 NSDL change verified. | [verified] [CDSL LAS circular][S31]; [unknown] NSDL equivalence. |
| Reconciliation | Daily count of received/executed/pending pledge instructions and maker-entered instructions must reconcile. Use persistent original/parent pledge identifiers and residual quantities. | Reconcile depository confirmations and holdings, not only broker UI state; proposed implementation control pending current NSDL technical pack. | [verified] CDSL §8.7 [S20]; [uncertain] NSDL control recommendation. |

### B4. Exact CDSL reason codes and historical transaction statuses

| Rejection reason code | Meaning, paraphrased | Evidence / applicability |
|---|---|---|
| 01 | Insufficient units for requested amount | [verified] [CDSL/OPS/DP/POLCY/2024/326, 14 June 2024][S24]. |
| 02 / 03 / 04 / 05 | Unacceptable closure date / pledged quantity / ISIN / security details | [verified] [S24]. |
| 06 / 07 / 08 | ISIN delisted / missing all-holder POA / holders unacceptable to pledgee | [verified] [S24]. |
| 09 / 10 / 11 / 12 | Agreement-number mismatch / other reason / unacceptable transfer quantity / agreement breached | [verified] [S24]. |
| 13 / 14 / 15 | Unacceptable closure quantity / pledged amount or margin unpaid / pledged ISIN market value insufficient | [verified] [S24]. |
| 16 | Pledge not verified/accepted within 15 days of creation/modification | [verified] system reason, applicable pledge categories listed in [S24]. |
| 17 | Client OTP authentication absent within allowed time | [verified] margin/MTF system reason [S24]. |
| 18 | Insufficient balance for overdue pledge | [verified] margin/MTF system reason [S24]. |
| Mandatory reasons / release dates | DP must supply a valid reason when rejecting covered pledge/re-pledge/unpledge requests; change effective **13 July 2024**. DP37 reason-field implementation effective **25 January 2025**. | [verified] [S24], **CDSL/OPS/DP/SYSTM/2025/28, 11 January 2025** [S24b]. |
| Historical margin transaction statuses | **828** maker setup; **829** checker approval; **830** pledgee-maker acceptance; **831/832/833** related pledgee-checker balance postings. | [verified] **historical** 2020/309 Annexure L1 [S23]; not asserted as current UDiFF enums. |
| Historical re-pledge statuses | **834/835/836** initiation/checker/pledgee-maker acceptance; **837/838** final balance postings. | [verified] **historical** Annexure L1 [S23]. |
| Status versus reason | **806/807** are historical maker/checker rejection statuses; **823** historical EOD insufficient-balance status. These are not substitutes for reason codes **01–18**. | [verified] [S23], [S24]. |
| NSDL rejection dictionary | Exact current business rejection reasons, validation codes, response status enums and retry semantics not retrieved. | [unknown]. Do not manufacture `E001`-style codes or translate CDSL numbers. |

### B5. Timings — keep the clocks separate

| Clock | Verified rule | Evidence / caution |
|---|---|---|
| Manual CDSL OTP | 15 minutes; can regenerate. | [verified] [CDSL template][S23b]. |
| Manual CDSL authorization | Complete by EOD of execution date; otherwise cancelled. | [verified] [CDSL 2020/309][S23]. “EOD” is not evidence of a universal 17:00 or 21:00 OTP cutoff. |
| Unaccepted CDSL setup | Covered pending setups verified/accepted/rejected/cancelled within **15 days**; system rejects unresolved requests. | [verified] [CDSL §8.5][S20], [reason 16][S24]. This is not a grace period overriding the manual OTP clock. |
| MTF repayment release | Within **one working day** of receipt, proportionate to payment. | [verified] [NSE Q16][S10]. |
| Margin-call default | Agreed margin-call window, not exceeding **five working days**. | [verified] [2017 §9][S02]. Distinct from CUSPA trading-day window. |
| NCL unpaid/MTF file | Trade day 15:30 → settlement day 10:00; second multiple settlement to 13:00. | [verified] [NCL Q44][S15]. Current dated schedules control exceptions. |
| NCL EPI | FAQ gives general securities EPI **21:00**, UPI-client EPI **20:00**; explicitly subject to changes and running-settlement dates. | [verified] [NCL Q39][S15]. These are EPI cutoffs, not pledge OTP deadlines. |
| Frozen/not-permitted UCC invocation | Exceptional transfer to member and sale in PROP route requires securities pay-in **on invocation day**. | [verified] [2025 SEBI circular][S17]. |
| All depositories / all CCs | Universal unpledge cutoff, guaranteed instant release, NSDL OTP TTL and ICCL/MCX release file cutoffs not established. | [unknown]. Configure only from the contracted participant/CC production schedules. |

### B6. Valuation, haircuts and the cash / non-cash rule

| Layer | Applicable treatment | Evidence |
|---|---|---|
| Basic collateral value | Eligible quantity × applicable valuation price, reduced by applicable haircut, then subject to concentration/eligibility caps. This arithmetic does not itself prove accepted allocation. | [verified] valuation method [NCL liquid assets][S37]; formula is an arithmetic expression of the method. |
| Price / update source | NCL specifies NSE closing market price and applicable haircuts; approved securities and haircut schedules can change. Use dated CC inputs and actual accepted quantities. | [verified] [NCL liquid assets][S37]. |
| Discoverable NSE file names | Official all-reports page lists **Haircut for Approved Securities** and **Haircut for Mutual Funds**; observed examples **APPSEC_COLLVAL_08102026.csv**, **MF_VAR_08102026.csv**. These are observed filenames, not a fully verified production naming grammar. | [verified] [NSE all reports][S38]. |
| Cash equivalents versus non-cash | Classification is instrument-specific: approved cash-equivalent assets are not restricted to bank cash; equity shares are non-cash. Use CC definitions, not marketing labels such as “liquid stock.” | [verified] [SEBI collateral rules][S35], [NCL liquid assets][S37]. |
| **Regulatory 50% test** | CM's total collateral must contain at least **50% cash/cash equivalents**. SEBI expressly says there need not be a minimum cash-equivalent percentage **at each individual client level**. | [verified] [SEBI/HO/MRD2_DCAP/CIR/2021/0598, 20 July 2021][S36], §18. |
| Allocation restrictions | Excess cash of one client cannot support another; TM/CM proprietary cash may support clients under the allocation framework. Accordingly, “every client must always personally deposit 50% cash” overstates the SEBI rule. | [verified] [SEBI segregation §18 and illustrations][S36]. |
| Effective collateral / broker policy | CC allocation calculations and member cash availability can limit benefit; a broker may impose a stricter client cash policy. Do not confuse that commercial policy with the regulatory level of the minimum. | [verified] allocation framework [S36], [MCXCCL FAQ][S40]; [uncertain] any particular unexamined broker tariff/policy. |
| ICCL collateral | Its published risk material requires cash equivalents at least 50% of liquid assets and permits CC concentration constraints. Current member-specific haircuts, allocation files and API details need the live ICCL pack. | [verified] [ICCL primary attachment][S41]; [unknown] full current operational pack. |
| MCXCCL | Collateral page specifies **1:1 cash/cash-equivalent to non-cash**; FAQ describes effective-collateral allocation at CM/TM/CP/UCC levels. This is a clearing-collateral rule, not permission to offer equity MTF in commodity contracts. | [verified] [MCXCCL collateral][S39], [FAQ][S40]. |
| Bank lending to MTF broker | RBI's **50% cash** requirement for bank MTF collateral is a separate requirement, with different assets and parties. | [verified] [RBI §219ZB(2)][S14]. |
| Haircut increased / security removed | Recompute usable collateral and resulting shortfall; quantity can remain pledged even when its collateral credit falls or disappears. Pledge existence and CC collateral eligibility are different states. | [verified] changing eligibility/haircuts [S37]; state distinction is an operational inference. |
| CC issuer concentration — distinct from MTF loan book | The 2024 CC rules cap combined equity/debt collateral exposure to one issuer at **15% of CC total liquid assets received from CMs**, across the specified segments. Corporate-bond sublimits at CM level are **10% for AAA** and **8% for AA and above but below AAA**. | [verified] [SEBI §3.4][S35]. These are not MTF broker single-stock funding caps. |
| Exact single-scrip/group haircut percentages | No universal static percentage schedule is supplied here. Use current CC schedules; never substitute a broker's haircut for a CC acceptance rule without labeling it. | [unknown] future/live ISIN-specific values beyond retrieved snapshots. |

### B7. Invocation, notice and sale — 2026 change verified

| Step / question | Rule / operational treatment | Evidence |
|---|---|---|
| Grounds | Default under the relevant pledge/credit terms; MTF margin default subject to agreed conditions. Broker must identify liquidation situations in terms/rights/obligations. | [verified] [CDSL §8][S20], [2017 §§9–10][S02]. |
| Protect non-defaulting clients | A member's default does not authorize use of a healthy client's collateral to cover another client/member obligation. Preserve client attribution throughout re-pledge and invocation. | [verified] [Broker §42.11][S01], [SEBI segregation][S36]. |
| Exact 2026 circular | **HO/47/14/12(1)2026-MRD-POD2/I/4229/2026, 5 February 2026**; implement **on or before 6 April 2026**. | [verified] [SEBI circular][S30]. |
| What it actually added | Standardized pledge forms with undertakings concerning Indian Contract Act §§176–177; pledgee undertakes reasonable notice and compliance. Depository informs **both parties at invocation**, recording pledgee as beneficial owner under reg.79(8). | [verified] [S30], inserted §§4.13.3–4.13.5. |
| Notice before sale | Reasonable notice of **sale** derives from the existing Contract Act obligation cited by SEBI. The February circular did not invent that underlying obligation or prescribe a fixed 7/15/30-day period. | [verified] [S30], §3; [unknown] universal numerical reasonable-notice duration. |
| Notice versus system alert | Pledgee's reasonable notice and depository's invocation notification are distinct. A system alert that invocation has occurred is not evidence that prior sale notice was delivered. | [verified] distinction from [S30]; operational inference. |
| CDSL implementation | **CDSL/OPS/DP/SETT/2026/180, 13 March 2026**, effective **6 April 2026**: signed undertakings with creation/invocation requests; notifications to pledgor and pledgee. | [verified] [CDSL original and Annexure A][S30b]. |
| Recommended notice record | Default amount, ISIN/quantity, contractual trigger, required cure, intended action, notice delivery evidence and approved sale decision; retain contract/form version. | [uncertain] operational checklist derived from [S02], [S30]; not a mandated universal notice template. |
| Invocation processing | Check entitled pledgee, defaulting client, residual quantity and downstream re-pledges; release dependencies; submit appropriate ordinary, EPI or redemption instruction; reconcile confirmed results. | [verified] underlying mechanics [S20], [S25], [S27]; synthesized workflow. |
| Client-UCC route | Margin/MTF/CUSPA exchange-traded securities ordinarily use client-demat EPI blocking, with delivery validation and member audit trail. | [verified] [2025 SEBI circular][S17], [CDSL modalities][S25]. |
| Exception route | If client code is frozen/not permitted, invoked securities may move to member, sell under proprietary code, with same-day pay-in. This exception is not blanket permission to warehouse invoked client shares. | [verified] [S17]. |
| Recovery accounting | Reconcile execution, funded debit/other lawful dues, expenses and surplus; do not treat invocation alone as evidence of a completed market sale. | [verified] movement/sale distinction [S17], [S30]; accounting control recommendation. |

### B8. CUSPA: current rule and notified future transition

| Period / event | Handling | Evidence |
|---|---|---|
| **Current at cutoff**: creation | Unpaid securities credited to client and auto-pledged; communicate funds obligation and member's right to sell on default. | [verified] [Broker §46.1][S01], read with direct payout [S16]. |
| Current payment / disposal | Release upon payment within five trading days after payout; if unpaid, dispose within **five trading days after payout**, with **one trading day's email/SMS intimation before sale**. | [verified] [Broker §46.1.4–46.1.6][S01]. |
| Current automatic release | Pledge neither invoked nor released within **seven trading days after payout** is automatically released. | [verified] [Broker §46.1.9][S01]. |
| Current margin exclusion | CUSPA securities cannot be considered for the client's margin obligations under the retrieved pre-transition rule. | [verified] [Broker §46.1.10][S01]. |
| July amendment notified | **HO/38/11/(9)2026-MIRSD-POD/I/15382/2026, 3 July 2026** replaces §46 with revised CUSPA treatment. It is **not all effective on issue**. | [verified] [SEBI circular][S32]. |
| Exact NSE commencement | **NSE/INSP/75508, 31 July 2026**, annexure background §2: guidelines 1–9 effective **31 October 2026**; guideline 10 extensions effective **3 January 2027**. Unchanged carried-forward provisions continue meanwhile. | [verified] [NSE operational guidelines][S33]. |
| From **31 October 2026**: policy / notice | Communicated handling policy with payment period capped at five trading days; reasonable notice before invocation/liquidation; surplus to client's ledger. | [verified] **not yet effective at cutoff** [S32], [S33]. |
| From **31 October 2026**: margin reporting | CUSPA may count for client-margin **reporting**, but **must not generate additional exposure**. | [verified] **not yet effective** [S32], §46.5. |
| From **31 October 2026**: excess release | Daily maximum permissible CUSPA pledge value: **2.25 × (C − B)**, where B = aggregate clear non-MTF ledger balance, credit positive/debit negative; C = EOD margin obligation across segments. Release excess by next trading day; specified fractional-unit retention allowed. If credit exceeds obligation, no continued pledge. | [verified] **not yet effective** [S33], guideline 6. |
| From **31 October 2026**: auto-release | If not invoked/released within five trading days, automatic release at **end of sixth trading day after payout**. No bank/NBFC onward funding pledge. | [verified] **not yet effective** [S32], §§46.10–46.11. |
| From **3 January 2027**: exceptional extension | Lower circuit/suspension/recognized inability to sell: request by **18:00 on fifth trading day after payout**, extension up to **one calendar week**; repeat only while qualifying condition persists; notify client each time. | [verified] **future effective rule**, [S32], §§46.12–46.14; [S33]. |
| BSE corresponding commencement | Secondary report identifies **BSE 20260731-12, 31 July 2026**. Primary attachment not obtained; do not assume every NSE implementation detail is independently verified for BSE. | [uncertain] [TeamLease RegTech][S48]; [unknown] BSE annexure/any later extension. |

### B9. Corporate actions and operational edge cases

| Event | Handling / distinction | Evidence |
|---|---|---|
| Dividend / corporate entitlement | Pledgor remains beneficially interested while pledge is outstanding; corporate benefits accrue to that holder, subject to actual invocation/record-date position. | [verified] [CDSL pledge FAQ][S22]. |
| NSDL bonus mechanism | NSDL's December 2010 primary explanation says bonus credits are pledged when the original pledge remains open/partly open; fully closed/invoked pledges produce free bonus credit to the relevant pledgor entitlement. | [verified] **historical mechanics** [S44]; [unknown] complete current margin-re-pledge-specific CA rulebook. |
| Split / merger / ISIN change | Reconcile issuer ratio, old/new ISIN, quantity, pledge links and haircut/eligibility before granting benefit. NSE MTF reports distinguish CA quantity changes from trades. | [verified] reporting [NSE Q29][S10]; [uncertain] recommended reconciliation; [unknown] universal current CDSL/NSDL auto-carry rules for every CA type. |
| Rights / voluntary actions | Do not assume a rights subscription, rights entitlement or merger consideration is automatically part of the same pledge. Obtain event-specific depository/issuer treatment. | [unknown] universal treatment; recommendation to verify per event. |
| F&O ban | NSE ban rules restrict new/increased derivative positions; ban does not itself prove pledge extinguishment. NSE also publishes an equity-margin increase of **15%, capped at 100%**, for affected securities under its surveillance framework. | [verified] [NSE ban page][S49], [surveillance margin page][S50]; [unknown] any specific ISIN's current collateral consequence without its risk notice. |
| ASM / GSM | Check actual stage, effective date, trading restrictions and CC eligibility/haircut. Neither acronym by itself establishes one universal haircut or automatic unpledge. | [verified] stage-based surveillance [NSE ASM page][S51]; [unknown] universal collateral treatment. |
| Suspension | MTF positions follow suspension-notice liquidation rule above; if sale is impossible, pledge does not manufacture liquidity. Future CUSPA extension relief cannot be activated before its effective date. | [verified] [NSE suspension rule][S12], [CUSPA commencement][S33]. |
| CDSL ↔ NSDL pledge | Ordinary CDSL pledge requires both BOs in CDSL; same-depository pledge can span different DPs. Do not attempt a direct inter-depository pledge. | [verified] [CDSL §8.5][S20]. |
| Moving pledged holdings between depositories | A released/free-balance transfer and new pledge is a different process from preserving the existing pledge chain. No verified cross-depository portability-with-encumbrance interface obtained. | [unknown] portable pledge mechanism; do not implement by assumption. |
| CDSL EPI account change | **CDSL/OPS/DP/SETTL/2026/188, 17 March 2026** confirms separate EPI accounts discontinued from **21 March 2026**. Use CM pool-account mapping; legacy EP numbers must be replaced in uploads/reports. | [verified] [CDSL circular and FAQ][S55]. Do not follow stale instructions to open/use a separate CDSL EP account. |
| Failed unpledge before pay-in | A pending release is not delivered stock. Use supported release/EPI route; validate final block/debit and any residual encumbrance. Delivery shortfall may enter auction/close-out according to the market/settlement category. | [verified] [S17], [NCL settlement Q7–10][S15]. |
| Partial release / invocation | Track released/invoked and remaining quantities; existing active pledge persists for remainder. CC/margin checks still apply before release. | [verified] [CDSL FAQ][S22], [DP37 active report][S26b]. |
| 2026 lock-in mechanism for already pledged shares | **HO/49/(17)2026-CFD-POD2/I/8965/2026, 8 April 2026**: specified securities unable to receive lock-in may be marked **non-transferable** for the applicable period under the amended ICDR framework; issuer/lender intimations and depository implementation apply. | [verified] SEBI circular reproduced in official CDSL **2026/250, 10 April 2026** [S54]; [unknown] full participant-level invocation/transfer exception matrix. |
| Lock-in | CDSL permits pledge of locked securities; invocation only after lock-in expiry; release need not make locked stock freely transferable. | [verified] [CDSL §8.2 and §8.5][S20]. |
| Pledge expiry | Distinguish OTP expiry, pending setup rejection, contractual pledge expiry, security redemption/maturity and CUSPA statutory auto-release. No universal automatic release of every confirmed pledge merely on a form's expiry date was established. | [verified] separate clocks [S23], [S24], [S01], [S32]; [unknown] universal ordinary-pledge expiry semantics. |
| Stale or duplicate messages | Recommended controls: correlate original pledge ID, operation/quantity and settlement reference; preserve raw response; handle duplicate confirmations without double-crediting collateral. | [unknown] universal idempotency API contract; **internal control recommendation**. |

### B10. Pledge / unpledge fees — depository charges, not retail tariffs

| Depository / transaction | Published charge and payer/basis | Evidence / caution |
|---|---|---|
| CDSL ordinary pledge, **including MTF funded stock** | **₹12 per request**, payable by pledgor for pledgor-set-up requests. | [verified] [June 2026 operating instructions][S20], ch.12 item 8. |
| CDSL ordinary/MTF unpledge | **₹12 per request**, payable by pledgor when accepted or entered by pledgee. | [verified] [S20], item 9. |
| CDSL margin pledge / release to BO / margin or re-pledge invocation | **₹5 per request**, transaction initiator, specified setup basis. | [verified] [S20], item 10. |
| CDSL re-pledge / re-pledge release | **₹1 per request**, initiator; CC-initiated margin pledge/re-pledge transactions exempt under tariff footnote. | [verified] [S20], item 11 and footnote. |
| CDSL CUSPA | Auto-creation **₹5** pledgor; release **₹5** pledgee; invocation tariff **₹5** pledgee, per request. | [verified] [S20], items 18–20. |
| NSDL ordinary pledge/hypothecation | **₹25 per instruction** for creation; no depository fee for closing/invoking. | [verified] [NSDL DP tariff][S43], item 3. |
| NSDL margin pledge / client release / TM-CM invocation | **₹5 per instruction** for each listed operation. | [verified] [S43], item 4. |
| NSDL TM→CM / CM→CC re-pledge; CM→TM release | **₹1 per instruction**; no CC release/invocation fee. | [verified] [S43], item 4. |
| NSDL MTF-specific classification | March 2024 master explicitly says **₹25** creation, no closing/invocation fee for margin-funding pledges. Current 2026 fee sheet does not separately label MTF. | [verified] historical specific rate [S29b], §7.5; [unknown] independent current MTF-specific tariff confirmation. |
| Retail client charge / taxes | The above are depository/DP-layer charges, not a universal broker-client tariff. Actual client charge and tax treatment must use the broker's disclosed schedule; no universal ₹30 or ₹60 pledge charge assumed. | [verified] scope of schedules [S20], [S43]; [unknown] greenfield retail tariff and event-specific tax treatment. |

### B11. Verified 2025–2026 pledge changes and remaining change leads

| Instrument / date | Change and status | Evidence |
|---|---|---|
| CDSL/OPS/DP/SYSTM/2025/28 — 11 January 2025 | Historical closed pledges moved into history inquiry; DP37 rejection field effective 25 January 2025. | [verified] [S24b]. |
| CDSL/OPS/DP/REPRT/2025/208 — 28 March 2025 | Direct-payout settlement reference and MF type in DP37; effective 5 April 2025. | [verified] [S26]. |
| CDSL/OPS/DP/REPRT/2025/348 — 23 May 2025 | Active/open pledge report option; partial release/invocation retained while active; no format change. | [verified] [S26b]. |
| SEBI/HO/MIRSD/MIRSD-PoD/P/CIR/2025/82 — 3 June 2025 | Release/EPI, invocation/EPI, untraded-MF redemption and frozen-client exception. Original paragraph 6 says **5 September 2025**. | [verified] [S17]. |
| CDSL/OPS/DP/SETT/2025/443 — 1 July 2025 | Depository operational modalities for those changes. | [verified] [S25]. |
| CDSL/OPS/DP/SETT/2025/518 — 4 August 2025 | UDiFF field/value changes and upload annexures. | [verified] [S27]. |
| SEBI/HO/MIRSD/MIRSD-PoD/P/CIR/2025/118 — 18 August 2025 | Implementation extended to **10 October 2025**. Recital says prior date 1 September, inconsistent with original circular's 5 September; final extended date is explicit. | [verified] [S18], conflict with [S17]. |
| CDSL/OPS/DP/SETT/2025/657 — 29 September 2025 | Revised pledge/release/invocation forms for the new mechanism. | [verified] CDSL original [S27b]; current forms [S20b]. |
| CDSL/OPS/DP/SETTL/2026/188 — 17 March 2026 | Separate EPI accounts discontinued from 21 March 2026; settlement mapping moves to CM pool accounts. | [verified] [S55]. |
| SEBI HO/49/(17)2026-CFD-POD2/I/8965/2026 — 8 April 2026 | Non-transferable marking mechanism for already pledged securities subject to ICDR lock-in. | [verified] official SEBI text in CDSL dissemination [S54]. |
| February / April 2026 notice changes | SEBI reasonable-notice undertakings and invocation notification; CDSL effective 6 April 2026. | [verified] [S30], [S30b]. |
| July 2026 CUSPA amendment | Notified; revised NSE rules effective 31 October 2026; exceptional extensions 3 January 2027. | [verified] [S32], [S33]. |
| CDSL/OPS/DP/POLICY/2026/468 — 15 July 2026 | LAS requests through participating lenders and DP Easiest approval. | [verified] [S31]. |
| BSE/ICCL release API lead | NoticeBlue reports **20260713-1**, go-live **13 July 2026**, titled “Pledge Release API between BSE Clearing Limited (BSECL) and Depositories.” Primary PDF unavailable; no API details verified. | [uncertain] single reproduction [S52]; [unknown] production schema and full impact. |
| NSDL/POLICY/2025/0140 — 10 October 2025 | Additional guidelines permit release/invocation with EPI movement without separate client instruction; Forms 43/44 are accompanied by separate EPI details in an annexure. It references NSDL/POLICY/2025/0084 (1 July 2025) and /0119 (9 September 2025). | [verified] primary circular facsimile hosted by SMIFS [S53]; [unknown] complete current file/API specification and later amendment chain. |

### Source links

| Source group | Scope / evidence handling |
|---|---|
| Regulatory and exchange documents | [verified] Primary PDFs, official FAQs and official participant instructions linked below support the specific rows citing them. A historical document is not presumed fully updated. |
| Mirrored primary document | [verified] S53 is the NSDL-issued circular read as a facsimile on a broker's website; host provenance is disclosed. |
| Secondary leads | [uncertain] S46, S48 and S52 are discovery leads only. Unavailable primary attachments are not treated as read. |

[S01]: https://www.sebi.gov.in/sebi_data/attachdocs/jun-2025/1750158789381.pdf "SEBI Master Circular for Stock Brokers, 17 June 2025"
[S02]: https://www.sebi.gov.in/sebi_data/attachdocs/jun-2017/1497409353676.pdf "SEBI comprehensive MTF review, 13 June 2017"
[S03]: https://www.sebi.gov.in/sebi_data/attachdocs/oct-2017/1509443428385.pdf "SEBI MTF clarification, 1 August 2017"
[S04]: https://www.sebi.gov.in/sebi_data/attachdocs/nov-2022/1669821792265.pdf "SEBI equity ETFs in MTF, 30 November 2022"
[S05]: https://www.sebi.gov.in/sebi_data/attachdocs/sep-2024/1726055147074.pdf "SEBI MTF maintenance margin and reporting, 11 September 2024"
[S06]: https://www.sebi.gov.in/sebi_data/attachdocs/jan-2025/1736760771912.pdf "SEBI SECC master cover, 30 December 2024"
[S07]: https://www.sebi.gov.in/sebi_data/commondocs/dec-2024/RE_Chapter%201%20-%20Trading%20-%20NEW_p.pdf "SEBI SECC master Chapter 1, Trading"
[S08]: https://www.sebi.gov.in/sebi_data/attachdocs/aug-2025/1756210332904.pdf "SEBI MTF net-worth certificate dates, 26 August 2025"
[S09]: https://www.sebi.gov.in/sebi_data/attachdocs/jan-2026/1767852346757.pdf "Stock Brokers Regulations 2026, Gazette dated 7 January 2026"
[S10]: https://www.nseindia.com/static/trade/members-faqs-margin-trading-facility "NSE MTF FAQs"
[S11]: https://nsearchives.nseindia.com/content/circulars/COMP63876.pdf "NSE MTF exposure clarification, 11 September 2024"
[S12]: https://nsearchives.nseindia.com/content/circulars/cmtr5420.htm "NSE MTF T2T/suspension circular, 9 September 2004"
[S13]: https://www.sebi.gov.in/sebi_data/attachdocs/jun-2026/1781787487371.pdf "SEBI MTF consultation, 18 June 2026 — proposal"
[S14]: https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=13346 "RBI revised Commercial Banks Credit Facilities amendment, 30 March 2026"
[S15]: https://www.nseclearing.in/sites/default/files/2026-02/NCL%20SETTLEMENT.pdf "NCL settlement FAQ, February 2026 file"
[S16]: https://www.nseclearing.in/equities "NCL equity settlement and direct payout"
[S17]: https://www.sebi.gov.in/sebi_data/attachdocs/jun-2025/1748947174736.pdf "SEBI pledge/re-pledge amendment, 3 June 2025"
[S18]: https://www.sebi.gov.in/sebi_data/attachdocs/aug-2025/1755513146159.pdf "SEBI extension to 10 October 2025, 18 August 2025"
[S19]: https://www.nseclearing.in/sites/default/files/2024-10/Payout%20Of%20Securities%20Directly%20to%20Client%20Demat%20Accounts.pdf "NCL direct-payout FAQ"
[S20]: https://www.cdslindia.com/downloads/DP/currentDPs/DP-Operating-Instructions-Chapters-as-on-June-30-2026.pdf "CDSL operating instructions through June 2026"
[S20b]: https://www.cdslindia.com/downloads/DP/currentDPs/DP-Operating-Instructions-Annexures-as-on-June-30-2026.pdf "CDSL operating instruction annexures through June 2026"
[S21]: https://www.cdslindia.com/DP/APIs.html "CDSL official API capability catalogue"
[S22]: https://www.cdslindia.com/downloads/Investors/FAQs/07%20Demat%20CDSL%20Way%20-%20VII%20-%20Pledge-2025.pdf "CDSL pledge FAQ"
[S23]: https://www.cdslindia.com/downloads/Publications/Communique/DP2020-309_communiques_dp_DP-309-Margin-Pledge-Re-Pledge-NEW%20%281%29.pdf "CDSL 2020/309, 16 July 2020, with historical formats"
[S23b]: https://www.cdslindia.com/MarginPledge/PledgeMarginMailtemplate.htm "CDSL official OTP email template"
[S24]: https://www.cdslindia.com/eservices/Publications/DownloadFile?eventID=DP2024-326&method=communique "CDSL 2024/326 rejection reasons"
[S24b]: https://www.cdslindia.com/eservices/Publications/DownloadFile?eventID=DP2025-28&method=communique "CDSL 2025/28 pledge history and DP37 reasons"
[S25]: https://www.cdslindia.com/eservices/Publications/DownloadFile?eventID=DP2025-443&method=communique "CDSL 2025/443 pledge/EPI operating modalities"
[S26]: https://www.cdslindia.com/eservices/Publications/DownloadFile?eventID=DP2025-208&method=communique "CDSL 2025/208 DP37 settlement and MF fields"
[S26b]: https://www.cdslindia.com/eservices/Publications/DownloadFile?eventID=DP2025-348&method=communique "CDSL 2025/348 active pledge report"
[S27]: https://www.cdslindia.com/eservices/Publications/DownloadFile?eventID=DP2025-518&method=communique "CDSL 2025/518 UDiFF changes"
[S27b]: https://www.cdslindia.com/eservices/Publications/DownloadFile?eventID=DP2025-657&method=communique "CDSL 2025/657 revised forms and 10 October go-live"
[S28]: https://nsdl.com/services/margin-pledge "NSDL margin pledge service"
[S29]: https://nsdl.com/faq "NSDL official FAQs"
[S29b]: https://nsdl.com/nsdl/2024-08/master_circular_to_participants_march_2024%20%282%29_0.pdf "NSDL March 2024 participant master — historical baseline"
[S30]: https://www.sebi.gov.in/sebi_data/attachdocs/feb-2026/1770291682029.pdf "SEBI pledge creation/invocation notice undertakings, 5 February 2026"
[S30b]: https://www.cdslindia.com/eservices/Publications/DownloadFile?eventID=DP2026-180&method=communique "CDSL 2026/180 notice undertakings, 13 March 2026"
[S31]: https://www.cdslindia.com/eservices/Publications/DownloadFile?eventID=DP2026-468&method=communique "CDSL 2026/468 LAS in Easiest, 15 July 2026"
[S32]: https://www.sebi.gov.in/sebi_data/attachdocs/jul-2026/1783077132079.pdf "SEBI CUSPA amendment, 3 July 2026"
[S33]: https://nsearchives.nseindia.com/content/circulars/INSP75508.pdf "NSE CUSPA operational guidelines, 31 July 2026"
[S35]: https://www.sebi.gov.in/sebi_data/attachdocs/may-2024/1716995348674.pdf "SEBI CC collateral and exposure rules, 29 May 2024"
[S36]: https://www.sebi.gov.in/sebi_data/attachdocs/jul-2021/1626778249298.pdf "SEBI segregation and monitoring of client collateral, 20 July 2021"
[S37]: https://www.nseclearing.in/risk-management/capital-market/liquid-assets "NCL liquid assets and valuation"
[S38]: https://www.nseindia.com/all-reports "NSE official report catalogue"
[S39]: https://www.mcxccl.com/risk-management/collaterals "MCXCCL collaterals"
[S40]: https://www.mcxccl.com/risk-management/faq "MCXCCL risk-management FAQ"
[S41]: https://www.bseindia.com/markets/MarketInfo/DownloadAttach.aspx?attachedId=8f5c9ef9-01f6-4e7a-af30-46888adbe5fa&id=20250115-39 "ICCL risk-management primary attachment"
[S42]: https://nsearchives.nseindia.com/content/circulars/COMP73594.pdf "NSE March 2026 MTF compliance certificate"
[S43]: https://nsdl.com/nsdl/2026-07/Fees_and_Charges_to_Depository_Participants-updated.pdf "NSDL published DP fee schedule"
[S44]: https://nsdl.co.in/downloadables/December-2010.pdf "NSDL December 2010 bonus-on-pledge explanation — historical"
[S45]: https://zerodha.com/tos/mtf "Zerodha published MTF terms — provider-specific example"
[S46]: https://noticeblue.com/circulars/85ae56c3-7873-45d0-a002-badd0a602c9a "Secondary reproduction of BSE 20261001-36"
[S47]: https://www.bseindia.com/downloads/UploadDocs/Notices/20261001-36/20261001-36.pdf "BSE primary attachment — retrieval blocked"
[S48]: https://www.teamleaseregtech.com/updates/article/58310/bse-issued-a-notification-regarding-operational-guidelines-for-handlin/ "Secondary lead for BSE CUSPA operational guidelines"
[S49]: https://www.nseindia.com/static/products-services/equity-derivatives-risk-management-sec-ban "NSE security ban period"
[S50]: https://www.nseindia.com/static/regulations/additional-surveillance-measure-equity-derivatives "NSE additional surveillance margins"
[S51]: https://www.nseindia.com/static/regulations/additional-surveillance-measure "NSE ASM framework"
[S52]: https://noticeblue.com/circulars/d2323423-97e0-4db7-a277-aa5851b4c900 "Secondary lead for BSECL pledge release API"
[S53]: https://www.smifs.com/files/downloads/638960753399387979_Additional%20guidelines%20in%20respect%20of%20Margin%20Obligations%20to%20be%20given%20by%20way%20of%20Pledge%20or%20Re-pledge%20in%20the%20NSDL%20Depository%20System.pdf "NSDL/POLICY/2025/0140 primary circular facsimile hosted by SMIFS"

[S54]: https://www.cdslindia.com/eservices/Publications/DownloadFile?eventID=DP2026-250&method=communique "CDSL 2026/250 carrying SEBI pledged-share lock-in mechanism"
[S55]: https://www.cdslindia.com/eservices/Publications/DownloadFile?eventID=DP2026-188&method=communique "CDSL 2026/188 discontinuation of separate EPI accounts"

## Gaps and cautions

| Gap / caution | What was not verified or must not be assumed | Operational consequence / next evidence |
|---|---|---|
| Exhaustiveness to cutoff | [unknown] Complete inventory of every amendment, member-only notice and schema change through 15 October 2026. Numerous primary documents were retrieved, but public search is not a completeness certificate. | Reconcile against exchange/depository participant circular registers before production sign-off. |
| June 2026 MTF consultation | [unknown] A final adoption circular after the consultation was not located. | Do not enable LLP/₹5 crore, NCD funding, altered exposure formula or proposed reporting time on consultation evidence alone. [S13] |
| Current net-worth computation | [unknown] Exact replacement of old Schedule VI references in the current MTF certificate template after the 2026 regulations. | Obtain NSE/BSE's applicable net-worth computation format; the recast itself is verified. [S09] |
| Numerical MTF security/group caps | [unknown] Universal single-security or related-group percentages beyond the verified 10% single-client rule. | Adopt documented board risk limits; do not label an invented percentage as SEBI law. [S02], [S07] |
| Group I exit | [unknown] Definitive universal funded-position deadline for simple Group I removal without T2T/suspension. | NSE FAQ cross-refers a narrower 2004 circular; obtain written interpretation instead of importing the 2026 proposal. [S10], [S12], [S13] |
| Eligible securities snapshot | [unknown] Full approved MTF/collateral ISIN universe for 15 October 2026 was not downloaded and frozen. | Ingest dated exchange Group I and CC collateral/haircut files; keep list versions. |
| Initial-margin forms | [verified] Broker and SECC masters use different wording. [S01], [S07] | [unknown] definitive reconciliation permitting instruments beyond clearly supported cash/cash-equivalent/Group I equity/equity ETFs. |
| MTM cash versus non-cash | [verified] NSE Q7 and Q15 differ. [S10] | [unknown] authoritative reconciliation; use a documented conservative policy pending exchange confirmation. |
| Net-worth deadline counting | [verified] Paragraph 3's 60/45-day descriptions differ from paragraph 4's named 31 May/15 November dates. [S08] | Verify exchange calendar and holiday handling; don't silently substitute computed dates. |
| Stale reporting deadline | [verified] SECC annexure retains noon; operative text/amendment says 18:00 T+1. [S07], [S05] | Use amended deadline and update legacy templates. |
| Client demat location | [unknown] Any current venue-specific restriction requiring a client to use the broker's own DP; none established here. | Same-depository validation is verified; do not convert it into a same-DP rule. [S20] |
| MTF manual acceptance / square-off | [unknown] Universal T+3 17:00/T+4 or other numerical regulatory clock. | Auto-pledge and manual OTP paths differ; document actual exception policy and depository response. [S15], [S23] |
| UNPAIDMTF production pack | [unknown] Current complete filename grammar, column/order rules, versioning, upload paths and rejection catalogue; NCL ZIP circular packages were not successfully downloaded. | Obtain latest CC member pack; verified logical label/FAQ timings are not an integration contract. [S15] |
| NCL FAQ staleness | [verified] February-2026-path FAQ Q42 still says direct-payout implementation date is awaited, despite current NCL direct-payout page and CDSL 2025 reports. [S15], [S16], [S26] | [unknown] full rollout/phase history; verify current schedules rather than assuming file publication date means every answer is current. |
| Settlement timings conflict | [verified] NCL settlement FAQ lists normal securities pay-in 11:00, while the public NSE settlement page has described 10:30. [S15], [NSE settlement page](https://www.nseindia.com/static/products-services/equity-market-securities-settlement) | [unknown] one universally applicable production pay-in cutoff; consult dated settlement schedule. UNPAIDMTF cutoff is a separate clock. |
| NSDL technical detail | [unknown] Current API endpoints, authentication, callback signatures, complete schemas/status/rejection dictionaries and OTP/link expiries. | Do not invent endpoint names, form-field codes or timing parity with CDSL. |
| Historical CDSL codes | [verified] 2020 transaction status numbers and 2024/2025 reason codes have different purposes. [S23], [S24], [S24b] | [unknown] complete current UDiFF-to-legacy status mapping; do not conflate them. |
| BSE / ICCL coverage | [unknown] Current MTF approval workflow, daily-report full specification, CC unpaid/MTF equivalent, exact release API pack and CUSPA annexure; primary requests encountered access failures. | Secondary BSE notice leads remain [uncertain]; request official participant packages. [S46], [S48], [S52] |
| MCXCCL detail | [unknown] Full live collateral release/re-pledge interface, file grammar and cutoff pack; collateral framework verified only. | Do not copy NCL equity settlement operations into commodity clearing. [S39], [S40] |
| 2025 effective-date conflict | [verified] Original SEBI pledge amendment says 5 September; extension recital says 1 September; final date 10 October 2025 is explicit. [S17], [S18] | Preserve the inconsistency in history; use final effective date. |
| CUSPA future dates | [verified] New NSE provisions begin 31 October 2026; extension relief 3 January 2027. [S33] | [unknown] any later postponement not located; do not apply six-day auto-release or exceptional extensions as current at 15 October. |
| Reasonable notice | [unknown] Universal fixed notice duration or one template satisfying every pledge/contract. | February 2026 circular requires reasonable notice undertaking; existing CUSPA one-trading-day rule and future CUSPA amendment require separate treatment. [S30], [S01], [S33] |
| Corporate actions | [unknown] Complete current CDSL/NSDL handling for every bonus, split, merger, rights, redemption and re-pledge chain. | Historical NSDL bonus explanation is not sufficient for all 2026 action types. [S44] |
| Ban / ASM / GSM / suspension | [unknown] Universal resulting haircut, blanket pledge prohibition, or automatic release rule. | Apply security-specific exchange/CC instructions; keep derivative trading restrictions separate from collateral eligibility. [S49]–[S51] |
| 2026 pledged-share lock-in | [unknown] Full current DP-level treatment of invocation, transfer, release and corporate actions for non-transferable-marked pledged shares. | Obtain implementation annexures; distinguish this mechanism from an ordinary lock-in. [S54] |
| Pledge expiry / portability | [unknown] Universal confirmed-pledge expiry semantics or inter-depository migration retaining encumbrance. | Do not infer automatic release from OTP expiry, maturity date or a nominal agreement end date. |
| Rates / fees | [unknown] Greenfield broker's interest tariff, day-count, capitalization, tax basis and retail pledge charges; current NSDL MTF-specific rate confirmation remains incomplete. | Publish contractual tariff; use depository fees only at the layer they describe. [S20], [S43], [S45] |
| Current client-document pair | [unknown] Fully reconciled latest NSE+BSE MTF rights/obligations and risk-disclosure templates. | Obtain official templates; the recommended checklist is not a replacement. |
| Implementation readiness | [unknown] Live entitlements, account mappings, participant approval settings and vendor behavior. | This research establishes evidence and gaps; it does not certify an untested production integration. |

# RESEARCH — Contract Notes and Near-Real-Time Client Confirmations (Indian stockbroker, NSE/BSE/MCX)

**Compiled:** 2026-10-15
**Purpose:** source material for the Finix greenfield-broker operations manual.
**Scope:** the contract note obligation; the electronic contract note (ECN) regime; whether any intraday / provisional / "virtual" contract note regime exists; the daily margin statement; other mandated or permitted near-real-time client artefacts; the statement-of-accounts cadence and annual statements; and prohibitions bearing on indicative data.

### Evidence tags used throughout

| Tag | Meaning |
|---|---|
| `[verified]` | Text read directly from a primary instrument (SEBI circular/regulation, exchange/CC circular). Reference number, date and URL given. |
| `[likely]` | Not read in the primary instrument, but two or more independent sources corroborate. Both named. |
| `[uncertain]` | Single source, dated source, or an inference the analyst is drawing. Flagged as such. |
| `[unknown]` | Not established in this pass. Named as a procurement gap rather than filled with a guess. |

**Notified vs effective:** every dated row below distinguishes the date of the instrument from the date its obligation bites. Where a timeline was extended, the extension chain is shown.

**Method note / limitation:** the web-search budget for this session was exhausted before research began. All findings were assembled from (a) primary PDFs fetched directly from `sebi.gov.in` and `nsearchives.nseindia.com`, and (b) a pre-existing primary-source corpus in this workspace, including the full text of the SEBI Master Circular for Stock Brokers, the SEBI (Stock Broker) Regulations 2026 gazette, the FUTP Regulations, the NSE Inspection Master Circular (both 2025 and 2026 editions), and a 45,739-row index of every NSE/NCL circular from 1 April 2019 to 30 September 2026. `mcxindia.com` and `bseindia.com` both return HTTP 403 to non-browser clients from this environment, so BSE and MCX coverage is thinner and is marked accordingly.

---

## 0. BOTTOM LINE — THE ANSWERS, UP FRONT

| # | Question | Answer |
|---|---|---|
| 1 | Contract note timing | **24 hours of execution of the contract.** Confirmed in four separate places in the SEBI Master Circular for Stock Brokers. A competing formulation — "within one working day of the execution of the trades" — appears in the mandatory Rights & Obligations document annexed to the same circular. Design to the 24-hour rule. `[verified]` |
| 2 | Is there an intraday / provisional / preliminary / "virtual" contract note regime in India? | **No. None. It does not exist as a regulatory artefact.** Zero hits across the complete SEBI Master Circular for Stock Brokers, the SEBI (Stock Broker) Regulations 2026, the NSE Inspection Master Circular (Apr 2026), and all 45,739 NSE/NCL circulars Apr-2019 → Sep-2026. "Virtual contract note" is a **product idea, not a regulatory artefact**. |
| 2a | May a broker issue a provisional/indicative confirmation intraday, in addition to the contract note? | **Yes — and in several respects you are already required to.** The regime mandates order confirmation on submission, real-time display of order/trade confirmations on the broker's website, trade confirmation by e-mail/mobile with same-day trade history, and a pre-order display of brokerage and levies. These are indicative, pre-settlement figures that SEBI affirmatively requires. `[verified]` |
| 2b | Any regulatory bar, or labelling requirement? | **No bar.** No labelling rule attaches to a voluntary provisional confirmation specifically. But four generic constraints apply: quotes must be **time-stamped**; a broker's ticker/quote/order book must show **time stamp and source**; what you charge must be **true to label**; and FUTP reg 4(2)(p) makes **predating or falsifying a contract note or client account statement** a fraud, not a mere compliance breach. `[verified]` |
| 2c | Is there a prescribed "trade confirmation" artefact distinct from the contract note? | **Yes.** SEBI's internet-based-trading and wireless-trading frameworks prescribe a named **"Order/Trade Confirmation"**, separate from and additional to the contract note. `[verified]` |
| 2d | Do SEBI/exchanges require immediate trade confirmation by SMS/email/app, and on what timeline? | **Yes, but the clock is end-of-day, not real-time, for the mandatory legs.** Exchanges send transaction details direct to investors **by the end of the trading day** by SMS and e-mail. Broker-side: order confirmation **on submitting the order**; trade confirmation via e-mail/mobile with same-day history; real-time display on website. Where a PoA is executed, a daily scrip-wise buy/sell summary with average rates by SMS/e-mail. `[verified]` |
| 3 | Daily margin statement timing | **Changed in 2025.** Previously end of T day itself; since **11 June 2025** it must be issued **before the beginning of the trading session on the next trading day**. It is therefore explicitly *not* an intraday artefact. `[verified]` |
| 5 | Statement of accounts cadence | **Weekly** (Mon–Sat, dispatched within the next four trading days of the following week), plus a settlement-time statement with retention explanation within 5 days, plus the Annual Global Transaction Statement within 30 days of FY end. **Conflict:** the SEBI Investor Charter annexure says "monthly"; NSE's live rule is weekly. `[verified]` |
| 5a | Annual signed statement | **SEBI and NSE disagree.** SEBI Master Circular para 23.9: as on 31 March each year a signed hard-copy statement of balances "shall be sent to all the clients". NSE Inspection Master Circular item 4.5(x): the same statement "shall be sent to the clients **only upon request**". `[verified]` both — unresolved. |
| 6 | Prohibition on presenting unconfirmed figures as final | No rule says "do not show a client an unreconciled number". The hard prohibitions are against **falsifying or predating** the contract note / client account statement (FUTP 4(2)(p)), **knowingly** disseminating false or misleading information (FUTP 4(2)(k)), **mis-selling** (FUTP 4(2)(s)), and charging other than true-to-label. `[verified]` |

---

## 1. THE CONTRACT NOTE OBLIGATION

### 1.1 The legal stack — four layers

| Layer | Instrument | What it says about contract notes | Tag |
|---|---|---|---|
| **Statute-level regulation** | SEBI (Stock Broker) Regulations, 2026, **Chapter VIII (Code of Conduct), reg. 37 "Duty to the investor"**, clause (c) | "issue a **contract note** to its client, **within specified timeline**, for all transactions **in the form specified**" | `[verified]` |
| | same, reg. 37(b) | "**promptly inform its client about the execution or non-execution of an order**, and make payment or delivery of securities due to the investor within the timelines specified by Board" — a regulation-level duty of prompt execution advice, **separate from** the contract note | `[verified]` |
| | same, reg. 15(1)(h) | books/records to be kept include "**Copy of contract notes issued to clients**" | `[verified]` |
| | same, reg. 16 | those records to be preserved for a **minimum period of eight years** | `[verified]` |
| **SEBI circular** | Master Circular for Stock Brokers, **SEBI/HO/MIRSD/MIRSD-PoD/P/CIR/2025/90, 17 June 2025**, para **24.4** | "Member brokers shall issue the contract note for purchase/sale of securities to a client **within 24 hours of the execution of the contract**." | `[verified]` |
| | same, para **53.1(e)(i)** (internet-based trading conditions) | "Contract notes must be issued to clients as per existing regulations, **within twenty-four hours of the trade execution**." | `[verified]` |
| | same, Annexure — **Investor Charter for Stock Brokers**, activity 6 | "Issuance of contract notes — **24 hours of execution of trades**" | `[verified]` |
| | same, Annexure — **Rights & Obligations** document, clause 29 | "The stock broker shall send contract notes to the investors **within one working day of the execution of the trades** in hard copy and/or in electronic form using digital signature." | `[verified]` |
| **Exchange regulation** | **NSE Regulation 3.5.3** (as reproduced in the NSE Inspection Master Circular) | "every Stock Broker / Trading Member shall issue a contract note to its clients for trades executed **in such format as may be prescribed by the Exchange** from time to time with all relevant details … issued in such manner and **within such time as prescribed by the Exchange**" | `[verified]` |
| **Exchange circular** | NSE Inspection Master Circular **NSE/INSP/73976, 29 April 2026**, Item 2 | consolidates the format, continuation-sheet, serial-numbering, signature, ECN and STP rules. **Notably it does not restate a clock time** — it defers to the regulation, so SEBI's 24 hours governs. | `[verified]` |
| **Commodity** | MCX Compliance Guide (Member Compliance Department, March 2015), citing MCX Bye-law 4.7, Business Rule 27(p) and a chain of circulars | "Members are required to **dispatch and ensure that the same are delivered** to their clients **within 24 hours of execution of the trade**" and "Contract Notes **must be delivered** within 24 hours of the transactions … and the **proof of delivery** of the same needs to be preserved" | `[verified]` as text; `[uncertain]` as to currency — see §1.10 |

### 1.2 The 24-hour rule — reading it precisely

| Point | Position | Tag |
|---|---|---|
| The figure | **24 hours**, measured from **execution of the contract / trade execution** — not from trade date, not from settlement | `[verified]` SEBI MC 24.4 and 53.1(e)(i) |
| Calendar or business hours? | The SEBI text says "24 hours" without qualification. The Rights & Obligations clause says "one working day". **No circular reconciling the two was located.** Over a Friday trade or a trading holiday these diverge. | `[uncertain]` — divergence is `[verified]`, the reconciliation is `[unknown]` |
| Practical design rule | Issue on T evening and in all cases before the next trading session opens. This satisfies both formulations simultaneously and aligns the contract note with the daily margin statement deadline (§3), which *is* expressly "before the beginning of trading session on the next trading day". | `[uncertain]` analyst recommendation |
| Also within 24 hours | Payment to clients / delivery of purchased securities within 24 hours of pay-out, unless the client requests otherwise (MC 24.3). Settlement of running-account funds within 24 hours of pay-out (MC 3020-series text). Distinct obligations — do not conflate with the contract note clock. | `[verified]` |
| Enforcement reality | "**Delay in issue of Contract notes to the clients**" is a named line item in NSE's published list of common inspection deficiencies, NSE/INSP/73503, 27 March 2026. | `[verified]` |
| T+0 tension | Under the optional T+0 cycle, pay-in/pay-out occur on T. A contract note issued at T+24h therefore lands **after** settlement has completed. No circular shortens the contract-note clock for T+0. | `[verified]` that no such circular exists in the NSE index to 30 Sep 2026; `[uncertain]` as the operational implication |

### 1.3 Prescribed contents — the current format

The operative format is prescribed by **NSE/INSP/61999, 13 May 2024**, Annexure A/B (format lineage: NSE/INSP/35036 of 5 Jun 2017 → NSE/INSP/39158 of 15 Oct 2018 → NSE/INSP/45879 of 30 Sep 2020 → NSE/INSP/51772 of 25 Mar 2022 → NSE/INSP/61999 of 13 May 2024). Two variants: **Annexure A = "Contract Note cum Tax Invoice"** (tax invoice under s.31 of the GST Act), **Annexure B = contract note with the tax invoice issued separately**. `[verified]`

**Masthead / header block** `[verified]`

| Field | Note |
|---|---|
| Name of the member, logo of the member | Group brand/logo may be used, but the member's own SEBI-registered name, own logo, registration number and full address with telephone numbers must be **more prominent** (SEBI MC 84.1(b); restated at NSE MC Item 2.1) |
| SEBI registration number | Where a consolidated contract note is issued across multiple exchange memberships, **all** SEBI registration numbers must be shown |
| Address, telephone, fax, website | |
| Name of compliance officer, his/her e-mail and telephone, e-mail ID for investor complaints | Mandatory on contract notes **and** on statements of funds and securities |
| Dealing offices address, telephone, fax | |
| Contract note number | Unique running serial, commencing from 1, **reset only at the start of each financial year (April–March)**. Contract notes must not be left blank. |
| Invoice Reference Number (IRN) | Annexure A (tax-invoice) variant |
| Trade date | |
| Clearing-corporation-wise / segment-wise settlement number and settlement date | |
| Name, address, State/State code (place of supply), PAN, UCC of client | |
| Trading / back-office code where different from the UCC | Must be shown exchange- and segment-wise in the table provided; where a client holds different exchange/segment-wise UCCs, insert an additional row |
| GSTIN of client, if available | |

**Transaction block — per ISIN / common contract, post-2024 revision** `[verified]`

The 2024 revision replaced per-exchange pricing with a **single volume-weighted average price across exchanges**:

| Field | Note |
|---|---|
| Security description | Each distinct security as its own line |
| BUY: quantity, WAP across exchanges, brokerage, total buy value | `WAP = total buy trade value for ISIN across exchanges ÷ total quantity bought across exchanges` |
| SELL: quantity, WAP across exchanges, brokerage, total sell value | same formula on the sell side |
| Net quantity, net obligation for ISIN (before levies) | |
| Position brought forward (derivatives, where applicable) | Exchange-wise brought-forward rows are **optional**; if omitted, the document must be called "Contract Note" and **not** "Contract Note cum Bill", and the "closing rate per unit (derivatives only)" column must be removed |
| ISIN | "ISIN details of securities traded in the Cash Segment shall be included in Bills/Contract Notes/Statements issued by the Stock Brokers to their clients" |
| Price precision | 2 or 4 decimal places — "the choice / arrangement between client/member" |

**Mandatory trade-detail annexure** `[verified]` — because the main sheet now shows netted/averaged obligations, the per-trade audit trail moves to an annexure:

> "The member shall ensure that details of trades such as **Contract number, Exchange, Order No., Order time, Trade No., Trade Time, Traded quantity, price etc.** is attached to the contract note as an **Annexure** when a consolidated obligation is shown in the contract note. The member-broker shall mention the words **'Exchange-wise details of orders and trades provided in separate annexure'**" — NSE/INSP/61999

**Levies and tax block** `[verified]`

| Field | Rule |
|---|---|
| Pay-in / pay-out obligation, per segment and total (net) | |
| Taxable value of supply | per applicable GST law |
| Securities Transaction Tax; Commodities Transaction Tax | **Consolidated figure** on the contract note. Trade-wise STT may optionally be shown; if not shown, it must be supplied annually/periodically on the client's specific request |
| CGST / SGST / IGST / UTT — rate and amount each | Displayed as CGST, SGST or IGST as applicable |
| Exchange transaction charges | **Combined across exchanges** in the revised format |
| SEBI turnover fees | |
| Stamp duty | |
| Net amount receivable by / payable by client | |
| What may appear at all | Only (a) statutory levies, recoverable **at actuals paid/payable**; (b) regulatory levies, at actuals, either itemised or under the head "Other levies, if any"; (c) brokerage as mutually agreed, within the exchange ceiling, with rates stated in a tariff sheet — NSE MC Item 2.4 |

**Footer / jurisdiction block** `[verified]` — governing rules/bye-laws/regulations clause; RAC arbitration and appellate arbitration availability with the exchange website references; date and place; QR code (Annexure A variant); PAN and GSTIN of the trading member; description and accounting code of services; name and signature / digital signature of partner, proprietor or authorised signatory.

**Mandatory labels and flags on the contract note itself** `[verified]`

| Trigger | Required marking |
|---|---|
| Securities liquidated by the member pursuant to a margin call the client failed to meet | "the contract note issued for such margin call related transactions shall carry an **asterisk or identifier** that the transaction has arisen out of margin call", and "the **remark column** in the contract note shall indicate the same against such trades" |
| Rights Entitlements | A prescribed verbatim **disclaimer** must be included: *"Purchase of REs only gives them the right to participate in the ongoing Rights Issue of the concerned company by making an application with requisite application money or renounce the REs before the issue closes. REs which are neither subscribed by making an application with requisite application money nor renounced, on or before the Issue Closing Date shall lapse and shall be extinguished after the Issue Closing Date"* |
| Fit and proper status of shareholders | The previously mandatory text was **relaxed** by SEBI/HO/MRD/MRD-PoD-2/P/CIR/2024/25, 24 April 2024 ("Ease of Doing Business: Text on Contract Note with respect to Fit and Proper status of shareholders"), circulated as NSE/INSP/61776, 26 April 2024 |
| Proprietary trading | MCX requires members to "**disclose proprietary-trading information on the contract notes** issued to clients" (MCX/T&S/147/2016, 17 May 2016, implementing SEBI/HO/CDMRD/DMP/CIR/P/2016/49 of 25 Apr 2016; compliance deadline 22 Jul 2016, continuing thereafter). Not spelled out equivalently for equity in the SEBI Master Circular. | 

### 1.4 Format mechanics

| Rule | Detail | Tag |
|---|---|---|
| Mandatory, not optional | "The contract note should **mandatorily** be in the prescribed format." The single-WAP revision is "**mandatory for all categories of clients** of Equity and Derivatives segment" | `[verified]` NSE MC Item 2.1 / FAQ Q-1 |
| Where it does **not** apply | OFS and offer-to-buy are bidding processes — revised format not applicable; debt segment not covered. Members may nonetheless use the new format for exchange-wise notes. | `[verified]` FAQ Q-2 |
| Block / bulk deals | Existing exchange-wise **reporting** unchanged, but "a combined contract note having single WAP across Exchanges shall be issued for trades executed under block or bulk deal to the clients" | `[verified]` FAQ Q-4 |
| Consolidated vs per-segment | Broker's choice: "may opt to issue a single consolidated contract note or issue separate contract notes for different segments/Clearing Corporations" | `[verified]` NSE MC Item 2.1 (format) |
| Continuation sheets | Permitted where one client's trades will not fit. Main sheet must be in the prescribed format; each continuation sheet must carry: member name (pre-printed), member SEBI registration number (pre-printed), client name, trading code and UCC, contract note number, settlement number, signature of the **same** signatory who signed the main sheet, page number running from the main sheet, and all the boxed detail (order number, trade number, trade time, security/contract description, quantity, kind of security, purchase/sale rate, brokerage, net rate, amount). Stationery control numbers must be serially pre-printed and a control record kept for printing and usage. | `[verified]` |
| Stationery | "shall be printed and issued in a readable font. The same **need not be on a pre-printed stationary**." | `[verified]` |
| Contract note cum bill | Permitted "without diluting the form prescribed for contract note" | `[verified]` |
| Serial numbering on cutover | "Serial Number of the contract notes issued in the prescribed format shall commence from the first trade executed on the date of initial issue in the new format." | `[verified]` |
| Who may **not** issue it | "Contract Notes should **not be generated and issued by the AP**. However, AP may provide administrative assistance in procurement of documents from the Stock Broker / Trading Member, after maintaining proper records." NSE's AP-inspection scope (NSE/COMP/63628, 28 Aug 2024) tests that contract notes, statements of funds and daily margin statements are not generated or issued by the authorised person. | `[verified]` |

### 1.5 Signing

| Mode | Requirement | Tag |
|---|---|---|
| **Digital signature** | "Brokers are allowed to issue contract notes authenticated by means of digital signatures **provided that the broker has obtained digital signature certificate from Certifying Authority under the Information Technology Act, 2000**." All ECNs sent by e-mail "shall be **digitally signed, encrypted, non-tamperable** and shall comply with the provisions of the IT Act 2000. In case the ECN is sent through e-mail as an attachment, the **attached file shall also be secured** with the digital signature, encrypted and non-tamperable." | `[verified]` SEBI MC 52.1, 52.2, 52.3.4 |
| **Physical — wet signature** | "signed either by the Member himself or by the authorised signatory" | `[verified]` (MCX guide); NSE equivalent implied by the facsimile relaxation below |
| **Physical — facsimile / scanned signature** | Permitted, subject to: adequate controls and procedures; a **well-documented policy** approved by the board (corporates) / partners / proprietor, specifying use procedure, controls and the procedure on change of authorised signatories; signatories specifically board-approved for contract-note use; and **use must cease from the date a signatory ceases to hold office**. Risk allocation is explicit: "Any contract note issued with facsimile/scanned signature shall be **deemed to have been signed** by the authorized signatory notwithstanding any misuse … and the **ultimate responsibility to prove its genuineness shall rest with the Stock Broker / Trading Member**." | `[verified]` NSE MC Item 2.1.1 |

### 1.6 The ECN regime — consent, delivery, bounce handling

Source authority: **SEBI MC paras 23.2 and 52**, which footnote the underlying circulars **SMDRP/POLICY/CIR-56/00 (15 Dec 2000)**, **SEBI/SMD/SE/15/2003/29/04 (29 Apr 2003)**, **MRD/DoP/SE/CIR-20/2005 (8 Sep 2005)** and **MIRSD/SE/CIR-19/2009 (3 Dec 2009)**; plus **CIR/MIRSD/16/2011 (22 Aug 2011)** cited by NSE/INSP/52604; para 52.3.6 was "amended vide SEBI Master Circular for Stock Brokers dated August 09, 2024". Restated at **NSE/INSP/73976 Item 2.2**. All `[verified]`.

| Stage | Requirement |
|---|---|
| **Authorisation (MC 23.2.1 / 52.3.1)** | (a) in **writing** and **signed by the client only** — not by an authorised person on his behalf and **not by a holder of the Power of Attorney**; (b) the **e-mail ID shall not be created by the broker** — the client must create/provide his own; (c) the authorisation must contain a clause that any **change of e-mail ID is communicated by physical letter**, except that internet clients may request the change through secured access by client-specific user ID and password. |
| **Consent / opt-in (52.3.2)** | Digitally signed ECNs "may be sent **only to those clients who have opted** to receive the contract notes in an electronic form, either in the Member–Client agreement / Tripartite agreement **or by a separate letter**. The **mode of confirmation shall be as per the agreement** entered into with the clients." |
| **Primary delivery channel (52.3.3)** | "The **usual mode of delivery** of ECNs to the clients shall be **through e-mail**. For this purpose, the client shall provide an appropriate e-mail account to the member **which shall be made available at all times** for such receipts of ECNs." |
| **Authentication (52.3.4)** | digitally signed + encrypted + non-tamperable + IT Act 2000 compliant; the attachment itself likewise secured. |
| **Acknowledgement (52.3.5(a))** | "The **acknowledgement of the e-mail shall be retained** by the member in a **soft and non-tamperable form**." |
| **Proof of delivery (52.3.5(b))** | "The proof of delivery i.e., **log report generated by the system at the time of sending the contract notes** shall be maintained by the member for the specified period under the extant regulations of SEBI/stock exchanges and shall be **made available during inspection, audit, etc.**" |
| **The deemed-delivery clause (52.3.5(b)(ii))** | "The member shall **clearly communicate to the client in the agreement** executed with the client for this purpose that **non-receipt of bounced mail notification by the member shall amount to delivery of the contract note at the e-mail ID of the client**." NSE's 2026 restatement widens the vehicle to "the agreement / **client registration documents**". The client-side mirror of this is Rights & Obligations clause 37. |
| **Bounce log (52.3.5(c))** | "The log report shall **also provide the details of the contract notes that are not delivered** to the client / e-mails rejected or bounced back." And: "the member shall take **all possible steps (including settings of mail servers, etc.)** to ensure **receipt of notification of bounced mails** by the member at all times within the stipulated time period." |
| **Simultaneous website publication (52.3.7(a))** | "**In addition to** the e-mail communication of the ECNs … the member shall **simultaneously publish the ECN on his designated web-site in a secured way** and enable relevant access to the clients." |
| **Website access (52.3.7(b))** | The member "shall **allot a unique user name and password** for the purpose, with an option to the client to access the same and **save the contract note electronically or take a print out**". |
| **Archive (52.3.7(c))** | Retain/archive such electronic documents per extant SEBI/exchange rules. |

**The three-channel architecture is cumulative, not alternative:** e-mail is the "usual mode"; the website copy is "in addition to" and "simultaneous"; SMS/instant messaging is an "additional mode" the client must be offered a choice about. A design that publishes only to the app, or only e-mails, is non-compliant. `[uncertain]` — synthesis of the three verified provisions.

### 1.7 ECN dispatch log retention — what the obligation actually resolves to

| Element | Position | Tag |
|---|---|---|
| The retention duty | Explicit. The log report is the **proof of delivery** and must be produced at inspection/audit. | `[verified]` |
| The period, as stated in the ECN rules | **Not stated.** Both SEBI MC 52.3.5(b) and NSE MC 2.2.4.2 say "for the **specified period under the extant regulations** of SEBI/stock exchanges" — a cross-reference, not a number. | `[verified]` |
| What the cross-reference resolves to **today** | **Eight years.** SEBI (Stock Broker) Regulations 2026 reg. 15(1)(h) lists "Copy of contract notes issued to clients" among the books/records, and reg. 16 requires records under reg. 15 to be preserved "for a **minimum period of eight years**". NSE's 2026 Inspection Master Circular Item 7.1 restates exactly this, footnoted "Amended vide Regulation 16 of Stock Broker Regulation 2026". | `[verified]` |
| What it resolved to **before** 7 Jan 2026 | **Five years**, under reg. 18 of the SEBI (Stock Brokers) Regulations 1992 — stated in terms at SEBI MC 83.1. The 1992 Regulations stand repealed by reg. 51(1) of the 2026 Regulations. | `[verified]` |
| Parallel floor | **Five years** under Rules 14–15 of the SCRR 1957 ("a period ranging from two years to five years"; NSE restates Rule 15 as five years). The eight-year SEBI figure is the binding one. | `[verified]` |
| Whether "the dispatch log" is itself a reg.-15 record | Reg. 15(1)(h) names the **contract note copy**, not the dispatch log. The log is the proof-of-delivery artefact, retained under the ECN circulars by reference to "the specified period". Treating both on the same eight-year clock is the conservative reading. | `[uncertain]` analyst reading — the ECN circulars do not resolve this expressly |
| Enforcement-agency override | "if a copy is taken by such enforcement agency either from physical or electronic record then the **respective original is to be maintained till the trial or investigation proceedings have concluded**" | `[verified]` SEBI MC 83.3; NSE MC 7.1 |
| MCX's own figure | The MCX Compliance Guide states counterfoils/duplicate copies of contract notes are preserved "for a period of **three years**". This is **below** the SEBI floor and should be disregarded in favour of the eight-year rule. | `[verified]` as text; `[uncertain]`/superseded as a rule |

### 1.8 Physical fallback and the SMS/instant-messaging alternative

**SEBI MC 52.3.6**, as amended by the August 2024 master circular, restated at NSE MC 2.2.5. All `[verified]`.

| Situation | Required action |
|---|---|
| Client did **not** opt for electronic form | "the member shall **continue to send contract notes in the physical mode** to such clients" |
| Client opted for ECN, but the ECN **was not delivered or bounced** | Send a contract note "**within the stipulated time** under the extant regulations" — i.e. still inside the 24-hour window — by **either** (i) **a physical contract note**, **or** (ii) an **ECN through electronic instant messaging services**, and **maintain the proof of delivery** of such contract notes |
| Safeguards on the SMS / instant-messaging route | • sent only to applications **linked to the registered mobile number / e-mail ID of the client as uploaded by the member on the Exchange portal/database**; • sent **as an attachment and not as a link**; the attached file "may be secured with the digital signature, encrypted, non tamperable and **password protected**"; • messages **not** to be covered under the **auto-delete facility** at the member's option; • all ECNs sent **from the same ID**, with logs maintained of **sent / delivered / seen / not delivered / blocked**; • "**In case of not delivered/blocked etc, member shall issue physical contract note**" |
| Source | NSE/INSP/52604, 10 June 2022, "Issuance of Electronic Contract Notes (ECN) through SMS/electronic instant messaging services", which also confirms the pre-existing requirements (website publication, website access, ECN log, physical on bounce) "**should continue to be applicable**" |

**The fallback ladder, as designed:** e-mail ECN → (bounce or non-delivery) → instant-messaging ECN as a secured attachment → (not delivered / blocked) → physical contract note. All legs inside 24 hours, all legs logged. `[uncertain]` — synthesis, but each rung is `[verified]`.

Addressing rule (commodity): "Delivery of contract notes to an address (**either email or physical address**) **other than that of the Client** will be deemed to be **non-delivery** of the contract notes." `[verified]` as MCX text (MCX/COMP/046/2011); `[uncertain]` as to whether an identically worded equity rule exists.

Revocation of ECN (commodity): the client may revoke and opt for physical "by giving **7 working days' notice** to the Member", a copy of which the client retains; the ECN declaration "shall be valid till it is **revoked by the client**"; the declaration form must be **bi-lingual** where the client is not conversant with English (MCX/COMP/087/2014, 19 Mar 2014; revised ECN guidelines MCX/COMP/406/2014, w.e.f. 26 Dec 2014). `[verified]` as MCX text; `[unknown]` whether an equity equivalent of the 7-working-day revocation notice exists.

### 1.9 The institutional path — STP, and the Common Contract Note

| Item | Detail | Tag |
|---|---|---|
| STP as the institutional channel | "In case of **Institutional clients**, the practice of issuing contract notes **through STP** may be continued." | `[verified]` NSE MC Item 2.1 (format) |
| Legal status | "SEBI **extended the facility of issuance of ECNs as a legal document using Straight Through Processing (STP)** to the equity derivatives segment and provided a **model contract note in electronic form IFN 515** messaging format and **confirmation of electronic contract note IFN 598** messaging format." | `[verified]` NSE MC Item 2.3 |
| Current format | "The Exchange in consultation with SEBI prescribes the format of STP IFN 515 from time to time. Accordingly, remarks of Mandatory Subsequence D3 (Amounts) — **Column 19A** of the format of IFN515 has been modified from '**To identify the brokerage**' to '**To identify the brokerage and other permissible charges**'." Revised format at Exhibit 16 of NSE/INSP/73976, sourced to **NSE/INSP/73521, 27 March 2026, "Revision in STP INF515 Format"**. | `[verified]` |
| Direction to vendors | "STP centralized hub and the STP service providers are directed to make the necessary changes to their STP system" | `[verified]` NSE/INSP/61999 |
| **Common Contract Note (CCN)** — what it is | The clearing-side plumbing for the single-WAP consolidated note across interoperable exchanges. NCL supplies members and custodians a **daily** `NCL_APPLICABLE_SYMBOL_DDMMYYYY.csv` mapping ISIN → NSE symbol, BSE scrip code, MSEI symbol → a single "Applicable Symbol", with a **Settlement Flag** (1 = T+1, 0 = T+0); plus a daily `NCL_TM_mapping_ddmmyyyy.csv` to custodians. | `[verified]` NCL/CMPT/66083, 10 Jan 2025; preceded by NCL/CMPT/64656, 22 Oct 2024 (FAQs) |
| CCN rollout | Heavily tested: member/custodian interface testing circulars through Apr–Jun 2025 (NCL/CMPT/67467, 67479, 67524, 67547, 67664, 67926, 67976, 68118, 68224, 68389, 68525, 68601; NSE/INSP/68202 on broker UAT/mock participation). | `[verified]` from the NSE circular index |
| Debt | A separate contract note format is prescribed for **tri-party repo trades on the TRM platform** in the debt segment (Exhibit 15 of NSE/INSP/73976; original NSE/INSP/57417, 3 Jul 2023). | `[verified]` |
| Cross-currency | A separate format exists for cross-currency derivatives contracts (NSE/INSP/37471, 9 Apr 2018), with the main format carrying a "Gross Rate/Trade Price per unit (in foreign currency)" column, converted to INR on the RBI reference rate as at the transaction date. | `[verified]` |

### 1.10 The single-WAP cutover timeline — notified vs effective

| Date | Instrument | Effect |
|---|---|---|
| 13 May 2024 | NSE/INSP/61999 | Revised format notified; **"comply with the revised format with effect from August 01, 2024"** |
| 6 Aug 2024 | NSE/INSP/63289 | Extension of timeline |
| 10 Sep 2024 | NSE/INSP/63859 | FAQ issued (after ISF discussion) |
| 6 Nov 2024 | NSE/INSP/64929 | Extension of timeline |
| 29 Jan 2025 | NSE/INSP/66373 (NCL/CMPT/66399, 30 Jan) | Extension of timeline |
| 19 Mar 2025 | NSE/INSP/67200 (NCL/CMPT/67256, 24 Mar) | Extension of timeline |
| 29 Apr 2025 | NSE/INSP/67759 (NCL/CMPT/67760) | Extension of timeline |
| **18 Jun 2025** | **NSE/INSP/68618** (NCL/CMPT/68625, 19 Jun) | **"the timeline for aforesaid compliance has been revised to June 27, 2025 (Trade Date)"** — final |
| through 30 Sep 2026 | — | **No further contract-note-format circular appears in the NSE index.** The single-WAP format has been live since trade date 27 June 2025. `[verified]` |

**BSE and MCX:** NSE/INSP/61999 frames the change as one "Exchanges" made jointly and consulted on with SEBI, and the prescribed format itself names NSE, BSE and MSEI and directs clients to each exchange's website. It is therefore `[likely]` that BSE (and MCX for commodities) issued matching notices on matching dates — corroborated by (i) the cross-exchange construction of the format itself and (ii) the explicit "across exchanges" WAP that is only meaningful if every exchange mandates it. **The BSE notice numbers and the current MCX contract-note circular are `[unknown]`** — `bseindia.com` and `mcxindia.com` both returned HTTP 403 from this environment. **Procure before writing exchange-specific numbers into the manual.**

**MCX currency caution.** The MCX Compliance Guide text quoted above is dated **March 2015**, i.e. before the FMC–SEBI merger of September 2015 and before every circular in §1.3–1.9. Three of its statements are now clearly superseded and must not be carried into the manual: "All contract notes issued to the **individual** investors other than the corporate investors will be **in physical form**"; "The Member shall **not issue consolidated contract notes** to the clients"; and the **three-year** preservation period. Use it only for the propositions that SEBI-level instruments independently confirm (24-hour dispatch, serial numbering, separate brokerage disclosure, proof of delivery, ECN declaration). `[uncertain]`

---

## 2. THE KEY QUESTION — IS THERE ANY INTRADAY / PROVISIONAL / PRELIMINARY / "VIRTUAL" CONTRACT NOTE REGIME IN INDIA?

### 2.0 Answer, stated plainly

**No. There is no regulatory regime, artefact, form, label or circular for an intraday, provisional, preliminary or "virtual" contract note in India.** The contract note is a single, final, once-per-settlement, digitally signed instrument. The phrase "virtual contract note" is a **product name a broker might coin for a UI feature** — it is not a regulatory artefact, it has no prescribed format, no prescribed timing, no prescribed contents, and no circular acknowledges it. A manual that presents it as a compliance deliverable would be wrong.

**That is not the same as saying you may not build one.** The regime already requires brokers to show clients pre-final, pre-settlement, indicative figures at several points, and the most useful of those requirements — a real-time order/trade confirmation display and a pre-order charge estimate — is precisely the substrate a "virtual contract note" product would sit on. The honest framing for the manual is: *the artefact is a voluntary product built on top of mandatory real-time confirmation duties, and it must not be called, formatted as, or substituted for, the contract note.*

### 2.1 The negative-search evidence

| Corpus searched | Coverage | Query terms | Hits |
|---|---|---|---|
| SEBI Master Circular for Stock Brokers, SEBI/HO/MIRSD/MIRSD-PoD/P/CIR/2025/90 (full text, ~982 KB, 18,279 lines) | all 100+ paragraphs and 23 annexures, current as of today | "provisional contract", "virtual contract", "preliminary contract", "interim contract", "indicative contract", "intraday" + "contract note" | **0** |
| SEBI (Stock Broker) Regulations, 2026 (full gazette text) | the whole instrument incl. Chapter VIII Code of Conduct | same | **0** |
| NSE Inspection Master Circular NSE/INSP/73976, 29 Apr 2026 (174 pages, ~65k words) | Item 2 Contract Notes in its entirety | same | **0** |
| NSE/NCL circular index, 1 Apr 2019 → 30 Sep 2026 | **45,739 circulars** across 22 departments | "provisional contract note", "virtual contract note", "preliminary contract note", "interim contract note", "indicative contract note" | **0** |
| same index | same | "provisional" alone | 19 hits — **all** either algo-provider provisional empanelment, provisional sub-broker/UCI code lists, or provisional order-rejection reports. **None** relates to a client-facing trade document. |
| SEBI FUTP Regulations 2003 (as amended to 5 Dec 2025) | whole instrument | same | **0** |

All `[verified]` as negative results. The only places the word "provisional" attaches to anything settlement-related in the SEBI Master Circular are **para 43.34, Stage 3 of the CC default management process — "Close-out of positions and provisional appropriation of collateral"** in the default-handling waterfall, and the clause that "the aforesaid pro-rata attribution of shortages shall be **provisional**" — a clearing-corporation default mechanic, not a client document. `[verified]`

**Read this negative result for what it is.** 45,739 exchange circulars over seven and a half years and the complete current SEBI and NSE consolidations contain no such artefact. This is not an absence of evidence; it is evidence of absence.

### 2.2 (a) May a broker issue a provisional or indicative confirmation intraday or immediately post-trade, in addition to the contract note?

**Yes — and for several of these you have no choice.** The following are all mandatory, all pre-contract-note, and all show the client numbers that are not yet final:

| Mandated near-real-time artefact | Exact requirement | Source | Tag |
|---|---|---|---|
| **Order confirmation on submission** | "All orders and trades must be identified by a **unique ID**. **Order confirmation must be provided to the user on submitting the order.** Order modification / cancellation facilities must also be provided." | SEBI MC 54.3.2 (WAP); MC 55.3.7 (wireless technology) | `[verified]` |
| **Order acceptance/rejection advice** | "The broker systems should be capable of assessing the risk of the client as soon as the order comes in. **The client should be informed of acceptance/rejection of the order within a reasonable period.**" | SEBI MC 53.1(d)(ii) (IBT) | `[verified]` |
| **Real-time display of order/trade confirmations on the broker website** | "Order/Trade confirmation should also be sent to the investor through email at client's discretion at the time period specified by the client **in addition to the other mode of display of such confirmations on real time basis on the broker web site**. The investor should be allowed to **specify the time interval** on the web site itself within which he would like to receive this information through email." | SEBI MC 53.1(c)(v) (IBT) | `[verified]` |
| **Trade confirmation by e-mail / mobile** | "**Trade confirmation should be provided to the user through e-mail and/or on the mobile phone.**" | SEBI MC 54.3.3 (WAP) | `[verified]` |
| **Trade confirmation with same-day trade history** | "**Trade confirmation should be provided to the user, along with history of trades for the day.**" | SEBI MC 55.3.7 (wireless) | `[verified]` |
| **Reports on margin, payment and delivery obligations through the system** | "Reports on **margin requirements, payment and delivery obligations**, etc. should be informed to the client **through the system**." | SEBI MC 53.1(d)(iii) (IBT) | `[verified]` |
| **Pre-order display of brokerage and levies** | "the details of **brokerage/charges to be levied for each order** shall be **prominently displayed** to the investor on the '**Order placement window/screen**' on their Internet Based Trading (IBT) / Wireless Trading (WT) applications **prior to placement of order**" | NSE/INSP/53939, 3 Oct 2022; extended by NSE/INSP/54746, 7 Dec 2022 and NSE/INSP/55031, 28 Dec 2022; **effective 31 January 2023** | `[verified]` |
| **Secured website view of position, margin, statements** | "The stock brokers having own web-sites shall display all the documents executed by a client, **client's position, margin and other related information, statement of accounts, etc.** in the web-site and allow **secured access by way of client-specific user id and password**." | SEBI MC 23.7 | `[verified]` |
| **Daily scrip-wise position summary where PoA is executed** | The PoA must "**Authorize the stock broker/depository participant to send consolidated summary of Client's scrip-wise buy and sell positions taken with average rates to the client by way of SMS / email on a daily basis**, notwithstanding any other document to be disseminated as specified by SEBI from time to time." | SEBI MC 36.8.1.9 | `[verified]` |

**The pre-order charge display is the decisive precedent.** It is, by construction, an **estimate** of charges on a trade that has not happened yet, displayed to a retail client on a phone screen, and SEBI made it **mandatory**. A regulator that compels an indicative pre-trade figure cannot coherently be read as prohibiting an indicative post-trade one. `[uncertain]` as a legal argument; both components `[verified]`.

**Mobile is expressly allowed to show less.** "As it may not be possible to give detailed information to the investor on a hand held device e.g. mobile phones, it may be ensured that **minimum information may be given with addresses of the Internet web site/web page where detailed information would be available**." — SEBI MC 55.3.6. This is direct authority for a summary-on-app / detail-on-web split, which is exactly how a provisional confirmation product would be built. `[verified]`

### 2.3 (b) Is there any regulatory bar on doing so, or any labelling requirement?

**No bar was located.** The following constraints do apply, and together they define the labelling discipline a provisional confirmation should observe:

| Constraint | Exact text | Source | Tag |
|---|---|---|---|
| **Time-stamp and source on displayed market data** | "**Ticker/quote/order book displayed on the web-site of the broker should display the time stamp as well as the source of such information against the given information.**" | SEBI MC 53.1(c)(iv) | `[verified]` |
| **Time-stamp on quotes** | "**Stock quotes should be time-stamped.**" | SEBI MC 54.3.1 | `[verified]` |
| **Unique ID on every order and trade** | "All orders and trades must be identified by a **unique ID**"; "Broker Web Server should have **internally generated unique numbering for all client order/trades**" | SEBI MC 54.3.2, 54.4.4, 53.1(i)(iii) | `[verified]` |
| **Audit trail** | "All transaction logs with proper audit facilities to be maintained in the system"; "Brokers should maintain all activities/alerts log with audit trail facility"; "sound audit trails should be available for all transactions conducted using wireless devices" | SEBI MC 53.1(g)(iv), 54.4.3, 55.3.9 | `[verified]` |
| **No voluntary clause may dilute the broker's responsibility** | "any voluntary clause / document added by the stock brokers shall form part of the **non-mandatory documents**. The stock broker shall ensure that any voluntary clause/document shall **neither dilute the responsibility of the stock broker** nor shall it be in conflict with any of the clauses in the mandatory documents … **Any such clause introduced … shall stand null and void.**" | SEBI MC 21.3 | `[verified]` |
| **Charges must be true to label** | The amount charged to an end client as an MII levy must be the amount actually received by that MII; broker/DP remuneration must not be presented under an "exchange", "SEBI", "stamp" or "depository" label. | SEBI/HO/MRD/TPD-1/P/CIR/2024/92, notified 1 Jul 2024, **effective 1 Oct 2024** | `[verified]` |
| **Levies only at actuals on the contract note** | Statutory and regulatory levies "may be recovered from client **only at actuals paid/Payable**" | NSE MC Item 2.4 | `[verified]` |

**The practical reading for the manual:** SEBI MC 21.3 is the clause that matters most. A provisional confirmation is a **voluntary, non-mandatory document**. It therefore (i) cannot dilute the broker's contract-note responsibility, (ii) cannot conflict with the contract note, and (iii) any disclaimer in it that purported to exclude the broker's liability for the eventual contract note "shall stand null and void". A disclaimer may legitimately say *this figure is indicative and will be superseded by the contract note*; it may **not** say *the broker is not responsible for differences*. `[uncertain]` — the application is the analyst's; MC 21.3 is `[verified]`.

### 2.4 (c) Is there a prescribed "trade confirmation" artefact distinct from a contract note?

**Yes.** SEBI's internet- and wireless-trading frameworks carry a named heading, **"Order/Trade Confirmation"** (IBT, MC 53.1(c)(v)) and **"Price Quotes/Order/Trade Confirmations"** (WAP, MC 54.3), under which order confirmation and trade confirmation are prescribed as **separate obligations from the contract note**, which appears under its own heading **"e. Contract Notes"** immediately afterwards (MC 53.1(e)(i)). The two are structurally distinct in the instrument itself. `[verified]`

| Dimension | Order / Trade Confirmation | Contract Note |
|---|---|---|
| Source | SEBI MC 53.1(c)(v), 54.3, 55.3.7 — footnoted to SMDRP/POLICY/CIR-06/2000 (31 Jan 2000), FITTC/DC/CIR-1/98 (16 Jun 1998), SMDRP/POLICY/CIR-48/2000 (11 Oct 2000), CIR/MRD/DP/25/2010 (27 Aug 2010) | SEBI MC 24.4, 52, 53.1(e)(i); SB Regs 2026 reg. 37(c); NSE Reg. 3.5.3 |
| Timing | Order confirmation **on submission**; trade confirmation with same-day history; website display **on a real-time basis**; e-mail at a **client-chosen interval** | Within **24 hours** of execution |
| Format | **No prescribed format** | Exchange-prescribed format, mandatory, single-WAP, with trade-detail annexure |
| Signing | **No digital-signature requirement** | Digital signature under the IT Act 2000 (electronic), or wet / policy-controlled facsimile (physical) |
| Legal character | Service/transparency obligation | "the prime document on the basis of which all the dispute between the Member and his clients are settled" (MCX Compliance Guide); establishes the contractual obligation |
| Retention | Via transaction logs and audit trail | Eight years under SB Regs 2026 reg. 16 |
| Can one substitute for the other | **No.** MC 53.1(f)(ii): "in addition to the requirements mentioned above, **all existing obligations of the broker as per current regulation will continue without changes**" | — |
| Also distinct | **STP IFN 598 "confirmation of electronic contract note"** is a third, institutional artefact: a confirmation *of* an ECN, not a confirmation in place of one | `[verified]` NSE MC Item 2.3 |

### 2.5 (d) Do SEBI or the exchanges require immediate trade confirmation to clients by SMS / e-mail / app, and on what timeline?

| Who sends | What | Timeline | Source | Tag |
|---|---|---|---|---|
| **Stock exchanges, direct to the investor** | "Stock Exchanges shall **send details of the transactions to the investors, by the end of trading day, through SMS and E-mail alerts**." Applies to the **equity cash and derivative segments**. Generated on the investor's **PAN**, and sent only after the investor confirms the contact details the broker uploaded. | **End of trading day** — not real-time | SEBI MC 34, footnoted to **CIR/MIRSD/15/2011, 2 August 2011**, SEBI communication SE/10118 of 12 Oct 1992, and **SEBI/HO/MIRSD/MIRSD-PoD1/P/CIR/2024/169, 3 December 2024**; circulated as NSE/INSP/65403 (4 Dec 2024) and NSE/INSP/65679 (19 Dec 2024) | `[verified]` |
| Broker's upload duty feeding that channel | Brokers must upload client name, mobile number, correspondence address and e-mail, preferably in sync with the UCC updation module; must **not** upload employee/remisier/AP contact details on a client's behalf; must upload a **separate mobile/e-mail for each client**, with a narrow exception, on the client's **specific written request**, for one "family" (self, spouse, dependent children, dependent parents) or the authorised person of an HUF (Karta or a co-parcener with Karta's prior approval), partnership (a partner with all/authorised partners' prior approval), trust (a trustee or beneficiary per resolution) or corporate (the authorised person per board resolution). Exchanges verify by SMS, e-mail or letter; discrepancies, non-confirmation, bounced e-mails or undelivered SMS are reported back to the broker. Expenses met from the 20% of listing fees set aside for investor services. | | SEBI MC 34.2–34.6; NSE/INSP/65679 reiterates that inspections find brokers breaching the single-contact rule | `[verified]` |
| **Broker, on the order** | Order confirmation on submission; acceptance/rejection advice "within a reasonable period" | **Immediate / on submission** | SEBI MC 54.3.2, 55.3.7, 53.1(d)(ii) | `[verified]` |
| **Broker, on the trade** | Trade confirmation by e-mail and/or mobile phone, with history of trades for the day; plus real-time display on the broker website; plus e-mail at a client-specified interval | **Real-time (website) / client-chosen interval (e-mail) / same day (history)** | SEBI MC 53.1(c)(v), 54.3.3, 55.3.7 | `[verified]` |
| **Broker, where PoA executed** | Consolidated scrip-wise buy/sell positions with average rates by SMS/e-mail | **Daily** | SEBI MC 36.8.1.9 | `[verified]` |
| **Depositories, direct to the beneficial owner** | Alerts on the registered mobile for **all debits and other important transactions** in the demat account, direct from the depository. Participants with websites must display a prescribed ticker urging mobile-number updation, whose own text says alerts arrive "**on the same day**". | **Same day** | NSDL Master Circular for Depository Participants, citing NSDL/POLICY/2008/0059 (1 Sep 2008) and NSDL/POLICY/2010/0010 (28 Jan 2010) | `[verified]` |
| Margin-due intimations | "Issuance of intimations regarding other margin due payments — **At the end of the T day**" | **End of T day** | SEBI MC Investor Charter, activity 8 | `[verified]` — note the tension with §3 below |

**So: nothing in the regime requires a *real-time* push notification of a trade.** The mandatory push legs are end-of-day (exchange SMS/e-mail), same-day (depository debit alerts, trade history), or client-chosen interval (broker e-mail). The only genuinely real-time requirement is a **pull**: the broker's website must display order/trade confirmations on a real-time basis. A broker that pushes an instant app notification on fill is doing more than the regime requires — which is permitted, and is where the "virtual contract note" idea actually lives.

### 2.6 What, then, is a "virtual contract note"?

| Framing | Assessment |
|---|---|
| A regulatory artefact | **No.** Established above — zero occurrences across every corpus searched. |
| A prescribed form or format | **No.** `[verified]` |
| A recognised exchange submission or file | **No.** Not in 45,739 NSE/NCL circulars. `[verified]` |
| A product name for a UI surface that renders the client's provisional, intraday, pre-settlement obligation — net position, estimated charges, estimated net payable — built on the mandatory real-time order/trade confirmation display and the mandatory pre-order charge estimate | **Yes. This is what it is.** `[uncertain]` — the analyst's characterisation, grounded in the verified absence plus the verified presence of the underlying duties. |

**Recommended language for the manual:** describe it as an **"intraday trade confirmation view"** or **"provisional obligation view"**, never as a contract note of any adjective. Reserve the words "contract note" for the signed 24-hour instrument. Three reasons, in descending order of force: (i) FUTP 4(2)(p) makes falsification of a contract note a fraud, so do not create ambiguity about which document is the contract note; (ii) SEBI MC 21.3 voids voluntary clauses that conflict with mandatory documents; (iii) NSE's prescribed format reserves the heading "CONTRACT NOTE" / "CONTRACT NOTE CUM TAX INVOICE" with a specified masthead. `[uncertain]` as advice; each underlying provision `[verified]`.

### 2.7 Design rules for a provisional confirmation product

Derived, not prescribed — every row is the analyst's inference from a verified provision, and the manual should present it as design guidance rather than as compliance obligation. `[uncertain]` throughout.

| Rule | Grounded in |
|---|---|
| Name it anything but a contract note; never let it carry the prescribed masthead | NSE prescribed format; FUTP 4(2)(p) |
| Label every figure as indicative/provisional and state that the contract note governs | SEBI MC 21.3 (cannot conflict with or dilute the mandatory document) |
| Time-stamp it, and show the source of the market data it uses | SEBI MC 53.1(c)(iv), 54.3.1 |
| Carry the unique order ID and trade ID on every line | SEBI MC 54.3.2, 54.4.4 |
| Log it with a full audit trail, and be able to reproduce what the client saw and when | SEBI MC 53.1(g)(iv), 54.4.3, 55.3.9 |
| Compute estimated charges on the same engine, and at the same actuals, as the contract note | True to label; NSE MC 2.4 "only at actuals paid/Payable" |
| Mark margin-call square-offs in it, as the contract note must | NSE MC Item 2.1 and 2.1(i) (asterisk/identifier; remark column) |
| Do not let it substitute for the contract note, the daily margin statement, the weekly statement of accounts, or the exchange's own EOD SMS/e-mail | SEBI MC 53.1(f)(ii) "all existing obligations … will continue without changes" |
| Do not let an authorised person generate or issue it, by analogy with the contract note rule | NSE MC Item 2.1; NSE/COMP/63628 |
| Keep its disclaimer free of liability exclusions | SEBI MC 21.3 ("shall stand null and void") |
| Expect it to compete for app landing-page space | Project Jagrook — see §6 |

---

## 3. THE DAILY MARGIN STATEMENT

### 3.1 The obligation and its 2025 timing change

| Element | Position | Source | Tag |
|---|---|---|---|
| The duty | "The stock broker shall send **daily margin statements** to the clients." | SEBI MC Annexure — Rights & Obligations, clause 32 | `[verified]` |
| Underlying SEBI authority | Brokers "should issue a **daily statement of collateral utilization** to clients which shall include, inter-alia, details of collateral deposited, collateral utilised and collateral status (available balance / due from client) with break up in terms of **cash, Fixed Deposit Receipts (FDRs), Bank Guarantee and securities**" | SEBI MC 25.1.4, footnoted to **MRD/DoP/SE/CIR-11/2008, 17 April 2008** | `[verified]` |
| **Original timing** | "the margin statement is required to be issued by the members to the clients on a **daily basis at the end of the trade day (T day) itself**" — SEBI's clarification by letter dated 18 January 2018 | NSE/INSP/36786, 19 January 2018, which also cites NSE/INSP/10239 (11 Feb 2008), NSE/INSP/10605 (21 Apr 2008) and NSE/INSP/19583 (14 Dec 2011) | `[verified]` |
| **Current timing — changed 2025** | "In view of representations received from **Broker's Industry Standards Forum (ISF)** and after consideration of the same by SEBI, it has been decided to revise the aforesaid timeline … and accordingly, **with effect from the date of issuance of this circular, margin statement is required to be issued by member on a daily basis before the beginning of trading session on the next trading day**." | **NSE/INSP/68487, 11 June 2025** (circular ref. 39/2025); mirrored by **NCL/CMPL/68590, 17 June 2025** | `[verified]` |
| Effective date | **11 June 2025** — "with effect from the date of issuance of this circular". No transition period. | NSE/INSP/68487 | `[verified]` |
| Confirmed still current | NSE Inspection Master Circular **NSE/INSP/73976, 29 April 2026, Item 3.2**: "Such margin related information (Daily margin statement) should be issued by Trading Members to clients on a daily basis **before the beginning of trading session on the next trading day** or by such timelines as may be specified from time to time", footnoted to NSE/INSP/68487. | NSE/INSP/73976 Item 3.2 | `[verified]` |
| FAQ consequence | The 2025 circular expressly **modified Question 21** of the consolidated FAQ on Margin Collection & Reporting in the NSE Inspection Master Circular of 30 April 2025. The earlier text (Q-16 of NSE/INSP/45191) had read "at the end of the trade day (T-Day) itself". | NSE/INSP/68487; NSE/INSP/45191 | `[verified]` |

### 3.2 May the daily margin statement be intraday?

**No, and the 2025 change moved it decisively away from intraday.** The timeline migrated from *end of T day* to *before the next trading session opens* — i.e. it was relaxed **later**, not earlier. There is no intraday margin-statement obligation. `[verified]`

Note the residual tension to flag in the manual: the **Investor Charter** annexed to the June 2025 SEBI Master Circular still lists "Issuance of intimations regarding other margin due payments — **At the end of the T day**". NSE's operative instruction, issued eleven days before that master circular was published and restated in April 2026, is "before the beginning of trading session on the next trading day". `[verified]` both; the reconciliation is `[unknown]`. A broker that issues on T evening complies with both — which is the safe build.

Separately, intraday margin *monitoring* obligations do exist and must not be confused with the client statement: margin is "computed in **real time** at client level by the CC and is aggregated at the level of CMs"; "The day to day **real time risk management** with respect to client / TM exposure, and the margin requirement **shall continue to be the responsibility of the CM**, and **CC shall not monitor the client level exposure against the available client level collateral in real time**" (SEBI MC 42.12.1–42.12.3). `[verified]` Real-time client-level risk is a **broker/CM** function; the regulator does not require you to publish it to the client intraday.

### 3.3 Prescribed contents

Current format: **Exhibit 19 of NSE/INSP/73976**, sourced to the indicative format in **Annexure B of NSE/INSP/45191, 31 July 2020** ("Guidelines/clarifications on Margin collection & reporting"), which superseded the Annexure A format of NSE/INSP/36786, 19 January 2018. The 2018 field list is set out below because it was recoverable in full in this pass; the 2020 Annexure B is `[unknown]` at field level. `[verified]` / `[unknown]` as marked.

| Block | Fields (per the 2018 Annexure A) |
|---|---|
| Identification | Client code; client name; exchange; segment; trade day |
| Margins available till T day | A = Funds; B = Value of securities (**after haircut**); C = Bank guarantees / FDR; D = Any other approved form of margins (as the Exchange/CC specifies from time to time); **E = Total margins available (A+B+C+D)** |
| Margin required by Exchange/CC end of T day | F = Initial margin; G = Exposure margin; **H = Total margin (F+G)** |
| Excess / shortfall | **I = E − H** |
| Member's own additional requirement | **J = Additional margin required by member as per RMS** |
| Margin status | **K = I − J** (balance with member / due from client) |
| Mandatory footer | "Daily Margin statement to mention the **name, email id, telephone number and address of compliance officer**" |
| Exhibits | "Detailed exhibits for the margin collected **may** be provided to the clients. In case of securities (**scrip name, qty, value**), Bank Guarantee (**BG no, amount, expiry date**) and FDR's (**FDR No., Amount and Maturity date**)" |
| Status of the format | "**indicative**" — "stipulating the **minimum** information to be provided to clients". A broker may add, not subtract. |
| 2018 note now superseded | The 2018 Annexure A note 1 read "Daily Margin Statement to be issued on **T-Day itself**" — superseded by NSE/INSP/68487. |

### 3.4 Companion obligations

| Obligation | Detail | Source | Tag |
|---|---|---|---|
| Collateral records | Records must cover: receipt of collateral from client **and the acknowledgement issued to the client on receipt**; client authorisation for deposit with the exchange/CC/clearing house towards margin; record of deposit with the exchange/CC; record of **return** of collateral to client; **credit of corporate action benefits** to clients. Records to be **periodically reconciled with the actual collateral deposited**. | SEBI MC 25.1.2–25.1.3 | `[verified]` |
| No other use of client collateral | "adequate systems and procedures in place to ensure that client collateral is **not used for any purposes other than** meeting the respective client's margin requirements / pay-ins", with "proper audit trail of use of client collateral" | SEBI MC 25.1.1; restated NSE MC 3.2 | `[verified]` |
| Cross-reference clause | The **weekly statement of accounts** "shall **necessarily contain a clause** intimating the client that the client needs to **refer to the daily margin statement** for any pending/outstanding margin obligation of the trades executed by the client in case the margin obligations are posted in the client ledger" | NSE MC Item 4.5(vii) | `[verified]` |
| Who may not issue it | Not the authorised person | NSE/COMP/63628, 28 Aug 2024 | `[verified]` |
| Penalty exposure | SEBI's deficiency list item 18: "**Daily margin statement and quarterly statements not sent to clients**". NSE's 2026 common-deficiencies circular lists "**Non-issuance/ delay in issuance of Daily Margin Statement to clients**" and "**Issuance of Daily Margin Statement to clients with incorrect/incomplete details**" as separate findings. | SEBI MC deficiency annexure; **NSE/INSP/73503, 27 March 2026** | `[verified]` |

---

## 4. OTHER NEAR-REAL-TIME CLIENT ARTEFACTS THAT ARE MANDATED OR PERMITTED

### 4.1 The broker's own surfaces

| Artefact | Requirement | Cadence | Source | Tag |
|---|---|---|---|---|
| Client-specific secured website area | Must display **all documents executed by the client, the client's position, margin and other related information, statement of accounts, etc.**, with secured access by client-specific user ID and password | Continuous | SEBI MC 23.7 | `[verified]` |
| ECN copy on the designated website | ECN **simultaneously** published in a secured way, with a unique username and password per client, and the ability to save or print | Per contract note | SEBI MC 52.3.7 | `[verified]` |
| Real-time order/trade confirmation display | See §2.2 | Real time | SEBI MC 53.1(c)(v) | `[verified]` |
| Pre-order charge display | Brokerage and levies for each order, on the order placement window, **before** placement | Pre-trade | NSE/INSP/53939 / 54746 / 55031, effective **31 Jan 2023** | `[verified]` |
| Ticker/quote/order book with time stamp and source | See §2.3 | Real time | SEBI MC 53.1(c)(iv) | `[verified]` |
| Margin / payment / delivery obligation reports via the system | See §2.2 | "through the system" | SEBI MC 53.1(d)(iii) | `[verified]` |
| Investor-protection content on the trading website | Rules affecting client-broker relationship, arbitration rules, investor-protection rules, plus a **prominent hyperlink** to the relevant exchange page displaying rules/regulations/circulars | Continuous | SEBI MC 53.1(c)(iv) | `[verified]` |
| Risk disclosures | Prescribed risk disclosures displayed to all clients in the specified manner, which "shall be displayed prominently", with the client **prompted to read** them | Per login/session as specified | SEBI MC 49, referencing **SEBI/HO/MIRSD/MIRSD-PoD-1/P/CIR/2023/73, 19 May 2023** | `[verified]` |
| Inactive-account policy | Policy covering time period, return of client assets and reactivation procedure, displayed on the website | Continuous | SEBI MC 23.8 | `[verified]` |
| Identity block on every client document | SEBI-registered name, own logo, registration number, full address with telephone numbers, compliance officer's name, telephone and e-mail — on **contract notes, statements of funds and securities, and correspondences with clients** | Every document | SEBI MC 84.1(b), footnoted to **CIR/MIRSD/9/2010, 4 November 2010** | `[verified]` |
| Order-evidence retention | Trades executed only after keeping evidence of the client placing the order: physical signed record, telephone recording, e-mail from an authorised e-mail ID, log for internet transactions, record of SMS messages, or any other legally verifiable record. In exceptional cases where the broker cannot produce order-placing evidence, "other appropriate evidences like **post trade confirmation by client**, receipt/payment of funds/securities by client in respect of the disputed trade, etc. shall also be considered." | Per order | SEBI MC 35.2–35.4 | `[verified]` |

Note the last row carefully: SEBI itself treats a **post-trade confirmation accepted by the client** as corroborative evidence in a dispute. That is an affirmative reason to build and log a provisional confirmation — it strengthens the broker's evidential position on unauthorised-trading complaints. `[uncertain]` as the inference; the provision is `[verified]`.

### 4.2 The disaggregated client collateral web portal

| Element | Position | Source | Tag |
|---|---|---|---|
| Framework | "Segregation and Monitoring of Collateral at Client Level", to protect client collateral from (i) misappropriation/misuse by TM/CM and (ii) default of the TM/CM and/or other clients | SEBI MC 43, footnoted to **SEBI/HO/MRD2_DCAP/CIR/2021/0598, 20 July 2021** | `[verified]` |
| Reporting chain | **TM reports** disaggregated collateral information **up to the level of its clients to the CM**; **CM reports** disaggregated information up to the level of the TM's clients **and** the TM's proprietary collateral **to the exchanges and CCs**, per segment | SEBI MC 43.2(a) | `[verified]` |
| Disaggregation axes | **segment-wise and asset-type-wise** break-up of each client's collateral | SEBI MC 43.2(a) | `[verified]` |
| Data points | TM→CM: client collateral **received by TM**, **retained by TM**, **placed with CM**. CM→SE/CC: the same three, plus client collateral **retained by CM** and **placed with CC** | SEBI MC 43.2(b), Table 11 | `[verified]` |
| Reporting frequency | "The aforementioned information shall be required to be reported on a **daily basis**" | SEBI MC 43.2(c) | `[verified]` |
| **The client-facing portal** | "A **web portal facility shall be provided by the CCs/SEs to allow clients to view** aforesaid **disaggregated collateral reporting by TM/CM**." | **SEBI MC 43.3** | `[verified]` |
| Portal refresh | "Information regarding the collateral allocated by the CM shall be made available **on a daily basis** on the web portal facility to clients to view disaggregated collateral reporting by TM/CM (refer Para 43.3). Further, **CC shall also provide a facility to the TMs** of the clients to view such collateral allocation to the clients by the CM." | **SEBI MC 43.15** | `[verified]` |
| **Not real time** | Daily. And SEBI MC 42.12.2 is explicit that the CC does not monitor client-level exposure against client-level collateral in real time. | | `[verified]` |
| Allocation discipline | CCs use the collateral allocation information "to ensure that the collateral allocated to a client is used towards the margin obligation of **that client only**". Securities collateral via margin pledge/re-pledge is already client-identified. Cash, FDs, BGs and SGL/CSGL G-secs must be **upfront allocated** by the CM, segment-wise, to CM proprietary / TM proprietary / client accounts. | SEBI MC 43.4–43.8 | `[verified]` |
| 50% cash-equivalent rule | CMs maintain at least 50% of total collateral in cash or cash equivalents; "the minimum 50% cash equivalent collateral requirement **may not be applied at the client level**", and a client's excess cash-equivalent collateral is not counted for another client or for TM/CM proprietary accounts | SEBI MC 43.16 | `[verified]` |
| Penalty for under-allocation | CCs put in place deterrent penalty structures, in consultation with SEBI, where allocated collateral plus securities re-pledged for a client falls short of the minimum margin collection requirement for that client in that segment | SEBI MC 43.14 | `[verified]` |
| Operational — current NSE portal | Members upload the segregated client collateral report via the **new NCL portal** at `https://ims.connect2nsccl.com/NCLMemberPortal/`, from **trade date 28 August 2025** (due date 29 Aug 2025), with dual running on both the old and new portals for trade dates 28 Aug – 12 Sep 2025. Super-admin resets the admin password and creates sub-users with the **NCL INSPECTION** role. Issues to `support@nsccl.co.in`. Earlier user manual: NCL/CMPL/49764, 29 Sep 2021. | **NCL/CMPL/69872, 26 Aug 2025**; reminders/extensions NCL/CMPL/70070 (5 Sep 2025), 70192 (12 Sep 2025), 70297 (19 Sep 2025), 70962 (24 Oct 2025) | `[verified]` |
| Reporting discipline, 2026 | FAQ confirms: error/own code must be reported with **account type "C"**; segregation must be reported **irrespective of margin obligation** wherever the member holds any client collateral, failure attracting penalty under Violation 1 of NCL/CMPL/50662 (17 Dec 2021); on a broker switching clearing member, the **existing CM reports on T day** and the **new CM from the next trading day** | **NCL/CMPL/76318, 11 September 2026** | `[verified]` |
| EGR segment | Collateral segregation extended to the Electronic Gold Receipts segment | NCL/CMPL/73989, 30 Apr 2026 | `[verified]` |
| Reconciliation hook to client statements | The weekly statement of accounts balance must **match the financial ledger balance (Clear) in the segregation-and-monitoring-of-collateral-at-client-level submissions** and the securities/commodities holding in the Holding Statement uploaded to the exchange **of the same date** | NSE MC Item 4.5(viii) | `[verified]` |

**This is the single most important near-real-time design constraint in the whole set:** the client can see, on a CC-run portal, a daily disaggregated view of their own collateral — received, retained and placed at each level. Any broker-side provisional display that disagrees with that portal will generate complaints the broker cannot win, because the portal's numbers come from the broker's own daily submission and must tie to the weekly statement of accounts. `[uncertain]` as the conclusion; every component `[verified]`.

### 4.3 Positions and ledger — is there a near-real-time requirement?

| Question | Answer | Source | Tag |
|---|---|---|---|
| Must positions be shown near-real-time? | **Not expressly as "real time".** SEBI MC 23.7 requires the website to display "client's position, margin and other related information" with secured access, but prescribes no refresh interval. The real-time wording attaches to **order/trade confirmations** on the website (53.1(c)(v)), not to positions. | SEBI MC 23.7, 53.1(c)(v) | `[verified]` |
| Must the ledger be shown near-real-time? | **No.** The ledger artefacts are the **weekly** statement of accounts, the settlement-time statement, and the annual statements (§5). No intraday ledger publication duty was located. | NSE MC Item 4.5; NSE MC Item 4.17 | `[verified]` for the cadences; `[unknown]` as to any contrary provision |
| Is there a daily position push? | Yes, but only where a **PoA** has been executed: a consolidated scrip-wise buy/sell summary with average rates, by SMS/e-mail, daily. | SEBI MC 36.8.1.9 | `[verified]` |
| What the regime *prohibits* the PoA doing | A PoA must not authorise the broker to **"Open an email ID/email account on behalf of the client(s) for receiving statement of transactions, bills, contract notes etc."**, nor to execute trades without the client's consent, nor to merge balances across accounts to nullify a debit elsewhere, nor to renounce liability for erroneously instructed fund blocks. | SEBI MC 36.9.1.8, 36.9.1.4, 36.9.1.7, 36.9.1.9 | `[verified]` |
| PoA/DDPI coercion | "The stock broker / stock broker and depository participant shall **not directly/indirectly compel** the clients to execute Power of Attorney (PoA) or Demat Debit and Pledge Instruction (DDPI) **or deny services** to the client if the client refuses" — so a daily-position-SMS feature must not be gated on a PoA | SEBI MC Rights & Obligations clause 34 | `[verified]` |
| Outage fallback — **withdrawn** | The **Investor Risk Reduction Access (IRRA) platform**, which let clients view positions and square off when their broker's systems failed, was **discontinued with immediate effect on 7 May 2026** (SEBI ref. HO/38/44/12(3)2025-MIRSD-TPD1/I/10705/2026). The manual must not promise IRRA. | SEBI circular 7 May 2026 | `[verified]` |
| Technical-glitch framework | Applies to IBT/STWT brokers with **more than 10,000 registered clients** (excluding closed accounts), measured as at the previous **31 March**; effective **9 January 2026** (SEBI ref. HO/38/44/12(1)2026-MIRSD-TPD1). A greenfield broker crosses into scope on the first 31 March at which it exceeds the threshold. | SEBI circular 9 Jan 2026 | `[verified]` |
| Blocked-amount channel | "Trading Supported by Blocked Amount in Secondary Market" — the cash blocked-money / 3-in-1 requirement is effective **1 February 2025**. Where used, the UPI block/debit confirmations are themselves near-real-time client-facing events that must reconcile to the ledger. | SEBI circular Nov 2024 | `[verified]` as the circular and date; `[unknown]` as to any prescribed client-notification timing inside it |
| Order/trade accessibility across channels | "Orders/trades placed through either fixed Internet or WAP system should be **accessible from both systems**" | SEBI MC 54.4.2 | `[verified]` |

---

## 5. STATEMENT OF ACCOUNTS CADENCE, THE ANNUAL SIGNED STATEMENT, AND 2025–2026 CHANGES

### 5.1 The cadence stack

| Artefact | Cadence / deadline | Contents | Source | Tag |
|---|---|---|---|---|
| **Weekly Statement of Accounts** for funds, securities and commodities | **Weekly, Monday to Saturday**, dispatched "**on or before the next four trading days of subsequent week**" | Complete statement per client; balances **after adjusting/reversing** open bills, uncleared cheques deposited or issued, and margin obligations posted in the client ledger, as at the **Saturday** of the week; **separately** disclose pending settlement pay-in/pay-out obligations of **all segments** and uncleared cheques; must carry the daily-margin-statement cross-reference clause; must state that the running-account authorisation continues until revoked; must carry the broker identity block; format at Exhibit 24 of NSE/INSP/73976 | **NSE/INSP/47227, 3 February 2021** (original; applicable from the week ending **6 March 2021**, due **12 March 2021**), restated at **NSE/INSP/73976 Item 4.5** | `[verified]` |
| Dispute window | Client to raise any dispute "**preferably within 7 working days** from the date of receipt of statement" | | NSE MC 4.5(ii) | `[verified]` |
| Exemption | Not required for clients with **zero funds, zero securities and zero commodities** balances **and** flagged **'Inactive'** in the exchange UCC database | | NSE MC 4.5(iii) | `[verified]` |
| **Inactive definition — CHANGED** | 2021 circular: no trades in the last **12 months** across all exchanges. 2025 and 2026 Inspection Master Circulars: no trades in the last **24 months** across all exchanges. | | NSE/INSP/47227 vs NSE/INSP/67804 and NSE/INSP/73976 | `[verified]` both; the circular that made the change is `[unknown]` |
| **E-mail is sufficient compliance** | "In respect of Stock Brokers / Trading Members who offer trading facility to their clients **through internet and provide to such clients an access to an on-line account viewing and print-out facility**, it would be treated as **sufficient compliance** of **Regulation 6.1.5(d) of Part A Chapter 6 of Capital Market Regulations** of the Exchange, if they **send the 'Statement of Accounts' by email** to such clients." | | NSE MC 4.5(iv) | `[verified]` |
| **Settlement-time statement** | "within **five days** from the date when the account is considered to be settled" | Extract from the client ledger for funds **and** securities, plus a **statement explaining the retention of funds/securities**. "The statement sent at the time of settlement shall be **adequate compliance for the purpose of sending quarterly statement of accounts** for funds/securities." | NSE MC 4.5(x) | `[verified]` |
| On request | "Notwithstanding anything contained above, Stock Broker / Trading Member shall issue the statement of accounts for funds, securities and commodities **for such period as may be requested by the client** from time to time." | | NSE MC 4.5(ix) | `[verified]` |
| Custodial participants | The requirements apply to CP clients only where the broker receives funds/securities/commodities from, or pays/delivers to, such CP clients **directly** and not through the custodian/clearing member | | NSE MC Item 4.5; NSE/INSP/47227 | `[verified]` |
| Register of securities format | ROS per the exchange-specified format, which "**shall mandatorily contain the 'execution date'** which shall be the date of actual movement (Receipt/Delivery) of securities". Format superseded by Annexure A of NSE/INSP/47227, replacing NSE/INSP/38743 (30 Aug 2018). Current formats for ROS, Holding Statement, Bank Book and Client Ledger at Exhibit 41 of NSE/INSP/73976. | | NSE MC 7.1–7.2 | `[verified]` |
| Block-mechanism carve-out | Securities lying in clients' demat accounts **under the block mechanism** at end of day must **not** be included in the weekly Holding Statement uploaded to the exchange | | NSE MC 7.1, referencing SEBI MC para 45 | `[verified]` |
| **Annual Global Transaction Statement (AGTS)** | "within **30 days from the end of the financial year**" | All transactions executed by the client in the financial year; consolidated for the entire FY; **each distinct security/commodity as a separate line item**; may be on **trade day or settlement day basis**; generated **PAN-wise**, but UCC-wise where one PAN has multiple UCCs (NRI clients, different UCCs across segments/exchanges); effect of **close-out/settlement/auction** transactions shown in the purchase/sale columns; **all charges mentioned in the contract notes** (STT/CTT, stamp duty, exchange transaction charges, SEBI turnover fees, etc.) provided appropriately; broker may add ISIN, average rate, net position; must be provided to **all** clients; further detail on client request. | **NSE/INSP/36731, 11 January 2018** (per SEBI letter dated 27 November 2017, applicable from **FY 2017-18**); restated with the expanded guidance at **NSE/INSP/73976 Item 4.17**, Exhibit 30 | `[verified]` |
| **Annual signed statement of balances — CONFLICT** | **SEBI:** "As on **31st March of every year**, a statement of balance of Funds and Securities **in hard form and signed by the broker shall be sent to all the clients**." (SEBI MC **23.9**) **NSE:** "Additionally, as on March 31 every year, the statement of balance of funds and securities in hard form and signed by the Stock Broker / Trading Member shall be sent to the clients **only upon request**." (NSE MC **4.5(x)**) | | SEBI MC 23.9 vs NSE/INSP/73976 Item 4.5(x) — **and the identical NSE wording appears in the 30 April 2025 edition (NSE/INSP/67804) at the same place**, so the relaxation is at least as old as April 2025 | `[verified]` both; the instrument that introduced "only upon request" is `[unknown]` |
| Running-account settlement | "**First Friday/Saturday of the month / quarter** as per Exchange **pre-announced schedule**"; retention statement "**5 days from the date of settlement**" | | SEBI MC Investor Charter activities 9 and 11; annual calendar at **NSE/INSP/72413, 20 January 2026** (prior years NSE/INSP/67207 of 20 Mar 2025, NSE/INSP/61164 of 15 Mar 2024) | `[verified]` |
| Grievance redressal | **21 calendar days** from receipt of the complaint | | SEBI MC Investor Charter activity 13 | `[verified]` |

### 5.2 The weekly-vs-monthly conflict

| Source | Says | Tag |
|---|---|---|
| **NSE/INSP/47227, 3 Feb 2021** | "the periodicity of 'Statement of Accounts' which is currently sent by members to clients on **quarterly or monthly (in case of commodities)** basis (within a month of the expiry of the calendar quarter) **is revised to weekly basis**" | `[verified]` |
| **NSE/INSP/48431, 28 May 2021** | Penalty structure specifically for "**Non-issuance of 'Statement of Accounts' … on weekly basis to clients**" — so weekly is live and penalised | `[verified]` |
| **NSE/INSP/73976, 29 Apr 2026, Item 4.5** | Weekly, unchanged | `[verified]` |
| **SEBI Master Circular, 17 Jun 2025, Investor Charter annexure, activity 10** | "'Statement of Accounts' for Funds, Securities and Commodities — **Monthly basis**" | `[verified]` |
| **SEBI Master Circular, Rights & Obligations annexure, clause 31** | "in such periodicity and format within such time, **as may be prescribed by the relevant Exchange**" | `[verified]` |

**Resolution for the manual:** Rights & Obligations clause 31 is the tie-breaker in the regulator's own document — periodicity is **whatever the exchange prescribes**. The exchange prescribes weekly, and penalises its absence. **Build weekly.** The Investor Charter's "monthly" is best read as a stale annexure entry, not as a relaxation. `[uncertain]` as the resolution; both horns `[verified]`. **Flag it to compliance before go-live rather than relying on this reading.**

### 5.3 2025–2026 changes worth carrying into the manual

| Date | Change | Status | Tag |
|---|---|---|---|
| **27 June 2025** (trade date) | Single-WAP-across-exchanges contract note format becomes mandatory, after six timeline extensions from 1 Aug 2024 | **Live** | `[verified]` NSE/INSP/68618 |
| **11 June 2025** | Daily margin statement deadline relaxed from "end of T day itself" to "**before the beginning of trading session on the next trading day**", on ISF representation | **Live, immediate** | `[verified]` NSE/INSP/68487; NCL/CMPL/68590 |
| **17 June 2025** | SEBI Master Circular for Stock Brokers re-issued as **SEBI/HO/MIRSD/MIRSD-PoD/P/CIR/2025/90**, superseding the 9 August 2024 edition. **Still the current edition as of today — no 2026 edition exists.** | **Current** | `[verified]` (SEBI master-circular listing checked 2026-10-15) |
| **26 Aug 2025** | Client collateral segregation reporting migrates to the new NCL member portal | **Live** (dual-run ended 12 Sep 2025) | `[verified]` NCL/CMPL/69872 |
| **30 Oct 2025** | AGTS guidance extended (per the footnote in NSE/INSP/73976 Item 4.17 citing NSE/INSP/71037) | **Live** | `[verified]` as the footnote; `[uncertain]` as to content — the index titles NSE/INSP/71037 "Prior instructions for initial public offering (IPO) bid placement", which does not match the AGTS context. **Possible footnote error in NSE's own master circular — verify before citing.** |
| **7 January 2026** | **SEBI (Stock Broker) Regulations, 2026** notified and brought into force on the date of Gazette publication (Gazette of India Extraordinary Part III §4, No. 16, 7 Jan 2026; F. No. SEBI/LAD-NRO/GN/2026/291), **repealing the SEBI (Stock Brokers) Regulations 1992** (reg. 51(1)). Record retention moves from **five years to eight years**. Contract-note duty restated as "within specified timeline … in the form specified". A standalone duty to "promptly inform its client about the execution or non-execution of an order" sits at reg. 37(b). | **In force** | `[verified]` |
| **9 January 2026** | Revised technical-glitch framework, >10,000-client threshold | **In force** | `[verified]` |
| **27 March 2026** | **STP IFN/INF 515 format revised** — institutional ECN messaging changes (NSE/INSP/73521) | **Live** | `[verified]` |
| **27 March 2026** | NSE publishes its current common-violations list, naming contract-note delay and daily-margin-statement failures (NSE/INSP/73503) | Guidance | `[verified]` |
| **29 April 2026** | **NSE Inspection Master Circular NSE/INSP/73976** supersedes NSE/INSP/67804 of 30 Apr 2025. This is the operative exchange consolidation for contract notes, margin statements and client statements. | **Current** | `[verified]` |
| **7 May 2026** | **IRRA platform discontinued**, immediate | **Withdrawn** | `[verified]` |
| **11 September 2026** | NCL FAQ on collateral segregation reporting mistakes (NCL/CMPL/76318) | Guidance | `[verified]` |
| **1 October 2026** | **Project Jagrook** investor-awareness messages: websites must carry SEBI's messages **and** the risk disclosures from **5–31 Oct 2026**; from **1 Nov 2026** the messages must appear on the **landing page** of the website. Trading apps: voluntary 5–31 Oct 2026 (and if displayed, risk disclosures become optional that day); from **1 Nov 2026 mandatory**, with the awareness messages and the risk disclosures on **alternate days**, on the app's **landing page**. Messages may be modified by SEBI from time to time. | **Notified; website mandatory from 1 Nov 2026; app mandatory from 1 Nov 2026** | `[verified]` SEBI ref. HO/38/24/(15)2026-MIRSD-PODMMC/I/22872/2026 |
| Not changed | No contract-note format, daily-margin-statement, statement-of-accounts or ECN circular appears in the NSE index between **20 June 2025 and 30 September 2026**. | | `[verified]` |

---

## 6. PROHIBITIONS, AND LABELLING OF INDICATIVE DATA

### 6.1 The hard prohibitions

| Provision | Exact text | Why it matters here | Tag |
|---|---|---|---|
| **FUTP reg. 4(2)(p)** | "an intermediary **predating or otherwise falsifying records including contract notes, client instructions, balance of securities statement, client account statements**" is deemed a manipulative, fraudulent or unfair trade practice | **The single most important prohibition in this research.** Back-dating a contract note, or editing a client account statement to match an earlier provisional figure, is not a compliance lapse — it is a deemed fraud under the FUTP Regulations. Contract notes and client account statements are named expressly. | `[verified]` |
| **FUTP reg. 4(2)(k)** | "**disseminating information or advice through any media, whether physical or digital, which the disseminator knows to be false or misleading in a reckless or careless manner and which is designed to, or likely to influence the decision of investors dealing in securities**" | Catches a knowingly wrong indicative figure. Note the **scienter** requirement — "knows to be false or misleading". A good-faith, clearly-labelled provisional number that later differs is not within this clause. | `[verified]` |
| **FUTP reg. 4(2)(s)** | "**mis-selling of securities or services relating to securities market**", where mis-selling means sale "by (i) knowingly making a false or misleading statement, or (ii) knowingly concealing or omitting material facts, or (iii) knowingly concealing the associated risk, or (iv) **not taking reasonable care to ensure suitability** of the securities or service to the buyer" | Clause (iv) has **no scienter qualifier** — "not taking reasonable care" is enough. Relevant to presenting an indicative figure in a way a retail client would reasonably read as final. | `[verified]` |
| **FUTP reg. 4(2)(m)** | "a market participant **entering into transactions on behalf of client without the knowledge of or instructions from client** or misutilizing or diverting the funds or securities of the client held in fiduciary capacity" | The unauthorised-trading limb; the reason the order-evidence regime (§4.1) exists | `[verified]` |
| **FUTP non-exhaustiveness** | "the acts or omissions listed in this sub-regulation are **not exhaustive** and that an act or omission is prohibited if it falls within the purview of regulation 3, notwithstanding that it is not included in this sub-regulation"; and "**Market Participant shall include any person or entity registered under Section 12 of the Act and its employees and agents**" | A novel client-facing artefact is not safe merely because no clause names it, and the broker's **employees and agents** are within scope | `[verified]` |
| **SB Regs 2026, Code of Conduct, reg. 37(f) and reg. 36(2)(f)** | A stock broker shall "not furnish **false or misleading quotations** or give any other **false or misleading advice or information** to the clients in an attempt to solicit business in particular securities and enabling itself to earn brokerage or commission"; and shall not make a false or misleading statement in returns submitted to the Board or the exchange | Regulation-level, licence-condition version of the same duty | `[verified]` |
| **SB Regs 2026, reg. 36(3) "Competence"** | "have arrangements to render **fair, prompt and competent services** to its clients" and ensure employees are adequately trained to a level commensurate with their responsibilities | The "prompt" in reg. 36(3) read with reg. 37(b) is the closest thing in Indian law to a near-real-time service standard — and it is a **standard, not a clock** | `[verified]` |
| **True to label** | The amount charged to an end client as an MII levy must equal the amount received by that MII; broker/DP remuneration must not hide inside "exchange", "SEBI", "stamp" or "depository" labels | A provisional confirmation that shows estimated charges must use the same labels and the same actuals as the contract note | `[verified]` SEBI/HO/MRD/TPD-1/P/CIR/2024/92, notified 1 Jul 2024, **effective 1 Oct 2024** |
| **Unauthenticated news** | Employees and temporary/voluntary staff must "**not encourage or circulate rumours or unverified information** obtained from client, industry, any trade or any other sources **without verification**"; access to blogs/chat forums/messenger sites restricted under supervision or blocked; usage logs treated as **records**; any market-related news received must be forwarded "**only after the same has been seen and approved by the concerned Intermediary's Compliance Officer**", failing which the employee is deemed to have violated SEBI Act/Rules/Regulations "**and the Compliance Officer shall also be held liable for breach of duty**" | The nearest analogue in the regime to a prohibition on pushing unverified figures at clients — but it addresses **market news**, not a client's own trade data | `[verified]` SEBI MC 85, footnoted to CIR/ISD/1/2011 (23 Mar 2011) and CIR/ISD/2/2011 (24 Mar 2011) |
| **Voluntary clauses void** | See §2.3 — SEBI MC 21.3 | A disclaimer cannot be used to shift risk off the broker | `[verified]` |
| **Advertisement code** | Investors are entitled to "get only those advertisement materials from the broker which **adhere to Code of Advertisement norms** in place"; exchanges "shall ensure that brokers do not issue advertisements" otherwise than as permitted; APs are barred from advertising (newspapers, pamphlets, journals, magazines, e-mails, Facebook, Instagram, Telegram) without exchange approval through the TM, **including publishing performance returns** | Bounds any marketing of a provisional-confirmation feature | `[verified]` SEBI MC 81, footnoted to SMD/POLICY/CIR-49/2001 (22 Oct 2001); AP limb from NSE/COMP/63628 |

### 6.2 Is there anything barring presentation of an unconfirmed or unreconciled figure to a client as final?

**No provision was located that says so in terms.** `[verified]` as a negative search across the SEBI Master Circular, the SB Regs 2026, the FUTP Regulations and the NSE Inspection Master Circular.

What exists instead is a **three-part functional equivalent**, which is what the manual should state:

1. **You may not falsify the final record.** FUTP 4(2)(p) names contract notes and client account statements. Once the contract note is issued, it is the record; it cannot be retrofitted to a provisional figure, and the provisional figure cannot be retrofitted to it.
2. **You may not knowingly mislead, and you must take reasonable care about suitability.** FUTP 4(2)(k) and 4(2)(s)(iv), plus the SB Regs 2026 Code of Conduct.
3. **Where SEBI *does* require you to show live data, it attaches provenance requirements — time stamp, source, unique ID, audit trail — rather than a "final/provisional" label.** That is the regime's chosen technique, and the honest inference is that a provisional confirmation should be designed to the same technique: time-stamped, sourced, ID-carrying, logged, and reproducible. `[uncertain]` as the inference.

### 6.3 Disclaimers the regime does mandate

For contrast — these are the places where SEBI or the exchanges actually require specific wording, which shows the drafting style to imitate:

| Where | Mandated wording / requirement | Tag |
|---|---|---|
| Contract note, Rights Entitlements | Verbatim RE-lapse disclaimer (quoted in §1.3) | `[verified]` |
| Contract note, margin-call square-offs | **Asterisk or identifier**, and a **remark-column** entry | `[verified]` |
| Contract note / bills / statements, cash segment | **ISIN** to be included | `[verified]` |
| Contract note footer | Governing rules/bye-laws/circulars clause; RAC arbitration/appellate arbitration availability with exchange website references | `[verified]` |
| Weekly statement of accounts | Clause directing the client to the **daily margin statement** for pending margin obligations; and a statement that the **running-account authorisation continues until revoked** | `[verified]` |
| ECN agreement / client registration documents | **Non-receipt of bounced-mail notification amounts to delivery** at the client's e-mail ID | `[verified]` |
| Depository-participant website ticker | *"Prevent Unauthorized Transactions in your demat account → Update your Mobile Number with your Depository Participant. Receive alerts on your Registered Mobile for all debit and other important transactions in your demat account directly from NSDL on the same day. … issued in the interest of investors."* | `[verified]` |
| Broker website and trading app | **Risk disclosures** (SEBI/HO/MIRSD/MIRSD-PoD-1/P/CIR/2023/73, 19 May 2023), displayed prominently with a read-prompt; **and**, from 1 Nov 2026, SEBI's **investor awareness messages** on the landing page (website) and on alternate days with the risk disclosures (app) | `[verified]` |
| Client documents generally | **Minimum font size 11** for all documents in both the mandatory and non-mandatory parts; copies of executed documents to the client **free of charge within seven days** of execution, with the client's acknowledgement taken; MITC acknowledgement at onboarding | `[verified]` SEBI MC 23.5, 23.6, 21.4 and 21.10 (MITC implementation: **1 April 2024** for new clients; **1 June 2024** for informing existing clients by e-mail or other preservable mode; MITC circular **SEBI/HO/MIRSD/MIRSD-PoD-1/P/CIR/2023/180**, November 2023) |

---

## 7. CONSOLIDATED CLIENT-COMMUNICATION CLOCK

Every verified client-facing timing obligation found in this pass, ordered fastest to slowest. Use this as the manual's single timing table.

| Artefact | Deadline | Who issues | Tag |
|---|---|---|---|
| Pre-order display of brokerage and levies | Before order placement | Broker (IBT/WT) | `[verified]` |
| Order confirmation (unique ID) | On submitting the order | Broker | `[verified]` |
| Order acceptance/rejection advice | "within a reasonable period" | Broker | `[verified]` |
| Order/trade confirmation display on website | Real time | Broker | `[verified]` |
| Order/trade confirmation by e-mail | At the **client-specified** interval | Broker | `[verified]` |
| Trade confirmation by e-mail / mobile, with same-day trade history | Same day | Broker | `[verified]` |
| Order execution | "Immediate on receipt of order, but **not later than the same day**" | Broker | `[verified]` (Investor Charter activity 3) |
| Depository alerts on all demat debits | Same day | NSDL / CDSL | `[verified]` |
| Exchange transaction details by SMS and e-mail | **By the end of the trading day** | Stock exchanges | `[verified]` |
| Intimations re other margin due payments | End of T day | Broker | `[verified]` (Investor Charter activity 8) |
| Daily scrip-wise buy/sell summary with average rates (where PoA executed) | Daily | Broker / DP | `[verified]` |
| Disaggregated client collateral on the CC/exchange web portal | Daily | CC / exchange | `[verified]` |
| **Daily margin statement** | **Before the beginning of the trading session on the next trading day** | Broker | `[verified]` |
| **Contract note** | **Within 24 hours of execution** (R&O variant: within one working day) | Broker | `[verified]` |
| Payment / delivery to client after pay-out | Within 24 hours of pay-out, unless the client requests otherwise | Broker | `[verified]` |
| Weekly Statement of Accounts | Weekly (Mon–Sat), dispatched within the next **four trading days** of the following week | Broker | `[verified]` |
| Copy of executed client documents | Within **7 days** of execution | Broker | `[verified]` |
| Statement of accounts + retention statement at settlement | Within **5 days** of the settlement date | Broker | `[verified]` |
| Running-account settlement | First Friday/Saturday of the month/quarter, per the exchange's pre-announced annual calendar | Broker | `[verified]` |
| Copy of completed client registration documents | **7 days** from the date of UCC upload to the exchange | Broker | `[verified]` (Investor Charter activity 5) |
| KYC to KRA and CKYCR | **3 working days** of account opening | Broker | `[verified]` (Investor Charter activity 1) |
| Grievance redressal | **21 calendar days** from receipt | Broker | `[verified]` |
| Annual Global Transaction Statement | **30 days** from the end of the financial year | Broker | `[verified]` |
| Annual signed hard-copy statement of balances as on 31 March | SEBI: to all clients. NSE: **only upon request**. Unresolved. | Broker | `[verified]` both |
| ECN dispatch log / contract note copies | Retain **8 years** (SCRR floor 5 years; originals until any enforcement trial concludes) | Broker | `[verified]` |

---

## 8. SOURCE REGISTER

### SEBI — regulations

| Instrument | Reference | Date | URL |
|---|---|---|---|
| SEBI (Stock Broker) Regulations, 2026 | F. No. SEBI/LAD-NRO/GN/2026/291; Gazette of India Extraordinary, Part III §4, No. 16 | 7 Jan 2026 (in force on publication) | https://www.sebi.gov.in/sebi_data/attachdocs/jan-2026/1767852346757.pdf |
| SEBI (Prohibition of Fraudulent and Unfair Trade Practices relating to Securities Market) Regulations, 2003, last amended 5 Dec 2025 | — | 2003 / amd. 2025 | https://www.sebi.gov.in/legal/regulations/dec-2025/securities-and-exchange-board-of-india-prohibition-of-fraudulent-and-unfair-trade-practices-relating-to-securities-market-regulations-2003-last-amended-on-december-05-2025-_98694.html · PDF https://www.sebi.gov.in/sebi_data/attachdocs/aug-2026/1786957017377.pdf |
| SEBI (Stock Brokers) Regulations, 1992 — **repealed** | reg. 18 (five-year retention), reg. 15 (records) | repealed 7 Jan 2026 | cited in SEBI MC 83.1 |

### SEBI — circulars

| Subject | Reference | Date | Note / URL |
|---|---|---|---|
| **Master Circular for Stock Brokers** (current) | **SEBI/HO/MIRSD/MIRSD-PoD/P/CIR/2025/90** | **17 Jun 2025** | https://www.sebi.gov.in/legal/master-circulars/jun-2025/master-circular-for-stock-brokers_94623.html · PDF https://www.sebi.gov.in/sebi_data/attachdocs/jun-2025/1750158789381.pdf · confirmed latest edition as at 2026-10-15 |
| Master Circular for Stock Brokers (prior edition) | — | 9 Aug 2024 | cited in NSE MC footnote for the ECN physical-fallback amendment |
| ECN — original | SMDRP/POLICY/CIR-56/00 | 15 Dec 2000 | footnote 68 to SEBI MC 52 |
| ECN | SEBI/SMD/SE/15/2003/29/04 | 29 Apr 2003 | footnote 68 |
| ECN — core delivery/log/bounce rules | MRD/DoP/SE/CIR-20/2005 | 8 Sep 2005 | footnote 68; also cited in NSE/INSP/52604 |
| ECN / statement of accounts | MIRSD/SE/CIR-19/2009 | 3 Dec 2009 | footnote 68; cited in NSE/INSP/47227 |
| ECN guidelines | CIR/MIRSD/16/2011 | 22 Aug 2011 | cited in NSE/INSP/52604 |
| Internet-based trading conditions | SMDRP/POLICY/CIR-06/2000 and FITTC/DC/CIR-1/98 | 31 Jan 2000; 16 Jun 1998 | footnote 69 to SEBI MC 53 |
| Securities trading through WAP | SMDRP/POLICY/CIR-48/2000 | 11 Oct 2000 | footnote 70 to SEBI MC 54 |
| Securities Trading using Wireless Technology | CIR/MRD/DP/25/2010 | 27 Aug 2010 | footnote 71 to SEBI MC 55 |
| Daily statement of collateral utilisation | MRD/DoP/SE/CIR-11/2008 | 17 Apr 2008 | footnote 35 to SEBI MC 25 |
| SMS and e-mail alerts to investors by stock exchanges | CIR/MIRSD/15/2011 | 2 Aug 2011 | footnote 45 to SEBI MC 34 |
| Same — family / authorised person clarification | SEBI/HO/MIRSD/MIRSD-PoD1/P/CIR/2024/169 | 3 Dec 2024 | footnote 45; circulated as NSE/INSP/65403 and NSE/INSP/65679 |
| Display of details by stock brokers | CIR/MIRSD/9/2010 | 4 Nov 2010 | footnote 111 to SEBI MC 84 |
| Unauthenticated news | CIR/ISD/1/2011; CIR/ISD/2/2011 | 23, 24 Mar 2011 | footnote 112 to SEBI MC 85 |
| Advertisement by brokers | SMD/POLICY/CIR-49/2001 | 22 Oct 2001 | footnote 108 to SEBI MC 81 |
| Books/records sought by enforcement agencies | SEBI/MRD/SE/CIR-15/2005 | 4 Aug 2005 | footnote 110 to SEBI MC 83 |
| Risk disclosures | SEBI/HO/MIRSD/MIRSD-PoD-1/P/CIR/2023/73 | 19 May 2023 | referenced in SEBI MC 49 and in the Jagrook circular |
| Most Important Terms and Conditions (MITC) | SEBI/HO/MIRSD/MIRSD-PoD-1/P/CIR/2023/180 | Nov 2023 | SEBI MC 21.1.6, 21.10 |
| Segregation and monitoring of collateral at client level | SEBI/HO/MRD2_DCAP/CIR/2021/0598 | 20 Jul 2021 | footnote 58 to SEBI MC 43 |
| Ease of Doing Business: text on contract note re fit and proper status | SEBI/HO/MRD/MRD-PoD-2/P/CIR/2024/25 | 24 Apr 2024 | relaxes chapter 6 para 2.4.2.2.2 of the Master Circular (Stock Exchanges and Clearing Corporations) of 16 Oct 2023; circulated as NSE/INSP/61776 |
| MII charges true to label | SEBI/HO/MRD/TPD-1/P/CIR/2024/92 | notified 1 Jul 2024, effective 1 Oct 2024 | https://www.sebi.gov.in/sebi_data/attachdocs/jul-2024/1719836553556.pdf |
| T+0 optional settlement — scope expansion | SEBI/HO/MRD/MRD-PoD-3/P/CIR/2024/172 | 10 Dec 2024 | https://www.sebi.gov.in/legal/circulars/dec-2024/enhancement-in-the-scope-of-optional-t-0-rolling-settlement-cycle-in-addition-to-the-existing-t-1-settlement-cycle-in-equity-cash-markets_89443.html |
| Trading Supported by Blocked Amount in Secondary Market | — | Nov 2024 (cash leg effective 1 Feb 2025) | https://www.sebi.gov.in/legal/circulars/nov-2024/trading-supported-by-blocked-amount-in-secondary-market_88339.html |
| Technical glitches framework — review | HO/38/44/12(1)2026-MIRSD-TPD1 | 9 Jan 2026 | https://www.sebi.gov.in/legal/circulars/jan-2026/review-of-framework-to-address-the-technical-glitches-in-stock-brokers-electronic-trading-systems_99006.html |
| IRRA platform discontinued | HO/38/44/12(3)2025-MIRSD-TPD1/I/10705/2026 | 7 May 2026 | https://www.sebi.gov.in/legal/circulars/may-2026/discontinuation-of-investor-risk-reduction-access-irra-platform_101300.html |
| Investor awareness messages on trading apps and websites (Project Jagrook) | HO/38/24/(15)2026-MIRSD-PODMMC/I/22872/2026 | 1 Oct 2026 | https://www.sebi.gov.in/legal/circulars/oct-2026/display-of-investor-awareness-message-s-by-stock-brokers-on-their-trading-apps-and-websites-under-project-jagrook_104858.html · PDF https://www.sebi.gov.in/sebi_data/attachdocs/oct-2026/1790852162769.pdf |

### NSE / NSE Clearing

All at `https://nsearchives.nseindia.com/content/circulars/<REF>.pdf` or `.zip`.

| Subject | Reference | Date |
|---|---|---|
| **Master Circular – Inspection Department (current)** | **NSE/INSP/73976** | **29 Apr 2026** |
| Master Circular – Inspection Department (prior) | NSE/INSP/67804 | 30 Apr 2025 |
| Revision in Contract Note Format (single WAP) | **NSE/INSP/61999** | 13 May 2024 |
| FAQ on Revision in Contract Note Format | **NSE/INSP/63859** | 10 Sep 2024 |
| Contract note format — timeline extensions | NSE/INSP/63289; 64929; 66373 (NCL/CMPT/66399); 67200 (NCL/CMPT/67256); 67759 (NCL/CMPT/67760) | 6 Aug 2024; 6 Nov 2024; 29/30 Jan 2025; 19/24 Mar 2025; 29 Apr 2025 |
| Contract note format — **final timeline, 27 Jun 2025 trade date** | **NSE/INSP/68618** (NCL/CMPT/68625) | 18/19 Jun 2025 |
| Contract note format lineage | NSE/INSP/51772; 45879; 39158; 35036 | 25 Mar 2022; 30 Sep 2020; 15 Oct 2018; 5 Jun 2017 |
| ECN through SMS / electronic instant messaging | **NSE/INSP/52604** | 10 Jun 2022 |
| Format of contract note — cross-currency derivatives | NSE/INSP/37471 | 9 Apr 2018 |
| Format of contract note — tri-party repo on TRM | NSE/INSP/57417 | 3 Jul 2023 |
| Revision in STP INF/IFN 515 Format | **NSE/INSP/73521** | 27 Mar 2026 |
| Ease of Doing Business: contract note fit-and-proper text | NSE/INSP/61776 | 26 Apr 2024 |
| **Issuance of Daily Margin Statement (current timing)** | **NSE/INSP/68487** (NCL/CMPL/68590) | **11/17 Jun 2025** |
| Issuance of Daily Margin Statement (original T-day rule + format) | NSE/INSP/36786 | 19 Jan 2018 |
| Guidelines/clarifications on Margin collection & reporting (Annexure B format) | NSE/INSP/45191 | 31 Jul 2020 |
| Earlier daily margin statement circulars | NSE/INSP/10239; 10605; 19583 | 11 Feb 2008; 21 Apr 2008; 14 Dec 2011 |
| **Guidelines for 'Statement of Accounts' (weekly)** | **NSE/INSP/47227** | 3 Feb 2021 |
| Penalty structure — non-issuance of weekly Statement of Accounts | NSE/INSP/48431 | 28 May 2021 |
| **Issuance of Annual Global Statement** | **NSE/INSP/36731** | 11 Jan 2018 |
| Register of Securities format (superseded) | NSE/INSP/38743 | 30 Aug 2018 |
| Display of Brokerage, Statutory & Regulatory Levies (pre-order) | **NSE/INSP/53939**; 54746; **NSE/INSP/55031** | 3 Oct 2022; 7 Dec 2022; 28 Dec 2022 (effective 31 Jan 2023) |
| Earlier brokerage/levy clarifications | NSE/INSP/23739; 27155; 29701; 53297 | 24 Jun 2013; 16 Jul 2014; 13 May 2015; 12 Aug 2022 |
| SMS and E-mail alerts to investors by Stock Exchanges | NSE/INSP/65403; NSE/INSP/65679 | 4 Dec 2024; 19 Dec 2024 |
| AP inspection scope (contract notes/statements not issued by AP) | NSE/COMP/63628 | 28 Aug 2024 |
| Common violations/deficiencies observed during inspections | **NSE/INSP/73503** | 27 Mar 2026 |
| Running-account settlement annual calendar | NSE/INSP/72413; 67207; 61164 | 20 Jan 2026; 20 Mar 2025; 15 Mar 2024 |
| Common Contract Note — clearing-side clarification and FAQs | **NCL/CMPT/66083**; NCL/CMPT/64656 | 10 Jan 2025; 22 Oct 2024 |
| CCN member/custodian interface testing | NCL/CMPT/67467, 67479, 67524, 67547, 67664, 67926, 67976, 68118, 68224, 68389, 68525, 68601; NSE/INSP/68202 | Apr–Jun 2025 |
| Collateral segregation — new NCL portal | **NCL/CMPL/69872**; 70070; 70192; 70297; 70962 | 26 Aug 2025 → 24 Oct 2025 |
| Collateral segregation — original user manual; penalty structure | NCL/CMPL/49764; NCL/CMPL/50662 | 29 Sep 2021; 17 Dec 2021 |
| Collateral segregation — FAQ | **NCL/CMPL/76318** | 11 Sep 2026 |
| Collateral segregation — EGR segment | NCL/CMPL/73989 | 30 Apr 2026 |
| T+0 report standardisation under UDiFF | NCL/CMPT/67345 | 28 Mar 2025 |

### MCX — `[uncertain]` currency, see §1.10

| Subject | Reference | Date |
|---|---|---|
| MCX Compliance Guide for Members, Member Compliance Department — Chapter on Contract Notes | — | March 2015 (URL not re-verified; `mcxindia.com` returns HTTP 403 to non-browser clients from this environment) |
| Contract note format circulars cited therein | MCX/LEGAL/363/2008; MCX/LEGAL/404/2011; MCX/LEGAL/137/2012; MCX/LEGAL/138/2012; MCX/COMP/227/2013 | 15 Nov 2008; 3 Nov 2011; 9 Apr 2012; 9 Apr 2012; 28 Jun 2013 |
| ECN declaration form | MCX/COMP/087/2014 | 19 Mar 2014 |
| Revised ECN guidelines (w.e.f. 26 Dec 2014) | MCX/COMP/406/2014 | 26 Dec 2014 |
| 24-hour dispatch / physical-form / addressing rules | MCX/COMP/046/2011 | 23 Feb 2011 |
| Proof of dispatch and receipt of contract notes | MCX/COMP/399/2009; MCX/COMP/113/2010 | 30 Sep 2009; 5 Apr 2010 |
| Proprietary trading disclosure on contract notes | MCX/T&S/147/2016, implementing SEBI/HO/CDMRD/DMP/CIR/P/2016/49 | 17 May 2016 (SEBI 25 Apr 2016); compliance 22 Jul 2016 |
| Base obligation | MCX Bye-law 4.7; Business Rule 27(p) | — |

### NSDL

| Subject | Reference | Date |
|---|---|---|
| Depository alerts on demat debits; website ticker text | NSDL/POLICY/2008/0059; NSDL/POLICY/2010/0010 | 1 Sep 2008; 28 Jan 2010 |

---

## 9. GAPS AND CAUTIONS

### 9.1 Conflicts between live primary instruments — resolve with compliance before go-live

| # | Conflict | The two positions | Recommended build | Risk if wrong |
|---|---|---|---|---|
| 1 | **Contract note clock** | SEBI MC 24.4 / 53.1(e)(i) / Investor Charter: **24 hours of execution**. SEBI MC Rights & Obligations cl. 29: **one working day of execution**. | Issue on T evening; hard limit before next session open. Satisfies both. | Diverges over Fridays and trading holidays. A client suing on the R&O document is suing on the narrower promise. |
| 2 | **Statement of accounts cadence** | NSE (live, penalised): **weekly**. SEBI Investor Charter activity 10: **monthly**. SEBI R&O cl. 31: "as prescribed by the relevant Exchange". | **Weekly.** R&O cl. 31 points to the exchange, and NSE penalises weekly non-issuance. | Weekly non-issuance has a published NSE penalty structure (NSE/INSP/48431). |
| 3 | **Annual signed statement of balances** | SEBI MC 23.9: hard-copy signed statement as on 31 March "**shall be sent to all the clients**". NSE MC 4.5(x) (both 2025 and 2026 editions): "**only upon request**". | Build both paths: a request channel, plus the capability to generate for all clients. Ask compliance which governs. | Following NSE and ignoring SEBI leaves a SEBI-circular breach on the face of the master circular. |
| 4 | **Margin-due intimation timing** | SEBI Investor Charter activity 8: **end of T day**. NSE/INSP/68487 and NSE MC 3.2: **before next session open**. | Issue on T evening. Satisfies both. | Relying on the relaxation alone leaves the Investor Charter unmet. |
| 5 | **MCX Compliance Guide** | Its "individual investors in physical form", "no consolidated contract notes" and "three-year preservation" statements all conflict with current SEBI/NSE rules. | Disregard those three; the document is dated March 2015, pre-FMC-merger. | Carrying any of them into the manual would state superseded law as current. |

### 9.2 Procurement gaps — things this pass could not establish

| # | Gap | Why it matters | How to close |
|---|---|---|---|
| 1 | **BSE notice numbers** for the contract note format, daily margin statement, statement of accounts and ECN rules | The manual covers BSE. Writing NSE numbers against BSE obligations would be wrong. `[likely]` that BSE mirrors NSE on matching dates — corroborated by the cross-exchange construction of the prescribed format and the cross-exchange WAP — but **no BSE notice was read**. | `bseindia.com` returns HTTP 403 to non-browser clients from this environment. Use a browser session, or BSE's member portal, and pull the BSE Inspection/Compliance notices corresponding to NSE/INSP/61999, 68487, 47227, 36731 and 52604. |
| 2 | **Current MCX contract note circular** | The only MCX source read is the **March 2015** Compliance Guide. MCX has issued circulars continuously since. | `mcxindia.com` returns HTTP 403 from this environment. Pull MCX's current member compliance manual and the post-2015 contract-note circulars. |
| 3 | **MSEI** | The prescribed contract note format names MSEI and directs clients to `msei.in`. No MSEI instrument was read. | Only relevant if Finix takes MSEI membership. |
| 4 | **Annexure B field list of NSE/INSP/45191** (the *current* daily margin statement format) | §3.3 gives the **2018** field list in full; the 2020 Annexure B, which superseded it and is Exhibit 19 of the current master circular, was not extracted at field level. | Extract Exhibit 19 from the `Exhibits.zip` inside NSE/INSP/73976, or Annexure B from NSE/INSP/45191. |
| 5 | **Exhibits 13, 14, 19, 24, 30, 41** of NSE/INSP/73976 | These are the authoritative current formats for the contract note, the contract note FAQ, the daily margin statement, the statement of accounts, the AGTS and the ROS/Holding Statement/Bank Book/Client Ledger. The circular PDF was read; the 16.9 MB `Exhibits.zip` was not opened. | Unzip and extract. This is the highest-value remaining item for a field-level build. |
| 6 | **Which instrument introduced "only upon request"** for the annual signed statement, and **which introduced the 12 → 24 month inactive threshold** | Both changes are present in the April 2025 NSE master circular and absent from the Feb 2021 original. The intervening circular was not located. | Walk the NSE/INSP circulars between Feb 2021 and Apr 2025; or ask NSE Inspection. |
| 7 | **The AGTS footnote in NSE/INSP/73976 Item 4.17** cites NSE/INSP/71037 of 30 Oct 2025, but the NSE circular index titles that reference "Prior instructions for initial public offering (IPO) bid placement" | Possible footnote error in NSE's own master circular. Do not cite NSE/INSP/71037 for AGTS without checking. | Download NSE/INSP/71037 and read it. |
| 8 | **Whether the ECN dispatch log is itself a reg. 15 record** | Determines whether the log carries the eight-year clock or some shorter period. The ECN circulars say only "the specified period under the extant regulations". | Compliance opinion; retain eight years meanwhile. |
| 9 | **Any prescribed client-notification timing inside the Trading-Supported-by-Blocked-Amount framework** | UPI block/release events are near-real-time and client-visible. | Read the Nov 2024 circular and the NPCI/exchange operating guidelines. |
| 10 | **Whether any SEBI/exchange instrument addresses provisional client confirmations under wording this pass did not search for** | The negative result in §2.1 is strong but term-based. | If the manual is going to assert the negative in print, consider a targeted enquiry to the exchange, or an ISF query, before publication. |

### 9.3 Cautions on how to use this research

1. **The negative finding in §2 is the load-bearing conclusion, and it is a negative.** It rests on term-based searching of a very large corpus (45,739 NSE/NCL circulars; the complete current SEBI and NSE consolidations). It is strong, but it is not the same as a regulator saying "there is no such thing". State it as "no such regime was located in the SEBI Master Circular, the Stock Broker Regulations 2026, the NSE Inspection Master Circular, or any NSE/NCL circular from April 2019 to September 2026" rather than as an unqualified universal.
2. **The web-search budget was exhausted before this pass began.** Everything here comes from primary PDFs and a local primary corpus. No secondary commentary, broker help-centre page or news report was consulted — which is good for reliability and bad for coverage of anything a broker might already be marketing as a "virtual contract note". If the manual needs competitive context, that is a separate pass.
3. **The NSE circular index ends 30 September 2026.** Anything issued in the two weeks to today is outside it. Check NSE/INSP and NCL/CMPL circulars for October 2026 before publication — that window already contains the Jagrook circular, so it is not empty.
4. **The SEBI Master Circular dated 17 June 2025 predates the Stock Broker Regulations 2026 by seven months** and still cites the repealed 1992 Regulations (e.g. at para 83.1 on the five-year retention). Where the master circular and the 2026 Regulations differ on a regulation reference or a retention period, the Regulations govern; NSE's April 2026 master circular already reflects this at Item 7.1.
5. **Nothing in §2.7 is a compliance obligation.** Those rows are the analyst's design inferences from verified provisions. The manual should present them as design guidance and say so, or a reader will cite them back as rules.

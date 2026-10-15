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

All `[verified]` as negative results. The only places the word "provisional" attaches to anything settlement-related in the SEBI Master Circular are **para 5.1 Stage 3, "Close-out of positions and provisional appropriation of collateral"** in the default-handling waterfall, and the clause that "the aforesaid pro-rata attribution of shortages shall be **provisional**" — a clearing-corporation default mechanic, not a client document. `[verified]`

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

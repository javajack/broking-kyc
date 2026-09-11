---
title: Product Activation
description: Selector for every client-facing product activation a broker offers — prerequisites, the consent and disclosure documents each one needs, the back-office toggle it sets, and the exchange or depository it touches.
---

> **Why this page is structured this way:** the rest of the site documents these products from the broker's side — how <abbr title="Margin Trading Facility">MTF</abbr> funding settles, how an <abbr title="Initial Public Offering">IPO</abbr> application reaches the registrar, how a pledge file reaches the depository. This section documents the other end: what a client has to consent to, what has to be disclosed to them first, which internal flag changes, and which external system must answer before the product actually works. The selector below is the entry point, because most activation failures are really a client asking for one row and being routed to another.

## TL;DR

- 12 activation routes, each with its own consent instrument. Completing one does not complete another: an MTF consent does not create a margin pledge, a demat debit authority does not fund a bank account, and a Retail Direct account does not activate a broker's debt segment.
- Four different things get conflated as "activation": choosing a product, authorising an action, obtaining an exchange or depository entitlement, and having enough money or securities for the next order. Keep them as separate states or support cannot tell a client which one failed.
- Income evidence is required only where the client opts into a derivatives segment — clause 23.3 of the [Master Circular for Stock Brokers](/broking-kyc/reference/circulars/sebi-mirsd/#sebihomirsdmirsd-podpcir202590) (17 June 2025). For every other client the broker collects what its own risk-management policy requires.
- Trading preferences are captured in a <abbr title="Securities and Exchange Board of India">SEBI</abbr>-standardised format (Para C of Annexure-8 to the same master circular), and new clients are registered on **all** active exchanges for the segments they opt into, with an opt-out by negative consent (clauses 21.5 to 21.8).
- Every voluntary authorisation on this page must keep its alternative visible. <abbr title="Demat Debit and Pledge Instruction">DDPI</abbr> is voluntary under [SEBI/<abbr title="Head Office (SEBI circular ID prefix)">HO</abbr>/<abbr title="Markets Intermediaries Regulation and Supervision Department (SEBI)">MIRSD</abbr>/DoP/P/CIR/2022/44](/broking-kyc/reference/circulars/sebi-mirsd/#sebihomirsddoppcir202244); presenting it as an account-opening requirement is a mis-statement, not a UX shortcut.

## Selector

| Product route | Client-side prerequisite | Consent and disclosure documents | Back-office / risk toggle | Depository or exchange touchpoint |
| --- | --- | --- | --- | --- |
| [F&O activation](./fno-activation/) | <abbr title="Know Your Customer (process).">KYC</abbr>-complete cash-segment client; documentary evidence of financial details (clause 23.3) | Trading-preference signature (Annexure-8 Para C); Uniform Risk Disclosure Document (Annexure-10); F&O risk disclosures (Annexure-23) acknowledged at login | `seg_fno_flag`, `seg_fno_active` | <abbr title="National Stock Exchange of India">NSE</abbr> / <abbr title="BSE Limited (formerly Bombay Stock Exchange)">BSE</abbr> <abbr title="Unique Client Code">UCC</abbr> F&O flag (`NSE_FNO_FLAG`, `BSE_FNO_FLAG`) |
| [Commodity activation](./commodity-activation/) | Financial evidence; commodity client category declaration | Trading-preference signature; commodity <abbr title="Risk Disclosure Document">RDD</abbr>; delivery-intention understanding before the tender period | `seg_com_flag`, `mcx_client_cat` | <abbr title="Multi Commodity Exchange of India">MCX</abbr> / NSE / BSE commodity UCC (`MCX_COM_FLAG`, `CLIENT_CATEGORY_COM`) |
| [Currency and IRD activation](./currency-ird-activation/) | Financial evidence; exposure or hedging declaration where the position is not covered by the permitted no-underlying limit | Trading-preference signature; segment RDD; underlying-exposure declaration | `seg_cd_flag`, `seg_cd_active` | NSE / BSE currency and IRD UCC flags (`NSE_CD_FLAG`) |
| [MTF activation](./mtf-activation/) | Group I scrip; initial margin in permitted form; demat able to receive a pledge | Exchange-framed Rights and Obligations for MTF (clause 39.8.1); Policies and Procedures with delayed-payment rate (clause 23.4.4); tariff sheet | `mtf_enabled_flag`, MTF exposure limit | Pledge to the broker's client securities margin funded account; daily Annexure-15 disclosure to the exchange |
| [IPO via <abbr title="Applications Supported by Blocked Amount">ASBA</abbr> and <abbr title="Unified Payments Interface">UPI</abbr>](./ipo-asba-upi/) | Bank account or UPI handle able to block funds; demat for allotment | Bid-cum-application declarations; mandate authorisation | Issue-application record; bid category | Exchange bidding platform; sponsor bank and registrar |
| [<abbr title="Securities Lending and Borrowing Mechanism">SLBM</abbr> enrolment](./slbm-enrolment/) | Demat holding to lend, or margin to borrow | Securities lending and borrowing agreement and risk disclosure | SLB participant mapping | Clearing-corporation SLB platform and depository transfer |
| [Margin pledge](./margin-pledge/) | Free, eligible quantity in the client's own demat | Pledge authenticated by the client at the depository (<abbr title="One-Time Password">OTP</abbr> or other verifiable mechanism); haircut and invocation disclosure, with the 2026 invocation-notice undertaking | Collateral value after haircut in the risk system | Depository margin-pledge transaction in the designated client margin-pledge account |
| [DDPI, eDIS and <abbr title="Transaction PIN">TPIN</abbr>](./ddpi-edis-tpin/) | An operative demat account | DDPI in the SEBI-prescribed format (two purposes at inception, extended in October 2022), **or** per-transaction eDIS authentication | Debit-authority route recorded per client | Depository registration of the DDPI, or per-instruction TPIN and OTP |
| [API and algo access](./api-algo-access/) | Existing active segment; broker entitlement | API terms; algo-order tagging acknowledgement where the order flow is automated | API key and rate-limit profile; algo tag mapping | Exchange algo approval and unique algo identifier |
| [GIFT City / <abbr title="Indian Financial System Code.">IFSC</abbr>](./gift-ifsc/) | Separate account with a distinct IFSC-registered legal entity; eligible remittance purpose | IFSC entity's own onboarding and risk disclosures; remittance declaration | Separate client record in the IFSC entity, not a flag on the domestic one | IFSC exchange and clearing corporation; foreign-currency bank account |
| [Bonds, G-Sec and <abbr title="National Pension System">NPS</abbr>](./bonds-gsec-nps/) | Venue-specific eligibility; a separate account for some routes | Venue or scheme disclosures; <abbr title="Reserve Bank of India">RBI</abbr> Retail Direct registration is a direct-to-RBI process | Debt-segment and platform flags | Exchange debt / <abbr title="Request for Quote">RFQ</abbr> platform; RBI Retail Direct Gilt account; central recordkeeping agency for pension products |
| [Advanced order types](./advanced-order-types/) | The segment the order type is used in must already be active | Broker feature terms stating which constructs are broker-side and not exchange-resident | Order-type permission matrix per client | Exchange order attributes at order entry; broker-side triggers never reach the exchange until fired |

The back-office and risk field names above follow the [Field-level Data Flow Atlas](/broking-kyc/reference/field-atlas/) naming so a row can be traced to its destination page; internal flag names are a documentation model, not an exchange-prescribed schema. **[AI inference — verify before acting]**

## Reading the selector

Three rules keep the table honest.

**A row is not a superset of another row.** Each product has a distinct legal purpose. A funded MTF purchase, a margin pledge over unrelated holdings, and a standing demat debit authority are three different arrangements over three different sets of securities. Bundling their consent into one acceptance screen makes it impossible to answer the only question that matters in a dispute: which text did the client accept, and when.

**A broker restriction is not a statutory prohibition.** Several prerequisites in the table are broker policy — a narrower scrip list, an exposure cap, a higher margin, a minimum ledger balance. Where a route is refused, the message should say whose rule refused it. The reverse error is equally common: presenting a genuinely voluntary authorisation as mandatory.

**An entitlement is not a balance.** A client can hold a live segment registration and still be unable to trade because margin is short, the securities are pledged elsewhere, an instrument has expired, or a payment mandate failed. Each topic page therefore separates the activation state from the transaction-level prerequisite, and says which system owns each.

## How this section relates to the rest of the site

The nine-screen [user journey](/broking-kyc/journey/) captures a client's *first* set of preferences — segments, bank, demat, declarations — and stops at eSign. The [lifecycle](/broking-kyc/lifecycle/) section then covers what changes about the *client*: re-KYC, modifications, dormancy, closure. Neither covers what happens when an existing, fully-KYC client wants a new *product* two years later. That is this section.

Underneath each page sits a broker-side counterpart. Settlement and funding mechanics for MTF, SLB, and direct pay-out are in the [settlement deep dives](/broking-kyc/deep-dives/); order routing and pre-trade risk are in [<abbr title="Order Management System">OMS</abbr> internals](/broking-kyc/deep-dives/trading-day/oms-internals/); the segment-by-segment rule comparison — trading hours, settlement cycle, position limits, lot sizes, eligibility — is in [segment rules comparison](/broking-kyc/deep-dives/foundational/segment-rules-comparison/). Where such a page exists, the activation page summarises it in a paragraph and links, rather than restating it. Field-level destinations for every flag mentioned here are in the [Field Atlas](/broking-kyc/reference/field-atlas/), the obligations behind them in the [compliance blueprint](/broking-kyc/operations/compliance-blueprint/), and the verbatim circular index in [reference / circulars](/broking-kyc/reference/circulars/sebi-mirsd/).

Two adjacent new sections complete the picture. [Trading risk and derivatives](/broking-kyc/trading-risk/) covers what happens *after* a derivatives segment is live — exercise and assignment, expiry-day operations, position limits, collateral. [Funds and tax](/broking-kyc/funds-tax/) covers the money movement and reporting that every product on this page eventually produces.

## Practical notes

- **[gotcha]** Segment activation is per-exchange, not per-product. Since the trading-preference standardisation (clauses 21.5 to 21.8 of the master circular), a client opting into a segment is registered on every active exchange for that segment unless they give written negative consent — which the broker must retain for at least five years (clause 21.8).
- **[gotcha]** Commodity-only members do not use the standardised trading-preference format at all; clause 21.7 points them to the erstwhile Forward Markets Commission format under **<abbr title="Forward Markets Commission">FMC</abbr>/COMPL/IV/<abbr title="KYC Registration Agency">KRA</abbr>-05/11/14** dated 26 February 2015.
- **[industry practice — unverified]** Activation requests cluster around market events — F&O around volatile expiries, commodity around bullion moves, MTF around rallies. Staffing the review queue to the average rather than the peak is the most common cause of multi-day activation SLAs.
- **[risk trade-off]** A single "enable everything" switch converts well and disclosures badly. Each additional product in one consent flow reduces the evidentiary value of the acceptance for all of them.
- **[AI inference — verify before acting]** Treat consent captured, external registration confirmed, and order permissible as three stored states with three timestamps. Most "my account says enabled but I cannot trade" tickets are a collapsed version of these three.

## Verified through

2026-09-11

---

*AI-generated and not legal, financial, or compliance advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*

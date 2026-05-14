---
title: "Deep Dive: Member default recovery"
description: Clearing-corp default management framework — default declaration trigger, asset liquidation waterfall, client-fund segregation protection during default, client claims through IPF / segregated bank accounts / depository, client-transfer-out, member suspension and re-admission, historical default examples.
---

import { Aside } from '@astrojs/starlight/components';

> **Why this page is structured this way:** A member default plays out chronologically — from the trigger event (payin failure) through default declaration, the waterfall application, client-asset protection, and onward to suspension and (rarely) re-admission. The page walks this chronology, with two parallel tracks at each stage: (1) what the *CC / exchange* does to recover the loss; (2) what the *clients* of the defaulting member do to recover their assets. The two tracks are deliberately separated because they involve different actors, different documentation, and different timelines — confusion between them is a common cause of client distress.

## TL;DR

- **Member default** = a clearing member fails to honour a settlement obligation at the clearing corporation (CC). Most common trigger: **payin failure** — the member cannot deposit the required funds or securities on the CC's settlement payin window.
- **Default declaration** is a formal exchange / CC action under the bye-laws; it freezes the member's UCC, halts new trading, transfers the recovery process to the default-management procedure, and starts the IPF claim window for clients.
- **Asset liquidation sequence (the funded waterfall)**: (1) defaulter's collateral at CC (margins, pledged securities, BG, FDR, cash); (2) defaulter's Core SGF contribution; (3) defaulter's BMC / ABC at exchange; (4) insurance (if applicable); (5) CC skin-in-the-game Core SGF (25% min); (6) non-defaulter Core SGF contributions (pro-rata, replenishable T+3); (7) unfunded tools — cash call, variation-margin haircut, partial tear-up. See [SGF / Core SGF](./sgf-core-sgf/) for the funded-waterfall detail.
- **Client-asset protection** during default rests on three pillars: (a) **segregated client-funds bank account** at the broker maintained per SEBI segregation framework — balances there are client property, returned to clients outside the CC's recovery; (b) **segregated client securities** at the depository (CDSL / NSDL) in TM CUSPA / CM CUSPA / TM CSMFA accounts and direct-payout-to-demat regime — these are identifiable to client BOs and returnable; (c) **IPF backstop** for residual unrecovered amounts — see [IPF](./ipf/).
- **Client transfer-out** to another broker is permitted post-default — the client opens an account at a new broker and arranges inter-depository transfer of holdings; positions are squared at the defaulting broker per the default's special-settlement rules.
- **Suspension procedure**: defaulter declared → membership suspended at all exchanges / CCs where registered (cross-MII intimation) → trading rights revoked → office records taken into custody → forensic review.
- **Re-admission**: rare; requires SEBI no-objection, satisfaction of all client claims, capital restoration, fresh fit-and-proper assessment, and formal re-admission application. Most defaulting members are expelled rather than re-admitted.
- **Historical examples**: Karvy Stock Broking (NSE / BSE default, declared in 2019-20 period), and other broker-default events post-2018 frequently referenced in SEBI / exchange training material on segregation and direct-payout-to-demat reforms.

## Conceptual overview

A clearing member sits at the operational core of the trading system — receiving client trades, netting them with counterparties, and delivering funds and securities into the CC's settlement window. Default is *not* a single event but a *cascade* — the moment a payin obligation fails, every downstream payout, every onward delivery, every margin replenishment is at risk. Without intervention, the cascade would freeze the broader settlement system.

The default-management framework is designed to:
1. **Stop the cascade fast** — declare the member in default the moment the payin fails (typically T+1 by mid-morning), freeze the member's UCC and segregate the broken obligations.
2. **Recover the loss through the funded waterfall** — see [SGF / Core SGF](./sgf-core-sgf/) for the funded-waterfall mechanics.
3. **Protect non-defaulting clients of the defaulter** — clients are not the wrongdoer; SEBI's segregation framework protects their funds and securities at the depository and broker level.
4. **Compensate the residual loss through IPF** — for retail clients whose recoveries from the segregation framework are incomplete, the exchange's IPF gap-fills up to the per-investor cap.
5. **Preserve market continuity** — the broader trading system continues to operate; other members are not blocked from settling their own obligations.

The framework integrates many SEBI master circulars, exchange / CC bye-laws, and depository regulations into a single operational procedure. The MCX Master Circular — Investor Services Department (Default) Version 3 dated 2025-04-29 is the consolidated reference for MCX. Equivalent consolidated frameworks exist at NSE Investor Services and BSE Investor Services.

<Aside type="caution">
**Default declaration is irreversible (in practice).** Once a member is declared a defaulter, even if the immediate cause (a payin failure) is later remedied, formal de-declaration is rare. The framework is designed for definitive resolution rather than reversal. Members in financial distress occasionally pre-emptively surrender membership to avoid the formal default declaration; this carries different legal and reputational consequences but does not change the substantive client-recovery / SGF-replenishment / suspension procedures.
</Aside>

## Default triggers — what causes a member to be declared a defaulter

The most common trigger is **payin failure**, but the broader set of triggers includes:

### 1. Settlement payin failure

The member fails to deposit funds or securities at the CC settlement payin window:
- **Funds payin failure**: the member's settlement bank account does not have sufficient credit at the funds-payin cut-off (typically late morning on settlement day for T+1).
- **Securities payin failure**: the member fails to deliver the required securities to the CC pool / direct-payout system at the securities-payin window.
- **Internal-shortage failure**: the member is short on a client's expected delivery; the internal-shortage handling per NCL/CMPT/71045 (Oct 30, 2025) and FAQ NCL/CMPT/71441 (Nov 24, 2025) applies, but persistent or large failures can escalate to a full default.

### 2. Margin shortfall

- Sustained margin shortfall beyond the member's available collateral.
- Failure to replenish margin within the cure window.
- Margin shortfall on a derivative position that cannot be liquidated to bring the position within margin.

### 3. Capital adequacy failure

- Net worth falls below the minimum required (BMC and other capital requirements).
- The member's mandatory deposits with the exchange / CC fall below required levels and are not topped up.

### 4. SGF replenishment failure

- The member fails to replenish a draw against its Core SGF contribution within the prescribed window (typically T+3 working days; see [SGF / Core SGF](./sgf-core-sgf/)). This is itself a default trigger.

### 5. Fraud / misconduct

- SEBI's quasi-judicial order finding fraud, misappropriation of client funds, market manipulation (see [Market manipulation typologies](./market-manipulation-typologies/)), or other gross misconduct.
- The exchange / CC may declare a default upon such an order even without an immediate payin failure.

### 6. Regulatory directive

- SEBI or other regulator directs the exchange to suspend or default-declare the member (e.g., for sustained non-compliance, refusal to submit to inspection, or insolvency proceedings).

### 7. Voluntary surrender / closure under distress

- A member in financial distress may voluntarily surrender membership; the exchange may still proceed with default-declaration procedure if there are outstanding obligations or client claims at the time of surrender.

### 8. Insolvency / winding-up proceedings

- Initiation of IBC proceedings against the member; appointment of resolution professional; liquidation order.

## The default-management procedure — walkthrough

### Stage 1: Trigger detection and pre-declaration assessment (0 to a few hours)

The CC's risk-management team detects the trigger via:
- Real-time settlement bank reconciliation showing payin shortfall.
- Margin / collateral monitoring showing replenishment failure.
- Surveillance / inspection alerts escalated to the risk-management committee.
- Regulator intimation (SEBI).

The CC's risk-management head and the exchange's default-management committee conduct a rapid pre-declaration assessment:
- Is the trigger a one-time operational issue (cure possible within the day) or a substantive default?
- Is the member's collateral / capital sufficient to cure the shortfall?
- What is the size of the outstanding obligation and the cascade risk if not declared?

If the assessment confirms a default, the procedure moves to formal declaration.

### Stage 2: Formal default declaration (typically same day as detection)

The exchange / CC issues a formal default declaration per its bye-laws:
- **Declaration notice** is issued to the member, SEBI, other exchanges / CCs (cross-MII intimation), depositories.
- **Public notice** published on exchange website (defaulter / expelled members section).
- **Direct intimation** to known clients via available contact channels.
- **Press release** notifying the market.
- **UCC freeze**: the defaulting member's UCC at the exchange is frozen — no further order entry.
- **Trading right revocation**: the member's terminals and connections are disabled.

The IPF claim window starts on the date of this declaration (typically 3 years from declaration date for retail claims — see [IPF](./ipf/)).

### Stage 3: Asset preservation and forensic review (hours to days)

The exchange / CC takes immediate control:
- **Office and records**: the exchange's inspection team takes physical custody of the defaulter's office, books, and records.
- **Bank accounts**: settlement-bank-account balances frozen; segregated client-funds bank account separately identified.
- **Demat accounts**: defaulter's pool / CUSPA / CSMFA accounts at CDSL / NSDL frozen; client securities identified.
- **Server / IT systems**: trading systems and OMS / RMS taken offline; data preserved for forensic review.
- **Personnel**: keyed-out from exchange access; SEBI / police intimation as needed for serious cases.

The forensic review begins:
- Reconciliation of the defaulter's books against exchange, CC, and depository records.
- Identification of any client-fund misappropriation (whether funds in the segregated account match the broker's books on client balances).
- Identification of unauthorised trades on client accounts.
- Audit-trail preservation for subsequent SEBI investigation.

### Stage 4: Settlement cleanup via the CC waterfall (T+0 to T+5 typically, longer in complex cases)

The CC applies the funded waterfall to settle the broken obligation:

#### Step 4a: Defaulter's resources at CC

- Liquidate / appropriate all defaulter's collateral: cash, FDR, BG, securities (including approved-collateral securities like equity / ETF / MF units), G-Sec / SGB.
- Apply all margins held: IM, MTM/Variation, ELM, Special / Additional, Premium, Tender / Delivery-period.
- Apply defaulter's mandatory Core SGF contribution (member share).
- Apply defaulter's non-core SGF and any voluntary deposits.

#### Step 4b: Defaulter's resources at exchange

- Exchange transfers defaulter's BMC, ABC, security deposit, admission fees, and any other deposits to the CC for application against the loss.
- Inter-segment netting within the same CC permitted for surplus in non-defaulting segments.

#### Step 4c: Insurance (if applicable)

- File insurance claim if applicable; apply recovery.

#### Step 4d: CC's skin-in-the-game Core SGF

- Apply CC's 25% minimum Core SGF contribution.

#### Step 4e: Non-defaulter Core SGF

- Pro-rata across non-defaulter members.
- Send draw notices; replenishment within T+3 working days.

#### Step 4f: Unfunded tools

- Cash call (assessment power), variation-margin haircut, partial tear-up — per the CC's default management framework, with SEBI intimation.

See [SGF / Core SGF](./sgf-core-sgf/) for the full waterfall detail and contribution-side mechanics.

### Stage 5: Client-asset recovery (parallel track to Stages 3-4)

In parallel with the CC's settlement-side recovery, the client-asset-recovery procedure runs:

#### 5a: Segregated client-funds recovery

Per SEBI's client-funds-segregation framework (and the strengthened upstreaming regime), the broker maintains a **separate, segregated bank account for client funds**, distinct from the broker's own (proprietary) funds. Balances in this account at the time of default:
- Are *client property*, not the broker's property.
- Are reconciled against the broker's books on each client's funds balance.
- Are returned to clients pro-rata (or in full where the account fully matches the books).
- Are returned **outside** the CC's waterfall — they do not flow into the SGF stack.

The reconciliation may take days to weeks. Where the segregated balance is short of the books (i.e., the broker had misappropriated some client funds), the residual gap becomes an IPF claim.

Process per client:
- The exchange's investor-services team verifies the client's books-balance with the broker.
- Compares against the broker's segregated bank balance.
- Computes the client's share of the segregated balance.
- Effects refund to the client's bank account (penny-drop verified).
- Issues a closure / discharge.

#### 5b: Segregated client-securities recovery

Per SEBI's segregation framework at the depository level, and the direct-payout-to-demat regime (NCL/CMPT/66779 dated 2025-02-21 onwards, with subsequent updates NCL/CMPT/67947 dated 2025-05-09 and NCL/CMPT/69455 dated 2025-08-01; ICCL pilot 20250214-69 from Feb 25, 2025), client securities are held in:
- **TM CUSPA** (Trading Member Client Unpaid Securities Pledge Account) — for client securities pending payment.
- **CM CUSPA** (Clearing Member Client Unpaid Securities Pledge Account) — equivalent at clearing-member level.
- **TM CSMFA** (Trading Member Client Securities Margin Funded Account) — for MTF-funded client positions.
- **Direct-payout-to-demat** flow — settlement payouts of securities go directly to client BO at the depository, bypassing the broker pool.

Effect during default:
- Client securities in the client's own BO at CDSL / NSDL are **untouched** by the default — they are the client's property at the depository.
- Securities in TM CUSPA / CM CUSPA / TM CSMFA are identifiable to specific clients via the pledge / fund mapping; the depository can return these directly to client BOs upon the broker's default declaration, on receipt of the exchange's instruction and the client's claim.
- Margin-pledged securities (where the broker has pledged client securities as margin to the CC) require unpledge — the CC releases the pledge against the broker's account, and the securities can then flow back to the client's BO.

The direct-payout-to-demat regime substantially reduces client risk by ensuring settlement payouts no longer accumulate in the broker pool — they flow directly to the client's BO. This is one of the most significant client-protection reforms in recent years.

#### 5c: Client BO is the client's

The client's own demat BO account is held with a DP (depository participant) which may or may not be the defaulting broker. If the DP is the defaulting broker, the BO account remains the client's but the DP servicing is disrupted; clients may be required to migrate to another DP via the DP transfer procedure (see [Closure](/broking-kyc/lifecycle/closure/) for related closure-with-securities-transfer logic).

If the DP is a separate entity (some brokers use third-party DPs), the BO is unaffected by the broker default.

#### 5d: IPF claim filing for residual gap

The residual unrecovered amount (after segregated-funds recovery and securities-recovery) becomes the basis for an IPF claim per the procedure in [IPF](./ipf/). Subject to:
- Qualifying loss (cash deposit / securities not returned).
- Per-investor cap (NSE / BSE up to Rs 35 lakh; MCX up to Rs 10 lakh).
- 3-year claim window from default declaration.

### Stage 6: Member suspension (post-declaration; permanent until lifted)

The member is formally suspended at:
- The exchange where the default was declared.
- Other exchanges / CCs where the member was registered (cross-MII intimation).
- The depository (DP suspension if the member operated a DP).
- All segment registrations frozen.

The suspension extends to:
- All UCCs.
- All client-account-modification rights (no further additions / deletions).
- All proprietary trading.
- All authorised-person / sub-broker arrangements.

The member's audit, statutory filings, employee KYC, and AP relationships may also need to be wound down per the suspension framework.

### Stage 7: Forensic outcome and onward proceedings (months to years)

The forensic review's outcome drives onward proceedings:
- **Civil recovery**: the CC / exchange pursue civil recovery against the member for unsatisfied obligations.
- **Asset attachment**: orders for attachment of the member's assets (personal assets of directors / partners if pierced through corporate veil).
- **Insolvency**: where insolvency thresholds met, IBC proceedings.
- **Criminal proceedings**: police / CBI / ED proceedings where fraud / misappropriation / money-laundering is established.
- **SEBI adjudication**: quasi-judicial proceedings; penalty, debarment, disgorgement orders against the member and any related parties.
- **Recoveries credited to IPF**: any amounts recovered post-event are credited to IPF (and to non-defaulter SGF replenishment where applicable) in reverse-waterfall order.

### Stage 8: Re-admission (rare)

Re-admission of a defaulting member to the exchange / CC requires:
- Full satisfaction of all outstanding client claims (often impossible).
- Full repayment of SGF / CC contributions consumed.
- Restoration of capital adequacy (BMC, ABC, net worth).
- Fresh fit-and-proper assessment per the fit-and-proper framework (see [Fit-and-proper criteria](/broking-kyc/deep-dives/compliance-audit/fit-and-proper/)).
- SEBI no-objection.
- Exchange / CC governance approval.
- Formal re-admission application processing.

In practice, most defaulting members are expelled rather than re-admitted; the framework allows re-admission as a theoretical option but the substantive bar is very high.

## Client-asset segregation — the protective layer

The strength of client-asset protection during a broker default depends on the *robustness of the segregation framework* — both at the broker level and at the depository / CC level. SEBI has progressively strengthened segregation over the past decade:

### Funds segregation

- **Separate client-funds bank account** at the broker, distinct from the broker's proprietary account.
- **Daily upstreaming** to the CC — client funds are upstreamed (transferred to the CC) daily, where the CC holds them in trust pending settlement; see [Client funds upstreaming](/broking-kyc/deep-dives/settlement/client-funds-upstreaming/).
- **MFOS / FDR / cash variants** of upstreaming.
- **Quarterly running-account settlement** — periodically returning unused client funds to the client's bank account so the broker does not hold large balances.
- **Reconciliation** between broker's books, segregated bank account, and CC's view — daily.
- **Audit** — concurrent audit by an independent CA firm verifies segregation compliance.

### Securities segregation

- **CDSL / NSDL CUSPA / CSMFA framework** — client securities identifiable to specific BOs even when in broker pool accounts.
- **Direct payout to demat** (NCL/CMPT/66779 onwards) — settlement payouts flow directly to client BO, bypassing the broker pool.
- **Margin pledge / repledge framework** — client securities pledged to the broker for margin remain identifiable to the client; the broker repledges to the CC with full lineage preserved.
- **Pledge transparency** — clients receive pledge / unpledge confirmations from the depository directly.

### Penalty for segregation breach

- Misuse of client funds is one of the most serious broker offences. SEBI's enforcement framework imposes severe penalties — multi-crore monetary penalties, multi-year debarments, disgorgement of any benefit from misuse, criminal proceedings where appropriate.
- FIU-IND's 2023-24 alert indicators explicitly include "mis-utilisation of client funds by stock brokers detected during inspections / audits" as a flag for STR filing.

<Aside type="tip">
**The segregation framework is the *primary* client-protection layer; the IPF is a *secondary* backstop.** In a well-segregated broker, even after a default the recovery of client funds and securities through the segregation framework is nearly complete; the IPF gap-fills small residuals. In a broker that has misused client funds (segregation breach), the segregation framework fails, and the IPF has to absorb large gross losses — placing pressure on the IPF corpus.
</Aside>

## Client transfer-out — moving to another broker

A client of a defaulting broker often wants to move their relationship to another broker. The procedure:

### Step 1: Open account at new broker

Standard KYC / onboarding at the new broker (see [Broker process narrative](/broking-kyc/broker-process/narrative/) for the onboarding flow). The new broker registers fresh UCC at all the exchanges where the client wishes to trade.

### Step 2: Identify holdings at the defaulting broker

- **Client's own BO** (at CDSL / NSDL via the defaulting broker's DP or via a third-party DP): holdings here belong to the client.
- **TM CUSPA / CM CUSPA / TM CSMFA at the defaulting broker**: holdings here are claimable via the exchange's claim-filing process per the default management procedure.

### Step 3: Initiate inter-depository or intra-depository transfer

- If the client opens at the new broker with a fresh BO at the new broker's DP, holdings can be transferred from the old BO to the new BO via inter-depository (CDSL ↔ NSDL) or intra-depository (CDSL ↔ CDSL, NSDL ↔ NSDL) transfer.
- **No STT, no capital-gains event** — transfer is not a sale (see [Closure — closure-with-securities-transfer](/broking-kyc/lifecycle/closure/)).
- Holdings claimable from the CUSPA / CSMFA / pool flow back to client's BO via the depository's recovery instructions issued by the exchange.

### Step 4: Open positions at the defaulting broker

- Open derivative / MTF / pledged positions at the defaulting broker need special handling:
  - Derivative positions: typically squared off in the CC's special-settlement on default declaration; clients receive cash settlement of the MTM as of the default date.
  - MTF positions: the funding relationship terminates; the client's pledged securities are returned to the BO and the client owes / is owed the cash difference.
  - Pledged securities for margin: unpledged via the CC's release instruction; flow back to client BO.

### Step 5: Cash balance

- Cash balance in the client's segregated account at the defaulting broker is reconciled and refunded per the segregation-recovery process (Stage 5a above).
- Residual gap, if any, becomes an IPF claim.

### Step 6: Resume trading at the new broker

Once the transfer is complete (holdings in new BO, cash refunded, positions squared), the client resumes trading at the new broker as a normal onboarded client.

The end-to-end timeline varies — clean cases complete in 4-8 weeks; complex cases (segregation breach, large open derivative positions, contested holdings) take months.

## Historical defaults — illustrative examples

The Indian market has experienced several notable broker-default events that informed the current framework. Two illustrative reference points:

### Pre-2018 era — pre-segregation strengthening

In the period before SEBI's robust segregation framework was strengthened (broadly pre-2018), broker defaults often involved significant client-asset misuse with limited operational recovery options. The IPF was the primary recovery mechanism for retail investors.

### Karvy Stock Broking event (declared 2019-20)

- Karvy Stock Broking was declared a defaulter by NSE / BSE in 2019-20 period following SEBI's enforcement order finding misuse of client securities (pledging client securities for the broker's own borrowings without authorisation).
- Large volume of IPF claims processed across NSE / BSE IPFs.
- The event accelerated SEBI's segregation reforms — strengthened pledge/repledge framework, direct-payout-to-demat regime, and tighter client-securities segregation.
- The event is frequently cited in SEBI / exchange training material and in subsequent SEBI circulars on segregation as the case study informing the reforms.

### Post-2019 segregation reforms

The reforms that followed (and continue):
- **Pledge / repledge framework**: SEBI's framework requiring direct depository-level pledge of client securities to the broker, with the broker's repledge to the CC preserving client identification.
- **Direct payout to demat**: phased implementation from 2024 onwards (NCL/CMPT/63669 → NCL/CMPT/66779 dated Feb 21, 2025; ICCL 20250214-69 pilot; NCL/CMPT/67947 dated May 9, 2025; NCL/CMPT/69455 dated Aug 1, 2025).
- **Client-funds upstreaming**: daily upstreaming of client funds from broker to CC; quarterly running-account settlement.
- **Quarterly disclosure of segregation compliance** by brokers to exchanges.
- **UPI block / 3-in-1 facility for QSB** per SEBI/HO/MIRSD/MIRSD-PoD-1/P/CIR/2024/175 (Dec 17, 2024) — ASBA-like protection in cash market, effective Feb 1, 2025.

The cumulative effect is that a Karvy-scale segregation breach would today be substantially more difficult to perpetrate without earlier detection via the audit and reconciliation framework.

## Member suspension procedure

A formal member suspension involves:

### Exchange-level

- Membership status updated to "suspended" or "defaulter" in the exchange's member master.
- Trading rights revoked.
- Office access, trading-terminal access, FIX gateway access revoked.
- Authorised persons / sub-brokers / employees keyed-out.
- UCCs frozen.
- Notification posted on exchange website (defaulter / expelled members section).
- Cross-MII intimation to other exchanges, CCs, depositories.

### Clearing-corp level

- Clearing-member status updated to suspended / defaulter.
- Settlement obligations from the date of declaration handled per the default management procedure.
- Margin / collateral frozen and applied per waterfall.
- Reports to SEBI, RBI (where currency / IRD / debt segments involved).

### Depository level

- If the member is a DP, DP operations suspended; clients informed; DP transfer offered.
- If the member is not a DP but uses a third-party DP, the third-party DP is informed; clients' BO accounts may continue at the DP but the broker's authorisation to operate them is revoked.

### Regulatory level

- SEBI updates the broker registration status in its database.
- Other regulators (RBI for currency, IFSCA for GIFT IFSC operations, FIU-IND for AML reporting entity status) informed.
- Public-database updates: SEBI website's intermediary search, KRA records.

### Internal at member firm

- The firm's board / management often appoints an internal investigation / resolution professional under IBC if applicable.
- Employee onboarding / dismissal per the firm's HR procedure.
- Client communications per the exchange's prescribed communication template.

## Sub-cases and edge cases

### Default partly arising from operational error at the CC

If the default arose partly because of the CC's own operational error (e.g., margin call not communicated, settlement-window miscommunication), the CC may absorb part of the loss from its operational risk reserve before invoking the SGF stack. This is a CC-specific governance decision and is reported to SEBI.

### Default near month-end

A default occurring near month-end requires careful accounting reconciliation — segregated client funds may be subject to the quarterly running-account-settlement window; client securities may be in transit from CUSPA to client BO; corporate-action effects may overlap.

### Default involving multiple segments

A default in one segment typically triggers default declaration across all segments at the CC (cross-MII intimation). Each segment's loss is computed separately and each segment's SGF waterfall applies separately, but the defaulter's collateral may be applied across segments per inter-segment netting rules (typically permitted within the same CC for surplus deposits).

### Default of a clearing member that is not a trading member

A pure clearing member that clears for other trading members has a different client-base profile — clients are typically trading members and institutional clients, not retail. The IPF claim flow differs (institutional clients have their own recourse). The CC's waterfall still applies.

### Default of an AP / sub-broker (not the broker itself)

An Authorised Person (AP) of a non-defaulting broker that misappropriates client funds is *not* a "member default" under this framework — the broker remains the SEBI-registered member and is liable to the client. The dispute path is IGRC / arbitration / Smart ODR against the broker, **not** IPF. The broker may have recourse against the AP under its AP agreement, but the *client's* recovery is from the broker. See [Authorized Person framework](/broking-kyc/deep-dives/compliance-audit/ap-framework/).

### Default during a market outage

If a default coincides with a market outage (e.g., the SEBI Outage SOP under SEBI/HO/MRD/MRD-PoD-1/P/CIR/2024/57 dated 2024-05 for commodity derivatives, and analogous frameworks for other segments), the default-management procedure operates in conjunction with the outage SOP — settlement extension, trading-hours extension, and special-settlement provisions interact. The CC's risk-management committee and SEBI coordinate.

### Cross-CC simultaneous default

A clearing member registered across NSCCL, ICCL, and MCXCCL defaulting at one CC triggers cross-MII intimation. Each CC applies its own waterfall to the obligations at that CC; cross-CC asset application requires separate procedures involving both CCs and SEBI coordination. The inter-MII coordination framework under SEBI is the mechanism.

### Default in commodity-derivatives physical delivery

A default in the tender / delivery period of a physical-delivery commodity contract has special handling per MCX / MCXCCL framework. The MCX Master Circular on Investor Services Department (Default) Version 3 dated 2025-04-29 covers commodity-default specifics including warehouse-receipt handling and delivery-substitution procedures.

### Default with pending arbitration / SCORES complaints

Clients with pending arbitration awards or SCORES complaints against the defaulting member at the time of default declaration: the arbitration / SCORES procedure continues but the recovery moves into the default-management framework. Pending arbitration awards that go in favour of the client become part of the client's IPF claim.

### Client's holdings stuck in DP transition

If the defaulting broker was the client's DP and the client wants to move DP, holdings transfer to a new DP via the standard inter-DP / intra-depository transfer process. The default-management procedure expedites this where possible. Clients may face brief operational delays in accessing holdings during the transition.

## Practical notes

- **[industry practice]** Larger exchanges and CCs maintain a dedicated Default Management team — typically 5-15 personnel — with playbooks for each common default scenario (payin failure, margin shortfall, fraud-driven default). The team runs simulated default drills quarterly to test the playbook against current segregation, system, and reporting frameworks.
- **[gotcha]** A common client confusion is that holdings in the *client's own BO at CDSL / NSDL* are at risk during a broker default. They are *not* — the BO is the client's; the broker's DP-operating role merely services the BO. If the DP is the defaulting broker, the BO can be transferred to another DP without loss. The risk is to holdings in the *broker's pool / CUSPA / CSMFA accounts* — and even there, the segregation framework provides strong protection.
- **[risk trade-off]** The strong segregation framework reduces *systemic* client-asset risk at the cost of *operational* complexity for the broker — daily upstreaming, quarterly running-account settlement, pledge / repledge reconciliation, direct-payout-to-demat-aware OMS. Smaller brokers struggle with the operational overhead; consolidation in the industry is partly driven by this complexity.
- **[cost optimization]** Brokers that invest in *segregation automation* (automated daily reconciliation, automated quarterly settlement, exception-handling workflow) reduce operational risk and ops cost simultaneously. Manual segregation operations are expensive and error-prone, and errors directly translate to compliance findings or, in worst case, segregation breach.
- **[regulatory direction]** SEBI's segregation framework has tightened progressively since 2019 and is expected to continue tightening — the trend is toward *zero broker-pool exposure for clients* via direct-payout-to-demat and direct UPI-block settlement. The dependence on IPF and SGF for client-asset recovery has correspondingly declined and is expected to decline further.

## Cross-references

- [Deep Dive: SGF / Core SGF framework](./sgf-core-sgf/) — the funded waterfall that the default-management procedure applies.
- [Deep Dive: IPF](./ipf/) — investor-facing recovery for residual unrecovered amounts.
- [Deep Dive: Market manipulation typologies](./market-manipulation-typologies/) — manipulation-driven defaults.
- [Deep Dive: Pre-open / closing auction](./pre-open-closing-auction/) — settlement-price reference for default-related cash-out.
- [Deep Dive: Segment rules comparison](./segment-rules-comparison/) — segment-specific default procedures.
- [Deep Dive: Payin default + Core SGF draw](/broking-kyc/deep-dives/settlement/payin-default-core-sgf/) — the specific settlement-day default scenario.
- [Deep Dive: Client funds upstreaming](/broking-kyc/deep-dives/settlement/client-funds-upstreaming/) — the segregation framework for client funds.
- [Deep Dive: Direct payout to demat](/broking-kyc/deep-dives/settlement/direct-payout-to-demat/) — the framework reducing client risk from broker pool exposure.
- [Deep Dive: SCORES procedure](/broking-kyc/deep-dives/compliance-audit/scores-procedure/) and [IGRC](/broking-kyc/deep-dives/compliance-audit/igrc/) and [ODR](/broking-kyc/deep-dives/compliance-audit/odr/) — investor-dispute pathways upstream / parallel to IPF.
- [Deep Dive: Authorized Person framework](/broking-kyc/deep-dives/compliance-audit/ap-framework/) — distinguishing AP default from broker default.
- [Deep Dive: BMC / ABC](/broking-kyc/deep-dives/member-compliance/bmc-abc/) — member capital layer in the waterfall.
- [Lifecycle: Closure](/broking-kyc/lifecycle/closure/) — closure-with-securities-transfer logic used in client transfer-out from a defaulting broker.
- [Lifecycle: Transmission](/broking-kyc/lifecycle/transmission/) — handling of deceased clients with claims against a defaulting broker.
- [Operations: Compliance Blueprint](/broking-kyc/operations/compliance-blueprint/) — settlement / margin / surveillance domains that intersect with default.
- [Operations: Audit & Compliance](/broking-kyc/operations/audit-compliance/) — concurrent audit and segregation-verification framework.
- [Circulars — Clearing Corporations](/broking-kyc/reference/circulars/clearing-corps/) — NCL/CMPT/66779 (direct payout to demat Phase 2 go-live), NCL/CMPT/67947 (subsequent NSDL CM-pool clarification), NCL/CMPT/69455 (proprietary-UCC demat account separation), NCL/CMPT/71045 / NCL/CMPT/71441 (internal-shortage auction).
- [Circulars — MCX](/broking-kyc/reference/circulars/mcx/) — MCX Master Circular Investor Services Department (Default) Version 3 dated 2025-04-29; MCX/IPF/109/2026 corrigendum.
- [Circulars — SEBI MIRSD](/broking-kyc/reference/circulars/sebi-mirsd/) — segregation, broker AML / surveillance, UPI block for QSB.
- [Circulars — SEBI Other](/broking-kyc/reference/circulars/sebi-other/) — outage SOP for commodity derivatives, segregation framework, equity-index-derivatives framework.
- [Circulars — FIU-IND](/broking-kyc/reference/circulars/fiu-ind/) — alert indicators for misuse of client funds.

## Verified through

2026-05-14

---

*AI-generated and not legal, financial, or compliance advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*

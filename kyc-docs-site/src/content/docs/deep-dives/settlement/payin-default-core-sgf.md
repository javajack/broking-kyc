---
title: "Deep Dive: Payin Default and Core Settlement Guarantee Fund (Core SGF)"
description: Broker payin failure mechanics, T+1 morning cut-off, Core SGF draw rules, default-fund cascade, asset liquidation sequence (BMC / ABC / SGF contribution / Core SGF / settlement bank guarantees / ISFC interim funding), client-fund protection during default, suspension procedure, and post-default re-admission.
---

import { Aside } from '@astrojs/starlight/components';

> **Why this page is structured this way:** A payin default is a rare but high-stakes event. The page is structured as a sequence — first what triggers it, then exactly how the default is detected and declared, then the cascading recovery hierarchy from the member's own resources up to the Core SGF, then client-fund protection rules, suspension and post-default re-admission. The detail level is calibrated to what a compliance officer building a runbook needs.

## TL;DR

- **Payin default occurs when a clearing member fails to honour pay-in obligation by the T+1 cut-off** (typically 10:30 / 11:30 IST for the standard T+1 settlement under the [clearing-corp circulars](/broking-kyc/reference/circulars/clearing-corps/)). The defaulting member is declared in default and the clearing corp invokes its default-fund hierarchy.
- **Core Settlement Guarantee Fund (Core SGF)** is the apex layer of the CC's default-fund stack. It is jointly funded by the CC, its clearing members, the exchange, and SEBI. The CC's default-management committee (DMC) governs its draw.
- **Default-fund cascade (industry-standard order, drawn-down sequence):** Defaulter's BMC + ABC + own contribution to SGF → other members' contribution to Core SGF → CC's own contribution to Core SGF → SEBI / exchange backstop. The exact slabs are CC-specific (per [NCL/CMPT/61800](/broking-kyc/reference/circulars/clearing-corps/#ncl-cmpt-61800), [NCL/CMPT/61801](/broking-kyc/reference/circulars/clearing-corps/#ncl-cmpt-61801), and the MCXCCL master consolidated circular [MCX/MCXCCL/437/2023](/broking-kyc/reference/circulars/clearing-corps/#mcx-mcxccl-437-2023)).
- **Settlement bank guarantees** issued in favour of the CC by the broker's clearing bank provide an additional default cushion before Core SGF is touched.
- **ISFC** (Interim Settlement Fund Contribution / Interim Settlement Financing Cushion — terminology varies by CC) is the CC-level liquidity reserve providing same-day liquidity while longer-cycle recoveries proceed.
- **Client funds are protected by the upstreaming framework.** Per the June 2023 [client funds upstreaming](./client-funds-upstreaming/) mandate, EOD client funds sit with the CC — not the broker. The cash buffer needed for T+1 pay-in is the CC's downstreamed allocation, not broker-held funds.
- **Suspension and member-default declaration** follow the CC's Member Rules. Post-default re-admission is conditional on the resolution of dues, recapitalisation if needed, and SEBI clearance.
- Direct-payout-to-demat (post Nov 2024) means securities flow directly from CC pool to client demat — so payin default doesn't expose pre-paid client securities, only client pay-out flow.

## Conceptual overview

The Indian clearing-corp risk model is a multi-layered default-fund cascade. The principle is to absorb a defaulting member's loss without disrupting settlement for the rest of the market. The layers cover: (1) the defaulter's own collateral and deposits at the CC, (2) the defaulter's contribution to the Core SGF, (3) other members' Core SGF contributions, (4) the CC's own contribution, (5) any reinsurance / external backstop. The cascade is documented in each CC's master consolidated circular and forms one of the foundational risk-management chapters at the [Master Circular for Stock Exchanges and Clearing Corporations](/broking-kyc/reference/circulars/sebi-other/#sebi-ho-mrd2-pod-2-cir-p-2023-171).

For operations, payin default is a worst-case event. It triggers immediate consequences: position closure for the defaulting member, suspension or cancellation of clearing rights, recovery action by the CC against the broker's deposits and own funds, possible client-asset implications (for residual client positions held with the broker), and a regulatory inquiry. The entire margin and upstreaming framework — peak margin, intraday snapshots, client-level collateral segregation, EOD upstreaming, gross pay-in under direct-payout — exists in large part to *prevent* payin default. When prevention fails, the cascade above kicks in.

For a non-defaulting market participant, the visible effect is typically nil. The Core SGF absorbs the settlement loss, the rest of the market settles cleanly, and the inquiry into the defaulting member proceeds out of band. From the regulator's perspective, the quality of the framework is measured in two ways: (a) how rarely defaults occur (extremely rare in modern Indian markets — the framework is structurally tight) and (b) how cleanly the cascade contains a default when it does occur.

## 1. What triggers payin default

### 1.1 Pay-in obligations

For every settlement, the CC computes obligations for each clearing member: net funds to deliver (for net-buy positions) and net securities to deliver (for net-sell positions). The member must honour both by the prescribed cut-off — typically 10:30 / 11:30 IST for standard T+1 settlement, with separate cut-offs for auction settlements (08:00 / 10:00 IST), late-cycle settlements (16:30 / 21:00 IST), and T+0 settlements (15:30 / 16:00 IST for securities / funds, settlement complete 16:30).

A pay-in default occurs when the member fails to honour any of:

- Funds pay-in by the prescribed cut-off.
- Securities pay-in by the prescribed cut-off.
- Margin pay-in (variation margin / additional margin / surveillance margin) by the prescribed cut-off.
- Auction settlement (after short delivery) by the auction-settlement cut-off.
- Internal-shortage close-out valuation (settlement price + 20% per [NCL/CMPT/66779](/broking-kyc/reference/circulars/clearing-corps/#ncl-cmpt-66779)) by noon on settlement day.

Each is a distinct trigger; collectively they fall under "settlement default."

### 1.2 Pre-default warning signals

Pre-default, the member typically shows:

- **Risk Reduction Mode (RRM) activation** at the 90% collateral-utilisation threshold (per [NCL/CMPT/51657](/broking-kyc/reference/circulars/clearing-corps/#ncl-cmpt-51657)).
- **Margin shortfall** at peak-margin snapshots, evidenced via SA01 – SA06 reports per [NCL/CMPT/55381](/broking-kyc/reference/circulars/clearing-corps/#ncl-cmpt-55381).
- **MSBA invocation** (Margin Shortfall Block Amount) on commodity-segment members per MCXCCL master.
- **Networth proximity** to BMC threshold (members are required to disclose net-worth at half-yearly cadence per [NSE/COMP/64293](/broking-kyc/reference/circulars/nse/#nse-comp-64293)).
- **Bank confirmation delays** — the broker's settlement bank not confirming pay-in commitment by EOD.

The CC's risk-monitoring desk monitors these signals daily; persistent warnings can lead to additional margin call, position-restriction, or trading-suspension as preventive measures before actual default.

### 1.3 Default declaration

If pay-in is not honoured by the cut-off, the CC's process is:

1. **Grace window check.** Some CCs allow a brief grace window (minutes, not hours) for confirmed bank-side delays. If the member can prove a banking-side cause and confirm pay-in within the grace window, no default.
2. **Default invocation.** Beyond the grace window, the CC invokes its default procedure. The Default Management Committee (DMC) is notified.
3. **Position freeze.** The defaulting member's trading and clearing rights are frozen on the exchange and at the CC. No new positions; existing positions are tagged for orderly close-out.
4. **Settlement gap funding.** The CC pays the non-defaulting counterparties from its own resources (Core SGF / settlement guarantee, depending on the size and stage of cascade).
5. **Recovery action.** The CC initiates recovery against the defaulting member per the cascade described in Section 3.

The default declaration is a formal regulatory event. It's reported to SEBI under the CC's own master circular requirements. The member is intimated formally; clients of the defaulting member are notified through the exchange / depository / CC channels.

## 2. T+1 morning timeline (operational view)

A typical T+1 pay-in morning:

| Time | Activity | Default trigger / risk window |
| --- | --- | --- |
| 07:00 IST | CC opens settlement bank windows. Pay-in instructions can start flowing. | Pre-positioning |
| 08:00 IST | Auction settlement (settlement type A) pay-in cut-off. Pay-out 10:00 IST. | Auction-side default |
| 09:00 IST | CC publishes pay-in expected schedule per member. | Member confirms readiness |
| 10:30 IST | Final settlement 1 (M, Z, B segments) pay-in cut-off. Pay-out 15:30 IST. | Primary T+1 default trigger |
| 11:00 IST | Late-payment grace window for confirmed bank-side delays. | Grace |
| 11:30 IST | Securities pay-in confirmation. Direct-payout to client demat begins. | Securities default |
| 16:30 IST | Final settlement 2 pay-in cut-off. Pay-out 21:00 IST. | Late-cycle default |
| Noon | Internal-shortage close-out valuation (SP + 20%) payable by member to CC. | Close-out default |

Cut-offs vary by settlement number and CC. The above reflects the standard NSCCL T+1 pattern; refer to [NCL/CMPT/67751](/broking-kyc/reference/circulars/clearing-corps/#ncl-cmpt-67751) (FY 2024-25 CM master) and current monthly settlement-schedule circulars for precise timings.

## 3. Default-fund cascade — the recovery hierarchy

The CC has a defined sequence to recover the defaulted obligation. Each layer must be exhausted before moving to the next.

### 3.1 Layer 1 — Defaulter's own resources at the CC

1. **Cash / collateral allocated by the defaulter to TM / CM / client positions.** The CC has direct access to these. First drawn for client-segregated positions are protected to the extent of client-collateral; member-prop and CM-prop balances are immediately available.
2. **Defaulter's Base Minimum Capital (BMC).** Deposit held at the exchange for trading rights; partially redeployable by the CC for clearing default. BMC is per segment per the SEBI / exchange BMC schedule (see [Margin compliance domain MARGIN-024](/broking-kyc/operations/compliance-blueprint/#margin-compliance-30-entries) and [NSE/COMP/64293](/broking-kyc/reference/circulars/nse/#nse-comp-64293)).
3. **Defaulter's Additional Base Capital (ABC).** Voluntary deposit beyond BMC to expand permissible gross exposure; first-priority redeployable for default.
4. **Defaulter's contribution to Core SGF.** Each clearing member contributes to the Core SGF; the defaulter's contribution is drawn first within the Core SGF tier.
5. **Defaulter's settlement bank guarantees** issued in favour of the CC. The CC invokes the bank guarantee.

### 3.2 Layer 2 — Other members' Core SGF contributions

If Layer 1 is insufficient, the CC draws from other members' Core SGF contributions on a pro-rata basis subject to the cap defined in the CC's master rules. This is the "mutual loss-sharing" layer — non-defaulting members absorb a portion of the loss in proportion to their SGF contribution.

The cap (typically 100% of each member's individual Core SGF contribution) is set by the CC's master rules and is per-default — repeated defaults can hit the cap repeatedly within a defined period.

### 3.3 Layer 3 — CC's own contribution to Core SGF

If Layer 2 is exhausted, the CC's own contribution to Core SGF is drawn. This is the CC's "skin-in-the-game" piece — typically a meaningful percentage of total Core SGF set by SEBI / CC rules.

### 3.4 Layer 4 — Settlement bank lines / ISFC / interim funding

Where speed matters (same-day settlement closure for the non-defaulting market), the CC accesses pre-arranged settlement-bank credit lines or its Interim Settlement Funding Cushion (ISFC) for liquidity. These are repaid from the cascade above as the recovery progresses; they don't represent additional capital, they provide same-day liquidity while the cascade unwinds.

### 3.5 Layer 5 — SEBI / exchange backstop / additional contributions

If all the above are exhausted, additional capital may be sought from:

- The exchange (which has its own contribution to the CC's capital).
- SEBI's reinforcement mechanism — extraordinary measures including additional member calls, exchange-level recapitalisation, or extreme-event regulatory action.

This layer has rarely been touched in modern Indian market history — the defaults that have occurred (typically smaller members) have been contained within Layer 1 + Layer 2.

### 3.6 Asset-liquidation sequence

Within Layer 1, the practical liquidation order for non-cash assets:

1. **Cash.** Immediately available.
2. **FDR-on-lien.** Pre-terminated by the CC; cash credited.
3. **G-Sec / T-Bill / SGB.** Sold or repo'd by the CC.
4. **MFOS pledge.** Re-pledged units redeemed at NAV.
5. **Equity / ETF non-cash collateral.** Sold by the CC in the open market.

The CC's collateral framework prioritises cash and cash-equivalents (the 50% cash-equivalent rule at CM level per [NCL/CMPT/51657](/broking-kyc/reference/circulars/clearing-corps/#ncl-cmpt-51657)) precisely because they are immediately available for default recovery.

## 4. Core SGF structure and governance

### 4.1 What is Core SGF

The Core Settlement Guarantee Fund is the dedicated fund at each CC for absorbing clearing-member default losses. It is referenced in:

- [NCL/CMPT/61800](/broking-kyc/reference/circulars/clearing-corps/#ncl-cmpt-61800) (NSCCL CM Master FY 2023-24, superseded by FY 2024-25 master).
- [NCL/CMPT/61801](/broking-kyc/reference/circulars/clearing-corps/#ncl-cmpt-61801) (NSCCL F&O Master).
- [MCX/MCXCCL/437/2023](/broking-kyc/reference/circulars/clearing-corps/#mcx-mcxccl-437-2023) (MCXCCL Master FY 2023-24).
- [SETTLEMENT-008 in the Compliance Blueprint](/broking-kyc/operations/compliance-blueprint/#settlement-22-entries).

Each CC maintains a separate Core SGF for each segment (CM, F&O, CD, SLBS, Commodity, etc.). Cross-default-fund subsidisation between segments is generally not permitted.

### 4.2 Contribution composition

Each Core SGF has contributions from:

- **CC's own contribution** — the CC's "skin in the game," a SEBI-mandated percentage of the total Core SGF.
- **Clearing members' contributions** — each clearing member contributes per the CC's contribution schedule, typically a function of the member's exposure / volume / risk profile.
- **Exchange contribution** — the exchange (the CC's parent or affiliated exchange) contributes to the Core SGF.
- **SEBI / regulatory contributions** — for some segments, SEBI contributes via the Investor Protection Fund (IPF) or similar regulatory mechanisms.

Contribution amounts are reviewed at least annually and disclosed in the CC's annual master consolidated circulars.

### 4.3 Governance — Default Management Committee (DMC)

The DMC is a SEBI-mandated statutory committee at each CC, with composition prescribed in [SEBI/HO/MRD/MRD-PoD-3/P/CIR/2024/162](/broking-kyc/reference/circulars/sebi-other/#sebi-ho-mrd-mrd-pod-3-p-cir-2024-162) (Statutory Committees at MIIs, Nov 2024). The DMC:

- Reviews the Core SGF size periodically.
- Approves draw-down on Core SGF in default events.
- Determines the apportionment of loss across the cascade.
- Oversees post-default recovery from the defaulting member.
- Reports to the CC's Risk Management Committee and to SEBI.

### 4.4 Replenishment after draw

If Core SGF is drawn, replenishment is required:

- Defaulter's contribution is permanently absorbed (the defaulter is unlikely to recover the contribution).
- Other-member contributions drawn are replenished by the CC over a defined period — typically a few quarters — from CC retained earnings or by additional member calls.
- CC's own contribution drawn is replenished from CC operating capital.

Replenishment schedules are disclosed in the CC's master rules.

## 5. Client-fund protection during default

The post-2023 framework substantially insulates client funds and securities from broker default. The protections include:

### 5.1 Upstreamed client funds

Per the [client funds upstreaming](./client-funds-upstreaming/) mandate, EOD client funds sit with the CC, not the broker. If the broker defaults on T+1 morning, the funds needed for T+1 pay-in are *already at the CC* — downstreamed from CC to broker's DSCNBA earlier that morning. The CC's claim against the defaulting broker for shortage is fundamentally smaller because the bulk of client funds is in CC custody.

For partial upstreaming (residuals from late-night client deposits, etc.), the residual sits in the broker's USCNBA — potentially exposed to default. The exposure is small (single-day residuals) and the upstreaming compliance framework is designed to minimise it.

### 5.2 Direct-payout securities

Per the [direct payout to demat](./direct-payout-to-demat/) regime (post-Nov 2024), securities being paid out by the CC flow directly to client demat — they don't enter the broker's pool. A broker default mid-settlement doesn't expose client pay-out securities. The TM CUSPA (unpaid) and TM CSMFA (MTF) accounts hold the broker's pledged claim on unpaid / MTF-funded securities; these are in custody with depository-tracked pledge liens but the broker's claim survives default as a normal creditor claim.

### 5.3 Margin pledge

Client securities pledged for margin sit in the broker's CUSPA (sub-status 40 per CDSL primer Section 11) with a pledge lien. On broker default, the pledged securities remain with the client; the depository-tracked pledge lien is the broker's claim, which is governed by the CC's recovery procedure.

### 5.4 Running-account-settlement compliance

The quarterly running-account settlement (first Friday / Saturday per [SEBI/HO/MIRSD/MIRSD-PoD1/P/CIR/2023/197](/broking-kyc/reference/circulars/sebi-mirsd/#sebi-ho-mirsd-mirsd-pod1-p-cir-2023-197)) and the 30-day non-traded-credit-balance refund per [SEBI/HO/MIRSD/MIRSD-PoD/P/CIR/2025/04](/broking-kyc/reference/circulars/sebi-mirsd/#sebi-ho-mirsd-mirsd-pod-p-cir-2025-04) (Jan 2025) ensure that excess client funds with the broker are refunded to the client's bank account at high frequency.

### 5.5 What is at residual risk

Even with the above, some client exposure to broker default remains:

- **Same-day deposits.** Client funds deposited at the broker between cut-off-of-upstream (19:00 IST) and EOD reconciliation, not yet upstreamed.
- **TM CUSPA / TM CSMFA balances.** Pledged securities are economically the broker's claim; on default, the broker's claim is part of the recovery cascade, but client title to the underlying remains.
- **Unsettled trade obligations.** Trades executed between the broker and counterparties that haven't yet reached pay-in / pay-out — the CC's settlement guarantee covers these. Client positions in transit are settled by the CC.
- **Running-account credit balances** between settlement dates — minimised by the 30-day non-traded refund rule.

For practical purposes, the residual client exposure to broker default is small post-2023 — orders of magnitude smaller than pre-mandate practice — and is further mitigated by the [Investor Protection Fund](/broking-kyc/deep-dives/foundational/ipf/) maintained by each exchange.

<Aside type="tip">
**The upstreaming and direct-payout reforms together substantially address broker-default risk for clients.** Pre-2023, the worst-case loss to a client from broker default could approach the full client-funds-and-securities balance with the broker (subject to investor-protection-fund recovery). Post-2023, the residual exposure is a single-day intra-day window for funds and the broker's recovery claim on TM CUSPA / TM CSMFA pledges for securities — economically vastly smaller. The framework is now designed for "broker default is operationally disruptive but financially contained."
</Aside>

## 6. Suspension and member-default procedure

### 6.1 Immediate suspension

On default declaration:

- **Clearing rights suspended** at the CC. The CC stops accepting trades from the defaulting member for clearing.
- **Trading rights suspended** at the exchange. The member's terminals are disconnected; CTCL access revoked; FIX sessions terminated.
- **Position close-out initiated.** The CC tags the defaulting member's open positions for orderly close-out. Brokers nominated by the CC may take over the close-out execution.
- **Client positions transferred.** The CC initiates client position transfer per the SaaS portability / member-portability framework (per [NCL/CMPT/56168](/broking-kyc/reference/circulars/clearing-corps/#ncl-cmpt-56168) / [ICCL 20230329-18](/broking-kyc/reference/circulars/clearing-corps/#iccl-20230329-18) and [NCL/CMPT/64937](/broking-kyc/reference/circulars/clearing-corps/#ncl-cmpt-64937) mock sessions). The two-way SaaS portability allows positions to be moved to a designated alternate CM.

### 6.2 Member intimation

The defaulting member is formally intimated. The intimation:

- Cites the cause of default (specific obligation not honoured, amount, settlement number).
- Quantifies the loss covered by the CC.
- Lists assets / collateral that have been or will be applied.
- States the timeline for recovery action.
- Provides the route for member representation under the CC's Member Rules.

### 6.3 Client communication

Clients of the defaulting member are notified via:

- The exchange's investor-services channel.
- The depository's client-notification framework (BO holder notifications).
- The CC's website / circular.
- SEBI's investor-protection portal.

The notification includes the steps clients should take (e.g., contact the CC for transfer of trading account to an alternate broker), the protection afforded to upstreamed funds and pledged securities, and the route for any residual claim via the [Investor Protection Fund](/broking-kyc/deep-dives/foundational/ipf/).

### 6.4 Recovery from defaulting member

The CC pursues full recovery via:

- Liquidation of remaining collateral.
- Bank-guarantee invocation.
- Claim against the defaulting member's company (if a corporate entity) for the difference.
- Personal guarantee invocation if directors / promoters had given personal guarantees (common for smaller members).
- Civil and criminal proceedings as appropriate.

Recovery can extend over years. The Core SGF draw is the immediate funding bridge; the actual recovery from the defaulter happens over a longer timeline.

## 7. Post-default re-admission

A defaulting member may, in principle, be re-admitted to clearing membership after:

- Full settlement of dues to the CC, exchange, SEBI.
- Recapitalisation to meet the minimum networth and BMC requirements (Variable Networth = capital-adequacy linked to client funds handled, per [SEBI/LAD-NRO/GN/2022/73](/broking-kyc/reference/circulars/sebi-mirsd/) February 2022 gazette).
- Replenishment of Core SGF contribution.
- Resolution of any pending SEBI enforcement action.
- Member-rules compliance check at the CC and exchange.
- Fit-and-proper re-certification of directors / KMPs per [Member compliance domain](/broking-kyc/operations/compliance-blueprint/#member-compliance-23-entries).
- A waiting period (CC-specific; often a multi-month or multi-year minimum).

Re-admission is rare in practice; defaulting members typically wind up the clearing-membership entity and operate (if at all) under a fresh corporate structure with fresh membership.

## 8. Sub-cases and edge cases

### 8.1 Member experiencing temporary banking disruption

Not all pay-in misses are defaults. A temporary banking disruption (CC's settlement bank facing a technical issue, broker's bank facing an NPCI / RTGS issue) is typically handled with a grace window. The CC's Risk Monitoring Committee judges whether the cause is banking-side or member-side; banking-side disruptions don't trigger default declaration.

### 8.2 Auction-settlement default

Failure to honour auction pay-in (08:00 IST T+2 for normal T+1 auctions) is a separate default trigger from the main T+1 pay-in. The auction profits / losses are absorbed by the CC and recovered from the failing party per the close-out rule.

### 8.3 Internal-shortage close-out failure

A member that fails to pay the internal-shortage close-out valuation (settlement price + 20% per [NCL/CMPT/66779](/broking-kyc/reference/circulars/clearing-corps/#ncl-cmpt-66779)) by noon on settlement day triggers an internal-shortage default. The CC computes the loss, the member is subject to additional surveillance margin, and persistent failure cascades to full default declaration.

### 8.4 Two-way CC SaaS portability activation

Per [NCL/CMPT/56168](/broking-kyc/reference/circulars/clearing-corps/#ncl-cmpt-56168) / [ICCL 20230329-18](/broking-kyc/reference/circulars/clearing-corps/#iccl-20230329-18), each CC maintains an RMS instance for the other (NCL@ICCL and ICCL@NCL). On a CC-level technical failure, the alternate CC's RMS takes over real-time position / margin / collateral computation. Periodic mock sessions (quarterly per [NCL/CMPT/64937](/broking-kyc/reference/circulars/clearing-corps/#ncl-cmpt-64937)) verify the failover. This is a CC-level BCP, not a member-default mechanism, but it interacts with default cascade if the CC itself is impacted.

### 8.5 Cross-CC offset on default

A defaulting member may have offsetting positions across CCs (e.g., long at NSCCL, short at ICCL). The default is processed per-CC; cross-CC netting requires explicit member-portability arrangements. In practice, the defaulter's collateral at each CC stays at that CC for the default recovery; cross-CC residuals flow per the CC's recovery procedure.

### 8.6 Bank-CM default

A bank-CM (a bank that is also a clearing member) defaulting introduces additional regulatory complexity because the bank's own prudential framework intersects with the CC's default-fund cascade. The CC's procedure adapts — typically RBI's involvement is required, and the bank-CM's clearing role can be transferred to an alternate CM while the bank's depositor-protection framework handles the bank-level concerns.

### 8.7 Defaulter with client positions to be transferred

The CC works with the exchange and the depository to identify an alternate broker willing to take over the defaulting member's client base. The clients are typically given a choice of brokers, with a default transfer to a designated alternate. UCC, BO, and KRA records are migrated; client funds and pledged securities are transferred. The process can take several days; in the interim, clients have read-only access to their positions and demat holdings, with no trading capability under the defaulting member.

### 8.8 Multiple-day default

A member that defaults on one settlement but is otherwise solvent may, in principle, cure the default and resume operations. Multi-day defaults trigger immediate full suspension. The CC's procedures handle multi-day defaults as a single declaration with continuous loss-recovery.

### 8.9 Cyber-incident-triggered default

A cyber incident at the broker that prevents pay-in could be treated under [SEBI/HO/MIRSD/TPD/P/CIR/2022/93](/broking-kyc/reference/circulars/sebi-mirsd/#sebi-ho-mirsd-tpd-p-cir-2022-93) (Technical Glitch / Cyber Incident) reporting framework rather than as a pure financial default — provided the broker promptly reports per the 6-hour CERT-In incident rule and demonstrates that the incident, not insolvency, caused the failure. The CC's risk-monitoring committee judges this on the evidence.

<Aside type="caution">
**Repeated peak-margin shortfalls are a default precursor.** Brokers that show persistent SA01 – SA06 short-allocation reports (per [NCL/CMPT/55381](/broking-kyc/reference/circulars/clearing-corps/#ncl-cmpt-55381)) over weeks are flagged by the CC's surveillance and may be subject to enhanced margin, exposure reduction, or trading restriction *before* an actual default. Compliance officers tracking these reports daily are the early-warning line.
</Aside>

## 9. ISFC and settlement bank guarantees

### 9.1 ISFC

ISFC (Interim Settlement Funding Cushion / Interim Settlement Fund Contribution — exact terminology varies by CC) is the CC's same-day liquidity facility. It provides cash to keep settlement running while the longer-cycle recovery from the defaulter proceeds. ISFC may be funded from:

- The CC's own retained earnings / liquid assets.
- Pre-arranged credit lines with settlement banks.
- A dedicated settlement-bank-issued liquidity facility.

ISFC is not a default-loss-absorbing layer per se — it's a liquidity bridge. Losses are absorbed by the Core SGF cascade; ISFC funds the same-day settlement while that cascade unwinds.

### 9.2 Settlement bank guarantees

Members are required (or may opt) to issue bank guarantees from their settlement bank in favour of the CC, covering specified settlement obligations. The bank guarantee:

- Is in the standard CC-mandated format.
- Is renewed periodically (typically annually).
- Becomes invocable on member default.

The bank guarantee gives the CC a direct claim on the issuing bank, simplifying recovery. The bank, in turn, has recourse to the member. The chain "CC → settlement bank → member" allows fast recovery for the CC while the member's solvency works itself out.

Approved settlement banks per the quarterly approved-banks list (e.g., [MCX/MCXCCL/094/2026](/broking-kyc/reference/circulars/clearing-corps/#mcx-mcxccl-094-2026) Annexure 4) form the eligible universe for BG issuance.

## 10. Comparative table — what each layer covers

| Layer | Funded by | Covers | Drawn first / last |
| --- | --- | --- | --- |
| Defaulter's allocated collateral | Defaulter | Client-segregated client positions + own positions | First |
| Defaulter's BMC | Defaulter | Defaulter's obligation | After allocated collateral |
| Defaulter's ABC | Defaulter | Defaulter's obligation | After BMC |
| Defaulter's Core SGF contribution | Defaulter | Defaulter's obligation | After ABC |
| Settlement bank guarantee | Defaulter's settlement bank | Defaulter's obligation | Parallel / fast-track |
| Other members' Core SGF contribution | Non-defaulting members | Loss above defaulter's resources | Pro-rata after Layer 1 |
| CC's own Core SGF contribution | CC | Loss above member-mutualisation cap | After other members' SGF |
| SEBI / exchange backstop | SEBI / exchange | Extreme losses | Last |
| ISFC / liquidity lines | CC pre-arranged | Same-day liquidity, not loss-absorption | Parallel during cascade |
| Investor Protection Fund (exchange) | Exchange-administered | Direct client claims unaffected by CC framework | Separate parallel layer for clients |

## Practical notes

- **[industry typical]** Modern Indian markets see clearing-member defaults very rarely — the framework's combination of pre-trade margin, peak-margin snapshots, intraday short-allocation reporting, EOD upstreaming, and the SaaS-portability layer is structurally tight. When defaults occur, they are typically smaller members and contained within Layer 1 of the cascade.
- **[gotcha]** A member showing persistent SA01 – SA06 short-allocation reports (per [NCL/CMPT/55381](/broking-kyc/reference/circulars/clearing-corps/#ncl-cmpt-55381)) is materially closer to default than a one-off shortfall. Compliance officers should treat persistent intraday short allocation as a structural risk indicator, not a one-off operational issue.
- **[risk trade-off]** The Core SGF is a mutualised loss-sharing mechanism — non-defaulting members contribute, and on a default cascade, their SGF contribution is drawn (subject to the cap). Members holding a larger SGF contribution have greater systemic exposure to peer defaults. Most members size their SGF participation conservatively given this.
- **[industry typical]** The Default Management Committee (DMC) and the Risk Management Committee at each CC have statutory composition per [SEBI/HO/MRD/MRD-PoD-3/P/CIR/2024/162](/broking-kyc/reference/circulars/sebi-other/#sebi-ho-mrd-mrd-pod-3-p-cir-2024-162) (Nov 2024). The independence requirements (Independent External Professionals constraint, Public Interest Directors caps) are specifically designed to insulate default-handling from member influence.
- **[gotcha]** Direct-payout-to-demat changed where the broker's default would expose client securities. Pre-mandate, the pool account was the failure point. Post-mandate, the failure point is the TM CUSPA / TM CSMFA pledges — where the broker holds a depository-tracked claim, not the securities themselves. Operationally easier to recover; client title to the underlying remains.
- **[cost optimization]** Brokers maintaining excess BMC / ABC beyond the minimum prudential threshold absorb a lower cascade load — their own resources cover more of any default — but at the cost of capital deployed. The trade-off is broker-specific and reflects size, mix of client book, and risk appetite.
- **[industry typical]** Post-default member re-admission is exceedingly rare. In practice, defaulting members wind down and the principals re-enter the market (if at all) under a new corporate entity with fresh membership, fit-and-proper attestation, BMC contribution, and SGF participation. This pattern is well-recognised in the Indian regulatory community.
- **[gotcha]** The "default" word is overloaded: settlement default (failure to pay-in), margin default (failure to meet margin call), regulatory default (failure to comply with a SEBI direction). Each has distinct procedures. A SEBI-imposed restriction on a member is not the same event as a CC-declared settlement default; the cascade applies only to the latter.
- **[risk trade-off]** Settlement bank guarantees give the CC a fast claim path but cost the broker per the bank's BG fee schedule. Many brokers minimise reliance on BG by upstreaming generously and maintaining higher cash collateral, accepting the lower yield on cash collateral as the trade-off against BG cost.
- **[industry typical]** Bank-CM members (clearing members that are themselves banks) have a different default profile — their own prudential regime intersects with the CC's framework, and RBI involvement is typical in any default-handling.

## Cross-references

- [Broker Process Narrative — Section 3 (Settlement Cycle)](/broking-kyc/broker-process/narrative/#3-the-settlement-cycle) — chronological narrative
- [Integration DAG — EOD & settlement](/broking-kyc/operations/integration-dag/eod-settlement/) — SET-PAYIN-EXECUTE node and default fall-through
- [Compliance Blueprint — Settlement domain](/broking-kyc/operations/compliance-blueprint/#settlement-22-entries) — SETTLEMENT-008 / 009 / 011 entries
- [Compliance Blueprint — Margin domain](/broking-kyc/operations/compliance-blueprint/#margin-compliance-30-entries) — MARGIN-024 / 027 / 028 entries (BMC, 50% cash equivalent, short allocation)
- [SGF / Core SGF deep dive](/broking-kyc/deep-dives/foundational/sgf-core-sgf/) — foundational layer detail
- [Investor Protection Fund (IPF) deep dive](/broking-kyc/deep-dives/foundational/ipf/) — exchange-administered client-claim layer
- [Member default recovery deep dive](/broking-kyc/deep-dives/foundational/member-default-recovery/) — sibling page on member-default mechanics
- [Client funds upstreaming deep dive](./client-funds-upstreaming/) — what's at the CC vs at the broker
- [Direct payout to demat deep dive](./direct-payout-to-demat/) — securities-side custody changes
- [BMC / ABC deep dive](/broking-kyc/deep-dives/member-compliance/bmc-abc/) — capital adequacy details
- [Circulars — Clearing corps](/broking-kyc/reference/circulars/clearing-corps/) — NSCCL / ICCL / MCXCCL master circulars
- [Circulars — SEBI other](/broking-kyc/reference/circulars/sebi-other/) — SE&CC master circular and statutory committees

## Verified through

2026-05-14

---

*AI-generated and not legal, financial, or compliance advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*

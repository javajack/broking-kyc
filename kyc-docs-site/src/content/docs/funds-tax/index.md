---
title: "Funds & Tax"
description: The money layer of a broking relationship — how funds come in, how they go back out, what gets charged, what the client can see, what is taxed, and what happens to the securities.
---

> **Why this page is structured this way:** the eight pages in this section follow the money in the order a client experiences it — in, out, charged, shown, taxed — with two pages on what happens to securities rather than cash. The selector below is ordered that way, so a reader who knows which stage of the cycle their question belongs to can go straight to the page without reading the section.

## TL;DR

- 8 topic pages plus this overview, covering the client-facing money layer: pay-in, payout, delayed-payment charges, the charge stack, statements, tax reporting, corporate actions, and demat servicing.
- Each page carries its regulatory anchors as circular IDs, a field-level table where a form, file, API or screen exists, alternatives where the industry genuinely differs, and practical notes tagged by type.
- This section is the client-facing counterpart to the broker-side settlement deep-dives. Where a broker-side page already exists, these pages summarise it in a paragraph and link rather than repeat.
- AI-generated synthesis. **Verify every rate, threshold and date against the current circular and your own back-office configuration before relying on it.**

## Page selector

| Page | The question it answers | Primary regulatory anchors | Read it when |
| --- | --- | --- | --- |
| [pay-in rails](./payin-rails/) | How does money get into a trading account, and whose money is it allowed to be? | Broker master circular paragraphs 28 and 29; [<abbr title="Securities and Exchange Board of India">SEBI</abbr>/<abbr title="Head Office (SEBI circular ID prefix)">HO</abbr>/<abbr title="Market Regulation Department (SEBI)">MRD</abbr>/MRD-PoD-2/P/CIR/2024/153](/broking-kyc/reference/circulars/sebi-other/#sebihomrdmrd-pod-2pcir2024153); [<abbr title="National Payments Corporation of India">NPCI</abbr>/<abbr title="Unified Payments Interface">UPI</abbr>/OC No. 217/2025-26](/broking-kyc/reference/circulars/npci/#npciupioc-no-2172025-26) | Designing a funding screen, choosing rails, or handling a third-party credit |
| [payout and running-account settlement](./payout-running-account/) | When must the broker give the money back, and how much may it keep? | Broker master circular paragraphs 23.1 and 48; [SEBI/HO/<abbr title="Markets Intermediaries Regulation and Supervision Department (SEBI)">MIRSD</abbr>/MIRSD-PoD1/P/CIR/2025/1](/broking-kyc/reference/circulars/sebi-mirsd/#sebihomirsdmirsd-pod1pcir20251); [SEBI/HO/MIRSD/MIRSD-PoD1/P/CIR/2023/197](/broking-kyc/reference/circulars/sebi-mirsd/#sebihomirsdmirsd-pod1pcir2023197) | Building the quarterly or monthly settlement run, or explaining a retained balance |
| [delayed payment charges](./delayed-payment-charges/) | What may the broker charge when the client's money is late? | Broker master circular paragraphs 23.4.4 and 23.4.5; <abbr title="National Stock Exchange of India">NSE</abbr> client-fund-balance clarification; [HO/38/11/(9)2026-MIRSD-POD/I/15382/2026](/broking-kyc/reference/circulars/sebi-mirsd/#ho381192026-mirsd-podi153822026) | Writing or auditing a <abbr title="Delayed Payment Charges">DPC</abbr> policy, or defending a charge in a dispute |
| [brokerage and charges](./brokerage-and-charges/) | What does a trade actually cost, and who sets each component? | [SEBI/HO/MRD/TPD-1/P/CIR/2024/92](/broking-kyc/reference/circulars/sebi-other/#sebihomrdtpd-1pcir202492); [SEBI/<abbr title="Legal Affairs Department — Northern Regional Office (SEBI)">LAD-NRO</abbr>/GN/2026/291](/broking-kyc/reference/circulars/sebi-other/#sebilad-nrogn2026291); Finance Act 2026; Indian Stamp Act Schedule I | Designing a tariff sheet, a pricing plan, or a charges calculator |
| [ledger and statements](./ledger-and-statements/) | What can the client see, and on what cadence? | Broker master circular statement and contract-note provisions; depository <abbr title="Consolidated Account Statement">CAS</abbr> framework | Specifying client-facing statements, bills, or the funds and holdings views |
| [tax reporting](./tax-reporting/) | What does the client owe, and what does the broker report? | Income-tax capital-gains provisions; <abbr title="Securities Transaction Tax">STT</abbr> framework; <abbr title="Statement of Financial Transactions">SFT</abbr> and <abbr title="Annual Information Statement">AIS</abbr> reporting rules | Building a tax P&L, or reconciling a client's AIS against their trades |
| [corporate actions](./corporate-actions/) | What happens to holdings when the issuer does something? | Depository corporate-action frameworks; exchange and clearing-corporation event circulars | Handling dividends, bonuses, splits, demergers, rights, buybacks or delisting |
| [demat servicing](./demat-servicing/) | What happens to the securities themselves, outside a trade? | Depository operating instructions; SEBI depository-participant circulars | Handling dematerialisation, remat, off-market transfers, gifts or freezes |

The first four pages are about cash: what enters the account, what leaves it, what is deducted from it, and what it costs to transact. The middle two are about visibility and obligation: what the client is shown, and what the client and the state each have to reckon with at the end of the year. The last two are about securities: what an issuer's action does to a holding, and what a client can do to a holding without trading it.

## How this section relates to the rest of the site

The site already documents the money layer from the broker's side. The [settlement deep-dives](/broking-kyc/deep-dives/) cover client funds and upstreaming, direct payout to demat, pay-in default and the core settlement guarantee fund, the <abbr title="Trade-date Plus N settlement">T+0</abbr> and <abbr title="Trade-date Plus N settlement">T+1</abbr> cycles, margin trading facility and securities lending — all from the perspective of a broker meeting obligations to a clearing corporation. This section approaches the same machinery from the client's side of the counter: what the client sees, chooses, pays, receives and disputes.

That division is deliberate and the pages hold to it. Where a broker-side deep-dive already exists, the client-facing page summarises it in at most a paragraph and links across. The upstreaming architecture is described once, in the [client funds and upstreaming deep-dive](/broking-kyc/deep-dives/settlement/client-funds-upstreaming/), and referenced from the payout page rather than restated there.

Four other layers of the site connect to these pages directly.

- **What must happen** — the [Compliance Blueprint](/broking-kyc/operations/compliance-blueprint/) lists the verifiable obligations behind these topics: half-yearly SEBI turnover-fee payment, monthly stamp-duty remittance, running-account settlement timeliness, and the reporting returns that aggregate delayed-payment charges.
- **Where the data flows** — the [Field-level Data Flow Atlas](/broking-kyc/reference/field-atlas/) carries the field-by-field destinations. [Section AC](/broking-kyc/reference/field-atlas/sections/ac-running-account-settlement/) covers the running-account authorisation, [Section G](/broking-kyc/reference/field-atlas/sections/g-bank-account/) the bank master that pay-in reconciliation reads, and the [contract-notes destination](/broking-kyc/reference/field-atlas/destinations/contract-notes/) the charge block that the tariff resolves into.
- **What runs before what** — the [Integration <abbr title="Directed Acyclic Graph.">DAG</abbr>'s <abbr title="End Of Day">EOD</abbr> and settlement page](/broking-kyc/operations/integration-dag/eod-settlement/) places charge computation, contract-note generation and pay-in staging in dependency order.
- **Who reads what** — the [Finance and CFO path](/broking-kyc/personas/finance-cfo/) and the [Operations Lead path](/broking-kyc/personas/operations-lead/) both route through this section; the charges page is the commercial entry point and the payout page the operational one.

Onboarding-side context sits in the [User Journey](/broking-kyc/journey/), particularly [Screen 5: Bank Account](/broking-kyc/journey/05-bank-account/), where the bank master that everything on the pay-in and payout pages depends on is first captured and verified.

## Practical notes

- **[gotcha]** The most common structural error in this area is treating three different client events as one: ordinary settlement after a payout, a voluntary withdrawal request, and mandatory periodic running-account settlement have different triggers and different deadlines. The payout page separates them explicitly.
- **[gotcha]** Money blocked at a client's own bank under the UPI-block or qualifying 3-in-1 route is not a broker-held balance. It does not enter the client ledger, the running-account settlement population, or the delayed-payment-charge netting calculation.
- **[industry practice]** Brokers publish a charges page, a charges calculator and a mandatory tariff sheet. Only the tariff sheet governs, and the three drift apart unless a single effective-dated tariff master feeds all of them.
- **[risk trade-off]** Every page in this section documents an area where the regulator prescribes disclosure rather than a number. That latitude is commercially useful and shifts the entire burden of justification onto the broker's own documents — which is why the field tables here emphasise policy version, effective date and computation provenance.
- **[cost optimization]** For a delivery investor the dominant transaction costs are statutory and cannot be optimised. Cost work in this section pays off mainly in reconciliation effort avoided, not in levies saved.

## Verified through

2026-09-11

---

*AI-generated and not legal, financial, or compliance advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*

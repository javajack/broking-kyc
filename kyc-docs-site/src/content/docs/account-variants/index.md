---
title: "Account Variants"
description: Selector for the eleven client-account variants — who is eligible, what documents each needs, which segments it can reach, and how each one is coded at the KRA, CKYC, exchange UCC and depository.
---

> **Why this page is structured this way:** The resident-individual journey is the baseline the rest of this site documents screen by screen. Every page in this section is a delta against it. The selector table below is therefore organised around the four places a variant actually diverges — eligibility, documents, permitted segments, and the codes each destination system expects — so you can find your variant, read its row, and go straight to the page that carries the field-level detail.

## Start here

The nine screens in [Journey](/broking-kyc/journey/) describe onboarding for a resident individual opening a trading and demat account. That flow is the reference implementation; a variant changes it in one or more of four ways:

1. **Eligibility** — who may hold the account at all, and who may operate it.
2. **Documents** — what must be collected beyond <abbr title="Permanent Account Number">PAN</abbr>, address and a bank proof, and who signs.
3. **Segments** — what the account is permitted to trade once open, which is often narrower than what the client expects.
4. **Codes** — the <abbr title="KYC Registration Agency">KRA</abbr> form set, the <abbr title="Central KYC (records registry)">CKYC</abbr> template, the exchange <abbr title="Unique Client Code">UCC</abbr> client category, and the depository beneficial-owner account type and sub-status. These are the four destinations that reject a wrongly classified account.

Nothing else changes. Order entry, margining, contract notes, settlement, corporate actions and grievance handling work identically for every variant — see [Broker process narrative](/broking-kyc/broker-process/narrative/) and the [deep dives](/broking-kyc/deep-dives/).

## Variant selector

| Variant | Eligibility in one line | Documents beyond the individual baseline | Segments typically available | KRA / CKYC template | UCC client category | <abbr title="Beneficial Owner">BO</abbr> account type / sub-status |
| --- | --- | --- | --- | --- | --- | --- |
| [Minor](./minor/) | Minor as sole and first holder; a natural or court-appointed guardian operates | Minor's PAN and DOB evidence, guardian PAN and <abbr title="Know Your Customer (process).">KYC</abbr>, guardianship evidence | Cash-segment **sale only** of securities already acquired; no F&O, currency, commodity, intraday or short selling | Individual form for both minor and guardian; individual CKYC template | Individual category — there is no minor category | Minor account type; individual status with a minor sub-status |
| [<abbr title="Non-Resident Indian">NRI</abbr>](./nri/) | Person resident outside India; <abbr title="Overseas Citizen of India">OCI</abbr>; after June 2026, individual non-residents generally | Passport, visa or residence permit, overseas address, <abbr title="Non-Resident External (Rupee) account">NRE</abbr> or <abbr title="Non-Resident Ordinary (Rupee) account">NRO</abbr> bank proof, <abbr title="Portfolio Investment Scheme (RBI / NRI)">PIS</abbr> letter on the PIS route, <abbr title="Foreign Account Tax Compliance Act (US)">FATCA</abbr> and <abbr title="Common Reporting Standard">CRS</abbr> certification, TRC for a treaty claim | Equity delivery on both routes; derivatives on the non-PIS route; no intraday or short selling | Individual form; individual CKYC template; FATCA and CRS mandatory | NRI category | Individual status with distinct repatriable and non-repatriable NRI sub-statuses — normally two accounts |
| [<abbr title="Hindu Undivided Family">HUF</abbr>](./huf/) | Hindu Undivided Family acting through its Karta | HUF PAN, HUF deed or declaration, Karta identity and KYC, coparcener declaration | Cash and derivatives, subject to the broker's policy for non-individual clients | Non-individual form; legal-entity CKYC template | HUF category | HUF account type; non-individual status |
| [Partnership / <abbr title="—">LLP</abbr>](./partnership-llp/) | Partnership firm or LLP acting through authorised partners | Deed or LLP agreement, LLPIN or registration certificate, partner KYC, authorised-signatory list, <abbr title="Ultimate Beneficial Owner">UBO</abbr> declaration | Cash and derivatives, per the broker's non-individual policy | Non-individual form; legal-entity CKYC template | Non-individual category `[unknown — verify]` | Non-individual account type and sub-status `[unknown — verify]` |
| [Company](./company/) | Company acting through a board resolution | CIN, MOA and AOA, board resolution, authorised-signatory list, UBO and SBO declarations, <abbr title="Legal Entity Identifier">LEI</abbr> above the threshold | Cash and derivatives, per the broker's non-individual policy | Non-individual form; legal-entity CKYC template | Corporate category | Corporate or body-corporate account type and sub-status |
| [Trust, society, AOP](./trust-society-aop/) | Trust, society or AOP acting through trustees or office bearers | Registration certificate, trust deed or bye-laws, trustee KYC, resolution, UBO determination for trusts | Cash and derivatives, per the broker's policy and the entity's charter | Non-individual form; legal-entity CKYC template | Non-individual category `[unknown — verify]` | Non-individual account type and sub-status `[unknown — verify]` |
| [<abbr title="Foreign Portfolio Investor">FPI</abbr> / <abbr title="Foreign Venture Capital Investor">FVCI</abbr>](./fpi-fvci/) | FPI or FVCI registered through a designated depository participant | Common Application Form, registration certificate, category evidence, custodian and <abbr title="Designated Depository Participant">DDP</abbr> documentation, tax documentation | Segments permitted to the FPI category, cleared through a custodian | FPI route rather than the retail KRA path; separate FPI KYC regime | FPI category with its sub-classifications | Foreign-investor account type and sub-status per the depository |
| [Joint accounts](./joint-accounts/) | Up to three individual holders on the demat account; the trading account stays in the first holder's name | Full KYC for every holder, every holder's signature, mode-of-operation mandate, all-holder consent where a nomination is made | Determined entirely by the first holder's profile and segment activation | Individual form per holder; individual CKYC template per holder | First holder's category only | Joint account type; holding pattern for two or three holders |
| [<abbr title="Basic Services Demat Account">BSDA</abbr>](./bsda/) | A charging status: an individual with one account as sole or first holder, one BSDA across depositories, holdings up to Rs.10 lakh | None beyond the baseline; an email opt-out record where the client declines | No effect on segments | No effect | No effect | BSDA flag and opt-out consent date on the existing account |
| [Bank-led 3-in-1](./bank-broker-3in1/) | A settlement model: available where one group holds the bank, the <abbr title="Depository Participant">DP</abbr> and the broker | None beyond the baseline; facility election and linked savings-account mapping | No effect on segments; changes the pay-in path in the cash segment | No effect | No effect | No effect; the DP identity differs |
| [Institutional / custodial](./institutional-custodial/) | <abbr title="Portfolio Management Services">PMS</abbr>, AIF, mutual-fund and insurance clients clearing through a custodian; also sole proprietors and family mapping | Entity constitution documents, custodian agreement, CP code allotment, give-up and take-up arrangements | Segments per entity type, with custodian confirmation in settlement | Non-individual form; legal-entity CKYC template | Institutional categories | Non-individual account type and sub-status per the depository |

Codes shown are as carried in this site's own code tables — see [Reference: code tables](/broking-kyc/reference/code-tables/), [<abbr title="National Stock Exchange of India">NSE</abbr> UCC destination](/broking-kyc/reference/field-atlas/destinations/nse-ucc/) and [<abbr title="Central Depository Services (India) Limited">CDSL</abbr> BO master destination](/broking-kyc/reference/field-atlas/destinations/cdsl-bo/). The exchanges also express client categories numerically in their upload annexures, and the numeric and mnemonic encodings are not interchangeable; the depositories' numeric sub-status masters are participant-specific. Verify both against the current issuer specification.

## Reading the table

Three patterns explain most of the rows.

**Two of the eleven are not holder types.** BSDA is a charging status applied to an otherwise ordinary account, and a 3-in-1 is a settlement-integration model. They appear here because clients and product teams treat them as account types, and because both have onboarding consequences — a default-on BSDA flag, and a facility election that determines the pay-in path.

**Segment availability is a separate decision from account opening.** A row says what the account can normally reach, not what it will be permitted on day one. Income proof, risk disclosure and the exchange segment activation flags are their own gates, documented in the product-activation section rather than here.

**Non-individual variants share more than they differ.** HUF, partnership, LLP, company, trust and society all need four things: the entity's PAN, its constitutional document, evidence of who is authorised to act for it, and a determination of who ultimately owns or controls it. The pages differ mainly in what counts as evidence for the last two. [Appendix: non-individual entities](/broking-kyc/appendix/non-individual-entities/) is the earlier short treatment.

## How this section relates to the rest of the site

This section is the client-facing counterpart to three existing layers. [Journey](/broking-kyc/journey/) gives the screen-by-screen baseline these pages are deltas against. The [field atlas](/broking-kyc/reference/field-atlas/) gives the field-to-destination mapping — [Section V](/broking-kyc/reference/field-atlas/sections/v-nri-specific/) for NRI fields, [Section W](/broking-kyc/reference/field-atlas/sections/w-minor-joint/) for minor, joint and <abbr title="Power of Attorney">POA</abbr> fields — which these pages reference rather than restate. [Lifecycle](/broking-kyc/lifecycle/) covers what happens after opening: [re-KYC](/broking-kyc/lifecycle/re-kyc/), [modifications](/broking-kyc/lifecycle/modifications/), [transmission](/broking-kyc/lifecycle/transmission/), [closure](/broking-kyc/lifecycle/closure/) and [NRI conversion](/broking-kyc/lifecycle/nri-conversion/).

Where a broker-side deep dive exists, these pages summarise and link rather than repeat. [Vendors](/broking-kyc/vendors/) carries the interface detail for the KRA, CKYC, the exchanges and the depositories; the [compliance blueprint](/broking-kyc/operations/compliance-blueprint/) carries the obligation rows variant handling creates.

## Verified through

2026-09-11

---

*AI-generated and not legal, financial, or compliance advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*

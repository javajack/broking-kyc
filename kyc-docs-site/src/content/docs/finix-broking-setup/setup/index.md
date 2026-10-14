---
title: "Setting up: overview"
description: The critical path from an idea to a first live order — entity and capital, SEBI registration under the 2026 regulations, membership at NSE, BSE and MCX, the clearing arrangement, depository participation, bank account architecture, people and certifications, infrastructure, vendor contracts, and exchange certification — ordered as a dependency graph with the real bottlenecks named.
---

> **Why this plane is ordered this way:** Almost every delay in standing up a broking business comes from discovering a dependency late. Net worth has to exist before registration is applied for, registration is routed through an exchange, the exchange wants infrastructure evidence, the clearing bank account cannot be opened without membership, connectivity approval needs the account and the people, and the first live order needs an exchange certification that needs all of it. Run these in the wrong order and the work is not just slower — parts of it are thrown away. So this plane is a dependency graph presented as a sequence, with each page stating what it needs before it can start and what it unblocks.

## TL;DR

- **The 2026 regulations are the governing law for a new broker.** The [SEBI (Stock Brokers) Regulations, 2026](/broking-kyc/finix-broking-setup/setup/02-sebi-registration-2026/) were notified on 7 January 2026 and repealed the 1992 regulations entirely. Two new eligibility conditions bite at application time: a designated director resident in India for at least 182 days in a financial year, and at least two years' experience in trading or dealing in securities.
- **Registration is not a direct application to SEBI.** It is routed through a recognised stock exchange, which forwards it with a recommendation. The exchange is therefore the first real counterparty, and its membership process and SEBI's registration process run as one interleaved workflow rather than two sequential ones.
- **Net worth is a base plus a variable component.** The base figures are ₹1 crore for a trading member, ₹5 crore self-clearing, ₹15 crore clearing and ₹50 crore professional clearing. NSE additionally requires variable net worth of 10 percent of the average daily client cash balance retained over the previous six months — which means net worth scales with the business and must be planned, not just met once.
- **Base minimum capital depends on what you intend to do, and algorithmic trading is the expensive switch.** On NSE the deposit is ₹10 lakh for proprietary trading without algorithms, ₹15 lakh for client business without proprietary and without algorithms, ₹25 lakh for both without algorithms, and ₹50 lakh for any member with algorithms. Deciding to offer an API or an algorithm product is therefore a capital decision taken at application time.
- **The three exchanges are three separate projects.** Different fee and deposit structures, different connectivity stacks — NSE's Non-NEAT Front End with an optional Trading Access Point, BSE requiring a separate connection *and* a separate protocol instance per segment, MCX with its own member protocol and a session that runs to 23:30 — and three separate certification tracks.
- **Bank account architecture is a compliance design, not an operations task.** Client money must be segregated from own money by statute, cash from clients is prohibited outright, and upstreaming constrains what may sit where overnight. Getting the account map wrong is expensive to unwind because client money has already flowed through it.
- **The longest poles are rarely the software.** Expect the critical path to run through net worth certification, exchange membership approval, bank account opening with a clearing bank, depository participant admission, and exchange certification slots — none of which compress with more engineers.

## The dependency graph

The ten pages in this plane, with what each one needs and what it unblocks.

| # | Page | Cannot start until | Unblocks |
|---|---|---|---|
| 1 | [Entity and capital structure](/broking-kyc/finix-broking-setup/setup/01-entity-capital-structure/) | Promoters and funding decided | Everything |
| 2 | [SEBI registration under the 2026 regulations](/broking-kyc/finix-broking-setup/setup/02-sebi-registration-2026/) | Entity exists, net worth certified, designated director identified | Membership completion, all segments |
| 3 | [Exchange membership at NSE, BSE and MCX](/broking-kyc/finix-broking-setup/setup/03-exchange-membership/) | Entity, net worth, fit-and-proper, infrastructure plan | Connectivity, user identifiers, certification |
| 4 | [Clearing arrangement](/broking-kyc/finix-broking-setup/setup/04-clearing-arrangement/) | Membership category decided | Settlement design, clearing bank account, collateral |
| 5 | [Depository participation](/broking-kyc/finix-broking-setup/setup/05-depository-participant/) | Entity, net worth, registration in progress | Demat accounts, pledge, delivery, CUSPA |
| 6 | [Bank account architecture](/broking-kyc/finix-broking-setup/setup/06-bank-account-architecture/) | Membership and clearing arrangement | Pay-in, pay-out, margin funding, upstreaming |
| 7 | [People, certification and organisation](/broking-kyc/finix-broking-setup/setup/07-people-certification-org/) | Organisation design | Registration conditions, approvals, go-live sign-off |
| 8 | [Infrastructure and connectivity](/broking-kyc/finix-broking-setup/setup/08-infrastructure-connectivity/) | Membership in progress, vendor selection | Connectivity approval, certification, system audit |
| 9 | [Vendor onboarding and contracts](/broking-kyc/finix-broking-setup/setup/09-vendor-onboarding-contracts/) | Stack decisions in the [vendor map](/broking-kyc/finix-broking-setup/stack/vendor-map/) | Every implementation plane |
| 10 | [Certification, mock trading and go-live](/broking-kyc/finix-broking-setup/setup/10-certification-mock-golive/) | Everything above | The first live order |

## What runs in parallel and what cannot

**Genuinely parallel:** vendor contracting, infrastructure procurement, people hiring and certification, back-office configuration, onboarding journey build, and the compliance policy set. None of these depend on registration being granted, and all of them have long lead times.

**Falsely parallel — looks independent, is not:** connectivity provisioning (needs membership), clearing bank account opening (needs membership and clearing arrangement), depository participant admission (overlaps registration but has its own net worth and infrastructure tests), and exchange certification (needs the production-shaped stack and a published slot).

**Strictly sequential:** net worth → registration application → exchange recommendation → registration → membership activation → user identifiers → certification → go-live.

## Where this connects

- [Exchange registration](/broking-kyc/operations/exchange-registration/) — the client-side registration mechanics this plane makes possible
- [Membership renewal](/broking-kyc/deep-dives/member-compliance/membership-renewal/) — the annual obligations that start the day membership does
- [Fit and proper](/broking-kyc/deep-dives/member-compliance/fit-and-proper/) — the eligibility test applied to the entity and its people
- [Base minimum capital and ABC](/broking-kyc/deep-dives/member-compliance/bmc-abc/) — deposits in depth
- [KMP changes](/broking-kyc/deep-dives/member-compliance/kmp-changes/) — what happens when the people in this plane change later
- [Compliance blueprint](/broking-kyc/operations/compliance-blueprint/) — the full obligation register

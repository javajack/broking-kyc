---
title: "Deep Dive: BCP / DR Drill Procedure"
description: Walkthrough and reference for the broker's quarterly BCP / DR drill and the half-yearly clearing-corporation live-from-DR drill — drill scope (data centre / application / network failover), tabletop exercises, full-failover drill, RTO / RPO targets, near-site / far-site geographic separation, post-drill reporting, and common drill failures with remediation.
---

import { Aside } from '@astrojs/starlight/components';

> **Why this page is structured this way:** BCP / DR is one of the most-audited domains for stock brokers — SEBI's CSCRF (Aug 2024), the Master Circular for Stock Brokers, and exchange-specific circulars (NSE / BSE / MCX) all converge on drill cadence and reporting obligations. The page walks through the quarterly member-level drill and the half-yearly clearing-corporation drill (live-from-DR session), reference-style for each drill component, and ends with the most common failure modes and their remediation. Voice mirrors the [lifecycle/](/broking-kyc/lifecycle/) and existing [operations/](/broking-kyc/operations/audit-compliance/) pages.

## TL;DR

- **Two distinct drill cadences for brokers**:
  - **Quarterly member-level drill** — broker conducts on its own infrastructure (BCP-DR-002 in [Compliance Blueprint](/broking-kyc/operations/compliance-blueprint/#bcp--dr-15-entries)).
  - **Half-yearly clearing-corp drill** — broker participates in NSE / BSE / MCX live-from-DR session (BCP-DR-003).
- **Drill scope** spans:
  - Data centre failover (primary → DR site).
  - Application failover (trading engine, RMS, back-office, customer portal).
  - Network failover (link redundancy, BGP / MPLS).
  - Tabletop exercises (paper-based scenarios — typically annual per CSCRF).
  - Backup integrity / restore-test (quarterly).
- **RTO / RPO targets** — broker declares per-application RTO and RPO; SEBI doesn't prescribe specific numbers but expects them to be reasonable and anchored to the 45-minute technical-glitch threshold. Industry practice: trading engine RTO 30–45 min, RMS RTO 30 min, customer app RTO 60 min, data RPO near-zero (synchronous replication) for trade / ledger, < 15 min for analytics.
- **Geographic separation** — SEBI's BCP/DR for MIIs framework anchored at **near-site (within same city) + far-site (≥ 500 km separation)** for primary / DR. Mid-size REs may rely on cloud-region separation as a pragmatic equivalent.
- **Reporting** — DR-drill report submitted to NSE / BSE / MCX (ENIT / BEFS portals); MII participation certificate captures member's involvement.
- **Penalty grid** — per [NSE/INSP/53530](/broking-kyc/reference/circulars/nse/#nseinsp53530), late drill-report submission attracts Rs 5,000–10,000 per default; persistent default triggers terminal restriction.
- AI-generated synthesis. **Verify any specific provision against the linked circulars before acting.**

## Conceptual overview

A stock broker is a regulated entity whose operational continuity is a public-interest concern. A broker outage during trading hours doesn't just affect that broker's clients — it can produce settlement-cycle disruption, surveillance-data gaps, and downstream effects on the clearing corporation and the broader market. SEBI's BCP / DR framework reflects this — it's not a corporate "best practice" obligation but a regulatory continuity requirement with prescriptive cadences and explicit reporting.

The framework has consolidated under three primary documents:

1. **SEBI Master Circular for Stock Brokers** [SEBI/HO/MIRSD/POD-1/P/CIR/2025/94](/broking-kyc/reference/circulars/sebi-mirsd/#sebihomirsdpod-1pcir202594) (consolidating brokers' BCP / DR obligations under the technology and system-audit chapter).
2. **CSCRF (Cybersecurity and Cyber Resilience Framework)** [SEBI/HO/ITD-1/ITD_CSC_EXT/P/CIR/2024/113](/broking-kyc/reference/circulars/sebi-mirsd/) (20 August 2024, in-force 1 April 2025) — unified the cyber + BCP framework across SEBI-regulated entities, structured around the Identify / Protect / Detect / Respond / Recover functions.
3. **Exchange / clearing-corp circulars** — NSE / BSE / MCX disseminations of the SEBI framework, plus exchange-led mock-trading-from-DR schedules ([NSE/MSD/61893](/broking-kyc/reference/circulars/nse/#nsemsd61893), [NSE/MSD/48662](/broking-kyc/reference/circulars/nse/#nsemsd48662), [NSE/MSD/44692](/broking-kyc/reference/circulars/nse/#nsemsd44692), [NCL/CMPT/64937](/broking-kyc/reference/circulars/clearing-corps/#nclcmpt64937), BSE 20240507-18).

Brokers participate in two distinct drill cadences:

- **Quarterly member-level drill** — the broker conducts a drill on its own infrastructure. The drill validates that the broker's DR site can take over from the primary in the event of a failure. The drill is internal but the report is submitted to the exchange / clearing corp.
- **Half-yearly clearing-corp drill** — the clearing corporation (NSCCL, ICCL, MCXCCL) conducts a live "mock trading from DR" session. Member brokers participate by routing actual orders through their DR connectivity to the clearing corp's DR site. The exchange consolidates participation certificates.

Plus annual **tabletop exercises** (scenario-based walk-throughs without actual cutover) and quarterly **backup integrity tests** (restore from offsite backup, validate completeness).

## 1. The Recovery Time / Recovery Point Objectives (RTO / RPO)

SEBI's framework doesn't prescribe specific RTO / RPO numbers but expects each broker to declare per-application targets that are reasonable and anchored to operational risk. Industry practice has converged around the following:

### RTO (Recovery Time Objective)

| Application | Industry-typical RTO | Anchor |
|---|---|---|
| Trading engine (OMS) | 30–45 minutes | 45-min technical-glitch threshold ([SEBI/HO/MIRSD/TPD-1/P/CIR/2022/160](/broking-kyc/reference/circulars/sebi-mirsd/#sebihomirsdtpd-1pcir2022160)) |
| RMS / risk engine | 30 minutes | Critical to trading; must come back before trading resumes |
| Back-office / accounting | 4 hours | Non-real-time but needed for EOD |
| Customer-facing app / portal | 60 minutes | Customer-experience anchor |
| Surveillance system | 1 hour | Required for intraday alerts |
| Reporting infrastructure | 4 hours | Daily / weekly cadence; some lag acceptable |
| KYC / onboarding system | 4 hours | Onboarding can pause briefly |

The 45-minute RTO for trading engine is anchored to SEBI's technical-glitch framework — an outage longer than 45 minutes triggers SEBI / exchange disclosure obligations and potential financial disincentives per [NSE/COMP/67379](/broking-kyc/reference/circulars/nse/#nsecomp67379) and the MII SOP per [SEBI/HO/MRD/TPD-1/P/CIR/2024/124](/broking-kyc/reference/circulars/sebi-other/#sebihomrdtpd-1pcir2024124).

### RPO (Recovery Point Objective)

| Data class | Industry-typical RPO | Anchor |
|---|---|---|
| Trade / order data | Near-zero (synchronous replication) | Cannot lose any executed trade |
| Client ledger / funds book | Near-zero | Same — financial integrity |
| Open positions / margin | Near-zero | RMS continuity depends on this |
| Audit / surveillance logs | ≤ 5 minutes | Slight lag acceptable but tight |
| Customer profile / KYC | ≤ 15 minutes | Onboarding can replay |
| Analytics / MIS | ≤ 1 hour | Reporting tolerates some lag |
| Reporting feeds | ≤ 4 hours | Batch-oriented |

Achieving near-zero RPO for trade / ledger / margin data requires **synchronous replication** to the DR site — every write on the primary must commit on DR before the application acknowledges. This adds latency to every write; brokers typically use it for the most critical data classes and asynchronous (lower-cost, lower-fidelity) replication for less critical.

### How RTO / RPO is validated

- **At drill** — broker measures actual time from "primary down" declaration to "DR services live" (= achieved RTO). Compares to declared. Compares data state at DR cutover vs primary state at failure (= achieved RPO).
- **In incident** — actual outages validate the declared. SEBI / exchange post-incident reports test whether the broker met the declared. Persistent underperformance triggers attention.

## 2. Quarterly member-level DR drill

This drill is broker-internal. It validates the broker's own DR infrastructure can take over from its primary.

### Drill scope

The drill typically covers one or more of:

- **Full failover** — primary site goes "down" (simulated); DR site takes over all customer-facing and internal services for a defined period (typically 4 hours).
- **Partial failover** — one or more applications fail over while others remain on primary (e.g., trading engine fails over but reporting stays on primary).
- **Database failover** — database primary fails, replica is promoted to primary; applications reconnect.
- **Network failover** — primary network link fails, secondary takes over via BGP / MPLS reconfiguration.

The broker typically alternates the scope across quarters — one quarter full failover, next quarter network-only, next database-only, etc. Annual coverage of all scenarios is expected.

### Drill procedure (full failover example)

#### Pre-drill (T-7 days)

- Drill plan finalised; participants identified (Ops, IT, RMS, OMS, customer-service teams).
- Communication plan — internal stakeholders (customer service, compliance, BD), external stakeholders (clearing corp helpdesk informed).
- Backup of critical data verified — full restore-test on a separate environment.
- DR-site infrastructure health checks pass.
- Drill scenarios documented — what's being simulated, what's expected, what's the success criteria.

#### Pre-drill (T-1 day)

- DR-site applications "warmed" — final replication confirmation, application services started in standby.
- Drill team briefed; runbooks distributed.
- Customer communication (if applicable) — for retail-facing drills, broker may inform customers that "brief intermittent service" may occur.

#### Drill day (T-0)

- **Drill kickoff** (typically 06:00 IST, before market open) — drill lead announces "drill begins."
- **Simulated primary outage** — primary services are shut down (or routed away from primary). DR is "promoted to primary."
- **DR validation** — drill team validates DR services:
  - Trading engine accepts orders.
  - RMS computes margin correctly with current client positions.
  - Customer-app can log in and place orders.
  - Back-office can process EOD-style operations.
  - Surveillance feeds work.
  - Reports generate.
- **Order flow simulation** — drill team places test orders, validates execution end-to-end.
- **External integrations** — drill team validates FIX session to exchange (from DR network), data feeds in, file submissions out.
- **Duration** — typically 4 hours.
- **Failback** — DR site is "failed back" to primary; primary takes over again.

#### Post-drill (T+1 to T+7)

- Drill team documents observations.
- Gap log — what worked, what didn't, what almost broke.
- Action items — what needs fixing before next drill.
- Drill report — formal document signed by CISO and Ops Lead.

#### Post-drill (T+7 to T+30)

- Drill report submitted to exchange / clearing corp via ENIT / BEFS.
- Action items tracked; closure verified before next drill.

<Aside type="caution">
**Drill failure is itself a compliance event.** If the drill reveals that DR services cannot take over (e.g., a database replication is in fatal lag, or DR-site application fails to start), the broker has a documented vulnerability. SEBI / exchange may issue an advisory or require enhanced monitoring. Most brokers prefer to discover failures in drill (controllable) rather than in incident (catastrophic) — the drill is exactly the place where these failures are supposed to surface.
</Aside>

### Drill scenarios — sub-cases

#### Tabletop exercise (annual)

A paper-based / discussion-only drill. Participants walk through a hypothetical scenario:

- Scenario card describes the incident (e.g., "Primary data centre power failure at 11:30 IST during peak trading").
- Drill team makes decisions in real time about response.
- A neutral facilitator guides the discussion and notes decisions, gaps, and lessons.

Tabletops cover scenarios that are too disruptive to actually test live — full primary-site loss, simultaneous primary + DR failure, cyber-incident response, regulatory-glitch response. CSCRF mandates annual tabletop coverage; the broker keeps the documented playbook for the scenarios.

#### Backup integrity test (quarterly)

Distinct from full DR drill. Tests that offsite backups can be successfully restored:

- Pick a recent backup (e.g., last week's full backup of the production database).
- Restore to a separate isolated environment.
- Validate the restored data — point-in-time consistency, application can read it, no corruption.
- Document the test, time-to-restore, and completeness.

A failed restore is a critical finding — it means the backup strategy isn't viable. Action item is typically remediation within 30 days.

#### Data replication audit (half-yearly)

Per BCP-DR-012 in [Compliance Blueprint](/broking-kyc/operations/compliance-blueprint/#bcp--dr-15-entries), an internal-audit team conducts a half-yearly audit of primary ↔ DR replication. Audit covers:

- Lag-trend over the period (how far behind has DR been on average?).
- Completeness — all tables / files / indices replicated?
- Last-resync timestamp — when was the last full re-sync?

Audit is signed off by CISO and Internal Audit jointly.

#### Network DR drill

Validates that BGP / MPLS / link-redundancy actually works:

- Simulate primary uplink failure.
- Confirm BGP / OSPF failover to secondary uplink within target time (typically < 60 seconds for trading-network paths).
- Validate end-to-end latency on secondary path (latency typically higher; quantify the increase).
- Failback to primary.

Network drills can run quarterly even if data-centre drills don't — network changes happen more frequently, and the cost of a network drill is much lower than a full-site drill.

### Pandemic / WFH continuity

Per BCP-DR-009, the broker maintains a Pandemic / WFH continuity playbook. The 2020 COVID-19 disruption drove SEBI / NSE to formalise this — see [NSE/INSP/43920](/broking-kyc/reference/circulars/nse/#nseinsp43920) and [NSE/INSP/44009](/broking-kyc/reference/circulars/nse/#nseinsp44009). Key elements:

- Remote trading terminals — pre-approved list of dealers who can access systems from home.
- VPN / VDI infrastructure capacity — can handle full workforce remote.
- Compliance with KYC / AML obligations from remote — controls equivalent to office-based.
- CEO / Designated Director / Compliance Officer approval of the remote-trading-terminal policy.

Tabletop exercises typically include a pandemic scenario at least once per year.

## 3. Half-yearly clearing-corp drill (live-from-DR)

This is the more operationally consequential drill from a compliance perspective. The clearing corporation (NSCCL, ICCL, MCXCCL) runs a live trading session from its DR infrastructure. Member brokers must participate.

### Cadence

- **Half-yearly** — typically April-May and October-November in each financial year.
- Scheduled by the clearing corp and disseminated via [NSE/MSD/61893](/broking-kyc/reference/circulars/nse/#nsemsd61893), [NSE/MSD/48662](/broking-kyc/reference/circulars/nse/#nsemsd48662), [BSE 20240507-18], [NCL/CMPT/64937](/broking-kyc/reference/circulars/clearing-corps/#nclcmpt64937), [MCX/TECH/118/2026](/broking-kyc/reference/circulars/mcx/#mcxtech1182026).
- Mock trading session held on a Saturday (non-trading day) — typically 11:00–14:00 IST.

### Participation requirements

Every broker (Trading Member / Clearing Member) must:

- Have DR-site connectivity to the clearing corp's DR.
- Participate in the mock session — log in, place orders, receive acknowledgements, view trade confirmations.
- Submit a participation certificate to the exchange / clearing corp post-drill.

### Drill mechanics

#### Pre-drill

- Clearing corp publishes drill schedule 30–60 days in advance.
- Members confirm participation via the exchange portal.
- Connectivity test — members verify DR-site routes to clearing corp's DR.
- Test client codes set up — drill uses test UCC codes (typically `BROKER001`, `BROKER002` etc.).

#### Drill day

- Mock session opens at 11:00 IST (typical).
- Members place mock orders for test symbols (typically `MOCK001`, `MOCK002` — the exchange's special drill symbols).
- Orders execute, settle, and flow through the clearing corp's full pipeline.
- MIR (Margin Intra-day Report) and Final-Obligation file get regenerated from DR.
- Brokers reconcile the DR-generated obligation against their internal expectation.

#### Post-drill

- Clearing corp publishes a "Final Obligation" report from the drill — confirms net trade obligation across all participants.
- Member's net-trade obligation should net to zero (drill orders match on both sides).
- Member submits a participation report to the exchange.

### What's tested

The drill validates several layers simultaneously:

- **Member's DR connectivity** — does the broker reach the clearing corp's DR site at all?
- **Member's DR-site trading systems** — do OMS, RMS, surveillance, position-management all work from DR?
- **Member's DR-side file pipeline** — can the broker submit settlement, position, margin files from DR?
- **Clearing corp's DR systems** — do they correctly receive, process, and return responses?
- **Reconciliation between member and clearing corp on DR data** — final-obligation file matches expectation?

### Penalty for non-participation

Per [NSE/INSP/53530](/broking-kyc/reference/circulars/nse/#nseinsp53530), non-participation in the half-yearly drill attracts a default penalty of Rs 5,000–10,000. Persistent default (multiple missed drills) escalates to terminal-restriction action. Members with material issues during the drill (e.g., DR site fails to come up) get an advisory and remediation timeline.

### Member-side preparation

Brokers run a pre-drill rehearsal 1–2 weeks before the actual drill:

- Internal mock session — same time as actual drill, same scenarios.
- Validates DR readiness.
- Identifies any issues; remediation before actual drill.

Most brokers also run continuous "DR connectivity heartbeat" — a small periodic test that validates DR-site connectivity is always live, not just at drill time.

<Aside type="note">
**SaaS-mode mock per SEBI Master Circular for SE & CC.** Per [NCL/CMPT/64937](/broking-kyc/reference/circulars/clearing-corps/#nclcmpt64937), the clearing corp's drill is conducted in a "SaaS-mode" (software-as-a-service) where mock infrastructure is shared across participants. This is operationally efficient but means a single broker's misbehaviour in the drill can affect others — order-flooding, badly-formed orders, etc., can disrupt the shared environment. Brokers are expected to behave responsibly during the drill; sustained misbehaviour results in member-side escalation.
</Aside>

## 4. Geographic separation — near-site vs far-site

SEBI's BCP/DR framework for MIIs (Mar 2019 and Mar 2021 circulars, forwarded via [NSE/MSD/44692](/broking-kyc/reference/circulars/nse/#nsemsd44692)) anchored the principle of **two-tier DR**:

- **Near-site** — typically within the same city or nearby (10–50 km from primary). Used for routine continuity (e.g., power failure at primary, fire at primary).
- **Far-site** — at least **500 km from primary**. Used for region-level catastrophe (earthquake, regional flood, regional power-grid failure).

### Why 500 km

The 500-km separation is anchored to a regional-catastrophe risk model. Major Indian cities are typically less than 500 km apart by air, and a regional event (cyclone, earthquake) can affect multiple cities. 500-km separation reduces the probability of both primary and DR being affected by a single event.

For brokers, common siting:

- **Primary in Mumbai** → Near-site at a different Mumbai data centre (BKC, Powai, Bandra, Goregaon). Far-site at Bengaluru, Chennai, Hyderabad, or Pune.
- **Primary in Delhi** → Near-site at a different NCR data centre. Far-site at Bengaluru, Mumbai, Hyderabad, or Chennai.

### Cloud-region equivalent for Mid-size REs

SEBI's CSCRF framework permits Mid-size and Small REs to use **cloud-region separation** as a pragmatic equivalent of physical near-site / far-site. E.g.:

- Primary in AWS Mumbai (ap-south-1) — Availability Zone 1.
- Near-site in AWS Mumbai (ap-south-1) — Availability Zone 2.
- Far-site in AWS Hyderabad (ap-south-2) — different region.

The cloud equivalent relies on the cloud provider's region-level isolation; SEBI accepts this where the broker's category permits. For Qualified REs (the larger brokers), physical separation is still expected.

### Seismic-zone separation

Some interpretations of the SEBI framework require that primary and far-site sit in **different seismic zones** (India is divided into Zones II–V based on earthquake risk). The intent is the same — reduce probability of common cause failure.

### Compliance evidence

For BCP-DR-004, the evidence is:

- Site-location attestation (city + geo-coords) for primary and far-site.
- Distance computation (great-circle from primary coords to far-site coords).
- Seismic-zone separation evidence (e.g., Mumbai is Zone III; Bengaluru is Zone II).
- Lease / co-location agreements for both sites.

## 5. Application-level DR considerations

Beyond infrastructure, the broker must ensure application-level DR works:

### Stateful session migration

Trading applications maintain client sessions (open orders, working balance, etc.). When DR takes over, these sessions need to be:

- **Persisted** in a shared store (database / cache) accessible from both primary and DR.
- **Re-attached** on DR after takeover — the client doesn't have to log in again.
- **State-consistent** — the DR-side application sees the same state the primary saw at the moment of failover.

### Application-level cutover

Different applications have different cutover characteristics:

- **Trading engine** — requires careful coordination. Open orders must be honored from where they left off; new orders flow to DR. Some brokers handle this via "drain mode" — accept no new orders during cutover, drain existing, then DR takes over fresh.
- **RMS** — needs continuity of margin calculations. Pre-DR snapshot of position state must be ingested by DR before it activates.
- **Customer app / portal** — typically stateless or thin-state; DR can take over with minimal coordination.
- **Back-office / accounting** — batch oriented; DR runs the next batch.

### DNS / load balancer flip

The actual "cutover" usually involves DNS or load balancer reconfiguration:

- Primary's IP / DNS is taken out of rotation.
- DR's IP / DNS is brought into rotation.
- Within DNS TTL (typically 60 seconds), new traffic flows to DR.

The broker should pre-configure DR-side load balancers with the same DNS names, just routing to DR backend. This avoids DNS-level cutover during the drill.

### Test client codes / accounts

For mock drills, the broker uses pre-defined test client codes that don't represent real clients. These codes are flagged in the broker's database, in the exchange's UCC, and in the clearing corp's records. Orders for test codes don't affect real client positions / margin.

## 6. Post-drill reporting

After every drill, the broker submits a report:

### Member-level drill report

Submitted to exchange / clearing corp via ENIT-NEW-COMPLIANCE (NSE) / BEFS (BSE) portal. Format prescribed by the exchange. Key fields:

- **Drill date and time** — when did the drill run?
- **Drill scope** — what was tested (full failover / partial / database / network)?
- **Participants** — who from the broker participated?
- **RTO / RPO observed** — what was the actual achieved RTO / RPO during the drill?
- **Gap log** — what didn't work, what almost broke, what was discovered?
- **Action items** — what's being fixed, by when?
- **Sign-off** — CISO and Ops Lead sign-off.

### Clearing-corp drill participation certificate

Issued by the clearing corp after the half-yearly drill. Confirms:

- Member participated.
- Member's drill orders matched (or didn't match) the final obligation.
- Member-side issues observed (if any).
- Any escalations.

The broker reconciles its internal records against the clearing corp's certificate.

### Annual BCP review

Beyond drill-specific reports, the broker conducts an annual BCP review with the Board:

- Drill outcomes for the year.
- Closure status of action items.
- Updates to BCP plan.
- Updates to RTO / RPO declarations.
- Updates to applicable scenarios.
- Audit / inspection findings on BCP / DR.

The Board minute referencing this review is the evidence for BCP-DR-001 in [Compliance Blueprint](/broking-kyc/operations/compliance-blueprint/#bcp--dr-15-entries).

## 7. Common drill failures and remediation

The most common failure modes seen in broker drills, with remediation patterns:

### Failure 1 — DR-site replication lag

**Pattern**: At drill time, DR database is 5–30 minutes behind primary. RTO / RPO targets not met.

**Cause**: Replication channel under-provisioned. Application writes during peak hours exceed replication bandwidth. Replication queue backs up.

**Remediation**:

- Upgrade replication channel bandwidth.
- Move bulk operations (e.g., nightly ledger batch) to non-replication window.
- Use async replication for low-priority data, sync for critical.
- Pre-warm DR replication starting 23:00 day before drill.

### Failure 2 — DR application service won't start

**Pattern**: DR-site server hardware is alive, but the application service fails to start.

**Cause**: Configuration drift between primary and DR. License keys not synced. Dependency on a primary-only resource (e.g., a database link pointing to primary).

**Remediation**:

- Infrastructure-as-code (IaC) for both primary and DR; same config files apply.
- Configuration management (Ansible / Puppet / Chef) pushes config to both.
- License keys / certificates stored in shared secrets manager; both sites pull from the same source.
- Regular non-drill testing of DR application bring-up.

### Failure 3 — Network failover takes too long

**Pattern**: BGP / OSPF reconvergence after primary uplink failure takes 5–10 minutes; trading is affected.

**Cause**: BGP timers misconfigured. BFD (Bidirectional Forwarding Detection) not enabled. Carrier-side issues.

**Remediation**:

- Configure BFD with sub-second detection.
- Tune BGP timers to fail-over within 1–2 seconds (be cautious — overly aggressive can cause flapping).
- Test failover in low-traffic periods to validate timing.
- Run network failover drills more frequently than full DR drills.

### Failure 4 — FIX session fails to re-establish at DR

**Pattern**: After DR cutover, FIX session to NSE / BSE / MCX gateway fails to re-establish. Orders queue.

**Cause**: Exchange gateway expects FIX session from specific IP whitelist; DR IP not whitelisted. Or, FIX session not warmed at DR (only one connection per member-broker per gateway is allowed).

**Remediation**:

- Pre-register DR IPs with exchange.
- Use NAT / proxy on DR side that masks IP as a known whitelisted IP.
- Test FIX session reconnect at DR before each drill.
- Coordinate with exchange technical support during drill.

### Failure 5 — Pre-trade RMS uses stale parameters

**Pattern**: After DR cutover, RMS computes margin using yesterday's SPAN scanrange. Some clients get false short-collection flags.

**Cause**: SPAN scanrange file was fetched by primary only; DR didn't fetch independently. Or, DR-side scheduler didn't run the BOD fetch.

**Remediation**:

- DR-side scheduler runs full BOD ingestion independently — same files fetched by both primary and DR.
- File-fetch results published to shared queue; whichever site is active reads from the queue.
- DR-side BOD audit confirms current parameters before market open.

### Failure 6 — Back-office runs partial reconciliation

**Pattern**: After DR cutover, back-office's daily reconciliation misses some clients' positions; ledger has gaps.

**Cause**: Back-office relies on a primary-only message queue or file system; DR doesn't have access to in-flight messages from primary.

**Remediation**:

- Use a distributed queue (Kafka / RabbitMQ) with replication.
- Persist messages to shared storage that both primary and DR can read.
- Run back-office reconciliation as idempotent — duplicate processing is safe.
- Manual reconciliation post-drill to catch any gaps.

### Failure 7 — Customer can't log in

**Pattern**: After DR cutover, customer's login fails because their session is invalidated. Customer gets confused error messages.

**Cause**: Sessions stored in primary-only memory cache. No persistent session store.

**Remediation**:

- Use a distributed session store (Redis Cluster, DynamoDB, etc.) accessible from both sites.
- On cutover, sessions continue without disruption.
- For customer-experience drills, validate that login flows work on DR.

### Failure 8 — Surveillance feed has gaps

**Pattern**: After DR cutover, surveillance system has a 5-10 minute gap in trade-event feed. Reports for the day are incomplete.

**Cause**: Real-time feed from exchange wasn't redirected to DR; primary continued to receive but DR didn't.

**Remediation**:

- Exchange surveillance feeds duplicated to both primary and DR.
- Real-time feeds delivered to a shared event bus; both sites read.
- Post-drill reconciliation: feed records replayed if any gap detected.

### Failure 9 — DR-site lacks recent code deployment

**Pattern**: DR-site application is running a code version from 2 weeks ago; new feature deployed last week doesn't work.

**Cause**: Code deployment process is primary-only. DR is "set-aside" infrastructure that's deployed manually or rarely.

**Remediation**:

- Deployment process targets both primary and DR for every release.
- Continuous integration / continuous deployment (CI/CD) pipelines for both.
- Daily reconciliation of deployed versions across primary and DR.
- "Blue-green" or "canary" deployments where DR can serve as the blue / canary target.

### Failure 10 — Drill team doesn't know what to do

**Pattern**: At drill time, drill team is unclear about who's responsible for what. Decision points get stuck.

**Cause**: BCP plan is outdated; drill runbooks haven't been updated since last reorganisation.

**Remediation**:

- BCP plan reviewed annually with updates to roles / responsibilities.
- Drill runbooks rehearsed (not just consulted) before each drill.
- Tabletop exercises serve as light-weight practice for decision-making.
- Critical-incident-response training for the drill leader.

## 8. CSCRF integration

The August 2024 CSCRF unified previous sectoral cyber circulars into a single framework. BCP / DR sits within the **Recover** function in the CSCRF taxonomy. Brokers must demonstrate:

- **Identify** — what are the critical assets, what's their RTO / RPO?
- **Protect** — what controls protect them from disruption?
- **Detect** — how do you detect when something has gone wrong?
- **Respond** — how do you respond when something fails?
- **Recover** — DR drill is the validation that recovery works.

The CSCRF categorises REs into:

- **Market Infrastructure Institutions (MIIs)** — exchanges, clearing corps, depositories. Highest obligation.
- **Qualified REs** — large stockbrokers, AMCs, etc. Annual cyber audit required.
- **Mid-size REs** — moderate-scale entities. Annual cyber audit; some flexibility on cloud-DR.
- **Small REs** — smaller entities. Biennial cyber audit; further flexibility.
- **Self-Certification REs** — smallest entities. Self-certification.

Each category has corresponding BCP / DR obligations.

Annual cyber audit ([SEBI/HO/ITD-1/ITD_CSC_EXT/P/CIR/2024/113](/broking-kyc/reference/circulars/sebi-mirsd/), [NSE/INSP/73849](/broking-kyc/reference/circulars/nse/#nseinsp73849)) covers BCP / DR as part of its Annexure B / Annexure A scope. The cyber audit can flag drill-related gaps as non-compliance.

<Aside type="tip">
**Tabletop is cheaper than full drill.** A tabletop exercise costs the broker only the time of the drill team (typically 3-4 hours). A full failover drill costs the broker the time + infrastructure + risk of actually failing during business hours. Many small / mid-size brokers do quarterly tabletops to maintain readiness and run a full failover drill only annually or semi-annually. The CSCRF mandates annual tabletops; brokers exceeding this cadence (monthly / quarterly) get superior preparedness with minimal cost.
</Aside>

## 9. Vendor BCP coverage

Per BCP-DR-015, the broker is responsible for ensuring critical vendors have BCP coverage. Critical vendors include:

- Cloud infrastructure provider (AWS, Azure, GCP).
- Market data provider (Refinitiv / LSEG, Bloomberg, ICE).
- OMS / EMS vendor (if outsourced).
- Back-office vendor.
- RMS / risk-engine vendor.
- KYC / identity-verification vendor.

For each vendor, the broker requires:

- **Vendor BCP attestation** — vendor confirms its own BCP plan.
- **Contractual clause** — RTO / RPO obligations from vendor; breach-notification timelines.
- **Vendor DR-drill participation evidence** — proof that vendor itself runs drills.

If a vendor's incident affects the broker's operations, SEBI treats this as the **broker's incident** under [SEBI/HO/MIRSD/TPD-1/P/CIR/2022/160](/broking-kyc/reference/circulars/sebi-mirsd/#sebihomirsdtpd-1pcir2022160) (technical-glitch reporting). The broker can't shift responsibility to the vendor.

## 10. Critical-vendor concentration limits

Per BCP-DR-008, the broker tracks **vendor concentration**:

- For each critical service category, what's the % share of the top vendor?
- Threshold: typically 30% concentration is the limit; > 30% triggers a mitigation plan.

Examples where concentration matters:

- Cloud infrastructure — most brokers use AWS or Azure; concentration is intrinsic.
- Order gateway — concentration on a single gateway provider is a single point of failure.
- Market data — typically one primary feed + one backup.

For concentrations > 30%, the broker maintains a mitigation plan:

- Alternative vendor PoC (Proof of Concept) — has the broker tested an alternative?
- Switchover time — how long to migrate if primary vendor fails?
- Periodic review of the concentration — quarterly / half-yearly.

The Dec 2024 CSCRF clarification ([SEBI/HO/ITD-1/ITD_CSC_EXT/P/CIR/2024/184](/broking-kyc/reference/circulars/sebi-mirsd/)) refined cloud-vendor scope. Multi-cloud or hybrid architectures are recommended for critical workloads but are not always cost-effective at smaller scale; SEBI permits cloud-region separation as an alternative.

## 11. Operational risk audit overlay

Per AUDIT-017 in [Compliance Blueprint](/broking-kyc/operations/compliance-blueprint/), the broker conducts an annual operational risk audit (per [SEBI/HO/MIRSD/MIRSD-PoD-1/P/CIR/2024/96](/broking-kyc/reference/circulars/sebi-mirsd/#sebihomirsdmirsd-pod-1pcir202496)). BCP / DR-related operational risks are part of this:

- Failure to conduct quarterly drills.
- Failure to maintain near-site / far-site separation.
- Vendor-induced incidents.
- DR-site replication lag.
- Application-level DR gaps.

These risks are logged in the operational-risk register and tracked for closure.

## 12. Edge cases and operational scenarios

### Surprise drill (no advance notice)

Some larger brokers run unannounced DR drills — drill team is told the drill will happen "sometime this quarter" but not the exact date. This tests real-world readiness without the advantage of preparation. Industry practice; not mandated by SEBI.

### Real outage during drill

If a real production outage happens during a planned drill, the drill is suspended; the team handles the real incident. The drill is rescheduled. The incident handling itself may serve as evidence of real-world DR capability.

### Drill that triggers customer impact

Customer-facing drills (full failover during business hours) can momentarily affect customers. Brokers typically schedule customer-facing drills outside business hours or on weekends. SEBI doesn't prohibit business-hour drills but treats customer-impact as a separate evidence item.

### DR-only drill (without primary outage simulation)

Sometimes the drill activates DR services in parallel with primary (both live simultaneously). This validates DR can come up but doesn't validate the cutover mechanism. Useful as a quick check but not a substitute for full failover drill.

### Recovery from far-site

If primary and near-site both fail (e.g., regional power-grid event), far-site must take over. This is the most extreme scenario. Brokers typically test far-site activation annually, not quarterly, due to the operational cost.

### Inter-MII drill coordination

When SEBI / clearing corp run a market-wide drill, all members must participate concurrently. Coordination across thousands of brokers is one of the operational challenges. The exchange manages the coordination via the schedule + participation portal.

### Drill scope changes mid-execution

If a drill discovers a severe issue mid-execution, the team may pause / abort. Best practice: pre-defined "abort criteria" — what conditions trigger pause / rollback. Documented in the drill plan.

### Insurance and indemnity

The broker's professional indemnity / cyber insurance policy typically requires evidence of BCP / DR drill compliance. Lapsed drill compliance can affect insurance coverage in event of a real incident. The compliance team should coordinate with the insurance / risk team.

## Practical notes

- **[industry practice]** Larger brokers run BCP / DR coordination as a dedicated function with a CISO / CTO co-ownership. Smaller brokers have an Ops Lead + IT Manager handle it. Clarity of ownership matters more than the title.
- **[gotcha]** Replication lag during quiet periods doesn't mean replication is healthy. Replication can be running but with a queue backup that only manifests at peak. Monitor replication metrics continuously, not just during drills.
- **[risk trade-off]** Synchronous replication for trade / ledger data adds latency to every write but guarantees zero data loss on failover. Async replication is faster but loses recent data. Most brokers use sync for critical, async for non-critical — and accept the latency for the safety.
- **[cost optimization]** Cloud-region DR is materially cheaper than physical co-located DR for mid-size and small REs. The CSCRF Dec 2024 clarification permits this where appropriate; brokers should review their category and architect accordingly.
- **[industry practice]** Drill runbooks should be checked into version control and reviewed before each drill — not stored as static PDFs that get stale.
- **[gotcha]** The 45-minute technical-glitch threshold isn't an SEBI-prescribed RTO for trading systems; it's a disclosure-trigger threshold. Brokers should set RTO well below this (typical 30 min for trading engine) to avoid breaching the disclosure threshold in real incidents.
- **[risk trade-off]** Frequent drilling (monthly tabletops, quarterly full failover) gives confidence but consumes operations time. Most brokers settle on quarterly tabletops + half-yearly full failover + monthly network/database mini-drills.
- **[industry practice]** Post-drill review meetings should be **blameless** — focused on what failed and how to fix, not who caused the failure. This drives genuine reporting of issues; otherwise, drills get "managed" to show only success.
- **[cost optimization]** Pre-warming DR replication starting 23:00 the night before a drill cuts ~80% of replication-related drill issues (see [BOD DAG practical notes](/broking-kyc/operations/integration-dag/bod/)).
- **[gotcha]** Member-level drill report submission has a deadline (typically within 30 days of drill). Late submission attracts the per-default penalty grid; persistent default escalates.
- **[industry practice]** Some brokers extend the half-yearly clearing-corp drill into a full-day or two-day exercise — using the drill window for additional internal testing. This maximises the operational value of the time.
- **[gotcha]** The drill's "success" is not the absence of issues but the discovery and resolution of issues. A "zero-issues" drill report often signals that the drill wasn't rigorous enough.

## Cross-references

- [Compliance Blueprint — BCP / DR domain](/broking-kyc/operations/compliance-blueprint/#bcp--dr-15-entries) — 15 entries covering BCP plan, drill, RTO / RPO, near-site / far-site, application / network DR, vendor BCP coverage.
- [Compliance Blueprint — Cyber security domain](/broking-kyc/operations/compliance-blueprint/) — CSCRF (Aug 2024) overlap with BCP / DR.
- [Compliance Blueprint — Audit cycles domain](/broking-kyc/operations/compliance-blueprint/) — concurrent / internal / system / cyber audits cover DR scope.
- [Broker Process Narrative](/broking-kyc/broker-process/narrative/) — Section 2 covers BOD operational health checks including DR-replication confirmation; Section 5 covers quarterly drill cadence.
- [Integration DAG: BOD](/broking-kyc/operations/integration-dag/bod/) — BCP / DR health check sub-graph; pre-warming DR for BOD success.
- [SEBI MIRSD Circulars](/broking-kyc/reference/circulars/sebi-mirsd/) — CSCRF (Aug 2024), CSCRF Clarifications (Dec 2024), Master Circular for Stock Brokers, Technical Glitch framework.
- [SEBI Other Circulars](/broking-kyc/reference/circulars/sebi-other/) — MII Technical Glitch SOP, Exchange Outage SOP.
- [NSE Circulars](/broking-kyc/reference/circulars/nse/) — DR drill schedules (NSE/MSD/61893, /48662, /44692), CSCRF (INSP/68856).
- [Clearing Corps Circulars](/broking-kyc/reference/circulars/clearing-corps/) — NCL/CMPT/64937 (SaaS-mode mock).

## Verified through

2026-05-14

---

*AI-generated and not legal, financial, or compliance advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*

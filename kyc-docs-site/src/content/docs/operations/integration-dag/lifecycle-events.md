---
title: "Integration DAG: Lifecycle events"
description: Dependency graph for event-triggered flows — client modification (address/bank/nominee/segment/mobile/email/name), transmission (single deceased / joint / succession), dormancy → reactivation, and voluntary closure.
---

> **Why this page is structured this way:** Lifecycle events are *not* time-locked or fan-out-style. They're sequential chains triggered by client request or detected status (dormancy). The fundamental ordering rule: **<abbr title="KYC Registration Agency">KRA</abbr> first, exchange and depository validate against KRA's new state**. Multiple smaller DAGs cover the distinct event types rather than one big graph.

## TL;DR

- 4 ASCII DAGs covering Modification, Transmission (deceased), Dormancy → Reactivation, Closure.
- 26 unique integration nodes across the event types.
- **Modification ordering** is the headline gotcha: must serialize KRA → <abbr title="Central KYC (records registry)">CKYC</abbr> → <abbr title="Unique Client Code">UCC</abbr> → <abbr title="Beneficial Owner">BO</abbr>; concurrent updates lead to rejection-cascades.
- **Transmission** is the slowest event class — succession without nominee can take months.

## Conceptual overview

Most onboarding flows ago, the client became ACTIVE and started trading. Now life happens. They move addresses. They change banks. A holder dies. The client requests closure. Each event has its own <abbr title="Directed Acyclic Graph.">DAG</abbr> with its own sequential dependencies. Unlike onboarding (which parallelizes aggressively), lifecycle events are mostly serial because downstream systems (exchanges, depositories) validate against upstream registry (KRA) state — they need to see the new state before they accept the update.

## DAG 1 — Modification (address / bank / nominee / segment / mobile / email / name)

```
LC-MOD-REQUEST           (client raises modification request)
        │
        ▼
LC-MOD-VALIDATE          (proof check: penny-drop for bank, OTP for mobile/email,
                          document for address/name/DOB)
        │ fail → re-request
        ▼ pass
LC-MOD-APPROVE           (auto-approve OR manual review per modification type)
        │
        ▼
LC-MOD-KRA               (KRA upload of change record)
        │
        ▼
LC-MOD-CKYC              (CKYC upload within 7-day window)
        │
        ▼
LC-MOD-UCC               (NSE/BSE/MCX UCC update; validates against new KRA state)
        │
        ▼
LC-MOD-BO                (CDSL / NSDL BO update; validates against KRA + UCC)
        │
        ▼
LC-MOD-COMPLETE          (client notified; UI reflects new state)
```

## DAG 2 — Transmission (single deceased)

```
LC-TR-DEATH_CERT         (death certificate submission)
        │
        ▼
LC-TR-NOMINEE_CHECK      (is nominee registered?)
        │
        ├── yes ──► LC-TR-NOMINEE_KYC       (verify nominee identity; capture KYC if new)
        │                  │
        │                  ▼
        │           LC-TR-CLAIM_PROCESS     (claim form + nominee acknowledgement)
        │                  │
        │                  ▼
        │           LC-TR-BO_TRANSFER       (DP transfers BO to nominee's name)
        │                  │
        │                  ▼
        │           LC-TR-DECISION          (close OR continue as nominee's account)
        │
        └── no ───► LC-TR-SUCCESSION        (probate / succession certificate path)
                           │
                           ▼ (months typical)
                    LC-TR-LEGAL_HEIR        (succession determined by court / will)
                           │
                           ▼
                    LC-TR-BO_TRANSFER       (same target node as nominee path)
```

## DAG 3 — Dormancy → Reactivation

```
LC-DM-DETECT     (no trading activity for 12 months — flagged via monthly scan)
        │
        ▼
LC-DM-FLAG       (account flagged dormant; segments may auto-disable)
        │
        ├──► LC-DM-MIS_REPORT    (broker's dormant-account MIS to exchange monthly)
        │
        ▼ (client returns)
LC-RA-REQUEST    (client raises reactivation request)
        │
        ▼
LC-RA-REKYC      (if dormant > 12 months — re-validate identity/address/bank)
        │
        ▼
LC-RA-UCC_UNFREEZE   (exchange UCC unfreeze)
        │
        ▼
LC-RA-BO_REACTIVATE  (depository BO reactivate; segments re-enabled)
        │
        ▼
LC-RA-COMPLETE       (client notified; trading resumed)
```

## DAG 4 — Voluntary closure

```
LC-CL-REQUEST            (client raises closure request)
        │
        ▼
LC-CL-PENDING_CHECK      (any pending trades, MTF positions, unsettled payouts?)
        │ pending → wait + notify
        ▼ clean
LC-CL-FUND_WITHDRAW      (refund client funds bank balance)
        │
        ▼
LC-CL-PLEDGE_RELEASE     (release margin pledge, MTF pledge)
        │
        ▼
LC-CL-BO_CLOSE           (CDSL / NSDL BO closure intimation)
        │
        ▼
LC-CL-UCC_DEACTIVATE     (NSE / BSE / MCX UCC deactivation)
        │
        ▼
LC-CL-KRA_CLOSURE        (KRA status update to "closed"; CKYC retained as identity ref)
        │
        ▼
LC-CL-COMPLETE           (final acknowledgement to client; account terminates)
```

## Per-node detail

| node_id | operation | depends_on | blocks | parallel_eligible | idempotent | retry_policy | rollback | sla | failure_surface | spec_source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| LC-MOD-REQUEST | Client modification request | [entry] | LC-MOD-VALIDATE | [none] | no (user-keyed) | n/a | n/a | < 1m | client UI | [industry typical] |
| LC-MOD-VALIDATE | Proof validation (penny-drop / <abbr title="One-Time Password">OTP</abbr> / doc) | LC-MOD-REQUEST | LC-MOD-APPROVE | [none] | yes (request-keyed) | 3× then manual | re-request | < 5m | client UI | [industry typical] |
| LC-MOD-APPROVE | Auto or manual approval | LC-MOD-VALIDATE | LC-MOD-KRA | [none] | yes | n/a (human if manual) | request rejection | < 24h (manual) | ops queue | [industry typical] |
| LC-MOD-KRA | KRA upload of modification | LC-MOD-APPROVE | LC-MOD-CKYC | [none] | yes (<abbr title="Permanent Account Number">PAN</abbr>+ref-id keyed) | 3× then 24h queue | re-upload on rejection | within 24h batch | KRA reject | [<abbr title="Securities and Exchange Board of India">SEBI</abbr>/<abbr title="Head Office (SEBI circular ID prefix)">HO</abbr>/<abbr title="Markets Intermediaries Regulation and Supervision Department (SEBI)">MIRSD</abbr>/SECFATF/P/CIR/2024/79](/broking-kyc/reference/circulars/sebi-mirsd/) |
| LC-MOD-CKYC | CKYC upload within 7-day window | LC-MOD-KRA | LC-MOD-UCC | [none] | yes | 3× within window | re-upload | within 7d | <abbr title="Central Registry of Securitisation Asset Reconstruction and Security Interest of India">CERSAI</abbr> reject | [CKYC dual upload circular](/broking-kyc/reference/circulars/cersai/) |
| LC-MOD-UCC | Exchange UCC update | LC-MOD-KRA | LC-MOD-BO | [none] | yes (UCC-keyed) | 3× then manual | re-submit | 1-2 days | UCC reject | [Exchange UCC circulars](/broking-kyc/reference/circulars/nse/) |
| LC-MOD-BO | Depository BO update | LC-MOD-UCC | LC-MOD-COMPLETE | [none] | yes (BO-keyed) | 3× then manual | re-submit | 1-2 days | <abbr title="Depository Participant">DP</abbr> reject | [<abbr title="Central Depository Services (India) Limited">CDSL</abbr>/<abbr title="National Securities Depository Limited">NSDL</abbr> circulars](/broking-kyc/reference/circulars/cdsl/) |
| LC-MOD-COMPLETE | Client notification of completion | LC-MOD-BO | [exit] | [none] | yes | 3× | re-dispatch | < 1h | DLT comms | [industry typical] |
| LC-TR-DEATH_CERT | Death certificate submission | [entry] | LC-TR-NOMINEE_CHECK | [none] | no (case-keyed) | n/a | n/a | manual | ops console | [Transmission compliance](/broking-kyc/operations/compliance-blueprint/) |
| LC-TR-NOMINEE_CHECK | Is nominee registered? | LC-TR-DEATH_CERT | LC-TR-NOMINEE_KYC or LC-TR-SUCCESSION | [none] | yes (BO-keyed) | n/a | n/a | < 1d | ops console | [industry typical] |
| LC-TR-NOMINEE_KYC | Nominee <abbr title="Know Your Customer (process).">KYC</abbr> capture/verify | LC-TR-NOMINEE_CHECK (yes) | LC-TR-CLAIM_PROCESS | parallel-with succession path | yes (nominee-keyed) | 3× then manual | restart on rejection | 1–4 weeks | ops queue | [SEBI Jan 2025 nominee revamp](/broking-kyc/reference/circulars/sebi-mirsd/) |
| LC-TR-CLAIM_PROCESS | Claim form + nominee ack | LC-TR-NOMINEE_KYC | LC-TR-BO_TRANSFER | [none] | yes | n/a (human) | re-process | 1–4 weeks | ops queue | [industry typical] |
| LC-TR-SUCCESSION | Probate / succession certificate path | LC-TR-NOMINEE_CHECK (no) | LC-TR-LEGAL_HEIR | parallel-with nominee path | n/a (legal) | n/a | n/a | months | ops queue + legal | [industry typical] |
| LC-TR-LEGAL_HEIR | Legal heir determined via court / will | LC-TR-SUCCESSION | LC-TR-BO_TRANSFER | [none] | n/a | n/a | n/a | months | ops queue + legal | [industry typical] |
| LC-TR-BO_TRANSFER | DP transfers BO to nominee / heir | LC-TR-CLAIM_PROCESS or LC-TR-LEGAL_HEIR | LC-TR-DECISION | [none] | yes (BO-keyed) | 3× then manual | reversal needed if disputed | 1–2 weeks post claim | DP console | [CDSL/NSDL transmission circulars](/broking-kyc/reference/circulars/cdsl/) |
| LC-TR-DECISION | Close BO or continue under nominee/heir | LC-TR-BO_TRANSFER | [exit or → modification flow] | [none] | n/a (human) | n/a | n/a | client-driven | client UI | [industry typical] |
| LC-DM-DETECT | Monthly scan for 12-month no-trade | [time-trigger monthly] | LC-DM-FLAG | [none] | yes (date-keyed) | none | n/a | scheduled | ops console | [industry typical] |
| LC-DM-FLAG | Flag account dormant; disable segments | LC-DM-DETECT | LC-DM-MIS_REPORT | parallel-with MIS path | yes (account-keyed) | 1× then manual | un-flag on review | < 1h | ops console + <abbr title="Risk Management System">RMS</abbr> | [industry typical] |
| LC-DM-MIS_REPORT | Monthly dormant-account MIS to exchange | LC-DM-FLAG | [exit] | [none] | yes (month-keyed) | 3× then manual | re-submit | by month-end | exchange portal | [Reporting domain](/broking-kyc/operations/compliance-blueprint/) |
| LC-<abbr title="Research Analyst">RA</abbr>-REQUEST | Client reactivation request | client-initiated | LC-RA-REKYC | [none] | no | n/a | n/a | < 1m | client UI | [industry typical] |
| LC-RA-REKYC | Re-KYC if >12m dormant | LC-RA-REQUEST | LC-RA-UCC_UNFREEZE | [none] | yes (PAN+ref-id keyed) | 3× then manual | re-request | 1–3 days | ops queue + KRA | [KYC lifecycle domain](/broking-kyc/operations/compliance-blueprint/) |
| LC-RA-UCC_UNFREEZE | Exchange UCC unfreeze | LC-RA-REKYC | LC-RA-BO_REACTIVATE | [none] | yes | 3× then manual | re-submit | 1–2 days | UCC reject | exchange circulars |
| LC-RA-BO_REACTIVATE | Depository BO reactivate | LC-RA-UCC_UNFREEZE | LC-RA-COMPLETE | [none] | yes | 3× then manual | re-submit | 1–2 days | DP reject | CDSL/NSDL circulars |
| LC-RA-COMPLETE | Client notified; trading resumed | LC-RA-BO_REACTIVATE | [exit] | [none] | yes | 3× | re-dispatch | < 1h | DLT comms | [industry typical] |
| LC-CL-REQUEST | Client closure request | [entry] | LC-CL-PENDING_CHECK | [none] | no | n/a | n/a | < 1m | client UI | [industry typical] |
| LC-CL-PENDING_CHECK | Outstanding trades / <abbr title="Margin Trading Facility">MTF</abbr> / payouts? | LC-CL-REQUEST | LC-CL-FUND_WITHDRAW | [none] | yes | none | wait/notify on pending | < 1h | ops queue | [industry typical] |
| LC-CL-FUND_WITHDRAW | Refund client funds bank balance | LC-CL-PENDING_CHECK | LC-CL-PLEDGE_RELEASE | [none] | no (money) | 1× then critical | reversal on bank error | <abbr title="Trade-date Plus N settlement">T+1</abbr> | back-office + bank | [industry typical] |
| LC-CL-PLEDGE_RELEASE | Release margin + MTF pledges | LC-CL-FUND_WITHDRAW | LC-CL-BO_CLOSE | [none] | yes | 3× then manual | reverse if disputed | < 1 day | DP console | [CDSL pledge circulars](/broking-kyc/reference/circulars/cdsl/) |
| LC-CL-BO_CLOSE | CDSL / NSDL BO closure | LC-CL-PLEDGE_RELEASE | LC-CL-UCC_DEACTIVATE | [none] | yes (BO-keyed) | 3× then manual | re-submit on rejection | 1–2 days | DP reject | [CDSL/NSDL circulars](/broking-kyc/reference/circulars/cdsl/) |
| LC-CL-UCC_DEACTIVATE | Exchange UCC deactivation | LC-CL-BO_CLOSE | LC-CL-KRA_CLOSURE | [none] | yes | 3× then manual | re-submit | 1–2 days | UCC reject | exchange circulars |
| LC-CL-KRA_CLOSURE | KRA status → "closed" (CKYC retained) | LC-CL-UCC_DEACTIVATE | LC-CL-COMPLETE | [none] | yes | 3× | re-submit | within 7d | KRA reject | [SEBI KYC master circular](/broking-kyc/reference/circulars/sebi-mirsd/) |
| LC-CL-COMPLETE | Final acknowledgement to client | LC-CL-KRA_CLOSURE | [exit] | [none] | yes | 3× | re-dispatch | < 1h | DLT comms | [industry typical] |

## Practical notes

- **[gotcha]** Modification ordering is sequential, not parallel — unlike onboarding's parallel KRA/CKYC/UCC/BO fan-out. New ops engineers sometimes try to fire all four updates concurrently for a modification and see exchange/UCC rejections because they hit the exchange before KRA's new state propagated. Strict KRA → CKYC → UCC → BO is the rule.
- **[industry practice]** LC-TR-SUCCESSION path (no-nominee transmission) is operationally one of the longest lifecycle flows — succession certificates can take months. Brokers maintain a separate "succession queue" for these cases, distinct from the active operational ops queue, with quarterly progress reviews rather than daily.
- **[risk trade-off]** LC-DM-FLAG auto-disables segments when dormancy detected. Tightening detection (e.g., 6 months instead of 12) reduces credit/abuse risk for inactive accounts but increases legitimate-customer friction when they return. Most brokers use 12 months (industry default) and accept the trailing risk window.
- **[cost optimization]** LC-CL-* closure path can generate substantial cost if not optimized. Some brokers offer a "closure-with-securities-transfer" path that lets the client transfer securities to another broker without a sale — bypassing LC-CL-PLEDGE_RELEASE → securities pay-in cycle and saving the client's STT / capital gains hit.

## Verified through

2026-05-14

---

*AI-generated and not legal, financial, or compliance advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*

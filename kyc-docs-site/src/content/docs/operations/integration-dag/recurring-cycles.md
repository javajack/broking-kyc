---
title: "Integration DAG: Recurring cycles"
description: Dependency graph for weekly, monthly, quarterly, half-yearly, and annual cadences — CFR, client funding, GST/TDS/STT, MIS, networth, running-account settlement, FATCA refresh, BCP drill, compliance certificate, internal audit, statutory audit, KRA / DP / system / cyber audits, NISM re-cert, ITR Form-16A, membership renewal.
---

> **Why this page is structured this way:** Cycles aren't really call-chains; they're temporal dependencies. The daily reconciliation feeds the weekly CFR which informs the monthly client-funding submission which contributes to quarterly running-account settlement which rolls up to the half-yearly compliance certificate which is audited annually. One DAG shows the cadence dependencies; per-cycle tables capture the operational detail.

## TL;DR

- 1 cadence-dependency DAG showing how shorter-cycle outputs feed longer-cycle reports.
- 18 unique recurring nodes across 5 cadence layers.
- Quarterly **running-account settlement** is the strict-cutoff item — calendar quarter-end (Apr / Jul / Oct / Jan); penalty-attracting in inspections.
- Annual **statutory audit** is the longest-arm dependency: it consumes every prior cycle's output for the year.

## Conceptual overview

Cycles repeat. Weekly CFRs go out every Friday; monthly returns by mid-month; quarterly running-account settlement on calendar quarter-ends; half-yearly compliance certificates; annual audits. Each cycle has its own owner (Compliance Officer for SCORES MIS; Funds Ops for running-account; Internal Auditor for half-yearly report; CA firm for statutory). The cadence DAG below shows how shorter cycles feed longer ones — a yearly statutory audit consumes 12 monthly MIS, 4 quarterly settlement artefacts, 2 half-yearly certificates, and the underlying daily ledger. Building the compliance calendar from this view is the single highest-leverage exercise a new compliance officer can do.

## DAG — Cadence dependencies

```
DAILY OUTPUTS  (from EOD: ledger, DMF, CN dispatch, KRA/CKYC uploads)
   │
   ├──► CYC-WK-CFR              (Weekly CFR, Friday cut-off)
   │       │
   │       ├──► CYC-MO-CLIENT_FUNDING   (Monthly client funding to exchange)
   │       ├──► CYC-MO-NETWORTH         (Monthly networth check)
   │       │
   │       ▼
   ├──► CYC-MO-GST              (Monthly GST returns; GSTR-1 by 11th, GSTR-3B by 20th)
   ├──► CYC-MO-TDS              (Monthly TDS deposit by 7th of next month)
   ├──► CYC-MO-STT              (Monthly STT remittance)
   ├──► CYC-MO-COMPLAINT_MIS    (Monthly grievance MIS to SCORES + exchange)
   │
   ▼
CYC-QT-RUNNING_ACCT          (Quarterly running-account settlement; Apr/Jul/Oct/Jan)
   │
   ├──► CYC-QT-FATCA_REFRESH   (Quarterly FATCA refresh for foreign-tax-residency)
   ├──► CYC-QT-BCP_DRILL       (Quarterly BCP / DR drill)
   ├──► CYC-QT-STATEMENT       (Quarterly statement of accounts to clients)
   │
   ▼
CYC-HY-COMPLIANCE_CERT       (Half-yearly compliance certificate to SEBI)
   │
   ├──► CYC-HY-INTERNAL_AUDIT  (Half-yearly internal audit report)
   │
   ▼
CYC-AN-STATUTORY_AUDIT       (Annual statutory audit by CA firm)
   │
   ├──► CYC-AN-KRA_AUDIT       (Annual KRA process audit)
   ├──► CYC-AN-DP_AUDIT        (Annual DP audit — CDSL or NSDL or both)
   ├──► CYC-AN-SYSTEM_AUDIT    (Every 2 years per SEBI; alternate annual cycle)
   ├──► CYC-AN-CYBER_AUDIT     (Annual / biennial per CSCRF category)
   ├──► CYC-AN-FIT_PROPER      (Annual fit-and-proper refresh for directors/KMP)
   ├──► CYC-AN-NISM_RECERT     (NISM re-certification cycles for compliance/AP/dealer)
   ├──► CYC-AN-FORM_16A        (Annual TDS Form 16A dispatch)
   └──► CYC-AN-MEMBERSHIP      (Annual exchange membership renewal)
```

## Per-node detail

| node_id | operation | depends_on | blocks | parallel_eligible | idempotent | retry_policy | rollback | sla | failure_surface | spec_source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| CYC-WK-CFR | Weekly Client Funding Report submission | EOD daily outputs (×5) | CYC-MO-CLIENT_FUNDING | parallel-with monthly tracks | yes (week-keyed) | 3× then manual | re-submit on revision | by Friday cut-off | exchange portal | [Reporting domain](/broking-kyc/operations/compliance-blueprint/#reporting-cadences-40-entries) |
| CYC-MO-CLIENT_FUNDING | Monthly aggregated client funding to exchange | CYC-WK-CFR (×4) | CYC-QT-RUNNING_ACCT | parallel-with other monthly | yes (month-keyed) | 3× then manual | [none] | by mid-month | exchange portal | [Reporting domain](/broking-kyc/operations/compliance-blueprint/#reporting-cadences-40-entries) |
| CYC-MO-NETWORTH | Monthly networth check (>Rs.3 cr threshold) | daily ledger | CYC-QT-RUNNING_ACCT | parallel | yes | 1× then critical alert | n/a | by month-end | compliance console | [Member compliance domain](/broking-kyc/operations/compliance-blueprint/#member-compliance-23-entries) |
| CYC-MO-GST | Monthly GST returns (GSTR-1 + GSTR-3B) | daily ledger | CYC-AN-STATUTORY_AUDIT | parallel | yes (month-keyed) | 3× then accountant manual | re-file revision | GSTR-1 by 11th, GSTR-3B by 20th | GST portal | GST Act / GSTN |
| CYC-MO-TDS | Monthly TDS deposit + quarterly returns | daily ledger | CYC-AN-FORM_16A | parallel | yes (month-keyed) | 3× then accountant manual | re-deposit on revision | by 7th of next month | IT portal | IT Act |
| CYC-MO-STT | Monthly STT remittance | daily ledger | CYC-AN-STATUTORY_AUDIT | parallel | yes | 3× then manual | n/a | by 7th of next month | IT portal | STT framework |
| CYC-MO-COMPLAINT_MIS | Monthly complaint summary to SCORES + exchange | grievance system | CYC-HY-COMPLIANCE_CERT | parallel | yes | 3× then manual | re-submit revision | by month-end | SCORES portal | [Grievance domain](/broking-kyc/operations/compliance-blueprint/#investor-grievance-12-entries) |
| CYC-QT-RUNNING_ACCT | Quarterly running-account settlement | CYC-MO-CLIENT_FUNDING (×3) | CYC-HY-COMPLIANCE_CERT | parallel-with other quarterly | yes (client+quarter keyed) | strict — calendar quarter-end | n/a (sweep is the rollback) | by quarter-end | ops console + client banks | [SEBI running-account circular](/broking-kyc/reference/circulars/sebi-mirsd/) |
| CYC-QT-FATCA_REFRESH | Quarterly FATCA refresh | daily KRA + CKYC | CYC-HY-COMPLIANCE_CERT | parallel | yes | 3× then manual | [none] | by quarter-end | KRA portal | [SEBI FATCA centralization Feb 2024](/broking-kyc/reference/circulars/sebi-mirsd/) |
| CYC-QT-BCP_DRILL | Quarterly BCP / DR drill | BOD health-checks | CYC-HY-COMPLIANCE_CERT | parallel | yes (drill-id keyed) | 1× then escalation | n/a | by quarter-end | ops + CISO | [BCP/DR domain](/broking-kyc/operations/compliance-blueprint/#bcp--dr-15-entries) |
| CYC-QT-STATEMENT | Quarterly statement of accounts to clients | CYC-QT-RUNNING_ACCT | CYC-HY-COMPLIANCE_CERT | parallel | yes (client-keyed) | 3× then manual | re-dispatch on revision | within 30d of quarter-end | DLT comms | [Investor servicing domain](/broking-kyc/operations/compliance-blueprint/#investor-servicing-15-entries) |
| CYC-HY-COMPLIANCE_CERT | Half-yearly compliance certificate to SEBI | CYC-QT-* (×2) | CYC-AN-STATUTORY_AUDIT | parallel-with internal audit | yes | 1× then escalation | re-submit revision | half-yearly cycle | SEBI portal | [Reporting domain](/broking-kyc/operations/compliance-blueprint/#reporting-cadences-40-entries) |
| CYC-HY-INTERNAL_AUDIT | Half-yearly internal audit by appointed CA | CYC-MO-* / CYC-QT-* outputs | CYC-AN-STATUTORY_AUDIT | parallel | yes | n/a (human) | re-issue audit observation | half-yearly cycle | audit report | [Audit domain](/broking-kyc/operations/compliance-blueprint/#audit-cycles-21-entries) |
| CYC-AN-STATUTORY_AUDIT | Annual audit by independent CA | CYC-HY-* (×2), CYC-MO-* (×12), CYC-QT-* (×4) | [exit] | parallel | yes | n/a (human) | n/a | annual cycle | audit report | [Audit domain](/broking-kyc/operations/compliance-blueprint/#audit-cycles-21-entries) |
| CYC-AN-KRA_AUDIT | Annual KRA process audit | KRA-DAILY (×365) | [exit] | parallel | yes | n/a | n/a | annual | audit report | [SEBI KYC master circular](/broking-kyc/reference/circulars/sebi-mirsd/) |
| CYC-AN-DP_AUDIT | Annual DP audit (CDSL / NSDL) | EOD-* / BOD-* depository ops | [exit] | parallel | yes | n/a | n/a | annual | audit report | [CDSL / NSDL circulars](/broking-kyc/reference/circulars/cdsl/) |
| CYC-AN-SYSTEM_AUDIT | System audit (every 2 years per SEBI) | year's system ops | [exit] | parallel | yes (alt-year) | n/a | n/a | biennial | audit report | SEBI system audit circulars |
| CYC-AN-CYBER_AUDIT | Cyber audit per CSCRF | CSCRF logs (full year) | [exit] | parallel | yes | n/a | n/a | annual / biennial per category | CSCRF report | [Cyber domain](/broking-kyc/operations/compliance-blueprint/#cyber-security-27-entries) |
| CYC-AN-FIT_PROPER | Annual fit-and-proper self-cert | directors / KMP / senior mgmt | [exit] | parallel | yes (person-keyed) | 1× then escalation | n/a | annual | compliance console | [Member compliance domain](/broking-kyc/operations/compliance-blueprint/#member-compliance-23-entries) |
| CYC-AN-NISM_RECERT | NISM re-certification cycles | NISM cert expiry tracking | [exit] | parallel | yes (cert-keyed) | renewal window 3y | account-disable if lapsed | rolling | HR + compliance | NISM regulations |
| CYC-AN-FORM_16A | Annual TDS Form 16A dispatch | CYC-MO-TDS (×12) | [exit] | parallel | yes (client-keyed) | 3× then manual | re-dispatch on revision | annual | DLT comms + email | IT Act |
| CYC-AN-MEMBERSHIP | Annual exchange membership renewal | networth + fit-and-proper | [exit] | parallel | yes (member-keyed) | renewal window | suspension if lapsed | annual | exchange portal | [Member compliance domain](/broking-kyc/operations/compliance-blueprint/#member-compliance-23-entries) |

## Practical notes

- **[gotcha]** CYC-QT-RUNNING_ACCT is strictly enforced by calendar quarter-end (April / July / October / January), not by quarter-since-account-opened. New ops engineers sometimes misread this as a 90-day client-anniversary cycle; it isn't. Sweep happens on the same day for every client.
- **[industry practice]** The cadence DAG implicitly tells you the **escalation calendar** — if a CYC-WK-CFR misses Friday, the failure cascades into CYC-MO-CLIENT_FUNDING (next mid-month) which cascades into CYC-QT-RUNNING_ACCT (next quarter-end). Compliance teams run this analysis weekly to predict month-end churn.
- **[risk trade-off]** Most cycles allow `3× retry then manual queue`; CYC-QT-RUNNING_ACCT, CYC-HY-COMPLIANCE_CERT, and the annual audits don't — they're human-driven with hard deadlines. Tighter monitoring on these (alerts at T-3 days, T-1 day, T-0) prevents most last-minute panics.
- **[cost optimization]** CYC-AN-NISM_RECERT lapses are the single most common reason for individual ops-staff being briefly account-disabled. Most large brokers maintain a 90-day-before-expiry alert in HRMS to avoid this; smaller brokers track manually and miss occasionally.

## Verified through

2026-05-14

---

*AI-generated and not legal, financial, or compliance advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*

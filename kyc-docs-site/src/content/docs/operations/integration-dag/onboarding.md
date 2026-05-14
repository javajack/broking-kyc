---
title: "Integration DAG: Onboarding"
description: Dependency graph for the 9-screen onboarding flow, the Screen 8 blocking gate, the maker-checker workflow, and the 8 post-checker batch pipelines that converge on the final ACTIVE gate.
---

> **Why this page is structured this way:** Onboarding is the most parallel-rich phase a broker has — Screen 2 fires four async calls simultaneously, the post-checker batch zone fires eight pipelines in parallel. Two big DAGs explain the structure; one combined per-node detail table sits underneath.

## TL;DR

- 3 ASCII DAGs covering Screens 1–9, post-eSign maker-checker, and the 8-pipeline batch zone.
- ~28 unique integration nodes across the full onboarding arc.
- Async-convergence on Screen 8 is the most consequential gate — it consumes results of every Screen-2 + Screen-5 + Screen-6 async call.
- Final ACTIVE gate is the AND of three independent conditions: KRA Registered + BO Active + UCC Approved.

## Conceptual overview

Onboarding's job is to take a stranger and turn them into a trade-eligible client across half a dozen regulators and registries — all without the customer staring at a spinner for more than a second. The orchestration accomplishes this by **fanning out async** at every opportunity. Screen 2's PAN+DOB submission fires four parallel calls that all need to be done by Screen 8; the customer's 60-second DigiLocker journey on Screen 3 provides cover. Post-eSign, eight unrelated batch pipelines run independently because none of them depend on each other's output — the slowest one (NSDL at ~15 days) determines wall-clock to ACTIVE.

## DAG 1 — Screens 1 to 4 (async convergence on identity)

```
ONB-S1-MOBILE_OTP
        │
        ▼
ONB-S2-PAN_DOB_SUBMIT  (entry)
        │
        ├──────────────► ONB-S2-PAN_VERIFY      (Protean)
        ├──────────────► ONB-S2-KRA_LOOKUP      (CVL/NDML/DOTEX/CAMS/KFintech)
        ├──────────────► ONB-S2-CKYC_SEARCH     (CERSAI; masked KIN post Jan 2025)
        └──────────────► ONB-S2-AML_SCREEN      (sanctions + PEP)
                                  │
                                  │ (results land async; user travels to S3 meanwhile)
                                  ▼
ONB-S3-DIGILOCKER_CONSENT  ──► ONB-S3-DIGILOCKER_FETCH  (Aadhaar XML harvest)
                                  │
                                  ▼
ONB-S4-CONFIRM_IDENTITY   (prefill assembled from DigiLocker > CKYC > KRA)
                                  │
                                  ▼ (S5-S6-S7 below)
```

## DAG 2 — Screens 5 to 9 (blocking gate)

```
ONB-S5-BANK_SUBMIT  ──► ONB-S5-PENNY_DROP   (Re.1 IMPS + name match)
                            │
                            └──► async result lands by S8
ONB-S6-TRADING_PREFS  ──► ONB-S6-INCOME_VERIFY  (AA / ITR / manual — if F&O/COM)
                            │
                            └──► async result lands by S8
ONB-S7-NOMINATIONS

                     ▼
ONB-S8-BLOCKING_GATE   (AND of: PAN status E, PAN-Aadhaar linked, AML clean,
                        penny drop name-match pass, KRA/CKYC search complete,
                        income verify complete-if-applicable)
                     │
        (any FAIL)  ◄┴──► (ALL PASS)
            │                  │
            ▼                  ▼
ONB-S8-REMEDIATE       ONB-S9-FACE_MATCH  (selfie vs Aadhaar photo)
   (user fix path)            │
                              ▼
                     ONB-S9-AADHAAR_OTP_ESIGN  (final eSign with DSC)
                              │
                              ▼
                     (handed off to maker-checker — DAG 3)
```

## DAG 3 — Maker-checker and the 8 batch pipelines

```
ONB-S9-ESIGN_DONE
        │
        ▼
ONB-MAKER_REVIEW       (auto-approve if all checks green; manual queue otherwise)
        │
        ▼
ONB-CHECKER_APPROVE    (independent supervisor sign-off — SEBI dual-control)
        │
        ├────────────► ONB-BATCH-KRA       (CVL/NDML/DOTEX/CAMS/KFintech upload; 2-3d)
        ├────────────► ONB-BATCH-CKYC      (CERSAI JSON upload; KIN issuance 4-5d)
        ├────────────► ONB-BATCH-NSE_UCC   (REST or batch file; same day)
        ├────────────► ONB-BATCH-BSE_UCC   (BEFS; same day)
        ├────────────► ONB-BATCH-MCX_UCC   (pipe-delimited; income proof required; next WD)
        ├────────────► ONB-BATCH-CDSL_BO   (CDAS fixed-length; 1-2h)
        ├────────────► ONB-BATCH-NSDL_BO   (UDiFF ISO-tagged; ~15d incl. PAN flag)
        └────────────► ONB-BATCH-INCOME    (1-2h; only if F&O/COM elected)
                                  │
                                  │  (8 pipelines run independently; fan-in below)
                                  ▼
                     ONB-FINAL_GATE  (KRA Registered AND BO Active AND UCC Approved)
                                  │
                                  ▼
                     ONB-ACTIVE  (account status flips; welcome cascade fires)
```

## Per-node detail

| node_id | operation | depends_on | blocks | parallel_eligible | idempotent | retry_policy | rollback | sla | failure_surface | spec_source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ONB-S1-MOBILE_OTP | SMS OTP send + verify | [entry] | ONB-S2-PAN_DOB_SUBMIT | [none] | conditional (dedupe by mobile+timestamp) | 3× then email fallback | [none] | < 30s | client UI | [industry typical] |
| ONB-S2-PAN_DOB_SUBMIT | Capture PAN + DOB; trigger fan-out | ONB-S1-MOBILE_OTP | ONB-S2-PAN_VERIFY, ONB-S2-KRA_LOOKUP, ONB-S2-CKYC_SEARCH, ONB-S2-AML_SCREEN | [none] | yes | none (user-initiated) | [none] | < 1s | client UI | [SEBI/HO/MIRSD/MIRSD-SEC-2/P/CIR/2023/168](/broking-kyc/reference/circulars/sebi-mirsd/) |
| ONB-S2-PAN_VERIFY | NSDL/Protean PAN status check | ONB-S2-PAN_DOB_SUBMIT | ONB-S8-BLOCKING_GATE | ONB-S2-KRA_LOOKUP, ONB-S2-CKYC_SEARCH, ONB-S2-AML_SCREEN | yes (PAN-keyed) | 3× exp backoff; manual queue on persistent 5xx | [none] | < 3s P95 | client UI / ops queue | NSDL Protean specs |
| ONB-S2-KRA_LOOKUP | KRA presence + status check (5-agency parallel) | ONB-S2-PAN_DOB_SUBMIT | ONB-S2-PREFILL_RESOLVE | parallel-with PAN/CKYC/AML | yes | 3× then proceed without prefill | [none] | < 5s P95 | client UI silently | [SEBI/HO/MIRSD/SECFATF/P/CIR/2024/79](/broking-kyc/reference/circulars/sebi-mirsd/) |
| ONB-S2-CKYC_SEARCH | CERSAI CKYC presence + masked KIN | ONB-S2-PAN_DOB_SUBMIT | ONB-S2-PREFILL_RESOLVE | parallel-with PAN/KRA/AML | yes | 3× then proceed | [none] | < 5s P95 | client UI silently | [CKYC/2024/04](/broking-kyc/reference/circulars/cersai/) |
| ONB-S2-AML_SCREEN | Sanctions + PEP screen | ONB-S2-PAN_DOB_SUBMIT | ONB-S8-BLOCKING_GATE | parallel-with PAN/KRA/CKYC | yes | 3× then ops alert | [none] | < 10s P95 | ops queue / client S8 | [SEBI/HO/MIRSD/SECFATF/P/CIR/2024/78](/broking-kyc/reference/circulars/sebi-mirsd/) |
| ONB-S3-DIGILOCKER_CONSENT | OAuth redirect + Aadhaar OTP on DL | ONB-S2-PAN_DOB_SUBMIT | ONB-S3-DIGILOCKER_FETCH | [none] | yes (consent-keyed) | manual retry only | [none] | < 60s user wall-clock | client UI | [SEBI/HO/MIRSD/DOP/CIR/P/2020/73](/broking-kyc/reference/circulars/sebi-mirsd/) |
| ONB-S3-DIGILOCKER_FETCH | Pull Aadhaar XML + linked docs | ONB-S3-DIGILOCKER_CONSENT | ONB-S2-PREFILL_RESOLVE | [none] | yes | 3× then OCR-fallback prompt | [none] | < 5s P95 | client UI | DigiLocker partner SOP |
| ONB-S2-PREFILL_RESOLVE | Merge KRA + CKYC + DigiLocker (priority: DigiLocker > CKYC > KRA) | ONB-S2-KRA_LOOKUP, ONB-S2-CKYC_SEARCH, ONB-S3-DIGILOCKER_FETCH | ONB-S4-CONFIRM_IDENTITY | [none] | yes | no retry needed (local compute) | [none] | < 100ms | client UI | [industry typical] |
| ONB-S4-CONFIRM_IDENTITY | Display prefill + collect email | ONB-S2-PREFILL_RESOLVE | ONB-S5-BANK_SUBMIT | [none] | no (user action) | none | [none] | user-driven | client UI | [industry typical] |
| ONB-S5-BANK_SUBMIT | Capture bank A/C + IFSC | ONB-S4-CONFIRM_IDENTITY | ONB-S5-PENNY_DROP | [none] | no (user action) | none | [none] | < 1s | client UI | [industry typical] |
| ONB-S5-PENNY_DROP | Re.1 IMPS + name-match fuzzy score | ONB-S5-BANK_SUBMIT | ONB-S8-BLOCKING_GATE | parallel-with S6 path | conditional (dedupe by txn ref) | 1× retry on bank timeout; manual queue on persistent | reversal entry T+1 if duplicated | < 60s P95 | ops queue / client S8 | [industry typical] |
| ONB-S6-TRADING_PREFS | Segment toggles + risk acknowledgement | ONB-S4-CONFIRM_IDENTITY | ONB-S6-INCOME_VERIFY | [none] | no | none | [none] | user-driven | client UI | [industry typical] |
| ONB-S6-INCOME_VERIFY | AA / ITR / bank-stmt income check | ONB-S6-TRADING_PREFS | ONB-S8-BLOCKING_GATE | parallel-with penny-drop | yes (consent-keyed) | 3× then manual upload prompt | [none] | < 30s AA / minutes for upload | client UI / ops queue | [SEBI/HO/MIRSD/MIRSD-SEC-2/P/CIR/2023/168](/broking-kyc/reference/circulars/sebi-mirsd/) |
| ONB-S7-NOMINATIONS | Capture nominees (up to 10) or opt-out | ONB-S6-TRADING_PREFS | ONB-S8-BLOCKING_GATE | parallel-with S5/S6 | no | none | [none] | user-driven | client UI | SEBI Jan-2025 nomination revamp |
| ONB-S8-BLOCKING_GATE | AND-gate on all async results | ONB-S2-PAN_VERIFY, ONB-S2-AML_SCREEN, ONB-S5-PENNY_DROP, ONB-S6-INCOME_VERIFY, ONB-S7-NOMINATIONS | ONB-S9-FACE_MATCH or ONB-S8-REMEDIATE | [none] | yes (local check) | none | [none] | < 100ms | client UI | [industry typical] |
| ONB-S8-REMEDIATE | Show fix-path UI + re-trigger failed async | ONB-S8-BLOCKING_GATE (fail) | ONB-S8-BLOCKING_GATE (retry) | [none] | yes | user-driven | [none] | user-driven | client UI | [industry typical] |
| ONB-S9-FACE_MATCH | Selfie + liveness vs Aadhaar photo | ONB-S8-BLOCKING_GATE (pass) | ONB-S9-AADHAAR_OTP_ESIGN | [none] | yes (session-keyed) | 3× attempts client-side; VIPV fallback | [none] | < 30s P95 | client UI | [SEBI/HO/MIRSD/DOP/CIR/P/2020/73](/broking-kyc/reference/circulars/sebi-mirsd/) |
| ONB-S9-AADHAAR_OTP_ESIGN | Aadhaar-OTP eSign of application | ONB-S9-FACE_MATCH | ONB-MAKER_REVIEW | [none] | no (signed artefact) | 1× retry on OTP timeout; VIPV fallback | [none] | < 60s P95 | client UI | IT Act 2000 §3A; CCA eSign guidelines |
| ONB-MAKER_REVIEW | Auto-approve if green; manual queue otherwise | ONB-S9-AADHAAR_OTP_ESIGN | ONB-CHECKER_APPROVE | [none] | yes | none (human-in-loop) | [none] | hours (manual) or < 1s (auto) | ops queue | [SEBI/HO/MIRSD/MIRSD-SEC-2/P/CIR/2023/168](/broking-kyc/reference/circulars/sebi-mirsd/) |
| ONB-CHECKER_APPROVE | Independent supervisor sign-off | ONB-MAKER_REVIEW | ONB-BATCH-* (fan-out) | [none] | yes | none (human-in-loop) | [none] | hours | ops queue | SEBI dual-control rule |
| ONB-BATCH-KRA | KRA upload (XML batch) | ONB-CHECKER_APPROVE | ONB-FINAL_GATE | parallel-with all other ONB-BATCH-* | yes (PAN+ref-id keyed) | 24h retry then ops alert | [none] | 2–3 days | KRA reject file | [SEBI/HO/MIRSD/SECFATF/P/CIR/2024/79](/broking-kyc/reference/circulars/sebi-mirsd/) |
| ONB-BATCH-CKYC | CKYC upload (CERSAI JSON) | ONB-CHECKER_APPROVE | ONB-FINAL_GATE | parallel | yes (PAN-keyed) | 24h retry then ops alert | [none] | 4–5 days for KIN | CERSAI ack file | [CKYC/2024/04](/broking-kyc/reference/circulars/cersai/) |
| ONB-BATCH-NSE_UCC | NSE UCC submit (REST or batch) | ONB-CHECKER_APPROVE | ONB-FINAL_GATE | parallel | yes (ref-id keyed) | 3× then manual queue | [none] | same day | NSE UCC reject codes | [NSE UCC circular](/broking-kyc/reference/circulars/nse/) |
| ONB-BATCH-BSE_UCC | BSE BEFS submit | ONB-CHECKER_APPROVE | ONB-FINAL_GATE | parallel | yes | 3× then manual queue | [none] | 1–2 days | BSE BEFS reject | [BSE BEFS circular](/broking-kyc/reference/circulars/bse/) |
| ONB-BATCH-MCX_UCC | MCX UCC submit (pipe-delimited) | ONB-CHECKER_APPROVE | ONB-FINAL_GATE | parallel | yes | 3× then manual queue | [none] | next WD | MCX file reject | [MCX UCC circular](/broking-kyc/reference/circulars/mcx/) |
| ONB-BATCH-CDSL_BO | CDSL BO opening (CDAS lines 01–07) | ONB-CHECKER_APPROVE | ONB-FINAL_GATE | parallel | yes (ref-id keyed) | 3× then manual queue | [none] | 1–2 hours | CDSL reject file | [CDSL CDAS specs](/broking-kyc/reference/circulars/cdsl/) |
| ONB-BATCH-NSDL_BO | NSDL BO opening (UDiFF) | ONB-CHECKER_APPROVE | ONB-FINAL_GATE | parallel | yes | 3× then manual queue; PAN flag wait 5–7d | [none] | ~15 days | NSDL DPM reject + PAN flag | [NSDL UDiFF Mar 2024](/broking-kyc/reference/circulars/nsdl/) |
| ONB-BATCH-INCOME | Income verification (if F&O/COM) | ONB-CHECKER_APPROVE | ONB-FINAL_GATE | parallel | yes (consent-keyed) | 1× retry; ops alert | [none] | 1–2 hours | ops queue | [industry typical] |
| ONB-FINAL_GATE | AND of KRA Registered + BO Active + UCC Approved | ONB-BATCH-KRA, ONB-BATCH-CDSL_BO, ONB-BATCH-NSDL_BO, ONB-BATCH-NSE_UCC, ONB-BATCH-BSE_UCC, ONB-BATCH-MCX_UCC | ONB-ACTIVE | [none] | yes (local check) | none | [none] | < 100ms once inputs ready | none (system) | [industry typical] |
| ONB-ACTIVE | Status flip; welcome cascade fires | ONB-FINAL_GATE | [exit] | [none] | yes (status-keyed) | none | reverse-flip if rollback needed (rare) | < 1s | client UI / DLT comms | [industry typical] |

## Practical notes

- **[industry practice]** The 60-second DigiLocker redirect is treated by orchestrators as a *budgeted slot* for the Screen 2 fan-out to complete. If KRA / CKYC / PAN-verify don't return within ~60 seconds, the client lands on Screen 4 with a "still verifying" indicator and a queued retry — the eSign step ultimately enforces the gate, not Screen 4.
- **[gotcha]** ONB-BATCH-NSDL_BO is the slowest pipeline. The PAN flag finalization (5–7 days post-opening) is the silent killer — a client may show BO Active in the depository portal but not be trade-eligible until PAN flag clears. Most brokers gate trading on PAN flag, not BO opening.
- **[risk trade-off]** Allowing trading before all 8 pipelines reach terminal state lets clients trade sooner (when KRA-Registered + CDSL-BO-Active + NSE-UCC-Approved are done, often ~24h) but exposes the broker to settlement-side rejections if a downstream pipeline (BSE/MCX/income) fails after first trade. Most brokers tolerate this risk for CM-only clients; F&O / COM clients are gated stricter.
- **[cost optimization]** Manual queue items from KRA / CKYC / UCC / BO rejects cluster around the same root causes (name mismatches, address format, PAN-Aadhaar link failures). Auto-categorizing manual-queue items by root cause and routing them to specialized ops sub-teams roughly halves median resolution time.

## Verified through

2026-05-14

---

*AI-generated and not legal, financial, or compliance advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*

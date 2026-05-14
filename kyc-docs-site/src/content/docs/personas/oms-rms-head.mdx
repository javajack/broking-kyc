---
title: "Persona: Head of OMS / RMS"
description: Reading path for the head of order-management and risk-management systems — the team that owns the layer between order entry and exchange. Pre-trade pipeline, peak margin, surveillance, real-time RMS, peak margin shortfall recovery.
---

import { Aside } from '@astrojs/starlight/components';

Your team owns the millisecond-budget layer of the broker. Every order — and there are millions a day — passes through your pre-trade RMS pipeline. Your real-time MTM is what determines whether MIS positions auto-square or stay open. The four peak-margin snapshots that fire at 11:30 / 12:30 / 13:30 / 14:30 are your KPIs.

When things break, you're the one whose phone rings first. This page is your shortcut.

## What you'll find useful here

Three layers matter most:

- **Trading-day deep dives** — OMS internals, RMS / SPAN methodology, surveillance, retail algo framework.
- **Integration DAG (trading hours)** — pre-trade pipeline, snapshot mechanics, intraday loops.
- **Margin / surveillance domains in the Compliance Blueprint** — the obligations driving your KPIs.

Everything else is context for the layer you operate at.

## Suggested reading path (in this order)

1. **[Trading-Hours Integration DAG](/broking-kyc/operations/integration-dag/trading-hours/)** — start here. The per-node table tells you the dependency graph of every call your systems make and respond to.

2. **[OMS Internals deep-dive](/broking-kyc/deep-dives/trading-day/oms-internals/)** — your team's primary product. Order capture paths, pre-trade RMS hot path (segment / margin / MWPL / order-type / surveillance gates), FIX gateway specifics, latency budgets.

3. **[RMS / SPAN Methodology deep-dive](/broking-kyc/deep-dives/trading-day/rms-span-methodology/)** — the margin computation walkthrough. Worked examples; peak margin shortfall penalty grids. This is your team's regulatory reference.

4. **[Surveillance — NORMS / GSM / ASM deep-dive](/broking-kyc/deep-dives/trading-day/surveillance-norms-gsm-asm/)** — what triggers what flag. Your team's surveillance system mirrors much of this; knowing the exchange-side rules is non-negotiable.

5. **[BOD Integration DAG](/broking-kyc/operations/integration-dag/bod/)** — the RMS parameter reload sequence. If BOD fails, your system doesn't have margin parameters and you can't trade.

6. **[Compliance Blueprint — Margin domain](/broking-kyc/operations/compliance-blueprint/#margin-compliance-30-entries)** — the regulatory obligations driving your team's deliverables.

7. **[Compliance Blueprint — Surveillance domain](/broking-kyc/operations/compliance-blueprint/#surveillance-30-entries)** — similarly, the obligations driving your surveillance team's work.

8. **[Short-Delivery Auction deep-dive](/broking-kyc/deep-dives/trading-day/short-delivery-auction/)** — your team owns the prevention (covering shorts before auction); ops owns the auction itself.

9. **[Retail Algo Framework deep-dive](/broking-kyc/deep-dives/trading-day/retail-algo-framework/)** — post Aug 2025 SEBI mandate. Tagged-order flow, pre-trade controls; your team operationalizes the broker-side algo approval.

10. **[Payin Default + Core SGF deep-dive](/broking-kyc/deep-dives/settlement/payin-default-core-sgf/)** — the failure mode your daily margin recompute is preventing.

That's the foundation.

<Aside type="tip">
**Peak margin snapshots are the most operationally consequential events of your day.** The clearing corp captures broker margin state at 11:30 / 12:30 / 13:30 / 14:30 — those are time-locked. Your RMS must hold margin position stable across each snapshot. Pre-computing snapshot-relevant state at 11:25 / 12:25 / 13:25 / 14:25 (five minutes before each snapshot) avoids last-second compute pressure.
</Aside>

## Common questions in your role

- **What's the latency budget for the pre-trade pipeline?** → [OMS Internals deep-dive](/broking-kyc/deep-dives/trading-day/oms-internals/) — single-digit milliseconds. P99 measurement and alerting is your baseline.
- **What's the penalty for a peak-margin shortfall in a single snapshot?** → [RMS / SPAN deep-dive — penalty section](/broking-kyc/deep-dives/trading-day/rms-span-methodology/). Slabs scale with size of shortfall and frequency.
- **How does SPAN scenario method actually work?** → [RMS / SPAN deep-dive](/broking-kyc/deep-dives/trading-day/rms-span-methodology/) — 16 scenarios + scanrange components walked through.
- **A client's MIS position breached margin mid-day — what's the auto-square-off rule?** → [OMS Internals deep-dive](/broking-kyc/deep-dives/trading-day/oms-internals/) — typical 15:20 cutoff or margin-breach trigger.
- **Order-to-Trade Ratio breach for a client — what's our response?** → [Surveillance deep-dive — OTR section](/broking-kyc/deep-dives/trading-day/surveillance-norms-gsm-asm/).
- **What's the difference between additional margin and exposure margin?** → [RMS / SPAN deep-dive — margin types section](/broking-kyc/deep-dives/trading-day/rms-span-methodology/).
- **An algo-tagged order failed pre-trade controls — what's the procedure?** → [Retail Algo Framework deep-dive](/broking-kyc/deep-dives/trading-day/retail-algo-framework/).
- **CSCRF cyber-audit is up; what does that mean for our systems?** → [CSCRF deep-dive](/broking-kyc/deep-dives/compliance-audit/cscrf-deep-dive/) — your systems are in scope.

## What to skip (and why)

- **Compliance Blueprint reporting / grievance / DPDP domains** — Compliance Officer's reading.
- **Settlement deep-dives other than payin-default** — Operations Lead and Finance / CFO territory.
- **Lifecycle walkthroughs** — Operations Lead handles these.
- **Vendor Atlas non-RMS / non-OMS categories** — you only need to know what's in your stack.
- **`appendix/*`** — out of your scope.

## When you'd hand off

- **"This margin formula isn't matching the clearing corp's response file"** → [Backend Engineer reading path](/broking-kyc/personas/backend-engineer/) for the implementation details; [Compliance Officer](/broking-kyc/personas/compliance-officer/) for any regulatory implication.
- **"We need an exception for a high-net-worth client"** → [Compliance Officer reading path](/broking-kyc/personas/compliance-officer/) — exception handling.
- **"Our RMS vendor is acquiring a competitor — what's our risk?"** → [Product Manager](/broking-kyc/personas/product-manager/) with [Operations Lead](/broking-kyc/personas/operations-lead/) — vendor concentration analysis.

## Verified through

2026-05-14

---

*AI-generated and not legal, financial, or compliance advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*

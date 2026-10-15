---
title: "Monitoring and data sharing: overview"
description: What a broker must send to, and is watched on by, exchanges, clearing corporations, depositories, the regulator and the financial intelligence unit — the real-time obligations, the periodic submission calendar, the alerts that demand a documented response, incident reporting, and transaction monitoring.
---

> **Why this plane exists:** Supervision of a broker is usually described as "reporting", which understates it in two directions. Some obligations are continuous rather than periodic — positions and margins are measured at random intraday moments, and utilisation thresholds are broadcast to the trading terminal. And a large part of the obligation is inbound: alerts arrive with a clock attached, and silence is itself a breach. This plane separates the four streams because they fail in completely different ways.

## TL;DR

- **Four kinds of stream, four failure modes.** A dashboard alert fails by running out of clock; a file that changes client state fails by going unread; a terminal message fails by being ephemeral; a penalty advice fails because its appeal window starts on publication.
- **Much of the measurement is intraday and random.** Margin and position limits are sampled at a minimum number of random snapshots within pre-defined windows, so a firm computing only at day boundaries is measuring a different quantity from the one it is judged on.
- **The obligation on inbound alerts is to dispose, not to receive** — with evidence obtained before closure, and a written conclusion.
- **Several streams silently disable clients.** Registration-agency status, client-code compliance batches and the mobile-number revocation list each stop clients trading with no event other than a file appearing.
- **Incident clocks are short and absolute.** Cyber incidents in hours, technical glitches sooner, with a preliminary report and then a root-cause analysis.

## The pages

| Page | What it covers |
|---|---|
| [The monitoring obligation map](/broking-kyc/finix-broking-setup/monitoring/01-monitoring-obligation-map/) | Who watches what, on what cadence, and which obligations are the firm's to compute versus the venue's |
| [Real-time and near-real-time](/broking-kyc/finix-broking-setup/monitoring/02-realtime-near-realtime/) | Intraday snapshots, delta-adjusted open interest, the terminal broadcasts, order-to-trade ratio, and the cure windows the rules deliberately provide |
| [Periodic submissions](/broking-kyc/finix-broking-setup/monitoring/03-periodic-submissions/) | The submission calendar, the single-filing reform across exchanges, and the deadline conflicts in live documents |
| [Alerts received, and the obligation to respond](/broking-kyc/finix-broking-setup/monitoring/04-alerts-received-and-response/) | The downloaded transactional alerts, the dashboard, the disposal clock, surveillance measures, client-code and registration-agency streams, trade cancellation, and penalty appeals |
| [Incident and breach reporting](/broking-kyc/finix-broking-setup/monitoring/05-incident-breach-reporting/) | Cyber, technical glitch, business continuity, and the reporting chain with its hours-and-days clocks |
| [Transaction monitoring and reporting](/broking-kyc/finix-broking-setup/monitoring/06-aml-monitoring-reporting/) | Suspicious and prescribed transaction reporting, the platform, who signs, and the tipping-off bar |

## Where this connects

The files behind these obligations are registered in [files and data interchange](/broking-kyc/finix-broking-setup/files/), the desk responses in [the <abbr title="Risk Management System">RMS</abbr> operations catalogue](/broking-kyc/finix-broking-setup/rms/11-operations-catalogue/), and the daily items in [the master trading-day checklist](/broking-kyc/finix-broking-setup/daily-ops/10-master-trading-day-checklist/). The vendor-neutral framework treatments are under [the compliance and audit deep dives](/broking-kyc/deep-dives/) and [surveillance norms](/broking-kyc/deep-dives/trading-day/surveillance-norms-gsm-asm/).

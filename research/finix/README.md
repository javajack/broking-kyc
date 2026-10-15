# Finix research corpus

Primary-source research behind the `finix-broking-setup` section of the docs site
(sub-projects #12 and #13, October 2026). **Kept in git deliberately**: it was
expensive to produce — several research runs exhausted provider usage limits — and the
repo convention deletes the `working/` scratch directory at the end of each
sub-project, which would otherwise lose it.

## Evidence convention

Every fact in these files carries an evidence class. This is load-bearing, not
decoration — a previous build shipped a factual error by inferring a plausible detail.

| Class | Meaning |
|---|---|
| `[verified]` | Read in a primary source, with the URL given |
| `[likely]` | Not in a primary source the researcher could open, but consistent across two or more independent secondary sources, which are named |
| `[uncertain]` | A single weak source. Treat as a hypothesis |
| `[unknown]` | Could not be established. **The value has deliberately not been guessed** |

**Anything not `[verified]` must be re-verified before it is configured or published.**
Each file ends with a "Gaps and cautions" section listing what could not be established;
those gaps are reproduced as on-page cautions in the docs rather than smoothed over.

## Files

| File | Subject |
|---|---|
| `RESEARCH_files.md` | Exchange, clearing-corporation and depository file register. The largest file; filenames verified against live sources |
| `RESEARCH_alerts.md` | Inbound alert and notice streams, surveillance obligations, penalties |
| `RESEARCH_monitoring.md` | Monitoring and submission obligations |
| `RESEARCH_poslimits_reporting.md` | Position limits, proprietary and employee trading, authorised-person oversight, client-code submissions |
| `RESEARCH_glitchmonitoring.md` | Technical glitch framework, the monitoring parameter set, what is and is not streamed to the exchange |
| `RESEARCH_orderpath.md` | Exchange protocol and order-state edge cases |
| `RESEARCH_contractnotes.md` | Contract notes, electronic delivery, and near-real-time client confirmations |
| `RESEARCH_depository_apis.md` | Depository programmatic interfaces, real-time versus batch |
| `RESEARCH_vendor_apis.md` | What broking software vendors publicly publish about interfaces |
| `RESEARCH_mtf_pledge.md` | Margin trading facility and the pledge lifecycle |
| `RESEARCH_fno.md` | Derivatives lifecycle, expiry regime, physical settlement, position limits |
| `RESEARCH_commodity_currency.md` | Commodity delivery and warehousing; currency and rate derivatives |
| `RESEARCH_charges_limits.md` | Every charge and rate; the event-to-ledger-to-limit matrix |
| `RESEARCH_roles_audit.md` | Statutory roles, certification, segregation, the audit register |
| `RESEARCH_certification.md` | Exchange software approval, change control, mock trading, recovery drills |
| `RESEARCH_2026_changes.md` | Chronological regulatory change register for 2025–2026, with proposals fenced separately |
| `RESEARCH_dr.md` | Disaster recovery: thresholds, drills, recovery objectives, and the architecture and connectivity questions |

`BUILD_PLAN_subproject12.md` and `BUILD_PLAN_subproject13.md` carry the page
inventories, the conventions and the close-out notes including open items.

| `RESEARCH_dr.md` | Disaster-recovery site architecture, exchange connectivity from a recovery site, order-state recovery and the drill regime |

All 18 research files are present.

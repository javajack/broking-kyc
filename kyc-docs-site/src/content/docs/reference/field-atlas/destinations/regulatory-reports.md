---
title: "Regulatory Reports (DMF / CFR / Peak Margin) — Fields consumed"
description: "Every field consumed by Regulatory Reports (DMF / CFR / Peak Margin), with source section, destination format, update frequency, transformation rule, and quirks. Use this when building an integration with this destination."
---

> **Why this page is structured this way:** This is the destination-first view for Regulatory Reports (DMF / <abbr title="Client Funding Report.">CFR</abbr> / Peak Margin). Engineers building an integration with this destination get the complete field list on one page. To see where each field originated in onboarding, follow the per-section links via the [atlas overview](/broking-kyc/reference/field-atlas/).

## TL;DR

- **65 unique fields** consumed by Regulatory Reports (DMF / CFR / Peak Margin).
- Source spans sections: A, B, F, G, H, M, O, U, V, X, <abbr title="Account Aggregator (RBI-licensed NBFC-AA)">AA</abbr>, AC, [cfr], [dmf], [margin], [reporting], [settlement], [peak-margin], [surveillance].
- **65 rows cite a public spec source**; **2** are `[industry typical]`.

## Field-destination rows

Sorted by `source_section`, then `field_id`.

| source_section | field_id | field_name | destination_field_name | destination_format | frequency | transformation | quirks_notes | spec_source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| A | A-full_name | Client Full Name | ClientName | VARCHAR(200) | daily | [direct] | appears in CFR holding-statement API submission; not in margin files (<abbr title="Unique Client Code">UCC</abbr> keyed) | <abbr title="National Stock Exchange of India">NSE</abbr>/INSP/55039 |
| A | A-pan_number | <abbr title="Permanent Account Number">PAN</abbr> Number | ClientPAN | CHAR(10) | daily | uppercase | primary client key in MG-12 / SA01-06 / AMGTM client-margin files | <abbr title="NSE Clearing Limited (formerly National Securities Clearing Corporation Limited)">NCL</abbr>/CMPL/44977 |
| A | A-pan_number | PAN Number | TM_PAN | CHAR(10) | daily | uppercase | trading member PAN included in CFR header; not client PAN | NSE/INSP/55039 |
| A | A-residential_status | Residential Status | ClientCategory | CHAR(2) | daily | lookup against R | drives <abbr title="Non-Resident Indian">NRI</abbr> flag in MG-12 client-category column; restricts intraday route | NSE/<abbr title="Investor Service Centre.">ISC</abbr>/61817 |
| AA | AA-data_retention_end_date | Data Retention End Date | RetentionEndDate | DATE YYYYMMDD | on-modify | derived from Y | 8-year horizon per <abbr title="Securities and Exchange Board of India">SEBI</abbr> Stock Brokers Regulations; aligned to <abbr title="Electronic Contract Note.">ECN</abbr> archive retention | SEBI/<abbr title="Head Office (SEBI circular ID prefix)">HO</abbr>/<abbr title="Markets Intermediaries Regulation and Supervision Department (SEBI)">MIRSD</abbr>/POD-1/P/CIR/2025/94 |
| AA | AA-dpdp_third_party_sharing_consent | <abbr title="Digital Personal Data Protection Act 2023 (and Rules 2025)">DPDP</abbr> Third-Party Sharing Consent | none | none | on-modify | [direct] | gates whether broker can share UCC-keyed margin file rows with vendor risk-platforms; consent withdrawal stops downstream flows | [industry typical] |
| AC | AC-ras_last_transaction_date | Last Transaction Date | LastTradeDate | DATE YYYYMMDD | daily | [direct] | drives 30-day-inactive auto-settlement trigger per Jan-2025 SEBI circular | SEBI/HO/MIRSD/MIRSD-PoD1/P/CIR/2025/1 |
| AC | AC-ras_settlement_bank_account | Running Account Settlement Bank | RABankAccount | VARCHAR(18) | on-event | [direct] | fund-return target on running-account settlement run; weekly cadence | SEBI/HO/MIRSD/MIRSD-PoD1/P/CIR/2025/1 |
| B | B-corr_state | Correspondence State | StampDutyState | CHAR(2) | daily | lookup against R | state-wise stamp-duty reconciliation file from <abbr title="Clearing Corporation (NCL, ICCL, MCXCCL — context-dependent).">CC</abbr>; Indian Stamp Act 1899 (Jul-2020 amendment) | NSE/INSP/61999 |
| F | F-gross_annual_income_range | Annual Income Range Code | IncomeRange | CHAR(2) | daily | lookup against R | 01-06 code; drives F&O eligibility check and <abbr title="Anti-Money Laundering">AML</abbr> high-value-trade alerts; SEBI Jan-2026 revision pending | SEBI/HO/MIRSD/POD-1/P/CIR/2025/94 |
| F | F-net_worth | Net Worth | NetWorth | NUMBER(15,2) | on-modify | [direct] | reported in CFR for high-net-worth clients; must be < 1-yr old per master-dataset F06 | [industry typical] |
| F | F-occupation | Occupation Code | OccupationCode | CHAR(2) | daily | lookup against R | appears in CFR client-profile section and AML risk-bucket inputs | NSE/INSP/55039 |
| G | G-account_number | Primary Bank Account Number | BankAccountNo | VARCHAR(18) | daily | [direct] | appears in bank-balance API submission and CFR holding-statement; <abbr title="Trade-date Plus N settlement">T+1</abbr> daily push | NSE/INSP/55039 |
| G | G-ifsc_code | Bank <abbr title="Indian Financial System Code.">IFSC</abbr> Code | IFSC | CHAR(11) | daily | uppercase | component of bank-balance API row; format [A-Z]{4}0[A-Z0-9]{6} | NSE/INSP/55039 |
| H | H-bo_id | Beneficiary Owner ID | BOID | VARCHAR(16) | daily | [direct] | appears in direct-payout obligation file and pledge/<abbr title="Margin Trading Facility">MTF</abbr> margin reports; <abbr title="Clearing Member">CM</abbr>-pool keying changed by NCL Aug-2025 | NCL/CMPT/69455 |
| H | H-dp_id | Depository Participant ID | DPID | CHAR(8) | daily | [direct] | <abbr title="Central Depository Services (India) Limited">CDSL</abbr>: 8 digits; <abbr title="National Securities Depository Limited">NSDL</abbr>: IN+6 digits; required for direct payout to client demat (Phase-2 from settlement 2425828) | NCL/CMPT/66779 |
| M | M-risk_category | Risk Category | RiskCategory | CHAR(2) | on-modify | [direct] | Conservative/Moderate/Aggressive feeds AML risk-bucket; drives transaction-monitoring threshold | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/78 |
| O | O-ddpi_for_pledge | <abbr title="Demat Debit and Pledge Instruction">DDPI</abbr> Pledge Authorization | PledgeAuthFlag | CHAR(1) | daily | [direct] | drives whether margin pledge can be auto-executed; reported in MG-18 / AMG18 client-collateral file | NCL/CMPT/56502 |
| U | U-mcx_client_category | <abbr title="Multi Commodity Exchange of India">MCX</abbr> Client Category | ClientCategory | CHAR(2) | daily | [direct] | bulk category-disclosure file (COM segment) per UCC Master Circular Annexure | NSE/ISC/61817 |
| U | U-ucc_client_type | UCC Client Type | ClientType | CHAR(2) | daily | lookup against R | IN/HU/NR/CO drives margin computation and segregation bucket in MG-12 | NSE/ISC/61817 |
| U | U-ucc_code | Unique Client Code | UCC | VARCHAR(10) | daily | uppercase | primary key in MG-12 / MG-13 / MG-18 client-margin files; designated SUSPE1234N for unidentified funds | NCL/CMPL/64088 |
| U | U-ucc_code | UCC for <abbr title="Securities Lending and Borrowing Mechanism">SLBM</abbr> | UCC_SLBM | VARCHAR(10) | daily | uppercase | SLBS settlement-calendar circulars use UCC + member-code keying; first-leg Type L + reverse-leg Type P | NCL/CMPT/67763 |
| V | V-nri_trading_route | NRI Trading Route | NRIRouteFlag | CHAR(2) | daily | [direct] | PI=<abbr title="Portfolio Investment Scheme (RBI / NRI)">PIS</abbr> / NP=Non-PIS; permitted reason-code in SA01-06 short-allocation files (NRI trades = permitted reason) | NCL/CMPT/55381 |
| X | X-collateral_type_preference | Collateral Type Preference | CollateralType | CHAR(2) | daily | [direct] | CA/SE/FD/ET drives column in MG-18 client-collateral file; 50% cash equivalent rule at CM level | NCL/CMPT/67751 |
| X | X-mtf_limit_sanctioned | MTF Limit Sanctioned | MTFFundedAmount | NUMBER(15,2) | daily | [direct] | funded MTF amount reported in CFR; CSMFA-pledge against client demat keyed by primary <abbr title="Beneficial Owner">BO</abbr> ID | NCL/CMPT/63669 |
| X | X-total_pledged_value | Total Pledged Collateral Value | PledgedValue | NUMBER(15,2) | daily | derived from Y | net of prudential haircut per CC approved-securities Annexure; haircut 40-100% phased on un-approved | <abbr title="Indian Clearing Corporation Limited">ICCL</abbr> 20240710-11 |
| [cfr] | cfr-bank_balance | Client Bank Balance | BankBalance | NUMBER(15,2) | on-event | [direct] | weekly cadence; bank-balance API; funded portion of BG only counted as cash-equivalent | NSE/INSP/52724 |
| [cfr] | cfr-cash_balance | Client Cash Balance | CashBalance | NUMBER(15,2) | on-event | [direct] | weekly cadence (Friday or first working day); migrated to daily T+1 API submission Jan-2023 | NSE/INSP/55039 |
| [cfr] | cfr-fdr_lien_value | FDR Lien Value | FDRLienValue | NUMBER(15,2) | on-event | [direct] | weekly cadence; tenure <= 1 year, pre-terminable on demand, principal protected, no funded/non-funded facility against | <abbr title="Multi Commodity Exchange Clearing Corporation Limited">MCXCCL</abbr>/MEM/216/2023 |
| [cfr] | cfr-holding_value | Client Holding Statement Value | HoldingValue | NUMBER(15,2) | on-event | derived from Y | weekly cadence; aggregated client-by-client funding position; valuation per CC approved-securities haircut | NSE/INSP/55039 |
| [cfr] | cfr-margin_funded_amount | MTF Funded Amount | MTFAmount | NUMBER(15,2) | on-event | [direct] | weekly cadence; CSMFA pledge against client primary demat; reported per UCC | NCL/CMPT/63669 |
| [cfr] | cfr-mf_pledged | Mutual Fund Pledge Value | MFOSPledge | NUMBER(15,2) | on-event | derived from Y | weekly cadence; Overnight MFOS haircut 5% effective Aug-2024; other schemes VaR with 9% min | ICCL 20240710-11 |
| [cfr] | cfr-submission_date | CFR Submission Date | SubmissionDate | DATE YYYYMMDD | on-event | formatted | weekly cadence; previously Friday; now daily T+1 API submission via ENIT-NEW-COMPLIANCE | NSE/INSP/55039 |
| [dmf] | dmf-amg18_collateral_release_reason | Collateral Release Reason Code | ReleaseReasonCode | VARCHAR(50) | daily | lookup against R | <abbr title="Trading Member">TM</abbr>-wise reason codes per Section G of MCXCCL/RISK master: unpaid securities/MTF, statutory levies, brokerage, <abbr title="Depository Participant">DP</abbr> charges | MCXCCL/MEM/216/2023 |
| [dmf] | dmf-cash_collateral | Cash Collateral | CashCollateral | NUMBER(15,2) | daily | [direct] | client cash deposited with CC via TM upstream; column in MG-18 client-collateral file | NCL/CMPT/67751 |
| [dmf] | dmf-clearing_member_code | Clearing Member Code | CMCode | VARCHAR(10) | daily | [direct] | CM-level identifier in MGCM/AMGCM file naming | NCL/CMPT/56502 |
| [dmf] | dmf-file_name | MG-12 File Name | MG12FileName | VARCHAR(80) | daily | formatted | NSE_FO_MG12_<member>_DDMMYYYY.csv.gz per CC nomenclature; CM segment uses NCL_CM_MG12 | NCL/CMPT/56502 |
| [dmf] | dmf-non_cash_collateral | Non-Cash Collateral | NonCashCollateral | NUMBER(15,2) | daily | derived from Y | FDR + BG funded + MFOS + securities-pledged; 50% cash-equivalent rule at CM level | NCL/CMPT/67751 |
| [dmf] | dmf-report_date | Margin Report Date | ReportDate | DATE DDMMYYYY | daily | formatted | trade date for which margins computed; appears in file name suffix DDMMYYYY | NCL/CMPT/56502 |
| [dmf] | dmf-segment_code | Segment Code | SegmentCode | CHAR(3) | daily | [direct] | CM/FO/CD/COM; MG-13 aggregates at segment level; MG-12 at client level | NCL/CMPL/44977 |
| [dmf] | dmf-trading_member_code | Trading Member Code | TMCode | VARCHAR(10) | daily | [direct] | TM-level identifier in MGTM/AMGTM file naming | NCL/CMPT/56502 |
| [margin] | margin-consolidated_crystallised_obligation | Consolidated Crystallised Obligation Margin | CnsltdCrstllsdOblgtnMrg | NUMBER(15,2) | daily | derived from Y | introduced via NCL/CMPT/56502 Apr-2023; <abbr title="Trade-date Plus N settlement">T+2</abbr> collection window per NCL/CMPL/44977 Annexure A | NCL/CMPT/56502 |
| [margin] | margin-delivery_margin | Delivery Margin | DlvryMrgn | NUMBER(15,2) | daily | derived from Y | F&O delivery margin column in MG-12; commodity tender-period margin separate | NCL/CMPT/61801 |
| [margin] | margin-elm | Extreme Loss Margin | LossMrgn | NUMBER(15,2) | daily | derived from Y | <abbr title="Extreme Loss Margin">ELM</abbr> rate from CC ELM file (ael_DDMMYYYY.csv); F&O segment | NCL/CMPT/56502 |
| [margin] | margin-end_of_day_requirement | End of Day Margin Requirement | EndOfDayRqrmnt | NUMBER(15,2) | daily | derived from Y | ISO-tagged field in AMGCM/AMGTM; <abbr title="End Of Day">EOD</abbr> positions + <abbr title="Beginning Of Day">BOD</abbr> margin parameters | NCL/CMPT/56502 |
| [margin] | margin-shortfall_amount | Margin Shortfall Amount | Shortfall | NUMBER(15,2) | daily | derived from Y | required - collected; shortfall < 1L AND < 10% attracts 0.5% penalty; else 1.0% | NSE/INSP/64315 |
| [margin] | margin-shortfall_flag | Margin Shortfall Flag | ShortfallFlag | CHAR(1) | daily | derived from Y | Y if shortfall > 0 at snapshot or EOD; combined with SA01-06 for highest-of-four penalty | NCL/CMPT/55381 |
| [margin] | margin-span_margin | <abbr title="Standard Portfolio Analysis of Risk">SPAN</abbr> Margin | SPANMrgn | NUMBER(15,2) | daily | derived from Y | computed by CC SPAN engine from EOD risk parameters; reflected in AMG18 / MGCM ISO-tag | NCL/CMPT/56502 |
| [margin] | margin-total_margin_collected | Total Margin Collected | MarginCollected | NUMBER(15,2) | daily | [direct] | client ledger cash + securities-pledged-with-haircut + FDR + BG funded portion | NCL/CMPT/67751 |
| [margin] | margin-total_margin_required | Total Margin Required | TotalMarginRequired | NUMBER(15,2) | daily | derived from Y | MG-12 client-level total margin; per-client across CM/F&O/CD/Commodity | NCL/CMPL/44977 |
| [margin] | margin-var_margin | VaR Margin | VaRMargin | NUMBER(15,2) | daily | derived from Y | CM segment; 20% upfront acceptable in lieu per NSE/INSP/45534; CC continues VaR+ELM basis | NSE/INSP/64315 |
| [peak-margin] | pm-collateral_value | Collateral Value at Snapshot | CollateralValue | NUMBER(15,2) | daily | derived from Y | allocated + re-pledged after prudential haircut excluding 50:50 rule; checked across NCL segments + other CCs | NCL/CMPT/55381 |
| [peak-margin] | pm-peak_margin_requirement | Peak Margin Requirement | PeakMarginReq | NUMBER(15,2) | daily | derived from Y | max of 4 intraday snapshots per client; included in client-margin reporting file to TM/CM | MCXCCL/RISK/184/2025 |
| [peak-margin] | pm-short_allocation_amount | Short Allocation Amount | ShortAllocation | NUMBER(15,2) | daily | derived from Y | min upfront margin less collateral value; penalty if not justified by permitted reason code | NCL/CMPT/55381 |
| [peak-margin] | pm-short_allocation_reason_code | Short Allocation Reason Code | ReasonCode | CHAR(2) | daily | [direct] | 5 permitted codes: excess at other CC, EPI of securities, wrong-client trades, NRI trades, late allocation acceptance | NCL/CMPT/55381 |
| [peak-margin] | pm-snapshot_seq | Snapshot Sequence | SnapshotSeq | CHAR(4) | daily | [direct] | SA01/02/03 = intraday at snapshot; SA04/05/06 = EOD/max; nomenclature per NCL/CMPT/55381 | NCL/CMPT/55381 |
| [peak-margin] | pm-snapshot_time | Snapshot Timestamp | SnapshotTime | TIMESTAMP HHMMSS | daily | formatted | CC takes 4 random snapshots in 11:00-11:30 / 12:30-13:00 / 13:30-14:00 / 14:30-15:00 windows | MCXCCL/RISK/184/2025 |
| [reporting] | rep-gst_monthly_return | GST Monthly Return | GSTR3B | NUMBER(18,2) | on-event | derived from Y | monthly cadence; GSTR-1 + GSTR-3B; brokers register GSTIN per state of supply | SEBI/HO/MIRSD/POD-1/P/CIR/2025/94 |
| [reporting] | rep-sebi_turnover_fee_halfyear | SEBI Turnover Fee Half-Yearly | SEBIHYFee | NUMBER(18,2) | on-event | derived from Y | half-yearly cadence; half-year ending 30 Sep / 31 Mar; Schedule <abbr title="—">III</abbr> SEBI Stock Brokers Regs | SEBI/HO/MIRSD/POD-1/P/CIR/2025/94 |
| [reporting] | rep-stamp_duty_monthly | Stamp Duty Monthly Remittance | StampDutyRemittance | NUMBER(18,2) | on-event | derived from Y | monthly cadence per state; CC centralised collection since Jul-2020 under amended Indian Stamp Rules | NSE/INSP/61999 |
| [reporting] | rep-stt_monthly_remittance | STT Monthly Remittance | STTRemittance | NUMBER(18,2) | on-event | derived from Y | monthly cadence; collected daily, deposited monthly per IT Act Section 104 | NSE/INSP/61999 |
| [settlement] | sett-auction_difference | Auction Difference | AuctionDiff | NUMBER(15,2) | on-event | derived from Y | collected from short-delivering member when auction rate exceeds settlement price; auction T+2 | NCL/CMPT/71441 |
| [settlement] | sett-internal_shortage_valuation | Internal Shortage Valuation | InternalShortageVal | NUMBER(15,2) | on-event | derived from Y | valuation at settlement price + 20% mark; payment due by noon on settlement day | NCL/CMPT/66779 |
| [settlement] | sett-pay_in_obligation | Pay-in Obligation | PayInObligation | NUMBER(15,2) | daily | derived from Y | client-level pay-in obligation in CC obligation file; gross pay-in to CC required for direct payout | NCL/CMPT/66779 |
| [settlement] | sett-pay_out_amount | Pay-out Amount | PayoutAmount | NUMBER(15,2) | daily | derived from Y | securities direct-credited to client demat by CC (CDSL) or earmarked (NSDL); not via broker pool | NCL/CMPT/63669 |
| [surveillance] | surv-gsm_esm_asm_flag | <abbr title="Graded Surveillance Measure">GSM</abbr>/<abbr title="Enhanced Surveillance Measure">ESM</abbr>/<abbr title="Additional Surveillance Measure">ASM</abbr> Stage Flag | SurvFlag | CHAR(4) | daily | lookup against R | drives penny-stock audit triggers; reported in surveillance file; client-level monitoring | NSE/SURV/67801 |
| [surveillance] | surv-position_limit_utilisation | Position Limit Utilisation | PositionLimitPct | NUMBER(5,2) | daily | derived from Y | client-level <abbr title="Market Wide Position Limit">MWPL</abbr> utilisation; risk-reduction-mode at 90% TM/CM level | NCL/CMPT/61801 |

## Verified through

2026-05-14

---

*AI-generated and not legal advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*

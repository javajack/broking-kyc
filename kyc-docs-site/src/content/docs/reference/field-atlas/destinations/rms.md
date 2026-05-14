---
title: "RMS (Risk Management System) — Fields consumed"
description: "Every field consumed by RMS (Risk Management System), with source section, destination format, update frequency, transformation rule, and quirks. Use this when building an integration with this destination."
---

> **Why this page is structured this way:** This is the destination-first view for RMS (Risk Management System). Engineers building an integration with this destination get the complete field list on one page. To see where each field originated in onboarding, follow the per-section links via the [atlas overview](/broking-kyc/reference/field-atlas/).

## TL;DR

- **33 unique fields** consumed by RMS (Risk Management System).
- Source spans sections: A, F, G, H, K, L, M, U, V, W, X, Y.
- **42 rows cite a public spec source**; **30** are `[industry typical]`.

## Field-destination rows

Sorted by `source_section`, then `field_id`.

| source_section | field_id | field_name | destination_field_name | destination_format | frequency | transformation | quirks_notes | spec_source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| A | A-date_of_birth | Date of Birth | client_dob | DATE YYYYMMDD | one-time | formatted | age-group derives client category for RMS exposure limits | [industry typical] |
| A | A-pan_number | PAN Number | client_pan | CHAR(10) | on-modify | uppercase | PAN is the primary client key for margin envelope keyed by UCC->PAN | [industry typical] |
| A | A-residential_status | Residential Status | resi_category | VARCHAR(3) | on-modify | [direct] | NRI flag triggers PIS-route segment block in pre-trade pipeline | [industry typical] |
| F | F-gross_annual_income_range | Gross Annual Income Range | income_tier | VARCHAR(2) | on-modify | lookup against R | income-tier feeds maximum-allowed exposure multiplier | [industry typical] |
| F | F-net_worth | Net Worth | client_net_worth | NUMBER(15,2) | on-modify | [direct] | net-worth threshold gates F&O segment limit | [industry typical] |
| G | G-account_number | Bank Account Number (Primary) | client_bank_no | VARCHAR(18) | on-modify | [direct] | primary bank for collected-margin reconciliation; UPI-Block destination | SEBI/HO/MIRSD/POD-1/P/CIR/2024/118 |
| G | G-account_number | Bank Account Number | margin_available | NUMBER(15,2) | on-trade | derived from Y | available margin = collected - utilized; recomputed each order | SEBI/HO/MRD2/DCAP/CIR/P/2020/127 |
| G | G-account_number | Bank Account Number | margin_collected_cash | NUMBER(15,2) | daily | derived from Y | cash margin collected from client funds bank; BOD reload value | SEBI/HO/MIRSD/MIRSD-PoD-1/P/CIR/2023/71 |
| G | G-account_number | Bank Account Number | cfr_funds_collected | NUMBER(15,2) | daily | derived from Y | client funds collected; T+1 holding+balance API submission (replaces weekly) | NSE/INSP/55039 |
| G | G-account_number | Bank Account Number | cfr_funds_deployed | NUMBER(15,2) | daily | derived from Y | client funds deployed against margin | NSE/INSP/55039 |
| G | G-account_number | Bank Account Number | cfr_funds_free | NUMBER(15,2) | daily | derived from Y | client funds free; CFR weekly aggregate uses daily values | NSE/INSP/55039 |
| G | G-account_number | Bank Account Number | upi_block_amount | NUMBER(15,2) | on-trade | derived from Y | ASBA-like UPI Block amount in client bank (not pool); QSB mandatory Feb 2025 | SEBI/HO/MIRSD/POD-1/P/CIR/2024/118 |
| G | G-account_number | Bank Account Number | upi_block_utilised | NUMBER(15,2) | on-trade | derived from Y | executed amount debited from block; residual auto-releases | SEBI/HO/MIRSD/POD-1/P/CIR/2024/118 |
| G | G-is_primary | Is Primary Flag | primary_bank_flg | CHAR(1) | on-modify | [direct] | only primary considered for fund-balance calculation | [industry typical] |
| H | H-account_status | Demat Status | demat_status_flag | VARCHAR(2) | on-modify | [direct] | FR/CL blocks all new buy orders in pre-trade pipeline | [industry typical] |
| H | H-bo_id | BO ID | client_bo_id | VARCHAR(16) | one-time | [direct] | primary key for pledged-collateral lookup; CSMFA/CUSPA mapping | NCL/CMPT/63669 |
| H | H-depository | Depository | depository_for_pledge | VARCHAR(4) | one-time | [direct] | drives margin-pledge file format (CDSL vs NSDL) | [industry typical] |
| K | K-is_pep | Is PEP | pep_risk_flg | CHAR(1) | on-modify | [direct] | Y forces conservative exposure limits and additional surveillance margin | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/78 |
| K | K-is_pep | Is PEP | rms_aml_risk_tier | VARCHAR(2) | daily | derived from Y | AML risk tier (Low/Med/High); High forces conservative exposure | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/78 |
| L | L-segment_commodity | Segment Commodity | seg_com_active | CHAR(1) | on-modify | [direct] | pre-trade hard-block on MCX orders if N | [industry typical] |
| L | L-segment_currency | Segment Currency | seg_cd_active | CHAR(1) | on-modify | [direct] | pre-trade hard-block on CD orders if N | [industry typical] |
| L | L-segment_equity_cash | Segment Equity Cash | seg_cm_active | CHAR(1) | on-modify | [direct] | pre-trade hard-block on CM orders if N | [industry typical] |
| L | L-segment_equity_cash | Segment Equity Cash | position_segment | VARCHAR(2) | on-trade | [direct] | segment qualifier on each position row (CM/FNO/CD/COM) | [industry typical] |
| L | L-segment_equity_cash | Segment Equity Cash | position_qty_cm | NUMBER(10) | on-trade | derived from Y | net qty per CM scrip; updated on each trade fill | [industry typical] |
| L | L-segment_equity_cash | Segment Equity Cash | position_avg_price | NUMBER(15,4) | on-trade | derived from Y | VWAP across buys for the position; reset on full square-off | [industry typical] |
| L | L-segment_equity_cash | Segment Equity Cash | position_mtm_realised | NUMBER(15,2) | on-trade | derived from Y | realised P&L; locked at trade fill | [industry typical] |
| L | L-segment_equity_cash | Segment Equity Cash | margin_blocked_delivery | NUMBER(15,2) | on-trade | derived from Y | delivery margin for physical-settled contracts in tender window | NCL/CMPT/61801 |
| L | L-segment_equity_cash | Segment Equity Cash | margin_var_cm | NUMBER(15,2) | on-trade | derived from Y | VaR margin in CM segment; upfront 20% acceptable per NSE/INSP/45534 | SEBI/HO/MRD2/DCAP/CIR/P/2020/127 |
| L | L-segment_equity_fno | Segment F&O | seg_fno_active | CHAR(1) | on-modify | [direct] | pre-trade hard-block on F&O orders if N; pre-margin lock applies | SEBI/HO/MRD2/DCAP/CIR/P/2020/127 |
| L | L-segment_equity_fno | Segment F&O | position_qty_fno | NUMBER(10) | on-trade | derived from Y | net qty per F&O contract; updated tick-by-tick | [industry typical] |
| L | L-segment_equity_fno | Segment F&O | position_mtm_unrealised | NUMBER(15,2) | on-trade | derived from Y | unrealised P&L; tick-by-tick MTM against LTP | [industry typical] |
| L | L-segment_equity_fno | Segment F&O | margin_blocked_span | NUMBER(15,2) | on-trade | derived from Y | SPAN margin per position; from BOD nsccl.YYYYMMDD.s.spn.gz | NCL/CMPT/44391 |
| L | L-segment_equity_fno | Segment F&O | margin_blocked_elm | NUMBER(15,2) | on-trade | derived from Y | ELM margin per position; from ael_DDMMYYYY.csv | NCL/CMPT/61801 |
| L | L-segment_equity_fno | Segment F&O | margin_blocked_exposure | NUMBER(15,2) | on-trade | derived from Y | exposure margin per position; combined with SPAN+ELM at pre-trade | NCL/CMPT/61801 |
| L | L-segment_equity_fno | Segment F&O | margin_blocked_additional | NUMBER(15,2) | on-trade | derived from Y | additional/surveillance margin; 5% ASM-for-spoofing if flagged | NSE/SURV/41107 |
| L | L-segment_equity_fno | Segment F&O | mwpl_breach_flag | CHAR(1) | on-trade | derived from Y | Market-Wide Position Limit breach hard-block at pre-trade | NSE/SURV/74008 |
| L | L-segment_equity_fno | Segment F&O | span_scanrange_file_loaded_flag | CHAR(1) | daily | derived from Y | BOD parameter reload status; if N pre-trade defaults to stale margin | NCL/CMPT/44391 |
| L | L-segment_equity_fno | Segment F&O | elm_ratio_loaded_flag | CHAR(1) | daily | derived from Y | BOD ELM ratio reload status from ael file | NCL/CMPT/61801 |
| L | L-segment_equity_fno | Segment F&O | ccm_obligation | NUMBER(15,2) | daily | derived from Y | Consolidated Crystallised Obligation Margin per MG-12 CnsltdCrstllsdOblgtnMrg | NCL/CMPT/56502 |
| L | L-segment_equity_fno | Segment F&O | cross_margin_benefit | NUMBER(15,2) | on-trade | derived from Y | spread-margin benefit on same/different-expiry offsetting pairs | NCL/CMPT/62978 |
| L | L-settlement_type | Settlement Type | settle_cycle | VARCHAR(2) | on-modify | [direct] | T+0 flag routes to separate settlement-session margin envelope | SEBI/HO/MRD/POD-3/P/CIR/2024/172 |
| L | L-trading_preference | Trading Preference | default_product | VARCHAR(5) | on-modify | [direct] | default product-tag for MIS/NRML decision in RMS | [industry typical] |
| L | L-trading_preference | Trading Preference | mis_squareoff_time | TIMESTAMP | on-trade | lookup against R | MIS auto square-off cut-off; equity 15:20, CDS 15:30; member RMS policy | [industry typical] |
| M | M-risk_appetite | Risk Appetite | rms_risk_tier | CHAR(1) | on-modify | [direct] | L tier may cap MTF and F&O exposure multiplier | [industry typical] |
| M | M-risk_category | Risk Category | rms_client_cat | VARCHAR(2) | on-modify | [direct] | feeds exposure-limit lookup | [industry typical] |
| M | M-risk_category | Risk Category | rms_client_risk_cat | VARCHAR(2) | on-modify | [direct] | Conservative/Moderate/Aggressive; caps for MTF and F&O | [industry typical] |
| U | U-mcx_client_category | MCX Client Category | mcx_category | VARCHAR(2) | on-modify | [direct] | Hedger gets higher position limits than Speculator | [industry typical] |
| U | U-nse_ucc_status | NSE UCC Status | nse_status | VARCHAR(2) | on-event | [direct] | non-AP blocks NSE order entry at pre-trade | [industry typical] |
| U | U-ucc_client_type | UCC Client Type | client_type | VARCHAR(2) | on-modify | [direct] | drives institutional vs retail exposure logic | [industry typical] |
| U | U-ucc_code | UCC Code | ucc | VARCHAR(10) | one-time | uppercase | primary key for per-client margin envelope; SEG file uses UCC | NCL/CMPT/55381 |
| U | U-ucc_code | UCC Code | ucc_position_key | VARCHAR(10) | on-trade | uppercase | UCC is the key for client-level position aggregation; SEG file primary key | NCL/CMPT/55381 |
| U | U-ucc_code | UCC Code | peak_margin_1130 | NUMBER(15,2) | on-trade | derived from Y | 11:30 IST snapshot; preserves margin position for DMF reconciliation | SEBI/HO/MRD2/DCAP/CIR/P/2020/127 |
| U | U-ucc_code | UCC Code | peak_margin_1230 | NUMBER(15,2) | on-trade | derived from Y | 12:30 IST snapshot; one of four daily peak captures | SEBI/HO/MRD2/DCAP/CIR/P/2020/127 |
| U | U-ucc_code | UCC Code | peak_margin_1330 | NUMBER(15,2) | on-trade | derived from Y | 13:30 IST snapshot; one of four daily peak captures | SEBI/HO/MRD2/DCAP/CIR/P/2020/127 |
| U | U-ucc_code | UCC Code | peak_margin_1430 | NUMBER(15,2) | on-trade | derived from Y | 14:30 IST snapshot; final peak of day; clearing-corp picks one at random per CC | SEBI/HO/MRD2/DCAP/CIR/P/2020/127 |
| U | U-ucc_code | UCC Code | surveillance_otr_flag | CHAR(1) | on-trade | derived from Y | OTR breach cooling-off flag; 15-min order cooling-off next day | NSE/SURV/45016 |
| U | U-ucc_code | UCC Code | surveillance_gsm_block_flag | CHAR(1) | on-trade | lookup against R | GSM-list scrip flag on the order; stage III/IV imposes 100% margin | NSE/SURV/74008 |
| U | U-ucc_code | UCC Code | surveillance_asm_margin_uplift | NUMBER(5,2) | on-trade | lookup against R | ASM stage margin uplift %; applied to scrip-level orders | NSE/SURV/74008 |
| U | U-ucc_code | UCC Code | seg_file_allocation | NUMBER(15,2) | EOD | derived from Y | SEG file (SEGCM/SEGTM) client-level allocation; SA01-SA06 reason codes on short-allocation | NCL/CMPT/55381 |
| U | U-ucc_code | UCC Code | mg12_client_margin | NUMBER(15,2) | EOD | derived from Y | MG-12 client-level margin file row; submitted to clearing corp | NCL/CMPT/45516 |
| V | V-nri_trading_route | NRI Trading Route | nri_route | VARCHAR(2) | on-modify | [direct] | PI route hard-blocks intraday/F&O orders at pre-trade | [industry typical] |
| V | V-repatriation_status | Repatriation Status | repat_flag | VARCHAR(2) | on-modify | [direct] | drives separate margin envelope (NRE vs NRO funds) | [industry typical] |
| W | W-conversion_to_major_done | Conversion Done | majority_done_flg | CHAR(1) | on-event | [direct] | N past majority freezes order entry at pre-trade | [industry typical] |
| W | W-is_minor_account | Minor Account Flag | minor_block_flg | CHAR(1) | on-modify | derived from Y | minor flag blocks F&O/intraday at pre-trade pipeline | [industry typical] |
| X | X-collateral_type_preference | Collateral Type | coll_mix | VARCHAR(2) | on-modify | [direct] | 50% cash-equivalent rule applied at margin computation | NCL/CMPT/65498 |
| X | X-collateral_type_preference | Collateral Type Preference | margin_50pct_cash_check | CHAR(1) | on-trade | derived from Y | Y/N flag; 50% cash-equivalent rule applied at order entry | NCL/CMPT/61800 |
| X | X-daily_margin_report_status | DMR Status | dmr_status | VARCHAR(2) | EOD | [direct] | NC triggers next-day pre-trade margin freeze for that client | SEBI/HO/MRD2/DCAP/CIR/P/2020/127 |
| X | X-mtf_enabled | MTF Enabled | mtf_active | CHAR(1) | on-modify | [direct] | MTF-active client routes to CSMFA pledge envelope | NCL/CMPT/63669 |
| X | X-mtf_limit_sanctioned | MTF Limit Sanctioned | mtf_cap | NUMBER(15,2) | on-modify | [direct] | hard cap on MTF exposure at order entry | [industry typical] |
| X | X-total_pledged_value | Total Pledged Value (post-haircut) | pledged_post_haircut | NUMBER(15,2) | EOD | derived from Y | post-haircut value feeds available-margin calc; recomputed at EOD parameter reload | NCL/CMPT/65498 |
| X | X-total_pledged_value | Total Pledged Value | margin_collected_collateral | NUMBER(15,2) | daily | derived from Y | post-haircut collateral value at BOD parameter reload | NCL/CMPT/65498 |
| Y | Y-account_status | Account Status | client_status | VARCHAR(2) | on-event | [direct] | IN/DO/SU/CL blocks all new orders at pre-trade | SEBI framework for automated deactivation Jul 2022 |

## Verified through

2026-05-14

---

*AI-generated and not legal advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*

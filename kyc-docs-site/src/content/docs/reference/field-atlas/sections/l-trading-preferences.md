---
title: "Section L: Trading Preferences & Segments — Data Flow"
description: "Where each field in Section L: Trading Preferences & Segments flows downstream — destinations, formats, frequencies, transformations, quirks."
---

> **Why this page is structured this way:** This is the field-first view for Section L: Trading Preferences & Segments. Each row is one field-destination relationship. To see the same data from the destination's perspective, jump from the [atlas overview](/broking-kyc/reference/field-atlas/).

## TL;DR

- **13 unique fields** in this section.
- **76 field-destination relationships** total.
- Source-of-truth field definitions: [Master Dataset](/broking-kyc/reference/master-dataset/).

## Data flow table

Sorted by `field_id`, then `destination`.

| field_id | field_name | destination | destination_field_name | destination_format | frequency | transformation | quirks_notes | spec_source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| L-exchange_bse | Exchange BSE Flag | back-office | bse_flag | CHAR(1) | on-modify | [direct] | BSE charges schedule (different transaction-charge per scrip group) | [industry typical] |
| L-exchange_bse | BSE Trading Enabled | bse-ucc | EXCH_BSE | CHAR(1) | one-time | [direct] | Triggers UCC registration on BSE | BSE/20240223-42 |
| L-exchange_bse | BSE Trading Enabled | mcx-ucc | _NA_ | none | one-time | null-if-Z | Not relevant to MCX UCC | MCX/TECH/394/2023 |
| L-exchange_bse | BSE Trading Enabled | nse-ucc | _NA_ | none | one-time | null-if-Z | Not relevant to NSE UCC | NSE/ISC/61817 |
| L-exchange_mcx | Exchange MCX Flag | back-office | mcx_flag | CHAR(1) | on-modify | [direct] | MCX commodity flag; activates MCX UCC link in BO | [industry typical] |
| L-exchange_mcx | MCX Trading Enabled | bse-ucc | _NA_ | none | one-time | null-if-Z | Not relevant to BSE UCC | BSE/20240223-42 |
| L-exchange_mcx | MCX Trading Enabled | mcx-ucc | EXCH_MCX | CHAR(1) | one-time | [direct] | Y triggers MCX UCC registration; required for commodity segment | MCX/TECH/394/2023 |
| L-exchange_mcx | MCX Trading Enabled | nse-ucc | _NA_ | none | one-time | null-if-Z | Not relevant to NSE UCC | NSE/ISC/61817 |
| L-exchange_nse | Exchange NSE Flag | back-office | nse_flag | CHAR(1) | on-modify | [direct] | routing flag for NSE-bound order; NSE charges schedule applied | [industry typical] |
| L-exchange_nse | NSE Trading Enabled | bse-ucc | _NA_ | none | one-time | null-if-Z | Not relevant to BSE UCC; informational only | BSE/20240223-42 |
| L-exchange_nse | NSE Trading Enabled | mcx-ucc | _NA_ | none | one-time | null-if-Z | Not relevant to MCX UCC | MCX/TECH/394/2023 |
| L-exchange_nse | NSE Trading Enabled | nse-ucc | EXCH_NSE | CHAR(1) | one-time | [direct] | Triggers UCC registration on NSE | NSE/ISC/61817 |
| L-segment_commodity | Segment Commodity | back-office | seg_com_flag | CHAR(1) | on-modify | [direct] | Y requires MCX registration and income proof | [industry typical] |
| L-segment_commodity | Commodity Segment | bse-ucc | BSE_COM_FLAG | CHAR(1) | one-time | [direct] | BSE commodity segment activation | BSE/20240223-42 |
| L-segment_commodity | Commodity Segment Flag | contract-notes | SegmentCode | CHAR(2) | on-trade | lookup against R | MCX contract note carries client-category code HE/SP/AR and delivery/tender-period margin if applicable | MCXCCL/RISK/184/2025 |
| L-segment_commodity | Commodity Segment | mcx-ucc | MCX_COM_FLAG | CHAR(1) | one-time | [direct] | Y activates trading on MCX; required UCC registration on MCX | MCX/TECH/394/2023 |
| L-segment_commodity | Commodity Segment | nse-ucc | NSE_COM_FLAG | CHAR(1) | one-time | [direct] | Y activates COM (commodity) segment on NSE; income proof required | NSE/ISC/61817 |
| L-segment_commodity | Segment Commodity | rms | seg_com_active | CHAR(1) | on-modify | [direct] | pre-trade hard-block on MCX orders if N | [industry typical] |
| L-segment_currency | Segment Currency Derivatives | back-office | seg_cd_flag | CHAR(1) | on-modify | [direct] | drives CD brokerage and exchange-transaction-charge schedule | [industry typical] |
| L-segment_currency | Currency Derivatives Segment | bse-ucc | BSE_CD_FLAG | CHAR(1) | one-time | [direct] | Y activates CDS on BSE | BSE/20240223-42 |
| L-segment_currency | Currency Derivatives Segment | mcx-ucc | _NA_ | none | one-time | null-if-Z | Not on MCX | MCX/TECH/394/2023 |
| L-segment_currency | Currency Derivatives Segment | nse-ucc | NSE_CD_FLAG | CHAR(1) | one-time | [direct] | Y activates Currency Derivatives on NSE | NSE/ISC/61817 |
| L-segment_currency | Segment Currency | rms | seg_cd_active | CHAR(1) | on-modify | [direct] | pre-trade hard-block on CD orders if N | [industry typical] |
| L-segment_equity_cash | Segment Equity Cash | back-office | seg_cm_flag | CHAR(1) | on-modify | [direct] | default Y; drives CM brokerage and STT computation columns | [industry typical] |
| L-segment_equity_cash | Segment Equity Cash | back-office | stt_rate_cm | NUMBER(7,4) | on-trade | lookup against R | STT rate lookup by segment+side; CM delivery 0.1% both sides, CM intraday 0.025% sell side | Finance Act / STT Act |
| L-segment_equity_cash | Segment Equity Cash | back-office | exch_txn_charge_rate | NUMBER(7,5) | on-trade | lookup against R | exchange transaction charge per segment; NSE CM 0.00297%, BSE CM 0.00375% (per scrip group) | [industry typical] |
| L-segment_equity_cash | Segment Equity Cash | back-office | sebi_turnover_fee_rate | NUMBER(7,5) | on-trade | lookup against R | SEBI turnover fee Rs 10 per crore (0.0001%) | SEBI Turnover Fee Notification |
| L-segment_equity_cash | Segment Equity Cash | back-office | brokerage_amount | NUMBER(15,2) | on-trade | derived from Y | computed from tariff sheet per segment+volume; rendered on ECN Annexure A | [industry typical] |
| L-segment_equity_cash | Segment Equity Cash | back-office | gst_on_brokerage_amount | NUMBER(15,2) | on-trade | derived from Y | 18% GST on (brokerage + exchange transaction charge + SEBI fee) | CGST/SGST Act |
| L-segment_equity_cash | Equity Cash Segment | bse-ucc | BSE_CM_FLAG | CHAR(1) | one-time | [direct] | Y activates Equity Cash on BSE | BSE/20240223-42 |
| L-segment_equity_cash | Equity Cash Segment Flag | contract-notes | SegmentCode | CHAR(2) | on-trade | lookup against R | determines which Annexure A/B template is used; segment code prints on contract note header | NSE/INSP/61999 |
| L-segment_equity_cash | Equity Cash Segment | mcx-ucc | _NA_ | none | one-time | null-if-Z | MCX does not support Equity Cash; field NULL/skipped on MCX UCC | MCX/TECH/394/2023 |
| L-segment_equity_cash | Equity Cash Segment | nse-ucc | NSE_CM_FLAG | CHAR(1) | one-time | [direct] | Y activates Cash Market (CM) segment on NSE UCC | NSE/ISC/61817 |
| L-segment_equity_cash | Segment Equity Cash | rms | seg_cm_active | CHAR(1) | on-modify | [direct] | pre-trade hard-block on CM orders if N | [industry typical] |
| L-segment_equity_cash | Segment Equity Cash | rms | position_segment | VARCHAR(2) | on-trade | [direct] | segment qualifier on each position row (CM/FNO/CD/COM) | [industry typical] |
| L-segment_equity_cash | Segment Equity Cash | rms | position_qty_cm | NUMBER(10) | on-trade | derived from Y | net qty per CM scrip; updated on each trade fill | [industry typical] |
| L-segment_equity_cash | Segment Equity Cash | rms | position_avg_price | NUMBER(15,4) | on-trade | derived from Y | VWAP across buys for the position; reset on full square-off | [industry typical] |
| L-segment_equity_cash | Segment Equity Cash | rms | position_mtm_realised | NUMBER(15,2) | on-trade | derived from Y | realised P&L; locked at trade fill | [industry typical] |
| L-segment_equity_cash | Segment Equity Cash | rms | margin_blocked_delivery | NUMBER(15,2) | on-trade | derived from Y | delivery margin for physical-settled contracts in tender window | NCL/CMPT/61801 |
| L-segment_equity_cash | Segment Equity Cash | rms | margin_var_cm | NUMBER(15,2) | on-trade | derived from Y | VaR margin in CM segment; upfront 20% acceptable per NSE/INSP/45534 | SEBI/HO/MRD2/DCAP/CIR/P/2020/127 |
| L-segment_equity_fno | Segment F&O | back-office | seg_fno_flag | CHAR(1) | on-modify | [direct] | Y requires income proof; drives F&O brokerage and STT (sell side STT 0.0125% premium) | [industry typical] |
| L-segment_equity_fno | Segment F&O | back-office | stt_rate_fno | NUMBER(7,4) | on-trade | lookup against R | STT for F&O: futures sell 0.02%, options sell 0.1% premium (revised Oct 2024) | Finance Act 2024 |
| L-segment_equity_fno | Equity F&O Segment | bse-ucc | BSE_FNO_FLAG | CHAR(1) | one-time | [direct] | Y activates F&O on BSE; income-proof tagged | BSE/20240223-42 |
| L-segment_equity_fno | Equity F&O Segment Flag | contract-notes | SegmentCode | CHAR(2) | on-trade | lookup against R | F&O contract note includes RDD-FNO acknowledgement reference + premium/notional disclosure | NSE/INSP/61999 |
| L-segment_equity_fno | Equity F&O Segment | mcx-ucc | _NA_ | none | one-time | null-if-Z | Not applicable to MCX (commodity-only exchange) | MCX/TECH/394/2023 |
| L-segment_equity_fno | Equity F&O Segment | nse-ucc | NSE_FNO_FLAG | CHAR(1) | one-time | [direct] | Y activates F&O on NSE; requires income proof at UCC level | NSE/ISC/61817 |
| L-segment_equity_fno | Segment F&O | rms | seg_fno_active | CHAR(1) | on-modify | [direct] | pre-trade hard-block on F&O orders if N; pre-margin lock applies | SEBI/HO/MRD2/DCAP/CIR/P/2020/127 |
| L-segment_equity_fno | Segment F&O | rms | position_qty_fno | NUMBER(10) | on-trade | derived from Y | net qty per F&O contract; updated tick-by-tick | [industry typical] |
| L-segment_equity_fno | Segment F&O | rms | position_mtm_unrealised | NUMBER(15,2) | on-trade | derived from Y | unrealised P&L; tick-by-tick MTM against LTP | [industry typical] |
| L-segment_equity_fno | Segment F&O | rms | margin_blocked_span | NUMBER(15,2) | on-trade | derived from Y | SPAN margin per position; from BOD nsccl.YYYYMMDD.s.spn.gz | NCL/CMPT/44391 |
| L-segment_equity_fno | Segment F&O | rms | margin_blocked_elm | NUMBER(15,2) | on-trade | derived from Y | ELM margin per position; from ael_DDMMYYYY.csv | NCL/CMPT/61801 |
| L-segment_equity_fno | Segment F&O | rms | margin_blocked_exposure | NUMBER(15,2) | on-trade | derived from Y | exposure margin per position; combined with SPAN+ELM at pre-trade | NCL/CMPT/61801 |
| L-segment_equity_fno | Segment F&O | rms | margin_blocked_additional | NUMBER(15,2) | on-trade | derived from Y | additional/surveillance margin; 5% ASM-for-spoofing if flagged | NSE/SURV/41107 |
| L-segment_equity_fno | Segment F&O | rms | mwpl_breach_flag | CHAR(1) | on-trade | derived from Y | Market-Wide Position Limit breach hard-block at pre-trade | NSE/SURV/74008 |
| L-segment_equity_fno | Segment F&O | rms | span_scanrange_file_loaded_flag | CHAR(1) | daily | derived from Y | BOD parameter reload status; if N pre-trade defaults to stale margin | NCL/CMPT/44391 |
| L-segment_equity_fno | Segment F&O | rms | elm_ratio_loaded_flag | CHAR(1) | daily | derived from Y | BOD ELM ratio reload status from ael file | NCL/CMPT/61801 |
| L-segment_equity_fno | Segment F&O | rms | ccm_obligation | NUMBER(15,2) | daily | derived from Y | Consolidated Crystallised Obligation Margin per MG-12 CnsltdCrstllsdOblgtnMrg | NCL/CMPT/56502 |
| L-segment_equity_fno | Segment F&O | rms | cross_margin_benefit | NUMBER(15,2) | on-trade | derived from Y | spread-margin benefit on same/different-expiry offsetting pairs | NCL/CMPT/62978 |
| L-settlement_type | Settlement Type | back-office | settle_type | VARCHAR(2) | on-modify | [direct] | T+1 default; T+0 opt-in tracked in BO for differential brokerage | SEBI/HO/MRD/POD-3/P/CIR/2024/172 |
| L-settlement_type | Settlement Type | contract-notes | SettlementCycle | CHAR(2) | on-trade | lookup against R | T+0 / T+1 marker on ECN; differential-brokerage disclosure required if T+0 | SEBI/HO/MRD/POD-3/P/CIR/2024/172 |
| L-settlement_type | Settlement Type | rms | settle_cycle | VARCHAR(2) | on-modify | [direct] | T+0 flag routes to separate settlement-session margin envelope | SEBI/HO/MRD/POD-3/P/CIR/2024/172 |
| L-trading_experience_commodity_years | Trading Experience COM (Years) | back-office | tr_exp_com | NUMBER(2) | on-modify | [direct] | conditional; COM activation log | [industry typical] |
| L-trading_experience_commodity_years | Commodity Trading Experience (Years) | bse-ucc | COM_EXP_YRS | NUMBER(2) | one-time | [direct] | Required if BSE-COM opted | BSE/20240223-42 |
| L-trading_experience_commodity_years | Commodity Trading Experience (Years) | mcx-ucc | COM_EXP_YRS | NUMBER(2) | one-time | [direct] | Mandatory; commodity experience years drives risk profile | MCX/TECH/394/2023 |
| L-trading_experience_commodity_years | Commodity Trading Experience (Years) | nse-ucc | COM_EXP_YRS | NUMBER(2) | one-time | [direct] | Required if NSE-COM opted; 0-50 | NSE/ISC/61817 |
| L-trading_experience_equity_years | Trading Experience Equity (Years) | back-office | tr_exp_eq | NUMBER(2) | on-modify | [direct] | client suitability disclosure; retained for audit | [industry typical] |
| L-trading_experience_fno_years | Trading Experience F&O (Years) | back-office | tr_exp_fno | NUMBER(2) | on-modify | [direct] | conditional; F&O risk-acknowledgement record | [industry typical] |
| L-trading_experience_fno_years | F&O Trading Experience (Years) | bse-ucc | FNO_EXP_YRS | NUMBER(2) | one-time | [direct] | Required if F&O segment opted | BSE/20240223-42 |
| L-trading_experience_fno_years | F&O Trading Experience (Years) | mcx-ucc | _NA_ | none | one-time | null-if-Z | Not applicable to MCX | MCX/TECH/394/2023 |
| L-trading_experience_fno_years | F&O Trading Experience (Years) | nse-ucc | FNO_EXP_YRS | NUMBER(2) | one-time | [direct] | Required if F&O segment opted; 0-50 | NSE/ISC/61817 |
| L-trading_preference | Trading Preference | back-office | trade_pref | VARCHAR(5) | on-modify | [direct] | Delivery/Intraday/Both; drives default product-tag in OMS | [industry typical] |
| L-trading_preference | Trading Preference | rms | default_product | VARCHAR(5) | on-modify | [direct] | default product-tag for MIS/NRML decision in RMS | [industry typical] |
| L-trading_preference | Trading Preference | rms | mis_squareoff_time | TIMESTAMP | on-trade | lookup against R | MIS auto square-off cut-off; equity 15:20, CDS 15:30; member RMS policy | [industry typical] |
| L-upi_block_opted | UPI-Block Facility Opt-in | bse-ucc | UPI_FLAG | CHAR(1) | on-modify | [direct] | 'Opt for UPI' field in revised batch UCC; only validated PAN/bank/demat by 4 PM eligible | BSE/20231018-39 |
| L-upi_block_opted | UPI-Block Facility Opt-in | mcx-ucc | _NA_ | none | on-modify | null-if-Z | Not applicable to MCX (commodity segment) | MCX/TECH/394/2023 |
| L-upi_block_opted | UPI-Block Facility Opt-in | nse-ucc | UPI_BLOCK_FLAG | CHAR(1) | on-modify | [direct] | ASBA-like Trading Supported by Blocked Amount; deregistration T-day effective T-day | NCL/CMPT/63735 |

## Verified through

2026-05-14

---

*AI-generated and not legal advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*

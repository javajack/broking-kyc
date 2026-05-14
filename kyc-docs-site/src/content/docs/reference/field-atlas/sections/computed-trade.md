---
title: "Computed / Derived — trade — Data Flow"
description: "Where each field in Computed / Derived — trade flows downstream — destinations, formats, frequencies, transformations, quirks."
---

> **Why this page is structured this way:** This is the field-first view for the computed/derived `[trade]` pseudo-section. These fields don't exist at <abbr title="Know Your Customer (process).">KYC</abbr> onboarding time; they're produced by operations (trade execution, margin computation, settlement files, etc.). To see the same data from the destination's perspective, jump from the [atlas overview](/broking-kyc/reference/field-atlas/).

## TL;DR

- **27 unique fields** in this section.
- **27 field-destination relationships** total.

## Data flow table

Sorted by `field_id`, then `destination`.

| field_id | field_name | destination | destination_field_name | destination_format | frequency | transformation | quirks_notes | spec_source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| trade-brokerage | Brokerage Amount | contract-notes | Brokerage | NUMBER(15,2) | on-trade | derived from Y | computed from tariff-sheet brokerage slab; differential rate permitted for <abbr title="Trade-date Plus N settlement">T+0</abbr>; capped at 2.5% per <abbr title="Securities and Exchange Board of India">SEBI</abbr> Stock Broker Regs | <abbr title="National Stock Exchange of India">NSE</abbr>/INSP/61999 |
| trade-buy_sell_flag | Buy/Sell Flag | contract-notes | BuySell | CHAR(1) | on-trade | [direct] | B=Buy / S=Sell; drives sign of charges and STT applicability | NSE/INSP/61999 |
| trade-contract_number | Contract Note Number | contract-notes | ContractNoteNo | VARCHAR(30) | on-trade | formatted | broker-assigned unique sequential per-client per-day per-segment; format <PREFIX>/<DDMMYYYY>/<SEQ> | NSE/INSP/61999 |
| trade-exchange_code | Exchange Code | contract-notes | Exchange | CHAR(4) | on-trade | lookup against R | NSE/<abbr title="BSE Limited (formerly Bombay Stock Exchange)">BSE</abbr>/<abbr title="Multi Commodity Exchange of India">MCX</abbr>; routes per-exchange charges table lookup | NSE/INSP/61999 |
| trade-exchange_turnover_charge | Exchange Turnover Charge | contract-notes | ExchTurnoverCharge | NUMBER(15,2) | on-trade | derived from Y | per-exchange rate card; appears as separate line item on revised <abbr title="Electronic Contract Note.">ECN</abbr> | NSE/INSP/61999 |
| trade-expiry_date | F&O Expiry Date | contract-notes | ExpiryDate | DATE YYYYMMDD | on-trade | formatted | F&O only; appears with symbol/strike on contract line | NSE/INSP/61999 |
| trade-gst_cgst | CGST on Brokerage | contract-notes | CGST | NUMBER(15,2) | on-trade | derived from Y | 9% on intra-state supplies; computed on brokerage + exchange charges + SEBI fee | NSE/INSP/61999 |
| trade-gst_igst | IGST on Brokerage | contract-notes | IGST | NUMBER(15,2) | on-trade | derived from Y | 18% on inter-state supplies; CGST/SGST or IGST mutually exclusive based on place-of-supply | NSE/INSP/61999 |
| trade-gst_sgst | SGST on Brokerage | contract-notes | SGST | NUMBER(15,2) | on-trade | derived from Y | 9% on intra-state supplies; same base as CGST | NSE/INSP/61999 |
| trade-ipft | Investor Protection Fund Charge | contract-notes | IPFT | NUMBER(15,2) | on-trade | derived from Y | nominal per-crore charge to <abbr title="Investor Protection Fund">IPF</abbr>; appears on revised ECN as separate line | NSE/INSP/61999 |
| trade-isin | ISIN | contract-notes | ISIN | CHAR(12) | on-trade | [direct] | prints in delivery-trade line item; required for direct-payout obligation reconciliation | <abbr title="NSE Clearing Limited (formerly National Securities Clearing Corporation Limited)">NCL</abbr>/CMPT/63669 |
| trade-lot_size | F&O Lot Size | contract-notes | LotSize | NUMBER(10,0) | on-trade | [direct] | F&O contract multiplier; exchange-published | NSE/INSP/61999 |
| trade-mtm_value | F&O Mark-to-Market | contract-notes | <abbr title="Mark-to-Market">MTM</abbr> | NUMBER(15,2) | on-trade | derived from Y | F&O ECN reflects MTM and option-premium-paid/received per Annexure A/B | NSE/INSP/61999 |
| trade-net_consideration | Net Consideration | contract-notes | NetAmount | NUMBER(18,2) | on-trade | derived from Y | gross trade value +/- all charges (brokerage, STT, GST, exch, SEBI, stamp, IPFT); rounded to paise | NSE/INSP/61999 |
| trade-option_type | Option Type | contract-notes | OptionType | CHAR(2) | on-trade | [direct] | CE=Call European / PE=Put European; F&O only | NSE/INSP/61999 |
| trade-order_number | Order Number | contract-notes | OrderID | VARCHAR(30) | on-trade | [direct] | exchange-issued order ref; printed on each trade line item | NSE/INSP/61999 |
| trade-quantity | Trade Quantity | contract-notes | Quantity | NUMBER(15,0) | on-trade | [direct] | cumulative per ISIN/symbol per side; F&O lot-size applied | NSE/INSP/61999 |
| trade-sebi_turnover_fee | SEBI Turnover Fee | contract-notes | SEBIFee | NUMBER(15,2) | on-trade | derived from Y | fee rate per SEBI Stock Brokers Regulations Schedule <abbr title="—">III</abbr>; brokers pay half-yearly to SEBI | SEBI/<abbr title="Head Office (SEBI circular ID prefix)">HO</abbr>/<abbr title="Markets Intermediaries Regulation and Supervision Department (SEBI)">MIRSD</abbr>/POD-1/P/CIR/2025/94 |
| trade-settlement_number | Settlement Number | contract-notes | SettlementNo | VARCHAR(20) | on-trade | [direct] | seven-digit exchange settlement identifier; 2425828 = first direct-payout settlement Feb-2025 | NCL/CMPT/66779 |
| trade-stamp_duty | Stamp Duty | contract-notes | StampDuty | NUMBER(15,2) | on-trade | derived from Y | state-wise rate per Indian Stamp Act 1899 (Jul-2020 amended); centralised collection by <abbr title="Clearing Corporation (NCL, ICCL, MCXCCL — context-dependent).">CC</abbr> on behalf of states | NSE/INSP/61999 |
| trade-strike_price | Option Strike Price | contract-notes | StrikePrice | NUMBER(15,4) | on-trade | [direct] | options only; required field on F&O ECN | NSE/INSP/61999 |
| trade-stt | Securities Transaction Tax | contract-notes | STT | NUMBER(15,2) | on-trade | derived from Y | computed by CC and reflected in revised CN format; rates per Finance Act; remitted monthly to govt | NSE/INSP/61999 |
| trade-symbol | Trading Symbol | contract-notes | Symbol | VARCHAR(20) | on-trade | [direct] | NSE/BSE symbol or contract descriptor; expiry/strike for derivatives appended | NSE/INSP/61999 |
| trade-trade_number | Trade Number | contract-notes | TradeID | VARCHAR(30) | on-trade | [direct] | exchange-issued trade ref; unique per leg | NSE/INSP/61999 |
| trade-trade_price | Trade Price | contract-notes | TradePrice | NUMBER(15,4) | on-trade | [direct] | price at which trade executed; weighted-avg if multiple fills aggregated | NSE/INSP/61999 |
| trade-trade_time | Trade Execution Time | contract-notes | TradeTime | TIMESTAMP HHMMSS | on-trade | [direct] | HHMMSS in <abbr title="Indian Standard Time (UTC+05:30)">IST</abbr>; for off-market and block trades use special trade-time annotation | NSE/INSP/61999 |
| trade-trade_value | Trade Value | contract-notes | GrossValue | NUMBER(18,2) | on-trade | derived from Y | quantity * price; sign reflects buy/sell | NSE/INSP/61999 |

## Verified through

2026-05-14

---

*AI-generated and not legal advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*

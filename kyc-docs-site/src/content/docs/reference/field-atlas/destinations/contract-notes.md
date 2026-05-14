---
title: "Contract Notes / ECN — Fields consumed"
description: "Every field consumed by Contract Notes / ECN, with source section, destination format, update frequency, transformation rule, and quirks. Use this when building an integration with this destination."
---

> **Why this page is structured this way:** This is the destination-first view for Contract Notes / <abbr title="Electronic Contract Note.">ECN</abbr>. Engineers building an integration with this destination get the complete field list on one page. To see where each field originated in onboarding, follow the per-section links via the [atlas overview](/broking-kyc/reference/field-atlas/).

## TL;DR

- **80 unique fields** consumed by Contract Notes / ECN.
- Source spans sections: A, B, C, G, H, L, O, P, U, V, W, X, AB, AC, [trade], [ecn-tax], [ecn-meta].
- **74 rows cite a public spec source**; **7** are `[industry typical]`.

## Field-destination rows

Sorted by `source_section`, then `field_id`.

| source_section | field_id | field_name | destination_field_name | destination_format | frequency | transformation | quirks_notes | spec_source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| A | A-date_of_birth | Date of Birth | none | none | on-trade | [direct] | not on ECN body; printed only on summary statements; retained in archive for <abbr title="Suspicious Transaction Report">STR</abbr> cross-ref | [industry typical] |
| A | A-full_name | Client Full Name | ClientName | VARCHAR(200) | on-trade | [direct] | prints on ECN exactly as in client master; mismatch with <abbr title="Permanent Account Number">PAN</abbr>-<abbr title="Information Technology Department (within SEBI)">ITD</abbr> triggers <abbr title="SEBI Complaints Redress System">SCORES</abbr> exposure | <abbr title="National Stock Exchange of India">NSE</abbr>/INSP/61999 |
| A | A-pan_number | PAN Number | ClientPAN | CHAR(10) | on-trade | uppercase | printed verbatim on ECN; 4th char identifies entity type; mandatory header field per revised Annexure A/B | NSE/INSP/61999 |
| A | A-pan_number | PAN Number for Tax Invoice | GSTIN_Customer | VARCHAR(15) | on-trade | derived from Y | GSTIN derived from PAN + state-code for B2B customers (15 char); blank for B2C | NSE/INSP/61999 |
| AB | AB-pref_contract_note_mode | Contract Note Delivery Mode | DeliveryMode | CHAR(2) | on-trade | [direct] | EM=Email mandatory; PH=Physical+Email; <abbr title="Short Message Service.">SMS</abbr>/IM channel permitted as supplement | NSE/INSP/52604 |
| AB | AB-pref_email_notifications | Email Notification Preference | none | none | on-trade | [direct] | cannot be N per <abbr title="Securities and Exchange Board of India">SEBI</abbr> mandate; primary ECN channel | NSE/INSP/61999 |
| AC | AC-ras_settlement_frequency | Running Account Settlement Frequency | RAFrequency | CHAR(2) | on-trade | [direct] | MN=Monthly / QR=Quarterly; printed in ECN footer block; aligned to exchange-stipulated Friday/Saturday dates | SEBI/<abbr title="Head Office (SEBI circular ID prefix)">HO</abbr>/<abbr title="Markets Intermediaries Regulation and Supervision Department (SEBI)">MIRSD</abbr>/MIRSD-PoD1/P/CIR/2023/197 |
| B | B-corr_address_line1 | Correspondence Address Line 1 | ClientAddress | VARCHAR(100) | on-trade | concat with X | concatenated with line2 + line3 + city + state + pincode for ECN client-address block | NSE/INSP/61999 |
| B | B-corr_pincode | Correspondence Pincode | ClientPincode | CHAR(6) | on-trade | [direct] | six-digit numeric; used with state for GST place-of-supply determination | [industry typical] |
| B | B-corr_state | Correspondence State | StateForStampDuty | CHAR(2) | on-trade | lookup against R | drives state-code for stamp-duty levy on the contract; <abbr title="Clearing Corporation (NCL, ICCL, MCXCCL — context-dependent).">CC</abbr> withholds settlement on mismatch | NSE/INSP/61999 |
| C | C-email | Email Address | ClientEmail | VARCHAR(100) | on-trade | lowercase | primary ECN delivery channel; T+24h dispatch SLA; bounce-back retried on alt-email | NSE/INSP/61999 |
| C | C-mobile_number | Mobile Number | ClientMobile | VARCHAR(15) | on-trade | [direct] | ECN dispatch via SMS/IM channel permitted in addition to email; DLT-template compliance required | NSE/INSP/52604 |
| G | G-account_number | Primary Bank Account Number | none | none | on-trade | [direct] | appears on running-account settlement statement, not on per-trade ECN body | [industry typical] |
| H | H-bo_id | Beneficiary Owner ID | ClientBOID | VARCHAR(16) | on-trade | [direct] | <abbr title="Central Depository Services (India) Limited">CDSL</abbr>: 16-digit numeric; <abbr title="National Securities Depository Limited">NSDL</abbr>: IN-prefixed 14-alphanumeric; printed on ECN for delivery trades | NSE/INSP/61999 |
| L | L-segment_commodity | Commodity Segment Flag | SegmentCode | CHAR(2) | on-trade | lookup against R | <abbr title="Multi Commodity Exchange of India">MCX</abbr> contract note carries client-category code HE/SP/AR and delivery/tender-period margin if applicable | <abbr title="Multi Commodity Exchange Clearing Corporation Limited">MCXCCL</abbr>/RISK/184/2025 |
| L | L-segment_equity_cash | Equity Cash Segment Flag | SegmentCode | CHAR(2) | on-trade | lookup against R | determines which Annexure A/B template is used; segment code prints on contract note header | NSE/INSP/61999 |
| L | L-segment_equity_fno | Equity F&O Segment Flag | SegmentCode | CHAR(2) | on-trade | lookup against R | F&O contract note includes RDD-FNO acknowledgement reference + premium/notional disclosure | NSE/INSP/61999 |
| L | L-settlement_type | Settlement Type | SettlementCycle | CHAR(2) | on-trade | lookup against R | <abbr title="Trade-date Plus N settlement">T+0</abbr> / <abbr title="Trade-date Plus N settlement">T+1</abbr> marker on ECN; differential-brokerage disclosure required if T+0 | SEBI/HO/<abbr title="Market Regulation Department (SEBI)">MRD</abbr>/POD-3/P/CIR/2024/172 |
| O | O-ddpi_opted | <abbr title="Demat Debit and Pledge Instruction">DDPI</abbr> Opted Flag | DDPIRef | CHAR(1) | on-trade | [direct] | DDPI status indicator on ECN; if N, client must authorise each debit via depository TPIN | SEBI/HO/MIRSD/DoP/P/CIR/2022/44 |
| P | P-esign_certificate_serial | E-Sign Certificate Serial | BrokerDSCSerial | VARCHAR(50) | on-trade | [direct] | <abbr title="Digital Signature Certificate (CCA-licensed; aka Class 2/3 DSC).">DSC</abbr> class-3 serial of broker's authorised signatory; embedded in PDF signature dictionary | NSE/INSP/61999 |
| P | P-esign_document_hash | Signed Document Hash | ECNDocHash | CHAR(64) | on-trade | [direct] | SHA-256 hash of ECN PDF body included in DSC signature; preserved-channel proof requires hash retention | NSE/INSP/52604 |
| P | P-esign_mode | E-Sign Mode | SignerMode | CHAR(2) | on-trade | [direct] | AO=Aadhaar <abbr title="One-Time Password">OTP</abbr> / BI=Biometric / WS=Wet; relates to onboarding e-sign not per-trade DSC | [industry typical] |
| P | P-esign_signed_document_url | Signed Document URL | ECNArchiveURL | VARCHAR(500) | on-trade | [direct] | secure archive URL with 5+ year retention; tamper-proof object store | NSE/INSP/61999 |
| P | P-esign_timestamp | E-Sign Timestamp | DSCSignTimestamp | TIMESTAMP ISO 8601 | on-trade | formatted | RFC3161 timestamp from TSA; ECN dispatch SLA 24h from trade execution | NSE/INSP/61999 |
| P | P-rdd_commodity_acknowledged | Commodity Risk Disclosure Acknowledgement | RDDCOMRef | VARCHAR(50) | on-trade | [direct] | reference number/timestamp prints on commodity ECN; mandatory if L04=Y | MCXCCL/RISK/184/2025 |
| P | P-rdd_fno_acknowledged | F&O Risk Disclosure Acknowledgement | RDDFNORef | VARCHAR(50) | on-trade | [direct] | reference number/timestamp of F&O RDD prints on F&O ECN; mandatory if L02=Y | NSE/INSP/61999 |
| P | P-running_account_authorization | Running Account Authorization | RAAuthFlag | CHAR(1) | on-trade | [direct] | signed running-account authorization is precondition for retaining client funds beyond settlement date | SEBI/HO/MIRSD/MIRSD-PoD1/P/CIR/2023/197 |
| P | P-tariff_sheet_acknowledged | Tariff Sheet Acknowledgement | none | none | on-trade | [direct] | brokerage rate-card reference; drives derived brokerage on each trade; mismatch attracts SCORES | NSE/INSP/61999 |
| U | U-mcx_client_category | MCX Client Category | ClientCategory | CHAR(2) | on-trade | [direct] | HE=Hedger / SP=Speculator / AR=Arbitrageur; appears on MCX commodity contract notes | MCXCCL/RISK/184/2025 |
| U | U-nse_ucc_status | NSE <abbr title="Unique Client Code">UCC</abbr> Status | none | none | on-trade | null-if-Z | trade rejected upstream if UCC not <abbr title="Authorized Person">AP</abbr>=Approved; not printed on ECN | NSE/<abbr title="Investor Service Centre.">ISC</abbr>/61817 |
| U | U-ucc_code | Unique Client Code | UCC | VARCHAR(10) | on-trade | uppercase | exchange-issued client identifier; mandatory on ECN line item per exchange | NSE/ISC/61817 |
| V | V-pis_account_number | <abbr title="Portfolio Investment Scheme (RBI / NRI)">PIS</abbr> Bank Account Number | none | none | on-trade | [direct] | <abbr title="Non-Resident Indian">NRI</abbr> ECN routes settlements to PIS bank account; reflected in running-account ledger not on per-trade ECN | [industry typical] |
| W | W-holding_type | Holding Type | HoldingPattern | CHAR(2) | on-trade | [direct] | SI/J2/J3 prints on ECN header; joint ECN routed to all holders | [industry typical] |
| W | W-is_minor_account | Minor Account Flag | MinorFlag | CHAR(1) | on-trade | [direct] | minor restricted to delivery only; F&O/intraday trades rejected upstream | [industry typical] |
| X | X-mtf_enabled | <abbr title="Margin Trading Facility">MTF</abbr> Enabled Flag | MTFFlag | CHAR(1) | on-trade | [direct] | MTF line-item handling per revised Annexure A/B; CSMFA pledge reference printed | NSE/INSP/61999 |
| [ecn-meta] | ecn-algo_id | Algo ID | AlgoID | VARCHAR(20) | on-trade | [direct] | tagged for algo-originated retail orders; mandatory per Feb-2025 SEBI retail-algo framework | SEBI/HO/MIRSD/MIRSD-PoD/P/CIR/2025/0000013 |
| [ecn-meta] | ecn-broker_address | Broker Registered Address | BrokerAddress | VARCHAR(500) | on-trade | [direct] | registered office address printed in ECN header | NSE/INSP/61999 |
| [ecn-meta] | ecn-broker_authorised_signatory | Broker Authorised Signatory | AuthorisedSigner | VARCHAR(100) | on-trade | [direct] | name and designation of broker DSC signer; printed alongside DSC | NSE/INSP/61999 |
| [ecn-meta] | ecn-broker_compliance_officer_contact | Compliance Officer Contact | ComplianceContact | VARCHAR(200) | on-trade | [direct] | name + phone + email of CO printed in ECN footer per revised format | NSE/INSP/61999 |
| [ecn-meta] | ecn-broker_exchange_registration | Broker Exchange Membership Number | ExchMemberNo | VARCHAR(20) | on-trade | uppercase | exchange-specific membership ID; NSE / <abbr title="BSE Limited (formerly Bombay Stock Exchange)">BSE</abbr> / MCX as applicable | NSE/INSP/61999 |
| [ecn-meta] | ecn-broker_gstin | Broker GSTIN | BrokerGSTIN | CHAR(15) | on-trade | uppercase | state-specific GSTIN; multiple GSTINs if broker registered in multiple states | NSE/INSP/61999 |
| [ecn-meta] | ecn-broker_sebi_registration | Broker SEBI Registration Number | SEBIReg | VARCHAR(20) | on-trade | uppercase | broker SEBI registration number prints in ECN header block | NSE/INSP/61999 |
| [ecn-meta] | ecn-clearing_member_id | Clearing Member ID | CMID | VARCHAR(20) | on-trade | [direct] | <abbr title="Clearing Member">CM</abbr> ID used for settlement; printed on ECN for client visibility per revised format | NSE/INSP/61999 |
| [ecn-meta] | ecn-ecn_archive_path | ECN Archive Path | ArchivePath | VARCHAR(500) | on-trade | formatted | 5+ year retention; SHA-256 integrity hash retained alongside; SEBI Stock Broker Regs 8-yr record-retention | SEBI/HO/MIRSD/POD-1/P/CIR/2025/94 |
| [ecn-meta] | ecn-ecn_delivery_channel | ECN Delivery Channel | DeliveryChannel | CHAR(4) | on-trade | [direct] | EMAIL / SMS / IM; multiple channels permitted per NSE/INSP/52604; DLT-template required for SMS/IM | NSE/INSP/52604 |
| [ecn-meta] | ecn-ecn_dispatch_timestamp | ECN Dispatch Timestamp | DispatchTimestamp | TIMESTAMP ISO 8601 | on-trade | formatted | T+24h SLA from trade execution; preserved-channel log retains delivery proof | NSE/INSP/61999 |
| [ecn-meta] | ecn-ecn_format_template | ECN Template Code | TemplateCode | CHAR(2) | on-trade | [direct] | <abbr title="Account Aggregator (RBI-licensed NBFC-AA)">AA</abbr>=Annexure A (CN-cum-Tax-Invoice) / AB=Annexure B (CN + separate tax invoice) | NSE/INSP/61999 |
| [ecn-meta] | ecn-static_ip | Static IP for Algo Orders | none | none | on-trade | [direct] | whitelisted static IP retained in <abbr title="Order Management System">OMS</abbr> audit log; not printed on ECN but cross-referenced | SEBI/HO/MIRSD/MIRSD-PoD/P/CIR/2025/0000013 |
| [ecn-meta] | ecn-trading_terminal_id | Trading Terminal ID | TerminalID | VARCHAR(20) | on-trade | [direct] | terminal from which order originated; required for algo trade trace per Feb-2025 SEBI circular | SEBI/HO/MIRSD/MIRSD-PoD/P/CIR/2025/0000013 |
| [ecn-tax] | tax-stt_buy_intraday | STT Buy Intraday | STT_Buy_Intra | NUMBER(15,2) | on-trade | derived from Y | 0.025% on sell-side intraday delivery / 0.1% on delivery; rate per Finance Act, computed by CC | NSE/INSP/61999 |
| [ecn-tax] | tax-stt_ctt | Commodity Transaction Tax | CTT | NUMBER(15,2) | on-trade | derived from Y | MCX non-agri commodities sell-side; rate per Finance Act | NSE/INSP/61999 |
| [ecn-tax] | tax-stt_delivery | STT Delivery | STT_Delivery | NUMBER(15,2) | on-trade | derived from Y | both buy and sell side delivery; rate per Finance Act | NSE/INSP/61999 |
| [ecn-tax] | tax-stt_fno_futures | STT F&O Futures | STT_Futures | NUMBER(15,2) | on-trade | derived from Y | sell-side futures STT; rate per Finance Act | NSE/INSP/61999 |
| [ecn-tax] | tax-stt_fno_options | STT F&O Options | STT_Options | NUMBER(15,2) | on-trade | derived from Y | sell-side options STT on premium; exercise STT on intrinsic value; rate per Finance Act | NSE/INSP/61999 |
| [trade] | trade-brokerage | Brokerage Amount | Brokerage | NUMBER(15,2) | on-trade | derived from Y | computed from tariff-sheet brokerage slab; differential rate permitted for T+0; capped at 2.5% per SEBI Stock Broker Regs | NSE/INSP/61999 |
| [trade] | trade-buy_sell_flag | Buy/Sell Flag | BuySell | CHAR(1) | on-trade | [direct] | B=Buy / S=Sell; drives sign of charges and STT applicability | NSE/INSP/61999 |
| [trade] | trade-contract_number | Contract Note Number | ContractNoteNo | VARCHAR(30) | on-trade | formatted | broker-assigned unique sequential per-client per-day per-segment; format <PREFIX>/<DDMMYYYY>/<SEQ> | NSE/INSP/61999 |
| [trade] | trade-exchange_code | Exchange Code | Exchange | CHAR(4) | on-trade | lookup against R | NSE/BSE/MCX; routes per-exchange charges table lookup | NSE/INSP/61999 |
| [trade] | trade-exchange_turnover_charge | Exchange Turnover Charge | ExchTurnoverCharge | NUMBER(15,2) | on-trade | derived from Y | per-exchange rate card; appears as separate line item on revised ECN | NSE/INSP/61999 |
| [trade] | trade-expiry_date | F&O Expiry Date | ExpiryDate | DATE YYYYMMDD | on-trade | formatted | F&O only; appears with symbol/strike on contract line | NSE/INSP/61999 |
| [trade] | trade-gst_cgst | CGST on Brokerage | CGST | NUMBER(15,2) | on-trade | derived from Y | 9% on intra-state supplies; computed on brokerage + exchange charges + SEBI fee | NSE/INSP/61999 |
| [trade] | trade-gst_igst | IGST on Brokerage | IGST | NUMBER(15,2) | on-trade | derived from Y | 18% on inter-state supplies; CGST/SGST or IGST mutually exclusive based on place-of-supply | NSE/INSP/61999 |
| [trade] | trade-gst_sgst | SGST on Brokerage | SGST | NUMBER(15,2) | on-trade | derived from Y | 9% on intra-state supplies; same base as CGST | NSE/INSP/61999 |
| [trade] | trade-ipft | Investor Protection Fund Charge | IPFT | NUMBER(15,2) | on-trade | derived from Y | nominal per-crore charge to <abbr title="Investor Protection Fund">IPF</abbr>; appears on revised ECN as separate line | NSE/INSP/61999 |
| [trade] | trade-isin | ISIN | ISIN | CHAR(12) | on-trade | [direct] | prints in delivery-trade line item; required for direct-payout obligation reconciliation | <abbr title="NSE Clearing Limited (formerly National Securities Clearing Corporation Limited)">NCL</abbr>/CMPT/63669 |
| [trade] | trade-lot_size | F&O Lot Size | LotSize | NUMBER(10,0) | on-trade | [direct] | F&O contract multiplier; exchange-published | NSE/INSP/61999 |
| [trade] | trade-mtm_value | F&O Mark-to-Market | <abbr title="Mark-to-Market">MTM</abbr> | NUMBER(15,2) | on-trade | derived from Y | F&O ECN reflects MTM and option-premium-paid/received per Annexure A/B | NSE/INSP/61999 |
| [trade] | trade-net_consideration | Net Consideration | NetAmount | NUMBER(18,2) | on-trade | derived from Y | gross trade value +/- all charges (brokerage, STT, GST, exch, SEBI, stamp, IPFT); rounded to paise | NSE/INSP/61999 |
| [trade] | trade-option_type | Option Type | OptionType | CHAR(2) | on-trade | [direct] | CE=Call European / PE=Put European; F&O only | NSE/INSP/61999 |
| [trade] | trade-order_number | Order Number | OrderID | VARCHAR(30) | on-trade | [direct] | exchange-issued order ref; printed on each trade line item | NSE/INSP/61999 |
| [trade] | trade-quantity | Trade Quantity | Quantity | NUMBER(15,0) | on-trade | [direct] | cumulative per ISIN/symbol per side; F&O lot-size applied | NSE/INSP/61999 |
| [trade] | trade-sebi_turnover_fee | SEBI Turnover Fee | SEBIFee | NUMBER(15,2) | on-trade | derived from Y | fee rate per SEBI Stock Brokers Regulations Schedule <abbr title="—">III</abbr>; brokers pay half-yearly to SEBI | SEBI/HO/MIRSD/POD-1/P/CIR/2025/94 |
| [trade] | trade-settlement_number | Settlement Number | SettlementNo | VARCHAR(20) | on-trade | [direct] | seven-digit exchange settlement identifier; 2425828 = first direct-payout settlement Feb-2025 | NCL/CMPT/66779 |
| [trade] | trade-stamp_duty | Stamp Duty | StampDuty | NUMBER(15,2) | on-trade | derived from Y | state-wise rate per Indian Stamp Act 1899 (Jul-2020 amended); centralised collection by CC on behalf of states | NSE/INSP/61999 |
| [trade] | trade-strike_price | Option Strike Price | StrikePrice | NUMBER(15,4) | on-trade | [direct] | options only; required field on F&O ECN | NSE/INSP/61999 |
| [trade] | trade-stt | Securities Transaction Tax | STT | NUMBER(15,2) | on-trade | derived from Y | computed by CC and reflected in revised CN format; rates per Finance Act; remitted monthly to govt | NSE/INSP/61999 |
| [trade] | trade-symbol | Trading Symbol | Symbol | VARCHAR(20) | on-trade | [direct] | NSE/BSE symbol or contract descriptor; expiry/strike for derivatives appended | NSE/INSP/61999 |
| [trade] | trade-trade_number | Trade Number | TradeID | VARCHAR(30) | on-trade | [direct] | exchange-issued trade ref; unique per leg | NSE/INSP/61999 |
| [trade] | trade-trade_price | Trade Price | TradePrice | NUMBER(15,4) | on-trade | [direct] | price at which trade executed; weighted-avg if multiple fills aggregated | NSE/INSP/61999 |
| [trade] | trade-trade_time | Trade Execution Time | TradeTime | TIMESTAMP HHMMSS | on-trade | [direct] | HHMMSS in <abbr title="Indian Standard Time (UTC+05:30)">IST</abbr>; for off-market and block trades use special trade-time annotation | NSE/INSP/61999 |
| [trade] | trade-trade_value | Trade Value | GrossValue | NUMBER(18,2) | on-trade | derived from Y | quantity * price; sign reflects buy/sell | NSE/INSP/61999 |

## Verified through

2026-05-14

---

*AI-generated and not legal advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*

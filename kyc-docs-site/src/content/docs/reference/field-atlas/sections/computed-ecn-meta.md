---
title: "Computed / Derived — ecn-meta — Data Flow"
description: "Where each field in Computed / Derived — ecn-meta flows downstream — destinations, formats, frequencies, transformations, quirks."
---

> **Why this page is structured this way:** This is the field-first view for the computed/derived `[ecn-meta]` pseudo-section. These fields don't exist at <abbr title="Know Your Customer (process).">KYC</abbr> onboarding time; they're produced by operations (trade execution, margin computation, settlement files, etc.). To see the same data from the destination's perspective, jump from the [atlas overview](/broking-kyc/reference/field-atlas/).

## TL;DR

- **14 unique fields** in this section.
- **14 field-destination relationships** total.

## Data flow table

Sorted by `field_id`, then `destination`.

| field_id | field_name | destination | destination_field_name | destination_format | frequency | transformation | quirks_notes | spec_source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ecn-algo_id | Algo ID | contract-notes | AlgoID | VARCHAR(20) | on-trade | [direct] | tagged for algo-originated retail orders; mandatory per Feb-2025 <abbr title="Securities and Exchange Board of India">SEBI</abbr> retail-algo framework | SEBI/<abbr title="Head Office (SEBI circular ID prefix)">HO</abbr>/<abbr title="Markets Intermediaries Regulation and Supervision Department (SEBI)">MIRSD</abbr>/MIRSD-PoD/P/CIR/2025/0000013 |
| ecn-broker_address | Broker Registered Address | contract-notes | BrokerAddress | VARCHAR(500) | on-trade | [direct] | registered office address printed in <abbr title="Electronic Contract Note.">ECN</abbr> header | <abbr title="National Stock Exchange of India">NSE</abbr>/INSP/61999 |
| ecn-broker_authorised_signatory | Broker Authorised Signatory | contract-notes | AuthorisedSigner | VARCHAR(100) | on-trade | [direct] | name and designation of broker <abbr title="Digital Signature Certificate (CCA-licensed; aka Class 2/3 DSC).">DSC</abbr> signer; printed alongside DSC | NSE/INSP/61999 |
| ecn-broker_compliance_officer_contact | Compliance Officer Contact | contract-notes | ComplianceContact | VARCHAR(200) | on-trade | [direct] | name + phone + email of CO printed in ECN footer per revised format | NSE/INSP/61999 |
| ecn-broker_exchange_registration | Broker Exchange Membership Number | contract-notes | ExchMemberNo | VARCHAR(20) | on-trade | uppercase | exchange-specific membership ID; NSE / <abbr title="BSE Limited (formerly Bombay Stock Exchange)">BSE</abbr> / <abbr title="Multi Commodity Exchange of India">MCX</abbr> as applicable | NSE/INSP/61999 |
| ecn-broker_gstin | Broker GSTIN | contract-notes | BrokerGSTIN | CHAR(15) | on-trade | uppercase | state-specific GSTIN; multiple GSTINs if broker registered in multiple states | NSE/INSP/61999 |
| ecn-broker_sebi_registration | Broker SEBI Registration Number | contract-notes | SEBIReg | VARCHAR(20) | on-trade | uppercase | broker SEBI registration number prints in ECN header block | NSE/INSP/61999 |
| ecn-clearing_member_id | Clearing Member ID | contract-notes | CMID | VARCHAR(20) | on-trade | [direct] | <abbr title="Clearing Member">CM</abbr> ID used for settlement; printed on ECN for client visibility per revised format | NSE/INSP/61999 |
| ecn-ecn_archive_path | ECN Archive Path | contract-notes | ArchivePath | VARCHAR(500) | on-trade | formatted | 5+ year retention; SHA-256 integrity hash retained alongside; SEBI Stock Broker Regs 8-yr record-retention | SEBI/HO/MIRSD/POD-1/P/CIR/2025/94 |
| ecn-ecn_delivery_channel | ECN Delivery Channel | contract-notes | DeliveryChannel | CHAR(4) | on-trade | [direct] | EMAIL / <abbr title="Short Message Service.">SMS</abbr> / IM; multiple channels permitted per NSE/INSP/52604; DLT-template required for SMS/IM | NSE/INSP/52604 |
| ecn-ecn_dispatch_timestamp | ECN Dispatch Timestamp | contract-notes | DispatchTimestamp | TIMESTAMP ISO 8601 | on-trade | formatted | T+24h SLA from trade execution; preserved-channel log retains delivery proof | NSE/INSP/61999 |
| ecn-ecn_format_template | ECN Template Code | contract-notes | TemplateCode | CHAR(2) | on-trade | [direct] | <abbr title="Account Aggregator (RBI-licensed NBFC-AA)">AA</abbr>=Annexure A (CN-cum-Tax-Invoice) / AB=Annexure B (CN + separate tax invoice) | NSE/INSP/61999 |
| ecn-static_ip | Static IP for Algo Orders | contract-notes | none | none | on-trade | [direct] | whitelisted static IP retained in <abbr title="Order Management System">OMS</abbr> audit log; not printed on ECN but cross-referenced | SEBI/HO/MIRSD/MIRSD-PoD/P/CIR/2025/0000013 |
| ecn-trading_terminal_id | Trading Terminal ID | contract-notes | TerminalID | VARCHAR(20) | on-trade | [direct] | terminal from which order originated; required for algo trade trace per Feb-2025 SEBI circular | SEBI/HO/MIRSD/MIRSD-PoD/P/CIR/2025/0000013 |

## Verified through

2026-05-14

---

*AI-generated and not legal advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*

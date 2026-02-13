---
title: Exchange & Depository Registration
description: How client data flows to NSE, BSE, MCX, CDSL, and NSDL — file formats, field requirements, submission sequences, and intermediate statuses.
---

How client data flows to NSE, BSE, MCX, CDSL, and NSDL — file formats, field requirements, step-by-step submission sequences, and the intermediate statuses at each agency. PAN is the universal linking key across all systems.

:::note
After checker approval, the system submits client data to exchanges (NSE/BSE/MCX) for UCC registration and to depositories (CDSL/NSDL) for BO account opening. Each agency has its own multi-step pipeline. All agencies run in parallel.
:::

## NSE UCC Registration

| Aspect | Details |
|--------|---------|
| **Trading System** | NEAT / NOW (NEAT on Web) |
| **Submission Methods** | UCI Online (web) \| API Upload (REST JSON) \| Batch Upload (pipe-delimited, no headers) |
| **API Reference** | NSE/ISC/60418 (API), NSE/ISC/61817 (Apr 2024 — revised structure) |
| **Batch Limit** | Max 10,000 records per file |
| **Format Change** | New file structure effective Jul 15, 2024 |
| **Segments** | CM (Cash/Equity), FNO (F&O), CD (Currency), COM (Commodity) |
| **Activation SLA** | Same day (batch 5PM cutoff) |

**Full spec:** [NSE Integration](/vendors/exchanges/nse)

## BSE UCC Registration

| Aspect | Details |
|--------|---------|
| **Trading System** | BOLT Plus |
| **PAN Verification** | **3-parameter mandatory**: PAN + Client Name + DOB via Protean |
| **Modification Rule** | Name/DOB changes only via Unfreeze requests + Protean re-verification |
| **Batch Limit** | Max 30,000 records. Segment activation: max 50,000. |
| **Segments** | Equity, F&O, Currency, Debt |
| **Activation SLA** | Same day |

**Full spec:** [BSE Integration](/vendors/exchanges/bse)

## MCX UCC Registration

| Aspect | Details |
|--------|---------|
| **Trading System** | MCX CONNECT |
| **Connectivity** | CTCL (Computer-to-Computer Link) — proprietary C-structure API via TCP/IP |
| **Additional Requirement** | Standard KYC docs + **income proof mandatory** for commodity trading |
| **Client Category** | HE=Hedger, SP=Speculator, AR=Arbitrageur |
| **Activation SLA** | Next working day |

**Full spec:** [MCX Integration](/vendors/exchanges/mcx)

## CDSL BO Account Opening

| Aspect | Details |
|--------|---------|
| **Core System** | CDAS |
| **BO ID Format** | 16 digits (numeric): 8-digit DP ID + 8-digit Client ID |
| **Submission** | API (BO Setup) \| Portal (one-by-one) \| Batch (fixed-length positional) |
| **File Lines** | 01: Header/DP ID (mandatory), 02: Contact/KYC (mandatory), 03-04: Joint holders, 05: Bank (mandatory), 06: Additional, 07: Nomination (mandatory) |
| **DDPI** | Optional, replaces PoA. Activation within 24 hours (online). |
| **Activation SLA** | 1-2 hours (API). 1-3 days (batch). |

**Full spec:** [CDSL Integration](/vendors/depositories/cdsl)

## NSDL BO Account Opening

| Aspect | Details |
|--------|---------|
| **Core System** | DPM (Depository Participant Module) |
| **BO ID Format** | "IN" + 14 chars (alphanumeric): IN + 6 DP ID + 8 Client ID |
| **Submission** | Via Insta Interface → CDS → Local/Cloud DPM |
| **File Format** | UDiFF (Unified Distilled File Formats) — ISO-tagged since Mar 2024 |
| **DDPI** | Primarily offline. Processing: 2-3 business days. |
| **Activation SLA** | ~15 working days including PAN flag enablement |

**Full spec:** [NSDL Integration](/vendors/depositories/nsdl)

## CDSL vs NSDL — Key Differences

| Aspect | CDSL | NSDL |
|--------|------|------|
| BO ID Format | 16 digits (numeric) | "IN" + 14 chars (alphanumeric) |
| Core System | CDAS | DPM |
| Online Transfers | EASIEST | SPEED-e |
| View-only Portal | easi | IDeAS |
| File Format | Fixed-length positional (line-based) | ISO-tagged UDiFF |
| Promoter | BSE | NSE |
| Market Share | ~11.27 crore accounts (more retail) | ~3.54 crore accounts (higher value) |
| DDPI Activation | Online (Aadhaar eSign), 24 hours | Often offline (physical), 2-3 days |

## Common Rejection Reasons

| # | Rejection Reason | Fix |
|---|-----------------|-----|
| 1 | Multiple email addresses in email field | Single email only |
| 2 | PAN not verified / invalid | Verify PAN before submission |
| 3 | PAN-Aadhaar not linked | Client must link at incometax.gov.in |
| 4 | Name mismatch across sources | Normalize to PAN name |
| 5 | DOB inconsistency across databases | Use PAN DOB as master |
| 6 | Missing mandatory file lines (01,02,05,07) | Ensure all mandatory lines present |
| 7 | Incomplete 6 KYC attributes | All 6 must be populated |
| 8 | Missing nomination or opt-out declaration | Mandatory since Mar 1, 2025 |
| 9 | Duplicate PAN with same status at same DP | Verify no existing account |
| 10 | Missing guardian details when disability flag = Y | Validate conditional fields |

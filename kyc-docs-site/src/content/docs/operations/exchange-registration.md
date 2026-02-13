---
title: Exchange & Depository Registration
description: How client data flows to NSE, BSE, MCX, CDSL, and NSDL — file formats, field requirements, submission sequences, and intermediate statuses.
---

Before a customer can buy or sell a single share, their identity must be registered with two fundamentally different types of institutions: exchanges and depositories. Exchanges — such as the NSE (National Stock Exchange), BSE (Bombay Stock Exchange), and MCX (Multi Commodity Exchange) — are where trades happen. Depositories — CDSL (Central Depository Services Limited) and NSDL (National Securities Depository Limited) — are where securities are held in electronic form. Think of it this way: the exchange is the marketplace where you buy vegetables, and the depository is the refrigerator where you store them. This page covers the file formats, field requirements, and submission sequences for registering a new client at each of these five institutions.

:::note
After checker approval, the system submits client data to exchanges (NSE/BSE/MCX) for UCC (Unique Client Code) registration and to depositories (CDSL/NSDL) for BO (Beneficial Owner) account opening. Each agency has its own multi-step pipeline. All agencies run in parallel.
:::

The PAN (Permanent Account Number) is the universal linking key across all five systems. Every exchange and every depository uses PAN as the primary identifier to tie a customer's trading activity to their demat holdings to their KYC (Know Your Customer) record. If PAN data is inconsistent across any of these systems, things break — settlements get blocked, accounts get frozen. That is why getting registration right the first time matters so much.

Let us start with the three exchange registrations, each of which creates a UCC for the customer.

## NSE UCC Registration

NSE is the largest stock exchange in India by trading volume and is typically where most new customers will place their first trade. NSE offers three submission methods — a web portal, a REST API (Application Programming Interface), and a batch upload using pipe-delimited files. The batch format changed in July 2024, so make sure your integration uses the revised structure.

| Aspect | Details |
|--------|---------|
| **Trading System** | NEAT / NOW (NEAT on Web) |
| **Submission Methods** | UCI Online (web) \| API Upload (REST JSON) \| Batch Upload (pipe-delimited, no headers) |
| **API Reference** | NSE/ISC/60418 (API), NSE/ISC/61817 (Apr 2024 — revised structure) |
| **Batch Limit** | Max 10,000 records per file |
| **Format Change** | New file structure effective Jul 15, 2024 |
| **Segments** | CM (Cash/Equity), FNO (F&O), CD (Currency), COM (Commodity) |
| **Activation SLA** | Same day (batch 5PM cutoff) |

In plain English: if you submit a customer's data to NSE before 5 PM, they should have an active trading code by end of day.

**Full spec:** [NSE Integration](/broking-kyc/vendors/exchanges/nse)

BSE runs alongside NSE and many brokers register their customers on both exchanges simultaneously.

## BSE UCC Registration

BSE has a stricter PAN verification process than NSE — it mandates a 3-parameter check where the customer's PAN, name, and date of birth must all match against the Income Tax Department's records via Protean. If a customer's name or DOB needs to be corrected after registration, BSE requires a formal "Unfreeze" request followed by re-verification through Protean, which makes getting it right the first time especially important.

| Aspect | Details |
|--------|---------|
| **Trading System** | BOLT Plus |
| **PAN Verification** | **3-parameter mandatory**: PAN + Client Name + DOB via Protean |
| **Modification Rule** | Name/DOB changes only via Unfreeze requests + Protean re-verification |
| **Batch Limit** | Max 30,000 records. Segment activation: max 50,000. |
| **Segments** | Equity, F&O, Currency, Debt |
| **Activation SLA** | Same day |

:::caution[BSE Name Corrections Are Painful]
Unlike NSE, BSE does not allow simple modifications to a client's name or date of birth. You must submit an Unfreeze request and then go through Protean re-verification. Always normalize the client's name to match their PAN card exactly before submitting to BSE.
:::

**Full spec:** [BSE Integration](/broking-kyc/vendors/exchanges/bse)

MCX is the third exchange, but it only applies to customers who want to trade in commodities such as gold, crude oil, or agricultural products.

## MCX UCC Registration

MCX has a unique requirement that the other exchanges do not: income proof is mandatory for all commodity traders. Additionally, every MCX client must be assigned a client category — Hedger (HE), Speculator (SP), or Arbitrageur (AR) — which affects their margin requirements and position limits. The connectivity uses a proprietary protocol called CTCL (Computer-to-Computer Link), which communicates via TCP/IP.

| Aspect | Details |
|--------|---------|
| **Trading System** | MCX CONNECT |
| **Connectivity** | CTCL (Computer-to-Computer Link) — proprietary C-structure API via TCP/IP |
| **Additional Requirement** | Standard KYC docs + **income proof mandatory** for commodity trading |
| **Client Category** | HE=Hedger, SP=Speculator, AR=Arbitrageur |
| **Activation SLA** | Next working day |

In plain English: MCX is the only exchange where income proof is required at registration. If your customer only wants equity trading, you can skip MCX entirely.

**Full spec:** [MCX Integration](/broking-kyc/vendors/exchanges/mcx)

Now let us move to the depositories. While exchanges handle where trades happen, depositories handle where the resulting securities are stored.

## CDSL BO Account Opening

CDSL, promoted by BSE, is where the majority of India's retail demat accounts are held — over 11 crore accounts as of early 2026. The BO (Beneficial Owner) account is the electronic equivalent of a physical share certificate locker. CDSL uses a fixed-length positional file format with numbered "lines," where Line 01 carries the header and DP (Depository Participant) ID, Line 02 carries contact and KYC data, Line 05 carries bank details, and Line 07 carries nomination information. All four of these lines are mandatory for a new account.

| Aspect | Details |
|--------|---------|
| **Core System** | CDAS |
| **BO ID Format** | 16 digits (numeric): 8-digit DP ID + 8-digit Client ID |
| **Submission** | API (BO Setup) \| Portal (one-by-one) \| Batch (fixed-length positional) |
| **File Lines** | 01: Header/DP ID (mandatory), 02: Contact/KYC (mandatory), 03-04: Joint holders, 05: Bank (mandatory), 06: Additional, 07: Nomination (mandatory) |
| **DDPI** | Optional, replaces PoA. Activation within 24 hours (online). |
| **Activation SLA** | 1-2 hours (API). 1-3 days (batch). |

:::tip[DDPI Replaces Power of Attorney]
DDPI (Demat Debit and Pledge Instruction) replaced the older Power of Attorney mechanism in November 2022. It is optional — a customer does not need DDPI to hold securities — but without it, they must manually authorize every debit from their demat account. CDSL processes DDPI activation online within 24 hours, which is significantly faster than NSDL.
:::

**Full spec:** [CDSL Integration](/broking-kyc/vendors/depositories/cdsl)

NSDL is the other depository and has a notably different architecture and timeline.

## NSDL BO Account Opening

NSDL, promoted by NSE, was India's first depository (established 1996) and tends to hold more institutional and high-value accounts. Its file format — UDiFF (Unified Distilled File Formats) — uses ISO-tagged fields and was adopted in March 2024, replacing the older format. The most critical difference from CDSL is the activation timeline: NSDL takes approximately 15 working days end-to-end, primarily because the PAN flag enablement step (the final gate) can take 5-7 working days on its own.

| Aspect | Details |
|--------|---------|
| **Core System** | DPM (Depository Participant Module) |
| **BO ID Format** | "IN" + 14 chars (alphanumeric): IN + 6 DP ID + 8 Client ID |
| **Submission** | Via Insta Interface → CDS → Local/Cloud DPM |
| **File Format** | UDiFF (Unified Distilled File Formats) — ISO-tagged since Mar 2024 |
| **DDPI** | Primarily offline. Processing: 2-3 business days. |
| **Activation SLA** | ~15 working days including PAN flag enablement |

**Full spec:** [NSDL Integration](/broking-kyc/vendors/depositories/nsdl)

To help you understand the practical differences between the two depositories, the following comparison table covers everything from BO ID formats to DDPI processing times.

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

In plain English: CDSL is faster, more retail-friendly, and has a larger user base. NSDL is older, more institutional, and takes significantly longer for account activation. Most retail-focused brokers default new customers to CDSL.

:::note[How to Spot Which Depository a BO ID Belongs To]
If the BO ID is a 16-digit number (e.g., 1234567800012345), it is a CDSL account. If it starts with "IN" followed by 14 alphanumeric characters (e.g., IN30012345678901), it is an NSDL account. This is useful when debugging cross-depository issues.
:::

Finally, knowing the most common rejection reasons will save your operations team significant time. These are the issues your system should proactively validate before submission.

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

:::tip[Pre-Submission Validation Saves Days]
Most of these rejections are preventable. Build pre-submission validation checks in your batch pipeline that catch issues like multiple emails, PAN-Aadhaar linkage status, and missing mandatory fields before the data ever leaves your system. A rejection from an exchange or depository means re-submission, which can delay customer activation by 1-3 days.
:::

In plain English: the top three rejection reasons — multiple emails, unverified PAN, and PAN-Aadhaar not linked — account for the majority of failed registrations. Validate these upfront during the user journey, not at the batch submission stage.

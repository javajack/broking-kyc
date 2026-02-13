---
title: Account Aggregator Framework
description: RBI's consent-based financial data sharing network — how Account Aggregators let brokers fetch bank statements and ITR data without manual uploads.
---

RBI's consent-based financial data sharing network — how Account Aggregators let brokers fetch bank statements, ITR data, and demat holdings without manual document uploads. Covers the FIP/FIU/AA architecture, 16 licensed operators, and practical integration for KYC.

:::note
**What is AA?** An RBI-licensed NBFC that acts as a consent manager for financial data. AA does not store/view/process data — it facilitates encrypted transfer from Financial Information Provider (FIP) to Financial Information User (FIU). Governed by RBI Master Direction (Sep 2, 2016). Industry body: Sahamati.
:::

## Scale (Dec 2025)

| Metric | Value |
|--------|-------|
| Financial Institutions Live | 126 |
| Accounts Enabled | 2.61 billion |
| FIPs Integrated | 90+ |
| Licensed AAs | 16 |

## RBI-Licensed AA Operators

| Operator | Entity | Strength | Relevance for Broking |
|----------|--------|----------|----------------------|
| **Finvu** | Cookiejar Technologies | Earliest entrant, strong consumer app | Wide bank FIP coverage |
| **OneMoney** | FinSec AA Solutions | Consumer-focused, wide coverage | Good for retail onboarding |
| **CAMS Finserv** | CAMSFinServ | MF ecosystem (RTA backing) | Mutual fund holdings fetch |
| **Anumati** | Perfios AA Services | Analytics + AA combined | Income verification with analytics |
| **PhonePe** | PhonePe Technology | Massive UPI consumer base | Highest consent conversion rates |
| **Digio** | Digio Internet | eSign + KYC + AA combined | Full-stack if using Digio for eSign |
| **Protean SurakshAA** | Protean eGov | Government-backed | Regulatory trust signal |
| **CRIF Connect** | CRIF Connect | Credit bureau background | Credit + AA data combined |

## Integration Approach

| Approach | How | Pros | Cons |
|----------|-----|------|------|
| **Multi-AA Gateway** (Recommended) | Use Setu or Signzy gateway. Single integration, smart routing. | Higher conversion (AA fallback). One contract. Best UX. | Gateway margin on top of AA fees. |
| Direct AA Integration | Register as FIU with individual AAs. Implement ReBIT API spec. | No middleman. Direct pricing. | Multiple contracts. No smart routing. |

## API Flow

```
CONSENT FLOW:
  FIU (Broker) ──POST /Consent──▸ Account Aggregator
      ▸ AA sends consent request to customer's AA app
      ▸ Customer reviews: data type, purpose, duration, frequency
      ▸ Customer approves via OTP/PIN
      ▸ AA notifies FIU: consent_status = ACTIVE

DATA FETCH FLOW:
  FIU ──POST /FI/request (consent_id)──▸ AA ──▸ FIP (Bank/CDSL)
      ▸ FIP encrypts + digitally signs data
      ▸ AA is "blind pipe" — cannot read data
      ▸ FIU decrypts using Diffie-Hellman session keys
```

## Financial Information Types Available

| FI Type | Regulator | Status | Use for Broking |
|---------|-----------|--------|----------------|
| Savings/Current Statements | RBI | Live | F&O income proof (Rs.10K credit in 6 months) |
| Term/Recurring Deposits | RBI | Live | Net worth verification |
| Equity Shares (Demat) | SEBI | Live | Existing holdings for financial profile |
| Mutual Fund Units | SEBI | Live | Net worth + cross-sell |
| Insurance Policies | IRDAI | Live | Financial profile |
| NPS Balances | PFRDA | Live | Retirement corpus |
| GST Returns | DoR | Coming Soon | Business income for proprietors |

## AA vs Perfios ITR

| Dimension | Account Aggregator | Perfios ITR Analysis |
|-----------|-------------------|---------------------|
| Data Source | Direct from bank FIP (real-time) | ITR documents (PDF/XML) |
| Consent | Customer OTP on AA app | Customer uploads document |
| Speed | Seconds (near real-time) | Minutes (document parsing) |
| Depth | Transaction-level bank data | Structured tax return data |
| Cost | Rs.5-25/fetch | Rs.15-50/document |
| Best For | Quick F&O activation via bank statement | Detailed income assessment |
| UX Impact | Zero document upload — just consent | PDF upload required |

:::tip
**Complementary, not competing:** Perfios operates Anumati (an AA) and its analytics platform can consume AA-fetched data. For F&O activation, AA is sufficient and gives the best UX. For deeper underwriting, Perfios ITR adds richer analysis.
:::

## Adoption Status

:::caution
**Currently optional.** No SEBI circular mandates AA integration for stock brokers as of Feb 2026. However, SEBI allowed CDSL/NSDL as FIPs (Aug 2022), and the trend strongly favors digital data infrastructure. ICICI Direct already uses AA for F&O income verification. Early adoption = competitive advantage in onboarding UX.
:::

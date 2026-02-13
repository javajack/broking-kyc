---
title: Account Aggregator Framework
description: RBI's consent-based financial data sharing network — how Account Aggregators let brokers fetch bank statements and ITR data without manual uploads.
---

Imagine you are opening a trading account and the broker asks for your last six months of bank statements to verify your income for F&O (Futures and Options) trading. Traditionally, you would log into your net banking portal, download a PDF, and upload it to the broker's website — a process that is slow, error-prone, and requires the broker to parse hundreds of different bank statement formats. The Account Aggregator (AA) framework changes this entirely. AA is like a digital courier service for your financial data — instead of downloading bank statements and uploading them, the data flows directly from your bank to the broker with your one-tap consent. No PDFs, no uploads, no format-parsing headaches. This page covers how the AA framework works, who the key players are, and how a stock broking firm should integrate with it.

:::note[What is AA?]
An AA is an RBI (Reserve Bank of India)-licensed NBFC (Non-Banking Financial Company) that acts as a consent manager for financial data. AA does not store/view/process data — it facilitates encrypted transfer from Financial Information Provider (FIP) to Financial Information User (FIU). Governed by RBI Master Direction (Sep 2, 2016). Industry body: Sahamati.
:::

The AA framework is built on three roles: the FIP (your bank, which holds your data), the FIU (the broker, which wants your data), and the AA (the consent layer in between, which ensures the data only flows when you explicitly approve it). Understanding these three roles is essential to understanding how the integration works.

## Scale (Dec 2025)

The AA ecosystem has grown rapidly since its launch and now covers the vast majority of Indian financial accounts. These numbers give you a sense of the infrastructure's maturity and reliability.

| Metric | Value |
|--------|-------|
| Financial Institutions Live | 126 |
| Accounts Enabled | 2.61 billion |
| FIPs Integrated | 90+ |
| Licensed AAs | 16 |

In plain English: with 2.61 billion accounts enabled and 126 financial institutions live on the network, the AA ecosystem covers essentially every major bank and financial institution in India. Your customers' bank accounts are almost certainly accessible through this framework.

Not all 16 licensed AAs are equally relevant for a stock broking use case. The following table highlights the operators that matter most, along with their specific strengths.

## RBI-Licensed AA Operators

| Operator | Entity | Strength | Relevance for Broking |
|----------|--------|----------|----------------------|
| **Finvu** | Cookiejar Technologies | Earliest entrant, strong consumer app | Wide bank FIP coverage |
| **OneMoney** | FinSec AA Solutions | Consumer-focused, wide coverage | Good for retail onboarding |
| **CAMS Finserv** | CAMSFinServ | MF ecosystem (RTA backing) | Mutual fund holdings fetch |
| **Anumati** | Perfios AA Services | Analytics + AA combined | Income verification with analytics |
| **PhonePe** | PhonePe Technology | Massive UPI consumer base | Highest consent conversion rates |
| **Digio** | Digio Internet | eSign + KYC (Know Your Customer) + AA combined | Full-stack if using Digio for eSign |
| **Protean SurakshAA** | Protean eGov | Government-backed | Regulatory trust signal |
| **CRIF Connect** | CRIF Connect | Credit bureau background | Credit + AA data combined |

:::tip[PhonePe for Consent Conversion]
PhonePe's AA integration benefits from the fact that hundreds of millions of Indians already have PhonePe installed on their phones. When the consent request arrives, it opens directly in the PhonePe app — an app the customer already trusts and uses daily. This dramatically improves consent conversion rates compared to AAs that require the customer to download a new app.
:::

In plain English: rather than integrating with each of these 16 AAs individually, the recommended approach is to use a multi-AA gateway that routes consent requests to whichever AA the customer is registered with. This brings us to the integration approach.

## Integration Approach

There are two ways to integrate with the AA ecosystem: through a multi-AA gateway (recommended) or directly with individual AAs. The gateway approach is strongly preferred for stock broking because it provides smart routing, fallback capabilities, and a single integration point.

| Approach | How | Pros | Cons |
|----------|-----|------|------|
| **Multi-AA Gateway** (Recommended) | Use Setu or Signzy gateway. Single integration, smart routing. | Higher conversion (AA fallback). One contract. Best UX. | Gateway margin on top of AA fees. |
| Direct AA Integration | Register as FIU with individual AAs. Implement ReBIT (Reserve Bank Information Technology) API spec. | No middleman. Direct pricing. | Multiple contracts. No smart routing. |

:::note[What Is Smart Routing?]
Smart routing means the gateway automatically selects the best AA for each consent request based on the customer's bank and the AA's success rate for that bank. If one AA has a technical issue, the gateway falls back to another AA transparently. This significantly improves the overall success rate compared to using a single AA directly.
:::

In plain English: use a gateway like Setu. You write one integration, sign one contract, and the gateway handles routing consent requests to the right AA for each customer. The small gateway margin is well worth the operational simplicity.

Now let us look at how the API (Application Programming Interface) flow works at a technical level.

## API Flow

The AA flow has two distinct phases: consent collection and data fetch. In the consent phase, the broker (FIU) requests the customer's permission to access their financial data. In the data fetch phase, the encrypted data flows from the bank (FIP) through the AA to the broker. Critically, the AA itself cannot see or store the data — it is encrypted end-to-end using Diffie-Hellman session keys.

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

In plain English: the customer gets a notification on their AA app asking "Do you want to share your bank statement with [Broker Name] for the purpose of income verification?" They review the details — what data, for how long, how often — and approve with an OTP or PIN. Once approved, the bank encrypts the data and sends it through the AA to the broker. The AA acts as a "blind pipe" and never sees the actual data.

The AA framework supports more than just bank statements. Here is the full list of financial data types that can be fetched.

## Financial Information Types Available

| FI Type | Regulator | Status | Use for Broking |
|---------|-----------|--------|----------------|
| Savings/Current Statements | RBI | Live | F&O income proof (Rs.10K credit in 6 months) |
| Term/Recurring Deposits | RBI | Live | Net worth verification |
| Equity Shares (Demat) | SEBI (Securities and Exchange Board of India) | Live | Existing holdings for financial profile |
| Mutual Fund Units | SEBI | Live | Net worth + cross-sell |
| Insurance Policies | IRDAI (Insurance Regulatory and Development Authority of India) | Live | Financial profile |
| NPS Balances | PFRDA (Pension Fund Regulatory and Development Authority) | Live | Retirement corpus |
| GST Returns | DoR (Department of Revenue) | Coming Soon | Business income for proprietors |

In plain English: for stock broking, the most relevant data type is savings/current account statements (for F&O income verification). But the framework also lets you fetch demat holdings, mutual fund units, and insurance policies — data that can enrich the customer's financial profile and support suitability assessments.

:::tip[Demat Holdings via AA]
Since SEBI allowed CDSL (Central Depository Services Limited) and NSDL (National Securities Depository Limited) to act as FIPs (August 2022), you can now fetch a customer's existing demat holdings through the AA framework. This is useful for understanding their trading experience and portfolio composition during onboarding.
:::

If you are already using Perfios for ITR-based income verification, you might wonder how AA compares. The answer is: they are complementary, not competing.

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

:::tip[Complementary, Not Competing]
**Complementary, not competing:** Perfios operates Anumati (an AA) and its analytics platform can consume AA-fetched data. For F&O activation, AA is sufficient and gives the best UX. For deeper underwriting, Perfios ITR adds richer analysis.
:::

In plain English: for the common case of verifying that a customer has Rs.10,000 or more credited to their bank account in the last six months (the typical F&O activation threshold), AA is faster, cheaper, and provides a better customer experience than asking for ITR documents. Use Perfios ITR when you need more detailed income analysis — such as verifying salary breakdowns, business income, or tax-saving investments.

Finally, here is the current regulatory status of AA integration for stock brokers.

## Adoption Status

:::caution[Currently Optional, But Strongly Recommended]
**Currently optional.** No SEBI circular mandates AA integration for stock brokers as of Feb 2026. However, SEBI allowed CDSL/NSDL as FIPs (Aug 2022), and the trend strongly favors digital data infrastructure. ICICI Direct already uses AA for F&O income verification. Early adoption = competitive advantage in onboarding UX.
:::

In plain English: you are not required to integrate with the AA framework today, but the direction of travel is clear. SEBI is systematically enabling digital data infrastructure across the securities ecosystem, and brokers who adopt AA early will offer a materially better onboarding experience — no document uploads, near-instant income verification, and higher completion rates. The question is not "whether" but "when," and the engineering effort (1-2 weeks using a gateway like Setu) is modest enough to justify early investment.

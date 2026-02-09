<section id="aa-framework">
## <span class="section-num">5</span> Account Aggregator Framework &mdash; Comprehensive Guide

<p class="section-brief"><strong>RBI's consent-based financial data sharing network</strong> &mdash; how Account Aggregators let brokers fetch bank statements, ITR data, and demat holdings without manual document uploads. Covers the FIP/FIU/AA architecture, 16 licensed operators, and practical integration for KYC.</p>

::: {.info-box .cyan}
**What is AA?** An RBI-licensed NBFC that acts as a consent manager for financial data. AA does not store/view/process data &mdash; it facilitates encrypted transfer from Financial Information Provider (FIP) to Financial Information User (FIU). Governed by RBI Master Direction dated Sep 2, 2016. Inter-regulatory: RBI, SEBI, IRDAI, PFRDA, DoR. Industry body: Sahamati.
:::

### Scale (Dec 2025)

<div class="hero-stats" style="margin:16px 0;">
  <div class="hero-stat" style="background:var(--cyan-light);padding:12px 20px;border-radius:10px;"><span class="num" style="color:var(--cyan);font-size:1.5rem;">126</span><span class="label">FIs Live</span></div>
  <div class="hero-stat" style="background:var(--cyan-light);padding:12px 20px;border-radius:10px;"><span class="num" style="color:var(--cyan);font-size:1.5rem;">2.61B</span><span class="label">Accounts Enabled</span></div>
  <div class="hero-stat" style="background:var(--cyan-light);padding:12px 20px;border-radius:10px;"><span class="num" style="color:var(--cyan);font-size:1.5rem;">90+</span><span class="label">FIPs Integrated</span></div>
  <div class="hero-stat" style="background:var(--cyan-light);padding:12px 20px;border-radius:10px;"><span class="num" style="color:var(--cyan);font-size:1.5rem;">16</span><span class="label">Licensed AAs</span></div>
</div>

### RBI-Licensed Account Aggregator Operators

| Operator | Entity | Strength | Relevance for Broking |
|---|---|---|---|
| **Finvu** | Cookiejar Technologies | Earliest entrant, strong consumer app | Wide bank FIP coverage |
| **OneMoney** | FinSec AA Solutions | Consumer-focused, wide coverage | Good for retail onboarding |
| **CAMS Finserv** | CAMSFinServ | MF ecosystem (RTA backing) | Mutual fund holdings fetch |
| **Anumati** | Perfios AA Services | Analytics + AA combined (Perfios) | Income verification with analytics overlay |
| **PhonePe** | PhonePe Technology | Massive UPI consumer base | Highest consent conversion rates |
| **Digio** | Digio Internet | eSign + KYC + AA combined | Full-stack if already using Digio for eSign |
| **Protean SurakshAA** | Protean eGov | Government-backed | Regulatory trust signal |
| **CRIF Connect** | CRIF Connect | Credit bureau background | Credit + AA data combined |
| Saafe | Dashboard AA Services | Transparent consent UX | Consumer trust |
| Yodlee | Yodlee Finsoft | Global player (Envestnet) | Multi-country if NRI support needed |
| INK | Unacores AA Solutions | Growing platform | Competitive pricing |
| NADL | NESL Asset Data | NeSL backing | Asset data integration |

### Integration Approach for Stock Brokers

| Approach | How | Pros | Cons |
|---|---|---|---|
| **Multi-AA Gateway** <span class="badge-rec">Recommended</span> | Use Setu or Signzy gateway. Single integration, smart routing across AAs. | Higher conversion (AA fallback). One contract. Best UX. | Gateway margin on top of AA fees. |
| Direct AA Integration | Register as FIU with individual AAs. Implement ReBIT API spec. | No middleman. Direct pricing. | Multiple contracts. No smart routing. More engineering. |

### API Flow

```
CONSENT FLOW:
  FIU (Broker) ──POST /Consent──▸ Account Aggregator
      ▸ AA sends consent request to customer's AA app
      ▸ Customer reviews: data type, purpose, duration, frequency
      ▸ Customer approves via OTP/PIN
      ▸ AA notifies FIU: consent_status = ACTIVE
      ▸ FIU receives consent_id + consent_handle

DATA FETCH FLOW:
  FIU ──POST /FI/request (consent_id)──▸ AA ──▸ FIP (Bank/CDSL)
      ▸ FIP encrypts + digitally signs data
      ▸ FIP sends encrypted data → AA → FIU
      ▸ FIU decrypts using Diffie-Hellman session keys
      ▸ AA is "blind pipe" — cannot read data
```

### Financial Information Types Available

| FI Type | Regulator | Status | Use for Broking |
|---|---|---|---|
| Savings/Current Statements | RBI | <span style="color:var(--green);font-weight:700;">Live</span> | F&O income proof (Rs.10K credit in 6 months) |
| Term/Recurring Deposits | RBI | <span style="color:var(--green);font-weight:700;">Live</span> | Net worth verification |
| Equity Shares (Demat) | SEBI | <span style="color:var(--green);font-weight:700;">Live</span> | Existing holdings for financial profile |
| Mutual Fund Units | SEBI | <span style="color:var(--green);font-weight:700;">Live</span> | Net worth + cross-sell |
| Insurance Policies | IRDAI | <span style="color:var(--green);font-weight:700;">Live</span> | Financial profile |
| NPS Balances | PFRDA | <span style="color:var(--green);font-weight:700;">Live</span> | Retirement corpus |
| GST Returns | DoR | <span style="color:var(--orange);font-weight:700;">Coming Soon</span> | Business income for proprietors |

### AA vs Perfios ITR &mdash; Head-to-Head

| Dimension | Account Aggregator | Perfios ITR Analysis |
|---|---|---|
| Data Source | Direct from bank FIP (real-time) | ITR documents (PDF/XML from IT portal) |
| Consent | Customer OTP on AA app | Customer uploads document or IT portal creds |
| Speed | Seconds (near real-time) | Minutes (document parsing) |
| Depth | Transaction-level bank data; infers income from credits | Structured tax return data; declared income, deductions, tax paid |
| Cost | Rs.5-25/fetch | Rs.15-50/document (volume-dependent) |
| Best For | Quick F&O activation via 6-month bank statement | Detailed income assessment, margin trading eligibility |
| UX Impact | Zero document upload &mdash; just consent | PDF upload or portal credential entry |

::: {.info-box .green}
**Complementary, not competing:** Perfios operates Anumati (an AA) and its analytics platform can consume AA-fetched data. For F&O activation (6-month bank statement), AA is sufficient and gives the best UX. For deeper underwriting (margin funding, loans against securities), Perfios ITR adds richer analysis.
:::

### AA Adoption Status for Stock Broking

::: {.info-box .orange}
**Currently optional.** No SEBI circular mandates AA integration for stock brokers as of Feb 2026. However, SEBI allowed CDSL/NSDL as FIPs (Aug 2022), and the trend strongly favors digital data infrastructure. ICICI Direct already uses AA for F&O income verification. Early adoption = competitive advantage in onboarding UX.
:::

</section>

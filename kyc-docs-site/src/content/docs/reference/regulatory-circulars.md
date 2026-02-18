---
title: Regulatory Circulars
description: Every SEBI, RBI, NPCI, and MeitY circular that shapes this system — 35+ regulatory references with dates and their impact on the onboarding flow.
---

The KYC onboarding system does not exist in a vacuum -- it is shaped by a steady stream of regulatory circulars from SEBI (Securities and Exchange Board of India), RBI (Reserve Bank of India), NPCI (National Payments Corporation of India), and MeitY (Ministry of Electronics and Information Technology). Every major feature in the system traces back to a specific circular: DDPI (Demat Debit and Pledge Instruction) exists because of a 2022 SEBI circular, dual KRA-CKYC upload became mandatory because of a 2024 circular, and so on.

This page is the master reference for those circulars. When you need to understand why the system works a certain way, or when a compliance officer asks "which circular requires this?", start here.

:::danger[Disclaimer]
This documentation was generated using **Claude Code**, an AI-powered LLM by Anthropic. Circular numbers, dates, and descriptions may contain inaccuracies due to AI hallucination. **Always verify against the official SEBI, RBI, and NPCI websites** before making any compliance decisions. Links to official sources are provided where available.
:::

:::tip[How to use this table]
The "Impact" column tells you what each circular changed in practical terms. If you are investigating a specific feature, scan the Impact column to find the relevant circular, then use the circular number to look up the full text on the SEBI website.
:::

## SEBI — KYC & Client Onboarding

These circulars directly govern how customers are identified, verified, and onboarded.

| # | Topic | Circular | Date | Impact |
|---|-------|---------|------|--------|
| 1 | **KYC Master Circular** | [SEBI/HO/MIRSD/MIRSD-SEC-2/P/CIR/2023/168](https://www.sebi.gov.in/legal/master-circulars/oct-2023/master-circular-on-know-your-client-kyc-norms-for-the-securities-market_77945.html) | Oct 2023 | Consolidated KYC norms for securities market, CERSAI templates, Part I + Part II KYC |
| 2 | **KYC Process & Technology** | [SEBI/HO/MIRSD/DOP/CIR/P/2020/73](https://www.sebi.gov.in/media/press-releases/apr-2020/sebi-eases-the-know-your-client-kyc-process-by-enabling-online-kyc-use-of-technology-app-by-the-registered-intermediary_46612.html) | Apr 2020 | Enabled online KYC, Aadhaar OTP e-KYC, Video In-Person Verification (VIPV), DigiLocker-based document fetch. IPV/VIPV exempted when Aadhaar authentication or DigiLocker is used |
| 3 | **KYC Validation by KRAs** | SEBI/HO/MIRSD/DoP/P/CIR/2022/46 | Apr 2022 | Framework for validation of KYC records by KRAs — defines "Registered" vs "Validated" status |
| 4 | **KYC Simplification** | [SEBI/HO/MIRSD/FATF/P/CIR/2023/0144](https://www.sebi.gov.in/legal/circulars/aug-2023/simplification-of-kyc-process-and-rationalisation-of-risk-management-framework-at-kras_75250.html) | Aug 2023 | Simplified KYC process, rationalized risk management at KRAs based on stakeholder feedback |
| 5 | **PAN-Aadhaar Linking Relaxation** | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/41 | May 2024 | Removed mandatory PAN-Aadhaar linking for "KYC Registered" status. Clients without linkage can transact with existing intermediary but KYC not portable |
| 6 | **KRA Upload to CKYC** | [SEBI/HO/MIRSD/SECFATF/P/CIR/2024/79](https://www.sebi.gov.in/legal/circulars/jun-2024/uploading-of-kyc-information-by-kyc-registration-agencies-kras-to-central-kyc-records-registry-ckycrr-_84006.html) | Jun 2024 | Mandatory CKYC upload by KRAs from Aug 1, 2024. Existing records to be uploaded within 6 months. New records within 7 days of receipt |
| 7 | **FATCA/CRS at KRAs** | [SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12](https://www.sebi.gov.in/legal/circulars/feb-2024/centralization-of-certifications-under-foreign-account-tax-compliance-act-fatca-and-common-reporting-standard-crs-at-kyc-registration-agencies-kras-_81583.html) | Feb 2024 | Centralization of FATCA/CRS certifications at KRAs. Mandatory upload by intermediaries from Jul 1, 2024. Existing certifications within 90 days |
| 8 | **KYC Onboarding Consultation** | [SEBI Consultation Paper](https://www.sebi.gov.in/reports-and-statistics/reports/jan-2026/consultation-paper-for-simplification-of-client-on-boarding-and-rationalisation-of-risk-management-framework-at-kyc-registration-agencies_99103.html) | Jan 2026 | Proposes centralized supplementary info at KRA level, 5-year periodic review, removal of mobile re-verification, simplified address verification. Comments due Feb 6, 2026 |

## SEBI — AML/CFT & Due Diligence

| # | Topic | Circular | Date | Impact |
|---|-------|---------|------|--------|
| 9 | **AML/CFT Master Circular** | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/78 | Jun 2024 | Updated Anti-Money Laundering / Combating Financing of Terrorism standards. Supersedes Feb 2023 guidelines. Aligned with FATF standards |
| 10 | **Beneficial Ownership Thresholds** | SEBI AML/CFT Guidelines 2024 | Jun 2024 | Lowered beneficial ownership thresholds from 25%/15% to 10% for both companies and partnerships. Enhanced due diligence for PEPs (Politically Exposed Persons) and special category clients |

## SEBI — Stock Broker Regulations & Operations

| # | Topic | Circular | Date | Impact |
|---|-------|---------|------|--------|
| 11 | **Stock Brokers Master Circular** | [SEBI/HO/MIRSD/MIRSD-PoD/P/CIR/2025/90](https://www.caalley.com/acts_reg/sebiacts/mc/1750158789381.pdf) | Jun 2025 | Consolidated broker operations — incorporates all circulars up to Mar 31, 2025 |
| 12 | **Stock Brokers Regulations 2026** | [SEBI/LAD-NRO/GN/2026/291](https://www.sebi.gov.in/legal/regulations/jan-2026/securities-and-exchange-board-of-india-stock-brokers-regulations-2026_98974.html) | Jan 7, 2026 | **Replaces 1992 regulations entirely.** New registration requirements (2 years experience), resident director mandate, cross-regulatory activities permitted |
| 13 | **DDPI replacing POA** | SEBI/HO/MIRSD/DoP/P/CIR/2022/44 | Apr 2022 | DDPI (Demat Debit and Pledge Instruction) mandatory from Nov 2022. Replaces Power of Attorney. DDPI is optional for clients |
| 14 | **Client Fund Upstreaming** | SEBI/HO/MIRSD/MIRSD-PoD-1/P/CIR/2023/84 | Jun 2023 | No client funds retained by brokers on EoD basis. All funds upstreamed to Clearing Corporations as cash, FDR lien, or MF Overnight pledge. Effective Jul 1, 2023 |
| 15 | **Running Account Settlement** | SEBI/HO/MIRSD circular | Jan 2024 | Quarterly/monthly settlement of client running accounts. Free balance credited to registered primary bank on first Friday of quarter |
| 16 | **UCC-Demat Mapping** | SEBI/HO/MIRSD/DOP/CIR/P/2019/136 | Nov 2019 | Mandatory mapping of UCC (Unique Client Code) with demat account at exchanges |

## SEBI — Nomination & Investor Services

| # | Topic | Circular | Date | Impact |
|---|-------|---------|------|--------|
| 17 | **Nomination Revamp** | [SEBI/HO/OIAE/OIAE_IAD-3/P/CIR/2025/01650](https://www.sebi.gov.in/legal/circulars/jan-2025/circular-on-revise-and-revamp-nomination-facilities-in-the-indian-securities-market_90698.html) | Jan 10, 2025 | Up to 10 nominees with percentage allocation. Video verification for opt-out. Effective Mar 1, 2025 |
| 18 | **Nomination Amendments** | [SEBI circular](https://www.sebi.gov.in/legal/circulars/feb-2025/amendments-and-clarifications-to-circular-dated-january-10-2025-on-revise-and-revamp-nomination-facilities-in-the-indian-securities-market_92377.html) | Feb 28, 2025 | Amendments and clarifications to the Jan 10, 2025 nomination circular |
| 19 | **DigiLocker for Holdings** | [SEBI/HO/OIAE/OIAE_IAD-3/P/CIR/2025/32](https://www.sebi.gov.in/legal/circulars/mar-2025/harnessing-digilocker-as-a-digital-public-infrastructure-for-reducing-unclaimed-assets-in-the-indian-securities-market_92769.html) | Mar 19, 2025 | Investors can fetch demat holdings and CAS via DigiLocker. Data Access Nominees supported. Effective Apr 1, 2025 |
| 20 | **Online Dispute Resolution** | [SEBI ODR Master Circular](https://www.sebi.gov.in/legal/master-circulars/dec-2023/master-circular-for-online-resolution-of-disputes-in-the-indian-securities-market_80236.html) | Dec 2023 | SMART ODR Portal for investor complaints. Stock exchanges, clearing corps, depositories covered. Direct arbitration for claims over Rs 10 crore |

## SEBI — Market Infrastructure & Settlement

| # | Topic | Circular | Date | Impact |
|---|-------|---------|------|--------|
| 21 | **UPI Block Mechanism** | [SEBI Consultation Paper](https://www.sebi.gov.in/reports-and-statistics/reports/aug-2024/consultation-paper-on-the-facility-for-trading-in-the-secondary-market-using-upi-block-mechanism-to-be-mandatorily-offered-by-qualified-stock-brokers-qsbs-to-their-clients-asba-like-facility-for-_86226.html) | Aug 2024 | QSBs must offer UPI block mechanism or 3-in-1 account from Feb 1, 2025. Funds stay in customer bank (ASBA-like for secondary market) |
| 22 | **T+0 Settlement** | [SEBI/HO/MRD/MRD-PoD-3/P/CIR/2024/20](https://www.sebi.gov.in/legal/circulars/mar-2024/introduction-of-beta-version-of-t-0-rolling-settlement-cycle-on-optional-basis-in-addition-to-the-existing-t-1-settlement-cycle-in-equity-cash-markets_82455.html) | Mar 2024 | Optional T+0 settlement for equity cash segment. Beta with 25 scrips from Mar 28, 2024. Expanded to top 500 stocks via Dec 2024 circular |
| 23 | **T+0 Expansion** | [SEBI Dec 2024 Circular](https://www.sebi.gov.in/legal/circulars/dec-2024/enhancement-in-the-scope-of-optional-t-0-rolling-settlement-cycle-in-addition-to-the-existing-t-1-settlement-cycle-in-equity-cash-markets_89443.html) | Dec 2024 | Enhanced scope to top 500 stocks. Phased rollout from Jan 31, 2025 (100 stocks/month). Block deals: 8:45-9:00 AM window |
| 24 | **AA for Depositories** | SEBI/HO/MRD/DCAP/P/CIR/2022/110 | Aug 2022 | CDSL/NSDL as FIPs (Financial Information Providers) in Account Aggregator ecosystem |
| 25 | **e-KYC Setu (NPCI)** | SEBI press release | Jun 2025 | Aadhaar e-KYC without sharing Aadhaar number, via NPCI e-KYC Setu. No AUA/KUA license required |

## RBI Circulars

| # | Topic | Circular | Date | Impact |
|---|-------|---------|------|--------|
| 26 | **Account Aggregator Master Direction** | [RBI/DNBR/2016-17/46](https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx?id=10598) | Sep 2016 (updated Sep 2024) | Master direction for NBFC-Account Aggregators. Min net owned fund Rs 2 crore. Consent-based data sharing only. 14 operating AAs, 90+ FIPs live |
| 27 | **UPI AutoPay Limit Increase** | RBI/2023-2024/88 | Dec 2023 | Increased UPI AutoPay AFA-free limit from Rs 15,000 to Rs 1,00,000 for MCC 6211 (securities brokers). Enables higher-value SIP mandates |
| 28 | **e-Mandate Recurring Payments** | RBI e-mandate framework | Updated 2024-25 | 24-48 hour pre-notification required. UPI PIN for creation/modification. Max 4 attempts per mandate (1 original + 3 retries). Non-peak execution slots |
| 29 | **Payment Aggregator Directions** | RBI Master Direction 2025 | Sep 2025 | Regulation of Payment Aggregators. Applicable to brokers using PA services for client fund collection |

## NPCI Circulars

| # | Topic | Circular | Date | Impact |
|---|-------|---------|------|--------|
| 30 | **UPI AutoPay Enhancement** | [NPCI/UPI/OC-151A](https://www.npci.org.in/PDF/npci/upi/circular/2023/UPI-OC-151A-Enhancement-of-Limits-for-UPI-AutoPay.pdf) | Dec 2023 | Implementation of RBI's Rs 1 lakh limit for MCC 6012, 6211. Securities brokers can process mandates up to Rs 1,00,000 without additional factor authentication |
| 31 | **e-KYC Setu System** | [NPCI e-KYC Setu](https://www.npci.org.in/product/e-kyc-services/e-kyc-setu-system) | 2024 | Aadhaar e-KYC without AUA/KUA license via NPCI. Enables identity verification without sharing Aadhaar number |

## Data Protection & Privacy

| # | Topic | Circular | Date | Impact |
|---|-------|---------|------|--------|
| 32 | **DPDP Act 2023** | [Digital Personal Data Protection Act](https://www.meity.gov.in/static/uploads/2024/06/2bf1f0e9f04e6fb4f8fef35e82c42aa5.pdf) | Aug 2023 | India's first comprehensive data protection statute. Consent-based processing, purpose limitation, data minimisation. Applies to all digital personal data processing |
| 33 | **DPDP Rules 2025** | [Gazette Notification](https://dpdpa.com/DPDP_Rules_2025_English_only.pdf) | Nov 13, 2025 | Operationalized DPDP Act. Stage 1 (Nov 2025): Data Protection Board. Stage 2 (Nov 2026): Consent Manager registration. Stage 3 (May 2027): Full compliance — notice, security, breach notification, Data Principal rights |

## Exchange-Specific Circulars

| # | Topic | Circular | Date | Impact |
|---|-------|---------|------|--------|
| 34 | **NSE UCC Format** | NSE/ISC/61817 | Apr 2024 | New UCC registration format effective Jul 15, 2024. REST API + pipe-delimited batch (max 10K records) |
| 35 | **BSE UCC Revision** | BSE Notice | Jan 2024 | Revised UCC format. 3-param PAN verification (PAN+Name+DOB). Max 30K records batch |
| 36 | **NSDL UDiFF Format** | NSDL circular | Mar 2024 | Unified Data interchange File Format — ISO-tagged format replacing older positional files |
| 37 | **NSDL Master Circular 2025** | [NSDL Participants Master Circular](https://nsdl.co.in/downloadables/pdf/Master_circular_to_participants_march_2025.pdf) | Mar 2025 | Consolidated master circular for depository participants |

:::caution
The SEBI Stock Brokers Regulations 2026 (row 12) are a fundamental overhaul that replaced the 1992 regulations entirely. Many references in older vendor documentation and KRA specifications still cite the 1992 regulations. When you encounter a citation to "SEBI (Stock Brokers and Sub-Brokers) Regulations, 1992," be aware that these have been superseded.
:::

:::note
Circular numbers and dates may change as SEBI issues amendments. Always verify against the [SEBI website](https://www.sebi.gov.in/sebiweb/home/HomeAction.do?doListing=yes&sid=1&ssid=7&smid=0) for the latest version of any circular before making compliance decisions.
:::

## Official Regulatory Portals

Use these portals to verify circulars and access the latest updates.

| Regulator | Portal | What You'll Find |
|-----------|--------|------------------|
| SEBI Circulars | [sebi.gov.in/circulars](https://www.sebi.gov.in/sebiweb/home/HomeAction.do?doListing=yes&sid=1&ssid=7&smid=0) | All circulars searchable by date and topic |
| SEBI Master Circulars | [sebi.gov.in/master-circulars](https://www.sebi.gov.in/sebiweb/home/HomeAction.do?doListing=yes&sid=1&ssid=6&smid=0) | Consolidated circulars by intermediary type |
| SEBI Regulations | [sebi.gov.in/regulations](https://www.sebi.gov.in/sebiweb/home/HomeAction.do?doListing=yes&sid=1&ssid=3&smid=0) | Acts and regulations (including 2026 Stock Brokers Regs) |
| SEBI KYC FAQs | [sebi.gov.in/faq](https://www.sebi.gov.in/sebi_data/faqfiles/may-2024/1715694256793.pdf) | Official FAQ on KYC norms (May 2024) |
| RBI Master Directions | [rbi.org.in/master-directions](https://rbi.org.in/scripts/bs_viewmasterdirections.aspx) | All master directions including AA framework |
| NPCI UPI Circulars | [npci.org.in/upi/circular](https://www.npci.org.in/what-we-do/upi/circular) | UPI operating circulars and limits |
| MeitY DPDP | [meity.gov.in](https://www.meity.gov.in/) | Digital Personal Data Protection Act and Rules |

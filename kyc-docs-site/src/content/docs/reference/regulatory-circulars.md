---
title: Regulatory Circulars
description: Every SEBI, RBI, and NPCI circular that shapes this system — 15+ regulatory references with dates and their impact on the onboarding flow.
---

The KYC onboarding system does not exist in a vacuum -- it is shaped by a steady stream of regulatory circulars from SEBI (Securities and Exchange Board of India), RBI (Reserve Bank of India), and NPCI (National Payments Corporation of India). Every major feature in the system traces back to a specific circular: DDPI (Demat Debit and Pledge Instruction) exists because of a 2022 SEBI circular, dual KRA-CKYC upload became mandatory because of a 2024 circular, and so on.

This page is the master reference for those circulars. When you need to understand why the system works a certain way, or when a compliance officer asks "which circular requires this?", start here.

:::tip[How to use this table]
The "Impact" column tells you what each circular changed in practical terms. If you are investigating a specific feature, scan the Impact column to find the relevant circular, then use the circular number to look up the full text on the SEBI website.
:::

## Circular Reference Table

| # | Topic | Circular | Date | Impact |
|---|-------|---------|------|--------|
| 1 | KYC Master Circular | SEBI/HO/MIRSD/MIRSD-SEC-2/P/CIR/2023/168 | Oct 2023 | Consolidated KYC norms, CERSAI templates |
| 2 | AML/CFT Guidelines | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/78 | Jun 2024 | Anti-Money Laundering / Combating the Financing of Terrorism standards |
| 3 | FATCA/CRS at KRAs | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 | Feb 2024 | Mandatory FATCA (Foreign Account Tax Compliance Act) upload to KRA from Jul 2024 |
| 4 | KRA Upload to CKYC | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/79 | Jun 2024 | Mandatory CKYC (Central KYC) upload from Aug 2024 |
| 5 | DDPI replacing POA | SEBI/HO/MIRSD/DoP/P/CIR/2022/44 | Apr 2022 | DDPI mandatory from Nov 2022 |
| 6 | Nomination Revamp | SEBI circular | Jan 2025 | Up to 10 nominees, video opt-out |
| 7 | DigiLocker for Assets | SEBI/HO/OIAE/OIAE_IAD-3/P/CIR/2025/32 | Mar 2025 | Demat statements in DigiLocker |
| 8 | Stock Brokers Master | SEBI/HO/MIRSD/MIRSD-PoD/P/CIR/2025/90 | Jun 2025 | Consolidated broker operations |
| 9 | e-KYC Setu (NPCI) | SEBI press release | Jun 2025 | Aadhaar e-KYC without sharing Aadhaar number |
| 10 | AA for Depositories | SEBI/HO/MRD/DCAP/P/CIR/2022/110 | Aug 2022 | CDSL/NSDL as FIPs (Financial Information Providers) in AA (Account Aggregator) ecosystem |
| 11 | DPDP Act 2023 | DPDP Rules 2025 | May 2027 deadline | Consent management, data rights |
| 12 | UPI AutoPay Rs.1L | RBI/2023-2024/88 (NPCI) | Dec 2023 | Securities brokers (MCC 6211): Rs.1 lakh autopay limit |
| 13 | UPI Block (ASBA Secondary) | SEBI consultation paper | Feb 2025 | QSBs (Qualified Stock Brokers) must offer UPI block mechanism. Funds stay in customer bank. |
| 14 | Stock Brokers Regulations 2026 | Notified Jan 7, 2026 | Jan 2026 | Replaces 1992 regulations entirely. Allows cross-regulatory activities. |
| 15 | DigiLocker for Holdings | SEBI/HO/OIAE/OIAE_IAD-3/P/CIR/2025/32 | Mar 2025 | Investors can fetch demat holdings via DigiLocker. Effective Apr 2025. |

:::caution
The SEBI Stock Brokers Regulations 2026 (row 14) are a fundamental overhaul that replaced the 1992 regulations entirely. Many references in older vendor documentation and KRA specifications still cite the 1992 regulations. When you encounter a citation to "SEBI (Stock Brokers and Sub-Brokers) Regulations, 1992," be aware that these have been superseded.
:::

:::note
Circular numbers and dates may change as SEBI issues amendments. Always verify against the SEBI website for the latest version of any circular before making compliance decisions.
:::

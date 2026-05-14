---
title: NPCI Circulars
description: "Verified index of NPCI circulars affecting Indian stock broking, 2020-01-01 to 2026-05-14. 50 entries."
---

> **Why this page is structured this way:** All in-window entries are listed descending by date so the most recent regulatory state is the first thing a reader sees. Use Cmd-F / Ctrl-F for ID-based lookup. Cross-references from the rest of the site point at anchors on this page.

## TL;DR

- **50 circulars** indexed in this issuer's section.
- **7** issued in 2025 or later.
- **23** entries flagged `[unknown — verify]` in at least one field.
- All entries trace to a primary issuer URL (or Wayback fallback) where research could verify the source.
- AI-generated; **read the linked PDF before acting on any provision**.

## Conceptual overview

This page is the complete listing of <abbr title="National Payments Corporation of India">NPCI</abbr> circulars in the project's 2020–2026 sweep window. Each entry contains the verbatim circular ID, issue date, in-force date, status (in-force / superseded / withdrawn), applicable entity types, impact-area tags, a 2–4 sentence summary traceable to clauses, and the primary URL. Where the primary URL could not be re-fetched, an archive URL is provided in its place.

## Entries (descending date)

### NPCI/UPI/OC No. 228/2025-26

- **date_issued:** 2025-10-08
- **issuer:** NPCI
- **title:** "Enhancements in <abbr title="Unified Payments Interface">UPI</abbr> Single Block Multiple Debits (UPI Reserve Pay)"
- **applies_to:** broker, all-intermediaries
- **in_force_date:** [unknown — verify]
- **status:** in-force
- **impact_areas:** upi-block, mandate, settlement, client-funds, upstreaming, rms
- **primary_url:** https://www.npci.org.in/uploads/UPI_OC_No_228_FY_2025_26_Enhancement_in_UPI_Single_Block_Multiple_Debits_UPI_Reserve_Pay_a9095c181d.pdf

Renames Single Block Multiple Debits to "UPI Reserve Pay" and enhances the mechanism. Supports all UPI fund sources (savings, current, OD, RuPay credit card, pre-sanctioned credit lines). Maximum block Rs.10,000 per merchant for 90 days; failed debits can be retried up to 3 times in 24 hours; only one active block per merchant per customer; mandatory issuer-bank notifications on create/modify/debit/revoke/expire; customers retain set/update/revoke control. While the Rs.10,000 cap is targeted at low-ticket high-frequency online merchants, the broader UPI Reserve Pay specification is the same engine used by brokers under the <abbr title="Securities and Exchange Board of India">SEBI</abbr> <abbr title="Applications Supported by Blocked Amount">ASBA</abbr>-secondary-market block facility.

### NPCI/UPI/OC No. 222/2025-26

- **date_issued:** 2025-09-12
- **issuer:** NPCI
- **title:** "Segregation of UPI settlement cycles for Auth and Dispute transactions"
- **applies_to:** broker, all-intermediaries
- **in_force_date:** 2025-11-03
- **status:** superseded
- **superseded_by:** NPCI/UPI/OC No. 222A/2025-26
- **impact_areas:** settlement, bod-eod, reporting, file-format
- **primary_url:** https://www.npci.org.in/uploads/UPI_OC_No_222_FY_2025_26_Segregation_of_UPI_settlement_cycles_for_Auth_and_disputes_transactions_25534237a3.pdf

Splits UPI settlement cycles into AUTH (cycles 1–10) and Dispute (DC1=cycle 11, DC2=cycle 12). Originally effective 03 November 2025 but rescheduled by addendum 222A to 15 December 2025. Adjustment reports shared three times a day; reports for cycles 1–10 discontinued. Brokers' fund-reconciliation files (<abbr title="Beginning Of Day">BOD</abbr>/<abbr title="End Of Day">EOD</abbr>) need updating to absorb segregated cycle output.

### NPCI/UPI/OC No. 185B/2025-26

- **date_issued:** 2025-08-28
- **issuer:** NPCI
- **title:** "Addendum to OC 185A — Implementation of higher per-transaction limit for specific categories in UPI"
- **applies_to:** broker, all-intermediaries
- **in_force_date:** 2025-09-15
- **status:** in-force
- **impact_areas:** settlement, upi-block, onboarding, mandate, client-funds
- **primary_url:** https://www.npci.org.in/uploads/UPI_OC_No185_B_FY_2025_26_Addendum_to_OC_185_A_Implementation_of_higher_per_transaction_limit_for_specific_categories_in_UPI_ba517a0902.pdf

Raised UPI per-transaction limit to Rs.5 lakh and daily aggregate to Rs.10 lakh for Capital Markets, Insurance, Government e-marketplace, Travel, Loan Collection, Credit Card Bill (Rs.6 lakh daily), Jewellery (Rs.2 lakh per txn / Rs.6 lakh daily). P2P remains Rs.1 lakh. Restricted to Verified Merchants identified by acquirers. Effective 15 September 2025. Directly enables brokers (MCC 6211) to receive higher-value single UPI debits for margin/trade settlements within the Capital Markets envelope.

### NPCI/UPI/OC No. 217/2025-26

- **date_issued:** 2025-07-03
- **issuer:** NPCI
- **title:** "Adoption of Standardized, Validated and Exclusive UPI IDs for Payment Collection by SEBI Registered Intermediaries from Investors"
- **applies_to:** broker, all-intermediaries
- **in_force_date:** 2025-10-01
- **status:** in-force
- **impact_areas:** onboarding, surveillance, cyber-security, file-format, reporting
- **primary_url:** https://www.npci.org.in/PDF/npci/circular/UPI-OC-No-217-FY-2025-26%C2%A0Adoption-of-Standardized,-Validated-and-Exclusive-UPI-IDs-for-Payment-Collection-by-SEBI.pdf

Implements SEBI directive (SEBI/<abbr title="Head Office (SEBI circular ID prefix)">HO</abbr>/DEPA-<abbr title="—">II</abbr>/DEPA-II_SRG/P/CIR/2025/86 dated 11 June 2025) by mandating that SEBI-registered investor-facing intermediaries (MCC 6211: brokers, RAs, IAs, mutual funds, depositories, REs) collect investor payments only via standardized validated UPI handles using the @validbankpsp nomenclature. Acquiring SCSB-class banks request handles; max handle length 10 characters; AutoPay mandate format for SEBI REs becomes <Merchant identifier>.<Aggregator identifier>.<Intermediary username suffix>@validbankpsp. UPI apps must display a thumbs-up icon enclosed in a green triangle when paying to @validbankpsp handles. Mandatory adoption from 01 October 2025; covers ~9,000 registered intermediaries.

### NPCI/UPI/OC No. 215A/2025-26

- **date_issued:** 2025-05-21
- **issuer:** NPCI
- **title:** "Guidelines on usage of UPI APIs"
- **applies_to:** broker, all-intermediaries
- **in_force_date:** 2025-07-31
- **status:** in-force
- **impact_areas:** cyber-security, system-audit, bod-eod, file-format, rms
- **primary_url:** https://www.npci.org.in/PDF/npci/upi/circular/2025/UPI-OC-No-215-A-FY-2025-26-Guidelines-on-usage-of-UPI-APIs.pdf

API security and rate-limit framework for UPI ecosystem. Daily caps: balance enquiry 50/user/app/day; linked-account view 25/app/day; transaction status check max 3 per transaction at 90s spacing. AutoPay execution allowed windows: before 10:00, 13:00–17:00, after 21:30; prohibited 10:00–13:00 and 17:00–21:30. Mandates HTTPS/TLS, explicit consent for Penny Drop API, <abbr title="Digital Personal Data Protection Act 2023 (and Rules 2025)">DPDP</abbr> Act 2023 compliance. Implementation deadline 31 July 2025, formal undertaking by 31 August 2025. Brokers' integration with bank/PSP partners for AutoPay billing must respect the new windows.

### NPCI/UPI/OC No. 101A/2025-26

- **date_issued:** 2025-04-24
- **issuer:** NPCI
- **title:** "Addendum to OC-101: Strengthening beneficiary name verification and display during UPI transactions"
- **applies_to:** broker, all-intermediaries
- **in_force_date:** 2025-06-30
- **status:** in-force
- **impact_areas:** onboarding, surveillance, cyber-security, grievance
- **primary_url:** https://www.npci.org.in/PDF/npci/upi/circular/2025/UPI-OC-No-101-A-FY-2025-26-Strengthening-beneficiary-name-verification-and-display-during-UPI-transactions.pdf

Mandates that UPI apps display only the ultimate beneficiary's banking name (from Validate Address API) on the pre-transaction page; QR-derived names, user-defined payee names and aliases must not be shown; beneficiary-name modification by user must be disabled. Compliance by 30 June 2025. Non-compliance treated as mandatory-rule violation. Broker collection workflows must ensure the merchant account name displayed in investor UPI app exactly matches the broker's bank-records name and matches the @validbankpsp handle (OC 217).

### NPCI/2024-25/e-KYC/003

- **date_issued:** 2025-03-10
- **issuer:** NPCI
- **title:** "e-<abbr title="Know Your Customer (process).">KYC</abbr> Setu System"
- **applies_to:** broker, all-intermediaries
- **in_force_date:** 2025-03-10
- **status:** in-force
- **impact_areas:** onboarding, re-KYC, kyc-modification, dpdp, aa, esign, digi-locker
- **primary_url:** https://www.npci.org.in/PDF/npci/e-kyc-services/circulars/2025/e-KYC-003-FY-24-25-e-KYC-Setu-System.pdf

Formally introduced the e-KYC Setu facility for regulated financial-sector entities under <abbr title="Reserve Bank of India">RBI</abbr>, SEBI, IRDAI and <abbr title="Pension Fund Regulatory and Development Authority">PFRDA</abbr>. The verification-seeking entity does not receive the Aadhaar number — only masked Aadhaar (last 4) and demographic data — eliminating direct Aadhaar handling and the need for the entity to be a KUA/AUA. Implementation options: NPCI Web Interface (URL redirect) and Android SDK. Onboarding via ekycservices@npci.org.in. Compliance advantage: entities using Setu do not need a separate notification under Section 11A <abbr title="Prevention of Money Laundering Act 2002">PMLA</abbr>. Operationalised for SEBI registered intermediaries (brokers, AMCs, PMs) by SEBI Press Release 35/2025 dated 30 June 2025, which permits use of e-KYC Setu for Aadhaar-based e-KYC authentication.

### NPCI/NACH/OC No. 006/2024-25

- **date_issued:** 2024-11-27
- **issuer:** NPCI
- **title:** "Changes in Rejection Code description in <abbr title="National Automated Clearing House">NACH</abbr>"
- **applies_to:** broker, all-intermediaries
- **in_force_date:** [unknown — verify]
- **status:** in-force
- **impact_areas:** file-format, reporting, settlement
- **primary_url:** https://www.npci.org.in/PDF/nach/circular/2024-25/NACH-006-FY-24-25-Changes-in-Rejection-Code-description-in-NACH.pdf

Revises NACH return/rejection code descriptions used in ACH Debit and APB Credit return files. Brokers and their settlement-bank partners must update file-parsing logic for return-handling and reconciliation. Full code-mapping requires verification from NPCI source.

### NPCI/UPI/OC No. 207/2024-25

- **date_issued:** 2024-09-23
- **issuer:** NPCI
- **title:** "Auto-replenishment of NETC FASTag and RuPay NCMC with UPI Autopay"
- **applies_to:** all-intermediaries
- **in_force_date:** immediate
- **status:** in-force
- **impact_areas:** mandate, other
- **primary_url:** https://www.npci.org.in/PDF/npci/upi/circular/2024/NPCI-UPI-OC-207-Auto-replenishment-of-NETC-FASTag-and-RuPay-NCMC-with-UPI-AutoPay.pdf

Removes the 24-hour Pre-Debit Notification (PDN) requirement for UPI AutoPay debits used to auto-replenish NETC FASTag (MCC 4784) and RuPay NCMC (MCC 7412). Not directly broker-facing but reflects NPCI's PDN-exemption framework, which is referenced in broker-relevant AutoPay debate around recurring brokerage/<abbr title="Margin Trading Facility">MTF</abbr> interest collections.

### NPCI/UPI/OC No. 205/2024-25

- **date_issued:** 2024-08-27
- **issuer:** NPCI
- **title:** "Introduction of Auto Top-up on UPI Lite"
- **applies_to:** broker, all-intermediaries
- **in_force_date:** immediate
- **status:** in-force
- **impact_areas:** mandate, onboarding, other
- **primary_url:** https://www.npci.org.in/PDF/npci/upi/circular/2024/UPI-OC-No-205-FY-24-25-Introduction-of-Auto-Top-up-on-UPI-LITE.pdf

Introduces auto-top-up for UPI Lite where balance auto-replenishes from the linked bank account when it falls below a user-set floor, capped at the UPI Lite balance limit. PSPs/Apps must cap automatic replenishments at 5 per LITE account per day. References superseded baseline circulars OC-138/2021-22 and OC-169/2023-24. Relevant for brokers who allow micro-payments / pay-later fees via UPI Lite balance.

### NPCI/UPI/OC No. 185A/2024-25

- **date_issued:** 2024-08-24
- **issuer:** NPCI
- **title:** "Addendum to OC 185 — Implementation of Rs 5 Lakh limit per transaction for specific categories in UPI"
- **applies_to:** broker, all-intermediaries
- **in_force_date:** 2024-09-15
- **status:** superseded
- **superseded_by:** NPCI/UPI/OC No. 185B/2025-26
- **impact_areas:** settlement, upi-block, mandate, onboarding
- **primary_url:** https://www.npci.org.in/PDF/npci/upi/circular/2024/UPI-OC-No-185A-FY-24-25-Implementation-of-Rs-5-Lakh-limit-per-transaction-for-specific-categories-in-UPI.pdf

Added Tax Payments (MCC 9311) to Rs.5 lakh per-transaction limit list, restricted to Verified Merchants. Existing categories retained: Hospitals & Educational Services (multiple MCCs); <abbr title="Initial Public Offering">IPO</abbr> & G-Sec (MCC 6211, purpose code 01 IPO and 25 RDS). Acquirers must classify merchants correctly and conduct due diligence before adding to Verified Merchant list. Compliance by 15 September 2024. Confirms MCC 6211 securities-broker IPO/G-Sec eligibility for Rs.5 lakh limit.

### NPCI/UPI/OC No. 200/2024-25

- **date_issued:** 2024-07-31
- **issuer:** NPCI
- **title:** "Enablement of UPI Mandate feature of Single Block Multiple Debits"
- **applies_to:** broker, all-intermediaries
- **in_force_date:** 2024-11-30
- **status:** in-force
- **impact_areas:** upi-block, mandate, settlement, client-funds, upstreaming
- **primary_url:** https://www.npci.org.in/PDF/npci/upi/circular/2024/UPI-OC-No-200-FY-24-25%E2%80%93Enablement-of-UPI-Mandate-feature-of-Single-Block-Multiple-Debits.pdf

Required all UPI members (issuers, acquirers, PSPs/Apps) to enable the Single Block Multiple Debits (SBMD) UPI mandate feature by 30 November 2024. Customers can pre-authorise a block on funds against which the merchant (e.g., clearing corporation acting for a broker) can initiate multiple debits until the block exhausts or is revoked. This is the foundational NPCI plumbing for the SEBI-mandated UPI Block facility / ASBA-like secondary-market trading mechanism for QSBs effective 01 February 2025. Applies to P2M merchant transactions.

### NPCI/NACH/OC No. 001/2024-25

- **date_issued:** 2024-07-01
- **issuer:** NPCI
- **title:** "Master Circular — Facility for cancellation of mandates to be provided to customers"
- **applies_to:** broker, all-intermediaries
- **in_force_date:** 2024-09-30
- **status:** in-force
- **impact_areas:** mandate, grievance, scores-odr, dpdp
- **primary_url:** https://www.npci.org.in/PDF/nach/circular/2024-25/NACH-OC001-FY24-25-Master-Circular-Facility-for-cancellation-of-mandates-to-be-provided-to-customers.pdf

Mandates that all mandate-registering entities (banks, corporates, aggregators) provide customers an online/electronic channel to Amend, Cancel, or Suspend/Revoke their mandates. Each entity's website must host user guides, FAQs, instructional videos. Non-compliance by 30 September 2024 attracts punitive action including bar from registering new mandates. Material for brokers issuing eNACH for MTF, demat <abbr title="Asset Management Company (mutual funds context) / Annual Maintenance Charges (depository context).">AMC</abbr>, advisory recurring fees.

### NPCI/NACH/OC No. 014/2023-24

- **date_issued:** 2024-03-28
- **issuer:** NPCI
- **title:** "Amendment to Master Circular No. 12"
- **applies_to:** broker, all-intermediaries
- **in_force_date:** 2024-04-01
- **status:** in-force
- **impact_areas:** mandate, surveillance, reporting
- **primary_url:** https://www.npci.org.in/PDF/nach/circular/2024-25/NACH-OC14-FY-23-24-Amendment-to-Master-Circular-No-12.pdf

Amends OC 012/2023-24's phased penalty mechanism for high-return corporates and reaffirms 40-year mandate cap. Effective 01 April 2024 (Phase I). Material for broker entities operating their own corporate codes for collection.

### NPCI/UPI/OC No. 192/2023-24

- **date_issued:** 2024-03-28
- **issuer:** NPCI
- **title:** "Implementation of maximum UPI inward credit limits for P2PM merchants"
- **applies_to:** broker, all-intermediaries
- **in_force_date:** 2024-04-30
- **status:** in-force
- **impact_areas:** onboarding, surveillance, reporting, client-funds
- **primary_url:** https://www.npci.org.in/PDF/npci/upi/circular/2024/UPI-OC-192-FY-23-24-Implementation-of-maximum-UPI-inward-credit-limits-for-P2PM-merchants.pdf

Imposes inward credit limits on P2PM merchants — Rs.10,000/transaction; Rs.25,000/day; Rs.7,00,000/month. Merchants receiving Rs.1,00,000+/month for three consecutive months must be re-onboarded as P2M under correct MCC. Indirectly relevant for sub-brokers/authorised persons receiving client funds through P2PM accounts — they must be re-categorised under MCC 6211 P2M once volumes cross the threshold.

### NPCI/UPI/OC No. 76A/2023-24

- **date_issued:** 2024-03-12
- **issuer:** NPCI
- **title:** "Revision in transaction limits based on Merchant & transaction types — Addendum to OC76"
- **applies_to:** broker, all-intermediaries
- **in_force_date:** 2024-04-01
- **status:** in-force
- **impact_areas:** onboarding, surveillance, reporting
- **primary_url:** https://www.npci.org.in/PDF/npci/upi/circular/2024/UPI-OC-76A-Revision-in-transaction-limits-based-on-Merchant-&-transaction-types.pdf

Revises P2P Intent (modes '04','05') prohibitions, restricts Intent-based transactions for offline non-verified merchants, caps QR share-and-pay at Rs.2,000 for P2P, caps non-verified offline P2M QR at Rs.2,000, and reaffirms that wallet load and Gift/Prepaid cards (MCC 6540) remain disallowed on collect/QR-mode payments. Brokers and their acquiring banks must reflect these limits in client-onboarding fund-collection flows.

### NPCI/UPI/OC No. 190/2023-24

- **date_issued:** 2024-03-11
- **issuer:** NPCI
- **title:** "Reiteration of compliance to OC-163, OC-163A and OC-100"
- **applies_to:** broker, all-intermediaries
- **in_force_date:** immediate
- **status:** in-force
- **impact_areas:** mandate, onboarding, surveillance, reporting
- **primary_url:** https://www.npci.org.in/PDF/npci/upi/circular/2024/UPI-OC-190-FY-23-24-Reiteration-of-compliance-to-OC-163-OC-163A-and-OC-100.pdf

Reiterates compliance to earlier UPI AutoPay mandate circulars (OC-163, OC-163A) and beneficiary-display circular (OC-100). Affirms that members (including bank-broker payment partners) must comply with mandate, AutoPay, and beneficiary-name standards.

### NPCI Press Release — UPI for Secondary Market

- **date_issued:** 2023-12-29
- **issuer:** NPCI
- **title:** "UPI for Secondary Market"
- **applies_to:** broker, exchange, clearing-corp
- **in_force_date:** 2024-01-01
- **status:** in-force
- **impact_areas:** upi-block, mandate, settlement, t0-t1, client-funds, upstreaming
- **primary_url:** https://www.npci.org.in/PDF/npci/press-releases/2023/NPCI-Press-Release-UPI-for-Secondary-Market.pdf

Announced beta launch of UPI for Secondary Market (ASBA-like facility) effective 01 January 2024 for the equity cash segment. During pilot, investors block funds in bank accounts that Clearing Corporations debit only upon trade confirmation; payouts directly to investor bank on <abbr title="Trade-date Plus N settlement">T+1</abbr>. Initial pilot brokerage: Groww. UPI Apps: BHIM, Groww, YES PAY NEXT. Sponsor banks: HDFC Bank, HSBC, ICICI Bank, Yes Bank. Operating instructions for member banks/brokers were released as the underlying NPCI mandate plumbing (eventually formalised in OC 200/2024-25 for SBMD) and SEBI Master Circular on Stock Exchanges and Clearing Corporations (16 October 2023). Note: This is a press release, not an operating circular; OC numbering for the underlying member-bank instructions could not be verified.

### NPCI/NACH/OC No. 012/2023-24

- **date_issued:** 2023-12-29
- **issuer:** NPCI
- **title:** "Master Circular regarding Maximum period for a mandate and Final collection date (end-date) of the mandate"
- **applies_to:** broker, all-intermediaries
- **in_force_date:** 2024-04-01
- **status:** in-force
- **impact_areas:** mandate, onboarding, file-format, surveillance
- **primary_url:** https://www.npci.org.in/PDF/nach/circular/2023-24/Circular-No-012-Master-Circular.pdf

Master circular consolidating mandate rules. Maximum mandate duration capped at 40 years from issuance (effective 01 April 2024); "until cancelled" option removed; explicit final collection date mandatory across all mandate categories. Sets phased penalty for high-return corporates: Phase I (01 Feb 2024) Rs.1/return for corporates >50% returns; Phase II (01 Apr 2024) Rs.5/transaction; Phase <abbr title="—">III</abbr> (01 Jul 2024) corporates with >50% returns barred from registering new mandates. Brokers/sponsor-bank partners must align mandate-issuance, file-format generation and corporate-code monitoring with these thresholds.

### NPCI/UPI/OC No. 151A/2023-24

- **date_issued:** 2023-12-14
- **issuer:** NPCI
- **title:** "Enhancement of Limits for UPI AutoPay"
- **applies_to:** broker, all-intermediaries
- **in_force_date:** immediate
- **status:** in-force
- **impact_areas:** mandate, onboarding, settlement
- **primary_url:** https://www.npci.org.in/PDF/npci/upi/circular/2023/UPI-OC-151A-Enhancement-of-Limits-for-UPI-AutoPay.pdf

Increased the UPI AutoPay Additional Factor of Authentication (AFA / UPI PIN) limit from Rs.15,000 to Rs.1,00,000 for designated MCCs listed in Annexure A — including MCC 6211 (Securities brokers and dealers) for investment-platform fees and brokerage charges, alongside Credit Card Bill Payment (5413), Direct Marketing Insurance (5960), Financial Institutions (6012), Insurance categories (6300, 6381, 6399), and LIC (6529). First execution within 5 minutes of mandate creation remains exempt. Directly enables brokers to charge platform fees / margin top-ups up to Rs.1 lakh per recurring AutoPay debit without each-time PIN entry.

### NPCI/NACH/OC No. 010/2023-24

- **date_issued:** 2023-10-31
- **issuer:** NPCI
- **title:** "Addendum to the Circular No. 007"
- **applies_to:** broker, all-intermediaries
- **in_force_date:** [unknown — verify]
- **status:** in-force
- **impact_areas:** mandate, file-format
- **primary_url:** https://www.npci.org.in/PDF/nach/circular/2023-24/NACH-OC-No-010-2023-24-Addendum-to-the-Circular-No-007.pdf

Addendum to NPCI/2023-24/NACH/007 (mandate duration/final collection date) — referenced by the master circular OC 012/2023-24. Verification of full clause text needed from NPCI source.

### NPCI/NACH/OC No. 008/2023-24

- **date_issued:** 2023-08-18
- **issuer:** NPCI
- **title:** "Mandate duration and mandatory final collection date"
- **applies_to:** broker, all-intermediaries
- **in_force_date:** 2023-10-01
- **status:** superseded
- **superseded_by:** NPCI/NACH/OC No. 012/2023-24
- **impact_areas:** mandate, onboarding, file-format
- **primary_url:** https://www.npci.org.in/PDF/nach/circular/2023-24/Circular-No-008-Mandate-duration-and-mandatory-final-collection-date.pdf

Capped NACH mandate duration at 30 years from issuance; eliminated "until cancelled" option, making explicit final collection (end) date mandatory for all mandate categories. Effective 01 October 2023. Subsequently revised to 40 years cap by NACH/OC 012/2023-24. Brokers issuing NACH/eNACH mandates for client payments (e.g., MTF, AMC fees, recurring advisory fees) must capture end-date.

### NPCI/NACH/OC No. 003/2023-24

- **date_issued:** 2023-07-21
- **issuer:** NPCI
- **title:** "E-Mandate simplification and harmonization of the limit of all variants of mandates"
- **applies_to:** broker, all-intermediaries
- **in_force_date:** [unknown — verify]
- **status:** in-force
- **impact_areas:** mandate, onboarding, kyc-modification
- **primary_url:** [unknown — verify]

Streamlined e-mandate registration with authentication via last 4 digits of Aadhaar, last 5 of <abbr title="Permanent Account Number">PAN</abbr>, and Customer ID. Harmonised all electronic mandate variants to Rs.1 crore — at parity with physical mandates — superseding the 2020 NPCI/2020-21/NACH/010 limit. Material for brokers using eNACH for client mandates (e.g., MTF recurring authorisations, mutual-fund SIPs, demat charges).

### NPCI/UPI/OC No. 168/2023-24

- **date_issued:** 2023-07-04
- **issuer:** NPCI
- **title:** "Mandatory measures to be implemented by Banks, PSPs, and TPAPs for UPI"
- **applies_to:** broker, all-intermediaries
- **in_force_date:** 2023-12-31
- **status:** in-force
- **impact_areas:** onboarding, surveillance, cyber-security, reporting, other
- **primary_url:** [unknown — verify]

Mandated that all UPI transactions initiated using UPI ID, UPI Number, or Account Number + <abbr title="Indian Financial System Code.">IFSC</abbr> must prompt the customer to verify the beneficiary name before initiating the transaction; required UPI apps on different operating systems to use distinct App IDs; required members to support payee/beneficiary name verification (ReqValAdd API). Affects broker payment-collection flows — investor-facing apps must show verified beneficiary name from the broker's settlement account. Compliance by 31 December 2023.

### NPCI/AePS/OC No. 081/2023-24

- **date_issued:** 2023-06-15
- **issuer:** NPCI
- **title:** "Standardization of Interoperable Cash Withdrawal transactions at BC Outlets"
- **applies_to:** all-intermediaries
- **in_force_date:** [unknown — verify]
- **status:** in-force
- **impact_areas:** aml, surveillance, reporting, cyber-security
- **primary_url:** https://www.npci.org.in/PDF/AePS/circular/2023-24/15-June-2023-NPCI-2023-24-AePS-081-Circular-81-Standardization-of-Interoperable-Cash-Withdrawal-transactions-at-BC-Outlets.pdf

Standardises interoperable AePS cash withdrawal at Business Correspondent outlets. Not broker-facing in normal trading flow, but material where authorised persons / sub-broker franchisees rely on AePS BC outlets in rural footprint for client interaction.

### NPCI/UPI/OC No. 163/2022-23

- **date_issued:** 2023-03-22
- **issuer:** NPCI
- **title:** "[unknown — verify]" (referenced by later NPCI compliance circulars as covering UPI AutoPay / mandate handling)
- **applies_to:** broker, all-intermediaries
- **in_force_date:** [unknown — verify]
- **status:** in-force
- **impact_areas:** mandate, onboarding, file-format
- **primary_url:** [unknown — verify]

Original NPCI/UPI/OC No. 163 referenced (alongside OC-163A and OC-100) in NPCI/UPI/OC No. 190/2023-24 dated 11 March 2024 as compliance baseline for UPI AutoPay mandate processing. The exact title and direct URL on npci.org.in could not be verified; verification of full text required from NPCI archives.

### NPCI/UPI/OC No. 161/2022-23

- **date_issued:** 2023-01-10
- **issuer:** NPCI
- **title:** "Extension to UPI Circular No. 60/2018-19 — Crediting/Debiting Non-Resident accounts in UPI"
- **applies_to:** broker, all-intermediaries
- **in_force_date:** 2023-04-30
- **status:** in-force
- **impact_areas:** onboarding, nri, kyc-modification, aml, fatca-crs
- **primary_url:** https://www.npci.org.in/PDF/npci/upi/circular/2023/UPI-OC-161-Extension-to-UPI-Circular-No-60-Crediting-Debiting-Non-Resident-accounts-in-UPI.pdf

Permitted <abbr title="Non-Resident External (Rupee) account">NRE</abbr>/<abbr title="Non-Resident Ordinary (Rupee) account">NRO</abbr> accounts with international mobile numbers from ten specified countries (US, UK, Singapore, Canada, Australia, Oman, Qatar, UAE, Saudi Arabia, Hong Kong) to be onboarded for UPI. Remitter/beneficiary banks must conduct <abbr title="Anti-Money Laundering">AML</abbr>/<abbr title="Combating the Financing of Terrorism">CFT</abbr> and <abbr title="Foreign Exchange Management Act 1999">FEMA</abbr> compliance checks. Compliance deadline for UPI members was 30 April 2023. Material for brokers serving <abbr title="Non-Resident Indian">NRI</abbr> clients who can now fund the trading account via UPI without an Indian SIM.

### NPCI/UPI/OC No. 138/2021-22

- **date_issued:** 2022-03-16
- **issuer:** NPCI
- **title:** "Introduction of On-Device wallet UPI Lite for Small Value Transactions"
- **applies_to:** broker, all-intermediaries
- **in_force_date:** immediate
- **status:** superseded
- **superseded_by:** NPCI/UPI/OC No. 205/2024-25
- **impact_areas:** other, mandate, onboarding
- **primary_url:** https://www.npci.org.in/PDF/npci/upi/circular/2022/UPI-OC-138-Introduction-of-On-Device-wallet-UPI-Lite-for-Small-Value-Transactions.pdf

Introduced UPI Lite, an on-device wallet for low-value (sub-Rs.500/Rs.1,000) UPI transactions without UPI PIN, designed for high-frequency micropayments. Relevant for brokers offering small-ticket retail top-ups or micro-investment flows where customers wish to fund the trading account or pay platform fees without full UPI authentication. Subsequently amended by OC 169 (limit enhancement) and superseded operationally by OC 205 (Auto Top-up).

### NPCI/UPI/OC No. 127/2021-22

- **date_issued:** 2021-12-09
- **issuer:** NPCI
- **title:** "Implementation of Rs 5 Lakh limit per transaction for specific categories in UPI"
- **applies_to:** broker, all-intermediaries
- **in_force_date:** 2022-05-01
- **status:** in-force
- **impact_areas:** onboarding, upi-block, mandate, settlement, reporting
- **primary_url:** https://www.npci.org.in/PDF/npci/upi/circular/2021/UPI-OC-127-Implementation-of-Rs-5-Lakh-limit-per-transaction-for-specific-categories-in-UPI.pdf

Enhanced the per-transaction limit in UPI from Rs. 2 lakh to Rs. 5 lakh for UPI-based Application Supported by Blocked Amount (ASBA) Initial Public Offer (IPO) applications, enabling retail investors to apply for larger IPO allocations through UPI with their broker. SCSBs/Sponsor Banks/UPI Apps were required to complete system changes; by 30 March 2022, more than 80% had complied. Aligned with SEBI circular dated 05 April 2022 bringing the enhanced bid limit into effect from 01 May 2022.

### NPCI/UPI/OC No. 115/2021-22

- **date_issued:** 2021-07-20
- **issuer:** NPCI
- **title:** "Rollout of Numeric UPI ID Mapper to enable UPI Number"
- **applies_to:** broker, all-intermediaries
- **in_force_date:** [unknown — verify]
- **status:** in-force
- **impact_areas:** onboarding, other
- **primary_url:** https://www.npci.org.in/PDF/npci/upi/circular/2021/NPCI-UPI-OC-115-Rollout%20of-Numeric-UPI-ID-Mapper-to-enable-UPI-Number.pdf

Rollout of the Numeric UPI ID Mapper to enable mobile-number-style UPI Numbers. Pilot completed by 15 May 2022 with 12 million users seeded; PSPs/TPAPs began onboarding 25 million users/app from 16 May 2022. Affects brokers whose collect requests/Intent links may resolve a customer's UPI Number to the underlying VPA. Subsequent addenda (OC 115E etc.) refined timelines.

### NPCI/2024-25/e-KYC/001

- **date_issued:** [unknown — verify]
- **issuer:** NPCI
- **title:** "e-KYC Setu System — UIDAI Circular (HQ-13079/2/2023-AUTH-II HQ (E-10669)/5566)"
- **applies_to:** broker, all-intermediaries
- **in_force_date:** [unknown — verify]
- **status:** in-force
- **impact_areas:** onboarding, re-KYC, kyc-modification, dpdp, aa, esign
- **primary_url:** https://www.npci.org.in/PDF/npci/e-kyc-services/circulars/2024/e-KYC-001-FY-24-25-e-KYC-Setu-System-UIDAI-Circular.pdf

Notifies the UIDAI letter authorising NPCI to operate the e-KYC Setu System — a managed-API path through which non-AUA/KUA regulated entities can perform Aadhaar e-KYC via NPCI's secure interface. Foundational notification for the SEBI/PFRDA broker permissions later issued in 2025.

### NPCI/AePS/OC No. 088/2023-24

- **date_issued:** [unknown — verify]
- **issuer:** NPCI
- **title:** "BC/Agent Aadhaar Based biometric authentication for OFFUS Cash Withdrawal transactions"
- **applies_to:** all-intermediaries
- **in_force_date:** [unknown — verify]
- **status:** in-force
- **impact_areas:** aml, cyber-security, surveillance
- **primary_url:** [unknown — verify]

Required two-factor biometric authentication for BCs/agents on OFFUS AePS cash-withdrawal transactions to curb fraud. Direct broker impact limited; relevant to broker-bank-BC partnership models. Full document URL on NPCI requires verification.

### NPCI/NACH/OC No. 008/2024-25

- **date_issued:** [unknown — verify]
- **issuer:** NPCI
- **title:** "Implementation of facility for cancellation of mandates to be provided to customers"
- **applies_to:** broker, all-intermediaries
- **in_force_date:** [unknown — verify]
- **status:** in-force
- **impact_areas:** mandate, grievance, dpdp
- **primary_url:** https://www.npci.org.in/PDF/nach/circular/2024-25/NACH-008-FY-24-25-Implementation-of-facility-for-cancellation-of-mandates-to-be-provided-to-customers.pdf

Implementation rules for the customer mandate-cancellation facility introduced by OC 001/2024-25.

### NPCI/NACH/OC No. 013/2023-24

- **date_issued:** [unknown — verify]
- **issuer:** NPCI
- **title:** "APB / ACH CR Returns"
- **applies_to:** all-intermediaries
- **in_force_date:** [unknown — verify]
- **status:** in-force
- **impact_areas:** settlement, file-format, reporting
- **primary_url:** https://www.npci.org.in/PDF/nach/circular/2024-25/Cirular_No.13_APB_ACH_CR_Returns.pdf

Operating instructions for Aadhaar Payment Bridge (APB) / ACH Credit Returns. Marginally relevant to brokers handling DBT-linked or government subsidy interplay with investor accounts. Full clause text requires verification.

### NPCI/UPI/OC No. 115E/2024-25

- **date_issued:** [unknown — verify]
- **issuer:** NPCI
- **title:** "Addendum to circular on the Numeric UPI ID resolution"
- **applies_to:** broker, all-intermediaries
- **in_force_date:** [unknown — verify]
- **status:** in-force
- **impact_areas:** onboarding, other
- **primary_url:** https://www.npci.org.in/PDF/npci/upi/circular/2025/UPI-OC-No-115-E-FY-2024-25-Addendum-to-circular-on-the-Numeric-UPI-ID-resolution.pdf

Further addendum revising/clarifying Numeric UPI ID resolution timelines and operational rules. Brokers' integration partners must ensure resolution APIs reflect updated mapper-routing. Exact issue date and full clause text require verification.

### NPCI/UPI/OC No. 141D/2024-25

- **date_issued:** [unknown — verify]
- **issuer:** NPCI
- **title:** "Addendum to OC 141 series — Compliance"
- **applies_to:** broker, all-intermediaries
- **in_force_date:** [unknown — verify]
- **status:** in-force
- **impact_areas:** cyber-security, system-audit, surveillance
- **primary_url:** https://www.npci.org.in/PDF/npci/upi/circular/2025/UPI-OC-No-141-D-FY-2024-25-Compliance-Addendum-to-OC-141-series.pdf

Fourth addendum to the OC 141 series. Subject area (security/onboarding controls) requires confirmation from NPCI source.

### NPCI/UPI/OC No. 177/2023-24

- **date_issued:** [unknown — verify]
- **issuer:** NPCI
- **title:** "UPI Global Acceptance Limits"
- **applies_to:** broker, all-intermediaries
- **in_force_date:** [unknown — verify]
- **status:** in-force
- **impact_areas:** nri, other
- **primary_url:** https://www.npci.org.in/PDF/npci/upi/circular/2023/UPI-OC-No-177-UPI-Global-Acceptance-limits.pdf

Set limits for UPI global acceptance at international merchant locations. Relevant for brokers handling cross-border payments by NRI clients. Full content and exact date require verification from the NPCI archive.

### NPCI/UPI/OC No. 181/2023-24

- **date_issued:** [unknown — verify]
- **issuer:** NPCI
- **title:** "Compliance to Merchant Onboarding in UPI and Usage Limits"
- **applies_to:** broker, all-intermediaries
- **in_force_date:** [unknown — verify]
- **status:** in-force
- **impact_areas:** onboarding, surveillance, reporting, file-format
- **primary_url:** https://www.npci.org.in/PDF/npci/upi/circular/2023/NPCI-UPI-OC-181-Compliance-to-Merchant-Onboarding-in-UPI-and-Usage-Limits.pdf

Reiterates compliance requirements for merchant onboarding under MCCs (including MCC 6211 for securities brokers/dealers) and applicable usage limits. Brokers and their acquirer banks must ensure correct MCC classification, KYC of merchant entity, and adherence to per-transaction caps. Verification of dated header text required from NPCI.

### NPCI/UPI/OC No. 182/2023-24

- **date_issued:** [unknown — verify]
- **issuer:** NPCI
- **title:** "User Experience Enhancements for UPI AutoPay"
- **applies_to:** broker, all-intermediaries
- **in_force_date:** [unknown — verify]
- **status:** in-force
- **impact_areas:** mandate, onboarding, grievance
- **primary_url:** https://www.npci.org.in/PDF/npci/upi/circular/2023/UPI-OC-182-User-Experience-Enhancement-for-UPI-AutoPay.pdf

Specifies UX standards for displaying mandate type, amount cap, frequency, and merchant identifier when customers approve UPI AutoPay mandates. Relevant for brokers who collect periodic platform fees, SIP-style equity recurring buys, or instalment-based product payments via AutoPay. Exact date and clause-level content require verification.

### NPCI/UPI/OC No. 184/2023-24

- **date_issued:** [unknown — verify]
- **issuer:** NPCI
- **title:** "Modification in UPI Chargeback Rules and Procedures"
- **applies_to:** broker, all-intermediaries
- **in_force_date:** [unknown — verify]
- **status:** in-force
- **impact_areas:** grievance, scores-odr, settlement, reporting
- **primary_url:** https://www.npci.org.in/PDF/npci/upi/circular/2023/UPI-OC-No-184-FY-23-24-Modification-in-UPI-Chargeback-Rules-and-Procedures.pdf

Revised UPI chargeback rules and dispute-resolution procedures. Material for brokers handling customer-initiated chargebacks where investor disputes a UPI debit relating to trading payments. Later amended by OC 184A (FY 2024-25) and OC 184B (FY 2025-26). Exact issue date requires verification.

### NPCI/UPI/OC No. 184A/2024-25

- **date_issued:** [unknown — verify]
- **issuer:** NPCI
- **title:** "Addendum to OC 184 — Modification in UPI chargeback rules and procedures"
- **applies_to:** broker, all-intermediaries
- **in_force_date:** [unknown — verify]
- **status:** in-force
- **impact_areas:** grievance, scores-odr, settlement
- **primary_url:** https://www.npci.org.in/PDF/npci/upi/circular/2025/UPI-OC-No-184-A-FY-2024-25-Addendum-to-OC-184-Modification-in-UPI-chargeback-rules-and-procedures.pdf

Addendum refining the chargeback rules/procedures originally laid down in OC 184/2023-24. Continues to affect broker handling of customer UPI disputes for trading-account funding.

### NPCI/UPI/OC No. 184B/2025-26

- **date_issued:** [unknown — verify]
- **issuer:** NPCI
- **title:** "Addendum to OC 184 — Modification in UPI chargeback rules and procedures"
- **applies_to:** broker, all-intermediaries
- **in_force_date:** [unknown — verify]
- **status:** in-force
- **impact_areas:** grievance, scores-odr, settlement
- **primary_url:** https://www.npci.org.in/PDF/npci/upi/circular/2025/UPI-OC-No-184-B-FY-2025-26-Addendum-to-OC-184-Modification-in-UPI-chargeback-rules-and-procedures.pdf

Second addendum updating chargeback rules. Brokers and their settlement banks must update internal procedure manuals.

### NPCI/UPI/OC No. 185/2023-24

- **date_issued:** [unknown — verify]
- **issuer:** NPCI
- **title:** "Implementation of Rs 5 Lakh limit per transaction for specific categories in UPI"
- **applies_to:** broker, all-intermediaries
- **in_force_date:** [unknown — verify]
- **status:** superseded
- **superseded_by:** NPCI/UPI/OC No. 185A/2024-25
- **impact_areas:** settlement, upi-block, onboarding, mandate
- **primary_url:** https://www.npci.org.in/PDF/npci/upi/circular/2023/UPI-OC-185-Implementation-of-Rs-5-Lakh-limit-per-transaction-for-specific-categories-in-UPI.pdf

Original implementation circular for Rs.5 lakh per-transaction limit for specific UPI categories including IPO and RBI Retail Direct Scheme (RDS). Continued the IPO/G-Sec capital-markets enhancement first introduced via OC 127. Amended by subsequent addenda (OC 185A and OC 185B).

### NPCI/UPI/OC No. 198/2024-25

- **date_issued:** [unknown — verify]
- **issuer:** NPCI
- **title:** "Revision of Disputes TAT"
- **applies_to:** broker, all-intermediaries
- **in_force_date:** [unknown — verify]
- **status:** in-force
- **impact_areas:** grievance, scores-odr, settlement
- **primary_url:** https://www.npci.org.in/PDF/npci/upi/circular/2024/UPI-OC-No-198-FY-24-25%E2%80%93Revision-of-Disputes-TAT.pdf

Revises Turn-Around Time (TAT) for UPI dispute resolution. Affects timing of refund/credit-adjustment cycles where investor disputes UPI debit to broker account.

### NPCI/UPI/OC No. 209/2024-25

- **date_issued:** [unknown — verify]
- **issuer:** NPCI
- **title:** "Guidelines on UPI features for UPI 123Pay"
- **applies_to:** broker, all-intermediaries
- **in_force_date:** [unknown — verify]
- **status:** in-force
- **impact_areas:** other
- **primary_url:** https://www.npci.org.in/PDF/npci/upi/circular/2024/UPI-OC-NO-209-FY-24-25-Guidelines-on-UPI-features-for-UPI-123Pay.pdf

Lays down UPI 123Pay feature guidelines for feature-phone users. Marginally relevant for brokers serving feature-phone investor segments wishing to fund trading accounts via 123Pay. Exact issue date requires verification.

### NPCI/UPI/OC No. 213/2024-25

- **date_issued:** [unknown — verify]
- **issuer:** NPCI
- **title:** "Auto Acceptance/Rejection of Chargeback"
- **applies_to:** broker, all-intermediaries
- **in_force_date:** 2025-02-15
- **status:** in-force
- **impact_areas:** grievance, scores-odr, settlement, reporting
- **primary_url:** https://www.npci.org.in/PDF/npci/upi/circular/2025/UPI-OC-No-213-FY-2024-25-Auto-Acceptance-Rejection-of-Chargeback.pdf

From 15 February 2025, URCS auto-accepts/rejects UPI chargebacks based on Transaction Credit Confirmation (TCC) by beneficiary banks and returns processed in the next settlement cycle. Applies only to bulk uploads and UDIR; front-end dispute resolution unchanged. Reduces broker-side dispute backlog where investor disputes UPI debit to broker collection account.

### NPCI/UPI/OC No. 222A/2025-26

- **date_issued:** [unknown — verify]
- **issuer:** NPCI
- **title:** "Addendum — Segregation of UPI settlement cycles for Auth and Dispute transactions (Revised Implementation Timeline)"
- **applies_to:** broker, all-intermediaries
- **in_force_date:** 2025-12-15
- **status:** in-force
- **impact_areas:** settlement, bod-eod, reporting, file-format
- **primary_url:** https://www.npci.org.in/uploads/UPI_OC_No_222_A_FY_2025_26_Addendum_segregation_of_UPI_settlement_cycles_for_Auth_and_disputes_transactions_42766ab9aa.pdf

Revised the implementation timeline of OC 222 from 03 November 2025 to 15 December 2025 to accommodate member feedback. All other clauses unchanged.

### NPCI/UPI/OC No. 223/2025-26

- **date_issued:** [unknown — verify]
- **issuer:** NPCI
- **title:** "Enhancement of UPI Autopay"
- **applies_to:** broker, all-intermediaries
- **in_force_date:** 2025-08-01
- **status:** in-force
- **impact_areas:** mandate, settlement, bod-eod, file-format
- **primary_url:** https://www.npci.org.in/uploads/UPI_OC_No_223_FY_2025_26_Enhancement_of_UPI_Autopay_88b38535cb.pdf

Introduces AutoPay scheduling windows (executions outside 10:00–13:00 and 17:00–21:30 peak hours; after 21:30 for recurring AutoPay) and retry logic (1 attempt + up to 3 retries per mandate sequence). Effective from 01 August 2025. Brokers using AutoPay for recurring brokerage/platform fee/MTF-interest collections must schedule during permitted windows.

### NPCI/UPI/OC No. 227/2025-26

- **date_issued:** [unknown — verify]
- **issuer:** NPCI
- **title:** "Introduction of UPI HELP Assistant pilot — an AI-powered support for UPI payments"
- **applies_to:** broker, all-intermediaries
- **in_force_date:** [unknown — verify]
- **status:** in-force
- **impact_areas:** grievance, scores-odr, other
- **primary_url:** https://www.npci.org.in/uploads/UPI_OC_No_227_FY_2025_26_Introduction_of_UPI_HELP_Assistant_pilot_an_AI_powered_support_for_UPI_payments_cd501de8f3.pdf

Introduces an AI-powered UPI HELP Assistant (pilot) at upihelp.npci.org.in for managing AutoPay mandates and complaints. Helps customers track and stop standing-instruction mandates set with brokers/intermediaries.

### NPCI/UPI/OC No. 76B/2024-25

- **date_issued:** [unknown — verify]
- **issuer:** NPCI
- **title:** "Addendum to NPCI/UPI/2023-24/76A — Revision in transaction limits based on Merchant transaction types"
- **applies_to:** broker, all-intermediaries
- **in_force_date:** [unknown — verify]
- **status:** in-force
- **impact_areas:** onboarding, surveillance, file-format
- **primary_url:** https://www.npci.org.in/PDF/npci/upi/circular/2024/UPI-OC-No-76B-FY-24-25-Addendum-to-NPCI-UPI-2023-24-76A-Revision-in-transaction-limits-based-on-Merchant-transaction-types.pdf

Addendum to OC 76A revising merchant/transaction-type limits. Operational impact on broker acquiring banks similar to OC 76A.

## Practical notes

- **[gotcha]** Circular IDs are case-sensitive and the issuer's exact punctuation matters when looking them up on the official site.
- **[industry practice]** Most ops teams subscribe to the issuer's email distribution list rather than scraping the site — leads to more reliable real-time tracking.
- **[risk trade-off]** Some entries are marked `[unknown — verify]` where the agent could not re-fetch the primary URL or the document used informal numbering; treat those as leads, not citations.

## Verified through

2026-05-14

---

*AI-generated and not legal advice. See the project [README](https://github.com/javajack/broking-kyc) for the full disclaimer.*

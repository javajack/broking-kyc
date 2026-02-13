---
title: CDSL Extended
description: Index of extended CDSL deep-dive guides — DDPI, MTF/Pledge, BO modifications, and integration guide.
---

CDSL (Central Depository Services Limited) is one of India's two securities depositories, responsible for holding securities in electronic form and facilitating their transfer. The core CDSL integration -- opening a BO (Beneficiary Owner) account during onboarding -- is documented in the main vendor integration spec. This page serves as an index to the extended CDSL deep-dive guides that cover post-onboarding operations: DDPI (Demat Debit and Pledge Instruction) lifecycle, margin pledge operations, account modifications, and the technical integration guide for UAT (User Acceptance Testing) and production environments.

You will need these guides when working on features beyond initial account opening -- things like enabling DDPI for a customer, handling an address change, or debugging a pledge file rejection.

---

## Deep-Dive Guides

### [DDPI Deep Dive](/broking-kyc/vendors/depositories/cdsl-ddpi/)

DDPI lifecycle covering:
- Regulatory background and SEBI (Securities and Exchange Board of India) circulars
- Four authorization types (settlement, pledge, MF, open offer)
- DDPI vs POA (Power of Attorney) detailed comparison
- Technical implementation -- `POA_TYPE_FLAG`, BO Modify file format
- Online submission flow with eSign integration
- Revocation and modification process
- Trading flow with vs without DDPI
- Stamp duty by state and processing timelines

### [MTF & Pledge Operations](/broking-kyc/vendors/depositories/cdsl-mtf-pledge/)

Margin pledge, re-pledge, MTF (Margin Trading Facility) funding, and eLAS covering:
- Pledge ecosystem architecture (Client to TM/CM to CC)
- Three types of pledges: Normal, Margin, MTF
- Client-to-broker pledge and broker-to-CC re-pledge flows
- MTF pledge process (T+3 acceptance deadline)
- Tag-based file format with sample pledge/unpledge/invocation files
- SEBI automated pledge mechanism (Oct 2025)
- Haircut framework and margin benefit calculations
- CUSPA and MTF-specific demat accounts
- Pledge cost structure

### [BO Modifications](/broking-kyc/vendors/depositories/cdsl-modifications/)

Comprehensive BO account modification use cases:
- Address change with auto-propagation
- Bank account modification (penny drop, min/max rules)
- Nominee update (10 nominees since Jan 2025, percentage allocation)
- Nomination opt-out with video verification
- Simplified transmission on death of holder
- Email / mobile update (6-attribute KYC sync)
- PAN correction process
- Segment activation / deactivation
- BO account closure and dormancy reactivation
- Modification summary matrix

### [Integration Guide](/broking-kyc/vendors/depositories/cdsl-integration-guide/)

Technical integration and regulatory reference:
- UAT vs production environment endpoints
- UAT certification process (5-phase, 6-10 weeks)
- CDSL Innovation Sandbox
- Request tracking and unique sequence numbers
- File naming conventions (DP57, DPM3, DP97)
- File upload acknowledgment and status polling
- Multi-layered security architecture (5 layers)
- DSC (Digital Signature Certificate) management
- eDIS encryption details
- IP whitelisting requirements
- Connectivity security comparison
- SEBI circulars reference (DDPI, pledge, nomination)
- CDSL communiques index

:::tip[Start with the Integration Guide]
If you are new to CDSL development, start with the Integration Guide. It covers the UAT certification process, which is a mandatory 5-phase, 6-10 week process that must be completed before your code can go to production. Understanding the certification timeline early will help you plan your development sprints.
:::

---

## Source Documents

The extended CDSL specifications are maintained in:
- `vendors/depositories/CDSL.md` -- Sections 23-29 (source for deep-dive guides)
- `CDSL_INTEGRATION.md` -- Original deep-dive specification (v1.3)

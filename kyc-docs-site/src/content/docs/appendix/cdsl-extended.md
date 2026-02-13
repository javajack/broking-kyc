---
title: CDSL Extended
description: Index of extended CDSL deep-dive guides — DDPI, MTF/Pledge, BO modifications, and integration guide.
---

Extended CDSL documentation organized into focused deep-dive guides. The core CDSL integration spec is at [CDSL BO Integration](/broking-kyc/vendors/depositories/cdsl/).

---

## Deep-Dive Guides

### [DDPI Deep Dive](/broking-kyc/vendors/depositories/cdsl-ddpi/)

DDPI (Demat Debit and Pledge Instruction) lifecycle covering:
- Regulatory background and SEBI circulars
- Four authorization types (settlement, pledge, MF, open offer)
- DDPI vs POA detailed comparison
- Technical implementation — `POA_TYPE_FLAG`, BO Modify file format
- Online submission flow with eSign integration
- Revocation and modification process
- Trading flow with vs without DDPI
- Stamp duty by state and processing timelines

### [MTF & Pledge Operations](/broking-kyc/vendors/depositories/cdsl-mtf-pledge/)

Margin pledge, re-pledge, MTF funding, and eLAS covering:
- Pledge ecosystem architecture (Client → TM/CM → CC)
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
- Digital Signature Certificate (DSC) management
- eDIS encryption details
- IP whitelisting requirements
- Connectivity security comparison
- SEBI circulars reference (DDPI, pledge, nomination)
- CDSL communiques index

---

## Source Documents

The extended CDSL specifications are maintained in:
- `vendors/depositories/CDSL.md` — Sections 23-29 (source for deep-dive guides)
- `CDSL_INTEGRATION.md` — Original deep-dive specification (v1.3)

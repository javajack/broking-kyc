---
title: Non-Individual Entities
description: KYC requirements for Corporate, HUF, Partnership, Trust, LLP, and other non-individual entity types across all vendor integrations.
---

While the current KYC system focuses on individual customer onboarding, the securities market also serves corporates, partnerships, trusts, HUFs (Hindu Undivided Families), and LLPs (Limited Liability Partnerships). Each of these entity types has its own set of KYC documents, verification requirements, and regulatory obligations. This page consolidates the non-individual touchpoints identified across all vendor integration specifications during the individual KYC design process. It serves as a planning reference for when the team begins the non-individual onboarding phase.

:::note
The current KYC system focuses on **individual customer onboarding**. Non-individual entity onboarding is planned for a future phase. This page documents the vendor touchpoints and requirements identified during the individual KYC specification process.
:::

## Entity Types

Each entity type maps to different category codes across the KRA (KYC Registration Agency), CKYC (Central KYC) registry, and CDSL (Central Depository Services Limited). The "Key Documents" column gives you a sense of the additional documentation burden compared to individual onboarding.

| Entity Type | KRA Category | CKYC Constitution | CDSL Category | Key Documents |
|-------------|-------------|-------------------|---------------|--------------|
| **Corporate** | Corporate | Company | Body Corporate | MOA, AOA, Board Resolution, Director KYC |
| **HUF** | HUF | Hindu Undivided Family | HUF | HUF Deed, Karta PAN, Karta KYC |
| **Partnership** | Partnership | Partnership Firm | Partnership | Deed, Partner KYC, Registration Certificate |
| **Trust** | Trust | Trust | Trust | Trust Deed, Trustee KYC, Registration |
| **LLP** | LLP | LLP | LLP | LLP Agreement, Partner KYC, CIN |
| **NRI** | Individual (NRI) | Individual | NRI | Passport, Visa, PIS Permission, NRE/NRO Bank |

## Vendor Touchpoints by Entity Type

Each vendor integration has specific handling for non-individual entities. The sections below summarize what changes in each integration when the customer is not an individual.

### KRA (via Digio)
- Separate upload templates per entity type
- Director/Partner/Trustee KYC as sub-records
- FATCA/CRS (Foreign Account Tax Compliance Act / Common Reporting Standard) declaration per authorized signatory
- Full spec: [KRA Integration](/broking-kyc/vendors/kra) Section 7

### CKYC (via CKYC intermediary)
- 7 constitution types supported
- Authorized signatory photo and signature required
- UBO (Ultimate Beneficial Owner) identification for companies
- Full spec: [CKYC Integration](/broking-kyc/vendors/identity/ckyc) Section 6

### CDSL BO Account
- Different file line formats per entity type
- Joint holder support (Lines 03-04)
- Guardian details for minor accounts
- Full spec: [CDSL Integration](/broking-kyc/vendors/depositories/cdsl) Section 9

### Exchange UCC (NSE/BSE/MCX)
- Client type codes differ per entity
- Director/Partner PAN (Permanent Account Number) verification required
- Additional document requirements per exchange
- Full specs: [NSE](/broking-kyc/vendors/exchanges/nse), [BSE](/broking-kyc/vendors/exchanges/bse), [MCX](/broking-kyc/vendors/exchanges/mcx)

### eSign (eSign provider)
- Multi-signatory workflows for corporates
- Board resolution verification before signing
- Authorized signatory face match
- Full spec: See [Vendor Integrations](/broking-kyc/vendors/) for eSign provider options

### AML Screening
- Screening by entity type (different risk parameters)
- UBO screening for corporates
- Director/Partner screening
- Full spec: See [Vendor Integrations](/broking-kyc/vendors/) for AML screening provider options

### Face Match (Biometric verification)
- Face match for authorized signatories
- Multiple face matches for joint holders
- Full spec: See [Vendor Integrations](/broking-kyc/vendors/) for biometric verification provider options

## Implementation Priority

Non-individual entity onboarding will be implemented after the individual KYC system is stable. Priority order:

1. **HUF** -- Simplest non-individual type, single Karta
2. **Partnership/LLP** -- Multiple partners, similar structure
3. **Corporate** -- Most complex (board resolution, directors, UBO)
4. **Trust** -- Requires trustee verification, deed analysis
5. **NRI** -- See [NRI Deep Dive](/broking-kyc/appendix/nri-deep-dive)

:::tip[Why HUF first?]
An HUF (Hindu Undivided Family) is structurally similar to an individual account -- it has a single Karta (head of family) whose PAN and KYC are the primary identifiers. This makes it the smallest incremental step from individual onboarding and a good starting point for validating the non-individual architecture.
:::

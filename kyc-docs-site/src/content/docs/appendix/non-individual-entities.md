---
title: Non-Individual Entities
description: KYC requirements for Corporate, HUF, Partnership, Trust, LLP, and other non-individual entity types across all vendor integrations.
---

KYC requirements for Corporate, HUF, Partnership, Trust, LLP, and other non-individual entity types. This page consolidates non-individual sections from across all 12 vendor integration specs.

:::note
The current KYC system focuses on **individual customer onboarding**. Non-individual entity onboarding is planned for a future phase. This page documents the vendor touchpoints and requirements identified during the individual KYC specification process.
:::

## Entity Types

| Entity Type | KRA Category | CKYC Constitution | CDSL Category | Key Documents |
|-------------|-------------|-------------------|---------------|--------------|
| **Corporate** | Corporate | Company | Body Corporate | MOA, AOA, Board Resolution, Director KYC |
| **HUF** | HUF | Hindu Undivided Family | HUF | HUF Deed, Karta PAN, Karta KYC |
| **Partnership** | Partnership | Partnership Firm | Partnership | Deed, Partner KYC, Registration Certificate |
| **Trust** | Trust | Trust | Trust | Trust Deed, Trustee KYC, Registration |
| **LLP** | LLP | LLP | LLP | LLP Agreement, Partner KYC, CIN |
| **NRI** | Individual (NRI) | Individual | NRI | Passport, Visa, PIS Permission, NRE/NRO Bank |

## Vendor Touchpoints by Entity Type

### KRA (via Digio)
- Separate upload templates per entity type
- Director/Partner/Trustee KYC as sub-records
- FATCA/CRS declaration per authorized signatory
- Full spec: [KRA Integration](/broking-kyc/vendors/kra) Section 7

### CKYC (via Decentro)
- 7 constitution types supported
- Authorized signatory photo and signature required
- Ultimate Beneficial Owner (UBO) identification for companies
- Full spec: [CKYC Integration](/broking-kyc/vendors/identity/ckyc) Section 6

### CDSL BO Account
- Different file line formats per entity type
- Joint holder support (Lines 03-04)
- Guardian details for minor accounts
- Full spec: [CDSL Integration](/broking-kyc/vendors/depositories/cdsl) Section 9

### Exchange UCC (NSE/BSE/MCX)
- Client type codes differ per entity
- Director/Partner PAN verification required
- Additional document requirements per exchange
- Full specs: [NSE](/broking-kyc/vendors/exchanges/nse), [BSE](/broking-kyc/vendors/exchanges/bse), [MCX](/broking-kyc/vendors/exchanges/mcx)

### eSign (Leegality)
- Multi-signatory workflows for corporates
- Board resolution verification before signing
- Authorized signatory face match
- Full spec: [Leegality Integration](/broking-kyc/vendors/esign/leegality) Section 9

### AML Screening (TrackWizz)
- Screening by entity type (different risk parameters)
- UBO screening for corporates
- Director/Partner screening
- Full spec: [TrackWizz Integration](/broking-kyc/vendors/fraud/trackwizz) Section 7

### Face Match (HyperVerge)
- Face match for authorized signatories
- Multiple face matches for joint holders
- Full spec: [HyperVerge Integration](/broking-kyc/vendors/verification/hyperverge) Section 6

## Implementation Priority

Non-individual entity onboarding will be implemented after the individual KYC system is stable. Priority order:

1. **HUF** — Simplest non-individual type, single Karta
2. **Partnership/LLP** — Multiple partners, similar structure
3. **Corporate** — Most complex (board resolution, directors, UBO)
4. **Trust** — Requires trustee verification, deed analysis
5. **NRI** — See [NRI Deep Dive](/broking-kyc/appendix/nri-deep-dive)

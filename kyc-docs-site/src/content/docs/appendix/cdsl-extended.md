---
title: CDSL Extended
description: Extended CDSL integration specification — detailed BO file format, TPIN/OTP flow, eDIS, corporate actions, and advanced CDAS operations.
---

Extended CDSL integration specification covering detailed BO file format specifications, TPIN/OTP authorization flow, eDIS (Electronic Delivery Instruction Slip), corporate actions, and advanced CDAS operations.

:::note
This page contains extended CDSL documentation beyond what's needed for basic individual KYC onboarding. The core CDSL integration spec is at [CDSL BO Integration](/vendors/depositories/cdsl).
:::

## Source Document

The extended CDSL specification is maintained in `CDSL_INTEGRATION.md` (57KB). Key sections include:

### BO File Format (Fixed-Length Positional)

| Line | Purpose | Length | Mandatory |
|------|---------|--------|-----------|
| 01 | Header / DP ID / holder basics | Variable | Yes |
| 02 | Contact, KYC flags, email, phone, BO opening source | Variable | Yes |
| 03 | 2nd holder details (if joint) | Variable | No |
| 04 | 3rd holder details (if joint) | Variable | No |
| 05 | Bank account details for dividend/interest | Variable | Yes |
| 06 | Additional details | Variable | No |
| 07 | Nomination details | Variable | Yes (since Jan 2025) |

- **Numeric fields**: Right-justified, zero-padded
- **Alpha fields**: Left-justified, space-padded
- **Signatures**: .jpg/.bmp/.gif/.tif/.png format

### TPIN/OTP Authorization Flow

```
DP initiates → CDSL API → Client enters 6-digit TPIN → OTP to email+mobile → Authorized
```

### DDPI (Demat Debit and Pledge Instruction)

- Replaces Power of Attorney (POA) since Nov 2022
- Rs.100 + 18% GST
- Online activation via Aadhaar eSign: 24 working hours
- Offline activation: Physical form processing
- Optional — client can choose to use TPIN/OTP for each transaction instead

### Key Platforms

| Platform | Purpose |
|----------|---------|
| **easi** | Read-only view of holdings/statements |
| **EASIEST** | Full transaction capability (off-market, inter-depository, pay-in) |
| **myEasi** | Mobile app |
| **CDAS** | Core depository accounting system |

### Non-Individual Entity Types (Section 9)

7 entity types supported with different file format requirements:
- Body Corporate
- HUF
- Partnership Firm
- Trust
- LLP
- NRI
- Minor (with guardian)

See [Non-Individual Entities](/appendix/non-individual-entities) for cross-vendor entity requirements.

For the complete specification, refer to `CDSL_INTEGRATION.md` in the source repository.

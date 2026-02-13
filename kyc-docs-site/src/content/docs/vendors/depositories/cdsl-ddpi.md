---
title: CDSL DDPI Deep Dive
description: DDPI (Demat Debit and Pledge Instruction) lifecycle — authorization types, regulatory background, technical implementation, vs POA comparison.
---

DDPI was introduced by SEBI to replace the broad-scope Power of Attorney (POA) with a limited-purpose authorization for demat operations.

> Back to [CDSL Overview](/broking-kyc/vendors/depositories/cdsl/)

---

## 1. Regulatory Background

DDPI was introduced through a series of SEBI circulars:

| Circular | Date | Subject |
|----------|------|---------|
| SEBI/HO/MIRSD/DoP/P/CIR/2022/44 | April 4, 2022 | Initial DDPI framework for settlement delivery + pledge/re-pledge |
| SEBI/HO/MIRSD/DoP/P/CIR/2022/119 | June 2022 | Implementation extension |
| SEBI/HO/MIRSD-PoD-1/P/CIR/2022/137 | October 6, 2022 | Expanded scope: MF on exchange + open offer tendering |
| SEBI/HO/MIRSD/DoP/P/CIR/2022/153 | November 2022 | Further implementation extension |
| CDSL Communique DP-332 | June 14, 2022 (implemented Nov 2022) | CDSL system implementation of DDPI |
| CDSL Communique DP-5565 | Ongoing | BO Setup/Modify file format changes for DDPI/POA holder fields |

---

## 2. Four DDPI Authorization Types

DDPI is limited to exactly four purposes (no broader authority):

| # | Authorization Type | Description | SEBI Circular |
|---|-------------------|-------------|---------------|
| 1 | **Settlement Delivery** | Transfer of securities held in BO account towards stock exchange-related deliveries / settlement obligations arising out of trades executed by the client | Apr 2022 (original) |
| 2 | **Pledge / Re-pledge for Margin** | Pledging / re-pledging of securities in favour of TM/CM for the purpose of meeting margin requirements of the client | Apr 2022 (original) |
| 3 | **Mutual Fund on Exchange** | Mutual fund transactions being executed on stock exchange order entry platforms (e.g., BSE StAR MF, NSE MFSS) | Oct 2022 (amendment) |
| 4 | **Open Offer Tendering** | Tendering shares in open offers through stock exchange platforms (takeover / buyback offers routed via exchange) | Oct 2022 (amendment) |

:::caution
Any other use (e.g., off-market transfers, inter-depository transfers, gift transfers) is NOT covered by DDPI. These require eDIS (TPIN + OTP) authorization.
:::

---

## 3. DDPI vs POA — Detailed Comparison

| Aspect | DDPI (Current) | POA (Legacy — Discontinued for new clients) |
|--------|---------------|----------------------------------------------|
| **Scope** | Limited to 4 specific purposes only | Broad — could cover any demat operation |
| **Legal Instrument** | Standardized SEBI-prescribed format | General POA on stamp paper |
| **Stamp Duty** | Required (varies by state: Rs. 100 typical) | Required (higher in many states) |
| **Digital Execution** | Aadhaar eSign supported (hybrid: digital sign + stamp duty) | Generally physical only |
| **Activation Time** | ~24 working hours (online via eSign) | 2-5 business days (physical processing) |
| **Cost to Client** | Rs. 100 + 18% GST = Rs. 118 (one-time) | Rs. 100-500 (varied) |
| **Revocation** | Anytime by BO, effective immediately | Anytime by BO |
| **Risk** | Low — limited scope, no misuse of broader powers | High — broad authority, potential misuse |
| **New Clients (post Sep 2022)** | Only option available | Not accepted |
| **Existing POA Holders** | POA remains valid until client revokes | N/A |
| **Nominee Action** | Person acting under DDPI CANNOT add/modify nominees | Person acting under POA CANNOT add nominees (Jan 2025 rule) |

---

## 4. CDSL DDPI Implementation — Technical Details

### 4.1 POA_TYPE_FLAG in BO File Format

CDSL introduced a new field `POA_TYPE_FLAG` in the BO Setup/Modify file format per Communique DP-332:

| POA_TYPE_FLAG Value | Meaning |
|--------------------|---------|
| **P** | Traditional POA (legacy, existing clients only) |
| **D** | DDPI (Demat Debit and Pledge Instruction) |
| **N** | No POA / No DDPI (client uses eDIS TPIN+OTP for each transaction) |

### 4.2 DDPI Master POA ID Creation

```
Step 1: DP creates DDPI Master POA ID in CDAS
   - POA_TYPE_FLAG = 'D'
   - DDPI authorization details populated
   |
Step 2: DP links DDPI Master POA ID to the BO's demat account
   - Via BO Modify Upload API or CDAS Web Portal
   - Line 06 (Additional Details) updated with DDPI linkage
   - Line 21 repeated for each CM POA / PMS POA / DDPI Account Mapping combination
   |
Step 3: CDSL activates DDPI flag on BO account
   - BO account now has DDPI = Active
   - Settlement debits, margin pledges, MF/open offer handled automatically
```

### 4.3 Online DDPI Submission Flow (DP Integration)

```
┌──────────────────┐     ┌───────────────┐     ┌──────────────┐     ┌──────────┐
│  Broker App/Web  │     │   eSign API   │     │  CDSL CDAS   │     │   BO     │
│  (DP System)     │     │  (Leegality/  │     │              │     │ (Client) │
│                  │     │   Digio)      │     │              │     │          │
└────────┬─────────┘     └──────┬────────┘     └──────┬───────┘     └────┬─────┘
         │                      │                      │                  │
         │  1. Client clicks    │                      │                  │
         │     "Activate DDPI"  │                      │                  │
         │ <──────────────────────────────────────────────────────────────│
         │                      │                      │                  │
         │  2. Generate DDPI    │                      │                  │
         │     document         │                      │                  │
         │     (pre-filled BO   │                      │                  │
         │      details)        │                      │                  │
         │                      │                      │                  │
         │  3. Send to eSign    │                      │                  │
         │ ────────────────────>│                      │                  │
         │                      │                      │                  │
         │                      │  4. Aadhaar OTP      │                  │
         │                      │     to client        │                  │
         │                      │ ───────────────────────────────────────>│
         │                      │                      │                  │
         │                      │  5. Client enters    │                  │
         │                      │     OTP              │                  │
         │                      │ <───────────────────────────────────────│
         │                      │                      │                  │
         │  6. Signed DDPI      │                      │                  │
         │     document         │                      │                  │
         │ <────────────────────│                      │                  │
         │                      │                      │                  │
         │  7. Collect stamp    │                      │                  │
         │     duty (Rs. 100    │                      │                  │
         │     + GST) via PG    │                      │                  │
         │ <──────────────────────────────────────────────────────────────│
         │                      │                      │                  │
         │  8. Upload DDPI to   │                      │                  │
         │     CDSL via BO      │                      │                  │
         │     Modify API       │                      │                  │
         │ ───────────────────────────────────────────>│                  │
         │                      │                      │                  │
         │  9. CDSL activates   │                      │                  │
         │     DDPI (~24 hrs)   │                      │                  │
         │ <───────────────────────────────────────────│                  │
         │                      │                      │                  │
         │  10. Confirmation    │                      │                  │
         │      to client       │                      │                  │
         │ ──────────────────────────────────────────────────────────────>│
```

---

## 5. DDPI BO Modify File Format

When activating DDPI, the DP submits a BO Modify file with Line 06 (Additional Details) updated:

| Field | Type | Length | Value | Description |
|-------|------|--------|-------|-------------|
| POA_TYPE_FLAG | Alpha | 1 | `D` | Indicates DDPI |
| POA_MASTER_ID | Alphanumeric | 16 | DDPI Master POA ID | CDAS-assigned ID for the DDPI record |
| POA_HOLDER_NAME | Alpha | 100 | Broker/DP name | Name of DDPI holder (the broker) |
| POA_HOLDER_PAN | Alphanumeric | 10 | Broker PAN | PAN of the DDPI holder entity |
| DDPI_AUTH_SETTLEMENT | Alpha | 1 | `Y`/`N` | Authorization for settlement delivery |
| DDPI_AUTH_PLEDGE | Alpha | 1 | `Y`/`N` | Authorization for pledge/re-pledge |
| DDPI_AUTH_MF | Alpha | 1 | `Y`/`N` | Authorization for MF on exchange |
| DDPI_AUTH_OPENOFFER | Alpha | 1 | `Y`/`N` | Authorization for open offer tendering |
| DDPI_ESIGN_DATE | Numeric | 8 | DDMMYYYY | Date of eSign |
| DDPI_ESIGN_REF | Alphanumeric | 30 | eSign reference | eSign transaction ID from Aadhaar eSign |
| DDPI_STAMP_DUTY_REF | Alphanumeric | 20 | Stamp duty ref | Stamp duty payment reference |
| DDPI_EFFECTIVE_DATE | Numeric | 8 | DDMMYYYY | Date DDPI becomes effective |

:::note
Exact field positions are in CDSL Communique DP-332 and DP-5565. These are estimated fields based on public documentation. Obtain the full spec from CDSL after DP registration.
:::

---

## 6. DDPI Modification and Revocation

### 6.1 Client-Initiated Revocation

| Aspect | Details |
|--------|---------|
| **Right** | Client can revoke DDPI at any time without giving reasons |
| **Process** | Submit revocation request to DP (online or physical) |
| **DP Obligation** | Must process revocation within 1 working day |
| **Effect** | DDPI flag set to inactive; client must use eDIS (TPIN+OTP) for all subsequent transactions |
| **CDSL Update** | DP submits BO Modify with POA_TYPE_FLAG = 'N' |
| **Re-activation** | Client can submit new DDPI anytime (fresh process + stamp duty) |
| **SEBI Mandate** | Stock exchanges and depositories shall ensure that brokers have enabled clients to revoke/cancel DDPI |

### 6.2 Broker-Initiated Deactivation

| Scenario | Action |
|----------|--------|
| Client closure of trading account | DDPI automatically deactivated |
| DP registration cancelled | All DDPI under that DP deactivated |
| Regulatory order | CDSL can deactivate DDPI as per SEBI/court order |

### 6.3 DDPI Modification

DDPI modification is limited — the four authorization types are all-or-nothing in practice. If a client wants to change authorization scope:

1. Revoke existing DDPI
2. Submit new DDPI with updated authorizations
3. Fresh stamp duty required

---

## 7. Trading Flow: With vs Without DDPI

### With DDPI Active:
```
Client sells shares --> Broker executes trade on exchange -->
T+1: Clearing Corporation sends delivery obligation -->
Broker automatically debits shares from client BO account (DDPI authorized) -->
Shares delivered to CC for settlement -->
T+1 settlement complete
```

### Without DDPI (eDIS):
```
Client sells shares --> Broker executes trade on exchange -->
T+0/T+1: Client receives eDIS authorization request -->
Client redirected to CDSL eDIS portal (edis.cdslindia.com) -->
Client enters TPIN (6-digit) --> CDSL sends OTP to registered mobile -->
Client enters OTP --> Authorization complete -->
Broker debits shares --> Delivered to CC --> Settlement complete

RISK: If client misses TPIN+OTP window --> Short delivery -->
      Auction penalty (20% + 5% annualized) on the broker
```

---

## 8. DDPI Stamp Duty Considerations

| State | E-Stamp Duty for DDPI | Notes |
|-------|-----------------------|-------|
| Maharashtra | Rs. 100 | Can be paid via SHCIL e-Stamp |
| Karnataka | Rs. 100-200 | e-Stamping via KSRSAC |
| Delhi | Rs. 100 | Via e-Stamp portals |
| Tamil Nadu | Rs. 100 | Via TNREGINET |
| Other States | Rs. 50-200 | Varies; broker typically handles payment |

:::tip[Implementation Note]
Most brokers collect a flat Rs. 100 + GST from the client and handle stamp duty procurement. The e-stamping can be automated via SHCIL/NeSL APIs.
:::

---

## 9. DDPI Processing Timeline

| Stage | Online (eSign) | Offline (Physical) |
|-------|---------------|-------------------|
| Client initiates | T+0 | T+0 |
| Document generation | Instant | N/A |
| eSign / Physical sign | T+0 (minutes) | T+0 to T+2 (courier) |
| Stamp duty payment | T+0 (online PG) | T+0 (stamp paper) |
| Upload to CDSL | T+0 | T+1 to T+3 |
| CDSL processing | ~24 working hours | 2-3 working days |
| DDPI active | T+1 | T+3 to T+5 |

---

## Related Pages

- [CDSL Overview](/broking-kyc/vendors/depositories/cdsl/) — Core BO integration spec
- [MTF & Pledge Deep Dive](/broking-kyc/vendors/depositories/cdsl-mtf-pledge/) — Margin pledge operations that use DDPI
- [BO Modifications](/broking-kyc/vendors/depositories/cdsl-modifications/) — DDPI activation via BO Modify
- [Integration Guide](/broking-kyc/vendors/depositories/cdsl-integration-guide/) — UAT environments and SEBI circulars

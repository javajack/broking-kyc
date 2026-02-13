---
title: CDSL DDPI Deep Dive
description: DDPI (Demat Debit and Pledge Instruction) lifecycle — authorization types, regulatory background, technical implementation, vs POA comparison.
---

When a client sells shares from their demat account, someone needs to authorize the transfer of those shares to the clearing corporation for settlement. Before 2022, brokers relied on a broad Power of Attorney (POA) that gave them sweeping authority over a client's demat account — an arrangement that was ripe for misuse. SEBI (Securities and Exchange Board of India) replaced this with DDPI (Demat Debit and Pledge Instruction), a tightly scoped authorization that limits what a broker can do to exactly four operations. As an engineer building a broking platform, you will implement DDPI activation during onboarding and encounter its effects across settlement, pledge, and mutual fund flows. By the end of this page, you will understand what DDPI authorizes, how it differs from POA, and exactly how to activate it in CDSL (Central Depository Services Limited).

> Back to [CDSL Overview](/broking-kyc/vendors/depositories/cdsl/)

---

Think of DDPI as a pre-authorized standing instruction — like telling your bank "automatically pay my electricity bill each month" instead of logging in to approve every payment. The POA was more like handing over your entire internet banking password. Understanding the regulatory timeline below will help you appreciate why SEBI moved away from POA, and why the transition happened in stages rather than overnight.

## 1. Regulatory Background

DDPI was introduced through a series of SEBI circulars:

| Circular | Date | Subject |
|----------|------|---------|
| SEBI/HO/MIRSD/DoP/P/CIR/2022/44 | April 4, 2022 | Initial DDPI framework for settlement delivery + pledge/re-pledge |
| SEBI/HO/MIRSD/DoP/P/CIR/2022/119 | June 2022 | Implementation extension |
| SEBI/HO/MIRSD-PoD-1/P/CIR/2022/137 | October 6, 2022 | Expanded scope: MF on exchange + open offer tendering |
| SEBI/HO/MIRSD/DoP/P/CIR/2022/153 | November 2022 | Further implementation extension |
| CDSL Communique DP-332 | June 14, 2022 (implemented Nov 2022) | CDSL system implementation of DDPI |
| CDSL Communique DP-5565 | Ongoing | BO (Beneficiary Owner) Setup/Modify file format changes for DDPI/POA holder fields |

:::note[Why so many circulars?]
SEBI rarely introduces a major change with a single circular. The industry typically gets a framework circular, one or more extensions as intermediaries request more time to build systems, and then scope expansions as edge cases are addressed. When you see a trail of circulars like this, read them in chronological order — each one builds on or amends the previous.
:::

---

Now that you know when and why DDPI was introduced, the next question is: what exactly does it authorize? The answer is deliberately narrow — SEBI designed DDPI to cover only the operations a broker legitimately needs to perform on a client's behalf, and nothing more.

## 2. Four DDPI Authorization Types

DDPI is limited to exactly four purposes (no broader authority):

| # | Authorization Type | Description | SEBI Circular |
|---|-------------------|-------------|---------------|
| 1 | **Settlement Delivery** | Transfer of securities held in BO account towards stock exchange-related deliveries / settlement obligations arising out of trades executed by the client | Apr 2022 (original) |
| 2 | **Pledge / Re-pledge for Margin** | Pledging / re-pledging of securities in favour of TM (Trading Member) / CM (Clearing Member) for the purpose of meeting margin requirements of the client | Apr 2022 (original) |
| 3 | **Mutual Fund on Exchange** | Mutual fund transactions being executed on stock exchange order entry platforms (e.g., BSE StAR MF, NSE MFSS) | Oct 2022 (amendment) |
| 4 | **Open Offer Tendering** | Tendering shares in open offers through stock exchange platforms (takeover / buyback offers routed via exchange) | Oct 2022 (amendment) |

In plain English: DDPI lets your broker move shares out of your account only for trade settlement, margin pledging, exchange-based mutual fund transactions, and tendering in open offers. Everything else requires the client to explicitly authorize each transaction.

:::caution
Any other use (e.g., off-market transfers, inter-depository transfers, gift transfers) is NOT covered by DDPI. These require eDIS (Electronic Delivery Instruction Slip) authorization using TPIN (Transaction PIN) + OTP.
:::

---

With the four authorization types clearly defined, it is helpful to see how DDPI stacks up against the legacy POA mechanism it replaced. This comparison is especially important if you are working on a platform that still has existing POA clients alongside new DDPI clients — you will need to handle both.

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

:::tip[Handling legacy POA clients]
Your system must support both `POA_TYPE_FLAG = 'P'` (legacy) and `POA_TYPE_FLAG = 'D'` (DDPI). Do not force-migrate existing POA clients — their POA remains valid until they voluntarily revoke it. Your onboarding flow should only offer DDPI for new account openings.
:::

---

Now that you understand the conceptual difference between DDPI and POA, it is time to look at the technical implementation — the flags, file formats, and API flows you will actually build against when integrating with CDSL's CDAS (Central Depository Accounting System).

## 4. CDSL DDPI Implementation — Technical Details

### 4.1 POA_TYPE_FLAG in BO File Format

CDSL introduced a new field `POA_TYPE_FLAG` in the BO Setup/Modify file format per Communique DP-332:

| POA_TYPE_FLAG Value | Meaning |
|--------------------|---------|
| **P** | Traditional POA (legacy, existing clients only) |
| **D** | DDPI (Demat Debit and Pledge Instruction) |
| **N** | No POA / No DDPI (client uses eDIS TPIN+OTP for each transaction) |

In plain English: every BO account in CDSL carries one of three states — the client has granted DDPI, the client has a legacy POA, or the client has neither and must manually authorize every debit.

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

:::note[Master POA ID is reusable]
The DDPI Master POA ID represents your brokerage as the DDPI holder. You create it once in CDAS and then link it to every client's BO account. You do not create a new Master POA ID for each client — you link the same one. Think of it as a template that says "this broker is authorized under DDPI" and each client account points to that template.
:::

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

:::tip[Stamp duty is the tricky part]
The eSign itself is straightforward — it is a standard Aadhaar eSign flow via your eSign vendor (Leegality, Digio, etc.). The stamp duty collection is where most teams spend debugging time. Since DDPI is a legal instrument, it requires stamp paper, and stamp duty rates vary by state. Most brokers collect a flat Rs. 100 + GST upfront and procure the e-stamp via SHCIL (Stock Holding Corporation of India Limited) or NeSL (National E-Governance Services Limited) APIs in the background. Build this as an asynchronous step — do not block the user flow on stamp procurement.
:::

---

The sequence diagram above shows the happy path. To actually submit the DDPI activation to CDSL, you need to construct a BO Modify file with very specific fields. The next section details exactly what goes into that file.

## 5. DDPI BO Modify File Format

When activating DDPI, the DP (Depository Participant) submits a BO Modify file with Line 06 (Additional Details) updated:

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

In plain English: each of the four authorization types is a separate Y/N flag. In practice, most brokers set all four to `Y` during onboarding because clients rarely want partial DDPI. However, your system should still support individual flag control for edge cases.

:::note
Exact field positions are in CDSL Communique DP-332 and DP-5565. These are estimated fields based on public documentation. Obtain the full spec from CDSL after DP registration.
:::

---

DDPI activation is not permanent. Clients have the right to revoke it at any time, and your platform must provide a clear mechanism for them to do so. Understanding the revocation and modification flows is essential for building a compliant system.

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

:::caution
SEBI mandates that the revocation option must be prominently available in your client-facing application. During compliance audits, this is a frequently checked item. Do not bury it in settings — make it accessible from the demat account section of your app.
:::

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

The real impact of DDPI becomes clear when you look at what happens during an actual trade settlement. The following section compares the settlement flow for clients with and without DDPI — this is where you will see exactly why DDPI matters for user experience and operational risk.

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

:::caution[Short delivery is expensive]
When a client without DDPI fails to authorize the eDIS in time, your brokerage faces an auction penalty of approximately 20% of the trade value plus annualized interest. This is why most brokers strongly encourage DDPI activation during onboarding — it eliminates this operational risk entirely. Your onboarding flow should clearly explain this benefit to the client.
:::

---

Since DDPI is a legal instrument, it requires stamp duty — and stamp duty in India is a state-level matter, which means rates and procurement methods vary. The table below gives you a practical reference for the most common states.

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

Finally, here is the end-to-end timeline for DDPI activation. This table is useful when setting client expectations in your app — for instance, showing a "DDPI activation in progress" status with an estimated completion time.

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

:::tip[Design for the gap]
Between the time a client completes DDPI eSign (T+0) and the time CDSL activates it (T+1), the client is technically in a "DDPI pending" state. If they try to sell shares during this window, they will need to use eDIS (TPIN+OTP). Make sure your app handles this gracefully — show the pending status and guide the client through eDIS if they attempt a sale before activation completes.
:::

---

## Related Pages

- [CDSL Overview](/broking-kyc/vendors/depositories/cdsl/) — Core BO integration spec
- [MTF & Pledge Deep Dive](/broking-kyc/vendors/depositories/cdsl-mtf-pledge/) — Margin pledge operations that use DDPI
- [BO Modifications](/broking-kyc/vendors/depositories/cdsl-modifications/) — DDPI activation via BO Modify
- [Integration Guide](/broking-kyc/vendors/depositories/cdsl-integration-guide/) — UAT environments and SEBI circulars

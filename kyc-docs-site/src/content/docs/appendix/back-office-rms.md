---
title: Back-Office & RMS
description: Trading systems and risk management software — 63 Moons ODIN, Symphony XTS, OmneNEST for multi-exchange trading and client master sync.
---

The back-office and <abbr title="Risk Management System">RMS</abbr> (Risk Management System) is the system of record for client trading activity. Once a customer completes <abbr title="Know Your Customer (process).">KYC</abbr> onboarding and the checker approves the application, the client master record is pushed to the back-office system, which then governs trading limits, margin parameters, and compliance monitoring for the life of the account. This page compares the major back-office platforms in the Indian brokerage market and explains how the KYC system integrates with them.

## Vendor Comparison

The Indian brokerage back-office market is dominated by a small number of platforms. Understanding which one your firm uses is essential, as it determines the format and protocol for client master data synchronization.

| Vendor | Product | Market Share | Key Features |
|--------|---------|-------------|-------------|
| **63 Moons** (Recommended) | ODIN | 70-80% | Multi-exchange (<abbr title="National Stock Exchange of India">NSE</abbr>/<abbr title="BSE Limited (formerly Bombay Stock Exchange)">BSE</abbr>/<abbr title="Multi Commodity Exchange of India">MCX</abbr>). Front + Mid + Back + RMS. 1M+ licensees. 600+ cities. |
| Symphony Fintech (Alternate) | XTS | Growing | <abbr title="Order Management System">OMS</abbr> (Order Management System) + RMS + Compliance. XTS OTIS (NSE NOTIS alternative). 10+ years. |
| TCS (Alternate) | BaNCS | ~30% volume | Integrated trading, clearing, surveillance. 30+ brokerage orgs. ICICI Securities partnership. |
| OmneNEST (Alternate) | OmneNEST | 200+ brokers | Powers Zerodha Kite, Upstox, Finvasia. BSE/NSE/MCX. |

## Integration with KYC Onboarding

The back-office system receives client master data after checker approval. This is the handoff point between the KYC system and the trading infrastructure.

1. **Post-approval sync**: Client master record pushed to ODIN/XTS
2. **Trading limits**: Based on income range and segment activation
3. **Margin parameters**: Set based on risk profile
4. **Segment activation**: <abbr title="Clearing Member">CM</abbr>/FNO/CD/COM flags synced with exchange <abbr title="Unique Client Code">UCC</abbr> (Unique Client Code) status

:::tip[The six attributes that must match everywhere]
<abbr title="Securities and Exchange Board of India">SEBI</abbr> (Securities and Exchange Board of India) requires that six KYC attributes -- Name, <abbr title="Permanent Account Number">PAN</abbr> (Permanent Account Number), Address, Mobile, Email, and Income Range -- match exactly across the <abbr title="KYC Registration Agency">KRA</abbr> (KYC Registration Agency), exchange UCC, depository <abbr title="Beneficial Owner">BO</abbr> (Beneficiary Owner) record, and the back-office client master. If any of these drift out of sync, it can trigger compliance flags and potentially block the customer from trading.
:::

## Key Considerations

- Back-office integration is a **post-onboarding** concern
- Client master record must match exactly between back-office, exchange UCC, and depository BO
- Real-time sync required for activation status changes
- RMS parameters set during client master creation

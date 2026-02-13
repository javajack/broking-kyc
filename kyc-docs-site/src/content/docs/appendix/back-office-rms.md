---
title: Back-Office & RMS
description: Trading systems and risk management software — 63 Moons ODIN, Symphony XTS, OmneNEST for multi-exchange trading and client master sync.
---

Trading systems and risk management software — compares back-office software for multi-exchange trading, risk management, and client master record sync post-onboarding.

## Vendor Comparison

| Vendor | Product | Market Share | Key Features |
|--------|---------|-------------|-------------|
| **63 Moons** (Recommended) | ODIN | 70-80% | Multi-exchange (NSE/BSE/MCX). Front + Mid + Back + RMS. 1M+ licensees. 600+ cities. |
| Symphony Fintech (Alternate) | XTS | Growing | OMS + RMS + Compliance. XTS OTIS (NSE NOTIS alternative). 10+ years. |
| TCS (Alternate) | BaNCS | ~30% volume | Integrated trading, clearing, surveillance. 30+ brokerage orgs. ICICI Securities partnership. |
| OmneNEST (Alternate) | OmneNEST | 200+ brokers | Powers Zerodha Kite, Upstox, Finvasia. BSE/NSE/MCX. |

## Integration with KYC Onboarding

The back-office system receives client master data after checker approval:

1. **Post-approval sync**: Client master record pushed to ODIN/XTS
2. **Trading limits**: Based on income range and segment activation
3. **Margin parameters**: Set based on risk profile
4. **Segment activation**: CM/FNO/CD/COM flags synced with exchange UCC status

## Key Considerations

- Back-office integration is a **post-onboarding** concern
- Client master record must match exactly between back-office, exchange UCC, and depository BO
- Real-time sync required for activation status changes
- RMS parameters set during client master creation

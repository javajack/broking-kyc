---
title: Payment Mandates
description: Setting up recurring payments during onboarding — UPI AutoPay, e-NACH, and the UPI Block mechanism mandatory for QSBs.
---

Setting up recurring payments during onboarding — compares UPI AutoPay, e-NACH, and the new UPI Block mechanism (mandatory for QSBs). Covers mandate limits, SIP setup, and margin funding integration.

## UPI AutoPay vs e-NACH

| Feature | UPI AutoPay | e-NACH (NPCI) |
|---------|------------|---------------|
| Activation Speed | **Instant** | 3 working days |
| UX | UPI app (PhonePe/GPay/BHIM) | Net banking / debit card / Aadhaar |
| Standard Limit | Rs.15,000/txn | **No upper cap** |
| **Securities Broker Limit** | **Rs.1,00,000/txn** (MCC 6211) | No cap |
| Regulatory Basis | RBI/2023-2024/88 (Dec 2023) | NPCI e-NACH guidelines |
| Best For | SIP up to Rs.1L, quick mandate setup during onboarding | Larger margin funding EMIs, no amount cap |
| Vendor | Setu, Razorpay, Cashfree, PhonePe | All banks via NPCI clearing |

## UPI Block Mechanism (ASBA-like for Secondary Market)

:::danger
**Mandatory for QSBs from Feb 1, 2025.** SEBI mandated that Qualified Stock Brokers must offer either UPI block mechanism (funds blocked in customer bank, debited only on trade execution) OR 3-in-1 trading account. This is separate from autopay — it applies to trade settlement where customer funds stay in their bank until needed. Reduces counterparty risk.
:::

### How UPI Block Works

1. Customer creates a block on their UPI app for a specified amount
2. Funds remain in customer's bank account (earns interest)
3. On trade execution, only the required amount is debited
4. Remaining blocked amount is released
5. Similar to ASBA mechanism used in IPO applications

### Impact on Onboarding

- During onboarding, offer UPI Block setup as an option alongside traditional fund transfer
- QSBs must present this option to all new clients
- Non-QSBs can offer it as a value-add feature
- Integration requires partnership with UPI-enabled banks

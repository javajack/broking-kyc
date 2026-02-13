---
title: Payment Mandates
description: Setting up recurring payments during onboarding — UPI AutoPay, e-NACH, and the UPI Block mechanism mandatory for QSBs.
---

When a customer opens a trading account, they need a way to move money into it — for buying shares, for SIP (Systematic Investment Plan) installments, and for margin requirements. Rather than asking the customer to manually transfer funds every time, most brokers set up a payment mandate during onboarding: a pre-authorized instruction that lets the broker debit the customer's bank account automatically, up to a specified limit, on a recurring schedule. This page compares the three mandate mechanisms available in India — UPI AutoPay, e-NACH (electronic National Automated Clearing House), and the newer UPI Block mechanism — and explains which one to use in which situation.

:::note[Why Payment Mandates Matter During Onboarding]
Setting up a payment mandate during onboarding, when the customer is already engaged and providing their bank details, dramatically increases adoption compared to asking them to set it up later. A well-configured mandate enables automatic SIP debits, margin funding, and subscription fee collection — all without requiring the customer to log in and initiate each payment manually.
:::

Think of a payment mandate as a "standing instruction" at your bank — similar to a post-dated cheque, but digital and revocable. The customer authorizes the broker to debit up to a certain amount on a certain schedule, and the bank honors that instruction until the customer cancels it.

Let us compare the two primary mandate options: UPI AutoPay and e-NACH.

## UPI AutoPay vs e-NACH

UPI AutoPay and e-NACH solve the same problem — recurring debits from the customer's bank account — but they differ significantly in activation speed, transaction limits, and user experience. UPI AutoPay is instant and familiar (it works through UPI apps like PhonePe and Google Pay), while e-NACH has no upper limit but takes 3 working days to activate.

| Feature | UPI AutoPay | e-NACH (NPCI) |
|---------|------------|---------------|
| Activation Speed | **Instant** | 3 working days |
| UX | UPI app (PhonePe/GPay/BHIM) | Net banking / debit card / Aadhaar |
| Standard Limit | Rs.15,000/txn | **No upper cap** |
| **Securities Broker Limit** | **Rs.1,00,000/txn** (MCC 6211) | No cap |
| Regulatory Basis | RBI/2023-2024/88 (Dec 2023) | NPCI (National Payments Corporation of India) e-NACH guidelines |
| Best For | SIP up to Rs.1L, quick mandate setup during onboarding | Larger margin funding EMIs, no amount cap |
| Vendor | Setu, Razorpay, Cashfree, PhonePe | All banks via NPCI clearing |

In plain English: for most retail customers setting up SIP mandates during onboarding, UPI AutoPay is the better choice — it activates instantly and the customer simply approves it on their UPI app. The Rs.1,00,000 per transaction limit (available specifically for securities brokers under MCC 6211) is sufficient for the vast majority of retail SIPs. For larger amounts — such as margin funding EMIs (Equated Monthly Installments) or institutional-grade recurring debits — use e-NACH, which has no upper cap but takes 3 days to activate.

:::tip[Securities Brokers Get a Higher UPI AutoPay Limit]
The standard UPI AutoPay limit is Rs.15,000 per transaction, but RBI (Reserve Bank of India) granted an enhanced limit of Rs.1,00,000 per transaction for securities brokers (MCC 6211) in December 2023. Make sure your payment gateway is configured with the correct MCC to take advantage of this higher limit.
:::

Beyond recurring mandates, there is a newer mechanism — UPI Block — that changes how trade settlement works for certain brokers.

## UPI Block Mechanism (ASBA-like for Secondary Market)

:::danger[Mandatory for QSBs from Feb 1, 2025]
**Mandatory for QSBs (Qualified Stock Brokers) from Feb 1, 2025.** SEBI (Securities and Exchange Board of India) mandated that Qualified Stock Brokers must offer either UPI block mechanism (funds blocked in customer bank, debited only on trade execution) OR 3-in-1 trading account. This is separate from autopay — it applies to trade settlement where customer funds stay in their bank until needed. Reduces counterparty risk.
:::

The UPI Block mechanism is fundamentally different from UPI AutoPay and e-NACH. While AutoPay and e-NACH are about recurring debits (money moves from the customer's bank to the broker's account), UPI Block is about blocking funds — the money stays in the customer's bank account, earning interest, and is only debited when a trade actually executes. This is similar to the ASBA (Application Supported by Blocked Amount) mechanism that has been used for IPO (Initial Public Offering) applications for years.

### How UPI Block Works

1. Customer creates a block on their UPI app for a specified amount
2. Funds remain in customer's bank account (earns interest)
3. On trade execution, only the required amount is debited
4. Remaining blocked amount is released
5. Similar to ASBA mechanism used in IPO applications

In plain English: with UPI Block, the customer says "I want to keep Rs.50,000 available for trading" — the bank marks that Rs.50,000 as blocked (so the customer cannot spend it elsewhere), but the money stays in the customer's account and continues earning interest. When the customer buys Rs.10,000 worth of shares, only Rs.10,000 is debited, and the remaining Rs.40,000 block is reduced accordingly. This is better for the customer (they earn interest on idle funds) and reduces risk for the system (the broker never holds the customer's money).

:::caution[UPI Block Is Different from UPI AutoPay]
Do not confuse UPI Block with UPI AutoPay — they solve different problems. UPI AutoPay is for recurring scheduled debits (SIPs, subscription fees). UPI Block is for trade settlement, where the exact debit amount is not known in advance. A broker may use both: UPI AutoPay for monthly SIP contributions and UPI Block for intraday and delivery trade settlements.
:::

### Impact on Onboarding

The UPI Block mechanism has direct implications for how you design the onboarding flow, particularly for QSBs who are required to offer it.

- During onboarding, offer UPI Block setup as an option alongside traditional fund transfer
- QSBs must present this option to all new clients
- Non-QSBs can offer it as a value-add feature
- Integration requires partnership with UPI-enabled banks

:::tip[Competitive Advantage for Non-QSBs]
Even if you are not a QSB (and therefore not mandated to offer UPI Block), implementing it voluntarily is a strong differentiator. Customers keep their money in their own bank account, earn interest on blocked funds, and face lower counterparty risk. This is an easy story to tell during customer acquisition.
:::

In plain English: during onboarding, present the customer with a choice — "Would you like to set up UPI AutoPay for SIP contributions?" and, if applicable, "Would you like to enable UPI Block for trade settlements?" Both can be set up in the same session, and both use the customer's existing UPI app, so the friction is minimal.

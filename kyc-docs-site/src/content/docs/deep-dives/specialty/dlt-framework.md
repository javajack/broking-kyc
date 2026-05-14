---
title: "Deep Dive: DLT Framework (TRAI TCCCPR)"
description: Reference-heavy walkthrough of the TRAI Distributed Ledger Technology framework — TCCCPR 2018, entity registration, header (sender ID) registration, template registration (transactional / promotional / service-explicit / service-implicit), DLT scrubbing engines, common error codes, and broker obligations across SMS / email / WhatsApp.
---

import { Aside } from '@astrojs/starlight/components';

> **Why this page is structured this way:** Brokers depend on transactional and service-explicit communications for almost every event in the trade lifecycle — order acknowledgement, contract note dispatch, margin shortfall, KYC reminder, SIP debit, IPO mandate. Every such message in India must be routed through the **TRAI DLT (Distributed Ledger Technology) framework** with a registered header (sender ID) and a registered template, scrubbed by a telecom operator. A misregistered or expired template produces silent failures (DLT_TEMPLATE_MISMATCH) that customers see as missing notifications and that auditors flag as compliance breaches. This page is reference-heavy because the framework is technical and field-specific; the broker's compliance officer and the broker's communications-vendor integration engineer both need fluency. Voice mirrors the [lifecycle/](/broking-kyc/lifecycle/) pages, with reference-style tables.

## TL;DR

- **TRAI DLT** = Distributed Ledger Technology framework operationalised under the **Telecom Commercial Communications Customer Preference Regulations 2018 (TCCCPR 2018)**. The framework moved entity registration, header registration, and template registration onto a blockchain-style registry hosted by the Access Provider (telco operator).
- **Principal Entity (PE)** = the broker (or any commercial sender). Each PE registers on the DLT portal of one operator (Vodafone Idea, Airtel, BSNL, Jio, MTNL) — once registered, the PE record propagates to other operators' DLT registries via the inter-operator registry.
- **Header (Sender ID)** = 3–11 character alphanumeric (typically 6 characters) — e.g., `ZRDHCO`, `KOTAKB`, `AXISBN`. Each header is tied to a PE and a message category (transactional / promotional / service-explicit / service-implicit).
- **Template** = the actual SMS body, with placeholders for variable content (account number, amount, date). Each template is registered against a header and a category. Variable content must respect declared character types (alphanumeric, numeric only, decimal, etc.).
- **Scrubbing** = the telco's gateway at message-receipt time validates: sender PE → header → template → variable content. Failed scrubbing returns a DLT-specific error code; the message is **not delivered**.
- **Template approval cycle** = 3–7 working days typical (PE-side review, operator DLT-team review, blockchain commit). Urgent templates can be expedited but uniformly take at least 24 hours.
- **Email DLT** = a parallel but less restrictive framework (TRAI doesn't directly regulate email; AMFI / SEBI rules and DPDP define the obligation). Most broker email is sent without DLT-style scrubbing but must respect the SEBI investor-protection framework, the DPDP Act 2023, and the DLT-aligned content templates used for compliance audit trails.
- **WhatsApp Business** = subject to Meta's Business Solution Provider (BSP) framework + India's outbound communication policy. The DLT framework doesn't formally apply to WhatsApp, but Indian banks / NBFCs / brokers route WhatsApp communications through BSPs that maintain DLT-equivalent governance (template approval, opt-in management).
- **Broker obligations**: PE registration with at least one operator; headers registered for each communication category; templates registered for every transactional / service-explicit message body the broker sends; opt-out (NDNC) compliance for promotional messages.
- AI-generated synthesis. **Verify any specific provision against the TRAI / operator DLT registry documentation before acting.**

## Conceptual overview

In 2010–2015, India's commercial SMS volumes ballooned and customer complaints about spam, unsolicited calls, and unauthorised use of bank / NBFC names spiked. TRAI's earlier 2007–2010 framework (the Telecom Commercial Communications Customer Preference Regulations) relied on a centralised National Do Not Call (NDNC) registry plus operator-side filtering — both proved inadequate. SIM-card fraud, header spoofing (a sender claiming to be `SBI` when it wasn't), and template-content drift (banks adding promotional inserts to transactional messages) were the visible failure modes.

The TCCCPR 2018, notified by TRAI on 19 July 2018, replaced the centralised model with a **distributed ledger** held by each telecom operator. Each operator (initially the Big-4: Bharti Airtel, Vodafone Idea, Reliance Jio, BSNL) maintains its own DLT registry on a blockchain platform. The registries are kept in sync via an inter-operator gateway. Entities register once on any operator's DLT portal; the registration propagates.

The mechanism is fundamentally a **pre-registration + scrubbing** approach. Every commercial entity that wants to send SMS / voice / OBD (Outbound Dialler) communication must:

1. Register as a **Principal Entity (PE)** — submit company PAN, GSTIN, address, contact, authorised signatory.
2. Register one or more **Headers (Sender IDs)** under the PE — e.g., `ZRDHCO`, `KFINIB`, `KOTAKB`.
3. Register **Templates** for each message it intends to send, under each header.
4. Tie up with a **Telemarketer (TM)** or **Aggregator** that has telco-API access — the actual message-sending entity. PE + TM are linked.

When a message is submitted to the telco's gateway, the gateway **scrubs** the message:

- Is the sender PE registered? Yes / No.
- Is the header (sender ID) registered under that PE? Yes / No.
- Does the message body match a registered template? Variable-content vs static-content match.
- For promotional messages — is the recipient on the NDNC opt-in list (or off the NDNC opt-out list)?
- For transactional / service-explicit — proceed regardless of NDNC.

Failed scrubbing returns a DLT-specific error code (DLT_TEMPLATE_MISMATCH, DLT_HEADER_INVALID, etc.) and the message is not delivered. Pass scrubbing and the message routes to the SMSC, which delivers to the handset.

For a stock broker, the DLT framework affects nearly every customer-facing notification — order acknowledgements, contract note dispatch links, margin shortfall alerts, KYC reminders, SIP debit confirmations, IPO mandate prompts. A misregistered template silently breaks the notification stream for that message class. The broker's CS / Compliance team monitors DLT delivery rates and template-approval status as a routine matter.

<Aside type="note">
**Why DLT matters more for brokers than for most other industries.** Brokers are heavy SMS senders by volume (a typical retail-broker client receives 50+ SMS / month — order acks, contract notes, MTM intra-day, margin alerts, KYC reminders) AND by criticality (a missed margin-call SMS can cost the client real money). The cost of even a 1% DLT-failure rate is material. Most large brokers run a dedicated DLT-engineering function that monitors template approvals and delivery health continuously.
</Aside>

## 1. The TRAI DLT actor map

A simplified diagram of the entities in DLT message flow:

```
[Principal Entity]    e.g., broker (Zerodha, ICICI Securities, Angel One)
       │
       │  contracts with
       ▼
[Telemarketer / Aggregator]    e.g., Kaleyra, Karix, Tanla, Route Mobile, MSG91
       │
       │  routes via API
       ▼
[Access Provider (Telco)]    e.g., Airtel, Vodafone Idea, Jio, BSNL
       │
       │  scrubs against DLT registry
       ▼
[SMSC / Routing]    operator's internal SMS Service Centre
       │
       │  delivers to
       ▼
[Recipient handset]
```

Each entity has distinct DLT obligations:

- **PE (broker)** — registers identity, headers, templates. Pays an annual registration fee and per-header / per-template fees on the operator's DLT portal.
- **TM (telemarketer)** — also registered on DLT, with its own ID. Acts as the API-level sender. A PE can have multiple TMs; a TM can serve multiple PEs.
- **Access Provider (telco)** — runs the DLT registry, performs scrubbing, charges per-message routing fees (typically Rs 0.10–0.30 for transactional SMS depending on volume, route, and operator).
- **NPC** — Numbering Plan Committee (under DoT) defines the header allocation rules and the message-category framework.

## 2. Principal Entity registration

Step-by-step PE registration:

### Step 1 — Choose an operator

PE registers on **one** operator's DLT portal — the broker chooses one based on existing relationship, portal usability, or telecom-team preference. The big-4 operators each have a DLT portal:

- **Vodafone Idea (Vi) DLT portal** — `vilpower.in`.
- **Airtel DLT portal** — `dltconnect.airtel.in`.
- **Reliance Jio DLT portal** — `trueconnect.jio.com`.
- **BSNL DLT portal** — `bsnldlt.in`.

Some smaller brokers register on Tanla's Trubloq DLT platform (a blockchain-based DLT scrubbing platform used by VI / Airtel / BSNL operators — see [Vendor Atlas DLT category](/broking-kyc/vendors/atlas/#dlt--sms--whatsapp-12-products)).

### Step 2 — Submit PE documents

The PE submission requires:

- **Entity PAN** — the broker's PAN.
- **GSTIN** — broker's GST registration.
- **Authorised signatory details** — name, DOB, mobile, email, PAN, address (signatory must be a director / KMP).
- **Entity address** — registered office address with proof.
- **Business type** — corporate / partnership / LLP / proprietorship / etc.
- **Sector / industry** — financial-services / stockbroker / NBFC / etc.

### Step 3 — Validation

The operator's DLT team validates the documents (typical 2–5 working days). Some operators have an OTP-based authorised-signatory validation step that is automatic; others have manual document review.

### Step 4 — Inter-operator propagation

Once the PE is registered with one operator, the inter-operator registry propagates the PE record to all other operators. The broker doesn't need to re-register; subsequent header / template registrations can be done on any operator's portal (some operators don't fully sync templates immediately — registering templates on the same operator as the PE registration is safer).

### Step 5 — Annual renewal

PE registration is valid for one year, renewed annually with a small fee (typically Rs 5,000–10,000 plus GST). Non-renewal results in PE deactivation and header / template invalidation.

## 3. Header (Sender ID) registration

A header is the 3–11 character (typically 6-character) alphanumeric identifier that appears as the sender of the SMS on the recipient's handset. For brokers, headers are typically 6 characters and follow patterns like:

- `ZRDHCO` (Zerodha)
- `ICICIB` (ICICI Bank)
- `KOTAKB` (Kotak Bank)
- `AXISBN` (Axis Bank)
- `KFINIB` (KFintech)

Headers are tied to **categories**:

### Category 1: Transactional

For OTPs and banking confirmations only. Reserved for banks / NBFCs / wallet operators. Stockbrokers do not get transactional headers (these are reserved for OTP traffic from REs that issue card / banking instruments).

### Category 2: Service-Explicit

The bulk of broker SMS. Sent only to customers who have given explicit consent (which is implicit in the broker-client onboarding agreement). Examples: contract note dispatch link, margin shortfall alert, KYC re-validation reminder, SIP debit confirmation, IPO mandate notification.

Brokers must have a service-explicit header for each communication stream — typically one or two headers cover all service-explicit traffic.

### Category 3: Service-Implicit

For customers who are existing customers (relationship implies consent) but where the message is service-related rather than transactional. Examples: weekly portfolio summary, monthly statement, IPO listings update (sometimes — debatable categorisation).

### Category 4: Promotional

For prospects and customers who have opted in to promotional traffic. Examples: new product launches, referral campaigns, market commentary. Subject to NDNC opt-out — recipients on the National Do Not Call registry don't receive promotional messages.

### Header registration process

The broker submits each header to the operator's DLT portal:

- Header text (e.g., `ZRDHCO`).
- Category (transactional / service-explicit / service-implicit / promotional).
- Purpose / description.
- Sample template.

Operator validates: header doesn't conflict with another PE, header text is appropriate (not misleading, not infringing another brand), category is appropriate. Approval typically takes 3–7 working days. Per-header fee is typically Rs 5,000–10,000 + GST.

Approved headers are entered into the operator's DLT blockchain registry and propagated to other operators.

### Header naming conventions

- 3–11 alphanumeric characters (no special chars).
- Recommendations: 6 characters; either uppercase only or mixed-case (typically uppercase for legacy compatibility).
- Avoid generic terms (TRAI rejects `SUPPORT`, `OFFER`, `BONUS` etc.).
- Brand-aligned: should reflect the broker's brand or a known prefix.

## 4. Template registration

This is the densest part of the DLT framework. Every SMS body the broker intends to send must be pre-registered as a **template**.

### Template structure

A template has:

- **Static text** — fixed content.
- **Variable placeholders** — `{#var#}` markers (numbered or anonymous).
- **Variable character types** — declared at template registration (alphanumeric, numeric, decimal, special-chars-allowed, etc.).
- **Variable max-length** — character limit per placeholder.
- **Category** — transactional / service-explicit / service-implicit / promotional.
- **Header** — the sender ID this template uses.
- **Language** — English by default; regional languages supported with appropriate Unicode handling.

### Example template

```
Dear {#var#}, your order #{#var#} for {#var#} units of {#var#} has been placed.
Order time: {#var#} Total value: Rs {#var#}. Login to confirm details. -ZRDHCO
```

The variables would be declared as:

- var1: alphanumeric, max 50 (client name).
- var2: alphanumeric, max 16 (order ID).
- var3: numeric, max 8 (units).
- var4: alphanumeric, max 50 (security name).
- var5: alphanumeric, max 19 (timestamp, format `DD-MMM-YYYY HH:MM`).
- var6: decimal, max 12 (rupee value with two decimals).

The scrubbing engine validates that runtime content fits these declarations. A breach (e.g., var3 receives "abc" instead of digits) triggers a scrubbing failure.

### Template approval cycle

Approval cycle: 3–7 working days typical. The cycle consists of:

1. **PE submits** template on operator's DLT portal.
2. **Operator's DLT review team** validates content (no misleading info, no unauthorised promotional content in a service-explicit template, no brand infringement).
3. **Blockchain commit** — approved template is committed to the DLT registry with a **content template ID** (a unique numeric identifier, e.g., `1207165123456789012`).
4. **Inter-operator sync** — the approved template propagates to other operators' registries.

Per-template fees are typically Rs 500–1,500 + GST.

### Template categories and content rules

Each category has content restrictions:

- **Service-explicit** — can include service URL, account / transaction info, customer name. Cannot include promotional content (e.g., "Open a new account to earn Rs X"). Subject to character-length limits and disclosure requirements.
- **Service-implicit** — broader allowed content; can include general communications. Still no promotional offers.
- **Promotional** — explicit promotional content allowed; recipients must not be on NDNC.

### Template versioning

A template can be revised — the broker submits a new version with edits and a fresh review cycle runs. Until the new version is approved, the old version remains the canonical template. Best practice is to maintain template versions in a registry that the broker's communications system references; expired templates fail scrubbing.

## 5. Scrubbing — the DLT gateway

When the broker (via its TM / aggregator) submits a message to the telco's gateway, the gateway runs scrubbing:

### Scrubbing checks

1. **PE check** — is the sender PE registered and active?
2. **Header check** — is the header (sender ID) registered under the PE?
3. **Template match** — does the message body match a registered template? Variable substitution is computed; the static parts must match exactly.
4. **Variable character-type check** — runtime values must conform to declared types.
5. **NDNC check** (promotional only) — is the recipient on NDNC opt-out?
6. **Time-window check** — promotional messages must be sent within the permitted window (9 AM to 9 PM IST). Some operators restrict to 9 AM to 9 PM IST irrespective of category for safety.
7. **Velocity / throttle check** — operator-side rate-limiting (typically 100–10,000 SMS / sec per PE).

Pass → routes to SMSC → delivered to handset.
Fail → returns DLT error code → broker receives delivery failure with reason.

### Scrubbing engines

Different operators use different scrubbing engines. The most widely used:

- **Trubloq** (operated by Tanla Platforms) — used by Vi, Airtel, BSNL for DLT scrubbing. Blockchain-based registry with Hyperledger Fabric underneath.
- **Tata Communications Wisely** — competing scrubbing layer.
- **TanlaConnect** — Tanla's PE-side platform.

The broker doesn't usually interact with the scrubbing engine directly — the TM / aggregator handles the integration. But the broker's compliance team should know which engine is in play for each operator, particularly during incident investigation.

## 6. Common DLT error codes

When a message fails scrubbing, the telco's gateway returns one of a defined set of error codes. Brokers see these in their TM / aggregator's delivery reports. The most common:

| Error Code | Meaning | Typical Cause | Resolution |
|---|---|---|---|
| `DLT_TEMPLATE_MISMATCH` | Message body doesn't match any registered template | Template text was updated without DLT re-registration; or template approved but not yet propagated | Re-register or wait for propagation; ensure code path uses correct content-template-ID |
| `DLT_HEADER_INVALID` | Header is not registered or not in the right category | Header was deactivated; or sender used a wrong header | Re-register or correct header |
| `DLT_PE_INVALID` | Principal Entity is not registered or expired | Annual renewal lapsed; or PE de-registered | Renew or re-register |
| `DLT_NDNC_BLOCK` | Recipient on NDNC opt-out (promotional only) | Recipient has opted out of promotional SMS | Honour opt-out; do not retry |
| `DLT_TEMPLATE_INACTIVE` | Template was registered but later deactivated | Operator-side suspension (often content-policy issue) | Investigate suspension reason; re-register if appropriate |
| `DLT_VARIABLE_LENGTH` | Variable content exceeds declared max length | Code path sent a longer value than template declared | Truncate or update template to allow longer |
| `DLT_VARIABLE_CHARTYPE` | Variable content has disallowed character type | E.g., declared "numeric" got alphabetic content | Sanitise data; or update template to allow alphanumeric |
| `DLT_PROMOTIONAL_TIME` | Promotional message sent outside 9 AM–9 PM window | Time-of-day routing didn't honour the rule | Adjust send time |
| `DLT_INSUFFICIENT_CREDIT` | TM / PE has run out of message credits | Pre-paid credit pool exhausted | Top up; switch to post-paid where supported |
| `DLT_DUPLICATE` | Same message submitted recently to same recipient | De-duplication at TM / operator | Investigate code path; suppress duplicates |
| `DLT_REGEX_MISMATCH` | Template format / placeholder error | Code path doesn't match the variable structure of the template | Align code template with DLT registry |

A broker monitoring DLT health watches the **ratio of failed-to-successful** deliveries by error code. Spikes of TEMPLATE_MISMATCH typically indicate a template-version mismatch between code and registry. Spikes of HEADER_INVALID typically indicate registry expiry or operator-side header suspension.

## 7. Principal Entity vs Registered Telemarketer

These two registrations sit at different layers:

### Principal Entity (PE)

The **content originator** and the **regulatory accountable party**. For a broker, the broker is the PE. PE is registered with TRAI / operator under TCCCPR 2018. PE is responsible for:

- Template registration.
- Header registration.
- NDNC compliance for promotional.
- Customer consent for service-explicit / service-implicit.
- Annual renewal.

### Registered Telemarketer (TM) / Aggregator

The **route operator** — the entity that has API connectivity to the telco gateways. TMs are themselves registered on the DLT registry. Brokers typically contract with one or more TMs (e.g., Kaleyra, Karix, Tanla, Route Mobile, MSG91). The TM:

- Provides REST API to PE for message submission.
- Routes messages to the right telco gateway based on recipient operator detection.
- Handles delivery-receipt callbacks.
- Maintains the PE's template-registry mapping on its side.
- Pays the per-message routing fee to telco, recovers from PE per its commercial agreement.

A broker can have multiple TMs for redundancy or for category-specific routing. SEBI / TRAI rules don't restrict the choice of TM; the broker is responsible for PE-level compliance regardless of TM.

## 8. Broker DLT obligations — SMS

### Daily obligations

- Maintain active PE registration with at least one operator.
- Maintain active headers covering all communication categories the broker uses.
- Maintain active templates for every message body in the broker's communication code paths.
- Honour customer opt-outs (NDNC) for promotional traffic.
- Maintain DLT delivery health dashboard (failure rate, error-code distribution).

### Weekly / monthly obligations

- Review delivery-failure reports from TMs.
- Review template-approval queue (templates in pending / under-review state).
- Reconcile billed message counts vs delivered message counts.

### Annual obligations

- Renew PE registration.
- Renew headers (typically auto-renewed if PE is renewed).
- Audit template registry — remove unused templates, consolidate duplicates.
- Conduct DLT-compliance review with TM (typical during the vendor performance review).

### SEBI investor protection angle

The SEBI investor-charter framework requires dispatching contract notes via SMS link within T+24h of the trade. The dispatch must use DLT-approved templates. Audit trails of dispatch (template ID, header, delivery status) must be preserved for at least 8 years per SEBI record-retention rules. A documented failure of DLT dispatch (e.g., template expiry causing a missed contract note) attracts investor-protection-domain penalties.

## 9. Email DLT framework

Email is governed differently than SMS in India:

- TRAI does **not** directly regulate commercial email (TCCCPR 2018 covers SMS, voice, OBD — not email).
- Indian commercial email is governed by the **DPDP Act 2023** (data protection / consent obligations), SEBI / AMFI / RBI investor-protection rules, and global anti-spam frameworks (CAN-SPAM, GDPR equivalents).

That said, many brokers maintain **email templates** parallel to their SMS DLT templates for several reasons:

- **Audit trail** — same template ID across SMS and email simplifies audit.
- **DPDP consent** — email content must respect declared purpose; templates make this auditable.
- **DLT-equivalent governance** — even though not mandatory, treating email like SMS templates produces better operational control.

### Email content requirements (broker context)

- Sender email address must be authenticated (SPF, DKIM, DMARC) — spoofed sender domains hit recipient spam filters.
- Subject line and content must respect SEBI advertising / investor-protection rules.
- Promotional emails must include an unsubscribe link.
- Email signatures should include the broker's SEBI registration, exchange membership numbers, and grievance contact.

### Email service providers

Common ESPs used by brokers:

- AWS SES (Amazon Simple Email Service) — high-volume, low-cost transactional email.
- SendGrid (now Twilio SendGrid) — popular for transactional + marketing.
- Postmark — strict transactional / broadcast separation, helpful for compliance.
- Gmail / O365 with SMTP relay — smaller brokers.

The broker's communications-engineering team configures DKIM / SPF / DMARC on the broker's domain, sets up the ESP integration, and maintains template libraries.

## 10. WhatsApp Business DLT considerations

WhatsApp Business is fundamentally different from SMS but Indian brokers route customer communications through WhatsApp via the **Meta WhatsApp Business Platform** (formerly WhatsApp Business API). Mechanics:

### Meta's framework

- Brokers must work with a **Business Solution Provider (BSP)** that has WhatsApp Business API access — Gupshup, Infobip, Kaleyra, Karix, Tanla, MSG91, Twilio (see [Vendor Atlas](/broking-kyc/vendors/atlas/#dlt--sms--whatsapp-12-products)).
- The broker registers a **WhatsApp Business Number** with the BSP. The number is **verified** by Meta (business verification).
- The broker registers **message templates** with Meta — these are different from DLT templates but conceptually similar. Each template has static text + variable placeholders, is approved by Meta, and is tied to the business number.

### Inter-relationship with DLT

The TRAI DLT framework does **not directly** govern WhatsApp. WhatsApp messages are sent via Meta's API, not via Indian telco gateways. However:

- WhatsApp traffic is subject to **DPDP Act 2023** in India — consent obligations apply.
- WhatsApp traffic is subject to **SEBI investor-protection** rules — same content standards as SMS.
- Some operators (Vi, Airtel) charge for WhatsApp-Business traffic via separate rate cards; the BSP handles billing.

Best practice: brokers maintain a parallel WhatsApp template registry that mirrors the DLT registry for SMS templates. The same content (with format adapted for WhatsApp's rich-message features) is sent on both rails for redundancy. Customer opt-in for WhatsApp is collected separately from SMS opt-in.

### WhatsApp message categories (Meta-side)

Meta categorises business messages similarly to TRAI:

- **Authentication** — OTPs (subject to verification window).
- **Utility / Transactional** — order confirmations, statements, reminders.
- **Marketing** — promotional content (subject to recipient opt-in window).
- **Service** — customer-initiated conversations / replies.

Each category has different per-conversation pricing from Meta. Broker compensation for WhatsApp typically passes through the BSP's per-conversation invoice.

<Aside type="tip">
**WhatsApp is increasingly the preferred channel for richer notifications.** SMS is text-only with strict character limits. WhatsApp supports rich media — embedded contract-note PDFs, transaction-confirmation cards with action buttons, IPO-bid status with mini-charts. Several brokers have shifted contract-note delivery and statement delivery to WhatsApp as the primary channel, with SMS as backup. This shifts cost from per-SMS to per-WhatsApp-conversation, which is sometimes lower at scale. The compliance angle is unchanged — the same SEBI rules apply.
</Aside>

## 11. Promotional vs transactional — content rules

The distinction between promotional and transactional / service-explicit is one of the most-policed aspects of the DLT framework.

### What is promotional

- Offers — "Open a new account and earn Rs X cashback."
- New product launches — "We have launched a new IPO subscription feature."
- Referral campaigns — "Refer a friend, earn Rs Y."
- Market commentary that promotes the broker — "Subscribe to our daily market briefing."

### What is not promotional

- Order acknowledgement — "Your buy order for ABC at Rs Y has been placed."
- Contract note dispatch — "Click here to view your contract note for today."
- Margin shortfall — "Your account margin shortfall is Rs Z. Please replenish."
- KYC re-validation reminder — "Your KYC re-validation is due by [date]."
- Regulatory notification — "SEBI has mandated [X]; please update your profile."
- Authentication — "Your OTP is 123456."

### Mixing promotional with transactional

A transactional or service-explicit template that includes promotional content is rejected at registration. E.g., an order-acknowledgement template that says "Your order has been placed. Also, refer a friend and earn Rs 500!" — the second sentence makes it promotional, even though the first is transactional. This template would fail DLT review.

The broker must keep these streams separate. Transactional / service-explicit messages go in one stream with relevant templates. Promotional messages go in a separate stream with their own templates and respect NDNC opt-outs.

## 12. Edge cases and operational scenarios

### Same content needed in multiple languages

Each language requires a separate template registration. English + Hindi + Tamil for the same content = 3 templates. The broker's code path selects the right template based on the client's preferred language.

### Template content changes due to regulatory updates

When a SEBI / RBI / exchange rule changes the disclosure / mandatory content of a notification (e.g., "Disclose XX% commission on every confirmation"), the broker must:

1. Revise the SMS template content.
2. Re-submit to DLT registry.
3. Wait 3–7 days for approval.
4. Switch the code path to the new template.

During the transition, the old template remains active; the broker can switch instantly to the new template once approved. A "hot patch" is not possible; pre-planning is required.

### Bulk dispatch (e.g., quarterly statements)

Large batches (millions of SMS over a few hours) require pre-coordination with the TM and operator. Operator-side rate limits may not allow unconstrained bulk; the TM should be informed in advance. Smear-the-load over multiple hours is a common pattern.

### Mismatched content with template

Code drift — a backend developer changes the SMS content without updating the DLT template — produces TEMPLATE_MISMATCH at runtime. Best practice: lock the template content in code as constants, and any change requires a paired DLT submission. Automated tests should validate that code SMS content matches the registered template.

### Customer disputes a message they didn't get

When a customer claims they didn't receive a margin-shortfall alert and faces a subsequent margin call:

1. Pull DLT delivery logs from the TM.
2. Check status: queued / submitted / delivered / failed / bounced.
3. If failed, capture the error code; root-cause (template? header? PE? variable?).
4. Document for grievance handling.

A documented DLT failure (e.g., template expiry) is a broker-side failure; the broker may have liability for the resulting customer loss. This is one reason continuous DLT-health monitoring matters.

### Operator-side outage

If a telco's DLT scrubbing engine is down (rare but happens), messages routed via that operator's gateway fail. The TM typically routes traffic via alternative operators where possible, but for region-specific subscribers, fallback may not be possible. The broker's monitoring should detect this and surface it to compliance for incident reporting.

### Template suspension by operator

Operators occasionally suspend templates if customer complaints suggest mis-categorisation (e.g., a "service-explicit" template that customers report as unsolicited). The broker is notified; the template is investigated; if appropriate, the broker re-submits with corrections.

### Cross-border numbers

For India-resident numbers, DLT applies. For non-India-resident numbers (e.g., NRI clients with foreign mobile numbers), the message routes via the TM's international SMS rail. DLT registration doesn't apply for foreign destinations; other-country regulations apply (typically lighter than India's DLT).

### Voice / OBD calls

The DLT framework also covers voice calls and Outbound Dialler (OBD) campaigns. Brokers running OBD campaigns (e.g., for KYC re-validation reminders, debt collection) follow a parallel registration flow for voice templates. The mechanics are similar but with audio scripts instead of text bodies.

## 13. DLT operational metrics for brokers

A broker's DLT operations team typically tracks:

- **Delivery rate** — (delivered / submitted) × 100. Target: > 95% for transactional / service-explicit; > 85% for promotional (NDNC filtering reduces this naturally).
- **Failure breakdown** — distribution of error codes; chronic spikes in any one code triggers investigation.
- **Template approval cycle time** — submit → approval, target < 5 working days.
- **Template inventory** — total registered, total active, total in-pending, total expired-this-quarter.
- **Header inventory** — same as template, plus annual renewal calendar.
- **PE renewal calendar** — annual renewal due-date.
- **Cost per message** — per-SMS cost from TM (changes with volume, route, operator mix).

## Practical notes

- **[gotcha]** Templates that include trailing space, punctuation, or special characters cause "exact-match" failures in some scrubbing engines. A template ending in `. -ZRDHCO` won't match if the code sends `. - ZRDHCO` (extra space before the hyphen). Test templates against the actual code-generated SMS, not against what the developer thinks it sends.
- **[industry practice]** Most large brokers maintain a **template-versioning system** in their code base. Each template has a content-template-ID, a version, and a feature-flag-style toggle for activation. Switching to a new template after DLT approval is a config change, not a code change.
- **[risk trade-off]** Registering on multiple operator DLT portals (rather than one) gives faster sync but increases admin overhead — separate PE / header / template entries in each. Most brokers register on one (typically Vi via Trubloq or Airtel) and rely on inter-operator sync.
- **[cost optimization]** TMs offer volume-tiered pricing. Negotiating a single TM for the broker's entire SMS volume (vs splitting across two for redundancy) typically saves 10–20% on per-message cost. The trade-off is single-vendor lock-in; some brokers split intentionally for redundancy.
- **[industry practice]** SEBI's investor-protection framework requires contract-note dispatch via SMS link within T+24h. The DLT template for this dispatch is one of the most-scrutinised — content, link format, delivery rate, audit trail. A broker that consistently fails on contract-note dispatch (whether due to DLT failures or otherwise) faces specific investor-protection-domain penalties.
- **[gotcha]** Variable character-type declarations are strict. A template declaring "var3 = numeric, max 8" and code sending `12345.67` (decimal point) will fail. Either declare as "decimal" or strip the decimal in code.
- **[industry practice]** Most brokers consolidate WhatsApp Business operations with their SMS DLT — same TM / BSP, same template registry (mapped to both SMS and WhatsApp), same compliance review. This simplifies oversight.
- **[gotcha]** Promotional SMS sent outside 9 AM–9 PM is rejected by operators regardless of NDNC status. Time-zone consideration matters for clients in border-state regions where timezone perception differs (e.g., Northeast IST sends).
- **[risk trade-off]** Long-form templates (200+ characters before placeholders) can cause SMS-segment splits at delivery time, with each segment subject to scrubbing. Better to keep templates compact; rich content goes via WhatsApp or email.
- **[industry practice]** Brokers running social-media surveillance (e.g., for misleading market-commentary content per SEBI's April 2024 mandate) also use DLT-style templates for the surveillance alert notifications to compliance staff. The mechanics are identical to customer SMS.
- **[gotcha]** Inter-operator sync occasionally has 24–48 hour lag. A template approved on Vi at 6 PM may not be active on Jio for the next 24 hours. For time-critical templates (e.g., a new IPO mandate notification), register on the operator the bulk of subscribers use first; backup operator templates can follow.

## Cross-references

- [Broker Process Narrative](/broking-kyc/broker-process/narrative/) — Section 1 covers the welcome cascade and DLT-approved template usage; Section 4 covers daily reporting touchpoints including investor servicing communications.
- [Compliance Blueprint — Investor servicing domain](/broking-kyc/operations/compliance-blueprint/#investor-servicing-15-entries) — investor charter, contract note dispatch obligations that use DLT templates.
- [Compliance Blueprint — Cyber security domain](/broking-kyc/operations/compliance-blueprint/#cyber-security-27-entries) — CSCRF retention rules apply to DLT logs as part of operational logs.
- [Vendor Atlas — DLT / SMS / WhatsApp category](/broking-kyc/vendors/atlas/#dlt--sms--whatsapp-12-products) — 12 vendor profiles for TMs / BSPs and their DLT capabilities.
- [SEBI MIRSD Circulars](/broking-kyc/reference/circulars/sebi-mirsd/) — investor-protection master circular covers contract-note dispatch rules.
- [Lifecycle: Re-KYC](/broking-kyc/lifecycle/re-kyc/) — re-KYC reminder cascade uses DLT-approved templates.
- [Operations: Integration DAG BOD](/broking-kyc/operations/integration-dag/bod/) — DLT-vendor connectivity is part of broker operational-health checks.

## Verified through

2026-05-14

---

*AI-generated and not legal, financial, or compliance advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*

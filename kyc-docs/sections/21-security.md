<section id="security">
## <span class="section-num">21</span> Security &amp; Compliance Requirements

<p class="section-brief"><strong>Security standards the KYC system must meet</strong> &mdash; encryption, access control, API security, Aadhaar data vault requirements, and compliance with SEBI cybersecurity framework, DPDP Act 2023, and PCI DSS.</p>

| Requirement | Standard |
|---|---|
| Transport | TLS 1.2+ (HTTPS only) |
| Authentication | API keys rotated quarterly |
| IP Whitelisting | Required for KRA, recommended for all |
| Data Encryption | AES-256 for data at rest |
| PII Handling | Mask Aadhaar (XXXX-XXXX-1234), tokenize PAN |
| Data Retention | 8 years (SEBI 2026 Regulations) |
| VIPV Recording | 7 years minimum (tamper-proof) |
| DPDP Act 2023 | Consent management, data principal rights |
| Vendor SLA | 99.9% uptime, <3s P95, India data center, SOC 2 / ISO 27001 |

</section>

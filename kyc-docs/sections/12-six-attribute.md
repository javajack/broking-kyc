<section id="six-attribute">
## <span class="section-num">12</span> 6-Attribute Matching &amp; Data Reconciliation

::: {.info-box .red}
**Critical SEBI Mandate:** Six KYC attributes must be consistent across KRA records, Exchange UCC, and Depository BO accounts. PAN is the primary linkage key. Mismatches block settlement and can freeze accounts.
:::

### The 6 Mandatory KYC Attributes

| # | Attribute | Verification Source | SEBI Requirement |
|---|---|---|---|
| 1 | **Name** | PAN card (NSDL/Protean) | Must match as per PAN records across KRA, exchange UCC, and demat account |
| 2 | **PAN** | Income Tax Dept (via Protean) | Primary key. PAN-Aadhaar linkage mandatory. BSE requires 3-param verification (PAN+Name+DOB). |
| 3 | **Address** | Aadhaar / DigiLocker | Correspondence address must be consistent. Permanent address from Aadhaar. |
| 4 | **Valid Mobile Number** | OTP verification | KRA verifies mobile against official databases. Must be unique per client. |
| 5 | **Email Address** | OTP verification | KRA verifies email. Contract notes and statements sent here. |
| 6 | **Income Range** | Client declaration / AA / bank statement | Required for demat account opening (effective Aug 1, 2021 for new; Mar 31, 2022 for existing) |

### Key Regulatory References

| Circular | Date | Subject |
|---|---|---|
| SEBI/HO/MIRSD/DOP/CIR/P/2019/136 | Nov 15, 2019 | Mapping of UCC with Demat Account based on PAN |
| SEBI/HO/MIRSD/FATF/P/CIR/2023/0144 | 2023 | KRA attribute verification against official databases (incl. M-Aadhaar) |
| SEBI/HO/MIRSD/SECFATF/P/CIR/2024/41 | May 14, 2024 | Review of KYC validation at KRAs &mdash; simplified PAN-Aadhaar risk framework |
| SEBI/HO/MIRSD/MIRSD-PoD-1/P/CIR/2023/37 | Mar 16, 2023 | KYC attribute requirements for depository accounts |

### UCC &harr; Demat Mapping Mechanism

```
SEBI CIRCULAR (Nov 2019): UCC ↔ Demat Mapping

Exchange (NSE/BSE/MCX)          Depository (CDSL/NSDL)
       │                                │
       │  Daily UCC data file           │
       │  (PAN, Segment, TM/CM,        │
       │   UCC allotted)               │
       │─────────────────────────────▸  │
       │                                │ Maps UCC to BO account
       │                                │ based on PAN
       │                                │
       ▼                                ▼
   ┌──────────┐  PAN = Primary Key  ┌──────────┐
   │ Trading  │◄────────────────────│  Demat   │
   │ Account  │   Must match:       │  Account │
   │ (UCC)    │   PAN, Name, DOB    │  (BO ID) │
   └──────────┘                     └──────────┘

• One-time bulk mapping done by Nov 30, 2019
• Incremental (new UCCs) shared DAILY thereafter
• Multiple UCCs for single PAN: all mapped holder-wise
• Clients can request DP to delink or add UCC
• Depositories validate with exchanges before UCC changes
```

### What Happens When Attributes Don't Match

| Mismatch Type | Impact | Resolution |
|---|---|---|
| PAN mismatch (trading vs demat) | <span style="color:var(--red);font-weight:700;">Settlement blocked</span> | Cannot debit/credit securities. Client must correct PAN at one end. |
| Name spelling difference | UCC rejection / KRA hold | Normalize to PAN name. BSE: only modifiable via Unfreeze request + Protean re-verification. |
| Mobile/Email not verified at KRA | KYC not portable | Client verifies via M-Aadhaar or KRA portal OTP. |
| PAN-Aadhaar not linked | KYC not portable, account may freeze | Client links at incometax.gov.in. Without linkage, existing trading allowed but KYC non-portable. |
| Income range missing | Demat account opening blocked | Client must declare income range (mandatory since Aug 2021). |
| Address inconsistency | KRA hold possible | Update via KRA modify or CKYC update. |

### Segment Activation Requirements per Exchange

| Segment | Income Proof | Min Income | Risk Disclosure | Additional Requirements |
|---|---|---|---|---|
| **Equity Cash (CM)** | No | None | General RDD | Basic KYC sufficient. Default segment. |
| **Equity F&O** | **Yes** | Broker-specific (Rs.1-5L typically) | F&O specific RDD | Trading experience declaration. Bank statement showing Rs.10K credit in last 6 months. Can use Account Aggregator. |
| **Currency Derivatives** | No | None | Currency RDD | No additional income proof beyond basic KYC. |
| **Commodity (MCX)** | **Yes** | Broker-specific | Commodity RDD | MCX registration required. Client category: Hedger/Speculator/Arbitrageur. ISV empanelment for custom front-ends. |
| **Debt / Bond** | No | None | General | Mostly available with equity segment activation. |

::: {.info-box .orange}
**Income Proof Documents Accepted:** Bank statement (6 months, showing Rs.10K+ credit), ITR acknowledgement, Form 16, salary slip (3 months), net worth certificate (CA-certified), FD receipt. Alternatively: **Account Aggregator consent-based fetch** (see <a class="xref" href="#aa-framework">Section 5</a>) eliminates manual upload entirely.
:::

</section>

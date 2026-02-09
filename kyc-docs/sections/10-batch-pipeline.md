<section id="batch-pipeline">
## <span class="section-num">10</span> Async Batch Processing Pipeline

### Phase 1: Immediate (0-30 min after e-Sign)

| Job | Vendor | Output | Retry | SLA |
|---|---|---|---|---|
| Admin Review | Internal (maker-checker) | Approved / Rejected | N/A | 30 min (auto-approve if all pass) |
| KRA Submit | Digio | App ref number | 3x exponential | 1-3 working days |
| CKYC Upload | Decentro | 14-digit KIN | 3x exponential | 1-2 working days |
| Income Verify (if F&O) | Perfios | Verified income | 2x | 1-2 hours |

### Phase 2: Post-Approval

| Job | Vendor | Output | SLA |
|---|---|---|---|
| NSE UCC | NSE API/batch | UCC code | Same day (5PM cutoff) |
| BSE UCC | BSE API | UCC code | Same day |
| CDSL BO Account | CDSL DP Module | DP ID + Client ID | 1-2 hours |
| MCX UCC (if commodity) | MCX Portal | UCC code | Next working day |
| DDPI Setup (if opted) | CDSL/NSDL | DDPI registered | 1 day |

### Phase 3: Post-Registration

| Job | Vendor | Output | SLA |
|---|---|---|---|
| Segment Activation | NSE/BSE/MCX | Segments live | Same day |
| Back-Office Sync | 63 Moons ODIN | Client master record | Immediate |
| Welcome Kit | Kaleyra + AWS SES | Email + SMS | On activation |
| Nominee Video (if opt-out) | HyperVerge | Video declaration | Within 30 days |

</section>

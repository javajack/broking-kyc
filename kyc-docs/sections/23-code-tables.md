<section id="code-tables">
## <span class="section-num">23</span> Code Tables

<details>
  <summary>Occupation Codes (KRA/CKYC)</summary>

| Code | Description |
|---|---|
| 01 | Private Sector Service |
| 02 | Public Sector Service |
| 03 | Government Service |
| 04 | Business |
| 05 | Professional |
| 06 | Agriculturist |
| 07 | Retired |
| 08 | Housewife |
| 09 | Student |
| 11 | Self Employed |
| 99 | Others (specify) |

</details>

<details>
  <summary>KRA Status Codes</summary>

| Status | Trading | Action |
|---|---|---|
| KYC Registered | <span style="color:var(--green);font-weight:700;">Allowed</span> | Fetch and prefill |
| KYC Validated | <span style="color:var(--green);font-weight:700;">Allowed</span> | Fetch and prefill |
| Under Process | <span style="color:var(--red);font-weight:700;">Blocked</span> | Wait for KRA validation |
| On Hold | <span style="color:var(--red);font-weight:700;">Blocked</span> | Resolve discrepancy |
| KYC Rejected | <span style="color:var(--red);font-weight:700;">Blocked</span> | Re-submit corrected KYC |
| Not Available | N/A | Fresh KYC required |

</details>

<details>
  <summary>PAN Status Codes</summary>

| Code | Description | Onboarding |
|---|---|---|
| E / valid | Existing and Valid | <span style="color:var(--green);">Proceed</span> |
| F | Fake / Invalid | <span style="color:var(--red);">Reject</span> |
| X | Deactivated | <span style="color:var(--red);">Reject</span> |
| D | Deleted | <span style="color:var(--red);">Reject</span> |
| N | Not Found | <span style="color:var(--red);">Reject</span> |

</details>

</section>

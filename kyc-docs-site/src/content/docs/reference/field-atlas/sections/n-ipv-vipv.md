---
title: "Section N: IPV / VIPV — Data Flow"
description: "Where each field in Section N: IPV / VIPV flows downstream — destinations, formats, frequencies, transformations, quirks."
---

> **Why this page is structured this way:** This is the field-first view for Section N: <abbr title="In-Person Verification">IPV</abbr> / <abbr title="Video In-Person Verification (sometimes &quot;Video CIP&quot; / V-CIP)">VIPV</abbr>. Each row is one field-destination relationship. To see the same data from the destination's perspective, jump from the [atlas overview](/broking-kyc/reference/field-atlas/).

## TL;DR

- **7 unique fields** in this section.
- **7 field-destination relationships** total.
- Source-of-truth field definitions: [Master Dataset](/broking-kyc/reference/master-dataset/).

## Data flow table

Sorted by `field_id`, then `destination`.

| field_id | field_name | destination | destination_field_name | destination_format | frequency | transformation | quirks_notes | spec_source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| N-ipv_date | IPV Date | back-office | ipv_date | DATE YYYYMMDD | one-time | formatted | audit | [industry typical] |
| N-ipv_mode | IPV Mode | back-office | ipv_mode_cd | VARCHAR(2) | one-time | [direct] | PH/VI/AE | [industry typical] |
| N-ipv_required | IPV Required | back-office | ipv_req_flg | CHAR(1) | one-time | [direct] | N if Aadhaar e-<abbr title="Know Your Customer (process).">KYC</abbr> or DigiLocker used; retained for audit | [industry typical] |
| N-ipv_status | IPV Status | back-office | ipv_status_cd | VARCHAR(2) | on-event | [direct] | CO/PE/FA; CO required before ACTIVE flip | [industry typical] |
| N-vipv_session_id | VIPV Session ID | back-office | vipv_sess_id | VARCHAR(50) | one-time | [direct] | unique session identifier; retained for retrieval | [industry typical] |
| N-vipv_video_hash | VIPV Video Hash | back-office | vipv_vid_hash | CHAR(64) | one-time | [direct] | SHA-256 integrity hash | [industry typical] |
| N-vipv_video_url | VIPV Video URL | back-office | vipv_vid_url | VARCHAR(500) | one-time | [direct] | tamper-proof storage URL; 8-yr retention | [industry typical] |

## Verified through

2026-05-14

---

*AI-generated and not legal advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*

---
title: "Section C: Contact Details — Data Flow"
description: "Where each field in Section C: Contact Details flows downstream — destinations, formats, frequencies, transformations, quirks."
---

> **Why this page is structured this way:** This is the field-first view for Section C: Contact Details. Each row is one field-destination relationship. To see the same data from the destination's perspective, jump from the [atlas overview](/broking-kyc/reference/field-atlas/).

## TL;DR

- **13 unique fields** in this section.
- **81 field-destination relationships** total.
- Source-of-truth field definitions: [Master Dataset](/broking-kyc/reference/master-dataset/).

## Data flow table

Sorted by `field_id`, then `destination`.

| field_id | field_name | destination | destination_field_name | destination_format | frequency | transformation | quirks_notes | spec_source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| C-alternate_email | Alternate Email | back-office | alt_email_id | VARCHAR(100) | on-modify | lowercase | secondary delivery if primary bounces | [industry typical] |
| C-alternate_email | Alternate Email | bse-ucc | ALT_EMAIL | VARCHAR(100) | on-modify | lowercase | Optional | BSE/20240223-42 |
| C-alternate_email | Alternate Email | cdsl-bo | ALT_EMAIL | CHAR(100) | on-modify | lowercase | Optional | CDSL/OPS/DP/POLCY/2024/208 |
| C-alternate_email | Alternate Email | ckyc | ALTERNATE_EMAIL | VARCHAR(100) | one-time | lowercase | CKYC optional | CKYC/2020/04 |
| C-alternate_email | Alternate Email | dlt-comms | CC_EMAIL | VARCHAR(100) | on-event | lowercase | typically family-member/authorized-user; SEBI does not mandate alert here | [industry typical] |
| C-alternate_email | Alternate Email | kra | ALT_EMAIL | VARCHAR(100) | on-modify | lowercase | Optional | [industry typical] |
| C-alternate_email | Alternate Email | mcx-ucc | ALT_EMAIL | VARCHAR(100) | on-modify | lowercase | Optional; relationship code required if non-self | MCX/S&I/663/2024 |
| C-alternate_email | Alternate Email | nsdl-bo | AltEmailAdr | VARCHAR(100) UDiFF | on-modify | lowercase | Optional element | NSDL/POLICY/2025/0056 |
| C-alternate_email | Alternate Email | nse-ucc | ALT_EMAIL | VARCHAR(100) | on-modify | lowercase | Optional; with relationship if non-self | NSE/ISC/61817 |
| C-alternate_mobile | Alternate Mobile | back-office | alt_mobile_no | VARCHAR(15) | on-modify | [direct] | fallback for transmission/closure intimation | [industry typical] |
| C-alternate_mobile | Alternate Mobile | bse-ucc | ALT_MOBILE | VARCHAR(15) | on-modify | [direct] | Optional | BSE/20240223-42 |
| C-alternate_mobile | Alternate Mobile | cdsl-bo | ALT_MOBILE | CHAR(15) | on-modify | [direct] | Line 04 optional position; right-padded | CDSL/OPS/DP/POLCY/2024/208 |
| C-alternate_mobile | Alternate Mobile | ckyc | ALTERNATE_MOBILE | VARCHAR(15) | one-time | [direct] | CKYC optional | CKYC/2020/04 |
| C-alternate_mobile | Alternate Mobile | dlt-comms | CC_MSISDN | CHAR(10) | on-event | derived from Y | optional CC for critical alerts (margin call, contract note); not always populated | [industry typical] |
| C-alternate_mobile | Alternate Mobile | kra | ALT_MOBILE | VARCHAR(15) | on-modify | [direct] | Optional; not validated | [industry typical] |
| C-alternate_mobile | Alternate Mobile | mcx-ucc | ALT_MOBILE | VARCHAR(15) | on-modify | [direct] | Optional; relationship code required if non-self | MCX/S&I/663/2024 |
| C-alternate_mobile | Alternate Mobile | nsdl-bo | AltMblNb | VARCHAR(15) UDiFF | on-modify | [direct] | Optional ISO-tagged element | NSDL/POLICY/2025/0056 |
| C-alternate_mobile | Alternate Mobile | nse-ucc | ALT_MOBILE | VARCHAR(15) | on-modify | [direct] | Optional; family member with relationship code if used | NSE/ISC/61817 |
| C-email | Email | aml-fiu | EMAIL | VARCHAR(100) | on-event | lowercase | customer-attribute field; FIU cross-references against other RE filings | FIU-IND-REPORTING-FORMAT-V114 |
| C-email | Email | back-office | email_id | VARCHAR(100) | on-modify | lowercase | contract-note ECN dispatch; quarterly statement; ITR Form 16A | SEBI/HO/MIRSD/POD-1/P/CIR/2025/94 |
| C-email | Email Address | bse-ucc | EMAIL_ID | VARCHAR(100) | on-modify | lowercase | Mandatory; OTP-validated; client accounts with unverified email marked ON HOLD | BSE/20230819-6 |
| C-email | Email | cdsl-bo | EMAIL_ID | CHAR(100) | on-modify | lowercase | Line 04 fixed-length; mandatory per CDSL POLCY/2021/152; right-padded with spaces; RFC 5322 validation; e-CAS sent to this address | CDSL/OPS/DP/POLCY/2021/152 |
| C-email | Email Address | ckyc | EMAIL_ID | VARCHAR(100) | one-time | lowercase | CKYC stores in lowercase; used in download notifications | CKYC/2025/16 |
| C-email | Email Address | contract-notes | ClientEmail | VARCHAR(100) | on-trade | lowercase | primary ECN delivery channel; T+24h dispatch SLA; bounce-back retried on alt-email | NSE/INSP/61999 |
| C-email | Email Address | dlt-comms | TO_EMAIL | VARCHAR(100) | on-event | lowercase | email gateway uses TLS; bounce/complaint rate must be < 0.1% under ESP rules | [industry typical] |
| C-email | Email | fatca-crs | CONTACT_EMAIL | VARCHAR(100) | on-event | lowercase | contact channel; not itself indicia; used for self-cert refresh reminders | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| C-email | Email Address | kra | EMAIL | VARCHAR(100) | on-modify | lowercase | KRA validates via email link; kra_email_validated flag set | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/41 |
| C-email | Email Address | mcx-ucc | EMAIL_ID | VARCHAR(100) | on-modify | lowercase | Mandatory effective 21 Oct 2024 across all UCC categories; AP/employee personal email triggers Rs.15000 penalty | MCX/S&I/663/2024 |
| C-email | Email | nsdl-bo | EmailAdr | VARCHAR(100) UDiFF | on-modify | lowercase | ISO-tagged element; mandatory; e-CAS by 12th of month sent here | NSDL/POLICY/2025/0022 |
| C-email | Email Address | nse-ucc | EMAIL_ID | VARCHAR(100) | on-modify | lowercase | Mandatory; 'notprovided@notprovided.com' disallowed; clients without valid email by deadline flagged Closed | NSE/ISC/47869 |
| C-email_authorised_person | Authorised/Contact Person Name (for Email) | bse-ucc | EMAIL_AUTH_NAME | VARCHAR(100) | one-time | [direct] | Dependent field | BSE/20240223-42 |
| C-email_authorised_person | Authorised/Contact Person Name (for Email) | mcx-ucc | EMAIL_AUTH_NAME | VARCHAR(100) | one-time | [direct] | Mandatory dependent on Client Email ID (per MCX/S&I/663/2024) | MCX/S&I/663/2024 |
| C-email_authorised_person | Authorised/Contact Person Name (for Email) | nse-ucc | EMAIL_AUTH_NAME | VARCHAR(100) | one-time | [direct] | Mandatory if email is not own; identifies email-receiving authorised person | NSE/ISC/61817 |
| C-email_relationship | Relationship with Client (for Email) | bse-ucc | EMAIL_REL | VARCHAR(20) | one-time | [direct] | Dependent field when email is not self's | BSE/20240223-42 |
| C-email_relationship | Relationship with Client (for Email) | mcx-ucc | EMAIL_REL | VARCHAR(20) | one-time | [direct] | Mandatory dependent field of email per MCX/S&I/663/2024 | MCX/S&I/663/2024 |
| C-email_relationship | Relationship with Client (for Email) | nse-ucc | EMAIL_REL | VARCHAR(20) | one-time | [direct] | If email is not own; relationship code (Self/Spouse/Parent/Child/Sibling/etc.) | NSE/ISC/61817 |
| C-email_validated | Email Validated | cdsl-bo | EMAIL_OTP_VALIDATED | CHAR(1) | one-time | [direct] | Y/N; email OTP/link validation | CDSL/OPS/DP/POLCY/2021/152 |
| C-email_validated | Email Validated | nsdl-bo | EmailValdtdFlg | CHAR(1) UDiFF | one-time | [direct] | Email validation flag | NSDL/POLICY/2025/0056 |
| C-fax_number | Fax Number | ckyc | FAX_NUMBER | VARCHAR(15) | one-time | [direct] | CKYC field retained for legacy | CKYC/2020/04 |
| C-fax_number | Fax Number | kra | FAX_NO | VARCHAR(15) | on-modify | [direct] | Rarely populated | [industry typical] |
| C-fax_std_code | Fax STD Code | ckyc | FAX_STD | VARCHAR(5) | one-time | [direct] | CKYC field retained for legacy | CKYC/2020/04 |
| C-fax_std_code | Fax STD Code | kra | FAX_STD | VARCHAR(5) | on-modify | [direct] | Rarely populated | [industry typical] |
| C-mobile_isd_code | Mobile ISD Code | back-office | mob_isd | VARCHAR(5) | on-modify | [direct] | default +91; used as prefix in DLT SMS template variable | [industry typical] |
| C-mobile_isd_code | Mobile ISD Code | bse-ucc | ISD_CODE | VARCHAR(5) | on-modify | [direct] | Default +91 | BSE/20240223-42 |
| C-mobile_isd_code | Mobile ISD Code | cdsl-bo | MOBILE_ISD | CHAR(5) | on-modify | [direct] | Line 04 fixed-length position; default +91 for India; right-padded | CDSL/OPS/DP/SYSTM/2023/119 |
| C-mobile_isd_code | Mobile ISD Code | ckyc | MOBILE_ISD_CODE | VARCHAR(5) | one-time | [direct] | CKYC stores ISD without leading + sign | CKYC/2025/16 |
| C-mobile_isd_code | Mobile ISD Code | dlt-comms | COUNTRY_CODE | CHAR(5) | on-event | [direct] | prepended to MSISDN for non-IN; SMS gateway routes via international ILD for non-91 | [industry typical] |
| C-mobile_isd_code | Mobile ISD Code | kra | MOB_ISD | VARCHAR(5) | on-modify | [direct] | Default +91; KRA stores ISD separately for mobile and phone | [industry typical] |
| C-mobile_isd_code | Mobile ISD Code | mcx-ucc | ISD_CODE | VARCHAR(5) | on-modify | [direct] | Default +91 | MCX/TECH/394/2023 |
| C-mobile_isd_code | Mobile ISD Code | nsdl-bo | MblISDCd | CHAR(5) UDiFF | on-modify | [direct] | ISD code element in MblPhneNb block | NSDL/POLICY/2025/0056 |
| C-mobile_isd_code | Mobile ISD Code | nse-ucc | ISD_CODE | VARCHAR(5) | on-modify | [direct] | Default +91 for Indian residents | NSE/ISC/61817 |
| C-mobile_number | Mobile Number | aml-fiu | MOBILE | VARCHAR(15) | on-event | [direct] | customer-attribute field in STR/CTR; used by FIU to link transactions across REs | FIU-IND-REPORTING-FORMAT-V114 |
| C-mobile_number | Mobile Number | back-office | mobile_no | VARCHAR(15) | on-modify | [direct] | 10-digit India; trade alerts and DLT-approved SMS routed via DLT-comms | SEBI Dec 3, 2024 SMS/Email mandate |
| C-mobile_number | Mobile Number | bse-ucc | MOBILE_NO | VARCHAR(15) | on-modify | [direct] | Mandatory; OTP-validated via UIDAI/SEBI KYC validation framework | BSE/20230819-6 |
| C-mobile_number | Mobile Number | cdsl-bo | MOBILE_NUMBER | CHAR(15) | on-modify | [direct] | Line 04; mandatory per CDSL POLCY/2021/152 (six mandatory KYC attributes); 10 digit India must start 6/7/8/9; rejection on invalid pattern | CDSL/OPS/DP/POLCY/2021/152 |
| C-mobile_number | Mobile Number | ckyc | MOBILE_NUMBER | VARCHAR(15) | one-time | [direct] | Used to trigger OTP for download consent post May-2025 | CKYC/2025/02 |
| C-mobile_number | Mobile Number | contract-notes | ClientMobile | VARCHAR(15) | on-trade | [direct] | ECN dispatch via SMS/IM channel permitted in addition to email; DLT-template compliance required | NSE/INSP/52604 |
| C-mobile_number | Mobile Number | dlt-comms | RECIPIENT_MSISDN | CHAR(10) | on-event | derived from Y | strip +91/0 prefix; DLT requires 10-digit MSISDN; rejected if scrubbed against DND when transactional category not used | [industry typical] |
| C-mobile_number | Mobile Number | fatca-crs | CONTACT_MOBILE | VARCHAR(15) | on-event | [direct] | contact channel for FATCA discrepancy queries; foreign mobile triggers indicia review | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/12 |
| C-mobile_number | Mobile Number | kra | MOBILE_NO | VARCHAR(15) | on-modify | [direct] | KRA validates mobile via OTP; flag kra_mobile_validated set on success | SEBI/HO/MIRSD/SECFATF/P/CIR/2024/41 |
| C-mobile_number | Mobile Number | mcx-ucc | MOBILE_NO | VARCHAR(15) | on-modify | [direct] | Mandatory; Rs.15000/client penalty if member/AP personal mobile used | MCX/INSP/270/2025 |
| C-mobile_number | Mobile Number | nsdl-bo | MblNb | VARCHAR(15) UDiFF | on-modify | [direct] | ISO 20022 PhneNb pattern; mandatory; OTP-validated via SCORES 2.0 alerts | NSDL/POLICY/2025/0056 |
| C-mobile_number | Mobile Number | nse-ucc | MOBILE_NO | VARCHAR(15) | on-modify | [direct] | Mandatory; '6666666666' explicitly disallowed; member AP/employee personal mobile disallowed | NSE/ISC/47869 |
| C-mobile_validated | Mobile Validated | cdsl-bo | MOBILE_OTP_VALIDATED | CHAR(1) | one-time | [direct] | Y/N; OTP validation flag; mandatory under SEBI six attributes | CDSL/OPS/DP/POLCY/2021/152 |
| C-mobile_validated | Mobile Validated | nsdl-bo | MblValdtdFlg | CHAR(1) UDiFF | one-time | [direct] | OTP validation flag | NSDL/POLICY/2025/0056 |
| C-phone_number | Landline Number | back-office | phone_no | VARCHAR(15) | on-modify | [direct] | tape-recording cross-reference for dealer trades | [industry typical] |
| C-phone_number | Landline Number | bse-ucc | PHONE_NO | VARCHAR(15) | one-time | [direct] | Optional | BSE/20240223-42 |
| C-phone_number | Landline Number | cdsl-bo | PHONE_NUMBER | CHAR(15) | one-time | [direct] | Optional line 04 position | CDSL/OPS/DP/SYSTM/2023/119 |
| C-phone_number | Phone Number | ckyc | TELEPHONE | VARCHAR(15) | one-time | [direct] | CKYC residence/office phone | CKYC/2020/04 |
| C-phone_number | Phone Number | kra | PHONE_NO | VARCHAR(15) | on-modify | [direct] | Landline; optional | [industry typical] |
| C-phone_number | Landline Number | mcx-ucc | PHONE_NO | VARCHAR(15) | one-time | [direct] | Optional | MCX/TECH/394/2023 |
| C-phone_number | Landline Number | nsdl-bo | PhneNb | VARCHAR(15) UDiFF | one-time | [direct] | Optional ISO-tagged | NSDL/POLICY/2024/0041 |
| C-phone_number | Landline Number | nse-ucc | PHONE_NO | VARCHAR(15) | one-time | [direct] | Optional landline | NSE/ISC/61817 |
| C-phone_std_code | Landline STD | back-office | phone_std | VARCHAR(5) | on-modify | [direct] | rarely used; preserved for retention copy | [industry typical] |
| C-phone_std_code | Landline STD Code | bse-ucc | PHONE_STD | VARCHAR(5) | one-time | [direct] | Optional | BSE/20240223-42 |
| C-phone_std_code | Landline STD Code | cdsl-bo | PHONE_STD | CHAR(5) | one-time | [direct] | Optional line 04 position; right-padded | CDSL/OPS/DP/SYSTM/2023/119 |
| C-phone_std_code | Phone STD Code | ckyc | TELEPHONE_STD | VARCHAR(5) | one-time | [direct] | CKYC residence/office phone STD | CKYC/2020/04 |
| C-phone_std_code | Phone STD Code | kra | PHONE_STD | VARCHAR(5) | on-modify | [direct] | Landline STD; optional | [industry typical] |
| C-phone_std_code | Landline STD Code | mcx-ucc | PHONE_STD | VARCHAR(5) | one-time | [direct] | Optional | MCX/TECH/394/2023 |
| C-phone_std_code | Landline STD Code | nsdl-bo | PhneSTDCd | CHAR(5) UDiFF | one-time | [direct] | Optional | NSDL/POLICY/2024/0041 |
| C-phone_std_code | Landline STD Code | nse-ucc | PHONE_STD | VARCHAR(5) | one-time | [direct] | Optional landline STD | NSE/ISC/61817 |

## Verified through

2026-05-14

---

*AI-generated and not legal advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*

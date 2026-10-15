# Real-time and programmatic depository interaction: CDSL and NSDL

Research cut-off: **15 October 2026**. Scope: architecture and operations for an Indian broker/DP serving NSE, BSE and MCX; securities accounts, authorisation, collateral and settlement interfaces.

## Evidence and reading rules

| Label / term | Meaning in this report |
|---|---|
| `[verified]` | The linked primary publication was read, or its clearly identified indexed text was recovered. This verifies what the publication says, **not a successful production API call**. Dates, source limitations and contradictory publications are retained. |
| `[likely]` | Requires two independent, named sources supporting the same claim. No technical interface is promoted to this category merely because multiple vendors repeat it. |
| `[uncertain]` | Interpretation, recommendation, conflicting evidence, or an incompletely verified lead. |
| `[unknown]` | The relevant specification, entitlement, parameter, limit or operating rule was not established. It does **not** mean the facility does not exist. |
| Synchronous | A request receives a response in the same interaction. This report separately asks whether the response means acceptance, authorisation or completed depository posting. |
| Asynchronous | Completion/status follows separately through inquiry, callback, participant-system update or report. This is not necessarily overnight processing. |
| File-based | Instructions or results are carried in files. A file can be submitted through an API and processed intraday; “file”, “batch” and “EOD-only” are not interchangeable classifications. |
| Catalogue completeness | This is the union of the public catalogue, retrieved circulars, product material and published transport addresses. `[unknown]` the complete entitlement-specific production inventory and every operation within each API family. In particular, the full NSDL Digital Gateway inventory was not recovered. |

## Findings that change the architecture

| Finding | Evidence and implication |
|---|---|
| CDSL has expressly synchronous interfaces | [verified] Its **6 February 2026** migration circular labels early-pay-in, margin-pledge and normal-pledge interfaces synchronous; re-pledge remains labelled asynchronous. [C02] [uncertain] Do not interpret these labels as a guarantee that client consent, pledgee acceptance and CC collateral recognition all finish in one call. |
| NSDL is not a file-only depository | [verified] Published material identifies EPI request/response, callback and inquiry, broker e-DIS/MPI integration, and account APIs. [N01], [N02], [N05] |
| A significant NSDL 2026 expansion is published | [verified] The FY2025–26 annual report reports **NSDL Digital Gateway, 56 APIs**, covering account management, transactions and reporting. It describes wider coverage/onboarding as a multiyear programme. [N03] (printed pp. 10, 28, 51–52) [unknown] The complete 56-entry specification, versions and per-participant enablement. |
| A broker-facing “holdings API” is not evidence of a depository holdings API | [unknown] A generally available, contractually synchronous CDSL/NSDL DP holdings endpoint was not established. Published holding statements, downloads and investor views are documented below. |
| UDiFF and APIs coexist | [verified] UDiFF specifies standardised data files; CDSL separately publishes upload APIs. [U01], [C01] [uncertain] Use separate abstractions for data schema, transport and completion state. |
| The unverified four-item CDSL note is substantially correct | [verified] CDSL names **eLAS**, **e-Margin Pledge**, **Margin Repledge API** and **Transaction Upload API**. Re-pledge is for intermediaries repledging in favour of a CC, not evidence that only a CC can call it. [C01] |

## 1. Access roles and limits of the catalogue

| Actor / boundary | Published position | What must not be assumed |
|---|---|---|
| CDSL DP | [verified] CDSL describes its catalogue as APIs for DPs and directs integration enquiries to the DP relationship manager/helpdesk. [C01] | [unknown] A stock-exchange broker registration alone confers access to every DP endpoint. |
| NSDL broker / TM / CM | [verified] Demat Gateway explicitly offers broker e-DIS and MPI; SPICE Direct EPI is offered to TM/CM. [N05], [N06] | [unknown] Broker entitlement to account-maintenance or unrestricted BO-query services. |
| NSDL DP | [verified] Account Opening API and Client Maintenance API integrate with participant applications and Local/Cloud DPM. [N04], [N07] | [unknown] A broker without the corresponding DP arrangement may call these services directly. |
| Bank / NBFC / lender | [verified] Both depositories publish digital LAS integration; CDSL's July 2026 process routes lender-originated requests to the investor's DP. [C06], [N02] | [uncertain] Keep lender onboarding and pledgee permissions separate from trading-margin permissions. |
| CC recognition | [uncertain] Architecture inference: record depository completion and CC collateral availability separately; the API response contract alone does not establish the CC's risk treatment. | [unknown] A universal CDSL/NSDL/NCL/ICCL/MCXCCL completion SLA. |
| Adjacent APIs | [verified] CDSL's catalogue also lists CVL KRA, Aadhaar eKYC, eSign and GST services. [C01] | [uncertain] Exclude these from the depository securities-transaction adapter. Do not confuse NSDL depository APIs with similarly named tax/PAN or payments products. |

## 2. CDSL: published API catalogue

### 2.1 Named services and what they do

The IDs below are **research row IDs**, not API names or request values. Authentication, callbacks, testing and limits are addressed in §2.3; endpoint rows in §2.2 supply the exact published addresses.

| ID | Published service | Function and access | Processing evidence / unresolved detail |
|---|---|---|---|
| C-A | BO Setup and Modify Upload | [verified] DP account creation/modification using uploaded files. [C01] | [verified] Separate creation/modification URLs are published. [C03] [unknown] Atomic account activation in the upload response. |
| C-B | eDIS transaction Interface | [verified] Electronic debit authorisation. [C01] | [verified] Client authorisation is followed by DP transaction submission and matching. [C04] |
| C-C | eDIS revocation | [verified] Revokes BO pre-trade eDIS consent. [C01] | [unknown] Current production URL, schema and revocation completion response. |
| C-D | Transaction Upload / Common Upload | [verified] Uploads Demat, inter-depository, transaction, pledge, freeze, common-upload, restatementisation and corporate-action files; BO upload is separate. [C01] | [verified] Upload status and response-download services exist. [C03] [unknown] Guaranteed execution latency per record. |
| C-E | Pledge / normal pledge | [verified] Catalogue covers pledge, unpledge and invocation. [C01] | [verified] Normal setup is synchronous. [C02] [verified] Unpledge/confiscation addresses are also published. [C03] |
| C-F | eLAS | [verified] Investor pledges securities through an intermediary/lender website. [C01], [C06] | [verified] DP approval, or configured auto approval, is part of the 2026 LAS process. [C06] [unknown] Whether every older eLAS implementation uses precisely that new workflow. |
| C-G | e-Margin Pledge | [verified] Online margin-pledge and margin-funding setup. [C01] | [verified] New synchronous setup plus inquiry are published. [C02] [unknown] Whether every historical margin-funding variant is supported by the same current payload. |
| C-H | Margin Repledge API | [verified] Repledges margin securities onward towards the CC. [C01] | [verified] Published replacement interface remains asynchronous and has inquiry. [C02] |
| C-I | eVoting | [verified] DP-to-voting-service access integration. [C01] | [unknown] Current token/signature specification and callback contract. |
| C-J | Early Pay-in API | [verified] Online EPI instruction setup. [C01] | [verified] Synchronous v2.0 and inquiry are published. [C02] |
| C-K | Destat API | [verified] DP-portal requests to convert mutual-fund SOA units into demat. [C01] | [unknown] Current endpoint, response states, RTA completion timing and callback contract. |
| C-L | Authorization API | [verified] Separate authorisation endpoint in migration catalogue. [C03] | [unknown] Current credential request, token format, lifetime, renewal and signature rules. It must not be equated with BO OTP authorisation. |
| C-M | Upload status inquiry / Response Download | [verified] Services for uploaded-request status and output retrieval. [C03] | [uncertain] Treat these as upload-workflow services; evidence does not establish universal transaction-status coverage. |
| C-N | API facility for multiple BO accounts | [verified] July 2026 API returns counts against first-holder PAN/mobile/email attributes across CDSL. [C05] | [verified] Described as real-time; production and mock URLs are supplied. [C05] [unknown] Availability of a client-master record or securities balance through this count service. |
| C-O | Earlier real-time BO account opening / BO authentication | [verified] CDSL's FY2020–21 report identifies real-time BO opening and BO authentication among implemented APIs. [C13] | [unknown] Current standalone endpoint, version, eligibility and whether replaced by another family above. Historical existence is not a deployable 2026 contract. |

### 2.2 Exact published CDSL URLs and migration status

[verified] The following **new URLs are transcribed from CDSL/OPS/DP/TECH/2026/85**, pp. 1–3. Line wraps have been joined; case is preserved. These are published addresses, not calls tested with credentials. [C02]

| Function | Published URL | Published mode / status |
|---|---|---|
| EarlyPayin setup | `https://apigt.cdsl.co.in/EarlyPayin/v2.0` | [verified] Synchronous. [C02] |
| EarlyPayin inquiry | `https://apigt.cdsl.co.in/EarlyPayin/Inquiry` | [verified] Inquiry. [C02] |
| Common Upload | `https://apigt.cdsl.co.in/Commonweb/api/CDASAPI/Upload/v2.0` | [verified] File upload. [C03] |
| BO Upload | `https://apigt.cdsl.co.in/Commonweb/api/BOAPI/HrmSetUpload` | [verified] BO upload. [C03] |
| BO Modify Upload | `https://apigt.cdsl.co.in/Commonweb/api/BOAPI/HrmModUpload` | [verified] BO modification upload. [C03] |
| Normal pledge confiscation | `https://apigt.cdsl.co.in/PledgeAPIService/api/Confiscatesetup` | [verified] Listed service. [C03] [unknown] Synchronous completion. |
| Normal unpledge | `https://apigt.cdsl.co.in/PledgeAPIService/api/UnpledgeSetup` | [verified] Listed service. [C03] [unknown] Synchronous completion. |
| Margin pledge setup | `https://apigt.cdsl.co.in/PledgeServices/MPSetup` | [verified] Synchronous. [C02] |
| Margin pledge inquiry | `https://apigt.cdsl.co.in/PledgeServices/MPInquiry` | [verified] Inquiry. [C02] |
| Margin repledge setup | `https://apigt.cdsl.co.in/MarginRepledgeAPI/Setup/v1.0` | [verified] Asynchronous. [C02] |
| Margin repledge inquiry | `https://apigt.cdsl.co.in/MarginRepledgeAPI/Inquiry/v1.0` | [verified] Inquiry. [C02] |
| Normal pledge setup | `https://apigt.cdsl.co.in/PledgeServices/Setup` | [verified] Synchronous. [C02] |
| Authorization API | `https://apigt.cdsl.co.in/AuthWeb/api/CDASAuthorization/APIAuth` | [verified] Authorisation service. [C03] |
| Upload status | `https://apigt.cdsl.co.in/Commonweb/api/CDASAPI/Status` | [verified] Status inquiry. [C03] |
| Upload response download | `https://apigt.cdsl.co.in/Commonweb/api/CDASAPI/Download` | [verified] Download. [C03] |
| Multiple-BO count: production | `https://apigt.cdsl.co.in/boactivedematcount/GetCount` | [verified] Published in July 2026 annexure. [C05] |
| Multiple-BO count: mock | `https://mockapigt.cdsl.co.in/boactivedematcount/GetCount` | [verified] Mock environment. [C05] |

| Historical interface / assertion | Evidence status as of research cut-off |
|---|---|
| Older hostnames in the migration table | [verified] Most old URLs were **notified for discontinuation on 27 February 2026**; delayed margin pledge was excepted until **31 March 2026**. [C02] [unknown] Actual shutdown observations or any unpublished extension. |
| Delayed EarlyPayin v1.0, including replacement-host v1.0 | [verified] Delayed EPI and margin-pledge versions were notified for sunset on **31 March 2026**. [C02] [uncertain] Do not choose v1.0 merely because its replacement-host address also appears in the migration table. |
| `https://api.cdslindia.com/APIServices` as a universal base URL | [verified] Its public landing page only identifies a service URL. [C14] [uncertain] It is not evidence for one common endpoint/authentication scheme across all CDSL products; use the explicit catalogue above. |
| Alleged “Pledge Query” API | [unknown] That exact independent product name was not verified. [verified] `MPInquiry`, repledge inquiry and upload status are explicitly published, with narrower named scopes. [C02] |
| eDIS, eDIS revocation, Destat, eVoting, eLAS endpoints | [unknown] Current, complete production routing and versions were not recovered. Do not manufacture these by appending guessed paths to a known hostname. |

### 2.3 Authentication, callback, limits and test environment

| Interface family | Authentication / transport established | Callback or result mechanism established | Limits and test environment |
|---|---|---|---|
| Migrated gateway services | [verified] DPs supply unique, static, DP-specific public IPs for configuration; circular distinguishes Mock/Live. [C02] [unknown] Per-service API key, access-token or DSC requirements. | [verified] Inquiry/status/download routes above. [C02] [unknown] Generic webhook subscription, signing, retry, ordering or replay contract. | [unknown] QPS, bursts, concurrency, daily quotas, maximum file size/records and latency SLA. [unknown] A single mock URL pattern valid for every service. |
| eDIS | [verified] Registered DP receives an API key; encrypted transaction details go to CDSL; broker/DP performs its own client login and second factor. [C04] [verified] Current operating instructions require CDSL TPIN **and OTP**. [C08] (§6.6.7) | [verified] Success/rejection is returned to DP for authorisation. [C04] [unknown] Current callback schema, server-to-server delivery guarantee and cryptographic verification. | [unknown] Rate limits, public UAT contract and authorisation-response timeout. |
| Multiple-BO count | [verified] Registered-DP key; IP allowlisting for UAT/production; TLS 1.2; AES-256-CBC/PKCS7 described. [C05] (annexure §§4–7) | [verified] Request/response specification exists. [C05] [unknown] Independent event webhook. | [verified] Explicit mock URL above. [unknown] Rate/throughput limits. |
| LAS | [verified] Lender integration plus DP Easiest credentials/approval. [C06] | [verified] Successful requests enter depository reports. [C06] [unknown] Lender callback payload, authentication and delivery guarantees. | [unknown] Separate lender sandbox, quotas and SLA. |
| Remaining catalogue services | [unknown] Current credential/signature contract not publicly established in reviewed sources. | [unknown] Callback availability and schema; do not infer from eDIS. | [unknown] Service-specific UAT, rate limits and SLAs. |
| Innovation Sandbox | [verified] CDSL publishes an approved-applicant test environment and file-format programme. [C12] | [uncertain] This is a separate testing route, not proof of production-parity UAT for all APIs. | [unknown] Automatic/self-service admission or credentials for the entire catalogue. |

[uncertain] **Specification inconsistency:** the multiple-BO-count annexure describes a supplied IV in one place and a null IV in its sample instructions. Obtain a corrected integration example before implementing encryption. [C05] [unknown] A universal “API key + Class 3 hardware-token DSC” requirement for every CDSL API was not verified. Easiest transaction-signing requirements must not be copied onto unrelated API families.

### 2.4 Other CDSL programmatic/file interfaces

| Interface | Published capability | Real-time interpretation |
|---|---|---|
| Easiest | [verified] BO/CM online delivery instructions; account-of-choice transfer signing; multiple transactions in one uploaded file, subject to enabled upload rights. [C09] | [unknown] General server-to-server API contract for automating the portal. An online UI is not itself that contract. |
| Easi | [verified] Holding/transaction access and downloads for back-office updating. [C10] | [unknown] Direct live holding-query API or guaranteed freshness. |
| Reports / incremental feeds | [verified] Published legacy descriptions distinguish full holding, online incremental holding and an incremental transaction download completed at EOD. [C11] | [uncertain] Intraday downloads can support frequent reconciliation; they do not prove streaming balance events. Use current UDiFF schemas. |
| UDiFF upload/export | [verified] BO/transaction uploads, holdings, transactions, client master and COD/DP57 are among published files. [U02] | [unknown] Exact posting clock and end-to-end lag for each current export. |

## 3. NSDL: public catalogue and what remains unavailable

### 3.1 Named APIs and technology integrations

[verified] The **March 2026 Participant Master**, §7.2, remains a useful named-integration catalogue; it is not the complete production API specification. [N01] [unknown] No complete public mapping from its older integrations to all 56 Digital Gateway APIs was recovered.

| ID | Published interface | Function / eligible integration | Completion evidence and qualification |
|---|---|---|---|
| N-A | Account Opening API for Participants | [verified] Participant application → Insta Interface → depository; activation feed returns to Local/Cloud DPM. [N04] | [verified] Described as instant account opening. [N04] [unknown] Whether the initial HTTP response always proves activation. |
| N-B | Client Maintenance API | [verified] Participant back office → API hosted on Local/Cloud DPM for creation and demographic modification. [N07] | [unknown] Central posting SLA, current schema and API version. |
| N-C | File Upload API for Client Maintenance / CMA Standardised API | [verified] These labels appear respectively in participant product material and the September 2026 Sunday circular. [N02], [N08] | [uncertain] Do not assume these labels, N-B and the Digital Gateway account APIs are identical versions without a migration map. |
| N-D | NSDL Insta Demat Account for Banks | [verified] Bank portal/app redirects customers to account opening using the bank integration. [N04] | [unknown] Full technical response/error contract and bank-specific eligibility. |
| N-E | e-Delivery Instruction Slip / Demat Gateway | [verified] Broker integration for consent to securities debit for exchange obligations. [N05] [verified] Single/multiple variants and Order Status Check API are advertised. [N02] | [verified] Broker callback and participant-system update are published. [N01] (§7.2) |
| N-F | Margin Pledge Instruction API: online clients | [verified] Broker-originated online pledge journey for POA and non-POA clients. [N01] (§7.2) | [verified] OTP and callback on pledge execution appear in the flow diagram. [N02] [unknown] Response status dictionary and webhook transport details. |
| N-G | MPI API: offline / call-and-trade | [verified] Broker initiates for POA clients based on their instructions. [N05] | [unknown] Exact 2026 DDPI-specific eligibility and schema; the published description explicitly says POA. |
| N-H | Early Payin API, SPICE Direct | [verified] TM/CM on-market account-transfer EPI instructions. [N06] | [verified] Synchronous response **plus** callback and enquiry are shown. [N02] [unknown] Initial response's finality. |
| N-I | Depository Account Validation (DAN) | [verified] API/file validation of DP ID, Client ID and PAN was introduced in 2022. [N15] [verified] Later product material describes real-time PAN-based inquiry with client consent. [N02] | [unknown] Current DAN version/fields covering closure, suspension, freezes and all account variants. |
| N-J | UCC Mapping Verification API | [verified] Product material describes a mapping-exists response for UCC seeding. [N02] | [unknown] Guaranteed data freshness, full request schema and production URL. This is not holdings inquiry. |
| N-K | NSDL Digital LAS | [verified] Bank/NBFC integration to initiate pledge, obtain pledgor-DP confirmation and return status callbacks. [N01] (§7.2) | [unknown] API-only unpledge/invocation contract and lender enablement. |
| N-L | NSDL Digital LAS for IPO Financing | [verified] Bank/NBFC integration for IPO-funding collateral. [N01] (§7.2) | [unknown] Current endpoint/version and eligible security/account combinations. |
| N-M | Mutual Fund Conversion and Redemption APIs | [verified] SOA-to-demat conversion and electronic redemption are published API offerings. [N03] (p. 7) | [unknown] Detailed synchronous/final completion contract and RTA processing latency. |
| N-N | e-Voting / IDeAS integration | [verified] Participant site redirects to IDeAS or its e-voting page after authentication. [N04] | [unknown] General machine-readable portfolio pull API under this product name. |
| N-O | Digital Gateway | [verified] 56-API programme described above. [N03] | [unknown] All names, endpoints, credentials, callbacks, limits and sandbox contracts. Do not create an imagined REST catalogue to fill the gap. |
| N-P | G-Sec value-free-transfer API integration | [verified] December 2025 circular enables own-account transfers involving depositories and RBI Retail Direct Gilt accounts maintained at CCIL; participant initiation uses e-DPM/SPEED-e. [N18] | [unknown] Direct broker-facing API contract. The circular's API title does not establish such entitlement. |

### 3.2 SPEED-e, IDeAS and automated file channels

| Facility | Published capability and authentication | API / timing assessment |
|---|---|---|
| SPEED-e | [verified] Client online instruction entry; password or e-token access. DPs can download instructions in batches for execution; direct NSDL processing is also described where opted. [N09] | [uncertain] Neither “SPEED-e is always batch-only” nor “all SPEED-e submissions execute synchronously” is supported. |
| Participant SPEED-e exchange | [verified] DP smart-card/e-token access; downloaded files bear the site's signature and uploaded files the participant's signature. [N01] (p. 346) | [verified] File exchange includes status updates. [N01] [unknown] A general public SPEED-e REST specification. |
| IDeAS | [verified] Account balances, transactions and broker downloads are described. [N09] | [unknown] A broker-server live holdings endpoint, polling cadence and freshness guarantee. |
| SPICE / SPICE Direct | [verified] Digitally signed CM delivery instructions and EPI API integration. [N06] | [uncertain] Confirm consent/POA/DDPI entitlement and route-specific execution conditions separately. |
| e-DPM / Local DPM / Cloud DPM | [verified] e-DPM handles time-critical transaction instructions; Local/Cloud DPM supports account maintenance and reports. Large reports become downloadable after preparation. [N04] | [unknown] An interactive screen response proves final central posting in every module. |
| Auto Download | [verified] Automates downloading Local DPM masters/exports. [N02] | [uncertain] Automated file retrieval, not evidence of a holdings webhook. |
| STP Navigator | [verified] Automates back-office instruction/account-file transfer to NSDL systems. [N03] (p. 6) | [uncertain] Removes manual upload; does not itself imply synchronous posting. |
| e-Signer | [verified] Signs/encrypts instruction files for transfer to e-DPM. [N03] (p. 6) | [unknown] This is the credential model of every NSDL API. |
| DPM Plus | [verified] Participant back-office facilities include client creation, holdings/transaction reporting and client-master reporting. [N10] | [unknown] A public DPM Plus server API for each screen/report. |
| STeADY | [verified] Institutional broker/custodian/fund-manager trade-information exchange with encrypted, digitally authorised transmissions. [N02] | [uncertain] Keep this workflow distinct from client demat posting and retail eDIS. |
| Online nomination / account closure / e-DAC | [verified] Listed value-added services in the participant brochure. [N02] | [unknown] Standalone public DP REST contracts for all these services; a service-list entry is insufficient. |

### 3.3 NSDL authentication, callbacks, limits and UAT

| Question | Evidence-based answer |
|---|---|
| Does NSDL have real-time interfaces? | [verified] EPI has a synchronous response; DAN is described as real-time; account opening is described as instant. [N02], [N04] [unknown] Universal final-posting latency guarantee. |
| Production API specification | [unknown] Complete current production schemas/OpenAPI/WSDL, method names, payload fields and endpoint inventory were not recovered. [verified] The API catalogue, DAN and Client Maintenance circulars direct participants to NSDL for API documents and onboarding support. [N16], [N15], [N07] |
| Broker/MPI/eDIS authentication | [verified] Customer OTP authentication and broker integration are published. [N05] [unknown] Broker-client API-key/certificate/token model, payload cipher, mTLS, IP allowlisting and token lifetime for the current versions. |
| Are callbacks real? | [verified] Broker callbacks and DP-system updates are expressly stated in the published API catalogue. [N16] [verified] EPI flow separately includes callback and enquiry. [N02] [unknown] Signed server webhook versus browser postback for every flow, retry count, timeout, ordering and replay prevention. |
| Are rate limits published? | [unknown] No verified service-specific requests/second, concurrency, burst, daily quota or retry-after contract was recovered. |
| Does UAT exist? | [verified] NSDL publishes an Innovation Sandbox granting approved applicants APIs/file formats/test data. [N11] [unknown] Production-parity UAT endpoints and onboarding conditions for each listed broker/DP API. A public UAT portal name alone is not evidence of its API contract. |
| Account eligibility discrepancy | [verified] March 2026 master still says single holding; participant brochure says joint holding and NRI supported. [N01] (p. 98), [N02] [uncertain] These may describe different versions/paths; obtain the current eligibility matrix before relying on broader coverage. |
| NSDL TPIN terminology | [verified] NSDL product material says OTP; SEBI describes OTP plus depository PIN/password. [N05], [R01] [unknown] A universal NSDL credential named and formatted identically to CDSL TPIN. |

## 4. Operation-by-operation: synchronous, asynchronous or file-based?

[uncertain] The classification below is an engineering synthesis of the linked publications. “No synchronous contract established” must **not** be converted to “only batch exists”, especially given NSDL's incompletely published 56-API inventory.

| Requested operation | CDSL | NSDL | Can the broker treat one response as completion? |
|---|---|---|---|
| Holding enquiry | [verified] Easi views/downloads and full/incremental reports. [C10], [C11] [unknown] General synchronous DP holdings API. | [verified] IDeAS views/downloads, DPM reports and UDiFF holdings. [N09], [U03] [unknown] General synchronous broker holdings API. | [unknown] Freshness/consistency contract. [uncertain] Maintain a reconciled local holdings view with source timestamp; label stale data. |
| Transaction status | [verified] EPI, margin pledge, repledge and upload inquiry paths exist. [C02] [unknown] One universal query covering all instructions. | [verified] EPI enquiry and eDIS order-status check are published. [N02] [unknown] Universal status API. | [uncertain] A synchronous status read may report a pending asynchronous operation; persist the underlying status, not just HTTP success. |
| Pledge initiation | [verified] Synchronous normal/margin setup; repledge asynchronous. [C02] | [verified] MPI broker API/OTP journey. [N05] [unknown] Initial request response's terminal meaning. | [uncertain] Setup acceptance is insufficient where consent or pledgee acceptance remains outstanding. |
| Pledge confirmation | [verified] Client OTP and pledgee-side process apply to the relevant route. [C07], [C08] [unknown] Separate public synchronous confirmation API. | [verified] Pledge awaits pledgee confirmation; auto-confirmation can make it effective immediately. [N12] | [uncertain] Require final depository confirmation, including the appropriate automatic-acceptance arrangement. |
| Unpledge / release | [verified] Normal-unpledge address and file/operational procedures exist. [C03], [C08] [unknown] Current margin-specific synchronous release endpoint. | [verified] Client closure plus pledgee confirmation or pledgee unilateral closure is published. [N12] [unknown] Current release API schema. | [unknown] Guaranteed immediate free balance, particularly for a repledged chain. |
| Invocation | [verified] Normal-confiscation address; updated undertaking requirements. [C03], [C15] | [verified] Electronic invocation workflow exists. [N12] [unknown] Current broker synchronous invocation contract. | [uncertain] Confirm the applicable pledge class and final posting/delivery result. A normal-pledge endpoint does not establish margin/CUSPA invocation semantics. |
| eDIS / TPIN authorisation | [verified] API-driven interactive CDSL page and return result; TPIN+OTP. [C04], [C08] | [verified] API-driven Demat Gateway authorisation and callback. [N05], [N01] | [uncertain] Authorisation can complete online; subsequent debit/settlement remains a separate event. This is not a headless broker substitute for customer consent. |
| Demat account opening | [verified] BO upload API; historical real-time BO opening publication. [C01], [C13] [unknown] Current immediate activation contract. | [verified] Insta account API and activation feed; CMA route. [N04], [N08] | [uncertain] Wait for active-account evidence. Uploaded KYC or an accepted opening request alone is insufficient. |
| Account status enquiry | [verified] BO count API exists but returns aggregate counts. [C05] [unknown] General account-status endpoint. | [verified] DAN validation service; Sunday circular explicitly mentions account-status validation. [N08] | [unknown] Exhaustive status/freeze/sub-status fields. Counts, existence, active status and debit eligibility are distinct. |
| Client master enquiry | [verified] UDiFF Client Master file. [U02] [unknown] Direct synchronous CMR API. | [verified] Client-master exports and DPM Plus report; Sunday exports are specified. [N10], [N08] [unknown] Direct synchronous CMR API. | [uncertain] Report generation/download may be queued. Do not mislabel an investor's view/download facility as a broker data API. |
| Early pay-in, for comparison | [verified] Synchronous v2.0 plus inquiry. [C02] | [verified] Synchronous EPI response, callback and inquiry. [N02] | [unknown] Same-call guarantee of final settlement/CC margin credit; follow result semantics and operational cut-offs. |

| What is actually established as a batch/file workflow? | Boundary of that conclusion |
|---|---|
| [verified] BO/transaction file uploads and export reports; SPEED-e DP batch download path; STP Navigator/Auto Download. [C01], [U02], [N09], [N03] | [uncertain] Those **interfaces** are file/batch workflows. Their business operations are not thereby proven batch-only. |
| [verified] CDSL repledge is explicitly asynchronous in the migration catalogue. [C02] | [uncertain] Asynchronous API processing is not equivalent to an EOD batch. |
| [unknown] An exhaustive list of operations available **only** in batch across both depositories. | [uncertain] A defensible build specification marks unavailable contracts as unresolved rather than asserting nonexistence. |

## 5. Margin-pledge authorisation flows

| Stage | CDSL | NSDL |
|---|---|---|
| Initiation | [verified] DP WebCDAS setup/upload and Easiest instructions can initiate the OTP-link flow. [C07] [verified] Margin-pledge API also exists. [C01] | [verified] DP instruction/SPEED-e and broker MPI integration exist. [N12], [N05] |
| Link delivery | [verified] Link sent to registered mobile and email after setup/upload. [C07] | [verified] NSDL sends a confirmation link to registered mobile and email. [N13] |
| Identification | [verified] PAN or BOID; BOID mandatory for PAN-exempt clients in the documented flow. [C07] | [verified] PAN authentication, with PAN-exempt exception. [N13] |
| Selection and OTP | [verified] Review/select pending pledges, generate OTP, enter it on CDSL. [C07] | [verified] Review outstanding pledges for the TM, generate/enter OTP. [N13] |
| OTP validity / expiry | [verified] CDSL publishes 15-minute OTP validity and regeneration; unauthorised requests lapse at execution-date EOD. [C16] | [unknown] Current exact OTP TTL, regeneration limits and link expiry. Do not copy CDSL's values. |
| Processing after OTP | [verified] Documented client authentication permits further processing. [C07] | [verified] OTP permits further processing; pledgee confirmation or auto-confirmation determines effectiveness. [N13], [N12] |
| Completion notice | [unknown] Current margin-pledge browser-return fields and signed server callback contract. [verified] Current inquiry route is published. [C02] | [verified] MPI flow includes callback on execution and investor SMS/email confirmation. [N02] [unknown] Current schema/signature/retry semantics. |
| Onward repledge | [verified] Further TM→CM/CM→CC repledge does not require a fresh client OTP in the documented chain. [C07] | [verified] FAQ says repledge does not require OTP confirmation. [N13] |
| Pledgee acceptance | [unknown] No public API schema for all CDSL confirmation modes recovered. | [verified] Auto-confirmation is a published option. [N12] [unknown] API field and activation contract for that option. |

### Published URL/token grammar: the precise limit of the evidence

| Item | What can safely be recorded |
|---|---|
| CDSL public authentication page | [verified] `https://www.cdslindia.com/Authentication/OTP.aspx` is the public authentication page. [C17] [unknown] A current formal specification of its generated-link token, encoding, signing, validity and parameter grammar. |
| CDSL generated link | [unknown] No reproducible, authoritative token-construction algorithm was recovered. Do not turn an observed emailed link or a forum example into an API specification. |
| CDSL API versus link | [verified] `MPSetup` and `MPInquiry` are published service paths. [C02] [unknown] Current request field that returns/identifies the customer URL, if applicable. |
| NSDL MPI redirect | [verified] Product diagram specifies HTTPS Form/POST redirection with pledge details. [N02] [unknown] Exact form fields, encrypted token grammar, destination URL and response signature. |
| NSDL SMS/email link | [verified] Generated confirmation link is part of the documented flow. [N13] [unknown] Formal current URL/query-string grammar. |
| Callback versus redirect | [uncertain] Retain separate handling for browser return, server callback, polling and participant report. The word “callback” alone does not establish a durable, signed webhook. |
| Automatic pledges | [uncertain] Do not generalise this manual OTP sequence to every direct-payout/MTF/CUSPA automatic-pledge case; confirm the particular account and settlement workflow. |

## 6. eDIS / TPIN integration mechanics

| Layer | CDSL | NSDL |
|---|---|---|
| Broker entry point | [verified] Client signs into broker/DP portal/app; encrypted transaction data is handed to CDSL. [C04] | [verified] Broker web/app initiates Demat Gateway instruction/authorisation. [N05] |
| Customer credential boundary | [verified] CDSL generates TPIN, delivers it directly and does not give the DP access to view/edit/store it. [C04] | [verified] SEBI requires depository-generated OTP and PIN/password for eDIS mandates. [R01] [unknown] Exact current NSDL password/PIN provisioning specification. |
| Current factors | [verified] TPIN **plus OTP** under CDSL operating instructions. [C08] (§6.6.7) | [verified] NSDL advertises OTP authentication. [N05] [uncertain] Read this together with SEBI's PIN/password requirement, not as proof that a password factor is universally absent. |
| Consent result | [verified] CDSL returns success/rejection and stores validated transaction details. [C04] | [verified] Callback to broker and update at participant system are described. [N01] |
| Actual debit | [verified] DP subsequently submits transactions; CDSL matches them to validated details. [C04] | [verified] CM submits debit instruction to the client's DP; NSDL validates against CC obligation data. [N05] |
| Mandate granularity | [verified] For on-market eDIS, SEBI specifies ISIN/quantity and single settlement number/date. [R01] | [verified] Same published regulatory description. [R01] |
| Status / revocation | [verified] CDSL lists revocation of pre-trade consent. [C01] | [verified] Product brochure lists Order Status Check API. [N02] [unknown] Current public NSDL revocation endpoint/schema. |
| Settlement accounting | [uncertain] Maintain separate consent, securities instruction and execution records; do not credit “delivered” status on an OTP-success message alone. | [uncertain] Apply the same separation and reconcile with participant execution evidence. |
| Integration package still needed | [unknown] Versioned payloads, permitted ISIN/record counts, callback registration, signing, error dictionary, expiry and retry rules. | [unknown] Same unresolved contract details, including distinction between single and multiple eDIS variants. |

## 7. UDiFF versus APIs

| Topic | Verified scope / conclusion |
|---|---|
| What is standardised? | [verified] SEBI's guidance standardises information/file structures across trading, clearing and depository operations; CSV with ISO-derived field tags is the described representation. [U01] |
| CDSL public file set | [verified] Includes ISIN/member/CA/CC-calendar masters; eDIS; holdings; transactions; COD/DP57; ISIN rates; transaction upload; BO upload; client master; DIS master. [U02] |
| NSDL published package | [verified] The October package's filename identifies **v3.0.1.2**; its contents include both **v3.0.1.2** and **v3.0.1.3** workbooks, plus Local DPM/eDPM upload/download samples. [U03] [unknown] Effective deployment of every bundled workbook; archive inclusion is not an activation notice. |
| Proposed versus current publication | [verified] CDSL's harmonisation page, updated **12 October 2026**, lists **v3.0.1.2** and separately labels **v3.0.1.3 “Proposed format”**. [U02] [unknown] An effective implementation date for that proposal. |
| Can an API carry a UDiFF file? | [verified] CDSL publishes BO/Common Upload APIs as well as standardised BO/Transaction Upload files. [C03], [U02] [uncertain] Treat file schema and submission transport as separate layers; confirm the currently accepted schema/version for each API. |
| Does UDiFF standardise REST endpoints/authentication/webhooks? | [unknown] No reviewed UDiFF authority establishes a common cross-depository HTTP API contract, credentials, token grammar or webhook protocol. [uncertain] The published programme establishes file/data-format harmonisation, not API interchangeability. [U01] |
| Does ISO 20022 imply an ISO 20022 network API? | [uncertain] No such conclusion follows from field naming in CSV. [verified] The guidance explicitly describes CSV and ISO tags. [U01] |
| What remains file-oriented? | [verified] Bulk account/transaction intake and reconciliation/master/holding/transaction exports are published UDiFF workflows. [U02], [U03] | 
| How much common implementation is justified? | [uncertain] Reuse schema interpretation, validation and reconciliation concepts where verified; retain depository-specific transport, authorisation and state translation. |

## 8. Operational cut-offs: API transport does not erase business windows

Times below are published Indian-market operating times; no API-specific extension is inferred. A publication date, a deadline and a tested operational fact are kept separate.

| Operation / clock | Published timing | Applicability, status and limits |
|---|---|---|
| CDSL manual margin-pledge OTP | [verified] **15 minutes**; regeneration allowed. [C16] | [verified] OTP validity, not an API service-hours limit. [C16] |
| CDSL manual pledge authentication | [verified] Through **EOD of execution date**; uncompleted authorisation cancels. [C07] | [unknown] Exact wall-clock equivalent of EOD for every date/module. |
| CDSL LAS DP approval/rejection | [verified] Complete **same day as request generation**, per 15 July 2026 circular. [C06] | [unknown] Exact intraday cut-off. API initiation does not remove DP processing. |
| NSDL SPEED-e current-date instructions | [verified] **19:00 weekdays; 15:00 Saturdays**. Future-date instructions can be entered after those times. [N01] (p. 346) | [verified] Restated in March 2026 master. [unknown] These are the cut-offs for all broker APIs; the cited rule is specifically SPEED-e. |
| NSDL depository system weekday EOD | [verified] Extended weekday availability to **22:30**, followed by EOD; excludes Saturdays, Sundays and DM holidays. [N01] (p. 441, para 35) | [uncertain] System availability is not a promise that every settlement operation remains eligible until 22:30. |
| NSDL Sunday opening/modification | [verified] Circular **NSDL/POLICY/2026/0136, 21 September 2026** describes same-Sunday activation for accounts opened up to **18:00**, with **27 September 2026** as its worked example; later openings activate after Monday BOD. [N08] | [verified] Insta Demat/CMA APIs may be used; DAN remains available. Ordinary market/off-market/pledge/demat/remat execution with Sunday business date is excluded. [N08] |
| NSDL Sunday UCC data | [verified] Five receipts of UCC data on Sunday; DP UCC downloads follow in Monday's first batch. [N08] | [uncertain] A Sunday-opened account and its broker-visible UCC export can therefore have different availability times. |
| NSDL G-Sec own-account transfer acceptance | [verified] **16:30 Monday–Friday; 13:00 working Saturday**, in the NSDL-to-RDG procedure. [N18] | [verified] December 2025 VFT circular; Maharashtra bank holidays excluded from processing. [N18] [uncertain] This is a specialised transfer deadline, not a general broker API window. |
| NCL securities EPI | [verified] FAQ Q39 gives general **21:00**, and **20:00 for UPI clients**, subject to changes and running-account-settlement days. [T01] | [uncertain] CC deadlines, not universal depository API or pledge-OTP deadlines. Verify daily schedule. |
| CDSL MF redemption pay-in: NCL/ICCL original revision | [verified] 30 May 2025 circular prescribed **19:15**, effective **1 June 2025**. [T02] | [verified] It covers specified MF redemption settlement, not every equity debit. [T02] |
| CDSL MF redemption pay-in: ICCL subsequent change | [verified] 2 September 2025 circular changes the ICCL deadline to **19:30**. [T03] | [uncertain] Do not keep applying the earlier 19:15 ICCL value. [unknown] A separate future effective date in the retrieved notice; it states the change has been made. |
| CDSL API migration dates | [verified] 27 February / 31 March 2026 sunset notices discussed in §2.2. [C02] | [uncertain] Migration deadlines, not daily instruction cut-offs. |
| Generic API/file opening, holdings, client-master and inquiry service hours | [unknown] Complete current service-by-service calendar, maintenance windows and API/file differential cut-offs. | [uncertain] Configure only from the participant production operating pack. |
| Margin release/invocation; ICCL/MCXCCL collateral release | [unknown] A universal same-call completion guarantee or common cross-CC daily cut-off. | [uncertain] Obtain DP and CC schedules independently; do not import NSE securities EPI times into commodity collateral processing. |

## 9. Changes in 2025–2026 relevant to implementation

| Publication / development | Notified, effective or proposed? | Implementation consequence |
|---|---|---|
| CDSL **CDSL/OPS/DP/TECH/2025/525**, 6 August 2025 | [verified] New API URLs announced. [C03] | [uncertain] Use the later February 2026 migration notice for subsequent endpoint/sunset details. |
| CDSL **CDSL/OPS/DP/TECH/2026/85**, 6 February 2026 | [verified] Synchronous EPI/margin pledge stated live; old-host and delayed-version shutdown dates notified. [C02] | [uncertain] Separate endpoint migration from asynchronous-to-synchronous workflow migration. |
| CDSL **CDSL/PMLA/DP/POLCY/2026/439**, 1 July 2026 | [verified] Multiple-BO-count API introduced, with technical annexure. [C05] | [uncertain] Add an onboarding due-diligence integration; do not treat it as a complete BO-profile API. |
| CDSL **CDSL/OPS/DP/POLICY/2026/468**, 15 July 2026 | [verified] LAS module in Easiest introduced. [C06] | [uncertain] Account for DP approval/auto approval and same-day processing. |
| CDSL **CDSL/OPS/DP/SETT/2026/180**, 13 March 2026 | [verified] Pledge creation/invocation undertaking process; circular states implementation **6 April 2026**. [C18] | [uncertain] A technical API must sit behind the required instruction/evidence workflow. |
| CDSL **CDSL/OPS/DP/POLCY/2026/627**, 11 September 2026 | [verified] Chapter 8/forms amended; one-time undertaking annexures **8.9** for TM/CM margin pledge/repledge and **8.10** for auto-pledge pledgees introduced. [C15] | [unknown] Corresponding API payload changes. Do not invent an undertaking Boolean or parameter. |
| NSDL Digital Gateway / APIfication | [verified] Annual report describes implemented APIs and staged future expansion. [N03] | [unknown] Complete launch-date/version/entitlement matrix. Reported implementation is stronger evidence than a proposal but weaker than a tested participant contract. |
| NSDL UCC-mapping service | [verified] January 2025 board minutes describe development/testing and fee approval; later participant brochure presents the service. [N14], [N02] | [uncertain] Distinguish proposal/approval from later product availability; [unknown] exact go-live date. |
| NSDL **NSDL/POLICY/2025/0162**, 11 December 2025 | [verified] VFT API-related system enhancement notified for implementation at **EOD 12 December 2025**. [N18] | [unknown] Direct broker API entitlement; participant procedures are published, but no broker endpoint/schema is supplied. |
| NSDL **NSDL/POLICY/2026/0136**, 21 September 2026 | [verified] Sunday account activation/modification enhancement and API usage documented. [N08] | [uncertain] Separate account activation, UCC refresh and settlement business-day eligibility. |
| UDiFF catalogue evolution | [verified] October source material distinguishes published v3.0.1.2 from CDSL's proposed v3.0.1.3. [U02], [U03] | [uncertain] Version the file parser and API contract separately; publication alone is not a universal activation notice. |

## 10. Implementation decisions supported by the evidence

All rows in this table are **[uncertain] engineering recommendations**, not depository-mandated API fields or status enums.

| Decision | Proposed implementation |
|---|---|
| Keep three separate layers | Consent journey; instruction submission/execution; reconciliation and downstream CC recognition. Never reduce them to one “success” flag. |
| Use explicit operation adapters | Separate CDSL normal pledge, margin pledge, repledge, EPI and upload integrations; separate NSDL Demat Gateway, EPI, account APIs and file automation. |
| Support asynchronous results even beside synchronous responses | Persist request identifiers and outcome evidence; accommodate callback, inquiry and file reports. Use actual depository identifiers, with mappings to internal IDs. |
| Prevent duplicate financial instructions | On an ambiguous timeout, inquire/reconcile before resubmission. Obtain actual duplicate-detection/idempotency rules; do not assume an invented idempotency header. |
| Preserve instruction granularity | Retain BO/account, ISIN, quantity, authority/consent evidence, pledge lineage and execution date as business data; translate into contractual field names only after receiving specifications. |
| Treat callbacks as evidence requiring validation | Implement the supplied authentication/signature and replay rules; compare eventual participant/CC records. No guessed HMAC or JWT contract. |
| Keep clocks configurable | Separate credential expiry, OTP TTL, instruction expiry, system EOD, settlement deadline and CC collateral-release window. |
| Reconcile file/API paths together | Correlate API submissions with UDiFF outputs and final account/holding state. Avoid duplicate accounting when the same event arrives via callback and file. |
| Make uncertainty a procurement item | Require versioned specifications, current URLs, entitlements, UAT data, certification steps, service windows, limit tables and callback guarantees before promising customer-facing “instant” behaviour. |

## 11. Source and access register

### 11.1 Primary sources

Each source ID resolves to its URL. Page/section references elsewhere identify the supporting passage; source names alone do not imply that every statement on an old page remains current.

| ID | Source / provenance | Retrieval and use |
|---|---|---|
| C01 | [CDSL API catalogue][C01] | [verified] Full public catalogue read; page footer retains a 2021 update date. Supplemented with later circulars. |
| C02 | [CDSL 2026/85: new URLs and instantaneous APIs][C02] | [verified] Original PDF downloaded from official circular service; 4 pages. |
| C03 | [CDSL 2025/525: new API URLs][C03] | [verified] Original official PDF downloaded. |
| C04 | [CDSL eDIS explanation][C04] | [verified] Full page read; 2020 explanation supplemented by 2026 operating instructions. |
| C05 | [CDSL 2026/439: multiple-BO API and annexure][C05] | [verified] Original official PDF read. Annexure has a confidentiality/republication notice; this report summarises integration facts rather than reproducing the document or its sample personal data. |
| C06 | [CDSL 2026/468: LAS module][C06] | [verified] Original circular and process annexure read. |
| C07 | [CDSL 2020/309: margin-pledge OTP/process][C07] | [verified] Historical original read; used for explicitly documented authorisation mechanics. |
| C08 | [CDSL operating instructions, through June 2026][C08] | [verified] Official consolidated PDF read, with later Chapter 8 amendment separately checked. |
| C09–C12 | [Easiest][C09], [Easi][C10], [file formats][C11], [Innovation Sandbox][C12] | [verified] Official service/file/testing descriptions. |
| C13 | [CDSL FY2020–21 annual report][C13] | [verified] Indexed official text on historical real-time BO APIs. Historical evidence only. |
| C14 / C17 | [API landing page][C14], [authentication page][C17] | [verified] Public interface presence; [unknown] full contract. |
| C15 / C18 | [CDSL September undertaking amendment][C15], [March 2026 undertaking circular][C18] | [verified] Official PDFs read. |
| C16 | [CDSL OTP email template][C16] | [verified] Explicit OTP/lifetime text read. |
| N01 | [NSDL March 2026 Participant Master][N01] | [verified] Official PDF retrieved after discovering its URL through the official circular page; web reader alone could not open it. |
| N02 | [NSDL Participant Services product brochure][N02] | [verified] Official nsdl.com PDF downloaded and text/flow labels read; web reader rejected its size. |
| N03 | [NSDL FY2025–26 annual report][N03] | [verified] Official PDF, including Digital Gateway and APIfication passages. |
| N04–N06 | [DP services][N04], [Demat Gateway][N05], [SPICE][N06] | [verified] Official service pages; direct HTTP recovery supplemented timed-out web-reader access. |
| N07 | [NSDL 2024/0012 Client Maintenance API][N07] | [verified] Official circular; API-document availability/onboarding invitation. |
| N08 | [NSDL 2026/0136 Sunday enhancement][N08] | [verified] Official original retrieved. First discovered through a SecMark-hosted facsimile; final citation is NSDL's own URL. |
| N09–N13 | [SPEED-e][N09], [DPM Plus][N10], [Innovation Sandbox][N11], [margin pledge][N12], [FAQ][N13] | [verified] Official descriptions; FAQ relevant text recovered through search indexing when page reader omitted dynamic content. |
| N14 | [NSDL 31 January 2025 board-minute extract][N14] | [verified] Indexed primary text; used only for development/proposal/approval status. |
| N15 / N16 | [NSDL 2022 DAN introduction][N15], [NSDL 2022 API catalogue][N16] | [verified] Original official PDFs downloaded; distinguish initial scope from later versions. |
| N18 | [NSDL 2025 G-Sec VFT API circular][N18] | [verified] Official circular recovered through the official publication index. |
| U01 | [SEBI UDiFF guidance hosted by CDSL][U01] | [verified] Official linked DOCX downloaded and read. |
| U02 / U03 | [CDSL harmonisation page][U02], [NSDL October UDiFF package][U03] | [verified] Page and original ZIP retrieved; NSDL spreadsheet/sample inventory inspected. |
| R01 | [SEBI investor charter: eDIS/Demat Gateway][R01] | [verified] Primary explanation of settlement-specific mandate and factors. |
| T01–T03 | [NCL settlement FAQ][T01], [CDSL MF timing revision][T02], [CDSL ICCL subsequent timing revision][T03] | [verified] Published clocks scoped in §8; daily/segment-specific notices can supersede general descriptions. |

### 11.2 Access limitations and research method

| Observation | Evidence status and consequence |
|---|---|
| NSDL legacy domain failures | [verified] Research-session observation: attempted `nsdl.co.in` brochure/master/circular downloads returned web-reader 502/timeouts or closed the ordinary HTTP connection. [unknown] Whether each failure was an automated-access block, transient service problem or migration issue. |
| NSDL migration | [verified] Annual report says the corporate website moved to `nsdl.com` in 2026. [N03] [verified] Several equivalent official documents were recovered there. |
| Dynamic NSDL publication pages | [verified] Research-session observation: rendered pages omitted portions of publication lists. The site's own public circular-list requests exposed original PDF URLs, including the 2026 master and Sunday circular. [N19] [uncertain] Do not classify this website-content API as a securities-transaction API. |
| CDSL download behaviour | [verified] Research-session observation: the web reader rejected circular responses labelled `application/octet-stream`; ordinary HTTP downloads returned valid PDFs. [C02], [C05] This was a reader/content-type limitation, not proof of a CDSL access prohibition. |
| Large NSDL brochure | [verified] Research-session observation: web reader rejected content length; direct official PDF download succeeded. [N02] |
| No bypass or credential use | [verified] Research-session observation: no participant login, customer OTP, live transaction, guessed credential or operational API submission was used. Published service addresses were transcribed from documents. |
| Search coverage | [verified] Research-session observation: **48 distinct web-search queries** are recorded in the [search log](logs/2026-10-15-depository-apis-kb-handoff.md#recorded-web-search-queries), with additional discovery searches, official-site queries and direct downloads. Coverage includes catalogues, migrations, authentication/callbacks, UAT/limits, holdings/status, eDIS, pledge links, UDiFF and cut-offs. |
| Circular-number discipline | [uncertain] Use numbers from the body of the actual circular; search engines sometimes display a stale template heading unrelated to the real circular number. |
| Excluded corroboration | [verified] Research-session observation: searches returned this project's own `javajack.github.io/broking-kyc` pages. They were excluded as independent evidence, as were vendor wrappers and unrelated PAN/payments APIs. |
| Knowledge-base handoff | [verified] Research-session environment: Obsidian instructions/context were read. The vault is outside permitted write roots; the [local session handoff](logs/2026-10-15-depository-apis-kb-handoff.md) records the work for later import. |

[C01]: https://www.cdslindia.com/DP/APIs.html
[C02]: https://www.cdslindia.com/eservices/Publications/DownloadFile?eventID=DP2026-85&method=communique
[C03]: https://www.cdslindia.com/eservices/Publications/DownloadFile?eventID=DP2025-525&method=communique
[C04]: https://www.cdslindia.com/Footer/Edis.html
[C05]: https://www.cdslindia.com/eservices/Publications/DownloadFile?eventID=DP2026-439&method=communique
[C06]: https://www.cdslindia.com/eservices/Publications/DownloadFile?eventID=DP2026-468&method=communique
[C07]: https://www.cdslindia.com/downloads/Publications/Communique/DP2020-309_communiques_dp_DP-309-Margin-Pledge-Re-Pledge-NEW%20%281%29.pdf
[C08]: https://www.cdslindia.com/downloads/DP/currentDPs/DP-Operating-Instructions-Chapters-as-on-June-30-2026.pdf
[C09]: https://www.cdslindia.com/Footer/Easiest.html
[C10]: https://www.cdslindia.com/Footer/Easi.html
[C11]: https://www.cdslindia.com/DP/File%20format.html
[C12]: https://www.cdslindia.com/Publications/InnovationSandbox.html
[C13]: https://www.cdslindia.com/telugu/downloads/IPO/CDSL%20Annual%20Report%202020-2021.pdf
[C14]: https://api.cdslindia.com/APIServices
[C15]: https://www.cdslindia.com/eservices/Publications/DownloadFile?eventID=DP2026-627&method=communique
[C16]: https://www.cdslindia.com/MarginPledge/PledgeMarginMailtemplate.htm
[C17]: https://www.cdslindia.com/Authentication/OTP.aspx
[C18]: https://www.cdslindia.com/eservices/Publications/DownloadFile?eventID=DP2026-180&method=communique
[N01]: https://nsdl.com/nsdl/2026-07/Master_circular_to_participants_march_2026.pdf
[N02]: https://nsdl.com/nsdl/2026-03/NSDL_Product_Brochure_%E2%80%93_Participant_Services.pdf
[N03]: https://nsdl.com/nsdl/2026-08/NSDL%20ANNUAL%20REPORT%202025-26.pdf
[N04]: https://nsdl.com/participant/dp-services
[N05]: https://nsdl.com/stock-broker-demat-gateway
[N06]: https://nsdl.com/stock-broker-spice
[N07]: https://nsdl.com/nsdl/circulars/2024-0012-Policy-NSDL_APIs_and_Technology_Integrations_for_Market_Participants_-_Client_Maintenance_API.pdf
[N08]: https://nsdl.com/nsdl/2026-09/2026-0136-Policy-Enhancements%20in%20NSDL%20Depository%20system%20for%20opening%20of%20Demat%20Account%20and%20executing%20Client%20modification%20instructions%20on%20Sunday.pdf
[N09]: https://nsdl.com/investor-services-Speed-e-web
[N10]: https://nsdl.com/participant-dpm-plus
[N11]: https://nsdl.com/services/innovation-sandbox
[N12]: https://nsdl.com/services/margin-pledge
[N13]: https://nsdl.com/faq
[N14]: https://nsdl.co.in/downloadables/pdf/Extracts_of_the_Minutes_97th_BM_31.01.2025.pdf
[N15]: https://nsdl.com/nsdl/circulars/2022-059-Policy-Depository%20Account%20Validation%20%28DAN%29%20facility%20for%20SEBI%20registered%20intermediaries.pdf
[N16]: https://nsdl.com/nsdl/circulars/2022-022-Policy-NSDL%20APIs%20and%20Technology%20Integrations%20for%20Market%20Participants.pdf
[N18]: https://nsdl.com/nsdl/circulars/2025-0162-Policy-Enhancement_for_enabling_Application_Programming_Interface_to_facilitate_Value_Free_Transfer_%28VFT%29_of_Government_Securities_%28G-Secs%29.pdf
[N19]: https://nsdl.com/participant/circulars
[U01]: https://www.cdslindia.com/downloads/DP/Harmonization/Annexure%20-%20A_UDiFF%20Guidance%20Note%20V2023.11.2.docx
[U02]: https://www.cdslindia.com/DP/Harmonization.html
[U03]: https://nsdl.com/nsdl/2026-10/UDiFF%20catalouge%20V3.0.1.2%20and%20Updated%20Sample%20File-09102026.zip
[R01]: https://investor.sebi.gov.in/Investor-charter.html
[T01]: https://www.nseclearing.in/sites/default/files/2026-02/NCL%20SETTLEMENT.pdf
[T02]: https://www.cdslindia.com/eservices/Publications/DownloadFile?eventID=DP2025-361&method=communique
[T03]: https://www.cdslindia.com/eservices/Publications/DownloadFile?eventID=DP2025-588&method=communique

## Gaps and cautions

| Gap / risk | Required resolution |
|---|---|
| Complete API inventory | [unknown] NSDL's full 56-API catalogue and CDSL's complete current entitlement/version inventory. Obtain official participant packs; the recovered public catalogue is not a substitute. |
| Current synchronous result semantics | [unknown] Whether each successful response means syntax accepted, instruction registered, customer consent received, pledge accepted, ledger posted or CC credit recognised. Obtain actual response dictionaries and examples. |
| Holdings/client master | [unknown] Contractual live APIs and freshness guarantees. The existence of a report, investor view, count service or vendor holdings endpoint does not resolve this. |
| Unpledge/invocation | [unknown] Complete margin/repledge-specific programmatic release/invocation coverage, chain unwinding, partial quantities and callback semantics. Do not generalise normal-pledge addresses. |
| Authentication and rate limits | [unknown] Current per-product signing, credentials, token lifetimes, mTLS, quotas, throttling and timeout rules. No universal “API key + DSC” or guessed QPS is asserted. |
| Link grammar and callbacks | [unknown] Complete margin-link token construction, browser fields, webhook signature/retry rules and NSDL OTP TTL. CDSL's documented OTP TTL must not be copied to NSDL. |
| Conflicting public material | [uncertain] NSDL account eligibility differs between its master and brochure; CDSL's count-API IV description is inconsistent. Request explicit clarification, not implementation by guesswork. |
| Operational clocks | [unknown] A single universal API/file service-hours table and all NCL/ICCL/MCXCCL collateral windows. [uncertain] General FAQs and old product pages can retain outdated passages; dated operational notices and the participant contract control implementation. |
| Publication versus actual operation | [uncertain] “Live”, “implemented” and notified sunset dates are statements in official publications; no authenticated production tests were performed. Future expansion/proposed UDiFF formats are not treated as effective deployments. |
| Automated-access limitations | [verified] Some official resources failed through the web reader or legacy host; many were recovered by ordinary downloads from official current URLs. [unknown] Whether each residual failure reflects anti-bot blocking. Do not claim the whole site is inaccessible or that absent search results prove no API exists. |
| Greenfield deployment boundary | [uncertain] Promise synchronous customer outcomes only after entitlement, UAT and response-finality checks. Until then, design for explicit pending states, inquiry, reconciliation and manual exception handling. |

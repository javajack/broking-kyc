// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

export default defineConfig({
  site: "https://javajack.github.io",
  base: "/broking-kyc",
  integrations: [
    starlight({
      title: "KYC Onboarding Spec",
      description:
        "Complete technical specification for individual customer KYC onboarding in an Indian stock broking firm. By Rakesh Waghela.",
      social: [
        { icon: "x.com", label: "Rakesh on X", href: "https://x.com/webiyo" },
        {
          icon: "linkedin",
          label: "Rakesh on LinkedIn",
          href: "https://www.linkedin.com/in/rakeshwaghela",
        },
        {
          icon: "external",
          label: "Book a Consultation",
          href: "https://topmate.io/rakeshwaghela",
        },
      ],
      components: {
        Footer: "./src/components/overrides/Footer.astro",
        SiteTitle: "./src/components/overrides/SiteTitle.astro",
      },
      head: [
        // Google Consent Mode v2 - MUST load BEFORE gtag.js (synchronous)
        {
          tag: "script",
          content: `
						// Initialize dataLayer and gtag function
						window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}

						// Regional scoping: Detect if user is in GDPR region
						function isGDPRRegion() {
							// Check timezone as proxy for region (EU timezones)
							const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
							const euTimezones = ['Europe/', 'Atlantic/Reykjavik', 'Atlantic/Azores', 'Atlantic/Madeira'];
							return euTimezones.some(zone => tz.startsWith(zone));
						}

						// Set consent defaults based on region
						// GDPR regions: denied by default (show banner)
						// Other regions: granted by default (no banner, better measurement)
						const isGDPR = isGDPRRegion();

						gtag('consent', 'default', {
							'ad_storage': 'denied',
							'ad_user_data': 'denied',
							'ad_personalization': 'denied',
							'analytics_storage': isGDPR ? 'denied' : 'granted',
							'functionality_storage': 'granted',
							'personalization_storage': 'denied',
							'security_storage': 'granted',
							'wait_for_update': 500,
						});

						// Store GDPR flag for banner logic
						window.__isGDPRRegion = isGDPR;
					`,
        },
        // Google Analytics - Load gtag.js (async, after consent default)
        {
          tag: "script",
          attrs: {
            async: true,
            src: "https://www.googletagmanager.com/gtag/js?id=G-G986QLPFZ1",
          },
        },
        {
          tag: "script",
          content: `
						window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());
						gtag('config', 'G-G986QLPFZ1', {
							'anonymize_ip': true,
							'cookie_flags': 'SameSite=None;Secure'
						});
					`,
        },
        // Yandex Webmaster verification
        {
          tag: "meta",
          attrs: { name: "yandex-verification", content: "5281e40eca9463d2" },
        },
        {
          tag: "meta",
          attrs: {
            property: "og:image",
            content: "https://javajack.github.io/broking-kyc/og-image.png",
          },
        },
        { tag: "meta", attrs: { property: "og:image:width", content: "1200" } },
        { tag: "meta", attrs: { property: "og:image:height", content: "630" } },
        {
          tag: "meta",
          attrs: {
            name: "twitter:image",
            content: "https://javajack.github.io/broking-kyc/og-image.png",
          },
        },
        // Cloudflare Web Analytics
        {
          tag: "script",
          attrs: {
            defer: true,
            src: "https://static.cloudflareinsights.com/beacon.min.js",
            "data-cf-beacon": '{"token": "7ce325bb227e4b42a8406f369ff4e788"}',
          },
        },
        // Cookie Consent Banner (injected via script)
        {
          tag: "script",
          attrs: { defer: true, src: "/broking-kyc/cookie-consent.js" },
        },
        {
          tag: "script",
          attrs: { type: "application/ld+json" },
          content: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                name: "KYC Onboarding Specification",
                url: "https://javajack.github.io/broking-kyc/",
                description:
                  "Complete technical specification for individual customer KYC onboarding in an Indian stock broking firm.",
                author: { "@id": "#rakesh" },
              },
              {
                "@type": "Person",
                "@id": "#rakesh",
                name: "Rakesh Waghela",
                url: "https://www.linkedin.com/in/rakeshwaghela",
                jobTitle: "Tech & KYC Solutions Architect",
                sameAs: [
                  "https://x.com/webiyo",
                  "https://www.linkedin.com/in/rakeshwaghela",
                  "https://topmate.io/rakeshwaghela",
                ],
              },
            ],
          }),
        },
      ],
      customCss: ["./src/styles/custom.css"],
      sidebar: [
        {
          label: "Choose Your Role",
          items: [
            { label: "All Roles", slug: "personas" },
            { label: "Product Manager", slug: "personas/product-manager" },
            { label: "Backend Engineer", slug: "personas/backend-engineer" },
            { label: "Frontend / UX Engineer", slug: "personas/frontend-ux-engineer" },
            { label: "Operations Lead", slug: "personas/operations-lead" },
            { label: "Head of OMS / RMS", slug: "personas/oms-rms-head" },
            { label: "Compliance Officer / CCO", slug: "personas/compliance-officer" },
            { label: "Finance / CFO", slug: "personas/finance-cfo" },
            { label: "Internal Auditor", slug: "personas/internal-auditor" },
            { label: "Statutory Auditor", slug: "personas/statutory-auditor" },
            { label: "Trainee", slug: "personas/trainee" },
            { label: "Regulator / Inspector", slug: "personas/regulator-inspector" },
            { label: "Vendor / Integration Partner", slug: "personas/vendor-partner" },
          ],
        },
        {
          label: "Getting Started",
          items: [{ label: "Overview", slug: "" }],
        },
        {
          label: "Architecture",
          items: [
            {
              label: "Design Principles",
              slug: "architecture/design-principles",
            },
            { label: "Flow Summary", slug: "architecture/flow-summary" },
            {
              label: "Data Source Mapping",
              slug: "architecture/data-source-mapping",
            },
            {
              label: "Security & Compliance",
              slug: "architecture/security-compliance",
            },
          ],
        },
        {
          label: "User Journey",
          items: [
            { label: "Journey Overview", slug: "journey" },
            {
              label: "1. Mobile Registration",
              slug: "journey/01-mobile-registration",
            },
            { label: "2. PAN + DOB", slug: "journey/02-pan-dob" },
            {
              label: "3. DigiLocker Consent",
              slug: "journey/03-digilocker-consent",
            },
            {
              label: "4. Confirm Identity",
              slug: "journey/04-confirm-identity",
            },
            { label: "5. Bank Account", slug: "journey/05-bank-account" },
            {
              label: "6. Trading Preferences",
              slug: "journey/06-trading-preferences",
            },
            { label: "7. Nominations", slug: "journey/07-nominations" },
            {
              label: "8. Declarations Gate",
              slug: "journey/08-declarations-gate",
            },
            { label: "9. Review + eSign", slug: "journey/09-review-esign" },
          ],
        },
        {
          label: "Lifecycle",
          items: [
            { label: "Overview", slug: "lifecycle" },
            { label: "Re-KYC", slug: "lifecycle/re-kyc" },
            { label: "Modifications", slug: "lifecycle/modifications" },
            { label: "Dormancy & Reactivation", slug: "lifecycle/dormancy-reactivation" },
            { label: "Voluntary Closure", slug: "lifecycle/closure" },
            { label: "Transmission", slug: "lifecycle/transmission" },
            { label: "NRI Conversion", slug: "lifecycle/nri-conversion" },
          ],
        },
        {
          label: "Account Variants",
          collapsed: true,
          items: [
            { label: "Overview", slug: "account-variants" },
            { label: "Minor", slug: "account-variants/minor" },
            { label: "NRI", slug: "account-variants/nri" },
            { label: "HUF", slug: "account-variants/huf" },
            { label: "Partnership / LLP", slug: "account-variants/partnership-llp" },
            { label: "Company", slug: "account-variants/company" },
            { label: "Trust / Society / AOP", slug: "account-variants/trust-society-aop" },
            { label: "FPI / FVCI", slug: "account-variants/fpi-fvci" },
            { label: "Joint Accounts", slug: "account-variants/joint-accounts" },
            { label: "BSDA", slug: "account-variants/bsda" },
            { label: "Bank-led 3-in-1", slug: "account-variants/bank-broker-3in1" },
            { label: "Institutional / Custodial", slug: "account-variants/institutional-custodial" },
          ],
        },
        {
          label: "Product Activation",
          collapsed: true,
          items: [
            { label: "Overview", slug: "product-activation" },
            { label: "F&O Activation", slug: "product-activation/fno-activation" },
            { label: "Commodity Activation", slug: "product-activation/commodity-activation" },
            { label: "Currency & IRD Activation", slug: "product-activation/currency-ird-activation" },
            { label: "MTF Activation", slug: "product-activation/mtf-activation" },
            { label: "IPO via ASBA / UPI", slug: "product-activation/ipo-asba-upi" },
            { label: "SLBM Enrolment", slug: "product-activation/slbm-enrolment" },
            { label: "Margin Pledge", slug: "product-activation/margin-pledge" },
            { label: "DDPI vs eDIS / TPIN", slug: "product-activation/ddpi-edis-tpin" },
            { label: "API & Algo Access", slug: "product-activation/api-algo-access" },
            { label: "GIFT City / IFSC", slug: "product-activation/gift-ifsc" },
            { label: "Bonds, G-Sec & NPS", slug: "product-activation/bonds-gsec-nps" },
            { label: "Advanced Order Types", slug: "product-activation/advanced-order-types" },
          ],
        },
        {
          label: "Funds & Tax",
          collapsed: true,
          items: [
            { label: "Overview", slug: "funds-tax" },
            { label: "Pay-in Rails", slug: "funds-tax/payin-rails" },
            { label: "Payout & Running Account", slug: "funds-tax/payout-running-account" },
            { label: "Delayed Payment Charges", slug: "funds-tax/delayed-payment-charges" },
            { label: "Brokerage & Charges", slug: "funds-tax/brokerage-and-charges" },
            { label: "Ledger & Statements", slug: "funds-tax/ledger-and-statements" },
            { label: "Tax Reporting", slug: "funds-tax/tax-reporting" },
            { label: "Corporate Actions", slug: "funds-tax/corporate-actions" },
            { label: "Demat Servicing", slug: "funds-tax/demat-servicing" },
          ],
        },
        {
          label: "Trading Risk & Derivatives",
          collapsed: true,
          items: [
            { label: "Overview", slug: "trading-risk" },
            { label: "Exercise, Assignment & Physical Settlement", slug: "trading-risk/exercise-assignment-physical" },
            { label: "Expiry-day Operations", slug: "trading-risk/expiry-day-operations" },
            { label: "Position Limits & OI", slug: "trading-risk/position-limits-oi" },
            { label: "Collateral & Cross-margin", slug: "trading-risk/collateral-cross-margin" },
            { label: "Margin Shortfall & Peak Margin", slug: "trading-risk/margin-shortfall-peak-margin" },
            { label: "Order Risk Controls", slug: "trading-risk/order-risk-controls" },
            { label: "Prop, Employee Trading & PIT", slug: "trading-risk/prop-employee-trading-pit" },
            { label: "Client Protection Frameworks", slug: "trading-risk/client-protection-frameworks" },
          ],
        },
        {
          label: "Broker Process",
          items: [
            { label: "End-to-End Narrative", slug: "broker-process/narrative" },
          ],
        },
        {
          label: "Finix Broking Setup",
          collapsed: true,
          items: [
            { label: "Overview", slug: "finix-broking-setup" },
            {
              label: "Stack",
              collapsed: true,
              items: [
                { label: "Overview", slug: "finix-broking-setup/stack" },
                { label: "Vendor Map", slug: "finix-broking-setup/stack/vendor-map" },
                { label: "Vendor Interface Verification", slug: "finix-broking-setup/stack/vendor-interface-verification" },
                { label: "Environments & Config", slug: "finix-broking-setup/stack/environments-config-baseline" },
                { label: "Integration Contracts", slug: "finix-broking-setup/stack/integration-contract-matrix" },
                { label: "Gateway & Event Architecture", slug: "finix-broking-setup/stack/bff-and-event-architecture" },
                { label: "Disaster Recovery Architecture", slug: "finix-broking-setup/stack/disaster-recovery-architecture" },
              ],
            },
            {
              label: "Setting Up",
              collapsed: true,
              items: [
                { label: "Overview", slug: "finix-broking-setup/setup" },
                { label: "1. Entity & Capital", slug: "finix-broking-setup/setup/01-entity-capital-structure" },
                { label: "2. SEBI Registration 2026", slug: "finix-broking-setup/setup/02-sebi-registration-2026" },
                { label: "3. Exchange Membership", slug: "finix-broking-setup/setup/03-exchange-membership" },
                { label: "4. Clearing Arrangement", slug: "finix-broking-setup/setup/04-clearing-arrangement" },
                { label: "5. Depository Participation", slug: "finix-broking-setup/setup/05-depository-participant" },
                { label: "6. Bank Account Architecture", slug: "finix-broking-setup/setup/06-bank-account-architecture" },
                { label: "7. People & Certification", slug: "finix-broking-setup/setup/07-people-certification-org" },
                { label: "8. Infrastructure & Connectivity", slug: "finix-broking-setup/setup/08-infrastructure-connectivity" },
                { label: "9. Vendor Contracts", slug: "finix-broking-setup/setup/09-vendor-onboarding-contracts" },
                { label: "10. Certification & Go-Live", slug: "finix-broking-setup/setup/10-certification-mock-golive" },
              ],
            },
            {
              label: "Client Onboarding",
              collapsed: true,
              items: [
                { label: "Overview", slug: "finix-broking-setup/onboarding" },
                { label: "1. Digio Integration", slug: "finix-broking-setup/onboarding/01-digio-integration" },
                { label: "2. CVL KRA Integration", slug: "finix-broking-setup/onboarding/02-kra-cvl-integration" },
                { label: "3. CKYC & CKYCRR 2.0", slug: "finix-broking-setup/onboarding/03-ckyc-ckycrr2-integration" },
                { label: "4. PEP & Sanctions Screening", slug: "finix-broking-setup/onboarding/04-pep-sanctions-screening" },
                { label: "5. UCC Registration", slug: "finix-broking-setup/onboarding/05-ucc-registration-exchanges" },
                { label: "6. eSign, DDPI & Pledge", slug: "finix-broking-setup/onboarding/06-esign-ddpi-pledge-setup" },
                { label: "7. Modification & Closure", slug: "finix-broking-setup/onboarding/07-account-modification-closure" },
                { label: "8. KYC Ops Quality & Audit", slug: "finix-broking-setup/onboarding/08-kyc-ops-quality-audit" },
              ],
            },
            {
              label: "OMS",
              collapsed: true,
              items: [
                { label: "Overview", slug: "finix-broking-setup/oms" },
                { label: "1. Architecture", slug: "finix-broking-setup/oms/01-oms-architecture" },
                { label: "2. Exchange Protocols", slug: "finix-broking-setup/oms/02-exchange-connectivity-protocols" },
                { label: "3. User IDs, CTCL & NNF", slug: "finix-broking-setup/oms/03-user-id-ctcl-nnf" },
                { label: "4. Order Types Catalogue", slug: "finix-broking-setup/oms/04-order-types-catalogue" },
                { label: "5. Attributes & Validity", slug: "finix-broking-setup/oms/05-order-attributes-validity" },
                { label: "6. Order Forward Path", slug: "finix-broking-setup/oms/06-order-forward-path" },
                { label: "7. Order Return Path", slug: "finix-broking-setup/oms/07-order-return-path" },
                { label: "8. Modify & Cancel", slug: "finix-broking-setup/oms/08-modify-cancel-rules" },
                { label: "9. Algo, API, DMA & SOR", slug: "finix-broking-setup/oms/09-algo-api-dma-sor" },
                { label: "10. Config Reference", slug: "finix-broking-setup/oms/10-oms-config-reference" },
                { label: "11. Operations Catalogue", slug: "finix-broking-setup/oms/11-operations-catalogue" },
                { label: "12. Order Path Edge Cases", slug: "finix-broking-setup/oms/12-order-path-edge-cases" },
              ],
            },
            {
              label: "RMS",
              collapsed: true,
              items: [
                { label: "Overview", slug: "finix-broking-setup/rms" },
                { label: "1. Architecture", slug: "finix-broking-setup/rms/01-rms-architecture" },
                { label: "2. Margin Engine", slug: "finix-broking-setup/rms/02-margin-engine" },
                { label: "3. Pre-Trade Check Ladder", slug: "finix-broking-setup/rms/03-pretrade-check-ladder" },
                { label: "4. Limit Framework", slug: "finix-broking-setup/rms/04-limit-framework" },
                { label: "5. Collateral & Pledge", slug: "finix-broking-setup/rms/05-collateral-pledge" },
                { label: "6. Square-Off Engine", slug: "finix-broking-setup/rms/06-squareoff-engine" },
                { label: "7. Intraday Surveillance", slug: "finix-broking-setup/rms/07-intraday-surveillance" },
                { label: "8. Margin Reporting & Penalties", slug: "finix-broking-setup/rms/08-margin-reporting-penalties" },
                { label: "9. Config Reference", slug: "finix-broking-setup/rms/09-rms-config-reference" },
                { label: "10. Limit Impact Matrix", slug: "finix-broking-setup/rms/10-limit-impact-matrix" },
                { label: "11. Operations Catalogue", slug: "finix-broking-setup/rms/11-operations-catalogue" },
              ],
            },
            {
              label: "Back Office",
              collapsed: true,
              items: [
                { label: "Overview", slug: "finix-broking-setup/backoffice" },
                { label: "1. Architecture", slug: "finix-broking-setup/backoffice/01-backoffice-architecture" },
                { label: "2. Trade Import & Reconciliation", slug: "finix-broking-setup/backoffice/02-trade-import-reconciliation" },
                { label: "3. Contract Notes", slug: "finix-broking-setup/backoffice/03-contract-notes" },
                { label: "4. Ledger & Accounting", slug: "finix-broking-setup/backoffice/04-ledger-accounting" },
                { label: "5. Settlement Obligations", slug: "finix-broking-setup/backoffice/05-settlement-obligations" },
                { label: "6. CUSPA & Unpaid Securities", slug: "finix-broking-setup/backoffice/06-cuspa-unpaid-securities" },
                { label: "7. Corporate Actions", slug: "finix-broking-setup/backoffice/07-corporate-actions" },
                { label: "8. Statements & Retention", slug: "finix-broking-setup/backoffice/08-statements-retention" },
                { label: "9. Regulatory Reporting", slug: "finix-broking-setup/backoffice/09-regulatory-reporting" },
                { label: "10. Config Reference", slug: "finix-broking-setup/backoffice/10-backoffice-config-reference" },
                { label: "11. Charges & Billing", slug: "finix-broking-setup/backoffice/11-charges-billing-engine" },
                { label: "12. Operations Catalogue", slug: "finix-broking-setup/backoffice/12-operations-catalogue" },
                { label: "13. Near-Real-Time Contract Notes", slug: "finix-broking-setup/backoffice/13-near-realtime-contract-notes" },
              ],
            },
            {
              label: "Money Movement",
              collapsed: true,
              items: [
                { label: "Overview", slug: "finix-broking-setup/money" },
                { label: "1. Payments Architecture", slug: "finix-broking-setup/money/01-payments-architecture" },
                { label: "2. Pay-In Rails", slug: "finix-broking-setup/money/02-payin-rails" },
                { label: "3. Pay-Out Engine", slug: "finix-broking-setup/money/03-payout-engine" },
                { label: "4. Bank Reconciliation", slug: "finix-broking-setup/money/04-bank-recon" },
                { label: "5. Treasury & Exchange Funding", slug: "finix-broking-setup/money/05-treasury-exchange-funding" },
                { label: "6. Upstreaming & Downstreaming", slug: "finix-broking-setup/money/06-upstreaming-downstreaming" },
                { label: "7. Money & Trade in Sync", slug: "finix-broking-setup/money/07-money-trade-sync" },
                { label: "8. Operations Catalogue", slug: "finix-broking-setup/money/08-money-operations-catalogue" },
                { label: "9. Real-Time Limit Updates", slug: "finix-broking-setup/money/09-realtime-limit-updates" },
              ],
            },
            {
              label: "Exchange Nuances",
              collapsed: true,
              items: [
                { label: "Overview", slug: "finix-broking-setup/exchanges" },
                { label: "1. NSE Cash", slug: "finix-broking-setup/exchanges/01-nse-cash" },
                { label: "2. NSE Derivatives", slug: "finix-broking-setup/exchanges/02-nse-fno" },
                { label: "3. BSE Cash & Derivatives", slug: "finix-broking-setup/exchanges/03-bse-cash-fno" },
                { label: "4. MCX Commodities", slug: "finix-broking-setup/exchanges/04-mcx-commodity" },
                { label: "5. Cross-Exchange Matrix", slug: "finix-broking-setup/exchanges/05-cross-exchange-matrix" },
                { label: "6. Sessions & Calendars", slug: "finix-broking-setup/exchanges/06-sessions-calendars" },
                { label: "7. Bands, Halts & Surveillance", slug: "finix-broking-setup/exchanges/07-bands-halts-surveillance" },
                { label: "8. File Formats & Downloads", slug: "finix-broking-setup/exchanges/08-file-formats-downloads" },
              ],
            },
            {
              label: "Daily Operations",
              collapsed: true,
              items: [
                { label: "Overview", slug: "finix-broking-setup/daily-ops" },
                { label: "1. BOD Runbook", slug: "finix-broking-setup/daily-ops/01-bod-runbook" },
                { label: "2. Pre-Open Operations", slug: "finix-broking-setup/daily-ops/02-pre-open-ops" },
                { label: "3. Continuous Session", slug: "finix-broking-setup/daily-ops/03-continuous-session-ops" },
                { label: "4. Close & Post-Close", slug: "finix-broking-setup/daily-ops/04-close-post-close-ops" },
                { label: "5. EOD Runbook", slug: "finix-broking-setup/daily-ops/05-eod-runbook" },
                { label: "6. Settlement Day", slug: "finix-broking-setup/daily-ops/06-settlement-day-ops" },
                { label: "7. Incident Playbooks", slug: "finix-broking-setup/daily-ops/07-incident-playbooks" },
                { label: "8. Expiry Operations", slug: "finix-broking-setup/daily-ops/08-expiry-ops" },
                { label: "9. Periodic Calendar", slug: "finix-broking-setup/daily-ops/09-periodic-calendar" },
                { label: "10. Master Trading-Day Checklist", slug: "finix-broking-setup/daily-ops/10-master-trading-day-checklist" },
              ],
            },
            {
              label: "Compliance at Config Level",
              collapsed: true,
              items: [
                { label: "Overview", slug: "finix-broking-setup/compliance" },
                { label: "1. Configuration Baseline", slug: "finix-broking-setup/compliance/01-compliance-config-baseline" },
                { label: "2. Reporting Pipeline", slug: "finix-broking-setup/compliance/02-reporting-pipeline" },
                { label: "3. Inspection Readiness", slug: "finix-broking-setup/compliance/03-inspection-readiness" },
                { label: "4. Cyber Resilience Config", slug: "finix-broking-setup/compliance/04-cyber-cscrf-config" },
                { label: "5. Audit Machinery", slug: "finix-broking-setup/compliance/05-audit-machinery" },
                { label: "6. Regulatory Change 2026", slug: "finix-broking-setup/compliance/06-regulatory-change-2026" },
              ],
            },
            {
              label: "Files & Data Interchange",
              collapsed: true,
              items: [
                { label: "Overview", slug: "finix-broking-setup/files" },
                { label: "1. File Register & Architecture", slug: "finix-broking-setup/files/01-file-register-architecture" },
                { label: "2. NSE & NSE Clearing Files", slug: "finix-broking-setup/files/02-nse-files" },
                { label: "3. BSE & ICCL Files", slug: "finix-broking-setup/files/03-bse-files" },
                { label: "4. MCX Files", slug: "finix-broking-setup/files/04-mcx-files" },
                { label: "5. Clearing Corporation Files", slug: "finix-broking-setup/files/05-clearing-corporation-files" },
                { label: "6. Depository Files", slug: "finix-broking-setup/files/06-depository-files" },
                { label: "7. Outbound Submissions", slug: "finix-broking-setup/files/07-outbound-submissions" },
                { label: "8. Handling Exceptions", slug: "finix-broking-setup/files/08-file-handling-exceptions" },
                { label: "9. Bank & Payment Files", slug: "finix-broking-setup/files/09-bank-payment-files" },
                { label: "10. Ingestion Cadence Map", slug: "finix-broking-setup/files/10-ingestion-cadence-map" },
                { label: "11. Depository Interfaces & APIs", slug: "finix-broking-setup/files/11-depository-interfaces-and-apis" },
              ],
            },
            {
              label: "Market Data",
              collapsed: true,
              items: [
                { label: "Overview", slug: "finix-broking-setup/marketdata" },
                { label: "1. Feed Catalogue", slug: "finix-broking-setup/marketdata/01-feed-catalogue" },
                { label: "2. Wire Formats & Packets", slug: "finix-broking-setup/marketdata/02-wire-format-and-packets" },
                { label: "3. Subscription Mechanics", slug: "finix-broking-setup/marketdata/03-subscription-mechanics" },
                { label: "4. Gap Recovery & Arbitration", slug: "finix-broking-setup/marketdata/04-gap-recovery-and-arbitration" },
                { label: "5. Normalisation & Distribution", slug: "finix-broking-setup/marketdata/05-normalisation-and-internal-distribution" },
                { label: "6. Fan-Out to Clients", slug: "finix-broking-setup/marketdata/06-fanout-to-clients" },
                { label: "7. Redistribution & Licensing", slug: "finix-broking-setup/marketdata/07-redistribution-and-licensing" },
                { label: "8. Content Data Layer", slug: "finix-broking-setup/marketdata/08-content-data-layer" },
                { label: "9. Config Reference", slug: "finix-broking-setup/marketdata/09-marketdata-config-reference" },
              ],
            },
            {
              label: "Monitoring & Data Sharing",
              collapsed: true,
              items: [
                { label: "Overview", slug: "finix-broking-setup/monitoring" },
                { label: "1. Obligation Map", slug: "finix-broking-setup/monitoring/01-monitoring-obligation-map" },
                { label: "2. Real-Time & Near-Real-Time", slug: "finix-broking-setup/monitoring/02-realtime-near-realtime" },
                { label: "3. Periodic Submissions", slug: "finix-broking-setup/monitoring/03-periodic-submissions" },
                { label: "4. Alerts & Response", slug: "finix-broking-setup/monitoring/04-alerts-received-and-response" },
                { label: "5. Incident & Breach Reporting", slug: "finix-broking-setup/monitoring/05-incident-breach-reporting" },
                { label: "6. AML Monitoring & Reporting", slug: "finix-broking-setup/monitoring/06-aml-monitoring-reporting" },
                { label: "7. System Monitoring to Exchange", slug: "finix-broking-setup/monitoring/07-system-monitoring-to-exchange" },
              ],
            },
            {
              label: "Product Operations",
              collapsed: true,
              items: [
                { label: "Overview", slug: "finix-broking-setup/products" },
                { label: "1. MTF Operations", slug: "finix-broking-setup/products/01-mtf-operations" },
                { label: "2. Pledge Lifecycle", slug: "finix-broking-setup/products/02-pledge-lifecycle" },
                { label: "3. F&O Contract Lifecycle", slug: "finix-broking-setup/products/03-fno-contract-lifecycle" },
                { label: "4. Expiry & Physical Settlement", slug: "finix-broking-setup/products/04-expiry-physical-settlement" },
                { label: "5. Commodity Delivery", slug: "finix-broking-setup/products/05-commodity-delivery-operations" },
                { label: "6. Currency & IRD", slug: "finix-broking-setup/products/06-currency-ird-operations" },
                { label: "7. SLBM Operations", slug: "finix-broking-setup/products/07-slbm-operations" },
                { label: "8. IPO, MF & Bonds", slug: "finix-broking-setup/products/08-ipo-mf-bonds-operations" },
                { label: "9. Product Enablement Matrix", slug: "finix-broking-setup/products/09-product-enablement-matrix" },
              ],
            },
            {
              label: "People & Accountability",
              collapsed: true,
              items: [
                { label: "Overview", slug: "finix-broking-setup/roles" },
                { label: "1. Role Register", slug: "finix-broking-setup/roles/01-role-register" },
                { label: "2. Trading-Day RACI", slug: "finix-broking-setup/roles/02-raci-trading-day" },
                { label: "3. Periodic & Compliance RACI", slug: "finix-broking-setup/roles/03-raci-periodic-compliance" },
                { label: "4. Segregation & Access", slug: "finix-broking-setup/roles/04-segregation-access-control" },
                { label: "5. Escalation & On-Call", slug: "finix-broking-setup/roles/05-escalation-oncall" },
              ],
            },
            {
              label: "Certification & Change Control",
              collapsed: true,
              items: [
                { label: "Overview", slug: "finix-broking-setup/certification" },
                { label: "1. Software Approval Regime", slug: "finix-broking-setup/certification/01-software-approval-regime" },
                { label: "2. Mobile & Web Submission", slug: "finix-broking-setup/certification/02-mobile-web-app-submission" },
                { label: "3. Terminal & User-ID Registration", slug: "finix-broking-setup/certification/03-ctcl-nnf-terminal-registration" },
                { label: "4. Change & Version Control", slug: "finix-broking-setup/certification/04-change-version-control" },
                { label: "5. Mock Trading & Drills", slug: "finix-broking-setup/certification/05-mock-trading-and-drills" },
              ],
            },
          ],
        },
        {
          label: "Deep Dives",
          items: [
            { label: "Overview", slug: "deep-dives" },
            {
              label: "Trading-day",
              collapsed: true,
              items: [
                { label: "OMS Internals", slug: "deep-dives/trading-day/oms-internals" },
                { label: "RMS / SPAN Methodology", slug: "deep-dives/trading-day/rms-span-methodology" },
                { label: "Surveillance (NORMS/GSM/ASM)", slug: "deep-dives/trading-day/surveillance-norms-gsm-asm" },
                { label: "Short-Delivery Auction", slug: "deep-dives/trading-day/short-delivery-auction" },
                { label: "Block & Bulk Deals", slug: "deep-dives/trading-day/block-bulk-deals" },
                { label: "Retail Algo Framework", slug: "deep-dives/trading-day/retail-algo-framework" },
              ],
            },
            {
              label: "Settlement",
              collapsed: true,
              items: [
                { label: "T+0 / T+1 Settlement", slug: "deep-dives/settlement/t0-t1-settlement" },
                { label: "Direct Payout to Demat", slug: "deep-dives/settlement/direct-payout-to-demat" },
                { label: "Client Funds Upstreaming", slug: "deep-dives/settlement/client-funds-upstreaming" },
                { label: "Payin Default + Core SGF", slug: "deep-dives/settlement/payin-default-core-sgf" },
                { label: "SLBM", slug: "deep-dives/settlement/slbm" },
                { label: "MTF Operational", slug: "deep-dives/settlement/mtf-operational" },
              ],
            },
            {
              label: "Compliance & Audit",
              collapsed: true,
              items: [
                { label: "SCORES Procedure", slug: "deep-dives/compliance-audit/scores-procedure" },
                { label: "IGRC", slug: "deep-dives/compliance-audit/igrc" },
                { label: "ODR (Smart ODR)", slug: "deep-dives/compliance-audit/odr" },
                { label: "Concurrent Audit", slug: "deep-dives/compliance-audit/concurrent-audit" },
                { label: "System Audit", slug: "deep-dives/compliance-audit/system-audit" },
                { label: "CSCRF Deep-Dive", slug: "deep-dives/compliance-audit/cscrf-deep-dive" },
                { label: "Inspection Types", slug: "deep-dives/compliance-audit/inspection-types" },
                { label: "AP Framework", slug: "deep-dives/compliance-audit/ap-framework" },
              ],
            },
            {
              label: "Specialty",
              collapsed: true,
              items: [
                { label: "IPO / OFS Broker-Side", slug: "deep-dives/specialty/ipo-ofs-broker-side" },
                { label: "Mutual Fund Platforms", slug: "deep-dives/specialty/mutual-fund-platforms" },
                { label: "DLT Framework", slug: "deep-dives/specialty/dlt-framework" },
                { label: "BCP / DR Drill", slug: "deep-dives/specialty/bcp-dr-drill" },
              ],
            },
            {
              label: "Member Compliance",
              collapsed: true,
              items: [
                { label: "BMC / ABC", slug: "deep-dives/member-compliance/bmc-abc" },
                { label: "Fit-and-Proper", slug: "deep-dives/member-compliance/fit-and-proper" },
                { label: "KMP Changes", slug: "deep-dives/member-compliance/kmp-changes" },
                { label: "Membership Renewal", slug: "deep-dives/member-compliance/membership-renewal" },
                { label: "ECN & Investor Servicing", slug: "deep-dives/member-compliance/ecn-investor-servicing" },
              ],
            },
            {
              label: "Foundational",
              collapsed: true,
              items: [
                { label: "SGF / Core SGF", slug: "deep-dives/foundational/sgf-core-sgf" },
                { label: "IPF", slug: "deep-dives/foundational/ipf" },
                { label: "Market Manipulation Typologies", slug: "deep-dives/foundational/market-manipulation-typologies" },
                { label: "Pre-Open / Closing Auction", slug: "deep-dives/foundational/pre-open-closing-auction" },
                { label: "Segment Rules Comparison", slug: "deep-dives/foundational/segment-rules-comparison" },
                { label: "Member Default Recovery", slug: "deep-dives/foundational/member-default-recovery" },
              ],
            },
          ],
        },
        {
          label: "Vendor Integrations",
          items: [
            { label: "Vendor Atlas — All Products", slug: "vendors/atlas" },
            { label: "Vendor Strategy", slug: "vendors" },
            {
              label: "Identity",
              items: [
                { label: "DigiLocker", slug: "vendors/identity/digilocker" },
                { label: "CKYC", slug: "vendors/identity/ckyc" },
              ],
            },
            {
              label: "Verification",
              items: [
                { label: "Decentro", slug: "vendors/verification/decentro" },
                {
                  label: "HyperVerge",
                  slug: "vendors/verification/hyperverge",
                },
              ],
            },
            { label: "KRA", slug: "vendors/kra" },
            {
              label: "eSign",
              items: [{ label: "Leegality", slug: "vendors/esign/leegality" }],
            },
            {
              label: "Fraud & AML",
              items: [{ label: "TrackWizz", slug: "vendors/fraud/trackwizz" }],
            },
            {
              label: "Exchanges",
              items: [
                { label: "NSE", slug: "vendors/exchanges/nse" },
                { label: "BSE", slug: "vendors/exchanges/bse" },
                { label: "MCX", slug: "vendors/exchanges/mcx" },
              ],
            },
            {
              label: "Depositories",
              items: [
                {
                  label: "CDSL",
                  items: [
                    { label: "Overview", slug: "vendors/depositories/cdsl" },
                    {
                      label: "DDPI Deep Dive",
                      slug: "vendors/depositories/cdsl-ddpi",
                    },
                    {
                      label: "MTF & Pledge",
                      slug: "vendors/depositories/cdsl-mtf-pledge",
                    },
                    {
                      label: "Modifications",
                      slug: "vendors/depositories/cdsl-modifications",
                    },
                    {
                      label: "Integration Guide",
                      slug: "vendors/depositories/cdsl-integration-guide",
                    },
                  ],
                },
                { label: "NSDL", slug: "vendors/depositories/nsdl" },
              ],
            },
            { label: "Setu Deep Dive", slug: "vendors/setu-deep-dive" },
            { label: "Account Aggregator", slug: "vendors/account-aggregator" },
            { label: "Payment Mandates", slug: "vendors/payment-mandates" },
          ],
        },
        {
          label: "Operations",
          items: [
            { label: "Compliance Blueprint", slug: "operations/compliance-blueprint" },
            {
              label: "Integration DAG",
              collapsed: true,
              items: [
                { label: "Overview", slug: "operations/integration-dag" },
                { label: "Onboarding", slug: "operations/integration-dag/onboarding" },
                { label: "BOD", slug: "operations/integration-dag/bod" },
                { label: "Trading Hours", slug: "operations/integration-dag/trading-hours" },
                { label: "EOD & Settlement", slug: "operations/integration-dag/eod-settlement" },
                { label: "Recurring Cycles", slug: "operations/integration-dag/recurring-cycles" },
                { label: "Lifecycle Events", slug: "operations/integration-dag/lifecycle-events" },
              ],
            },
            { label: "Batch Pipeline", slug: "operations/batch-pipeline" },
            {
              label: "Exchange Registration",
              slug: "operations/exchange-registration",
            },
            {
              label: "6-Attribute Matching",
              slug: "operations/six-attribute-matching",
            },
            { label: "Admin Workflow", slug: "operations/admin-workflow" },
            { label: "Status Machine", slug: "operations/status-machine" },
            { label: "Error Handling", slug: "operations/error-handling" },
            {
              label: "Audit & Compliance",
              slug: "operations/audit-compliance",
            },
          ],
        },
        {
          label: "Reference",
          items: [
            { label: "Glossary", slug: "reference/glossary" },
            { label: "Master Dataset", slug: "reference/master-dataset" },
            { label: "Field Summary", slug: "reference/field-summary" },
            { label: "Code Tables", slug: "reference/code-tables" },
            {
              label: "Regulatory Circulars",
              slug: "reference/regulatory-circulars",
            },
            {
              label: "Circulars Changelog",
              slug: "reference/circulars-changelog",
            },
            {
              label: "Circulars by Issuer",
              collapsed: true,
              items: [
                { label: "SEBI-MIRSD", slug: "reference/circulars/sebi-mirsd" },
                { label: "SEBI (MRD/IMD/OIAE)", slug: "reference/circulars/sebi-other" },
                { label: "RBI", slug: "reference/circulars/rbi" },
                { label: "NPCI", slug: "reference/circulars/npci" },
                { label: "CERSAI / CKYC", slug: "reference/circulars/cersai" },
                { label: "MeitY / CCA", slug: "reference/circulars/meity" },
                { label: "FIU-IND", slug: "reference/circulars/fiu-ind" },
                { label: "CDSL", slug: "reference/circulars/cdsl" },
                { label: "NSDL", slug: "reference/circulars/nsdl" },
                { label: "NSE", slug: "reference/circulars/nse" },
                { label: "BSE", slug: "reference/circulars/bse" },
                { label: "MCX", slug: "reference/circulars/mcx" },
                { label: "Clearing Corps", slug: "reference/circulars/clearing-corps" },
              ],
            },
            {
              label: "Field Atlas",
              collapsed: true,
              items: [
                { label: "Overview", slug: "reference/field-atlas" },
                {
                  label: "By Section",
                  collapsed: true,
                  items: [
                    { label: "A — Personal Identity", slug: "reference/field-atlas/sections/a-personal-identity" },
                    { label: "B — Address Details", slug: "reference/field-atlas/sections/b-address-details" },
                    { label: "C — Contact Details", slug: "reference/field-atlas/sections/c-contact-details" },
                    { label: "D — Identity Documents", slug: "reference/field-atlas/sections/d-identity-documents" },
                    { label: "E — Address Documents", slug: "reference/field-atlas/sections/e-address-documents" },
                    { label: "F — Financial Profile", slug: "reference/field-atlas/sections/f-financial-profile" },
                    { label: "G — Bank Account", slug: "reference/field-atlas/sections/g-bank-account" },
                    { label: "H — Demat Account", slug: "reference/field-atlas/sections/h-demat-account" },
                    { label: "I — Nomination", slug: "reference/field-atlas/sections/i-nomination" },
                    { label: "J — FATCA/CRS", slug: "reference/field-atlas/sections/j-fatca-crs" },
                    { label: "K — PEP/AML", slug: "reference/field-atlas/sections/k-pep-aml" },
                    { label: "L — Trading Preferences", slug: "reference/field-atlas/sections/l-trading-preferences" },
                    { label: "M — Risk Profiling", slug: "reference/field-atlas/sections/m-risk-profiling" },
                    { label: "N — IPV / VIPV", slug: "reference/field-atlas/sections/n-ipv-vipv" },
                    { label: "O — DDPI", slug: "reference/field-atlas/sections/o-ddpi" },
                    { label: "P — Consent & Declarations", slug: "reference/field-atlas/sections/p-consent-declarations" },
                    { label: "R — Third-Party Verification", slug: "reference/field-atlas/sections/r-third-party-verification" },
                    { label: "S — KRA Submission", slug: "reference/field-atlas/sections/s-kra-submission" },
                    { label: "T — CKYC Submission", slug: "reference/field-atlas/sections/t-ckyc-submission" },
                    { label: "U — Exchange Registration", slug: "reference/field-atlas/sections/u-exchange-registration" },
                    { label: "V — NRI-Specific", slug: "reference/field-atlas/sections/v-nri-specific" },
                    { label: "W — Minor / Joint", slug: "reference/field-atlas/sections/w-minor-joint" },
                    { label: "X — Margin Pledge", slug: "reference/field-atlas/sections/x-margin-pledge" },
                    { label: "Y — Account Lifecycle", slug: "reference/field-atlas/sections/y-account-lifecycle" },
                    { label: "Z — Audit Trail", slug: "reference/field-atlas/sections/z-audit-trail" },
                    { label: "AA — DPDP Consent", slug: "reference/field-atlas/sections/aa-dpdp-consent" },
                    { label: "AB — Communication Prefs", slug: "reference/field-atlas/sections/ab-communication-preferences" },
                    { label: "AC — Running Account Settlement", slug: "reference/field-atlas/sections/ac-running-account-settlement" },
                  ],
                },
                {
                  label: "Computed / Derived",
                  collapsed: true,
                  items: [
                    { label: "Trade", slug: "reference/field-atlas/sections/computed-trade" },
                    { label: "Margin", slug: "reference/field-atlas/sections/computed-margin" },
                    { label: "Peak Margin", slug: "reference/field-atlas/sections/computed-peak-margin" },
                    { label: "DMF", slug: "reference/field-atlas/sections/computed-dmf" },
                    { label: "CFR", slug: "reference/field-atlas/sections/computed-cfr" },
                    { label: "ECN Meta", slug: "reference/field-atlas/sections/computed-ecn-meta" },
                    { label: "ECN Tax", slug: "reference/field-atlas/sections/computed-ecn-tax" },
                    { label: "Settlement", slug: "reference/field-atlas/sections/computed-settlement" },
                    { label: "Reporting", slug: "reference/field-atlas/sections/computed-reporting" },
                    { label: "Surveillance", slug: "reference/field-atlas/sections/computed-surveillance" },
                  ],
                },
                {
                  label: "By Destination",
                  collapsed: true,
                  items: [
                    { label: "KRA", slug: "reference/field-atlas/destinations/kra" },
                    { label: "CKYC", slug: "reference/field-atlas/destinations/ckyc" },
                    { label: "NSE UCC", slug: "reference/field-atlas/destinations/nse-ucc" },
                    { label: "BSE UCC", slug: "reference/field-atlas/destinations/bse-ucc" },
                    { label: "MCX UCC", slug: "reference/field-atlas/destinations/mcx-ucc" },
                    { label: "CDSL BO", slug: "reference/field-atlas/destinations/cdsl-bo" },
                    { label: "NSDL BO", slug: "reference/field-atlas/destinations/nsdl-bo" },
                    { label: "Back-office", slug: "reference/field-atlas/destinations/back-office" },
                    { label: "RMS", slug: "reference/field-atlas/destinations/rms" },
                    { label: "Contract Notes", slug: "reference/field-atlas/destinations/contract-notes" },
                    { label: "Regulatory Reports", slug: "reference/field-atlas/destinations/regulatory-reports" },
                    { label: "DLT Comms", slug: "reference/field-atlas/destinations/dlt-comms" },
                    { label: "FATCA / CRS", slug: "reference/field-atlas/destinations/fatca-crs" },
                    { label: "AML / FIU-IND", slug: "reference/field-atlas/destinations/aml-fiu" },
                  ],
                },
              ],
            },
            { label: "Cost Analysis", slug: "reference/cost-analysis" },
            { label: "Diagrams", slug: "reference/diagrams" },
            {
              label: "References & Sources",
              slug: "reference/references-sources",
            },
          ],
        },
        {
          label: "Appendix",
          collapsed: true,
          items: [
            {
              label: "Non-Individual Entities",
              slug: "appendix/non-individual-entities",
            },
            { label: "NRI Deep Dive", slug: "appendix/nri-deep-dive" },
            {
              label: "Minor & Joint Accounts",
              slug: "appendix/minor-joint-accounts",
            },
            { label: "Vendor Roadmap", slug: "appendix/vendor-roadmap" },
            { label: "Communications", slug: "appendix/communications" },
            { label: "Back-Office & RMS", slug: "appendix/back-office-rms" },
            { label: "CDSL Extended", slug: "appendix/cdsl-extended" },
            {
              label: "DigiLocker Extended",
              slug: "appendix/digilocker-extended",
            },
          ],
        },
      ],
    }),
  ],
});

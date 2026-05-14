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
          label: "Broker Process",
          items: [
            { label: "End-to-End Narrative", slug: "broker-process/narrative" },
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

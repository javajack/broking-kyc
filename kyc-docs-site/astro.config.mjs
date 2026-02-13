// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
	site: 'https://javajack.github.io',
	base: '/broking-kyc',
	integrations: [
		starlight({
			title: 'KYC Onboarding Spec',
			description: 'Complete technical specification for individual customer KYC onboarding in an Indian stock broking firm. By Rakesh Waghela.',
			social: [
				{ icon: 'x.com', label: 'Rakesh on X', href: 'https://x.com/webiyo' },
				{ icon: 'linkedin', label: 'Rakesh on LinkedIn', href: 'https://www.linkedin.com/in/rakeshwaghela' },
				{ icon: 'external', label: 'Book a Consultation', href: 'https://topmate.io/rakeshwaghela' },
			],
			components: {
				Footer: './src/components/overrides/Footer.astro',
				SiteTitle: './src/components/overrides/SiteTitle.astro',
			},
			head: [
				{ tag: 'meta', attrs: { property: 'og:image', content: 'https://javajack.github.io/broking-kyc/og-image.png' } },
				{ tag: 'meta', attrs: { property: 'og:image:width', content: '1200' } },
				{ tag: 'meta', attrs: { property: 'og:image:height', content: '630' } },
				{ tag: 'meta', attrs: { name: 'twitter:image', content: 'https://javajack.github.io/broking-kyc/og-image.png' } },
				// Cloudflare Web Analytics
				{ tag: 'script', attrs: { defer: true, src: 'https://static.cloudflareinsights.com/beacon.min.js', 'data-cf-beacon': '{"token": "7ce325bb227e4b42a8406f369ff4e788"}' } },
				{
					tag: 'script',
					attrs: { type: 'application/ld+json' },
					content: JSON.stringify({
						'@context': 'https://schema.org',
						'@graph': [
							{
								'@type': 'WebSite',
								name: 'KYC Onboarding Specification',
								url: 'https://javajack.github.io/broking-kyc/',
								description: 'Complete technical specification for individual customer KYC onboarding in an Indian stock broking firm.',
								author: { '@id': '#rakesh' },
							},
							{
								'@type': 'Person',
								'@id': '#rakesh',
								name: 'Rakesh Waghela',
								url: 'https://www.linkedin.com/in/rakeshwaghela',
								jobTitle: 'Tech & KYC Solutions Architect',
								sameAs: [
									'https://x.com/webiyo',
									'https://www.linkedin.com/in/rakeshwaghela',
									'https://topmate.io/rakeshwaghela',
								],
							},
						],
					}),
				},
			],
			customCss: ['./src/styles/custom.css'],
			sidebar: [
				{
					label: 'Getting Started',
					items: [
						{ label: 'Overview', slug: '' },
					],
				},
				{
					label: 'Architecture',
					items: [
						{ label: 'Design Principles', slug: 'architecture/design-principles' },
						{ label: 'Flow Summary', slug: 'architecture/flow-summary' },
						{ label: 'Data Source Mapping', slug: 'architecture/data-source-mapping' },
						{ label: 'Security & Compliance', slug: 'architecture/security-compliance' },
					],
				},
				{
					label: 'User Journey',
					items: [
						{ label: 'Journey Overview', slug: 'journey' },
						{ label: '1. Mobile Registration', slug: 'journey/01-mobile-registration' },
						{ label: '2. PAN + DOB', slug: 'journey/02-pan-dob' },
						{ label: '3. DigiLocker Consent', slug: 'journey/03-digilocker-consent' },
						{ label: '4. Confirm Identity', slug: 'journey/04-confirm-identity' },
						{ label: '5. Bank Account', slug: 'journey/05-bank-account' },
						{ label: '6. Trading Preferences', slug: 'journey/06-trading-preferences' },
						{ label: '7. Nominations', slug: 'journey/07-nominations' },
						{ label: '8. Declarations Gate', slug: 'journey/08-declarations-gate' },
						{ label: '9. Review + eSign', slug: 'journey/09-review-esign' },
					],
				},
				{
					label: 'Vendor Integrations',
					items: [
						{ label: 'Vendor Strategy', slug: 'vendors' },
						{
							label: 'Identity',
							items: [
								{ label: 'DigiLocker', slug: 'vendors/identity/digilocker' },
								{ label: 'CKYC', slug: 'vendors/identity/ckyc' },
							],
						},
						{
							label: 'Verification',
							items: [
								{ label: 'Decentro', slug: 'vendors/verification/decentro' },
								{ label: 'HyperVerge', slug: 'vendors/verification/hyperverge' },
							],
						},
						{ label: 'KRA', slug: 'vendors/kra' },
						{
							label: 'eSign',
							items: [
								{ label: 'Leegality', slug: 'vendors/esign/leegality' },
							],
						},
						{
							label: 'Fraud & AML',
							items: [
								{ label: 'TrackWizz', slug: 'vendors/fraud/trackwizz' },
							],
						},
						{
							label: 'Exchanges',
							items: [
								{ label: 'NSE', slug: 'vendors/exchanges/nse' },
								{ label: 'BSE', slug: 'vendors/exchanges/bse' },
								{ label: 'MCX', slug: 'vendors/exchanges/mcx' },
							],
						},
						{
							label: 'Depositories',
							items: [
								{
							label: 'CDSL',
							items: [
								{ label: 'Overview', slug: 'vendors/depositories/cdsl' },
								{ label: 'DDPI Deep Dive', slug: 'vendors/depositories/cdsl-ddpi' },
								{ label: 'MTF & Pledge', slug: 'vendors/depositories/cdsl-mtf-pledge' },
								{ label: 'Modifications', slug: 'vendors/depositories/cdsl-modifications' },
								{ label: 'Integration Guide', slug: 'vendors/depositories/cdsl-integration-guide' },
							],
						},
								{ label: 'NSDL', slug: 'vendors/depositories/nsdl' },
							],
						},
						{ label: 'Setu Deep Dive', slug: 'vendors/setu-deep-dive' },
						{ label: 'Account Aggregator', slug: 'vendors/account-aggregator' },
						{ label: 'Payment Mandates', slug: 'vendors/payment-mandates' },
					],
				},
				{
					label: 'Operations',
					items: [
						{ label: 'Batch Pipeline', slug: 'operations/batch-pipeline' },
						{ label: 'Exchange Registration', slug: 'operations/exchange-registration' },
						{ label: '6-Attribute Matching', slug: 'operations/six-attribute-matching' },
						{ label: 'Admin Workflow', slug: 'operations/admin-workflow' },
						{ label: 'Status Machine', slug: 'operations/status-machine' },
						{ label: 'Error Handling', slug: 'operations/error-handling' },
						{ label: 'Audit & Compliance', slug: 'operations/audit-compliance' },
					],
				},
				{
					label: 'Reference',
					items: [
						{ label: 'Master Dataset', slug: 'reference/master-dataset' },
						{ label: 'Field Summary', slug: 'reference/field-summary' },
						{ label: 'Code Tables', slug: 'reference/code-tables' },
						{ label: 'Regulatory Circulars', slug: 'reference/regulatory-circulars' },
						{ label: 'Cost Analysis', slug: 'reference/cost-analysis' },
						{ label: 'Diagrams', slug: 'reference/diagrams' },
					],
				},
				{
					label: 'Appendix',
					collapsed: true,
					items: [
						{ label: 'Non-Individual Entities', slug: 'appendix/non-individual-entities' },
						{ label: 'NRI Deep Dive', slug: 'appendix/nri-deep-dive' },
						{ label: 'Minor & Joint Accounts', slug: 'appendix/minor-joint-accounts' },
						{ label: 'Vendor Roadmap', slug: 'appendix/vendor-roadmap' },
						{ label: 'Communications', slug: 'appendix/communications' },
						{ label: 'Back-Office & RMS', slug: 'appendix/back-office-rms' },
						{ label: 'CDSL Extended', slug: 'appendix/cdsl-extended' },
						{ label: 'DigiLocker Extended', slug: 'appendix/digilocker-extended' },
					],
				},
			],
		}),
	],
});

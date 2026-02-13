// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
	site: 'https://javajack.github.io',
	base: '/broking-kyc',
	integrations: [
		starlight({
			title: 'KYC Onboarding Spec',
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
								{ label: 'CDSL', slug: 'vendors/depositories/cdsl' },
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

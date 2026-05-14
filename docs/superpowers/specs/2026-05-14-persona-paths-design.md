# Persona Paths + Tone Pass — Design

**Date:** 2026-05-14
**Sub-project:** #9 of the broking-ops expansion (post-arc continuation)
**Status:** Design — pending user review

## Context

Eight sub-projects shipped (~250K words across 178 pages). The corpus is comprehensive and verifiable. The reader experience, though, is not yet curated — landing cold on the site, a reader has 178 pages with no editorial guidance on what to read in what order for their role. Cross-links are dense (~13 per page) but flat; tone is uniformly third-person neutral; no persona framing exists.

This sub-project closes that gap.

## Goal

Add a **persona layer** that bridges the sidebar's structural organization and the dense content underneath. Twelve persona landing pages + a "choose your role" index + a tone pass on existing section landing pages + a homepage rewrite. Result: any reader can find their on-ramp in one click.

## Output

### New pages

- `kyc-docs-site/src/content/docs/personas/index.md` — "Choose your role" with persona cards.
- `kyc-docs-site/src/content/docs/personas/product-manager.md`
- `kyc-docs-site/src/content/docs/personas/backend-engineer.md`
- `kyc-docs-site/src/content/docs/personas/frontend-ux-engineer.md`
- `kyc-docs-site/src/content/docs/personas/operations-lead.md`
- `kyc-docs-site/src/content/docs/personas/oms-rms-head.md`
- `kyc-docs-site/src/content/docs/personas/compliance-officer.md`
- `kyc-docs-site/src/content/docs/personas/finance-cfo.md`
- `kyc-docs-site/src/content/docs/personas/internal-auditor.md`
- `kyc-docs-site/src/content/docs/personas/statutory-auditor.md`
- `kyc-docs-site/src/content/docs/personas/trainee.md`
- `kyc-docs-site/src/content/docs/personas/regulator-inspector.md`
- `kyc-docs-site/src/content/docs/personas/vendor-partner.md`

13 new pages total.

### Existing pages to update (tone pass)

- `index.mdx` — homepage rewrite with persona-selector callout.
- `journey/index.md` — friendlier intro.
- `operations/integration-dag.md` — friendlier intro.
- `lifecycle/index.md` — friendlier intro.
- `deep-dives/index.md` — friendlier intro.
- `vendors/index.md` — friendlier intro.
- `reference/regulatory-circulars.md` — friendlier intro (long-form readers).
- `reference/field-atlas.md` — friendlier intro.
- `broker-process/narrative.mdx` — light touch only (already has voice).
- `operations/audit-compliance.md` — friendlier intro.
- `operations/compliance-blueprint.md` — friendlier intro.
- `appendix/` overview note — if landing exists.

12 landing-page edits (light tone touches; preserving content).

### Sidebar update

New "Choose Your Role" top-level group at the very top of the sidebar (above Getting Started) containing the persona index + 12 persona pages.

## Per-persona page structure

Each persona page is **600–1,200 words**, second-person voice ("you"), conversational but professional. Structure:

1. **Title + frontmatter** — `Persona: <Role>` with a one-sentence description.
2. **Opening hook** — 2–3 sentences in second person, framing the role's day-to-day concerns. Example: "You arrive at 06:00 IST because BOD scripts started at 05:30 and your phone has already pinged twice about the SPAN scanrange file taking longer than usual. The rest of your day is reconciliation, regulator-watching, and one technical glitch you'll have to write up by 18:00."
3. **What you'll find useful here** — short paragraph mapping the persona's typical concerns to existing pages.
4. **Suggested reading path (5–10 pages)** — numbered list with rationale per step. Example:
   - "**1. [Compliance Blueprint](/broking-kyc/operations/compliance-blueprint/)** — the master inventory of every obligation. Skim the domain headers; you'll come back to specific rows.
   - **2. [Broker Process Narrative](/broking-kyc/broker-process/narrative/)** — Section 5 (Recurring Cycles) is your reading list for the next six months..."
5. **Common questions in your role** — Q&A format, each pointing to the relevant page. Example: "Where do I find peak-margin shortfall penalties? → [Trading Hours DAG → DMF Reconciliation](...)".
6. **What to skip (and why)** — sets expectations; respects reader's time.
7. **Verified through stamp** + AI disclaimer.

## Tone-pass guidelines for landing pages

For each section landing page:
- **Keep** the structural information (what's in the section, page index).
- **Replace** the `> Why this page is structured this way:` callout with a conversational opening that hooks the persona.
- **Add** a "Who reads this section?" line near the top.
- **Add** "Suggested next read" inline near the top, not just at the bottom.
- **Keep** the existing Practical notes, Cross-references, AI disclaimer.
- **Preserve** all existing cross-links and content depth.

**Voice baseline (for both new persona pages and tone pass):**
- Second person "you" where it fits naturally.
- Active verbs.
- Occasional dry humor at moments operators would recognize ("the meeting that nobody scheduled but everyone attends," "the file that should have arrived by 07:00").
- No exclamation points. No "amazing", "powerful", "robust" marketing words.
- Cite circulars exactly as the rest of the site does — verifiability stays.
- Direct address but never condescending.

## Homepage rewrite

The current `index.mdx` is structural. The new version:

1. **Title** unchanged.
2. **One-paragraph hook** — what this site is and what makes it different (verifiable, comprehensive, AI-generated synthesis with disclaimer).
3. **"Who reads this?"** — persona-selector card grid linking to the 12 persona pages.
4. **What's here, briefly** — three-column scan of major sections (breadth: circulars / atlas / blueprint; depth: DAG / narrative / lifecycle / deep-dives; reference: field atlas / regulatory).
5. **AI disclaimer block** (existing).
6. **Author block** (existing).

Keep all existing analytics, schema.org, and meta tags. Don't break sidebar navigation.

## Workflow

**Inline synthesis.** No research agents. Same shape as sub-projects #5 and #6. All content drawn from existing project context (compliance blueprint, integration DAG, broker-process narrative, lifecycle, deep-dives, atlas, circulars, journey, master-dataset).

## Documentation conventions

- Source traceability preserved (every claim still ties to existing content's citations).
- Conversational voice in persona pages and section landings only — deep-dive pages, reference tables, and Compliance Blueprint rows stay in their current technical register.
- Persona pages are presentation, not new content — they curate paths through existing material.

## Risks

- **Voice drift across 13 persona pages** — second-person "you" is harder to keep consistent than third-person. Mitigation: page template + tone guidelines + re-read previous persona page before drafting next.
- **Persona overlap** — Product Manager and Operations Lead share many concerns. Mitigation: each persona page has a distinct "what you'll find here" and a distinct reading path; some overlap is fine.
- **Homepage rewrite risk** — current homepage has SEO / analytics integrations baked in. Mitigation: preserve all `<head>` blocks; only change the body content.
- **Tone-pass scope creep** — easy to want to rewrite every page in the site. Mitigation: explicit scope (12 landing pages only); deep-dive pages stay technical.

## Out of scope

- Rewriting deep-dive, reference, or per-vendor pages.
- New regulatory content (this is a presentation layer).
- A11y/i18n work beyond what Astro already does.
- Replacing existing cross-link networks (they stay; persona pages add an overlay).

## Success criteria

- 13 new persona pages.
- 12 existing landing pages updated with friendlier openings + persona callouts.
- Homepage rewritten with persona-selector while preserving SEO/analytics.
- New "Choose Your Role" sidebar group at top.
- Astro build clean.
- Cross-link validator: 0 broken anchors / 0 broken pages.
- Memory entry created.

## Workflow summary

1. Commit this spec.
2. Invoke writing-plans for the implementation plan.
3. Execute inline — homepage + index, then 12 persona pages one-per-task, then tone pass on 12 landing pages, then sidebar + memory + link validation.

## Next step

After user approval: invoke writing-plans.

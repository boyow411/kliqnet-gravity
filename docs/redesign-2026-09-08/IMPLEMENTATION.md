# Kliqnet Digital — website redesign

Implemented 8 September 2026 in the canonical `kliqnet-gravity` repository. Production baseline: `722cdfaf0663dacab1f834b962195df06bc6db7d`.

## What changed

The agency now leads with actual project work, a concise service offer and Francis Makanju’s operator perspective. The visual identity retains the dark palette and blue accent, with clearer typography, larger project imagery, a contrasting founder section and a consistent enquiry path. The owner’s confirmed 50+ delivered projects is the only aggregate track-record claim used.

The portfolio contains 17 curated case studies: CineKliq, Signoff360, ESQ, KliqPOS, ROTDULE, Safehands Nursing Care, Skeduda, Wazobia Old Kent Road, KliqCare, PayTrack, Tracct, Veediogram, Mailvara, CueReq, Monika Restaurant, AIDesk and Veralley. Six lead the home page. Live, pilot, development and delivered stages are explicit. Owned products and business websites can be filtered separately, with four useful sectors and search.

Every case study explains the challenge, Kliqnet’s contribution, the user journey, a design decision, delivered scope and current availability. Current public project screens replace older imagery for the flagship work. CineKliq includes authentic application captures already used in its public showcase, with demonstration/staging context in captions. No client quotation, commercial uplift, compliance guarantee or customer-count claim has been invented.

Eight service destinations now explain a scoped engagement without unsupported speed, revenue, native-app or integration claims. Three new studio notes draw directly from project work. Old `/work` and superseded article links permanently redirect to current content.

## Enquiries and operations

The contact and strategy-call journeys use one accessible form. Required message validation matches the API. Errors preserve input; a successful save returns a reference. Submissions use an idempotency key, origin validation, a honeypot and database-backed rate limits. The reference confirms storage in the administrator’s submissions inbox, not delivery of an email or a confirmed appointment. No external email was sent during testing.

Calls currently use an honest call-request journey. `STRATEGY_CALL_URL` can optionally connect a valid Cal.com or Calendly destination. Hosting currently has no scheduling or mail provider configured. The form does not claim that an automated confirmation email was sent.

Projects and studio notes now render from the same database records edited in admin. Project editing retains the complete story and supports stage, relationship, captions, display order, homepage selection, drafts and reversible unpublishing. A private saved-record preview is available. Image uploads are validated, decoded and re-encoded as WebP, then stored durably in the database, with immutable media URLs. The previous temporary filesystem upload path is retired.

An admin performance page shows daily aggregate page views, enquiry starts and completion events. It does not store visitor profiles, cookies, query strings or entered form text. Totals are event counts, not unique visitors, delivery receipts or sales. Technical anti-abuse hashes are removed opportunistically after 24 hours.

## Search, accessibility and maintenance

Added canonical URLs, dynamic sitemap, robots rules, organisation/article/project structured data, a branded share image, genuine missing-project 404s and recoverable page errors. Public navigation has an accessible mobile toggle, Escape dismissal and a skip link. The image viewer uses a native modal dialog and restores keyboard focus. Motion respects reduced-motion settings.

Next.js and vulnerable transitive production dependencies were updated. Production dependency audit reports zero vulnerabilities. Four moderate development-only advisories remain in the legacy drizzle-kit/esbuild-kit dependency chain; no forced breaking downgrade was applied. Lint has no errors; existing unrelated warnings remain.

The code seed arrays are intentional release inputs, not runtime fallback catalogues. The obsolete static portfolio and legacy case-study sources were removed. The prior editorial records were backed up before changes. Do not rerun `publish-portfolio.ts --apply` after editorial updates unless intentionally replacing them with the seed content. New entries and ongoing changes should use the admin editor.

## Verification

- TypeScript, production build and existing security regression checks.
- Content tests cover unique slugs, complete image captions, existing local assets, HTTPS destinations, safe local image paths, draft defaults, preserved story requirements and required enquiry data.
- API tests cover invalid origin, missing message, invalid email, honeypot, successful storage, identical reference on retry, denial of unauthenticated admin access and rejection of query-string data in analytics.
- Browser checks cover desktop and mobile layout, filters, empty-search recovery, image dialog/focus restoration, mobile navigation, contextual enquiry text and a successful form submission.
- Route sweep covers all public pages, redirects, a true missing-project 404, sitemap, robots and the share image.
- Public destinations for all selected projects were inspected. This is evidence of their public presentation, not an operational certification of every linked product or provider.

The private editor’s authenticated browser session has not been exercised: the existing owner account was preserved and its password was not changed. API access guards and complete case-study schemas were checked separately. The website’s enquiry inbox contains no real submissions from this implementation; clearly marked QA rows are removed after verification.

## Release preparation

Vercel project: `prj_GZPObbEW8ASa3l7D3r33ieVrKU9d`, team `team_Hnc1PcrZUg6JhShVYEGWTVNK`. Before this implementation only `DATABASE_URL` was configured. Added a cryptographically random `NEXTAUTH_SECRET` to preview and production configuration, plus the canonical production `NEXTAUTH_URL`. The existing administrator account remains unchanged.

Additive SQL migration and the curated editorial data were applied to the configured database with backups. The current production website uses its earlier static content, so these records take effect publicly with the new application release. Deployment state and the exact reviewed revision are recorded in RELEASE.md.

Social accounts, Google Business Profile, campaign scheduling and social publication are intentionally reserved for the owner’s next iteration.

## Evidence and privacy reference

Browser images and route results are alongside this document. Historical audit evidence is in `/Users/olubiyimakanju/Documents/ChatGPT/kliqnet_digital/audit-2026-09-08`.

The plain-language privacy notice reflects the implemented form, hosting, storage and measurement. Lawful-basis terminology was checked against the ICO’s [guide to lawful basis](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/lawful-basis/a-guide-to-lawful-basis/). No company registration number, legal address or fixed retention period was invented.

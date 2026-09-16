# September portfolio release

The owner approved production publication and confirmed Crate Companion, Homeskool and ENZI as the requested additions. Homeskool now uses the public brand Homeskolar, verified against its source and live website on 16 September.

## Included

- Crate Companion: installed Mac pilot; actual app screenshot; no public download or release claims.
- Homeskolar: public website and private family pilot; Education filtering; no claim of complete annual curriculum or public enrolment.
- ENZI: independent Hendon website preview; concept imagery labelled; live reservations remain disabled. The canonical restaurant domain currently shows a parked page, so this case study links to the working preview.
- Wazobia Old Kent Road: current homepage screenshot replacing the older design. Existing case-study content is preserved by the scoped database update.
- Approved Connected K identity extended to the admin login and sidebar, with labelled login fields, accessible error feedback and recovery after connection failures.

Screenshot sources were inspected in the in-app browser, except the Crate Companion image, which comes from the project's existing native-build evidence. No private family learning records are published. Images are optimised WebP files with versioned names.

## Publication order

Deploy application/assets first, then run `npx tsx scripts/publish-portfolio-september.ts --apply`. The command validates records and local files, backs up existing CMS records, refuses to overwrite an existing new-project slug, and inserts three records plus the Wazobia image-only patch in one transaction. The general seed publisher is deliberately not used, preserving unrelated CMS edits.

## Mail verification

The owner logged into Hostinger Mail. One authorised test was sent from biyim@kliqnetdigital.com to the same address with subject “Kliqnet Digital — authorised delivery test — 16 September 2026” and reference KLIQNET-MAIL-20260916. Hostinger reported successful sending; the matching message and body were verified in the inbox (message 225). This verifies the same-mailbox send/receive path, not external-provider delivery or inbox placement.

The mailbox's sender name was found to be ESQ Resto Lounge and changed to Kliqnet Digital to match its agency domain. No password or security settings were changed.

## Remaining operational work

1. Configure a transactional sender for website enquiry alerts. Enquiries are saved in the admin inbox; automated emails are not enabled. Mailbox DNS and working webmail do not supply application credentials.
2. Verify delivery to an owner-approved external mailbox. Only the same-address test was authorised.
3. Exercise the authenticated owner editing workflow after owner login. No account password has been reset.
4. Optional calendar integration: current call requests are arranged by reply and are described honestly.
5. Google Business Profile, TikTok and Instagram are a separate requested next iteration. Brand assets are ready; this release does not publish social content.

## Pre-release checks

TypeScript, security regression, 20-project content validation and scoped publication dry run passed. Production dependency audit: zero vulnerabilities. Lint: zero errors, 14 existing warnings. A production build and live deployment checks complete the release verification.

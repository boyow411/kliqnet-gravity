# Connected K implementation — 16 September 2026

The owner selected concept 01, Connected K, in this task. Its silhouette and outlined lettering are preserved in vector masters traced from the approved source PNG. Speckles were removed and curves smoothed; no stock font was substituted for the custom wordmark.

The website header/footer, browser favicon, scalable icon, Apple touch icon, Open Graph image, organization structured data, blog image fallback and public brand-download page now use this identity. The brand page is linked in the footer and sitemap. The downloadable ZIP contains SVG and PNG light/dark/monochrome lockups, symbols, a 1024px profile icon and usage notes. This prepares social assets; it does not publish any social profiles or posts.

## Reproduction

Install `potrace@2.1.8` into a temporary tooling folder, then run `node scripts/export-brand.mjs /absolute/path/to/node_modules/potrace` from this repository. Sharp is already an application dependency. The tracer is not added to the app dependency graph. Preserve the approved source and inspect the resulting assets before use. Vector export path extraction is deterministic; the original generated asset is retained under `source/`.

## Email work

The domain is registered with Hostinger but uses Vercel authoritative nameservers. MX, SPF, all three Hostinger DKIM CNAMEs and DMARC were already correct; the Hostinger Domain Settings page showed four green checks. DMARC remains the existing monitoring policy (`p=none`); no new reject policy was imposed on existing senders. Existing Resend records were preserved.

The advertised website address `hello@kliqnetdigital.com` was missing. It was added as a Hostinger alias of the existing `biyim@kliqnetdigital.com` mailbox, alongside the existing `contact@` alias. Both aliases were subsequently shown in Hostinger. No password was changed.

Added the following records to the active Vercel DNS zone and verified them at the authoritative nameserver:

- `autodiscover CNAME autodiscover.mail.hostinger.com` — record `rec_1c04d1db2a6f94a144534d82`
- `autoconfig CNAME autoconfig.mail.hostinger.com` — record `rec_bd86e7cf8cf018dbb75c313e`

These help email applications discover Hostinger settings; they do not themselves guarantee inbox placement. The website domain routing was untouched. Rollback consists of removing only the two new record IDs; removing the new alias would restore the previously broken public address and is not recommended.

Provider references:
- https://www.hostinger.com/support/8671319-set-up-a-domain-for-hostinger-email-manually/
- https://www.hostinger.com/support/4768158-how-to-set-up-hostinger-email-on-mozilla-thunderbird-automatically/

Mailbox login is separate from hPanel. The owner authorised a test to `biyim@kliqnetdigital.com` (the same mailbox, not an external provider). At this point the login is pending. Do not describe an actual test delivery as verified without receipt/log evidence.

Website enquiries remain persisted in the admin inbox. No SMTP or transactional-mail provider credentials are configured in this Vercel project, so automated enquiry emails are not enabled or promised. Existing database, anti-abuse and idempotency handling remain unchanged.

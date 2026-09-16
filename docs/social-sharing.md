# Icons and social previews

The root layout owns browser, Apple and home-screen icons. The approved Connected K avatar is exported as SVG, multi-resolution ICO and PNG files. Public pages use `pageMetadata` so canonical URLs, Open Graph and Twitter metadata remain consistent.

The sharing card must be a publicly accessible 1200 × 630 PNG. Project and article cards use approved public screenshots, never private application records. Cards are static files so a crawler does not need to wait for image rendering or execute JavaScript.

## Updating assets

1. Update the approved portfolio or insight seed record and its public screenshot.
2. Run `node scripts/export-sharing.mjs`. It creates content-hashed sharing cards and updates `src/data/share-cards.json`.
3. Commit the generated assets and manifest with the content change. Live records whose title or cover differs from the manifest use the generic agency card until their card is regenerated.
4. If changing the identity itself, also change the date/version in the icon and generic-card URLs, the root metadata and the web manifest to avoid stale browser caches. `export-brand.mjs` invokes the sharing exporter after exporting the approved brand.
5. Build and start the production server, then run `python3 scripts/check-sharing.py http://localhost:3017`. After release, run it against `https://www.kliqnetdigital.com`.

The checker reads all sitemap pages and validates crawler-visible head metadata, matching social images, PNG dimensions and size, favicon variants and the web manifest. It also checks representative pages using WhatsApp, Twitter and LinkedIn user agents.

Legacy `/icon.svg`, `/apple-icon.png` and `/opengraph-image.png` URLs remain accessible for existing consumers. New tags reference versioned assets. Social platforms may retain an older preview for a previously shared page URL; successful crawler responses are not proof that an existing message's cached preview has refreshed.

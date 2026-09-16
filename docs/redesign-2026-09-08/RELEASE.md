# Release status — 8 September 2026

Application revision: `112cb4694199cbb72fa090bfd5efccf3fdb695c0`, pushed to `codex/agency-portfolio-redesign`.

Review deployment: https://kliqnet-gravity-c4ey8sdsj-francis-maksons-projects.vercel.app

Vercel deployment ID: `dpl_7MoSFVyrskmiwQaseVfoXH5tkGUa`. State: READY. Target: preview. Deployment metadata matches the application revision above and contains no dirty-worktree flag. The preview is protected; a temporary owner review link was provided in the conversation.

Draft pull request: https://github.com/boyow411/kliqnet-gravity/pull/3

Both GitHub validation runs for the application revision succeeded: https://github.com/boyow411/kliqnet-gravity/actions/runs/34270538847 and https://github.com/boyow411/kliqnet-gravity/actions/runs/34270578599 . They cover installation, TypeScript, lint, security regression, content tests and the production dependency audit. Production builds passed locally and on Vercel. Thirty-seven local public routes, three redirects, a genuine 404, sitemap, robots and share image were checked separately.

The current production branch/domain remains on `722cdfaf0663dacab1f834b962195df06bc6db7d`. The public domain has not been switched to this design. The additive database schema and curated editorial records are ready; backups were taken first. Authentication environment settings were configured without changing the existing administrator account.

The owner’s next action is to review the preview and approve the production website switch, in line with the saved release preference. Google Business Profile and social publishing remain the next iteration.

The private editor’s authenticated browser session has not been exercised. Enquiries are saved in the admin submissions inbox; no mail sender or external scheduling integration is configured. Call requests are arranged by reply, and the website clearly describes this workflow.

Hosted verification passed: the exact committed preview renders the home page and 17-project catalogue. A browser enquiry returned `KN-000005`; its database row was verified and then removed as a clearly marked QA record. Success feedback received keyboard focus. Measurement totals currently include release QA visits.

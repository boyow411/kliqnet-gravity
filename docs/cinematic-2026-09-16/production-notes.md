# Cinematic studio implementation — 16 September 2026

Approved direction: a customer journey from challenge, through conversation and build, to launch and ongoing support. Preserve the approved Connected K identity, real project screens and accurate public product stages.

## Visual system

Five Image Gen backgrounds: smoked glass, near-black studio, lavender edge light, reflective floor, empty left 45 percent for real HTML copy. No generated text, customer data, people or logos. Illustrative scenes are labelled on the site. Source PNGs remain in the task's generated_images directory; optimised WebP deliverables are in public/cinematic.

1. 01-challenge: disconnected glass interface fragments.
2. 02-conversation: panels align and connect as the brief takes shape.
3. 03-build: an exploded interface stack and mobile companion.
4. 04-launch: a finished desktop and phone presentation.
5. 05-evolve: a connected product system, representing continued support.

## Interaction

Native vertical scrolling controls five chapters, with direct chapter buttons and persistent contact/work links. No wheel interception. Motion can be reduced with the fixed control; operating-system reduced-motion is respected. Quiet mode presents a normal-flow text journey. Content is visible before reveal animations and remains server rendered.

Projects have a manually controlled four-project premiere (CineKliq, Crate Companion, Homeskolar, ENZI) followed by the complete searchable/filterable 20-project collection. Real screenshots are contained instead of cropped. Case studies use their own screenshot as subtle background atmosphere. Section entrances and restrained hover feedback extend across public pages; private admin/onboarding pages are excluded.

## Video production

Owner requested MiniMax HD or Seedance 2.0/2.5 instead of Veo. Seedance 2.0 standard selected in Kie.ai after the 2.5 page stalled. Start/end frames, 16:9, 1080p, 6 seconds, audio disabled. Generation status and final assets must be verified before claiming a video deliverable.

Prompt baseline: Premium digital studio film, locked camera, dark studio. Match the supplied first and last frames precisely. Disconnected smoked-glass fragments slowly glide and rotate into organised connected interface panels. Restrained lavender light traces the connections as the layout becomes clear. Keep the left 45 percent near-black and empty throughout for website typography. Photorealistic glass, subtle floor reflections. No camera move, no people, no text, no logos, no cuts or flashing. Begin and end at rest. Silent visual sequence.

## Validation so far

Agency content and boundary checks pass for 20 projects. Security regression checks pass. TypeScript and production build pass. ESLint has no errors and 14 existing warnings outside this change. Production dependency audit reports zero vulnerabilities. Browser checks: five background images loaded on mobile; no horizontal overflow; direct chapter selection; quiet mode transcript; project next button; Wazobia search returns one project.

## Provider blocker

Kie playground rejected Seedance 2.0 and MiniMax Hailuo 2.3 Standard at 1080P with: `The API key is not authorized to use this model.` No generated video result was returned. The output panels still showed the providers’ sample clips; these were not downloaded or used. Owner asked to enable one preferred model. No key permissions, secrets, billing or top-up settings changed. The site currently uses the five generated stills with native-scroll transitions.

Additional browser checks: services/about/contact have no horizontal overflow at 390px; no enquiry submitted. Desktop 1280x720 revealed a hero CTA/chapter overlap, corrected with compact-height typography and spacing. Chapters 4 and 5 verified; CTA bottom 566px, chapter controls top 602px. Logo now preloads to avoid an initially blank header. A no-JavaScript text-flow fallback is included. Five source PNGs and original Image Gen requests are archived in the task workspace under cinematic-production-2026-09-16.

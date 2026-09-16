# Cinematic homepage

The homepage tells five consecutive chapters: challenge, conversation, build,
launch, and ongoing support. The copy remains HTML; the generated film is a
decorative illustration, not footage of client work.

## Playback

`JourneyHero` owns native scroll progress and chapter navigation. `JourneyFilm`
maps that progress to a paused video's playhead. It waits for an outstanding
seek to finish before seeking again, and only schedules work when progress or
media readiness changes. There is no continuously running animation loop.

The film is muted, inline, and has no audio track. Desktop uses a 1080p encode;
viewports up to 760px use a smaller 720p encode selected before media loading.
Both use H.264, 24 fps, a keyframe every 12 frames and a fast-start MP4 header.

The five WebP illustrations remain underneath the video. They work while video
loads or if loading fails. No video source is assigned for browsers reporting
Save-Data, a 2G connection, or reduced motion. The site's motion toggle unmounts
the video and reveals the journey as normal-flow readable sections. A no-script
fallback also reveals the text without requiring the scroll interaction.

## Assets

The source frames were generated specifically for Kliqnet Digital. MiniMax H3
(Hailuo03), through Kie.ai, generated the film from those five references. Keep
the original renders and generation request archive outside the public folder;
only the optimized deliverables belong in `public/cinematic`.

When replacing the film, preserve the chapter order and equal five-part timing.
Review the entire result before encoding it: dark space for the headline,
stable geometry, no unexpected text, no flashes, and continuity across stages.
Check forward and reverse scrolling, chapter buttons, motion off, and a narrow
mobile viewport against the actual final video.

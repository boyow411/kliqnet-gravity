"use client";

import { useEffect, useRef } from "react";
import type { MotionValue } from "framer-motion";

/** A paused film whose playhead follows native scrolling, with stills underneath. */
export function JourneyFilm({ progress }: { progress: MotionValue<number> }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    const connection = (navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }).connection;
    if (!video || window.matchMedia("(prefers-reduced-motion: reduce)").matches
      || connection?.saveData || /(^|-)2g$/.test(connection?.effectiveType ?? "")) return;

    let frame = 0;
    let disposed = false;
    function sync() {
      frame = 0;
      if (!video || disposed || video.seeking || video.readyState < 2 || !Number.isFinite(video.duration)) return;
      const time = Math.max(0, Math.min(1, progress.get())) * Math.max(0, video.duration - 0.05);
      if (Math.abs(video.currentTime - time) > 1 / 30) video.currentTime = time;
    }
    function schedule() {
      if (!frame && !disposed) frame = requestAnimationFrame(sync);
    }
    function ready() {
      video?.classList.add("is-ready");
      schedule();
    }
    function failed() { video?.classList.remove("is-ready"); }
    video.addEventListener("loadeddata", ready);
    video.addEventListener("seeked", schedule);
    video.addEventListener("error", failed);
    const unsubscribe = progress.on("change", schedule);
    video.src = window.matchMedia("(max-width: 760px)").matches
      ? "/cinematic/journey-mobile.mp4" : "/cinematic/journey-desktop.mp4";
    video.load();
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      unsubscribe();
      video.removeEventListener("loadeddata", ready);
      video.removeEventListener("seeked", schedule);
      video.removeEventListener("error", failed);
      video.removeAttribute("src");
      video.load();
    };
  }, [progress]);

  return <video ref={ref} className="journey-film" muted playsInline preload="auto" aria-hidden="true" tabIndex={-1} />;
}

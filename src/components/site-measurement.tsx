"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
export function recordSiteEvent(
  event: "page_view" | "enquiry_start" | "enquiry_complete",
  path: string,
) {
  if (
    !/^\/(?:$|projects(?:\/[a-z0-9-]+)?$|services$|about$|contact$|book-a-call$|blog(?:\/[a-z0-9-]+)?$|[a-z]+-development$|automation$|ai-integration$|crm-operations$|digital-marketing$)/.test(
      path,
    )
  )
    return;
  void fetch("/api/site-events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ event, path }),
    keepalive: true,
  }).catch(() => {});
}
export function SiteMeasurement() {
  const pathname = usePathname();
  const previous = useRef("");
  useEffect(() => {
    if (previous.current === pathname) return;
    previous.current = pathname;
    recordSiteEvent("page_view", pathname);
  }, [pathname]);
  return null;
}

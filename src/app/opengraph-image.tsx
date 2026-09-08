import { ImageResponse } from "next/og";
export const alt = "Kliqnet Digital — Websites, products and business systems";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: "#0c1017",
          color: "#f4f6ff",
          padding: "65px",
          flexDirection: "column",
          justifyContent: "space-between",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 28 }}>
          Kliqnet Digital{" "}
          <span style={{ color: "#a2b2d0", marginLeft: 24 }}>
            Agency & product studio
          </span>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 76,
            letterSpacing: -3,
            lineHeight: 1.1,
            flexDirection: "column",
          }}
        >
          <span>We build the digital</span>
          <span style={{ color: "#88a4ff" }}>side of your business.</span>
        </div>
        <div style={{ display: "flex", fontSize: 25, color: "#b7c3d8" }}>
          Websites · SaaS & digital products · Automation
        </div>
      </div>
    ),
    size,
  );
}

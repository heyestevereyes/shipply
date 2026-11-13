import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = site.seo.ogTitle;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          color: "#F3F0E7",
          background:
            "radial-gradient(60% 50% at 50% 115%, rgba(201,242,107,0.55) 0%, rgba(201,242,107,0) 70%), radial-gradient(90% 80% at 75% 35%, #1F5A3F 0%, #0A1F16 70%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 36, fontWeight: 700, letterSpacing: -1.5 }}>
          <div style={{ width: 52, height: 52, borderRadius: 16, background: "#C9F26B", display: "flex" }} />
          {site.brand.name}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, fontWeight: 700, letterSpacing: -4, lineHeight: 1 }}>{site.hero.titleLead}</div>
          <div style={{ display: "flex", marginTop: 14 }}>
            <div style={{ background: "#C9F26B", color: "#0A1F16", fontSize: 92, fontWeight: 700, letterSpacing: -4, lineHeight: 1.05, padding: "0 18px", borderRadius: 10 }}>
              {site.hero.titleAccent}
            </div>
          </div>
        </div>
        <div style={{ fontSize: 28, color: "rgba(243,240,231,0.75)" }}>{site.brand.tagline}</div>
      </div>
    ),
    size,
  );
}

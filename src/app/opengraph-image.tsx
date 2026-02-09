import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Benewende.dev - Développeur Full Stack & Créateur de SaaS";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0a0a0a 0%, #111111 50%, #0a0a0a 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Accent circles */}
        <div
          style={{
            position: "absolute",
            top: -100,
            left: -100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,102,255,0.15) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,186,199,0.15) 0%, transparent 70%)",
          }}
        />

        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <span
            style={{
              fontSize: 64,
              fontWeight: 800,
              background: "linear-gradient(90deg, #0066FF, #00BAC7, #F59E0B)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Benewende
          </span>
          <span style={{ fontSize: 64, fontWeight: 800, color: "#666" }}>.dev</span>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 32,
            color: "#e5e5e5",
            fontWeight: 600,
            marginBottom: 16,
            textAlign: "center",
          }}
        >
          Développeur Full Stack & Créateur de SaaS
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 20,
            color: "#888",
            textAlign: "center",
            maxWidth: 700,
          }}
        >
          React • Next.js • TypeScript • Solutions IA • Ouagadougou, BF
        </div>

        {/* Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginTop: 40,
            padding: "8px 20px",
            borderRadius: 999,
            border: "1px solid rgba(34,197,94,0.3)",
            background: "rgba(34,197,94,0.1)",
            color: "#22C55E",
            fontSize: 16,
            fontWeight: 500,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#22C55E",
            }}
          />
          Disponible pour projets
        </div>
      </div>
    ),
    { ...size }
  );
}

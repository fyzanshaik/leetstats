import { ImageResponse } from "next/og";

export const size = {
  width: 256,
  height: 256,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 50%, #1a1a1a 100%)",
          borderRadius: "48px",
          border: "6px solid #2a2a2a",
          position: "relative",
          boxShadow: "0 16px 64px rgba(0,0,0,0.8)",
        }}
      >
        {/* Massive Trophy */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            position: "relative",
          }}
        >
          {/* Huge Trophy Cup */}
          <div
            style={{
              width: "140px",
              height: "112px",
              background:
                "linear-gradient(135deg, #ff1493 0%, #ff69b4 30%, #ff1493 70%, #ff69b4 100%)",
              borderRadius: "70px 70px 32px 32px",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow:
                "0 12px 48px rgba(255, 20, 147, 0.5), inset 0 4px 16px rgba(255,255,255,0.2)",
              border: "4px solid rgba(255,255,255,0.1)",
            }}
          >
            {/* Massive Trophy handles */}
            <div
              style={{
                position: "absolute",
                left: "-32px",
                top: "24px",
                width: "24px",
                height: "64px",
                background: "linear-gradient(90deg, #ff1493 0%, #ff69b4 100%)",
                borderRadius: "16px 0 0 16px",
                boxShadow: "0 8px 24px rgba(255, 20, 147, 0.4)",
              }}
            />
            <div
              style={{
                position: "absolute",
                right: "-32px",
                top: "24px",
                width: "24px",
                height: "64px",
                background: "linear-gradient(90deg, #ff69b4 0%, #ff1493 100%)",
                borderRadius: "0 16px 16px 0",
                boxShadow: "0 8px 24px rgba(255, 20, 147, 0.4)",
              }}
            />

            {/* Huge LS text */}
            <div
              style={{
                color: "white",
                fontSize: "56px",
                fontWeight: "900",
                fontFamily: "system-ui, -apple-system, sans-serif",
                textShadow:
                  "0 6px 12px rgba(0,0,0,0.6), 0 2px 4px rgba(0,0,0,0.9)",
                letterSpacing: "-2px",
              }}
            >
              LS
            </div>
          </div>

          {/* Massive Trophy base */}
          <div
            style={{
              position: "absolute",
              bottom: "40px",
              width: "96px",
              height: "24px",
              background: "linear-gradient(90deg, #ff1493 0%, #ff69b4 100%)",
              borderRadius: "12px",
              boxShadow: "0 8px 24px rgba(255, 20, 147, 0.4)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "16px",
              width: "128px",
              height: "24px",
              background: "linear-gradient(90deg, #ff1493 0%, #ff69b4 100%)",
              borderRadius: "12px",
              boxShadow: "0 8px 24px rgba(255, 20, 147, 0.4)",
            }}
          />

          {/* Large floating stats elements */}
          <div
            style={{
              position: "absolute",
              top: "32px",
              right: "32px",
              width: "32px",
              height: "32px",
              background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
              borderRadius: "50%",
              boxShadow: "0 8px 24px rgba(251, 191, 36, 0.6)",
              border: "4px solid rgba(255,255,255,0.2)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "64px",
              right: "64px",
              width: "24px",
              height: "24px",
              background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
              borderRadius: "50%",
              boxShadow: "0 8px 24px rgba(139, 92, 246, 0.6)",
              border: "3px solid rgba(255,255,255,0.2)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "96px",
              left: "32px",
              width: "20px",
              height: "20px",
              background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
              borderRadius: "50%",
              boxShadow: "0 8px 24px rgba(16, 185, 129, 0.6)",
              border: "3px solid rgba(255,255,255,0.2)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "96px",
              left: "48px",
              width: "16px",
              height: "16px",
              background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
              borderRadius: "50%",
              boxShadow: "0 8px 24px rgba(239, 68, 68, 0.6)",
              border: "2px solid rgba(255,255,255,0.2)",
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}

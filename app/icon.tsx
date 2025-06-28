import { ImageResponse } from "next/og";

export const size = {
  width: 128,
  height: 128,
};
export const contentType = "image/png";
export const runtime = "edge";

export async function GET() {
  const imageResponse = new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)",
          borderRadius: "24px",
          border: "3px solid #2a2a2a",
          position: "relative",
          boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
        }}
      >
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
          <div
            style={{
              width: "70px",
              height: "56px",
              background:
                "linear-gradient(135deg, #ff1493 0%, #ff69b4 50%, #ff1493 100%)",
              borderRadius: "35px 35px 16px 16px",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow:
                "0 6px 24px rgba(255, 20, 147, 0.4), inset 0 2px 8px rgba(255,255,255,0.2)",
              border: "2px solid rgba(255,255,255,0.1)",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: "-16px",
                top: "12px",
                width: "12px",
                height: "32px",
                background: "linear-gradient(90deg, #ff1493 0%, #ff69b4 100%)",
                borderRadius: "8px 0 0 8px",
                boxShadow: "0 4px 12px rgba(255, 20, 147, 0.3)",
              }}
            />
            <div
              style={{
                position: "absolute",
                right: "-16px",
                top: "12px",
                width: "12px",
                height: "32px",
                background: "linear-gradient(90deg, #ff69b4 0%, #ff1493 100%)",
                borderRadius: "0 8px 8px 0",
                boxShadow: "0 4px 12px rgba(255, 20, 147, 0.3)",
              }}
            />
            <div
              style={{
                color: "white",
                fontSize: "28px",
                fontWeight: "900",
                fontFamily: "system-ui, -apple-system, sans-serif",
                textShadow:
                  "0 3px 6px rgba(0,0,0,0.5), 0 1px 2px rgba(0,0,0,0.8)",
                letterSpacing: "-1px",
              }}
            >
              LS
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "20px",
              width: "48px",
              height: "12px",
              background: "linear-gradient(90deg, #ff1493 0%, #ff69b4 100%)",
              borderRadius: "6px",
              boxShadow: "0 4px 12px rgba(255, 20, 147, 0.3)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "8px",
              width: "64px",
              height: "12px",
              background: "linear-gradient(90deg, #ff1493 0%, #ff69b4 100%)",
              borderRadius: "6px",
              boxShadow: "0 4px 12px rgba(255, 20, 147, 0.3)",
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
    },
  );

  imageResponse.headers.set(
    "Cache-Control",
    "public, max-age=86400, must-revalidate",
  );

  return imageResponse;
}

export default function Icon() {
  return null;
}

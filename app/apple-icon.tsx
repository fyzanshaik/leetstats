import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 72,
          background: "linear-gradient(135deg, #FFA116 0%, #FF6B35 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontWeight: "900",
          fontFamily: "system-ui, -apple-system, sans-serif",
          borderRadius: "20px",
          border: "6px solid #1a1a1a",
        }}
      >
        LS
      </div>
    ),
    {
      ...size,
    },
  );
}

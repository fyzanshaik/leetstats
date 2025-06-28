import { ImageResponse } from "next/og";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1a1a1a",
          borderRadius: "8px",
        }}
      >
        <div
          style={{
            width: "24px",
            height: "20px",
            background: "#ff1493",
            borderRadius: "12px 12px 6px 6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "12px",
            fontWeight: "900",
          }}
        >
          LS
        </div>
      </div>
    ),
    {
      width: 32,
      height: 32,
    },
  );
}

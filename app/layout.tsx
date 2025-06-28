import type React from "react";
import type { Metadata } from "next";
import { Poppins, Space_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LeetStats - Coding Progress Dashboard",
  description: "Track your LeetCode progress with friends",
  icons: {
    icon: [
      {
        url: `/icon?v=${Date.now()}`,
        sizes: "128x128",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: `/apple-icon?v=${Date.now()}`,
        sizes: "256x256",
        type: "image/png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${spaceMono.variable} font-sans antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}

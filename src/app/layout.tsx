import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", weight: ["400", "500", "600", "700"] });
const jbmono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jbmono", weight: ["400", "500", "600"] });

export const metadata: Metadata = {
  title: "lakar — the canvas your agent can draw on",
  description:
    "lakar is a real design tool your agent drives through code. boards, tokens, components, comments. right beside your terminal.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jbmono.variable}`}>
      <body>{children}</body>
    </html>
  );
}

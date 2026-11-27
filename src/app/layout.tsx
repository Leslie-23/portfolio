import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import Shell from "@/components/Shell";

const display = Bebas_Neue({ variable: "--font-display", subsets: ["latin"], weight: "400" });
const body = Inter({ variable: "--font-body", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono-label", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "Leslie / Software Engineer", template: "%s / Leslie" },
  description: "Leslie Paul Ajayi. Software engineer in Accra, building products and figuring out how things work underneath.",
};
export const viewport: Viewport = { themeColor: "#F2F0E9", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <noscript><style>{`.intro{display:none!important}`}</style></noscript>
        <a href="#main" className="mono sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[999] focus:bg-ink focus:px-3 focus:py-2 focus:text-paper">SKIP TO CONTENT</a>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}

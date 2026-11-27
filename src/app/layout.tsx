import type { Metadata, Viewport } from "next";
import { Mona_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import Rail from "@/components/Rail";
import MobileBar from "@/components/MobileBar";
import Reveal from "@/components/Reveal";

const sans = Mona_Sans({ variable: "--font-sans-face", subsets: ["latin"], weight: ["400", "500", "600"] });
const mono = Geist_Mono({ variable: "--font-mono-face", subsets: ["latin"], weight: ["400", "500"] });

const site = process.env.NODE_ENV === "production" ? "https://www.leslieajayi.com" : "http://localhost:3000";
const title = "Leslie Paul Ajayi — Software engineer and founder";
const description =
  "Software engineer at Global Icons, founder of Trofficient and CTO of Beagine. I build systems that go to production, not demos that die in a repo. Accra, Ghana.";

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: { default: title, template: "%s — Leslie Paul Ajayi" },
  description,
  authors: [{ name: "Leslie Paul Ajayi" }],
  openGraph: { type: "website", siteName: "Leslie Paul Ajayi", title, description, locale: "en_GH" },
  twitter: { card: "summary_large_image", title, description },
};
export const viewport: Viewport = { themeColor: "#ecedeb", width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>
        <a href="#main" className="label sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white">Skip to content</a>
        <Rail />
        <main id="main" className="px-2 pb-[calc(5.5rem+env(safe-area-inset-bottom))] pt-2 sm:px-3 sm:pt-3 lg:ml-[var(--rail)] lg:pb-3 lg:pl-0">
          <div className="flex flex-col gap-2 sm:gap-3">{children}</div>
        </main>
        <MobileBar />
        <Reveal />
      </body>
    </html>
  );
}

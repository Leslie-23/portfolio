import type { Metadata, Viewport } from "next";
import { Mona_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import TopBar from "@/components/TopBar";
import Reveal from "@/components/Reveal";
import Console, { type ConsoleData } from "@/components/Console";
import Elena from "@/components/Elena";
import { PERSON, TOOLKIT, publicEvidence } from "@/lib/data";
import { WORK } from "@/lib/work";
import { TRACKS } from "@/lib/music";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, PERSON_LD, WEBSITE_LD } from "@/lib/seo";

const sans = Mona_Sans({ variable: "--font-sans-face", subsets: ["latin"], weight: ["400", "500", "600"] });
const mono = Geist_Mono({ variable: "--font-mono-face", subsets: ["latin"], weight: ["400", "500"] });

const site = process.env.NODE_ENV === "production" ? SITE_URL : "http://localhost:3000";
const title = "Leslie Paul Ajayi — Software engineer and founder";
const description =
  "Software engineer at Global Icons, founder of Trofficient and CTO of Beagine. I build systems that go to production, not demos that die in a repo. Accra, Ghana.";

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: { default: title, template: "%s — Leslie Paul Ajayi" },
  description,
  applicationName: "Leslie Paul Ajayi",
  authors: [{ name: "Leslie Paul Ajayi", url: SITE_URL }],
  creator: "Leslie Paul Ajayi",
  keywords: ["Leslie Paul Ajayi", "software engineer Ghana", "software engineer Accra", "Trofficient", "Beagine", "Global Icons", "mobile app developer Ghana", "full-stack developer Accra"],
  alternates: { canonical: "./" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  openGraph: { type: "website", siteName: "Leslie Paul Ajayi", title, description, locale: "en_GH", url: "./" },
  twitter: { card: "summary_large_image", title, description, creator: "@LesliePaulAjayi" },
};
export const viewport: Viewport = { themeColor: "#ecedeb", width: "device-width", initialScale: 1, viewportFit: "cover" };

// what the command palette and terminal can name: slugs, titles and the stack, nothing else
const consoleData: ConsoleData = {
  email: PERSON.email,
  github: PERSON.links.github,
  music: TRACKS.length > 0,
  work: WORK.map((w) => ({ slug: w.slug, name: w.name, category: w.category, tier: w.tier })),
  stack: TOOLKIT.map((g) => ({ group: g.label, items: g.items.filter(publicEvidence).map((i) => i.name) })),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>
        <JsonLd data={[PERSON_LD, WEBSITE_LD]} />
        <a href="#main" className="label sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white">Skip to content</a>
        <TopBar />
        <main id="main" className="pt-[var(--bar)]">{children}</main>
        <Reveal />
        <Console data={consoleData} />
        <Elena />
      </body>
    </html>
  );
}

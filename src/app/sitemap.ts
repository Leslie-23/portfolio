import type { MetadataRoute } from "next";
import { NOTES } from "@/lib/data";
import { WORK } from "@/lib/work";
import { SITE_URL, isoDate } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const latest = new Date(isoDate(NOTES[0]?.date ?? "2026.01.01"));
  const pages = [
    { p: "", priority: 1 },
    { p: "/work", priority: 0.9 },
    { p: "/about", priority: 0.8 },
    { p: "/pricing", priority: 0.7 },
    { p: "/contact", priority: 0.7 },
    { p: "/team", priority: 0.6 },
    { p: "/notes", priority: 0.6 },
  ].map(({ p, priority }) => ({ url: SITE_URL + p, lastModified: latest, priority }));
  return [
    ...pages,
    ...WORK.map((w) => ({ url: `${SITE_URL}/work/${w.slug}`, lastModified: latest, priority: w.tier === "case" ? 0.8 : 0.5 })),
    ...NOTES.map((n) => ({ url: `${SITE_URL}/notes/${n.slug}`, lastModified: new Date(isoDate(n.date)), priority: 0.6 })),
  ];
}

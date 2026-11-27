import type { MetadataRoute } from "next";
import { NOTES } from "@/lib/data";
import { WORK } from "@/lib/work";

const base = "https://www.leslieajayi.com";
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/work", "/about", "/notes", "/contact"].map((p) => ({ url: base + p }));
  return [...pages, ...WORK.map((w) => ({ url: `${base}/work/${w.slug}` })), ...NOTES.map((n) => ({ url: `${base}/notes/${n.slug}` }))];
}

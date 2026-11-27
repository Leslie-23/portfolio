import type { MetadataRoute } from "next";
import { NOTES, PROJECTS } from "@/lib/data";

const base = "https://www.leslieajayi.com";
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/work", "/bench", "/about", "/toolkit", "/infra", "/notes", "/contact", "/archive"].map((p) => ({ url: base + p }));
  return [...pages, ...PROJECTS.map((p) => ({ url: `${base}/work/${p.slug}` })), ...NOTES.map((n) => ({ url: `${base}/notes/${n.slug}` }))];
}

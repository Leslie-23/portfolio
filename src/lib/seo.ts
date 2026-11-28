import { PERSON } from "@/lib/data";

// One source of truth for the production origin (layout, robots, sitemap and JSON-LD all read this).
export const SITE_URL = "https://www.leslieajayi.com";
export const SITE_NAME = "Leslie Paul Ajayi";

export const abs = (path: string) => SITE_URL + (path.startsWith("/") ? path : `/${path}`);

// "2026.11.26" -> ISO date
export const isoDate = (d: string) => d.replace(/\./g, "-");

export const SAME_AS = [PERSON.links.github, PERSON.links.linkedin, PERSON.links.x];

export const PERSON_LD = {
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: PERSON.name,
  url: SITE_URL,
  image: abs("/opengraph-image.png"),
  jobTitle: "Software Engineer",
  description:
    "Software engineer at Global Icons, founder of Trofficient and CTO of Beagine, based in Accra, Ghana.",
  address: { "@type": "PostalAddress", addressLocality: "Accra", addressCountry: "GH" },
  worksFor: { "@type": "Organization", name: "Global Icons" },
  knowsAbout: ["Software engineering", "Mobile apps", "Web development", "Transit technology", "Voice infrastructure", "Systems design"],
  sameAs: SAME_AS,
};

export const WEBSITE_LD = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  inLanguage: "en",
  publisher: { "@id": `${SITE_URL}/#person` },
};

export function breadcrumbLd(trail: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({ "@type": "ListItem", position: i + 1, name: t.name, item: abs(t.path) })),
  };
}

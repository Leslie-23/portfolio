/* The homepage is a deck. Each slide's id, rail label and short title live here so the
   rail thumbnails, the mobile pager and the slide counters always agree. */
export const SLIDES = [
  { id: "cover", label: "Cover", title: "Built for Africa. Systems for society. Engineered for impact." },
  { id: "thesis", label: "Thesis", title: "I build systems that go to production." },
  { id: "work", label: "Work", title: "What I founded, lead and built." },
  { id: "experience", label: "Experience", title: "Where I work, and what I own." },
  { id: "numbers", label: "Numbers", title: "Receipts, not adjectives.", dark: true },
  { id: "story", label: "Story", title: "From console apps to companies." },
  { id: "approach", label: "Approach", title: "Build. Test. Question. Repeat." },
  { id: "tools", label: "Tools", title: "Tools I built and gave away." },
  { id: "writing", label: "Writing", title: "What I learn, written down." },
  { id: "contact", label: "Contact", title: "Have a problem worth solving?" },
] as const;

export type SlideId = (typeof SLIDES)[number]["id"];
export const slideNo = (id: SlideId) => SLIDES.findIndex((s) => s.id === id) + 1;
export const pad = (n: number) => String(n).padStart(2, "0");

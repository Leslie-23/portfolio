/* One directory for everything Leslie has built. Content lives in data.ts and the designer brief;
   this file only normalises it so the Work page and the detail pages can render any entry the same way. */
import { PROJECTS, SHIPPED, liveFor, type Project } from "./data";

export type Filter = "Products" | "Mobile" | "Web" | "Systems" | "Tools";
export const FILTERS: Filter[] = ["Products", "Mobile", "Web", "Systems", "Tools"];

export type WorkItem = {
  slug: string;
  name: string;
  year: string;
  category: string;   // human label shown on the card
  role: string;       // stated ownership, never inflated
  blurb: string;
  stack: string[];
  filters: Filter[];
  status?: string;
  live?: string;
  repo?: string;
  image?: string;     // desktop capture
  phones?: string[];  // portrait screens, shown in phone frames
  tier: "case" | "site" | "tool";
  project?: Project;
  note?: string;      // honest caveat, e.g. a deployment of someone else's software
};

const CATEGORY: Record<string, string> = {
  trofficient: "Transit technology",
  vop: "Voice infrastructure",
  beagine: "Home-services marketplace",
  steppool: "Fitness challenges",
  "four-man-chess": "Multiplayer game",
  "scrapy-mcp": "Developer tool",
  "ai-sme": "Business intelligence",
  elena: "Developer assistant",
  "uat-tracker": "QA tooling",
  stewardly: "Team scheduling",
  attendance: "Workforce tool",
  "de-sams-studio": "Studio website",
  "campus-connect": "Campus social app",
};

const toFilters = (cats: string[]): Filter[] => {
  const f = new Set<Filter>();
  if (cats.includes("PRODUCT")) f.add("Products");
  if (cats.includes("MOBILE")) f.add("Mobile");
  if (cats.includes("WEB")) f.add("Web");
  if (cats.includes("SYSTEMS")) f.add("Systems");
  return [...f];
};

// Trofficient's phone captures include personal data on screen (BRIEF §4), so its card uses the public website capture.
const PHONE_OK = (p: Project) => !!p.portrait && !!p.gallery && p.slug !== "trofficient";

const fromProject = (p: Project): WorkItem => ({
  slug: p.slug, name: p.name, year: p.year, category: CATEGORY[p.slug] ?? p.categories[0], role: p.role, blurb: p.blurb,
  stack: p.stack, filters: toFilters(p.categories), status: p.status, live: liveFor(p.slug, p.live), repo: p.repo,
  image: p.media ? `/work/${p.media}/desktop.jpg` : undefined,
  phones: PHONE_OK(p) ? p.gallery!.slice(0, 3).map((g) => g.src) : undefined,
  tier: "case", project: p,
});

const SITE_ROLE: Record<string, string> = {};
const fromShipped = (s: (typeof SHIPPED)[number]): WorkItem => ({
  slug: s.slug, name: s.name, year: s.year,
  category: s.kind.charAt(0) + s.kind.slice(1).toLowerCase(),
  role: SITE_ROLE[s.slug] ?? "Engineer", blurb: s.blurb, stack: s.stack ?? [], filters: toFilters(s.categories),
  status: "LIVE", live: s.live, repo: s.repo, image: `/work/${s.slug}/desktop.jpg`, tier: "site",
});

/* Tools and experiments, from BRIEF §8. Each links to its public repo. Private or unconfirmed ones are left out. */
const gh = (r: string) => `https://github.com/Leslie-23/${r}`;
const TOOLS: WorkItem[] = [
  { slug: "git-helper", name: "git-helper", year: "2026", category: "CLI · published on npm", role: "Author", tier: "tool", filters: ["Tools"],
    blurb: "The Git CLI that writes your commit messages. Stage, commit and push in one command; with a key set, Claude or GPT drafts the message from the staged diff.",
    stack: ["Node.js"], status: "v3.0.0 ON NPM", repo: gh("git-helper"), live: "https://www.npmjs.com/package/npm-git-helper" },
  { slug: "keybinding-doctor", name: "Keybinding Doctor", year: "2026", category: "VS Code extension", role: "Author", tier: "tool", filters: ["Tools"],
    blurb: "Finds likely keyboard-shortcut conflicts and generates small keybindings.json fixes. It says plainly that VS Code doesn't expose the full resolver, so it reports likely conflicts.",
    stack: ["TypeScript"], status: "PROTOTYPE", repo: gh("vsce") },
  { slug: "holo", name: "Holo", year: "2026", category: "macOS research prototype", role: "Author", tier: "tool", filters: ["Tools", "Systems"],
    blurb: "Turns the desk around a MacBook into four tap zones using the microphone and signal processing. It claims no accuracy until measured per laptop.",
    stack: ["Swift"], status: "RESEARCH", repo: gh("Holo") },
  { slug: "wakey", name: "Shake Alarm", year: "2026", category: "Mobile app", role: "Author", tier: "tool", filters: ["Tools", "Mobile"],
    blurb: "An alarm you have to shake to dismiss: local notifications, accelerometer detection and sync across devices.",
    stack: ["Expo", "Express", "MongoDB"], repo: gh("wakey") },
  { slug: "rounds", name: "Round", year: "2026", category: "Membership MVP", role: "Author", tier: "tool", filters: ["Tools", "Mobile"],
    blurb: "A restaurant membership club MVP: one Expo app for members, staff, owners and admins through role-based routes.",
    stack: ["Expo", "Express", "MongoDB", "Stripe"], repo: gh("rounds") },
  { slug: "smartscan", name: "SmartScan", year: "2025", category: "AI receipt scanner", role: "Author", tier: "tool", filters: ["Tools"],
    blurb: "OCR, then LLM extraction of vendor, items, totals and tax, exported as JSON or CSV.",
    stack: ["Node.js", "Express", "Hugging Face"], repo: gh("smartScan") },
  { slug: "mcp-weather", name: "mcp-weather", year: "2026", category: "MCP server", role: "Author", tier: "tool", filters: ["Tools", "Systems"],
    blurb: "An example MCP server.", stack: ["TypeScript"], repo: gh("mcp-weather") },
  { slug: "osafrica", name: "osAfrica", year: "2026", category: "AI-native OS", role: "Author", tier: "tool", filters: ["Tools", "Systems"],
    blurb: "An AI-native operating system, in active development. Nothing to show yet.", stack: ["Python"], status: "IN DEVELOPMENT", repo: gh("osAfrica") },
  { slug: "the-word", name: "The Word", year: "2026", category: "Open-source Bible app", role: "Author", tier: "tool", filters: ["Tools", "Mobile"],
    blurb: "A Flutter Bible app: multiple versions, search, bookmarks and daily notifications.", stack: ["Flutter"], repo: gh("Family-Bible") },
  { slug: "vien", name: "VIEN", year: "2025", category: "Storefront build", role: "Author", tier: "tool", filters: ["Web"],
    blurb: "A rustic shoe store: home, shop, product, about and contact pages with a Cloudinary media pipeline.",
    stack: ["React", "Vite", "Express", "MongoDB", "Cloudinary"], repo: gh("vien") },
];

// featured order: what he founded or leads first, then systems work, then the rest
const ORDER = ["trofficient", "beagine", "vop", "steppool", "four-man-chess", "scrapy-mcp", "ai-sme", "elena", "stewardly", "attendance", "uat-tracker", "campus-connect", "de-sams-studio"];

const rank = (slug: string) => (ORDER.includes(slug) ? ORDER.indexOf(slug) : ORDER.length);

export const WORK: WorkItem[] = [
  ...[...PROJECTS].sort((a, b) => rank(a.slug) - rank(b.slug)).map(fromProject),
  ...SHIPPED.map(fromShipped),
  ...TOOLS,
];

export const getWork = (slug: string) => WORK.find((w) => w.slug === slug);
export const CASE_COUNT = PROJECTS.length;

/* Data labels are stored in capitals. Sentence-case them for headings, restoring the words that must keep their case. */
const KEEP = ["Ghana", "QR", "API", "AI", "SMS", "MCP", "PWA", "CLI", "ChatGPT", "Claude Code", "Codex", "Express", "Next.js", "PostgreSQL", "MongoDB",
  "React", "Vite", "Expo", "Beagine", "Pro", "Store", "I", "I'm", "Redis", "Socket.IO", "WebRTC", "SIP"];
export function sentence(s: string) {
  let out = s.charAt(0) + s.slice(1).toLowerCase();
  for (const k of KEEP) out = out.replace(new RegExp(`(^|[^A-Za-z])${k.replace(/[.+]/g, "\\$&")}(?=$|[^A-Za-z])`, "gi"), (_, pre) => pre + k);
  return out;
}

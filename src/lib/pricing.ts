/* Leslie's pricing. DRAFT: the project prices and timelines are adapted from Nesisoft's published
   starting prices (nesisoft.com/app-cost-calculator) until Leslie supplies his own. Replace the numbers
   here and the section updates everywhere. Cedis only. Rates and retainer are deliberately "on request". */

export const PRICE_PROJECTS = [
  { type: "Business website", what: "A professional site that presents your business and brings in enquiries, about 5–10 pages.", from: "4,300", min: 2, max: 4 },
  { type: "Online store", what: "Product catalogue, cart, checkout with mobile money and cards, and order management.", from: "11,000", min: 5, max: 8 },
  { type: "Web app or portal", what: "A system people sign in to: customer portals, dashboards, school or clinic management.", from: "16,000", min: 6, max: 11 },
  { type: "Mobile app", what: "One app for Android and iOS, built cross-platform and published to both stores.", from: "22,000", min: 8, max: 13 },
  { type: "Mobile app and web platform", what: "Android and iOS apps plus a web app or management portal, sharing one backend.", from: "33,000", min: 11, max: 19 },
];

export const PRICE_OTHER = [
  { name: "Consulting and contract engineering", what: "A day or hourly rate for embedded engineering, reviews and architecture work. Agreed per engagement.", price: "On request" },
  { name: "Retainer", what: "Monthly maintenance or part-time engineering for a product that's already live.", price: "On request" },
];

export const PRICE_MODES = [
  { tag: "Iterative", name: "Sprint by sprint", saves: "Base price", what: "Plan, build, review, adjust. The scope can change as you learn from your users.", best: "Products whose scope will change as you go." },
  { tag: "Iterative + AI", name: "AI-assisted", saves: "About 30% less", what: "The same sprints, with AI speeding up coding, tests and documentation, and me reviewing every line.", best: "Most projects, including existing systems that need to move faster." },
  { tag: "Spec-first", name: "AI-native", saves: "About 50% less", what: "A specification agreed up front, then built to it in milestones. Changes after sign-off are quoted separately.", best: "MVPs and new products with a clear, fixed scope." },
];

export const PRICE_DRIVERS = [
  ["Scope", "How many screens it has and how many kinds of user."],
  ["Platforms", "A website, an Android and iOS app, or both. Cross-platform apps share most of their code."],
  ["Features", "Payments, chat, maps, offline mode and connections to other systems each add time."],
  ["Design", "An adapted template is quickest. Custom and premium design take longer."],
  ["Data and content", "Moving records from spreadsheets or an old system, and writing or translating content."],
  ["Deadline", "A firm, early launch date means more work in parallel."],
];

export const PRICE_RUNNING = [
  ["Hosting and domain", "Servers, the database and your web address, paid to the provider."],
  ["App store accounts", "Google Play: a one-off US$25. Apple's developer program: US$99 a year."],
  ["Payment and SMS fees", "Mobile money, card and SMS providers charge per transaction or message."],
  ["Maintenance", "Plan for roughly 15–20% of the build cost a year."],
];


/* ================= the configurator =================
   DRAFT MODEL. Starting prices and timelines are adapted from Nesisoft's published page.
   Everything marked "mine" below (size, feature, design and deadline multipliers) is a placeholder chosen to
   give sensible ranges. Leslie should replace these numbers. Change them here and the page updates. */

export const BASE = PRICE_PROJECTS.map((p, i) => ({
  id: ["website", "store", "webapp", "mobile", "platform"][i],
  label: p.type, what: p.what, from: Number(p.from.replace(",", "")), min: p.min, max: p.max,
}));

// price multiplier on the starting price (a small build) and a timeline multiplier (published timelines are for a medium build)
export const SIZES = [
  { id: "small", label: "Small", what: "Up to about 10 screens and one kind of user.", price: 1, time: 0.7 },
  { id: "medium", label: "Medium", what: "About 10–25 screens and a couple of user types, such as customers and staff.", price: 1.6, time: 1 }, // mine
  { id: "large", label: "Large", what: "25+ screens, several user types and detailed workflows.", price: 2.6, time: 1.6 }, // mine
];

// each feature adds a share of the starting price, and a little time
export const FEATURES = [
  { id: "accounts", label: "User accounts and sign-in", what: "Sign-up, login and password reset, by email or phone number.", pct: 0.06, wk: 0.5 },
  { id: "payments", label: "Mobile money and card payments", what: "Mobile money on every network, plus Visa and Mastercard.", pct: 0.1, wk: 1 },
  { id: "admin", label: "Admin dashboard", what: "Manage users, content, orders and settings in one place.", pct: 0.1, wk: 1.5 },
  { id: "cms", label: "Editable pages and blog", what: "Update text, photos and news yourself, without a developer.", pct: 0.06, wk: 0.5 },
  { id: "roles", label: "User roles and permissions", what: "Different access for owners, managers, staff and customers.", pct: 0.06, wk: 0.5 },
  { id: "notify", label: "SMS, email and push notifications", what: "Confirmations, reminders and alerts that reach people on time.", pct: 0.06, wk: 0.5 },
  { id: "booking", label: "Bookings and scheduling", what: "Appointments, reservations or classes, with a calendar.", pct: 0.1, wk: 1 },
  { id: "chat", label: "In-app chat", what: "Messages between users, or between customers and your team.", pct: 0.1, wk: 1 },
  { id: "maps", label: "Maps and live location", what: "Show places on a map, track deliveries or find what's nearby.", pct: 0.1, wk: 1 },
  { id: "reports", label: "Reports and analytics", what: "Charts, exports and the numbers you run the business on.", pct: 0.08, wk: 1 },
  { id: "offline", label: "Works offline", what: "Keeps working on a weak connection and syncs when back online.", pct: 0.1, wk: 1.5 },
  { id: "i18n", label: "More than one language", what: "English plus Twi, French or any other language your users need.", pct: 0.05, wk: 0.5 },
  { id: "integrations", label: "Connections to other systems", what: "Accounting, ERP, government or partner APIs you already use.", pct: 0.12, wk: 1.5 },
];

export const DESIGNS = [
  { id: "template", label: "Adapted template", what: "Proven layouts styled with your logo and colours.", pct: 0, wk: 0 },
  { id: "custom", label: "Custom design", what: "Screens designed for your users and brand, prototyped before I build.", pct: 0.2, wk: 1 }, // mine
  { id: "premium", label: "Premium design", what: "Brand-led design with illustrations, motion and extra polish.", pct: 0.35, wk: 2 }, // mine
];

// delivery model: price multiplier on the build (Nesisoft's stated 30% / 50% less)
export const MODES = [
  { id: "sprints", label: "Sprint by sprint", what: "Plan, build, review, adjust. The scope can change as you go.", mult: 1, time: 1, note: "Base price" },
  { id: "assisted", label: "AI-assisted", what: "The same sprints, with AI speeding up coding, tests and documentation, and me reviewing every line.", mult: 0.7, time: 0.85, note: "About 30% less" },
  { id: "native", label: "AI-native", what: "A specification agreed up front, then built in milestones. Changes after sign-off are quoted separately.", mult: 0.5, time: 0.7, note: "About 50% less" },
];

export const PACES = [
  { id: "flexible", label: "Flexible", what: "No fixed deadline: I fit the work around a steady schedule.", price: 0.95, time: 1.25 }, // mine
  { id: "standard", label: "Standard", what: "A steady pace with regular demos along the way.", price: 1, time: 1 },
  { id: "fast", label: "Fast-tracked", what: "Extra capacity to meet a firm launch date.", price: 1.2, time: 0.75 }, // mine
];

// null = "not chosen yet": the estimate falls back to a default for it until the visitor picks
export type Selection = { type: string | null; size: string | null; features: string[]; design: string | null; mode: string | null; pace: string | null };
export const DEFAULTS: Selection = { type: null, size: null, features: [], design: null, mode: null, pace: null };

const round = (n: number, to: number) => Math.round(n / to) * to;
export const cedi = (n: number) => `GH₵${n.toLocaleString("en-GH")}`;

export type Estimate = {
  low: number; high: number; weeksLow: number; weeksHigh: number;
  lines: { label: string; value: string }[];
};

/** The whole model in one place. Returns null until the visitor has chosen what they're building. */
export function estimate(sel: Selection): Estimate | null {
  const base = BASE.find((b) => b.id === sel.type);
  if (!base) return null;
  const size = SIZES.find((x) => x.id === (sel.size ?? "medium"))!, design = DESIGNS.find((x) => x.id === (sel.design ?? "template"))!;
  const mode = MODES.find((x) => x.id === (sel.mode ?? "sprints"))!, pace = PACES.find((x) => x.id === (sel.pace ?? "standard"))!;
  const feats = FEATURES.filter((f) => sel.features.includes(f.id));

  const core = base.from * size.price;
  // features share foundations (sign-in, roles and the admin area are reused), so a long list does not add up in full
  const bundle = feats.length > 5 ? 0.85 : 1;
  const extras = feats.reduce((a, f) => a + base.from * f.pct, 0) * bundle;
  const build = (core + extras) * mode.mult;       // AI shortens the build
  const designCost = core * design.pct;             // design stays human work
  // the published starting price is the floor: stacked discounts never take an estimate below it
  const floored = Math.max((build + designCost) * pace.price, base.from);

  // weeks: the base build, plus feature work that mostly runs in parallel (capped at 90% of the base), plus design time
  const baseWeeks = ((base.min + base.max) / 2) * size.time;
  const featWeeks = Math.min(feats.reduce((a, f) => a + f.wk, 0) * 0.55, baseWeeks * 0.9);
  const weeks = (baseWeeks + featWeeks + design.wk) * mode.time * pace.time;
  const total = floored;

  return {
    low: round(total, 100), high: round(total * 1.25, 100),
    weeksLow: Math.max(1, Math.round(weeks * 0.85)), weeksHigh: Math.max(Math.max(1, Math.round(weeks * 0.85)) + 1, Math.round(weeks * 1.2)),
    lines: [
      { label: `${base.label}, ${size.label.toLowerCase()}`, value: cedi(round(core, 100)) },
      ...(feats.length ? [{ label: `${feats.length} feature${feats.length > 1 ? "s" : ""}`, value: `+ ${cedi(round(extras, 100))}` }] : []),
      ...(mode.mult !== 1 ? [{ label: `${mode.label}`, value: `${mode.note.toLowerCase()}` }] : []),
      ...(total > (build + designCost) * pace.price ? [{ label: "Starting price applies", value: cedi(base.from) }] : []),
      ...(design.pct ? [{ label: design.label, value: `+ ${cedi(round(designCost, 100))}` }] : []),
      ...(pace.price !== 1 ? [{ label: `${pace.label} pace`, value: pace.price > 1 ? `+${Math.round((pace.price - 1) * 100)}%` : `${Math.round((1 - pace.price) * 100)}% less` }] : []),
    ],
  };
}

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

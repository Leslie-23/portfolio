/* All content is sourced from github.com/Leslie-23 (profile README + repo READMEs).
   Nothing here is invented. Edit freely. */

export const PERSON = {
  name: "Leslie Paul Ajayi",
  short: "Leslie",
  role: "Software Engineer",
  place: "Accra, Ghana",
  country: "GHANA",
  email: "leslieajayi27@gmail.com",
  year: 2026,
  links: {
    github: "https://github.com/Leslie-23",
    linkedin: "https://www.linkedin.com/in/leslie-paul-ajayi-45a725279",
    x: "https://x.com/_iam_leslie",
  },
};

export const NAV = [
  { n: "01", label: "WORK", href: "/work", hint: "Things I've built" },
  { n: "02", label: "THE BENCH", href: "/bench", hint: "Things I'm testing" },
  { n: "03", label: "ABOUT", href: "/about", hint: "How I think" },
  { n: "04", label: "TOOLKIT", href: "/toolkit", hint: "What I build with" },
  { n: "05", label: "INFRA", href: "/infra", hint: "What it runs on" },
  { n: "06", label: "NOTES", href: "/notes", hint: "Things I learned" },
  { n: "07", label: "CONTACT", href: "/contact", hint: "Let's figure it out" },
] as const;

export type Category = "PRODUCT" | "WEB" | "MOBILE" | "SYSTEMS" | "EXPERIMENTS";
export const CATEGORIES: Category[] = ["PRODUCT", "WEB", "MOBILE", "SYSTEMS", "EXPERIMENTS"];

export type LayerImg = { src: string; fit?: "cover" | "contain"; bg?: string };
export type Layer = { key: string; label: string; detail: string; img?: LayerImg };
export type Block = { label: string; body: string };

export type Project = {
  slug: string;
  fig: string;
  name: string;
  year: string;
  role: string;
  categories: Category[];
  status: string;
  blurb: string;
  live?: string;
  repo?: string;
  /** folder under /public/work holding desktop.jpg / mobile.jpg (optional) */
  media?: string;
  /** terminal tools etc.: there is no phone screenshot */
  desktopOnly?: boolean;
  /** phone-first app: the SCREENS section shows `gallery` instead of desktop + mobile */
  portrait?: boolean;
  /** a portrait app that also has a website: show desktop/mobile web shots too */
  web?: boolean;
  /** image for the single phone this product becomes when exploded (default: desktop.jpg) */
  phone?: string;
  gallery?: { src: string; caption: string }[];
  accent: "accent" | "red" | "orange" | "green";
  layers: Layer[]; // top (what the user touches) → bottom (what holds it up)
  stack: string[];
  story: Block[]; // each case study has its own rhythm
  decisions: { title: string; body: string }[];
  learnings: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "trofficient",
    fig: "001",
    name: "Trofficient",
    year: "2025—",
    role: "Founder / Engineer",
    categories: ["PRODUCT", "MOBILE", "SYSTEMS"],
    status: "IN DEVELOPMENT",
    blurb:
      "Transit technology for Ghana's informal trotro network: real-time vehicle tracking, dynamic pricing and mobile-money payments.",
    live: "https://mytrofficient.com",
    media: "trofficient",
    portrait: true,
    web: true,
    phone: "/work/trofficient/phone/home.jpg",
    gallery: [
      { src: "/work/trofficient/phone/home.jpg", caption: "RIDER HOME" },
      { src: "/work/trofficient/phone/live.jpg", caption: "LIVE BUS TRACKER" },
      { src: "/work/trofficient/phone/route.jpg", caption: "ROUTE + FARE" },
      { src: "/work/trofficient/phone/booking.jpg", caption: "BOOKING + MOBILE MONEY" },
      { src: "/work/trofficient/phone/wallet.jpg", caption: "WALLET" },
      { src: "/work/trofficient/phone/driverhome.jpg", caption: "DRIVER APP" },
    ],
    accent: "accent",
    layers: [
      { key: "app", label: "RIDER APP", detail: "React Native" },
      { key: "track", label: "LIVE TRACKING", detail: "Where the vehicle is, right now" },
      { key: "route", label: "ROUTING + PRICING", detail: "Predictable journeys, dynamic fares" },
      { key: "pay", label: "PAYMENTS", detail: "Mobile money" },
      { key: "ops", label: "DRIVER + OPERATOR SIDE", detail: "Go online, route map, scan tickets, earnings" },
    ],
    stack: ["React Native", "TypeScript", "Mobile money"],
    story: [
      {
        label: "CONTEXT",
        body: "Bus and shared-commuter transport in Ghana runs on a huge informal network. It works, but it is fragmented: riders can't predict a journey and operators can't see their own fleet.",
      },
      {
        label: "PROBLEM",
        body: "How do you modernise a system that nobody centrally controls, without asking everyone in it to change how they already work?",
      },
      {
        label: "CONSTRAINTS",
        body: "Mobile money over cards. Intermittent connectivity. Low-end devices. These aren't edge cases here. They are the market, and they are the reason the build stays disciplined.",
      },
      {
        label: "APPROACH",
        body: "One ecosystem with two sides: commuters plan predictable journeys, operators optimise routes, pricing and fleet usage. Live vehicle tracking is the thread that connects both.",
      },
      { label: "MY ROLE", body: "Founder. I design and build the product." },
    ],
    decisions: [
      {
        title: "Mobile money first",
        body: "Payments are designed around mobile money from day one rather than bolted on after a card-based flow.",
      },
      {
        title: "Ship the executable MVP, then layer",
        body: "A microservice plan was killed when a monolith shipped faster. Architecture serves delivery, not the reverse.",
      },
    ],
    learnings:
      "Building for this market is a forcing function for discipline. If it survives bad connectivity and cheap phones, it survives everywhere else.",
  },
  {
    slug: "vop",
    fig: "012",
    name: "VoIP",
    year: "2026",
    role: "Architect / Engineer",
    categories: ["PRODUCT", "SYSTEMS", "WEB"],
    status: "API PREVIEW LIVE",
    blurb: "Voice infrastructure you actually own: browser calling by VoIP ID or phone alias, a clean API and call records you control, self-hosted on a single server. Built from scratch.",
    live: "https://vop.mytrofficient.com",
    media: "vop",
    accent: "accent",
    layers: [
      { key: "app", label: "BROWSER CALLING", detail: "Call by VoIP ID or phone alias" },
      { key: "api", label: "API + SDKs", detail: "Tenant-scoped, short-lived tokens, call grants" },
      { key: "int", label: "INTEGRATIONS + WEBHOOKS", detail: "Signed webhooks, call records you control" },
      { key: "engine", label: "VOICE ENGINE + RELAY", detail: "Asterisk 22 (PJSIP, ARI) · Coturn STUN/TURN" },
      { key: "db", label: "POSTGRESQL 16", detail: "Tenants, call history, realtime config" },
    ],
    stack: ["Node.js", "TypeScript", "Asterisk", "WebRTC / SIP", "Coturn", "PostgreSQL", "Docker Compose", "Caddy", "Oracle Cloud (ARM)"],
    story: [
      { label: "THE BRIEF", body: "Adding calling to an app usually means renting someone else's voice platform, so your routing, your call records and your customers' data live on their servers. VoIP is the opposite: voice infrastructure you run yourself, with the control that comes with it." },
      { label: "WHAT PEOPLE GET", body: "Browser calling by VoIP ID or phone alias. A clean API. Call records in your own database. All of it self-hosted on a single server, with SDKs for the web, Node, React Native and Flutter." },
      { label: "HOW A CALL WORKS", body: "Your server issues a short-lived token. The Web SDK places the call from the browser. Asterisk bridges it. Coturn relays the audio when a direct path isn't possible. A signed webhook tells your server what happened." },
      { label: "I BUILT IT FROM SCRATCH", body: "The API and tenancy model, the SDKs, the website and calling app, and the Docker Compose stack that runs the voice engine, from the browser to the database." },
      { label: "THE HARD PART IS THE NETWORK", body: "Voice is a networking problem wearing an application costume. A first build silently left out a database module because one library was missing. Browser contacts weren't being rewritten behind NAT. Endpoints weren't being checked, so every one looked offline and every call would have been rejected. Each of those was found by rehearsing the full stack, not by reading code." },
    ],
    decisions: [
      { title: "Provisioning is a one-shot job", body: "Migrations and provisioning run in a separate container, so the owner-level database credentials never sit inside the long-running API." },
      { title: "Pin everything", body: "Images are pinned to exact versions, and the Asterisk source is checked against the publisher's SHA-256 before it's built." },
      { title: "Fail safe on reconnect", body: "If the control connection to the voice engine drops, affected calls end and unfinished records are marked orphaned, rather than the system guessing what happened." },
      { title: "Test against a fake engine", body: "Call-controller scenarios run against an engine-neutral fake, and a separate stub exercises the real adapter. 40 tests run in the suite, and the PostgreSQL ones run against a disposable database." },
    ],
    learnings: "Most of the bugs weren't in the application code. They were in the network, the build and the configuration around it.",
  },
  {
    slug: "beagine",
    fig: "013",
    name: "Beagine",
    year: "2026",
    role: "CTO",
    categories: ["PRODUCT", "MOBILE", "SYSTEMS"],
    status: "WAITLIST LIVE",
    blurb: "A home-services marketplace for Ghana in three mobile apps: customers book verified specialists, specialists take jobs and get paid, and shops sell to both. I'm the CTO.",
    live: "https://beagine.com",
    media: "beagine",
    accent: "orange",
    layers: [
      { key: "eco", label: "THE ECOSYSTEM", detail: "Customers, specialists and shops on one platform" },
      { key: "customer", label: "BEAGINE (CUSTOMER)", detail: "Book, track, chat, pay", img: { src: "/work/beagine/layers/customer.jpg" } },
      { key: "pro", label: "BEAGINE PRO (SPECIALIST)", detail: "Go online, take jobs, get paid", img: { src: "/work/beagine/layers/specialist.jpg" } },
      { key: "store", label: "BEAGINE STORE (VENDOR)", detail: "Products, orders, payouts", img: { src: "/work/beagine/layers/vendor.jpg" } },
      { key: "api", label: "SHARED BACKEND", detail: "Node API, realtime, payments, push" },
    ],
    stack: ["Expo", "React Native", "TypeScript", "Node.js", "MongoDB", "Socket.IO", "Redis + BullMQ", "Next.js", "Vite"],
    story: [
      { label: "THE IDEA", body: "Finding a plumber, an electrician or a cleaner you can trust shouldn't be luck. Beagine puts verified specialists, local shops and the whole job (request to receipt) in one place." },
      { label: "THREE APPS, ONE PLATFORM", body: "Beagine is for customers who book. Beagine Pro is for specialists who accept and complete jobs. Beagine Store is for local vendors who sell the parts and products. An admin dashboard and a vendor web app sit alongside them." },
      { label: "BUILT FOR GHANA", body: "Mobile Money (MTN, Telecel, AirtelTigo) and card payments, phone and OTP sign-in, Accra-first service areas, and Ghana Card verification for specialists. Funds are held and released when the job is done." },
      { label: "MY ROLE", body: "CTO. I own the technical direction and the architecture across all three apps and the backend, and I build alongside the team." },
    ],
    decisions: [
      { title: "One monorepo, shared everything", body: "The three apps and the admin share UI components, types, state and the API client through workspace packages, so a fix lands everywhere at once." },
      { title: "Build the app before the backend", body: "A dual mock/HTTP API layer with an OpenAPI contract let the apps be built and tested before the backend was finished, then switched to real services by an environment variable." },
      { title: "Trust is the product", body: "Live job tracking, before-and-after photos, approval before any price change, and a receipt for every job." },
    ],
    learnings: "In a marketplace, the hard part isn't any one app. It's keeping three of them telling the same story about the same job.",
  },
  {
    slug: "steppool",
    fig: "002",
    name: "StepPool",
    year: "2026",
    role: "Engineer",
    categories: ["PRODUCT", "MOBILE", "SYSTEMS"],
    status: "SHIPPED TO REPO",
    blurb: "Walk. Hit your goal. Share the pool. A step-challenge app where everyone who hits their goal splits the pool.",
    live: "https://steppool-web.onrender.com",
    repo: "https://github.com/Leslie-23/steppool",
    media: "steppool",
    portrait: true,
    gallery: [
      { src: "/work/steppool/gallery/03-today.jpg", caption: "TODAY" },
      { src: "/work/steppool/gallery/04-challenges.jpg", caption: "CHALLENGES" },
      { src: "/work/steppool/gallery/05-live-challenge.jpg", caption: "LIVE CHALLENGE" },
      { src: "/work/steppool/gallery/08-create-challenge.jpg", caption: "CREATE" },
      { src: "/work/steppool/gallery/09-results.jpg", caption: "RESULTS" },
      { src: "/work/steppool/gallery/10-wallet.jpg", caption: "WALLET" },
    ],
    accent: "green",
    layers: [
      { key: "app", label: "EXPO APP", detail: "Expo Router · HealthKit / Health Connect" },
      { key: "ds", label: "DESIGN SYSTEM", detail: "StepRing, Odometer, HoldButton, Particles" },
      { key: "wire", label: "SHARED CONTRACTS", detail: "zod schemas + goal maths, used by app AND server" },
      { key: "api", label: "API + REALTIME", detail: "Express · Socket.IO" },
      { key: "data", label: "DATA + JOBS", detail: "MongoDB · Redis · BullMQ" },
    ],
    stack: ["Expo", "TypeScript", "Express", "MongoDB", "Redis", "Socket.IO", "BullMQ", "zod"],
    story: [
      {
        label: "THE RULE",
        body: "Players join a challenge (48h, 7d or 30d). Each gets a personal goal based on their own usual week. Everyone who hits their goal splits the pool. Rank is for bragging rights; payouts depend only on your own goal.",
      },
      {
        label: "TWO MODES",
        body: "Credits challenges cost demo credits (1,000 on signup) and split the pool between finishers; if nobody finishes, everyone is refunded. Sponsored challenges are free to enter and a brand funds a prize, claimed via MoMo.",
      },
      {
        label: "THE LINE NOT CROSSED",
        body: "No real-money entry. A PAID_ENTRY_ENABLED flag exists but stays off until legal review. A sponsored prize is a promotion, not a wager.",
      },
      {
        label: "HOW IT'S BUILT",
        body: "App screens flow auth → onboarding → tabs → arena → results. A server process runs lifecycle jobs: start, last-hour push, settle, and a 5-minute sweep. An iOS home/lock-screen widget ships alongside.",
      },
    ],
    decisions: [
      {
        title: "One contract, both ends",
        body: "Wire contracts and goal maths live in a shared package validated with zod, so the app and the server can never disagree about what a goal is.",
      },
      {
        title: "Money-shaped logic needs transactions",
        body: "MongoDB runs as a replica set because transactions require one. Pool settlement can't be half-done.",
      },
      {
        title: "Ship the product, gate the risk",
        body: "The legally uncertain feature is built, tested and switched off. Turning it on is a decision, not a deploy.",
      },
    ],
    learnings: "The interesting engineering in a game about walking is the settlement logic nobody sees.",
  },
  {
    slug: "four-man-chess",
    fig: "003",
    name: "4-Man Chess",
    year: "2026",
    role: "Engineer",
    categories: ["WEB", "SYSTEMS", "EXPERIMENTS"],
    status: "PLAYABLE",
    blurb: "Chess for 2, 3 or 4 players: classic, hexagon and cross boards, with friends or bots.",
    repo: "https://github.com/Leslie-23/4-man-chess",
    media: "four-man-chess",
    accent: "orange",
    layers: [
      { key: "web", label: "NEXT.JS CLIENT", detail: "Lobby, board, live updates" },
      { key: "evt", label: "TYPED EVENTS", detail: "Shared Socket.IO event types" },
      { key: "srv", label: "GAME SERVER", detail: "Fastify + Socket.IO, authoritative" },
      { key: "eng", label: "GAME ENGINE", detail: "Pure TypeScript rules, zero runtime deps" },
      { key: "bot", label: "BOTS", detail: "Easy · Hard · Advanced" },
    ],
    stack: ["Next.js", "TypeScript", "Fastify", "Socket.IO", "pnpm", "Turborepo"],
    story: [
      {
        label: "WHAT IT IS",
        body: "Classic 8×8, a three-player hexagon and a four-player cross. Every seat is a friend joining with a room code, or a bot.",
      },
      {
        label: "SHAPE OF THE REPO",
        body: "A pnpm + Turborepo monorepo. The rules live in one pure TypeScript package with no runtime dependencies, shared by the web client and the game server.",
      },
      {
        label: "THE SERVER IS THE REFEREE",
        body: "The server is authoritative and keeps rooms in memory. A reload or dropped connection puts you back in your seat. Anyone joining a full game watches.",
      },
      {
        label: "TESTING THE BOTS",
        body: "Bots aren't just named, they're measured. Hard never got knocked out in 40 games against three Easy bots. Advanced won 25 of 40 against three Hard bots, where even would be 10.",
      },
    ],
    decisions: [
      {
        title: "Rules as a library, not a feature",
        body: "Because the engine has no dependencies, the same code validates a move in the browser and on the server.",
      },
      {
        title: "Bots join like any other device",
        body: "A script can add bots from the terminal over Socket.IO, exactly like a player on a phone. No special path.",
      },
    ],
    learnings: "Three- and four-player chess breaks assumptions that 'chess' code quietly makes: turn order, check, elimination.",
  },
  {
    slug: "scrapy-mcp",
    fig: "004",
    name: "scrapy-mcp",
    year: "2026",
    role: "Engineer",
    categories: ["SYSTEMS", "EXPERIMENTS"],
    status: "WORKING",
    blurb: "Scrapy web-scraping tools for ChatGPT, served as a remote MCP server with a results widget.",
    repo: "https://github.com/Leslie-23/scrapy-mcp",
    accent: "red",
    layers: [
      { key: "ui", label: "CHATGPT WIDGET", detail: "MCP Apps view of results" },
      { key: "mcp", label: "MCP SERVER", detail: "Streamable HTTP, optional secret path" },
      { key: "tools", label: "THREE TOOLS", detail: "scrape_page · extract · crawl_site" },
      { key: "proc", label: "SUBPROCESS", detail: "scrapy runspider, one per call" },
      { key: "safe", label: "SAFETY MIDDLEWARE", detail: "Checked on every redirect and link" },
    ],
    stack: ["Python", "Scrapy", "MCP", "pytest"],
    story: [
      {
        label: "THE QUESTION",
        body: "Can a language model get a reliable, safe pair of hands on the open web?",
      },
      {
        label: "THE ANSWER IS THREE TOOLS",
        body: "scrape_page returns title, description, readable text and links. extract returns values for named CSS or XPath selectors. crawl_site walks a same-host crawl (≤50 pages, depth ≤3).",
      },
      {
        label: "THE HARD PART",
        body: "Giving an AI a crawler means giving it a way to reach things it shouldn't. So robots.txt is obeyed, responses are capped at 5 MB, only ports 80/443 are allowed, and any host resolving to private, loopback, link-local or cloud-metadata addresses is refused, before the crawl and on every redirect.",
      },
    ],
    decisions: [
      {
        title: "A subprocess per call",
        body: "Scrapy's Twisted reactor never touches the server's event loop, and a stuck crawl is killed after 30 s (90 s for crawls).",
      },
      {
        title: "Quiet logs when secret",
        body: "Set MCP_AUTH_TOKEN and the endpoint moves to /mcp/<token>. The access log is switched off so the token never lands in it.",
      },
    ],
    learnings: "Safety belongs in the middleware that every request passes through, not in each tool that remembers to check.",
  },
  {
    slug: "ai-sme",
    fig: "005",
    name: "AI for SMEs",
    year: "2026",
    role: "Engineer",
    categories: ["PRODUCT", "WEB"],
    status: "LIVE DEMO",
    blurb: "Business intelligence for small and medium businesses, live as Intellexa: an assistant that answers questions about real sales, inventory and expense data.",
    live: "https://ai-sme-eight.vercel.app",
    repo: "https://github.com/Leslie-23/ai-sme",
    media: "ai-sme",
    accent: "accent",
    layers: [
      { key: "ui", label: "REACT + VITE CLIENT", detail: "Dashboards and the assistant" },
      { key: "api", label: "EXPRESS API", detail: "TypeScript, JWT on every route but /auth" },
      { key: "ai", label: "PROVIDER LAYER", detail: "OpenAI · Anthropic · Google · Groq · OpenRouter · Mistral" },
      { key: "dom", label: "DOMAIN", detail: "Products · sales · inventory · payments · expenses" },
      { key: "db", label: "MONGODB", detail: "Mongoose models" },
    ],
    stack: ["React", "Vite", "Tailwind", "Node.js", "Express", "TypeScript", "MongoDB"],
    story: [
      {
        label: "THE IDEA",
        body: "Small businesses already collect sales, stock and expense data. The missing piece is someone to ask. So: ask it in plain language, and get answers from the business's own numbers.",
      },
      {
        label: "TENANCY",
        body: "A JWT carries user, business, role and email. Middleware attaches them to every request so controllers only ever query within the caller's own business.",
      },
      {
        label: "THE AI IS A PLUG",
        body: "The model provider is swappable: OpenAI, Anthropic, Google, Groq, OpenRouter or Mistral. The product doesn't depend on which one wins.",
      },
    ],
    decisions: [
      {
        title: "Sales decrement stock atomically",
        body: "Recording a sale and moving the inventory happen as one operation, with an inventory log entry, so the numbers the assistant reads can be trusted.",
      },
      {
        title: "Pluggable by design",
        body: "A provider layer rather than a provider SDK sprinkled through the code.",
      },
    ],
    learnings: "An assistant is only as honest as the data model behind it.",
  },
  {
    slug: "elena",
    fig: "006",
    name: "Elena",
    year: "2026",
    role: "Engineer",
    categories: ["SYSTEMS", "EXPERIMENTS"],
    status: "WORKING",
    blurb: "A local-first developer assistant. The LLM runs on your Mac through Ollama; Elena gives it a small set of typed, sandboxed tools.",
    repo: "https://github.com/Leslie-23/elena",
    media: "elena",
    desktopOnly: true,
    accent: "green",
    layers: [
      { key: "cli", label: "CLI", detail: "Type `elena` in any project folder" },
      { key: "tools", label: "TYPED TOOLS", detail: "Small, sandboxed" },
      { key: "mem", label: "MEMORY", detail: "Notes kept in ~/.elena" },
      { key: "llm", label: "LOCAL MODEL", detail: "Ollama on your machine" },
      { key: "hook", label: "CLAUDE CODE / CODEX", detail: "Connected during setup" },
    ],
    stack: ["TypeScript", "Node 22", "Ollama"],
    story: [
      {
        label: "THE QUESTION",
        body: "How much of a developer's day can be handled by a model that never leaves the laptop?",
      },
      {
        label: "THE BOUNDARY",
        body: "The model is not trusted with the machine. It's given a small set of typed, sandboxed tools, and that's all.",
      },
      {
        label: "THE INSTALL",
        body: "One curl line. It checks git and Node 22+, builds into ~/.elena, puts `elena` on PATH, then checks Ollama and suggests a model that fits your RAM.",
      },
    ],
    decisions: [
      {
        title: "Local first",
        body: "Summaries, first-pass searches and a free second-opinion review stay on the machine.",
      },
      {
        title: "Reversible install",
        body: "Re-running the installer is safe. Uninstalling is deleting two paths.",
      },
    ],
    learnings: "Constraining a tool is more useful than empowering it.",
  },

  {
    slug: "uat-tracker",
    fig: "007",
    name: "UAT Tracker",
    year: "2026",
    role: "Engineer",
    categories: ["PRODUCT", "SYSTEMS", "WEB"],
    status: "LIVE",
    blurb: "Testers walk through test cases per app and platform and record Pass, Fail, Blocked or N/A, with notes and screenshots. A read-only MCP server hands the failures to Claude Code.",
    live: "https://uat-tracker-standalone.vercel.app",
    repo: "https://github.com/Leslie-23/uat",
    media: "uat",
    accent: "orange",
    layers: [
      { key: "ui", label: "TESTER UI", detail: "One page: cases, results, notes, screenshots" },
      { key: "api", label: "EXPRESS API", detail: "Also deployed to Vercel via api/index.js" },
      { key: "plan", label: "TEST PLAN", detail: "Seeded from seed_data.json" },
      { key: "db", label: "MONGODB", detail: "Results, notes, history" },
      { key: "mcp", label: "MCP SERVER", detail: "Read-only: failed cases to Claude Code" },
    ],
    stack: ["Node.js", "Express", "MongoDB", "MCP", "Vercel"],
    story: [
      { label: "THE JOB", body: "A tester opens an app, picks a platform and works through its cases. Each case ends as Pass, Fail, Blocked or N/A, with a note and a screenshot if something went wrong." },
      { label: "THE TWIST", body: "The test results are not just a report. A small read-only MCP server lets Claude Code and other MCP clients fetch the failed cases directly, so the thing that found the bug can hand it to the thing that fixes it." },
      { label: "THE BOUNDARY", body: "The MCP server is read-only by design. It can show what failed, who tested it and what the evidence was. It cannot mark anything as passed. Only a tester re-running the case can do that." },
    ],
    decisions: [
      { title: "Evidence is screenshots", body: "Every result can carry a screenshot and a tester note, and the effective result is the most recent record per case and platform." },
      { title: "An AI reads; a human signs off", body: "Fixing code never changes a test status. Closing the loop needs a person." },
    ],
    learnings: "Tooling for AI agents is mostly about what you refuse to let them do.",
  },
  {
    slug: "stewardly",
    fig: "008",
    name: "Stewardly",
    year: "2026",
    role: "Engineer",
    categories: ["PRODUCT", "WEB"],
    status: "LIVE",
    blurb: "Smart duty scheduling for service teams: churches, nonprofits and volunteer groups. One click generates a fair, skill-balanced roster.",
    live: "https://church-scheduler-indol.vercel.app",
    repo: "https://github.com/Leslie-23/churchScheduler",
    media: "stewardly",
    accent: "green",
    layers: [
      { key: "pwa", label: "INSTALLABLE PWA", detail: "Vanilla HTML/CSS/JS, offline-capable" },
      { key: "engine", label: "ROSTER ENGINE", detail: "Skills, availability, rotation, attire, reliability" },
      { key: "swap", label: "SMART REPLACEMENTS", detail: "Ranked candidates with scores and reasons" },
      { key: "comms", label: "SMS + AI REPORTS", detail: "Arkesel SMS, Groq (LLaMA) questions" },
      { key: "data", label: "AUTH + DATA", detail: "JWT, Google OAuth, MongoDB" },
    ],
    stack: ["Node.js", "Express", "MongoDB", "Passport / Google OAuth", "Groq", "PWA"],
    story: [
      { label: "THE PROBLEM", body: "Weekly rosters for ushers, media, protocol, choir and hospitality teams usually live in spreadsheets and WhatsApp threads, and get decided by whoever remembers who served last." },
      { label: "ONE CLICK", body: "The roster generator weighs each member's skills, availability, rotation history, attire requirements and reliability score, so the schedule is fair because the rules are written down, not because someone is keeping track." },
      { label: "WHEN SOMEONE CANCELS", body: "Instead of a panicked group message, Stewardly ranks replacement candidates with a score and the reasoning behind it." },
      { label: "BUILT FOR REAL TEAMS", body: "Multiple units under one account, each with its own members and settings. New members can browse and request to join; admins approve. Three roles: Owner, Admin, Member." },
    ],
    decisions: [
      { title: "No front-end framework", body: "Plain HTML, CSS and JavaScript with a service worker and manifest. It installs like an app and loads fast on cheap phones." },
      { title: "SMS where people actually are", body: "Duty reminders and broadcasts go to members' phones through an SMS provider, not another app they have to open." },
      { title: "Explainable suggestions", body: "Replacement candidates come with scores and reasons, so an admin can trust or override them." },
    ],
    learnings: "A roster is a fairness problem before it's a calendar problem.",
  },
  {
    slug: "attendance",
    fig: "009",
    name: "Attendance",
    year: "2026",
    role: "Engineer",
    categories: ["PRODUCT", "WEB", "SYSTEMS"],
    status: "LIVE",
    blurb: "QR clock-in for small shops, verified by WiFi and GPS. No hardware, no subscription, just a phone and a QR code.",
    live: "https://employee-attendance-tracker-nine.vercel.app",
    repo: "https://github.com/Leslie-23/employeeAttendanceTracker",
    media: "attendance",
    accent: "accent",
    layers: [
      { key: "qr", label: "PERSONAL QR", detail: "Each employee's code opens their own clock page" },
      { key: "presence", label: "PRESENCE CHECK", detail: "Office WiFi, then GPS within 100 m" },
      { key: "api", label: "EXPRESS API", detail: "Vercel serverless functions" },
      { key: "admin", label: "ADMIN DASHBOARD", detail: "Employees, printable QR, analytics, corrections" },
      { key: "log", label: "AUDIT LOG", detail: "MongoDB Atlas: time, IP, GPS, how it was verified" },
    ],
    stack: ["Node.js", "Express", "MongoDB Atlas", "Chart.js", "Vercel"],
    story: [
      { label: "THE PROBLEM", body: "Small shops track attendance with paper sheets (easy to fake), fingerprint machines (expensive hardware that breaks), HR software (overkill) or a shared tablet (anyone can tap in for anyone)." },
      { label: "THE IDEA", body: "Make every employee's phone their clock-in device and make their unique QR code their identity. Scanning it opens their personal page, where one tap clocks them in or out." },
      { label: "A QR ISN'T ENOUGH", body: "Someone could photograph a colleague's code and scan it from home. So the server checks physical presence: first the shop's WiFi, then a GPS geofence of 100 metres as fallback." },
      { label: "THE HONEST FALLBACK", body: "If WiFi fails but GPS passes, the record is accepted but flagged in the log, so the admin can see which clock-ins used the fallback." },
    ],
    decisions: [
      { title: "No build step, no framework", body: "Plain HTML, CSS and JS on the front end. QR codes are generated server-side." },
      { title: "Every record explains itself", body: "Each clock-in stores a timestamp, IP, GPS coordinates and the method that verified it." },
    ],
    learnings: "The cheapest hardware is the one everyone already owns, as long as the server doesn't take its word for where it is.",
  },
  {
    slug: "de-sams-studio",
    fig: "010",
    name: "De Sam's Studio",
    year: "2026",
    role: "Engineer",
    categories: ["WEB", "PRODUCT"],
    status: "LIVE",
    blurb: "Photography, videography and editing studio in Accra: a Next.js site with a gallery, services and booking leads, backed by its own admin API.",
    live: "https://desamsstudio.vercel.app",
    repo: "https://github.com/Leslie-23/sammy",
    media: "de-sams-studio",
    accent: "red",
    layers: [
      { key: "site", label: "NEXT.JS SITE", detail: "Portfolio, gallery, about, services, contact" },
      { key: "motion", label: "MOTION LAYER", detail: "GSAP + Framer Motion" },
      { key: "api", label: "EXPRESS 5 API", detail: "Auth, gallery, categories, leads, testimonials" },
      { key: "media", label: "MEDIA", detail: "Cloudinary uploads" },
      { key: "data", label: "MONGODB", detail: "Images, leads, testimonials, users" },
    ],
    stack: ["Next.js 16", "React 19", "Tailwind 4", "GSAP", "Framer Motion", "Express 5", "TypeScript", "MongoDB", "Cloudinary"],
    story: [
      { label: "THE BRIEF", body: "A photographer's site has to do two things: make the work look as good as the work, and turn a visitor into a booking." },
      { label: "TWO APPS", body: "A Next.js front end handles the portfolio, gallery, services, about, contact and testimonials pages. A separate Express 5 API handles auth, gallery images, categories, leads, testimonials and a dashboard." },
      { label: "THE STUDIO RUNS IT", body: "Images are uploaded to Cloudinary through the API behind JWT auth, so the studio can manage its own gallery and read incoming leads without touching code." },
    ],
    decisions: [
      { title: "Front end and API split", body: "The marketing site and the management API deploy and change independently." },
      { title: "Leads are first-class data", body: "Enquiries are stored in the database and shown in a dashboard, not lost in an inbox." },
    ],
    learnings: "A portfolio site is a sales tool. The gallery sells the work; the lead form sells the studio.",
  },

  {
    slug: "campus-connect",
    fig: "011",
    name: "Campus Connect",
    year: "2025—",
    role: "Engineer (team project)",
    categories: ["PRODUCT", "MOBILE", "SYSTEMS"],
    status: "IN DEVELOPMENT",
    blurb: "A university social and collaboration app: feed, events, connections, chat and a live campus map in one place. Its public site is uniCLIQ.",
    live: "https://unicliq-web.vercel.app",
    repo: "https://github.com/Campus-Connect-v1/campus-connect",
    media: "campus-connect",
    portrait: true,
    web: true,
    phone: "/work/campus-connect/gallery/home.jpg",
    gallery: [
      { src: "/work/campus-connect/gallery/home.jpg", caption: "HOME FEED" },
      { src: "/work/campus-connect/gallery/events.jpg", caption: "EVENTS" },
      { src: "/work/campus-connect/gallery/connect.jpg", caption: "CONNECT" },
      { src: "/work/campus-connect/gallery/campus-map.jpg", caption: "CAMPUS MAP" },
      { src: "/work/campus-connect/gallery/chat.jpg", caption: "GROUP CHAT" },
      { src: "/work/campus-connect/gallery/profile.jpg", caption: "PROFILE" },
    ],
    accent: "red",
    layers: [
      { key: "app", label: "EXPO APP", detail: "iPhone-first, Expo Router" },
      { key: "social", label: "FEED + EVENTS", detail: "Posts, stories, polls, events" },
      { key: "connect", label: "CONNECTIONS", detail: "Requests, matching, privacy settings" },
      { key: "map", label: "CAMPUS MAP", detail: "Buildings, rooms, friend map, geofencing" },
      { key: "api", label: "API + REALTIME", detail: "Express, Socket.IO, MySQL, Redis, push" },
    ],
    stack: ["Expo", "React Native", "TypeScript", "Express", "Socket.IO", "MySQL", "Redis", "Render"],
    story: [
      { label: "THE IDEA", body: "A campus has plenty going on and nowhere to see it: events on notice boards, groups in chats, friends somewhere on the map. Campus Connect puts the feed, events, connections, chat and a live campus map in one app." },
      { label: "WHAT'S INSIDE", body: "A feed with stories and polls. Events you can mark as going. Connection requests and people you may know. Direct and group chats with photos and polls. Profiles built from your course and interests. And a campus map with every building and room, plus a friend map." },
      { label: "THE SOCIAL LOOP", body: "The feed, matching and privacy settings all depend on connections, so the request-accept-decline loop is the spine of the product. Without a way to accept a request, the graph never forms, and none of the rest can work." },
      { label: "BUILT LIKE A PRODUCT", body: "The repo carries a real App Store checklist: in-app account deletion, content reporting, terms and privacy inside the app, seeded review accounts, and a keep-awake job so a free-tier API doesn't greet a reviewer with a blank screen." },
    ],
    decisions: [
      { title: "Audit the API against the app", body: "The server has 125 routes. A written audit tracks which ones the app actually uses, which are admin-only, and which are blocked on the backend, so 'done' means something." },
      { title: "Location is safe by default", body: "Sharing, the friend map and geofencing are features people can get wrong, so the debug location endpoints return 404 in production." },
      { title: "Realtime where it counts", body: "Chat runs over Socket.IO. Everything else stays on plain, documented HTTP routes." },
    ],
    learnings: "A social app is a graph first. Until someone can accept a request, nothing built on top of connections can exist.",
  },
];

export const getProject = (slug: string) => PROJECTS.find((p) => p.slug === slug);

/* Real screens for the lower layers of each exploded view: each layer shows a different part of the app.
   Files live in /public/work/<slug>/layers (or the steppool gallery). */
const w = (slug: string, key: string, ext = "jpg"): LayerImg => ({ src: `/work/${slug}/layers/${key}.${ext}` });
const LAYER_MEDIA: Record<string, Record<string, LayerImg>> = {
  trofficient: {
    track: { src: "/work/trofficient/phone/live.jpg" },
    route: { src: "/work/trofficient/phone/route.jpg" },
    pay: { src: "/work/trofficient/phone/wallet.jpg" },
    ops: { src: "/work/trofficient/phone/driverhome.jpg" },
  },
  steppool: {
    ds: { src: "/work/steppool/gallery/04-challenges.jpg" },
    wire: { src: "/work/steppool/gallery/14-daily-target.jpg" },
    api: { src: "/work/steppool/gallery/05-live-challenge.jpg" },
    data: { src: "/work/steppool/gallery/09-results.jpg" },
  },
  "four-man-chess": { evt: w("four-man-chess", "evt"), srv: w("four-man-chess", "srv"), eng: w("four-man-chess", "eng") },
  "ai-sme": { api: w("ai-sme", "api"), ai: w("ai-sme", "ai"), dom: w("ai-sme", "dom"), db: w("ai-sme", "db") },
  elena: { tools: w("elena", "tools"), mem: w("elena", "mem"), llm: w("elena", "llm"), hook: w("elena", "hook") },
  vop: {
    app: { src: "/work/vop/layers/app.jpg" },
    api: { src: "/work/vop/layers/api.jpg" },
    int: { src: "/work/vop/layers/integrations.jpg" },
  },
  "campus-connect": {
    social: { src: "/work/campus-connect/gallery/events.jpg" },
    connect: { src: "/work/campus-connect/gallery/connect.jpg" },
    map: { src: "/work/campus-connect/gallery/campus-map.jpg" },
    api: { src: "/work/campus-connect/gallery/chat.jpg" },
  },
  stewardly: { engine: w("stewardly", "engine"), swap: w("stewardly", "swap"), comms: w("stewardly", "comms"), data: w("stewardly", "data") },
  attendance: { presence: w("attendance", "presence"), api: w("attendance", "api"), admin: w("attendance", "admin"), log: w("attendance", "log") },
  "de-sams-studio": { motion: w("de-sams-studio", "motion"), api: w("de-sams-studio", "api"), media: w("de-sams-studio", "media"), data: w("de-sams-studio", "data") },
};
for (const p of PROJECTS) for (const l of p.layers) { const m = LAYER_MEDIA[p.slug]?.[l.key]; if (m) l.img = m; }

/* ---------------- Shipped & live ---------------- */
export type Shipped = {
  slug: string; // folder under /public/work
  name: string;
  year: string;
  kind: string;
  categories: Category[];
  blurb: string;
  live: string;
  repo?: string;
  stack?: string[];
};

export const SHIPPED: Shipped[] = [
  { slug: "sellis", name: "Sellis Beauty Spa", year: "2026", kind: "BUSINESS SITE", categories: ["WEB"], blurb: "Luxury beauty and spa in Accra: hair, spa, nails, waxing and lash treatments. Live on its own domain.", live: "https://sellisspa.com", stack: ["React", "Vite"] },
  { slug: "captivating-home", name: "Captivating Home & Trading", year: "2026", kind: "RETAIL PLATFORM", categories: ["WEB", "PRODUCT"], blurb: "Platform for a Ghanaian retail operation: home appliances, electricity vending and currency exchange. Live on its own domain.", live: "https://captivatinghometrade.com" },
  { slug: "nenecollectionz", name: "Nene Collectionz", year: "2026", kind: "STOREFRONT", categories: ["WEB"], blurb: "Wigs, wholesale and retail from Spintex, Accra: braided wigs, frontals and glueless units, ordered on WhatsApp and shipped worldwide.", live: "https://nene-collectionz.leslieajayi27.workers.dev/" },
  { slug: "rate-desk", name: "GHS to NGN Rate Desk", year: "2026", kind: "INTERNAL TOOL", categories: ["WEB", "SYSTEMS"], blurb: "Internal rate calculator with MongoDB-backed shared rates, so a whole team quotes the same number.", live: "https://rate-calc-kappa.vercel.app", repo: "https://github.com/Leslie-23/rateCalc", stack: ["Node.js", "MongoDB"] },
  { slug: "ecommerce", name: "PAL Shop", year: "2024", kind: "WEB APP", categories: ["WEB", "PRODUCT"], blurb: "E-commerce app where you can buy goods and sell them, with accounts, a cart and a checkout flow.", live: "https://paltech-e-commerce.netlify.app", stack: ["React"] },
  { slug: "grilli", name: "Grilli", year: "2024", kind: "TEMPLATE", categories: ["WEB"], blurb: "A restaurant landing page, hand-built in HTML and CSS.", live: "https://web-plusplus.vercel.app", repo: "https://github.com/Leslie-23/web-plusplus" },
  { slug: "dev-ex", name: "Dev Ex", year: "2025", kind: "WEB APP", categories: ["WEB", "EXPERIMENTS"], blurb: "Daily coding challenges for every skill level, with progress tracking, leaderboards and AI-powered feedback.", live: "https://leslie23-dev-experience2k25.netlify.app", repo: "https://github.com/Leslie-23/DEV-experience" },
];

/** When a project is deployed to its own subdomain on leslieajayi.com, add it here.
 *  The site will link to the subdomain instead of the old host. */
export const DOMAIN = "leslieajayi.com";
export const SUBDOMAINS: Record<string, string> = {
  // trofficient: "trofficient",    -> https://trofficient.leslieajayi.com
  // steppool: "steppool",
};
export const liveFor = (slug: string, fallback?: string) =>
  SUBDOMAINS[slug] ? `https://${SUBDOMAINS[slug]}.${DOMAIN}` : fallback;

/* ---------------- Bench ---------------- */
export type ExpStatus =
  | "TESTING"
  | "BROKEN"
  | "WORKING"
  | "ABANDONED"
  | "PROMISING"
  | "EXPLORATORY";

export type Experiment = {
  id: string;
  date: string;
  status: ExpStatus;
  question: string;
  result: string;
  kind?: "disassemble" | "velocity" | "system" | "board" | "lens" | "link";
  href?: string;
};

export const EXPERIMENTS: Experiment[] = [
  {
    id: "001",
    date: "2026.11",
    status: "WORKING",
    question: "Can a website take itself apart, and put itself back together?",
    result: "Yes. Press the button. It's reversible, which was the hard part.",
    kind: "disassemble",
  },
  {
    id: "002",
    date: "2026.11",
    status: "PROMISING",
    question: "Can an interaction be driven entirely by scroll velocity?",
    result: "Scroll this page. The bar below is reading your speed, not your position.",
    kind: "velocity",
  },
  {
    id: "003",
    date: "2026.11",
    status: "WORKING",
    question: "What does a system look like when you can pull on it?",
    result: "Drag the nodes. The connections stay attached. Then reset it.",
    kind: "system",
  },
  {
    id: "004",
    date: "2026.10",
    status: "WORKING",
    question: "How do you address a chessboard shaped like a cross?",
    result: "A 14×14 grid with the four corner blocks cut out. Hover for coordinates.",
    kind: "board",
  },
  {
    id: "005",
    date: "2026.11",
    status: "TESTING",
    question: "Can a cursor be a scanner?",
    result: "Hold ALT (or tap SCAN on touch) over the plate to see the wireframe underneath.",
    kind: "lens",
  },
  {
    id: "006",
    date: "2026.05",
    status: "TESTING",
    question: "What changes if AI is a first-class primitive in an operating system, rather than an assistant bolted on top?",
    result: "osAfrica. In active development. Nothing to show yet, which is its own kind of status.",
    kind: "link",
    href: "https://github.com/Leslie-23/osAfrica",
  },
  {
    id: "007",
    date: "2024.10",
    status: "EXPLORATORY",
    question: "Can a keyboard be a beat machine?",
    result: "keyboardBeatMachine: the computer keyboard as a beat machine.",
    kind: "link",
    href: "https://github.com/Leslie-23/keyboardBeatMachine",
  },
  {
    id: "008",
    date: "2024.10",
    status: "ABANDONED",
    question: "What does the Chrome dino game do when you stop playing fair?",
    result: "ChromeDino-cheatCode: a cheat code for the Chrome dino game. Question answered.",
    kind: "link",
    href: "https://github.com/Leslie-23/ChromeDino-cheatCode",
  },
];

export const STATUS_TIPS: Record<ExpStatus, string> = {
  TESTING: "Under active investigation",
  BROKEN: "Known to fail; kept for what it taught",
  WORKING: "Does what the question asked",
  ABANDONED: "Question answered; not pursued further",
  PROMISING: "Worth taking further",
  EXPLORATORY: "Built to understand something, not to ship",
};

/* ---------------- Experience ----------------
   Sources: docs/designer-pack/BRIEF.md (sections 1 and 4) and Leslie's own resume.
   Employer work is name + public description only. Client sites are NOT listed here until Leslie confirms (BRIEF §4). */
export type Role = {
  org: string; role: string; period: string; kind: "Employment" | "Founder" | "Leadership" | "Contribution";
  summary: string; points?: string[]; stack?: string[]; href?: string; internal?: boolean; current?: boolean;
};
export const EXPERIENCE: Role[] = [
  { org: "Global Icons", role: "Software Engineer", period: "Present", kind: "Employment", current: true, href: "https://globaliconsagency.com",
    summary: "A technology company in Accra building digital systems for transport, education, public services, payments and governance.",
    points: ["Production engineering inside an organisation whose systems are confidential, so this entry stays at a public level."] },
  { org: "Beagine", role: "CTO", period: "2026", kind: "Leadership", current: true, href: "/work/beagine", internal: true,
    summary: "A home-services marketplace for Ghana in three mobile apps. I own the technical direction and the architecture across all three apps and the backend, and build alongside the team.",
    points: ["One monorepo: the three apps and the admin share UI, types, state and the API client.", "A mock/HTTP API layer with an OpenAPI contract, so the apps were built and tested before the backend was finished.", "Mobile Money and card payments, phone/OTP sign-in and Ghana Card verification for specialists."],
    stack: ["Expo", "React Native", "TypeScript", "Node.js", "MongoDB", "Socket.IO", "Redis + BullMQ"] },
  { org: "Trofficient", role: "Founder / Engineer", period: "2025 — Present", kind: "Founder", current: true, href: "/work/trofficient", internal: true,
    summary: "Transit technology for Ghana's informal trotro network: real-time vehicle tracking, dynamic pricing and mobile-money payments. I design and build the product.",
    points: ["Payments designed around mobile money from day one, not bolted onto a card flow.", "Killed a microservice plan when a monolith shipped faster.", "A self-managed production stack on Oracle Cloud: Docker Compose behind Caddy."],
    stack: ["React Native", "TypeScript", "Node.js", "Docker", "Caddy"] },
  { org: "NSS", role: "Caching system", period: "—", kind: "Contribution",
    summary: "I worked on its caching system." },
];
export const EDUCATION = {
  school: "Regional Maritime University", degree: "BSc Information Technology", period: "2022 — 2026",
  awards: ["Best in IT Project Management", "Best in Data Structures"],
};

/* How Leslie works through a problem. The sequence, not a slogan. */
export const APPROACH: { k: string; t: string; b: string }[] = [
  { k: "01", t: "Understand", b: "Take the existing system apart first: the data model, the incentives, where it actually breaks." },
  { k: "02", t: "Find the constraint", b: "Name the one thing that decides the design. In Ghana it's usually connectivity, devices or mobile money." },
  { k: "03", t: "Ship the smallest real version", b: "An executable MVP in front of real users beats an architecture diagram. Monolith first." },
  { k: "04", t: "Observe", b: "Watch it run in production. The failure modes nobody planned for are the interesting ones." },
  { k: "05", t: "Layer", b: "Add structure where the load proves it's needed: queues, caches, services. Not before." },
];

/* What he's drawn to, each with the work that shows it. */
export const INTERESTS: { t: string; b: string; proof: { label: string; href: string } }[] = [
  { t: "Payments & money movement", b: "Mobile money rails, ledgers, reconciliation: the parts where a bug costs someone real money.", proof: { label: "Trofficient", href: "/work/trofficient" } },
  { t: "Real-time systems", b: "Live state across unreliable networks: vehicle tracking, multiplayer, shared challenges.", proof: { label: "StepPool", href: "/work/steppool" } },
  { t: "AI as infrastructure", b: "Models as a system primitive with tools and memory, not a chat box bolted on.", proof: { label: "Elena", href: "/work/elena" } },
  { t: "Products for this market", b: "Software built around how Ghanaian households, businesses and commuters already work.", proof: { label: "Beagine", href: "/work/beagine" } },
  { t: "Infrastructure you own", b: "Servers, networks and voice: the layer most products rent. Where most of the real bugs turn out to live.", proof: { label: "VoIP", href: "/work/vop" } },
];

/* ---------------- Toolkit ---------------- */
export type ToolItem = { name: string; projects: string[]; also?: string[] };
export type ToolGroup = { id: string; label: string; items: ToolItem[] };
export const TOOLKIT: ToolGroup[] = [
  {
    id: "interfaces",
    label: "INTERFACES",
    items: [
      { name: "React", projects: ["ai-sme"], also: ["Sellis", "School Management", "E-Commerce App", "Expense Tracker"] },
      { name: "Next.js", projects: ["four-man-chess", "de-sams-studio"] },
      { name: "TypeScript", projects: ["trofficient", "steppool", "four-man-chess", "ai-sme", "elena", "de-sams-studio", "vop", "beagine"] },
      { name: "React Native / Expo", projects: ["trofficient", "steppool", "campus-connect", "beagine"] },
      { name: "Flutter", projects: [], also: ["The Word"] },
      { name: "Tailwind CSS", projects: ["ai-sme", "de-sams-studio"] },
      { name: "GSAP + Motion", projects: ["de-sams-studio"], also: ["this site"] },
      { name: "Installable PWAs", projects: ["stewardly"] },
    ],
  },
  {
    id: "systems",
    label: "SYSTEMS",
    items: [
      { name: "Node.js", projects: ["steppool", "ai-sme", "elena", "uat-tracker", "stewardly", "attendance", "de-sams-studio", "campus-connect", "vop", "trofficient"] },
      { name: "Express / Fastify", projects: ["steppool", "four-man-chess", "ai-sme", "uat-tracker", "stewardly", "attendance", "de-sams-studio", "campus-connect"] },
      { name: "Socket.IO", projects: ["steppool", "four-man-chess", "campus-connect", "beagine"] },
      { name: "MongoDB", projects: ["steppool", "ai-sme", "uat-tracker", "stewardly", "attendance", "de-sams-studio", "trofficient"], also: ["Rate Desk"] },
      { name: "MySQL", projects: ["campus-connect", "trofficient"] },
      { name: "PostgreSQL", projects: ["vop"], also: ["USSD services at work"] },
      { name: "Asterisk · SIP · WebRTC", projects: ["vop"] },
      { name: "Redis + BullMQ", projects: ["steppool", "campus-connect", "trofficient"] },
      { name: "Auth: JWT, Google OAuth", projects: ["ai-sme", "stewardly", "de-sams-studio"] },
      { name: "Python", projects: ["scrapy-mcp"] },
    ],
  },
  {
    id: "infra",
    label: "INFRASTRUCTURE",
    items: [
      { name: "Vercel", projects: ["ai-sme", "uat-tracker", "stewardly", "attendance", "de-sams-studio"], also: ["most of the shipped sites"] },
      { name: "Cloudflare (Workers, Pages, D1)", projects: [], also: ["Nene Collectionz", "an OpenStock deployment"] },
      { name: "Oracle Cloud (ARM)", projects: ["vop", "trofficient"] },
      { name: "Caddy (automatic TLS)", projects: ["vop", "trofficient"] },
      { name: "Coturn (STUN / TURN)", projects: ["vop"] },
      { name: "Docker + Compose", projects: ["vop", "trofficient"] },
      { name: "AWS (Lambda, SQS, DynamoDB, S3, ECS)", projects: [], also: ["Transport for Ghana backends"] },
      { name: "Render", projects: ["steppool", "campus-connect"] },
      { name: "Cloudinary media pipeline", projects: ["de-sams-studio"] },
      { name: "Monorepos (pnpm, Turborepo)", projects: ["four-man-chess"] },
    ],
  },
  {
    id: "product",
    label: "PRODUCT",
    items: [
      { name: "MCP / LLM integration", projects: ["scrapy-mcp", "ai-sme", "elena", "uat-tracker", "stewardly"] },
      { name: "Shared contracts (zod)", projects: ["steppool", "four-man-chess"] },
      { name: "Mobile money + SMS", projects: ["trofficient", "steppool", "stewardly", "beagine"] },
      { name: "Presence verification (QR, WiFi, GPS)", projects: ["attendance"] },
      { name: "System design", projects: ["trofficient", "steppool", "four-man-chess", "scrapy-mcp", "ai-sme", "elena", "uat-tracker", "stewardly", "attendance", "de-sams-studio", "campus-connect", "vop"] },
    ],
  },
];

/* ---------------- Notes ---------------- */
export type Note = {
  slug: string;
  n: string;
  date: string;
  title: string;
  minutes: number;
  summary: string;
  body: string[];
  margin: { fig: string; text: string }[];
};

export const NOTES: Note[] = [
  {
    slug: "ship-the-mvp-then-layer",
    n: "004",
    date: "2026.11.26",
    title: "Ship the executable MVP, then layer",
    minutes: 3,
    summary: "I've killed my own over-engineered microservice plans when a monolith shipped faster.",
    body: [
      "At some point I drew the architecture for a product I was building: services, queues, a gateway. It looked like what a serious product is supposed to look like. Then I built the monolith instead, and it shipped sooner.",
      "That isn't an argument against structure. It's an argument about ordering. A monolith with clean seams can be split when there's a reason to. A distributed system that exists before its first user has to be operated by someone, and that someone is you.",
      "My rule now: build the thing that runs end to end first. Layer on the rest when something actually hurts. Architecture serves delivery, not the reverse.",
    ],
    margin: [
      { fig: "FIG. A", text: "Seams, not services. Draw the boundary, don't deploy it yet." },
      { fig: "FIG. B", text: "Related: StepPool settles money with transactions, not a saga." },
    ],
  },
  {
    slug: "rules-as-a-library",
    n: "003",
    date: "2026.10.02",
    title: "Put the rules in a package with no dependencies",
    minutes: 3,
    summary: "How 4-Man Chess validates a move in the browser and on the server with the same code.",
    body: [
      "Chess for three or four players breaks assumptions that ordinary chess code makes without saying so: whose turn is next, what counts as check, what happens when a player is eliminated.",
      "So the rules live in one pure TypeScript package with no runtime dependencies. The web client imports it to show legal moves. The game server imports it to decide whether a move is allowed. They cannot disagree because they are the same code.",
      "The server stays authoritative. The client's copy is only for responsiveness. If they ever diverge, the server wins and the client resyncs.",
    ],
    margin: [
      { fig: "FIG. A", text: "@fourman/game-engine: rules, no runtime dependencies." },
      { fig: "FIG. B", text: "Related: the bots. Advanced won 25 of 40 against three Hard bots." },
    ],
  },
  {
    slug: "crawl-in-a-subprocess",
    n: "002",
    date: "2026.10.03",
    title: "Run the crawler in a subprocess",
    minutes: 3,
    summary: "Why scrapy-mcp starts a fresh process for every call.",
    body: [
      "Scrapy runs on Twisted. Twisted wants to own the event loop. An MCP server already has one. Putting both in the same process is a recipe for a hang you can't diagnose.",
      "So every tool call runs scrapy runspider as a subprocess. The reactor never touches the server's loop, and a stuck crawl can simply be killed: after 30 seconds for a page, 90 for a crawl.",
      "The other half is safety. If you hand a language model a crawler, you've handed it a way to reach private addresses. The check lives in middleware, so it runs on every redirect and every followed link, not only on the first URL.",
    ],
    margin: [
      { fig: "FIG. A", text: "Refused: private, loopback, link-local, cloud-metadata hosts." },
      { fig: "FIG. B", text: "36 tests, about 15 seconds." },
    ],
  },
  {
    slug: "build-the-switch-off",
    n: "001",
    date: "2026.11.16",
    title: "Build the risky feature. Ship it switched off.",
    minutes: 2,
    summary: "StepPool has a paid-entry mode. It's behind a flag until legal review.",
    body: [
      "StepPool is a walking challenge where finishers split a pool. Charging real money to enter makes it feel like a wager, and I'm not going to decide that on my own.",
      "So credits are demo credits, sponsored challenges are promotions, and the paid-entry path exists in code behind PAID_ENTRY_ENABLED, which is off.",
      "Turning it on is then a decision someone makes, with a lawyer, instead of a deploy someone makes by accident.",
    ],
    margin: [{ fig: "FIG. A", text: "A flag is a promise about the future, not a feature." }],
  },
];

export const getNote = (slug: string) => NOTES.find((n) => n.slug === slug);

/* ---------------- Archive (public repos on GitHub) ---------------- */
export type ArchiveItem = { name: string; year: string; type: string; lang: string; blurb?: string; href: string };
const gh = (n: string) => `https://github.com/Leslie-23/${n}`;
export const ARCHIVE: ArchiveItem[] = [
  { name: "openstock", year: "2026", type: "DEPLOYMENT", lang: "Nuxt 4 · Cloudflare D1", blurb: "A deployed instance of the open-source OpenStock inventory system (by florianjs), set up on Cloudflare.", href: gh("openstock") },
  { name: "The Word", year: "2026", type: "MOBILE", lang: "Flutter", blurb: "Open-source Bible app: multiple versions, search, bookmarks and daily verse notifications.", href: gh("Family-Bible") },
  { name: "School-Management-System", year: "2024", type: "WEB", lang: "React · Node", blurb: "Admin and records management for a school.", href: gh("School-Management-System") },
  { name: "PALtech Weather", year: "2024", type: "WEB", lang: "JavaScript", blurb: "Forecasts, alerts and planning signals for any city.", href: gh("weatherApp") },
  { name: "expense-tracker", year: "2024", type: "WEB", lang: "React", blurb: "Track income and expenses.", href: gh("expense-tracker") },
  { name: "mcp-weather", year: "2026", type: "SYSTEMS", lang: "TypeScript", href: gh("mcp-weather") },
  { name: "npm-git-helper", year: "2026", type: "PACKAGE", lang: "Node.js", blurb: "Published on npm. Git workflow tooling.", href: "https://www.npmjs.com/package/npm-git-helper" },
  { name: "wakey", year: "2026", type: "APP", lang: "TypeScript", href: gh("wakey") },
  { name: "osAfrica", year: "2026", type: "SYSTEMS", lang: "Python", blurb: "An AI-native operating system. In active development.", href: gh("osAfrica") },
  { name: "smartScan", year: "2025", type: "APP", lang: "JavaScript", href: gh("smartScan") },
  { name: "create-velocity-app", year: "2025", type: "PACKAGE", lang: "JavaScript", href: gh("create-velocity-app") },
  { name: "fitnessMobileApp", year: "2025", type: "MOBILE", lang: "TypeScript", href: gh("fitnessMobileApp") },
  { name: "HACK", year: "2025", type: "HACKATHON", lang: "Python", blurb: "A solution for a global speech-impairment problem. Hackathon contest.", href: gh("HACK") },
  { name: "campusBite-Hub", year: "2024", type: "WEB", lang: "JavaScript", href: gh("campusBite-Hub") },
  { name: "gamify-UNI", year: "2024", type: "WEB", lang: "MERN", blurb: "A task-gamifying app built with the MERN stack.", href: gh("gamify-UNI") },
  { name: "keyboardBeatMachine", year: "2024", type: "EXPERIMENT", lang: "JavaScript", href: gh("keyboardBeatMachine") },
  { name: "ChromeDino-cheatCode", year: "2024", type: "EXPERIMENT", lang: "JavaScript", href: gh("ChromeDino-cheatCode") },
];

export const IN_PRODUCTION = [
  { name: "sellis", url: "https://sellisspa.com", what: "Production web application. React · Node.js." },
  { name: "cp-online", url: "https://captivatinghometrade.com", what: "E-commerce / business platform for a retail operation." },
  { name: "npm-git-helper", url: "https://www.npmjs.com/package/npm-git-helper", what: "Published npm package. Git workflow tooling." },
];

/* ---------------- Affiliations ----------------
   Names + logos only. Nothing about private work. */
export type Affiliation = { id: string; name: string; role: string; img: string; w: number; h: number; href?: string; note?: string };
export const AFFILIATIONS: Affiliation[] = [
  {
    id: "global-icons", name: "Global Icons", role: "WHERE I WORK", img: "/affil/global-icons.svg", w: 45, h: 48,
    href: "https://globaliconsagency.com",
    note: "A technology company in Accra building digital systems for transport, education, public services, payments and governance.",
  },
  { id: "tfg", name: "Transport for Ghana", role: "AFFILIATION", img: "/affil/transport-for-ghana.png", w: 700, h: 187 },
  { id: "tapngo", name: "Tap n' Go", role: "AFFILIATION", img: "/affil/tap-n-go.png", w: 600, h: 600 },
  { id: "moveet", name: "Moveet", role: "AFFILIATION", img: "/affil/moveet.png", w: 600, h: 600 },
  { id: "nss", name: "NSS", role: "AFFILIATION", img: "/affil/nss.png", w: 600, h: 485, note: "I worked on its caching system." },
];

/* ---------------- Screenshot personality ----------------
   Each screenshot speaks in its own project's words (taken from the product's own site or docs),
   wears its own accent, and moves its own way on hover. */
export type Vibe = { say: string; cursor: string; tone: "accent" | "red" | "orange" | "green" | "ink"; rot: number; hx: number; hy: number; hr: number };
export const VIBE: Record<string, Vibe> = {
  vop: { say: "Voice infrastructure you own.", cursor: "CALL", tone: "accent", rot: -0.8, hx: 4, hy: -7, hr: 1.5 },
  beagine: { say: "Home services, handled.", cursor: "BOOK", tone: "orange", rot: 1.1, hx: 5, hy: -7, hr: -1.5 },
  trofficient: { say: "Know when to leave.", cursor: "BOARD", tone: "accent", rot: 1.2, hx: 6, hy: -8, hr: -2 },
  steppool: { say: "Hit your goal. Share the pool.", cursor: "WALK", tone: "accent", rot: -1.4, hx: -5, hy: -8, hr: 2 },
  "four-man-chess": { say: "Chess for everyone at the table.", cursor: "PLAY", tone: "orange", rot: 0.8, hx: 0, hy: -9, hr: 1 },
  "ai-sme": { say: "Know what sold. Know what's low.", cursor: "ASK", tone: "ink", rot: -0.6, hx: -4, hy: -6, hr: -1 },
  elena: { say: "Runs on my Mac. Free. Private.", cursor: "ASK", tone: "green", rot: 1, hx: 5, hy: -6, hr: -1.5 },
  stewardly: { say: "Duty rosters, done right.", cursor: "SCHEDULE", tone: "green", rot: 0, hx: -3, hy: -7, hr: 0 },
  attendance: { say: "Clock in. Clock out.", cursor: "CLOCK IN", tone: "orange", rot: -1.2, hx: 6, hy: -7, hr: 2 },
  "de-sams-studio": { say: "Every frame tells a story.", cursor: "VIEW", tone: "red", rot: 0.6, hx: -6, hy: -6, hr: -1.5 },
  "campus-connect": { say: "Your whole campus in one app.", cursor: "JOIN", tone: "red", rot: 1.8, hx: 5, hy: -9, hr: -2.5 },
  sellis: { say: "Come in heavy. Leave weightless.", cursor: "BOOK", tone: "orange", rot: -1, hx: -4, hy: -7, hr: 1.5 },
  "captivating-home": { say: "Ask for current price.", cursor: "SHOP", tone: "red", rot: 0.7, hx: 4, hy: -6, hr: -1 },
  nenecollectionz: { say: "Home of wholesale prices.", cursor: "SHOP", tone: "orange", rot: -0.8, hx: -5, hy: -7, hr: 1 },
};

/** Where a screenshot should take you: the live product, else its source, else its case study. */
export function shotHref(slug: string): { href: string; external: boolean } {
  const p = PROJECTS.find((x) => x.slug === slug);
  const sh = SHIPPED.find((x) => x.slug === slug);
  const live = liveFor(slug, p?.live ?? sh?.live);
  if (live) return { href: live, external: true };
  if (p?.repo) return { href: p.repo, external: true };
  return { href: `/work/${slug}`, external: false };
}

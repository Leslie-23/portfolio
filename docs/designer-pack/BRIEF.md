# Leslie Paul Ajayi: Portfolio Designer Brief

**Prepared:** 2026-11-27  ·  **From:** Leslie's GitHub (personal and organisations), local project folders, live sites and the current portfolio build.

> **How to use this.** Section 1–3 tell you who Leslie is and what the site must do. Section 4 is the rulebook for what you may and may not show: **read it before anything else, it's a hard constraint.** Sections 5–8 are the work itself, with every fact, link and asset path you need. Section 9 lists what's missing. Image paths below are relative to the repo root (the files already live in `public/`).

---

## 1. Who Leslie is

- **Name:** Leslie Paul Ajayi. Software engineer, Accra, Ghana.
- **Works at:** Global Icons (technology company, Accra, `globaliconsagency.com`).
- **Founder:** Trofficient (transit technology for Ghana's informal *trotro* network). **CTO:** Beagine (home-services marketplace).
- **Education:** BSc Information Technology, Regional Maritime University.
- **On GitHub since:** January 2022. Bio: "Software Engineer | Web Developer | Programmer".
- **Contact:** leslieajayi27@gmail.com  ·  GitHub https://github.com/Leslie-23  ·  LinkedIn https://www.linkedin.com/in/leslie-paul-ajayi-45a725279  ·  X https://x.com/_iam_leslie
- **Domain:** `www.leslieajayi.com` is live (HTTPS). He plans per-app subdomains on it (e.g. `steppool.leslieajayi.com`).

**In his words (from his profile README):** "Software engineer. I build systems that go to production, not demos that die in a repo." Three working principles:
1. *Ship the executable MVP, then layer.* He has killed his own over-engineered microservice plans when a monolith shipped faster.
2. *Full-stack by necessity, backend by preference.* Most interested in what users never see: data models, payments, failure modes.
3. *Ghana-first constraints.* Mobile money over cards, intermittent connectivity, low-end devices.

**What a visitor should conclude:** he understands systems, he is curious, he can actually build and ship, and he thinks beyond individual screens. A recruiter must still grasp his experience quickly; a founder must see he can build real products.

## 2. The numbers (for credibility strips)

| Fact | Value | Source |
|---|---|---|
| Personal, non-fork repos on GitHub | 158 (138 public, 20 private) | `gh repo list` |
| Repos created per year | 2023: 10 · 2024: 83 · 2025: 34 · 2026: 31 | GitHub |
| Main languages (by repo) | JavaScript 56 · TypeScript 28 · HTML 22 · Python 13 · C++ 10 · PHP 5 · C# 4 · Java 3 | GitHub |
| Case studies on the current site | 13 | site data |
| Other live sites and apps shown | 7 (plus the case studies) | site data |
| Mobile apps | StepPool, Trofficient (rider + driver), Campus Connect, Beagine (customer, specialist, vendor), plus smaller ones | repos |
| Published npm package | `npm-git-helper` v3.0.0 | npm registry |
| Tests (public claims, checked in repos) | VoIP platform: 40 · scrapy-mcp: 36 | repo docs |
| Bot tournament | 4-Man Chess: Advanced bot won 25 of 40 games vs three Hard bots (even = 10) | repo README |

Do **not** quote numbers about the employer's or clients' systems (repo counts, service counts, traffic, etc.). Those are not Leslie's to publish.

---

## 3. What the website is for, and Leslie's taste

**Audiences:** recruiters and hiring managers (need: experience at a glance), founders and clients (need: proof he ships real products), other engineers (need: depth, curiosity, craft).

**The original concept: "The Workshop".** A portfolio that behaves like the workspace of someone who takes systems apart and rebuilds them. Visual language: engineering drawings × Swiss editorial × technical manuals. You are free to replace it, but the *ideas* below are what Leslie responded to:

- Light, paper-warm background (not a dark "hacker" site). Near-black type. One accent colour: **#34bb78** (green). Mono type for labels and "FIG." numbers. Strong grid. **No cursive.**
- Interactions that *explain how things work*: a SHOW INTERNALS (blueprint) mode, a project that pulls apart into its layers, a diagram you can drag, a "DISASSEMBLE SITE" easter egg that is always reversible.
- Mechanical motion (snap, connect, draw, assemble), not floaty fades.
- Real screenshots and real product artwork, never mocked-up filler.

### Leslie's feedback so far (what he rejected, so you don't repeat it)

| He said | Meaning |
|---|---|
| "The blue is a bit off, put in #34bb78" | Accent is green #34bb78. Small text uses a darker green for contrast (#1b7a4b). |
| Hated screenshots scattered/bouncing in the hero; "put them closer"; wanted a burst, then "remove the colour pop", "don't bounce the icons", "don't follow the mouse", "remove the weird bg shadows"; finally "I hate the screenshots, take them out" | **The first screen currently has no screenshots.** He does not want decorative motion on app imagery. If you show screens, keep them still, flat, and honest. |
| "The first screen seems a bit bare" | He also dislikes empty space. The current hero has a faded portrait behind the name. Find a better answer. |
| "Don't have captions wandering beneath screenshots"; names/taglines go **on** the image | Clean image blocks. No orphan text underneath. |
| Screenshots should link to the live product | Clicking an image opens the real site/app. |
| "Mobile apps should look like phones, not cropped landscape slabs" | Phone apps use phone-shaped frames showing full portrait screens. |
| "The scroll-to-build section feels weird; do better" | He disliked a scroll-scrubbed diagram that lagged behind the wheel. Prefer discrete, snappy steps over scrubbed parallax. |
| "The comma is weird" (display headline) | Tight display line-height made a comma touch the next line. Mind punctuation in tight headlines. |
| "Remove this, it's a prod item, can't leak it" (an employer system diagram) | See Section 4. Employer work is names/logos only. |
| Wants a portrait used as a light, faded background and as the brand icon | Source art is in `public/portrait/leslie.png` (transparent PNG, faceted greyscale). |

### Current build (so you know what exists)

Live: **https://www.leslieajayi.com**. Next.js 16, TypeScript, Tailwind v4, GSAP + ScrollTrigger, Motion, Lenis, SVG. Source: github.com/Leslie-23/portfolio.

Routes: `/` home · `/work` (catalogue, filter, "shipped & live" grid) · `/work/[slug]` (13 case studies, each with scroll deconstruction + system diagram) · `/bench` (experiments) · `/about` · `/toolkit` (tech → evidence lines) · `/infra` (servers, networking, delivery) · `/notes` · `/contact` · `/archive` · custom 404.

Reusable pieces already built: exploded 3D layer view (CSS 3D), blueprint "internals" mode, assembling intro, measurement cursor, topology diagrams that draw themselves, phone-first layer view, toolkit relationship lines. The data lives in `src/lib/data.ts` and `src/lib/infra.ts`; **`docs/designer-pack/projects.json` is the same data**, so you can build against it without touching the code.

---

## 4. HARD RULES: what you may and may not show

Leslie works inside organisations whose systems are confidential. This is the most important section.

### Never show, describe, or hint at

- **Anything about the internals of employer or client production systems.** No architecture diagrams, service/queue/database names, cloud account details, regions, endpoints, repo names, repo counts, config, or screenshots. This applies to Global Icons, Transport for Ghana, Tap n' Go, Moveet, and the NSS platform.
- **Secrets and credentials** of any kind (keys, certificates, tokens, service accounts, env files). Never copy, reference or expose them.
- **Unreleased or switched-off product features.** Show only what is publicly live. If a feature is not on the product's public site or store listing, leave it out.
- **Personal data in screenshots.** The Trofficient screens contain on-screen names ("Good morning, Leslie", "Hello, Kwame") and a small iPhone AssistiveTouch dot. Nene Collectionz *admin* screens show order data; its "visit the shop" screens show a phone number and street address. Use only the clean public screens listed in Section 6.
- **Private repos of other people.** VoIP's repo is private and owned by a collaborator; it is not linked anywhere.

### Allowed, names and logos only (the "Where I build" strip)

| Organisation | Allowed | Logo file |
|---|---|---|
| Global Icons (where i work) | Name, logo and its own public one-line description. This is Leslie's employer. | `public/affil/global-icons.svg` |
| Transport for Ghana (affiliation) | Name + logo only. No projects, no details. | `public/affil/transport-for-ghana.png` |
| Tap n' Go (affiliation) | Name + logo only. No projects, no details. | `public/affil/tap-n-go.png` |
| Moveet (affiliation) | Name + logo only. No projects, no details. | `public/affil/moveet.png` |
| NSS (affiliation) | Name + logo + the single line "I worked on its caching system." Nothing more. | `public/affil/nss.png` |

Using another organisation's logo implies a relationship; Leslie has approved these specific ones. Don't add others.

### Needs Leslie's confirmation before you rely on it

- His **roles** on VoIP ("Architect / Engineer") and Beagine ("CTO") are his own statements. Commit history shows these are team projects, so keep wording to what he states.
- **Campus Connect** is a team final-year-project org (his role not stated). Shown as "Engineer (team project)".
- **Client/employer-adjacent sites:** Sellis Beauty Spa, Captivating Home & Trading, FR Homes. See Section 7.

---

## 5. Brand assets

| Item | Value / file |
|---|---|
| Accent | **#34bb78** (fills, highlights, lines). Text-safe darker twin **#1b7a4b**. |
| Paper / ink | Paper #F2F0E9 · lighter #F7F6F1 / #FAFAF7 · Ink #151515 · Graphite #222222 |
| Secondary accents (use sparingly) | Signal red #E5412D · Industrial orange #E8742A |
| Blueprint mode palette | pale green-tinted paper #E6F1EA, deep green ink #0F3A25 |
| Typefaces now in use | Display: Inter Tight (800, uppercase, tight tracking). Body: Geist. Labels: Geist Mono (uppercase, 11px). Open to replacement; the brief asked for a precise grotesk + mono pairing. |
| Portrait | `public/portrait/leslie.png`: faceted greyscale, transparent background, 1228×1281. |
| Favicon / app icon | `src/app/icon.png` (green square with portrait). |
| Share image | `public/brand/leslie-share-1200x630.png` (Open Graph / Twitter). |
| Profile avatar | `public/brand/leslie-avatar-1024.png`. |
| Banners | X 1500×500 and LinkedIn 1584×396 in `public/brand/`. |

The share image currently reads "LESLIEAJAYI.COM"; update when the final URL is settled.

---

## 6. Case studies (flagship work)

Each entry is real, shipped or in active development. Statuses use Leslie's/the product's own wording. "Story" is the narrative already written for the current site: reuse, reshape or replace it, but keep the facts.

### FIG. 001: Trofficient

Transit technology for Ghana's informal trotro network: real-time vehicle tracking, dynamic pricing and mobile-money payments.

| | |
|---|---|
| Year | 2025— |
| Leslie's role | Founder / Engineer |
| Status | IN DEVELOPMENT |
| Categories | PRODUCT, MOBILE, SYSTEMS |
| Live | https://mytrofficient.com |
| Repo | private / not linked |
| Stack | React Native · TypeScript · Mobile money |
| Form factor | **Phone app** (portrait screens) plus a website |
| Product's own look (observed) | Deep green brand (green 'T' icon), white cards over a live map. Bus markers, fares in GH¢. Warm, civic, practical. |
| Current site accent/vibe | accent · tagline "Know when to leave." |

**Layers** (top = what the user touches, bottom = what holds it up; used for the exploded view):
1. **RIDER APP**: React Native
2. **LIVE TRACKING**: Where the vehicle is, right now
3. **ROUTING + PRICING**: Predictable journeys, dynamic fares
4. **PAYMENTS**: Mobile money
5. **DRIVER + OPERATOR SIDE**: Go online, route map, scan tickets, earnings

**Story**
- *CONTEXT.* Bus and shared-commuter transport in Ghana runs on a huge informal network. It works, but it is fragmented: riders can't predict a journey and operators can't see their own fleet.
- *PROBLEM.* How do you modernise a system that nobody centrally controls, without asking everyone in it to change how they already work?
- *CONSTRAINTS.* Mobile money over cards. Intermittent connectivity. Low-end devices. These aren't edge cases here. They are the market, and they are the reason the build stays disciplined.
- *APPROACH.* One ecosystem with two sides: commuters plan predictable journeys, operators optimise routes, pricing and fleet usage. Live vehicle tracking is the thread that connects both.
- *MY ROLE.* Founder. I design and build the product.

**Key decisions**
- **Mobile money first.** Payments are designed around mobile money from day one rather than bolted on after a card-based flow.
- **Ship the executable MVP, then layer.** A microservice plan was killed when a monolith shipped faster. Architecture serves delivery, not the reverse.

**Learned:** Building for this market is a forcing function for discipline. If it survives bad connectivity and cheap phones, it survives everywhere else.

**Assets** (8 files): `public/work/trofficient/desktop.jpg`, `public/work/trofficient/mobile.jpg`, `public/work/trofficient/phone/booking.jpg`, `public/work/trofficient/phone/driverhome.jpg`, `public/work/trofficient/phone/home.jpg`, `public/work/trofficient/phone/live.jpg`, `public/work/trofficient/phone/route.jpg`, `public/work/trofficient/phone/wallet.jpg`

### FIG. 012: VoIP

Voice infrastructure you actually own: browser calling by VoIP ID or phone alias, a clean API and call records you control, self-hosted on a single server. Built from scratch.

| | |
|---|---|
| Year | 2026 |
| Leslie's role | Architect / Engineer |
| Status | API PREVIEW LIVE |
| Categories | PRODUCT, SYSTEMS, WEB |
| Live | https://vop.mytrofficient.com |
| Repo | private / not linked |
| Stack | Node.js · TypeScript · Asterisk · WebRTC / SIP · Coturn · PostgreSQL · Docker Compose · Caddy · Oracle Cloud (ARM) |
| Form factor | Web |
| Product's own look (observed) | SaaS gradient (peach to lavender) with a black 'pricing' section. Clean, developer-friendly, rounded UI. |
| Current site accent/vibe | accent · tagline "Voice infrastructure you own." |

**Layers** (top = what the user touches, bottom = what holds it up; used for the exploded view):
1. **BROWSER CALLING**: Call by VoIP ID or phone alias
2. **API + SDKs**: Tenant-scoped, short-lived tokens, call grants
3. **INTEGRATIONS + WEBHOOKS**: Signed webhooks, call records you control
4. **VOICE ENGINE + RELAY**: Asterisk 22 (PJSIP, ARI) · Coturn STUN/TURN
5. **POSTGRESQL 16**: Tenants, call history, realtime config

**Story**
- *THE BRIEF.* Adding calling to an app usually means renting someone else's voice platform, so your routing, your call records and your customers' data live on their servers. VoIP is the opposite: voice infrastructure you run yourself, with the control that comes with it.
- *WHAT PEOPLE GET.* Browser calling by VoIP ID or phone alias. A clean API. Call records in your own database. All of it self-hosted on a single server, with SDKs for the web, Node, React Native and Flutter.
- *HOW A CALL WORKS.* Your server issues a short-lived token. The Web SDK places the call from the browser. Asterisk bridges it. Coturn relays the audio when a direct path isn't possible. A signed webhook tells your server what happened.
- *I BUILT IT FROM SCRATCH.* The API and tenancy model, the SDKs, the website and calling app, and the Docker Compose stack that runs the voice engine, from the browser to the database.
- *THE HARD PART IS THE NETWORK.* Voice is a networking problem wearing an application costume. A first build silently left out a database module because one library was missing. Browser contacts weren't being rewritten behind NAT. Endpoints weren't being checked, so every one looked offline and every call would have been rejected. Each of those was found by rehearsing the full stack, not by reading code.

**Key decisions**
- **Provisioning is a one-shot job.** Migrations and provisioning run in a separate container, so the owner-level database credentials never sit inside the long-running API.
- **Pin everything.** Images are pinned to exact versions, and the Asterisk source is checked against the publisher's SHA-256 before it's built.
- **Fail safe on reconnect.** If the control connection to the voice engine drops, affected calls end and unfinished records are marked orphaned, rather than the system guessing what happened.
- **Test against a fake engine.** Call-controller scenarios run against an engine-neutral fake, and a separate stub exercises the real adapter. 40 tests run in the suite, and the PostgreSQL ones run against a disposable database.

**Learned:** Most of the bugs weren't in the application code. They were in the network, the build and the configuration around it.

**Assets** (8 files): `public/work/vop/desktop.jpg`, `public/work/vop/mobile.jpg`, `public/work/vop/layers/api.jpg`, `public/work/vop/layers/app.jpg`, `public/work/vop/layers/call.jpg`, `public/work/vop/layers/developers.jpg`, `public/work/vop/layers/integrations.jpg`, `public/work/vop/layers/pricing.jpg`

### FIG. 013: Beagine

A home-services marketplace for Ghana in three mobile apps: customers book verified specialists, specialists take jobs and get paid, and shops sell to both. I'm the CTO.

| | |
|---|---|
| Year | 2026 |
| Leslie's role | CTO |
| Status | WAITLIST LIVE |
| Categories | PRODUCT, MOBILE, SYSTEMS |
| Live | https://beagine.com |
| Repo | private / not linked |
| Stack | Expo · React Native · TypeScript · Node.js · MongoDB · Socket.IO · Redis + BullMQ · Next.js · Vite |
| Form factor | Web |
| Product's own look (observed) | Black and brand orange (#ff5f15), toy-like 3D worker illustrations, warm interior photography. Premium service feel. |
| Current site accent/vibe | orange · tagline "Home services, handled." |

**Layers** (top = what the user touches, bottom = what holds it up; used for the exploded view):
1. **THE ECOSYSTEM**: Customers, specialists and shops on one platform
2. **BEAGINE (CUSTOMER)**: Book, track, chat, pay
3. **BEAGINE PRO (SPECIALIST)**: Go online, take jobs, get paid
4. **BEAGINE STORE (VENDOR)**: Products, orders, payouts
5. **SHARED BACKEND**: Node API, realtime, payments, push

**Story**
- *THE IDEA.* Finding a plumber, an electrician or a cleaner you can trust shouldn't be luck. Beagine puts verified specialists, local shops and the whole job (request to receipt) in one place.
- *THREE APPS, ONE PLATFORM.* Beagine is for customers who book. Beagine Pro is for specialists who accept and complete jobs. Beagine Store is for local vendors who sell the parts and products. An admin dashboard and a vendor web app sit alongside them.
- *BUILT FOR GHANA.* Mobile Money (MTN, Telecel, AirtelTigo) and card payments, phone and OTP sign-in, Accra-first service areas, and Ghana Card verification for specialists. Funds are held and released when the job is done.
- *MY ROLE.* CTO. I own the technical direction and the architecture across all three apps and the backend, and I build alongside the team.

**Key decisions**
- **One monorepo, shared everything.** The three apps and the admin share UI components, types, state and the API client through workspace packages, so a fix lands everywhere at once.
- **Build the app before the backend.** A dual mock/HTTP API layer with an OpenAPI contract let the apps be built and tested before the backend was finished, then switched to real services by an environment variable.
- **Trust is the product.** Live job tracking, before-and-after photos, approval before any price change, and a receipt for every job.

**Learned:** In a marketplace, the hard part isn't any one app. It's keeping three of them telling the same story about the same job.

**Assets** (6 files): `public/work/beagine/desktop.jpg`, `public/work/beagine/mobile.jpg`, `public/work/beagine/layers/customer.jpg`, `public/work/beagine/layers/specialist.jpg`, `public/work/beagine/layers/team.jpg`, `public/work/beagine/layers/vendor.jpg`

### FIG. 002: StepPool

Walk. Hit your goal. Share the pool. A step-challenge app where everyone who hits their goal splits the pool.

| | |
|---|---|
| Year | 2026 |
| Leslie's role | Engineer |
| Status | SHIPPED TO REPO |
| Categories | PRODUCT, MOBILE, SYSTEMS |
| Live | https://steppool-web.onrender.com |
| Repo | https://github.com/Leslie-23/steppool |
| Stack | Expo · TypeScript · Express · MongoDB · Redis · Socket.IO · BullMQ · zod |
| Form factor | **Phone app** (portrait screens) |
| Product's own look (observed) | Dark UI with lime/yellow accents and a gold prize pool. Big rings and odometers. Game-like, energetic. |
| Current site accent/vibe | accent · tagline "Hit your goal. Share the pool." |

**Layers** (top = what the user touches, bottom = what holds it up; used for the exploded view):
1. **EXPO APP**: Expo Router · HealthKit / Health Connect
2. **DESIGN SYSTEM**: StepRing, Odometer, HoldButton, Particles
3. **SHARED CONTRACTS**: zod schemas + goal maths, used by app AND server
4. **API + REALTIME**: Express · Socket.IO
5. **DATA + JOBS**: MongoDB · Redis · BullMQ

**Story**
- *THE RULE.* Players join a challenge (48h, 7d or 30d). Each gets a personal goal based on their own usual week. Everyone who hits their goal splits the pool. Rank is for bragging rights; payouts depend only on your own goal.
- *TWO MODES.* Credits challenges cost demo credits (1,000 on signup) and split the pool between finishers; if nobody finishes, everyone is refunded. Sponsored challenges are free to enter and a brand funds a prize, claimed via MoMo.
- *THE LINE NOT CROSSED.* No real-money entry. A PAID_ENTRY_ENABLED flag exists but stays off until legal review. A sponsored prize is a promotion, not a wager.
- *HOW IT'S BUILT.* App screens flow auth → onboarding → tabs → arena → results. A server process runs lifecycle jobs: start, last-hour push, settle, and a 5-minute sweep. An iOS home/lock-screen widget ships alongside.

**Key decisions**
- **One contract, both ends.** Wire contracts and goal maths live in a shared package validated with zod, so the app and the server can never disagree about what a goal is.
- **Money-shaped logic needs transactions.** MongoDB runs as a replica set because transactions require one. Pool settlement can't be half-done.
- **Ship the product, gate the risk.** The legally uncertain feature is built, tested and switched off. Turning it on is a decision, not a deploy.

**Learned:** The interesting engineering in a game about walking is the settlement logic nobody sees.

**Assets** (8 files): `public/work/steppool/desktop.jpg`, `public/work/steppool/gallery/03-today.jpg`, `public/work/steppool/gallery/04-challenges.jpg`, `public/work/steppool/gallery/05-live-challenge.jpg`, `public/work/steppool/gallery/08-create-challenge.jpg`, `public/work/steppool/gallery/09-results.jpg`, `public/work/steppool/gallery/10-wallet.jpg`, `public/work/steppool/gallery/14-daily-target.jpg`

### FIG. 003: 4-Man Chess

Chess for 2, 3 or 4 players: classic, hexagon and cross boards, with friends or bots.

| | |
|---|---|
| Year | 2026 |
| Leslie's role | Engineer |
| Status | PLAYABLE |
| Categories | WEB, SYSTEMS, EXPERIMENTS |
| Live | — |
| Repo | https://github.com/Leslie-23/4-man-chess |
| Stack | Next.js · TypeScript · Fastify · Socket.IO · pnpm · Turborepo |
| Form factor | Web |
| Product's own look (observed) | A board that isn't square: hexagon and cross shapes. Orange accent. Playful but precise. |
| Current site accent/vibe | orange · tagline "Chess for everyone at the table." |

**Layers** (top = what the user touches, bottom = what holds it up; used for the exploded view):
1. **NEXT.JS CLIENT**: Lobby, board, live updates
2. **TYPED EVENTS**: Shared Socket.IO event types
3. **GAME SERVER**: Fastify + Socket.IO, authoritative
4. **GAME ENGINE**: Pure TypeScript rules, zero runtime deps
5. **BOTS**: Easy · Hard · Advanced

**Story**
- *WHAT IT IS.* Classic 8×8, a three-player hexagon and a four-player cross. Every seat is a friend joining with a room code, or a bot.
- *SHAPE OF THE REPO.* A pnpm + Turborepo monorepo. The rules live in one pure TypeScript package with no runtime dependencies, shared by the web client and the game server.
- *THE SERVER IS THE REFEREE.* The server is authoritative and keeps rooms in memory. A reload or dropped connection puts you back in your seat. Anyone joining a full game watches.
- *TESTING THE BOTS.* Bots aren't just named, they're measured. Hard never got knocked out in 40 games against three Easy bots. Advanced won 25 of 40 against three Hard bots, where even would be 10.

**Key decisions**
- **Rules as a library, not a feature.** Because the engine has no dependencies, the same code validates a move in the browser and on the server.
- **Bots join like any other device.** A script can add bots from the terminal over Socket.IO, exactly like a player on a phone. No special path.

**Learned:** Three- and four-player chess breaks assumptions that 'chess' code quietly makes: turn order, check, elimination.

**Assets** (5 files): `public/work/four-man-chess/desktop.jpg`, `public/work/four-man-chess/mobile.jpg`, `public/work/four-man-chess/layers/eng.jpg`, `public/work/four-man-chess/layers/evt.jpg`, `public/work/four-man-chess/layers/srv.jpg`

### FIG. 004: scrapy-mcp

Scrapy web-scraping tools for ChatGPT, served as a remote MCP server with a results widget.

| | |
|---|---|
| Year | 2026 |
| Leslie's role | Engineer |
| Status | WORKING |
| Categories | SYSTEMS, EXPERIMENTS |
| Live | — |
| Repo | https://github.com/Leslie-23/scrapy-mcp |
| Stack | Python · Scrapy · MCP · pytest |
| Form factor | Web |
| Product's own look (observed) | No UI of its own: it lives inside ChatGPT as a results widget. Best shown as a diagram. |
| Current site accent/vibe |  · tagline "" |

**Layers** (top = what the user touches, bottom = what holds it up; used for the exploded view):
1. **CHATGPT WIDGET**: MCP Apps view of results
2. **MCP SERVER**: Streamable HTTP, optional secret path
3. **THREE TOOLS**: scrape_page · extract · crawl_site
4. **SUBPROCESS**: scrapy runspider, one per call
5. **SAFETY MIDDLEWARE**: Checked on every redirect and link

**Story**
- *THE QUESTION.* Can a language model get a reliable, safe pair of hands on the open web?
- *THE ANSWER IS THREE TOOLS.* scrape_page returns title, description, readable text and links. extract returns values for named CSS or XPath selectors. crawl_site walks a same-host crawl (≤50 pages, depth ≤3).
- *THE HARD PART.* Giving an AI a crawler means giving it a way to reach things it shouldn't. So robots.txt is obeyed, responses are capped at 5 MB, only ports 80/443 are allowed, and any host resolving to private, loopback, link-local or cloud-metadata addresses is refused, before the crawl and on every redirect.

**Key decisions**
- **A subprocess per call.** Scrapy's Twisted reactor never touches the server's event loop, and a stuck crawl is killed after 30 s (90 s for crawls).
- **Quiet logs when secret.** Set MCP_AUTH_TOKEN and the endpoint moves to /mcp/<token>. The access log is switched off so the token never lands in it.

**Learned:** Safety belongs in the middleware that every request passes through, not in each tool that remembers to check.

**Assets** (0 files): none

### FIG. 005: AI for SMEs

Business intelligence for small and medium businesses, live as Intellexa: an assistant that answers questions about real sales, inventory and expense data.

| | |
|---|---|
| Year | 2026 |
| Leslie's role | Engineer |
| Status | LIVE DEMO |
| Categories | PRODUCT, WEB |
| Live | https://ai-sme-eight.vercel.app |
| Repo | https://github.com/Leslie-23/ai-sme |
| Stack | React · Vite · Tailwind · Node.js · Express · TypeScript · MongoDB |
| Form factor | Web |
| Product's own look (observed) | White, minimal, black type. A calm assistant panel. Brand on the site is 'Intellexa'; the repo is 'AI-SME'. |
| Current site accent/vibe | ink · tagline "Know what sold. Know what's low." |

**Layers** (top = what the user touches, bottom = what holds it up; used for the exploded view):
1. **REACT + VITE CLIENT**: Dashboards and the assistant
2. **EXPRESS API**: TypeScript, JWT on every route but /auth
3. **PROVIDER LAYER**: OpenAI · Anthropic · Google · Groq · OpenRouter · Mistral
4. **DOMAIN**: Products · sales · inventory · payments · expenses
5. **MONGODB**: Mongoose models

**Story**
- *THE IDEA.* Small businesses already collect sales, stock and expense data. The missing piece is someone to ask. So: ask it in plain language, and get answers from the business's own numbers.
- *TENANCY.* A JWT carries user, business, role and email. Middleware attaches them to every request so controllers only ever query within the caller's own business.
- *THE AI IS A PLUG.* The model provider is swappable: OpenAI, Anthropic, Google, Groq, OpenRouter or Mistral. The product doesn't depend on which one wins.

**Key decisions**
- **Sales decrement stock atomically.** Recording a sale and moving the inventory happen as one operation, with an inventory log entry, so the numbers the assistant reads can be trusted.
- **Pluggable by design.** A provider layer rather than a provider SDK sprinkled through the code.

**Learned:** An assistant is only as honest as the data model behind it.

**Assets** (6 files): `public/work/ai-sme/desktop.jpg`, `public/work/ai-sme/mobile.jpg`, `public/work/ai-sme/layers/ai.jpg`, `public/work/ai-sme/layers/api.jpg`, `public/work/ai-sme/layers/db.jpg`, `public/work/ai-sme/layers/dom.jpg`

### FIG. 006: Elena

A local-first developer assistant. The LLM runs on your Mac through Ollama; Elena gives it a small set of typed, sandboxed tools.

| | |
|---|---|
| Year | 2026 |
| Leslie's role | Engineer |
| Status | WORKING |
| Categories | SYSTEMS, EXPERIMENTS |
| Live | — |
| Repo | https://github.com/Leslie-23/elena |
| Stack | TypeScript · Node 22 · Ollama |
| Form factor | Terminal tool (desktop only) |
| Product's own look (observed) | Terminal-native. Green rounded 'e:' icon on beige. Best shown as terminal and carousel slides. |
| Current site accent/vibe | green · tagline "Runs on my Mac. Free. Private." |

**Layers** (top = what the user touches, bottom = what holds it up; used for the exploded view):
1. **CLI**: Type `elena` in any project folder
2. **TYPED TOOLS**: Small, sandboxed
3. **MEMORY**: Notes kept in ~/.elena
4. **LOCAL MODEL**: Ollama on your machine
5. **CLAUDE CODE / CODEX**: Connected during setup

**Story**
- *THE QUESTION.* How much of a developer's day can be handled by a model that never leaves the laptop?
- *THE BOUNDARY.* The model is not trusted with the machine. It's given a small set of typed, sandboxed tools, and that's all.
- *THE INSTALL.* One curl line. It checks git and Node 22+, builds into ~/.elena, puts `elena` on PATH, then checks Ollama and suggests a model that fits your RAM.

**Key decisions**
- **Local first.** Summaries, first-pass searches and a free second-opinion review stay on the machine.
- **Reversible install.** Re-running the installer is safe. Uninstalling is deleting two paths.

**Learned:** Constraining a tool is more useful than empowering it.

**Assets** (5 files): `public/work/elena/desktop.jpg`, `public/work/elena/layers/hook.jpg`, `public/work/elena/layers/llm.jpg`, `public/work/elena/layers/mem.jpg`, `public/work/elena/layers/tools.jpg`

### FIG. 007: UAT Tracker

Testers walk through test cases per app and platform and record Pass, Fail, Blocked or N/A, with notes and screenshots. A read-only MCP server hands the failures to Claude Code.

| | |
|---|---|
| Year | 2026 |
| Leslie's role | Engineer |
| Status | LIVE |
| Categories | PRODUCT, SYSTEMS, WEB |
| Live | https://uat-tracker-standalone.vercel.app |
| Repo | https://github.com/Leslie-23/uat |
| Stack | Node.js · Express · MongoDB · MCP · Vercel |
| Form factor | Web |
| Product's own look (observed) | Utilitarian spreadsheet-like tool. Live site is only a login box, so use diagrams. |
| Current site accent/vibe |  · tagline "" |

**Layers** (top = what the user touches, bottom = what holds it up; used for the exploded view):
1. **TESTER UI**: One page: cases, results, notes, screenshots
2. **EXPRESS API**: Also deployed to Vercel via api/index.js
3. **TEST PLAN**: Seeded from seed_data.json
4. **MONGODB**: Results, notes, history
5. **MCP SERVER**: Read-only: failed cases to Claude Code

**Story**
- *THE JOB.* A tester opens an app, picks a platform and works through its cases. Each case ends as Pass, Fail, Blocked or N/A, with a note and a screenshot if something went wrong.
- *THE TWIST.* The test results are not just a report. A small read-only MCP server lets Claude Code and other MCP clients fetch the failed cases directly, so the thing that found the bug can hand it to the thing that fixes it.
- *THE BOUNDARY.* The MCP server is read-only by design. It can show what failed, who tested it and what the evidence was. It cannot mark anything as passed. Only a tester re-running the case can do that.

**Key decisions**
- **Evidence is screenshots.** Every result can carry a screenshot and a tester note, and the effective result is the most recent record per case and platform.
- **An AI reads; a human signs off.** Fixing code never changes a test status. Closing the loop needs a person.

**Learned:** Tooling for AI agents is mostly about what you refuse to let them do.

**Assets** (2 files): `public/work/uat/desktop.jpg`, `public/work/uat/mobile.jpg`

### FIG. 008: Stewardly

Smart duty scheduling for service teams: churches, nonprofits and volunteer groups. One click generates a fair, skill-balanced roster.

| | |
|---|---|
| Year | 2026 |
| Leslie's role | Engineer |
| Status | LIVE |
| Categories | PRODUCT, WEB |
| Live | https://church-scheduler-indol.vercel.app |
| Repo | https://github.com/Leslie-23/churchScheduler |
| Stack | Node.js · Express · MongoDB · Passport / Google OAuth · Groq · PWA |
| Form factor | Web |
| Product's own look (observed) | White page, deep forest green (#1a3c34) with condensed display type. Calm and organised. |
| Current site accent/vibe | green · tagline "Duty rosters, done right." |

**Layers** (top = what the user touches, bottom = what holds it up; used for the exploded view):
1. **INSTALLABLE PWA**: Vanilla HTML/CSS/JS, offline-capable
2. **ROSTER ENGINE**: Skills, availability, rotation, attire, reliability
3. **SMART REPLACEMENTS**: Ranked candidates with scores and reasons
4. **SMS + AI REPORTS**: Arkesel SMS, Groq (LLaMA) questions
5. **AUTH + DATA**: JWT, Google OAuth, MongoDB

**Story**
- *THE PROBLEM.* Weekly rosters for ushers, media, protocol, choir and hospitality teams usually live in spreadsheets and WhatsApp threads, and get decided by whoever remembers who served last.
- *ONE CLICK.* The roster generator weighs each member's skills, availability, rotation history, attire requirements and reliability score, so the schedule is fair because the rules are written down, not because someone is keeping track.
- *WHEN SOMEONE CANCELS.* Instead of a panicked group message, Stewardly ranks replacement candidates with a score and the reasoning behind it.
- *BUILT FOR REAL TEAMS.* Multiple units under one account, each with its own members and settings. New members can browse and request to join; admins approve. Three roles: Owner, Admin, Member.

**Key decisions**
- **No front-end framework.** Plain HTML, CSS and JavaScript with a service worker and manifest. It installs like an app and loads fast on cheap phones.
- **SMS where people actually are.** Duty reminders and broadcasts go to members' phones through an SMS provider, not another app they have to open.
- **Explainable suggestions.** Replacement candidates come with scores and reasons, so an admin can trust or override them.

**Learned:** A roster is a fairness problem before it's a calendar problem.

**Assets** (6 files): `public/work/stewardly/desktop.jpg`, `public/work/stewardly/mobile.jpg`, `public/work/stewardly/layers/comms.jpg`, `public/work/stewardly/layers/data.jpg`, `public/work/stewardly/layers/engine.jpg`, `public/work/stewardly/layers/swap.jpg`

### FIG. 009: Attendance

QR clock-in for small shops, verified by WiFi and GPS. No hardware, no subscription, just a phone and a QR code.

| | |
|---|---|
| Year | 2026 |
| Leslie's role | Engineer |
| Status | LIVE |
| Categories | PRODUCT, WEB, SYSTEMS |
| Live | https://employee-attendance-tracker-nine.vercel.app |
| Repo | https://github.com/Leslie-23/employeeAttendanceTracker |
| Stack | Node.js · Express · MongoDB Atlas · Chart.js · Vercel |
| Form factor | Web |
| Product's own look (observed) | Cream background, yellow and black, blocky 'brutalist' headlines. QR code is the hero. |
| Current site accent/vibe | orange · tagline "Clock in. Clock out." |

**Layers** (top = what the user touches, bottom = what holds it up; used for the exploded view):
1. **PERSONAL QR**: Each employee's code opens their own clock page
2. **PRESENCE CHECK**: Office WiFi, then GPS within 100 m
3. **EXPRESS API**: Vercel serverless functions
4. **ADMIN DASHBOARD**: Employees, printable QR, analytics, corrections
5. **AUDIT LOG**: MongoDB Atlas: time, IP, GPS, how it was verified

**Story**
- *THE PROBLEM.* Small shops track attendance with paper sheets (easy to fake), fingerprint machines (expensive hardware that breaks), HR software (overkill) or a shared tablet (anyone can tap in for anyone).
- *THE IDEA.* Make every employee's phone their clock-in device and make their unique QR code their identity. Scanning it opens their personal page, where one tap clocks them in or out.
- *A QR ISN'T ENOUGH.* Someone could photograph a colleague's code and scan it from home. So the server checks physical presence: first the shop's WiFi, then a GPS geofence of 100 metres as fallback.
- *THE HONEST FALLBACK.* If WiFi fails but GPS passes, the record is accepted but flagged in the log, so the admin can see which clock-ins used the fallback.

**Key decisions**
- **No build step, no framework.** Plain HTML, CSS and JS on the front end. QR codes are generated server-side.
- **Every record explains itself.** Each clock-in stores a timestamp, IP, GPS coordinates and the method that verified it.

**Learned:** The cheapest hardware is the one everyone already owns, as long as the server doesn't take its word for where it is.

**Assets** (6 files): `public/work/attendance/desktop.jpg`, `public/work/attendance/mobile.jpg`, `public/work/attendance/layers/admin.jpg`, `public/work/attendance/layers/api.jpg`, `public/work/attendance/layers/log.jpg`, `public/work/attendance/layers/presence.jpg`

### FIG. 010: De Sam's Studio

Photography, videography and editing studio in Accra: a Next.js site with a gallery, services and booking leads, backed by its own admin API.

| | |
|---|---|
| Year | 2026 |
| Leslie's role | Engineer |
| Status | LIVE |
| Categories | WEB, PRODUCT |
| Live | https://desamsstudio.vercel.app |
| Repo | https://github.com/Leslie-23/sammy |
| Stack | Next.js 16 · React 19 · Tailwind 4 · GSAP · Framer Motion · Express 5 · TypeScript · MongoDB · Cloudinary |
| Form factor | Web |
| Product's own look (observed) | Cinematic photography full-bleed, dark overlays, airy serif/sans mix. Image-led. |
| Current site accent/vibe | red · tagline "Every frame tells a story." |

**Layers** (top = what the user touches, bottom = what holds it up; used for the exploded view):
1. **NEXT.JS SITE**: Portfolio, gallery, about, services, contact
2. **MOTION LAYER**: GSAP + Framer Motion
3. **EXPRESS 5 API**: Auth, gallery, categories, leads, testimonials
4. **MEDIA**: Cloudinary uploads
5. **MONGODB**: Images, leads, testimonials, users

**Story**
- *THE BRIEF.* A photographer's site has to do two things: make the work look as good as the work, and turn a visitor into a booking.
- *TWO APPS.* A Next.js front end handles the portfolio, gallery, services, about, contact and testimonials pages. A separate Express 5 API handles auth, gallery images, categories, leads, testimonials and a dashboard.
- *THE STUDIO RUNS IT.* Images are uploaded to Cloudinary through the API behind JWT auth, so the studio can manage its own gallery and read incoming leads without touching code.

**Key decisions**
- **Front end and API split.** The marketing site and the management API deploy and change independently.
- **Leads are first-class data.** Enquiries are stored in the database and shown in a dashboard, not lost in an inbox.

**Learned:** A portfolio site is a sales tool. The gallery sells the work; the lead form sells the studio.

**Assets** (6 files): `public/work/de-sams-studio/desktop.jpg`, `public/work/de-sams-studio/mobile.jpg`, `public/work/de-sams-studio/layers/api.jpg`, `public/work/de-sams-studio/layers/data.jpg`, `public/work/de-sams-studio/layers/media.jpg`, `public/work/de-sams-studio/layers/motion.jpg`

### FIG. 011: Campus Connect

A university social and collaboration app: feed, events, connections, chat and a live campus map in one place. Its public site is uniCLIQ.

| | |
|---|---|
| Year | 2025— |
| Leslie's role | Engineer (team project) |
| Status | IN DEVELOPMENT |
| Categories | PRODUCT, MOBILE, SYSTEMS |
| Live | https://unicliq-web.vercel.app |
| Repo | https://github.com/Campus-Connect-v1/campus-connect |
| Stack | Expo · React Native · TypeScript · Express · Socket.IO · MySQL · Redis · Render |
| Form factor | **Phone app** (portrait screens) plus a website |
| Product's own look (observed) | Loud and playful: saturated purple, yellow, pink panels with chunky display lettering and phone mockups. |
| Current site accent/vibe | red · tagline "Your whole campus in one app." |

**Layers** (top = what the user touches, bottom = what holds it up; used for the exploded view):
1. **EXPO APP**: iPhone-first, Expo Router
2. **FEED + EVENTS**: Posts, stories, polls, events
3. **CONNECTIONS**: Requests, matching, privacy settings
4. **CAMPUS MAP**: Buildings, rooms, friend map, geofencing
5. **API + REALTIME**: Express, Socket.IO, MySQL, Redis, push

**Story**
- *THE IDEA.* A campus has plenty going on and nowhere to see it: events on notice boards, groups in chats, friends somewhere on the map. Campus Connect puts the feed, events, connections, chat and a live campus map in one app.
- *WHAT'S INSIDE.* A feed with stories and polls. Events you can mark as going. Connection requests and people you may know. Direct and group chats with photos and polls. Profiles built from your course and interests. And a campus map with every building and room, plus a friend map.
- *THE SOCIAL LOOP.* The feed, matching and privacy settings all depend on connections, so the request-accept-decline loop is the spine of the product. Without a way to accept a request, the graph never forms, and none of the rest can work.
- *BUILT LIKE A PRODUCT.* The repo carries a real App Store checklist: in-app account deletion, content reporting, terms and privacy inside the app, seeded review accounts, and a keep-awake job so a free-tier API doesn't greet a reviewer with a blank screen.

**Key decisions**
- **Audit the API against the app.** The server has 125 routes. A written audit tracks which ones the app actually uses, which are admin-only, and which are blocked on the backend, so 'done' means something.
- **Location is safe by default.** Sharing, the friend map and geofencing are features people can get wrong, so the debug location endpoints return 404 in production.
- **Realtime where it counts.** Chat runs over Socket.IO. Everything else stays on plain, documented HTTP routes.

**Learned:** A social app is a graph first. Until someone can accept a request, nothing built on top of connections can exist.

**Assets** (8 files): `public/work/campus-connect/desktop.jpg`, `public/work/campus-connect/mobile.jpg`, `public/work/campus-connect/gallery/campus-map.jpg`, `public/work/campus-connect/gallery/chat.jpg`, `public/work/campus-connect/gallery/connect.jpg`, `public/work/campus-connect/gallery/events.jpg`, `public/work/campus-connect/gallery/home.jpg`, `public/work/campus-connect/gallery/profile.jpg`

### Notes on specific case studies

- **Trofficient.** Screens in `public/work/trofficient/phone/` are real iPhone frames cropped from screen recordings (status bar removed). Contains the on-screen names noted in Section 4: fine to use as-is only if Leslie accepts "Good morning, Leslie"; the driver frame shows "Hello, Kwame". Production runs on a single Oracle Cloud VM (see /infra). The architecture doc in the repo describes a bigger *planned* system; do not present that as built.
- **StepPool.** The product is also "FitnessTracker" in his local folder; the GitHub repo is `steppool`. Real screens: 15 PNGs were available; 7 are included. A legal line matters to the story: paid entry is built but switched off pending legal review.
- **VoIP.** Public site `vop.mytrofficient.com` (it is hosted under the Trofficient domain). Live status "API preview". The audio acceptance test on the production host was still pending at last read; don't claim it passed.
- **Beagine.** No real in-app screenshots exist in the repo. The current site uses the designed App Store banners and a capture of the waitlist site. **If you can, request real screens** (Section 9). Three apps: Beagine (customer), Beagine Pro (specialist), Beagine Store (vendor). Brand orange #ff5f15.
- **Campus Connect.** The designed App Store screenshots are the strongest visual asset in the whole portfolio (bold, colourful). Public marketing site is uniCLIQ.
- **Elena / scrapy-mcp / UAT Tracker.** Developer tooling with no visual UI of its own; show as diagrams and terminal captures.

---

## 7. Other live sites and apps (tier 2)

Smaller or client-style builds that are live. All have a desktop + phone capture in `public/work/<slug>/`.

| Name | Kind | Year | What it is | Live | Source | Caveat |
|---|---|---|---|---|---|---|
| Sellis Beauty Spa | BUSINESS SITE | 2026 | Luxury beauty and spa in Accra: hair, spa, nails, waxing and lash treatments. Live on its own domain. | https://sellisspa.com | private | Client/business site. Leslie confirmed it's his work. Confirm the client is fine with display. |
| Captivating Home & Trading | RETAIL PLATFORM | 2026 | Platform for a Ghanaian retail operation: home appliances, electricity vending and currency exchange. Live on its own domain. | https://captivatinghometrade.com | private | Employer-adjacent retail business. Confirm before featuring prominently. |
| Nene Collectionz | STOREFRONT | 2026 | Wigs, wholesale and retail from Spintex, Accra: braided wigs, frontals and glueless units, ordered on WhatsApp and shipped worldwide. | https://nene-collectionz.leslieajayi27.workers.dev/ | private | New site (Cloudflare Workers). Use only the clean marketing screens (home). No admin/contact screens. |
| GHS to NGN Rate Desk | INTERNAL TOOL | 2026 | Internal rate calculator with MongoDB-backed shared rates, so a whole team quotes the same number. | https://rate-calc-kappa.vercel.app | https://github.com/Leslie-23/rateCalc |  |
| PAL Shop | WEB APP | 2024 | E-commerce app where you can buy goods and sell them, with accounts, a cart and a checkout flow. | https://paltech-e-commerce.netlify.app | private |  |
| Grilli | TEMPLATE | 2024 | A restaurant landing page, hand-built in HTML and CSS. | https://web-plusplus.vercel.app | https://github.com/Leslie-23/web-plusplus |  |
| Dev Ex | WEB APP | 2025 | Daily coding challenges for every skill level, with progress tracking, leaderboards and AI-powered feedback. | https://leslie23-dev-experience2k25.netlify.app | https://github.com/Leslie-23/DEV-experience |  |

**Verified broken at last check (do not feature):** Efo Kodjo (shows "Failed to load content"), PALtech Weather (missing API key), Food Delivery App (serves raw JS), School Management, The Word demo, Vina Works and several older deployments return only an API response or 404.

**Related public sites found but not yet on the portfolio (need Leslie's call):**

| Site | What | Note |
|---|---|---|
| `help.mytrofficient.com` | Trofficient Help Center (guides for riders, drivers, fleets) | Public, screenshot-ready. Fits under the Trofficient case study. |
| `api.mytrofficient.com` | Trofficient Partner API docs (Greater Accra trotro routes, stops, journey planning, fares, live vehicles) | Public. Strong engineering signal. |
| `www.mytrofficient.com` | Trofficient marketing site | Public. |
| `admin.mytrofficient.com`, `operator.mytrofficient.com` | Trofficient admin and operator consoles | Login screens only. |
| `site-pi-eosin-28.vercel.app` | Family Bible website ("Scripture for the whole family") | Public; lets The Word (Flutter) become a full entry. |
| `rate-calc-customer.vercel.app` | Customer-facing twin of the Rate Desk | Public. |
| `v0-mermaid-to-website.vercel.app` | Trofficient architecture explainer | Public. |
| `unicliq-web.vercel.app` | uniCLIQ: Campus Connect's marketing site | Already used. |
| `fr-faiy.vercel.app` | Ledger: SME tax log (repo `fr`) | Login only. |
| `smart-marking-system.vercel.app` | deMaster exam marker (repo owned by a collaborator) | Login only. His role unconfirmed. |
| `moveet.cloud` | Moveet Cloud (startup cloud setup) | Org is private; affiliation only. |

---

## 8. Everything else on GitHub (tools, experiments, history)

These make the "curious builder" story. Most are *not* on the current site. Group them; don't give each a page.

### Tools and open source (good candidates for a "Tools" or "Bench" section)

| Name | What it is | Stack / status | Link |
|---|---|---|---|
| **git-helper** (npm: `npm-git-helper`) | "The Git CLI that writes your commit messages." Stage, commit and push in one command; if you set a key, Claude or GPT drafts the commit message from the staged diff. | Node.js CLI · **published on npm, v3.0.0** | github.com/Leslie-23/git-helper |
| **Keybinding Doctor** (repo `vsce`) | VS Code extension that finds likely keyboard-shortcut conflicts and generates small `keybindings.json` fixes. | TypeScript · prototype. It honestly states VS Code doesn't expose the full resolver, so it reports *likely* conflicts. | github.com/Leslie-23/vsce |
| **Plain Code Reader** (repo `codereader`) | VS Code extension that breaks a file into plain-English explanations of functions/classes/types; code diagram, project map, call-flow, inline summaries. Static analysis runs offline; AI explanations are optional. | TypeScript · JS/TS/JSX/TSX supported · **private repo** | not public |
| **Holo** | Experimental native macOS utility that turns the desk around a MacBook into four tap zones, using the microphone and DSP. | Swift/macOS · research prototype. It explicitly claims no accuracy until measured per laptop. | github.com/Leslie-23/Holo |
| **Shake Alarm** (repo `wakey`) | Alarm app you must shake to dismiss. Local notifications, accelerometer detection, sync across devices. | Expo SDK 57 + Express/MongoDB monorepo | github.com/Leslie-23/wakey |
| **Round** (repo `rounds`) | Restaurant membership club MVP: one Expo app for members, staff, owners and admins via role-based routes. | Expo · Express · MongoDB · Stripe · JWT | github.com/Leslie-23/rounds |
| **FR Homes** (repo `sl`) | A Ghana property marketplace linking tenants/buyers, agents and landlords, "by FR Cares". Full product plan exists. | Next.js · Expo · NestJS + Prisma/PostgreSQL monorepo | github.com/Leslie-23/sl · **confirm client approval** |
| **SmartScan** | AI receipt scanner: OCR then LLM extraction of vendor, items, totals, tax; export JSON/CSV. | Node/Express · HuggingFace | github.com/Leslie-23/smartScan |
| **OpenStock (deployment)** | A deployment of the open-source OpenStock inventory system (by florianjs): *not Leslie's product*. | Nuxt 4 · Cloudflare D1 | credit upstream |
| **osAfrica** | An AI-native operating system, in active development. Nothing to show yet. | Python | github.com/Leslie-23/osAfrica |
| **mcp-weather** | An MCP server example. | TypeScript | github.com/Leslie-23/mcp-weather |
| **VIEN** | Rustic, "edgy" shoe store: React + Vite + Express + MongoDB + Cloudinary. Pages: home, shop, product, about, contact. | TypeScript | github.com/Leslie-23/vien |
| **The Word** (repo `Family-Bible`) | Open-source Flutter Bible app: multiple versions, search, bookmarks, daily notifications. | Flutter | github.com/Leslie-23/Family-Bible |

### Experiments the site already treats as "The Bench"

| EXP | Question | Status |
|---|---|---|
| 001 | Can a website take itself apart, and put itself back together? | WORKING |
| 002 | Can an interaction be driven entirely by scroll velocity? | PROMISING |
| 003 | What does a system look like when you can pull on it? | WORKING |
| 004 | How do you address a chessboard shaped like a cross? | WORKING |
| 005 | Can a cursor be a scanner? | TESTING |
| 006 | What changes if AI is a first-class primitive in an operating system, rather than an assistant bolted on top? | TESTING |
| 007 | Can a keyboard be a beat machine? | WHY DID I BUILD THIS? |
| 008 | What does the Chrome dino game do when you stop playing fair? | ABANDONED |

### The history (use for a timeline; don't list repo by repo)

| Era | What the repos show |
|---|---|
| **2023: first code** (10 repos) | C++ console programs: payroll calculators, projectile and trajectory calculators, an "online KFC menu", rating apps. Learning the fundamentals. |
| **2024: breadth** (83 repos) | Web everywhere: React and MERN apps, e-commerce (a wig-store mock, PAL Shop), a school management system, a food delivery app, campus food ordering, church attendance counters and a church management system, expense trackers, weather and Bible apps, LeetCode practice, Python scrapers and Mandelbrot visualisations, C#/Java exercises, a git CLI. |
| **2025: mobile + AI + first products** (34) | Expo/React Native courses and apps, a speech-accessibility hackathon project, Expo fitness apps, an AI receipt scanner, the Trofficient spec and build. |
| **2026: systems and products** (31) | StepPool, 4-Man Chess, scrapy-mcp, Elena, UAT Tracker, Stewardly, Attendance, Campus Connect, VoIP, Beagine, osAfrica, VS Code tooling, MCP servers. Shift from apps to infrastructure and tools. |

**Possible thread (confirm with Leslie; not stated in the repos):** the 2024 church attendance counters and church management system look like early versions of the problem Stewardly later solved; the 2025 fitness apps (fitnessMobileApp, a campus Ignite Gym clone) precede StepPool.

### Archive (small public repos, one line each; low priority)

openstock (2026, DEPLOYMENT) · The Word (2026, MOBILE) · School-Management-System (2024, WEB) · PALtech Weather (2024, WEB) · expense-tracker (2024, WEB) · mcp-weather (2026, SYSTEMS) · npm-git-helper (2026, PACKAGE) · wakey (2026, APP) · osAfrica (2026, SYSTEMS) · smartScan (2025, APP) · create-velocity-app (2025, PACKAGE) · fitnessMobileApp (2025, MOBILE) · HACK (2025, HACKATHON) · campusBite-Hub (2024, WEB) · gamify-UNI (2024, WEB) · keyboardBeatMachine (2024, EXPERIMENT) · ChromeDino-cheatCode (2024, EXPERIMENT)

---

## 9. Engineering knowledge and infrastructure (safe-to-show)

Leslie wants his server and architecture knowledge visible. These claims each trace to a real config in his **own** projects. The current /infra page shows them as topology diagrams.

**SERVERS + HOSTING.** Machines I set up and keep running, and the platforms I choose when I don't need a machine.
- *Oracle Cloud (Ampere ARM):* Two self-managed production stacks: the VoIP platform and Trofficient. Docker Compose on the VM, with setup and backup scripts in the repo.
- *Render:* StepPool's API runs in Frankfurt, the closest Render region to Accra. Campus Connect's API runs there too, with a keep-awake job for the free tier.
- *Vercel:* Most sites and several APIs, with custom domains and subdomains. Trofficient alone runs admin, operator, API and help sites.
- *Cloudflare:* Workers and D1 for Nene Collectionz. Pages, D1 and KV for an OpenStock deployment.
- *MongoDB Atlas + Hostinger:* Managed MongoDB for StepPool and Attendance. Hostinger for MySQL and DNS.

**NETWORKING + EDGE.** How traffic gets in, and how audio gets through NAT.
- *Caddy:* Reverse proxy with automatic Let's Encrypt certificates and WebSocket passthrough, in front of both Oracle stacks.
- *STUN / TURN with Coturn:* Relays WebRTC audio when a direct path fails. Includes the public and private address mapping a cloud host needs for ICE.
- *WebSockets:* Socket.IO for live tracking, game rooms and chat, with a Redis adapter so more than one server can share a room.
- *Domains and DNS:* Custom domains with a subdomain per app.

**DATA.** Picking the right store for each kind of data, and running it.
- *PostgreSQL 16:* Tenants, call history and the voice engine's realtime configuration. Migrations run as their own job.
- *MySQL 8 + MongoDB 6:* Relational data and transactions in MySQL, GPS logs and flexible documents in MongoDB, side by side in one Compose stack.
- *MongoDB replica set:* StepPool settles money, so it runs as a replica set, because transactions need one.
- *Redis + BullMQ:* Caches, rate-limit counters and background jobs: lifecycle jobs, last-hour pushes and settlement sweeps.
- *OSRM:* A self-hosted routing engine, with separate car and foot profiles and a memory limit on each container.

**DELIVERY.** Getting changes to production without drama.
- *Docker and Compose:* Pinned image versions, non-root users, health checks, and host networking where a voice engine needs real UDP.
- *CI with GitHub Actions:* Lint, type-check, tests, and an Expo web export for each app on every push.
- *Blueprints and config as code:* Render blueprints, Wrangler config and Compose files live in the repo next to the code.
- *Runbooks and backups:* A step-by-step deploy runbook with a smoke-test matrix, and a database backup script for the production box.
- *Mobile releases with EAS:* Build, submit and over-the-air updates for the Expo apps.

**OBSERVABILITY.** Knowing it's broken before someone tells me.
- *Datadog agent:* Container metrics for the production box.
- *Health checks:* Liveness and readiness endpoints, and Docker health checks that gate what starts after what.
- *Sentry:* Crash and error reporting in the mobile apps.

**SECURITY.** Boring on purpose.
- *Least-privilege credentials:* Owner-level database credentials stay out of long-running services. Migrations run as a one-shot job.
- *Verified builds:* Pinned versions, and the Asterisk source checked against the publisher's SHA-256 before it's built.
- *Safe by default:* Helmet, JWT, per-tenant call limits, signed webhooks, and a crawler that refuses private and cloud-metadata addresses on every redirect.
- *Secrets never in the repo:* Secrets are set on the host or platform, not committed. The legally risky feature stays behind a flag until it's reviewed.

**Things that bit me** (real lessons, good for storytelling):
- The build left out a module, and nothing said so. A missing system library made the Asterisk image silently drop its PostgreSQL module. The Dockerfile now builds from an explicit module list and checks every one has a source file. *(VoIP handoff)*
- Every endpoint looked offline. Contacts were never qualified, so the voice engine reported every registered browser as unreachable and every call would have been rejected. Fixed during a full-stack rehearsal, before anyone called. *(VoIP rehearsal)*
- Browsers behind NAT were never rewritten. The NAT module wasn't loaded, so contact addresses stayed private. Media only works when the address the engine advertises is the one the browser can reach. *(VoIP rehearsal)*
- A free tier sleeps. A reviewer won't wait. Render's free tier spins down after 15 minutes, and a 50-second blank screen fails an App Store review. The API pings its own health endpoint, with a GitHub schedule as a backstop that runs hours late. *(Campus Connect)*
- Put the server near the users. StepPool's API runs in Frankfurt because it's the closest Render region to Accra. *(StepPool)*

Employer cloud and infrastructure work is **not** to be illustrated or described. At most one non-specific line such as "I work with cloud infrastructure in production at work" is acceptable. Ask Leslie first.

### Toolkit → evidence map

The toolkit page groups technology by purpose and links each to projects that prove it. Use this mapping rather than a logo wall or skill percentages (he explicitly doesn't want those).

**INTERFACES**
- React → ai-sme (also: Sellis, School Management, E-Commerce App, Expense Tracker)
- Next.js → four-man-chess, de-sams-studio
- TypeScript → trofficient, steppool, four-man-chess, ai-sme, elena, de-sams-studio, vop, beagine
- React Native / Expo → trofficient, steppool, campus-connect, beagine
- Flutter (also: The Word)
- Tailwind CSS → ai-sme, de-sams-studio
- GSAP + Motion → de-sams-studio (also: this site)
- Installable PWAs → stewardly

**SYSTEMS**
- Node.js → steppool, ai-sme, elena, uat-tracker, stewardly, attendance, de-sams-studio, campus-connect, vop, trofficient
- Express / Fastify → steppool, four-man-chess, ai-sme, uat-tracker, stewardly, attendance, de-sams-studio, campus-connect
- Socket.IO → steppool, four-man-chess, campus-connect, beagine
- MongoDB → steppool, ai-sme, uat-tracker, stewardly, attendance, de-sams-studio, trofficient (also: Rate Desk)
- MySQL → campus-connect, trofficient
- PostgreSQL → vop (also: USSD services at work)
- Asterisk · SIP · WebRTC → vop
- Redis + BullMQ → steppool, campus-connect, trofficient
- Auth: JWT, Google OAuth → ai-sme, stewardly, de-sams-studio
- Python → scrapy-mcp

**INFRASTRUCTURE**
- Vercel → ai-sme, uat-tracker, stewardly, attendance, de-sams-studio (also: most of the shipped sites)
- Cloudflare (Workers, Pages, D1) (also: Nene Collectionz, an OpenStock deployment)
- Oracle Cloud (ARM) → vop, trofficient
- Caddy (automatic TLS) → vop, trofficient
- Coturn (STUN / TURN) → vop
- Docker + Compose → vop, trofficient
- Render → steppool, campus-connect
- Cloudinary media pipeline → de-sams-studio
- Monorepos (pnpm, Turborepo) → four-man-chess

**PRODUCT**
- MCP / LLM integration → scrapy-mcp, ai-sme, elena, uat-tracker, stewardly
- Shared contracts (zod) → steppool, four-man-chess
- Mobile money + SMS → trofficient, steppool, stewardly, beagine
- Presence verification (QR, WiFi, GPS) → attendance
- System design → trofficient, steppool, four-man-chess, scrapy-mcp, ai-sme, elena, uat-tracker, stewardly, attendance, de-sams-studio, campus-connect, vop

---

## 10. Writing on the site (voice)

Direct, short, a little dry, never corporate. Avoid "passionate", "results-driven", "cutting-edge", "scalable solutions". Examples he liked: "I like knowing how things work. Then I build them." · "Build. Test. Question. Repeat." · "Good software is more than good code." · "I make things. Then I ask how they break." Section labels are mono and numbered ("FIG. 003", "EXP. 014", "NOTE 004").

**Notes** (placeholder writing, drafted from decisions documented in his repos; Leslie should edit):
- NOTE 004: *Ship the executable MVP, then layer*: I've killed my own over-engineered microservice plans when a monolith shipped faster.
- NOTE 003: *Put the rules in a package with no dependencies*: How 4-Man Chess validates a move in the browser and on the server with the same code.
- NOTE 002: *Run the crawler in a subprocess*: Why scrapy-mcp starts a fresh process for every call.
- NOTE 001: *Build the risky feature. Ship it switched off.*: StepPool has a paid-entry mode. It's behind a flag until legal review.

---

## 11. Open questions and gaps

**Ask Leslie (or get from him):**
1. **Real in-app screenshots** for Beagine (all three apps), Trofficient (rider, driver, operator) and VoIP's calling UI. None exist in the repos except marketing art and screen-recording frames.
2. Confirm **roles** and wording for VoIP, Beagine, Campus Connect.
3. Confirm whether **Sellis**, **Captivating Home**, **FR Homes** can be shown, and how.
4. A **better portrait/photo** and a short bio in his own words. The current bio is assembled from his GitHub profile.
5. **Real testimonials**, if any (none exist; don't invent).
6. **CV/résumé PDF**: removed in the rebuild; a download link may be wanted.
7. Subdomain plan: which apps get `<name>.leslieajayi.com`.
8. Contact form: currently opens a pre-filled email (no backend). Does he want a real form handler?

**Known visual weaknesses in the current build (your opportunities):** the first screen is type-only and could carry more of his character; the case-study pages are long and repetitive; Beagine and Trofficient lack real app screens; there is no resume page; the archive is a plain grid.

---

## Pack contents

- `BRIEF.md`: this document
- `projects.json`: all structured project data (case studies, shipped sites, archive, experiments, toolkit, infra)
- `public/work/<project>/`: screenshots (desktop.jpg, mobile.jpg, plus gallery/phone/layers folders)
- `public/portrait/`, `public/brand/`, `public/affil/`, `public/work/icons/`: portrait, brand art, organisation logos, app icons

/* Infrastructure content. Every line traces to a real config or doc in Leslie's repos.
   The "AT WORK" sections are service-level only: no account details, resource names or configuration. */

export type InfraItem = { name: string; note: string; used?: string[]; also?: string[] };
export type InfraGroup = { id: string; label: string; blurb: string; items: InfraItem[] };

export const INFRA: InfraGroup[] = [
  {
    id: "servers",
    label: "SERVERS + HOSTING",
    blurb: "Machines I set up and keep running, and the platforms I choose when I don't need a machine.",
    items: [
      { name: "Oracle Cloud (Ampere ARM)", note: "Two self-managed production stacks: the VoIP platform and Trofficient. Docker Compose on the VM, with setup and backup scripts in the repo.", used: ["vop", "trofficient"] },
      { name: "Render", note: "StepPool's API runs in Frankfurt, the closest Render region to Accra. Campus Connect's API runs there too, with a keep-awake job for the free tier.", used: ["steppool", "campus-connect"] },
      { name: "Vercel", note: "Most sites and several APIs, with custom domains and subdomains. Trofficient alone runs admin, operator, API and help sites.", used: ["trofficient", "ai-sme", "stewardly", "attendance", "de-sams-studio"] },
      { name: "Cloudflare", note: "Workers and D1 for Nene Collectionz. Pages, D1 and KV for an OpenStock deployment.", also: ["Nene Collectionz", "OpenStock deployment"] },
      { name: "MongoDB Atlas + Hostinger", note: "Managed MongoDB for StepPool and Attendance. Hostinger for MySQL and DNS.", used: ["steppool", "attendance", "campus-connect"] },
    ],
  },
  {
    id: "network",
    label: "NETWORKING + EDGE",
    blurb: "How traffic gets in, and how audio gets through NAT.",
    items: [
      { name: "Caddy", note: "Reverse proxy with automatic Let's Encrypt certificates and WebSocket passthrough, in front of both Oracle stacks.", used: ["vop", "trofficient"] },
      { name: "STUN / TURN with Coturn", note: "Relays WebRTC audio when a direct path fails. Includes the public and private address mapping a cloud host needs for ICE.", used: ["vop"] },
      { name: "WebSockets", note: "Socket.IO for live tracking, game rooms and chat, with a Redis adapter so more than one server can share a room.", used: ["trofficient", "steppool", "four-man-chess", "campus-connect"] },
      { name: "Domains and DNS", note: "Custom domains with a subdomain per app.", used: ["trofficient"] },
    ],
  },
  {
    id: "data",
    label: "DATA",
    blurb: "Picking the right store for each kind of data, and running it.",
    items: [
      { name: "PostgreSQL 16", note: "Tenants, call history and the voice engine's realtime configuration. Migrations run as their own job.", used: ["vop"] },
      { name: "MySQL 8 + MongoDB 6", note: "Relational data and transactions in MySQL, GPS logs and flexible documents in MongoDB, side by side in one Compose stack.", used: ["trofficient", "campus-connect"] },
      { name: "MongoDB replica set", note: "StepPool settles money, so it runs as a replica set, because transactions need one.", used: ["steppool"] },
      { name: "Redis + BullMQ", note: "Caches, rate-limit counters and background jobs: lifecycle jobs, last-hour pushes and settlement sweeps.", used: ["steppool", "trofficient", "campus-connect"] },
      { name: "OSRM", note: "A self-hosted routing engine, with separate car and foot profiles and a memory limit on each container.", used: ["trofficient"] },
    ],
  },
  {
    id: "delivery",
    label: "DELIVERY",
    blurb: "Getting changes to production without drama.",
    items: [
      { name: "Docker and Compose", note: "Pinned image versions, non-root users, health checks, and host networking where a voice engine needs real UDP.", used: ["vop", "trofficient"] },
      { name: "CI with GitHub Actions", note: "Lint, type-check, tests, and an Expo web export for each app on every push.", used: ["trofficient"] },
      { name: "Blueprints and config as code", note: "Render blueprints, Wrangler config and Compose files live in the repo next to the code.", used: ["steppool", "campus-connect"], also: ["Nene Collectionz"] },
      { name: "Runbooks and backups", note: "A step-by-step deploy runbook with a smoke-test matrix, and a database backup script for the production box.", used: ["vop", "trofficient"] },
      { name: "Mobile releases with EAS", note: "Build, submit and over-the-air updates for the Expo apps.", used: ["trofficient", "steppool", "campus-connect"] },
    ],
  },
  {
    id: "observe",
    label: "OBSERVABILITY",
    blurb: "Knowing it's broken before someone tells me.",
    items: [
      { name: "Datadog agent", note: "Container metrics for the production box.", used: ["trofficient"] },
      { name: "Health checks", note: "Liveness and readiness endpoints, and Docker health checks that gate what starts after what.", used: ["vop", "trofficient", "steppool"] },
      { name: "Sentry", note: "Crash and error reporting in the mobile apps.", used: ["trofficient"] },
    ],
  },
  {
    id: "security",
    label: "SECURITY",
    blurb: "Boring on purpose.",
    items: [
      { name: "Least-privilege credentials", note: "Owner-level database credentials stay out of long-running services. Migrations run as a one-shot job.", used: ["vop"] },
      { name: "Verified builds", note: "Pinned versions, and the Asterisk source checked against the publisher's SHA-256 before it's built.", used: ["vop"] },
      { name: "Safe by default", note: "Helmet, JWT, per-tenant call limits, signed webhooks, and a crawler that refuses private and cloud-metadata addresses on every redirect.", used: ["vop", "trofficient", "scrapy-mcp"] },
      { name: "Secrets never in the repo", note: "Secrets are set on the host or platform, not committed. The legally risky feature stays behind a flag until it's reviewed.", used: ["steppool", "campus-connect"] },
    ],
  },
];

/* ---------- topologies ---------- */
export type TNode = { id: string; x: number; y: number; w: number; h: number; label: string; sub?: string; tone?: "accent" | "ink" };
export type TEdge = { from: string; to: string; label?: string; side?: "h" | "v"; dashed?: boolean };
export type TGroup = { x: number; y: number; w: number; h: number; label: string };
export type Topology = { id: string; title: string; kicker: string; blurb: string; vb: [number, number]; nodes: TNode[]; edges: TEdge[]; groups?: TGroup[]; link?: { href: string; label: string } };

export const TOPOLOGIES: Topology[] = [
  {
    id: "vop",
    kicker: "FIG. 050 / MINE",
    title: "The voice stack",
    blurb: "VoIP, self-hosted on one server. The browser signs in over HTTPS, signals over WebSocket, and sends audio directly or through a relay.",
    vb: [900, 400],
    link: { href: "/work/vop", label: "THE CASE STUDY" },
    groups: [{ x: 214, y: 24, w: 662, h: 352, label: "ORACLE CLOUD (ARM) · DOCKER COMPOSE" }],
    nodes: [
      { id: "clients", x: 24, y: 165, w: 130, h: 70, label: "BROWSER", sub: "JsSIP · SDKs" },
      { id: "caddy", x: 240, y: 165, w: 130, h: 70, label: "CADDY", sub: "automatic TLS" },
      { id: "api", x: 450, y: 56, w: 190, h: 70, label: "API", sub: "Node 22 · TypeScript", tone: "accent" },
      { id: "ast", x: 450, y: 165, w: 190, h: 70, label: "ASTERISK 22", sub: "PJSIP · ARI", tone: "accent" },
      { id: "turn", x: 450, y: 274, w: 190, h: 70, label: "COTURN", sub: "STUN / TURN relay" },
      { id: "pg", x: 700, y: 110, w: 160, h: 70, label: "POSTGRESQL 16", sub: "tenants · history" },
    ],
    edges: [
      { from: "clients", to: "caddy", label: "HTTPS · WSS" },
      { from: "caddy", to: "api" },
      { from: "caddy", to: "ast", label: "SIP / WSS" },
      { from: "api", to: "ast", label: "ARI", side: "v", dashed: true },
      { from: "api", to: "pg" },
      { from: "ast", to: "pg", label: "config" },
      { from: "clients", to: "turn", label: "audio relay" },
      { from: "turn", to: "ast", side: "v", dashed: true },
    ],
  },
  {
    id: "trofficient",
    kicker: "FIG. 051 / MINE",
    title: "Trofficient in production",
    blurb: "One Oracle VM, one Compose file. Three databases, a routing engine and a reverse proxy, watched by a metrics agent.",
    vb: [900, 440],
    link: { href: "/work/trofficient", label: "THE CASE STUDY" },
    groups: [{ x: 214, y: 24, w: 662, h: 392, label: "ORACLE CLOUD (ARM) · DOCKER COMPOSE" }],
    nodes: [
      { id: "apps", x: 24, y: 185, w: 130, h: 70, label: "RIDER + DRIVER", sub: "React Native apps" },
      { id: "caddy", x: 240, y: 185, w: 130, h: 70, label: "CADDY", sub: "automatic TLS" },
      { id: "api", x: 430, y: 185, w: 170, h: 70, label: "NODE API", sub: "Express · Socket.IO", tone: "accent" },
      { id: "mysql", x: 690, y: 50, w: 170, h: 56, label: "MYSQL 8" },
      { id: "mongo", x: 690, y: 126, w: 170, h: 56, label: "MONGODB 6" },
      { id: "redis", x: 690, y: 202, w: 170, h: 56, label: "REDIS 7" },
      { id: "osrm", x: 690, y: 278, w: 170, h: 56, label: "OSRM", sub: "car + foot routing" },
      { id: "dd", x: 430, y: 330, w: 170, h: 56, label: "DATADOG AGENT", sub: "metrics" },
    ],
    edges: [
      { from: "apps", to: "caddy", label: "HTTPS · WSS" },
      { from: "caddy", to: "api" },
      { from: "api", to: "mysql" },
      { from: "api", to: "mongo" },
      { from: "api", to: "redis" },
      { from: "api", to: "osrm" },
      { from: "dd", to: "api", side: "v", dashed: true, label: "watches" },
    ],
  },
];

/* ---------- AWS at work ---------- */
export const AWS_NOTE = "Service-level overview of production systems I work on at Global Icons. No account details, resource names or configuration.";
export const AWS_BLOCKS: { id: string; title: string; kicker: string; points: string[] }[] = [
  {
    id: "tfg",
    kicker: "TRANSPORT FOR GHANA BACKENDS",
    title: "Serverless and containers, side by side",
    points: [
      "Serverless Framework services: Lambda with API Gateway, scheduled jobs, S3 pre-signed uploads, and DynamoDB where it fits.",
      "Containerised services built and pushed by GitHub Actions to ECR, then deployed to ECS.",
      "Amplify for web apps, and Docker Compose with MongoDB and Redis for local development.",
      "PostgreSQL with TypeORM for service backends, MongoDB for flexible data.",
    ],
  },
];

/* ---------- things that bit me ---------- */
export const LESSONS: { n: string; head: string; body: string; from: string }[] = [
  { n: "01", head: "The build left out a module, and nothing said so.", body: "A missing system library made the Asterisk image silently drop its PostgreSQL module. The Dockerfile now builds from an explicit module list and checks every one has a source file.", from: "VoIP handoff" },
  { n: "02", head: "Every endpoint looked offline.", body: "Contacts were never qualified, so the voice engine reported every registered browser as unreachable and every call would have been rejected. Fixed during a full-stack rehearsal, before anyone called.", from: "VoIP rehearsal" },
  { n: "03", head: "Browsers behind NAT were never rewritten.", body: "The NAT module wasn't loaded, so contact addresses stayed private. Media only works when the address the engine advertises is the one the browser can reach.", from: "VoIP rehearsal" },
  { n: "04", head: "A free tier sleeps. A reviewer won't wait.", body: "Render's free tier spins down after 15 minutes, and a 50-second blank screen fails an App Store review. The API pings its own health endpoint, with a GitHub schedule as a backstop that runs hours late.", from: "Campus Connect" },
  { n: "05", head: "Put the server near the users.", body: "StepPool's API runs in Frankfurt because it's the closest Render region to Accra.", from: "StepPool" },
];

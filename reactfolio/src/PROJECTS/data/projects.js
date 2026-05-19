// src/PROJECTS/data/projects.js
export const projectsData = {
	"osafrica": {
		id: 1,
		title: "osAfrica",
		description:
			"An AI-native operating system in active development. Rethinks the OS layer with AI as a first-class primitive instead of a bolted-on assistant.",
		fullDescription:
			"osAfrica is an experimental operating system that treats AI as a core OS primitive rather than an application running on top. Instead of bolting a chatbot onto a traditional shell, the system is designed around intent-first interaction, model-aware scheduling, and a runtime where AI-mediated actions are routed through the same primitives as system calls. The project explores what a desktop and process model look like when an LLM is part of the kernel-adjacent control plane.",
		techStack: ["Python", "Systems Programming", "LLM Runtimes"],
		webScreenshot: "https://placehold.co/800x450/0a0f0a/4ade80?text=osAfrica",
		mobileScreenshot: "https://placehold.co/300x600/0a0f0a/4ade80?text=osAfrica",
		liveLink: "",
		githubLink: "https://github.com/Leslie-23/osAfrica",
		demoLink: "",
		features: [
			"AI as a first-class OS primitive, not an add-on",
			"Intent-first interaction layer",
			"Model-aware process scheduling",
			"Pluggable LLM runtime",
		],
		status: "In Development",
		category: "Systems",
		timeline: "Ongoing",
		teamSize: "Solo",
		challenges: [
			"Designing an OS-level abstraction for AI without leaking model concerns into every subsystem",
			"Balancing determinism with the non-determinism of model outputs",
			"Performance overhead of routing actions through a model",
		],
		solutions: [
			"Defined a narrow set of intent primitives that compose into system actions",
			"Used deterministic fallbacks and structured outputs to constrain model behavior",
			"Cached intent → action plans to amortize model cost",
		],
		documentation:
			"osAfrica is a research-grade exploration of AI-native operating systems. Source is published on GitHub; this is solo work in active development with no fixed release timeline.",
	},

	"trofficient": {
		id: 2,
		title: "Trofficient",
		description:
			"Transit intelligence platform for Ghana's informal trotro network — real-time tracking, dynamic pricing, and mobile-money payments.",
		fullDescription:
			"Trofficient is a transit intelligence platform built for Ghana's informal trotro ecosystem. It brings real-time vehicle tracking, dynamic pricing, and mobile-money settlement to a transport system that today runs almost entirely on paper, shouting, and cash. The mobile app gives riders live arrival information and in-app payment; the operator dashboard handles fleet visibility, route economics, and driver payout reconciliation.",
		techStack: [
			"React Native",
			"Node.js",
			"Socket.io",
			"PostgreSQL",
			"Mobile Money APIs",
		],
		webScreenshot: "https://placehold.co/800x450/0a0f0a/4ade80?text=Trofficient",
		mobileScreenshot:
			"https://placehold.co/300x600/0a0f0a/4ade80?text=Trofficient",
		liveLink: "https://trofficient-live.vercel.app",
		githubLink: "",
		demoLink: "https://trofficient-live.vercel.app",
		features: [
			"Real-time vehicle tracking over WebSocket",
			"Dynamic route-based pricing",
			"Mobile-money payment integration",
			"Operator dashboard for fleet & payout reconciliation",
			"Offline-tolerant rider experience for low-connectivity routes",
		],
		status: "Live",
		category: "Full Stack",
		timeline: "Active",
		teamSize: "Founder / Engineering lead",
		challenges: [
			"Real-time tracking on intermittent mobile networks",
			"Reconciling cash-mixed and mobile-money settlements",
			"Onboarding operators with low digital literacy",
		],
		solutions: [
			"Snapshot + delta protocol over Socket.io with aggressive reconnection",
			"Double-entry ledger separating settlement state from payment method",
			"Reduced operator dashboard to a small, opinionated set of daily actions",
		],
		documentation:
			"Trofficient is a founder project targeting Ghana's trotro network. It uses React Native for the rider app, a Node.js + PostgreSQL backend, and Socket.io for live updates. Production deployment lives at trofficient-live.vercel.app.",
	},

	"ai-sme": {
		id: 3,
		title: "AI-SME",
		description:
			"AI-powered BI for small businesses. Natural-language assistant that answers questions about real sales, inventory, and expense data.",
		fullDescription:
			"AI-SME is a full-stack business intelligence app for small and medium businesses, fronted by a natural-language AI assistant. Owners ask plain-English questions (\"how much did I make on detergent last month?\", \"who are my top 5 customers?\") and get back grounded answers built from their actual sales, inventory, and expense records. The LLM provider is pluggable — OpenAI, Anthropic, Gemini, Groq, Mistral, Cohere, and OpenRouter are all supported behind a single interface.",
		techStack: [
			"React",
			"Vite",
			"Tailwind CSS",
			"Node.js",
			"Express",
			"TypeScript",
			"MongoDB",
			"OpenAI / Anthropic / Gemini",
		],
		webScreenshot: "https://placehold.co/800x450/0a0f0a/4ade80?text=AI-SME",
		mobileScreenshot: "https://placehold.co/300x600/0a0f0a/4ade80?text=AI-SME",
		liveLink: "https://intellexa-sme.vercel.app",
		githubLink: "https://github.com/Leslie-23/ai-sme",
		demoLink: "https://intellexa-sme.vercel.app",
		features: [
			"Natural-language Q&A over real business data",
			"Pluggable LLM provider (OpenAI, Anthropic, Gemini, Groq, Mistral, Cohere)",
			"Sales, inventory, and expense modules with reporting",
			"Owner-friendly dashboards and exports",
		],
		status: "Live",
		category: "Full Stack",
		timeline: "Active",
		teamSize: "Solo",
		challenges: [
			"Grounding LLM responses in user-specific data without leaking other tenants' rows",
			"Keeping latency acceptable across multiple model providers",
			"Designing prompts that survive provider swaps",
		],
		solutions: [
			"Per-tenant scoped retrieval with structured query templates",
			"Provider-aware timeout and fallback chain",
			"Provider-agnostic prompt schema with adapters per model",
		],
		documentation:
			"AI-SME is deployed at intellexa-sme.vercel.app. Client is React + Vite + Tailwind; server is Node + Express + TypeScript on MongoDB. Source: github.com/Leslie-23/ai-sme.",
	},

	"campus-connect": {
		id: 4,
		title: "CampusConnect",
		description:
			"University social and collaboration platform — centralizes student communication, events, academic updates, and community in one place.",
		fullDescription:
			"CampusConnect is a university-focused social and collaboration platform that pulls scattered student communication — group chats, event flyers, academic updates, club coordination — into a single connected ecosystem. The product is built around a per-campus tenant model so each institution gets its own community space while sharing the underlying platform.",
		techStack: [
			"React",
			"Node.js",
			"Express",
			"MongoDB",
			"Socket.io",
			"Tailwind CSS",
		],
		webScreenshot:
			"https://placehold.co/800x450/0a0f0a/4ade80?text=CampusConnect",
		mobileScreenshot:
			"https://placehold.co/300x600/0a0f0a/4ade80?text=CampusConnect",
		liveLink: "",
		githubLink: "https://github.com/Campus-Connect-v1/campus-connect",
		demoLink: "",
		features: [
			"Per-campus tenancy with isolated communities",
			"Real-time chat and event feeds",
			"Academic update channels",
			"Club and group coordination tools",
		],
		status: "In Development",
		category: "Full Stack",
		timeline: "Active",
		teamSize: "Small team",
		challenges: [
			"Multi-tenant data isolation without sacrificing query simplicity",
			"Real-time feeds that stay responsive at campus scale",
			"Designing onboarding that survives institutional bureaucracy",
		],
		solutions: [
			"Tenant-keyed indexes and middleware enforcement at the query layer",
			"Socket.io rooms scoped per campus and per channel",
			"Self-serve community-admin flow that doesn't require central onboarding",
		],
		documentation:
			"CampusConnect lives at github.com/Campus-Connect-v1/campus-connect. Built with the MERN stack plus Socket.io for real-time features.",
	},

	"sellis": {
		id: 5,
		title: "Sellis",
		description:
			"Production spa booking and business platform — live, paid client work.",
		fullDescription:
			"Sellis is a production web platform for a spa business — booking flows, service management, customer records, and operational tooling. Built and deployed as paid client work; the source repository is private but the production site is live and serving real customers.",
		techStack: ["React", "Node.js", "Express", "MongoDB"],
		webScreenshot: "https://placehold.co/800x450/0a0f0a/4ade80?text=Sellis",
		mobileScreenshot: "https://placehold.co/300x600/0a0f0a/4ade80?text=Sellis",
		liveLink: "https://www.sellisspa.com",
		githubLink: "",
		demoLink: "https://www.sellisspa.com",
		features: [
			"Customer-facing booking flow",
			"Service and pricing management",
			"Custom domain, production traffic",
			"Built and maintained for a live business",
		],
		status: "Live",
		category: "Full Stack",
		timeline: "Shipped",
		teamSize: "Solo (client engagement)",
		challenges: [
			"Translating a non-technical client's workflows into clean data models",
			"Keeping the booking surface fast on mobile networks",
		],
		solutions: [
			"Iterative spec-by-walkthrough sessions before any modeling",
			"Server-side rendering of high-traffic pages with aggressive caching",
		],
		documentation:
			"Sellis is paid client work for a live spa business. Source is private; production lives at sellisspa.com.",
	},

	"captivating-home-trade": {
		id: 6,
		title: "Captivating Home Trade",
		description:
			"E-commerce and business platform for a retail operation — live, paid client work moving real inventory.",
		fullDescription:
			"Captivating Home Trade is a production e-commerce and operations platform built for a retail business. The system handles catalog, orders, inventory, and back-office tooling; the software moves real inventory and real money. Repository is private (paid client work) but the production site is live on a custom domain.",
		techStack: ["React", "Node.js", "Express", "MongoDB"],
		webScreenshot:
			"https://placehold.co/800x450/0a0f0a/4ade80?text=Captivating+Home+Trade",
		mobileScreenshot:
			"https://placehold.co/300x600/0a0f0a/4ade80?text=Captivating+Home+Trade",
		liveLink: "https://captivatinghometrade.com",
		githubLink: "",
		demoLink: "https://captivatinghometrade.com",
		features: [
			"Storefront with catalog and order flow",
			"Inventory and back-office tooling",
			"Custom domain, production retail traffic",
		],
		status: "Live",
		category: "Full Stack",
		timeline: "Shipped",
		teamSize: "Engineering lead",
		challenges: [
			"Keeping inventory consistent between storefront, back office, and physical stock",
			"Designing admin tooling for non-technical operators",
		],
		solutions: [
			"Single source of truth for stock with idempotent adjustment endpoints",
			"Stripped-down admin UI focused on the three actions used 95% of the time",
		],
		documentation:
			"Captivating Home Trade is paid client work — repo is private, live site at captivatinghometrade.com.",
	},

	"npm-git-helper": {
		id: 7,
		title: "npm-git-helper",
		description:
			"Published npm package — Git workflow tooling that smooths out the repetitive bits of day-to-day Git.",
		fullDescription:
			"npm-git-helper is a published Node.js package that wraps the repetitive parts of a typical Git workflow into a small CLI — staged commits, branch hygiene, and the kind of two-step rituals you do twenty times a day. It's installable from the public npm registry.",
		techStack: ["Node.js", "JavaScript", "CLI"],
		webScreenshot:
			"https://placehold.co/800x450/0a0f0a/4ade80?text=npm-git-helper",
		mobileScreenshot:
			"https://placehold.co/300x600/0a0f0a/4ade80?text=npm-git-helper",
		liveLink: "https://www.npmjs.com/package/npm-git-helper",
		githubLink: "https://github.com/Leslie-23/git-helper",
		demoLink: "https://www.npmjs.com/package/npm-git-helper",
		features: [
			"Single-command staged commit and push",
			"Branch hygiene helpers",
			"Distributed via npm",
		],
		status: "Live",
		category: "Tooling",
		timeline: "Shipped",
		teamSize: "Solo",
		challenges: [
			"Designing a small surface that doesn't reinvent Git",
			"Making the CLI safe — no destructive operations without an explicit flag",
		],
		solutions: [
			"Wrapped only the workflows I actually use; resisted feature creep",
			"Explicit confirm prompts on anything that rewrites history",
		],
		documentation:
			"Published to npm as `npm-git-helper`. Source: github.com/Leslie-23/git-helper.",
	},

	"school-management-system": {
		id: 8,
		title: "PAL School Management System",
		description:
			"MERN admin platform for schools — students, teachers, attendance, performance evaluations, and real-time communication.",
		fullDescription:
			"PAL School Management System is a MERN-based platform that simplifies school operations. Admins manage students, teachers, classes, and system settings; teachers mark attendance and record performance; students see their progress. Real-time communication tools tie the three roles together.",
		techStack: ["React", "Node.js", "Express", "MongoDB", "Redux"],
		webScreenshot:
			"https://placehold.co/800x450/0a0f0a/4ade80?text=School+Management",
		mobileScreenshot:
			"https://placehold.co/300x600/0a0f0a/4ade80?text=School+Management",
		liveLink: "https://school-management-one-dusky.vercel.app",
		githubLink: "https://github.com/Leslie-23/School-Management-System",
		demoLink: "https://school-management-one-dusky.vercel.app",
		features: [
			"Admin control over students, teachers, and classes",
			"Attendance tracking with reporting",
			"Performance evaluations with marks and feedback",
			"Three-role UX (admin / teacher / student)",
			"Real-time communication tools",
		],
		status: "Live",
		category: "Full Stack",
		timeline: "Shipped",
		teamSize: "Solo",
		challenges: [
			"Three-role permission surface without duplicating views",
			"Reporting that stays useful as class sizes grow",
		],
		solutions: [
			"Shared component library with role-based slot rendering",
			"Server-side aggregation for reports instead of client roll-ups",
		],
		documentation:
			"Live demo at school-management-one-dusky.vercel.app. Source: github.com/Leslie-23/School-Management-System.",
	},

	"openstock": {
		id: 9,
		title: "OpenStock",
		description:
			"Self-hosted inventory and stock management — products, suppliers, purchase orders, and variants — built on Nuxt 4 + Cloudflare.",
		fullDescription:
			"OpenStock is a modern self-hosted inventory and stock management system. It covers product management with SKUs, barcodes, variants, and categories; supplier management; and stock operations. Built on Nuxt 4 deployed to Cloudflare Pages, with a demo environment that anyone can sign into.",
		techStack: ["Nuxt 4", "Vue", "Cloudflare Pages", "TypeScript"],
		webScreenshot: "https://placehold.co/800x450/0a0f0a/4ade80?text=OpenStock",
		mobileScreenshot:
			"https://placehold.co/300x600/0a0f0a/4ade80?text=OpenStock",
		liveLink: "https://openstock-sand.vercel.app",
		githubLink: "https://github.com/Leslie-23/openstock",
		demoLink: "https://openstock-v2.pages.dev",
		features: [
			"Product management — SKU, barcode, variants, categories",
			"Supplier management",
			"Stock operations and movement tracking",
			"Self-hosted, MIT-licensed",
			"Public demo with seeded credentials",
		],
		status: "Live",
		category: "Full Stack",
		timeline: "Shipped",
		teamSize: "Solo",
		challenges: [
			"Variant modeling that doesn't fall apart at scale",
			"Cloudflare Pages edge constraints for stateful operations",
		],
		solutions: [
			"Product/variant split with attribute-value composition",
			"Pushed stateful operations to a small API layer behind the edge",
		],
		documentation:
			"OpenStock is MIT-licensed and self-hostable. Source: github.com/Leslie-23/openstock. Public demo at openstock-v2.pages.dev (demo@demo.com / 12345678).",
	},

	"grilli": {
		id: 10,
		title: "Grilli",
		description:
			"High-end restaurant web platform — elegant UI, real-time reservations, in-house ordering, and admin tooling.",
		fullDescription:
			"Grilli is a full-stack restaurant management platform designed for premium dining establishments. The customer-facing frontend handles menu browsing, table reservations, and in-house ordering; the admin side covers menu management, reservation handling, and analytics. The whole product prioritizes performance, scalability, and a UX that matches the brand it represents.",
		techStack: ["React", "Node.js", "Express", "MongoDB", "TailwindCSS"],
		webScreenshot: "/images/webScreenshots/grilli-web.png",
		mobileScreenshot: "/images/mobileScreenshots/grilli-mobile.png",
		liveLink: "https://web-plusplus.vercel.app",
		githubLink: "https://github.com/leslie-23/web-plusplus",
		demoLink: "/images/general/grilli-video.mp4",
		features: [
			"Online table reservation with email confirmations",
			"In-house order management system",
			"Admin dashboard for menu and analytics",
			"Dynamic menu updates with categories and pricing",
			"Integrated payment support for online orders",
		],
		status: "Live",
		category: "Full Stack",
		timeline: "2 months",
		teamSize: "Solo",
		challenges: [
			"Maintaining fast load times with dynamic content",
			"Implementing real-time reservation updates",
			"Ensuring consistent design across devices",
		],
		solutions: [
			"Server-side caching for menu data",
			"WebSocket for live reservation updates",
			"Modular responsive design system with TailwindCSS",
		],
		documentation:
			"A robust restaurant web platform built with the MERN stack. Real-time reservation handling, a polished menu interface, and an admin dashboard for operations. Live at web-plusplus.vercel.app.",
	},

	"attendance-tracker": {
		id: 11,
		title: "Employee Attendance Tracker",
		description:
			"QR-based clock-in/out for small shops. Geofenced verification replaces paper sign-in sheets and expensive fingerprint hardware.",
		fullDescription:
			"A lightweight employee clock-in/out system designed for small shops. Each employee gets a unique QR code — scanning it opens their personal clock page, they tap a button, and they're clocked in or out. The server verifies they're physically at the shop before accepting the record. Replaces three painful alternatives: paper sheets (easy to fake), biometric machines (expensive and brittle), and heavy HR software (overkill).",
		techStack: ["Node.js", "Express", "HTML", "JavaScript", "Geolocation API"],
		webScreenshot:
			"https://placehold.co/800x450/0a0f0a/4ade80?text=Attendance+Tracker",
		mobileScreenshot:
			"https://placehold.co/300x600/0a0f0a/4ade80?text=Attendance+Tracker",
		liveLink: "https://employee-attendance-tracker-nine.vercel.app",
		githubLink: "https://github.com/Leslie-23/employeeAttendanceTracker",
		demoLink: "https://employee-attendance-tracker-nine.vercel.app",
		features: [
			"Per-employee QR codes that open personal clock pages",
			"Server-side geofence verification before accepting records",
			"Tamper-resistant audit log",
			"Phone-based — no hardware to buy",
		],
		status: "Live",
		category: "Full Stack",
		timeline: "Shipped",
		teamSize: "Solo",
		challenges: [
			"Verifying physical presence without trusting the client",
			"Making it impossible to fake without breaking honest UX",
		],
		solutions: [
			"Server-side geofence with strict accuracy thresholds",
			"Short-lived signed tokens per scan so a screenshot can't be reused",
		],
		documentation:
			"Attendance tracker designed to replace paper sign-in sheets at small shops. Live demo at employee-attendance-tracker-nine.vercel.app. Source: github.com/Leslie-23/employeeAttendanceTracker.",
	},

	"dev-experience": {
		id: 12,
		title: "Developer Motivation App",
		description:
			"Coding challenges, gamification, analytics, and personalized recommendations to keep developers learning and shipping.",
		fullDescription:
			"A platform designed to help developers grow and stay motivated through coding challenges, gamification, analytics, and personalized recommendations. OAuth via GitHub or Google, daily challenge reminders configurable to your schedule, and progress analytics that surface where you're improving versus stagnating.",
		techStack: ["React", "Node.js", "Express", "MongoDB", "OAuth"],
		techStackNote: "GitHub / Google OAuth",
		webScreenshot:
			"https://placehold.co/800x450/0a0f0a/4ade80?text=Dev+Motivation",
		mobileScreenshot:
			"https://placehold.co/300x600/0a0f0a/4ade80?text=Dev+Motivation",
		liveLink: "https://leslie23-dev-experience2k25.netlify.app",
		githubLink: "https://github.com/Leslie-23/DEV-experience",
		demoLink: "https://leslie23-dev-experience2k25.netlify.app",
		features: [
			"OAuth login via GitHub or Google",
			"Daily coding challenges with reminders",
			"Gamification — streaks, achievements, progress",
			"Personalized analytics and recommendations",
		],
		status: "Live",
		category: "Full Stack",
		timeline: "Shipped",
		teamSize: "Solo",
		challenges: [
			"Designing gamification that motivates without becoming the point",
			"Personalization that's useful before there's much user data",
		],
		solutions: [
			"Rewards tied to demonstrated skill gain, not just session count",
			"Cohort-based recommendations that bootstrap from similar-stage users",
		],
		documentation:
			"Live at leslie23-dev-experience2k25.netlify.app. Source: github.com/Leslie-23/DEV-experience.",
	},

	"expense-tracker": {
		id: 13,
		title: "Expense Tracker",
		description:
			"Lightweight income/expense tracker with categories and running totals — a clean React component you can drop into a finance app.",
		fullDescription:
			"A focused expense tracker built as a React component. Users pick from predefined expense categories (Food, Rent, Transportation, Entertainment) or add their own under \"Other\", enter an amount, and watch the running total update. Designed to be small and composable rather than a full personal-finance suite.",
		techStack: ["React", "JavaScript"],
		webScreenshot:
			"https://placehold.co/800x450/0a0f0a/4ade80?text=Expense+Tracker",
		mobileScreenshot:
			"https://placehold.co/300x600/0a0f0a/4ade80?text=Expense+Tracker",
		liveLink: "https://income-expense-tracker123.netlify.app",
		githubLink: "https://github.com/Leslie-23/expense-tracker",
		demoLink: "https://income-expense-tracker123.netlify.app",
		features: [
			"Predefined and custom expense categories",
			"Real-time total updates",
			"Compact, embeddable component",
		],
		status: "Live",
		category: "Frontend",
		timeline: "Shipped",
		teamSize: "Solo",
		challenges: [
			"Keeping the state model small enough to embed",
		],
		solutions: [
			"Single reducer with categories as configuration, not code",
		],
		documentation:
			"Live at income-expense-tracker123.netlify.app. Source: github.com/Leslie-23/expense-tracker.",
	},

	"weather-app": {
		id: 14,
		title: "Weather App",
		description:
			"Multi-country live weather built on WeatherAPI with auto-refresh and a responsive UI.",
		fullDescription:
			"A React weather app that displays current conditions for multiple selected countries, refreshing data every 10 seconds. Responsive across screen sizes. Uses Axios for HTTP and WeatherAPI as the data source.",
		techStack: ["React", "Axios", "WeatherAPI"],
		webScreenshot: "https://placehold.co/800x450/0a0f0a/4ade80?text=Weather",
		mobileScreenshot: "https://placehold.co/300x600/0a0f0a/4ade80?text=Weather",
		liveLink: "https://weather-app-vert-eta.vercel.app",
		githubLink: "https://github.com/Leslie-23/weatherApp",
		demoLink: "https://paltech-weather.netlify.app",
		features: [
			"Live weather for multiple countries",
			"Auto-refresh every 10 seconds",
			"Responsive across devices",
		],
		status: "Live",
		category: "Frontend",
		timeline: "Shipped",
		teamSize: "Solo",
		challenges: [
			"Keeping API usage under rate limits with frequent refresh",
		],
		solutions: [
			"Coalesced refresh calls and cached last-known data",
		],
		documentation:
			"Live at weather-app-vert-eta.vercel.app. Source: github.com/Leslie-23/weatherApp.",
	},
};

export const projectsArray = Object.values(projectsData);

// src/PROJECTS/data/techMeta.js
// Single source of truth for tech-stack metadata.
// - `tier`: usage frequency ("daily" | "shipped" | "explored")
// - `iconSlug`: devicon path (without CDN prefix or .svg suffix)
// - `aka`: alternate strings that should map to this canonical entry (matched
//   from the `techStack` arrays in projects.js, which use various spellings)

const ICON_CDN = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

export const iconUrl = (slug) => (slug ? `${ICON_CDN}/${slug}.svg` : null);

export const TIER_ORDER = ["daily", "shipped", "explored"];

export const TIER_META = {
	daily:    { label: "DAILY",    blurb: "I open these every morning." },
	shipped:  { label: "SHIPPED",  blurb: "Used in production projects." },
	explored: { label: "EXPLORED", blurb: "Touched in real work — can ramp fast." },
};

export const TECH_META = {
	// — DAILY —
	"React":         { tier: "daily",    iconSlug: "react/react-original" },
	"Node.js":       { tier: "daily",    iconSlug: "nodejs/nodejs-original" },
	"TypeScript":    { tier: "daily",    iconSlug: "typescript/typescript-original", aka: ["TS"] },
	"JavaScript":    { tier: "daily",    iconSlug: "javascript/javascript-original", aka: ["JS"] },
	"PostgreSQL":    { tier: "daily",    iconSlug: "postgresql/postgresql-original" },
	"MongoDB":       { tier: "daily",    iconSlug: "mongodb/mongodb-original" },
	"Tailwind CSS":  { tier: "daily",    iconSlug: "tailwindcss/tailwindcss-original", aka: ["Tailwind", "TailwindCSS"] },

	// — SHIPPED —
	"Express":       { tier: "shipped",  iconSlug: "express/express-original" },
	"React Native":  { tier: "shipped",  iconSlug: "react/react-original" },
	"Socket.io":     { tier: "shipped",  iconSlug: "socketio/socketio-original" },
	"Redux":         { tier: "shipped",  iconSlug: "redux/redux-original", aka: ["Redux Toolkit"] },
	"Git":           { tier: "shipped",  iconSlug: "git/git-original" },
	"Docker":        { tier: "shipped",  iconSlug: "docker/docker-original" },
	"Python":        { tier: "shipped",  iconSlug: "python/python-original" },
	"Vue":           { tier: "shipped",  iconSlug: "vuejs/vuejs-original", aka: ["Vue.js"] },
	"Vite":          { tier: "shipped",  iconSlug: "vitejs/vitejs-original" },
	"Material UI":   { tier: "shipped",  iconSlug: "materialui/materialui-original" },
	"OAuth":         { tier: "shipped",  iconSlug: null },

	// — EXPLORED —
	"Nuxt 4":        { tier: "explored", iconSlug: "nuxtjs/nuxtjs-original", aka: ["Nuxt"] },
	"Cloudflare Pages": { tier: "explored", iconSlug: "cloudflareworkers/cloudflareworkers-original", aka: ["Cloudflare"] },
	"Java":          { tier: "explored", iconSlug: "java/java-original" },
	"C++":           { tier: "explored", iconSlug: "cplusplus/cplusplus-original" },
	"C#":            { tier: "explored", iconSlug: "csharp/csharp-original" },
	"AWS":           { tier: "explored", iconSlug: "amazonwebservices/amazonwebservices-original-wordmark" },
	"Three.js":      { tier: "explored", iconSlug: "threejs/threejs-original-wordmark" },
	"Linux":         { tier: "explored", iconSlug: "linux/linux-original" },
	"GraphQL":       { tier: "explored", iconSlug: "graphql/graphql-plain" },
	"Redis":         { tier: "explored", iconSlug: "redis/redis-original" },
	"Django":        { tier: "explored", iconSlug: "django/django-plain" },
	"PHP":           { tier: "explored", iconSlug: "php/php-original" },
	"HTML":          { tier: "explored", iconSlug: "html5/html5-original" },
	"CSS":           { tier: "explored", iconSlug: "css3/css3-original" },
	"Firebase":      { tier: "explored", iconSlug: "firebase/firebase-plain" },
	"Axios":         { tier: "explored", iconSlug: null },
	"WeatherAPI":    { tier: "explored", iconSlug: null },
	"Geolocation API": { tier: "explored", iconSlug: null },
};

// Build a reverse lookup so "Tailwind", "TailwindCSS", and "Tailwind CSS"
// all resolve to the same entry.
const ALIASES = (() => {
	const map = new Map();
	for (const [name, meta] of Object.entries(TECH_META)) {
		map.set(name.toLowerCase(), name);
		for (const alt of meta.aka || []) {
			map.set(alt.toLowerCase(), name);
		}
	}
	return map;
})();

export function canonicalize(name) {
	if (!name) return null;
	return ALIASES.get(name.toLowerCase()) || null;
}

export function getTechMeta(name) {
	const canonical = canonicalize(name) || name;
	return { name: canonical, ...(TECH_META[canonical] || { tier: "explored", iconSlug: null }) };
}

// Build { canonicalName: [{slug, title}, ...] } from the project data.
export function buildTechToProjects(projectsData) {
	const idx = {};
	for (const [slug, p] of Object.entries(projectsData)) {
		for (const raw of p.techStack || []) {
			const canonical = canonicalize(raw);
			if (!canonical) continue;
			if (!idx[canonical]) idx[canonical] = [];
			if (!idx[canonical].some((x) => x.slug === slug)) {
				idx[canonical].push({ slug, title: p.title });
			}
		}
	}
	return idx;
}

// Group an array of tech names by their declared tier. Unknown techs land in "explored".
export function groupByTier(techNames) {
	const groups = { daily: [], shipped: [], explored: [] };
	for (const name of techNames) {
		const meta = getTechMeta(name);
		(groups[meta.tier] || groups.explored).push(meta.name);
	}
	return groups;
}

// The curated set we feature on the home page (subset of TECH_META).
export const HOME_FEATURED = [
	// Daily
	"React", "Node.js", "TypeScript", "PostgreSQL", "MongoDB", "Tailwind CSS",
	// Shipped
	"React Native", "Express", "Socket.io", "Redux", "Git", "Docker", "Python", "Vue", "Vite",
	// Explored
	"Nuxt 4", "Java", "C++", "C#", "AWS", "Three.js", "Linux", "GraphQL", "Redis",
];

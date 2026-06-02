const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const doc = new PDFDocument({
  size: "A4",
  margins: { top: 40, bottom: 35, left: 50, right: 50 },
});

const out = path.join(__dirname, "..", "public", "Leslie_Paul_Ajayi_Resume.pdf");
doc.pipe(fs.createWriteStream(out));

const C = {
  black: "#0D0D0D",
  accent: "#1B8C5A",
  accentLight: "#27AE60",
  text: "#2C2C2C",
  textLight: "#555555",
  muted: "#888888",
  line: "#D0D0D0",
  white: "#FFFFFF",
};

const W = 495;

// ── Header ──
doc.rect(0, 0, 595, 90).fill(C.black);
doc.fontSize(24).font("Helvetica-Bold").fillColor(C.white).text("LESLIE PAUL AJAYI", 50, 22);
doc.fontSize(10).font("Helvetica").fillColor(C.accentLight).text("Software Engineer", 50, 50);
doc.fontSize(7).font("Helvetica").fillColor("#BBBBBB");
doc.text(
  "Accra, Ghana   |   hello@lesliepaul.me   |   +233 27 123 7965   |   github.com/Leslie-23   |   linkedin.com/in/leslie-paul-ajayi-409b16356",
  50, 68, { width: W }
);

doc.y = 100;

// ── Helpers ──
function section(title) {
  doc.moveTo(50, doc.y).lineTo(50 + W, doc.y).strokeColor(C.line).lineWidth(0.5).stroke();
  doc.moveDown(0.2);
  doc.fontSize(9).font("Helvetica-Bold").fillColor(C.accent).text(title.toUpperCase(), 50, undefined, { width: W });
  doc.moveDown(0.2);
}

function bullet(text, indent = 61) {
  const y = doc.y + 3;
  doc.circle(indent - 4.5, y, 1.3).fill(C.accent);
  doc.fontSize(8).font("Helvetica").fillColor(C.text).text(text, indent, undefined, {
    width: W - (indent - 50),
    lineGap: 1,
  });
}

function project(title, role, tech, bullets) {
  doc.fontSize(8.5).font("Helvetica-Bold").fillColor(C.black).text(title, 50, undefined, {
    continued: true, width: W,
  });
  if (role) {
    doc.font("Helvetica").fillColor(C.muted).text(`  —  ${role}`);
  } else {
    doc.text("");
  }
  doc.fontSize(7.5).font("Helvetica-Oblique").fillColor(C.textLight).text(tech, 50, undefined, { width: W });
  doc.moveDown(0.1);
  for (const b of bullets) bullet(b);
  doc.moveDown(0.2);
}

// ── Summary ──
section("Professional Summary");
doc.fontSize(8.5).font("Helvetica").fillColor(C.text).text(
  "Software Engineer with expertise in full-stack development, system architecture, and production-grade applications. " +
  "Strong foundation across multiple languages and paradigms with hands-on experience building and shipping scalable web " +
  "and mobile solutions for live businesses. Focused on clean architecture, performance optimization, and real-world impact.",
  50, undefined, { width: W, lineGap: 1.5 }
);
doc.moveDown(0.35);

// ── Skills ──
section("Technical Skills");
const skills = [
  ["Languages", "JavaScript, TypeScript, Python, C++, C#, Java, SQL"],
  ["Frontend", "React, Next.js, Vue/Nuxt, React Native, Tailwind CSS, Three.js, Framer Motion"],
  ["Backend", "Node.js, Express, Fastify, GraphQL, Socket.io, REST APIs, JWT/OAuth"],
  ["Databases", "PostgreSQL, MongoDB, Redis, MySQL, Firebase, Prisma ORM"],
  ["Infrastructure", "Docker, AWS, GitHub Actions, CI/CD, Nginx, Linux, Cloudflare"],
  ["Tools", "Git, pnpm/npm, Vite, Jest, Playwright"],
];
const valX = 128;
for (const [label, value] of skills) {
  const y = doc.y;
  doc.fontSize(8).font("Helvetica-Bold").fillColor(C.black).text(`${label}:`, 50, y, { width: 76 });
  doc.fontSize(8).font("Helvetica").fillColor(C.text).text(value, valX, y, { width: W - (valX - 50) });
}
doc.moveDown(0.35);

// ── Experience & Projects ──
section("Professional Experience & Selected Projects");

project(
  "Trofficient — Transit Intelligence Platform",
  "Founder & Engineering Lead",
  "React Native  ·  Node.js  ·  PostgreSQL  ·  Socket.io  ·  Mobile Money APIs",
  [
    "Built real-time transit platform for Ghana's trotro network — live vehicle tracking, dynamic pricing, mobile-money payments.",
    "Implemented snapshot+delta WebSocket protocol for intermittent mobile networks; double-entry ledger for settlement.",
    "Designed operator dashboard for fleet visibility, route economics, and driver payout reconciliation.",
  ]
);

project(
  "Sellis — Spa Booking Platform",
  "Solo Engineer (Paid Client Work)",
  "React  ·  Node.js  ·  Express  ·  MongoDB",
  [
    "Delivered production booking platform for a live spa business — custom domain, real customers, real revenue.",
    "Built end-to-end: customer booking flow, service management, and operational tooling with SSR and aggressive caching.",
  ]
);

project(
  "Captivating Home Trade — E-Commerce Platform",
  "Engineering Lead (Paid Client Work)",
  "React  ·  Node.js  ·  Express  ·  MongoDB",
  [
    "Built production e-commerce platform handling real inventory and live retail transactions on a custom domain.",
    "Designed idempotent stock-adjustment endpoints; stripped-down admin UI for non-technical operators.",
  ]
);

project(
  "AI-SME — AI Business Intelligence",
  "Solo Engineer",
  "React  ·  Node.js  ·  TypeScript  ·  MongoDB  ·  OpenAI / Anthropic / Gemini",
  [
    "Full-stack BI platform — small business owners ask natural-language questions over real sales and inventory data.",
    "Pluggable LLM provider layer supporting 7 providers with per-tenant data isolation. Live at intellexa-sme.vercel.app.",
  ]
);

project(
  "OpenStock — Inventory Management System",
  "Solo Engineer",
  "Nuxt 4  ·  Vue  ·  TypeScript  ·  Cloudflare Pages",
  [
    "Self-hosted inventory system: SKU/barcode, variant modeling, supplier management, stock tracking. MIT-licensed.",
  ]
);

project(
  "npm-git-helper — Published npm Package",
  "Solo Engineer",
  "Node.js  ·  JavaScript  ·  CLI",
  [
    "Published Git workflow CLI to npm — staged commits, branch hygiene, safe-by-default. npmjs.com/package/npm-git-helper.",
  ]
);

// ── Education ──
section("Education");

doc.fontSize(8.5).font("Helvetica-Bold").fillColor(C.black).text("Regional Maritime University", 50, undefined, {
  continued: true, width: W,
});
doc.font("Helvetica").fillColor(C.muted).text("   2022 – 2026");
doc.fontSize(8).font("Helvetica-Oblique").fillColor(C.textLight).text("Bachelor of Science — Information Technology", 50, undefined, { width: W });
doc.moveDown(0.05);
bullet("Award: Best in IT Project Management (Prof. Emmanuel Arhin)");
bullet("Award: Best in Data Structures (Prof. Eric Johnson)");
doc.moveDown(0.15);

doc.fontSize(8.5).font("Helvetica-Bold").fillColor(C.black).text("Professional Development — Udemy", 50, undefined, {
  continued: true, width: W,
});
doc.font("Helvetica").fillColor(C.muted).text("   2023");
doc.moveDown(0.05);
bullet("The Web Developer Bootcamp — Colt Steele (full-stack web development)");
bullet("React Native — The Practical Guide — Maximilian Schwarzmüller (mobile app development)");
doc.moveDown(0.35);

// ── Additional Projects ──
section("Additional Projects");
const additional = [
  ["osAfrica", "AI-native operating system — AI as a first-class OS primitive (Python, Systems Programming, LLM Runtimes)"],
  ["CampusConnect", "University social network with real-time chat, per-campus tenancy (React, Node.js, MongoDB, Socket.io)"],
  ["PAL School Management", "Three-role admin platform for schools — attendance, performance, communication (MERN + Redux)"],
  ["Grilli", "Full-stack restaurant platform — reservations, ordering, menu management (MERN + Tailwind)"],
  ["Attendance Tracker", "QR-based geofenced clock-in/out replacing paper sign-in sheets (Node.js, Geolocation API)"],
];
for (const [name, desc] of additional) {
  doc.fontSize(8).font("Helvetica-Bold").fillColor(C.black).text(`${name}:  `, 50, undefined, {
    continued: true, width: W,
  });
  doc.font("Helvetica").fillColor(C.text).text(desc, { width: W - 10 });
}
doc.moveDown(0.4);

// ── Footer ──
doc.moveTo(50, doc.y).lineTo(50 + W, doc.y).strokeColor(C.line).lineWidth(0.5).stroke();
doc.moveDown(0.2);
doc.fontSize(7).font("Helvetica").fillColor(C.muted).text(
  "Portfolio: lesliepaul.me   ·   GitHub: github.com/Leslie-23   ·   LinkedIn: linkedin.com/in/leslie-paul-ajayi-409b16356",
  50, undefined, { width: W, align: "center" }
);

doc.end();
console.log("Resume PDF generated:", out);

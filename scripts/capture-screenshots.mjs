// Re-shoot the live-site screenshots in public/work/<slug>/{desktop,mobile}.jpg.
//   npm i --no-save playwright-core && npx playwright-core install chromium
//   node scripts/capture-screenshots.mjs [slug ...]
// When an app moves to <name>.leslieajayi.com, change its URL below and re-run.
import { chromium, devices } from "playwright-core";
import fs from "fs";
const OUT = new URL("../public/work", import.meta.url).pathname;
const SITES = {
  trofficient: "https://mytrofficient.com",
  "ai-sme": "https://ai-sme-eight.vercel.app",
  uat: "https://uat-tracker-standalone.vercel.app",
  openstock: "https://openstock-v2.pages.dev",
  stewardly: "https://church-scheduler-indol.vercel.app",
  attendance: "https://employee-attendance-tracker-nine.vercel.app",
  "de-sams-studio": "https://desamsstudio.vercel.app",
  sellis: "https://sellisspa.com",
  "captivating-home": "https://captivatinghometrade.com",
  nenecollectionz: "https://nene-collectionz.leslieajayi27.workers.dev/",
  "efo-kodjo": "https://efo-kodjo.vercel.app",
  "valuable-women": "https://valuable-women.vercel.app",
  "rate-desk": "https://rate-calc-kappa.vercel.app",
  "paltech-weather": "https://weather-app-vert-eta.vercel.app",
  "the-word": "https://server-pi-five-58.vercel.app",
  "school-management": "https://school-management-one-dusky.vercel.app",
  grilli: "https://web-plusplus.vercel.app",
  "dev-ex": "https://leslie23-dev-experience2k25.netlify.app",
  "expense-tracker": "https://income-expense-tracker123.netlify.app",
  ecommerce: "https://paltech-e-commerce.netlify.app",
  "food-delivery": "https://food-delivery-app-one-steel.vercel.app",
  "vina-works": "https://vina-works.vercel.app",
};
const only = process.argv.slice(2);
const b = await chromium.launch();
const report = [];
for (const [slug, url] of Object.entries(SITES)) {
  if (only.length && !only.includes(slug)) continue;
  fs.mkdirSync(`${OUT}/${slug}`, { recursive: true });
  try {
    for (const [name, ctxOpts] of [
      ["desktop", { viewport: { width: 1440, height: 900 } }],
      ["mobile", { ...devices["iPhone 13"], deviceScaleFactor: 2 }],
    ]) {
      const ctx = await b.newContext(ctxOpts);
      const p = await ctx.newPage();
      const res = await p.goto(url, { waitUntil: "load", timeout: 30000 });
      await p.waitForLoadState("networkidle", { timeout: 8000 }).catch(() => {});
      await p.waitForTimeout(2800);
      await p.screenshot({ path: `${OUT}/${slug}/${name}.jpg`, type: "jpeg", quality: 82 });
      if (name === "desktop") report.push(`${slug}: ${res?.status()} ${await p.title()}`);
      await ctx.close();
    }
  } catch (e) { report.push(`${slug}: FAILED ${String(e.message).slice(0, 80)}`); }
}
console.log(report.join("\n"));
await b.close();

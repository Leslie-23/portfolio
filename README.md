# Leslie / Software Engineer: THE WORKSHOP

Next.js 16 · TypeScript · Tailwind v4 · GSAP + ScrollTrigger · Motion · Lenis · SVG

```bash
npm run dev     # http://localhost:3000
npm run build
```

## Where things live

| Path | What |
|---|---|
| `src/lib/data.ts` | **All content**: projects, bench experiments, toolkit, notes, archive. Edit here. |
| `src/components/Shell.tsx` | Wires intro, cursor, nav, internals mode, disassemble, footer |
| `src/components/Exploded.tsx` | The CSS-3D exploded project view |
| `src/components/InternalsLayer.tsx` | SHOW INTERNALS (blueprint mode). Wrap any region in `<Spec name="…">` to include it |
| `src/components/Disassemble.tsx` | DISASSEMBLE / REASSEMBLE easter egg |

## Projects, screenshots, subdomains
- **Case studies** (`PROJECTS`) get a full page; everything else live is in `SHIPPED`; small repos are in `ARCHIVE`.
- Screenshots live in `public/work/<slug>/desktop.jpg` + `mobile.jpg`. Re-shoot with `scripts/capture-screenshots.mjs`.
- When an app is on `<name>.leslieajayi.com`, add it to `SUBDOMAINS` in `data.ts` and the site links there.
- Accent is `#34bb78` (`--accent`). Small text uses the darker `--accent-ink` for contrast; the exact colour is used for fills and highlights.

## Adding a mobile app
Set `portrait: true` on the project in `data.ts`, add a `gallery` of phone screenshots (first three form the collapsed card),
and map real screens to layers in `LAYER_MEDIA`. Mobile apps then get phone-shaped layers that fan out side by side
(and a "screen by screen" section) instead of the landscape stack. Add `web: true` if the app also has a website.

## Keys
`I` toggles internals · `Esc` closes INDEX / reassembles · `Alt` held over the bench lens plate scans.

## Content rules
Everything in `data.ts` is sourced from github.com/Leslie-23. Notes are drafts in Leslie's voice, so edit them.
The contact form composes a `mailto:`; it has no backend.

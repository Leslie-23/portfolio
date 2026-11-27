import Link from "next/link";
import { VIBE, shotHref } from "@/lib/data";

const TONE = { accent: "var(--accent)", red: "var(--red)", orange: "var(--orange)", green: "var(--accent-ink)", ink: "var(--ink)" } as const;

/** A clean screenshot that links to the real thing, and carries its project's personality:
 *  its own colour, tilt, hover motion, cursor word and a line in the product's own voice.
 *  No caption underneath. Everything lives on the image. */
export default function Shot({
  slug, name, children, className = "", style, label = false, say = true,
}: {
  slug: string; name: string; children: React.ReactNode; className?: string; style?: React.CSSProperties;
  /** show the project name as a small chip on the image */
  label?: boolean;
  /** show the project's own tagline as a sticker on the image */
  say?: boolean;
}) {
  const v = VIBE[slug];
  const { href, external } = shotHref(slug);
  const vars = {
    "--sh": TONE[v?.tone ?? "ink"], "--rot": `${v?.rot ?? 0}deg`, "--hx": v?.hx ?? -3, "--hy": v?.hy ?? -6, "--hr": `${v?.hr ?? 0}deg`,
    ...style,
  } as React.CSSProperties;
  const inner = (
    <>
      <span className="absolute inset-0 overflow-hidden rounded-[inherit]">{children}</span>
      {label && <span className="mono absolute left-2 top-2 bg-paper px-1.5 text-ink">{name}</span>}
      {say && v && <span className="shot-sticker">{v.say}</span>}
    </>
  );
  const common = {
    className: `shot relative block border border-ink bg-ink ${className}`, style: vars, "data-cursor": `${v?.cursor ?? "OPEN"} ${external ? "↗" : "→"}`,
    "aria-label": `${name}: ${external ? "open the live product" : "open"}`,
  };
  return external
    ? <a href={href} target="_blank" rel="noopener noreferrer" {...common}>{inner}</a>
    : <Link href={href} {...common}>{inner}</Link>;
}

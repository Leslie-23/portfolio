import Image from "next/image";
import Link from "next/link";

type App = { name: string; what: string; icon: string; href?: string; svg?: boolean; wide?: boolean; dark?: boolean; external?: boolean };

// Every app and product that has a real icon, in the order they matter. Icons are the apps' own.
const APPS: App[] = [
  { name: "Trofficient", what: "Rider app", icon: "/work/icons/trofficient.png", href: "/work/trofficient" },
  { name: "Trofficient Driver", what: "Driver app", icon: "/work/icons/trofficient-driver.png", href: "/work/trofficient" },
  { name: "Beagine", what: "Customer app", icon: "/work/icons/beagine.png", href: "/work/beagine" },
  { name: "Beagine Pro", what: "Specialist app", icon: "/work/icons/beagine-pro.png", href: "/work/beagine" },
  { name: "Beagine Store", what: "Vendor app", icon: "/work/icons/beagine-store.png", href: "/work/beagine" },
  { name: "VoIP", what: "Voice platform", icon: "/work/icons/vop.svg", href: "/work/vop", svg: true },
  { name: "StepPool", what: "Fitness challenges", icon: "/work/icons/steppool.png", href: "/work/steppool" },
  { name: "Campus Connect", what: "Campus social app", icon: "/work/icons/campus-connect.png", href: "/work/campus-connect" },
  { name: "Family Bible", what: "Bible app", icon: "/work/icons/family-bible.png", href: "/work/the-word" },
  { name: "Intellexa", what: "AI for SMEs", icon: "/work/icons/ai-sme.svg", href: "/work/ai-sme", svg: true },
  { name: "Elena", what: "Developer assistant", icon: "/work/icons/elena.svg", href: "/work/elena", svg: true },
  { name: "Stewardly", what: "Team scheduling", icon: "/work/icons/stewardly.svg", href: "/work/stewardly", svg: true },
  { name: "Attendance", what: "Workforce tool", icon: "/work/icons/attendance.svg", href: "/work/attendance", svg: true },
];

function Tile({ a, hidden }: { a: App; hidden: boolean }) {
  return (
    <>
      <span className={`relative block h-[60px] shrink-0 overflow-hidden border border-line ${a.wide ? "w-[112px] rounded-[14px] bg-white" : "w-[60px] rounded-[22%]"} ${a.dark ? "bg-[#111]" : "bg-white"}`}>
        <Image src={a.icon} alt={hidden ? "" : `${a.name} logo`} fill sizes="112px" className={a.wide ? "object-contain p-2.5" : a.dark ? "object-contain p-2.5" : "object-cover"} unoptimized={a.svg} />
      </span>
      <span className="block whitespace-nowrap">
        <span className="block text-[17px] font-medium tracking-[-0.02em]">{a.name}</span>
        <span className="block text-[14px] text-mute">{a.what}</span>
      </span>
    </>
  );
}

function Item({ a, hidden = false }: { a: App; hidden?: boolean }) {
  const cls = "group flex items-center gap-4 rounded-2xl px-3 py-2";
  return (
    <li>
      {a.href ? (
        a.external
          ? <a href={a.href} target="_blank" rel="noopener noreferrer" tabIndex={hidden ? -1 : undefined} className={`${cls} transition-colors hover:bg-soft`}><Tile a={a} hidden={hidden} /></a>
          : <Link href={a.href} tabIndex={hidden ? -1 : undefined} className={`${cls} transition-colors hover:bg-soft`}><Tile a={a} hidden={hidden} /></Link>
      ) : (
        <div className={cls}><Tile a={a} hidden={hidden} /></div>
      )}
    </li>
  );
}

function Strip({ apps, label, reverse = false, className = "" }: { apps: App[]; label: string; reverse?: boolean; className?: string }) {
  return (
    <div className={`marquee bleed border-y border-line py-4 ${reverse ? "marquee-rev" : ""} ${className}`} role="group" aria-label={label}>
      <div className="marquee-track">
        <ul className="marquee-set">{apps.map((a) => <Item key={a.name} a={a} />)}</ul>
        <ul className="marquee-set marquee-dup" aria-hidden="true">{apps.map((a) => <Item key={a.name} a={a} hidden />)}</ul>
      </div>
    </div>
  );
}

// Employer and client brands: names and icons only. No descriptions of their systems, and no links into them.
const PROD: App[] = [
  { name: "Transport for Ghana", what: "Where I build", icon: "/work/icons/tfg.png", wide: true },
  { name: "Global Icons", what: "Where I work", icon: "/work/icons/global-icons.svg", svg: true, dark: true, href: "https://globaliconsagency.com", external: true },
  { name: "Tap n' Go", what: "Mobile app", icon: "/work/icons/tap-n-go-app.png" },
  { name: "GoRide", what: "Mobile app", icon: "/work/icons/goride.png" },
  { name: "GoDriver", what: "Mobile app", icon: "/work/icons/godriver.png" },
  { name: "VIP", what: "Bus ticketing app", icon: "/work/icons/vip.png" },
  { name: "Moveet", what: "Where I build", icon: "/work/icons/moveet.png" },
];

/** Two endless strips: my own apps, then the production work I've built inside organisations. */
export default function AppMarquee() {
  return (
    <div className="mt-8 md:mt-12">
      <Strip apps={APPS} label="Apps and products I've built" />
      <p className="label mb-0 mt-5 text-mute">In production at work · names and icons only</p>
      <Strip apps={PROD} label="Production work at the organisations I build for" reverse className="mt-3" />
    </div>
  );
}

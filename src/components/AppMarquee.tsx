import Image from "next/image";
import Link from "next/link";

type App = { name: string; what: string; icon: string; href: string; svg?: boolean };

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

function Item({ a, hidden = false }: { a: App; hidden?: boolean }) {
  return (
    <li>
      <Link href={a.href} tabIndex={hidden ? -1 : undefined} className="group flex items-center gap-4 rounded-2xl px-3 py-2 transition-colors hover:bg-soft">
        <span className="relative block h-[60px] w-[60px] shrink-0 overflow-hidden rounded-[22%] border border-line bg-white">
          <Image src={a.icon} alt={hidden ? "" : `${a.name} app icon`} fill sizes="60px" className="object-cover" unoptimized={a.svg} />
        </span>
        <span className="block whitespace-nowrap">
          <span className="block text-[17px] font-medium tracking-[-0.02em]">{a.name}</span>
          <span className="block text-[14px] text-mute">{a.what}</span>
        </span>
      </Link>
    </li>
  );
}

/** A slow, endless strip of every app and its icon. Pauses on hover; static and wrapped for reduced motion. */
export default function AppMarquee() {
  return (
    <div className="marquee bleed mt-8 border-y border-line py-4 md:mt-12" aria-label="Apps and products I've built">
      <div className="marquee-track">
        <ul className="marquee-set">{APPS.map((a) => <Item key={a.name} a={a} />)}</ul>
        <ul className="marquee-set marquee-dup" aria-hidden="true">{APPS.map((a) => <Item key={a.name} a={a} hidden />)}</ul>
      </div>
    </div>
  );
}

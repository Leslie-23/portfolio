"use client";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

/** A command palette (press / or Ctrl/Cmd+K) and a small terminal (press ~), for people who live on the keyboard.
 *  Both only navigate and print facts that are already on the site: nothing is written, sent or stored.
 *  The idea of keyboard-first extras on a portfolio comes from Elton's site (https://bio-ten-nu.vercel.app); this is a
 *  separate implementation in this site's own style. */
export type ConsoleData = {
  email: string;
  github: string;
  work: { slug: string; name: string; category: string; tier: string }[];
  stack: { group: string; items: string[] }[];
};

const PAGES = [
  { name: "Home", path: "/", also: "cover" },
  { name: "Work", path: "/work", also: "projects" },
  { name: "Team", path: "/team", also: "400 crew" },
  { name: "Writing", path: "/notes", also: "notes" },
  { name: "About", path: "/about", also: "bio" },
  { name: "Pricing", path: "/pricing", also: "cost estimate" },
  { name: "Contact", path: "/contact", also: "hire email" },
];

type Cmd = { id: string; label: string; hint: string; keys: string; run: () => void };
const typing = (t: EventTarget | null) => { const el = t as HTMLElement | null; return !!el && (["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName) || el.isContentEditable); };

export default function Console({ data }: { data: ConsoleData }) {
  const router = useRouter();
  const [palette, setPalette] = useState(false);
  const [term, setTerm] = useState(false);
  const [glitch, setGlitch] = useState(false);
  const back = useRef<HTMLElement | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const remember = () => { back.current = document.activeElement as HTMLElement | null; };
  const close = () => { setPalette(false); setTerm(false); back.current?.focus?.(); back.current = null; };
  const go = (path: string) => { setPalette(false); setTerm(false); router.push(path); };
  const surprise = () => {
    setPalette(false); setTerm(false);
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setGlitch(true); document.documentElement.classList.add("glitch");
    clearTimeout(timer.current);
    timer.current = setTimeout(() => { setGlitch(false); document.documentElement.classList.remove("glitch"); }, 900);
  };

  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") { close(); return; }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); remember(); setTerm(false); setPalette(true); return; }
      if (typing(e.target) || e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "/") { e.preventDefault(); remember(); setTerm(false); setPalette(true); }
      else if (e.key === "~" || e.key === "`") { e.preventDefault(); remember(); setPalette(false); setTerm(true); }
    };
    const open = () => { remember(); setTerm(false); setPalette(true); };
    addEventListener("keydown", key); addEventListener("open-palette", open);
    return () => { removeEventListener("keydown", key); removeEventListener("open-palette", open); clearTimeout(timer.current); document.documentElement.classList.remove("glitch"); };
  }, []);

  const commands = useMemo<Cmd[]>(() => [
    ...PAGES.map((p) => ({ id: p.path, label: `Go to ${p.name}`, hint: p.path, keys: `${p.name} ${p.also}`, run: () => go(p.path) })),
    ...data.work.filter((w) => w.tier === "case").map((w) => ({ id: w.slug, label: `Open ${w.name}`, hint: w.category, keys: `${w.name} ${w.slug} ${w.category}`, run: () => go(`/work/${w.slug}`) })),
    { id: "terminal", label: "Open the terminal", hint: "~", keys: "terminal shell console", run: () => { setPalette(false); setTerm(true); } },
    { id: "email", label: "Email Leslie", hint: data.email, keys: "email mail hire contact", run: () => { location.href = `mailto:${data.email}`; } },
    { id: "github", label: "Leslie on GitHub", hint: "github.com/Leslie-23", keys: "github code repos", run: () => window.open(data.github, "_blank", "noopener,noreferrer") },
    { id: "surprise", label: "Surprise me", hint: "do not press", keys: "surprise glitch random fun", run: surprise },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  ], [data]);

  return (
    <>
      {palette && <Palette commands={commands} onClose={close} />}
      {term && <Terminal data={data} onClose={close} go={go} surprise={surprise} />}
      {glitch && <div aria-hidden className="fixed inset-0 z-[300] grid place-items-center bg-accent text-[clamp(32px,8vw,120px)] font-semibold tracking-[-0.05em] text-black">SYSTEM RECOVERED</div>}
    </>
  );
}

function Palette({ commands, onClose }: { commands: Cmd[]; onClose: () => void }) {
  const [q, setQ] = useState("");
  const [i, setI] = useState(0);
  const list = useRef<HTMLUListElement>(null);
  const shown = useMemo(() => {
    const words = q.toLowerCase().split(/\s+/).filter(Boolean);
    return commands.filter((c) => words.every((w) => `${c.label} ${c.keys}`.toLowerCase().includes(w))).slice(0, 9);
  }, [q, commands]);
  const at = Math.min(i, Math.max(0, shown.length - 1));
  useEffect(() => { list.current?.querySelector<HTMLElement>("[aria-selected=true]")?.scrollIntoView({ block: "nearest" }); }, [at, shown]);

  return (
    <div className="fixed inset-0 z-[80] grid place-items-start justify-center bg-black/35 px-4 pt-[13vh] backdrop-blur-[3px]" onMouseDown={onClose}>
      <div role="dialog" aria-modal="true" aria-label="Command palette" className="pop-in w-full max-w-[640px] overflow-hidden rounded-2xl border border-line bg-bg shadow-[0_30px_90px_-20px_rgba(0,0,0,.45)]" onMouseDown={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 border-b border-line px-5">
          <span aria-hidden className="label text-accent-ink">&gt;</span>
          <input autoFocus value={q} onChange={(e) => { setQ(e.target.value); setI(0); }} placeholder="Type a page, a project or a command"
            role="combobox" aria-expanded aria-controls="palette-list" aria-activedescendant={shown[at] ? `pal-${shown[at].id}` : undefined} aria-label="Command"
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") { e.preventDefault(); setI((at + 1) % Math.max(1, shown.length)); }
              else if (e.key === "ArrowUp") { e.preventDefault(); setI((at - 1 + shown.length) % Math.max(1, shown.length)); }
              else if (e.key === "Enter") { e.preventDefault(); shown[at]?.run(); }
            }}
            className="h-16 flex-1 bg-transparent text-[18px] tracking-[-0.01em] !outline-none placeholder:text-mute" />
          <kbd className="label rounded border border-line px-1.5 py-0.5 text-mute">esc</kbd>
        </div>
        <ul id="palette-list" role="listbox" ref={list} className="max-h-[52vh] overflow-y-auto p-2">
          {shown.length === 0 && <li className="px-4 py-6 text-[15px] text-mute">Nothing matches &ldquo;{q}&rdquo;. Try &ldquo;work&rdquo; or &ldquo;team&rdquo;.</li>}
          {shown.map((c, n) => (
            <li key={c.id} id={`pal-${c.id}`} role="option" aria-selected={n === at} onMouseMove={() => setI(n)} onClick={c.run}
              className={`flex cursor-pointer items-center justify-between gap-4 rounded-xl px-4 py-3 text-[16px] ${n === at ? "bg-ink text-white" : ""}`}>
              <span className="font-medium tracking-[-0.01em]">{c.label}</span>
              <span className={`label truncate ${n === at ? "text-white/60" : "text-mute"}`}>{c.hint}</span>
            </li>
          ))}
        </ul>
        <div className="label flex gap-5 border-t border-line px-5 py-3 text-mute"><span>↑↓ move</span><span>↵ go</span><span>~ terminal</span></div>
      </div>
    </div>
  );
}

type Line = { kind: "in" | "out"; text: string };
const ROUTES: Record<string, string> = { home: "/", work: "/work", team: "/team", writing: "/notes", notes: "/notes", about: "/about", pricing: "/pricing", contact: "/contact" };

function Terminal({ data, onClose, go, surprise }: { data: ConsoleData; onClose: () => void; go: (p: string) => void; surprise: () => void }) {
  const [lines, setLines] = useState<Line[]>([{ kind: "out", text: "leslie@portfolio, public session. Nothing here is saved. Type help." }]);
  const [value, setValue] = useState("");
  const past = useRef<string[]>([]);
  const at = useRef(-1);
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => { box.current?.scrollTo({ top: box.current.scrollHeight }); }, [lines]);

  const answer = (raw: string): string[] | null => {
    const c = raw.trim().replace(/\s+/g, " ");
    const [cmd, ...rest] = c.split(" "), arg = rest.join(" ").toLowerCase();
    const cases = data.work.filter((w) => w.tier === "case");
    switch (cmd.toLowerCase()) {
      case "": return [];
      case "help": return ["help · whoami · ls · projects · stack · team · open <page or project> · sudo hire leslie · surprise · clear · exit"];
      case "whoami": return ["Leslie Paul Ajayi. Software engineer in Accra, Ghana.", "Works at Global Icons. Founder of Trofficient. CTO of Beagine."];
      case "ls": return ["work/  team/  writing/  about/  pricing/  contact/"];
      case "projects": return cases.map((w) => `${w.slug.padEnd(16)} ${w.name}: ${w.category}`).concat(["", "open <name> to read one."]);
      case "stack": return data.stack.map((g) => `${g.group.toLowerCase().padEnd(11)} ${g.items.join(", ")}`);
      case "team": return ["400: four people from Accra, no boss. Joyce, Leslie, Elton, Efo.", "I am the backend person on most of the projects. open team"];
      case "open": case "cd": {
        if (!arg) return ["open what? try: open work, open team, open trofficient"];
        const page = ROUTES[arg.replace(/\/$/, "")];
        const proj = cases.find((w) => w.slug === arg || w.name.toLowerCase() === arg);
        if (page) { setTimeout(() => go(page), 350); return [`opening ${arg}…`]; }
        if (proj) { setTimeout(() => go(`/work/${proj.slug}`), 350); return [`opening ${proj.name}…`]; }
        return [`no such page or project: ${arg}. Try ls or projects.`];
      }
      case "sudo":
        if (/^hire( leslie)?$/i.test(arg)) { setTimeout(() => go("/contact"), 600); return ["Permission granted. Opening contact…"]; }
        return ["sudo: nice try. Only one command is allowed here: sudo hire leslie."];
      case "rm": return ["rm: permission denied. This site is read-only, and I like it that way."];
      case "surprise": setTimeout(surprise, 200); return matchMedia("(prefers-reduced-motion: reduce)").matches ? ["Motion is off on your device, so no glitch. Respect."] : ["you asked for it…"];
      case "clear": setLines([]); return null;
      case "exit": case "quit": onClose(); return null;
      default: return [`command not found: ${cmd}. Try help.`];
    }
  };

  const run = () => {
    const text = value;
    if (text.trim()) { past.current.unshift(text); }
    at.current = -1; setValue("");
    const out = answer(text);
    if (out) setLines((l) => [...l, { kind: "in", text }, ...out.map((t) => ({ kind: "out" as const, text: t }))]);
  };

  return (
    <div role="dialog" aria-modal="false" aria-label="Terminal" className="sheet-in fixed inset-x-0 bottom-0 z-[80] flex h-[min(52vh,430px)] flex-col border-t-2 border-accent bg-night font-mono text-[13px] leading-relaxed text-[#ecedee] shadow-[0_-20px_60px_-20px_rgba(0,0,0,.5)]" onClick={() => (document.getElementById("term-in") as HTMLInputElement | null)?.focus()}>
      <div className="label flex items-center justify-between border-b border-white/10 px-5 py-2.5 text-white/50">
        <span className="flex items-center gap-2"><i aria-hidden className="h-[7px] w-[7px] rounded-full bg-accent" />Terminal, public session</span>
        <button onClick={onClose} className="hover:text-white" aria-label="Close terminal">esc</button>
      </div>
      <div ref={box} className="flex-1 overflow-y-auto px-5 py-3" aria-live="polite">
        {lines.map((l, n) => (<p key={n} className={`whitespace-pre-wrap break-words ${l.kind === "in" ? "text-white" : "text-white/70"}`}>{l.kind === "in" ? <><span className="text-accent">leslie@portfolio:~$</span> {l.text}</> : l.text}</p>))}
        <label className="flex items-center gap-2">
          <span className="shrink-0 text-accent">leslie@portfolio:~$</span>
          <input id="term-in" autoFocus value={value} onChange={(e) => setValue(e.target.value)} spellCheck={false} autoCapitalize="off" autoComplete="off" aria-label="Terminal command"
            onKeyDown={(e) => {
              if (e.key === "Enter") run();
              else if (e.key === "ArrowUp") { e.preventDefault(); at.current = Math.min(past.current.length - 1, at.current + 1); setValue(past.current[at.current] ?? ""); }
              else if (e.key === "ArrowDown") { e.preventDefault(); at.current = Math.max(-1, at.current - 1); setValue(at.current < 0 ? "" : past.current[at.current]); }
            }}
            className="min-w-0 flex-1 bg-transparent text-white !outline-none" />
        </label>
      </div>
    </div>
  );
}

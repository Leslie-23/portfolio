"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { BASE } from "@/lib/pricing";
import { PERSON } from "@/lib/data";

/* Elena, Leslie's assistant on this site. She comes in a few seconds after the page settles and asks one question:
   are you here to book Leslie, or to hire him for a project? From there she either does the thing (opens the price builder with the
   project type already picked, drafts the email, copies the address) or points at it (scrolls there and rings it).
   She is a guide, not a chatbot: every line she says is written here, so she can never make a claim Leslie has not made. */

const KEY = "elena.v1", QUIET_DAYS = 3;
type Msg = { from: "elena" | "you"; text: string };
type Ctx = { purpose?: string; when?: string; build?: { id: string; label: string } };
type Choice = { label: string; primary?: boolean; run: () => void };

const reduced = () => typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;
const store = {
  get: () => { try { return JSON.parse(localStorage.getItem(KEY) || "null") as { t: number } | null; } catch { return null; } },
  set: () => { try { localStorage.setItem(KEY, JSON.stringify({ t: Date.now() })); } catch {} },
};

/** Scroll to something and ring it, so the visitor sees exactly where it is. Returns false if it is not on this page. */
function point(selector: string): boolean {
  const el = document.querySelector<HTMLElement>(selector);
  if (!el) return false;
  el.scrollIntoView({ behavior: reduced() ? "auto" : "smooth", block: "center" });
  window.setTimeout(() => {
    const r = el.getBoundingClientRect();
    const ring = document.createElement("div");
    ring.setAttribute("aria-hidden", "true");
    Object.assign(ring.style, {
      position: "absolute", left: `${r.left + scrollX - 8}px`, top: `${r.top + scrollY - 8}px`, width: `${r.width + 16}px`, height: `${r.height + 16}px`,
      border: "2px solid var(--accent)", borderRadius: "16px", pointerEvents: "none", zIndex: "70",
      animation: reduced() ? "none" : "elena-ring 1.1s ease-in-out 3",
    });
    document.body.append(ring);
    window.setTimeout(() => ring.remove(), 3600);
  }, reduced() ? 0 : 500);
  return true;
}

export default function Elena() {
  const router = useRouter(), path = usePathname();
  const [open, setOpen] = useState(false), [ready, setReady] = useState(false), [away, setAway] = useState(false), [typing, setTyping] = useState(false);
  const [log, setLog] = useState<Msg[]>([]), [choices, setChoices] = useState<Choice[]>([]);
  const ctx = useRef<Ctx>({}), started = useRef(false), timers = useRef<number[]>([]), box = useRef<HTMLDivElement>(null), first = useRef<HTMLButtonElement>(null);
  const later = (fn: () => void, ms: number) => { timers.current.push(window.setTimeout(fn, reduced() ? 0 : ms)); };

  /** She says something (after a beat of typing), then offers choices. */
  const say = useCallback((text: string, next: Choice[] = []) => {
    setChoices([]); setTyping(true);
    later(() => { setLog((l) => [...l, { from: "elena", text }]); setTyping(false); setChoices(next); }, 550);
  }, []);
  const you = (text: string) => setLog((l) => [...l, { from: "you", text }]);
  /** Step out of the way for a few seconds so she is not covering what she is pointing at. */
  const showMe = (selector: string, after: string, next: Choice[]) => {
    setAway(true);
    point(selector);
    later(() => { setAway(false); say(after, next); }, 3200);
  };

  const mailto = () => {
    const c = ctx.current;
    const body = [`Hi Leslie,`, ``, `I found you through your site (Elena helped me write this).`, `I'd like to talk about: ${c.purpose ?? "working together"}.`, c.when ? `A good time for me: ${c.when}.` : ``, ``, `A bit about me and what I need:`, ``].filter((x, i, a) => !(x === "" && a[i - 1] === "")).join("\n");
    return `mailto:${PERSON.email}?subject=${encodeURIComponent(c.purpose ? `Let's talk: ${c.purpose}` : "Let's talk")}&body=${encodeURIComponent(body)}`;
  };

  // ---- the conversation, step by step ----
  const restart = () => { timers.current.forEach(clearTimeout); timers.current = []; ctx.current = {}; setLog([]); setChoices([]); setTyping(false); setAway(false); hello(); };
  const toBye = () => say("Anything else I can do?");
  const toEmail = () => say("I can't see Leslie's calendar, so I've written the email for you: what it's about and when suits you. One tap opens it, and he replies with times.", [
    { label: "Open the email", primary: true, run: () => { you("Open the email"); location.href = mailto(); later(() => say("Opened. Add a line or two about what you need and send it. Anything else?"), 400); } },
    { label: "Show me the contact section", run: () => { you("Show me the contact section"); showMe("#contact a[href^='mailto:']", "That's his email, right there. You can also reach him on LinkedIn. Anything else?", []); } },
    { label: "Copy his address", run: async () => { you("Copy his address"); try { await navigator.clipboard.writeText(PERSON.email); say(`Copied: ${PERSON.email}. Anything else?`); } catch { say(`It's ${PERSON.email}. Anything else?`); } } },
  ]);
  const toWhen = () => say("And when suits you?", ["This week", "Next week", "I'll say in the email"].map((w) => ({ label: w, run: () => { you(w); ctx.current.when = w === "I'll say in the email" ? undefined : w.toLowerCase(); toEmail(); } })));
  const toBook = () => say("Happy to. What's it about?", [
    { label: "A quick intro call", purpose: "an intro call" }, { label: "A role at my company", purpose: "a role at my company" }, { label: "A project", purpose: "a project" },
  ].map((o) => ({ label: o.label, run: () => { you(o.label); ctx.current.purpose = o.purpose; toWhen(); } })));
  const toHire = () => say("Great. What are you building?", [
    ...BASE.map((b) => ({ label: b.label, run: () => { you(b.label); ctx.current.build = { id: b.id, label: b.label }; toBuilder(); } })),
    { label: "Not sure yet", run: () => { you("Not sure yet"); toNotSure(); } },
  ]);
  const toBuilder = () => {
    const b = ctx.current.build!;
    say(`${b.label}, good. I'll open the price builder with that already picked. You'll see a range in cedis as you answer, and you can send the result to Leslie.`, [
      { label: "Take me there", primary: true, run: () => {
        you("Take me there");
        router.push(`/pricing?type=${b.id}`);
        later(() => showMe("#builder fieldset", "Here we are. I've picked what you're building. Start with how big it is, then the estimate fills in as you go.", [
          { label: "Email Leslie instead", run: () => { you("Email Leslie instead"); ctx.current.purpose = `a project: ${b.label.toLowerCase()}`; toWhen(); } },
        ]), 900);
      } },
      { label: "Email Leslie instead", run: () => { you("Email Leslie instead"); ctx.current.purpose = `a project: ${b.label.toLowerCase()}`; toWhen(); } },
    ]);
  };
  const toNotSure = () => say("No problem. The price builder helps you work it out, or you can just tell Leslie what you have in mind.", [
    { label: "Open the price builder", primary: true, run: () => { you("Open the price builder"); router.push("/pricing"); later(() => say("There you go. Pick a size and what you're building, and it takes it from there. Anything else?"), 900); } },
    { label: "Email Leslie", run: () => { you("Email Leslie"); ctx.current.purpose = "a project"; toWhen(); } },
  ]);
  const toLook = () => say("Of course. A few good places to start:", [
    { label: "Selected work", run: () => { you("Selected work"); router.push("/work"); later(toBye, 600); } },
    { label: "Meet the crew", run: () => { you("Meet the crew"); router.push("/team"); later(toBye, 600); } },
    { label: "Download his CV", run: () => { you("Download his CV"); window.open("/Leslie-Paul-Ajayi-CV.pdf", "_blank"); later(toBye, 600); } },
    { label: "I'm fine, thanks", run: () => { you("I'm fine, thanks"); store.set(); setOpen(false); } },
  ]);
  const hello = () => say("Hi, I'm Elena, Leslie's assistant. Are you here to book Leslie, or to hire him for a project?", [
    { label: "Book Leslie", primary: true, run: () => { you("Book Leslie"); toBook(); } },
    { label: "Hire for a project", primary: true, run: () => { you("Hire for a project"); toHire(); } },
    { label: "Just looking", run: () => { you("Just looking"); toLook(); } },
  ]);

  const begin = useCallback(() => { if (started.current) return; started.current = true; hello(); }, []);   // eslint-disable-line react-hooks/exhaustive-deps
  const openUp = (userAsked: boolean) => {
    setOpen(true); begin();
    if (userAsked) later(() => first.current?.focus(), 700);
  };
  const close = () => { store.set(); setOpen(false); };

  // the entrance: a few seconds after load, once every few days, and only if nothing else has her attention
  useEffect(() => {
    later(() => setReady(true), 2500);
    const seen = store.get();
    if (!seen || Date.now() - seen.t > QUIET_DAYS * 864e5) later(() => { if (!document.hidden) { setOpen(true); begin(); store.set(); } }, 7500);
    const t = timers.current;
    return () => t.forEach(clearTimeout);
  }, [begin]);
  useEffect(() => { box.current?.scrollTo({ top: box.current.scrollHeight, behavior: reduced() ? "auto" : "smooth" }); }, [log, typing, choices]);
  useEffect(() => { if (!open) return; const k = (e: KeyboardEvent) => { if (e.key === "Escape") close(); }; addEventListener("keydown", k); return () => removeEventListener("keydown", k); }, [open]);

  if (!ready) return null;
  // never a dead end: whenever she has nothing specific to offer and is not mid-sentence, she offers the way on (this also covers coming back later)
  const shown = choices, fallback = choices.length === 0 && !typing && log.length > 0;
  const onPricing = path === "/pricing";   // the pricing page has a bar along the bottom on phones: sit above it
  const lift = onPricing ? "max-lg:bottom-[88px]" : "", liftPanel = onPricing ? "max-lg:bottom-[172px]" : "";
  return (
    <>
      <div role="dialog" aria-modal="false" aria-label="Elena, Leslie's assistant" aria-hidden={!open}
        className={`fixed bottom-[84px] right-4 z-50 w-[min(360px,calc(100vw-32px))] origin-bottom-right transition-[opacity,transform] duration-300 md:bottom-[92px] md:right-6 ${liftPanel} ${open && !away ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-3 scale-95 opacity-0"}`}
        inert={!open || away}>
        {/* her bust, peeking over the top edge of the panel */}
        <Image src="/portrait/elena.png" alt="" aria-hidden width={900} height={702} sizes="220px" className="pointer-events-none absolute bottom-[calc(100%-10px)] right-3 h-auto w-[118px] max-w-none select-none md:right-2 md:w-[164px]"
          style={{ maskImage: "linear-gradient(to bottom, #000 60%, transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom, #000 60%, transparent 100%)" }} />
      <div className="relative overflow-hidden rounded-[20px] border border-line bg-bg shadow-[0_24px_60px_-20px_rgba(0,0,0,.35)]">
        <div className="flex items-center gap-3 border-b border-line px-4 py-3">
          <Face size={36} />
          <div className="min-w-0 flex-1 leading-tight"><p className="text-[15px] font-medium tracking-[-0.01em]">Elena</p><p className="whitespace-nowrap text-[13px] text-mute">Leslie&apos;s assistant</p></div>
          {log.length > 1 && <button type="button" onClick={restart} className="label shrink-0 rounded-full border border-line px-3 py-1.5 text-mute hover:border-ink hover:text-ink">Start over</button>}
          <button type="button" onClick={close} aria-label="Close Elena" className="grid h-8 w-8 place-items-center rounded-full border border-line text-mute hover:border-ink hover:text-ink">
            <svg width="12" height="12" viewBox="0 0 16 16" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M3 3l10 10M13 3L3 13" /></svg>
          </button>
        </div>
        <div ref={box} aria-live="polite" className="flex max-h-[min(46vh,340px)] flex-col gap-2 overflow-y-auto px-4 py-4">
          {log.map((m, i) => (
            <p key={i} className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-[15px] leading-snug ${m.from === "elena" ? "self-start rounded-bl-sm bg-soft text-ink" : "self-end rounded-br-sm bg-ink text-bg"}`}>{m.text}</p>
          ))}
          {typing && <p aria-label="Elena is typing" className="flex w-14 gap-1 self-start rounded-2xl rounded-bl-sm bg-soft px-3.5 py-3">{[0, 1, 2].map((d) => <i key={d} className="h-1.5 w-1.5 animate-pulse rounded-full bg-mute" style={{ animationDelay: `${d * 150}ms` }} />)}</p>}
        </div>
        {(shown.length > 0 || fallback) && (
          <div className="flex flex-wrap gap-2 border-t border-line px-4 py-3">
            {shown.map((c, i) => <Pill key={c.label} refEl={i === 0 ? first : undefined} primary={c.primary} onClick={c.run}>{c.label}</Pill>)}
            {/* never a dead end: when she has nothing specific to offer, or you come back later, she offers the way on */}
            {fallback && (<>
              <Pill refEl={first} primary onClick={() => { you("Book Leslie"); toBook(); }}>Book Leslie</Pill>
              <Pill primary onClick={() => { you("Hire for a project"); toHire(); }}>Hire for a project</Pill>
              <Pill onClick={() => { you("Just looking"); toLook(); }}>Just looking</Pill>
              <Pill onClick={() => { you("That's all"); close(); }}>That&apos;s all</Pill>
            </>)}
          </div>
        )}
      </div>
      </div>
      <button type="button" onClick={() => (open ? close() : openUp(true))} aria-expanded={open} aria-label={open ? "Close Elena" : "Ask Elena, Leslie's assistant"}
        className={`group fixed bottom-4 right-4 z-50 flex items-center gap-3 rounded-full border border-line bg-bg py-1.5 pl-1.5 pr-4 shadow-[0_10px_30px_-12px_rgba(0,0,0,.35)] transition-[transform,border-color] hover:-translate-y-0.5 hover:border-ink md:bottom-6 md:right-6 ${lift} elena-in`}>
        <Face size={44} dot />
        <span className="text-[15px] font-medium tracking-[-0.01em]">Elena</span>
      </button>
    </>
  );
}

function Face({ size, dot = false }: { size: number; dot?: boolean }) {
  return (
    <span className="relative shrink-0" style={{ width: size, height: size }}>
      <span className="block h-full w-full overflow-hidden rounded-full bg-[#eef1ee]">
        <Image src="/portrait/elena-face.png" alt="" aria-hidden width={size * 2} height={size * 2} sizes={`${size * 2}px`} className="h-full w-full object-cover" />
      </span>
      {dot && <i aria-hidden className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-bg bg-accent" />}
    </span>
  );
}

function Pill({ children, onClick, primary = false, refEl }: { children: React.ReactNode; onClick: () => void; primary?: boolean; refEl?: React.Ref<HTMLButtonElement> }) {
  return (
    <button ref={refEl} type="button" onClick={onClick}
      className={`rounded-full border px-3.5 py-2 text-[14px] font-medium transition-colors ${primary ? "border-ink bg-ink text-bg hover:border-accent-ink hover:bg-accent-ink" : "border-line text-ink hover:border-ink"}`}>{children}</button>
  );
}

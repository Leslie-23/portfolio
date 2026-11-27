"use client";
import { useState } from "react";
import { PERSON } from "@/lib/data";

const field = "mono mt-1 block w-full border-b border-ink bg-transparent py-2 text-base !normal-case !tracking-normal placeholder:text-mute/60 focus:border-accent focus:outline-none";

/** A project intake sheet. No backend: it composes a spec and hands it to your mail app, which is what it says. */
export default function ContactForm() {
  const [done, setDone] = useState(false);
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const g = (k: string) => String(f.get(k) ?? "").trim();
    const body = [`NAME: ${g("name")}`, `CONTACT: ${g("contact")}`, "", "WHAT ARE WE BUILDING?", g("build"), "", "WHAT PROBLEM ARE WE SOLVING?", g("problem"), "", "MESSAGE", g("message")].join("\n");
    window.location.href = `mailto:${PERSON.email}?subject=${encodeURIComponent("Spec: " + (g("build").slice(0, 60) || "new project"))}&body=${encodeURIComponent(body)}`;
    setDone(true);
  };
  if (done)
    return (
      <div className="border border-ink bg-paper-3 p-8" role="status">
        <div className="display text-4xl">Spec ready.</div>
        <p className="mono mt-3 text-mute">YOUR MAIL APP SHOULD HAVE OPENED WITH IT. IF NOT, EMAIL <a className="link-u text-ink" href={`mailto:${PERSON.email}`}>{PERSON.email}</a>.</p>
        <button className="btn mono mt-6" onClick={() => setDone(false)}>EDIT SPEC</button>
      </div>
    );
  return (
    <form onSubmit={submit} className="space-y-6 border border-ink bg-paper-3 p-5 md:p-8">
      <div className="mono flex justify-between text-mute"><span>PROJECT INTAKE SHEET</span><span>REV 1.0</span></div>
      <div className="grid gap-6 md:grid-cols-2">
        <label className="mono block">NAME<input name="name" required autoComplete="name" className={field} /></label>
        <label className="mono block">CONTACT<input name="contact" required placeholder="email or phone" autoComplete="email" className={field} /></label>
      </div>
      <label className="mono block">WHAT ARE WE BUILDING?<input name="build" required className={field} /></label>
      <label className="mono block">WHAT PROBLEM ARE WE SOLVING?<textarea name="problem" rows={3} className={field} /></label>
      <label className="mono block">MESSAGE<textarea name="message" rows={4} className={field} /></label>
      <button className="btn mono bg-ink text-paper hover:!bg-accent hover:!text-ink" data-cursor="SEND →">SEND SPEC →</button>
    </form>
  );
}

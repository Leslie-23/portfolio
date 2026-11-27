"use client";
import { useState } from "react";

export default function CopyCommand({ cmd }: { cmd: string }) {
  const [done, setDone] = useState(false);
  return (
    <div className="mt-6 flex max-w-[520px] items-center justify-between gap-3 rounded-full border border-line bg-soft py-1.5 pl-5 pr-1.5">
      <code className="truncate font-mono text-[14px]"><span className="text-accent-ink">$</span> {cmd}</code>
      <button onClick={async () => { try { await navigator.clipboard.writeText(cmd); setDone(true); setTimeout(() => setDone(false), 1600); } catch {} }}
        className="btn !h-9 shrink-0 !px-4 text-[13px]" aria-live="polite">{done ? "Copied" : "Copy"}</button>
    </div>
  );
}

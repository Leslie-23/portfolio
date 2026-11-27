"use client";
import { useState } from "react";

const N = 14;
const files = "abcdefghijklmn";
const inCorner = (r: number, c: number) => (r < 3 || r > 10) && (c < 3 || c > 10);

/** EXP. 004: a 14×14 grid with the four 3×3 corners removed. */
export default function ChessBoard() {
  const [hv, setHv] = useState<[number, number] | null>(null);
  return (
    <div>
      <div className="mx-auto grid aspect-square w-full max-w-[420px] border border-ink" style={{ gridTemplateColumns: `repeat(${N}, 1fr)` }} onPointerLeave={() => setHv(null)}>
        {Array.from({ length: N * N }).map((_, i) => {
          const r = Math.floor(i / N), c = i % N;
          if (inCorner(r, c)) return <i key={i} className="bg-ink/[0.04]" />;
          const dark = (r + c) % 2 === 1, on = hv && (hv[0] === r || hv[1] === c);
          return (
            <i key={i} onPointerEnter={() => setHv([r, c])} className={`transition-colors ${hv && hv[0] === r && hv[1] === c ? "!bg-accent" : on ? "!bg-accent/25" : dark ? "bg-ink/30" : "bg-paper"}`} />
          );
        })}
      </div>
      <div className="mono mt-2 flex justify-between text-mute" aria-live="polite">
        <span>{hv ? `SQUARE ${files[hv[1]].toUpperCase()}${N - hv[0]}` : "HOVER A SQUARE"}</span>
        <span>{N * N - 4 * 9} SQUARES</span>
      </div>
    </div>
  );
}

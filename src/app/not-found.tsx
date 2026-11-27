"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { motion } from "motion/react";
import { Spec } from "@/components/Spec";

export default function NotFound() {
  const slot = useRef<HTMLDivElement>(null);
  const piece = useRef<HTMLDivElement>(null);
  const [placed, setPlaced] = useState(false);

  const end = () => {
    const a = slot.current!.getBoundingClientRect(), b = piece.current!.getBoundingClientRect();
    if (Math.hypot(a.left - b.left, a.top - b.top) < 90) setPlaced(true);
  };

  const box = "mono grid h-16 w-40 place-items-center border border-ink bg-paper-3";
  return (
    <Spec name="NotFound" id="ROUTE_UNRESOLVED" as="div" className="frame grid12 gap-y-12 py-12 md:py-16">
      <div className="col-span-6 md:col-span-7">
        <div className="mono text-signal">ERR / ROUTE_UNRESOLVED</div>
        <h1 className="display mt-4 text-[clamp(52px,11vw,190px)]">Component<br />not found.</h1>
        <p className="mono mt-6 min-h-12 text-mute" aria-live="polite">
          {placed ? <>PART PLACED. THE ROUTE STILL DOESN&apos;T EXIST.<br />THE WAY BACK IS BELOW.</> : "ONE PIECE IS MISSING. DRAG IT INTO PLACE."}
        </p>
        <Link href="/" className="btn mono mt-6" data-cursor="HOME →">RETURN TO ASSEMBLY →</Link>
      </div>
      <div className="col-span-6 md:col-span-5">
        <div className="relative flex flex-col items-center gap-6 border border-ink bg-paper-2 p-8">
          <div className={box}>CLIENT</div><i className="h-6 w-px bg-accent" />
          <div className={box}>ROUTER</div><i className="h-6 w-px bg-accent" />
          <div ref={slot} className={`${box} ${placed ? "border-accent bg-accent text-ink" : "border-dashed text-mute"}`}>{placed ? "/???" : "[ MISSING ]"}</div>
          <i className="h-6 w-px bg-accent" /><div className={box}>RESULT</div>
          {!placed && (
            <motion.div ref={piece} drag dragMomentum={false} dragSnapToOrigin onDragEnd={end} whileDrag={{ scale: 1.06, rotate: -2 }} data-cursor="MOVE"
              className={`${box} absolute -right-4 top-8 cursor-grab !border-signal bg-paper text-signal md:right-[-70px]`} role="button" tabIndex={0} aria-label="Missing component. Drag onto the dashed slot.">
              /???
            </motion.div>
          )}
        </div>
      </div>
    </Spec>
  );
}

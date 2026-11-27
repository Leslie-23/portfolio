"use client";
import { useEffect } from "react";
import { gsap, reducedMotion } from "@/lib/gsap";
import { ShellState, useShell } from "./state";
import SmoothScroll from "./Lenis";
import Intro from "./Intro";
import Cursor from "./Cursor";
import Chrome from "./Chrome";
import GridOverlay from "./GridOverlay";
import InternalsLayer from "./InternalsLayer";
import Disassemble from "./Disassemble";
import Footer from "./Footer";
import Reconfigure from "./Reconfigure";

function Inner({ children }: { children: React.ReactNode }) {
  const { internals, toggleInternals } = useShell();

  useEffect(() => {
    const html = document.documentElement;
    if (internals) {
      html.dataset.internals = "on";
      if (!reducedMotion()) gsap.fromTo(document.body, { filter: "saturate(0.2) contrast(1.15)" }, { filter: "saturate(1) contrast(1)", duration: 0.7, ease: "power2.out", clearProps: "filter" });
    } else {
      delete html.dataset.internals;
    }
  }, [internals]);

  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("input,textarea,select,[contenteditable]") || e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key.toLowerCase() === "i") toggleInternals();
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [toggleInternals]);

  return (
    <>
      <SmoothScroll />
      <Intro />
      <Cursor />
      <GridOverlay />
      <InternalsLayer />
      <Disassemble />
      <Chrome />
      <Reconfigure />
      <main id="main" className="min-h-screen pt-14">{children}</main>
      <Footer />
    </>
  );
}

export default function Shell({ children }: { children: React.ReactNode }) {
  return <ShellState><Inner>{children}</Inner></ShellState>;
}

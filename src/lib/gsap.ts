"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";

let done = false;
export function setupGsap() {
  if (!done && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, Draggable);
    done = true;
  }
  return { gsap, ScrollTrigger, Draggable };
}
setupGsap();
export { gsap, ScrollTrigger, Draggable };

export const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Ease with a little physical weight: a fast snap that settles. */
export const SNAP = "back.out(1.4)";
export const LOCK = "power4.out";

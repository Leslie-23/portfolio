/* How much work this device can be asked to do. Used by the portrait build, the living bust and the globe.
   0 = low (old phones and laptops, or Data Saver on): the lightest version, no extras.
   1 = middle: lighter canvases, still animated.
   2 = high: everything.
   A guess from what the browser tells us, so it is only the starting point: the animations also watch their own
   frame rate and step down if they run slow. Client only (call it inside an effect). */
export type Tier = 0 | 1 | 2;

export function perfTier(): Tier {
  if (typeof navigator === "undefined") return 2;
  const n = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
  const cores = n.hardwareConcurrency || 8, mem = n.deviceMemory ?? 8;
  if (n.connection?.saveData || cores <= 2 || mem <= 2) return 0;
  if (cores <= 4 || mem <= 4) return 1;
  return 2;
}

/** Watches frame gaps while something animates. Feed it each frame's timestamp; it says when to step the quality down or up. */
export function frameWatch(opts: { slowMs: number; fastMs: number; cooldownMs?: number }) {
  let prev = 0, ema = 0, n = 0, lastChange = 0;
  const cool = opts.cooldownMs ?? 500;
  return {
    /** returns -1 to lower the quality, +1 to raise it, 0 to leave it */
    tick(now: number): -1 | 0 | 1 {
      const dt = prev ? Math.min(250, now - prev) : 0; prev = now;
      if (!dt) return 0;
      ema = n === 0 ? dt : ema * 0.8 + dt * 0.2; n++;
      if (n < 6 || now - lastChange < cool) return 0;
      if (ema > opts.slowMs) { lastChange = now; n = 3; return -1; }
      if (ema < opts.fastMs) { lastChange = now; return 1; }
      return 0;
    },
    reset() { prev = 0; },
    get avg() { return ema; },
  };
}

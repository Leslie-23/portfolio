"use client";
import { createContext, useCallback, useContext, useMemo, useState } from "react";

type S = {
  internals: boolean;
  toggleInternals: () => void;
  broken: boolean;
  setBroken: (b: boolean) => void;
  introDone: boolean;
  setIntroDone: (b: boolean) => void;
  indexOpen: boolean;
  setIndexOpen: (b: boolean) => void;
};
const Ctx = createContext<S | null>(null);

export function ShellState({ children }: { children: React.ReactNode }) {
  const [internals, setInternals] = useState(false);
  const [broken, setBroken] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const [indexOpen, setIndexOpen] = useState(false);
  const toggleInternals = useCallback(() => setInternals((v) => !v), []);
  const value = useMemo(
    () => ({ internals, toggleInternals, broken, setBroken, introDone, setIntroDone, indexOpen, setIndexOpen }),
    [internals, toggleInternals, broken, introDone, indexOpen],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useShell() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useShell outside ShellState");
  return c;
}

"use client";
import { useEffect, useRef, useState } from "react";
import { TRACKS } from "@/lib/music";

const clock = (s: number) => (Number.isFinite(s) ? `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}` : "0:00");

/** A quiet player in the top bar. It never starts by itself: a visitor presses play, and it keeps playing as they move
 *  between pages. It renders nothing at all until there is a track in src/lib/music.ts. */
export default function MusicPlayer() {
  const audio = useRef<HTMLAudioElement>(null);
  const root = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [i, setI] = useState(0);
  const [time, setTime] = useState(0);
  const [dur, setDur] = useState(0);
  const [muted, setMuted] = useState(false);
  const [failed, setFailed] = useState(false);
  const track = TRACKS[i];

  const toggle = () => {
    const a = audio.current; if (!a) return;
    if (a.paused) a.play().catch(() => setFailed(true)); else a.pause();
  };
  const pick = (n: number) => {
    const a = audio.current; if (!a) return;
    setI((n + TRACKS.length) % TRACKS.length); setFailed(false); setTime(0);
    requestAnimationFrame(() => { a.load(); a.play().catch(() => setFailed(true)); });
  };

  useEffect(() => {
    if (!TRACKS.length) return;
    const t = () => toggle();
    const out = (e: PointerEvent) => { if (root.current && !root.current.contains(e.target as Node)) setOpen(false); };
    const key = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    addEventListener("toggle-music", t); addEventListener("pointerdown", out); addEventListener("keydown", key);
    return () => { removeEventListener("toggle-music", t); removeEventListener("pointerdown", out); removeEventListener("keydown", key); };
  }, []);

  if (!track) return null;

  const onPlay = () => {
    setPlaying(true);
    if ("mediaSession" in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({ title: track.title, artist: track.artist });
      navigator.mediaSession.setActionHandler("play", () => audio.current?.play());
      navigator.mediaSession.setActionHandler("pause", () => audio.current?.pause());
      if (TRACKS.length > 1) { navigator.mediaSession.setActionHandler("nexttrack", () => pick(i + 1)); navigator.mediaSession.setActionHandler("previoustrack", () => pick(i - 1)); }
    }
  };

  return (
    <div ref={root} className="relative">
      <audio ref={audio} src={track.src} preload="none" onPlay={onPlay} onPause={() => setPlaying(false)} onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDur(e.currentTarget.duration)} onEnded={() => (TRACKS.length > 1 ? pick(i + 1) : setPlaying(false))} onError={() => setFailed(true)} />
      <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-label={playing ? "Music, playing" : "Music"}
        className="relative grid h-10 w-10 place-items-center rounded-full border border-line transition-colors hover:border-ink">
        <span aria-hidden className={`eq flex h-[14px] items-end gap-[2px] ${playing ? "eq-on" : ""}`}><i className="block w-[2px] rounded-[1px] bg-current" style={{ height: 5 }} /><i className="block w-[2px] rounded-[1px] bg-current" style={{ height: 10 }} /><i className="block w-[2px] rounded-[1px] bg-current" style={{ height: 7 }} /><i className="block w-[2px] rounded-[1px] bg-current" style={{ height: 12 }} /></span>
      </button>
      {open && (
        <div role="group" aria-label="Music player" className="pop-in absolute right-0 top-[calc(100%+10px)] z-50 w-[min(320px,calc(100vw-40px))] rounded-2xl border border-line bg-bg p-4 shadow-[0_24px_70px_-20px_rgba(0,0,0,.35)]">
          <p className="label text-mute">Now playing</p>
          <p className="mt-1 text-[17px] font-medium leading-tight tracking-[-0.02em]">{track.title}</p>
          <p className="text-[14px] text-mute">{track.artist}</p>
          <div className="mt-4 flex items-center gap-3">
            {TRACKS.length > 1 && <button type="button" onClick={() => pick(i - 1)} aria-label="Previous track" className="grid h-9 w-9 place-items-center rounded-full border border-line hover:border-ink"><svg width="14" height="14" viewBox="0 0 14 14" aria-hidden fill="currentColor"><path d="M3 2h1.6v10H3zM12 2v10L5.5 7z" /></svg></button>}
            <button type="button" onClick={toggle} aria-label={playing ? "Pause" : "Play"} className="grid h-11 w-11 place-items-center rounded-full bg-ink text-white hover:bg-[#2a2a2c]">
              {playing ? <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden fill="currentColor"><path d="M3 2h2.6v10H3zM8.4 2H11v10H8.4z" /></svg> : <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden fill="currentColor"><path d="M3.5 1.8v10.4L12 7z" /></svg>}
            </button>
            {TRACKS.length > 1 && <button type="button" onClick={() => pick(i + 1)} aria-label="Next track" className="grid h-9 w-9 place-items-center rounded-full border border-line hover:border-ink"><svg width="14" height="14" viewBox="0 0 14 14" aria-hidden fill="currentColor"><path d="M9.4 2H11v10H9.4zM2 2l6.5 5L2 12z" /></svg></button>}
            <button type="button" onClick={() => { const a = audio.current; if (a) { a.muted = !a.muted; setMuted(a.muted); } }} aria-pressed={muted} aria-label={muted ? "Unmute" : "Mute"} className="label ml-auto h-9 rounded-full border border-line px-3 text-mute hover:text-ink">{muted ? "Muted" : "Sound on"}</button>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <span className="label w-9 text-mute tabular-nums">{clock(time)}</span>
            <input type="range" min={0} max={dur || 0} step={0.1} value={Math.min(time, dur || 0)} aria-label="Seek" onChange={(e) => { const a = audio.current; if (a) { a.currentTime = +e.target.value; setTime(a.currentTime); } }} className="h-1 min-w-0 flex-1 cursor-pointer accent-[var(--accent-ink)]" />
            <span className="label w-9 text-right text-mute tabular-nums">{clock(dur)}</span>
          </div>
          {failed && <p className="mt-3 text-[13px] text-mute">That track would not load. Try again in a moment.</p>}
          {track.credit && <p className="label mt-4 border-t border-line pt-3 text-mute">{track.credit}</p>}
        </div>
      )}
    </div>
  );
}

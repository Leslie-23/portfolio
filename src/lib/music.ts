/** The site's soundtrack. Empty means there is no player at all: nothing renders and nothing loads.
 *
 *  To add a track:
 *  1. Put the audio file in public/audio (for example public/audio/theme.mp3).
 *  2. Add an entry below. `credit` is shown in the player and is where a licence or source line goes.
 *
 *  Only add audio you made, or have the right or a licence to publish. */
export type Track = { src: string; title: string; artist: string; credit?: string };

export const TRACKS: Track[] = [
  // { src: "/audio/theme.mp3", title: "Title", artist: "Artist", credit: "Written and produced by Leslie" },
  { src: "/audio/time.mp3", title: "Time", artist: "Hans Zimmer", credit: "From Inception. Not my recording." },
];

"use client";
import React, { createContext, useContext, useMemo, useState } from "react";
import { Howl } from "howler";

type SoundName = "hum" | "key" | "reverb" | "glitch" | "access" | "heartbeat";
type Ctx = { enabled: boolean; toggle: () => void; play: (n: SoundName) => void };
const SoundCtx = createContext<Ctx | null>(null);

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const sounds = useMemo(() => {
    if (typeof window === "undefined") return {} as Record<SoundName, Howl>;
    return {
      hum: new Howl({ src: ["/audio/boot_hum.mp3"], loop: true, volume: 0.2, preload: false }),
      heartbeat: new Howl({ src: ["/audio/heartbeat_loop.mp3"], loop: true, volume: 0.12, preload: false }),
      key: new Howl({ src: ["/audio/keyboard_click.mp3"], volume: 0.2, preload: false }),
      glitch: new Howl({ src: ["/audio/glitch_fx.mp3"], volume: 0.25, preload: false }),
      access: new Howl({ src: ["/audio/access_granted.mp3"], volume: 0.25, preload: false }),
      reverb: new Howl({ src: ["/audio/reverb.mp3"], volume: 0.25, preload: false })
    } as Record<SoundName, Howl>;
  }, []);

  const toggle = () => {
    setEnabled((e) => {
      const next = !e;
      try {
        if (next) {
          sounds.hum?.play();
          sounds.heartbeat?.play();
        } else {
          sounds.hum?.pause();
          sounds.heartbeat?.pause();
        }
      } catch {}
      return next;
    });
  };

  const play = (n: SoundName) => { if (enabled) try { sounds[n]?.play(); } catch {} };

  return <SoundCtx.Provider value={{ enabled, toggle, play }}>{children}</SoundCtx.Provider>;
}

export function useSound() {
  const ctx = useContext(SoundCtx);
  return ctx ?? { enabled: false, toggle: () => {}, play: () => {} };
}

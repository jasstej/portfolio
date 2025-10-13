"use client";
import { useEffect, useRef, useState } from "react";
import { useSound } from "@/components/sound/SoundProvider";

function randomHex(n = 16) {
  const bytes = new Uint8Array(n);
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    crypto.getRandomValues(bytes);
  } else {
    for (let i = 0; i < n; i++) bytes[i] = Math.floor(Math.random() * 256);
  }
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export default function Logs() {
  const sound = useSound();
  const [lines, setLines] = useState<string[]>([]);
  const [latency, setLatency] = useState(23);
  const [start] = useState(Date.now() - 413 * 24 * 60 * 60 * 1000);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const i = setInterval(() => {
      setLines((ls) => {
        const next = [`${randomHex(8)} ${randomHex(16)} ${randomHex(8)}`, ...ls].slice(0, 50);
        return next;
      });
      setLatency((l) => Math.max(5, Math.min(120, Math.round(l + (Math.random() - 0.5) * 10))));
    }, 800);
    return () => clearInterval(i);
  }, []);
  const uptimeDays = Math.floor((Date.now() - start) / (1000 * 60 * 60 * 24));
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-20">
      <div className="mx-auto max-w-6xl p-3 font-mono text-xs text-green-300 bg-black/60 border-t border-white/10 glass">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 overflow-hidden">
            <div ref={ref} className="whitespace-nowrap overflow-hidden text-ellipsis">
              {lines.join("  ")}
            </div>
          </div>
          <div className="shrink-0 text-cyan-300">latency: {latency}ms</div>
          <div className="shrink-0 text-yellow-300">uptime: {uptimeDays} days</div>
          <button
            onClick={() => sound.toggle()}
            className="shrink-0 px-2 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-white/80"
            title={sound.enabled ? "sound: on" : "sound: off"}
          >
            {sound.enabled ? "🔊 sound: on" : "🔈 sound: off"}
          </button>
        </div>
      </div>
    </footer>
  );
}

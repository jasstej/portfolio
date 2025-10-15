"use client";
import { useEffect, useRef } from "react";

// Simple animated core placeholder. Can be swapped with R3F later.
export default function DigitalCore() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let t = 0; const id = setInterval(() => {
      t += 0.02;
      if (ref.current) ref.current.style.setProperty("--spin", `${t}turn`);
    }, 16);
    return () => clearInterval(id);
  }, []);
  return (
    <section className="py-16 px-6">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        <div className="relative aspect-square rounded-2xl border border-white/10 bg-black/50 overflow-hidden">
          <div ref={ref} className="absolute inset-0 grid place-items-center">
            <div
              className="w-40 h-40 rounded-full"
              style={{
                background: "radial-gradient(closest-side, #00ff9d, transparent)",
                boxShadow: "0 0 40px #00ff9d66, inset 0 0 40px #00ff9d44",
                transform: "rotate(var(--spin))",
                transition: "transform 0.1s linear",
              }}
            />
          </div>
          <div className="absolute bottom-3 left-3 right-3 text-center font-mono text-xs text-white/70">
            &quot;Firewalls breathe. Code dreams.&quot;
          </div>
        </div>
        <div>
          <h2 className="font-display text-3xl mb-3">Digital Core</h2>
          <p className="text-white/70 font-mono">A singular focus replacing a noisy map: security, entropy, architecture, resilience.</p>
        </div>
      </div>
    </section>
  );
}

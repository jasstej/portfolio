"use client";
import { useMemo } from "react";

const LOGS = [
  { year: 2023, text: "Initiated trace at GNA University" },
  { year: 2024, text: "Deployed Sentinel.log" },
  { year: 2025, text: "Breached AIR 19, Pentathon CTF" },
  { year: 2026, text: "Infiltrating future architectures..." },
];

export default function OperationLogs() {
  const items = useMemo(() => LOGS, []);
  return (
    <section id="logs" className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-3xl mb-6">Operation Logs</h2>
        <div className="relative overflow-x-auto">
          <div className="min-w-[900px] flex items-center gap-10 py-6 border-t border-b border-white/10">
            {items.map((it, idx) => (
              <div key={idx} className="relative group">
                <div className="w-2 h-2 rounded-full bg-[var(--neon-cyan)] mx-auto mb-2 shadow-[0_0_12px_#00b4ff]"></div>
                <div className="text-center font-mono text-sm text-white/80 whitespace-nowrap">[{it.year}] → {it.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

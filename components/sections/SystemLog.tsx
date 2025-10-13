"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

type Log = { ts: string; text: string; details?: string };
const LOGS: Log[] = [
  { ts: "2023-09-10", text: "Initialized Cybersecurity Research at GNA University", details: "Foundations in networks, systems, and threat modeling." },
  { ts: "2024-05-23", text: "Obtained AWS Certified Cloud Practitioner", details: "Cloud fundamentals, security shared responsibility, and cost models." },
  { ts: "2025-03-17", text: "Ranked AIR-19 in Pentathon CTF", details: "Reverse engineering, pwn, and crypto challenges." },
  { ts: "2025-10-29", text: "Spoke at Techपङ्गा 2025 on Cyber Resilience", details: "Defense in depth, detection engineering, and storytelling." },
];

export default function SystemLog() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="system-log" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-display text-3xl mb-6">System Log</h2>
        <div className="relative">
          <div className="absolute left-[10px] top-0 bottom-0 w-[2px] bg-white/10" />
          <div className="space-y-4">
            {LOGS.map((l, i) => (
              <LogRow key={i} i={i} log={l} open={open} setOpen={setOpen} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function LogRow({ i, log, open, setOpen }: { i: number; log: Log; open: number | null; setOpen: (i: number | null) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px -20% 0px" });
  const controls = useAnimation();
  useEffect(() => { if (inView) controls.start({ opacity: 1, x: 0 }); }, [inView, controls]);
  const expanded = open === i;
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={controls}
      className="relative pl-10"
    >
      <div className="absolute left-0 top-2 w-5 h-5 rounded-full bg-[var(--neon-cyan)] shadow-[0_0_12px_var(--neon-cyan)]" />
      <div className="glass p-4 rounded-lg cursor-pointer" onClick={() => setOpen(expanded ? null : i)}>
        <div className="flex items-center justify-between">
          <div className="font-mono text-cyan-300">[{log.ts}]</div>
          <div className="text-white/80">{log.text}</div>
        </div>
        {log.details && (
          <motion.div
            initial={false}
            animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
            className="overflow-hidden text-sm text-white/70 mt-2"
          >
            {log.details}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

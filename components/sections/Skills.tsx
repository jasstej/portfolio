"use client";
import { useEffect, useState, useMemo, useRef } from "react";
import { loadContent } from "@/lib/storage";
import { defaultContent } from "@/lib/content";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

// Basic skill descriptions (extend as needed)
const SKILL_DESCRIPTIONS: Record<string, string> = {
  react: "Declarative UI library for building component-driven interfaces.",
  typescript: "Typed superset of JavaScript improving safety & tooling.",
  python: "Rapid development & scripting language used across Sentinel.",
  aws: "Cloud platform: IAM, KMS, S3, Lambda, VPC architecture.",
  "kali linux": "Pen-testing distro leveraged for reconnaissance and audits.",
  "red hat": "Enterprise Linux administration & system hardening.",
  docker: "Containerization for consistent, portable runtime environments.",
  terraform: "Infrastructure as Code orchestrating FireCore cloud policies.",
  "next.js": "Hybrid React framework powering SSR/ISR portfolio delivery.",
  "node.js": "Backend runtime enabling tooling & API endpoints.",
  bash: "Automation & environment scripting across deployment flows.",
  nmap: "Network mapper for surface analysis & service enumeration.",
};

export default function Skills() {
  const [skills, setSkills] = useState(defaultContent.skills);
  const [achievements, setAchievements] = useState(defaultContent.achievements);
  const [logs, setLogs] = useState<string[]>([]);
  const hoverCount = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onUpdate = () => {
      const c = loadContent();
      setSkills(c.skills);
      setAchievements(c.achievements);
    };
    const c = loadContent();
    setSkills(c.skills);
    setAchievements(c.achievements);
    window.addEventListener("content:updated", onUpdate as any);
    return () => window.removeEventListener("content:updated", onUpdate as any);
  }, []);

  const achievementIndex = useMemo(() => {
    // map skill not th ekeyword sbut everything but  not this day  to related certs (simple heuristic match)
    return achievements.reduce<Record<string, string[]>>((acc, a) => {
      const lower = a.title.toLowerCase();
      for (const sk of skills) {
        const key = sk.toLowerCase();
        if (lower.includes(key.split(" ")[0])) {
          acc[key] = acc[key] || [];
          acc[key].push(a.title);
        }
      }
      return acc;
    }, {});
  }, [achievements, skills]);
  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-3xl mb-6">Skills</h2>
        <div ref={containerRef} className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 relative">
          <style>{`
            .skill-ripple { position:absolute; inset:0; pointer-events:none; }
            .pulse { animation: pulseWave 1s ease-out; }
            @keyframes pulseWave { 0% { opacity:0.5; transform:scale(0.92); } 100% { opacity:0; transform:scale(1.25); } }
          `}</style>
          {skills.map((name) => {
            const key = name.toLowerCase();
            const desc = SKILL_DESCRIPTIONS[key] || "(description pending)";
            const related = achievementIndex[key] || [];
            const lyrical = LYRICAL_LINES[key] || "signal resonating";
            const technical = desc;
            return (
              <Tooltip key={name}>
                <TooltipTrigger asChild>
                  <div
                    onMouseEnter={() => {
                      hoverCount.current += 1;
                      const ts = new Date().toLocaleTimeString();
                      setLogs((l) => [
                        `[${ts}] ${name} → ${technical.split(" ")[0]} synced.`,
                        ...l.slice(0, 18),
                      ]);
                      // Easter egg every 10th hover
                      if (hoverCount.current % 10 === 0) {
                        setLogs((l) => [
                          `[${ts}] hidden.exe executed — "Curiosity is a valid exploit."`,
                          ...l.slice(0, 18),
                        ]);
                      }
                      // ripple
                      const el = containerRef.current;
                      if (el) {
                        const ripple = document.createElement("div");
                        ripple.className = "skill-ripple pulse bg-[radial-gradient(circle,#00ff9d33,transparent_60%)]";
                        el.appendChild(ripple);
                        setTimeout(() => ripple.remove(), 1000);
                      }
                    }}
                    className="glass cursor-help p-4 rounded-lg border border-white/10 hover:border-[var(--neon-cyan)]/40 transition relative overflow-hidden group"
                  >
                    <div className="font-mono relative z-10 group-hover:opacity-0 transition">{name}</div>
                    <div className="absolute inset-0 flex flex-col justify-center items-center font-mono text-center text-[11px] px-3 opacity-0 group-hover:opacity-100 transition">
                      <div className="text-[var(--neon-cyan)] mb-1" data-layer="lyrical">{lyrical}</div>
                      <div className="text-white/70" data-layer="technical">{technical}</div>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs bg-black/90 text-white border border-white/10 shadow-lg">
                  <div className="font-mono text-[11px] leading-relaxed">
                    <div className="text-cyan-300 mb-1">{name}</div>
                    <div className="text-white/80 mb-2">{desc}</div>
                    {related.length > 0 && (
                      <div className="text-white/60">
                        <div className="text-white/40 mb-0.5">certifications:</div>
                        {related.map((r) => (
                          <div key={r} className="truncate">- {r}</div>
                        ))}
                      </div>
                    )}
                  </div>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
        {/* Mini skill log console */}
        <div className="mt-8 glass rounded-lg p-3 font-mono text-[11px] text-green-300/80 border border-white/10">
          <div className="text-white/50 mb-1">skill.syslog</div>
          <div className="space-y-0.5 max-h-40 overflow-auto">
            {logs.map((l, i) => <div key={i}>{l}</div>)}
          </div>
        </div>
      </div>
    </section>
  );
}

// Lyrical layer lines for cognitive duality
const LYRICAL_LINES: Record<string, string> = {
  react: "components dreaming in neon", 
  typescript: "typing fate before runtime", 
  python: "serpents weaving telemetry", 
  aws: "cloud sigils conjured", 
  "kali linux": "shadow scans breathing", 
  "red hat": "iron shell stewardship", 
  docker: "containment rituals bound", 
  terraform: "infrastructure spellcasting", 
  "next.js": "edge routes awakening", 
  "node.js": "event loops chanting", 
  bash: "automation incantations", 
  nmap: "ports whisper their banners", 
};

"use client";
import { useEffect, useMemo, useState } from "react";
import { defaultContent, flowLinks, nodeColors } from "@/lib/content";
import { loadContent } from "@/lib/storage";

type Point = { x: number; y: number };

export default function NetworkMap() {
  const [content, setContent] = useState(defaultContent);
  useEffect(() => {
    const onUpdate = () => setContent(loadContent());
    setContent(loadContent());
    window.addEventListener("content:updated", onUpdate as EventListener);
    return () => window.removeEventListener("content:updated", onUpdate as EventListener);
  }, []);

  const layout = useMemo(() => {
    // Build nodes by type
    const padX = 160; const padY = 76;
    const hub: Point = { x: 120, y: 200 };

    // Determine left-middle layer nodes from achievements and from skills/concepts referenced in flowLinks
    const ach = content.achievements.map((a) => ({ id: a.id, label: a.title, type: "certificate" as const }));
    const skillSet = new Set<string>();
    for (const l of flowLinks) {
      // include non-achievement sources as skills/concepts
      if (!ach.find(a => a.id === l.from)) skillSet.add(l.from.toLowerCase());
    }
    const skills = Array.from(skillSet).map((s) => ({ id: s, label: s, type: "skill" as const }));

    // Right layer: projects
    const pro = content.projects.map((p) => ({ id: p.id, label: p.name, type: "project" as const }));

    // Positioning
    const midNodes = [...ach, ...skills];
    const midCount = midNodes.length || 1;
    const projCount = pro.length || 1;
    const height = Math.max(340, 60 + Math.max(midCount, projCount) * padY);
    const mid = midNodes.map((n, i) => ({ ...n, x: hub.x + padX * 1, y: 60 + i * padY }));
    const proPos = pro.map((n, i) => ({ ...n, x: hub.x + padX * 2.2, y: 60 + i * padY }));

    return { hub, mid, pro: proPos, width: 900, height };
  }, [content]);

  return (
    <section id="network" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-3xl mb-3">Network Map</h2>
        <p className="text-white/70 mb-4 font-mono">Flow of influence: core → certifications → projects</p>
      </div>
      <div className="rounded-xl overflow-hidden border border-white/10 mx-auto max-w-6xl bg-black/50">
        <svg viewBox={`0 0 ${layout.width} ${layout.height}`} className="w-full h-[520px]">
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--neon-cyan)" />
            </marker>
          </defs>
          {/* links: hub -> mid layer */}
          {layout.mid.map(a => (
            <line key={`h-${a.id}`} x1={layout.hub.x + 70} y1={layout.hub.y} x2={a.x - 70} y2={a.y}
              stroke={a.type === 'certificate' ? nodeColors.certificate : nodeColors.skill}
              strokeOpacity="0.4" markerEnd="url(#arrow)" />
          ))}
          {/* links: mid layer -> projects based on flowLinks */}
          {flowLinks.map((l, idx) => {
            const src = layout.mid.find(n => n.id.toLowerCase() === l.from.toLowerCase());
            const dst = layout.pro.find(n => n.id === l.to);
            if (!src || !dst) return null;
            const w = Math.max(1, Math.min(4, (l.weight ?? 1)));
            return (
              <g key={`e-${idx}`}>
                <line x1={src.x + 70} y1={src.y} x2={dst.x - 70} y2={dst.y}
                  stroke={nodeColors.project}
                  strokeOpacity={0.45 + (w - 1) * 0.15}
                  strokeWidth={w}
                  markerEnd="url(#arrow)" />
                {l.label && (
                  <text x={(src.x + dst.x)/2} y={(src.y + dst.y)/2 - 6} textAnchor="middle" fill="#88ffd7" fontSize="10" fontFamily="monospace">{l.label}</text>
                )}
              </g>
            );
          })}
          {/* hub node */}
          <g transform={`translate(${layout.hub.x - 60}, ${layout.hub.y - 24})`}>
            <rect width="120" height="48" rx="10" fill="#022" stroke="#00ff9d" strokeOpacity="0.8" />
            <text x="60" y="30" textAnchor="middle" fill="#aaffdd" fontFamily="monospace">JasstejTrace.exe</text>
          </g>
          {/* mid layer nodes (certs + skills) */}
          {layout.mid.map(a => (
            <g key={a.id} transform={`translate(${a.x - 80}, ${a.y - 22})`}>
              <rect width="160" height="44" rx="10" fill="#112" stroke={a.type === 'certificate' ? nodeColors.certificate : nodeColors.skill} strokeOpacity="0.7" />
              <text x="80" y="28" textAnchor="middle" fill="#cdeaff" fontFamily="monospace">{a.label}</text>
            </g>
          ))}
          {/* project nodes */}
          {layout.pro.map(p => (
            <g key={p.id} transform={`translate(${p.x - 80}, ${p.y - 22})`}>
              <rect width="160" height="44" rx="10" fill="#111" stroke="#00b4ff" strokeOpacity="0.7" />
              <text x="80" y="28" textAnchor="middle" fill="#cdeaff" fontFamily="monospace">{p.label}</text>
            </g>
          ))}
        </svg>
      </div>
    </section>
  );
}

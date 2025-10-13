"use client";
import { useEffect, useState } from "react";
import { loadContent } from "@/lib/storage";
import { defaultContent } from "@/lib/content";

export default function Skills() {
  const [skills, setSkills] = useState(defaultContent.skills);
  useEffect(() => {
    const onUpdate = () => setSkills(loadContent().skills);
    setSkills(loadContent().skills);
    window.addEventListener("content:updated", onUpdate as any);
    return () => window.removeEventListener("content:updated", onUpdate as any);
  }, []);
  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-3xl mb-6">Skills</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {skills.map((name) => (
            <div key={name} className="glass p-4 rounded-lg border border-white/10 hover:border-[var(--neon-cyan)]/40 transition">
              <div className="font-mono">{name}</div>
              <div className="text-xs text-white/50">hover for data burst</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

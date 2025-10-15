"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { loadContent } from "@/lib/storage";
import { defaultContent } from "@/lib/content";

export default function Achievements() {
  // Initialize with server-render-friendly defaults to avoid hydration mismatch
  const [content, setContent] = useState(defaultContent);
  useEffect(() => {
    const onUpdate = () => setContent(loadContent());
    setContent(loadContent()); // load snapshot after mount
    window.addEventListener("content:updated", onUpdate as any);
    return () => window.removeEventListener("content:updated", onUpdate as any);
  }, []);

  return (
    <section id="achievements" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-3xl mb-8">Achievements</h2>
        <style>{`
          @keyframes flicker { 0%,100% { opacity:1 } 50% { opacity:0.4 } }
          .cert-card:hover .cert-flicker { animation:flicker 0.4s 2 linear; }
          .cert-card:hover .cert-detail { opacity:1; transform:translateY(0); }
        `}</style>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.achievements.map((a) => (
            <div key={a.id} className="relative p-4 rounded-xl glass group cert-card overflow-hidden">
              <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-[var(--neon-cyan)/20] to-[var(--neon-pink)/20] blur-xl opacity-0 group-hover:opacity-100 transition" />
              <div className="relative flex items-center gap-4">
                {a.imageUrl && (
                  <Image src={a.imageUrl} alt={a.title} width={64} height={64} className="rounded-md border border-white/10 cert-flicker" />
                )}
                <div>
                  <div className="font-medium cert-flicker">{a.title}</div>
                  <div className="text-sm text-white/60">{a.issuer}</div>
                  {a.issuedOn && <div className="text-xs text-white/40">Issued {a.issuedOn}</div>}
                </div>
              </div>
              <div className="cert-detail transition opacity-0 translate-y-2 text-xs text-white/60 mt-3 font-mono">
                Issued by {a.issuer}{a.issuedOn ? `, ${a.issuedOn}` : ""} — validating mastery.
              </div>
              {a.note && <div className="mt-3 text-sm text-white/70">{a.note}</div>}
              {a.verifyUrl && (
                <a href={a.verifyUrl} target="_blank" rel="noreferrer" className="mt-3 inline-block text-cyan-300 hover:underline">Verify →</a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";
import { useEffect, useState } from "react";

const LINES = [
  "> identity = JasstejSinghMarwaha",
  "> role = Cybersecurity Researcher, Cloud Architect, Digital Poet",
  "> principle = \"Entropy is not chaos — it’s a pattern waiting to be decoded.\"",
  "> status = ACTIVE",
];

export default function CyberManifesto() {
  const [shown, setShown] = useState<string[]>([]);
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      setShown((s) => (i < LINES.length ? [...s, LINES[i++]] : s));
      if (i >= LINES.length) clearInterval(id);
    }, 700);
    return () => clearInterval(id);
  }, []);
  return (
    <section id="manifesto" className="py-20 px-6 bg-black/60 border-y border-white/10">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-display text-3xl mb-6">Cyber Manifesto</h2>
        <div className="font-mono text-white/90 space-y-2">
          {shown.map((l, i) => (
            <div key={i}>{l}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

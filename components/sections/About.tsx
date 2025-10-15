import { useEffect, useState } from "react";
export default function About() {
  const full1 = "I trace signals through silicon dreams — where vulnerabilities whisper and firewalls breathe. My work lives at the edge of clarity and chaos, translating entropy into insight, and risk into resilience.";
  const full2 = "I design secure cloud architectures, hunt threats, and craft systems that glow with intention. The keyboard is a keycard; the network, a narrative.";
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  useEffect(() => {
    // glitch typing simulation
    let i = 0; let j = 0;
    const interval = setInterval(() => {
      if (i < full1.length) {
        setLine1(full1.slice(0, i++) + (i % 7 === 0 ? "_" : ""));
      } else if (j < full2.length) {
        setLine2(full2.slice(0, j++) + (j % 11 === 0 ? "_" : ""));
      } else {
        clearInterval(interval);
        setLine1(full1); setLine2(full2);
      }
    }, 12);
    return () => clearInterval(interval);
  }, []);
  return (
    <section id="about" className="py-24 px-6">
      <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-10 items-center">
        <div className="relative h-72 md:h-96 rounded-xl overflow-hidden glass">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--neon-cyan)/20] to-[var(--neon-pink)/20]" />
          <div className="absolute inset-0 bg-[radial-gradient(transparent,black)] opacity-50" />
          <div className="absolute inset-0 flex items-end p-6 text-white/70 font-mono text-sm">
            silhouette.exe // animated placeholder
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="font-display text-3xl sm:text-4xl glitch-hover">About Me</h2>
          <p className="text-white/80 leading-relaxed transition-colors glitch-hover">{line1}</p>
          <p className="text-white/70 glitch-hover">{line2}</p>
        </div>
      </div>
      <style>{`
        .glitch-hover:hover { text-shadow:0 0 4px #00ff9d,0 0 8px #ff005e; }
      `}</style>
    </section>
  );
}

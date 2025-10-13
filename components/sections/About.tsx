export default function About() {
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
          <h2 className="font-display text-3xl sm:text-4xl">About Me</h2>
          <p className="text-white/80 leading-relaxed">
            I trace signals through silicon dreams — where vulnerabilities whisper and firewalls breathe. My work lives
            at the edge of clarity and chaos, translating entropy into insight, and risk into resilience.
          </p>
          <p className="text-white/70">
            I design secure cloud architectures, hunt threats, and craft systems that glow with intention. The keyboard is a
            keycard; the network, a narrative.
          </p>
        </div>
      </div>
    </section>
  );
}

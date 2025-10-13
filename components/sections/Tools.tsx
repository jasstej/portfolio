export default function Tools() {
  const TOOLS: Array<{ name: string; icon: string; desc: string }> = [
    { name: "React", icon: "/icons/react.svg", desc: "Reactive interfaces — coded for flow." },
    { name: "TypeScript", icon: "/icons/typescript.svg", desc: "Strong typing, stronger intent." },
    { name: "Python", icon: "/icons/python.svg", desc: "Automation. AI. Art." },
    { name: "AWS", icon: "/icons/aws.svg", desc: "Cloud crafted with precision." },
    { name: "Kali Linux", icon: "/icons/kali.svg", desc: "Attack surfaces meet discipline." },
    { name: "Red Hat", icon: "/icons/redhat.svg", desc: "System control through open foundations." },
    { name: "Docker", icon: "/icons/docker.svg", desc: "Isolation. Portability. Sanity." },
    { name: "Terraform", icon: "/icons/terraform.svg", desc: "Infra as code. Chaos as order." },
    { name: "Next.js", icon: "/icons/nextjs.svg", desc: "Frontend built for velocity." },
    { name: "Node.js", icon: "/icons/nodejs.svg", desc: "Where scripts breathe backend life." },
    { name: "Bash", icon: "/icons/bash.svg", desc: "The keyboard is a keycard." },
    { name: "Nmap", icon: "/icons/nmap.svg", desc: "Every scan tells a story." },
    { name: "Burp Suite", icon: "/icons/burpsuite.svg", desc: "The proxy between you and truth." },
    { name: "Wireshark", icon: "/icons/wireshark.svg", desc: "Reading the whispers between packets." },
    { name: "VS Code", icon: "/icons/vscode.svg", desc: "Where late-night code takes shape." },
    { name: "Parrot OS", icon: "/icons/parrot.svg", desc: "My nest for ethical exploits." },
  ];
  return (
    <section id="tools" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-3xl mb-6">Tools I Use</h2>
        <div className="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {TOOLS.map((t) => (
            <div key={t.name} className="relative glass tile p-4 rounded-lg group flex items-center gap-3" title={t.desc}>
              <div className="absolute -inset-0.5 rounded-lg bg-[conic-gradient(from_0deg,transparent,rgba(0,255,157,.3),transparent,rgba(0,180,255,.3))] blur-md opacity-0 group-hover:opacity-100 transition" />
              <img src={t.icon} alt={t.name} className="relative w-7 h-7 opacity-80 group-hover:opacity-100" />
              <div className="relative">
                <div className="font-mono text-cyan-300">{t.name}</div>
                <div className="text-white/60 text-xs">{t.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";
import { useEffect, useState, useMemo } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { ReactTyped } from "react-typed";
import { loadContent } from "@/lib/storage";
import { defaultContent } from "@/lib/content";
import { useSound } from "@/components/sound/SoundProvider";

export default function Projects() {
  const sound = useSound();
  const [active, setActive] = useState<number | null>(null);
  const [projects, setProjects] = useState(defaultContent.projects);
  useEffect(() => {
    const onUpdate = () => setProjects(loadContent().projects);
    setProjects(loadContent().projects);
    window.addEventListener("content:updated", onUpdate as any);
    return () => window.removeEventListener("content:updated", onUpdate as any);
  }, []);
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-3xl mb-6">Projects</h2>
        <style>{`
          @keyframes decryptReveal { 0% { filter: blur(3px) brightness(1.4); letter-spacing:2px; } 60% { filter: blur(1px); } 100% { filter:none; letter-spacing:0; } }
          .decrypting:hover .enc { opacity:0; }
          .decrypting .dec { opacity:0; pointer-events:none; }
          .decrypting:hover .dec { opacity:1; animation: decryptReveal 0.9s steps(20,end) forwards; }
          .cipherNoise { background:linear-gradient(90deg,transparent,rgba(255,255,255,0.06),transparent); background-size:200% 100%; }
        `}</style>
        <div className="grid sm:grid-cols-2 gap-4">
          {projects.map((p, i) => (
            <Dialog key={p.name} open={active === i} onOpenChange={(o) => { setActive(o ? i : null); try { sound.play("reverb"); } catch {} }}>
              <DialogTrigger asChild>
                <Card className="glass decrypting relative tile p-4 cursor-pointer hover:border-[var(--neon-pink)]/40 border border-white/10 overflow-hidden">
                  <div className="font-mono text-cyan-300 enc select-none">
                    $ cat _{p.name.toLowerCase().replace(/[^a-z0-9]/g,'')}*.log
                  </div>
                  <div className="font-mono text-cyan-300 dec absolute inset-0 p-4 flex flex-col justify-start gap-1">
                    <span>$ cat {p.name}.log</span>
                    <span className="text-xs text-green-300/80">{p.desc}</span>
                  </div>
                  <div className="absolute inset-0 opacity-0 hover:opacity-40 transition cipherNoise" />
                </Card>
              </DialogTrigger>
              <DialogContent className="glass">
                <DialogHeader>
                  <DialogTitle className="font-mono">{p.name}.log</DialogTitle>
                </DialogHeader>
                <div className="font-mono text-sm text-green-300 whitespace-pre-wrap">
                  <ReactTyped
                    strings={[
                      p.name.toLowerCase().includes("sentinel")
                        ? `$ cat Sentinel.log\n> Autonomous endpoint telemetry collector\n> Implements anomaly heuristics using behavioral baselines\n> Written in Python + Go\n> Encrypted transport: TLS1.3 + mutual auth\n> Status: ACTIVE [MONITORING 23 ENDPOINTS]`
                        : p.name.toLowerCase().includes("cipherlake")
                        ? `$ cat CipherLake.log\n> Secure data lake infrastructure\n> Implements envelope encryption (AES-256-GCM)\n> IAM boundary isolation with scoped access tokens\n> Built using AWS KMS, S3, and Lambda\n> Status: DEPLOYED [PRODUCTION]`
                        : p.name.toLowerCase().includes("tracenet")
                        ? `$ cat TraceNet.log\n> Distributed packet inspection framework\n> Written in Rust with async runtime\n> Integrates Suricata ruleset + custom heuristics\n> Status: EXPERIMENTAL`
                        : p.name.toLowerCase().includes("firecore")
                        ? `$ cat FireCore.log\n> Cloud firewall orchestration with Terraform & Ansible\n> Supports dynamic policy propagation via GitOps\n> Status: STABLE [v2.1]`
                        : `> description: ${p.desc}\n> stack: ${p.stack.join(", ")}\n> github: ${p.github ?? "-"}\n> demo: ${p.demo ?? "-"}`,
                    ]}
                    typeSpeed={70}
                    showCursor
                    cursorChar="_"
                  />
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
}

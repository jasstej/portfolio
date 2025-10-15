"use client";
import MatrixField from "@/components/background/MatrixField";
import BootScreen from "@/components/boot/BootScreen";
import TerminalOverlay from "@/components/terminal/TerminalOverlay";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Achievements from "@/components/sections/Achievements";
import Blog from "@/components/sections/Blog";
import Contact from "@/components/sections/Contact";
import NeuralTraceTerminal from "@/components/sections/NeuralTraceTerminal";
import DigitalCore from "@/components/sections/DigitalCore";
import OperationLogs from "@/components/sections/OperationLogs";
import CyberManifesto from "@/components/sections/CyberManifesto";
import Logs from "@/components/sections/Logs";
import Signature from "@/components/Signature";
import { useEffect, useState } from "react";
import { loadContent } from "@/lib/storage";
import { defaultContent } from "@/lib/content";

export default function Home() {
  const [booted, setBooted] = useState(false);
  const [links, setLinks] = useState(defaultContent.links);
  useEffect(() => {
    const onUpdate = () => setLinks(loadContent().links);
    setLinks(loadContent().links);
    window.addEventListener("content:updated", onUpdate as EventListener);
    return () => window.removeEventListener("content:updated", onUpdate as EventListener);
  }, []);
  return (
    <main className="relative min-h-screen">
      <MatrixField />
      {!booted && <BootScreen onFinish={() => setBooted(true)} />}
      <div className="relative z-10">
        <div className="fixed top-4 right-4 z-20 glass rounded-full px-4 py-2 text-sm flex gap-3 items-center">
          <a className="hover:text-[color:var(--neon-cyan)]" href={links.github} target="_blank" rel="noreferrer">GitHub</a>
          <span className="text-white/30">|</span>
          <a className="hover:text-[color:var(--neon-cyan)]" href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <span className="text-white/30">|</span>
          <button
            className="btn-neo rounded px-2 py-1"
            onClick={() => {
              const html = document.documentElement;
              const next = html.dataset.cursor === "laser" ? "hat" : "laser";
              html.dataset.cursor = next;
              if (next === "laser") html.style.setProperty("--cursor-color", "#ff3355");
              if (next === "hat") html.style.setProperty("--cursor-color", "#00b4ff");
            }}
            title="Toggle cursor style"
          >
            cursor: <span className="text-cyan-300">{typeof document !== 'undefined' && document.documentElement.dataset.cursor === 'hat' ? 'hat' : 'laser'}</span>
          </button>
        </div>
        <Hero />
  <About />
  <NeuralTraceTerminal />
  <DigitalCore />
        <Skills />
  <Projects />
  <Achievements />
  <CyberManifesto />
  <OperationLogs />
        <Blog />
        <Contact />
      </div>
  <TerminalOverlay />
      <Logs />
      <div className="relative z-10 max-w-6xl mx-auto px-6 pb-24">
        {/* Signature footer block */}
        <Signature />
      </div>
    </main>
  );
}

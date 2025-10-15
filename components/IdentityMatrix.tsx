"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import GlitchText from "@/components/ui/GlitchText";
import { Button } from "@/components/ui/button";
import { useSound } from "@/components/sound/SoundProvider";
import { useNotify } from "@/components/ui/notifications";
import React, { useCallback, useEffect, useRef, useState } from "react";

// Random character set for decrypt effect
const RANDOM_CHARS = "!@#$%^&*()_+{}[]<>?/\u2588\u2592\u2593\u2591ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

interface DecryptLineProps {
  label: string; // left side array is already there  includes any array syntax e.g. principle[core]
  value: string; // raw final value (without surrounding quotes) unless quoted prop is true
  quoted?: boolean;
  animateKey: number; // changes restart animation
  delay?: number; // base delay before this line starts decrypting
  onClick?: () => void; // optional interaction
  className?: string;
  hint?: string; // tooltip text
}

const DecryptLine: React.FC<DecryptLineProps & { glowStrength?: number; tick?: (count: number) => void }> = ({ label, value, quoted, animateKey, delay = 0, onClick, className = "", hint, glowStrength = 1, tick }) => {
  const [display, setDisplay] = useState<string>("");
  const [done, setDone] = useState(false);
  const [lockedCount, setLockedCount] = useState(0);
  const frameRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const finalText = quoted ? `"${value}"` : value;

  useEffect(() => {
    setDisplay("");
    setDone(false);
    startRef.current = null;
  const length = finalText.length;
  setLockedCount(0);
    const perChar = 40; // ms per char reveal pacing baseline
    const scrambleWindow = 220; // how long a given character scrambles before locking

    const step = (ts: number) => {
      if (startRef.current == null) startRef.current = ts;
      const elapsed = ts - startRef.current - delay;
      if (elapsed < 0) {
        frameRef.current = requestAnimationFrame(step);
        return;
      }
      let result = "";
      let allLocked = true;
      let newlyLocked = 0;
      for (let i = 0; i < length; i++) {
        const charRevealStart = i * perChar;
        const local = elapsed - charRevealStart;
        if (local <= 0) {
          // not started
          result += ""; // keep empty for a tighter decrypt pop-in
          allLocked = false;
        } else if (local < scrambleWindow) {
          // scrambling
            const rand = RANDOM_CHARS[Math.floor(Math.random() * RANDOM_CHARS.length)];
            result += rand;
            allLocked = false;
        } else {
          result += finalText[i];
          if (i >= lockedCount) newlyLocked++;
        }
      }
      setDisplay(result);
      if (newlyLocked && tick) tick(newlyLocked);
      if (newlyLocked) setLockedCount(c => c + newlyLocked);
      if (allLocked) {
        setDone(true);
        return;
      }
      frameRef.current = requestAnimationFrame(step);
    };
    frameRef.current = requestAnimationFrame(step);
    return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current); };
  }, [finalText, animateKey, delay]);

  return (
    <div
      onClick={onClick}
      title={hint}
      className={`group font-mono text-sm leading-tight select-none cursor-none relative ${onClick ? 'hover:text-neon-cyan' : ''} ${className}`}
    >
      <span className="text-cyan-300">{label}</span>
      <span className="text-cyan-600"> = </span>
      <span className={`text-white/90 ${!done ? 'opacity-80' : 'opacity-100'} transition-opacity duration-300 ${done ? 'after:content-[""] after:absolute after:inset-0 after:animate-[pulseGlow_1.6s_ease-out_1] after:rounded-sm' : ''}`}>{display}</span>
      {!done && <span className="ml-1 animate-pulse text-[10px] text-neon-cyan/70">_</span>}
      {done && <span className="ml-1 text-[10px] text-neon-cyan/40 animate-[cursorBlink_2.8s_steps(2,start)_infinite]">_</span>}
      <style>{`
        @keyframes pulseGlow { 0% { box-shadow: 0 0 0px rgba(0,255,157,0.0);} 40% { box-shadow: 0 0 ${4*glowStrength}px rgba(0,255,157,0.45);} 100% { box-shadow: 0 0 0px rgba(0,255,157,0);} }
        @keyframes cursorBlink { 0%,50% { opacity:1 } 50.01%,100% { opacity:.15 } }
      `}</style>
    </div>
  );
};

// Expanded manifesto & system metadata
const manifesto = {
  identity: "JasstejSinghMarwaha",
  status: "ACTIVE",
  principle: {
    core: "Entropy is a cipher — I decrypt the invisible.",
    edge: "Chaos whispers; clarity listens.",
  },
  credo: "I trace signals, chase vulnerabilities, and translate chaos into clarity.",
  signature: "JasstejTrace.exe",
  last_commit: "local dev",
  mode: "OPERATIONAL",
  scan: "self = complete",
  integrity_check: "PASSED",
  network_presence: "ACTIVE",
};

// A compact button + dialog with dynamic decrypt + principle modes.
export default function IdentityMatrix() {
  const sound = useSound();
  const [open, setOpen] = useState(false);
  const [animSeed, setAnimSeed] = useState(0);
  const [principleMode, setPrincipleMode] = useState<'core' | 'edge'>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('manifesto:principleMode');
      if (stored === 'core' || stored === 'edge') return stored;
    }
    return 'core';
  });
  const notify = useNotify();
  const tickCooldownRef = useRef(0);
  const [showRaw, setShowRaw] = useState(false);

  const handleTicks = useCallback((count: number) => {
    // throttle key sound to avoid audio spam: allow at most every 40ms
    const now = performance.now();
    if (now - tickCooldownRef.current > 40) {
      try { sound.play('key'); } catch {}
      tickCooldownRef.current = now;
    }
  }, [sound]);

  const togglePrinciple = useCallback(() => {
    setPrincipleMode(m => m === 'core' ? 'edge' : 'core');
    try { sound.play('glitch'); } catch {}
    // re-trigger decrypt for that single line by bumping seed (cheap global re-run ok)
    setAnimSeed(s => s + 1);
    try { localStorage.setItem('manifesto:principleMode', principleMode === 'core' ? 'edge' : 'core'); } catch {}
  }, [sound]);

  const handleOpen = (o: boolean) => {
    setOpen(o);
    if (o) {
      setAnimSeed(s => s + 1);
      // restore persisted mode (already loaded in initial state)
      try { sound.play('glitch'); } catch {}
    }
  };

  const copyManifesto = useCallback((full?: boolean) => {
    const exportObj = full ? {
      identity: manifesto.identity,
      status: manifesto.status,
      principle: manifesto.principle, // include both variants
      credo: manifesto.credo,
      signature: manifesto.signature,
      last_commit: manifesto.last_commit,
      mode: manifesto.mode,
      scan: manifesto.scan,
      integrity_check: manifesto.integrity_check,
      network_presence: manifesto.network_presence,
    } : {
      identity: manifesto.identity,
      status: manifesto.status,
      principle: manifesto.principle[principleMode],
      credo: manifesto.credo,
      signature: manifesto.signature,
      last_commit: manifesto.last_commit,
      mode: manifesto.mode,
      scan: manifesto.scan,
      integrity_check: manifesto.integrity_check,
      network_presence: manifesto.network_presence,
    };
    try {
      navigator.clipboard.writeText(JSON.stringify(exportObj, null, 2));
      notify.push({ message: full ? 'full manifesto copied → clipboard' : 'active manifesto slice copied → clipboard', tone: 'success' });
      try { sound.play('glitch'); } catch {}
    } catch {
      notify.push({ message: 'copy failed', tone: 'error' });
    }
  }, [principleMode, notify, sound]);

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" size="sm">Manifesto</Button>
      </DialogTrigger>
      <DialogContent className="glass max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-mono text-neon-cyan flex items-center gap-2">
            <GlitchText text="CYBER MANIFESTO" />
            <span className="text-[10px] px-1.5 py-0.5 border border-cyan-500/40 rounded bg-cyan-500/5 tracking-widest">v1</span>
            <div className="ml-auto flex items-center gap-2">
              <button
                onClick={() => setShowRaw(r => !r)}
                className={`text-[10px] font-mono px-2 py-1 border rounded transition-colors btn-neo ${showRaw ? 'border-pink-400/50 text-pink-300' : 'border-cyan-400/40 text-cyan-200'}`}
                title="Toggle RAW JSON view"
              >{showRaw ? 'VIEW' : 'RAW'}</button>
              <button
                onClick={() => copyManifesto(showRaw)}
                className="text-[10px] font-mono px-2 py-1 border border-cyan-400/40 rounded hover:bg-cyan-500/10 transition-colors btn-neo"
                title={showRaw ? 'Copy full manifesto object' : 'Copy active principle slice'}
              >COPY</button>
            </div>
          </DialogTitle>
        </DialogHeader>
        {!showRaw && (
        <div className="mt-2 space-y-1.5">
          <DecryptLine animateKey={animSeed} label="> identity" value={manifesto.identity} delay={0} glowStrength={3} tick={handleTicks} />
          <DecryptLine animateKey={animSeed} label="> status" value={manifesto.status} delay={60} glowStrength={2.5} tick={handleTicks} />
          <DecryptLine
            animateKey={animSeed}
            label={`> principle[${principleMode}]`}
            value={manifesto.principle[principleMode]}
            quoted
            delay={120}
            onClick={togglePrinciple}
            hint="Click to toggle core/edge variant"
            className="cursor-pointer"
            glowStrength={2}
            tick={handleTicks}
          />
          <DecryptLine animateKey={animSeed} label="> credo" value={manifesto.credo} quoted delay={180} glowStrength={1.8} tick={handleTicks} />
          <DecryptLine animateKey={animSeed} label="> signature" value={manifesto.signature} delay={240} glowStrength={1.6} tick={handleTicks} />
          <DecryptLine animateKey={animSeed} label="> last_commit" value={manifesto.last_commit} delay={300} glowStrength={1.4} tick={handleTicks} />
          <DecryptLine animateKey={animSeed} label="> mode" value={manifesto.mode} delay={360} glowStrength={1.3} tick={handleTicks} />
          <div className="pt-2" />
          <DecryptLine animateKey={animSeed} label="> scan" value={manifesto.scan} delay={420} glowStrength={1.2} tick={handleTicks} />
          <DecryptLine animateKey={animSeed} label="> integrity_check" value={manifesto.integrity_check} delay={480} glowStrength={1} tick={handleTicks} />
          <DecryptLine animateKey={animSeed} label="> network_presence" value={manifesto.network_presence} delay={540} glowStrength={1} tick={handleTicks} />
        </div>
        )}
        {showRaw && (
          <div className="mt-3">
            <pre className="font-mono text-[11px] leading-snug p-3 rounded bg-black/60 border border-white/10 max-h-[55vh] overflow-auto shadow-inner">
{`{
  "identity": "${manifesto.identity}",
  "status": "${manifesto.status}",
  "principle": {
    "core": "${manifesto.principle.core}",
    "edge": "${manifesto.principle.edge}"
  },
  "credo": "${manifesto.credo}",
  "signature": "${manifesto.signature}",
  "last_commit": "${manifesto.last_commit}",
  "mode": "${manifesto.mode}",
  "scan": "${manifesto.scan}",
  "integrity_check": "${manifesto.integrity_check}",
  "network_presence": "${manifesto.network_presence}"
}`}
            </pre>
            <div className="mt-2 text-[10px] text-white/40">RAW view (both principle variants included)</div>
          </div>
        )}
        {!showRaw && (
          <div className="mt-4 text-[10px] font-mono text-white/40 flex items-center justify-between">
            <span>click principle line to switch core/edge</span>
            <span className="opacity-70">decrypt-seed:{animSeed}</span>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

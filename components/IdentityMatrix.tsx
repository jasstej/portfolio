"use client";
import { useEffect, useMemo, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import GlitchText from "@/components/ui/GlitchText";
import { Howl } from "howler";
import { Button } from "@/components/ui/button";

export default function IdentityMatrix() {
  const [enabled, setEnabled] = useState(false);
  const hum = useMemo(() => new Howl({ src: ["/audio/boot_hum.mp3"], loop: true, volume: 0.15, preload: false }), []);
  useEffect(() => {
    if (enabled) hum.play(); else hum.pause();
    return () => { try { hum.unload(); } catch { /* ignore */ } };
  }, [enabled, hum]);

  return (
    <div className="fixed bottom-4 left-4 z-30 flex gap-3">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="secondary">Identity Matrix</Button>
        </DialogTrigger>
        <DialogContent className="glass">
          <DialogHeader>
            <DialogTitle className="font-mono text-cyan-300">IDENTITY HASH: jasstej.trace.01</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <GlitchText text="> ROLE: Cybersecurity Researcher" />
            <GlitchText text="> ALIGNMENT: Ethical Chaos" />
            <GlitchText text="> STATUS: Active" />
            <div className="text-white/80">SIGNATURE: “Entropy is just order we haven’t learned to read yet.”</div>
          </div>
        </DialogContent>
      </Dialog>
      <Button onClick={() => setEnabled((v) => !v)}>{enabled ? "Sound: On" : "Sound: Off"}</Button>
    </div>
  );
}

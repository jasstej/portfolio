"use client";
import { useState } from "react";
import { useSound } from "@/components/sound/SoundProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Contact() {
  const sound = useSound();
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-display text-3xl mb-6">Access Request</h2>
        <div className="glass p-6 rounded-lg space-y-3">
          {!sent ? (
            <form
              onSubmit={(e) => { e.preventDefault(); setSent(true); try { sound.play("access"); } catch {} }}
              className="space-y-3"
            >
              <Input placeholder="Name" required className="focus-visible:ring-[var(--neon-cyan)]" />
              <Input type="email" placeholder="Email" required className="focus-visible:ring-[var(--neon-cyan)]" />
              <Textarea placeholder="Message" required className="focus-visible:ring-[var(--neon-cyan)]" />
              <Button type="submit" className="w-full">Establish Connection</Button>
            </form>
          ) : (
            <div className="font-mono text-green-300">Connection Established with JasstejTrace.exe</div>
          )}
        </div>
      </div>
    </section>
  );
}

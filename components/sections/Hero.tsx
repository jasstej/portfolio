"use client";
import { motion } from "framer-motion";
import GlitchText from "@/components/ui/GlitchText";
import { ReactTyped } from "react-typed";

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-[88vh] flex items-center justify-center text-center px-6">
      <div className="max-w-4xl space-y-6">
        <div className="font-mono text-green-300 text-sm sm:text-base">
          <ReactTyped
            strings={[
              "> booting JasstejTrace.exe...",
              "> verifying digital identity...",
              "> connecting to neural interface...",
              "> access granted_",
            ]}
            typeSpeed={70}
            backSpeed={0}
            backDelay={500}
            showCursor
            cursorChar="_"
          />
        </div>
        <GlitchText text="JasstejTrace.exe" className="font-display text-5xl sm:text-7xl font-black neon" />
        <motion.p className="text-lg sm:text-2xl text-white/80">
          Cybersecurity Researcher | Cloud Architect | Digital Poet
        </motion.p>
        <motion.div className="text-white/50 font-mono text-sm">Use Ctrl+K to open terminal navigation.</motion.div>
      </div>
    </section>
  );
}

"use client";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ReactTyped } from "react-typed";

export default function BootScreen({ onFinish }: { onFinish: () => void }) {
  const steps = [
    "> booting JasstejTrace.exe...",
    "> verifying digital identity...",
    "> connecting to neural interface...",
    "> access granted_",
    "Cybersecurity Researcher | Cloud Architect | Digital Poet",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [complete, setComplete] = useState(false);
  const [visible, setVisible] = useState(true);
  const doneRef = useRef(false);
  const [flash, setFlash] = useState(false);

  const handleStringTyped = (arrayPos: number) => {
    setCurrentIndex(arrayPos + 1);
    const justTyped = steps[arrayPos];
    if (justTyped && justTyped.toLowerCase().includes("access granted")) {
      setFlash(true);
      setTimeout(() => setFlash(false), 650);
    }
  };
  const handleComplete = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    setComplete(true);
    setTimeout(() => {
      setVisible(false);
      onFinish();
    }, 500); // faster fade out
  };

  // Allow user to skip with ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !doneRef.current) handleComplete();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="w-full max-w-2xl p-6 font-mono text-left text-green-300">
            <div className="glass p-6 rounded-lg border border-[color:var(--glass-border)] relative overflow-hidden">
              {flash && (
                <div className="pointer-events-none absolute inset-0 animate-accessFlash mix-blend-screen">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,157,0.65),rgba(0,180,255,0.25)_40%,transparent_70%)]" />
                  <div className="absolute inset-0 backdrop-blur-[2px]" />
                </div>
              )}
              <ReactTyped
                strings={steps}
                typeSpeed={35} // faster typing
                backSpeed={0}
                showCursor
                cursorChar="_"
                onStringTyped={handleStringTyped}
                onComplete={handleComplete}
              />
              <div className="mt-6">
                <div className="h-1 w-full bg-white/10 rounded">
                  <div
                    className="h-full bg-[var(--neon-cyan)] rounded transition-all"
                    style={{ width: `${(currentIndex / steps.length) * 100}%` }}
                  />
                </div>
                <div className="mt-2 text-xs text-cyan-300/80 flex justify-between items-center">
                  <span>phase {Math.min(currentIndex + 1, steps.length)}/{steps.length}</span>
                  <span className="text-white/40">{complete ? "complete" : "initializing"}</span>
                </div>
              </div>
              <div className="absolute bottom-2 right-3 text-[10px] text-white/30">ESC to skip</div>
              <style>{`
                @keyframes accessFlashKey { 0% { opacity:0; transform:scale(0.95); } 15% { opacity:1; transform:scale(1); } 60% { opacity:.25; } 100% { opacity:0; transform:scale(1.1); } }
                .animate-accessFlash { animation: accessFlashKey .7s ease-out forwards; }
              `}</style>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

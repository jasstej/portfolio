"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ReactTyped } from "react-typed";

export default function BootScreen({ onFinish }: { onFinish: () => void }) {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 4200);
    const t2 = setTimeout(() => onFinish(), 4800);
    return () => { clearTimeout(t); clearTimeout(t2); };
  }, [onFinish]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-full max-w-2xl p-6 font-mono text-left text-green-300">
            <div className="glass p-6 rounded-lg border border-[color:var(--glass-border)]">
              <ReactTyped
                strings={[
                  "> booting JasstejTrace.exe...",
                  "> verifying digital identity...",
                  "> connecting to neural interface...",
                  "> access granted_",
                  "Cybersecurity Researcher | Cloud Architect | Digital Poet",
                ]}
                typeSpeed={70}
                backSpeed={0}
                smartBackspace
                showCursor
                cursorChar="_"
              />
              <div className="mt-4 text-sm text-cyan-300/90">
                <span className="opacity-70">status</span>: boot sequence complete
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

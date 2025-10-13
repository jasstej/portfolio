"use client";
import { useEffect, useRef, useState } from "react";
import { useSound } from "@/components/sound/SoundProvider";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

type Entry = { text: string; kind?: "in" | "out" };

export default function TerminalOverlay() {
  const sound = useSound();
  const [open, setOpen] = useState(false);
  const [entries, setEntries] = useState<Entry[]>([
    { text: "root@jasstejtrace:~$ type 'help'", kind: "out" },
  ]);
  const [cmd, setCmd] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => { const n = !v; try { sound.play("glitch"); } catch {}; return n; });
        setTimeout(() => inputRef.current?.focus(), 50);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const run = (value: string) => {
    const v = value.trim().toLowerCase();
    const push = (t: string, kind: Entry["kind"]) => setEntries((e) => [...e, { text: t, kind }]);
    push(`root@jasstejtrace:~$ ${value}`, "in");
    switch (v) {
      case "help":
        push("Commands: about, skills, projects, achievements, blog, contact, trace, darkfiles, theme", "out");
        break;
      case "about":
      case "skills":
      case "projects":
      case "achievements":
      case "blog":
      case "contact":
        scrollToId(v);
        push(`navigated -> #${v}`, "out");
        break;
      case "trace":
        router.push("/trace");
        push("opening hidden /trace ...", "out");
        break;
      case "darkfiles":
      case "open trace":
        router.push("/darkfiles");
        push("opening /darkfiles ...", "out");
        break;
      case "theme":
        document.documentElement.classList.toggle("dark");
        push("toggled theme", "out");
        break;
      case "theme --set neon":
        applyTheme("neon"); push("theme set: neon", "out"); break;
      case "theme --set matrix":
        applyTheme("matrix"); push("theme set: matrix", "out"); break;
      case "theme --set cyberwave":
        applyTheme("cyberwave"); push("theme set: cyberwave", "out"); break;
      default:
        push(`command not found: ${value}`, "out");
    }
  };

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  function applyTheme(name: string) {
    const root = document.documentElement;
    switch (name) {
      case "neon":
        root.style.setProperty("--primary", "#00ff9d");
        root.style.setProperty("--neon-cyan", "#00b4ff");
        root.style.setProperty("--neon-pink", "#ff005e");
        break;
      case "matrix":
        root.style.setProperty("--primary", "#39ff14");
        root.style.setProperty("--neon-cyan", "#14ffff");
        root.style.setProperty("--neon-pink", "#00ff7f");
        break;
      case "cyberwave":
        root.style.setProperty("--primary", "#7df9ff");
        root.style.setProperty("--neon-cyan", "#7a5cff");
        root.style.setProperty("--neon-pink", "#ff2e97");
        break;
    }
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-40 bg-black/60" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed left-1/2 top-20 z-50 w-[92vw] max-w-3xl -translate-x-1/2"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
          >
            <div className="glass rounded-lg p-4 font-mono">
              <div className="max-h-[50vh] overflow-auto space-y-1 text-sm">
                {entries.map((e, i) => (
                  <div key={i} className={e.kind === "in" ? "text-cyan-300" : "text-green-300"}>{e.text}</div>
                ))}
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-cyan-400">root@jasstejtrace:~$</span>
                <input
                  ref={inputRef}
                  value={cmd}
                  onChange={(e) => { setCmd(e.target.value); try { sound.play("key"); } catch {} }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      run(cmd);
                      setCmd("");
                    }
                  }}
                  className="flex-1 bg-transparent outline-none text-green-300 placeholder:text-green-300/40"
                  placeholder="type a command... (Ctrl+K to close)"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tiny hint */}
      <div className="fixed bottom-3 right-3 z-30 text-[11px] text-white/40 font-mono">Press Ctrl+K for terminal</div>
    </>
  );
}

"use client";
import { useEffect, useRef, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useSound } from "@/components/sound/SoundProvider";

type Entry = { text: string; kind?: "in" | "out" };

const BOOT_SCRIPT = [
  "> Initializing JasstejTrace.exe ...",
  "> Loading cognitive modules ...",
  "> Network trace found: entropy → insight",
  "> Running live scan: creativity.exe",
  "> Result: 0 vulnerabilities, 100% originality",
];

export default function NeuralTraceTerminal() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [cmd, setCmd] = useState("");
  const [booted, setBooted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const sound = useSound();

  // Boot sequence typing
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setEntries((e) => [...e, { text: BOOT_SCRIPT[i++], kind: "out" }]);
      if (i >= BOOT_SCRIPT.length) {
        clearInterval(timer);
        setBooted(true);
        setTimeout(() => {
          if (inputRef.current) {
            const sx = window.scrollX, sy = window.scrollY;
            try {
              // @ts-ignore allow newer focus option
              inputRef.current.focus({ preventScroll: true });
            } catch {
              inputRef.current.focus();
            }
            // restore scroll in case browser ignored preventScroll
            window.scrollTo(sx, sy);
          }
        }, 200);
      }
    }, 650);
    return () => clearInterval(timer);
  }, []);

  // Idle background logs
  useEffect(() => {
    if (!booted) return;
    const t = setInterval(() => {
      const pad = (n: number) => n.toString(16).padStart(2, "0");
      const hex = Array.from({ length: 8 }, () => pad(Math.floor(Math.random() * 256))).join("");
      setEntries((e) => [...e.slice(-40), { text: `heartbeat::${hex}`, kind: "out" }]);
    }, 3000);
    return () => clearInterval(t);
  }, [booted]);

  const run = (value: string) => {
    const v = value.trim().toLowerCase();
    const push = (t: string, kind: Entry["kind"]) => setEntries((e) => [...e, { text: t, kind }]);
    push(`$ ${value}`, "in");
    switch (v) {
      case "help":
        push("Commands: about, skills, projects, achievements, blog, contact, manifesto, desk", "out");
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
      case "manifesto":
        scrollToId("manifesto"); push("navigated -> #manifesto", "out"); break;
      case "desk":
        // placeholder route if added later
        router.push("/trace"); push("opening /trace ...", "out"); break;
      default:
        push(`command not found: ${value}`, "out");
    }
  };

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="glass rounded-xl p-4 font-mono text-sm border border-white/10 bg-black/50">
          <div className="text-white/70 mb-2">Neural Trace Terminal</div>
          <div className="space-y-1 max-h-[40vh] overflow-auto pr-1">
            {entries.map((e, i) => (
              <div key={i} className={e.kind === "in" ? "text-cyan-300" : "text-green-300"}>{e.text}</div>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-2">
            <span className="text-cyan-400">$</span>
            <input
              ref={inputRef}
              value={cmd}
              onChange={(ev) => { setCmd(ev.target.value); try { sound.play("key"); } catch {} }}
              onKeyDown={(e) => { if (e.key === "Enter") { run(cmd); setCmd(""); } }}
              className="flex-1 bg-transparent outline-none text-green-300 placeholder:text-green-300/40"
              placeholder="type 'help' — this console navigates the site"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

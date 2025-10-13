"use client";
import { useEffect, useState } from "react";

const items = ["about", "skills", "projects", "achievements", "blog", "contact"];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`fixed top-0 left-0 right-0 z-30 transition ${scrolled ? "backdrop-blur bg-black/30 border-b border-white/10" : "bg-transparent"}`}>
      <nav className="mx-auto max-w-6xl flex items-center justify-between px-4 py-3">
        <a href="#hero" className="font-display text-xl neon">JT</a>
        <div className="hidden md:flex gap-5 text-white/80">
          {items.map((i) => (
            <a key={i} href={`#${i}`} className="hover:text-[color:var(--neon-cyan)]">{i}</a>
          ))}
        </div>
        <div className="text-xs font-mono text-white/50">Ctrl+K: terminal</div>
      </nav>
    </header>
  );
}

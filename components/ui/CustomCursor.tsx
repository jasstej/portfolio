"use client";
import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const tailRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const tail = useRef({ x: 0, y: 0 });
  const [interactive, setInteractive] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<"laser" | "hat">("laser");

  useEffect(() => {
    // Initialize on client
    if (typeof window === "undefined" || typeof document === "undefined") return;
    pos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    tail.current = { ...pos.current };
    // initial mode/enabled
    const html = document.documentElement as HTMLElement & { dataset: DOMStringMap & { cursor?: string } };
    const currentMode = (html.dataset.cursor as any) || "laser";
    setMode(currentMode === "hat" ? "hat" : "laser");
    setEnabled(!!currentMode);
    // watch for attribute changes
    const obs = new MutationObserver(() => {
      const m = (html.dataset.cursor as any) || "laser";
      setMode(m === "hat" ? "hat" : "laser");
      setEnabled(!!m);
    });
    obs.observe(html, { attributes: true, attributeFilter: ["data-cursor"] });

    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;
    const onMove = (e: MouseEvent) => {
      pos.current.x = e.clientX; pos.current.y = e.clientY;
      // We no longer change the cursor on hover; elements themselves animate.
    };
    const onDown = () => dotRef.current?.classList.add("active");
    const onUp = () => dotRef.current?.classList.remove("active");
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    let raf = 0;
    const loop = () => {
      // simple lerp for trailing
      tail.current.x += (pos.current.x - tail.current.x) * 0.18;
      tail.current.y += (pos.current.y - tail.current.y) * 0.18;
      if (dotRef.current) dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      if (tailRef.current) tailRef.current.style.transform = `translate(${tail.current.x}px, ${tail.current.y}px)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={tailRef}
        className="fixed left-0 top-0 z-[60] pointer-events-none"
        style={{ willChange: "transform" }}
      >
        <div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ width: 18, height: 18, background: "radial-gradient(circle, rgba(255,70,100,.35) 0%, rgba(255,70,100,.15) 55%, rgba(255,70,100,0) 70%)", filter: "blur(2px)" }}
        />
      </div>
      <div
        ref={dotRef}
        className={`fixed left-0 top-0 z-[61] pointer-events-none -translate-x-1/2 -translate-y-1/2`}
        style={{ width: 0, height: 0 }}
      >
        <div
          className="-translate-x-1/2 -translate-y-1/2"
          style={{ width: 8, height: 8, borderRadius: 9999, background: "var(--cursor-color, #ff3355)", boxShadow: "0 0 10px rgba(255,70,100,.8), 0 0 22px rgba(255,70,100,.4)" }}
        />
        {mode === "hat" && (
          <div
            className="-translate-x-1/2 -translate-y-full"
            style={{ width: 0, height: 0, borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderBottom: "7px solid var(--cursor-color, #00b4ff)" }}
          />
        )}
      </div>
    </>
  );
}

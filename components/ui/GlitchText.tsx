"use client";
import { motion } from "framer-motion";
import React from "react";

export default function GlitchText({ text, className = "" }: { text: string; className?: string }) {
  return (
    <motion.div
      className={`relative select-none ${className}`}
      initial={{ filter: "none" }}
      whileHover={{ filter: "url(#glitch)" }}
    >
      <span className="relative z-10" aria-hidden>{text}</span>
      <span className="absolute inset-0 pointer-events-none mix-blend-screen text-[#00ff9d] translate-x-[1px] translate-y-[-1px] opacity-60">{text}</span>
      <span className="absolute inset-0 pointer-events-none mix-blend-screen text-[#ff005e] -translate-x-[1px] translate-y-[1px] opacity-60">{text}</span>
      {/* SVG filter def once per page would be ideal; keeping inline for simplicity */}
      <svg className="absolute w-0 h-0">
        <filter id="glitch">
          <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="1" result="noise"/>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2"/>
        </filter>
      </svg>
    </motion.div>
  );
}

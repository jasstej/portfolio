"use client";
// Hydration-safe Signature: use static env snapshot; avoid Date() in render.
export default function Signature() {
  // In dev, NEXT_PUBLIC_LAST_COMMIT_DATE may not be defined (prebuild runs only for production build).
  // Use a stable placeholder instead of Date() to avoid hydration mismatches.
  const commitDate = process.env.NEXT_PUBLIC_LAST_COMMIT_DATE ?? "local dev";
  const hash = "8f4e2b9a...c7135d"; // static sample per request
  const binary = "01001010 01100001 01110011 01110011 01110100 01100101 01101010";
  return (
    <div className="mt-8 font-mono text-xs text-white/60">
      <div>&gt; system.hash: {hash}</div>
      <div>&gt; signed by JasstejTrace.exe</div>
      <div>&gt; last commit: {commitDate}</div>
      <div className="text-white/50 mt-1">{binary}</div>
    </div>
  );
}

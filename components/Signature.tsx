"use client";
// Client-safe Signature: uses NEXT_PUBLIC env if available, else Date().
export default function Signature() {
  // We can't execute git here at runtime; fall back to env or date.
  const commitDate = process.env.NEXT_PUBLIC_LAST_COMMIT_DATE || new Date().toUTCString();
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

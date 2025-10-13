import type { Metadata } from "next";

export const metadata: Metadata = { title: "Dark Files — JasstejTrace.exe" };

export default function DarkFiles() {
  return (
    <main className="min-h-screen p-6 max-w-6xl mx-auto">
      <h1 className="font-display text-3xl mb-4">Dark Files</h1>
      <p className="text-white/70 mb-6">Experimental tools, CTF artifacts, research logs, and code-poems.</p>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="glass p-4 rounded-lg">
          <div className="font-mono text-cyan-300 mb-2">$ tools</div>
          <ul className="text-white/80 list-disc pl-5 space-y-1">
            <li>Burp macros and intruder payloads</li>
            <li>Wireshark filters collection</li>
            <li>IAM boundary policies</li>
          </ul>
        </div>
        <div className="glass p-4 rounded-lg">
          <div className="font-mono text-cyan-300 mb-2">$ code-poems</div>
          <pre className="text-sm text-white/80 whitespace-pre-wrap">{`// entropy speaks in minor keys\nfor (let bit of dream) {\n  if (bit === 'fear') bit = 'fire';\n}`}</pre>
        </div>
      </div>
    </main>
  );
}

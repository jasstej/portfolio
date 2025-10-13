export default function Blog() {
  const entries = [
    { slug: "cyber_thoughts", title: "cyber_thoughts.log", excerpt: "on threat surfaces and soft places" },
    { slug: "cloud_poetry", title: "cloud_poetry.log", excerpt: "architectures that breathe" },
  ];
  return (
    <section id="blog" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-3xl mb-6">Logs</h2>
        <div className="space-y-3 font-mono text-cyan-300">
          <div>root@jasstejtrace:~$ cat cyber_thoughts.log</div>
          <ul className="space-y-2 text-white/80">
            {entries.map((e) => (
              <li key={e.slug} className="glass p-3 rounded hover:text-cyan-300">
                <a href={`/blog/${e.slug}`}>{e.title} — {e.excerpt}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

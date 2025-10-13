import { notFound } from "next/navigation";

const POSTS: Record<string, { title: string; content: string }> = {
  "signals-in-the-noise": {
    title: "Signals in the Noise",
    content:
      "I listen for the quiet anomalies — the soft footprints between packets; sometimes, silence is the loudest alert.",
  },
  "threats-that-breathe": {
    title: "Threats that Breathe",
    content:
      "Every system inhales and exhales data. Understand the rhythm, and you can hear when something forgets to breathe.",
  },
};

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = POSTS[slug];
  if (!post) return notFound();
  return (
    <main className="min-h-screen p-6">
      <h1 className="font-display text-3xl mb-2">{post.title}</h1>
      <article className="prose prose-invert max-w-3xl text-white/85">{post.content}</article>
    </main>
  );
}

"use client";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { defaultContent } from "@/lib/content";
import { loadContent } from "@/lib/storage";

const ForceGraph3D = dynamic(() => import("react-force-graph-3d"), { ssr: false });

type Node = { id: string; name: string; group: string; color: string; val?: number };
type Link = { source: string; target: string };

export default function NetworkMap() {
  const [content, setContent] = useState(defaultContent);
  useEffect(() => {
    const onUpdate = () => setContent(loadContent());
    setContent(loadContent());
    window.addEventListener("content:updated", onUpdate as any);
    return () => window.removeEventListener("content:updated", onUpdate as any);
  }, []);

  const data = useMemo(() => {
    const nodes: Node[] = [];
    const links: Link[] = [];
    // Projects as nodes
    for (const p of content.projects) {
      nodes.push({ id: `p:${p.id}`, name: `${p.name}.log`, group: "project", color: p.name.toLowerCase().includes("sentinel") ? "#ff3366" : "#00b4ff", val: 2 });
    }
    // Achievements as nodes
    for (const a of content.achievements) {
      nodes.push({ id: `a:${a.id}`, name: a.title, group: "cert", color: a.title.toLowerCase().includes("aws") ? "#ffd166" : "#bdb2ff", val: 1.6 });
    }
    // Simple connect each node to a hub
    nodes.push({ id: "hub", name: "JasstejTrace.exe", group: "hub", color: "#00ff9d", val: 3 });
    for (const n of nodes) {
      if (n.id !== "hub") links.push({ source: n.id, target: "hub" });
    }
    return { nodes, links };
  }, [content]);

  return (
    <section id="network" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-3xl mb-3">Network Map</h2>
        <p className="text-white/70 mb-4 font-mono">Mapping the nodes of my digital domain.</p>
      </div>
      <div className="h-[520px] rounded-xl overflow-hidden border border-white/10 mx-auto max-w-6xl">
        <ForceGraph3D
          graphData={data as any}
          width={undefined as any}
          height={undefined as any}
          nodeAutoColorBy={"group"}
          nodeRelSize={6}
          backgroundColor="#0a0a0a"
          nodeThreeObjectExtend={true}
          nodeThreeObject={(node: any) => {
            function createTextSprite(text: string, color = "#cdeaff") {
              const canvas = document.createElement("canvas");
              const ctx = canvas.getContext("2d")!;
              const fontSize = 52;
              ctx.font = `${fontSize}px monospace`;
              const padding = 24;
              const textWidth = ctx.measureText(text).width;
              canvas.width = textWidth + padding * 2;
              canvas.height = fontSize + padding * 2;
              // redraw with correct size
              const ctx2 = canvas.getContext("2d")!;
              ctx2.font = `${fontSize}px monospace`;
              ctx2.fillStyle = "rgba(0,0,0,0)";
              ctx2.fillRect(0, 0, canvas.width, canvas.height);
              ctx2.fillStyle = color;
              ctx2.shadowColor = color;
              ctx2.shadowBlur = 16;
              ctx2.fillText(text, padding, fontSize + (padding/3));
              const texture = new THREE.CanvasTexture(canvas);
              texture.minFilter = THREE.LinearFilter;
              const material = new THREE.SpriteMaterial({ map: texture, transparent: true });
              const sprite = new THREE.Sprite(material);
              const scale = Math.min(12, Math.max(6, text.length * 0.6));
              sprite.scale.set(scale * 2.2, scale * 0.8, 1);
              return sprite;
            }
            const name: string = node.name?.toLowerCase?.() || "";
            // Sentinel: pulsing red sphere with orbiting satellites
            if (name.includes("sentinel")) {
              const group = new THREE.Group();
              const material = new THREE.MeshStandardMaterial({ color: "#ff3366", emissive: "#550011", emissiveIntensity: 1 });
              const core = new THREE.Mesh(new THREE.SphereGeometry(1.4, 20, 20), material);
              group.add(core);
              // glow halo for bloom-like effect
              const glow = new THREE.Mesh(new THREE.SphereGeometry(1.9, 20, 20), new THREE.MeshBasicMaterial({ color: "#ff3366", transparent: true, opacity: 0.22, blending: THREE.AdditiveBlending }));
              group.add(glow);
              // small satellites
              const sat1 = new THREE.Mesh(new THREE.SphereGeometry(0.25, 12, 12), new THREE.MeshBasicMaterial({ color: "#ff6688" }));
              const sat2 = new THREE.Mesh(new THREE.SphereGeometry(0.2, 12, 12), new THREE.MeshBasicMaterial({ color: "#ffaa99" }));
              sat1.position.x = 3; sat2.position.x = -2.5; sat2.position.y = 1.2;
              group.add(sat1); group.add(sat2);
              const t0 = performance.now();
              group.onBeforeRender = () => {
                const t = (performance.now() - t0) / 1000;
                const pulse = 1 + Math.sin(t * 2) * 0.08;
                core.scale.set(pulse, pulse, pulse);
                group.rotation.y += 0.01;
                const r = 3;
                sat1.position.set(Math.cos(t)*r, 0.6*Math.sin(t*1.2), Math.sin(t)*r);
                sat2.position.set(Math.cos(-t*0.8)*2.5, Math.sin(t*0.9)*1.2, Math.sin(-t*0.8)*2.5);
              };
              const label = createTextSprite(node.name || "Sentinel", "#ff99aa");
              label.position.y = 2.6; group.add(label);
              return group;
            }
            // CipherLake: transparent blue cylinder with counter-rotating rings
            if (name.includes("cipherlake")) {
              const group = new THREE.Group();
              const cyl = new THREE.Mesh(
                new THREE.CylinderGeometry(1.2, 1.2, 3.2, 24, 1, true),
                new THREE.MeshStandardMaterial({ color: "#00b4ff", transparent: true, opacity: 0.25, roughness: 0.2, metalness: 0.6 })
              );
              group.add(cyl);
              const ringMat = new THREE.MeshStandardMaterial({ color: "#00e0ff", emissive: "#004466", emissiveIntensity: 1 });
              const ring1 = new THREE.Mesh(new THREE.TorusGeometry(2.2, 0.06, 10, 64), ringMat);
              const ring2 = new THREE.Mesh(new THREE.TorusGeometry(1.6, 0.06, 10, 64), ringMat.clone());
              ring1.position.y = 1; ring2.position.y = -1;
              group.add(ring1); group.add(ring2);
              // subtle additive halo
              const halo = new THREE.Mesh(new THREE.TorusGeometry(2.6, 0.09, 10, 64), new THREE.MeshBasicMaterial({ color: "#66e0ff", transparent: true, opacity: 0.18, blending: THREE.AdditiveBlending }));
              group.add(halo);
              group.onBeforeRender = () => { ring1.rotation.y += 0.02; ring2.rotation.y -= 0.018; };
              const label = createTextSprite(node.name || "CipherLake", "#a7e9ff");
              label.position.y = 2.1; group.add(label);
              return group;
            }
            // TraceNet: neon green web (wireframe) with flicker
            if (name.includes("tracenet")) {
              const mat = new THREE.MeshBasicMaterial({ color: "#39ff14", wireframe: true, transparent: true, opacity: 0.9 });
              const geo = new THREE.IcosahedronGeometry(1.4, 1);
              const mesh = new THREE.Mesh(geo, mat);
              let acc = 0;
              mesh.onBeforeRender = (_, __, camera, geometry, material) => {
                acc += 1;
                if (acc % 7 === 0) (material as THREE.Material & { opacity: number }).opacity = 0.5 + Math.random() * 0.5;
                mesh.rotation.y += 0.008; mesh.rotation.x += 0.004;
              };
              const glow = new THREE.Mesh(new THREE.IcosahedronGeometry(1.6, 1), new THREE.MeshBasicMaterial({ color: "#39ff14", transparent: true, opacity: 0.18, blending: THREE.AdditiveBlending, wireframe: true }));
              const group = new THREE.Group();
              group.add(glow); group.add(mesh);
              const label = createTextSprite(node.name || "TraceNet", "#b8ffb3");
              label.position.y = 2.2; group.add(label);
              return group;
            }
            // FireCore: orange hexagonal prism with periodic burst
            if (name.includes("firecore")) {
              const group = new THREE.Group();
              const mat = new THREE.MeshStandardMaterial({ color: "#ff7b00", emissive: "#442200", emissiveIntensity: 0.7, metalness: 0.3 });
              const prism = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 2.2, 6), mat);
              group.add(prism);
              const spark = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.6, 8), new THREE.MeshBasicMaterial({ color: "#ffaa33" }));
              spark.position.y = 1.6; spark.visible = false; group.add(spark);
              const halo = new THREE.Mesh(new THREE.TorusGeometry(1.8, 0.08, 8, 48), new THREE.MeshBasicMaterial({ color: "#ffb866", transparent: true, opacity: 0.2, blending: THREE.AdditiveBlending }));
              halo.rotation.x = Math.PI/2; group.add(halo);
              let last = performance.now();
              group.onBeforeRender = () => {
                const t = performance.now();
                const phase = (Math.sin(t/500) + 1)/2; // 0..1
                (prism.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.5 + phase * 0.5;
                prism.rotation.y += 0.02;
                if (t - last > 8000) { spark.visible = true; last = t; }
                if (spark.visible) { spark.position.y += 0.05; spark.scale.multiplyScalar(0.98); if (spark.position.y > 3) { spark.visible = false; spark.position.y = 1.6; spark.scale.set(1,1,1); } }
              };
              const label = createTextSprite(node.name || "FireCore", "#ffe1b3");
              label.position.y = 2.2; group.add(label);
              return group;
            }
            // AWS / RHCSA: floating hologram-like badges (rotating sprites)
            if (name.includes("aws") || name.includes("rhcsa") || name.includes("red hat")) {
              const group = new THREE.Group();
              const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ color: name.includes("aws") ? "#ffd166" : "#ff4d4d", opacity: 0.9 }));
              sprite.scale.set(6, 6, 1);
              group.add(sprite);
              group.onBeforeRender = () => { group.rotation.y += 0.01; };
              const label = createTextSprite(node.name || (name.includes("aws") ? "AWS" : "RHCSA"), name.includes("aws") ? "#ffe7a6" : "#ffb3b3");
              label.position.y = 2.2; group.add(label);
              return group;
            }
            // Default neon sprite
            const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ color: node.color || "#00b4ff" }));
            sprite.scale.set(8, 8, 1);
            const group = new THREE.Group();
            group.add(sprite);
            const label = createTextSprite(node.name || "node", "#d5f6ff");
            label.position.y = 2.2; group.add(label);
            return group;
          }}
          onNodeClick={(n: any) => {
            const name: string = n.name || "";
            if (name.toLowerCase().includes("sentinel")) {
              alert("Sentinel.log — endpoint telemetry pulsar");
            }
          }}
        />
      </div>
    </section>
  );
}

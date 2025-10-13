"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useMemo, useRef } from "react";

function Stars({ count = 4000 }) {
  const points = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 80;
    }
    return positions;
  }, [count]);

  const ref = useRef<THREE.Points>(null!);
  useFrame(({ clock, mouse }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime() * 0.06;
    ref.current.rotation.x = t + mouse.y * 0.2;
    ref.current.rotation.y = t + mouse.x * 0.2;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={points as any} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color="#00ff9d"
          size={0.02}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export default function MatrixField() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 4], fov: 75 }}>
        <color attach="background" args={["#0a0a0a"]} />
        {/* subtle dim grid of points */}
        <Stars />
      </Canvas>
    </div>
  );
}

"use client";

import { Float, Html, MeshTransmissionMaterial, OrbitControls, Stars } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

function HologramCore() {
  const group = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    if (group.current) group.current.rotation.y = elapsed * 0.22;
    if (ring.current) ring.current.rotation.z = elapsed * 0.45;
  });

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[1.1, 4]} />
        <MeshTransmissionMaterial
          backside
          samples={5}
          thickness={0.18}
          roughness={0.16}
          transmission={0.78}
          chromaticAberration={0.22}
          anisotropy={0.3}
          color="#6ee7ff"
        />
      </mesh>
      <mesh ref={ring} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.72, 0.018, 16, 160]} />
        <meshBasicMaterial color="#67e8f9" transparent opacity={0.75} />
      </mesh>
      <mesh rotation={[0, Math.PI / 4, Math.PI / 2]}>
        <torusGeometry args={[2.16, 0.012, 16, 180]} />
        <meshBasicMaterial color="#f0abfc" transparent opacity={0.48} />
      </mesh>
    </group>
  );
}

function DataPanels() {
  const panels = useMemo(
    () => [
      { label: "FULL-STACK", position: [-2.7, 0.55, -0.3], color: "#67e8f9" },
      { label: "AI SYSTEMS", position: [2.55, 0.2, -0.1], color: "#f0abfc" },
      { label: "20K+ USERS", position: [-1.55, -1.35, 0.25], color: "#a7f3d0" },
      { label: "RAG + OCR", position: [1.72, -1.28, 0.28], color: "#fde68a" },
    ],
    [],
  );

  return (
    <>
      {panels.map((panel) => (
        <Float key={panel.label} speed={1.6} rotationIntensity={0.08} floatIntensity={0.35}>
          <group position={panel.position as [number, number, number]}>
            <mesh>
              <boxGeometry args={[1.62, 0.58, 0.035]} />
              <meshBasicMaterial color={panel.color} transparent opacity={0.16} />
            </mesh>
            <lineSegments>
              <edgesGeometry args={[new THREE.BoxGeometry(1.62, 0.58, 0.035)]} />
              <lineBasicMaterial color={panel.color} transparent opacity={0.5} />
            </lineSegments>
            <Html transform center distanceFactor={7}>
              <div className="whitespace-nowrap rounded-full border border-white/15 bg-black/45 px-3 py-1 text-[10px] font-bold tracking-[0.22em] text-white backdrop-blur">
                {panel.label}
              </div>
            </Html>
          </group>
        </Float>
      ))}
    </>
  );
}

function LabDeck() {
  return (
    <group position={[0, -2.05, -0.3]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[3.3, 3.3, 0.08, 96, 1, false, 0, Math.PI * 2]} />
        <meshStandardMaterial color="#07111f" metalness={0.7} roughness={0.28} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.06, 0]}>
        <ringGeometry args={[2.15, 2.2, 128]} />
        <meshBasicMaterial color="#67e8f9" transparent opacity={0.33} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.08, 0]}>
        <ringGeometry args={[0.9, 0.94, 128]} />
        <meshBasicMaterial color="#f0abfc" transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

export function CommandCenterScene() {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0.6, 6.2], fov: 46 }}
        dpr={[1, 1.65]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <color attach="background" args={["#02040a"]} />
          <ambientLight intensity={0.65} />
          <pointLight position={[4, 3, 5]} intensity={16} color="#67e8f9" />
          <pointLight position={[-3, -1, 3]} intensity={8} color="#f0abfc" />
          <Stars radius={18} depth={20} count={900} factor={3} saturation={0} fade speed={0.5} />
          <Float speed={1.15} rotationIntensity={0.2} floatIntensity={0.28}>
            <HologramCore />
          </Float>
          <DataPanels />
          <LabDeck />
          <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={1.05} maxPolarAngle={1.9} />
        </Suspense>
      </Canvas>
    </div>
  );
}

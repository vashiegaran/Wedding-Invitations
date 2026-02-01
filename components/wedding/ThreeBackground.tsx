"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";

// Animated Diya (Oil Lamp) Component
function Diya({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  const flameRef = useRef<THREE.Mesh>(null);
  const innerFlameRef = useRef<THREE.Mesh>(null);

  // Rotate diya slowly
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
    // Animate flame
    if (flameRef.current) {
      flameRef.current.scale.y = 1 + Math.sin(state.clock.elapsedTime * 8) * 0.15;
      flameRef.current.scale.x = 1 + Math.cos(state.clock.elapsedTime * 6) * 0.1;
    }
    if (innerFlameRef.current) {
      innerFlameRef.current.scale.y = 1 + Math.sin(state.clock.elapsedTime * 10) * 0.2;
    }
  });

  // Brass material for the lamp
  const brassMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#C9A227"),
        metalness: 0.8,
        roughness: 0.3,
        emissive: new THREE.Color("#8B6914"),
        emissiveIntensity: 0.1,
      }),
    []
  );

  // Flame material (outer)
  const flameMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color("#FF6B00"),
        transparent: true,
        opacity: 0.9,
      }),
    []
  );

  // Inner flame material
  const innerFlameMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color("#FFE066"),
        transparent: true,
        opacity: 1,
      }),
    []
  );

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={groupRef} position={position} scale={0.4}>
        {/* Lamp base - bowl shape */}
        <mesh position={[0, 0, 0]} material={brassMaterial}>
          <sphereGeometry args={[0.5, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        </mesh>

        {/* Lamp rim */}
        <mesh position={[0, 0, 0]} material={brassMaterial}>
          <torusGeometry args={[0.5, 0.05, 16, 32]} />
        </mesh>

        {/* Lamp stem */}
        <mesh position={[0, -0.4, 0]} material={brassMaterial}>
          <cylinderGeometry args={[0.08, 0.15, 0.3, 16]} />
        </mesh>

        {/* Lamp foot */}
        <mesh position={[0, -0.6, 0]} material={brassMaterial}>
          <cylinderGeometry args={[0.25, 0.3, 0.1, 16]} />
        </mesh>

        {/* Wick holder */}
        <mesh position={[0.35, 0.1, 0]} material={brassMaterial}>
          <cylinderGeometry args={[0.03, 0.03, 0.15, 8]} />
        </mesh>

        {/* Outer flame */}
        <mesh ref={flameRef} position={[0.35, 0.35, 0]} material={flameMaterial}>
          <coneGeometry args={[0.08, 0.3, 8]} />
        </mesh>

        {/* Inner flame (brighter) */}
        <mesh ref={innerFlameRef} position={[0.35, 0.32, 0]} material={innerFlameMaterial}>
          <coneGeometry args={[0.04, 0.15, 8]} />
        </mesh>

        {/* Point light for flame glow */}
        <pointLight
          position={[0.35, 0.4, 0]}
          color="#FF9500"
          intensity={2}
          distance={3}
          decay={2}
        />
      </group>
    </Float>
  );
}

// Floating golden particle
function GoldenParticle({ position, delay }: { position: [number, number, number]; delay: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialY = position[1];

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating motion
      meshRef.current.position.y = initialY + Math.sin(state.clock.elapsedTime + delay) * 0.5;
      meshRef.current.position.x = position[0] + Math.sin(state.clock.elapsedTime * 0.5 + delay) * 0.3;
      // Gentle rotation
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime + delay) * 0.2;
    }
  });

  const material = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color("#FFD700"),
        transparent: true,
        opacity: 0.6,
      }),
    []
  );

  return (
    <mesh ref={meshRef} position={position} material={material}>
      <octahedronGeometry args={[0.05, 0]} />
    </mesh>
  );
}

// Main 3D Scene
function Scene() {
  // Generate random particle positions
  const particles = useMemo(() => {
    const positions: { position: [number, number, number]; delay: number }[] = [];
    for (let i = 0; i < 30; i++) {
      positions.push({
        position: [
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 4 - 2,
        ],
        delay: Math.random() * Math.PI * 2,
      });
    }
    return positions;
  }, []);

  return (
    <>
      {/* Ambient light - warm tone */}
      <ambientLight intensity={0.4} color="#F5E6D3" />

      {/* Directional light - golden */}
      <directionalLight
        position={[5, 5, 5]}
        intensity={0.6}
        color="#FFE4B5"
      />

      {/* Floating Diyas */}
      <Diya position={[-2.5, 1, -1]} />
      <Diya position={[2.5, 0.5, -1.5]} />
      <Diya position={[0, -1.5, -2]} />

      {/* Sparkles - golden particles */}
      <Sparkles
        count={100}
        scale={10}
        size={3}
        speed={0.3}
        opacity={0.5}
        color="#C9A227"
      />

      {/* Additional golden particles */}
      {particles.map((p, i) => (
        <GoldenParticle key={i} position={p.position} delay={p.delay} />
      ))}

      {/* Fog for depth */}
      <fog attach="fog" args={["#F5E6D3", 5, 15]} />
    </>
  );
}

export function ThreeBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}


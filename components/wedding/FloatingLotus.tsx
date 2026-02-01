"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

// Single Lotus Petal
function LotusFlower({
  position,
  scale = 1,
  rotationSpeed = 0.2,
  color = "#F8C8DC",
}: {
  position: [number, number, number];
  scale?: number;
  rotationSpeed?: number;
  color?: string;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const petalRefs = useRef<THREE.Mesh[]>([]);

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle rotation
      groupRef.current.rotation.y += rotationSpeed * 0.005;
      // Subtle breathing effect
      const breathe = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.03;
      groupRef.current.scale.setScalar(scale * breathe);
    }
    // Animate petals slightly
    petalRefs.current.forEach((petal, i) => {
      if (petal) {
        petal.rotation.x = 0.3 + Math.sin(state.clock.elapsedTime * 0.8 + i * 0.5) * 0.05;
      }
    });
  });

  // Petal material - soft pink gradient
  const petalMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(color),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.9,
        roughness: 0.6,
        metalness: 0.1,
      }),
    [color]
  );

  // Inner petal material - lighter
  const innerPetalMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#FFF0F5"),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.95,
        roughness: 0.5,
        metalness: 0.1,
      }),
    []
  );

  // Center material - golden yellow
  const centerMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#FFD700"),
        roughness: 0.4,
        metalness: 0.3,
        emissive: new THREE.Color("#C9A227"),
        emissiveIntensity: 0.2,
      }),
    []
  );

  const petalCount = 8;
  const innerPetalCount = 6;

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <group ref={groupRef} position={position} scale={scale}>
        {/* Outer petals */}
        {[...Array(petalCount)].map((_, i) => {
          const angle = (i / petalCount) * Math.PI * 2;
          return (
            <mesh
              key={`outer-${i}`}
              ref={(el) => {
                if (el) petalRefs.current[i] = el;
              }}
              position={[Math.cos(angle) * 0.3, 0, Math.sin(angle) * 0.3]}
              rotation={[0.3, angle, 0]}
              material={petalMaterial}
            >
              <sphereGeometry args={[0.25, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
            </mesh>
          );
        })}

        {/* Inner petals */}
        {[...Array(innerPetalCount)].map((_, i) => {
          const angle = (i / innerPetalCount) * Math.PI * 2 + 0.3;
          return (
            <mesh
              key={`inner-${i}`}
              position={[Math.cos(angle) * 0.15, 0.05, Math.sin(angle) * 0.15]}
              rotation={[0.5, angle, 0]}
              material={innerPetalMaterial}
              scale={0.7}
            >
              <sphereGeometry args={[0.2, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
            </mesh>
          );
        })}

        {/* Center - golden */}
        <mesh position={[0, 0.08, 0]} material={centerMaterial}>
          <sphereGeometry args={[0.12, 16, 16]} />
        </mesh>

        {/* Center dots */}
        {[...Array(12)].map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          const radius = 0.06;
          return (
            <mesh
              key={`dot-${i}`}
              position={[Math.cos(angle) * radius, 0.12, Math.sin(angle) * radius]}
              material={centerMaterial}
            >
              <sphereGeometry args={[0.015, 8, 8]} />
            </mesh>
          );
        })}

        {/* Subtle glow */}
        <pointLight
          position={[0, 0.2, 0]}
          color="#FFE4E1"
          intensity={0.5}
          distance={2}
          decay={2}
        />
      </group>
    </Float>
  );
}

// Floating golden particle
function GoldenDust({ count = 50 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 6 - 2,
        ] as [number, number, number],
        speed: 0.2 + Math.random() * 0.3,
        offset: Math.random() * Math.PI * 2,
      });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    particles.forEach((particle, i) => {
      const t = state.clock.elapsedTime * particle.speed + particle.offset;
      dummy.position.set(
        particle.position[0] + Math.sin(t) * 0.5,
        particle.position[1] + Math.sin(t * 0.7) * 0.3,
        particle.position[2]
      );
      dummy.scale.setScalar(0.02 + Math.sin(t * 2) * 0.01);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#FFD700" transparent opacity={0.6} />
    </instancedMesh>
  );
}

// Main Scene
function Scene() {
  return (
    <>
      {/* Ambient light - warm */}
      <ambientLight intensity={0.6} color="#FFF8F0" />

      {/* Main light - soft golden */}
      <directionalLight position={[5, 8, 5]} intensity={0.8} color="#FFE4B5" />

      {/* Fill light */}
      <directionalLight position={[-3, 5, -3]} intensity={0.3} color="#FFB6C1" />

      {/* Floating Lotus Flowers */}
      <LotusFlower position={[-2.5, 1.5, -2]} scale={0.8} color="#F8C8DC" rotationSpeed={0.15} />
      <LotusFlower position={[2.8, 0.8, -3]} scale={0.6} color="#FFB6C1" rotationSpeed={0.2} />
      <LotusFlower position={[0, -1.2, -2.5]} scale={0.7} color="#FFC0CB" rotationSpeed={0.18} />
      <LotusFlower position={[-1.5, -0.5, -3.5]} scale={0.5} color="#F8C8DC" rotationSpeed={0.22} />
      <LotusFlower position={[1.8, 2, -4]} scale={0.45} color="#FFB6C1" rotationSpeed={0.12} />

      {/* Golden dust particles */}
      <GoldenDust count={40} />

      {/* Fog for depth - matches theme */}
      <fog attach="fog" args={["#F5E6D3", 4, 12]} />
    </>
  );
}

export function FloatingLotus() {
  return (
    <div className="fixed inset-0 z-[1] pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}


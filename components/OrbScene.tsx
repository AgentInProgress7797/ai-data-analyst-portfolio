"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Float,
  MeshDistortMaterial,
  Sphere,
} from "@react-three/drei";
import * as THREE from "three";

function TransparentCanvas() {
  const { gl, scene } = useThree();

  useMemo(() => {
    gl.setClearColor(0x000000, 0);
    scene.background = null;
  }, [gl, scene]);

  return null;
}

function GlowOrb() {
  const orbRef = useRef<THREE.Mesh>(null);
  const outerGlowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();

    if (orbRef.current) {
      orbRef.current.rotation.y = elapsed * 0.24;
      orbRef.current.rotation.x = Math.sin(elapsed * 0.32) * 0.12;

      const scale = 1 + Math.sin(elapsed * 1.4) * 0.035;
      orbRef.current.scale.setScalar(scale);
    }

    if (outerGlowRef.current) {
      outerGlowRef.current.rotation.y = -elapsed * 0.12;

      const outerScale = 1 + Math.sin(elapsed * 0.9) * 0.04;
      outerGlowRef.current.scale.setScalar(outerScale);
    }
  });

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.4}
      floatIntensity={1}
    >
      <Sphere
        ref={orbRef}
        args={[1.48, 96, 96]}
      >
        <MeshDistortMaterial
          color="#082f2c"
          emissive="#2dd4bf"
          emissiveIntensity={1.15}
          distort={0.48}
          speed={2}
          roughness={0.18}
          metalness={0.75}
          transparent
          opacity={0.78}
        />
      </Sphere>

      <Sphere
        ref={outerGlowRef}
        args={[1.72, 64, 64]}
      >
        <meshBasicMaterial
          color="#5eead4"
          transparent
          opacity={0.045}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </Sphere>
    </Float>
  );
}

function ParticleField() {
  const particleRef = useRef<THREE.Points>(null);
  const particleCount = 320;

  const positions = useMemo(() => {
    const particlePositions = new Float32Array(particleCount * 3);

    for (let index = 0; index < particleCount; index += 1) {
      /*
       * Keep the particles closer to the avatar.
       * Previously many particles were outside the visible camera area.
       */
      const radius = 1.9 + Math.random() * 2.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      particlePositions[index * 3] =
        radius * Math.sin(phi) * Math.cos(theta);

      particlePositions[index * 3 + 1] =
        radius * Math.sin(phi) * Math.sin(theta);

      particlePositions[index * 3 + 2] =
        radius * Math.cos(phi);
    }

    return particlePositions;
  }, []);

  useFrame((state, delta) => {
    if (!particleRef.current) {
      return;
    }

    particleRef.current.rotation.y += delta * 0.055;
    particleRef.current.rotation.x =
      Math.sin(state.clock.getElapsedTime() * 0.15) * 0.08;
  });

  return (
    <points ref={particleRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>

      <pointsMaterial
        color="#7ff7e5"
        size={0.026}
        transparent
        opacity={0.58}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function OrbitRings() {
  const firstRingRef = useRef<THREE.Mesh>(null);
  const secondRingRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (firstRingRef.current) {
      firstRingRef.current.rotation.z += delta * 0.12;
      firstRingRef.current.rotation.x =
        Math.PI / 2.7 + Math.sin(state.clock.elapsedTime * 0.3) * 0.08;
    }

    if (secondRingRef.current) {
      secondRingRef.current.rotation.z -= delta * 0.08;
      secondRingRef.current.rotation.y =
        Math.PI / 2.5 + Math.cos(state.clock.elapsedTime * 0.25) * 0.08;
    }
  });

  return (
    <>
      <mesh
        ref={firstRingRef}
        rotation={[Math.PI / 2.7, 0, 0]}
      >
        <torusGeometry args={[2, 0.009, 12, 150]} />

        <meshBasicMaterial
          color="#5eead4"
          transparent
          opacity={0.32}
          depthWrite={false}
        />
      </mesh>

      <mesh
        ref={secondRingRef}
        rotation={[0, Math.PI / 2.5, 0]}
      >
        <torusGeometry args={[2.25, 0.006, 12, 150]} />

        <meshBasicMaterial
          color="#fbbf6b"
          transparent
          opacity={0.18}
          depthWrite={false}
        />
      </mesh>
    </>
  );
}

export default function OrbScene() {
  return (
    <Canvas
      camera={{
        position: [0, 0, 6],
        fov: 46,
      }}
      gl={{
        alpha: true,
        antialias: true,
        premultipliedAlpha: false,
      }}
      dpr={[1, 1.75]}
      onCreated={({ gl, scene }) => {
        gl.setClearColor(0x000000, 0);
        scene.background = null;
      }}
      style={{
        width: "100%",
        height: "100%",
        background: "transparent",
        pointerEvents: "none",
      }}
    >
      <TransparentCanvas />

      <ambientLight intensity={0.4} />

      <pointLight
        position={[4, 4, 5]}
        intensity={2.2}
        color="#5eead4"
      />

      <pointLight
        position={[-4, -3, 2]}
        intensity={1}
        color="#fbbf6b"
      />

      <ParticleField />
      <OrbitRings />
      <GlowOrb />
    </Canvas>
  );
}
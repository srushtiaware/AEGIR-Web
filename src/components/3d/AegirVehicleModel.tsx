import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AegirVehicleModelProps {
  pitch: number;
  roll: number;
  heading: number;
  thrusterOutput: number; // 0-100%
}

export const AegirVehicleModel: React.FC<AegirVehicleModelProps> = ({
  pitch,
  roll,
  heading,
  thrusterOutput
}) => {
  const vehicleGroupRef = useRef<THREE.Group>(null);
  const thrusterParticlesRef = useRef<THREE.Points>(null);

  // Animate micro-hover and particle trail
  useFrame((state) => {
    if (!vehicleGroupRef.current) return;
    const time = state.clock.getElapsedTime();

    // Pitch & roll stabilization converted to radians
    vehicleGroupRef.current.rotation.x = THREE.MathUtils.degToRad(pitch);
    vehicleGroupRef.current.rotation.z = THREE.MathUtils.degToRad(-roll);
    vehicleGroupRef.current.rotation.y = THREE.MathUtils.degToRad(heading - 184);

    // Micro hover motion
    vehicleGroupRef.current.position.y = Math.sin(time * 1.5) * 0.08;

    // Thruster bubble particle trail update
    if (thrusterParticlesRef.current) {
      const positions = thrusterParticlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 2] -= (0.05 + (thrusterOutput / 100) * 0.1); // Move backward
        if (positions[i + 2] < -3) {
          positions[i + 2] = -0.8 + Math.random() * 0.2;
          positions[i] = (Math.random() - 0.5) * 0.4;
          positions[i + 1] = (Math.random() - 0.5) * 0.4;
        }
      }
      thrusterParticlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  // Create initial thruster particle positions
  const particleCount = 60;
  const particlePositions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    particlePositions[i * 3] = (Math.random() - 0.5) * 0.4;
    particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 0.4;
    particlePositions[i * 3 + 2] = -0.8 - Math.random() * 2;
  }

  return (
    <group ref={vehicleGroupRef} position={[0, 0, 0]}>
      {/* 1. Main Titanium Pressure Housing (Cylinder) */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.35, 0.35, 1.8, 32]} />
        <meshStandardMaterial
          color="#94a3b8"
          metalness={0.85}
          roughness={0.25}
          envMapIntensity={1.2}
        />
      </mesh>

      {/* Titanium End Caps / Rings */}
      <mesh position={[0, 0, 0.9]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.36, 0.03, 16, 32]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0, -0.9]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.36, 0.03, 16, 32]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* AEGIR Decal Stripe on Pressure Housing */}
      <mesh position={[0, 0.355, 0]}>
        <boxGeometry args={[0.4, 0.01, 0.9]} />
        <meshStandardMaterial color="#0284c7" metalness={0.3} roughness={0.4} />
      </mesh>

      {/* 2. Matte Black Nose Dome */}
      <mesh position={[0, 0, 0.95]} rotation={[Math.PI / 2, 0, 0]}>
        <sphereGeometry args={[0.35, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#0f172a" roughness={0.6} metalness={0.2} />
      </mesh>

      {/* Downward Camera Lens */}
      <mesh position={[0, -0.28, 0.8]} rotation={[Math.PI / 4, 0, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.1, 16]} />
        <meshStandardMaterial color="#0284c7" roughness={0.1} metalness={0.9} />
      </mesh>

      {/* Twin High-Intensity LED Spotlights (Mounted on Front Cage) */}
      <group position={[0.25, -0.15, 0.9]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.12, 16]} />
          <meshStandardMaterial color="#334155" metalness={0.8} />
        </mesh>
        {/* Spotlight Beam Light */}
        <spotLight
          color="#e0f2fe"
          intensity={8}
          distance={12}
          angle={Math.PI / 4}
          penumbra={0.4}
          target-position={[0, -2, 4]}
        />
      </group>
      <group position={[-0.25, -0.15, 0.9]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.12, 16]} />
          <meshStandardMaterial color="#334155" metalness={0.8} />
        </mesh>
        <spotLight
          color="#00f0ff"
          intensity={7}
          distance={12}
          angle={Math.PI / 4}
          penumbra={0.4}
          target-position={[0, -2, 4]}
        />
      </group>

      {/* 3. High-Visibility Yellow Structural Protection Rails (Exoskeleton Cage) */}
      {/* Top Left Rail */}
      <mesh position={[-0.42, 0.25, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 2.1, 16]} />
        <meshStandardMaterial color="#eab308" metalness={0.1} roughness={0.3} />
      </mesh>
      {/* Top Right Rail */}
      <mesh position={[0.42, 0.25, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 2.1, 16]} />
        <meshStandardMaterial color="#eab308" metalness={0.1} roughness={0.3} />
      </mesh>
      {/* Bottom Left Rail */}
      <mesh position={[-0.42, -0.25, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 2.1, 16]} />
        <meshStandardMaterial color="#eab308" metalness={0.1} roughness={0.3} />
      </mesh>
      {/* Bottom Right Rail */}
      <mesh position={[0.42, -0.25, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 2.1, 16]} />
        <meshStandardMaterial color="#eab308" metalness={0.1} roughness={0.3} />
      </mesh>

      {/* Cage Cross Braces */}
      {[-0.8, 0, 0.8].map((zPos, idx) => (
        <group key={idx} position={[0, 0, zPos]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <torusGeometry args={[0.48, 0.025, 12, 24]} />
            <meshStandardMaterial color="#eab308" metalness={0.1} roughness={0.3} />
          </mesh>
        </group>
      ))}

      {/* 4. Rear Stabilizing Hydrodynamic Fins */}
      {/* Vertical Fin Top */}
      <mesh position={[0, 0.55, -0.85]}>
        <boxGeometry args={[0.03, 0.4, 0.4]} />
        <meshStandardMaterial color="#0f172a" metalness={0.5} roughness={0.3} />
      </mesh>
      {/* Vertical Fin Bottom */}
      <mesh position={[0, -0.55, -0.85]}>
        <boxGeometry args={[0.03, 0.4, 0.4]} />
        <meshStandardMaterial color="#0f172a" metalness={0.5} roughness={0.3} />
      </mesh>
      {/* Horizontal Fin Left */}
      <mesh position={[-0.55, 0, -0.85]}>
        <boxGeometry args={[0.4, 0.03, 0.4]} />
        <meshStandardMaterial color="#0f172a" metalness={0.5} roughness={0.3} />
      </mesh>
      {/* Horizontal Fin Right */}
      <mesh position={[0.55, 0, -0.85]}>
        <boxGeometry args={[0.4, 0.03, 0.4]} />
        <meshStandardMaterial color="#0f172a" metalness={0.5} roughness={0.3} />
      </mesh>

      {/* 5. Rear Tether Connection & Umbilical Cable */}
      <mesh position={[0, 0, -0.98]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.2, 16]} />
        <meshStandardMaterial color="#0284c7" metalness={0.5} />
      </mesh>

      {/* 6. Mounted Sensor Arrays */}
      {/* EMI Induction Coil Ring (Forward Assembly) */}
      <mesh position={[0, 0, 0.6]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.44, 0.02, 16, 32]} />
        <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={0.6} />
      </mesh>

      {/* Magnetometer Sensor Boom (Top Rear) */}
      <mesh position={[0, 0.65, -0.2]} rotation={[Math.PI / 6, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.5, 12]} />
        <meshStandardMaterial color="#64748b" metalness={0.8} />
      </mesh>

      {/* Self-Potential (SP) Electrode Tips (Bottom Frame) */}
      <mesh position={[-0.3, -0.38, 0.3]}>
        <sphereGeometry args={[0.04, 12, 12]} />
        <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={0.8} />
      </mesh>
      <mesh position={[0.3, -0.38, 0.3]}>
        <sphereGeometry args={[0.04, 12, 12]} />
        <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={0.8} />
      </mesh>

      {/* 7. Four Thruster Shrouds & Propeller Hubs */}
      {/* Port Vertical Thruster */}
      <group position={[-0.45, 0, 0.3]}>
        <mesh rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.12, 0.12, 0.16, 16]} />
          <meshStandardMaterial color="#1e293b" metalness={0.7} />
        </mesh>
      </group>
      {/* Starboard Vertical Thruster */}
      <group position={[0.45, 0, 0.3]}>
        <mesh rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.12, 0.12, 0.16, 16]} />
          <meshStandardMaterial color="#1e293b" metalness={0.7} />
        </mesh>
      </group>
      {/* Port Rear Horizontal Thruster */}
      <group position={[-0.45, 0, -0.6]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.12, 0.12, 0.16, 16]} />
          <meshStandardMaterial color="#1e293b" metalness={0.7} />
        </mesh>
      </group>
      {/* Starboard Rear Horizontal Thruster */}
      <group position={[0.45, 0, -0.6]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.12, 0.12, 0.16, 16]} />
          <meshStandardMaterial color="#1e293b" metalness={0.7} />
        </mesh>
      </group>

      {/* Thruster Hydrodynamic Bubble Particle Trail */}
      <points ref={thrusterParticlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          color="#a5f3fc"
          transparent
          opacity={0.65}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
};

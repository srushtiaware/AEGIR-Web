import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { AegirVehicleModel } from './AegirVehicleModel';
import { useSimulation } from '../../context/SimulationContext';

// Seafloor Terrain with Polymetallic Nodules
const SeafloorTerrain: React.FC<{ isAnomalyDetected: boolean; isDark: boolean }> = ({ isAnomalyDetected, isDark }) => {
  const terrainMeshRef = useRef<THREE.Mesh>(null);
  const noduleGroupRef = useRef<THREE.Group>(null);
  const marineSnowRef = useRef<THREE.Points>(null);

  const { geometry, nodulePositions } = useMemo(() => {
    const geo = new THREE.PlaneGeometry(30, 40, 64, 64);
    const pos = geo.attributes.position;
    
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const zNoise =
        Math.sin(x * 0.3) * Math.cos(y * 0.3) * 0.4 +
        Math.sin(x * 0.8 + y * 0.5) * 0.15;
      pos.setZ(i, zNoise);
    }
    geo.computeVertexNormals();

    const nodules: Array<[number, number, number]> = [];
    for (let i = 0; i < 45; i++) {
      const nx = (Math.random() - 0.5) * 22;
      const ny = (Math.random() - 0.5) * 30;
      nodules.push([nx, -2.6, ny]);
    }

    return { geometry: geo, nodulePositions: nodules };
  }, []);

  useFrame((_, delta) => {
    if (terrainMeshRef.current) {
      terrainMeshRef.current.position.z += delta * 1.4;
      if (terrainMeshRef.current.position.z > 10) {
        terrainMeshRef.current.position.z = -10;
      }
    }
    if (noduleGroupRef.current) {
      noduleGroupRef.current.position.z += delta * 1.4;
      if (noduleGroupRef.current.position.z > 10) {
        noduleGroupRef.current.position.z = -10;
      }
    }

    if (marineSnowRef.current) {
      const positions = marineSnowRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 2] += delta * 2.0;
        positions[i + 1] += Math.sin(positions[i] + delta) * 0.005;
        if (positions[i + 2] > 10) {
          positions[i + 2] = -15;
          positions[i] = (Math.random() - 0.5) * 20;
          positions[i + 1] = (Math.random() - 0.5) * 8 - 1;
        }
      }
      marineSnowRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  const snowPositions = useMemo(() => {
    const arr = new Float32Array(250 * 3);
    for (let i = 0; i < 250; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 24;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10 - 1;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return arr;
  }, []);

  return (
    <group>
      {/* 1. Main Seafloor Mesh */}
      <mesh
        ref={terrainMeshRef}
        geometry={geometry}
        position={[0, -2.8, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <meshStandardMaterial
          color={isDark ? '#0f172a' : '#1e3a8a'}
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>

      {/* 2. Polymetallic Nodules & Rocks Field */}
      <group ref={noduleGroupRef}>
        {nodulePositions.map((pos, idx) => (
          <mesh key={idx} position={pos} castShadow receiveShadow>
            <dodecahedronGeometry args={[0.08 + (idx % 4) * 0.04, 1]} />
            <meshStandardMaterial
              color={idx % 3 === 0 ? '#334155' : '#0f172a'}
              roughness={0.6}
              metalness={0.7}
            />
          </mesh>
        ))}
      </group>

      {/* 3. Marine Snow Suspended Particles */}
      <points ref={marineSnowRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[snowPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color={isDark ? '#93c5fd' : '#e0f2fe'}
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* 4. Spatial Anomaly Target Ring on Seafloor */}
      {isAnomalyDetected && (
        <group position={[0, -2.75, 1.2]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.8, 1.0, 32]} />
            <meshBasicMaterial color="#00f0ff" side={THREE.DoubleSide} transparent opacity={0.85} />
          </mesh>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.3, 16]} />
            <meshBasicMaterial color="#f59e0b" transparent opacity={0.7} />
          </mesh>
          <mesh position={[0, 1.35, -1.2]}>
            <cylinderGeometry args={[0.1, 0.9, 2.7, 16, 1, true]} />
            <meshBasicMaterial
              color="#00f0ff"
              transparent
              opacity={0.2}
              side={THREE.DoubleSide}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        </group>
      )}
    </group>
  );
};

export const UnderwaterScene: React.FC = () => {
  const { pixhawk, thrusters, activeAnomaly, theme } = useSimulation();
  const isAnomaly = !!activeAnomaly && activeAnomaly.detected;
  const isDark = theme === 'dark';

  const fogColor = isDark ? '#020817' : '#075985';

  return (
    <div className={`w-full h-full relative overflow-hidden rounded-xl border transition-colors ${
      isDark ? 'bg-[#020617] border-cyan-500/20' : 'bg-[#075985] border-cyan-600/30'
    } shadow-2xl`}>
      <Canvas
        camera={{ position: [0, 0.8, 4.2], fov: 48 }}
        gl={{ antialias: true }}
      >
        {/* Deep Ocean Fog Atmosphere */}
        <color attach="background" args={[fogColor]} />
        <fog attach="fog" args={[fogColor, 2, isDark ? 18 : 22]} />

        {/* Deep Ocean Lighting */}
        <ambientLight intensity={isDark ? 0.4 : 0.8} color={isDark ? '#0284c7' : '#38bdf8'} />
        <directionalLight position={[0, 10, -5]} intensity={isDark ? 0.6 : 1.2} color="#7dd3fc" />
        <pointLight position={[0, 2, 2]} intensity={isDark ? 1.5 : 2.2} color="#00f0ff" distance={10} />

        {/* 3D Seafloor & Environment */}
        <SeafloorTerrain isAnomalyDetected={isAnomaly} isDark={isDark} />

        {/* 3D Moving AEGIR Vehicle */}
        <AegirVehicleModel
          pitch={pixhawk.pitch}
          roll={pixhawk.roll}
          heading={pixhawk.heading}
          thrusterOutput={thrusters.vertical}
        />
      </Canvas>
    </div>
  );
};

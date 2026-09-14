import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Text, Grid } from '@react-three/drei';
import * as THREE from 'three';

const SKILLS = [
  "JavaScript", "TypeScript", "React", "Next.js", "Node.js", 
  "Tailwind", "MongoDB", "PostgreSQL", "GraphQL", "Redux", 
  "Express", "Git", "Figma", "AWS", "REST"
];

function DataNodes() {
  const groupRef = useRef();
  
  const nodes = useMemo(() => {
     return SKILLS.map((skill, i) => ({
         skill,
         position: [
             (Math.random() - 0.5) * 20,
             (Math.random() - 0.5) * 10,
             (Math.random() - 0.5) * 20 - 5
         ],
         speed: 0.1 + Math.random() * 0.2
     }));
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
        // Slow rotation of entire data field
        groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.05) * 0.2;
        groupRef.current.position.z = Math.sin(state.clock.elapsedTime * 0.1) * 2;
        
        // Gentle parallax
        groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, state.pointer.x * 2, 0.05);
        groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, (state.pointer.y * 2) - 1, 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      {nodes.map((node, idx) => (
        <Float key={idx} speed={node.speed * 5} rotationIntensity={1} floatIntensity={2}>
            <group position={node.position}>
                <mesh>
                    <octahedronGeometry args={[0.2, 0]} />
                    <meshBasicMaterial color="#06b6d4" wireframe />
                </mesh>
                <Text
                    position={[0, 0.4, 0]}
                    fontSize={0.3}
                    color="#10b981"
                    anchorX="center"
                    anchorY="middle"
                >
                    {node.skill}
                </Text>
            </group>
        </Float>
      ))}
    </group>
  );
}

function CyberTerrain() {
  return (
    <group position={[0, -4, 0]}>
        <Grid 
            renderOrder={-1}
            position={[0, 0, 0]}
            infiniteGrid
            cellSize={1}
            cellThickness={1}
            cellColor={[0.02, 0.5, 0.4]}
            sectionSize={5}
            sectionThickness={1.5}
            sectionColor={[0.0, 0.8, 0.6]}
            fadeDistance={40}
        />
    </group>
  );
}

export default function Scene() {
  return (
    <div className="fixed inset-0 -z-30 pointer-events-none bg-[#020617]">
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }} dpr={[1, 2]}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} color="#06b6d4" />
            
            <Stars radius={100} depth={50} count={3000} factor={3} saturation={1} fade speed={1.5} />
            <CyberTerrain />
            <DataNodes />
            
            <fog attach="fog" args={["#020617", 5, 30]} />
        </Canvas>
    </div>
  );
}

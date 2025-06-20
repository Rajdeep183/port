import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { Mesh } from 'three';

const FloatingCube = ({ position, color, speed }: { position: [number, number, number], color: string, speed: number }) => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const elapsedTime = state.clock.elapsedTime;
      meshRef.current.rotation.x = elapsedTime * speed * 0.5;
      meshRef.current.rotation.y = elapsedTime * speed * 0.4;
      meshRef.current.rotation.z = Math.sin(elapsedTime * speed * 0.3) * 0.2;

      const time = elapsedTime * speed * 0.2;
      meshRef.current.position.x = position[0] + Math.sin(time) * 0.3;
      meshRef.current.position.y = position[1] + Math.cos(time * 1.1) * 0.2;
      meshRef.current.position.z = position[2] + Math.sin(time * 0.7) * 0.3;
    }
  });

  return (
    <Float speed={speed * 1.2} rotationIntensity={0.2} floatIntensity={0.3}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[0.5, 128, 128]} />
        <meshStandardMaterial 
          color={color} 
          roughness={0.3} 
          metalness={0.9} 
          emissive={color}
          emissiveIntensity={0.2} 
        />
      </mesh>
    </Float>
  );
};

export const FloatingCubes = () => {
  const cubes = [
    { position: [-3, 2, -2] as [number, number, number], color: "#1C1C1E", speed: 0.6 },
    { position: [3, -2, -3] as [number, number, number], color: "#2C2C2E", speed: 0.8 },
    { position: [-2, -1, 2] as [number, number, number], color: "#3A3A3C", speed: 0.7 },
    { position: [2, 3, 1] as [number, number, number], color: "#48484A", speed: 0.5 },
    { position: [0, -3, -1] as [number, number, number], color: "#636366", speed: 0.9 },
  ];

  return (
    <>
      {cubes.map((cube, index) => (
        <FloatingCube key={index} {...cube} />
      ))}
    </>
  );
};

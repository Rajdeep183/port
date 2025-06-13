import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { Mesh } from 'three';

const FloatingCube = ({ position, color, speed }: { position: [number, number, number], color: string, speed: number }) => {
  const meshRef = useRef<Mesh>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  // Update rotation and position based on cursor movement
  useFrame((state) => {
    if (meshRef.current) {
      const elapsedTime = state.clock.elapsedTime;
      meshRef.current.rotation.x = elapsedTime * speed * 0.5 + cursor.y * 0.05;
      meshRef.current.rotation.y = elapsedTime * speed * 0.4 + cursor.x * 0.05;
      meshRef.current.rotation.z = Math.sin(elapsedTime * speed * 0.3) * 0.2;

      const time = elapsedTime * speed * 0.2;
      meshRef.current.position.x = position[0] + Math.sin(time) * 0.3 + cursor.x * 0.1;
      meshRef.current.position.y = position[1] + Math.cos(time * 1.1) * 0.2 + cursor.y * 0.1;
      meshRef.current.position.z = position[2] + Math.sin(time * 0.7) * 0.3;
    }
  });

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setCursor({
        x: (event.clientX / window.innerWidth - 0.5) * 2,
        y: -(event.clientY / window.innerHeight - 0.5) * 2,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <Float speed={speed * 1.2} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[0.6, 32, 32]} /> {/* Moon-like shape */}
        <meshStandardMaterial 
          color={color} 
          roughness={0.9}
          metalness={0.1}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  );
};

export const FloatingCubes = () => {
  const cubes = [
    { position: [-4, 2, -2] as [number, number, number], color: "#4B5563", speed: 0.6 }, // Slate Gray
    { position: [4, -2, -3] as [number, number, number], color: "#6B7280", speed: 0.8 }, // Cool Gray
    { position: [-3, -1, 2] as [number, number, number], color: "#9CA3AF", speed: 0.7 }, // Light Gray
    { position: [3, 3, 1] as [number, number, number], color: "#374151", speed: 0.5 }, // Charcoal Gray
    { position: [0, -3, -1] as [number, number, number], color: "#1F2937", speed: 0.9 }, // Dark Gray
    { position: [-2, 4, 3] as [number, number, number], color: "#D1D5DB", speed: 0.4 }, // Soft Gray
    { position: [5, 1, -4] as [number, number, number], color: "#111827", speed: 0.6 }, // Almost Black
  ];

  return (
    <>
      {cubes.map((cube, index) => (
        <FloatingCube key={index} {...cube} />
      ))}
    </>
  );
};

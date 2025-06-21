import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Float } from '@react-three/drei';
import { Group, MathUtils } from 'three';
import { FloatingCubes } from './FloatingCubes';
import { ParticleField } from './ParticleField';

export const Scene3D = () => {
  const groupRef = useRef<Group>(null);
  const centralSphereRef = useRef<any>(null);
  const ringRefs = useRef<any[]>([]);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setCursor({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animation system
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    // Main group movement - More responsive to cursor
    if (groupRef.current) {
      const targetRotationY = cursor.x * 0.3; // Increased sensitivity
      const targetRotationX = cursor.y * 0.2; // Increased sensitivity
      
      groupRef.current.rotation.y = MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, 0.08);
      groupRef.current.rotation.x = MathUtils.lerp(groupRef.current.rotation.x, targetRotationX, 0.08);
      
      // Add subtle position movement based on cursor
      groupRef.current.position.x = MathUtils.lerp(groupRef.current.position.x, cursor.x * 0.2, 0.05);
      groupRef.current.position.y = MathUtils.lerp(groupRef.current.position.y, cursor.y * 0.1, 0.05);
    }

    // Central sphere animation - More responsive
    if (centralSphereRef.current) {
      centralSphereRef.current.rotation.x = time * 0.3 + cursor.y * 0.5;
      centralSphereRef.current.rotation.y = time * 0.2 + cursor.x * 0.5;
      
      // Pulsing effect with cursor influence
      const pulse = 1 + Math.sin(time * 2) * 0.05 + Math.abs(cursor.x + cursor.y) * 0.02;
      centralSphereRef.current.scale.setScalar(pulse);
    }

    // Animate rings - More responsive to cursor
    ringRefs.current.forEach((ring, index) => {
      if (ring) {
        const ringTime = time + index * Math.PI * 0.5;
        const cursorInfluence = (cursor.x + cursor.y) * 0.2;
        
        ring.rotation.x = ringTime * (0.3 + index * 0.1) + cursorInfluence;
        ring.rotation.y = ringTime * (0.2 + index * 0.05) + cursor.x * 0.3;
        ring.rotation.z = ringTime * (0.1 + index * 0.02) + cursor.y * 0.2;
        
        // Dynamic ring positioning based on cursor
        const ringOffset = Math.sin(time + index) * 0.1 + Math.abs(cursor.x) * 0.05;
        ring.position.y = Math.sin(ringTime * 0.5) * ringOffset;
      }
    });
  });

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#7c3aed" />
      <pointLight position={[5, 5, 5]} intensity={0.4} color="#06b6d4" />
      
      {/* Background */}
      <Stars 
        radius={300} 
        depth={50} 
        count={1200} 
        factor={6} 
        fade 
        speed={0.5}
      />
      <ParticleField />
      
      {/* Main Scene */}
      <group 
        ref={groupRef}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
      >
        {/* Central Sphere */}
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
          <mesh ref={centralSphereRef} position={[0, 0, 0]}>
            <sphereGeometry args={[1.2, 64, 64]} />
            <meshStandardMaterial
              color="#1a1a2e"
              emissive="#7c3aed"
              emissiveIntensity={isHovered ? 0.3 : 0.15}
              roughness={0.2}
              metalness={0.8}
              transparent
              opacity={0.9}
            />
          </mesh>
        </Float>

        {/* Wireframe Structure */}
        <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.2}>
          <mesh position={[0, 0, 0]} scale={isHovered ? 1.05 : 1}>
            <icosahedronGeometry args={[2.5, 1]} />
            <meshBasicMaterial 
              color="#06b6d4" 
              wireframe 
              transparent 
              opacity={isHovered ? 0.5 : 0.3}
            />
          </mesh>
        </Float>

        {/* Ring System */}
        {Array.from({ length: 3 }, (_, i) => (
          <Float key={i} speed={1.2 + i * 0.2} rotationIntensity={0.4} floatIntensity={0.2}>
            <mesh 
              ref={(el) => (ringRefs.current[i] = el)}
              position={[0, 0, 0]} 
              rotation={[(Math.PI / 4) * i, (Math.PI / 3) * i, 0]}
            >
              <torusGeometry args={[3 + i * 0.4, 0.06, 12, 64]} />
              <meshStandardMaterial 
                color={i === 0 ? "#c026d3" : i === 1 ? "#7c3aed" : "#06b6d4"}
                emissive={i === 0 ? "#c026d3" : i === 1 ? "#7c3aed" : "#06b6d4"}
                emissiveIntensity={isHovered ? 0.3 : 0.1}
                metalness={0.8}
                roughness={0.2}
                transparent
                opacity={0.7}
              />
            </mesh>
          </Float>
        ))}
      </group>
      
      {/* Floating Cubes */}
      <FloatingCubes />
      
      {/* Controls */}
      <OrbitControls 
        enablePan={false}
        enableZoom={false}
        maxPolarAngle={Math.PI / 1.8}
        minPolarAngle={Math.PI / 2.2}
        autoRotate
        autoRotateSpeed={isHovered ? 0.8 : 0.4}
        enableDamping
        dampingFactor={0.05}
      />
    </>
  );
};

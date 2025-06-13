
import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Center, Float } from '@react-three/drei';
import { Group, DoubleSide } from 'three';
import { FloatingCubes } from './FloatingCubes';
import { ParticleField } from './ParticleField';

export const Scene3D = () => {
  const groupRef = useRef<Group>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [deviceOrientation, setDeviceOrientation] = useState({ alpha: 0, beta: 0, gamma: 0 });

  // Track cursor position for responsive movement
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setCursor({
        x: (event.clientX / window.innerWidth) * 2 - 1, // Normalize to [-1, 1]
        y: -(event.clientY / window.innerHeight) * 2 + 1, // Normalize to [-1, 1]
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Add gyroscopic effect for mobile devices
  useEffect(() => {
    const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
      const { alpha, beta, gamma } = event;
      if (alpha !== null && beta !== null && gamma !== null) {
        setDeviceOrientation({ alpha, beta, gamma });
      }
    };

    const requestPermissionIfNeeded = async () => {
      // Type-safe check for iOS 13+ permission request
      if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        try {
          const permission = await (DeviceOrientationEvent as any).requestPermission();
          if (permission === 'granted') {
            window.addEventListener('deviceorientation', handleDeviceOrientation);
          }
        } catch (error) {
          console.log('DeviceOrientationEvent permission denied');
        }
      } else {
        // For non-iOS devices or older iOS versions
        window.addEventListener('deviceorientation', handleDeviceOrientation);
      }
    };

    requestPermissionIfNeeded();

    return () => {
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
    };
  }, []);

  // Animate group based on cursor position and device orientation
  useFrame((state) => {
    if (groupRef.current) {
      // Cursor-based rotation with smooth interpolation
      const targetRotationY = cursor.x * 0.3;
      const targetRotationX = cursor.y * 0.2;
      
      // Add gyroscopic effect from device orientation
      const gyroX = (deviceOrientation.beta || 0) * 0.01;
      const gyroZ = (deviceOrientation.gamma || 0) * 0.01;
      
      // Combine cursor and gyroscopic effects
      groupRef.current.rotation.y += (targetRotationY - groupRef.current.rotation.y) * 0.05;
      groupRef.current.rotation.x += (targetRotationX - groupRef.current.rotation.x) * 0.05;
      
      // Apply gyroscopic tilt
      groupRef.current.rotation.x += gyroX * 0.05;
      groupRef.current.rotation.z += gyroZ * 0.05;
      
      // Add subtle floating animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <>
      {/* Enhanced Lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#4338ca" />
      <pointLight position={[0, 15, 5]} intensity={0.8} color="#06b6d4" />
      
      {/* Background Elements with Spherical Stars */}
      <Stars 
        radius={500} 
        depth={100} 
        count={2000} 
        factor={15} 
        fade 
        speed={2}
        saturation={0}
        className="stars"
      />
      <ParticleField />
      
      {/* Main Saturn-like Planet */}
      <group ref={groupRef}>
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          <Center>
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[1.5, 64, 64]} />
              <meshStandardMaterial 
                color="#d1a054"
                roughness={0.4}
                metalness={0.6}
                emissive="#d1a054"
                emissiveIntensity={0.1}
              />
            </mesh>
          </Center>
        </Float>

        {/* Saturn Rings */}
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
          <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[2, 2.5, 64]} />
            <meshStandardMaterial 
              color="#f4a261" 
              roughness={0.5}
              metalness={0.7}
              emissive="#f4a261"
              emissiveIntensity={0.05}
              side={DoubleSide}
            />
          </mesh>
        </Float>

        <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.3}>
          <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[2.6, 3.2, 64]} />
            <meshStandardMaterial 
              color="#e76f51" 
              roughness={0.6}
              metalness={0.8}
              emissive="#e76f51"
              emissiveIntensity={0.04}
              side={DoubleSide}
            />
          </mesh>
        </Float>
      </group>
      
      {/* Floating Elements */}
      <FloatingCubes />
      
      {/* Controls */}
      <OrbitControls 
        enablePan={false}
        enableZoom={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  );
};

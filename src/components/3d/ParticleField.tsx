import React, { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function generateStarTexture() {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.2, 'rgba(255, 255, 200, 0.9)');
  gradient.addColorStop(0.4, 'rgba(180, 220, 255, 0.6)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  return new THREE.CanvasTexture(canvas);
}

const ParticleField: React.FC = () => {
  const meshRef = useRef<THREE.Points>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [deviceOrientation, setDeviceOrientation] = useState({ alpha: 0, beta: 0, gamma: 0 });

  const particleCount = 1000;

  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  const velocities = useMemo(() => {
    const vel = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      vel[i * 3] = (Math.random() - 0.5) * 0.02;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
    }
    return vel;
  }, []);

  const starTexture = useMemo(() => generateStarTexture(), []);

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

  useEffect(() => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      const { alpha, beta, gamma } = event;
      if (alpha !== null && beta !== null && gamma !== null) {
        setDeviceOrientation({ alpha, beta, gamma });
      }
    };

    const enableGyro = async () => {
      if (typeof DeviceOrientationEvent !== 'undefined' && typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        try {
          const permission = await (DeviceOrientationEvent as any).requestPermission();
          if (permission === 'granted') {
            window.addEventListener('deviceorientation', handleOrientation, true);
          }
        } catch (err) {
          console.warn('Gyroscope permission denied:', err);
        }
      } else {
        // Non-iOS devices or already allowed
        window.addEventListener('deviceorientation', handleOrientation, true);
      }
    };

    enableGyro();

    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, []);

  useFrame(() => {
    if (!meshRef.current) return;

    const posAttr = meshRef.current.geometry.attributes.position.array as Float32Array;
    const limit = 15;
    for (let i = 0; i < particleCount; i++) {
      let x = posAttr[i * 3] += velocities[i * 3];
      let y = posAttr[i * 3 + 1] += velocities[i * 3 + 1];
      let z = posAttr[i * 3 + 2] += velocities[i * 3 + 2];

      if (x > limit || x < -limit) posAttr[i * 3] = -x;
      if (y > limit || y < -limit) posAttr[i * 3 + 1] = -y;
      if (z > limit || z < -limit) posAttr[i * 3 + 2] = -z;
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;

    const targetRotY = cursor.x * 0.2;
    const targetRotX = cursor.y * 0.15;
    const gyroX = (deviceOrientation.beta || 0) * 0.0008;
    const gyroZ = (deviceOrientation.gamma || 0) * 0.0008;

    meshRef.current.rotation.y += (targetRotY - meshRef.current.rotation.y) * 0.03;
    meshRef.current.rotation.x += (targetRotX - meshRef.current.rotation.x) * 0.03;

    meshRef.current.rotation.x += gyroX * 0.07;
    meshRef.current.rotation.z += gyroZ * 0.07;

    meshRef.current.rotation.y += 0.001; // gentle spin
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        map={starTexture}
        color="#ffffff"
        size={0.12}
        transparent
        opacity={1}
        sizeAttenuation
        depthWrite={false}
        alphaTest={0.2}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export { ParticleField };

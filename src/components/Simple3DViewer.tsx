import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';
import * as THREE from 'three';

const RobotModel = () => {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.08 : 1}
    >
      {/* Head */}
      <mesh position={[0, 1.2, 0]}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshStandardMaterial
          color="#2A2A2A"
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>

      {/* Eyes */}
      <mesh position={[-0.15, 1.25, 0.3]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial
          color="#FFD700"
          emissive="#FFD700"
          emissiveIntensity={0.5}
        />
      </mesh>
      <mesh position={[0.15, 1.25, 0.3]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial
          color="#FFD700"
          emissive="#FFD700"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Body */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.35, 0.4, 0.8, 32]} />
        <meshStandardMaterial
          color="#2A2A2A"
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* Heart Detail */}
      <mesh position={[0, 0.6, 0.38]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.15, 0.15, 0.05]} />
        <meshStandardMaterial
          color="#FFD700"
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>

      {/* Left Arm */}
      <group position={[-0.5, 0.6, 0]} rotation={[0, 0, -0.3]}>
        <mesh position={[0, -0.3, 0]}>
          <cylinderGeometry args={[0.08, 0.06, 0.6, 16]} />
          <meshStandardMaterial
            color="#1A1A1A"
            roughness={0.2}
            metalness={0.9}
          />
        </mesh>
        <mesh position={[0, -0.65, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial
            color="#FFD700"
            roughness={0.1}
            metalness={0.8}
          />
        </mesh>
      </group>

      {/* Right Arm */}
      <group position={[0.5, 0.6, 0]} rotation={[0, 0, 0.3]}>
        <mesh position={[0, -0.3, 0]}>
          <cylinderGeometry args={[0.08, 0.06, 0.6, 16]} />
          <meshStandardMaterial
            color="#1A1A1A"
            roughness={0.2}
            metalness={0.9}
          />
        </mesh>
        <mesh position={[0, -0.65, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial
            color="#FFD700"
            roughness={0.1}
            metalness={0.8}
          />
        </mesh>
      </group>

      {/* Left Leg */}
      <group position={[-0.15, 0, 0]}>
        <mesh position={[0, -0.3, 0]}>
          <cylinderGeometry args={[0.1, 0.08, 0.6, 16]} />
          <meshStandardMaterial
            color="#2A2A2A"
            roughness={0.2}
            metalness={0.9}
          />
        </mesh>
        <mesh position={[0, -0.7, 0.08]}>
          <boxGeometry args={[0.12, 0.1, 0.2]} />
          <meshStandardMaterial
            color="#FFD700"
            roughness={0.1}
            metalness={0.8}
          />
        </mesh>
      </group>

      {/* Right Leg */}
      <group position={[0.15, 0, 0]}>
        <mesh position={[0, -0.3, 0]}>
          <cylinderGeometry args={[0.1, 0.08, 0.6, 16]} />
          <meshStandardMaterial
            color="#2A2A2A"
            roughness={0.2}
            metalness={0.9}
          />
        </mesh>
        <mesh position={[0, -0.7, 0.08]}>
          <boxGeometry args={[0.12, 0.1, 0.2]} />
          <meshStandardMaterial
            color="#FFD700"
            roughness={0.1}
            metalness={0.8}
          />
        </mesh>
      </group>

      {/* Antenna */}
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.3, 16]} />
        <meshStandardMaterial
          color="#FFD700"
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
      <mesh position={[0, 1.7, 0]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial
          color="#FF4444"
          emissive="#FF4444"
          emissiveIntensity={0.6}
        />
      </mesh>
    </group>
  );
};

interface Simple3DViewerProps {
  className?: string;
}

const Simple3DViewer: React.FC<Simple3DViewerProps> = ({ className = '' }) => {
  const handleARView = () => {
    alert('AR görünümü için mobil cihaz gereklidir. QR kod ile devam edebilirsiniz.');
  };

  return (
    <div className={`relative w-full h-full ${className}`}>
      <div className="relative w-full h-full min-h-[500px]">
        <Canvas shadows style={{ background: 'transparent' }}>
          <PerspectiveCamera makeDefault position={[0, 1.5, 4]} />
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            enableRotate={true}
            autoRotate={true}
            autoRotateSpeed={2}
            minDistance={3}
            maxDistance={6}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2}
          />

          <ambientLight intensity={0.6} />
          <spotLight
            position={[5, 8, 5]}
            angle={0.3}
            penumbra={1}
            intensity={1.2}
            castShadow
          />
          <pointLight position={[-5, 5, -5]} intensity={0.4} />
          <pointLight position={[0, -2, 3]} intensity={0.3} color="#FFD700" />

          <RobotModel />

          <Environment preset="city" />
        </Canvas>

        <div className="absolute bottom-4 right-4 z-10">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleARView}
            className="flex items-center space-x-2 bg-primary text-white px-5 py-3 rounded-xl shadow-xl hover:bg-primary-dark transition-colors border border-white/20"
          >
            <Camera className="w-5 h-5" />
            <span className="text-sm font-semibold">AR ile Görüntüle</span>
          </motion.button>
        </div>

        <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg">
          <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
            İnteraktif 3D Görüntüleme
          </p>
        </div>
      </div>
    </div>
  );
};

export default Simple3DViewer;

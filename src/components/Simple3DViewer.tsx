import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Camera, Smartphone } from 'lucide-react';
import * as THREE from 'three';

const FurnitureModel = () => {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
    }
  });

  return (
    <group
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.05 : 1}
    >
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[1.5, 2, 0.8]} />
        <meshStandardMaterial
          color="#5FC8DA"
          roughness={0.3}
          metalness={0.2}
        />
      </mesh>

      <mesh position={[0, -0.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <boxGeometry args={[1.8, 0.8, 0.1]} />
        <meshStandardMaterial
          color="#5FC8DA"
          roughness={0.3}
          metalness={0.2}
        />
      </mesh>

      <mesh position={[-0.7, -0.5, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.6, 16]} />
        <meshStandardMaterial
          color="#3A98A8"
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>
      <mesh position={[0.7, -0.5, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.6, 16]} />
        <meshStandardMaterial
          color="#3A98A8"
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>
      <mesh position={[-0.7, -0.5, 0.35]}>
        <cylinderGeometry args={[0.08, 0.08, 0.6, 16]} />
        <meshStandardMaterial
          color="#3A98A8"
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>
      <mesh position={[0.7, -0.5, 0.35]}>
        <cylinderGeometry args={[0.08, 0.08, 0.6, 16]} />
        <meshStandardMaterial
          color="#3A98A8"
          roughness={0.1}
          metalness={0.8}
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
      <div className="relative w-full h-full min-h-[400px] bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700">
        <Canvas shadows>
          <PerspectiveCamera makeDefault position={[0, 2, 5]} />
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            enableRotate={true}
            autoRotate={false}
            minDistance={3}
            maxDistance={8}
            minPolarAngle={0}
            maxPolarAngle={Math.PI / 2}
          />

          <ambientLight intensity={0.5} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            intensity={1}
            castShadow
          />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />

          <FurnitureModel />

          <ContactShadows
            position={[0, -0.8, 0]}
            opacity={0.4}
            scale={10}
            blur={2}
            far={4}
          />

          <Environment preset="city" />
        </Canvas>

        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10">
          <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Sürükleyerek döndürün
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleARView}
            className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg shadow-lg hover:bg-primary-dark transition-colors"
          >
            <Camera className="w-4 h-4" />
            <span className="text-sm font-medium">AR ile Gör</span>
          </motion.button>
        </div>

        <div className="absolute top-4 left-4 bg-primary/10 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-primary/20">
          <div className="flex items-center space-x-2">
            <Smartphone className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium text-primary">3D Model</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simple3DViewer;

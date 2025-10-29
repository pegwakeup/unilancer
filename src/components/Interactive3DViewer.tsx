import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';
import { motion } from 'framer-motion';
import { RotateCw, Camera, Maximize2, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import * as THREE from 'three';

const FurnitureModel = ({ rotation, color }: { rotation: [number, number, number]; color: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = rotation[0];
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.z = rotation[2];
    }
  });

  return (
    <group>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.1 : 1}
        position={[0, 0.5, 0]}
      >
        <boxGeometry args={[1.5, 2, 0.8]} />
        <meshStandardMaterial
          color={color}
          roughness={0.3}
          metalness={0.2}
        />
      </mesh>

      <mesh position={[0, -0.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <boxGeometry args={[1.8, 0.8, 0.1]} />
        <meshStandardMaterial
          color={color}
          roughness={0.3}
          metalness={0.2}
        />
      </mesh>

      <mesh position={[-0.7, -0.5, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.6, 16]} />
        <meshStandardMaterial
          color={new THREE.Color(color).multiplyScalar(0.6)}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>
      <mesh position={[0.7, -0.5, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.6, 16]} />
        <meshStandardMaterial
          color={new THREE.Color(color).multiplyScalar(0.6)}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>
      <mesh position={[-0.7, -0.5, 0.35]}>
        <cylinderGeometry args={[0.08, 0.08, 0.6, 16]} />
        <meshStandardMaterial
          color={new THREE.Color(color).multiplyScalar(0.6)}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>
      <mesh position={[0.7, -0.5, 0.35]}>
        <cylinderGeometry args={[0.08, 0.08, 0.6, 16]} />
        <meshStandardMaterial
          color={new THREE.Color(color).multiplyScalar(0.6)}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>
    </group>
  );
};

const ModernChair = ({ rotation, color }: { rotation: [number, number, number]; color: string }) => {
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
      scale={hovered ? 1.05 : 1}
    >
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[1, 0.1, 1]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.1} />
      </mesh>

      <mesh position={[0, 0.8, -0.4]} rotation={[0.2, 0, 0]}>
        <boxGeometry args={[1, 0.8, 0.1]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.1} />
      </mesh>

      <mesh position={[-0.4, 0.1, -0.4]}>
        <cylinderGeometry args={[0.05, 0.05, 0.6, 16]} />
        <meshStandardMaterial
          color={new THREE.Color(color).multiplyScalar(0.5)}
          roughness={0.2}
          metalness={0.7}
        />
      </mesh>
      <mesh position={[0.4, 0.1, -0.4]}>
        <cylinderGeometry args={[0.05, 0.05, 0.6, 16]} />
        <meshStandardMaterial
          color={new THREE.Color(color).multiplyScalar(0.5)}
          roughness={0.2}
          metalness={0.7}
        />
      </mesh>
      <mesh position={[-0.4, 0.1, 0.4]}>
        <cylinderGeometry args={[0.05, 0.05, 0.6, 16]} />
        <meshStandardMaterial
          color={new THREE.Color(color).multiplyScalar(0.5)}
          roughness={0.2}
          metalness={0.7}
        />
      </mesh>
      <mesh position={[0.4, 0.1, 0.4]}>
        <cylinderGeometry args={[0.05, 0.05, 0.6, 16]} />
        <meshStandardMaterial
          color={new THREE.Color(color).multiplyScalar(0.5)}
          roughness={0.2}
          metalness={0.7}
        />
      </mesh>
    </group>
  );
};

const ModernTable = ({ rotation, color }: { rotation: [number, number, number]; color: string }) => {
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
      scale={hovered ? 1.05 : 1}
    >
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[2.5, 0.1, 1.5]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.2} />
      </mesh>

      <mesh position={[-1, 0, -0.6]}>
        <cylinderGeometry args={[0.06, 0.06, 1, 16]} />
        <meshStandardMaterial
          color={new THREE.Color(color).multiplyScalar(0.6)}
          roughness={0.2}
          metalness={0.6}
        />
      </mesh>
      <mesh position={[1, 0, -0.6]}>
        <cylinderGeometry args={[0.06, 0.06, 1, 16]} />
        <meshStandardMaterial
          color={new THREE.Color(color).multiplyScalar(0.6)}
          roughness={0.2}
          metalness={0.6}
        />
      </mesh>
      <mesh position={[-1, 0, 0.6]}>
        <cylinderGeometry args={[0.06, 0.06, 1, 16]} />
        <meshStandardMaterial
          color={new THREE.Color(color).multiplyScalar(0.6)}
          roughness={0.2}
          metalness={0.6}
        />
      </mesh>
      <mesh position={[1, 0, 0.6]}>
        <cylinderGeometry args={[0.06, 0.06, 1, 16]} />
        <meshStandardMaterial
          color={new THREE.Color(color).multiplyScalar(0.6)}
          roughness={0.2}
          metalness={0.6}
        />
      </mesh>
    </group>
  );
};

interface Interactive3DViewerProps {
  className?: string;
}

const Interactive3DViewer: React.FC<Interactive3DViewerProps> = ({ className = '' }) => {
  const [selectedModel, setSelectedModel] = useState<'cabinet' | 'chair' | 'table'>('cabinet');
  const [selectedColor, setSelectedColor] = useState('#5FC8DA');
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const controlsRef = useRef<any>(null);

  const models = {
    cabinet: { component: FurnitureModel, name: 'Modern Dolap' },
    chair: { component: ModernChair, name: 'Modern Sandalye' },
    table: { component: ModernTable, name: 'Modern Masa' }
  };

  const colors = [
    { name: 'Turkuaz', value: '#5FC8DA' },
    { name: 'Kahverengi', value: '#8B4513' },
    { name: 'Gri', value: '#808080' },
    { name: 'Beyaz', value: '#F5F5F5' },
    { name: 'Siyah', value: '#2C2C2C' }
  ];

  const handleReset = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  const ModelComponent = models[selectedModel].component;

  return (
    <div className={`relative w-full h-full ${className}`}>
      <div className="relative w-full h-full min-h-[500px] bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <Canvas shadows>
          <PerspectiveCamera makeDefault position={[0, 2, 5]} />
          <OrbitControls
            ref={controlsRef}
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            autoRotate={isAutoRotate}
            autoRotateSpeed={2}
            minDistance={3}
            maxDistance={10}
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

          <ModelComponent rotation={[0, 0, 0]} color={selectedColor} />

          <ContactShadows
            position={[0, -0.8, 0]}
            opacity={0.4}
            scale={10}
            blur={2}
            far={4}
          />

          <Environment preset="city" />
        </Canvas>

        <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 z-10">
          <div className="flex items-center gap-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Model:</span>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value as any)}
              className="text-sm bg-transparent border-none outline-none cursor-pointer text-slate-900 dark:text-white font-medium"
            >
              {Object.entries(models).map(([key, { name }]) => (
                <option key={key} value={key}>{name}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsAutoRotate(!isAutoRotate)}
              className={`p-2.5 rounded-lg transition-colors shadow-lg ${
                isAutoRotate
                  ? 'bg-primary text-white'
                  : 'bg-white/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200'
              }`}
              title={isAutoRotate ? 'Otomatik Döndürmeyi Durdur' : 'Otomatik Döndürmeyi Başlat'}
            >
              <RotateCw className={`w-5 h-5 ${isAutoRotate ? 'animate-spin' : ''}`} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReset}
              className="p-2.5 bg-white/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-colors shadow-lg"
              title="Görünümü Sıfırla"
            >
              <RotateCcw className="w-5 h-5 text-slate-700 dark:text-slate-200" />
            </motion.button>
          </div>
        </div>

        <div className="absolute bottom-4 left-4 right-4 z-10">
          <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm p-4 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                Renk Seçimi
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {colors.find(c => c.value === selectedColor)?.name}
              </span>
            </div>
            <div className="flex gap-2 flex-wrap">
              {colors.map((color) => (
                <motion.button
                  key={color.value}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedColor(color.value)}
                  className={`w-10 h-10 rounded-full border-2 transition-all ${
                    selectedColor === color.value
                      ? 'border-primary ring-2 ring-primary/30 scale-110'
                      : 'border-slate-300 dark:border-slate-600'
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="absolute top-1/2 right-4 transform -translate-y-1/2 flex flex-col gap-2 z-10">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2.5 bg-white/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-colors shadow-lg"
            title="AR Görünümü"
          >
            <Camera className="w-5 h-5 text-slate-700 dark:text-slate-200" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2.5 bg-white/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-colors shadow-lg"
            title="Tam Ekran"
          >
            <Maximize2 className="w-5 h-5 text-slate-700 dark:text-slate-200" />
          </motion.button>
        </div>

        <div className="absolute bottom-4 right-4 text-xs text-slate-600 dark:text-slate-400 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow">
          Sürükle • Yakınlaştır • Döndür
        </div>
      </div>
    </div>
  );
};

export default Interactive3DViewer;

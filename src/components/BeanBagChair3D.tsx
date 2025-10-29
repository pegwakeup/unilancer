import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw } from 'lucide-react';

const MODEL_URL = 'https://ctncspdgguclpeijikfp.supabase.co/storage/v1/object/public/Landing%20Page/bean-bag-chair.obj';

type LeatherColor = 'brown' | 'black' | 'beige';

const LEATHER_COLORS = {
  brown: {
    name: 'Klasik Kahverengi',
    color: '#8B4513',
    roughness: 0.4,
    metalness: 0.1
  },
  black: {
    name: 'Siyah Deri',
    color: '#1a1a1a',
    roughness: 0.3,
    metalness: 0.2
  },
  beige: {
    name: 'Bej Deri',
    color: '#D2B48C',
    roughness: 0.45,
    metalness: 0.05
  }
};

interface BeanBagModelProps {
  leatherColor: LeatherColor;
}

function BeanBagModel({ leatherColor }: BeanBagModelProps) {
  const obj = useLoader(OBJLoader, MODEL_URL);
  const modelRef = useRef<THREE.Group>(null);
  const animationFrameRef = useRef<number[]>([]);

  useEffect(() => {
    if (modelRef.current) {
      const box = new THREE.Box3().setFromObject(modelRef.current);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());

      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 2.5 / maxDim;

      modelRef.current.scale.setScalar(scale);
      modelRef.current.position.sub(center.multiplyScalar(scale));
      modelRef.current.position.y -= size.y * scale * 0.5;

      modelRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          const leatherConfig = LEATHER_COLORS[leatherColor];
          child.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color(leatherConfig.color),
            roughness: leatherConfig.roughness,
            metalness: leatherConfig.metalness,
            envMapIntensity: 1.2,
            side: THREE.DoubleSide
          });
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
  }, [obj, leatherColor]);

  useEffect(() => {
    animationFrameRef.current.forEach(id => cancelAnimationFrame(id));
    animationFrameRef.current = [];

    if (!modelRef.current) return;

    const meshes: Array<{
      material: THREE.MeshStandardMaterial;
      startColor: THREE.Color;
      targetColor: THREE.Color;
      startRoughness: number;
      startMetalness: number;
      targetRoughness: number;
      targetMetalness: number;
    }> = [];

    const leatherConfig = LEATHER_COLORS[leatherColor];

    modelRef.current.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const material = child.material as THREE.MeshStandardMaterial;
        meshes.push({
          material,
          startColor: material.color.clone(),
          targetColor: new THREE.Color(leatherConfig.color),
          startRoughness: material.roughness,
          startMetalness: material.metalness,
          targetRoughness: leatherConfig.roughness,
          targetMetalness: leatherConfig.metalness,
        });
      }
    });

    const duration = 400;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      meshes.forEach(({ material, startColor, targetColor, startRoughness, startMetalness, targetRoughness, targetMetalness }) => {
        material.color.lerpColors(startColor, targetColor, eased);
        material.roughness = THREE.MathUtils.lerp(startRoughness, targetRoughness, eased);
        material.metalness = THREE.MathUtils.lerp(startMetalness, targetMetalness, eased);
      });

      if (progress < 1) {
        const frameId = requestAnimationFrame(animate);
        animationFrameRef.current.push(frameId);
      }
    };

    animate();

    return () => {
      animationFrameRef.current.forEach(id => cancelAnimationFrame(id));
      animationFrameRef.current = [];
    };
  }, [leatherColor]);

  return (
    <primitive
      ref={modelRef}
      object={obj}
      castShadow
      receiveShadow
    />
  );
}

function LoadingSpinner() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
        <p className="text-primary font-medium">3D Model Yükleniyor...</p>
      </div>
    </div>
  );
}

interface BeanBagChair3DProps {
  className?: string;
  onARClick?: () => void;
}

const BeanBagChair3D: React.FC<BeanBagChair3DProps> = ({ className = '', onARClick }) => {
  const [isRotating, setIsRotating] = useState(true);
  const [leatherColor, setLeatherColor] = useState<LeatherColor>('brown');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const controlsRef = useRef<any>(null);

  const handleCameraReset = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  useEffect(() => {
    const savedColor = localStorage.getItem('beanBagColor') as LeatherColor;
    if (savedColor && LEATHER_COLORS[savedColor]) {
      setLeatherColor(savedColor);
    }
  }, []);

  const handleColorChange = (color: LeatherColor) => {
    setLeatherColor(color);
    localStorage.setItem('beanBagColor', color);
  };

  return (
    <div className={`relative w-full h-[500px] md:h-[600px] lg:h-[650px] ${className}`}>
      <Canvas
        shadows
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance'
        }}
        frameloop="demand"
        className="touch-none"
      >
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={60} />

        <ambientLight intensity={0.6} />
        <hemisphereLight intensity={0.5} groundColor="#444444" />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1.5}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <directionalLight position={[-10, -10, -5]} intensity={0.4} />
        <spotLight position={[0, 10, 0]} intensity={0.8} angle={0.3} penumbra={1} castShadow />
        <spotLight position={[5, 5, 5]} intensity={0.6} angle={0.4} penumbra={1} color="#fff8e1" />

        <Suspense fallback={null}>
          <BeanBagModel leatherColor={leatherColor} />
          <Environment preset="warehouse" />
        </Suspense>

        <OrbitControls
          ref={controlsRef}
          enablePan={false}
          enableZoom={false}
          autoRotate={isRotating}
          autoRotateSpeed={1.5}
          onStart={() => setIsRotating(false)}
          onEnd={() => {
            setTimeout(() => setIsRotating(true), 2000);
          }}
        />
      </Canvas>

      <Suspense fallback={<LoadingSpinner />}>
        <div />
      </Suspense>

      {isRotating && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-primary/20 backdrop-blur-sm px-4 py-2 md:px-6 md:py-3 rounded-full text-xs md:text-sm text-primary font-medium whitespace-nowrap pointer-events-none z-10"
        >
          Sürükleyerek döndürün
        </motion.div>
      )}

      <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowColorPicker(!showColorPicker)}
          className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-800 text-slate-900 dark:text-white p-2.5 md:p-3 rounded-lg font-semibold shadow-lg transition-all touch-manipulation"
          title="Renk Değiştir"
        >
          <div
            className="w-5 h-5 md:w-6 md:h-6 rounded-full border-2 border-white shadow-md"
            style={{ backgroundColor: LEATHER_COLORS[leatherColor].color }}
          />
        </motion.button>

        <AnimatePresence>
          {showColorPicker && (
            <motion.div
              initial={{ opacity: 0, x: -20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -20, scale: 0.9 }}
              className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-lg p-3 shadow-2xl border border-slate-200 dark:border-white/10"
            >
              <p className="text-xs font-semibold text-slate-700 dark:text-gray-300 mb-2">Deri Rengi</p>
              <div className="flex flex-col gap-2">
                {(Object.keys(LEATHER_COLORS) as LeatherColor[]).map((color) => (
                  <button
                    key={color}
                    onClick={() => handleColorChange(color)}
                    className={`flex items-center gap-2 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors ${
                      leatherColor === color ? 'ring-2 ring-primary' : ''
                    }`}
                  >
                    <div
                      className="w-8 h-8 rounded-full border-2 border-white shadow-md"
                      style={{ backgroundColor: LEATHER_COLORS[color].color }}
                    />
                    <span className="text-xs font-medium text-slate-700 dark:text-gray-300 whitespace-nowrap">
                      {LEATHER_COLORS[color].name}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCameraReset}
          className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-800 text-slate-900 dark:text-white p-2.5 md:p-3 rounded-lg shadow-lg transition-all touch-manipulation"
          title="Sıfırla"
        >
          <RotateCcw className="w-4 h-4 md:w-5 md:h-5" />
        </motion.button>
      </div>

      {onARClick && (
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onARClick}
          className="absolute top-4 right-4 bg-primary hover:bg-primary/90 text-white px-4 py-2.5 md:px-6 md:py-3 rounded-full font-semibold shadow-lg flex items-center gap-2 z-10 transition-colors touch-manipulation"
        >
          <svg
            className="w-4 h-4 md:w-5 md:h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          <span className="text-sm md:text-base">AR ile Görüntüle</span>
        </motion.button>
      )}
    </div>
  );
};

export default BeanBagChair3D;

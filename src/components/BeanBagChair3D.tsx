import React, { Suspense, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { motion } from 'framer-motion';

const MODEL_URL = 'https://ctncspdgguclpeijikfp.supabase.co/storage/v1/object/public/Landing%20Page/bean-bag-chair.obj';
const MTL_URL = 'https://ctncspdgguclpeijikfp.supabase.co/storage/v1/object/public/Landing%20Page/bean-bag-chair.mtl';

function BeanBagModel() {
  const materials = useLoader(MTLLoader, MTL_URL);
  const obj = useLoader(OBJLoader, MODEL_URL, (loader) => {
    materials.preload();
    loader.setMaterials(materials);
  });

  const modelRef = useRef<THREE.Group>(null);

  React.useEffect(() => {
    if (modelRef.current) {
      const box = new THREE.Box3().setFromObject(modelRef.current);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());

      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 2 / maxDim;

      modelRef.current.scale.setScalar(scale);
      modelRef.current.position.sub(center.multiplyScalar(scale));
      modelRef.current.position.y -= size.y * scale * 0.5;
    }
  }, [obj]);

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

  return (
    <div className={`relative w-full h-full ${className}`}>
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        className="touch-none"
      >
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />

        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <directionalLight position={[-10, -10, -5]} intensity={0.3} />
        <spotLight position={[0, 10, 0]} intensity={0.5} angle={0.3} penumbra={1} />

        <Suspense fallback={null}>
          <BeanBagModel />
          <Environment preset="studio" />
        </Suspense>

        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minDistance={3}
          maxDistance={8}
          autoRotate={isRotating}
          autoRotateSpeed={2}
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
          className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-primary/20 backdrop-blur-sm px-6 py-3 rounded-full text-sm text-primary font-medium whitespace-nowrap pointer-events-none z-10"
        >
          Sürükleyerek döndürün • Scroll ile zoom
        </motion.div>
      )}

      {onARClick && (
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onARClick}
          className="absolute top-4 right-4 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full font-semibold shadow-lg flex items-center gap-2 z-10 transition-colors"
        >
          <svg
            className="w-5 h-5"
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
          AR ile Görüntüle
        </motion.button>
      )}
    </div>
  );
};

export default BeanBagChair3D;

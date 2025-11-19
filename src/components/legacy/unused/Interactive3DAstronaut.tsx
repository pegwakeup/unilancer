// LEGACY / UNUSED COMPONENT
// Şu anda projede kullanılmıyor, gelecekte referans için saklanıyor.

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Interactive3DAstronautProps {
  className?: string;
}

const Interactive3DAstronaut: React.FC<Interactive3DAstronautProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });
  const [autoRotate, setAutoRotate] = useState(true);

  // Auto-rotation effect
  useEffect(() => {
    if (!autoRotate) return;

    const interval = setInterval(() => {
      setRotation(prev => ({
        ...prev,
        y: (prev.y + 0.5) % 360
      }));
    }, 20);

    return () => clearInterval(interval);
  }, [autoRotate]);

  // Mouse/Touch handlers
  const handleStart = (clientX: number, clientY: number) => {
    setIsDragging(true);
    setAutoRotate(false);
    setLastPosition({ x: clientX, y: clientY });
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!isDragging) return;

    const deltaX = clientX - lastPosition.x;
    const deltaY = clientY - lastPosition.y;

    setRotation(prev => ({
      x: Math.max(-45, Math.min(45, prev.x - deltaY * 0.5)),
      y: (prev.y + deltaX * 0.5) % 360
    }));

    setLastPosition({ x: clientX, y: clientY });
  };

  const handleEnd = () => {
    setIsDragging(false);
    // Resume auto-rotation after 2 seconds of inactivity
    setTimeout(() => {
      if (!isDragging) {
        setAutoRotate(true);
      }
    }, 2000);
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      handleStart(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      handleMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging) {
        handleEnd();
      }
    };

    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, [isDragging]);

  return (
    <div
      ref={containerRef}
      className={`relative select-none cursor-grab active:cursor-grabbing ${className}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ touchAction: 'none' }}
    >
      <div
        className="relative w-full h-full flex items-center justify-center"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transformStyle: 'preserve-3d',
          transition: isDragging ? 'none' : 'transform 0.1s ease-out'
        }}
      >
        {/* 3D Astronaut Image Model */}
        <img
          src="https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=800&auto=format&fit=crop&q=80"
          alt="Astronaut 3D Model"
          className="w-full h-full object-contain drop-shadow-2xl"
          style={{
            filter: 'drop-shadow(0 25px 50px rgba(95, 200, 218, 0.4))',
            pointerEvents: 'none'
          }}
          draggable={false}
        />
      </div>

      {/* Interaction Hint */}
      {autoRotate && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-primary/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-primary font-medium whitespace-nowrap"
        >
          Sürükleyerek döndürün
        </motion.div>
      )}
    </div>
  );
};

export default Interactive3DAstronaut;

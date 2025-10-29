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
        className="relative transition-transform duration-100"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transformStyle: 'preserve-3d',
          perspective: '1000px'
        }}
      >
        {/* Astronaut SVG Model */}
        <svg
          viewBox="0 0 400 600"
          className="w-full h-full drop-shadow-2xl"
          style={{ filter: 'drop-shadow(0 20px 40px rgba(95, 200, 218, 0.3))' }}
        >
          {/* Helmet */}
          <ellipse
            cx="200"
            cy="150"
            rx="90"
            ry="95"
            fill="rgba(255, 255, 255, 0.15)"
            stroke="#5FC8DA"
            strokeWidth="3"
            style={{ transform: 'translateZ(20px)' }}
          />

          {/* Helmet Glass */}
          <ellipse
            cx="200"
            cy="145"
            rx="70"
            ry="75"
            fill="rgba(95, 200, 218, 0.4)"
            stroke="#7DD4E3"
            strokeWidth="2"
          />

          {/* Helmet Reflection */}
          <ellipse
            cx="180"
            cy="130"
            rx="25"
            ry="30"
            fill="rgba(255, 255, 255, 0.6)"
            opacity="0.7"
          />

          {/* Body/Suit */}
          <rect
            x="130"
            y="230"
            width="140"
            height="180"
            rx="30"
            fill="rgba(255, 255, 255, 0.2)"
            stroke="#5FC8DA"
            strokeWidth="3"
          />

          {/* Chest Panel */}
          <rect
            x="160"
            y="260"
            width="80"
            height="100"
            rx="10"
            fill="rgba(95, 200, 218, 0.3)"
            stroke="#7DD4E3"
            strokeWidth="2"
          />

          {/* Control Panel Details */}
          <circle cx="180" cy="290" r="8" fill="#5FC8DA" opacity="0.8" />
          <circle cx="220" cy="290" r="8" fill="#7DD4E3" opacity="0.8" />
          <rect x="170" y="315" width="60" height="4" rx="2" fill="#5FC8DA" opacity="0.6" />
          <rect x="170" y="330" width="60" height="4" rx="2" fill="#7DD4E3" opacity="0.6" />

          {/* Left Arm */}
          <g transform="translate(-10, 0)">
            <rect
              x="70"
              y="250"
              width="60"
              height="120"
              rx="25"
              fill="rgba(255, 255, 255, 0.18)"
              stroke="#5FC8DA"
              strokeWidth="2.5"
            />
            {/* Left Glove */}
            <ellipse
              cx="100"
              cy="385"
              rx="35"
              ry="30"
              fill="rgba(255, 255, 255, 0.25)"
              stroke="#7DD4E3"
              strokeWidth="2.5"
            />
          </g>

          {/* Right Arm */}
          <g transform="translate(10, 0)">
            <rect
              x="270"
              y="250"
              width="60"
              height="120"
              rx="25"
              fill="rgba(255, 255, 255, 0.18)"
              stroke="#5FC8DA"
              strokeWidth="2.5"
            />
            {/* Right Glove */}
            <ellipse
              cx="300"
              cy="385"
              rx="35"
              ry="30"
              fill="rgba(255, 255, 255, 0.25)"
              stroke="#7DD4E3"
              strokeWidth="2.5"
            />
          </g>

          {/* Left Leg */}
          <rect
            x="150"
            y="410"
            width="50"
            height="130"
            rx="20"
            fill="rgba(255, 255, 255, 0.18)"
            stroke="#5FC8DA"
            strokeWidth="2.5"
          />

          {/* Left Boot */}
          <ellipse
            cx="175"
            cy="550"
            rx="40"
            ry="25"
            fill="rgba(255, 255, 255, 0.25)"
            stroke="#7DD4E3"
            strokeWidth="2.5"
          />

          {/* Right Leg */}
          <rect
            x="200"
            y="410"
            width="50"
            height="130"
            rx="20"
            fill="rgba(255, 255, 255, 0.18)"
            stroke="#5FC8DA"
            strokeWidth="2.5"
          />

          {/* Right Boot */}
          <ellipse
            cx="225"
            cy="550"
            rx="40"
            ry="25"
            fill="rgba(255, 255, 255, 0.25)"
            stroke="#7DD4E3"
            strokeWidth="2.5"
          />

          {/* Backpack/Life Support */}
          <rect
            x="120"
            y="240"
            width="160"
            height="100"
            rx="15"
            fill="rgba(95, 200, 218, 0.15)"
            stroke="#5FC8DA"
            strokeWidth="2"
            opacity="0.5"
            style={{ transform: 'translateZ(-30px)' }}
          />

          {/* Antenna */}
          <line
            x1="200"
            y1="80"
            x2="200"
            y2="55"
            stroke="#5FC8DA"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="200" cy="50" r="8" fill="#7DD4E3" opacity="0.9" />

          {/* Antenna Signal Rings */}
          <circle
            cx="200"
            cy="50"
            r="15"
            fill="none"
            stroke="#7DD4E3"
            strokeWidth="1.5"
            opacity="0.4"
            className="animate-ping"
            style={{ animationDuration: '2s' }}
          />
        </svg>
      </div>

      {/* Interaction Hint */}
      {autoRotate && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-primary/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-primary font-medium"
        >
          Sürükleyerek döndürün
        </motion.div>
      )}
    </div>
  );
};

export default Interactive3DAstronaut;

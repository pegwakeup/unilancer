import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { OptimizedSpline } from './optimized-spline';

interface Animated3DModelProps {
  scene: string;
  className?: string;
  showControls?: boolean;
}

export function Animated3DModel({ scene, className, showControls = true }: Animated3DModelProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, -10, 0]
      }}
      transition={{
        opacity: { duration: 0.6 },
        scale: { duration: 0.6 },
        y: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }}
    >
      <div className="relative w-full h-full">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-3xl blur-3xl"
          animate={{
            scale: isHovered ? 1.1 : 1,
            opacity: isHovered ? 0.6 : 0.3
          }}
          transition={{ duration: 0.3 }}
        />

        <div className="relative z-10 w-full h-full rounded-3xl overflow-hidden backdrop-blur-sm bg-white/5 border border-white/10">
          <OptimizedSpline
            scene={scene}
            className="w-full h-full"
            fallbackImage="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h=800&fit=crop"
          />
        </div>

        {showControls && (
          <motion.div
            className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <div className="flex items-center gap-4 text-white text-sm font-medium">
              <span className="flex items-center gap-2">
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  🔄
                </motion.span>
                Sürükle
              </span>
              <span className="w-px h-4 bg-white/30" />
              <span className="flex items-center gap-2">
                🔍 Yakınlaştır
              </span>
              <span className="w-px h-4 bg-white/30" />
              <span className="flex items-center gap-2">
                👆 Tıkla
              </span>
            </div>
          </motion.div>
        )}

        <div className="absolute top-6 right-6 flex flex-col gap-2">
          {[
            { emoji: '🎯', label: 'Interactive' },
            { emoji: '⚡', label: 'Fast' },
            { emoji: '📱', label: 'Mobile Ready' }
          ].map((badge, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <span>{badge.emoji}</span>
              <span className="text-white text-sm font-medium">{badge.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

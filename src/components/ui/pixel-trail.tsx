import React, { useCallback, useMemo, useRef } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { v4 as uuidv4 } from "uuid";
import { cn } from "../../lib/utils";

interface PixelTrailProps {
  pixelSize: number;
  fadeDuration?: number;
  delay?: number;
  className?: string;
  pixelClassName?: string;
}

export const PixelTrail: React.FC<PixelTrailProps> = ({
  pixelSize = 20,
  fadeDuration = 500,
  delay = 0,
  className,
  pixelClassName,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trailId = useRef(uuidv4());

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.floor((e.clientX - rect.left) / pixelSize);
      const y = Math.floor((e.clientY - rect.top) / pixelSize);

      const pixelElement = document.getElementById(
        `${trailId.current}-pixel-${x}-${y}`
      );
      if (pixelElement) {
        const animatePixel = (pixelElement as any).__animatePixel;
        if (animatePixel) animatePixel();
      }
    },
    [pixelSize]
  );

  const { width, height } = useMemo(() => {
    if (!containerRef.current) return { width: 0, height: 0 };
    const rect = containerRef.current.getBoundingClientRect();
    return {
      width: rect.width,
      height: rect.height
    };
  }, []);

  const columns = useMemo(
    () => Math.ceil(width / pixelSize),
    [width, pixelSize]
  );
  const rows = useMemo(
    () => Math.ceil(height / pixelSize),
    [height, pixelSize]
  );

  return (
    <div
      ref={containerRef}
      className={cn("absolute inset-0 w-full h-full pointer-events-auto", className)}
      onMouseMove={handleMouseMove}
    >
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <PixelDot
              key={`${colIndex}-${rowIndex}`}
              id={`${trailId.current}-pixel-${colIndex}-${rowIndex}`}
              size={pixelSize}
              fadeDuration={fadeDuration}
              delay={delay}
              className={pixelClassName}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

interface PixelDotProps {
  id: string;
  size: number;
  fadeDuration: number;
  delay: number;
  className?: string;
}

const PixelDot: React.FC<PixelDotProps> = React.memo(
  ({ id, size, fadeDuration, delay, className }) => {
    const controls = useAnimationControls();

    const animatePixel = useCallback(() => {
      controls.start({
        opacity: [1, 0],
        transition: { duration: fadeDuration / 1000, delay: delay / 1000 },
      });
    }, [controls, fadeDuration, delay]);

    const ref = useCallback(
      (node: HTMLDivElement | null) => {
        if (node) {
          (node as any).__animatePixel = animatePixel;
        }
      },
      [animatePixel]
    );

    return (
      <motion.div
        id={id}
        ref={ref}
        className={cn("cursor-pointer-none", className)}
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
        initial={{ opacity: 0 }}
        animate={controls}
      />
    );
  }
);

PixelDot.displayName = "PixelDot";
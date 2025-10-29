import { Suspense, lazy, useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, AlertCircle } from 'lucide-react';

const Spline = lazy(() => import('@splinetool/react-spline'));

interface OptimizedSplineProps {
  scene: string;
  className?: string;
  fallbackImage?: string;
  lowPerformanceThreshold?: number;
}

const LoadingState = () => (
  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center space-y-4"
    >
      <div className="relative">
        <Loader2 className="w-16 h-16 text-blue-400 animate-spin" />
        <div className="absolute inset-0 blur-xl bg-blue-400/30 animate-pulse" />
      </div>
      <p className="text-white text-lg font-medium">Loading 3D Scene...</p>
      <div className="w-64 h-2 bg-slate-700 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 3, ease: 'easeInOut' }}
        />
      </div>
    </motion.div>
  </div>
);

const ErrorState = ({ onRetry }: { onRetry: () => void }) => (
  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center space-y-4 max-w-md mx-auto px-4"
    >
      <AlertCircle className="w-16 h-16 text-red-400" />
      <h3 className="text-white text-xl font-semibold text-center">
        3D Scene Failed to Load
      </h3>
      <p className="text-gray-400 text-center">
        The 3D scene couldn't be loaded. This might be due to network issues or browser compatibility.
      </p>
      <button
        onClick={onRetry}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
      >
        Try Again
      </button>
    </motion.div>
  </div>
);

export function OptimizedSpline({
  scene,
  className,
  fallbackImage,
  lowPerformanceThreshold = 30
}: OptimizedSplineProps) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isLowPerformance, setIsLowPerformance] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const fps = Math.round(
      1000 / (performance.now() - (performance.timing?.navigationStart || 0))
    );

    if (fps < lowPerformanceThreshold) {
      setIsLowPerformance(true);
    }
  }, [lowPerformanceThreshold]);

  useEffect(() => {
    if (isLowPerformance) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !shouldLoad) {
            setShouldLoad(true);
            observerRef.current?.disconnect();
          }
        });
      },
      {
        root: null,
        rootMargin: '100px',
        threshold: 0.1
      }
    );

    if (containerRef.current) {
      observerRef.current.observe(containerRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [shouldLoad, isLowPerformance]);

  const handleRetry = () => {
    setHasError(false);
    setShouldLoad(false);
    setTimeout(() => setShouldLoad(true), 100);
  };

  const handleError = () => {
    setHasError(true);
  };

  if (isLowPerformance && fallbackImage) {
    return (
      <div ref={containerRef} className={className}>
        <div className="w-full h-full relative">
          <img
            src={fallbackImage}
            alt="3D Scene Preview"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="text-center text-white p-6">
              <p className="mb-4">3D rendering disabled for optimal performance</p>
              <button
                onClick={() => setIsLowPerformance(false)}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
              >
                Enable 3D Anyway
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={className}>
      <AnimatePresence mode="wait">
        {!shouldLoad ? (
          <motion.div
            key="placeholder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800"
          >
            <div className="text-center text-white">
              <Loader2 className="w-12 h-12 mx-auto mb-4 text-blue-400 animate-spin" />
              <p>Scroll down to load 3D scene</p>
            </div>
          </motion.div>
        ) : hasError ? (
          <ErrorState onRetry={handleRetry} />
        ) : (
          <motion.div
            key="spline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full"
          >
            <Suspense fallback={<LoadingState />}>
              <div className="w-full h-full" onError={handleError}>
                <Spline scene={scene} className="w-full h-full" />
              </div>
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

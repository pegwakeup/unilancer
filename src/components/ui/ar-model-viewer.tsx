import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Smartphone, AlertCircle, CheckCircle2, X } from 'lucide-react';

interface ARModelViewerProps {
  src: string;
  alt?: string;
  poster?: string;
  className?: string;
}

export function ARModelViewer({ src, alt = '3D Model', poster, className }: ARModelViewerProps) {
  const viewerRef = useRef<HTMLDivElement>(null);
  const [isARSupported, setIsARSupported] = useState<boolean | null>(null);
  const [showARInstructions, setShowARInstructions] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkARSupport = async () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isIOS = /iphone|ipad|ipod/.test(userAgent);
      const isAndroid = /android/.test(userAgent);

      if (isIOS) {
        const iosVersion = parseFloat(
          ('' + (/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(userAgent) || [0,''])[1])
            .replace('undefined', '3_2').replace('_', '.').replace('_', '')
        ) || false;
        setIsARSupported(iosVersion && iosVersion >= 12);
      } else if (isAndroid) {
        setIsARSupported('xr' in navigator);
      } else {
        setIsARSupported(false);
      }
    };

    checkARSupport();

    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js';
    script.onload = () => setIsLoading(false);
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const handleARClick = () => {
    setShowARInstructions(true);
  };

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center bg-slate-900 ${className}`}>
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p>Loading AR Viewer...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <model-viewer
        ref={viewerRef as any}
        src={src}
        alt={alt}
        poster={poster}
        ar
        ar-modes="webxr scene-viewer quick-look"
        camera-controls
        touch-action="pan-y"
        auto-rotate
        shadow-intensity="1"
        shadow-softness="0.5"
        exposure="1"
        environment-image="neutral"
        style={{
          width: '100%',
          height: '100%',
          background: 'transparent'
        }}
      />

      {isARSupported === false && (
        <div className="absolute top-4 left-4 right-4 bg-yellow-500/90 backdrop-blur-sm text-white px-4 py-3 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-semibold mb-1">AR Desteklenmiyor</p>
            <p className="opacity-90">Bu cihaz AR özelliğini desteklemiyor. iOS 12+ veya AR destekli Android cihaz gerekiyor.</p>
          </div>
        </div>
      )}

      {isARSupported && (
        <button
          onClick={handleARClick}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold shadow-lg flex items-center gap-2 transition-all hover:scale-105"
        >
          <Camera className="w-5 h-5" />
          AR ile Görüntüle
        </button>
      )}

      <AnimatePresence>
        {showARInstructions && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 z-50"
            onClick={() => setShowARInstructions(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-slate-800 rounded-2xl p-8 max-w-md w-full"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">AR Görüntüleme</h3>
                <button
                  onClick={() => setShowARInstructions(false)}
                  className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white mb-1">
                      Adım 1: AR Butonuna Tıklayın
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Aşağıdaki "AR ile Görüntüle" butonuna tıklayın
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white mb-1">
                      Adım 2: Kamera İzni Verin
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Tarayıcı kamera erişimi istediğinde "İzin Ver"e tıklayın
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white mb-1">
                      Adım 3: Yüzeyi Tarayın
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Cihazınızı düz bir yüzeye doğrultun ve tarayın
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white mb-1">
                      Adım 4: Modeli Yerleştirin
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Ekrandaki işarete dokunarak 3D modeli yerleştirin
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Smartphone className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                      Desteklenen Cihazlar
                    </p>
                    <p className="text-blue-700 dark:text-blue-300">
                      iOS 12+ (iPhone/iPad) veya ARCore destekli Android cihazlar
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowARInstructions(false)}
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                Anladım
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': any;
    }
  }
}

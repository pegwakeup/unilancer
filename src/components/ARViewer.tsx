import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Smartphone, Camera } from 'lucide-react';
import ModelViewer from './ModelViewer';

interface ARViewerProps {
  isOpen: boolean;
  onClose: () => void;
  modelUrl?: string;
}

const ARViewer: React.FC<ARViewerProps> = ({ isOpen, onClose, modelUrl }) => {
  const [showQRCode, setShowQRCode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [modelError, setModelError] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
      const isMobileDevice = /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      setIsMobile(isMobileDevice);
    };

    checkDevice();
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setShowQRCode(false);
      setModelError(false);
    }
  }, [isOpen]);

  const currentUrl = window.location.href;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(currentUrl)}`;

  const handleModelError = () => {
    setModelError(true);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl max-w-2xl w-full p-4 md:p-8 relative border border-primary/20 shadow-2xl mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 md:top-4 md:right-4 text-gray-400 hover:text-white transition-colors p-2 touch-manipulation"
          >
            <X className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          <div className="text-center mb-6 md:mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-primary/20 rounded-full mb-3 md:mb-4">
              <Camera className="w-6 h-6 md:w-8 md:h-8 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              AR Görüntüleme
            </h2>
            <p className="text-sm md:text-base text-gray-400 px-4">
              Ürünü kendi mekanınızda sanki oradaymış gibi görün
            </p>
          </div>

          {!showQRCode ? (
            <div className="space-y-4 md:space-y-6">
              {modelError && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-center">
                  <p className="text-red-400 text-sm">Model yüklenemedi. Lütfen sayfayı yenileyin.</p>
                </div>
              )}

              {isMobile && modelUrl ? (
                <>
                  <div className="bg-slate-800/50 border border-primary/10 rounded-xl p-4 md:p-6 overflow-hidden">
                    <h3 className="text-lg md:text-xl font-semibold text-white mb-3 text-center">Önizleme</h3>
                    <div className="w-full h-64 md:h-80 rounded-lg overflow-hidden">
                      <ModelViewer
                        src={modelUrl}
                        alt="3D Model Önizleme"
                        ar={true}
                        arModes="webxr scene-viewer quick-look"
                        arScale="auto"
                        cameraControls={true}
                        autoRotate={true}
                        shadowIntensity={1}
                        exposure={1}
                        className="w-full h-full"
                        onError={handleModelError}
                      />
                    </div>
                  </div>

                  <div className="bg-slate-800/50 border border-primary/10 rounded-xl p-4 md:p-6">
                    <h3 className="text-lg md:text-xl font-semibold text-white mb-3">Nasıl Çalışır?</h3>
                    <ol className="space-y-2 md:space-y-3 text-sm md:text-base text-gray-300">
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-primary/20 text-primary rounded-full flex items-center justify-center text-sm font-bold">1</span>
                        <span>Model önizlemesinde AR ikonuna dokunun</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-primary/20 text-primary rounded-full flex items-center justify-center text-sm font-bold">2</span>
                        <span>Kameranızın açılmasına izin verin</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-primary/20 text-primary rounded-full flex items-center justify-center text-sm font-bold">3</span>
                        <span>Düz bir yüzey bulun ve ürünü yerleştirin</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-primary/20 text-primary rounded-full flex items-center justify-center text-sm font-bold">4</span>
                        <span>Etrafında dolaşarak her açıdan inceleyin</span>
                      </li>
                    </ol>
                  </div>

                  <div className="text-center text-sm text-gray-500">
                    <p>iOS Quick Look ve Android Scene Viewer ile uyumlu</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-slate-800/50 border border-yellow-500/20 rounded-xl p-4 md:p-6">
                    <div className="flex gap-3 mb-3">
                      <Smartphone className="w-5 h-5 md:w-6 md:h-6 text-yellow-500 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg md:text-xl font-semibold text-white mb-2">Mobil Cihaz Gerekli</h3>
                        <p className="text-sm md:text-base text-gray-300">
                          AR özelliğini kullanmak için bir mobil cihaza ihtiyacınız var.
                          QR kodu telefonunuzla tarayın veya bu sayfayı mobil cihazınızda açın.
                        </p>
                      </div>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowQRCode(true)}
                    className="w-full bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-600 text-white font-bold py-3 md:py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 md:gap-3 touch-manipulation"
                  >
                    <Camera className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="text-sm md:text-base">QR Kodu Göster</span>
                  </motion.button>

                  <div className="text-center text-sm text-gray-500">
                    <p>iPhone, iPad veya Android cihaz gereklidir</p>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="space-y-4 md:space-y-6">
              <div className="bg-white p-4 md:p-6 rounded-xl flex flex-col items-center">
                <img
                  src={qrCodeUrl}
                  alt="QR Code"
                  className="w-48 h-48 md:w-64 md:h-64 mb-3 md:mb-4"
                />
                <p className="text-gray-700 text-center font-medium text-sm md:text-base">
                  Bu QR kodu mobil cihazınızla tarayın
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowQRCode(false)}
                className="w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 md:py-4 rounded-xl transition-all touch-manipulation"
              >
                <span className="text-sm md:text-base">Geri Dön</span>
              </motion.button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ARViewer;

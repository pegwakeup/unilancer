import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Smartphone, Camera, Sparkles, Hand, Eye, Move, CheckCircle2 } from 'lucide-react';
import ModelViewer from './ModelViewer';

interface ARViewerProps {
  isOpen: boolean;
  onClose: () => void;
  modelUrl?: string;
  currentColor?: string;
  colorName?: string;
}

const ARViewer: React.FC<ARViewerProps> = ({ isOpen, onClose, modelUrl, currentColor = '#1a1a1a', colorName = 'Siyah' }) => {
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
        className="fixed inset-0 bg-slate-950/95 backdrop-blur-md z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 rounded-3xl max-w-3xl w-full p-6 md:p-8 relative border border-slate-200 dark:border-primary/20 shadow-2xl mx-4 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5 pointer-events-none" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 md:top-6 md:right-6 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-full touch-manipulation z-10"
          >
            <X className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          <div className="text-center mb-6 md:mb-8 relative">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-primary to-blue-500 rounded-2xl md:rounded-3xl mb-4 md:mb-5 shadow-lg shadow-primary/30"
            >
              <Camera className="w-8 h-8 md:w-10 md:h-10 text-white" />
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 bg-clip-text text-transparent">
              AR Görüntüleme
            </h2>
            <p className="text-sm md:text-base text-slate-600 dark:text-gray-400 px-4 max-w-md mx-auto">
              Ürünü kendi mekanınızda artırılmış gerçeklik ile deneyimleyin
            </p>

            {currentColor && (
              <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-white/10 shadow-sm">
                <div
                  className="w-5 h-5 rounded-full border-2 border-white shadow-md"
                  style={{ backgroundColor: currentColor }}
                />
                <span className="text-sm font-medium text-slate-700 dark:text-gray-300">{colorName} Renk Seçili</span>
              </div>
            )}
          </div>

          {!showQRCode ? (
            <div className="space-y-4 md:space-y-6 relative">
              {modelError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl p-4 text-center"
                >
                  <p className="text-red-600 dark:text-red-400 text-sm font-medium">Model yüklenemedi. Lütfen sayfayı yenileyin.</p>
                </motion.div>
              )}

              {isMobile && modelUrl ? (
                <>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-800/50 dark:to-slate-900/50 border border-slate-200 dark:border-primary/10 rounded-2xl p-4 md:p-6 overflow-hidden shadow-lg"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <Eye className="w-5 h-5 text-primary" />
                        3D Önizleme
                      </h3>
                      <div className="px-3 py-1 bg-primary/10 rounded-full">
                        <span className="text-xs font-semibold text-primary">360°</span>
                      </div>
                    </div>
                    <div className="w-full h-64 md:h-80 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-white/5">
                      <ModelViewer
                        src={modelUrl}
                        alt="3D Model Önizleme"
                        ar={true}
                        arModes="webxr scene-viewer quick-look"
                        arScale="auto"
                        cameraControls={true}
                        autoRotate={true}
                        shadowIntensity={1.2}
                        exposure={1.2}
                        skyboxImage="neutral"
                        toneMapping="commerce"
                        shadowSoftness={1}
                        className="w-full h-full"
                        onError={handleModelError}
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-800/50 dark:to-slate-900/50 border border-slate-200 dark:border-primary/10 rounded-2xl p-4 md:p-6 shadow-lg"
                  >
                    <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-primary" />
                      Nasıl Çalışır?
                    </h3>
                    <div className="grid grid-cols-1 gap-3 md:gap-4">
                      <div className="flex gap-3 items-start p-3 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 hover:border-primary/30 dark:hover:border-primary/30 transition-colors">
                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-primary to-blue-500 text-white rounded-lg flex items-center justify-center text-sm font-bold shadow-md">
                          <Hand className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900 dark:text-white mb-1">Adım 1</p>
                          <p className="text-xs md:text-sm text-slate-600 dark:text-gray-300">Model önizlemesinde AR ikonuna dokunun</p>
                        </div>
                      </div>
                      <div className="flex gap-3 items-start p-3 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 hover:border-primary/30 dark:hover:border-primary/30 transition-colors">
                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-primary to-blue-500 text-white rounded-lg flex items-center justify-center text-sm font-bold shadow-md">
                          <Camera className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900 dark:text-white mb-1">Adım 2</p>
                          <p className="text-xs md:text-sm text-slate-600 dark:text-gray-300">Kameranızın açılmasına izin verin</p>
                        </div>
                      </div>
                      <div className="flex gap-3 items-start p-3 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 hover:border-primary/30 dark:hover:border-primary/30 transition-colors">
                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-primary to-blue-500 text-white rounded-lg flex items-center justify-center text-sm font-bold shadow-md">
                          <Move className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900 dark:text-white mb-1">Adım 3</p>
                          <p className="text-xs md:text-sm text-slate-600 dark:text-gray-300">Düz bir yüzey bulun ve ürünü yerleştirin</p>
                        </div>
                      </div>
                      <div className="flex gap-3 items-start p-3 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 hover:border-primary/30 dark:hover:border-primary/30 transition-colors">
                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-primary to-blue-500 text-white rounded-lg flex items-center justify-center text-sm font-bold shadow-md">
                          <Eye className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900 dark:text-white mb-1">Adım 4</p>
                          <p className="text-xs md:text-sm text-slate-600 dark:text-gray-300">Etrafında dolaşarak her açıdan inceleyin</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center justify-center gap-2 text-xs md:text-sm text-slate-500 dark:text-gray-500"
                  >
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <p>iOS Quick Look ve Android Scene Viewer ile uyumlu</p>
                  </motion.div>
                </>
              ) : (
                <>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-yellow-900/20 dark:to-amber-900/20 border border-amber-200 dark:border-yellow-500/20 rounded-2xl p-4 md:p-6 shadow-lg"
                  >
                    <div className="flex gap-3 mb-3">
                      <div className="flex-shrink-0 w-10 h-10 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                        <Smartphone className="w-5 h-5 md:w-6 md:h-6 text-yellow-600 dark:text-yellow-500" />
                      </div>
                      <div>
                        <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-2">Mobil Cihaz Gerekli</h3>
                        <p className="text-sm md:text-base text-slate-700 dark:text-gray-300">
                          AR özelliğini kullanmak için bir mobil cihaza ihtiyacınız var.
                          QR kodu telefonunuzla tarayın veya bu sayfayı mobil cihazınızda açın.
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(95, 200, 218, 0.3)" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowQRCode(true)}
                    className="w-full bg-gradient-to-r from-primary via-blue-500 to-blue-600 hover:from-primary/90 hover:via-blue-500/90 hover:to-blue-600/90 text-white font-bold py-4 md:py-5 rounded-2xl shadow-lg shadow-primary/30 transition-all flex items-center justify-center gap-2 md:gap-3 touch-manipulation relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    <Camera className="w-5 h-5 md:w-6 md:h-6 relative z-10" />
                    <span className="text-base md:text-lg relative z-10">QR Kodu Göster</span>
                  </motion.button>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center justify-center gap-2 text-xs md:text-sm text-slate-500 dark:text-gray-500"
                  >
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <p>iPhone, iPad veya Android cihaz gereklidir</p>
                  </motion.div>
                </>
              )}
            </div>
          ) : (
            <div className="space-y-4 md:space-y-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", damping: 20 }}
                className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-2xl flex flex-col items-center shadow-xl border border-slate-200 dark:border-white/10"
              >
                <div className="mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary to-blue-500 rounded-xl shadow-lg">
                    <Smartphone className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="p-4 bg-white rounded-xl shadow-inner mb-4">
                  <img
                    src={qrCodeUrl}
                    alt="QR Code"
                    className="w-48 h-48 md:w-64 md:h-64"
                  />
                </div>
                <p className="text-slate-700 dark:text-gray-300 text-center font-semibold text-sm md:text-base mb-2">
                  Bu QR kodu mobil cihazınızla tarayın
                </p>
                <p className="text-xs md:text-sm text-slate-500 dark:text-gray-500 text-center">
                  Telefonunuzun kamerasını QR koda tutun
                </p>
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowQRCode(false)}
                className="w-full bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-white font-bold py-3 md:py-4 rounded-xl transition-all touch-manipulation border border-slate-300 dark:border-slate-600"
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

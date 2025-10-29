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
  const [modelLoading, setModelLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);

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
      setModelLoading(true);
      setLoadProgress(0);
    } else {
      setModelLoading(true);
      setModelError(false);
    }
  }, [isOpen]);

  const currentUrl = window.location.href;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(currentUrl)}`;

  const handleModelError = (error: any) => {
    console.error('AR Viewer Model Error:', error);
    setModelError(true);
    setModelLoading(false);
  };

  const handleModelLoad = () => {
    setModelError(false);
    setModelLoading(false);
    setLoadProgress(100);
  };

  const handleModelProgress = (progress: number) => {
    setLoadProgress(progress);
    if (progress >= 100) {
      setModelLoading(false);
    }
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
          className="bg-gradient-to-br from-white via-slate-50/50 to-white dark:from-slate-900 dark:via-slate-800/50 dark:to-slate-900 rounded-2xl max-w-4xl w-full p-8 md:p-10 relative border border-primary/20 dark:border-primary/30 shadow-2xl mx-4 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-primary/5 pointer-events-none" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <button
            onClick={onClose}
            className="absolute top-6 right-6 md:top-8 md:right-8 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-all p-2.5 hover:bg-white/80 dark:hover:bg-white/10 rounded-xl shadow-lg hover:shadow-xl touch-manipulation z-10 backdrop-blur-sm border border-slate-200/50 dark:border-white/10"
          >
            <X className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          <div className="text-center mb-8 md:mb-10 relative">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.15, type: "spring", stiffness: 150, damping: 15 }}
              className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-primary via-primary to-blue-500 rounded-2xl md:rounded-3xl mb-5 md:mb-6 shadow-xl shadow-primary/40 relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl md:rounded-3xl" />
              <Camera className="w-9 h-9 md:w-11 md:h-11 text-white relative z-10" />
            </motion.div>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
              AR Görüntüleme
            </h2>
            <p className="text-base md:text-lg text-slate-600 dark:text-gray-300 px-4 max-w-lg mx-auto leading-relaxed">
              Ürünü kendi mekanınızda artırılmış gerçeklik ile deneyimleyin
            </p>

            {currentColor && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-5 inline-flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-white to-slate-50 dark:from-slate-800 dark:to-slate-700 rounded-full border border-primary/20 dark:border-primary/30 shadow-lg"
              >
                <div
                  className="w-6 h-6 rounded-full border-2 border-white dark:border-slate-600 shadow-md ring-2 ring-primary/20"
                  style={{ backgroundColor: currentColor }}
                />
                <span className="text-sm font-semibold text-slate-800 dark:text-gray-200">{colorName} Renk Seçili</span>
              </motion.div>
            )}
          </div>

          {!showQRCode ? (
            <div className="space-y-5 md:space-y-7 relative">
              {modelError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-r from-red-50 to-red-100/50 dark:from-red-500/10 dark:to-red-500/5 border-2 border-red-300 dark:border-red-500/30 rounded-xl p-5 text-center shadow-lg"
                >
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <X className="w-6 h-6 text-red-600 dark:text-red-400" />
                  </div>
                  <p className="text-red-700 dark:text-red-300 text-base font-semibold mb-2">Model Yüklenemedi</p>
                  <p className="text-red-600 dark:text-red-400 text-sm">Lütfen internet bağlantınızı kontrol edip tekrar deneyin</p>
                </motion.div>
              )}

              {isMobile && modelUrl ? (
                <>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-gradient-to-br from-white via-slate-50/30 to-white dark:from-slate-800/70 dark:via-slate-800/50 dark:to-slate-900/70 border-2 border-primary/20 dark:border-primary/30 rounded-2xl p-5 md:p-7 overflow-hidden shadow-xl backdrop-blur-sm"
                  >
                    <div className="flex items-center justify-between mb-5">
                      <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
                        <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Eye className="w-5 h-5 text-primary" />
                        </div>
                        3D Önizleme
                      </h3>
                      <div className="px-4 py-1.5 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-full border border-primary/30">
                        <span className="text-xs font-bold text-primary">360°</span>
                      </div>
                    </div>
                    <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200/50 dark:from-slate-900/70 dark:to-slate-900/50 border-2 border-slate-200 dark:border-white/10 shadow-inner">
                      {modelLoading && !modelError && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm z-10">
                          <div className="text-center">
                            <div className="relative w-16 h-16 mx-auto mb-3">
                              <svg className="w-16 h-16 transform -rotate-90">
                                <circle
                                  cx="32"
                                  cy="32"
                                  r="28"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                  fill="none"
                                  className="text-primary/20"
                                />
                                <circle
                                  cx="32"
                                  cy="32"
                                  r="28"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                  fill="none"
                                  strokeDasharray={`${2 * Math.PI * 28}`}
                                  strokeDashoffset={`${2 * Math.PI * 28 * (1 - loadProgress / 100)}`}
                                  className="text-primary transition-all duration-300"
                                  strokeLinecap="round"
                                />
                              </svg>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-sm font-bold text-primary">{loadProgress}%</span>
                              </div>
                            </div>
                            <p className="text-sm font-semibold text-primary">Model Yükleniyor...</p>
                          </div>
                        </div>
                      )}
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
                        onLoad={handleModelLoad}
                        onError={handleModelError}
                        onProgress={handleModelProgress}
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gradient-to-br from-white via-slate-50/30 to-white dark:from-slate-800/70 dark:via-slate-800/50 dark:to-slate-900/70 border-2 border-slate-200 dark:border-primary/20 rounded-2xl p-5 md:p-7 shadow-xl backdrop-blur-sm"
                  >
                    <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-5 flex items-center gap-2.5">
                      <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-primary" />
                      </div>
                      Nasıl Çalışır?
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="flex gap-4 items-start p-4 rounded-xl bg-gradient-to-r from-white to-slate-50/50 dark:from-slate-800/50 dark:to-slate-700/50 border-2 border-slate-200 dark:border-white/10 hover:border-primary/40 dark:hover:border-primary/40 transition-all hover:shadow-md">
                        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary via-primary to-blue-500 text-white rounded-xl flex items-center justify-center shadow-lg">
                          <Hand className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-base font-bold text-slate-900 dark:text-white mb-1.5">Adım 1</p>
                          <p className="text-sm text-slate-600 dark:text-gray-300 leading-relaxed">Model önizlemesinde AR ikonuna dokunun</p>
                        </div>
                      </div>
                      <div className="flex gap-4 items-start p-4 rounded-xl bg-gradient-to-r from-white to-slate-50/50 dark:from-slate-800/50 dark:to-slate-700/50 border-2 border-slate-200 dark:border-white/10 hover:border-primary/40 dark:hover:border-primary/40 transition-all hover:shadow-md">
                        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary via-primary to-blue-500 text-white rounded-xl flex items-center justify-center shadow-lg">
                          <Camera className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-base font-bold text-slate-900 dark:text-white mb-1.5">Adım 2</p>
                          <p className="text-sm text-slate-600 dark:text-gray-300 leading-relaxed">Kameranızın açılmasına izin verin</p>
                        </div>
                      </div>
                      <div className="flex gap-4 items-start p-4 rounded-xl bg-gradient-to-r from-white to-slate-50/50 dark:from-slate-800/50 dark:to-slate-700/50 border-2 border-slate-200 dark:border-white/10 hover:border-primary/40 dark:hover:border-primary/40 transition-all hover:shadow-md">
                        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary via-primary to-blue-500 text-white rounded-xl flex items-center justify-center shadow-lg">
                          <Move className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-base font-bold text-slate-900 dark:text-white mb-1.5">Adım 3</p>
                          <p className="text-sm text-slate-600 dark:text-gray-300 leading-relaxed">Düz bir yüzey bulun ve ürünü yerleştirin</p>
                        </div>
                      </div>
                      <div className="flex gap-4 items-start p-4 rounded-xl bg-gradient-to-r from-white to-slate-50/50 dark:from-slate-800/50 dark:to-slate-700/50 border-2 border-slate-200 dark:border-white/10 hover:border-primary/40 dark:hover:border-primary/40 transition-all hover:shadow-md">
                        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary via-primary to-blue-500 text-white rounded-xl flex items-center justify-center shadow-lg">
                          <Eye className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-base font-bold text-slate-900 dark:text-white mb-1.5">Adım 4</p>
                          <p className="text-sm text-slate-600 dark:text-gray-300 leading-relaxed">Etrafında dolaşarak her açıdan inceleyin</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center justify-center gap-2.5 px-4 py-2.5 bg-primary/5 border border-primary/20 rounded-xl"
                  >
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <p className="text-sm font-medium text-slate-700 dark:text-gray-300">iOS Quick Look ve Android Scene Viewer ile uyumlu</p>
                  </motion.div>
                </>
              ) : (
                <>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-amber-50 via-yellow-50/50 to-orange-50/30 dark:from-yellow-900/20 dark:via-amber-900/20 dark:to-yellow-800/10 border-2 border-amber-300 dark:border-yellow-500/30 rounded-2xl p-5 md:p-7 shadow-xl"
                  >
                    <div className="flex gap-4 mb-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                        <Smartphone className="w-6 h-6 md:w-7 md:h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-2.5">Mobil Cihaz Gerekli</h3>
                        <p className="text-base text-slate-700 dark:text-gray-300 leading-relaxed">
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
                    whileHover={{ scale: 1.02, boxShadow: "0 25px 50px rgba(95, 200, 218, 0.4)" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowQRCode(true)}
                    className="w-full bg-gradient-to-r from-primary via-blue-500 to-blue-600 hover:from-primary hover:via-blue-500 hover:to-blue-600 text-white font-bold py-5 md:py-6 rounded-2xl shadow-2xl shadow-primary/40 transition-all flex items-center justify-center gap-3 touch-manipulation relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    <Camera className="w-6 h-6 md:w-7 md:h-7 relative z-10" />
                    <span className="text-lg md:text-xl relative z-10">QR Kodu Göster</span>
                  </motion.button>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center justify-center gap-2.5 px-4 py-2.5 bg-primary/5 border border-primary/20 rounded-xl"
                  >
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <p className="text-sm font-medium text-slate-700 dark:text-gray-300">iPhone, iPad veya Android cihaz gereklidir</p>
                  </motion.div>
                </>
              )}
            </div>
          ) : (
            <div className="space-y-6 md:space-y-7">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", damping: 20 }}
                className="bg-gradient-to-br from-white via-slate-50/30 to-white dark:from-slate-800/70 dark:via-slate-800/50 dark:to-slate-900/70 p-8 md:p-10 rounded-2xl flex flex-col items-center shadow-2xl border-2 border-primary/20 dark:border-primary/30 backdrop-blur-sm"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: "spring" }}
                  className="mb-6"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary via-primary to-blue-500 rounded-2xl shadow-xl relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl" />
                    <Smartphone className="w-8 h-8 text-white relative z-10" />
                  </div>
                </motion.div>
                <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl shadow-lg mb-6 border-2 border-slate-200 dark:border-white/10">
                  <img
                    src={qrCodeUrl}
                    alt="QR Code"
                    className="w-56 h-56 md:w-72 md:h-72"
                  />
                </div>
                <p className="text-slate-900 dark:text-white text-center font-bold text-lg md:text-xl mb-2">
                  Bu QR kodu mobil cihazınızla tarayın
                </p>
                <p className="text-sm md:text-base text-slate-600 dark:text-gray-400 text-center max-w-sm">
                  Telefonunuzun kamerasını QR koda tutun ve AR deneyimini başlatın
                </p>
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowQRCode(false)}
                className="w-full bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 hover:from-slate-200 hover:to-slate-300 dark:hover:from-slate-600 dark:hover:to-slate-500 text-slate-900 dark:text-white font-bold py-4 md:py-5 rounded-xl transition-all touch-manipulation border-2 border-slate-300 dark:border-slate-500 shadow-lg"
              >
                <span className="text-base md:text-lg">Geri Dön</span>
              </motion.button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ARViewer;

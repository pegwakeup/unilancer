import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Smartphone, Camera, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';

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
  const [isARSupported, setIsARSupported] = useState(false);
  const [deviceType, setDeviceType] = useState<'ios' | 'android' | 'other'>('other');

  useEffect(() => {
    const checkDevice = () => {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
      const isMobileDevice = /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      const isIOS = /iPhone|iPad|iPod/i.test(userAgent);
      const isAndroid = /Android/i.test(userAgent);

      setIsMobile(isMobileDevice);

      if (isIOS) {
        setDeviceType('ios');
        setIsARSupported(true);
      } else if (isAndroid) {
        setDeviceType('android');
        setIsARSupported(true);
      } else {
        setDeviceType('other');
        setIsARSupported(false);
      }
    };

    checkDevice();
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setShowQRCode(false);
    }
  }, [isOpen]);

  const currentUrl = window.location.href;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(currentUrl)}`;

  const handleARActivation = () => {
    if (!modelUrl) return;

    const link = document.createElement('a');
    link.href = modelUrl;
    link.rel = 'ar';
    link.download = '';

    const img = document.createElement('img');
    link.appendChild(img);

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
          className="bg-gradient-to-br from-white via-slate-50/50 to-white dark:from-slate-900 dark:via-slate-800/50 dark:to-slate-900 rounded-xl md:rounded-2xl max-w-lg md:max-w-2xl w-full max-h-[90vh] overflow-y-auto p-4 sm:p-6 md:p-8 relative border border-primary/20 dark:border-primary/30 shadow-2xl mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-primary/5 pointer-events-none" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary-light/10 rounded-full blur-3xl pointer-events-none" />

          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-all p-2 sm:p-2.5 hover:bg-white/80 dark:hover:bg-white/10 rounded-lg shadow-lg hover:shadow-xl touch-manipulation z-10 backdrop-blur-sm border border-slate-200/50 dark:border-white/10"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <div className="text-center mb-6 sm:mb-8 relative">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.15, type: "spring", stiffness: 150, damping: 15 }}
              className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-primary via-primary to-primary-light rounded-2xl mb-4 sm:mb-5 shadow-xl shadow-primary/40 relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl" />
              <Camera className="w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11 text-white relative z-10" />
            </motion.div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-4 tracking-tight px-2">
              AR Görüntüleme
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-gray-300 px-4 max-w-md mx-auto leading-relaxed">
              Ürünü kendi mekanınızda artırılmış gerçeklik ile deneyimleyin
            </p>

            {currentColor && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-4 sm:mt-5 inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-white to-slate-50 dark:from-slate-800 dark:to-slate-700 rounded-full border border-primary/20 dark:border-primary/30 shadow-lg"
              >
                <div
                  className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-white dark:border-slate-600 shadow-md ring-2 ring-primary/20"
                  style={{ backgroundColor: currentColor }}
                />
                <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-gray-200">{colorName} Renk Seçili</span>
              </motion.div>
            )}
          </div>

          {!showQRCode ? (
            <div className="space-y-4 sm:space-y-5 relative">

              {isMobile && isARSupported && modelUrl ? (
                <>
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    whileHover={{ scale: 1.02, boxShadow: "0 20px 50px rgba(95, 200, 218, 0.3)" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleARActivation}
                    className="w-full bg-gradient-to-r from-primary via-primary to-primary-light hover:from-primary/90 hover:via-primary/90 hover:to-primary-light/90 text-white font-bold py-5 sm:py-6 rounded-xl shadow-2xl shadow-primary/40 transition-all flex items-center justify-center gap-3 touch-manipulation relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    <Camera className="w-6 h-6 sm:w-7 sm:h-7 relative z-10" />
                    <span className="text-base sm:text-lg relative z-10">
                      {deviceType === 'ios' ? 'AR Kamerayı Aç' : 'AR ile Görüntüle'}
                    </span>
                  </motion.button>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gradient-to-br from-white via-slate-50/30 to-white dark:from-slate-800/70 dark:via-slate-800/50 dark:to-slate-900/70 border-2 border-slate-200 dark:border-primary/20 rounded-xl p-4 sm:p-5 shadow-xl backdrop-blur-sm"
                  >
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                      </div>
                      Nasıl Çalışır?
                    </h3>
                    <div className="space-y-3">
                      <div className="flex gap-3 items-start p-3 rounded-lg bg-gradient-to-r from-white to-slate-50/50 dark:from-slate-800/50 dark:to-slate-700/50 border border-slate-200 dark:border-white/10">
                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-primary to-primary-light text-white rounded-lg flex items-center justify-center text-sm font-bold shadow-md">
                          1
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900 dark:text-white mb-1">AR Butonu</p>
                          <p className="text-xs sm:text-sm text-slate-600 dark:text-gray-300 leading-relaxed">Yukarıdaki butona dokunun</p>
                        </div>
                      </div>
                      <div className="flex gap-3 items-start p-3 rounded-lg bg-gradient-to-r from-white to-slate-50/50 dark:from-slate-800/50 dark:to-slate-700/50 border border-slate-200 dark:border-white/10">
                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-primary to-primary-light text-white rounded-lg flex items-center justify-center text-sm font-bold shadow-md">
                          2
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900 dark:text-white mb-1">Kamera İzni</p>
                          <p className="text-xs sm:text-sm text-slate-600 dark:text-gray-300 leading-relaxed">Kamera erişimine izin verin</p>
                        </div>
                      </div>
                      <div className="flex gap-3 items-start p-3 rounded-lg bg-gradient-to-r from-white to-slate-50/50 dark:from-slate-800/50 dark:to-slate-700/50 border border-slate-200 dark:border-white/10">
                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-primary to-primary-light text-white rounded-lg flex items-center justify-center text-sm font-bold shadow-md">
                          3
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900 dark:text-white mb-1">Yerleştirin</p>
                          <p className="text-xs sm:text-sm text-slate-600 dark:text-gray-300 leading-relaxed">Düz bir yüzeye yerleştirin</p>
                        </div>
                      </div>
                      <div className="flex gap-3 items-start p-3 rounded-lg bg-gradient-to-r from-white to-slate-50/50 dark:from-slate-800/50 dark:to-slate-700/50 border border-slate-200 dark:border-white/10">
                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-primary to-primary-light text-white rounded-lg flex items-center justify-center text-sm font-bold shadow-md">
                          4
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900 dark:text-white mb-1">İnceleyin</p>
                          <p className="text-xs sm:text-sm text-slate-600 dark:text-gray-300 leading-relaxed">Her açıdan inceleyebilirsiniz</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center justify-center gap-2 px-3 py-2 bg-primary/5 border border-primary/20 rounded-lg"
                  >
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                    <p className="text-xs sm:text-sm font-medium text-slate-700 dark:text-gray-300 text-center">
                      {deviceType === 'ios' ? 'iOS Quick Look' : 'Android Scene Viewer'} desteği
                    </p>
                  </motion.div>
                </>
              ) : isMobile && !isARSupported ? (
                <>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-amber-50 via-yellow-50/50 to-orange-50/30 dark:from-yellow-900/20 dark:via-amber-900/20 dark:to-yellow-800/10 border-2 border-amber-300 dark:border-yellow-500/30 rounded-xl p-4 sm:p-5 shadow-xl"
                  >
                    <div className="flex gap-3 sm:gap-4 items-start">
                      <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                        <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">AR Desteklenmiyor</h3>
                        <p className="text-sm sm:text-base text-slate-700 dark:text-gray-300 leading-relaxed">
                          Cihazınız AR özelliğini desteklemiyor. iOS veya Android cihaz kullanmanız gerekmektedir.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </>
              ) : (
                <>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-amber-50 via-yellow-50/50 to-orange-50/30 dark:from-yellow-900/20 dark:via-amber-900/20 dark:to-yellow-800/10 border-2 border-amber-300 dark:border-yellow-500/30 rounded-xl p-4 sm:p-5 shadow-xl"
                  >
                    <div className="flex gap-3 sm:gap-4">
                      <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                        <Smartphone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">Mobil Cihaz Gerekli</h3>
                        <p className="text-sm sm:text-base text-slate-700 dark:text-gray-300 leading-relaxed">
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
                    className="w-full bg-gradient-to-r from-primary via-primary to-primary-light hover:from-primary/90 hover:via-primary/90 hover:to-primary-light/90 text-white font-bold py-5 sm:py-6 rounded-xl shadow-2xl shadow-primary/40 transition-all flex items-center justify-center gap-3 touch-manipulation relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    <Camera className="w-6 h-6 sm:w-7 sm:h-7 relative z-10" />
                    <span className="text-base sm:text-lg relative z-10">QR Kodu Göster</span>
                  </motion.button>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center justify-center gap-2 px-3 py-2 bg-primary/5 border border-primary/20 rounded-lg"
                  >
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                    <p className="text-xs sm:text-sm font-medium text-slate-700 dark:text-gray-300 text-center">iPhone, iPad veya Android cihaz gereklidir</p>
                  </motion.div>
                </>
              )}
            </div>
          ) : (
            <div className="space-y-5 sm:space-y-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", damping: 20 }}
                className="bg-gradient-to-br from-white via-slate-50/30 to-white dark:from-slate-800/70 dark:via-slate-800/50 dark:to-slate-900/70 p-6 sm:p-8 rounded-xl flex flex-col items-center shadow-2xl border-2 border-primary/20 dark:border-primary/30 backdrop-blur-sm"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: "spring" }}
                  className="mb-5 sm:mb-6"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-primary via-primary to-primary-light rounded-2xl shadow-xl relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl" />
                    <Smartphone className="w-7 h-7 sm:w-8 sm:h-8 text-white relative z-10" />
                  </div>
                </motion.div>
                <div className="p-4 sm:p-5 bg-white dark:bg-slate-900 rounded-2xl shadow-lg mb-5 sm:mb-6 border-2 border-slate-200 dark:border-white/10">
                  <img
                    src={qrCodeUrl}
                    alt="QR Code"
                    className="w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72"
                  />
                </div>
                <p className="text-slate-900 dark:text-white text-center font-bold text-base sm:text-lg md:text-xl mb-2">
                  Bu QR kodu mobil cihazınızla tarayın
                </p>
                <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-gray-400 text-center max-w-sm px-4">
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
                className="w-full bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 hover:from-slate-200 hover:to-slate-300 dark:hover:from-slate-600 dark:hover:to-slate-500 text-slate-900 dark:text-white font-bold py-4 sm:py-5 rounded-xl transition-all touch-manipulation border-2 border-slate-300 dark:border-slate-500 shadow-lg"
              >
                <span className="text-sm sm:text-base md:text-lg">Geri Dön</span>
              </motion.button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ARViewer;

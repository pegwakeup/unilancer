import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Smartphone, Camera, Download } from 'lucide-react';

interface ARViewerProps {
  isOpen: boolean;
  onClose: () => void;
  modelUrl?: string;
}

const ARViewer: React.FC<ARViewerProps> = ({ isOpen, onClose, modelUrl }) => {
  const [isARSupported, setIsARSupported] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkARSupport = () => {
      const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      setIsMobile(isMobileDevice);

      const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
      const isAndroid = /Android/i.test(navigator.userAgent);

      setIsARSupported(isIOS || isAndroid);
    };

    checkARSupport();
  }, []);

  const currentUrl = window.location.href;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(currentUrl)}`;

  const handleARLaunch = () => {
    if (!modelUrl) {
      alert('Model URL not available. AR viewing requires GLB/GLTF format.');
      return;
    }

    if (isMobile) {
      const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

      if (isIOS) {
        window.location.href = modelUrl;
      } else {
        const sceneViewerUrl = `intent://arvr.google.com/scene-viewer/1.0?file=${encodeURIComponent(modelUrl)}&mode=ar_preferred#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=${encodeURIComponent(window.location.href)};end;`;
        window.location.href = sceneViewerUrl;
      }
    } else {
      setShowQRCode(true);
    }
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
          className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl max-w-2xl w-full p-8 relative border border-primary/20 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-4">
              <Camera className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">AR Görüntüleme</h2>
            <p className="text-gray-400">
              Ürünü kendi mekanınızda sanki oradaymış gibi görün
            </p>
          </div>

          {!showQRCode ? (
            <div className="space-y-6">
              {isARSupported && isMobile ? (
                <>
                  <div className="bg-slate-800/50 border border-primary/10 rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-white mb-3">Nasıl Çalışır?</h3>
                    <ol className="space-y-3 text-gray-300">
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-primary/20 text-primary rounded-full flex items-center justify-center text-sm font-bold">1</span>
                        <span>"AR'ı Başlat" butonuna dokunun</span>
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

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleARLaunch}
                    className="w-full bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-600 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-3"
                  >
                    <Camera className="w-5 h-5" />
                    AR'ı Başlat
                  </motion.button>
                </>
              ) : (
                <>
                  <div className="bg-slate-800/50 border border-yellow-500/20 rounded-xl p-6">
                    <div className="flex gap-3 mb-3">
                      <Smartphone className="w-6 h-6 text-yellow-500 flex-shrink-0" />
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">Mobil Cihaz Gerekli</h3>
                        <p className="text-gray-300">
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
                    className="w-full bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-600 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-3"
                  >
                    <Download className="w-5 h-5" />
                    QR Kodu Göster
                  </motion.button>
                </>
              )}

              <div className="text-center text-sm text-gray-500">
                {isARSupported && isMobile ? (
                  <p>iOS Quick Look ve Android Scene Viewer desteklenir</p>
                ) : (
                  <p>iPhone, iPad veya Android cihaz gereklidir</p>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl flex flex-col items-center">
                <img
                  src={qrCodeUrl}
                  alt="QR Code"
                  className="w-64 h-64 mb-4"
                />
                <p className="text-gray-700 text-center font-medium">
                  Bu QR kodu mobil cihazınızla tarayın
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowQRCode(false)}
                className="w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-4 rounded-xl transition-all"
              >
                Geri Dön
              </motion.button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ARViewer;

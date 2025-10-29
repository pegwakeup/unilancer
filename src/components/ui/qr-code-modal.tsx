import { motion, AnimatePresence } from 'framer-motion';
import { X, QrCode, Smartphone, Download, Share2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  url?: string;
}

export function QRCodeModal({ isOpen, onClose, url }: QRCodeModalProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const pageUrl = url || window.location.href;

  useEffect(() => {
    if (isOpen) {
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(pageUrl)}`;
      setQrCodeUrl(qrUrl);
    }
  }, [isOpen, pageUrl]);

  const handleDownload = async () => {
    try {
      const response = await fetch(qrCodeUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'ar-experience-qr.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('QR kod indirme hatası:', error);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'AR Deneyimi',
          text: 'Bu QR kodu tarayarak AR deneyimini başlatın!',
          url: pageUrl
        });
      } catch (error) {
        console.error('Paylaşım hatası:', error);
      }
    } else {
      navigator.clipboard.writeText(pageUrl);
      alert('Link panoya kopyalandı!');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden"
          >
            <div className="relative bg-gradient-to-r from-cyan-600 to-blue-600 p-8 text-white">
              <button
                onClick={onClose}
                className="absolute top-6 right-6 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex items-center gap-4 mb-3">
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                  <QrCode className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">QR Kod</h2>
                  <p className="text-cyan-100">Telefondan Anında Eriş</p>
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-800 rounded-2xl p-8 mb-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-xl p-6 shadow-lg mx-auto w-fit"
                >
                  {qrCodeUrl ? (
                    <img
                      src={qrCodeUrl}
                      alt="QR Code"
                      className="w-64 h-64 mx-auto"
                    />
                  ) : (
                    <div className="w-64 h-64 flex items-center justify-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
                    </div>
                  )}
                </motion.div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                  <Smartphone className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-semibold text-slate-900 dark:text-white mb-1">
                      Nasıl Kullanılır?
                    </p>
                    <ol className="text-slate-700 dark:text-slate-300 space-y-1">
                      <li>1. Telefonunuzun kamera uygulamasını açın</li>
                      <li>2. QR kodu kameranıza tutun</li>
                      <li>3. Çıkan bildirimine dokunun</li>
                      <li>4. AR deneyimi otomatik başlayacak</li>
                    </ol>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={handleDownload}
                  className="px-6 py-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700"
                >
                  <Download className="w-5 h-5" />
                  İndir
                </button>
                <button
                  onClick={handleShare}
                  className="px-6 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <Share2 className="w-5 h-5" />
                  Paylaş
                </button>
              </div>

              <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
                QR kod herhangi bir cihazdan taranabilir
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

import { motion, AnimatePresence } from 'framer-motion';
import { X, Smartphone, Camera, Scan, CheckCircle2, Apple, Wifi } from 'lucide-react';
import { useState } from 'react';

interface ARInstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ARInstructionsModal({ isOpen, onClose }: ARInstructionsModalProps) {
  const [activeTab, setActiveTab] = useState<'ios' | 'android'>('ios');

  const iosSteps = [
    {
      icon: Camera,
      title: 'AR Butonuna Tıklayın',
      description: 'Sayfadaki parlayan "AR ile Görüntüle" butonuna dokunun',
      detail: 'Buton otomatik olarak cihazınızı algılayacak ve AR modunu başlatacak'
    },
    {
      icon: CheckCircle2,
      title: 'İzin Verin',
      description: 'Kamera erişimi için "İzin Ver" seçeneğini seçin',
      detail: 'Safari tarayıcısı kamera izni istediğinde onaylayın'
    },
    {
      icon: Scan,
      title: 'Yüzeyi Tarayın',
      description: 'Cihazınızı düz bir yüzeye (zemin, masa) doğrultun',
      detail: 'Yavaşça hareket ettirin, sarı noktalar görene kadar bekleyin'
    },
    {
      icon: Smartphone,
      title: 'Modeli Yerleştirin',
      description: 'Ekrana dokunarak 3D modeli istediğiniz yere koyun',
      detail: 'İki parmakla yakınlaştırabilir, tek parmakla döndürebilirsiniz'
    }
  ];

  const androidSteps = [
    {
      icon: Camera,
      title: 'AR Modu Başlatın',
      description: '"AR ile Görüntüle" butonuna basın',
      detail: 'Chrome veya ARCore uyumlu tarayıcı kullandığınızdan emin olun'
    },
    {
      icon: CheckCircle2,
      title: 'ARCore İzinleri',
      description: 'Kamera ve konum izinlerini onaylayın',
      detail: 'Google Play Services ARCore güncel olmalı'
    },
    {
      icon: Scan,
      title: 'Ortam Taraması',
      description: 'Telefonu yavaşça hareket ettirerek ortamı tarayın',
      detail: 'İyi aydınlatılmış, desenli yüzeyler daha iyi çalışır'
    },
    {
      icon: Smartphone,
      title: 'Yerleştir ve Etkileş',
      description: 'Dokunarak modeli yerleştirin, sürükleyerek taşıyın',
      detail: 'Çimdik hareketi ile boyutlandırma yapabilirsiniz'
    }
  ];

  const steps = activeTab === 'ios' ? iosSteps : androidSteps;

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
            className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          >
            <div className="relative bg-gradient-to-r from-blue-600 to-cyan-600 p-8 text-white">
              <button
                onClick={onClose}
                className="absolute top-6 right-6 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="text-4xl font-bold mb-3">AR Kullanım Rehberi</h2>
                <p className="text-blue-100 text-lg">
                  Artırılmış gerçeklik deneyimini başlatmak için aşağıdaki adımları izleyin
                </p>
              </motion.div>
            </div>

            <div className="p-8">
              <div className="flex gap-4 mb-8">
                <button
                  onClick={() => setActiveTab('ios')}
                  className={`flex-1 px-6 py-4 rounded-xl font-semibold flex items-center justify-center gap-3 transition-all ${
                    activeTab === 'ios'
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  <Apple className="w-6 h-6" />
                  iOS (iPhone/iPad)
                </button>
                <button
                  onClick={() => setActiveTab('android')}
                  className={`flex-1 px-6 py-4 rounded-xl font-semibold flex items-center justify-center gap-3 transition-all ${
                    activeTab === 'android'
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  <Wifi className="w-6 h-6" />
                  Android
                </button>
              </div>

              <div className="space-y-6 max-h-[50vh] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700">
                {steps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-6 p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl hover:shadow-lg transition-shadow"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                        {index + 1}
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-2">
                        <div className="w-10 h-10 bg-white dark:bg-slate-700 rounded-xl flex items-center justify-center">
                          <step.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                            {step.title}
                          </h3>
                          <p className="text-slate-700 dark:text-slate-300 mb-2">
                            {step.description}
                          </p>
                          <p className="text-sm text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 px-4 py-2 rounded-lg">
                            💡 {step.detail}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl border border-blue-200 dark:border-blue-800">
                <h4 className="font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  Gereksinimler
                </h4>
                <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                    {activeTab === 'ios' ? 'iOS 12 veya üzeri (iPhone 6s ve sonrası)' : 'ARCore destekli Android cihaz (Android 7.0+)'}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                    {activeTab === 'ios' ? 'Safari tarayıcısı önerilir' : 'Google Chrome veya ARCore uyumlu tarayıcı'}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                    İyi aydınlatma ve düz yüzey
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                    Aktif internet bağlantısı
                  </li>
                </ul>
              </div>

              <button
                onClick={onClose}
                className="w-full mt-6 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl font-semibold text-lg transition-all shadow-lg hover:shadow-xl"
              >
                Anladım, Başlayalım!
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

import { motion } from 'framer-motion';
import { Camera, Smartphone, QrCode, ArrowRight } from 'lucide-react';
import { useState } from 'react';

interface ARAccessButtonProps {
  onOpenInstructions: () => void;
  onShowQR: () => void;
}

export function ARAccessButton({ onOpenInstructions, onShowQR }: ARAccessButtonProps) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="relative">
      <motion.button
        onClick={() => setShowMenu(!showMenu)}
        className="relative px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-2xl font-bold text-lg shadow-2xl flex items-center gap-3 group overflow-hidden"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 opacity-0 group-hover:opacity-20"
          initial={false}
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        <motion.div
          animate={{
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Camera className="w-6 h-6" />
        </motion.div>

        <span className="relative z-10">AR ile Görüntüle</span>

        <motion.div
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowRight className="w-5 h-5" />
        </motion.div>

        <motion.div
          className="absolute inset-0 rounded-2xl"
          animate={{
            boxShadow: [
              '0 0 20px rgba(59, 130, 246, 0.5)',
              '0 0 40px rgba(34, 211, 238, 0.7)',
              '0 0 20px rgba(59, 130, 246, 0.5)'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.button>

      {showMenu && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full mt-4 left-0 right-0 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden z-50"
        >
          <button
            onClick={() => {
              onOpenInstructions();
              setShowMenu(false);
            }}
            className="w-full px-6 py-4 flex items-center gap-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors text-left group"
          >
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Smartphone className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <div className="font-semibold text-slate-900 dark:text-white">Nasıl Kullanılır?</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Adım adım AR rehberi</div>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-400 ml-auto" />
          </button>

          <div className="w-full h-px bg-slate-200 dark:bg-slate-700" />

          <button
            onClick={() => {
              onShowQR();
              setShowMenu(false);
            }}
            className="w-full px-6 py-4 flex items-center gap-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors text-left group"
          >
            <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <QrCode className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
            </div>
            <div>
              <div className="font-semibold text-slate-900 dark:text-white">QR Kod ile Aç</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Telefondan anında eriş</div>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-400 ml-auto" />
          </button>
        </motion.div>
      )}
    </div>
  );
}

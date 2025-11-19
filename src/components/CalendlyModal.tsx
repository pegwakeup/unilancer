import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2 } from 'lucide-react';

interface CalendlyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

declare global {
  interface Window {
    Calendly: {
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement;
        prefill?: Record<string, string>;
        utm?: Record<string, string>;
      }) => void;
    };
  }
}

export const CalendlyModal: React.FC<CalendlyModalProps> = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (isOpen && window.Calendly && !isInitialized) {
      setIsLoading(true);
      const calendlyContainer = document.getElementById('calendly-inline-widget');
      if (calendlyContainer) {
        calendlyContainer.innerHTML = '';

        setTimeout(() => {
          window.Calendly.initInlineWidget({
            url: 'https://calendly.com/taha-unilancerlabs/30min',
            parentElement: calendlyContainer,
          });
          setIsInitialized(true);

          setTimeout(() => {
            setIsLoading(false);
          }, 800);
        }, 100);
      }
    }
  }, [isOpen, isInitialized]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setIsLoading(true);
      setIsInitialized(false);
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-5xl h-[85vh] bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 dark:bg-slate-700/90 hover:bg-white dark:hover:bg-slate-700 transition-colors shadow-lg"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-slate-700 dark:text-gray-300" />
              </button>

              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-[#1a1a1a] z-20">
                  <div className="text-center space-y-4">
                    <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto" />
                    <p className="text-slate-600 dark:text-slate-300 font-medium">Randevu takvimi yükleniyor...</p>
                  </div>
                </div>
              )}

              <div
                id="calendly-inline-widget"
                className={`w-full h-full transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
              />
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CalendlyModal;

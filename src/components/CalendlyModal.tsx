import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

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
  useEffect(() => {
    if (isOpen && window.Calendly) {
      const calendlyContainer = document.getElementById('calendly-inline-widget');
      if (calendlyContainer && calendlyContainer.children.length === 0) {
        window.Calendly.initInlineWidget({
          url: 'https://calendly.com/taha-unilancerlabs/30min',
          parentElement: calendlyContainer,
        });
      }
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
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
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="relative w-full max-w-5xl h-[85vh] bg-white dark:bg-dark-light rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 dark:bg-dark/90 hover:bg-white dark:hover:bg-dark transition-all shadow-lg hover:shadow-xl"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-slate-700 dark:text-gray-300" />
              </button>

              <div
                id="calendly-inline-widget"
                className="w-full h-full"
              />
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

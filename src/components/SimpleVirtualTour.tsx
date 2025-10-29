import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, Utensils, GraduationCap, Factory, Eye } from 'lucide-react';

interface TourOption {
  id: string;
  name: string;
  icon: React.ElementType;
  image: string;
  description: string;
  tourUrl: string;
}

const tourOptions: TourOption[] = [
  {
    id: 'hotel',
    name: 'Otel',
    icon: Building2,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1200',
    description: 'Lüks otel ve konaklama tesisleri için sanal tur çözümleri',
    tourUrl: 'https://kuula.co/share/collection/7l7kL?logo=0&info=0&fs=1&vr=1&sd=1&thumbs=1'
  },
  {
    id: 'restaurant',
    name: 'Restoran',
    icon: Utensils,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1200',
    description: 'Restoran ve kafe mekanları için 360° görüntüleme',
    tourUrl: 'https://kuula.co/share/collection/7l0bn?logo=0&info=0&fs=1&vr=1&sd=1&thumbs=1'
  },
  {
    id: 'school',
    name: 'Okul',
    icon: GraduationCap,
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1200',
    description: 'Eğitim kurumları ve kampüsler için sanal gezinti',
    tourUrl: 'https://kuula.co/share/collection/7l7ny?logo=0&info=0&fs=1&vr=1&sd=1&thumbs=1'
  },
  {
    id: 'factory',
    name: 'Fabrika',
    icon: Factory,
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200',
    description: 'Üretim tesisleri ve endüstriyel alanlar için tur',
    tourUrl: 'https://kuula.co/share/collection/7l0cG?logo=0&info=0&fs=1&vr=1&sd=1&thumbs=1'
  }
];

interface SimpleVirtualTourProps {
  className?: string;
}

const SimpleVirtualTour: React.FC<SimpleVirtualTourProps> = ({ className = '' }) => {
  const [selectedTour, setSelectedTour] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleTourSelect = (tourId: string) => {
    setSelectedTour(tourId);
    setIsFullscreen(true);
  };

  const handleClose = () => {
    setSelectedTour(null);
    setIsFullscreen(false);
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {tourOptions.map((option) => (
          <motion.div
            key={option.id}
            whileHover={{ scale: 1.05, y: -8 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleTourSelect(option.id)}
            className="group cursor-pointer"
          >
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-2 border-slate-200 dark:border-slate-700 hover:border-primary transition-all duration-300">
              <img
                src={option.image}
                alt={option.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/60 to-slate-900/20" />

              <div className="absolute inset-0 flex flex-col items-center justify-end p-6 pb-8">
                <div className="w-16 h-16 bg-primary/30 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary/50 group-hover:scale-110 transition-all duration-300 shadow-xl">
                  <option.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {option.name}
                </h3>
                <p className="text-sm text-gray-100 text-center line-clamp-2 opacity-90 group-hover:opacity-100 transition-opacity px-2">
                  {option.description}
                </p>
              </div>

              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110">
                <div className="bg-primary text-white p-3 rounded-xl shadow-xl">
                  <Eye className="w-5 h-5" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedTour && isFullscreen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-slate-900/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
            className="relative w-full max-w-7xl h-full max-h-[90vh] bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-white dark:from-slate-800 to-transparent p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                    {tourOptions.find(t => t.id === selectedTour)?.name} Sanal Turu
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {tourOptions.find(t => t.id === selectedTour)?.description}
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="flex items-center space-x-2 px-5 py-2.5 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-900 dark:text-white rounded-xl font-medium transition-colors shadow-lg"
                >
                  <span>Kapat</span>
                  <span className="text-xl">×</span>
                </button>
              </div>
            </div>

            <div className="w-full h-full pt-24 pb-16">
              <iframe
                src={tourOptions.find(t => t.id === selectedTour)?.tourUrl}
                className="w-full h-full border-0"
                allowFullScreen
                allow="xr-spatial-tracking; gyroscope; accelerometer"
                title={`${tourOptions.find(t => t.id === selectedTour)?.name} Virtual Tour`}
              />
            </div>

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white dark:from-slate-800 to-transparent p-6">
              <div className="flex items-center justify-center space-x-6 text-sm text-slate-600 dark:text-slate-400">
                <div className="flex items-center space-x-2">
                  <Eye className="w-5 h-5" />
                  <span>360° İnteraktif Görünüm</span>
                </div>
                <span className="hidden md:inline">•</span>
                <span className="hidden md:inline">Mouse ile döndürün ve zoom yapın</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {selectedTour && !isFullscreen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 p-8 bg-white dark:bg-slate-800 rounded-2xl border-2 border-slate-200 dark:border-slate-700 shadow-2xl"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                {tourOptions.find(t => t.id === selectedTour)?.name} Sanal Turu
              </h4>
              <p className="text-base text-slate-600 dark:text-slate-400">
                {tourOptions.find(t => t.id === selectedTour)?.description}
              </p>
            </div>
            <button
              onClick={handleClose}
              className="px-5 py-2.5 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-900 dark:text-white rounded-xl font-medium transition-colors"
            >
              Kapat
            </button>
          </div>
          <div className="relative w-full rounded-xl overflow-hidden shadow-xl" style={{ paddingBottom: '65%' }}>
            <iframe
              src={tourOptions.find(t => t.id === selectedTour)?.tourUrl}
              className="absolute top-0 left-0 w-full h-full border-0"
              allowFullScreen
              allow="xr-spatial-tracking; gyroscope; accelerometer"
              title={`${tourOptions.find(t => t.id === selectedTour)?.name} Virtual Tour`}
            />
          </div>
          <div className="mt-6 flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
            <div className="flex items-center space-x-2">
              <Eye className="w-5 h-5" />
              <span>360° İnteraktif Görünüm</span>
            </div>
            <button
              onClick={() => setIsFullscreen(true)}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium"
            >
              Tam Ekran
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SimpleVirtualTour;

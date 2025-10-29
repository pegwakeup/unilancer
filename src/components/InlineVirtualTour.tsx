import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Maximize2, Navigation, ZoomIn, ZoomOut, RotateCw, Layers } from 'lucide-react';

interface TourLocation {
  id: number;
  name: string;
  category: string;
  thumbnail: string;
  panoramaUrl: string;
  description: string;
}

const tourLocations: TourLocation[] = [
  {
    id: 1,
    name: "Lüks Otel Lobisi",
    category: "Otel",
    thumbnail: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&q=80&w=400",
    panoramaUrl: "https://www.google.com/maps/embed?pb=!4v1234567890!6m8!1m7!1sCAoSLEFGMVFpcE1xOGRkRTNXTmNGNEVYcVZRdmdwVDJPWnF4Vl9aVE9hYmFKdG5Q!2m2!1d41.0082376!2d28.9783589!3f0!4f0!5f0.7820865974627469",
    description: "Modern ve lüks otel lobisi tasarımı - konuklarınıza unutulmaz bir karşılama deneyimi sunun"
  },
  {
    id: 2,
    name: "Modern Ofis Alanı",
    category: "İş Yeri",
    thumbnail: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=400",
    panoramaUrl: "https://www.google.com/maps/embed?pb=!4v1234567891!6m8!1m7!1sCAoSLEFGMVFpcE1xOGRkRTNXTmNGNEVYcVZRdmdwVDJPWnF4Vl9aVE9hYmFKdG5Q!2m2!1d41.0082376!2d28.9783589!3f90!4f0!5f0.7820865974627469",
    description: "Açık planlı modern ofis ortamı - ekip çalışması ve verimlilik için tasarlandı"
  },
  {
    id: 3,
    name: "Üniversite Kampüsü",
    category: "Eğitim",
    thumbnail: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=400",
    panoramaUrl: "https://www.google.com/maps/embed?pb=!4v1234567892!6m8!1m7!1sCAoSLEFGMVFpcE1xOGRkRTNXTmNGNEVYcVZRdmdwVDJPWnF4Vl9aVE9hYmFKdG5Q!2m2!1d41.0082376!2d28.9783589!3f180!4f0!5f0.7820865974627469",
    description: "Yeşil alanlarla çevrili kampüs - öğrencilerinize kampüsü uzaktan tanıtın"
  },
  {
    id: 4,
    name: "Üretim Tesisi",
    category: "Fabrika",
    thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=400",
    panoramaUrl: "https://www.google.com/maps/embed?pb=!4v1234567893!6m8!1m7!1sCAoSLEFGMVFpcE1xOGRkRTNXTmNGNEVYcVZRdmdwVDJPWnF4Vl9aVE9hYmFKdG5Q!2m2!1d41.0082376!2d28.9783589!3f270!4f0!5f0.7820865974627469",
    description: "Modern üretim hattı - müşterilerinize üretim süreçlerinizi şeffaf şekilde gösterin"
  },
  {
    id: 5,
    name: "Restoran İç Mekan",
    category: "Restoran",
    thumbnail: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=400",
    panoramaUrl: "https://www.google.com/maps/embed?pb=!4v1234567894!6m8!1m7!1sCAoSLEFGMVFpcE1xOGRkRTNXTmNGNEVYcVZRdmdwVDJPWnF4Vl9aVE9hYmFKdG5Q!2m2!1d41.0082376!2d28.9783589!3f45!4f0!5f0.7820865974627469",
    description: "Şık restoran atmosferi - rezervasyon öncesi müşterilerinize mekanınızı tanıtın"
  },
  {
    id: 6,
    name: "Perakende Mağaza",
    category: "Mağaza",
    thumbnail: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=400",
    panoramaUrl: "https://www.google.com/maps/embed?pb=!4v1234567895!6m8!1m7!1sCAoSLEFGMVFpcE1xOGRkRTNXTmNGNEVYcVZRdmdwVDJPWnF4Vl9aVE9hYmFKdG5Q!2m2!1d41.0082376!2d28.9783589!3f135!4f0!5f0.7820865974627469",
    description: "Ürün showroom alanı - online alışveriş deneyimini zenginleştirin"
  }
];

interface InlineVirtualTourProps {
  className?: string;
}

const InlineVirtualTour: React.FC<InlineVirtualTourProps> = ({ className = '' }) => {
  const [selectedLocation, setSelectedLocation] = useState<TourLocation>(tourLocations[0]);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const categories = Array.from(new Set(tourLocations.map(loc => loc.category)));

  return (
    <div className={`w-full ${className}`}>
      <div className="grid lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-lg border border-slate-200 dark:border-slate-700">
            <div className="flex items-center space-x-2 mb-4">
              <Layers className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-slate-900 dark:text-white">Mekan Seçimi</h3>
            </div>

            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {tourLocations.map((location) => (
                <motion.button
                  key={location.id}
                  onClick={() => setSelectedLocation(location)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full text-left p-3 rounded-lg transition-all ${
                    selectedLocation.id === location.id
                      ? 'bg-primary/10 border-2 border-primary shadow-md'
                      : 'bg-slate-50 dark:bg-slate-700/50 border-2 border-transparent hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <img
                      src={location.thumbnail}
                      alt={location.name}
                      className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                          {location.name}
                        </span>
                      </div>
                      <span className="inline-block px-2 py-0.5 bg-primary/20 text-primary text-xs rounded-full">
                        {location.category}
                      </span>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-xl p-4 border border-primary/20">
            <h4 className="font-semibold text-slate-900 dark:text-white mb-2 text-sm">
              💡 İpucu
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Sanal turu fare veya parmağınızla sürükleyerek 360° gezinin. Zoom yapmak için scroll kullanın.
            </p>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 px-6 py-4 border-b border-slate-200 dark:border-slate-600">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Navigation className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">
                      {selectedLocation.name}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {selectedLocation.description}
                    </p>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="p-2 bg-white dark:bg-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
                  title="Tam Ekran"
                >
                  <Maximize2 className="w-5 h-5 text-slate-700 dark:text-slate-200" />
                </motion.button>
              </div>
            </div>

            <div className="relative bg-slate-900 aspect-video">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedLocation.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full"
                >
                  <iframe
                    src={selectedLocation.panoramaUrl}
                    className="w-full h-full"
                    allowFullScreen
                    loading="lazy"
                    title={`Virtual Tour - ${selectedLocation.name}`}
                    style={{ border: 0 }}
                  />
                </motion.div>
              </AnimatePresence>

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between px-4 py-2 bg-black/50 backdrop-blur-sm rounded-lg">
                <div className="flex items-center space-x-4 text-white text-sm">
                  <div className="flex items-center space-x-2">
                    <RotateCw className="w-4 h-4" />
                    <span>360° Görünüm</span>
                  </div>
                  <div className="h-4 w-px bg-white/30" />
                  <div className="flex items-center space-x-2">
                    <ZoomIn className="w-4 h-4" />
                    <span>Yakınlaştır</span>
                  </div>
                </div>

                <span className="text-xs text-white/80 bg-primary/20 px-3 py-1 rounded-full">
                  {selectedLocation.category}
                </span>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-700/50 px-6 py-3 border-t border-slate-200 dark:border-slate-600">
              <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                <span>Sanal Tur Teknolojisi ile desteklenmektedir</span>
                <span>{tourLocations.length} farklı mekan</span>
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  const firstInCategory = tourLocations.find(loc => loc.category === category);
                  if (firstInCategory) setSelectedLocation(firstInCategory);
                }}
                className={`p-3 rounded-lg border-2 transition-all text-sm font-medium ${
                  selectedLocation.category === category
                    ? 'bg-primary/10 border-primary text-primary'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #5FC8DA;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #4BA8BA;
        }
      `}</style>
    </div>
  );
};

export default InlineVirtualTour;

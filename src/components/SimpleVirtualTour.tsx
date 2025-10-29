import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, Utensils, GraduationCap, Factory, Eye } from 'lucide-react';

interface TourOption {
  id: string;
  name: string;
  icon: React.ElementType;
  image: string;
  description: string;
}

const tourOptions: TourOption[] = [
  {
    id: 'hotel',
    name: 'Otel',
    icon: Building2,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1200',
    description: 'Lüks otel ve konaklama tesisleri için sanal tur çözümleri'
  },
  {
    id: 'restaurant',
    name: 'Restoran',
    icon: Utensils,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1200',
    description: 'Restoran ve kafe mekanları için 360° görüntüleme'
  },
  {
    id: 'school',
    name: 'Okul',
    icon: GraduationCap,
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1200',
    description: 'Eğitim kurumları ve kampüsler için sanal gezinti'
  },
  {
    id: 'factory',
    name: 'Fabrika',
    icon: Factory,
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200',
    description: 'Üretim tesisleri ve endüstriyel alanlar için tur'
  }
];

interface SimpleVirtualTourProps {
  className?: string;
}

const SimpleVirtualTour: React.FC<SimpleVirtualTourProps> = ({ className = '' }) => {
  const [selectedTour, setSelectedTour] = useState<string | null>(null);

  return (
    <div className={`w-full ${className}`}>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {tourOptions.map((option) => (
          <motion.div
            key={option.id}
            whileHover={{ scale: 1.03, y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedTour(option.id)}
            className="group cursor-pointer"
          >
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg border-2 border-transparent hover:border-primary transition-all">
              <img
                src={option.image}
                alt={option.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent" />

              <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                <div className="w-14 h-14 bg-primary/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-3 group-hover:bg-primary/30 transition-colors">
                  <option.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">
                  {option.name}
                </h3>
                <p className="text-xs text-gray-200 text-center line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {option.description}
                </p>
              </div>

              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-primary text-white p-2 rounded-full">
                  <Eye className="w-4 h-4" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedTour && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-slate-900 dark:text-white">
              {tourOptions.find(t => t.id === selectedTour)?.name} Sanal Turu
            </h4>
            <button
              onClick={() => setSelectedTour(null)}
              className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
              Kapat
            </button>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
            {tourOptions.find(t => t.id === selectedTour)?.description}
          </p>
          <div className="bg-slate-100 dark:bg-slate-900 rounded-lg p-8 text-center">
            <div className="text-slate-600 dark:text-slate-400">
              <Eye className="w-12 h-12 mx-auto mb-3 text-primary" />
              <p className="text-sm">Sanal tur demo içeriği buraya gelecek</p>
              <p className="text-xs mt-2">360° panoramik görünüm deneyimi</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SimpleVirtualTour;

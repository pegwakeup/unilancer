import { motion } from 'framer-motion';
import { useState } from 'react';
import { Maximize2, Navigation, ChevronLeft, ChevronRight, MapPin, Eye } from 'lucide-react';
import { Card } from './card';

interface TourLocation {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  embedUrl: string;
  category: string;
}

const tourLocations: TourLocation[] = [
  {
    id: '1',
    name: 'Modern Ofis Showroom',
    description: 'Lüks ofis mobilyaları ve dekorasyon çözümleri',
    thumbnail: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
    embedUrl: 'https://my.matterport.com/show/?m=SxQL3iGyoDo',
    category: 'Ofis'
  },
  {
    id: '2',
    name: 'Gayrimenkul Örnek Daire',
    description: '3+1 lüks daire sanal turu',
    thumbnail: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
    embedUrl: 'https://my.matterport.com/show/?m=SxQL3iGyoDo',
    category: 'Gayrimenkul'
  },
  {
    id: '3',
    name: 'Otomotiv Showroom',
    description: 'Araç galerisi ve detaylı inceleme',
    thumbnail: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop',
    embedUrl: 'https://my.matterport.com/show/?m=SxQL3iGyoDo',
    category: 'Otomotiv'
  },
  {
    id: '4',
    name: 'Restoran İç Mekan',
    description: 'Restoran tasarımı 360° görünüm',
    thumbnail: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop',
    embedUrl: 'https://my.matterport.com/show/?m=SxQL3iGyoDo',
    category: 'Restoran'
  },
  {
    id: '5',
    name: 'Eğitim Kampüsü',
    description: 'Üniversite kampüs turu',
    thumbnail: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=600&fit=crop',
    embedUrl: 'https://my.matterport.com/show/?m=SxQL3iGyoDo',
    category: 'Eğitim'
  },
  {
    id: '6',
    name: 'Otel Suit',
    description: 'Lüks otel odası detaylı gezinti',
    thumbnail: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&h=600&fit=crop',
    embedUrl: 'https://my.matterport.com/show/?m=SxQL3iGyoDo',
    category: 'Otel'
  }
];

export function VirtualTourSection() {
  const [selectedTour, setSelectedTour] = useState<TourLocation>(tourLocations[0]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(tourLocations.map(t => t.category)))];

  const filteredLocations = selectedCategory === 'all'
    ? tourLocations
    : tourLocations.filter(t => t.category === selectedCategory);

  const currentIndex = filteredLocations.findIndex(t => t.id === selectedTour.id);

  const handlePrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : filteredLocations.length - 1;
    setSelectedTour(filteredLocations[newIndex]);
  };

  const handleNext = () => {
    const newIndex = currentIndex < filteredLocations.length - 1 ? currentIndex + 1 : 0;
    setSelectedTour(filteredLocations[newIndex]);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-cyan-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 text-cyan-600 dark:text-cyan-400 mb-6">
            <Eye className="w-4 h-4 mr-2" />
            <span className="font-medium">360° Sanal Tur</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
            Mekanları Keşfedin
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            İnteraktif 360° sanal turlarla mekanları uzaktan keşfedin. Her açıdan inceleyin, detayları görün.
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {category === 'all' ? 'Tümü' : category}
            </button>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Card className="overflow-hidden bg-white dark:bg-slate-800 shadow-2xl border-2 border-slate-200 dark:border-slate-700">
            <div className="relative aspect-video bg-slate-900">
              <iframe
                key={selectedTour.id}
                src={selectedTour.embedUrl}
                className="w-full h-full"
                allow="fullscreen; xr-spatial-tracking"
                loading="lazy"
              />

              <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-4 z-10">
                <div className="flex-1 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white">{selectedTour.name}</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{selectedTour.description}</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="w-12 h-12 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-800 rounded-xl flex items-center justify-center transition-all shadow-lg border border-slate-200 dark:border-slate-700"
                >
                  <Maximize2 className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                </button>
              </div>

              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-3 z-10">
                <button
                  onClick={handlePrevious}
                  className="w-12 h-12 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-800 rounded-full flex items-center justify-center transition-all shadow-lg border border-slate-200 dark:border-slate-700"
                >
                  <ChevronLeft className="w-6 h-6 text-slate-700 dark:text-slate-300" />
                </button>

                <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm px-6 py-3 rounded-full font-semibold text-slate-900 dark:text-white shadow-lg border border-slate-200 dark:border-slate-700">
                  {currentIndex + 1} / {filteredLocations.length}
                </div>

                <button
                  onClick={handleNext}
                  className="w-12 h-12 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-800 rounded-full flex items-center justify-center transition-all shadow-lg border border-slate-200 dark:border-slate-700"
                >
                  <ChevronRight className="w-6 h-6 text-slate-700 dark:text-slate-300" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Navigation className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                <h4 className="font-bold text-slate-900 dark:text-white">Diğer Turlar</h4>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {filteredLocations.map((location) => (
                  <button
                    key={location.id}
                    onClick={() => setSelectedTour(location)}
                    className={`group relative aspect-video rounded-xl overflow-hidden transition-all ${
                      selectedTour.id === location.id
                        ? 'ring-4 ring-cyan-500 shadow-lg scale-105'
                        : 'hover:scale-105 hover:shadow-lg'
                    }`}
                  >
                    <img
                      src={location.thumbnail}
                      alt={location.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                      <p className="text-white text-xs font-semibold line-clamp-2">
                        {location.name}
                      </p>
                    </div>
                    {selectedTour.id === location.id && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center">
                        <Eye className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 grid md:grid-cols-3 gap-6"
        >
          {[
            {
              icon: Navigation,
              title: 'Serbest Gezinti',
              description: 'Mekanda istediğiniz gibi hareket edin, tüm açıları keşfedin'
            },
            {
              icon: Eye,
              title: '4K Görüntü',
              description: 'Yüksek çözünürlükte, gerçekçi ve detaylı görüntüler'
            },
            {
              icon: MapPin,
              title: 'Konum İşaretleri',
              description: 'Önemli noktaları işaretleyerek detaylı bilgi verin'
            }
          ].map((feature, index) => (
            <Card key={index} className="p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-2">{feature.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">{feature.description}</p>
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

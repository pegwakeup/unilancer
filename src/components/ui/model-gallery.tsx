import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Box, Camera, X, Maximize2, RotateCw, ZoomIn } from 'lucide-react';
import { Card } from './card';

interface Model3D {
  id: string;
  name: string;
  category: string;
  thumbnail: string;
  description: string;
  fileSize: string;
  polygons: string;
  arEnabled: boolean;
}

const models: Model3D[] = [
  {
    id: '1',
    name: 'Modern Sandalye',
    category: 'Mobilya',
    thumbnail: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=800&h=800&fit=crop',
    description: 'Ergonomik ofis sandalyesi 3D modeli',
    fileSize: '2.4 MB',
    polygons: '12.5K',
    arEnabled: true
  },
  {
    id: '2',
    name: 'Lüks Koltuk',
    category: 'Mobilya',
    thumbnail: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=800&fit=crop',
    description: 'Premium deri koltuk modeli',
    fileSize: '3.1 MB',
    polygons: '18.2K',
    arEnabled: true
  },
  {
    id: '3',
    name: 'Spor Ayakkabı',
    category: 'Moda',
    thumbnail: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop',
    description: 'Detaylı ayakkabı modeli',
    fileSize: '4.2 MB',
    polygons: '25.3K',
    arEnabled: true
  },
  {
    id: '4',
    name: 'Akıllı Saat',
    category: 'Elektronik',
    thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop',
    description: 'Smart watch 3D model',
    fileSize: '1.8 MB',
    polygons: '8.7K',
    arEnabled: true
  },
  {
    id: '5',
    name: 'Kahve Makinesi',
    category: 'Elektronik',
    thumbnail: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800&h=800&fit=crop',
    description: 'Profesyonel kahve makinesi',
    fileSize: '3.5 MB',
    polygons: '15.8K',
    arEnabled: true
  },
  {
    id: '6',
    name: 'Klasik Lamba',
    category: 'Dekorasyon',
    thumbnail: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&h=800&fit=crop',
    description: 'Vintage masa lambası',
    fileSize: '2.1 MB',
    polygons: '9.4K',
    arEnabled: true
  }
];

export function ModelGallery() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedModel, setSelectedModel] = useState<Model3D | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const categories = ['all', ...Array.from(new Set(models.map(m => m.category)))];
  const filteredModels = selectedCategory === 'all'
    ? models
    : models.filter(m => m.category === selectedCategory);

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 text-blue-600 dark:text-blue-400 mb-6">
            <Box className="w-4 h-4 mr-2" />
            <span className="font-medium">3D Model Galerisi</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
            Örnek 3D Modeller
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Farklı kategorilerde hazırladığımız yüksek kaliteli 3D modelleri inceleyin
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg scale-105'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {category === 'all' ? 'Tümü' : category}
            </button>
          ))}
        </div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {filteredModels.map((model, index) => (
            <motion.div
              key={model.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onMouseEnter={() => setHoveredId(model.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <Card className="group overflow-hidden bg-white dark:bg-slate-800 hover:shadow-2xl transition-all duration-300 cursor-pointer border border-slate-200 dark:border-slate-700">
                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-900 dark:to-slate-800">
                  <img
                    src={model.thumbnail}
                    alt={model.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  <AnimatePresence>
                    {hoveredId === model.id && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center gap-3"
                      >
                        <button
                          onClick={() => setSelectedModel(model)}
                          className="w-14 h-14 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all hover:scale-110"
                        >
                          <Maximize2 className="w-6 h-6 text-slate-900" />
                        </button>
                        {model.arEnabled && (
                          <button className="w-14 h-14 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-all hover:scale-110">
                            <Camera className="w-6 h-6 text-white" />
                          </button>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {model.arEnabled && (
                    <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      <Camera className="w-3 h-3" />
                      AR
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {model.name}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                    {model.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-500">
                    <div className="flex items-center gap-1">
                      <Box className="w-4 h-4" />
                      {model.polygons}
                    </div>
                    <div className="flex items-center gap-1">
                      <ZoomIn className="w-4 h-4" />
                      {model.fileSize}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <AnimatePresence>
          {selectedModel && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
              onClick={() => setSelectedModel(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden"
              >
                <div className="relative bg-gradient-to-r from-blue-600 to-cyan-600 p-6">
                  <button
                    onClick={() => setSelectedModel(null)}
                    className="absolute top-6 right-6 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                  >
                    <X className="w-6 h-6 text-white" />
                  </button>
                  <h3 className="text-3xl font-bold text-white mb-2">{selectedModel.name}</h3>
                  <p className="text-blue-100">{selectedModel.description}</p>
                </div>

                <div className="p-8">
                  <div className="aspect-video bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl mb-6 flex items-center justify-center">
                    <div className="text-center text-white">
                      <RotateCw className="w-16 h-16 mx-auto mb-4 animate-spin" />
                      <p className="text-lg">3D Viewer Loading...</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                      <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">Kategori</div>
                      <div className="font-semibold text-slate-900 dark:text-white">{selectedModel.category}</div>
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                      <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">Poligon Sayısı</div>
                      <div className="font-semibold text-slate-900 dark:text-white">{selectedModel.polygons}</div>
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                      <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">Dosya Boyutu</div>
                      <div className="font-semibold text-slate-900 dark:text-white">{selectedModel.fileSize}</div>
                    </div>
                  </div>

                  <button className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-3 shadow-lg">
                    <Camera className="w-6 h-6" />
                    AR ile Görüntüle
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

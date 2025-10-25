import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code2, Palette, LineChart, Globe, Smartphone, Database,
  BrainCircuit, PaintBucket, FileImage, Figma, Monitor,
  Search, Target, BarChart2, ArrowUpRight, ExternalLink,
  Github, Eye, Loader2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { getPortfolioItems, type PortfolioItem } from '../lib/portfolio';

// Categories and subcategories mapping
const categories = {
  software: {
    label: 'Yazılım',
    icon: Code2,
    subcategories: [
      { id: 'web', label: 'Web Geliştirme', icon: Globe },
      { id: 'mobile', label: 'Mobil Uygulama', icon: Smartphone },
      { id: 'saas', label: 'SaaS Çözümleri', icon: Database },
      { id: 'ai', label: 'AI Entegrasyonları', icon: BrainCircuit }
    ]
  },
  design: {
    label: 'Tasarım',
    icon: Palette,
    subcategories: [
      { id: 'ui-ux', label: 'UI/UX Tasarım', icon: Monitor },
      { id: 'brand', label: 'Kurumsal Kimlik', icon: PaintBucket },
      { id: 'print', label: 'Basılı Tasarım', icon: FileImage },
      { id: 'illustration', label: '3D & İllüstrasyon', icon: Figma }
    ]
  },
  marketing: {
    label: 'Dijital Pazarlama',
    icon: LineChart,
    subcategories: [
      { id: 'seo', label: 'SEO & SEM', icon: Search },
      { id: 'ads', label: 'Dijital Reklam', icon: Target },
      { id: 'analytics', label: 'Analitik', icon: BarChart2 }
    ]
  }
};

const CategoryIcon = ({ category }: { category: string }) => {
  const categoryData = categories[category as keyof typeof categories];
  if (!categoryData) return null;
  
  const Icon = categoryData.icon;
  return <Icon className="w-4 h-4 text-primary" />;
};

const Portfolio = () => {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    loadPortfolioItems();
  }, []);

  const loadPortfolioItems = async () => {
    try {
      setLoading(true);
      const data = await getPortfolioItems();
      setItems(data);
    } catch (err) {
      console.error('Portfolio items loading error:', err);
      setError('Portfolyo öğeleri yüklenirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = items.filter(item => {
    const matchesCategory = !selectedCategory || item.main_category === selectedCategory;
    const matchesSubcategory = !selectedSubcategory || item.sub_category === selectedSubcategory;
    const matchesSearch = !searchQuery || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));

    return matchesCategory && matchesSubcategory && matchesSearch;
  });

  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2000"
            alt="Portfolio"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark/90 via-dark/70 to-dark" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Portfolyo
            </h1>
            <p className="text-xl text-gray-300">
              Modern teknolojiler ve yaratıcı çözümlerle geliştirdiğimiz projelerimizden örnekler
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-dark-light/30 sticky top-20 z-30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search */}
          <div className="relative max-w-xl mx-auto mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Proje ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-dark border border-white/10 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-primary"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => {
                setSelectedCategory(null);
                setSelectedSubcategory(null);
              }}
              className={`px-6 py-3 rounded-xl transition-all ${
                !selectedCategory
                  ? 'bg-primary text-white'
                  : 'bg-dark-light text-gray-400 hover:bg-white/5'
              }`}
            >
              Tümü
            </button>
            
            {Object.entries(categories).map(([key, category]) => (
              <div key={key} className="relative group">
                <button
                  onClick={() => {
                    setSelectedCategory(key);
                    setSelectedSubcategory(null);
                  }}
                  className={`px-6 py-3 rounded-xl transition-all ${
                    selectedCategory === key
                      ? 'bg-primary text-white'
                      : 'bg-dark-light text-gray-400 hover:bg-white/5'
                  }`}
                >
                  <span className="flex items-center space-x-2">
                    <category.icon className="w-5 h-5" />
                    <span>{category.label}</span>
                  </span>
                </button>

                {/* Subcategories Dropdown */}
                <AnimatePresence>
                  {selectedCategory === key && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-2 w-48 bg-dark-light border border-white/10 rounded-xl overflow-hidden shadow-xl z-10"
                    >
                      {category.subcategories.map((sub) => (
                        <button
                          key={sub.id}
                          onClick={() => setSelectedSubcategory(sub.id)}
                          className={`w-full px-4 py-3 flex items-center space-x-2 transition-colors ${
                            selectedSubcategory === sub.id
                              ? 'bg-primary/10 text-primary'
                              : 'text-gray-400 hover:bg-white/5 hover:text-white'
                          }`}
                        >
                          <sub.icon className="w-4 h-4" />
                          <span>{sub.label}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-500 mb-4">{error}</p>
              <button
                onClick={loadPortfolioItems}
                className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors"
              >
                Tekrar Dene
              </button>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400">Seçilen kriterlere uygun proje bulunamadı.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="group relative"
                  onHoverStart={() => setHoveredId(item.id)}
                  onHoverEnd={() => setHoveredId(null)}
                >
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-dark-light/50 border border-white/10">
                    <motion.img
                      src={item.main_image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      initial={{ scale: 1 }}
                      animate={{ 
                        scale: hoveredId === item.id ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.4 }}
                    />
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/50 to-transparent p-6 flex flex-col justify-end"
                      initial={{ opacity: 0.8 }}
                      animate={{ 
                        opacity: hoveredId === item.id ? 1 : 0.8,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ 
                          y: hoveredId === item.id ? 0 : 20,
                          opacity: hoveredId === item.id ? 1 : 0 
                        }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4"
                      >
                        {/* Category Badge */}
                        <div className="flex items-center gap-2">
                          <CategoryIcon category={item.main_category} />
                          <span className="text-sm text-primary uppercase tracking-wider">
                            {categories[item.main_category as keyof typeof categories]?.label}
                          </span>
                        </div>

                        {/* Title & Description */}
                        <div>
                          <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                          <p className="text-gray-300 line-clamp-2">{item.description}</p>
                        </div>

                        {/* Technologies */}
                        {item.technologies && item.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {item.technologies.slice(0, 3).map((tech, index) => (
                              <span 
                                key={index}
                                className="px-2 py-1 bg-white/10 rounded-full text-xs"
                              >
                                {tech}
                              </span>
                            ))}
                            {item.technologies.length > 3 && (
                              <span className="px-2 py-1 bg-white/10 rounded-full text-xs">
                                +{item.technologies.length - 3}
                              </span>
                            )}
                          </div>
                        )}

                        {/* Links */}
                        <div className="flex items-center gap-4">
                          {item.live_url && (
                            <a 
                              href={item.live_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-primary hover:text-primary-light transition-colors"
                            >
                              <ExternalLink className="w-4 h-4" />
                              <span className="text-sm">Canlı</span>
                            </a>
                          )}
                          {item.github_url && (
                            <a 
                              href={item.github_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-primary hover:text-primary-light transition-colors"
                            >
                              <Github className="w-4 h-4" />
                              <span className="text-sm">GitHub</span>
                            </a>
                          )}
                          <Link
                            to={`/portfolio/${item.slug}`}
                            className="flex items-center gap-2 text-primary hover:text-primary-light transition-colors ml-auto"
                          >
                            <Eye className="w-4 h-4" />
                            <span className="text-sm">Detaylar</span>
                            <ArrowUpRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Box, Camera, Eye, Maximize2, RotateCw, ArrowRight, CheckCircle,
  Building2, Factory, GraduationCap, Store, Home, Users, TrendingUp,
  Clock, DollarSign, Target, MousePointer, Smartphone, Globe,
  Zap, ChevronLeft, ChevronRight, Play, X
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Interactive3DAstronaut from '../components/Interactive3DAstronaut';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6 }
};

const stagger = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: "-100px" },
  transition: { staggerChildren: 0.15 }
};

const virtualTours = [
  {
    id: 1,
    title: "Luxury Hotel Suite",
    category: "Otel",
    image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=1200",
    panoramaUrl: "https://www.kuula.co/share/collection/7l3PY?logo=1&info=1&fs=1&vr=0&zoom=1&sd=1&thumbs=1",
    description: "Lüks otel süiti sanal turu - 360° panoramik görünüm"
  },
  {
    id: 2,
    title: "Modern Factory Floor",
    category: "Fabrika",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200",
    panoramaUrl: "https://www.kuula.co/share/collection/7l3PY?logo=1&info=1&fs=1&vr=0&zoom=1&sd=1&thumbs=1",
    description: "Üretim tesisi sanal turu - İşletme süreçlerinizi sergilemek için"
  },
  {
    id: 3,
    title: "University Campus",
    category: "Üniversite",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1200",
    panoramaUrl: "https://www.kuula.co/share/collection/7l3PY?logo=1&info=1&fs=1&vr=0&zoom=1&sd=1&thumbs=1",
    description: "Üniversite kampüsü sanal turu - Öğrencilerinize kampüsü tanıtın"
  }
];

const benefits = [
  {
    icon: TrendingUp,
    title: "Yüksek Dönüşüm Oranı",
    description: "Sanal tur deneyimi yaşayan potansiyel müşteriler %40 daha fazla dönüşüm sağlar"
  },
  {
    icon: Clock,
    title: "7/24 Erişilebilirlik",
    description: "Müşterileriniz istedikleri zaman, istedikleri yerden işletmenizi ziyaret edebilir"
  },
  {
    icon: DollarSign,
    title: "Maliyet Tasarrufu",
    description: "Fiziksel ziyaret maliyetlerini düşürün, daha fazla potansiyel müşteriyle buluşun"
  },
  {
    icon: Target,
    title: "Nitelikli Müşteri Kazanımı",
    description: "Sanal tur öncesi karar veren müşteriler daha bilinçli ve hazır alıcılardır"
  },
  {
    icon: Globe,
    title: "Küresel Erişim",
    description: "Coğrafi sınırlamaları ortadan kaldırın, dünya çapında müşteriye ulaşın"
  },
  {
    icon: Users,
    title: "Rekabet Avantajı",
    description: "Modern teknoloji kullanarak rakiplerinizin önüne geçin ve fark yaratın"
  }
];

const industries = [
  {
    icon: Building2,
    title: "Gayrimenkul",
    description: "Emlak vitrinini dijitalleştirin, uzaktan ev gezintileri düzenleyin"
  },
  {
    icon: Home,
    title: "Konaklama & Turizm",
    description: "Oteller, resortlar ve tatil köyleri için immersive deneyimler"
  },
  {
    icon: GraduationCap,
    title: "Eğitim",
    description: "Kampüs turları, laboratuvarlar ve eğitim tesisleri"
  },
  {
    icon: Factory,
    title: "Üretim & Sanayi",
    description: "Fabrika gezileri, üretim hatları ve tesis tanıtımları"
  },
  {
    icon: Store,
    title: "Perakende & Showroom",
    description: "Mağazalar, showroomlar ve sergi alanları"
  },
  {
    icon: Building2,
    title: "Müze & Kültür",
    description: "Müzeler, galeriler ve tarihi mekanlar için sanal turlar"
  }
];

const features = [
  { icon: Smartphone, title: "WebAR Desteği", description: "Mobil cihazlarda uygulama olmadan AR deneyimi" },
  { icon: Eye, title: "4K/8K Çözünürlük", description: "Ultra yüksek çözünürlükte panoramik görüntüler" },
  { icon: MousePointer, title: "İnteraktif Hotspotlar", description: "Tıklanabilir bilgi noktaları ve açıklamalar" },
  { icon: Maximize2, title: "Multi-Floor Navigasyon", description: "Çok katlı ve çok lokasyonlu gezinti desteği" },
  { icon: Globe, title: "VR Uyumluluğu", description: "VR başlıklarla tam immersive deneyim" },
  { icon: TrendingUp, title: "Analitik & Raporlama", description: "Ziyaretçi davranışlarını takip edin" }
];

const ThreeDARVirtualTour = () => {
  const [selectedTour, setSelectedTour] = useState<number | null>(null);
  const [currentTourIndex, setCurrentTourIndex] = useState(0);

  const nextTour = () => {
    setCurrentTourIndex((prev) => (prev + 1) % virtualTours.length);
  };

  const prevTour = () => {
    setCurrentTourIndex((prev) => (prev - 1 + virtualTours.length) % virtualTours.length);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-white dark:bg-dark">
      {/* Hero Section with 3D Model */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#5FC8DA40_1px,transparent_1px),linear-gradient(to_bottom,#5FC8DA40_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#5FC8DA25_1px,transparent_1px),linear-gradient(to_bottom,#5FC8DA25_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_80%)]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-primary-light/20 text-primary mb-6"
              >
                <Box className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">3D & AR Teknolojisi</span>
              </motion.div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-slate-900 dark:text-white leading-tight">
                3D AR
                <span className="block text-primary">Sanal Tur</span>
              </h1>

              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                İşletmenizi, tesislerinizi veya mekanlarınızı 360° sanal turlar ve artırılmış gerçeklik ile deneyimleyin. Müşterilerinize fiziksel sınırları aşan immersive bir keşif deneyimi sunun.
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/project-request"
                    className="inline-flex items-center px-8 py-4 bg-primary text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all group"
                  >
                    <span>Demo Talep Et</span>
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedTour(1)}
                  className="inline-flex items-center px-8 py-4 bg-white dark:bg-dark-light border-2 border-primary text-primary rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  <Play className="w-5 h-5 mr-2" />
                  <span>Örnek Turu İzle</span>
                </motion.button>
              </div>

              <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-primary mr-2" />
                  <span>Mobil AR Desteği</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-primary mr-2" />
                  <span>4K Panoramik</span>
                </div>
              </div>
            </motion.div>

            {/* Right: 3D Astronaut Model */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="relative aspect-square max-w-lg mx-auto">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-primary-light/30 rounded-full blur-3xl opacity-50 animate-pulse" />

                {/* 3D Model Container - No Background */}
                <div className="relative p-8">
                  <div className="relative aspect-square flex items-center justify-center">
                    <Interactive3DAstronaut className="w-full h-full" />
                  </div>

                  {/* AR Badge */}
                  <div className="mt-6 text-center">
                    <div className="inline-flex items-center px-4 py-2 bg-primary/10 backdrop-blur-sm rounded-full">
                      <Smartphone className="w-4 h-4 text-primary mr-2" />
                      <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                        Mouse veya parmağınızla sürükleyerek döndürün
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Virtual Tour Showcase Section */}
      <section className="py-20 bg-white/50 dark:bg-dark-light/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={fadeInUp.viewport}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
              Örnek Sanal Turlar
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Farklı sektörlerden örnek turları keşfedin ve sanal gezinti deneyimini yaşayın
            </p>
          </motion.div>

          {/* Tour Carousel */}
          <div className="relative">
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={fadeInUp.viewport}
              className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl"
            >
              <img
                src={virtualTours[currentTourIndex].image}
                alt={virtualTours[currentTourIndex].title}
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-primary/20 backdrop-blur-sm text-primary rounded-full text-sm font-medium">
                    {virtualTours[currentTourIndex].category}
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  {virtualTours[currentTourIndex].title}
                </h3>
                <p className="text-gray-200 mb-6 max-w-2xl">
                  {virtualTours[currentTourIndex].description}
                </p>

                <button
                  onClick={() => setSelectedTour(virtualTours[currentTourIndex].id)}
                  className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors"
                >
                  <Eye className="w-5 h-5 mr-2" />
                  <span>Sanal Turu Başlat</span>
                </button>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevTour}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={nextTour}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-colors"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </motion.div>

            {/* Tour Thumbnails */}
            <div className="flex justify-center gap-4 mt-8">
              {virtualTours.map((tour, index) => (
                <button
                  key={tour.id}
                  onClick={() => setCurrentTourIndex(index)}
                  className={`relative w-24 h-24 rounded-lg overflow-hidden transition-all ${
                    currentTourIndex === index
                      ? 'ring-4 ring-primary scale-110'
                      : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={fadeInUp.viewport}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
              Neden 3D AR Sanal Tur?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              İşletmeniz için 3D AR sanal turların sağladığı avantajlar
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={stagger}
            initial="initial"
            whileInView="whileInView"
            viewport={stagger.viewport}
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white dark:bg-dark-light/50 backdrop-blur-sm p-6 rounded-xl border border-slate-200 dark:border-white/10 hover:border-primary/30 transition-all group"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <benefit.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 bg-white/50 dark:bg-dark-light/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={fadeInUp.viewport}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
              Kullanım Alanları
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Farklı sektörlerde 3D AR sanal turlarla fark yaratın
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={stagger}
            initial="initial"
            whileInView="whileInView"
            viewport={stagger.viewport}
          >
            {industries.map((industry, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white dark:bg-dark-light/50 backdrop-blur-sm p-6 rounded-xl border border-slate-200 dark:border-white/10 hover:border-primary/30 transition-all group cursor-pointer"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <industry.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">
                  {industry.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {industry.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={fadeInUp.viewport}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
              Teknik Özellikler
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Modern teknolojiler ile donatılmış kapsamlı özellikler
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={stagger}
            initial="initial"
            whileInView="whileInView"
            viewport={stagger.viewport}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="flex items-start gap-4 bg-white dark:bg-dark-light/50 backdrop-blur-sm p-6 rounded-xl border border-slate-200 dark:border-white/10"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white/50 dark:bg-dark-light/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-primary/10 to-primary-light/10 backdrop-blur-sm p-12 rounded-2xl border border-primary/20 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#5FC8DA40_1px,transparent_1px),linear-gradient(to_bottom,#5FC8DA40_1px,transparent_1px)] bg-[size:2rem_2rem]" />

            <div className="relative text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
                İşletmenizi 3D AR ile Dönüştürün
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Özel sanal tur çözümlerimiz hakkında detaylı bilgi alın ve ücretsiz demo talep edin
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/project-request"
                    className="inline-flex items-center px-8 py-4 bg-primary text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                  >
                    <Zap className="w-5 h-5 mr-2" />
                    <span>Hemen Başlayın</span>
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/contact"
                    className="inline-flex items-center px-8 py-4 bg-white dark:bg-dark-light border-2 border-primary text-primary rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                  >
                    <span>İletişime Geçin</span>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Virtual Tour Modal */}
      <AnimatePresence>
        {selectedTour !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedTour(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-dark-light rounded-2xl overflow-hidden max-w-6xl w-full max-h-[90vh] relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {virtualTours.find(t => t.id === selectedTour)?.title}
                </h3>
                <button
                  onClick={() => setSelectedTour(null)}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                </button>
              </div>

              <div className="aspect-video">
                <iframe
                  src={virtualTours.find(t => t.id === selectedTour)?.panoramaUrl}
                  className="w-full h-full"
                  allowFullScreen
                  title="Virtual Tour"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThreeDARVirtualTour;

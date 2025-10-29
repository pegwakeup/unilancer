import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Box, Camera, Eye, ArrowRight, CheckCircle,
  Building2, Factory, GraduationCap, Store, Home, Users, TrendingUp,
  Clock, DollarSign, Target, MousePointer, Smartphone, Globe,
  Zap, Maximize2, Layers, Navigation
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Interactive3DViewer from '../components/Interactive3DViewer';
import InlineVirtualTour from '../components/InlineVirtualTour';

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

const arFeatures = [
  { icon: Smartphone, title: "WebAR Desteği", description: "Mobil cihazlarda uygulama olmadan AR deneyimi" },
  { icon: Eye, title: "Gerçek Zamanlı Render", description: "Yüksek kaliteli 3D modeller ile gerçekçi görselleştirme" },
  { icon: MousePointer, title: "İnteraktif Kontroller", description: "Döndürme, yakınlaştırma ve renk değiştirme özellikleri" },
  { icon: Camera, title: "AR Görünüm", description: "Ürünleri kendi ortamınızda görüntüleyin" },
  { icon: Layers, title: "Çoklu Model Desteği", description: "Farklı mobilya ve ürün modellerini görüntüleyin" },
  { icon: Globe, title: "Platformlar Arası", description: "Tüm cihazlarda sorunsuz çalışma" }
];

const virtualTourFeatures = [
  { icon: Eye, title: "360° Panoramik Görünüm", description: "Tam immersive sanal gezinti deneyimi" },
  { icon: Navigation, title: "Mekanlar Arası Geçiş", description: "Farklı alanları sorunsuzca keşfedin" },
  { icon: MousePointer, title: "İnteraktif Hotspotlar", description: "Tıklanabilir bilgi noktaları" },
  { icon: Maximize2, title: "Tam Ekran Desteği", description: "Daha iyi deneyim için tam ekran modu" },
  { icon: Smartphone, title: "Mobil Uyumlu", description: "Her cihazda mükemmel performans" },
  { icon: Globe, title: "Çoklu Lokasyon", description: "Birden fazla mekan ve alan gezintisi" }
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
  const [activeTab, setActiveTab] = useState<'3d-ar' | 'virtual-tour'>('3d-ar');

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-blue-50 via-cyan-50/40 to-blue-100/30 dark:from-dark dark:via-dark-light dark:to-dark">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#5FC8DA40_1px,transparent_1px),linear-gradient(to_bottom,#5FC8DA40_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#5FC8DA25_1px,transparent_1px),linear-gradient(to_bottom,#5FC8DA25_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_80%)]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto mb-16"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-primary-light/20 text-primary mb-6"
            >
              <Box className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">İnovatif Teknolojiler</span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-slate-900 dark:text-white leading-tight">
              3D & AR ve Sanal Tur
              <span className="block text-primary mt-2">Çözümleri</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              İşletmenizi modern 3D görselleştirme, artırılmış gerçeklik ve 360° sanal turlarla dijital dünyada öne çıkarın
            </p>

            <div className="flex flex-wrap justify-center gap-4">
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

              <motion.a
                href="#interactive-demo"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 bg-white dark:bg-dark-light border-2 border-primary text-primary rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                <Eye className="w-5 h-5 mr-2" />
                <span>Demoyu İncele</span>
              </motion.a>
            </div>
          </motion.div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-white dark:bg-slate-800 rounded-xl p-2 shadow-lg border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setActiveTab('3d-ar')}
                className={`px-8 py-3 rounded-lg font-medium transition-all ${
                  activeTab === '3d-ar'
                    ? 'bg-primary text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Box className="w-5 h-5" />
                  <span>3D & AR</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('virtual-tour')}
                className={`px-8 py-3 rounded-lg font-medium transition-all ${
                  activeTab === 'virtual-tour'
                    ? 'bg-primary text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Navigation className="w-5 h-5" />
                  <span>Sanal Tur</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section id="interactive-demo" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeTab === '3d-ar' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
                  İnteraktif 3D & AR Görselleştirme
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Ürünlerinizi gerçek zamanlı 3D modellerle sergiley in, müşterilerinize interaktif bir deneyim sunun
                </p>
              </div>

              <Interactive3DViewer className="mb-16" />

              <motion.div
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
                variants={stagger}
                initial="initial"
                whileInView="whileInView"
                viewport={stagger.viewport}
              >
                {arFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary/30 dark:hover:border-primary/30 transition-all shadow-sm hover:shadow-md"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-white">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {activeTab === 'virtual-tour' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
                  360° Sanal Tur Deneyimi
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Mekanlarınızı panoramik sanal turlarla tanıtın, ziyaretçilerinize immersive bir keşif deneyimi sunun
                </p>
              </div>

              <InlineVirtualTour className="mb-16" />

              <motion.div
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
                variants={stagger}
                initial="initial"
                whileInView="whileInView"
                viewport={stagger.viewport}
              >
                {virtualTourFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary/30 dark:hover:border-primary/30 transition-all shadow-sm hover:shadow-md"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-white">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
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

    </div>
  );
};

export default ThreeDARVirtualTour;

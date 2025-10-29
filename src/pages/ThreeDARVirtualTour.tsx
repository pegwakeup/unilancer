import React from 'react';
import { motion } from 'framer-motion';
import {
  Box, ArrowRight, CheckCircle, Smartphone, Eye, Globe, Camera
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Simple3DViewer from '../components/Simple3DViewer';
import SimpleVirtualTour from '../components/SimpleVirtualTour';

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

const features = [
  { icon: Smartphone, title: "Mobil AR Desteği", description: "iOS ve Android cihazlarda uygulama olmadan AR" },
  { icon: Eye, title: "360° Görünüm", description: "Tam dönme ve yakınlaştırma özellikleri" },
  { icon: Globe, title: "Web Tabanlı", description: "Tarayıcıdan direkt erişim, indirme gerektirmez" },
  { icon: Camera, title: "Gerçek Ortamda Görüntüleme", description: "Ürünleri kendi mekanınızda görün" }
];


const ThreeDARVirtualTour = () => {
  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-blue-50 via-cyan-50/40 to-blue-100/30 dark:from-dark dark:via-dark-light dark:to-dark transition-colors duration-300">
      {/* Hero Section with 3D Viewer */}
      <section className="relative py-12 md:py-16 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#5FC8DA40_1px,transparent_1px),linear-gradient(to_bottom,#5FC8DA40_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#5FC8DA25_1px,transparent_1px),linear-gradient(to_bottom,#5FC8DA25_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_80%)]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
            {/* Left: Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
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
                Ürünlerinizi
                <span className="block text-primary">AR ile Görüntüleyin</span>
              </h1>

              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                3D modellerinizi web üzerinden paylaşın. Müşterileriniz ürünlerinizi hem döndürerek inceleyebilsin hem de kendi ortamlarında AR ile görüntüleyebilsin.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Mobil AR desteği (iOS & Android)</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">360° döndürme ve yakınlaştırma</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Uygulama indirmeden hemen kullanım</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/project-request"
                    className="inline-flex items-center px-8 py-4 bg-primary text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all group"
                  >
                    <span>Teklif Alın</span>
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            {/* Right: 3D Viewer */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="lg:col-span-3"
            >
              <div className="relative w-full h-full">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-slate-200 dark:border-slate-700 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900">
                  <div className="relative w-full h-full min-h-[600px] md:min-h-[700px] lg:min-h-[750px]">
                    <Simple3DViewer />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-20 lg:py-24 bg-white/50 dark:bg-dark-light/30 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={fadeInUp.viewport}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
              Özellikler
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              3D AR çözümümüzün sunduğu temel özellikler
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
            variants={stagger}
            initial="initial"
            whileInView="whileInView"
            viewport={stagger.viewport}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white dark:bg-slate-800 p-8 rounded-2xl border-2 border-slate-200 dark:border-slate-700 hover:border-primary/50 dark:hover:border-primary/50 transition-all shadow-lg hover:shadow-2xl"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary-light/20 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Virtual Tour Section */}
      <section className="py-16 md:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={fadeInUp.viewport}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
              360° Sanal Tur Çözümleri
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Mekanlarınızı interaktif sanal turlarla tanıtın. Müşterileriniz dilerken mekanınızı sanki oradayımış gibi keşfetsin.
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={fadeInUp.viewport}
          >
            <SimpleVirtualTour />
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 lg:py-24 bg-white/50 dark:bg-dark-light/30 transition-colors duration-300">
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
                Projeniz İçin Teklif Alın
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                3D AR ve sanal tur çözümlerimiz hakkında detaylı bilgi için bizimle iletişime geçin
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
                    <span>Teklif Alın</span>
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
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

import React from 'react';
import { motion } from 'framer-motion';
import { FileImage, Printer, Book, Zap, ArrowUpRight, CheckCircle } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6 }
};

const PrintGraphicDesign = () => {
  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=2000"
            alt="Print & Graphic Design"
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
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-primary-light/20 text-primary mb-6"
            >
              <Zap className="w-4 h-4 mr-2" />
              <span>Basılı & Grafik Tasarım</span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Profesyonel Basılı Materyal Tasarımları
            </h1>
            <p className="text-xl text-gray-300">
              Markanızı yansıtan etkileyici basılı materyal ve grafik tasarımlar
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="bg-dark-light/50 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-primary/20 transition-all group"
            >
              <Book className="h-12 w-12 text-primary mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-4">Katalog & Broşür</h3>
              <ul className="space-y-2">
                <li className="text-gray-400 flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-primary/70 shrink-0 mt-1" />
                  <span>Ürün Katalogları</span>
                </li>
                <li className="text-gray-400 flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-primary/70 shrink-0 mt-1" />
                  <span>Tanıtım Broşürleri</span>
                </li>
                <li className="text-gray-400 flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-primary/70 shrink-0 mt-1" />
                  <span>Dergi Tasarımı</span>
                </li>
                <li className="text-gray-400 flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-primary/70 shrink-0 mt-1" />
                  <span>Kitap Tasarımı</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="bg-dark-light/50 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-primary/20 transition-all group"
            >
              <Printer className="h-12 w-12 text-primary mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-4">Ambalaj & Etiket</h3>
              <ul className="space-y-2">
                <li className="text-gray-400 flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-primary/70 shrink-0 mt-1" />
                  <span>Ürün Ambalajları</span>
                </li>
                <li className="text-gray-400 flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-primary/70 shrink-0 mt-1" />
                  <span>Etiket Tasarımı</span>
                </li>
                <li className="text-gray-400 flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-primary/70 shrink-0 mt-1" />
                  <span>Kutu Tasarımı</span>
                </li>
                <li className="text-gray-400 flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-primary/70 shrink-0 mt-1" />
                  <span>Özel Paketleme</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="bg-dark-light/50 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-primary/20 transition-all group"
            >
              <FileImage className="h-12 w-12 text-primary mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-4">Poster & Afiş</h3>
              <ul className="space-y-2">
                <li className="text-gray-400 flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-primary/70 shrink-0 mt-1" />
                  <span>Reklam Afişleri</span>
                </li>
                <li className="text-gray-400 flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-primary/70 shrink-0 mt-1" />
                  <span>Etkinlik Posterleri</span>
                </li>
                <li className="text-gray-400 flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-primary/70 shrink-0 mt-1" />
                  <span>Billboard Tasarımı</span>
                </li>
                <li className="text-gray-400 flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-primary/70 shrink-0 mt-1" />
                  <span>Promosyon Materyalleri</span>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Portfolio Examples */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="relative aspect-video rounded-xl overflow-hidden group"
            >
              <img
                src="https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800"
                alt="Catalog Design"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/50 to-transparent flex items-end">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Katalog Tasarımı</h3>
                  <p className="text-gray-300 text-sm">Profesyonel ürün ve hizmet katalogları</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="relative aspect-video rounded-xl overflow-hidden group"
            >
              <img
                src="https://images.unsplash.com/photo-1636955840493-f43a02bfa064?auto=format&fit=crop&q=80&w=800"
                alt="Packaging Design"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/50 to-transparent flex items-end">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Ambalaj Tasarımı</h3>
                  <p className="text-gray-300 text-sm">Etkileyici ürün ambalaj tasarımları</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="relative aspect-video rounded-xl overflow-hidden group"
            >
              <img
                src="https://images.unsplash.com/photo-1517292987719-0369a794ec0f?auto=format&fit=crop&q=80&w=800"
                alt="Poster Design"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/50 to-transparent flex items-end">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Poster Tasarımı</h3>
                  <p className="text-gray-300 text-sm">Dikkat çekici poster ve afiş tasarımları</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-dark-light/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-dark-light/50 backdrop-blur-sm p-8 rounded-xl border border-white/10 relative overflow-hidden"
          >
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent" />
            </div>
            
            <div className="relative max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Basılı Materyal Projenizi Başlatalım
              </h2>
              <p className="text-gray-300 mb-8">
                Profesyonel basılı materyal ve grafik tasarım çözümleri için hemen iletişime geçin
              </p>
              <motion.a
                href="/project-request"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 bg-primary text-white rounded-xl font-medium group"
              >
                <span>Teklif Alın</span>
                <ArrowUpRight className="w-5 h-5 ml-2 group-hover:rotate-45 transition-transform" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PrintGraphicDesign;
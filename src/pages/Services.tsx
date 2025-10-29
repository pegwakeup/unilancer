import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Palette, LineChart, Zap, CheckCircle, Globe, Smartphone, Database, BrainCircuit, X, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Service {
  icon: any;
  title: string;
  description: string;
  features: string[];
  detailedDescription: string;
}

const services: Service[] = [
  {
    icon: Globe,
    title: 'Web Geliştirme',
    description: 'Modern web uygulamaları ve siteler',
    detailedDescription: 'React, Next.js, Vue.js gibi modern teknolojilerle performanslı, SEO uyumlu ve kullanıcı dostu web uygulamaları geliştiriyoruz.',
    features: [
      'Responsive ve modern tasarım',
      'Hızlı yükleme süreleri',
      'SEO optimizasyonu',
      'E-ticaret çözümleri',
      'CMS entegrasyonları',
      'Progressive Web Apps (PWA)'
    ]
  },
  {
    icon: Smartphone,
    title: 'Mobil Uygulama',
    description: 'iOS ve Android uygulamalar',
    detailedDescription: 'React Native ve Flutter teknolojileriyle hem iOS hem de Android platformları için native deneyim sunan uygulamalar geliştiriyoruz.',
    features: [
      'Cross-platform geliştirme',
      'Native performans',
      'Push notification entegrasyonu',
      'Offline çalışma desteği',
      'App Store ve Play Store optimizasyonu',
      'Kullanıcı analitikleri'
    ]
  },
  {
    icon: Palette,
    title: 'UI/UX Tasarım',
    description: 'Kullanıcı odaklı tasarımlar',
    detailedDescription: 'Kullanıcı araştırması ve deneyim tasarımı ile markanızı en iyi şekilde yansıtan, kullanımı kolay arayüzler tasarlıyoruz.',
    features: [
      'Kullanıcı araştırması',
      'Wireframe ve prototipleme',
      'Görsel kimlik tasarımı',
      'Interaktif prototipler',
      'Usability testing',
      'Design System oluşturma'
    ]
  },
  {
    icon: Database,
    title: 'SaaS Çözümleri',
    description: 'Bulut tabanlı yazılımlar',
    detailedDescription: 'Ölçeklenebilir, güvenli ve modern bulut tabanlı SaaS uygulamaları geliştirerek işletmenizi dijital dönüşüme hazırlıyoruz.',
    features: [
      'Ölçeklenebilir altyapı',
      'Multi-tenant mimarisi',
      'API geliştirme',
      'Ödeme sistemleri entegrasyonu',
      'Güvenlik ve yetkilendirme',
      'Analytics ve raporlama'
    ]
  },
  {
    icon: BrainCircuit,
    title: 'AI Entegrasyonu',
    description: 'Yapay zeka çözümleri',
    detailedDescription: 'ChatGPT, GPT-4, ve diğer AI teknolojilerini uygulamalarınıza entegre ederek akıllı, verimli ve kullanıcı dostu çözümler sunuyoruz.',
    features: [
      'ChatGPT entegrasyonu',
      'Doğal dil işleme (NLP)',
      'Görüntü işleme ve analiz',
      'Tahminleme modelleri',
      'Chatbot geliştirme',
      'Özel AI modelleri'
    ]
  },
  {
    icon: LineChart,
    title: 'Dijital Pazarlama',
    description: 'SEO ve reklam yönetimi',
    detailedDescription: 'Google Ads, sosyal medya reklamları ve SEO stratejileri ile markanızı hedef kitlenize ulaştırıyor, dönüşüm oranlarınızı artırıyoruz.',
    features: [
      'SEO optimizasyonu',
      'Google Ads yönetimi',
      'Sosyal medya reklamları',
      'İçerik pazarlama',
      'Email marketing',
      'Analitik ve raporlama'
    ]
  }
];

const Services = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  return (
    <div className="relative min-h-screen pt-24 pb-16">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-cyan-50/40 to-blue-100/30 dark:from-dark dark:via-dark-light dark:to-dark" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#5FC8DA40_1px,transparent_1px),linear-gradient(to_bottom,#5FC8DA40_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#5FC8DA25_1px,transparent_1px),linear-gradient(to_bottom,#5FC8DA25_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black_85%)]" />
      </div>

      <div className="relative z-10">
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">Hizmetlerimiz</h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                İşletmenizi dijital dünyada öne çıkaracak kapsamlı çözümler sunuyoruz
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-dark-light/50 p-8 rounded-2xl border border-slate-200 dark:border-white/10 hover:border-primary/30 transition-all group cursor-pointer"
                  onClick={() => setSelectedService(service)}
                >
                  <service.icon className="h-14 w-14 text-primary mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white">{service.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">{service.description}</p>
                  <button className="flex items-center space-x-2 text-primary font-medium group-hover:translate-x-2 transition-transform">
                    <span>Detayları Gör</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-20 bg-gradient-to-r from-primary to-primary-dark rounded-2xl p-8 md:p-12 text-center text-white"
            >
              <h2 className="text-3xl font-bold mb-4">Projenizi Konuşalım</h2>
              <p className="text-xl mb-8 opacity-90">
                Size özel çözümler için hemen iletişime geçin
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/project-request"
                  className="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-white text-primary rounded-xl hover:shadow-xl hover:scale-105 transition-all font-medium"
                >
                  <span>Teklif Al</span>
                  <ArrowUpRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-xl hover:bg-white/20 transition-all font-medium"
                >
                  <span>İletişime Geç</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedService(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-dark-light rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <selectedService.icon className="w-16 h-16 text-primary mb-6" />
              <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">{selectedService.title}</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">{selectedService.detailedDescription}</p>

              <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Özellikler</h3>
              <div className="grid md:grid-cols-2 gap-3 mb-8">
                {selectedService.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-start space-x-3"
                  >
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/project-request"
                  className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl hover:shadow-lg transition-all font-medium"
                  onClick={() => setSelectedService(null)}
                >
                  <span>Teklif Al</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/contact"
                  className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white rounded-xl hover:bg-slate-200 dark:hover:bg-white/10 transition-colors font-medium border border-slate-200 dark:border-white/10"
                  onClick={() => setSelectedService(null)}
                >
                  <span>Bize Ulaşın</span>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Services;

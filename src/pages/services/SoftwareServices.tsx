import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Globe, Smartphone, Database, BrainCircuit, Zap,
  CheckCircle, ArrowUpRight
} from 'lucide-react';
import { WebDevelopmentModal } from '../../components/ui/service-modals/web-development-modal';
import { MobileDevelopmentModal } from '../../components/ui/service-modals/mobile-development-modal';
import { SaaSSolutionsModal } from '../../components/ui/service-modals/saas-solutions-modal';
import { AIIntegrationModal } from '../../components/ui/service-modals/ai-integration-modal';

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
  transition: { staggerChildren: 0.2 }
};

const ServiceCard = ({ 
  icon: Icon, 
  title, 
  items,
  onClick 
}: { 
  icon: React.ElementType;
  title: string;
  items: string[];
  onClick: () => void;
}) => (
  <motion.div 
    variants={fadeInUp}
    className="bg-dark-light/50 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-primary/20 transition-all group cursor-pointer"
    onClick={onClick}
  >
    <Icon className="h-12 w-12 text-primary mb-6 group-hover:scale-110 transition-transform" />
    <h3 className="text-xl font-bold mb-4">{title}</h3>
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index} className="text-gray-400 flex items-start space-x-2">
          <CheckCircle className="w-4 h-4 text-primary/70 shrink-0 mt-1" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </motion.div>
);

const SoftwareServices = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000"
            alt="Software Services"
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
              <span>Yazılım Hizmetleri</span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Modern Yazılım Çözümleri
            </h1>
            <p className="text-xl text-gray-300">
              İşletmenizi geleceğe taşıyacak özel yazılım çözümleri
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={stagger}
            initial="initial"
            whileInView="whileInView"
            viewport={stagger.viewport}
          >
            <ServiceCard
              icon={Globe}
              title="Web Geliştirme"
              items={[
                "Statik Kurumsal Web Siteleri",
                "Dinamik ve Fonksiyonel Web Siteleri",
                "E-Ticaret Web Siteleri",
                "Özel Web Çözümleri"
              ]}
              onClick={() => setActiveModal('web')}
            />

            <ServiceCard
              icon={Smartphone}
              title="Mobil Uygulama"
              items={[
                "iOS Uygulama Geliştirme",
                "Android Uygulama Geliştirme",
                "Cross-Platform Uygulamalar",
                "PWA Geliştirme"
              ]}
              onClick={() => setActiveModal('mobile')}
            />

            <ServiceCard
              icon={Database}
              title="SaaS Çözümleri"
              items={[
                "Yönetim ve CRM Sistemleri",
                "Proje ve Görev Yönetim Araçları",
                "Özel İş Sü reçleri Yazılımları",
                "Cloud Tabanlı Çözümler"
              ]}
              onClick={() => setActiveModal('saas')}
            />

            <ServiceCard
              icon={BrainCircuit}
              title="AI Entegrasyonları"
              items={[
                "Yapay Zeka Chatbot Sistemleri",
                "Robotik Süreç Otomasyonu (RPA)",
                "AI Destekli İş Süreçleri",
                "Makine Öğrenmesi Çözümleri"
              ]}
              onClick={() => setActiveModal('ai')}
            />
          </motion.div>
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
                Yazılım Projenizi Başlatalım
              </h2>
              <p className="text-gray-300 mb-8">
                İşletmenize özel yazılım çözümleri için hemen iletişime geçin
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

      {/* Service Detail Modals */}
      <WebDevelopmentModal 
        isOpen={activeModal === 'web'} 
        onClose={() => setActiveModal(null)} 
      />
      <MobileDevelopmentModal 
        isOpen={activeModal === 'mobile'} 
        onClose={() => setActiveModal(null)} 
      />
      <SaaSSolutionsModal 
        isOpen={activeModal === 'saas'} 
        onClose={() => setActiveModal(null)} 
      />
      <AIIntegrationModal 
        isOpen={activeModal === 'ai'} 
        onClose={() => setActiveModal(null)} 
      />
    </div>
  );
};

export default SoftwareServices;
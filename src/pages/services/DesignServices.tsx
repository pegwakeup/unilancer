import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Monitor, PaintBucket, FileImage, Figma, Zap,
  CheckCircle, ArrowUpRight
} from 'lucide-react';
import { DigitalWebModal } from '../../components/ui/service-modals/design/digital-web-modal';
import { BrandIdentityModal } from '../../components/ui/service-modals/design/brand-identity-modal';
import { PrintGraphicModal } from '../../components/ui/service-modals/design/print-graphic-modal';
import { IllustrationModal } from '../../components/ui/service-modals/design/illustration-modal';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6 }
};

const ServiceCard = ({ 
  icon: Icon, 
  title, 
  description,
  items,
  onClick 
}: { 
  icon: React.ElementType;
  title: string;
  description: string;
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
    <p className="text-gray-400 mb-6">{description}</p>
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

const DesignServices = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=2000"
            alt="Design Services"
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
              <span>Tasarım Hizmetleri</span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Modern ve Etkileyici Tasarımlar
            </h1>
            <p className="text-xl text-gray-300">
              Markanızı öne çıkaracak kullanıcı odaklı tasarım çözümleri
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            <ServiceCard
              icon={Monitor}
              title="Dijital & Web Tasarım"
              description="Modern ve kullanıcı dostu web tasarımları ile markanızı dijital dünyada öne çıkarın."
              items={[
                "Responsive Web Tasarımı",
                "UI/UX Tasarımı",
                "E-ticaret Tasarımı",
                "Landing Page Tasarımı"
              ]}
              onClick={() => setActiveModal('digital-web')}
            />

            <ServiceCard
              icon={PaintBucket}
              title="Kurumsal Kimlik & Marka"
              description="Profesyonel ve akılda kalıcı kurumsal kimlik tasarımları ile markanızı güçlendirin."
              items={[
                "Logo Tasarımı",
                "Marka Kimliği",
                "Kurumsal Şablonlar",
                "Stil Rehberi"
              ]}
              onClick={() => setActiveModal('brand-identity')}
            />

            <ServiceCard
              icon={FileImage}
              title="Basılı & Grafik Tasarım"
              description="Etkileyici basılı materyal tasarımları ile markanızı her yerde temsil edin."
              items={[
                "Katalog & Broşür",
                "Ambalaj Tasarımı",
                "Poster & Afiş",
                "Promosyon Malzemeleri"
              ]}
              onClick={() => setActiveModal('print-graphic')}
            />

            <ServiceCard
              icon={Figma}
              title="İllüstrasyon & 3D"
              description="Özgün illüstrasyonlar ve etkileyici 3D tasarımlar ile fark yaratın."
              items={[
                "Dijital İllüstrasyon",
                "Karakter Tasarımı",
                "3D Modelleme",
                "Animasyon"
              ]}
              onClick={() => setActiveModal('illustration')}
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
                Tasarım Projenizi Başlatalım
              </h2>
              <p className="text-gray-300 mb-8">
                Markanızı öne çıkaracak tasarım çözümleri için hemen iletişime geçin
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
      <DigitalWebModal 
        isOpen={activeModal === 'digital-web'} 
        onClose={() => setActiveModal(null)} 
      />
      <BrandIdentityModal 
        isOpen={activeModal === 'brand-identity'} 
        onClose={() => setActiveModal(null)} 
      />
      <PrintGraphicModal 
        isOpen={activeModal === 'print-graphic'} 
        onClose={() => setActiveModal(null)} 
      />
      <IllustrationModal 
        isOpen={activeModal === 'illustration'} 
        onClose={() => setActiveModal(null)} 
      />
    </div>
  );
};

export default DesignServices;
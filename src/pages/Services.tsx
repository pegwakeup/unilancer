import React from 'react';
import { motion } from 'framer-motion';
import { 
  Code2, Database, Globe, Palette, PenTool, Layout,
  LineChart, Search, TrendingUp, Smartphone, Cpu,
  MessageSquare, BarChart2, Layers, Zap, Box,
  PaintBucket, FileImage, Image, Figma, Monitor,
  Briefcase, Target, Users, BrainCircuit, ArrowUpRight,
  CheckCircle
} from 'lucide-react';

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

const ServiceCard = ({ icon: Icon, title, items }: { 
  icon: React.ElementType;
  title: string;
  items: string[];
}) => (
  <motion.div 
    variants={fadeInUp}
    className="bg-white dark:bg-dark-light/50 backdrop-blur-sm p-6 rounded-xl border border-slate-200 dark:border-white/10 hover:border-primary/20 transition-all group shadow-sm"
  >
    <Icon className="h-12 w-12 text-primary mb-6 group-hover:scale-110 transition-transform" />
    <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">{title}</h3>
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index} className="text-gray-600 dark:text-gray-400 flex items-start space-x-2">
          <CheckCircle className="w-4 h-4 text-primary/70 shrink-0 mt-1" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </motion.div>
);

const ImageSection = ({ image, title, description }: {
  image: string;
  title: string;
  description: string;
}) => (
  <motion.div
    variants={fadeInUp}
    className="relative aspect-[4/3] rounded-xl overflow-hidden group"
  >
    <img
      src={image}
      alt={title}
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent dark:from-dark/90 dark:via-dark/50 dark:to-transparent flex items-end">
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
        <p className="text-gray-200 dark:text-gray-300 text-sm">{description}</p>
      </div>
    </div>
  </motion.div>
);

const Services = () => {
  return (
    <div className="pt-24 pb-16 bg-gradient-to-br from-blue-50 via-cyan-50/40 to-blue-100/30 dark:bg-dark">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000"
            alt="Services"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/70 to-white dark:from-dark/90 dark:via-dark/70 dark:to-dark" />
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
              <span>Modern Çözümler</span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
              DigitAll
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              İşletmenizi dijital dünyada öne çıkaracak kapsamlı çözümler sunuyoruz
            </p>
          </motion.div>
        </div>
      </section>

      {/* Design Services */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={fadeInUp.viewport}
          >
            <h2 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">Tasarım</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Modern ve kullanıcı odaklı tasarım çözümleri ile markanızı öne çıkarın
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={stagger}
            initial="initial"
            whileInView="whileInView"
            viewport={stagger.viewport}
          >
            <ServiceCard
              icon={Monitor}
              title="Dijital & Web Tasarım"
              items={[
                "Web & Mobil Uygulama Tasarımı",
                "UI & UX Tasarımı",
                "E-Ticaret ve Satış Sayfası Tasarımları"
              ]}
            />

            <ServiceCard
              icon={PaintBucket}
              title="Kurumsal Kimlik & Marka"
              items={[
                "Logo ve Kurumsal Kimlik Oluşturma",
                "Marka Konsept Tasarımı",
                "Reklam ve Promosyon Tasarımları"
              ]}
            />

            <ServiceCard
              icon={FileImage}
              title="Basılı & Grafik Tasarım"
              items={[
                "Katalog ve Broşür Tasarımı",
                "Ambalaj ve Etiket Tasarımı",
                "Poster ve Afiş Tasarımı"
              ]}
            />

            <ServiceCard
              icon={Figma}
              title="İllüstrasyon & Özel Grafik"
              items={[
                "Dijital Çizim & Karakter Tasarımı",
                "3D Modelleme & Render Tasarım",
                "Özel Grafik Çözümleri"
              ]}
            />
          </motion.div>

          {/* Design Examples */}
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16"
            variants={stagger}
            initial="initial"
            whileInView="whileInView"
            viewport={stagger.viewport}
          >
            <ImageSection
              image="https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800"
              title="UI/UX Tasarım"
              description="Kullanıcı deneyimini ön planda tutan, modern ve etkileyici arayüz tasarımları"
            />
            <ImageSection
              image="https://images.unsplash.com/photo-1613909207039-6b173b755cc1?auto=format&fit=crop&q=80&w=800"
              title="Marka Kimliği"
              description="Markanızı yansıtan özgün ve profesyonel kurumsal kimlik tasarımları"
            />
            <ImageSection
              image="https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800"
              title="3D Tasarım"
              description="Etkileyici 3D modelleme ve görselleştirme çözümleri"
            />
          </motion.div>
        </div>
      </section>

      {/* Software Development */}
      <section className="py-20 bg-blue-50/50 dark:bg-dark-light/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={fadeInUp.viewport}
          >
            <h2 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">Yazılım</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Modern teknolojiler ve en iyi pratiklerle özel yazılım çözümleri
            </p>
          </motion.div>

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
            />

            <ServiceCard
              icon={Smartphone}
              title="Mobil Uygulama"
              items={[
                "Kurumsal Mobil Uygulamalar",
                "Saha Operasyonları Uygulamaları",
                "Müşteri Servisi Uygulamaları"
              ]}
            />

            <ServiceCard
              icon={Database}
              title="S.a.a.S Çözümleri"
              items={[
                "Yönetim ve CRM Sistemleri",
                "Proje ve Görev Yönetim Araçları",
                "Özel İş Süreçleri Yazılımları"
              ]}
            />

            <ServiceCard
              icon={BrainCircuit}
              title="AI Entegrasyonları"
              items={[
                "Yapay Zeka Chatbot Sistemleri",
                "Robotik Süreç Otomasyonu (RPA)",
                "AI Destekli İş Süreçleri"
              ]}
            />
          </motion.div>

          {/* Software Examples */}
          <motion.div 
            className="grid md:grid-cols-3 gap-8 mt-16"
            variants={stagger}
            initial="initial"
            whileInView="whileInView"
            viewport={stagger.viewport}
          >
            <ImageSection
              image="https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=800"
              title="Web Uygulamaları"
              description="Modern teknolojilerle geliştirilmiş, ölçeklenebilir web uygulamaları"
            />
            <ImageSection
              image="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800"
              title="Mobil Uygulamalar"
              description="iOS ve Android için native mobil uygulama geliştirme"
            />
            <ImageSection
              image="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800"
              title="AI Çözümleri"
              description="Yapay zeka ve makine öğrenmesi destekli akıllı sistemler"
            />
          </motion.div>
        </div>
      </section>

      {/* Digital Marketing */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={fadeInUp.viewport}
          >
            <h2 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">Dijital Pazarlama ve Strateji</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Markanızı dijital dünyada güçlendiren stratejik çözümler
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 gap-8"
            variants={stagger}
            initial="initial"
            whileInView="whileInView"
            viewport={stagger.viewport}
          >
            <ServiceCard
              icon={Search}
              title="SEO ve Dijital Reklam Yönetimi"
              items={[
                "Arama Motoru Optimizasyonu (SEO)",
                "Google Ads, Facebook Ads, Instagram ve LinkedIn Reklamları",
                "Remarketing ve Hedef Kitle Optimizasyonu",
                "Sosyal Medya Yönetimi"
              ]}
            />

            <ServiceCard
              icon={Target}
              title="Pazar Araştırması & Marka Stratejisi"
              items={[
                "Sektör ve Rakip Analizi",
                "Stratejik Proje Geliştirme",
                "Hedef Kitleye Yönelik İçerik Çalışmaları",
                "Marka Danışmanlık Hizmetleri"
              ]}
            />
          </motion.div>

          {/* Marketing Examples */}
          <motion.div 
            className="grid md:grid-cols-2 gap-8 mt-16"
            variants={stagger}
            initial="initial"
            whileInView="whileInView"
            viewport={stagger.viewport}
          >
            <ImageSection
              image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
              title="Dijital Pazarlama"
              description="Veriye dayalı dijital pazarlama stratejileri ve kampanya yönetimi"
            />
            <ImageSection
              image="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80&w=800"
              title="Marka Stratejisi"
              description="Markanızı güçlendiren kapsamlı stratejik planlama ve danışmanlık"
            />
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-50/50 dark:bg-dark-light/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-dark-light/50 backdrop-blur-sm p-8 rounded-xl border border-slate-200 dark:border-white/10 relative overflow-hidden shadow-lg"
          >
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent" />
            </div>
            
            <div className="relative max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
                Projenizi Hayata Geçirmeye Hazır mısınız?
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Size özel çözümler için hemen iletişime geçin
              </p>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 bg-primary text-white rounded-lg font-medium group"
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

export default Services;
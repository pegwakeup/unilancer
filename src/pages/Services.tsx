import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Palette, LineChart, Zap, CheckCircle, Globe, Smartphone, Database, BrainCircuit } from 'lucide-react';

const Services = () => {
  return (
    <div className="pt-24 pb-16 bg-gradient-to-br from-blue-50 via-cyan-50/40 to-blue-100/30 dark:bg-dark">
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">Hizmetlerimiz</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">İşletmenizi dijital dünyada öne çıkaracak kapsamlı çözümler sunuyoruz</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Globe, title: 'Web Geliştirme', desc: 'Modern web uygulamaları' },
              { icon: Smartphone, title: 'Mobil Uygulama', desc: 'iOS ve Android uygulamalar' },
              { icon: Palette, title: 'UI/UX Tasarım', desc: 'Kullanıcı odaklı tasarımlar' },
              { icon: Database, title: 'SaaS Çözümleri', desc: 'Bulut tabanlı yazılımlar' },
              { icon: BrainCircuit, title: 'AI Entegrasyonu', desc: 'Yapay zeka çözümleri' },
              { icon: LineChart, title: 'Dijital Pazarlama', desc: 'SEO ve reklam yönetimi' }
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-dark-light/50 p-6 rounded-xl border border-slate-200 dark:border-white/10 hover:border-primary/20 transition-all group"
              >
                <service.icon className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;

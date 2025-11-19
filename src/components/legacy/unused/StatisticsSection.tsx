// LEGACY / UNUSED COMPONENT
// Şu anda projede kullanılmıyor, gelecekte referans için saklanıyor.

import React from 'react';
import { motion } from 'framer-motion';
import { Users, Code2, Award, Globe, Zap, Target } from 'lucide-react';

const statistics = [
  {
    icon: Users,
    value: "500+",
    label: "Mutlu Müşteri",
    description: "Başarıyla tamamlanan projeler",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
  },
  {
    icon: Code2,
    value: "1000+",
    label: "Yazılım Projesi",
    description: "Geliştirilen çözümler",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80"
  },
  {
    icon: Award,
    value: "50+",
    label: "Ödül & Başarı",
    description: "Sektörel başarılar",
    image: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=800&q=80"
  },
  {
    icon: Globe,
    value: "20+",
    label: "Ülke",
    description: "Global müşteri ağı",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80"
  }
];

const StatisticsSection = () => {
  return (
    <div className="py-20 bg-gradient-to-b from-dark to-dark-light relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary-light/20" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid md:grid-cols-4 gap-8">
          {statistics.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="relative bg-dark-light p-8 rounded-xl border border-white/10 hover:border-primary/20 transition-all overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <img
                    src={stat.image}
                    alt=""
                    className="w-full h-full object-cover filter blur-sm"
                  />
                  <div className="absolute inset-0 bg-dark-light/80" />
                </div>
                
                <div className="relative">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6 group-hover:scale-110 transition-transform duration-500">
                    <stat.icon className="w-8 h-8 text-primary" />
                  </div>
                  
                  <motion.div
                    initial={{ scale: 0.5 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2, type: "spring" }}
                    className="text-4xl font-bold mb-2"
                  >
                    {stat.value}
                  </motion.div>
                  
                  <h3 className="text-xl font-semibold mb-2">{stat.label}</h3>
                  <p className="text-gray-400">{stat.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatisticsSection;
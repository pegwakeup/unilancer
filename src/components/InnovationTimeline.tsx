import React from 'react';
import { motion } from 'framer-motion';
import { Milestone, ArrowRight, Zap } from 'lucide-react';

const timelineData = [
  {
    year: '2020',
    title: 'AI Entegrasyonu',
    description: 'Yapay zeka destekli çözümlerimizle müşteri deneyimini dönüştürdük.'
  },
  {
    year: '2021',
    title: 'Cloud Mimarisi',
    description: 'Bulut tabanlı altyapımızla ölçeklenebilir çözümler sunduk.'
  },
  {
    year: '2022',
    title: 'IoT Platformu',
    description: 'Endüstriyel IoT çözümlerimizle verimliliği artırdık.'
  },
  {
    year: '2023',
    title: 'Blockchain',
    description: 'Güvenli ve şeffaf işlemler için blockchain altyapısı geliştirdik.'
  }
];

const InnovationTimeline = () => {
  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Timeline Line */}
          <div className="absolute left-0 md:left-1/2 h-full w-px bg-gradient-to-b from-primary/50 to-primary/20" />

          {/* Timeline Items */}
          <div className="space-y-16">
            {timelineData.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Content */}
                <div className="flex-1 md:w-1/2">
                  <div className="p-6 bg-white/5 rounded-xl border border-white/10 hover:border-primary/20 transition-all group">
                    <div className="text-primary text-xl font-bold mb-2">{item.year}</div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                </div>

                {/* Timeline Point */}
                <div className="absolute left-0 md:left-1/2 w-8 h-8 -ml-4 bg-dark rounded-full border-4 border-primary" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default InnovationTimeline;
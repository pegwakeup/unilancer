import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Globe, CheckCircle, Palette, Code2, TrendingUp, Award, Heart, Zap, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const values = [
  {
    icon: Target,
    title: 'Mükemmellik',
    description: 'Her projede en yüksek kalite standartlarını hedefliyoruz.'
  },
  {
    icon: Heart,
    title: 'Tutku',
    description: 'İşimizi tutkuyla yapıyor ve her projede fark yaratıyoruz.'
  },
  {
    icon: Users,
    title: 'İşbirliği',
    description: 'Müşterilerimizle güçlü ortaklıklar kurarak başarıya ulaşıyoruz.'
  },
  {
    icon: Zap,
    title: 'İnovasyon',
    description: 'Yenilikçi çözümlerle teknolojinin sınırlarını zorluyoruz.'
  }
];

const stats = [
  { number: '150+', label: 'Freelancer' },
  { number: '200+', label: 'Tamamlanan Proje' },
  { number: '50+', label: 'Mutlu Müşteri' },
  { number: '3', label: 'Yıllık Deneyim' }
];

const timeline = [
  {
    year: '2022',
    title: 'Kuruluş',
    description: 'Üniversiteli freelancerlar olarak Unilancer Labs\'i kurduk.'
  },
  {
    year: '2023',
    title: 'Büyüme',
    description: '150+ yetkin freelancerı bünyemize kattık ve Unilance iş modelini geliştirdik.'
  },
  {
    year: '2024',
    title: 'Teknopark İstanbul',
    description: 'Teknopark İstanbul bünyesinde B2B hizmetler sunmaya başladık.'
  }
];

const About = () => {
  return (
    <div className="relative min-h-screen pt-24 pb-16">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-cyan-50/40 to-blue-100/30 dark:from-dark dark:via-dark-light dark:to-dark" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#5FC8DA40_1px,transparent_1px),linear-gradient(to_bottom,#5FC8DA40_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#5FC8DA25_1px,transparent_1px),linear-gradient(to_bottom,#5FC8DA25_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black_85%)]" />
      </div>

      <div className="relative z-10">
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">Hakkımızda</h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Genç, dinamik ve tutkulu bir ekiple dijital dünyada fark yaratıyoruz
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">Hikayemiz</h2>
                <div className="space-y-6 text-gray-600 dark:text-gray-300 text-lg">
                  <p>
                    2022 yılında, farklı alanlarda freelance hizmet veren üniversiteli gençler olarak; "Uni" (üniversiteli, bir ve bütün) ve "Freelancer" kavramlarından ilham alarak <span className="text-primary font-semibold">Unilancer Labs</span>'i kurduk.
                  </p>
                  <p>
                    Kısa sürede <span className="text-primary font-semibold">150</span>'den fazla <span className="text-primary font-semibold">yetkin freelancerı</span> bünyemize katarak "Unilance" iş modelini geliştirdik.
                  </p>
                  <p>
                    Bugün, <span className="text-primary font-semibold">Teknopark İstanbul</span> bünyesinde yazılım, tasarım ve pazarlama alanlarında <span className="text-primary font-semibold">B2B</span> hizmetler sunuyoruz.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80"
                    alt="Team Meeting"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-6 bg-white dark:bg-dark-light/50 rounded-xl border border-slate-200 dark:border-white/10"
                >
                  <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            <div className="mb-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">Misyon & Vizyon</h2>
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  Teknoloji ve yaratıcılığı birleştirerek işletmelere değer katıyoruz
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-dark-light/50 p-8 rounded-2xl border border-slate-200 dark:border-white/10"
                >
                  <Target className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Misyonumuz</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Yetkin freelancer ağımız ve modern teknolojilerle işletmelerin dijital dönüşümüne öncülük ederek, kaliteli ve yenilikçi çözümler sunmak.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-dark-light/50 p-8 rounded-2xl border border-slate-200 dark:border-white/10"
                >
                  <Globe className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Vizyonumuz</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Türkiye'nin önde gelen teknoloji ve yaratıcılık merkezi olarak, global çapta tanınan bir marka olmak ve genç yeteneklere ilham vermek.
                  </p>
                </motion.div>
              </div>
            </div>

            <div className="mb-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">Değerlerimiz</h2>
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  Bizi biz yapan temel prensipler
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {values.map((value, index) => (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white dark:bg-dark-light/50 p-6 rounded-xl border border-slate-200 dark:border-white/10 hover:border-primary/20 transition-all group"
                  >
                    <value.icon className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">{value.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mb-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">Yolculuğumuz</h2>
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  Başlangıçtan bugüne gelen süreçte attığımız önemli adımlar
                </p>
              </motion.div>

              <div className="relative max-w-4xl mx-auto">
                <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary-light to-primary transform -translate-x-1/2" />

                {timeline.map((item, index) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className={`relative flex items-center mb-12 ${
                      index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                    }`}
                  >
                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                      <div className="bg-white dark:bg-dark-light/50 p-6 rounded-xl border border-slate-200 dark:border-white/10 inline-block">
                        <div className="text-primary font-bold text-2xl mb-2">{item.year}</div>
                        <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">{item.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                      </div>
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-white dark:border-dark" />
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-primary to-primary-dark rounded-2xl p-8 md:p-12 text-center text-white"
            >
              <h2 className="text-3xl font-bold mb-4">Ekibimize Katılın</h2>
              <p className="text-xl mb-8 opacity-90">
                Yetenekli, tutkulu ve yenilikçi freelancerlar arıyoruz
              </p>
              <Link
                to="/join"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-primary rounded-xl hover:shadow-xl hover:scale-105 transition-all font-medium"
              >
                <span>Başvuru Yap</span>
                <ArrowUpRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles, Globe, ShoppingCart, Palette, FileText, Search } from 'lucide-react';
import { CTASection } from '../components/ui/cta-with-glow';
import { LogosCarousel } from '../components/ui/logos-carousel';
import { FaqSectionDemo } from '../components/ui/faq-demo';
import { FeatureSectionTop } from '../components/ui/feature-section-top';
import { FeatureSectionBottom } from '../components/ui/feature-section-bottom';
import { ServicesSection } from '../components/ui/services-section';
import { PortfolioPreview } from '../components/ui/portfolio-preview';

const services = [
  { icon: Globe, label: 'Web Sitesi' },
  { icon: ShoppingCart, label: 'E-Ticaret' },
  { icon: Palette, label: 'Tasarım' },
  { icon: FileText, label: 'İçerik' },
  { icon: Search, label: 'SEO' },
];

const Home = () => {
  return (
    <div className="relative min-h-screen">
      {/* Enhanced Fixed Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-cyan-50/50 to-blue-100/40 dark:from-dark dark:via-dark-light dark:to-dark" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#5FC8DA40_1px,transparent_1px),linear-gradient(to_bottom,#5FC8DA40_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#5FC8DA30_1px,transparent_1px),linear-gradient(to_bottom,#5FC8DA30_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black_85%)]" />

        {/* Animated Gradient Orbs */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 dark:bg-primary/5 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5
          }}
          className="absolute bottom-1/4 right-1/4 w-[32rem] h-[32rem] bg-cyan-400/10 dark:bg-cyan-500/5 rounded-full blur-[120px]"
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative min-h-[95vh] md:min-h-screen flex items-center overflow-hidden py-24 md:py-32 lg:py-40">
          <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid lg:grid-cols-[42%_58%] gap-16 lg:gap-20 xl:gap-24 items-center">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-10 lg:pr-4"
              >
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="inline-flex items-center px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/20 to-cyan-400/20 dark:from-primary/30 dark:to-cyan-500/30 text-primary dark:text-primary backdrop-blur-sm border border-primary/30 dark:border-primary/40 shadow-lg shadow-primary/10"
                >
                  <Sparkles className="w-5 h-5 mr-2.5" />
                  <span className="text-sm font-semibold tracking-wide">Türkiye'nin Yeni Nesil Freelance Platformu</span>
                </motion.div>

                {/* Heading */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.7 }}
                  className="space-y-6"
                >
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.1] text-slate-900 dark:text-white tracking-tight">
                    Türkiye'nin{' '}
                    <span className="text-primary relative inline-block">
                      üniversiteli
                      <svg className="absolute -bottom-2 sm:-bottom-3 left-0 w-full h-3 sm:h-4" viewBox="0 0 200 12" preserveAspectRatio="none">
                        <path d="M0,7 Q50,2 100,7 T200,7" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" opacity="0.4"/>
                      </svg>
                    </span>
                    {' '}freelancer ekosistemi
                  </h1>
                </motion.div>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.7 }}
                  className="text-lg sm:text-xl md:text-2xl text-slate-600 dark:text-gray-300 leading-relaxed max-w-2xl font-medium"
                >
                  Unilancer'da projelerinizi seçilmiş üniversiteli ekipler üretir, deneyimli proje yöneticileri uçtan uca yönetir; siz hem uygun bütçeyle çalışır hem de genç yeteneklerin büyümesine katkı sağlarsınız.
                </motion.p>

                {/* Services Tags */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.7 }}
                  className="space-y-4"
                >
                  <p className="text-sm font-bold text-slate-500 dark:text-gray-400 uppercase tracking-widest">Hizmetlerimiz</p>
                  <div className="flex flex-wrap gap-3">
                    {services.map((service, index) => (
                      <motion.div
                        key={service.label}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 + index * 0.08, duration: 0.5 }}
                        className="flex items-center gap-2.5 px-5 py-2.5 bg-white/90 dark:bg-white/10 backdrop-blur-md rounded-xl border border-slate-200 dark:border-white/20 shadow-lg hover:shadow-xl hover:scale-105 hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
                      >
                        <service.icon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-semibold text-slate-700 dark:text-gray-200">{service.label}</span>
                      </motion.div>
                    ))}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + services.length * 0.08, duration: 0.5 }}
                      className="flex items-center gap-1 px-5 py-2.5 bg-gradient-to-r from-primary/15 to-cyan-400/15 dark:from-primary/25 dark:to-cyan-500/25 backdrop-blur-md rounded-xl border border-primary/30 dark:border-primary/40 shadow-lg"
                    >
                      <span className="text-sm font-semibold text-primary">ve daha fazlası...</span>
                    </motion.div>
                  </div>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.7 }}
                  className="flex flex-col sm:flex-row gap-4 pt-6"
                >
                  <motion.a
                    href="/project-request"
                    className="inline-flex items-center justify-center px-10 py-5 bg-primary hover:bg-primary-dark text-white rounded-2xl font-bold text-lg transition-all shadow-2xl shadow-primary/30 hover:shadow-primary/40 group"
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Projenizi Başlatalım</span>
                    <ArrowUpRight className="w-6 h-6 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </motion.a>

                  <motion.a
                    href="/portfolio"
                    className="inline-flex items-center justify-center px-10 py-5 bg-white/90 dark:bg-white/10 backdrop-blur-md text-slate-900 dark:text-white rounded-2xl font-bold text-lg hover:bg-slate-100 dark:hover:bg-white/20 transition-all border-2 border-slate-200 dark:border-white/20 shadow-xl group"
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Portfolyomuzu İnceleyin</span>
                    <ArrowUpRight className="w-6 h-6 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </motion.a>
                </motion.div>
              </motion.div>

              {/* Right Image */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <div className="relative group">
                  {/* Enhanced Glow Effect with Pulse Animation */}
                  <motion.div
                    animate={{
                      scale: [1, 1.05, 1],
                      opacity: [0.4, 0.6, 0.4]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute -inset-8 bg-gradient-to-r from-primary/40 via-cyan-400/40 to-primary/40 dark:from-primary/50 dark:via-cyan-500/50 dark:to-primary/50 rounded-[3rem] blur-[60px]"
                  />

                  {/* Main Image Container - Larger and No Border */}
                  <div className="relative aspect-[3/2] rounded-[2rem] overflow-hidden">
                    {/* Layered Shadow System */}
                    <div className="absolute -inset-1 bg-gradient-to-br from-slate-900/20 to-transparent rounded-[2rem] blur-xl" />
                    <div className="absolute -inset-2 bg-gradient-to-tr from-primary/20 to-cyan-400/20 rounded-[2rem] blur-2xl" />

                    <motion.img
                      src="https://ctncspdgguclpeijikfp.supabase.co/storage/v1/object/public/Landing%20Page/elsikisma.webp"
                      alt="Unilancer Üniversiteli Freelancer Ekosistemi"
                      className="relative w-full h-full object-cover group-hover:scale-[1.08] transition-transform duration-1000 ease-out"
                      whileHover={{ scale: 1.02 }}
                    />

                    {/* Gradient Overlay for Depth */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-cyan-400/5 pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-white/10 dark:to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </div>

                  {/* Enhanced Floating Decorative Elements */}
                  <motion.div
                    animate={{
                      y: [0, -15, 0],
                      x: [0, 5, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-primary/30 to-cyan-400/30 dark:from-primary/40 dark:to-cyan-500/40 rounded-full blur-3xl"
                  />
                  <motion.div
                    animate={{
                      y: [0, 15, 0],
                      x: [0, -5, 0],
                      scale: [1, 1.15, 1]
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1.5
                    }}
                    className="absolute -bottom-8 -left-8 w-40 h-40 bg-gradient-to-tr from-cyan-400/30 to-primary/30 dark:from-cyan-500/40 dark:to-primary/40 rounded-full blur-3xl"
                  />
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                      x: [0, 10, 0],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{
                      duration: 7,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 3
                    }}
                    className="absolute top-1/2 -right-12 w-28 h-28 bg-gradient-to-bl from-primary/25 to-cyan-400/25 dark:from-primary/35 dark:to-cyan-500/35 rounded-full blur-3xl"
                  />
                </div>

                {/* Enhanced Stats Badge - Responsive */}
                <motion.div
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute -bottom-8 sm:-bottom-10 left-0 right-0 mx-auto w-fit lg:left-12 lg:mx-0 bg-white/98 dark:bg-dark-light/98 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border-2 border-slate-200 dark:border-white/10 px-4 sm:px-8 py-4 sm:py-6 hover:scale-105 transition-transform duration-300"
                >
                  <div className="flex items-center gap-4 sm:gap-8">
                    <motion.div
                      className="text-center group cursor-pointer"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-br from-primary to-cyan-400 bg-clip-text text-transparent">500+</div>
                      <div className="text-[10px] sm:text-xs font-semibold text-slate-600 dark:text-gray-400 mt-0.5 sm:mt-1">Üniversiteli</div>
                    </motion.div>
                    <div className="w-px h-10 sm:h-14 bg-gradient-to-b from-transparent via-slate-300 dark:via-white/20 to-transparent" />
                    <motion.div
                      className="text-center group cursor-pointer"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-br from-primary to-cyan-400 bg-clip-text text-transparent">100+</div>
                      <div className="text-[10px] sm:text-xs font-semibold text-slate-600 dark:text-gray-400 mt-0.5 sm:mt-1">Proje</div>
                    </motion.div>
                    <div className="w-px h-10 sm:h-14 bg-gradient-to-b from-transparent via-slate-300 dark:via-white/20 to-transparent" />
                    <motion.div
                      className="text-center group cursor-pointer"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-br from-primary to-cyan-400 bg-clip-text text-transparent">50+</div>
                      <div className="text-[10px] sm:text-xs font-semibold text-slate-600 dark:text-gray-400 mt-0.5 sm:mt-1">İş Ortağı</div>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Feature Section Top */}
        <FeatureSectionTop />

        {/* Services Section */}
        <ServicesSection />

        {/* Partners Section */}
        <section className="pt-8 pb-4 relative overflow-hidden bg-gradient-to-b from-transparent via-purple-50/20 to-transparent dark:from-transparent dark:via-transparent dark:to-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Partnerlerimiz</h2>
              <p className="text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">Güvenilir iş ortaklarımızla birlikte büyüyoruz</p>
            </motion.div>
          </div>

          <LogosCarousel />
        </section>

        {/* Portfolio Preview Section */}
        <PortfolioPreview />

        {/* Feature Section Bottom */}
        <FeatureSectionBottom />

        {/* FAQ Section */}
        <FaqSectionDemo />

        {/* CTA Section */}
        <CTASection
          title="Projenizi Hayata Geçirmeye Hazır mısınız?"
          description="Size özel çözümler için hemen iletişime geçin"
          action={{
            text: "Teklif Alın",
            href: "/project-request",
            variant: "default"
          }}
          className="py-12"
        />
      </div>
    </div>
  );
};

export default Home;
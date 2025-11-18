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
      {/* Fixed Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-cyan-50/40 to-blue-100/30 dark:from-dark dark:via-dark-light dark:to-dark" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#5FC8DA40_1px,transparent_1px),linear-gradient(to_bottom,#5FC8DA40_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#5FC8DA25_1px,transparent_1px),linear-gradient(to_bottom,#5FC8DA25_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black_85%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center overflow-hidden py-20 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-7"
              >
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-primary/15 to-cyan-400/15 dark:from-primary/25 dark:to-cyan-500/25 text-primary dark:text-primary backdrop-blur-sm border border-primary/20 dark:border-primary/30 shadow-sm"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">Türkiye'nin Yeni Nesil Freelance Platformu</span>
                </motion.div>

                {/* Heading */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-4"
                >
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-slate-900 dark:text-white">
                    Türkiye'nin{' '}
                    <span className="text-primary relative inline-block">
                      üniversiteli
                      <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 200 12" preserveAspectRatio="none">
                        <path d="M0,7 Q50,0 100,7 T200,7" fill="none" stroke="currentColor" strokeWidth="3"/>
                      </svg>
                    </span>
                    {' '}freelancer ekosistemi
                  </h1>
                </motion.div>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg sm:text-xl text-slate-600 dark:text-gray-300 leading-relaxed max-w-xl"
                >
                  Unilancer'da projelerinizi seçilmiş üniversiteli ekipler üretir, deneyimli proje yöneticileri uçtan uca yönetir; siz hem uygun bütçeyle çalışır hem de genç yeteneklerin büyümesine katkı sağlarsınız.
                </motion.p>

                {/* Services Tags */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-3"
                >
                  <p className="text-sm font-medium text-slate-500 dark:text-gray-400 uppercase tracking-wide">Hizmetlerimiz</p>
                  <div className="flex flex-wrap gap-3">
                    {services.map((service, index) => (
                      <motion.div
                        key={service.label}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        className="flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-white/5 backdrop-blur-sm rounded-lg border border-slate-200 dark:border-white/10 shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300 group"
                      >
                        <service.icon className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-medium text-slate-700 dark:text-gray-300">{service.label}</span>
                      </motion.div>
                    ))}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + services.length * 0.1 }}
                      className="flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-primary/10 to-cyan-400/10 dark:from-primary/20 dark:to-cyan-500/20 backdrop-blur-sm rounded-lg border border-primary/20 dark:border-primary/30"
                    >
                      <span className="text-sm font-medium text-primary">ve daha fazlası...</span>
                    </motion.div>
                  </div>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="flex flex-col sm:flex-row gap-4 pt-4"
                >
                  <motion.a
                    href="/project-request"
                    className="inline-flex items-center justify-center px-8 py-4 bg-primary hover:bg-primary-dark text-white rounded-xl font-semibold transition-all shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Projenizi Başlatalım</span>
                    <ArrowUpRight className="w-5 h-5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </motion.a>

                  <motion.a
                    href="/portfolio"
                    className="inline-flex items-center justify-center px-8 py-4 bg-white/80 dark:bg-white/5 backdrop-blur-sm text-slate-900 dark:text-white rounded-xl font-semibold hover:bg-slate-100 dark:hover:bg-white/10 transition-all border border-slate-200 dark:border-white/10 group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Portfolyomuzu İnceleyin</span>
                    <ArrowUpRight className="w-5 h-5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </motion.a>
                </motion.div>
              </motion.div>

              {/* Right Image */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative lg:pl-8"
              >
                <div className="relative group">
                  {/* Glow Effect */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 via-cyan-400/30 to-primary/30 dark:from-primary/40 dark:via-cyan-500/40 dark:to-primary/40 rounded-3xl blur-3xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />

                  {/* Main Image Container */}
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                    <img
                      src="https://ctncspdgguclpeijikfp.supabase.co/storage/v1/object/public/Landing%20Page/elsikisma.webp"
                      alt="Unilancer Üniversiteli Freelancer Ekosistemi"
                      className="w-full h-auto object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                    {/* Subtle Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-cyan-400/10 dark:from-primary/20 dark:to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Floating Decorative Elements */}
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-primary/20 to-cyan-400/20 dark:from-primary/30 dark:to-cyan-500/30 rounded-full blur-2xl"
                  />
                  <motion.div
                    animate={{
                      y: [0, 10, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1
                    }}
                    className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-tr from-cyan-400/20 to-primary/20 dark:from-cyan-500/30 dark:to-primary/30 rounded-full blur-2xl"
                  />
                </div>

                {/* Stats Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="absolute -bottom-6 left-1/2 -translate-x-1/2 lg:left-8 lg:translate-x-0 bg-white/95 dark:bg-dark-light/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200 dark:border-white/10 px-6 py-4"
                >
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">500+</div>
                      <div className="text-xs text-slate-600 dark:text-gray-400">Üniversiteli</div>
                    </div>
                    <div className="w-px h-10 bg-slate-200 dark:bg-white/10" />
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">100+</div>
                      <div className="text-xs text-slate-600 dark:text-gray-400">Proje</div>
                    </div>
                    <div className="w-px h-10 bg-slate-200 dark:bg-white/10" />
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">50+</div>
                      <div className="text-xs text-slate-600 dark:text-gray-400">İş Ortağı</div>
                    </div>
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
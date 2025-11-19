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
        <section className="relative isolate min-h-[92vh] flex items-center overflow-visible pt-24 pb-16 md:pt-28 md:pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-7 space-y-6"
              >
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-primary/15 to-cyan-400/15 dark:from-primary/25 dark:to-cyan-500/25 text-primary dark:text-primary backdrop-blur-sm border border-primary/20 dark:border-primary/30 shadow-sm"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">Türkiye&apos;nin Yeni Nesil Freelance Platformu</span>
                </motion.div>

                {/* Heading */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-4"
                >
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-slate-900 dark:text-white max-w-2xl">
                    Türkiye&apos;nin{' '}
                    <span className="text-primary relative inline-block">
                      üniversiteli
                      <svg
                        className="absolute -bottom-2 left-0 w-full h-3 text-primary/80"
                        viewBox="0 0 200 12"
                        preserveAspectRatio="none"
                      >
                        <path
                          d="M0,7 Q50,0 100,7 T200,7"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                        />
                      </svg>
                    </span>
                    <br />
                    <span className="bg-gradient-to-r from-slate-900 via-primary to-cyan-600 bg-clip-text text-transparent dark:from-white dark:via-primary dark:to-cyan-400">
                      freelancer ekosistemi
                    </span>
                  </h1>
                </motion.div>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-base sm:text-lg text-slate-600 dark:text-gray-300 leading-relaxed max-w-xl"
                >
                  Unilancer&apos;da projelerinizi seçilmiş üniversiteli ekipler üretir, deneyimli proje yöneticileri
                  uçtan uca yönetir; siz hem uygun bütçeyle çalışır hem de genç yeteneklerin büyümesine katkı
                  sağlarsınız.
                </motion.p>

                {/* Services Short List */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 }}
                  className="flex flex-wrap gap-2 pt-1"
                >
                  {services.map((service) => (
                    <div
                      key={service.label}
                      className="inline-flex items-center px-3 py-1 rounded-full bg-white/80 dark:bg-white/5 border border-slate-200/70 dark:border-white/10 text-xs sm:text-sm text-slate-800 dark:text-gray-100 shadow-sm"
                    >
                      <service.icon className="w-3.5 h-3.5 mr-1.5" />
                      <span>{service.label}</span>
                    </div>
                  ))}
                </motion.div>

                {/* CTA Buttons + Trust */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-3 pt-4"
                >
                  <div className="flex flex-col sm:flex-row gap-4">
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
                      className="inline-flex items-center justify-center px-8 py-4 bg-white dark:bg-white/5 backdrop-blur-sm text-slate-900 dark:text-white rounded-xl font-semibold hover:bg-slate-100 dark:hover:bg-white/10 transition-all border border-slate-200 dark:border-white/10 group"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>Portfolyomuzu İnceleyin</span>
                      <ArrowUpRight className="w-5 h-5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </motion.a>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-500 dark:text-gray-400">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/80 dark:bg-white/5 border border-slate-200/70 dark:border-white/10 px-3 py-1">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>100+ projede tercih edildi</span>
                    </div>
                    <span className="hidden sm:inline text-slate-300 dark:text-white/20">•</span>
                    <span>Ortalama memnuniyet: 4.9 / 5</span>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right Image */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="lg:col-span-5 flex justify-center lg:justify-end"
              >
                <div className="relative w-full max-w-[520px] group">
                  {/* Glow behind image */}
                  <div
                    className="pointer-events-none absolute -inset-6 rounded-[40px] bg-gradient-to-tr from-primary/25 via-cyan-400/15 to-purple-500/25 opacity-70 blur-2xl group-hover:opacity-100 transition-opacity"
                    aria-hidden="true"
                  />

                  {/* Main Image - no frame, no cropping */}
                  <img
                    src="https://ctncspdgguclpeijikfp.supabase.co/storage/v1/object/public/Landing%20Page/elsikisma.webp"
                    alt="Unilancer Üniversiteli Freelancer Ekosistemi"
                    className="relative w-full h-auto rounded-3xl shadow-2xl object-cover object-center group-hover:scale-[1.02] transition-transform duration-700"
                  />

                  {/* Floating Badge - Ücretsiz Dijital Analiz */}
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="hidden md:flex items-center gap-3 absolute -top-6 left-6 bg-white/95 dark:bg-dark-light/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200 dark:border-white/10 px-4 py-3 z-20"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-cyan-500 text-white">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div className="text-xs">
                      <div className="font-semibold text-slate-900 dark:text-white">
                        Ücretsiz Dijital Analiz
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-gray-400">
                        Web, sosyal medya & rakip incelemesi
                      </div>
                    </div>
                  </motion.div>

                  {/* Floating Mini Metric */}
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 1.0, duration: 0.6 }}
                    className="hidden md:flex items-center gap-3 absolute -right-4 top-14 bg-white/95 dark:bg-dark-light/95 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200 dark:border-white/10 px-4 py-3 z-10"
                  >
                    <div className="flex flex-col">
                      <span className="text-xs text-slate-500 dark:text-gray-400">Teslim süresi</span>
                      <span className="text-sm font-semibold text-slate-900 dark:text-white">
                        3-6 hafta arası
                      </span>
                    </div>
                  </motion.div>

                  {/* Stats Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="mt-5 md:mt-0 md:absolute md:-bottom-6 md:left-6 bg-white/95 dark:bg-dark-light/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200 dark:border-white/10 px-6 py-4 w-full max-w-xs z-30"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="text-center flex-1">
                        <div className="text-2xl font-bold text-primary">500+</div>
                        <div className="text-xs text-slate-600 dark:text-gray-400">Üniversiteli</div>
                      </div>
                      <div className="w-px h-10 bg-slate-200 dark:bg-white/10" />
                      <div className="text-center flex-1">
                        <div className="text-2xl font-bold text-primary">100+</div>
                        <div className="text-xs text-slate-600 dark:text-gray-400">Proje</div>
                      </div>
                      <div className="w-px h-10 bg-slate-200 dark:bg-white/10" />
                      <div className="text-center flex-1">
                        <div className="text-2xl font-bold text-primary">50+</div>
                        <div className="text-xs text-slate-600 dark:text-gray-400">İş Ortağı</div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Scroll Hint */}
          <div className="pointer-events-none absolute bottom-6 inset-x-0 flex justify-center">
            <div className="flex flex-col items-center gap-1 text-[11px] text-slate-400 dark:text-gray-500">
              <span>Dijital çözümlerimizi keşfedin</span>
              <span className="w-px h-6 bg-slate-300/70 dark:bg-white/15 animate-pulse" />
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
              <p className="text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
                Güvenilir iş ortaklarımızla birlikte büyüyoruz
              </p>
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
            text: 'Teklif Alın',
            href: '/project-request',
            variant: 'default',
          }}
          className="py-12"
        />
      </div>
    </div>
  );
};

export default Home;

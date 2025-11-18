import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { CTASection } from '../components/ui/cta-with-glow';
import { LogosCarousel } from '../components/ui/logos-carousel';
import { FaqSectionDemo } from '../components/ui/faq-demo';
import { FeatureSectionTop } from '../components/ui/feature-section-top';
import { FeatureSectionBottom } from '../components/ui/feature-section-bottom';
import { ServicesSection } from '../components/ui/services-section';
import { PortfolioPreview } from '../components/ui/portfolio-preview';

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
        <section className="relative min-h-[92vh] flex items-center pt-24 pb-16 md:pt-32 md:pb-24 overflow-visible">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-6 space-y-6"
              >
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-primary/12 to-cyan-400/12 dark:from-primary/25 dark:to-cyan-500/20 text-primary dark:text-primary border border-primary/20 dark:border-primary/30 shadow-sm backdrop-blur-sm"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">
                    Türkiye&apos;nin üniversiteli freelancer ekosistemi
                  </span>
                </motion.div>

                {/* Heading */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="space-y-3"
                >
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-slate-900 dark:text-white max-w-xl">
                    Dijital projelerinizi{' '}
                    <span className="relative inline-block">
                      seçilmiş
                      <span className="absolute -inset-x-1 -bottom-1 h-3 bg-primary/15 dark:bg-primary/25 rounded-full blur-sm" />
                    </span>{' '}
                    üniversiteli ekiplerle yönetin.
                  </h1>
                </motion.div>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-base sm:text-lg text-slate-600 dark:text-gray-300 leading-relaxed max-w-lg"
                >
                  Unilancer&apos;da web sitesi, e-ticaret, tasarım, içerik ve pazarlama projelerini;
                  seçilmiş üniversiteli ekipler ve deneyimli proje yöneticileriyle, ajans kalitesinde
                  ama daha erişilebilir bütçelerle hayata geçirirsiniz.
                </motion.p>

                {/* Highlights */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2"
                >
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 text-primary" />
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">
                        Seçilmiş ekipler
                      </p>
                      <p className="text-xs text-slate-600 dark:text-gray-400">
                        Üniversitelerden özenle seçilen yetenek havuzu.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 text-primary" />
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">
                        Proje yöneticisi desteği
                      </p>
                      <p className="text-xs text-slate-600 dark:text-gray-400">
                        Uçtan uca süreç takibi ve raporlama.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 text-primary" />
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">
                        Ajans kalitesi
                      </p>
                      <p className="text-xs text-slate-600 dark:text-gray-400">
                        Ajans yerine esnek, uygun maliyetli model.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 }}
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
                    href="/project-request?type=digital-report"
                    className="inline-flex items-center justify-center px-8 py-4 bg-white/90 dark:bg-white/5 backdrop-blur-sm text-slate-900 dark:text-white rounded-xl font-semibold hover:bg-slate-100 dark:hover:bg-white/10 transition-all border border-slate-200 dark:border-white/10 group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Ücretsiz Dijital Rapor Alın</span>
                    <ArrowUpRight className="w-5 h-5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </motion.a>
                </motion.div>

                {/* Trust hint */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 }}
                  className="text-xs sm:text-sm text-slate-500 dark:text-gray-400 pt-1"
                >
                  * Formu doldurun, 24 saat içinde sizinle iletişime geçelim.
                </motion.p>
              </motion.div>

              {/* Right Visual Scene */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="lg:col-span-6 mt-8 lg:mt-0 flex justify-center lg:justify-end"
              >
                <div className="relative w-full max-w-[540px]">
                  {/* Glows */}
                  <div className="pointer-events-none absolute -top-20 -right-10 h-48 w-48 rounded-full bg-primary/25 blur-3xl opacity-70" />
                  <div className="pointer-events-none absolute -bottom-16 -left-10 h-40 w-40 rounded-full bg-cyan-400/25 blur-3xl opacity-70" />

                  {/* Main Card */}
                  <div className="relative rounded-3xl shadow-[0_24px_80px_rgba(15,23,42,0.45)] bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 border border-white/10 overflow-hidden">
                    {/* Image */}
                    <img
                      src="https://ctncspdgguclpeijikfp.supabase.co/storage/v1/object/public/Landing%20Page/elsikisma.webp"
                      alt="Unilancer Üniversiteli Freelancer Ekosistemi"
                      className="w-full h-auto object-cover object-center"
                    />

                    {/* Overlay bottom bar */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent px-6 py-4 flex items-center justify-between gap-4">
                      <div>
                        <p className="text-xs text-slate-300 uppercase tracking-wide">
                          Aktif proje takibi
                        </p>
                        <p className="text-sm font-semibold text-white">
                          Web sitesi, e-ticaret, tasarım ve daha fazlası
                        </p>
                      </div>
                      <div className="hidden sm:flex items-center gap-3">
                        <div className="text-right">
                          <p className="text-[11px] text-slate-300">Ortalama memnuniyet</p>
                          <p className="text-sm font-semibold text-emerald-400">%97</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Stats Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="absolute -bottom-8 left-4 sm:left-6 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200 dark:border-white/10 px-5 py-3 w-[88%] sm:w-[75%]"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="text-left">
                        <p className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-gray-400">
                          Unilancer ekosistemi
                        </p>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">
                          Genç yeteneklerle büyüyen markalar
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <p className="text-lg font-bold text-primary">500+</p>
                          <p className="text-[11px] text-slate-500 dark:text-gray-400">Üniversiteli</p>
                        </div>
                        <div className="w-px h-10 bg-slate-200 dark:bg-white/10" />
                        <div className="text-center">
                          <p className="text-lg font-bold text-primary">100+</p>
                          <p className="text-[11px] text-slate-500 dark:text-gray-400">Proje</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Floating Small Tag */}
                  <motion.div
                    initial={{ opacity: 0, y: -10, x: 10 }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    transition={{ delay: 0.7 }}
                    className="absolute -top-5 right-6 bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-white/10 rounded-full px-4 py-1.5 shadow-lg flex items-center gap-2"
                  >
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[11px] font-medium text-slate-700 dark:text-gray-100">
                      Şu an 3 proje aktif
                    </span>
                  </motion.div>
                </div>
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

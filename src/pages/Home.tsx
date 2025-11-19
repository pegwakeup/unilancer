"use client";

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { LogosCarousel } from '../components/ui/logos-carousel';
import { useTranslation } from '../hooks/useTranslation';

const getServices = (t: (key: string) => string) => [
  {
    titleKey: 'home.services.website.title',
    emoji: '💻',
    descriptionKey: 'home.services.website.description',
  },
  {
    titleKey: 'home.services.ecommerce.title',
    emoji: '🛒',
    descriptionKey: 'home.services.ecommerce.description',
  },
  {
    titleKey: 'home.services.graphics.title',
    emoji: '🎨',
    descriptionKey: 'home.services.graphics.description',
  },
  {
    titleKey: 'home.services.mobile.title',
    emoji: '📱',
    descriptionKey: 'home.services.mobile.description',
  },
  {
    titleKey: 'home.services.marketing.title',
    emoji: '📢',
    descriptionKey: 'home.services.marketing.description',
  },
  {
    titleKey: 'home.services.3dar.title',
    emoji: '🍔',
    descriptionKey: 'home.services.3dar.description',
  },
  {
    titleKey: 'home.services.ai.title',
    emoji: '🤖',
    descriptionKey: 'home.services.ai.description',
  },
];

const getAudience = (t: (key: string) => string) => [
  {
    titleKey: 'home.forWhom.sme.title',
    descriptionKey: 'home.forWhom.sme.description',
    tagKey: 'home.forWhom.sme.tag',
  },
  {
    titleKey: 'home.forWhom.agencies.title',
    descriptionKey: 'home.forWhom.agencies.description',
    tagKey: 'home.forWhom.agencies.tag',
  },
  {
    titleKey: 'home.forWhom.freelancers.title',
    descriptionKey: 'home.forWhom.freelancers.description',
    tagKey: 'home.forWhom.freelancers.tag',
  },
];

const getWhyItems = (t: (key: string) => string) => [
  {
    titleKey: 'home.why.selectedTeams.title',
    descriptionKey: 'home.why.selectedTeams.description',
  },
  {
    titleKey: 'home.why.projectManagement.title',
    descriptionKey: 'home.why.projectManagement.description',
  },
  {
    titleKey: 'home.why.pricing.title',
    descriptionKey: 'home.why.pricing.description',
  },
  {
    titleKey: 'home.why.digitalize.title',
    descriptionKey: 'home.why.digitalize.description',
  },
];

const getEmployerFaqs = (t: (key: string) => string) => [
  {
    qKey: 'home.faq.employer.q1',
    aKey: 'home.faq.employer.a1',
  },
  {
    qKey: 'home.faq.employer.q2',
    aKey: 'home.faq.employer.a2',
  },
  {
    qKey: 'home.faq.employer.q3',
    aKey: 'home.faq.employer.a3',
  },
  {
    qKey: 'home.faq.employer.q4',
    aKey: 'home.faq.employer.a4',
  },
  {
    qKey: 'home.faq.employer.q5',
    aKey: 'home.faq.employer.a5',
  },
];

const getFreelancerFaqs = (t: (key: string) => string) => [
  {
    qKey: 'home.faq.freelancer.q1',
    aKey: 'home.faq.freelancer.a1',
  },
  {
    qKey: 'home.faq.freelancer.q2',
    aKey: 'home.faq.freelancer.a2',
  },
  {
    qKey: 'home.faq.freelancer.q3',
    aKey: 'home.faq.freelancer.a3',
  },
  {
    qKey: 'home.faq.freelancer.q4',
    aKey: 'home.faq.freelancer.a4',
  },
  {
    qKey: 'home.faq.freelancer.q5',
    aKey: 'home.faq.freelancer.a5',
  },
];

const CalendlyInline = () => {
  useEffect(() => {
    const existingScript = document.querySelector(
      'script[src="https://assets.calendly.com/assets/external/widget.js"]'
    ) as HTMLScriptElement | null;

    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="h-[560px] md:h-[650px] w-full">
      <div
        className="calendly-inline-widget w-full h-full"
        data-url="https://calendly.com/taha-unilancerlabs/30min"
        style={{ minWidth: '320px', height: '100%' }}
      />
    </div>
  );
};

const Home = () => {
  const { t } = useTranslation();
  const services = getServices(t);
  const audience = getAudience(t);
  const whyItems = getWhyItems(t);
  const employerFaqs = getEmployerFaqs(t);
  const freelancerFaqs = getFreelancerFaqs(t);

  return (
    <div className="relative min-h-screen">
      {/* Arka plan */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-cyan-50/40 to-blue-100/30 dark:from-dark dark:via-dark-light dark:to-dark" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#5FC8DA30_1px,transparent_1px),linear-gradient(to_bottom,#5FC8DA30_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black_80%)] opacity-70" />
      </div>

      <div className="relative z-10">
        {/* HERO */}
        <section
          id="hero"
          className="min-h-[80vh] flex items-center pt-24 pb-16 md:pt-28 md:pb-20"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              {/* Sol taraf */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 dark:bg-white/5 backdrop-blur-md border border-slate-200/70 dark:border-white/10 shadow-sm">
                  <Sparkles className="w-4 h-4 mr-2 text-primary" />
                  <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-gray-100">
                    {t('home.hero.newBadge')}
                  </span>
                </div>

                <div className="space-y-4">
                  <h1 className="text-4xl sm:text-5xl lg:text-[3rem] font-bold leading-tight text-slate-900 dark:text-white max-w-xl">
                    {t('home.hero.mainTitle')}
                    <span className="block bg-gradient-to-r from-slate-900 via-primary to-cyan-600 bg-clip-text text-transparent dark:from-white dark:via-primary dark:to-cyan-400">
                      {t('home.hero.mainTitleHighlight')}
                    </span>
                  </h1>

                  <p className="text-base sm:text-lg text-slate-600 dark:text-gray-300 max-w-xl leading-relaxed">
                    {t('home.hero.mainDescription')}
                  </p>

                  <div className="inline-flex items-center text-xs sm:text-sm text-slate-500 dark:text-gray-400 bg-white/80 dark:bg-white/5 border border-slate-200/70 dark:border-white/10 rounded-full px-3 py-1">
                    <span className="mr-2 text-primary">•</span>
                    {t('home.hero.servicesNote')}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <motion.a
                    href="/project-request"
                    className="inline-flex items-center justify-center px-8 py-3.5 bg-primary hover:bg-primary-dark text-white rounded-xl font-semibold transition-all shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>{t('home.hero.startProject')}</span>
                    <ArrowUpRight className="w-5 h-5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </motion.a>

                  <motion.a
                    href="#rapor"
                    className="inline-flex items-center justify-center px-8 py-3.5 bg-white/90 dark:bg-white/5 backdrop-blur-sm text-slate-900 dark:text-white rounded-xl font-semibold hover:bg-slate-100 dark:hover:bg-white/10 transition-all border border-slate-200 dark:border-white/10 group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>{t('home.hero.getFreeReport')}</span>
                  </motion.a>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2 text-xs sm:text-sm text-slate-500 dark:text-gray-400">
                  <span>{t('home.hero.stats.projects')}</span>
                  <span className="text-slate-300 dark:text-white/20">•</span>
                  <span>{t('home.hero.stats.freelancers')}</span>
                </div>
              </motion.div>

              {/* Sağ taraf – görsel */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="flex justify-center lg:justify-end"
              >
                <div className="relative w-full max-w-[480px]">
                  <div className="pointer-events-none absolute -inset-6 rounded-[40px] bg-gradient-to-tr from-primary/25 via-cyan-400/15 to-purple-500/25 blur-2xl opacity-80" />
                  <img
                    src="https://ctncspdgguclpeijikfp.supabase.co/storage/v1/object/public/Landing%20Page/elsikisma.webp"
                    alt="Unilancer iş birliği"
                    className="relative w-full h-auto rounded-3xl shadow-2xl object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* KİMİN İÇİN */}
        <section id="kimin-icin" className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
                {t('home.forWhom.title')}
              </h2>
              <p className="text-slate-600 dark:text-gray-300">
                {t('home.forWhom.description')}
              </p>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {audience.map((item) => (
                <motion.div
                  key={item.titleKey}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="h-full rounded-2xl bg-white/90 dark:bg-dark-light/90 border border-slate-200/70 dark:border-white/10 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all p-5 flex flex-col"
                >
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    {t(item.titleKey)}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-gray-300 mb-3 flex-1">
                    {t(item.descriptionKey)}
                  </p>
                  <span className="inline-flex items-center text-[11px] font-medium text-primary bg-primary/5 rounded-full px-3 py-1 self-start">
                    {t(item.tagKey)}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* PARTNERLER */}
        <section
          id="partnerler"
          className="py-10 md:py-14 bg-gradient-to-b from-transparent via-white/70 to-transparent dark:via-white/5"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">
                {t('home.partners.title')}
              </h2>
              <p className="text-sm md:text-base text-slate-600 dark:text-gray-300">
                {t('home.partners.description')}
              </p>
            </div>
          </div>
          <LogosCarousel />
        </section>

        {/* NEDEN UNILANCER */}
        <section id="neden-unilancer" className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
                  {t('home.why.title')}
                </h2>
                <p className="text-slate-600 dark:text-gray-300 max-w-xl">
                  {t('home.why.description')}
                </p>
              </div>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/90 dark:bg-white/5 border border-slate-200/70 dark:border-white/10 text-xs sm:text-sm text-slate-700 dark:text-gray-200">
                <span className="mr-2 text-primary">
                  <Sparkles className="w-3.5 h-3.5" />
                </span>
                {t('home.why.badge')}
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {whyItems.map((item) => (
                <motion.div
                  key={item.titleKey}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35 }}
                  className="rounded-2xl bg-white/90 dark:bg-dark-light/90 border border-slate-200/70 dark:border-white/10 p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
                >
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    {t(item.titleKey)}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-gray-300">
                    {t(item.descriptionKey)}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ÜCRETSİZ DİJİTAL RAPOR + CALENDLY */}
        <section id="rapor" className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-2 items-start">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                  {t('home.report.title')}
                </h2>
                <p className="text-slate-600 dark:text-gray-300 max-w-xl">
                  {t('home.report.description')}
                </p>

                <ul className="space-y-2 text-sm text-slate-600 dark:text-gray-300">
                  <li>• {t('home.report.check1')}</li>
                  <li>• {t('home.report.check2')}</li>
                  <li>• {t('home.report.check3')}</li>
                  <li>• {t('home.report.check4')}</li>
                </ul>

                <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/90 dark:bg-white/5 border border-slate-200/70 dark:border-white/10 text-xs sm:text-sm text-slate-700 dark:text-gray-200">
                  <span className="mr-2 text-primary">
                    <Sparkles className="w-3.5 h-3.5" />
                  </span>
                  {t('home.report.exportBadge')}
                </div>

                <p className="pt-2 text-xs sm:text-sm text-slate-500 dark:text-gray-400">
                  {t('home.report.note')}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="rounded-3xl bg-white/95 dark:bg-dark-light/95 border border-slate-200/70 dark:border-white/10 shadow-xl p-4 md:p-5 lg:p-6 flex flex-col overflow-hidden"
              >
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <h3 className="text-base md:text-lg font-semibold text-slate-900 dark:text-white">
                      {t('home.report.meetingTitle')}
                    </h3>
                    <p className="text-xs md:text-sm text-slate-500 dark:text-gray-300">
                      {t('home.report.meetingDescription')}
                    </p>
                  </div>
                </div>

                <CalendlyInline />
              </motion.div>
            </div>
          </div>
        </section>

        {/* DIGITALL HİZMETLERİMİZ */}
        <section id="digitall" className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-8">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
                {t('home.services.title')}
              </h2>
              <p className="text-slate-600 dark:text-gray-300">
                {t('home.services.description')}
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <motion.div
                  key={service.titleKey}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35 }}
                  className="rounded-2xl bg-white/90 dark:bg-dark-light/90 border border-slate-200/70 dark:border-white/10 p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-lg">
                      {service.emoji}
                    </div>
                    <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                      {t(service.titleKey)}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-gray-300">
                    {t(service.descriptionKey)}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SSS */}
        <section
          id="sss"
          className="py-12 md:py-16 border-t border-slate-200/60 dark:border-white/10 bg-white/70 dark:bg-dark/60"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
                {t('home.faq.title')}
              </h2>
              <p className="text-slate-600 dark:text-gray-300 max-w-2xl mx-auto">
                {t('home.faq.description')}
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {/* İş Veren */}
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <span className="text-2xl">💼</span> {t('home.faq.employers.title')}
                </h3>
                <div className="space-y-3">
                  {employerFaqs.map((faq, i) => (
                    <details key={i} className="group rounded-xl border border-slate-200/70 dark:border-white/10 bg-white/90 dark:bg-dark-light/90 p-4 hover:shadow-sm transition-all">
                      <summary className="cursor-pointer font-medium text-slate-900 dark:text-white list-none flex items-center justify-between">
                        <span>{t(faq.qKey)}</span>
                        <span className="text-primary group-open:rotate-180 transition-transform">▼</span>
                      </summary>
                      <p className="mt-3 text-sm text-slate-600 dark:text-gray-300 leading-relaxed">
                        {t(faq.aKey)}
                      </p>
                    </details>
                  ))}
                </div>
              </div>

              {/* Freelancer */}
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <span className="text-2xl">👨‍💻</span> {t('home.faq.freelancers.title')}
                </h3>
                <div className="space-y-3">
                  {freelancerFaqs.map((faq, i) => (
                    <details key={i} className="group rounded-xl border border-slate-200/70 dark:border-white/10 bg-white/90 dark:bg-dark-light/90 p-4 hover:shadow-sm transition-all">
                      <summary className="cursor-pointer font-medium text-slate-900 dark:text-white list-none flex items-center justify-between">
                        <span>{t(faq.qKey)}</span>
                        <span className="text-primary group-open:rotate-180 transition-transform">▼</span>
                      </summary>
                      <p className="mt-3 text-sm text-slate-600 dark:text-gray-300 leading-relaxed">
                        {t(faq.aKey)}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Calendly */}
        <section className="py-12 md:py-16 bg-slate-50/50 dark:bg-dark-light/30">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
                {t('home.meeting.title')}
              </h2>
              <p className="text-slate-600 dark:text-gray-300 max-w-2xl mx-auto">
                {t('home.meeting.description')}
              </p>
            </div>
            <CalendlyInline />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;

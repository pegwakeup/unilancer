import React from 'react';
import { motion } from 'framer-motion';
import {
  Users, Target, Globe, CheckCircle,
  Palette, Code2, MessageSquare, ArrowUpRight
} from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/core/accordion';
import { useTranslation } from '../hooks/useTranslation';
import TeamSection from '../components/ui/sections/team-section';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8 }
};

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="relative min-h-screen pt-24 pb-16 bg-white dark:bg-dark">
      {/* Sabit Arka Plan */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-white/95 dark:bg-dark/95" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#5FC8DA35_1px,transparent_1px),linear-gradient(to_bottom,#5FC8DA35_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black_85%)]" />
      </div>

      <div className="relative z-10">
        {/* Hikayemiz Bölümü */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl font-bold mb-4">{t('about.story.title')}</h2>
                <div className="space-y-6 text-gray-600 dark:text-gray-300">
                  <p>
                    {t('about.story.p1')}{' '}
                    <span className="text-primary font-medium">{t('about.story.unilancer')}</span>
                    {t('about.story.p1End')}
                  </p>
                  <p>
                    {t('about.story.p2')}{' '}
                    <span className="text-primary font-medium">{t('about.story.p2Count')}</span>
                    {t('about.story.p2Middle')}{' '}
                    <span className="text-primary font-medium">{t('about.story.p2Skilled')}</span>{' '}
                    {t('about.story.p2End')}
                  </p>
                  <p>
                    {t('about.story.p3')}{' '}
                    <span className="text-primary font-medium">{t('about.story.technopark')}</span>{' '}
                    {t('about.story.p3Middle')}{' '}
                    <span className="text-primary font-medium">{t('about.story.b2b')}</span>{' '}
                    {t('about.story.p3End')}
                  </p>
                </div>
                <motion.div 
                  className="mt-4 flex flex-wrap gap-2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center space-x-2 px-4 py-2 bg-primary/10 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span>{t('about.badge.software')}</span>
                  </div>
                  <div className="flex items-center space-x-2 px-4 py-2 bg-primary/10 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span>{t('about.badge.design')}</span>
                  </div>
                  <div className="flex items-center space-x-2 px-4 py-2 bg-primary/10 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span>{t('about.badge.marketing')}</span>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="relative aspect-video">
                  <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-transparent rounded-xl blur-xl" />
                  <img
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80"
                    alt="Team Meeting"
                    className="w-full h-full object-cover rounded-xl relative"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/40 to-transparent rounded-xl" />
                </div>
                <motion.div
                  className="absolute -bottom-8 -right-8 p-6 bg-white dark:bg-dark-light/90 backdrop-blur-sm rounded-xl border border-white/10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">150+</div>
                      <div className="text-gray-600 dark:text-gray-400">{t('about.stats.freelancers')}</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Companies Bölümü */}
            <div className="mt-8">
              <Accordion type="single" collapsible className="w-full backdrop-blur-sm rounded-xl border border-white/10">
                <AccordionItem value="unilancer-labs">
                  <AccordionTrigger className="px-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Code2 className="w-5 h-5 text-primary" />
                      </div>
                      <div className="text-left">
                        <h3 className="text-lg font-semibold">{t('about.company.unilancerLabs')}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{t('about.company.unilancerLabs.subtitle')}</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6">
                    <div className="space-y-4">
                      <p className="text-gray-600 dark:text-gray-300">
                        {t('about.company.unilancerLabs.description')}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">{t('about.company.tag.webDev')}</span>
                        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">{t('about.company.tag.mobileApp')}</span>
                        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">{t('about.company.tag.ai')}</span>
                        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">{t('about.company.tag.saas')}</span>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="lance-art">
                  <AccordionTrigger className="px-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Palette className="w-5 h-5 text-primary" />
                      </div>
                      <div className="text-left">
                        <h3 className="text-lg font-semibold">{t('about.company.lanceArt')}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{t('about.company.lanceArt.subtitle')}</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6">
                    <div className="space-y-4">
                      <p className="text-gray-600 dark:text-gray-300">
                        {t('about.company.lanceArt.description')}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">{t('about.company.tag.uiux')}</span>
                        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">{t('about.company.tag.brand')}</span>
                        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">{t('about.company.tag.illustration')}</span>
                        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">{t('about.company.tag.3d')}</span>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Misyon & Vizyon Bölümü */}
            <div className="mt-8">
              <div className="grid md:grid-cols-2 gap-8">
                <motion.div
                  variants={fadeInUp}
                  initial="initial"
                  whileInView="whileInView"
                  viewport={fadeInUp.viewport}
                  className="p-8 rounded-xl border border-white/10 shadow-lg relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  <div className="relative">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                        <Target className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold">Misyonumuz</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-lg mb-4">
                      "Beyin Göçü yerine Hizmet İhracatı"
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      Ülkemizin önemli sorunlarından biri olan beyin göçünü hizmet ihracatı yoluyla azaltmayı ve ölçeklenebilir bir yapıyla freelancerlar, işverenler ve iş ortaklarımız için güvenilir, kârlı ve adil bir freelance ekosistemi olmayı amaçlıyoruz.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  variants={fadeInUp}
                  initial="initial"
                  whileInView="whileInView"
                  viewport={fadeInUp.viewport}
                  className="p-8 rounded-xl border border-white/10 shadow-lg relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  <div className="relative">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                        <Globe className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold">Vizyonumuz</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-lg mb-4">
                      "Freelancer Ekosistemin İlk Tercihi"
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      Öncelikle Türkiye'de, ardından dünyada freelancerlar ile firmaların ilk tercihi olmak. Yenilikçi iş modelimiz ve teknoloji odaklı yaklaşımımızla sektöre yön veren bir marka olmayı hedefliyoruz.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* EKİBİMİZ BÖLÜMÜ */}
        <TeamSection />

        {/* 150+ Freelancer Bölümü */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 relative overflow-hidden rounded-xl mx-auto max-w-7xl"
        >
          <div className="absolute inset-0">
            <img
              src="https://ctncspdgguclpeijikfp.supabase.co/storage/v1/object/public/Landing%20Page//yuzelli.webp"
              alt="Freelancers"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-dark/90 to-dark/70" />
          </div>
          <div className="relative p-8 text-center">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="w-20 h-20 bg-primary/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Users className="w-10 h-10 text-primary" />
              </div>
              <div className="text-5xl font-bold">150+</div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{t('about.team.members.count')}</h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
              {t('about.team.members.description')}
            </p>
          </div>
        </motion.div>

        {/* CTA Bölümü */}
        <section className="relative py-24 sm:py-32 overflow-hidden">
          <motion.div
            animate={{ 
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -left-40 -top-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ 
              opacity: [0.1, 0.2, 0.1],
              scale: [1.2, 1, 1.2]
            }}
            transition={{ 
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute -right-40 -bottom-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl"
          />
          <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 text-center lg:px-8">
            <h2 className="text-3xl font-bold sm:text-5xl animate-appear bg-gradient-to-b from-white to-white/80 bg-clip-text text-transparent">
              {t('about.cta.title')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto animate-appear delay-100">
              {t('about.cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-appear delay-200">
              <motion.a
                href="/join"
                className="group/button flex items-center space-x-2 px-8 py-4 bg-primary hover:bg-primary-dark text-white rounded-xl transition-colors shadow-md hover:shadow-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>{t('about.cta.freelancerApply')}</span>
                <ArrowUpRight className="w-5 h-5 group-hover/button:rotate-45 transition-transform" />
              </motion.a>
              <motion.a
                href="https://wa.me/+905061523255"
                target="_blank"
                rel="noopener noreferrer"
                className="group/button flex items-center space-x-2 px-8 py-4 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-xl transition-colors shadow-md hover:shadow-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <MessageSquare className="w-5 h-5" />
                <span>{t('about.cta.contactUs')}</span>
                <ArrowUpRight className="w-5 h-5 group-hover/button:rotate-45 transition-transform" />
              </motion.a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;

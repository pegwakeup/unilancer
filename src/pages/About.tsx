import React, { useRef, useState, useEffect } from 'react';
import { motion, useAnimation, useMotionValue } from 'framer-motion';
import {
  Users, Target, Globe, CheckCircle,
  Palette, Code2, Linkedin, MessageSquare, ArrowUpRight
} from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { useTranslation } from '../hooks/useTranslation';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8 }
};

const teamMembers = [
  {
    name: "Ahmet Yılmaz",
    role: "CEO & Kurucu Ortak",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200",
    bio: "5+ yıl yazılım geliştirme ve proje yönetimi deneyimi",
    social: { linkedin: "https://linkedin.com", github: "https://github.com" }
  },
  {
    name: "Ayşe Kaya",
    role: "Tasarım Direktörü",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
    bio: "UI/UX ve marka tasarımı konusunda uzman",
    social: { linkedin: "https://linkedin.com", github: "https://github.com" }
  },
  {
    name: "Mehmet Demir",
    role: "Teknoloji Direktörü",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
    bio: "Full-stack geliştirme ve AI entegrasyonları uzmanı",
    social: { linkedin: "https://linkedin.com", github: "https://github.com" }
  },
  {
    name: "Zeynep Arslan",
    role: "Proje Yöneticisi",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200",
    bio: "Agile proje yönetimi ve müşteri ilişkileri uzmanı",
    social: { linkedin: "https://linkedin.com" }
  },
  {
    name: "Can Öztürk",
    role: "Backend Geliştirici",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200",
    bio: "Mikroservis mimarisi ve veritabanı optimizasyonu uzmanı",
    social: { linkedin: "https://linkedin.com", github: "https://github.com" }
  },
  {
    name: "Elif Yıldız",
    role: "UI/UX Tasarımcı",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200",
    bio: "Kullanıcı deneyimi ve arayüz tasarımı uzmanı",
    social: { linkedin: "https://linkedin.com", github: "https://github.com" }
  },
  {
    name: "Burak Şahin",
    role: "Frontend Geliştirici",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    bio: "Modern web teknolojileri ve performans optimizasyonu uzmanı",
    social: { linkedin: "https://linkedin.com", github: "https://github.com" }
  },
  {
    name: "Selin Aydın",
    role: "Pazarlama Yöneticisi",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    bio: "Dijital pazarlama ve marka stratejisi uzmanı",
    social: { linkedin: "https://linkedin.com" }
  }
];

const About = () => {
  const { t } = useTranslation();
  const carouselRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [listWidth, setListWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();
  const x = useMotionValue(0);

  // Mobil/Masaüstü kontrolü
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Carousel ölçümleri (masaüstünde, tekrarlı içerik olduğundan scrollWidth'in yarısı)
  useEffect(() => {
    if (!isMobile && carouselRef.current) {
      setListWidth(carouselRef.current.scrollWidth / 2);
    }
  }, [isMobile, teamMembers]);

  // Otomatik kaydırma: Eğer masaüstünde, drag veya hover yoksa, daha yavaş (60s döngü) kaydırma başlasın
  useEffect(() => {
    let mounted = true;
    if (!isMobile && !isDragging && !isHovered && listWidth > 0) {
      const currentOffset = x.get();
      const mod = Math.abs(currentOffset) % listWidth;
      const remainingDistance = listWidth - mod;
      const remainingDuration = (60 * remainingDistance) / listWidth; // 60 saniyelik full loop

      controls.start({
        x: currentOffset - remainingDistance,
        transition: { duration: remainingDuration, ease: "linear" }
      }).then(() => {
        if (!mounted) return;
        controls.set({ x: 0 });
        controls.start({
          x: -listWidth,
          transition: { duration: 60, ease: "linear", repeat: Infinity, repeatType: "loop" }
        });
      });
    }
    return () => {
      mounted = false;
    };
  }, [isDragging, isHovered, isMobile, listWidth, controls, x]);

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
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-8"
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={fadeInUp.viewport}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ekibimiz</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Deneyimli ve tutkulu ekibimizle müşterilerimize en iyi hizmeti sunuyoruz
              </p>
            </motion.div>
            {/* Masaüstünde overflow-visible; mobilde kaydırılabilir.
                onMouseEnter/Leave ile otomatik kaydırma durur/devam eder */}
            <div
              className={`relative ${isMobile ? 'overflow-x-auto no-scrollbar' : 'overflow-visible'}`}
              onMouseEnter={() => { if (!isMobile) { setIsHovered(true); controls.stop(); } }}
              onMouseLeave={() => { if (!isMobile) { setIsHovered(false); } }}
            >
              <motion.div
                ref={carouselRef}
                drag="x"
                dragConstraints={{ right: 0, left: -listWidth }}
                onDragStart={() => {
                  setIsDragging(true);
                  controls.stop();
                }}
                onDragEnd={() => {
                  setIsDragging(false);
                  setTimeout(() => {
                    // useEffect otomatik kaydırmayı yeniden tetikleyecek
                  }, 2000);
                }}
                animate={controls}
                style={{ x }}
                className="flex space-x-4 cursor-grab"
              >
                {teamMembers.map((member, index) => (
                  <motion.div
                    key={member.name + index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={
                      !isMobile
                        ? { scale: 1.1, translateY: -10, zIndex: 30, boxShadow: "0 6px 15px rgba(0,0,0,0.3)" }
                        : {}
                    }
                    transition={{ duration: 0.2 }}
                    viewport={{ once: true }}
                    className="group min-w-[250px] flex-shrink-0"
                  >
                    <div className="p-6 rounded-xl border border-white/10 transition-all shadow-md bg-transparent backdrop-blur-sm">
                      <div className="relative mb-6">
                        <div className="absolute -inset-2 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-20 h-20 rounded-full mx-auto object-cover relative"
                        />
                      </div>
                      <div className="text-center">
                        <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                        <p className="text-primary text-sm mb-2">{member.role}</p>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{member.bio}</p>
                        <div className="flex justify-center">
                          {member.social.linkedin && (
                            <a
                              href={member.social.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="p-2 bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors"
                            >
                              <Linkedin className="w-4 h-4 text-primary" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
                {/* Masaüstünde kesintisiz akış için tekrarlı içerik */}
                {!isMobile && teamMembers.map((member, index) => (
                  <motion.div
                    key={member.name + "dup" + index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={
                      !isMobile
                        ? { scale: 1.1, translateY: -10, zIndex: 30, boxShadow: "0 6px 15px rgba(0,0,0,0.3)" }
                        : {}
                    }
                    transition={{ duration: 0.2 }}
                    viewport={{ once: true }}
                    className="group min-w-[250px] flex-shrink-0"
                  >
                    <div className="p-6 rounded-xl border border-white/10 transition-all shadow-md bg-transparent backdrop-blur-sm">
                      <div className="relative mb-6">
                        <div className="absolute -inset-2 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-20 h-20 rounded-full mx-auto object-cover relative"
                        />
                      </div>
                      <div className="text-center">
                        <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                        <p className="text-primary text-sm mb-2">{member.role}</p>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{member.bio}</p>
                        <div className="flex justify-center">
                          {member.social.linkedin && (
                            <a
                              href={member.social.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="p-2 bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors"
                            >
                              <Linkedin className="w-4 h-4 text-primary" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

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

      {/* Scrollbar Gizleme */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default About;

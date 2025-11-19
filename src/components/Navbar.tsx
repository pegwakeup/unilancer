import React, { useState, useCallback, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu, X, Rocket, Users, ChevronDown, Code2, Palette, LineChart,
  Globe, Smartphone, Database, BrainCircuit, PaintBucket,
  FileImage, Figma, Search, Target, Monitor, ArrowRight, MessageSquare, Image, FileText, Sun, Moon,
  ShoppingCart, Box, Sparkles, Languages, Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from '../hooks/useTranslation';
import { getRouteForLanguage } from '../contexts/LanguageContext';
import { CalendlyModal } from './CalendlyModal';

const getDigitAllServices = (t: (key: string) => string, lang: string) => [
  { icon: Monitor, label: t('service.webDesign'), path: getRouteForLanguage('/services', lang as 'tr' | 'en') },
  { icon: Box, label: t('service.3dAr'), path: getRouteForLanguage('/digitall/3d-ar-sanal-tur', lang as 'tr' | 'en') },
  { icon: ShoppingCart, label: t('service.ecommerce'), path: getRouteForLanguage('/services', lang as 'tr' | 'en') },
  { icon: Target, label: t('service.marketing'), path: getRouteForLanguage('/services', lang as 'tr' | 'en') },
  { icon: BrainCircuit, label: t('service.ai'), path: getRouteForLanguage('/services', lang as 'tr' | 'en') },
  { icon: Code2, label: t('service.development'), path: getRouteForLanguage('/services', lang as 'tr' | 'en') },
  { icon: PaintBucket, label: t('service.branding'), path: getRouteForLanguage('/services', lang as 'tr' | 'en') },
  { icon: Palette, label: t('service.graphics'), path: getRouteForLanguage('/services', lang as 'tr' | 'en') }
];

const NavLink = ({ to, active, children, onClick }: {
  to: string;
  active: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}) => (
  <Link
    to={to}
    className={`
      px-4 py-2 rounded-lg transition-all duration-300 relative group text-base font-medium
      ${active
        ? 'text-primary dark:text-primary'
        : 'text-slate-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white'}
      hover:bg-slate-100/70 dark:hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary
    `}
    onClick={onClick}
  >
    {children}
    {active && (
      <motion.div
        layoutId="activeIndicator"
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
        transition={{ type: "spring", stiffness: 380, damping: 30 }}
      />
    )}
  </Link>
);

const ActionButton = ({ href, icon: Icon, primary, children, onClick, isLink = false }: { 
  href: string; 
  icon: React.ElementType; 
  primary?: boolean; 
  children: React.ReactNode;
  onClick?: () => void;
  isLink?: boolean;
}) => {
  const className = `
    flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 text-base font-medium
    ${primary
      ? 'bg-primary text-white hover:bg-primary-dark shadow-md hover:shadow-lg'
      : 'bg-slate-200/80 dark:bg-white/5 text-slate-900 dark:text-white hover:bg-slate-300/80 dark:hover:bg-white/10'
    }
    focus:outline-none focus-visible:ring-2 focus-visible:ring-primary
  `;

  const content = (
    <>
      <Icon className="w-5 h-5" />
      <span>{children}</span>
    </>
  );

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link
        to={href}
        className={className}
        onClick={onClick}
      >
        {content}
      </Link>
    </motion.div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useTranslation();

  const digitAllServices = getDigitAllServices(t, language);

  const handleScroll = useCallback(() => {
    const scrolled = window.scrollY > 50;
    if (scrolled !== isScrolled) {
      setIsScrolled(scrolled);
    }
  }, [isScrolled]);

  useEffect(() => {
    let timeoutId: number;
    
    const debouncedScroll = () => {
      if (timeoutId) {
        window.cancelAnimationFrame(timeoutId);
      }
      timeoutId = window.requestAnimationFrame(() => handleScroll());
    };

    window.addEventListener('scroll', debouncedScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', debouncedScroll);
      if (timeoutId) {
        window.cancelAnimationFrame(timeoutId);
      }
    };
  }, [handleScroll]);

  useEffect(() => {
    setIsOpen(false);
    setIsServicesOpen(false);
  }, [location]);

  // Keyboard navigation for dropdown
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isServicesOpen) {
        setIsServicesOpen(false);
      }
    };

    if (isServicesOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isServicesOpen]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <motion.nav
      className={`
        fixed w-full z-50 transition-all duration-300
        ${isScrolled
          ? 'bg-white/95 dark:bg-dark/95 backdrop-blur-xl border-b border-slate-200 dark:border-white/5 py-2'
          : 'bg-transparent py-4'}
      `}
      style={{
        boxShadow: isScrolled
          ? theme === 'dark'
            ? '0 4px 20px rgba(95, 200, 218, 0.15), 0 2px 8px rgba(95, 200, 218, 0.1)'
            : '0 4px 20px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)'
          : 'none'
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
            onClick={scrollToTop}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative flex items-center"
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-primary-light/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <img
                src="https://ctncspdgguclpeijikfp.supabase.co/storage/v1/object/public/Landing%20Page/Unilancer%20logo%202.webp"
                alt="Unilancer"
                className="relative h-10 w-auto object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/images/unilancer-logo.png';
                }}
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center">
            <div className="flex items-center space-x-2">
              <div
                className="relative group"
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
              >
                <button
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setIsServicesOpen(!isServicesOpen);
                    }
                  }}
                  aria-expanded={isServicesOpen}
                  aria-haspopup="true"
                  aria-label="digitAll services menu"
                  className={`
                    px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2 font-medium
                    ${location.pathname.startsWith('/services') || location.pathname.startsWith('/digitall')
                      ? 'text-primary dark:text-primary'
                      : 'text-slate-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white'}
                    hover:bg-slate-100/70 dark:hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary text-base
                  `}
                >
                  <span className="font-semibold" style={{ fontFamily: '"Space Grotesk", "Inter", sans-serif' }}>
                    <span className="text-slate-900 dark:text-white">digit</span>
                    <span className="text-primary dark:text-primary">All</span>
                  </span>
                  <motion.div
                    animate={{ rotate: isServicesOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </button>
              </div>

              <NavLink to={getRouteForLanguage('/portfolio', language)} active={location.pathname.includes('/portfolio') || location.pathname.includes('/portfolyo')} onClick={scrollToTop}>
                {t('nav.portfolio')}
              </NavLink>
              <NavLink to={getRouteForLanguage('/about', language)} active={location.pathname.includes('/about') || location.pathname.includes('/hakkimizda')} onClick={scrollToTop}>
                {t('nav.about')}
              </NavLink>
              <NavLink to={getRouteForLanguage('/blog', language)} active={location.pathname.includes('/blog')} onClick={scrollToTop}>
                {t('nav.blog')}
              </NavLink>
              <NavLink to={getRouteForLanguage('/contact', language)} active={location.pathname.includes('/contact') || location.pathname.includes('/iletisim')} onClick={scrollToTop}>
                {t('nav.contact')}
              </NavLink>
            </div>
          </div>

          {/* Dropdown Menu - Fixed to Navbar */}
          <AnimatePresence>
            {isServicesOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                className="fixed left-0 right-0 top-[72px] z-40 hidden md:block"
                style={{
                  marginTop: isScrolled ? '0px' : '8px'
                }}
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
                role="dialog"
                aria-modal="false"
                aria-label="digitAll Services Menu"
              >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className={`
                    relative backdrop-blur-2xl rounded-3xl overflow-hidden
                    ${isScrolled
                      ? 'bg-gradient-to-br from-white via-white to-slate-50/80 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800/80 border border-slate-200 dark:border-slate-700/60'
                      : 'bg-gradient-to-br from-white/98 via-white/95 to-slate-50/70 dark:from-slate-900/98 dark:via-slate-900/95 dark:to-slate-800/70 border border-slate-200/80 dark:border-slate-700/40'}
                  `}
                  style={{
                    boxShadow: theme === 'dark'
                      ? '0 25px 70px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(95, 200, 218, 0.2), 0 0 50px rgba(95, 200, 218, 0.05)'
                      : '0 25px 70px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(95, 200, 218, 0.1), 0 10px 40px rgba(95, 200, 218, 0.05)'
                  }}
                  >
                    {/* Decorative background elements */}
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl" />
                      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-light/5 dark:bg-primary-light/10 rounded-full blur-3xl" />
                    </div>

                    <div className="relative p-8">
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        <div className="lg:col-span-8">
                          <div className="mb-7">
                            <div className="inline-flex items-center space-x-2 mb-3">
                              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                                <span className="text-slate-900 dark:text-white">digit</span>
                                <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">All</span>
                                <span className="text-slate-900 dark:text-white"> Hizmetlerimiz</span>
                              </h3>
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-xl">
                              Dijital dönüşümünüz için kapsamlı çözümler
                            </p>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
                            {digitAllServices.map((service, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.03, duration: 0.2 }}
                              >
                                <Link
                                  to={service.path}
                                  className="group relative block"
                                  onClick={() => {
                                    setIsServicesOpen(false);
                                    scrollToTop();
                                  }}
                                >
                                  <div className="relative p-5 rounded-2xl bg-gradient-to-br from-white via-slate-50/50 to-slate-100/30 dark:from-slate-800/60 dark:via-slate-800/40 dark:to-slate-700/30 border border-slate-200/60 dark:border-slate-700/40 hover:border-primary/50 dark:hover:border-primary/60 transition-all duration-300 hover:shadow-xl dark:hover:shadow-primary/20 hover:-translate-y-1 will-change-transform backdrop-blur-sm overflow-hidden">
                                    {/* Card shine effect */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent dark:from-primary/5 dark:via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                    <div className="relative flex flex-col items-center text-center space-y-3.5">
                                      <div className="relative">
                                        {/* Glow effect */}
                                        <div className="absolute inset-0 bg-primary/30 dark:bg-primary/40 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300 scale-150" />

                                        {/* Icon container */}
                                        <div className="relative w-16 h-16 bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 dark:from-primary/30 dark:via-primary/20 dark:to-primary/15 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg dark:shadow-primary/20">
                                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent dark:from-white/10" />
                                          <service.icon className="relative w-7 h-7 text-primary dark:text-primary group-hover:scale-110 transition-transform duration-300" />
                                        </div>
                                      </div>

                                      <p className="text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-primary dark:group-hover:text-primary-light transition-colors duration-300 leading-snug">
                                        {service.label}
                                      </p>
                                    </div>

                                    {/* Bottom gradient accent */}
                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary/40 transition-all duration-300" />
                                  </div>
                                </Link>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        <div className="lg:col-span-4">
                          <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.15, duration: 0.3 }}
                            className="relative h-full"
                          >
                            <div className="sticky top-4 bg-gradient-to-br from-primary/10 via-primary/5 to-primary-light/10 dark:from-primary/20 dark:via-primary/15 dark:to-primary-light/20 rounded-2xl p-6 border border-primary/30 dark:border-primary/50 backdrop-blur-sm overflow-hidden">
                              {/* Animated background pattern */}
                              <div className="absolute inset-0 opacity-30 dark:opacity-20">
                                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(95,200,218,0.1),transparent_50%)]" />
                              </div>

                              <div className="relative space-y-5">
                                <div className="relative w-full h-44 rounded-2xl overflow-hidden shadow-2xl ring-2 ring-primary/30 dark:ring-primary/40 group">
                                  {/* Image overlay gradient */}
                                  <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-primary/20 to-primary-dark/30 dark:from-primary/50 dark:via-primary/30 dark:to-primary-dark/40 z-10" />

                                  {/* Animated shine effect */}
                                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 z-20" />

                                  <img
                                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80"
                                    alt="Digital Services"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    loading="lazy"
                                  />

                                  {/* Floating badge */}
                                  <div className="absolute top-3 right-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-primary shadow-lg z-30">
                                    Ücretsiz
                                  </div>
                                </div>

                                <div className="space-y-4">
                                  <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                      <Sparkles className="w-5 h-5 text-primary" />
                                      <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                                        {t('nav.getFreeReport')}
                                      </h4>
                                    </div>
                                    <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                                      Dijital varlığınızı analiz ediyor, size özel yol haritası çıkarıyoruz.
                                    </p>
                                  </div>

                                  <motion.button
                                    onClick={() => {
                                      setIsServicesOpen(false);
                                      setIsCalendlyOpen(true);
                                    }}
                                    className="relative w-full flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-primary via-primary to-primary-dark hover:from-primary-dark hover:via-primary hover:to-primary text-white rounded-xl transition-all duration-300 font-bold shadow-xl hover:shadow-2xl hover:shadow-primary/40 dark:shadow-primary/30 group overflow-hidden"
                                    whileHover={{ scale: 1.03, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                  >
                                    {/* Button shine effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                                    <Calendar className="relative w-5 h-5 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300" />
                                    <span className="relative">{t('nav.scheduleConsultation')}</span>
                                  </motion.button>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.button
              onClick={toggleLanguage}
              className="relative flex items-center space-x-2 px-3 py-2 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 transition-all hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-sm hover:shadow-md group overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle language"
              title={language === 'tr' ? 'Switch to English' : 'Türkçeye Geç'}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <Globe className="w-4 h-4 text-primary relative z-10" />
              <div className="flex items-center space-x-1 relative z-10">
                <span className="text-sm font-semibold text-slate-700 dark:text-gray-300">
                  {language === 'tr' ? 'TR' : 'EN'}
                </span>
                <span className="text-xs text-slate-500 dark:text-gray-400">|</span>
                <span className="text-xs text-slate-500 dark:text-gray-400">
                  {language === 'tr' ? 'EN' : 'TR'}
                </span>
              </div>
            </motion.button>
            <motion.button
              onClick={toggleTheme}
              className="p-2.5 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 transition-all hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-sm hover:shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                {theme === 'dark' ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun className="w-5 h-5 text-yellow-400" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon className="w-5 h-5 text-slate-700" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
            <ActionButton href={getRouteForLanguage('/project-request', language)} icon={Rocket} primary isLink>
              {t('nav.getQuote')}
            </ActionButton>
            <ActionButton href={getRouteForLanguage('/join', language)} icon={Users} onClick={scrollToTop} isLink>
              {t('nav.joinUs')}
            </ActionButton>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative w-12 h-12 rounded-lg bg-slate-100 dark:bg-transparent hover:bg-slate-200 dark:hover:bg-white/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <X className="w-6 h-6 text-slate-900 dark:text-white" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Menu className="w-6 h-6 text-slate-900 dark:text-white" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Mobile Menu */}
          <AnimatePresence mode="wait">
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 top-[64px] bg-white/98 dark:bg-dark/95 backdrop-blur-xl z-40 md:hidden overflow-y-auto border-t border-slate-200/50 dark:border-white/5"
                style={{ height: 'calc(100vh - 64px)' }}
              >
                <div className="min-h-screen px-4 py-6">
                  <div className="space-y-6 max-w-lg mx-auto">
                    {/* Free Report CTA */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="relative bg-gradient-to-br from-primary/15 via-primary/10 to-primary-light/15 dark:from-primary/25 dark:via-primary/20 dark:to-primary-light/25 rounded-2xl p-6 border border-primary/30 dark:border-primary/40 shadow-xl backdrop-blur-sm overflow-hidden"
                    >
                      {/* Decorative elements */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 dark:bg-primary/20 rounded-full blur-2xl" />
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary-light/10 dark:bg-primary-light/20 rounded-full blur-2xl" />

                      <div className="relative">
                        <div className="flex items-center justify-center space-x-2 mb-3">
                          <Sparkles className="w-5 h-5 text-primary" />
                          <h3 className="text-xl font-bold text-slate-900 dark:text-white text-center">
                            {t('nav.getFreeReport')}
                          </h3>
                        </div>
                        <p className="text-sm text-slate-700 dark:text-slate-200 text-center mb-4">
                          Ücretsiz danışmanlık kazanın
                        </p>
                        <motion.button
                          onClick={() => {
                            setIsOpen(false);
                            setIsCalendlyOpen(true);
                          }}
                          className="relative w-full flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-primary via-primary to-primary-dark hover:from-primary-dark hover:via-primary hover:to-primary text-white rounded-xl transition-all duration-300 font-bold shadow-xl overflow-hidden group"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {/* Button shine */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                          <Calendar className="relative w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                          <span className="relative">{t('nav.scheduleConsultation')}</span>
                        </motion.button>
                      </div>
                    </motion.div>

                    {/* Main Navigation Links */}
                    <div className="space-y-3">
                      {/* Services Dropdown */}
                      <div className="bg-gradient-to-br from-slate-50 to-slate-100/50 dark:from-slate-800/60 dark:to-slate-800/30 rounded-2xl overflow-hidden border border-slate-200/60 dark:border-slate-700/40 shadow-lg backdrop-blur-sm">
                        <button
                          onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                          className="w-full px-6 py-5 text-lg font-medium text-slate-800 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white transition-all duration-200 flex items-center justify-between group"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="relative w-12 h-12 bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 dark:from-primary/30 dark:via-primary/20 dark:to-primary/15 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-md">
                              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent dark:from-white/10" />
                              <Sparkles className="relative w-6 h-6 text-primary" />
                            </div>
                            <span className="font-bold" style={{ fontFamily: '"Space Grotesk", "Inter", sans-serif' }}>
                              <span className="text-slate-900 dark:text-white">digit</span>
                              <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">All</span>
                            </span>
                          </div>
                          <motion.div
                            animate={{ rotate: mobileServicesOpen ? 180 : 0 }}
                            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                          >
                            <ChevronDown className="w-6 h-6 text-primary" />
                          </motion.div>
                        </button>

                        <AnimatePresence>
                          {mobileServicesOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                              className="border-t border-slate-200/60 dark:border-slate-700/40"
                            >
                              <div className="p-4 space-y-2.5 bg-white/50 dark:bg-slate-900/30 backdrop-blur-sm">
                                {digitAllServices.map((service, index) => (
                                  <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05, duration: 0.2 }}
                                  >
                                    <Link
                                      to={service.path}
                                      className="flex items-center space-x-3.5 p-4 bg-gradient-to-br from-white via-slate-50/50 to-white dark:from-slate-800/80 dark:via-slate-800/50 dark:to-slate-800/80 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-all duration-200 border border-slate-200/50 dark:border-slate-700/30 hover:border-primary/40 dark:hover:border-primary/50 hover:shadow-lg active:scale-98 group"
                                      onClick={() => {
                                        setIsOpen(false);
                                        setMobileServicesOpen(false);
                                        scrollToTop();
                                      }}
                                    >
                                      <div className="relative w-11 h-11 bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 dark:from-primary/30 dark:via-primary/20 dark:to-primary/15 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-sm">
                                        <div className="absolute inset-0 bg-primary/10 dark:bg-primary/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                        <service.icon className="relative w-5 h-5 text-primary" />
                                      </div>
                                      <span className="flex-1 text-slate-800 dark:text-slate-100 font-semibold group-hover:text-primary dark:group-hover:text-primary-light transition-colors text-base">{service.label}</span>
                                      <ChevronDown className="w-5 h-5 text-slate-400 dark:text-slate-500 -rotate-90 group-hover:translate-x-1 transition-transform duration-200" />
                                    </Link>
                                  </motion.div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Other Navigation Links */}
                      {[
                        { to: '/portfolio', icon: Image, labelKey: 'nav.portfolio' },
                        { to: '/about', icon: Users, labelKey: 'nav.about' },
                        { to: '/blog', icon: FileText, labelKey: 'nav.blog' },
                        { to: '/contact', icon: MessageSquare, labelKey: 'nav.contact' }
                      ].map((link) => (
                        <Link
                          key={link.to}
                          to={getRouteForLanguage(link.to, language)}
                          className="flex items-center justify-between px-6 py-4 bg-slate-50 dark:bg-dark-light/30 text-lg font-medium text-slate-800 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white rounded-xl transition-all duration-200 group border border-slate-200 dark:border-transparent shadow-sm hover:shadow-md"
                          onClick={() => {
                            setIsOpen(false);
                            scrollToTop();
                          }}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-primary/10 dark:bg-primary/10 rounded-xl flex items-center justify-center">
                              <link.icon className="w-5 h-5 text-primary" />
                            </div>
                            <span className="font-semibold">{t(link.labelKey)}</span>
                          </div>
                          <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
                        </Link>
                      ))}
                    </div>
                    
                    {/* Language & Theme Toggle */}
                    <div className="pt-4 space-y-3">
                      <button
                        onClick={toggleLanguage}
                        className="w-full flex items-center justify-between px-6 py-4 bg-slate-50 dark:bg-dark-light/30 text-lg font-medium text-slate-800 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white rounded-xl transition-all duration-200 border border-slate-200 dark:border-transparent shadow-sm hover:shadow-md group"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-primary/10 dark:bg-primary/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Globe className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex flex-col items-start">
                            <span className="font-semibold text-base">{language === 'tr' ? 'Türkçe' : 'English'}</span>
                            <span className="text-xs text-slate-500 dark:text-gray-500">
                              {language === 'tr' ? 'Switch to English' : 'Türkçeye Geç'}
                            </span>
                          </div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
                      </button>
                      <button
                        onClick={toggleTheme}
                        className="w-full flex items-center justify-between px-6 py-4 bg-slate-50 dark:bg-dark-light/30 text-lg font-medium text-slate-800 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white rounded-xl transition-all duration-200 border border-slate-200 dark:border-transparent shadow-sm hover:shadow-md"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-primary/10 dark:bg-primary/10 rounded-xl flex items-center justify-center">
                            {theme === 'dark' ? (
                              <Sun className="w-5 h-5 text-yellow-400" />
                            ) : (
                              <Moon className="w-5 h-5 text-slate-700" />
                            )}
                          </div>
                          <span className="font-semibold">{t(theme === 'dark' ? 'nav.lightTheme' : 'nav.darkTheme')}</span>
                        </div>
                      </button>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-4 pt-4">
                      <Link
                        to={getRouteForLanguage('/project-request', language)}
                        className="flex items-center justify-center space-x-2 px-6 py-4 bg-primary text-white rounded-xl hover:bg-primary-dark transition-all font-semibold shadow-md hover:shadow-lg"
                        onClick={() => setIsOpen(false)}
                      >
                        <Rocket className="w-5 h-5" />
                        <span className="font-medium">{t('nav.getQuote')}</span>
                      </Link>
                      <Link
                        to={getRouteForLanguage('/join', language)}
                        className="flex items-center justify-center space-x-2 px-6 py-4 bg-primary/10 dark:bg-primary/10 text-primary rounded-xl hover:bg-primary/20 dark:hover:bg-primary/20 transition-all font-semibold border border-primary/20 dark:border-primary/20"
                        onClick={() => {
                          setIsOpen(false);
                          scrollToTop();
                        }}
                      >
                        <Users className="w-5 h-5" />
                        <span className="font-medium">{t('nav.joinUs')}</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <CalendlyModal isOpen={isCalendlyOpen} onClose={() => setIsCalendlyOpen(false)} />
    </motion.nav>
  );
};

export default Navbar;
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
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.15 }}
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
                  <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-xl border border-slate-200/80 dark:border-slate-700/40">
                    <div className="p-6">
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        <div className="lg:col-span-8">
                          <div className="mb-5">
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
                              <span className="text-slate-900 dark:text-white">digit</span>
                              <span className="text-primary">All</span>
                              <span className="text-slate-900 dark:text-white"> Hizmetlerimiz</span>
                            </h3>
                            <p className="text-sm text-slate-600 dark:text-slate-300">
                              Dijital dönüşümünüz için kapsamlı çözümler
                            </p>
                          </div>

                          <div className="grid grid-cols-4 gap-3">
                            {digitAllServices.map((service, index) => (
                              <Link
                                key={index}
                                to={service.path}
                                className="group block"
                                onClick={() => {
                                  setIsServicesOpen(false);
                                  scrollToTop();
                                }}
                              >
                                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 hover:border-primary dark:hover:border-primary hover:dark:bg-slate-800/50 transition-all">
                                  <div className="flex flex-col items-center text-center space-y-2.5">
                                    <div className="w-12 h-12 bg-primary/10 dark:bg-slate-700/40 rounded-lg flex items-center justify-center group-hover:dark:bg-slate-700/60 transition-colors">
                                      <service.icon className="w-5 h-5 text-primary dark:text-cyan-400" />
                                    </div>
                                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200 group-hover:text-primary dark:group-hover:text-cyan-400 transition-colors">
                                      {service.label}
                                    </p>
                                  </div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>

                        <div className="lg:col-span-4">
                          <div className="bg-slate-50 dark:bg-slate-800/30 rounded-xl p-5 border border-slate-200 dark:border-slate-700/50">
                            <div className="space-y-4">
                              <div className="relative w-full h-32 rounded-lg overflow-hidden">
                                <img
                                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80"
                                  alt="Digital Services"
                                  className="w-full h-full object-cover"
                                  loading="lazy"
                                />
                                <div className="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded-md text-xs font-semibold">
                                  Ücretsiz
                                </div>
                              </div>

                              <div className="space-y-3">
                                <h4 className="text-base font-semibold text-slate-900 dark:text-white">
                                  {t('nav.getFreeReport')}
                                </h4>
                                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                  Dijital varlığınızı analiz ediyor, size özel yol haritası çıkarıyoruz.
                                </p>

                                <button
                                  onClick={() => {
                                    setIsServicesOpen(false);
                                    setIsCalendlyOpen(true);
                                  }}
                                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors font-semibold"
                                >
                                  <Calendar className="w-4 h-4" />
                                  <span className="text-sm">{t('nav.scheduleConsultation')}</span>
                                </button>
                              </div>
                            </div>
                          </div>
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
                    <div className="bg-primary/10 dark:bg-primary/20 rounded-xl p-5 border border-primary/30">
                      <div className="space-y-3">
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white text-center">
                          {t('nav.getFreeReport')}
                        </h3>
                        <p className="text-sm text-slate-700 dark:text-slate-300 text-center">
                          Ücretsiz danışmanlık kazanın
                        </p>
                        <button
                          onClick={() => {
                            setIsOpen(false);
                            setIsCalendlyOpen(true);
                          }}
                          className="w-full flex items-center justify-center space-x-2 px-5 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors font-semibold"
                        >
                          <Calendar className="w-5 h-5" />
                          <span>{t('nav.scheduleConsultation')}</span>
                        </button>
                      </div>
                    </div>

                    {/* Main Navigation Links */}
                    <div className="space-y-3">
                      {/* Services Dropdown */}
                      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
                        <button
                          onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                          className="w-full px-5 py-4 text-base font-medium text-slate-800 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center justify-between"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center">
                              <Sparkles className="w-5 h-5 text-primary" />
                            </div>
                            <span className="font-semibold" style={{ fontFamily: '"Space Grotesk", "Inter", sans-serif' }}>
                              <span className="text-slate-900 dark:text-white">digit</span>
                              <span className="text-primary">All</span>
                            </span>
                          </div>
                          <ChevronDown className={`w-5 h-5 text-primary transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {mobileServicesOpen && (
                          <div className="border-t border-slate-200 dark:border-slate-700">
                            <div className="p-3 space-y-2 bg-white dark:bg-slate-900/50">
                              {digitAllServices.map((service, index) => (
                                <Link
                                  key={index}
                                  to={service.path}
                                  className="flex items-center space-x-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors border border-slate-200 dark:border-slate-700 hover:border-primary group"
                                  onClick={() => {
                                    setIsOpen(false);
                                    setMobileServicesOpen(false);
                                    scrollToTop();
                                  }}
                                >
                                  <div className="w-9 h-9 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center">
                                    <service.icon className="w-4 h-4 text-primary" />
                                  </div>
                                  <span className="flex-1 text-slate-700 dark:text-slate-300 font-medium group-hover:text-primary transition-colors">{service.label}</span>
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
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
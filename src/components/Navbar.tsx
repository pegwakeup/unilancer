import React, { useState, useCallback, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu, X, Rocket, Users, ChevronDown, Code2, Palette, LineChart,
  Globe, Smartphone, Database, BrainCircuit, PaintBucket,
  FileImage, Figma, Search, Target, Monitor, ArrowRight, MessageSquare, Image, FileText, Sun, Moon,
  ShoppingCart, Box, Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const digitAllServices = [
  { icon: Monitor, label: "Web Tasarım", path: "/services" },
  { icon: Box, label: "3D AR SANAL TUR", path: "/digitall/3d-ar-sanal-tur" },
  { icon: ShoppingCart, label: "E Ticaret Çözümleri", path: "/services" },
  { icon: Target, label: "Pazarlama & Reklam", path: "/services" },
  { icon: BrainCircuit, label: "Yapay Zeka - Digibot", path: "/services" },
  { icon: Code2, label: "Yazılım Geliştirme", path: "/services" },
  { icon: PaintBucket, label: "Kurumsal Kimlik & Marka", path: "/services" },
  { icon: Palette, label: "Grafik ve Tasarım", path: "/services" }
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
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

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
            className="flex items-center space-x-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
            onClick={scrollToTop}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-primary-light/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <img
                src="https://ctncspdgguclpeijikfp.supabase.co/storage/v1/object/public/Landing%20Page/Unilancer%20logo%202.webp"
                alt="Unilancer"
                className="h-10 w-auto relative"
                style={{ width: '150.7px', height: '40px' }}
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
                  className={`
                    px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2 font-medium
                    ${location.pathname.startsWith('/services') || location.pathname.startsWith('/digitall')
                      ? 'text-primary dark:text-primary'
                      : 'text-slate-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white'}
                    hover:bg-slate-100/70 dark:hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary text-base
                  `}
                >
                  <span>DigitAll</span>
                  <motion.div
                    animate={{ rotate: isServicesOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isServicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="absolute top-full left-0 mt-2 bg-white dark:bg-dark-light/95 backdrop-blur-md rounded-xl shadow-2xl border border-slate-200/80 dark:border-white/10 overflow-hidden"
                    >
                      <div className="p-3 min-w-[280px]">
                        <div className="space-y-1">
                          {digitAllServices.map((service, index) => (
                            <Link
                              key={index}
                              to={service.path}
                              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 transition-all group min-h-[48px] hover:translate-x-1"
                              onClick={() => {
                                setIsServicesOpen(false);
                                scrollToTop();
                              }}
                            >
                              <div className="w-9 h-9 bg-primary/10 dark:bg-primary/10 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-primary/20 transition-all">
                                <service.icon className="w-4 h-4 text-primary" />
                              </div>
                              <span className="text-base text-gray-700 dark:text-gray-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors font-medium">
                                {service.label}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <NavLink to="/portfolio" active={location.pathname === '/portfolio'} onClick={scrollToTop}>
                Portfolyo
              </NavLink>
              <NavLink to="/about" active={location.pathname === '/about'} onClick={scrollToTop}>
                Hakkımızda
              </NavLink>
              <NavLink to="/blog" active={location.pathname === '/blog'} onClick={scrollToTop}>
                Blog
              </NavLink>
              <NavLink to="/contact" active={location.pathname === '/contact'} onClick={scrollToTop}>
                İletişim
              </NavLink>
            </div>
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
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
            <ActionButton href="/project-request" icon={Rocket} primary isLink>
              Teklif Al
            </ActionButton>
            <ActionButton href="/join" icon={Users} onClick={scrollToTop} isLink>
              Bize Katıl
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
                    {/* Main Navigation Links */}
                    <div className="space-y-3">
                      {/* Services Dropdown */}
                      <div className="bg-slate-50 dark:bg-dark-light/30 rounded-xl overflow-hidden border border-slate-200 dark:border-transparent shadow-sm">
                        <button
                          onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                          className="w-full px-6 py-4 text-lg font-medium text-slate-800 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white transition-colors duration-200 flex items-center justify-between"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-primary/10 dark:bg-primary/10 rounded-xl flex items-center justify-center">
                              <Sparkles className="w-5 h-5 text-primary" />
                            </div>
                            <span className="font-semibold">DigitAll</span>
                          </div>
                          <motion.div
                            animate={{ rotate: mobileServicesOpen ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown className="w-5 h-5 text-primary" />
                          </motion.div>
                        </button>

                        <AnimatePresence>
                          {mobileServicesOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="border-t border-slate-200/80 dark:border-white/10"
                            >
                              <div className="px-6 py-4 space-y-2">
                                {digitAllServices.map((service, index) => (
                                  <Link
                                    key={index}
                                    to={service.path}
                                    className="flex items-center space-x-3 p-3 bg-white dark:bg-dark/50 rounded-xl hover:bg-slate-100 dark:hover:bg-dark transition-all duration-200 border border-slate-200 dark:border-transparent hover:translate-x-1"
                                    onClick={() => {
                                      setIsOpen(false);
                                      setMobileServicesOpen(false);
                                      scrollToTop();
                                    }}
                                  >
                                    <div className="w-8 h-8 bg-primary/10 dark:bg-primary/10 rounded-lg flex items-center justify-center">
                                      <service.icon className="w-4 h-4 text-primary" />
                                    </div>
                                    <span className="text-slate-700 dark:text-gray-300 font-medium">{service.label}</span>
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Other Navigation Links */}
                      {[
                        { to: '/portfolio', icon: Image, label: 'Portfolyo' },
                        { to: '/about', icon: Users, label: 'Hakkımızda' },
                        { to: '/blog', icon: FileText, label: 'Blog' },
                        { to: '/contact', icon: MessageSquare, label: 'İletişim' }
                      ].map((link) => (
                        <Link
                          key={link.to}
                          to={link.to}
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
                            <span className="font-semibold">{link.label}</span>
                          </div>
                          <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
                        </Link>
                      ))}
                    </div>
                    
                    {/* Theme Toggle */}
                    <div className="pt-4">
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
                          <span className="font-semibold">{theme === 'dark' ? 'Aydınlık Tema' : 'Koyu Tema'}</span>
                        </div>
                      </button>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-4 pt-4">
                      <Link
                        to="/project-request"
                        className="flex items-center justify-center space-x-2 px-6 py-4 bg-primary text-white rounded-xl hover:bg-primary-dark transition-all font-semibold shadow-md hover:shadow-lg"
                        onClick={() => setIsOpen(false)}
                      >
                        <Rocket className="w-5 h-5" />
                        <span className="font-medium">Teklif Al</span>
                      </Link>
                      <Link
                        to="/join"
                        className="flex items-center justify-center space-x-2 px-6 py-4 bg-primary/10 dark:bg-primary/10 text-primary rounded-xl hover:bg-primary/20 dark:hover:bg-primary/20 transition-all font-semibold border border-primary/20 dark:border-primary/20"
                        onClick={() => {
                          setIsOpen(false);
                          scrollToTop();
                        }}
                      >
                        <Users className="w-5 h-5" />
                        <span className="font-medium">Bize Katıl</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
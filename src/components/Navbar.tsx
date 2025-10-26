import React, { useState, useCallback, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu, X, Rocket, Users, ChevronDown, Code2, Palette, LineChart,
  Globe, Smartphone, Database, BrainCircuit, PaintBucket,
  FileImage, Figma, Search, Target, Monitor, ArrowRight, MessageSquare, Image, FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

const serviceCategories = [
  {
    title: "Tasarım",
    path: "/services/design",
    items: [
      { icon: Monitor, label: "Dijital & Web Tasarım" },
      { icon: PaintBucket, label: "Kurumsal Kimlik & Marka" },
      { icon: FileImage, label: "Basılı & Grafik Tasarım" },
      { icon: Figma, label: "İllüstrasyon & 3D" }
    ]
  },
  {
    title: "Yazılım",
    path: "/services/software",
    items: [
      { icon: Globe, label: "Web Geliştirme" },
      { icon: Smartphone, label: "Mobil Uygulama" },
      { icon: Database, label: "SaaS Çözümleri" },
      { icon: BrainCircuit, label: "AI Entegrasyonları" }
    ]
  },
  {
    title: "Dijital Pazarlama",
    path: "/services/marketing",
    items: [
      { icon: Search, label: "SEO & SEM" },
      { icon: Target, label: "Dijital Reklam" },
      { icon: LineChart, label: "Analitik" }
    ]
  }
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
      px-4 py-2 rounded-lg transition-all duration-300 relative group text-base
      ${active ? 'text-primary' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'}
      hover:bg-gray-100/50 dark:hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary
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
    flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 text-base
    ${primary
      ? 'bg-primary text-white hover:bg-primary-dark'
      : 'bg-gray-100 dark:bg-white/5 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-white/10'
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
          ? 'bg-white/95 dark:bg-dark/95 backdrop-blur-md shadow-lg shadow-primary/5 py-2'
          : 'bg-transparent py-4'}
      `}
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
              <div className="absolute -inset-2 bg-gradient-to-r from-primary/10 to-primary-light/10 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <img 
                src="/images/Unilancer logo 2.png" 
                alt="Unilancer"
                className="h-8 lg:h-10 w-auto relative"
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center">
            <div className="flex items-center space-x-6">
              <div 
                className="relative group"
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
              >
                <button
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className={`
                    px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2
                    ${location.pathname.startsWith('/services') ? 'text-primary' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'}
                    hover:bg-gray-100/50 dark:hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary text-base
                  `}
                >
                  <span>Hizmetler</span>
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
                      className="absolute top-full left-0 mt-2 bg-white/95 dark:bg-dark-light/95 backdrop-blur-sm rounded-xl shadow-xl border border-gray-200 dark:border-white/10 overflow-hidden"
                    >
                      <div className="flex p-4 gap-8">
                        {serviceCategories.map((category, index) => (
                          <div key={index} className="min-w-[240px]">
                            <Link
                              to={category.path}
                              className="text-sm font-medium text-primary hover:text-primary-light transition-colors mb-4 block"
                              onClick={() => {
                                setIsServicesOpen(false);
                                scrollToTop();
                              }}
                            >
                              {category.title}
                            </Link>
                            <div className="space-y-1">
                              {category.items.map((item, itemIndex) => (
                                <Link
                                  key={itemIndex}
                                  to={category.path}
                                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors group min-h-[44px]"
                                  onClick={() => {
                                    setIsServicesOpen(false);
                                    scrollToTop();
                                  }}
                                >
                                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                    <item.icon className="w-4 h-4 text-primary" />
                                  </div>
                                  <span className="text-base text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                                    {item.label}
                                  </span>
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
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
            <ThemeToggle />
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
            className="md:hidden relative w-12 h-12 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
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
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Menu className="w-6 h-6" />
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
                className="fixed inset-0 top-[64px] bg-white/95 dark:bg-dark/95 backdrop-blur-lg z-40 md:hidden overflow-y-auto"
                style={{ height: 'calc(100vh - 64px)' }}
              >
                <div className="min-h-screen px-4 py-6">
                  <div className="space-y-6 max-w-lg mx-auto">
                    {/* Main Navigation Links */}
                    <div className="space-y-3">
                      {/* Services Dropdown */}
                      <div className="bg-gray-100 dark:bg-dark-light/30 rounded-xl overflow-hidden">
                        <button
                          onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                          className="w-full px-6 py-4 text-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 flex items-center justify-between"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                              <Code2 className="w-5 h-5 text-primary" />
                            </div>
                            <span className="font-medium">Hizmetler</span>
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
                              className="border-t border-gray-200 dark:border-white/10"
                            >
                              {serviceCategories.map((category, index) => (
                                <div key={index} className="px-6 py-4 space-y-3">
                                  <Link
                                    to={category.path}
                                    className="block text-lg font-medium text-primary"
                                    onClick={() => {
                                      setIsOpen(false);
                                      setMobileServicesOpen(false);
                                      scrollToTop();
                                    }}
                                  >
                                    {category.title}
                                  </Link>
                                  <div className="grid grid-cols-1 gap-2">
                                    {category.items.map((item, itemIndex) => (
                                      <Link
                                        key={itemIndex}
                                        to={category.path}
                                        className="flex items-center space-x-3 p-3 bg-white dark:bg-dark/50 rounded-xl hover:bg-gray-50 dark:hover:bg-dark transition-colors duration-200"
                                        onClick={() => {
                                          setIsOpen(false);
                                          setMobileServicesOpen(false);
                                          scrollToTop();
                                        }}
                                      >
                                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                                          <item.icon className="w-4 h-4 text-primary" />
                                        </div>
                                        <span className="text-gray-600 dark:text-gray-300">{item.label}</span>
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              ))}
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
                          className="flex items-center justify-between px-6 py-4 bg-gray-100 dark:bg-dark-light/30 text-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-xl transition-colors duration-200 group"
                          onClick={() => {
                            setIsOpen(false);
                            scrollToTop();
                          }}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                              <link.icon className="w-5 h-5 text-primary" />
                            </div>
                            <span className="font-medium">{link.label}</span>
                          </div>
                          <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
                        </Link>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-4 pt-4">
                      <div className="flex justify-center">
                        <ThemeToggle />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <Link
                          to="/project-request"
                          className="flex items-center justify-center space-x-2 px-6 py-4 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          <Rocket className="w-5 h-5" />
                          <span className="font-medium">Teklif Al</span>
                        </Link>
                        <Link
                          to="/join"
                          className="flex items-center justify-center space-x-2 px-6 py-4 bg-primary/10 text-primary rounded-xl hover:bg-primary/20 transition-colors"
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
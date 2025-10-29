import React, { useState, useCallback, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  X, Menu, Moon, Sun, ChevronDown, Code2, Palette, 
  LineChart, Home, Briefcase, Users, Mail, BookOpen, UserPlus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const services = [
  { icon: Code2, label: 'Yazılım', href: '/services#software' },
  { icon: Palette, label: 'Tasarım', href: '/services#design' },
  { icon: LineChart, label: 'Dijital Pazarlama', href: '/services#marketing' }
];

const navLinks = [
  { icon: Home, label: 'Ana Sayfa', href: '/' },
  { icon: Users, label: 'Hakkımızda', href: '/about' },
  { icon: Briefcase, label: 'Portfolyo', href: '/portfolio' },
  { icon: BookOpen, label: 'Blog', href: '/blog' },
  { icon: Mail, label: 'İletişim', href: '/contact' }
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    setIsOpen(false);
    setIsServicesOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 dark:bg-dark/95 backdrop-blur-md shadow-lg border-b border-slate-200 dark:border-white/10'
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex-shrink-0 group relative z-10">
            <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-primary-light/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <img
              src="/images/Unilancer logo 2.png"
              alt="Unilancer"
              className="h-8 md:h-10 relative"
            />
          </Link>

          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-4 py-2 rounded-lg transition-colors font-medium flex items-center space-x-2 ${
                  isActive(link.href)
                    ? 'text-primary bg-primary/10'
                    : 'text-slate-700 dark:text-gray-300 hover:text-primary hover:bg-slate-100 dark:hover:bg-white/5'
                }`}
              >
                <link.icon className="w-4 h-4" />
                <span>{link.label}</span>
              </Link>
            ))}
            
            <div className="relative">
              <button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className="px-4 py-2 rounded-lg transition-colors font-medium flex items-center space-x-2 text-slate-700 dark:text-gray-300 hover:text-primary hover:bg-slate-100 dark:hover:bg-white/5"
              >
                <Briefcase className="w-4 h-4" />
                <span>Hizmetler</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {isServicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-dark-light border border-slate-200 dark:border-white/10 rounded-xl shadow-xl overflow-hidden"
                  >
                    {services.map((service) => (
                      <Link
                        key={service.href}
                        to={service.href}
                        className="flex items-center space-x-3 px-4 py-3 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                      >
                        <service.icon className="w-5 h-5 text-primary" />
                        <span className="text-slate-700 dark:text-gray-300">{service.label}</span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <Link
              to="/join"
              className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium"
            >
              <UserPlus className="w-4 h-4" />
              <span>Bize Katıl</span>
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-slate-200 dark:border-white/10 bg-white/95 dark:bg-dark/95 backdrop-blur-md"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive(link.href)
                      ? 'text-primary bg-primary/10'
                      : 'text-slate-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-white/5'
                  }`}
                >
                  <link.icon className="w-5 h-5" />
                  <span>{link.label}</span>
                </Link>
              ))}
              
              <div className="pt-2 border-t border-slate-200 dark:border-white/10">
                {services.map((service) => (
                  <Link
                    key={service.href}
                    to={service.href}
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                  >
                    <service.icon className="w-5 h-5 text-primary" />
                    <span>{service.label}</span>
                  </Link>
                ))}
              </div>

              <Link
                to="/join"
                className="flex items-center justify-center space-x-2 px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium mt-4"
              >
                <UserPlus className="w-4 h-4" />
                <span>Bize Katıl</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

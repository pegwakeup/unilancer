import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowUpRight, Linkedin, Twitter, Instagram, Github } from 'lucide-react';
import { usePrivacyTerms } from './ui/privacy-terms-provider';

const Footer = () => {
  const { openPrivacyPolicy, openTerms } = usePrivacyTerms();

  return (
    <footer className="relative bg-gradient-to-b from-slate-50 to-slate-100 dark:from-dark dark:to-dark-light border-t border-slate-200 dark:border-white/10">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent dark:from-primary/10 dark:via-transparent dark:to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent dark:from-primary/10 dark:via-transparent dark:to-transparent opacity-30" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <img
              src="/images/Unilancer logo 2.webp"
              alt="Unilancer"
              className="h-10 mb-4"
            />
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Modern teknolojiler ve yaratıcı çözümlerle işletmenizi dijital dünyada öne çıkarıyoruz.
            </p>
            <div className="flex space-x-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-slate-100 dark:bg-white/5 rounded-lg hover:bg-primary/10 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-slate-100 dark:bg-white/5 rounded-lg hover:bg-primary/10 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-slate-100 dark:bg-white/5 rounded-lg hover:bg-primary/10 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-slate-100 dark:bg-white/5 rounded-lg hover:bg-primary/10 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Hızlı Linkler</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                  Ana Sayfa
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                  Hizmetlerimiz
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                  Portfolyo
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Hizmetler</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services#software" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                  Yazılım Geliştirme
                </Link>
              </li>
              <li>
                <Link to="/services#design" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                  Tasarım
                </Link>
              </li>
              <li>
                <Link to="/services#marketing" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                  Dijital Pazarlama
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">İletişim</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <a href="mailto:info@unilancer.com" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                  info@unilancer.com
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <a href="tel:+905061523255" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                  +90 506 152 32 55
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-gray-600 dark:text-gray-400">
                  Teknopark İstanbul, Türkiye
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              © {new Date().getFullYear()} Unilancer Labs. Tüm hakları saklıdır.
            </p>
            <div className="flex space-x-6">
              <button
                onClick={openPrivacyPolicy}
                className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors text-sm"
              >
                Gizlilik Politikası
              </button>
              <button
                onClick={openTerms}
                className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors text-sm"
              >
                Kullanım Koşulları
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

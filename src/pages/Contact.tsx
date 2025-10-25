import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, Phone, MapPin, Send, Building2, ArrowUpRight, 
  MessageSquare, Clock, ExternalLink
} from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="pt-24 pb-16 relative">
      {/* Fixed Background Patterns */}
      <div className="fixed inset-0 z-0">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_70%)]" />
        
        {/* Gradient Orbs */}
        <div className="absolute -left-40 -top-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl opacity-20" />
        <div className="absolute -right-40 -bottom-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl opacity-20" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl font-bold mb-8">İletişime Geçin</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-200">
                  İsim Soyisim
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-dark-light/50 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors placeholder-gray-400 text-gray-100"
                  placeholder="İsminizi girin"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-200">
                  E-posta Adresi
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full bg-dark-light/50 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors placeholder-gray-400 text-gray-100"
                  placeholder="E-posta adresinizi girin"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-200">
                  Konu
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                  className="w-full bg-dark-light/50 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors placeholder-gray-400 text-gray-100"
                  placeholder="Mesajınızın konusu"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-200">
                  Mesaj
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  rows={6}
                  className="w-full bg-dark-light/50 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors placeholder-gray-400 text-gray-100"
                  placeholder="Mesajınızı yazın"
                  required
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl transition-colors flex items-center justify-center space-x-2 group"
                >
                  <Send className="w-5 h-5" />
                  <span>Gönder</span>
                  <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform" />
                </motion.button>

                <motion.a
                  href="https://wa.me/+905061523255"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-[#25D366] hover:bg-[#20BD5A] text-white px-8 py-4 rounded-xl transition-colors flex items-center justify-center space-x-2 group"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>WhatsApp</span>
                  <ExternalLink className="w-5 h-5 group-hover:rotate-45 transition-transform" />
                </motion.a>
              </div>
            </form>
          </motion.div>
          
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:pl-12"
          >
            <div className="space-y-8">
              <h2 className="text-xl font-bold text-gray-200">İletişim Bilgileri</h2>
              
              <div className="space-y-6">
                <a 
                  href="mailto:info@unilancerlabs.com"
                  className="flex items-center space-x-4 text-gray-300 hover:text-white transition-colors group"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-gray-100">E-posta</h3>
                    <p className="text-base text-gray-400">info@unilancerlabs.com</p>
                  </div>
                </a>
                
                <a 
                  href="tel:+905061523255"
                  className="flex items-center space-x-4 text-gray-300 hover:text-white transition-colors group"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-gray-100">Telefon</h3>
                    <p className="text-base text-gray-400">+90 506 152 32 55</p>
                  </div>
                </a>
                
                <a
                  href="https://maps.app.goo.gl/QjP8fXWYP5awy7qK8"
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="flex items-center space-x-4 text-gray-300 hover:text-white transition-colors group"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-gray-100">Adres</h3>
                    <p className="text-base text-gray-400">
                      Şehit Muhtar, Mis Sk. No:24<br />
                      34435 Beyoğlu/İstanbul<br />
                      Cube Beyoğlu
                    </p>
                  </div>
                </a>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-gray-100">Çalışma Saatleri</h3>
                    <p className="text-base text-gray-400">
                      Pazartesi - Cuma: 09:00 - 18:00<br />
                      Cumartesi - Pazar: Kapalı
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Full-width Map */}
      <div className="mt-16 relative z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-dark to-transparent h-32 z-10" />
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3009.3663197525847!2d28.97772937668711!3d41.03473017134433!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab9e7a7777c43%3A0x4c76cf3c5e80d90f!2sCube%20Beyo%C4%9Flu!5e0!3m2!1str!2str!4v1707997561783!5m2!1str!2str"
          width="100%"
          height="500"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-dark to-transparent h-32 z-10" />
      </div>
    </div>
  );
};

export default Contact;
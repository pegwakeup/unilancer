// LEGACY / UNUSED COMPONENT
// Şu anda projede kullanılmıyor, gelecekte referans için saklanıyor.

import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Ahmet Yılmaz",
    role: "CEO, TechCorp",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200",
    quote: "Unilancer ile çalışmak, dijital dönüşüm sürecimizi hızlandırdı. Profesyonel ekipleri ve yenilikçi çözümleriyle beklentilerimizin ötesine geçtiler.",
    rating: 5,
    companyLogo: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?auto=format&fit=crop&q=80&w=100"
  },
  {
    id: 2,
    name: "Ayşe Kaya",
    role: "CTO, InnovateTech",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
    quote: "Yazılım geliştirme süreçlerindeki uzmanlıkları ve proje yönetimindeki başarıları ile fark yaratıyorlar.",
    rating: 5,
    companyLogo: "https://images.unsplash.com/photo-1614680376408-12c8c384c640?auto=format&fit=crop&q=80&w=100"
  },
  {
    id: 3,
    name: "Mehmet Demir",
    role: "Kurucu, FinTech Solutions",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
    quote: "Modern teknolojileri kullanarak geliştirdikleri çözümler, işletmemizin verimliliğini önemli ölçüde artırdı.",
    rating: 5,
    companyLogo: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?auto=format&fit=crop&q=80&w=100"
  }
];

const TestimonialSlider = () => {
  return (
    <div className="py-20 bg-dark-light relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Müşterilerimiz Ne Diyor?</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Başarı hikayelerimiz ve müşteri deneyimleri
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="relative bg-dark p-8 rounded-xl border border-white/10 hover:border-primary/20 transition-all h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <div className="absolute -inset-2 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover relative"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{testimonial.name}</h3>
                    <p className="text-gray-400">{testimonial.role}</p>
                    <div className="flex gap-1 mt-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-primary fill-primary" />
                      ))}
                    </div>
                  </div>
                </div>
                
                <Quote className="w-8 h-8 text-primary/20 mb-4" />
                <p className="text-gray-300 mb-6">{testimonial.quote}</p>
                
                <div className="mt-auto">
                  <img
                    src={testimonial.companyLogo}
                    alt="Company Logo"
                    className="h-8 w-auto opacity-50 group-hover:opacity-100 transition-opacity"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialSlider;
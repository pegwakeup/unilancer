import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Zap } from 'lucide-react';
import { TextRotate } from '../components/ui/text-rotate';
import { CTASection } from '../components/ui/cta-with-glow';
import { LogosCarousel } from '../components/ui/logos-carousel';
import { FaqSectionDemo } from '../components/ui/faq-demo';
import { FeatureSectionTop } from '../components/ui/feature-section-top';
import { FeatureSectionBottom } from '../components/ui/feature-section-bottom';
import { ServicesSection } from '../components/ui/services-section';
import { PortfolioPreview } from '../components/ui/portfolio-preview';
import Floating, { FloatingElement } from '../components/ui/parallax-floating';

const images = [
  {
    url: "https://ctncspdgguclpeijikfp.supabase.co/storage/v1/object/public/Landing%20Page//heropagepicture1.webp",
    title: "Development"
  },
  {
    url: "https://ctncspdgguclpeijikfp.supabase.co/storage/v1/object/public/Landing%20Page//heropagepicture2.webp",
    title: "Team Work"
  },
  {
    url: "https://ctncspdgguclpeijikfp.supabase.co/storage/v1/object/public/Landing%20Page//heropagepicture3.webp",
    title: "Design"
  },
  {
    url: "https://ctncspdgguclpeijikfp.supabase.co/storage/v1/object/public/Landing%20Page//heropagepicture4.webp",
    title: "Meeting"
  }
];

const Home = () => {
  return (
    <div className="relative min-h-screen">
      {/* Fixed Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-dark/95" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_70%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative min-h-[100vh] md:min-h-screen flex items-center justify-center overflow-hidden py-20 md:py-0">
          <Floating sensitivity={0.5} className="h-full">
            {/* Top Left Image */}
            <FloatingElement
              depth={0.5}
              className="top-[10%] left-[5%] md:top-[12%] md:left-[10%]"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.5, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="relative group"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-transparent rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                <img
                  src={images[0].url}
                  alt={images[0].title}
                  className="w-48 h-32 sm:w-56 sm:h-40 md:w-64 md:h-48 lg:w-72 lg:h-56 object-cover hover:scale-105 duration-700 cursor-pointer transition-all -rotate-6 rounded-xl relative filter brightness-50 group-hover:brightness-75"
                />
              </motion.div>
            </FloatingElement>

            {/* Top Right Image */}
            <FloatingElement
              depth={1}
              className="top-[10%] right-[5%] md:top-[12%] md:right-[10%]"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.5, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="relative group"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-transparent rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                <img
                  src={images[1].url}
                  alt={images[1].title}
                  className="w-48 h-32 sm:w-56 sm:h-40 md:w-64 md:h-48 lg:w-72 lg:h-56 object-cover hover:scale-105 duration-700 cursor-pointer transition-all rotate-6 rounded-xl relative filter brightness-50 group-hover:brightness-75"
                />
              </motion.div>
            </FloatingElement>

            {/* Bottom Left Image */}
            <FloatingElement
              depth={4}
              className="bottom-[10%] left-[5%] md:bottom-[15%] md:left-[10%]"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.5, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="relative group"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-transparent rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                <img
                  src={images[2].url}
                  alt={images[2].title}
                  className="w-48 h-32 sm:w-56 sm:h-40 md:w-64 md:h-48 lg:w-72 lg:h-56 object-cover hover:scale-105 duration-700 cursor-pointer transition-all -rotate-12 rounded-xl relative filter brightness-50 group-hover:brightness-75"
                />
              </motion.div>
            </FloatingElement>

            {/* Bottom Right Image */}
            <FloatingElement
              depth={2}
              className="bottom-[10%] right-[5%] md:bottom-[15%] md:right-[10%]"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.5, scale: 1 }}
                transition={{ duration: 0.8, delay: 1.1 }}
                className="relative group"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-transparent rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                <img
                  src={images[3].url}
                  alt={images[3].title}
                  className="w-48 h-32 sm:w-56 sm:h-40 md:w-64 md:h-48 lg:w-72 lg:h-56 object-cover hover:scale-105 duration-700 cursor-pointer transition-all rotate-12 rounded-xl relative filter brightness-50 group-hover:brightness-75"
                />
              </motion.div>
            </FloatingElement>
          </Floating>

          <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-5xl mx-auto"
            >
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-gradient-to-r from-primary/20 to-primary-light/20 text-primary mb-6 sm:mb-8 text-sm sm:text-base"
              >
                <Zap className="w-3.5 h-3.5 md:w-4 md:h-4 mr-1.5 md:mr-2" />
                <span>2024'ün En İyi Teknoloji Çözümleri</span>
              </motion.div>

              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 leading-tight"
                animate={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.2, ease: "easeOut", delay: 0.3 }}
              >
                <div className="mb-2">Dijital dünyada</div>
                <motion.div layout className="flex flex-wrap justify-center items-center gap-x-2">
                  <motion.span
                    layout
                    className="flex whitespace-pre"
                    transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  >
                    işinizi
                  </motion.span>
                  <TextRotate
                    texts={[
                      "büyütün 🚀",
                      "öne çıkarın ⭐",
                      "yenileyin ✨"
                    ]}
                    mainClassName="overflow-hidden text-primary py-0 pb-1 md:pb-2 rounded-xl min-w-[200px] sm:min-w-[280px] md:min-w-[380px] px-2"
                    staggerDuration={0.03}
                    staggerFrom="last"
                    rotationInterval={3000}
                  />
                </motion.div>
              </motion.h1>
              
              <motion.p
                className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 sm:mb-12 max-w-2xl mx-auto px-4"
                animate={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.2, ease: "easeOut", delay: 0.5 }}
              >
                Modern teknolojiler ve yaratıcı çözümlerle işletmenizi dijital dünyada öne çıkarıyoruz
              </motion.p>

              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 px-4">
                <motion.a
                  href="/project-request"
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-primary hover:bg-primary-dark text-white rounded-xl font-medium transition-colors flex items-center justify-center space-x-2 group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Projenizi Başlatalım</span>
                  <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform" />
                </motion.a>

                <motion.a
                  href="/portfolio"
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white/5 backdrop-blur-sm text-white rounded-xl hover:bg-white/10 transition-colors flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Portfolyo</span>
                  <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform" />
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Feature Section Top */}
        <FeatureSectionTop />

        {/* Services Section */}
        <ServicesSection />

        {/* Partners Section */}
        <section className="pt-8 pb-4 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div 
              className="text-center mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold">Partnerlerimiz</h2>
            </motion.div>
          </div>

          <LogosCarousel />
        </section>

        {/* Portfolio Preview Section */}
        <PortfolioPreview />

        {/* Feature Section Bottom */}
        <FeatureSectionBottom />

        {/* FAQ Section */}
        <FaqSectionDemo />

        {/* CTA Section */}
        <CTASection
          title="Projenizi Hayata Geçirmeye Hazır mısınız?"
          description="Size özel çözümler için hemen iletişime geçin"
          action={{
            text: "Teklif Alın",
            href: "/project-request",
            variant: "default"
          }}
          className="py-12"
        />
      </div>
    </div>
  );
};

export default Home;
import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Globe, CheckCircle, Palette, Code2, Linkedin, MessageSquare, ArrowUpRight } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';

const About = () => {
  return (
    <div className="relative min-h-screen pt-24 pb-16 bg-gradient-to-br from-blue-50 via-cyan-50/40 to-blue-100/30 dark:bg-dark">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/95 via-cyan-50/60 to-blue-100/50 dark:bg-dark/95" />
      </div>

      <div className="relative z-10">
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <h2 className="text-3xl font-bold mb-4">Hikayemiz</h2>
                <div className="space-y-6 text-gray-600 dark:text-gray-300">
                  <p>2022 yılında, farklı alanlarda freelance hizmet veren üniversiteli gençler olarak; "Uni" (üniversiteli, bir ve bütün) ve "Freelancer" kavramlarından ilham alarak <span className="text-primary font-medium">Unilancer Labs</span>'i kurduk.</p>
                  <p>Kısa sürede <span className="text-primary font-medium">150</span>'den fazla <span className="text-primary font-medium">yetkin freelancerı</span> bünyemize katarak "Unilance" iş modelini geliştirdik.</p>
                  <p>Bugün, <span className="text-primary font-medium">Teknopark İstanbul</span> bünyesinde yazılım, tasarım ve pazarlama alanlarında <span className="text-primary font-medium">B2B</span> hizmetler sunuyoruz.</p>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative">
                <div className="relative aspect-video">
                  <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80" alt="Team Meeting" className="w-full h-full object-cover rounded-xl" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;

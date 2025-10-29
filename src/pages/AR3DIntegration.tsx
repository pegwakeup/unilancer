import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  Box,
  Scan,
  Smartphone,
  Layers,
  Zap,
  Eye,
  ChevronDown,
  ChevronUp,
  Upload,
  CheckCircle2,
  ArrowRight,
  Camera,
  Rotate3D
} from 'lucide-react';
import { Animated3DModel } from '../components/ui/animated-3d-model';
import { ARModelViewer } from '../components/ui/ar-model-viewer';
import { Card } from '../components/ui/card';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6 }
};

const stagger = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: "-100px" },
  transition: { staggerChildren: 0.2 }
};

export default function AR3DIntegration() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);



  const steps = [
    {
      number: 1,
      icon: Upload,
      title: '3D Modelinizi Oluşturun',
      description: 'Spline, Blender veya favori 3D aracınızda tasarlayın. GLB, GLTF olarak dışa aktarın veya Spline\'ı doğrudan kullanın.'
    },
    {
      number: 2,
      icon: Box,
      title: 'Kod ile Entegre Edin',
      description: 'Basit bileşenlerimiz veya API\'lerimizi kullanarak 3D sahnenizi sadece birkaç satır kodla yerleştirin.'
    },
    {
      number: 3,
      icon: CheckCircle2,
      title: 'Yayınlayın ve Etkileşim',
      description: 'Deneyiminizi yayınlayın ve kullanıcıların tüm cihazlarda 3D modellerinizle etkileşime girmesine izin verin.'
    }
  ];

  const faqs = [
    {
      question: 'Spline ile Nasıl 3D Model Eklerim?',
      answer: `Spline en kolay yöntemdir:

1. spline.design adresine gidin ve ücretsiz hesap oluşturun
2. 3D modelinizi tasarlayın veya içe aktarın
3. Sağ üst köşeden "Export" > "Code Export" seçin
4. "React" sekmesinden URL'yi kopyalayın
5. Kodunuzda kullanın:

<SplineScene
  scene="your-spline-url-here"
  className="w-full h-[500px]"
/>

Spline avantajları:
• Tarayıcıda çalışır, kurulum gerektirmez
• Animasyon ve etkileşim editörü
• Otomatik optimizasyon
• Kolay paylaşım ve gömme`
    },
    {
      question: 'GLB/GLTF Dosyalarını Nasıl Kullanırım?',
      answer: `GLB/GLTF dosyaları için Three.js kullanabilirsiniz:

1. Kütüphaneleri yükleyin:
npm install three @react-three/fiber @react-three/drei

2. Bileşen oluşturun:
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'

function Model() {
  const { scene } = useGLTF('/model.glb')
  return <primitive object={scene} />
}

function ModelViewer() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} />
      <Model />
      <OrbitControls />
    </Canvas>
  )
}

GLB/GLTF avantajları:
• Endüstri standardı format
• Tüm 3D programlarla uyumlu
• Kompakt dosya boyutu
• PBR materyaller`
    },
    {
      question: '3D Model Dosyamı Nereye Yüklerim?',
      answer: `3D model dosyalarınızı barındırmak için birkaç seçenek:

1. Proje İçinde (Önerilen):
   • /public/models/ klasörüne koyun
   • Kullanım: useGLTF('/models/yourmodel.glb')

2. Spline (En Kolay):
   • Spline'da tasarlayın
   • Otomatik CDN barındırma
   • URL'yi direkt kullanın

3. CDN Servisleri:
   • Cloudinary
   • AWS S3 + CloudFront
   • Vercel Blob Storage

4. Supabase Storage:
   • Ücretsiz 1GB
   • Global CDN
   • Kolay entegrasyon

Önemli: Dosya boyutlarını optimize edin (ideal: <5MB)`
    },
    {
      question: 'AR (Artırılmış Gerçeklik) Nasıl Eklerim?',
      answer: `AR özelliği eklemek için birkaç yöntem:

1. Model Viewer (Google - En Basit):
<model-viewer
  src="model.glb"
  ar
  ar-modes="webxr scene-viewer quick-look"
  camera-controls
  auto-rotate
></model-viewer>

Avantajları:
• Kod gerektirmez
• iOS ve Android destekli
• Otomatik AR butonu

2. 8th Wall (Profesyonel):
• WebAR platformu
• Özel AR deneyimleri
• Yüz/yüzey takibi
• Ücretli servis

3. AR.js (Açık Kaynak):
• Ücretsiz
• Marker tabanlı AR
• Hafif ve hızlı

4. React Three Fiber + AR:
• @react-three/xr kullanın
• Tam kontrol
• WebXR API

Tavsiye: Başlangıç için Model Viewer'ı deneyin.`
    }
  ];

  return (
    <>
      <Helmet>
        <title>3D & AR Integration | Unilancer</title>
        <meta
          name="description"
          content="Transform your digital presence with cutting-edge 3D and Augmented Reality solutions. Interactive product visualization, virtual showrooms, and immersive experiences."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900/30 dark:bg-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=1080&fit=crop')] opacity-5 bg-cover bg-center" />

        <section className="relative pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="z-10"
              >
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 mb-8 border border-cyan-500/30"
                >
                  <Camera className="w-5 h-5 mr-2" />
                  <span className="font-semibold">Artırılmış Gerçeklik Teknolojisi</span>
                </motion.div>

                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-white leading-tight">
                  Ürünlerinizi
                  <br />
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    AR ile Görüntüleyin
                  </span>
                </h1>

                <p className="text-xl text-slate-300 mb-10 leading-relaxed">
                  Müşterileriniz ürünlerinizi kendi mekanlarında, gerçek boyutlarda görebilir. iOS ve Android destekli AR teknolojisi ile satışlarınızı artırın.
                </p>

                <div className="space-y-4 mb-10">
                  {[
                    { icon: Camera, text: 'iPhone ve Android AR desteği' },
                    { icon: Rotate3D, text: '360° döndürme ve yakınlaştırma' },
                    { icon: Eye, text: 'Gerçek boyutta görüntüleme' }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="flex items-center gap-4"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl flex items-center justify-center border border-cyan-500/30">
                        <item.icon className="w-6 h-6 text-cyan-400" />
                      </div>
                      <span className="text-slate-200 font-medium text-lg">{item.text}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/project-request"
                    className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-2 group shadow-2xl"
                  >
                    AR Proje Talebi
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <a
                    href="#demo"
                    className="px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-2xl hover:bg-white/20 transition-all flex items-center justify-center gap-2 font-bold text-lg border border-white/20"
                  >
                    Canlı Demo
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative"
              >
                <Animated3DModel
                  scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                  className="w-full h-[600px]"
                />
              </motion.div>
            </div>
          </div>
        </section>


        <section id="demo" className="py-20 bg-white dark:bg-dark-light/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={fadeInUp.viewport}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 dark:bg-primary/20 text-primary mb-6">
                <Camera className="w-4 h-4 mr-2" />
                <span className="font-medium">AR Deneyimi</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
                Artırılmış Gerçeklik ile Keşfedin
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Ürünleri gerçek dünyanızda görüntüleyin. Telefonunuzun kamerasını açın ve 3D modelleri evinizde, ofisinizde görün.
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={fadeInUp.viewport}
            >
              <Card className="overflow-hidden bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 shadow-xl">
                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <h3 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">
                      AR ile Ürünlerinizi Görüntüleyin
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-lg mb-6 leading-relaxed">
                      Google'ın model-viewer teknolojisi ile iOS ve Android cihazlarda tam AR desteği. Gerçek boyutta, gerçek mekanınızda görüntüleyin.
                    </p>
                    <div className="space-y-3 mb-6">
                      {[
                        'iOS 12+ (iPhone/iPad) desteği',
                        'ARCore destekli Android cihazlar',
                        'Gerçek boyut ve ölçek',
                        '360° döndürme ve yakınlaştırma'
                      ].map((feature, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="relative min-h-[500px] bg-slate-900">
                    <ARModelViewer
                      src="https://modelviewer.dev/shared-assets/models/Astronaut.glb"
                      alt="Sample AR Model"
                      poster="https://modelviewer.dev/shared-assets/models/Astronaut.webp"
                      className="w-full h-full"
                    />
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>

        <section className="py-20 bg-slate-50 dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={fadeInUp.viewport}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
                Nasıl Çalışır?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                AR entegrasyonu basit ve hızlı. Üç adımda AR deneyimini müşterilerinizle paylaşın.
              </p>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-3 gap-8"
              variants={stagger}
              initial="initial"
              whileInView="whileInView"
              viewport={stagger.viewport}
            >
              {steps.map((step, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="p-8 h-full bg-white dark:bg-slate-800 hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-white/10 group hover:-translate-y-1">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mb-6 text-white text-2xl font-bold group-hover:scale-110 transition-transform">
                      {step.number}
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 dark:bg-cyan-500/20 flex items-center justify-center mb-4">
                      <step.icon className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">{step.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {step.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>




        <section className="py-20 bg-white dark:bg-slate-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={fadeInUp.viewport}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
                Sıkça Sorulan Sorular
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                AR entegrasyonu hakkında merak edilenler
              </p>
            </motion.div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  initial="initial"
                  whileInView="whileInView"
                  viewport={fadeInUp.viewport}
                >
                  <Card className="overflow-hidden bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 hover:border-primary dark:hover:border-primary transition-colors duration-300">
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                      className="w-full p-6 flex items-center justify-between text-left group"
                    >
                      <span className="text-lg font-semibold pr-4 group-hover:text-primary transition-colors text-slate-900 dark:text-white">
                        {faq.question}
                      </span>
                      {expandedFaq === index ? (
                        <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      )}
                    </button>
                    {expandedFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-6 pb-6"
                      >
                        <div className="text-gray-600 dark:text-gray-400 whitespace-pre-line leading-relaxed border-t border-slate-200 dark:border-slate-700 pt-4">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-gradient-to-br from-white to-blue-50/50 dark:from-slate-800 dark:to-slate-800/50 p-12 text-center border border-slate-200 dark:border-white/10 shadow-xl">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
                  Projenizi Hayata Geçirmeye Hazır mısınız?
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
                  Modern 3D ve AR teknolojileri ile vizyonunuzu hayata geçirelim. Ekibimiz unutulmaz deneyimler yaratmanıza yardımcı olmaya hazır.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/project-request"
                    className="px-8 py-4 bg-primary hover:bg-primary-dark text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2 group shadow-md hover:shadow-lg"
                  >
                    3D Proje Talebi
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    to="/contact"
                    className="px-8 py-4 bg-slate-100 dark:bg-white/5 backdrop-blur-sm text-slate-900 dark:text-white rounded-xl hover:bg-slate-200 dark:hover:bg-white/10 transition-all flex items-center justify-center gap-2 font-semibold border border-slate-200 dark:border-white/10"
                  >
                    İletişime Geçin
                  </Link>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}

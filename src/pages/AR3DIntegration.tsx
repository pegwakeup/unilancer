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
  Code,
  Upload,
  Play,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Package
} from 'lucide-react';
import { SplineScene } from '../components/ui/splite';
import { Card } from '../components/ui/card';
import { Spotlight } from '../components/ui/spotlight-aceternity';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function AR3DIntegration() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const features = [
    {
      icon: Box,
      title: 'Interactive 3D Models',
      description: 'Create stunning, interactive 3D experiences that users can explore from every angle with smooth animations.'
    },
    {
      icon: Scan,
      title: 'Augmented Reality',
      description: 'Bring products to life in real-world environments with AR technology for iOS and Android devices.'
    },
    {
      icon: Zap,
      title: 'Real-time Rendering',
      description: 'Experience lightning-fast loading and smooth interactions with optimized 3D rendering technology.'
    },
    {
      icon: Layers,
      title: 'Multi-format Support',
      description: 'Support for GLB, GLTF, FBX, OBJ and Spline files with automatic optimization for web delivery.'
    },
    {
      icon: Smartphone,
      title: 'Mobile Optimized',
      description: 'Perfectly optimized for mobile devices with touch gestures, gyroscope support, and responsive scaling.'
    },
    {
      icon: Eye,
      title: 'Custom Interactions',
      description: 'Add custom animations, hotspots, and interactive elements to create engaging user experiences.'
    }
  ];

  const useCases = [
    {
      title: 'E-commerce Product Visualization',
      description: 'Allow customers to view products in 3D, rotate, zoom, and see them in their own space with AR.',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop'
    },
    {
      title: 'Real Estate Virtual Tours',
      description: 'Create immersive property tours with 3D floor plans and AR room visualization.',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop'
    },
    {
      title: 'Educational & Training',
      description: 'Interactive 3D models for anatomy, engineering, architecture, and scientific visualization.',
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=600&fit=crop'
    },
    {
      title: 'Gaming & Entertainment',
      description: 'Build immersive gaming experiences with 3D characters, environments, and interactive storytelling.',
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=600&fit=crop'
    }
  ];

  const steps = [
    {
      number: 1,
      icon: Upload,
      title: 'Create Your 3D Model',
      description: 'Design in Spline, Blender, or your favorite 3D tool. Export as GLB, GLTF, or use Spline directly.'
    },
    {
      number: 2,
      icon: Code,
      title: 'Integrate with Code',
      description: 'Use our simple components or APIs to embed your 3D scene with just a few lines of code.'
    },
    {
      number: 3,
      icon: Play,
      title: 'Deploy & Interact',
      description: 'Publish your experience and let users interact with your 3D models across all devices.'
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
    },
    {
      question: 'Hangi 3D Format En İyi?',
      answer: `Her formatın avantajları var:

**GLB (Binary GLTF)** ⭐ Önerilen
• Tek dosya (geometri + texture)
• Hızlı yükleme
• WebGL için optimize
• Animasyon desteği
• En yaygın web formatı

**GLTF (JSON + binaries)**
• Okunabilir JSON
• Debug için kolay
• Gelişmiş düzenleme

**USDZ**
• Apple AR için gerekli
• iOS Quick Look
• GLB'den dönüştürme kolay

**FBX/OBJ**
• Eski formatlar
• İlk önce GLB'ye çevirin
• Blender/Maya çıkışı

**Spline (.splinecode)**
• Spline'a özel
• Animasyon ve etkileşim dahil
• Otomatik optimize

Genel Tavsiye: GLB kullanın veya Spline ile başlayın.`
    },
    {
      question: '3D Modelleri Nasıl Optimize Ederim?',
      answer: `Web için optimizasyon kritiktir:

**Dosya Boyutu:**
• Hedef: <5MB (ideal: 1-2MB)
• Texture'ları sıkıştırın (2048x2048 max)
• Poligon sayısını azaltın
• Draco compression kullanın

**Performans:**
• LOD (Level of Detail) ekleyin
• Gereksiz geometriyi temizleyin
• Texture atlasları kullanın
• Normal maps ile detay ekleyin

**Araçlar:**
• gltf-pipeline (komut satırı)
• Blender export ayarları
• Spline otomatik optimizasyon
• glTF-Transform

**Test:**
• Chrome DevTools Performance
• Lighthouse audit
• Farklı cihazlarda test
• 3G bağlantıda test

Optimize model = Mutlu kullanıcı!`
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

      <div className="min-h-screen">
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920')] opacity-10 bg-cover bg-center" />

          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-slate-900" />

          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-400/30 backdrop-blur-sm mb-8"
            >
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-blue-300 text-sm font-medium">Next Generation Web Experiences</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-cyan-200">
              3D & AR Integration
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Transform your digital presence with cutting-edge 3D visualization and Augmented Reality.
              Create immersive experiences that captivate and engage.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/project-request"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 flex items-center gap-2 group"
              >
                Start Your 3D Project
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#demo"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-300"
              >
                View Demo
              </a>
            </div>
          </motion.div>

          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-8 h-8 text-white/50" />
          </div>
        </section>

        <section id="demo" className="py-24 bg-white dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600">
                Interactive 3D Showcase
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Experience the power of interactive 3D content. Click, drag, and explore these models.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="w-full h-[600px] bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden border-2 border-blue-500/20 shadow-2xl">
                <Spotlight
                  className="-top-40 left-0 md:left-60 md:-top-20"
                  fill="white"
                />

                <div className="flex flex-col lg:flex-row h-full">
                  <div className="lg:w-2/5 p-8 lg:p-12 relative z-10 flex flex-col justify-center">
                    <h3 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 mb-4">
                      Interactive 3D Scene
                    </h3>
                    <p className="text-neutral-300 text-lg mb-6 leading-relaxed">
                      This is a live, interactive 3D model powered by Spline. You can rotate, zoom, and explore the scene in real-time.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3 text-neutral-300">
                        <CheckCircle2 className="w-5 h-5 text-blue-400" />
                        <span>Drag to rotate the view</span>
                      </li>
                      <li className="flex items-center gap-3 text-neutral-300">
                        <CheckCircle2 className="w-5 h-5 text-blue-400" />
                        <span>Scroll to zoom in/out</span>
                      </li>
                      <li className="flex items-center gap-3 text-neutral-300">
                        <CheckCircle2 className="w-5 h-5 text-blue-400" />
                        <span>Click elements for interactions</span>
                      </li>
                    </ul>
                  </div>

                  <div className="lg:w-3/5 relative">
                    <SplineScene
                      scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                      className="w-full h-full"
                    />
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>

        <section className="py-24 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-slate-800 dark:to-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                How It Works
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Integrating 3D content is easier than you think. Follow these simple steps.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="p-8 h-full bg-white dark:bg-slate-800 hover:shadow-xl transition-shadow duration-300 border-2 border-transparent hover:border-blue-500/50">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center mb-6 text-white text-2xl font-bold">
                      {step.number}
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                      <step.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {step.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-white dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Powerful Features
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Everything you need to create stunning 3D and AR experiences.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="p-8 h-full bg-gradient-to-br from-white to-blue-50/50 dark:from-slate-800 dark:to-slate-800/50 hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-slate-800 dark:to-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Use Cases & Applications
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Discover how 3D and AR can transform your industry.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {useCases.map((useCase, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden bg-white dark:bg-slate-800 hover:shadow-2xl transition-all duration-300 group">
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={useCase.image}
                        alt={useCase.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                    <div className="p-8">
                      <h3 className="text-2xl font-bold mb-3">{useCase.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {useCase.description}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-white dark:bg-slate-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 mb-6">
                <Package className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-blue-600 dark:text-blue-400 text-sm font-medium">Implementation Guide</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Kendi 3D Modelinizi Ekleyin
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Detaylı rehber ve kod örnekleri ile kendi 3D modellerinizi entegre edin.
              </p>
            </motion.div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                >
                  <Card className="overflow-hidden bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors duration-300">
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                      className="w-full p-6 flex items-center justify-between text-left group"
                    >
                      <span className="text-lg font-semibold pr-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {faq.question}
                      </span>
                      {expandedFaq === index ? (
                        <ChevronUp className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
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
                        <div className="text-gray-600 dark:text-gray-400 whitespace-pre-line leading-relaxed border-t border-gray-200 dark:border-slate-700 pt-4">
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

        <section className="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920')] opacity-5 bg-cover bg-center" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Ready to Create Something Amazing?
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Let's bring your vision to life with cutting-edge 3D and AR technology.
              Our team is ready to help you create unforgettable experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/project-request"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 flex items-center gap-2 group"
              >
                Request a 3D Project
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </section>
      </div>
    </>
  );
}

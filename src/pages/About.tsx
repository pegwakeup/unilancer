import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import {
  Users, Target, Globe, CheckCircle, TrendingUp, Award,
  Palette, Code2, MessageSquare, ArrowUpRight, Play,
  Briefcase, Heart, Sparkles, Calendar, MapPin, Star
} from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import TeamModern from '../components/ui/sections/team-modern';

// Counter Hook for animated numbers
const useCounter = (end: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);

      setCount(Math.floor(end * percentage));

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return count;
};

// Timeline Data
const timelineData = [
  {
    year: '2022',
    title: 'Fikir Aşaması',
    description: 'Bir kahve sohbeti sırasında doğdu. "Neden yetenekli öğrenciler yurt dışına gidiyor?" sorusundan yola çıkarak Unilancer fikri oluştu.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop',
  },
  {
    year: '2023',
    title: 'İlk 10 Freelancer',
    description: 'İlk ekibimizi oluştururken sadece CV\'ye bakmadık. Tutkularını, projelerini, hikayelerini dinledik. İlk projemiz bir e-ticaret sitesiydi.',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=600&fit=crop',
  },
  {
    year: '2023',
    title: '50+ Proje Tamamlandı',
    description: 'Web sitelerinden mobil uygulamalara, grafik tasarımdan dijital pazarlamaya kadar geniş bir yelpazede projeler tamamladık.',
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=600&fit=crop',
  },
  {
    year: '2024',
    title: 'Teknopark İstanbul',
    description: 'Artık sadece bir platform değil, bir ekosistem olduk. Ar-Ge\'ye yatırım yapmaya başladık ve ofisimizi Teknopark İstanbul\'da açtık.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
  },
  {
    year: '2024',
    title: '150+ Freelancer Ailesi',
    description: 'Bugün 25\'ten fazla üniversiteden, 15 farklı ilden 150\'den fazla yetenekli öğrenci ve mezunla çalışıyoruz.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop',
  },
];

// Values Data
const valuesData = [
  {
    icon: CheckCircle,
    title: 'Güven & Şeffaflık',
    front: 'Tüm süreçlerimiz şeffaf',
    back: 'Hem işverenler hem freelancerlar için süreçleri, beklentileri ve ücretleri baştan netleştiriyoruz. Herkesin hakkını koruyan adil bir model.',
  },
  {
    icon: Target,
    title: 'Kalite Odaklı',
    front: '3 aşamalı kalite kontrol',
    back: 'Her projede tasarım review, kod review ve kullanıcı testi aşamalarından geçerek müşterilerimize en kaliteli çözümü sunuyoruz.',
  },
  {
    icon: Sparkles,
    title: 'Öğrenme Kültürü',
    front: 'Sürekli gelişim',
    back: 'Haftada 2 workshop, ayda 1 hackathon. Freelancer\'larımız sadece para kazanmıyor, aynı zamanda sürekli öğreniyor ve gelişiyor.',
  },
  {
    icon: Globe,
    title: 'Sosyal Etki',
    front: 'Beyin göçü yerine hizmet ihracatı',
    back: 'Yetenekli gençlerin yurt dışına gitmesine gerek kalmadan global projelerde çalışabilecekleri bir ekosistem yaratıyoruz.',
  },
  {
    icon: Heart,
    title: 'Adil Ekonomi',
    front: 'Freelancer odaklı gelir modeli',
    back: 'Proje gelirinin büyük kısmı doğrudan freelancer\'lara gider. Bizim kazancımız sadece platform hizmeti karşılığıdır.',
  },
  {
    icon: Users,
    title: 'Topluluk',
    front: 'Bir aile gibiyiz',
    back: 'Sadece iş ilişkisi değil, dostluk ve dayanışma. Meetup\'lar, sosyal etkinlikler ve ortak başarı kutlamaları.',
  },
];

// Projects Showcase Data
const projectsData = [
  {
    title: 'E-Ticaret Platformu',
    client: 'KOBİ Tekstil',
    description: '2 ay içinde sıfırdan kurulan e-ticaret sitesi, ilk 3 ayda 50K TL ciro yaptı',
    image: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800&h=600&fit=crop',
    metrics: { team: 4, duration: '8 hafta', tech: 'React + Node.js' },
    rating: 5,
    testimonial: 'Beklediklerimin çok üstünde bir hizmet aldım. Ekip son derece profesyonel.',
  },
  {
    title: 'Kurumsal Web Sitesi',
    client: 'Danışmanlık Firması',
    description: 'Modern tasarım ve SEO odaklı kurumsal web sitesi',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    metrics: { team: 3, duration: '6 hafta', tech: 'Next.js + Tailwind' },
    rating: 5,
    testimonial: 'Tasarım ve hız açısından rakiplerimizin önüne geçtik.',
  },
  {
    title: 'Mobil Uygulama',
    client: 'Restoran Zinciri',
    description: 'Online sipariş ve rezervasyon sistemi',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
    metrics: { team: 5, duration: '12 hafta', tech: 'React Native' },
    rating: 5,
    testimonial: 'Müşteri memnuniyetimiz %40 arttı, sipariş süresi yarı yarıya düştü.',
  },
];

// Testimonials Data
const testimonialsData = [
  {
    name: 'Mehmet Yılmaz',
    role: 'Kurucu, E-Ticaret Şirketi',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    text: 'Unilancer sayesinde bütçemize uygun, kaliteli bir e-ticaret sitesi aldık. 3 ayda cirolarımız 3 katına çıktı.',
    rating: 5,
  },
  {
    name: 'Ayşe Demir',
    role: 'Pazarlama Müdürü',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    text: 'Genç ekip ama son derece profesyonel. Hem yaratıcı hem de sonuç odaklı çalıştılar.',
    rating: 5,
  },
  {
    name: 'Can Öztürk',
    role: 'Restoran Sahibi',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
    text: 'Mobil uygulamamız sayesinde siparişlerimiz %60 arttı. Müşteri deneyimi çok iyi.',
    rating: 5,
  },
];

// Freelancer Stories Data
const freelancerStoriesData = [
  {
    name: 'Zeynep Kaya',
    role: 'UI/UX Tasarımcı',
    university: 'İTÜ Endüstri Mühendisliği',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    story: '3. sınıf öğrencisiyken katıldım. Şimdi portföyüm 20+ gerçek proje ile dolu ve kendi ajansımı kurdum.',
    stats: { projects: 25, earned: '₺45K', rating: 4.9 },
  },
  {
    name: 'Ahmet Yıldız',
    role: 'Full-Stack Developer',
    university: 'Boğaziçi Bilgisayar Mühendisliği',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    story: 'Teorik bilgimi gerçek projelerde kullanma fırsatı buldum. Şimdi FAANG şirketinde çalışıyorum.',
    stats: { projects: 30, earned: '₺60K', rating: 5.0 },
  },
  {
    name: 'Elif Arslan',
    role: 'Grafik Tasarımcı',
    university: 'Mimar Sinan Grafik Tasarım',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop',
    story: 'Okul dışında gerçek müşterilerle çalışmak bana çok şey kattı. Portfolio\'m şimdi harika.',
    stats: { projects: 18, earned: '₺32K', rating: 4.8 },
  },
];

const About = () => {
  const { t } = useTranslation();
  const [activeTimeline, setActiveTimeline] = useState(0);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);

  const handleCardFlip = (index: number) => {
    setFlippedCards(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="relative min-h-screen bg-white dark:bg-dark">
      {/* HERO VIDEO BACKGROUND */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-dark/80 via-dark/60 to-dark/80 z-10" />
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&h=1080&fit=crop"
            alt="Team Working"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold tracking-wide uppercase rounded-full bg-primary/20 text-primary backdrop-blur-sm mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              Hakkımızda
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              150+ Üniversiteli Freelancer ile
              <br />
              <span className="text-primary">Türkiye'yi Dijitalleştiriyoruz</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Teknopark İstanbul merkezli Unilancer Labs olarak, şirketlerin dijital ihtiyaçlarını
              yetenekli öğrenci freelancer ekiplerle buluşturuyoruz.
            </p>

            {/* Stats Quick View */}
            <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">150+</div>
                <div className="text-sm text-gray-300">Freelancer</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">200+</div>
                <div className="text-sm text-gray-300">Tamamlanan Proje</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">25+</div>
                <div className="text-sm text-gray-300">Üniversite</div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/50 flex items-start justify-center p-2">
            <motion.div
              className="w-1 h-2 bg-white rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* JOURNEY TIMELINE */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-dark dark:to-dark-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Yolculuğumuz</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Bir fikirden, Türkiye'nin en büyük freelancer ekosistemlerinden birine
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary/50 to-transparent hidden md:block" />

            {timelineData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-white dark:border-dark hidden md:block z-10" />

                {/* Content */}
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <div className="p-6 rounded-xl bg-white dark:bg-dark-light shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="text-2xl font-bold text-primary">{item.year}</span>
                      <Calendar className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{item.description}</p>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block md:w-5/12" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LIVE STATISTICS */}
      <section className="py-24 bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/5 dark:to-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Sayılarla Unilancer</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Etki yaratan projeler, büyüyen bir topluluk
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatCard
              icon={Users}
              value={150}
              suffix="+"
              label="Aktif Freelancer"
              description="25+ üniversiteden"
            />
            <StatCard
              icon={Briefcase}
              value={200}
              suffix="+"
              label="Tamamlanan Proje"
              description="Web, mobil, tasarım"
            />
            <StatCard
              icon={Award}
              value={50}
              suffix="+"
              label="Mutlu Müşteri"
              description="KOBİ ve startup"
            />
            <StatCard
              icon={TrendingUp}
              value={1}
              suffix="M+ ₺"
              label="Proje Hacmi"
              description="2024 yılında"
            />
          </div>
        </div>
      </section>

      {/* VALUES - FLIP CARDS */}
      <section className="py-24 bg-white dark:bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Değerlerimiz</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Bizi biz yapan değerler ve çalışma prensipleri
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {valuesData.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="perspective-1000"
              >
                <div
                  className={`relative h-64 cursor-pointer transition-transform duration-500 transform-style-3d ${
                    flippedCards.includes(index) ? 'rotate-y-180' : ''
                  }`}
                  onClick={() => handleCardFlip(index)}
                >
                  {/* Front */}
                  <div className="absolute inset-0 backface-hidden rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/5 dark:to-dark-light p-6 flex flex-col items-center justify-center text-center border border-primary/20">
                    <value.icon className="w-12 h-12 text-primary mb-4" />
                    <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{value.front}</p>
                    <div className="mt-4 text-xs text-primary">Tıklayın →</div>
                  </div>

                  {/* Back */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-xl bg-primary text-white p-6 flex flex-col items-center justify-center text-center">
                    <p className="text-sm leading-relaxed">{value.back}</p>
                    <div className="mt-4 text-xs opacity-70">← Geri dön</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECT SHOWCASE */}
      <section className="py-24 bg-gray-50 dark:bg-dark-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Başarı Hikayeleri</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Müşterilerimizle birlikte yarattığımız değer
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsData.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white dark:bg-dark rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <div className="flex space-x-1">
                      {[...Array(project.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-xs text-primary font-semibold mb-2">{project.client}</div>
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs">
                      {project.metrics.team} kişi
                    </span>
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs">
                      {project.metrics.duration}
                    </span>
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs">
                      {project.metrics.tech}
                    </span>
                  </div>
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm italic text-gray-600 dark:text-gray-400">
                      "{project.testimonial}"
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="py-24 bg-white dark:bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ekibimiz</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Unilancer'ı yöneten tutkulu ve deneyimli ekip
            </p>
          </motion.div>
          <TeamModern />
        </div>
      </section>

      {/* CLIENT TESTIMONIALS */}
      <section className="py-24 bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/5 dark:to-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Müşterilerimiz Ne Diyor</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Gerçek deneyimler, gerçek sonuçlar
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonialsData.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-dark-light rounded-xl p-6 shadow-lg"
              >
                <div className="flex space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-6 italic">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center space-x-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FREELANCER STORIES */}
      <section className="py-24 bg-white dark:bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Freelancer Hikayeleri</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Unilancer'da çalışmak nasıl bir şey? Onların ağzından dinleyin.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {freelancerStoriesData.map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-primary/5 to-transparent dark:from-primary/10 dark:to-dark-light rounded-xl p-6 border border-primary/20"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={story.avatar}
                    alt={story.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-bold">{story.name}</div>
                    <div className="text-sm text-primary">{story.role}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {story.university}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4 italic">
                  "{story.story}"
                </p>
                <div className="grid grid-cols-3 gap-2 pt-4 border-t border-primary/20">
                  <div className="text-center">
                    <div className="font-bold text-primary">{story.stats.projects}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Proje</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-primary">{story.stats.earned}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Kazanç</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-primary">{story.stats.rating}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Rating</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-primary to-primary-dark">
        <motion.div
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute -left-40 -top-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            opacity: [0.2, 0.4, 0.2],
            scale: [1.2, 1, 1.2]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1
          }}
          className="absolute -right-40 -bottom-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Hadi Başlayalım!
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
            İster müşteri olun ister freelancer, sizin için doğru yerdesiniz.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="/join"
              className="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-white text-primary font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Freelancer Başvurusu</span>
              <ArrowUpRight className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="https://wa.me/+905061523255"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-[#25D366] text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageSquare className="w-5 h-5" />
              <span>Proje Talebi</span>
              <ArrowUpRight className="w-5 h-5" />
            </motion.a>
          </div>
        </div>
      </section>
    </div>
  );
};

// StatCard Component
const StatCard: React.FC<{
  icon: React.FC<any>;
  value: number;
  suffix: string;
  label: string;
  description: string;
}> = ({ icon: Icon, value, suffix, label, description }) => {
  const count = useCounter(value);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="bg-white dark:bg-dark-light rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all"
    >
      <Icon className="w-12 h-12 text-primary mx-auto mb-4" />
      <div className="text-4xl font-bold text-primary mb-2">
        {count}{suffix}
      </div>
      <div className="font-semibold mb-1">{label}</div>
      <div className="text-sm text-gray-600 dark:text-gray-400">{description}</div>
    </motion.div>
  );
};

export default About;

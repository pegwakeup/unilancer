import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles, Globe, ShoppingCart, Palette, FileText, Search } from 'lucide-react';
import { LogosCarousel } from '../components/ui/logos-carousel';

const services = [
  {
    title: 'Web Sitesi',
    emoji: '💻',
    description: 'Kurumsal, kişisel marka ve landing page web siteleri.',
  },
  {
    title: 'E-Ticaret Çözümleri',
    emoji: '🛒',
    description: 'Hazır altyapılarla ya da özel geliştirmeyle ölçeklenebilir mağazalar.',
  },
  {
    title: 'Grafik ve Tasarım',
    emoji: '🎨',
    description: 'Logo, kurumsal kimlik, sosyal medya görselleri ve daha fazlası.',
  },
  {
    title: 'Mobil Uygulama ve SaaS',
    emoji: '📱',
    description: 'MVP, panel, dashboard ve SaaS ürünleri için uçtan uca geliştirme.',
  },
  {
    title: 'Pazarlama ve Reklam',
    emoji: '📢',
    description: 'Performans reklamları, sosyal medya yönetimi ve içerik üretimi.',
  },
  {
    title: '3D / AR',
    emoji: '🍔',
    description: '3D ürün modelleme, WebAR deneyimleri ve interaktif sunumlar.',
  },
  {
    title: 'Yapay Zeka – Dijibot',
    emoji: '🤖',
    description: 'Süreçlerinizi hızlandıran özel AI çözümleri ve chatbotlar.',
  },
];

const audience = [
  {
    title: 'KOBİ ve İşletmeler',
    description:
      'Web sitesi, e-ticaret, kurumsal kimlik, 3D/AR ve reklam ihtiyaçlarını tek noktadan çözmek isteyen markalar.',
    tag: 'Dijitalleşmek isteyen işletmeler',
  },
  {
    title: 'Ajanslar ve Startuplar',
    description:
      'Yoğun dönemlerde işi güvenilir bir ekibe outsource etmek isteyen ajanslar ve hızlı büyüyen girişimler.',
    tag: 'Esnek kapasite & white-label üretim',
  },
  {
    title: 'Üniversiteli Freelancerlar',
    description:
      'Portföyünü büyütmek, gerçek müşterilerle proje yapmak ve düzenli gelir elde etmek isteyen öğrenciler.',
    tag: 'Seçilmiş ekipler & proje yönetimi',
  },
];

const whyItems = [
  {
    title: 'Seçilmiş Üniversiteli Ekipler',
    description:
      'Fakülte, yetkinlik ve portföy kriterlerine göre seçilmiş ekiplerle çalışırsınız.',
  },
  {
    title: 'Profesyonel Proje Yönetimi',
    description:
      'Deneyimli proje yöneticileri süreci uçtan uca yönetir, siz tek muhatapla ilerlersiniz.',
  },
  {
    title: 'Şeffaf ve Erişilebilir Fiyatlar',
    description:
      'Freelancer esnekliğini kurumsal süreçle birleştiren, anlaşılır fiyat yapısı.',
  },
  {
    title: 'Türkiyeyi Dijitalleştiriyoruz',
    description:
      'Markaları dijitalleştirirken genç yeteneklerin global seviyede üretmesini destekliyoruz.',
  },
];

const employerFaqs = [
  {
    q: 'Proje süreci nasıl işliyor?',
    a: 'İhtiyaç formunu dolduruyorsunuz, size uygun ekip ve teklif hazırlıyoruz; onay sonrası proje yöneticisiyle süreç başlıyor.',
  },
  {
    q: 'Fiyatlandırma nasıl belirleniyor?',
    a: 'İş kapsamına göre freelancer ekibin maliyeti, proje yönetimi ve Unilancer payı şeffaf şekilde hesaplanıyor.',
  },
  {
    q: 'Teslim süreleri ne kadar?',
    a: 'Standart web projeleri genellikle 3–6 hafta, daha karmaşık projeler kapsamına göre planlanıyor.',
  },
  {
    q: 'Süreçte tek muhatabım kim?',
    a: 'Tüm süreci yöneten deneyimli bir proje yöneticisiyle çalışıyorsunuz.',
  },
  {
    q: 'Memnun kalmazsam ne oluyor?',
    a: 'Revizyon süreçleri ve memnuniyet odaklı çözümlerle projenin hedefe ulaşmasını birlikte sağlıyoruz.',
  },
];

const freelancerFaqs = [
  {
    q: 'Unilancer’a nasıl freelancer olarak katılabilirim?',
    a: 'Başvuru formunu doldurup portföyünüzü yüklüyorsunuz, ekiplerimiz uygun profilleri seçip görüşmeye davet ediyor.',
  },
  {
    q: 'Projeler nasıl dağıtılıyor?',
    a: 'Proje gereksinimleri, yetkinlikler ve önceki performans skorlarına göre ekipler oluşturuluyor.',
  },
  {
    q: 'Ödemelerimi nasıl alıyorum?',
    a: 'Proje teslim ve onay sürecinin ardından ödemeniz güvenli şekilde tarafınıza aktarılıyor.',
  },
  {
    q: 'Sadece öğrenciler mi başvurabiliyor?',
    a: 'Ana odağımız üniversiteli yetenekler; ancak bazı kategorilerde mezun profillere de kapımız açık.',
  },
  {
    q: 'Tam zamanlı çalışmak zorunda mıyım?',
    a: 'Hayır. Proje bazlı, esnek çalışma modelini destekliyoruz.',
  },
];

const Home = () => {
  return (
    <div className="relative min-h-screen">
      {/* Arka plan */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-cyan-50/40 to-blue-100/30 dark:from-dark dark:via-dark-light dark:to-dark" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#5FC8DA30_1px,transparent_1px),linear-gradient(to_bottom,#5FC8DA30_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black_80%)] opacity-70" />
      </div>

      <div className="relative z-10">
        {/* HERO */}
        <section
          id="hero"
          className="min-h-[80vh] flex items-center pt-24 pb-16 md:pt-28 md:pb-20"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              {/* Sol taraf */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 dark:bg-white/5 backdrop-blur-md border border-slate-200/70 dark:border-white/10 shadow-sm">
                  <Sparkles className="w-4 h-4 mr-2 text-primary" />
                  <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-gray-100">
                    Türkiyeyi Dijitalleştiriyoruz
                  </span>
                </div>

                <div className="space-y-4">
                  <h1 className="text-4xl sm:text-5xl lg:text-[3rem] font-bold leading-tight text-slate-900 dark:text-white max-w-xl">
                    Üniversiteli ekiplerle
                    <span className="block bg-gradient-to-r from-slate-900 via-primary to-cyan-600 bg-clip-text text-transparent dark:from-white dark:via-primary dark:to-cyan-400">
                      markanızı dijitale taşıyoruz.
                    </span>
                  </h1>

                  <p className="text-base sm:text-lg text-slate-600 dark:text-gray-300 max-w-xl leading-relaxed">
                    Unilancer’da projelerinizi seçilmiş üniversiteli ekipler üretir, deneyimli proje yöneticileri
                    uçtan uca yönetir; siz hem uygun bütçeyle çalışır hem de genç yeteneklerin büyümesine katkı
                    sağlarsınız.
                  </p>

                  <div className="inline-flex items-center text-xs sm:text-sm text-slate-500 dark:text-gray-400 bg-white/80 dark:bg-white/5 border border-slate-200/70 dark:border-white/10 rounded-full px-3 py-1">
                    <span className="mr-2 text-primary">•</span>
                    Web sitesi, e-ticaret, tasarım, içerik, SEO ve daha fazlası…
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <motion.a
                    href="/project-request"
                    className="inline-flex items-center justify-center px-8 py-3.5 bg-primary hover:bg-primary-dark text-white rounded-xl font-semibold transition-all shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Projenizi Başlatın</span>
                    <ArrowUpRight className="w-5 h-5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </motion.a>

                  <motion.a
                    href="#rapor"
                    className="inline-flex items-center justify-center px-8 py-3.5 bg-white/90 dark:bg-white/5 backdrop-blur-sm text-slate-900 dark:text-white rounded-xl font-semibold hover:bg-slate-100 dark:hover:bg-white/10 transition-all border border-slate-200 dark:border-white/10 group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Ücretsiz Dijital Rapor Alın</span>
                  </motion.a>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2 text-xs sm:text-sm text-slate-500 dark:text-gray-400">
                  <span>100+ tamamlanmış proje</span>
                  <span className="hidden sm:inline text-slate-300 dark:text-white/20">•</span>
                  <span>500+ üniversiteli freelancer ekosistemi</span>
                </div>
              </motion.div>

              {/* Sağ taraf – görsel */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="flex justify-center lg:justify-end"
              >
                <div className="relative w-full max-w-[480px]">
                  <div className="pointer-events-none absolute -inset-6 rounded-[40px] bg-gradient-to-tr from-primary/25 via-cyan-400/15 to-purple-500/25 blur-2xl opacity-80" />
                  <img
                    src="https://ctncspdgguclpeijikfp.supabase.co/storage/v1/object/public/Landing%20Page/elsikisma.webp"
                    alt="Unilancer iş birliği"
                    className="relative w-full h-auto rounded-3xl shadow-2xl object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* KİMİN İÇİN */}
        <section id="kimin-icin" className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
                Kimin için?
              </h2>
              <p className="text-slate-600 dark:text-gray-300">
                Unilancer, hem işverenler hem de üniversiteli freelancerlar için tasarlanmış bir
                ekosistemdir.
              </p>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {audience.map((item) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="h-full rounded-2xl bg-white/90 dark:bg-dark-light/90 border border-slate-200/70 dark:border-white/10 shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col"
                >
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-gray-300 mb-3 flex-1">
                    {item.description}
                  </p>
                  <span className="inline-flex items-center text-[11px] font-medium text-primary bg-primary/5 rounded-full px-3 py-1 self-start">
                    {item.tag}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* PARTNERLER */}
        <section id="partnerler" className="py-10 md:py-14 bg-gradient-to-b from-transparent via-white/70 to-transparent dark:via-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">
                Partnerler
              </h2>
              <p className="text-sm md:text-base text-slate-600 dark:text-gray-300">
                İş birliği yaptığımız kurumlar ve markalarla birlikte büyüyoruz.
              </p>
            </div>
          </div>
          <LogosCarousel />
        </section>

        {/* NEDEN UNILANCER */}
        <section id="neden-unilancer" className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
                  Neden Unilancer?
                </h2>
                <p className="text-slate-600 dark:text-gray-300 max-w-xl">
                  Freelancer esnekliği ile kurumsal proje yönetimini tek çatı altında topluyoruz.
                </p>
              </div>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/90 dark:bg-white/5 border border-slate-200/70 dark:border-white/10 text-xs sm:text-sm text-slate-700 dark:text-gray-200">
                <span className="mr-2 text-primary">
                  <Sparkles className="w-3.5 h-3.5" />
                </span>
                Türkiyeyi Dijitalleştiriyoruz
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {whyItems.map((item) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35 }}
                  className="rounded-2xl bg-white/90 dark:bg-dark-light/90 border border-slate-200/70 dark:border-white/10 p-5 shadow-sm"
                >
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-gray-300">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ÜCRETSİZ DİJİTAL RAPOR */}
        <section
          id="rapor"
          className="py-12 md:py-16"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-2 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                  Ücretsiz Dijital Raporunuzu Alın
                </h2>
                <p className="text-slate-600 dark:text-gray-300 max-w-xl">
                  Web sitenizden sosyal medya hesaplarınıza, reklamlarınızdan 3D/AR entegrasyonlarına kadar
                  dijital varlığınızı inceliyoruz. Sektörünüzü ve rakiplerinizi analiz edip size özel bir yol
                  haritası çıkarıyoruz.
                </p>
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/90 dark:bg-white/5 border border-slate-200/70 dark:border-white/10 text-xs sm:text-sm text-slate-700 dark:text-gray-200">
                  <span className="mr-2 text-primary">
                    <Sparkles className="w-3.5 h-3.5" />
                  </span>
                  Beyin Göçü Yerine Hizmet İhracatı
                </div>

                <div className="pt-4 flex flex-wrap gap-3">
                  <a
                    href="/project-request"
                    className="inline-flex items-center justify-center px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-xl text-sm font-semibold shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/30 transition-all group"
                  >
                    <span>Ücretsiz Raporum Olsun</span>
                    <ArrowUpRight className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </a>
                  <span className="text-xs sm:text-sm text-slate-500 dark:text-gray-400">
                    Ortalama hazırlama süresi 2–3 iş günü.
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="rounded-3xl bg-white/90 dark:bg-dark-light/90 border border-slate-200/70 dark:border-white/10 shadow-xl p-6 md:p-7"
              >
                <div className="grid gap-4 text-sm text-slate-700 dark:text-gray-200">
                  <div className="flex items-start justify-between gap-3 border-b border-slate-100/80 dark:border-white/5 pb-3">
                    <div>
                      <div className="font-semibold">Web Sitesi Skoru</div>
                      <div className="text-xs text-slate-500 dark:text-gray-400">
                        Hız, UX ve teknik altyapı analizi
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-primary">78 / 100</span>
                  </div>
                  <div className="flex items-start justify-between gap-3 border-b border-slate-100/80 dark:border-white/5 pb-3">
                    <div>
                      <div className="font-semibold">Sosyal Medya & İçerik</div>
                      <div className="text-xs text-slate-500 dark:text-gray-400">
                        İçerik tutarlılığı, görsel dil ve etkileşim
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-primary">B+</span>
                  </div>
                  <div className="flex items-start justify-between gap-3 border-b border-slate-100/80 dark:border-white/5 pb-3">
                    <div>
                      <div className="font-semibold">Reklam ve SEO Hazırlığı</div>
                      <div className="text-xs text-slate-500 dark:text-gray-400">
                        Arama görünürlüğü ve reklam altyapısı
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-primary">Hazır</span>
                  </div>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-semibold">Öncelikli Aksiyon Listesi</div>
                      <div className="text-xs text-slate-500 dark:text-gray-400">
                        İlk 30 günde atılması gereken adımlar
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-primary">+10 madde</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* DIGITALL HİZMETLERİMİZ */}
        <section id="digitall" className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-8">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
                DigitAll hizmetlerimiz
              </h2>
              <p className="text-slate-600 dark:text-gray-300">
                Markanızın dijital yolculuğunun her adımı için, uzman üniversiteli ekiplerle
                uçtan uca çözümler sunuyoruz.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35 }}
                  className="rounded-2xl bg-white/90 dark:bg-dark-light/90 border border-slate-200/70 dark:border-white/10 p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-lg">
                      {service.emoji}
                    </div>
                    <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-gray-300">
                    {service.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SSS */}
        <section id="sss" className="py-12 md:py-16 border-t border-slate-200/60 dark:border-white/10 bg-white/70 dark:bg-dark/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
                Sık Sorulan Sorular
              </h2>
              <p className="text-slate-600 dark:text-gray-300 max-w-2xl mx-auto">
                Hem iş verenler hem de freelancerlar için süreci şeffaf ve anlaşılır kılmaya
                çalışıyoruz.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {/* İş Veren */}
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                  İş Veren
                </h3>
                <div className="space-y-3">
                  {employerFaqs.map((item) => (
                    <div
                      key={item.q}
                      className="rounded-2xl bg-white dark:bg-dark-light border border-slate-200/70 dark:border-white/10 p-4 text-sm text-slate-700 dark:text-gray-200"
                    >
                      <div className="font-semibold mb-1">{item.q}</div>
                      <div className="text-xs sm:text-[13px] text-slate-600 dark:text-gray-300">
                        {item.a}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Freelancer */}
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                  Freelancer
                </h3>
                <div className="space-y-3">
                  {freelancerFaqs.map((item) => (
                    <div
                      key={item.q}
                      className="rounded-2xl bg-white dark:bg-dark-light border border-slate-200/70 dark:border-white/10 p-4 text-sm text-slate-700 dark:text-gray-200"
                    >
                      <div className="font-semibold mb-1">{item.q}</div>
                      <div className="text-xs sm:text-[13px] text-slate-600 dark:text-gray-300">
                        {item.a}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-slate-500 dark:text-gray-400">
              <span>
                Hâlâ aklınıza takılan bir şey mi var?{' '}
                <a href="/contact" className="text-primary font-medium hover:underline">
                  Bize yazın.
                </a>
              </span>
              <a
                href="/project-request"
                className="inline-flex items-center justify-center px-5 py-2.5 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-all"
              >
                Proje Talebi Oluşturun
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
